/**
 * Observability + Cost Control Layer — SH-G1-06.
 *
 * Contract source of truth: `docs/quality/observability-cost-control.md`
 * (§1 event structure, §3 cost ledger, §4 budgets).
 * **Single source of numbers = SECURITY_THREAT_MODEL §3** (rate limits, per-order
 * generation cap 5, generation timeout 120 s, retry max 2) — see BUDGETS below.
 *
 * Known doc↔code mismatches are declared in `tests/contract/observability.contract.test.mjs`
 * and the session report — docs are never silently changed here:
 * - §1 calls the cost field `costEstimate`; api-standard §2 mandates one name
 *   everywhere (`cost`) — the emitted line uses `cost`.
 * - §3 lists ledger fields `input (tokens/params) · output`; the recordCost entry
 *   carries them as optional (the mandated signature is
 *   {orderId, model, cost, retryCount, duration, status}).
 *
 * Relative runtime import: `./pii` (resolved by the Pages Functions bundler and
 * tsc; pure module — see pii.ts header for testability notes).
 */

import type { ErrorCode } from './http';
import { scrubText } from './pii';

/** KV-like ledger binding (`AI_LEDGER` namespace on the Pages project). */
export interface KVLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<unknown>;
}

export interface ObservabilityEnv {
  /** Cost ledger KV namespace. Unbound => recording degrades to a no-op. */
  AI_LEDGER?: KVLike;
  /** Daily AI budget override in EUR (default BUDGETS.globalDailyEur). */
  AI_DAILY_BUDGET_EUR?: string;
  /** Per-order generation hard max override (default BUDGETS.perOrderGenerations). */
  AI_ORDER_GENERATION_LIMIT?: string;
  /** Per-session generation cap override (default BUDGETS.perSessionGenerations). */
  AI_SESSION_GENERATION_LIMIT?: string;
}

/** One request/job event — api-standard §2 "Logging" (= observability §1). */
export interface TelemetryEvent {
  requestId: string;
  orderId?: string;
  projectId?: string;
  endpoint: string;
  status: number;
  /** Duration in milliseconds. */
  duration: number;
  errorCode?: ErrorCode;
  model?: string;
  /** Cost in EUR (single name everywhere — api-standard §2). */
  cost?: number;
}

/**
 * Emit one structured JSON log line with EXACTLY the observability §1 fields.
 * PII safety (T10): string values pass through scrubText — emails and tokens
 * are masked; never log request bodies, headers, or file contents here.
 */
export function emitEvent(evt: TelemetryEvent): void {
  const line = {
    requestId: scrubText(evt.requestId),
    orderId: evt.orderId === undefined ? null : scrubText(evt.orderId),
    projectId: evt.projectId === undefined ? null : scrubText(evt.projectId),
    endpoint: scrubText(evt.endpoint),
    status: evt.status,
    timestamp: new Date().toISOString(),
    duration: evt.duration,
    errorCode: evt.errorCode === undefined ? null : evt.errorCode,
    model: evt.model === undefined ? null : scrubText(evt.model),
    cost: evt.cost === undefined ? null : evt.cost,
  };
  console.log(JSON.stringify(line));
}

/** One cost-ledger entry per generation — observability §3. */
export interface LedgerEntry {
  orderId: string;
  model: string;
  /** Cost in EUR. */
  cost: number;
  retryCount: number;
  /** Duration in milliseconds. */
  duration: number;
  status: string;
  /** Optional — observability §3 lists `input (tokens/params)`. */
  input?: number;
  /** Optional — observability §3 lists `output`. */
  output?: number;
  sessionId?: string;
}

export interface RecordCostResult {
  recorded: boolean;
  reason?: string;
}

/**
 * Hard budgets — observability §4 ("twarde, w kodzie").
 * Numbers bind to SECURITY_THREAT_MODEL §3 (per-order generation cap) and the
 * observability §4 suggestion (€20/day — final value is the Commander's call, L4).
 */
export const BUDGETS = {
  /** Global daily AI spend cap in EUR — env `AI_DAILY_BUDGET_EUR`. */
  globalDailyEur: 20,
  /** Hard max generations per order — env `AI_ORDER_GENERATION_LIMIT` (threat model §3). */
  perOrderGenerations: 5,
  /** Max generations per session — env `AI_SESSION_GENERATION_LIMIT`. */
  perSessionGenerations: 3,
  /** Alert triggers (observability §3: cost/order próg, retryRate próg). */
  alertThresholds: {
    costPerOrderEur: 3,
    retryRatePct: 20,
  },
} as const;

export type EffectiveBudgets = {
  globalDailyEur: number;
  perOrderGenerations: number;
  perSessionGenerations: number;
  alertThresholds: { costPerOrderEur: number; retryRatePct: number };
};

/** BUDGETS with env overrides applied (env values win when valid numbers). */
export function resolveBudgets(env: ObservabilityEnv): EffectiveBudgets {
  const num = (raw: string | undefined, fallback: number): number => {
    const parsed = raw === undefined ? NaN : Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  };
  return {
    globalDailyEur: num(env.AI_DAILY_BUDGET_EUR, BUDGETS.globalDailyEur),
    perOrderGenerations: num(env.AI_ORDER_GENERATION_LIMIT, BUDGETS.perOrderGenerations),
    perSessionGenerations: num(env.AI_SESSION_GENERATION_LIMIT, BUDGETS.perSessionGenerations),
    alertThresholds: { ...BUDGETS.alertThresholds },
  };
}

const dateKey = (): string => new Date().toISOString().slice(0, 10);

/**
 * Record one generation's cost in the KV ledger (observability §3).
 * Graceful no-op when `AI_LEDGER` is not bound — never fail a request because
 * bookkeeping is unavailable (the honest degrade is reported in the result).
 */
export async function recordCost(
  env: ObservabilityEnv,
  entry: LedgerEntry,
): Promise<RecordCostResult> {
  const ledger = env.AI_LEDGER;
  if (!ledger) {
    return { recorded: false, reason: 'LEDGER_UNBOUND' };
  }
  const date = dateKey();
  try {
    await ledger.put(
      `cost:${date}:${entry.orderId}:${crypto.randomUUID()}`,
      JSON.stringify({ ...entry, recordedAt: new Date().toISOString() }),
    );
    const spend = Number((await ledger.get(`spend:daily:${date}`)) ?? 0) + entry.cost;
    await ledger.put(`spend:daily:${date}`, String(spend));
    const orderGens = Number((await ledger.get(`count:order:${entry.orderId}`)) ?? 0) + 1;
    await ledger.put(`count:order:${entry.orderId}`, String(orderGens));
    if (entry.sessionId) {
      const sessionGens = Number((await ledger.get(`count:session:${entry.sessionId}`)) ?? 0) + 1;
      await ledger.put(`count:session:${entry.sessionId}`, String(sessionGens));
    }
    return { recorded: true };
  } catch {
    // KV outage must not break generation flows — cost is re-derivable from logs.
    return { recorded: false, reason: 'LEDGER_WRITE_FAILED' };
  }
}

export type BudgetDenyReason =
  | 'daily-ai-budget-exceeded'
  | 'order-generation-limit'
  | 'session-generation-limit';

export type BudgetDecision =
  | { allow: true }
  | { allow: false; code: 'QUOTA_EXCEEDED'; reason: BudgetDenyReason };

export interface BudgetContext {
  orderId: string;
  sessionId?: string;
  /** Explicit session counter (used when no ledger session key is available). */
  sessionGenerationCount?: number;
}

/**
 * Budget gate before starting a paid generation (observability §4).
 * Hard stop with QUOTA_EXCEEDED — the endpoint turns this into the envelope
 * error and alerts (never silently spends over budget).
 *
 * Honest degrade: with `AI_LEDGER` unbound, KV-derived counters read as 0 and
 * only explicitly passed counts are enforced — bind the ledger before launch.
 */
export async function checkBudget(
  env: ObservabilityEnv,
  ctx: BudgetContext,
): Promise<BudgetDecision> {
  const limits = resolveBudgets(env);
  const ledger = env.AI_LEDGER;

  const dailySpend = ledger ? Number((await ledger.get(`spend:daily:${dateKey()}`)) ?? 0) : 0;
  if (dailySpend >= limits.globalDailyEur) {
    return { allow: false, code: 'QUOTA_EXCEEDED', reason: 'daily-ai-budget-exceeded' };
  }

  const orderGens = ledger ? Number((await ledger.get(`count:order:${ctx.orderId}`)) ?? 0) : 0;
  if (orderGens >= limits.perOrderGenerations) {
    return { allow: false, code: 'QUOTA_EXCEEDED', reason: 'order-generation-limit' };
  }

  const sessionGens =
    ctx.sessionGenerationCount ??
    (ledger && ctx.sessionId
      ? Number((await ledger.get(`count:session:${ctx.sessionId}`)) ?? 0)
      : 0);
  if (sessionGens >= limits.perSessionGenerations) {
    return { allow: false, code: 'QUOTA_EXCEEDED', reason: 'session-generation-limit' };
  }

  return { allow: true };
}

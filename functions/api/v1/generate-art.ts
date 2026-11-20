/** INSPIRE: server-only mockup generation. No logo, name or contact sent upstream. */
import { buildPrompt } from "./prompt-templates";
import { ok, fail, json, newRequestId, extractIdempotencyKey, type ErrorCode } from '../_lib/http';
import { emitEvent, type KVLike } from '../_lib/observability';

interface LedgerKV extends KVLike {
  delete(key: string): Promise<unknown>;
}

/** Minimal Workers AI binding shape (no @cloudflare/workers-types dependency). */
interface AiLike {
  run(model: string, input: Record<string, unknown>): Promise<{ image?: string }>;
}

interface BudgetDB {
  prepare(sql: string): { bind(...values: (string | number)[]): { run(): Promise<{meta: {changes: number}}> } };
}
interface Env {
  IMAGE_PROVIDER?: string;
  IMAGE_MODEL?: string;
  IMAGE_API_KEY?: string;
  IMAGE_BUDGET?: BudgetDB;
  IMAGE_CALL_BOUND_CONFIRMED?: string;
  IMAGE_SECOND_HALF_APPROVED?: string;
  /** Workers AI binding (Pages: Settings → Bindings → Workers AI, name `AI`). */
  AI?: AiLike;
  /** KV — cost ledger + generation counters + idempotency keys (SH-G1-06). */
  AI_LEDGER?: LedgerKV;
  /** Daily generation-action cap override (default below). */
  GEN_DAILY_CAP?: string;
}

interface Context {
  request: Request;
  env: Env;
}

interface GenerateRequest {
  visitorToken: string;
  brandColors?: string[];
  style?: 'standard' | 'premium';
  vehicleType?: 'compact van' | 'medium van' | 'large van' | 'passenger car';
  exposure?: string;
  impression?: string;
  businessType?: string;
}

const MODEL = '@cf/black-forest-labs/flux-1-schnell';
const STEPS = 4;
/** api-standard §2: generate = async job budget 120 s. */
const GENERATION_TIMEOUT_MS = 120_000;

/** Phase 1 product rule: one free generation ACTION (= both variants) per visitor. */
const VISITOR_LIMIT = 1;
const DAILY_CAP_DEFAULT = 10;

const VISITOR_TOKEN_RE = /^[a-zA-Z0-9_-]{16,128}$/;
const ALLOWED_VEHICLES = ['compact van', 'medium van', 'large van', 'passenger car'];
/** One free generation ACTION per visitor + hard daily cap (KV; atomicity gap documented). */
async function reserveGeneration(
  ledger: LedgerKV,
  visitorToken: string,
  dailyCap: number,
): Promise<{ ok: true; dailyRemaining: number } | { ok: false; reason: 'VISITOR_LIMIT' | 'DAILY_LIMIT' }> {
  const date = new Date().toISOString().slice(0, 10);
  const visitorKey = `gen:visitor:${visitorToken}`;
  const dailyKey = `gen:daily:${date}`;

  const visitorCount = Number((await ledger.get(visitorKey)) ?? 0) || 0;
  if (visitorCount >= VISITOR_LIMIT) return { ok: false, reason: 'VISITOR_LIMIT' };

  const dailyCount = Number((await ledger.get(dailyKey)) ?? 0) || 0;
  const cap = Math.max(1, Math.min(dailyCap, 1000));
  if (dailyCount >= cap) return { ok: false, reason: 'DAILY_LIMIT' };

  await ledger.put(visitorKey, String(visitorCount + 1));
  await ledger.put(dailyKey, String(dailyCount + 1));
  return { ok: true, dailyRemaining: cap - dailyCount - 1 };
}

async function releaseGeneration(ledger: LedgerKV, visitorToken: string): Promise<void> {
  const date = new Date().toISOString().slice(0, 10);
  const dailyKey = `gen:daily:${date}`;
  try {
    await ledger.delete(`gen:visitor:${visitorToken}`);
    const dailyCount = Number((await ledger.get(dailyKey)) ?? 0) || 0;
    await ledger.put(dailyKey, String(Math.max(0, dailyCount - 1)));
  } catch {
    // Counter may over-consume on failure — acceptable for Phase 1 free tier.
  }
}

interface ProviderImage {
  format: 'base64';
  mimeType: string;
  data: string;
}

const SUNBURST = 'gpt-image-2.6-sunburst';
const RESERVE_CENTS = 125;
type Direction = 'standard' | 'premium';

/** Admit the whole action in a single D1 write, before buying either image. */
async function reserveImages(env: Env, requestId: string, vehicle: string, action: string, styles: Direction[]) {
  const limit = env.IMAGE_SECOND_HALF_APPROVED === 'yes' ? 1000 : 500;
  const values = styles.map(() => '(?, ?, ?)').join(', ');
  const rows = styles.flatMap(style => [`${requestId}:${style}`, `${action}:${style}`, `${vehicle}:${style}`]);
  const reservation = await env.IMAGE_BUDGET!.prepare(`
    WITH wanted(id, replay, slot) AS (VALUES ${values}),
    admitted AS MATERIALIZED (
      SELECT * FROM wanted
      WHERE (SELECT COALESCE(SUM(reserved_cents),0) FROM image_spend) + ? <= ?
        AND NOT EXISTS (SELECT 1 FROM image_spend WHERE reserved_cents > ?)
        AND NOT EXISTS (SELECT 1 FROM wanted w WHERE
          EXISTS (SELECT 1 FROM image_spend WHERE replay_id=w.replay) OR
          (SELECT COUNT(*) FROM image_spend WHERE vehicle_variant=w.slot) >= 3)
    )
    INSERT INTO image_spend(call_id,replay_id,vehicle_variant,reserved_cents)
    SELECT id,replay,slot,? FROM admitted`)
    .bind(...rows, styles.length * RESERVE_CENTS, limit, RESERVE_CENTS, RESERVE_CENTS).run();
  if (reservation.meta.changes !== styles.length) {
    console.info(JSON.stringify({requestId, model:SUNBURST, event:'inspire.review_required', limitUsd:limit/100, vehicle}));
    throw Object.assign(new Error('Budget or attempt stop'), {code:'QUOTA_EXCEEDED', retryable:false});
  }
}

async function callProvider(env: Env, prompt: string, requestId: string, style: Direction, vehicle: string): Promise<ProviderImage> {
  if (env.IMAGE_PROVIDER === 'openai') {
    const id = `${requestId}:${style}`;
    const record = {requestId, model:SUNBURST, vehicle, style, reservedUsd:RESERVE_CENTS / 100};
    const key = `inspire:spend:${id}`;
    await env.AI_LEDGER!.put(key, JSON.stringify(record));
    console.info(JSON.stringify(record));
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method:'POST', redirect:'error', signal:AbortSignal.timeout(GENERATION_TIMEOUT_MS),
      headers:{Authorization:`Bearer ${env.IMAGE_API_KEY}`, 'Content-Type':'application/json'},
      body:JSON.stringify({model:SUNBURST, prompt, n:1, size:'1536x1024', quality:'high', output_format:'png'})
    });
    if (!response.ok) throw new Error('Image provider rejected request');
    const body = await response.json() as {data?: {b64_json?:string}[], usage?: {input_tokens:number; output_tokens:number}};
    const u = body.usage;
    const estimatedUsd = u && Number.isSafeInteger(u.input_tokens) && Number.isSafeInteger(u.output_tokens)
      ? (u.input_tokens * 5 + u.output_tokens * 30) / 1_000_000 : null;
    await env.AI_LEDGER!.put(key, JSON.stringify({...record, estimatedUsd}));
    console.info(JSON.stringify({...record, estimatedUsd}));
    if (estimatedUsd !== null && estimatedUsd > 0) {
      // Round up, never down. No usage/ambiguous failure keeps the entire hold.
      await env.IMAGE_BUDGET!.prepare('UPDATE image_spend SET reserved_cents=? WHERE call_id=?')
        .bind(Math.ceil(estimatedUsd * 100), id).run();
      if (estimatedUsd > RESERVE_CENTS / 100) throw Object.assign(new Error('Revalidate provider price bound'), {code:'QUOTA_EXCEEDED',retryable:false});
    }
    const data = body.data?.[0]?.b64_json;
    if (typeof data !== 'string' || !data.startsWith('iVBORw0KGgo')) throw new Error('Missing PNG');
    return {format:'base64', mimeType:'image/png', data};
  }
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(Object.assign(new Error('generation timeout'), { name: 'TimeoutError' })), GENERATION_TIMEOUT_MS);
  });

  const result = await Promise.race([
    env.AI!.run(MODEL, {
      prompt,
      steps: STEPS,
    }),
    timeout,
  ]);

  if (!result || typeof result.image !== 'string' || result.image.length === 0) {
    throw Object.assign(new Error('empty provider response'), {
      code: 'GENERATION_FAILED' as ErrorCode,
      retryable: true,
    });
  }
  // flux-1-schnell returns base64 JPEG (docs: data:image/jpeg;base64,...).
  return { format: 'base64', mimeType: 'image/jpeg', data: result.image };
}

export async function onRequestPost(context: Context): Promise<Response> {
  const started = Date.now();
  const requestId = newRequestId();
  const { request, env } = context;

  const failAndLog = (code: ErrorCode, message: string, retryable: boolean, status: number): Response => {
    emitEvent({
      requestId,
      endpoint: 'generate-art',
      status,
      duration: Date.now() - started,
      errorCode: code,
      model: env.IMAGE_PROVIDER === 'openai' ? SUNBURST : MODEL,
      cost: env.IMAGE_PROVIDER === 'openai' ? undefined : 0,
    });
    return json(fail(code, message, retryable, requestId), status);
  };

  const configured = env.IMAGE_PROVIDER === 'openai'
    ? env.IMAGE_MODEL === SUNBURST && env.IMAGE_API_KEY && env.IMAGE_BUDGET && env.IMAGE_CALL_BOUND_CONFIRMED === 'yes'
    : env.IMAGE_PROVIDER === 'cf-flux' && env.AI;
  if (!configured) {
    return failAndLog('INTERNAL', 'Image generation service is not configured.', false, 503);
  }

  let input: GenerateRequest;
  try {
    input = (await request.json()) as GenerateRequest;
  } catch {
    return failAndLog('VALIDATION_ERROR', 'Invalid JSON request body.', false, 400);
  }

  if (!input || !ALLOWED_VEHICLES.includes(input.vehicleType ?? '') || (input.style !== undefined && !['standard', 'premium'].includes(input.style)) || typeof input.visitorToken !== 'string' || !VISITOR_TOKEN_RE.test(input.visitorToken)) {
    return failAndLog('VALIDATION_ERROR', 'Valid vehicle, variant and visitor token required.', false, 400);
  }

  const ledger = env.AI_LEDGER;
  if (!ledger) {
    return failAndLog('INTERNAL', 'Generation limits are not configured.', false, 503);
  }

  // Idempotency (api-standard §2): a retried request with the same key must not
  // consume quota or provider calls again -> CONFLICT (dup).
  const idempotencyKey = extractIdempotencyKey(request);
  if (idempotencyKey) {
    const seen = await ledger.get(`gen:idem:${idempotencyKey}`);
    if (seen !== null) {
      return failAndLog('CONFLICT', 'This generation was already submitted.', false, 409);
    }
  }

  const dailyCap = Math.max(1, Number(env.GEN_DAILY_CAP) || DAILY_CAP_DEFAULT);
  const reservation = await reserveGeneration(ledger, input.visitorToken, dailyCap);
  if (!reservation.ok) {
    return failAndLog(
      'QUOTA_EXCEEDED',
      reservation.reason === 'VISITOR_LIMIT'
        ? 'You have already used your free generation.'
        : 'The daily free generation limit has been reached. Please try again tomorrow.',
      reservation.reason !== 'VISITOR_LIMIT',
      429,
    );
  }

  // One action = two visual directions (A/B) for the same vehicle and wrap;
  // standard/premium remain provider-internal style keys, not product tiers.
  const variants: Direction[] = input.style ? [input.style] : ['standard', 'premium'];

  try {
    const images: Array<{ style: string; image: ProviderImage }> = [];
    if (env.IMAGE_PROVIDER === 'openai') {
      await reserveImages(env, requestId, input.vehicleType!, idempotencyKey || requestId, variants);
    }
    let startedCount = 0;
    try {
      for (const style of variants) {
        const prompt = buildPrompt(input, style);
        startedCount++;
        const image = await callProvider(env, prompt, requestId, style, input.vehicleType!);
        images.push({ style, image });
      }
    } finally {
      // Release only holds for directions never entered. A timeout on a started
      // call is ambiguous and must retain its hold, including its replay guard.
      if (env.IMAGE_PROVIDER === 'openai') {
        for (const style of variants.slice(startedCount)) {
          await env.IMAGE_BUDGET!.prepare('DELETE FROM image_spend WHERE call_id=?')
            .bind(`${requestId}:${style}`).run();
        }
      }
    }

    if (idempotencyKey) {
      await ledger.put(`gen:idem:${idempotencyKey}`, requestId);
    }

    emitEvent({
      requestId,
      endpoint: 'generate-art',
      status: 200,
      duration: Date.now() - started,
      model: env.IMAGE_PROVIDER === 'openai' ? SUNBURST : MODEL,
      cost: env.IMAGE_PROVIDER === 'openai' ? undefined : 0,
    });

    return json(
      ok(
        {
          images,
          provider: env.IMAGE_PROVIDER,
          imageKind: 'vehicle-mockup',
          quota: { dailyRemaining: reservation.dailyRemaining },
        },
        requestId,
      ),
      200,
    );
  } catch (err) {
    await releaseGeneration(ledger, input.visitorToken);
    const e = err as { code?: ErrorCode; retryable?: boolean; name?: string; message?: string };
    const code: ErrorCode =
      e.name === 'TimeoutError' || e.name === 'AbortError'
        ? 'GENERATION_TIMEOUT'
        : (e.code ?? 'GENERATION_FAILED');
    // Never expose provider response bodies or credentials.

    return failAndLog(
      code,
      code === 'GENERATION_TIMEOUT'
        ? 'The image generation service took too long. Please try again.'
        : code === 'QUOTA_EXCEEDED' ? 'Image budget paused. Operator review required.' : 'The image generation service failed.',
      code === 'GENERATION_TIMEOUT' ? true : (e.retryable ?? true),
      code === 'RATE_LIMITED' || code === 'QUOTA_EXCEEDED' ? 429 : code === 'GENERATION_TIMEOUT' ? 504 : 502,
    );
  }
}

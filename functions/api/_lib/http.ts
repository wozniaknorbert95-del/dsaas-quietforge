/**
 * Shared API envelope + validation helpers — SH-G1-02.
 *
 * Contract source of truth: `docs/quality/api-standard.md`
 * (§1 envelope shapes, §2 per-endpoint matrix + global requirements).
 * This is the single implementation every `functions/api/*` endpoint copies —
 * endpoints must NOT build ad-hoc response bodies.
 *
 * Intentionally pure and dependency-free (no Cloudflare types): `node --test
 * tests/contract/` imports this module directly via Node's native TypeScript
 * type stripping, so the contract test exercises the real implementation.
 *
 * Known doc↔code mismatches are declared in `tests/contract/*.mjs` and the
 * session report — docs are never silently changed here.
 */

/** Path prefix for all versioned endpoints (api-standard §2 "Versioning"). */
export const API_VERSION = 'v1';

/** Idempotency header (api-standard §2 "Idempotency"). */
export const IDEMPOTENCY_HEADER = 'Idempotency-Key';

/**
 * Fixed error-code enum (api-standard §1: "stały enum (UPPER_SNAKE)").
 * `retryable` = the default for the code (explicit override allowed per call);
 * `status` = the HTTP status the endpoint maps the code to.
 */
export const ERROR_CODES = {
  VALIDATION_ERROR: { retryable: false, status: 400 },
  UNAUTHORIZED: { retryable: false, status: 401 },
  PAYMENT_REQUIRED: { retryable: false, status: 402 },
  PAYMENT_FAILED: { retryable: false, status: 402 },
  GENERATION_FAILED: { retryable: true, status: 502 },
  GENERATION_TIMEOUT: { retryable: true, status: 504 },
  RATE_LIMITED: { retryable: true, status: 429 },
  QUOTA_EXCEEDED: { retryable: false, status: 429 },
  NOT_FOUND: { retryable: false, status: 404 },
  CONFLICT: { retryable: false, status: 409 },
  INTERNAL: { retryable: true, status: 500 },
  EXPIRED: { retryable: false, status: 410 },
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

/** Success envelope — exact shape from api-standard §1 line 1. */
export interface SuccessEnvelope {
  success: true;
  data: unknown;
  requestId: string;
  timestamp: string;
}

/** Error envelope — exact shape from api-standard §1 line 2. */
export interface ErrorEnvelope {
  success: false;
  error: {
    code: ErrorCode;
    message: string;
    retryable: boolean;
  };
  requestId: string;
}

export type Envelope = SuccessEnvelope | ErrorEnvelope;

/** `req_` + UUID — always present in every response for tracing (api-standard §1). */
export function newRequestId(): string {
  return newPrefixedId('req');
}

/** Unique prefixed ID (orders `ord_`, generations `gen_`, …). */
export function newPrefixedId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

/** Success envelope: `{ success, data, requestId, timestamp }` (api-standard §1). */
export function ok(data: unknown, requestId: string = newRequestId()): SuccessEnvelope {
  return {
    success: true,
    data,
    requestId,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Error envelope: `{ success, error { code, message, retryable }, requestId }`
 * (api-standard §1). `retryable` defaults to the code's flag in ERROR_CODES.
 */
export function fail(
  code: ErrorCode,
  message: string,
  retryable?: boolean,
  requestId: string = newRequestId(),
): ErrorEnvelope {
  return {
    success: false,
    error: {
      code,
      message,
      retryable: retryable ?? ERROR_CODES[code].retryable,
    },
    requestId,
  };
}

/** HTTP status for an error code (endpoints may override, e.g. 503 when unconfigured). */
export function statusFor(code: ErrorCode): number {
  return ERROR_CODES[code].status;
}

/** Serialize an envelope as a no-store JSON response (same shape as intake.ts). */
export function json(envelope: Envelope, status: number): Response {
  return new Response(JSON.stringify(envelope), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

/** Discriminated result for input validation (api-standard §2 "Input"). */
export type ReadResult<T> = { ok: true; value: T } | { ok: false; message: string };

export interface StringRules {
  field: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
}

/** Validate a trimmed string field (type, length, format). */
export function readString(value: unknown, rules: StringRules): ReadResult<string> {
  if (typeof value !== 'string') {
    return { ok: false, message: `${rules.field} must be a string` };
  }
  const text = value.trim();
  if (rules.min !== undefined && text.length < rules.min) {
    return { ok: false, message: `${rules.field} is too short` };
  }
  if (rules.max !== undefined && text.length > rules.max) {
    return { ok: false, message: `${rules.field} is too long` };
  }
  if (rules.pattern && !rules.pattern.test(text)) {
    return { ok: false, message: `${rules.field} has an invalid format` };
  }
  return { ok: true, value: text };
}

/** Validate a string against a closed set of allowed values. */
export function readEnum<T extends string>(
  value: unknown,
  rules: { field: string; values: readonly T[] },
): ReadResult<T> {
  if (typeof value === 'string' && (rules.values as readonly string[]).includes(value)) {
    return { ok: true, value: value as T };
  }
  return { ok: false, message: `${rules.field} must be one of: ${rules.values.join(', ')}` };
}

/** Validate an integer field (type and bounds). */
export function readInt(
  value: unknown,
  rules: { field: string; min?: number; max?: number },
): ReadResult<number> {
  const n =
    typeof value === 'number'
      ? value
      : typeof value === 'string' && value.trim() !== ''
        ? Number(value)
        : NaN;
  if (!Number.isInteger(n)) {
    return { ok: false, message: `${rules.field} must be an integer` };
  }
  if (rules.min !== undefined && n < rules.min) {
    return { ok: false, message: `${rules.field} must be >= ${rules.min}` };
  }
  if (rules.max !== undefined && n > rules.max) {
    return { ok: false, message: `${rules.field} must be <= ${rules.max}` };
  }
  return { ok: true, value: n };
}

const IDEMPOTENCY_RE = /^[A-Za-z0-9._:-]{8,128}$/;

/**
 * Extract the `Idempotency-Key` header for POST dedup (api-standard §2).
 * Returns null when absent or malformed — the endpoint decides whether that
 * is a VALIDATION_ERROR (generate) or simply "no key" (client retry safety).
 */
export function extractIdempotencyKey(request: Request): string | null {
  const raw = request.headers.get(IDEMPOTENCY_HEADER);
  if (!raw) return null;
  const key = raw.trim();
  return IDEMPOTENCY_RE.test(key) ? key : null;
}

/**
 * Constant-time string comparison for order-token auth stubs.
 * (Byte-length mismatch short-circuits — acceptable for public token lengths.)
 */
export function constantTimeEqual(a: string, b: string): boolean {
  const bytesA = new TextEncoder().encode(a);
  const bytesB = new TextEncoder().encode(b);
  if (bytesA.byteLength !== bytesB.byteLength) return false;
  let diff = 0;
  for (let i = 0; i < bytesA.byteLength; i += 1) {
    diff |= bytesA[i] ^ bytesB[i];
  }
  return diff === 0;
}

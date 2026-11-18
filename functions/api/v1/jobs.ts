/**
 * EXAMPLE endpoint — `GET /api/v1/jobs/:id` (SH-G1-02 reference implementation).
 * Contract: api-standard.md §2 matrix row + §3 job lifecycle.
 *   Input   — (job id in path) · Auth: order token · Errors: NOT_FOUND · UNAUTHORIZED
 *   Rate limit per order 60/h · Idempotent GET (safe to poll — no state mutation)
 *
 * Copy the shape of this file for every new endpoint: typed Env + Context,
 * envelope helpers from `_lib/http`, one `emitEvent` line per request, no PII,
 * no secrets in code.
 *
 * Routing note: Pages Functions maps `functions/api/v1/jobs.ts` to `/api/v1/jobs`;
 * the matrix contract path is `/api/v1/jobs/:id`. This module reads the id from
 * the URL tail so it works mounted under either path; when job routes land (G2)
 * a thin `functions/api/v1/jobs/[id].ts` re-exports `onRequest` from here.
 *
 * Auth: order-token stub — `env.JOBS_TOKEN` (Pages secret, never in repo).
 * Missing env = honest "not configured" answer (intake.ts INTAKE_NOT_READY
 * pattern): UNAUTHORIZED envelope + HTTP 503 + retryable:true. A bad client
 * token = UNAUTHORIZED 401. TODO(G2): signed, TTL'd order-scoped tokens
 * (SECURITY_THREAT_MODEL T5) replace the stub.
 *
 * Rate limiting (60/h per order) is specified in api-standard §2 but has no
 * code artifact yet — it lands with the KV-backed rate limiter (G2).
 *
 * Logging: one `emitEvent` line per request, ids only — no PII (T10).
 */

import {
  constantTimeEqual,
  fail,
  json,
  newRequestId,
  ok,
  statusFor,
  type Envelope,
  type ErrorCode,
} from '../_lib/http';
import { emitEvent } from '../_lib/observability';

interface JobsStore {
  get(key: string): Promise<string | null>;
}

interface Env {
  /** Order-token secret (Pages env). Missing => endpoint answers "not configured". */
  JOBS_TOKEN?: string;
  /** Optional KV job store (ADR Option B). Unbound => jobs resolve to NOT_FOUND. */
  JOBS?: JobsStore;
}

interface Context {
  request: Request;
  env: Env;
}

/** `gen_<uuid>` — unique generation/job id (api-standard §3). */
const JOB_ID_RE = /^gen_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const ENDPOINT = '/api/v1/jobs/:id';

type JobStatus =
  | 'CREATED'
  | 'PAYMENT_VERIFIED'
  | 'QUEUED'
  | 'PROCESSING'
  | 'QA'
  | 'COMPLETED'
  | 'FAILED'
  | 'RETRYING'
  | 'CANCELLED'
  | 'EXPIRED';

interface JobRecord {
  id: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

const readOrderToken = (request: Request): string | null => {
  const auth = request.headers.get('Authorization');
  if (auth && auth.startsWith('Bearer ')) {
    return auth.slice('Bearer '.length).trim() || null;
  }
  const header = request.headers.get('X-Order-Token');
  return header ? header.trim() || null : null;
};

const jobIdFromUrl = (url: string): string | null => {
  const { pathname } = new URL(url);
  const tail = pathname.split('/').filter(Boolean).pop();
  return tail ?? null;
};

const parseJob = (raw: string | null): JobRecord | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<JobRecord>;
    if (parsed && typeof parsed.id === 'string' && typeof parsed.status === 'string') {
      return {
        id: parsed.id,
        status: parsed.status as JobStatus,
        createdAt: typeof parsed.createdAt === 'string' ? parsed.createdAt : '',
        updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
      };
    }
  } catch {
    // Corrupt record => treat as not found (no internals leaked to the client).
  }
  return null;
};

export async function onRequest({ request, env }: Context): Promise<Response> {
  const started = Date.now();
  const requestId = newRequestId();
  const finish = (envelope: Envelope, httpStatus: number, errorCode?: ErrorCode): Response => {
    emitEvent({
      requestId,
      endpoint: ENDPOINT,
      status: httpStatus,
      duration: Date.now() - started,
      errorCode,
    });
    return json(envelope, httpStatus);
  };

  // GET is the only contract method (api-standard §2) — polling must stay idempotent.
  if (request.method !== 'GET') {
    return finish(fail('VALIDATION_ERROR', 'Method not allowed', false, requestId), 405);
  }

  // Honest 503-style degrade when the endpoint is not configured (intake.ts pattern).
  if (!env.JOBS_TOKEN) {
    return finish(fail('UNAUTHORIZED', 'Jobs API is not configured', true, requestId), 503);
  }

  const token = readOrderToken(request);
  if (!token || !constantTimeEqual(token, env.JOBS_TOKEN)) {
    return finish(
      fail('UNAUTHORIZED', 'Missing or invalid order token', undefined, requestId),
      statusFor('UNAUTHORIZED'),
    );
  }

  const id = jobIdFromUrl(request.url);
  if (!id || !JOB_ID_RE.test(id)) {
    // Same answer for malformed and unknown ids — no enumeration (T5/T9).
    return finish(fail('NOT_FOUND', 'Job not found', undefined, requestId), statusFor('NOT_FOUND'));
  }

  const raw = env.JOBS ? await env.JOBS.get(`job:${id}`).catch(() => null) : null;
  const job = parseJob(raw);
  if (!job) {
    return finish(fail('NOT_FOUND', 'Job not found', undefined, requestId), statusFor('NOT_FOUND'));
  }

  return finish(ok(job, requestId), 200);
}

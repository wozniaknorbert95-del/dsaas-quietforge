/**
 * CONTRACT TEST — docs/quality/api-standard.md ↔ functions/api (SH-G1-02).
 *
 * Approach (source-level + behavioral — no new npm dependencies):
 * 1) Behavioral: this test imports the REAL TypeScript modules through Node's
 *    native TypeScript type stripping (Node >= 22.6; verified on Node 24).
 *    `functions/api/_lib/http.ts` is pure and self-contained, so
 *    `node --test tests/contract/` executes the actual envelope/validators logic.
 * 2) Doc↔code verification: the test parses the CONTRACT DOCUMENT
 *    (api-standard.md §1 envelope JSON shapes, §2 error-code matrix) and asserts
 *    the implementation matches — this IS the "test kontraktu".
 * 3) Pages Function handlers (jobs.ts) are verified at source level (imports,
 *    envelope-only responses, auth/NOT_FOUND/idempotency/no-PII-logging rules);
 *    runtime handler tests arrive with the E2E framework (SH-G1-04).
 *
 * Run: node --test "tests/contract/*.test.mjs"
 * (Node 24 treats positional --test args as globs; a bare directory arg is not
 * discovered on Windows — the glob form is the supported invocation.)
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');

const http = await import(
  pathToFileURL(path.join(ROOT, 'functions', 'api', '_lib', 'http.ts')).href
);
const {
  ok,
  fail,
  json,
  ERROR_CODES,
  newRequestId,
  newPrefixedId,
  extractIdempotencyKey,
  readString,
  readEnum,
  readInt,
  constantTimeEqual,
  statusFor,
} = http;

const apiStandardDoc = read(path.join('docs', 'quality', 'api-standard.md'));
const jobsSrc = read(path.join('functions', 'api', 'v1', 'jobs.ts'));

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// ---------------------------------------------------------------------------
// §1 envelope — doc shapes vs implementation (behavioral)
// ---------------------------------------------------------------------------

const envelopeFence = apiStandardDoc
  .match(/## 1\.[\s\S]*?```json\r?\n([\s\S]*?)```/)[1]
  .trim()
  .split('\n');
const docSuccessShape = JSON.parse(envelopeFence[0]);
const docErrorShape = JSON.parse(envelopeFence[1]);

test('envelope: ok() keys match api-standard §1 success shape exactly', () => {
  const env = ok({ any: 'data' }, 'req_test');
  assert.deepEqual(
    Object.keys(env).sort(),
    Object.keys(docSuccessShape).sort(),
    'success envelope keys must equal the documented shape',
  );
  assert.equal(env.success, true);
  assert.equal(env.requestId, 'req_test');
  assert.deepEqual(env.data, { any: 'data' });
  assert.equal(Number.isNaN(Date.parse(env.timestamp)), false, 'timestamp must be ISO-8601');
});

test('envelope: fail() keys match api-standard §1 error shape exactly', () => {
  const env = fail('GENERATION_FAILED', 'Generation could not be completed', true, 'req_test');
  assert.deepEqual(
    Object.keys(env).sort(),
    Object.keys(docErrorShape).sort(),
    'error envelope keys must equal the documented shape',
  );
  assert.deepEqual(
    Object.keys(env.error).sort(),
    Object.keys(docErrorShape.error).sort(),
    'error object keys must equal code/message/retryable',
  );
  assert.equal(env.success, false);
  assert.equal(env.error.code, 'GENERATION_FAILED');
  assert.equal(env.error.retryable, true);
});

test('requestId: req_ prefix + UUID, generated when not supplied', () => {
  const id = newRequestId();
  assert.match(id, /^req_/);
  assert.match(id.slice('req_'.length), UUID_RE);
  const env = ok(null);
  assert.match(env.requestId, /^req_/);
});

test('unique ids: gen_/ord_ prefixed ids match the job-id contract', () => {
  const gen = newPrefixedId('gen');
  const jobRe = /^gen_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  assert.match(gen, jobRe);
  assert.match(newPrefixedId('ord'), /^ord_/);
});

// ---------------------------------------------------------------------------
// §2 error-code matrix — doc codes vs ERROR_CODES (source↔doc)
// ---------------------------------------------------------------------------

const REQUIRED_CODES = [
  'VALIDATION_ERROR',
  'UNAUTHORIZED',
  'PAYMENT_REQUIRED',
  'PAYMENT_FAILED',
  'GENERATION_FAILED',
  'GENERATION_TIMEOUT',
  'RATE_LIMITED',
  'QUOTA_EXCEEDED',
  'NOT_FOUND',
  'CONFLICT',
  'INTERNAL',
  'EXPIRED',
];

test('ERROR_CODES: contains all 12 contract codes with retryable + status', () => {
  for (const code of REQUIRED_CODES) {
    assert.ok(code in ERROR_CODES, `missing error code: ${code}`);
    assert.equal(typeof ERROR_CODES[code].retryable, 'boolean', `${code}.retryable`);
    assert.equal(typeof ERROR_CODES[code].status, 'number', `${code}.status`);
  }
});

test('ERROR_CODES: doc §2 matrix codes and implementation are in sync', () => {
  const matrixCodes = new Set();
  for (const line of apiStandardDoc.split('\n')) {
    const cells = line.split('|');
    // Matrix rows: | `POST/GET ...` | input | auth | error codes | rate limit |
    if (cells.length >= 6 && /`(?:POST|GET) /.test(cells[1])) {
      for (const match of cells[4].matchAll(/\b[A-Z][A-Z_]+\b/g)) {
        matrixCodes.add(match[0]);
      }
    }
  }
  assert.ok(matrixCodes.size > 0, 'no codes parsed from the §2 matrix — doc format changed?');
  for (const code of matrixCodes) {
    assert.ok(code in ERROR_CODES, `doc matrix code not implemented: ${code}`);
  }
  for (const code of Object.keys(ERROR_CODES)) {
    assert.ok(matrixCodes.has(code), `implemented code missing from doc matrix: ${code}`);
  }
});

test('retryable defaults follow api-standard §Retry (only safe retries)', () => {
  assert.equal(ERROR_CODES.GENERATION_FAILED.retryable, true);
  assert.equal(ERROR_CODES.GENERATION_TIMEOUT.retryable, true);
  assert.equal(ERROR_CODES.RATE_LIMITED.retryable, true);
  assert.equal(ERROR_CODES.INTERNAL.retryable, true);
  assert.equal(ERROR_CODES.VALIDATION_ERROR.retryable, false);
  assert.equal(ERROR_CODES.UNAUTHORIZED.retryable, false);
  assert.equal(ERROR_CODES.PAYMENT_REQUIRED.retryable, false);
  assert.equal(ERROR_CODES.PAYMENT_FAILED.retryable, false);
  assert.equal(ERROR_CODES.QUOTA_EXCEEDED.retryable, false);
  assert.equal(ERROR_CODES.NOT_FOUND.retryable, false);
  assert.equal(ERROR_CODES.CONFLICT.retryable, false);
  assert.equal(ERROR_CODES.EXPIRED.retryable, false);
  // Explicit override wins over the default.
  assert.equal(fail('RATE_LIMITED', 'slow down', false).error.retryable, false);
  assert.equal(fail('NOT_FOUND', 'gone', true).error.retryable, true);
  // Default when not passed.
  assert.equal(fail('INTERNAL', 'boom').error.retryable, ERROR_CODES.INTERNAL.retryable);
});

test('doc §Retry rule "max 2" is stable (retry cap has no code artifact yet)', () => {
  // The retry cap lives in future generation code (G2) — this guards doc drift.
  assert.match(apiStandardDoc, /max 2/);
});

// ---------------------------------------------------------------------------
// Validation + idempotency helpers (behavioral)
// ---------------------------------------------------------------------------

test('readString: type, trim, length and pattern rules', () => {
  assert.deepEqual(readString('  hi  ', { field: 'name' }), { ok: true, value: 'hi' });
  assert.equal(readString(42, { field: 'name' }).ok, false);
  assert.equal(readString('a', { field: 'name', min: 2 }).ok, false);
  assert.equal(readString('abc', { field: 'name', max: 2 }).ok, false);
  assert.equal(readString('x', { field: 'id', pattern: /^[a-z]+$/ }).ok, true);
  assert.equal(readString('X', { field: 'id', pattern: /^[a-z]+$/ }).ok, false);
});

test('readEnum: closed value set', () => {
  const rules = { field: 'status', values: ['QUEUED', 'DONE'] };
  assert.deepEqual(readEnum('QUEUED', rules), { ok: true, value: 'QUEUED' });
  assert.equal(readEnum('NOPE', rules).ok, false);
  assert.equal(readEnum(7, rules).ok, false);
});

test('readInt: integer type and bounds', () => {
  assert.deepEqual(readInt('3', { field: 'qty', min: 1, max: 5 }), { ok: true, value: 3 });
  assert.equal(readInt(2.5, { field: 'qty' }).ok, false);
  assert.equal(readInt(0, { field: 'qty', min: 1 }).ok, false);
  assert.equal(readInt(9, { field: 'qty', max: 5 }).ok, false);
});

test('extractIdempotencyKey: header extraction with strict format', () => {
  const withKey = new Request('https://x.test/api', {
    headers: { 'Idempotency-Key': 'order-42-attempt-1' },
  });
  assert.equal(extractIdempotencyKey(withKey), 'order-42-attempt-1');
  const missing = new Request('https://x.test/api');
  assert.equal(extractIdempotencyKey(missing), null);
  const malformed = new Request('https://x.test/api', {
    headers: { 'Idempotency-Key': 'bad key!' },
  });
  assert.equal(extractIdempotencyKey(malformed), null);
});

test('constantTimeEqual: exact match only', () => {
  assert.equal(constantTimeEqual('secret-token', 'secret-token'), true);
  assert.equal(constantTimeEqual('secret-token', 'secret-tokeX'), false);
  assert.equal(constantTimeEqual('short', 'longer-value'), false);
});

test('statusFor: error codes map to HTTP statuses', () => {
  assert.equal(statusFor('NOT_FOUND'), 404);
  assert.equal(statusFor('UNAUTHORIZED'), 401);
  assert.equal(statusFor('QUOTA_EXCEEDED'), 429);
});

test('json(): enforces JSON content type + no-store', async () => {
  const res = json(ok(null, 'req_x'), 200);
  assert.equal(res.headers.get('Content-Type'), 'application/json; charset=utf-8');
  assert.equal(res.headers.get('Cache-Control'), 'no-store');
  assert.equal((await res.json()).success, true);
});

// ---------------------------------------------------------------------------
// jobs.ts — reference endpoint source-level contract
// ---------------------------------------------------------------------------

test('jobs.ts: responds only through envelope helpers (no ad-hoc bodies)', () => {
  assert.match(jobsSrc, /\bok\(/, 'must use ok()');
  assert.match(jobsSrc, /\bfail\(/, 'must use fail()');
  assert.match(jobsSrc, /\bjson\(/, 'must use json()');
  assert.doesNotMatch(jobsSrc, /new Response\(/, 'no ad-hoc Response construction');
  assert.doesNotMatch(jobsSrc, /JSON\.stringify\(/, 'no ad-hoc JSON bodies');
});

test('jobs.ts: order-token auth stub + honest 503 when unconfigured', () => {
  assert.match(jobsSrc, /JOBS_TOKEN/);
  assert.match(jobsSrc, /fail\('UNAUTHORIZED', 'Jobs API is not configured', true/, 'env missing => UNAUTHORIZED + retryable:true');
  assert.match(jobsSrc, /503/, 'env missing => HTTP 503 (intake.ts honest-degrade pattern)');
  assert.match(jobsSrc, /constantTimeEqual\(/, 'token comparison must be constant-time');
});

test('jobs.ts: NOT_FOUND path for malformed and unknown job ids (no enumeration)', () => {
  assert.match(jobsSrc, /'NOT_FOUND'/);
  assert.match(jobsSrc, /JOB_ID_RE/);
});

test('jobs.ts: GET stays idempotent — no state mutation', () => {
  assert.match(jobsSrc, /request\.method !== 'GET'/);
  assert.doesNotMatch(jobsSrc, /\.put\(/, 'idempotent GET must not write state');
});

test('jobs.ts: one emitEvent per request, zero PII logging', () => {
  assert.match(jobsSrc, /emitEvent\(/);
  assert.doesNotMatch(jobsSrc, /console\./, 'no direct console logging in endpoints');
  assert.doesNotMatch(jobsSrc, /email/i, 'no email handling in jobs endpoint');
});

test('jobs.ts: versioned path + shared _lib imports only', () => {
  assert.match(jobsSrc, /\/api\/v1\/jobs/);
  const imports = [...jobsSrc.matchAll(/from '([^']+)'/g)].map((m) => m[1]);
  for (const spec of imports) {
    assert.match(spec, /^\.\.\/_lib\//, `unexpected import: ${spec}`);
  }
});

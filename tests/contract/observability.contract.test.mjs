/**
 * CONTRACT TEST — docs/quality/observability-cost-control.md + SECURITY_THREAT_MODEL.md
 * ↔ functions/api/_lib/observability.ts (SH-G1-06).
 *
 * Approach (source-level + behavioral — no new npm dependencies):
 * 1) Behavioral: `functions/api/_lib/pii.ts` is pure and import-free, so
 *    `node --test tests/contract/` imports the REAL module via Node's native
 *    TypeScript type stripping and unit-tests maskEmail/maskToken/scrubText.
 * 2) Doc↔code verification: this test parses the contract docs (§1 event fields,
 *    §3 ledger fields, §4 budgets) and asserts the implementation matches.
 *    `observability.ts` carries runtime imports for the Pages Functions bundler,
 *    so its logic is verified at source level here; runtime coverage arrives
 *    with the E2E framework (SH-G1-04).
 *
 * KNOWN DOC↔CODE MISMATCHES (declared, NOT silently fixed in the docs):
 * - `costEstimate` (observability §1) vs `cost` (code): api-standard.md §2
 *   mandates ONE name everywhere — "Pole kosztu zdarzenia = `cost`". The emitted
 *   line uses `cost`; the docs disagree with each other and need an L2 decision.
 * - ledger fields `input`/`output` (observability §3) are OPTIONAL in the code:
 *   the mandated recordCost signature is
 *   {orderId, model, cost, retryCount, duration, status}.
 * - `perSessionGenerations: 3` and alertThresholds {3 EUR, 20%} have no numeric
 *   source in the docs (threat model §3 gives per-order 5 + retry max 2; §4
 *   suggests €20/day but defers the value to the Commander, L4).
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

const pii = await import(
  pathToFileURL(path.join(ROOT, 'functions', 'api', '_lib', 'pii.ts')).href
);
const { maskEmail, maskToken, scrubText } = pii;

const obsSrc = read(path.join('functions', 'api', '_lib', 'observability.ts'));
const obsDoc = read(path.join('docs', 'quality', 'observability-cost-control.md'));
const threatDoc = read(path.join('docs', 'SECURITY_THREAT_MODEL.md'));

// Field-name mapping for declared doc↔code mismatches (see header).
// RESOLVED 2026-11-18 (L2): `costEstimate` → `cost` unified in observability §1 per
// api-standard §2 "jedna nazwa wszędzie". Guard below now protects the unified name.
const FIELD_MISMATCHES = {};

// ---------------------------------------------------------------------------
// PII masking (behavioral — real pii.ts module)
// ---------------------------------------------------------------------------

test('maskEmail: masks local part, keeps domain', () => {
  assert.equal(maskEmail('anna@acme.nl'), 'a***@acme.nl');
  assert.equal(maskEmail('a@b.nl'), 'a***@b.nl');
  assert.equal(maskEmail('not-an-email'), '***');
  assert.equal(maskEmail(''), '***');
});

test('maskToken: keeps short prefix only', () => {
  assert.equal(maskToken('tok_abcdef123'), 'tok_***');
  assert.equal(maskToken('abcd'), '***');
});

test('scrubText: no raw emails or tokens survive', () => {
  const scrubbed = scrubText('contact anna@acme.nl, auth Bearer sk_secret123 ok');
  assert.doesNotMatch(scrubbed, /anna@acme\.nl/);
  assert.doesNotMatch(scrubbed, /sk_secret123/);
  assert.match(scrubbed, /a\*\*\*@acme\.nl/);
});

// ---------------------------------------------------------------------------
// §1 event structure — doc fields vs emitEvent implementation (source↔doc)
// ---------------------------------------------------------------------------

test('emitEvent: covers every observability §1 field (declared mismatches applied)', () => {
  const fieldLine = obsDoc.match(/`(requestId[^\n]*cost)`/)[1];
  const docFields = fieldLine.split(/[^\w]+/).filter(Boolean);

  const lineBlock = obsSrc.match(/const line = \{([\s\S]*?)\};/)[1];
  const codeFields = [...lineBlock.matchAll(/^\s*(\w+):/gm)].map((m) => m[1]);

  for (const docField of docFields) {
    const expected = FIELD_MISMATCHES[docField] ?? docField;
    assert.ok(
      codeFields.includes(expected),
      `§1 field ${docField} not emitted (expected code field: ${expected})`,
    );
  }
  // Every emitted key must be a documented field (mapped) — nothing extra, no PII.
  const allowed = new Set(docFields.map((f) => FIELD_MISMATCHES[f] ?? f));
  for (const codeField of codeFields) {
    assert.ok(allowed.has(codeField), `emitted field not in §1 contract: ${codeField}`);
    assert.doesNotMatch(codeField, /email|token/i, 'no PII field names in log events');
  }
});

test('emitEvent: request/job ids and endpoint flow through scrubText (T10)', () => {
  const lineBlock = obsSrc.match(/const line = \{([\s\S]*?)\};/)[1];
  for (const field of ['requestId', 'orderId', 'projectId', 'endpoint', 'model']) {
    assert.match(lineBlock, new RegExp(`${field}: [^\\n]*scrubText\\(`), `${field} must be masked`);
  }
});

test('doc §1 unifies cost field name as `cost` (mismatch resolved)', () => {
  assert.doesNotMatch(obsDoc, /costEstimate/, 'doc must not resurrect the old name');
  assert.match(obsDoc, /· cost`/, 'doc §1 names the field `cost`');
  assert.match(obsSrc, /cost: evt\.cost/, 'code emits the api-standard name `cost`');
  assert.equal(FIELD_MISMATCHES.costEstimate, undefined);
});

// ---------------------------------------------------------------------------
// §3 cost ledger (source↔doc)
// ---------------------------------------------------------------------------

test('recordCost: ledger entry covers observability §3 fields (input/output optional)', () => {
  const entryBlock = obsSrc.match(/export interface LedgerEntry \{([\s\S]*?)\}/)[1];
  for (const field of ['orderId', 'model', 'cost', 'retryCount', 'duration', 'status']) {
    assert.match(entryBlock, new RegExp(`\\b${field}\\??:`), `LedgerEntry missing ${field}`);
  }
  // Declared mismatch: §3 lists input/output; code carries them optional.
  assert.match(entryBlock, /input\?:/);
  assert.match(entryBlock, /output\?:/);
});

test('recordCost: AI_LEDGER binding + graceful no-op when unbound', () => {
  assert.match(obsSrc, /AI_LEDGER/);
  assert.match(obsSrc, /if \(!ledger\)/);
  assert.match(obsSrc, /LEDGER_UNBOUND/);
  assert.match(obsSrc, /LEDGER_WRITE_FAILED/);
});

// ---------------------------------------------------------------------------
// §4 budgets (source↔doc)
// ---------------------------------------------------------------------------

const budgetsBlock = obsSrc.match(/export const BUDGETS = \{([\s\S]*?)\} as const;/)[1];

test('BUDGETS: all required fields with documented defaults', () => {
  assert.match(budgetsBlock, /globalDailyEur:\s*20\b/);
  assert.match(budgetsBlock, /perOrderGenerations:\s*5\b/);
  assert.match(budgetsBlock, /perSessionGenerations:\s*3\b/);
  assert.match(budgetsBlock, /alertThresholds:\s*\{[\s\S]*?costPerOrderEur:\s*3\b/);
  assert.match(budgetsBlock, /retryRatePct:\s*20\b/);
});

test('budget numbers bind to SECURITY_THREAT_MODEL §3 (single source)', () => {
  // Header note required by the task brief.
  assert.match(obsSrc, /SECURITY_THREAT_MODEL §3/);
  // per-order generation cap: doc §3 "per order 5 generacji" == code default 5.
  const docLimit = Number(threatDoc.match(/per order (\d+) generacji/)[1]);
  const codeLimit = Number(budgetsBlock.match(/perOrderGenerations:\s*(\d+)/)[1]);
  assert.equal(codeLimit, docLimit, 'perOrderGenerations must equal threat model §3');
  // daily budget: observability §4 suggests €20 == code default (Commander sets final, L4).
  assert.match(obsDoc, /€20/);
  const codeDaily = Number(budgetsBlock.match(/globalDailyEur:\s*(\d+)/)[1]);
  assert.equal(codeDaily, 20);
});

test('checkBudget: QUOTA_EXCEEDED hard stop + env overrides + session/order caps', () => {
  assert.match(obsSrc, /export async function checkBudget/);
  assert.match(obsSrc, /'QUOTA_EXCEEDED'/);
  assert.match(obsSrc, /'daily-ai-budget-exceeded'/);
  assert.match(obsSrc, /'order-generation-limit'/);
  assert.match(obsSrc, /'session-generation-limit'/);
  for (const envName of [
    'AI_DAILY_BUDGET_EUR',
    'AI_ORDER_GENERATION_LIMIT',
    'AI_SESSION_GENERATION_LIMIT',
  ]) {
    assert.match(obsSrc, new RegExp(envName), `missing env override ${envName}`);
  }
});

test('observability: no PII in emitted payloads by construction', () => {
  // TelemetryEvent fields only carry ids/statuses/numbers — no message/body slot.
  const evtBlock = obsSrc.match(/export interface TelemetryEvent \{([\s\S]*?)\}/)[1];
  assert.doesNotMatch(evtBlock, /email|token/i);
  assert.match(obsSrc, /import \{ scrubText \} from '\.\/pii';/, 'masking comes from pii.ts');
});

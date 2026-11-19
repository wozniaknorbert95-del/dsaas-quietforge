/**
 * POST /api/v1/generate-art — vehicle wrap ARTWORK generation (Phase 1, free).
 *
 * Decided stack (2026-11-19, todos/inspire.json) — HYBRID:
 *   Workers AI `flux-1-schnell` (FREE 10k neurons/day, no credit card, Apache-2.0)
 *   generates FLAT wrap artwork (text2image) for BOTH product variants in one
 *   action (Standard + Premium = our EUR149/EUR399 cards); the customer's real
 *   logo is composited MECHANICALLY on the client (panel-map.json + vehicle
 *   templates) — never through AI (brand integrity).
 *
 * Provider choice (2026-11-19, Commander decision): OVHcloud SDXL rejected —
 * its Public Cloud project requires a EUR100 credit provision (hidden entry
 * cost). Cloudflare SDXL is deprecated 2026-11-20. flux-1-schnell runs on the
 * same account as this Pages project (binding `AI`), verified in official docs:
 * env.AI.run -> { image: base64 }. Neuron math: 1024x1024 @ steps=4 = 19.2 +
 * 4x38.4 = ~173 neurons/image; one action = 2 images ~= 346; daily cap 10
 * actions ~= 3.5k of the free 10k/day.
 *
 * Phase 1 = free tier: ONE generation action (= 2 variants) per visitor + hard
 * daily cap (KV counters). Phase 2 = Mollie payments + premium model.
 *
 * Contract: docs/quality/api-standard.md §2 (envelope, codes, idempotency,
 * 120 s timeout). Limits via KV (atomicity gap documented in SH-G1-06).
 * Prompt: Commander-approved (2026-11-19) — flat artwork, no text/logo/vehicle.
 */

import { ok, fail, json, newRequestId, extractIdempotencyKey, type ErrorCode } from '../_lib/http';
import { emitEvent, type KVLike } from '../_lib/observability';

interface LedgerKV extends KVLike {
  delete(key: string): Promise<unknown>;
}

/** Minimal Workers AI binding shape (no @cloudflare/workers-types dependency). */
interface AiLike {
  run(model: string, input: Record<string, unknown>): Promise<{ image?: string }>;
}

interface Env {
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
  panels?: string[];
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
const ALLOWED_PANELS = [
  'side doors',
  'rear doors',
  'rear hatch',
  'full side panel',
  'front doors',
];

function sanitizeText(value: unknown, maxLength = 100): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[<>]/g, '').trim().slice(0, maxLength);
}

function sanitizeColors(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((c): c is string => typeof c === 'string' && /^#[0-9A-Fa-f]{6}$/.test(c))
    .slice(0, 5);
}

function buildPrompt(
  input: GenerateRequest,
  style: 'standard' | 'premium',
): string {
  const colors = sanitizeColors(input.brandColors);
  const vehicle = ALLOWED_VEHICLES.includes(input.vehicleType ?? '') ? input.vehicleType! : 'medium van';
  const panels = Array.isArray(input.panels)
    ? input.panels.filter((p) => ALLOWED_PANELS.includes(p)).slice(0, 5)
    : ['side doors', 'rear doors'];
  const businessType = sanitizeText(input.businessType, 80);

  const colorDescription =
    colors.length > 0 ? colors.join(', ') : 'professional complementary commercial brand colors';
  const styleDescription =
    style === 'premium'
      ? 'premium luxury commercial design, sophisticated minimalist composition, elegant typography-free graphics, high-end visual identity, refined metallic accents, carefully balanced negative space'
      : 'modern professional commercial design, clean geometric graphics, bold visual hierarchy, attractive brand colors, practical and production-ready vinyl wrap artwork';

  return `
Create a professional commercial vehicle vinyl wrap DESIGN ARTWORK.

IMPORTANT: Generate a FLAT GRAPHIC DESIGN, NOT a photograph of a vehicle.

VEHICLE CATEGORY:
${vehicle}

BRAND COLORS:
${colorDescription}

DESIGN STYLE:
${styleDescription}

BUSINESS CATEGORY:
${businessType || 'general commercial business'}

TARGET VEHICLE PANELS:
${panels.join(', ')}

ARTWORK REQUIREMENTS:

- Create a flat, front-facing graphic artwork suitable for printing on commercial vehicle vinyl wrap.
- The artwork must be a clean, professional, production-oriented branding design.
- Design for the selected vehicle category and the selected body panels.
- Use the requested brand colors as the primary color palette.
- Create cohesive shapes, graphic patterns, flowing lines, geometric elements and decorative visual elements.
- Ensure the composition has a clear hierarchy and balanced visual weight.
- Keep areas for logo placement clean and uncluttered.
- Leave a large, clean area where a company logo can be mechanically added later.
- Leave clear space for contact details to be added programmatically.
- Make the design look professional, commercially usable and visually attractive.
- The artwork should be suitable for adaptation to vehicle body panels.
- Use a clean vector-art aesthetic.
- Crisp edges.
- High contrast.
- Consistent design language.
- Professional graphic design quality.
- 1024x1024 square canvas.

DO NOT GENERATE:

- A photograph of a car, van, truck or vehicle.
- A 3D vehicle render.
- A mockup showing artwork applied to a vehicle.
- Vehicle wheels, windows, mirrors, lights or body panels.
- Any text.
- Any letters.
- Any numbers.
- Any logo.
- Any brand name.
- Any watermark.
- Any QR code.
- Any signature.
- Any photographic background.

The final output must be ONLY a flat square commercial vehicle wrap graphic design, suitable for later compositing onto a real vehicle photograph.

Avoid malformed graphics, random visual clutter, illegible details, low-quality vector shapes, blurry edges, pixelation, excessive gradients and inconsistent color usage.
`.trim();
}

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

/** flux-1-schnell via the Pages Workers AI binding (docs-verified contract). */
async function callProvider(env: Env, prompt: string): Promise<ProviderImage> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(Object.assign(new Error('generation timeout'), { name: 'TimeoutError' })), GENERATION_TIMEOUT_MS);
  });

  const result = await Promise.race([
    env.AI!.run(MODEL, {
      prompt,
      steps: STEPS,
      seed: Math.floor(Math.random() * 2_147_483_647),
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
      model: MODEL,
      cost: 0,
    });
    return json(fail(code, message, retryable, requestId), status);
  };

  if (!env.AI) {
    return failAndLog('INTERNAL', 'Image generation service is not configured.', false, 503);
  }

  let input: GenerateRequest;
  try {
    input = (await request.json()) as GenerateRequest;
  } catch {
    return failAndLog('VALIDATION_ERROR', 'Invalid JSON request body.', false, 400);
  }

  if (!input.visitorToken || !VISITOR_TOKEN_RE.test(input.visitorToken)) {
    return failAndLog('VALIDATION_ERROR', 'A valid visitor token is required.', false, 400);
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

  // One action = both product variants (Standard + Premium = our two cards).
  const variants: Array<'standard' | 'premium'> = input.style ? [input.style] : ['standard', 'premium'];

  try {
    const images: Array<{ style: string; image: ProviderImage }> = [];
    for (const style of variants) {
      const image = await callProvider(env, buildPrompt(input, style));
      images.push({ style, image });
    }

    if (idempotencyKey) {
      await ledger.put(`gen:idem:${idempotencyKey}`, requestId);
    }

    emitEvent({
      requestId,
      endpoint: 'generate-art',
      status: 200,
      duration: Date.now() - started,
      model: MODEL,
      cost: 0,
    });

    return json(
      ok(
        {
          images,
          quota: { dailyRemaining: reservation.dailyRemaining },
        },
        requestId,
      ),
      200,
    );
  } catch (err) {
    await releaseGeneration(ledger, input.visitorToken);
    const e = err as { code?: ErrorCode; retryable?: boolean; name?: string };
    const code: ErrorCode =
      e.name === 'TimeoutError' || e.name === 'AbortError'
        ? 'GENERATION_TIMEOUT'
        : (e.code ?? 'GENERATION_FAILED');
    return failAndLog(
      code,
      code === 'GENERATION_TIMEOUT'
        ? 'The image generation service took too long. Please try again.'
        : 'The image generation service failed.',
      code === 'GENERATION_TIMEOUT' ? true : (e.retryable ?? true),
      code === 'RATE_LIMITED' ? 429 : code === 'GENERATION_TIMEOUT' ? 504 : 502,
    );
  }
}

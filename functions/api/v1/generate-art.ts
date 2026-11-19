/**
 * POST /api/v1/generate-art — vehicle wrap ARTWORK generation (Phase 1, free).
 *
 * Decided stack (2026-11-19, todos/inspire.json): hybrid —
 *   SDXL (OVHcloud AI Endpoints, FREE, OpenAI-compatible) generates FLAT wrap
 *   artwork (text2image); the customer's real logo is composited MECHANICALLY
 *   on the client (panel-map.json + vehicle templates) — never through AI.
 *
 * Phase 1 = free tier, 1 generation per visitor + hard daily cap (KV counters).
 * Phase 2 (todos/flexgrafik-v2.json) = Mollie payments + premium model.
 *
 * Limits: GPT-proposed Durable Object is NOT available on Pages Functions
 * (ADR-001 Option B) — counters live in the same KV as the cost ledger
 * (accepted atomicity gap, same as recordCost; DO arrives with Phase 2 infra).
 * Prompt template: Commander-approved (2026-11-19) flat-artwork prompt —
 * no text/logos/vehicle in the image; logo/contact are added later.
 */

import { ok, fail, json, newRequestId, type ErrorCode } from '../_lib/http';
import { emitEvent, type KVLike } from '../_lib/observability';

interface LedgerKV extends KVLike {
  delete(key: string): Promise<unknown>;
}

interface Env {
  OVH_API_KEY?: string;
  /** KV — cost ledger + generation counters (SH-G1-06). */
  AI_LEDGER?: LedgerKV;
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

const OVH_URL = 'https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/images/generations';
const MODEL = 'stable-diffusion-xl-base-v10';

/** Phase 1 product rule: one free generation per visitor. */
const VISITOR_LIMIT = 1;
const DAILY_CAP_DEFAULT = 10;

const VISITOR_TOKEN_RE = /^[a-zA-Z0-9_-]{16,128}$/;
const ALLOWED_VEHICLES = ['compact van', 'medium van', 'large van', 'passenger car'];
const ALLOWED_STYLES = ['standard', 'premium'];
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

function buildPrompt(input: GenerateRequest): string {
  const colors = sanitizeColors(input.brandColors);
  const style = ALLOWED_STYLES.includes(input.style ?? '') ? input.style! : 'standard';
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

/** One free generation per visitor + hard daily cap (KV; atomicity gap documented). */
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

export async function onRequestPost(context: Context): Promise<Response> {
  const started = Date.now();
  const requestId = newRequestId();
  const { request, env } = context;

  const failAndLog = (code: ErrorCode, message: string, retryable: boolean, status: number): Response => {
    emitEvent({
      requestId,
      endpoint: 'generate-art',
      status: status,
      duration: Date.now() - started,
      errorCode: code,
      model: MODEL,
      cost: 0,
    });
    return json(fail(code, message, retryable, requestId), status);
  };

  if (!env.OVH_API_KEY) {
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

  const dailyCap = DAILY_CAP_DEFAULT;
  const reservation = await reserveGeneration(ledger, input.visitorToken, dailyCap);
  if (!reservation.ok) {
    const code: ErrorCode = 'QUOTA_EXCEEDED';
    return failAndLog(
      code,
      reservation.reason === 'VISITOR_LIMIT'
        ? 'You have already used your free generation.'
        : 'The daily free generation limit has been reached. Please try again tomorrow.',
      reservation.reason !== 'VISITOR_LIMIT',
      429,
    );
  }

  const prompt = buildPrompt(input);

  try {
    const apiResponse = await fetch(OVH_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.OVH_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: MODEL, prompt, n: 1, size: '1024x1024' }),
    });

    if (!apiResponse.ok) {
      await releaseGeneration(ledger, input.visitorToken);
      const retryable = apiResponse.status === 429 || apiResponse.status >= 500;
      return failAndLog(
        retryable ? 'GENERATION_FAILED' : 'GENERATION_FAILED',
        apiResponse.status === 429
          ? 'The image generation service is temporarily rate limited.'
          : 'The image generation service failed.',
        retryable,
        apiResponse.status === 429 ? 429 : 502,
      );
    }

    const result = (await apiResponse.json()) as {
      data?: Array<{ b64_json?: string; url?: string }>;
    };
    const image = result.data?.[0];

    if (!image?.b64_json && !image?.url) {
      await releaseGeneration(ledger, input.visitorToken);
      return failAndLog('GENERATION_FAILED', 'The image provider returned no image.', true, 502);
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
          image: image.b64_json
            ? { format: 'base64', mimeType: 'image/png', data: image.b64_json }
            : { format: 'url', url: image.url },
          quota: { dailyRemaining: reservation.dailyRemaining },
        },
        requestId,
      ),
      200,
    );
  } catch {
    await releaseGeneration(ledger, input.visitorToken);
    return failAndLog('GENERATION_FAILED', 'Could not reach the image generation service.', true, 502);
  }
}

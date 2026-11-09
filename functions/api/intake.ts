/**
 * Cloudflare Pages Function — POST /api/intake (MIG-30 / QUI-247).
 *
 * Replaces the former Next.js route src/app/api/intake (a static export has no API routes).
 * Mail goes out via the Resend HTTP API. Until Resend is configured in the Pages project
 * settings (RESEND_API_KEY, INTAKE_FROM, INTAKE_TO — secrets live ONLY there, never in
 * the repo), the endpoint answers 503 { error: 'INTAKE_NOT_READY' } and the form shows an
 * honest message instead of failing silently.
 */

interface Env {
  RESEND_API_KEY?: string;
  INTAKE_FROM?: string;
  INTAKE_TO?: string;
  INTAKE_DISABLED?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SKU_IDS = ['hours', 'both-lanes', 'decision'] as const;
const DEFAULT_SKU = 'hours';

const json = (body: Record<string, unknown>, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const isReady = (env: Env): boolean =>
  env.INTAKE_DISABLED !== 'true' && Boolean(env.RESEND_API_KEY && env.INTAKE_FROM && env.INTAKE_TO);

async function handlePost(request: Request, env: Env): Promise<Response> {
  if (!isReady(env)) {
    return json({ ok: false, error: 'INTAKE_NOT_READY' }, 503);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'INVALID_JSON' }, 400);
  }

  const str = (v: unknown): string => (typeof v === 'string' ? v : '');
  const arr = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : []);
  const trimmed = (v: unknown): string => str(v).trim();

  // Honeypot — must stay empty.
  if (str(body.website)) {
    return json({ ok: false, error: 'BOT_DETECTED' }, 422);
  }

  // GDPR/AVG: personal data is processed only with explicit consent.
  if (body.consent !== true) {
    return json({ ok: false, error: 'CONSENT_REQUIRED' }, 422);
  }

  const name = trimmed(body.name);
  const company = trimmed(body.company);
  const email = trimmed(body.email);
  const url = trimmed(body.url);
  if (!name || !company || !EMAIL_RE.test(email) || !url) {
    return json({ ok: false, error: 'VALIDATION' }, 422);
  }

  const skuRaw = trimmed(body.skuId);
  const skuId = (SKU_IDS as readonly string[]).includes(skuRaw) ? skuRaw : DEFAULT_SKU;

  const text = [
    'New Hours Engine Scan request',
    '',
    `SKU:             ${skuId}`,
    `Name:            ${name}`,
    `Company:         ${company}`,
    `Email:           ${email}`,
    `Website:         ${url}`,
    `Biggest pain:    ${arr(body.pains).join(', ') || '—'}`,
    `Budget:          ${trimmed(body.budget) || '—'}`,
    `Availability:    ${str(body.availability) || '—'}`,
    `Note:            ${str(body.other) || '—'}`,
    '',
    `Submitted:       ${new Date().toISOString()}`,
    `Referrer:        ${str(body.referrer) || '—'}`,
  ].join('\n');

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.INTAKE_FROM,
      to: [env.INTAKE_TO],
      reply_to: email,
      subject: `[Scan: ${skuId}] ${company} — ${name}`,
      text,
    }),
  }).catch(() => null);

  if (!sent || !sent.ok) {
    return json({ ok: false, error: 'SEND_FAILED' }, 502);
  }
  return json({ ok: true }, 200);
}

export async function onRequest({ request, env }: Context): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'METHOD_NOT_ALLOWED' }, 405);
  }
  return handlePost(request, env);
}

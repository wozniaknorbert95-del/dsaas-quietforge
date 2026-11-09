/**
 * Cloudflare Pages Function — POST /api/waitlist (MIG-30 / QUI-247).
 *
 * Replaces the former Next.js route src/app/api/waitlist. Mail via the Resend HTTP API.
 * Until RESEND_API_KEY, INTAKE_FROM and INTAKE_TO are set in the Pages project settings
 * (never in the repo), it answers 503 { error: 'INTAKE_NOT_READY' }.
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

  const email = (typeof body.email === 'string' ? body.email : '').trim();
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'VALIDATION' }, 422);
  }
  const referrer = typeof body.referrer === 'string' ? body.referrer : '';

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
      subject: `[Waitlist] ${email}`,
      text: `New waitlist sign-up\n\nEmail:     ${email}\nSubmitted: ${new Date().toISOString()}\nReferrer:  ${referrer || '—'}\n`,
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

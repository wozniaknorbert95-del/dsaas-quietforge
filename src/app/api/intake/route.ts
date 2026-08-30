/**
 * Intake endpoint — POST /api/intake
 * Sends Automation Map request to INTAKE_TO (quietforge@flexgrafik.nl) via SMTP.
 * Guards: honeypot `website`, server-side validation, in-memory rate limit per IP.
 * Binding: docs/operations/handoffs/2026-07-15-intake-email.md
 */
import { NextResponse } from 'next/server';
import {
  checkRateLimit,
  sendIntakeEmail,
  type IntakePayload,
} from '@/lib/email';

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'RATE_LIMIT' }, { status: 429 });
  }

  const str = (v: unknown): string => (typeof v === 'string' ? v : '');
  const arr = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : []);
  const trimmed = (v: unknown): string => str(v).trim();

  const website = str(body.website);
  if (website) {
    return NextResponse.json({ ok: false, error: 'BOT_DETECTED' }, { status: 422 });
  }

  // GDPR/AVG: personal data is processed only with explicit consent.
  if (body.consent !== true) {
    return NextResponse.json({ ok: false, error: 'CONSENT_REQUIRED' }, { status: 422 });
  }

  const name = trimmed(body.name);
  const company = trimmed(body.company);
  const email = trimmed(body.email);
  const url = trimmed(body.url);

  if (!name || !company || !EMAIL_RE.test(email) || !url) {
    return NextResponse.json({ ok: false, error: 'VALIDATION' }, { status: 422 });
  }

  const payload: IntakePayload = {
    name,
    company,
    email,
    url,
    pains: arr(body.pains),
    budget: trimmed(body.budget),
    availability: str(body.availability),
    other: str(body.other),
    website,
    referrer: str(body.referrer),
  };

  const result = await sendIntakeEmail(payload);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
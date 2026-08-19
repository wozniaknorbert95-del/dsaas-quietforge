/**
 * Email transport — SMTP via Nodemailer for intake/waitlist submissions.
 * Binding: docs/operations/handoffs/2026-07-15-intake-email.md
 * Secrets: SMTP_PASS only in .env.local / Vercel env (never committed — AGENTS.md §7).
 *
 * Configured SMTP (Cyberfolks): s34.cyber-folks.pl:465 SSL, mailbox quietforge@flexgrafik.nl.
 * Required env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, INTAKE_FROM, INTAKE_TO.
 * Optional kill-switch: INTAKE_DISABLED='true' disables submission server-side.
 */
import nodemailer from 'nodemailer';
import { EMAIL } from '@/lib/constants';

export type SendResult = { ok: true } | { ok: false; error: string };

export interface IntakePayload {
  name: string;
  company: string;
  email: string;
  url: string;
  pains: readonly string[];
  budget: string;
  availability: string;
  other: string;
  /** Honeypot field — must be empty; non-empty = bot. */
  website: string;
  referrer: string;
}

export interface WaitlistPayload {
  email: string;
  referrer: string;
}

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;

const rateMap = new Map<string, { count: number; firstAt: number }>();

type EmailTransport = ReturnType<typeof nodemailer.createTransport>;
let cachedTransport: EmailTransport | null = null;

export function isIntakeDisabled(): boolean {
  return process.env.INTAKE_DISABLED === 'true';
}

export function hasSmtpConfig(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}

function intakeFrom(): string {
  return process.env.INTAKE_FROM ?? EMAIL;
}

function intakeTo(): string {
  return process.env.INTAKE_TO ?? EMAIL;
}

/**
 * Returns a cached SMTP transport; null if env is missing (dev/demo).
 * Singleton avoids creating a transport per request on warm serverless.
 */
function getTransport(): EmailTransport | null {
  if (!hasSmtpConfig()) return null;
  if (cachedTransport) return cachedTransport;

  const port = Number(process.env.SMTP_PORT ?? '465');
  const secure = process.env.SMTP_SECURE !== 'false';

  cachedTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return cachedTransport;
}

/**
 * In-memory rate limit keyed by IP. Caveat: serverless cold starts reset
 * state; acceptable for a low-volume contact form. 3 submissions / 10 min.
 * Returns true if the request is within the limit; false if exceeded.
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now - entry.firstAt > RATE_WINDOW_MS) {
    rateMap.set(ip, { count: 1, firstAt: now });
    return true;
  }

  entry.count += 1;
  return entry.count <= RATE_MAX;
}

function composeIntakeText(p: IntakePayload): string {
  return [
    `New Automation Scan request`,
    ``,
    `Name:            ${p.name}`,
    `Company:         ${p.company}`,
    `Email:           ${p.email}`,
    `Website:         ${p.url}`,
    `Biggest pain:    ${p.pains.join(', ') || '—'}`,
    `Budget:          ${p.budget}`,
    `Availability:    ${p.availability || '—'}`,
    `Note:            ${p.other || '—'}`,
    ``,
    `Submitted:        ${new Date().toISOString()}`,
    `Referrer:         ${p.referrer || '—'}`,
  ].join('\n');
}

function composeIntakeHtml(p: IntakePayload): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#6b7280;font-family:monospace;font-size:13px;white-space:nowrap">${label}</td><td style="padding:4px 0;font-family:monospace;font-size:13px">${value}</td></tr>`;

  return `
    <div style="font-family:monospace;color:#111827">
      <h2 style="margin:0 0 16px;font-size:16px">New Automation Scan request</h2>
      <table style="border-collapse:collapse">
        ${row('Name', escapeHtml(p.name))}
        ${row('Company', escapeHtml(p.company))}
        ${row('Email', escapeHtml(p.email))}
        ${row('Website', escapeHtml(p.url))}
        ${row('Biggest pain', escapeHtml(p.pains.join(', ') || '—'))}
        ${row('Budget', escapeHtml(p.budget))}
        ${row('Availability', escapeHtml(p.availability || '—'))}
        ${row('Note', escapeHtml(p.other || '—'))}
        ${row('Submitted', new Date().toISOString())}
        ${row('Referrer', escapeHtml(p.referrer || '—'))}
      </table>
    </div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendIntakeEmail(payload: IntakePayload): Promise<SendResult> {
  if (isIntakeDisabled()) return { ok: false, error: 'INTAKE_DISABLED' };

  const transport = getTransport();
  if (!transport) return { ok: false, error: 'SMTP_NOT_CONFIGURED' };

  try {
    await transport.sendMail({
      from: intakeFrom(),
      to: intakeTo(),
      replyTo: payload.email,
      subject: `[Automation Scan] ${payload.company} — ${payload.name}`,
      text: composeIntakeText(payload),
      html: composeIntakeHtml(payload),
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'SMTP_SEND_FAILED';
    return { ok: false, error: message };
  }
}

export async function sendWaitlistEmail(payload: WaitlistPayload): Promise<SendResult> {
  if (isIntakeDisabled()) return { ok: false, error: 'INTAKE_DISABLED' };

  const transport = getTransport();
  if (!transport) return { ok: false, error: 'SMTP_NOT_CONFIGURED' };

  try {
    await transport.sendMail({
      from: intakeFrom(),
      to: intakeTo(),
      replyTo: payload.email,
      subject: `[Waitlist] ${payload.email}`,
      text: `New waitlist sign-up\n\nEmail:     ${payload.email}\nSubmitted: ${new Date().toISOString()}\nReferrer: ${payload.referrer || '—'}\n`,
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'SMTP_SEND_FAILED';
    return { ok: false, error: message };
  }
}
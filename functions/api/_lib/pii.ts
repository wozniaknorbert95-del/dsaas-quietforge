/**
 * PII masking helpers — SH-G1-06 (SECURITY_THREAT_MODEL T10: "Logi bez PII").
 *
 * Pure module: no Cloudflare/runtime imports and no relative runtime imports,
 * so `node --test tests/contract/` can import it directly via Node's native
 * TypeScript type stripping and unit-test the real implementation.
 *
 * Rule: anything that reaches logs, ledgers, or error messages goes through
 * these helpers first — emails and tokens are masked, never stored raw.
 */

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
const TOKEN_RE = /\b(?:Bearer\s+|tok_|sk_|key[_-])[A-Za-z0-9._-]+/gi;

/** "anna@acme.nl" -> "a***@acme.nl" (keeps domain for debugging value). */
export function maskEmail(email: string): string {
  const at = email.lastIndexOf('@');
  if (at <= 0) return '***';
  return `${email.slice(0, at).charAt(0)}***${email.slice(at)}`;
}

/** Opaque secrets (API keys, tokens) keep only a short prefix for correlation. */
export function maskToken(token: string): string {
  if (token.length <= 4) return '***';
  return `${token.slice(0, 4)}***`;
}

/** Mask any email- or token-shaped content inside free text before logging. */
export function scrubText(value: string): string {
  return value
    .replace(EMAIL_RE, (match) => maskEmail(match))
    .replace(TOKEN_RE, '***');
}

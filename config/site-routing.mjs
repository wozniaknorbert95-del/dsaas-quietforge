/**
 * Single source of truth for redirects + security headers (MIG-30 / QUI-247).
 *
 * Used by:
 *  - next.config.ts (dev server, check-links, Vercel)
 *  - scripts/generate-pages-files.mjs -> public/_redirects + public/_headers
 *    (Cloudflare Pages static export does not read next.config redirects/headers)
 */

/** [from, to] — every pair is 301, with and without trailing slash. */
export const REDIRECT_PAIRS = [
  ['/digital-modernization', '/systems/'],
  ['/results', '/proof/'],
  ['/results/sales-funnel', '/systems/quote-order-engine/'],
  ['/results/lead-magnet', '/systems/lead-scout/'],
  ['/results/jadzia-coi', '/systems/owner-cockpit/'],
  ['/results/agent-orchestrator', '/systems/build-release-flow/'],
  ['/results/owner-ecosystem', '/lab/'],
  ['/results/inbox-killer', '/systems/inbox-triage/'],
  ['/results/advisory-modernisation', '/proof/'],
  ['/results/whatsapp-discovery-pilot', '/proof/'],
  ['/solutions', '/systems/'],
  ['/solutions/sales-funnel', '/systems/quote-order-engine/'],
  ['/solutions/inbox-killer', '/systems/inbox-triage/'],
  ['/solutions/lead-magnet-game', '/systems/lead-scout/'],
  ['/solutions/web-upgrade', '/systems/'],
  ['/solutions/managed-automation', '/systems/'],
  ['/book-discovery', '/book-a-scan/'],
  ['/trust', '/security/'],
  ['/how-it-works', '/approach/'],
  ['/inbox-killer', '/systems/inbox-triage/'],
  ['/founder', '/about/'],
];

/** Both slash variants of a source path. */
export function sourceVariants(from) {
  return [from, from.endsWith('/') ? from.slice(0, -1) : `${from}/`];
}

export const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://www.google-analytics.com",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
      "form-action 'self' mailto:",
      "frame-ancestors 'self'",
    ].join('; '),
  },
];

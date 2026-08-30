import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const pair = (from: string, to: string) => [
  { source: from, destination: to, permanent: true },
  {
    source: from.endsWith('/') ? from.slice(0, -1) : `${from}/`,
    destination: to,
    permanent: true,
  },
];

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
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
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
              "form-action 'self' mailto:",
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      ...pair('/digital-modernization', '/systems/'),
      ...pair('/results', '/proof/'),
      ...pair('/results/sales-funnel', '/systems/quote-order-engine/'),
      ...pair('/results/lead-magnet', '/systems/lead-scout/'),
      ...pair('/results/jadzia-coi', '/systems/owner-cockpit/'),
      ...pair('/results/agent-orchestrator', '/systems/build-release-flow/'),
      ...pair('/results/owner-ecosystem', '/about/'),
      ...pair('/results/inbox-killer', '/systems/inbox-triage/'),
      ...pair('/results/advisory-modernisation', '/proof/'),
      ...pair('/results/whatsapp-discovery-pilot', '/proof/'),
      ...pair('/solutions', '/systems/'),
      ...pair('/solutions/sales-funnel', '/systems/quote-order-engine/'),
      ...pair('/solutions/inbox-killer', '/systems/inbox-triage/'),
      ...pair('/solutions/lead-magnet-game', '/systems/lead-scout/'),
      ...pair('/solutions/web-upgrade', '/systems/'),
      ...pair('/solutions/managed-automation', '/systems/'),
      ...pair('/book-discovery', '/book-a-scan/'),
      ...pair('/trust', '/security/'),
      ...pair('/how-it-works', '/approach/'),
      ...pair('/inbox-killer', '/systems/inbox-triage/'),
      ...pair('/founder', '/about/'),
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

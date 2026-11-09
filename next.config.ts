import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { REDIRECT_PAIRS, SECURITY_HEADERS, sourceVariants } from "./config/site-routing.mjs";

const pair = (from: string, to: string) =>
  sourceVariants(from).map((source) => ({ source, destination: to, permanent: true }));

const nextConfig: NextConfig = {
  // MIG-30 / QUI-247: static export for Cloudflare Pages (output in out/).
  // headers()/redirects() below are not applied by a static host; Pages gets the
  // same rules from public/_headers + public/_redirects (scripts/generate-pages-files.mjs).
  output: 'export',
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return REDIRECT_PAIRS.flatMap(([from, to]) => pair(from, to));
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

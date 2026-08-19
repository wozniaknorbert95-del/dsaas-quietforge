/**
 * Regenerates public/sitemap.xml — priority tiers per site-map / SEO canon.
 * Run: node scripts/generate-sitemap.mjs
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const ROUTES = [
  '/',
  '/systems/',
  '/systems/quote-order-engine/',
  '/systems/inbox-triage/',
  '/systems/lead-scout/',
  '/systems/owner-cockpit/',
  '/systems/publishing-gate/',
  '/systems/build-release-flow/',
  '/approach/',
  '/security/',
  '/proof/',
  '/proof/methodology/',
  '/pricing/',
  '/book-a-scan/',
  '/about/',
  '/legal/',
];

const HIGH_INTENT = new Set(['/systems/', '/pricing/', '/book-a-scan/']);
const PROOF_HUBS = new Set(['/proof/', '/approach/', '/security/']);

/** @param {string} path */
function getSitemapMeta(path) {
  if (path === '/') {
    return { priority: '1.0', changefreq: 'weekly' };
  }
  if (HIGH_INTENT.has(path)) {
    return { priority: '0.9', changefreq: 'weekly' };
  }
  if (PROOF_HUBS.has(path)) {
    return { priority: '0.8', changefreq: 'weekly' };
  }
  if (path.startsWith('/systems/') && path !== '/systems/') {
    return { priority: '0.75', changefreq: 'weekly' };
  }
  if (path === '/blog/' || path.startsWith('/blog/')) {
    return { priority: '0.5', changefreq: 'monthly' };
  }
  if (path === '/about/') {
    return { priority: '0.3', changefreq: 'monthly' };
  }
  if (path === '/legal/') {
    return { priority: '0.3', changefreq: 'yearly' };
  }
  return { priority: '0.8', changefreq: 'weekly' };
}

const base = 'https://quietforge.flexgrafik.nl';
const lastmod = new Date().toISOString().slice(0, 10);

const urls = ROUTES.map((path) => {
  const { priority, changefreq } = getSitemapMeta(path);
  return `  <url>
    <loc>${base}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(join(root, 'public', 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml updated (${ROUTES.length} routes)`);

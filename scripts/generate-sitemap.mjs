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
  '/solutions/',
  '/solutions/inbox-killer/',
  '/solutions/web-upgrade/',
  '/solutions/sales-funnel/',
  '/solutions/lead-magnet-game/',
  '/solutions/managed-automation/',
  '/pricing/',
  '/how-it-works/',
  '/results/',
  '/results/inbox-killer/',
  '/results/agent-orchestrator/',
  '/results/sales-funnel/',
  '/results/lead-magnet/',
  '/results/jadzia-coi/',
  '/results/advisory-modernisation/',
  '/results/owner-ecosystem/',
  '/growth-os/',
  '/book-discovery/',
  '/founder/',
  '/about/',
  '/trust/',
  '/legal/',
  '/blog/',
  '/blog/automation-for-small-business/',
  '/blog/digital-transformation-without-the-jargon/',
  '/blog/under-the-hood-how-inbox-killer-works/',
];

const HIGH_INTENT = new Set(['/solutions/', '/pricing/', '/book-discovery/']);
const PROOF_HUBS = new Set(['/results/', '/how-it-works/', '/founder/', '/trust/']);

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
  if (path.startsWith('/solutions/') && path !== '/solutions/') {
    return { priority: '0.75', changefreq: 'weekly' };
  }
  if (path.startsWith('/results/') && path !== '/results/') {
    return { priority: '0.7', changefreq: 'monthly' };
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

/**
 * Dead-link check on the built site (L4-022).
 *
 * Runs after `next build` (npm `postbuild`). Reads the prerendered HTML in
 * .next/server/app, starts at "/" + every sitemap route + the 404 page, and
 * follows internal links the way a visitor would (redirects included).
 *
 * - Internal link that does not resolve to a page, a public/ file, a built
 *   asset or a working redirect  -> listed and the build FAILS (exit 1).
 * - External links -> listed only. With --external each one is requested
 *   (HEAD, then GET) and dead ones are reported. Never fails the build.
 *
 * Usage:
 *   node scripts/check-links.mjs              # internal check (build gate)
 *   node scripts/check-links.mjs --external   # + probe external links (report)
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const NEXT = join(ROOT, '.next');
const APP_HTML = join(NEXT, 'server', 'app');
const PUBLIC = join(ROOT, 'public');
const PROBE_EXTERNAL = process.argv.includes('--external');

if (!existsSync(join(NEXT, 'routes-manifest.json'))) {
  console.error('[check-links] .next/routes-manifest.json missing — run `next build` first.');
  process.exit(1);
}

const routesManifest = JSON.parse(readFileSync(join(NEXT, 'routes-manifest.json'), 'utf8'));
const prerender = JSON.parse(readFileSync(join(NEXT, 'prerender-manifest.json'), 'utf8'));

const norm = (path) => (path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path);

/** Prerendered HTML by route. */
const htmlByRoute = new Map();
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name.endsWith('.html')) {
      let route = '/' + full.slice(APP_HTML.length + 1).replace(/\\/g, '/').replace(/\.html$/, '');
      if (route === '/index') route = '/';
      htmlByRoute.set(norm(route), full);
    }
  }
}
walk(APP_HTML);

const staticRoutes = new Set(routesManifest.staticRoutes.map((r) => norm(r.page)));
const prerenderedRoutes = new Set(Object.keys(prerender.routes).map(norm));
const ssgDynamic = new Set(Object.keys(prerender.dynamicRoutes ?? {}));
const dynamicRoutes = routesManifest.dynamicRoutes.map((r) => ({
  page: r.page,
  regex: new RegExp(r.regex),
}));
const redirects = routesManifest.redirects
  .filter((r) => !r.internal)
  .map((r) => ({ ...r, re: new RegExp(r.regex) }));

function routeExists(path) {
  const p = norm(path);
  if (staticRoutes.has(p) || prerenderedRoutes.has(p) || htmlByRoute.has(p)) return true;
  for (const d of dynamicRoutes) {
    if (d.regex.test(p) || d.regex.test(`${p}/`)) {
      // SSG dynamic routes only serve the params that were generated.
      return ssgDynamic.has(d.page) ? prerenderedRoutes.has(p) : true;
    }
  }
  return false;
}

function fileExists(path) {
  let decoded;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    return false;
  }
  if (decoded.startsWith('/_next/static/')) {
    return existsSync(join(NEXT, 'static', decoded.slice('/_next/static/'.length)));
  }
  const file = join(PUBLIC, decoded);
  return existsSync(file) && statSync(file).isFile();
}

/** Resolve a path through redirects. Returns the final path or null if broken. */
function resolve(path, hops = 0) {
  if (hops > 5) return null;
  if (fileExists(path)) return path;
  if (routeExists(path)) return norm(path);
  for (const r of redirects) {
    const m = r.re.exec(path) ?? r.re.exec(norm(path));
    if (m) {
      if (/^https?:\/\//.test(r.destination)) return r.destination;
      return resolve(r.destination.split('?')[0].split('#')[0], hops + 1);
    }
  }
  return null;
}

const ATTR = /<(a|link|img|script|source|iframe|video|form)\b[^>]*?\s(href|src|action)="([^"]*)"/gi;

function linksIn(html) {
  const out = [];
  for (const m of html.matchAll(ATTR)) {
    const tag = m[1].toLowerCase();
    const raw = m[3].replace(/&amp;/g, '&').trim();
    // Canonical / alternate / preconnect URLs are metadata, not visitor links.
    if (tag === 'link' && /rel="(canonical|alternate|preconnect|dns-prefetch)"/i.test(m[0])) continue;
    out.push({ tag, url: raw });
  }
  return out;
}

const seeds = new Set(['/', '/_not-found']);
const sitemapFile = join(PUBLIC, 'sitemap.xml');
if (existsSync(sitemapFile)) {
  for (const m of readFileSync(sitemapFile, 'utf8').matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)) {
    seeds.add(norm(m[1] || '/'));
  }
}

const queue = [...seeds];
const visited = new Set();
const brokenInternal = new Map(); // url -> Set(pages)
const external = new Map(); // url -> Set(pages)
const unchecked = new Set(); // reachable pages with no prerendered HTML (dynamic)

while (queue.length) {
  const page = norm(queue.shift());
  if (visited.has(page)) continue;
  visited.add(page);
  const file = htmlByRoute.get(page);
  if (!file) {
    if (routeExists(page)) unchecked.add(page);
    else (brokenInternal.get(page) ?? brokenInternal.set(page, new Set()).get(page)).add('(sitemap)');
    continue;
  }
  const html = readFileSync(file, 'utf8');
  for (const { tag, url } of linksIn(html)) {
    if (!url || url.startsWith('#') || /^(mailto|tel|javascript|data|blob):/i.test(url)) continue;
    if (/^(https?:)?\/\//i.test(url)) {
      if (tag === 'a') (external.get(url) ?? external.set(url, new Set()).get(url)).add(page);
      continue;
    }
    const path = url.split('#')[0].split('?')[0];
    if (!path.startsWith('/')) continue;
    const target = resolve(path);
    if (target === null) {
      (brokenInternal.get(path) ?? brokenInternal.set(path, new Set()).get(path)).add(page);
    } else if (tag === 'a' && target.startsWith('/') && !fileExists(target)) {
      queue.push(target);
    }
  }
}

console.log(`[check-links] pages checked: ${visited.size - unchecked.size}`);
if (unchecked.size) {
  console.log(`[check-links] dynamic pages (no prerendered HTML, links not scanned): ${[...unchecked].join(', ')}`);
}

async function probe(url) {
  const target = url.startsWith('//') ? `https:${url}` : url;
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(target, {
        method,
        redirect: 'follow',
        signal: AbortSignal.timeout(10000),
        headers: { 'user-agent': 'quietforge-link-check/1.0' },
      });
      // 401/403/405/429/999: the host is up but refuses bots — not dead.
      if (res.status < 400 || [401, 403, 405, 429, 999].includes(res.status)) return null;
      if (method === 'GET') return `HTTP ${res.status}`;
    } catch (error) {
      if (method === 'GET') return error.cause?.code ?? error.name ?? 'error';
    }
  }
  return null;
}

console.log(`[check-links] external links found: ${external.size}`);
if (PROBE_EXTERNAL && external.size) {
  const entries = [...external.entries()];
  const dead = [];
  const workers = Array.from({ length: 8 }, async () => {
    while (entries.length) {
      const [url, pages] = entries.shift();
      const why = await probe(url);
      if (why) dead.push({ url, why, pages: [...pages] });
    }
  });
  await Promise.all(workers);
  if (dead.length) {
    console.log(`[check-links] EXTERNAL dead links (report only, build not failed): ${dead.length}`);
    for (const d of dead.sort((a, b) => a.url.localeCompare(b.url))) {
      console.log(`  ${d.why.padEnd(12)} ${d.url}  <- ${d.pages.join(', ')}`);
    }
  } else {
    console.log('[check-links] external links: all reachable');
  }
} else if (!PROBE_EXTERNAL) {
  console.log('[check-links] external links not probed (run `npm run check:links` to probe and report them)');
}

if (brokenInternal.size) {
  console.error(`[check-links] FAIL — ${brokenInternal.size} broken internal link(s):`);
  for (const [url, pages] of brokenInternal) console.error(`  ${url}  <- ${[...pages].join(', ')}`);
  process.exit(1);
}
console.log('[check-links] OK — 0 broken internal links');

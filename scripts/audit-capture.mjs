/**
 * Audit inventory capture — screenshots + page metadata for professional audit.
 * Usage: node scripts/audit-capture.mjs [baseUrl]
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.argv[2] ?? 'https://quietforge.nl';
const OUT = join(process.cwd(), 'docs/audits/2026-06-23/assets');

const ROUTES = [
  '/',
  '/results/',
  '/results/inbox-killer/',
  '/results/sales-funnel/',
  '/results/lead-magnet/',
  '/results/agent-orchestrator/',
  '/results/advisory-modernisation/',
  '/results/owner-ecosystem/',
  '/solutions/',
  '/solutions/inbox-killer/',
  '/solutions/web-upgrade/',
  '/solutions/sales-funnel/',
  '/solutions/lead-magnet-game/',
  '/solutions/managed-automation/',
  '/how-it-works/',
  '/pricing/',
  '/book-discovery/',
  '/founder/',
  '/about/',
  '/trust/',
  '/blog/',
];

const EXTERNAL = [
  { name: 'flexgrafik-nl', url: 'https://flexgrafik.nl/' },
  {
    name: 'linkedin-profile',
    url: 'https://www.linkedin.com/in/quietforge/',
  },
];

function slug(route) {
  if (route === '/') return 'home';
  return route.replace(/^\/|\/$/g, '').replace(/\//g, '-');
}

async function capturePage(page, url, outDir, name) {
  const errors = [];
  const warnings = [];
  const failed = [];

  page.on('console', (msg) => {
    const t = msg.type();
    const text = msg.text();
    if (t === 'error') errors.push(text);
    if (t === 'warning') warnings.push(text);
  });

  page.on('response', (res) => {
    const status = res.status();
    if (status >= 500) failed.push(`${status} ${res.url()}`);
  });

  let status = 0;
  try {
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    status = res?.status() ?? 0;
    await page.waitForTimeout(1500);
  } catch (e) {
    return {
      url,
      name,
      error: String(e),
      status: 0,
      errors,
      warnings,
      failed,
    };
  }

  const meta = await page.evaluate(() => ({
    title: document.title,
    description:
      document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    h1: document.querySelector('h1')?.textContent?.trim() ?? '',
    primaryCta:
      document.querySelector('header a[class*="btn"], header button')?.textContent?.trim() ??
      document.querySelector('a[href*="book"], a[href*="discovery"]')?.textContent?.trim() ??
      '',
    ogImage:
      document.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '',
    jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
  }));

  await page.screenshot({ path: join(outDir, 'desktop', `${name}.png`), fullPage: true });

  return { url, name, status, ...meta, errors, warnings, failed };
}

async function main() {
  for (const sub of ['site-desktop', 'site-mobile', 'flexgrafik-nl', 'linkedin']) {
    mkdirSync(join(OUT, sub), { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const inventory = [];

  // Desktop site routes
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dPage = await desktop.newPage();
  for (const route of ROUTES) {
    const url = `${BASE.replace(/\/$/, '')}${route}`;
    const name = slug(route);
    const row = await capturePage(dPage, url, OUT, name);
    inventory.push({ ...row, viewport: 'desktop' });
    process.stdout.write(`${row.status === 200 ? '✓' : '✗'} ${route} (${row.status})\n`);
  }
  await desktop.close();

  // Mobile home + key conversion pages
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mPage = await mobile.newPage();
  for (const route of ['/', '/pricing/', '/book-discovery/', '/results/inbox-killer/']) {
    const url = `${BASE.replace(/\/$/, '')}${route}`;
    const name = slug(route);
    const row = await capturePage(mPage, url, OUT, name);
    // move mobile shots to site-mobile
    const { renameSync } = await import('node:fs');
    const src = join(OUT, 'desktop', `${name}.png`);
    const dest = join(OUT, 'site-mobile', `${name}.png`);
    try {
      renameSync(src, dest);
    } catch {
      /* desktop already captured; re-screenshot to mobile folder */
      await mPage.screenshot({ path: dest, fullPage: true });
    }
    inventory.push({ ...row, viewport: 'mobile' });
  }
  await mobile.close();

  // External channels
  const extCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const extPage = await extCtx.newPage();
  for (const { name, url } of EXTERNAL) {
    const folder = name === 'flexgrafik-nl' ? 'flexgrafik-nl' : 'linkedin';
    const row = await capturePage(extPage, url, OUT, name);
    const { renameSync, copyFileSync } = await import('node:fs');
    const src = join(OUT, 'desktop', `${name}.png`);
    const dest = join(OUT, folder, `${name}.png`);
    try {
      copyFileSync(src, dest);
    } catch {
      await extPage.screenshot({ path: dest, fullPage: true });
    }
    inventory.push({ ...row, viewport: 'desktop', channel: name });
    process.stdout.write(`ext ${name}: ${row.status}\n`);
  }
  await extCtx.close();
  await browser.close();

  writeFileSync(join(OUT, '..', 'inventory.json'), JSON.stringify(inventory, null, 2));
  console.log(`\nInventory: ${inventory.length} captures → docs/audits/2026-06-23/inventory.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

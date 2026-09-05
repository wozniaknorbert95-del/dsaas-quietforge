/**
 * Current Quietforge navigation, home marker and Builder's Lab audit.
 * Usage: node scripts/audit-navigation.mjs [baseUrl]
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const BASE = process.argv[2] ?? 'http://localhost:3000';
const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const SITEMAP_ROUTES = [
  ...sitemap.matchAll(/<loc>https:\/\/quietforge\.flexgrafik\.nl([^<]*)<\/loc>/g),
].map((match) => match[1] || '/');

const NAV_LINKS = [
  '/systems/',
  '/approach/',
  '/security/',
  '/proof/',
  '/pricing/',
  '/book-a-scan/',
  '/about/',
  '/lab/',
  '/blog/',
  '/legal/',
];

const HOME_SECTIONS = [
  'hero',
  'counter',
  'systems',
  'approach',
  'compare',
  'discipline',
  'proof',
  'about',
  'pricing',
  'faq',
];

async function checkRoute(page, route) {
  const failed = [];
  const responseHandler = (response) => {
    if (response.status() >= 400 && response.url().startsWith(BASE) && !response.url().includes('_rsc=')) {
      failed.push({ status: response.status(), url: response.url() });
    }
  };
  page.on('response', responseHandler);
  let status = 0;
  let error = null;
  try {
    const response = await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    status = response?.status() ?? 0;
  } catch (caught) {
    error = caught.message;
  }
  const h1Count = await page.locator('h1').count().catch(() => 0);
  page.removeListener('response', responseHandler);
  return { route, status, h1Count, failed, error };
}

async function checkHome(page) {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 60000 });
  const missing = [];
  const empty = [];
  for (const section of HOME_SECTIONS) {
    const element = page.locator(`[data-home-section="${section}"]`).first();
    if ((await element.count()) === 0) {
      missing.push(section);
      continue;
    }
    if ((await element.innerText()).trim().length < 20) empty.push(section);
  }
  const headerLinks = await page.locator('header nav[aria-label="Primary"] a').evaluateAll((links) =>
    links.map((link) => ({ href: link.getAttribute('href'), text: link.textContent?.trim() }))
  );
  const headerCta = headerLinks.filter((link) => /Book a scan/.test(link.text ?? '')).length;
  return { missing, empty, headerLinks, headerCta };
}

async function checkLab(page) {
  await page.goto(`${BASE}/lab/`, { waitUntil: 'networkidle', timeout: 60000 });
  const h1 = await page.locator('h1').count();
  const milestones = await page.locator('.qf-lab-stage').count();
  const labLink = await page.getByRole('link', { name: "Builder's Lab" }).count();
  return { h1, milestones, labLink };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const routes = [...new Set([...SITEMAP_ROUTES, ...NAV_LINKS])];
  const routeResults = [];
  for (const route of routes) routeResults.push(await checkRoute(page, route));
  const home = await checkHome(page);
  const lab = await checkLab(page);
  await browser.close();

  const routeFails = routeResults.filter((result) => result.status !== 200 || result.error || result.h1Count === 0);
  const assetFails = routeResults.flatMap((result) => result.failed.map((failure) => ({ route: result.route, ...failure })));
  const expectedHeader = ['Systems', 'Approach', 'Security', 'Proof', 'Pricing'];
  const actualHeader = home.headerLinks.map((link) => link.text);
  const headerOk = expectedHeader.every((label) => actualHeader.includes(label));
  const report = {
    base: BASE,
    routes: { total: routeResults.length, failed: routeFails.length, details: routeFails },
    assets404: assetFails,
    home,
    lab,
    header: { expected: expectedHeader, actual: actualHeader, ctaCount: home.headerCta, ok: headerOk },
    verdict:
      routeFails.length === 0 &&
      assetFails.length === 0 &&
      home.missing.length === 0 &&
      home.empty.length === 0 &&
      headerOk &&
      home.headerCta === 1 &&
      lab.h1 === 1 &&
      lab.milestones === 9 &&
      lab.labLink > 0
        ? 'PASS'
        : 'FAIL',
  };
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.verdict === 'PASS' ? 0 : 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

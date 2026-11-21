/**
 * GA4 prod smoke — quietforge.nl
 * Run: node scripts/ga4-prod-smoke.mjs
 */
import { chromium } from 'playwright';

const BASE = 'https://quietforge.nl';
const MEASUREMENT_ID = 'G-LY0E7MW0HF';

const REQUIRED_COLLECTS = [
  { phase: 'page_view_on_load', en: 'page_view' },
  { phase: 'cta_book_map_click', en: 'cta_book_map_click' },
  { phase: 'pricing_view', en: 'pricing_view' },
  { phase: 'book_discovery_view', en: 'book_discovery_view' },
];

function parseCollectHit(req) {
  const url = req.url();
  if (!url.includes('/g/collect') && !url.includes('/collect?')) {
    return null;
  }
  const q = new URL(url).searchParams;
  const fromQuery = q.get('en');
  if (fromQuery) {
    return { en: fromQuery, tid: q.get('tid') };
  }
  const body = req.postData();
  if (!body) {
    return null;
  }
  const enMatch = body.match(/(?:^|&)en=([^&]+)/);
  const tidMatch = body.match(/(?:^|&)tid=([^&]+)/);
  if (!enMatch) {
    return null;
  }
  return {
    en: decodeURIComponent(enMatch[1].replace(/\+/g, ' ')),
    tid: tidMatch ? decodeURIComponent(tidMatch[1]) : null,
  };
}

function hasCollect(hits, en) {
  return hits.some((h) => h.en === en && h.tid === MEASUREMENT_ID);
}

async function dataLayerHasEvent(page, eventName) {
  return page.evaluate((name) => {
    return (window.dataLayer || []).some((entry) => {
      if (Array.isArray(entry) && entry[0] === 'event' && entry[1] === name) {
        return true;
      }
      if (entry && entry[0] === 'event' && entry[1] === name) {
        return true;
      }
      return entry && typeof entry === 'object' && entry.event === name;
    });
  }, eventName);
}

async function assertEvent(page, hits, eventName) {
  if (hasCollect(hits, eventName)) {
    return true;
  }
  return dataLayerHasEvent(page, eventName);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const allHits = [];

  page.on('request', (req) => {
    const hit = parseCollectHit(req);
    if (hit?.en) {
      allHits.push(hit);
    }
  });

  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(6000);

  const pageViewOnLoad = hasCollect(allHits, 'page_view');

  const gtagCheck = await page.evaluate((mid) => ({
    hasGtag: typeof window.gtag === 'function',
    hasDataLayer: Array.isArray(window.dataLayer),
    measurementInHtml: document.documentElement.innerHTML.includes(mid),
    legacyInHtml: document.documentElement.innerHTML.includes('G-M24NL622DF'),
  }), MEASUREMENT_ID);

  await page.locator('[data-home-section="hero"] a[href="/book-discovery/"]').first().click();
  await page.waitForURL(/book-discovery/);
  await page.waitForTimeout(3000);

  await page.goto(BASE + '/pricing/', { waitUntil: 'load' });
  await page.waitForTimeout(8000);
  const pricingOk = await assertEvent(page, allHits, 'pricing_view');

  await page.goto(BASE + '/book-discovery/', { waitUntil: 'load' });
  await page.waitForTimeout(8000);
  const bookDiscoveryOk = await assertEvent(page, allHits, 'book_discovery_view');

  const collectSummary = {
    page_view_on_load: await assertEvent(page, allHits, 'page_view'),
    cta_book_map_click: await assertEvent(page, allHits, 'cta_book_map_click'),
    pricing_view: pricingOk,
    book_discovery_view: bookDiscoveryOk,
    total_collects: allHits.length,
    event_names: [...new Set(allHits.map((h) => h.en).filter(Boolean))],
  };

  console.log(
    JSON.stringify(
      {
        gtagCheck,
        pageViewOnLoad,
        collectSummary,
        measurementId: MEASUREMENT_ID,
      },
      null,
      2
    )
  );

  const failures = [];
  if (!(await assertEvent(page, allHits, 'page_view'))) failures.push('page_view_on_load');
  if (!(await assertEvent(page, allHits, 'cta_book_map_click'))) failures.push('cta_book_map_click');
  if (!pricingOk) failures.push('pricing_view');
  if (!bookDiscoveryOk) failures.push('book_discovery_view');

  if (failures.length > 0) {
    console.error('FAIL: missing analytics events:', failures.join(', '));
    process.exit(1);
  }

  if (!pageViewOnLoad && !(await assertEvent(page, allHits, 'page_view'))) {
    console.error('FAIL: no page_view on initial load');
    process.exit(1);
  }

  if (gtagCheck.legacyInHtml) {
    console.error('FAIL: legacy G-M24NL622DF still in HTML');
    process.exit(1);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

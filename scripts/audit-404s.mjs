/**
 * List failed resource URLs on key routes (404 diagnostic).
 */
import { chromium } from 'playwright';

const BASE = 'https://quietforge.nl';
const ROUTES = ['/', '/results/', '/pricing/', '/about/', '/book-discovery/'];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const report = [];

  for (const route of ROUTES) {
    const failed = [];
    page.on('response', (res) => {
      const s = res.status();
      if (s === 404) failed.push(res.url());
    });
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1000);
    report.push({ route, failed: [...new Set(failed)] });
    page.removeAllListeners('response');
  }

  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}

main();

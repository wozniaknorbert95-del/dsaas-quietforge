/**
 * Compose confirm / mockups / wizard screens when live generate is unavailable.
 * Uses bench mockups + prod-styled HTML (not da_fixture).
 */
import { chromium } from 'playwright';
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const OUT = join(ROOT, 'docs/operations/media/inspire-screens');
const BENCH = join(ROOT, 'docs/operations/media/inspire-screens/bench');
const TEMPLATE = join(ROOT, 'docs/operations/media/inspire-slides/ui-mockup.html');
const INSPIRE_BENCH = join(
  ROOT,
  '../flexgrafik-inspire/ops/benchmarks/inspiration-v2/schilder/bus_l-tier-v2'
);

mkdirSync(BENCH, { recursive: true });
mkdirSync(OUT, { recursive: true });

copyFileSync(join(INSPIRE_BENCH, 'standard.png'), join(BENCH, 'schilder-standard.png'));
copyFileSync(join(INSPIRE_BENCH, 'premium.png'), join(BENCH, 'schilder-premium.png'));

const SHOTS = [
  { scene: 'confirm', file: 'inspire-02-confirm.png', selector: '.da-chat' },
  { scene: 'mockups', file: 'inspire-03-mockups.png', selector: '.da-section--results' },
  { scene: 'wizard', file: 'inspire-04-wizard.png', selector: '.da-section--results' },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2 });

  for (const { scene, file, selector } of SHOTS) {
    const url = `${pathToFileURL(TEMPLATE).href}?scene=${scene}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.locator(selector).screenshot({ path: join(OUT, file) });
    console.log('composed', file);
  }

  await browser.close();
  console.log('done — fallback UI screens');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

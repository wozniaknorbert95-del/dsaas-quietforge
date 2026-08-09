/**
 * Render INSPIRE LinkedIn pro slide frames (1080×1920) via Playwright.
 * Usage: node scripts/render-inspire-slides.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const SCENES = ['hook', 'pivot', 'hero', 'intake', 'confirm', 'mockups', 'wizard', 'cta'];

const SCREEN_MAP = {
  hero: 'inspire-00-hero.png',
  intake: 'inspire-01-intake.png',
  confirm: 'inspire-02-confirm.png',
  mockups: 'inspire-03-mockups.png',
  wizard: 'inspire-04-wizard.png',
};

const TEMPLATE = join(process.cwd(), 'docs/operations/media/inspire-slides/template.html');
const SCREENS = join(process.cwd(), 'docs/operations/media/inspire-screens');
const OUT = join(process.cwd(), 'docs/operations/media/inspire-slides/frames');

mkdirSync(OUT, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const scene of SCENES) {
    const url = `${pathToFileURL(TEMPLATE).href}?scene=${scene}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
    const screenFile = SCREEN_MAP[scene];
    if (screenFile) {
      const b64 = readFileSync(join(SCREENS, screenFile)).toString('base64');
      await page.evaluate((dataUrl) => {
        const img = document.querySelector('.screen-frame img');
        if (img) img.src = dataUrl;
      }, `data:image/png;base64,${b64}`);
      await page.waitForTimeout(500);
    } else {
      await page.waitForTimeout(400);
    }
    const outPath = join(OUT, `scene-${scene}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log('rendered', `scene-${scene}.png`);
  }

  await browser.close();
  console.log(`done — ${SCENES.length} frames in ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

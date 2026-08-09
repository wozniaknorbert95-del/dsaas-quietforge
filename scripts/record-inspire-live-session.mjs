/**
 * Record full live INSPIRE client conversation on prod (raw video for Dowódca edit).
 * Usage: node scripts/record-inspire-live-session.mjs
 */
import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/';
const OUT_DIR = join(process.cwd(), 'docs/operations/media/inspire-recordings');
const LOGO = join(process.cwd(), 'docs/operations/media/inspire-screens/schilder-janssen-logo.png');
const TIMEOUT = 180_000;
const GEN_TIMEOUT = 300_000;
const PAUSE = 2200;

const MESSAGES = [
  'Hoi! Ik wil voertuigreclame voor mijn schildersbedrijf.',
  'Bedrijfsnaam: Schilder Janssen. Branche: schilder. Diensten: binnen- en buitenschilderwerk en behangen. Doelgroep: woningeigenaren en VvE\'s in Noord-Brabant.',
  'Strakke betrouwbare uitstraling — balanced.',
  'Bestelbus L (bus_l), zakelijk gebruik.',
  'Telefoon: 06-98765432. Website: www.janssen-schilder.nl.',
];

mkdirSync(OUT_DIR, { recursive: true });

async function dismissCookies(page) {
  const accept = page.locator('#fg-cookie-accept-all, button:has-text("Alles accepteren")');
  if (await accept.first().isVisible({ timeout: 5000 }).catch(() => false)) {
    await accept.first().click({ force: true });
    await page.waitForTimeout(800);
  }
}

async function sendMessage(page, text) {
  const input = page.locator('#da-chat-input');
  await input.waitFor({ state: 'visible', timeout: TIMEOUT });
  await page.waitForFunction(() => !document.getElementById('da-typing'), { timeout: TIMEOUT }).catch(() => {});
  await input.click();
  await page.waitForTimeout(300);
  await input.fill(text);
  await page.waitForTimeout(500);
  await page.locator('#da-send-btn').click();
  await page.waitForSelector('#da-typing', { state: 'detached', timeout: TIMEOUT }).catch(() => {});
  await page.waitForTimeout(PAUSE);
}

async function main() {
  const browser = await chromium.launch({ headless: true, slowMo: 120 });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: OUT_DIR, size: { width: 1440, height: 900 } },
  });
  await ctx.addInitScript(() => {
    sessionStorage.clear();
    localStorage.clear();
  });
  const page = await ctx.newPage();
  const video = page.video();

  console.log('Recording →', OUT_DIR);
  try {
    await page.goto(`${BASE}?nocache=rec${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    await dismissCookies(page);
    await page.waitForSelector('#da-chat-input', { timeout: TIMEOUT });
    await page.waitForTimeout(2500);

    for (const msg of MESSAGES) {
      console.log('send:', msg.slice(0, 55) + '...');
      await sendMessage(page, msg);
    }

    if (existsSync(LOGO)) {
      console.log('upload logo');
      await page.locator('#da-logo-btn').click();
      await page.locator('#da-logo-input').setInputFiles(LOGO);
      await page.waitForSelector('#da-typing', { state: 'detached', timeout: TIMEOUT }).catch(() => {});
      await page.waitForTimeout(PAUSE);
    }

    const confirm = page.locator('#da-confirm-yes');
    if (!(await confirm.isVisible({ timeout: 30_000 }).catch(() => false))) {
      await sendMessage(page, 'Ja, dit klopt — bevestig de briefing en maak de mock-ups.');
    }
    if (await confirm.isVisible({ timeout: 30_000 }).catch(() => false)) {
      console.log('confirm brief');
      await page.waitForTimeout(1500);
      await confirm.click();
    } else {
      throw new Error('Confirm card not visible — abort recording');
    }

    console.log('waiting for results...');
    const deadline = Date.now() + GEN_TIMEOUT;
    while (Date.now() < deadline) {
      const hidden = await page.locator('#da-results').getAttribute('hidden');
      const imgs = await page.locator('#da-mockups img').count();
      if (hidden === null && imgs >= 2) {
        console.log('results ready, mockups:', imgs);
        break;
      }
      await page.waitForTimeout(3000);
    }

    await page.locator('#da-results').scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(4000);
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
    await page.waitForTimeout(5000);
  } finally {
    await page.close();
    await ctx.close();
    if (video) {
      const dest = join(OUT_DIR, `inspire-live-session-${Date.now()}.webm`);
      await video.saveAs(dest);
      console.log('\n✓ RAW VIDEO:', dest);
    } else {
      console.error('No video captured');
      process.exit(1);
    }
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

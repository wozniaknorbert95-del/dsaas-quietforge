/**
 * M0-B LinkedIn — curated wizard + bedankt screenshots from production.
 * Usage: node scripts/capture-wizard-m0b-screens.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'https://zzpackage.flexgrafik.nl';
const OUT = join(process.cwd(), 'docs/operations/media/m0b-screens');
const TIMEOUT = 120_000;

/** Portfolio-safe mock — same shape as zzpackage BRIEF_MOCK_ORDER (no PII). */
const BRIEF_MOCK_ORDER = {
  order_id: 99901,
  amount: '1247.00',
  items: [
    { sku: 'F-001', name: 'Logo Bronbestand', quantity: 1 },
    { sku: 'DF-004', name: 'Voertuigontwerp', quantity: 1 },
    { sku: 'NA-WRAP-BASIC', name: 'Partial Wrap Basis', quantity: 1 },
    { sku: 'OC-001', name: 'Polo Premium', quantity: 3 },
    { sku: 'NW-003', name: 'Sticker-visitekaartjes PRO', quantity: 1 },
    { sku: 'TB-001', name: 'Bouwbord A3', quantity: 1 },
  ],
};

mkdirSync(OUT, { recursive: true });

async function dismissCookies(page) {
  const accept = page.locator('#fg-cookie-accept-all, button:has-text("ALLES ACCEPTEREN")');
  if (await accept.first().isVisible({ timeout: 4000 }).catch(() => false)) {
    await accept.first().click({ force: true });
    await page.waitForTimeout(500);
  }
}

async function waitWizard(page) {
  await page.waitForFunction(() => typeof ZZPWizard !== 'undefined', { timeout: TIMEOUT });
}

async function loadLazy(page) {
  await page.evaluate(async () => {
    await ZZPWizard.loadLazyScriptIfNeeded?.();
  });
  await page.waitForTimeout(2500);
}

async function goStep(page, stepIndex) {
  await loadLazy(page);
  await page.evaluate((n) => {
    ZZPWizard.jumpToStep(n);
  }, stepIndex);
  await page.waitForFunction(
    (n) => typeof ZZPWizard !== 'undefined' && ZZPWizard.currentState === n,
    stepIndex,
    { timeout: TIMEOUT }
  );
  await page.waitForTimeout(2000);
}

async function shotFrame(page, name, selector = '#zzp-wizard-app, .wizard-container') {
  await dismissCookies(page);
  await page.waitForTimeout(400);
  const path = join(OUT, name);
  const box = page.locator(selector).first();
  if (await box.isVisible().catch(() => false)) {
    await box.screenshot({ path });
  } else {
    await page.screenshot({ path, fullPage: false });
  }
  console.log('saved', name);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  // 00 — Intro (no preset — clean welcome)
  await page.goto(`${BASE}/wizard/?nocache=m0bintro${Date.now()}`, {
    waitUntil: 'domcontentloaded',
    timeout: TIMEOUT,
  });
  await page.waitForSelector('.wizard-intro-v6', { timeout: TIMEOUT });
  await dismissCookies(page);
  await waitWizard(page);
  await page.evaluate(() => {
    ZZPWizard.currentState = 0;
    ZZPWizard.renderStep();
  });
  await page.waitForTimeout(1500);
  await shotFrame(page, 'm0b-00-welcome.png');

  // Groeier preset path for configured steps + checkout
  await page.goto(`${BASE}/wizard/?preset=groeier&nocache=m0b${Date.now()}`, {
    waitUntil: 'domcontentloaded',
    timeout: TIMEOUT,
  });
  await page.waitForSelector('.wizard-intro-v6', { timeout: TIMEOUT });
  await dismissCookies(page);
  await waitWizard(page);
  await page.waitForFunction(
    () => ZZPWizard.activePresetId === 'groeier' && ZZPWizard.cartValue >= 199,
    { timeout: TIMEOUT }
  );

  // 01 — Foundation
  await goStep(page, 1);
  await page.waitForSelector('.option-card', { timeout: TIMEOUT });
  const fCard = page.locator('.option-card[data-sku="F-001"]').first();
  if (await fCard.isVisible().catch(() => false)) {
    await fCard.click();
    await page.waitForTimeout(800);
  }
  await shotFrame(page, 'm0b-01-foundation.png');

  // 02 — Vehicle + cart
  await goStep(page, 2);
  await page.waitForTimeout(3000);
  await shotFrame(page, 'm0b-02-vehicle-cart.png');

  // 08 — Checkout
  await page.evaluate(async () => {
    await ZZPWizard.loadLazyScriptIfNeeded?.();
    ZZPWizard.jumpToCheckoutFromIntro();
  });
  await page.waitForSelector('.wiz-checkout-step, #wiz-checkout-agree-design', { timeout: TIMEOUT });
  await page.waitForTimeout(2500);
  await shotFrame(page, 'm0b-08-checkout.png');

  // 09 — Bedankt choice cards
  await page.goto(`${BASE}/bedankt/?nocache=m0bbed${Date.now()}`, {
    waitUntil: 'domcontentloaded',
    timeout: TIMEOUT,
  });
  await dismissCookies(page);
  await page.waitForSelector('#btn-fill-now', { timeout: TIMEOUT });
  await page.waitForSelector('#btn-fill-later', { timeout: TIMEOUT });
  await page.waitForTimeout(1000);
  await shotFrame(page, 'm0b-09-bedankt-choice.png', '.zzp-wizard-app, .wizard-container');

  // 10 — Brief form with mock order sections
  await page.locator('#btn-fill-now').click();
  await page.waitForSelector('#brief-form-section.bedankt-panel-visible', { timeout: TIMEOUT });
  await page.waitForFunction(
    () => typeof FGBriefForm !== 'undefined' && typeof FGBriefForm.buildDynamicForm === 'function',
    { timeout: TIMEOUT }
  );
  await page.evaluate((mock) => {
    FGBriefForm.buildDynamicForm(mock);
  }, BRIEF_MOCK_ORDER);
  await page.waitForSelector('.brief-section-heading', { timeout: TIMEOUT });
  await page.waitForTimeout(1500);
  const sections = await page.locator('.brief-section-heading').count();
  if (sections < 2) {
    throw new Error(`Expected ≥2 brief sections, got ${sections}`);
  }
  await shotFrame(page, 'm0b-10-brief-form.png', '.zzp-wizard-app, .wizard-container');

  await browser.close();
  console.log(`done — 7 screens in ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

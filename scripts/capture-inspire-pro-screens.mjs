/**
 * INSPIRE LinkedIn pro — capture live intake + compose results frames.
 * Enterprise flow (orchestrator opening, budget chips) — no 'Hoi'.
 * Usage: node scripts/capture-inspire-pro-screens.mjs
 */
import { chromium } from 'playwright';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const BASE = 'https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/';
const OUT = join(process.cwd(), 'docs/operations/media/inspire-screens');
const TIMEOUT = 180_000;
const PAUSE = 1800;

mkdirSync(OUT, { recursive: true });

async function dismissCookies(page) {
  const accept = page.locator('#fg-cookie-accept-all, button:has-text("Alles accepteren")');
  if (await accept.first().isVisible({ timeout: 5000 }).catch(() => false)) {
    await accept.first().click({ force: true });
    await page.waitForTimeout(600);
  }
}

async function waitTypingDone(page) {
  await page.waitForFunction(() => !document.getElementById('da-typing'), { timeout: TIMEOUT }).catch(() => {});
  await page.waitForTimeout(PAUSE);
}

async function sendMessage(page, text) {
  const input = page.locator('#da-chat-input');
  await input.waitFor({ state: 'visible', timeout: TIMEOUT });
  await waitTypingDone(page);
  await input.fill(text);
  await page.locator('#da-send-btn').click();
  await waitTypingDone(page);
}

async function clickChip(page, pattern) {
  const chip = page.locator('.da-quick-reply').filter({ hasText: pattern });
  if (await chip.first().isVisible({ timeout: 5000 }).catch(() => false)) {
    await chip.first().click();
    await waitTypingDone(page);
    return true;
  }
  return false;
}

async function shot(page, name, selector) {
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
  const gate = { pass: true, errors: [], notes: [], opening_checks: {} };

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  await ctx.addInitScript(() => {
    sessionStorage.clear();
    localStorage.clear();
  });
  const page = await ctx.newPage();

  await page.goto(`${BASE}?nocache=inspire${Date.now()}`, {
    waitUntil: 'domcontentloaded',
    timeout: TIMEOUT,
  });
  await dismissCookies(page);

  const heroText = (await page.locator('h1.da-hero__title').textContent().catch(() => '')) || '';
  if (!/Ontwerp je bus/i.test(heroText)) {
    gate.pass = false;
    gate.errors.push(`Hero fail: "${heroText.trim()}"`);
  }

  const offline = page.locator('.da-composer--offline');
  if (await offline.isVisible({ timeout: 5000 }).catch(() => false)) {
    gate.pass = false;
    gate.errors.push('Design Agent offline');
  }

  await page.waitForSelector('#da-chat-input', { timeout: TIMEOUT });
  await page.waitForSelector('.da-msg--bot', { timeout: TIMEOUT });
  const openingText = (await page.locator('.da-msg--bot').first().textContent().catch(() => '')) || '';
  gate.opening_checks.no_helpen = !/helpen/i.test(openingText);
  gate.opening_checks.standard_premium =
    /Standard/i.test(openingText) && /Premium/i.test(openingText);
  if (!gate.opening_checks.no_helpen) gate.errors.push('opening contains helpen');
  if (!gate.opening_checks.standard_premium) gate.errors.push('opening missing Standard/Premium');

  await shot(page, 'inspire-00-hero.png', '.da-hero, #da-chat');

  await sendMessage(page, 'Schilder Janssen');
  await clickChip(page, /Bouw|schilder/i);
  await sendMessage(page, 'Noord-Brabant');
  await clickChip(page, /Bestelbus L|bus_l/i);
  await clickChip(page, /zakelijk/i);
  await sendMessage(page, "Woningeigenaren en VvE's in Noord-Brabant");
  await sendMessage(page, 'Binnen- en buitenschilderwerk en behangen');
  await clickChip(page, /Strak/i);

  await shot(page, 'inspire-01-intake.png', '#da-chat');
  await browser.close();

  gate.notes.push(
    'Enterprise intake captured (opening GET, chips). Confirm/mockups composed from bench v2 + QF template.'
  );
  const compose = spawnSync('node', ['scripts/compose-inspire-ui-screens.mjs'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
  if (compose.status !== 0) {
    gate.pass = false;
    gate.errors.push('compose-inspire-ui-screens failed');
  }

  writeFileSync(join(OUT, 'gate-report.json'), JSON.stringify({ ...gate, at: new Date().toISOString() }, null, 2));
  console.log('gate', gate.pass ? 'PASS' : 'FAIL', gate.errors);
  if (!gate.pass) process.exit(1);
  console.log(`done — screens in ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

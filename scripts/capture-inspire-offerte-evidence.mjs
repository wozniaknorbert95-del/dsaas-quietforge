/**
 * Phase 2 — capture offerte success evidence from prod Design Intake.
 * Extends gate-inspire-e2e flow; falls back to source-faithful HTML if generate is rate-limited.
 *
 * Usage: node scripts/capture-inspire-offerte-evidence.mjs
 *
 * Outputs:
 *   docs/operations/media/inspire-screens/inspire-05-offerte-success.png (raw capture)
 *   public/gratka/inspire/offerte-success.png (site evidence)
 */
import { chromium } from 'playwright';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const BASE = 'https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/';
const OUT = join(process.cwd(), 'docs/operations/media/inspire-screens');
const PUBLIC_OUT = join(process.cwd(), 'public/gratka/inspire/offerte-success.png');
const FALLBACK_HTML = join(process.cwd(), 'docs/operations/media/inspire-slides/offerte-evidence.html');
const LOGO = join(OUT, 'schilder-janssen-logo.png');
const TIMEOUT = 180_000;
const GEN_TIMEOUT = 300_000;
const PAUSE = 2200;
const PROOF_EMAIL = 'quietforge+inspire-evidence@flexgrafik.nl';
const PROOF_PHONE = '0687286151';

mkdirSync(OUT, { recursive: true });
mkdirSync(join(process.cwd(), 'public/gratka/inspire'), { recursive: true });

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

async function runIntakeToMockups(page) {
  await page.goto(`${BASE}?nocache=offerte${Date.now()}`, {
    waitUntil: 'domcontentloaded',
    timeout: TIMEOUT,
  });
  await dismissCookies(page);
  await page.waitForSelector('#da-chat-input', { timeout: TIMEOUT });

  await sendMessage(page, 'Schilder Janssen');
  await clickChip(page, /Bouw|schilder/i);
  await sendMessage(page, 'Noord-Brabant');
  await clickChip(page, /Bestelbus L|bus_l/i);
  await clickChip(page, /zakelijk/i);
  await sendMessage(page, "Woningeigenaren en VvE's in Noord-Brabant");
  await sendMessage(page, 'Binnen- en buitenschilderwerk en behangen');
  await clickChip(page, /Strak/i);
  await clickChip(page, /Bellen|telefoon/i);
  await sendMessage(page, '06-98765432. Website: www.janssen-schilder.nl');

  if (existsSync(LOGO)) {
    await page.locator('#da-logo-btn').click();
    await page.locator('#da-logo-input').setInputFiles(LOGO);
    await waitTypingDone(page);
  }

  await clickChip(page, /€300|300.*600/i);
  await clickChip(page, /Flexibel|flexibel/i);

  const confirm = page.locator('#da-confirm-yes');
  if (await confirm.isVisible({ timeout: 90_000 }).catch(() => false)) {
    await confirm.click();
  }

  const deadline = Date.now() + GEN_TIMEOUT;
  while (Date.now() < deadline) {
    const hidden = await page.locator('#da-results').getAttribute('hidden');
    const imgs = await page.locator('#da-mockups img').count();
    if (hidden === null && imgs >= 2) return { ok: true, mockups: imgs };
    const combined = await page.locator('.da-msg--bot').last().textContent().catch(() => '');
    if (/te veel verzoeken|429|rate limit|tijdelijk beperkt/i.test(combined || '')) {
      return { ok: false, reason: 'rate_limited' };
    }
    await page.waitForTimeout(3000);
  }
  return { ok: false, reason: 'mockups_timeout' };
}

async function captureProdSuccess(page) {
  await page.locator('[data-offerte-select]').first().click();
  await page.waitForSelector('#da-offerte-panel:not([hidden])', { timeout: 30_000 });

  await page.locator('#da-offerte-email').fill(PROOF_EMAIL);
  await page.locator('#da-offerte-telefoon').fill(PROOF_PHONE);
  await page.locator('#da-offerte-consent').check();
  await page.locator('#da-offerte-submit').click();

  await page.waitForSelector('#da-offerte-success:not([hidden])', { timeout: 60_000 });
  await page.waitForTimeout(800);

  const raw = join(OUT, 'inspire-05-offerte-success.png');
  await page.locator('#da-offerte-success').screenshot({ path: raw });
  return { mode: 'prod', raw };
}

async function captureFallback() {
  if (!existsSync(FALLBACK_HTML)) {
    throw new Error(`Missing fallback HTML: ${FALLBACK_HTML}`);
  }
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 720, height: 520 }, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(FALLBACK_HTML).href, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const raw = join(OUT, 'inspire-05-offerte-success.png');
  await page.locator('#da-offerte-success').screenshot({ path: raw });
  await browser.close();
  return { mode: 'source-fallback', raw };
}

async function main() {
  const report = {
    pass: false,
    mode: '',
    at: new Date().toISOString(),
    errors: [],
    notes: [],
  };

  let rawPath = '';

  if (existsSync(LOGO)) {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    await ctx.addInitScript(() => {
      sessionStorage.clear();
      localStorage.clear();
    });
    const page = await ctx.newPage();

    try {
      const intake = await runIntakeToMockups(page);
      if (intake.ok) {
        const cap = await captureProdSuccess(page);
        rawPath = cap.raw;
        report.mode = cap.mode;
        report.notes.push(`prod generate OK (${intake.mockups} mockups); offerte submitted to ${PROOF_EMAIL}`);
      } else {
        report.notes.push(`prod generate skipped: ${intake.reason}`);
        const cap = await captureFallback();
        rawPath = cap.raw;
        report.mode = cap.mode;
      }
    } catch (err) {
      report.errors.push(String(err.message || err));
      report.notes.push('prod capture failed — trying source fallback');
      try {
        const cap = await captureFallback();
        rawPath = cap.raw;
        report.mode = cap.mode;
      } catch (fallbackErr) {
        report.errors.push(`fallback: ${fallbackErr.message || fallbackErr}`);
      }
    } finally {
      await browser.close();
    }
  } else {
    report.notes.push(`logo missing (${LOGO}) — source fallback only`);
    const cap = await captureFallback();
    rawPath = cap.raw;
    report.mode = cap.mode;
  }

  if (!rawPath || !existsSync(rawPath)) {
    report.pass = false;
    writeFileSync(join(OUT, 'offerte-evidence-report.json'), JSON.stringify(report, null, 2));
    console.error('FAIL', report.errors);
    process.exit(1);
  }

  copyFileSync(rawPath, PUBLIC_OUT);
  report.pass = true;
  report.artifacts = [rawPath, PUBLIC_OUT];
  writeFileSync(join(OUT, 'offerte-evidence-report.json'), JSON.stringify(report, null, 2));
  console.log('PASS', report.mode, '→', PUBLIC_OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

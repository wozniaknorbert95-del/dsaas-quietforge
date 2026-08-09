/**
 * Debug INSPIRE prod generate step — logs network + chat state.
 */
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/';
const LOGO = join(process.cwd(), 'docs/operations/media/inspire-screens/schilder-janssen-logo.png');
const TIMEOUT = 120_000;

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { sessionStorage.clear(); localStorage.clear(); });
  const page = await ctx.newPage();

  page.on('response', async (res) => {
    const u = res.url();
    if (u.includes('design-agent') && (u.includes('generate') || u.includes('chat'))) {
      const body = await res.text().catch(() => '');
      console.log('API', res.status(), u.split('/').slice(-2).join('/'), body.slice(0, 400));
    }
  });

  await page.goto(`${BASE}?nocache=dbg${Date.now()}`, { waitUntil: 'domcontentloaded' });
  const accept = page.locator('#fg-cookie-accept-all, button:has-text("Alles accepteren")');
  if (await accept.first().isVisible({ timeout: 4000 }).catch(() => false)) await accept.first().click();

  await page.waitForSelector('#da-chat-input', { timeout: TIMEOUT });
  const msgs = [
    'Hoi! Ik wil voertuigreclame voor mijn schildersbedrijf.',
    'Bedrijfsnaam: Schilder Janssen. Branche: schilder. Diensten: binnen- en buitenschilderwerk en behangen. Doelgroep: woningeigenaren en VvE\'s.',
    'Strakke betrouwbare uitstraling, balanced.',
    'Bestelbus L (bus_l), zakelijk.',
    'Telefoon 06-98765432, website www.janssen-schilder.nl.',
  ];
  for (const m of msgs) {
    await page.locator('#da-chat-input').fill(m);
    await page.locator('#da-send-btn').click();
    await page.waitForSelector('#da-typing', { state: 'detached', timeout: TIMEOUT }).catch(() => {});
    await page.waitForTimeout(1000);
  }

  if (existsSync(LOGO)) {
    await page.locator('#da-logo-btn').click();
    await page.locator('#da-logo-input').setInputFiles(LOGO);
    await page.waitForSelector('#da-typing', { state: 'detached', timeout: TIMEOUT }).catch(() => {});
    await page.waitForTimeout(2000);
  }

  const confirm = page.locator('#da-confirm-yes');
  console.log('confirm visible', await confirm.isVisible().catch(() => false));
  if (await confirm.isVisible()) {
    await confirm.click();
    console.log('clicked confirm');
  }

  for (let i = 0; i < 90; i++) {
    const hidden = await page.locator('#da-results').getAttribute('hidden');
    const imgs = await page.locator('#da-mockups img').count();
    const prog = await page.locator('#da-prog-text').textContent().catch(() => '');
    const lastBot = await page.locator('.da-msg--bot').last().textContent().catch(() => '');
    console.log(`t=${i * 3}s results_hidden=${hidden !== null} imgs=${imgs} prog=${prog?.trim()} last=${lastBot?.slice(0, 80)}`);
    if (hidden === null && imgs >= 2) break;
    await page.waitForTimeout(3000);
  }

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });

/**
 * Create GA4 property "Quietforge" via Analytics provision wizard.
 * Uses Playwright persistent profile (may reuse session from ga4-provision-ui.mjs).
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const IDS_PATH = path.join(REPO_ROOT, 'config', 'ga4-quietforge.ids.json');
const PROFILE_DST = path.join(process.env.TEMP ?? '', 'ga4-playwright-profile');

const ACCOUNT_ID = '337818458';
const SA_EMAIL = 'quietforge-ga-reader-712@flexgrafik.iam.gserviceaccount.com';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const context = await chromium.launchPersistentContext(PROFILE_DST, {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1400, height: 900 },
  });

  const page = context.pages()[0] ?? (await context.newPage());

  // Property creation wizard
  await page.goto('https://analytics.google.com/analytics/web/provision/#/provision/create', {
    waitUntil: 'domcontentloaded',
    timeout: 90_000,
  });
  await sleep(4000);

  if (page.url().includes('signin') || page.url().includes('challenge')) {
    console.error('LOGIN_REQUIRED: sign in to Google in the browser, then re-run this script.');
    await context.close();
    process.exit(1);
  }

  // Step 1: Property name
  const nameField = page.locator('input[aria-label*="Property"], input[aria-label*="Nazwa"], input').first();
  await page.getByRole('textbox', { name: /Property name|Nazwa usługi|Nazwa/i }).first().fill('Quietforge').catch(async () => {
    await page.locator('input[type="text"]').first().fill('Quietforge');
  });
  await sleep(1000);

  // Reporting timezone
  await page.getByRole('combobox', { name: /Reporting time zone|Strefa czasowa/i }).click().catch(() => {});
  await page.getByRole('option', { name: /Amsterdam/i }).click().catch(() => {});
  await sleep(500);

  // Currency EUR
  await page.getByRole('combobox', { name: /Currency|Waluta/i }).click().catch(() => {});
  await page.getByRole('option', { name: /Euro|EUR/i }).click().catch(() => {});
  await sleep(500);

  // Next
  await page.getByRole('button', { name: /Next|Dalej/i }).click();
  await sleep(3000);

  // Business details — skip / defaults
  await page.getByRole('button', { name: /Next|Dalej|Create|Utwórz/i }).click().catch(() => {});
  await sleep(2000);
  await page.getByRole('button', { name: /Next|Dalej|Create|Utwórz/i }).click().catch(() => {});
  await sleep(3000);

  // Data stream setup — Web
  await page.getByRole('button', { name: /Web|Strona|Website/i }).click().catch(() => {});
  await sleep(1000);
  await page.getByLabel(/Website URL|URL witryny/i).fill('https://quietforge.nl').catch(async () => {
    await page.locator('input[type="url"], input[placeholder*="http"]').first().fill('https://quietforge.nl');
  });
  await page.getByLabel(/Stream name|Nazwa strumienia/i).fill('Quietforge Web').catch(async () => {
    const inputs = page.locator('input[type="text"]');
    const count = await inputs.count();
    if (count > 1) await inputs.nth(1).fill('Quietforge Web');
  });
  await sleep(1000);
  await page.getByRole('button', { name: /Create stream|Utwórz strumień|Create|Utwórz/i }).click();
  await sleep(5000);

  // Extract measurement ID from page
  let measurementId = '';
  const body = await page.content();
  const gMatch = body.match(/G-[A-Z0-9]{8,12}/);
  if (gMatch) measurementId = gMatch[0];

  // Navigate to admin to get property ID from URL
  await page.goto('https://analytics.google.com/analytics/web/', { waitUntil: 'domcontentloaded' });
  await sleep(3000);

  // Open property selector and click Quietforge
  await page.getByRole('button', { name: /Quietforge|Open universal selector|Otwórz selektor/i }).first().click().catch(() => {});
  await sleep(2000);
  await page.getByText('Quietforge', { exact: true }).click().catch(() => {});
  await sleep(3000);

  const url = page.url();
  const propMatch = url.match(/p(\d{6,})/);
  const propertyId = propMatch?.[1] ?? '';

  if (!propertyId || propertyId === '528764186') {
    console.error('FAIL: new property not detected. URL:', url);
    await page.screenshot({ path: path.join(REPO_ROOT, 'config', 'ga4-provision-error.png'), fullPage: true });
    await context.close();
    process.exit(1);
  }

  const ids = {
    display_name: 'Quietforge',
    domain: 'quietforge.nl',
    account_id: ACCOUNT_ID,
    property_id: propertyId,
    measurement_id: measurementId,
    legacy_property_id: '528764186',
    legacy_measurement_id: 'G-M24NL622DF',
    sa_email: SA_EMAIL,
    provisioned_at: new Date().toISOString(),
  };

  fs.mkdirSync(path.dirname(IDS_PATH), { recursive: true });
  fs.writeFileSync(IDS_PATH, JSON.stringify(ids, null, 2));
  console.log('SUCCESS', JSON.stringify(ids, null, 2));

  await context.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

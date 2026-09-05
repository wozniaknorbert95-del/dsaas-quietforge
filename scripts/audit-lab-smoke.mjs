import { chromium } from 'playwright';

const base = process.env.AUDIT_BASE_URL ?? 'http://localhost:3000';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
const consoleErrors = [];

page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});

await page.goto(`${base}/lab/`, { waitUntil: 'networkidle' });

const h1 = await page.locator('h1').count();
const milestones = await page.locator('.qf-lab-stage').count();
const initialTitle = await page.locator('#lab-milestone-detail h3').textContent();
await page.locator('#stage-09 button').click();
const selectedTitle = await page.locator('#lab-milestone-detail h3').textContent();
const footerLab = await page.getByRole('link', { name: "Builder's Lab" }).count();
const horizontalOverflow = await page.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth
);

const result = {
  route: `${base}/lab/`,
  status: 'ok',
  h1,
  milestones,
  initialTitle,
  selectedTitle,
  footerLab,
  horizontalOverflow,
  consoleErrors,
};

console.log(JSON.stringify(result, null, 2));
await browser.close();

if (h1 !== 1 || milestones !== 9 || footerLab < 1 || horizontalOverflow || consoleErrors.length > 0) {
  process.exitCode = 1;
}

/**
 * Current header, mobile menu and footer audit.
 * Usage: node scripts/audit-menu-footer.mjs [baseUrl]
 *
 * Footer budget: close + trust + legal, not a catalog (docs/canon/site-map.md).
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:3000';
const EXPECTED_HEADER = ['Systems', 'Approach', 'Security', 'Proof', 'Pricing'];
const FOOTER_LINK_BUDGET = 12;
const FORBIDDEN_FOOTER = [
  'Approach',
  'Security',
  'Pricing',
  'Systems',
  'All systems',
  'Quote & Order Engine',
  'Inbox Triage',
  'Lead Scout',
  'Owner Cockpit',
  'Publishing Gate',
  'Build & Release Flow',
  'Company Brain',
  'AI Security Audit',
  'Custom AI Agent',
  'Terms',
  'Contact',
  'GitHub profile',
  'Data safety playbook',
  'Handover policy',
];

async function getFooterLinks(page) {
  return page.locator('footer a').evaluateAll((links) =>
    links.map((link) => ({ label: link.textContent?.trim() ?? '', href: link.getAttribute('href') ?? '' }))
  );
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 60000 });

  const headerLinks = await page.locator('header nav[aria-label="Primary"] a').evaluateAll((links) =>
    links.map((link) => ({ label: link.textContent?.trim() ?? '', href: link.getAttribute('href') ?? '' }))
  );
  const headerLabels = headerLinks.map((link) => link.label);
  const headerCta = headerLinks.filter((link) => /Book a scan/.test(link.label));
  const hasUnexpectedSolutionsDropdown = (await page.locator('button', { hasText: 'Solutions' }).count()) > 0;

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  const mobileLabels = await page.locator('[aria-label="Mobile primary"] a').evaluateAll((links) =>
    links.map((link) => link.textContent?.trim() ?? '')
  );

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 60000 });
  const footerLinks = await getFooterLinks(page);
  const footerLabels = footerLinks.map((link) => link.label);
  const forbiddenHits = footerLabels.filter((label) =>
    FORBIDDEN_FOOTER.some((forbidden) => label === forbidden || label.startsWith(`${forbidden} `))
  );
  const labLinks = footerLinks.filter((link) => /Builder's Lab/i.test(link.label));
  const privacyLinks = footerLinks.filter((link) => /privacy/i.test(link.label));
  const termsAsOwnLink = footerLinks.some((link) => link.label === 'Terms');
  const localLinks = footerLinks.filter((link) => link.href.startsWith('/') && !link.href.startsWith('//'));
  const hrefChecks = [];
  for (const link of localLinks) {
    const response = await page.request.get(`${BASE}${link.href}`);
    hrefChecks.push({ href: link.href, status: response.status() });
  }

  await browser.close();
  const failedHrefs = hrefChecks.filter((check) => check.status >= 400);
  const headerOk = EXPECTED_HEADER.every((label) => headerLabels.includes(label));
  const mobileHeaderOk = EXPECTED_HEADER.every((label) => mobileLabels.some((actual) => actual.includes(label)));
  const footerOk =
    footerLinks.length <= FOOTER_LINK_BUDGET &&
    labLinks.length === 1 &&
    privacyLinks.length === 1 &&
    !termsAsOwnLink &&
    forbiddenHits.length === 0;
  const report = {
    header: { expected: EXPECTED_HEADER, actual: headerLabels, cta: headerCta, ok: headerOk && headerCta.length === 1 },
    mobile: { labels: mobileLabels, hasExpectedHeader: mobileHeaderOk },
    footer: {
      links: footerLinks.length,
      budget: FOOTER_LINK_BUDGET,
      labels: footerLabels,
      labLinks: labLinks.length,
      forbiddenHits,
      failedHrefs,
      ok: footerOk,
    },
    noLegacySolutionsDropdown: !hasUnexpectedSolutionsDropdown,
    verdict:
      headerOk &&
      headerCta.length === 1 &&
      mobileHeaderOk &&
      footerOk &&
      failedHrefs.length === 0 &&
      !hasUnexpectedSolutionsDropdown
        ? 'PASS'
        : 'FAIL',
  };
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.verdict === 'PASS' ? 0 : 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

// ============================================================================
// SCAN SKU SSoT — Offer A (Hours Engine). Binding: oferty-v1.md v1.1
// Source: dsaas-platform-main tenancy/tenants/quietforge/oferty-v1.md
// Public copy is EN. Prices are net, excl. VAT. Offer B/C live elsewhere.
// ============================================================================

import { formatEuro, PRICING_NUMBERS } from '@/content/pricing';

export const SCAN_VAT_RATE = 0.21;
export const SCAN_HOURS_RATE_EUR = 40;
export const SCAN_CREDIT_DAYS = 30;

export type ScanSkuId = 'hours' | 'both-lanes' | 'decision';

export interface ScanSku {
  id: ScanSkuId;
  name: string;
  eyebrow: string;
  replyKeyword: string;
  priceNet: number;
  mostChosen: boolean;
  youMustSend: string;
  rankingMayInclude: string;
  promise: string;
  timeYou: string;
  timeUs: string;
}

export const SCAN_SKUS: readonly ScanSku[] = [
  {
    id: 'hours',
    name: 'Hours Scan',
    eyebrow: 'Start here',
    replyKeyword: 'HOURS',
    priceNet: PRICING_NUMBERS.scanHours,
    mostChosen: true,
    youMustSend: 'Website URL + one owner export (mailbox or quotes)',
    rankingMayInclude: 'Measured hours only',
    promise:
      'We measure where your week leaks hours — from your files and your website — and we do not invent euro from a sales call.',
    timeYou: '~20–40 min (link + one export)',
    timeUs: 'Intake and review. Tools measure; we gate.',
  },
  {
    id: 'both-lanes',
    name: 'Both-lanes Scan',
    eyebrow: 'Two work files',
    replyKeyword: 'BOTH',
    priceNet: PRICING_NUMBERS.scanBothLanes,
    mostChosen: false,
    youMustSend: 'URL + both exports (mailbox and quotes)',
    rankingMayInclude: 'Measured hours from two work files',
    promise: 'Quotes and inbox in one ranking — two work files, still no invented euro.',
    timeYou: '~40–60 min (two exports)',
    timeUs: 'Map both files to one table, then review.',
  },
  {
    id: 'decision',
    name: 'Decision Scan',
    eyebrow: 'GO / PARK / NO',
    replyKeyword: 'DECISION',
    priceNet: PRICING_NUMBERS.scanDecision,
    mostChosen: false,
    youMustSend: 'Same as Both-lanes + a short decision call',
    rankingMayInclude: 'Same numbers + GO / PARK / NO per item',
    promise:
      'The same measurement as Both-lanes, plus a decision call: GO, PARK, or NO on each leak — still not a build kickoff.',
    timeYou: 'Both-lanes exports + ~20–30 min call',
    timeUs: 'Propose GO / PARK / NO, then your confirmation.',
  },
] as const;

export const DEFAULT_SCAN_SKU_ID: ScanSkuId = 'hours';

export function isScanSkuId(value: string): value is ScanSkuId {
  return SCAN_SKUS.some((sku) => sku.id === value);
}

export function getScanSku(id: ScanSkuId): ScanSku {
  const sku = SCAN_SKUS.find((item) => item.id === id);
  if (!sku) {
    throw new Error(`Unknown scan SKU: ${id}`);
  }
  return sku;
}

export function inclVat(net: number): number {
  return Math.round(net * (1 + SCAN_VAT_RATE) * 100) / 100;
}

export function formatInclVat(net: number): string {
  return `€${inclVat(net).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function scanPriceLine(sku: ScanSku): string {
  return `${formatEuro(sku.priceNet)} excl. VAT · ${formatInclVat(sku.priceNet)} incl. 21% VAT`;
}

export function scanVatLine(sku: ScanSku): string {
  return `excl. VAT · ${formatInclVat(sku.priceNet)} incl. 21% VAT`;
}

export const SCAN_EVIDENCE_LABELS = [
  {
    label: 'Measured hours',
    meaning: 'Time you actually worked, if the file contains duration or start–end.',
  },
  {
    label: 'Waiting time',
    meaning: 'Calendar delay between emails — not multiplied by €40.',
  },
  {
    label: 'You stated',
    meaning: 'A number you declared (rate, deal value) — dated, not “measured in session”.',
  },
  {
    label: 'Website hypothesis',
    meaning: 'Friction on the public site — no hours, no euro.',
  },
  {
    label: 'Not enough data',
    meaning: 'We will not invent a ranking.',
  },
] as const;

export const SCAN_TOOLS = [
  {
    tool: 'Crawl4AI v0.9.4 (self-host)',
    looksAt: 'Your website only (one host)',
    never: 'Cloud crawl, LLM extract, other companies’ sites',
  },
  {
    tool: 'Export parser',
    looksAt: 'Owner-only mailbox / quotes file(s); optional labelled calendar',
    never: 'Live mailbox OAuth, employee mail',
  },
  {
    tool: 'QuietForge Hours Engine',
    looksAt: 'Labels + ranking of measured hours only',
    never: 'Hours from the crawl, euro from waiting time, payback without a build price',
  },
] as const;

export const SCAN_COPY = {
  familyName: 'Hours Engine Scan',
  fromPrice: `from ${formatEuro(PRICING_NUMBERS.scanFrom)} excl. VAT`,
  startHere: 'Hours Scan — start here',
  creditLine: `The fee you pay is credited toward your first build if we start within ${SCAN_CREDIT_DAYS} days.`,
  guarantee:
    'If nothing is worth automating, the report says so — and it will be right. That is a successful scan. You keep the document.',
  noExportHonesty:
    'Without an owner export, we still crawl your site, but we do not print euro rankings. That is an honest result, not a failed scan.',
  howWeCalculate: `Hours per week × €${SCAN_HOURS_RATE_EUR}/h, unless you declare another rate in writing. We do not write “pays back in weeks” — that needs a build price, which this scan does not set.`,
  clientPicks: 'You pick depth of evidence, not a tool list.',
  reportWindow: 'Report typically within 5 working days of a complete export.',
  noWorkshop:
    'The engine is measurement from your files. A live workshop is not the product.',
} as const;

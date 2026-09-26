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
  feeGoesTo: string;
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
    feeGoesTo: 'Your file, labelled, ranked where hours were measured.',
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
    feeGoesTo: 'Both files mapped to one ranking. Still no invented euro.',
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
    feeGoesTo: 'The same ranking, plus a written GO / PARK / NO you can show a partner.',
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
  labHook:
    'You are not buying a chatbot workshop. You are buying a lab result: a measurement stack run on your files, plus a human who will not let a number become a claim without a class.',
  feeGoesTo:
    'Most of what you pay is spent on your files and your report — not a sales call. The rest is the gate: export instruction, review, send-back.',
  h1: 'Hours you can defend — labelled, from your files.',
  heroLead:
    'A free 30-minute call cannot print hours. Send a URL and an owner-only export. We run the stack. We gate. You keep the report.',
} as const;

export const SCAN_CHIPS = [
  { n: '01', label: `From ${formatEuro(PRICING_NUMBERS.scanFrom)} excl. VAT` },
  { n: '02', label: 'Your files, not a sales call' },
  { n: '03', label: 'The report is yours' },
] as const;

export const SCAN_YOU_PAY_FOR = [
  {
    n: '01',
    title: 'The stack',
    body: 'Hours Engine, export parser, one-host crawl. Instruments. Not a GitHub menu.',
  },
  {
    n: '02',
    title: 'The gate',
    body: 'A human who will not let crawl hours, waiting-time euro, or payback without a build price into the ranking.',
  },
] as const;

export const SCAN_PROCESS = [
  {
    n: '1',
    title: 'You send',
    body: 'Website URL and an owner-only export. About 20–40 minutes. No live mailbox login.',
  },
  {
    n: '2',
    title: 'Engine labels',
    body: 'Every number gets a class. The crawl looks at your site only — it never prints hours or euro.',
  },
  {
    n: '3',
    title: 'We gate',
    body: 'Review before a number becomes a claim. Ranking only where hours were measured.',
  },
  {
    n: '4',
    title: 'You keep',
    body: 'A written report. GO on a scan line is not start of build. Credited 30 days if we build.',
  },
] as const;

export const SCAN_TRACKS = [
  {
    n: '1',
    title: 'Public site',
    proves: 'Friction on one host — form, price, buried CTA.',
    never: 'Hours or euro. Label: Website hypothesis.',
  },
  {
    n: '2',
    title: 'Owner export',
    proves: 'Volume, waiting time, and measured hours if duration exists.',
    never: 'A ranking from a conversation. This is the only euro line.',
  },
  {
    n: '3',
    title: 'Decision call',
    proves: 'Exceptions, a different rate, GO / PARK / NO. Label: You stated.',
    never: 'Hours invented on the call. Decision Scan only.',
  },
] as const;

/** Illustration only — not a Quietforge client. Numbers match the sample PDF. */
export const SCAN_SAMPLE = {
  chip: 'Illustration — not a client case',
  company: 'Achterhuis & Zonen',
  measuredHours: 4,
  measuredEuroWeek: 160,
  fromTitle: 'Quote handling',
  fromValue: '4 h/week',
  fromEuro: '€160/week',
  fromClass: 'Measured hours',
  waitTitle: 'Inbox delay',
  waitValue: '3 calendar days median',
  waitEuro: '€0 from this line',
  waitClass: 'Waiting time',
  siteTitle: 'Site lead capture',
  siteValue: 'Form friction',
  siteEuro: 'No hours',
  siteClass: 'Website hypothesis',
  math: `4 h/week × €${SCAN_HOURS_RATE_EUR}/h = €160/week of measured owner time. We do not write “pays back in weeks”.`,
} as const;

export const SCAN_FROM_TO = [
  {
    title: SCAN_SAMPLE.fromTitle,
    value: SCAN_SAMPLE.fromValue,
    euro: SCAN_SAMPLE.fromEuro,
    klass: SCAN_SAMPLE.fromClass,
  },
  {
    title: SCAN_SAMPLE.waitTitle,
    value: SCAN_SAMPLE.waitValue,
    euro: SCAN_SAMPLE.waitEuro,
    klass: SCAN_SAMPLE.waitClass,
  },
  {
    title: SCAN_SAMPLE.siteTitle,
    value: SCAN_SAMPLE.siteValue,
    euro: SCAN_SAMPLE.siteEuro,
    klass: SCAN_SAMPLE.siteClass,
  },
] as const;

export const SCAN_FAQ = [
  {
    q: 'Why paid, not a free 30-minute call?',
    a: 'A free call cannot print hours. You pay for the stack on your files and the gate that keeps a number from becoming a claim without a class. If nothing is worth automating, you keep the report. That is a successful scan.',
  },
  {
    q: 'What if I cannot send an export?',
    a: 'Without an owner export, we still crawl your site, but we do not print euro rankings. That is an honest result, not a failed scan.',
  },
  {
    q: 'Does GO mean we start building?',
    a: 'No. GO on a scan line is not start of build. The fee is credited toward the first build for 30 days if you choose to go ahead.',
  },
  {
    q: 'How do you turn hours into euro?',
    a: `Hours per week × €${SCAN_HOURS_RATE_EUR}/h, unless you declare another rate in writing. Waiting time is not multiplied. The public counter stays at zero until a client verifies.`,
  },
] as const;

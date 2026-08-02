// Wizard Cash Engine case study copy — sync with flexgrafik-meta module-zzpackage-wizard.md
// Footnote authority: src/content/proof.ts metrics.wizardStepsFootnote

import { EXTERNAL, ROUTES } from '@/lib/constants';
import { metrics } from '@/content/proof';

export const SALES_FUNNEL_SLUG = 'sales-funnel' as const;

export const salesFunnelDisplayName = 'Wizard Cash Engine — self-service quote & onboarding';

export const salesFunnelCaseMeta = {
  title: 'Case study — Self-service quote & onboarding',
  description:
    'How the Wizard Cash Engine on zzpackage.flexgrafik.nl qualifies, prices and checks out via Mollie — calm form or designer handoff, no invented conversion rates.',
  openGraphTitle: 'Case study — Wizard Cash Engine',
  openGraphDescription:
    `${metrics.wizardStepsFootnote} · Mollie checkout from €199 · progress bar and sticky cart on every step.`,
  twitterDescription:
    'Live wizard on zzpackage — open pricing, structured uploads, Mollie checkout. Process proof only.',
  ogAlt: 'Case study — Sales Funnel Engine configurator',
} as const;

export const salesFunnelWizardBridge = {
  eyebrow: '// live proof',
  title: 'Try the production wizard in two minutes',
  lead:
    'zzpackage.flexgrafik.nl is the revenue layer I run before selling automation — same stack Quietforge deploys for SMB clients. Wizard-only checkout; no classic shop. Optional Design Intake for complex vehicle jobs (PARTIAL).',
  cta: 'Open zzpackage wizard →',
  href: EXTERNAL.zzpackageWizardPath,
} as const;

export const salesFunnelOwnerEcosystemBridge = {
  eyebrow: '// full stack',
  title: 'Wizard sits inside an eight-repo ecosystem',
  lead:
    'Lead magnet game, Jadzia COI, VCMS governance and Agent OS engineering — mapped together on the owner ecosystem page.',
  cta: 'Owner ecosystem map →',
  href: ROUTES.resultsOwnerEcosystem,
} as const;

export const salesFunnelBeforeItems = [
  'The same pricing questions answered by hand, all day',
  'Prospects wait days for a number — then go cold',
  'Details chased by email before you can even quote',
  'No clean record of who asked for what',
] as const;

export const salesFunnelAfterItems = [
  `Guided configurator — ${metrics.wizardStepsFootnote}; client self-qualifies in one session`,
  'Open pricing visible before checkout — Mollie from €199 minimum, no phone call required',
  'Logo and specs uploaded in-flow — calm order form or designer handoff, structured every time',
  'Qualified lead lands in inbox / CRM / sheet automatically via webhook',
] as const;

export type SalesFunnelJourneyStep = {
  step: string;
  title: string;
  detail: string;
  highlight?: boolean;
};

/** Nine UI screens (00–08) — matches gratka journey SVG and live wizard progress bar. */
export const salesFunnelJourneySteps: readonly SalesFunnelJourneyStep[] = [
  { step: '00', title: 'Welcome', detail: 'Orient the client — what they will configure and how long it takes.' },
  { step: '01', title: 'Foundation', detail: 'Core package choices — the build-your-own base every other step builds on.' },
  { step: '02', title: 'Vehicle', detail: 'Mobile branding options — upsell without a sales call.' },
  { step: '03', title: 'Workwear', detail: 'Clothing branding — captured with the same logic as every other category.' },
  { step: '04', title: 'First impression', detail: 'Print and physical materials — no "what did you want again?" emails.' },
  { step: '05', title: 'Visibility', detail: 'On-site presence options — structured option data, not free text.' },
  { step: '06', title: 'Tools', detail: 'Equipment branding — dependencies and minimums enforced in the flow.' },
  { step: '07', title: 'Premium', detail: 'Finishing touches — final upsell inside the journey, not in your inbox.' },
  {
    step: '08',
    title: 'Checkout',
    detail: 'Summary, open price, upload assets, Mollie pay or book. Sticky cart visible throughout.',
    highlight: true,
  },
] as const;

export const salesFunnelArchitectureAlt =
  'Self-service configurator journey: welcome, seven configuration steps with progress bar and sticky cart, then checkout with open pricing';

export const salesFunnelArchitectureIntro =
  'Wizard Cash Engine — a Vanilla JS SPA on WordPress/WooCommerce with Mollie checkout. Progress bar and sticky cart stay visible on every configuration step; per product rules, these elements are never removed or bypassed.';

export const salesFunnelStepsFootnote = metrics.wizardStepsFootnote;

export const salesFunnelBuildDescription =
  `Configurator journey — ${metrics.wizardSteps} UI screens (${metrics.wizardBusinessSteps} business decision stages). Steps 01–07 are configuration; step 08 is checkout with open pricing.`;

export const salesFunnelStack = [
  'WordPress',
  'WooCommerce',
  'Mollie',
  'Vanilla JS SPA',
  'Webhook integration',
] as const;

export const salesFunnelRoiIntro =
  'No invented conversion rates or € saved. This is an honest process comparison you can use internally to decide whether a configurator is the right first build.';

export const salesFunnelRoiRows = [
  { manual: 'Same questions typed again and again', selfService: 'Flow asks once — answers stored in structure' },
  { manual: 'Number arrives days later via email', selfService: 'Open price visible in-session' },
  { manual: 'Every quote captured differently', selfService: 'Same fields, same format, every lead' },
  { manual: 'Prospect drops off — next step unclear', selfService: 'Progress bar + sticky cart keep orientation' },
] as const;

export const salesFunnelRoiFooter =
  'Download the full framing sheet (PDF) for a printable version to share with a partner or accountant.';

export const salesFunnelHubTitle = 'Self-service quote & onboarding';

// ---------------------------------------------------------------------------
// Solutions ladder — /solutions/sales-funnel/ (E-8a SSoT)
// ---------------------------------------------------------------------------

export const salesFunnelSolutionMeta = {
  title: 'Wizard Cash Engine — quotes, design intake & checkout',
  description:
    `Self-service configurator on zzpackage.flexgrafik.nl — ${metrics.wizardSteps} screens, ${metrics.skus} SKUs, Mollie checkout from €199, plus Complex Quote & Design Intake (INSPIRE) as a live supervised path (PARTIAL).`,
  openGraphTitle: 'Wizard Cash Engine — quotes & design intake | Quietforge',
  openGraphDescription:
    `${metrics.wizardStepsFootnote} · ${metrics.skus} SKUs · Mollie · optional design intake before price.`,
  twitterDescription:
    'Live wizard — configure, see price, pay via Mollie. Optional complex quote & visual direction (PARTIAL).',
  ogAlt: 'Wizard Cash Engine — Sales Funnel solution',
} as const;

export const salesFunnelSolutionTitle =
  'Wizard Cash Engine — quotes, visual direction and checkout without the email chase.';

export const salesFunnelSolutionProblem =
  'Manual quoting does not just eat hours — prospects who wanted a number (or a design direction) go cold while you type the same answers again.';

export const salesFunnelSolutionSystemItems = [
  {
    title: salesFunnelJourneySteps[0].title,
    body: 'Orient the client — what they configure and how long it takes. Progress bar stays visible.',
  },
  {
    title: 'Configuration',
    body: `${metrics.wizardStepsFootnote} · ${metrics.skus} active SKUs — structured options, dependencies and minimums enforced in-flow.`,
  },
  {
    title: salesFunnelJourneySteps[7].title,
    body: 'Summary, open price, asset uploads — sticky cart on every step.',
  },
  {
    title: salesFunnelJourneySteps[8].title,
    body: 'Mollie payment from €199 or book — order sync to the operations ledger (INT-002). Checkout LIVE; Gate D real-paid traction not claimed.',
  },
] as const;

/** Complex Quote & Design Intake — INSPIRE extension (PARTIAL). SSoT: flexgrafik-inspire TRUTH-SNAPSHOT (v4.2.0, 2026-07-27). */
export const salesFunnelInspireExtension = {
  eyebrow: 'Extension · PARTIAL',
  title: 'Complex Quote & Design Intake',
  /** LI-R10 hub H2 — outcome line for cold LinkedIn traffic */
  outcomeTitle: 'Design Intake → visual direction → 48-hour quote',
  lead:
    'For vehicle branding and other custom jobs: NL chat intake, an editable confirmed brief with logo upload, Standard/Premium inspiration mockups with indicative pricing, then a no-obligation offerte request — a personal studio quote within 48 hours. Live supervised path on FlexGrafik; the priced Wizard stays the internal fulfilment layer after quote acceptance — Quietforge deploys the same pattern for custom-product quoting.',
  /** Compact LI-R10 lead (results hub `#design-intake`) */
  outcomeLead:
    'Live on FlexGrafik: NL chat intake → editable confirmed brief with logo upload → Standard/Premium inspiration mockups with indicative pricing → offerte request → personal studio quote within 48 hours. PARTIAL — visual direction, not print-ready; final pricing stays manual by design (concierge, not checkout).',
  statusBadge: 'PARTIAL — live supervised path',
  steps: [
    'Structured intake (vehicle branding request)',
    'Confirmed DesignBrief — editable, with logo upload',
    'Standard / Premium inspiration mockups, indicative pricing',
    'Offerte request → personal studio quote within 48 hours',
  ],
  limitations: [
    'Inspiration mockups are not print-ready final artwork (drukklare = Illustrator)',
    'Indicative pricing only — final quote is manual studio work (concierge by design)',
    'No invented conversion uplift claims',
  ],
  demoLabel: 'Open Design Intake',
  demoHref: EXTERNAL.inspireDesignAgent,
  /** Hub secondary — deep story of the offer (not Wizard-only case study) */
  secondaryLabel: 'See solution details',
  secondaryHref: `${ROUTES.salesFunnel}#inspire`,
  evidence: [
    {
      src: '/gratka/inspire/intake.png',
      alt: 'Design Intake — structured vehicle branding request',
      caption: 'Intake',
    },
    {
      src: '/gratka/inspire/mockups.png',
      alt: 'Standard and Premium inspiration mockups',
      caption: 'Direction',
    },
  ],
} as const;

/** Case-study bridge back to the Complex Quote offer (solutions `#inspire`). */
export const salesFunnelInspireBridge = {
  eyebrow: '// complex quote',
  title: 'Complex Quote & Design Intake',
  lead:
    'Vehicle branding and other custom jobs use a supervised Design Intake path — mockups and a 48-hour studio quote — separate from Wizard checkout. Full flow, limitations and live demo live on the Sales Funnel solution page.',
  cta: 'See Design Intake on Sales Funnel',
  href: `${ROUTES.salesFunnel}#inspire`,
} as const;

export const salesFunnelSolutionEffectBefore = [...salesFunnelBeforeItems] as const;

export const salesFunnelSolutionEffectAfter = [...salesFunnelAfterItems] as const;

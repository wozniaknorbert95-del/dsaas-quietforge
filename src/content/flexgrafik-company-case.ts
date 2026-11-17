// ============================================================================
// FLEXGRAFIK COMPANY CASE — one finished owner-operated company as proof.
// Binding: /proof/ featured card + /results/flexgrafik/
// Not a Quietforge client case. No client hours are claimed here.
// Numbers: proof.ts metrics only. No MRR / orders / conversion / GMV.
// Do not name DSAAS or LangGraph on this surface (canon censors).
// ============================================================================

import type { IntentId, ScreenKey } from '@/content/ecosystem';
import { metrics } from '@/content/proof';
import { ROUTES } from '@/lib/constants';

export type CompanyDoorStatus = 'LIVE' | 'PARTIAL' | 'OFFLINE';

export interface CompanyDoor {
  id: string;
  n: string;
  name: string;
  role: string;
  status: CompanyDoorStatus;
  /** Omitted while the surface is offline — never link a dead service. */
  href?: string;
  hrefLabel: string;
  body: string;
  intents: IntentId[];
  /** Demo preview page under /lab/ — the tile screenshot links here. */
  demoHref: string;
  demoLabel: string;
  /** Proof-manifest screen shown on the tile. */
  screenKey: ScreenKey;
}

export interface CompanyWalkStep {
  n: string;
  label: string;
}

export interface CompanyWalk {
  id: string;
  n: string;
  title: string;
  forYou: string;
  status: CompanyDoorStatus;
  /** Omitted while the surface is offline — never link a dead service. */
  href?: string;
  hrefLabel: string;
  steps: readonly CompanyWalkStep[];
  intents: IntentId[];
}

export const FLEXGRAFIK_COMPANY_CASE = {
  honestyChip: 'OWNER-OPERATED REFERENCE · NOT A CLIENT CASE',
  eyebrow: 'The company I built first',
  title: 'FlexGrafik — the company I built first.',
  lead:
    'FlexGrafik is my own company. QuietForge does not sell it. Below are the paths a buyer walks. They are offline right now and coming back. Book a scan for your leaks, not mine.',
  /** Story with a conclusion — Commander-approved wording (2026-11-02, L4-012). Do not edit without his OK. */
  storyTitle: 'The story',
  story: [
    'FlexGrafik was a small Dutch company with a website and a Facebook page, making visual branding for ZZP builders.',
    'I scanned it first, and only after that scan did FlexGrafik get its system: a portal, a configurator shop, a game and a design intake.',
    'Building it was not the hard part.',
    'The hard part was knowing what to build, why, and how much time and money it would really save.',
    'I also learned that a working system is not the same as paying clients: when the hosting lapsed, the shop and the game went offline.',
    'That is why the scan is now my main product, because the scan decides what gets built and what the client\'s budget is spent on.',
  ],
  conclusion:
    'My conclusion: FlexGrafik is coming back and has to sell to ZZP builders again, so that its results become the first proven case for QuietForge.',
  offerMapTitle: 'What this maps to for you',
  offerMap:
    'Hours Scan measures leaks from your files. The build is then priced from what the scan finds — one door, connected doors, or a cockpit with a human gate. FlexGrafik illustrates all three in one company — not a FlexGrafik product, and not a price.',
  notProven:
    'No order count, GMV, conversion rate or payback. Mockups on the custom path are not print-ready. This is not a Quietforge client result.',
  ctaPrimary: 'Book a scan',
  ctaSecondary: "Builder's Lab",
  methodologyLabel: 'How we measure',
  walkLead: 'Three walks. Offline right now — coming back.',
  doorsTitle: 'Four doors.',
  doorsLead:
    'Open any door — every screen leads to a demo preview of the tool behind it. The live FlexGrafik surfaces are offline right now and coming back.',
  demoChip: 'DEMO',
  offlineLabel: 'Offline — coming back',
  platformTitle: 'Next: FlexGrafik becomes a tenant, not a clone',
  platform:
    'In a later phase FlexGrafik becomes Tenant 2 on the governed platform QuietForge uses. Brand, data and configuration stay partitioned. You would receive your own tenant under contract — not a copy of this studio.',
  platformStatus: 'PLANNED' as const,
} as const;

export const FLEXGRAFIK_COMPANY_META = {
  title: 'FlexGrafik — one finished Dutch company',
  description:
    'Owner-operated reference: portal, catalog checkout, lead game and custom intake, built in one company. Offline right now and coming back. Not a QuietForge client case.',
  ogAlt: 'FlexGrafik — one finished Dutch company, owner-operated reference',
} as const;

export const FLEXGRAFIK_PROOF_FEATURED = {
  eyebrow: 'The company I finished first',
  title: 'FlexGrafik — the company I built first',
  body: 'Four doors built in one company. Offline right now — the domain and hosting lapsed — and coming back. Not a QuietForge client case.',
  cta: 'Open the FlexGrafik case',
  href: ROUTES.resultsFlexgrafik,
} as const;

export const FLEXGRAFIK_DOORS: readonly CompanyDoor[] = [
  {
    id: 'portal',
    n: '01',
    name: 'Portal',
    role: 'Front door',
    status: 'OFFLINE',
    hrefLabel: 'Open flexgrafik.nl',
    body: 'One trustworthy front door. The visitor picks the right next step themselves — instead of starting another email thread.',
    intents: ['order'],
    demoHref: ROUTES.labPortal,
    demoLabel: 'Try the demo',
    screenKey: 'portalAssistant',
  },
  {
    id: 'catalog',
    n: '02',
    name: 'Catalog',
    role: 'Configure and pay',
    status: 'OFFLINE',
    hrefLabel: 'Open the Wizard',
    body: `Configure, see the price, pay. ${metrics.skus} SKUs priced by rule — repeatable quotes happen without you.`,
    intents: ['money', 'efficiency'],
    demoHref: ROUTES.labWizard,
    demoLabel: 'Try the demo',
    screenKey: 'wizardCheckout',
  },
  {
    id: 'game',
    n: '03',
    name: 'Game',
    role: 'Qualify cold attention',
    status: 'OFFLINE',
    hrefLabel: 'Play the game',
    body: 'Cold attention earns its way in — play, register, collect the reward, land in the buying path. Not a brochure form.',
    intents: ['money'],
    demoHref: ROUTES.labGame,
    demoLabel: 'Try the demo',
    screenKey: 'leadMagnet',
  },
  {
    id: 'inspire',
    n: '04',
    name: 'Custom intake',
    role: 'Exceptions stay human',
    status: 'OFFLINE',
    hrefLabel: 'Open INSPIRE',
    body: 'The job you cannot configure arrives already described — brief, direction, then a human studio quote.',
    intents: ['calm', 'money'],
    demoHref: ROUTES.labInspire,
    demoLabel: 'Try the demo',
    screenKey: 'inspireIntake',
  },
] as const;

export const FLEXGRAFIK_WALKS: readonly CompanyWalk[] = [
  {
    id: 'catalog',
    n: '1',
    title: 'Catalog',
    forYou: 'Your repeatable quotes.',
    status: 'OFFLINE',
    hrefLabel: 'Walk catalog',
    intents: ['money', 'efficiency'],
    steps: [
      { n: '1', label: 'Enter at the portal' },
      { n: '2', label: 'Open the Wizard' },
      { n: '3', label: 'See the rules-based price' },
      { n: '4', label: 'Continue to Mollie' },
    ],
  },
  {
    id: 'cold',
    n: '2',
    title: 'Cold traffic',
    forYou: 'Traffic that never leaves an email.',
    status: 'OFFLINE',
    hrefLabel: 'Walk the game',
    intents: ['money'],
    steps: [
      { n: '1', label: 'Play' },
      { n: '2', label: 'Pass the registration gate' },
      { n: '3', label: 'Earn the coupon handoff' },
      { n: '4', label: 'Land in the Wizard' },
    ],
  },
  {
    id: 'exception',
    n: '3',
    title: 'Exception',
    forYou: 'The job you cannot configure.',
    status: 'OFFLINE',
    hrefLabel: 'Walk custom intake',
    intents: ['calm'],
    steps: [
      { n: '1', label: 'State the vehicle and logo' },
      { n: '2', label: 'Take a labelled direction' },
      { n: '3', label: 'Request the offerte' },
      { n: '4', label: 'A human quotes within 48 hours' },
    ],
  },
] as const;

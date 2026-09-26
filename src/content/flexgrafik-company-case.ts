// ============================================================================
// FLEXGRAFIK COMPANY CASE — one finished owner-operated company as proof.
// Binding: /proof/ featured card + /results/flexgrafik/
// Not a Quietforge client case. Hours counter stays 0 (hours-counter.ts).
// Numbers: proof.ts metrics only. No MRR / orders / conversion / GMV.
// Do not name DSAAS or LangGraph on this surface (canon censors).
// ============================================================================

import type { IntentId } from '@/content/ecosystem';
import { metrics } from '@/content/proof';
import { EXTERNAL, FLEXGRAFIK_URL, ROUTES } from '@/lib/constants';

export type CompanyDoorStatus = 'LIVE' | 'PARTIAL';

export interface CompanyDoor {
  id: string;
  n: string;
  name: string;
  role: string;
  status: CompanyDoorStatus;
  href: string;
  hrefLabel: string;
  body: string;
  intents: IntentId[];
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
  href: string;
  hrefLabel: string;
  steps: readonly CompanyWalkStep[];
  intents: IntentId[];
}

export const FLEXGRAFIK_COMPANY_CASE = {
  honestyChip: 'OWNER-OPERATED REFERENCE · NOT A CLIENT CASE',
  eyebrow: 'Finished company',
  title: 'One finished Dutch company.',
  lead:
    'FlexGrafik is the print and design studio I run. Quietforge does not sell it. You can walk the same paths a buyer walks — then book a scan for your leaks, not mine.',
  problemTitle: 'Before',
  problem:
    'A studio that quotes in email, takes custom jobs with no price, and meets cold traffic with a form, puts the owner in every thread. That is not a website problem. It is a company that cannot finish a path.',
  systemTitle: 'System',
  system:
    'Four public doors and one tenant. The visitor picks a path. Repeatable work configures and pays. Cold attention earns a handoff. Exceptions stop for a human. The company runs as a live tenant on the same governed platform Quietforge uses — not a cloned shop.',
  effectTitle: 'Effect',
  effect:
    'A path can finish without ping-pong. Exceptions stay labelled exceptions. The owner stays on the approval gate. No Quietforge client hours are claimed here. The public counter on Proof stays at zero until an external client verifies.',
  offerMapTitle: 'What this maps to for you',
  offerMap:
    'Hours Scan measures leaks from your files. Core is one door. Scale is doors connected. Command is the cockpit with a human gate. FlexGrafik illustrates Scale and Command in one company — not a FlexGrafik product, and not a price.',
  notProven:
    'No order count, GMV, conversion rate or payback. Mockups on the custom path are not print-ready. This is not a Quietforge client result.',
  ctaPrimary: 'Book a scan',
  ctaSecondary: "Builder's Lab",
  methodologyLabel: 'How we measure',
  walkLead: 'Three walks. About eight minutes. Live links, labelled.',
  doorsTitle: 'Four doors. One tenant.',
  platformTitle: 'The engine is a tenant, not a clone',
  platform:
    'FlexGrafik runs as a live tenant on the governed platform Quietforge uses. Brand, data and configuration stay partitioned. You would receive your own tenant under contract — not a copy of this studio.',
  platformStatus: 'PROVEN IN THE LAB' as const,
} as const;

export const FLEXGRAFIK_COMPANY_META = {
  title: 'FlexGrafik — one finished Dutch company',
  description:
    'Owner-operated reference: portal, catalog checkout, lead game and custom intake as live doors on one tenant. Not a Quietforge client case. Hours counter stays at zero.',
  ogAlt: 'FlexGrafik — one finished Dutch company, owner-operated reference',
} as const;

export const FLEXGRAFIK_PROOF_FEATURED = {
  eyebrow: 'The company I finished first',
  title: 'FlexGrafik — walk a finished company',
  body: 'Four live doors, one tenant. Not a Quietforge client case. The hours counter above stays at zero on purpose.',
  cta: 'Open the FlexGrafik case',
  href: ROUTES.resultsFlexgrafik,
} as const;

export const FLEXGRAFIK_DOORS: readonly CompanyDoor[] = [
  {
    id: 'portal',
    n: '01',
    name: 'Portal',
    role: 'Front door',
    status: 'LIVE',
    href: FLEXGRAFIK_URL,
    hrefLabel: 'Open flexgrafik.nl',
    body: 'One trustworthy entry. The visitor chooses the next system instead of starting a manual conversation.',
    intents: ['order'],
  },
  {
    id: 'catalog',
    n: '02',
    name: 'Catalog',
    role: 'Configure and pay',
    status: 'LIVE',
    href: EXTERNAL.zzpackageWizard,
    hrefLabel: 'Open the Wizard',
    body: `${metrics.wizardStepsFootnote}, ${metrics.skus} SKUs, open pricing, Mollie from €199. Repeatable work gets a rules-based price.`,
    intents: ['money', 'efficiency'],
  },
  {
    id: 'game',
    n: '03',
    name: 'Game',
    role: 'Qualify cold attention',
    status: 'LIVE',
    href: EXTERNAL.leadMagnetGame,
    hrefLabel: 'Play the game',
    body: `${metrics.gameLevels} acts, a registration gate, then a handoff into the same catalog path — not a brochure form.`,
    intents: ['money'],
  },
  {
    id: 'inspire',
    n: '04',
    name: 'Custom intake',
    role: 'Exceptions stay human',
    status: 'PARTIAL',
    href: EXTERNAL.inspireFlexgrafik,
    hrefLabel: 'Open INSPIRE',
    body: 'Vehicle-branding brief and direction, then a studio quote. Visuals are not print-ready. This path is not checkout.',
    intents: ['calm', 'money'],
  },
] as const;

export const FLEXGRAFIK_WALKS: readonly CompanyWalk[] = [
  {
    id: 'catalog',
    n: '1',
    title: 'Catalog',
    forYou: 'Your repeatable quotes.',
    status: 'LIVE',
    href: EXTERNAL.zzpackageWizardPath,
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
    status: 'LIVE',
    href: EXTERNAL.leadMagnetGame,
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
    status: 'PARTIAL',
    href: EXTERNAL.inspireDesignAgent,
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

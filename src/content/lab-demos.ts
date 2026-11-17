// ============================================================================
// LAB DEMO PAGES — sales-led demo previews under /lab/ (Four doors).
// Binding: /results/flexgrafik/ door tiles + /lab/<door>/ routes.
// Arc: Problem → System → Effect (MR-05). One goal per section (MR-06).
// Copy: sales-first, plain language — technology only where it builds trust.
// Numbers: proof.ts metrics only (MR-14). Proof tier: DEMO (MR-13).
// Screens: proof.ts screens manifest (real captures from the FlexGrafik build).
// ============================================================================

import type { IntentId, ScreenKey } from '@/content/ecosystem';
import { metrics } from '@/content/proof';
import { ROUTES } from '@/lib/constants';

export type DemoPageId = 'portal' | 'wizard' | 'game' | 'inspire';

export interface DemoShot {
  key: ScreenKey;
  /** One line: the outcome the viewer is looking at — not a UI description. */
  caption: string;
}

export interface DemoBenefit {
  title: string;
  body: string;
  intent: IntentId;
}

export interface DemoStep {
  n: string;
  label: string;
  body: string;
}

export interface DemoPage {
  id: DemoPageId;
  route: string;
  eyebrow: string;
  title: string;
  lead: string;
  shots: readonly DemoShot[];
  benefitsTitle: string;
  benefits: readonly DemoBenefit[];
  stepsTitle: string;
  steps: readonly DemoStep[];
  /** One honest line — a boundary that builds trust, not a wall of disclaimers. */
  honesty: string;
  meta: {
    title: string;
    description: string;
    ogImage: string;
    ogAlt: string;
  };
}

export const DEMO_SHARED = {
  chip: 'DEMO PREVIEW · FLEXGRAFIK BUILD',
  shotsTitle: 'See it working',
  demoTitle: 'Try it yourself',
  demoNote:
    'Everything below works — click through it like a customer. Nothing is sent; orders and messages stop safely at “demo”.',
  storyCta: 'Read the FlexGrafik story',
  storyHref: ROUTES.resultsFlexgrafik,
  ctaTitle: 'What would this look like in your company?',
  ctaBody:
    'The Hours Engine Scan measures where your company leaks hours — and which door is worth building first. The build is priced from what the scan finds, not from a catalogue.',
} as const;

/** Shared scan step — the same promise on every demo page. */
const SCAN_STEP: DemoStep = {
  n: '1',
  label: 'Start with the scan',
  body: 'We measure where your current process loses people, hours and money — before anything gets built.',
};

const CONTROL_STEP: DemoStep = {
  n: '3',
  label: 'You stay in control',
  body: 'Every route, message and price rule is yours to approve. Nothing goes live behind your back.',
};

export const DEMO_PAGES: Record<DemoPageId, DemoPage> = {
  portal: {
    id: 'portal',
    route: ROUTES.labPortal,
    eyebrow: 'Demo · Portal',
    title: 'Your customer knows exactly where to go next.',
    lead: 'One trustworthy front door for your business. Visitors choose their own next step — configure, play, or ask for a custom quote — instead of sending another “what do you actually do?” email.',
    shots: [
      {
        key: 'portalAssistant',
        caption:
          'The visitor picks a path in seconds — and arrives at the right door already informed.',
      },
    ],
    benefitsTitle: 'What this changes in your company',
    benefits: [
      {
        title: 'Your offer finally reads as one system',
        body: 'Instead of scattered pages and a contact form, the visitor sees one clear path through your offer — and walks it without you.',
        intent: 'order',
      },
      {
        title: 'Fewer explaining phone calls',
        body: 'People arrive at the right conversation already knowing what you do. You start at the business, not at the basics.',
        intent: 'time',
      },
      {
        title: 'Every door hands over cleanly',
        body: 'Portal, configurator, game and intake pass work forward as one path — nothing falls between tools and gets lost.',
        intent: 'calm',
      },
    ],
    stepsTitle: 'How this lands in your company',
    steps: [
      SCAN_STEP,
      {
        n: '2',
        label: 'Built around your real offer',
        body: 'Your products, your routes, your wording. A typical build lands 2–4 weeks after the scan.',
      },
      CONTROL_STEP,
    ],
    honesty:
      'Preview of the FlexGrafik portal — built and exercised in my own company, not a client result.',
    meta: {
      title: 'Portal demo — one front door for your business',
      description:
        'Demo preview: a business portal where visitors choose their own next step. See what a connected front door could look like in your company.',
      ogImage: '/og/lab-portal.svg',
      ogAlt: 'Portal demo preview — one front door for your business',
    },
  },

  wizard: {
    id: 'wizard',
    route: ROUTES.labWizard,
    eyebrow: 'Demo · Configurator',
    title: 'Your customer sees the price and pays — without calling you.',
    lead: 'A guided configurator that turns “can you send a quote?” into a finished decision. Open pricing, straight into payment — repeatable work quotes itself.',
    shots: [
      {
        key: 'wizardCheckout',
        caption:
          'Configure, see the price, pay — one continuous path. No quote thread, no waiting room.',
      },
    ],
    benefitsTitle: 'What this changes in your company',
    benefits: [
      {
        title: 'Money does not cool down',
        body: 'The buyer pays at the moment of decision — not three emails later, when the urgency is gone.',
        intent: 'money',
      },
      {
        title: 'Quotes write themselves',
        body: 'What you price by hand today prices by rule tomorrow. You step in only for the exceptions that deserve you.',
        intent: 'time',
      },
      {
        title: 'One price, one rulebook',
        body: 'No ad-hoc discounts, no version confusion. The same configuration always lands on the same price.',
        intent: 'order',
      },
    ],
    stepsTitle: 'How this lands in your company',
    steps: [
      SCAN_STEP,
      {
        n: '2',
        label: 'Built on your price rules',
        body: `Your catalog, your pricing logic. The FlexGrafik build runs ${metrics.wizardSteps} guided screens over ${metrics.skus} SKUs — delivered in a typical window of 2–4 weeks after the scan.`,
      },
      CONTROL_STEP,
    ],
    honesty:
      'Preview of the FlexGrafik configurator — built and exercised in my own company, not a client result.',
    meta: {
      title: 'Configurator demo — see the price and pay',
      description:
        'Demo preview: a guided configurator with open pricing and direct checkout. See how repeatable quotes could happen without you.',
      ogImage: '/og/lab-wizard.svg',
      ogAlt: 'Configurator demo preview — see the price and pay',
    },
  },

  game: {
    id: 'game',
    route: ROUTES.labGame,
    eyebrow: 'Demo · Lead game',
    title: 'Cold traffic leaves you a contact — before you ask for one.',
    lead: 'A browser game that earns the email: play, pass a registration gate, collect the reward, land in the buying path. Not a brochure form nobody fills in.',
    shots: [
      {
        key: 'leadMagnet',
        caption:
          'First impression sets a premium tone — a reason to stay, not another banner to ignore.',
      },
      {
        key: 'leadMagnetGameOver',
        caption:
          'The reward moment routes straight into your sales path — interest captured while it is hot.',
      },
      {
        key: 'leadMagnetLeaderboard',
        caption: 'A season ranking brings players back — attention that returns instead of bouncing.',
      },
    ],
    benefitsTitle: 'What this changes in your company',
    benefits: [
      {
        title: 'Cold attention becomes pipeline',
        body: 'Visitors who would never fill in a contact form leave their details to play — and end up inside your sales path.',
        intent: 'money',
      },
      {
        title: 'Honest by design',
        body: 'Reward rules are visible and fair. The leads you get are not tricked into leaving an email — they want to hear from you.',
        intent: 'calm',
      },
      {
        title: 'Same funnel, warmer entry',
        body: 'Game players land in the identical configurator your paying clients use — one path, no dead-end mini-site.',
        intent: 'efficiency',
      },
    ],
    stepsTitle: 'How this lands in your company',
    steps: [
      SCAN_STEP,
      {
        n: '2',
        label: 'Built for your audience',
        body: `Your theme, your reward rules, your handoff. The FlexGrafik build runs ${metrics.gameLevels} acts from play to purchase.`,
      },
      CONTROL_STEP,
    ],
    honesty:
      'Preview of the FlexGrafik lead game — no lead counts or conversion rates are claimed. Not a client result.',
    meta: {
      title: 'Lead game demo — cold traffic leaves a contact',
      description:
        'Demo preview: a browser game that earns the email and hands players into the buying path. See what engagement with a business goal looks like.',
      ogImage: '/og/lab-game.svg',
      ogAlt: 'Lead game demo preview — cold traffic leaves a contact',
    },
  },

  inspire: {
    id: 'inspire',
    route: ROUTES.labInspire,
    eyebrow: 'Demo · Custom intake',
    title: 'The job you cannot configure arrives already described.',
    lead: 'A supervised design intake: the customer states the vehicle, the logo and the goal — and receives a labelled direction before a human prepares the quote. Exceptions stay human, without starting from an empty email.',
    shots: [
      {
        key: 'inspireIntake',
        caption:
          'The brief collects itself — context and assets arrive structured, not as a forty-message thread.',
      },
      {
        key: 'inspireMockups',
        caption:
          'Visual direction before price — the customer sees where the work is going before committing.',
      },
      {
        key: 'inspireHandoff',
        caption:
          'The path ends in a human quote within 48 hours — automation that prepares the work, not one that fakes it.',
      },
    ],
    benefitsTitle: 'What this changes in your company',
    benefits: [
      {
        title: 'Exceptions stop being chaos',
        body: 'The unusual job reaches you as a structured brief with a direction attached — you read it once and quote.',
        intent: 'calm',
      },
      {
        title: 'The first hour is already done',
        body: 'Context, assets and preferences are collected before you open the file. Your time goes to the craft, not the intake.',
        intent: 'time',
      },
      {
        title: 'Custom work keeps its price',
        body: 'A clear brief protects the quote — and the margin — on work that can never be put in a catalogue.',
        intent: 'money',
      },
    ],
    stepsTitle: 'How this lands in your company',
    steps: [
      SCAN_STEP,
      {
        n: '2',
        label: 'Built around your exceptions',
        body: 'Your intake questions, your decision points, your handoff to the studio. A typical build lands 2–4 weeks after the scan.',
      },
      CONTROL_STEP,
    ],
    honesty:
      'Preview of the FlexGrafik custom intake. Mockups show direction, not print-ready artwork — not a client result.',
    meta: {
      title: 'Custom intake demo — exceptions arrive described',
      description:
        'Demo preview: a supervised design intake that turns a vague request into a structured brief and a human quote. See how custom work could arrive ready.',
      ogImage: '/og/lab-inspire.svg',
      ogAlt: 'Custom intake demo preview — exceptions arrive described',
    },
  },
};

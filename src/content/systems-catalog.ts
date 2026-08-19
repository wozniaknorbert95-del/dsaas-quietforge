import { ROUTES } from '@/lib/constants';

export type IntentId = 'time' | 'money' | 'calm' | 'team' | 'order';

export const INTENTS: { id: IntentId; label: string }[] = [
  { id: 'time', label: 'Time' },
  { id: 'money', label: 'Money' },
  { id: 'calm', label: 'Calm' },
  { id: 'team', label: 'Team' },
  { id: 'order', label: 'Order' },
];

export interface SystemRecord {
  slug: string;
  href: string;
  name: string;
  tagline: string;
  intents: IntentId[];
  status: 'NEW ON THE PLATFORM' | 'PROVEN IN THE LAB' | 'OPEN — BECOME A CASE';
  statusShort: string;
  typicallyHours: string;
  replaces: string;
  timeline: string;
  priceNote: 'Scan first — then a fixed price';
  pains: string[];
  steps: string[];
  youGet: string[];
  roiExample: string;
  faq: { q: string; a: string }[];
  worksWith: string[];
}

export const SYSTEMS: SystemRecord[] = [
  {
    slug: 'quote-order-engine',
    href: ROUTES.quoteOrderEngine,
    name: 'Quote & Order Engine',
    tagline: 'From ping-pong quotes to a price and an order in one flow.',
    intents: ['time', 'money'],
    status: 'NEW ON THE PLATFORM',
    statusShort: 'New',
    typicallyHours: '~8–15 h/week',
    replaces: 'Email quotes, spreadsheet prices, manual closing',
    timeline: '2–4 weeks after scan',
    priceNote: 'Scan first — then a fixed price',
    pains: [
      'A quote takes three days of ping-pong.',
      'Price lives too far from the customer.',
      'Closing is still a manual ritual.',
    ],
    steps: [
      'Configure the offer in a governed catalog.',
      'Show an instant price the owner can stand behind.',
      'Let the customer check out.',
      'Land the order in the owner cockpit.',
    ],
    youGet: [
      'Governed catalog and price rules',
      'Checkout without a custom shop',
      'Order visible in one cockpit',
      'Human approval on exceptions',
      'External code review',
      'Security scans before release',
      'Documentation and handover',
      'Repo in your account from day 1',
    ],
    roiExample:
      'Example based on lab measurements: 20 quotes × 45 min = 15 h/week ≈ €2,600/month at €40/h. Your scan gives the real numbers.',
    faq: [
      {
        q: 'Do I need a full webshop?',
        a: 'Usually no. The engine prices and takes the order. A shop rewrite is a different job — we will say so.',
      },
      {
        q: 'Who owns the prices?',
        a: 'You. Rules are documented. Exceptions wait for your approval.',
      },
      {
        q: 'What if a quote is too complex?',
        a: 'It routes to you. The system does not invent a price in the dark.',
      },
    ],
    worksWith: ['owner-cockpit', 'lead-scout'],
  },
  {
    slug: 'inbox-triage',
    href: ROUTES.inboxTriage,
    name: 'Inbox Triage',
    tagline: 'Lanes, draft replies, you approve — then send.',
    intents: ['time', 'calm'],
    status: 'PROVEN IN THE LAB',
    statusShort: 'Lab',
    typicallyHours: '~8–12 h/week',
    replaces: 'One overflowing mailbox, lost follow-ups',
    timeline: '2–3 weeks after scan',
    priceNote: 'Scan first — then a fixed price',
    pains: [
      'Forty mails every morning, no lanes.',
      'Threads you cannot find when it matters.',
      'Follow-ups that die in the inbox.',
    ],
    steps: [
      'Create lanes for the work you actually have.',
      'Draft replies from templates you approve.',
      'You click send.',
      'Log what left the building.',
    ],
    youGet: [
      'Lane model for your mailbox',
      'Drafts, never silent send',
      'Follow-up reminders',
      'Audit of sent mail',
      'External code review',
      'Security scans before release',
      'Documentation and handover',
      'Repo in your account from day 1',
    ],
    roiExample:
      'Example based on lab measurements: 12 h/week ≈ €2,080/month at €40/h. Your scan gives the real numbers.',
    faq: [
      {
        q: 'Will it send without me?',
        a: 'No. Drafts wait. You approve. That is the product.',
      },
      {
        q: 'Which mailbox?',
        a: 'We start with one. More lanes come after it is boringly reliable.',
      },
      {
        q: 'Is this a chatbot on the website?',
        a: 'No. This is your real inbox, with humans in the loop.',
      },
    ],
    worksWith: ['owner-cockpit', 'quote-order-engine'],
  },
  {
    slug: 'lead-scout',
    href: ROUTES.leadScout,
    name: 'Lead Scout',
    tagline: 'Clicks become a qualified hand-off, not a screenshot.',
    intents: ['money'],
    status: 'PROVEN IN THE LAB',
    statusShort: 'Lab',
    typicallyHours: 'recovers missed leads',
    replaces: 'Cold traffic with no follow-up',
    timeline: '2–4 weeks after scan',
    priceNote: 'Scan first — then a fixed price',
    pains: [
      'Clicks without a name or a next step.',
      'Traffic that is never qualified.',
      'No follow-up after the first hello.',
    ],
    steps: [
      'Run a simple play the visitor can finish.',
      'Reward the finish with a real next step.',
      'Qualify against rules you wrote.',
      'Hand off into your quote or inbox flow.',
    ],
    youGet: [
      'A finishable play, not a brochure',
      'Qualification rules you own',
      'Hand-off into an existing flow',
      'Honest status of what is live',
      'External code review',
      'Security scans before release',
      'Documentation and handover',
      'Repo in your account from day 1',
    ],
    roiExample:
      'Example based on lab measurements: 5 recovered leads/month × €300 = €1,500/month. Your scan gives the real numbers.',
    faq: [
      {
        q: 'Is this a lead-magnet game I have to brand like a toy?',
        a: 'Only if it fits. The job is qualification and hand-off, not entertainment.',
      },
      {
        q: 'Do you run ads?',
        a: 'Not in the scan. Paid media stays frozen until you ask, in writing.',
      },
      {
        q: 'Where do leads go?',
        a: 'Into your quote engine or inbox lanes — not a third silo.',
      },
    ],
    worksWith: ['quote-order-engine', 'publishing-gate'],
  },
  {
    slug: 'owner-cockpit',
    href: ROUTES.ownerCockpit,
    name: 'Owner Cockpit',
    tagline: 'One overview. A weekly brief as a draft. You decide.',
    intents: ['time', 'money', 'team', 'order'],
    status: 'PROVEN IN THE LAB',
    statusShort: 'Lab',
    typicallyHours: '~1 workday/week',
    replaces: 'Three silos and decisions from memory',
    timeline: '3–4 weeks after scan',
    priceNote: 'Scan first — then a fixed price',
    pains: [
      'Numbers live in three tools.',
      'You decide from memory.',
      'Margin shows up after the fact.',
    ],
    steps: [
      'Collect the few signals that matter.',
      'Put them on one overview.',
      'Draft a weekly brief.',
      'You approve what happens next.',
    ],
    youGet: [
      'One owner overview',
      'Weekly brief as a draft',
      'Human approval on actions',
      'No silent automations',
      'External code review',
      'Security scans before release',
      'Documentation and handover',
      'Repo in your account from day 1',
    ],
    roiExample:
      'Example based on lab measurements: one workday/week less searching ≈ €1,600/month at €40/h. Your scan gives the real numbers.',
    faq: [
      {
        q: 'Is this a full ERP?',
        a: 'No. If you need an ERP rewrite, an agency fits better — we will say so.',
      },
      {
        q: 'Does it replace my accountant?',
        a: 'No. It makes the week visible so you stop deciding blind.',
      },
      {
        q: 'Can the team see it?',
        a: 'You choose. Default is owner-first.',
      },
    ],
    worksWith: ['quote-order-engine', 'inbox-triage'],
  },
  {
    slug: 'publishing-gate',
    href: ROUTES.publishingGate,
    name: 'Publishing Gate',
    tagline: 'Scan, flag conflicts, approve, then publish.',
    intents: ['calm', 'order', 'team'],
    status: 'NEW ON THE PLATFORM',
    statusShort: 'New',
    typicallyHours: '~3 h/week plus fewer “who published this?”',
    replaces: 'Docs and site drift, no publish trail',
    timeline: '2–3 weeks after scan',
    priceNote: 'Scan first — then a fixed price',
    pains: [
      'Docs and the site disagree.',
      'Nobody can say who published what.',
      'Version chaos every Friday.',
    ],
    steps: [
      'Scan the sources that are allowed to go live.',
      'Flag conflicts before publish.',
      'You approve.',
      'Publish with a log.',
    ],
    youGet: [
      'A single publish trail',
      'Conflict flags before live',
      'Human approval gate',
      'Rollback path',
      'External code review',
      'Security scans before release',
      'Documentation and handover',
      'Repo in your account from day 1',
    ],
    roiExample:
      'Example based on lab measurements: 3 h/week fewer firefights, plus zero mystery publishes. Your scan gives the real numbers.',
    faq: [
      {
        q: 'Will it auto-post to LinkedIn?',
        a: 'Not in this sprint. Live social cadence stays off until you unlock it.',
      },
      {
        q: 'Can marketing skip the gate?',
        a: 'No. That is the point of a gate.',
      },
      {
        q: 'What if sources conflict?',
        a: 'Nothing goes live. You see the conflict and choose.',
      },
    ],
    worksWith: ['owner-cockpit', 'build-release-flow'],
  },
  {
    slug: 'build-release-flow',
    href: ROUTES.buildReleaseFlow,
    name: 'Build & Release Flow',
    tagline: 'Submit a change, scan it, you approve, then it ships with a log.',
    intents: ['calm', 'order'],
    status: 'NEW ON THE PLATFORM',
    statusShort: 'New',
    typicallyHours: 'downtime cost → 0 when the gate is used',
    replaces: 'Ad-hoc live edits with no history',
    timeline: '2–4 weeks after scan',
    priceNote: 'Scan first — then a fixed price',
    pains: [
      'Changes go live because someone had FTP.',
      'No history when it breaks.',
      'Live-by-default is the culture.',
    ],
    steps: [
      'Submit the change as a proposal.',
      'Build and scan.',
      'You approve.',
      'Release and log.',
    ],
    youGet: [
      'Proposal → scan → approve → release',
      'Secret and dependency scans',
      'Human approval on production',
      'An audit trail you can show',
      'External code review',
      'Security scans before release',
      'Documentation and handover',
      'Repo in your account from day 1',
    ],
    roiExample:
      'Example: one avoided live incident pays for the flow. Your scan sizes the real risk.',
    faq: [
      {
        q: 'Is this DevOps for a 3-person firm?',
        a: 'It is a release habit: nothing live without a scan and a click. Not a platform team.',
      },
      {
        q: 'Do you deploy without me?',
        a: 'No. Production stays a Commander action — yours.',
      },
      {
        q: 'What gets scanned?',
        a: 'Secrets, dependencies, and the checks we agreed in the scan report.',
      },
    ],
    worksWith: ['owner-cockpit', 'publishing-gate'],
  },
];

export function systemBySlug(slug: string): SystemRecord | undefined {
  return SYSTEMS.find((item) => item.slug === slug);
}

export function systemsByIntent(intent: IntentId | 'all'): SystemRecord[] {
  if (intent === 'all') {
    return SYSTEMS;
  }
  return SYSTEMS.filter((item) => item.intents.includes(intent));
}

export function relatedSystems(system: SystemRecord): SystemRecord[] {
  return SYSTEMS.filter((item) => system.worksWith.includes(item.slug));
}

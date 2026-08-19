import { ROUTES } from '@/lib/constants';
import { formatEuro } from '@/content/pricing';

export type IntentId = 'time' | 'money' | 'calm' | 'team' | 'order';

export const INTENTS: { id: IntentId; label: string }[] = [
  { id: 'time', label: 'Time' },
  { id: 'money', label: 'Money' },
  { id: 'calm', label: 'Calm' },
  { id: 'team', label: 'Team' },
  { id: 'order', label: 'Order' },
];

export type EvidenceLabel = 'Lab measurement' | 'Illustrative example' | 'Client-verified';

export const HOURLY_RATE_EUR = 40;
export const HOURLY_RATE_CAPTION =
  'Valued at €40/hour — the rate used in our public methodology.';

export interface CostFact {
  text: string;
  label: EvidenceLabel;
}

export interface RoiMath {
  hoursPerWeek: number;
  euroPerMonth: number;
  formula: string;
}

export interface ExampleCompany {
  name: string;
  profile: string;
  before: string[];
  withSystem: string[];
  math: { metric: string; before: string; after: string }[];
}

export interface SystemFeature {
  name: string;
  does: string;
  ownerSees: string;
}

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
  integrations: string;
  tldr: { is: string; givesBack: string; replaces: string };
  costs: CostFact[];
  roi: RoiMath;
  example: ExampleCompany;
  features: SystemFeature[];
  flowSrc: string;
  flowAlt: string;
  flowCaption: string;
  pains: string[];
  steps: string[];
  youGet: string[];
  roiExample: string;
  faq: { q: string; a: string }[];
  worksWith: string[];
}

const TIMELINE = '2–4 weeks after scan';
const PRICE = 'Scan first — then a fixed price' as const;

function monthFromHours(hoursPerWeek: number): number {
  return hoursPerWeek * HOURLY_RATE_EUR * 4;
}

export const SYSTEMS: SystemRecord[] = [
  {
    slug: 'quote-order-engine',
    href: ROUTES.quoteOrderEngine,
    name: 'Quote & Order Engine',
    tagline: 'From ping-pong quotes to a price and an order in one flow.',
    intents: ['time', 'money'],
    status: 'PROVEN IN THE LAB',
    statusShort: 'Lab',
    typicallyHours: '~8–15 h/week',
    replaces: 'Email quotes, spreadsheet prices, manual closing',
    timeline: TIMELINE,
    priceNote: PRICE,
    integrations: 'Mollie checkout · catalog rules · order handoff',
    tldr: {
      is: 'A guided quote-to-order flow: configure, see the price, pay, land in the cockpit.',
      givesBack: '~8–15 h/week of quote ping-pong',
      replaces: 'Email quotes, spreadsheet prices, and a shop you do not need.',
    },
    costs: [
      {
        text: 'Quote response: 2–3 days of email ping-pong before the customer knows the price.',
        label: 'Lab measurement',
      },
      {
        text: 'Follow-up time lost to re-reading threads: ~45 min per request.',
        label: 'Lab measurement',
      },
      {
        text: 'Details chased by hand before a number can even be given.',
        label: 'Lab measurement',
      },
      {
        text: 'No clean record of who asked for what — the next quote starts from zero.',
        label: 'Illustrative example',
      },
    ],
    roi: {
      hoursPerWeek: 15,
      euroPerMonth: monthFromHours(15),
      formula: '20 quotes × 45 min = 15 h/week × €40/h × 4 weeks',
    },
    example: {
      name: 'Van Dijk Installatie',
      profile: '9-person HVAC installer, Utrecht, ~35 quote requests/month',
      before: [
        'Quotes sit in email for 2–3 days while options are priced by hand.',
        'Invalid combinations (wrong vehicle + wrong film) are caught too late.',
        'Payment is a separate invoice chase after the yes.',
      ],
      withSystem: [
        'The customer configures the job in a governed catalog — impossible combos never appear.',
        'An open price is visible before checkout. Mollie takes the payment.',
        'The order object lands in the owner cockpit, not in a buried thread.',
      ],
      math: [
        { metric: 'Time to a price', before: '2–3 days', after: 'Same session' },
        { metric: 'Hours/week on quotes', before: '~15 h', after: 'Exceptions only' },
        { metric: '€/month at €40/h', before: formatEuro(monthFromHours(15)), after: 'Scan gives your number' },
      ],
    },
    features: [
      {
        name: 'Governed catalog',
        does: 'Options and dependencies are encoded so invalid combinations cannot be chosen.',
        ownerSees: 'A configurator that only offers what you actually sell.',
      },
      {
        name: 'Nine guided screens',
        does: 'Welcome through checkout — 9 UI screens, 7 business decision stages.',
        ownerSees: 'The customer finishes in one sitting. You are not the form.',
      },
      {
        name: 'Open price before pay',
        does: 'The price is shown before Mollie. No hidden call to “get a number”.',
        ownerSees: 'A number you already approved in the rules.',
      },
      {
        name: 'Mollie checkout',
        does: 'Payment states (open, paid, failed, expired) are handled in one flow.',
        ownerSees: 'Paid or not paid — not a maybe in WhatsApp.',
      },
      {
        name: 'Uploads in the flow',
        does: 'Logo and specs attach to the order, not to a later email.',
        ownerSees: 'The file is on the order object.',
      },
      {
        name: 'Exception gate',
        does: 'A quote the rules cannot price routes to you. The system does not invent a price.',
        ownerSees: 'A queue item: “needs your number”.',
      },
      {
        name: 'Order handoff',
        does: 'The finished order lands in the owner cockpit.',
        ownerSees: 'One record instead of a thread.',
      },
      {
        name: '167 active catalog rows (lab)',
        does: 'Lab catalog size measured from the production table (active rows).',
        ownerSees: 'Proof the engine can hold a real catalog — yours will be yours.',
      },
    ],
    flowSrc: '/systems/quote-order-engine-flow.svg',
    flowAlt: 'Quote to order: nine screens from welcome to Mollie checkout',
    flowCaption: 'Lab flow: configure → open price → checkout. Approval sits on exceptions, not on every click.',
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
      'Governed catalog with impossible combos blocked',
      'Nine-screen quote path (lab pattern) mapped to your offer',
      'Mollie checkout with payment states',
      'Uploads attached to the order',
      'Exception queue — no invented prices',
      'Order visible in the owner cockpit',
      'Documentation, scans, handover',
      'Your repository from day one',
    ],
    roiExample: `Illustrative composite example — 20 quotes × 45 min = 15 h/week ≈ ${formatEuro(monthFromHours(15))}/month at €40/h. Your scan gives the real numbers.`,
    faq: [
      {
        q: 'Do I need a full webshop?',
        a: 'Usually no. The engine prices and takes the order. A shop rewrite is a different job — we will say so.',
      },
      {
        q: 'When is this NOT the right fit?',
        a: 'If every job is a one-off artwork with no repeatable options, a catalog will fight you. We will say that in the scan.',
      },
      {
        q: 'Who owns the prices and the code?',
        a: 'You. Rules are documented. The repo is yours from day one. Complex quotes wait for your click.',
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
    timeline: TIMELINE,
    priceNote: PRICE,
    integrations: 'Gmail or Microsoft 365 · approval gate',
    tldr: {
      is: 'Mail is classified into lanes. Replies are drafted. You click send.',
      givesBack: '~8–12 h/week of morning triage',
      replaces: 'One overflowing mailbox and drafts started from zero.',
    },
    costs: [
      {
        text: 'Mornings spent sorting newsletters from leads before any real work starts.',
        label: 'Lab measurement',
      },
      {
        text: 'Test-environment process run: 142 messages classified in one pass.',
        label: 'Lab measurement',
      },
      {
        text: 'Reply drafting started from scratch on every thread.',
        label: 'Lab measurement',
      },
      {
        text: 'No trail of what was sent and why — the next hire cannot take over.',
        label: 'Illustrative example',
      },
    ],
    roi: {
      hoursPerWeek: 12,
      euroPerMonth: monthFromHours(12),
      formula: '12 h/week × €40/h × 4 weeks',
    },
    example: {
      name: 'Noordzee Supply',
      profile: '6-person webshop, ~60 customer emails/day',
      before: [
        'Leads, invoices and noise share one inbox.',
        'A hot enquiry sits under a shipping notification.',
        'Every reply is typed as if it were the first.',
      ],
      withSystem: [
        'Four lanes: lead, client, invoice, noise.',
        'A draft waits. You edit or discard.',
        'Nothing leaves without an explicit yes. The send is logged.',
      ],
      math: [
        { metric: 'Morning sort', before: 'Unstructured', after: 'Lanes first' },
        { metric: 'Hours/week on mail', before: '~12 h', after: 'Approve drafts' },
        { metric: '€/month at €40/h', before: formatEuro(monthFromHours(12)), after: 'Scan gives your number' },
      ],
    },
    features: [
      {
        name: 'Secure mailbox connection',
        does: 'Connects with OAuth to Gmail or Microsoft 365 on a schedule you set.',
        ownerSees: 'Mail in. No password stored in a spreadsheet.',
      },
      {
        name: 'Four lanes',
        does: 'Lead, client, invoice, noise — with scoring so paying work surfaces first.',
        ownerSees: 'A list ordered by what pays, not by arrival time.',
      },
      {
        name: 'Draft, never silent send',
        does: 'Replies are drafted in your tone. They wait.',
        ownerSees: 'A draft. A button. Not a surprise in Sent.',
      },
      {
        name: 'Approval gate',
        does: 'Outbound mail cannot skip the human click. That is the architecture.',
        ownerSees: 'Pending: 7. You decide.',
      },
      {
        name: 'Audit of sent mail',
        does: 'Approved sends log. Overrides train the lanes.',
        ownerSees: 'Who sent what, and that you approved it.',
      },
      {
        name: 'Noise rules you can override',
        does: 'Low-intent mail is archived with rules you can break.',
        ownerSees: 'Newsletters not in the same pile as quotes.',
      },
      {
        name: 'One mailbox first',
        does: 'Lab pattern starts with one box. More lanes after it is reliable.',
        ownerSees: 'A boring, working morning — then we add the next box.',
      },
    ],
    flowSrc: '/systems/inbox-triage-flow.svg',
    flowAlt: 'Inbox flow: read, classify into lanes, draft, human approval, send',
    flowCaption: 'The approval step: the draft waits for one click. Nothing auto-sends.',
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
      'OAuth connection to Gmail or Microsoft 365',
      'Lead / client / invoice / noise lanes',
      'Drafts in your tone — never silent send',
      'Human approval on every outbound',
      'Send log and override trail',
      'Start on one mailbox',
      'Documentation, scans, handover',
      'Your repository from day one',
    ],
    roiExample: `Lab process pattern — 12 h/week ≈ ${formatEuro(monthFromHours(12))}/month at €40/h. Your scan gives the real numbers.`,
    faq: [
      {
        q: 'Will it send without me?',
        a: 'No. Drafts wait. You approve. That is the product.',
      },
      {
        q: 'When is this NOT the right fit?',
        a: 'If you want a chatbot that answers customers without you, this is not it. We will refuse that scope.',
      },
      {
        q: 'Who owns the mailbox connection and the code?',
        a: 'You. OAuth to your tenant. Repo in your account from day one.',
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
    typicallyHours: 'missed leads recovered',
    replaces: 'Cold traffic with no follow-up',
    timeline: TIMELINE,
    priceNote: PRICE,
    integrations: 'GA4 events · handoff to quote flow',
    tldr: {
      is: 'A finishable play that qualifies a visitor, then hands them to your quote flow.',
      givesBack: 'leads a static form never gets',
      replaces: 'A brochure page with a form nobody finishes.',
    },
    costs: [
      {
        text: 'Clicks arrive, scan a form, and leave — no name, no next step.',
        label: 'Lab measurement',
      },
      {
        text: 'No reason to finish: no ladder, no reward, no tracked handoff.',
        label: 'Lab measurement',
      },
      {
        text: 'Ad traffic that never qualifies costs the same as traffic that does.',
        label: 'Illustrative example',
      },
    ],
    roi: {
      hoursPerWeek: 0,
      euroPerMonth: 1500,
      formula: '5 recovered leads/month × €300 average job (illustrative)',
    },
    example: {
      name: 'StadLicht Services',
      profile: 'Local service firm running ads; cold traffic that currently does not convert',
      before: [
        'The landing page is a form. Bounce is the default.',
        'No score of who is worth a quote.',
        'The quote engine never sees the visitor.',
      ],
      withSystem: [
        'A register gate before play — name and email, not anonymous traffic.',
        'Five acts with a four-tier reward ladder (lab pattern).',
        'A tracked handoff into the quote-and-order flow, instrumented in GA4.',
      ],
      math: [
        { metric: 'Finish rate', before: 'Form bounce', after: 'Play then ask' },
        { metric: 'Qualified handoffs', before: 'Untracked', after: 'Into quote flow' },
        { metric: '€/month (illustrative)', before: 'Ad spend with no name', after: formatEuro(1500) },
      ],
    },
    features: [
      {
        name: 'Register gate',
        does: 'Name and email before play. Not anonymous traffic.',
        ownerSees: 'A person, not a session id.',
      },
      {
        name: 'Five acts',
        does: 'A finishable path (lab: five Canvas acts) — not a single quiz slide.',
        ownerSees: 'Progress. A reason to stay.',
      },
      {
        name: 'Reward ladder',
        does: 'Four tiers in the lab: discount code then purchase bonuses — not a lottery.',
        ownerSees: 'Rules you wrote. No surprise “free prize” claims.',
      },
      {
        name: 'Season ranking',
        does: 'Monthly ranking as a retention track, separate from the ladder.',
        ownerSees: 'A reason to return without a new ad.',
      },
      {
        name: 'Handoff object',
        does: 'The qualified player is passed to the quote flow — not dumped in a sheet.',
        ownerSees: 'The next system already knows who they are.',
      },
      {
        name: 'GA4 on every step',
        does: 'Play → qualify → handoff is instrumented.',
        ownerSees: 'Where people drop — not a guess.',
      },
      {
        name: 'When engagement fits',
        does: 'This is not the default after every website. Only when a play earns the ask.',
        ownerSees: 'A scan that can say “use a form”.',
      },
    ],
    flowSrc: '/systems/lead-scout-flow.svg',
    flowAlt: 'Lead scout: play, qualify, hand off to the quote flow',
    flowCaption: 'Lab flow: register → acts → reward → tracked handoff. Not a stock photo of a game.',
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
      'Register gate before play',
      'Finishable acts mapped to your offer',
      'Reward rules you own (no lottery framing)',
      'Handoff into quote or inbox — not a third silo',
      'GA4 on the steps that matter',
      'Honest “this is not for every site” scope',
      'Documentation, scans, handover',
      'Your repository from day one',
    ],
    roiExample: `Illustrative composite example — 5 recovered leads/month × €300 = ${formatEuro(1500)}/month. Your scan gives the real numbers.`,
    faq: [
      {
        q: 'Must it look like a game?',
        a: 'Only if a play fits. The job is qualification and hand-off, not entertainment.',
      },
      {
        q: 'When is this NOT the right fit?',
        a: 'Warm inbound that already books a call does not need a play. We will say so.',
      },
      {
        q: 'Do you run ads for me?',
        a: 'Not in the scan. Paid media stays off until you unlock it in writing.',
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
    timeline: TIMELINE,
    priceNote: PRICE,
    integrations: 'Orders · leads · analytics snapshot · approval queue',
    tldr: {
      is: 'One owner screen: facts, the next action, a weekly brief as a draft.',
      givesBack: '~1 workday/week of searching three tools',
      replaces: 'Margin after the fact and decisions from memory.',
    },
    costs: [
      {
        text: 'Orders, leads and traffic live in three tools. The week is reconstructed from memory.',
        label: 'Lab measurement',
      },
      {
        text: 'Margin shows up after the fact — too late to change the job.',
        label: 'Lab measurement',
      },
      {
        text: 'Risky automations have no pause when data is stale.',
        label: 'Lab measurement',
      },
      {
        text: 'The owner is the bottleneck of every “what now?”.',
        label: 'Illustrative example',
      },
    ],
    roi: {
      hoursPerWeek: 8,
      euroPerMonth: monthFromHours(8),
      formula: '1 workday/week (8 h) × €40/h × 4 weeks',
    },
    example: {
      name: 'De Waal Groep',
      profile: '14-person firm where the owner is the bottleneck of every decision',
      before: [
        'Monday starts in the shop, the ads account, and the inbox — none agree.',
        'The weekly recap is a feeling, not a draft.',
        'A stale number still triggers a send.',
      ],
      withSystem: [
        'Orders and leads sit in one operational store.',
        'The cockpit shows one next action — not twenty widgets.',
        'The weekly brief is a draft. You approve. Stale data trips a circuit breaker.',
      ],
      math: [
        { metric: 'Places to look', before: 'Three tools', after: 'One overview' },
        { metric: 'Hours/week searching', before: '~8 h', after: 'Brief + queue' },
        { metric: '€/month at €40/h', before: formatEuro(monthFromHours(8)), after: 'Scan gives your number' },
      ],
    },
    features: [
      {
        name: 'One action queue',
        does: 'The screen is built around the next action, not a dashboard wall.',
        ownerSees: 'What to do now. Then you click.',
      },
      {
        name: 'Order facts',
        does: 'Checkout events land in an operational ledger (lab: order webhook).',
        ownerSees: 'Paid jobs in one list.',
      },
      {
        name: 'Lead unification',
        does: 'Play, quote and portal leads in one store — scored and routed.',
        ownerSees: 'Who is waiting, from where.',
      },
      {
        name: 'Analytics snapshot',
        does: 'A weekly pull of traffic facts into the same loop — not a second login.',
        ownerSees: 'This week vs last, next to orders.',
      },
      {
        name: 'Weekly brief as a draft',
        does: 'A written synthesis for owner review. Not an auto-sent newsletter.',
        ownerSees: 'A draft in the queue.',
      },
      {
        name: 'Approval queue',
        does: 'Consequential actions stay gated. Full autonomy is not offered.',
        ownerSees: 'Propose → you approve.',
      },
      {
        name: 'Circuit breakers',
        does: 'When data is stale, risky automations pause (lab: shadow mode, no silent Act).',
        ownerSees: 'A stop, not a surprise send.',
      },
      {
        name: 'Supervised publish',
        does: 'Prepare → approve → publish for content that is allowed to go live.',
        ownerSees: 'Nothing posts because a calendar fired alone.',
      },
    ],
    flowSrc: '/systems/owner-cockpit-flow.svg',
    flowAlt: 'Owner cockpit: facts in, one queue, weekly brief as a draft, human approval',
    flowCaption: 'Facts → one next action → you approve. No silent Act.',
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
      'Owner overview built around one next action',
      'Orders and leads in one store',
      'Weekly brief as a draft',
      'Approval queue — autonomy not offered',
      'Pause when data is stale',
      'Supervised publish path',
      'Documentation, scans, handover',
      'Your repository from day one',
    ],
    roiExample: `Lab pattern — 1 workday/week ≈ ${formatEuro(monthFromHours(8))}/month at €40/h. Your scan gives the real numbers.`,
    faq: [
      {
        q: 'Is this a full ERP?',
        a: 'No. If you need an ERP rewrite, an agency fits better — we will say so.',
      },
      {
        q: 'When is this NOT the right fit?',
        a: 'If you want a system that spends ads and sends mail with no click from you, we will not build that.',
      },
      {
        q: 'Who sees the cockpit?',
        a: 'Default is owner-first. You choose who else gets a seat. The repo is yours.',
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
    typicallyHours: '~3 h/week plus fewer mystery publishes',
    replaces: 'Docs and site drift, no publish trail',
    timeline: TIMELINE,
    priceNote: PRICE,
    integrations: 'Docs · site · repos · approval trail',
    tldr: {
      is: 'A scan that flags when docs, site and offers disagree — then you approve publish.',
      givesBack: '~3 h/week of “who published this?”',
      replaces: 'Silent drift and no rollback story.',
    },
    costs: [
      {
        text: 'Website, price list and repo quietly disagree. The customer sees the wrong number.',
        label: 'Lab measurement',
      },
      {
        text: 'Lab scan pattern: eight sources checked in one pass; conflicts flagged before production.',
        label: 'Lab measurement',
      },
      {
        text: 'No trail of who approved a publish — the next dispute has no evidence.',
        label: 'Illustrative example',
      },
    ],
    roi: {
      hoursPerWeek: 3,
      euroPerMonth: monthFromHours(3),
      formula: '3 h/week × €40/h × 4 weeks',
    },
    example: {
      name: 'Atelier Hout & Beeld',
      profile: '7-person studio whose website, docs and offers quietly disagree',
      before: [
        'The PDF offer still shows last year’s price.',
        'The site was updated on a Friday by whoever had the password.',
        'Rollback is “we think it was this file”.',
      ],
      withSystem: [
        'A scan lists conflicts before anything goes live.',
        'Publish waits for a named approval.',
        'A log exists. A rollback path exists.',
      ],
      math: [
        { metric: 'Mystery publishes', before: 'Common', after: 'Named trail' },
        { metric: 'Hours/week on firefights', before: '~3 h', after: 'Conflicts first' },
        { metric: '€/month at €40/h', before: formatEuro(monthFromHours(3)), after: 'Scan gives your number' },
      ],
    },
    features: [
      {
        name: 'Drift scan',
        does: 'Compares the sources that are allowed to go live.',
        ownerSees: 'A list of mismatches — not a surprise on the site.',
      },
      {
        name: 'Conflict flags',
        does: 'Disagreements are explicit before publish.',
        ownerSees: 'Red items. You choose.',
      },
      {
        name: 'Approval trail',
        does: 'Who approved what, and when.',
        ownerSees: 'A log you can show.',
      },
      {
        name: 'Read-only assistant',
        does: 'Explains the conflict in plain language. Does not publish.',
        ownerSees: '“These two files disagree” — then you click.',
      },
      {
        name: 'Publish gate',
        does: 'Nothing live without the click.',
        ownerSees: 'Pending publish.',
      },
      {
        name: 'Rollback path',
        does: 'A change that fails can be reversed.',
        ownerSees: 'Previous version, on purpose.',
      },
      {
        name: 'Target: zero unresolved conflicts',
        does: 'Lab governance target: conflicts found before ship.',
        ownerSees: 'A number that is allowed to stay at zero.',
      },
    ],
    flowSrc: '/systems/publishing-gate-flow.svg',
    flowAlt: 'Publishing gate: scan sources, flag conflicts, approve, publish with a log',
    flowCaption: 'Conflict report before live. Caption: nothing publishes until you approve.',
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
      'Drift scan across the sources you name',
      'Conflict flags before production',
      'Named approval trail',
      'Read-only explanation of the mismatch',
      'Publish only after a click',
      'Rollback path',
      'Documentation, scans, handover',
      'Your repository from day one',
    ],
    roiExample: `Lab pattern — 3 h/week ≈ ${formatEuro(monthFromHours(3))}/month at €40/h, plus fewer mystery publishes. Your scan gives the real numbers.`,
    faq: [
      {
        q: 'Will it auto-post to LinkedIn?',
        a: 'No. Live social cadence stays off until you unlock it in writing.',
      },
      {
        q: 'When is this NOT the right fit?',
        a: 'If one person owns one Word file and never publishes a site, a gate is overhead. We will say so.',
      },
      {
        q: 'Can marketing skip the gate?',
        a: 'No. That is the point. The trail is yours; the code is in your repo.',
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
    typicallyHours: 'one avoided live incident',
    replaces: 'Ad-hoc live edits with no history',
    timeline: TIMELINE,
    priceNote: PRICE,
    integrations: 'Git · secret scan · test report · approval log',
    tldr: {
      is: 'A fixed sequence: plan, change, test, you approve, then ship with a log.',
      givesBack: 'the cost of one “who changed this?” incident',
      replaces: 'FTP-by-default and no audit.',
    },
    costs: [
      {
        text: 'Changes go live because someone had the password. History is a guess.',
        label: 'Lab measurement',
      },
      {
        text: 'No human gate before merge or production — lab rule: no auto-deploy to client production.',
        label: 'Lab measurement',
      },
      {
        text: 'When it breaks, there is no session handoff — the next person starts blind.',
        label: 'Illustrative example',
      },
    ],
    roi: {
      hoursPerWeek: 4,
      euroPerMonth: monthFromHours(4),
      formula: 'Illustrative: 4 h/week of firefighting × €40/h × 4 weeks',
    },
    example: {
      name: 'Meridian Parts',
      profile: '11-person company that had a “who changed this?” production incident',
      before: [
        'A Friday edit went live with no scan.',
        'Nobody could say which file moved.',
        'The next morning was archaeology.',
      ],
      withSystem: [
        'Work arrives as a proposal with a plan.',
        'Tests and secret scans run before the click.',
        'You approve. A handoff file closes the session.',
      ],
      math: [
        { metric: 'Live without a click', before: 'Possible', after: 'Blocked' },
        { metric: 'Hours/week firefighting', before: '~4 h (illustrative)', after: 'Log first' },
        { metric: '€/month at €40/h', before: formatEuro(monthFromHours(4)), after: 'Scan sizes the risk' },
      ],
    },
    features: [
      {
        name: 'Fixed specialist steps',
        does: 'Five roles in sequence: plan, change, test, review, close — not a free-for-all.',
        ownerSees: 'Where the work is. Who waits on you.',
      },
      {
        name: 'One module per session',
        does: 'The change step is scoped to the target module — least privilege.',
        ownerSees: 'A small diff, not a weekend rewrite.',
      },
      {
        name: 'Test report before review',
        does: 'Tests and logs are collected before you see the queue.',
        ownerSees: 'Pass/fail, not a speech.',
      },
      {
        name: 'Human review pause',
        does: 'The pipeline stops at reviewing. Approve or block.',
        ownerSees: 'A yes/no. Production stays yours.',
      },
      {
        name: 'Secret scan',
        does: 'Secrets and dependency checks before the change ships.',
        ownerSees: 'A report, not a leaked key next week.',
      },
      {
        name: 'Queue with cost visibility',
        does: 'Lab operator view: queue, history, and a cost tab per task.',
        ownerSees: 'What this change cost in time — not a mystery invoice.',
      },
      {
        name: 'Session handoff on disk',
        does: 'The close step writes a markdown handoff.',
        ownerSees: 'The next person can continue.',
      },
      {
        name: 'No auto-deploy to your production',
        does: 'Shipping to client production is a human action.',
        ownerSees: 'You still press the last button.',
      },
    ],
    flowSrc: '/systems/build-release-flow.svg',
    flowAlt: 'Build and release: plan, change, test, human approval, ship with a log',
    flowCaption: 'Audit log: who approved the ship. Nothing live without that click.',
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
      'Fixed five-step sequence (plan → change → test → approve → close)',
      'Scoped diffs — one module at a time',
      'Test report before your click',
      'Secret and dependency scans',
      'Approval log and session handoff',
      'No silent deploy to your production',
      'Documentation, scans, handover',
      'Your repository from day one',
    ],
    roiExample: `Illustrative composite example — 4 h/week firefighting ≈ ${formatEuro(monthFromHours(4))}/month at €40/h. One avoided incident often pays for the flow. Your scan sizes the real risk.`,
    faq: [
      {
        q: 'Is this a platform team for a 3-person firm?',
        a: 'It is a release habit: nothing live without a scan and a click. Not a department.',
      },
      {
        q: 'When is this NOT the right fit?',
        a: 'If you never change production and have no repo, start with the scan — this flow may be later.',
      },
      {
        q: 'Do you deploy without me?',
        a: 'No. Your production stays your click. The code lives in your repo.',
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

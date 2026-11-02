// ============================================================================
// CONVERSION COPY — hero, positioning, offer (binding strings).
// Source: docs/strategy/marketing-strategy.md + inspiracja pro.md BLOK 2
// ============================================================================

import { PRICING_NUMBERS, formatEuro } from '@/content/pricing';

export const POSITIONING = {
  label: 'Conversion systems architect for small businesses',
  antiPositioning: 'Not a programmer for hire. Not an agency. Not “the AI guy”.',
} as const;

export const HERO = {
  eyebrow: 'Conversion systems architect for small businesses · EU',
  headline: 'Quotes, leads and inbox. You approve before anything sends.',
  subline:
    'I automate quote flows, lead qualification and inbox triage for Dutch small businesses. The system collects the right inputs and prepares the next step.',
  hitlLine: 'The system proposes. You decide. Nothing customer-facing sends without your click.',
  dualBrandLine:
    'QuietForge sells the system. FlexGrafik is where it was built — owner-operated lab in the Netherlands, not a client case.',
  beats: {
    problem: {
      label: 'Problem',
      text: 'Manual quotes, inbox chaos, no pipeline.',
    },
    system: {
      label: 'The fix',
      text: 'Qualify → route → approve before send.',
    },
    effect: {
      label: 'Effect',
      text: 'Fewer missed leads. Less admin. You decide.',
    },
  },
  proofStrip:
    'QuietForge implements. You approve. FlexGrafik is the reference business and build lab.',
  proofLine: 'Hours given back · you approve · only client-verified numbers',
  proofChip: 'Human-reviewed · security-scanned · gated by you',
  microTrust:
    'Built and tested on FlexGrafik. Client hours publish only after the client verifies them.',
  primaryCta: 'Book a scan',
  primaryCtaMeta: `from ${formatEuro(PRICING_NUMBERS.scanFrom)} excl. VAT · credited 30d`,
  secondaryCta: 'See the proof',
  secondaryHref: '/proof/',
  wizardCta: 'Try the wizard (2 min)',
  wizardHref: 'https://zzpackage.flexgrafik.nl/',
  whatsappCta: 'Ask on WhatsApp',
  proofVisual: {
    src: '/gratka/agent-cards.svg',
    alt: 'Agent OS fixed roles and human review gate',
    caption: 'Fixed roles and human review gate — sanitized reference evidence',
  },
} as const;

export const PUBLIC_OFFER = {
  scanName: 'Hours Engine Scan',
  scanPrice: `from ${formatEuro(PRICING_NUMBERS.scanFrom)} excl. VAT`,
  scanNote:
    'Hours €149 · Both-lanes €290 · Decision €490. You pick depth of evidence. Credited 30 days.',
  scanForWho: 'Not sure what to automate first — we measure from your files. No invented euro.',
  /** Build — no fixed price (Commander decision 2026-10-30): priced after the scan. */
  buildPrice: 'Priced after the scan',
  buildPriceNote:
    'No fixed price. The scan shows what your company needs; the build is quoted from that result.',
  buildForWho: 'One clear bottleneck — quote flow, inbox or lead hand-off.',
  paymentTerms:
    'Scan: 100% upfront. Build: quoted after the scan; 50/50 — final 50% invoiced only after it runs in your production.',
  alwaysIncluded: [
    'Independent code review',
    'Secret and dependency scans',
    'Tests before release',
    'Documentation and handover',
    'Your repository from day one',
    '30 days post-launch support',
  ],
} as const;

export const WEBSITE_ONLY_EXCEPTION =
  'If you only need a brochure website with no qualification or automation, this is not the right fit — and I will tell you before you spend money.';

export const SITE_GOAL =
  'Can this person design and deploy a system that improves my business?';

export const CTAS = {
  bookAutomationMap: 'Book a scan',
  seeSystems: 'Explore the systems',
  seeResults: 'See the proof',
} as const;

export const ABOUT = {
  metaTitle: 'About Norbert — Conversion Systems Architect',
  heroTitle: 'Norbert — Conversion Systems Architect for small businesses.',
  heroIntro:
    'I design and deploy supervised conversion and operations systems — from quotes, through orders, to inbox and reporting. Not a programmer for hire, not the AI guy, not an agency.',
  storyTitle: 'My story — built from need, not theory.',
  storyBody: [
    'I started from zero. No programming background, no courses, no mentor — one thing only: the desperate need to save my own company. When the tools I needed did not exist or cost too much, I decided to build them. With AI as a partner I learned to build — and today I control the AI, not the other way around.',
    'For three years I learned by building connected systems for my own business: from a shop configurator to a mobile game to an owner cockpit. Those working patterns are now being extracted into a governed platform direction. Finishing things is my identity, not a resolution.',
    'The most expensive lesson, and the most honest one: a working system is not the same as paying clients. FlexGrafik is the owner-operated business and build laboratory where these systems were exercised. That makes the boundary clear: the lab proves what I built, not what an external QuietForge client achieved.',
  ],
  buildTitle: 'What I build',
  buildPillars: [
    {
      title: 'Company Brains',
      body: 'The central nervous system of your company — structured knowledge that ends information chaos and that AI can reliably use.',
    },
    {
      title: 'Agentic engineering & orchestration',
      body: 'Not rigid scripts: multi-agent systems that carry whole workflows, with AI as the execution layer I orchestrate.',
    },
    {
      title: 'Self-improvement with a human in the loop',
      body: 'Systems that evolve in closed feedback loops — the agent researches and proposes, you click.',
    },
  ],
  deliverTitle: 'How I deliver — AI-assisted engineering, not vibe coding',
  deliverPoints: [
    {
      title: 'Security as standard',
      body: 'Server-side authentication, row-level security, dependency audits before every deploy.',
      href: '/security/#authorization',
    },
    {
      title: 'Zero leaks',
      body: 'Secrets scanned on every release — your API keys stay yours.',
      href: '/security/#secrets',
    },
    {
      title: 'Verifiable quality',
      body: 'Independent human code review, logging, monitoring, snapshot and rollback on every release.',
      href: '/security/#review',
    },
  ],
  currencyTitle: 'What you receive — my currency',
  currencyPoints: [
    'Hours given back — measured, not asserted.',
    'Nerves removed: errors caught before they reach your customers.',
    'Money: measured hours ranked — never euro invented from a crawl or a wait.',
    'Full control and ownership — your repo from day one, README and handover included. Replaceable by design.',
    'Maintenance that earns its keep — I earn when it works, not when it breaks.',
  ],
  numbersTitle: 'In numbers',
  numbers: [
    { value: '30', label: 'trades — I see the patterns between them' },
    { value: 'Build → platform', label: 'working business patterns extracted into a governed core' },
    { value: 'EN · PL · NL', label: 'spoken EN/PL · written NL (email)' },
  ],
  offClockTitle: 'Off the clock',
  offClockBody:
    'Weightlifting teaches progression — small loads added systematically. Tennis is tactics under pressure. Cycling is endurance, and where architecture ideas arrive. Psychology is why clients hesitate and what builds trust. Reading is patterns, read like an engineer: structures worth looping.',
  labTitle: 'The lab — where it started',
  labBody:
    'FlexGrafik is an owner-operated reference business and build laboratory. Its public surfaces are available to test, but it is not an external client case and does not replace verified QuietForge customer proof.',
  labStatus: 'OWNER-OPERATED REFERENCE · BUILD LABORATORY',
  labLinkLabel: 'Explore the Builder\'s Lab →',
  ctaTitle: 'Let’s find what’s worth automating.',
  kvk: 'KVK 89057554',
} as const;

/** Three buyer pains — home systems lead (SMB Clarity audit §6.2). */
export const HOME_SYSTEMS_PAINS = [
  'Quotes stuck in email ping-pong.',
  'Inbox eating the first hour of your day.',
  'Website traffic that never becomes a qualified lead.',
] as const;

export const FOOTER = {
  tagline: 'Systems that give you back your time.',
  trustLine: 'Rotterdam, Netherlands · KVK 89057554 · Service in EN and NL',
  portfolioPrompt: 'This site runs on its own integrated platform.',
  portfolioLink: "Builder's Lab →",
  portfolioHref: '/lab/',
} as const;

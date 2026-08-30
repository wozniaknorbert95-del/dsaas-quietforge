// ============================================================================
// CONVERSION COPY — hero, positioning, offer, reference program (binding strings).
// Source: docs/strategy/marketing-strategy.md + inspiracja pro.md BLOK 2
// ============================================================================

import { PRICING_NUMBERS, formatEuro } from '@/content/pricing';

export const POSITIONING = {
  label: 'Conversion systems architect for small businesses',
  antiPositioning: 'Not a programmer for hire. Not an agency. Not “the AI guy”.',
} as const;

export const HERO = {
  eyebrow: 'Conversion systems architect for small businesses · EU',
  headline: 'Systems that give you back your time.',
  subline:
    'Quotes, orders, inbox, reporting — rebuilt as self-improving systems that work 24/7 and propose their own upgrades. Built at AI speed, delivered with engineering discipline — nothing goes live without your approval.',
  dualBrandLine: 'QuietForge implements. You approve. FlexGrafik is a paused lab.',
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
  proofStrip: 'Hours given back · you approve · counter starts at zero',
  proofLine: 'Hours given back · you approve · counter starts at zero',
  proofChip: 'Human-reviewed · security-scanned · gated by you',
  microTrust:
    'I build at AI speed and deliver with engineering discipline. FlexGrafik is a paused lab, not a client proof.',
  primaryCta: 'Book a scan',
  primaryCtaMeta: `${formatEuro(PRICING_NUMBERS.discovery)} · credited · 90 min`,
  secondaryCta: 'See the systems',
  secondaryHref: '/systems/',
  wizardCta: 'Try the wizard (2 min)',
  wizardHref: 'https://zzpackage.flexgrafik.nl/',
  whatsappCta: 'Ask on WhatsApp',
  proofVisual: {
    src: '/gratka/jadzia-commander-home.png',
    alt: 'COI Commander Start — live ops cockpit on FlexGrafik',
    caption: 'Live ops cockpit — pick one action; you approve',
  },
} as const;

export const PUBLIC_OFFER = {
  scanName: 'Automation Scan',
  scanPrice: formatEuro(PRICING_NUMBERS.discovery),
  scanNote: '90 minutes. The report is yours. Credited toward implementation.',
  implementationName: 'Implementation',
  implementationPrice: `from ${formatEuro(PRICING_NUMBERS.implementationFrom)}`,
  implementationNote: 'Fixed scope, 2–4 weeks, 1–3 modules.',
  maintenanceName: 'Maintenance',
  maintenancePrice: `from ${formatEuro(PRICING_NUMBERS.maintenanceFrom)}/mo`,
  maintenanceNote: 'Monitoring, fixes, one optimisation per month. Cancel monthly.',
  /** Build variants — oferty v1 (Oferta B). Scale = most chosen. */
  buildVariants: [
    {
      name: 'Core',
      price: formatEuro(PRICING_NUMBERS.buildEssential),
      what: '1 core workflow end-to-end (e.g. quote → order, or inbox triage)',
      timeline: '2–3 weeks',
      gates: 'at test & at live',
      mostChosen: false,
    },
    {
      name: 'Scale',
      price: formatEuro(PRICING_NUMBERS.buildSystem),
      what: '2–3 connected modules + owner dashboard',
      timeline: '3–4 weeks',
      gates: 'at architecture, test & live',
      mostChosen: true,
    },
    {
      name: 'Command',
      price: formatEuro(PRICING_NUMBERS.buildAutonomous),
      what: 'System + custom AI agent with approval gates + company-brain foundation',
      timeline: '5–6 weeks',
      gates: 'at architecture, test & live + agent scope',
      mostChosen: false,
    },
  ],
  /** Care variants — oferty v1 (Oferta C). Grow = most chosen. Monthly cancellable. */
  careVariants: [
    {
      name: 'Keep',
      price: `${formatEuro(PRICING_NUMBERS.care)}/mo`,
      mostChosen: false,
      features: ['Monitoring & health checks', 'Fixes <48h business days', 'Monthly report (hours · €)'],
    },
    {
      name: 'Grow',
      price: `${formatEuro(PRICING_NUMBERS.grow)}/mo`,
      mostChosen: true,
      features: ['Everything in Keep', '1 improvement per month', 'Priority response', 'Quarterly strategy review'],
    },
    {
      name: 'Unlock',
      price: `${formatEuro(PRICING_NUMBERS.autonomy)}/mo`,
      mostChosen: false,
      features: ['Everything in Grow', 'Agent-researched upgrade proposals (you approve)'],
    },
  ],
  paymentTerms:
    'Scan: 100% upfront. Build: 50/50 — final 50% invoiced only after it runs in your production. Care: monthly, cancellable at month-end.',
  alwaysIncluded: [
    'Independent code review',
    'Secret and dependency scans',
    'Tests before release',
    'Documentation and handover',
    'Your repository from day one',
    '30 days post-launch support',
  ],
} as const;

/** Reference program — marketing v1 §6. Max 5 firms, then closed. */
export const REFERENCE_PROGRAM = {
  heading: 'Proof starts at zero — and we’re opening five doors.',
  lead:
    'Five reference spots this quarter: the full Automation Scan (€690 value) at €0–€345, in exchange for publishing the measured results. After five, the program closes.',
  terms: [
    'Before/after numbers (hours × €40/h) published in a case study',
    'One named reference sentence + consent to name your industry',
    'A 30-minute case-study conversation after the build',
  ],
  closing: 'Maximum five firms. Priority: webshops and accounting offices. After five — closed.',
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
  metaTitle: 'About — architect of autonomous operating systems',
  heroTitle: 'Norbert — architect of autonomous operating systems for small companies.',
  heroIntro:
    'I design and deploy autonomous operating systems — from quotes, through orders, to inbox and reporting. Not a programmer for hire, not the AI guy, not an agency.',
  storyTitle: 'My story — built from need, not theory.',
  storyBody: [
    'I started from zero. No programming background, no courses, no mentor — one thing only: the desperate need to save my own company. When the tools I needed did not exist or cost too much, I decided to build them. With AI as a partner I learned to build — and today I control the AI, not the other way around.',
    'For three years I learned on my own repositories and built a complete platform — eight of them, each from scratch: from a shop configurator to a mobile game to an owner cockpit. Today those eight repos become one integrated platform. Finishing things is my identity, not a resolution.',
    'The most expensive lesson, and the most honest one: a working system is not the same as paying clients. FlexGrafik is a paused lab; the systems still run as heritage. That lesson makes me a better advisor than any theorist: I know what a system gives — and what it does not.',
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
    'Money: every recommendation ranked by payback.',
    'Full control and ownership — your repo from day one, README and handover included. Replaceable by design.',
    'Maintenance that earns its keep — I earn when it works, not when it breaks.',
  ],
  numbersTitle: 'In numbers',
  numbers: [
    { value: '30', label: 'trades — I speak your industry’s language and see patterns between them' },
    { value: '8 → 1', label: 'repositories rebuilt into one integrated platform' },
    { value: 'EN · PL · NL-basic', label: 'languages spoken by your industry' },
  ],
  offClockTitle: 'Off the clock',
  offClockBody:
    'Weightlifting teaches progression — small loads added systematically. Tennis is tactics under pressure. Cycling is endurance, and where architecture ideas arrive. Psychology is why clients hesitate and what builds trust. Reading is patterns, read like an engineer: structures worth looping.',
  labTitle: 'The lab — where it started',
  ctaTitle: 'Let’s find what’s worth automating.',
  kvk: 'KVK 89057554',
} as const;

export const FOOTER = {
  tagline: 'Systems that give you back your time.',
  portfolioPrompt: 'This site runs on its own integrated platform.',
  portfolioLink: 'Approach →',
  portfolioHref: '/approach/',
  columnSolutions: 'Systems',
  columnCompany: 'Company',
  columnGetStarted: 'Get started',
  columnResources: 'Resources',
} as const;

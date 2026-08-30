// ============================================================================
// CONVERSION COPY — hero, positioning, objections (binding strings).
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

export const WHY_THIS_WORKS_PILLARS = [
  {
    title: 'Built on a live system, not a template.',
    description:
      'Every module is drawn from an ecosystem already running a real business — proven before it reaches you.',
  },
  {
    title: 'Delivered by an AI workforce.',
    description:
      "The heavy lifting runs on systems I built, not billable hours. That's why delivery is faster, leaner, and priced for a business your size.",
  },
  {
    title: 'You stay in control.',
    description:
      'Human-in-the-loop by design: nothing sends, publishes or deploys without your approval.',
  },
] as const;

export const OBJECTIONS = [
  {
    objection: 'Price',
    rebuttal:
      'The €690 scan is a filter, not a hidden cost — you keep the written report either way.',
  },
  {
    objection: 'Trust',
    rebuttal: 'Review, scans, approval gates, and your repo from day one — process you can inspect, not a live-proof slogan.',
  },
  {
    objection: 'Timing',
    rebuttal: 'First deploy in ~2 weeks vs typical 3-month agency cycles.',
  },
  {
    objection: 'Scope creep',
    rebuttal: 'The wizard scope-locks the brief before any code is written.',
  },
] as const;

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

/** Home sole deep proof — Jadzia Ops + Marketing Brain (site-map §3 v6.0). SSoT: jadzia-core MKT-BRAIN-PRO. */
export const JADZIA_SPEARHEAD = {
  eyebrow: 'live proof · operations',
  headline: 'Operations Command Layer — margin, leads and decisions under human lock.',
  body:
    'Jadzia is the live ops cockpit on FlexGrafik: orders, leads, margin facts and a weekly owner brief. Marketing Brain runs in shadow — it proposes, you approve. Autonomy and auto ad spend are not offered.',
  bullets: [
    'One truth layer for orders, leads and marketing facts — not vanity dashboards.',
    'Marketing Brain LIVE in shadow (F0–F3): proposals with Telegram HITL before any Act.',
    'Circuit breakers pause risky scale when data is stale or the stack is degraded.',
    'Supervised content publish — nothing goes out without approval.',
  ],
  statusMeta: 'LIVE · Marketing Brain shadow (F0–F3) · HITL',
  primaryCta: 'See Jadzia proof',
  primaryHref: '/results/jadzia-coi/',
  secondaryCta: 'Book Automation Map',
  secondaryHref: '/book-discovery/',
  screenshot: {
    src: '/gratka/jadzia-commander-home.png',
    alt: 'COI Commander Start — queue actions and system map',
    caption:
      'Live COI Commander Start — pick one queued action; humans approve before Act.',
  },
} as const;

/** Home VCMS trust strip — site-map §3 v5.0 #5. */
export const VCMS_STRIP = {
  eyebrow: 'governance',
  title: 'VCMS keeps the system honest.',
  lead:
    'It scans repos and content, flags conflicts before deploy, and gives you a read-only assistant (KODA) so you can learn and control what the system knows.',
  bullets: [
    'Eight-repo scan with conflict detection before anything ships.',
    'KODA — read-only assistant to learn the operating map.',
    'Audit trail for clean handoffs and reviews.',
  ],
  cta: 'See governance proof →',
  href: '/results/owner-ecosystem/#why-vcms',
  visual: {
    src: '/gratka/vcms-dashboard.svg',
    alt: 'VCMS governance dashboard — repo scan and conflict status',
    caption: 'Conflicts: 0 target — governance command center.',
  },
} as const;

/** Wizard + Design Intake compact (demoted from flagship) — site-map §3 v5.0 #6. */
export const WIZARD_VISUALIZER = {
  eyebrow: 'cash engine · secondary',
  title: 'Wizard checkout live — Design Intake when the job is complex.',
  lead:
    'Self-service configurator with open pricing and Mollie checkout. For vehicle branding and custom jobs, supervised Design Intake (PARTIAL) turns a brief into visual direction before price.',
  wizardCta: 'Try the wizard (2 min)',
  wizardHref: 'https://zzpackage.flexgrafik.nl/wizard/',
  intakeCta: 'See Design Intake (PARTIAL)',
  intakeHref: '/solutions/sales-funnel/',
  wizardShot: {
    src: '/gratka/wizard-checkout.png',
    alt: 'Wizard Cash Engine checkout — live configurator',
    caption: 'Configure → see price → pay.',
  },
  intakeShot: {
    src: '/gratka/inspire/mockups.png',
    alt: 'Standard and Premium inspiration mockups — Design Intake PARTIAL',
    caption: 'Inspiration mockups — not print-ready finals. PARTIAL live path.',
  },
} as const;

/** @deprecated Prefer JADZIA_SPEARHEAD / WIZARD_VISUALIZER — kept for any legacy imports */
export const SPEARHEAD = {
  eyebrow: 'cash engine',
  headline: WIZARD_VISUALIZER.title,
  body: WIZARD_VISUALIZER.lead,
  bullets: [
    'Live on zzpackage.flexgrafik.nl — try checkout in two minutes.',
    'Optional Design Intake — brief → Standard/Premium direction → offerte / 48h quote (PARTIAL).',
    'Same stack Quietforge deploys for SMB clients — human approval on critical steps.',
  ],
  primaryCta: WIZARD_VISUALIZER.wizardCta,
  primaryHref: WIZARD_VISUALIZER.wizardHref,
  secondaryCta: WIZARD_VISUALIZER.intakeCta,
  secondaryHref: WIZARD_VISUALIZER.intakeHref,
  screenshot: WIZARD_VISUALIZER.wizardShot,
} as const;

/** Home WhyItWorks — site-map §3 v4.0 #5 (method + safety + objections). */
export const WHY_IT_WORKS = {
  eyebrow: 'why it works',
  title: 'A method, not a magic trick.',
  lead:
    'Every project runs through the same workflow I use for my own business — clarity first, safety by design, no lock-in. You always know what happens next and where your approval is required.',
  dogfoodNote:
    'The same workflow runs my own business in production — not a process invented for the brochure.',
  safetyTitle: 'Safe enough to hand your inbox to.',
  safetyLead:
    "Built to survive a small business owner's worst week — and a regulator's question.",
  trustCta: 'See full Trust & Safety details →',
} as const;

export const FINAL_CTA = {
  title: 'Start with clarity, not a sales pitch.',
  lead:
    'Book a paid Automation Map. In 60–90 minutes we find your two or three biggest time-and-money leaks, show the ROI, and recommend the right first step. The fee is credited toward your project — and if there is nothing worth automating, you owe nothing further and keep the document.',
  sampleLabel: 'See a sample Automation Map ↓',
  architectureHint: 'Want the full picture first?',
  architectureCta: 'See full architecture →',
} as const;

export const PRICING_SECTION = {
  eyebrow: 'pricing',
  title: 'Start with a paid Automation Map.',
  lead: 'Then choose a build that fits the size of the problem — not the size of a retainer.',
  mostPopular: 'Most popular',
} as const;

export const CTAS = {
  bookAutomationMap: 'Book a scan',
  seeSystems: 'Explore the systems',
  seeResults: 'See the proof',
} as const;

/** GTM Faza 0 — dual-brand band (01-two-brand-model, 05-content-pillars P3). */
export const DUAL_BRAND = {
  eyebrow: 'two brands one stack',
  headline: 'Quietforge sells the system. FlexGrafik runs it live.',
  lead:
    'Two names, one operating reality — no demo theatre, no print pitch on this site.',
  quietforge: {
    brand: 'Quietforge',
    role: 'Deploy & sell B2B',
    body:
      'Conversion Systems Architect for NL SMB — Automation Map first, then scoped builds with human approval on every critical step.',
    cta: 'Book Automation Map',
    href: '/book-discovery/',
  },
  flexgrafik: {
    brand: 'FlexGrafik',
    role: 'Live proof',
    body:
      'My Netherlands-registered print and design company — wizard, inbox and governance run here before any client deploy.',
    cta: 'See live systems',
    href: '/results/',
  },
} as const;

/** GTM Faza 0 — Featured strip mirror for LinkedIn Featured (02-channel-architecture). */
export const FEATURED_STRIP = {
  eyebrow: 'three paths',
  headline: 'Three paths — same stack I run daily.',
  cards: [
    {
      id: 'map',
      title: `Book Automation Map — ${formatEuro(PRICING_NUMBERS.discovery)}`,
      description:
        '60–90 min session · credited toward your build · you keep the document.',
      href: '/book-discovery/',
      analyticsLocation: 'featured_1',
      analyticsEvent: 'cta_book_map_click' as const,
    },
    {
      id: 'results',
      title: 'Live systems on FlexGrafik',
      description:
        'Wizard checkout, Design Intake proof, inbox automation and governance — live on my company.',
      href: '/results/',
      analyticsLocation: 'featured_2',
      analyticsEvent: 'cta_results_click' as const,
    },
    {
      id: 'process',
      title: 'How it works',
      description:
        'Map → Architect → Build → Verify → Handover — process safety before code.',
      href: '/how-it-works/',
      analyticsLocation: 'featured_3',
      analyticsEvent: 'cta_how_it_works_click' as const,
    },
  ],
} as const;

export const ABOUT = {
  metaTitle: 'About — architect of autonomous operating systems',
  heroTitle: 'Norbert — architect of autonomous operating systems for small companies.',
  heroIntro:
    'I design and deploy autonomous operating systems — from quotes, through orders, to inbox and reporting. Not a programmer for hire, not the AI guy, not an agency.',
  storyTitle: 'My story — built from need, not theory.',
  storyBody: [
    'I started from zero. No programming background, no courses, no mentor — one thing only: the desperate need to save my own company. When the tools I needed did not exist or cost too much, I decided to build them. With AI as a partner I learned to build — and today I control the AI, not the other way around.',
    'For three years I built in production, on a live business — eight repositories, each from scratch: from a shop configurator to a mobile game to an owner cockpit. Today those eight repos become one integrated platform. Finishing things is my identity, not a resolution.',
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
    { value: '3', label: 'years running systems in production on my own company' },
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
  portfolioLink: 'How we work →',
  portfolioHref: '/approach/',
  columnSolutions: 'Systems',
  columnCompany: 'Company',
  columnGetStarted: 'Get started',
  columnResources: 'Resources',
} as const;

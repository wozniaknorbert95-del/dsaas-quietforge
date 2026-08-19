// ============================================================================
// CONVERSION COPY — hero, positioning, objections (binding strings).
// Source: docs/strategy/marketing-strategy.md + inspiracja pro.md BLOK 2
// ============================================================================

import { PRICING_NUMBERS, formatEuro } from '@/content/pricing';

export const POSITIONING = {
  label: 'System builder for small businesses',
  antiPositioning: 'Not a programmer for hire. Not an agency. Not “the AI guy”.',
} as const;

export const HERO = {
  eyebrow: 'System builder for small businesses · EU',
  headline: 'Systems that give you back your time.',
  subline:
    'Quotes, orders, inbox and reporting — rebuilt as managed systems. AI speed, engineering discipline, nothing live without your approval.',
  dualBrandLine: 'QuietForge implements. You approve. FlexGrafik is a paused lab.',
  beats: {
    problem: {
      label: 'Problem',
      text: 'Manual quotes, inbox chaos, no pipeline.',
    },
    system: {
      label: 'System',
      text: 'Qualify → route → approve before send.',
    },
    effect: {
      label: 'Effect',
      text: 'Fewer missed leads. Less admin. You decide.',
    },
  },
  proofStrip: 'Hours given back · you approve · counter starts at zero',
  proofLine: 'Hours given back · you approve · counter starts at zero',
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
  alwaysIncluded: [
    'Independent code review',
    'Secret and dependency scans',
    'Tests before release',
    'Documentation and handover',
    'Your repository from day one',
  ],
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
  seeSystems: 'See the systems',
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
  metaTitle: 'About — system builder for small businesses',
  heroTitle: 'Norbert · system builder',
  heroIntro:
    'I build operating systems for small companies — from quotes, through orders, to inbox and reports. I build at AI speed and deliver with engineering discipline: human review, security scans, approval gates, documentation. My currency is hours, stress and money given back.',
  storyTitle: 'The lab is paused. The practice is QuietForge.',
  storyBody:
    'FlexGrafik was the owner-operated lab where the stack grew up. It is paused as a market offer. The lesson: a working system is not the same as paying clients. QuietForge implements company operating systems for firms of 1–15 people, with the code in your repo from day one.',
  moatTitle: 'What this is',
  moatPillars: [
    {
      title: 'AI speed, engineering discipline',
      body: 'Build with agents. Deliver with review, scans, gates and docs. Process, not adjectives.',
    },
    {
      title: 'You stay the gate',
      body: 'Nothing customer-facing goes live without your approval. I earn when it works.',
    },
    {
      title: 'Replaceable by design',
      body: 'Your repository from day one. Handover is part of the product, not an extra.',
    },
  ],
  whyTitle: 'How I work',
  whyBody:
    'You get the kind of architecture usually reserved for big budgets — designed around how your work really flows, at a price a small business understands, with full control over what the system does.',
  principlesTitle: 'How I work',
  principles: [
    'Outcome first. I measure success in your time saved and clients won, not features shipped.',
    'Built to last. Lean, maintainable systems — no bloat, no lock-in.',
    'You decide. Nothing happens without your approval.',
    'Honest numbers. Clear pricing, clear ROI, no surprises.',
  ],
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

import { metrics } from '@/content/proof';
import { EXTERNAL, ROUTES } from '@/lib/constants';

export type LabProofTier = 'PROVEN' | 'DEMO' | 'PLANNED';
export type LabReadiness = 'LIVE' | 'PARTIAL' | 'PLANNED' | 'TENANT-READY CORE (POC)';
export type LabAvailability = 'verified-public' | 'private' | 'planned';

export interface LabLink {
  label: string;
  href?: string;
  kind: 'live-demo' | 'internal-route' | 'fallback';
  availability: LabAvailability;
  note: string;
  external?: boolean;
}

export interface LabMilestone {
  id: string;
  sequence: string;
  title: string;
  eyebrow: string;
  tenant: string;
  status: string;
  readiness: LabReadiness;
  proofTier: LabProofTier;
  evidenceClass: string;
  problem: string;
  built: string;
  effect: string;
  learned: string;
  notProven: string;
  ownership: string;
  reviewed: string;
  links: readonly LabLink[];
}

export const LAB_PAGE = {
  eyebrow: "Builder's Lab",
  title: 'I built this before I offered it.',
  lead:
    'A live owner-operated reference business and build laboratory. Follow a connected customer path, keep owner control, and see how hours stop leaking into manual back-and-forth.',
  primaryCta: 'Book a scan',
  referenceCta: 'Visit the FlexGrafik reference business',
  honestyTitle: 'Read this before you test anything',
  honesty: [
    {
      title: 'FlexGrafik business',
      body: 'An independent owner-operated business with public products and customer-facing paths.',
    },
    {
      title: 'FlexGrafik lab',
      body: 'The environment where these system patterns were built, connected and exercised.',
    },
    {
      title: 'QuietForge',
      body: 'The commercial implementation business and Tenant 1 of the platform model.',
    },
    {
      title: 'Client proof',
      body: 'A separate category. FlexGrafik does not replace verified customer results.',
    },
  ],
  provesTitle: 'What this proves for your business',
  proves: [
    {
      title: 'Complete path',
      body: 'A buyer can move from entry to a clear next action instead of stopping at a polished screen — less manual quote ping-pong.',
    },
    {
      title: 'Connected handoffs',
      body: 'Portal, lead capture, design intake, Wizard, payment and operations pass work forward as one pattern — fewer silos and lost threads.',
    },
    {
      title: 'You stay in control',
      body: 'Approval boundaries, testing, security checks and handover are part of the build — automation without silent decisions.',
    },
  ],
  timelineTitle: 'From one working surface to one governed platform',
  timelineLead:
    'Seven stages. Each has a public effect, a proof boundary and a next lesson. The last stage is one platform project — not three products. Nothing here is an external client case.',
  testBenchTitle: 'Test the public surfaces',
  testBenchLead: 'Start with the journey that matters. Private operations stay documented without exposing tenant data.',
  connectionsTitle: 'How the pieces connect',
  platformTitle: 'The platform chapter',
  platformLead:
    'Extracted from one working business. Tenant-ready core (POC) — not a public multi-tenant SaaS product.',
  ownershipTitle: 'Ownership and handover',
  ownershipLead: 'A public reference is not a free product. A client receives the agreed implementation, repository access and handover under contract.',
} as const;

export const LAB_EVIDENCE_POLICY = {
  owner: 'Norbert Wozniak',
  privacy: 'Public cards exclude credentials, tenant data, customer records and internal hosts.',
  review: 'Review before any public promotion or platform status change.',
  publicRule: 'A live surface proves observable behaviour, not client ROI or commercial traction.',
} as const;

export const LAB_MILESTONES: readonly LabMilestone[] = [
  {
    id: 'portal',
    sequence: '01',
    title: 'FlexGrafik Portal',
    eyebrow: 'Discover',
    tenant: 'FlexGrafik reference business',
    status: 'PROVEN IN THE LAB',
    readiness: 'PARTIAL',
    proofTier: 'PROVEN',
    evidenceClass: 'PUBLIC LIVE SURFACE',
    problem: 'A specialist business needed one trustworthy front door instead of disconnected pages and contact paths.',
    built: 'A public business portal with clear routes to products, the Wizard, the game and design intake.',
    effect: 'A visitor can understand the offer and choose a next action without starting with a manual conversation.',
    learned: 'A portal is useful when every surface hands the visitor to the next system instead of becoming another silo.',
    notProven: 'The generic supervised chat is not an end-to-end qualification agent and does not prove QuietForge client results.',
    ownership: 'FlexGrafik brand and customer surface; not a QuietForge client tenant.',
    reviewed: '2026-09-05',
    links: [
      {
        label: 'Open the portal',
        href: EXTERNAL.flexgrafikPortal,
        kind: 'live-demo',
        availability: 'verified-public',
        note: 'Public FlexGrafik business surface.',
        external: true,
      },
    ],
  },
  {
    id: 'commerce',
    sequence: '02',
    title: 'ZZPackage Commerce Surface',
    eyebrow: 'Configure',
    tenant: 'FlexGrafik reference business',
    status: 'PROVEN IN THE LAB',
    readiness: 'LIVE',
    proofTier: 'PROVEN',
    evidenceClass: 'PUBLIC LIVE SURFACE',
    problem: 'Branding buyers needed a clearer path than a vague request for a quote.',
    built: 'A customer-facing commerce surface with product paths, pricing context and direct entry to the Wizard.',
    effect: 'The buyer can start with a defined product path before asking for manual help.',
    learned: 'A strong business system starts with a concrete decision, not a technology label.',
    notProven: 'Public traffic and product claims are not QuietForge commercial metrics.',
    ownership: 'FlexGrafik commerce property and operational workflow.',
    reviewed: '2026-09-05',
    links: [
      {
        label: 'Open ZZPackage',
        href: EXTERNAL.zzpackageWizard,
        kind: 'live-demo',
        availability: 'verified-public',
        note: 'Live commerce surface.',
        external: true,
      },
    ],
  },
  {
    id: 'wizard',
    sequence: '03',
    title: 'Wizard Cash Engine',
    eyebrow: 'Configure and buy',
    tenant: 'FlexGrafik reference business',
    status: 'PROVEN IN THE LAB',
    readiness: 'LIVE',
    proofTier: 'PROVEN',
    evidenceClass: 'PUBLIC LIVE SURFACE + LAB MEASUREMENT',
    problem: 'Repeated product questions, pricing and order handoff created avoidable manual work.',
    built: `A ${metrics.wizardSteps}-screen configurator with ${metrics.wizardBusinessSteps} business decision stages, open pricing and a Mollie payment path.`,
    effect: 'A buyer can configure an offer, see the rules-based price and continue without a manual quote thread.',
    learned: 'A guided flow can make complex choices clear without pretending every exception can be automated.',
    notProven: 'The recorded catalog and flow are lab evidence, not client traction, conversion or revenue proof.',
    ownership: 'FlexGrafik tenant-specific commerce implementation and reference pattern.',
    reviewed: '2026-09-05',
    links: [
      {
        label: 'Try the Wizard',
        href: EXTERNAL.zzpackageWizardPath,
        kind: 'live-demo',
        availability: 'verified-public',
        note: `${metrics.wizardSteps} UI screens · ${metrics.wizardBusinessSteps} business stages.`,
        external: true,
      },
    ],
  },
  {
    id: 'game',
    sequence: '04',
    title: 'Bouwplaats Chaos Lead Game',
    eyebrow: 'Play and qualify',
    tenant: 'FlexGrafik reference business',
    status: 'PROVEN IN THE LAB',
    readiness: 'LIVE',
    proofTier: 'PROVEN',
    evidenceClass: 'PUBLIC LIVE SURFACE + LAB MEASUREMENT',
    problem: 'Cold attention needed a reason to continue before being asked for a commercial next step.',
    built: 'A browser game with a registration path, reward rules, seasonal ranking and a Wizard handoff pattern.',
    effect: 'An interaction can become a tracked handoff into the same configuration journey instead of ending as an anonymous click.',
    learned: 'Engagement is useful only when it earns the next business action and remains honest about the reward rules.',
    notProven: 'No lead count, conversion rate or revenue result is claimed from the game.',
    ownership: 'FlexGrafik acquisition surface and reward logic.',
    reviewed: '2026-09-05',
    links: [
      {
        label: 'Play the game',
        href: EXTERNAL.leadMagnetGame,
        kind: 'live-demo',
        availability: 'verified-public',
        note: 'Public game surface; the Wizard bridge is the relevant handoff.',
        external: true,
      },
    ],
  },
  {
    id: 'inspire',
    sequence: '05',
    title: 'FlexGrafik INSPIRE',
    eyebrow: 'Design intake',
    tenant: 'FlexGrafik reference business',
    status: 'PROVEN IN THE LAB',
    readiness: 'PARTIAL',
    proofTier: 'PROVEN',
    evidenceClass: 'PUBLIC LIVE SURFACE',
    problem: 'A vehicle-branding request needed context, direction and a human follow-up instead of a random image generator.',
    built: 'A supervised intake path that collects logo and vehicle context, proposes design directions and routes an offer request.',
    effect: 'A visitor can explain the situation and receive a structured direction before a human prepares the final quote.',
    learned: 'AI is more useful when it structures the brief and preserves the handoff instead of pretending to finish production.',
    notProven: 'The generated inspiration is not print-ready artwork and this path is not Wizard checkout.',
    ownership: 'FlexGrafik design-intake workflow and tenant-specific assets.',
    reviewed: '2026-09-05',
    links: [
      {
        label: 'Try the Design Agent',
        href: EXTERNAL.inspireDesignAgent,
        kind: 'live-demo',
        availability: 'verified-public',
        note: 'Supervised inspiration and quote-intake path.',
        external: true,
      },
    ],
  },
  {
    id: 'jadzia',
    sequence: '06',
    title: 'Jadzia Operations Command Layer',
    eyebrow: 'Operate',
    tenant: 'FlexGrafik reference business',
    status: 'PROVEN IN THE LAB',
    readiness: 'LIVE',
    proofTier: 'PROVEN',
    evidenceClass: 'LAB MEASUREMENT + PRIVATE REFERENCE',
    problem: 'Leads, orders, briefs and operational decisions needed a shared owner view with a deliberate approval boundary.',
    built: 'An operations command layer with a Commander cockpit, operational records, weekly brief drafts and human approval before consequential actions.',
    effect: 'The owner can see proposed next actions and decide what happens instead of relying on scattered memory.',
    learned: 'Operations become safer when proposals, approvals and limits are visible as part of the system.',
    notProven: 'Full autonomous COI and silent order execution are not offered as live capabilities.',
    ownership: 'Private operational reference; no public URL or customer data is exposed here.',
    reviewed: '2026-09-05',
    links: [
      {
        label: 'Private reference',
        kind: 'fallback',
        availability: 'private',
        note: 'Sanitized walkthrough available without exposing tenant operations.',
      },
    ],
  },
  {
    id: 'platform-build',
    sequence: '07',
    title: 'Governed tenant platform',
    eyebrow: 'Build the platform',
    tenant: 'Platform core · QuietForge Tenant 1',
    status: 'NEW ON THE PLATFORM',
    readiness: 'TENANT-READY CORE (POC)',
    proofTier: 'DEMO',
    evidenceClass: 'ARCHITECTURE + PRIVATE REFERENCE',
    problem:
      'Patterns proven in one business would spread chaos if copied without a governed boundary — more tools, more manual recovery, less owner control.',
    built:
      'One platform project: a supervised work surface for queue, approvals and cost; policy and evidence boundaries with a human stop on sensitive paths; QuietForge running as Tenant 1 on the commercial site.',
    effect:
      'Work stays inspectable and consequential actions wait for approval — the owner spends time deciding, not chasing silent automation or scattered status.',
    learned:
      'Surfaces and tenants are chapters of one build, not three products. A platform needs partitions, policies, evidence and ownership — not cloned repos.',
    notProven:
      'No universal production readiness, certification, anonymous Mission Control demo, or client-scale multi-tenant SaaS. FlexGrafik as Tenant 2 remains planned.',
    ownership:
      'Reusable platform core stays with QuietForge. QuietForge site is Tenant 1. FlexGrafik remains the reference business. Client delivery stays contract-scoped.',
    reviewed: '2026-09-16',
    links: [
      {
        label: 'Architecture chapter',
        href: '#platform',
        kind: 'internal-route',
        availability: 'verified-public',
        note: 'One platform project explained below — not a public SaaS product page.',
      },
      {
        label: 'Open QuietForge',
        href: ROUTES.home,
        kind: 'internal-route',
        availability: 'verified-public',
        note: 'Tenant 1 commercial surface.',
      },
      {
        label: 'Mission Control',
        kind: 'fallback',
        availability: 'private',
        note: 'Access-gated reference; not an anonymous public demo.',
      },
    ],
  },
] as const;

export const LAB_CONNECTIONS = [
  'Portal',
  'Game / Design Assistant',
  'Wizard',
  'Payment',
  'Operations',
  'Governance',
  'Platform',
] as const;

export const LAB_PLATFORM_FACTS = [
  {
    title: 'One operational truth per business',
    body: 'Each tenant keeps a governed operational record instead of status living in chat threads — fewer contradictory answers and less rework.',
  },
  {
    title: 'AI proposes. Rules decide. The record stays.',
    body: 'Models suggest next steps; governed rules decide; evidence is recorded. No silent actions that burn owner hours on cleanup.',
  },
  {
    title: 'Human stop on sensitive actions',
    body: 'Write, publish and release paths wait for an owner decision. Read-only views are not billed as manual work.',
  },
  {
    title: 'Your business context stays separate',
    body: 'QuietForge is Tenant 1. FlexGrafik is the planned Tenant 2. Brand, data and configuration stay partitioned from the reusable core.',
  },
] as const;

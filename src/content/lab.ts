import { metrics } from '@/content/proof';
import { EXTERNAL, FLEXGRAFIK_URL, ROUTES } from '@/lib/constants';

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
    'A live owner-operated reference business and build laboratory. Follow the path from customer-facing surfaces to a governed tenant platform.',
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
      title: 'Complete implementation',
      body: 'A business path can move from entry to action instead of stopping at a polished screen.',
    },
    {
      title: 'Connected systems',
      body: 'Portal, lead capture, design intake, Wizard, payment and operations work as connected patterns.',
    },
    {
      title: 'Governed delivery',
      body: 'Approval boundaries, testing, security checks, documentation and handover are part of the build.',
    },
  ],
  timelineTitle: 'From one working surface to a governed tenant platform',
  timelineLead: 'Every stage has a public effect, a proof boundary and a next lesson. Nothing here is presented as an external client case.',
  testBenchTitle: 'Test the public surfaces',
  testBenchLead: 'Start with the journey that matters. Private operations stay documented without exposing tenant data.',
  connectionsTitle: 'How the pieces connect',
  platformTitle: 'The platform chapter',
  platformLead: 'The reusable platform is being extracted from one working business. Its current public status is a tenant-ready core, not a universal production guarantee.',
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
    id: 'mission-control',
    sequence: '07',
    title: 'Agent OS UI / Mission Control',
    eyebrow: 'Govern the work',
    tenant: 'FlexGrafik reference infrastructure',
    status: 'NEW ON THE PLATFORM',
    readiness: 'PARTIAL',
    proofTier: 'DEMO',
    evidenceClass: 'PRIVATE REFERENCE',
    problem: 'Agent work needed a visible queue, approval history and cost boundary instead of an opaque run.',
    built: 'Mission Control presents tasks, approvals, history and cost for a supervised build workflow.',
    effect: 'The owner can inspect what is waiting, what was approved and what the workflow consumed.',
    learned: 'A control surface is part of a safe agent system, not an afterthought behind the model.',
    notProven: 'The current surface is access-gated and is not an anonymous public demo or public multi-tenant SaaS.',
    ownership: 'Reference infrastructure; access-controlled and separate from client data.',
    reviewed: '2026-09-05',
    links: [
      {
        label: 'Access-gated reference',
        kind: 'fallback',
        availability: 'private',
        note: 'The public surface requires access; use the sanitized walkthrough instead.',
      },
    ],
  },
  {
    id: 'platform',
    sequence: '08',
    title: 'Tenant Platform Core',
    eyebrow: 'Extract the platform',
    tenant: 'Platform core',
    status: 'NEW ON THE PLATFORM',
    readiness: 'TENANT-READY CORE (POC)',
    proofTier: 'PLANNED',
    evidenceClass: 'ARCHITECTURE ONLY',
    problem: 'Patterns built for one business needed a governed boundary before they could serve more than one tenant.',
    built: 'A platform direction with a tenant-scoped knowledge graph, policy evaluation, append-only ledgers and a human stop for sensitive actions.',
    effect: 'The reusable platform boundary can be discussed separately from tenant-specific brand, data and workflows.',
    learned: 'A platform is not a pile of copied tenant repos; it needs explicit partitions, policies, evidence and ownership boundaries.',
    notProven: 'This page does not claim universal production readiness, certification or public multi-tenant SaaS availability.',
    ownership: 'Reusable platform core; implementation status and licence boundary are controlled by QuietForge.',
    reviewed: '2026-09-05',
    links: [
      {
        label: 'Architecture chapter',
        href: '#platform',
        kind: 'internal-route',
        availability: 'verified-public',
        note: 'High-level explanation below; no private runtime configuration exposed.',
      },
    ],
  },
  {
    id: 'quietforge',
    sequence: '09',
    title: 'QuietForge Tenant',
    eyebrow: 'Deploy the implementation business',
    tenant: 'QuietForge · Tenant 1',
    status: 'NEW ON THE PLATFORM',
    readiness: 'PARTIAL',
    proofTier: 'PROVEN',
    evidenceClass: 'PUBLIC LIVE SURFACE',
    problem: 'The implementation business needed its own tenant context, offer, proof rules and conversion path.',
    built: 'QuietForge runs as the active commercial tenant and uses its own governed site, content and intake context.',
    effect: 'The platform is exercised on the business that sells implementation systems before a second tenant is introduced.',
    learned: 'Tenant separation must be visible in content, data, ownership and decision rights, not only in infrastructure.',
    notProven: 'FlexGrafik is the planned Tenant 2; client-scale multi-tenant readiness remains a separately governed milestone.',
    ownership: 'QuietForge tenant configuration and public portfolio; platform core remains separately governed.',
    reviewed: '2026-09-05',
    links: [
      {
        label: 'Open QuietForge',
        href: ROUTES.home,
        kind: 'internal-route',
        availability: 'verified-public',
        note: 'Current commercial implementation tenant.',
      },
      {
        label: 'Visit FlexGrafik',
        href: FLEXGRAFIK_URL,
        kind: 'live-demo',
        availability: 'verified-public',
        note: 'Planned second tenant reference business, currently linked as an independent business.',
        external: true,
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
  'Tenant Platform',
] as const;

export const LAB_PLATFORM_FACTS = [
  {
    title: 'Business Knowledge Graph',
    body: 'The platform direction treats a tenant-scoped knowledge graph as the canonical operational truth, with provenance and lifecycle states.',
  },
  {
    title: 'Model proposes. Policy evaluates. Ledger records.',
    body: 'Decision proposals are evaluated by governed policy and recorded as evidence instead of becoming silent actions.',
  },
  {
    title: 'Human stop on sensitive paths',
    body: 'Sensitive write, publish and release paths keep a human approval boundary. Read-only projections are not described as manual work.',
  },
  {
    title: 'Tenant boundary',
    body: 'QuietForge is Tenant 1. FlexGrafik is the planned Tenant 2. Brand, data and tenant-specific configuration remain separate from the reusable core.',
  },
] as const;

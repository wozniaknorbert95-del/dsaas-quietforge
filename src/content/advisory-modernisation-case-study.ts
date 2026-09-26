// Advisory firm modernisation case study — anonymised reference, in delivery.
// MR-16: no invented client outcomes; qualification-only assistant boundary.

import { ARTEFACTS, ROUTES } from '@/lib/constants';

export const ADVISORY_MODERNISATION_SLUG = 'advisory-modernisation' as const;

export const advisoryModernisationDisplayName =
  'Modernisation + AI assistant for an advisory firm';

export const advisoryCaseContextAnonymised =
  'Client anonymised throughout — described only as a Rotterdam accounting office. Outcomes will be reported once live; nothing is invented here.';

export const advisoryModernisationCaseMeta = {
  title: 'Case study — Advisory firm modernisation',
  description:
    'How a Rotterdam accounting office (anonymised) is modernising with web upgrade, a qualification-only AI assistant and human-approved content — with AVG layer. In delivery.',
  openGraphTitle: 'Case study — Advisory firm modernisation',
  openGraphDescription:
    'Web upgrade + qualification-only assistant + content engine. AVG layer specified. In delivery — no fabricated outcomes.',
  twitterDescription:
    'Qualification only — no tax advice. Staged delivery with AVG layer. In delivery.',
  ogAlt: 'Case study — Advisory firm modernisation',
} as const;

export const advisoryModernisationBeforeItems = [
  'Outdated site — strong offer, weak first impression',
  'Enquiries handled ad hoc — no structured lead capture',
  'Same qualifying questions asked by phone, repeatedly',
  'Content depends on one person — no approval pipeline',
  'No documented data-processing agreement for digital tools',
] as const;

export const advisoryModernisationAfterItems = [
  'Modern mobile-first site with structured enquiry pathways',
  'AI assistant qualifies intent — hands off to a human adviser',
  'Hard guardrail: qualification only, no tax advice',
  'Content engine: draft → human approve → publish',
  'AVG layer signed before live data processing begins',
] as const;

export type AdvisoryModernisationPillar = {
  title: string;
  items: readonly string[];
  highlight?: boolean;
};

export const advisoryModernisationPillars: readonly AdvisoryModernisationPillar[] = [
  {
    title: 'Web upgrade & lead capture',
    items: [
      'Mobile-first site aligned with professional advisory positioning',
      'Structured enquiry forms — not a generic contact box',
      'Architecture ready for an embedded qualification layer',
    ],
  },
  {
    title: 'Lead-qualifying AI assistant',
    highlight: true,
    items: [
      'Intent routing: new client, existing client, general topic',
      'Collects only what is needed to qualify — not tax records',
      'Cannot provide tax, legal or financial advice — enforced in design',
      'Human handoff with full context for the adviser',
    ],
  },
  {
    title: 'Human-approved content engine',
    items: [
      'AI-assisted drafts aligned with firm voice',
      'Every piece reviewed before publish — nothing auto-publishes',
      'Audit trail: who approved what, when — on request',
    ],
  },
] as const;

export type AdvisoryDeliveryPhase = {
  step: string;
  title: string;
  detail: string;
  highlight?: boolean;
};

export const advisoryModernisationDeliveryPhases: readonly AdvisoryDeliveryPhase[] = [
  {
    step: '01',
    title: 'Map & scope',
    detail: 'Hours Engine Scan, scope lock, AVG requirements. Gate: signed scope document.',
  },
  {
    step: '02',
    title: 'Web foundation',
    detail: 'Modern site, lead capture, staging review. Gate: client approves staging.',
  },
  {
    step: '03',
    title: 'Qualification assistant',
    detail: 'AI intake, no-tax-advice guardrails, UAT. Gate: assistant behaviour signed off.',
    highlight: true,
  },
  {
    step: '04',
    title: 'Content engine',
    detail: 'Draft → human approve → publish pipeline. Gate: first piece approved.',
  },
  {
    step: '05',
    title: 'Security & AVG',
    detail: 'Verwerkersovereenkomst, scoped access, EU hosting. Gate: AVG signed.',
  },
  {
    step: '06',
    title: 'Verify & handover',
    detail: 'UAT, README, optional care. Gate: client sign-off — go-live when ready.',
    highlight: true,
  },
] as const;

export const advisoryModernisationArchitectureAlt =
  'Staged delivery timeline: six phases with sign-off gates for advisory firm modernisation including web upgrade, qualification assistant and AVG layer';

export const advisoryModernisationArchitectureIntro =
  'Staged delivery — six phases. Sequential sign-off gates. No launch dates claimed — go-live when the client is ready. Download the timeline for a printable version to share internally.';

export const advisoryModernisationBuildDescription =
  'Three integrated systems being built across six delivery phases.';

export const advisoryModernisationStack = [
  'Next.js',
  'FastAPI',
  'LangGraph',
  'Tailwind',
  'EU VPS',
] as const;

export type AdvisorySafetyItem = {
  title: string;
  detail: string;
};

export const advisoryModernisationSafetyIntro =
  'For advisory firms, data handling is not optional. The AVG layer is specified before any live processing begins. This is process documentation — not legal advice.';

export const advisoryModernisationSafetyItems: readonly AdvisorySafetyItem[] = [
  { title: 'Human-in-the-loop', detail: 'Nothing publishes or deploys without your approval.' },
  { title: 'Service accounts', detail: 'Scoped permissions — no passwords over chat.' },
  { title: 'EU data', detail: 'Hosting and processing within the EU.' },
  { title: 'Data minimisation', detail: 'Assistant collects enquiry metadata, not client dossiers.' },
  { title: 'Logged & auditable', detail: 'Who did what, when — available on request.' },
  { title: 'No lock-in', detail: 'README + handover to any developer.' },
] as const;

export const advisoryModernisationSafetyPlaybook = {
  prefix: 'General playbook for all engagements:',
  label: 'How we keep your data safe (PDF) ↓',
  href: ARTEFACTS.dataSafetyPlaybook,
  suffix: 'Engagement-specific AVG detail in the downloadable sheet above.',
} as const;

export const advisoryModernisationHardBoundary = {
  eyebrow: 'Hard boundary',
  title: 'Qualification only — no tax advice',
  body:
    'The AI assistant routes and structures enquiries. It does not interpret legislation, access client filings or replace a qualified adviser. This boundary is enforced in system design — not buried in small print.',
} as const;

export const advisoryModernisationWebUpgradeBridge = {
  eyebrow: '// related solution',
  title: 'Web Upgrade — same delivery patterns',
  lead: 'Site modernisation and lead capture are part of the Quietforge ladder. See the Web Upgrade solution for scoped builds.',
  cta: 'Web Upgrade solution →',
  href: ROUTES.webUpgrade,
} as const;

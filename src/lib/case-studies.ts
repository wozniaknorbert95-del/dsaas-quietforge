import { ROUTES } from '@/lib/constants';
import type { CaseMeasurementKey, IntentId } from '@/content/ecosystem';
import { caseMeasurements } from '@/content/proof';
import { agentOsDisplayName } from '@/content/agent-os-case-study';
import { leadMagnetDisplayName } from '@/content/lead-magnet-case-study';
import { jadziaCoiDisplayName, JADZIA_COI_SLUG } from '@/content/jadzia-coi-case-study';
import { salesFunnelHubTitle } from '@/content/sales-funnel-case-study';
import { inboxKillerDisplayName } from '@/content/inbox-killer-case-study';
import { advisoryModernisationDisplayName } from '@/content/advisory-modernisation-case-study';
import { ownerEcosystemHubCard } from '@/content/owner-ecosystem';

export type CaseStatusLabel = 'LIVE' | 'PARTIAL' | 'PILOT' | 'DEMO' | 'PLANNED';

export interface CaseStudy {
  slug: string;
  number: string;
  title: string;
  meta: string;
  status: CaseStatusLabel;
  context: string;
  system: string;
  real: string;
  measurement: string;
  intents: IntentId[];
  manifestKey: CaseMeasurementKey;
  detailHref: string;
}

/** Display order: owner ecosystem + wizard first (LinkedIn / investor path) */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'owner-ecosystem',
    number: '01',
    title: ownerEcosystemHubCard.title,
    meta: ownerEcosystemHubCard.meta,
    status: 'LIVE',
    context: ownerEcosystemHubCard.context,
    system: ownerEcosystemHubCard.system,
    real: ownerEcosystemHubCard.real,
    measurement: caseMeasurements.ownerEcosystem.value ?? '',
    intents: ['order', 'calm'],
    manifestKey: 'ownerEcosystem',
    detailHref: ROUTES.resultsOwnerEcosystem,
  },
  {
    slug: JADZIA_COI_SLUG,
    number: '02',
    title: jadziaCoiDisplayName,
    meta: 'Operations Command Layer · ~93% spine LIVE',
    status: 'LIVE',
    context:
      'Running a print business on eight repos without an operating brain means orders, leads and ops live in separate tools — and WordPress edits stay risky.',
    system:
      'Operations Command Layer on EU VPS — Commander cockpit, jadzia.db spine (orders/leads/GA4/calendar), weekly HITL brief, supervised content publish, widget chat, WP SSH.',
    real: 'Operational spine LIVE — Commander, INT-002/004/009/010/011, weekly brief drafts, publish HITL. Full autonomous COI vision remains PARTIAL.',
    measurement: caseMeasurements.jadziaCoi.value ?? '',
    intents: ['time', 'calm', 'order', 'efficiency'],
    manifestKey: 'jadziaCoi',
    detailHref: ROUTES.resultsJadziaCoi,
  },
  {
    slug: 'sales-funnel',
    number: '03',
    title: salesFunnelHubTitle,
    meta: 'Wizard Cash Engine · + Design Intake PARTIAL',
    status: 'LIVE',
    context: 'My own sales funnel — the same "what do you charge?" questions, answered by the system.',
    system:
      'Wizard Cash Engine on zzpackage.flexgrafik.nl — 9 UI screens, open pricing, Mollie from €199, plus Complex Quote & Design Intake (INSPIRE) as a live supervised path (PARTIAL).',
    real: 'Checkout LIVE — configure → price → Mollie. Optional Design Intake → mockups → offerte request → 48h studio quote (PARTIAL; mockups ≠ print-ready; Wizard = internal fulfilment).',
    measurement: caseMeasurements.salesFunnel.value ?? '',
    intents: ['money', 'efficiency'],
    manifestKey: 'salesFunnel',
    detailHref: ROUTES.resultsSalesFunnel,
  },
  {
    slug: 'agent-orchestrator',
    number: '04',
    title: agentOsDisplayName,
    meta: 'Agent OS · jadzia-core · Flex-VCMS',
    status: 'LIVE',
    context:
      'A multi-repo stack needs named layers — not one generic “AI engine”. Engineering execution, business ops and governance must stay separable with human gates.',
    system:
      'Agent OS — 5-node LangGraph HITL on VPS. Sits alongside jadzia-core (ops) and Flex-VCMS (governance) — three named layers, one ecosystem.',
    real: 'Prod smoke PASS — HITL approve/reject/cancel, Langfuse costs, E2E handoff on disk. Guided implementation demo — not public SaaS.',
    measurement: caseMeasurements.agentOs.value ?? '',
    intents: ['time', 'efficiency', 'order'],
    manifestKey: 'agentOs',
    detailHref: ROUTES.resultsAgentOrchestrator,
  },
  {
    slug: 'lead-magnet',
    number: '05',
    title: leadMagnetDisplayName,
    meta: 'Gamified lead system · live',
    status: 'LIVE',
    context:
      'Dutch ZZP contractors ignore static forms. The brief: turn cold traffic into qualified wizard handoffs without a brochure-site feel.',
    system:
      'Discount + sticker → shirt → hoodie ladder → register gate → five acts → leaderboard season → coupon bridge into self-service quoting.',
    real: 'Live on app.flexgrafik.nl — full funnel instrumented in GA4.',
    measurement: caseMeasurements.leadMagnet.value ?? '',
    intents: ['money'],
    manifestKey: 'leadMagnet',
    detailHref: ROUTES.resultsLeadMagnet,
  },
  {
    slug: 'inbox-killer',
    number: '06',
    title: inboxKillerDisplayName,
    meta: 'Inbox Killer · B2B · live ops',
    status: 'LIVE',
    context:
      'Built against my own NL print-business stack. Classification and draft flow are demonstrated as a supervised test-environment process proof — same HITL architecture I deploy for clients.',
    system:
      'Reads mail via OAuth, classifies into lanes, drafts replies, and stops at a human approval gate before anything sends.',
    real: caseMeasurements.inboxKiller.value ?? '',
    measurement: caseMeasurements.inboxKiller.value ?? '',
    intents: ['time', 'calm'],
    manifestKey: 'inboxKiller',
    detailHref: ROUTES.resultsInboxKiller,
  },
  {
    slug: 'advisory-modernisation',
    number: '07',
    title: advisoryModernisationDisplayName,
    meta: 'Anonymised reference · in delivery',
    status: 'PARTIAL',
    context:
      'Scope designed for advisory-firm modernisation (anonymised reference brief) — same delivery patterns as my live stack.',
    system:
      'Site modernisation + a lead-qualifying AI assistant (qualification only, no tax advice) + a human-approved content engine, with a signed data-processing agreement.',
    real: 'Full scope designed, security & AVG layer specified, staged delivery.',
    measurement: caseMeasurements.advisory.value ?? '',
    intents: ['money', 'order'],
    manifestKey: 'advisory',
    detailHref: ROUTES.resultsAdvisoryModernisation,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

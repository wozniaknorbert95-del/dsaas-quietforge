// ============================================================================
// ECOSYSTEM MANIFEST — modules, repos, intents, home section order.
// Binding: docs/strategy/site-map.md
// Components MUST read module/intent/pain data from here — no hardcoded lists.
// ============================================================================

import { ROUTES } from '@/lib/constants';
import { JADZIA_COI_ROUTE } from '@/content/jadzia-coi';
import { MODULE_SHOWCASE } from '@/content/module-showcase';
import type { LosLayerId } from '@/content/los-architecture';

export type IntentId = 'time' | 'money' | 'order' | 'calm' | 'efficiency';

export type ScreenKey =
  | 'wizardCheckout'
  | 'leadMagnet'
  | 'leadMagnetGameOver'
  | 'leadMagnetLeaderboard'
  | 'inboxLanes'
  | 'auditLog'
  | 'agentCards'
  | 'workflowMap'
  | 'vcmsDashboard'
  | 'conflictReport'
  | 'portalAssistant'
  | 'adminDashboard'
  | 'inspireIntake'
  | 'inspireMockups'
  | 'inspireHandoff'
  | 'jadziaCommander'
  | 'jadziaDataHealth';

/** Keys into proof.ts → caseMeasurements */
export type CaseMeasurementKey =
  | 'inboxKiller'
  | 'agentOs'
  | 'salesFunnel'
  | 'leadMagnet'
  | 'advisory'
  | 'ownerEcosystem'
  | 'jadziaCoi'
  | 'whatsappPilot';

/** Maps case study slug → proof caseMeasurements key */
export const CASE_MEASUREMENT_KEYS: Record<string, CaseMeasurementKey> = {
  'inbox-killer': 'inboxKiller',
  'agent-orchestrator': 'agentOs',
  'sales-funnel': 'salesFunnel',
  'lead-magnet': 'leadMagnet',
  'advisory-modernisation': 'advisory',
  'owner-ecosystem': 'ownerEcosystem',
  'jadzia-coi': 'jadziaCoi',
  'whatsapp-discovery-pilot': 'whatsappPilot',
} as const;

export type VideoKey =
  | 'ecosystem'
  | 'inboxKiller'
  | 'wizard'
  | 'leadMagnet'
  | 'agentOs'
  | 'vcms'
  | 'founder';

export const INTENT_LEGEND: ReadonlyArray<{
  id: IntentId;
  /** Short chip label (toolbar) */
  shortLabel: string;
  /** Full label for title / aria */
  label: string;
  legend: string;
  cssVar: string;
  textClass: string;
}> = [
  {
    id: 'time',
    shortLabel: 'Time',
    label: 'Save time',
    legend: 'Saves your time',
    cssVar: 'var(--fx-time)',
    textClass: 'text-fx-time',
  },
  {
    id: 'money',
    shortLabel: 'Money',
    label: 'Earn more',
    legend: 'Raises revenue / profit',
    cssVar: 'var(--fx-money)',
    textClass: 'text-fx-money',
  },
  {
    id: 'calm',
    shortLabel: 'Calm',
    label: 'Less chaos and stress',
    legend: 'Reduces stress and chaos',
    cssVar: 'var(--fx-calm)',
    textClass: 'text-fx-calm',
  },
  {
    id: 'efficiency',
    shortLabel: 'Team',
    label: 'Raise team efficiency',
    legend: 'Increases team efficiency',
    cssVar: 'var(--fx-efficiency)',
    textClass: 'text-fx-efficiency',
  },
  {
    id: 'order',
    shortLabel: 'Order',
    label: 'Order systems and tech',
    legend: 'Orders systems and processes',
    cssVar: 'var(--fx-order)',
    textClass: 'text-fx-order',
  },
] as const;

export function getIntentMeta(id: IntentId) {
  const found = INTENT_LEGEND.find((i) => i.id === id);
  if (!found) throw new Error(`Unknown intent: ${id}`);
  return found;
}

export interface EcosystemModule {
  id: string;
  name: string;
  effect: string;
  intents: IntentId[];
  route: string;
  repoKey?: string;
  screenKey?: ScreenKey;
  videoKey?: VideoKey;
  spearhead?: boolean;
}

export const ECOSYSTEM_MODULES: readonly EcosystemModule[] = [
  {
    id: 'm1',
    name: 'Automation Map',
    effect: 'Before we build anything, we map what is worth automating and why.',
    intents: ['order', 'money', 'calm'],
    route: ROUTES.bookDiscovery,
    repoKey: 'flexgrafik-meta',
  },
  {
    id: 'm2',
    name: 'Sales Funnel & Wizard',
    effect: MODULE_SHOWCASE.zzpackage.effect,
    intents: ['money', 'efficiency'],
    route: ROUTES.resultsSalesFunnel,
    repoKey: 'zzpackage',
    screenKey: 'wizardCheckout',
    videoKey: 'wizard',
    spearhead: true,
  },
  {
    id: 'm3',
    name: 'Jadzia COI',
    effect: MODULE_SHOWCASE['jadzia-core'].effect,
    intents: ['time', 'calm', 'order', 'efficiency'],
    route: JADZIA_COI_ROUTE,
    repoKey: 'jadzia-core',
    screenKey: 'jadziaCommander',
  },
  {
    id: 'm4',
    name: 'Agent OS (Custom Agents)',
    effect: MODULE_SHOWCASE['agent-os'].effect,
    intents: ['time', 'efficiency'],
    route: ROUTES.resultsAgentOrchestrator,
    repoKey: 'agent-os',
    screenKey: 'agentCards',
    videoKey: 'agentOs',
  },
  {
    id: 'm5',
    name: 'VCMS (Governance Layer)',
    effect: MODULE_SHOWCASE['flex-vcms'].effect,
    intents: ['order', 'calm'],
    route: ROUTES.resultsOwnerEcosystemWhyVcms,
    repoKey: 'flex-vcms',
    screenKey: 'vcmsDashboard',
    videoKey: 'vcms',
  },
  {
    id: 'm6',
    name: 'Gamified lead system',
    effect: MODULE_SHOWCASE['app.flexgrafik.nl'].effect,
    intents: ['money'],
    route: ROUTES.resultsLeadMagnet,
    repoKey: 'app.flexgrafik.nl',
    screenKey: 'leadMagnet',
    videoKey: 'leadMagnet',
  },
  {
    id: 'm7',
    name: 'Mission Control',
    effect: MODULE_SHOWCASE['agent-os-ui'].effect,
    intents: ['order', 'efficiency'],
    route: ROUTES.trust,
    repoKey: 'agent-os-ui',
    screenKey: 'adminDashboard',
  },
  {
    id: 'm8',
    name: 'Trust Portal',
    effect: MODULE_SHOWCASE['flexgrafik-nl'].effect,
    intents: ['money', 'order'],
    route: ROUTES.webUpgrade,
    repoKey: 'flexgrafik-nl',
    screenKey: 'portalAssistant',
  },
] as const;

export interface EcosystemRepo {
  number: number;
  repoKey: string;
  outcomeLabel: string;
  role: string;
  statusNote?: string;
  /** De-jargonised short statusNote for home compact views. Falls back to `statusNote`. */
  homeStatusNote?: string;
  intents: IntentId[];
  losLayers: readonly LosLayerId[];
  screenKey?: ScreenKey;
  proofRoute: string;
  flagship?: boolean;
  /** Whether to show in IntentRouter (home + /solutions/). Default true. */
  homeVisible?: boolean;
}

export const ECOSYSTEM_REPOS: readonly EcosystemRepo[] = [
  {
    number: 1,
    repoKey: 'zzpackage',
    outcomeLabel: 'Quote, price and checkout in one guided flow',
    role: 'Wizard Cash Engine',
    intents: ['money', 'efficiency'],
    losLayers: ['sense', 'act'],
    screenKey: 'wizardCheckout',
    proofRoute: ROUTES.resultsSalesFunnel,
    flagship: true,
    homeVisible: true,
  },
  {
    number: 2,
    repoKey: 'app.flexgrafik.nl',
    outcomeLabel: 'Turn cold traffic into qualified handoffs',
    role: 'Lead magnet game',
    statusNote: 'LIVE: PWA · rewards · Wizard bridge · lead sync INT-004 — selective fit, not default after every Web Upgrade',
    homeStatusNote: 'Selective acquisition — play, reward, Wizard handoff · leads sync LIVE',
    intents: ['money'],
    losLayers: ['sense'],
    screenKey: 'leadMagnet',
    proofRoute: ROUTES.resultsLeadMagnet,
    homeVisible: true,
  },
  {
    number: 3,
    repoKey: 'jadzia-core',
    outcomeLabel: 'Know which leads, orders and ops need action',
    role: 'Operations Command Layer',
    statusNote:
      'LIVE: Commander cockpit · Marketing Brain shadow F0–F3 · orders INT-002 · weekly HITL brief · no Act without approval',
    homeStatusNote:
      'Ops cockpit + Marketing Brain shadow (F0–F3) — HITL before Act; autonomy not offered.',
    intents: ['time', 'calm', 'order', 'efficiency'],
    losLayers: ['think', 'act'],
    screenKey: 'jadziaCommander',
    proofRoute: JADZIA_COI_ROUTE,
    flagship: true,
    homeVisible: true,
  },
  {
    number: 4,
    repoKey: 'agent-os',
    outcomeLabel: 'Build and test changes through a fixed agent workflow',
    role: 'Agent OS',
    homeStatusNote: 'Supervised build steps — you approve before anything ships.',
    intents: ['time', 'efficiency'],
    losLayers: ['orchestrate', 'act'],
    screenKey: 'agentCards',
    proofRoute: ROUTES.resultsAgentOrchestrator,
    homeVisible: true,
  },
  {
    number: 5,
    repoKey: 'flex-vcms',
    outcomeLabel: 'Stop content and repo drift before deploy',
    role: 'Governance layer',
    statusNote: 'LIVE (~85%): 8-repo scan · conflict detection · KODA read-only assistant · audit trail',
    homeStatusNote: 'Catches drift before deploy — scan, conflicts, KODA helps you learn the system.',
    intents: ['order', 'calm'],
    losLayers: ['sense', 'guard'],
    screenKey: 'vcmsDashboard',
    proofRoute: ROUTES.resultsOwnerEcosystemWhyVcms,
    flagship: true,
    homeVisible: true,
  },
  {
    number: 6,
    repoKey: 'flexgrafik-nl',
    outcomeLabel: 'Give visitors a trustworthy conversion portal',
    role: 'Trust Portal',
    statusNote: 'LIVE: generic supervised sales chat · PARTIAL: qualification API LIVE, portal UX remains generic (INT-012)',
    homeStatusNote: 'Supervised chat LIVE — full qualification portal still in progress.',
    intents: ['money', 'order'],
    losLayers: ['sense'],
    screenKey: 'portalAssistant',
    proofRoute: ROUTES.webUpgrade,
    homeVisible: true,
  },
  {
    number: 7,
    repoKey: 'flexgrafik-meta',
    outcomeLabel: 'Start every project with a written operating map',
    role: 'Method / Automation Map',
    intents: ['order', 'money'],
    losLayers: ['guard', 'memory'],
    proofRoute: ROUTES.howItWorks,
    homeVisible: false,
  },
  {
    number: 8,
    repoKey: 'agent-os-ui',
    outcomeLabel: 'See tasks, approvals, history and cost',
    role: 'Mission Control',
    homeStatusNote: 'Task queue, approvals and cost in one owner view.',
    intents: ['order', 'efficiency'],
    losLayers: ['orchestrate'],
    screenKey: 'adminDashboard',
    proofRoute: ROUTES.trust,
    homeVisible: true,
  },
] as const;


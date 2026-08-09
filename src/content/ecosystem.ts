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

/** Locked home stack — site-map.md §3 v6.0 (buyer-first: pain → module pick → live ops proof → method → close) */
export const HOME_SECTIONS = [
  'HeroSection',
  'PainGrid',
  'IntentRouter',
  'JadziaSpearhead',
  'WhyItWorks',
  'Pricing',
  'FinalCtaBand',
] as const;

/** Home section markers — site-map.md §3 v6.0 (DOM verification) */
export const HOME_SECTION_MARKERS: Record<(typeof HOME_SECTIONS)[number], string> = {
  HeroSection: 'hero',
  PainGrid: 'pain-grid',
  IntentRouter: 'repo-router',
  JadziaSpearhead: 'jadzia-spearhead',
  WhyItWorks: 'why-it-works',
  Pricing: 'pricing',
  FinalCtaBand: 'final-cta',
};

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
  /** De-jargonised short statusNote for IntentRouter / BuiltVsPlanned. Falls back to `statusNote`. */
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

/**
 * IntentRouter selection for home + `/solutions/` (site-map §3 v6.0).
 * Hides `flexgrafik-meta` only. VCMS visible. Full 8 on owner-ecosystem / founder.
 */
export function getHomeRepos(): readonly EcosystemRepo[] {
  return ECOSYSTEM_REPOS.filter((r) => r.homeVisible !== false);
}

export const INTENT_ROUTER_HEADER = {
  eyebrow: 'pick your module',
  title: 'Pick your leak — see the production module that fixes it.',
  titleFiltered: (label: string) => `Matching modules — ${label}`,
  lead:
    'Business outcome first. Each card links to live proof with honest status labels.',
  leadFiltered: 'Same filter as Your leak above. Open the proof that fits.',
  filterAll: (count: number) =>
    `Showing ${count} production modules · filter by intent above`,
  filterAllHome: (count: number) =>
    `Showing ${count} production modules · intent filter is in Your leak above`,
  filterActive: (label: string, count: number) =>
    `Showing ${count} modules for "${label}"`,
  nextStepDefault: 'Start with a paid Automation Map — then we pick the right module.',
  nextStepRecommended: (role: string) => `Recommended next: ${role}`,
} as const;

export interface PainCard {
  id: string;
  title: string;
  description: string;
  costLine: string;
  /** What the live module does — one line, buyer language */
  fixLine: string;
  moduleLabel: string;
  href: string;
  intents: IntentId[];
}

export const PAIN_GRID_HEADER = {
  eyebrow: 'your leak',
  title: 'Where is time or money leaking?',
  lead:
    'Filter by what you want to protect — time, money, calm, team, order. Each leak shows what you lose and which live module fixes it.',
  losingLabel: 'Losing',
  fixLabel: 'You get',
  clearFilter: 'Clear filter',
  seeModules: 'See matching modules ↓',
  filterAll: (count: number) => `Showing ${count} leaks · filter by intent`,
  filterActive: (label: string, count: number) =>
    `Showing ${count} leaks for "${label}"`,
  filterEmpty: (label: string) => `No leaks for "${label}" · clear the filter`,
} as const;

/** Home pain router — site-map §3 v5.1 (9 leaks + chips in PainGrid). */
export const PAIN_GRID: readonly PainCard[] = [
  {
    id: 'pain-quotes',
    title: 'Quotes by hand',
    description:
      'Same questions, same email tennis — before you know if the lead is serious.',
    costLine: '3-day ping-pong before you know if they are serious',
    fixLine: 'Configure → open price → Mollie checkout in one guided flow.',
    moduleLabel: 'Wizard',
    href: ROUTES.salesFunnel,
    intents: ['money', 'efficiency'],
  },
  {
    id: 'pain-site',
    title: 'Website that does not convert',
    description:
      'Visitors arrive with no trust signal, no clear route and no reason to act.',
    costLine: 'Visitors leave — enquiries stay flat',
    fixLine: 'Trust path and clear CTAs into quoting — not a brochure.',
    moduleLabel: 'Web Upgrade',
    href: ROUTES.webUpgrade,
    intents: ['money', 'order'],
  },
  {
    id: 'pain-leads',
    title: 'Traffic, but no leads',
    description:
      'People visit and disappear before anyone captures a qualified contact.',
    costLine: 'Paid clicks with nothing in the CRM',
    fixLine: 'Play → reward → Wizard handoff — selective acquisition.',
    moduleLabel: 'Lead magnet',
    href: ROUTES.leadMagnetGame,
    intents: ['money'],
  },
  {
    id: 'pain-inbox',
    title: 'Drowning in email',
    description: 'Leads, invoices and noise in one pile every morning.',
    costLine: '~12 hours/week lost to triage',
    fixLine: 'Lanes + draft replies — you approve every send.',
    moduleLabel: 'Inbox Killer',
    href: ROUTES.inboxKiller,
    intents: ['time', 'calm'],
  },
  {
    id: 'pain-ops-blind',
    title: 'No view of what needs action',
    description:
      'Orders, leads and weekly decisions live in separate tools.',
    costLine: 'Three silos — no single next-action list',
    fixLine: 'One cockpit for leads and orders — you approve the actions.',
    moduleLabel: 'Jadzia',
    href: ROUTES.resultsJadziaCoi,
    intents: ['time', 'calm', 'order'],
  },
  {
    id: 'pain-ops-brief',
    title: 'Decisions scattered all week',
    description: 'Owner decisions live in notes, chat and memory — nothing synthesised.',
    costLine: 'Strategy lives in scattered notes and inbox',
    fixLine: 'Weekly owner brief as a draft you review and approve.',
    moduleLabel: 'Jadzia',
    href: ROUTES.resultsJadziaCoi,
    intents: ['time', 'order'],
  },
  {
    id: 'pain-publish',
    title: 'Content goes out without a gate',
    description: 'Posts and edits leave without a clear approve trail.',
    costLine: 'No trail for who published what — or whether you said yes',
    fixLine: 'Prepare → approve → publish — nothing goes out without you.',
    moduleLabel: 'Jadzia',
    href: ROUTES.resultsJadziaCoi,
    intents: ['calm', 'order'],
  },
  {
    id: 'pain-drift',
    title: 'Docs and systems drift apart',
    description:
      'Repos and content diverge before anyone notices.',
    costLine: 'Silent drift until something breaks in production',
    fixLine: 'Scan, conflict flags, and KODA so you learn what the system knows.',
    moduleLabel: 'VCMS',
    href: ROUTES.resultsOwnerEcosystemWhyVcms,
    intents: ['order', 'calm'],
  },
  {
    id: 'pain-agent-queue',
    title: 'Changes without an approve path',
    description: 'Ad-hoc builds with no logged gate before anything ships.',
    costLine: 'Ad-hoc changes — no logged gate before ship',
    fixLine: 'Fixed supervised workflow — you approve before anything goes live.',
    moduleLabel: 'Agent OS',
    href: ROUTES.resultsAgentOrchestrator,
    intents: ['time', 'efficiency'],
  },
] as const;

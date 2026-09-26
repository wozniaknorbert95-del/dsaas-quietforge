// Agent OS case study copy — sync with agent-os/docs/portfolio/AGENT-OS-PORTFOLIO-PACK.yaml v1.1
// Ecosystem framing: flexgrafik-meta module-agent-os.md + owner-ecosystem flow §05–06

import { ROUTES } from '@/lib/constants';

export const AGENT_OS_SLUG = 'agent-orchestrator' as const;

export const agentOsDisplayName = 'Agent OS — supervised agent workforce';

export const agentOsCaseMeta = {
  title: 'Case study — Agent OS',
  description:
    'How Agent OS (engineering execution), jadzia-core (operations), and Flex-VCMS (governance) work as named layers — not a generic FastAPI chatbot.',
  openGraphTitle: 'Case study — Agent OS',
  openGraphDescription:
    'Three named modules: Agent OS LangGraph pipeline, jadzia-core COI ops, Flex-VCMS supervision. Hybrid VPS + HITL. Full stack map linked.',
  twitterDescription:
    'Agent OS + jadzia-core + Flex-VCMS — honest module boundaries. 5-node pipeline with human gate.',
  ogAlt: 'Case study — Agent OS',
} as const;

export const agentOsOwnerEcosystemBridge = {
  eyebrow: '// full stack',
  title: 'See all eight repos in one supervised system',
  lead:
    'This case study covers the engineering execution layer. jadzia-core runs business ops; Flex-VCMS governs documentation truth — mapped together on the owner ecosystem page.',
  cta: 'Owner ecosystem map →',
  href: ROUTES.resultsOwnerEcosystem,
} as const;

export type AgentOsEcosystemModule = {
  id: string;
  name: string;
  layer: string;
  detail: string;
  href: string;
  linkLabel: string;
  status: 'LIVE' | 'PARTIAL';
};

function moduleStatusClass(status: 'LIVE' | 'PARTIAL'): string {
  return status === 'LIVE' ? 'text-emerald-500' : 'text-amber-500';
}

export { moduleStatusClass as agentOsModuleStatusClass };

/** Three brains — honest boundaries per meta module specs (not one mega-engine). */
export const agentOsEcosystemModules: readonly AgentOsEcosystemModule[] = [
  {
    id: 'agent-os',
    name: 'Agent OS',
    layer: 'Engineering execution',
    detail:
      '5-node LangGraph on VPS (Planner → Coder → Tester → Reviewer → Summarizer). Hybrid local runner for git/code. Mission Control for queue, HITL and Langfuse costs.',
    href: ROUTES.resultsAgentOrchestrator,
    linkLabel: 'This page',
    status: 'LIVE',
  },
  {
    id: 'jadzia-core',
    name: 'jadzia-core',
    layer: 'Operations (COI)',
    detail:
      'Operations Command Layer on EU VPS — Commander cockpit, orders INT-002, leads, GA4, weekly brief, publish HITL, sales chat. Outside the LangGraph pipeline (not Agent OS).',
    href: ROUTES.resultsJadziaCoi,
    linkLabel: 'Operations Command Layer proof →',
    status: 'LIVE',
  },
  {
    id: 'flex-vcms',
    name: 'Flex-VCMS',
    layer: 'Governance',
    detail:
      '8-repo scan, SSoT conflict detection, KODA read-only assistant, governance audit trail. Governs what may change — not a graph node.',
    href: ROUTES.resultsOwnerEcosystem,
    linkLabel: 'Full stack map →',
    status: 'LIVE',
  },
] as const;

export const agentOsEcosystemIntro =
  'Agent OS is the execution layer in a three-module stack. It does not run marketing strategy or repo governance — those are jadzia-core and Flex-VCMS respectively.';

export const agentOsBeforeItems = [
  'Multi-repo changes with no fixed agent roles — scope creep on every task',
  'No human gate before code merges or deploy narratives',
  'Governance and ops mixed into one “AI engine” story',
  'Deploys feel risky because SSoT conflicts are found too late',
] as const;

export const agentOsAfterItems = [
  'Agent OS — fixed 5-node LangGraph pipeline with HITL on VPS (queue, approve, reject, cancel)',
  'jadzia-core — business ops and sales chat on the same ecosystem, separate service (order webhook INT-002 LIVE)',
  'Flex-VCMS — repo scan and conflict detection before changes ship (Conflicts: 0 target)',
  'Human approval before production — Zasada 11; no auto-deploy to client PROD',
] as const;

export const agentOsSupervisionNote =
  'Flex-VCMS governs repos and SSoT outside the LangGraph pipeline. jadzia-core handles business operations — orders, leads, analytics, content calendar, WP SSH, sales chat — not engineering task queue. WC order webhook INT-002 LIVE on EU VPS. Agent OS owns code/test/review execution only.';

export type AgentOsPipelineNode = {
  role: string;
  detail: string;
  scope: string;
  output: string;
};

export const agentOsPipelineNodes: readonly AgentOsPipelineNode[] = [
  {
    role: 'Planner',
    detail: 'Reads SSoT, breaks work into tasks and context packets.',
    scope: 'SSoT read, task list',
    output: 'Implementation plan',
  },
  {
    role: 'Coder',
    detail: 'Implements one module per session — least privilege.',
    scope: 'Target module only',
    output: 'Diff ready for review',
  },
  {
    role: 'Tester',
    detail: 'Runs tests and collects logs before review.',
    scope: 'Tests + logs',
    output: 'Pass/fail report',
  },
  {
    role: 'Reviewer',
    detail: 'Human gate — LangGraph pauses at REVIEWING.',
    scope: 'Human gate (HITL)',
    output: 'Approve or block',
  },
  {
    role: 'Summarizer',
    detail: 'Closes the session with handoff markdown on disk.',
    scope: 'Handoff + session closure',
    output: 'Handoff markdown on disk',
  },
];

export const agentOsDeliveryPhases = [
  {
    step: '01',
    title: 'Map',
    detail: 'Find leaks, measure hours, agree first system. Deliverable: Hours Engine report.',
  },
  {
    step: '02',
    title: 'Architect',
    detail: 'Target diagram + spec — who does what, where data flows.',
  },
  {
    step: '03',
    title: 'Build',
    detail: 'AI workforce assembles against fixed rules in test environment.',
  },
  {
    step: '04',
    title: 'Verify',
    detail: 'Real scenarios + your sign-off. Gates built into the system.',
  },
  {
    step: '05',
    title: 'Hand over',
    detail: 'README, walkthrough, optional care. No lock-in.',
    highlight: true as const,
  },
] as const;

export const agentOsStack = [
  'FastAPI',
  'LangGraph',
  'PostgreSQL',
  'Mission Control',
  'EU VPS',
] as const;

export const agentOsArchitectureAlt =
  'Agent OS 2.0 hybrid architecture: VPS control plane, 5-node LangGraph pipeline, local runner and human approval gate';

export const agentOsWorkflowMapIntro =
  'Planner → Coder → Tester → Reviewer → Summarizer — each step has a contract before anything ships.';

export const agentOsPipelineLine =
  'Planner → Coder → Tester → Reviewer → Summarizer';

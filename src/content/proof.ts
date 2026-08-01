// ============================================================================
// PROOF MANIFEST — metrics, screens, videos, case measurements, pricing.
// Module/repo/intent map: src/content/ecosystem.ts
// Copy strings: src/content/conversion-copy.ts
// Binding layout: docs/strategy/site-map.md
// Videos: fill LAST — never show [FILL] placeholders on home.
// ============================================================================

import type { CaseMeasurementKey, ScreenKey, VideoKey } from '@/content/ecosystem';
import { leadMagnetSalesOneLiner } from '@/content/lead-magnet-case-study';

export const metrics = {
  repos: "8",                                                  // [R] 8 zbadanych repo
  productionTouching: "6",                                     // [R] repos with production deployment
  wizardSteps: "9",                                            // [R] kod: "Stap 1 van 9" — UI screens
  wizardBusinessSteps: "7",                                    // [R] business strategy decision stages
  wizardStepsFootnote: "9 UI screens · 7 business decision stages",
  skus: "167",                                                // [R] product-master-table.json active=True (175 rows; 2026-07-19 recount)
  gameLevels: "5",                                             // [R] Beginner → Boss: Belastingdienst
  agentNodes: "5",                                             // [R] Planner→Coder→Tester→Reviewer→Summarizer
  msgsPerScan: "142",                                          // [T] test-environment process run
  integrations: "8",                                           // [T] 5 real + Make/Zapier+Notion+Workspace
  hosting: "EU VPS · FastAPI (Jadzia) + LangGraph (Agent OS)", // [R] separate runtime layers
  deployment: "GitHub Actions CI/CD",                          // [R]
} as const;

/** Display labels for proof video slots (UI only). */
export const videoLabels: Record<VideoKey, { title: string; hint: string }> = {
  wizard: { title: 'Walkthrough', hint: 'Full funnel — configure to checkout' },
  inboxKiller: { title: 'Walkthrough', hint: 'Classification lanes and approval gate' },
  leadMagnet: { title: 'Walkthrough', hint: 'Game capture to wizard handoff' },
  agentOs: { title: 'Walkthrough', hint: 'Mission Control — tasks, queue, cost' },
  vcms: { title: 'Walkthrough', hint: 'Governance scan and conflict report' },
  ecosystem: { title: 'Walkthrough', hint: 'Full-stack owner ecosystem tour' },
  founder: { title: 'Walkthrough', hint: 'How FLEXGRAFIK runs this stack' },
};

export type VideoSlot = {
  url: string | null;        // FILL: youtube/vimeo/loom embed url
  duration: string;          // set: "90s", "60s", etc.
  poster: string | null;     // FILL: /gratka/xxx.jpg poster image path
  ready: boolean;            // false until client fills url
};

export type FeatureClaimStatus = 'PROVEN' | 'DEMO' | 'PLANNED';

export type AgentOsClaimLabel = 'LIVE' | 'LOCAL-ONLY' | 'NOT OFFERED';

export type LeadMagnetClaimLabel = 'LIVE' | 'NOT OFFERED';

export type ProductGalleryShot = {
  order: string;
  label: string;
  src: string;
  alt: string;
  caption: string;
  ready: boolean;
};

/** Seven-screen product gallery — /results/lead-magnet/ */
export const leadMagnetGallery: readonly ProductGalleryShot[] = [
  {
    order: '01',
    label: 'Start screen',
    src: '/gratka/lead-magnet-start.png',
    alt: 'Industrial main menu — Bouwplaats Chaos start screen',
    caption: 'First impression sets premium utility tone — not a casual browser game.',
    ready: true,
  },
  {
    order: '02',
    label: 'Entry gate',
    src: '/gratka/lead-magnet-entry-gate.png',
    alt: 'Registration gate before gameplay begins',
    caption: 'Qualified intent before play — name and email, not anonymous traffic.',
    ready: true,
  },
  {
    order: '03',
    label: 'Reward overlay',
    src: '/gratka/lead-magnet-reward.png',
    alt: 'Level reward tier cards and unlock codes',
    caption:
      'Four-tier ladder on main menu — 10% discount through sticker pack, t-shirt, and hoodie purchase bonus.',
    ready: true,
  },
  {
    order: '04',
    label: 'Leaderboard',
    src: '/gratka/lead-magnet-leaderboard.png',
    alt: 'Monthly season leaderboard with season prize',
    caption: 'Retention hook — players return; ranking visible before wizard handoff.',
    ready: true,
  },
  {
    order: '05',
    label: 'Mobile gameplay',
    src: '/gratka/lead-magnet-mobile.png',
    alt: 'Mobile viewport gameplay with thumb-zone layout',
    caption: '70/30 playfield split — thumb-safe controls on narrow screens.',
    ready: true,
  },
  {
    order: '06',
    label: 'Wizard bridge',
    src: '/gratka/lead-magnet-wizard-bridge.png',
    alt: 'Score redemption CTA routing to self-service wizard with tier-aware code',
    caption: 'Score redemption CTA — tier-aware code routes to wizard (GAME10 minimum).',
    ready: true,
  },
  {
    order: '07',
    label: 'Conversion handoff',
    src: '/gratka/lead-magnet-conversion-handoff.png',
    alt: 'Self-service wizard entry from game attribution',
    caption: 'Game-sourced visitor lands in the same configurator paying clients use.',
    ready: true,
  },
];

/** Honest Agent OS labels — sync with agent-os/docs/portfolio/AGENT-OS-PORTFOLIO-PACK.yaml (12 capabilities) */
export const agentOsFeatureStatus: Record<string, { label: string; status: AgentOsClaimLabel }> = {
  taskQueue:     { label: 'Task queue + lifecycle', status: 'LIVE' },
  hitl:          { label: 'HITL approve / reject / cancel', status: 'LIVE' },
  hybridRouting: { label: 'Hybrid VPS + local runner', status: 'LIVE' },
  codeExecution: { label: 'Code/git execution', status: 'LOCAL-ONLY' },
  observability: { label: 'Langfuse cost tracking', status: 'LIVE' },
  mcpGateway:    { label: 'MCP gateway (filesystem/git)', status: 'LIVE' },
  demoVideo:     { label: 'Demo 60s video', status: 'LIVE' },
  handoffE2e:    { label: 'Handoff pipeline E2E', status: 'LIVE' },
  cancelUx:      { label: 'Task cancel UX', status: 'LIVE' },
  localRunner:   { label: 'Local runner OpenCode', status: 'LOCAL-ONLY' },
  publicSaaS:    { label: 'Public multi-tenant SaaS', status: 'NOT OFFERED' },
  autoDeploy:    { label: 'Auto-deploy to client PROD', status: 'NOT OFFERED' },
};

/** Verified gates from agent-os portfolio pack — smoke_run_id 2026-06-24T05-42-34-858Z */
export const agentOsVerifiedMetrics = [
  { label: 'LangGraph pipeline', value: '5 nodes' },
  { label: 'pytest integration', value: '42/42' },
  { label: 'prod E2E smoke', value: 'PASS' },
  { label: 'browser smoke', value: '2026-06-24' },
] as const;

export const agentOsNarrative = {
  framing:
    'Three named modules — Agent OS (execute), jadzia-core (operate), Flex-VCMS (govern). Not one prompt; fixed roles with a human at the gate.',
} as const;

export const agentOsPublicUrls = {
  missionControl: 'https://os.flexgrafik.nl',
  apiHealth: 'https://os-api.flexgrafik.nl/api/v1/health',
} as const;

/** Honest VCMS feature labels for portfolio — sync with flex-vcms/docs/VCMS_SALES_REPORT.md */
export const vcmsFeatureStatus: Record<string, { label: string; status: FeatureClaimStatus }> = {
  scan:           { label: 'Repo & content scan', status: 'PROVEN' },
  conflicts:      { label: 'Conflict detection + severity', status: 'PROVEN' },
  ssot:           { label: 'SSoT registry', status: 'PROVEN' },
  auditLog:       { label: 'Governance audit JSONL', status: 'DEMO' },
  koda:           { label: 'KODA read-only assistant', status: 'DEMO' },
  hitl:           { label: 'Human approval gate', status: 'DEMO' },
  healthScore:    { label: 'SSoT health score', status: 'PLANNED' },
};

/**
 * VCMS demo video — upload instructions (Dowódca):
 * 1. Source (local, gitignored): flex-vcms/docs/demo/final-portfolio-demo.mp4 (~69s)
 *    Generate: cd flex-vcms && npm run demo:all
 * 2. Upload to Loom / Vimeo / YouTube (unlisted)
 * 3. Set url + ready: true below (optional poster: /gratka/vcms-demo-poster.jpg)
 */
export const videos: Record<VideoKey, VideoSlot> = {
  ecosystem:   { url: null, duration: "90s", poster: null, ready: false },  // Wire: owner-ecosystem §ecosystem-video — run record-ecosystem-demo.mjs
  inboxKiller: { url: null, duration: "60s", poster: "/gratka/inbox-lanes.png", ready: false },
  wizard:      { url: "/gratka/wizard-demo.mp4", duration: "98s", poster: "/gratka/wizard-checkout.png", ready: true },
  leadMagnet:  { url: null, duration: "45s", poster: "/gratka/lead-magnet-start.png", ready: false },
  agentOs:     { url: "/gratka/agent-os-demo.mp4", duration: "60s", poster: null, ready: true },
  vcms:        { url: "/gratka/vcms-demo.mp4", duration: "69s", poster: null, ready: true }, // Self-hosted from flex-vcms/docs/demo/final-portfolio-demo.mp4
  founder:     { url: null, duration: "120s", poster: null, ready: false },
};

export type ScreenShot = {
  src: string | null;        // FILL: /gratka/xxx.png
  alt: string;               // descriptive alt (accessibility)
  caption: string;           // one line: "what you see + why it matters"
  ready: boolean;
};

export const screens: Record<ScreenKey, ScreenShot> = {
  wizardCheckout:  { src: "/gratka/wizard-checkout.png", alt: "Configurator checkout with live price", caption: "Configure → see price → pay, no phone call.", ready: true },
  leadMagnet:      { src: "/gratka/lead-magnet-start.png", alt: "Gamified lead system start screen", caption: "Industrial product framing — credible B2B entry, not arcade fluff.", ready: true },
  leadMagnetGameOver: { src: "/gratka/lead-magnet-wizard-bridge.png", alt: "Wizard bridge with discount coupon CTA", caption: "Reward moment routes to self-service quoting.", ready: true },
  leadMagnetLeaderboard: { src: "/gratka/lead-magnet-leaderboard.png", alt: "Monthly season leaderboard", caption: "Season ranking before conversion handoff.", ready: true },
  inboxLanes:      { src: "/gratka/inbox-lanes.png", alt: "Inbox classification lanes with approval gate", caption: "Lead · client · invoice · noise, with approval gate.", ready: true },
  auditLog:        { src: "/gratka/audit-log.svg", alt: "VCMS governance action log", caption: "Scan events from governance-audit.jsonl — DEMO: local trail; handoffs + prod ops on request.", ready: true },
  agentCards:      { src: "/gratka/agent-cards.svg", alt: "Agent OS agent cards — five fixed roles", caption: "Every agent has a role, rules and a review gate — LIVE on VPS; code execution LOCAL on dev PC.", ready: true },
  workflowMap:     { src: "/gratka/workflow-map.svg", alt: "Agent OS LangGraph pipeline", caption: "Planner → Coder → Tester → Reviewer → Summarizer — hybrid pipeline with human gate before ship.", ready: true },
  vcmsDashboard:   { src: "/gratka/vcms-dashboard.svg", alt: "VCMS governance dashboard", caption: "8-repo scan status with Conflicts: 0 target — governance command center (live).", ready: true },
  conflictReport:  { src: "/gratka/conflict-report.svg", alt: "VCMS conflict report (demo fixture)", caption: "Example SSoT mismatch flagged before deploy — DEMO fixture; live scan target is Conflicts: 0.", ready: true },
  portalAssistant: { src: "/gratka/portal-assistant.png", alt: "Customer-facing portal assistant", caption: "Generic supervised sales chat LIVE. Qualification API proven; portal UX rollout PARTIAL.", ready: true },
  inspireIntake:   { src: "/gratka/inspire/intake.png", alt: "Design Intake — vehicle branding request form", caption: "Complex Quote & Design Intake — live supervised path (PARTIAL).", ready: true },
  inspireMockups:  { src: "/gratka/inspire/mockups.png", alt: "Standard and Premium inspiration mockups", caption: "Visual direction before price — mockups are not print-ready finals.", ready: true },
  inspireHandoff:  { src: "/gratka/inspire/wizard-handoff.png", alt: "Offerte concierge request panel (recapture pending)", caption: "Customer path now ends in an offerte request (48h studio quote) — Wizard handoff removed; recapture pending.", ready: false },
  adminDashboard:  { src: "/gratka/agent-os-mission-control.png", alt: "Mission Control dashboard — tasks, queue, history and cost tabs", caption: "Mission Control — tasks, queue, history and cost tabs. LIVE on os.flexgrafik.nl.", ready: true },
  jadziaCommander: {
    src: '/gratka/jadzia-commander-home.png',
    alt: 'COI Commander Start — queue actions and system map',
    caption:
      'Live COI Commander Start on FlexGrafik — owner picks one queued action (e.g. CS follow-up); confirm before anything consequential. No client PII in this view.',
    ready: true,
  },
  jadziaDataHealth: {
    src: '/gratka/jadzia-commander-data-health.png',
    alt: 'COI Commander Analityka — Data Health truth layer',
    caption:
      'Data Health (DTL): freshness and margin facts the Marketing Brain reads — shadow propose only; Act blocked.',
    ready: true,
  },
};

// Case studies: measurement line (honest reframe)
export const caseMeasurements: Record<
  CaseMeasurementKey,
  { value: string | null; ready: boolean }
> = {
  inboxKiller: { value: "Test-environment process proof: 142 messages scanned per run, with human approval on every send.", ready: true },
  agentOs:     { value: "5-node LangGraph · hybrid VPS control plane LIVE · prod E2E handoff · Langfuse cost tracking.", ready: true },
  salesFunnel: { value: "9-step configurator → quote → payment, live.", ready: true },
  leadMagnet:  { value: leadMagnetSalesOneLiner, ready: true },
  advisory:    { value: "6-phase delivery, AVG layer specified · anonymised · in delivery.", ready: true },
  ownerEcosystem: { value: "8-repo governance + Jadzia Operations Command Layer with a ~93% LIVE operational spine.", ready: true },
  jadziaCoi: {
    value:
      'Operations Command Layer: ~93% LIVE spine + Marketing Brain shadow (F0–F3) with Telegram HITL — Commander cockpit, orders (INT-002), weekly brief, supervised publish (INT-011). Act/Ads create blocked.',
    ready: true,
  },
  whatsappPilot: {
    value: '6–8 question async flow · scored brief · pilot stage.',
    ready: true,
  },
};

export type FieldReport = {
  date: string;
  text: string;
  verified: boolean;
};

/** Self-reports from production — PR-07: no unverified commercial counts on site */
export const fieldReports: readonly FieldReport[] = [
  {
    date: 'Wizard funnel',
    text: 'Self-service configurator qualifies leads in one session — open pricing and Mollie checkout without email ping-pong.',
    verified: true,
  },
  {
    date: 'Inbox run',
    text: `Test-environment process run: ${metrics.msgsPerScan} messages scanned per pass — drafts queued with human approval before every send.`,
    verified: true,
  },
  {
    date: 'VCMS scan',
    text: 'Eight repos checked in one pass; conflicts flagged before anything touched production.',
    verified: true,
  },
] as const;

import { PRICING_MATRIX, PRICING_NUMBERS, formatEuro } from './pricing';

// Pricing tiers — derived from pricing.ts SSoT
export const pricing = {
  discovery: { price: PRICING_MATRIX.automationMap.price, note: 'Credited toward your project.' },
  singleSystem: {
    from: formatEuro(PRICING_NUMBERS.singleSystem.from),
    timeline: '2-3 weeks',
    includes: '1 Custom Module (e.g. Inbox Killer or CRM sync)',
  },
  leadMagnetGame: {
    from: formatEuro(PRICING_NUMBERS.leadMagnetGame.from),
    timeline: '2-3 weeks',
    includes: 'Custom Canvas game + email capture + wizard bridge',
  },
  ecosystem: {
    from: formatEuro(PRICING_NUMBERS.ecosystemBuild.from),
    timeline: '4-6 weeks',
    includes: 'VCMS scan & governance',
    summary: '2–3 modules + VCMS scan & governance + Agent OS + AVG/HITL',
  },
  managedAutomation: {
    from: PRICING_MATRIX.managedAutomation.range,
    perMonth: true,
    note: 'No lock-in.',
  },
};

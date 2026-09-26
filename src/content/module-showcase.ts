// ============================================================================
// MODULE SHOWCASE — portfolio copy synced with flexgrafik-meta/docs/core/modules/
// Components read effects/highlights from here — not hardcoded in JSX.
// ============================================================================

export interface ModuleShowcase {
  repoKey: string;
  portfolioLabel: string;
  effect: string;
  highlights: readonly string[];
}

import { metrics } from '@/content/proof';

/** Eight-repo portfolio presentation — aligned with module specs 2026-06-24 */
export const MODULE_SHOWCASE: Record<string, ModuleShowcase> = {
  zzpackage: {
    repoKey: 'zzpackage',
    portfolioLabel: 'Wizard Cash Engine',
    effect:
      `Wizard-only checkout — 7 business stages, 9 UI screens, ${metrics.skus} active SKUs, Mollie from €199 · Complex Quote & Design Intake (INSPIRE) PARTIAL.`,
    highlights: ['Mollie + WooCommerce', 'Open pricing configurator', 'INSPIRE design intake PARTIAL'],
  },
  'app.flexgrafik.nl': {
    repoKey: 'app.flexgrafik.nl',
    portfolioLabel: 'Lead magnet game',
    effect:
      'Bouwplaats Chaos — selective PWA acquisition with Turnstile, 4-tier rewards, Wizard bridge and lead sync to ops (INT-004 LIVE).',
    highlights: ['INT-004 lead sync LIVE', 'Reward → Wizard bridge', 'Selective vertical fit'],
  },
  'jadzia-core': {
    repoKey: 'jadzia-core',
    portfolioLabel: 'Operations Command Layer',
    effect:
      'Operations Command Layer — LIVE ops spine + Marketing Brain shadow (F0–F3): Commander cockpit, margin facts, weekly brief, HITL publish. Not autonomous Act or auto ad spend.',
    highlights: ['Commander cockpit LIVE', 'Order/lead spine LIVE', 'Weekly brief + publish HITL'],
  },
  'agent-os': {
    repoKey: 'agent-os',
    portfolioLabel: 'Agent OS',
    effect:
      '5-node LangGraph engineering pipeline — hybrid VPS queue plus Local Runner on your machine.',
    highlights: ['Planner → Summarizer', 'Langfuse cost tracking', 'Multi-repo smoke gates'],
  },
  'flexgrafik-nl': {
    repoKey: 'flexgrafik-nl',
    portfolioLabel: 'Trust Portal',
    effect:
      'flexgrafik.nl brand portal — Wizard-first trust surface with generic supervised chat; qualification-ready architecture remains PARTIAL.',
    highlights: ['Wizard-first CTAs', 'Asset sync from wizard', 'Generic supervised chat'],
  },
  'flexgrafik-meta': {
    repoKey: 'flexgrafik-meta',
    portfolioLabel: 'Constitution',
    effect:
      'Ecosystem constitution — global rules, master plan, agent hierarchy and module specs agents read at session start.',
    highlights: ['Hours Engine method', 'Agent cards', 'Enterprise doc suite'],
  },
  'flex-vcms': {
    repoKey: 'flex-vcms',
    portfolioLabel: 'VCMS governance',
    effect:
      'Governance OS — 8-repo scan, conflict detection, ecosystem map generation and governance audit trail.',
    highlights: ['Conflicts: 0 target', 'KODA read-only assistant', 'Handoff index'],
  },
  'agent-os-ui': {
    repoKey: 'agent-os-ui',
    portfolioLabel: 'Mission Control',
    effect:
      'Operator cockpit — HITL approve/reject diffs, task queue, history and Langfuse cost tab.',
    highlights: ['Browser smoke tooling', 'Terminal design tokens', 'OpenAPI-typed client'],
  },
} as const;

export function getModuleShowcase(repoKey: string): ModuleShowcase | undefined {
  return MODULE_SHOWCASE[repoKey];
}

// ============================================================================
// READINESS MANIFEST — Built vs Planned table (honest AS-IS inventory).
// Source: flexgrafik-meta/docs/core/as-is-inventory.md §1 (2026-06-24)
// ============================================================================

import { metrics } from '@/content/proof';

export type ReadinessStatus = 'LIVE' | 'PARTIAL' | 'PLANNED';

export interface ReadinessRow {
  module: string;
  repoKey: string;
  readiness: string;
  capability: string;
  status: ReadinessStatus;
  /** De-jargonised capability for home compact (site-map §3 v3.0 #6). Falls back to `capability`. */
  homeCapability?: string;
}

export const READINESS_HEADER = {
  eyebrow: 'honesty',
  title: 'What is live today vs on the roadmap.',
  lead:
    'Evidence from systems that already run a real business — percentages are inventory, not revenue claims.',
} as const;

/**
 * Home compact selection — site-map.md §3 v3.0 #6 (4 rows per Commander decision mapa.txt).
 * Order: Wizard, Jadzia COI, Agent OS, Governance (T4: replaced Lead Magnet with Governance).
 * Full 8-row table on `/results/owner-ecosystem/`.
 */

/** Eight-repo readiness — sync with flexgrafik-meta as-is-inventory.md */
export const READINESS_ROWS: readonly ReadinessRow[] = [
  {
    module: 'Wizard Cash Engine',
    repoKey: 'zzpackage',
    readiness: '~90%',
    capability: `${metrics.skus} SKU catalog, Mollie checkout, 9-screen configurator`,
    homeCapability: 'Self-service configurator with open pricing — calm order form or designer handoff.',
    status: 'LIVE',
  },
  {
    module: 'Lead magnet game',
    repoKey: 'app.flexgrafik.nl',
    readiness: '~85%',
    capability: 'Bouwplaats Chaos PWA, Turnstile, 4-tier ladder, wizard bridge',
    status: 'LIVE',
  },
  {
    module: 'Operations Command Layer',
    repoKey: 'jadzia-core',
    readiness: '~93%',
    capability:
      'Commander cockpit, lead/order/GA4 spine, weekly HITL brief and supervised content publish LIVE · full autonomous COI out of scope',
    homeCapability: 'Owner cockpit for leads, orders and weekly brief — autonomy is not offered.',
    status: 'LIVE',
  },
  {
    module: 'Agent OS',
    repoKey: 'agent-os',
    readiness: '~90%',
    capability: '5-node LangGraph HITL pipeline, hybrid VPS',
    homeCapability: 'Supervised build workflow — you approve before anything goes live.',
    status: 'LIVE',
  },
  {
    module: 'Trust portal',
    repoKey: 'flexgrafik-nl',
    readiness: '~75%',
    capability: 'Brand portal, CTAs, generic sales chat',
    status: 'LIVE',
  },
  {
    module: 'Constitution',
    repoKey: 'flexgrafik-meta',
    readiness: '~80%',
    capability: 'Global rules, strategy canon, investor docs',
    status: 'LIVE',
  },
  {
    module: 'VCMS governance',
    repoKey: 'flex-vcms',
    readiness: '~85%',
    capability: '8-repo scan, KODA assistant, conflict detection, audit trail',
    homeCapability: 'Catches content drift before deploy — clean handoffs, clear audit trail.',
    status: 'LIVE',
  },
  {
    module: 'Mission Control',
    repoKey: 'agent-os-ui',
    readiness: '~85%',
    capability: 'Task queue, HITL dashboard, cost tracking',
    homeCapability: 'See tasks, approvals, history and cost in one place.',
    status: 'LIVE',
  },
] as const;

export function getReadinessStatus(repoKey: string): ReadinessStatus | undefined {
  return READINESS_ROWS.find((row) => row.repoKey === repoKey)?.status;
}

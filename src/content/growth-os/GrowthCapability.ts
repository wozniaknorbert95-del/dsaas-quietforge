export type GrowthCapabilityType = 
  | 'Discovery'
  | 'Demand'
  | 'Trust'
  | 'Conversion'
  | 'Retention'
  | 'Knowledge'
  | 'Optimization';

export interface GrowthCapability {
  id: GrowthCapabilityType;
  name: string;
  description: string;
  evidence_refs: string[];
}

export const CAPABILITY_REGISTRY: Record<GrowthCapabilityType, GrowthCapability> = {
  Discovery: {
    id: 'Discovery',
    name: 'Discovery (Pain Audit)',
    description: 'Finds operational and administrative time leaks in Dutch SMBs (e.g. manual car wrap calculations, manual proposals).',
    evidence_refs: ['qf:prospects.ttl']
  },
  Demand: {
    id: 'Demand',
    name: 'Demand Generation',
    description: 'Generates high-intent direct attack copy focused on time-as-currency and Rotterdam terrace Heineken triggers.',
    evidence_refs: ['qf:patchers.ttl', 'qf:brand-voice.json']
  },
  Trust: {
    id: 'Trust',
    name: 'Trust & Proof System',
    description: 'Injects real, verified screenshots, video walkthroughs, and status badges (PROVEN/DEMO/PLANNED) into copy.',
    evidence_refs: ['qf:patchers.ttl']
  },
  Conversion: {
    id: 'Conversion',
    name: 'High-Fidelity Checkout',
    description: 'Coordinates 9-step checkout wizards, KvK lookup verification, and client-side Mollie deposit pre-payments.',
    evidence_refs: ['qf:WizardCashEngine']
  },
  Retention: {
    id: 'Retention',
    name: 'Retention & Onboarding',
    description: 'Automates client setup, contract drafting, and webhook fakturowanie coordination via Jadzia Backend.',
    evidence_refs: ['qf:JadziaCOI']
  },
  Knowledge: {
    id: 'Knowledge',
    name: 'Knowledge Graph Feed',
    description: 'Maintains local RDF Turtle graphs and SPARQL schemas for real-time contextual semantic queries.',
    evidence_refs: ['qf:patchers.ttl', 'qf:hot-matches.ttl']
  },
  Optimization: {
    id: 'Optimization',
    name: 'Self-Improving Loop',
    description: 'Analyzes ledger click/dwell telemetry and tunes LLM parameters and temperature values for the next cycle.',
    evidence_refs: ['qf:ledger.json']
  }
};

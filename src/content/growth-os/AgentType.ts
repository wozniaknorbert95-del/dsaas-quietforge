export type AgentType = 'DemandTrust' | 'ConversionRetention' | 'OptimizationStrategy';

export interface AgentMetadata {
  id: AgentType;
  name: string;
  role: string;
  description: string;
}

export const AGENT_REGISTRY: Record<AgentType, AgentMetadata> = {
  DemandTrust: {
    id: 'DemandTrust',
    name: 'Demand & Trust Agent',
    role: 'Top-funnel growth, pain recognition, brand authority, and proof verification.',
    description: 'Bridges cold traffic to working proof by exposing operational leaks.'
  },
  ConversionRetention: {
    id: 'ConversionRetention',
    name: 'Conversion & Retention Agent',
    role: 'Bottom-funnel conversion, checkout, retention loops, and automated fakturowanie onboarding.',
    description: 'Converts qualified leads through interactive wizards and secures pre-payments.'
  },
  OptimizationStrategy: {
    id: 'OptimizationStrategy',
    name: 'Optimization & Strategy Agent',
    role: 'Self-improving marketing loops, CPA optimization, ledger analysis, and prompt parameter tuning.',
    description: 'Coordinates OPA guardrails and runs the self-tuning feedback loop.'
  }
};

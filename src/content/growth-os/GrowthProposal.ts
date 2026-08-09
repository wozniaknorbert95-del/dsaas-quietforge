import { AgentType } from './AgentType';

export interface GrowthProposal {
  id: string;
  clientId: 'flexgrafik' | 'quietforge';
  agent: AgentType;
  objective: string;
  target: string;
  action: string;
  channel: 'linkedin' | 'facebook' | 'youtube' | 'email';
  content: string;
  expected_outcome: string;
  economic_projection: {
    target_cpa: number;
    expected_margin: number;
  };
  risk: 'Low' | 'Medium' | 'High';
  confidence: number; // 0.0 to 1.0
  evidence_refs: string[];
  policy_version: string;
  requires_human: boolean;
  status: 'Staging' | 'Approved' | 'Blocked';
}

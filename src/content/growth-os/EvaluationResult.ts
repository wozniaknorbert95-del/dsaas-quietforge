import { AgentType } from './AgentType';

export interface EvaluationResult {
  proposal_id: string;
  clientId: 'flexgrafik' | 'quietforge';
  agent: AgentType;
  expected_cpa: number;
  actual_cpa: number;
  dwell_time_seconds: number;
  impressions: number;
  clicks: number;
  saves: number;
  bookings_count: number;
  reliability_score: number; // 0.0 to 1.0 based on actual cpa vs target cpa
  was_profitable: boolean;
}

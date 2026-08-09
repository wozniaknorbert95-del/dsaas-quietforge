import { AgentType } from '../../content/growth-os/AgentType';

export interface LedgerEntry {
  timestamp: string;
  proposal_id?: string;
  post_id?: string;
  clientId: 'flexgrafik' | 'quietforge';
  agent: AgentType;
  expected_cpa: number;
  actual_cpa: number;
  dwell_time_seconds: number;
  impressions: number;
  clicks: number;
  saves: number;
  bookings_count: number;
  reliability_score: number;
  was_profitable: boolean;
  metrics?: {
    estimated_cpa?: number;
    clicks?: number;
    saves?: number;
    bookings_count?: number;
  };
}

// API endpoint for ledger operations (avoids Turbopack 'fs' warnings)
const LEDGER_API_URL = '/api/growth-os/ledger';

export class PerformanceTracker {
  public static async getLedgerData(): Promise<LedgerEntry[]> {
    try {
      const response = await fetch(LEDGER_API_URL, {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (e) {
      console.warn('[PerformanceTracker] API fetch failed, using mock data.', e);
      // Fallback mock data for SSR/build time
      return [
        {
          timestamp: "2026-08-09T14:30:00Z",
          proposal_id: "post_1_linkedin_inbox",
          clientId: "quietforge",
          agent: "DemandTrust",
          expected_cpa: 150,
          actual_cpa: 96.60,
          dwell_time_seconds: 42.5,
          impressions: 1240,
          clicks: 98,
          saves: 14,
          bookings_count: 3,
          reliability_score: 1.0,
          was_profitable: true
        },
        {
          timestamp: "2026-08-09T15:00:00Z",
          proposal_id: "post_2_linkedin_wizard",
          clientId: "quietforge",
          agent: "ConversionRetention",
          expected_cpa: 290,
          actual_cpa: 240.00,
          dwell_time_seconds: 38.0,
          impressions: 850,
          clicks: 45,
          saves: 8,
          bookings_count: 1,
          reliability_score: 1.0,
          was_profitable: true
        }
      ];
    }
  }

  public static async saveLedgerEntry(entry: Omit<LedgerEntry, 'timestamp'>): Promise<boolean> {
    try {
      const response = await fetch(LEDGER_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return true;
    } catch (e) {
      console.warn('[PerformanceTracker] Failed to persist ledger entry via API.', e);
      return false;
    }
  }

  public static async calculateAgentScores(clientId: 'flexgrafik' | 'quietforge'): Promise<Record<AgentType, number>> {
    const data = await this.getLedgerData();
    const clientData = data.filter(entry => entry.clientId === clientId);

    const scores: Record<AgentType, { total: number; count: number }> = {
      DemandTrust: { total: 0, count: 0 },
      ConversionRetention: { total: 0, count: 0 },
      OptimizationStrategy: { total: 0, count: 0 }
    };

    clientData.forEach(entry => {
      const agent = entry.agent as AgentType;
      const score = entry.reliability_score !== undefined ? entry.reliability_score : 1.0;
      if (scores[agent]) {
        scores[agent].total += score;
        scores[agent].count += 1;
      }
    });

    return {
      DemandTrust: scores.DemandTrust.count > 0 ? parseFloat((scores.DemandTrust.total / scores.DemandTrust.count).toFixed(2)) : 0.95,
      ConversionRetention: scores.ConversionRetention.count > 0 ? parseFloat((scores.ConversionRetention.total / scores.ConversionRetention.count).toFixed(2)) : 0.92,
      OptimizationStrategy: scores.OptimizationStrategy.count > 0 ? parseFloat((scores.OptimizationStrategy.total / scores.OptimizationStrategy.count).toFixed(2)) : 0.98
    };
  }
}

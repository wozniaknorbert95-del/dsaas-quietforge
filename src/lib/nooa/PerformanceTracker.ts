import { EvaluationResult } from '../../content/growth-os/EvaluationResult';
import { AgentType } from '../../content/growth-os/AgentType';

// We store our ledger in the quietforge-growth-os content-engine folder
const LEDGER_PATH = 'quietforge-growth-os/content-engine/ledger.json';

export class PerformanceTracker {
  public static async getLedgerData(): Promise<any[]> {
    try {
      // Since it runs in NextJS client/server, we can do a local check or provide safe default mock values if fs is missing
      const fs = require('fs');
      if (fs.existsSync(LEDGER_PATH)) {
        const fileContent = fs.readFileSync(LEDGER_PATH, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (e) {
      console.warn('[PerformanceTracker] Server-side fs is not available or failed to read ledger. Using mock in-memory data.', e);
    }
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

  public static async saveLedgerEntry(entry: any): Promise<boolean> {
    try {
      const fs = require('fs');
      const ledger = await this.getLedgerData();
      ledger.push({
        timestamp: new Date().toISOString(),
        ...entry
      });
      fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.warn('[PerformanceTracker] Failed to persist ledger entry to fs.', e);
    }
    return false;
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

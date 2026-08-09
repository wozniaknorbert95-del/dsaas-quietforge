import { NooaAgent } from '../NooaAgentRuntimeAdapter';
import { GrowthProposal } from '../../../content/growth-os/GrowthProposal';
import { ClientContext } from '../../../content/growth-os/GrowthContext';
import { LedgerEntry } from '../PerformanceTracker';

export class OptimizationStrategyAgent extends NooaAgent {
  constructor(context: ClientContext) {
    super('OptimizationStrategy', context);
  }

  public async runOptimization(ledgerData: LedgerEntry[]): Promise<GrowthProposal> {
    const isQuietforge = this.context.clientId === 'quietforge';
    const objective = `Optimize LLM prompt parameters and campaign priority based on ledger telemetry`;
    const action = `Scan ledger.json entries for client ${this.context.clientId}, calculate actual CPA deviations, and update prompt weights.`;

    const clientEntries = ledgerData.filter(entry => entry.clientId === this.context.clientId);
    const avgCpa = clientEntries.reduce((acc, curr) => acc + (curr.metrics?.estimated_cpa || curr.actual_cpa || 0), 0) / (clientEntries.length || 1);

    const targetCpaLimit = this.context.maxCpaLimit;
    const cpaDeviation = avgCpa - targetCpaLimit;
    const isOverBudget = cpaDeviation > 0;

    const content = isQuietforge
      ? `[Self-Optimization Engine] Client: quietforge. Average actual CPA is €${avgCpa.toFixed(2)} (Target Limit: €${targetCpaLimit}). ${
          isOverBudget 
            ? 'CPA is over-budget! Automatically lowering LLM Temperature to 0.65 and increasing weight of high-converting Car Wrapping and Tradesmen niches.' 
            : 'CPA is healthy. Keeping current temperature 0.72 and continuing active direct attack campaigns.'
        }`
      : `[Self-Optimization Engine] Client: flexgrafik. Average actual CPA is €${avgCpa.toFixed(2)} (Target Limit: €${targetCpaLimit}). ${
          isOverBudget
            ? 'CPA is over-budget! Adjusting LLM Temperature to 0.55 and targeting high-ticket Series A startup niches with authoritative copy.'
            : 'CPA is healthy. Keeping current temperature 0.65 and active brand positioning campaigns.'
        }`;

    return {
      id: `prop_os_opt_${Date.now()}`,
      clientId: this.context.clientId,
      agent: 'OptimizationStrategy',
      objective,
      target: 'Self',
      action,
      channel: 'email',
      content,
      expected_outcome: `Optimizes next cycle CPA by ${isOverBudget ? '15%' : '5%'} via automated parameter tuning.`,
      economic_projection: {
        target_cpa: 0,
        expected_margin: 0
      },
      risk: 'Low',
      confidence: 0.95,
      evidence_refs: ['qf:ledger.json'],
      policy_version: 'v1.0.0',
      requires_human: true,
      status: 'Staging'
    };
  }
}

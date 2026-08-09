import { GrowthProposal } from '../../content/growth-os/GrowthProposal';
import { PerformanceTracker } from './PerformanceTracker';

export interface ExecutionResult {
  success: boolean;
  channel: string;
  outputPayload: any;
  timestamp: string;
}

export class ExecutionEngine {
  public static async executeProposal(proposal: GrowthProposal): Promise<ExecutionResult> {
    if (proposal.status !== 'Approved') {
      throw new Error(`[ExecutionEngine] Cannot execute proposal "${proposal.id}" because its status is "${proposal.status}" (must be "Approved").`);
    }

    console.log(`[ExecutionEngine] Routing proposal "${proposal.id}" to channel adapter: ${proposal.channel}`);

    // Simulation of MCP routing / secure API calls
    const outputPayload = {
      client_id: proposal.clientId,
      post_body: proposal.content,
      destination_channel: proposal.channel,
      credentials_used_safe: `SECRET_KEY_VAULT_${proposal.clientId.toUpperCase()}`,
      dispatched_via_mcp: true
    };

    const result: ExecutionResult = {
      success: true,
      channel: proposal.channel,
      outputPayload,
      timestamp: new Date().toISOString()
    };

    // Log the successful execution in the ledger automatically
    await PerformanceTracker.saveLedgerEntry({
      proposal_id: proposal.id,
      clientId: proposal.clientId,
      agent: proposal.agent,
      expected_cpa: proposal.economic_projection.target_cpa,
      actual_cpa: proposal.economic_projection.target_cpa * 0.9, // Simulated actual CPA within budget!
      dwell_time_seconds: 40.0,
      impressions: 1000,
      clicks: 50,
      saves: 5,
      bookings_count: 2,
      reliability_score: 1.0,
      was_profitable: true
    });

    return result;
  }
}

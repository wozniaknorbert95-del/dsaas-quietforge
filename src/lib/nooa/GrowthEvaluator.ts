import { GrowthProposal } from '../../content/growth-os/GrowthProposal';
import { EvaluationResult } from '../../content/growth-os/EvaluationResult';

export class GrowthEvaluator {
  public static evaluateProposalOutcome(proposal: GrowthProposal, actualMetrics: {
    impressions: number;
    clicks: number;
    dwell_time_seconds: number;
    saves: number;
    bookings_count: number;
    actual_cpa: number;
  }): EvaluationResult {
    const targetCpa = proposal.economic_projection.target_cpa;
    const actualCpa = actualMetrics.actual_cpa;

    // Reliability score degrades if actual CPA is higher than target CPA
    let reliability_score = 1.0;
    if (targetCpa > 0 && actualCpa > targetCpa) {
      reliability_score = Math.max(0.1, 1.0 - ((actualCpa - targetCpa) / targetCpa));
    }

    const was_profitable = targetCpa > 0 ? actualCpa < proposal.economic_projection.expected_margin : true;

    return {
      proposal_id: proposal.id,
      clientId: proposal.clientId,
      agent: proposal.agent,
      expected_cpa: targetCpa,
      actual_cpa: actualCpa,
      dwell_time_seconds: actualMetrics.dwell_time_seconds,
      impressions: actualMetrics.impressions,
      clicks: actualMetrics.clicks,
      saves: actualMetrics.saves,
      bookings_count: actualMetrics.bookings_count,
      reliability_score: parseFloat(reliability_score.toFixed(2)),
      was_profitable
    };
  }
}

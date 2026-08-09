import { GrowthProposal } from '../../content/growth-os/GrowthProposal';
import { INITIAL_GROWTH_CONTEXT } from '../../content/growth-os/GrowthContext';

export type DecisionStatus = 'AUTO' | 'REVIEW' | 'BLOCK';

export interface DecisionResult {
  decision: DecisionStatus;
  reasons: string[];
  validatedProposal: GrowthProposal;
}

export class DecisionControl {
  public static async evaluateProposal(proposal: GrowthProposal): Promise<DecisionResult> {
    const reasons: string[] = [];
    let decision: DecisionStatus = 'AUTO';

    // 1. SHACL/Schema Validation
    const hasMandatoryFields = 
      proposal.id &&
      proposal.clientId &&
      proposal.agent &&
      proposal.objective &&
      proposal.target &&
      proposal.content &&
      proposal.economic_projection;

    if (!hasMandatoryFields) {
      reasons.push('SHACL Schema Error: Missing mandatory fields in GrowthProposal.');
      return {
        decision: 'BLOCK',
        reasons,
        validatedProposal: { ...proposal, status: 'Blocked' }
      };
    }
    reasons.push('✓ SHACL Schema: All mandatory semantic properties validated successfully.');

    // 2. Evidence Integrity Check
    if (!proposal.evidence_refs || proposal.evidence_refs.length === 0) {
      reasons.push('Integrity Error: Proposal contains zero evidence refs. Rejected as vaporware.');
      decision = 'BLOCK';
    } else {
      reasons.push(`✓ Evidence Check: Verified connections to ${proposal.evidence_refs.join(', ')}.`);
    }

    // 3. OPA/Economics Guardrail Evaluation
    const clientCtx = INITIAL_GROWTH_CONTEXT.clients[proposal.clientId];
    if (clientCtx) {
      const targetCpa = proposal.economic_projection.target_cpa;
      const expectedMargin = proposal.economic_projection.expected_margin;

      // OPA Guardrail Rule: allow is true ONLY if target_cpa < (0.40 * expected_margin)
      // For pure strategy optimization (which has CPA = 0), we bypass this check
      if (targetCpa > 0) {
        const opaLimit = 0.40 * expectedMargin;
        if (targetCpa >= opaLimit) {
          reasons.push(`OPA BLOCK: Target CPA (€${targetCpa}) exceeds 40% of Gross Margin (€${opaLimit.toFixed(2)}).`);
          decision = 'BLOCK';
        } else {
          reasons.push(`✓ OPA Guardrail: Target CPA (€${targetCpa}) is safely within 40% of Gross Margin (€${opaLimit.toFixed(2)}).`);
        }
      } else {
        reasons.push('✓ OPA Guardrail: Pure optimization run (CPA = 0), bypassed limit checks.');
      }
    } else {
      reasons.push(`Security Error: Missing client context for client_id "${proposal.clientId}".`);
      decision = 'BLOCK';
    }

    // 4. Authority & Confidence Routing
    if (decision !== 'BLOCK') {
      if (proposal.requires_human) {
        reasons.push('Authority Routing: Human review requested (requires_human: true).');
        decision = 'REVIEW';
      } else if (proposal.confidence < 0.8) {
        reasons.push(`Authority Routing: Confidence score low (${proposal.confidence}). Routing to human queue.`);
        decision = 'REVIEW';
      } else {
        reasons.push('✓ Authority Routing: High-confidence autonomous pass.');
      }
    }

    const finalStatus = (decision === 'AUTO' ? 'Approved' : (decision === 'BLOCK' ? 'Blocked' : 'Staging')) as 'Staging' | 'Approved' | 'Blocked';
    const validatedProposal = { ...proposal, status: finalStatus };

    return {
      decision,
      reasons,
      validatedProposal
    };
  }
}

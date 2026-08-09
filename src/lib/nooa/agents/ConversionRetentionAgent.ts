import { NooaAgent } from '../NooaAgentRuntimeAdapter';
import { GrowthProposal } from '../../../content/growth-os/GrowthProposal';
import { ClientContext } from '../../../content/growth-os/GrowthContext';

export class ConversionRetentionAgent extends NooaAgent {
  constructor(context: ClientContext) {
    super('ConversionRetention', context);
  }

  public async runConversion(target: string): Promise<GrowthProposal> {
    const isQuietforge = this.context.clientId === 'quietforge';
    const objective = `Secure upfront booking deposit pre-payments for ${target}`;
    const action = `Connect 9-step client checkout to client-side Mollie payment link.`;
    
    const content = isQuietforge
      ? `Stop writing free offertes. If a prospect isn't willing to pay €290 for an Automation Map, they are not your client. Our 9-step wizard qualifies budgets and charges them instantly via Mollie. No pay, no consulting.`
      : `FlexGrafik designs high-friction qualification checkouts. By requiring pre-qualification details and budget signals, we eliminate low-tier inquiries and funnel only serious, high-intent B2B clients to your pipeline.`;

    return {
      id: `prop_cr_conv_${Date.now()}`,
      clientId: this.context.clientId,
      agent: 'ConversionRetention',
      objective,
      target,
      action,
      channel: 'email',
      content,
      expected_outcome: isQuietforge ? 'Converts 22% of site traffic' : 'Filters out 80% of unviable design requests',
      economic_projection: {
        target_cpa: isQuietforge ? 180 : 800,
        expected_margin: isQuietforge ? 2000 : 12000
      },
      risk: 'Medium',
      confidence: 0.88,
      evidence_refs: ['qf:WizardCashEngine', 'qf:LeadMagnetGame'],
      policy_version: 'v1.0.0',
      requires_human: false,
      status: 'Staging'
    };
  }

  public async runRetention(target: string): Promise<GrowthProposal> {
    const isQuietforge = this.context.clientId === 'quietforge';
    const objective = `Deploy Managed Automation care retainers for ${target}`;
    const action = `Automate system governance scans and conflict reports via VCMS.`;

    const content = isQuietforge
      ? `Moje systemy działają w tle. Robię nic, bo mogę. Our Managed Automation care retainers keep your back-office and checkout systems healthy 24/7. No bugs, no database leaks, and zero manual checkups.`
      : `Ensure your brand’s conversion system is governed 24/7. FlexGrafik’s Managed Automation partner tiers include continuous design integrity scans, font speed preconnections, and layout shift prevention.`;

    return {
      id: `prop_cr_ret_${Date.now()}`,
      clientId: this.context.clientId,
      agent: 'ConversionRetention',
      objective,
      target,
      action,
      channel: 'linkedin',
      content,
      expected_outcome: 'Builds recurring MRR retainers ranging from €99/mo to €890/mo.',
      economic_projection: {
        target_cpa: isQuietforge ? 90 : 350,
        expected_margin: isQuietforge ? 500 : 3000
      },
      risk: 'Low',
      confidence: 0.92,
      evidence_refs: ['qf:JadziaCOI', 'qf:VcmsScan'],
      policy_version: 'v1.0.0',
      requires_human: false,
      status: 'Staging'
    };
  }
}

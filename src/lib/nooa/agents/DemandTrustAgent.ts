import { NooaAgent } from '../NooaAgentRuntimeAdapter';
import { GrowthProposal } from '../../../content/growth-os/GrowthProposal';
import { ClientContext } from '../../../content/growth-os/GrowthContext';

export class DemandTrustAgent extends NooaAgent {
  constructor(context: ClientContext) {
    super('DemandTrust', context);
  }

  public async runDiscovery(target: string): Promise<GrowthProposal> {
    const isQuietforge = this.context.clientId === 'quietforge';
    const objective = `Identify key operational or administrative leaks for ${target}`;
    const action = `Run semantic KvK and website audit matching to C1 patchers.`;
    const expected_outcome = isQuietforge 
      ? 'Before: 15 hours of manual email filter vs After: 2 minutes automated triage'
      : 'Before: 6 months of freelancer delays vs After: 10 days high-end launch';

    const content = isQuietforge
      ? `Staring at Outlook at 15:30 on Friday in Rotterdam instead of enjoying a Heineken on the terrace? You are still manually qualifying unvetted leads and verifying KvK numbers. Stop. Let the Inbox Killer handle the triage.`
      : `Is your amorous startup website costing you credibility with VC investors? Stop hiring cheap freelancers who drag design projects for 6 months. Get a professional B2B conversion platform designed by FlexGrafik in weeks, not months.`;

    return {
      id: `prop_dt_disc_${Date.now()}`,
      clientId: this.context.clientId,
      agent: 'DemandTrust',
      objective,
      target,
      action,
      channel: 'linkedin',
      content,
      expected_outcome,
      economic_projection: {
        target_cpa: isQuietforge ? 150 : 600,
        expected_margin: isQuietforge ? 1000 : 8000
      },
      risk: 'Low',
      confidence: 0.9,
      evidence_refs: ['qf:prospects.ttl', 'qf:patchers.ttl'],
      policy_version: 'v1.0.0',
      requires_human: true,
      status: 'Staging'
    };
  }

  public async runDemand(target: string, channel: 'linkedin' | 'facebook' | 'youtube'): Promise<GrowthProposal> {
    const isQuietforge = this.context.clientId === 'quietforge';
    const objective = `Create highly targeted direct-attack ${channel} campaign for ${target}`;
    const action = `Apply ${this.context.brandVoice.archetype} voice rules to drive traffic to /book-discovery/`;
    
    let content = '';
    if (channel === 'linkedin') {
      content = isQuietforge
        ? `Dutch ZZP builders and tradesmen: Stop spending your Rotterdam sunny afternoons typing custom "offerte" sheets and chasing late BTW invoice payments. Our Wizard Cash Engine automates quoting, checks KvK, and requests upfront Mollie deposit pre-payments.`
        : `Startup Founders: If your website looks like a template SaaS from 2018, you are throwing Brand Equity in the trash. FlexGrafik builds high-end B2B Conversion platforms that command investor respect and drive ROI from day one.`;
    } else {
      content = isQuietforge
        ? `Is your car wrapping shop losing hours calculating material dimensions and sending manual quotes? Let our wrapping intake wizard automate square-meters vinyl estimates and request Mollie booking deposits automatically.`
        : `Startups: Stop bleeding customer leads to poorly designed pages. Elevate your status and command premium positioning with a fully automated, bespoke branding experience from FlexGrafik.`;
    }

    return {
      id: `prop_dt_dem_${Date.now()}`,
      clientId: this.context.clientId,
      agent: 'DemandTrust',
      objective,
      target,
      action,
      channel,
      content,
      expected_outcome: `Drives L3 conversions to book an Automation Map with target CPA below ${this.context.maxCpaLimit} EUR.`,
      economic_projection: {
        target_cpa: isQuietforge ? 120 : 500,
        expected_margin: isQuietforge ? 1200 : 10000
      },
      risk: 'Low',
      confidence: 0.85,
      evidence_refs: ['qf:brand-voice.json', 'qf:hot-matches.ttl'],
      policy_version: 'v1.0.0',
      requires_human: channel === 'youtube',
      status: 'Staging'
    };
  }
}

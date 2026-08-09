import { GrowthCapabilityType } from '../../content/growth-os/GrowthCapability';
import { AgentType } from '../../content/growth-os/AgentType';

export class NooaCapabilitiesRegistry {
  private static agentCapabilities: Record<AgentType, GrowthCapabilityType[]> = {
    DemandTrust: ['Discovery', 'Demand', 'Trust', 'Knowledge'],
    ConversionRetention: ['Conversion', 'Retention', 'Trust'],
    OptimizationStrategy: ['Optimization', 'Knowledge', 'Discovery']
  };

  public static getCapabilitiesForAgent(agentId: AgentType): GrowthCapabilityType[] {
    return this.agentCapabilities[agentId] || [];
  }

  public static verifyCapabilityAssignment(agentId: AgentType, capabilityId: GrowthCapabilityType): boolean {
    const assigned = this.getCapabilitiesForAgent(agentId);
    return assigned.includes(capabilityId);
  }
}

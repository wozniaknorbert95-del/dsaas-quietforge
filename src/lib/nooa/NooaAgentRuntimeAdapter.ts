import { AgentType } from '../../content/growth-os/AgentType';
import { ClientContext } from '../../content/growth-os/GrowthContext';

export interface CapabilityParameters {
  [key: string]: unknown;
}

export interface CapabilityResult {
  success: boolean;
  capabilityId: string;
  parameters: CapabilityParameters;
  clientId: string;
}

export class NooaAgent {
  public id: AgentType;
  public context: ClientContext;

  constructor(id: AgentType, context: ClientContext) {
    this.id = id;
    this.context = context;
  }

  public async runCapability(capabilityId: string, parameters: CapabilityParameters): Promise<CapabilityResult> {
    console.log(`[NOOA Agent ${this.id}] Running capability ${capabilityId} for Client: ${this.context.brandName}`, parameters);
    return {
      success: true,
      capabilityId,
      parameters,
      clientId: this.context.clientId
    };
  }
}

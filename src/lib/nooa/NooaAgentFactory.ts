import { NooaAgent } from './NooaAgentRuntimeAdapter';
import { AgentType } from '../../content/growth-os/AgentType';
import { GrowthContext, INITIAL_GROWTH_CONTEXT } from '../../content/growth-os/GrowthContext';

export class NooaAgentFactory {
  public static createAgent(
    agentId: AgentType, 
    clientId: 'flexgrafik' | 'quietforge', 
    context: GrowthContext = INITIAL_GROWTH_CONTEXT
  ): NooaAgent {
    const clientCtx = context.clients[clientId];
    return new NooaAgent(agentId, clientCtx);
  }

  public static createAllAgents(
    clientId: 'flexgrafik' | 'quietforge', 
    context: GrowthContext = INITIAL_GROWTH_CONTEXT
  ): Record<AgentType, NooaAgent> {
    return {
      DemandTrust: this.createAgent('DemandTrust', clientId, context),
      ConversionRetention: this.createAgent('ConversionRetention', clientId, context),
      OptimizationStrategy: this.createAgent('OptimizationStrategy', clientId, context)
    };
  }
}

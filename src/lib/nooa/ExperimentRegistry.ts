export interface Experiment {
  id: string;
  clientId: 'flexgrafik' | 'quietforge';
  name: string;
  variant_a_proposal_id: string;
  variant_b_proposal_id: string;
  status: 'Active' | 'Completed';
  winner_proposal_id?: string;
}

export class ExperimentRegistry {
  private static experiments: Experiment[] = [
    {
      id: 'exp_01_wrapping_headline',
      clientId: 'quietforge',
      name: 'Car Wrapping Headline Direct-Attack Test',
      variant_a_proposal_id: 'prop_dt_dem_01',
      variant_b_proposal_id: 'prop_dt_dem_02',
      status: 'Active'
    }
  ];

  public static getExperimentsByClient(clientId: 'flexgrafik' | 'quietforge'): Experiment[] {
    return this.experiments.filter(exp => exp.clientId === clientId);
  }

  public static completeExperiment(experimentId: string, winnerId: string): boolean {
    const exp = this.experiments.find(e => e.id === experimentId);
    if (exp) {
      exp.status = 'Completed';
      exp.winner_proposal_id = winnerId;
      return true;
    }
    return false;
  }
}

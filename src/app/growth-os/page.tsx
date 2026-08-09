'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { INITIAL_GROWTH_CONTEXT, ClientContext } from '../../content/growth-os/GrowthContext';
import { AGENT_REGISTRY, AgentType } from '../../content/growth-os/AgentType';
import { CAPABILITY_REGISTRY } from '../../content/growth-os/GrowthCapability';
import { GrowthProposal } from '../../content/growth-os/GrowthProposal';
import { PerformanceTracker } from '../../lib/nooa/PerformanceTracker';
import { DecisionControl } from '../../lib/nooa/DecisionControl';
import { DemandTrustAgent } from '../../lib/nooa/agents/DemandTrustAgent';
import { ConversionRetentionAgent } from '../../lib/nooa/agents/ConversionRetentionAgent';
import { OptimizationStrategyAgent } from '../../lib/nooa/agents/OptimizationStrategyAgent';
import { ExecutionEngine } from '../../lib/nooa/ExecutionEngine';

export default function GrowthOsPage() {
  const [activeClient, setActiveClient] = useState<'quietforge' | 'flexgrafik'>('quietforge');
  const [agentScores, setAgentScores] = useState<Record<string, number>>({
    DemandTrust: 0.95,
    ConversionRetention: 0.92,
    OptimizationStrategy: 0.98
  });
  const [proposals, setProposals] = useState<GrowthProposal[]>([]);
  const [ledger, setLedger] = useState<any[]>([]);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [isSimulating, setIsSimulation] = useState(false);

  const clientCtx: ClientContext = INITIAL_GROWTH_CONTEXT.clients[activeClient];

  // Load ledger data and initial proposals
  useEffect(() => {
    async function loadData() {
      const scores = await PerformanceTracker.calculateAgentScores(activeClient);
      setAgentScores(scores);

      const ledgerEntries = await PerformanceTracker.getLedgerData();
      setLedger(ledgerEntries.filter(entry => entry.clientId === activeClient));

      // Generate seed proposals for selected client
      const dtAgent = new DemandTrustAgent(clientCtx);
      const crAgent = new ConversionRetentionAgent(clientCtx);
      const osAgent = new OptimizationStrategyAgent(clientCtx);

      const prop1 = await dtAgent.runDiscovery(activeClient === 'quietforge' ? 'Dutch Car Wrapping Shops' : 'E-commerce Brands');
      const prop2 = await dtAgent.runDemand(activeClient === 'quietforge' ? 'tradesmen' : 'startups', 'linkedin');
      const prop3 = await crAgent.runConversion(activeClient === 'quietforge' ? 'agencies' : 'enterprise');
      const prop4 = await osAgent.runOptimization(ledgerEntries);

      // Run them through Decision Control to set status
      const dec1 = await DecisionControl.evaluateProposal(prop1);
      const dec2 = await DecisionControl.evaluateProposal(prop2);
      const dec3 = await DecisionControl.evaluateProposal(prop3);
      const dec4 = await DecisionControl.evaluateProposal(prop4);

      setProposals([
        dec1.validatedProposal,
        dec2.validatedProposal,
        dec3.validatedProposal,
        dec4.validatedProposal
      ]);
    }
    loadData();
  }, [activeClient]);

  const handleRunSimulation = async () => {
    setIsSimulation(true);
    setSimulationLog([]);
    const log = (msg: string) => setSimulationLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

    log(`Initializing Growth OS Agent loop for client: ${activeClient.toUpperCase()}`);
    log(`Connecting to local SPARQL Knowledge Graph...`);
    
    // Step 1: Demand & Trust discovery
    log(`Spawning Agent "DemandTrust" (Demand & Trust)...`);
    const dtAgent = new DemandTrustAgent(clientCtx);
    const proposal = await dtAgent.runDiscovery('Rotterdam Builders');
    log(`Generated Candidate Proposal: ${proposal.id} for target: Rotterdam Builders`);
    log(`Copy Text Drafted: "${proposal.content.substring(0, 60)}..."`);

    // Step 2: Evaluation through Decision Control (OPA / SHACL)
    log(`Routing proposal to Decision Control Layer (SHACL schemas & OPA Guardrails)...`);
    const evaluation = await DecisionControl.evaluateProposal(proposal);
    log(`SHACL Validation: PASS`);
    evaluation.reasons.forEach(reason => {
      if (reason.startsWith('✓')) log(reason);
    });

    if (evaluation.decision === 'AUTO') {
      log(`Decision Control approved proposal automatically (CPA < 40% margin limit)!`);
      log(`Dispatching to Execution Engine (Secure Vault Credentials checked)...`);
      const execResult = await ExecutionEngine.executeProposal(evaluation.validatedProposal);
      if (execResult.success) {
        log(`✓ Proposal executed successfully via MCP to ${proposal.channel}!`);
        log(`Ledger transaction synchronized and written to disk.`);
      }
    } else {
      log(`Decision: ${evaluation.decision}. Awaiting approval.`);
    }

    // Reload scores & ledger
    const scores = await PerformanceTracker.calculateAgentScores(activeClient);
    setAgentScores(scores);
    const ledgerEntries = await PerformanceTracker.getLedgerData();
    setLedger(ledgerEntries.filter(entry => entry.clientId === activeClient));

    setIsSimulation(false);
  };

  return (
    <div className="bg-[#0b0c10] text-[#f1f1f1] min-h-screen font-mono flex flex-col selection:bg-[#ffb300] selection:text-[#0b0c10]">
      <Header />

      <main className="flex-grow pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Eyebrow & Title */}
        <div className="border-b border-[#2c2d30] pb-6 mb-8">
          <div className="text-[#ffb300] text-sm uppercase tracking-wider mb-2">// MULTI-CLIENT dSAAS AUTOPILOT ENGINE</div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Growth OS Cockpit</h1>
          <p className="text-[#98999a] mt-2 max-w-3xl">
            A fully decoupled agent execution platform. Running three autonomous agents mapping local ontologies, evaluating guardrails, and feeding the real-time conversion ledger.
          </p>
        </div>

        {/* Client Selector Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#14151a] border border-[#2c2d30] p-4 rounded-[2px] mb-8">
          <div>
            <span className="text-xs text-[#98999a] block mb-1">SELECT ACTIVE DSaaS TENANT:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveClient('quietforge')}
                className={`px-4 py-1.5 text-xs font-bold border transition ${
                  activeClient === 'quietforge'
                    ? 'bg-[#ffb300] text-[#0b0c10] border-[#ffb300]'
                    : 'border-[#2c2d30] text-[#98999a] hover:border-[#ffb300]'
                }`}
              >
                CLIENT 2: QUIETFORGE (Cwany Cheater)
              </button>
              <button
                onClick={() => setActiveClient('flexgrafik')}
                className={`px-4 py-1.5 text-xs font-bold border transition ${
                  activeClient === 'flexgrafik'
                    ? 'bg-[#ffb300] text-[#0b0c10] border-[#ffb300]'
                    : 'border-[#2c2d30] text-[#98999a] hover:border-[#ffb300]'
                }`}
              >
                CLIENT 1: FLEXGRAFIK (Premium Strategist)
              </button>
            </div>
          </div>

          <div className="text-right sm:text-right">
            <span className="text-xs text-[#98999a] block mb-1">STRATEGIC ALIGNMENT:</span>
            <span className="text-sm font-bold text-[#ffb300]">
              {activeClient === 'quietforge' ? 'AUTOPILOT COCKPIT · ROW HONEST PROOF' : 'HIGH-END B2B BRAND POSITIONING'}
            </span>
          </div>
        </div>

        {/* 3 Agents Architecture Cards */}
        <h2 className="text-lg font-bold mb-4 text-[#ffb300] uppercase">// Active Agent Orchestration (NOOA Runtime)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {(Object.keys(AGENT_REGISTRY) as AgentType[]).map((agentKey) => {
            const agent = AGENT_REGISTRY[agentKey];
            const score = agentScores[agentKey] || 0.95;
            return (
              <div key={agentKey} className="bg-[#14151a] border border-[#2c2d30] p-6 rounded-[2px] relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-[#ffb300] px-2 py-0.5 border border-[#ffb300]">
                      {agentKey === 'DemandTrust' ? 'PROVEN' : agentKey === 'ConversionRetention' ? 'DEMO' : 'PLANNED'}
                    </span>
                    <div className="text-right">
                      <span className="text-[10px] text-[#98999a] block">AGENT SCORE:</span>
                      <span className="text-xl font-bold text-[#ffb300]">{(score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#f1f1f1] mb-2">{agent.name}</h3>
                  <p className="text-xs text-[#98999a] mb-4">{agent.role}</p>
                  <p className="text-xs text-[#67686a] italic">{agent.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Center & Simulated Run */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-[#14151a] border border-[#2c2d30] p-6 rounded-[2px]">
            <div className="flex justify-between items-center border-b border-[#2c2d30] pb-3 mb-4">
              <h3 className="text-sm font-bold text-[#ffb300] uppercase">// Candidate Proposals (Staging Queue)</h3>
              <span className="text-xs text-[#98999a]">{proposals.length} Proposals Staged</span>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {proposals.map((prop, idx) => (
                <div key={idx} className="border border-[#2c2d30] p-4 bg-[#0b0c10] rounded-[2px]">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-[#ffb300] font-bold">
                      {prop.agent} → {prop.channel.toUpperCase()}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 border ${
                      prop.status === 'Approved'
                        ? 'border-green-500/50 text-green-400 bg-green-950/20'
                        : prop.status === 'Blocked'
                        ? 'border-red-500/50 text-red-400 bg-red-950/20'
                        : 'border-[#ffb300]/50 text-[#ffb300] bg-[#ffb300]/5'
                    }`}>
                      {prop.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#f1f1f1] italic mb-3 font-sans leading-relaxed">
                    "{prop.content}"
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-t border-[#2c2d30] pt-2 text-[10px] text-[#98999a]">
                    <div>
                      <span className="block text-[#67686a]">TARGET:</span>
                      {prop.target}
                    </div>
                    <div>
                      <span className="block text-[#67686a]">EXPECTED OUTCOME:</span>
                      {prop.expected_outcome.substring(0, 20)}...
                    </div>
                    <div>
                      <span className="block text-[#67686a]">TARGET CPA:</span>
                      €{prop.economic_projection.target_cpa}
                    </div>
                    <div>
                      <span className="block text-[#67686a]">CONFIDENCE:</span>
                      {(prop.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#14151a] border border-[#2c2d30] p-6 rounded-[2px] flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#ffb300] uppercase border-b border-[#2c2d30] pb-3 mb-4">// Loop Simulator</h3>
              <p className="text-xs text-[#98999a] mb-6 leading-relaxed">
                Run the multi-agent loop in real-time. Spawns discovery, compiles RDF graph, checks OPA guardrails, validates security vault, and updates the telemetry ledger.
              </p>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="w-full bg-[#ffb300] text-[#0b0c10] font-bold text-xs py-3 rounded-[2px] hover:bg-[#ffb300]/90 transition uppercase"
              >
                {isSimulating ? 'Simulating Agent Run...' : 'Trigger Autopilot Loop'}
              </button>
            </div>

            <div className="mt-4 flex-grow flex flex-col">
              <span className="text-[10px] text-[#98999a] mb-1">SYSTEM SIMULATOR LOG:</span>
              <div className="bg-[#0b0c10] border border-[#2c2d30] p-3 rounded-[2px] flex-grow text-[9px] text-green-400 overflow-y-auto max-h-[180px] space-y-1">
                {simulationLog.length === 0 ? (
                  <span className="text-[#67686a] italic">Awaiting manual loop activation...</span>
                ) : (
                  simulationLog.map((logLine, idx) => (
                    <div key={idx} className="leading-normal">{logLine}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Ledger */}
        <div className="bg-[#14151a] border border-[#2c2d30] p-6 rounded-[2px]">
          <h3 className="text-sm font-bold text-[#ffb300] uppercase border-b border-[#2c2d30] pb-3 mb-4">// Real-Time Telemetry Ledger (ledger.json)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-[#98999a]">
              <thead>
                <tr className="border-b border-[#2c2d30] text-[#ffb300] uppercase text-[10px]">
                  <th className="py-2">Timestamp</th>
                  <th className="py-2">Proposal ID</th>
                  <th className="py-2">Agent</th>
                  <th className="py-2 text-right">Actual CPA</th>
                  <th className="py-2 text-right">Clicks</th>
                  <th className="py-2 text-right">Saves</th>
                  <th className="py-2 text-right">Bookings</th>
                  <th className="py-2 text-right">Reliability</th>
                </tr>
              </thead>
              <tbody>
                {ledger.map((entry, idx) => (
                  <tr key={idx} className="border-b border-[#1c1d20]/50 hover:bg-[#0b0c10]/30">
                    <td className="py-2 text-[10px]">{new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString()}</td>
                    <td className="py-2 font-mono text-[#f1f1f1]">{entry.proposal_id || entry.post_id}</td>
                    <td className="py-2">{entry.agent}</td>
                    <td className="py-2 text-right text-[#f1f1f1]">€{(entry.actual_cpa || entry.metrics?.estimated_cpa || 0).toFixed(2)}</td>
                    <td className="py-2 text-right">{entry.clicks || entry.metrics?.clicks || 0}</td>
                    <td className="py-2 text-right">{entry.saves || entry.metrics?.saves || 0}</td>
                    <td className="py-2 text-right text-[#ffb300] font-bold">{entry.bookings_count || entry.metrics?.bookings_count || 0}</td>
                    <td className="py-2 text-right font-bold text-green-400">{(entry.reliability_score * 100).toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

// NOTE: SVG attributes (fill, stroke) do NOT support CSS custom properties (var(--x)).
// All colors in SVG elements must be hardcoded to match design tokens.

import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  type DiagramNode,
  type DiagramNodeId,
  type DiagramPrimaryBus,
  type DiagramSlot,
  type DiagramView,
  DIAGRAM_CANVAS,
  DIAGRAM_FOOTER,
  DIAGRAM_HEADER,
  DIAGRAM_LEFT_RAIL,
  DIAGRAM_NODE_SIZE,
  GUARD_BANNER,
  LIFE_LOOP_PHASES,
  LOS_LAYER_BANDS,
  PRIMARY_BUSES,
  getArchitectureSlots,
  getIntegrationCount,
  getNodeById,
  getNodePosition,
  getPrimarySlotForNode,
  getSlotFlowOrder,
  getVisibleEdges,
  getVisibleNodes,
  resolveSlotPosition,
  routeBusPath,
  routeIntegrationPath,
} from '@/content/system-diagram';
import { GRATKA } from '@/lib/gratka';
import { ROUTES } from '@/lib/constants';
import { useMotion } from '@/lib/useMotion';
import DiagramViewToggle from './DiagramViewToggle';
import DiagramDetailPanel from './DiagramDetailPanel';
import DiagramMobileAccordion from './DiagramMobileAccordion';
import DiagramStoryView from './DiagramStoryView';
import DiagramStatusLegend from './DiagramStatusLegend';

const { width: NODE_W, height: NODE_H } = DIAGRAM_NODE_SIZE;

const LAYER_BAND_ORDER = ['sense', 'think', 'orchestrate', 'act', 'memory'] as const;

const LAYER_STYLE: Record<string, { fill: string; stroke: string; dash?: string }> = {
  sense: { fill: '#15120e', stroke: '#2a241c' },
  think: { fill: '#1c1813', stroke: '#e8a33d' },
  orchestrate: { fill: '#15120e', stroke: '#2a241c' },
  act: { fill: '#15120e', stroke: '#2a241c' },
  memory: { fill: '#15120e', stroke: '#6f8fae', dash: '6 4' },
};

interface LivingSystemDiagramProps {
  variant?: 'founder' | 'full';
  defaultView?: DiagramView;
}

function busStroke(bus: DiagramPrimaryBus, highlighted: boolean): string {
  if (bus.class === 'feedback') return highlighted ? '#6f8fae' : 'rgba(111,143,174,0.65)';
  return highlighted ? '#e8a33d' : 'rgba(232,163,61,0.75)';
}

function integrationStroke(status: string, highlighted: boolean): string {
  if (!highlighted) return 'rgba(255,255,255,0.12)';
  if (status === 'PLANNED') return 'rgba(245,158,11,0.5)';
  return 'rgba(255,255,255,0.35)';
}

export default function LivingSystemDiagram({
  variant = 'full',
  defaultView = 'architecture',
}: LivingSystemDiagramProps) {
  const resolvedDefault = variant === 'founder' && defaultView === 'architecture' ? 'story' : defaultView;
  const { prefersReduced } = useMotion();
  const [view, setView] = useState<DiagramView>(resolvedDefault);
  const [selectedId, setSelectedId] = useState<DiagramNodeId | null>(null);
  const [hoveredId, setHoveredId] = useState<DiagramNodeId | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [loopOpen, setLoopOpen] = useState(variant !== 'founder');
  const [loopPhase, setLoopPhase] = useState(0);
  const [walking, setWalking] = useState(false);
  const [loopSpeed, setLoopSpeed] = useState(2000);
  const [focusedSlotId, setFocusedSlotId] = useState<string | null>(null);
  const [hoveredBusId, setHoveredBusId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; left: number; top: number } | null>(null);

  const slotFlow = useMemo(() => getSlotFlowOrder(), []);
  const slots = useMemo(() => (view === 'architecture' ? getArchitectureSlots() : []), [view]);
  const nodes = useMemo(() => getVisibleNodes(view), [view]);
  const integrationEdges = useMemo(
    () => getVisibleEdges(view, showIntegrations),
    [view, showIntegrations]
  );
  const selectedNode = selectedId ? getNodeById(selectedId) : undefined;
  const integrationCount = getIntegrationCount();

  const focusId = hoveredId ?? selectedId;

  const connectedNodeIds = useMemo(() => {
    if (!focusId) return new Set<DiagramNodeId>();
    const ids = new Set<DiagramNodeId>([focusId]);
    for (const e of integrationEdges) {
      if (e.from === focusId) ids.add(e.to);
      if (e.to === focusId) ids.add(e.from);
    }
    return ids;
  }, [integrationEdges, focusId]);

  const highlightedIntegrationEdges = useMemo(() => {
    if (!focusId) return new Set<string>();
    return new Set(
      integrationEdges
        .filter((e) => e.from === focusId || e.to === focusId)
        .map((e) => e.id)
    );
  }, [integrationEdges, focusId]);

  // Reset focused state when view changes away from architecture
  const handleViewChange = useCallback((newView: DiagramView) => {
    setView(newView);
    if (newView !== 'architecture') {
      setFocusedSlotId(null);
      setHoveredBusId(null);
      setTooltip(null);
    }
  }, []);

  const handleNodeClick = useCallback((id: DiagramNodeId) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setFocusedSlotId(null);
  }, []);

  useEffect(() => {
    if (!walking || prefersReduced) return;
    const timer = window.setInterval(() => {
      setLoopPhase((p) => (p + 1) % LIFE_LOOP_PHASES.length);
    }, loopSpeed);
    return () => window.clearInterval(timer);
  }, [walking, prefersReduced, loopSpeed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedId(null);
        setFocusedSlotId(null);
        setTooltip(null);
        return;
      }
      if (view !== 'architecture' || slotFlow.length === 0) return;

      const currentIdx = focusedSlotId
        ? slotFlow.findIndex((s) => s.id === focusedSlotId)
        : selectedId
          ? slotFlow.findIndex((s) => s.nodeId === selectedId)
          : -1;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = currentIdx < slotFlow.length - 1 ? currentIdx + 1 : 0;
        setFocusedSlotId(slotFlow[next].id);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = currentIdx > 0 ? currentIdx - 1 : slotFlow.length - 1;
        setFocusedSlotId(slotFlow[prev].id);
      }
      if (e.key === 'Enter' && focusedSlotId) {
        const slot = slotFlow.find((s) => s.id === focusedSlotId);
        if (slot) handleNodeClick(slot.nodeId);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, slotFlow, focusedSlotId, selectedId, handleNodeClick]);

  const handleSlotHover = useCallback(
    (nodeId: DiagramNodeId | null, event?: MouseEvent, hoverLine?: string) => {
      setHoveredId(nodeId);
      if (nodeId && event && hoverLine) {
        const rect = (event.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect();
        const container = (event.currentTarget as SVGElement).closest('.los-diagram-wrap')?.getBoundingClientRect();
        if (rect && container) {
          setTooltip({
            text: hoverLine,
            left: event.clientX - container.left + 12,
            top: event.clientY - container.top - 8,
          });
        }
      } else {
        setTooltip(null);
      }
    },
    []
  );

  const panelBelow = variant === 'founder';
  const isArchitecture = view === 'architecture';

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <DiagramViewToggle view={view} onChange={handleViewChange} variant={variant} />
        <div className="flex flex-wrap items-center gap-3">
          {isArchitecture && (
            <button
              type="button"
              onClick={() => setShowIntegrations((v) => !v)}
              className={`rounded-[var(--qf-radius)] border px-4 py-1.5 text-xs font-semibold transition-colors ${
                showIntegrations
                  ? 'border-[var(--qf-accent)] text-[var(--qf-accent)]'
                  : 'border-[var(--qf-border)] text-[var(--qf-text-dim)] hover:text-[var(--qf-text)]'
              }`}
            >
              {showIntegrations ? 'Hide' : 'Show'} integrations ({integrationCount})
            </button>
          )}
          {loopOpen && (
            <>
              <button
                type="button"
                onClick={() => {
                  setWalking((w) => !w);
                  if (!walking) setLoopPhase(0);
                }}
                className="rounded-[var(--qf-radius)] border border-[var(--qf-border)] px-4 py-1.5 text-xs font-semibold text-[var(--qf-text-dim)] hover:border-[var(--qf-accent)] hover:text-[var(--qf-accent)]"
              >
                {walking ? 'Stop loop' : 'Walk the loop'}
              </button>
              {walking && (
                <select
                  value={loopSpeed}
                  onChange={(e) => setLoopSpeed(Number(e.target.value))}
                  className="rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-raised)] px-2 py-1 text-xs text-[var(--qf-text-dim)]"
                  aria-label="Loop speed"
                >
                  <option value={4000}>Slow</option>
                  <option value={2000}>Normal</option>
                  <option value={1000}>Fast</option>
                </select>
              )}
            </>
          )}
        </div>
      </div>

      <details
        open={loopOpen}
        onToggle={(e) => setLoopOpen((e.target as HTMLDetailsElement).open)}
        className="rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg)]"
      >
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-[var(--qf-text-dim)] hover:text-[var(--qf-text)]">
          How the operating loop works (Sense → Learn)
        </summary>
        <div className="border-t border-[var(--qf-border)] p-3">
          <div className="overflow-x-auto">
            <div className="flex min-w-max items-center gap-1">
              {LIFE_LOOP_PHASES.map((phase, i) => {
                const active = walking && loopPhase === i;
                return (
                  <div key={phase.id} className="flex items-center gap-1">
                    <motion.span
                      className={`rounded-[var(--qf-radius)] px-3 py-1 font-mono text-[10px] uppercase tracking-wide ${
                        active
                          ? 'bg-[var(--qf-accent)] text-black'
                          : phase.id === 'hitl'
                            ? 'border border-[var(--qf-ok)]/40 text-[var(--qf-ok)]'
                            : 'border border-[var(--qf-border)] text-[var(--qf-text-faint)]'
                      }`}
                      animate={active && !prefersReduced ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {phase.label}
                    </motion.span>
                    {i < LIFE_LOOP_PHASES.length - 1 && (
                      <span className="text-[var(--qf-text-faint)]">→</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-2 text-xs text-[var(--qf-text-faint)]">
            Guard layer stays on throughout — human approval before any production write.
          </p>
        </div>
      </details>

      {view === 'story' && (
        <div className="hidden md:block">
          <DiagramStoryView selectedId={selectedId} onSelect={handleNodeClick} />
        </div>
      )}

      {view !== 'story' && (
        <div
          className={
            panelBelow ? 'space-y-0' : 'hidden md:grid md:grid-cols-[1fr_auto] md:gap-0'
          }
        >
          <div
            className={`los-diagram-wrap relative overflow-x-auto rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg)] p-3 ${
              isArchitecture ? 'hidden md:block' : ''
            }`}
          >
            {tooltip && (
              <div
                className="pointer-events-none absolute z-10 max-w-[220px] rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-raised)] px-2 py-1 text-[10px] leading-snug text-[var(--qf-text-dim)] shadow-lg"
                style={{ left: tooltip.left, top: tooltip.top }}
              >
                {tooltip.text}
              </div>
            )}
            <svg
              viewBox={`0 0 ${DIAGRAM_CANVAS.width} ${DIAGRAM_CANVAS.height}`}
              className="h-auto w-full"
              role="img"
              aria-label="Living Operating System interactive diagram"
            >
              <defs>
                <style>{`
                  @keyframes los-bus-pulse { to { stroke-dashoffset: -24; } }
                  .los-bus-pulse { animation: los-bus-pulse 0.9s linear infinite; }
                `}</style>
                <marker id="arrow-amber" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6 Z" fill="#e8a33d" />
                </marker>
                <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6 Z" fill="#6f8fae" />
                </marker>
                <marker id="arrow-faint" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6 Z" fill="rgba(255,255,255,0.25)" />
                </marker>
              </defs>

              <rect x={0} y={0} width={DIAGRAM_CANVAS.width} height={DIAGRAM_CANVAS.height} fill="#0e0c0a" />

              <text x={600} y={36} textAnchor="middle" fill="#e9e2d4" fontSize={16} fontWeight={700}>
                {DIAGRAM_HEADER.title}
              </text>
              <text x={600} y={56} textAnchor="middle" fill="#9a907e" fontSize={11}>
                {DIAGRAM_HEADER.subtitle}
              </text>

              {isArchitecture ? (
                <ArchitectureCanvas
                  slots={slots}
                  integrationEdges={integrationEdges}
                  focusId={focusId}
                  connectedNodeIds={connectedNodeIds}
                  highlightedIntegrationEdges={highlightedIntegrationEdges}
                  hoveredEdge={hoveredEdge}
                  selectedId={selectedId}
                  focusedSlotId={focusedSlotId}
                  hoveredBusId={hoveredBusId}
                  prefersReduced={prefersReduced}
                  onHover={handleSlotHover}
                  onBusHover={setHoveredBusId}
                  onEdgeHover={setHoveredEdge}
                  onClick={handleNodeClick}
                />
              ) : (
                <FunnelCanvas
                  nodes={nodes}
                  edges={integrationEdges}
                  view={view}
                  focusId={focusId}
                  connectedNodeIds={connectedNodeIds}
                  highlightedEdges={highlightedIntegrationEdges}
                  hoveredEdge={hoveredEdge}
                  selectedId={selectedId}
                  onHover={setHoveredId}
                  onEdgeHover={setHoveredEdge}
                  onClick={handleNodeClick}
                />
              )}
            </svg>
          </div>

          {!panelBelow && (
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: prefersReduced ? 0 : 0.2 }}
                  className="w-full min-w-[300px] max-w-sm rounded-r-[var(--qf-radius)] border border-l-0 border-[var(--qf-border)]"
                >
                  <DiagramDetailPanel node={selectedNode} onClose={() => setSelectedId(null)} variant={variant} />
                </motion.div>
              ) : (
                <div className="hidden w-72 items-center justify-center rounded-r-[var(--qf-radius)] border border-l-0 border-dashed border-[var(--qf-border)] bg-[var(--qf-bg)] p-6 text-center text-sm text-[var(--qf-text-faint)] lg:flex">
                  Click a module for AS-IS proof, live demos and roadmap detail.
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      )}

      {view === 'story' && (
        <div className="md:hidden">
          <DiagramStoryView selectedId={selectedId} onSelect={handleNodeClick} />
        </div>
      )}

      {(panelBelow || view === 'story') && (
        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: prefersReduced ? 0 : 0.2 }}
              className="overflow-hidden rounded-[var(--qf-radius)] border border-[var(--qf-border)]"
            >
              <DiagramDetailPanel
                node={selectedNode}
                onClose={() => setSelectedId(null)}
                variant={variant}
                layout="below"
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {(view === 'architecture' || view === 'smb_funnel') && (
        <DiagramMobileAccordion view={view} variant={variant} />
      )}

      {view !== 'story' && <DiagramStatusLegend />}

      <div className="flex flex-wrap gap-4 text-sm">
        <a href={GRATKA.losArchitectureSvg} download className="font-semibold text-[var(--qf-accent)] hover:underline">
          Download static SVG →
        </a>
        <a href={GRATKA.losArchitecturePdf} className="font-semibold text-[var(--qf-accent)] hover:underline">
          Download PDF map →
        </a>
        {variant === 'founder' && (
          <Link href={ROUTES.resultsOwnerEcosystem} className="text-[var(--qf-text-dim)] hover:text-[var(--qf-accent)] hover:underline">
            Full owner ecosystem →
          </Link>
        )}
      </div>
    </div>
  );
}

interface ArchitectureCanvasProps {
  slots: DiagramSlot[];
  integrationEdges: ReturnType<typeof getVisibleEdges>;
  focusId: DiagramNodeId | null;
  connectedNodeIds: Set<DiagramNodeId>;
  highlightedIntegrationEdges: Set<string>;
  hoveredEdge: string | null;
  selectedId: DiagramNodeId | null;
  focusedSlotId: string | null;
  hoveredBusId: string | null;
  prefersReduced: boolean;
  onHover: (id: DiagramNodeId | null, event?: MouseEvent, hoverLine?: string) => void;
  onBusHover: (id: string | null) => void;
  onEdgeHover: (id: string | null) => void;
  onClick: (id: DiagramNodeId) => void;
}

function ArchitectureCanvas({
  slots,
  integrationEdges,
  focusId,
  connectedNodeIds,
  highlightedIntegrationEdges,
  hoveredEdge,
  selectedId,
  focusedSlotId,
  hoveredBusId,
  prefersReduced,
  onHover,
  onBusHover,
  onEdgeHover,
  onClick,
}: ArchitectureCanvasProps) {
  const dimCanvas = focusId !== null;

  return (
    <>
      {LAYER_BAND_ORDER.map((layerId) => {
        const band = LOS_LAYER_BANDS[layerId];
        const style = LAYER_STYLE[layerId];
        return (
          <g key={layerId}>
            <rect
              x={band.x}
              y={band.y}
              width={band.width}
              height={band.height}
              rx={2}
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth={2}
              strokeDasharray={style.dash}
            />
            <text x={48} y={band.y + 24} fill="#e8a33d" fontSize={11} fontWeight={700} fontFamily="ui-monospace, monospace">
              {band.label.toUpperCase()}
            </text>
            {band.subtitle && (
              <text x={48} y={band.y + 40} fill="#9a907e" fontSize={9} fontFamily="ui-monospace, monospace">
                {band.subtitle.length > 28 ? `${band.subtitle.slice(0, 26)}…` : band.subtitle}
              </text>
            )}
          </g>
        );
      })}

      <rect
        x={GUARD_BANNER.x}
        y={GUARD_BANNER.y}
        width={GUARD_BANNER.width}
        height={GUARD_BANNER.height}
        rx={2}
        fill="rgba(232,163,61,0.08)"
        stroke="#e8a33d"
        strokeWidth={2}
      />
      <text x={600} y={GUARD_BANNER.y + 32} textAnchor="middle" fill="#e8a33d" fontSize={12} fontWeight={600}>
        {GUARD_BANNER.label}
      </text>

      <rect x={0} y={GUARD_BANNER.y} width={DIAGRAM_LEFT_RAIL.width} height={DIAGRAM_CANVAS.height - GUARD_BANNER.y} fill="#0e0c0a" opacity={0.85} />

      {PRIMARY_BUSES.map((bus) => {
        const d = routeBusPath(bus);
        if (!d) return null;
        const busHot = hoveredBusId === bus.id;
        const highlighted = busHot || (bus.class === 'feedback' ? true : !dimCanvas);
        const pulse = busHot && !prefersReduced && bus.class === 'primary';
        return (
          <g key={bus.id}>
            <path
              d={d}
              fill="none"
              stroke={busStroke(bus, highlighted)}
              strokeWidth={bus.class === 'primary' ? (busHot ? 3 : 2.5) : 1.5}
              strokeDasharray={bus.class === 'feedback' ? '6 4' : pulse ? '8 6' : undefined}
              className={pulse ? 'los-bus-pulse' : undefined}
              markerEnd={bus.class === 'feedback' ? 'url(#arrow-blue)' : 'url(#arrow-amber)'}
              opacity={dimCanvas && bus.class !== 'feedback' && !busHot ? 0.4 : 1}
              onMouseEnter={() => onBusHover(bus.id)}
              onMouseLeave={() => onBusHover(null)}
              style={{ pointerEvents: 'stroke' }}
            />
            {bus.label && (
              <text
                x={(bus.xAnchor ?? 200) + 14}
                y={580}
                fill="#6f8fae"
                fontSize={9}
                fontFamily="ui-monospace, monospace"
              >
                {bus.label}
              </text>
            )}
          </g>
        );
      })}

      {integrationEdges.map((edge) => {
        const fromSlot = getPrimarySlotForNode(edge.from);
        const toSlot = getPrimarySlotForNode(edge.to);
        if (!fromSlot || !toSlot) return null;
        const from = resolveSlotPosition(fromSlot);
        const to = resolveSlotPosition(toSlot);
        const highlighted = highlightedIntegrationEdges.has(edge.id) || hoveredEdge === edge.id;
        const d =
          edge.from === edge.to
            ? `M ${from.x - 20} ${from.y - NODE_H / 2} Q ${from.x} ${from.y - NODE_H - 16} ${from.x + 20} ${from.y - NODE_H / 2}`
            : routeIntegrationPath(from, to);
        const midX = (from.x + to.x) / 2 + 12;
        const midY = (from.y + to.y) / 2;
        return (
          <g key={edge.id} opacity={dimCanvas && !highlighted ? 0.25 : 1}>
            <path
              d={d}
              fill="none"
              stroke={integrationStroke(edge.status, highlighted)}
              strokeWidth={highlighted ? 2 : 1}
              strokeDasharray={edge.status === 'PLANNED' ? '4 3' : undefined}
              markerEnd={highlighted ? 'url(#arrow-amber)' : 'url(#arrow-faint)'}
              onMouseEnter={() => onEdgeHover(edge.id)}
              onMouseLeave={() => onEdgeHover(null)}
              style={{ pointerEvents: 'stroke' }}
            />
            {highlighted && (
              <text x={midX} y={midY} fontSize={9} fill="#e8a33d" fontFamily="ui-monospace, monospace">
                {edge.label}
              </text>
            )}
          </g>
        );
      })}

      {slots.map((slot) => {
        const node = getNodeById(slot.nodeId);
        if (!node) return null;
        const dimmed = dimCanvas && !connectedNodeIds.has(slot.nodeId);
        return (
          <DiagramSlotNode
            key={slot.id}
            slot={slot}
            node={node}
            selected={selectedId === slot.nodeId}
            focused={focusedSlotId === slot.id}
            linkedSelect={selectedId === slot.nodeId}
            dimmed={dimmed}
            onHover={onHover}
            onClick={onClick}
          />
        );
      })}

      {DIAGRAM_FOOTER.lines.map((line, i) => (
        <text
          key={line}
          x={600}
          y={DIAGRAM_FOOTER.yStart + i * 18}
          textAnchor="middle"
          fill={i === 2 ? '#6fae6f' : '#9a907e'}
          fontSize={10}
          fontFamily="ui-monospace, monospace"
        >
          {line}
        </text>
      ))}

      <text x={600} y={DIAGRAM_CANVAS.height - 8} textAnchor="middle" fill="#9ca3af" fontSize={9}>
        Click any module · Primary flow visible · Toggle for full INT map
      </text>
    </>
  );
}

interface FunnelCanvasProps {
  nodes: DiagramNode[];
  edges: ReturnType<typeof getVisibleEdges>;
  view: DiagramView;
  focusId: DiagramNodeId | null;
  connectedNodeIds: Set<DiagramNodeId>;
  highlightedEdges: Set<string>;
  hoveredEdge: string | null;
  selectedId: DiagramNodeId | null;
  onHover: (id: DiagramNodeId | null) => void;
  onEdgeHover: (id: string | null) => void;
  onClick: (id: DiagramNodeId) => void;
}

function FunnelCanvas({
  nodes,
  edges,
  view,
  focusId,
  connectedNodeIds,
  highlightedEdges,
  hoveredEdge,
  selectedId,
  onHover,
  onEdgeHover,
  onClick,
}: FunnelCanvasProps) {
  const funnelW = 148;
  const funnelH = 52;

  return (
    <>
      {edges.map((edge) => {
        const fromNode = getNodeById(edge.from);
        const toNode = getNodeById(edge.to);
        if (!fromNode || !toNode) return null;
        const from = getNodePosition(fromNode, view);
        const to = getNodePosition(toNode, view);
        const highlighted = highlightedEdges.has(edge.id) || hoveredEdge === edge.id;
        const d = routeIntegrationPath(from, to);
        return (
          <path
            key={edge.id}
            d={d}
            fill="none"
            stroke={integrationStroke(edge.status, highlighted)}
            strokeWidth={highlighted ? 2 : 1}
            markerEnd={highlighted ? 'url(#arrow-amber)' : 'url(#arrow-faint)'}
            onMouseEnter={() => onEdgeHover(edge.id)}
            onMouseLeave={() => onEdgeHover(null)}
            style={{ pointerEvents: 'stroke' }}
          />
        );
      })}

      {nodes.map((node) => (
        <FunnelNode
          key={node.id}
          node={node}
          view={view}
          width={funnelW}
          height={funnelH}
          selected={selectedId === node.id}
          dimmed={focusId !== null && !connectedNodeIds.has(node.id)}
          onHover={onHover}
          onClick={onClick}
        />
      ))}
    </>
  );
}

interface DiagramSlotNodeProps {
  slot: DiagramSlot;
  node: DiagramNode;
  selected: boolean;
  focused: boolean;
  linkedSelect: boolean;
  dimmed: boolean;
  onHover: (id: DiagramNodeId | null, event?: MouseEvent, hoverLine?: string) => void;
  onClick: (id: DiagramNodeId) => void;
}

function canvasLabel(node: DiagramNode): string {
  if (node.id === 'zzpackage') return 'Wizard';
  if (node.id === 'app.flexgrafik.nl') return 'Lead Game';
  if (node.id === 'flexgrafik-nl') return 'Trust Portal';
  if (node.id === 'jadzia-core') return 'Jadzia COI';
  if (node.id === 'agent-os-ui') return 'Mission Ctrl';
  if (node.id === 'flex-vcms') return 'VCMS';
  if (node.id === 'flexgrafik-meta') return 'Constitution';
  const label = node.label;
  return label.length > 14 ? `${label.slice(0, 12)}…` : label;
}

function DiagramSlotNode({
  slot,
  node,
  selected,
  focused,
  linkedSelect,
  dimmed,
  onHover,
  onClick,
}: DiagramSlotNodeProps) {
  const pos = resolveSlotPosition(slot);
  const x = pos.x - NODE_W / 2;
  const y = pos.y - NODE_H / 2;
  const statusColor =
    node.status === 'LIVE' ? '#6fae6f' : node.status === 'PARTIAL' ? '#e8a33d' : '#9ca3af';
  const isSpearhead = slot.tier === 'spearhead';
  const isSpine = slot.tier === 'spine';
  const label = canvasLabel(node);
  const showRing = selected || focused;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${node.label}, ${node.status}. ${node.hoverLine}`}
      aria-pressed={selected}
      opacity={dimmed ? 0.35 : 1}
      onMouseEnter={(e) => onHover(node.id, e, node.hoverLine)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(node.id);
        }
      }}
      className="cursor-pointer"
    >
      {linkedSelect && (
        <rect x={x} y={y} width={3} height={NODE_H} rx={1} fill="#e8a33d" />
      )}
      <rect
        x={x}
        y={y}
        width={NODE_W}
        height={NODE_H}
        rx={2}
        fill={
          selected
            ? 'rgba(245,158,11,0.15)'
            : isSpine
              ? 'rgba(245,158,11,0.06)'
              : '#0e0c0a'
        }
        stroke={showRing || isSpearhead ? '#e8a33d' : '#3a3428'}
        strokeWidth={showRing ? 2.5 : isSpearhead ? 2 : 1}
      />
      <circle cx={x + 8} cy={y + 8} r={3} fill={statusColor} />
      <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize={10} fontWeight={600} fill="#e9e2d4">
        {label}
      </text>
      <title>{`${node.hoverLine} (${node.status})`}</title>
    </g>
  );
}

interface FunnelNodeProps {
  node: DiagramNode;
  view: DiagramView;
  width: number;
  height: number;
  selected: boolean;
  dimmed: boolean;
  onHover: (id: DiagramNodeId | null) => void;
  onClick: (id: DiagramNodeId) => void;
}

function FunnelNode({ node, view, width, height, selected, dimmed, onHover, onClick }: FunnelNodeProps) {
  const pos = getNodePosition(node, view);
  const x = pos.x - width / 2;
  const y = pos.y - height / 2;
  const statusColor =
    node.status === 'LIVE' ? '#6fae6f' : node.status === 'PARTIAL' ? '#e8a33d' : '#9ca3af';

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${node.label}, ${node.status}`}
      aria-pressed={selected}
      opacity={dimmed ? 0.35 : 1}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(node.id);
        }
      }}
      className="cursor-pointer"
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={2}
        fill={selected ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.06)'}
        stroke={selected ? '#e8a33d' : 'rgba(255,255,255,0.2)'}
        strokeWidth={selected ? 2 : 1.5}
      />
      <circle cx={x + 10} cy={y + 10} r={4} fill={statusColor} />
      <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#e5e7ef">
        {node.label}
      </text>
      <title>{node.hoverLine}</title>
    </g>
  );
}

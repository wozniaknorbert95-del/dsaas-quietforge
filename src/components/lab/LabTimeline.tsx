'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import type { LabMilestone } from '@/content/lab';

interface LabTimelineProps {
  milestones: readonly LabMilestone[];
}

function milestoneHash(milestone: LabMilestone): string {
  return `stage-${milestone.sequence}`;
}

export default function LabTimeline({ milestones }: LabTimelineProps) {
  const [selectedId, setSelectedId] = useState(milestones[0]?.id ?? '');
  const selected = milestones.find((milestone) => milestone.id === selectedId) ?? milestones[0];

  useEffect(() => {
    const selectFromHash = () => {
      const hash = window.location.hash.slice(1);
      const match = milestones.find((milestone) => milestoneHash(milestone) === hash);
      if (match) {
        setSelectedId(match.id);
      }
    };

    selectFromHash();
    window.addEventListener('hashchange', selectFromHash);
    return () => window.removeEventListener('hashchange', selectFromHash);
  }, [milestones]);

  if (!selected) {
    return null;
  }

  const selectMilestone = (milestone: LabMilestone) => {
    setSelectedId(milestone.id);
    window.history.replaceState(null, '', `#${milestoneHash(milestone)}`);
    trackEvent('lab_timeline_select', {
      milestone_id: milestone.id,
      sequence: milestone.sequence,
    });
  };

  return (
    <div className="qf-lab-timeline">
      <ol className="qf-lab-timeline-list" aria-label="Build sequence">
        {milestones.map((milestone) => {
          const isSelected = milestone.id === selected.id;
          return (
            <li key={milestone.id} id={milestoneHash(milestone)}>
              <button
                type="button"
                className={`qf-lab-stage ${isSelected ? 'qf-lab-stage--selected' : ''}`}
                aria-current={isSelected ? 'step' : undefined}
                aria-controls="lab-milestone-detail"
                aria-expanded={isSelected}
                onClick={() => selectMilestone(milestone)}
              >
                <span className="qf-lab-stage-number">{milestone.sequence}</span>
                <span>
                  <span className="qf-lab-stage-eyebrow">{milestone.eyebrow}</span>
                  <span className="qf-lab-stage-title">{milestone.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <article id="lab-milestone-detail" className="qf-lab-milestone" aria-live="polite">
        <div className="qf-lab-milestone-meta">
          <span>{selected.status}</span>
          <span>{selected.readiness}</span>
          <span>{selected.evidenceClass}</span>
        </div>
        <p className="qf-lab-milestone-tenant">{selected.tenant}</p>
        <h3>{selected.title}</h3>
        <div className="qf-lab-milestone-grid">
          <div>
            <h4>Problem</h4>
            <p>{selected.problem}</p>
          </div>
          <div>
            <h4>Built</h4>
            <p>{selected.built}</p>
          </div>
          <div>
            <h4>Observable effect</h4>
            <p>{selected.effect}</p>
          </div>
          <div>
            <h4>What was learned</h4>
            <p>{selected.learned}</p>
          </div>
        </div>
        <div className="qf-lab-milestone-boundary">
          <p>
            <strong>What is not proven:</strong> {selected.notProven}
          </p>
          <p>
            <strong>Ownership:</strong> {selected.ownership}
          </p>
          <p>
            <strong>Last verified:</strong> {selected.reviewed}
          </p>
        </div>
      </article>
    </div>
  );
}

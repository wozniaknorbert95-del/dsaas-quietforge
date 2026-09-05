'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { LAB_EVIDENCE_POLICY, type LabLink, type LabMilestone } from '@/content/lab';

interface LabEvidenceBenchProps {
  milestones: readonly LabMilestone[];
}

function EvidenceAction({ link, milestone }: { link: LabLink; milestone: LabMilestone }) {
  if (!link.href || link.availability !== 'verified-public') {
    return <span className="qf-lab-evidence-private">{link.label}</span>;
  }

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="qf-lab-evidence-link"
        onClick={() =>
          trackEvent('lab_external_demo_click', {
            milestone_id: milestone.id,
            destination_id: link.label,
          })
        }
      >
        {link.label} <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className="qf-lab-evidence-link"
      onClick={() =>
        trackEvent('lab_evidence_open', {
          milestone_id: milestone.id,
          destination_id: link.label,
        })
      }
    >
      {link.label} <span aria-hidden="true">→</span>
    </Link>
  );
}

export default function LabEvidenceBench({ milestones }: LabEvidenceBenchProps) {
  return (
    <div className="qf-lab-evidence-grid">
      {milestones.map((milestone) => {
        const link = milestone.links[0];
        return (
          <article key={milestone.id} className="qf-lab-evidence-card">
            <div className="qf-lab-evidence-topline">
              <span>{milestone.eyebrow}</span>
              <span>{milestone.proofTier}</span>
            </div>
            <h3>{milestone.title}</h3>
            <p>{link?.note ?? milestone.evidenceClass}</p>
            <p className="qf-lab-evidence-meta">{milestone.tenant}</p>
            <p className="qf-lab-evidence-meta">Last verified: {milestone.reviewed}</p>
            <p className="qf-lab-evidence-meta">{link?.href ? 'Public link verified' : 'No public repository or dashboard link'}</p>
            {link ? <EvidenceAction link={link} milestone={milestone} /> : null}
          </article>
        );
      })}
      <p className="qf-lab-evidence-policy">
        Evidence owner: {LAB_EVIDENCE_POLICY.owner}. {LAB_EVIDENCE_POLICY.privacy} {LAB_EVIDENCE_POLICY.publicRule}
      </p>
    </div>
  );
}

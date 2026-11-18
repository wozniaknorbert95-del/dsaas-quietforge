/**
 * EmptyState — SH-G1-03 (design-quality-standard §2 "Empty").
 * Says what will live here and how to get started — never a blank box.
 */

'use client';

import type { ReactNode } from 'react';

interface EmptyStateAction {
  label: string;
  onAction?: () => void;
  href?: string;
}

interface EmptyStateProps {
  /** What will live here. */
  title?: string;
  /** How to get started. */
  description?: ReactNode;
  action?: EmptyStateAction;
  className?: string;
}

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'This space fills once you get started.',
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`qf-state-card ${className}`}>
      <p className="qf-state-title">{title}</p>
      <div className="qf-state-text">{description}</div>
      {action ? (
        <div className="qf-state-actions">
          {action.href ? (
            <a className="qf-btn-ghost" href={action.href}>
              {action.label}
            </a>
          ) : (
            <button type="button" className="qf-btn-ghost" onClick={action.onAction}>
              {action.label}
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

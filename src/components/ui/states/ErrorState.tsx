/**
 * ErrorState — SH-G1-03 (design-quality-standard §2 "Error" + "Recovery").
 * Human message (what happened + what to do — never a bare error code),
 * retry with a limit, and after 3 attempts a clear escalation path.
 * User state is preserved by the caller — this component only explains.
 */

'use client';

import type { ReactNode } from 'react';

interface ErrorStateProps {
  /** What happened + what the user can do. Plain language. */
  message: ReactNode;
  title?: string;
  onRetry?: () => void;
  retryLabel?: string;
  /** Attempts so far; >= 3 swaps retry for the escalation path. */
  attempts?: number;
  /** After the retry limit: contact / support route (design §2 Recovery). */
  escalation?: ReactNode;
  /** Undo / safe return affordance. */
  recovery?: ReactNode;
  className?: string;
}

export default function ErrorState({
  message,
  title = 'Something went wrong',
  onRetry,
  retryLabel = 'Try again',
  attempts = 0,
  escalation,
  recovery,
  className = '',
}: ErrorStateProps) {
  const exhausted = attempts >= 3;

  return (
    <div className={`qf-state-card qf-state-card--error ${className}`} role="alert">
      <p className="qf-state-title">{title}</p>
      <div className="qf-state-text">{message}</div>
      <div className="qf-state-actions">
        {onRetry && !exhausted ? (
          <button type="button" className="qf-btn-fill" onClick={onRetry}>
            {retryLabel}
          </button>
        ) : null}
        {recovery}
      </div>
      {exhausted && escalation ? <div className="qf-state-text">{escalation}</div> : null}
    </div>
  );
}

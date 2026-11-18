/**
 * StatesProof — SH-G1-03 visual proof gallery.
 *
 * Compact gallery rendering all six shared UX states (loading / error+recovery /
 * success / empty / disabled / toast) plus a live toast trigger. It is a PROOF
 * artifact, not a page: nothing routes to it yet and no route is created here
 * (a route would trigger the og-route checklist — out of scope for this task).
 *
 * Evidence note (design-quality-standard §5): route-level proof screenshots
 * (przed/po × {375, 768, 1280}) attach in G2, when real flows start using these
 * states. Until then this gallery is the render proof for the reviewer.
 */

'use client';

import { useState, type ReactNode } from 'react';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import SuccessState from './SuccessState';
import EmptyState from './EmptyState';
import DisabledHint from './DisabledHint';
import Toast, { type ToastMessage } from './Toast';

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="qf-state-hint">{label}</p>
      {children}
    </div>
  );
}

export default function StatesProof() {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [attempts, setAttempts] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Cell label="LoadingState">
          <LoadingState label="Generating your mockup…" />
        </Cell>
        <Cell label="ErrorState + Recovery">
          <ErrorState
            message="The generation could not finish. Your brief is saved — try again."
            attempts={attempts}
            onRetry={() => setAttempts((n) => n + 1)}
            escalation={
              <p className="qf-state-hint">
                Tried 3 times? We take over — contact us and we finish it manually.
              </p>
            }
          />
        </Cell>
        <Cell label="SuccessState">
          <SuccessState
            title="Your mockup is ready"
            result="Mockup pack · 1 of 3 versions rendered (PNG, 2400 px)."
            action={{ label: 'Download mockup', href: '#' }}
            secondary={{ label: 'Generate next version', onAction: () => setAttempts(0) }}
          />
        </Cell>
        <Cell label="EmptyState">
          <EmptyState
            title="No versions yet"
            description="Versions appear here once you generate your first mockup."
            action={{ label: 'Start a generation', href: '#' }}
          />
        </Cell>
        <Cell label="DisabledHint">
          <div className="qf-state-card">
            <p className="qf-state-title">Checkout</p>
            <button type="button" className="qf-btn-fill" disabled aria-describedby="hint-minimum">
              Continue to payment
            </button>
            <DisabledHint id="hint-minimum" reason="€70 more to reach the €199 minimum." />
          </div>
        </Cell>
        <Cell label="Toast (max 1 visible)">
          <div className="qf-state-actions">
            <button
              type="button"
              className="qf-btn-ghost"
              onClick={() => setToast({ tone: 'success', message: 'Version saved.' })}
            >
              Show success toast
            </button>
            <button
              type="button"
              className="qf-btn-ghost"
              onClick={() => setToast({ tone: 'error', message: 'Upload failed — try again.' })}
            >
              Show error toast
            </button>
          </div>
        </Cell>
      </div>
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}

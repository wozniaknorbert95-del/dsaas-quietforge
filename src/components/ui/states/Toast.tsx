/**
 * Toast — SH-G1-03 (design-quality-standard §2 "Notification").
 * Standard: bottom-left (mobile bottom-center, never covering the CTA),
 * 4 s auto-dismiss (errors persist until dismissed), dismiss button + auto,
 * `aria-live="polite"` (errors: `assertive`), MAX 1 visible at a time —
 * the single-`toast` API enforces that; callers queue/replace, never stack.
 * Entrance is a ≤160 ms fade, disabled under `prefers-reduced-motion`.
 */

'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export type ToastTone = 'info' | 'success' | 'error';

export interface ToastMessage {
  tone: ToastTone;
  message: string;
}

interface ToastProps {
  /** The one visible toast (null = hidden). Replace, never stack. */
  toast: ToastMessage | null;
  onDismiss: () => void;
  /** Auto-dismiss for non-error tones (default 4000 ms per standard §2). */
  durationMs?: number;
}

const DEFAULT_DURATION_MS = 4000;

export default function Toast({ toast, onDismiss, durationMs = DEFAULT_DURATION_MS }: ToastProps) {
  const onDismissRef = useRef(onDismiss);
  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    // Errors persist until the user dismisses them (standard §2).
    if (!toast || toast.tone === 'error') return undefined;
    const timer = setTimeout(() => onDismissRef.current(), durationMs);
    return () => clearTimeout(timer);
  }, [toast, durationMs]);

  if (!toast) return null;

  const isError = toast.tone === 'error';
  const toneClass = isError ? 'qf-toast--error' : toast.tone === 'success' ? 'qf-toast--success' : '';

  return (
    <div
      className={`qf-toast ${toneClass}`}
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      <p className="qf-toast-message">{toast.message}</p>
      <button type="button" className="qf-toast-dismiss" onClick={onDismiss} aria-label="Dismiss">
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

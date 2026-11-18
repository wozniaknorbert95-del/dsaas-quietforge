/**
 * SuccessState — SH-G1-03 (design-quality-standard §2 "Success").
 * The result stays VISIBLE and there is exactly one unambiguous next action
 * (download / next version / return). `action.href` renders a link (e.g. a
 * download), `action.onAction` a button.
 */

'use client';

import type { ReactNode } from 'react';

interface StateAction {
  label: string;
  onAction?: () => void;
  href?: string;
}

interface SuccessStateProps {
  /** The visible outcome — this is the proof the user came for. */
  result: ReactNode;
  title?: string;
  /** The one clear next action (design §2). */
  action: StateAction;
  secondary?: StateAction;
  className?: string;
}

function Action({ action, primary }: { action: StateAction; primary: boolean }) {
  const classes = primary ? 'qf-btn-fill' : 'qf-btn-ghost';
  if (action.href) {
    return (
      <a className={classes} href={action.href}>
        {action.label}
      </a>
    );
  }
  return (
    <button type="button" className={classes} onClick={action.onAction}>
      {action.label}
    </button>
  );
}

export default function SuccessState({
  result,
  title = 'Done',
  action,
  secondary,
  className = '',
}: SuccessStateProps) {
  return (
    <div className={`qf-state-card qf-state-card--success ${className}`} role="status">
      <p className="qf-state-title">{title}</p>
      <div className="qf-state-text">{result}</div>
      <div className="qf-state-actions">
        <Action action={action} primary />
        {secondary ? <Action action={secondary} primary={false} /> : null}
      </div>
    </div>
  );
}

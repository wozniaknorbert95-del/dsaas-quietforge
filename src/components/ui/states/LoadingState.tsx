/**
 * LoadingState — SH-G1-03 (design-quality-standard §2 "Loading").
 * Skeleton + label so the user knows the system is working; keep the label
 * action-oriented ("…in behandeling") and block double-submit at the caller
 * (disable the trigger while this state is visible).
 * Server-safe: no hooks, no event handlers. Skeleton pulse is disabled under
 * `prefers-reduced-motion` in globals.css.
 */

interface LoadingStateProps {
  /** What is happening right now. Keep it human — no spinners without words. */
  label?: string;
  /** Skeleton rows (1–6). */
  lines?: number;
  className?: string;
}

export default function LoadingState({
  label = 'Working on it…',
  lines = 3,
  className = '',
}: LoadingStateProps) {
  const rows = Array.from({ length: Math.max(1, Math.min(6, lines)) });

  return (
    <div className={`qf-state-card ${className}`} role="status" aria-live="polite" aria-busy="true">
      {rows.map((_, index) => (
        <div
          key={index}
          className={`qf-state-skeleton ${index === 0 ? 'qf-state-skeleton--lg w-2/3' : 'w-full'}`}
          aria-hidden="true"
        />
      ))}
      <p className="qf-state-text">{label}</p>
    </div>
  );
}

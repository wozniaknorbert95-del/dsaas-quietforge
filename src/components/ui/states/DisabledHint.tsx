/**
 * DisabledHint — SH-G1-03 (design-quality-standard §2 "Disabled").
 * Always explain WHY something is blocked (e.g. "€70 more to reach the
 * minimum") — pair the hint with the disabled control via aria-describedby:
 *
 *   <button disabled aria-describedby="hint-minimum">…</button>
 *   <DisabledHint id="hint-minimum" reason="€70 more to reach the minimum" />
 *
 * Server-safe: no hooks, no event handlers.
 */

interface DisabledHintProps {
  /** Why the control is blocked. Plain language, no jargon. */
  reason: string;
  /** Id for aria-describedby wiring on the disabled control. */
  id?: string;
  className?: string;
}

export default function DisabledHint({ reason, id, className = '' }: DisabledHintProps) {
  return (
    <p id={id} className={`qf-state-hint ${className}`} role="note">
      {reason}
    </p>
  );
}

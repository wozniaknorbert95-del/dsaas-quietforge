'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import {
  INTENTS,
  SYSTEMS,
  type IntentId,
  type SystemRecord,
} from '@/content/systems-catalog';

function matchesIntent(system: SystemRecord, intent: IntentId | 'all'): boolean {
  return intent === 'all' || system.intents.includes(intent);
}

export default function IntentSystems({
  heading,
  showRequirements = false,
}: {
  heading: string;
  showRequirements?: boolean;
}) {
  const [intent, setIntent] = useState<IntentId | 'all'>('all');
  const visible = useMemo(
    () => SYSTEMS.filter((system) => matchesIntent(system, intent)),
    [intent]
  );

  return (
    <div>
      <h2 className="mb-[var(--qf-sp-4)] text-[var(--qf-fs-2xl)] font-bold">
        {heading}
      </h2>
      <div className="mb-[var(--qf-sp-6)] flex flex-wrap gap-2" role="tablist" aria-label="Intent">
        <button
          type="button"
          className="qf-intent-chip"
          data-active={intent === 'all'}
          onClick={() => setIntent('all')}
        >
          All
        </button>
        {INTENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="qf-intent-chip"
            data-active={intent === item.id}
            onClick={() => setIntent(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul className="grid gap-[var(--qf-sp-4)] md:grid-cols-2">
        {visible.map((system) => (
          <li key={system.slug}>
            <Card hover interactive>
              <Link href={system.href} className="block no-underline">
                <p className="font-mono text-[var(--qf-fs-xs)] text-[var(--qf-accent)]">
                  {system.status} · {system.intents.join(' · ')}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--qf-text)]">
                  {system.name}
                </h3>
                <p className="mt-2 text-[var(--qf-text-dim)]">{system.tagline}</p>
                <p className="mt-3 text-sm text-[var(--qf-text-faint)]">
                  Typically gives back: {system.typicallyHours}
                </p>
                <p className="text-sm text-[var(--qf-text-faint)]">
                  Replaces: {system.replaces}
                </p>
                {showRequirements ? (
                  <p className="mt-2 text-sm text-[var(--qf-text-dim)]">
                    {system.priceNote} · {system.timeline}
                  </p>
                ) : null}
                <span className="mt-4 inline-block text-sm text-[var(--qf-accent)]">
                  Open system →
                </span>
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

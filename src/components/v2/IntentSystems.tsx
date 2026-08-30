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
import { ROUTES } from '@/lib/constants';

/** Home showcase — 4 flagship systems (site-map §3 v6.0). The rest live on /systems/. */
const FLAGSHIP_SLUGS = ['quote-order-engine', 'inbox-triage', 'company-brain', 'ai-security-audit'];

function matchesIntent(system: SystemRecord, intent: IntentId | 'all'): boolean {
  return intent === 'all' || system.intents.includes(intent);
}

export default function IntentSystems({
  heading,
  showRequirements = false,
  home = false,
}: {
  heading: string;
  showRequirements?: boolean;
  home?: boolean;
}) {
  const [intent, setIntent] = useState<IntentId | 'all'>('all');
  const visible = useMemo(() => {
    const matched = SYSTEMS.filter((system) => matchesIntent(system, intent));
    if (home && intent === 'all') {
      return matched.filter((system) => FLAGSHIP_SLUGS.includes(system.slug));
    }
    return matched;
  }, [intent, home]);

  const isHomeDefault = home && intent === 'all';

  return (
    <div>
      {heading ? (
        <h2 className="qf-sys-h2">{heading}</h2>
      ) : null}
      <div className="qf-intent-chips" role="tablist" aria-label="Intent">
        <button
          type="button"
          className="qf-intent-chip"
          data-active={intent === 'all'}
          aria-pressed={intent === 'all'}
          onClick={() => setIntent('all')}
        >
          All
        </button>
        {INTENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="qf-intent-chip"
            data-intent={item.id}
            data-active={intent === item.id}
            aria-pressed={intent === item.id}
            onClick={() => setIntent(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul className="qf-intent-grid">
        {visible.map((system) => (
          <li key={system.slug}>
            <Card hover interactive>
              <Link href={system.href} className="qf-intent-card-link">
                <p className="qf-intent-card-meta">
                  <span className="qf-sys-badge">{system.statusShort}</span>
                  {' · '}
                  {system.intents.join(' · ')}
                </p>
                <h3 className="qf-intent-card-name">{system.name}</h3>
                <p className="qf-intent-card-tag">{system.tagline}</p>
                <p className="qf-intent-card-hours">
                  Typically gives back: {system.typicallyHours}
                </p>
                <p className="qf-intent-card-hours">Replaces: {system.replaces}</p>
                {showRequirements ? (
                  <p className="qf-intent-card-req">
                    {system.priceNote} · {system.timeline}
                  </p>
                ) : null}
                <span className="qf-intent-card-cta">Open system →</span>
              </Link>
            </Card>
          </li>
        ))}
      </ul>
      {isHomeDefault ? (
        <p className="mt-6">
          <Link href={ROUTES.systems} className="qf-sys-link">
            See all {SYSTEMS.length} systems →
          </Link>
        </p>
      ) : null}
    </div>
  );
}

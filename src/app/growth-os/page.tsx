'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import {
  loadQuietForgeGrowthSnapshot,
  type PlatformGrowthSnapshot,
} from '@/lib/platform/PlatformGrowthClient';

const PENDING: PlatformGrowthSnapshot = {
  connection: 'unavailable',
  platformRelease: 'kanon/0.3.0',
  tenantId: 'quietforge',
  agents: [],
  proposals: [],
  message: 'Connecting to the DSaaS platform…',
};

export default function GrowthOsPage() {
  const [snapshot, setSnapshot] = useState(PENDING);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setSnapshot(await loadQuietForgeGrowthSnapshot());
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    void loadQuietForgeGrowthSnapshot().then((nextSnapshot) => {
      if (active) {
        setSnapshot(nextSnapshot);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#080b11] px-6 py-12 text-[#ece9e2]">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#d0a765]">
              QuietForge · active test tenant
            </p>
            <h1 className="text-4xl font-semibold tracking-tight">Growth OS</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9ba3b2]">
              Tenant projection only. Decisions and generic execution stay in
              dsaas-platform-main and are consumed through the pinned platform contract.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-[#303746] px-4 py-2 text-sm text-[#cbd1dc] transition hover:border-[#d0a765]"
          >
            Back to QuietForge
          </Link>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <StatusCard label="Tenant" value="quietforge" />
          <StatusCard label="Platform release" value={snapshot.platformRelease} />
          <StatusCard
            label="Connection"
            value={loading ? 'checking' : snapshot.connection}
          />
        </section>

        {snapshot.connection !== 'connected' ? (
          <section className="rounded-2xl border border-[#3a3225] bg-[#12100d] p-8">
            <h2 className="text-xl font-medium">Platform projection unavailable</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#b7ad9d]">
              {snapshot.message} QuietForge does not run a copied decision engine or
              synthetic autonomous actions as a fallback.
            </p>
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={loading}
              className="mt-6 rounded-lg bg-[#d0a765] px-4 py-2 text-sm font-semibold text-[#17120b] disabled:opacity-50"
            >
              {loading ? 'Checking…' : 'Check connection'}
            </button>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr]">
            <section>
              <h2 className="mb-4 text-lg font-medium">Virtual employees</h2>
              <div className="space-y-3">
                {snapshot.agents.map((agent) => (
                  <article
                    key={agent.id}
                    className="rounded-xl border border-[#252b36] bg-[#0e1219] p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{agent.name}</h3>
                        <p className="mt-1 text-sm text-[#9099a8]">{agent.role}</p>
                      </div>
                      <span className="text-xs uppercase tracking-wider text-[#d0a765]">
                        {agent.status}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-[#b8bfca]">
                      Score: {agent.score ?? 'not measured'}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-medium">Proposals awaiting review</h2>
              <div className="space-y-3">
                {snapshot.proposals.length === 0 ? (
                  <p className="rounded-xl border border-[#252b36] bg-[#0e1219] p-5 text-sm text-[#9099a8]">
                    No proposals are waiting.
                  </p>
                ) : (
                  snapshot.proposals.map((proposal) => (
                    <article
                      key={proposal.id}
                      className="rounded-xl border border-[#252b36] bg-[#0e1219] p-5"
                    >
                      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-[#d0a765]">
                        <span>{proposal.agent}</span>
                        <span aria-hidden="true">·</span>
                        <span>{proposal.channel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{proposal.status}</span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#c4cad3]">
                        {proposal.summary}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#252b36] bg-[#0e1219] p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[#7f8898]">{label}</p>
      <p className="mt-2 font-medium text-[#ece9e2]">{value}</p>
    </div>
  );
}

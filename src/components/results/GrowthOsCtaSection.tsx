'use client';

import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

export default function GrowthOsCtaSection() {
  return (
    <Section background="surface" padding="large" id="growth-os-cta" className="border-t border-b border-[var(--qf-border)]">
      <Card variant="spearhead" className="p-8 md:p-12">
        <div className="text-center font-mono max-w-3xl mx-auto">
          <span className="text-xs text-[var(--qf-accent)] block mb-2">{'// AUTONOMOUS OPERATIONS DEMO'}</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--qf-text)]">
            Multi-Client Growth OS Platform
          </h2>
          <p className="text-sm text-[var(--qf-text-dim)] mb-6 leading-relaxed max-w-2xl mx-auto">
            Our multi-client dSaaS marketing engine runs autonomous agents checking OPA margin guardrails, compiling RDF Turtle ontologies, and self-tuning LLM temperatures in real-time. Experience the live sandbox cockpit for Quietforge and FlexGrafik.
          </p>
          <div className="inline-block">
            <Link
              href="/growth-os/"
              className="px-6 py-3 bg-[var(--qf-accent)] text-[var(--qf-bg)] font-bold text-xs rounded-[var(--qf-radius)] uppercase hover:bg-[var(--qf-accent)]/90 transition inline-flex items-center gap-2"
            >
              Enter Growth OS Cockpit →
            </Link>
          </div>
        </div>
      </Card>
    </Section>
  );
}
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import FaqItem from '@/components/ui/FaqItem';
import { ROUTES } from '@/lib/constants';
import {
  SYSTEMS,
  relatedSystems,
  systemBySlug,
} from '@/content/systems-catalog';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SYSTEMS.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const system = systemBySlug(slug);
  if (!system) {
    return { title: 'System' };
  }
  return {
    title: `${system.name} — ${system.tagline}`,
    description: system.pains[0],
  };
}

export default async function SystemSpokePage({ params }: Props) {
  const { slug } = await params;
  const system = systemBySlug(slug);
  if (!system) {
    notFound();
  }
  const related = relatedSystems(system);

  return (
    <>
      <Section padding="large">
        <p className="font-mono text-[var(--qf-fs-xs)] text-[var(--qf-accent)]">
          <Link href={ROUTES.systems}>Systems</Link>
          {' / '}
          {system.name}
        </p>
        <p className="mt-3 font-mono text-[var(--qf-fs-xs)] text-[var(--qf-text-faint)]">
          {system.status} · {system.intents.join(' · ')}
        </p>
        <h1 className="mt-3 max-w-3xl text-[var(--qf-fs-3xl)] font-bold tracking-tight">
          {system.name}
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--qf-fs-lg)] text-[var(--qf-text-dim)]">
          {system.tagline}
        </p>
        <p className="mt-3 text-sm text-[var(--qf-text-faint)]">
          {system.timeline} · {system.priceNote}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={ROUTES.bookAScan} className="qf-btn-fill">
            Book the scan first →
          </Link>
        </div>
      </Section>

      <Section>
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold">The problem</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {system.pains.map((pain) => (
            <li key={pain}>
              <Card>
                <p>{pain}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section background="surface">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold">How it works</h2>
        <ol className="space-y-3 text-[var(--qf-text-dim)]">
          {system.steps.map((step, index) => (
            <li key={step}>
              <span className="font-mono text-[var(--qf-accent)]">{index + 1}.</span> {step}
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold">What you get</h2>
        <ul className="grid gap-2 md:grid-cols-2">
          {system.youGet.map((item) => (
            <li key={item} className="text-[var(--qf-text-dim)]">
              — {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section background="surface">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold">ROI example</h2>
        <p className="max-w-2xl text-[var(--qf-text-dim)]">{system.roiExample}</p>
      </Section>

      <Section>
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold">Good to know</h2>
        <div className="space-y-3">
          {system.faq.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </Section>

      <Section background="surface">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold">Works well with</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {related.map((item) => (
            <li key={item.slug}>
              <Card hover interactive>
                <Link href={item.href} className="block">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm text-[var(--qf-text-dim)]">{item.tagline}</p>
                </Link>
              </Card>
            </li>
          ))}
        </ul>
        <Link href={ROUTES.bookAScan} className="qf-btn-fill mt-8 inline-flex">
          Book the scan first →
        </Link>
      </Section>
    </>
  );
}

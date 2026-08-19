import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import FaqItem from '@/components/ui/FaqItem';
import TLDRBox from '@/components/v2/TLDRBox';
import CostOfInaction from '@/components/v2/CostOfInaction';
import ExampleCompany from '@/components/v2/ExampleCompany';
import FeatureGallery from '@/components/v2/FeatureGallery';
import FlowDiagram from '@/components/v2/FlowDiagram';
import { ROUTES, WHATSAPP } from '@/lib/constants';
import {
  SYSTEMS,
  relatedSystems,
  systemBySlug,
} from '@/content/systems-catalog';

interface Props {
  params: Promise<{ slug: string }>;
}

const OG_BY_SLUG: Record<string, string> = {
  'quote-order-engine': '/og/sales-funnel.svg',
  'inbox-triage': '/og/inbox-killer.svg',
  'lead-scout': '/og/lead-magnet-game.svg',
  'owner-cockpit': '/og/solutions.svg',
  'publishing-gate': '/og/solutions.svg',
  'build-release-flow': '/og/solutions.svg',
};

export function generateStaticParams() {
  return SYSTEMS.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const system = systemBySlug(slug);
  if (!system) {
    return { title: 'System' };
  }
  const og = OG_BY_SLUG[slug] ?? '/og/solutions.svg';
  return {
    title: `${system.name} — ${system.tagline}`,
    description: system.tldr.is,
    openGraph: {
      title: `${system.name} | Quietforge`,
      description: system.tldr.is,
      images: [{ url: og, width: 1200, height: 630, alt: system.name }],
    },
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
        <p className="qf-sys-crumb">
          <Link href={ROUTES.systems}>Systems</Link>
          {' / '}
          {system.name}
        </p>
        <p className="qf-sys-status">
          {system.status} · {system.intents.join(' · ')}
        </p>
        <h1 className="qf-sys-h1">{system.name}</h1>
        <p className="qf-sys-tagline">{system.tagline}</p>
        <p className="qf-sys-meta">
          {system.timeline} · {system.priceNote} · {system.integrations}
        </p>
        <div className="qf-sys-cta-row">
          <Link href={ROUTES.bookAScan} className="qf-btn-fill">
            Book the scan first →
          </Link>
          <a
            href={WHATSAPP.url}
            className="qf-hero-cta-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            {WHATSAPP.label}
          </a>
        </div>
        <TLDRBox tldr={system.tldr} />
      </Section>

      <Section>
        <h2 className="qf-sys-h2">What it costs you without this</h2>
        <p className="qf-sys-lead">
          Calm arithmetic, not fear. Hours × €40 —{' '}
          <Link href={ROUTES.proofMethodology} className="qf-sys-link">
            methodology
          </Link>
          .
        </p>
        <CostOfInaction system={system} />
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">A firm like this</h2>
        <ExampleCompany example={system.example} />
      </Section>

      <Section>
        <h2 className="qf-sys-h2">What is actually in the system</h2>
        <p className="qf-sys-lead">
          Features you can point to. Missing pieces stay off this page.
        </p>
        <FeatureGallery features={system.features} />
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">How the flow looks</h2>
        <FlowDiagram
          src={system.flowSrc}
          alt={system.flowAlt}
          caption={system.flowCaption}
        />
      </Section>

      <Section>
        <h2 className="qf-sys-h2">How it works</h2>
        <ol className="qf-sys-steps">
          {system.steps.map((step, index) => (
            <li key={step}>
              <span className="qf-sys-step-n">{index + 1}.</span> {step}
            </li>
          ))}
        </ol>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">What you get</h2>
        <ul className="qf-sys-get">
          {system.youGet.map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
        <p className="qf-sys-lead">
          Approval gates and your repo:{' '}
          <Link href={`${ROUTES.security}#approval-gates`} className="qf-sys-link">
            approval gates
          </Link>
          {' · '}
          <Link href={`${ROUTES.security}#handover`} className="qf-sys-link">
            your repo, day one
          </Link>
          .
        </p>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">The hours in euros</h2>
        <p className="qf-sys-lead">{system.roiExample}</p>
        <p className="qf-sys-lead">
          Same €40/h as above.{' '}
          <Link href={ROUTES.proofMethodology} className="qf-sys-link">
            How we count hours →
          </Link>
        </p>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">Good to know</h2>
        <div className="qf-sys-faq">
          {system.faq.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">Works well with</h2>
        <ul className="qf-sys-related">
          {related.map((item) => (
            <li key={item.slug}>
              <Card hover interactive>
                <Link href={item.href} className="qf-sys-related-link">
                  <h3 className="qf-sys-related-name">{item.name}</h3>
                  <p className="qf-sys-related-tag">{item.tagline}</p>
                </Link>
              </Card>
            </li>
          ))}
        </ul>
        <div className="qf-sys-cta-row">
          <Link href={ROUTES.bookAScan} className="qf-btn-fill">
            Book the scan first →
          </Link>
          <a
            href={WHATSAPP.url}
            className="qf-hero-cta-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            {WHATSAPP.label}
          </a>
        </div>
      </Section>
    </>
  );
}

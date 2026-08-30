import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import FaqItem from '@/components/ui/FaqItem';
import AnalyticsPageView from '@/components/analytics/AnalyticsPageView';
import TLDRBox from '@/components/v2/TLDRBox';
import CostOfInaction from '@/components/v2/CostOfInaction';
import ExampleCompany from '@/components/v2/ExampleCompany';
import FeatureGallery from '@/components/v2/FeatureGallery';
import FlowDiagram from '@/components/v2/FlowDiagram';
import { ROUTES, SITE_URL, WHATSAPP } from '@/lib/constants';
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
  'company-brain': '/og/company-brain.svg',
  'ai-security-audit': '/og/ai-security-audit.svg',
  'custom-ai-agent': '/og/custom-ai-agent.svg',
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

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: system.name,
    serviceType: 'Business automation system',
    description: system.tldr.is,
    url: `${SITE_URL}${system.href}`,
    provider: {
      '@type': 'Organization',
      name: 'Quietforge',
      url: SITE_URL,
    },
    areaServed: 'EU',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Scan first — then a fixed price after scope.',
    },
  };

  return (
    <>
      <AnalyticsPageView event="system_page_view" detail={{ slug }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Section>
        <p className="qf-sys-crumb">
          <Link href={ROUTES.systems}>Systems</Link>
          {' / '}
          {system.name}
        </p>
        <p className="qf-sys-status">
          <span className="qf-sys-badge">{system.status}</span>
          <span className="qf-sys-intents">{system.intents.join(' · ')}</span>
        </p>
        <h1 className="qf-sys-h1">{system.name}</h1>
        <p className="qf-sys-tagline">{system.tagline}</p>
        <p className="qf-sys-meta">
          {system.timeline}
          <span aria-hidden="true"> · </span>
          {system.priceNote}
          <span aria-hidden="true"> · </span>
          {system.integrations}
        </p>
        <div className="qf-sys-cta-row">
          <Link href={ROUTES.bookAScan} className="qf-btn-fill">
            Book a scan →
          </Link>
          <a
            href={WHATSAPP.url}
            className="qf-btn-ghost"
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
          Calm arithmetic, not fear.{' '}
          <Link href={ROUTES.proofMethodology} className="qf-sys-link">
            Methodology
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
        <h2 className="qf-sys-h2">What is in the system</h2>
        <p className="qf-sys-lead">
          Only what we can point to. Missing pieces stay off this page.
        </p>
        <FeatureGallery features={system.features} />
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">How it works</h2>
        <FlowDiagram
          src={system.flowSrc}
          alt={system.flowAlt}
          caption={system.flowCaption}
        />
        <ol className="qf-sys-steps">
          {system.steps.map((step, index) => (
            <li key={step}>
              <span className="qf-sys-step-n">{index + 1}.</span> {step}
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">In the build</h2>
        <ul className="qf-sys-get">
          {system.youGet.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="qf-sys-lead">
          <Link href={`${ROUTES.security}#approval-gates`} className="qf-sys-link">
            Approval gates
          </Link>
          {' · '}
          <Link href={`${ROUTES.security}#handover`} className="qf-sys-link">
            your repo, day one
          </Link>
          .
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
      </Section>

      <section className="qf-final-cta" aria-labelledby="spoke-cta-title">
        <div className="qf-final-cta-inner">
          <h2 id="spoke-cta-title" className="qf-sys-h2">
            Start with the scan
          </h2>
          <p className="qf-final-cta-lead">
            90 minutes. Written report is yours. Then a fixed price — or a clear no.
          </p>
          <div className="qf-sys-cta-row">
            <Link href={ROUTES.bookAScan} className="qf-btn-fill">
              Book a scan →
            </Link>
            <a
              href={WHATSAPP.url}
              className="qf-btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              {WHATSAPP.label}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

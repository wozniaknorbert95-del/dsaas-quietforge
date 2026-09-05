import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import LabEvidenceBench from '@/components/lab/LabEvidenceBench';
import LabPlatformChapter from '@/components/lab/LabPlatformChapter';
import LabTimeline from '@/components/lab/LabTimeline';
import { LAB_MILESTONES, LAB_PAGE } from '@/content/lab';
import { ROUTES, SITE_URL, FLEXGRAFIK_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: "Builder's Lab - What I built in a live owner-operated business",
  description:
    'Follow the systems built for an owner-operated business, from public customer paths to a governed tenant platform. This is implementation proof, not a client case study.',
  alternates: { canonical: `${SITE_URL}${ROUTES.lab}` },
  openGraph: {
    title: "Builder's Lab | Quietforge",
    description:
      'A live owner-operated reference business and build laboratory. I built this before I offered it.',
    url: `${SITE_URL}${ROUTES.lab}`,
    images: [
      {
        url: '/og/lab.svg',
        width: 1200,
        height: 630,
        alt: "Builder's Lab - Quietforge",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Builder's Lab | Quietforge",
    description: 'Implementation proof from a live owner-operated reference business.',
    images: ['/og/lab.svg'],
  },
};

const labJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: "Builder's Lab",
  description: metadata.description,
  url: `${SITE_URL}${ROUTES.lab}`,
  isPartOf: { '@type': 'WebSite', name: 'Quietforge', url: SITE_URL },
  about: {
    '@type': 'Thing',
    name: 'Implementation capability in an owner-operated reference business',
  },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: 9,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: [
      'FlexGrafik Portal',
      'ZZPackage Commerce Surface',
      'Wizard Cash Engine',
      'Bouwplaats Chaos Lead Game',
      'FlexGrafik INSPIRE',
      'Jadzia Operations Command Layer',
      'Agent OS UI / Mission Control',
      'Tenant Platform Core',
      'QuietForge Tenant',
    ].map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
    })),
  },
};

export default function LabPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(labJsonLd) }}
      />

      <Section padding="large" className="qf-lab-hero">
        <div className="qf-lab-hero-grid">
          <div>
            <p className="qf-lab-eyebrow">{LAB_PAGE.eyebrow}</p>
            <h1 className="qf-lab-h1">{LAB_PAGE.title}</h1>
            <p className="qf-lab-lead">{LAB_PAGE.lead}</p>
            <div className="qf-lab-actions">
              <Button
                href={ROUTES.bookAScan}
                withArrow
                size="lg"
                analyticsEvent="cta_book_map_click"
                analyticsDetail={{ location: 'lab_hero' }}
              >
                {LAB_PAGE.primaryCta}
              </Button>
              <a
                href={FLEXGRAFIK_URL}
                className="qf-btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                {LAB_PAGE.referenceCta} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside className="qf-lab-status" aria-label="Builder's Lab status">
            <p className="qf-lab-status-label">Reference boundary</p>
            <ul>
              <li>OWNER-OPERATED REFERENCE BUSINESS</li>
              <li>BUILD LABORATORY</li>
              <li>NOT AN EXTERNAL CLIENT CASE</li>
              <li>PUBLIC LIVE SURFACES</li>
            </ul>
            <p className="qf-lab-status-note">
              FlexGrafik shows what was built and exercised. Verified client outcomes remain a
              separate proof category.
            </p>
          </aside>
        </div>
      </Section>

      <Section id="honesty" background="surface" padding="large">
        <div className="qf-lab-section-header">
          <p className="qf-lab-eyebrow">Read this first</p>
          <h2 className="qf-lab-h2">{LAB_PAGE.honestyTitle}</h2>
        </div>
        <div className="qf-lab-card-grid">
          {LAB_PAGE.honesty.map((item) => (
            <article key={item.title} className="qf-lab-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="proves" padding="large">
        <div className="qf-lab-section-header">
          <p className="qf-lab-eyebrow">Why this matters</p>
          <h2 className="qf-lab-h2">{LAB_PAGE.provesTitle}</h2>
        </div>
        <div className="qf-lab-card-grid qf-lab-card-grid--three">
          {LAB_PAGE.proves.map((item) => (
            <article key={item.title} className="qf-lab-card qf-lab-card--accent">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <p className="qf-lab-hint">
          Looking for verified customer outcomes? <Link href={ROUTES.proof}>See the proof hub</Link>.
        </p>
      </Section>

      <Section id="timeline" background="surface" padding="large">
        <div className="qf-lab-section-header">
          <p className="qf-lab-eyebrow">Build sequence</p>
          <h2 className="qf-lab-h2">{LAB_PAGE.timelineTitle}</h2>
          <p className="qf-lab-section-lead">{LAB_PAGE.timelineLead}</p>
        </div>
        <LabTimeline milestones={LAB_MILESTONES} />
      </Section>

      <Section id="test-bench" padding="large">
        <div className="qf-lab-section-header">
          <p className="qf-lab-eyebrow">Test bench</p>
          <h2 className="qf-lab-h2">{LAB_PAGE.testBenchTitle}</h2>
          <p className="qf-lab-section-lead">{LAB_PAGE.testBenchLead}</p>
        </div>
        <LabEvidenceBench milestones={LAB_MILESTONES} />
      </Section>

      <Section id="connections" background="surface" padding="large">
        <div className="qf-lab-section-header">
          <p className="qf-lab-eyebrow">System connections</p>
          <h2 className="qf-lab-h2">{LAB_PAGE.connectionsTitle}</h2>
        </div>
        <ol className="qf-lab-connections" aria-label="System connection path">
          {['Portal', 'Game / Design Assistant', 'Wizard', 'Payment', 'Operations', 'Governance', 'Tenant Platform'].map(
            (step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </li>
            )
          )}
        </ol>
      </Section>

      <Section id="platform" padding="large">
        <div className="qf-lab-section-header">
          <p className="qf-lab-eyebrow">Current platform</p>
          <h2 className="qf-lab-h2">{LAB_PAGE.platformTitle}</h2>
          <p className="qf-lab-section-lead">{LAB_PAGE.platformLead}</p>
        </div>
        <LabPlatformChapter />
      </Section>

      <Section id="ownership" background="surface" padding="large">
        <div className="qf-lab-section-header">
          <p className="qf-lab-eyebrow">Ownership and handover</p>
          <h2 className="qf-lab-h2">{LAB_PAGE.ownershipTitle}</h2>
          <p className="qf-lab-section-lead">{LAB_PAGE.ownershipLead}</p>
        </div>
        <div className="qf-lab-ownership">
          <p>Public repository visibility does not grant a licence or imply free reuse.</p>
          <p>
            A client receives an agreed client repository, access, documentation and handover.
            The contract defines which parts are client-specific and which reusable framework
            remains with QuietForge.
          </p>
        </div>
      </Section>

      <section className="qf-final-cta" aria-labelledby="lab-final-cta-title">
        <div className="qf-final-cta-inner">
          <p className="qf-lab-eyebrow">Build your version</p>
          <h2 id="lab-final-cta-title" className="qf-lab-h2">
            Start with the leak, not the technology.
          </h2>
          <p className="qf-final-cta-lead">
            The Automation Scan finds the first workflow worth building and gives you a written
            decision before implementation.
          </p>
          <div className="qf-lab-actions">
            <Button
              href={ROUTES.bookAScan}
              withArrow
              size="lg"
              analyticsEvent="cta_book_map_click"
              analyticsDetail={{ location: 'lab_final' }}
            >
              {LAB_PAGE.primaryCta}
            </Button>
            <a
              href={FLEXGRAFIK_URL}
              className="qf-btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              {LAB_PAGE.referenceCta} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

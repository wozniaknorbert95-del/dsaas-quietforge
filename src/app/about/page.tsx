import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SocialLinks from '@/components/ui/SocialLinks';
import { ROUTES, SITE_URL, WHATSAPP } from '@/lib/constants';
import { ABOUT, CTAS, POSITIONING } from '@/content/conversion-copy';
import AboutScrollTracker from '@/components/analytics/AboutScrollTracker';

export const metadata: Metadata = {
  title: 'Norbert · architect of autonomous operating systems',
  description:
    'Norbert Wozniak — architect of autonomous operating systems for small companies. AI speed, engineering discipline, hours given back.',
  openGraph: {
    title: ABOUT.metaTitle,
    description:
      'Architect of autonomous operating systems for small companies. AI speed, engineering discipline, hours given back.',
    url: `${SITE_URL}/about`,
    images: [
      {
        url: '/og/about.svg',
        width: 1200,
        height: 630,
        alt: `About — Norbert, ${POSITIONING.label}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: ABOUT.metaTitle,
    description: 'Architect of autonomous operating systems — you approve, we measure hours given back.',
    images: ['/og/about.svg'],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutScrollTracker />
      <Section padding="large">
        <h1 className="text-[var(--qf-fs-3xl)] font-bold tracking-tight leading-[var(--qf-lh-tight)] mb-6 max-w-3xl">
          {ABOUT.heroTitle}
        </h1>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)] mb-8">
          {ABOUT.heroIntro}
        </p>
        <Button href={ROUTES.bookAScan} withArrow size="lg">
          {CTAS.bookAutomationMap}
        </Button>
        <SocialLinks showLabels className="mt-[var(--qf-sp-6)]" />
      </Section>

      <Section background="surface" padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-6">
          {ABOUT.storyTitle}
        </h2>
        <div className="space-y-4 max-w-[var(--qf-maxw-narrow)]">
          {ABOUT.storyBody.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)]">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          {ABOUT.buildTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ABOUT.buildPillars.map((pillar) => (
            <Card key={pillar.title} className="p-6">
              <h3 className="text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)] mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-[var(--qf-text-dim)]">{pillar.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="surface" padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          {ABOUT.deliverTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ABOUT.deliverPoints.map((point) => (
            <Card key={point.title} className="p-6">
              <h3 className="text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)] mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-[var(--qf-text-dim)]">{point.body}</p>
              <Link href={point.href} className="qf-sys-link mt-3 inline-block text-sm">
                Evidence →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          {ABOUT.currencyTitle}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {ABOUT.currencyPoints.map((item) => (
            <li key={item.slice(0, 24)} className="flex items-start gap-3">
              <span className="text-[var(--qf-ok)] mt-0.5 shrink-0">✓</span>
              <p className="text-[var(--qf-text-dim)]">{item}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section background="surface" padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          {ABOUT.numbersTitle}
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ABOUT.numbers.map((item) => (
            <li key={item.value}>
              <p className="font-mono text-[var(--qf-fs-2xl)] font-bold text-[var(--qf-accent)]">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-[var(--qf-text-dim)]">{item.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          {ABOUT.offClockTitle}
        </h2>
        <p className="text-[var(--qf-text-dim)] max-w-[var(--qf-maxw-narrow)]">
          {ABOUT.offClockBody}
        </p>
      </Section>

      <Section id="lab" background="surface" padding="large">
        <h2 className="mb-6 text-[var(--qf-fs-2xl)] font-bold tracking-tight">
          {ABOUT.labTitle}
        </h2>
        <p className="mb-4 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
          FlexGrafik is a paused owner-operated lab. Systems still exist as heritage. It is
          not a market proof and not the offer. QuietForge sells given-back time, not a
          catalogue of modules.
        </p>
        <p className="max-w-[var(--qf-maxw-narrow)] text-sm text-[var(--qf-text-faint)]">
          Status: LAB: PAUSED. Today the public site talks about QuietForge only.
        </p>
      </Section>

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          {ABOUT.ctaTitle}
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button href={ROUTES.bookAScan} withArrow size="lg">
            {CTAS.bookAutomationMap}
          </Button>
          <a
            href={WHATSAPP.url}
            className="qf-btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask on WhatsApp
          </a>
        </div>
        <p className="mt-6 text-sm text-[var(--qf-text-faint)]">{ABOUT.kvk}</p>
      </Section>
    </>
  );
}

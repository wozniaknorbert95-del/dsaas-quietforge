import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SocialLinks from '@/components/ui/SocialLinks';
import { ROUTES, SITE_URL } from '@/lib/constants';
import { ABOUT, CTAS, POSITIONING } from '@/content/conversion-copy';

export const metadata: Metadata = {
  title: 'Norbert · system builder',
  description:
    'Norbert Wozniak — system builder for small businesses. AI speed, engineering discipline, hours given back.',
  openGraph: {
    title: ABOUT.metaTitle,
    description:
      'System builder for small businesses. AI speed, engineering discipline, hours given back.',
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
    description: 'System builder for small businesses — you approve, we measure hours given back.',
    images: ['/og/about.svg'],
  },
};

export default function AboutPage() {
  return (
    <>
      <Section padding="large">
        <h1 className="text-[var(--qf-fs-3xl)] font-bold tracking-tight leading-[var(--qf-lh-tight)] mb-6 max-w-3xl">
          {ABOUT.heroTitle}
        </h1>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)] mb-8">
          {ABOUT.heroIntro}
        </p>
        <Button href={ROUTES.bookDiscovery} withArrow size="lg">
          {CTAS.bookAutomationMap}
        </Button>
        <SocialLinks showLabels className="mt-[var(--qf-sp-6)]" />
      </Section>

      <Section background="surface" padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-6">
          {ABOUT.storyTitle}
        </h2>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)]">
          {ABOUT.storyBody}
        </p>
      </Section>

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          {ABOUT.moatTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ABOUT.moatPillars.map((pillar) => (
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
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-6">
          {ABOUT.whyTitle}
        </h2>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)]">
          {ABOUT.whyBody}
        </p>
      </Section>

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          {ABOUT.principlesTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {ABOUT.principles.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="text-[var(--qf-ok)] mt-0.5 shrink-0">✓</span>
              <p className="text-[var(--qf-text-dim)]">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="lab" background="surface" padding="large">
        <h2 className="mb-6 text-[var(--qf-fs-2xl)] font-bold tracking-tight">
          The lab — where it started
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
          Let&apos;s find what&apos;s worth automating.
        </h2>
        <Button href={ROUTES.bookDiscovery} withArrow size="lg">
          {CTAS.bookAutomationMap}
        </Button>
      </Section>
    </>
  );
}

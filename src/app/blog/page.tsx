import type { Metadata } from 'next';
import { Suspense } from 'react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import { CTAS } from '@/content/conversion-copy';
import { BlogChips, BlogChipsView, BlogPosts, BlogPostsView } from './BlogIndex';

export const metadata: Metadata = {
  title: 'Blog — practical notes on systems & automation',
  description:
    'Short, honest writing on digital transformation for small business. No buzzwords.',
  openGraph: {
    title: 'Blog — practical notes on systems & automation',
    description: 'Short, honest writing on digital transformation for small business.',
    images: [
      {
        url: '/og/blog.svg',
        width: 1200,
        height: 630,
        alt: 'Blog — practical notes on systems & automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — practical notes on systems & automation',
    description: 'Short, honest writing on digital transformation for small business.',
    images: ['/og/blog.svg'],
  },
};

export default function BlogPage() {
  return (
    <>
      <Section padding="large">
        <h1 className="text-[var(--qf-fs-3xl)] font-bold tracking-tight leading-[var(--qf-lh-tight)] mb-6">
          Practical notes on systems & automation.
        </h1>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)]">
          Short, honest writing on digital transformation for small business. No buzzwords.
        </p>
        <Suspense fallback={<BlogChipsView />}>
          <BlogChips />
        </Suspense>
      </Section>

      <Suspense fallback={<BlogPostsView />}>
        <BlogPosts />
      </Suspense>

      <div className="border-t border-[var(--qf-border)] pt-12 pb-8">
        <h3 className="text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)] mb-4">
          Ready to find your biggest time leak?
        </h3>
        <Button href={ROUTES.bookAScan} withArrow size="lg">
          {CTAS.bookAutomationMap}
        </Button>
      </div>
    </>
  );
}

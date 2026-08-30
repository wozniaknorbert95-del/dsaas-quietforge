import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import { CTAS } from '@/content/conversion-copy';

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

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

const CATEGORIES = [
  'Five Pillars',
  'Automation',
  'Digital Transformation',
  'Under the Hood',
] as const;

type Category = (typeof CATEGORIES)[number];

const FILTERS: ReadonlyArray<Category | 'All'> = ['All', ...CATEGORIES];

const POSTS: Post[] = [
  {
    slug: 'quote-to-order-automation',
    title: 'Quote-to-order automation: stop losing money in email ping-pong',
    date: '2026-08-30',
    category: 'Automation',
    excerpt:
      'Every quote sent by email costs the same hours: re-reading threads, chasing details, pricing by hand. A quote-to-order engine turns that into one flow — configure, see the price, pay.',
  },
  {
    slug: 'owner-cockpit-one-screen',
    title: 'The owner cockpit: your whole company on one screen, decisions from data',
    date: '2026-09-15',
    category: 'Five Pillars',
    excerpt:
      'Most dashboards show thirty numbers and explain nothing. The owner cockpit shows the five to eight that change a decision — leads, orders, margin — in one place.',
  },
  {
    slug: 'model-proposes-policy-decides',
    title: 'The model proposes. Policy decides. Why our AI never decides for the client',
    date: '2026-09-08',
    category: 'Five Pillars',
    excerpt:
      'An AI that acts alone is a liability with a good vocabulary. Our agents propose; written policy decides what runs automatically and what waits for a human click.',
  },
  {
    slug: 'company-knows-more-than-it-remembers',
    title: 'Your company knows more than it remembers — the knowledge graph as backbone',
    date: '2026-09-01',
    category: 'Five Pillars',
    excerpt:
      'Pricing logic, client history and your best answers live in Notion, the inbox and a few heads. A business knowledge graph turns that scatter into knowledge an AI can use — with sources.',
  },
  {
    slug: 'automation-for-small-business',
    title: 'Automation for small business — where to start',
    date: '2026-05-28',
    category: 'Automation',
    excerpt:
      'Most small businesses drown in email, manual quotes and outdated websites. Here is a calm, practical way to think about automation without buying into hype.',
  },
  {
    slug: 'digital-transformation-without-the-jargon',
    title: 'Digital transformation without the jargon',
    date: '2026-05-21',
    category: 'Digital Transformation',
    excerpt:
      'Digital transformation is not a six-month project with a consultant army. It is one system at a time, each one paying for the next.',
  },
  {
    slug: 'under-the-hood-how-inbox-killer-works',
    title: 'Under the hood: how Inbox Killer actually works',
    date: '2026-05-14',
    category: 'Under the Hood',
    excerpt:
      'A look at the human-in-the-loop architecture behind Inbox Killer: classify, plan, draft, approve — and why nothing sends without your sign-off.',
  },
];

const chipHref = (filter: Category | 'All'): string =>
  filter === 'All' ? '/blog/' : `/blog/?category=${encodeURIComponent(filter)}`;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active: Category | undefined = CATEGORIES.find((c) => c === category);
  const visible = active ? POSTS.filter((post) => post.category === active) : POSTS;

  return (
    <>
      <Section padding="large">
        <h1 className="text-[var(--qf-fs-3xl)] font-bold tracking-tight leading-[var(--qf-lh-tight)] mb-6">
          Practical notes on systems & automation.
        </h1>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)]">
          Short, honest writing on digital transformation for small business. No buzzwords.
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const isActive = filter === 'All' ? !active : active === filter;
            return (
              <Link
                key={filter}
                href={chipHref(filter)}
                aria-pressed={isActive}
                data-active={isActive}
                className="qf-blog-chip"
              >
                {filter}
              </Link>
            );
          })}
        </div>
      </Section>

      <div className="space-y-8 pb-16">
        {active ? (
          <p className="text-[var(--qf-fs-xs)] text-[var(--qf-text-faint)]">
            Showing {visible.length} of {POSTS.length} posts — {active}.{' '}
            <Link href="/blog/" className="text-[var(--qf-accent)] hover:text-[var(--qf-text)]">
              Show all
            </Link>
          </p>
        ) : null}
        {visible.map((post) => (
          <article
            key={post.slug}
            className="border-b border-[var(--qf-border)] pb-8 last:border-0"
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-[var(--qf-fs-xs)] uppercase tracking-[0.1em] text-[var(--qf-accent)] font-semibold">
                {post.category}
              </span>
              <span className="text-[var(--qf-fs-xs)] text-[var(--qf-text-faint)]">
                {post.date}
              </span>
            </div>
            <h2 className="text-[var(--qf-fs-xl)] font-bold text-[var(--qf-text)] mb-3">
              <Link
                href={`/blog/${post.slug}/`}
                className="hover:text-[var(--qf-accent)] transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-[var(--qf-text-dim)] mb-4">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}/`}
              className="inline-flex items-center gap-1 text-[var(--qf-accent)] text-sm font-semibold hover:text-[var(--qf-text)] transition-colors"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>

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

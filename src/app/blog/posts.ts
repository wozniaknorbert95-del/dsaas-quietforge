/** Blog index data (shared by the static page and the client-side category filter). */
export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export const CATEGORIES = [
  'Five Pillars',
  'Automation',
  'Digital Transformation',
  'Under the Hood',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const FILTERS: ReadonlyArray<Category | 'All'> = ['All', ...CATEGORIES];

export const POSTS: Post[] = [
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

export const chipHref = (filter: Category | 'All'): string =>
  filter === 'All' ? '/blog/' : `/blog/?category=${encodeURIComponent(filter)}`;

export const toCategory = (value: string | null | undefined): Category | undefined =>
  CATEGORIES.find((c) => c === value);

'use client';

/**
 * Blog category filter — client-side (?category=…), so /blog/ can be a static
 * export page (MIG-30 / QUI-247). Server render = "All"; the browser applies the
 * filter from the URL. Markup is unchanged from the former server version.
 */
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FILTERS, POSTS, chipHref, toCategory, type Category } from './posts';

function useActiveCategory(): Category | undefined {
  const params = useSearchParams();
  return toCategory(params.get('category'));
}

export function BlogChipsView({ active }: { active?: Category }) {
  return (
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
  );
}

export function BlogPostsView({ active }: { active?: Category }) {
  const visible = active ? POSTS.filter((post) => post.category === active) : POSTS;
  return (
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
  );
}

export function BlogChips() {
  return <BlogChipsView active={useActiveCategory()} />;
}

export function BlogPosts() {
  return <BlogPostsView active={useActiveCategory()} />;
}

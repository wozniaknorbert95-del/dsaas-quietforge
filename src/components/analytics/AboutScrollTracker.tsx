'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Fires about_section_scroll once per section heading that enters the
 * viewport (media plan §9). Observes h2 elements; no DOM changes.
 */
export default function AboutScrollTracker() {
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2'));
    if (headings.length === 0) return;

    const seen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target)) continue;
          seen.add(entry.target);
          const section = (entry.target.textContent ?? '').trim().slice(0, 40);
          trackEvent('about_section_scroll', { section });
        }
      },
      { threshold: 0.5 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  return null;
}

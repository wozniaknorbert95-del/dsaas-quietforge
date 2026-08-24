'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/** Fires blog_read once on mount with the post slug (media plan §9). */
export default function BlogReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent('blog_read', { slug });
  }, [slug]);

  return null;
}

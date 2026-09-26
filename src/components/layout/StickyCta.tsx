'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { WHATSAPP } from '@/lib/constants';
import { HEADER_CTA } from '@/lib/navigation';
import { trackEvent } from '@/lib/analytics';

const OBSERVER_ROOT_MARGIN = '0px 0px -40% 0px';

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[data-home-section="hero"]');
    const footer = document.querySelector('footer');
    if (!hero) {
      return;
    }

    let heroGone = false;
    let footerInView = false;
    const sync = () => setVisible(heroGone && !footerInView);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroGone = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        sync();
      },
      { rootMargin: OBSERVER_ROOT_MARGIN, threshold: 0 }
    );
    heroObserver.observe(hero);

    const footerObserver = footer
      ? new IntersectionObserver(
          ([entry]) => {
            footerInView = entry.isIntersecting;
            sync();
          },
          { rootMargin: '0px 0px -76px 0px', threshold: 0 }
        )
      : null;
    if (footer && footerObserver) {
      footerObserver.observe(footer);
    }

    return () => {
      heroObserver.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="qf-sticky-cta" role="region" aria-label="Quick actions">
      <div className="qf-sticky-cta-inner">
        <a
          href={WHATSAPP.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('cta_whatsapp_click', { location: 'sticky_mobile' })}
          className="qf-sticky-cta-wa"
        >
          {WHATSAPP.label}
        </a>
        <Link
          href={HEADER_CTA.href}
          onClick={() => trackEvent('cta_book_map_click', { location: 'sticky_mobile' })}
          className="qf-sticky-cta-book"
        >
          {HEADER_CTA.label}
        </Link>
      </div>
    </div>
  );
}

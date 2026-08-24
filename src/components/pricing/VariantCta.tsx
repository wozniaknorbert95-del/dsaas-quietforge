'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

/** Variant CTA — fires pricing_variant_click with the chosen tier (media plan §9). */
export default function VariantCta({ variant }: { variant: string }) {
  return (
    <Link
      href={ROUTES.bookAScan}
      className="qf-btn-fill mt-6 inline-flex justify-center"
      onClick={() => trackEvent('pricing_variant_click', { value: variant })}
    >
      Reply {variant} →
    </Link>
  );
}

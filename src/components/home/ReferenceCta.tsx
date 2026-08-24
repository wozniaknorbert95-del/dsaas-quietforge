'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

/** Home → /proof#reference with funnel event (media plan §9). */
export default function ReferenceCta({ label }: { label: string }) {
  return (
    <Link
      href="/proof/#reference"
      className="mt-4 inline-block qf-sys-link"
      onClick={() => trackEvent('reference_program_click', { location: 'home_proof' })}
    >
      {label} →
    </Link>
  );
}

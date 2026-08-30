'use client';

import { ARTEFACTS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export default function SampleScanLink() {
  return (
    <a
      href={ARTEFACTS.automationMapSample}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('sample_scan_download', { location: 'book_a_scan' })}
      className="text-[var(--qf-accent)] hover:underline"
    >
      See a sample scan report (PDF)
    </a>
  );
}

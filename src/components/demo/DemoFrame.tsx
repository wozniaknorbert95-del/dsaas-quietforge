'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics';

interface DemoFrameProps {
  src: string;
  title: string;
  heading: string;
  lead: string;
  backHref: string;
  backLabel: string;
  proofHref: string;
  proofLabel: string;
  scanHref: string;
  scanLabel: string;
  loadingLabel: string;
  analyticsEvent?: AnalyticsEvent;
  analyticsDetail?: Record<string, string>;
}

/**
 * Full-bleed frame for an original-tool replica with a quiet context bar:
 * back to the case, proof link, scan CTA, loading state, a11y heading.
 */
export default function DemoFrame({
  src,
  title,
  heading,
  lead,
  backHref,
  backLabel,
  proofHref,
  proofLabel,
  scanHref,
  scanLabel,
  loadingLabel,
  analyticsEvent,
  analyticsDetail,
}: DemoFrameProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (analyticsEvent) trackEvent(analyticsEvent, analyticsDetail);
  }, [analyticsEvent, analyticsDetail]);

  return (
    <div className="qf-demo-shell">
      <h1 className="sr-only">{heading}</h1>
      <p className="sr-only">{lead}</p>
      <div className="qf-demo-bar">
        <Link href={backHref} className="qf-btn-ghost">
          ← {backLabel}
        </Link>
        <Link href={proofHref} className="qf-demo-bar-link">
          {proofLabel}
        </Link>
        <Link href={scanHref} className="qf-btn-fill qf-demo-bar-cta">
          {scanLabel} →
        </Link>
      </div>
      <div className="qf-demo-frame-wrap">
        {!ready ? <p className="qf-demo-loading">{loadingLabel}</p> : null}
        <iframe
          src={src}
          title={title}
          className="qf-demo-frame"
          onLoad={() => setReady(true)}
        />
      </div>
    </div>
  );
}

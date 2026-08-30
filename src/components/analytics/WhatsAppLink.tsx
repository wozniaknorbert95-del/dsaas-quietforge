'use client';

import { WHATSAPP } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

/** Generic WhatsApp discovery link — fires cta_whatsapp_click with location. */
export default function WhatsAppLink({
  location,
  className,
}: {
  location: string;
  className?: string;
}) {
  return (
    <a
      href={WHATSAPP.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('cta_whatsapp_click', { location })}
      className={className}
    >
      {WHATSAPP.label}
    </a>
  );
}

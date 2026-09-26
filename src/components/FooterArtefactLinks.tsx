'use client';

import TrackedAnchor from '@/components/analytics/TrackedAnchor';
import { ARTEFACTS } from '@/lib/constants';

interface FooterArtefactLinksProps {
  links: readonly { label: string; href: string }[];
}

export default function FooterArtefactLinks({ links }: FooterArtefactLinksProps) {
  return (
    <>
      {links.map((link) => {
        const isSampleMap = link.href === ARTEFACTS.automationMapSample;

        if (isSampleMap) {
          return (
            <TrackedAnchor
              key={link.label}
              href={link.href}
              download
              event="sample_map_download"
              detail={{ location: 'footer' }}
            >
              {link.label}
            </TrackedAnchor>
          );
        }

        return (
          <a key={link.label} href={link.href} download>
            {link.label}
          </a>
        );
      })}
    </>
  );
}

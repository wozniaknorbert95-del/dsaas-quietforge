import Link from 'next/link';
import Image from 'next/image';
import BrandLogo from '@/components/ui/BrandLogo';
import { BRAND_LOGO, EMAIL, ROUTES } from '@/lib/constants';
import SocialLinks from '@/components/ui/SocialLinks';
import {
  FOOTER_ARTEFACTS,
  FOOTER_COMPANY,
  FOOTER_LEGAL,
  FOOTER_SOCIAL_ICONS,
  HEADER_CTA,
} from '@/lib/navigation';
import FooterArtefactLinks from '@/components/FooterArtefactLinks';
import { FOOTER, POSITIONING } from '@/content/conversion-copy';

export default function Footer() {
  return (
    <footer className="qf-footer">
      <div className="qf-footer-inner">
        <div className="qf-footer-band">
          <div className="qf-footer-brand">
            <Link href={ROUTES.home} className="qf-footer-lockup" aria-label="Quietforge home">
              <Image
                src={BRAND_LOGO.src}
                alt=""
                width={28}
                height={28}
                className="qf-footer-mark"
              />
              <BrandLogo size="footer" linked={false} />
            </Link>
            <p className="qf-footer-role">{POSITIONING.label}</p>
            <p className="qf-footer-tag">{FOOTER.tagline}</p>
            <p className="qf-footer-trust">{FOOTER.trustLine}</p>
            <SocialLinks className="qf-footer-social" icons={FOOTER_SOCIAL_ICONS} />
          </div>

          <div className="qf-footer-start">
            <Link href={HEADER_CTA.href} className="qf-footer-cta">
              {HEADER_CTA.label} →
            </Link>
            <a href={`mailto:${EMAIL}`} className="qf-footer-mail">
              {EMAIL}
            </a>
            <ul className="qf-footer-nav">
              {FOOTER_COMPANY.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="qf-footer-legal">
          {FOOTER_LEGAL.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
          {FOOTER_ARTEFACTS.length > 0 ? <FooterArtefactLinks links={FOOTER_ARTEFACTS} /> : null}
        </div>

        <div className="qf-footer-meta">
          <p>
            {FOOTER.portfolioPrompt}{' '}
            <Link href={FOOTER.portfolioHref}>{FOOTER.portfolioLink}</Link>
          </p>
          <p>
            &copy; {new Date().getFullYear()} Quietforge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import BrandLogo from '@/components/ui/BrandLogo';
import { BRAND_LOGO, EMAIL } from '@/lib/constants';
import SocialLinks from '@/components/ui/SocialLinks';
import {
  FOOTER_SOLUTIONS,
  FOOTER_COMPANY,
  FOOTER_ARTEFACTS,
  FOOTER_LEGAL,
  HEADER_CTA,
} from '@/lib/navigation';
import FooterArtefactLinks from '@/components/FooterArtefactLinks';
import { FOOTER, POSITIONING } from '@/content/conversion-copy';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--qf-border)] bg-[var(--qf-bg)] py-[var(--qf-sp-12)] text-[var(--qf-text-dim)] text-[var(--qf-fs-sm)]">
      <div className="mx-auto max-w-[var(--qf-maxw)] px-[var(--qf-sp-6)]">
        <div className="grid gap-[var(--qf-sp-8)] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={BRAND_LOGO.src}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 opacity-90"
              />
              <BrandLogo size="footer" linked={false} />
            </div>
            <p className="mt-1 font-mono text-xs text-[var(--qf-accent)]">{POSITIONING.label}</p>
            <p className="mt-[var(--qf-sp-3)] text-[var(--qf-text-faint)]">{FOOTER.tagline}</p>
            <SocialLinks className="mt-[var(--qf-sp-4)]" />
          </div>

          <div>
            <span className="mb-[var(--qf-sp-4)] block text-[var(--qf-text)] text-[var(--qf-fs-xs)] uppercase tracking-[0.1em]">
              {FOOTER.columnSolutions}
            </span>
            <ul className="space-y-2">
              {FOOTER_SOLUTIONS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[var(--qf-accent)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="mb-[var(--qf-sp-4)] block text-[var(--qf-text)] text-[var(--qf-fs-xs)] uppercase tracking-[0.1em]">
              {FOOTER.columnCompany}
            </span>
            <ul className="space-y-2">
              {FOOTER_COMPANY.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[var(--qf-accent)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="mb-[var(--qf-sp-4)] block text-[var(--qf-text)] text-[var(--qf-fs-xs)] uppercase tracking-[0.1em]">
              {FOOTER.columnGetStarted}
            </span>
            <p className="mb-2">
              <Link href={HEADER_CTA.href} className="text-[var(--qf-accent)]">
                {HEADER_CTA.label} →
              </Link>
            </p>
            <p className="mb-2">
              <a href={`mailto:${EMAIL}`} className="hover:text-[var(--qf-accent)]">
                {EMAIL}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-[var(--qf-sp-8)] flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--qf-border)] pt-[var(--qf-sp-6)]">
          <span className="w-full text-[var(--qf-text)] text-[var(--qf-fs-xs)] uppercase tracking-[0.1em]">
            {FOOTER.columnResources}
          </span>
          {FOOTER_LEGAL.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-[var(--qf-accent)]">
              {link.label}
            </Link>
          ))}
          {FOOTER_ARTEFACTS.length > 0 ? <FooterArtefactLinks links={FOOTER_ARTEFACTS} /> : null}
        </div>

        <div className="mt-[var(--qf-sp-4)] flex flex-col gap-2 border-t border-[var(--qf-border)] pt-[var(--qf-sp-4)] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[var(--qf-text-faint)]">
            {FOOTER.portfolioPrompt}{' '}
            <Link href={FOOTER.portfolioHref} className="text-[var(--qf-accent)]">
              {FOOTER.portfolioLink}
            </Link>
          </p>
          <p className="text-[var(--qf-text-faint)]">
            &copy; {new Date().getFullYear()} Quietforge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// NAVIGATION MANIFEST — header, footer.
// Binding: docs/canon/site-map.md
// ============================================================================

import { ARTEFACTS, EMAIL, ROUTES } from '@/lib/constants';
import { CTAS } from '@/content/conversion-copy';
import { SYSTEMS } from '@/content/systems-catalog';

export interface NavLink {
  label: string;
  href: string;
}

export interface SolutionNavItem extends NavLink {
  badge?: string;
  price?: string;
}

export interface HeaderNavItem extends NavLink {
  hasDropdown?: boolean;
}

/** Header: max 5 items + CTA — docs/canon/site-map.md */
export const HEADER_NAV: readonly HeaderNavItem[] = [
  { label: 'Systems', href: ROUTES.systems },
  { label: 'Approach', href: ROUTES.approach },
  { label: 'Security', href: ROUTES.security },
  { label: 'Proof', href: ROUTES.proof },
  { label: 'Pricing', href: ROUTES.pricing },
] as const;

export const SOLUTIONS_NAV: readonly SolutionNavItem[] = SYSTEMS.map((system) => ({
  label: system.name,
  href: system.href,
  badge: system.statusShort,
}));

export const FOOTER_SOLUTIONS: readonly NavLink[] = [
  { label: 'All systems', href: ROUTES.systems },
  ...SYSTEMS.map(({ name, href }) => ({ label: name, href })),
];

export const FOOTER_COMPANY: readonly NavLink[] = [
  { label: 'Approach', href: ROUTES.approach },
  { label: 'Security', href: ROUTES.security },
  { label: 'Proof', href: ROUTES.proof },
  { label: 'Pricing', href: ROUTES.pricing },
  { label: 'About', href: ROUTES.about },
  { label: "Builder's Lab", href: ROUTES.lab },
  { label: 'Blog', href: ROUTES.blog },
] as const;

export const FOOTER_ARTEFACTS: readonly NavLink[] = [
  { label: 'Scan sample', href: ARTEFACTS.automationMapSample },
  { label: 'Data safety playbook', href: ARTEFACTS.dataSafetyPlaybook },
  { label: 'Handover policy', href: ARTEFACTS.maintenanceHandover },
] as const;

export const FOOTER_LEGAL: readonly NavLink[] = [
  { label: 'Privacy', href: ROUTES.legal },
  { label: 'Terms', href: ROUTES.legal },
  { label: 'Contact', href: `mailto:${EMAIL}` },
] as const;

export const HEADER_CTA = {
  label: CTAS.bookAutomationMap,
  href: ROUTES.bookAScan,
} as const;

/** @deprecated Use HEADER_NAV */
export const NAV_ITEMS = HEADER_NAV;

/** @deprecated Use SOLUTIONS_NAV */
export const SOLUTION_DROPDOWN = SOLUTIONS_NAV;

// ============================================================================
// LIVE DEMOS — public URLs for investor / technical partner section.
// Binding: portfolio-update-plan §3.4 + verified public reference surfaces
// ============================================================================


export const INVESTOR_SECTION = {
  eyebrow: 'For investors & technical partners',
  title: 'Live demos — no slide deck required',
  lead:
    'Three public production-touching surfaces you can verify yourself. Private operational walkthroughs are available on request — no private repo links.',
  docsNote: 'Architecture documentation available on request.',
} as const;

export interface LiveDemoLink {
  id: string;
  label: string;
  href: string;
  verifyHref?: string;
  status: 'LIVE';
  note: string;
}

export const LIVE_DEMO_LINKS: readonly LiveDemoLink[] = [
  {
    id: 'wizard',
    label: 'Wizard Cash Engine',
    href: 'https://zzpackage.flexgrafik.nl/',
    status: 'LIVE',
    note: '9-screen configurator · Mollie checkout',
  },
  {
    id: 'game',
    label: 'Lead magnet game',
    href: 'https://app.flexgrafik.nl/',
    status: 'LIVE',
    note: 'Canvas game · wizard bridge',
  },
  {
    id: 'portal',
    label: 'Trust portal',
    href: 'https://flexgrafik.nl/',
    status: 'LIVE',
    note: 'Brand portal · generic sales chat',
  },
] as const;

// Results hub (/results/) — hero + metadata SSoT

export const resultsPageHero = {
  eyebrow: 'Proof',
  h1: 'Live checkout, capture and ops — dogfooded in production.',
  lead:
    'The conversion stack runs inside my Netherlands print business: Wizard checkout with open pricing, Design Intake on a live supervised path (PARTIAL), lead capture, and an Operations Command Layer with Marketing Brain in shadow. Same architecture Quietforge deploys for SMB clients — with named limitations, not invented revenue.',
  hint: 'Try the Wizard or Design Intake on zzpackage.flexgrafik.nl — then book an Automation Map.',
} as const;

export const resultsPageMeta = {
  title: 'Results — what changes',
  description:
    'Live Wizard checkout, design intake proof, lead capture and governed ops — dogfooded in a real print business. Process-proof case studies; no invented revenue claims.',
  openGraphDescription:
    'Live Wizard + design intake + ops spine in production. Process-proof case studies with clear limitations.',
  ogAlt: 'Results — Live conversion systems in production',
  twitterDescription: 'Live Wizard, design intake and ops proof — honest stage, process-proof case studies.',
} as const;

/**
 * LI-R10 landing — re-export of shared INSPIRE SSoT.
 * Prefer `InspireExtensionBlock` + `salesFunnelInspireExtension` in UI.
 */
export { salesFunnelInspireExtension as resultsInspireLanding } from '@/content/sales-funnel-case-study';

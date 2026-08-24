import { PRICING, PRODUCT_TIER_RANGES } from '@/content/pricing';

export { PRICING, PRODUCT_TIER_RANGES };

export const SITE_NAME = 'Quietforge';
export const SITE_URL = 'https://quietforge.flexgrafik.nl';

/** Lowercase typographic lockup — header/footer wordmark */
export const BRAND_WORDMARK = 'quietforge';

export const BRAND_LOGO = {
  src: '/brand/quietforge-logo.png',
  alt: 'Quietforge — system builder for small businesses',
  width: 1024,
  height: 1024,
} as const;
/** Public contact + intake destination mailbox */
export const EMAIL = 'quietforge@flexgrafik.nl';
export const CREATOR = 'Norbert Wozniak';

/** WhatsApp discovery — override via NEXT_PUBLIC_WHATSAPP_URL in Vercel if needed */
export const WHATSAPP = {
  url:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ??
    'https://wa.me/31687286151?text=Hi%20Norbert%2C%20I%27d%20like%20to%20book%20an%20Automation%20Scan%20for%20my%20business.',
  bookMapUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_BOOK_MAP_URL ??
    'https://wa.me/31687286151?text=Hi%20Norbert%2C%20I%20want%20to%20book%20the%20Automation%20Scan%20(%E2%82%AC690)%20%E2%80%94%20please%20send%20the%20payment%20link%20and%20available%20slots.',
  label: 'Ask on WhatsApp',
  bookMapLabel: 'WhatsApp — send me the €690 link',
  offlineFallback: `mailto:${EMAIL}?subject=WhatsApp%20unavailable`,
} as const;

export const LINKEDIN_URL = 'https://www.linkedin.com/in/flexgrafik-quietforge';
export const GITHUB_URL = 'https://github.com/wozniaknorbert95-del';
/** Lab heritage only — never labelled live proof in public chrome. */
export const FLEXGRAFIK_URL = 'https://flexgrafik.nl';

/** External social / connect links — footer, about, JSON-LD sameAs */
export const SOCIAL_LINKS = [
  { label: 'LinkedIn profile', href: LINKEDIN_URL, icon: 'linkedin' as const },
  { label: 'GitHub profile', href: GITHUB_URL, icon: 'github' as const },
  { label: WHATSAPP.label, href: WHATSAPP.url, icon: 'whatsapp' as const },
] as const;

export const ROUTES = {
  home: '/',
  systems: '/systems/',
  quoteOrderEngine: '/systems/quote-order-engine/',
  inboxTriage: '/systems/inbox-triage/',
  leadScout: '/systems/lead-scout/',
  ownerCockpit: '/systems/owner-cockpit/',
  publishingGate: '/systems/publishing-gate/',
  buildReleaseFlow: '/systems/build-release-flow/',
  companyBrain: '/systems/company-brain/',
  aiSecurityAudit: '/systems/ai-security-audit/',
  customAiAgent: '/systems/custom-ai-agent/',
  approach: '/approach/',
  security: '/security/',
  proof: '/proof/',
  proofMethodology: '/proof/methodology/',
  about: '/about/',
  aboutLab: '/about/#lab',
  pricing: '/pricing/',
  bookAScan: '/book-a-scan/',
  legal: '/legal/',
  /** Legacy aliases — kept so old imports compile; 301 to v2 routes. */
  solutions: '/systems/',
  inboxKiller: '/systems/inbox-triage/',
  webUpgrade: '/systems/',
  salesFunnel: '/systems/quote-order-engine/',
  leadMagnetGame: '/systems/lead-scout/',
  managedAutomation: '/systems/',
  trust: '/security/',
  howItWorks: '/approach/',
  results: '/proof/',
  resultsInboxKiller: '/systems/inbox-triage/',
  resultsAgentOrchestrator: '/systems/build-release-flow/',
  resultsSalesFunnel: '/systems/quote-order-engine/',
  resultsAdvisoryModernisation: '/proof/',
  resultsOwnerEcosystem: '/about/#lab',
  resultsJadziaCoi: '/systems/owner-cockpit/',
  resultsOwnerEcosystemWhyVcms: '/about/#lab',
  resultsLeadMagnet: '/systems/lead-scout/',
  resultsWhatsappPilot: '/proof/',
  founder: '/about/',
  founderSystemDiagram: '/about/#lab',
  blog: '/blog/',
  bookDiscovery: '/book-a-scan/',
  leadMagnet: '/artefacts/automation-map-sample.pdf',
} as const;

/** Owner ecosystem — external live demos (lab heritage, not public proof claims). */
export const EXTERNAL = {
  zzpackageWizard: 'https://zzpackage.flexgrafik.nl/',
  zzpackageWizardPath: 'https://zzpackage.flexgrafik.nl/wizard/',
  inspireDesignAgent: 'https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/',
  leadMagnetGame: 'https://app.flexgrafik.nl/',
} as const;

export const ARTEFACTS = {
  automationMapSample: '/artefacts/automation-map-sample.pdf',
  dataSafetyPlaybook: '/artefacts/data-safety-playbook.pdf',
  maintenanceHandover: '/artefacts/maintenance-handover.pdf',
} as const;

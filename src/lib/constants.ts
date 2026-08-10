import { PRICING, PRODUCT_TIER_RANGES } from '@/content/pricing';

export { PRICING, PRODUCT_TIER_RANGES };

export const SITE_NAME = 'Quietforge';
export const SITE_URL = 'https://quietforge.flexgrafik.nl';

/** Lowercase typographic lockup — header/footer wordmark */
export const BRAND_WORDMARK = 'quietforge';

export const BRAND_LOGO = {
  src: '/brand/quietforge-logo.png',
  alt: 'Quietforge — Conversion Systems Architect',
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
    'https://wa.me/31687286151?text=Hi%20Norbert%2C%20I%27d%20like%20to%20explore%20conversion%20systems%20for%20my%20business.',
  /** Fast path: ready buyer asking for Map payment link */
  bookMapUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_BOOK_MAP_URL ??
    'https://wa.me/31687286151?text=Hi%20Norbert%2C%20I%20want%20to%20book%20the%20Automation%20Map%20(%E2%82%AC290)%20%E2%80%94%20please%20send%20the%20payment%20link%20and%20available%20slots.',
  label: 'Ask on WhatsApp',
  bookMapLabel: 'WhatsApp — send me the €290 link',
  offlineFallback: `mailto:${EMAIL}?subject=WhatsApp%20unavailable`,
} as const;

export const LINKEDIN_URL = 'https://www.linkedin.com/in/flexgrafik-quietforge';
export const FLEXGRAFIK_URL = 'https://flexgrafik.nl';

/** External social / connect links — footer, about, JSON-LD sameAs */
export const SOCIAL_LINKS = [
  { label: 'LinkedIn profile', href: LINKEDIN_URL, icon: 'linkedin' as const },
  { label: 'FlexGrafik — live proof', href: FLEXGRAFIK_URL, icon: 'globe' as const },
  { label: WHATSAPP.label, href: WHATSAPP.url, icon: 'whatsapp' as const },
] as const;

export const ROUTES = {
  home: '/',
  solutions: '/solutions/',
  inboxKiller: '/solutions/inbox-killer/',
  webUpgrade: '/solutions/web-upgrade/',
  salesFunnel: '/solutions/sales-funnel/',
  leadMagnetGame: '/solutions/lead-magnet-game/',
  managedAutomation: '/solutions/managed-automation/',
  pricing: '/pricing/',
  trust: '/trust/',
  howItWorks: '/how-it-works/',
  results: '/results/',
  resultsInboxKiller: '/results/inbox-killer/',
  resultsAgentOrchestrator: '/results/agent-orchestrator/',
  resultsSalesFunnel: '/results/sales-funnel/',
  resultsAdvisoryModernisation: '/results/advisory-modernisation/',
  resultsOwnerEcosystem: '/results/owner-ecosystem/',
  resultsJadziaCoi: '/results/jadzia-coi/',
  resultsOwnerEcosystemWhyVcms: '/results/owner-ecosystem/#why-vcms',
  resultsLeadMagnet: '/results/lead-magnet/',
  resultsWhatsappPilot: '/results/whatsapp-discovery-pilot/',
  about: '/about/',
  founder: '/founder/',
  /** Interactive Technical map — canonical LOS drill-down anchor */
  founderSystemDiagram: '/founder/#system-diagram',
  blog: '/blog/',
  bookDiscovery: '/book-discovery/',
  legal: '/legal/',
  leadMagnet: '/artefacts/automation-map-sample.pdf',
  zzpProfileBoost: '/solutions/zzp-profile-boost/',
  zzpGrowth: '/solutions/zzp-profile-boost/',
} as const;

/** Owner ecosystem — external live demos */
export const EXTERNAL = {
  zzpackageWizard: 'https://zzpackage.flexgrafik.nl/',
  /** Wizard entry — prefer /wizard/ when linking demo CTAs */
  zzpackageWizardPath: 'https://zzpackage.flexgrafik.nl/wizard/',
  /** Complex Quote & Design Intake (INSPIRE) — PARTIAL live supervised path on FlexGrafik */
  inspireDesignAgent: 'https://zzpackage.flexgrafik.nl/voertuigreclame-ontwerp/',
  leadMagnetGame: 'https://app.flexgrafik.nl/',
} as const;

export const ARTEFACTS = {
  automationMapSample: '/artefacts/automation-map-sample.pdf',
  dataSafetyPlaybook: '/artefacts/data-safety-playbook.pdf',
  maintenanceHandover: '/artefacts/maintenance-handover.pdf',
} as const;


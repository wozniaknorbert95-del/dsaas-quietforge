export interface ClientContext {
  clientId: 'flexgrafik' | 'quietforge';
  brandName: string;
  tagline: string;
  grossMargin: number;
  maxCpaLimit: number;
  offers: {
    name: string;
    price: number;
    description: string;
  }[];
  brandVoice: {
    archetype: string;
    tone: string;
    forbiddenWords: string[];
    mandatoryTerms: string[];
    temperature: number;
  };
}

export interface GrowthContext {
  clients: Record<'flexgrafik' | 'quietforge', ClientContext>;
  activeClientId: 'flexgrafik' | 'quietforge';
}

export const INITIAL_GROWTH_CONTEXT: GrowthContext = {
  activeClientId: 'quietforge',
  clients: {
    flexgrafik: {
      clientId: 'flexgrafik',
      brandName: 'FlexGrafik',
      tagline: 'High-end Identity, Branding & Conversion Systems',
      grossMargin: 0.60,
      maxCpaLimit: 1200,
      offers: [
        { name: 'Core Brand Identity', price: 12000, description: 'Complete high-end status-led positioning and brand book.' },
        { name: 'B2B Conversion Platform', price: 18000, description: 'Next.js 16 bespoke web ecosystem with multi-channel funnels.' }
      ],
      brandVoice: {
        archetype: 'Premium Strategist',
        tone: 'Visionary, authoritative, ultra-competent, status-driven, elegant',
        forbiddenWords: ['revolutionize', 'seamless', 'unleash', 'freelancer', 'cheap'],
        mandatoryTerms: ['ROI', 'Brand Equity', 'Premium Positioning', 'Market Leadership'],
        temperature: 0.65
      }
    },
    quietforge: {
      clientId: 'quietforge',
      brandName: 'Quietforge',
      tagline: 'Autopilot conversion and back-office automation engines',
      grossMargin: 0.85,
      maxCpaLimit: 480,
      offers: [
        { name: 'Automation Map', price: 290, description: 'Paid detailed discovery process mapping time leaks.' },
        { name: 'Inbox Killer', price: 1200, description: 'Triage, lead qualification and email automatic response engine.' },
        { name: 'Wizard Cash Engine', price: 2400, description: '9-step checkout portal with client-side Mollie prepayment.' }
      ],
      brandVoice: {
        archetype: 'Cwany Cheater',
        tone: 'Blunt, raw, pragmatic, borderline cynical, outcome-driven',
        forbiddenWords: ['revolutionize', 'seamless', 'elevate', 'unleash', 'paradigm shift'],
        mandatoryTerms: ['KVK', 'BTW', 'Belastingdienst', 'offerte', 'administratie', 'Heineken on the terrace'],
        temperature: 0.72
      }
    }
  }
};

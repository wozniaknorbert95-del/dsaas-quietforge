// ============================================================================
// PRICING SSoT — canonical commercial matrix for all public pages.
// Binding: docs/strategy/site-map.md §8, route-content-patches.md §1
// ============================================================================

export const PRICING_NUMBERS = {
  discovery: 690,
  implementationFrom: 2500,
  maintenanceFrom: 300,
  /** Build variants — oferty v1 (Oferta B). */
  buildEssential: 2500,
  buildSystem: 4500,
  buildAutonomous: 7900,
  /** Care variants — oferty v1 (Oferta C), per month. */
  care: 300,
  grow: 600,
  autonomy: 1000,
  /** AI Security Audit fixed range — etap 4 §3.2. */
  securityAuditFrom: 1500,
  securityAuditTo: 3000,
  inboxKiller: { from: 1200, to: 4800 },
  webUpgrade: { from: 1800, to: 5500 },
  salesFunnel: { from: 2400, to: 6500 },
  leadMagnetGame: { from: 2200, to: 6500 },
  singleSystem: { from: 1490 },
  ecosystemBuild: { from: 3490, to: 12000 },
  managedAutomation: { from: 349, to: 890 },
  budgetQualificationFloor: 1200,
} as const;

/** Public currency: €2,500 (comma thousands). Never €2.500. */
export function formatEuro(amount: number): string {
  return `€${amount.toLocaleString('en-US')}`;
}

export function formatRange(from: number, to: number, perMonth = false): string {
  const suffix = perMonth ? '/mo' : '';
  return `${formatEuro(from)}–${formatEuro(to)}${suffix}`;
}

export function formatFromRange(from: number, to: number, perMonth = false): string {
  return `from ${formatRange(from, to, perMonth)}`;
}

export const PRICING_MATRIX = {
  automationScan: {
    label: 'Automation Scan',
    price: formatEuro(PRICING_NUMBERS.discovery),
    note: 'credited toward your first implementation',
  },
  automationMap: {
    label: 'Automation Scan',
    price: formatEuro(PRICING_NUMBERS.discovery),
    note: 'credited toward your first implementation',
  },
  inboxKiller: {
    label: 'Inbox Killer',
    range: formatRange(
      PRICING_NUMBERS.inboxKiller.from,
      PRICING_NUMBERS.inboxKiller.to
    ),
  },
  webUpgrade: {
    label: 'Web Upgrade',
    range: formatRange(
      PRICING_NUMBERS.webUpgrade.from,
      PRICING_NUMBERS.webUpgrade.to
    ),
  },
  salesFunnel: {
    label: 'Sales Funnel / Wizard Cash Engine',
    range: formatRange(
      PRICING_NUMBERS.salesFunnel.from,
      PRICING_NUMBERS.salesFunnel.to
    ),
  },
  leadMagnetGame: {
    label: 'Lead Magnet Game',
    range: formatRange(
      PRICING_NUMBERS.leadMagnetGame.from,
      PRICING_NUMBERS.leadMagnetGame.to
    ),
  },
  singleSystemBuild: {
    label: 'Single System Build',
    range: formatFromRange(PRICING_NUMBERS.singleSystem.from, PRICING_NUMBERS.singleSystem.from),
  },
  ecosystemBuild: {
    label: 'Ecosystem / Multi-System Build',
    range: formatRange(
      PRICING_NUMBERS.ecosystemBuild.from,
      PRICING_NUMBERS.ecosystemBuild.to
    ),
  },
  managedAutomation: {
    label: 'Managed Automation',
    range: formatRange(
      PRICING_NUMBERS.managedAutomation.from,
      PRICING_NUMBERS.managedAutomation.to,
      true
    ),
  },
} as const;

/** Scope examples under each band — numbers unchanged; packaging clarity only. */
export const PRICING_SCOPE_EXAMPLES = {
  salesFunnel: [
    'Configurator + open pricing + Mollie checkout',
    'Above + Complex Quote & Design Intake (INSPIRE pattern)',
  ],
  webUpgrade: [
    'Trust site + Wizard-first CTAs',
    'Above + supervised sales chat widget',
  ],
  leadMagnetGame: [
    'PWA lead magnet + reward bridge to Wizard',
    'Above + lead sync into operations spine',
  ],
  inboxKiller: [
    'Single mailbox lanes + HITL send gate',
    'Multi-lane + CRM handoff notes',
  ],
  ecosystemBuild: [
    'Wizard + Inbox Killer',
    'Operations Command Layer (cockpit + spine + weekly brief) + two modules',
  ],
  managedAutomation: [
    'Care — health checks and small fixes',
    'Partner — cockpit hygiene + supervised content + weekly brief',
  ],
} as const;

/** Display order = buyer ladder (spearhead first). */
export const PRODUCT_TIER_RANGES = [
  {
    name: PRICING_MATRIX.salesFunnel.label,
    from: PRICING_NUMBERS.salesFunnel.from,
    to: PRICING_NUMBERS.salesFunnel.to,
    perMonth: false as const,
    examples: PRICING_SCOPE_EXAMPLES.salesFunnel,
  },
  {
    name: PRICING_MATRIX.webUpgrade.label,
    from: PRICING_NUMBERS.webUpgrade.from,
    to: PRICING_NUMBERS.webUpgrade.to,
    perMonth: false as const,
    examples: PRICING_SCOPE_EXAMPLES.webUpgrade,
  },
  {
    name: PRICING_MATRIX.leadMagnetGame.label,
    from: PRICING_NUMBERS.leadMagnetGame.from,
    to: PRICING_NUMBERS.leadMagnetGame.to,
    perMonth: false as const,
    examples: PRICING_SCOPE_EXAMPLES.leadMagnetGame,
  },
  {
    name: PRICING_MATRIX.inboxKiller.label,
    from: PRICING_NUMBERS.inboxKiller.from,
    to: PRICING_NUMBERS.inboxKiller.to,
    perMonth: false as const,
    examples: PRICING_SCOPE_EXAMPLES.inboxKiller,
  },
  {
    name: PRICING_MATRIX.managedAutomation.label,
    from: PRICING_NUMBERS.managedAutomation.from,
    to: PRICING_NUMBERS.managedAutomation.to,
    perMonth: true as const,
    examples: PRICING_SCOPE_EXAMPLES.managedAutomation,
  },
] as const;

/** Solution detail pages — always use full matrix ranges (never singleSystem fallback). */
export const SOLUTION_DETAIL_PRICES = {
  inboxKiller: PRICING_MATRIX.inboxKiller.range,
  webUpgrade: PRICING_MATRIX.webUpgrade.range,
  salesFunnel: PRICING_MATRIX.salesFunnel.range,
  leadMagnetGame: PRICING_MATRIX.leadMagnetGame.range,
  managedAutomation: PRICING_MATRIX.managedAutomation.range,
} as const;

/** Legacy shape for components that import PRICING from constants */
export const PRICING = {
  discovery: PRICING_NUMBERS.discovery,
  implementationFrom: PRICING_NUMBERS.implementationFrom,
  maintenanceFrom: PRICING_NUMBERS.maintenanceFrom,
  inboxKiller: PRICING_NUMBERS.inboxKiller,
  webUpgrade: PRICING_NUMBERS.webUpgrade,
  salesFunnel: PRICING_NUMBERS.salesFunnel,
  leadMagnetGame: PRICING_NUMBERS.leadMagnetGame,
  singleSystem: PRICING_NUMBERS.singleSystem,
  ecosystemBuild: PRICING_NUMBERS.ecosystemBuild,
  managedAutomation: PRICING_NUMBERS.managedAutomation,
  budgetQualificationFloor: PRICING_NUMBERS.budgetQualificationFloor,
} as const;

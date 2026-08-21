// ============================================================================
// HOURS COUNTER — single source of truth for "Hours confirmed" / "€ given back".
// Home hero counter (src/app/page.tsx) and /proof (src/app/proof/page.tsx)
// both read from here. Rule: starts at zero on purpose — numbers move ONLY
// after a client verifies hours. No fabrication. Edit this one file.
// ============================================================================

export const hoursCounter = {
  hoursConfirmed: 0, // client-verified hours given back (0 until first confirmation)
  ratePerHour: 40,   // public €/h basis used across the site
} as const;

export const hoursValueEuro = hoursCounter.hoursConfirmed * hoursCounter.ratePerHour;

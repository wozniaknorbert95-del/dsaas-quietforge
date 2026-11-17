// ============================================================================
// DEMO WIZARD — front-end catalog + pricing rules for the /lab/wizard/ live demo.
// Illustrative demo prices, labelled DEMO on the surface (MR-16 — no fake offers).
// No network, no payments: the flow stops safely at "Place order" (demo message).
// ============================================================================

export interface DemoChoice {
  id: string;
  label: string;
  /** Delta in EUR, applied per unit. */
  price: number;
  note?: string;
}

export interface DemoOptionGroup {
  id: string;
  label: string;
  hint?: string;
  mode: 'single' | 'multi';
  choices: readonly DemoChoice[];
}

export interface DemoProduct {
  id: string;
  name: string;
  tagline: string;
  /** Base price in EUR per unit. */
  basePrice: number;
  unit: string;
  perUnit: boolean;
  options: readonly DemoOptionGroup[];
}

/** FlexGrafik minimum checkout (global business rule). */
export const DEMO_MIN_ORDER = 199;

/** Reward coupons from the lead game demo (/lab/game/ handoff). */
export const DEMO_COUPONS: Readonly<Record<string, number>> = {
  GAME10: 10,
  GAME15: 15,
  GAME20: 20,
};

export const DEMO_EXTRAS: readonly DemoChoice[] = [
  { id: 'design', label: 'Production-ready design file', price: 120 },
  { id: 'install', label: 'On-site installation', price: 240 },
  { id: 'express', label: 'Express production', price: 0, note: '+15% on subtotal' },
] as const;

export const DEMO_PRODUCTS: readonly DemoProduct[] = [
  {
    id: 'vehicle-wrap',
    name: 'Vehicle wrap',
    tagline: 'Every trip becomes advertising.',
    basePrice: 1450,
    unit: 'per vehicle',
    perUnit: true,
    options: [
      {
        id: 'coverage',
        label: 'Coverage',
        mode: 'single',
        choices: [
          { id: 'partial', label: 'Partial — doors + tailgate', price: 0 },
          { id: 'half', label: 'Half wrap', price: 450 },
          { id: 'full', label: 'Full wrap', price: 980 },
        ],
      },
      {
        id: 'finish',
        label: 'Finish',
        mode: 'single',
        choices: [
          { id: 'gloss', label: 'Gloss', price: 0 },
          { id: 'matte', label: 'Matte', price: 120 },
          { id: 'satin', label: 'Satin', price: 90 },
        ],
      },
    ],
  },
  {
    id: 'workwear',
    name: 'Workwear set',
    tagline: 'Your crew recognisable on site.',
    basePrice: 89,
    unit: 'per item',
    perUnit: true,
    options: [
      {
        id: 'garment',
        label: 'Garment',
        mode: 'single',
        choices: [
          { id: 'tshirt', label: 'T-shirt', price: 0 },
          { id: 'polo', label: 'Polo', price: 15 },
          { id: 'softshell', label: 'Softshell jacket', price: 65 },
        ],
      },
      {
        id: 'branding',
        label: 'Branding',
        mode: 'single',
        choices: [
          { id: 'print', label: 'Print', price: 8 },
          { id: 'embroidery', label: 'Embroidery', price: 12 },
        ],
      },
    ],
  },
  {
    id: 'signing',
    name: 'Signing & banner',
    tagline: 'Be seen at the job.',
    basePrice: 240,
    unit: 'per piece',
    perUnit: true,
    options: [
      {
        id: 'size',
        label: 'Size',
        mode: 'single',
        choices: [
          { id: 's', label: '1 × 1 m', price: 0 },
          { id: 'm', label: '2 × 1 m', price: 140 },
          { id: 'l', label: '3 × 2 m', price: 380 },
        ],
      },
      {
        id: 'material',
        label: 'Material',
        mode: 'single',
        choices: [
          { id: 'pvc', label: 'PVC', price: 0 },
          { id: 'mesh', label: 'Mesh', price: 60 },
          { id: 'dibond', label: 'Dibond', price: 190 },
        ],
      },
    ],
  },
  {
    id: 'logo',
    name: 'Logo package',
    tagline: 'A professional face for your business.',
    basePrice: 590,
    unit: 'fixed project',
    perUnit: false,
    options: [
      {
        id: 'depth',
        label: 'Depth',
        mode: 'single',
        choices: [
          { id: 'essential', label: 'Essential', price: 0 },
          { id: 'standard', label: 'Standard', price: 280 },
          { id: 'full', label: 'Full identity', price: 620 },
        ],
      },
      {
        id: 'deliverables',
        label: 'Deliverables',
        hint: 'Pick any',
        mode: 'multi',
        choices: [
          { id: 'vector', label: 'Vector file set', price: 60 },
          { id: 'styleguide', label: 'Style guide', price: 180 },
          { id: 'social', label: 'Social kit', price: 90 },
        ],
      },
    ],
  },
] as const;

export interface DemoPriceBreakdown {
  base: number;
  options: number;
  extras: number;
  express: number;
  discount: number;
  total: number;
  clampedToMinimum: boolean;
}

export function computeDemoPrice(
  product: DemoProduct,
  selections: Readonly<Record<string, readonly string[]>>,
  extras: readonly string[],
  quantity: number,
  coupon: string | null
): DemoPriceBreakdown {
  const qty = product.perUnit ? Math.max(1, Math.min(99, quantity)) : 1;
  const base = product.basePrice * qty;

  let options = 0;
  for (const group of product.options) {
    const selected = selections[group.id] ?? [];
    for (const choice of group.choices) {
      if (selected.includes(choice.id)) options += choice.price * qty;
    }
  }

  const extrasFlat = DEMO_EXTRAS.filter((extra) => extras.includes(extra.id)).reduce(
    (sum, extra) => sum + extra.price,
    0
  );
  const express = extras.includes('express') ? Math.round((base + options) * 0.15) : 0;

  const subtotal = base + options + extrasFlat + express;
  const pct = coupon ? (DEMO_COUPONS[coupon] ?? 0) : 0;
  const discount = Math.round((subtotal * pct) / 100);
  const rawTotal = subtotal - discount;
  const total = Math.max(DEMO_MIN_ORDER, rawTotal);

  return {
    base,
    options,
    extras: extrasFlat,
    express,
    discount,
    total,
    clampedToMinimum: total > rawTotal,
  };
}

/** Client-side demo reference — not an order. */
export function demoOrderRef(): string {
  const block = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DEMO-${block}`;
}

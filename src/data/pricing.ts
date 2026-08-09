// ─────────────────────────────────────────────────────────────────────────────
// pricing.ts — THE single source of truth for every price in the app.
//
// Before this file existed the same product was quoted six different ways
// across lessons, quizzes, cheat sheets and product pages — and quizzes marked
// sellers WRONG for the price the product page had just taught them.
//
// Rules:
//   1. Numbers only. Never a currency symbol — Andorra sells in €, Gibraltar
//      in £, and the amounts are identical. The symbol comes from
//      LocationContext at render time via `useCurrency()`.
//   2. Nothing anywhere may hardcode a price. Import it from here.
//   3. The mix & match family (Nail Kit, Scrub, Body Butter) share one ladder.
// ─────────────────────────────────────────────────────────────────────────────

export interface PriceLadder {
  /** Anchor price quoted for "back in Europe" — the strike-through number. */
  europeAnchor: number;
  /** The normal local asking price. */
  base: number;
  /** Absolute minimum. Never sell below this. */
  floor: number;
  /** Named rungs between base and floor, in the order a seller walks them. */
  steps: PriceRung[];
}

export interface PriceRung {
  id: string;
  /** What the seller is offering at this rung. */
  label: string;
  labelEs: string;
  /** Total price for this rung. */
  price: number;
  /** How many units the customer receives for `price`. */
  units?: number;
  /** Emphasise this rung in the UI. */
  highlight?: boolean;
}

// ── The mix & match family ───────────────────────────────────────────────────
// Nail Kit, Scrub and Body Butter are priced identically and combine freely in
// the buy-2-get-1 / buy-2-get-2 / buy-1-get-1 deals.

export const MIX_MATCH_LADDER: PriceLadder = {
  europeAnchor: 80,
  base: 60,
  floor: 30,
  steps: [
    {
      id: 'b2g1',
      label: 'Buy 2, Get 1 Free',
      labelEs: 'Compra 2, Llévate 1 Gratis',
      price: 120,
      units: 3,
      highlight: true,
    },
    {
      id: 'b2g2',
      label: 'Buy 2, Get 2 Free',
      labelEs: 'Compra 2, Llévate 2 Gratis',
      price: 120,
      units: 4,
    },
    {
      id: 'b1g1',
      label: 'Buy 1, Get 1 Free',
      labelEs: 'Compra 1, Llévate 1 Gratis',
      price: 60,
      units: 2,
    },
    {
      id: 'floor',
      label: 'Final Push — Single',
      labelEs: 'Empuje Final — Individual',
      price: 30,
      units: 1,
      highlight: true,
    },
  ],
};

/** Products that share MIX_MATCH_LADDER and combine with each other. */
export const MIX_MATCH_PRODUCTS = ['nailkit', 'scrub', 'bodybutter'] as const;
export type MixMatchProduct = (typeof MIX_MATCH_PRODUCTS)[number];

// ── The Syringe ──────────────────────────────────────────────────────────────
// 500 anchor → 300 base → 210 (30% off + gift) → 175 (gift removed)
// → 140 (voucher close) → 100 absolute floor.

export const SYRINGE_LADDER: PriceLadder = {
  europeAnchor: 500,
  base: 300,
  floor: 100,
  steps: [
    {
      id: 'promo',
      label: 'Offer 1 — 30% Off + Free Gift',
      labelEs: 'Oferta 1 — 30% Descuento + Regalo',
      price: 210,
      highlight: true,
    },
    {
      id: 'second-free',
      label: 'Offer 2 — Second Syringe Free',
      labelEs: 'Oferta 2 — Segunda Jeringa Gratis',
      price: 300,
      units: 2,
    },
    {
      id: 'no-gift',
      label: 'Adaptive — Gift Removed',
      labelEs: 'Alternativa — Sin Regalo',
      price: 175,
      highlight: true,
    },
    {
      id: 'voucher',
      label: 'Voucher Close — 20% Off',
      labelEs: 'Cierre con Cupón — 20% Descuento',
      price: 140,
      highlight: true,
    },
    {
      id: 'floor',
      label: 'Absolute Minimum',
      labelEs: 'Mínimo Absoluto',
      price: 100,
    },
  ],
};

// ── The Peeling ──────────────────────────────────────────────────────────────
// 200 anchor → 150 base → 100 (50% off + gift) → 70 (scrub removed) → 50 floor.

export const PEELING_LADDER: PriceLadder = {
  europeAnchor: 200,
  base: 150,
  floor: 50,
  steps: [
    {
      id: 'promo',
      label: 'Offer 1 — 50% Off + Free Gift',
      labelEs: 'Oferta 1 — 50% Descuento + Regalo',
      price: 100,
      highlight: true,
    },
    {
      id: 'creams-free',
      label: 'Offer 2 — Day & Night Cream Free',
      labelEs: 'Oferta 2 — Crema de Día y Noche Gratis',
      price: 150,
    },
    {
      id: 'no-scrub',
      label: 'Adaptive — Scrub as Credit',
      labelEs: 'Alternativa — Exfoliante como Crédito',
      price: 70,
      highlight: true,
    },
    {
      id: 'voucher',
      label: 'Voucher Close',
      labelEs: 'Cierre con Cupón',
      price: 50,
      highlight: true,
    },
  ],
};

// ── Lookup ───────────────────────────────────────────────────────────────────

export const LADDERS = {
  syringe: SYRINGE_LADDER,
  peeling: PEELING_LADDER,
  nailkit: MIX_MATCH_LADDER,
  scrub: MIX_MATCH_LADDER,
  bodybutter: MIX_MATCH_LADDER,
} as const;

export type ProductId = keyof typeof LADDERS;

export function getLadder(product: ProductId): PriceLadder {
  return LADDERS[product];
}

/** The price a seller should quote first for a product. */
export function basePrice(product: ProductId): number {
  return LADDERS[product].base;
}

/** The price a seller must never go below. */
export function floorPrice(product: ProductId): number {
  return LADDERS[product].floor;
}

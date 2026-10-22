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
  /**
   * Every named price point on this product.
   *
   * Most of them are the descent, in the order a seller walks them. Some are
   * marked `parallel` — those are not on the descent at all. Read this list
   * with `descentSteps()` when you are drawing the way DOWN, and with
   * `parallelOptions()` / `optionsBeside()` for the ones that sit alongside.
   * Reading it raw draws Option B as a rung and teaches the opposite of the
   * truth; see `parallel` below.
   */
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
  /**
   * NOT a step down — the OTHER option, offered at the same moment as
   * `alternativeTo` and usually for MORE money.
   *
   * The owner's correction, which this flag exists to carry: "we have two
   * options in that space. All the time we have two options, so 300 is just
   * the second option. It's not part of the ladder. The ladder is designed
   * for people who are, so to say, broke. 300 is just the second option. It's
   * option number B."
   *
   * So the two options are always presented together and always the same two,
   * so the seller has something concrete to say. Which one gets pushed is read
   * off the customer during the demo. The descent — gift off, voucher, full
   * market and the manager — is the route for the customer who genuinely
   * cannot reach it, and nobody else.
   *
   * A renderer that treats this as the next rung down draws the price going UP
   * while the picture goes DOWN, and a seller scanning mid-sale offers 300 to
   * somebody who was already saying yes to 210.
   */
  parallel?: true;
  /** The id of the descending rung this option is laid beside. */
  alternativeTo?: string;
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
// The DESCENT:  500 anchor → 300 base → 210 (30% off + gift) → 175 (gift
// removed) → 140 (voucher close) → 100 absolute floor.
//
// And BESIDE the 210, not below it: 300 for two syringes, the second one free.
// That is Option B. It is MORE money, not less, and it is presented at the same
// moment as Offer 1 — never descended to. It stays inside `steps` because it is
// a real price a customer pays (the money control has to offer it) and because
// three files look it up by id; `parallel` is what keeps it off the descent.
// See `PriceRung.parallel` for the owner's words.

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
      /* Option B. Beside the promo, not under it — see `PriceRung.parallel`.
         Deliberately left in source order next to the rung it pairs with. */
      id: 'second-free',
      label: 'Option B — Second Syringe Free',
      labelEs: 'Opción B — Segunda Jeringa Gratis',
      price: 300,
      units: 2,
      parallel: true,
      alternativeTo: 'promo',
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
      /* The peeling's Option B — the same shape as the syringe's, and the same
         reason: "all the time we have two options". More money for the full
         routine, offered beside Offer 1, never descended to. */
      id: 'creams-free',
      label: 'Option B — Day & Night Cream Free',
      labelEs: 'Opción B — Crema de Día y Noche Gratis',
      price: 150,
      parallel: true,
      alternativeTo: 'promo',
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

/**
 * The way DOWN, and only the way down.
 *
 * Anything a renderer numbers, indents, or draws a descent bar for comes from
 * here. `steps` holds the parallel options too, so iterating it raw is what
 * drew 500 → 300 → 210 → 300 → 175 with the picture going one way and the
 * price the other.
 */
export function descentSteps(ladder: PriceLadder): PriceRung[] {
  return ladder.steps.filter((s) => !s.parallel);
}

/** Option B and anything like it — offered beside a rung, never below one. */
export function parallelOptions(ladder: PriceLadder): PriceRung[] {
  return ladder.steps.filter((s) => s.parallel);
}

/** The options to lay beside one descending rung, in source order. */
export function optionsBeside(ladder: PriceLadder, rungId: string): PriceRung[] {
  return ladder.steps.filter((s) => s.parallel && s.alternativeTo === rungId);
}

/** What one rung costs per unit — the number that makes an option comparable. */
export function eachOf(rung: PriceRung): number {
  return rung.price / (rung.units ?? 1);
}

/**
 * Every price this product is really sold at, highest first.
 *
 * The base plus every rung, de-duplicated on the AMOUNT — the syringe's "two
 * for 300" and its plain 300 are two different offers but one number, and a
 * money control only cares about the number. The Europe anchor is deliberately
 * absent: it is the strike-through we quote, never a price anybody pays.
 *
 * Parallel options are deliberately INCLUDED. Option B is not on the descent,
 * but it is money a customer really hands over, so a seller logging a sale has
 * to be able to tap it. Only renderers that draw the descent filter them out,
 * with `descentSteps()`.
 *
 * An unknown product (or "Multiple", which has no ladder of its own) gets an
 * empty list, which every caller reads as "there is nothing to tap here".
 */
export function ladderRungAmounts(productId: string): number[] {
  if (!(productId in LADDERS)) return [];
  const ladder = LADDERS[productId as ProductId];
  const amounts = new Set<number>([ladder.base, ladder.floor, ...ladder.steps.map((r) => r.price)]);
  return [...amounts].sort((a, b) => b - a);
}

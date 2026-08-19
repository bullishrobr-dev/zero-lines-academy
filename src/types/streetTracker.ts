/**
 * A "STOP" is someone who is now INSIDE the shop, in front of you — not someone
 * halted on the pavement. Counting pavement approaches was dropped: it measured
 * effort rather than result, and nobody could count it honestly anyway.
 *
 * So the funnel is two steps: STOP → SALE, and conversion is sales ÷ stops —
 * of the people you got inside, how many bought.
 */
export interface StreetSession {
  id: string;
  date: string;
  type: 'stop' | 'sale';
  productId?: string;
  amount?: number;
  note?: string;
  timestamp: number;
  /**
   * How a stop ended. Undefined means the encounter is still OPEN — that person
   * is in front of the seller right now, and the journal shows a live card until
   * it is resolved. This is what turns a counter into a journal: the app learns
   * about the people who did NOT buy, which the till can never see.
   */
  outcome?: 'sold' | 'walked';
  /** Chip id from encounterChips.ts — why they walked, or what closed it. */
  reason?: string;
  /**
   * When the encounter was CLOSED, which is not `timestamp` — that is when the
   * person walked in, and a long encounter can end half an hour later.
   *
   * The journal needs the closing time to know whether a loss is still fresh
   * enough to be worth answering on the spot. Optional, because every encounter
   * logged before this field existed has none; those simply never count as
   * fresh, which is the correct answer for them anyway.
   */
  resolvedAt?: number;
  /**
   * The sale was passed to the upseller — the last thing a seller's job
   * contains, and the only step after the syringe that belongs to them.
   *
   *   "If they sold a syringe, the whole point is to pass it to an upseller."
   *
   * Optional, and never required to save a sale. A sale with this undefined is
   * a sale nobody said anything about, not a failed handover — the seller's
   * log is theirs, and the moment ticking a box becomes compulsory it becomes
   * a box that gets ticked without meaning anything.
   */
  handedOver?: boolean;
}

export interface DailySummary {
  date: string;
  stops: number;
  sales: number;
  revenue: number;
  /** sales ÷ stops, as a percentage. */
  conversionRate: number;
}

export interface XPAward {
  activity: string;
  points: number;
  timestamp: number;
}

/*
 * What the floor is worth, against a lesson's 100-150.
 *
 * These used to be 5 and 10 — and they were written to a key no screen read, so
 * in practice a sale was worth nothing at all. Even once routed to the real
 * total, 10 against a lesson's 100 meant one lesson outranked ten sales on the
 * leaderboard the two shops race on. In a sales app, the seller reading on the
 * bus beat the seller working the floor, publicly.
 *
 * A sale is now worth more than half a lesson, and a good day on the floor
 * beats a few lessons — which is the order the owner actually wants. Lessons
 * are still worth doing; they are just no longer the fastest way up the board.
 */
export const XP_VALUES = {
  /** They are inside the shop — real work, and the hard part of the job. */
  stop: 10,
  /** Any sale, when the product is not known. The syringe rate — see below. */
  sale: 60,
} as const;

/*
 * ── WHAT A SALE IS WORTH DEPENDS ON WHAT SOLD ───────────────────────────────
 *
 * Every sale paid the same 60, so six scrubs at the floor price outscored three
 * syringes — nearly double the money, less than half the score. The owner has
 * been consistent about the order and the app was not listening:
 *
 *   "The scrub, body butter and nail kit — those are completely beginner
 *    products. It's only for people who are learning how to sell, or just want
 *    to have some nice energy. The peeling is kind of in between. But the
 *    syringe is what we usually sell, what we focus on, the star product."
 *
 * So the star keeps the full rate, the middle earns a real but smaller number,
 * and the beginner kit pays clearly more than a stop and clearly less than the
 * thing a shift is measured on. A beginner selling scrubs is still rewarded for
 * selling — just not as if they had sold the flagship.
 *
 * Nothing already banked moves. XP is a running total, not a recomputed one, so
 * this changes what the NEXT sale is worth and leaves every seller's current
 * standing exactly where they earned it.
 */
export const SALE_XP: Record<string, number> = {
  syringe: 60,
  peeling: 35,
  scrub: 20,
  nailkit: 20,
  bodybutter: 20,
  /* 'multiple' is deliberately absent, so it falls through to the base rate.
     A multi-product sale usually has the syringe in it, and guessing low would
     punish the biggest sale on the list. */
};

/*
 * The handover is worth something, because it is the job.
 *
 * A syringe sale that stops at the till is a job left one step short — the
 * owner is unambiguous that a seller's work ends when the upseller takes over,
 * not when the card goes through. So the sheet pays for the whole job: tick
 * the box and the number on the Save button goes up in front of you, which is
 * the doctrine taught in one gesture rather than one more paragraph.
 *
 * Deliberately smaller than a scrub. It is a step, not a sale, and it should
 * never be worth more than actually selling something.
 */
export const HANDOVER_XP = 15;

/** Which products end in a handover. The star, and any bundle containing it. */
const HANDOVER_PRODUCTS = new Set(['syringe', 'multiple']);

/**
 * Is the handover even a question for this product?
 *
 * A nail kit does not get passed to anybody, and putting the box on a nail-kit
 * sale would teach a beginner that the small products lead somewhere. They do
 * not — they are training wheels.
 */
export function endsInHandover(productId?: string): boolean {
  return productId !== undefined && HANDOVER_PRODUCTS.has(productId);
}

/** What this sale is worth. Unknown or multi-product sales pay the base rate. */
export function saleXp(productId?: string, handedOver?: boolean): number {
  const base = !productId ? XP_VALUES.sale : SALE_XP[productId] ?? XP_VALUES.sale;
  return base + (handedOver && endsInHandover(productId) ? HANDOVER_XP : 0);
}

// Prices are BASE prices from src/data/pricing.ts (the single source of truth).
// Numbers only — no currency symbol. Andorra renders €, Gibraltar £.
export const PRODUCTS = [
  { id: 'syringe', name: 'Syringe', nameEs: 'Jeringa', price: 300 },
  { id: 'peeling', name: 'Peeling', nameEs: 'Peeling', price: 150 },
  { id: 'scrub', name: 'Scrub', nameEs: 'Exfoliante', price: 60 },
  { id: 'nailkit', name: 'Nail Kit', nameEs: 'Kit de Uñas', price: 60 },
  { id: 'bodybutter', name: 'Body Butter', nameEs: 'Manteca Corporal', price: 60 },
  { id: 'multiple', name: 'Multiple', nameEs: 'Múltiple', price: 0 },
] as const;

export const STORAGE_KEY = 'zl_street_tracker';
export const XP_LOG_KEY = 'zl_street_xp';

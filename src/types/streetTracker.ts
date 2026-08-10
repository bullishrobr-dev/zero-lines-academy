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
  sale: 60,
} as const;

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

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

export const XP_VALUES = {
  // A stop is now "they are inside the shop", which is real work — worth more
  // than the old pavement-approach stop it replaces.
  stop: 5,
  sale: 10,
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

// ─────────────────────────────────────────────────────────────
// lessonTiers.ts — Tier mapping for guided lesson progression
// 6 tiers that unlock sequentially based on completion %
// ─────────────────────────────────────────────────────────────

/*
 * ── WHY TIER 1 IS THE WHOLE OF THE ART OF STOPPING ──────────────────────────
 * The owner's instruction, and it is how he actually trains people:
 *
 *   "Usually the first thing I teach people is the art of stopping. The art of
 *    stopping should be tier 1, very important, because that's how it is."
 *
 * It used to be split: two stopping lessons in tier 1, four in tier 2 and one
 * stranded in tier 3, with the mindset lessons taking the first slots. So a new
 * starter read three lessons about rejection psychology before anything told
 * them how to stop a human being — which is the only skill that matters on day
 * one, because no stop means no anything.
 *
 * All seven now sit in tier 1, in order, starting with stop-1 (the sequence).
 * The mindset and market lessons move to tier 2, where they land after the
 * seller has something to apply them to.
 *
 * Moving lessons between tiers CANNOT re-lock anybody — see isTierUnlocked
 * below, which now ratchets. Read that before you reshuffle this map again.
 */
export const LESSON_TIERS: Record<string, number> = {
  // ── Tier 1: The Art of Stopping (7) ──
  // The first thing taught, and the last thing anybody stops needing.
  'stop-1': 1,
  'stop-2': 1,
  'stop-3': 1,
  'stop-4': 1,
  'stop-5': 1,
  'stop-6': 1,
  'stop-7': 1,

  // ── Tier 2: The Head, and What Kind of Shop This Is (6) ──
  // Now that they can stop somebody, the mindset has something to attach to.
  'psych-1': 2,
  'psych-2': 2,
  'psych-3': 2,
  'psych-4': 2,
  // What kind of selling this is. A starter who has not read it treats a market
  // stall like a pharmacy and behaves accordingly.
  'close-market': 2,
  // Bringing them from the pavement to the chair is the direct sequel to
  // stopping them.
  'close-1': 2,

  // ── Tier 3: Reading People (4) ──
  'connect-1': 3,
  'connect-2': 3,
  'connect-3': 3,
  'connect-4': 3,

  // Tier 4: Product Intro (6 lessons) — Product knowledge
  'connect-5': 4,
  'connect-7': 4,
  'connect-8': 4,
  'prod-1': 4,
  'prod-6': 4,
  'connect-6': 4,
  /* The demo itself — the hand, the one eye, the mirror, the two yeses. It has
     to come before close-2, because close-2's answer to "let me think about
     it" is nothing but the two yeses quoted back, and a seller who was never
     taught to collect them has nothing to quote. Tier 4 had 7 lessons, so a
     seller who had finished it sits at 7/8 = 88% — still over the 80% gate,
     and nobody who is currently at 100% gets re-locked. */
  'close-demo': 4,
  // Asking for the money needs the prices from prod-1, which is this tier.
  'close-2': 4,

  // Tier 5: Product Mastery (8 lessons) — Closing techniques
  'prod-2': 5,
  'prod-3': 5,
  'prod-4': 5,
  'prod-5': 5,
  'prod-7': 5,
  'psych-7': 5,
  'close-3': 5,
  /* The handover to the upseller — where a seller's job actually ends. It sits
     with close-3 rather than a tier lower, because it only means anything to
     somebody who has already been taught to close and collect (close-2 is tier
     4, close-3 tier 5), and it must NOT go to tier 6: that shelf is the
     mindset and intuition material a seller grows into, and this happens on
     every single syringe sale from the first one. Tier 5 had 7 lessons, so a
     seller who had finished it sits at 7/8 = 88% — still clear of the 80%
     gate even before the ratchet in isTierUnlocked, so nobody loses tier 6. */
  'close-handover': 5,
  /* The mindset lesson sits with the other mindset material in Mastery — it
     leans on the ladder, the two yeses and the ask, so it only lands once a
     seller has been taught all three. */
  'close-fault': 6,

  // Tier 6: Advanced (4 lessons) — Mastery
  'psych-5': 6,
  'psych-6': 6,
  'psych-8': 6,
  'prod-8': 6,
};

export const TIER_NAMES: Record<number, { en: string; es: string }> = {
  1: { en: 'The Art of Stopping', es: 'El Arte de Parar' },
  2: { en: 'The Head, and the Shop', es: 'La Cabeza, y la Tienda' },
  3: { en: 'Reading People', es: 'Leer a la Gente' },
  4: { en: 'Product Intro', es: 'Introducción a Productos' },
  5: { en: 'Product Mastery', es: 'Dominio de Producto' },
  // Was 'Advanced Closing', which named something it did not contain: the
  // closing lessons now sit in tiers 1, 2, 4 and 5, and this tier holds the
  // mindset and intuition material.
  6: { en: 'Mastery', es: 'Maestr\u00eda' },
};

/*
 * Kept in step with LESSON_TIERS by scripts/check-tiers.mjs.
 *
 * This used to carry a warning about arithmetic: adding a lesson to a tier
 * lowers everyone's completion of it, and dropping under the 80% gate would
 * confiscate the next tier from a seller who had already earned it. That is
 * no longer a hazard — isTierUnlocked ratchets, so a tier that has ever been
 * open stays open. Keep the counts honest anyway; they are what the progress
 * ring on the Training hub divides by.
 */
export const TIER_LESSON_COUNT: Record<number, number> = {
  1: 7,
  2: 6,
  3: 4,
  4: 8,
  5: 8,
  6: 5,
};

export const TIER_ORDER: number[] = [1, 2, 3, 4, 5, 6];

export const UNLOCK_THRESHOLD = 80; // % completion needed to unlock next tier

// ── Helpers ──

/**
 * Whether a lesson sits on the gated tier path at all.
 *
 * Scenarios and Objections deliberately are not: they are reference material a
 * seller dips into mid-shift, not a seventh and eighth step of the ladder.
 * Adding them to LESSON_TIERS as tier 1 would have taken that tier from 5 to 25
 * lessons, so someone who finished the real tier 1 would sit at 20% and never
 * unlock tier 2.
 */
export function isLessonTiered(lessonId: string): boolean {
  return LESSON_TIERS[lessonId] !== undefined;
}

export function getTierForLesson(lessonId: string): number {
  return LESSON_TIERS[lessonId] ?? 1;
}

export function getLessonsForTier(tierNumber: number): string[] {
  return Object.entries(LESSON_TIERS)
    .filter(([, tier]) => tier === tierNumber)
    .map(([lessonId]) => lessonId);
}

export function getTierCompletion(
  tierNumber: number,
  lessonProgress: Record<string, boolean>
): number {
  const tierLessons = getLessonsForTier(tierNumber);
  if (tierLessons.length === 0) return 0;
  const completed = tierLessons.filter((id) => lessonProgress[id]).length;
  return Math.round((completed / tierLessons.length) * 100);
}

/**
 * A tier a seller has already been inside stays open, whatever the map says
 * afterwards.
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * Unlocking used to be a pure function of the CURRENT map: tier N is open if
 * 80% of tier N-1 is done. That is fine until the map moves — and the map moves
 * every time the owner rethinks what a new starter should read first. Moving
 * the seven stopping lessons into tier 1 took a seller who had finished the old
 * tier 1 from 100% of it to 2 of 7, which under the old rule would have shut
 * tier 2 in the face of somebody who had been studying there for a week.
 *
 * Taking something away from a seller who earned it is not a thing this app
 * does. So the gate now also asks a question the map cannot invalidate: have
 * they already completed a lesson at this level or beyond? You cannot have
 * finished a lesson in a tier that was shut, so the answer being yes is proof
 * the tier was open at the time — regardless of which tier that lesson sits in
 * today.
 *
 * It needs no stored high-water mark and no migration: it is derived from the
 * lesson progress that already exists on the device, so it works retroactively
 * for everybody, and it can never desync from a second source of truth.
 */
export function isTierUnlocked(
  tierNumber: number,
  lessonProgress: Record<string, boolean>
): boolean {
  // Tier 1 is always unlocked.
  if (tierNumber <= 1) return true;

  // The ordinary gate: 80% of the tier below.
  if (getTierCompletion(tierNumber - 1, lessonProgress) >= UNLOCK_THRESHOLD) return true;

  // The ratchet: anything finished at this level or above proves it was open.
  return Object.keys(lessonProgress).some(
    (id) => lessonProgress[id] && isLessonTiered(id) && LESSON_TIERS[id] >= tierNumber
  );
}

export function isLessonUnlocked(
  lessonId: string,
  lessonProgress: Record<string, boolean>
): boolean {
  const tier = getTierForLesson(lessonId);
  return isTierUnlocked(tier, lessonProgress);
}

export function getTotalTiers(): number {
  return Object.keys(TIER_NAMES).length;
}

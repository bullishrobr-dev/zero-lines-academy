// ─────────────────────────────────────────────────────────────
// lessonTiers.ts — Tier mapping for guided lesson progression
// 6 tiers that unlock sequentially based on completion %
// ─────────────────────────────────────────────────────────────

export const LESSON_TIERS: Record<string, number> = {
  // Tier 1: First Day (5 lessons) — Foundation
  'psych-1': 1,
  'psych-2': 1,
  'psych-3': 1,
  'stop-1': 1,
  'stop-2': 1,
  // What kind of selling this is. A new starter who has not read it treats a
  // market stall like a pharmacy and behaves accordingly.
  'close-market': 1,

  // Tier 2: Stopping Basics (5 lessons) — Core stopping
  'psych-4': 2,
  'stop-3': 2,
  'stop-4': 2,
  'stop-5': 2,
  'stop-6': 2,
  // Bringing them from the pavement to the chair is the direct sequel to
  // stopping them, so it belongs with stopping and not three tiers later.
  'close-1': 2,

  // Tier 3: Stopping Advanced (5 lessons) — Reading people
  'connect-1': 3,
  'connect-2': 3,
  'connect-3': 3,
  'connect-4': 3,
  'stop-7': 3,

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

  // Tier 5: Product Mastery (6 lessons) — Closing techniques
  'prod-2': 5,
  'prod-3': 5,
  'prod-4': 5,
  'prod-5': 5,
  'prod-7': 5,
  'psych-7': 5,
  'close-3': 5,
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
  1: { en: 'First Day', es: 'Primer Día' },
  2: { en: 'Stopping Basics', es: 'Fundamentos de Parada' },
  3: { en: 'Stopping Advanced', es: 'Parada Avanzada' },
  4: { en: 'Product Intro', es: 'Introducción a Productos' },
  5: { en: 'Product Mastery', es: 'Dominio de Producto' },
  // Was 'Advanced Closing', which named something it did not contain: the
  // closing lessons now sit in tiers 1, 2, 4 and 5, and this tier holds the
  // mindset and intuition material.
  6: { en: 'Mastery', es: 'Maestr\u00eda' },
};

/*
 * Kept in step with LESSON_TIERS by the unit test in scripts/.
 *
 * ONE closing lesson was added per tier on purpose. getTierCompletion divides
 * by the number of lessons actually mapped to a tier, so adding two to a
 * six-lesson tier would drop a seller who had finished it from 100% to 75% —
 * under the 80% gate — and re-lock the next tier they had already earned.
 * Adding one takes them to 86%, which re-locks nobody.
 *
 * `close-demo` grew tier 4 from 7 to 8 under the same rule and the same
 * arithmetic: a seller sitting on all seven drops to 88%, still clear of the
 * gate. A SECOND addition to tier 4 in the same release would take them to 78%
 * and confiscate tier 5, so check this number before you add another one.
 */
export const TIER_LESSON_COUNT: Record<number, number> = {
  1: 6,
  2: 6,
  3: 5,
  4: 8,
  5: 7,
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

export function isTierUnlocked(
  tierNumber: number,
  lessonProgress: Record<string, boolean>
): boolean {
  // Tier 1 is always unlocked
  if (tierNumber <= 1) return true;
  // Tier N is unlocked if Tier N-1 has >= 80% completion
  const prevTierCompletion = getTierCompletion(tierNumber - 1, lessonProgress);
  return prevTierCompletion >= UNLOCK_THRESHOLD;
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

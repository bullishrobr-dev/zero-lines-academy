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

  // Tier 2: Stopping Basics (5 lessons) — Core stopping
  'psych-4': 2,
  'stop-3': 2,
  'stop-4': 2,
  'stop-5': 2,
  'stop-6': 2,

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

  // Tier 5: Product Mastery (6 lessons) — Closing techniques
  'prod-2': 5,
  'prod-3': 5,
  'prod-4': 5,
  'prod-5': 5,
  'prod-7': 5,
  'psych-7': 5,

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
  6: { en: 'Advanced Closing', es: 'Cierre Avanzado' },
};

export const TIER_LESSON_COUNT: Record<number, number> = {
  1: 5,
  2: 5,
  3: 5,
  4: 6,
  5: 6,
  6: 4,
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

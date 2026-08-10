// ─────────────────────────────────────────────────────────────────────────────
// data/gamification.ts — levels and achievements
//
// Extracted from ProfilePage.tsx, where it sat above the component and could
// only ever be rendered by that one screen. Three things were wrong with it and
// are fixed here:
//
//  1. `syringe-pro` required lesson ids 'syringe-intro' / 'syringe-demo' /
//     'syringe-close' and `closer` required 'closing-intro' / 'closing-two-choice'
//     / 'closing-voucher' / 'closing-urgency'. NONE of those exist — the real
//     curriculum ships 31 lessons called psych-1..8, connect-1..8, stop-1..7 and
//     prod-1..8. Both badges were therefore impossible to earn, forever.
//     Conditions now lean on category completion (derived from the real lesson
//     data at runtime) so a renamed lesson can never silently break them again.
//
//  2. `quiz-whiz` compared against `quizScores`, which used to hold XP values
//     rather than percentages, so "score 100%" only fired if a quiz happened to
//     be worth exactly 100 XP. `recordQuizScore()` now stores a clamped, rounded
//     0-100 percentage, so the comparison is finally meaningful — kept as `>= 100`
//     so a future uncapped writer can't make it unobtainable again.
//
//  3. Levels carried hardcoded hex colours ('#8A8A8A', '#0ABAB5', …) that were
//     inlined as `style={{ backgroundColor }}`, bypassing the design system and
//     rendering identically in light and dark mode. They now name a token.
//
// `maxXP` is gone. Nothing ever read it, and it duplicated the next level's
// `minXP` — two sources of truth for one boundary. The band a level occupies is
// [minXP, nextLevel.minXP).
// ─────────────────────────────────────────────────────────────────────────────

import {
  Award,
  BookOpen,
  Brain,
  Flame,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { TranslationKey } from './translations';

/** Which accent from the design system dresses a level or artefact. */
export type AccentToken = 'teal' | 'coral' | 'gold' | 'violet';

export interface LevelConfig {
  level: number;
  /** Rank names are product copy, not UI chrome, so they live here rather than
      in translations.ts (which has no keys for them). */
  name: { en: string; es: string };
  /** First XP value that belongs to this level. */
  minXP: number;
  accent: AccentToken;
  icon: LucideIcon;
}

export const LEVELS: LevelConfig[] = [
  { level: 1, name: { en: 'Trainee', es: 'Aprendiz' }, minXP: 0, accent: 'teal', icon: Target },
  { level: 2, name: { en: 'Rookie', es: 'Novato' }, minXP: 200, accent: 'teal', icon: Zap },
  { level: 3, name: { en: 'Seller', es: 'Vendedor' }, minXP: 500, accent: 'violet', icon: Star },
  { level: 4, name: { en: 'Pro', es: 'Pro' }, minXP: 1000, accent: 'coral', icon: Trophy },
  { level: 5, name: { en: 'Master', es: 'Maestro' }, minXP: 2000, accent: 'gold', icon: Award },
];

export function getLevelForXP(xp: number): LevelConfig {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getNextLevel(xp: number): LevelConfig | null {
  const current = getLevelForXP(xp);
  const idx = LEVELS.findIndex((l) => l.level === current.level);
  return LEVELS[idx + 1] ?? null;
}

export interface LevelProgress {
  level: LevelConfig;
  next: LevelConfig | null;
  /** 0-100, floored: 99% means "not there yet", never a rounded-up lie. */
  percent: number;
  xpIntoLevel: number;
  xpForLevel: number;
  xpToNext: number;
  isMax: boolean;
}

/**
 * The old inline maths divided by `nextLevel.minXP - level.minXP`, which is the
 * right denominator — but it used Math.round, so 199 XP (one point short of
 * level 2) displayed a full 100% bar. Floor it: the bar fills only when the
 * level actually changes.
 */
export function getLevelProgress(xp: number): LevelProgress {
  const level = getLevelForXP(xp);
  const next = getNextLevel(xp);
  const xpIntoLevel = Math.max(0, xp - level.minXP);

  if (!next) {
    return { level, next: null, percent: 100, xpIntoLevel, xpForLevel: xpIntoLevel, xpToNext: 0, isMax: true };
  }

  const xpForLevel = next.minXP - level.minXP;
  const percent = xpForLevel > 0 ? Math.min(100, Math.floor((xpIntoLevel / xpForLevel) * 100)) : 0;
  return { level, next, percent, xpIntoLevel, xpForLevel, xpToNext: Math.max(0, next.minXP - xp), isMax: false };
}

// ── Achievements ──────────────────────────────────────────────────────────────

/**
 * The slice of `useProgress()` an achievement is allowed to read. Structural, so
 * this module never has to import the 435 kB lesson data — the hook already
 * resolves category completion from it.
 */
export interface AchievementSource {
  getLessonsCompletedCount: () => number;
  getLessonCompletion: (lessonId: string) => boolean;
  getCategoryCompletion: (categoryId: string) => number;
  getTotalCompletion: () => number;
  getCurrentStreak: () => number;
  quizScores: Record<string, number>;
  /*
   * Lifetime numbers from the journal. Optional because plenty of callers only
   * hold progress — but without them every artefact in this case was a lesson
   * or a quiz condition, and a seller could sell a syringe and watch "Closer"
   * stay locked. In a sales app the trophy case rewarded reading only.
   */
  totalSales?: number;
  totalStops?: number;
  bestDaySales?: number;
}

/** Visual weight in the trophy case — how loudly an artefact is allowed to shout. */
export type Rarity = 'common' | 'rare' | 'legendary';

export interface Achievement {
  id: string;
  /** Keys that already existed, unused, in src/data/translations.ts. */
  nameKey: TranslationKey;
  descKey: TranslationKey;
  icon: LucideIcon;
  rarity: Rarity;
  condition: (p: AchievementSource) => boolean;
}

/**
 * Closing technique lives in the Product Mastery track: the two-choice
 * framework, the gradual price descent, the voucher close and the objection
 * library. These are real ids, checked against src/data/lessons.ts.
 */
const CLOSING_LESSON_IDS = ['prod-2', 'prod-3', 'prod-4', 'prod-7'];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    nameKey: 'achFirstSteps',
    descKey: 'achFirstStepsDesc',
    icon: BookOpen,
    rarity: 'common',
    condition: (p) => p.getLessonsCompletedCount() >= 1,
  },
  {
    id: 'getting-warm',
    nameKey: 'achGettingWarm',
    descKey: 'achGettingWarmDesc',
    icon: Flame,
    rarity: 'common',
    condition: (p) => p.getLessonsCompletedCount() >= 5,
  },
  {
    id: 'on-fire',
    nameKey: 'achOnFire',
    descKey: 'achOnFireDesc',
    icon: Zap,
    rarity: 'rare',
    condition: (p) => p.getLessonsCompletedCount() >= 10,
  },
  {
    id: 'syringe-pro',
    nameKey: 'achSyringePro',
    descKey: 'achSyringeProDesc',
    icon: Target,
    rarity: 'rare',
    // The syringe is the flagship, and every lesson in Product Mastery is built
    // around pitching, pricing, discounting and defending it.
    condition: (p) => p.getCategoryCompletion('products') === 100,
  },
  {
    id: 'quiz-whiz',
    nameKey: 'achQuizWhiz',
    descKey: 'achQuizWhizDesc',
    icon: Brain,
    rarity: 'common',
    condition: (p) => Object.values(p.quizScores).some((s) => s >= 100),
  },
  {
    id: 'streak-keeper',
    nameKey: 'achStreakKeeper',
    descKey: 'achStreakKeeperDesc',
    icon: Flame,
    rarity: 'common',
    condition: (p) => p.getCurrentStreak() >= 3,
  },
  {
    id: 'streak-master',
    nameKey: 'achStreakMaster',
    descKey: 'achStreakMasterDesc',
    icon: TrendingUp,
    rarity: 'rare',
    condition: (p) => p.getCurrentStreak() >= 7,
  },
  {
    id: 'ten-sold',
    nameKey: 'achTenSales',
    descKey: 'achTenSalesDesc',
    icon: Award,
    rarity: 'rare',
    condition: (p) => CLOSING_LESSON_IDS.every((id) => p.getLessonCompletion(id)),
  },
  {
    id: 'people-reader',
    nameKey: 'achPeopleReader',
    descKey: 'achPeopleReaderDesc',
    icon: Star,
    rarity: 'rare',
    condition: (p) => p.getCategoryCompletion('connecting') === 100,
  },
  {
    id: 'master-seller',
    nameKey: 'achMasterSeller',
    descKey: 'achMasterSellerDesc',
    icon: Trophy,
    rarity: 'legendary',
    condition: (p) => p.getTotalCompletion() === 100,
  },
  /* ── The floor ──────────────────────────────────────────────────────────
     These are the only four an hour of reading cannot unlock. */
  {
    id: 'first-sale',
    nameKey: 'achFirstSale',
    descKey: 'achFirstSaleDesc',
    icon: Target,
    rarity: 'common',
    condition: (p) => (p.totalSales ?? 0) >= 1,
  },
  {
    id: 'closer',
    nameKey: 'achCloser',
    descKey: 'achCloserDesc',
    icon: Trophy,
    rarity: 'rare',
    condition: (p) => (p.totalSales ?? 0) >= 10,
  },
  {
    id: 'big-day',
    nameKey: 'achBigDay',
    descKey: 'achBigDayDesc',
    icon: Zap,
    rarity: 'legendary',
    condition: (p) => (p.bestDaySales ?? 0) >= 5,
  },
  {
    id: 'worked-the-floor',
    nameKey: 'achWorkedTheFloor',
    descKey: 'achWorkedTheFloorDesc',
    icon: Flame,
    rarity: 'rare',
    condition: (p) => (p.totalStops ?? 0) >= 100,
  },
];

/** Ids of every artefact the learner currently owns. */
export function getUnlockedAchievementIds(p: AchievementSource): string[] {
  return ACHIEVEMENTS.filter((a) => a.condition(p)).map((a) => a.id);
}

export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

// ─────────────────────────────────────────────────────────────
// useProgress.ts — Comprehensive progress tracking hook
// Manages lessons, XP, streaks, quizzes, daily challenges
// ─────────────────────────────────────────────────────────────

import { useState, useCallback } from 'react';
import { categories, getLessonsForCategory } from '@/data/lessons';
import {
  getTierForLesson,
  getTierCompletion,
  isTierUnlocked,
  isLessonUnlocked,
  
} from '@/data/lessonTiers';

// ── localStorage keys ──
const LS_LESSON_PROGRESS = 'zl_lesson_progress';
const LS_QUIZ_SCORES = 'zl_quiz_scores';
const LS_STREAK = 'zl_streak';
const LS_XP = 'zl_xp';
const LS_USER_NAME = 'zl_user_name';
const LS_DAILY_CHALLENGE = 'zl_daily_challenge';
const LS_ACTIVITY_LOG = 'zl_activity_log';
const LS_TIER_PROGRESS = 'zl_tier_progress';
/** Highest XP already paid out per quiz, so retakes cannot farm XP. */
const LS_QUIZ_XP_AWARDED = 'zl_quiz_xp_awarded';
/** Exercise results, kept out of quizScores so accuracy stats stay meaningful. */
const LS_EXERCISE_SCORES = 'zl_exercise_scores';

// ── Types ──
export interface StreakData {
  current: number;
  best: number;
  lastActiveDate: string | null;
}

export interface DailyChallengeData {
  completed: boolean;
  date: string | null;
}

export interface ActivityItem {
  id: string;
  type: 'lesson' | 'quiz' | 'challenge';
  title: string;
  detail?: string;
  xpEarned: number;
  timestamp: string;
}

export interface ProgressState {
  lessonProgress: Record<string, boolean>;
  categoryProgress: Record<string, number>;
  tierProgress: Record<string, boolean>;
  totalXP: number;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
  quizScores: Record<string, number>;
  userName: string;
  dailyChallengeCompleted: boolean;
  dailyChallengeDate: string | null;
}

export interface UseProgressReturn extends ProgressState {
  completeLesson: (lessonId: string, xpReward: number) => void;
  getLessonCompletion: (lessonId: string) => boolean;
  getCategoryCompletion: (categoryId: string) => number;
  getTotalCompletion: () => number;
  getTotalXP: () => number;
  getCurrentStreak: () => number;
  getBestStreak: () => number;
  /** @param scorePercent 0-100 correctness. @param xpEarned XP to award. */
  recordQuizScore: (quizId: string, scorePercent: number, xpEarned?: number) => void;
  /** Exercises are tracked separately so they do not skew quiz accuracy stats. */
  recordExerciseScore: (exerciseId: string, scorePercent: number, xpEarned?: number) => void;
  getExerciseScore: (exerciseId: string) => number | null;
  getQuizScore: (quizId: string) => number | undefined;
  setUserName: (name: string) => void;
  getUserName: () => string;
  completeDailyChallenge: () => void;
  isDailyChallengeCompleted: () => boolean;
  resetProgress: () => void;
  getActivityLog: () => ActivityItem[];
  getLessonsCompletedCount: () => number;
  getQuizzesPassedCount: () => number;
  getAccuracyRate: () => number;
  // Tier progression
  getTierForLesson: (lessonId: string) => number;
  isTierUnlocked: (tierNumber: number) => boolean;
  isLessonUnlocked: (lessonId: string) => boolean;
  getTierCompletion: (tierId: number) => number;
}

// ── Helpers ──
/**
 * Date keys are LOCAL, not UTC.
 *
 * `toISOString().split('T')[0]` was used before, which is a UTC key. Both shops
 * sit at UTC+1/+2, so a seller wrapping up at 01:00 local was still "yesterday"
 * in UTC — their streak silently failed to advance and then reset two days
 * later, despite them being active every single day. A streak is a human-day
 * concept, so it must use the human's day.
 */
function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getToday(): string {
  return dateKey(new Date());
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dateKey(d);
}

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked. Losing a write is survivable; throwing from
    // inside a setState updater is not — it crashes to the ErrorBoundary.
  }
}

/** Has the streak lapsed (last activity older than yesterday)? */
function hasStreakExpired(s: StreakData, today: string, yesterday: string): boolean {
  if (!s.lastActiveDate) return false;
  return s.lastActiveDate !== today && s.lastActiveDate !== yesterday;
}

// ── Hook ──
export function useProgress(): UseProgressReturn {
  /*
   * State is seeded with lazy initialisers rather than loaded in a mount
   * effect. localStorage is synchronous, so there is nothing to wait for, and
   * reading it during the first render means no flash of empty progress — and
   * no setState-in-effect.
   *
   * The initialisers are pure reads. A lapsed streak is NOT written back here;
   * `getCurrentStreak()` derives 0 for an expired streak, and `updateStreak()`
   * rewrites the record on the next real activity.
   */
  const [lessonProgress, setLessonProgress] = useState<Record<string, boolean>>(() =>
    loadJSON<Record<string, boolean>>(LS_LESSON_PROGRESS, {})
  );
  const [quizScores, setQuizScores] = useState<Record<string, number>>(() =>
    loadJSON<Record<string, number>>(LS_QUIZ_SCORES, {})
  );
  const [exerciseScores, setExerciseScores] = useState<Record<string, number>>(() =>
    loadJSON<Record<string, number>>(LS_EXERCISE_SCORES, {})
  );
  const [streak, setStreak] = useState<StreakData>(() =>
    loadJSON<StreakData>(LS_STREAK, { current: 0, best: 0, lastActiveDate: null })
  );
  const [totalXP, setTotalXP] = useState<number>(() => loadJSON<number>(LS_XP, 0));
  const [userName, setUserNameState] = useState<string>(() => loadJSON<string>(LS_USER_NAME, ''));
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallengeData>(() =>
    loadJSON<DailyChallengeData>(LS_DAILY_CHALLENGE, { completed: false, date: null })
  );
  const [activityLog, setActivityLog] = useState<ActivityItem[]>(() =>
    loadJSON<ActivityItem[]>(LS_ACTIVITY_LOG, [])
  );
  const [tierProgress, setTierProgress] = useState<Record<string, boolean>>(() =>
    loadJSON<Record<string, boolean>>(LS_TIER_PROGRESS, {})
  );

  // ── Streak Logic ──
  const updateStreak = useCallback((): StreakData => {
    const today = getToday();
    const yesterday = getYesterday();

    setStreak((prev) => {
      let { current, best, lastActiveDate } = prev;

      if (!lastActiveDate) {
        // First activity ever
        current = 1;
        best = Math.max(best, current);
        lastActiveDate = today;
      } else if (lastActiveDate === today) {
        // Already active today — no streak change
        // keep current values
      } else if (lastActiveDate === yesterday) {
        // Was active yesterday, continued today
        current += 1;
        best = Math.max(best, current);
        lastActiveDate = today;
      } else {
        // Gap of 2+ days — reset
        current = 1;
        best = Math.max(best, current);
        lastActiveDate = today;
      }

      const updated: StreakData = { current, best, lastActiveDate };
      saveJSON(LS_STREAK, updated);
      return updated;
    });

    return loadJSON<StreakData>(LS_STREAK, { current: 0, best: 0, lastActiveDate: null });
  }, []);

  // ── Category Progress ──
  const computeCategoryProgress = useCallback((): Record<string, number> => {
    const result: Record<string, number> = {};
    for (const cat of categories) {
      const lessons = getLessonsForCategory(cat.id);
      if (lessons.length === 0) {
        result[cat.id] = 0;
        continue;
      }
      const completed = lessons.filter((l) => lessonProgress[l.id]).length;
      result[cat.id] = Math.round((completed / lessons.length) * 100);
    }
    return result;
  }, [lessonProgress]);

  const categoryProgress = computeCategoryProgress();

  // ── Actions ──
  const completeLesson = useCallback(
    (lessonId: string, xpReward = 10) => {
      // The reward was previously accepted and then ignored in favour of a
      // hardcoded 10, which made the `xpReward` field on all 31 lessons dead
      // data. Honour what the lesson actually says it is worth.
      const award = Number.isFinite(xpReward) && xpReward > 0 ? Math.round(xpReward) : 10;

      setLessonProgress((prev) => {
        const alreadyCompleted = prev[lessonId];
        const updated = { ...prev, [lessonId]: true };
        saveJSON(LS_LESSON_PROGRESS, updated);

        if (!alreadyCompleted) {
          setTotalXP((xpPrev) => {
            const newXP = xpPrev + award;
            saveJSON(LS_XP, newXP);
            return newXP;
          });

          // Update streak
          updateStreak();

          // Log activity
          setActivityLog((log) => {
            const newItem: ActivityItem = {
              id: `lesson-${lessonId}-${Date.now()}`,
              type: 'lesson',
              title: 'Lesson Completed',
              detail: lessonId,
              xpEarned: award,
              timestamp: new Date().toISOString(),
            };
            const updatedLog = [newItem, ...log].slice(0, 100);
            saveJSON(LS_ACTIVITY_LOG, updatedLog);
            return updatedLog;
          });
        }

        return updated;
      });
    },
    [updateStreak]
  );

  const getLessonCompletion = useCallback(
    (lessonId: string): boolean => {
      return !!lessonProgress[lessonId];
    },
    [lessonProgress]
  );

  const getCategoryCompletion = useCallback(
    (categoryId: string): number => {
      return categoryProgress[categoryId] ?? 0;
    },
    [categoryProgress]
  );

  const getTotalCompletion = useCallback((): number => {
    const allLessons = categories.flatMap((cat) => getLessonsForCategory(cat.id));
    if (allLessons.length === 0) return 0;
    const completed = allLessons.filter((l) => lessonProgress[l.id]).length;
    return Math.round((completed / allLessons.length) * 100);
  }, [lessonProgress]);

  const getTotalXP = useCallback((): number => totalXP, [totalXP]);

  /**
   * PURE. This is called during render by HomeDashboard and ProfilePage.
   *
   * It used to call setStreak() here with a guard that could never be
   * satisfied (it preserved the stale lastActiveDate) and returned a fresh
   * object identity each time, so React could not bail out: render → setState
   * → render → setState → "Too many re-renders". Any seller returning after a
   * weekend hit the error screen on /home, the post-login landing route.
   *
   * The expiry is now written by the effect below instead.
   */
  const getCurrentStreak = useCallback((): number => {
    if (!streak.lastActiveDate) return 0;
    return hasStreakExpired(streak, getToday(), getYesterday()) ? 0 : streak.current;
  }, [streak]);

  const getBestStreak = useCallback((): number => streak.best, [streak.best]);

  /**
   * Record a completed quiz.
   *
   * @param scorePercent 0-100, the share of questions answered correctly.
   * @param xpEarned     XP to add to the running total.
   *
   * These are two different numbers and used to be conflated: the XP value was
   * written into the `quizScores` map, which every consumer then read as a
   * percentage. A quiz worth 50 XP therefore displayed as "50% accuracy" and
   * never counted as passed (the threshold is 70), while the "score 100%"
   * achievement could only unlock if a quiz's XP reward happened to equal 100.
   */
  const recordQuizScore = useCallback((quizId: string, scorePercent: number, xpEarned = 0) => {
    const pct = Math.max(0, Math.min(100, Math.round(scorePercent)));

    setQuizScores((prev) => {
      // Keep the learner's best attempt rather than overwriting with a retry.
      const updated = { ...prev, [quizId]: Math.max(prev[quizId] ?? 0, pct) };
      saveJSON(LS_QUIZ_SCORES, updated);
      return updated;
    });

    // Pay out only what this quiz has not already paid. Retaking a quiz you
    // have aced would otherwise award full XP again every time, so XP — and
    // therefore levels and the leaderboard — could be farmed by replaying.
    // Improving on a previous attempt still earns the difference.
    const alreadyAwarded = loadJSON<Record<string, number>>(LS_QUIZ_XP_AWARDED, {});
    const owed = Math.max(0, Math.round(xpEarned) - (alreadyAwarded[quizId] ?? 0));
    if (owed > 0) {
      alreadyAwarded[quizId] = Math.round(xpEarned);
      saveJSON(LS_QUIZ_XP_AWARDED, alreadyAwarded);
      setTotalXP((xpPrev) => {
        const newXP = xpPrev + owed;
        saveJSON(LS_XP, newXP);
        return newXP;
      });
    }
    updateStreak();

    // Log activity
    setActivityLog((log) => {
      const newItem: ActivityItem = {
        id: `quiz-${quizId}-${Date.now()}`,
        type: 'quiz',
        title: pct === 100 ? 'Quiz Perfect Score!' : 'Quiz Completed',
        detail: owed > 0 ? `${pct}% · +${owed} XP` : `${pct}%`,
        xpEarned: owed,
        timestamp: new Date().toISOString(),
      };
      const updatedLog = [newItem, ...log].slice(0, 100);
      saveJSON(LS_ACTIVITY_LOG, updatedLog);
      return updatedLog;
    });
  }, [updateStreak]);

  /**
   * Exercises are recorded separately from quizzes. They used to share the
   * quizScores map, which inflated "quizzes passed" and skewed the accuracy
   * figure on the profile with rows that were not quizzes.
   */
  const recordExerciseScore = useCallback(
    (exerciseId: string, scorePercent: number, xpEarned = 0) => {
      const pct = Math.max(0, Math.min(100, Math.round(scorePercent)));

      setExerciseScores((prev) => {
        const updated = { ...prev, [exerciseId]: Math.max(prev[exerciseId] ?? 0, pct) };
        saveJSON(LS_EXERCISE_SCORES, updated);
        return updated;
      });

      // Same anti-farming rule as quizzes.
      const key = `ex:${exerciseId}`;
      const alreadyAwarded = loadJSON<Record<string, number>>(LS_QUIZ_XP_AWARDED, {});
      const owed = Math.max(0, Math.round(xpEarned) - (alreadyAwarded[key] ?? 0));
      if (owed > 0) {
        alreadyAwarded[key] = Math.round(xpEarned);
        saveJSON(LS_QUIZ_XP_AWARDED, alreadyAwarded);
        setTotalXP((xpPrev) => {
          const newXP = xpPrev + owed;
          saveJSON(LS_XP, newXP);
          return newXP;
        });
      }
      updateStreak();

      setActivityLog((log) => {
        const newItem: ActivityItem = {
          id: `exercise-${exerciseId}-${Date.now()}`,
          type: 'quiz',
          title: pct === 100 ? 'Exercise Mastered!' : 'Exercise Completed',
          detail: owed > 0 ? `${pct}% · +${owed} XP` : `${pct}%`,
          xpEarned: owed,
          timestamp: new Date().toISOString(),
        };
        const updatedLog = [newItem, ...log].slice(0, 100);
        saveJSON(LS_ACTIVITY_LOG, updatedLog);
        return updatedLog;
      });
    },
    [updateStreak]
  );

  const getExerciseScore = useCallback(
    (exerciseId: string): number | null => exerciseScores[exerciseId] ?? null,
    [exerciseScores]
  );

  const getQuizScore = useCallback(
    (quizId: string): number | undefined => {
      return quizScores[quizId];
    },
    [quizScores]
  );

  const setUserNameWrapper = useCallback((name: string) => {
    setUserNameState(name);
    saveJSON(LS_USER_NAME, name);
  }, []);

  const getUserName = useCallback((): string => userName, [userName]);

  const completeDailyChallenge = useCallback(() => {
    const today = getToday();
    setDailyChallenge({ completed: true, date: today });
    saveJSON(LS_DAILY_CHALLENGE, { completed: true, date: today });

    // Award XP
    setTotalXP((prev) => {
      const newXP = prev + 20;
      saveJSON(LS_XP, newXP);
      return newXP;
    });

    // Update streak
    updateStreak();

    // Log activity
    setActivityLog((log) => {
      const newItem: ActivityItem = {
        id: `challenge-${Date.now()}`,
        type: 'challenge',
        title: 'Daily Challenge Completed',
        xpEarned: 20,
        timestamp: new Date().toISOString(),
      };
      const updatedLog = [newItem, ...log].slice(0, 100);
      saveJSON(LS_ACTIVITY_LOG, updatedLog);
      return updatedLog;
    });
  }, [updateStreak]);

  const isDailyChallengeCompleted = useCallback((): boolean => {
    const today = getToday();
    return dailyChallenge.date === today && dailyChallenge.completed;
  }, [dailyChallenge]);

  const resetProgress = useCallback(() => {
    setLessonProgress({});
    setQuizScores({});
    setStreak({ current: 0, best: 0, lastActiveDate: null });
    setTotalXP(0);
    setUserNameState('');
    setDailyChallenge({ completed: false, date: null });
    setActivityLog([]);
    setTierProgress({});

    localStorage.removeItem(LS_LESSON_PROGRESS);
    localStorage.removeItem(LS_QUIZ_SCORES);
    localStorage.removeItem(LS_STREAK);
    localStorage.removeItem(LS_XP);
    localStorage.removeItem(LS_USER_NAME);
    localStorage.removeItem(LS_DAILY_CHALLENGE);
    localStorage.removeItem(LS_ACTIVITY_LOG);
    localStorage.removeItem(LS_TIER_PROGRESS);
  }, []);

  const getActivityLog = useCallback((): ActivityItem[] => activityLog, [activityLog]);

  const getLessonsCompletedCount = useCallback((): number => {
    return Object.values(lessonProgress).filter(Boolean).length;
  }, [lessonProgress]);

  const getQuizzesPassedCount = useCallback((): number => {
    return Object.values(quizScores).filter((s) => s >= 70).length;
  }, [quizScores]);

  const getAccuracyRate = useCallback((): number => {
    const scores = Object.values(quizScores);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [quizScores]);

  // ── Tier Progression ──
  const getTierForLessonWrapper = useCallback(
    (lessonId: string): number => {
      return getTierForLesson(lessonId);
    },
    []
  );

  const isTierUnlockedWrapper = useCallback(
    (tierNumber: number): boolean => {
      return isTierUnlocked(tierNumber, lessonProgress);
    },
    [lessonProgress]
  );

  const isLessonUnlockedWrapper = useCallback(
    (lessonId: string): boolean => {
      return isLessonUnlocked(lessonId, lessonProgress);
    },
    [lessonProgress]
  );

  const getTierCompletionWrapper = useCallback(
    (tierId: number): number => {
      return getTierCompletion(tierId, lessonProgress);
    },
    [lessonProgress]
  );

  return {
    lessonProgress,
    categoryProgress,
    tierProgress,
    totalXP,
    currentStreak: streak.current,
    bestStreak: streak.best,
    lastActiveDate: streak.lastActiveDate,
    quizScores,
    userName,
    dailyChallengeCompleted: dailyChallenge.completed,
    dailyChallengeDate: dailyChallenge.date,
    completeLesson,
    getLessonCompletion,
    getCategoryCompletion,
    getTotalCompletion,
    getTotalXP,
    getCurrentStreak,
    getBestStreak,
    recordQuizScore,
    recordExerciseScore,
    getExerciseScore,
    getQuizScore,
    setUserName: setUserNameWrapper,
    getUserName,
    completeDailyChallenge,
    isDailyChallengeCompleted,
    resetProgress,
    getActivityLog,
    getLessonsCompletedCount,
    getQuizzesPassedCount,
    getAccuracyRate,
    // Tier progression
    getTierForLesson: getTierForLessonWrapper,
    isTierUnlocked: isTierUnlockedWrapper,
    isLessonUnlocked: isLessonUnlockedWrapper,
    getTierCompletion: getTierCompletionWrapper,
  };
}

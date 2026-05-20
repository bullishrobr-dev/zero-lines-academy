// ─────────────────────────────────────────────────────────────
// useProgress.ts — Comprehensive progress tracking hook
// Manages lessons, XP, streaks, quizzes, daily challenges
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from 'react';
import { categories, getLessonsForCategory } from '@/data/lessons';

// ── localStorage keys ──
const LS_LESSON_PROGRESS = 'zl_lesson_progress';
const LS_QUIZ_SCORES = 'zl_quiz_scores';
const LS_STREAK = 'zl_streak';
const LS_XP = 'zl_xp';
const LS_USER_NAME = 'zl_user_name';
const LS_DAILY_CHALLENGE = 'zl_daily_challenge';
const LS_ACTIVITY_LOG = 'zl_activity_log';

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
  recordQuizScore: (quizId: string, score: number) => void;
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
}

// ── Helpers ──
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
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
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Hook ──
export function useProgress(): UseProgressReturn {
  const [lessonProgress, setLessonProgress] = useState<Record<string, boolean>>({});
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [streak, setStreak] = useState<StreakData>({ current: 0, best: 0, lastActiveDate: null });
  const [totalXP, setTotalXP] = useState<number>(0);
  const [userName, setUserNameState] = useState<string>('');
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallengeData>({ completed: false, date: null });
  const [activityLog, setActivityLog] = useState<ActivityItem[]>([]);
  const initialized = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    setLessonProgress(loadJSON<Record<string, boolean>>(LS_LESSON_PROGRESS, {}));
    setQuizScores(loadJSON<Record<string, number>>(LS_QUIZ_SCORES, {}));
    setStreak(loadJSON<StreakData>(LS_STREAK, { current: 0, best: 0, lastActiveDate: null }));
    setTotalXP(loadJSON<number>(LS_XP, 0));
    setUserNameState(loadJSON<string>(LS_USER_NAME, ''));
    setDailyChallenge(loadJSON<DailyChallengeData>(LS_DAILY_CHALLENGE, { completed: false, date: null }));
    setActivityLog(loadJSON<ActivityItem[]>(LS_ACTIVITY_LOG, []));
  }, []);

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
    (lessonId: string, _xpReward: number) => {
      setLessonProgress((prev) => {
        const alreadyCompleted = prev[lessonId];
        const updated = { ...prev, [lessonId]: true };
        saveJSON(LS_LESSON_PROGRESS, updated);

        if (!alreadyCompleted) {
          // Small XP for completing the lesson (10 XP)
          setTotalXP((xpPrev) => {
            const newXP = xpPrev + 10;
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
              xpEarned: xpReward,
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

  const getCurrentStreak = useCallback((): number => {
    // Validate streak hasn't expired (in case days passed without activity)
    const today = getToday();
    const yesterday = getYesterday();
    if (!streak.lastActiveDate) return 0;
    if (streak.lastActiveDate === today || streak.lastActiveDate === yesterday) {
      return streak.current;
    }
    // Streak expired — update silently
    const updated: StreakData = { ...streak, current: 0 };
    setStreak(updated);
    saveJSON(LS_STREAK, updated);
    return 0;
  }, [streak]);

  const getBestStreak = useCallback((): number => streak.best, [streak.best]);

  const recordQuizScore = useCallback((quizId: string, xpEarned: number) => {
    setQuizScores((prev) => {
      const updated = { ...prev, [quizId]: xpEarned };
      saveJSON(LS_QUIZ_SCORES, updated);
      return updated;
    });

    // Only award XP for perfect scores (xpEarned > 0)
    if (xpEarned > 0) {
      setTotalXP((xpPrev) => {
        const newXP = xpPrev + xpEarned;
        saveJSON(LS_XP, newXP);
        return newXP;
      });
      updateStreak();
    }

    // Log activity
    setActivityLog((log) => {
      const newItem: ActivityItem = {
        id: `quiz-${quizId}-${Date.now()}`,
        type: 'quiz',
        title: xpEarned > 0 ? 'Quiz Perfect Score!' : 'Quiz Completed',
        detail: `${xpEarned > 0 ? '100% +' + xpEarned + ' XP' : 'Not perfect'}`,
        xpEarned,
        timestamp: new Date().toISOString(),
      };
      const updatedLog = [newItem, ...log].slice(0, 100);
      saveJSON(LS_ACTIVITY_LOG, updatedLog);
      return updatedLog;
    });
  }, []);

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

    localStorage.removeItem(LS_LESSON_PROGRESS);
    localStorage.removeItem(LS_QUIZ_SCORES);
    localStorage.removeItem(LS_STREAK);
    localStorage.removeItem(LS_XP);
    localStorage.removeItem(LS_USER_NAME);
    localStorage.removeItem(LS_DAILY_CHALLENGE);
    localStorage.removeItem(LS_ACTIVITY_LOG);
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

  return {
    lessonProgress,
    categoryProgress,
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
  };
}

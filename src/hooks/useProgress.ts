// ─────────────────────────────────────────────────────────────
// useProgress.ts — Comprehensive progress tracking hook
// Manages lessons, XP, streaks, quizzes, daily challenges
//
// WHERE THE NUMBERS LIVE
// ----------------------
// localStorage is the source of truth for everything on this screen. It is
// synchronous, so XP appears the instant it is earned and a seller on a dead
// connection in the street keeps earning normally.
//
// When the database is configured the same figures are ALSO mirrored to the
// server, so they follow the person to a new phone and feed the leaderboard:
//
//   on mount   → pullStats(), then the merge rule in `decideStatsMerge` below.
//                Never a blind overwrite: whichever side has more XP wins, so
//                a new phone cannot wipe a year of progress and offline
//                progress cannot be lost to a stale server row.
//   on change  → pushStats(), debounced, so a quiz does not fire a request per
//                XP point.
//   lessons    → recordLessonComplete()
//   quizzes    → recordQuiz(kind: 'quiz')
//   exercises  → recordQuiz(kind: 'exercise')
//
// Every one of those calls is fire-and-forget and guarded by
// `isDatabaseConfigured`. A rejection is swallowed on purpose: the server is a
// mirror, and a mirror failing must never cost the seller XP or break a screen.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect, useRef } from 'react';
import { categories, getLessonsForCategory } from '@/data/lessons';
import {
  getTierForLesson,
  getTierCompletion,
  isTierUnlocked,
  isLessonUnlocked,

} from '@/data/lessonTiers';
import { useAuthContext } from '@/contexts/AuthContext';
import { isDatabaseConfigured } from '@/backend/mockBackend';
import * as db from '@/backend/db';

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
/**
 * Which once-a-day rewards have already paid out — keyed `<kind>:<local-date>`.
 * The daily dose, check-in, end-of-shift reflection and daily challenge each pay
 * once per day; this is what stops a second tap paying twice.
 */
const LS_DAILY_XP_AWARDED = 'zl_daily_xp_awarded';

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
  /**
   * Pay a once-a-day reward into the real XP total. `kind` is the surface
   * ('dose', 'checkin', 'endshift', 'challenge'); returns false if today's
   * reward for that surface was already claimed.
   */
  awardXP: (kind: string, amount: number, title: string) => boolean;
  completeDailyChallenge: (xpReward?: number) => void;
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

// ── Server mirror ───────────────────────────────────────────────────────────

/**
 * How long to wait after the last change before telling the server.
 *
 * A finished quiz can move XP, the streak and the quiz map within the same
 * tick, and a lesson run moves them again seconds later. The debounce collapses
 * a burst into one request; the figures pushed are always read fresh from
 * localStorage at the moment the timer fires, so the last write wins.
 */
const PUSH_DEBOUNCE_MS = 1500;

/** What this device believes, read straight from localStorage. */
function readDeviceStats(): db.StatsSnapshot {
  const xp = loadJSON<number>(LS_XP, 0);
  const streak = loadJSON<StreakData>(LS_STREAK, { current: 0, best: 0, lastActiveDate: null });
  const lessons = loadJSON<Record<string, boolean>>(LS_LESSON_PROGRESS, {});
  const quizzes = loadJSON<Record<string, number>>(LS_QUIZ_SCORES, {});
  return {
    xp: Number.isFinite(xp) ? xp : 0,
    currentStreak: streak?.current ?? 0,
    bestStreak: streak?.best ?? 0,
    lastActiveDate: streak?.lastActiveDate ?? null,
    lessonsDone: Object.values(lessons).filter(Boolean).length,
    quizzesPassed: Object.values(quizzes).filter((s) => s >= 70).length,
  };
}

export type StatsMerge = 'adopt' | 'push' | 'none';

/**
 * Which way the figures have to travel when this device and the server
 * disagree. Exported because it is the one rule in this file that must never
 * be got wrong, and it is worth being able to test on its own.
 *
 *   server ahead  → 'adopt'  a new phone, or a reinstall. Take the server's
 *                            figures; starting from zero would be a lie and
 *                            pushing that zero would destroy the real total.
 *   device ahead  → 'push'   progress earned offline, or before the database
 *                            existed. The server catches up.
 *   equal         → 'none'   nothing to say. No write in either direction.
 *
 * `serverXP === null` means the server has no row for this person at all, so
 * there is nothing to adopt: push, but only if there is anything to push.
 */
export function decideStatsMerge(deviceXP: number, serverXP: number | null): StatsMerge {
  if (serverXP === null) return deviceXP > 0 ? 'push' : 'none';
  if (serverXP > deviceXP) return 'adopt';
  if (deviceXP > serverXP) return 'push';
  return 'none';
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

  /*
   * The server mirror. `userId` is empty on the roster path and while the
   * session is still resolving, and every call below is guarded on it as well
   * as on `isDatabaseConfigured`, so nothing is attempted until there is a
   * person to attribute it to.
   */
  const { user } = useAuthContext();
  const userId = user?.id ?? '';
  const syncing = isDatabaseConfigured && userId !== '';

  /** The highest XP the server is known to hold. Never push below it. */
  const serverXPRef = useRef(0);
  /**
   * The lesson and quiz counts the server holds.
   *
   * A phone that adopted someone's XP still has an empty lesson map — the stats
   * row carries totals, not which lessons — so pushing this device's count of
   * 0 would erase a real 21. They are a floor, not a starting point. Taking the
   * larger of the two under-reports when a lesson is redone on the new phone,
   * which is the honest direction to be wrong in.
   */
  const serverCountsRef = useRef({ lessonsDone: 0, quizzesPassed: 0 });
  /**
   * True once this instance has actually read the server's row.
   *
   * Nothing is pushed before that. Signing out clears this device's XP (a
   * shared shop tablet must not hand the next seller the last one's progress),
   * so a hook that pushed before pulling could take a freshly-emptied 0 and
   * write it over a real total. Push only once you know what you are replacing.
   */
  const pulledRef = useRef(false);
  /** Set by resetProgress, so a local wipe is not mirrored up as a real zero. */
  const justResetRef = useRef(false);

  const pushStatsToServer = useCallback(() => {
    if (!syncing || !pulledRef.current) return;
    const device = readDeviceStats();
    // The only thing that lowers this device's XP is a local reset, and that
    // must never take the earned total off the server with it.
    if (device.xp < serverXPRef.current) return;
    const snapshot: db.StatsSnapshot = {
      ...device,
      lessonsDone: Math.max(device.lessonsDone, serverCountsRef.current.lessonsDone),
      quizzesPassed: Math.max(device.quizzesPassed, serverCountsRef.current.quizzesPassed),
    };
    serverXPRef.current = snapshot.xp;
    serverCountsRef.current = {
      lessonsDone: snapshot.lessonsDone,
      quizzesPassed: snapshot.quizzesPassed,
    };
    void db.pushStats(userId, snapshot).catch(() => {
      // Offline. The next change tries again; nothing is lost locally.
    });
  }, [syncing, userId]);

  // ── On mount: reconcile with the server, in whichever direction is right ──
  useEffect(() => {
    if (!syncing) return;

    let cancelled = false;
    db.pullStats(userId)
      .then((server) => {
        if (cancelled) return;
        pulledRef.current = true;
        const device = readDeviceStats();
        const decision = decideStatsMerge(device.xp, server ? server.xp : null);
        if (server) {
          serverCountsRef.current = {
            lessonsDone: server.lessonsDone,
            quizzesPassed: server.quizzesPassed,
          };
        }

        if (decision === 'adopt' && server) {
          // A phone that has never seen this account. Adopt rather than start
          // from zero — the seller earned these.
          serverXPRef.current = server.xp;
          saveJSON(LS_XP, server.xp);
          setTotalXP(server.xp);

          const adopted: StreakData = {
            current: server.currentStreak,
            // The best streak is a record, so keep whichever side remembers more.
            best: Math.max(server.bestStreak, device.bestStreak),
            lastActiveDate: server.lastActiveDate,
          };
          saveJSON(LS_STREAK, adopted);
          setStreak(adopted);
          return;
        }

        serverXPRef.current = server?.xp ?? 0;
        if (decision === 'push') pushStatsToServer();
        // 'none' — the two agree. No request, in either direction.
      })
      .catch(() => {
        // No connection, or the row is not readable. `pulledRef` stays false,
        // so this instance stays read-only rather than guessing; the next
        // screen the seller opens tries the pull again.
      });

    return () => {
      cancelled = true;
    };
  }, [syncing, userId, pushStatsToServer]);

  // ── After any change: one debounced push ──
  const settledRef = useRef(false);
  useEffect(() => {
    if (!syncing) return;
    if (!settledRef.current) {
      // The first pass is this instance mounting; the merge above owns that.
      settledRef.current = true;
      return;
    }
    if (justResetRef.current) {
      justResetRef.current = false;
      return;
    }
    const timer = window.setTimeout(pushStatsToServer, PUSH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [totalXP, streak, lessonProgress, quizScores, syncing, pushStatsToServer]);

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

      // Fire-and-forget, and outside the state updater so a re-render can never
      // fire it twice. The upsert is idempotent, so a repeat costs nothing.
      if (syncing) {
        void db.recordLessonComplete(userId, lessonId).catch(() => {
          // The lesson is already ticked off on this device. That is what counts.
        });
      }

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
    [updateStreak, syncing, userId]
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
    // Read before the updater runs, so the server gets the same "best attempt"
    // figure the device keeps rather than a lower retry.
    const bestScore = Math.max(loadJSON<Record<string, number>>(LS_QUIZ_SCORES, {})[quizId] ?? 0, pct);

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

    // `alreadyAwarded[quizId]` is now the running total this quiz has paid out,
    // which is what the quiz_results row records.
    if (syncing) {
      void db.recordQuiz(userId, quizId, 'quiz', bestScore, alreadyAwarded[quizId] ?? 0).catch(() => {
        // Recorded on the device either way.
      });
    }

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
  }, [updateStreak, syncing, userId]);

  /**
   * Exercises are recorded separately from quizzes. They used to share the
   * quizScores map, which inflated "quizzes passed" and skewed the accuracy
   * figure on the profile with rows that were not quizzes.
   */
  const recordExerciseScore = useCallback(
    (exerciseId: string, scorePercent: number, xpEarned = 0) => {
      const pct = Math.max(0, Math.min(100, Math.round(scorePercent)));
      const bestScore = Math.max(
        loadJSON<Record<string, number>>(LS_EXERCISE_SCORES, {})[exerciseId] ?? 0,
        pct
      );

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

      // Same table as quizzes, told apart by `kind` — exercise ids are `ex-…`
      // and quiz ids are `quiz-…`/`lesson-…`, so the two never collide on the
      // (user_id, quiz_id) key.
      if (syncing) {
        void db
          .recordQuiz(userId, exerciseId, 'exercise', bestScore, alreadyAwarded[key] ?? 0)
          .catch(() => {
            // Recorded on the device either way.
          });
      }

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
    [updateStreak, syncing, userId]
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

  /**
   * The one entry point for the once-a-day rewards (dose, check-in, end-of-shift
   * reflection, daily challenge). Adds real XP — the kind that counts toward the
   * leaderboard — advances the streak, and writes the activity log, but only the
   * first time a given `kind` is claimed on a given local day. A second tap is a
   * no-op and returns false, so the screens can promise XP honestly without
   * anyone being able to farm it.
   *
   * Before this, these surfaces showed "+15 XP" toasts and paid nothing into the
   * real total; the XP lived only in a separate daily-flow counter that the
   * leaderboard never saw.
   */
  const awardXP = useCallback(
    (kind: string, amount: number, title: string): boolean => {
      if (amount <= 0) return false;
      const key = `${kind}:${getToday()}`;
      const paid = loadJSON<Record<string, boolean>>(LS_DAILY_XP_AWARDED, {});
      if (paid[key]) return false;
      paid[key] = true;
      saveJSON(LS_DAILY_XP_AWARDED, paid);

      setTotalXP((prev) => {
        const newXP = prev + amount;
        saveJSON(LS_XP, newXP);
        return newXP;
      });
      updateStreak();
      setActivityLog((log) => {
        const newItem: ActivityItem = {
          id: `${kind}-${Date.now()}`,
          type: 'challenge',
          title,
          xpEarned: amount,
          timestamp: new Date().toISOString(),
        };
        const updatedLog = [newItem, ...log].slice(0, 100);
        saveJSON(LS_ACTIVITY_LOG, updatedLog);
        return updatedLog;
      });
      return true;
    },
    [updateStreak]
  );

  const completeDailyChallenge = useCallback(
    (xpReward = 20) => {
      const today = getToday();
      setDailyChallenge({ completed: true, date: today });
      saveJSON(LS_DAILY_CHALLENGE, { completed: true, date: today });
      awardXP('challenge', xpReward, 'Daily Challenge Completed');
    },
    [awardXP]
  );

  const isDailyChallengeCompleted = useCallback((): boolean => {
    const today = getToday();
    return dailyChallenge.date === today && dailyChallenge.completed;
  }, [dailyChallenge]);

  const resetProgress = useCallback(() => {
    // Local only. Clearing this phone is not the same as saying the person
    // never earned anything, so the wipe is never pushed — and the merge on the
    // next sign-in will hand their real total back.
    justResetRef.current = true;

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
    awardXP,
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

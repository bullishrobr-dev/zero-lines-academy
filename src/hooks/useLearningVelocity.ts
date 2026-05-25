import { useState, useEffect, useCallback, useMemo } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FlashcardState {
  cardId: string;
  status: 'new' | 'learning' | 'hard' | 'easy' | 'mature';
  easeFactor: number;
  lastReviewedAt: string | null;
  history: Array<{
    timestamp: string;
    prevStatus: string;
    newStatus: string;
  }>;
}

export interface LessonProgress {
  lessonId: string;
  completedAt: string | null;
  startedAt: string | null;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
}

export interface QuizResult {
  quizId: string;
  lessonId: string;
  score: number;
  completedAt: string;
  timeSpentMs: number;
}

export interface LearningVelocity {
  /** 0-100 composite score */
  score: number;
  /** "Rapid", "Steady", "Slow", "Coasting" */
  label: string;
  /** week-over-week direction */
  trend: 'up' | 'down' | 'stable';
  /** how much changed week-over-week */
  trendPercent: number;
  /** 0-100, higher = more coasting */
  coastingIndex: number;
  /** Component breakdown of the score */
  breakdown: {
    cardsMaturedPerDay: number;
    retentionRate: number;    // 1 - backslides / total
    engagementDepth: number;  // avg dwell time relative to median
  };
  /** ISO timestamp of when this snapshot was computed */
  computedAt: string;
}

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function setItem(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — silently fail
  }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEYS = {
  flashcardState: 'zl_flashcard_state',
  lessonProgress: 'zl_lesson_progress',
  quizResults: 'zl_quiz_results',
  velocityHistory: 'zl_velocity_history',
};

const MEDIAN_CARD_TIME_MS = 15_000; // assumed median time per card (15s)

// ---------------------------------------------------------------------------
// Pure calculation helpers
// ---------------------------------------------------------------------------

/** Count cards that reached "easy" or "mature" status */
function countMaturedCards(cards: FlashcardState[]): number {
  return cards.filter((c) => c.status === 'easy' || c.status === 'mature').length;
}

/**
 * Count "backslides": cards that went from easy/mature → hard again.
 * We look at the history array on each card to detect regressions.
 */
function countBackslides(cards: FlashcardState[]): number {
  let backslides = 0;
  for (const card of cards) {
    if (!card.history || card.history.length === 0) continue;
    for (const entry of card.history) {
      const wentFromEasy = entry.prevStatus === 'easy' || entry.prevStatus === 'mature';
      const wentToHard = entry.newStatus === 'hard';
      if (wentFromEasy && wentToHard) {
        backslides++;
        break; // one backslide per card max
      }
    }
  }
  return backslides;
}

/** Compute retention rate: 1 - (backslides / matured) */
function computeRetentionRate(cards: FlashcardState[]): number {
  const matured = countMaturedCards(cards);
  if (matured === 0) return 1; // perfect retention by default
  const backslides = countBackslides(cards);
  return Math.max(0, 1 - backslides / matured);
}

/**
 * Engagement depth = ratio of user's average time per card vs the median.
 * > 1 means slower than median (more engaged), < 1 means faster.
 */
function computeEngagementDepth(quizzes: QuizResult[]): number {
  if (quizzes.length === 0) return 1;
  const totalTime = quizzes.reduce((sum, q) => sum + q.timeSpentMs, 0);
  const avgTimePerQuiz = totalTime / quizzes.length;
  // Assume each quiz covers ~5 cards on average
  const avgTimePerCard = avgTimePerQuiz / 5;
  return avgTimePerCard / MEDIAN_CARD_TIME_MS;
}

/**
 * Compute coasting index:
 * (review-only sessions / total sessions) * 100
 * + (days since new lesson / 7) * 10
 */
function computeCoastingIndex(
  lessons: LessonProgress[],
  cards: FlashcardState[]
): number {
  const now = Date.now();

  // --- review-only sessions approximation ---
  // Count sessions where user reviewed cards but didn't complete a new lesson
  const totalSessions = cards.reduce((sum, c) => sum + (c.history?.length ?? 0), 0);

  // Count "review-only" sessions: sessions on already-matured cards
  const maturedCardIds = new Set(
    cards.filter((c) => c.status === 'easy' || c.status === 'mature').map((c) => c.cardId)
  );
  const reviewOnlySessions = cards.reduce((sum, c) => {
    if (!maturedCardIds.has(c.cardId)) return sum;
    return sum + (c.history?.length ?? 0);
  }, 0);

  const reviewRatio = totalSessions === 0 ? 0 : (reviewOnlySessions / totalSessions) * 100;

  // --- days since new lesson ---
  const completedLessons = lessons
    .filter((l) => l.status === 'completed' && l.completedAt)
    .sort(
      (a, b) =>
        new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
    );

  let daysSinceNewLesson = 0;
  if (completedLessons.length > 0) {
    const lastCompleted = new Date(completedLessons[0].completedAt!).getTime();
    daysSinceNewLesson = (now - lastCompleted) / (1000 * 60 * 60 * 24);
  }

  const freshnessPenalty = (daysSinceNewLesson / 7) * 10;

  return Math.min(100, Math.round(reviewRatio + freshnessPenalty));
}

/** Derive a human-readable label from the LVS score */
function getLabel(score: number, coastingIndex: number): string {
  if (coastingIndex > 60) return 'Coasting';
  if (score >= 76) return 'Rapid';
  if (score >= 56) return 'Steady';
  if (score >= 31) return 'Slow';
  return 'Needs Focus';
}

/** Derive trend direction by comparing to last week's score */
function computeTrend(current: number, history: Array<{ score: number; date: string }>): {
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
} {
  if (history.length < 2) return { trend: 'stable', trendPercent: 0 };

  // Find the entry closest to 7 days ago
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  const pastEntry = history
    .filter((h) => new Date(h.date).getTime() <= sevenDaysAgo)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  if (!pastEntry) {
    // Fallback: compare with earliest history entry
    const earliest = history[0];
    if (earliest.score === 0) return { trend: 'stable', trendPercent: 0 };
    const pct = ((current - earliest.score) / earliest.score) * 100;
    return {
      trend: pct > 2 ? 'up' : pct < -2 ? 'down' : 'stable',
      trendPercent: Math.round(Math.abs(pct)),
    };
  }

  if (pastEntry.score === 0) return { trend: 'stable', trendPercent: 0 };
  const pct = ((current - pastEntry.score) / pastEntry.score) * 100;
  return {
    trend: pct > 2 ? 'up' : pct < -2 ? 'down' : 'stable',
    trendPercent: Math.round(Math.abs(pct)),
  };
}

// ---------------------------------------------------------------------------
// Main hook
// ---------------------------------------------------------------------------

interface VelocityHistoryEntry {
  score: number;
  date: string; // ISO
}

export function useLearningVelocity(): {
  velocity: LearningVelocity | null;
  isLoading: boolean;
  refresh: () => void;
} {
  const [velocity, setVelocity] = useState<LearningVelocity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const calculate = useCallback(() => {
    // 1. Read raw data
    const cards: FlashcardState[] = getItem(STORAGE_KEYS.flashcardState, []);
    const lessons: LessonProgress[] = getItem(STORAGE_KEYS.lessonProgress, []);
    const quizzes: QuizResult[] = getItem(STORAGE_KEYS.quizResults, []);

    // 2. Compute "days since first lesson"
    const startedLessons = lessons
      .filter((l) => l.startedAt)
      .map((l) => new Date(l.startedAt!).getTime());

    let daysSinceFirstLesson = 1;
    if (startedLessons.length > 0) {
      const earliest = Math.min(...startedLessons);
      daysSinceFirstLesson = Math.max(1, (Date.now() - earliest) / (1000 * 60 * 60 * 24));
    }

    // 3. Component metrics
    const maturedCount = countMaturedCards(cards);
    const cardsMaturedPerDay = maturedCount / daysSinceFirstLesson;
    const retentionRate = computeRetentionRate(cards);
    const engagementDepth = computeEngagementDepth(quizzes);

    // 4. LVS formula
    // LVS = (cardsMaturedPerDay * 20) * retentionRate * (engagementDepth * 0.5 + 0.5)
    const rawScore =
      cardsMaturedPerDay *
      20 *
      retentionRate *
      (engagementDepth * 0.5 + 0.5);

    const clampedScore = Math.min(100, Math.max(0, Math.round(rawScore)));

    // 5. Coasting index
    const coastingIndex = computeCoastingIndex(lessons, cards);

    // 6. Trend (week-over-week)
    const history: VelocityHistoryEntry[] = getItem(STORAGE_KEYS.velocityHistory, []);
    const { trend, trendPercent } = computeTrend(clampedScore, history);

    const label = getLabel(clampedScore, coastingIndex);

    const result: LearningVelocity = {
      score: clampedScore,
      label,
      trend,
      trendPercent,
      coastingIndex,
      breakdown: {
        cardsMaturedPerDay: Math.round(cardsMaturedPerDay * 100) / 100,
        retentionRate: Math.round(retentionRate * 100) / 100,
        engagementDepth: Math.round(engagementDepth * 100) / 100,
      },
      computedAt: new Date().toISOString(),
    };

    // 7. Persist history (keep last 60 days)
    const updatedHistory: VelocityHistoryEntry[] = [
      ...history,
      { score: clampedScore, date: result.computedAt },
    ].filter((h) => {
      const daysOld = (Date.now() - new Date(h.date).getTime()) / (1000 * 60 * 60 * 24);
      return daysOld <= 60;
    });

    setItem(STORAGE_KEYS.velocityHistory, updatedHistory);

    setVelocity(result);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    // Small delay so UI can show loading state
    setTimeout(() => calculate(), 100);
  }, [calculate]);

  return useMemo(
    () => ({ velocity, isLoading, refresh }),
    [velocity, isLoading, refresh]
  );
}

export default useLearningVelocity;

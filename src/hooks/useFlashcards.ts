import { useCallback, useMemo, useState } from 'react';
import { flashcards, categories, type Flashcard } from '../data/flashcards';

// ── Types ───────────────────────────────────────────────────────────────────

export interface CardProgress {
  cardId: string;
  lastReviewed: string; // ISO timestamp
  nextReviewDate: string; // local date key, YYYY-MM-DD
  interval: number; // days
  easeFactor: number; // 1.3 - 2.5
  reviewCount: number;
  consecutiveEasy: number; // track streak of "easy" ratings
}

export interface ReviewLog {
  date: string; // local date key (YYYY-MM-DD)
  cardId: string;
  result: 'again' | 'hard' | 'good' | 'easy';
}

export interface FlashcardState {
  progress: Record<string, CardProgress>;
  /** Recent reviews only — capped, see MAX_REVIEW_LOG. */
  reviewLog: ReviewLog[];
  /** Lifetime review count. The log is trimmed; this number is not. */
  totalReviews: number;
  lastStudyDate: string | null; // YYYY-MM-DD
  currentStreak: number;
}

// ── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY_PROGRESS = 'zl_flashcard_progress';
const STORAGE_KEY_REVIEWS = 'zl_flashcard_reviews';
const STORAGE_KEY_STATE = 'zl_flashcard_state';

const DEFAULT_EASE = 2.0;
const MIN_EASE = 1.3;
const MAX_EASE = 2.5;

const INTERVAL_AGAIN = 1;
const INTERVAL_HARD = 3;
const INTERVAL_GOOD = 7;
const INTERVAL_EASY = 14;

/**
 * The review log grew forever — one entry per rating, kept in localStorage and
 * re-serialised on every single review. A seller doing 40 cards a day filled
 * the 5 MB quota inside a season, at which point every write started throwing.
 * Only the recent tail is ever read (streaks, "reviewed today"), so keep a
 * window and track the lifetime total separately.
 */
const MAX_REVIEW_LOG = 500;

// ── Date helpers ────────────────────────────────────────────────────────────

/**
 * LOCAL date key — matches `src/hooks/useProgress.ts`.
 *
 * These were built with `toISOString().split('T')[0]`, which is a UTC key.
 * Both shops sit at UTC+1/+2, so `addDays('2026-07-29', 1)` returned
 * '2026-07-29': local midnight + 1 day, read back in UTC, lands at 22:00 or
 * 23:00 the *previous* day. Two things broke because of it:
 *
 *   1. A card rated "Again" got nextReviewDate = today, so it was due again
 *      immediately — forever. The session never ended.
 *   2. `lastStudyDate === addDays(today, -1)` could never be true, so the
 *      flashcard streak was pinned at 1 no matter how many days you studied.
 *
 * Never call toISOString() on a date that represents a calendar day.
 */
function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getTodayStr(): string {
  return dateKey(new Date());
}

/** Calendar arithmetic done entirely in local time. */
export function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr; // malformed key — leave it alone
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return dateKey(date);
}

function isBeforeOrEqual(a: string, b: string): boolean {
  return a <= b;
}

// ── Storage helpers ─────────────────────────────────────────────────────────

function emptyState(): FlashcardState {
  return { progress: {}, reviewLog: [], totalReviews: 0, lastStudyDate: null, currentStreak: 0 };
}

function loadState(): FlashcardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATE);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<FlashcardState>;
      const reviewLog = Array.isArray(parsed.reviewLog) ? parsed.reviewLog : [];
      return {
        progress: parsed.progress ?? {},
        reviewLog,
        // Records written before the log was capped have no lifetime counter.
        totalReviews: parsed.totalReviews ?? reviewLog.length,
        lastStudyDate: parsed.lastStudyDate ?? null,
        currentStreak: parsed.currentStreak ?? 0,
      };
    }
  } catch {
    /* corrupt record — start clean rather than crash the deck */
  }
  return emptyState();
}

function saveState(state: FlashcardState): void {
  try {
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
  } catch {
    /* quota or private mode — losing a write beats throwing mid-review */
  }
}

/** Shared by the hook and the standalone export so they can never diverge. */
function applyReview(
  state: FlashcardState,
  cardId: string,
  result: 'again' | 'hard' | 'good' | 'easy',
  today: string
): FlashcardState {
  const existing = state.progress[cardId];

  let interval: number;
  let easeFactor: number;
  let consecutiveEasy: number;

  if (!existing) {
    easeFactor = DEFAULT_EASE;
    consecutiveEasy = result === 'easy' ? 1 : 0;
    switch (result) {
      case 'again': interval = INTERVAL_AGAIN; break;
      case 'hard': interval = INTERVAL_HARD; break;
      case 'good': interval = INTERVAL_GOOD; break;
      case 'easy': interval = INTERVAL_EASY; break;
    }
  } else {
    easeFactor = existing.easeFactor;
    consecutiveEasy = existing.consecutiveEasy;

    switch (result) {
      case 'again':
        interval = INTERVAL_AGAIN;
        easeFactor = Math.max(MIN_EASE, easeFactor - 0.3);
        consecutiveEasy = 0;
        break;
      case 'hard':
        interval = Math.round(existing.interval * 1.2);
        easeFactor = Math.max(MIN_EASE, easeFactor - 0.15);
        consecutiveEasy = 0;
        break;
      case 'good':
        interval = Math.round(existing.interval * easeFactor);
        consecutiveEasy = 0;
        break;
      case 'easy':
        interval = Math.max(INTERVAL_EASY, Math.round(existing.interval * easeFactor * 1.3));
        easeFactor = Math.min(MAX_EASE, easeFactor + 0.1);
        consecutiveEasy = consecutiveEasy + 1;
        break;
    }
    interval = Math.min(interval, 365);
  }

  // At least one day out, always. Otherwise the card is still due today and
  // the review session can never finish.
  interval = Math.max(1, interval);

  const progress: Record<string, CardProgress> = {
    ...state.progress,
    [cardId]: {
      cardId,
      lastReviewed: new Date().toISOString(),
      nextReviewDate: addDays(today, interval),
      interval,
      easeFactor,
      reviewCount: (existing?.reviewCount ?? 0) + 1,
      consecutiveEasy,
    },
  };

  const reviewLog = [...state.reviewLog, { date: today, cardId, result }].slice(-MAX_REVIEW_LOG);

  let currentStreak = state.currentStreak;
  let lastStudyDate = state.lastStudyDate;
  if (lastStudyDate !== today) {
    if (lastStudyDate === addDays(today, -1)) currentStreak += 1;
    else currentStreak = 1;
    lastStudyDate = today;
  }

  return {
    progress,
    reviewLog,
    totalReviews: state.totalReviews + 1,
    lastStudyDate,
    currentStreak,
  };
}

/** Category ids come from the data file, so a renamed deck can't be missed. */
function categoryIds(): string[] {
  return categories.map((c) => c.id);
}

// ── Hook ────────────────────────────────────────────────────────────────────

export interface UseFlashcardsReturn {
  // Data
  allCards: Flashcard[];
  dueCards: Flashcard[];
  dueCount: number;

  // Stats
  totalReviewed: number;
  streak: number;
  masteryPercent: number;
  categoryMastery: Record<string, number>;
  categoryDueCount: Record<string, number>;

  // Actions
  reviewCard: (cardId: string, result: 'again' | 'hard' | 'good' | 'easy') => void;
  getCardProgress: (cardId: string) => CardProgress | null;
  resetProgress: () => void;
  getDueCardsByCategory: (categoryId: string) => Flashcard[];
}

export function useFlashcards(): UseFlashcardsReturn {
  // Real state, not a ref. The ref version was read during render in eight
  // places, which React's rules forbid (a mutation there does not re-render,
  // and under StrictMode/concurrent rendering the reads tear).
  //
  // There is also no `isReady` flag any more. localStorage is synchronous, so
  // the old flag started false, flipped true in an effect and made every deck
  // paint a spinner for one frame it never needed.
  const [state, setState] = useState<FlashcardState>(loadState);

  const today = getTodayStr();

  // ── Derived ─────────────────────────────────────────────────────────────

  const dueCards = useMemo(
    () =>
      flashcards.filter((card) => {
        const prog = state.progress[card.id];
        if (!prog) return true; // never reviewed
        return isBeforeOrEqual(prog.nextReviewDate, today);
      }),
    [state.progress, today]
  );

  const masteryPercent = useMemo(() => {
    const total = flashcards.length;
    if (total === 0) return 0;
    const mastered = Object.values(state.progress).filter(
      (p) => p.consecutiveEasy >= 2 && p.interval >= INTERVAL_EASY
    ).length;
    return Math.round((mastered / total) * 100);
  }, [state.progress]);

  const categoryMastery = useMemo(() => {
    const map: Record<string, number> = {};
    for (const cat of categoryIds()) {
      const catCards = flashcards.filter((f) => f.categoryId === cat);
      const mastered = catCards.filter((c) => {
        const p = state.progress[c.id];
        return p && p.consecutiveEasy >= 2 && p.interval >= INTERVAL_EASY;
      }).length;
      map[cat] = catCards.length === 0 ? 0 : Math.round((mastered / catCards.length) * 100);
    }
    return map;
  }, [state.progress]);

  const categoryDueCount = useMemo(() => {
    const map: Record<string, number> = {};
    for (const cat of categoryIds()) map[cat] = 0;
    for (const card of dueCards) {
      // A card pointing at a deck that no longer exists still counts somewhere
      // rather than throwing — decks get renamed, sellers should not notice.
      map[card.categoryId] = (map[card.categoryId] ?? 0) + 1;
    }
    return map;
  }, [dueCards]);

  // ── Actions ─────────────────────────────────────────────────────────────

  const reviewCard = useCallback(
    (cardId: string, result: 'again' | 'hard' | 'good' | 'easy') => {
      setState((prev) => {
        const next = applyReview(prev, cardId, result, getTodayStr());
        saveState(next);
        return next;
      });
    },
    []
  );

  const getCardProgress = useCallback(
    (cardId: string): CardProgress | null => state.progress[cardId] ?? null,
    [state.progress]
  );

  const getDueCardsByCategory = useCallback(
    (categoryId: string): Flashcard[] => dueCards.filter((c) => c.categoryId === categoryId),
    [dueCards]
  );

  const resetProgress = useCallback(() => {
    const fresh = emptyState();
    setState(fresh);
    try {
      localStorage.removeItem(STORAGE_KEY_PROGRESS);
      localStorage.removeItem(STORAGE_KEY_REVIEWS);
      localStorage.removeItem(STORAGE_KEY_STATE);
    } catch {
      /* non-fatal */
    }
  }, []);

  return {
    allCards: flashcards,
    dueCards,
    dueCount: dueCards.length,
    totalReviewed: state.totalReviews,
    streak: state.currentStreak,
    masteryPercent,
    categoryMastery,
    categoryDueCount,
    reviewCard,
    getCardProgress,
    resetProgress,
    getDueCardsByCategory,
  };
}

// ── Standalone utilities (for non-React callers) ───────────────────────────

export function getDueFlashcards(): Flashcard[] {
  const state = loadState();
  const today = getTodayStr();
  return flashcards.filter((card) => {
    const prog = state.progress[card.id];
    if (!prog) return true;
    return isBeforeOrEqual(prog.nextReviewDate, today);
  });
}

export function getDueCount(): number {
  return getDueFlashcards().length;
}

export function getTotalReviewed(): number {
  return loadState().totalReviews;
}

export function getStreak(): number {
  return loadState().currentStreak;
}

export function getMasteryPercent(): number {
  const { progress } = loadState();
  const total = flashcards.length;
  if (total === 0) return 0;
  const mastered = Object.values(progress).filter(
    (p) => p.consecutiveEasy >= 2 && p.interval >= INTERVAL_EASY
  ).length;
  return Math.round((mastered / total) * 100);
}

/** Same scheduler as the hook — they share `applyReview` so they can't drift. */
export function reviewFlashcard(
  cardId: string,
  result: 'again' | 'hard' | 'good' | 'easy'
): void {
  saveState(applyReview(loadState(), cardId, result, getTodayStr()));
}

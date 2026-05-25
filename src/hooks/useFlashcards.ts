import { useCallback, useEffect, useRef, useState } from 'react';
import { flashcards, type Flashcard } from '../data/flashcards';

// ── Types ───────────────────────────────────────────────────────────────────

export interface CardProgress {
  cardId: string;
  lastReviewed: string; // ISO date string
  nextReviewDate: string; // ISO date string
  interval: number; // days
  easeFactor: number; // 1.3 - 2.5
  reviewCount: number;
  consecutiveEasy: number; // track streak of "easy" ratings
}

export interface ReviewLog {
  date: string; // ISO date (YYYY-MM-DD)
  cardId: string;
  result: 'again' | 'hard' | 'good' | 'easy';
}

export interface FlashcardState {
  progress: Record<string, CardProgress>;
  reviewLog: ReviewLog[];
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

// ── Storage helpers ─────────────────────────────────────────────────────────

function loadState(): FlashcardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATE);
    if (raw) return JSON.parse(raw) as FlashcardState;
  } catch { /* ignore */ }
  return {
    progress: {},
    reviewLog: [],
    lastStudyDate: null,
    currentStreak: 0,
  };
}

function saveState(state: FlashcardState): void {
  try {
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
  } catch { /* ignore */ }
}

function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function isBeforeOrEqual(a: string, b: string): boolean {
  return a <= b;
}

// ── Hook ────────────────────────────────────────────────────────────────────

export interface UseFlashcardsReturn {
  // Data
  allCards: Flashcard[];
  dueCards: Flashcard[];
  dueCount: number;
  isReady: boolean;

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
  const [isReady, setIsReady] = useState(false);
  const stateRef = useRef<FlashcardState>(loadState());
  const [, forceUpdate] = useState(0);

  // Hydration
  useEffect(() => {
    setIsReady(true);
  }, []);

  const emitChange = useCallback(() => {
    saveState(stateRef.current);
    forceUpdate((n) => n + 1);
  }, []);

  const today = getTodayStr();

  // ── Derived: due cards ──────────────────────────────────────────────────

  const dueCards = flashcards.filter((card) => {
    const prog = stateRef.current.progress[card.id];
    if (!prog) return true; // new card, never reviewed
    return isBeforeOrEqual(prog.nextReviewDate, today);
  });

  const dueCount = dueCards.length;

  // ── Stats ───────────────────────────────────────────────────────────────

  const totalReviewed = stateRef.current.reviewLog.length;

  const streak = stateRef.current.currentStreak;

  const masteryPercent = (() => {
    const progress = stateRef.current.progress;
    const total = flashcards.length;
    if (total === 0) return 0;
    const mastered = Object.values(progress).filter(
      (p) => p.consecutiveEasy >= 2 && p.interval >= INTERVAL_EASY
    ).length;
    return Math.round((mastered / total) * 100);
  })();

  const categoryMastery = (() => {
    const map: Record<string, number> = {};
    const progress = stateRef.current.progress;
    for (const cat of ['sales-psychology', 'reading-connecting', 'art-of-stopping', 'product-mastery']) {
      const catCards = flashcards.filter((f) => f.categoryId === cat);
      const total = catCards.length;
      const mastered = catCards.filter((c) => {
        const p = progress[c.id];
        return p && p.consecutiveEasy >= 2 && p.interval >= INTERVAL_EASY;
      }).length;
      map[cat] = total === 0 ? 0 : Math.round((mastered / total) * 100);
    }
    return map;
  })();

  const categoryDueCount = (() => {
    const map: Record<string, number> = {};
    for (const cat of ['sales-psychology', 'reading-connecting', 'art-of-stopping', 'product-mastery']) {
      map[cat] = flashcards.filter((card) => {
        if (card.categoryId !== cat) return false;
        const prog = stateRef.current.progress[card.id];
        if (!prog) return true;
        return isBeforeOrEqual(prog.nextReviewDate, today);
      }).length;
    }
    return map;
  })();

  // ── Actions ─────────────────────────────────────────────────────────────

  const reviewCard = useCallback(
    (cardId: string, result: 'again' | 'hard' | 'good' | 'easy') => {
      const state = stateRef.current;
      const existing = state.progress[cardId];

      let interval: number;
      let easeFactor: number;
      let consecutiveEasy: number;

      if (!existing) {
        // First review
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

        // Cap at 365 days max
        interval = Math.min(interval, 365);
      }

      const nextReviewDate = addDays(today, interval);

      state.progress[cardId] = {
        cardId,
        lastReviewed: new Date().toISOString(),
        nextReviewDate,
        interval,
        easeFactor,
        reviewCount: (existing?.reviewCount ?? 0) + 1,
        consecutiveEasy,
      };

      state.reviewLog.push({
        date: today,
        cardId,
        result,
      });

      // ── Streak logic ────────────────────────────────────────────────────

      if (state.lastStudyDate !== today) {
        if (state.lastStudyDate === addDays(today, -1)) {
          // Consecutive day
          state.currentStreak += 1;
        } else if (!state.lastStudyDate) {
          // First time ever
          state.currentStreak = 1;
        } else {
          // Streak broken
          state.currentStreak = 1;
        }
        state.lastStudyDate = today;
      }

      emitChange();
    },
    [today, emitChange]
  );

  const getCardProgress = useCallback(
    (cardId: string): CardProgress | null => {
      return stateRef.current.progress[cardId] ?? null;
    },
    []
  );

  const getDueCardsByCategory = useCallback(
    (categoryId: string): Flashcard[] => {
      return flashcards.filter((card) => {
        if (card.categoryId !== categoryId) return false;
        const prog = stateRef.current.progress[card.id];
        if (!prog) return true;
        return isBeforeOrEqual(prog.nextReviewDate, today);
      });
    },
    [today]
  );

  const resetProgress = useCallback(() => {
    stateRef.current = {
      progress: {},
      reviewLog: [],
      lastStudyDate: null,
      currentStreak: 0,
    };
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
    localStorage.removeItem(STORAGE_KEY_REVIEWS);
    localStorage.removeItem(STORAGE_KEY_STATE);
    emitChange();
  }, [emitChange]);

  return {
    allCards: flashcards,
    dueCards,
    dueCount,
    isReady,
    totalReviewed,
    streak,
    masteryPercent,
    categoryMastery,
    categoryDueCount,
    reviewCard,
    getCardProgress,
    resetProgress,
    getDueCardsByCategory,
  };
}

// ── Standalone utility functions (for non-React usage) ─────────────────────

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
  const state = loadState();
  return state.reviewLog.length;
}

export function getStreak(): number {
  const state = loadState();
  return state.currentStreak;
}

export function getMasteryPercent(): number {
  const state = loadState();
  const progress = state.progress;
  const total = flashcards.length;
  if (total === 0) return 0;
  const mastered = Object.values(progress).filter(
    (p) => p.consecutiveEasy >= 2 && p.interval >= INTERVAL_EASY
  ).length;
  return Math.round((mastered / total) * 100);
}

export function reviewFlashcard(
  cardId: string,
  result: 'again' | 'hard' | 'good' | 'easy'
): void {
  const state = loadState();
  const today = getTodayStr();
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

  const nextReviewDate = addDays(today, interval);

  state.progress[cardId] = {
    cardId,
    lastReviewed: new Date().toISOString(),
    nextReviewDate,
    interval,
    easeFactor,
    reviewCount: (existing?.reviewCount ?? 0) + 1,
    consecutiveEasy,
  };

  state.reviewLog.push({ date: today, cardId, result });

  if (state.lastStudyDate !== today) {
    if (state.lastStudyDate === addDays(today, -1)) {
      state.currentStreak += 1;
    } else if (!state.lastStudyDate) {
      state.currentStreak = 1;
    } else {
      state.currentStreak = 1;
    }
    state.lastStudyDate = today;
  }

  saveState(state);
}

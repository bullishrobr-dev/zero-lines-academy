import { useState, useCallback, useEffect } from "react";

export interface Flashcard {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StreakDefenseState {
  currentStreak: number;
  lastActivityDate: string | null;
  defendedToday: boolean;
}

const STORAGE_KEY = "zl_streak_defense";

const DEFENSE_FLASHCARDS: Flashcard[] = [
  {
    id: "fc1",
    question: "What is the first step in the Zero Lines sales process?",
    options: ["Build rapport", "Qualify the customer", "Present the product", "Ask for the sale"],
    correctIndex: 0,
    explanation: "Building rapport establishes trust before anything else.",
  },
  {
    id: "fc2",
    question: "How do you handle a price objection?",
    options: ["Lower the price", "Explain value vs. cost", "Ignore it", "Change the subject"],
    correctIndex: 1,
    explanation: "Always tie price back to the value the customer receives.",
  },
  {
    id: "fc3",
    question: "What does 'ASSUME THE SALE' mean?",
    options: ["Pressure the customer", "Proceed with confidence", "Skip steps", "Talk louder"],
    correctIndex: 1,
    explanation: "Confidence and assuming success changes the energy of the interaction.",
  },
  {
    id: "fc4",
    question: "Best way to follow up after a demo?",
    options: ["Wait for them to call", "Send a thank-you + next steps", "Call every hour", "Send a long email"],
    correctIndex: 1,
    explanation: "A timely thank-you with clear next steps keeps momentum alive.",
  },
  {
    id: "fc5",
    question: "What is active listening?",
    options: ["Nodding silently", "Repeating back what you heard", "Waiting to talk", "Taking notes only"],
    correctIndex: 1,
    explanation: "Repeating back confirms understanding and builds rapport.",
  },
  {
    id: "fc6",
    question: "How do you create urgency without pressure?",
    options: ["Fake scarcity", "Highlight genuine limited availability", "Rush the customer", "Avoid the topic"],
    correctIndex: 1,
    explanation: "Authentic urgency based on real limitations is most effective.",
  },
];

function loadState(): StreakDefenseState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { currentStreak: 7, lastActivityDate: null, defendedToday: false };
}

function saveState(state: StreakDefenseState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Returns today's date as YYYY-MM-DD string
 */
function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Check if it's after 8pm local time
 */
function isAfter8pm(): boolean {
  const hour = new Date().getHours();
  return hour >= 20;
}

export function useStreakDefense() {
  const [state, setState] = useState<StreakDefenseState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  /**
   * Streak is at risk if:
   * - Streak > 3 days
   * - No activity recorded today
   * - It's after 8pm
   * - Haven't already defended today
   */
  const isStreakAtRisk = useCallback((): boolean => {
    if (state.currentStreak <= 3) return false;
    if (state.defendedToday) return false;
    if (state.lastActivityDate === todayStr()) return false;
    return isAfter8pm();
  }, [state]);

  /**
   * Get a shuffled set of flashcards for the defense session
   */
  const getDefenseFlashcards = useCallback((count = 3): Flashcard[] => {
    const shuffled = [...DEFENSE_FLASHCARDS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }, []);

  /**
   * Complete the streak defense — maintain the streak
   */
  const defendStreak = useCallback((): void => {
    setState((prev) => ({
      ...prev,
      lastActivityDate: todayStr(),
      defendedToday: true,
    }));
  }, []);

  /**
   * Lose the streak — reset to 0
   */
  const loseStreak = useCallback((): void => {
    setState((prev) => ({
      ...prev,
      currentStreak: 0,
      lastActivityDate: null,
      defendedToday: false,
    }));
  }, []);

  /**
   * Reset for testing purposes
   */
  const resetStreak = useCallback((streakDays = 7): void => {
    setState({
      currentStreak: streakDays,
      lastActivityDate: null,
      defendedToday: false,
    });
  }, []);

  return {
    state,
    isStreakAtRisk,
    getDefenseFlashcards,
    defendStreak,
    loseStreak,
    resetStreak,
  };
}

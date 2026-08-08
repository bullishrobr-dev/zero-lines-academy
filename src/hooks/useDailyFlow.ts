import { useState, useCallback, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────

interface CheckInData {
  mood: number;
  goal: number;
  focus: string;
}

interface ReflectionData {
  stops: number;
  inside: number;
  bestMoment: string;
  challenge: string;
  triedFocus: boolean;
  energyRating: number;
  /**
   * The honest audit of the one that got away — see `close-fault`.
   *
   * The owner's method: a seller is only off the hook for a lost sale once they
   * have genuinely been through the list. One of the five slips, or 'none'
   * meaning "I did everything and they still walked", which is the answer that
   * lets them put it down.
   *
   * Optional because every shift logged before this field existed has none.
   */
  slip?: 'words' | 'step' | 'silence' | 'lazy' | 'ladder' | 'none';
}

interface DayRecord {
  date: string; // YYYY-MM-DD
  checkIn: CheckInData | null;
  doseCompletedId: string | null;
  reflection: ReflectionData | null;
  xpEarned: number;
}

interface DailyFlowState {
  today: DayRecord;
  history: DayRecord[];
}

// ─── Constants ───────────────────────────────────────────────────

const STORAGE_KEY_FLOW = 'zl_daily_flow';
const STORAGE_KEY_STREAK = 'zl_daily_streak';

const TODAYS_DATE = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// ─── Helpers ─────────────────────────────────────────────────────

function loadFlowState(): DailyFlowState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FLOW);
    if (raw) {
      const parsed = JSON.parse(raw) as DailyFlowState;
      // If the stored "today" date is not actually today, archive it and start fresh
      if (parsed.today.date !== TODAYS_DATE()) {
        // Archive old today into history if it has any data
        if (
          parsed.today.checkIn ||
          parsed.today.doseCompletedId ||
          parsed.today.reflection
        ) {
          parsed.history = [parsed.today, ...parsed.history].slice(0, 90); // Keep 90 days
        }
        parsed.today = createFreshDayRecord();
        saveFlowState(parsed);
      }
      return parsed;
    }
  } catch {
    // ignore corrupted storage
  }
  const fresh = {
    today: createFreshDayRecord(),
    history: [],
  };
  saveFlowState(fresh);
  return fresh;
}

function saveFlowState(state: DailyFlowState) {
  try {
    localStorage.setItem(STORAGE_KEY_FLOW, JSON.stringify(state));
  } catch {
    // storage full or unavailable
  }
}

function createFreshDayRecord(): DayRecord {
  return {
    date: TODAYS_DATE(),
    checkIn: null,
    doseCompletedId: null,
    reflection: null,
    xpEarned: 0,
  };
}

interface StreakData {
  currentStreak: number;
  lastFullFlowDate: string | null;
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STREAK);
    if (raw) return JSON.parse(raw) as StreakData;
  } catch {
    // ignore
  }
  return { currentStreak: 0, lastFullFlowDate: null };
}

function saveStreak(data: StreakData) {
  try {
    localStorage.setItem(STORAGE_KEY_STREAK, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function isYesterday(dateStr: string): boolean {
  const d = new Date(dateStr + 'T12:00:00');
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate()
  );
}



// ─── Hook ────────────────────────────────────────────────────────

export function useDailyFlow() {
  const [state, setState] = useState<DailyFlowState>(loadFlowState);
  const [streak, setStreak] = useState<StreakData>(loadStreak);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    saveFlowState(state);
  }, [state]);

  useEffect(() => {
    saveStreak(streak);
  }, [streak]);

  // ─── Morning Check-In ─────────────────────────────────────────

  const checkIn = useCallback(
    (data: CheckInData) => {
      setState((prev) => {
        const todayRecord = { ...prev.today, checkIn: data };
        const xpEarned = todayRecord.xpEarned + 5;
        return {
          ...prev,
          today: { ...todayRecord, xpEarned },
        };
      });
    },
    []
  );

  // ─── Complete Daily Dose ──────────────────────────────────────

  const completeDailyDose = useCallback(
    (doseId: string) => {
      setState((prev) => {
        if (prev.today.doseCompletedId) return prev; // Already done
        const xpEarned = prev.today.xpEarned + 15;
        return {
          ...prev,
          today: {
            ...prev.today,
            doseCompletedId: doseId,
            xpEarned,
          },
        };
      });
    },
    []
  );

  // ─── End of Shift Reflection ──────────────────────────────────

  const endOfShift = useCallback(
    (data: ReflectionData) => {
      setState((prev) => {
        const xpEarned = prev.today.xpEarned + 10;
        const updatedToday = {
          ...prev.today,
          reflection: data,
          xpEarned,
        };

        // Check if this completes the full flow and update streak
        const flowCompleted =
          updatedToday.checkIn !== null &&
          updatedToday.doseCompletedId !== null &&
          updatedToday.reflection !== null;

        if (flowCompleted) {
          setStreak((prevStreak) => {
            const lastDate = prevStreak.lastFullFlowDate;
            let newStreak = prevStreak.currentStreak;

            if (!lastDate) {
              newStreak = 1;
            } else if (isYesterday(lastDate) || lastDate === TODAYS_DATE()) {
              // Continuing streak (or same day re-completion)
              newStreak = prevStreak.currentStreak || 1;
              if (lastDate !== TODAYS_DATE()) {
                newStreak += 1;
              }
            } else {
              // Streak broken
              newStreak = 1;
            }

            return {
              currentStreak: newStreak,
              lastFullFlowDate: TODAYS_DATE(),
            };
          });
        }

        return {
          ...prev,
          today: updatedToday,
        };
      });
    },
    []
  );

  // ─── Queries ──────────────────────────────────────────────────

  const getTodayProgress = useCallback(() => {
    return {
      checkedIn: state.today.checkIn !== null,
      doseCompleted: state.today.doseCompletedId !== null,
      reflected: state.today.reflection !== null,
    };
  }, [state.today]);

  const getCurrentStreak = useCallback(() => {
    return streak.currentStreak;
  }, [streak]);

  const isDoseCompleted = useCallback(
    (doseId: string) => {
      return state.today.doseCompletedId === doseId;
    },
    [state.today.doseCompletedId]
  );

  const getTodaysXp = useCallback(() => {
    return state.today.xpEarned;
  }, [state.today.xpEarned]);

  const todayState = state.today;

  return {
    // Actions
    checkIn,
    completeDailyDose,
    endOfShift,

    // Queries
    getTodayProgress,
    getCurrentStreak,
    isDoseCompleted,
    getTodaysXp,
    todayState,
  };
}

// ─── Utility Hook for Components ─────────────────────────────────

export function useDailyFlowProgress() {
  const { getTodayProgress, getCurrentStreak } = useDailyFlow();

  return {
    progress: getTodayProgress(),
    streak: getCurrentStreak(),
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * useDailyFlow — check in, today's dose, end-of-shift reflection, and the
 * streak that runs through them.
 *
 * ── WHY THIS IS A PROVIDER AND NOT A PLAIN HOOK ─────────────────────────────
 * It used to be a plain hook, and five components called it: the dose card, the
 * dose modal, the home screen, the check-in screen, and ShiftNudges. Each call
 * ran its own `useState(loadFlowState)`, so each held a private snapshot taken
 * when it mounted. There is no storage event for same-document writes and
 * nothing subscribed to anything, so those snapshots never reconciled.
 *
 * Two things that broke:
 *
 *   • The dose card and the dose modal sit in the same screen. The modal wrote
 *     the completion into ITS copy; the card read completion from ITS OWN. The
 *     tick could not appear until the card remounted.
 *
 *   • Worse, ShiftNudges is mounted in App.tsx OUTSIDE the router, so it lives
 *     for the whole session and its snapshot is whatever was true at app open —
 *     `checkedIn: false`. It gates every nudge on `getTodayProgress().checkedIn`.
 *     A seller opened the app, checked in, worked a full shift, and the nudge
 *     engine spent the day believing they had never come on shift. The feature
 *     did not misfire; it never fired at all.
 *
 * One provider, one copy, everybody sees the same day.
 * ─────────────────────────────────────────────────────────────────────────── */
import {
  useState,
  useCallback,
  useEffect,
  useContext,
  createContext,
  createElement,
  type ReactNode,
} from 'react';

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
  /**
   * The last day this seller was counted as having shown up.
   *
   * It used to be `lastFullFlowDate` and it moved only when a seller did all
   * three — check in, dose, reflection — on the same day. Almost nobody files
   * the end-of-shift form every single day, so almost nobody ever had a streak:
   * they turned up, checked in, worked, and the counter sat at zero. A streak
   * that only rewards perfect days is not a streak, it is a trophy.
   *
   * Now it moves the moment they check in. Showing up is the thing being
   * counted, because showing up is the thing the owner wants every morning.
   * The old key is still read below so nobody's existing streak resets.
   */
  lastCountedDate: string | null;
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STREAK);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StreakData> & { lastFullFlowDate?: string | null };
      return {
        currentStreak: parsed.currentStreak ?? 0,
        lastCountedDate: parsed.lastCountedDate ?? parsed.lastFullFlowDate ?? null,
      };
    }
  } catch {
    // ignore
  }
  return { currentStreak: 0, lastCountedDate: null };
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



// ─── State ───────────────────────────────────────────────────────

function useDailyFlowState() {
  const [state, setState] = useState<DailyFlowState>(loadFlowState);
  const [streak, setStreak] = useState<StreakData>(loadStreak);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    saveFlowState(state);
  }, [state]);

  useEffect(() => {
    saveStreak(streak);
  }, [streak]);

  /**
   * Count today, once. Idempotent — calling it twice on the same day is a
   * no-op, so it is safe from both check-in and the end-of-shift form.
   */
  const countToday = useCallback(() => {
    setStreak((prev) => {
      if (prev.lastCountedDate === TODAYS_DATE()) return prev;
      const continued = prev.lastCountedDate !== null && isYesterday(prev.lastCountedDate);
      return {
        currentStreak: continued ? prev.currentStreak + 1 : 1,
        lastCountedDate: TODAYS_DATE(),
      };
    });
  }, []);

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
      countToday();
    },
    [countToday]
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
      setState((prev) => ({
        ...prev,
        today: { ...prev.today, reflection: data, xpEarned: prev.today.xpEarned + 10 },
      }));
      /* Also counts the day, for the seller who never opens the check-in but
         does write the shift up. The same-day guard makes it a no-op for
         everyone else. This used to live INSIDE the setState updater, which
         React is entitled to run twice — a reducer is not a place for a side
         effect, however well the guard happened to hold. */
      countToday();
    },
    [countToday]
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

// ─── Provider ────────────────────────────────────────────────────

type DailyFlow = ReturnType<typeof useDailyFlowState>;

const DailyFlowContext = createContext<DailyFlow | null>(null);

export function DailyFlowProvider({ children }: { children: ReactNode }) {
  const value = useDailyFlowState();
  return createElement(DailyFlowContext.Provider, { value }, children);
}

export function useDailyFlow(): DailyFlow {
  const ctx = useContext(DailyFlowContext);
  if (!ctx) throw new Error('useDailyFlow must be used inside <DailyFlowProvider>');
  return ctx;
}

// ─── Utility Hook for Components ─────────────────────────────────

export function useDailyFlowProgress() {
  const { getTodayProgress, getCurrentStreak } = useDailyFlow();

  return {
    progress: getTodayProgress(),
    streak: getCurrentStreak(),
  };
}

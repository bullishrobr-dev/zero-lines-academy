/* ─────────────────────────────────────────────────────────────────────────────
 * useStreetTracker — the shift log: stops, sales, open encounters, the streak.
 *
 * A provider for the same reason useDailyFlow is one. Five components read it,
 * and one of them — ShiftNudges — is mounted in App.tsx outside the router, so
 * it lives for the whole session. As a plain hook that component's `sessions`
 * array was whatever had been in storage at app open, for the rest of the day:
 * it gates nudges on `openEncounter`, so it could not tell that the seller had
 * a customer in the chair, which is the exact moment a buzz costs a sale.
 *
 * The sharper edge was the persistence. Every copy runs
 * `useEffect(() => saveSessions(sessions), [sessions])`. A long-lived copy that
 * only ever READ was one line away from writing its stale snapshot back over a
 * full day of logged sales. Nothing reconciles copies — there is no storage
 * event for same-document writes — so the newest write simply wins.
 * ─────────────────────────────────────────────────────────────────────────── */
import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  createContext,
  createElement,
  type ReactNode,
} from 'react';
import { XP_VALUES, saleXp, DEMO_LOG_XP, STORAGE_KEY, XP_LOG_KEY } from '../types/streetTracker';
import type { StreetSession, DailySummary, DemoLog, XPAward } from '../types/streetTracker';
import { useAuthContext } from '../contexts/AuthContext';
import { useProgress } from './useProgress';
import { isDatabaseConfigured } from '../backend/supabaseClient';
import * as db from '../backend/db';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * LOCAL date key — same convention as `hooks/useProgress.ts`.
 *
 * This was `toISOString().slice(0, 10)`, a UTC key. Both shops run at UTC+1/+2,
 * so anything logged after 22:00 or 23:00 local was filed under *yesterday*:
 * the stop a seller had just recorded vanished from "Today's performance", and
 * the closing hours of every shift — the busy ones — landed on the wrong day.
 */
function dateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getTodayKey(): string {
  return dateKey(new Date());
}

/** N days before today, in local time. */
function daysAgoKey(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return dateKey(d);
}

function loadSessions(): StreetSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: StreetSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    /* quota or private mode — never throw at the seller mid-shift */
  }
}

function loadXPAwards(): XPAward[] {
  try {
    const raw = localStorage.getItem(XP_LOG_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveXPAwards(awards: XPAward[]): void {
  try {
    localStorage.setItem(XP_LOG_KEY, JSON.stringify(awards));
  } catch {
    /* non-fatal */
  }
}

function aggregateDay(sessions: StreetSession[], key: string): DailySummary {
  const daySessions = sessions.filter((s) => s.date === key);
  const stops = daySessions.filter((s) => s.type === 'stop').length;
  const sales = daySessions.filter((s) => s.type === 'sale').length;
  const revenue = daySessions
    .filter((s) => s.type === 'sale')
    .reduce((sum, s) => sum + (s.amount || 0), 0);
  // Of the people you got inside, how many bought. That is the number worth
  // coaching on; it used to be brings ÷ pavement-stops, which measured effort.
  const conversionRate = stops > 0 ? Math.round((sales / stops) * 100) : 0;
  return { date: key, stops, sales, revenue, conversionRate };
}

function useStreetTrackerState() {
  const [sessions, setSessions] = useState<StreetSession[]>(loadSessions);
  const [xpAwards, setXpAwards] = useState<XPAward[]>(loadXPAwards);

  const { user } = useAuthContext();
  const { awardRepeatXP } = useProgress();
  const userId = user?.id ?? '';
  const syncing = isDatabaseConfigured && userId !== '';

  useEffect(() => {
    saveSessions(sessions);
  }, [sessions]);

  useEffect(() => {
    saveXPAwards(xpAwards);
  }, [xpAwards]);

  const logActivity = useCallback(
    (
      type: 'stop' | 'sale',
      productId?: string,
      amount?: number,
      note?: string,
      /* Whether the seller passed this one to the upseller. Optional, and
         optional on purpose — see StreetSession.handedOver. */
      handedOver?: boolean
    ): StreetSession => {
      const entry: StreetSession = {
        id: generateId(),
        date: getTodayKey(),
        type,
        productId,
        amount,
        note,
        timestamp: Date.now(),
        handedOver,
      };
      setSessions((prev) => [...prev, entry]);

      // Mirror the action to the server, so it survives a lost phone and the
      // manager can see the team's funnel. Fire-and-forget: the local log above
      // is the source of truth on the device either way.
      //
      // `handedOver` is NOT sent. The `sales` table has no column for it, and
      // adding one would make the handover a reported number — at which point
      // it stops being a seller's own note and starts being a target, which is
      // how self-reported fields go bad. If the shop ever wants the handover
      // rate on a dashboard it should come from the upseller's own till, not
      // from the person being measured by it.
      if (syncing) {
        void db.recordSale(userId, type, productId, amount).catch(() => {});
      }

      /* What sold decides what it pays, plus the handover if it happened — the
         job ends at the upseller, not at the till. See SALE_XP and HANDOVER_XP
         in types/streetTracker. */
      const points = type === 'sale' ? saleXp(productId, handedOver) : XP_VALUES.stop;
      const activity = type === 'stop' ? 'Brought someone in' : 'Made a sale';
      const award: XPAward = { activity, points, timestamp: Date.now() };
      setXpAwards((prev) => [...prev, award]);

      /* And into the XP the seller actually SEES.
         This log was written to `zl_street_xp`, which the home screen, the
         profile, the level and the leaderboard have never read — they all read
         `zl_xp`. So a seller could log a sale and watch every number in the app
         stay exactly where it was, while checking in was worth 5. The journal
         is the best-built thing here and it was paid in a currency that bought
         nothing. */
      awardRepeatXP(points, activity);

      return entry;
    },
    [syncing, userId, awardRepeatXP]
  );

  /**
   * The encounter still open — someone is in the shop right now and the seller
   * has not said how it went. Only ever one at a time: tapping "brought someone
   * in" again resolves nothing, so the newest open stop is the live one.
   */
  const openEncounter = useMemo((): StreetSession | null => {
    const todayKey = getTodayKey();
    const open = sessions
      .filter((s) => s.date === todayKey && s.type === 'stop' && !s.outcome)
      .sort((a, b) => b.timestamp - a.timestamp);
    return open[0] ?? null;
  }, [sessions]);

  /**
   * Close an open encounter.
   *
   * Deliberately LOCAL ONLY. The counts a manager needs — stops, sales,
   * conversion — already reach the server through logActivity. The *reason*
   * someone walked is the seller's own note on their own game, and the moment
   * it feels like it is being reported upward they will stop answering honestly
   * (or tap the same tile every time), which destroys the only data here that
   * the till cannot already produce. Their notes are theirs.
   */
  const resolveEncounter = useCallback(
    (encounterId: string, outcome: 'sold' | 'walked', reason?: string): void => {
      const at = Date.now();
      setSessions((prev) =>
        prev.map((s) => (s.id === encounterId ? { ...s, outcome, reason, resolvedAt: at } : s))
      );
    },
    []
  );

  /**
   * Write up a demo that did not sell.
   *
   * LOCAL ONLY, and that is a promise rather than an oversight — the owner was
   * asked directly who should see this and the answer was nobody:
   *
   *   "Only the seller. They want to keep it private. They don't want them to
   *    share their thoughts, because they kind of turn it into, in a way, a
   *    journal."
   *
   * The counts a manager needs — stops, sales, conversion — already reach the
   * server through logActivity. What went wrong inside a demo is the seller's
   * own reckoning with their own game, and the moment it can be read by
   * somebody who does the rota, "I filled the silence" stops being an answer
   * anybody gives.
   *
   * Editing an existing log is fine and pays nothing the second time.
   */
  const logDemo = useCallback(
    (encounterId: string, demo: Omit<DemoLog, 'loggedAt'>): void => {
      let firstTime = false;
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id !== encounterId) return s;
          if (!s.demo) firstTime = true;
          return { ...s, demo: { ...demo, loggedAt: Date.now() } };
        })
      );
      if (firstTime) {
        const activity = 'Wrote up a demo';
        setXpAwards((prev) => [...prev, { activity, points: DEMO_LOG_XP, timestamp: Date.now() }]);
        awardRepeatXP(DEMO_LOG_XP, activity);
      }
    },
    [awardRepeatXP]
  );

  /**
   * The most recently closed walk-away of today — the one still stinging.
   *
   * `timestamp` is when they walked IN, so it cannot answer "did this just
   * happen?"; `resolvedAt` can. "Nothing, they just left" is excluded for the
   * same reason it is excluded from the counts: there was no objection, so
   * there is nothing to answer.
   */
  const lastWalkAway = useMemo((): { id: string; reason: string; resolvedAt: number } | null => {
    const todayKey = getTodayKey();
    let latest: { id: string; reason: string; resolvedAt: number } | null = null;
    for (const s of sessions) {
      if (s.date !== todayKey) continue;
      if (s.outcome !== 'walked' || !s.reason || s.reason === 'none') continue;
      if (!s.resolvedAt) continue;
      if (!latest || s.resolvedAt > latest.resolvedAt) {
        latest = { id: s.id, reason: s.reason, resolvedAt: s.resolvedAt };
      }
    }
    return latest;
  }, [sessions]);

  const getTodayLogs = useCallback((): StreetSession[] => {
    const todayKey = getTodayKey();
    return sessions.filter((s) => s.date === todayKey).sort((a, b) => b.timestamp - a.timestamp);
  }, [sessions]);

  /**
   * Walk-away reasons over the last `days` days, most frequent first — the
   * coaching signal, and the only thing in this product the till cannot produce.
   *
   * `days = 1` is today. A week is the window worth acting on: one bad
   * afternoon of "let me think" is noise, five of them across a week is a hole
   * in someone's close, and that is a different conversation.
   */
  const getRecentReasons = useCallback(
    (days = 1): { id: string; count: number }[] => {
      const window = new Set<string>();
      for (let i = 0; i < days; i++) window.add(daysAgoKey(i));

      const counts = new Map<string, number>();
      for (const s of sessions) {
        if (!window.has(s.date) || s.outcome !== 'walked' || !s.reason) continue;
        if (s.reason === 'none') continue; // "they just left" is not a lesson
        counts.set(s.reason, (counts.get(s.reason) ?? 0) + 1);
      }
      return [...counts.entries()]
        .map(([id, count]) => ({ id, count }))
        .sort((a, b) => b.count - a.count);
    },
    [sessions],
  );

  /** Today only. Kept as its own name because the journal reads it that way. */
  const getTodayReasons = useCallback(
    (): { id: string; count: number }[] => getRecentReasons(1),
    [getRecentReasons],
  );

  /**
   * Every written-up demo in the last `days` days, newest first.
   *
   * The coach's whole input. Kept as a plain selector rather than a computed
   * verdict so the reading of it lives in one place (see demoCoach.ts) and can
   * be changed without touching the store.
   */
  const getDemoLogs = useCallback(
    (days = 7): StreetSession[] => {
      const window = new Set<string>();
      for (let i = 0; i < days; i++) window.add(daysAgoKey(i));
      return sessions
        .filter((s) => s.demo && window.has(s.date))
        .sort((a, b) => (b.demo?.loggedAt ?? 0) - (a.demo?.loggedAt ?? 0));
    },
    [sessions],
  );

  const getDailySummary = useCallback(
    (date: string): DailySummary => aggregateDay(sessions, date),
    [sessions]
  );

  /**
   * Lifetime floor totals, for the trophy case.
   *
   * Every achievement in the app was a lesson or a quiz condition — not one
   * referenced a sale, a stop or a customer. A seller could sell a syringe and
   * watch "Closer" stay locked. These are what let selling unlock something.
   */
  const getStreetTotals = useCallback((): {
    totalSales: number;
    totalStops: number;
    bestDaySales: number;
    totalSyringes: number;
    bestDaySyringes: number;
  } => {
    /* Counted by `type`, exactly as aggregateDay() does. Counting
       `outcome === 'sold'` instead would quietly disagree with every other
       number in the app, because a sale is logged as its own entry. */
    let totalSales = 0;
    let totalStops = 0;
    let totalSyringes = 0;
    const byDay = new Map<string, number>();
    const syringesByDay = new Map<string, number>();
    for (const s of sessions) {
      if (s.type === 'stop') totalStops += 1;
      if (s.type === 'sale') {
        totalSales += 1;
        byDay.set(s.date, (byDay.get(s.date) ?? 0) + 1);
        /* Syringes counted separately, because that is what a shift is
           measured on and the badges were handing out "Closer" for ten nail
           kits. `productId` has been written on every sale row since the
           journal was built. */
        if (s.productId === 'syringe') {
          totalSyringes += 1;
          syringesByDay.set(s.date, (syringesByDay.get(s.date) ?? 0) + 1);
        }
      }
    }
    const bestDaySales = byDay.size ? Math.max(...byDay.values()) : 0;
    const bestDaySyringes = syringesByDay.size ? Math.max(...syringesByDay.values()) : 0;
    return { totalSales, totalStops, bestDaySales, totalSyringes, bestDaySyringes };
  }, [sessions]);

  const getWeekSummary = useCallback((): DailySummary[] => {
    const result: DailySummary[] = [];
    for (let i = 6; i >= 0; i--) result.push(aggregateDay(sessions, daysAgoKey(i)));
    return result;
  }, [sessions]);

  const getPersonalBest = useCallback(
    (field: keyof DailySummary): number => {
      const allDates = [...new Set(sessions.map((s) => s.date))];
      if (allDates.length === 0) return 0;
      const values = allDates.map((d) => aggregateDay(sessions, d)[field] as number);
      return Math.max(...values);
    },
    [sessions]
  );

  /** XP earned today. Also a local-day figure, so it matches the log above it. */
  const getTotalXP = useCallback((): number => {
    const todayKey = getTodayKey();
    return xpAwards
      .filter((a) => dateKey(new Date(a.timestamp)) === todayKey)
      .reduce((sum, a) => sum + a.points, 0);
  }, [xpAwards]);

  const getStreak = useCallback((): number => {
    const active = new Set(sessions.map((s) => s.date));
    if (active.size === 0) return 0;

    // Today counts if there is activity; otherwise a streak can still be alive
    // from yesterday (the shift may not have started yet).
    let offset = active.has(getTodayKey()) ? 0 : 1;
    if (!active.has(daysAgoKey(offset))) return 0;

    let streak = 0;
    while (active.has(daysAgoKey(offset))) {
      streak++;
      offset++;
    }
    return streak;
  }, [sessions]);

  return {
    sessions,
    xpAwards,
    logActivity,
    getTodayLogs,
    getTodayReasons,
    getRecentReasons,
    openEncounter,
    lastWalkAway,
    resolveEncounter,
    logDemo,
    getDemoLogs,
    getDailySummary,
    getWeekSummary,
    getStreetTotals,
    getPersonalBest,
    getTotalXP,
    getStreak,
  };
}

// ─── Provider ────────────────────────────────────────────────────────────────

type StreetTracker = ReturnType<typeof useStreetTrackerState>;

const StreetTrackerContext = createContext<StreetTracker | null>(null);

export function StreetTrackerProvider({ children }: { children: ReactNode }) {
  const value = useStreetTrackerState();
  return createElement(StreetTrackerContext.Provider, { value }, children);
}

export function useStreetTracker(): StreetTracker {
  const ctx = useContext(StreetTrackerContext);
  if (!ctx) throw new Error('useStreetTracker must be used inside <StreetTrackerProvider>');
  return ctx;
}

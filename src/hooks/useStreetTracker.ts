import { useState, useCallback, useEffect, useMemo } from 'react';
import { XP_VALUES, STORAGE_KEY, XP_LOG_KEY } from '../types/streetTracker';
import type { StreetSession, DailySummary, XPAward } from '../types/streetTracker';
import { useAuthContext } from '../contexts/AuthContext';
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

export function useStreetTracker() {
  const [sessions, setSessions] = useState<StreetSession[]>(loadSessions);
  const [xpAwards, setXpAwards] = useState<XPAward[]>(loadXPAwards);

  const { user } = useAuthContext();
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
      note?: string
    ): StreetSession => {
      const entry: StreetSession = {
        id: generateId(),
        date: getTodayKey(),
        type,
        productId,
        amount,
        note,
        timestamp: Date.now(),
      };
      setSessions((prev) => [...prev, entry]);

      // Mirror the action to the server, so it survives a lost phone and the
      // manager can see the team's funnel. Fire-and-forget: the local log above
      // is the source of truth on the device either way.
      if (syncing) {
        void db.recordSale(userId, type, productId, amount).catch(() => {});
      }

      const award: XPAward = {
        activity: type === 'stop' ? 'Brought someone in' : 'Made a sale',
        points: XP_VALUES[type],
        timestamp: Date.now(),
      };
      setXpAwards((prev) => [...prev, award]);

      return entry;
    },
    [syncing, userId]
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
      setSessions((prev) =>
        prev.map((s) => (s.id === encounterId ? { ...s, outcome, reason } : s))
      );
    },
    []
  );

  const getTodayLogs = useCallback((): StreetSession[] => {
    const todayKey = getTodayKey();
    return sessions.filter((s) => s.date === todayKey).sort((a, b) => b.timestamp - a.timestamp);
  }, [sessions]);

  /** Today's walk-away reasons, most frequent first — the coaching signal. */
  const getTodayReasons = useCallback((): { id: string; count: number }[] => {
    const todayKey = getTodayKey();
    const counts = new Map<string, number>();
    for (const s of sessions) {
      if (s.date !== todayKey || s.outcome !== 'walked' || !s.reason) continue;
      if (s.reason === 'none') continue; // "they just left" is not a lesson
      counts.set(s.reason, (counts.get(s.reason) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count);
  }, [sessions]);

  const getDailySummary = useCallback(
    (date: string): DailySummary => aggregateDay(sessions, date),
    [sessions]
  );

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
    openEncounter,
    resolveEncounter,
    getDailySummary,
    getWeekSummary,
    getPersonalBest,
    getTotalXP,
    getStreak,
  };
}

import { useState, useCallback, useEffect } from 'react';
import {
  XP_VALUES,
  STORAGE_KEY,
  XP_LOG_KEY,
} from '../types/streetTracker';
import type { StreetSession, DailySummary, XPAward } from '../types/streetTracker';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function loadSessions(): StreetSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: StreetSession[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function loadXPAwards(): XPAward[] {
  try {
    const raw = localStorage.getItem(XP_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveXPAwards(awards: XPAward[]): void {
  localStorage.setItem(XP_LOG_KEY, JSON.stringify(awards));
}

function aggregateDay(sessions: StreetSession[], dateKey: string): DailySummary {
  const daySessions = sessions.filter((s) => s.date === dateKey);
  const stops = daySessions.filter((s) => s.type === 'stop').length;
  const brings = daySessions.filter((s) => s.type === 'bring').length;
  const sales = daySessions.filter((s) => s.type === 'sale').length;
  const revenue = daySessions
    .filter((s) => s.type === 'sale')
    .reduce((sum, s) => sum + (s.amount || 0), 0);
  const conversionRate = stops > 0 ? Math.round((brings / stops) * 100) : 0;
  return { date: dateKey, stops, brings, sales, revenue, conversionRate };
}

export function useStreetTracker() {
  const [sessions, setSessions] = useState<StreetSession[]>(loadSessions);
  const [xpAwards, setXpAwards] = useState<XPAward[]>(loadXPAwards);

  useEffect(() => {
    saveSessions(sessions);
  }, [sessions]);

  useEffect(() => {
    saveXPAwards(xpAwards);
  }, [xpAwards]);

  const logActivity = useCallback(
    (
      type: 'stop' | 'bring' | 'sale',
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

      const points = XP_VALUES[type];
      const award: XPAward = {
        activity:
          type === 'stop'
            ? 'Stopped someone'
            : type === 'bring'
            ? 'Brought them inside'
            : 'Made a sale',
        points,
        timestamp: Date.now(),
      };
      setXpAwards((prev) => [...prev, award]);

      return entry;
    },
    []
  );

  const getTodayLogs = useCallback((): StreetSession[] => {
    const todayKey = getTodayKey();
    return sessions
      .filter((s) => s.date === todayKey)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [sessions]);

  const getDailySummary = useCallback(
    (date: string): DailySummary => {
      return aggregateDay(sessions, date);
    },
    [sessions]
  );

  const getWeekSummary = useCallback((): DailySummary[] => {
    const result: DailySummary[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = getDateKey(d);
      result.push(aggregateDay(sessions, key));
    }
    return result;
  }, [sessions]);

  const getPersonalBest = useCallback(
    (field: keyof DailySummary): number => {
      const allDates = [...new Set(sessions.map((s) => s.date))];
      if (allDates.length === 0) return 0;
      const summaries = allDates.map((d) => aggregateDay(sessions, d));
      const values = summaries.map((s) => s[field] as number);
      return Math.max(...values);
    },
    [sessions]
  );

  const getTotalXP = useCallback((): number => {
    const todayKey = getTodayKey();
    return xpAwards
      .filter((a) => new Date(a.timestamp).toISOString().slice(0, 10) === todayKey)
      .reduce((sum, a) => sum + a.points, 0);
  }, [xpAwards]);

  const getStreak = useCallback((): number => {
    const uniqueDates = [...new Set(sessions.map((s) => s.date))].sort().reverse();
    let streak = 0;
    const today = getTodayKey();
    const yesterday = getDateKey(new Date(Date.now() - 86400000));
    let checkDate = uniqueDates.includes(today) ? today : yesterday;
    for (const date of uniqueDates) {
      if (date === checkDate) {
        streak++;
        const prev = new Date(new Date(checkDate).getTime() - 86400000);
        checkDate = getDateKey(prev);
      } else {
        break;
      }
    }
    return streak;
  }, [sessions]);

  return {
    sessions,
    xpAwards,
    logActivity,
    getTodayLogs,
    getDailySummary,
    getWeekSummary,
    getPersonalBest,
    getTotalXP,
    getStreak,
  };
}

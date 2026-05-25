import { useState, useCallback, useEffect } from "react";

export interface LeaderboardEntry {
  id: string;
  name: string;
  initials: string;
  store: "andorra" | "gibraltar";
  flag: string;
  xpThisWeek: number;
  xpThisMonth: number;
  xpAllTime: number;
  weeklyChange: number; // positive or negative
}

export interface Shoutout {
  id: string;
  from: string;
  fromName: string;
  to: string;
  toName: string;
  message: string;
  reaction: string;
  timestamp: number;
  xpAwarded: number;
}

export type Timeframe = "week" | "month" | "allTime";

const STORAGE_KEY_LEADERBOARD = "zl_leaderboard";
const STORAGE_KEY_SHOUTOUTS = "zl_shoutouts";

const DEFAULT_EMPLOYEES: LeaderboardEntry[] = [
  { id: "u1", name: "Maria Santos", initials: "MS", store: "andorra", flag: "🇦🇩", xpThisWeek: 420, xpThisMonth: 1580, xpAllTime: 8750, weeklyChange: 45 },
  { id: "u2", name: "James Turner", initials: "JT", store: "gibraltar", flag: "🇬🇮", xpThisWeek: 385, xpThisMonth: 1420, xpAllTime: 7200, weeklyChange: -12 },
  { id: "u3", name: "Elena Valls", initials: "EV", store: "andorra", flag: "🇦🇩", xpThisWeek: 360, xpThisMonth: 1350, xpAllTime: 6800, weeklyChange: 30 },
  { id: "u4", name: "Omar Hassan", initials: "OH", store: "gibraltar", flag: "🇬🇮", xpThisWeek: 340, xpThisMonth: 1280, xpAllTime: 6100, weeklyChange: 55 },
  { id: "u5", name: "Lucia Perez", initials: "LP", store: "andorra", flag: "🇦🇩", xpThisWeek: 310, xpThisMonth: 1100, xpAllTime: 5400, weeklyChange: -8 },
  { id: "u6", name: "Daniel Smith", initials: "DS", store: "gibraltar", flag: "🇬🇮", xpThisWeek: 295, xpThisMonth: 1050, xpAllTime: 4900, weeklyChange: 22 },
  { id: "u7", name: "Anna Roca", initials: "AR", store: "andorra", flag: "🇦🇩", xpThisWeek: 270, xpThisMonth: 980, xpAllTime: 4200, weeklyChange: 15 },
  { id: "u8", name: "Kyle Morgan", initials: "KM", store: "gibraltar", flag: "🇬🇮", xpThisWeek: 250, xpThisMonth: 890, xpAllTime: 3800, weeklyChange: -25 },
  { id: "u9", name: "Sofia Ferrer", initials: "SF", store: "andorra", flag: "🇦🇩", xpThisWeek: 230, xpThisMonth: 820, xpAllTime: 3500, weeklyChange: 40 },
  { id: "u10", name: "Ryan Chen", initials: "RC", store: "gibraltar", flag: "🇬🇮", xpThisWeek: 210, xpThisMonth: 750, xpAllTime: 3100, weeklyChange: 18 },
  { id: "u11", name: "Marc Gili", initials: "MG", store: "andorra", flag: "🇦🇩", xpThisWeek: 185, xpThisMonth: 640, xpAllTime: 2800, weeklyChange: -5 },
  { id: "u12", name: "Jake Wilson", initials: "JW", store: "gibraltar", flag: "🇬🇮", xpThisWeek: 160, xpThisMonth: 580, xpAllTime: 2400, weeklyChange: 10 },
];

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADERBOARD);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [...DEFAULT_EMPLOYEES];
}

function saveLeaderboard(data: LeaderboardEntry[]) {
  localStorage.setItem(STORAGE_KEY_LEADERBOARD, JSON.stringify(data));
}

function loadShoutouts(): Shoutout[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SHOUTOUTS);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

function saveShoutouts(data: Shoutout[]) {
  localStorage.setItem(STORAGE_KEY_SHOUTOUTS, JSON.stringify(data));
}

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(loadLeaderboard);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>(loadShoutouts);

  useEffect(() => {
    saveLeaderboard(entries);
  }, [entries]);

  useEffect(() => {
    saveShoutouts(shoutouts);
  }, [shoutouts]);

  const getLeaderboard = useCallback(
    (timeframe: Timeframe): LeaderboardEntry[] => {
      const key =
        timeframe === "week"
          ? "xpThisWeek"
          : timeframe === "month"
          ? "xpThisMonth"
          : "xpAllTime";
      return [...entries].sort((a, b) => b[key] - a[key]).slice(0, 20);
    },
    [entries]
  );

  const getStoreStats = useCallback((): { andorra: number; gibraltar: number } => {
    return entries.reduce(
      (acc, e) => {
        acc[e.store] += e.xpAllTime;
        return acc;
      },
      { andorra: 0, gibraltar: 0 }
    );
  }, [entries]);

  const getUserRank = useCallback(
    (userId: string, timeframe: Timeframe): number => {
      const board = getLeaderboard(timeframe);
      return board.findIndex((e) => e.id === userId) + 1;
    },
    [getLeaderboard]
  );

  const addShoutout = useCallback(
    (
      from: string,
      to: string,
      message: string,
      reaction: string
    ): void => {
      const fromEntry = entries.find((e) => e.id === from);
      const toEntry = entries.find((e) => e.id === to);
      if (!fromEntry || !toEntry) return;

      const shoutout: Shoutout = {
        id: `shout_${Date.now()}`,
        from,
        fromName: fromEntry.name,
        to,
        toName: toEntry.name,
        message,
        reaction,
        timestamp: Date.now(),
        xpAwarded: 5,
      };

      setShoutouts((prev) => [shoutout, ...prev]);

      // Award 5 XP to both users for this week
      setEntries((prev) =>
        prev.map((e) =>
          e.id === from || e.id === to
            ? { ...e, xpThisWeek: e.xpThisWeek + 5, xpAllTime: e.xpAllTime + 5 }
            : e
        )
      );
    },
    [entries]
  );

  const getRecentShoutouts = useCallback(
    (count = 10): Shoutout[] => {
      return shoutouts.slice(0, count);
    },
    [shoutouts]
  );

  return {
    entries,
    shoutouts,
    getLeaderboard,
    getStoreStats,
    getUserRank,
    addShoutout,
    getRecentShoutouts,
  };
}

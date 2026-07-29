// ─────────────────────────────────────────────────────────────────────────────
// useLeaderboard — the Andorra vs Gibraltar board, built from real accounts.
//
// WHAT THIS USED TO DO, AND WHY IT WAS WORSE THAN NOTHING
// -------------------------------------------------------
// Twelve invented employees ("Maria Santos", "James Turner", …) with invented
// XP were hardcoded here, then written to localStorage['zl_leaderboard'] on
// first mount — so the fiction became sticky data that survived every reload
// and looked, to the person holding the phone, exactly like a synced team.
// A seller could lose a week chasing a number nobody had ever earned.
//
// WHAT IT DOES NOW
// ----------------
// The roster is real: it comes from the accounts in `backend/mockBackend`, with
// the shop each seller is actually assigned to. The XP is real too — but this
// device can only ever know ONE person's XP honestly, the signed-in seller's,
// because there is no server. So everybody else is reported as `xp: null`,
// which the UI renders as "awaiting sync" rather than as a number.
//
// No invented figures. No invented ranks. See TODO(backend) below for the one
// place a real fetch belongs.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect, useMemo } from 'react';
import { getUsers } from '../backend/mockBackend';
import type { User } from '../backend/types';

export type Store = 'andorra' | 'gibraltar';
export type Timeframe = 'week' | 'month' | 'allTime';

export interface LeaderboardEntry {
  id: string;
  name: string;
  initials: string;
  store: Store;
  flag: string;
  /**
   * XP known ON THIS DEVICE for the selected timeframe.
   * `null` means "we genuinely do not know" — never render it as a zero or as
   * a guess. Only the signed-in seller can be non-null without a backend.
   */
  xp: number | null;
  /** True for the signed-in seller — the only figure this device measures. */
  isYou: boolean;
}

export interface StoreStanding {
  store: Store;
  name: string;
  flag: string;
  /** Sum of the XP we can actually account for. Never inflated. */
  knownXP: number;
  /** Sellers at this shop whose XP this device knows. */
  syncedCount: number;
  /** Sellers on the roster for this shop. */
  rosterCount: number;
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
  /**
   * Queued locally. It cannot reach the teammate until there is a server, and
   * the UI says exactly that rather than claiming it was delivered.
   */
  pendingSync: boolean;
}

// ── Storage ─────────────────────────────────────────────────────────────────

const STORAGE_KEY_SHOUTOUTS = 'zl_shoutouts';
/** Retired. Only referenced so the old fake roster can be deleted on sight. */
const LEGACY_KEY_FAKE_LEADERBOARD = 'zl_leaderboard';

const LS_XP = 'zl_xp';
const LS_ACTIVITY_LOG = 'zl_activity_log';

const MAX_SHOUTOUTS = 100;

const STORE_META: Record<Store, { name: string; flag: string }> = {
  andorra: { name: 'Andorra', flag: '🇦🇩' },
  gibraltar: { name: 'Gibraltar', flag: '🇬🇮' },
};

export const STORES: Store[] = ['andorra', 'gibraltar'];

// ── Helpers ─────────────────────────────────────────────────────────────────

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or private mode — dropping a write beats throwing */
  }
}

export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface ActivityItem {
  xpEarned: number;
  timestamp: string;
}

/**
 * The signed-in seller's XP for a timeframe, from their real progress record.
 *
 *  · allTime — `zl_xp`, the same number the profile and home dashboard show.
 *  · week / month — summed from `zl_activity_log`, which is the timestamped
 *    stream that feeds `zl_xp`. It keeps the last 100 events, so a very busy
 *    month can under-report; under-reporting is the honest failure direction.
 */
function readOwnXP(timeframe: Timeframe): number {
  if (timeframe === 'allTime') {
    const total = loadJSON<number>(LS_XP, 0);
    return Number.isFinite(total) ? total : 0;
  }

  const days = timeframe === 'week' ? 7 : 30;
  const cutoff = Date.now() - days * 86_400_000;
  const log = loadJSON<ActivityItem[]>(LS_ACTIVITY_LOG, []);
  if (!Array.isArray(log)) return 0;

  return log.reduce((sum, item) => {
    const at = Date.parse(item?.timestamp ?? '');
    if (!Number.isFinite(at) || at < cutoff) return sum;
    const xp = Number(item?.xpEarned);
    return Number.isFinite(xp) ? sum + xp : sum;
  }, 0);
}

function isStore(value: unknown): value is Store {
  return value === 'andorra' || value === 'gibraltar';
}

// ── Hook ────────────────────────────────────────────────────────────────────

export interface UseLeaderboardReturn {
  /** Everyone on the roster, "you" first, then teammates by name. */
  entries: LeaderboardEntry[];
  /** Only entries with a real figure, best first. Ranks come from this list. */
  ranked: LeaderboardEntry[];
  /** Teammates this device has no figure for. Rendered as "awaiting sync". */
  awaitingSync: LeaderboardEntry[];
  standings: StoreStanding[];
  shoutouts: Shoutout[];
  isLoading: boolean;
  /** 1-based rank among `ranked`, or null when the user has no figure. */
  getUserRank: (userId: string) => number | null;
  /** Rejects self-shoutouts and unknown ids. Returns false if not recorded. */
  addShoutout: (from: string, to: string, message: string, reaction: string) => boolean;
  getRecentShoutouts: (count?: number) => Shoutout[];
}

export function useLeaderboard(
  currentUserId: string,
  timeframe: Timeframe = 'week'
): UseLeaderboardReturn {
  const [roster, setRoster] = useState<Omit<User, 'password'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>(() =>
    loadJSON<Shoutout[]>(STORAGE_KEY_SHOUTOUTS, [])
  );

  // Evict the fake roster a previous build persisted, so nobody keeps staring
  // at twelve invented colleagues after upgrading.
  useEffect(() => {
    try {
      localStorage.removeItem(LEGACY_KEY_FAKE_LEADERBOARD);
    } catch {
      /* non-fatal */
    }
  }, []);

  // ── Roster ──────────────────────────────────────────────────────────────
  // TODO(backend): this is the seam. When a real API exists, replace this with
  // GET /leaderboard?timeframe=… returning [{ userId, name, store, xp,
  // syncedAt }] and drop `xp: null` for everyone but the signed-in seller. The
  // rest of this file — ranks, standings, the store race — already works off
  // whatever figures arrive, so nothing downstream has to change.
  useEffect(() => {
    let cancelled = false;
    getUsers()
      .then((users) => {
        if (cancelled) return;
        setRoster(users);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setRoster([]);
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    saveJSON(STORAGE_KEY_SHOUTOUTS, shoutouts);
  }, [shoutouts]);

  // ── Entries ─────────────────────────────────────────────────────────────

  const entries = useMemo<LeaderboardEntry[]>(() => {
    // Sellers race; managers and admins are staff, not competitors. The
    // signed-in person is always included so they can see themselves.
    const competitors = roster.filter(
      (u) => u.role === 'employee' || (currentUserId !== '' && u.id === currentUserId)
    );

    const built = competitors
      .filter((u) => isStore(u.location))
      .map<LeaderboardEntry>((u) => {
        const isYou = u.id === currentUserId;
        const store = u.location as Store;
        return {
          id: u.id,
          name: u.name,
          initials: initialsOf(u.name),
          store,
          flag: STORE_META[store].flag,
          // The one honest number on this device.
          xp: isYou ? readOwnXP(timeframe) : null,
          isYou,
        };
      });

    return built.sort((a, b) => {
      if (a.isYou !== b.isYou) return a.isYou ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [roster, currentUserId, timeframe]);

  const ranked = useMemo(
    () =>
      entries
        .filter((e): e is LeaderboardEntry & { xp: number } => e.xp !== null)
        .sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name)),
    [entries]
  );

  const awaitingSync = useMemo(() => entries.filter((e) => e.xp === null), [entries]);

  // ── Store standings — the Andorra vs Gibraltar race ─────────────────────

  const standings = useMemo<StoreStanding[]>(
    () =>
      STORES.map((store) => {
        const atStore = entries.filter((e) => e.store === store);
        const withFigures = atStore.filter((e) => e.xp !== null);
        return {
          store,
          name: STORE_META[store].name,
          flag: STORE_META[store].flag,
          knownXP: withFigures.reduce((sum, e) => sum + (e.xp ?? 0), 0),
          syncedCount: withFigures.length,
          rosterCount: atStore.length,
        };
      }),
    [entries]
  );

  // ── Rank ────────────────────────────────────────────────────────────────

  /**
   * `findIndex(...) + 1` was returning 1 for the first person and — because
   * findIndex gives -1 when absent — ZERO for anyone not on the board. The
   * page then read `leaderboard[rank - 2]`, i.e. `leaderboard[-2]`, to find
   * "the person ahead of you". Absent now means null, and callers must handle
   * it rather than index into nothing.
   */
  const getUserRank = useCallback(
    (userId: string): number | null => {
      if (!userId) return null;
      const idx = ranked.findIndex((e) => e.id === userId);
      return idx === -1 ? null : idx + 1;
    },
    [ranked]
  );

  // ── Shout-outs ──────────────────────────────────────────────────────────

  const addShoutout = useCallback(
    (from: string, to: string, message: string, reaction: string): boolean => {
      const trimmed = message.trim();
      // You cannot cheer for yourself, and you cannot cheer for a ghost.
      if (!from || !to || from === to || !trimmed) return false;

      const fromEntry = entries.find((e) => e.id === from);
      const toEntry = entries.find((e) => e.id === to);
      if (!fromEntry || !toEntry) return false;

      const shoutout: Shoutout = {
        id: `shout_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        from,
        fromName: fromEntry.name,
        to,
        toName: toEntry.name,
        message: trimmed,
        reaction,
        timestamp: Date.now(),
        // TODO(backend): POST /shoutouts, then clear this flag on the ack.
        pendingSync: true,
      };

      setShoutouts((prev) => [shoutout, ...prev].slice(0, MAX_SHOUTOUTS));
      return true;
    },
    [entries]
  );

  const getRecentShoutouts = useCallback(
    (count = 10): Shoutout[] => shoutouts.slice(0, count),
    [shoutouts]
  );

  return {
    entries,
    ranked,
    awaitingSync,
    standings,
    shoutouts,
    isLoading,
    getUserRank,
    addShoutout,
    getRecentShoutouts,
  };
}

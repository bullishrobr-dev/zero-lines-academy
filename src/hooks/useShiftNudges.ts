// ─────────────────────────────────────────────────────────────────────────────
// useShiftNudges.ts — a sharp colleague tapping you on the shoulder mid-shift.
//
// Every ~35 minutes during a shift, one short prompt: a line to have ready, a
// 20-second drill, a product cue, a reset after a bad run. It arrives as a phone
// notification when the seller has allowed them, and always as a card inside the
// app, so the feature works even where notifications do not.
//
// ── WHAT IS HONESTLY POSSIBLE HERE ──────────────────────────────────────────
// A notification that fires while the app is CLOSED needs a push server holding
// VAPID keys — this app is static files on GitHub Pages, so it has none. What
// works without one:
//
//   • app open, or backgrounded on Android → timers keep running, notifications
//     fire. This covers the real case: phone in an apron pocket during a shift.
//   • iOS → only once the app is installed to the home screen (iOS 16.4+), and
//     iOS suspends background timers aggressively, so it is mostly the in-app
//     card there. The install prompt in PwaPrompts.tsx is what unlocks it.
//   • app fully closed → nothing fires. That is the honest limit, and it is why
//     the in-app card exists rather than notifications alone.
//
// Nudges are deliberately NOT sent while an encounter is open — a buzz in the
// middle of an approach is a lost sale, which is the opposite of helping.
// ─────────────────────────────────────────────────────────────────────────────

import {
  useCallback,
  useContext,
  createContext,
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { NUDGES, pickNudge, type Nudge } from '../data/nudges';
import { useDailyFlow } from './useDailyFlow';
import { useStreetTracker } from './useStreetTracker';

const LS_ENABLED = 'zl_nudges_enabled';
const LS_LAST_AT = 'zl_nudges_last_at';
const LS_SEEN = 'zl_nudges_seen';

/** ~35 minutes. Long enough not to nag, short enough to catch a quiet stretch. */
export const NUDGE_INTERVAL_MS = 35 * 60 * 1000;

/** Shop hours, local. No nudges at 3am — they work evenings, not nights. */
const SHIFT_START_HOUR = 9;
const SHIFT_END_HOUR = 22;

export type NudgePermission = 'unsupported' | 'default' | 'granted' | 'denied';

function readEnabled(): boolean {
  try {
    return localStorage.getItem(LS_ENABLED) === '1';
  } catch {
    return false;
  }
}

function readLastAt(): number {
  try {
    return Number(localStorage.getItem(LS_LAST_AT)) || 0;
  } catch {
    return 0;
  }
}

function writeLastAt(t: number): void {
  try {
    localStorage.setItem(LS_LAST_AT, String(t));
  } catch {
    /* non-fatal */
  }
}

/** Rotate through the deck rather than repeating; wraps when exhausted. */
function nextSeed(): number {
  let seen = 0;
  try {
    seen = Number(localStorage.getItem(LS_SEEN)) || 0;
  } catch {
    /* non-fatal */
  }
  const next = seen + 1;
  try {
    localStorage.setItem(LS_SEEN, String(next % Math.max(NUDGES.length, 1)));
  } catch {
    /* non-fatal */
  }
  return next;
}

function withinShiftHours(d: Date): boolean {
  const h = d.getHours();
  return h >= SHIFT_START_HOUR && h < SHIFT_END_HOUR;
}

function permissionNow(): NudgePermission {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  return Notification.permission as NudgePermission;
}

export interface UseShiftNudges {
  /** The nudge to show in-app right now, or null. */
  current: Nudge | null;
  dismiss: () => void;
  enabled: boolean;
  permission: NudgePermission;
  /** Ask the OS for permission and turn nudges on. Must be called from a tap. */
  enable: () => Promise<boolean>;
  disable: () => void;
  /** Fire one immediately — used by the Settings preview button. */
  sendNow: () => void;
}

function useShiftNudgesState(active: boolean): UseShiftNudges {
  const [enabled, setEnabled] = useState<boolean>(readEnabled);
  const [permission, setPermission] = useState<NudgePermission>(permissionNow);
  const [current, setCurrent] = useState<Nudge | null>(null);
  // Kept in a ref so the scheduling interval below can read the latest value
  // without being torn down and restarted every time `active` flips.
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const show = useCallback((nudge: Nudge) => {
    setCurrent(nudge);
    writeLastAt(Date.now());

    // The OS notification is a bonus on top of the in-app card, never instead
    // of it — permission may be denied, or the platform may not support it.
    if (permissionNow() !== 'granted') return;
    try {
      const isEs = localStorage.getItem('zl_language') === 'es';
      const n = new Notification(isEs ? nudge.titleEs : nudge.title, {
        body: isEs ? nudge.bodyEs : nudge.body,
        icon: './icon-192.png',
        badge: './icon-192.png',
        tag: 'zl-nudge', // replaces the previous one instead of stacking
        silent: false,
      });
      n.onclick = () => {
        window.focus();
        if (nudge.route) window.location.hash = `#${nudge.route}`;
        n.close();
      };
    } catch {
      // Some browsers throw when constructing a Notification outside a service
      // worker. The in-app card above already did the useful part.
    }
  }, []);

  const sendNow = useCallback(() => {
    show(pickNudge(nextSeed()));
  }, [show]);

  const enable = useCallback(async (): Promise<boolean> => {
    if (permissionNow() === 'unsupported') return false;
    let p = Notification.permission as NudgePermission;
    if (p === 'default') {
      try {
        p = (await Notification.requestPermission()) as NudgePermission;
      } catch {
        return false;
      }
    }
    setPermission(p);
    // Denied at OS level still leaves the in-app card working, so this stays on.
    setEnabled(true);
    try {
      localStorage.setItem(LS_ENABLED, '1');
    } catch {
      /* non-fatal */
    }
    return p === 'granted';
  }, []);

  const disable = useCallback(() => {
    setEnabled(false);
    setCurrent(null);
    try {
      localStorage.setItem(LS_ENABLED, '0');
    } catch {
      /* non-fatal */
    }
  }, []);

  const dismiss = useCallback(() => setCurrent(null), []);

  // The scheduler. One interval, checked every minute; the real gate is elapsed
  // time since the last nudge, so a backgrounded tab that wakes late still fires
  // exactly once rather than a burst.
  useEffect(() => {
    if (!enabled) return;

    const maybeFire = () => {
      if (!activeRef.current) return;
      const now = new Date();
      if (!withinShiftHours(now)) return;
      if (document.visibilityState === 'visible' && current) return; // one at a time
      if (Date.now() - readLastAt() < NUDGE_INTERVAL_MS) return;
      show(pickNudge(nextSeed()));
    };

    const id = window.setInterval(maybeFire, 60 * 1000);
    return () => window.clearInterval(id);
  }, [enabled, current, show]);

  return { current, dismiss, enabled, permission, enable, disable, sendNow };
}

// ─── Provider ────────────────────────────────────────────────────────────────
//
// There is one nudge engine, and Settings has to be talking to that one. As a
// plain hook, Settings ran a second copy: turning nudges on there set `enabled`
// on a copy that was thrown away the moment the seller left the screen, while
// the engine mounted in App.tsx carried on with the value it had read at boot.
// The switch flipped, the toast appeared, and nothing happened until the app
// was restarted.
//
// `active` also stops being a parameter. It is not a caller's opinion — it is a
// fact about the shift (are they checked in, is someone in the chair), so the
// provider reads it from the two hooks that own it. Settings used to pass
// `false`, which meant a screen could quietly switch the engine off for as long
// as it was open.

const ShiftNudgesContext = createContext<UseShiftNudges | null>(null);

export function ShiftNudgesProvider({ children }: { children: ReactNode }) {
  const { getTodayProgress } = useDailyFlow();
  const { openEncounter } = useStreetTracker();
  const active = getTodayProgress().checkedIn && !openEncounter;
  const value = useShiftNudgesState(active);
  return createElement(ShiftNudgesContext.Provider, { value }, children);
}

export function useShiftNudges(): UseShiftNudges {
  const ctx = useContext(ShiftNudgesContext);
  if (!ctx) throw new Error('useShiftNudges must be used inside <ShiftNudgesProvider>');
  return ctx;
}

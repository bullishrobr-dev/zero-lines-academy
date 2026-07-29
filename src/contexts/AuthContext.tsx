// ─────────────────────────────────────────────────────────────
// contexts/AuthContext.tsx — Authentication React Context
//
// This provider deliberately does NOT write to `zl_user` itself. It used to
// overwrite the record the backend had just persisted with a smaller "legacy"
// shape — dropping id, email and managerId, and mapping admin down to manager.
// The result was that after any page refresh the signed-in user had no id, and
// admins silently lost admin rights. The backend is the only writer now.
// ─────────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import * as backend from '../backend/mockBackend';
import type { User } from '../backend/types';

/** The roster no longer stores passwords on the user object at all. */
export type SafeUser = User;

interface AuthContextType {
  user: SafeUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Learner state that belongs to whoever is signed in. Cleared on logout so a
 * shared shop tablet does not hand the next seller the previous seller's XP,
 * streak and activity history — or let them factory-reset it.
 */
const PER_USER_KEYS = [
  'zl_lesson_progress',
  'zl_quiz_scores',
  'zl_streak',
  'zl_xp',
  'zl_user_name',
  'zl_daily_challenge',
  'zl_activity_log',
  'zl_tier_progress',
  'zl_daily_flow',
  'zl_daily_streak',
  'zl_flashcard_state',
  'zl_street_tracker',
  'zl_street_xp',
  'zl_streak_defense',
  'zl_continue_learning',
  'zl_location',
];

const LS_LAST_USER = 'zl_last_user_id';

function clearPerUserState() {
  for (const key of PER_USER_KEYS) {
    try {
      localStorage.removeItem(key);
    } catch {
      // non-fatal
    }
  }
}

/**
 * Clearing on logout is not enough on a shared device — someone can close the
 * browser without signing out. Whenever a *different* person signs in, wipe the
 * previous learner's state too.
 */
function claimDeviceFor(userId: string) {
  try {
    if (localStorage.getItem(LS_LAST_USER) !== userId) {
      clearPerUserState();
      localStorage.setItem(LS_LAST_USER, userId);
    }
  } catch {
    // non-fatal
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  /*
   * Roster path: localStorage is synchronous, so seed during the first render.
   * Loading it in an effect meant the route guards saw isAuthenticated: false
   * on first paint and could bounce a signed-in seller to /auth.
   *
   * Database path: the session has to be fetched, so start empty and resolve
   * below. isLoading keeps the guards from redirecting while that is in flight.
   */
  const [user, setUser] = useState<SafeUser | null>(() =>
    backend.isDatabaseConfigured ? null : backend.getCurrentUser()
  );
  const [isLoading, setIsLoading] = useState(backend.isDatabaseConfigured);

  useEffect(() => {
    if (!backend.isDatabaseConfigured) return;
    let cancelled = false;

    /*
     * Never let a slow network hold the app on a blank loading screen. If the
     * session has not resolved in a few seconds — patchy signal in the street,
     * or a free-tier database waking up — fall through to the sign-in page,
     * which is somewhere the seller can actually act.
     */
    const giveUp = setTimeout(() => {
      if (!cancelled) setIsLoading(false);
    }, 8000);

    const settle = (u: SafeUser | null) => {
      if (cancelled) return;
      clearTimeout(giveUp);
      setUser(u);
      setIsLoading(false);
    };

    backend
      .getCurrentUserAsync()
      .then(settle)
      .catch(() => settle(null));

    return () => {
      cancelled = true;
      clearTimeout(giveUp);
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    const result = await backend.login(username, password);
    setIsLoading(false);
    if (result.success && result.user) {
      claimDeviceFor(result.user.id);
      setUser(result.user);
      return { success: true };
    }
    return { success: false, error: result.error };
  }, []);


  const logout = useCallback(() => {
    backend.logout();
    clearPerUserState();
    setUser(null);
  }, []);

  const refreshUser = useCallback(() => {
    void backend.getCurrentUserAsync().then(setUser);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isManager: user?.role === 'manager' || user?.role === 'admin',
      isLoading,
      login,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

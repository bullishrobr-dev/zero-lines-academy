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
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import * as backend from '../backend/mockBackend';
import type { User } from '../backend/types';

export type SafeUser = Omit<User, 'password'>;

interface AuthContextType {
  user: SafeUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: backend.SignupData) => Promise<{ success: boolean; error?: string }>;
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
   * Seeded synchronously. The session lives in localStorage, which is a
   * synchronous read, so there is nothing to wait for — loading it in a mount
   * effect just meant the route guards saw `isAuthenticated: false` on the
   * first paint and could bounce a signed-in seller to /auth before the user
   * landed.
   */
  const [user, setUser] = useState<SafeUser | null>(() => backend.getCurrentUser());
  /** Kept on the interface for callers, but there is no async bootstrap. */
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    const result = await backend.login(email, password);
    setIsLoading(false);
    if (result.success && result.user) {
      claimDeviceFor(result.user.id);
      setUser(result.user);
      return { success: true };
    }
    return { success: false, error: result.error };
  }, []);

  const signup = useCallback(async (data: backend.SignupData) => {
    setIsLoading(true);
    const result = await backend.signup(data);
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
    setUser(backend.getCurrentUser());
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isManager: user?.role === 'manager' || user?.role === 'admin',
      isLoading,
      login,
      signup,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, signup, logout, refreshUser]
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

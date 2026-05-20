// ─────────────────────────────────────────────────────────────
// useAuth.ts — Authentication hook for user management
// Reads/writes zl_user from localStorage
// ─────────────────────────────────────────────────────────────

export interface User {
  name: string;
  location: 'andorra' | 'gibraltar';
  role: 'salesperson' | 'manager';
  language: 'en' | 'es';
  joinedAt: string;
}

const USER_KEY = 'zl_user';

export function useAuth() {
  const getUser = (): User | null => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as User;
      // Validate required fields
      if (parsed.name && parsed.location && parsed.role && parsed.language) {
        return parsed;
      }
    } catch {
      // ignore corrupt data
    }
    return null;
  };

  const setUser = (user: User): void => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem('zl_language', user.language);
      localStorage.setItem('zl_location', user.location);
    } catch {
      // ignore storage errors
    }
  };

  const isAuthenticated = (): boolean => {
    return !!getUser();
  };

  const logout = (): void => {
    try {
      localStorage.removeItem(USER_KEY);
    } catch {
      // ignore
    }
  };

  return { getUser, setUser, isAuthenticated, logout };
}

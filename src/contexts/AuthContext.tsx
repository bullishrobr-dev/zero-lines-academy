// ─────────────────────────────────────────────────────────────
// contexts/AuthContext.tsx — Authentication React Context
// Bridges useAuth localStorage with backend user management
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import * as backend from '../backend/mockBackend';
import type { User } from '../backend/types';

interface AuthContextType {
  user: Omit<User, 'password'> | null;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const current = backend.getCurrentUser();
    setUser(current);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    const result = await backend.login(email, password);
    setIsLoading(false);
    if (result.success && result.user) {
      setUser(result.user);
      // Sync with legacy useAuth format
      localStorage.setItem('zl_user', JSON.stringify({
        name: result.user.name,
        location: result.user.location,
        role: result.user.role === 'admin' ? 'manager' : result.user.role,
        language: 'en',
        joinedAt: result.user.createdAt,
      }));
      return { success: true };
    }
    return { success: false, error: result.error };
  }, []);

  const signup = useCallback(async (data: backend.SignupData) => {
    setIsLoading(true);
    const result = await backend.signup(data);
    setIsLoading(false);
    if (result.success && result.user) {
      setUser(result.user);
      localStorage.setItem('zl_user', JSON.stringify({
        name: result.user.name,
        location: result.user.location,
        role: result.user.role === 'admin' ? 'manager' : result.user.role,
        language: 'en',
        joinedAt: result.user.createdAt,
      }));
      return { success: true };
    }
    return { success: false, error: result.error };
  }, []);

  const logout = useCallback(() => {
    backend.logout();
    localStorage.removeItem('zl_user');
    setUser(null);
  }, []);

  const refreshUser = useCallback(() => {
    setUser(backend.getCurrentUser());
  }, []);

  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager' || user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin,
        isManager,
        isLoading,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

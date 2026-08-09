// ─────────────────────────────────────────────────────────────
// ThemeContext — light / dark / system
// The initial class is applied by an inline script in index.html so there is
// no flash of the wrong theme before React mounts. This provider must resolve
// to the same value that script does.
// ─────────────────────────────────────────────────────────────

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const LS_THEME_KEY = 'zl_theme';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  /** What the user chose. */
  preference: ThemePreference;
  /** What is actually on screen right now. */
  theme: ResolvedTheme;
  setPreference: (p: ThemePreference) => void;
  /** Flip between light and dark, pinning the result (never leaves it on 'system'). */
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function systemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(LS_THEME_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // localStorage unavailable (private mode / blocked cookies)
  }
  return 'system';
}

function apply(theme: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  // Tells the browser to render form controls and scrollbars to match.
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(getStoredPreference);
  /* Only the OS signal is state. The theme actually on screen is derived from
     it, so there is no second copy to keep in sync — and no setState fired
     synchronously from an effect. */
  const [systemIsDark, setSystemIsDark] = useState(() => systemTheme() === 'dark');

  const resolved: ResolvedTheme =
    preference === 'system' ? (systemIsDark ? 'dark' : 'light') : preference;

  // Apply to the document and persist the choice. Side effects only.
  useEffect(() => {
    apply(resolved);
    try {
      localStorage.setItem(LS_THEME_KEY, preference);
    } catch {
      // non-fatal — the theme still applies for this session
    }
  }, [resolved, preference]);

  // Follow the OS. Subscribing always (rather than only while on 'system')
  // keeps `systemIsDark` fresh, so switching back to 'system' is instant.
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const setPreference = useCallback((p: ThemePreference) => setPreferenceState(p), []);

  const toggle = useCallback(() => {
    setPreferenceState((prev) => {
      const current = prev === 'system' ? systemTheme() : prev;
      return current === 'dark' ? 'light' : 'dark';
    });
  }, []);

  const value = useMemo(
    () => ({ preference, theme: resolved, setPreference, toggle }),
    [preference, resolved, setPreference, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

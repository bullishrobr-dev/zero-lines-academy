// ─────────────────────────────────────────────────────────────
// LanguageContext — Manages EN/ES language state
// ─────────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { translations, type TranslationKey, type Language } from '../data/translations';

const LS_LANGUAGE_KEY = 'zl_language';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(LS_LANGUAGE_KEY);
    if (stored === 'en' || stored === 'es') return stored;
  } catch {
    // ignore
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  /* Guarded, unlike the version that shipped.
     ThemeContext and LocationContext both wrap this identical write in a
     try/catch; this one did not — and LanguageProvider sits ABOVE ErrorBoundary
     in App.tsx, so the throw escaped the boundary entirely. A seller whose 5 MB
     quota was full, or who had site data blocked, got a permanent white screen
     with no error card and no way to diagnose it. Measured: 0 characters
     rendered, uncaught pageerror, nothing on screen. */
  useEffect(() => {
    try {
      localStorage.setItem(LS_LANGUAGE_KEY, language);
    } catch {
      // Full or blocked. The language still works for this session; losing the
      // preference is survivable, crashing the whole app is not.
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language]?.[key] ?? translations.en?.[key] ?? key;
    },
    [language]
  );

  /* Memoised, because this object is the context value. A fresh literal here
     would be a new value on every render of this provider, and every consumer
     in the app — the navbar included — would re-render with it even when the
     language had not changed. */
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

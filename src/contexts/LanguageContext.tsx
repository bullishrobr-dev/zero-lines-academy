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

  // Persist language to localStorage
  useEffect(() => {
    localStorage.setItem(LS_LANGUAGE_KEY, language);
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

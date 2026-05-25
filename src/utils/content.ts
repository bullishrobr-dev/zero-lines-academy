// ─────────────────────────────────────────────────────────────────────────────
// content.ts — Content language helper
// All content data uses this to pick the right language
// Future auto-translation script populates the `*Es` fields
// ─────────────────────────────────────────────────────────────────────────────

import { useLanguage } from '../contexts/LanguageContext';

/** Pick the right language string from a bilingual pair */
export function pickLanguage<T>(en: T, es: T): T {
  const { language } = useLanguage();
  return language === 'es' ? es : en;
}

/** Hook version: picks Spanish if available, falls back to English */
export function useContent<T>(en: T, es?: T): T {
  const { language } = useLanguage();
  if (language === 'es' && es !== undefined) return es;
  return en;
}

/** For lesson/quiz/flashcard content — picks the Spanish field if it exists */
export function useContentField<T>(enField: T, esField?: T): T {
  const { language } = useLanguage();
  if (language === 'es' && esField !== undefined && esField !== '' && esField !== null) {
    return esField;
  }
  return enField;
}

/** Check if Spanish content exists and is non-empty */
export function hasSpanish(_en: unknown, es: unknown): boolean {
  return es !== undefined && es !== '' && es !== null;
}

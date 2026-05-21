// ─────────────────────────────────────────────────────────────
// locationText.ts — Template variable replacement for location
// Replaces {{currency}}, {{location}}, {{taxHavenText}} with
// actual values from the current location context.
// ─────────────────────────────────────────────────────────────

import { useLocation } from '../contexts/LocationContext';

export interface LocationTextHelpers {
  /** Replace {{currency}}, {{location}}, {{taxHavenText}} in a string */
  replacePlaceholders: (text: string) => string;
  /** Current currency symbol */
  currency: string;
  /** Current location name */
  location: string;
  /** Current tax haven description */
  taxHavenText: string;
}

/**
 * Hook that provides text replacement helpers using the current location.
 * Usage: const { replacePlaceholders } = useLocationText();
 *        <p>{replacePlaceholders("Only {{currency}}300 here in {{location}}!")}</p>
 */
export function useLocationText(): LocationTextHelpers {
  const { currency, locationName, taxHavenText } = useLocation();

  const replacePlaceholders = (text: string): string => {
    if (!text) return text;
    return text
      .replace(/\{\{currency\}\}/g, currency)
      .replace(/\{\{location\}\}/g, locationName)
      .replace(/\{\{taxHavenText\}\}/g, taxHavenText);
  };

  return {
    replacePlaceholders,
    currency,
    location: locationName,
    taxHavenText,
  };
}

/**
 * Standalone function to replace placeholders with explicit values.
 * Useful in data files where hooks can't be called.
 */
export function replacePlaceholdersWithValues(
  text: string,
  currency: string,
  location: string,
  taxHavenText: string
): string {
  if (!text) return text;
  return text
    .replace(/\{\{currency\}\}/g, currency)
    .replace(/\{\{location\}\}/g, location)
    .replace(/\{\{taxHavenText\}\}/g, taxHavenText);
}

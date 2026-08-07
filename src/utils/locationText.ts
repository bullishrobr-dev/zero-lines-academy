// ─────────────────────────────────────────────────────────────
// locationText.ts — Template variable replacement for location
// Replaces {{currency}} and {{location}} with actual values from the current
// location context.
//
// A third placeholder, {{taxHavenText}}, used to resolve to "Tax-free shopping
// — no VAT added on top". It is gone: the owner does not want sellers making
// tax claims, and the price comparison the shop actually teaches (Europe price
// vs the price here) needs no tax explanation to work. No content string ever
// used the placeholder anyway, so this removes plumbing as well as a claim.
// ─────────────────────────────────────────────────────────────

import { useLocation } from '../contexts/LocationContext';

export interface LocationTextHelpers {
  /** Replace {{currency}} and {{location}} in a string */
  replacePlaceholders: (text: string) => string;
  /** Current currency symbol */
  currency: string;
  /** Current location name */
  location: string;
}

/**
 * Hook that provides text replacement helpers using the current location.
 * Usage: const { replacePlaceholders } = useLocationText();
 *        <p>{replacePlaceholders("Only {{currency}}300 here in {{location}}!")}</p>
 */
export function useLocationText(): LocationTextHelpers {
  const { currency, locationName } = useLocation();

  const replacePlaceholders = (text: string): string => {
    if (!text) return text;
    return text
      .replace(/\{\{currency\}\}/g, currency)
      .replace(/\{\{location\}\}/g, locationName);
  };

  return {
    replacePlaceholders,
    currency,
    location: locationName,
  };
}

/**
 * Standalone function to replace placeholders with explicit values.
 * Useful in data files where hooks can't be called.
 */
export function replacePlaceholdersWithValues(
  text: string,
  currency: string,
  location: string
): string {
  if (!text) return text;
  return text
    .replace(/\{\{currency\}\}/g, currency)
    .replace(/\{\{location\}\}/g, location);
}

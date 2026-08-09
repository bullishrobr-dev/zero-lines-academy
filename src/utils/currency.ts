// ─────────────────────────────────────────────────────────────────────────────
// currency.ts — the ONE way to put a price on screen.
//
// Andorra sells in €, Gibraltar in £. The amounts are identical; only the
// symbol differs. Before this existed there were ~1,400 hardcoded symbols and
// three competing placeholder conventions ({{currency}}, {currency}, `${currency}`),
// which is how Gibraltar sellers ended up quoting euros.
//
// Usage in components:
//   const { price, sub, currency } = useCurrency();
//   <span>{price(120)}</span>            // "£120"
//   <p>{sub(step.words)}</p>             // fills {currency} / {locationName}
//
// Content data files must never contain a symbol. Write `{currency}` and let
// `sub()` resolve it.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useMemo } from 'react';
import { useLocation } from '../contexts/LocationContext';

export interface CurrencyHelpers {
  /** '€' or '£' for the seller's assigned shop. */
  currency: string;
  /** 'Andorra' or 'Gibraltar'. */
  locationName: string;
  /** Format an amount: price(120) -> "€120". */
  price: (amount: number) => string;
  /** Format a range: priceRange(120, 3) -> "€120 for 3". */
  priceFor: (amount: number, units: number, forWord?: string) => string;
  /**
   * Replace {currency} and {locationName} in authored copy.
   * Also tolerates the two legacy conventions so older content keeps working.
   */
  sub: (text: string) => string;
}

/** Symbol-agnostic replacement used by both the hook and the standalone fn. */
export function substitute(text: string, currency: string, locationName: string): string {
  if (!text) return text;
  return (
    text
      // {{currency}} / {{location}} / {{locationName}} — the original helper's syntax
      .replace(/\{\{\s*currency\s*\}\}/g, currency)
      .replace(/\{\{\s*(location|locationName)\s*\}\}/g, locationName)
      // {currency} / {locationName} — what the data files actually use
      .replace(/\{\s*currency\s*\}/g, currency)
      .replace(/\{\s*(location|locationName)\s*\}/g, locationName)
      // ${currency} — leaked from single-quoted strings that were never
      // template literals. Caught here so it can never reach a seller again.
      .replace(/\$\{\s*currency\s*\}/g, currency)
      .replace(/\$\{\s*(location|locationName)\s*\}/g, locationName)
  );
}

export function useCurrency(): CurrencyHelpers {
  const { currency, locationName } = useLocation();

  const price = useCallback((amount: number) => `${currency}${amount}`, [currency]);

  const priceFor = useCallback(
    (amount: number, units: number, forWord = 'for') => `${currency}${amount} ${forWord} ${units}`,
    [currency]
  );

  const sub = useCallback(
    (text: string) => substitute(text, currency, locationName),
    [currency, locationName]
  );

  return useMemo(
    () => ({ currency, locationName, price, priceFor, sub }),
    [currency, locationName, price, priceFor, sub]
  );
}

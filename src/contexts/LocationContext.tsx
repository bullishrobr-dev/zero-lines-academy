// ─────────────────────────────────────────────────────────────
// LocationContext — Andorra (€) / Gibraltar (£)
//
// The seller's shop is assigned by their manager and stored on the user
// record. This provider used to read ONLY `localStorage['zl_location']` and
// default to 'andorra', so every Gibraltar seller was shown euro prices — and
// the only line that ever synced the two lived in `hooks/useAuth.ts`, a file
// with zero importers. The signed-in user is now the source of truth.
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
import { useAuthContext } from './AuthContext';

const LS_LOCATION_KEY = 'zl_location';

export type Location = 'andorra' | 'gibraltar';

interface LocationContextType {
  location: Location;
  /**
   * Only takes effect when nobody is signed in (onboarding / marketing).
   * A signed-in seller's shop comes from their account — it is not theirs to
   * change, because it determines the currency they quote to real customers.
   */
  setLocation: (loc: Location) => void;
  /** True when `location` is coming from the signed-in user's account. */
  isLocked: boolean;
  currency: string;
  currencyCode: 'EUR' | 'GBP';
  locationName: string;
}

const LOCATION_DATA: Record<
  Location,
  {
    currency: string;
    currencyCode: 'EUR' | 'GBP';
    name: string;
  }
> = {
  andorra: {
    currency: '€',
    currencyCode: 'EUR',
    name: 'Andorra',
  },
  gibraltar: {
    currency: '£',
    currencyCode: 'GBP',
    name: 'Gibraltar',
  },
};

const LocationContext = createContext<LocationContextType | null>(null);

function getStoredLocation(): Location {
  try {
    const stored = localStorage.getItem(LS_LOCATION_KEY);
    if (stored === 'andorra' || stored === 'gibraltar') return stored;
  } catch {
    // localStorage unavailable
  }
  return 'andorra';
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const [guestLocation, setGuestLocation] = useState<Location>(getStoredLocation);

  /*
   * A signed-in seller's shop always wins over anything cached in this browser.
   *
   * The admin is the exception: they run both shops, so they are not tied to
   * either and can switch freely to see what each seller sees — every price in
   * the right currency. Their account carries no shop at all (see
   * supabase/schema.sql), which is what leaves them unlocked here.
   */
  const location: Location = user?.location ?? guestLocation;
  const isLocked = !!user?.location;

  // Mirror to localStorage so a full reload paints the right currency before
  // the auth record has loaded, instead of flashing the wrong symbol.
  useEffect(() => {
    try {
      localStorage.setItem(LS_LOCATION_KEY, location);
    } catch {
      // non-fatal
    }
  }, [location]);

  const setLocation = useCallback(
    (loc: Location) => {
      if (user?.location) return; // assigned by the account; see the interface comment
      setGuestLocation(loc);
    },
    [user]
  );

  const data = LOCATION_DATA[location];

  const value = useMemo<LocationContextType>(
    () => ({
      location,
      setLocation,
      isLocked,
      currency: data.currency,
      currencyCode: data.currencyCode,
      locationName: data.name,
    }),
    [location, setLocation, isLocked, data]
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

/**
 * NOTE: `react-router-dom` also exports a `useLocation`. This one is the shop.
 * Always import it explicitly from '../contexts/LocationContext'.
 */
export function useLocation(): LocationContextType {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

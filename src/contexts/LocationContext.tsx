// ─────────────────────────────────────────────────────────────
// LocationContext — Manages Andorra/Gibraltar location state
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

const LS_LOCATION_KEY = 'zl_location';

export type Location = 'andorra' | 'gibraltar';

interface LocationContextType {
  location: Location;
  setLocation: (loc: Location) => void;
  currency: string;
  locationName: string;
  taxHavenText: string;
}

const LOCATION_DATA: Record<Location, { currency: string; name: string; taxHavenText: string }> = {
  andorra: {
    currency: '€',
    name: 'Andorra',
    taxHavenText: 'Tax-free shopping — save up to 21% vs. neighboring countries',
  },
  gibraltar: {
    currency: '£',
    name: 'Gibraltar',
    taxHavenText: 'Tax-free luxury — zero VAT on all purchases',
  },
};

const LocationContext = createContext<LocationContextType | null>(null);

function getStoredLocation(): Location {
  try {
    const stored = localStorage.getItem(LS_LOCATION_KEY);
    if (stored === 'andorra' || stored === 'gibraltar') return stored;
  } catch {
    // ignore
  }
  return 'andorra';
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<Location>(getStoredLocation);

  // Persist location to localStorage
  useEffect(() => {
    localStorage.setItem(LS_LOCATION_KEY, location);
  }, [location]);

  const setLocation = useCallback((loc: Location) => {
    setLocationState(loc);
  }, []);

  const data = LOCATION_DATA[location];

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        currency: data.currency,
        locationName: data.name,
        taxHavenText: data.taxHavenText,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation(): LocationContextType {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

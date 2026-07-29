// ─────────────────────────────────────────────────────────────
// OfflineBanner.tsx — connectivity status pill
//
// Was `fixed top-0 pt-2`, which put it behind the notch on a notched iPhone.
// The wrapper now carries `pt-safe` so it always clears the status bar.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine
  );
  const [showOnlineToast, setShowOnlineToast] = useState(false);
  const { language } = useLanguage();
  const isEs = language === 'es';

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineToast(true);
      setTimeout(() => setShowOnlineToast(false), 3000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineToast(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showOnlineToast) return null;

  const back = isOnline;
  const label = back
    ? isEs
      ? 'De nuevo en línea'
      : 'Back online'
    : isEs
      ? 'Sin conexión — el contenido sigue disponible'
      : "You're offline — content is still available";

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-safe animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <div
        className={`mt-2 flex max-w-app items-center gap-2 rounded-full border px-4 py-2 shadow-raised backdrop-blur-xl ${
          back
            ? 'border-success/30 bg-success-tint/90'
            : 'border-warning/30 bg-warning-tint/90'
        }`}
      >
        {back ? (
          <Wifi className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
        ) : (
          <WifiOff className="h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
        )}
        <span className={`text-caption ${back ? 'text-success' : 'text-warning'}`}>{label}</span>
      </div>
    </div>
  );
}

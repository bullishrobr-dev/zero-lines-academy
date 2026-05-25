import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineToast, setShowOnlineToast] = useState(false);

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

  if (showOnlineToast) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-2 px-4 animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="bg-green-500/20 border border-green-500/30 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2">
          <Wifi className="w-3.5 h-3.5 text-green-400" />
          <span className="text-xs font-medium text-green-400">
            Back online
          </span>
        </div>
      </div>
    );
  }

  // Offline state
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-2 px-4">
      <div className="bg-amber-500/15 border border-amber-500/30 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2">
        <WifiOff className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-xs font-medium text-amber-400">
          You're offline — content is still available
        </span>
      </div>
    </div>
  );
}

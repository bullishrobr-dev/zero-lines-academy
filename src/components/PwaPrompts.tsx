// ─────────────────────────────────────────────────────────────────────────────
// PwaPrompts — two small, dismissible bottom banners:
//
//   1. "New version — refresh"  when a newer build is installed and waiting. The
//      service worker no longer activates itself (that swaps assets under a live
//      page and breaks chunk loading), so this is how a seller who keeps the app
//      open all day actually moves to the new build.
//
//   2. "Add to home screen"     so the app installs like a real app. Android and
//      Chrome fire `beforeinstallprompt`, which we capture and replay on a tap;
//      iOS Safari has no such event, so it gets a one-time hint instead.
//
// Everything is feature-detected and wrapped so a browser without service
// workers, or a private window, degrades to showing nothing rather than
// throwing.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RefreshCw, Download, Share, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LS_INSTALL_DISMISSED = 'zl_install_dismissed';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const COPY = {
  en: {
    updateTitle: 'New version ready',
    updateBody: 'Refresh to get the latest.',
    refresh: 'Refresh',
    installTitle: 'Add Zero Lines to your phone',
    installBody: 'Open it like an app, straight from your home screen.',
    install: 'Add',
    iosBody: 'Tap Share, then “Add to Home Screen”.',
    dismiss: 'Dismiss',
  },
  es: {
    updateTitle: 'Nueva versión lista',
    updateBody: 'Actualiza para tener lo último.',
    refresh: 'Actualizar',
    installTitle: 'Añade Zero Lines a tu móvil',
    installBody: 'Ábrelo como una app, desde tu pantalla de inicio.',
    install: 'Añadir',
    iosBody: 'Toca Compartir y luego “Añadir a pantalla de inicio”.',
    dismiss: 'Cerrar',
  },
} as const;

function isStandalone(): boolean {
  try {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      // iOS Safari exposes this non-standard flag when launched from the home screen.
      (navigator as unknown as { standalone?: boolean }).standalone === true
    );
  } catch {
    return false;
  }
}

function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent || '');
}

export default function PwaPrompts() {
  const { language } = useLanguage();
  const c = COPY[language === 'es' ? 'es' : 'en'];
  const routerLocation = useLocation();

  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  // iOS never fires beforeinstallprompt, so decide from the platform up front —
  // synchronous and deterministic, so it seeds state rather than an effect.
  const [showIosHint, setShowIosHint] = useState(() => {
    try {
      return isIOS() && !isStandalone();
    } catch {
      return false;
    }
  });
  const [installDismissed, setInstallDismissed] = useState(() => {
    try {
      return localStorage.getItem(LS_INSTALL_DISMISSED) === '1';
    } catch {
      return false;
    }
  });
  const updating = useRef(false);

  // ── Update detection ──
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const onControllerChange = () => {
      // Only reload if this page asked for the update — controllerchange also
      // fires on the first-ever load when the initial worker claims the page.
      if (updating.current) window.location.reload();
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    let cancelled = false;
    navigator.serviceWorker
      .getRegistration()
      .then((reg) => {
        if (!reg || cancelled) return;
        if (reg.waiting && navigator.serviceWorker.controller) setWaiting(reg.waiting);
        reg.addEventListener('updatefound', () => {
          const nw = reg.installing;
          if (!nw) return;
          nw.addEventListener('statechange', () => {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) setWaiting(nw);
          });
        });
        // Nudge the browser to check for a fresh worker now, not on its own timer.
        reg.update().catch(() => {});
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  // ── Install detection ──
  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, []);

  const applyUpdate = useCallback(() => {
    updating.current = true;
    waiting?.postMessage('SKIP_WAITING');
  }, [waiting]);

  const doInstall = useCallback(async () => {
    if (!installEvent) return;
    try {
      await installEvent.prompt();
      await installEvent.userChoice;
    } catch {
      // user dismissed the native sheet — nothing to do
    }
    setInstallEvent(null);
  }, [installEvent]);

  const dismissInstall = useCallback(() => {
    setInstallDismissed(true);
    setShowIosHint(false);
    setInstallEvent(null);
    try {
      localStorage.setItem(LS_INSTALL_DISMISSED, '1');
    } catch {
      // non-fatal
    }
  }, []);

  // The update prompt is worth interrupting for; the install prompt is not shown
  // during sign-in or the first-run onboarding, where it would just be clutter.
  const onboarding = ['/', '/auth', '/set-password'].includes(routerLocation.pathname);

  if (waiting) {
    return (
      <Banner
        icon={<RefreshCw size={18} aria-hidden />}
        title={c.updateTitle}
        body={c.updateBody}
        actionLabel={c.refresh}
        onAction={applyUpdate}
      />
    );
  }

  if (!installDismissed && !onboarding && (installEvent || showIosHint)) {
    return (
      <Banner
        icon={<Download size={18} aria-hidden />}
        title={c.installTitle}
        body={showIosHint && !installEvent ? c.iosBody : c.installBody}
        actionLabel={installEvent ? c.install : undefined}
        actionIcon={showIosHint && !installEvent ? <Share size={15} aria-hidden /> : undefined}
        onAction={installEvent ? doInstall : undefined}
        onDismiss={dismissInstall}
        dismissLabel={c.dismiss}
      />
    );
  }

  return null;
}

function Banner({
  icon,
  title,
  body,
  actionLabel,
  actionIcon,
  onAction,
  onDismiss,
  dismissLabel,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  onDismiss?: () => void;
  dismissLabel?: string;
}) {
  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[calc(var(--nav-h)+0.75rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="pointer-events-auto flex w-full max-w-app items-center gap-3 rounded-feature border border-line bg-surface-raised p-3 shadow-lg">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip bg-teal-tint text-teal-strong">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-body-small font-semibold text-ink">{title}</p>
          <p className="truncate text-caption text-ink-2">{body}</p>
        </div>
        {onAction && actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="btn-primary h-10 shrink-0 px-4 text-body-small"
          >
            {actionIcon}
            {actionLabel}
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            className="btn-icon shrink-0"
          >
            <X size={18} aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}

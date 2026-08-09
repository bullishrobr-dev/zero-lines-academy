// ─────────────────────────────────────────────────────────────
// LoadingScreen.tsx — Suspense + auth-resolution fallback
// Rendered inside the Layout frame, so it fills the available space rather
// than forcing its own full-viewport dark slab.
// ─────────────────────────────────────────────────────────────

import { Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LoadingScreen() {
  const { t } = useLanguage();

  return (
    <div
      className="flex min-h-[70vh] flex-col items-center justify-center px-6"
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-feature bg-teal-tint">
          <Sparkles className="h-8 w-8 text-teal-strong" aria-hidden="true" />
        </div>
        <div
          className="absolute inset-0 animate-ping rounded-feature border-2 border-teal/40 opacity-40"
          aria-hidden="true"
        />
      </div>
      <p className="mt-5 text-caption text-ink-2">{t('loading')}</p>

      {/* Skeleton rows so the screen has shape while chunks download. */}
      <div className="mt-10 w-full max-w-[360px] space-y-3" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="surface-flat animate-pulse p-4"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-chip bg-surface-sunken" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-3/4 rounded-full bg-surface-sunken" />
                <div className="h-3 w-1/2 rounded-full bg-surface-sunken" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

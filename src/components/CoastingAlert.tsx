import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CoastingAlertProps {
  /** Coasting index (0-100); alert shows when > 60 */
  coastingIndex: number;
  /** Callback when user taps the alert to navigate */
  onNavigateToTrainingHub?: () => void;
  /** Optional additional className */
  className?: string;
}

// ---------------------------------------------------------------------------
// localStorage helper
// ---------------------------------------------------------------------------

const SNOOZE_KEY = 'zl_coasting_alert_snoozed_until';

function isSnoozed(): boolean {
  try {
    const raw = localStorage.getItem(SNOOZE_KEY);
    if (!raw) return false;
    const until = parseInt(raw, 10);
    return Date.now() < until;
  } catch {
    return false;
  }
}

function snooze(days: number): void {
  try {
    const until = Date.now() + days * 24 * 60 * 60 * 1000;
    localStorage.setItem(SNOOZE_KEY, String(until));
  } catch {
    // storage unavailable — ignore
  }
}

export function _clearSnooze(): void {
  try {
    localStorage.removeItem(SNOOZE_KEY);
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Animated alert banner that appears when the user's coastingIndex is above 60.
 *
 * - Bilingual EN / ES
 * - Dismissible (snoozes for 3 days)
 * - Tap navigates to Training Hub
 * - Slides down with Framer Motion
 */
export const CoastingAlert: React.FC<CoastingAlertProps> = ({
  coastingIndex,
  onNavigateToTrainingHub,
  className = '',
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [wasEverDismissed, setWasEverDismissed] = useState(false);

  // Check snooze state on mount
  useEffect(() => {
    if (isSnoozed()) {
      setDismissed(true);
      setWasEverDismissed(true);
    }
  }, []);

  // Re-show alert when coastingIndex changes significantly upward
  useEffect(() => {
    if (coastingIndex > 60 && wasEverDismissed && !isSnoozed()) {
      setDismissed(false);
    }
  }, [coastingIndex, wasEverDismissed]);

  const handleDismiss = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      snooze(3); // snooze for 3 days
      setDismissed(true);
      setWasEverDismissed(true);
    },
    []
  );

  const handleTap = useCallback(() => {
    onNavigateToTrainingHub?.();
  }, [onNavigateToTrainingHub]);

  const shouldShow = !dismissed && coastingIndex > 60;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="coasting-alert"
          initial={{ opacity: 0, y: -24, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -24, height: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 24,
          }}
          className={`w-full overflow-hidden ${className}`}
        >
          <button
            type="button"
            onClick={handleTap}
            className="relative w-full text-left rounded-xl border border-yellow-600/30 bg-yellow-500/10 px-4 py-3 backdrop-blur-sm active:bg-yellow-500/20 transition-colors duration-150"
          >
            {/* Dismiss button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-yellow-500/70 hover:text-yellow-400 hover:bg-yellow-500/10 active:scale-90 transition-all"
              aria-label="Dismiss alert"
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Alert content */}
            <div className="flex items-start gap-3 pr-8">
              {/* Warning icon */}
              <span className="mt-0.5 flex-shrink-0 text-lg" role="img" aria-label="warning">
                ⚠️
              </span>

              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-yellow-300 leading-tight">
                  You've been reviewing old content. Try a new lesson!
                </p>
                <p className="text-xs text-yellow-400/70 leading-tight">
                  Has estado repasando contenido antiguo. ¡Prueba una lección nueva!
                </p>
              </div>
            </div>

            {/* Subtle chevron to indicate tappable */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-yellow-500/40">
              <svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoastingAlert;

// ─────────────────────────────────────────────────────────────────────────────
// NudgeCard.tsx — the in-app half of a shift nudge.
//
// Notifications are a bonus: permission may be denied, iOS may have suspended
// the timer, or the seller may simply be looking at the app already. So every
// nudge also appears here, as a dismissible card. This is the part that always
// works — the notification is the part that reaches into a pocket.
// ─────────────────────────────────────────────────────────────────────────────

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import type { Nudge } from '../data/nudges';

const COPY = {
  en: { open: 'Show me', dismiss: 'Dismiss' },
  es: { open: 'Enséñamelo', dismiss: 'Cerrar' },
} as const;

interface Props {
  nudge: Nudge | null;
  onDismiss: () => void;
}

export default function NudgeCard({ nudge, onDismiss }: Props) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { sub } = useCurrency();
  const isEs = language === 'es';
  const c = COPY[isEs ? 'es' : 'en'];

  return (
    <AnimatePresence>
      {nudge && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          role="status"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom)+5.5rem)]"
        >
          <div className="surface-feature feature-gold pointer-events-auto w-full max-w-app p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip bg-gold-tint text-gold-strong">
                <Lightbulb size={17} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                {/* sub() resolves {currency} / {locationName} to this seller's shop. */}
                <p className="text-body-small font-semibold text-ink">
                  {sub(isEs ? nudge.titleEs : nudge.title)}
                </p>
                <p className="mt-0.5 text-caption leading-5 text-ink-2">
                  {sub(isEs ? nudge.bodyEs : nudge.body)}
                </p>
              </div>
              <button
                type="button"
                onClick={onDismiss}
                aria-label={c.dismiss}
                className="btn-icon shrink-0"
              >
                <X size={16} aria-hidden />
              </button>
            </div>

            {nudge.route && (
              <button
                type="button"
                onClick={() => {
                  const to = nudge.route as string;
                  onDismiss();
                  navigate(to);
                }}
                className="btn-quiet mt-3 min-h-touch w-full text-body-small"
              >
                {c.open}
                <ArrowRight size={15} aria-hidden />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

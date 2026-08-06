// ─────────────────────────────────────────────────────────────
// DailyDose.tsx — the two-minute read of the day, plus its sheet
//
// The Spanish copy has always existed in `data/dailyDoses.ts` (titleEs, textEs,
// highlightEs, practicePromptEs) and was never rendered. It is now.
// ─────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Check, Clock, X, Lightbulb, MessageSquare, Wand2, Brain, Award } from 'lucide-react';
import { useDailyFlow } from '../hooks/useDailyFlow';
import { getTodaysDose } from '../data/dailyDoses';
import { useLanguage } from '../contexts/LanguageContext';
import { haptic } from '../utils/haptics';

const COPY = {
  en: {
    todaysFocus: "Today's focus",
    tapToRead: 'Tap to read',
    completed: 'Completed',
    minutes: '2 min',
    practice: "Today's practice",
    markComplete: 'Mark complete',
    day: 'Day',
    close: 'Close',
    types: { tip: 'Tip', script: 'Script', technique: 'Technique', mindset: 'Mindset' },
  },
  es: {
    todaysFocus: 'Foco de hoy',
    tapToRead: 'Toca para leer',
    completed: 'Completado',
    minutes: '2 min',
    practice: 'Práctica de hoy',
    markComplete: 'Marcar hecho',
    day: 'Día',
    close: 'Cerrar',
    types: { tip: 'Consejo', script: 'Guion', technique: 'Técnica', mindset: 'Mentalidad' },
  },
} as const;

/* The five dose categories are a fixed set (data/dailyDoses.ts), so they are
   translated here rather than carrying a categoryEs on every dose. In English
   the label is the value itself. */
const CATEGORY_ES: Record<string, string> = {
  Stopping: 'Parar',
  Product: 'Producto',
  Closing: 'Cierre',
  Advanced: 'Avanzado',
  Mindset: 'Mentalidad',
};

const catLabel = (category: string, isEs: boolean) =>
  isEs ? (CATEGORY_ES[category] ?? category) : category;

type BlockType = 'tip' | 'script' | 'technique' | 'mindset';

/* One accent per block type, all from the token set. */
const BLOCK_STYLE: Record<BlockType, { wrap: string; text: string }> = {
  tip: { wrap: 'bg-gold-tint border-gold/30', text: 'text-gold-strong' },
  script: { wrap: 'bg-success-tint border-success/30', text: 'text-success' },
  technique: { wrap: 'bg-teal-tint border-teal/30', text: 'text-teal-strong' },
  mindset: { wrap: 'bg-violet-tint border-violet/30', text: 'text-violet-strong' },
};

function blockIcon(type: BlockType) {
  switch (type) {
    case 'script':
      return <MessageSquare className="h-4 w-4" aria-hidden="true" />;
    case 'technique':
      return <Wand2 className="h-4 w-4" aria-hidden="true" />;
    case 'mindset':
      return <Brain className="h-4 w-4" aria-hidden="true" />;
    default:
      return <Lightbulb className="h-4 w-4" aria-hidden="true" />;
  }
}

interface DailyDoseCardProps {
  onOpen?: () => void;
}

export function DailyDoseCard({ onOpen }: DailyDoseCardProps) {
  const { isDoseCompleted } = useDailyFlow();
  const { language } = useLanguage();
  const c = language === 'es' ? COPY.es : COPY.en;
  const dose = getTodaysDose();
  const completed = isDoseCompleted(dose.id);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className={`w-full text-left transition-colors ${
        completed ? 'surface-flat p-4' : 'surface-raised p-4'
      }`}
    >
      {/* Header row */}
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-teal-tint px-2.5 py-1 text-overline text-teal-strong">
          {catLabel(dose.category, language === 'es')}
        </span>
        <span className="flex items-center gap-1 text-caption text-ink-3">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {c.minutes}
        </span>
        {completed && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-teal text-on-teal"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
          </motion.span>
        )}
      </div>

      <h3 className="text-h4 text-ink">
        {c.todaysFocus}: {language === 'es' ? dose.titleEs : dose.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-body-small text-ink-2">
        {language === 'es' ? dose.content[0].textEs : dose.content[0].text}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-caption text-teal-strong">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          {completed ? c.completed : c.tapToRead}
        </span>
        <span className="text-caption text-ink-3">+{dose.xpReward} XP</span>
      </div>
    </motion.button>
  );
}

interface DailyDoseModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Fired once, with the XP awarded, when the learner marks the dose done. */
  onCompleted?: (xp: number) => void;
}

export function DailyDoseModal({ isOpen, onClose, onCompleted }: DailyDoseModalProps) {
  const { completeDailyDose, isDoseCompleted } = useDailyFlow();
  const [markedDone, setMarkedDone] = useState(false);
  const { language } = useLanguage();
  const c = language === 'es' ? COPY.es : COPY.en;
  const isEs = language === 'es';
  const dose = getTodaysDose();
  const alreadyCompleted = isDoseCompleted(dose.id);
  const isComplete = alreadyCompleted || markedDone;

  const handleMarkComplete = () => {
    if (alreadyCompleted) return;
    haptic('medium');
    completeDailyDose(dose.id);
    setMarkedDone(true);
    onCompleted?.(dose.xpReward);
  };

  const handleClose = useCallback(() => {
    setMarkedDone(false);
    onClose();
  }, [onClose]);

  // A bottom sheet that cannot be dismissed from the keyboard is a trap.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          /* z-[60] clears the floating nav pill (z-50); the scrim is neutral
             black in both themes because a scrim must darken, and `--ink`
             inverts to near-white in dark mode. */
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={isEs ? dose.titleEs : dose.title}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90dvh] w-full max-w-app flex-col overflow-hidden rounded-t-feature border-t border-line bg-background"
          >
            {/* Sheet header */}
            <div className="relative flex-shrink-0 px-5 pb-4 pt-4">
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line-strong" aria-hidden="true" />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-block rounded-full bg-teal-tint px-2.5 py-1 text-overline text-teal-strong">
                    {c.day} {dose.day} · {catLabel(dose.category, isEs)}
                  </span>
                  <h2 className="mt-2 text-h2 text-ink">{isEs ? dose.titleEs : dose.title}</h2>
                </div>
                <button onClick={handleClose} className="btn-icon shrink-0" aria-label={c.close}>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
              {dose.content.map((block, index) => {
                const style = BLOCK_STYLE[block.type as BlockType] ?? BLOCK_STYLE.tip;
                const highlight = isEs ? block.highlightEs ?? block.highlight : block.highlight;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.08 }}
                    className={`rounded-card border p-4 ${style.wrap}`}
                  >
                    <div className={`mb-2 flex items-center gap-2 ${style.text}`}>
                      {blockIcon(block.type as BlockType)}
                      <span className="text-overline">
                        {c.types[block.type as BlockType] ?? block.type}
                      </span>
                    </div>
                    {highlight && (
                      <p className="mb-2 text-h4 text-ink">{highlight}</p>
                    )}
                    <p className="text-body text-ink-2">{isEs ? block.textEs : block.text}</p>
                  </motion.div>
                );
              })}

              {/* Practice prompt */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className="surface-feature p-4"
              >
                <div className="mb-2 flex items-center gap-2 text-teal-strong">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  <span className="text-overline">{c.practice}</span>
                </div>
                <p className="text-body text-ink-2">
                  {isEs ? dose.practicePromptEs : dose.practicePrompt}
                </p>
              </motion.div>

              {/* Mark complete */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44 }}
              >
                <button
                  onClick={handleMarkComplete}
                  disabled={isComplete}
                  className={`w-full ${isComplete ? 'btn-quiet' : 'btn-primary'}`}
                >
                  <Check className="h-5 w-5" strokeWidth={isComplete ? 3 : 2} aria-hidden="true" />
                  {isComplete
                    ? `${c.completed} · +${dose.xpReward} XP`
                    : `${c.markComplete} (+${dose.xpReward} XP)`}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DailyDoseCard;

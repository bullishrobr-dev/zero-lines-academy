// ─────────────────────────────────────────────────────────────────────────────
// EncounterCard.tsx — the live entry in the journal.
//
// The moment a seller taps "I brought someone in", this card appears at the top
// of the journal with a running timer and two fat buttons: Sold / Walked. It is
// a visible loose end, which is exactly what makes the phone come back out.
//
// Two taps to close a walk-out, three for a sale. No typing is ever required.
// Skip is offered at full weight and never guilt-tripped — a seller who feels
// nagged starts tapping the same tile every time, and then the data is worthless.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, DoorOpen, Timer, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { haptic } from '../utils/haptics';
import { WALK_REASONS, CLOSE_REASONS, chipLabel } from '../data/encounterChips';
import type { StreetSession } from '../types/streetTracker';

const COPY = {
  en: {
    inTheShop: 'In the shop',
    prompt: '10 seconds. Then back out there.',
    sold: 'Sold',
    walked: 'Walked',
    whyWalked: 'What stopped them?',
    whatClosed: 'What closed it?',
    skip: 'Skip',
    dismiss: 'Close',
  },
  es: {
    inTheShop: 'En la tienda',
    prompt: '10 segundos. Y vuelves a la calle.',
    sold: 'Compró',
    walked: 'Se fue',
    whyWalked: '¿Qué le frenó?',
    whatClosed: '¿Qué cerró la venta?',
    skip: 'Saltar',
    dismiss: 'Cerrar',
  },
} as const;

function elapsed(since: number): string {
  const secs = Math.max(0, Math.floor((Date.now() - since) / 1000));
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

interface Props {
  encounter: StreetSession;
  /** Walked, with an optional reason chip. */
  onWalked: (reason?: string) => void;
  /** Sold — the page opens the sale sheet, which collects product + closer. */
  onSold: (reason?: string) => void;
}

export default function EncounterCard({ encounter, onWalked, onSold }: Props) {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const c = COPY[isEs ? 'es' : 'en'];

  const [step, setStep] = useState<'open' | 'why' | 'closed'>('open');
  const [tick, setTick] = useState(0);

  // A live timer, so the card reads as something happening now rather than a
  // row in a list. One second is plenty; this unmounts as soon as it resolves.
  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  void tick;

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="surface-feature feature-teal mb-4 p-4"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-on-teal">
          <DoorOpen size={16} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-body-small font-semibold text-ink">{c.inTheShop}</p>
          <p className="flex items-center gap-1 text-caption text-ink-2">
            <Timer size={12} aria-hidden />
            <span className="tabular-nums">{elapsed(encounter.timestamp)}</span>
          </p>
        </div>
        {step !== 'open' && (
          <button
            type="button"
            onClick={() => setStep('open')}
            aria-label={c.dismiss}
            className="btn-icon shrink-0"
          >
            <X size={16} aria-hidden />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {step === 'open' && (
          <motion.div
            key="open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3"
          >
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  haptic('heavy');
                  setStep('closed');
                }}
                className="btn-primary min-h-touch w-full"
              >
                <Coins size={16} aria-hidden />
                {c.sold}
              </button>
              <button
                type="button"
                onClick={() => {
                  haptic('light');
                  setStep('why');
                }}
                className="btn-secondary min-h-touch w-full"
              >
                {c.walked}
              </button>
            </div>
            <p className="mt-2 text-center text-caption text-ink-3">{c.prompt}</p>
          </motion.div>
        )}

        {step === 'why' && (
          <ChipGrid
            key="why"
            title={c.whyWalked}
            chips={WALK_REASONS}
            isEs={isEs}
            skipLabel={c.skip}
            onPick={(id) => {
              haptic('light');
              onWalked(id);
            }}
            onSkip={() => onWalked(undefined)}
          />
        )}

        {step === 'closed' && (
          <ChipGrid
            key="closed"
            title={c.whatClosed}
            chips={CLOSE_REASONS}
            isEs={isEs}
            skipLabel={c.skip}
            onPick={(id) => {
              haptic('medium');
              onSold(id);
            }}
            onSkip={() => onSold(undefined)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function ChipGrid({
  title,
  chips,
  isEs,
  skipLabel,
  onPick,
  onSkip,
}: {
  title: string;
  chips: typeof WALK_REASONS;
  isEs: boolean;
  skipLabel: string;
  onPick: (id: string) => void;
  onSkip: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-3"
    >
      <p className="mb-2 text-caption font-semibold text-ink-2">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => onPick(chip.id)}
            className="min-h-touch rounded-chip border border-line-strong bg-surface px-3 py-2 text-caption text-ink transition-colors active:bg-teal-tint"
          >
            {chipLabel(chip, isEs)}
          </button>
        ))}
        {/* Full weight, never a guilt trip. */}
        <button
          type="button"
          onClick={onSkip}
          className="min-h-touch rounded-chip px-3 py-2 text-caption text-ink-3 underline"
        >
          {skipLabel}
        </button>
      </div>
    </motion.div>
  );
}

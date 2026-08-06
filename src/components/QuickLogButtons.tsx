import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { DoorOpen, Coins } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface QuickLogButtonsProps {
  onLogStop: () => void;
  onLogSale: () => void;
}

/**
 * Two buttons, not three. A "stop" is a person who is now INSIDE the shop —
 * pavement approaches are no longer counted, because that measured effort
 * rather than result and could never be counted honestly mid-shift.
 */
const COPY = {
  en: {
    stop: 'I brought someone in',
    sale: 'I made a sale',
    stopShort: 'Stop',
    saleShort: 'Sale',
  },
  es: {
    stop: 'He metido a alguien',
    sale: 'He hecho una venta',
    stopShort: 'Parada',
    saleShort: 'Venta',
  },
};

/** Confetti colours are read from the live theme tokens, never hardcoded. */
function tokenColor(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
  if (!raw) return fallback;
  return `rgb(${raw.split(/\s+/).join(',')})`;
}

function burst(token: string, fallback: string) {
  const color = tokenColor(token, fallback);
  const shoot = (x: number) =>
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.85, x },
      colors: [color, tokenColor('gold', '#E3B54A')],
      disableForReducedMotion: true,
      ticks: 100,
      gravity: 1.2,
      scalar: 0.8,
    });
  shoot(0.3);
  setTimeout(() => shoot(0.7), 100);
}

const LogButton: React.FC<{
  onClick: () => void;
  label: string;
  short: string;
  xp: string;
  fill: string;
  ink: string;
  icon: React.ReactNode;
}> = ({ onClick, label, short, xp, fill, ink, icon }) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    className="flex flex-col items-center justify-center gap-1"
    aria-label={label}
  >
    <span
      className={`flex h-[60px] w-[60px] items-center justify-center rounded-full shadow-raised ${fill}`}
    >
      {icon}
    </span>
    <span className="max-w-[92px] text-center text-caption leading-tight text-ink-2">
      {short} <span className={`font-bold ${ink}`}>{xp}</span>
    </span>
  </motion.button>
);

const QuickLogButtons: React.FC<QuickLogButtonsProps> = ({ onLogStop, onLogSale }) => {
  const { language } = useLanguage();
  const t = COPY[language === 'es' ? 'es' : 'en'];

  return (
    // Sits ABOVE the floating nav pill, not on top of it. At `bottom-0` the
    // nav's own container covered these three buttons and swallowed every tap —
    // on the one screen where tapping them fast is the entire point.
    // 6.5rem clears the pill (60px + 12px lift) and its raised centre action.
    <div
      className="fixed left-0 right-0 z-40 border-t border-line bg-surface/95 backdrop-blur-lg shadow-nav"
      style={{ bottom: 'calc(6.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="mx-auto max-w-app px-4 py-2.5">
        <div className="flex items-start justify-around">
          <LogButton
            onClick={() => {
              burst('teal', '#0ABAB5');
              onLogStop();
            }}
            label={t.stop}
            short={t.stopShort}
            xp="+5 XP"
            fill="bg-teal text-on-teal"
            ink="text-teal-strong"
            icon={<DoorOpen className="h-7 w-7" aria-hidden="true" />}
          />
          <LogButton
            onClick={() => {
              burst('gold', '#E3B54A');
              onLogSale();
            }}
            label={t.sale}
            short={t.saleShort}
            xp="+10 XP"
            fill="bg-gold text-on-gold"
            ink="text-gold-strong"
            icon={<Coins className="h-7 w-7" aria-hidden="true" />}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(QuickLogButtons);

import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface QuickLogButtonsProps {
  onLogStop: () => void;
  onLogBring: () => void;
  onLogSale: () => void;
  lang: 'en' | 'es';
}

const t = {
  en: {
    stop: 'I Stopped Someone!',
    bring: 'Brought Them Inside!',
    sale: 'I Made a Sale!',
    xpStop: '+2 XP',
    xpBring: '+5 XP',
    xpSale: '+10 XP',
  },
  es: {
    stop: '\u00a1Par\u00e9 a Alguien!',
    bring: '\u00a1Lo Met\u00ed Adentro!',
    sale: '\u00a1Hice una Venta!',
    xpStop: '+2 XP',
    xpBring: '+5 XP',
    xpSale: '+10 XP',
  },
};

function triggerConfetti(color: string, originY: number = 0.85) {
  const count = 40;
  confetti({
    particleCount: count,
    spread: 70,
    origin: { y: originY, x: 0.3 },
    colors: [color, '#ffffff', '#FFD700'],
    disableForReducedMotion: true,
    ticks: 100,
    gravity: 1.2,
    scalar: 0.8,
  });
  setTimeout(() => {
    confetti({
      particleCount: count,
      spread: 70,
      origin: { y: originY, x: 0.7 },
      colors: [color, '#ffffff', '#FFD700'],
      disableForReducedMotion: true,
      ticks: 100,
      gravity: 1.2,
      scalar: 0.8,
    });
  }, 100);
}

const StopButton: React.FC<{ onClick: () => void; label: string; xp: string }> = ({
  onClick,
  label,
  xp,
}) => (
  <motion.button
    onClick={() => {
      triggerConfetti('#0ABAB5');
      onClick();
    }}
    whileTap={{ scale: 0.88 }}
    whileHover={{ scale: 1.04 }}
    className="flex flex-col items-center justify-center gap-1"
    aria-label={label}
  >
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0ABAB5] to-[#088A87] flex items-center justify-center shadow-[0_0_24px_rgba(10,186,181,0.35)] border-2 border-[#0ABAB5]/30">
      <span className="text-3xl" role="img" aria-label="stop">{'\ud83d\uded1'}</span>
    </div>
    <span className="text-[11px] font-semibold text-[#0ABAB5] mt-1">{xp}</span>
    <span className="text-[10px] text-gray-400 text-center leading-tight max-w-[80px]">{label}</span>
  </motion.button>
);

const BringButton: React.FC<{ onClick: () => void; label: string; xp: string }> = ({
  onClick,
  label,
  xp,
}) => (
  <motion.button
    onClick={() => {
      triggerConfetti('#22C55E');
      onClick();
    }}
    whileTap={{ scale: 0.88 }}
    whileHover={{ scale: 1.04 }}
    className="flex flex-col items-center justify-center gap-1"
    aria-label={label}
  >
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-[0_0_24px_rgba(34,197,94,0.35)] border-2 border-[#22C55E]/30">
      <span className="text-3xl" role="img" aria-label="bring">{'\ud83d\udeaa'}</span>
    </div>
    <span className="text-[11px] font-semibold text-[#22C55E] mt-1">{xp}</span>
    <span className="text-[10px] text-gray-400 text-center leading-tight max-w-[80px]">{label}</span>
  </motion.button>
);

const SaleButton: React.FC<{ onClick: () => void; label: string; xp: string }> = ({
  onClick,
  label,
  xp,
}) => (
  <motion.button
    onClick={() => {
      triggerConfetti('#F59E0B');
      onClick();
    }}
    whileTap={{ scale: 0.88 }}
    whileHover={{ scale: 1.04 }}
    className="flex flex-col items-center justify-center gap-1"
    aria-label={label}
  >
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center shadow-[0_0_24px_rgba(245,158,11,0.35)] border-2 border-[#F59E0B]/30">
      <span className="text-3xl" role="img" aria-label="sale">{'\ud83d\udcb0'}</span>
    </div>
    <span className="text-[11px] font-semibold text-[#F59E0B] mt-1">{xp}</span>
    <span className="text-[10px] text-gray-400 text-center leading-tight max-w-[80px]">{label}</span>
  </motion.button>
);

const QuickLogButtons: React.FC<QuickLogButtonsProps> = ({ onLogStop, onLogBring, onLogSale, lang }) => {
  const txt = t[lang];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-gray-800/60">
      <div className="max-w-[430px] mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          <StopButton onClick={onLogStop} label={txt.stop} xp={txt.xpStop} />
          <BringButton onClick={onLogBring} label={txt.bring} xp={txt.xpBring} />
          <SaleButton onClick={onLogSale} label={txt.sale} xp={txt.xpSale} />
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
};

export default React.memo(QuickLogButtons);

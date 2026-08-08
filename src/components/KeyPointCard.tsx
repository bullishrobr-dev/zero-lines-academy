// ─────────────────────────────────────────────────────────────────────────────
// KeyPointCard — the one sentence a seller has to remember from a lesson.
//
// Gold is the system's "mastery" hue, so the must-know line takes it. That also
// keeps it unmistakably different from TipCard (teal / coaching); previously
// both rendered as the same teal box and the hierarchy was invisible.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import { KeyRound } from 'lucide-react';
import type { ReactNode } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface KeyPointCardProps {
  children: ReactNode;
}

export default function KeyPointCard({ children }: KeyPointCardProps) {
  const { language } = useLanguage();

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px 200px 0px' }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className="-mx-2 my-7 rounded-card border border-gold/35 bg-gold-tint px-4 py-4"
    >
      <div className="flex gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-chip bg-gold text-on-gold"
          aria-hidden="true"
        >
          <KeyRound size={18} strokeWidth={2.2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-overline text-gold-strong">
            {language === 'es' ? 'Punto clave' : 'Key point'}
          </p>
          <div className="mt-1.5 text-body-small font-medium text-ink">{children}</div>
        </div>
      </div>
    </motion.aside>
  );
}

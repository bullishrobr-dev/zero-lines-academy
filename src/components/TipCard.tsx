// ─────────────────────────────────────────────────────────────────────────────
// TipCard — the practical "do this" aside inside a lesson.
//
// This file used to be a fossil of an abandoned light theme (hardcoded #EDFCFB
// on a dark app) while LessonView carried its own private copy of the same
// component. There is one card now, and it speaks the Counter Light tokens.
//
// Teal = learning, so coaching tips take the teal tint. KeyPointCard takes gold
// so the two are never mistaken for each other, which they were when both were
// the same #0ABAB5 box.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import type { ReactNode } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface TipCardProps {
  children: ReactNode;
}

export default function TipCard({ children }: TipCardProps) {
  const { t } = useLanguage();

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px 200px 0px' }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      /* -mx-2 pushes the card past the text measure so it breaks the column. */
      className="-mx-2 my-7 rounded-card border border-teal/30 bg-teal-tint px-4 py-4"
    >
      <div className="flex gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-chip bg-teal text-on-teal"
          aria-hidden="true"
        >
          <Lightbulb size={18} strokeWidth={2.2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-overline text-teal-strong">{t('lessonProTip')}</p>
          <div className="mt-1.5 text-body-small text-ink">{children}</div>
        </div>
      </div>
    </motion.aside>
  );
}

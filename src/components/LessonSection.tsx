// ─────────────────────────────────────────────────────────────────────────────
// LessonSection — the chapter opener that gives a lesson its rhythm.
//
// A lesson is 20-34 content blocks long. Rendered flat it is a grey wall, which
// is exactly what it was. Each `subheader` in the data now opens a numbered
// chapter, so a seller scrolling one-handed always knows where they are and how
// much is left.
//
// The counter is numerals only ("03 / 05"), so it needs no translation.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface LessonSectionProps {
  sectionNumber: number;
  totalSections: number;
  title: string;
  children: ReactNode;
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function LessonSection({
  sectionNumber,
  totalSections,
  title,
  children,
}: LessonSectionProps) {
  /* ── Why the reveal triggers BELOW the fold ──
     These margins used to be negative ('-60px', '-40px'), which shrinks the
     trigger area: the chapter had to be 60px INSIDE the screen before it
     started fading in. Scrolling a lesson quickly with one thumb — which is how
     a seller reads between customers — that meant a heading was already in
     plain sight while still invisible, then faded in late. It read as the app
     stuttering rather than as an effect.

     Positive margins expand the trigger area instead, so a chapter starts
     revealing while it is still 200px below the fold and has finished by the
     time it is looked at. The animation still exists on a slow scroll, where
     it was always the point; it just can no longer be caught out. */
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px 200px 0px' }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className="mt-12 scroll-mt-24"
    >
      <div className="-mx-2 flex items-center gap-3">
        <span className="text-overline tabular-nums text-teal-strong">{pad(sectionNumber)}</span>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
        <span className="text-overline tabular-nums text-ink-3">{pad(totalSections)}</span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px 200px 0px' }}
        transition={{
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
        }}
        className="mb-4 mt-3 font-brand text-h2 text-ink"
      >
        {title}
      </motion.h2>

      <div>{children}</div>
    </motion.section>
  );
}

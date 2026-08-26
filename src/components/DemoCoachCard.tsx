// ─────────────────────────────────────────────────────────────────────────────
// DemoCoachCard — the journal answering back.
//
// A journal that only takes is a journal nobody fills in twice. This is the
// return leg: one verdict, read off the seller's own week of write-ups, with
// the lesson that answers it one tap away.
//
// One thing on screen, never a list. See demoCoach.ts for why that is the whole
// design and how the one thing is chosen.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LESSON_META } from '../data/lessonMeta';
import type { CoachVerdict } from '../utils/demoCoach';

const COPY = {
  en: { label: 'The pattern', open: 'Read' },
  es: { label: 'El patrón', open: 'Leer' },
};

export default function DemoCoachCard({ verdict }: { verdict: CoachVerdict }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const c = COPY[isEs ? 'es' : 'en'];

  const lesson = verdict.lessonId ? LESSON_META[verdict.lessonId] : undefined;
  const lessonTitle = lesson ? (isEs && lesson.titleEs ? lesson.titleEs : lesson.title) : '';

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface-feature feature-violet p-4"
    >
      <p className="flex items-center gap-1.5 text-overline text-ink-3">
        <Compass className="h-3.5 w-3.5" aria-hidden="true" />
        {c.label}
      </p>
      <h2 className="mt-1.5 text-h4 text-ink">{isEs ? verdict.headlineEs : verdict.headline}</h2>
      <p className="mt-1.5 text-body-small text-ink-2">{isEs ? verdict.bodyEs : verdict.body}</p>

      {/* Only ever offered when there is a lesson that actually answers it —
          a "learn more" that goes to a menu is a dead end wearing a button. */}
      {lesson && (
        <button
          type="button"
          onClick={() => navigate(`/lesson/${lesson.id}`)}
          className="btn-secondary mt-3 min-h-touch w-full"
        >
          <span className="truncate">
            {c.open}: {lessonTitle}
          </span>
        </button>
      )}
    </motion.section>
  );
}

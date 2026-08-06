// ─────────────────────────────────────────────────────────────────────────────
// BiggestLeak.tsx — the one card that reads the journal back to the seller.
//
// The roadmap's one-sentence problem was that the only real selling data in the
// product — who came in, who bought, and why the rest walked — was collected,
// written to the phone, and never read by anything, ever. A seller tapped
// "Muy caro" nine times last week and the app did precisely nothing with it.
//
// This closes that loop. It takes the most frequent walk-away reason of the last
// seven days and offers the two things that actually help: the lines that answer
// it, and the lesson behind them. Both land on the same reason the seller
// tapped, because the journal, the cheat sheet and the objection lessons all use
// one vocabulary (encounterChips.ts).
//
// ── WHEN IT STAYS HIDDEN ────────────────────────────────────────────────────
// Below MIN_WALKS it renders nothing. Three walk-aways is not a pattern, and
// telling someone their "biggest leak" after one bad hour is the kind of
// coaching that makes people stop logging honestly — which would cost the app
// the only data it has that the till cannot already produce.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, MessagesSquare, TrendingDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useStreetTracker } from '../hooks/useStreetTracker';
import { WALK_REASONS, chipLabel } from '../data/encounterChips';

/** A week is the window worth coaching on. */
const WINDOW_DAYS = 7;

/** Fewer than this and it is a bad afternoon, not a habit. */
const MIN_WALKS = 4;

export default function BiggestLeak() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { getRecentReasons } = useStreetTracker();
  const isEs = language === 'es';

  const top = useMemo(() => {
    const ranked = getRecentReasons(WINDOW_DAYS);
    const first = ranked[0];
    if (!first || first.count < MIN_WALKS) return null;
    const chip = WALK_REASONS.find((r) => r.id === first.id);
    return chip ? { chip, count: first.count } : null;
  }, [getRecentReasons]);

  if (!top) return null;

  const label = chipLabel(top.chip, isEs);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface-feature feature-gold p-5"
    >
      <div className="flex items-center gap-2">
        <TrendingDown size={16} className="shrink-0 text-gold-strong" aria-hidden="true" />
        <p className="text-overline text-gold-strong">
          {isEs ? 'Tu mayor fuga esta semana' : 'Your biggest leak this week'}
        </p>
      </div>

      <h2 className="mt-2 text-h3 text-ink">“{label}”</h2>
      <p className="mt-1 text-body-small text-ink-2">
        {isEs
          ? `${top.count} personas se fueron por esto en los últimos ${WINDOW_DAYS} días. Es la que más te cuesta.`
          : `${top.count} people walked on this in the last ${WINDOW_DAYS} days. It is costing you more than anything else.`}
      </p>

      <div className="mt-4 space-y-2">
        {/* Straight into the cheat sheet, already opened on this objection. */}
        <button
          type="button"
          onClick={() => navigate(`/cheat-sheets?said=${top.chip.id}`)}
          className="flex min-h-touch w-full items-center gap-3 rounded-card border border-line bg-surface px-4 py-3 text-left"
        >
          <MessagesSquare size={18} className="shrink-0 text-coral-strong" aria-hidden="true" />
          <span className="flex-1 text-body font-semibold text-ink">
            {isEs ? 'Qué decir la próxima vez' : 'What to say next time'}
          </span>
          <ArrowRight size={16} className="shrink-0 text-ink-3" aria-hidden="true" />
        </button>

        {top.chip.lessonId && (
          <button
            type="button"
            onClick={() => navigate(`/lesson/${top.chip.lessonId}`)}
            className="flex min-h-touch w-full items-center gap-3 rounded-card border border-line bg-surface px-4 py-3 text-left"
          >
            <BookOpen size={18} className="shrink-0 text-teal-strong" aria-hidden="true" />
            <span className="flex-1 text-body font-semibold text-ink">
              {isEs ? 'La lección que lo arregla' : 'The lesson that fixes it'}
            </span>
            <ArrowRight size={16} className="shrink-0 text-ink-3" aria-hidden="true" />
          </button>
        )}
      </div>
    </motion.section>
  );
}

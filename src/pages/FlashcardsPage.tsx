import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Flame, RotateCcw, Trophy, Zap, Sparkles, Sun } from 'lucide-react';
import { useFlashcards, getDueFlashcards } from '../hooks/useFlashcards';
import { useLanguage } from '../contexts/LanguageContext';
import { type Flashcard, getCategoryById } from '../data/flashcards';

type Rating = 'again' | 'hard' | 'good' | 'easy';

interface RatingButton {
  k: Rating;
  l: string;
  i: string;
  cls: string;
}

const RATINGS: Record<'en' | 'es', RatingButton[]> = {
  en: [
    { k: 'again', l: 'Again', i: '1d', cls: 'bg-danger-tint text-danger border-danger/30' },
    { k: 'hard', l: 'Hard', i: '3d', cls: 'bg-warning-tint text-warning border-warning/30' },
    { k: 'good', l: 'Good', i: '7d', cls: 'bg-success-tint text-success border-success/30' },
    { k: 'easy', l: 'Easy', i: '14d', cls: 'bg-teal-tint text-teal-strong border-teal/30' },
  ],
  es: [
    { k: 'again', l: 'Otra vez', i: '1d', cls: 'bg-danger-tint text-danger border-danger/30' },
    { k: 'hard', l: 'Difícil', i: '3d', cls: 'bg-warning-tint text-warning border-warning/30' },
    { k: 'good', l: 'Bien', i: '7d', cls: 'bg-success-tint text-success border-success/30' },
    { k: 'easy', l: 'Fácil', i: '14d', cls: 'bg-teal-tint text-teal-strong border-teal/30' },
  ],
};

export default function FlashcardsPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [sp] = useSearchParams();
  const catId = sp.get('category') ?? undefined;
  const mode = sp.get('mode');
  const morning = mode === 'morning';
  const quick = mode === 'quick';
  const limited = morning || quick;

  const { reviewCard, streak, getCardProgress } = useFlashcards();

  /**
   * The session deck is fixed when the session starts.
   *
   * It used to be derived from the live `dueCards` list, which shrinks the
   * moment you rate a card — while the index moved forward at the same time.
   * The result was that every second card got skipped. Snapshot it instead:
   * the deps are only the route's own parameters, so a review never rebuilds
   * the queue underneath the person holding the phone.
   */
  const cards = useMemo<Flashcard[]>(() => {
    const due = getDueFlashcards();
    const scoped = catId ? due.filter((c) => c.categoryId === catId) : due;
    return limited ? scoped.slice(0, 5) : scoped;
  }, [catId, limited]);

  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);
  const [stats, setStats] = useState({ again: 0, hard: 0, good: 0, easy: 0 });
  const [key, setKey] = useState(0);

  const card = cards[idx];
  const done = cards.length === 0 || idx >= cards.length;
  const num = Math.min(idx + 1, cards.length);
  const tot = cards.length;
  const pct = tot > 0 ? (num / tot) * 100 : 0;
  const reviewed = stats.again + stats.hard + stats.good + stats.easy;
  const R = RATINGS[isEs ? 'es' : 'en'];

  // An id that no longer maps to a deck must not blank the header.
  const deckName = (id?: string) => {
    const cat = id ? getCategoryById(id) : undefined;
    if (cat) return isEs ? cat.nameEs : cat.name;
    return isEs ? 'General' : 'General';
  };
  const catName = card
    ? deckName(card.categoryId)
    : catId
      ? deckName(catId)
      : isEs
        ? 'Todas las categorías'
        : 'All categories';

  const onFlip = useCallback(() => setFlip((p) => !p), []);

  const onRate = useCallback(
    (r: Rating) => {
      if (!card) return;
      reviewCard(card.id, r);
      setStats((p) => ({ ...p, [r]: p[r] + 1 }));
      setFlip(false);
      setTimeout(() => {
        setIdx((p) => p + 1);
        setKey((k) => k + 1);
      }, 150);
    },
    [card, reviewCard]
  );

  const onRestart = useCallback(() => {
    setIdx(0);
    setFlip(false);
    setStats({ again: 0, hard: 0, good: 0, easy: 0 });
    setKey((k) => k + 1);
  }, []);

  // ── Nothing due ──
  if (cards.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gold text-on-gold"
        >
          <Trophy className="h-11 w-11" aria-hidden="true" />
        </motion.div>
        <h2 className="mb-2 text-h2 text-ink">{isEs ? '¡Todo al día!' : 'All caught up'}</h2>
        <p className="mb-8 max-w-xs text-body-small text-ink-2">
          {catId
            ? isEs
              ? `No hay fichas pendientes en ${deckName(catId)}.`
              : `No cards due in ${deckName(catId)}.`
            : isEs
              ? 'No hay fichas pendientes. Vuelve mañana.'
              : 'No cards due for review. Come back tomorrow.'}
        </p>
        <button type="button" onClick={() => navigate('/flashcard-decks')} className="btn-secondary">
          {isEs ? 'Ver los mazos' : 'Browse decks'}
        </button>
        {streak > 0 && (
          <div className="mt-6 flex items-center gap-2 rounded-full bg-coral-tint px-4 py-2">
            <Flame className="h-4 w-4 text-coral-strong" aria-hidden="true" />
            <span className="text-caption font-semibold text-coral-strong">
              {streak} {isEs ? 'días de racha' : 'day streak'}
            </span>
          </div>
        )}
      </div>
    );
  }

  // ── Session complete ──
  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gold text-on-gold"
        >
          <Trophy className="h-11 w-11" aria-hidden="true" />
        </motion.div>
        <h2 className="mb-2 text-h2 text-ink">{isEs ? '¡Hecho!' : 'All done'}</h2>
        <p className="mb-8 text-body-small text-ink-2">
          {isEs
            ? `Has repasado ${reviewed} ficha${reviewed !== 1 ? 's' : ''} hoy`
            : `You reviewed ${reviewed} card${reviewed !== 1 ? 's' : ''} today`}
        </p>

        <div className="mb-8 grid w-full max-w-[320px] grid-cols-4 gap-2">
          {R.map((r) => (
            <div key={r.k} className={`rounded-card border p-3 text-center ${r.cls}`}>
              <div className="text-h4 tabular-nums">{stats[r.k]}</div>
              <div className="text-caption leading-tight">{r.l}</div>
            </div>
          ))}
        </div>

        {streak > 0 && (
          <div className="mb-8 flex items-center gap-2 rounded-full bg-coral-tint px-4 py-2">
            <Flame className="h-4 w-4 text-coral-strong" aria-hidden="true" />
            <span className="text-caption font-semibold text-coral-strong">
              {streak} {isEs ? 'días de racha' : 'day streak'}
            </span>
          </div>
        )}

        <div className="flex w-full max-w-[320px] flex-col gap-3">
          <button type="button" onClick={onRestart} className="btn-secondary w-full">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {isEs ? 'Repasar de nuevo' : 'Review again'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/flashcard-decks')}
            className="btn-quiet w-full"
          >
            {isEs ? 'Ver los mazos' : 'Browse decks'}
          </button>
        </div>
      </div>
    );
  }

  // ── Active review ──
  const prog = getCardProgress(card.id);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-line bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-app items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-icon shrink-0"
            aria-label={isEs ? 'Volver' : 'Go back'}
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="text-caption font-medium text-ink-2">
                {isEs ? `Ficha ${num} de ${tot}` : `Card ${num} of ${tot}`}
              </span>
              <div className="flex items-center gap-2">
                {morning && (
                  <span className="flex items-center gap-1 rounded-full bg-gold-tint px-2 py-0.5 text-caption font-semibold text-gold-strong">
                    <Sun className="h-3 w-3" aria-hidden="true" />
                    {isEs ? 'Mañana' : 'Morning'}
                  </span>
                )}
                {quick && (
                  <span className="flex items-center gap-1 rounded-full bg-violet-tint px-2 py-0.5 text-caption font-semibold text-violet-strong">
                    <Zap className="h-3 w-3" aria-hidden="true" />
                    {isEs ? 'Rápido' : 'Quick'}
                  </span>
                )}
                {streak > 0 && (
                  <span className="flex items-center gap-1 text-caption font-semibold text-coral-strong">
                    <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                    {streak}
                  </span>
                )}
              </div>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken"
              role="progressbar"
              aria-valuenow={num}
              aria-valuemin={0}
              aria-valuemax={tot}
            >
              <div
                className="h-full rounded-full bg-teal transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-app flex-1 flex-col px-5 py-5">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="rounded-full bg-teal-tint px-3 py-1 text-caption font-semibold text-teal-strong">
            {catName}
          </span>
          {prog && prog.reviewCount > 0 && (
            <span className="rounded-full bg-surface-sunken px-3 py-1 text-caption text-ink-2">
              {isEs ? `Repasada ${prog.reviewCount}x` : `Reviewed ${prog.reviewCount}x`}
            </span>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="flex flex-1 flex-col"
          >
            <button
              type="button"
              onClick={onFlip}
              aria-label={isEs ? 'Voltear la ficha' : 'Flip the card'}
              className="relative w-full flex-1 text-left"
              style={{ perspective: '1000px', minHeight: '280px' }}
            >
              <div
                className="relative h-full w-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flip ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.4s ease',
                }}
              >
                {/* Front */}
                <div
                  className="surface-raised absolute inset-0 flex flex-col items-center justify-center p-6"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-on-teal">
                    <Zap className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h2 className="text-center text-h4 leading-relaxed text-ink">
                    {isEs && card.questionEs ? card.questionEs : card.question}
                  </h2>
                  <p className="mt-6 text-caption text-ink-3">
                    {isEs ? 'Toca para ver la respuesta' : 'Tap to reveal the answer'}
                  </p>
                </div>

                {/* Back */}
                <div
                  className="surface-feature absolute inset-0 flex flex-col items-center justify-center p-6"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-on-teal">
                    <Sparkles className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <p className="mb-3 text-overline text-teal-strong">
                    {isEs ? 'Respuesta' : 'Answer'}
                  </p>
                  <p className="text-center text-body leading-relaxed text-ink">
                    {isEs && card.answerEs ? card.answerEs : card.answer}
                  </p>
                </div>
              </div>
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Rating */}
        <div className="mt-6">
          <AnimatePresence>
            {flip ? (
              <motion.div
                key="r"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25 }}
              >
                <p className="mb-3 text-center text-overline text-ink-3">
                  {isEs ? '¿Qué tal la sabías?' : 'How well did you know it?'}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {R.map((r) => (
                    <motion.button
                      key={r.k}
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRate(r.k);
                      }}
                      className={`flex min-h-touch flex-col items-center justify-center gap-0.5 rounded-card border py-3 ${r.cls}`}
                    >
                      <span className="text-caption font-bold">{r.l}</span>
                      <span className="text-caption opacity-80">{r.i}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="h"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-surface-sunken px-4 py-2">
                  <Sparkles className="h-4 w-4 text-teal-strong" aria-hidden="true" />
                  <span className="text-caption text-ink-2">
                    {isEs ? 'Toca la ficha para voltearla' : 'Tap the card to flip it'}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

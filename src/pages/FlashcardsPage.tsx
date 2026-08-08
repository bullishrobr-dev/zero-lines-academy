// ─────────────────────────────────────────────────────────────────────────────
// FlashcardsPage — one card at a time.
//
// TWO THINGS WERE WRONG HERE.
//
// 1. THE CARD HAD NO HEIGHT.
//    The flip stage was `<button class="flex-1" style="min-height:280px">`
//    holding `<div class="relative h-full w-full">` (the 3D rotator), and the
//    two faces were `absolute inset-0` inside that rotator.
//
//    `h-full` is `height: 100%`, and a percentage height only resolves against
//    a containing block with a *definite* height. The button's 631px came from
//    `flex-grow`, which is not definite for percentage resolution, so `h-full`
//    fell back to `auto` — and every child of the rotator was absolutely
//    positioned, so `auto` meant ZERO. Each face then became `inset-0` of a
//    0px box: 24px of `p-6` top and bottom plus two 1px borders, a 50px sliver.
//    `items-center justify-center` dutifully centred ~115px of content on a
//    0px content box, so the icon, the question and the hint hung ~57px above
//    and below a card that was barely a line tall. That is the owner's "they
//    are not in the middle" and "the text is not within the designated areas".
//
//    The fix is to use no percentage heights at all: the stage is `relative`
//    and flex-grown, and rotator and faces are each `absolute inset-0`, which
//    resolves off the containing block's padding box and never degrades.
//
// 2. THE CARD RESIZED WHEN YOU FLIPPED IT.
//    The rating grid only mounts once the card is flipped. It is a sibling of
//    a `flex-1` card, so revealing the answer stole ~70px from the card and
//    the whole face jumped mid-rotation. The controls row now reserves its
//    height whether or not the ratings are showing, so a flip changes nothing
//    but the face. Both faces are `inset-0` of the same stage, so front and
//    back are the same size by construction, for every card in the session.
//
// Long copy (Spanish runs ~20% longer than English) wraps and, if it still
// does not fit, scrolls INSIDE the face: each face is `overflow-hidden`, and
// its text sits in an `overflow-y-auto` well that centres with auto margins
// rather than `justify-center`, which would make the overflowing top
// unreachable. `overflow-hidden` on the face is also what stops half a
// sentence hanging in mid-air during the rotation.
//
// BROWSE MODE (`?mode=browse`) lets a seller open any deck and walk every
// card, not just the ones the scheduler queued. It is READ-ONLY: it never
// calls `reviewCard`, so no due date, ease factor, review count, streak or XP
// moves. See `getBrowseFlashcards` in src/hooks/useFlashcards.ts.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Flame,
  Layers,
  RotateCcw,
  Sparkles,
  Sun,
  Trophy,
  Zap,
} from 'lucide-react';
import { useFlashcards, getDueFlashcards, getBrowseFlashcards } from '../hooks/useFlashcards';
import { useCurrency } from '../utils/currency';
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

// ── Copy ────────────────────────────────────────────────────────────────────
// Spanish is European and informal ("tú"), matching the rest of the app.

const COPY = {
  en: {
    back: 'Go back',
    allDecks: 'All decks',
    general: 'General',
    cardOf: (n: number, t: number) => `Card ${n} of ${t}`,
    morning: 'Morning',
    quick: 'Quick',
    browse: 'Browse',
    reviewed: (n: number) => `Reviewed ${n}x`,
    question: 'Question',
    answer: 'Answer',
    tapReveal: 'Tap to reveal the answer',
    tapBack: 'Tap to see the question again',
    flipHint: 'Tap the card to flip it',
    howWell: 'How well did you know it?',
    browseHint: 'Practice only — nothing gets scheduled',
    prev: 'Back',
    next: 'Next',
    caughtUp: 'All caught up',
    caughtUpDeck: (deck: string) => `Nothing due in ${deck} right now.`,
    caughtUpAll: 'Nothing due for review right now.',
    caughtUpOffer: 'You can still go through the whole deck whenever you want.',
    caughtUpOfferAll: 'You can still go through every card whenever you want.',
    browseCta: (n: number) => `Browse all ${n} cards`,
    decksCta: 'Back to the decks',
    streakDays: (n: number) => `${n} day streak`,
    doneTitle: 'All done',
    doneBody: (n: number) => `You reviewed ${n} card${n === 1 ? '' : 's'} today`,
    reviewAgain: 'Review again',
    browseDoneTitle: 'End of the deck',
    browseDoneBody: (n: number) =>
      `You went through ${n} card${n === 1 ? '' : 's'}. Nothing was scheduled — browsing never moves your review dates.`,
    startOver: 'Start over',
    studyDue: (n: number) => `Study the ${n} due now`,
  },
  es: {
    back: 'Volver',
    allDecks: 'Todos los mazos',
    general: 'General',
    cardOf: (n: number, t: number) => `Ficha ${n} de ${t}`,
    morning: 'Mañana',
    quick: 'Rápido',
    browse: 'Repaso libre',
    reviewed: (n: number) => `Repasada ${n}x`,
    question: 'Pregunta',
    answer: 'Respuesta',
    tapReveal: 'Toca para ver la respuesta',
    tapBack: 'Toca para volver a la pregunta',
    flipHint: 'Toca la ficha para voltearla',
    howWell: '¿Qué tal la sabías?',
    browseHint: 'Solo práctica — no se programa nada',
    prev: 'Atrás',
    next: 'Siguiente',
    caughtUp: '¡Todo al día!',
    caughtUpDeck: (deck: string) => `Ahora mismo no hay nada pendiente en ${deck}.`,
    caughtUpAll: 'Ahora mismo no hay nada pendiente.',
    caughtUpOffer: 'Puedes repasar el mazo entero cuando quieras.',
    caughtUpOfferAll: 'Puedes repasar todas las fichas cuando quieras.',
    browseCta: (n: number) => `Ver las ${n} fichas`,
    decksCta: 'Volver a los mazos',
    streakDays: (n: number) => `${n} días de racha`,
    doneTitle: '¡Hecho!',
    doneBody: (n: number) => `Has repasado ${n} ficha${n === 1 ? '' : 's'} hoy`,
    reviewAgain: 'Repasar de nuevo',
    browseDoneTitle: 'Fin del mazo',
    browseDoneBody: (n: number) =>
      `Has pasado por ${n} ficha${n === 1 ? '' : 's'}. No se ha programado nada — el repaso libre nunca cambia tus fechas.`,
    startOver: 'Empezar de nuevo',
    studyDue: (n: number) => `Estudiar las ${n} pendientes`,
  },
};

/* The page column has to clear the docked nav bar, or the rating buttons sit
   underneath it. `--nav-h` and the 1.25rem of air are the same values
   src/components/Layout.tsx reserves — read, never re-typed. */
const COLUMN_HEIGHT = 'calc(100dvh - var(--nav-h) - 1.25rem - env(safe-area-inset-bottom, 0px))';

/* Reserved so the rating grid appearing on flip cannot resize the card. */
const CONTROLS_MIN_HEIGHT = '112px';

export default function FlashcardsPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  // Card copy carries {currency} tokens; resolve them for the seller's shop.
  const { sub } = useCurrency();
  const isEs = language === 'es';
  const t = COPY[isEs ? 'es' : 'en'];
  const [sp] = useSearchParams();
  const catId = sp.get('category') ?? undefined;
  const mode = sp.get('mode');
  const morning = mode === 'morning';
  const quick = mode === 'quick';
  const browse = mode === 'browse';
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
   *
   * In browse mode the list comes straight from the data file and the
   * scheduler is not consulted at all.
   */
  const baseCards = useMemo<Flashcard[]>(() => {
    if (browse) return getBrowseFlashcards(catId);
    const due = getDueFlashcards();
    const scoped = catId ? due.filter((c) => c.categoryId === catId) : due;
    return limited ? scoped.slice(0, 5) : scoped;
  }, [browse, catId, limited]);

  /* How many cards browsing would offer, for the "nothing due" screen. */
  const browsableCount = useMemo(() => getBrowseFlashcards(catId).length, [catId]);

  /* And how many are actually queued, so a browse session can hand back over.
     `getDueFlashcards` only reads the stored record — it never writes. */
  const dueHere = useMemo(() => {
    if (!browse) return 0;
    const due = getDueFlashcards();
    return catId ? due.filter((c) => c.categoryId === catId).length : due.length;
  }, [browse, catId]);

  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);
  const [stats, setStats] = useState({ again: 0, hard: 0, good: 0, easy: 0 });
  const [key, setKey] = useState(0);

  /*
   * A card rated "Again" comes back before the session ends — the single most
   * useful moment in retrieval practice is being re-tested right after seeing
   * the answer. The scheduler still books it for tomorrow too; this is the
   * in-session relearning step on top. Appending keeps the base deck a stable
   * snapshot, so the queue never rebuilds under the person holding the phone.
   */
  const [againQueue, setAgainQueue] = useState<Flashcard[]>([]);

  /*
   * Switching mode or deck starts a NEW session.
   *
   * Every entrance to this screen is the same route with a different query
   * string — `?category=x`, `?category=x&mode=browse`, `?mode=quick` — and
   * react-router keys its page transition on the pathname, so React reuses
   * this component and every piece of session state with it. Going from a due
   * session straight into "browse this deck" therefore landed on card 17 of
   * 16, already flipped to the answer. The route's own identity is the
   * session's identity, so reset on it. (React's documented "adjust state
   * when a prop changes" pattern — cheaper than an effect, and it re-renders
   * before anything paints.)
   */
  const sessionId = `${catId ?? ''}|${mode ?? ''}`;
  const [lastSessionId, setLastSessionId] = useState(sessionId);
  if (lastSessionId !== sessionId) {
    setLastSessionId(sessionId);
    setIdx(0);
    setFlip(false);
    setStats({ again: 0, hard: 0, good: 0, easy: 0 });
    setAgainQueue([]);
    setKey((k) => k + 1);
  }

  const cards = useMemo<Flashcard[]>(() => [...baseCards, ...againQueue], [baseCards, againQueue]);

  const card = cards[idx];
  const done = cards.length === 0 || idx >= cards.length;
  const num = Math.min(idx + 1, cards.length);
  const tot = cards.length;
  const pct = tot > 0 ? (num / tot) * 100 : 0;
  const reviewed = stats.again + stats.hard + stats.good + stats.easy;
  const R = RATINGS[isEs ? 'es' : 'en'];

  // An id that no longer maps to a deck must not blank the header.
  const deckName = useCallback(
    (id?: string) => {
      const cat = id ? getCategoryById(id) : undefined;
      if (cat) return isEs ? cat.nameEs : cat.name;
      return t.general;
    },
    [isEs, t.general]
  );
  const catName = card ? deckName(card.categoryId) : catId ? deckName(catId) : t.allDecks;

  const onFlip = useCallback(() => setFlip((p) => !p), []);

  const advance = useCallback((delta: number) => {
    setFlip(false);
    setIdx((p) => Math.max(0, p + delta));
    setKey((k) => k + 1);
  }, []);

  const onRate = useCallback(
    (r: Rating) => {
      if (!card || browse) return; // browse never writes to the scheduler
      reviewCard(card.id, r);
      setStats((p) => ({ ...p, [r]: p[r] + 1 }));
      // "Again" means "show me this one more time this session."
      if (r === 'again') setAgainQueue((q) => [...q, card]);
      setFlip(false);
      setTimeout(() => {
        setIdx((p) => p + 1);
        setKey((k) => k + 1);
      }, 150);
    },
    [browse, card, reviewCard]
  );

  const onRestart = useCallback(() => {
    setIdx(0);
    setFlip(false);
    setStats({ again: 0, hard: 0, good: 0, easy: 0 });
    setAgainQueue([]);
    setKey((k) => k + 1);
  }, []);

  const browseHref = catId ? `/flashcards?category=${catId}&mode=browse` : '/flashcards?mode=browse';
  const dueHref = catId ? `/flashcards?category=${catId}` : '/flashcards';

  // ── Nothing to show ──
  // Reached with an empty due queue. It used to be a dead end: "come back
  // tomorrow" and a button that only went back to the deck list. It now offers
  // the deck itself, which is what the person actually came for.
  if (cards.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-10 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gold text-on-gold"
        >
          <Trophy className="h-11 w-11" aria-hidden="true" />
        </motion.div>
        <h2 className="mb-2 text-h2 text-ink">{t.caughtUp}</h2>
        <p className="mb-2 max-w-xs text-body-small text-ink-2">
          {catId ? t.caughtUpDeck(deckName(catId)) : t.caughtUpAll}
        </p>
        <p className="mb-8 max-w-xs text-body-small text-ink-2">
          {catId ? t.caughtUpOffer : t.caughtUpOfferAll}
        </p>

        <div className="flex w-full max-w-[320px] flex-col gap-3">
          <button
            type="button"
            onClick={() => navigate(browseHref)}
            className="btn-secondary w-full"
          >
            <Layers className="h-4 w-4" aria-hidden="true" />
            {t.browseCta(browsableCount)}
          </button>
          <button
            type="button"
            onClick={() => navigate('/flashcard-decks')}
            className="btn-quiet w-full"
          >
            {t.decksCta}
          </button>
        </div>

        {streak > 0 && (
          <div className="mt-6 flex items-center gap-2 rounded-full bg-coral-tint px-4 py-2">
            <Flame className="h-4 w-4 text-coral-strong" aria-hidden="true" />
            <span className="text-caption font-semibold text-coral-strong">
              {t.streakDays(streak)}
            </span>
          </div>
        )}
      </div>
    );
  }

  // ── Session complete ──
  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-10 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gold text-on-gold"
        >
          {browse ? (
            <Layers className="h-11 w-11" aria-hidden="true" />
          ) : (
            <Trophy className="h-11 w-11" aria-hidden="true" />
          )}
        </motion.div>
        <h2 className="mb-2 text-h2 text-ink">{browse ? t.browseDoneTitle : t.doneTitle}</h2>
        <p className="mb-8 max-w-xs text-body-small text-ink-2">
          {browse ? t.browseDoneBody(tot) : t.doneBody(reviewed)}
        </p>

        {!browse && (
          <div className="mb-8 grid w-full max-w-[320px] grid-cols-4 gap-2">
            {R.map((r) => (
              <div key={r.k} className={`rounded-card border p-3 text-center ${r.cls}`}>
                <div className="text-h4 tabular-nums">{stats[r.k]}</div>
                <div className="text-caption leading-tight">{r.l}</div>
              </div>
            ))}
          </div>
        )}

        {streak > 0 && !browse && (
          <div className="mb-8 flex items-center gap-2 rounded-full bg-coral-tint px-4 py-2">
            <Flame className="h-4 w-4 text-coral-strong" aria-hidden="true" />
            <span className="text-caption font-semibold text-coral-strong">
              {t.streakDays(streak)}
            </span>
          </div>
        )}

        <div className="flex w-full max-w-[320px] flex-col gap-3">
          <button type="button" onClick={onRestart} className="btn-secondary w-full">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {browse ? t.startOver : t.reviewAgain}
          </button>
          {browse
            ? dueHere > 0 && (
                <button
                  type="button"
                  onClick={() => navigate(dueHref)}
                  className="btn-quiet w-full"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {t.studyDue(dueHere)}
                </button>
              )
            : browsableCount > 0 && (
                <button
                  type="button"
                  onClick={() => navigate(browseHref)}
                  className="btn-quiet w-full"
                >
                  <Layers className="h-4 w-4" aria-hidden="true" />
                  {t.browseCta(browsableCount)}
                </button>
              )}
          <button
            type="button"
            onClick={() => navigate('/flashcard-decks')}
            className="btn-quiet w-full"
          >
            {t.decksCta}
          </button>
        </div>
      </div>
    );
  }

  // ── Active card ──
  const prog = getCardProgress(card.id);
  const questionText = sub(isEs && card.questionEs ? card.questionEs : card.question);
  const answerText = sub(isEs && card.answerEs ? card.answerEs : card.answer);

  return (
    <div className="flex flex-col bg-background" style={{ minHeight: COLUMN_HEIGHT }}>
      <header className="sticky top-0 z-20 shrink-0 border-b border-line bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-app items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-icon shrink-0"
            aria-label={t.back}
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="truncate text-caption font-medium text-ink-2">
                {t.cardOf(num, tot)}
              </span>
              <div className="flex shrink-0 items-center gap-2">
                {morning && (
                  <span className="flex items-center gap-1 rounded-full bg-gold-tint px-2 py-0.5 text-caption font-semibold text-gold-strong">
                    <Sun className="h-3 w-3" aria-hidden="true" />
                    {t.morning}
                  </span>
                )}
                {quick && (
                  <span className="flex items-center gap-1 rounded-full bg-violet-tint px-2 py-0.5 text-caption font-semibold text-violet-strong">
                    <Zap className="h-3 w-3" aria-hidden="true" />
                    {t.quick}
                  </span>
                )}
                {browse && (
                  <span className="flex items-center gap-1 rounded-full bg-violet-tint px-2 py-0.5 text-caption font-semibold text-violet-strong">
                    <Layers className="h-3 w-3" aria-hidden="true" />
                    {t.browse}
                  </span>
                )}
                {streak > 0 && !browse && (
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

      <div className="mx-auto flex w-full min-h-0 max-w-app flex-1 flex-col px-5 pb-4 pt-4">
        <div className="mb-3 flex shrink-0 flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-teal-tint px-3 py-1 text-caption font-semibold text-teal-strong">
            {catName}
          </span>
          {prog && prog.reviewCount > 0 && (
            <span className="rounded-full bg-surface-sunken px-3 py-1 text-caption text-ink-2">
              {t.reviewed(prog.reviewCount)}
            </span>
          )}
        </div>

        {/*
          THE STAGE. `relative` + flex-grown, with a floor so a short viewport
          still gets a card-shaped card. Everything below is `absolute inset-0`
          — no percentage height anywhere in the chain, which is the whole
          reason the faces used to collapse to 50px. Both faces are inset-0 of
          this one box, so front and back can never differ in size.
        */}
        <div
          className="relative max-h-[440px] min-h-[240px] w-full flex-1"
          data-testid="fc-stage"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0"
            >
              <button
                type="button"
                onClick={onFlip}
                aria-label={isEs ? 'Voltear la ficha' : 'Flip the card'}
                aria-pressed={flip}
                className="absolute inset-0 block w-full text-left"
                style={{ perspective: '1200px' }}
              >
                <div
                  className="absolute inset-0"
                  data-testid="fc-card"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flip ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                >
                  <CardFace
                    side="front"
                    label={t.question}
                    icon={<Zap className="h-5 w-5" aria-hidden="true" />}
                    text={questionText}
                    hint={t.tapReveal}
                    heading
                  />
                  <CardFace
                    side="back"
                    label={t.answer}
                    icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
                    text={answerText}
                    hint={t.tapBack}
                  />
                </div>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls. The height is reserved so flipping the card cannot resize it. */}
        <div
          className="mt-4 flex shrink-0 flex-col justify-start"
          style={{ minHeight: CONTROLS_MIN_HEIGHT }}
        >
          {browse ? (
            <div>
              <p className="mb-2.5 text-center text-caption text-ink-3">{t.browseHint}</p>
              <div className="flex items-stretch gap-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => advance(-1)}
                  disabled={idx === 0}
                  className="flex min-h-touch flex-1 items-center justify-center gap-1.5 rounded-card border border-line bg-surface-sunken px-3 text-button text-ink disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  {t.prev}
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => advance(1)}
                  className="flex min-h-touch flex-[1.4] items-center justify-center gap-1.5 rounded-card bg-teal px-3 text-button text-on-teal"
                >
                  {t.next}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </motion.button>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {flip ? (
                <motion.div
                  key="r"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="mb-2.5 text-center text-overline text-ink-3">{t.howWell}</p>
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
                        className={`flex min-h-touch flex-col items-center justify-center gap-0.5 rounded-card border px-1 py-3 ${r.cls}`}
                      >
                        <span className="text-caption font-bold leading-tight">{r.l}</span>
                        <span className="text-caption leading-tight opacity-80">{r.i}</span>
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
                    <span className="text-caption text-ink-2">{t.flipHint}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Pieces ──────────────────────────────────────────────────────────────────

/**
 * One face of the card.
 *
 * `absolute inset-0` (never `h-full`) so it always has the stage's real size,
 * `overflow-hidden` so nothing can render outside it — including mid-rotation
 * — and a three-row column: label strip, scrollable well, hint. The padding
 * lives on those rows, NOT on this element: an `inset-0` box whose own padding
 * is its only height is exactly how this used to end up a 50px sliver.
 *
 * The well centres with `m-auto` rather than `justify-center`, because
 * `justify-content: center` in a scroll container pushes overflowing content
 * past the scroll origin, where it cannot be reached.
 */
function CardFace({
  side,
  label,
  icon,
  text,
  hint,
  heading = false,
}: {
  side: 'front' | 'back';
  label: string;
  icon: React.ReactNode;
  text: string;
  hint: string;
  heading?: boolean;
}) {
  const isFront = side === 'front';
  /* Spanish runs ~20% longer than English, so the step down is driven by the
     resolved string rather than by language. */
  const long = text.length > 120;
  const size = heading
    ? long
      ? 'text-h4'
      : 'text-h3'
    : long
      ? 'text-body-small'
      : 'text-body';

  return (
    <div
      data-testid={`fc-face-${side}`}
      className={`absolute inset-0 flex flex-col overflow-hidden rounded-feature ${
        isFront ? 'surface-raised' : 'surface-feature'
      }`}
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        ...(isFront ? null : { transform: 'rotateY(180deg)' }),
      }}
    >
      <div className="flex shrink-0 items-center justify-center gap-2 px-5 pt-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-on-teal">
          {icon}
        </span>
        <span className="text-overline text-teal-strong">{label}</span>
      </div>

      <div
        data-testid="fc-scroll"
        className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-4"
      >
        {heading ? (
          <h2
            data-testid="fc-text"
            className={`m-auto w-full break-words text-center ${size} text-ink`}
          >
            {text}
          </h2>
        ) : (
          <p
            data-testid="fc-text"
            className={`m-auto w-full break-words text-center ${size} text-ink`}
          >
            {text}
          </p>
        )}
      </div>

      <p className="shrink-0 px-5 pb-4 text-center text-caption text-ink-3">{hint}</p>
    </div>
  );
}

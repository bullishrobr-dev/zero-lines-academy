import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Brain,
  Heart,
  Zap,
  Package,
  ChevronRight,
  Flame,
  BookOpen,
  TrendingUp,
  Clock,
  Sparkles,
  BarChart3,
  Sun,
  Layers,
} from 'lucide-react';
import { useFlashcards } from '../hooks/useFlashcards';
import { useLanguage } from '../contexts/LanguageContext';
import { categories } from '../data/flashcards';

// ── Copy ────────────────────────────────────────────────────────────────────
// This screen had no `useLanguage` import at all, so "Flashcard Decks",
// "Due Today", "Streak" and "Mastered" stayed English whatever the toggle said.

const COPY = {
  en: {
    title: 'Flashcard Decks',
    subtitle: 'Spaced repetition',
    back: 'Go back',
    dueBadge: 'cards due',
    due: 'Due today',
    streak: 'Streak',
    streakUnit: 'days',
    mastered: 'Mastered',
    overall: 'Overall progress',
    reviews: 'reviews',
    totalCards: 'total cards',
    masteredSuffix: 'mastered',
    morningTitle: 'Morning briefing',
    morningBody: 'A five-card warm-up before the door',
    reviewAllTitle: 'Review all due cards',
    reviewAllBody: (n: number) => `${n} card${n === 1 ? '' : 's'} waiting`,
    browseAllTitle: 'Browse every card',
    browseAllBody: (n: number) => `All ${n} cards, nothing scheduled`,
    nothingDueTitle: 'Nothing due right now',
    nothingDueBody: 'Pick a deck below and go through it whenever you want.',
    byCategory: 'Study by category',
    cards: 'cards',
    dueShort: 'due',
    dueNow: (n: number) => `Due now (${n})`,
    browseDeck: (n: number) => `Browse all (${n})`,
    modeHint: 'Browsing never changes when a card comes back.',
    footer: (cards: number, decks: number) => `${cards} cards across ${decks} decks`,
    footerSub: 'Cards come back on a spacing that matches how well you knew them.',
    emptyTitle: 'No decks yet',
    emptyBody: 'Flashcards appear here as lessons are added.',
  },
  es: {
    title: 'Mazos de Fichas',
    subtitle: 'Repetición espaciada',
    back: 'Volver',
    dueBadge: 'fichas pendientes',
    due: 'Para hoy',
    streak: 'Racha',
    streakUnit: 'días',
    mastered: 'Dominado',
    overall: 'Progreso general',
    reviews: 'repasos',
    totalCards: 'fichas en total',
    masteredSuffix: 'dominado',
    morningTitle: 'Repaso de la mañana',
    morningBody: 'Cinco fichas antes de salir a la puerta',
    reviewAllTitle: 'Repasar todas las pendientes',
    reviewAllBody: (n: number) => `${n} ficha${n === 1 ? '' : 's'} esperando`,
    browseAllTitle: 'Ver todas las fichas',
    browseAllBody: (n: number) => `Las ${n} fichas, sin programar nada`,
    nothingDueTitle: 'Ahora mismo no hay nada pendiente',
    nothingDueBody: 'Elige un mazo de abajo y repásalo cuando quieras.',
    byCategory: 'Estudiar por categoría',
    cards: 'fichas',
    dueShort: 'pendientes',
    dueNow: (n: number) => `Pendientes (${n})`,
    browseDeck: (n: number) => `Ver todas (${n})`,
    modeHint: 'El repaso libre nunca cambia cuándo vuelve una ficha.',
    footer: (cards: number, decks: number) => `${cards} fichas en ${decks} mazos`,
    footerSub: 'Las fichas vuelven según lo bien que te las supiste.',
    emptyTitle: 'Aún no hay mazos',
    emptyBody: 'Las fichas aparecerán aquí a medida que se añadan lecciones.',
  },
};

// ── Deck theming ────────────────────────────────────────────────────────────
// One palette hue per deck. Everything is a token — no hex, and coloured fills
// always take their `on-*` ink.

interface DeckTheme {
  tint: string;
  ink: string;
  bar: string;
  border: string;
}

const DECK_THEME: Record<string, DeckTheme> = {
  'sales-psychology': {
    tint: 'bg-violet-tint',
    ink: 'text-violet-strong',
    bar: 'bg-violet',
    border: 'border-violet/25',
  },
  'reading-connecting': {
    tint: 'bg-coral-tint',
    ink: 'text-coral-strong',
    bar: 'bg-coral',
    border: 'border-coral/25',
  },
  'art-of-stopping': {
    tint: 'bg-gold-tint',
    ink: 'text-gold-strong',
    bar: 'bg-gold',
    border: 'border-gold/25',
  },
  'product-mastery': {
    tint: 'bg-teal-tint',
    ink: 'text-teal-strong',
    bar: 'bg-teal',
    border: 'border-teal/25',
  },
};

/** A deck id nobody has themed still renders — it just borrows the brand hue. */
const FALLBACK_THEME: DeckTheme = DECK_THEME['product-mastery'];

const ICONS: Record<string, React.ElementType> = { Brain, Heart, Zap, Package };

// ── Page ────────────────────────────────────────────────────────────────────

export default function FlashcardDeckPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const t = COPY[isEs ? 'es' : 'en'];

  const {
    dueCount,
    streak,
    masteryPercent,
    totalReviewed,
    categoryMastery,
    categoryDueCount,
    categoryTotalCount,
  } = useFlashcards();

  const decks = useMemo(
    () =>
      categories.map((cat, index) => ({
        id: cat.id,
        name: isEs ? cat.nameEs : cat.name,
        description: isEs ? cat.descriptionEs : cat.description,
        index,
        // Deck size comes from the hook so the row label, the browse button's
        // count and the session the button opens can never disagree.
        totalCards: categoryTotalCount[cat.id] ?? 0,
        due: categoryDueCount[cat.id] ?? 0,
        mastered: categoryMastery[cat.id] ?? 0,
        Icon: ICONS[cat.icon] ?? Brain,
        theme: DECK_THEME[cat.id] ?? FALLBACK_THEME,
      })),
    [categoryDueCount, categoryMastery, categoryTotalCount, isEs]
  );

  const totalCards = useMemo(() => decks.reduce((sum, d) => sum + d.totalCards, 0), [decks]);

  return (
    <div className="min-h-screen bg-background text-ink pb-10">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-line bg-background/95 backdrop-blur-md">
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
            <h1 className="truncate text-h4 text-ink">{t.title}</h1>
            <p className="truncate text-caption text-ink-3">{t.subtitle}</p>
          </div>
          {dueCount > 0 && (
            <span
              className="flex h-9 min-w-[36px] shrink-0 items-center justify-center rounded-full bg-teal px-2.5 text-caption font-bold text-on-teal"
              aria-label={`${dueCount} ${t.dueBadge}`}
            >
              {dueCount}
            </span>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-app px-4 pt-5">
        {/* Stats */}
        <div className="mb-5 grid grid-cols-3 gap-2.5">
          <StatCard
            icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
            label={t.due}
            value={dueCount}
            tint="bg-teal-tint"
            ink="text-teal-strong"
          />
          <StatCard
            icon={<Flame className="h-4 w-4" aria-hidden="true" />}
            label={t.streak}
            value={streak}
            suffix={t.streakUnit}
            tint="bg-coral-tint"
            ink="text-coral-strong"
          />
          <StatCard
            icon={<TrendingUp className="h-4 w-4" aria-hidden="true" />}
            label={t.mastered}
            value={`${masteryPercent}%`}
            tint="bg-gold-tint"
            ink="text-gold-strong"
          />
        </div>

        {/* Overall progress */}
        <section className="surface-raised mb-5 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <BarChart3 className="h-4 w-4 shrink-0 text-ink-3" aria-hidden="true" />
              <span className="truncate text-body-small font-semibold text-ink">{t.overall}</span>
            </div>
            <span className="shrink-0 text-body-small font-bold tabular-nums text-ink">
              {totalReviewed} {t.reviews}
            </span>
          </div>
          <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-surface-sunken">
            <motion.div
              className="h-full rounded-full bg-teal"
              initial={{ width: 0 }}
              animate={{ width: `${masteryPercent}%` }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-caption text-ink-3">
              {totalCards} {t.totalCards}
            </span>
            <span className="text-caption font-semibold text-teal-strong">
              {masteryPercent}% {t.masteredSuffix}
            </span>
          </div>
        </section>

        {/* Session shortcuts.
            This block used to render only when something was due, so a seller
            with a clear queue got a screen with no way into any card at all.
            Browsing is always offered; the scheduled sessions come and go. */}
        <div className="mb-6 space-y-3">
          {dueCount > 0 ? (
            <>
              <ActionRow
                onClick={() => navigate('/flashcards?mode=morning')}
                icon={<Sun className="h-6 w-6" aria-hidden="true" />}
                title={t.morningTitle}
                body={t.morningBody}
                featureClass="feature-gold"
                fillClass="bg-gold text-on-gold"
                inkClass="text-gold-strong"
              />
              <ActionRow
                onClick={() => navigate('/flashcards')}
                icon={<Sparkles className="h-6 w-6" aria-hidden="true" />}
                title={t.reviewAllTitle}
                body={t.reviewAllBody(dueCount)}
                featureClass=""
                fillClass="bg-teal text-on-teal"
                inkClass="text-teal-strong"
              />
            </>
          ) : (
            <div className="surface-flat p-4">
              <h3 className="text-body-small font-semibold text-ink">{t.nothingDueTitle}</h3>
              <p className="mt-0.5 text-caption text-ink-2">{t.nothingDueBody}</p>
            </div>
          )}
          <ActionRow
            onClick={() => navigate('/flashcards?mode=browse')}
            icon={<Layers className="h-6 w-6" aria-hidden="true" />}
            title={t.browseAllTitle}
            body={t.browseAllBody(totalCards)}
            featureClass="feature-violet"
            fillClass="bg-violet-tint text-violet-strong"
            inkClass="text-violet-strong"
          />
        </div>

        {/* Decks */}
        <h2 className="mb-3 text-overline text-ink-3">{t.byCategory}</h2>

        {decks.length === 0 ? (
          <div className="surface-flat p-6 text-center">
            <h3 className="mb-1 text-h4 text-ink">{t.emptyTitle}</h3>
            <p className="text-body-small text-ink-2">{t.emptyBody}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/*
              A deck row used to be ONE button that could only open the due
              queue, which is why "somebody wants to check the cards on the art
              of stopping" had nowhere to go once that deck was clear. It is now
              a card carrying two explicit entrances — the scheduled queue, and
              the whole deck — so both modes are visible without opening
              anything, and the counts say which is which.
            */}
            {decks.map((deck) => (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(deck.index * 0.07, 0.3) }}
                className={`rounded-card border ${deck.theme.border} bg-surface p-4`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-card ${deck.theme.tint}`}
                  >
                    <deck.Icon className={`h-6 w-6 ${deck.theme.ink}`} aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="truncate text-body-small font-semibold text-ink">
                        {deck.name}
                      </h3>
                      {deck.due > 0 && (
                        <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-teal px-1.5 text-caption font-bold text-on-teal">
                          {deck.due}
                        </span>
                      )}
                    </div>
                    <p className="mb-2 truncate text-caption text-ink-2">{deck.description}</p>

                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-sunken">
                        <motion.div
                          className={`h-full rounded-full ${deck.theme.bar}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${deck.mastered}%` }}
                          transition={{
                            duration: 0.7,
                            ease: 'easeOut',
                            delay: 0.2 + deck.index * 0.08,
                          }}
                        />
                      </div>
                      <span className="text-caption font-medium tabular-nums text-ink-3">
                        {deck.mastered}%
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center gap-3">
                      <span className="text-caption text-ink-3">
                        {deck.totalCards} {t.cards}
                      </span>
                      {deck.due > 0 && (
                        <span className="flex items-center gap-1 text-caption text-teal-strong">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {deck.due} {t.dueShort}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    disabled={deck.due === 0}
                    onClick={() => navigate(`/flashcards?category=${deck.id}`)}
                    className="flex min-h-touch items-center justify-center gap-1.5 rounded-card bg-teal px-2 text-caption font-bold text-on-teal disabled:bg-surface-sunken disabled:text-ink-3"
                  >
                    <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{t.dueNow(deck.due)}</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/flashcards?category=${deck.id}&mode=browse`)}
                    className="flex min-h-touch items-center justify-center gap-1.5 rounded-card border border-line bg-surface-sunken px-2 text-caption font-bold text-ink"
                  >
                    <Layers className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{t.browseDeck(deck.totalCards)}</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
            <p className="pt-1 text-center text-caption text-ink-3">{t.modeHint}</p>
          </div>
        )}

        <div className="mt-8 pb-4 text-center">
          <p className="text-caption text-ink-3">{t.footer(totalCards, categories.length)}</p>
          <p className="mt-1 text-caption text-ink-3">{t.footerSub}</p>
        </div>
      </div>
    </div>
  );
}

// ── Pieces ──────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  suffix,
  tint,
  ink,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  suffix?: string;
  tint: string;
  ink: string;
}) {
  return (
    <div className="surface-flat p-3">
      <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-chip ${tint}`}>
        <span className={ink}>{icon}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-h3 tabular-nums ${ink}`}>{value}</span>
        {suffix && <span className="text-caption text-ink-3">{suffix}</span>}
      </div>
      <p className="mt-0.5 text-caption text-ink-2">{label}</p>
    </div>
  );
}

function ActionRow({
  onClick,
  icon,
  title,
  body,
  featureClass,
  fillClass,
  inkClass,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  body: string;
  featureClass: string;
  fillClass: string;
  inkClass: string;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={`surface-feature ${featureClass} flex w-full items-center gap-3 p-4 text-left`}
    >
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-card ${fillClass}`}>
        {icon}
      </div>
      {/* `truncate` here clipped "Repasar todas las pendientes" to
          "Repasar todas las pendie…" — Spanish runs ~20% longer than the
          English these widths were eyeballed against. Two lines, then clamp. */}
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-body-small font-semibold text-ink">{title}</h3>
        <p className="line-clamp-2 text-caption text-ink-2">{body}</p>
      </div>
      <ChevronRight className={`h-5 w-5 shrink-0 ${inkClass}`} aria-hidden="true" />
    </motion.button>
  );
}

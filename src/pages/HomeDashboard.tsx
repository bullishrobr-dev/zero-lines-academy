// ─────────────────────────────────────────────────────────────
// HomeDashboard.tsx — the landing screen
//
// Rebuilt around a single question: "what should I do right now?"
//
//  · A full-bleed, time-of-day hero carries the greeting, the streak and the
//    one action that matters at this hour.
//  · Everything below is a weighted feed — feature surfaces for the things
//    worth doing today, raised cards for interactive shortcuts, flat cards for
//    reference. The old screen was nine identical rows in one column.
//  · Cheat Sheets and the Leaderboard are surfaced here; the Leaderboard had
//    no inbound link anywhere in the app and Cheat Sheets sat at the bottom of
//    a 2,200px scroll despite being the screen sellers need mid-sale.
//  · The name comes from the auth context, not a raw localStorage read.
// ─────────────────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  Users,
  Hand,
  Sparkles,
  BookOpen,
  Flame,
  Zap,
  Target,
  TrendingUp,
  FileText,
  Dumbbell,
  BrainCircuit,
  Award,
  ChevronRight,
  ArrowRight,
  Quote as QuoteIcon,
  Sunrise,
  Moon,
  Trophy,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useState, useCallback, useRef } from 'react';
import { getLesson, getCategory } from '../data/lessons';
import { getRandomQuote, type Quote } from '../data/quotes';
import { useProgress } from '../hooks/useProgress';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuthContext } from '../contexts/AuthContext';
import DailyChallengeCard from '../components/DailyChallengeCard';
import DailyDose, { DailyDoseModal } from '../components/DailyDose';
import XPToast from '../components/XPToast';
import ConfettiCelebration from '../components/ConfettiCelebration';
import { useDailyFlow } from '../hooks/useDailyFlow';
import { useCountUp } from '../hooks/useCountUp';
import { haptic } from '../utils/haptics';

/* ─── Copy ───
   These strings have no key in data/translations.ts (owned elsewhere), so they
   live here rather than shipping as hardcoded English. Spanish is European,
   informal "tú". */
const COPY = {
  en: {
    signIn: 'Sign in for the admin & manager dashboard',
    dayStreak: 'day streak',
    checkIn: 'Shift check-in',
    checkInSub: 'How are you feeling? What is today’s goal?',
    endShift: 'End of shift',
    endShiftSub: 'Reflect on your day and keep your streak alive',
    keepGoing: 'Pick up where you left off',
    keepGoingSub: 'Your next lesson is waiting',
    startTraining: 'Start training',
    startTrainingSub: 'Four paths, 31 lessons — begin with the basics',
    nowLabel: 'Right now',
    onTheFloor: 'On the floor',
    cheatSheets: 'Cheat sheets',
    cheatSheetsSub: 'Prices, scripts and closes — open mid-sale',
    logSale: 'Log a sale',
    logSaleSub: 'Track stops, brings and revenue',
    leaderboard: 'Leaderboard',
    leaderboardSub: 'Andorra vs Gibraltar',
    quizzes: 'Quizzes',
    exercises: 'Exercises',
    flashcards: 'Flashcards',
    quickPractice: 'Quick practice',
    quickPracticeSub: 'Got a few minutes? Sharpen your skills.',
    flashcardSprint: 'Flashcard sprint',
    flashcardSprintSub: '1 min · 5 cards',
    scenarioDrill: 'Scenario drill',
    scenarioDrillSub: '2 min · real situation',
    priceLadder: 'Price ladder',
    priceLadderSub: 'Test your pricing',
    newHere: 'New to Zero Lines?',
    newHereSub: 'First-day track — learn to stop people and bring them inside',
    streakMilestone: 'streak — keep it going!',
    challengeDone: 'Challenge complete',
    doseDone: 'Daily dose read',
  },
  es: {
    signIn: 'Inicia sesión para el panel de admin y manager',
    dayStreak: 'días de racha',
    checkIn: 'Check-in de turno',
    checkInSub: '¿Cómo te sientes? ¿Cuál es tu meta de hoy?',
    endShift: 'Fin de turno',
    endShiftSub: 'Repasa tu día y mantén viva tu racha',
    keepGoing: 'Sigue donde lo dejaste',
    keepGoingSub: 'Tu próxima lección te espera',
    startTraining: 'Empieza a formarte',
    startTrainingSub: 'Cuatro caminos, 31 lecciones — empieza por lo básico',
    nowLabel: 'Ahora mismo',
    onTheFloor: 'En la calle',
    cheatSheets: 'Hojas de trucos',
    cheatSheetsSub: 'Precios, guiones y cierres — ábrelas en plena venta',
    logSale: 'Registrar venta',
    logSaleSub: 'Apunta paradas, entradas e ingresos',
    leaderboard: 'Clasificación',
    leaderboardSub: 'Andorra vs Gibraltar',
    quizzes: 'Cuestionarios',
    exercises: 'Ejercicios',
    flashcards: 'Tarjetas',
    quickPractice: 'Práctica rápida',
    quickPracticeSub: '¿Tienes unos minutos? Afila tus habilidades.',
    flashcardSprint: 'Sprint de tarjetas',
    flashcardSprintSub: '1 min · 5 tarjetas',
    scenarioDrill: 'Simulacro de escenario',
    scenarioDrillSub: '2 min · situación real',
    priceLadder: 'Escalera de precios',
    priceLadderSub: 'Pon a prueba tus precios',
    newHere: '¿Nuevo en Zero Lines?',
    newHereSub: 'Track de primer día — aprende a parar gente y meterla dentro',
    streakMilestone: 'de racha — ¡no la sueltes!',
    challengeDone: 'Reto completado',
    doseDone: 'Dosis diaria leída',
  },
} as const;

/* ─── Helpers ─── */

const iconMap: Record<string, LucideIcon> = { Brain, Users, Hand, Sparkles };

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles;
}

function getContinueLearning(): string[] {
  try {
    return JSON.parse(localStorage.getItem('zl_continue_learning') || '[]');
  } catch {
    return [];
  }
}

function saveContinueLearning(lessonId: string) {
  const list = getContinueLearning().filter((id) => id !== lessonId);
  list.unshift(lessonId);
  if (list.length > 10) list.pop();
  localStorage.setItem('zl_continue_learning', JSON.stringify(list));
}

/** Local date key — matches useProgress, which is deliberately not UTC. */
function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];

/* ─── Animations ─── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ─── Small building blocks ─── */

function SectionHeading({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-h3 text-ink">{title}</h2>
      {hint && <p className="text-caption text-ink-3">{hint}</p>}
    </div>
  );
}

function StatTile({
  icon: Icon,
  value,
  label,
  tone,
  isZero,
}: {
  icon: LucideIcon;
  value: number;
  label: string;
  tone: 'coral' | 'teal' | 'gold';
  isZero: boolean;
}) {
  const iconTone =
    tone === 'coral' ? 'text-coral-strong' : tone === 'teal' ? 'text-teal-strong' : 'text-gold-strong';
  return (
    <div className="surface-flat flex flex-col items-center gap-1 px-2 py-3">
      <Icon size={20} className={iconTone} aria-hidden="true" />
      {/* Zero state used to render at 2.87:1. `text-ink-3` is the AA floor. */}
      <p className={`text-h2 tabular-nums ${isZero ? 'text-ink-3' : 'text-ink'}`}>{value}</p>
      <p className="text-caption text-ink-2">{label}</p>
    </div>
  );
}

function TileLink({
  icon: Icon,
  label,
  onClick,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  tone: 'teal' | 'gold' | 'violet';
}) {
  const tint =
    tone === 'teal' ? 'bg-teal-tint' : tone === 'gold' ? 'bg-gold-tint' : 'bg-violet-tint';
  const ink =
    tone === 'teal' ? 'text-teal-strong' : tone === 'gold' ? 'text-gold-strong' : 'text-violet-strong';
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="surface-raised flex min-h-touch flex-col items-center gap-2 px-2 py-4"
    >
      <span className={`flex h-11 w-11 items-center justify-center rounded-chip ${tint}`}>
        <Icon size={22} className={ink} aria-hidden="true" />
      </span>
      <span className="text-caption text-ink">{label}</span>
    </motion.button>
  );
}

function PracticeCard({
  icon: Icon,
  title,
  subtitle,
  onClick,
  tone,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick: () => void;
  tone: 'teal' | 'coral' | 'violet';
}) {
  const tint =
    tone === 'teal' ? 'bg-teal-tint' : tone === 'coral' ? 'bg-coral-tint' : 'bg-violet-tint';
  const ink =
    tone === 'teal' ? 'text-teal-strong' : tone === 'coral' ? 'text-coral-strong' : 'text-violet-strong';
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="surface-raised flex w-[248px] flex-shrink-0 snap-start items-center gap-3 p-4 text-left"
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tint}`}>
        <Icon size={22} className={ink} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-h4 text-ink">{title}</span>
        <span className="block text-caption text-ink-2">{subtitle}</span>
      </span>
    </motion.button>
  );
}

/* ─── Main component ─── */

export default function HomeDashboard() {
  const navigate = useNavigate();
  const progress = useProgress();
  const { language, t } = useLanguage();
  const { user, isAuthenticated } = useAuthContext();
  const dailyFlow = useDailyFlow();
  const todayProgress = dailyFlow.getTodayProgress();
  const [showDoseModal, setShowDoseModal] = useState(false);

  const c = language === 'es' ? COPY.es : COPY.en;
  const lessonProgress = progress.lessonProgress;

  /* The stored user shape just changed — read it through the context, never
     straight out of localStorage. */
  const userName = useMemo(() => user?.name?.split(' ')[0] || t('profileSalesTrainee'), [user, t]);

  const totalXP = progress.getTotalXP();
  const lessonsCompleted = progress.getLessonsCompletedCount();
  const currentStreak = progress.getCurrentStreak();

  /* ── Time of day drives both the greeting and the hero wash ── */
  const hour = new Date().getHours();
  const partOfDay: 'dawn' | 'day' | 'dusk' = hour < 12 ? 'dawn' : hour < 18 ? 'day' : 'dusk';
  const greeting =
    partOfDay === 'dawn'
      ? t('homeGoodMorning')
      : partOfDay === 'day'
        ? t('homeGoodAfternoon')
        : t('homeGoodEvening');
  const heroWash =
    partOfDay === 'dawn' ? 'hero-dawn' : partOfDay === 'day' ? 'hero-day' : 'hero-dusk';

  /* ── The single most important action right now ── */
  const continueIds = useMemo(() => getContinueLearning(), []);
  const continueLessons = useMemo(
    () => continueIds.map((id) => getLesson(id)).filter(Boolean).slice(0, 6),
    [continueIds]
  );
  const nextLesson = continueLessons.find((l) => l && !lessonProgress[l.id]) || continueLessons[0];

  const primaryAction = useMemo(() => {
    if (!todayProgress.checkedIn) {
      return { icon: Sunrise, title: c.checkIn, subtitle: c.checkInSub, to: '/shift-checkin' };
    }
    if (!todayProgress.reflected) {
      return { icon: Moon, title: c.endShift, subtitle: c.endShiftSub, to: '/end-of-shift' };
    }
    if (nextLesson) {
      return {
        icon: BookOpen,
        title: c.keepGoing,
        subtitle: nextLesson.title,
        to: `/lesson/${nextLesson.id}`,
      };
    }
    return { icon: Sparkles, title: c.startTraining, subtitle: c.startTrainingSub, to: '/training' };
  }, [todayProgress.checkedIn, todayProgress.reflected, nextLesson, c]);

  /* ── Quotes — demoted to a small footer card, still swipeable ── */
  const [quotesList] = useState<Quote[]>(() => Array.from({ length: 5 }, () => getRandomQuote()));
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quote = quotesList[quoteIndex];

  const goToQuote = useCallback(
    (dir: 'prev' | 'next') => {
      setQuoteIndex((prev) => {
        if (dir === 'next') return (prev + 1) % quotesList.length;
        return prev === 0 ? quotesList.length - 1 : prev - 1;
      });
    },
    [quotesList.length]
  );

  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 40) goToQuote(diff > 0 ? 'next' : 'prev');
    },
    [goToQuote]
  );

  const animatedXP = useCountUp(totalXP, 800);
  const animatedLessons = useCountUp(lessonsCompleted, 800);
  const animatedStreak = useCountUp(currentStreak, 800);

  /* ── Reward layer ──
     XPToast and ConfettiCelebration were both finished and never rendered
     anywhere in the app. Every XP award on this screen now has a visible,
     physical response. */
  const [toast, setToast] = useState<{ amount: number; message: string } | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const dismissToast = useCallback(() => setToast(null), []);
  const stopCelebrating = useCallback(() => setCelebrate(false), []);

  const handleDailyChallengeComplete = useCallback(() => {
    // Streak advances only if today has not already been counted.
    const streakAfter =
      progress.lastActiveDate === todayKey() ? currentStreak : currentStreak + 1;
    const milestone = STREAK_MILESTONES.includes(streakAfter);

    haptic(milestone ? 'heavy' : 'medium');
    if (milestone) window.setTimeout(() => haptic('heavy'), 120);

    setCelebrate(true);
    setToast({
      amount: 20,
      message: milestone ? `${streakAfter} ${c.streakMilestone}` : c.challengeDone,
    });
    progress.completeDailyChallenge();
  }, [progress, currentStreak, c]);

  const handleDoseComplete = useCallback(
    (xp: number) => {
      setToast({ amount: xp, message: c.doseDone });
    },
    [c]
  );

  return (
    <div className="min-h-full">
      <XPToast
        visible={!!toast}
        amount={toast?.amount ?? 0}
        message={toast?.message}
        onDismiss={dismissToast}
      />
      <ConfettiCelebration trigger={celebrate} onComplete={stopCelebrating} />

      {/* ══ Hero ══ */}
      <header className={`${heroWash} relative overflow-hidden rounded-b-feature border-b border-line px-5 pb-6 pt-7`}>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-overline text-ink-2">{greeting}</p>
              <h1 className="mt-1 truncate text-display text-ink">{userName}</h1>
            </div>

            {/* Streak flame */}
            <div
              className={`relative flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 ${
                currentStreak > 0
                  ? 'bg-coral text-on-coral'
                  : 'border border-line bg-surface text-ink-2'
              }`}
            >
              <Flame size={18} aria-hidden="true" />
              {currentStreak > 0 ? (
                <span className="text-button tabular-nums">{animatedStreak}</span>
              ) : (
                <span className="text-caption">{t('start')}</span>
              )}
              <span className="sr-only">{c.dayStreak}</span>
            </div>
          </div>

          {!isAuthenticated && (
            <button
              onClick={() => navigate('/auth')}
              className="mt-3 inline-flex items-center gap-1 text-caption text-teal-strong underline underline-offset-4"
            >
              {c.signIn}
              <ChevronRight size={14} aria-hidden="true" />
            </button>
          )}

          {/* Today's single most important action */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              haptic('light');
              navigate(primaryAction.to);
            }}
            className="surface-raised mt-5 flex w-full items-center gap-3 p-4 text-left"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coral text-on-coral">
              <primaryAction.icon size={22} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-overline text-coral-strong">{c.nowLabel}</span>
              <span className="block text-h4 text-ink">{primaryAction.title}</span>
              <span className="line-clamp-2 text-caption text-ink-2">
                {primaryAction.subtitle}
              </span>
            </span>
            <ArrowRight size={20} className="shrink-0 text-ink-3" aria-hidden="true" />
          </motion.button>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <StatTile
              icon={Zap}
              value={animatedXP}
              label={t('homeTotalXP')}
              tone="coral"
              isZero={totalXP === 0}
            />
            <StatTile
              icon={BookOpen}
              value={animatedLessons}
              label={t('homeLessonsLabel')}
              tone="teal"
              isZero={lessonsCompleted === 0}
            />
            <StatTile
              icon={Flame}
              value={animatedStreak}
              label={t('homeStreakLabel')}
              tone="gold"
              isZero={currentStreak === 0}
            />
          </div>
        </motion.div>
      </header>

      {/* ══ Feed ══ */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-7 px-5 pt-7"
      >
        {/* ── Cheat sheets: the screen sellers need mid-sale ── */}
        <motion.section variants={itemVariants}>
          <SectionHeading title={c.onTheFloor} />
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/cheat-sheets')}
            className="surface-feature feature-coral flex w-full items-center gap-4 p-5 text-left"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coral text-on-coral">
              <FileText size={24} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-h4 text-ink">{c.cheatSheets}</span>
              <span className="block text-caption text-ink-2">{c.cheatSheetsSub}</span>
            </span>
            <ArrowRight size={20} className="shrink-0 text-coral-strong" aria-hidden="true" />
          </motion.button>

          <div className="mt-3 grid grid-cols-3 gap-3">
            <TileLink
              icon={Trophy}
              label={c.leaderboard}
              tone="gold"
              onClick={() => navigate('/leaderboard')}
            />
            <TileLink
              icon={BrainCircuit}
              label={t('homeQuickAccessQuizzes')}
              tone="teal"
              onClick={() => navigate('/quizzes')}
            />
            <TileLink
              icon={Dumbbell}
              label={t('homeQuickAccessExercises')}
              tone="violet"
              onClick={() => navigate('/exercises')}
            />
          </div>
        </motion.section>

        {/* ── Daily challenge — the achievement that matters today.
             The card carries its own heading, so there is no section title. ── */}
        <motion.section variants={itemVariants}>
          <DailyChallengeCard
            isCompleted={progress.isDailyChallengeCompleted()}
            onComplete={handleDailyChallengeComplete}
          />
        </motion.section>

        {/* ── Daily dose ── */}
        <motion.section variants={itemVariants}>
          <DailyDose onOpen={() => setShowDoseModal(true)} />
          <DailyDoseModal
            isOpen={showDoseModal}
            onClose={() => setShowDoseModal(false)}
            onCompleted={handleDoseComplete}
          />
        </motion.section>

        {/* ── Continue learning ── */}
        {continueLessons.length > 0 && (
          <motion.section variants={itemVariants}>
            <SectionHeading title={t('homeContinueLearning')} />
            <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
              {continueLessons.map((lesson) => {
                if (!lesson) return null;
                const cat = getCategory(lesson.categoryId);
                const isDone = lessonProgress[lesson.id];
                const LessonIcon = getIcon(lesson.icon);
                return (
                  <motion.button
                    key={lesson.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      saveContinueLearning(lesson.id);
                      navigate(`/lesson/${lesson.id}`);
                    }}
                    className="surface-raised w-60 flex-shrink-0 snap-start p-4 text-left"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-chip bg-teal-tint">
                        <LessonIcon size={15} className="text-teal-strong" aria-hidden="true" />
                      </span>
                      <span className="truncate text-caption text-ink-3">{cat?.title}</span>
                    </div>
                    <h3 className="truncate text-h4 text-ink">{lesson.title}</h3>
                    <p className="mt-0.5 truncate text-caption text-ink-2">{lesson.subtitle}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-caption text-ink-2">
                        {lesson.duration}
                      </span>
                      {isDone && (
                        <span className="flex items-center gap-1 text-caption text-success">
                          <Award size={14} aria-hidden="true" /> {t('homeDone')}
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* ── Quick practice ── */}
        <motion.section variants={itemVariants}>
          <SectionHeading title={c.quickPractice} hint={c.quickPracticeSub} />
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
            <PracticeCard
              icon={Layers}
              title={c.flashcardSprint}
              subtitle={c.flashcardSprintSub}
              tone="teal"
              onClick={() => navigate('/flashcards?mode=quick')}
            />
            <PracticeCard
              icon={Target}
              title={c.scenarioDrill}
              subtitle={c.scenarioDrillSub}
              tone="coral"
              onClick={() => navigate('/training')}
            />
            <PracticeCard
              icon={TrendingUp}
              title={c.priceLadder}
              subtitle={c.priceLadderSub}
              tone="violet"
              onClick={() => navigate('/quizzes')}
            />
          </div>
        </motion.section>

        {/* ── First-day track ── */}
        <motion.section variants={itemVariants}>
          <button
            onClick={() => navigate('/first-day')}
            className="surface-flat flex w-full items-center gap-3 p-4 text-left"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-chip bg-teal-tint">
              <Sparkles className="h-5 w-5 text-teal-strong" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-h4 text-ink">{c.newHere}</span>
              <span className="block text-caption text-ink-2">{c.newHereSub}</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-ink-3" aria-hidden="true" />
          </button>
        </motion.section>

        {/* ── Motivational quote — demoted from hero to footer ── */}
        <motion.section variants={itemVariants} className="pb-2">
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="surface-flat relative select-none overflow-hidden p-5"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <QuoteIcon
              size={56}
              className="pointer-events-none absolute -right-2 -top-2 text-teal/10"
              aria-hidden="true"
            />
            <p className="relative z-10 font-brand text-h4 italic text-ink">
              &ldquo;{language === 'es' ? quote.textEs : quote.text}&rdquo;
            </p>
            <p className="relative z-10 mt-2 text-caption text-ink-2">&mdash; {quote.author}</p>

            <div className="relative z-10 mt-4 flex items-center justify-center gap-2">
              {quotesList.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setQuoteIndex(i)}
                  aria-label={`${i + 1}/${quotesList.length}`}
                  className="flex h-touch w-6 items-center justify-center"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === quoteIndex ? 'w-5 bg-teal' : 'w-1.5 bg-line-strong'
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
}

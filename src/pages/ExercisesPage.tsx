import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ChevronLeft, CheckCircle, Zap, MessageCircle, Puzzle,
  TrendingUp, Dumbbell, Trophy, RefreshCw, ListOrdered, X,
} from 'lucide-react';
import {
  generalExercises,
  type RolePlayContent, type PriceDrillContent, type MatchingContent, type OrderingContent,
} from '../data/generalExercises';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocationText } from '../utils/locationText';
import { useProgress } from '../hooks/useProgress';
import { haptic } from '../utils/haptics';
import XPToast from '../components/XPToast';
import ConfettiCelebration from '../components/ConfettiCelebration';

/* canvas-confetti needs literal colours; these mirror --gold/--teal/--coral. */
const CONFETTI_GOLD = ['#E3B54A', '#F0CB72', '#0ABAB5', '#FF6A7A'];

/* ─── icon map ─── */
const typeIcon: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  roleplay: MessageCircle,
  pricedrill: TrendingUp,
  matching: Puzzle,
  ordering: ListOrdered,
  scenario: MessageCircle,
};

function getTypeLabel(type: string, lang: string): string {
  const labels: Record<string, { en: string; es: string }> = {
    roleplay: { en: 'Role-Play', es: 'Juego de Roles' },
    pricedrill: { en: 'Price Drill', es: 'Ejercicio de Precio' },
    matching: { en: 'Matching', es: 'Emparejamiento' },
    ordering: { en: 'Ordering', es: 'Ordenamiento' },
    scenario: { en: 'Scenario', es: 'Escenario' },
  };
  return labels[type]?.[lang as 'en' | 'es'] || labels[type]?.en || type;
}

const TIME_LIMITS: Record<string, number> = {
  roleplay: 60,
  scenario: 60,
  pricedrill: 45,
  matching: 90,
  ordering: 60,
};

/* Strings with no key in src/data/translations.ts yet — see report. */
const COPY = {
  practice: { en: 'PRACTICE', es: 'PRÁCTICA' },
  practiceSub: {
    en: 'Sharpen your skills with real scenarios',
    es: 'Afina tus habilidades con escenarios reales',
  },
  xpEarned: { en: 'XP earned', es: 'XP ganados' },
  bestScore: { en: 'Best score', es: 'Mejor nota' },
  avgScore: { en: 'avg score', es: 'nota media' },
  timeRemaining: { en: 'Time remaining', es: 'Tiempo restante' },
  hurry: { en: 'Hurry!', es: '¡Rápido!' },
  timeUpSoon: { en: 'Scoring what you have soon', es: 'Se puntuará lo que tengas' },
  timeUp: { en: "Time's up", es: 'Se acabó el tiempo' },
  timeUpNoAnswer: {
    en: 'No answer in time, so no XP for this one. The best response is highlighted below.',
    es: 'Sin respuesta a tiempo, así que no hay XP. La mejor respuesta está resaltada abajo.',
  },
  timeUpPartial: {
    en: 'Scored on what you completed before the timer ran out.',
    es: 'Puntuado según lo que completaste antes de que acabara el tiempo.',
  },
  chooseResponse: { en: 'CHOOSE YOUR RESPONSE:', es: 'ELIGE TU RESPUESTA:' },
  excellent: { en: 'Excellent!', es: '¡Excelente!' },
  okay: { en: 'Okay, but could be better', es: 'Bien, pero podría ser mejor' },
  notBest: { en: 'Not the best approach', es: 'No es el mejor enfoque' },
  bestResponse: { en: 'Best response', es: 'Mejor respuesta' },
  product: { en: 'Product', es: 'Producto' },
  customerReaction: { en: 'Customer Reaction', es: 'Reacción del Cliente' },
  nextPriceStep: { en: 'WHAT IS YOUR NEXT PRICE STEP?', es: '¿CUÁL ES TU SIGUIENTE PASO DE PRECIO?' },
  correct: { en: 'Correct!', es: '¡Correcto!' },
  notQuite: { en: 'Not quite', es: 'Casi' },
  matchInstruction: {
    en: 'MATCH EACH TERM WITH ITS DEFINITION',
    es: 'EMPAREJA CADA TÉRMINO CON SU DEFINICIÓN',
  },
  matchHint: {
    en: 'Tap a term, then tap its definition.',
    es: 'Toca un término, luego toca su definición.',
  },
  terms: { en: 'Terms', es: 'Términos' },
  definitions: { en: 'Definitions', es: 'Definiciones' },
  matched: { en: 'matched', es: 'emparejados' },
  correctLabel: { en: 'correct', es: 'correctos' },
  checkAnswers: { en: 'Check Answers', es: 'Comprobar' },
  correctIs: { en: 'Correct:', es: 'Correcto:' },
  tapToUnpair: { en: 'Tap to unpair', es: 'Toca para deshacer' },
  orderInstruction: { en: 'TAP THE STEPS IN THE CORRECT ORDER', es: 'TOCA LOS PASOS EN EL ORDEN CORRECTO' },
  yourOrder: { en: 'Your order', es: 'Tu orden' },
  tapToRemove: { en: 'Tap a step to send it back', es: 'Toca un paso para devolverlo' },
  checkOrder: { en: 'Check Order', es: 'Comprobar Orden' },
  perfectOrder: { en: 'Perfect order!', es: '¡Orden perfecto!' },
  notQuiteOrder: { en: 'Not quite right', es: 'No del todo correcto' },
  correctOrderIs: { en: 'The correct order is:', es: 'El orden correcto es:' },
  inPlace: { en: 'in the right place', es: 'en el lugar correcto' },
  speedBonus: { en: 'Speed bonus! +20% XP', es: '¡Bonus por velocidad! +20% XP' },
  finish: { en: 'Finish', es: 'Terminar' },
  exerciseComplete: { en: 'Exercise Complete!', es: '¡Ejercicio Completado!' },
  practiceAgain: { en: 'Practice Again', es: 'Practicar de Nuevo' },
  backToHome: { en: 'Back to Home', es: 'Volver al Inicio' },
  xpBase: { en: 'base', es: 'base' },
  xpBonus: { en: 'speed bonus', es: 'bonus de velocidad' },
  xpSaved: { en: 'saved to your profile', es: 'guardado en tu perfil' },
  xpNone: {
    en: 'No XP this time. Retry — XP is only awarded for correct answers.',
    es: 'Sin XP esta vez. Reinténtalo — el XP solo se gana con respuestas correctas.',
  },
} as const;

type CopyKey = keyof typeof COPY;
function useCopy() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  return {
    isEs,
    tx: (key: CopyKey) => (isEs ? COPY[key].es : COPY[key].en),
  };
}

/* Content ships both {currency} and the older {{currency}} form. */
function useSub() {
  const { replacePlaceholders, currency, location } = useLocationText();
  return (text: string) =>
    replacePlaceholders(text ?? '')
      .replace(/\{\s*currency\s*\}/g, currency)
      .replace(/\{\s*(?:location|locationName)\s*\}/g, location);
}

/* ─── Scoring ───
   `base` is earned purely by being right. The speed bonus is a real bonus:
   it needs a positive base AND finishing inside half the clock. */
interface Award {
  /** 0-100 correctness, stored by useProgress as the exercise score. */
  percent: number;
  base: number;
  bonus: number;
  xp: number;
  fast: boolean;
  perfect: boolean;
}

function makeAward(percent: number, timeLeft: number, timeLimit: number, xpReward: number): Award {
  const pct = Math.max(0, Math.min(100, Math.round(percent)));
  const base = Math.round((pct / 100) * xpReward);
  const fast = base > 0 && timeLeft > timeLimit / 2;
  const bonus = fast ? Math.round(base * 0.2) : 0;
  return { percent: pct, base, bonus, xp: base + bonus, fast, perfect: pct === 100 };
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ─── Timer Hook ─── */
function useExerciseTimer(durationSeconds: number, onTimeUp: () => void, paused = false) {
  /* Each attempt mounts a fresh view (keyed by exercise + attempt), so the
     initial value is always right — no resync-on-prop-change effect needed. */
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const onTimeUpRef = useRef(onTimeUp);
  const firedRef = useRef(false);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  });

  useEffect(() => {
    if (paused) return;
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
    if (!firedRef.current) {
      firedRef.current = true;
      onTimeUpRef.current();
    }
  }, [timeLeft, paused]);

  return timeLeft;
}

/* ─── Timer Display ─── */
function TimerDisplay({ timeLeft, totalSeconds, paused }: {
  timeLeft: number; totalSeconds: number; paused?: boolean;
}) {
  const { tx } = useCopy();
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - Math.max(0, timeLeft) / totalSeconds);
  const isLow = timeLeft <= 10 && !paused;

  return (
    <div className="flex items-center gap-3 px-4 mt-3" role="timer" aria-live="off">
      <div className="relative w-11 h-11 shrink-0">
        <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
          <circle cx="22" cy="22" r={radius} fill="none" className="stroke-line" strokeWidth="3" />
          <motion.circle
            cx="22" cy="22" r={radius} fill="none"
            className={isLow ? 'stroke-danger' : 'stroke-teal'}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashoffset }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-caption font-bold ${isLow ? 'text-danger' : 'text-ink'}`}>
            {Math.max(0, timeLeft)}
          </span>
        </div>
      </div>
      <div>
        <p className={`text-caption ${isLow ? 'text-danger font-semibold' : 'text-ink-2'}`}>
          {isLow ? tx('hurry') : tx('timeRemaining')}
        </p>
        {isLow && <p className="text-caption text-danger">{tx('timeUpSoon')}</p>}
      </div>
    </div>
  );
}

/* ─── Shared bits ─── */
function ExerciseHeader({ title, onBack, backLabel }: { title: string; onBack: () => void; backLabel: string }) {
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-2">
      <button onClick={onBack} className="btn-icon shrink-0" aria-label={backLabel}>
        <ChevronLeft size={22} />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="text-h4 text-ink truncate">{title}</h1>
      </div>
    </div>
  );
}

function SpeedBonusBanner({ show }: { show: boolean }) {
  const { tx } = useCopy();
  if (!show) return null;
  return (
    <p className="text-caption font-semibold text-gold-strong text-center">{tx('speedBonus')}</p>
  );
}

type View = 'hub' | 'exercise' | 'results';
type Tab = 'all' | 'roleplay' | 'pricedrill' | 'matching' | 'ordering';

export default function ExercisesPage() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { tx } = useCopy();
  const sub = useSub();
  const { recordQuizScore, getQuizScore } = useProgress();
  const [view, setView] = useState<View>('hub');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [result, setResult] = useState<Award | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  /* Bumped on every start so each attempt gets a fresh shuffle + timer. */
  const [attempt, setAttempt] = useState(0);

  const exercise = generalExercises.find((e) => e.id === activeExerciseId) ?? null;

  const startExercise = useCallback((id: string) => {
    setActiveExerciseId(id);
    setResult(null);
    setCelebrate(false);
    setToastVisible(false);
    setAttempt((a) => a + 1);
    setView('exercise');
  }, []);

  const finishExercise = useCallback(
    (award: Award) => {
      if (!activeExerciseId) return;
      /* useProgress has no exercise-specific recorder; recordQuizScore is the
         one API that persists a score + XP award (and logs it to the feed). */
      recordQuizScore(activeExerciseId, award.percent, award.xp);
      setResult(award);
      setView('results');
      if (award.xp > 0) {
        setToastVisible(true);
        setCelebrate(true);
        haptic(award.fast ? 'heavy' : 'medium');
      } else {
        haptic('light');
      }
    },
    [activeExerciseId, recordQuizScore]
  );

  const resetAll = useCallback(() => {
    setView('hub');
    setResult(null);
    setCelebrate(false);
    setToastVisible(false);
    setActiveExerciseId(null);
  }, []);

  const dismissToast = useCallback(() => setToastVisible(false), []);
  const stopCelebrating = useCallback(() => setCelebrate(false), []);

  const isFullMarks = !!result && result.perfect;
  useEffect(() => {
    if (view !== 'results' || !isFullMarks) return;
    const id = window.setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 100,
        startVelocity: 45,
        gravity: 0.9,
        ticks: 140,
        origin: { y: 0.7 },
        colors: CONFETTI_GOLD,
      });
    }, 550);
    return () => window.clearTimeout(id);
  }, [view, isFullMarks]);

  const filtered = activeTab === 'all'
    ? generalExercises
    : generalExercises.filter((e) => e.type === activeTab);

  const exerciseTitle = exercise
    ? sub((language === 'es' && exercise.titleEs) ? exercise.titleEs : exercise.title)
    : '';
  const timeLimit = TIME_LIMITS[exercise?.type ?? ''] ?? 60;

  /* ─── Hub ─── */
  if (view === 'hub') {
    /* getQuizScore returns the best score as a percentage. */
    const doneScores = generalExercises
      .map((e) => getQuizScore(e.id))
      .filter((v): v is number => v !== undefined);
    const doneCount = doneScores.length;
    const avgScore = doneCount
      ? Math.round(doneScores.reduce((a, b) => a + b, 0) / doneCount)
      : 0;

    return (
      <div className="min-h-full bg-background pb-8">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button onClick={() => navigate('/home')} className="btn-icon" aria-label={t('back')}>
            <ChevronLeft size={22} />
          </button>
          <h1 className="text-h3 text-ink">{t('exercisesTitle')}</h1>
          <div className="w-touch" aria-hidden="true" />
        </div>

        <div className="px-4 mt-3">
          <div className="flex items-center gap-2">
            <Dumbbell size={22} className="text-teal-strong" aria-hidden="true" />
            <h2 className="text-h1 text-ink">{tx('practice')}</h2>
          </div>
          <p className="text-body text-ink-2 mt-1">{tx('practiceSub')}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-2 px-4 mt-4">
          <div className="flex items-center gap-2 surface-flat px-4 py-2">
            <CheckCircle size={16} className="text-success" aria-hidden="true" />
            <span className="text-caption text-ink">{doneCount} {t('done')}</span>
          </div>
          <div className="flex items-center gap-2 surface-flat px-4 py-2">
            <Zap size={16} className="text-gold-strong" aria-hidden="true" />
            <span className="text-caption text-ink">{avgScore}% {tx('avgScore')}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-4 mt-5 gap-2 overflow-x-auto no-scrollbar">
          {(['all', 'roleplay', 'pricedrill', 'matching', 'ordering'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
              className={`shrink-0 min-h-touch px-4 rounded-full text-caption font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-teal text-on-teal'
                  : 'bg-surface-sunken text-ink-2 border border-line'
              }`}
            >
              {tab === 'all' ? t('cheatSheetsAll') : getTypeLabel(tab, language)}
            </button>
          ))}
        </div>

        {/* Exercise Cards */}
        <div className="px-4 mt-4 space-y-3">
          {filtered.map((ex, i) => {
            const Icon = typeIcon[ex.type] ?? Puzzle;
            const best = getQuizScore(ex.id);
            const isDone = best !== undefined;
            return (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 8) * 0.04 }}
                className="surface-raised p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-chip bg-teal-tint flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-teal-strong" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-h4 text-ink">
                      {sub((language === 'es' && ex.titleEs) ? ex.titleEs : ex.title)}
                    </h3>
                    <p className="text-body-small text-ink-2 mt-0.5">
                      {sub((language === 'es' && ex.descriptionEs) ? ex.descriptionEs : ex.description)}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-caption text-teal-strong bg-teal-tint px-2 py-0.5 rounded-full">
                        {getTypeLabel(ex.type, language)}
                      </span>
                      <span className="text-caption text-gold-strong bg-gold-tint px-2 py-0.5 rounded-full">
                        +{ex.xpReward} XP
                      </span>
                    </div>
                    {isDone && (
                      <p className="text-caption text-teal-strong mt-2" data-testid={`best-${ex.id}`}>
                        {tx('bestScore')} {best}%
                      </p>
                    )}
                  </div>
                  {isDone && <CheckCircle size={18} className="text-success shrink-0" aria-hidden="true" />}
                </div>
                <button onClick={() => startExercise(ex.id)} className="btn-primary w-full mt-3">
                  <span className="text-button">{isDone ? t('retry') : t('start')}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
        <div className="h-6" />
      </div>
    );
  }

  /* ─── Exercise View ─── */
  if (view === 'exercise' && exercise) {
    const attemptKey = `${exercise.id}-${attempt}`;
    const shared = {
      title: exerciseTitle,
      xpReward: exercise.xpReward,
      onFinish: finishExercise,
      onBack: resetAll,
      timeLimit,
      backLabel: t('back'),
    };
    if (exercise.type === 'roleplay' || exercise.type === 'scenario') {
      return <RolePlayView key={attemptKey} {...shared} content={exercise.content as RolePlayContent} />;
    }
    if (exercise.type === 'pricedrill') {
      return <PriceDrillView key={attemptKey} {...shared} content={exercise.content as PriceDrillContent} />;
    }
    if (exercise.type === 'matching') {
      return <MatchingView key={attemptKey} {...shared} content={exercise.content as MatchingContent} />;
    }
    if (exercise.type === 'ordering') {
      return <OrderingView key={attemptKey} {...shared} content={exercise.content as OrderingContent} />;
    }
  }

  /* ─── Results ─── */
  if (view === 'results' && result) {
    return (
      <div className="min-h-full bg-background flex flex-col items-center px-4 pt-12 pb-8">
        <XPToast
          visible={toastVisible}
          amount={result.xp}
          message={tx('xpSaved')}
          onDismiss={dismissToast}
        />
        <ConfettiCelebration trigger={celebrate} onComplete={stopCelebrating} />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center text-center"
        >
          <Trophy size={48} className={result.xp > 0 ? 'text-gold-strong' : 'text-ink-3'} aria-hidden="true" />
          <h2 className="text-h1 text-ink mt-4">{tx('exerciseComplete')}</h2>
          <p className="text-h2 text-gold-strong mt-3" data-testid="exercise-xp-earned">
            +{result.xp} XP
          </p>
          <p className="text-caption text-ink-3 mt-1">
            {result.bonus > 0
              ? `${result.base} ${tx('xpBase')} + ${result.bonus} ${tx('xpBonus')} · ${tx('xpSaved')}`
              : result.xp > 0
                ? `${tx('xpEarned')} · ${tx('xpSaved')}`
                : tx('xpNone')}
          </p>
        </motion.div>

        <div className="w-full flex flex-col gap-3 mt-8">
          <button
            onClick={() => activeExerciseId && startExercise(activeExerciseId)}
            className="btn-primary w-full h-14"
          >
            <RefreshCw size={18} aria-hidden="true" />
            <span className="text-button">{tx('practiceAgain')}</span>
          </button>
          <button onClick={resetAll} className="btn-secondary w-full h-12">
            <span className="text-button">{t('exercisesTitle')}</span>
          </button>
          <button onClick={() => navigate('/home')} className="btn-quiet w-full h-12">
            <span className="text-button">{tx('backToHome')}</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}

interface ViewProps {
  title: string;
  xpReward: number;
  onFinish: (award: Award) => void;
  onBack: () => void;
  timeLimit: number;
  backLabel: string;
}

/* ═══════════════════════ RolePlayView ═══════════════════════ */
function RolePlayView({ content, title, xpReward, onFinish, onBack, timeLimit, backLabel }: ViewProps & {
  content: RolePlayContent;
}) {
  const { isEs, tx } = useCopy();
  const sub = useSub();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const answered = selectedIdx !== null;
  const finished = answered || timedOut;

  /* Timing out is not an answer: it scores nothing. */
  const handleTimeUp = useCallback(() => setTimedOut(true), []);
  const timeLeft = useExerciseTimer(timeLimit, handleTimeUp, finished);

  const bestIdx = useMemo(
    () => content.responses.reduce((best, r, i) => (r.score > content.responses[best].score ? i : best), 0),
    [content.responses]
  );

  const responseScore = answered ? content.responses[selectedIdx]?.score ?? 0 : 0;
  const award = makeAward(responseScore, timeLeft, timeLimit, xpReward);

  const handleSelect = (i: number) => {
    if (finished) return;
    setSelectedIdx(i);
    haptic(content.responses[i].score >= 80 ? 'light' : 'medium');
  };

  return (
    <div className="min-h-full bg-background pb-8">
      <ExerciseHeader title={title} onBack={onBack} backLabel={backLabel} />
      <TimerDisplay timeLeft={timeLeft} totalSeconds={timeLimit} paused={finished} />

      {/* Customer Profile */}
      <div className="px-4 mt-3">
        <div className="surface-feature p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-tint flex items-center justify-center shrink-0">
              <MessageCircle size={22} className="text-teal-strong" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2 className="text-h4 text-ink">{content.customerName}</h2>
              <p className="text-caption text-ink-2">
                {sub(isEs && content.customerProfileEs ? content.customerProfileEs : content.customerProfile)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario */}
      <div className="px-4 mt-4">
        <div className="bg-teal-tint border border-teal/30 rounded-card p-4">
          <p className="text-body text-ink italic leading-relaxed">
            &ldquo;{sub(isEs && content.scenarioEs ? content.scenarioEs : content.scenario)}&rdquo;
          </p>
        </div>
      </div>

      {timedOut && !answered && (
        <div className="px-4 mt-4">
          <div className="bg-warning-tint border border-warning/40 rounded-card p-4">
            <p className="text-caption font-semibold text-warning">{tx('timeUp')}</p>
            <p className="text-body-small text-ink-2 mt-1">{tx('timeUpNoAnswer')}</p>
          </div>
        </div>
      )}

      {/* Responses */}
      <div className="px-4 mt-5 space-y-2.5">
        <p className="text-overline text-ink-2 mb-1">{tx('chooseResponse')}</p>
        {content.responses.map((r, i) => {
          const isSelected = selectedIdx === i;
          const isBest = i === bestIdx;
          let btnClass = 'bg-surface border-line';
          if (finished) {
            if (r.score >= 80) btnClass = 'bg-success-tint border-success';
            else if (r.score >= 40) btnClass = 'bg-warning-tint border-warning';
            else btnClass = 'bg-danger-tint border-danger';
            if (!isSelected && !(timedOut && !answered && isBest)) btnClass += ' opacity-70';
          }

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleSelect(i)}
              disabled={finished}
              className={`w-full min-h-touch text-left p-4 rounded-card border transition-all ${btnClass}`}
            >
              <p className="text-body-small text-ink">
                {sub(isEs && r.textEs ? r.textEs : r.text)}
              </p>
              {finished && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-line"
                >
                  <p className={`text-caption font-semibold ${
                    r.score >= 80 ? 'text-success' : r.score >= 40 ? 'text-warning' : 'text-danger'
                  }`}>
                    {r.score >= 80 ? tx('excellent') : r.score >= 40 ? tx('okay') : tx('notBest')}
                    {timedOut && !answered && isBest ? ` · ${tx('bestResponse')}` : ''}
                  </p>
                  <p className="text-caption text-ink-2 mt-1">
                    {sub(isEs && r.feedbackEs ? r.feedbackEs : r.feedback)}
                  </p>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {finished && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 mt-6 space-y-2">
          <SpeedBonusBanner show={award.fast} />
          <button onClick={() => onFinish(award)} className="btn-primary w-full h-14">
            <span className="text-button">{tx('finish')} · +{award.xp} XP</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}

/* ═══════════════════════ PriceDrillView ═══════════════════════ */
function PriceDrillView({ content, title, xpReward, onFinish, onBack, timeLimit, backLabel }: ViewProps & {
  content: PriceDrillContent;
}) {
  const { isEs, tx } = useCopy();
  const sub = useSub();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const answered = selectedIdx !== null;
  const finished = answered || timedOut;
  const correctOption = content.options.find((o) => o.correct);

  const handleTimeUp = useCallback(() => setTimedOut(true), []);
  const timeLeft = useExerciseTimer(timeLimit, handleTimeUp, finished);

  /* XP for correctness only — a wrong answer or a timeout earns nothing. */
  const gotItRight = answered && !!content.options[selectedIdx]?.correct;
  const award = makeAward(gotItRight ? 100 : 0, timeLeft, timeLimit, xpReward);

  const handleSelect = (i: number) => {
    if (finished) return;
    setSelectedIdx(i);
    if (content.options[i]?.correct) {
      haptic('light');
    } else {
      haptic('medium');
      window.setTimeout(() => haptic('medium'), 110);
    }
  };

  return (
    <div className="min-h-full bg-background pb-8">
      <ExerciseHeader title={title} onBack={onBack} backLabel={backLabel} />
      <TimerDisplay timeLeft={timeLeft} totalSeconds={timeLimit} paused={finished} />

      <div className="px-4 mt-4">
        <div className="surface-flat p-5 text-center">
          <p className="text-caption text-ink-2">{tx('product')}</p>
          <p className="text-h3 text-ink mt-1">
            {sub(isEs && content.productEs ? content.productEs : content.product)}
          </p>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-teal-tint border border-teal/30 rounded-card p-4">
          <p className="text-caption text-ink-2 mb-1">{tx('customerReaction')}</p>
          <p className="text-body text-ink italic">
            &ldquo;{sub(isEs && content.customerReactionEs ? content.customerReactionEs : content.customerReaction)}&rdquo;
          </p>
        </div>
      </div>

      <div className="px-4 mt-5 space-y-2.5">
        <p className="text-overline text-ink-2 mb-1">{tx('nextPriceStep')}</p>
        {content.options.map((opt, i) => {
          const isSel = selectedIdx === i;
          let cls = 'bg-surface border-line';
          if (finished) {
            if (opt.correct) cls = 'bg-success-tint border-success';
            else if (isSel) cls = 'bg-danger-tint border-danger';
            else cls = 'bg-surface border-line opacity-60';
          }
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => handleSelect(i)}
              disabled={finished}
              className={`w-full min-h-touch text-left p-4 rounded-card border transition-all ${cls}`}
            >
              <p className="text-body-small text-ink">{sub(isEs && opt.textEs ? opt.textEs : opt.text)}</p>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {finished && correctOption && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-4 mt-4">
            <div className={`p-4 rounded-card border ${
              gotItRight ? 'bg-success-tint border-success/40' : 'bg-warning-tint border-warning/40'
            }`}>
              <p className={`text-caption font-semibold ${gotItRight ? 'text-success' : 'text-warning'}`}>
                {gotItRight ? tx('correct') : timedOut && !answered ? tx('timeUp') : tx('notQuite')}
              </p>
              <p className="text-body-small text-ink-2 mt-1">
                {sub(isEs && correctOption.explanationEs ? correctOption.explanationEs : correctOption.explanation)}
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <SpeedBonusBanner show={award.fast} />
              <button onClick={() => onFinish(award)} className="btn-primary w-full h-14">
                <span className="text-button">{tx('finish')} · +{award.xp} XP</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════ MatchingView ═══════════════════════ */
function MatchingView({ content, title, xpReward, onFinish, onBack, timeLimit, backLabel }: ViewProps & {
  content: MatchingContent;
}) {
  const { isEs, tx } = useCopy();
  const sub = useSub();
  const pairs = content.pairs;

  /* Definitions are shown in a shuffled column; `defOrder[slot]` is the index
     of the pair whose definition sits in that slot. A term is matched to a
     definition by that pair index, so term i is correct when matches[i] === i. */
  const [defOrder] = useState<number[]>(() => shuffled(pairs.map((_, i) => i)));
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  /* No auto-filling: the timer grades exactly what the seller completed. */
  const handleTimeUp = useCallback(() => {
    setTimedOut(true);
    setRevealed(true);
    setSelectedTerm(null);
  }, []);
  const timeLeft = useExerciseTimer(timeLimit, handleTimeUp, revealed);

  const matchedCount = Object.keys(matches).length;
  const correctCount = pairs.reduce((n, _p, i) => (matches[i] === i ? n + 1 : n), 0);
  const allMatched = matchedCount === pairs.length;
  const award = makeAward((correctCount / pairs.length) * 100, timeLeft, timeLimit, xpReward);

  const letterFor = (pairIdx: number) => String.fromCharCode(65 + defOrder.indexOf(pairIdx));
  const usedBy = (pairIdx: number) =>
    Object.entries(matches).find(([, defIdx]) => defIdx === pairIdx)?.[0];

  const tapTerm = (i: number) => {
    if (revealed) return;
    haptic('light');
    if (matches[i] !== undefined) {
      setMatches((m) => {
        const next = { ...m };
        delete next[i];
        return next;
      });
      setSelectedTerm(i);
      return;
    }
    setSelectedTerm((prev) => (prev === i ? null : i));
  };

  const tapDefinition = (pairIdx: number) => {
    if (revealed) return;
    if (selectedTerm === null) {
      haptic('medium');
      return;
    }
    haptic('light');
    setMatches((m) => {
      const next = { ...m };
      const owner = Object.keys(next).find((k) => next[Number(k)] === pairIdx);
      if (owner !== undefined) delete next[Number(owner)];
      next[selectedTerm] = pairIdx;
      return next;
    });
    setSelectedTerm(null);
  };

  const check = () => {
    setRevealed(true);
    setSelectedTerm(null);
    haptic(correctCount === pairs.length ? 'heavy' : 'medium');
  };

  const termText = (i: number) => sub(isEs && pairs[i].termEs ? pairs[i].termEs : pairs[i].term);
  const defText = (i: number) => sub(isEs && pairs[i].definitionEs ? pairs[i].definitionEs : pairs[i].definition);

  return (
    <div className="min-h-full bg-background pb-8">
      <ExerciseHeader title={title} onBack={onBack} backLabel={backLabel} />
      <TimerDisplay timeLeft={timeLeft} totalSeconds={timeLimit} paused={revealed} />

      <div className="px-4 mt-3">
        <p className="text-overline text-ink-2">{tx('matchInstruction')}</p>
        <p className="text-caption text-ink-2 mt-1">
          {revealed
            ? `${correctCount} / ${pairs.length} ${tx('correctLabel')}`
            : `${matchedCount} / ${pairs.length} ${tx('matched')} · ${tx('matchHint')}`}
        </p>
        {timedOut && (
          <p className="text-caption text-warning font-semibold mt-1">
            {tx('timeUp')} — {tx('timeUpPartial')}
          </p>
        )}
      </div>

      {/* ── Terms column ── */}
      <div className="px-4 mt-4">
        <p className="text-overline text-ink-3 mb-2">{tx('terms')}</p>
        <div className="space-y-2">
          {pairs.map((_pair, i) => {
            const matchedTo = matches[i];
            const isSelected = selectedTerm === i;
            const isRight = matchedTo === i;
            let cls = 'bg-surface border-line';
            if (revealed) {
              cls = isRight ? 'bg-success-tint border-success' : 'bg-danger-tint border-danger';
            } else if (isSelected) {
              cls = 'bg-teal-tint border-teal';
            } else if (matchedTo !== undefined) {
              cls = 'bg-surface-sunken border-line-strong';
            }
            return (
              <button
                key={i}
                onClick={() => tapTerm(i)}
                disabled={revealed}
                aria-pressed={isSelected}
                className={`w-full min-h-touch text-left p-3 rounded-card border transition-all flex items-center gap-3 ${cls}`}
              >
                <span
                  className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-caption font-bold ${
                    matchedTo !== undefined
                      ? revealed
                        ? isRight ? 'bg-success text-background' : 'bg-danger text-background'
                        : 'bg-teal text-on-teal'
                      : 'bg-surface-sunken text-ink-3 border border-line'
                  }`}
                  aria-hidden="true"
                >
                  {matchedTo !== undefined ? letterFor(matchedTo) : '?'}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-body-small font-semibold text-ink">{termText(i)}</span>
                  {revealed && !isRight && (
                    <span className="block text-caption text-ink-2 mt-1">
                      {tx('correctIs')} {letterFor(i)} — {defText(i)}
                    </span>
                  )}
                  {!revealed && matchedTo !== undefined && (
                    <span className="block text-caption text-ink-3 mt-0.5">{tx('tapToUnpair')}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Definitions column ── */}
      <div className="px-4 mt-6">
        <p className="text-overline text-ink-3 mb-2">{tx('definitions')}</p>
        <div className="space-y-2">
          {defOrder.map((pairIdx, slot) => {
            const owner = usedBy(pairIdx);
            const isUsed = owner !== undefined;
            const isRight = isUsed && Number(owner) === pairIdx;
            let cls = 'bg-surface border-line';
            if (revealed) {
              cls = isUsed
                ? isRight ? 'bg-success-tint border-success' : 'bg-danger-tint border-danger'
                : 'bg-surface border-line opacity-70';
            } else if (isUsed) {
              cls = 'bg-surface-sunken border-line-strong opacity-70';
            } else if (selectedTerm !== null) {
              cls = 'bg-surface border-teal';
            }
            return (
              <button
                key={pairIdx}
                onClick={() => tapDefinition(pairIdx)}
                disabled={revealed}
                className={`w-full min-h-touch text-left p-3 rounded-card border transition-all flex items-start gap-3 ${cls}`}
              >
                <span
                  className="w-8 h-8 shrink-0 rounded-full bg-surface-sunken text-ink-2 border border-line flex items-center justify-center text-caption font-bold"
                  aria-hidden="true"
                >
                  {String.fromCharCode(65 + slot)}
                </span>
                <span className="flex-1 min-w-0 text-body-small text-ink">{defText(pairIdx)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-6 space-y-2">
        {!revealed && (
          <button
            onClick={check}
            disabled={!allMatched}
            className={`w-full h-14 rounded-full inline-flex items-center justify-center transition-transform active:scale-[0.97] ${
              allMatched ? 'bg-coral text-on-coral font-semibold' : 'bg-surface-sunken text-ink-3 border border-line'
            }`}
          >
            <span className="text-button">{tx('checkAnswers')}</span>
          </button>
        )}
        {revealed && (
          <>
            <div className={`p-4 rounded-card border ${
              correctCount === pairs.length ? 'bg-success-tint border-success' : 'bg-warning-tint border-warning'
            }`}>
              <p className={`text-caption font-semibold ${
                correctCount === pairs.length ? 'text-success' : 'text-warning'
              }`}>
                {correctCount} / {pairs.length} {tx('correctLabel')}
              </p>
            </div>
            <SpeedBonusBanner show={award.fast} />
            <button onClick={() => onFinish(award)} className="btn-primary w-full h-14">
              <span className="text-button">{tx('finish')} · +{award.xp} XP</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════ OrderingView ═══════════════════════ */
interface OrderItem {
  text: string;
  textEs?: string;
  correctOrder: number; // 1-based, straight from the data
}

function OrderingView({ content, title, xpReward, onFinish, onBack, timeLimit, backLabel }: ViewProps & {
  content: OrderingContent;
}) {
  const { isEs, tx } = useCopy();
  const sub = useSub();
  const steps = content.steps;

  const [ordered, setOrdered] = useState<OrderItem[]>([]);
  const [remaining, setRemaining] = useState<OrderItem[]>(() =>
    shuffled(steps.map((s) => ({ text: s.text, textEs: s.textEs, correctOrder: s.correctOrder })))
  );
  const [revealed, setRevealed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  /* No auto-placing: whatever is unplaced when the clock runs out is wrong. */
  const handleTimeUp = useCallback(() => {
    setTimedOut(true);
    setRevealed(true);
  }, []);
  const timeLeft = useExerciseTimer(timeLimit, handleTimeUp, revealed);

  const allPlaced = remaining.length === 0;
  /* `correctOrder` in the data is 1-based; positions here are 0-based. */
  const correctCount = ordered.reduce((n, item, idx) => (item.correctOrder === idx + 1 ? n + 1 : n), 0);
  const allCorrect = allPlaced && correctCount === steps.length;
  const award = makeAward((correctCount / steps.length) * 100, timeLeft, timeLimit, xpReward);

  const itemText = (item: OrderItem) => sub(isEs && item.textEs ? item.textEs : item.text);

  const place = (item: OrderItem) => {
    if (revealed) return;
    haptic('light');
    setOrdered((o) => [...o, item]);
    setRemaining((r) => r.filter((ri) => ri.correctOrder !== item.correctOrder));
  };

  const unplace = (item: OrderItem) => {
    if (revealed) return;
    haptic('light');
    setOrdered((o) => o.filter((oi) => oi.correctOrder !== item.correctOrder));
    setRemaining((r) => [...r, item]);
  };

  const check = () => {
    setRevealed(true);
    haptic(allCorrect ? 'heavy' : 'medium');
  };

  const correctSequence = useMemo(
    () => [...steps].sort((a, b) => a.correctOrder - b.correctOrder),
    [steps]
  );

  return (
    <div className="min-h-full bg-background pb-8">
      <ExerciseHeader title={title} onBack={onBack} backLabel={backLabel} />
      <TimerDisplay timeLeft={timeLeft} totalSeconds={timeLimit} paused={revealed} />

      <div className="px-4 mt-3">
        <p className="text-overline text-ink-2">{tx('orderInstruction')}</p>
        <p className="text-body-small text-ink-2 mt-1">
          {sub(isEs && content.contextEs ? content.contextEs : content.context)}
        </p>
        {timedOut && (
          <p className="text-caption text-warning font-semibold mt-2">
            {tx('timeUp')} — {tx('timeUpPartial')}
          </p>
        )}
      </div>

      {/* Ordered so far */}
      {ordered.length > 0 && (
        <div className="px-4 mt-4">
          <p className="text-overline text-ink-3 mb-2">
            {tx('yourOrder')}
            {!revealed && <span className="normal-case tracking-normal font-normal"> · {tx('tapToRemove')}</span>}
          </p>
          <div className="space-y-2">
            {ordered.map((item, i) => {
              const isRight = item.correctOrder === i + 1;
              return (
                <button
                  key={`${item.correctOrder}-${i}`}
                  onClick={() => unplace(item)}
                  disabled={revealed}
                  className={`w-full min-h-touch text-left p-3 rounded-card border flex items-center gap-3 transition-all ${
                    revealed
                      ? isRight ? 'bg-success-tint border-success' : 'bg-danger-tint border-danger'
                      : 'bg-teal-tint border-teal/40'
                  }`}
                >
                  <span
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-caption font-bold ${
                      revealed
                        ? isRight ? 'bg-success text-background' : 'bg-danger text-background'
                        : 'bg-teal text-on-teal'
                    }`}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 text-body-small text-ink">{itemText(item)}</span>
                  {!revealed && <X size={16} className="text-ink-3 shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Remaining steps */}
      {remaining.length > 0 && (
        <div className="px-4 mt-4 space-y-2">
          {remaining.map((item, i) => (
            <motion.button
              key={`${item.correctOrder}-rem`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => place(item)}
              disabled={revealed}
              className="w-full min-h-touch text-left p-4 rounded-card border border-line bg-surface active:scale-[0.98] transition-transform"
            >
              <p className="text-body-small text-ink">{itemText(item)}</p>
            </motion.button>
          ))}
        </div>
      )}

      <div className="px-4 mt-6 space-y-2">
        {!revealed && (
          <button
            onClick={check}
            disabled={!allPlaced}
            className={`w-full h-14 rounded-full inline-flex items-center justify-center transition-transform active:scale-[0.97] ${
              allPlaced ? 'bg-coral text-on-coral font-semibold' : 'bg-surface-sunken text-ink-3 border border-line'
            }`}
          >
            <span className="text-button">{tx('checkOrder')}</span>
          </button>
        )}

        {revealed && (
          <>
            <div className={`p-4 rounded-card border ${
              allCorrect ? 'bg-success-tint border-success' : 'bg-warning-tint border-warning'
            }`}>
              <p className={`text-caption font-semibold ${allCorrect ? 'text-success' : 'text-warning'}`}>
                {allCorrect
                  ? tx('perfectOrder')
                  : `${tx('notQuiteOrder')} — ${correctCount} / ${steps.length} ${tx('inPlace')}`}
              </p>
              {!allCorrect && (
                <div className="mt-3">
                  <p className="text-caption text-ink-2 mb-1.5">{tx('correctOrderIs')}</p>
                  <ol className="space-y-1.5">
                    {correctSequence.map((s) => (
                      <li key={s.correctOrder} className="flex gap-2">
                        <span className="text-caption font-bold text-ink-2 w-4 shrink-0">{s.correctOrder}.</span>
                        <span className="text-caption text-ink">
                          {sub(isEs && s.textEs ? s.textEs : s.text)}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
            <SpeedBonusBanner show={award.fast} />
            <button onClick={() => onFinish(award)} className="btn-primary w-full h-14">
              <span className="text-button">{tx('finish')} · +{award.xp} XP</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

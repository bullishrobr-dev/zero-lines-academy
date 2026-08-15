import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ChevronLeft, Trophy, Star, CheckCircle, XCircle,
  ArrowRight, Brain, Syringe, Sparkles, FlaskConical,
  Footprints, MessageCircle, Eye, Hand, Target, Zap,
  Waves, Palette, Heart, TrendingUp,
} from 'lucide-react';
import { generalQuizzes, type QuizQuestion } from '../data/generalQuizzes';
import { MORE_QUIZZES } from '../data/moreQuizzes';
import { MORE_QUIZZES_2 } from '../data/moreQuizzes2';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../hooks/useProgress';
import { useLocationText } from '../utils/locationText';
import { haptic } from '../utils/haptics';
import XPToast from '../components/XPToast';
import ConfettiCelebration from '../components/ConfettiCelebration';

const allQuizzes = [...generalQuizzes, ...MORE_QUIZZES, ...MORE_QUIZZES_2];

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain, Syringe, Sparkles, FlaskConical, Footprints, MessageCircle, Eye, Hand, Target, Zap,
  Waves, Palette, Heart, TrendingUp,
};

/* canvas-confetti paints to a <canvas>, so it needs literal colours rather than
   CSS tokens. These mirror --gold / --teal / --coral from src/index.css. */
const CONFETTI_GOLD = ['#E3B54A', '#F0CB72', '#0ABAB5', '#FF6A7A'];

/* ─────────────────── XP model ───────────────────
   Proportional XP for what you actually answered correctly, plus a bonus for a
   clean run. LessonQuiz.tsx uses the same shape so the two agree. */
const PERFECT_BONUS_RATE = 0.25;

function quizAward(correct: number, total: number, xpReward: number) {
  if (total <= 0) return { base: 0, bonus: 0, xp: 0 };
  const base = Math.round(xpReward * (correct / total));
  const bonus = correct === total ? Math.round(xpReward * PERFECT_BONUS_RATE) : 0;
  return { base, bonus, xp: base + bonus };
}

/* Strings with no key in src/data/translations.ts yet — see report. */
const COPY = {
  statTotal: { en: 'Total', es: 'Total' },
  statCompleted: { en: 'Completed', es: 'Completados' },
  statAvgScore: { en: 'Avg Score', es: 'Nota Media' },
  questions: { en: 'questions', es: 'preguntas' },
  startQuiz: { en: 'Start Quiz', es: 'Empezar' },
  retakeQuiz: { en: 'Retake Quiz', es: 'Repetir' },
  notQuite: { en: 'Not quite...', es: 'Casi...' },
  perfectScore: { en: 'Perfect score!', es: '¡Puntuación perfecta!' },
  xpEarned: { en: 'XP earned', es: 'XP ganados' },
  xpBase: { en: 'base', es: 'base' },
  xpPerfectBonus: { en: 'perfect bonus', es: 'bonus perfecto' },
  xpNone: {
    en: 'No XP this time. Retake the quiz — every correct answer earns XP.',
    es: 'Sin XP esta vez. Repite el cuestionario — cada respuesta correcta gana XP.',
  },
  /* Retaking is the behaviour the app asks for, and it credits the
     difference only — usually nothing. The screen used to print the
     attempt's full value with "saved to your profile" under it. Saying
     +0 without saying WHY reads as the app being broken. */
  xpAlreadyBanked: {
    en: 'You already banked the XP for this one. The practice still counts.',
    es: 'El XP de este ya te lo llevaste. La práctica sigue contando.',
  },
  xpMore: {
    en: 'Get every answer right for a +25% perfect bonus.',
    es: 'Acierta todas para un bonus perfecto del +25%.',
  },
  bestScore: { en: 'Best score', es: 'Mejor nota' },
  backToQuizzes: { en: 'Back to Quizzes', es: 'Volver a Cuestionarios' },
  tryAgain: { en: 'Try Again', es: 'Intentar de Nuevo' },
  quizSaved: { en: 'saved to your profile', es: 'guardado en tu perfil' },
} as const;

type View = 'hub' | 'quiz' | 'results';

interface QuizResult {
  correct: number;
  total: number;
  base: number;
  bonus: number;
  xp: number;
}

export default function QuizzesPage() {
  const navigate = useNavigate();
  const { recordQuizScore, getQuizScore } = useProgress();
  const { language, t } = useLanguage();
  const { replacePlaceholders, currency, location } = useLocationText();
  const [view, setView] = useState<View>('hub');
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const isEs = language === 'es';
  const tx = (key: keyof typeof COPY) => (isEs ? COPY[key].es : COPY[key].en);
  /* The content files still ship {currency} / {location} placeholders alongside
     the older {{...}} form; resolve both so no seller ever sees a raw token. */
  const sub = (text: string) =>
    replacePlaceholders(text)
      .replace(/\{\s*currency\s*\}/g, currency)
      .replace(/\{\s*(?:location|locationName)\s*\}/g, location);

  const quiz = useMemo(
    () => allQuizzes.find((q) => q.id === activeQuizId) ?? null,
    [activeQuizId]
  );
  const question: QuizQuestion | null = quiz ? quiz.questions[qIndex] ?? null : null;

  const startQuiz = useCallback((id: string) => {
    setActiveQuizId(id);
    setQIndex(0);
    setScore(0);
    setSelectedIdx(null);
    setShowExplanation(false);
    setResult(null);
    setCelebrate(false);
    setToastVisible(false);
    setView('quiz');
  }, []);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (selectedIdx !== null || !question) return;
      setSelectedIdx(idx);
      setShowExplanation(true);
      if (idx === question.correctIndex) {
        setScore((s) => s + 1);
        haptic('light');
      } else {
        /* Two short taps — deliberately a different pattern from "correct". */
        haptic('medium');
        window.setTimeout(() => haptic('medium'), 110);
      }
    },
    [selectedIdx, question]
  );

  const handleNext = useCallback(() => {
    if (!quiz) return;
    if (qIndex < quiz.questions.length - 1) {
      setQIndex((i) => i + 1);
      setSelectedIdx(null);
      setShowExplanation(false);
      return;
    }

    /* `score` already includes the final question: handleAnswer incremented it
       and the re-render that revealed this button used the updated value. */
    const totalQ = quiz.questions.length;
    const award = quizAward(score, totalQ, quiz.xpReward);
    /* recordQuizScore(id, scorePercent, xpEarned) — the percent is the stored
       score, the XP is what gets added to the seller's total. */
    const credited = recordQuizScore(quiz.id, Math.round((score / totalQ) * 100), award.xp);
    setResult({ correct: score, total: totalQ, ...award, xp: credited });
    setView('results');

    if (credited > 0) setToastVisible(true);
    if (score === totalQ) {
      haptic('heavy');
      setCelebrate(true);
    } else if (score / totalQ >= 0.6) {
      haptic('medium');
      setCelebrate(true);
    }
  }, [quiz, qIndex, score, recordQuizScore]);

  /* Extra gold wave on a clean run — a perfect score should feel different. */
  const isPerfectResult = !!result && result.correct === result.total;
  useEffect(() => {
    if (view !== 'results' || !isPerfectResult) return;
    const timers = [500, 1100].map((delay, i) =>
      window.setTimeout(() => {
        confetti({
          particleCount: 70,
          spread: 100,
          startVelocity: 45,
          gravity: 0.9,
          ticks: 140,
          disableForReducedMotion: true,
          origin: { x: i === 0 ? 0.25 : 0.75, y: 0.75 },
          colors: CONFETTI_GOLD,
        });
      }, delay)
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [view, isPerfectResult]);

  const dismissToast = useCallback(() => setToastVisible(false), []);
  const stopCelebrating = useCallback(() => setCelebrate(false), []);

  /* ─── Hub ─── */
  if (view === 'hub') {
    /* getQuizScore returns the best score as a percentage, so the average is a
       real average of the quizzes actually taken — not diluted by untaken ones. */
    const done = allQuizzes.filter((q) => getQuizScore(q.id) !== undefined);
    const avg = done.length
      ? Math.round(done.reduce((s, q) => s + (getQuizScore(q.id) ?? 0), 0) / done.length)
      : 0;

    return (
      <div className="min-h-full bg-background pb-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button onClick={() => navigate('/home')} className="btn-icon" aria-label={t('back')}>
            <ChevronLeft size={22} />
          </button>
          <h1 className="text-h3 text-ink">{t('quizzesTitle')}</h1>
          <div className="w-touch" aria-hidden="true" />
        </div>

        {/* Stats */}
        <div className="flex gap-2 px-4 mt-3">
          {[
            { label: tx('statTotal'), value: String(allQuizzes.length) },
            { label: tx('statCompleted'), value: String(done.length) },
            { label: tx('statAvgScore'), value: `${avg}%` },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 surface-flat p-3 text-center">
              <p className="text-overline text-ink-3">{stat.label}</p>
              <p className="text-h3 text-ink mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quiz Cards */}
        <div className="px-4 mt-6 space-y-3">
          {allQuizzes.map((q, i) => {
            const QuizIcon = iconMap[q.icon] ?? Brain;
            const best = getQuizScore(q.id);
            const isDone = best !== undefined;
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 8) * 0.04 }}
                className="surface-raised p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-chip bg-teal-tint flex items-center justify-center shrink-0">
                    <QuizIcon size={20} className="text-teal-strong" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-h4 text-ink">{sub(isEs && q.titleEs ? q.titleEs : q.title)}</h4>
                    <p className="text-body-small text-ink-2 mt-0.5">
                      {sub(isEs && q.descriptionEs ? q.descriptionEs : q.description)}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-caption text-ink-2 bg-surface-sunken px-2 py-0.5 rounded-full">
                        {q.questions.length} {tx('questions')}
                      </span>
                      <span className="text-caption text-gold-strong bg-gold-tint px-2 py-0.5 rounded-full">
                        +{q.xpReward} XP
                      </span>
                      <span className="text-caption text-ink-3">
                        {isEs && q.categoryEs ? q.categoryEs : q.category}
                      </span>
                    </div>
                    {isDone && (
                      <p className="text-caption text-teal-strong mt-2" data-testid={`best-${q.id}`}>
                        {tx('bestScore')} {best}%
                      </p>
                    )}
                  </div>
                  {isDone && <CheckCircle size={20} className="text-success shrink-0" aria-hidden="true" />}
                </div>
                <button
                  onClick={() => startQuiz(q.id)}
                  className="btn-primary w-full mt-3"
                >
                  <span className="text-button">{isDone ? tx('retakeQuiz') : tx('startQuiz')}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ─── Quiz Taking ─── */
  if (view === 'quiz' && quiz && question) {
    const isAnswered = selectedIdx !== null;
    const gotItRight = selectedIdx === question.correctIndex;

    return (
      <div className="min-h-full bg-background pb-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 gap-2">
          <button onClick={() => setView('hub')} className="btn-icon shrink-0" aria-label={t('back')}>
            <ChevronLeft size={22} />
          </button>
          <p className="text-caption text-ink-2 text-center truncate">
            {sub(isEs && quiz.titleEs ? quiz.titleEs : quiz.title)}
          </p>
          <div className="w-touch shrink-0" aria-hidden="true" />
        </div>

        {/* Progress */}
        <div className="px-4 mt-2 mb-4">
          <div className="flex items-center justify-between text-caption text-ink-2 mb-1.5">
            <span>
              {t('quizQuestion')} {qIndex + 1} {t('quizOf')} {quiz.questions.length}
            </span>
            <span className="flex items-center gap-1">
              <Star size={13} className="text-gold-strong" aria-hidden="true" />
              {score} / {quiz.questions.length}
            </span>
          </div>
          <div className="h-1.5 bg-surface-sunken rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-teal rounded-full"
              animate={{ width: `${((qIndex + (isAnswered ? 1 : 0)) / quiz.questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="px-4 mt-4">
          <h2 className="text-h3 text-ink leading-snug">
            {sub(isEs && question.questionEs ? question.questionEs : question.question)}
          </h2>
        </div>

        {/* Options */}
        <div className="px-4 mt-5 space-y-2.5">
          {question.options.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            const isCorrect = idx === question.correctIndex;
            let btnClass = 'bg-surface border-line';
            let badgeClass = 'bg-surface-sunken text-ink-2';
            if (isAnswered) {
              if (isCorrect) {
                btnClass = 'bg-success-tint border-success';
                badgeClass = 'bg-success text-background';
              } else if (isSelected) {
                btnClass = 'bg-danger-tint border-danger';
                badgeClass = 'bg-danger text-background';
              } else {
                btnClass = 'bg-surface border-line opacity-60';
              }
            } else if (isSelected) {
              btnClass = 'bg-teal-tint border-teal';
            }

            return (
              <motion.button
                key={`${qIndex}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={`w-full min-h-touch text-left p-4 rounded-card border transition-all ${btnClass}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-caption font-bold shrink-0 ${badgeClass}`}
                    aria-hidden="true"
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-body-small text-ink">
                    {sub(isEs && question.optionsEs ? question.optionsEs[idx] : opt)}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0 }}
              className="px-4 mt-4"
            >
              <div
                className={`p-4 rounded-card border ${
                  gotItRight ? 'bg-success-tint border-success/40' : 'bg-danger-tint border-danger/40'
                }`}
              >
                <p className={`text-caption font-semibold ${gotItRight ? 'text-success' : 'text-danger'}`}>
                  {gotItRight ? t('quizCorrect') : tx('notQuite')}
                </p>
                <p className="text-body-small text-ink-2 mt-1">
                  {sub(isEs && question.explanationEs ? question.explanationEs : question.explanation)}
                </p>
              </div>
              <button onClick={handleNext} className="btn-primary w-full mt-4 h-14">
                <span className="text-button">
                  {qIndex < quiz.questions.length - 1 ? t('quizNextQuestion') : t('quizSeeResults')}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ─── Results ─── */
  if (view === 'results' && quiz && result) {
    const pct = Math.round((result.correct / result.total) * 100);
    const isPerfect = result.correct === result.total;

    return (
      <div className="min-h-full bg-background flex flex-col items-center px-4 pt-12 pb-8">
        <XPToast
          visible={toastVisible}
          amount={result.xp}
          message={tx('quizSaved')}
          onDismiss={dismissToast}
        />
        <ConfettiCelebration trigger={celebrate} onComplete={stopCelebrating} />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <Trophy size={56} className={isPerfect ? 'text-gold-strong' : 'text-ink-3'} aria-hidden="true" />
          <h2 className="text-h1 text-ink mt-4">{t('quizComplete')}</h2>
          <p className="text-body text-ink-2 mt-2">
            {t('quizYouScored')} {result.correct} {t('quizOutOf')} {result.total}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full surface-raised p-6 mt-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {isPerfect ? (
              <CheckCircle size={28} className="text-success" aria-hidden="true" />
            ) : (
              <XCircle size={28} className="text-warning" aria-hidden="true" />
            )}
            <span className="text-score text-ink">{result.correct}</span>
            <span className="text-h3 text-ink-3">/ {result.total}</span>
          </div>
          <div className="h-3 bg-surface-sunken rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                isPerfect ? 'bg-success' : pct >= 60 ? 'bg-gold' : 'bg-coral'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>

          {/* Exactly what was recorded */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-5 text-center"
          >
            {isPerfect && (
              <p className="text-body text-success font-semibold mb-1">{tx('perfectScore')}</p>
            )}
            <p className="text-h2 text-gold-strong" data-testid="quiz-xp-earned">
              +{result.xp} XP
            </p>
            {/* Zero XP used to print "XP earned · saved to your profile" and
                "No XP this time" one under the other. */}
            {result.xp > 0 && (
              <p className="text-caption text-ink-3 mt-1">
                {result.bonus > 0
                  ? `${result.base} ${tx('xpBase')} + ${result.bonus} ${tx('xpPerfectBonus')} · ${tx('quizSaved')}`
                  : `${tx('xpEarned')} · ${tx('quizSaved')}`}
              </p>
            )}
            {result.xp === 0 && (
              <p className="text-caption text-ink-2 mt-2">
                {/* Nothing credited has two very different causes, and only
                    one of them is the seller's fault. */}
                {result.correct > 0 ? tx('xpAlreadyBanked') : tx('xpNone')}
              </p>
            )}
            {result.xp > 0 && !isPerfect && (
              <p className="text-caption text-ink-2 mt-2">{tx('xpMore')}</p>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full mt-8 space-y-3"
        >
          <button onClick={() => setView('hub')} className="btn-primary w-full h-14">
            <span className="text-button">{tx('backToQuizzes')}</span>
          </button>
          <button onClick={() => startQuiz(quiz.id)} className="btn-quiet w-full">
            <span className="text-button">{tx('tryAgain')}</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
}

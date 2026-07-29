import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Trophy, Star } from 'lucide-react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { getLesson, getCategory, type QuizQuestion } from '../data/lessons';
import { useLocationText } from '../utils/locationText';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../hooks/useProgress';
import { haptic } from '../utils/haptics';
import XPToast from '../components/XPToast';
import ConfettiCelebration from '../components/ConfettiCelebration';

type AnswerState = 'idle' | 'correct' | 'wrong';

/* lessons.ts has no Spanish quiz copy yet (0 `questionEs`). Read the fields
   optimistically so the moment the data lands it renders, and fall back to
   English until then. */
type BilingualQuestion = QuizQuestion & {
  questionEs?: string;
  optionsEs?: string[];
  explanationEs?: string;
};

/* canvas-confetti needs literal colours; these mirror --gold/--teal/--coral. */
const CONFETTI_GOLD = ['#E3B54A', '#F0CB72', '#0ABAB5', '#FF6A7A'];

/* Same XP model as the general quizzes (src/pages/QuizzesPage.tsx). */
const PERFECT_BONUS_RATE = 0.25;

function quizAward(correct: number, total: number, xpReward: number) {
  if (total <= 0) return { base: 0, bonus: 0, xp: 0 };
  const base = Math.round(xpReward * (correct / total));
  const bonus = correct === total ? Math.round(xpReward * PERFECT_BONUS_RATE) : 0;
  return { base, bonus, xp: base + bonus };
}

/* Strings with no key in src/data/translations.ts yet — see report. */
const COPY = {
  perfectScore: { en: 'Perfect score!', es: '¡Puntuación perfecta!' },
  notQuite: { en: 'Not quite...', es: 'Casi...' },
  xpBase: { en: 'base', es: 'base' },
  xpPerfectBonus: { en: 'perfect bonus', es: 'bonus perfecto' },
  xpSaved: { en: 'saved to your profile', es: 'guardado en tu perfil' },
  xpNone: {
    en: 'No XP this time. Retake the quiz — every correct answer earns XP.',
    es: 'Sin XP esta vez. Repite el cuestionario — cada respuesta correcta gana XP.',
  },
} as const;

interface QuizResult {
  correct: number;
  total: number;
  base: number;
  bonus: number;
  xp: number;
}

export default function LessonQuiz() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { replacePlaceholders, currency, location } = useLocationText();
  const { recordQuizScore, completeLesson } = useProgress();

  const lesson = useMemo(() => (lessonId ? getLesson(lessonId) : undefined), [lessonId]);
  const category = useMemo(() => (lesson ? getCategory(lesson.categoryId) : undefined), [lesson]);
  const questions = useMemo<BilingualQuestion[]>(() => lesson?.quiz ?? [], [lesson]);

  const [currentQ, setCurrentQ] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const isEs = language === 'es';
  const tx = (key: keyof typeof COPY) => (isEs ? COPY[key].es : COPY[key].en);
  /* Content ships both {currency} and the older {{currency}} form. */
  const sub = (text: string) =>
    replacePlaceholders(text ?? '')
      .replace(/\{\s*currency\s*\}/g, currency)
      .replace(/\{\s*(?:location|locationName)\s*\}/g, location);

  const question: BilingualQuestion | undefined = questions[currentQ];
  const finished = result !== null;

  /* Navigation is a side effect, never something to do while rendering. */
  useEffect(() => {
    if (!lesson || !category) {
      navigate('/home', { replace: true });
      return;
    }
    if (questions.length === 0) {
      navigate(`/lesson/${lesson.id}`, { replace: true });
    }
  }, [lesson, category, questions.length, navigate]);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (answerState !== 'idle' || !question) return;
      setSelectedIdx(idx);
      if (idx === question.correctIndex) {
        setAnswerState('correct');
        setScore((s) => s + 1);
        haptic('light');
      } else {
        setAnswerState('wrong');
        /* Two short taps — deliberately different from the "correct" buzz. */
        haptic('medium');
        window.setTimeout(() => haptic('medium'), 110);
      }
    },
    [answerState, question]
  );

  const handleNext = useCallback(() => {
    if (!lesson) return;
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setAnswerState('idle');
      setSelectedIdx(null);
      return;
    }

    /* `score` already counts the current question — handleAnswer incremented it
       before this button could render. */
    const totalQ = questions.length;
    const award = quizAward(score, totalQ, lesson.xpReward);

    /* Persist: the quiz result (percent + XP), and the lesson as completed.
       completeLesson only awards its XP the first time, so retaking the quiz
       cannot re-award the lesson. */
    recordQuizScore(`lesson-${lesson.id}`, Math.round((score / totalQ) * 100), award.xp);
    completeLesson(lesson.id, lesson.xpReward);

    setResult({ correct: score, total: totalQ, ...award });
    if (award.xp > 0) setToastVisible(true);
    if (score === totalQ) {
      haptic('heavy');
      setCelebrate(true);
    } else if (score >= totalQ / 2) {
      haptic('medium');
      setCelebrate(true);
    }
  }, [lesson, currentQ, questions.length, score, recordQuizScore, completeLesson]);

  /* Extra gold wave for a clean run. */
  const isPerfect = !!result && result.correct === result.total;
  useEffect(() => {
    if (!isPerfect) return;
    const timers = [450, 1050].map((delay, i) =>
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
  }, [isPerfect]);

  const dismissToast = useCallback(() => setToastVisible(false), []);
  const stopCelebrating = useCallback(() => setCelebrate(false), []);

  /* The redirect above handles these; render nothing in the meantime. */
  if (!lesson || !category || questions.length === 0 || !question) return null;

  return (
    <div className="min-h-full bg-background flex flex-col px-4 pt-6 pb-8">
      <XPToast
        visible={toastVisible}
        amount={result?.xp ?? 0}
        message={tx('xpSaved')}
        onDismiss={dismissToast}
      />
      <ConfettiCelebration trigger={celebrate} onComplete={stopCelebrating} />

      {/* Header */}
      <button
        onClick={() => navigate(`/lesson/${lesson.id}`)}
        className="flex items-center gap-1.5 min-h-touch -ml-2 px-2 text-ink-2 mb-2 self-start transition-colors active:text-ink"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        <span className="text-body-small">{t('quizBackToLesson')}</span>
      </button>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={`q-${currentQ}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            {/* Question counter */}
            <div className="flex items-center justify-between mb-5 gap-3">
              <span className="text-overline text-ink-2">
                {t('quizQuestion')} {currentQ + 1} {t('quizOf')} {questions.length}
              </span>
              <span className="text-caption text-teal-strong font-semibold shrink-0">
                {lesson.xpReward} XP
              </span>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-1.5 mb-6" aria-hidden="true">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    i < currentQ ? 'bg-teal' : i === currentQ ? 'bg-teal/60' : 'bg-surface-sunken'
                  }`}
                />
              ))}
            </div>

            {/* Question */}
            <h2 className="text-h2 text-ink mb-6">
              {sub(isEs && question.questionEs ? question.questionEs : question.question)}
            </h2>

            {/* Answer options */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, i) => {
                let stateClass = 'bg-surface border-line text-ink';
                let badgeClass = 'bg-surface-sunken text-ink-2';
                if (answerState !== 'idle') {
                  if (i === question.correctIndex) {
                    stateClass = 'bg-success-tint border-success text-ink';
                    badgeClass = 'bg-success text-background';
                  } else if (i === selectedIdx) {
                    stateClass = 'bg-danger-tint border-danger text-ink';
                    badgeClass = 'bg-danger text-background';
                  } else {
                    stateClass = 'bg-surface border-line text-ink-3';
                  }
                }

                return (
                  <motion.button
                    key={i}
                    whileTap={answerState === 'idle' ? { scale: 0.98 } : undefined}
                    onClick={() => handleAnswer(i)}
                    disabled={answerState !== 'idle'}
                    className={`w-full min-h-touch text-left p-4 rounded-card border transition-all duration-200 flex items-center gap-3 ${stateClass}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-caption font-bold ${badgeClass}`}
                      aria-hidden="true"
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-body-small font-medium flex-1">
                      {sub(isEs && question.optionsEs?.[i] ? question.optionsEs[i] : option)}
                    </span>
                    {answerState !== 'idle' && i === question.correctIndex && (
                      <Check size={18} className="text-success shrink-0" aria-hidden="true" />
                    )}
                    {answerState === 'wrong' && i === selectedIdx && (
                      <X size={18} className="text-danger shrink-0" aria-hidden="true" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {answerState !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4"
                >
                  {answerState === 'correct' ? (
                    <div className="p-4 rounded-card bg-success-tint border border-success/40">
                      <p className="text-body-small font-semibold text-success mb-1">
                        {t('quizCorrect')}
                      </p>
                      <p className="text-body-small text-ink-2">
                        {sub(isEs && question.explanationEs ? question.explanationEs : question.explanation)}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-card bg-danger-tint border border-danger/40">
                      <p className="text-body-small font-semibold text-danger mb-1">
                        {t('quizWrongPrefix')}{' '}
                        {sub(
                          isEs && question.optionsEs?.[question.correctIndex]
                            ? question.optionsEs[question.correctIndex]
                            : question.options[question.correctIndex]
                        )}
                      </p>
                      <p className="text-body-small text-ink-2">
                        {sub(isEs && question.explanationEs ? question.explanationEs : question.explanation)}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            <div className="mt-auto pt-4">
              {answerState !== 'idle' && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNext}
                  className="btn-primary w-full h-14"
                >
                  <span className="text-button">
                    {currentQ < questions.length - 1 ? t('quizNextQuestion') : t('quizSeeResults')}
                  </span>
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Results Screen */
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                isPerfect ? 'bg-gold-tint' : 'bg-teal-tint'
              }`}
            >
              <Trophy size={36} className={isPerfect ? 'text-gold-strong' : 'text-teal-strong'} aria-hidden="true" />
            </div>

            <h2 className="text-h1 text-ink mb-2">{t('quizComplete')}</h2>
            <p className="text-body-small text-ink-2 mb-6">
              {t('quizYouScored')} {result.correct} {t('quizOutOf')} {result.total}
            </p>

            {/* Score display */}
            <div className="flex items-center gap-4 mb-3">
              <p className="text-score text-ink">
                {result.correct}/{result.total}
              </p>
              <div className="w-px h-12 bg-line" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <Star size={20} className="text-gold-strong" aria-hidden="true" />
                <span className="text-h2 text-gold-strong" data-testid="lesson-quiz-xp">
                  +{result.xp} XP
                </span>
              </div>
            </div>

            {isPerfect && (
              <p className="text-body-small font-semibold text-success">{tx('perfectScore')}</p>
            )}
            <p className="text-caption text-ink-3 mt-1 mb-8">
              {result.bonus > 0
                ? `${result.base} ${tx('xpBase')} + ${result.bonus} ${tx('xpPerfectBonus')} · ${tx('xpSaved')}`
                : result.xp > 0
                  ? tx('xpSaved')
                  : tx('xpNone')}
            </p>

            {/* Buttons */}
            <div className="w-full space-y-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
                className="btn-primary w-full h-14"
              >
                <span className="text-button">{t('quizBackToLessonBtn')}</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/category/${category.id}`)}
                className="btn-quiet w-full h-14"
              >
                <span className="text-button">{t('quizBackToCategory')}</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

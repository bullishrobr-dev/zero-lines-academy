import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Trophy, Star, CheckCircle, XCircle,
  ArrowRight, Brain, Syringe, Sparkles, FlaskConical,
  Footprints, MessageCircle, Eye, Hand, Target, Zap,
} from 'lucide-react';
import { generalQuizzes, type QuizQuestion } from '../data/generalQuizzes';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../hooks/useProgress';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain, Syringe, Sparkles, FlaskConical, Footprints, MessageCircle, Eye, Hand, Target, Zap,
};

/* ──────────────────────── views ──────────────────────── */
type View = 'hub' | 'quiz' | 'results';

export default function QuizzesPage() {
  const navigate = useNavigate();
  const progress = useProgress();
  const { language } = useLanguage();
  const [view, setView] = useState<View>('hub');
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const quiz = useMemo(
    () => generalQuizzes.find((q) => q.id === activeQuizId) ?? null,
    [activeQuizId]
  );
  const question: QuizQuestion | null = quiz ? quiz.questions[qIndex] ?? null : null;

  const startQuiz = useCallback((id: string) => {
    setActiveQuizId(id);
    setQIndex(0);
    setScore(0);
    setSelectedIdx(null);
    setShowExplanation(false);
    setView('quiz');
  }, []);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (selectedIdx !== null || !question) return;
      setSelectedIdx(idx);
      setShowExplanation(true);
      if (idx === question.correctIndex) setScore((s) => s + 1);
    },
    [selectedIdx, question]
  );

  const handleNext = useCallback(() => {
    if (!quiz) return;
    if (qIndex < quiz.questions.length - 1) {
      setQIndex((i) => i + 1);
      setSelectedIdx(null);
      setShowExplanation(false);
    } else {
      const perfect = score + (selectedIdx !== null && question && selectedIdx === question.correctIndex ? 1 : 0) === quiz.questions.length;
      progress.recordQuizScore(quiz.id, perfect ? quiz.xpReward : 0);
      setView('results');
    }
  }, [quiz, qIndex, score, selectedIdx, question, progress]);

  /* ─── Hub ─── */
  if (view === 'hub') {
    const completed = generalQuizzes.filter((q) => progress.getQuizScore(q.id) !== undefined).length;
    const avg = generalQuizzes.length
      ? Math.round(generalQuizzes.reduce((s, q) => s + (progress.getQuizScore(q.id) ?? 0), 0) / generalQuizzes.length)
      : 0;

    return (
      <div className="min-h-full bg-[#0A0A0A] pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button
            onClick={() => navigate('/home')}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] active:scale-95 transition-transform"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>
          <h1 className="text-h3 text-white">Quizzes</h1>
          <div className="w-11" />
        </div>

        {/* Stats */}
        <div className="flex gap-3 px-4 mt-3">
          <div className="flex-1 bg-[#1A1A1A] rounded-xl p-3 text-center">
            <p className="text-overline text-[#8A8A8A]">Total</p>
            <p className="text-h3 text-white mt-1">{generalQuizzes.length}</p>
          </div>
          <div className="flex-1 bg-[#1A1A1A] rounded-xl p-3 text-center">
            <p className="text-overline text-[#8A8A8A]">Completed</p>
            <p className="text-h3 text-white mt-1">{completed}</p>
          </div>
          <div className="flex-1 bg-[#1A1A1A] rounded-xl p-3 text-center">
            <p className="text-overline text-[#8A8A8A]">Avg Score</p>
            <p className="text-h3 text-white mt-1">{avg}%</p>
          </div>
        </div>

        {/* Quiz Cards */}
        <div className="px-4 mt-6 space-y-3">
          {generalQuizzes.map((q, i) => {
            const QuizIcon = iconMap[q.icon] ?? Brain;
            const isDone = progress.getQuizScore(q.id) !== undefined;
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#1A1A1A] rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0ABAB5]/15 flex items-center justify-center shrink-0">
                    <QuizIcon size={20} className="text-[#0ABAB5]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-h4 text-white">{language === 'es' && q.titleEs ? q.titleEs : q.title}</h4>
                    <p className="text-body-small text-[#8A8A8A] mt-0.5">{language === 'es' && q.descriptionEs ? q.descriptionEs : q.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] text-[#8A8A8A] bg-[#2A2A2A] px-2 py-0.5 rounded-full">
                        {q.questions.length} questions
                      </span>
                      <span className="text-[11px] text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-full">
                        +{q.xpReward} XP
                      </span>
                      <span className="text-[11px] text-[#8A8A8A]">{q.category}</span>
                    </div>
                  </div>
                  {isDone && <CheckCircle size={20} className="text-[#22C55E] shrink-0" />}
                </div>
                <button
                  onClick={() => startQuiz(q.id)}
                  className="w-full mt-3 h-11 bg-[#0ABAB5] rounded-full flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
                >
                  <span className="text-sm font-semibold text-white">
                    {isDone ? 'Retake Quiz' : 'Start Quiz'}
                  </span>
                  <ArrowRight size={16} className="text-white" />
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

    return (
      <div className="min-h-full bg-[#0A0A0A] pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button
            onClick={() => setView('hub')}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] active:scale-95 transition-transform"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>
          <div className="text-center">
            <p className="text-caption text-[#8A8A8A]">{language === 'es' && quiz.titleEs ? quiz.titleEs : quiz.title}</p>
          </div>
          <div className="w-11" />
        </div>

        {/* Progress */}
        <div className="px-6 mt-2 mb-4">
          <div className="flex items-center justify-between text-caption text-[#8A8A8A] mb-1">
            <span>Question {qIndex + 1} of {quiz.questions.length}</span>
            <span className="flex items-center gap-1">
              <Star size={12} className="text-[#F59E0B]" />
              {score} / {quiz.questions.length}
            </span>
          </div>
          <div className="h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#0ABAB5] rounded-full"
              animate={{ width: `${((qIndex + (isAnswered ? 1 : 0)) / quiz.questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="px-6 mt-4">
          <h3 className="text-h3 text-white leading-snug">{language === 'es' && question.questionEs ? question.questionEs : question.question}</h3>
        </div>

        {/* Options */}
        <div className="px-4 mt-6 space-y-2.5">
          <AnimatePresence mode="wait">
            {question.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              const isCorrect = idx === question.correctIndex;
              let btnClass = 'bg-[#1A1A1A] border-[#2A2A2A]';
              if (isAnswered) {
                if (isCorrect) btnClass = 'bg-[#22C55E]/20 border-[#22C55E]';
                else if (isSelected) btnClass = 'bg-[#EF4444]/20 border-[#EF4444]';
                else btnClass = 'bg-[#1A1A1A] border-[#2A2A2A] opacity-50';
              } else if (isSelected) {
                btnClass = 'bg-[#0ABAB5]/20 border-[#0ABAB5]';
              }

              return (
                <motion.button
                  key={`${qIndex}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isAnswered && isCorrect ? 'bg-[#22C55E] text-white' :
                      isAnswered && isSelected ? 'bg-[#EF4444] text-white' :
                      'bg-[#2A2A2A] text-[#8A8A8A]'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-body-small text-white">{language === 'es' && question.optionsEs ? question.optionsEs[idx] : opt}</span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
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
              <div className={`p-4 rounded-xl border ${
                selectedIdx === question.correctIndex
                  ? 'bg-[#22C55E]/10 border-[#22C55E]/30'
                  : 'bg-[#EF4444]/10 border-[#EF4444]/30'
              }`}>
                <p className={`text-sm font-semibold ${
                  selectedIdx === question.correctIndex ? 'text-[#22C55E]' : 'text-[#EF4444]'
                }`}>
                  {selectedIdx === question.correctIndex ? 'Correct!' : 'Not quite...'}
                </p>
                <p className="text-body-small text-[#B0B0B0] mt-1">{language === 'es' && question.explanationEs ? question.explanationEs : question.explanation}</p>
              </div>
              <button
                onClick={handleNext}
                className="w-full mt-4 h-12 bg-[#0ABAB5] rounded-full flex items-center justify-center active:scale-[0.97] transition-transform"
              >
                <span className="text-sm font-semibold text-white">
                  {qIndex < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ─── Results ─── */
  if (view === 'results' && quiz) {
    const totalQ = quiz.questions.length;
    const pct = Math.round((score / totalQ) * 100);
    const isPerfect = score === totalQ;

    return (
      <div className="min-h-full bg-[#0A0A0A] flex flex-col items-center px-6 pt-12 pb-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Trophy size={56} className={isPerfect ? 'text-[#D4A843]' : 'text-[#8A8A8A]'} />
          <h2 className="text-h1 text-white mt-4">Quiz Complete!</h2>
          <p className="text-body text-[#8A8A8A] mt-2">
            You scored {score} out of {totalQ}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-[#1A1A1A] rounded-xl p-6 mt-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {isPerfect ? (
              <CheckCircle size={28} className="text-[#22C55E]" />
            ) : (
              <XCircle size={28} className="text-[#F59E0B]" />
            )}
            <span className="text-score text-white">{score}</span>
            <span className="text-h3 text-[#8A8A8A]">/ {totalQ}</span>
          </div>
          <div className="h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: isPerfect
                ? 'linear-gradient(270deg, #22C55E 0%, #16A34A 100%)'
                : pct >= 60
                  ? 'linear-gradient(270deg, #F59E0B 0%, #D97706 100%)'
                  : 'linear-gradient(270deg, #EF4444 0%, #DC2626 100%)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
          {isPerfect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 text-center"
            >
              <p className="text-body text-[#22C55E] font-semibold">Perfect score! +{quiz.xpReward} XP</p>
            </motion.div>
          )}
          {!isPerfect && (
            <div className="mt-4 text-center">
              <p className="text-body-small text-[#8A8A8A]">
                Score 100% to earn XP. You can retake this quiz anytime.
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full mt-8 space-y-3"
        >
          <button
            onClick={() => setView('hub')}
            className="w-full h-14 bg-[#0ABAB5] rounded-full flex items-center justify-center active:scale-[0.97] transition-transform"
          >
            <span className="text-button text-white">Back to Quizzes</span>
          </button>
          <button
            onClick={() => startQuiz(quiz.id)}
            className="w-full h-12 border border-[#0ABAB5] rounded-full flex items-center justify-center active:scale-[0.97] transition-transform"
          >
            <span className="text-sm font-semibold text-[#0ABAB5]">Try Again</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
}

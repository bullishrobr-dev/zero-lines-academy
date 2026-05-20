import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Trophy, Star } from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { getLesson, getCategory } from '../data/lessons';

type AnswerState = 'idle' | 'correct' | 'wrong';

export default function LessonQuiz() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const lesson = useMemo(() => (lessonId ? getLesson(lessonId) : undefined), [lessonId]);
  const category = useMemo(() => (lesson ? getCategory(lesson.categoryId) : undefined), [lesson]);

  const [currentQ, setCurrentQ] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const { language, t } = useLanguage();
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!lesson || !category) {
    navigate('/home', { replace: true });
    return null;
  }

  const questions = lesson.quiz || [];
  if (questions.length === 0) {
    navigate(`/lesson/${lessonId}`, { replace: true });
    return null;
  }

  const question = questions[currentQ];

  const handleAnswer = useCallback(
    (idx: number) => {
      if (answerState !== 'idle') return;
      setSelectedIdx(idx);
      if (idx === question.correctIndex) {
        setAnswerState('correct');
        setScore((s) => s + 1);
      } else {
        setAnswerState('wrong');
      }
    },
    [answerState, question.correctIndex]
  );

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setAnswerState('idle');
      setSelectedIdx(null);
    } else {
      setFinished(true);
      const finalScore = score + (answerState === 'correct' ? 1 : 0);
      if (finalScore === questions.length) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0ABAB5', '#F59E0B', '#FFFFFF', '#D4A843'],
        });
      } else if (finalScore >= questions.length / 2) {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#0ABAB5', '#F59E0B'],
        });
      }
    }
  }, [currentQ, questions.length, score, answerState]);

  const finalScore = finished ? score : 0;
  const xpEarned = finished ? Math.round((finalScore / questions.length) * lesson.xpReward) : 0;

  return (
    <div className="min-h-full flex flex-col px-6 pt-6 pb-20">
      {/* Header */}
      <button
        onClick={() => navigate(`/lesson/${lesson.id}`)}
        className="flex items-center gap-1 text-[#8A8A8A] mb-4 hover:text-white transition-colors self-start"
      >
        <ArrowLeft size={18} />
        <span className="text-body-small">Back to Lesson</span>
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
            <div className="flex items-center justify-between mb-6">
              <span className="text-overline text-[#8A8A8A]">
                Question {currentQ + 1} of {questions.length}
              </span>
              <span className="text-caption text-[#0ABAB5] font-semibold">
                {lesson.xpReward} XP
              </span>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-1.5 mb-6">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i < currentQ ? 'bg-[#0ABAB5]' : i === currentQ ? 'bg-[#0ABAB5]/60' : 'bg-[#1A1A1A]'
                  }`}
                />
              ))}
            </div>

            {/* Question */}
            <h2 className="text-h2 text-white font-bold mb-8">{question.question}</h2>

            {/* Answer options */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, i) => {
                let stateClass =
                  'bg-[#111111] border-[#1A1A1A] text-white hover:border-[#2A2A2A]';
                if (answerState !== 'idle') {
                  if (i === question.correctIndex) {
                    stateClass = 'bg-green-500/15 border-green-500/50 text-green-400';
                  } else if (i === selectedIdx && answerState === 'wrong') {
                    stateClass = 'bg-red-500/15 border-red-500/50 text-red-400';
                  } else {
                    stateClass = 'bg-[#111111] border-[#1A1A1A] text-[#8A8A8A]';
                  }
                }

                return (
                  <motion.button
                    key={i}
                    whileTap={answerState === 'idle' ? { scale: 0.98 } : undefined}
                    onClick={() => handleAnswer(i)}
                    disabled={answerState !== 'idle'}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 ${stateClass}`}
                  >
                    <span className="w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 text-xs font-bold text-[#8A8A8A]">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-body-small font-medium flex-1">{option}</span>
                    {answerState !== 'idle' && i === question.correctIndex && (
                      <Check size={18} className="text-green-400 shrink-0" />
                    )}
                    {answerState === 'wrong' && i === selectedIdx && (
                      <X size={18} className="text-red-400 shrink-0" />
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
                    <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30">
                      <p className="text-body-small font-semibold text-green-400 mb-1">Correct!</p>
                      <p className="text-body-small text-gray-300">{question.explanation}</p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30">
                      <p className="text-body-small font-semibold text-red-400 mb-1">
                        Correct answer was: {question.options[question.correctIndex]}
                      </p>
                      <p className="text-body-small text-gray-300">{question.explanation}</p>
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
                  className="w-full py-4 rounded-full bg-[#0ABAB5] text-white text-button font-semibold flex items-center justify-center hover:bg-[#09a9a4] transition-colors"
                >
                  {currentQ < questions.length - 1 ? 'Next Question' : 'See Results'}
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
            <div className="w-20 h-20 rounded-full bg-[#0ABAB5]/15 flex items-center justify-center mb-6">
              <Trophy size={36} className="text-[#0ABAB5]" />
            </div>

            <h2 className="text-h1 text-white mb-2">Quiz Complete!</h2>
            <p className="text-body-small text-[#8A8A8A] mb-6">
              You scored {finalScore} out of {questions.length}
            </p>

            {/* Score display */}
            <div className="flex items-center gap-4 mb-8">
              <div className="text-center">
                <p className="text-score text-white">{finalScore}/{questions.length}</p>
              </div>
              <div className="w-px h-12 bg-[#1A1A1A]" />
              <div className="flex items-center gap-2">
                <Star size={20} className="text-[#F59E0B]" />
                <span className="text-h3 text-[#F59E0B] font-bold">+{xpEarned} XP</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="w-full space-y-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
                className="w-full py-4 rounded-full bg-[#0ABAB5] text-white text-button font-semibold flex items-center justify-center hover:bg-[#09a9a4] transition-colors"
              >
                Back to Lesson
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/category/${category.id}`)}
                className="w-full py-4 rounded-full bg-[#1A1A1A] text-white text-button font-semibold flex items-center justify-center border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors"
              >
                Back to Category
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Scissors, Lightbulb, SkipForward, Clock, Zap } from 'lucide-react';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  hint: string;
  category: string;
}

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  streak: number;
  onAnswer: (correct: boolean, pointsEarned: number) => void;
  onSkip: () => void;
  onNext: () => void;
}

export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  score,
  streak,
  onAnswer,
  onSkip,
  onNext,
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [used5050, setUsed5050] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsRevealed(false);
    setTimeLeft(15);
    setUsed5050(false);
    setUsedHint(false);
    setHiddenOptions([]);
    setShowHint(false);
  }, [question.id]);

  // Timer
  useEffect(() => {
    if (isRevealed) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - auto reveal correct answer
          setIsRevealed(true);
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [question.id, isRevealed]);

  const handleSelect = useCallback(
    (optionId: string) => {
      if (isRevealed) return;

      setSelectedOption(optionId);
      setIsRevealed(true);
      if (timerRef.current) clearInterval(timerRef.current);

      const option = question.options.find((o) => o.id === optionId);
      if (option) {
        const isCorrect = option.isCorrect;
        let points = 0;
        if (isCorrect) {
          points = 10;
          if (streak >= 2) {
            points += 5; // streak bonus
          }
        }
        onAnswer(isCorrect, points);
      }
    },
    [isRevealed, question.options, streak, onAnswer]
  );

  const handle5050 = useCallback(() => {
    if (used5050 || isRevealed) return;
    setUsed5050(true);

    // Find 2 wrong options to hide
    const wrongOptions = question.options.filter((o) => !o.isCorrect);
    const toHide = wrongOptions.slice(0, 2).map((o) => o.id);
    setHiddenOptions(toHide);
  }, [used5050, isRevealed, question.options]);

  const handleHint = useCallback(() => {
    if (usedHint || isRevealed) return;
    setUsedHint(true);
    setShowHint(true);
  }, [usedHint, isRevealed]);

  const selectedOptionData = question.options.find((o) => o.id === selectedOption);
  const isCorrect = selectedOptionData?.isCorrect ?? false;

  // Timer color logic
  const getTimerColor = () => {
    if (timeLeft <= 5) return 'text-[#EF4444]';
    if (timeLeft <= 10) return 'text-[#F59E0B]';
    return 'text-[#0ABAB5]';
  };

  const getTimerBorder = () => {
    if (timeLeft <= 5) return 'border-[#EF4444]';
    if (timeLeft <= 10) return 'border-[#F59E0B]';
    return 'border-[#0ABAB5]';
  };

  const visibleOptions = question.options.filter((o) => !hiddenOptions.includes(o.id));

  return (
    <div className="flex flex-col gap-4">
      {/* Progress bar */}
      <div className="flex items-center justify-between px-1">
        <span className="text-caption text-[#8A8A8A]">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-[#F59E0B]" />
          <span className="text-caption text-[#F59E0B]">{score} pts</span>
        </div>
      </div>

      {/* Segmented progress */}
      <div className="flex gap-1 px-1">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < questionNumber ? 'bg-[#0ABAB5]' : i === questionNumber - 1 ? 'bg-[#0ABAB5]/50' : 'bg-[#2A2A2A]'
            }`}
          />
        ))}
      </div>

      {/* Timer */}
      {!isRevealed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full border ${getTimerBorder()} bg-transparent self-center`}
        >
          <Clock size={16} className={getTimerColor()} />
          <span className={`text-h4 font-bold ${getTimerColor()}`}>
            00:{timeLeft.toString().padStart(2, '0')}
          </span>
        </motion.div>
      )}

      {/* Streak indicator */}
      {streak >= 2 && !isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-1"
        >
          <Zap size={14} className="text-[#F59E0B]" />
          <span className="text-caption text-[#F59E0B]">
            {streak + 1} streak! Next: +5 bonus
          </span>
        </motion.div>
      )}

      {/* Question */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1A1A1A] rounded-xl p-5"
      >
        <p className="text-body text-white leading-relaxed">{question.question}</p>
      </motion.div>

      {/* Hint display */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#0ABAB5]/10 border border-[#0ABAB5]/30 rounded-lg p-3"
          >
            <div className="flex items-start gap-2">
              <Lightbulb size={16} className="text-[#0ABAB5] shrink-0 mt-0.5" />
              <p className="text-body-small text-[#0ABAB5]">{question.hint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer Options */}
      <div className="flex flex-col gap-3">
        {visibleOptions.map((option, index) => {
          const isSelected = selectedOption === option.id;
          const isOptionCorrect = option.isCorrect;

          let borderClass = 'border-[#2A2A2A] bg-[#1A1A1A]';
          if (isRevealed) {
            if (isOptionCorrect) {
              borderClass = 'border-[#22C55E] bg-[rgba(34,197,94,0.1)]';
            } else if (isSelected && !isOptionCorrect) {
              borderClass = 'border-[#EF4444] bg-[rgba(239,68,68,0.1)]';
            } else {
              borderClass = 'border-[#2A2A2A] bg-[#1A1A1A] opacity-40';
            }
          } else if (isSelected) {
            borderClass = 'border-[#0ABAB5] shadow-[0_0_0_2px_rgba(10,186,181,0.2)]';
          }

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.06 }}
              onClick={() => handleSelect(option.id)}
              disabled={isRevealed}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 active:scale-[0.98] ${borderClass}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[#8A8A8A] font-medium text-sm w-6">
                  {String.fromCharCode(65 + index)}.
                </span>
                <p className="text-body-small text-white flex-1">{option.text}</p>
                {isRevealed && isOptionCorrect && (
                  <CheckCircle size={20} className="text-[#22C55E] shrink-0" />
                )}
                {isRevealed && isSelected && !isOptionCorrect && (
                  <XCircle size={20} className="text-[#EF4444] shrink-0" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback after reveal */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {timeLeft === 0 && !selectedOption ? (
              <div className="p-4 rounded-xl border border-[#F59E0B] bg-[rgba(245,158,11,0.08)]">
                <p className="text-body-small text-[#F59E0B]">Time&apos;s up! The correct answer is highlighted above.</p>
              </div>
            ) : (
              <div
                className={`p-4 rounded-xl border ${
                  isCorrect
                    ? 'border-[#22C55E] bg-[rgba(34,197,94,0.08)]'
                    : 'border-[#EF4444] bg-[rgba(239,68,68,0.08)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle size={18} className="text-[#22C55E]" />
                      <span className="text-sm font-semibold text-[#22C55E]">
                        Correct! +10 pts
                        {streak >= 2 && ' (+5 streak bonus)'}
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-[#EF4444]" />
                      <span className="text-sm font-semibold text-[#EF4444]">Incorrect</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lifelines & Actions */}
      <div className="flex flex-col gap-3 mt-2">
        {!isRevealed ? (
          <>
            <div className="flex gap-2">
              <button
                onClick={handle5050}
                disabled={used5050}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                  used5050
                    ? 'border-[#2A2A2A] bg-[#1A1A1A] text-[#4A4A4A] opacity-50'
                    : 'border-[#2A2A2A] bg-[#1A1A1A] text-white active:scale-[0.97]'
                }`}
              >
                <Scissors size={16} />
                <span>50/50</span>
              </button>
              <button
                onClick={handleHint}
                disabled={usedHint}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all ${
                  usedHint
                    ? 'border-[#2A2A2A] bg-[#1A1A1A] text-[#4A4A4A] opacity-50'
                    : 'border-[#2A2A2A] bg-[#1A1A1A] text-white active:scale-[0.97]'
                }`}
              >
                <Lightbulb size={16} />
                <span>Hint</span>
              </button>
              <button
                onClick={onSkip}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] text-white text-sm font-medium active:scale-[0.97] transition-all"
              >
                <SkipForward size={16} />
                <span>Skip</span>
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={onNext}
            className="w-full h-14 bg-[#0ABAB5] rounded-full flex items-center justify-center active:scale-[0.97] transition-transform"
          >
            <span className="text-button text-white">
              {questionNumber >= totalQuestions ? 'See Results' : 'Next Question'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

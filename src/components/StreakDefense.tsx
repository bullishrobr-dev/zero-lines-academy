import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Flashcard } from "../hooks/useStreakDefense";

export interface StreakDefenseProps {
  streakDays: number;
  flashcards: Flashcard[];
  onDefend: () => void;
  onDismiss: () => void;
}

interface CardResult {
  cardId: string;
  selectedIndex: number;
  correct: boolean;
}

export default function StreakDefense({
  streakDays,
  flashcards,
  onDefend,
  onDismiss,
}: StreakDefenseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<CardResult[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + (showExplanation ? 1 : 0)) / flashcards.length) * 100;

  const handleOptionSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    setResults((prev) => [
      ...prev,
      {
        cardId: currentCard.id,
        selectedIndex: index,
        correct: index === currentCard.correctIndex,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const correctCount = results.filter((r) => r.correct).length;

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="w-full max-w-[380px] bg-[#0A0A0A] border border-[#1A1A1A] rounded-3xl p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-[#0ABAB5]/20 flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-4xl">
              {correctCount === flashcards.length ? "🔥" : "✅"}
            </span>
          </motion.div>

          <h3 className="text-xl font-bold text-white mb-1">
            {correctCount === flashcards.length
              ? "Streak Defended!"
              : "Review Complete!"}
          </h3>
          <p className="text-[#888] text-sm mb-4">
            You got {correctCount}/{flashcards.length} correct.
            <br />
            Your <span className="text-[#0ABAB5] font-semibold">{streakDays}-day streak</span> is safe!
          </p>

          {/* Results summary */}
          <div className="flex justify-center gap-2 mb-6">
            {results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  r.correct ? "bg-[#0ABAB5]/20" : "bg-red-500/20"
                }`}
              >
                {r.correct ? "✅" : "❌"}
              </motion.div>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onDefend}
            className="w-full py-3.5 rounded-xl bg-[#0ABAB5] text-black font-semibold text-sm hover:bg-[#0ABAB5]/90 transition-colors"
          >
            Keep Streak Alive!
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-[380px] bg-[#0A0A0A] border border-[#1A1A1A] rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 pb-3">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-[#0ABAB5] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Warning */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h3 className="text-base font-bold text-white">
                Your {streakDays}-day streak is at risk!
              </h3>
              <p className="text-xs text-[#888]">
                Review {flashcards.length} flashcards to keep it alive
              </p>
            </div>
          </div>
        </div>

        {/* Card counter */}
        <div className="px-5 mb-2">
          <span className="text-[10px] uppercase tracking-wider text-[#0ABAB5] font-semibold">
            Card {currentIndex + 1} of {flashcards.length}
          </span>
        </div>

        {/* Flashcard */}
        <div className="px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Question */}
              <p className="text-white text-sm font-medium leading-relaxed mb-4">
                {currentCard.question}
              </p>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {currentCard.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentCard.correctIndex;
                  let borderClass = "border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A]";
                  if (showExplanation) {
                    if (isCorrect) borderClass = "border-[#0ABAB5] bg-[#0ABAB5]/10";
                    else if (isSelected && !isCorrect) borderClass = "border-red-500/50 bg-red-500/10";
                    else borderClass = "border-[#1A1A1A] bg-[#111] opacity-50";
                  } else if (isSelected) {
                    borderClass = "border-[#0ABAB5] bg-[#0ABAB5]/10";
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileTap={!showExplanation ? { scale: 0.98 } : undefined}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={showExplanation}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all ${borderClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                            showExplanation && isCorrect
                              ? "bg-[#0ABAB5] border-[#0ABAB5] text-black"
                              : showExplanation && isSelected && !isCorrect
                              ? "bg-red-500 border-red-500 text-white"
                              : "border-[#333] text-[#888]"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm text-white">{option}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#111] border border-[#1A1A1A] rounded-xl p-3 mb-4">
                      <p className="text-xs text-[#888]">
                        <span className="text-[#0ABAB5] font-semibold">Explanation: </span>
                        {currentCard.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-5 pt-2">
          {showExplanation ? (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl bg-[#0ABAB5] text-black font-semibold text-sm hover:bg-[#0ABAB5]/90 transition-colors"
            >
              {currentIndex < flashcards.length - 1 ? "Next Card →" : "Finish Review"}
            </motion.button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={onDismiss}
                className="flex-1 py-3.5 rounded-xl border border-[#1A1A1A] text-[#666] text-sm font-medium hover:border-[#333] hover:text-[#AAA] transition-colors"
              >
                I'll risk it
              </button>
              <div className="flex-1" />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

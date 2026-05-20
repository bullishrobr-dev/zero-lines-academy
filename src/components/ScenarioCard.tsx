import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronRight, User } from 'lucide-react';

export interface ScenarioOption {
  id: string;
  text: string;
  score: number; // 10 = best, 5 = okay, 0 = poor
  feedback: string;
}

export interface ScenarioData {
  id: string;
  title: string;
  customerName: string;
  customerAge: string;
  customerOrigin: string;
  contextTags: string[];
  scenarioText: string;
  options: ScenarioOption[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface ScenarioCardProps {
  scenario: ScenarioData;
  onComplete: (score: number) => void;
  onNext?: () => void;
}

export default function ScenarioCard({ scenario, onComplete, onNext }: ScenarioCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSelect = (optionId: string) => {
    if (isRevealed) return;
    setSelectedOption(optionId);
    setIsRevealed(true);

    const option = scenario.options.find((o) => o.id === optionId);
    if (option) {
      onComplete(option.score);
    }
  };

  const selectedData = scenario.options.find((o) => o.id === selectedOption);

  const getDifficultyColor = (d: string) => {
    switch (d) {
      case 'Easy':
        return 'bg-[#22C55E]/20 text-[#22C55E]';
      case 'Medium':
        return 'bg-[#F59E0B]/20 text-[#F59E0B]';
      case 'Hard':
        return 'bg-[#EF4444]/20 text-[#EF4444]';
      default:
        return 'bg-[#8A8A8A]/20 text-[#8A8A8A]';
    }
  };

  const getScoreBorder = (score: number) => {
    if (score >= 10) return 'border-[#22C55E] bg-[rgba(34,197,94,0.1)]';
    if (score >= 5) return 'border-[#F59E0B] bg-[rgba(245,158,11,0.1)]';
    return 'border-[#EF4444] bg-[rgba(239,68,68,0.1)]';
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Customer Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#1A1A1A] rounded-xl p-5 flex flex-col items-center text-center gap-3"
      >
        <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center">
          <User size={28} className="text-[#0ABAB5]" />
        </div>
        <div>
          <h4 className="text-h4 text-white">{scenario.customerName}, {scenario.customerAge}</h4>
          <p className="text-caption text-[#8A8A8A] mt-1">{scenario.customerOrigin}</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {scenario.contextTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-[#2A2A2A] text-[#0ABAB5] text-caption"
            >
              {tag}
            </span>
          ))}
          <span className={`px-3 py-1 rounded-full text-caption ${getDifficultyColor(scenario.difficulty)}`}>
            {scenario.difficulty}
          </span>
        </div>
      </motion.div>

      {/* Scenario Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-[#1A1A1A] rounded-xl rounded-tl-none p-5 ml-2"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center shrink-0 mt-0.5">
            <User size={16} className="text-[#8A8A8A]" />
          </div>
          <p className="text-body text-white leading-relaxed">
            &ldquo;{scenario.scenarioText}&rdquo;
          </p>
        </div>
      </motion.div>

      {/* Prompt */}
      <p className="text-body-small text-[#8A8A8A] px-1">How do you respond?</p>

      {/* Response Options */}
      <div className="flex flex-col gap-3">
        {scenario.options.map((option, index) => {
          const isSelected = selectedOption === option.id;
          const showCorrect = isRevealed && option.score >= 10;
          const showWrong = isRevealed && isSelected && option.score < 10;
          const showOkay = isRevealed && isSelected && option.score >= 5 && option.score < 10;

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + index * 0.08 }}
              onClick={() => handleSelect(option.id)}
              disabled={isRevealed}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                isRevealed
                  ? isSelected
                    ? getScoreBorder(option.score)
                    : option.score >= 10
                      ? 'border-[#22C55E] bg-[rgba(34,197,94,0.1)]'
                      : 'border-[#2A2A2A] bg-[#1A1A1A] opacity-50'
                  : 'border-[#2A2A2A] bg-[#1A1A1A] active:scale-[0.98]'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-[#0ABAB5] font-semibold text-sm mt-0.5 shrink-0">
                  {String.fromCharCode(65 + index)}.
                </span>
                <p className="text-body-small text-white flex-1">{option.text}</p>
                {showCorrect && <CheckCircle size={20} className="text-[#22C55E] shrink-0" />}
                {showWrong && <XCircle size={20} className="text-[#EF4444] shrink-0" />}
                {showOkay && <CheckCircle size={20} className="text-[#F59E0B] shrink-0" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {isRevealed && selectedData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={`p-4 rounded-xl border ${
                selectedData.score >= 10
                  ? 'border-[#22C55E] bg-[rgba(34,197,94,0.08)]'
                  : selectedData.score >= 5
                    ? 'border-[#F59E0B] bg-[rgba(245,158,11,0.08)]'
                    : 'border-[#EF4444] bg-[rgba(239,68,68,0.08)]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {selectedData.score >= 10 ? (
                  <CheckCircle size={18} className="text-[#22C55E]" />
                ) : selectedData.score >= 5 ? (
                  <CheckCircle size={18} className="text-[#F59E0B]" />
                ) : (
                  <XCircle size={18} className="text-[#EF4444]" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    selectedData.score >= 10
                      ? 'text-[#22C55E]'
                      : selectedData.score >= 5
                        ? 'text-[#F59E0B]'
                        : 'text-[#EF4444]'
                  }`}
                >
                  {selectedData.score >= 10
                    ? 'Great choice! +10 pts'
                    : selectedData.score >= 5
                      ? 'Not bad! +5 pts'
                      : 'Could be better'}
                </span>
              </div>
              <p className="text-body-small text-white/90 ml-6">{selectedData.feedback}</p>
            </div>

            {onNext && (
              <button
                onClick={onNext}
                className="w-full mt-4 h-14 bg-[#0ABAB5] rounded-full flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
              >
                <span className="text-button text-white">Next Scenario</span>
                <ChevronRight size={18} className="text-white" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

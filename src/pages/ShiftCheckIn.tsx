import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Flame, Target, ChevronDown, Sparkles } from 'lucide-react';
import { useDailyFlow } from '../hooks/useDailyFlow';
import { focusTechniques } from '../data/dailyDoses';

const moods = [
  { emoji: '😴', label: 'Tired', labelEs: 'Cansada', value: 1 },
  { emoji: '😊', label: 'Good', labelEs: 'Bien', value: 2 },
  { emoji: '🔥', label: 'Ready', labelEs: 'Lista', value: 3 },
  { emoji: '💪', label: 'Strong', labelEs: 'Fuerte', value: 4 },
  { emoji: '🚀', label: 'Unstoppable', labelEs: 'Imparable', value: 5 },
];

export default function ShiftCheckIn() {
  const navigate = useNavigate();
  const { checkIn, getCurrentStreak } = useDailyFlow();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [stopGoal, setStopGoal] = useState(20);
  const [focusTechnique, setFocusTechnique] = useState(focusTechniques[0].id);
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const streak = getCurrentStreak();

  const handleSubmit = () => {
    if (selectedMood === null) return;
    checkIn({
      mood: selectedMood,
      goal: stopGoal,
      focus: focusTechnique,
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  const selectedTechnique = focusTechniques.find((t) => t.id === focusTechnique);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white px-5 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0ABAB5]/20 to-[#0ABAB5]/5 border border-[#0ABAB5]/20 mb-4">
          <SunriseIcon className="w-8 h-8 text-[#0ABAB5]" />
        </div>
        <h1 className="text-2xl font-bold mb-1">Good Morning!</h1>
        <p className="text-[#0ABAB5] text-sm">Ready to crush it today?</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-7"
          >
            {/* Mood Picker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0ABAB5]" />
                How are you feeling?
              </h2>
              <div className="flex justify-between gap-2">
                {moods.map((mood, index) => (
                  <motion.button
                    key={mood.value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-200 flex-1 ${
                      selectedMood === mood.value
                        ? 'bg-[#0ABAB5]/15 border-[#0ABAB5] shadow-[0_0_15px_rgba(10,186,181,0.2)]'
                        : 'bg-[#141414] border-[#222] hover:border-[#333]'
                    }`}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-[10px] text-gray-400 leading-tight text-center">
                      {mood.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Stop Goal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#0ABAB5]" />
                How many stops do you aim for today?
              </h2>
              <div className="bg-[#141414] border border-[#222] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setStopGoal((prev) => Math.max(5, prev - 5))}
                    className="w-10 h-10 rounded-lg bg-[#222] text-white font-bold text-lg hover:bg-[#333] transition-colors"
                  >
                    -
                  </button>
                  <motion.div
                    key={stopGoal}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold text-[#0ABAB5]"
                  >
                    {stopGoal}
                  </motion.div>
                  <button
                    onClick={() => setStopGoal((prev) => Math.min(50, prev + 5))}
                    className="w-10 h-10 rounded-lg bg-[#222] text-white font-bold text-lg hover:bg-[#333] transition-colors"
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={stopGoal}
                  onChange={(e) => setStopGoal(Number(e.target.value))}
                  className="w-full accent-[#0ABAB5]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>
            </motion.div>

            {/* Focus Technique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#0ABAB5]" />
                One thing to focus on today
              </h2>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full bg-[#141414] border border-[#222] rounded-xl px-4 py-3.5 text-left text-sm flex items-center justify-between hover:border-[#333] transition-colors"
                >
                  <span>{selectedTechnique?.label ?? 'Select a focus'}</span>
                  <motion.div
                    animate={{ rotate: showDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scaleY: 0.8 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -8, scaleY: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-[#333] rounded-xl overflow-hidden z-50 shadow-2xl origin-top"
                    >
                      {focusTechniques.map((tech) => (
                        <button
                          key={tech.id}
                          onClick={() => {
                            setFocusTechnique(tech.id);
                            setShowDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                            focusTechnique === tech.id
                              ? 'bg-[#0ABAB5]/15 text-[#0ABAB5]'
                              : 'text-gray-300 hover:bg-[#222]'
                          }`}
                        >
                          {tech.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Streak Banner */}
            {streak > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-[#0ABAB5]/10 to-[#0ABAB5]/5 border border-[#0ABAB5]/20 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-sm font-semibold text-[#0ABAB5]">
                    {streak}-day streak!
                  </p>
                  <p className="text-xs text-gray-400">
                    {streak >= 7
                      ? "You're on fire! Keep the momentum going!"
                      : streak >= 3
                      ? 'Great consistency! Keep it up!'
                      : 'Building momentum. One more day!'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <button
                onClick={handleSubmit}
                disabled={selectedMood === null}
                className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
                  selectedMood !== null
                    ? 'bg-[#0ABAB5] text-black shadow-[0_0_25px_rgba(10,186,181,0.3)] hover:shadow-[0_0_35px_rgba(10,186,181,0.5)] active:scale-[0.98]'
                    : 'bg-[#222] text-gray-500 cursor-not-allowed'
                }`}
              >
                {selectedMood !== null ? "Let's Go!" : 'Pick a mood to continue'}
              </button>
              {selectedMood !== null && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xs text-gray-500 mt-2"
                >
                  +5 XP for checking in
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        ) : (
          /* Success State */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100 }}
              className="w-20 h-20 rounded-full bg-[#0ABAB5]/20 border-2 border-[#0ABAB5] flex items-center justify-center mb-6"
            >
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <CheckIcon className="w-10 h-10 text-[#0ABAB5]" />
              </motion.div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold mb-2"
            >
              Checked In! +5 XP
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-sm"
            >
              Goal: {stopGoal} stops. Focus: {selectedTechnique?.label}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 text-xs text-[#0ABAB5]/60"
            >
              Redirecting to dashboard...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SunriseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M4.93 19.07l2.83-2.83M12 22v-4M19.07 19.07l-2.83-2.83M22 12h-4M19.07 4.93l-2.83 2.83" />
      <path d="M17 18a5 5 0 0 0-10 0" />
      <path d="M12 9V2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

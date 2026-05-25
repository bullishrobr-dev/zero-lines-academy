import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, DoorOpen, Star, Zap, TrendingUp } from 'lucide-react';
import { useDailyFlow } from '../hooks/useDailyFlow';
import { focusTechniques } from '../data/dailyDoses';

export default function EndOfShift() {
  const navigate = useNavigate();
  const { endOfShift, getCurrentStreak, todayState } = useDailyFlow();

  const [stops, setStops] = useState('');
  const [inside, setInside] = useState('');
  const [bestMoment, setBestMoment] = useState('');
  const [challenge, setChallenge] = useState('');
  const [triedFocus, setTriedFocus] = useState<boolean | null>(null);
  const [energyRating, setEnergyRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const streak = getCurrentStreak();
  const focusId = todayState?.checkIn?.focus ?? focusTechniques[0].id;
  const focusLabel =
    focusTechniques.find((t) => t.id === focusId)?.label ?? '';

  const canSubmit =
    stops !== '' &&
    inside !== '' &&
    bestMoment.trim().length > 0 &&
    challenge.trim().length > 0 &&
    triedFocus !== null &&
    energyRating > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    endOfShift({
      stops: Number(stops),
      inside: Number(inside),
      bestMoment: bestMoment.trim(),
      challenge: challenge.trim(),
      triedFocus,
      energyRating,
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 3500);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.08, duration: 0.4 },
    }),
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white px-5 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0ABAB5]/20 to-[#0ABAB5]/5 border border-[#0ABAB5]/20 mb-4">
          <MoonIcon className="w-8 h-8 text-[#0ABAB5]" />
        </div>
        <h1 className="text-2xl font-bold mb-1">Great Shift!</h1>
        <p className="text-[#0ABAB5] text-sm">Let's reflect.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Q1: Stops */}
            <motion.div
              custom={0}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0ABAB5]" />
                How many people did you stop today?
              </label>
              <div className="bg-[#141414] border border-[#222] rounded-xl p-4">
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() =>
                      setStops((prev) =>
                        prev === '' ? '0' : String(Math.max(0, Number(prev) - 1))
                      )
                    }
                    className="w-10 h-10 rounded-lg bg-[#222] text-white font-bold text-lg hover:bg-[#333] transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={stops}
                    onChange={(e) =>
                      setStops(
                        e.target.value === ''
                          ? ''
                          : String(Math.max(0, Number(e.target.value)))
                      )
                    }
                    placeholder="0"
                    className="w-20 bg-transparent text-center text-3xl font-bold text-[#0ABAB5] outline-none placeholder:text-gray-600"
                  />
                  <button
                    onClick={() =>
                      setStops((prev) =>
                        prev === '' ? '1' : String(Number(prev) + 1)
                      )
                    }
                    className="w-10 h-10 rounded-lg bg-[#222] text-white font-bold text-lg hover:bg-[#333] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Q2: Brought Inside */}
            <motion.div
              custom={1}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <DoorOpen className="w-4 h-4 text-[#0ABAB5]" />
                How many did you bring inside?
              </label>
              <div className="bg-[#141414] border border-[#222] rounded-xl p-4">
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() =>
                      setInside((prev) =>
                        prev === '' ? '0' : String(Math.max(0, Number(prev) - 1))
                      )
                    }
                    className="w-10 h-10 rounded-lg bg-[#222] text-white font-bold text-lg hover:bg-[#333] transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={inside}
                    onChange={(e) =>
                      setInside(
                        e.target.value === ''
                          ? ''
                          : String(Math.max(0, Number(e.target.value)))
                      )
                    }
                    placeholder="0"
                    className="w-20 bg-transparent text-center text-3xl font-bold text-[#0ABAB5] outline-none placeholder:text-gray-600"
                  />
                  <button
                    onClick={() =>
                      setInside((prev) =>
                        prev === '' ? '1' : String(Number(prev) + 1)
                      )
                    }
                    className="w-10 h-10 rounded-lg bg-[#222] text-white font-bold text-lg hover:bg-[#333] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Q3: Best Moment */}
            <motion.div
              custom={2}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-[#0ABAB5]" />
                Best moment of the day?
              </label>
              <textarea
                value={bestMoment}
                onChange={(e) => setBestMoment(e.target.value)}
                placeholder="The compliment stop that worked perfectly..."
                rows={3}
                className="w-full bg-[#141414] border border-[#222] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#0ABAB5]/50 resize-none transition-colors"
              />
            </motion.div>

            {/* Q4: Biggest Challenge */}
            <motion.div
              custom={3}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#0ABAB5]" />
                What was your biggest challenge?
              </label>
              <textarea
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="Dealing with rejections early in the shift..."
                rows={3}
                className="w-full bg-[#141414] border border-[#222] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#0ABAB5]/50 resize-none transition-colors"
              />
            </motion.div>

            {/* Q5: Tried Focus Technique */}
            <motion.div
              custom={4}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Did you try today's focus technique?
              </label>
              <p className="text-xs text-gray-500 mb-3">{focusLabel}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setTriedFocus(true)}
                  className={`flex-1 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    triedFocus === true
                      ? 'bg-[#0ABAB5]/15 border-[#0ABAB5] text-[#0ABAB5] shadow-[0_0_15px_rgba(10,186,181,0.15)]'
                      : 'bg-[#141414] border-[#222] text-gray-400 hover:border-[#333]'
                  }`}
                >
                  Yes, I crushed it!
                </button>
                <button
                  onClick={() => setTriedFocus(false)}
                  className={`flex-1 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    triedFocus === false
                      ? 'bg-red-500/10 border-red-400/50 text-red-400'
                      : 'bg-[#141414] border-[#222] text-gray-400 hover:border-[#333]'
                  }`}
                >
                  Not today
                </button>
              </div>
            </motion.div>

            {/* Q6: Energy Rating */}
            <motion.div
              custom={5}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Rate your energy today
              </label>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setEnergyRating(star)}
                    className="relative"
                  >
                    <Star
                      className={`w-10 h-10 transition-all duration-200 ${
                        star <= energyRating
                          ? 'text-[#0ABAB5] fill-[#0ABAB5] drop-shadow-[0_0_8px_rgba(10,186,181,0.4)]'
                          : 'text-gray-700'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              <p className="text-center text-xs text-gray-500 mt-2">
                {energyRating === 1 && 'Drained'}
                {energyRating === 2 && 'Low'}
                {energyRating === 3 && 'Okay'}
                {energyRating === 4 && 'Good'}
                {energyRating === 5 && 'Fully Charged!'}
              </p>
            </motion.div>

            {/* Streak */}
            {streak > 0 && (
              <motion.div
                custom={6}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-r from-[#0ABAB5]/10 to-[#0ABAB5]/5 border border-[#0ABAB5]/20 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-sm font-semibold text-[#0ABAB5]">
                    {streak}-day streak active
                  </p>
                  <p className="text-xs text-gray-400">
                    Complete this reflection to keep it alive!
                  </p>
                </div>
              </motion.div>
            )}

            {/* Submit */}
            <motion.div
              custom={7}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="pt-2"
            >
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
                  canSubmit
                    ? 'bg-[#0ABAB5] text-black shadow-[0_0_25px_rgba(10,186,181,0.3)] hover:shadow-[0_0_35px_rgba(10,186,181,0.5)] active:scale-[0.98]'
                    : 'bg-[#222] text-gray-500 cursor-not-allowed'
                }`}
              >
                {canSubmit ? 'Complete Reflection' : 'Fill all fields to submit'}
              </button>
              {canSubmit && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xs text-gray-500 mt-2"
                >
                  +10 XP + streak protection
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
            className="flex flex-col items-center justify-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100 }}
              className="w-20 h-20 rounded-full bg-[#0ABAB5]/20 border-2 border-[#0ABAB5] flex items-center justify-center mb-6"
            >
              <CheckIcon className="w-10 h-10 text-[#0ABAB5]" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-bold mb-1"
            >
              Reflection Saved! +10 XP
            </motion.h2>

            {streak > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[#0ABAB5] text-sm mb-4"
              >
                🔥 {streak}-day streak maintained!
              </motion.p>
            )}

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full bg-[#141414] border border-[#222] rounded-2xl p-5 mt-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-[#0ABAB5]" />
                <span className="text-sm font-semibold text-gray-300">
                  Today's Summary
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0A0A0A] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#0ABAB5]">{stops}</p>
                  <p className="text-[10px] text-gray-500 uppercase">Stops</p>
                </div>
                <div className="bg-[#0A0A0A] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#0ABAB5]">{inside}</p>
                  <p className="text-[10px] text-gray-500 uppercase">Inside</p>
                </div>
                <div className="bg-[#0A0A0A] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#0ABAB5]">
                    {Number(stops) > 0 ? Math.round((Number(inside) / Number(stops)) * 100) : 0}
                    %
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase">Conversion</p>
                </div>
                <div className="bg-[#0A0A0A] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#0ABAB5]">
                    {'⭐'.repeat(energyRating)}
                  </p>
                  <p className="text-[10px] text-gray-500 uppercase">Energy</p>
                </div>
              </div>
            </motion.div>

            {Number(stops) >= Number(inside) * 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-400 text-sm mt-6 text-center"
              >
                You're improving! Keep pushing those numbers up.
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
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

function MoonIcon({ className }: { className?: string }) {
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
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

// ─────────────────────────────────────────────────────────────
// DailyChallengeCard.tsx — Daily challenge with mark complete
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Flame, Target } from 'lucide-react';

export interface Challenge {
  id: string;
  text: string;
  xpReward: number;
}

const ALL_CHALLENGES: Challenge[] = [
  { id: 'c1', text: 'Practice the Syringe pitch out loud 3 times', xpReward: 20 },
  { id: 'c2', text: 'Use a compliment-based stop on 5 people today', xpReward: 20 },
  { id: 'c3', text: 'Close a sale using the two-choice framework', xpReward: 30 },
  { id: 'c4', text: 'Demo the Peeling to 3 customers with full routine', xpReward: 20 },
  { id: 'c5', text: 'Practice handling the "I need to think about it" objection', xpReward: 20 },
  { id: 'c6', text: 'Apply Cialdini\'s reciprocity principle in 3 interactions', xpReward: 25 },
  { id: 'c7', text: 'Read 3 buying signals and act on them', xpReward: 20 },
  { id: 'c8', text: 'Use the Nail Kit upsell on every sale today', xpReward: 25 },
  { id: 'c9', text: 'Complete the Scrub full-body demo for a customer', xpReward: 20 },
  { id: 'c10', text: 'Name 5 features and benefits of the Syringe from memory', xpReward: 20 },
  { id: 'c11', text: 'Use urgency language in 5 closing attempts', xpReward: 20 },
  { id: 'c12', text: 'Practice the voucher close on a hesitant customer', xpReward: 25 },
  { id: 'c13', text: 'Identify a couple dynamic and adapt your pitch', xpReward: 20 },
  { id: 'c14', text: 'Go 1 hour without saying "No problem" or "Sure"', xpReward: 20 },
  { id: 'c15', text: 'Get 2 customer referrals using the referral script', xpReward: 30 },
];

function getDailySeed(): number {
  const today = new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash + today.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getTodaysChallenge(): Challenge {
  const seed = getDailySeed();
  return ALL_CHALLENGES[seed % ALL_CHALLENGES.length];
}

interface DailyChallengeCardProps {
  isCompleted: boolean;
  onComplete: () => void;
}

export default function DailyChallengeCard({
  isCompleted,
  onComplete,
}: DailyChallengeCardProps) {
  const [justCompleted, setJustCompleted] = useState(false);
  const challenge = useMemo(() => getTodaysChallenge(), []);

  const handleComplete = () => {
    if (isCompleted || justCompleted) return;
    setJustCompleted(true);
    onComplete();
  };

  const isDone = isCompleted || justCompleted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
      className="relative overflow-hidden rounded-2xl border border-[#1A1A1A] bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F]"
    >
      {/* Subtle glow accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="p-5 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
            <Flame size={16} className="text-[#F59E0B]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Daily Challenge</h3>
            <p className="text-[11px] text-[#8A8A8A]">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
          {isDone && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto flex items-center gap-1 text-[#0ABAB5]"
            >
              <Check size={14} strokeWidth={2.5} />
              <span className="text-xs font-medium">Done</span>
            </motion.div>
          )}
        </div>

        {/* Challenge text */}
        <div className="flex items-start gap-3 mb-4">
          <Target size={18} className="text-[#F59E0B] mt-0.5 shrink-0" />
          <p className="text-sm text-white/90 leading-relaxed">{challenge.text}</p>
        </div>

        {/* Reward + Action */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#8A8A8A]">
            Reward:{" "}
            <span className="text-[#F59E0B] font-semibold">+{challenge.xpReward} XP</span>
          </span>

          {!isDone ? (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleComplete}
              className="flex items-center gap-1.5 bg-[#0ABAB5] hover:bg-[#09a9a4] text-black font-bold text-xs px-4 py-2.5 rounded-full transition-colors shadow-[0_0_12px_rgba(10,186,181,0.25)]"
            >
              <Check size={14} strokeWidth={2.5} />
              Mark Complete
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 text-[#0ABAB5]"
            >
              <div className="w-5 h-5 rounded-full bg-[#0ABAB5]/20 flex items-center justify-center">
                <Check size={12} strokeWidth={2.5} className="text-[#0ABAB5]" />
              </div>
              <span className="text-xs font-medium">Resets tomorrow</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export { ALL_CHALLENGES, getTodaysChallenge };

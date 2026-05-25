import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PeerShoutoutProps {
  employees: { id: string; name: string; initials: string; flag: string }[];
  currentUserId: string;
  onSubmit: (to: string, message: string, reaction: string) => void;
  onClose: () => void;
}

const QUICK_REACTIONS = [
  { emoji: "🔥", label: "Great stop" },
  { emoji: "💪", label: "Amazing energy" },
  { emoji: "🎯", label: "Nailed the close" },
  { emoji: "⭐", label: "Team player" },
];

export default function PeerShoutout({
  employees,
  currentUserId,
  onSubmit,
  onClose,
}: PeerShoutoutProps) {
  const [selectedTeammate, setSelectedTeammate] = useState("");
  const [message, setMessage] = useState("");
  const [selectedReaction, setSelectedReaction] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const teammates = employees.filter((e) => e.id !== currentUserId);

  const handleSubmit = () => {
    if (!selectedTeammate || !message.trim()) return;
    onSubmit(selectedTeammate, message.trim(), selectedReaction);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const canSubmit = selectedTeammate && message.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 400, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 400, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-[430px] rounded-t-3xl bg-[#0A0A0A] border border-[#1A1A1A] p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full bg-[#2A2A2A]" />
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center py-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-[#0ABAB5]/20 flex items-center justify-center mb-4"
              >
                <span className="text-4xl">🎉</span>
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-1">Shoutout Sent!</h3>
              <p className="text-[#888] text-sm text-center">
                You both earned <span className="text-[#0ABAB5] font-semibold">+5 XP</span>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">👏</span>
                <div>
                  <h3 className="text-lg font-bold text-white">Shoutout a Teammate</h3>
                  <p className="text-xs text-[#888]">Recognize great work, earn 5 XP each</p>
                </div>
              </div>

              {/* Teammate Select */}
              <label className="block text-sm font-medium text-[#AAA] mb-2">
                Select teammate
              </label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {teammates.map((teammate) => (
                  <motion.button
                    key={teammate.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedTeammate(teammate.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-colors ${
                      selectedTeammate === teammate.id
                        ? "border-[#0ABAB5] bg-[#0ABAB5]/10"
                        : "border-[#1A1A1A] bg-[#111] hover:border-[#2A2A2A]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-xs font-bold text-[#0ABAB5]">
                      {teammate.initials}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-medium text-white truncate">{teammate.name}</p>
                      <p className="text-[10px] text-[#888]">{teammate.flag}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Message */}
              <label className="block text-sm font-medium text-[#AAA] mb-2">
                What did they do great today?
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="They absolutely crushed that difficult customer..."
                className="w-full h-20 p-3 rounded-xl bg-[#111] border border-[#1A1A1A] text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#0ABAB5] resize-none mb-4"
              />

              {/* Quick Reactions */}
              <label className="block text-sm font-medium text-[#AAA] mb-2">
                Quick reaction
              </label>
              <div className="flex gap-2 mb-5">
                {QUICK_REACTIONS.map((reaction) => (
                  <motion.button
                    key={reaction.label}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedReaction(reaction.label)}
                    className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl border text-xs transition-colors ${
                      selectedReaction === reaction.label
                        ? "border-[#0ABAB5] bg-[#0ABAB5]/10 text-[#0ABAB5]"
                        : "border-[#1A1A1A] bg-[#111] text-[#888] hover:border-[#2A2A2A]"
                    }`}
                  >
                    <span className="text-lg">{reaction.emoji}</span>
                    <span className="text-[10px] text-center leading-tight">{reaction.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors ${
                  canSubmit
                    ? "bg-[#0ABAB5] text-black hover:bg-[#0ABAB5]/90"
                    : "bg-[#1A1A1A] text-[#555] cursor-not-allowed"
                }`}
              >
                Send Shoutout (+5 XP)
              </motion.button>

              {/* Dismiss */}
              <button
                onClick={onClose}
                className="w-full mt-2 py-2 text-xs text-[#666] hover:text-[#AAA] transition-colors"
              >
                Maybe later
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Check, Clock, X, Lightbulb, MessageSquare, Wand2, Brain, Award } from 'lucide-react';
import { useDailyFlow } from '../hooks/useDailyFlow';
import { getTodaysDose } from '../data/dailyDoses';

interface DailyDoseCardProps {
  onOpen?: () => void;
}

export function DailyDoseCard({ onOpen }: DailyDoseCardProps) {
  const { isDoseCompleted } = useDailyFlow();
  const dose = getTodaysDose();
  const completed = isDoseCompleted(dose.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onClick={onOpen}
      className={`relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 active:scale-[0.98] ${
        completed
          ? 'bg-[#0ABAB5]/5 border-[#0ABAB5]/30'
          : 'bg-[#141414] border-[#0ABAB5]/40 hover:border-[#0ABAB5]/70 hover:shadow-[0_0_20px_rgba(10,186,181,0.1)]'
      }`}
    >
      {/* Turquoise accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0ABAB5] to-transparent" />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0ABAB5] bg-[#0ABAB5]/10 px-2 py-0.5 rounded-full">
              {dose.category}
            </span>
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              2 min
            </span>
          </div>
          {completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 rounded-full bg-[#0ABAB5] flex items-center justify-center"
            >
              <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
            </motion.div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white mb-1 leading-snug">
          Today's Focus: {dose.title}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {dose.content[0].text}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5 text-[#0ABAB5]">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium">
              {completed ? 'Completed' : 'Tap to read'}
            </span>
          </div>
          <span className="text-[10px] text-gray-500">+{dose.xpReward} XP</span>
        </div>
      </div>
    </motion.div>
  );
}

interface DailyDoseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DailyDoseModal({ isOpen, onClose }: DailyDoseModalProps) {
  const { completeDailyDose, isDoseCompleted } = useDailyFlow();
  const [markedDone, setMarkedDone] = useState(false);
  const dose = getTodaysDose();
  const alreadyCompleted = isDoseCompleted(dose.id);
  const isComplete = alreadyCompleted || markedDone;

  const handleMarkComplete = () => {
    if (alreadyCompleted) return;
    completeDailyDose(dose.id);
    setMarkedDone(true);
  };

  const handleClose = () => {
    setMarkedDone(false);
    onClose();
  };

  const iconForType = (type: string) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="w-4 h-4" />;
      case 'script':
        return <MessageSquare className="w-4 h-4" />;
      case 'technique':
        return <Wand2 className="w-4 h-4" />;
      case 'mindset':
        return <Brain className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const colorForType = (type: string) => {
    switch (type) {
      case 'tip':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'script':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'technique':
        return 'text-[#0ABAB5] bg-[#0ABAB5]/10 border-[#0ABAB5]/20';
      case 'mindset':
        return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[430px] max-h-[90vh] bg-[#0A0A0A] rounded-t-3xl border-t border-[#222] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="relative px-5 pt-5 pb-4 flex-shrink-0">
              {/* Drag handle */}
              <div className="w-10 h-1 bg-gray-700 rounded-full mx-auto mb-4" />

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0ABAB5] bg-[#0ABAB5]/10 px-2 py-0.5 rounded-full">
                    Day {dose.day} · {dose.category}
                  </span>
                  <h2 className="text-lg font-bold text-white mt-2 leading-tight">
                    {dose.title}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0 ml-3"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
              {/* Content Blocks */}
              {dose.content.map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className={`rounded-xl border p-4 ${colorForType(block.type)}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {iconForType(block.type)}
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                      {block.type}
                    </span>
                  </div>

                  {block.highlight && (
                    <p className="text-sm font-semibold mb-2 opacity-90 leading-snug">
                      {block.highlight}
                    </p>
                  )}

                  <p className="text-sm leading-relaxed opacity-80">
                    {block.text}
                  </p>
                </motion.div>
              ))}

              {/* Practice Prompt */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#0ABAB5]/10 to-[#0ABAB5]/5 border border-[#0ABAB5]/20 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-[#0ABAB5]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0ABAB5]">
                    Today's Practice
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {dose.practicePrompt}
                </p>
              </motion.div>

              {/* Mark Complete Button */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={handleMarkComplete}
                  disabled={isComplete}
                  className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    isComplete
                      ? 'bg-[#0ABAB5]/20 text-[#0ABAB5] border border-[#0ABAB5]/30'
                      : 'bg-[#0ABAB5] text-black shadow-[0_0_25px_rgba(10,186,181,0.3)] active:scale-[0.98]'
                  }`}
                >
                  {isComplete ? (
                    <>
                      <Check className="w-4 h-4" strokeWidth={3} />
                      Completed! +{dose.xpReward} XP
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Mark Complete (+{dose.xpReward} XP)
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DailyDoseCard;

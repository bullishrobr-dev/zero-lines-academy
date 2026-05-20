// ─────────────────────────────────────────────────────────────
// XPToast.tsx — Floating XP notification with Framer Motion
// ─────────────────────────────────────────────────────────────

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

interface XPToastProps {
  visible: boolean;
  amount: number;
  message?: string;
  onDismiss: () => void;
  duration?: number;
}

export default function XPToast({
  visible,
  amount,
  message,
  onDismiss,
  duration = 2000,
}: XPToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          className="fixed top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none"
        >
          <div className="flex items-center gap-2.5 bg-gradient-to-r from-[#0ABAB5] to-[#065B58] text-white px-5 py-3 rounded-full shadow-lg shadow-[#0ABAB5]/25 pointer-events-auto">
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 500 }}
            >
              <Star size={18} className="fill-white text-white" />
            </motion.div>
            <span className="text-sm font-bold tracking-wide">
              +{amount} XP
            </span>
            {message && (
              <span className="text-xs text-white/80 ml-1">{message}</span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// XPToast.tsx — floating "+N XP" pill
//
// Restyled to the Counter Light tokens. The old pill put white text on the
// brand teal (2.41:1 — a WCAG failure at any size); a coloured fill now always
// takes the dark on-teal ink. `pt-safe` keeps it clear of the notch.
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
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-safe"
          role="status"
          aria-live="polite"
        >
          <div className="mt-4 flex items-center gap-2.5 rounded-full bg-teal px-5 py-3 text-on-teal shadow-feature">
            <motion.span
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 500 }}
              className="flex"
            >
              <Star size={18} className="fill-current" aria-hidden="true" />
            </motion.span>
            <span className="text-button">+{amount} XP</span>
            {message && <span className="text-caption opacity-80">{message}</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

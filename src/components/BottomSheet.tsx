// ─────────────────────────────────────────────────────────────────────────────
// BottomSheet — the sheet that slides up from the bottom bar.
//
// Two screens now open one of these (log a sale, write up a demo) and they were
// one copy-paste apart from drifting: the same overlay, the same spring, the
// same grabber, the same pb-safe for the iPhone home bar. Any fix to the
// backdrop or the scroll behaviour had to be made twice or it was made once and
// forgotten in the other.
//
// The FORM inside stays in the caller, mounted only while the sheet is open, so
// its fields start empty every time without an effect resetting them. That is
// the pattern SaleLogModal already used and it is worth keeping.
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BottomSheet({
  isOpen,
  onClose,
  label,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  /** Names the dialog for a screen reader. Usually the sheet's own title. */
  label: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative max-h-[88vh] w-full max-w-app overflow-y-auto rounded-t-feature border border-line bg-surface shadow-feature"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div className="flex justify-center pb-1 pt-3">
              <div className="h-1 w-10 rounded-full bg-line-strong/50" />
            </div>

            {children}

            {/* Clears the iPhone home bar without fighting the padding above. */}
            <div className="pb-safe" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

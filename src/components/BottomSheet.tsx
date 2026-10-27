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
//
// ── TWO THINGS THAT COST A SELLER A SALE ────────────────────────────────────
//
//  1. SCROLL CHAINING. The sheet was the scroller and nothing stopped it
//     handing its overscroll to the page behind it: flick the chip list at the
//     end of the demo log and the journal underneath started moving, which on
//     a phone reads as the sheet coming apart. `overscroll-contain` keeps the
//     gesture inside the sheet.
//
//  2. SAVE WAS AT THE BOTTOM OF 700px OF FORM. The actions were the last rows
//     of the scrolling content, so recording a sale at the counter — the one
//     thing this sheet exists for — meant scrolling past four groups of chips
//     to reach the button. Save now docks to the bottom edge of the sheet and
//     stays there while the form scrolls underneath it: see `SheetFooter`.
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * The docked action bar at the foot of a sheet.
 *
 * `sticky bottom-0` inside the sheet's own scroller, which is what makes it a
 * dock rather than a floating overlay: when the form is short it simply sits
 * after the last field, and when the form is long it holds the bottom edge
 * while the content moves under it. The sheet's safe-area spacer is OUTSIDE
 * that scroller, so this never lands on top of the iPhone home indicator.
 *
 * `-mx-5` assumes the caller's content is padded `px-5` (both sheets are), so
 * the bar and its hairline run the full width instead of stopping short.
 */
export function SheetFooter({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-5 border-t border-line bg-surface px-5 pb-4 pt-3">
      {children}
    </div>
  );
}

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

          {/* A flex column, not a single scrolling box. The grabber and the
              safe-area strip keep their size; the content in the middle is the
              only part that scrolls, which is what gives SheetFooter a bottom
              edge to dock to.

              `dvh` rather than `vh`: on a phone with a retracting toolbar the
              two are different numbers, and 88vh can be taller than the window
              the sheet is actually sitting in.

              No `flex-1`/`min-h-0` on the scroller on purpose — a flex item
              with `flex-basis: 0` and its automatic minimum removed collapses
              in an auto-height column. `overflow-y-auto` already gives a flex
              item an automatic minimum size of zero, so the default
              `flex: 0 1 auto` shrinks it exactly as far as the max height
              needs and no further. */}
          <motion.div
            className="relative flex max-h-[88dvh] w-full max-w-app flex-col rounded-t-feature border border-line bg-surface shadow-feature"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div className="flex shrink-0 justify-center pb-1 pt-3">
              <div className="h-1 w-10 rounded-full bg-line-strong/50" />
            </div>

            <div className="overflow-y-auto overscroll-contain">{children}</div>

            {/* Clears the iPhone home bar without fighting the padding above.
                Outside the scroller, so the docked footer stops above it. */}
            <div className="pb-safe shrink-0" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

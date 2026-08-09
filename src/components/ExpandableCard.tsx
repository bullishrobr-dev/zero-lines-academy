// ─────────────────────────────────────────────────────────────────────────────
// ExpandableCard — a collapsible product card for the Cheat Sheets screen.
//
// Extracted from CheatSheetsPage. The old version rendered ~40 identical grey
// boxes, so finding a price meant opening every card. The collapsed state now
// carries the information a seller actually needs mid-sale (base price, floor,
// best deal) plus a per-product accent, so the right card is recognisable
// without opening anything.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ACCENT, type AccentName } from '../data/cheatSheets';

interface ExpandableCardProps {
  title: string;
  /** Always-visible summary line — keep the numbers here. */
  subtitle?: string;
  /** Extra always-visible row, e.g. the recommended deal chip. */
  meta?: ReactNode;
  icon: ReactNode;
  accent: AccentName;
  children: ReactNode;
}

export default function ExpandableCard({
  title,
  subtitle,
  meta,
  icon,
  accent,
  children,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);
  const a = ACCENT[accent];

  return (
    <div className="surface-raised overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <span
          className={`w-11 h-11 rounded-chip flex items-center justify-center shrink-0 ${a.tint} ${a.text}`}
          aria-hidden="true"
        >
          {icon}
        </span>

        <span className="flex-1 min-w-0">
          <span className="block text-h4 text-ink">{title}</span>
          {subtitle && <span className="block text-caption text-ink-2 mt-0.5">{subtitle}</span>}
          {meta && <span className="block mt-1.5">{meta}</span>}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-ink-3 shrink-0"
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-4 border-t border-line">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProgressChecklist — a lesson checklist whose ticks survive a page reload.
//
// LessonView used to render checklists with throwaway `useState`, so a seller
// who checked three items, took a customer, and came back found every box
// empty. This component persists per storageKey and is now the only checklist
// in a lesson.
//
// Each row is a 44px target with a real checkbox role, not a bare <button>.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { haptic } from '../utils/haptics';

interface ChecklistItem {
  id: string;
  text: string;
}

interface ProgressChecklistProps {
  storageKey: string;
  items: ChecklistItem[];
}

/** Read once, during the initial render — no setState-in-effect round trip. */
function loadChecked(storageKey: string): Set<string> {
  try {
    const stored = localStorage.getItem(`checklist_${storageKey}`);
    if (stored) return new Set(JSON.parse(stored) as string[]);
  } catch {
    // localStorage unavailable — the checklist still works for this session
  }
  return new Set();
}

export default function ProgressChecklist({ storageKey, items }: ProgressChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => loadChecked(storageKey));

  // Write-only effect: pushes React state out to localStorage, never back in.
  useEffect(() => {
    try {
      localStorage.setItem(`checklist_${storageKey}`, JSON.stringify(Array.from(checkedItems)));
    } catch {
      // ignore localStorage errors
    }
  }, [checkedItems, storageKey]);

  const toggleItem = useCallback((id: string) => {
    haptic('light');
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="-mx-2 my-7 flex flex-col gap-2.5">
      {items.map((item, index) => {
        const isChecked = checkedItems.has(item.id);
        return (
          <motion.button
            key={item.id}
            type="button"
            role="checkbox"
            aria-checked={isChecked}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 200px 0px' }}
            transition={{
              duration: 0.35,
              delay: Math.min(index, 6) * 0.06,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
            }}
            onClick={() => toggleItem(item.id)}
            className={`flex min-h-touch w-full items-center gap-3 rounded-card border px-4 py-3 text-left transition-colors duration-200 ${
              isChecked ? 'border-teal/40 bg-teal-tint' : 'border-line bg-surface'
            }`}
          >
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                isChecked ? 'border-teal bg-teal' : 'border-line-strong bg-transparent'
              }`}
              aria-hidden="true"
            >
              <AnimatePresence>
                {isChecked && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <Check size={14} strokeWidth={3} className="text-on-teal" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>

            <span
              className={`flex-1 text-body-small transition-colors duration-200 ${
                isChecked ? 'text-ink-3 line-through' : 'text-ink'
              }`}
            >
              {item.text}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
}

interface ProgressChecklistProps {
  storageKey: string;
  items: ChecklistItem[];
}

export default function ProgressChecklist({ storageKey, items }: ProgressChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`checklist_${storageKey}`);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        setCheckedItems(new Set(parsed));
      }
    } catch {
      // ignore localStorage errors
    }
    setIsLoaded(true);
  }, [storageKey]);

  // Save to localStorage when changed
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        `checklist_${storageKey}`,
        JSON.stringify(Array.from(checkedItems))
      );
    } catch {
      // ignore localStorage errors
    }
  }, [checkedItems, storageKey, isLoaded]);

  const toggleItem = useCallback((id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col gap-3 mt-5">
      {items.map((item, index) => {
        const isChecked = checkedItems.has(item.id);
        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.35,
              delay: index * 0.08,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
            }}
            onClick={() => toggleItem(item.id)}
            className={`flex items-center gap-4 w-full text-left bg-[#1A1A1A] rounded-xl px-4 py-4 transition-colors duration-200 ${
              isChecked ? 'border border-[#0ABAB5]/30' : 'border border-[#2A2A2A]'
            }`}
          >
            {/* Check circle */}
            <motion.div
              animate={{
                scale: isChecked ? [1.2, 1] : 1,
                backgroundColor: isChecked ? '#0ABAB5' : 'transparent',
                borderColor: isChecked ? '#0ABAB5' : '#4A4A4A',
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
              className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0"
            >
              <AnimatePresence>
                {isChecked && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Text */}
            <span
              className={`text-body-small leading-5 flex-1 transition-colors duration-200 ${
                isChecked ? 'text-[#8A8A8A] line-through' : 'text-[#D1D1D1]'
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

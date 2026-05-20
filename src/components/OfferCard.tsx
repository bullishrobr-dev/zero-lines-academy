import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Tag, Lightbulb } from 'lucide-react';

interface OfferCardProps {
  title: string;
  price: string;
  description: string;
  whenToUse?: string;
  includes?: string[];
  tag?: string;
}

export default function OfferCard({ title, price, description, whenToUse, includes, tag }: OfferCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 text-left"
        whileTap={{ scale: 0.98 }}
      >
        {/* Tag badge */}
        {tag && (
          <span className="shrink-0 bg-[#0ABAB5]/15 text-[#0ABAB5] text-[10px] font-semibold tracking-[0.08em] uppercase px-2 py-1 rounded-full">
            {tag}
          </span>
        )}

        <div className="flex-1 min-w-0">
          <h4 className="text-h4 text-white truncate">{title}</h4>
          <p className="text-price text-[#0ABAB5] font-mono">{price}</p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#6B6B6B] shrink-0"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
              opacity: { duration: 0.2, delay: 0.1 },
            }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              <p className="text-body text-[#D1D1D1] leading-relaxed">{description}</p>

              {includes && includes.length > 0 && (
                <div className="bg-[#0F0F0F] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={14} className="text-[#0ABAB5]" />
                    <span className="text-caption text-[#8A8A8A]">Includes:</span>
                  </div>
                  <ul className="space-y-1.5">
                    {includes.map((item, i) => (
                      <li key={i} className="text-body-small text-white flex items-start gap-2">
                        <span className="text-[#0ABAB5] mt-1 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {whenToUse && (
                <div className="flex items-start gap-2 bg-[#0ABAB5]/5 rounded-lg p-3 border-l-2 border-[#0ABAB5]">
                  <Lightbulb size={16} className="text-[#0ABAB5] shrink-0 mt-0.5" />
                  <p className="text-body-small text-[#D1D1D1]">{whenToUse}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

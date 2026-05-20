import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface QuoteCardProps {
  quote: string;
  attribution?: string;
  variant?: 'default' | 'success' | 'error' | 'large';
}

export default function QuoteCard({ quote, attribution, variant = 'default' }: QuoteCardProps) {
  const borderColor =
    variant === 'success'
      ? 'border-l-[#22C55E]'
      : variant === 'error'
        ? 'border-l-[#EF4444]'
        : 'border-l-[#0ABAB5]';

  const isLarge = variant === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className={`bg-[#1A1A1A] rounded-xl pl-5 pr-4 py-5 border-l-[3px] ${borderColor} my-5`}
    >
      <div className="flex gap-3">
        <Quote size={18} className="text-[#0ABAB5] shrink-0 mt-0.5" />
        <div>
          <p
            className={`text-[#D1D1D1] italic leading-relaxed ${isLarge ? 'text-lg' : 'text-base'}`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {quote}
          </p>
          {attribution && (
            <p className="text-caption text-[#8A8A8A] mt-2">{attribution}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

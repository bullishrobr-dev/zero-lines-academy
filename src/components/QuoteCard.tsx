// ─────────────────────────────────────────────────────────────
// QuoteCard.tsx — pull-quote block used inside lesson content
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface QuoteCardProps {
  quote: string;
  attribution?: string;
  variant?: 'default' | 'success' | 'error' | 'large';
}

const ACCENT: Record<NonNullable<QuoteCardProps['variant']>, { rule: string; mark: string }> = {
  default: { rule: 'border-l-teal', mark: 'text-teal-strong' },
  success: { rule: 'border-l-success', mark: 'text-success' },
  error: { rule: 'border-l-danger', mark: 'text-danger' },
  large: { rule: 'border-l-teal', mark: 'text-teal-strong' },
};

export default function QuoteCard({ quote, attribution, variant = 'default' }: QuoteCardProps) {
  const accent = ACCENT[variant];
  const isLarge = variant === 'large';

  return (
    <motion.figure
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className={`my-5 rounded-card border border-l-[3px] border-line bg-surface-sunken py-5 pl-5 pr-4 ${accent.rule}`}
    >
      <div className="flex gap-3">
        <Quote size={18} className={`mt-1 shrink-0 ${accent.mark}`} aria-hidden="true" />
        <div className="min-w-0">
          <p className={`font-brand italic text-ink ${isLarge ? 'text-h3' : 'text-body'}`}>
            {quote}
          </p>
          {attribution && (
            <figcaption className="mt-2 text-caption text-ink-2">{attribution}</figcaption>
          )}
        </div>
      </div>
    </motion.figure>
  );
}

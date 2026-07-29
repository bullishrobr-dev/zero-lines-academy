// ─────────────────────────────────────────────────────────────────────────────
// OfferCard — a single named deal: what it costs, what is in it, and the exact
// words that sell it.
//
// Used for the offers that are NOT a step down the price ladder — the syringe's
// second-syringe upsell and the peeling's two-choice close. Descending rungs
// belong in <PriceLadder>.
//
// The price is passed in already formatted by `price()` / `priceFor()` from
// useCurrency(), so this component can never put the wrong symbol on screen.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useCurrency } from '../utils/currency';
import CopyButton from './CopyButton';

interface OfferCardProps {
  /** Short badge — "Most popular", "Option 1". */
  tag?: string;
  title: string;
  /** Already formatted: price(120) or priceFor(120, 3). */
  price: string;
  subtitle?: string;
  items?: string[];
  scriptLabel?: string;
  script?: string;
  /** The one to lead with. */
  highlight?: boolean;
}

const highlightSkin: CSSProperties = {
  background: 'linear-gradient(135deg, rgb(var(--pa-tint)) 0%, rgb(var(--surface)) 62%)',
  borderColor: 'rgb(var(--pa) / 0.35)',
};

export default function OfferCard({
  tag,
  title,
  price,
  subtitle,
  items,
  scriptLabel,
  script,
  highlight,
}: OfferCardProps) {
  const { sub } = useCurrency();

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
      className={highlight ? 'rounded-card border p-4' : 'surface-flat p-4'}
      style={highlight ? highlightSkin : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {tag && (
            <span className="inline-block text-overline rounded-full px-2 py-0.5 bg-[rgb(var(--pa-tint))] text-[rgb(var(--pa-strong))] mb-1.5">
              {sub(tag)}
            </span>
          )}
          <h3 className="text-h4 text-ink">{sub(title)}</h3>
        </div>
        <p className="shrink-0 text-price text-ink">{price}</p>
      </div>

      {subtitle && <p className="text-body-small text-ink-2 mt-1.5">{sub(subtitle)}</p>}

      {items && items.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 mt-3">
          {items.map((item) => (
            <li
              key={item}
              className="text-caption text-ink-2 bg-surface-sunken border border-line rounded-chip px-2 py-1"
            >
              {sub(item)}
            </li>
          ))}
        </ul>
      )}

      {script && (
        <div className="rounded-card bg-surface-sunken p-3.5 mt-3">
          {scriptLabel && <p className="text-overline text-ink-3 mb-1.5">{sub(scriptLabel)}</p>}
          <div className="flex items-start gap-2">
            <p className="flex-1 text-body font-brand italic text-ink">{sub(script)}</p>
            <CopyButton text={sub(script)} />
          </div>
        </div>
      )}
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProductSection — the shared scaffolding behind the four product deep-dives
// (Syringe, Peeling, Scrub, Nail Kit).
//
// Those four pages carried the same <motion.section> card, the same numbered
// demo step, the same italic script block and the same 2×2 quick-reference
// grid, copy-pasted four times each and painted in a near-black palette that
// no longer exists. They live here once.
//
// Per-product accent
// ------------------
// A page wraps itself in <ProductPage accent="teal">, which sets three CSS
// custom properties (--pa, --pa-strong, --pa-tint) from the design-system
// tokens. Everything below reads those, so one hue flows through a whole page
// and the four pages stop looking interchangeable. Nothing here needs to know
// which product it is drawing, and no accent map has to be shared across
// files. The values flip automatically in dark mode because the underlying
// tokens do.
//
// A coloured FILL never carries text — text on an accent is always
// --pa-strong, which is the AA-safe member of each pair.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import { Euro, PoundSterling } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { useCurrency } from '../utils/currency';

export type ProductAccent = 'teal' | 'coral' | 'gold' | 'violet';

const ACCENT_VARS: Record<ProductAccent, CSSProperties> = {
  teal: {
    '--pa': 'var(--teal)',
    '--pa-strong': 'var(--teal-strong)',
    '--pa-tint': 'var(--teal-tint)',
  } as CSSProperties,
  coral: {
    '--pa': 'var(--coral)',
    '--pa-strong': 'var(--coral-strong)',
    '--pa-tint': 'var(--coral-tint)',
  } as CSSProperties,
  gold: {
    '--pa': 'var(--gold)',
    '--pa-strong': 'var(--gold-strong)',
    '--pa-tint': 'var(--gold-tint)',
  } as CSSProperties,
  violet: {
    '--pa': 'var(--violet)',
    '--pa-strong': 'var(--violet-strong)',
    '--pa-tint': 'var(--violet-tint)',
  } as CSSProperties,
};

/** The accent-tinted feature surface, expressed against --pa. */
const featureSurface: CSSProperties = {
  background: 'linear-gradient(135deg, rgb(var(--pa-tint)) 0%, rgb(var(--surface)) 62%)',
  borderColor: 'rgb(var(--pa) / 0.30)',
  boxShadow: 'var(--shadow-feature)',
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i, 4) * 0.06, duration: 0.45, ease: [0.32, 0.72, 0, 1] as const },
  }),
};

/* ── Page shell ────────────────────────────────────────────────────────────
   Owns the product's accent and the one column the whole page lives in. */

export function ProductPage({
  accent,
  children,
}: {
  accent: ProductAccent;
  children: ReactNode;
}) {
  return (
    <div className="min-h-full bg-background" style={ACCENT_VARS[accent]}>
      {children}
    </div>
  );
}

/* ── The € / £ glyph ───────────────────────────────────────────────────────
   Data files ask for `icon: 'Euro'`. A Gibraltar seller must never be shown a
   euro sign, so the glyph follows the shop rather than the content. */

export function CurrencyIcon({ size = 16, className }: { size?: number; className?: string }) {
  const { currency } = useCurrency();
  const Glyph = currency === '£' ? PoundSterling : Euro;
  return <Glyph size={size} className={className} aria-hidden="true" />;
}

/* ── Section card ──────────────────────────────────────────────────────────
   The block that was duplicated at NailKit:135 ↔ Peeling:167 ↔ Scrub:146 ↔
   Syringe:160 (and three more times besides). */

interface ProductSectionProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  /** Stagger order for the scroll-in. */
  index?: number;
  /** `feature` tints the card with the product accent — use it sparingly. */
  variant?: 'card' | 'feature';
  children: ReactNode;
}

export default function ProductSection({
  icon,
  title,
  subtitle,
  index = 0,
  variant = 'card',
  children,
}: ProductSectionProps) {
  const isFeature = variant === 'feature';

  return (
    <motion.section
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={isFeature ? 'rounded-feature border p-5' : 'surface-raised p-5'}
      style={isFeature ? featureSurface : undefined}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="w-9 h-9 shrink-0 rounded-chip flex items-center justify-center bg-[rgb(var(--pa-tint))] text-[rgb(var(--pa-strong))]"
          aria-hidden="true"
        >
          {icon}
        </span>
        <h2 className="text-h3 text-ink">{title}</h2>
      </div>

      {subtitle && <p className="text-body-small text-ink-2 mt-2">{subtitle}</p>}

      <div className="mt-4">{children}</div>
    </motion.section>
  );
}

/* ── Script block ──────────────────────────────────────────────────────────
   What the seller says out loud. The quote is the largest thing in the block
   and set in the brand serif — the pages used `font-serif`, which silently
   rendered Georgia. */

interface ScriptBlockProps {
  label?: string;
  /** The spoken line. */
  quote?: ReactNode;
  /** Coaching that surrounds the line. */
  note?: ReactNode;
  children?: ReactNode;
  /** Draw the accent rule down the left edge. */
  accented?: boolean;
}

export function ScriptBlock({ label, quote, note, children, accented = true }: ScriptBlockProps) {
  return (
    <div
      className={`rounded-card bg-surface-sunken p-4 ${accented ? 'border-l-2' : ''}`}
      style={accented ? { borderColor: 'rgb(var(--pa))' } : undefined}
    >
      {label && (
        <p className="text-overline text-[rgb(var(--pa-strong))] mb-2">{label}</p>
      )}
      {quote && <p className="text-body font-brand italic text-ink">{quote}</p>}
      {note && <p className="text-body-small text-ink-2 mt-2">{note}</p>}
      {children}
    </div>
  );
}

/* ── Numbered demo step ────────────────────────────────────────────────────
   Syringe, Peeling, Scrub and Nail Kit all walk the seller through a numbered
   demo; all four drew it themselves. */

interface StepRowProps {
  step: string | number;
  label?: string;
  title: string;
  children?: ReactNode;
  /** The reveal — the moment the sale is made. */
  highlight?: boolean;
}

export function StepRow({ step, label, title, children, highlight }: StepRowProps) {
  return (
    <div
      className={`rounded-card p-4 ${highlight ? 'border' : 'bg-surface-sunken'}`}
      style={highlight ? featureSurface : undefined}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <span
          className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-caption font-bold bg-[rgb(var(--pa-tint))] text-[rgb(var(--pa-strong))] ${
            highlight ? 'ring-2 ring-[rgb(var(--pa))]' : 'border border-line'
          }`}
          aria-hidden="true"
        >
          {step}
        </span>
        {label && <span className="text-overline text-ink-3">{label}</span>}
      </div>
      <h3 className="text-h4 text-ink">{title}</h3>
      <div className="mt-1.5 space-y-2">{children}</div>
    </div>
  );
}

/* ── Quick reference ───────────────────────────────────────────────────────
   The 2×2 recall grid that closes all four pages. */

export interface QuickRefItem {
  label: string;
  value: string;
}

export function QuickRefGrid({ items }: { items: QuickRefItem[] }) {
  return (
    <dl className="grid grid-cols-2 gap-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-chip bg-surface p-3 border border-line">
          <dt className="text-caption text-ink-2">{item.label}</dt>
          <dd className="text-body-small font-semibold text-ink mt-0.5">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

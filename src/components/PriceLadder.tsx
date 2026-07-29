// ─────────────────────────────────────────────────────────────────────────────
// PriceLadder — one product's descent, drawn as an actual ladder.
//
// Every product page used to render its ladder as a stack of near-identical
// boxes, so the one thing a seller needs to see mid-sale — how far down they
// have already come, and how far is left before the floor — was invisible.
//
// Now each rung steps down and in, the price is the largest thing on it in
// tabular numerals, a bar shows what that rung costs per unit against the
// Europe anchor, the anchor itself is struck through and recessed, the rung to
// open with is raised, and the floor is drawn in the danger tone with a lock:
// the hard minimum a seller must never go below.
//
// Amounts are passed in from src/data/pricing.ts. Nothing here, and nothing
// that calls it, ever types a price. The symbol comes from the shop.
// ─────────────────────────────────────────────────────────────────────────────

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Lock } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import CopyButton from './CopyButton';

export type RungTone = 'anchor' | 'step' | 'floor';

export interface LadderRung {
  id: string;
  /** Total asked for at this rung — always from pricing.ts. */
  amount: number;
  /** How many units that total buys. Omit for one. */
  units?: number;
  /** True when `amount` is per item rather than a bundle total. */
  perUnit?: boolean;
  label: string;
  /** One line on when to use this rung. */
  note?: string;
  /** The line the seller says out loud. */
  script?: string;
  /** Tactical reminder shown with the script. */
  hint?: string;
  /** What the customer walks away with. */
  items?: string[];
  tone?: RungTone;
  /** The rung to open the negotiation with — drawn raised. */
  recommended?: boolean;
}

interface PriceLadderProps {
  rungs: LadderRung[];
  /** The strike-through price at the top, used to scale the value bars. */
  anchor: number;
}

const COPY = {
  en: {
    say: 'What to say',
    open: 'Open here',
    floor: 'Hard minimum — never go below',
    anchor: 'Europe',
    for: 'for',
    each: 'each',
    includes: 'Includes',
    hint: 'Tap a step to see exactly what to say.',
  },
  es: {
    say: 'Qué decir',
    open: 'Empieza aquí',
    floor: 'Mínimo absoluto — nunca bajes de aquí',
    anchor: 'Europa',
    for: 'por',
    each: 'cada uno',
    includes: 'Incluye',
    hint: 'Toca un peldaño para ver exactamente qué decir.',
  },
};

function perUnitAmount(rung: LadderRung): number {
  return rung.units && rung.units > 1 ? rung.amount / rung.units : rung.amount;
}

function Rung({
  rung,
  index,
  anchor,
  open,
  onToggle,
}: {
  rung: LadderRung;
  index: number;
  anchor: number;
  open: boolean;
  onToggle: () => void;
}) {
  const { price, sub } = useCurrency();
  const { language } = useLanguage();
  const c = COPY[language === 'es' ? 'es' : 'en'];

  const isAnchor = rung.tone === 'anchor';
  const isFloor = rung.tone === 'floor';
  const expandable = Boolean(rung.script || rung.hint || rung.items?.length);
  const each = perUnitAmount(rung);
  const share = Math.max(6, Math.min(100, Math.round((each / (anchor || each || 1)) * 100)));

  const skin = isAnchor
    ? 'bg-surface-sunken border border-line'
    : isFloor
      ? 'bg-danger-tint border border-danger/40'
      : rung.recommended
        ? 'bg-surface border-2 shadow-raised'
        : 'surface-flat';

  const chip = isFloor ? c.floor : rung.recommended ? c.open : isAnchor ? c.anchor : '';

  const head = (
    <>
      <span className="flex items-start justify-between gap-3">
          <span className="min-w-0 flex-1">
            <span className="flex items-baseline gap-1.5">
              <span
                className={`text-caption font-bold tabular-nums ${isFloor ? 'text-danger' : 'text-ink-3'}`}
              >
                {index + 1}
              </span>
              <span className={`text-h4 ${isAnchor ? 'text-ink-2' : 'text-ink'}`}>
                {sub(rung.label)}
              </span>
            </span>

            {chip && (
              <span
                className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-overline ${
                  isFloor
                    ? 'bg-danger/15 text-danger'
                    : rung.recommended
                      ? 'bg-[rgb(var(--pa-tint))] text-[rgb(var(--pa-strong))]'
                      : 'bg-surface text-ink-3 border border-line'
                }`}
              >
                {isFloor && <Lock size={12} aria-hidden="true" />}
                {chip}
              </span>
            )}
          </span>

          <span className="shrink-0 text-right">
            <span
              className={`block text-price ${
                isAnchor
                  ? 'text-ink-3 line-through decoration-2'
                  : isFloor
                    ? 'text-danger'
                    : 'text-ink'
              }`}
            >
              {price(rung.amount)}
            </span>
            {rung.units && rung.units > 1 ? (
              <span className="block text-caption text-ink-2 whitespace-nowrap">
                {rung.units} × {price(each)}
              </span>
            ) : rung.perUnit ? (
              <span className="block text-caption text-ink-2">{c.each}</span>
            ) : null}
          </span>
        </span>

        {/* Where this rung sits on the descent, per unit. */}
        <span className="mt-2.5 block h-1.5 rounded-full bg-line overflow-hidden" aria-hidden="true">
          <span
            className={`block h-full rounded-full ${
              isAnchor ? 'bg-line-strong' : isFloor ? 'bg-danger' : 'bg-[rgb(var(--pa))]'
            }`}
            style={{ width: `${share}%` }}
          />
        </span>

        {(rung.note || expandable) && (
          <span className="mt-2 flex items-center justify-between gap-2">
            <span className="text-caption text-ink-2 line-clamp-2">
              {rung.note ? sub(rung.note) : ''}
            </span>
            {expandable && (
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-ink-3"
                aria-hidden="true"
              >
                <ChevronDown size={18} />
              </motion.span>
            )}
          </span>
        )}
    </>
  );

  return (
    <li
      className={`rounded-card overflow-hidden ${skin}`}
      style={{
        marginInlineStart: Math.min(index, 5) * 8,
        ...(rung.recommended && !isFloor ? { borderColor: 'rgb(var(--pa))' } : null),
      }}
    >
      {expandable ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="w-full min-h-touch px-3.5 py-3 text-left"
        >
          {head}
        </button>
      ) : (
        <div className="px-3.5 py-3">{head}</div>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div className="px-3.5 pb-3.5 pt-0.5 space-y-3">
              {rung.items && rung.items.length > 0 && (
                <div>
                  <p className="text-overline text-ink-3 mb-1.5">{c.includes}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {rung.items.map((item) => (
                      <li
                        key={item}
                        className="text-caption text-ink-2 bg-surface-sunken border border-line rounded-chip px-2 py-1"
                      >
                        {sub(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {rung.script && (
                <div className="rounded-card bg-surface-sunken p-3.5">
                  <p className="text-overline text-ink-3 mb-1.5">{c.say}</p>
                  <div className="flex items-start gap-2">
                    <p className="flex-1 text-body font-brand italic text-ink">{sub(rung.script)}</p>
                    <CopyButton text={sub(rung.script)} />
                  </div>
                </div>
              )}

              {rung.hint && (
                <p className={`text-body-small ${isFloor ? 'text-danger' : 'text-ink-2'}`}>
                  {sub(rung.hint)}
                </p>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function PriceLadder({ rungs, anchor }: PriceLadderProps) {
  const { language } = useLanguage();
  const c = COPY[language === 'es' ? 'es' : 'en'];
  const [openId, setOpenId] = useState<string | null>(
    () => rungs.find((r) => r.recommended)?.id ?? null
  );

  return (
    <div>
      <ol className="space-y-2">
        {rungs.map((rung, i) => (
          <Rung
            key={rung.id}
            rung={rung}
            index={i}
            anchor={anchor}
            open={openId === rung.id}
            onToggle={() => setOpenId(openId === rung.id ? null : rung.id)}
          />
        ))}
      </ol>
      <p className="text-caption text-ink-3 mt-3 text-center">{c.hint}</p>
    </div>
  );
}

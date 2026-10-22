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
//
// ── NOT EVERY PRICE IS A RUNG ────────────────────────────────────────────────
// A rung marked `parallel` is the OTHER option, offered at the same moment as
// the rung above it and usually for more money — the syringe's two-for-300
// beside the 210, not under it. Those are drawn beside their sibling: same
// indent, an "or" rail above them, the sibling's number with a B, and NO
// descent bar.
//
// The bar is the reason this matters. It is scaled on per-unit price, so Option
// B's bar comes out SHORTER than the offer it is an alternative to (two at 150
// each against one at 210) — the picture says "you have come down" while the
// price has gone up, and a seller scanning mid-sale offers 300 to somebody who
// was already saying yes to 210. There is no honest way to put a different
// offer on the same axis, so a parallel rung does not get the axis.
//
// The owner, on what the descent is actually for: "The ladder is designed for
// people who are, so to say, broke. 300 is just the second option. It's option
// number B." See `PriceRung.parallel` in src/data/pricing.ts.
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
  /**
   * Not a step down — the alternative offer, drawn beside the rung above it.
   *
   * Pass this straight through from `PriceRung.parallel` in pricing.ts. It
   * takes the rung out of the numbering and out of the descent bar; see the
   * header of this file.
   */
  parallel?: boolean;
}

interface PriceLadderProps {
  rungs: LadderRung[];
  /** The strike-through price at the top, used to scale the value bars. */
  anchor: number;
}

/**
 * Where each rung is drawn: its number and how far in it is indented.
 *
 * Both are counted on the DESCENT only, so a parallel option neither takes a
 * number of its own nor pushes the rungs below it one step further in. It
 * borrows its sibling's depth and its sibling's number with a B — "3" then
 * "3B" — which is the whole claim in two characters.
 */
function placements(rungs: LadderRung[]): { step: string; depth: number }[] {
  let descent = 0;
  return rungs.map((rung) => {
    if (rung.parallel) {
      return { step: `${Math.max(descent, 1)}B`, depth: Math.max(descent - 1, 0) };
    }
    descent += 1;
    return { step: String(descent), depth: descent - 1 };
  });
}

const COPY = {
  en: {
    say: 'What to say',
    open: 'Open here',
    floor: 'Hard minimum — never go below',
    anchor: 'Europe',
    each: 'each',
    includes: 'Includes',
    hint: 'Tap a step to see exactly what to say.',
    or: 'or',
    parallel: 'The other option — not a step down',
  },
  es: {
    say: 'Qué decir',
    open: 'Empieza aquí',
    floor: 'Mínimo absoluto — nunca bajes de aquí',
    anchor: 'Europa',
    each: 'cada uno',
    includes: 'Incluye',
    hint: 'Toca un peldaño para ver exactamente qué decir.',
    or: 'o',
    parallel: 'La otra opción — no es bajar un paso',
  },
};

function perUnitAmount(rung: LadderRung): number {
  return rung.units && rung.units > 1 ? rung.amount / rung.units : rung.amount;
}

function Rung({
  rung,
  step,
  depth,
  anchor,
  open,
  onToggle,
}: {
  rung: LadderRung;
  /** The number drawn on the rung — "3", or "3B" for the option beside it. */
  step: string;
  /** How far in to indent, counted on the descent. */
  depth: number;
  anchor: number;
  open: boolean;
  onToggle: () => void;
}) {
  const { price, sub } = useCurrency();
  const { language } = useLanguage();
  const c = COPY[language === 'es' ? 'es' : 'en'];

  const isAnchor = rung.tone === 'anchor';
  const isFloor = rung.tone === 'floor';
  const isParallel = Boolean(rung.parallel);
  const expandable = Boolean(rung.script || rung.hint || rung.items?.length);
  const each = perUnitAmount(rung);
  const share = Math.max(6, Math.min(100, Math.round((each / (anchor || each || 1)) * 100)));

  const skin = isAnchor
    ? 'bg-surface-sunken border border-line'
    : isFloor
      ? 'bg-danger-tint border border-danger/40'
      : isParallel
        ? 'bg-surface border border-dashed border-[rgb(var(--pa))]'
        : rung.recommended
          ? 'bg-surface border-2 shadow-raised'
          : 'surface-flat';

  const chip = isFloor
    ? c.floor
    : isParallel
      ? c.parallel
      : rung.recommended
        ? c.open
        : isAnchor
          ? c.anchor
          : '';

  const head = (
    <>
      <span className="flex items-start justify-between gap-3">
          <span className="min-w-0 flex-1">
            <span className="flex items-baseline gap-1.5">
              <span
                className={`text-caption font-bold tabular-nums ${
                  isFloor ? 'text-danger' : isParallel ? 'text-[rgb(var(--pa-strong))]' : 'text-ink-3'
                }`}
              >
                {step}
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
                    : rung.recommended || isParallel
                      ? 'bg-[rgb(var(--pa-tint))] text-[rgb(var(--pa-strong))]'
                      : 'bg-surface text-ink-3 border border-line'
                }`}
              >
                {isFloor && <Lock size={14} className="shrink-0" aria-hidden="true" />}
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

        {/* Where this rung sits on the descent, per unit.
            Not drawn for a parallel option: it is not on the descent, and on
            this axis its own per-unit value makes the bigger offer look like a
            price cut. The right column already prints "2 × {price}", which is
            the comparison that is actually true. */}
        {!isParallel && (
          <span className="mt-2.5 block h-1.5 rounded-full bg-line overflow-hidden" aria-hidden="true">
            <span
              className={`block h-full rounded-full ${
                isAnchor ? 'bg-line-strong' : isFloor ? 'bg-danger' : 'bg-[rgb(var(--pa))]'
              }`}
              style={{ width: `${share}%` }}
            />
          </span>
        )}

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
    <li style={{ marginInlineStart: Math.min(depth, 5) * 8 }}>
      {/* The "or" rail. A parallel option is a FORK, not a further step, and
          this is the only thing in the stack that says so before the seller
          reads the price. */}
      {isParallel && (
        <span className="mb-1.5 flex items-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-line-strong" />
          <span className="text-overline text-ink-3">{c.or}</span>
          <span className="h-px flex-1 bg-line-strong" />
        </span>
      )}

      <div
        className={`rounded-card overflow-hidden ${skin}`}
        style={rung.recommended && !isFloor && !isParallel ? { borderColor: 'rgb(var(--pa))' } : undefined}
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
      </div>
    </li>
  );
}

export default function PriceLadder({ rungs, anchor }: PriceLadderProps) {
  const { language } = useLanguage();
  const c = COPY[language === 'es' ? 'es' : 'en'];
  const [openId, setOpenId] = useState<string | null>(
    () => rungs.find((r) => r.recommended)?.id ?? null
  );
  const where = placements(rungs);

  return (
    <div>
      <ol className="space-y-2">
        {rungs.map((rung, i) => (
          <Rung
            key={rung.id}
            rung={rung}
            step={where[i].step}
            depth={where[i].depth}
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

// ─────────────────────────────────────────────────────────────────────────────
// CheatSheetLadder — one product's price descent, drawn as an actual ladder.
//
// The old version was seven near-identical grey boxes, so a seller could not
// see where they were in the negotiation. Now every rung steps down and in,
// carries the price in large tabular numerals, and shows a bar of its per-unit
// value against the Europe anchor. The anchor is struck through and recessed,
// the rung to open with is raised, and the floor is marked as a hard minimum.
//
// The line the seller says ALOUD is the largest readable text on the rung.
//
// ── NOT EVERY PRICE IS A RUNG ────────────────────────────────────────────────
// A rung marked `parallel` is Option B: the other offer, presented at the same
// moment as the rung above it and for MORE money. This sheet used to number it
// into the descent, which made the syringe read 500 → 300 → 210 → 300 → 175 →
// 140 → 100, with the per-unit bar SHORTER at the 300 than at the 210 above it
// — the picture going down while the price went up. A seller scanning mid-sale
// offered 300 to a customer who was already saying yes to 210.
//
// So a parallel rung is drawn beside its sibling, not below it: the sibling's
// number with a B on it, the same indent, an "or" rail above, and no descent
// bar at all. There is no honest way to put a different offer on the descent's
// axis, so it does not get the axis. The owner: "300 is just the second
// option. It's not part of the ladder. The ladder is designed for people who
// are, so to say, broke."
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactNode } from 'react';
import { Droplets, Scissors, Sparkles, Syringe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import CopyButton from './CopyButton';
import ExpandableCard from './ExpandableCard';
import { ACCENT, perUnitAmount, tr, type LadderRung, type ProductKey, type ProductLadder } from '../data/cheatSheets';

const PRODUCT_ICON: Record<ProductKey, ReactNode> = {
  syringe: <Syringe size={20} />,
  peeling: <Droplets size={20} />,
  scrub: <Sparkles size={20} />,
  nailkit: <Scissors size={20} />,
};

/**
 * Where each rung is drawn: its number and how far in it is indented.
 *
 * Both are counted on the DESCENT only. A parallel option takes no number of
 * its own and does not push the rungs below it one step further in — it
 * borrows its sibling's depth and its sibling's number with a B. "3" then "3B"
 * is the whole claim in two characters.
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

function Rung({ rung, step, depth, anchor, accent }: { rung: LadderRung; step: string; depth: number; anchor: number; accent: keyof typeof ACCENT }) {
  const { price, sub } = useCurrency();
  const { language } = useLanguage();
  const a = ACCENT[accent];
  const isAnchor = rung.tone === 'anchor';
  const isFloor = rung.tone === 'floor';
  const isParallel = Boolean(rung.parallel);
  const each = perUnitAmount(rung);
  const words = sub(tr(language, rung.words, rung.wordsEs));

  const skin = isAnchor
    ? 'bg-surface-sunken border border-line'
    : isFloor
      ? 'bg-danger-tint border border-danger/40'
      : isParallel
        ? `bg-surface border border-dashed ${a.border}`
        : rung.recommended
          ? `bg-surface border-2 ${a.border} shadow-raised`
          : 'surface-flat';
  const chip = isFloor
    ? tr(language, 'Never go below', 'Nunca bajes de aquí')
    : isParallel
      ? tr(language, 'The other option — not a step down', 'La otra opción — no es bajar un paso')
      : rung.recommended
        ? tr(language, 'Open here', 'Empieza aquí')
        : rung.tone === 'upsell'
          ? tr(language, 'Upsell', 'Subida')
          : '';

  return (
    <li style={{ marginInlineStart: Math.min(depth, 4) * 8 }}>
      {/* The "or" rail. A parallel option is a FORK, not a further step, and
          this is the only thing in the stack that says so before the seller
          has read the price. */}
      {isParallel && (
        <div className="mb-1.5 flex items-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-line-strong" />
          <span className="text-overline text-ink-3">{tr(language, 'or', 'o')}</span>
          <span className="h-px flex-1 bg-line-strong" />
        </div>
      )}

      <div className={`rounded-card p-3 ${skin}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className={`text-overline ${isFloor ? 'text-danger' : isAnchor ? 'text-ink-3' : a.text}`}>
            {step}. {sub(tr(language, rung.label, rung.labelEs))}
          </p>
          {chip && (
            <span
              className={`inline-block mt-1.5 text-overline rounded-full px-2 py-0.5 ${
                isFloor ? 'bg-danger-tint text-danger border border-danger/40' : rung.recommended ? `${a.tint} ${a.text}` : 'bg-surface-sunken text-ink-2'
              }`}
            >
              {chip}
            </span>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className={`text-price ${isAnchor ? 'text-ink-3 line-through' : isFloor ? 'text-danger' : 'text-ink'}`}>{price(rung.amount)}</p>
          {rung.units && rung.units > 1 ? (
            <p className="text-caption text-ink-3">
              {tr(language, 'for', 'por')} {rung.units} · {price(each)} {tr(language, 'each', 'c/u')}
            </p>
          ) : rung.perUnit ? (
            <p className="text-caption text-ink-3">{tr(language, 'each', 'cada uno')}</p>
          ) : null}
        </div>
      </div>

      {/* Where this rung sits on the descent, per unit.
          Never drawn for a parallel option. On this axis Option B's own
          per-unit value — two at {each} against one at the full offer price —
          renders a SHORTER bar than the offer it is an alternative to, which
          reads as a price cut when the total has gone up. The right-hand
          column already prints "for 2 · {each} each", which is the comparison
          that is actually true. */}
      {!isParallel && (
        <div className="mt-2 h-1.5 rounded-full bg-line overflow-hidden" aria-hidden="true">
          <div
            className={`h-full rounded-full ${isAnchor ? 'bg-line-strong' : isFloor ? 'bg-danger' : a.fill}`}
            style={{ width: `${Math.max(8, Math.round((each / anchor) * 100))}%` }}
          />
        </div>
      )}

      {/* The gate on rungs that are situational rather than the next step down.
          Printed above the words, because a seller scanning the ladder mid-sale
          reads the line and says it — the condition has to arrive first. */}
      {rung.when && (
        <p
          className={`mt-2 rounded-chip px-2 py-1 text-caption font-semibold ${
            isFloor ? 'bg-danger-tint text-danger' : 'bg-surface-sunken text-ink-2'
          }`}
        >
          {tr(language, rung.when, rung.whenEs ?? rung.when)}
        </p>
      )}

      <div className="mt-2.5 flex items-start gap-2">
        <p className="text-body text-ink flex-1">{words}</p>
        <CopyButton text={words} />
      </div>
      </div>
    </li>
  );
}

export default function CheatSheetLadder({ product }: { product: ProductLadder }) {
  const { price, priceFor, sub } = useCurrency();
  const { language, t } = useLanguage();
  const a = ACCENT[product.accent];
  const best = product.rungs.find((r) => r.recommended) ?? product.rungs[0];
  const where = placements(product.rungs);
  const proof = sub(tr(language, product.proof.words, product.proof.wordsEs));
  const perEach = product.perUnit ? ` ${tr(language, 'each', 'cada uno')}` : '';

  return (
    <ExpandableCard
      accent={product.accent}
      icon={PRODUCT_ICON[product.id]}
      title={tr(language, product.name, product.nameEs)}
      subtitle={`${tr(language, 'Base', 'Base')} ${price(product.base)}${perEach} · ${tr(language, 'Floor', 'Mínimo')} ${price(product.floor)}`}
      meta={
        <span className={`inline-block text-caption rounded-full px-2.5 py-1 ${a.tint} ${a.text}`}>
          {tr(language, 'Best deal', 'Mejor oferta')} ·{' '}
          {best.units && best.units > 1 ? priceFor(best.amount, best.units, tr(language, 'for', 'por')) : price(best.amount)}
        </span>
      }
    >
      <ol className="space-y-2.5 border-l-2 border-line pl-3">
        {product.rungs.map((rung, i) => (
          <Rung
            key={rung.id}
            rung={rung}
            step={where[i].step}
            depth={where[i].depth}
            anchor={product.europeAnchor}
            accent={product.accent}
          />
        ))}
      </ol>

      <div className="mt-3 rounded-card bg-surface-sunken p-3">
        <p className="text-overline text-ink-3">{tr(language, product.proof.label, product.proof.labelEs)}</p>
        <div className="mt-1.5 flex items-start gap-2">
          <p className="text-body text-ink flex-1">{proof}</p>
          <CopyButton text={proof} />
        </div>
      </div>

      <p className="mt-3 text-caption text-ink-2">
        {t('cheatSheetsMinPrice')} <span className="text-danger font-bold">{price(product.floor)}</span>
      </p>
    </ExpandableCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// demoCoach — reading a week of written-up demos and saying one useful thing.
//
// This is the point of the whole demo log. The owner's ask was to turn the
// journal into a coach, and his own condition on it was the honest one:
//
//   "That could be such a smart idea, but for that, they do need data."
//
// So this takes the data and returns exactly ONE verdict. Not a dashboard, not
// a list of weaknesses — a seller reads this standing up, between customers,
// and a screen that hands them five things to work on hands them nothing.
//
// ── THE ORDER MATTERS, AND IT IS NOT ARBITRARY ──────────────────────────────
// A price is a fact and a self-diagnosis is a guess, but the guess is more
// specific, so a STRONG pattern (the same step, three times, most of the week)
// outranks everything. Under that, facts win: never naming a price at all, then
// never getting far enough down the ladder. A weak pattern comes after those,
// and the absolution comes last — because "you did everything right" is the
// answer that is hardest to argue with and easiest to hide behind.
//
// ── WHAT IT WILL NOT DO ─────────────────────────────────────────────────────
// Say the floor price as though the seller could give it. Below the voucher the
// number stops being theirs, and every message here that goes near the bottom
// of a ladder says so. See check-floor-needs-a-manager.mjs.
// ─────────────────────────────────────────────────────────────────────────────

import type { StreetSession } from '../types/streetTracker';
import { demoStep } from '../data/encounterChips';
import { ladderRungAmounts } from '../data/pricing';

export interface CoachVerdict {
  /** Which reading this is — mostly for tests and for the card's tone. */
  kind: 'pattern' | 'noPrice' | 'ladder' | 'clean' | 'thin';
  headline: string;
  headlineEs: string;
  body: string;
  bodyEs: string;
  /** The lesson that answers it, when one does. */
  lessonId?: string;
}

/** How many write-ups it takes before a pattern means anything. */
export const COACH_MIN_LOGS = 3;

/**
 * The rung directly above the floor — the voucher close, and the last number a
 * seller may reach on their own.
 *
 *   "You use the voucher once, usually 175 to 140, with the extra 20%. After
 *    that, if it doesn't work, you go full market, call a manager, and get it
 *    to 100."
 *
 * Computed from the ladder rather than typed, so moving a rung in pricing.ts
 * moves this too instead of leaving a stale number in a coaching message.
 */
function voucherRung(productId: string): number | undefined {
  const rungs = ladderRungAmounts(productId);
  return rungs.length >= 2 ? rungs[rungs.length - 2] : undefined;
}

function mostCommon<T>(values: T[]): { value: T; count: number } | undefined {
  const counts = new Map<T, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  let best: { value: T; count: number } | undefined;
  for (const [value, count] of counts) if (!best || count > best.count) best = { value, count };
  return best;
}

/**
 * Read the week and return the one thing worth saying, or null when there is
 * genuinely nothing — which is the correct answer for a seller who has never
 * used the log and must not be nagged about it.
 */
export function readDemos(
  logs: StreetSession[],
  money: (n: number) => string,
): CoachVerdict | null {
  const demos = logs.map((l) => l.demo).filter((d): d is NonNullable<typeof d> => !!d);
  const total = demos.length;
  if (total === 0) return null;

  if (total < COACH_MIN_LOGS) {
    const left = COACH_MIN_LOGS - total;
    return {
      kind: 'thin',
      headline: 'No pattern yet',
      headlineEs: 'Todavía no hay patrón',
      body: `${left} more written up and I can tell you what keeps going wrong. Twenty seconds each, and only the ones that did not buy.`,
      bodyEs: `Apunta ${left} más y te digo qué se repite. Veinte segundos cada una, y solo las que no compraron.`,
    };
  }

  // ── Where they say they lost it ───────────────────────────────────────────
  const answered = demos.map((d) => d.lostAt).filter((s): s is string => !!s);
  const topStep = mostCommon(answered);
  const strongPattern =
    topStep && topStep.value !== 'none' && topStep.count >= 3 && topStep.count / answered.length >= 0.4;

  const patternVerdict = (): CoachVerdict | null => {
    if (!topStep || topStep.value === 'none') return null;
    const chip = demoStep(topStep.value);
    if (!chip) return null;
    return {
      kind: 'pattern',
      headline: 'You keep losing them in the same place',
      headlineEs: 'Los pierdes siempre en el mismo sitio',
      body: `${topStep.count} of the ${total} demos you wrote up ended the same way: "${chip.label}". That is not bad luck ${topStep.count} times in a row — it is a habit, and a habit is the one thing here you can actually go and fix.`,
      bodyEs: `${topStep.count} de las ${total} demos que has apuntado acabaron igual: "${chip.labelEs}". Eso no es mala suerte ${topStep.count} veces seguidas — es una costumbre, y una costumbre es lo único de aquí que puedes ir y arreglar.`,
      lessonId: chip.lessonId,
    };
  };

  if (strongPattern) {
    const v = patternVerdict();
    if (v) return v;
  }

  // ── Demos that died before the money ──────────────────────────────────────
  // `null` is the seller saying so out loud. `undefined` is silence, and
  // silence is never a finding.
  const noPrice = demos.filter((d) => d.lowestOffer === null).length;
  if (noPrice >= 2) {
    return {
      kind: 'noPrice',
      headline: 'They never even heard a price',
      headlineEs: 'Ni siquiera llegaron a oír un precio',
      body: `${noPrice} of your ${total} write-ups never got as far as a number. That is not a price problem — the demo is ending before the ask. Mirror in her hand, both yeses out of her mouth, and then say it like it is nothing.`,
      bodyEs: `${noPrice} de tus ${total} apuntes no llegaron ni a un número. Eso no es un problema de precio — la demo se acaba antes de pedir. Espejo en su mano, los dos síes de su boca, y entonces lo dices como si nada.`,
      lessonId: 'close-2',
    };
  }

  // ── How far down the ladder they actually go ──────────────────────────────
  // One product at a time, so the numbers in the sentence belong together.
  const priced = demos.filter(
    (d): d is typeof d & { productId: string; lowestOffer: number } =>
      typeof d.lowestOffer === 'number' && !!d.productId,
  );
  const topProduct = mostCommon(priced.map((d) => d.productId));
  if (topProduct && topProduct.count >= 3) {
    const forProduct = priced.filter((d) => d.productId === topProduct.value);
    const voucher = voucherRung(topProduct.value);
    const lowest = Math.min(...forProduct.map((d) => d.lowestOffer));
    if (voucher !== undefined && lowest > voucher) {
      return {
        kind: 'ladder',
        headline: 'You are stopping halfway down',
        headlineEs: 'Te paras a mitad de escalera',
        body: `Across ${forProduct.length} write-ups the lowest you ever said out loud was ${money(lowest)}. There is a voucher that takes it to ${money(voucher)} while you do her other eye — and under that the number stops being yours to give, which is what a manager is for. Nobody walks out of a ladder you have not finished.`,
        bodyEs: `En ${forProduct.length} apuntes lo más bajo que dijiste en voz alta fue ${money(lowest)}. Hay un vale que lo deja en ${money(voucher)} mientras le haces el otro ojo — y por debajo de ahí el número deja de ser tuyo, para eso está el encargado. Nadie se va de una escalera que no has terminado.`,
        lessonId: 'O1',
      };
    }
  }

  // ── A weaker pattern is still a pattern ───────────────────────────────────
  if (topStep && topStep.value !== 'none' && topStep.count >= 2) {
    const v = patternVerdict();
    if (v) return v;
  }

  // ── And the one that is not on them ───────────────────────────────────────
  const clean = answered.filter((s) => s === 'none').length;
  if (clean >= 2 && clean >= answered.length / 2) {
    return {
      kind: 'clean',
      headline: 'Then it was not on you',
      headlineEs: 'Entonces no fue culpa tuya',
      body: `You wrote up ${clean} of ${total} as done properly — the speech, the mirror, the silence, the whole ladder. If that is honestly true then those are not yours to carry. Some customers were never buying, and that is part of the game. The only question worth asking is whether it really was all of it, every time.`,
      bodyEs: `Has apuntado ${clean} de ${total} como bien hechas — la explicación, el espejo, el silencio, la escalera entera. Si eso es verdad de verdad, esas no son tuyas para cargar con ellas. Algunas clientas no iban a comprar nunca, y eso es parte del juego. La única pregunta que importa es si de verdad lo hiciste todo, cada vez.`,
      lessonId: 'close-fault',
    };
  }

  return {
    kind: 'thin',
    headline: 'No single hole yet',
    headlineEs: 'Todavía no hay un agujero claro',
    body: `${total} written up and every one went wrong somewhere different. That is normal and it is not nothing — keep writing them up and the repeat will show itself.`,
    bodyEs: `${total} apuntadas y cada una se torció en un sitio distinto. Es normal y no es poco — sigue apuntándolas y lo que se repite acabará saliendo solo.`,
  };
}

/*
 * peeling.ts — the printable SPEECH for the middle of the ladder.
 *
 * Same contract as syringe.ts: every spoken line comes out of
 * `src/data/peelingData.ts`, every number comes out of `src/data/pricing.ts`
 * through `getPriceStepsData()`, and the placeholders are resolved with the
 * same `substitute()` the screens use. No price is typed into this file.
 *
 * Three things about the source worth knowing before you edit:
 *
 *   1. `getPriceStepsData()` takes an `_isEs` it never reads. Unlike the
 *      syringe helper it does NOT pick a language for you — `label` /
 *      `description` / `script` are always English and the `…Es` twins are
 *      always Spanish. Pick by hand or the Spanish sheet prints in English.
 *   2. The floor row's `description` is `'Absolute floor — same ${currency}${floor},
 *      nothing below it'` in a SINGLE-quoted string, so `${floor}` was never a
 *      template at all. `substitute()` fixes `${currency}` and cannot fix
 *      `${floor}`. That row's note is written here instead.
 *   3. The peeling's floor deliberately has no manager in it. The owner, asked
 *      directly: "On the peeling you don't need to call a manager. It's just
 *      that the math is like this." Its one voucher lands on its floor and the
 *      ladder ends. Do not "fix" it to match the syringe.
 */
import type { Block, Doc } from '../types';
import { substitute } from '../../../src/utils/currency';
import { peelingData, getPriceStepsData } from '../../../src/data/peelingData';
import { PEELING_LADDER, optionsBeside, type PriceRung } from '../../../src/data/pricing';

/* The print run is Andorra's. Gibraltar's sheet is the same call with '£'. */
const CURRENCY = '€';
const LOCATION = 'Andorra';

/**
 * Resolve placeholders and strip the screen-only affordances: the 💡 / ⚠
 * markers that tint a hint box, and the instruction to tap a step, which is
 * not advice a printed sheet can take.
 */
const t = (text: string): string =>
  substitute(text, CURRENCY, LOCATION)
    .replace(/^(?:💡|⚠️|⚠)\s*/u, '')
    .replace(/Tap each step[^.]*\.\s*/g, '')
    .replace(/Toca cada paso[^.]*\.\s*/g, '')
    .trim();

const money = (amount: number): string => `${CURRENCY}${amount}`;
const noColon = (label: string): string => label.replace(/\s*:\s*$/, '');

/* Option B, read off the ladder rather than named here. It is `parallel` in
   pricing.ts: offered BESIDE Offer 1, for MORE money, never descended to. */
const OPTION_B: PriceRung = (() => {
  const found = optionsBeside(PEELING_LADDER, 'promo')[0];
  if (!found) {
    throw new Error('pricing.ts: the peeling has no parallel option beside "promo" — Option B is gone');
  }
  return found;
})();

/* The hook's three tricks are a mixed array literal; name the shape so the
   optional stage direction and follow-up read cleanly. */
interface Trick {
  name: string;
  nameEs: string;
  quote: string;
  quoteEs: string;
  desc?: string;
  descEs?: string;
  followUpQuote?: string;
  followUpQuoteEs?: string;
}
const TRICKS: readonly Trick[] = peelingData.hook.tricks;

/* Promoted out of the twelve tip cards and onto the end of the sheet: the
   peeling is the MIDDLE of the ladder and the syringe is the star, so the
   sentence that gets her from the hand to the chair does not get buried. */
const BRIDGE_TIP = (() => {
  const found = peelingData.proTips.tips.find((x) => x.title.toLowerCase().includes('bridge it up'));
  if (!found) throw new Error('peelingData.proTips has no tip matching "bridge it up"');
  return found;
})();

function build(lang: 'en' | 'es'): Doc {
  const es = lang === 'es';
  const pick = (en: string, esText: string): string => t(es ? esText : en);

  const d = peelingData;
  const rungs = getPriceStepsData(CURRENCY, LOCATION, es);
  const [anchor, base, promo, credit, voucher, floor] = rungs;
  /* `getPriceStepsData` picks no language — see the file header. */
  const label = (r: (typeof rungs)[number]) => t(es ? r.labelEs : r.label);
  const note = (r: (typeof rungs)[number]) => t(es ? r.descriptionEs : r.description);
  const script = (r: (typeof rungs)[number]) => t(es ? r.scriptEs : r.script);

  const blocks: Block[] = [
    {
      type: 'intro',
      text: es
        ? 'El peeling es la mitad de la escalera. No es una crema y no reemplaza nada de lo que ya tiene en casa — es un tratamiento de una vez por semana que le quita la piel muerta y hace que todo lo que ya tiene funcione diez veces mejor. Se vende con una demo en la mano y el nombre de un dermatólogo, y es lo más fácil de contar de toda la tienda. Pero no te quedes aquí: la estrella es la jeringa, y esta demo en la mano es el camino más corto a la silla.'
        : 'The peeling is the middle of the ladder. It is not a cream and it does not replace anything she already has at home — it is a once-a-week treatment that takes the dead skin off and makes everything she already owns work ten times harder. It sells on a hand demo and a dermatologist\'s name, and it is the easiest thing in the shop to talk about. Just do not stop here: the syringe is the star, and this hand demo is the shortest route to the chair.',
    },

    /* The quick-reference strip. */
    {
      type: 'facts',
      items: [
        { label: noColon(pick(d.quickRef.items.use.label, d.quickRef.items.use.labelEs)), value: pick(d.quickRef.items.use.value, d.quickRef.items.use.valueEs) },
        { label: noColon(pick(d.quickRef.items.lasts.label, d.quickRef.items.lasts.labelEs)), value: pick(d.quickRef.items.lasts.value, d.quickRef.items.lasts.valueEs) },
        { label: noColon(pick(d.quickRef.items.creams.label, d.quickRef.items.creams.labelEs)), value: pick(d.quickRef.items.creams.value, d.quickRef.items.creams.valueEs) },
        { label: noColon(pick(d.quickRef.items.derm.label, d.quickRef.items.derm.labelEs)), value: pick(d.quickRef.items.derm.value, d.quickRef.items.derm.valueEs) },
      ],
    },

    /* ── The hook ── */
    { type: 'heading', text: pick(d.hook.heading, d.hook.headingEs) },
    ...TRICKS.map((trick): Block => {
      const lines = [pick(trick.quote, trick.quoteEs)];
      const direction = es ? trick.descEs : trick.desc;
      if (direction) lines.push(`[${t(direction)}]`);
      const followUp = es ? trick.followUpQuoteEs : trick.followUpQuote;
      if (followUp) lines.push(t(followUp));
      return { type: 'script', label: pick(trick.name, trick.nameEs), lines };
    }),

    /* ── The demo: the hand, the roll, the dead skin, the dermatologist. ── */
    { type: 'heading', text: pick(d.demo.heading, d.demo.headingEs) },
    {
      type: 'steps',
      items: d.demo.steps.map((s) => ({
        n: s.step,
        title: pick(s.title, s.titleEs),
        body: pick(s.text, s.textEs),
      })),
    },

    /* ── The two offers. Say the two anchors first or the offer is just a
          price. ── */
    { type: 'heading', text: pick(d.offers.heading, d.offers.headingEs) },
    {
      type: 'callout',
      title: es ? 'Primero las dos referencias' : 'The two anchors come first',
      body: pick(d.offers.subtext, d.offers.subtextEs),
    },
    {
      type: 'script',
      label: `${pick(d.offers.option1.label, d.offers.option1.labelEs)} — ${pick(d.offers.option1.priceLabel, d.offers.option1.priceLabelEs)}`,
      lines: [pick(d.offers.option1.text, d.offers.option1.textEs)],
    },
    {
      type: 'script',
      label: `${pick(d.offers.option2.label, d.offers.option2.labelEs)} — ${pick(d.offers.option2.priceLabel, d.offers.option2.priceLabelEs)}`,
      lines: [pick(d.offers.option2.text, d.offers.option2.textEs)],
    },

    /* ── The ladder. ── */
    { type: 'heading', text: es ? 'La Escalera de Precios' : 'The Price Ladder' },
    {
      type: 'callout',
      title: es ? 'Un paso a la vez' : 'One step at a time',
      /* The stored subtext is one sentence once the tap-a-step instruction is
         stripped, so the rule the peeling page never wrote down is added: the
         descent is for the customer who genuinely cannot reach the two offers,
         and Option B is not on it. */
      body: es
        ? `${pick(d.priceLadder.subtext, d.priceLadder.subtextEs)} Este es el camino hacia ABAJO, y es para la clienta que de verdad no llega a las dos ofertas — nadie más. La Opción B no está en él: va al lado de la Oferta 1, y es más dinero, no menos.`
        : `${pick(d.priceLadder.subtext, d.priceLadder.subtextEs)} This is the way DOWN, and it is for the customer who genuinely cannot reach the two offers — nobody else. Option B is not on it: it sits beside Offer 1, and it is more money, not less.`,
    },
    {
      type: 'ladder',
      rows: [
        { price: anchor.price, label: label(anchor), note: note(anchor), script: script(anchor), tone: 'anchor' },
        { price: base.price, label: label(base), note: note(base), script: script(base), tone: 'base' },
        {
          price: promo.price,
          label: label(promo),
          note: `${note(promo)} ${pick(d.priceLadder.highlightTip, d.priceLadder.highlightTipEs)}`,
          script: script(promo),
          tone: 'promo',
        },
        {
          /* NOT a step down. Option B is `parallel` in pricing.ts: it goes out
             BESIDE Offer 1, costs MORE, and she picks between the two. Drawn
             as the next rung down it has a seller offering the bigger number
             to somebody who was already saying yes to the smaller one. */
          price: money(OPTION_B.price),
          label: es ? OPTION_B.labelEs : OPTION_B.label,
          note: es
            ? 'No es un peldaño. Es la Opción B, y sale AL LADO de la Oferta 1 de arriba, nunca por debajo y nunca bajando hacia ella: paga MÁS y se lleva la Crema de Día y de Noche encima. Las dos salen juntas y elige ella.'
            : 'Not a rung. This is Option B, and it goes out BESIDE Offer 1 above it — never under it and never descended to. She pays MORE and walks out with the Day and Night Cream on top. Both go out together and she picks.',
          script: pick(d.offers.option2.text, d.offers.option2.textEs),
          tone: 'parallel',
        },
        { price: credit.price, label: label(credit), note: note(credit), script: script(credit), tone: 'base' },
        {
          price: voucher.price,
          label: label(voucher),
          note: pick(d.priceLadder.voucherTip, d.priceLadder.voucherTipEs),
          script: script(voucher),
          tone: 'voucher',
        },
        {
          /* Note written here, not lifted: the stored `description` carries a
             `${floor}` that was never a template. And the peeling's floor has
             no manager in it on purpose — see the file header. */
          price: floor.price,
          label: label(floor),
          note: es
            ? `${t(d.priceLadder.lastResortWarningEs)} El cupón cae aquí y aquí se acaba la escalera: con cupón o sin cupón no hay nada por debajo, y en el peeling no vas a buscar a ningún encargado.`
            : `${t(d.priceLadder.lastResortWarning)} The voucher lands here and this is the end of the ladder: voucher or no voucher there is nothing underneath it, and on the peeling you do not go and fetch a manager for it.`,
          script: script(floor),
          tone: 'floor',
        },
      ],
    },

    /* ── The emotional close. The stage directions are the page's own three
          fragments, put back together. ── */
    { type: 'heading', text: pick(d.emotionalClose.heading, d.emotionalClose.headingEs) },
    {
      type: 'script',
      label: pick(d.emotionalClose.heartSellLabel, d.emotionalClose.heartSellLabelEs),
      lines: [
        pick(d.emotionalClose.heartSellQuote, d.emotionalClose.heartSellQuoteEs),
        `[${pick(d.emotionalClose.emotionInstruction, d.emotionalClose.emotionInstructionEs)} ${pick(d.emotionalClose.emotionInstructionBold, d.emotionalClose.emotionInstructionBoldEs)} ${pick(d.emotionalClose.emotionInstructionAfter, d.emotionalClose.emotionInstructionAfterEs)}]`,
        pick(d.emotionalClose.closeQuote, d.emotionalClose.closeQuoteEs),
        `[${pick(d.emotionalClose.pauseInstruction, d.emotionalClose.pauseInstructionEs)}]`,
      ],
    },

    /* ── Pro tips, minus the one promoted to the closing callout. ── */
    { type: 'heading', text: pick(d.proTips.heading, d.proTips.headingEs) },
    {
      type: 'tips',
      items: d.proTips.tips
        .filter((tip) => tip !== BRIDGE_TIP)
        .map((tip) => ({ title: pick(tip.title, tip.titleEs), body: pick(tip.text, tip.textEs) })),
    },

    /* ── The two boxes the sheet ends on. ── */
    {
      type: 'callout',
      title: es ? 'Un cupón, una vez' : 'One voucher, once',
      body: es
        ? `El cupón lo usas una vez, y en el peeling cae directo en el mínimo: ${money(PEELING_LADDER.floor)}, solo en el Peeling individual, nunca en el combo. No hay segundo cupón — inventarte otro le dice que el primero también te lo inventaste. Y al contrario que con la jeringa, aquí no vas a buscar a nadie: en el peeling las cuentas se acaban ahí y punto.`
        : `You use the voucher once, and on the peeling it lands straight on the floor: ${money(PEELING_LADDER.floor)}, single Peeling only, never the combo. There is no second voucher — inventing another one tells her the first was invented too. And unlike the syringe, you do not go and fetch anybody for this number: on the peeling the maths simply stops there.`,
    },
    {
      type: 'callout',
      title: pick(BRIDGE_TIP.title, BRIDGE_TIP.titleEs),
      body: pick(BRIDGE_TIP.text, BRIDGE_TIP.textEs),
    },
  ];

  return {
    slug: es ? 'peeling-es' : 'peeling-en',
    lang,
    kind: 'lesson',
    eyebrow: pick(d.hero.badge, d.hero.badgeEs),
    title: pick(d.hero.title, d.hero.titleEs),
    subtitle: pick(d.hero.subtitle, d.hero.subtitleEs),
    blocks,
  };
}

export function buildPeelingDocs(): Doc[] {
  return [build('en'), build('es')];
}

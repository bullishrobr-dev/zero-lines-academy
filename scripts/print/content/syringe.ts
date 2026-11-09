/*
 * syringe.ts — the printable SPEECH for the star product.
 *
 * Nothing here is typed out by hand that the app already knows. Every spoken
 * line comes out of `src/data/syringeData.ts`, every number comes out of
 * `src/data/pricing.ts` by way of it, and the placeholders are resolved with
 * the same `substitute()` the screens use. Move a rung and this sheet follows;
 * reword a script and this sheet follows. That is the whole point of generating
 * it rather than writing it.
 *
 * Two things in here are deliberately NOT lifted from the data, and both are
 * recorded so nobody "fixes" them back:
 *
 *   1. The floor's label and note. `priceSteps.minimumLabel` still reads
 *      "Minimum (Manager Only)" and the Spanish `minimumWarning` still carries
 *      the retired line about a seller who reaches the floor alone having no
 *      floor. The owner was asked directly: "We call the manager just for the
 *      show. The seller is allowed to sell it for 100." So the manager is
 *      THEATRE, never permission. The rung label is taken from pricing.ts and
 *      the Spanish note is written to match the English one, which is right.
 *   2. The peeling-style `${floor}` leak does not exist on this page, but the
 *      heading does say "Interactive Price Ladder". Paper is not interactive.
 */
import type { Block, Doc } from '../types';
import { substitute } from '../../../src/utils/currency';
import { syringeData, getLocalizedPriceSteps } from '../../../src/data/syringeData';
import { SYRINGE_LADDER, eachOf, optionsBeside, type PriceRung } from '../../../src/data/pricing';

/* The print run is Andorra's. Gibraltar's sheet is the same call with '£'. */
const CURRENCY = '€';
const LOCATION = 'Andorra';

/**
 * Resolve placeholders and strip screen-only decoration.
 *
 * `substitute()` fills {currency} / {locationName}. The rest is the screen
 * affordances that do not survive a printer: the 💡 / ⚠ markers the app uses
 * to tint a hint box, the keycap emoji in the two promises, and the
 * instruction to tap a step, which is not advice a printed sheet can take.
 */
const t = (text: string): string =>
  substitute(text, CURRENCY, LOCATION)
    .replace(/^(?:💡|⚠️|⚠)\s*/u, '')
    .replace(/1️⃣/g, '1)')
    .replace(/2️⃣/g, '2)')
    .replace(/Tap each step[^.]*\.\s*/g, '')
    .replace(/Toca cada paso[^.]*\.\s*/g, '')
    .trim();

const money = (amount: number): string => `${CURRENCY}${amount}`;
const noColon = (label: string): string => label.replace(/\s*:\s*$/, '');

/* Option B, read off the ladder rather than named here. It is `parallel` in
   pricing.ts: it sits BESIDE the promo rung, costs MORE, and is never
   descended to. `optionsBeside` is the only honest way to find it. */
const OPTION_B: PriceRung = (() => {
  const found = optionsBeside(SYRINGE_LADDER, 'promo')[0];
  if (!found) {
    throw new Error('pricing.ts: the syringe has no parallel option beside "promo" — Option B is gone');
  }
  return found;
})();
const OPTION_B_UNITS = OPTION_B.units ?? 1;
const OPTION_B_EACH = money(eachOf(OPTION_B));

const FLOOR_RUNG: PriceRung = (() => {
  const found = SYRINGE_LADDER.steps.find((s) => s.id === 'floor');
  if (!found) throw new Error('pricing.ts: the syringe has no "floor" rung');
  return found;
})();

/* The two tips that are too important to be the ninth card on a page of
   twelve. Found by substring so a reworded title does not break the build. */
const tipLike = (needle: string) => {
  const found = syringeData.proTips.tips.find((x) => x.title.toLowerCase().includes(needle));
  if (!found) throw new Error(`syringeData.proTips has no tip matching "${needle}"`);
  return found;
};
const SECOND_EYE_TIP = tipLike('second eye first');
const HANDOVER_TIP = tipLike('job ends at the syringe');

function build(lang: 'en' | 'es'): Doc {
  const es = lang === 'es';
  const pick = (en: string, esText: string): string => t(es ? esText : en);

  const d = syringeData;
  const rungs = getLocalizedPriceSteps(CURRENCY, LOCATION, es);
  const [anchor, base, promo, noGift, voucher, floor] = rungs;

  const blocks: Block[] = [
    {
      type: 'intro',
      text: es
        ? 'La jeringa es la estrella. Todo lo demás de la tienda es práctica — esta es la que te mide, y durante tus dos primeras semanas es lo único que haces. Alternativa natural al bótox, resultado instantáneo en un ojo, un año entero dentro del tubo. Apréndete este discurso hasta que te salga sin pensarlo. Y acuérdate de dónde se acaba tu trabajo: ella paga, y entonces la pasas al upseller. No te pongas a venderle un exfoliante.'
        : 'The syringe is the star. Everything else in the shop is practice — this is the one you are measured on, and for your first two weeks it is the only thing you do. Natural alternative to Botox, instant result on one eye, a full year inside the tube. Learn this speech until it comes out of you without thinking. And remember where your job ends: she pays, and then you hand her to the upseller. You do not start selling her a scrub.',
    },

    /* The quick-reference strip. */
    {
      type: 'facts',
      items: [
        { label: noColon(pick(d.quickRef.useLabel, d.quickRef.useLabelEs)), value: pick(d.quickRef.useValue, d.quickRef.useValueEs) },
        { label: noColon(pick(d.quickRef.lastsLabel, d.quickRef.lastsLabelEs)), value: pick(d.quickRef.lastsValue, d.quickRef.lastsValueEs) },
        { label: noColon(pick(d.quickRef.resultsLabel, d.quickRef.resultsLabelEs)), value: pick(d.quickRef.resultsValue, d.quickRef.resultsValueEs) },
        { label: noColon(pick(d.quickRef.ruleLabel, d.quickRef.ruleLabelEs)), value: pick(d.quickRef.ruleValue, d.quickRef.ruleValueEs) },
      ],
    },

    /* ── The hook ── */
    { type: 'heading', text: pick(d.hook.sectionTitle, d.hook.sectionTitleEs) },
    {
      type: 'script',
      label: pick(d.hook.script1Label, d.hook.script1LabelEs),
      lines: [
        pick(d.hook.script1Text, d.hook.script1TextEs),
        `[${pick(d.hook.script1Instruction, d.hook.script1InstructionEs)}]`,
        pick(d.hook.script1Continuation, d.hook.script1ContinuationEs),
      ],
    },
    {
      type: 'script',
      label: pick(d.hook.script2Label, d.hook.script2LabelEs),
      lines: [
        pick(d.hook.script2Text, d.hook.script2TextEs),
        `[${pick(d.hook.script2Instruction, d.hook.script2InstructionEs)}]`,
        pick(d.hook.script2Continuation, d.hook.script2ContinuationEs),
      ],
    },
    {
      type: 'script',
      label: pick(d.hook.script3Label, d.hook.script3LabelEs),
      lines: [pick(d.hook.script3Text, d.hook.script3TextEs)],
    },

    /* ── The demo, in the order it runs. Step 8 is the second eye and its
          ordering is load-bearing: the voucher lands while her eye is being
          done and BEFORE she sees it, and the mirror comes last. ── */
    { type: 'heading', text: pick(d.demo.sectionTitle, d.demo.sectionTitleEs) },
    {
      type: 'steps',
      items: d.demo.steps.map((s) => ({
        n: s.step,
        title: pick(s.title, s.titleEs),
        body: pick(s.text, s.textEs),
      })),
    },
    {
      type: 'callout',
      title: pick(SECOND_EYE_TIP.title, SECOND_EYE_TIP.titleEs),
      body: pick(SECOND_EYE_TIP.text, SECOND_EYE_TIP.textEs),
    },

    /* ── The two offers. They go out together, Option B beside Offer 1. ── */
    { type: 'heading', text: pick(d.offers.heading, d.offers.headingEs) },
    {
      type: 'callout',
      title: es ? 'Salen juntas' : 'They go out together',
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
    {
      type: 'script',
      label: pick(d.offers.twoChoiceLabel, d.offers.twoChoiceLabelEs),
      lines: [pick(d.offers.twoChoiceScript, d.offers.twoChoiceScriptEs)],
    },

    /* ── The partner. He is the first person you work on, not the one you
          write off. ── */
    { type: 'heading', text: pick(d.partnerUpsell.sectionTitle, d.partnerUpsell.sectionTitleEs) },
    {
      type: 'tips',
      items: [
        {
          title: pick(d.partnerUpsell.subtitle, d.partnerUpsell.subtitleEs),
          body: pick(d.partnerUpsell.description, d.partnerUpsell.descriptionEs),
        },
        {
          title: es ? 'Cuándo empujar la Opción B' : 'When to push Option B',
          body: pick(d.partnerUpsell.advancedLabel, d.partnerUpsell.advancedLabelEs),
        },
      ],
    },
    {
      type: 'script',
      label: es ? 'Después de la revelación' : 'After the reveal',
      lines: [pick(d.partnerUpsell.script1, d.partnerUpsell.script1Es)],
    },
    {
      type: 'script',
      label: pick(d.partnerUpsell.option2Intro, d.partnerUpsell.option2IntroEs),
      lines: [pick(d.partnerUpsell.option2Script, d.partnerUpsell.option2ScriptEs)],
    },
    {
      type: 'script',
      label: es ? 'Y échale regalos encima' : 'And pile the gifts on it',
      lines: [pick(d.partnerUpsell.advancedScript, d.partnerUpsell.advancedScriptEs)],
    },

    /* ── The ladder. ── */
    { type: 'heading', text: es ? 'La Escalera de Precios' : 'The Price Ladder' },
    {
      type: 'callout',
      title: es ? 'Este es el camino hacia ABAJO' : 'This is the way DOWN',
      body: pick(d.priceLadder.description, d.priceLadder.descriptionEs),
    },
    {
      type: 'ladder',
      rows: [
        {
          price: anchor.price,
          label: anchor.label,
          note: t(anchor.description),
          script: t(anchor.script),
          tone: 'anchor',
        },
        {
          price: base.price,
          label: base.label,
          note: t(base.description),
          script: t(base.script),
          tone: 'base',
        },
        {
          price: promo.price,
          label: promo.label,
          note: `${t(promo.description)} ${pick(d.priceLadder.highlightHint, d.priceLadder.highlightHintEs)}`,
          script: t(promo.script),
          tone: 'promo',
        },
        {
          /* NOT a step down. Option B is `parallel` in pricing.ts: it is
             offered BESIDE the rung above it, for MORE money, and the customer
             picks between the two. A sheet that draws it as the next rung down
             has a seller offering the bigger number to somebody who was already
             saying yes to the smaller one. */
          price: money(OPTION_B.price),
          label: es ? OPTION_B.labelEs : OPTION_B.label,
          note: es
            ? `No es un peldaño. Es la Opción B, y sale AL LADO de la oferta de arriba, nunca por debajo y nunca bajando hacia ella: cuesta MÁS por el doble de producto (${OPTION_B_EACH} cada una). Las dos salen juntas y elige ella.`
            : `Not a rung. This is Option B, and it goes out BESIDE the offer above it — never under it and never descended to. It is MORE money for double the product (${OPTION_B_EACH} each). Both go out together and she picks.`,
          script: pick(d.offers.option2.text, d.offers.option2.textEs),
          tone: 'parallel',
          units: OPTION_B_UNITS,
          each: OPTION_B_EACH,
        },
        {
          price: noGift.price,
          label: noGift.label,
          note: t(noGift.description),
          script: t(noGift.script),
          tone: 'base',
        },
        {
          price: voucher.price,
          label: voucher.label,
          note: pick(d.priceLadder.voucherHint, d.priceLadder.voucherHintEs),
          script: t(voucher.script),
          tone: 'voucher',
        },
        {
          /* Label from pricing.ts, note from the English `minimumWarning` —
             see the file header for why the stored label and the Spanish
             warning are not used. The manager is theatre. The seller is
             allowed to sell at this price. */
          price: floor.price,
          label: es ? FLOOR_RUNG.labelEs : FLOOR_RUNG.label,
          note: es
            ? 'Un cupón, una vez — luego vas a mercado puro y VAS A BUSCAR AL ENCARGADO. Puedes vender a este precio tú solo; lo que te da ir a buscarlo es que suene a precio que alguien ha tenido que pelear, no a uno que siempre estuvo ahí.'
            : t(d.priceLadder.minimumWarning),
          script: t(floor.script),
          tone: 'floor',
        },
      ],
    },

    /* ── The voucher close. ── */
    { type: 'heading', text: pick(d.voucherClose.sectionTitle, d.voucherClose.sectionTitleEs) },
    {
      type: 'script',
      label: pick(d.voucherClose.exactWordsLabel, d.voucherClose.exactWordsLabelEs),
      lines: [pick(d.voucherClose.voucherScript, d.voucherClose.voucherScriptEs)],
    },
    {
      type: 'script',
      label: pick(d.voucherClose.twoPromisesLabel, d.voucherClose.twoPromisesLabelEs),
      lines: [pick(d.voucherClose.twoPromisesScript, d.voucherClose.twoPromisesScriptEs)],
    },
    {
      type: 'script',
      label: pick(d.voucherClose.whatsappLabel, d.voucherClose.whatsappLabelEs),
      lines: [pick(d.voucherClose.whatsappScript, d.voucherClose.whatsappScriptEs)],
    },
    {
      type: 'callout',
      title: es ? 'Después de la venta' : 'After the sale',
      body: pick(d.voucherClose.whatsappNote, d.voucherClose.whatsappNoteEs),
    },

    /* ── Pro tips, minus the two promoted to callouts. ── */
    { type: 'heading', text: pick(d.proTips.sectionTitle, d.proTips.sectionTitleEs) },
    {
      type: 'tips',
      items: d.proTips.tips
        .filter((tip) => tip !== SECOND_EYE_TIP && tip !== HANDOVER_TIP)
        .map((tip) => ({
          title: pick(tip.title, tip.titleEs),
          body: pick(tip.text, tip.textEs),
        })),
    },

    /* ── The two boxes the sheet ends on. ── */
    {
      type: 'callout',
      title: es ? 'La promesa se acaba en el año' : 'The claim stops at the year',
      body: es
        ? `Una jeringa — ${d.quickRef.resultsValueEs}, ${d.quickRef.useValueEs}, ${d.quickRef.lastsValueEs}, y la única regla: ${d.quickRef.ruleValueEs.toLowerCase()}. Esa es toda la promesa y ahí se acaba. Nada de lo que digas puede hacer que el efecto dure más que el tratamiento, y lo que pasa después no lo saques tú — si pregunta, la respuesta está en los consejos pro.`
        : `One syringe — ${d.quickRef.resultsValue}, ${d.quickRef.useValue.toLowerCase()}, ${d.quickRef.lastsValue}, and the one rule: ${d.quickRef.ruleValue.toLowerCase()}. That is the whole promise and it stops there. Nothing you say may make the effect outlive the treatment, and you never volunteer what happens afterwards — if she asks, the answer is in the pro tips.`,
    },
    {
      type: 'callout',
      title: pick(HANDOVER_TIP.title, HANDOVER_TIP.titleEs),
      body: pick(HANDOVER_TIP.text, HANDOVER_TIP.textEs),
    },
  ];

  return {
    slug: es ? 'syringe-es' : 'syringe-en',
    lang,
    kind: 'lesson',
    eyebrow: pick(d.hero.badge, d.hero.badgeEs),
    title: pick(d.hero.title, d.hero.titleEs),
    subtitle: pick(d.hero.subtitle, d.hero.subtitleEs),
    blocks,
  };
}

export function buildSyringeDocs(): Doc[] {
  return [build('en'), build('es')];
}

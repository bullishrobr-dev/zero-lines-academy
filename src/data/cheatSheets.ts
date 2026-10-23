// ─────────────────────────────────────────────────────────────────────────────
// cheatSheets.ts — every word a seller reads off the Cheat Sheets screen.
//
// This content used to live inside CheatSheetsPage.tsx as nine builder
// functions. Half of its price strings were single-quoted, so `${currency}`
// was never interpolated and sellers literally read "150${currency}" to
// customers. Two rules keep that from ever happening again:
//
//   1. NO currency symbol and NO template-literal placeholder in copy.
//      Write the plain tokens {currency} and {locationName}; the page resolves
//      them with `sub()` from src/utils/currency.ts.
//   2. NO typed-in prices. Every number comes from src/data/pricing.ts, so the
//      spoken script and the price column can never drift apart.
//
// Every string has an `*Es` twin (European Spanish, informal "tú").
// ─────────────────────────────────────────────────────────────────────────────

import {
  MIX_MATCH_LADDER,
  PEELING_LADDER,
  SYRINGE_LADDER,
  eachOf,
  type PriceLadder,
  type PriceRung,
} from './pricing';
import type { Language } from './translations';
import { THE_RUSH_AND_THE_QUESTION } from './canonicalScripts';

/** Pick the string for the active language. */
export function tr(lang: Language, en: string, es: string): string {
  return lang === 'es' ? es : en;
}

// ── Accents ──────────────────────────────────────────────────────────────────
// One hue per product so the four ladders are told apart at a glance.
// A coloured FILL is only ever used behind icons/bars, never behind text.

export type AccentName = 'teal' | 'coral' | 'gold' | 'violet';

export const ACCENT: Record<AccentName, { text: string; tint: string; fill: string; border: string }> = {
  teal: { text: 'text-teal-strong', tint: 'bg-teal-tint', fill: 'bg-teal', border: 'border-teal' },
  coral: { text: 'text-coral-strong', tint: 'bg-coral-tint', fill: 'bg-coral', border: 'border-coral' },
  gold: { text: 'text-gold-strong', tint: 'bg-gold-tint', fill: 'bg-gold', border: 'border-gold' },
  violet: { text: 'text-violet-strong', tint: 'bg-violet-tint', fill: 'bg-violet', border: 'border-violet' },
};

// ── Price ladders ────────────────────────────────────────────────────────────

/** How a rung behaves, which drives how it is drawn. */
export type RungTone = 'anchor' | 'base' | 'offer' | 'upsell' | 'fallback' | 'floor';

export interface LadderRung {
  id: string;
  tone: RungTone;
  label: string;
  labelEs: string;
  /** Total asked for at this rung. */
  amount: number;
  /** How many units that total buys. Absent means one. */
  units?: number;
  /** True when `amount` is per item rather than a bundle total. */
  perUnit?: boolean;
  /** The line the seller says out loud. */
  words: string;
  wordsEs: string;
  /** The rung to open with — drawn raised. */
  recommended?: boolean;
  /**
   * When this rung is allowed, for rungs that are NOT simply the next step
   * down.
   *
   * Buy 2 get 2 is the case that forced this. It is the same {currency}120 as
   * buy 2 get 1 but hands over a fourth unit, so read as a plain ladder step it
   * teaches a seller to give away stock for nothing. It is not a step: it is a
   * situational offer for a group or the holidays, where four units actually
   * get used. Without the condition printed on the rung, a seller scanning the
   * ladder mid-sale offers it to a solo customer who was about to pay 120 for
   * three.
   */
  when?: string;
  whenEs?: string;
  /**
   * Not a step down at all — the OTHER option, drawn beside the rung above it.
   *
   * Carried straight through from `PriceRung.parallel` in pricing.ts, where the
   * owner's words live. Buy-2-get-2 above is a situational VARIANT of its rung
   * at the same price, and `when` is enough for it. Option B is a different
   * thing: it costs MORE than the offer it sits next to, so drawn as the next
   * step down it had the sheet descending 210 → 300 → 175 with a shorter bar at
   * the higher price. This flag takes it off the descent entirely.
   */
  parallel?: boolean;
}

export type ProductKey = 'syringe' | 'peeling' | 'scrub' | 'nailkit';

export interface ProductLadder {
  id: ProductKey;
  accent: AccentName;
  name: string;
  nameEs: string;
  /** Chip-sized name, used on script cards. */
  short: string;
  shortEs: string;
  europeAnchor: number;
  base: number;
  floor: number;
  /** Base/anchor are per item (the mix & match jars), not a bundle. */
  perUnit?: boolean;
  rungs: LadderRung[];
  /** The demo or guarantee that carries the pitch — not a price step. */
  proof: { label: string; labelEs: string; words: string; wordsEs: string };
}

/** Read one authoritative rung out of pricing.ts. */
function rungOf(ladder: PriceLadder, id: string): PriceRung {
  const found = ladder.steps.find((s) => s.id === id);
  if (!found) throw new Error(`pricing.ts has no rung "${id}"`);
  return found;
}

/**
 * Carry a pricing.ts rung's id, label and numbers into a ladder rung.
 *
 * `parallel` rides along on purpose: whether a price is on the descent is a
 * fact about the offer, decided once in pricing.ts, not a styling choice each
 * sheet makes for itself.
 */
function fromPricing(r: PriceRung) {
  return {
    id: r.id,
    label: r.label,
    labelEs: r.labelEs,
    amount: r.price,
    units: r.units,
    ...(r.parallel ? { parallel: true as const } : null),
  };
}

/** Per-unit value of a rung — what makes the descent legible. */
export function perUnitAmount(rung: { amount: number; units?: number }): number {
  return rung.amount / (rung.units ?? 1);
}

/* `eachOf` — per-unit value of a rung still in its pricing.ts shape — used to
   be a second copy of this maths here. It lives in pricing.ts now, next to the
   units it divides by, and is imported above. */

const SYR_PROMO = rungOf(SYRINGE_LADDER, 'promo');
const SYR_TWO = rungOf(SYRINGE_LADDER, 'second-free');
const SYR_NO_GIFT = rungOf(SYRINGE_LADDER, 'no-gift');
const SYR_VOUCHER = rungOf(SYRINGE_LADDER, 'voucher');
const SYR_FLOOR = rungOf(SYRINGE_LADDER, 'floor');

/* Applications in one syringe — a product fact, not a price, and the divisor
   behind "a bit over {currency}2 a go". Typed once here so the per-use maths
   cannot quietly stop matching the rung it is divided from. */
const SYR_USES = 60;

const PEEL_PROMO = rungOf(PEELING_LADDER, 'promo');
const PEEL_CREAMS = rungOf(PEELING_LADDER, 'creams-free');
const PEEL_NO_SCRUB = rungOf(PEELING_LADDER, 'no-scrub');
const PEEL_VOUCHER = rungOf(PEELING_LADDER, 'voucher');

const MIX_B2G1 = rungOf(MIX_MATCH_LADDER, 'b2g1');
const MIX_B2G2 = rungOf(MIX_MATCH_LADDER, 'b2g2');
const MIX_B1G1 = rungOf(MIX_MATCH_LADDER, 'b1g1');
const MIX_FLOOR = rungOf(MIX_MATCH_LADDER, 'floor');

const SYR_A = SYRINGE_LADDER.europeAnchor;
const SYR_B = SYRINGE_LADDER.base;
const PEEL_A = PEELING_LADDER.europeAnchor;
const PEEL_B = PEELING_LADDER.base;
const MIX_A = MIX_MATCH_LADDER.europeAnchor;
const MIX_B = MIX_MATCH_LADDER.base;

const EUROPE_ANCHOR_LABEL = 'Europe Price Anchor';
const EUROPE_ANCHOR_LABEL_ES = 'Precio Ancla de Europa';
const BASE_LABEL = '{locationName} Price';
const BASE_LABEL_ES = 'Precio de {locationName}';

/**
 * Buy 2 get 1, buy 2 get 2 and buy 1 get 1 are shared by the mix & match family.
 *
 * The descent here is in TOTAL SPEND, not in unit price: 120 → 120 → 60 → 30.
 * Per unit, everything below the opening offer is the same 30, so the seller is
 * not discounting as they go down — they are shrinking the ask until it is small
 * enough to say yes to. Reading the rungs as unit prices is what makes buy 2
 * get 2 look like a bargain to hand out; see LadderRung.when.
 */
function mixMatchDeals(companions: string, companionsEs: string): LadderRung[] {
  return [
    {
      ...fromPricing(MIX_B2G1),
      tone: 'offer',
      recommended: true,
      words: `"Take any 2 and the third one is free — {currency}${MIX_B2G1.price} for ${MIX_B2G1.units}. Mix them however you like: ${companions}."`,
      wordsEs: `"Llévate 2 cualesquiera y el tercero es gratis — {currency}${MIX_B2G1.price} por ${MIX_B2G1.units}. Los mezclas como quieras: ${companionsEs}."`,
    },
    {
      ...fromPricing(MIX_B2G2),
      tone: 'offer',
      when: 'Only for a group, or at Christmas. Never volunteer it to one person.',
      whenEs: 'Solo para un grupo, o en Navidad. Nunca se lo ofrezcas por tu cuenta a una sola persona.',
      words: `"We have buy 2 get 1 — but listen, for you I'll do buy 2, get 2. Same {currency}${MIX_B2G2.price}, and you walk out with ${MIX_B2G2.units}. That is an amazing deal."`,
      wordsEs: `"Tenemos el compra 2 y llévate 1 — pero mira, para ti lo hago compra 2 y llévate 2. Los mismos {currency}${MIX_B2G2.price}, y te llevas ${MIX_B2G2.units}. Es un chollo."`,
    },
    {
      ...fromPricing(MIX_B1G1),
      tone: 'fallback',
      when: 'They love it but do not need three. Shrink the ask, not the value.',
      whenEs: 'Les encanta pero no necesitan tres. Reduce lo que pides, no el valor.',
      words: `"My last customer only took one. Let me do something nice for you — buy one, and I'll give you the other one free. I'll staple both receipts together. {currency}${MIX_B1G1.price} for ${MIX_B1G1.units}."`,
      wordsEs: `"Mi última clienta se llevó solo uno. Déjame hacerte algo bonito — compra uno y te regalo el otro. Te grapo los dos tickets juntos. {currency}${MIX_B1G1.price} por ${MIX_B1G1.units}."`,
    },
  ];
}

export const PRODUCT_LADDERS: ProductLadder[] = [
  {
    id: 'syringe',
    accent: 'teal',
    name: 'Hyaluronic Acid Syringe (Eye Treatment)',
    nameEs: 'Jeringa de Ácido Hialurónico (Tratamiento de Ojos)',
    short: 'Syringe',
    shortEs: 'Jeringa',
    europeAnchor: SYR_A,
    base: SYR_B,
    floor: SYRINGE_LADDER.floor,
    rungs: [
      {
        id: 'anchor',
        tone: 'anchor',
        label: EUROPE_ANCHOR_LABEL,
        labelEs: EUROPE_ANCHOR_LABEL_ES,
        amount: SYR_A,
        words: `"In our shops in Europe this goes for {currency}${SYR_A} — but here in {locationName} we have a much better price for you."`,
        wordsEs: `"En nuestras tiendas de Europa esto cuesta {currency}${SYR_A} — pero aquí en {locationName} tenemos un precio mucho mejor para ti."`,
      },
      {
        id: 'base',
        tone: 'base',
        label: BASE_LABEL,
        labelEs: BASE_LABEL_ES,
        amount: SYR_B,
        words: `"Here it is only {currency}${SYR_B}."`,
        wordsEs: `"Aquí son solo {currency}${SYR_B}."`,
      },
      {
        ...fromPricing(SYR_PROMO),
        tone: 'offer',
        recommended: true,
        /* The two options are the same two every time, so the seller always has
           something concrete in their mouth. Printed on Offer 1 because this is
           the rung a seller opens on and reads first. */
        when: 'Offer 1 of 2. It never goes out on its own — Option B goes with it, always the same two.',
        whenEs: 'Oferta 1 de 2. Nunca sale sola — la Opción B va con ella, siempre las mismas dos.',
        words: `"Right now we have an amazing offer — 30% off, so {currency}${SYR_PROMO.price} instead of {currency}${SYR_B}, and you still choose a gift: Day Cream, Night Cream or the Peeling."`,
        wordsEs: `"Ahora mismo tenemos una oferta increíble — un 30% de descuento, así que {currency}${SYR_PROMO.price} en vez de {currency}${SYR_B}, y además eliges un regalo: Crema de Día, Crema de Noche o el Peeling."`,
      },
      {
        ...fromPricing(SYR_TWO),
        tone: 'upsell',
        /* Option B. Not a step — a fork, and the expensive side of it. You are
           reading her all the way through the demo; if she reads well this is
           the one you lean on, and gifts are cheap from up here. */
        when: `Option B, beside Offer 1 — never below it. It is {currency}${SYR_TWO.price}, MORE than the {currency}${SYR_PROMO.price}. You have been reading her all through the demo: if she reads well, push this one, and pile gifts on it — you are still miles above your minimum. The way down is for the customer who genuinely cannot reach it.`,
        whenEs: `Opción B, al lado de la Oferta 1 — nunca por debajo. Son {currency}${SYR_TWO.price}, MÁS que los {currency}${SYR_PROMO.price}. La has estado leyendo toda la demostración: si la ves bien, empuja esta, y échale regalos encima — sigues muy por encima de tu mínimo. El camino hacia abajo es para quien de verdad no llega.`,
        words: `"Or — and this is the one most people take — you pay the normal {currency}${SYR_TWO.price} and you walk out with TWO syringes. The second one is free: forehead, upper lip, the frown lines between your eyebrows. That is {currency}${eachOf(SYR_TWO)} each instead of {currency}${SYR_PROMO.price} for one, and I'll put the Day and Night Cream in as well. Which one do you want?"`,
        wordsEs: `"O — y esta es la que se lleva casi todo el mundo — pagas los {currency}${SYR_TWO.price} normales y te vas con DOS jeringas. La segunda es gratis: frente, labio superior, el entrecejo. Te salen a {currency}${eachOf(SYR_TWO)} cada una en vez de {currency}${SYR_PROMO.price} por una, y te meto la Crema de Día y de Noche también. ¿Cuál quieres?"`,
      },
      {
        ...fromPricing(SYR_NO_GIFT),
        tone: 'fallback',
        words: `"Let me take the gift out of the deal and I can do {currency}${SYR_NO_GIFT.price} for the syringe on its own."`,
        wordsEs: `"Déjame quitar el regalo y te dejo la jeringa sola en {currency}${SYR_NO_GIFT.price}."`,
      },
      {
        ...fromPricing(SYR_VOUCHER),
        tone: 'fallback',
        when: 'Say it while you start her OTHER EYE — hands busy, face tilted up. One voucher, once. There is no second one.',
        whenEs: 'Dilo mientras le empiezas el OTRO OJO — manos ocupadas, cara hacia arriba. Un cupón, una vez. No hay un segundo.',
        words: `"You know what, let me fix your other eye real quick. [start it] … Listen, I have a 20% voucher here and I'll do it for you. But you are being greedy now, eh? {currency}${SYR_NO_GIFT.price} down to {currency}${SYR_VOUCHER.price} — the syringe on its own, no gift, and only while you are sitting in front of me."`,
        wordsEs: `"¿Sabes qué? Déjame arreglarte el otro ojo rapidito. [empieza] … Mira, tengo aquí un cupón del 20% y te lo hago. Pero qué morro tienes, ¿eh? De {currency}${SYR_NO_GIFT.price} a {currency}${SYR_VOUCHER.price} — la jeringa sola, sin regalo, y solo mientras estés aquí sentada delante de mí."`,
      },
      {
        ...fromPricing(SYR_FLOOR),
        tone: 'floor',
        /* You ARE allowed to sell at the floor — the owner is explicit about
           that. What the manager buys is theatre, and the theatre is the whole
           point: a number you drop to on your own sounds like one that was
           sitting there all along. Fetched for, it is a number somebody had to
           go and win. */
        when: 'FETCH HIM. Full market first, then go — it lands from him, never from you.',
        whenEs: 'VE A POR ÉL. Primero mercado puro, luego vas — de su boca cae, de la tuya no.',
        words: `"Give me ten seconds, I'll see what I can do for you." [Go and get the manager.] {currency}${SYR_FLOOR.price} is the lowest this ever goes, and it has to come out of his mouth. Say it yourself and she hears a price that was always there; make him walk over for it and she hears a price you went and got her.`,
        wordsEs: `"Dame diez segundos, a ver qué puedo hacer por ti." [Ve a por el encargado.] {currency}${SYR_FLOOR.price} es lo más bajo a lo que llega esto, y tiene que salir de su boca. Si lo dices tú, ella oye un precio que ya estaba ahí; si él cruza la tienda para dárselo, oye un precio que has ido a buscarle.`,
      },
    ],
    proof: {
      label: 'Proof move — one eye only, and the other one is the close',
      labelEs: 'Prueba — solo un ojo, y el otro es el cierre',
      words: `"Let me do one eye only — then you hold the mirror and tell me if you see the difference." You never do the second one for free: it comes out at {currency}${SYR_NO_GIFT.price} as the cover for the voucher, or after she has paid.`,
      wordsEs: `"Déjame hacerte solo un ojo — luego coges el espejo y me dices si ves la diferencia." El segundo no es gratis nunca: sale a {currency}${SYR_NO_GIFT.price} como tapadera del cupón, o cuando ya ha pagado.`,
    },
  },
  {
    id: 'peeling',
    accent: 'violet',
    name: 'The Peeling',
    nameEs: 'El Peeling',
    short: 'Peeling',
    shortEs: 'Peeling',
    europeAnchor: PEEL_A,
    base: PEEL_B,
    floor: PEELING_LADDER.floor,
    rungs: [
      {
        id: 'anchor',
        tone: 'anchor',
        label: EUROPE_ANCHOR_LABEL,
        labelEs: EUROPE_ANCHOR_LABEL_ES,
        amount: PEEL_A,
        words: `"In Europe this treatment costs {currency}${PEEL_A}."`,
        wordsEs: `"En Europa este tratamiento cuesta {currency}${PEEL_A}."`,
      },
      {
        id: 'base',
        tone: 'base',
        label: BASE_LABEL,
        labelEs: BASE_LABEL_ES,
        amount: PEEL_B,
        words: `"Here in {locationName} it is only {currency}${PEEL_B}."`,
        wordsEs: `"Aquí en {locationName} son solo {currency}${PEEL_B}."`,
      },
      {
        ...fromPricing(PEEL_PROMO),
        tone: 'offer',
        recommended: true,
        when: 'Offer 1 of 2. Same as the syringe: the two options go out together, every time.',
        whenEs: 'Oferta 1 de 2. Igual que con la jeringa: las dos opciones salen juntas, siempre.',
        words: `"This is not an anti-ageing cream — it lifts the dead skin off the living skin. Today it is half the Europe price, {currency}${PEEL_PROMO.price}, and the Dead Sea Body Scrub comes free with it."`,
        wordsEs: `"Esto no es una crema antiedad — separa la piel muerta de la piel viva. Hoy está a mitad del precio de Europa, {currency}${PEEL_PROMO.price}, y el Exfoliante del Mar Muerto va de regalo."`,
      },
      {
        ...fromPricing(PEEL_CREAMS),
        tone: 'upsell',
        when: `Option B, beside Offer 1 — never below it. {currency}${PEEL_CREAMS.price} is MORE than {currency}${PEEL_PROMO.price}, and you push it when she has read well through the demo. Gifts on top are fine from up here.`,
        whenEs: `Opción B, al lado de la Oferta 1 — nunca por debajo. {currency}${PEEL_CREAMS.price} es MÁS que {currency}${PEEL_PROMO.price}, y la empujas cuando la has visto bien durante la demostración. Desde aquí arriba puedes añadir regalos sin problema.`,
        words: `"Or you take the whole routine: the full {currency}${PEEL_CREAMS.price}, and the Day Cream and the Night Cream come free with the peeling. That is everything your skin needs, morning and night. Which one?"`,
        wordsEs: `"O te llevas la rutina completa: los {currency}${PEEL_CREAMS.price} enteros, y la Crema de Día y la de Noche van de regalo con el peeling. Eso es todo lo que tu piel necesita, mañana y noche. ¿Cuál te llevas?"`,
      },
      {
        ...fromPricing(PEEL_NO_SCRUB),
        tone: 'fallback',
        words: `"If you do not need the scrub I will take it back as credit — the scrub is {currency}${MIX_FLOOR.price}, so that leaves the peeling at {currency}${PEEL_NO_SCRUB.price}."`,
        wordsEs: `"Si no necesitas el exfoliante te lo descuento como crédito — el exfoliante son {currency}${MIX_FLOOR.price}, así que el peeling se queda en {currency}${PEEL_NO_SCRUB.price}."`,
      },
      {
        ...fromPricing(PEEL_VOUCHER),
        tone: 'floor',
        words: `"With today's voucher a single peeling is {currency}${PEEL_VOUCHER.price} — no gifts at that price, and that is as low as it goes."`,
        wordsEs: `"Con el cupón de hoy un peeling solo son {currency}${PEEL_VOUCHER.price} — sin regalos a ese precio, y de ahí no baja."`,
      },
    ],
    proof: {
      label: 'Proof move — the hand test',
      labelEs: 'Prueba — la prueba de la mano',
      words: `"Watch my hand — sixty seconds, and you will see five years of dullness come off."`,
      wordsEs: `"Mira mi mano — sesenta segundos, y verás cómo se va la opacidad de cinco años."`,
    },
  },
  {
    id: 'scrub',
    accent: 'gold',
    name: 'Dead Sea Scrub & Body Butter',
    nameEs: 'Exfoliante del Mar Muerto y Manteca Corporal',
    short: 'Scrub',
    shortEs: 'Exfoliante',
    europeAnchor: MIX_A,
    base: MIX_B,
    floor: MIX_MATCH_LADDER.floor,
    perUnit: true,
    rungs: [
      {
        id: 'anchor',
        tone: 'anchor',
        label: EUROPE_ANCHOR_LABEL,
        labelEs: EUROPE_ANCHOR_LABEL_ES,
        amount: MIX_A,
        perUnit: true,
        words: `"In Europe each of these is {currency}${MIX_A} — here in {locationName} they are {currency}${MIX_B} each."`,
        wordsEs: `"En Europa cada uno de estos cuesta {currency}${MIX_A} — aquí en {locationName} son {currency}${MIX_B} cada uno."`,
      },
      {
        id: 'base',
        tone: 'base',
        label: BASE_LABEL,
        labelEs: BASE_LABEL_ES,
        amount: MIX_B,
        perUnit: true,
        words: `"One jar on its own is {currency}${MIX_B} — but nobody takes just one once they hear the offer."`,
        wordsEs: `"Un bote solo son {currency}${MIX_B} — pero nadie se lleva uno solo cuando oye la oferta."`,
      },
      ...mixMatchDeals(
        'scrub, body butter, even a Nail Kit',
        'exfoliante, manteca corporal, incluso un Kit de Uñas'
      ),
      {
        ...fromPricing(MIX_FLOOR),
        tone: 'floor',
        when: 'Only when you can SEE they love it — they have not stopped touching their hands.',
        whenEs: 'Solo cuando VES que les encanta — no paran de tocarse las manos.',
        words: `"You really love it, don't you — you haven't stopped touching your hands. Alright: {currency}${MIX_FLOOR.price} for the one. But zip it, this stays between us."`,
        wordsEs: `"Te encanta de verdad, ¿eh? No paras de tocarte las manos. Venga: {currency}${MIX_FLOOR.price} por uno. Pero chitón, que esto queda entre nosotros."`,
      },
    ],
    proof: {
      label: 'Proof move — the flip test',
      labelEs: 'Prueba — la prueba del vuelco',
      words: `"Watch — I turn the jar upside down and nothing falls out. That is how dense the butter is."`,
      wordsEs: `"Mira — le doy la vuelta al bote y no se cae nada. Así de densa es la manteca."`,
    },
  },
  {
    id: 'nailkit',
    accent: 'coral',
    name: 'French Nail Kit',
    nameEs: 'Kit de Uñas Francesas',
    short: 'Nail Kit',
    shortEs: 'Kit de Uñas',
    europeAnchor: MIX_A,
    base: MIX_B,
    floor: MIX_MATCH_LADDER.floor,
    rungs: [
      {
        id: 'anchor',
        tone: 'anchor',
        label: EUROPE_ANCHOR_LABEL,
        labelEs: EUROPE_ANCHOR_LABEL_ES,
        amount: MIX_A,
        words: `"In Europe this nail kit is {currency}${MIX_A} — here in {locationName} it is {currency}${MIX_B}."`,
        wordsEs: `"En Europa este kit de uñas cuesta {currency}${MIX_A} — aquí en {locationName} son {currency}${MIX_B}."`,
      },
      {
        id: 'base',
        tone: 'base',
        label: BASE_LABEL,
        labelEs: BASE_LABEL_ES,
        amount: MIX_B,
        words: `"The complete kit — file, tips, gel, everything — is {currency}${MIX_B}."`,
        wordsEs: `"El kit completo — lima, tips, gel, todo — son {currency}${MIX_B}."`,
      },
      ...mixMatchDeals(
        'three kits, or a kit with a Scrub and a Body Butter',
        'tres kits, o un kit con un Exfoliante y una Manteca Corporal'
      ),
      {
        ...fromPricing(MIX_FLOOR),
        tone: 'floor',
        when: 'Only when you can SEE they love it. This is the last price, not an opener.',
        whenEs: 'Solo cuando VES que les encanta. Es el último precio, no una apertura.',
        words: `"The whole kit for {currency}${MIX_FLOOR.price} — that is my final price. But zip it, this stays between us."`,
        wordsEs: `"El kit entero por {currency}${MIX_FLOOR.price} — ese es mi precio final. Pero chitón, que esto queda entre nosotros."`,
      },
    ],
    proof: {
      label: 'Proof move — the guarantee',
      labelEs: 'Prueba — la garantía',
      words: `"Even if your dog eats it, bring it back and we replace it."`,
      wordsEs: `"Aunque se lo coma tu perro, lo traes y te lo cambiamos."`,
    },
  },
];

export const LADDER_BY_ID: Record<ProductKey, ProductLadder> = {
  syringe: PRODUCT_LADDERS[0],
  peeling: PRODUCT_LADDERS[1],
  scrub: PRODUCT_LADDERS[2],
  nailkit: PRODUCT_LADDERS[3],
};

// ── Scripts ──────────────────────────────────────────────────────────────────

export type ScriptCategory = 'opening' | 'demo' | 'closing' | 'objection' | 'partner' | 'competitor';

export interface ScriptCard {
  id: string;
  category: ScriptCategory;
  title: string;
  titleEs: string;
  text: string;
  textEs: string;
  product?: ProductKey;
  /**
   * The walk-away reason from encounterChips.ts that this line answers.
   * Named `answers` rather than `reason` because Phrase.reason already means
   * something else entirely (why the phrase works).
   *
   * It is the same vocabulary the journal uses, so a seller who tapped "Muy
   * caro" on the last customer can open the cheat sheet, tap the same tile, and
   * get the line they should have said. Two features, one set of words.
   *
   * Deliberately not exhaustive: `trust`, `skin` and `online` have objection
   * LESSONS but no scripted line yet, and inventing sales copy for a real shop
   * is not mine to do. The page links to the lesson and says so plainly rather
   * than showing an empty panel.
   *
   * A list, because one line can answer more than one objection. The two yeses
   * are the case that forced it: "I need to think about it" and "I need to ask
   * my partner" are both answered by handing her back the two words she said
   * during the demo, so the card that collects them has to come up under both.
   */
  answers?: string | readonly string[];
}

export const SCRIPTS: ScriptCard[] = [
  // ── Openings ──
  /*
   * The owner's own approach, dictated in his words and kept in his voice.
   *
   * The order matters and is the whole technique: get the LOOK from four or
   * five metres before you take a step, name the rush before they can use it,
   * ask a question you cannot answer for them, then turn and walk without
   * checking. The sample landing or not landing changes nothing — the
   * follow-up is identical either way. Split into separate
   * cards on purpose — mid-shift a seller wants the one line they are about to
   * say, not a paragraph to find their place in.
   */
  {
    id: 'o-ready',
    category: 'opening',
    title: '1. Before anybody comes',
    titleEs: '1. Antes de que venga nadie',
    text: `Stand where they can see you, sample already in your hand. Not flat against the wall, not planted in the middle of the walkway blocking people. Ready before you need to be ready.`,
    textEs: `Colócate donde te vean, con la muestra ya en la mano. Ni pegado a la pared, ni plantado en mitad del paso cortándole el camino a la gente. Listo antes de que haga falta.`,
  },
  {
    id: 'o-look',
    category: 'opening',
    title: '2. Get the look before you move',
    titleEs: '2. Consigue la mirada antes de moverte',
    text: `Four or five metres out, while they are still walking: "Hi guys, how you doing?" — and WAIT. Do not step, do not raise the sample. Only once they look at you do you lift it and start walking towards them.`,
    textEs: `A cuatro o cinco metros, cuando todavía vienen andando: "Hola chicos, ¿qué tal?" — y ESPERA. No des un paso, no levantes la muestra. Solo cuando te miren la levantas y empiezas a andar hacia ellos.`,
  },
  {
    id: 'o-coin',
    category: 'opening',
    title: '3. The sample is a coin toss',
    titleEs: '3. La muestra es cara o cruz',
    text: `They take it, lovely. They wave it away, nothing happens — you never asked them for anything, so you have not been rejected. Either way you are still stood in front of them and you go straight into the next line.`,
    textEs: `Si la cogen, genial. Si la apartan con la mano, no pasa nada — no les has pedido nada, así que no te han rechazado. En los dos casos sigues plantado delante de ellos y vas directo a la frase siguiente.`,
  },
  {
    id: 'o-rush',
    category: 'opening',
    title: '4. Name the rush before they can',
    titleEs: '4. Nombra la prisa antes que ellos',
    /* The same line the lesson teaches, so it comes from the same place — a
       cheat sheet a seller opens mid-shift must not have drifted from the
       lesson they learned it in. See data/canonicalScripts.ts. */
    ...THE_RUSH_AND_THE_QUESTION,
  },
  {
    id: 'o-gift',
    category: 'opening',
    title: '5. The gift, then turn and walk',
    titleEs: '5. El regalo, y date la vuelta',
    text: `"Really? No way. You know what — just because you look so amazing, I'm going to give you a small gift. I think you're going to love it." Then turn and walk into the shop. Do NOT look back to see if they follow.`,
    textEs: `"¿En serio? No me lo creo. ¿Sabes qué? Solo porque estás guapísima, te voy a hacer un regalito. Creo que te va a encantar." Luego date la vuelta y entra en la tienda. NO mires atrás para ver si te siguen.`,
  },
  {
    id: 'o-come',
    category: 'opening',
    title: '6. Only now, look back',
    titleEs: '6. Ahora sí, mira atrás',
    text: `Once you are inside, turn your head. If they are still on the pavement: "Come on guys, it's two seconds, I promise. Come." Then turn back round and keep walking.`,
    textEs: `Una vez dentro, gira la cabeza. Si siguen en la acera: "Venga chicos, son dos segundos, os lo prometo. Venid." Y date la vuelta otra vez y sigue andando.`,
  },
  {
    id: 'o-doorway',
    category: 'opening',
    title: '7. Never wait in the doorway',
    titleEs: '7. Nunca te quedes esperando en la puerta',
    text: `Say it, turn, walk — the walking is what persuades, because now there is nothing to say no to. Do not stand there watching them decide, and never walk them in beside you. You go first and you call them to come.`,
    textEs: `Lo dices, te giras, andas — lo que convence es el andar, porque ya no hay nada a lo que decir que no. No te quedes ahí mirando cómo lo deciden, y nunca los metas andando a tu lado. Vas tú delante y los llamas.`,
  },
  {
    id: 'o-seat',
    category: 'opening',
    title: '8. Sit them facing the wall',
    titleEs: '8. Siéntalos mirando a la pared',
    text: `Put them in the chair facing INTO the shop, never facing the street. If they can see the pavement moving, they start thinking about being back on it.`,
    textEs: `Siéntalos mirando HACIA DENTRO de la tienda, nunca hacia la calle. Si ven el movimiento de la acera, empiezan a pensar en volver a ella.`,
  },
  {
    /*
     * The number decides the play, and it is a decision a seller makes in about
     * two seconds with four people already looking at them. Three or fewer, do
     * all of them. Four or more, one volunteer — because doing everybody and
     * selling nobody is twenty minutes of a shift gone and, in the owner's
     * words, the worst feeling ever.
     */
    id: 'o-group',
    category: 'opening',
    title: '9. Count the heads before you start',
    titleEs: '9. Cuenta las cabezas antes de empezar',
    text: `THREE OR FEWER: do all of them. FOUR OR MORE: "I just need ONE of you to try this — who's the bravest?" One volunteer, and you only open it up to the rest if you can SEE real excitement. Let the others watch and want a turn — that is what makes them buy.`,
    textEs: `TRES O MENOS: se lo haces a todas. CUATRO O MÁS: "solo necesito que lo pruebe UNA — ¿quién es la más valiente?" Una voluntaria, y solo abres al resto si VES entusiasmo de verdad. Que las demás miren y les entren ganas — eso es lo que hace que compren.`,
  },
  {
    id: 'o1',
    category: 'opening',
    product: 'syringe',
    title: 'Straight in, no warm-up',
    titleEs: 'Directo, sin calentar',
    text: `"Can I show you something? This is our bestselling treatment — it is like Botox in a syringe, but natural and instant."`,
    textEs: `"¿Puedo enseñarte una cosa? Este es nuestro tratamiento más vendido — es como Botox en una jeringa, pero natural e instantáneo."`,
  },
  {
    id: 'o2',
    category: 'opening',
    product: 'syringe',
    title: 'Say the nice thing first',
    titleEs: 'Di lo bonito primero',
    text: `"Your skin has great structure. I want to show you something that takes it to the next level — our instant filler treatment."`,
    textEs: `"Tu piel tiene una estructura estupenda. Quiero enseñarte algo que la lleva al siguiente nivel — nuestro tratamiento de relleno instantáneo."`,
  },
  {
    id: 'o3',
    category: 'opening',
    product: 'peeling',
    title: 'Name the thing she already sees',
    titleEs: 'Nombra lo que ella ya ve',
    text: `"Do you ever feel like your skin looks dull even with makeup on? Our 60-second peeling fixes that instantly."`,
    textEs: `"¿Alguna vez notas la piel apagada incluso con maquillaje? Nuestro peeling de 60 segundos lo arregla al instante."`,
  },
  {
    id: 'o4',
    category: 'opening',
    product: 'peeling',
    title: 'The Reveal',
    titleEs: 'La Revelación',
    text: `"I am going to show you something — watch my hand. See the difference? That is five years of dullness gone in one minute."`,
    textEs: `"Te voy a enseñar una cosa — mira mi mano. ¿Ves la diferencia? Eso son cinco años de opacidad fuera en un minuto."`,
  },
  {
    id: 'o5',
    category: 'opening',
    product: 'scrub',
    title: 'The Dead Sea, in your hands',
    titleEs: 'El Mar Muerto, en tus manos',
    text: `"Close your eyes one second — smell that? Dead Sea minerals. Give me your hands, thirty seconds, and I promise you will not want to give them back."`,
    textEs: `"Cierra los ojos un segundo — ¿hueles eso? Minerales del Mar Muerto. Dame las manos, treinta segundos, y te prometo que no las vas a querer soltar."`,
  },
  {
    id: 'o6',
    category: 'opening',
    product: 'nailkit',
    title: 'What does the salon charge you?',
    titleEs: '¿Cuánto te cobran en el salón?',
    text: `"What do you pay for a French manicure? … And how long do you sit there for it?" [Let her say both numbers out loud.] "Five minutes, at home, on your own sofa, perfect every time. Give me your hand."`,
    textEs: `"¿Cuánto pagas por una manicura francesa? … ¿Y cuánto rato te pasas ahí sentada?" [Que diga los dos números en voz alta.] "Cinco minutos, en casa, en tu sofá, perfecta siempre. Dame la mano."`,
  },
  {
    id: 'o7',
    category: 'opening',
    title: 'Universal — Direct',
    titleEs: 'Universal — Directo',
    text: `"I have something I want to show you — it takes 30 seconds and you will see an instant difference."`,
    textEs: `"Tengo una cosa que quiero enseñarte — son 30 segundos y verás una diferencia al instante."`,
  },
  {
    id: 'o8',
    category: 'opening',
    title: 'Universal — Gift Angle',
    titleEs: 'Universal — Ángulo de Regalo',
    text: `"Are you shopping for anyone else today? Because this makes the perfect gift — and I will show you why."`,
    textEs: `"¿Estás comprando para alguien más hoy? Porque esto es el regalo perfecto — y te enseño por qué."`,
  },

  // ── The demo ──
  /*
   * THE DEMO, which had no card on this screen at all — and the demo is where
   * the sale is won. Two minutes: a stranger's hand, one eye, a mirror, and two
   * words out of her mouth that every objection answer later leans on.
   *
   * Lifted from close-demo so the cheat sheet and the lesson cannot teach two
   * different demos, and split one beat per card for the same reason the
   * openings are — mid-demo a seller wants the next move, not a paragraph to
   * find their place in.
   */
  {
    id: 'd-wipe',
    category: 'demo',
    product: 'syringe',
    title: '1. Clean the face before you start',
    titleEs: '1. Límpiale la cara antes de empezar',
    text: `Wipes and toner, thirty seconds, before you touch anything. Most demos that "do not work" are sunscreen or foundation sitting between your finger and her skin — and you cannot see it until nothing happens.`,
    textEs: `Toallitas y tónico, treinta segundos, antes de tocar nada. La mayoría de las demos que "no funcionan" son la crema solar o la base puestas entre tu dedo y su piel — y no lo ves hasta que no pasa nada.`,
  },
  {
    id: 'd-hand',
    category: 'demo',
    title: '2. Take the hand — do not ask twice',
    titleEs: '2. Coge la mano — no lo pidas dos veces',
    text: `Palm up, and say it like it is the best part of your day: "Give me your hand — this is the good bit." [You already asked out on the pavement and she came in. Asking a second time tells her there is something here to be nervous about.]`,
    textEs: `La palma hacia arriba, y dilo como si fuera lo mejor de tu día: "Dame la mano — esta es la parte buena." [Ya lo pediste fuera en la acera y ella entró. Pedirlo otra vez le dice que aquí hay algo por lo que ponerse nerviosa.]`,
  },
  {
    id: 'd-one-eye',
    category: 'demo',
    product: 'syringe',
    title: '3. One eye. Never two.',
    titleEs: '3. Un ojo. Nunca dos.',
    text: `"Look up for me — perfect. Now don't move. I'm only doing one, and you'll see why in a minute." [The eye you have not touched is the best salesperson in this shop. You do not give it away.]`,
    textEs: `"Mira hacia arriba — perfecto. Ahora no te muevas. Solo hago uno, y ahora verás por qué." [El ojo que no has tocado es el mejor vendedor de esta tienda. No lo regalas.]`,
  },
  {
    id: 'd-speech',
    category: 'demo',
    product: 'syringe',
    title: '4. Talk the whole way through',
    titleEs: '4. Habla todo el rato',
    text: `Hands busy, mouth going, same five lines every time: once a week and that is the whole commitment. ${SYR_USES} goes in that syringe — a year of this in something the size of a pen. Do not touch it once it is on. Give it five hours to work. And at home, do not wash it off and do not rub it off.`,
    textEs: `Manos ocupadas, boca en marcha, las mismas cinco frases siempre: una vez a la semana y ese es todo el compromiso. ${SYR_USES} usos en esa jeringa — un año de esto en algo del tamaño de un boli. No se lo toca una vez puesto. Cinco horas para que trabaje. Y en casa, ni lavárselo ni frotárselo.`,
  },
  {
    id: 'd-tighten',
    category: 'demo',
    product: 'syringe',
    title: '5. The tightening — get in before she asks',
    titleEs: '5. La tirantez — adelántate antes de que pregunte',
    text: `"You feel that tightening? Good — that is it working. And no, you are not going to live like this." [Laugh here.] "It's the gym, isn't it — you train, you're sore for a bit, then you're better. Give it five hours and it settles."`,
    textEs: `"¿Notas que tira? Bien — eso es que está funcionando. Y no, no vas a vivir así." [Ríete aquí.] "Es como el gimnasio, ¿no? Entrenas, te quedan agujetas un rato, y luego estás mejor. Dale cinco horas y se asienta."`,
  },
  {
    /*
     * The one question you must never raise yourself.
     *
     * The old answer to it was a promise — 6 to 18 months of results after the
     * year — and the owner pulled it as the only thing in the manual that was
     * not true. The honest version is better anyway: it is the gym again, the
     * same metaphor the tightening card already uses two beats earlier, and it
     * leaves her a reason to carry on rather than a guarantee to catch you on.
     */
    id: 'd-after-the-year',
    category: 'demo',
    product: 'syringe',
    answers: 'think',
    title: 'If she asks what happens after the year',
    titleEs: 'Si pregunta qué pasa después del año',
    text: `[Never bring this up yourself. It is a one-year treatment and that is where you stop.] "After the year? You carry on if you're happy with it, or you stop. If you stop, the lines come back slowly — it's the gym again. You train for a year, you stop going, your muscles don't disappear overnight. They just fade."`,
    textEs: `[No lo saques tú nunca. Es un tratamiento de un año y ahí te paras.] "¿Después del año? Sigues si estás contenta, o lo dejas. Si lo dejas, las líneas vuelven poco a poco — es el gimnasio otra vez. Entrenas un año, dejas de ir, y los músculos no desaparecen de la noche a la mañana. Se van bajando."`,
  },
  {
    id: 'd-who',
    category: 'demo',
    title: '6. While your hands are busy, find out who they are',
    titleEs: '6. Con las manos ocupadas, entérate de quiénes son',
    text: `Where are you from, where are you staying, how long have you got? And to him, because he is the one who can kill this with one word: who does he support? Then give something back — you have family there, you were over last summer. [Nobody who is laughing is looking at their watch.]`,
    textEs: `¿De dónde sois, dónde os alojáis, cuánto lleváis aquí? Y a él, que es el que puede cargarse esto con una palabra: ¿de qué equipo es? Y luego devuelve algo — tienes familia de allí, estuviste el verano pasado. [Nadie que se está riendo mira el reloj.]`,
  },
  {
    id: 'd-promise',
    category: 'demo',
    product: 'syringe',
    title: '7. Take the promise BEFORE she looks',
    titleEs: '7. Cógele la promesa ANTES de que mire',
    text: `Mirror still face down: "Before you look — if everything I've just told you is sunshine and rainbows, would you actually use it once a week at home? … Yeah? Good. Remember you said that." [She has not seen the result yet, so saying yes costs her nothing. That is exactly why you ask now.]`,
    textEs: `El espejo todavía boca abajo: "Antes de que mires — si todo lo que te acabo de contar es de color de rosa, ¿lo usarías de verdad una vez a la semana en casa? … ¿Sí? Bien. Acuérdate de que lo has dicho." [Todavía no ha visto el resultado, así que decir que sí no le cuesta nada. Por eso se lo pides ahora.]`,
  },
  {
    id: 'd-mirror',
    category: 'demo',
    product: 'syringe',
    title: '8. The mirror — and then your mouth shuts',
    titleEs: '8. El espejo — y luego te callas',
    text: `"Promise me you won't scream." [Give her the mirror and SHUT UP. Three or four seconds of real silence while she finds it herself.] "Now look at the other one. Go on — compare them."`,
    textEs: `"Prométeme que no vas a gritar." [Dale el espejo y CÁLLATE. Tres o cuatro segundos de silencio de verdad mientras lo encuentra ella sola.] "Ahora mira el otro. Venga — compáralos."`,
  },
  {
    id: 'd-her-words',
    category: 'demo',
    title: '9. Whatever she says first, keep it',
    titleEs: '9. Lo primero que diga, guárdatelo',
    text: `The bags, the tired look, the line she keeps pointing at — that is what she walked in with, in her own words, and you are going to put it back in front of her in ninety seconds. [Narrate the mirror yourself and it is your opinion. She finds it, and it is a fact.]`,
    textEs: `Las bolsas, la cara de cansada, la arruguita que no para de señalar — eso es con lo que ha entrado, con sus propias palabras, y se lo vas a poner delante otra vez dentro de noventa segundos. [Si se lo cuentas tú, es tu opinión. Si lo encuentra ella, es un hecho.]`,
  },
  {
    /*
     * The two questions that make every later objection answerable, and the
     * card was unreachable: filed under closing, on no tile, with `answers`
     * unset — while every objection line in this file quotes it back at her.
     * It now sits in the demo, where it is actually asked, AND comes up under
     * "let me think" and "ask my partner", which are the two objections it is
     * the answer to. The hand-back is the card below it.
     */
    id: 'c-two-yeses',
    category: 'demo',
    answers: ['think', 'partner'],
    title: '10. The two yeses — this is the whole point',
    titleEs: '10. Los dos síes — esto es lo importante',
    text: `"Do you like it? … Yes? And if you had it at home, would you actually use it? Be honest with me. … Yes?" [Wait for the word, out loud, in her voice. A nod is not a yes — you cannot quote a nod back at her.]`,
    textEs: `"¿Te gusta? … ¿Sí? Y si lo tuvieras en casa, ¿lo usarías de verdad? Sé sincera conmigo. … ¿Sí?" [Espera la palabra, en voz alta, con su voz. Que asienta no es un sí — no le puedes citar un gesto.]`,
  },
  {
    id: 'd-hand-them-back',
    category: 'demo',
    answers: ['think', 'partner'],
    title: '11. Hand them straight back the second she wobbles',
    titleEs: '11. Devuélveselos en cuanto dude',
    text: `"You told me you like it. You told me you'd use it. So the only thing left here is the money — and the money we can talk about." [She said both out loud. From here she cannot object to anything except the price, and the price is what you have a whole ladder for.]`,
    textEs: `"Me has dicho que te gusta. Me has dicho que lo usarías. Así que aquí lo único que queda es el dinero — y del dinero sí podemos hablar." [Los ha dicho los dos en voz alta. De aquí en adelante no puede objetar nada salvo el precio, y para el precio tienes una escalera entera.]`,
  },

  // ── Closes ──
  {
    id: 'c-card',
    category: 'closing',
    title: 'Assume the card',
    titleEs: 'Da por hecho la tarjeta',
    text: `"I guess you're paying by card, aren't you? Visa or Mastercard?" Most people pay by card, so assume it — you are asking WHICH, never WHETHER.`,
    textEs: `"Supongo que pagas con tarjeta, ¿no? ¿Visa o Mastercard?" La mayoría paga con tarjeta, así que dalo por hecho — preguntas CUÁL, nunca SI.`,
  },
  {
    id: 'c-no-silence',
    category: 'closing',
    title: 'Do not go quiet after the ask',
    titleEs: 'No te calles después de pedir',
    text: `They say "I don't know… Visa." You say: "Perfect, don't worry — I'll bring it over to you." Then go and get the machine. You never leave them alone with the decision.`,
    textEs: `Dicen "no sé... Visa." Tú dices: "Perfecto, no te preocupes — te la traigo yo." Y vas a por el datáfono. Nunca los dejas solos con la decisión.`,
  },
  {
    id: 'c-on-the-spot',
    category: 'closing',
    title: 'Charge where they are sitting',
    titleEs: 'Cobra donde están sentados',
    text: `The machine comes to the customer. Never walk them to a till — every metre between the yes and the payment is a metre they can change their mind in.`,
    textEs: `El datáfono va al cliente. Nunca los lleves a la caja — cada metro entre el sí y el pago es un metro para que cambien de opinión.`,
  },
  {
    id: 'c1',
    category: 'closing',
    product: 'syringe',
    title: 'Two-Choice Close',
    titleEs: 'Cierre de Dos Opciones',
    text: `"So would you rather take the single syringe at {currency}${SYR_B}, or two syringes at {currency}${SYR_TWO.price} with the second one free for your forehead or upper lip?"`,
    textEs: `"Entonces, ¿prefieres la jeringa sola a {currency}${SYR_B}, o dos jeringas a {currency}${SYR_TWO.price} con la segunda gratis para la frente o el labio superior?"`,
  },
  {
    id: 'c1b',
    category: 'closing',
    product: 'syringe',
    title: 'Two-Choice Close (Offer)',
    titleEs: 'Cierre de Dos Opciones (Oferta)',
    text: `"Would you rather have 30% off at {currency}${SYR_PROMO.price} with a free gift, or the two-syringe deal at {currency}${SYR_TWO.price}?"`,
    textEs: `"¿Prefieres el 30% de descuento a {currency}${SYR_PROMO.price} con un regalo, o la oferta de dos jeringas a {currency}${SYR_TWO.price}?"`,
  },
  {
    id: 'c2',
    category: 'closing',
    title: 'Which bag — never whether',
    titleEs: 'Qué bolsa — nunca si lo quiere',
    /* This used to park it "at the counter" for her. Nothing waits at a counter
       except a customer who has left — and it argues with c-on-the-spot, which
       says the machine comes to her. Wrap it in front of her instead: you are
       not asking IF, you are asking which bag. */
    text: `"Right — I'm wrapping this one up for you. Gift bag, or straight in the bag?" [You are not asking whether. You are asking which. Keep your hands moving while you say it.]`,
    textEs: `"Venga — te lo envuelvo ya. ¿Con bolsa de regalo o tal cual?" [No preguntas si lo quiere. Preguntas qué bolsa. Y lo dices con las manos ya en marcha.]`,
  },
  {
    id: 'c3',
    category: 'closing',
    title: 'Scarcity Close',
    titleEs: 'Cierre de Escasez',
    text: `"This voucher price is only valid today — I do not want you to miss it. Shall I ring it up?"`,
    textEs: `"Este precio con cupón solo vale hoy — no quiero que lo pierdas. ¿Te lo cobro?"`,
  },
  {
    id: 'c4',
    category: 'closing',
    product: 'syringe',
    title: 'Tell her what she got away with',
    titleEs: 'Dile de lo que se ha librado',
    text: `"So you are walking out with a treatment that costs {currency}${SYR_A} in Europe for {currency}${SYR_B} here in {locationName}. You have done well today, my love."`,
    textEs: `"O sea que te vas con un tratamiento que en Europa cuesta {currency}${SYR_A} por {currency}${SYR_B} aquí en {locationName}. Hoy has hecho un buen negocio, cariño."`,
  },
  {
    id: 'c4b',
    category: 'closing',
    product: 'syringe',
    title: 'Same again, with the gift on top',
    titleEs: 'Lo mismo, con el regalo encima',
    text: `"30% off, so {currency}${SYR_PROMO.price} — and a gift on top. That Peeling is {currency}${PEEL_B} on the shelf on its own, and you are getting it for nothing. Who taught you to haggle like that?"`,
    textEs: `"Un 30% de descuento, o sea {currency}${SYR_PROMO.price} — y encima un regalo. Ese Peeling solo cuesta {currency}${PEEL_B} en la estantería, y te lo llevas por nada. ¿Quién te ha enseñado a regatear así?"`,
  },
  {
    /* The old version of this told her about a customer who left and came back
       the next day — which quietly teaches her that leaving and coming back is
       a normal thing people do here. It is not. The proof is the woman who was
       in that same chair twenty minutes ago and bought on the spot. */
    id: 'c5',
    category: 'closing',
    title: 'Three this morning, that same chair',
    titleEs: 'Tres esta mañana, en esa misma silla',
    text: `"The lady in that chair before you took two — one for her, one for her sister. You are the third one this morning." [Throw it away like it is nothing and carry straight on.]`,
    textEs: `"La señora que estaba en esa silla antes que tú se llevó dos — uno para ella y otro para su hermana. Eres la tercera de esta mañana." [Suéltalo como si no fuera nada y sigue a lo tuyo.]`,
  },
  {
    /*
     * The other eye, in the owner's words: "I never do the other eye. Sometimes,
     * within the speech, I say to do the other eye in order to close." It is not
     * a favour and it is not a freebie — it is the COVER for the price drop. Her
     * face is tilted up, your hands are busy, the room feels finished, and the
     * number moves inside a moment that is about something else entirely.
     */
    id: 'c-second-eye',
    category: 'closing',
    product: 'syringe',
    title: `The other eye — say it to close, at {currency}${SYR_NO_GIFT.price}`,
    titleEs: `El otro ojo — dilo para cerrar, a {currency}${SYR_NO_GIFT.price}`,
    text: `She is at {currency}${SYR_NO_GIFT.price} and about to stand up. "You know what, let me fix your other eye real quick." [Start it. Do NOT let her stand.] And while your hands are on her face: "Listen, I just checked something — this little 20% voucher brings it to {currency}${SYR_VOUCHER.price}. But you're being greedy, eh? Single syringe only." The price moves inside a moment that is about her face.`,
    textEs: `Está en {currency}${SYR_NO_GIFT.price} y a punto de levantarse. "¿Sabes qué? Déjame arreglarte el otro ojo rapidito." [Empieza. NO dejes que se levante.] Y con las manos en su cara: "Mira, acabo de comprobar una cosa — este cuponcito del 20% lo deja en {currency}${SYR_VOUCHER.price}. Pero qué morro tienes, ¿eh? Solo la jeringa sola." El precio se mueve dentro de un momento que va de su cara.`,
  },
  {
    id: 'c-second-eye-asked',
    category: 'closing',
    product: 'syringe',
    title: 'She asks for the other eye BEFORE buying',
    titleEs: 'Te pide el otro ojo ANTES de comprar',
    text: `Do not refuse it and do not hand it over. Condition it: "If you buy it, I'll do the other one, yeah?" She pays, she gets it done, no argument and no theatre. The untouched eye is your best argument — you never give your best argument away to a maybe.`,
    textEs: `Ni le digas que no ni se lo regales. Ponle condición: "Si te lo llevas, te hago el otro, ¿vale?" Si paga, se lo haces, sin discusión y sin teatro. El ojo sin tocar es tu mejor argumento — tu mejor argumento no se lo regalas a un quizá.`,
  },
  /*
   * Verdict 8, and it is the end of the seller's job rather than the start of a
   * second pitch. After a syringe sale you do not sell a scrub — you hand her
   * to the upseller, who sells the red and infrared LED devices.
   *
   * It was one 517-character paragraph covering five separate beats, which is
   * the one shape this card cannot be: it is read with a woman sitting in front
   * of you who has just paid, and it is thirty seconds long. One beat per card,
   * in order, and the last one is the part sellers get wrong.
   */
  {
    id: 'c-handover',
    category: 'closing',
    product: 'syringe',
    title: 'She paid — 1. build the specialist up',
    titleEs: 'Ha pagado — 1. pon al especialista por las nubes',
    text: `She stays in the chair. "There's a guy here, a specialist — he's only with us a short time, and honestly, he's amazing at what he does."`,
    textEs: `Ella se queda sentada. "Aquí hay un chico, un especialista — está poco tiempo con nosotros y de verdad, es un crack en lo suyo."`,
  },
  {
    id: 'c-handover-gift',
    category: 'closing',
    product: 'syringe',
    title: 'She paid — 2. give before you ask',
    titleEs: 'Ha pagado — 2. da antes de pedir',
    text: `"And just because you got this, I'm going to spoil you with a small gift." [She has just spent her money. The next thing she hears cannot be you wanting more of it.]`,
    textEs: `"Y solo porque te has llevado esto, te voy a mimar con un regalito." [Acaba de gastarse el dinero. Lo siguiente que oiga no puede ser que quieras más.]`,
  },
  {
    id: 'c-handover-question',
    category: 'closing',
    product: 'syringe',
    title: 'She paid — 3. the question that does the work',
    titleEs: 'Ha pagado — 3. la pregunta que trabaja',
    text: `"Tell me one thing: what's more important for you, if you could get it lifted — the cheeks, or the neck? … Would that make you happy?"`,
    textEs: `"Dime una cosa: ¿qué es más importante para ti, si pudieras levantarlo — los pómulos o el cuello? … ¿Eso te haría feliz?"`,
  },
  {
    id: 'c-handover-fetch',
    category: 'closing',
    product: 'syringe',
    title: 'She paid — 4. you walk, she sits',
    titleEs: 'Ha pagado — 4. andas tú, ella sigue sentada',
    text: `"Let me check with him, if you have one second." [Then YOU go and fetch him. She does not stand up and she is not left on her own while you are gone.]`,
    textEs: `"Déjame consultarlo con él, si tienes un segundo." [Y vas TÚ a buscarlo. Ella no se levanta y no se queda sola mientras no estás.]`,
  },
  {
    id: 'c-handover-stop',
    category: 'closing',
    product: 'syringe',
    title: 'She paid — 5. your job is finished',
    titleEs: 'Ha pagado — 5. tu trabajo ha terminado',
    text: `You do not put a price on his product and you do not pitch a second one of yours. The syringe was the win — the handover is where your job ends. [Starting a scrub pitch here is a job nobody in this shop does.]`,
    textEs: `No le pones precio a lo suyo y no le sueltas un segundo producto tuyo. La jeringa era la victoria — el traspaso es donde acaba tu trabajo. [Soltarle aquí el discurso del exfoliante es un trabajo que aquí no hace nadie.]`,
  },

  // ── Objections ──
  /*
   * The owner's answer to a stall, in his words. It works by refusing to treat
   * "let me think" as new information: everything in it is something the
   * customer has already told YOU in the last two minutes.
   */
  {
    id: 'r-stall',
    category: 'objection',
    answers: 'think',
    title: '"I need to think about it" — the real answer',
    titleEs: '"Me lo tengo que pensar" — la respuesta de verdad',
    text: `"What do you actually need to think about? You already told me you like it. You told me you'd use it. You're not going to walk up and down the street and come back to a different price — you know exactly what it does. It's just whether you want to treat yourself or not. It's not a mortgage."`,
    textEs: `"¿Qué te tienes que pensar exactamente? Ya me has dicho que te gusta. Me has dicho que lo usarías. No vas a dar una vuelta por la calle y volver con otro precio — sabes perfectamente lo que hace. Es simplemente si quieres darte un capricho o no. Tampoco es una hipoteca."`,
  },
  /*
   * These three were the gap the cheat sheet used to admit to: the journal
   * offers "been scammed", "wrong for my skin" and "cheaper online" as things a
   * customer said, and there was no line to answer them with. The lines were
   * not missing from the app — they were sitting inside lessons O4, O5 and O7,
   * three taps and a scroll away from a seller who has about four seconds.
   * Lifted from the lessons unchanged, so the cheat sheet and the lesson cannot
   * teach two different answers.
   */
  {
    id: 'r-trust',
    category: 'objection',
    answers: 'trust',
    title: '"I was scammed before"',
    titleEs: '"Ya me han timado antes"',
    text: `"I am SO sorry that happened to you. There are some bad people out there, and it makes my job harder because guys like that ruin it for everyone. Look — I won't ask you to trust me. Give me your hand and watch it happen, and then YOU tell me. Do not believe a word I say — believe your own hand."`,
    textEs: `"Siento muchísimo que te pasara eso. Hay gente muy mala por ahí, y a mí me complica el trabajo porque tipos así lo estropean para todos. Mira — no te voy a pedir que confíes en mí. Dame la mano, míralo pasar, y luego me lo dices TÚ. No te creas ni una palabra de lo que diga — créete tu propia mano."`,
  },
  {
    id: 'r-skin',
    category: 'objection',
    answers: 'skin',
    title: '"Will this work on my skin?"',
    titleEs: '"¿Esto funciona en mi piel?"',
    text: `"Great question! This is hyaluronic acid — it's a water molecule, not a bleach. It doesn't care about skin colour. It works by binding water under your skin. Your melanin stays exactly the same. You just get smoother, plumper skin. Want me to show you on my hand?"`,
    textEs: `"¡Muy buena pregunta! Esto es ácido hialurónico — es una molécula de agua, no un blanqueador. Le da igual el tono de piel. Funciona reteniendo agua bajo la piel. Tu melanina se queda exactamente igual. Solo consigues una piel más lisa y con más volumen. ¿Te lo enseño en mi mano?"`,
  },
  {
    /* The other skin line answers "will it work on my colour". This one answers
       the commoner version — "my skin is difficult, it will react". Same chip,
       different worry, and she needs the second one far more often. */
    id: 'r-skin-sensitive',
    category: 'objection',
    answers: 'skin',
    title: '"It will not suit my skin"',
    titleEs: '"No le va a ir bien a mi piel"',
    text: `"Nothing to worry about, my love. All natural — no chemicals, no parabens, nothing in there to upset anybody. The most sensitive skin in the world can take this. I have had women use it going through the worst treatment you can imagine, when they could not put a drop of anything else on their face. And this is not another moisturiser you slap on every morning — completely different thing, once a week. Once. Give me your hand."`,
    textEs: `"No tienes nada de qué preocuparte, cariño. Todo natural — sin químicos, sin parabenos, nada que le pueda molestar a nadie. La piel más sensible del mundo aguanta esto. He tenido a mujeres usándolo mientras pasaban por el peor tratamiento que te puedas imaginar, cuando no se podían poner ni una gota de nada más en la cara. Y esto no es otra crema para ponerte cada mañana — es otra cosa completamente distinta, una vez a la semana. Una. Dame la mano."`,
  },
  {
    id: 'r-online',
    category: 'objection',
    answers: 'online',
    title: '"I can get it cheaper online"',
    titleEs: '"Lo consigo más barato online"',
    text: `"Maybe — but here's the thing about skincare online. Counterfeits are everywhere: fake, expired, or diluted. This?" [hold up the sealed product] "Sealed, fresh, straight from the manufacturer. And you just watched it work on your own face. Can a website do that?"`,
    textEs: `"Puede ser — pero te cuento cómo va la cosmética por internet. Está lleno de falsificaciones: producto falso, caducado o diluido. ¿Esto?" [enseña el producto precintado] "Precintado, fresco, directo del fabricante. Y lo acabas de ver funcionar en tu propia cara. ¿Eso te lo hace una web?"`,
  },
  /*
   * ── A SECOND AND THIRD ANSWER FOR THE THIN ONES ───────────────────────────
   * Five objections had exactly one scripted line each, which meant the "Another
   * line" shuffle on the journal's comeback card did nothing, and a seller who
   * heard "cheaper online" twice in a day said the identical sentence twice.
   * Each of these is a different ANGLE on the same objection rather than a
   * reworded version of the one above it — a seller reaching for the shuffle is
   * reaching for something that did not work the first time.
   */
  {
    id: 'p-his-turn',
    category: 'objection',
    answers: 'partner',
    title: 'Ask my partner — his turn',
    titleEs: 'Consultar pareja — le toca a él',
    text: `"Let me ask you something, my love. When he bought his last pair of golf shoes — did he ring you first?" [Wait for the laugh.] "There you go. Your face, your money, your call."`,
    textEs: `"Déjame preguntarte una cosa, cariño. Cuando se compró las últimas zapatillas de golf — ¿te llamó a ti antes?" [Espera la risa.] "Pues eso. Tu cara, tu dinero, tú decides."`,
  },
  {
    id: 'p-he-notices-you',
    category: 'objection',
    answers: 'partner',
    title: 'Ask my partner — he notices you, not the receipt',
    titleEs: 'Consultar pareja — te mira a ti, no al ticket',
    text: `"He is not going to notice the receipt, darling. He is going to notice you on Saturday. I have never once had a man come back and complain that his wife looks too good."`,
    textEs: `"Cariño, él no se va a fijar en el ticket. Se va a fijar en ti el sábado. Nunca en la vida me ha venido un hombre a quejarse de que su mujer esté demasiado guapa."`,
  },
  {
    id: 't-do-not-trust-me',
    category: 'objection',
    answers: 'trust',
    title: 'Been scammed — do not trust me',
    titleEs: 'Ya me han timado — no te fíes de mí',
    text: `"Then do not trust me. Seriously — do not. Trust your own hand. Give it here, thirty seconds, and you tell ME what you think. If nothing happens, I have wasted my time and you have lost nothing."`,
    textEs: `"Pues no te fíes de mí. En serio — no te fíes. Fíate de tu mano. Dámela, treinta segundos, y me dices TÚ qué te parece. Si no pasa nada, he perdido yo el tiempo y tú no has perdido nada."`,
  },
  {
    id: 't-not-a-story',
    category: 'objection',
    answers: 'trust',
    title: 'Been scammed — I am not telling you a story',
    titleEs: 'Ya me han timado — yo no te cuento cuentos',
    text: `"Whoever did that to you was selling you a story. I am not telling you a story — I am putting it on your hand and you are watching it happen with your own eyes. That is a very different thing."`,
    textEs: `"Quien te hizo eso te estaba vendiendo un cuento. Yo no te cuento nada — te lo pongo en la mano y lo ves pasar con tus propios ojos. Eso es muy distinto."`,
  },
  {
    id: 's-it-would-argue-now',
    category: 'objection',
    answers: 'skin',
    title: 'Wrong for my skin — it would argue right now',
    titleEs: 'No es para mi piel — lo notarías ahora mismo',
    text: `"If your skin was going to argue with it, my love, it would argue right now — on the back of your hand, in front of me. That is the whole test. Give it here."`,
    textEs: `"Cariño, si tu piel le fuera a poner pegas, se las pondría ahora mismo — en el dorso de la mano, delante de mí. Ese es el test entero. Dámela."`,
  },
  {
    id: 's-what-are-you-using',
    category: 'objection',
    answers: 'skin',
    title: 'Wrong for my skin — what are you on now?',
    titleEs: 'No es para mi piel — ¿y qué usas ahora?',
    text: `"What are you using now, my love?" [Listen properly.] "Right. And how is that going for you? Look — this is not the same kind of thing at all. It is once a week, and it is not fighting with anything else you put on."`,
    textEs: `"¿Y qué usas ahora, cariño?" [Escucha de verdad.] "Ya. ¿Y qué tal te va? Mira — esto no es lo mismo ni de lejos. Es una vez a la semana, y no se pelea con nada de lo que ya te pongas."`,
  },
  {
    id: 'o-you-felt-it',
    category: 'objection',
    answers: 'online',
    title: 'Cheaper online — you cannot feel a photograph',
    titleEs: 'Más barato online — una foto no se toca',
    text: `"You can buy a photograph of it online, my darling. What you cannot buy online is the thing you just felt on your own hand. You already know this one works. That is worth more than a delivery date."`,
    textEs: `"Online te puedes comprar una foto, cariño. Lo que no te puedes comprar online es lo que acabas de notar en tu propia mano. Ya sabes que este funciona. Eso vale más que una fecha de entrega."`,
  },
  {
    id: 'o-tonight-not-next-week',
    category: 'objection',
    answers: 'online',
    title: 'Cheaper online — tonight, not next week',
    titleEs: 'Más barato online — esta noche, no la semana que viene',
    text: `"And then you wait a week for a bag from who knows where. You are here, it is here, and you could be using it tonight. Do not make yourself wait for something you have already decided you like."`,
    textEs: `"Y luego te pasas una semana esperando un paquete de vete a saber dónde. Tú estás aquí, esto está aquí, y lo podrías estar usando esta noche. No te hagas esperar por algo que ya has decidido que te gusta."`,
  },
  {
    id: 'ti-coffee',
    category: 'objection',
    answers: 'time',
    title: 'No time — shorter than choosing a coffee',
    titleEs: 'Sin tiempo — menos que pedir un café',
    text: `"Sixty seconds, my love. You spent longer than that deciding what coffee to order. One hand — go on."`,
    textEs: `"Sesenta segundos, cariño. Has tardado más en decidir qué café pedir. Una mano — venga."`,
  },
  {
    id: 'ti-i-will-let-you-go',
    category: 'objection',
    answers: 'time',
    title: 'No time — I will let you go myself',
    titleEs: 'Sin tiempo — te suelto yo mismo',
    text: `"I am not going to keep you, I promise. One hand, thirty seconds, and if it does nothing for you I will let you go myself. Fair enough?"`,
    textEs: `"Que no te entretengo, te lo prometo. Una mano, treinta segundos, y si no te dice nada te suelto yo mismo. ¿Trato hecho?"`,
  },
  {
    id: 'l-touching-is-free',
    category: 'objection',
    answers: 'looking',
    title: 'Just looking — touching is free too',
    titleEs: 'Solo mirando — tocar también es gratis',
    text: `"Looking is free, gorgeous. Touching is free as well. Come here — give me the hand and then you can carry on looking."`,
    textEs: `"Mirar es gratis, guapa. Tocar también. Ven — dame la mano y luego sigues mirando."`,
  },
  {
    id: 'r1',
    answers: 'think',
    category: 'objection',
    title: '"I need to think about it"',
    titleEs: '"Necesito pensármelo"',
    /* This used to park her at the counter and send her off for a wander. Ten
       minutes to look around is ten minutes to leave, and a customer who leaves
       does not come back. She has already told you she likes it and that she
       would use it, so there is only one thing left to think about — name it
       and get to the ladder. */
    text: `"Think about what, my love? You told me you like it. You told me you would use it. So it is the price — say it out loud and let me see what I can do for you. Because the second you walk out of here this price is gone, and I cannot get it back for you tomorrow."`,
    textEs: `"¿Pensar el qué, cariño? Me has dicho que te gusta. Me has dicho que lo usarías. Entonces es el precio — dilo en voz alta y veo qué puedo hacer por ti. Porque en cuanto salgas por esa puerta este precio ya no existe, y mañana no te lo puedo recuperar."`,
  },
  /*
   * "TOO EXPENSIVE" IS THE MOST-TAPPED TILE ON THIS SCREEN, and it used to be
   * answered by one 621-character block — eleven lines on a phone, with two
   * stage directions, the other-eye move, the voucher and the per-use maths all
   * fighting each other. A seller mid-sale reads the first line and says it, so
   * it is now three cards in the order you play them.
   *
   * It is also written where the fight actually happens. The old version opened
   * with the anchor and the 30% promo — the top three rungs of six — and nobody
   * argues with you about money up there. By the time those words come out of
   * her you have already walked her down: gift off at the no-gift rung, voucher
   * on for the next one, floor held back. Shrink the number you are STANDING
   * on, never the one she has already refused.
   */
  {
    id: 'r2',
    answers: 'price',
    category: 'objection',
    product: 'syringe',
    title: '"Too expensive" — 1. say the rung you are ON',
    titleEs: '"Es muy caro" — 1. di el escalón en el que ESTÁS',
    text: `[Never the shelf price. By now you are further down than that.] "Too expensive next to what, my love? You are at {currency}${SYR_NO_GIFT.price} already — gift off, the syringe on its own."`,
    textEs: `[Nunca el precio de la estantería. A estas alturas ya estás más abajo.] "¿Caro comparado con qué, cariño? Si ya estás en {currency}${SYR_NO_GIFT.price} — sin regalo, la jeringa sola."`,
  },
  {
    id: 'r2-eye',
    answers: 'price',
    category: 'objection',
    product: 'syringe',
    title: '"Too expensive" — 2. the other eye, then the voucher',
    titleEs: '"Es muy caro" — 2. el otro ojo, y luego el cupón',
    text: `"You know what, let me fix your other eye real quick." [Start it. Do NOT let her stand up. Now talk money with your hands on her face.] "Tell you what — I have a 20% voucher here and I am going to put it on you. But you are being greedy now, eh? {currency}${SYR_VOUCHER.price}, the syringe on its own."`,
    textEs: `"¿Sabes qué? Déjame arreglarte el otro ojo rapidito." [Empiézalo. NO dejes que se levante. Y ahora habla de dinero con las manos en su cara.] "Mira lo que voy a hacer — tengo aquí un cupón del 20% y te lo pongo. Pero qué morro tienes, ¿eh? {currency}${SYR_VOUCHER.price}, la jeringa sola."`,
  },
  {
    id: 'r2-maths',
    answers: 'price',
    category: 'objection',
    product: 'syringe',
    title: '"Too expensive" — 3. make the number small',
    titleEs: '"Es muy caro" — 3. hazle el número pequeño',
    text: `"${SYR_USES} goes in that syringe, one a week, all the way to next summer — a bit over {currency}${Math.floor(SYR_VOUCHER.price / SYR_USES)} a time. And it dies the second you walk out of that door."`,
    textEs: `"${SYR_USES} usos en esa jeringa, uno por semana, hasta el verano que viene — poco más de {currency}${Math.floor(SYR_VOUCHER.price / SYR_USES)} cada vez. Y se muere en cuanto cruces esa puerta."`,
  },
  {
    id: 'r2b',
    answers: 'price',
    category: 'objection',
    product: 'peeling',
    title: '"It is too expensive"',
    titleEs: '"Es muy caro"',
    /* Same fix as r2, on the peeling ladder. She is not standing at the anchor
       when she says this — she is at Offer 1 with the scrub in the bag. The
       move down has a reason already built into it: the scrub comes back and
       its value goes to her as credit. 50 stays in your pocket. */
    text: `[Not the shelf price — the rung you are on] "You are at {currency}${PEEL_PROMO.price} already, gorgeous, with the Dead Sea scrub going in the bag with it. So listen: if the scrub is not for you I take it straight back as credit — that is {currency}${MIX_FLOOR.price} off — and the peeling on its own is {currency}${PEEL_NO_SCRUB.price}. Same bottle, same year of Sunday nights. Shall I wrap it?"`,
    textEs: `[No el precio de la estantería — el escalón en el que estás] "Ya estás en {currency}${PEEL_PROMO.price}, guapa, con el exfoliante del Mar Muerto metido en la bolsa. Así que mira: si el exfoliante no es para ti te lo descuento como crédito — {currency}${MIX_FLOOR.price} menos — y el peeling solo se queda en {currency}${PEEL_NO_SCRUB.price}. El mismo bote, el mismo año entero. ¿Te lo envuelvo?"`,
  },
  {
    id: 'r2c',
    answers: 'price',
    category: 'objection',
    product: 'scrub',
    title: '"It is too expensive"',
    titleEs: '"Es muy caro"',
    /* The old card answered "too expensive" by asking her for twice the money
       ({currency}120 for three). On this ladder the answer to a price objection
       is not a bigger basket and it is not a smaller number — it is buy one get
       one, which halves what she pays each without you touching your price. The
       30 floor stays in your pocket until she is genuinely leaving. */
    text: `"You are haggling with me over a jar, my love. Look — one on its own is {currency}${MIX_B}, and I am not going to make you pay that for one. Buy one, get one: two of them, {currency}${MIX_B1G1.price}. One for you, one for whoever you like — {currency}${eachOf(MIX_B1G1)} each, and you have not stopped touching your hands since I put it on them." [She only wants ONE and she is genuinely leaving? Then {currency}${MIX_FLOOR.price} for the single — same money per jar, one jar out of the door instead of two. That is why you try this one first.]`,
    textEs: `"Me estás regateando por un bote, cariño. Mira — uno solo son {currency}${MIX_B}, y no te voy a cobrar eso por uno. Compra uno y llévate otro: dos, {currency}${MIX_B1G1.price}. Uno para ti y otro para quien tú quieras — {currency}${eachOf(MIX_B1G1)} cada uno, y no paras de tocarte las manos desde que te lo puse." [¿Solo quiere UNO y se está yendo de verdad? Entonces {currency}${MIX_FLOOR.price} el individual — el mismo dinero por bote, pero sale uno por la puerta en vez de dos. Por eso esta la pruebas primero.]`,
  },
  {
    id: 'r2d',
    answers: 'price',
    category: 'objection',
    product: 'nailkit',
    title: '"It is too expensive"',
    titleEs: '"Es muy caro"',
    /* Was answering a price objection by asking for double the money. Same fix
       as r2c: buy one get one halves what each costs her and the number on your
       list never moves. Floor held back. */
    text: `"For everything that is in that box? One kit on its own is {currency}${MIX_B} — and I am not asking you for that. Take the kit and put a Scrub next to it, buy one get one, the pair of them {currency}${MIX_B1G1.price}. That is {currency}${eachOf(MIX_B1G1)} each and the buffer is guaranteed for life — break it, wear it out, bring it back, we swap it. Who is the second one for?"`,
    textEs: `"¿Por todo lo que lleva esa caja? Un kit solo son {currency}${MIX_B} — y no te lo voy a cobrar. Coge el kit y ponle un Exfoliante al lado, compra uno y llévate otro, los dos por {currency}${MIX_B1G1.price}. Salen a {currency}${eachOf(MIX_B1G1)} cada uno y la lima tiene garantía de por vida — se rompe, se gasta, la traes y te la cambiamos. ¿Para quién es el segundo?"`,
  },
  {
    id: 'r3',
    category: 'objection',
    title: '"I already have something similar"',
    titleEs: '"Ya tengo algo parecido"',
    text: `"Most of our customers do too. But when they try this they tell me it is completely different. Can I show you why in 30 seconds?"`,
    textEs: `"La mayoría de nuestros clientes también. Pero cuando lo prueban me dicen que es completamente distinto. ¿Te enseño por qué en 30 segundos?"`,
  },
  {
    /*
     * The one promise in this whole app that the shop really does honour, and
     * it was nowhere on this screen.
     *
     * A seller who is asked "what if it breaks?" mid-demo had to leave the cheat
     * sheet, open the Nail Kit page and scroll ~6,800px to find it — so in
     * practice they either half-remembered it or, worse, hedged. Hedging on the
     * one guarantee that is TRUE is the expensive mistake here: it is a free
     * close and it costs the shop a buffer.
     *
     * Words lifted verbatim from nailKitData.ts (the warranty pitch), minus its
     * "and the best part —" lead-in, which only makes sense when you are still
     * presenting the kit rather than answering a question. Same promise, same
     * wording, so the product page and the cheat sheet cannot drift.
     */
    id: 'r-breaks',
    category: 'objection',
    product: 'nailkit',
    title: '"What if it breaks?"',
    titleEs: '"¿Y si se rompe?"',
    text: `"The buffer has a lifetime warranty. No matter what happens — if it breaks, if it wears out, even if your dog eats it — you can exchange it in any of our stores worldwide." [Let them laugh — humour lowers the guard. Say it with total confidence: this one is real.]`,
    textEs: `"La lima tiene garantía de por vida. No importa qué pase — si se rompe, si se desgasta, incluso si tu perro se la come — puedes cambiarla en cualquiera de nuestras tiendas en todo el mundo." [Déjales reír — el humor baja la guardia. Dilo con total confianza: esta va en serio.]`,
  },
  {
    id: 'r4',
    answers: 'looking',
    category: 'objection',
    title: '"I am just looking"',
    titleEs: '"Solo estoy mirando"',
    /* Opened with "No problem at all", which is the exact phrase the Avoid list
       calls a waiter talking — and then handed her "you do not have to buy
       anything", which is the softener that walks her out. Looking is free,
       touching is free, and the hand comes out before the sentence ends. */
    text: `"Looking is free, gorgeous — and so is touching. Twenty seconds, one hand, and I promise you have never seen this before." [Hand out before you finish the sentence.]`,
    textEs: `"Mirar es gratis, guapa — y tocar también. Veinte segundos, una mano, y te prometo que esto no lo has visto nunca." [Saca la mano antes de acabar la frase.]`,
  },
  {
    id: 'r5',
    answers: 'partner',
    category: 'objection',
    title: '"I need to ask my partner"',
    titleEs: '"Tengo que preguntarle a mi pareja"',
    /* This used to hand her a card with the price on it and wish her luck. That
       is not the method — it is the opposite of it. A customer who walks out to
       ask someone is a customer you have lost, so the answer has to keep her
       here and put the decision back in her hands. */
    text: `"Ladies' business, my darling. He is playing golf — he is not thinking about your face. You told me you like it. You told me you would use it. So it is your call, not his. Spoil yourself for once. And if you really would not use it, keep your money — no hard feelings, it is all good."`,
    textEs: `"Cosa de mujeres, cariño. Él está con el golf — no está pensando en tu cara. Me has dicho que te gusta. Me has dicho que lo usarías. Así que es cosa tuya, no suya. Date un capricho por una vez. Y si de verdad no lo vas a usar, guárdate el dinero — sin rencores, no pasa nada."`,
  },
  {
    id: 'r6',
    answers: 'time',
    category: 'objection',
    title: '"I do not have time"',
    titleEs: '"No tengo tiempo"',
    text: `"Exactly 60 seconds — I'll time it myself. And if you do not see a difference on your own hand, you get to tell me to my face that I was wrong. Deal?" [Hand out. You are asking for sixty seconds, not for a decision.]`,
    textEs: `"Exactamente 60 segundos — te los cronometro yo. Y si no ves diferencia en tu propia mano, me lo dices a la cara y me callo. ¿Trato?" [Saca la mano. Le pides sesenta segundos, no una decisión.]`,
  },

  // ── Partner ──
  /*
   * ORDER MATTERS HERE and it used to be backwards. The two cards that get the
   * partner out of the way — "ladies' business" and "let him go" — sat above the
   * only card that brings him IN, so a seller scanning this mid-shift hit both
   * exits before they reached the first move. The owner's answer is the other
   * way round: you try to bring him into it first, and ONLY if he is completely
   * bad energy do you turn and give everything to her.
   */
  {
    id: 'p-two-seconds',
    category: 'partner',
    title: 'The one who is already walking',
    titleEs: 'El que ya se está yendo',
    text: `"It's two seconds of your time, I promise — she's going to love it."`,
    textEs: `"Son dos segundos, te lo prometo — le va a encantar."`,
  },
  {
    id: 'p1',
    category: 'partner',
    title: '1. Bring him in — this is the first move',
    titleEs: '1. Métele dentro — esta es la primera jugada',
    text: `"And you — you are going to love how this looks on them. Want to see the instant result too?" Get him laughing, get him looking, make him part of the reveal. A partner who is IN the demo does not pull her out of it.`,
    textEs: `"Y tú — te va a encantar cómo le queda. ¿Quieres ver el resultado instantáneo tú también?" Que se ría, que mire, que sea parte de la revelación. Una pareja que está DENTRO de la demo no te la saca de ella.`,
  },
  {
    id: 'p3',
    category: 'partner',
    title: '2. Opinion Ask',
    titleEs: '2. Pedir Opinión',
    text: `"What do you think — the instant glow or the long-term treatment? You know them best."`,
    textEs: `"¿Tú qué crees — el brillo instantáneo o el tratamiento a largo plazo? Tú la conoces mejor."`,
  },
  {
    id: 'p-ladies',
    category: 'partner',
    title: '3. Only if the energy is bad: stand him down',
    titleEs: '3. Solo si la energía es mala: apártale',
    text: `"Don't worry, it's ladies' business anyway." Say it light, with a smile — you are giving him permission to stand back, not picking a fight. This is your SECOND move, never your first.`,
    textEs: `"No te preocupes, esto es cosa de chicas de todas formas." Dilo ligero, con una sonrisa — le estás dando permiso para apartarse, no buscando pelea. Esta es tu SEGUNDA jugada, nunca la primera.`,
  },
  {
    id: 'p-let-go',
    category: 'partner',
    title: '4. He is completely bad energy',
    titleEs: '4. Trae muy mala energía',
    text: `Stop spending anything on him and put ALL of it on her. Not a sulk, not a sigh — you simply turn your body, keep her hand in yours and carry on as if he were furniture. You have not lost him; you never had him.`,
    textEs: `Deja de gastar nada en él y ponlo TODO en ella. Sin morros y sin suspiros — simplemente giras el cuerpo, no le sueltas la mano y sigues como si él fuera un mueble. No le has perdido; nunca le tuviste.`,
  },
  {
    id: 'p2',
    category: 'partner',
    title: 'One for her, one for him',
    titleEs: 'Uno para ella, otro para él',
    text: `"Most couples take a Nail Kit for her and a Body Butter for him — something off this trip that is not a fridge magnet. Buy 2 and the third is on me: {currency}${MIX_B2G1.price} for ${MIX_B2G1.units}. So who is the third one going to?"`,
    textEs: `"La mayoría de las parejas se llevan un Kit de Uñas para ella y una Manteca Corporal para él — algo de este viaje que no sea un imán de nevera. Compra 2 y el tercero te lo regalo: {currency}${MIX_B2G1.price} por ${MIX_B2G1.units}. ¿Y para quién va el tercero?"`,
  },

  // ── Competitors ──
  {
    id: 'comp1',
    category: 'competitor',
    title: '"They said it is cheaper there"',
    titleEs: '"Me han dicho que allí es más barato"',
    text: `"Cheaper than what, though — did they put it on your face and show you? No. They told you a number." [Hand out, palm up, and do not move.] "Thirty seconds and then you tell me what it is worth."`,
    textEs: `"Pero más barato que qué — ¿te lo pusieron en la cara y te lo enseñaron? No. Te dijeron un número." [La mano fuera, la palma arriba, y no te muevas.] "Treinta segundos y luego me dices tú lo que vale."`,
  },
  {
    id: 'comp2',
    category: 'competitor',
    title: '"I saw this on Amazon"',
    titleEs: '"Lo he visto en Amazon"',
    text: `"You probably did — and you cannot feel a photograph, my love. Touch this. Smell it. Watch it work on your own skin. A website cannot do that, and it cannot do it before dinner."`,
    textEs: `"Seguramente sí — y una foto no se toca, cariño. Toca esto. Huélelo. Míralo funcionar en tu propia piel. Eso una web no te lo hace, y para la cena menos."`,
  },
  {
    id: 'comp3',
    category: 'competitor',
    title: '"The other shop gave me a better price"',
    titleEs: '"La otra tienda me ha dado mejor precio"',
    text: `"Go on then — what did they say?" [Let them tell you] "Right. That price I cannot do, I would be working for nothing." [Pause] "But I will tell you what I CAN do…" — then move ONE rung and put something small in the bag.`,
    textEs: `"Venga, cuéntame — ¿qué te han dicho?" [Deja que te lo cuente] "Ya. Ese precio no te lo puedo hacer, estaría trabajando gratis." [Pausa] "Pero te digo lo que SÍ puedo hacer…" — y bajas UN escalón y le metes algo pequeño en la bolsa.`,
  },
  {
    id: 'comp4',
    category: 'competitor',
    title: '"I have heard of [competitor brand]"',
    titleEs: '"He oído hablar de [marca competidora]"',
    text: `"Good brand, honestly. Same family of ingredients — the difference is how much of it is in there, and that you are going to see this one happen in thirty seconds instead of waiting six weeks for it. Watch."`,
    textEs: `"Buena marca, de verdad. Misma familia de ingredientes — la diferencia es la cantidad que lleva, y que esto lo vas a ver pasar en treinta segundos en vez de esperar seis semanas. Mira."`,
  },
];

// ── Key phrases ──────────────────────────────────────────────────────────────

export interface Phrase {
  id: string;
  type: 'good' | 'bad';
  text: string;
  textEs: string;
  reason: string;
  reasonEs: string;
}

export const PHRASES: Phrase[] = [
  { id: 'g1', type: 'good', text: `"Let me show you something..."`, textEs: `"Déjame enseñarte una cosa..."`, reason: 'Creates curiosity, no pressure', reasonEs: 'Crea curiosidad, sin presión' },
  { id: 'g2', type: 'good', text: `"Most people choose..."`, textEs: `"La mayoría se lleva..."`, reason: 'Nobody wants to be the only one', reasonEs: 'Nadie quiere ser la única' },
  { id: 'g3', type: 'good', text: `"This is only valid today"`, textEs: `"Esto solo vale hoy"`, reason: 'Puts a door on the price. Say it straight and move on', reasonEs: 'Le pone una puerta al precio. Dilo sin más y sigue' },
  { id: 'g4', type: 'good', text: `"You will see the difference instantly"`, textEs: `"Vas a ver la diferencia al instante"`, reason: 'Promises immediate value', reasonEs: 'Promete valor inmediato' },
  { id: 'g5', type: 'good', text: `"What brings you to {locationName}?"`, textEs: `"¿Qué te trae por {locationName}?"`, reason: 'Opens the conversation naturally', reasonEs: 'Abre la conversación con naturalidad' },
  { id: 'g6', type: 'good', text: `"That is a great choice"`, textEs: `"Es una gran elección"`, reason: 'Validates their decisión', reasonEs: 'Valida su decisión' },
  { id: 'g7', type: 'good', text: `"Feel this texture..."`, textEs: `"Toca esta textura..."`, reason: 'Hands first. Once they are touching it, it is half theirs', reasonEs: 'Primero las manos. En cuanto lo tocan, ya es medio suyo' },
  { id: 'g8', type: 'good', text: `"Can I ask your opinion?"`, textEs: `"¿Te puedo pedir tu opinión?"`, reason: 'Makes them feel valued', reasonEs: 'Les hace sentir valorados' },
  { id: 'b1', type: 'bad', text: `"Do you need any help?"`, textEs: `"¿Necesitas ayuda?"`, reason: 'Triggers the "just looking" reflex', reasonEs: 'Dispara el reflejo de "solo estoy mirando"' },
  { id: 'b2', type: 'bad', text: `"It is really cheap"`, textEs: `"Es muy barato"`, reason: 'Cheapens how the product is seen', reasonEs: 'Devalúa la percepción del producto' },
  { id: 'b3', type: 'bad', text: `"No problem / Sure"`, textEs: `"No hay problema / Vale"`, reason: 'Sounds like a waiter, not the person running this pitch', reasonEs: 'Suena a camarero, no a quien lleva el puesto' },
  { id: 'b4', type: 'bad', text: `"Are you interested?"`, textEs: `"¿Te interesa?"`, reason: 'Easy to say no to', reasonEs: 'Muy fácil decir que no' },
  { id: 'b5', type: 'bad', text: `"Trust me..."`, textEs: `"Confía en mí..."`, reason: 'Raises suspicion', reasonEs: 'Genera sospecha' },
  { id: 'b6', type: 'bad', text: `"This is our most expensive"`, textEs: `"Este es el más caro"`, reason: 'Focuses on cost, not value', reasonEs: 'Se centra en el coste, no en el valor' },
];

// ── Psychology ───────────────────────────────────────────────────────────────

export interface CialdiniPrinciple {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  apply: string;
  applyEs: string;
}

export const CIALDINI: CialdiniPrinciple[] = [
  {
    id: 'ci1',
    name: 'Give first',
    nameEs: 'Da tú primero',
    description: 'The little gift is not generosity, it is the hook. Once they have taken something off you, walking out feels rude.',
    descriptionEs: 'El regalito no es generosidad, es el anzuelo. En cuanto te han cogido algo, irse sin más les da corte.',
    apply: '"You know what — just because you look so amazing, I\'m going to give you a small gift. I think you\'re going to love it." Promise it out on the street to move them, hand it over once they are in the chair. Sample, demo, gift — all before you have asked them for anything at all.',
    applyEs: '"¿Sabes qué? Solo porque estás guapísima, te voy a hacer un regalito. Creo que te va a encantar." Prométeselo en la calle para moverlos, dáselo ya sentados. Muestra, demo, regalo — todo antes de haberles pedido absolutamente nada.',
  },
  {
    id: 'ci2',
    name: 'Get the yes before the yes',
    nameEs: 'El sí antes del sí',
    description: 'Nobody likes going back on something they just said out loud.',
    descriptionEs: 'A nadie le gusta desdecirse de algo que acaba de decir en voz alta.',
    apply: 'Make them say it, do not say it for them: "Look at that — better, right?" Once they have said better, no is awkward.',
    applyEs: 'Que lo digan ellas, no lo digas tú: "Mira eso — mejor, ¿a que sí?" Cuando ya han dicho que mejor, decir que no queda raro.',
  },
  {
    id: 'ci3',
    name: 'Everybody is taking it',
    nameEs: 'Todo el mundo se lo lleva',
    description: 'Nobody wants to be the only one. Deciding is easier when other people already did.',
    descriptionEs: 'Nadie quiere ser la única. Decidirse es más fácil cuando ya lo ha hecho otra gente.',
    apply: '"That is the one everybody takes." / "I have sold three of those this morning." Say it like it is nothing — throw it away and carry on.',
    applyEs: '"Ese es el que se lleva todo el mundo." / "Llevo tres vendidos esta mañana." Dilo como si nada — suéltalo y sigue.',
  },
  {
    id: 'ci4',
    name: 'You do this all day',
    nameEs: 'Tú haces esto todo el día',
    description: 'They believe the person who has obviously done it a thousand times. On a kiosk that is you — volume and hands, nothing borrowed.',
    descriptionEs: 'Se fían de quien se ve que lo ha hecho mil veces. En un puesto esa eres tú — cantidad y manos, nada prestado.',
    apply: '"I have done this on about forty faces today — I know exactly how it goes on skin like yours." Your hands are the proof. No borrowed white coats.',
    applyEs: '"Hoy llevo unas cuarenta caras — sé perfectamente cómo queda en una piel como la tuya." Tus manos son la prueba. Sin batas blancas prestadas.',
  },
  {
    id: 'ci5',
    name: 'They buy you first',
    nameEs: 'Primero te compran a ti',
    description: 'Nobody buys hand cream off someone they are trying to get away from.',
    descriptionEs: 'Nadie le compra crema de manos a alguien de quien está intentando escaparse.',
    apply: 'Say the nice thing and mean it, find the one thing you have in common, match their speed — quick with the rushers, slow with the strollers.',
    applyEs: 'Di lo bonito y créetelo, busca eso que tenéis en común, ponte a su ritmo — rápido con los que van con prisa, tranquilo con los que pasean.',
  },
  {
    id: 'ci6',
    name: 'Today or never',
    nameEs: 'Hoy o nunca',
    description: 'A price with no end on it is not a price, it is a shelf. Put a door on it.',
    descriptionEs: 'Un precio sin final no es un precio, es una estantería. Ponle una puerta.',
    apply: '"Only today." / "Two left." / "This voucher dies the second you walk out of here." Straight face, half a smile — and drop it the moment they say no.',
    applyEs: '"Solo hoy." / "Me quedan dos." / "Este cupón se muere en cuanto sales por esa puerta." Cara seria, media sonrisa — y lo sueltas en cuanto te digan que no.',
  },
];

/** Shared shape for the two tip lists (body language, buying signals). */
export interface TipPair {
  id: string;
  term: string;
  termEs: string;
  meaning: string;
  meaningEs: string;
}

export const BODY_LANGUAGE: TipPair[] = [
  { id: 'bl1', term: 'Open palms when presenting', termEs: 'Palmas abiertas al presentar', meaning: 'Nothing hidden, nothing up the sleeve', meaningEs: 'Nada escondido, nada en la manga' },
  { id: 'bl2', term: 'Slight forward lean', termEs: 'Inclínate ligeramente hacia delante', meaning: 'Says you are interested in her, not just her money', meaningEs: 'Dice que te interesa ella, no solo su dinero' },
  { id: 'bl3', term: 'Mirror their posture', termEs: 'Imita su postura', meaning: 'They relax and never know why', meaningEs: 'Se relajan y no saben por qué' },
  { id: 'bl4', term: 'Smile like you mean it', termEs: 'Sonríe como si lo sintieras', meaning: 'A mouth-only smile reads as a salesman. Smile with the eyes or do not bother', meaningEs: 'La sonrisa de solo boca suena a vendedor. Sonríe con los ojos o no sonrías' },
  { id: 'bl5', term: 'Put the product in their hand', termEs: 'Ponles el producto en la mano', meaning: 'Once they hold it, ownership starts', meaningEs: 'En cuanto lo sostienen, empieza la sensación de propiedad' },
  { id: 'bl6', term: 'Come at them a bit from the side', termEs: 'Acércate un poco de lado', meaning: 'Nobody likes a stranger squared up in their face. Angled, never blocking the way', meaningEs: 'A nadie le gusta un desconocido plantado en la cara. De lado, y sin cortarle el paso' },
];

export const BUYING_SIGNALS: TipPair[] = [
  { id: 'bs1', term: 'Asks about the price', termEs: 'Pregunta el precio', meaning: 'Seriously considering the purchase', meaningEs: 'Se está planteando la compra en serio' },
  { id: 'bs2', term: 'Touches or holds the product', termEs: 'Toca o sostiene el producto', meaning: 'Imagining owning it', meaningEs: 'Se imagina teniéndolo' },
  { id: 'bs3', term: 'Asks "how long does it last?"', termEs: 'Pregunta "¿cuánto dura?"', meaning: 'Calculating the value', meaningEs: 'Está calculando el valor' },
  { id: 'bs4', term: 'Looks at their partner or friend', termEs: 'Mira a su pareja o amiga', meaning: 'Looking for permission to buy', meaningEs: 'Busca permiso para comprar' },
  { id: 'bs5', term: 'Repeats the benefit back to you', termEs: 'Te repite el beneficio', meaning: 'Mental buy-in is forming', meaningEs: 'Se está convenciendo por dentro' },
  { id: 'bs6', term: 'Asks "can I use this with...?"', termEs: 'Pregunta "¿esto lo puedo usar con...?"', meaning: 'Fitting it into their life', meaningEs: 'Lo está encajando en su vida' },
];

// ── Emergency sheet ──────────────────────────────────────────────────────────

export interface EmergencyLine {
  id: string;
  /** Optional lead-in: the objection being answered. */
  head?: string;
  headEs?: string;
  text: string;
  textEs: string;
  /** Walk-away reason this answers — same vocabulary as ScriptCard.answers. */
  answers?: string;
}

const EMERGENCY_OPENERS: EmergencyLine[] = [
  { id: 'eo1', text: `"I promise this will be the best 2 minutes of your day"`, textEs: `"Te prometo que van a ser los mejores 2 minutos de tu día"` },
  { id: 'eo2', text: `"Give me one minute and one hand — you are going to want to see this"`, textEs: `"Dame un minuto y una mano — esto lo vas a querer ver"` },
  { id: 'eo3', text: `"Everyone who tries this buys it — want to see why?"`, textEs: `"Todo el que lo prueba se lo lleva — ¿quieres ver por qué?"` },
  { id: 'eo4', text: `"Can I ask you a quick question? What do you use for your eyes?"`, textEs: `"¿Te hago una pregunta rápida? ¿Qué usas para el contorno de ojos?"` },
  { id: 'eo5', text: `"Watch this — I guarantee you have never seen anything like it"`, textEs: `"Mira esto — te garantizo que nunca has visto nada igual"` },
];

const EMERGENCY_CLOSES: EmergencyLine[] = [
  {
    /* An emergency close happens at the BOTTOM of the ladder, not the top. This
       used to offer 210 instead of 300 as a last resort, which is a rung you
       passed twenty minutes ago. */
    id: 'ec1',
    text: `"The voucher, then. {currency}${SYR_VOUCHER.price} instead of {currency}${SYR_NO_GIFT.price} — today, and only while you are stood in front of me"`,
    textEs: `"Pues el cupón. {currency}${SYR_VOUCHER.price} en vez de {currency}${SYR_NO_GIFT.price} — hoy, y solo mientras estés aquí delante de mí"`,
  },
  {
    id: 'ec2',
    text: `"Take a second one for your friend, your mum, your sister — buy 2 and the third is free, {currency}${MIX_B2G1.price} for ${MIX_B2G1.units}"`,
    textEs: `"Llévate otro para tu amiga, tu madre, tu hermana — compra 2 y el tercero es gratis, {currency}${MIX_B2G1.price} por ${MIX_B2G1.units}"`,
  },
  {
    /* Full market — let her say a number, make a meal of it, then go and get
       the manager. Not because you lack the authority; you have it. Because
       the number lands ten times harder from somebody who had to be fetched
       than from the person who has been dropping it all along. */
    id: 'ec3',
    text: `"Right — you are killing me. Go on, give me your number." [Let them say it. Hold. Then hands in the air] "You are not talking to the right man. Give me ten seconds." Then go and get the manager — he is the only one who can say {currency}${SYR_FLOOR.price}, and it lands ten times harder from him than it ever would from you.`,
    textEs: `"Venga — me estás matando. Dime tu número." [Deja que lo digan. Aguanta. Luego manos arriba] "No estás hablando con quien tienes que hablar. Dame diez segundos." Y vas a por el encargado — es el único que puede decir {currency}${SYR_FLOOR.price}, y de su boca cae diez veces más fuerte que de la tuya.`,
  },
];

const EMERGENCY_KILLERS: EmergencyLine[] = [
  {
    /* An emergency is by definition late in the ladder, so this line is written
       at the voucher rung with the floor named as what it is — the last thing
       you say, to somebody who is genuinely walking. It used to quote 210. */
    id: 'ek1',
    answers: 'price',
    head: `"Too expensive"`,
    headEs: `"Muy caro"`,
    text: `"Compared to what, my love? One session of Botox back home is {currency}${SYR_A} and it wears off by Christmas. You are at {currency}${SYR_VOUCHER.price} with me — voucher on, gift off, a whole year in that syringe." [Still not moving, and she is genuinely walking? You have no rung left. Do NOT invent one] "Sit tight one second — let me get someone." Then fetch the manager, and {currency}${SYR_FLOOR.price} comes out of his mouth.`,
    textEs: `"¿Comparado con qué, cariño? Una sesión de Bótox en tu país son {currency}${SYR_A} y se te pasa para Navidad. Conmigo estás en {currency}${SYR_VOUCHER.price} — con el cupón, sin regalo, un año entero en esa jeringa." [¿Sigue sin moverse y se va de verdad? No te queda escalón. NO te inventes uno] "Espérate un segundo, que llamo a alguien." Vas a por el encargado, y {currency}${SYR_FLOOR.price} sale de su boca.`,
  },
  {
    id: 'ek2',
    answers: 'think',
    head: `"I need to think"`,
    headEs: `"Tengo que pensármelo"`,
    text: `"I get it. But this price is literally today only — tomorrow it is back to {currency}${SYR_B}."`,
    textEs: `"Lo entiendo. Pero este precio es literalmente solo de hoy — mañana vuelve a {currency}${SYR_B}."`,
  },
  {
    id: 'ek3',
    answers: 'looking',
    head: `"Just looking"`,
    headEs: `"Solo estoy mirando"`,
    text: `"Perfect! Looking is free. But trying is what changes your mind. Two minutes?"`,
    textEs: `"¡Perfecto! Mirar es gratis. Pero probarlo es lo que te cambia la cabeza. ¿Dos minutos?"`,
  },
];

const EMERGENCY_CARD_TROUBLE: EmergencyLine[] = [
  {
    id: 'ect1',
    head: `Declined`,
    headEs: `Rechazada`,
    text: `"This machine does it all day, my love — have you got another card on you?"`,
    textEs: `"Este datáfono lo hace todo el día, cariño — ¿llevas otra tarjeta encima?"`,
  },
  {
    id: 'ect2',
    head: `Declined again`,
    headEs: `Rechazada otra vez`,
    text: `"Let me try typing the numbers in by hand — the chip does this sometimes."`,
    textEs: `"Déjame probar metiendo los números a mano — el chip hace esto a veces."`,
  },
  {
    id: 'ect3',
    head: `No other card`,
    headEs: `No tiene otra tarjeta`,
    text: `"Have you got Apple Pay or Google Pay on your phone? That works too."`,
    textEs: `"¿Tienes Apple Pay o Google Pay en el móvil? Eso también nos vale."`,
  },
  {
    /* Splitting it is the rung O10 and close-3 both carry and this card did
       not, so the sheet a seller opens mid-sale was one rung shorter than the
       lesson that taught it. The card wins in that moment — it is what is in
       front of them — so the card is the one that has to be complete. */
    id: 'ect3b',
    head: `Card will only take part of it`,
    headEs: `La tarjeta solo coge una parte`,
    text: `"Shall we split it — half on this card, half on the other one?" Two cards, or a card and whatever cash she has on her.`,
    textEs: `"¿Lo partimos — la mitad en esta tarjeta y la mitad en la otra?" Dos tarjetas, o una tarjeta y el efectivo que lleve encima.`,
  },
  {
    // The old fourth step waved her out with "come back whenever you like",
    // which is the one thing the method never does — a card that will not work
    // is not a reason to lose the sale, it is a reason to walk to the cash
    // machine together. You go with her. You never send her.
    id: 'ect4',
    head: `No card at all`,
    headEs: `Sin tarjeta`,
    text: `"Cash suits me even better, my love. There's a machine two minutes that way — I'll walk you over and carry the bag." You go WITH them. You never send them off on their own.`,
    textEs: `"En efectivo aún mejor, cariño. Hay un cajero a dos minutos — te acompaño yo y te llevo la bolsa." Vas CON ellos. Nunca los mandas solos.`,
  },
];

/** The three panels of the emergency sheet, in the order they are drawn. */
export const EMERGENCY_BLOCKS: {
  key: string;
  accent: AccentName;
  /** Number the lines 1..n — an opener is chosen by position under pressure. */
  numbered?: boolean;
  title: string;
  titleEs: string;
  hint: string;
  hintEs: string;
  items: EmergencyLine[];
}[] = [
  {
    key: 'openers',
    accent: 'coral',
    numbered: true,
    title: 'Emergency Openers',
    titleEs: 'Aperturas de Emergencia',
    hint: 'When nothing else is working:',
    hintEs: 'Cuando nada más funciona:',
    items: EMERGENCY_OPENERS,
  },
  {
    key: 'closes',
    accent: 'teal',
    title: 'Emergency Closes',
    titleEs: 'Cierres de Emergencia',
    hint: 'Last resort to close:',
    hintEs: 'Último recurso para cerrar:',
    items: EMERGENCY_CLOSES,
  },
  {
    key: 'killers',
    accent: 'gold',
    title: 'Objection Killers',
    titleEs: 'Matadores de Objeciones',
    hint: 'Quick answers to the usual objections:',
    hintEs: 'Respuestas rápidas a las objeciones de siempre:',
    items: EMERGENCY_KILLERS,
  },
  {
    // Not a selling panic — a payment one. It lives here because this is the
    // sheet a seller opens when it is going wrong, and a card refusing in front
    // of a customer is exactly that. Five steps in order, so nobody freezes.
    key: 'card',
    accent: 'violet',
    title: 'Card trouble',
    titleEs: 'Problemas con la tarjeta',
    hint: 'Work down the list. Stay relaxed — they are already embarrassed:',
    hintEs: 'Ve bajando por la lista. Mantén la calma — ya están incómodos:',
    items: EMERGENCY_CARD_TROUBLE,
  },
];

// ── The lines that answer one walk-away reason ──────────────────────────────
//
// Two screens ask this exact question: the Cheat Sheets "They said…" panel, and
// the journal's comeback card seconds after a customer walked. They were each
// looping over SCRIPTS and EMERGENCY_BLOCKS with their own copy of the matching
// rule, which is one edit away from the sheet and the card teaching different
// answers to the same objection — the one thing neither may ever do.
//
// Language stays out of it deliberately. This returns both twins and leaves the
// caller to pick one and run it through `sub()`, so the data layer has no
// opinion about who is reading.

export interface AnswerLine {
  key: string;
  /** Which product or context the line belongs to, where it has one. */
  label?: string;
  labelEs?: string;
  /** Both still carry {currency} / {locationName} — the caller resolves them. */
  text: string;
  textEs: string;
}

/** True when a card is filed under this walk-away reason, one of them or many. */
function answersReason(
  answers: string | readonly string[] | undefined,
  reasonId: string,
): boolean {
  if (!answers) return false;
  return typeof answers === 'string' ? answers === reasonId : answers.includes(reasonId);
}

export function linesAnswering(reasonId: string): AnswerLine[] {
  const out: AnswerLine[] = [];

  /* The objection cards first, whatever order the file is written in. A card
     from another section can legitimately answer an objection — the two yeses
     answer both "let me think" and "ask my partner" — but a seller who has just
     been objected to wants the line that answers it at the top, with the move
     it leans on underneath rather than above. */
  const scripted = SCRIPTS.filter((s) => answersReason(s.answers, reasonId));
  for (const s of [
    ...scripted.filter((s) => s.category === 'objection'),
    ...scripted.filter((s) => s.category !== 'objection'),
  ]) {
    const ladder = s.product ? LADDER_BY_ID[s.product] : undefined;
    out.push({
      key: `s-${s.id}`,
      label: ladder?.short,
      labelEs: ladder?.shortEs,
      text: s.text,
      textEs: s.textEs,
    });
  }

  for (const block of EMERGENCY_BLOCKS) {
    for (const item of block.items) {
      if (item.answers !== reasonId) continue;
      out.push({
        key: `e-${item.id}`,
        label: 'Under pressure',
        labelEs: 'Bajo presión',
        text: item.text,
        textEs: item.textEs,
      });
    }
  }

  return out;
}

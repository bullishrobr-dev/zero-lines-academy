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
  type PriceLadder,
  type PriceRung,
} from './pricing';
import type { Language } from './translations';

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

/** Carry a pricing.ts rung's id, label and numbers into a ladder rung. */
function fromPricing(r: PriceRung) {
  return { id: r.id, label: r.label, labelEs: r.labelEs, amount: r.price, units: r.units };
}

/** Per-unit value of a rung — what makes the descent legible. */
export function perUnitAmount(rung: { amount: number; units?: number }): number {
  return rung.amount / (rung.units ?? 1);
}

/** Same, for a rung still in its pricing.ts shape. */
function eachOf(r: PriceRung): number {
  return r.price / (r.units ?? 1);
}

const SYR_PROMO = rungOf(SYRINGE_LADDER, 'promo');
const SYR_TWO = rungOf(SYRINGE_LADDER, 'second-free');
const SYR_NO_GIFT = rungOf(SYRINGE_LADDER, 'no-gift');
const SYR_VOUCHER = rungOf(SYRINGE_LADDER, 'voucher');
const SYR_FLOOR = rungOf(SYRINGE_LADDER, 'floor');

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

/** Buy 2 get 1, buy 2 get 2 and buy 1 get 1 are shared by the mix & match family. */
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
      words: `"For the holidays: buy 2, get 2 free — {currency}${MIX_B2G2.price} for ${MIX_B2G2.units}, so {currency}${eachOf(MIX_B2G2)} each. That is the best deal in the shop."`,
      wordsEs: `"Para las fiestas: compra 2 y llévate 2 gratis — {currency}${MIX_B2G2.price} por ${MIX_B2G2.units}, o sea {currency}${eachOf(MIX_B2G2)} cada uno. Es la mejor oferta de la tienda."`,
    },
    {
      ...fromPricing(MIX_B1G1),
      tone: 'fallback',
      words: `"Or keep it simple — buy one, take one free. {currency}${MIX_B1G1.price} for ${MIX_B1G1.units}."`,
      wordsEs: `"O más sencillo — compra uno y llévate otro gratis. {currency}${MIX_B1G1.price} por ${MIX_B1G1.units}."`,
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
        words: `"Right now we have an amazing offer — 30% off, so {currency}${SYR_PROMO.price} instead of {currency}${SYR_B}, and you still choose a gift: Day Cream, Night Cream or the Peeling."`,
        wordsEs: `"Ahora mismo tenemos una oferta increíble — un 30% de descuento, así que {currency}${SYR_PROMO.price} en vez de {currency}${SYR_B}, y además eliges un regalo: Crema de Día, Crema de Noche o el Peeling."`,
      },
      {
        ...fromPricing(SYR_TWO),
        tone: 'upsell',
        words: `"For the same {currency}${SYR_TWO.price} you take two syringes — the second one free for your forehead, upper lip or frown lines. That is {currency}${eachOf(SYR_TWO)} each, with the Day & Night Cream included."`,
        wordsEs: `"Por los mismos {currency}${SYR_TWO.price} te llevas dos jeringas — la segunda gratis para la frente, el labio superior o las líneas de expresión. Salen a {currency}${eachOf(SYR_TWO)} cada una, con la Crema de Día y de Noche incluidas."`,
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
        words: `"I want you to leave happy today — I have a 20% voucher, and that takes the {currency}${SYR_NO_GIFT.price} down to {currency}${SYR_VOUCHER.price}."`,
        wordsEs: `"Quiero que te vayas contento hoy — tengo un cupón del 20%, y eso deja los {currency}${SYR_NO_GIFT.price} en {currency}${SYR_VOUCHER.price}."`,
      },
      {
        ...fromPricing(SYR_FLOOR),
        tone: 'floor',
        words: `"{currency}${SYR_FLOOR.price} is the lowest this ever goes, and only to close it right now. Never under it."`,
        wordsEs: `"{currency}${SYR_FLOOR.price} es lo más bajo a lo que llega esto, y solo para cerrar ahora mismo. Nunca por debajo."`,
      },
    ],
    proof: {
      label: 'Proof move — one eye only',
      labelEs: 'Prueba — solo un ojo',
      words: `"Let me do one eye only — then you hold the mirror and tell me if you see the difference."`,
      wordsEs: `"Déjame hacerte solo un ojo — luego coges el espejo y me dices si ves la diferencia."`,
    },
  },
  {
    id: 'peeling',
    accent: 'violet',
    name: 'Glycolic Peeling',
    nameEs: 'Peeling Glicólico',
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
        words: `"This is not an anti-ageing cream — it lifts the dead skin off the living skin. Today it is half the Europe price, {currency}${PEEL_PROMO.price}, and the Dead Sea Body Scrub comes free with it."`,
        wordsEs: `"Esto no es una crema antiedad — separa la piel muerta de la piel viva. Hoy está a mitad del precio de Europa, {currency}${PEEL_PROMO.price}, y el Exfoliante del Mar Muerto va de regalo."`,
      },
      {
        ...fromPricing(PEEL_CREAMS),
        tone: 'upsell',
        words: `"For the full {currency}${PEEL_CREAMS.price} you keep the peeling and the Day & Night Cream come free — that is the complete routine."`,
        wordsEs: `"Por los {currency}${PEEL_CREAMS.price} completos te quedas el peeling y la Crema de Día y de Noche van gratis — esa es la rutina completa."`,
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
        words: `"One jar, {currency}${MIX_FLOOR.price}, and that is my last price — I cannot go under it."`,
        wordsEs: `"Un bote, {currency}${MIX_FLOOR.price}, y ese es mi último precio — no puedo bajar más."`,
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
        words: `"The whole kit for {currency}${MIX_FLOOR.price} — that is my final price."`,
        wordsEs: `"El kit entero por {currency}${MIX_FLOOR.price} — ese es mi precio final."`,
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

export type ScriptCategory = 'opening' | 'closing' | 'objection' | 'partner' | 'competitor';

export interface ScriptCard {
  id: string;
  category: ScriptCategory;
  title: string;
  titleEs: string;
  text: string;
  textEs: string;
  product?: ProductKey;
}

export const SCRIPTS: ScriptCard[] = [
  // ── Openings ──
  {
    id: 'o1',
    category: 'opening',
    product: 'syringe',
    title: 'Curiosity Hook',
    titleEs: 'Gancho de Curiosidad',
    text: `"Can I show you something? This is our bestselling treatment — it is like Botox in a syringe, but natural and instant."`,
    textEs: `"¿Puedo enseñarte una cosa? Este es nuestro tratamiento más vendido — es como Botox en una jeringa, pero natural e instantáneo."`,
  },
  {
    id: 'o2',
    category: 'opening',
    product: 'syringe',
    title: 'Compliment Open',
    titleEs: 'Apertura con Cumplido',
    text: `"Your skin has great structure. I want to show you something that takes it to the next level — our instant filler treatment."`,
    textEs: `"Tu piel tiene una estructura estupenda. Quiero enseñarte algo que la lleva al siguiente nivel — nuestro tratamiento de relleno instantáneo."`,
  },
  {
    id: 'o3',
    category: 'opening',
    product: 'peeling',
    title: 'Problem-Agitate',
    titleEs: 'Problema y Agitación',
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
    title: 'Spa Experience',
    titleEs: 'Experiencia de Spa',
    text: `"Close your eyes for a second... smell that? Those are Dead Sea minerals. Let me give you the 30-second spa experience."`,
    textEs: `"Cierra los ojos un segundo... ¿hueles eso? Son minerales del Mar Muerto. Déjame darte la experiencia de spa de 30 segundos."`,
  },
  {
    id: 'o6',
    category: 'opening',
    product: 'nailkit',
    title: 'Time Saver',
    titleEs: 'Ahorro de Tiempo',
    text: `"How often do you get a French manicure? What if you could do it at home in 5 minutes, perfect every time?"`,
    textEs: `"¿Cada cuánto te haces la manicura francesa? ¿Y si pudieras hacértela en casa en 5 minutos, perfecta siempre?"`,
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

  // ── Closes ──
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
    title: 'Assumptive Close',
    titleEs: 'Cierre Asumido',
    text: `"I will set this aside for you at the counter. Do you want the gift bag with it?"`,
    textEs: `"Te lo dejo apartado en la caja. ¿Te lo pongo con la bolsa de regalo?"`,
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
    title: 'Summary Close',
    titleEs: 'Cierre de Resumen',
    text: `"So you are getting a treatment that costs {currency}${SYR_A} in Europe for {currency}${SYR_B} here in {locationName}. Great choice."`,
    textEs: `"O sea que te llevas un tratamiento que en Europa cuesta {currency}${SYR_A} por {currency}${SYR_B} aquí en {locationName}. Gran elección."`,
  },
  {
    id: 'c4b',
    category: 'closing',
    product: 'syringe',
    title: 'Summary Close (Offer)',
    titleEs: 'Cierre de Resumen (Oferta)',
    text: `"So you are getting the treatment at 30% off — {currency}${SYR_PROMO.price} — plus a gift on top. The Peeling on its own is {currency}${PEEL_B}."`,
    textEs: `"O sea que te llevas el tratamiento con un 30% de descuento — {currency}${SYR_PROMO.price} — y encima un regalo. El Peeling solo cuesta {currency}${PEEL_B}."`,
  },
  {
    id: 'c5',
    category: 'closing',
    title: 'Testimonial Close',
    titleEs: 'Cierre con Testimonio',
    text: `"A customer was in here yesterday — she bought two, and came back today for three more as gifts. That is how good this is."`,
    textEs: `"Ayer estuvo aquí una clienta — se llevó dos, y hoy ha vuelto a por tres más para regalar. Así de bueno es."`,
  },

  // ── Objections ──
  {
    id: 'r1',
    category: 'objection',
    title: '"I need to think about it"',
    titleEs: '"Necesito pensármelo"',
    text: `"Of course. Just so you know, this voucher expires when you leave the store — it is tied to today's visit. I can hold it at the counter for 10 minutes while you look around, and the price stays locked."`,
    textEs: `"Claro. Solo para que lo sepas, este cupón caduca cuando sales de la tienda — va con la visita de hoy. Te lo puedo guardar en caja 10 minutos mientras das una vuelta, y el precio se queda fijo."`,
  },
  {
    id: 'r2',
    category: 'objection',
    product: 'syringe',
    title: '"It is too expensive"',
    titleEs: '"Es muy caro"',
    text: `"I hear you. In Europe this is {currency}${SYR_A}. Here in {locationName} it is {currency}${SYR_B}. And with today's offer I can do 30% off — that is {currency}${SYR_PROMO.price}. Let me see what else I can do..."`,
    textEs: `"Te entiendo. En Europa esto cuesta {currency}${SYR_A}. Aquí en {locationName} son {currency}${SYR_B}. Y con la oferta de hoy puedo hacerte un 30% de descuento — son {currency}${SYR_PROMO.price}. Déjame ver qué más puedo hacer..."`,
  },
  {
    id: 'r2b',
    category: 'objection',
    product: 'peeling',
    title: '"It is too expensive"',
    titleEs: '"Es muy caro"',
    text: `"I hear you. In Europe this is {currency}${PEEL_A}. Here in {locationName} it is {currency}${PEEL_B}. And right now I can do half price — {currency}${PEEL_PROMO.price}, with a free Dead Sea scrub."`,
    textEs: `"Te entiendo. En Europa esto cuesta {currency}${PEEL_A}. Aquí en {locationName} son {currency}${PEEL_B}. Y ahora mismo te lo puedo dejar a mitad de precio — {currency}${PEEL_PROMO.price}, con un exfoliante del Mar Muerto de regalo."`,
  },
  {
    id: 'r2c',
    category: 'objection',
    product: 'scrub',
    title: '"It is too expensive"',
    titleEs: '"Es muy caro"',
    text: `"I hear you. In Europe one of these is {currency}${MIX_A}. Here it is {currency}${MIX_B}. And with buy 2 get 1 free that is {currency}${MIX_B2G1.price} for ${MIX_B2G1.units} products — {currency}${eachOf(MIX_B2G1)} each."`,
    textEs: `"Te entiendo. En Europa uno de estos cuesta {currency}${MIX_A}. Aquí son {currency}${MIX_B}. Y con compra 2 y llévate 1 gratis son {currency}${MIX_B2G1.price} por ${MIX_B2G1.units} productos — {currency}${eachOf(MIX_B2G1)} cada uno."`,
  },
  {
    id: 'r2d',
    category: 'objection',
    product: 'nailkit',
    title: '"It is too expensive"',
    titleEs: '"Es muy caro"',
    text: `"I hear you. In Europe this kit is {currency}${MIX_A}. Here in {locationName} it is {currency}${MIX_B}. And with buy 2 get 1 free that is {currency}${MIX_B2G1.price} for ${MIX_B2G1.units} complete kits."`,
    textEs: `"Te entiendo. En Europa este kit cuesta {currency}${MIX_A}. Aquí en {locationName} son {currency}${MIX_B}. Y con compra 2 y llévate 1 gratis son {currency}${MIX_B2G1.price} por ${MIX_B2G1.units} kits completos."`,
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
    id: 'r4',
    category: 'objection',
    title: '"I am just looking"',
    titleEs: '"Solo estoy mirando"',
    text: `"No problem at all — looking is free. But can I show you something that takes 20 seconds? You do not have to buy anything, I just love the reaction."`,
    textEs: `"No pasa nada — mirar es gratis. Pero ¿te enseño una cosa de 20 segundos? No tienes que comprar nada, es que me encanta la reacción."`,
  },
  {
    id: 'r5',
    category: 'objection',
    title: '"I need to ask my partner"',
    titleEs: '"Tengo que preguntarle a mi pareja"',
    text: `"Absolutely. If they were here, what would they say? [Pause] Here — take this sample card with the price written down. The voucher is valid for today only."`,
    textEs: `"Por supuesto. Si estuviera aquí, ¿qué diría? [Pausa] Toma — llévate esta tarjeta de muestra con el precio apuntado. El cupón solo vale hoy."`,
  },
  {
    id: 'r6',
    category: 'objection',
    title: '"I do not have time"',
    titleEs: '"No tengo tiempo"',
    text: `"This takes exactly 60 seconds — I will time it. And if you do not see a difference, I will wish you a great day. Deal?"`,
    textEs: `"Esto son exactamente 60 segundos — te los cronometro. Y si no ves diferencia, te deseo un buen día. ¿Trato?"`,
  },

  // ── Partner ──
  {
    id: 'p1',
    category: 'partner',
    title: 'Include the Partner',
    titleEs: 'Incluye a la Pareja',
    text: `"And you — you are going to love how this looks on them. Want to see the instant result too?"`,
    textEs: `"Y tú — te va a encantar cómo le queda. ¿Quieres ver el resultado instantáneo tú también?"`,
  },
  {
    id: 'p2',
    category: 'partner',
    title: 'Gift Suggestion',
    titleEs: 'Sugerencia de Regalo',
    text: `"Most couples take a Nail Kit for her and a Body Butter for him — a nice memory from {locationName}. And with buy 2 get 1 free the third one is on me: {currency}${MIX_B2G1.price} for ${MIX_B2G1.units}."`,
    textEs: `"La mayoría de las parejas se llevan un Kit de Uñas para ella y una Manteca Corporal para él — un bonito recuerdo de {locationName}. Y con compra 2 y llévate 1 gratis, el tercero te lo regalo: {currency}${MIX_B2G1.price} por ${MIX_B2G1.units}."`,
  },
  {
    id: 'p3',
    category: 'partner',
    title: 'Opinion Ask',
    titleEs: 'Pedir Opinión',
    text: `"What do you think — the instant glow or the long-term treatment? You know them best."`,
    textEs: `"¿Tú qué crees — el brillo instantáneo o el tratamiento a largo plazo? Tú la conoces mejor."`,
  },

  // ── Competitors ──
  {
    id: 'comp1',
    category: 'competitor',
    title: '"They said it is cheaper there"',
    titleEs: '"Me han dicho que allí es más barato"',
    text: `"Maybe! But does their product show you a result in 2 minutes? Let me show you..."`,
    textEs: `"¡Puede ser! Pero ¿su producto te enseña un resultado en 2 minutos? Mira..."`,
  },
  {
    id: 'comp2',
    category: 'competitor',
    title: '"I saw this on Amazon"',
    titleEs: '"Lo he visto en Amazon"',
    text: `"You probably did! But online you cannot try it. Feel this — smell this — see the result on your own skin."`,
    textEs: `"¡Seguramente sí! Pero por internet no lo puedes probar. Toca esto — huele esto — mira el resultado en tu propia piel."`,
  },
  {
    id: 'comp3',
    category: 'competitor',
    title: '"The other shop gave me a better price"',
    titleEs: '"La otra tienda me ha dado mejor precio"',
    text: `"I respect that. But price is not everything — results are. Let me show you why we are different."`,
    textEs: `"Lo respeto. Pero el precio no lo es todo — los resultados sí. Déjame enseñarte por qué somos diferentes."`,
  },
  {
    id: 'comp4',
    category: 'competitor',
    title: '"I have heard of [competitor brand]"',
    titleEs: '"He oído hablar de [marca competidora]"',
    text: `"Great brand! We actually use similar ingredients. The difference is our concentration and the immediate result. Watch..."`,
    textEs: `"¡Buena marca! De hecho usamos ingredientes parecidos. La diferencia es nuestra concentración y el resultado inmediato. Mira..."`,
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
  { id: 'g2', type: 'good', text: `"Most people choose..."`, textEs: `"La mayoría se lleva..."`, reason: 'Social proof, guides the decision', reasonEs: 'Prueba social, guía la decisión' },
  { id: 'g3', type: 'good', text: `"This is only valid today"`, textEs: `"Esto solo vale hoy"`, reason: 'Genuine scarcity, not pushy', reasonEs: 'Escasez real, sin agobiar' },
  { id: 'g4', type: 'good', text: `"You will see the difference instantly"`, textEs: `"Vas a ver la diferencia al instante"`, reason: 'Promises immediate value', reasonEs: 'Promete valor inmediato' },
  { id: 'g5', type: 'good', text: `"What brings you to {locationName}?"`, textEs: `"¿Qué te trae por {locationName}?"`, reason: 'Opens the conversation naturally', reasonEs: 'Abre la conversación con naturalidad' },
  { id: 'g6', type: 'good', text: `"That is a great choice"`, textEs: `"Es una gran elección"`, reason: 'Validates their decision', reasonEs: 'Valida su decisión' },
  { id: 'g7', type: 'good', text: `"Feel this texture..."`, textEs: `"Toca esta textura..."`, reason: 'Sensory engagement', reasonEs: 'Implica los sentidos' },
  { id: 'g8', type: 'good', text: `"Can I ask your opinion?"`, textEs: `"¿Te puedo pedir tu opinión?"`, reason: 'Makes them feel valued', reasonEs: 'Les hace sentir valorados' },
  { id: 'b1', type: 'bad', text: `"Do you need any help?"`, textEs: `"¿Necesitas ayuda?"`, reason: 'Triggers the "just looking" reflex', reasonEs: 'Dispara el reflejo de "solo estoy mirando"' },
  { id: 'b2', type: 'bad', text: `"It is really cheap"`, textEs: `"Es muy barato"`, reason: 'Cheapens how the product is seen', reasonEs: 'Devalúa la percepción del producto' },
  { id: 'b3', type: 'bad', text: `"No problem / Sure"`, textEs: `"No hay problema / Vale"`, reason: 'Minimising language, sounds passive', reasonEs: 'Lenguaje que minimiza, suena pasivo' },
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
    name: 'Reciprocity',
    nameEs: 'Reciprocidad',
    description: 'People feel obliged to give back when they receive.',
    descriptionEs: 'Las personas se sienten obligadas a devolver cuando reciben algo.',
    apply: 'Give a free sample, a demo or a small gift first. They will feel more inclined to buy.',
    applyEs: 'Da primero una muestra, una demo o un regalito. Se sentirán más inclinados a comprar.',
  },
  {
    id: 'ci2',
    name: 'Commitment',
    nameEs: 'Compromiso',
    description: 'People want to act consistently with what they already said.',
    descriptionEs: 'Las personas quieren actuar de forma coherente con lo que ya han dicho.',
    apply: 'Get them to agree "the result looks great" — then asking for the sale feels consistent.',
    applyEs: 'Consigue que digan "el resultado se ve genial" — así pedir la venta les resulta coherente.',
  },
  {
    id: 'ci3',
    name: 'Social Proof',
    nameEs: 'Prueba Social',
    description: 'People follow what others are doing.',
    descriptionEs: 'Las personas siguen lo que hacen los demás.',
    apply: '"This is our bestseller" / "I just sold three of these" / show testimonials.',
    applyEs: '"Es nuestro más vendido" / "Acabo de vender tres" / enseña testimonios.',
  },
  {
    id: 'ci4',
    name: 'Authority',
    nameEs: 'Autoridad',
    description: 'People defer to experts and credible sources.',
    descriptionEs: 'Las personas hacen caso a los expertos y a las fuentes creíbles.',
    apply: '"In Europe dermatologists recommend this" / show deep product knowledge.',
    applyEs: '"En Europa los dermatólogos lo recomiendan" / demuestra que dominas el producto.',
  },
  {
    id: 'ci5',
    name: 'Liking',
    nameEs: 'Simpatía',
    description: 'People buy from people they like.',
    descriptionEs: 'Las personas compran a quien les cae bien.',
    apply: 'Genuine compliments, find common ground, mirror their energy.',
    applyEs: 'Cumplidos sinceros, busca puntos en común, refleja su energía.',
  },
  {
    id: 'ci6',
    name: 'Scarcity',
    nameEs: 'Escasez',
    description: 'People value what is rare or limited.',
    descriptionEs: 'Las personas valoran lo raro o limitado.',
    apply: '"Only valid today" / "Limited stock" / "This voucher expires when you leave".',
    applyEs: '"Solo vale hoy" / "Quedan pocos" / "Este cupón caduca cuando te vayas".',
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
  { id: 'bl1', term: 'Open palms when presenting', termEs: 'Palmas abiertas al presentar', meaning: 'Builds trust, signals honesty', meaningEs: 'Genera confianza, señala honestidad' },
  { id: 'bl2', term: 'Slight forward lean', termEs: 'Inclínate ligeramente hacia delante', meaning: 'Shows interest and engagement', meaningEs: 'Muestra interés e implicación' },
  { id: 'bl3', term: 'Mirror their posture', termEs: 'Imita su postura', meaning: 'Creates subconscious rapport', meaningEs: 'Crea sintonía inconsciente' },
  { id: 'bl4', term: 'Smile with your eyes (Duchenne)', termEs: 'Sonríe con los ojos (Duchenne)', meaning: 'Reads as genuine, not forced', meaningEs: 'Parece sincera, no forzada' },
  { id: 'bl5', term: 'Put the product in their hand', termEs: 'Ponles el producto en la mano', meaning: 'Once they hold it, ownership starts', meaningEs: 'En cuanto lo sostienen, empieza la sensación de propiedad' },
  { id: 'bl6', term: 'Stand at an angle, not head-on', termEs: 'Ponte de lado, no de frente', meaning: 'Less confrontational, more inviting', meaningEs: 'Menos confrontación, más cercanía' },
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
}

const EMERGENCY_OPENERS: EmergencyLine[] = [
  { id: 'eo1', text: `"I promise this will be the best 2 minutes of your day"`, textEs: `"Te prometo que van a ser los mejores 2 minutos de tu día"` },
  { id: 'eo2', text: `"I just want to show you something amazing — no pressure to buy"`, textEs: `"Solo quiero enseñarte algo increíble — sin ningún compromiso"` },
  { id: 'eo3', text: `"Everyone who tries this buys it — want to see why?"`, textEs: `"Todo el que lo prueba se lo lleva — ¿quieres ver por qué?"` },
  { id: 'eo4', text: `"Can I ask you a quick question? What do you use for your eyes?"`, textEs: `"¿Te hago una pregunta rápida? ¿Qué usas para el contorno de ojos?"` },
  { id: 'eo5', text: `"Watch this — I guarantee you have never seen anything like it"`, textEs: `"Mira esto — te garantizo que nunca has visto nada igual"` },
];

const EMERGENCY_CLOSES: EmergencyLine[] = [
  {
    id: 'ec1',
    text: `"Today only — and I mean ONLY today — it is {currency}${SYR_PROMO.price} instead of {currency}${SYR_B}"`,
    textEs: `"Solo hoy — y digo SOLO hoy — son {currency}${SYR_PROMO.price} en vez de {currency}${SYR_B}"`,
  },
  {
    id: 'ec2',
    text: `"Take a second one for your friend, your mum, your sister — buy 2 and the third is free, {currency}${MIX_B2G1.price} for ${MIX_B2G1.units}"`,
    textEs: `"Llévate otro para tu amiga, tu madre, tu hermana — compra 2 y el tercero es gratis, {currency}${MIX_B2G1.price} por ${MIX_B2G1.units}"`,
  },
  {
    id: 'ec3',
    text: `"Look — take my card. If you do not love it, WhatsApp me and I will refund you. But you will love it."`,
    textEs: `"Mira — toma mi tarjeta. Si no te encanta, me escribes por WhatsApp y te devuelvo el dinero. Pero te va a encantar."`,
  },
];

const EMERGENCY_KILLERS: EmergencyLine[] = [
  {
    id: 'ek1',
    head: `"Too expensive"`,
    headEs: `"Muy caro"`,
    text: `"Compared to what? A single Botox session in Europe is {currency}${SYR_A} and wears off. This is {currency}${SYR_PROMO.price} today and lasts months."`,
    textEs: `"¿Comparado con qué? Una sola sesión de Botox en Europa cuesta {currency}${SYR_A} y se pasa. Esto son {currency}${SYR_PROMO.price} hoy y dura meses."`,
  },
  {
    id: 'ek2',
    head: `"I need to think"`,
    headEs: `"Tengo que pensármelo"`,
    text: `"I get it. But this price is literally today only — tomorrow it is back to {currency}${SYR_B}."`,
    textEs: `"Lo entiendo. Pero este precio es literalmente solo de hoy — mañana vuelve a {currency}${SYR_B}."`,
  },
  {
    id: 'ek3',
    head: `"Just looking"`,
    headEs: `"Solo estoy mirando"`,
    text: `"Perfect! Looking is free. But trying is what changes your mind. Two minutes?"`,
    textEs: `"¡Perfecto! Mirar es gratis. Pero probarlo es lo que te cambia la cabeza. ¿Dos minutos?"`,
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
];

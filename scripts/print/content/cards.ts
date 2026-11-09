/*
 * The price-drop cards — the small ones, for a pocket.
 *
 * One card per LADDER, not one per product. Scrub, nail kit and body butter
 * share MIX_MATCH_LADDER rung for rung (80 → 60 → 120 for three → 120 for four
 * → 60 for two → 30), so three separate cards would be the same card printed
 * three times with a different word at the top. A seller carrying one sheet
 * that says "scrub · nail kit · body butter" is better served than one carrying
 * three that disagree the moment somebody edits only one of them.
 *
 * Everything here is read out of PRODUCT_LADDERS in cheatSheets.ts, which is
 * itself computed from pricing.ts. No number on these cards is typed.
 */
import { PRODUCT_LADDERS } from '../../../src/data/cheatSheets';
import { substitute } from '../../../src/utils/currency';
import type { Block, Doc } from '../types';

const CUR = '€';
const SHOP = 'Andorra';
const sub = (t: string | undefined): string => (t ? substitute(t, CUR, SHOP) : '');

type Rung = {
  id: string;
  tone?: string;
  label: string;
  labelEs: string;
  amount: number;
  units?: number;
  when?: string;
  whenEs?: string;
  words?: string;
  wordsEs?: string;
};
type Ladder = {
  id: string;
  short: string;
  shortEs: string;
  name: string;
  nameEs: string;
  europeAnchor: number;
  base: number;
  floor: number;
  rungs: Rung[];
  proof?: { label: string; labelEs: string; words: string; wordsEs: string };
};

const byId = (id: string): Ladder =>
  (PRODUCT_LADDERS as unknown as Ladder[]).find((l) => l.id === id)!;

/* The card's tone vocabulary is narrower than the app's: a printed sheet has no
   hover and no tap, so the only thing colour has to do is separate the rungs you
   OPEN with from the ones you retreat to, and mark the two that are special —
   the parallel option and the floor. */
function toneOf(r: Rung): 'anchor' | 'base' | 'promo' | 'parallel' | 'voucher' | 'floor' {
  if (r.tone === 'anchor') return 'anchor';
  if (r.tone === 'base') return 'base';
  if (r.tone === 'upsell') return 'parallel';
  if (r.tone === 'floor') return 'floor';
  if (r.id === 'voucher') return 'voucher';
  return 'promo';
}

function ladderBlock(l: Ladder, es: boolean): Block {
  return {
    type: 'ladder',
    rows: l.rungs.map((r) => ({
      price: `${CUR}${r.amount}`,
      label: sub(es ? r.labelEs : r.label),
      note: sub(es ? r.whenEs : r.when) || undefined,
      script: sub(es ? r.wordsEs : r.words) || undefined,
      tone: toneOf(r),
      units: r.units,
      each: r.units && r.units > 1 ? `${CUR}${Math.round(r.amount / r.units)}` : undefined,
    })),
  };
}

/** The two or three lines that stop a card being a price list. */
function rulesFor(id: string, es: boolean): string[] {
  const syr = byId('syringe');
  const voucher = syr.rungs.find((r) => r.id === 'voucher')!.amount;
  const noGift = syr.rungs.find((r) => r.id === 'no-gift')!.amount;

  if (id === 'syringe') {
    return es
      ? [
          `Un cupón, UNA vez: de ${CUR}${noGift} a ${CUR}${voucher}. No hay un segundo cupón — inventarte otro le dice que el primero también era inventado.`,
          `El cupón sale mientras le haces el otro ojo, y ANTES de que pueda verse el resultado. El espejo va el último, después del precio.`,
          `Para ${CUR}${syr.floor}: mercado puro y vas a buscar al encargado. Puedes venderlo tú a ese precio — lo que ganas yendo a por él es que suene a precio que alguien ha tenido que conseguir, no a uno que ya estaba ahí.`,
          `La Opción B no es bajar un peldaño. Va AL LADO de la Oferta 1, siempre las dos juntas, y es la que empujas si la ves bien.`,
        ]
      : [
          `One voucher, ONCE: ${CUR}${noGift} down to ${CUR}${voucher}. There is no second voucher — inventing another one tells her the first was invented too.`,
          `The voucher comes out while you are doing her other eye, and BEFORE she can see the result. The mirror comes last, after the price.`,
          `For ${CUR}${syr.floor}: full market, then go and fetch the manager. You are allowed to sell at that price — what fetching him buys is that it sounds like a price somebody had to go and win, not one that was always there.`,
          `Option B is not a step down. It sits BESIDE Offer 1, always the same two, and it is the one you push if she reads well.`,
        ];
  }

  if (id === 'peeling') {
    const peel = byId('peeling');
    return es
      ? [
          `Aquí el cupón cae directamente en el mínimo de ${CUR}${peel.floor} y ahí se acaba la escalera. Sin encargado, sin teatro — las cuentas son así.`,
          `La Opción B va al lado de la Oferta 1, no por debajo.`,
          `El peeling es la mitad de la escalera, no el final. Si la ves bien, súbela a los ojos.`,
        ]
      : [
          `Here the voucher lands straight on the ${CUR}${peel.floor} minimum and the ladder ends. No manager, no theatre — the maths is simply like that.`,
          `Option B sits beside Offer 1, not below it.`,
          `The peeling is the middle of the ladder, not the top of it. If she reads well, bridge her up to the eyes.`,
        ];
  }

  return es
    ? [
        `Estos tres comparten escalera: mismo ancla, mismos packs, mismo mínimo. Cambia el producto, no los números.`,
        `Los peldaños de ${CUR}120 son packs, no subidas. Di siempre el precio POR UNIDAD en voz alta — es donde está el argumento.`,
        `Son productos de principiante. Están para aprender a vender y para dar buen rollo. La jeringa es la estrella: si acabas el día contento con un kit de uñas, te has quedado corto.`,
        `La garantía de la lima es real y es la única que damos: trae la vieja, te llevas una nueva, para siempre. Dilo con seguridad.`,
      ]
    : [
        `These three share one ladder: same anchor, same bundles, same minimum. The product changes, the numbers do not.`,
        `The ${CUR}120 rungs are BUNDLES, not increases. Always say the per-unit price out loud — that is where the argument lives.`,
        `These are beginner products. They are for learning to sell and for good energy. The syringe is the star: if you finish the day pleased with a nail kit, you aimed low.`,
        `The buffer warranty is real and it is the only one we give: bring the old one back, get a new one, forever. Say it with confidence.`,
      ];
}

function card(opts: {
  id: string;
  slug: string;
  es: boolean;
  title: string;
  subtitle: string;
  ladder: Ladder;
}): Doc {
  const { id, slug, es, title, subtitle, ladder } = opts;
  const proof = ladder.proof;
  const blocks: Block[] = [
    {
      type: 'facts',
      items: [
        { label: es ? 'Ancla' : 'Anchor', value: `${CUR}${ladder.europeAnchor}` },
        { label: es ? `Precio ${SHOP}` : `${SHOP} price`, value: `${CUR}${ladder.base}` },
        { label: es ? 'Mínimo' : 'Minimum', value: `${CUR}${ladder.floor}` },
      ],
    },
    ladderBlock(ladder, es),
  ];

  if (proof) {
    blocks.push({
      type: 'callout',
      title: sub(es ? proof.labelEs : proof.label),
      body: sub(es ? proof.wordsEs : proof.words),
    });
  }

  blocks.push({ type: 'rules', items: rulesFor(id, es) });

  return {
    slug,
    lang: es ? 'es' : 'en',
    kind: 'card',
    eyebrow: es ? 'Cómo bajar el precio' : 'How to come down',
    title,
    subtitle,
    blocks,
  };
}

export function buildCardDocs(): Doc[] {
  const syr = byId('syringe');
  const peel = byId('peeling');
  /* Scrub and nail kit are the same ladder; either one is the Mix & Match
     ladder. Taking the scrub's rungs is arbitrary and safe — a guard would
     catch them drifting apart, because both are built from MIX_MATCH_LADDER. */
  const mix = byId('scrub');

  return [
    card({
      id: 'syringe',
      slug: 'card-syringe-en',
      es: false,
      title: 'The Syringe',
      subtitle: 'Hyaluronic acid — the star product',
      ladder: syr,
    }),
    card({
      id: 'syringe',
      slug: 'card-syringe-es',
      es: true,
      title: 'La Jeringa',
      subtitle: 'Ácido hialurónico — el producto estrella',
      ladder: syr,
    }),
    card({
      id: 'peeling',
      slug: 'card-peeling-en',
      es: false,
      title: 'The Peeling',
      subtitle: 'The middle of the ladder',
      ladder: peel,
    }),
    card({
      id: 'peeling',
      slug: 'card-peeling-es',
      es: true,
      title: 'El Peeling',
      subtitle: 'La mitad de la escalera',
      ladder: peel,
    }),
    card({
      id: 'mix',
      slug: 'card-mix-match-en',
      es: false,
      title: 'Scrub · Nail Kit · Body Butter',
      subtitle: 'One ladder, three products',
      ladder: mix,
    }),
    card({
      id: 'mix',
      slug: 'card-mix-match-es',
      es: true,
      title: 'Exfoliante · Kit de Uñas · Manteca',
      subtitle: 'Una escalera, tres productos',
      ladder: mix,
    }),
  ];
}

/*
 * nailkit.ts — the printable Nail Kit speech sheet.
 *
 * Every line is lifted out of `src/data/nailKitData.ts`: the two stop scripts,
 * the three demo beats, the warranty pitch, the four offer scripts and the
 * eight pro tips are the SAME strings the app shows. Prices are read off
 * MIX_MATCH_LADDER in `src/data/pricing.ts` — the nail kit, the scrub and the
 * body butter share one ladder, and those rungs are BUNDLES (the same money
 * buys three or four), not a smooth descent, so `units` and `each` carry the
 * part a bare price would hide.
 *
 * Two things are written here rather than extracted. The first is where this
 * product sits: the app teaches the nail kit as a demo, and a printed sheet in
 * a new seller's apron has to say out loud that it is a training-wheels product
 * and the syringe is the star. The second is the hard-rules block — the buffer
 * warranty is the one lasting promise this shop makes, and a sheet that quotes
 * "exchange it in any of our stores" without saying that had better not be the
 * only thing a beginner reads about promises.
 */
import type { Block, Doc } from '../types';
import { MIX_MATCH_LADDER, descentSteps, eachOf } from '../../../src/data/pricing';
import { nailKitData } from '../../../src/data/nailKitData';
import { substitute } from '../../../src/utils/currency';

/* The sheets print for Andorra; Gibraltar's twin is the same text with £. */
const CURRENCY = '€';
const LOCATION = 'Andorra';

const LADDER = MIX_MATCH_LADDER;
const RUNGS = descentSteps(LADDER);

type LadderRow = Extract<Block, { type: 'ladder' }>['rows'][number];
type Tone = LadderRow['tone'];

/** Resolve {currency} / {locationName} so no token can reach the page. */
const sub = (text: string) => substitute(text, CURRENCY, LOCATION);

/** Never type a price. Every number comes off the ladder. */
const money = (amount: number) => `${CURRENCY}${amount}`;

/** A spoken line without the quote marks the data wraps it in. */
const bare = (text: string) =>
  sub(text)
    .trim()
    .replace(/^["“«]+/, '')
    .replace(/["”»]+$/, '')
    .trim();

/** The quick-reference labels carry their own colons; the strip adds one. */
const stripColon = (text: string) => sub(text).replace(/:\s*$/, '');

/**
 * 'Step 1 — Smooth' -> 'Smooth'. The beat number is already the `n` field, so
 * repeating "Step 1" in the title just eats the width of the page.
 */
const tail = (text: string) => {
  const parts = text.split('—');
  return (parts.length > 1 ? parts.slice(1).join('—') : text).trim();
};

function rung(id: string) {
  const found = RUNGS.filter((s) => s.id === id)[0];
  if (!found) throw new Error(`MIX_MATCH_LADDER has no rung "${id}" — did an id change?`);
  return found;
}

/*
 * `b2g2` is drawn `parallel` on purpose. It is the same money as `b2g1` for an
 * extra kit — an option laid BESIDE the core offer for the buyer with a gift
 * list, not a step down. Colouring it like a descent rung draws a ladder whose
 * price does not move and teaches a seller to "come down" to it for nothing.
 */
const TONE: Record<string, Tone> = {
  b2g1: 'promo',
  b2g2: 'parallel',
  b1g1: 'promo',
  floor: 'floor',
};

function build(lang: 'en' | 'es'): Doc {
  const es = lang === 'es';
  const pick = <T,>(en: T, esv: T) => (es ? esv : en);

  const { hero, hook, demo, warranty, price, emotional, quickRef, proTips } = nailKitData;
  const offers = nailKitData.getOffers(CURRENCY, LOCATION, es);
  const tips = nailKitData.getProTips(CURRENCY, es);

  /* Offers and ladder rungs are the same four prices in the same order. If
     that ever stops being true the sheet is lying, so fail loudly. */
  if (offers.length !== RUNGS.length) {
    throw new Error('getOffers() and MIX_MATCH_LADDER are out of step');
  }
  RUNGS.forEach((r, i) => {
    if (offers[i].price !== money(r.price)) {
      throw new Error(`offer ${i} says ${offers[i].price}, ladder says ${money(r.price)}`);
    }
  });

  const offerRow = (id: string, i: number): LadderRow => {
    const r = rung(id);
    return {
      price: money(r.price),
      label: es ? r.labelEs : r.label,
      note: `${offers[i].subtitle} · ${offers[i].items.join(' · ')}`,
      script: bare(offers[i].script),
      tone: TONE[id],
      units: r.units,
      each: money(eachOf(r)),
    };
  };

  const blocks: Block[] = [
    {
      type: 'intro',
      text: pick(
        `Sixty seconds, one nail, and a face that lights up — the fastest WOW you will ever get out of a stranger's hand. Know where it sits before you fall in love with it: the nail kit, the scrub and the body butter are completely beginner products. They are for people who are learning how to sell, or who just want to put some nice energy on the floor. The syringe is the star product — that is what we focus on, and selling one is what a shift is measured on. So a sheet that treated a nail-kit sale as the goal would be teaching you to stay a beginner. Run this one for the practice: once you can get that reaction on demand, on a stranger, with a crowd watching, you can get it on the syringe too. One real promise comes with the kit, and it is the only one in the shop — the buffer. She brings the old one back, she gets a new one, forever.`,
        `Sesenta segundos, una uña y una cara que se ilumina — el WOW más rápido que vas a conseguir nunca de un desconocido. Ten claro dónde encaja antes de enamorarte de él: el kit de uñas, el exfoliante y la manteca corporal son productos completamente de principiante. Son para quien está aprendiendo a vender, o para quien solo quiere poner buena energía en la tienda. La jeringa es el producto estrella — es en lo que nos centramos, y vender una es la medida de un turno. Así que una hoja que tratara la venta de un kit de uñas como el objetivo te estaría enseñando a quedarte de principiante. Hazlo para practicar: cuando consigas esa reacción cuando quieras, con un desconocido y con gente mirando, también la conseguirás con la jeringa. El kit trae una promesa de verdad, y es la única de la tienda — la lima. Ella trae la vieja y se lleva una nueva, para siempre.`
      ),
    },

    { type: 'heading', text: pick(quickRef.sectionTitle, quickRef.sectionTitleEs) },
    {
      type: 'facts',
      items: [
        { label: stripColon(pick(quickRef.demoLabel, quickRef.demoLabelEs)), value: pick(quickRef.demoValue, quickRef.demoValueEs) },
        { label: stripColon(pick(quickRef.shineLabel, quickRef.shineLabelEs)), value: pick(quickRef.shineValue, quickRef.shineValueEs) },
        { label: stripColon(pick(quickRef.noPolishLabel, quickRef.noPolishLabelEs)), value: pick(quickRef.noPolishValue, quickRef.noPolishValueEs) },
        { label: pick(warranty.statWarrantyLabel, warranty.statWarrantyLabelEs), value: pick(warranty.statWarrantyValue, warranty.statWarrantyValueEs) },
        { label: pick(warranty.statKitLabel, warranty.statKitLabelEs), value: pick(warranty.statKitValue, warranty.statKitValueEs) },
        { label: sub(pick(price.europeLabel, price.europeLabelEs)), value: money(LADDER.europeAnchor) },
        { label: sub(pick(price.locationPriceLabel, price.locationPriceLabelEs)), value: money(LADDER.base) },
      ],
    },

    { type: 'heading', text: pick(hook.sectionTitle, hook.sectionTitleEs) },
    {
      type: 'steps',
      items: [
        {
          n: '1',
          title: pick(hook.complimentLabel, hook.complimentLabelEs),
          body: `${pick(hook.complimentScript, hook.complimentScriptEs)} ${pick(hook.complimentCoaching, hook.complimentCoachingEs)}`,
        },
        {
          n: '2',
          title: pick(hook.sceneLabel, hook.sceneLabelEs),
          body: `${pick(hook.sceneScript, hook.sceneScriptEs)} ${pick(hook.sceneCoaching, hook.sceneCoachingEs)}`,
        },
      ],
    },
    {
      type: 'script',
      label: pick('The stop, out loud', 'La parada, en voz alta'),
      lines: [
        bare(pick(hook.complimentScript, hook.complimentScriptEs)),
        bare(pick(hook.sceneScript, hook.sceneScriptEs)),
      ],
    },

    { type: 'heading', text: pick(demo.sectionTitle, demo.sectionTitleEs) },
    {
      type: 'callout',
      title: pick('Build it, do not rush it', 'Constrúyelo, no lo corras'),
      body: pick(demo.description, demo.descriptionEs),
    },
    {
      type: 'steps',
      items: [
        {
          n: '1',
          title: `${tail(pick(demo.step1Title, demo.step1TitleEs))} · ${pick(demo.step1Label, demo.step1LabelEs)}`,
          body: `${pick(demo.step1Instruction, demo.step1InstructionEs)} ${pick(demo.step1Script, demo.step1ScriptEs)} ${pick(demo.step1CoachingPrefix, demo.step1CoachingPrefixEs)}${pick(demo.step1Coaching, demo.step1CoachingEs)}`,
        },
        {
          n: '2',
          title: `${tail(pick(demo.step2Title, demo.step2TitleEs))} · ${pick(demo.step2Label, demo.step2LabelEs)}`,
          body: `${pick(demo.step2Instruction, demo.step2InstructionEs)} ${pick(demo.step2Script, demo.step2ScriptEs)}`,
        },
        {
          n: '3',
          title: `${tail(pick(demo.step3Title, demo.step3TitleEs))} · ${pick(demo.step3Label, demo.step3LabelEs)}`,
          body: `${pick(demo.step3Instruction, demo.step3InstructionEs)} ${pick(demo.step3Teaser, demo.step3TeaserEs)} ${pick(demo.step3Script, demo.step3ScriptEs)} ${pick(demo.step3Coaching, demo.step3CoachingEs)}`,
        },
      ],
    },
    {
      type: 'script',
      label: pick('The three beats, out loud', 'Los tres pasos, en voz alta'),
      lines: [
        bare(pick(demo.step1Script, demo.step1ScriptEs)),
        bare(pick(demo.step1Coaching, demo.step1CoachingEs)),
        bare(pick(demo.step2Script, demo.step2ScriptEs)),
        bare(pick(demo.step3Teaser, demo.step3TeaserEs)),
        bare(pick(demo.step3Script, demo.step3ScriptEs)),
      ],
    },

    { type: 'heading', text: pick(warranty.sectionTitle, warranty.sectionTitleEs) },
    {
      type: 'steps',
      items: [
        {
          n: '1',
          title: pick(warranty.presentKitLabel, warranty.presentKitLabelEs),
          body: pick(warranty.presentKitScript, warranty.presentKitScriptEs),
        },
        {
          n: '2',
          title: pick('Close the Logic', 'Cierra con la Lógica'),
          body: `${pick(warranty.coachingIntro, warranty.coachingIntroEs)} ${pick(warranty.coachingScript, warranty.coachingScriptEs)}`,
        },
      ],
    },
    {
      type: 'script',
      label: pick('The warranty, out loud', 'La garantía, en voz alta'),
      lines: [
        bare(pick(warranty.presentKitScript, warranty.presentKitScriptEs)),
        bare(pick(warranty.coachingScript, warranty.coachingScriptEs)),
      ],
    },
    {
      type: 'callout',
      title: pick('The buffer warranty is real — say it with confidence', 'La garantía de la lima es real — dilo con confianza'),
      body: pick(
        `${warranty.description} And it is the one lasting promise anybody in this shop is allowed to make: she brings the old buffer back, she gets a new one, forever, in any of our stores. The owner honours it, so say it like you mean it — the dog line is there to make her laugh, not to soften a lie. Everything else stops at the till. No refunds, no returns, no money back, no promise of future service.`,
        `${warranty.descriptionEs} Y es la única promesa duradera que alguien de esta tienda puede hacer: trae la lima vieja, se lleva una nueva, para siempre, en cualquiera de nuestras tiendas. El dueño la cumple, así que dilo como si lo sintieras — la frase del perro está para que se ría, no para disimular una mentira. Todo lo demás termina en la caja. Sin reembolsos, sin devoluciones, sin dinero de vuelta, sin promesas de servicio futuro.`
      ),
    },

    { type: 'heading', text: pick(emotional.sectionTitle, emotional.sectionTitleEs) },
    {
      type: 'script',
      label: pick('While she is still looking at her hand', 'Mientras sigue mirándose la mano'),
      lines: [
        bare(pick(emotional.script1, emotional.script1Es)),
        bare(sub(pick(emotional.script2Template, emotional.script2TemplateEs))),
      ],
    },
    {
      type: 'callout',
      title: pick('Tone', 'Tono'),
      body: pick(emotional.coaching, emotional.coachingEs),
    },

    { type: 'heading', text: pick(price.sectionTitle, price.sectionTitleEs) },
    {
      type: 'ladder',
      rows: [
        {
          price: money(LADDER.europeAnchor),
          label: pick('Europe — what these cost back home', 'Europa — lo que cuestan allí'),
          note: pick(
            'Always anchor with Europe first. Nobody pays this — it is the strike-through you say out loud before the real number.',
            'Ancla siempre con Europa primero. Nadie paga esto — es el precio tachado que dices en voz alta antes del número de verdad.'
          ),
          tone: 'anchor',
          units: 1,
          each: money(LADDER.europeAnchor),
        },
        {
          price: money(LADDER.base),
          label: pick(`${LOCATION} — one kit`, `${LOCATION} — un kit`),
          note: pick(
            'The asking price, and what the buffer alone is worth with the warranty on it. Say it once, then go straight to the offer.',
            'El precio de salida, y lo que vale la lima sola con la garantía puesta. Dilo una vez y pasa directo a la oferta.'
          ),
          tone: 'base',
          units: 1,
          each: money(LADDER.base),
        },
        offerRow('b2g1', 0),
        offerRow('b2g2', 1),
        offerRow('b1g1', 2),
        offerRow('floor', 3),
      ],
    },
    {
      type: 'callout',
      title: pick('THE RULE — she does not leave the shop', 'LA REGLA — no sale de la tienda'),
      body: pick(
        `If she walks out she is never coming back, so treat every exit as a lost sale. Read the ladder as bundles, not a slide: ${money(rung('b2g1').price)} buys three kits and the same ${money(rung('b2g2').price)} buys four, so the money only really moves at ${money(rung('b1g1').price)} and then at ${money(LADDER.floor)}. The whole kit at ${money(LADDER.floor)} is the bottom rung, not a goodbye — warranty included, in her hands today, and she is a customer. Work all of it before anything ends. Never hand her a card, never write the price down, never send her off to have a think with somebody who is not standing here.`,
        `Si sale por la puerta no vuelve, así que trata cada salida como una venta perdida. Lee la escalera como lotes, no como una bajada: ${money(rung('b2g1').price)} se lleva tres kits y los mismos ${money(rung('b2g2').price)} se llevan cuatro, así que el dinero solo se mueve de verdad en ${money(rung('b1g1').price)} y luego en ${money(LADDER.floor)}. El kit entero a ${money(LADDER.floor)} es el último escalón, no una despedida — con garantía incluida, en sus manos hoy, y ya es clienta. Recórrela entera antes de que termine nada. Nunca le des una tarjeta, nunca le apuntes el precio, nunca la mandes a pensárselo con alguien que no está aquí delante.`
      ),
    },

    { type: 'heading', text: pick(proTips.sectionTitle, proTips.sectionTitleEs) },
    {
      type: 'tips',
      items: tips.map((t) => ({ title: sub(t.title), body: sub(t.text) })),
    },

    { type: 'heading', text: pick('Lines We Do Not Cross', 'Líneas Que No Cruzamos') },
    {
      type: 'rules',
      items: pick(
        [
          'The buffer is the one promise you may make, and it is real: she brings the old buffer back, she gets a new one, forever, in any of our stores. Nothing else gets promised — no refunds, no returns, no money back, no service after the till.',
          `Nobody leaves to think about it. The whole kit at ${money(LADDER.floor)} is the last rung and it happens here, today — no card, no price written down, no voucher to take away.`,
          'A nail kit is never what follows a syringe. Sell a syringe and your job is the handover: the upseller is a specialist who is only here for a short time. You do not pitch a second product on top of it.',
          'Nails, oils, shine, dry hands — talk all of it up as much as you like. Never reach for a disease to sell a kit.',
          `Never explain why it is cheaper here. The Europe price beside the ${LOCATION} price does the whole job on its own — the shop’s standing in ${LOCATION} is not a selling point we voice, in any wording.`,
          'Every number on this sheet is generated from the app. If a rung moves, reprint the sheet; never invent a rung of your own.',
        ],
        [
          'La lima es la única promesa que puedes hacer, y es real: trae la lima vieja, se lleva una nueva, para siempre, en cualquiera de nuestras tiendas. No se promete nada más — sin reembolsos, sin devoluciones, sin dinero de vuelta, sin servicio después de la caja.',
          `Nadie se va a pensárselo. El kit entero a ${money(LADDER.floor)} es el último escalón y pasa aquí, hoy — sin tarjeta, sin apuntar el precio, sin cupón para llevarse.`,
          'Un kit de uñas nunca es lo que va después de una jeringa. Si vendes una jeringa, tu trabajo es el traspaso: el upseller es un especialista que solo está aquí poco tiempo. No le vendes un segundo producto encima.',
          'Uñas, aceites, brillo, manos secas — habla de todo eso todo lo que quieras. Nunca eches mano de una enfermedad para vender un kit.',
          `Nunca expliques por qué es más barato aquí. El precio de Europa junto al precio de ${LOCATION} hace todo el trabajo — la situación de la tienda en ${LOCATION} no es un argumento de venta que usemos, con ninguna palabra.`,
          'Cada número de esta hoja se genera desde la app. Si se mueve un escalón, reimprime la hoja; nunca te inventes un escalón.',
        ]
      ),
    },
  ];

  return {
    slug: es ? 'nail-kit-es' : 'nail-kit-en',
    lang,
    kind: 'lesson',
    eyebrow: pick(`Beginner Product · ${hero.badge}`, `Producto de Principiante · ${hero.badgeEs}`),
    title: pick(hero.title, hero.titleEs),
    subtitle: pick(hero.subtitle, hero.subtitleEs),
    blocks,
  };
}

export function buildNailKitDocs(): Doc[] {
  return [build('en'), build('es')];
}

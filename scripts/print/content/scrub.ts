/*
 * scrub.ts — the printable Dead Sea Scrub & Body Butter speech sheet.
 *
 * Everything on the page is lifted out of `src/data/scrubData.ts` and
 * `src/data/pricing.ts`. Nothing is retyped: the hook, the five sensory beats,
 * the flip test, the price patter and the eight pro tips are the SAME strings
 * the app shows, and every number on the ladder is read off MIX_MATCH_LADDER.
 * Move a rung in pricing.ts and this sheet moves with it — which is the whole
 * reason the handouts are generated instead of written.
 *
 * The one thing written here rather than extracted is where this product SITS.
 * The app teaches the scrub as a demo; a printed sheet handed to a new seller
 * has to say out loud that it is a training-wheels product and the syringe is
 * the star, or the sheet quietly becomes the goal.
 */
import type { Block, Doc } from '../types';
import { MIX_MATCH_LADDER, descentSteps, eachOf } from '../../../src/data/pricing';
import { getComboOffersData, scrubData } from '../../../src/data/scrubData';
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

/** The quick-reference grid labels carry their own colons; the strip adds one. */
const stripColon = (text: string) => sub(text).replace(/:\s*$/, '');

/**
 * The words inside double quotes — the bits the seller actually says.
 *
 * The sensory-demo steps mix stage direction and speech in one string
 * ('Place the salts … "Start rubbing gently." Let them feel the crystals'),
 * so the `steps` block keeps them whole and the `script` block pulls the
 * spoken spans out of the same source.
 */
function spoken(text: string): string[] {
  const found = sub(text).match(/"[^"]+"/g);
  return found ? found.map((s) => s.slice(1, -1).trim()).filter(Boolean) : [];
}

function rung(id: string) {
  const found = RUNGS.filter((s) => s.id === id)[0];
  if (!found) throw new Error(`MIX_MATCH_LADDER has no rung "${id}" — did an id change?`);
  return found;
}

/** Bundle rungs, not a descent: €120 buys three OR four, so `units` matters. */
const TONE: Record<string, Tone> = {
  b2g1: 'promo',
  b2g2: 'parallel',
  b1g1: 'promo',
  floor: 'floor',
};

function bundleRow(id: string, es: boolean, note: string, script?: string): LadderRow {
  const r = rung(id);
  return {
    price: money(r.price),
    label: es ? r.labelEs : r.label,
    note,
    ...(script ? { script } : {}),
    tone: TONE[id],
    units: r.units,
    each: money(eachOf(r)),
  };
}

function build(lang: 'en' | 'es'): Doc {
  const es = lang === 'es';
  const d = scrubData;
  const hero = d.hero;
  const stats = hero.stats;
  const grid = d.quickReferenceSection.grid;
  const pp = d.pricePresentationSection;

  /* Combo offers and ladder rungs are the same four prices in the same order.
     If that ever stops being true the sheet is lying, so fail loudly. */
  const offers = getComboOffersData(CURRENCY);
  if (offers.length !== RUNGS.length) {
    throw new Error('getComboOffersData() and MIX_MATCH_LADDER are out of step');
  }
  RUNGS.forEach((r, i) => {
    if (offers[i].price !== money(r.price)) {
      throw new Error(`combo offer ${i} says ${offers[i].price}, ladder says ${money(r.price)}`);
    }
  });
  const sublabel = (i: number) => (es ? offers[i].subtitleEs : offers[i].subtitle);

  const pick = <T,>(en: T, esv: T) => (es ? esv : en);

  const blocks: Block[] = [
    {
      type: 'intro',
      text: pick(
        `The friendliest demo in the shop, and the one you learn on. Know where it sits before you fall in love with it: the scrub, the body butter and the nail kit are completely beginner products. They are for people who are learning how to sell, or who just want to put some nice energy on the floor. The syringe is the star product — that is what we focus on, and selling one is what a shift is measured on. So a sheet that treated a scrub sale as the goal would be teaching you to stay a beginner. Use this for exactly what it is: hands, water, a jar that does not spill and a face that smiles. Nobody says no to feeling nice. Get your mouth working and your confidence up here, then take both to the syringe.`,
        `La demo más agradecida de la tienda, y la que usas para aprender. Ten claro dónde encaja antes de enamorarte de ella: el exfoliante, la manteca corporal y el kit de uñas son productos completamente de principiante. Son para quien está aprendiendo a vender, o para quien solo quiere poner buena energía en la tienda. La jeringa es el producto estrella — es en lo que nos centramos, y vender una es la medida de un turno. Así que una hoja que tratara la venta de un exfoliante como el objetivo te estaría enseñando a quedarte de principiante. Úsala para lo que es: manos, agua, un bote que no se derrama y una cara que sonríe. Nadie le dice no a sentirse bien. Suéltate aquí, coge confianza, y luego llévate las dos cosas a la jeringa.`
      ),
    },

    { type: 'heading', text: pick(d.quickReferenceSection.title, d.quickReferenceSection.titleEs) },
    {
      type: 'facts',
      items: [
        { label: pick(stats.sourceLabel, stats.sourceLabelEs), value: pick(stats.sourceValue, stats.sourceValueEs) },
        { label: pick(stats.jarLastsLabel, stats.jarLastsLabelEs), value: pick(stats.jarLastsValue, stats.jarLastsValueEs) },
        { label: pick(stats.feelingLabel, stats.feelingLabelEs), value: pick(stats.feelingValue, stats.feelingValueEs) },
        { label: stripColon(pick(grid.europeLabel, grid.europeLabelEs)), value: sub(pick(grid.europeValue, grid.europeValueEs)) },
        { label: stripColon(pick(grid.localLabel, grid.localLabelEs)), value: sub(pick(grid.localValue, grid.localValueEs)) },
        { label: stripColon(pick(grid.coreLabel, grid.coreLabelEs)), value: sub(pick(grid.coreValue, grid.coreValueEs)) },
        { label: stripColon(pick(grid.floorLabel, grid.floorLabelEs)), value: sub(pick(grid.floorValue, grid.floorValueEs)) },
      ],
    },

    { type: 'heading', text: pick(d.hookSection.title, d.hookSection.titleEs) },
    {
      type: 'script',
      label: pick('Pick one and walk her in', 'Elige uno y llévala dentro'),
      lines: d.hookSection.quotes.map((q) => bare(pick(q.text, q.textEs))),
    },

    { type: 'heading', text: pick(d.sensoryDemoSection.title, d.sensoryDemoSection.titleEs) },
    {
      type: 'steps',
      items: d.sensoryDemoSection.steps.map((s) => ({
        n: s.step,
        title: pick(s.title, s.titleEs),
        body: sub(pick(s.text, s.textEs)),
      })),
    },
    {
      type: 'script',
      label: pick('The demo, out loud', 'La demo, en voz alta'),
      lines: d.sensoryDemoSection.steps.reduce<string[]>(
        (lines, s) => lines.concat(spoken(pick(s.text, s.textEs))),
        []
      ),
    },

    { type: 'heading', text: pick(d.butterFlipSection.title, d.butterFlipSection.titleEs) },
    {
      type: 'callout',
      title: pick('Impossible to fake', 'Imposible de fingir'),
      body: pick(d.butterFlipSection.description, d.butterFlipSection.descriptionEs),
    },
    {
      type: 'steps',
      items: [
        {
          n: '1',
          title: pick(d.butterFlipSection.demoLabel, d.butterFlipSection.demoLabelEs),
          body: `${pick(d.butterFlipSection.demoQuote1, d.butterFlipSection.demoQuote1Es)} ${pick(d.butterFlipSection.demoQuote2, d.butterFlipSection.demoQuote2Es)}`,
        },
        {
          n: '2',
          title: pick('The Closing Line', 'La Frase de Cierre'),
          body: `${pick(d.butterFlipSection.closingLine, d.butterFlipSection.closingLineEs)}"${pick(d.butterFlipSection.closingQuote, d.butterFlipSection.closingQuoteEs)}"`,
        },
      ],
    },
    {
      type: 'script',
      label: pick('The flip, out loud', 'El volteo, en voz alta'),
      lines: [
        bare(pick(d.butterFlipSection.demoQuote2, d.butterFlipSection.demoQuote2Es)),
        bare(pick(d.butterFlipSection.closingQuote, d.butterFlipSection.closingQuoteEs)),
      ],
    },

    { type: 'heading', text: pick(pp.title, pp.titleEs) },
    {
      type: 'script',
      label: pick('Anchor, then local, then the offer', 'Ancla, luego local, luego la oferta'),
      lines: [
        bare(pick(pp.anchorQuote(CURRENCY), pp.anchorQuoteEs(CURRENCY))),
        bare(pick(pp.localQuote(CURRENCY, LOCATION), pp.localQuoteEs(CURRENCY, LOCATION))),
        bare(pick(pp.coreQuote(CURRENCY), pp.coreQuoteEs(CURRENCY))),
      ],
    },

    { type: 'heading', text: pick(d.comboOffersSection.title, d.comboOffersSection.titleEs) },
    {
      type: 'ladder',
      rows: [
        {
          price: money(LADDER.europeAnchor),
          label: pick('Europe — what these cost back home', 'Europa — lo que cuestan allí'),
          note: pick(
            'Nobody pays this. It is the strike-through you say out loud before the real number.',
            'Nadie paga esto. Es el precio tachado que dices en voz alta antes del número de verdad.'
          ),
          script: bare(pick(pp.anchorQuote(CURRENCY), pp.anchorQuoteEs(CURRENCY))),
          tone: 'anchor',
          units: 1,
          each: money(LADDER.europeAnchor),
        },
        {
          price: money(LADDER.base),
          label: pick(`${LOCATION} — one jar`, `${LOCATION} — un bote`),
          note: pick('The asking price. Say it once, then go straight to the offer.', 'El precio de salida. Dilo una vez y pasa directo a la oferta.'),
          script: bare(pick(pp.localQuote(CURRENCY, LOCATION), pp.localQuoteEs(CURRENCY, LOCATION))),
          tone: 'base',
          units: 1,
          each: money(LADDER.base),
        },
        bundleRow('b2g1', es, sublabel(0), bare(pick(pp.coreQuote(CURRENCY), pp.coreQuoteEs(CURRENCY)))),
        bundleRow('b2g2', es, sublabel(1)),
        bundleRow('b1g1', es, sublabel(2)),
        bundleRow('floor', es, sublabel(3)),
      ],
    },
    {
      type: 'callout',
      title: pick('THE RULE — she does not leave the shop', 'LA REGLA — no sale de la tienda'),
      body: pick(
        `If she walks out she is never coming back, so treat every exit as a lost sale. Read the ladder as bundles, not a slide: ${money(rung('b2g1').price)} buys three and the same ${money(rung('b2g2').price)} buys four, so the money only really moves at ${money(rung('b1g1').price)} and then at ${money(LADDER.floor)}. The single at ${money(LADDER.floor)} is the bottom rung, not a goodbye — it puts the product in her hands today and makes her a customer. Work all of it before anything ends. Never hand her a card, never write the price down, never send her off to have a think with somebody who is not standing here.`,
        `Si sale por la puerta no vuelve, así que trata cada salida como una venta perdida. Lee la escalera como lotes, no como una bajada: ${money(rung('b2g1').price)} se lleva tres y los mismos ${money(rung('b2g2').price)} se llevan cuatro, así que el dinero solo se mueve de verdad en ${money(rung('b1g1').price)} y luego en ${money(LADDER.floor)}. El individual a ${money(LADDER.floor)} es el último escalón, no una despedida — le pone el producto en las manos hoy y la convierte en clienta. Recórrela entera antes de que termine nada. Nunca le des una tarjeta, nunca le apuntes el precio, nunca la mandes a pensárselo con alguien que no está aquí delante.`
      ),
    },

    { type: 'heading', text: pick(d.cheatCombosSection.title, d.cheatCombosSection.titleEs) },
    {
      type: 'facts',
      items: d.cheatCombosSection.combos.map((c) => ({
        label: `${pick(c.name, c.nameEs)} · ${sub(c.price)}`,
        value: pick(c.items, c.itemsEs),
      })),
    },

    { type: 'heading', text: pick(d.proTipsSection.title, d.proTipsSection.titleEs) },
    {
      type: 'tips',
      items: d.proTipsSection.tips.map((t) => ({
        title: sub(pick(t.title, t.titleEs)),
        body: sub(pick(t.text, t.textEs)),
      })),
    },

    { type: 'heading', text: pick('Lines We Do Not Cross', 'Líneas Que No Cruzamos') },
    {
      type: 'rules',
      items: pick(
        [
          `Nobody leaves to think about it. The single at ${money(LADDER.floor)} is the last rung and it happens here, today — no card, no price written down, no voucher to take away.`,
          'A scrub is never what follows a syringe. Sell a syringe and your job is the handover: the upseller is a specialist who is only here for a short time. You do not pitch a second product on top of it.',
          'Nothing the shop has to honour afterwards. No refunds, no returns, no money back, no promise of future service — the buffer swap is the nail kit’s, and it is the only one.',
          'Talk the skin up as much as you like — the driest, the most sensitive, the ones who cannot put anything on themselves. Never reach for a disease to sell a cream.',
          `Never explain why it is cheaper here. The Europe price beside the ${LOCATION} price does the whole job on its own — the shop’s standing in ${LOCATION} is not a selling point we voice, in any wording.`,
          'Every number on this sheet is generated from the app. If a rung moves, reprint the sheet; never invent a rung of your own.',
        ],
        [
          `Nadie se va a pensárselo. El individual a ${money(LADDER.floor)} es el último escalón y pasa aquí, hoy — sin tarjeta, sin apuntar el precio, sin cupón para llevarse.`,
          'Un exfoliante nunca es lo que va después de una jeringa. Si vendes una jeringa, tu trabajo es el traspaso: el upseller es un especialista que solo está aquí poco tiempo. No le vendes un segundo producto encima.',
          'Nada que la tienda tenga que cumplir después. Sin reembolsos, sin devoluciones, sin dinero de vuelta, sin promesas de servicio futuro — el cambio de lima es del kit de uñas, y es el único.',
          'Habla de la piel todo lo que quieras — la más seca, la más sensible, la de quien no se puede poner nada. Nunca eches mano de una enfermedad para vender una crema.',
          `Nunca expliques por qué es más barato aquí. El precio de Europa junto al precio de ${LOCATION} hace todo el trabajo — la situación de la tienda en ${LOCATION} no es un argumento de venta que usemos, con ninguna palabra.`,
          'Cada número de esta hoja se genera desde la app. Si se mueve un escalón, reimprime la hoja; nunca te inventes un escalón.',
        ]
      ),
    },
  ];

  return {
    slug: es ? 'scrub-es' : 'scrub-en',
    lang,
    kind: 'lesson',
    eyebrow: pick(`Beginner Product · ${hero.badge}`, `Producto de Principiante · ${hero.badgeEs}`),
    title: pick(hero.title, 'Exfoliante y Manteca Corporal del Mar Muerto'),
    subtitle: pick(hero.tagline, hero.taglineEs),
    blocks,
  };
}

export function buildScrubDocs(): Doc[] {
  return [build('en'), build('es')];
}

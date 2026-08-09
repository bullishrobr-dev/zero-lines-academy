// ─────────────────────────────────────────────────────────────────────────────
// nudges.ts — the short prompts that land on a seller's phone during the dead
// minutes of a shift (roughly one every 30–40 minutes).
//
// They render twice: as a push notification and as an in-app card. So they have
// to survive a three-second read on a lock screen. One idea each, no build-up,
// no homework. The voice is a sharp colleague leaning over, not a trainer.
//
// Same content rules as the rest of src/data:
//   1. NO currency symbol. Write the plain token {currency} (and {locationName}
//      for the shop) and let `sub()` from src/utils/currency.ts resolve it.
//   2. NO typed-in prices. Every number is read off a ladder in pricing.ts, so
//      a nudge can never quote a price the cheat sheet has stopped using.
//   3. Every string has an `*Es` twin — European Spanish, informal "tú", street
//      register. Written to sound right out loud, not translated word for word.
//   4. No medical claims and nothing about tax, VAT refunds or customs. Those
//      were taken out of the app on purpose; do not walk them back in here.
// ─────────────────────────────────────────────────────────────────────────────

import {
  MIX_MATCH_LADDER,
  PEELING_LADDER,
  SYRINGE_LADDER,
  type PriceLadder,
  type PriceRung,
} from './pricing';

export type NudgeKind = 'line' | 'drill' | 'mindset' | 'product' | 'question';

export interface Nudge {
  id: string;
  kind: NudgeKind;
  /** Notification title — max ~40 chars, punchy. */
  title: string;
  titleEs: string;
  /** Body — max ~110 chars. One idea. */
  body: string;
  bodyEs: string;
  /** Optional in-app route to deep-link to, e.g. '/flashcards' or '/cheat-sheets'. */
  route?: string;
}

// ── Prices, straight off the ladders ─────────────────────────────────────────

/** Read one authoritative rung out of pricing.ts. */
function rungOf(ladder: PriceLadder, id: string): PriceRung {
  const found = ladder.steps.find((step) => step.id === id);
  if (!found) throw new Error(`pricing.ts has no rung "${id}"`);
  return found;
}

const SYR_ANCHOR = SYRINGE_LADDER.europeAnchor;
const SYR_BASE = SYRINGE_LADDER.base;
const SYR_FLOOR = SYRINGE_LADDER.floor;
const SYR_PROMO = rungOf(SYRINGE_LADDER, 'promo').price;
const SYR_TWO = rungOf(SYRINGE_LADDER, 'second-free').price;
const SYR_NO_GIFT = rungOf(SYRINGE_LADDER, 'no-gift').price;
const SYR_VOUCHER = rungOf(SYRINGE_LADDER, 'voucher').price;

const PEEL_ANCHOR = PEELING_LADDER.europeAnchor;
const PEEL_BASE = PEELING_LADDER.base;
const PEEL_FLOOR = PEELING_LADDER.floor;
const PEEL_PROMO = rungOf(PEELING_LADDER, 'promo').price;
const PEEL_NO_SCRUB = rungOf(PEELING_LADDER, 'no-scrub').price;

const MIX_ANCHOR = MIX_MATCH_LADDER.europeAnchor;
const MIX_BASE = MIX_MATCH_LADDER.base;
const MIX_SINGLE = MIX_MATCH_LADDER.floor;

const MIX_TRIO_RUNG = rungOf(MIX_MATCH_LADDER, 'b2g1');
const MIX_TRIO = MIX_TRIO_RUNG.price;
const MIX_TRIO_UNITS = MIX_TRIO_RUNG.units ?? 1;
const MIX_TRIO_EACH = MIX_TRIO / MIX_TRIO_UNITS;

const MIX_DUO_RUNG = rungOf(MIX_MATCH_LADDER, 'b1g1');
const MIX_DUO = MIX_DUO_RUNG.price;
const MIX_DUO_UNITS = MIX_DUO_RUNG.units ?? 1;

// ── The nudges ───────────────────────────────────────────────────────────────

export const NUDGES: Nudge[] = [
  // ── line — a script line to have loaded before you need it ────────────────
  {
    id: 'line-expensive-syringe',
    kind: 'line',
    title: 'When she says "too expensive"',
    titleEs: 'Cuando te suelta "es muy caro"',
    body: `In Europe {currency}${SYR_ANCHOR}. In {locationName}, {currency}${SYR_BASE}. Today, 30% off — {currency}${SYR_PROMO}. Always that order.`,
    bodyEs: `En Europa {currency}${SYR_ANCHOR}. En {locationName}, {currency}${SYR_BASE}. Hoy, 30% menos — {currency}${SYR_PROMO}. Siempre ese orden.`,
    route: '/syringe',
  },
  {
    id: 'line-expensive-peeling',
    kind: 'line',
    title: 'Peeling price, in three beats',
    titleEs: 'El precio del peeling, en tres',
    body: `"In Europe {currency}${PEEL_ANCHOR}, in {locationName} {currency}${PEEL_BASE} — and today half of that, {currency}${PEEL_PROMO}, scrub free."`,
    bodyEs: `"En Europa {currency}${PEEL_ANCHOR}, en {locationName} {currency}${PEEL_BASE} — y hoy la mitad, {currency}${PEEL_PROMO}, con exfoliante."`,
    route: '/peeling',
  },
  {
    id: 'line-mix-trio',
    kind: 'line',
    title: 'The line that sells three',
    titleEs: 'La frase que vende tres',
    body: `"Take any 2, the third is free — {currency}${MIX_TRIO} for ${MIX_TRIO_UNITS}. That's {currency}${MIX_TRIO_EACH} each. Mix them how you like."`,
    bodyEs: `"Coges 2 y el tercero es gratis — {currency}${MIX_TRIO} por ${MIX_TRIO_UNITS}. Salen a {currency}${MIX_TRIO_EACH}. Los mezclas como quieras."`,
    route: '/cheat-sheets',
  },
  {
    id: 'line-just-looking',
    kind: 'line',
    title: 'For "I\'m just looking"',
    titleEs: 'Para "solo estoy mirando"',
    body: `"Looking is free! Give me 20 seconds — you don't have to buy, I just love the reaction."`,
    bodyEs: `"¡Mirar es gratis! Dame 20 segundos — no tienes que comprar, es que me encanta la reacción."`,
    route: '/cheat-sheets',
  },
  {
    // Parked her at the till for ten minutes, which is ten minutes to walk out.
    // She already gave you the two yeses, so there is one thing left: the price.
    id: 'line-think-about-it',
    kind: 'line',
    title: 'For "let me think about it"',
    titleEs: 'Para "déjame pensarlo"',
    body: `"Think about what, my love? You like it, you'd use it. So it's the price. Say it and watch me."`,
    bodyEs: `"¿Pensar el qué, cariño? Te gusta, lo usarías. Entonces es el precio. Dilo y verás lo que hago."`,
    route: '/cheat-sheets',
  },
  {
    // Asking what an absent partner would say hands him a vote he did not ask
    // for. Ladies' business — put the decision back in her hands, right here.
    id: 'line-ask-partner',
    kind: 'line',
    title: 'For "I have to ask my partner"',
    titleEs: 'Para "tengo que preguntarle"',
    body: `"Ladies' business, my love. He's playing golf — he isn't thinking about your face. Your call."`,
    bodyEs: `"Cosa de mujeres, cariño. Él está con el golf — no piensa en tu cara. Es cosa tuya, no suya."`,
    route: '/cheat-sheets',
  },
  {
    id: 'line-two-choice-syringe',
    kind: 'line',
    title: 'Two doors, never one',
    titleEs: 'Dos puertas, nunca una',
    body: `"One syringe at {currency}${SYR_BASE}, or two at {currency}${SYR_TWO} with the second free?" Ask, then say nothing.`,
    bodyEs: `"¿Una jeringa a {currency}${SYR_BASE}, o dos a {currency}${SYR_TWO} con la segunda gratis?" Lo sueltas y te callas.`,
    route: '/syringe',
  },
  {
    id: 'line-amazon',
    kind: 'line',
    title: 'For "it\'s cheaper on Amazon"',
    titleEs: 'Para "en Amazon está más barato"',
    body: `"Probably! But online you can't try it. Feel this — and watch what it does on your own skin."`,
    bodyEs: `"¡Seguro que sí! Pero por internet no lo pruebas. Toca esto — y mira qué hace en tu piel."`,
    route: '/cheat-sheets',
  },
  {
    id: 'line-opener-curiosity',
    kind: 'line',
    title: 'An opener that never dies',
    titleEs: 'Un gancho que nunca falla',
    body: `"Can I show you something? Thirty seconds, and you'll see the difference yourself."`,
    bodyEs: `"¿Te enseño una cosa? Treinta segundos y la diferencia la ves tú."`,
    route: '/cheat-sheets',
  },
  {
    id: 'line-partner-in',
    kind: 'line',
    title: 'Never leave the partner out',
    titleEs: 'Nunca dejes fuera a la pareja',
    body: `"And you — you're going to love how this looks on her. Want to see it too?"`,
    bodyEs: `"Y tú — te va a encantar cómo le queda. ¿Lo quieres ver tú también?"`,
    route: '/cheat-sheets',
  },
  {
    id: 'line-peeling-not-a-cream',
    kind: 'line',
    title: 'Kill the "another cream" idea',
    titleEs: 'Mata la idea de "otra crema"',
    body: `"This isn't an anti-ageing cream. It lifts the dead skin off the living skin underneath."`,
    bodyEs: `"Esto no es una crema antiedad. Separa la piel muerta de la piel viva de debajo."`,
    route: '/peeling',
  },
  {
    id: 'line-voucher-close',
    kind: 'line',
    title: 'The voucher, said properly',
    titleEs: 'El cupón, dicho como toca',
    body: `Drop your voice: "I've got a 20% voucher — that takes {currency}${SYR_NO_GIFT} down to {currency}${SYR_VOUCHER}."`,
    bodyEs: `Baja la voz: "Tengo un cupón del 20% — eso deja los {currency}${SYR_NO_GIFT} en {currency}${SYR_VOUCHER}."`,
    route: '/syringe',
  },

  // ── drill — a 20-second rep, done standing up ─────────────────────────────
  {
    id: 'drill-opener-aloud',
    kind: 'drill',
    title: 'Say your opener out loud',
    titleEs: 'Di tu gancho en voz alta',
    body: `Your syringe opener. Out loud, twice, right now. If it stumbles, it isn't ready yet.`,
    bodyEs: `Tu gancho de la jeringa. En voz alta, dos veces, ya. Si tropiezas, aún no lo tienes.`,
    route: '/syringe',
  },
  {
    id: 'drill-ladder-syringe',
    kind: 'drill',
    title: 'Ladder check: syringe',
    titleEs: 'Repaso de escalera: jeringa',
    body: `Without looking: {currency}${SYR_ANCHOR}, {currency}${SYR_BASE}, {currency}${SYR_PROMO}, {currency}${SYR_NO_GIFT}, {currency}${SYR_VOUCHER}, {currency}${SYR_FLOOR}. All six.`,
    bodyEs: `Sin mirar: {currency}${SYR_ANCHOR}, {currency}${SYR_BASE}, {currency}${SYR_PROMO}, {currency}${SYR_NO_GIFT}, {currency}${SYR_VOUCHER}, {currency}${SYR_FLOOR}. Los seis seguidos.`,
    route: '/syringe',
  },
  {
    id: 'drill-ladder-peeling',
    kind: 'drill',
    title: 'Ladder check: peeling',
    titleEs: 'Repaso de escalera: peeling',
    body: `{currency}${PEEL_ANCHOR}, {currency}${PEEL_BASE}, {currency}${PEEL_PROMO}, {currency}${PEEL_NO_SCRUB}, {currency}${PEEL_FLOOR}. One step at a time — never jump two.`,
    bodyEs: `{currency}${PEEL_ANCHOR}, {currency}${PEEL_BASE}, {currency}${PEEL_PROMO}, {currency}${PEEL_NO_SCRUB}, {currency}${PEEL_FLOOR}. Un peldaño cada vez — nunca dos.`,
    route: '/peeling',
  },
  {
    id: 'drill-ladder-mix',
    kind: 'drill',
    title: 'Ladder check: mix & match',
    titleEs: 'Repaso: mezcla y combina',
    body: `{currency}${MIX_ANCHOR} in Europe, {currency}${MIX_BASE} here, {currency}${MIX_TRIO} for ${MIX_TRIO_UNITS}, {currency}${MIX_DUO} for ${MIX_DUO_UNITS}, {currency}${MIX_SINGLE} alone.`,
    bodyEs: `{currency}${MIX_ANCHOR} en Europa, {currency}${MIX_BASE} aquí, {currency}${MIX_TRIO} por ${MIX_TRIO_UNITS}, {currency}${MIX_DUO} por ${MIX_DUO_UNITS}, {currency}${MIX_SINGLE} suelto.`,
    route: '/cheat-sheets',
  },
  {
    id: 'drill-three-objections',
    kind: 'drill',
    title: 'Three objections, sixty seconds',
    titleEs: 'Tres objeciones, un minuto',
    body: `Name three objections you heard today, and the line that answers each one. Go.`,
    bodyEs: `Nombra tres objeciones que has oído hoy y la frase que responde a cada una. Venga.`,
    route: '/flashcards',
  },
  {
    id: 'drill-mirror-handover',
    kind: 'drill',
    title: 'Rehearse the mirror moment',
    titleEs: 'Ensaya el momento del espejo',
    body: `"Promise not to scream?" — then hand her the mirror. Say it once so it lands naturally.`,
    bodyEs: `"¿Prometes no gritar?" — y le das el espejo. Dilo una vez para que salga natural.`,
    route: '/syringe',
  },
  {
    id: 'drill-silence',
    kind: 'drill',
    title: 'Practise the silence',
    titleEs: 'Practica el silencio',
    body: `Ask your closing question, then count to five in your head. Whoever speaks first loses.`,
    bodyEs: `Haz tu pregunta de cierre y cuenta hasta cinco por dentro. El que habla primero, pierde.`,
    route: '/exercises',
  },
  {
    id: 'drill-five-cards',
    kind: 'drill',
    title: 'Five cards, that\'s all',
    titleEs: 'Cinco tarjetas, nada más',
    body: `Five flashcards. Sixty seconds. You go back out sharper than you came in.`,
    bodyEs: `Cinco tarjetas. Sesenta segundos. Vuelves a la calle con más filo que hace un minuto.`,
    route: '/flashcards',
  },
  {
    id: 'drill-gift-options',
    kind: 'drill',
    title: 'Name the gifts, no pausing',
    titleEs: 'Di los regalos, sin pensar',
    body: `Which gifts come with the syringe offer? Say all three out loud. Paused? Open the sheet.`,
    bodyEs: `¿Qué regalos van con la oferta de la jeringa? Di los tres. ¿Has dudado? Abre la chuleta.`,
    route: '/cheat-sheets',
  },
  {
    id: 'drill-one-quiz',
    kind: 'drill',
    title: 'One quiz, then back out',
    titleEs: 'Un test y de vuelta fuera',
    body: `Three questions, that's it. Little and often beats the long session you never do.`,
    bodyEs: `Tres preguntas y ya. Poco y a menudo gana a la sesión larga que nunca haces.`,
    route: '/quizzes',
  },
  {
    id: 'drill-dead-patch',
    kind: 'drill',
    title: 'Dead patch? Use it',
    titleEs: '¿Rato muerto? Aprovecha',
    body: `Nothing moving out there? One short lesson beats ten more minutes on your phone.`,
    bodyEs: `¿No se mueve nada? Una lección corta gana a diez minutos más mirando el móvil.`,
    route: '/training',
  },

  // ── mindset — for the bad run, the flat hour, the head ────────────────────
  {
    id: 'mind-no-is-one-person',
    kind: 'mindset',
    title: 'A no is one person',
    titleEs: 'Un no es una persona',
    body: `One no is one person on one afternoon. It's not a verdict on you. Next face, clean slate.`,
    bodyEs: `Un no es una persona en una tarde. No es un veredicto sobre ti. Otra cara, y de cero.`,
  },
  {
    id: 'mind-most-say-no',
    kind: 'mindset',
    title: 'Most people will say no',
    titleEs: 'La mayoría va a decir que no',
    body: `That's the job, not a judgement. You're out here hunting the few who say yes.`,
    bodyEs: `Es el trabajo, no un juicio. Tú estás aquí a por los pocos que dicen que sí.`,
  },
  {
    id: 'mind-three-in-a-row',
    kind: 'mindset',
    title: 'Three no\'s in a row?',
    titleEs: '¿Tres noes seguidos?',
    body: `Walk to the end of the kiosk and back. New air, new face, new tone. Then start again.`,
    bodyEs: `Date una vuelta hasta el final y vuelve. Aire nuevo, cara nueva, tono nuevo. Y otra vez.`,
  },
  {
    id: 'mind-dont-count-theirs',
    kind: 'mindset',
    title: 'Stop counting their sales',
    titleEs: 'Deja de contar sus ventas',
    body: `Someone else's number is not your business today. Count your own next approach instead.`,
    bodyEs: `El número de otro no es asunto tuyo hoy. Cuenta tu próximo acercamiento y ya está.`,
  },
  {
    id: 'mind-dead-hour',
    kind: 'mindset',
    title: 'A dead hour isn\'t a dead day',
    titleEs: 'Una hora muerta no es el día',
    body: `Quiet stretch? The person who buys today simply hasn't walked past you yet.`,
    bodyEs: `¿Racha floja? Quien compra hoy todavía no ha pasado por delante. Ojo y a seguir.`,
  },
  {
    id: 'mind-not-interrupting',
    kind: 'mindset',
    title: 'You\'re not interrupting anyone',
    titleEs: 'No estás molestando a nadie',
    body: `You're the most interesting thing that will happen to them all afternoon. Act like it.`,
    bodyEs: `Eres lo más interesante que les va a pasar en toda la tarde. Compórtate como tal.`,
  },
  {
    id: 'mind-last-hour',
    kind: 'mindset',
    title: 'The last hour decides it',
    titleEs: 'La última hora lo decide',
    body: `Everyone else switched off twenty minutes ago. That's exactly why the last hour pays.`,
    bodyEs: `Los demás desconectaron hace veinte minutos. Por eso la última hora es la que paga.`,
  },
  {
    id: 'mind-nerves',
    kind: 'mindset',
    title: 'Nervous just means you care',
    titleEs: 'Los nervios son buena señal',
    body: `Shake your hands out, breathe out longer than you breathe in, and go anyway.`,
    bodyEs: `Sacude las manos, suelta el aire más largo de lo que lo coges, y ve igualmente.`,
  },
  {
    id: 'mind-not-personal',
    kind: 'mindset',
    title: 'It was never about you',
    titleEs: 'Nunca ha ido por ti',
    body: `They're not rejecting you. They're protecting their wallet. Two very different things.`,
    bodyEs: `No te rechazan a ti. Están protegiendo su cartera. Son dos cosas muy distintas.`,
  },
  {
    id: 'mind-something-real',
    kind: 'mindset',
    title: 'You sold something real',
    titleEs: 'Has vendido algo de verdad',
    body: `Someone will use what you sold them every week for months. That's a decent day's work.`,
    bodyEs: `Alguien va a usar lo que le vendiste cada semana durante meses. No está nada mal.`,
  },

  // ── product — one concrete fact or demo cue ───────────────────────────────
  {
    id: 'prod-syringe-one-eye',
    kind: 'product',
    title: 'One eye. Only one.',
    titleEs: 'Un ojo. Solo uno.',
    body: `Do one eye, then hand her the mirror. Let her find the difference — don't point at it.`,
    bodyEs: `Haz un ojo y dale el espejo. Que encuentre ella la diferencia — no se la señales.`,
    route: '/syringe',
  },
  {
    id: 'prod-syringe-usage',
    kind: 'product',
    title: 'The syringe, in one breath',
    titleEs: 'La jeringa, de un tirón',
    body: `Once a week. One syringe covers a year of treatments. No touching the area for five hours.`,
    bodyEs: `Una vez por semana. Una jeringa da para un año. Y sin tocar la zona durante cinco horas.`,
    route: '/syringe',
  },
  {
    id: 'prod-syringe-second-areas',
    kind: 'product',
    title: 'What the second syringe is for',
    titleEs: 'Para qué es la segunda jeringa',
    body: `Two at {currency}${SYR_TWO} covers both eyes, forehead, upper lip and frown lines. Name the areas.`,
    bodyEs: `Dos a {currency}${SYR_TWO} cubren los dos ojos, frente, labio y entrecejo. Nombra las zonas.`,
    route: '/syringe',
  },
  {
    id: 'prod-peeling-roll',
    kind: 'product',
    title: 'Roll it, don\'t rub it',
    titleEs: 'Enróllalo, no lo frotes',
    body: `On the back of the hand, roll gently. The little grey bits coming off ARE the demo.`,
    bodyEs: `En el dorso de la mano, enrolla suave. Las bolitas grises que salen SON la demo.`,
    route: '/peeling',
  },
  {
    id: 'prod-peeling-year',
    kind: 'product',
    title: 'Say this before the price',
    titleEs: 'Di esto antes del precio',
    body: `One bottle is a full year of weekly treatments. Value first, number second. Always.`,
    bodyEs: `Un frasco es un año entero de tratamientos semanales. Primero el valor, luego el número.`,
    route: '/peeling',
  },
  {
    id: 'prod-peeling-scrub-credit',
    kind: 'product',
    title: 'She doesn\'t want the scrub?',
    titleEs: '¿No quiere el exfoliante?',
    body: `Take it back as credit — the scrub is {currency}${MIX_SINGLE}, so the peeling lands at {currency}${PEEL_NO_SCRUB}.`,
    bodyEs: `Se lo descuentas como crédito — el exfoliante son {currency}${MIX_SINGLE}, así el peeling queda en {currency}${PEEL_NO_SCRUB}.`,
    route: '/peeling',
  },
  {
    id: 'prod-scrub-water',
    kind: 'product',
    title: 'Add the water slowly',
    titleEs: 'Echa el agua despacio',
    body: `Salts on the back of the hand, then water, slowly, while they rub. That's when they smile.`,
    bodyEs: `Sales en el dorso de la mano y luego agua, despacio, mientras frotan. Ahí sonríen.`,
    route: '/scrub',
  },
  {
    id: 'prod-butter-flip',
    kind: 'product',
    title: 'Flip the jar upside down',
    titleEs: 'Dale la vuelta al bote',
    body: `Nothing falls out. That one move sells the body butter better than any sentence you own.`,
    bodyEs: `No cae nada. Ese gesto vende la manteca corporal mejor que cualquier frase tuya.`,
    route: '/scrub',
  },
  {
    id: 'prod-scrub-teaspoon',
    kind: 'product',
    title: 'A teaspoon does the body',
    titleEs: 'Una cucharadita, todo el cuerpo',
    body: `One teaspoon covers the whole body. A jar lasts 8 to 12 months. There's your value line.`,
    bodyEs: `Una cucharadita para todo el cuerpo. Un bote dura de 8 a 12 meses. Ahí está el valor.`,
    route: '/scrub',
  },
  {
    id: 'prod-nailkit-order',
    kind: 'product',
    title: 'Grey, white, then the shine',
    titleEs: 'Gris, blanco y luego el brillo',
    body: `Three sides, sixty seconds. Never say a price before she's seen her nail in the mirror.`,
    bodyEs: `Tres lados, sesenta segundos. Ni un precio antes de que vea la uña en el espejo.`,
    route: '/nail-kit',
  },
  {
    id: 'prod-nailkit-shine',
    kind: 'product',
    title: 'Two weeks, zero polish',
    titleEs: 'Dos semanas, cero esmalte',
    body: `The shine holds around two weeks with no polish at all. Fast demo, high energy, big reaction.`,
    bodyEs: `El brillo aguanta unas dos semanas sin nada de esmalte. Demo rápida y energía alta.`,
    route: '/nail-kit',
  },
  {
    id: 'prod-nailkit-warranty',
    kind: 'product',
    title: 'Even if the dog eats it',
    titleEs: 'Aunque se lo coma el perro',
    body: `Lifetime warranty on the kit. It makes them laugh and it kills the risk. Use it every time.`,
    bodyEs: `Garantía de por vida en el kit. Se ríen y se les quita el miedo. Úsalo siempre.`,
    route: '/nail-kit',
  },
  {
    id: 'prod-mix-family',
    kind: 'product',
    title: 'Three products, one ladder',
    titleEs: 'Tres productos, una escalera',
    body: `Scrub, body butter and nail kit share a ladder. Any ${MIX_TRIO_UNITS}, mixed freely, is {currency}${MIX_TRIO}.`,
    bodyEs: `Exfoliante, manteca y kit de uñas comparten escalera. ${MIX_TRIO_UNITS} cualesquiera, {currency}${MIX_TRIO}.`,
    route: '/cheat-sheets',
  },

  // ── question — one line to think about, no answer required ────────────────
  {
    id: 'q-what-worked',
    kind: 'question',
    title: 'What worked last time?',
    titleEs: '¿Qué te funcionó la última vez?',
    body: `Think of your last sale. What exactly did you say? Do that again on the next one.`,
    bodyEs: `Piensa en tu última venta. ¿Qué dijiste exactamente? Repítelo en la siguiente.`,
  },
  {
    id: 'q-costly-objection',
    kind: 'question',
    title: 'Which objection cost you today?',
    titleEs: '¿Qué objeción te ha costado hoy?',
    body: `Pick the one that beat you most often. Look up its line before your next approach.`,
    bodyEs: `Elige la que más te ha ganado hoy. Búscate la frase antes del próximo acercamiento.`,
    route: '/flashcards',
  },
  {
    id: 'q-spoken-to',
    kind: 'question',
    title: 'How many have you spoken to?',
    titleEs: '¿Con cuántos has hablado?',
    body: `Not walked past — actually spoken to. In the last hour. Be honest with the number.`,
    bodyEs: `Hablado de verdad, no pasar de largo. En la última hora. Sé honesto con el número.`,
  },
  {
    id: 'q-asked-for-sale',
    kind: 'question',
    title: 'When did you last ask?',
    titleEs: '¿Cuándo lo pediste de verdad?',
    body: `Not hinted at it. Not hoped for it. Asked for the sale, out loud, in actual words.`,
    bodyEs: `No insinuarlo. No esperarlo. Pedir la venta, en voz alta y con palabras.`,
  },
  {
    id: 'q-talking-or-demoing',
    kind: 'question',
    title: 'Talking, or demoing?',
    titleEs: '¿Hablas o demuestras?',
    body: `The demo does the selling. Your mouth just gets their hand onto the counter.`,
    bodyEs: `La demo es la que vende. Tu boca solo pone su mano encima del mostrador.`,
  },
  {
    id: 'q-energy-score',
    kind: 'question',
    title: 'Energy, out of five?',
    titleEs: 'Tu energía, ¿del uno al cinco?',
    body: `Score yourself honestly right now. Under three? Fix that before you approach anyone.`,
    bodyEs: `Puntúate con sinceridad ahora mismo. ¿Menos de tres? Arréglalo antes de abordar a nadie.`,
  },
  {
    id: 'q-ladder-jump',
    kind: 'question',
    title: 'Did you walk it, or jump?',
    titleEs: '¿Bajaste o te tiraste?',
    body: `Last negotiation — one rung at a time, or straight to the bottom? Jumping costs you money.`,
    bodyEs: `En la última negociación, ¿un peldaño cada vez o directo al suelo? Saltar te cuesta dinero.`,
    route: '/cheat-sheets',
  },
  {
    id: 'q-who-got-away',
    kind: 'question',
    title: 'Who got away today?',
    titleEs: '¿Quién se te ha escapado hoy?',
    body: `Picture the one you nearly had. What would you say to them differently right now?`,
    bodyEs: `Piensa en el que casi tenías. ¿Qué le dirías ahora mismo que no le dijiste?`,
  },
];

// ── Picking ──────────────────────────────────────────────────────────────────

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * A step size coprime with the list length, so walking the seeds 0, 1, 2 … visits
 * every nudge exactly once before any of them comes round again. Roughly the
 * golden-ratio fraction of the list, which keeps consecutive picks far apart —
 * two slots in the same shift never land on neighbouring nudges.
 */
const STRIDE = (() => {
  const n = NUDGES.length;
  for (let step = Math.floor(n * 0.618); step > 1; step--) {
    if (gcd(step, n) === 1) return step;
  }
  return 1;
})();

/** Deterministic pick so the same slot in a day doesn't repeat a nudge. */
export function pickNudge(seed: number): Nudge {
  const n = NUDGES.length;
  const whole = Number.isFinite(seed) ? Math.trunc(seed) : 0;
  // Reduce first, so a large seed can never overflow the multiply.
  const slot = ((whole % n) + n) % n;
  return NUDGES[(slot * STRIDE) % n];
}

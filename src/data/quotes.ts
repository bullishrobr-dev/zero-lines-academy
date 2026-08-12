// ─────────────────────────────────────────────────────────────────────────────
// quotes.ts — the line at the bottom of the home screen.
//
// ── WHY THIS FILE IS HALF THE SIZE IT WAS ───────────────────────────────────
// It held 110 quotes. Fifty-six of them were borrowed from Zig Ziglar, Brian
// Tracy, Patricia Fripp, Roosevelt, Gretzky, Disney and the general internet,
// and a good number taught the OPPOSITE of the way this shop sells:
//
//   "You don't close a sale; you open a relationship."
//   "Stop selling. Start helping."
//   "A satisfied customer is the best business strategy of all."
//
// That is advice for someone with a pipeline and a second meeting. Our seller
// has a tourist who walked past a kiosk once, will never walk past it again,
// and is standing in front of them RIGHT NOW. A relationship is not on offer;
// the sale is the whole event. Telling a seller otherwise on the screen they
// open before a shift is not neutral — it is coaching against the method they
// are about to be measured on.
//
// The rest were generic motivation with no floor in them at all ("you miss 100%
// of the shots you don't take"), which a seller has read a hundred times and
// reads past.
//
// What is left is the 54 written in the owner's voice, attributed "Zero Lines".
// They are about this job: the stop, the demo, the ladder, the next one after a
// no. Fewer quotes, all of them ours.
//
// Words attributed to a real person are never rewritten here — a quote is
// either theirs and accurate, or it is not in the file. Deleting was the only
// honest option for the borrowed ones.
//
// Every quote carries its European-Spanish twin (informal "tú").
// ─────────────────────────────────────────────────────────────────────────────

export interface Quote {
  id: string;
  text: string;
  textEs: string; // European Spanish translation
  author: string;
}

// ── Confidence & Self-Belief (6) ──
const confidenceQuotes: Quote[] = [
  {
    id: 'conf-10',
    text: 'Own the room. Not because you\'re the loudest, but because you\'re the most prepared.',
    textEs: 'Domina la sala. No porque seas el más ruidoso, sino porque eres el más preparado.',
    author: 'Zero Lines',
  },
  {
    id: 'conf-11',
    text: 'Your energy introduces you before you even speak. Make it count.',
    textEs: 'Tu energía te presenta antes de que abras la boca. Haz que cuente.',
    author: 'Zero Lines',
  },
  {
    id: 'conf-12',
    text: 'You were not hired to be average. You were hired to be exceptional.',
    textEs: 'No te contrataron para ser mediocre. Te contrataron para ser excepcional.',
    author: 'Zero Lines',
  },
  {
    id: 'conf-13',
    text: 'If you don\'t believe in yourself, why should anyone else?',
    textEs: 'Si tú no crees en ti mismo, ¿por qué debería hacerlo alguien más?',
    author: 'Zero Lines',
  },
  {
    id: 'conf-14',
    text: 'Confidence comes from competence. Competence comes from repetition.',
    textEs: 'La confianza viene de la competencia. La competencia viene de la repetición.',
    author: 'Zero Lines',
  },
  {
    id: 'conf-15',
    text: 'Walk in like you own the place. Because today, you do.',
    textEs: 'Entra como si el local fuera tuyo. Porque hoy, lo es.',
    author: 'Zero Lines',
  },
];

// ── Action & Taking Initiative (8) ──
const actionQuotes: Quote[] = [
  {
    id: 'act-7',
    text: 'Stop preparing. Start doing. The customer is walking past you right now.',
    textEs: 'Deja de prepararte. Empieza a actuar. El cliente está pasando ahora mismo.',
    author: 'Zero Lines',
  },
  {
    id: 'act-8',
    text: 'Every second you hesitate, someone else is making the sale you could have made.',
    textEs: 'Cada segundo que dudas, alguien más está haciendo la venta que tú podrías haber hecho.',
    author: 'Zero Lines',
  },
  {
    id: 'act-9',
    text: 'The 3-second rule isn\'t a suggestion. It\'s the difference between average and extraordinary.',
    textEs: 'La regla de los 3 segundos no es una sugerencia. Es la diferencia entre lo mediocre y lo extraordinario.',
    author: 'Zero Lines',
  },
  {
    id: 'act-10',
    text: 'Today, not tomorrow. Now, not later. Go.',
    textEs: 'Hoy, no mañana. Ahora, no después. Vamos.',
    author: 'Zero Lines',
  },
  {
    id: 'act-12',
    text: 'The customer who just walked in doesn\'t care about your mood. They care about what you can show them.',
    textEs: 'Al cliente que acaba de entrar no le importa tu humor. Le importa lo que puedas mostrarle.',
    author: 'Zero Lines',
  },
  {
    id: 'act-14',
    text: 'One stop today is worth ten plans for tomorrow.',
    textEs: 'Una parada hoy vale más que diez planes para mañana.',
    author: 'Zero Lines',
  },
  {
    id: 'act-15',
    text: 'The floor is your stage. Step onto it.',
    textEs: 'La tienda es tu escenario. Súbete a él.',
    author: 'Zero Lines',
  },
  /* Added with the first-day track rewrite. Every other quote in this file is
     about the demo, the ladder or the close — none of which a seller touches
     for two weeks. This is the one that speaks to the person who is only
     stopping, and it is true for everyone else on the floor as well. */
  {
    id: 'act-16',
    text: 'Nothing in this shop happens until somebody gets stopped. That somebody is you.',
    textEs: 'En esta tienda no pasa nada hasta que alguien para a alguien. Ese alguien eres tú.',
    author: 'Zero Lines',
  },
];

// ── Resilience & Persistence (7) ──
const resilienceQuotes: Quote[] = [
  {
    id: 'res-8',
    text: 'A bad day on the floor is better than your best day at your old job. Learn from it.',
    textEs: 'Un mal día en la tienda es mejor que tu mejor día en tu antiguo trabajo. Aprende de ello.',
    author: 'Zero Lines',
  },
  /* Was 'Every "no" is one step closer to "yes."' — the numbers-game comfort,
     unconditional, on the screen a seller opens BEFORE a shift. That is the one
     direction CLAUDE.md says it must never run in: said beforehand it is not
     perspective, it is an excuse, and it absolves the seller who rushed. The
     absolution is real but it is conditional, so the condition travels with it. */
  {
    id: 'res-9',
    text: 'A no after you gave everything is part of the game. A no because you rushed is a customer you gave away.',
    textEs: 'Un no después de darlo todo es parte del juego. Un no por ir con prisa es un cliente que has regalado.',
    author: 'Zero Lines',
  },
  {
    id: 'res-10',
    text: 'The salesperson who got rejected ten times and showed up for number eleven is the one who wins.',
    textEs: 'El vendedor al que rechazaron diez veces y volvió a por el número once es el que gana.',
    author: 'Zero Lines',
  },
  {
    id: 'res-11',
    text: 'Your worst day this month still taught you something your best day last month didn\'t.',
    textEs: 'Tu peor día de este mes te enseñó algo que tu mejor día del mes pasado no te enseñó.',
    author: 'Zero Lines',
  },
  {
    id: 'res-12',
    text: 'Diamonds are made under pressure. So are top sellers.',
    textEs: 'Los diamantes se forman bajo presión. Los mejores vendedores también.',
    author: 'Zero Lines',
  },
  {
    id: 'res-13',
    text: 'Rejection is redirection. Learn the lesson, adjust, and go again.',
    textEs: 'El rechazo es una redirección. Aprende la lección, ajusta y vuelve a intentarlo.',
    author: 'Zero Lines',
  },
  {
    id: 'res-15',
    text: 'Grit is the fuel. Talent is just the vehicle.',
    textEs: 'La determinación es el combustible. El talento es solo el vehículo.',
    author: 'Zero Lines',
  },
];

// ── Sales-Specific Motivation (8) ──
const salesQuotes: Quote[] = [
  /* Was "The best salespeople are problem solvers, not product pushers." — the
     exact family this file was cleaned out for. Nobody in a shopping centre has
     a problem we solve; she walked past a kiosk. "We're not scientists, we're
     hustlers" is the register, and a quote that coaches the opposite on the
     screen a seller opens before a shift is coaching against the method. */
  {
    id: 'sale-4',
    text: 'Nobody in this centre woke up needing what you sell. Your job is to make them want it before they walk out.',
    textEs: 'Nadie en este centro se ha levantado hoy necesitando lo que vendes. Tu trabajo es que lo quieran antes de que salgan por la puerta.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-5',
    text: 'Your product is the answer to a question the customer hasn\'t asked yet. Help them ask it.',
    textEs: 'Tu producto es la respuesta a una pregunta que el cliente aún no ha hecho. Ayúdale a hacerla.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-6',
    text: 'The demo is the sale. If they feel it, they buy it.',
    textEs: 'La demostración es la venta. Si lo sienten, lo compran.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-10',
    text: 'The close doesn\'t happen at the counter. It happens in the connection.',
    textEs: 'El cierre no ocurre en el mostrador. Ocurre en la conexión.',
    author: 'Zero Lines',
  },
  /* Was "…a report card on how many people you helped today." A shift is
     measured on what got sold, not on how many people you were nice to. */
  {
    id: 'sale-11',
    text: 'Your commission is the scoreboard. It counts what you sold, not how busy you looked.',
    textEs: 'Tu comisión es el marcador. Cuenta lo que has vendido, no lo ocupado que parecías.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-12',
    text: 'If you\'re not making mistakes, you\'re not trying hard enough. Risk the stop. Risk the demo. Risk the close.',
    textEs: 'Si no estás cometiendo errores, no te estás esforzando lo suficiente. Arriésgate a parar. Arriésgate a la demo. Arriésgate a cerrar.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-14',
    text: 'Stop waiting for the perfect customer. Every customer is perfect if you adapt.',
    textEs: 'Deja de esperar al cliente perfecto. Cada cliente es perfecto si te adaptas.',
    author: 'Zero Lines',
  },
  {
    id: 'sale-15',
    text: 'Your next customer has no idea about your last rejection. Give them your best energy.',
    textEs: 'Tu próximo cliente no tiene ni idea de tu último rechazo. Dale tu mejor energía.',
    author: 'Zero Lines',
  },
];

// ── Energy & Enthusiasm (5) ──
const energyQuotes: Quote[] = [
  {
    id: 'nrg-4',
    text: 'Your energy is contagious. Infect the whole floor.',
    textEs: 'Tu energía se contagia. Contágiala a toda la tienda.',
    author: 'Zero Lines',
  },
  {
    id: 'nrg-5',
    text: 'Smile. Stand tall. Speak with conviction. That\'s half the sale.',
    textEs: 'Sonríe. Mantente erguido. Habla con convicción. Eso es la mitad de la venta.',
    author: 'Zero Lines',
  },
  {
    id: 'nrg-6',
    text: 'If you\'re not excited about what you\'re selling, why should the customer be?',
    textEs: 'Si tú no estás emocionado por lo que vendes, ¿por qué debería estarlo el cliente?',
    author: 'Zero Lines',
  },
  {
    id: 'nrg-8',
    text: 'Bring the fire. Every shift. Every stop. Every time.',
    textEs: 'Trae el fuego. Cada turno. Cada parada. Cada vez.',
    author: 'Zero Lines',
  },
  {
    id: 'nrg-9',
    text: 'Your vibe attracts your tribe. Be magnetic.',
    textEs: 'Tu energía atrae a tu gente. Sé magnético.',
    author: 'Zero Lines',
  },
];

// ── Rejection & Overcoming Fear (5) ──
const rejectionQuotes: Quote[] = [
  {
    id: 'rej-6',
    text: '"No" is just a word. It has no power over you unless you give it power.',
    textEs: '"No" es solo una palabra. No tiene poder sobre ti a menos que se lo des.',
    author: 'Zero Lines',
  },
  {
    id: 'rej-7',
    text: 'The customer said no to the product, not to you. Separate yourself. Try again.',
    textEs: 'El cliente dijo no al producto, no a ti. Sepárate. Inténtalo de nuevo.',
    author: 'Zero Lines',
  },
  {
    id: 'rej-8',
    text: 'Fear of rejection is temporary. Regret of never trying is permanent.',
    textEs: 'El miedo al rechazo es temporal. El arrepentimiento de nunca haberlo intentado es permanente.',
    author: 'Zero Lines',
  },
  {
    id: 'rej-9',
    text: 'Every top earner has a graveyard of "no"s behind them. That\'s how you know they\'re warriors.',
    textEs: 'Todo gran vendedor lleva detrás un cementerio de "noes". Así es como sabes que es un guerrero.',
    author: 'Zero Lines',
  },
  {
    id: 'rej-10',
    text: 'The worst they can say is no. The best they can say changes your whole day. Risk it.',
    textEs: 'Lo peor que pueden decir es no. Lo mejor que pueden decir te cambia el día entero. Arriésgate.',
    author: 'Zero Lines',
  },
];

// ── Success & Achievement (4) ──
const successQuotes: Quote[] = [
  /* Was "Your income is directly proportional to the number of people you
     help…" — a made-up statistic wearing a maths word, and the helping frame
     again. Same two things, no arithmetic. */
  {
    id: 'suc-6',
    text: 'What you take home comes from two things: how many you stopped, and how hard you worked each one.',
    textEs: 'Lo que te llevas a casa sale de dos cosas: a cuánta gente paraste y cuánto trabajaste a cada una.',
    author: 'Zero Lines',
  },
  {
    id: 'suc-8',
    text: 'Small daily improvements are the key to staggering long-term results.',
    textEs: 'Pequeñas mejoras diarias son la clave para resultados a largo plazo asombrosos.',
    author: 'Zero Lines',
  },
  {
    id: 'suc-9',
    text: 'The gap between average and extraordinary is narrower than you think. Cross it today.',
    textEs: 'La brecha entre lo mediocre y lo extraordinario es más estrecha de lo que crees. Crúzala hoy.',
    author: 'Zero Lines',
  },
  {
    id: 'suc-10',
    text: 'Your best month ever started with one decision: to give today everything you have.',
    textEs: 'Tu mejor mes comenzó con una decisión: dar hoy todo lo que tienes.',
    author: 'Zero Lines',
  },
];

// ── Morning & Mindset Starters (8) ──
const morningQuotes: Quote[] = [
  {
    id: 'mor-1',
    text: 'Today is a new day. Even if you were terrible yesterday, today you can be great.',
    textEs: 'Hoy es un día nuevo. Aunque ayer lo hicieras fatal, hoy puedes ser grande.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-2',
    text: 'The morning sets the tone. Choose energy. Choose optimism. Choose action.',
    textEs: 'La mañana marca el tono. Elige energía. Elige optimismo. Elige acción.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-3',
    text: 'Write down your goal for today. Now double it. That\'s your real target.',
    textEs: 'Escribe tu objetivo para hoy. Ahora dóblalo. Ese es tu objetivo de verdad.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-6',
    text: 'Your first stop of the day sets the rhythm. Make it bold. Make it count.',
    textEs: 'Tu primera parada del día marca el ritmo. Hazla audaz. Haz que cuente.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-7',
    text: 'The floor is waiting. Your customers are waiting. Your future self is waiting. Go get it.',
    textEs: 'La tienda te espera. Tus clientes te esperan. Tu yo del futuro te espera. Ve a por ello.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-8',
    text: 'One shift. One opportunity. Make it legendary.',
    textEs: 'Un turno. Una oportunidad. Hazlo legendario.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-9',
    text: 'Visualize your best demo. Now go make it real, ten times today.',
    textEs: 'Visualiza tu mejor demostración. Ahora ve y hazla realidad, diez veces hoy.',
    author: 'Zero Lines',
  },
  {
    id: 'mor-10',
    text: 'You don\'t need motivation. You need momentum. Start moving.',
    textEs: 'No necesitas motivación. Necesitas impulso. Empieza a moverte.',
    author: 'Zero Lines',
  },
];

// ── Closing the Sale (4) ──
const legendaryQuotes: Quote[] = [
  {
    id: 'leg-7',
    text: 'The secret of selling yourself is to have a product you truly believe in. And you, my friend, are that product.',
    textEs: 'El secreto para venderte a ti mismo es tener un producto en el que realmente creas. Y tú, amigo mío, eres ese producto.',
    author: 'Zero Lines',
  },
  {
    id: 'leg-8',
    text: 'Average salespeople sell features. Great salespeople sell outcomes. Legendary salespeople sell transformation.',
    textEs: 'Los vendedores mediocres venden características. Los grandes venden resultados. Los legendarios venden transformación.',
    author: 'Zero Lines',
  },
  /* "The number one reason…" was a ranking nobody counted. The line under it is
     true and stays; the invented league table does not. */
  {
    id: 'leg-9',
    text: 'People fail in this job because they care more about not being rejected than about making the sale.',
    textEs: 'La gente fracasa en este trabajo porque le importa más que no la rechacen que hacer la venta.',
    author: 'Zero Lines',
  },
  {
    id: 'leg-10',
    text: 'At the end of every shift, ask yourself: "Did I give it everything I had?" That\'s the only scoreboard that matters.',
    textEs: 'Al final de cada turno, pregúntate: "¿Le di todo lo que tenía?" Ese es el único marcador que importa.',
    author: 'Zero Lines',
  },
];

// ── Combine all quotes ──
export const quotes: Quote[] = [
  ...confidenceQuotes,
  ...actionQuotes,
  ...resilienceQuotes,
  ...salesQuotes,
  ...energyQuotes,
  ...rejectionQuotes,
  ...successQuotes,
  ...morningQuotes,
  ...legendaryQuotes,
];

// ── Helpers ──
export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getQuoteById(id: string): Quote | undefined {
  return quotes.find((q) => q.id === id);
}

export function getQuotesByAuthor(author: string): Quote[] {
  return quotes.filter((q) => q.author === author);
}

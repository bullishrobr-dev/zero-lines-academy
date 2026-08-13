// ─────────────────────────────────────────────────────────────
// Zero Lines Academy — Lesson Data Structure
// All lesson content lives here as structured data.
// UI components render dynamically from this file.
//
// Two categories live in sibling files purely for size — `scenarios` and
// `objections` are 20 lessons between them. They import `Lesson` as a TYPE
// only, so nothing here is a runtime cycle: `import type` is erased under
// verbatimModuleSyntax.
// ─────────────────────────────────────────────────────────────

import { scenarioLessons } from './scenarioLessons';
import { objectionLessons } from './objectionLessons';
import { closingLessons } from './closingLessons';
import { LESSON_QUIZZES } from './lessonQuizzes';
import { categories, getCategory, type Category } from './categories';
import { GREETING, THE_RUSH_AND_THE_QUESTION, CALL_THEM_IN } from './canonicalScripts';

export type SectionType =
  | 'header'
  | 'subheader'
  | 'paragraph'
  | 'quote'
  | 'tip'
  | 'keypoint'
  | 'script'
  | 'checklist'
  | 'bullets'
  | 'numbered'
  | 'divider'
  | 'comparison';

export interface ContentSection {
  type: SectionType;
  text?: string;
  textEs?: string;
  attribution?: string;
  attributionEs?: string;
  items?: string[];
  itemsEs?: string[];
  left?: { label: string; text: string };
  leftEs?: { label: string; text: string };
  right?: { label: string; text: string };
  rightEs?: { label: string; text: string };
}

export interface QuizQuestion {
  question: string;
  questionEs?: string;
  options: string[];
  optionsEs?: string[];
  correctIndex: number;
  explanation: string;
  explanationEs?: string;
}

export interface Lesson {
  id: string;
  categoryId: string;
  title: string;
  titleEs?: string;
  subtitle: string;
  subtitleEs?: string;
  duration: string; // e.g. "5 min"
  icon: string; // lucide-react icon name
  order: number;
  xpReward: number;
  sections: ContentSection[];
  /**
   * Optional, because LESSON_QUIZZES in lessonQuizzes.ts overlays this field
   * (see the merge loop at the bottom of this file). A lesson with an overlay
   * entry has no use for an inline quiz — anything written here is code the
   * app can never render, and it has cost real work twice now.
   *
   * A lesson with NEITHER an inline quiz nor an overlay entry would silently
   * offer no quiz at all, so check-quiz-integrity.mjs fails the build on that.
   */
  quiz?: QuizQuestion[];
}

/* Category and the categories array now live in ./categories, so that a screen
   wanting a category name does not pull in every lesson body in the app.
   Re-exported here because plenty of code already imports them from this
   module, and that is a reasonable place to look for them. */
export type { Category };
export { categories, getCategory };

// ── Categories ──


// ── Lessons ──
export const lessons: Record<string, Lesson> = {
  'connect-1': {
    id: 'connect-1',
    categoryId: 'connecting',
    title: 'The 15-Second Scan',
    titleEs: 'El Escaneo de 15 Segundos',
    subtitle: 'Read them before you open your mouth',
    subtitleEs: 'Léelos antes de abrir la boca',
    duration: '8 min',
    icon: 'Eye',
    order: 1,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'See Everything Before You Say Anything',
      textEs: 'Ve Todo Antes de Decir Nada',
    },
    {
            type: 'paragraph',
      text: 'The 15 seconds before you speak are worth more than the 15 minutes after. In that window, you gather the intelligence that shapes your entire approach. What you observe determines what you say, how you say it, and whether you\'ll close. Master salespeople don\'t just look at customers — they READ them.',
      textEs: 'Los 15 segundos antes de hablar valen más que los 15 minutos después. En esa ventana, recopilas la información que define todo tu enfoque. Lo que observas determina qué dices, cómo lo dices y si cerrarás la venta. Los vendedores expertos no solo miran a los clientes — los LEEN.',
    },
    {
            type: 'keypoint',
      text: 'Every detail is telling you something. The watch on their wrist, the bags in their hands, the person beside them, the speed they are walking. You are not building a file on anybody — you are working out which sentence to open with, and you have got about a second to do it.',
      textEs: 'Cada detalle te está diciendo algo. El reloj en la muñeca, las bolsas en las manos, la persona que va al lado, la velocidad a la que andan. No estás haciendo una ficha de nadie — estás decidiendo con qué frase abrir, y tienes como un segundo para hacerlo.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'What to Look At, in the Order Your Eyes Move',
      textEs: 'Qué Mirar, en el Orden en que se te Van los Ojos',
    },
    {
            type: 'paragraph',
      text: 'Five looks, a second each, before you say a word. SCAN is just how you remember them:',
      textEs: 'Cinco miradas, un segundo cada una, antes de decir nada. SCAN es solo la forma de acordarte:',
    },
    {
            type: 'bullets',
      items: [
        'S — STYLE: Shoes and coat tell you more than the face does. Good shoes, good coat, that is the money. Hiking boots and a rucksack is a different conversation, not a worse one — just a faster, funnier one.',
        'C — CARRY: Bags in their hands means they are already spending today and somebody already got a yes out of them this morning. That is the easiest customer alive. No bags at all means the day has not started yet — perfect timing.',
        'A — ACCESSORIES: Watch, rings, sunglasses, handbag. People spend on what they care about. Somebody wearing a serious watch cares how they look, and that is the whole pitch handed to you.',
        'N — NETWORK: Who is with them tells you who you actually have to win. On their own, they decide fast. In a couple, the other one can kill it with one word — get them in early. In a group of six, they sell each other and you barely have to talk.',
        'P — PACE & POSTURE: How fast they are walking tells you how good your first line has to be. Strolling and looking around, almost anything works. Marching with somewhere to be, you get one sentence and it had better be a good one.'
      ],
      itemsEs: [
          'S — STYLE (ESTILO): Los zapatos y el abrigo te dicen más que la cara. Buenos zapatos, buen abrigo: ahí está el dinero. Botas de montaña y mochila es otra conversación, no peor — solo más rápida y más divertida.',
          'C — CARRY (BOLSAS): Bolsas en la mano quiere decir que ya están gastando hoy y que alguien ya les ha sacado un sí esta mañana. Ese es el cliente más fácil que hay. Sin ninguna bolsa quiere decir que el día no ha empezado — momento perfecto.',
          'A — ACCESSORIES (COMPLEMENTOS): Reloj, anillos, gafas de sol, bolso. La gente se gasta el dinero en lo que le importa. Quien lleva un reloj serio se preocupa por cómo se ve, y ahí tienes el argumento regalado.',
          'N — NETWORK (CON QUIÉN VAN): Con quién van te dice a quién tienes que ganarte de verdad. Solos, deciden rápido. En pareja, el otro te lo tira abajo con una palabra — métele dentro desde el principio. En un grupo de seis, se venden entre ellos y tú casi no hablas.',
          'P — PACE & POSTURE (RITMO Y POSTURA): Lo rápido que andan te dice lo buena que tiene que ser tu primera frase. Si van paseando y mirando, te vale casi cualquier cosa. Si van a paso ligero y con un sitio al que llegar, tienes una frase y más te vale que sea buena.',
        ],
    },
    {
            type: 'tip',
      text: 'Practise on strangers when you are not even working. Ten minutes outside a café, call it on everybody who walks past — money, mood, who they are with, how fast. Say it out loud in your head before they reach you. You will be wrong a lot at first. Then one day you are not.',
      textEs: 'Practica con desconocidos aunque no estés trabajando. Diez minutos en la terraza de un café y ve cantándolo con cada persona que pasa — dinero, humor, con quién va, a qué velocidad. Dítelo por dentro antes de que lleguen a tu altura. Al principio fallarás mucho. Y un día dejas de fallar.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'What the Scan Is For — and What It Is Not For',
      textEs: 'Para Qué Sirve el Escaneo — y Para Qué No',
    },
    {
            type: 'comparison',
      left: { label: 'WHAT IT BUYS YOU', text: 'Your first sentence, and nothing else. Bags in her hands, you open on what she has already been buying. A serious watch, you open on quality and never on a bargain. Marching with somewhere to be, your line has to land in four words instead of twelve. The scan tells you HOW, never WHO.' },
      leftEs: { label: 'PARA QUÉ SIRVE', text: 'Para tu primera frase, y para nada más. Bolsas en la mano, abres por lo que ya ha estado comprando. Un reloj serio, abres por calidad y nunca por ganga. A paso ligero y con prisa, tu frase tiene que caber en cuatro palabras en vez de doce. El escaneo te dice CÓMO, nunca A QUIÉN.' },
      right: { label: 'WHAT IT DOES NOT BUY YOU', text: 'Permission to skip anybody. There is no such thing as a person who is not worth your fifteen seconds, and least of all while you are learning — you stop everybody, for the practice, and knowing who not to stop is something the years give you, not a list you get handed in week one.' },
      rightEs: { label: 'PARA QUÉ NO SIRVE', text: 'Para saltarte a nadie. No existe la persona que no merezca tus quince segundos, y menos aún mientras estás aprendiendo — paras a todo el mundo, para practicar, y saber a quién no parar te lo dan los años, no una lista que te entregan la primera semana.' }
    },
    {
            type: 'keypoint',
      text: 'And when the scan gives you nothing — no bags, no watch, nothing you can hang a line on — you go anyway, with a plain warm opener. Half the people who end up sitting in your chair looked like absolutely nothing from four metres away. You never find that out by watching them walk past.',
      textEs: 'Y cuando el escaneo no te da nada — ni bolsas, ni reloj, nada de donde tirar — vas igual, con una apertura sencilla y cálida. La mitad de la gente que acaba sentada en tu silla no parecía nada desde cuatro metros. Eso no lo averiguas nunca mirando cómo pasan de largo.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'What Their Grooming Hands You',
      textEs: 'Lo Que su Arreglo te Regala',
    },
    {
            type: 'paragraph',
      text: 'People spend money on the part of themselves they care about, and they wear the answer where you can see it. This is not a scoring system and it is not a shortlist — it is a shortcut to the right opening line:',
      textEs: 'La gente se gasta el dinero en la parte de sí misma que le importa, y lleva la respuesta puesta donde tú la ves. Esto no es una puntuación ni una lista de elegidos — es un atajo hacia la frase correcta con la que abrir:',
    },
    {
            type: 'bullets',
      items: [
        'NAILS SHE LOOKS AFTER: natural or painted, she has already decided her hands matter. \'You always keep them natural? Come here, I want to show you something.\'',
        'HAIR THAT HAS BEEN DONE: cut, coloured, blow-dried. Somebody who sits still for two hours in a salon will sit still for two minutes in your chair — say so, cheekily.',
        'SKIN WITH A ROUTINE BEHIND IT: compliment it first, honestly, then go at the one thing nobody does. Somebody who already has a routine is somebody with a gap in it.',
        'MAKEUP DONE WELL: she does this every morning and the eyes are where the time goes. Open there — it is the exact spot you are about to work on.',
        'AND NONE OF IT RUNS BACKWARDS: bitten nails and a scraped-back ponytail tell you which line to open with, never to save your breath. Half of them are wearing a long flight, not a lack of interest, and you have no way of telling which from four metres.'
      ],
      itemsEs: [
          'UÑAS QUE SE CUIDA: naturales o pintadas, ya ha decidido que sus manos importan. "¿Siempre las llevas naturales? Ven, que te quiero enseñar una cosa."',
          'PELO ARREGLADO: cortado, teñido, con brushing. Quien se está quieta dos horas en la peluquería se está quieta dos minutos en tu silla — díselo, con guasa.',
          'PIEL CON UNA RUTINA DETRÁS: primero el cumplido, de verdad, y luego vas a por lo único que no hace nadie. Quien ya tiene una rutina es quien tiene un hueco en ella.',
          'MAQUILLAJE BIEN PUESTO: esto lo hace cada mañana y donde se le va el tiempo es en los ojos. Abre por ahí — es justo la zona en la que vas a trabajar.',
          'Y NADA DE ESTO FUNCIONA AL REVÉS: las uñas mordidas y la coleta tirante te dicen con qué frase abrir, nunca que te ahorres el aliento. La mitad llevan puesto un vuelo largo, no falta de interés, y desde cuatro metros no hay forma de saber cuál es cuál.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Mistakes to Avoid',
      textEs: 'Errores a Evitar',
    },
    {
            type: 'bullets',
      items: [
        'DON\'T JUDGE BY ETHNICITY: Never assume spending power based on someone\'s nationality or ethnicity. You will miss incredible sales and look foolish.',
        'DON\'T PRE-JUDGE AGE: Young people often have more disposable income than older people (fewer dependents, different priorities). Don\'t skip someone because they look young.',
        'DON\'T IGNORE MIXED SIGNALS: A person in hiking boots with a Rolex is a complex profile — high spending power but practical mindset. Adapt accordingly.',
        'DON\'T STARE: Your scan should be quick and subtle. Lingering eye contact before approaching feels creepy, not observant.'
      ],
      itemsEs: [
          'NO JUZGUES POR ETNIA: Nunca asumas el poder adquisitivo basándote en la nacionalidad o etnia de alguien. Perderás ventas increíbles y te verás ridículo.',
          'NO PRE-JUZGUES POR EDAD: Los jóvenes a menudo tienen más ingresos disponibles que los adultos mayores (menos dependientes, prioridades diferentes). No ignores a alguien porque se vea joven.',
          'NO IGNORES LAS SEÑALES MIXTAS: Una persona con botas de excursionismo y un Rolex es un perfil complejo — alto poder adquisitivo pero mentalidad práctica. Adáptate en consecuencia.',
          'NO TE QUEDES MIRANDO: Tu escaneo debe ser rápido y sutil. El contacto visual prolongado antes de acercarte se siente inquietante, no observador.',
        ],
    },
    {
            type: 'script',
      text: '\'I love your bag — is that from [brand]?\' A specific, genuine compliment based on your observation instantly builds rapport. It shows you\'ve actually SEEN them, not just targeted them randomly.',
      textEs: '\'Me encanta tu bolso — ¿es de [marca]?\' Un cumplido específico y genuino basado en tu observación construye rapport al instante. Demuestra que realmente los HAS VISTO, no que solo los elegiste al azar.',
    },
    {
            type: 'quote',
      text: 'The best salespeople don\'t have better pitches. They have better eyes. They see what others miss.',
      textEs: 'Los mejores vendedores no tienen mejores pitches. Tienen mejores ojos. Ven lo que otros pasan por alto.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    /* No inline quiz. LESSON_QUIZZES['connect-1'] OVERLAYS whatever sits here,
       so this was unreachable code — and two of the three graded the old
       traffic-light filter as correct ("which is a GREEN signal to stop
       immediately", "grooming is a reliable buying indicator"). A beginner
       stops everybody; the live copies of those two are in lessonQuizzes.ts. */
  },
  'connect-2': {
    id: 'connect-2',
    categoryId: 'connecting',
    title: 'Reading Spending Power',
    titleEs: 'Leyendo el Poder Adquisitivo',
    subtitle: 'Detailed signals: brand logos, watch quality, bag condition, and more',
    subtitleEs: 'Señales detalladas: logos de marca, calidad del reloj, condición del bolso, y más',
    duration: '10 min',
    icon: 'Gem',
    order: 2,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Know Who Can Spend Before They Open Their Wallet',
      textEs: 'Sabe Quién Puede Gastar Antes de Que Abra su Cartera',
    },
    {
            type: 'paragraph',
      text: 'Reading spending power isn\'t about snobbery — it\'s about precision. And it does not tell you who to write off. Everybody hears the top of the ladder, because that is the method. What it tells you is where the fight is going to happen: with a careful spender you are not going to be arguing about {currency}300, you are going to be fighting for {currency}140, sometimes {currency}100 — and you fight just as hard for that one. Reading it the other way round costs you just as much: pitch the {currency}30 scrub at somebody in a real Cartier and you have left the whole syringe on the table.',
      textEs: 'Leer el poder adquisitivo no va de esnobismo — va de precisión. Y no te dice a quién descartar. Todo el mundo oye la parte de arriba de la escalera, porque ese es el método. Lo que te dice es dónde va a estar la pelea: con alguien que mira el dinero no vas a discutir por {currency}300, vas a pelear por {currency}140, a veces por {currency}100 — y peleas igual de fuerte por esa. Leerlo al revés te cuesta lo mismo: le ofreces el exfoliante de {currency}30 a alguien con un Cartier de verdad y has dejado la jeringa entera encima de la mesa.',
    },
    {
            type: 'keypoint',
      text: 'Spending power signals are everywhere — but they\'re subtle. A fake designer bag looks similar to a real one to the untrained eye. Learn the difference.',
      textEs: 'Las señales de poder adquisitivo están en todas partes — pero son sutiles. Una bolsa de diseñador falsa se ve similar a una real para el ojo inexperto. Aprende la diferencia.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Hierarchy of Signals (Most to Least Reliable)',
      textEs: 'La Jerarquía de Señales (De Más a Menos Confiables)',
    },
    {
            type: 'numbered',
      items: [
        'WATCH QUALITY: This is the #1 indicator. A genuine Rolex, Cartier, Omega, or Patek Philippe signals serious wealth. But also look for quality mid-range watches (Longines, TAG Heuer, Tissot) which signal comfortable middle-to-upper income. No watch, or a basic digital watch, signals budget consciousness or practical mindset.',
        'SHOE QUALITY: Shoes reveal spending habits more honestly than almost anything else. Well-maintained leather shoes or designer sneakers (clean, current season) signal investment in quality. Scuffed, worn, or budget shoes suggest either limited budget or different priorities.',
        'HANDBAG AUTHENTICITY: Learn to spot quality leather, hardware weight, stitching precision, and logo placement. Real luxury bags have perfect stitching, heavy zippers, and consistent logo patterns. But remember: some wealthy people carry simple bags. Use this signal in combination with others.',
        'NAIL AND TEETH QUALITY: Professional manicures and dental work (straight, white teeth) require ongoing investment. These are lifestyle signals — the person regularly invests in self-maintenance.',
        'CLOTHING FABRIC AND FIT: Natural fibers (wool, silk, cashmere, quality cotton) drape differently than synthetics. Well-fitted clothing suggests either expensive purchases or tailoring — both indicate quality consciousness.',
        'CURRENT SHOPPING BAGS: Bags from luxury or high-end stores in the area are immediate, context-specific spending signals. Someone already carrying Chanel and ski boutique bags is primed to buy more.'
      ],
      itemsEs: [
          'CALIDAD DEL RELOJ: Este es el indicador #1. Un Rolex, Cartier, Omega o Patek Philippe genuinos indican gran riqueza. Pero también busca relojes de gama media de calidad (Longines, TAG Heuer, Tissot) que indican ingresos medio-altos cómodos. No llevar reloj, o llevar uno digital básico, indica consciencia de presupuesto o mentalidad práctica.',
          'CALIDAD DEL CALZADO: Los zapatos revelan los hábitos de gasto más honestamente que casi cualquier otra cosa. Zapatos de cuero bien mantenidos o tenis de diseñador (limpios, temporada actual) indican inversión en calidad. Zapatos raspados, gastados o económicos sugieren presupuesto limitado o prioridades diferentes.',
          'AUTENTICIDAD DEL BOLSO: Aprende a identificar la calidad del cuero, el peso de las herrajes, la precisión de la costura y la colocación del logo. Las bolsas de lujo reales tienen costura perfecta, cierres pesados y patrones de logo consistentes. Pero recuerda: algunas personas adineradas cargan bolsas sencillas. Usa esta señal en combinación con otras.',
          'CALIDAD DE UÑAS Y DIENTES: Las manicuras profesionales y el trabajo dental (dientes rectos, blancos) requieren inversión continua. Estas son señales de estilo de vida — la persona invierte regularmente en su mantenimiento personal.',
          'TELA Y CORTE DE LA ROPA: Las fibras naturales (lana, seda, cachemira, algodón de calidad) caen diferente que las sintéticas. La ropa bien ajustada sugiere compras caras o hecha a medida — ambas indican consciencia de calidad.',
          'BOLSAS DE COMPRAS ACTUALES: Bolsas de tiendas de lujo o gama alta en la zona son señales de gasto inmediatas y específicas al contexto. Alguien que ya carga bolsas de Chanel y boutiques de esquí está listo para comprar más.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Tourist Origin: Typical Spending Patterns',
      textEs: 'Origen del Turista: Patrones de Gasto Típicos',
    },
    {
            type: 'paragraph',
      text: 'These are generalizations based on aggregate patterns. ALWAYS read the individual, not just their nationality. But knowing typical patterns helps you calibrate:',
      textEs: 'Estas son generalizaciones basadas en patrones agregados. SIEMPRE lee al individuo, no solo su nacionalidad. Pero conocer los patrones típicos te ayuda a calibrar:',
    },
    {
            type: 'bullets',
      items: [
        'SPANISH TOURISTS: Often day-trippers or weekend visitors. Shopping-focused, price-conscious but will spend for genuine value. Love the price-gap angle. Respond well to energy and warmth.',
        'FRENCH TOURISTS: Sophisticated about skincare (French beauty culture). Appreciate product knowledge and quality. Less impressed by hype, more by substance. May seem reserved initially — don\'t mistake this for disinterest.',
        'BRITISH TOURISTS: Direct communicators. Appreciate humor and straightforwardness. Often generous spenders once convinced. May need more product education (less familiar with some skincare categories).',
        'EASTERN EUROPEAN TOURISTS: Often big spenders in luxury categories. Strong responders to premium positioning. Appreciate exclusivity and status signaling. Direct and decisive when interested.',
        'ASIAN TOURISTS: Often highly educated about skincare ingredients and technology. Respect demonstrations and visible results. May be methodical in decision-making. Group dynamics matter — friends influence heavily.',
        'SOUTH AMERICAN TOURISTS: Warm, social, relationship-oriented. Respond to emotional connection and personal attention. Often generous gift-buyers. Family-oriented purchasing (buying for multiple people).'
      ],
      itemsEs: [
          'TURISTAS ESPAÑOLES: A menudo excursionistas de un día o visitantes de fin de semana. Enfocados en compras, conscientes del precio pero gastarán por valor genuino. Aman el ángulo de la diferencia de precio. Responden bien a la energía y calidez.',
          'TURISTAS FRANCESES: Sofisticados en cuidado de la piel (cultura de belleza francesa). Aprecian el conocimiento de productos y la calidad. Menos impresionados por el hype, más por la sustancia. Pueden parecer reservados al principio — no confundas esto con desinterés.',
          'TURISTAS BRITÁNICOS: Comunicadores directos. Aprecian el humor y la franqueza. A menudo gastan generosamente una vez convencidos. Pueden necesitar más educación sobre productos (menos familiarizados con algunas categorías de cuidado de la piel).',
          'TURISTAS DEL ESTE DE EUROPA: A menudo grandes gastadores en categorías de lujo. Responden fuertemente al posicionamiento premium. Aprecian la exclusividad y las señales de estatus. Directos y decisivos cuando están interesados.',
          'TURISTAS ASIÁTICOS: A menudo muy educados sobre ingredientes y tecnología de cuidado de la piel. Respetan las demostraciones y resultados visibles. Pueden ser metódicos al tomar decisiones. La dinámica de grupo importa — los amigos influyen fuertemente.',
          'TURISTAS SUDAMERICANOS: Cálidos, sociales, orientados a las relaciones. Responden a la conexión emocional y la atención personal. A menudo compradores de regalos generosos. Compras orientadas a la familia (comprando para varias personas).',
        ],
    },
    {
            type: 'tip',
      text: 'The price gap is your universal equalizer — but do not expect it to close a careful spender on its own. {currency}500 into {currency}300 opens the conversation for everybody; it does not finish it for the one who is watching her money. She is going to keep talking to you until you are down at {currency}140, and that is fine, because that is where she buys. Lead with the Europe price, deliver the {locationName} price as a gift rather than a discount, and keep the rest of the ladder for the fight that is actually coming.',
      textEs: 'La diferencia de precio es tu igualador universal — pero no esperes que cierre sola a quien mira el dinero. De {currency}500 a {currency}300 abre la conversación con cualquiera; no la termina con la que va contando. Esa va a seguir hablando contigo hasta que estés en {currency}140, y no pasa nada, porque ahí es donde compra. Empieza por el precio de Europa, dale el precio de {locationName} como un regalo y no como un descuento, y guárdate el resto de la escalera para la pelea que viene de verdad.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Already Buying\' Signal',
      textEs: 'La Señal de \'Ya Está Comprando\'',
    },
    {
            type: 'paragraph',
      text: 'This is one of the most powerful spending indicators: someone who is ALREADY in buying mode. When a tourist is carrying multiple shopping bags, they have:',
      textEs: 'Este es uno de los indicadores de gasto más poderosos: alguien que YA está en modo de compra. Cuando un turista carga múltiples bolsas de compras, tiene:',
    },
    {
            type: 'bullets',
      items: [
        'Mental buying momentum: The decision to spend has already been made. Their wallet is open, their inhibitions are lowered.',
        'Budget flexibility: Someone who has already spent {currency}500 today is more likely to spend {currency}100 more than someone who hasn\'t spent anything.',
        'Trust in the location: They\'re already committed to shopping in {locationName}. Your shop is just another stop on their buying journey.',
        'Time investment: They\'ve dedicated time to shopping. Stopping for a 5-minute demo fits their current activity.'
      ],
      itemsEs: [
          'Momento de compra mental: La decisión de gastar ya se tomó. Su cartera está abierta, sus inhibiciones están bajas.',
          'Flexibilidad de presupuesto: Alguien que ya gastó {currency}500 hoy es más propenso a gastar {currency}100 más que alguien que no ha gastado nada.',
          'Confianza en el lugar: Ya están comprometidos con comprar en {locationName}. Tu tienda es solo otra parada en su viaje de compras.',
          'Inversión de tiempo: Han dedicado tiempo a las compras. Detenerse para una demo de 5 minutos encaja con su actividad actual.',
        ],
    },
    {
            type: 'script',
      text: '\'I see you\'ve been shopping! You clearly know how to find the best spots in {locationName}. Let me show you something that most tourists don\'t know about — it\'s my favorite hidden gem here.\' This connects their existing buying behavior to your offer.',
      textEs: '\'¡Veo que has estado comprando! Claramente sabes encontrar los mejores lugares en {locationName}. Déjame mostrarte algo que la mayoría de turistas no conocen — es mi joya escondida favorita aquí.\' Esto conecta su comportamiento de compra existente con tu oferta.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When Signals Contradict',
      textEs: 'Cuando las Señales se Contradicen',
    },
    {
            type: 'paragraph',
      text: 'Sometimes spending signals conflict. A person in budget clothing wearing an expensive watch. Someone with designer shoes but no shopping bags. These contradictions require deeper reading:',
      textEs: 'A veces las señales de gasto entran en conflicto. Una persona con ropa económica usando un reloj caro. Alguien con zapatos de diseñador pero sin bolsas de compras. Estas contradicciones requieren lectura más profunda:',
    },
    {
            type: 'bullets',
      items: [
        'EXPENSIVE WATCH + BUDGET CLOTHES: Often a successful person who doesn\'t care about fashion but values one signature piece. Pitch based on product RESULTS, not luxury status.',
        'DESIGNER EVERYTHING BUT NO SHOPPING BAGS: Could be window-shopping without buying, OR just starting their day. Time your approach carefully.',
        'BUDGET SIGNALS BUT CONFIDENT DEMEANOR: Sometimes the wealthiest people dress simply. If their energy is confident and open, pitch normally. Let the demo do the work.',
        'ALL SIGNALS POINT TO WEALTH BUT THEY\'RE HESITANT: Wealthy people can also be cautious or comparison shoppers. Don\'t pressure. Build trust through expertise.'
      ],
      itemsEs: [
          'RELOJ CARO + ROPA ECONÓMICA: A menudo una persona exitosa a quien no le importa la moda pero valora una pieza insignia. Haz tu pitch basado en RESULTADOS del producto, no en estatus de lujo.',
          'TODO DE DISEÑADOR PERO SIN BOLSAS DE COMPRAS: Podrían estar viendo escaparates sin comprar, O apenas empezando su día. Temporiza tu acercamiento cuidadosamente.',
          'SEÑALES ECONÓMICAS PERO PORTE CONFIADO: A veces las personas más adineradas visten sencillo. Si su energía es confiada y abierta, haz tu pitch normalmente. Deja que la demo haga el trabajo.',
          'TODAS LAS SEÑALES INDICAN RIQUEZA PERO ESTÁN DUDOSOS: Las personas adineradas también pueden ser cautelosas o comparar opciones. No presiones. Construye confianza a través de tu experiencia.',
        ],
    },
    {
            type: 'tip',
      text: 'When in doubt, lead with the syringe (flagship). A recoil at {currency}300 is not a reason to change product — the syringe has four more rungs underneath it before you ever reach for the peeling or the scrub, and the bottom of it is {currency}100. Work those first. It\'s harder to lift someone who started at {currency}30 than to walk down someone who started at {currency}300.',
      textEs: 'Cuando dudes, empieza por la jeringa (el producto estrella). Que se echen atrás con {currency}300 no es motivo para cambiar de producto — la jeringa tiene cuatro escalones más por debajo antes de que toques el peeling o el exfoliante, y el último es {currency}100. Trabájalos primero. Es más difícil subir a quien empezó en {currency}30 que bajar a quien empezó en {currency}300.',
    },
    {
            type: 'quote',
      text: 'Reading spending power isn\'t about judging worth. It\'s about matching the right offer to the right person at the right time. Everyone deserves your best service — but not everyone needs your most expensive product.',
      textEs: 'Leer el poder adquisitivo no se trata de juzgar el valor. Se trata de emparejar la oferta correcta con la persona correcta en el momento correcto. Todos merecen tu mejor servicio — pero no todos necesitan tu producto más caro.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'What is generally considered the #1 indicator of spending power?',
      options: [
        'Handbag brand',
        'Shoe quality',
        'Watch quality',
        'Clothing brand logos'
      ],
      correctIndex: 2,
      explanation: 'Watch quality is typically the most reliable indicator of spending power because watches are worn for function AND status, and luxury watches are expensive enough to separate serious wealth from average income.',
    },
    {
      question: 'Why is the \'already buying\' signal so powerful?',
      options: [
        'It means they\'re rich',
        'They\'re in buying mode with mental momentum, budget flexibility, and trust in the location',
        'They have no budget limit',
        'They\'ll buy anything'
      ],
      correctIndex: 1,
      explanation: 'Someone already carrying shopping bags has buying momentum, budget flexibility, trust in the location, and has dedicated time to shopping. Their wallet is already metaphorically open.',
    },
    {
      question: 'What should you do when spending signals contradict each other?',
      options: [
        'Always trust the most expensive signal',
        'Always assume they have no money',
        'Read deeper — contradictions often reveal personality type and priorities',
        'Ignore the signals and pitch the cheapest product'
      ],
      correctIndex: 2,
      explanation: 'Contradictory signals require deeper reading. An expensive watch with budget clothing might mean someone who values specific quality over fashion. Read their energy and demeanor alongside material signals.',
    }
    ],
  },
  'connect-3': {
    id: 'connect-3',
    categoryId: 'connecting',
    title: 'Cultural Intelligence',
    titleEs: 'Inteligencia Cultural',
    subtitle: 'Selling to Spanish, French, British, and Eastern European tourists — key differences and phrases',
    subtitleEs: 'Vendiendo a turistas españoles, franceses, británicos y del este de Europa',
    duration: '10 min',
    icon: 'Globe',
    order: 3,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Every Culture Buys Differently. Know the Difference.',
      textEs: 'Cada Cultura Compra Diferente. Conoce la Diferencia.',
    },
    {
            type: 'paragraph',
      text: '{locationName} is a crossroads — Spanish, French, British, Eastern European, and Asian tourists all converge on the same street. Selling the same product to a Frenchwoman from Paris requires a different approach than selling to a British family or a solo Spanish shopper. Cultural intelligence isn\'t stereotyping — it\'s understanding how cultural background shapes communication style, decision-making, and buying psychology.',
      textEs: '{locationName} es una encrucijada — turistas españoles, franceses, británicos, del este de Europa y asiáticos convergen en la misma calle. Vender el mismo producto a una francesa de París requiere un enfoque diferente que vender a una familia británica o a un comprador español solitario. La inteligencia cultural no es estereotipar — es entender cómo el trasfondo cultural moldea el estilo de comunicación, la toma de decisiones y la psicología de compra.',
    },
    {
            type: 'keypoint',
      text: 'A technique that closes a Spanish customer might repel a French one. Humor that charms a British tourist might confuse an Eastern European. Adapt your approach to the person in front of you.',
      textEs: 'Una técnica que cierra con un cliente español podría repeler a uno francés. El humor que encanta a un turista británico podría confundir a un europeo del este. Adapta tu enfoque a la persona frente a ti.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Spanish Tourists: Warmth, Energy, and Value',
      textEs: 'Turistas Españoles: Calidez, Energía y Valor',
    },
    {
            type: 'paragraph',
      text: 'Spanish tourists often arrive in groups — families, couples, friends. They\'re typically shopping-oriented, respond well to high energy, and appreciate genuine warmth. The price gap between Europe and {locationName} resonates strongly with them.',
      textEs: 'Los turistas españoles a menudo llegan en grupos — familias, parejas, amigos. Típicamente están orientados a las compras, responden bien a la energía alta y aprecian la calidez genuina. La diferencia de precio entre Europa y {locationName} les resuena con fuerza.',
    },
    {
            type: 'bullets',
      items: [
        'COMMUNICATION STYLE: Warm, expressive, relationship-oriented. They appreciate personal connection before business. Ask about their trip, their day, their plans.',
        'DECISION-MAKING: Often consensus-based (especially in groups). The group dynamic matters — get everyone involved.',
        'PRICE SENSITIVITY: Value-conscious but will spend for quality. The price-gap narrative works brilliantly — frame it as \'smart shopping.\'',
        'KEY PHRASES: \'Hola!\' (always greet warmly), \'Ahorras mucho aquí en {locationName}\' (You save a lot here in {locationName}), \'Es de muy buena calidad\' (It\'s very good quality), \'Regalo perfecto\' (Perfect gift).',
        'APPROACH: High energy, warm smile, personal questions. Show enthusiasm. Spanish customers often mirror your energy — bring it.'
      ],
      itemsEs: [
          'ESTILO DE COMUNICACIÓN: Cálido, expresivo, orientado a las relaciones. Aprecian la conexión personal antes de los negocios. Pregúntales sobre su viaje, su día, sus planes.',
          'TOMA DE DECISIONES: A menudo basada en consenso (especialmente en grupos). La dinámica de grupo importa — involucra a todos.',
          'SENSIBILIDAD AL PRECIO: Conscientes del valor pero gastarán por calidad. La narrativa de la diferencia de precio funciona brillantemente — preséntalo como "compras inteligentes".',
          'FRASES CLAVE: "¡Hola!" (siempre saluda cálidamente), "Ahorras mucho aquí en {locationName}" (Ahorras mucho aquí en {locationName}), "Es de muy buena calidad" (Es de muy buena calidad), "Regalo perfecto" (Regalo perfecto).',
          'ENFOQUE: Alta energía, sonrisa cálida, preguntas personales. Muestra entusiasmo. Los clientes españoles a menudo reflejan tu energía — llévala.',
        ],
    },
    {
            type: 'script',
      text: '\'Hola! ¿Qué tal vuestro día en {locationName}? Me encanta tu bolso — claramente sabes encontrar las mejores tiendas. Déjame enseñarte algo que la mayoría de turistas no conocen. Es mi producto favorito aquí.\' (Hello! How\'s your day in {locationName}? I love your bag — you clearly know how to find the best shops. Let me show you something most tourists don\'t know about. It\'s my favorite product here.)',
      textEs: '\'¡Hola! ¿Qué tal vuestro día en {locationName}? Me encanta tu bolso — claramente sabes encontrar las mejores tiendas. Déjame enseñarte algo que la mayoría de turistas no conocen. Es mi producto favorito aquí.\' (¡Hola! ¿Cómo va su día en {locationName}? Me encanta tu bolso — claramente sabes encontrar las mejores tiendas. Déjame mostrarte algo que la mayoría de turistas no conocen. Es mi producto favorito aquí.)',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'French Tourists: Sophistication, Knowledge, and Subtlety',
      textEs: 'Turistas Franceses: Sofisticación, Conocimiento y Sutileza',
    },
    {
            type: 'paragraph',
      text: 'French culture has deep skincare knowledge. French customers often know about ingredients, brands, and beauty science. They appreciate quality demonstrations but can be skeptical of hype. Subtlety works better than high-pressure energy.',
      textEs: 'La cultura francesa tiene un conocimiento profundo de cuidado de la piel. Los clientes franceses a menudo saben sobre ingredientes, marcas y ciencia de la belleza. Aprecian las demostraciones de calidad pero pueden ser escépticos del hype. La sutileza funciona mejor que la energía de alta presión.',
    },
    {
            type: 'bullets',
      items: [
        'COMMUNICATION STYLE: Measured, thoughtful, appreciate expertise. Show product knowledge. Don\'t oversell — let the product speak.',
        'DECISION-MAKING: Individual or couple-based. They think before deciding. Give them space to consider. Pressure backfires.',
        'PRICE SENSITIVITY: Quality over price. A French customer will pay {currency}300 for something that works vs. {currency}50 for something cheap. Frame it as investment, not discount.',
        'KEY PHRASES: \'Bonjour!\' (essential greeting), \'C\'est un produit exceptionnel\' (It\'s an exceptional product), \'Résultats immédiats\' (Immediate results), \'Sans parabènes, sans chimie\' (Without parabens, without chemicals).',
        'APPROACH: Professional, knowledgeable, respectful. Demonstrate the product with confidence. Answer technical questions well. Give them time to decide.'
      ],
      itemsEs: [
          'ESTILO DE COMUNICACIÓN: Medido, reflexivo, aprecian la experiencia. Muestra conocimiento de productos. No vendas en exceso — deja que el producto hable.',
          'TOMA DE DECISIONES: Individual o en pareja. Piensan antes de decidir. Dale espacio para considerar. La presión tiene el efecto contrario.',
          'SENSIBILIDAD AL PRECIO: Calidad sobre precio. Un cliente francés pagará {currency}300 por algo que funciona vs. {currency}50 por algo barato. Preséntalo como inversión, no como descuento.',
          'FRASES CLAVE: "¡Bonjour!" (saludo esencial), "C\'est un produit exceptionnel" (Es un producto excepcional), "Résultats immédiats" (Resultados inmediatos), "Sans parabènes, sans chimie" (Sin parabenos, sin químicos).',
          'ENFOQUE: Profesional, conocedor, respetuoso. Demuestra el producto con confianza. Responde bien las preguntas técnicas. Dale tiempo para decidir.',
        ],
    },
    {
            type: 'script',
      text: '\'Bonjour! Vous connaissez les produits de la Mer Morte? C\'est exceptionnel — les minéraux sont les plus concentrés au monde. Regardez ce résultat, c\'est immédiat.\' (Hello! Do you know Dead Sea products? It\'s exceptional — the minerals are the most concentrated in the world. Look at this result, it\'s immediate.)',
      textEs: '\'¡Bonjour! ¿Conoces los productos del Mar Muerto? Es excepcional — los minerales son los más concentrados del mundo. Mira este resultado, es inmediato.\' (¡Hola! ¿Conoces los productos del Mar Muerto? Es excepcional — los minerales son los más concentrados del mundo. Mira este resultado, es inmediato.)',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'British Tourists: Directness, Humor, and Straight Talk',
      textEs: 'Turistas Británicos: Directitud, Humor y Sinceridad',
    },
    {
            type: 'paragraph',
      text: 'British tourists generally appreciate directness, humor, and no-nonsense communication. They can be skeptical of \'sales talk\' and respond well to someone who feels genuine rather than performative. Self-deprecating humor works brilliantly.',
      textEs: 'Los turistas británicos generalmente aprecian la directitud, el humor y la comunicación sin rodeos. Pueden ser escépticos del "discurso de ventas" y responden bien a alguien que se siente genuino en lugar de performático. El humor autocrítico funciona brillantemente.',
    },
    {
            type: 'bullets',
      items: [
        'COMMUNICATION STYLE: Direct, humorous, appreciates authenticity. Don\'t be too \'salesy.\' Be a real person having a real conversation.',
        'DECISION-MAKING: Usually couple-based. The partner\'s opinion matters heavily. Involve them with humor and direct questions.',
        'PRICE SENSITIVITY: Reasonably price-aware but responsive to genuine value. The price-gap angle works well. They love a \'bargain\' but hate feeling \'sold to.\'',
        'APPROACH: Friendly, slightly cheeky, direct. \'I know you weren\'t planning to stop, but I promise this is worth two minutes of your time.\' British customers respect honesty and humor.'
      ],
      itemsEs: [
          'ESTILO DE COMUNICACIÓN: Directo, humorístico, aprecia la autenticidad. No seas demasiado "vendedor". Sé una persona real teniendo una conversación real.',
          'TOMA DE DECISIONES: Generalmente en pareja. La opinión de la pareja importa mucho. Involúcralos con humor y preguntas directas.',
          'SENSIBILIDAD AL PRECIO: Razonablemente conscientes del precio pero responden al valor genuino. El ángulo de la diferencia de precio funciona bien. Aman una "ganga" pero odian sentirse "vendidos".',
          'ENFOQUE: Amigable, ligeramente atrevido, directo. "Sé que no planeabas detenerte, pero te prometo que esto vale dos minutos de tu tiempo." Los clientes británicos respetan la honestidad y el humor.',
        ],
    },
    {
            type: 'script',
      text: '\'I know, I know — you\'re thinking \'not another salesperson.\' But I promise you, this is actually worth stopping for. Two minutes, and if you don\'t love it, you can tell me I\'m terrible at my job. Fair deal?\' This disarms skepticism with humor and directness.',
      textEs: '\'Ya lo sé, ya lo sé — estás pensando "otro vendedor no, por favor". Pero te prometo que esto sí merece la pena. Dos minutos, y si no te encanta, me dices que soy malísimo en mi trabajo. ¿Trato justo?\' Esto desarma el escepticismo con humor y franqueza.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Eastern European Tourists: Exclusivity, Status, and Results',
      textEs: 'Turistas del Este de Europa: Exclusividad, Estatus y Resultados',
    },
    {
            type: 'paragraph',
      text: 'Eastern European tourists often respond to premium positioning, exclusivity, and visible results. They\'re typically decisive buyers — when interested, they move fast. They appreciate being treated as VIPs.',
      textEs: 'Los turistas del este de Europa a menudo responden al posicionamiento premium, la exclusividad y los resultados visibles. Típicamente son compradores decisivos — cuando están interesados, actúan rápido. Aprecian ser tratados como VIPs.',
    },
    {
            type: 'bullets',
      items: [
        'COMMUNICATION STYLE: Direct, relationship-oriented, appreciate status and exclusivity. Frame the product as premium and exclusive.',
        'DECISION-MAKING: Often individual or with a trusted companion. Once convinced, they decide quickly. Don\'t slow them down with too many options.',
        'PRICE SENSITIVITY: Less price-sensitive when the value is clear. Premium framing actually INCREASES appeal. They want the BEST.',
        'APPROACH: Confident, premium, results-focused. Show the demo. Let the result speak. Frame it as the #1 product, the flagship, the best-seller.'
      ],
      itemsEs: [
          'ESTILO DE COMUNICACIÓN: Directo, orientado a las relaciones, aprecian el estatus y la exclusividad. Presenta el producto como premium y exclusivo.',
          'TOMA DE DECISIONES: A menudo individual o con un compañero de confianza. Una vez convencidos, deciden rápido. No los ralentices con demasiadas opciones.',
          'SENSIBILIDAD AL PRECIO: Menos sensibles al precio cuando el valor es claro. El marco premium realmente INCREMENTA el atractivo. Quieren el MEJOR.',
          'ENFOQUE: Confiado, premium, enfocado en resultados. Muestra la demo. Deja que el resultado hable. Preséntalo como el producto #1, el estrella, el más vendido.',
        ],
    },
    {
            type: 'script',
      text: '\'This is our number one product across all of Europe. Everyone who tries it is shocked by the result. Here, look in the mirror — you see the difference? That\'s after two minutes. Imagine after one month.\' Results-driven, premium-framed, confident delivery.',
      textEs: '\'Este es nuestro producto número uno en toda Europa. Todos los que lo prueban se sorprenden con el resultado. Mira, ve al espejo — ¿ves la diferencia? Eso es después de dos minutos. Imagina después de un mes.\' Entrega enfocada en resultados, con marco premium, confiada.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Personal Space and Touch: Cultural Differences',
      textEs: 'Espacio Personal y Contacto: Diferencias Culturales',
    },
    {
            type: 'paragraph',
      text: 'Physical proximity and touch are interpreted differently across cultures:',
      textEs: 'La proximidad física y el contacto se interpretan diferente entre culturas:',
    },
    {
            type: 'bullets',
      items: [
        'SOUTHERN EUROPEANS (Spanish, Italian, Portuguese): Generally comfortable with closer proximity and light touch (shoulder, hand). Warm, expressive gestures are welcome.',
        'NORTHERN EUROPEANS (British, German, Scandinavian): Prefer more personal space. Touch should be minimal and only after rapport is established. Respect their bubble.',
        'FRENCH: Moderate personal space. Appreciate elegance and grace in movement. Touch is acceptable during the demo but keep it professional.',
        'EASTERN EUROPEANS: Generally comfortable with warmth and proximity once rapport is established. Build trust first, then be warm.'
      ],
      itemsEs: [
          'EUROPEOS DEL SUR (Españoles, Italianos, Portugueses): Generalmente cómodos con proximidad más cercana y contacto ligero (hombro, mano). Los gestos cálidos y expresivos son bienvenidos.',
          'EUROPEOS DEL NORTE (Británicos, Alemanes, Escandinavos): Prefieren más espacio personal. El contacto debe ser mínimo y solo después de establecer rapport. Respeta su burbuja.',
          'FRANCESES: Espacio personal moderado. Aprecian la elegancia y gracia en el movimiento. El contacto es aceptable durante la demo pero mantenlo profesional.',
          'EUROPEOS DEL ESTE: Generalmente cómodos con calidez y proximidad una vez establecido el rapport. Construye confianza primero, luego sé cálido.',
        ],
    },
    {
            type: 'tip',
      text: 'When uncertain about someone\'s cultural background, start with moderate distance and minimal touch. If they lean in, move closer. If they stay back, respect their space. Let THEM close the distance.',
      textEs: 'Cuando no estés seguro del trasfondo cultural de alguien, empieza con distancia moderada y contacto mínimo. Si se acercan, acércate tú también. Si se mantienen atrás, respeta su espacio. Deja que ELLOS cierren la distancia.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Language Tips: Key Phrases That Open Doors',
      textEs: 'Consejos de Idioma: Frases Clave que Abren Puertas',
    },
    {
            type: 'paragraph',
      text: 'Even a few words in someone\'s native language creates instant connection. It shows respect and effort. Here are essential phrases:',
      textEs: 'Incluso unas pocas palabras en el idioma nativo de alguien crea conexión instantánea. Demuestra respeto y esfuerzo. Aquí están las frases esenciales:',
    },
    {
            type: 'bullets',
      items: [
        'SPANISH: \'Hola\' (Hello), \'¿Cómo estás?\' (How are you?), \'Mira\' (Look), \'Increíble\' (Incredible), \'Regalo\' (Gift), \'Precio especial\' (Special price), \'Para ti\' (For you), \'Gracias\' (Thank you)',
        'FRENCH: \'Bonjour\' (Hello), \'Regardez\' (Look), \'Incroyable\' (Incredible), \'Résultat immédiat\' (Immediate result), \'Cadeau\' (Gift), \'Prix spécial\' (Special price), \'Merci\' (Thank you)',
        'ENGLISH: You\'re likely already fluent, but British-specific phrases help: \'Brilliant,\' \'Lovely,\' \'Absolutely,\' \'Cheers\' — mirror their vocabulary.',
        'RUSSIAN (common with Eastern European visitors): \'Zdravstvuyte\' (Hello), \'Smotrite\' (Look), \'Potryasayushche\' (Amazing) — even attempting a greeting creates goodwill.'
      ],
      itemsEs: [
          'ESPAÑOL: "Hola" (Hola), "¿Cómo estás?" (¿Cómo estás?), "Mira" (Mira), "Increíble" (Increíble), "Regalo" (Regalo), "Precio especial" (Precio especial), "Para ti" (Para ti), "Gracias" (Gracias)',
          'FRANCÉS: "Bonjour" (Hola), "Regardez" (Mira), "Incroyable" (Increíble), "Résultat immédiat" (Resultado inmediato), "Cadeau" (Regalo), "Prix spécial" (Precio especial), "Merci" (Gracias)',
          'INGLÉS: Probablemente ya dominas el inglés, pero las frases específicas británicas ayudan: "Brilliant," "Lovely," "Absolutely," "Cheers" — refleja su vocabulario.',
          'RUSO (común entre visitantes del este de Europa): "Zdravstvuyte" (Hola), "Smotrite" (Mira), "Potryasayushche" (Increíble) — incluso intentar un saludo genera buena voluntad.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When You Share No Language At All',
      textEs: 'Cuando No Compartís Ni Un Idioma',
    },
    {
            type: 'paragraph',
      text: 'This is not the disaster a new seller thinks it is. A demo is a mirror and two hands, and most of what sells is happening on her face rather than in your sentences. For the rest of it you are not short of options:',
      textEs: 'Esto no es el desastre que se imagina un vendedor nuevo. Una demo es un espejo y dos manos, y casi todo lo que vende está pasando en su cara y no en tus frases. Para lo demás no te faltan recursos:',
    },
    {
            type: 'bullets',
      items: [
        'GOOGLE TRANSLATE, out loud and with no embarrassment about it. Type it, turn the phone round, let her type back. Half the time it gets a laugh, and the laugh is worth more than the sentence was.',
        'THE PRODUCT PAGES EXIST ONLINE IN OTHER LANGUAGES. Pull one up and put the phone in her hand. She reads it in her own language while you get on with the eye.',
        'NUMBERS NEED NO TRANSLATION. Show her the figure, then show her the next one as you come down. Nobody in the history of this shop has needed 300 turning into 210 explained to them.',
        'AND THE REST IS TOUCHING, SMILING AND POINTING. The warmth is the language. Do it slower, not louder.'
      ],
      itemsEs: [
          'GOOGLE TRANSLATE, en voz alta y sin ninguna vergüenza. Lo escribes, le giras el móvil, y que te conteste ella escribiendo. La mitad de las veces te llevas una risa, y la risa vale más que la frase.',
          'LAS PÁGINAS DE PRODUCTO ESTÁN ONLINE EN OTROS IDIOMAS. Abre una y ponle el móvil en la mano. Ella lo lee en su idioma mientras tú sigues con el ojo.',
          'LOS NÚMEROS NO NECESITAN TRADUCCIÓN. Le enseñas la cifra, y luego la siguiente según vas bajando. En la historia de esta tienda nadie ha necesitado que le expliquen que 300 pasa a 210.',
          'Y EL RESTO ES TOCAR, SONREÍR Y SEÑALAR. La calidez es el idioma. Hazlo más despacio, no más alto.',
        ],
    },
    {
            type: 'tip',
      text: 'What you never do is apologise for it, and you never go off hunting for a colleague who speaks her language while she sits there on her own. Get the phone out and carry on. She did not come in for a conversation, she came in because you promised her something on her face.',
      textEs: 'Lo que no haces nunca es pedir perdón por ello, y tampoco te vas a buscar a un compañero que hable su idioma dejándola ahí sentada sola. Saca el móvil y sigue. No ha entrado a charlar, ha entrado porque le has prometido algo en su cara.',
    },
    {
            type: 'quote',
      text: 'Language is the road map of a culture. It tells you where its people come from and where they are going. Speaking even a few words in someone\'s language is a sign of respect that opens wallets.',
      textEs: 'El idioma es el mapa de una cultura. Te dice de dónde vienen sus personas y a dónde van. Hablar incluso unas pocas palabras en el idioma de alguien es una señal de respeto que abre carteras.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'Which approach works best with French tourists?',
      options: [
        'High energy and lots of enthusiasm',
        'Professional expertise with product knowledge and space to decide',
        'Self-deprecating humor and cheekiness',
        'Exclusivity and VIP treatment'
      ],
      correctIndex: 1,
      explanation: 'French tourists appreciate expertise, product knowledge, and space to consider. They\'re often knowledgeable about skincare and respond to substance over hype. Pressure backfires.',
    },
    {
      question: 'Why does the price-gap narrative work especially well with Spanish tourists?',
      options: [
        'They don\'t care about quality, only about the lowest price',
        'They\'re value-conscious — {currency}500 at {currency}300 feels smart',
        'They only buy cheap products and avoid premium brands',
        'They don\'t understand luxury pricing'
      ],
      correctIndex: 1,
      explanation: 'Spanish tourists are value-conscious, so hearing {currency}500 in Europe and {currency}300 here makes the buy feel significant. They respond well to value framing — \'smart shopping\' in {locationName}.',
    },
    {
      question: 'What should you do when uncertain about someone\'s cultural background?',
      options: [
        'Guess based on appearance',
        'Start with moderate distance and minimal touch, letting them close the gap',
        'Ask directly where they\'re from',
        'Use the same approach for everyone'
      ],
      correctIndex: 1,
      explanation: 'When uncertain, start with moderate distance and minimal touch. Watch their body language — if they lean in, you can move closer. Let them set the proximity comfort level.',
    }
    ],
  },
  'connect-4': {
    id: 'connect-4',
    categoryId: 'connecting',
    title: 'The Partner Dynamic',
    titleEs: 'La Dinámica de Pareja',
    subtitle: 'How to read couples, engage the skeptical partner, and close together',
    subtitleEs: 'Cómo leer parejas, involucrar al escéptico y cerrar juntos',
    duration: '8 min',
    icon: 'Users',
    order: 4,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'A Couple Is Two Sales or Two Vetoes — Never One of Each',
      textEs: 'Una Pareja Son Dos Ventas o Dos Vetos — Nunca Una de Cada',
    },
    {
            type: 'paragraph',
      text: 'A person on their own decides on their own. A couple decides out loud, in front of you, and that changes everything. Bring both of them in and they talk each other INTO it — she wants it, he says "go on, treat yourself", and now the decision has two people behind it instead of one. Leave one of them standing there like furniture and you have created a silent veto: bored, ignored, and one sigh away from "come on, we said we were meeting them at six." The mechanism is that simple, and it is why you never let a partner go quiet.',
      textEs: 'Una persona sola decide sola. Una pareja decide en voz alta, delante de ti, y eso lo cambia todo. Métetelos a los dos y se convencen el uno al otro — ella lo quiere, él dice "venga, date un capricho", y ahora la decisión tiene a dos personas detrás en vez de a una. Deja a uno ahí de pie como un mueble y te has fabricado un veto silencioso: aburrido, ignorado, y a un suspiro de "venga, que habíamos quedado a las seis". El mecanismo es así de simple, y por eso nunca dejas que una pareja se calle.',
    },
    {
            type: 'keypoint',
      text: 'The golden rule: never make one partner feel irrelevant. The person standing quietly might be the one who ultimately decides. Bring them in. Make them feel seen. Their involvement is the key to the sale.',
      textEs: 'La regla de oro: nunca hagas que una pareja se sienta irrelevante. La persona que está de pie en silencio podría ser quien decide al final. Tráelos adentro. Haz que se sientan vistos. Su involucramiento es la clave de la venta.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reading the Decision-Maker',
      textEs: 'Leyendo al Tomador de Decisiones',
    },
    {
            type: 'paragraph',
      text: 'In most couples, one person drives the interaction while the other observes. But the driver isn\'t always the decision-maker. Watch for these signals:',
      textEs: 'En la mayoría de las parejas, una persona lidera la interacción mientras la otra observa. Pero quien lidera no siempre es quien decide. Observa estas señales:',
    },
    {
            type: 'bullets',
      items: [
        'THE DRIVER: Does most of the talking, asks questions, engages with you directly. They\'re interested and leading the exploration. Often the one who will USE the product.',
        'THE DECISION-MAKER: May be quieter but their reactions carry more weight. Watch who the driver looks at after your pitch. If they seek eye contact with their partner before responding, the partner is the decision-maker.',
        'THE INFLUENCER: Sometimes there\'s a third dynamic — one person uses the product, but a third person (friend, adult child) influences the decision. Read the group\'s attention patterns.'
      ],
      itemsEs: [
          'QUIEN LIDERA: Hace la mayor parte de la conversación, hace preguntas, se involucra contigo directamente. Están interesados y lideran la exploración. A menudo quien USARÁ el producto.',
          'EL TOMADOR DE DECISIONES: Puede ser más callado pero sus reacciones tienen más peso. Observa a quién mira quien lidera después de tu pitch. Si busca contacto visual con su pareja antes de responder, la pareja es quien decide.',
          'EL INFLUENCIADOR: A veces hay una tercera dinámica — una persona usa el producto, pero una tercera persona (amigo, hijo adulto) influye en la decisión. Lee los patrones de atención del grupo.',
        ],
    },
    {
            type: 'tip',
      text: 'A classic tell: after you present the offer, the interested partner looks at the other and says \'What do you think?\' That\'s the moment of truth. How the partner responds determines the sale. Prepare for that moment.',
      textEs: 'Una señal clásica: después de presentar la oferta, la pareja interesada mira a la otra y dice "¿Qué piensas?" Ese es el momento de la verdad. Cómo responde la pareja determina la venta. Prepárate para ese momento.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Engaging the Skeptical Partner',
      textEs: 'Involucrando a la Pareja Escéptica',
    },
    {
            type: 'paragraph',
      text: 'The skeptical partner is often a man watching his female partner\'s interaction. He may seem bored, suspicious, or protective. Your job is to transform him from potential veto into active supporter. Here\'s how:',
      textEs: 'La pareja escéptica a menudo es un hombre observando la interacción de su pareja femenina. Puede parecer aburrido, sospechoso o protector. Tu trabajo es transformarlo de veto potencial a partidario activo. Así es como:',
    },
    {
            type: 'numbered',
      items: [
        'INCLUDE HIM EARLY: Don\'t wait until the close. From the moment they\'re inside, make eye contact with him. Ask his opinion. \'Sir, you see what I mean about the eye area? You know how she sometimes says she looks tired even after sleeping well?\' This makes him an expert on HIS partner, not just an observer of your sale.',
        'APPEAL TO HIS LOGIC: A partner who has started doing sums out loud is not a top-of-the-ladder problem — by then you have already walked down, so answer him with the number you are actually standing on. \'One syringe is her whole year — about sixty treatments in there. At {currency}140 that is a bit over {currency}2 a go, and it is still working in June.\' Logic defuses skepticism.',
        'MAKE HIM THE HERO: Frame the purchase as something HE can give her. \'Imagine her waking up every morning looking this fresh — and she\'ll know it\'s because of you.\' Men love being the source of their partner\'s happiness.',
        'HUMOR DISARMS: A light joke directed at him breaks tension. \'Sir, don\'t worry — we\'re not changing her face, just making her eyes look like she slept twelve hours.\' Humor makes him smile, and a smiling man doesn\'t veto.'
      ],
      itemsEs: [
          'INCLÚYELO DESDE EL PRINCIPIO: No esperes hasta el cierre. Desde el momento en que están dentro, haz contacto visual con él. Pregúntale su opinión. "Señor, ¿ve lo que digo sobre el área del ojo? ¿Sabe cómo ella a veces dice que se ve cansada incluso después de dormir bien?" Esto lo convierte en experto sobre SU pareja, no solo en observador de tu venta.',
          'APELA A SU LÓGICA: Una pareja que se pone a echar cuentas en voz alta no es un problema de arriba de la escalera — a esas alturas ya has bajado, así que contéstale con el número en el que estás de verdad. "Una jeringa le dura el año entero — ahí dentro hay unos sesenta tratamientos. A {currency}140 sale a poco más de {currency}2 cada uno, y en junio sigue funcionando." La lógica desactiva el escepticismo.',
          'HÁZLO EL HÉROE: Presenta la compra como algo que ÉL puede darle. "Imagínatela despertando cada mañana viéndose así de fresca — y ella sabrá que es gracias a ti." A los hombres les encanta ser la fuente de la felicidad de su pareja.',
          'EL HUMOR DESARMA: Una broma ligera dirigida a él rompe la tensión. "Señor, no se preocupe — no le cambiamos la cara, solo hacemos que sus ojos se vean como si hubiera dormido doce horas." El humor lo hace sonreír, y un hombre que sonríe no veta.',
        ],
    },
    {
            type: 'script',
      text: '\'Sir, be honest — do you see the difference? Look at the lift, the smoothness. You\'re going home with a younger version of your wife!\' This makes him an active evaluator (his opinion matters) while framing the result as something he benefits from too.',
      textEs: '\'Señor, sea honesto — ¿ve la diferencia? Mire el lifting, la suavidad. ¡Se va a casa con una versión más joven de su esposa!\' Esto lo convierte en evaluador activo (su opinión importa) mientras presenta el resultado como algo de lo que él también se beneficia.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Body Language Between Couples',
      textEs: 'Lenguaje Corporal entre Parejas',
    },
    {
            type: 'paragraph',
      text: 'Couples communicate through body language constantly. Learn to read these signals:',
      textEs: 'Las parejas se comunican a través del lenguaje corporal constantemente. Aprende a leer estas señales:',
    },
    {
            type: 'bullets',
      items: [
        'POSITIVE SIGNALS: Standing close together, making eye contact with each other while you talk, one touching the other lightly while considering, both leaning in during the demo, shared smiles or laughter. These couples are likely to buy.',
        'NEGATIVE SIGNALS: Standing apart, crossed arms (especially the partner), checking phone while you talk, one person walking away to look at other products, eye-rolling, sighing. These are vetos in progress.',
        'MIXED SIGNALS: She\'s interested but he\'s checking his watch. She\'s asking questions but he\'s stepping back. This requires immediate intervention — engage the skeptical partner NOW before they veto.'
      ],
      itemsEs: [
          'SEÑALES POSITIVAS: Pararse cerca, hacerse contacto visual mientras hablas, uno tocando al otro ligeramente mientras consideran, ambos inclinándose durante la demo, sonrisas o risas compartidas. Estas parejas probablemente comprarán.',
          'SEÑALES NEGATIVAS: Pararse separados, brazos cruzados (especialmente la pareja), revisar el teléfono mientras hablas, una persona alejándose a ver otros productos, poner los ojos en blanco, suspirar. Estos son vetos en progreso.',
          'SEÑALES MIXTAS: Ella está interesada pero él revisa su reloj. Ella hace preguntas pero él se echa para atrás. Esto requiere intervención inmediata — involucra a la pareja escéptica AHORA antes de que vete.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Handling Different Couple Types',
      textEs: 'Manejando Diferentes Tipos de Pareja',
    },
    {
            type: 'bullets',
      items: [
        'THE ENTHUSIASTIC COUPLE: Both are interested, both ask questions. Easy mode — deliver your best pitch, give them space to discuss, and close naturally.',
        'THE INTERESTED WOMAN + RELUCTANT MAN: Common scenario. Your mission: convert him. Use logic, humor, and make him feel included. Don\'t let him feel like a wallet.',
        'THE INTERESTED MAN + OBSERVING WOMAN: Less common but happens. Men buying for their partners can be decisive. Make sure SHE likes it by involving her in the demo directly.',
        'THE FRIEND COUPLE: Two friends traveling together. Friend dynamics are social and fun. Group energy works — involve both, create a shared experience, suggest they both try it.'
      ],
      itemsEs: [
          'LA PAREJA ENTUSIASTA: Ambos están interesados, ambos hacen preguntas. Modo fácil — da tu mejor pitch, dales espacio para discutir, y cierra naturalmente.',
          'LA MUJER INTERESADA + HOMBRE RENUENTE: Escenario común. Tu misión: convértelo. Usa lógica, humor, y haz que se sienta incluido. No dejes que se sienta como una cartera.',
          'EL HOMBRE INTERESADO + MUJER OBSERVADORA: Menos común pero pasa. Los hombres comprando para sus parejas pueden ser decisivos. Asegúrate de que A ELLA le guste involucrándola directamente en la demo.',
          'LA PAREJA DE AMIGOS: Dos amigos viajando juntos. La dinámica de amigos es social y divertida. La energía de grupo funciona — involucra a ambos, crea una experiencia compartida, sugiere que ambos lo prueben.',
        ],
    },
    {
            type: 'tip',
      text: 'When a couple is deciding, GIVE THEM A BEAT — but give it to them at your table, not out on the pavement. Put the box in her hands, take half a step back, busy yourself with something. \'I\'m right here.\' Let them have the little conversation they need to have, because one of them nearly always talks the other into it. What you never do is send them off to have it somewhere else.',
      textEs: 'Cuando una pareja está decidiendo, DALES UN SEGUNDO — pero dáselo en tu mesa, no en mitad de la calle. Ponle la caja en las manos, medio paso atrás, y entretente con algo. "Estoy aquí mismo." Que tengan la conversación que necesitan tener, porque casi siempre uno convence al otro. Lo que no haces nunca es mandarlos a tenerla a otra parte.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Gift\' Angle for Couples',
      textEs: 'El Ángulo de \'Regalo\' para Parejas',
    },
    {
            type: 'paragraph',
      text: 'Couples are primed for gift purchases. Even when shopping for themselves, they often frame purchases as gifts to each other:',
      textEs: 'Las parejas están preparadas para compras de regalos. Incluso cuando compran para ellos mismos, a menudo presentan las compras como regalos mutuos:',
    },
    {
            type: 'script',
      text: '\'This would make an incredible Christmas gift for her — but honestly? Use it together. The Scrub and Body Butter work for men too. Make it a couples\' spa night at home.\' This transforms a single purchase into a shared experience and removes the \'selfish purchase\' barrier.',
      textEs: '\'Esto sería un regalo de Navidad increíble para ella — pero ¿honestamente? Usadlo juntos. El Scrub y la Body Butter también funcionan para hombres. Hagan una noche de spa en casa.\' Esto transforma una compra individual en una experiencia compartida y elimina la barrera de la \'compra egoísta\'.',
    },
    {
            type: 'quote',
      text: 'The couple isn\'t two individual sales. It\'s one sale with two gatekeepers. Unlock both, and the sale opens.',
      textEs: 'La pareja no son dos ventas individuales. Es una venta con dos guardias. Desbloquea a ambos, y la venta se abre.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'How can you identify who the actual decision-maker is in a couple?',
      options: [
        'The person who talks the most is always the decision-maker',
        'Watch who the driver looks at after your pitch — if they seek eye contact, that person decides',
        'The man always decides',
        'The person who walks into the shop first decides'
      ],
      correctIndex: 1,
      explanation: 'The person doing most of the talking (the driver) often seeks eye contact with their partner after your pitch. If they look to their partner and ask \'What do you think?\' — that partner is the decision-maker.',
    },
    {
      question: 'What is the best way to engage a skeptical male partner?',
      options: [
        'Ignore him and focus entirely on the woman',
        'Include him early, appeal to logic, make him feel like his opinion matters',
        'Tell him the price first to see if he can afford it',
        'Make him feel guilty for not buying'
      ],
      correctIndex: 1,
      explanation: 'Engage the skeptical partner early, appeal to his logic with practical benefits, and make him feel like his opinion matters. Transform him from potential veto into active supporter.',
    },
    {
      question: 'Why is giving a couple space after presenting the offer important?',
      options: [
        'It shows you don\'t care about the sale',
        'It lets them have a private conversation where one often convinces the other',
        'It gives you time to approach other customers',
        'Couples never buy immediately'
      ],
      correctIndex: 1,
      explanation: 'After presenting the offer, stepping back lets the couple have a private conversation. Often one partner convinces the other during that 30-second gap. Hovering creates pressure that kills this natural persuasion process.',
    }
    ],
  },
  'connect-5': {
    id: 'connect-5',
    categoryId: 'connecting',
    title: 'Building Instant Rapport',
    titleEs: 'Construyendo Rapidez Instantánea',
    subtitle: '10 specific techniques to connect with anyone in 60 seconds',
    subtitleEs: '10 técnicas específicas para conectar con cualquiera en 60 segundos',
    duration: '10 min',
    icon: 'MessageCircle',
    order: 5,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Rapport Is the Bridge Between Stranger and Customer',
      textEs: 'El Rapport Es el Puente Entre Extraño y Cliente',
    },
    {
            type: 'paragraph',
      text: 'Rapport is that magical moment when a stranger shifts from \'Who is this person talking to me?\' to \'I like this person, I\'ll hear them out.\' It happens fast — within 30 to 60 seconds — and once established, it transforms the entire interaction. Without rapport, you\'re a salesperson. With rapport, you\'re a friendly expert they trust.',
      textEs: 'El rapport es ese momento mágico cuando un extraño pasa de \'¿Quién es esta persona que me habla?\' a \'Me cae bien esta persona, le voy a escuchar.\' Sucede rápido — en 30 a 60 segundos — y una vez establecido, transforma toda la interacción. Sin rapport, eres un vendedor. Con rapport, eres un experto amigable en quien confían.',
    },
    {
            type: 'keypoint',
      text: 'Rapport isn\'t one technique — it\'s a combination of signals that tell the customer\'s brain: \'This person is safe. This person is like me. This person cares.\' Stack multiple rapport techniques for maximum effect.',
      textEs: 'El rapport no es una sola técnica — es una combinación de señales que le dicen al cerebro del cliente: \'Esta persona es segura. Esta persona es como yo. A esta persona le importo.\' Combina múltiples técnicas de rapport para máximo efecto.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Technique 1: Mirroring',
      textEs: 'Técnica 1: El Espejo',
    },
    {
            type: 'paragraph',
      text: 'Mirroring is subtly matching the customer\'s body language, speech pace, energy level, and vocabulary. When done naturally (not mimicry), it creates subconscious similarity. The customer\'s brain registers: \'This person is like me.\'',
      textEs: 'El espejo es emparejar sutilmente el lenguaje corporal, ritmo de habla, nivel de energía y vocabulario del cliente. Cuando se hace de forma natural (no mimica), crea una similitud subconsciente. El cerebro del cliente registra: \'Esta persona es como yo.\'',
    },
    {
            type: 'bullets',
      items: [
        'BODY LANGUAGE: If they stand with hands in pockets, relax your arms. If they lean in during the demo, lean in too. Match their posture generally.',
        'SPEECH PACE: Fast talker? Speed up slightly. Slow, measured speaker? Slow down. Matching pace creates conversational harmony.',
        'ENERGY LEVEL: Enthusiastic customer? Match their enthusiasm. Reserved customer? Warm but calm. Energy mismatch creates discomfort.',
        'VOCABULARY: If they say \'cream,\' say \'cream.\' If they say \'moisturizer,\' say \'moisturizer.\' Using their words shows you listen.'
      ],
      itemsEs: [
          'LENGUAJE CORPORAL: Si se paran con las manos en los bolsillos, relaja tus brazos. Si se inclinan durante la demostración, inclínate tú también. Empareja su postura en general.',
          'RITMO DE HABLA: ¿Habla rápido? Acelera un poco. ¿Habla lento y pausado? Baja el ritmo. Emparejar el ritmo crea armonía en la conversación.',
          'NIVEL DE ENERGÍA: ¿Cliente entusiasta? Empareja su entusiasmo. ¿Cliente reservado? Cálido pero calmado. El desajuste de energía genera incomodidad.',
          'VOCABULARIO: Si dicen \'crema\', di \'crema\'. Si dicen \'hidratante\', di \'hidratante\'. Usar sus palabras demuestra que escuchas.',
        ],
    },
    {
            type: 'tip',
      text: 'Mirroring should feel natural, not obvious. Wait 2-3 seconds after they change posture, then shift yours. If they notice you\'re copying them, it backfires completely. Subtlety is everything.',
      textEs: 'El espejo debe sentirse natural, no obvio. Espera 2-3 segundos después de que cambien de postura, y luego ajusta la tuya. Si se dan cuenta de que los estás copiando, tiene el efecto contrario. La sutileza lo es todo.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Technique 2: Name Usage',
      textEs: 'Técnica 2: Usar el Nombre',
    },
    {
            type: 'paragraph',
      text: 'A person\'s name is the sweetest sound in any language. When you learn their name, use it naturally 2-3 times during the interaction. Not excessively — that feels manipulative — but enough to create personal connection.',
      textEs: 'El nombre de una persona es el sonido más dulce en cualquier idioma. Cuando sepas su nombre, úsalo de forma natural 2-3 veces durante la interacción. No en exceso — eso se siente manipulador — pero lo suficiente para crear conexión personal.',
    },
    {
            type: 'script',
      text: '\'Maria, come look in the mirror — you won\'t believe what you see.\' \'So Maria, which option feels better for you?\' \'It was wonderful meeting you, Maria. Enjoy {locationName}!\' Three uses: one during the experience, one during the close, one at goodbye. Perfect.',
      textEs: '\'María, ven a ver el espejo — no vas a creer lo que ves.\' \'Entonces, María, ¿cuál opción se siente mejor para ti?\' \'Fue un placer conocerte, María. ¡Disfruta {locationName}!\' Tres usos: uno durante la experiencia, uno durante el cierre, uno en la despedida. Perfecto.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Technique 3: Genuine Compliments',
      textEs: 'Técnica 3: Cumplidos Genuinos',
    },
    {
            type: 'paragraph',
      text: 'A compliment does two jobs at once: it is a nice thing to hear, and it makes them answer you. \'You look so good — what do you normally use on your skin?\' cannot be answered with a yes or a no. That is why it stops people when \'excuse me, madam\' does not.',
      textEs: 'Un cumplido hace dos cosas a la vez: es agradable de oír y les obliga a contestarte. \'Te veo muy bien, ¿qué usas normalmente para la piel?\' no se contesta con un sí o un no. Por eso para a la gente cuando \'perdone, señora\' no la para.',
    },
    {
            type: 'bullets',
      items: [
        'TELL THEM THEY LOOK GOOD: Straight out. \'Listen, I know you\'re in a rush — but can I ask you something really quick? It\'s just that you look so good, I have to ask what you normally use on your skin.\' It works because it is warm and it is fast, and because the tail on the end cannot be answered with a nod. It is the best opening line on this street.',
        'OR PICK SOMETHING THEY CHOSE: The scarf, the coat, the bag, the nails. Works just as well and you can see it from three metres. Use whichever one you spot first — do not stand there hunting for the perfect one.',
        'THE ONLY ONES THAT GO WRONG: Anything you would not say with their husband standing next to you — weight, age, anything about their body. That is the whole rule; everything else is fair. Then: eye contact, smile, say it, move. Do not hang about waiting for a thank you.'
      ],
      itemsEs: [
          'DILES QUE ESTÁN GUAPÍSIMAS: A pelo. \'Mira, sé que vas con prisa — ¿pero te puedo preguntar una cosa rapidísima? Es que te veo tan bien que tengo que preguntarte qué usas normalmente para la piel.\' Funciona porque es cálido y es rápido, y porque el final no se contesta con un gesto de cabeza. Es la mejor apertura de esta calle.',
          'O ALGO QUE HAYAN ELEGIDO ELLAS: El pañuelo, el abrigo, el bolso, las uñas. Funciona igual de bien y lo ves desde tres metros. Usa lo primero que pilles — no te quedes ahí buscando el detalle perfecto.',
          'LAS ÚNICAS QUE SALEN MAL: Cualquier cosa que no dirías con su marido al lado — el peso, la edad, nada del cuerpo. Esa es toda la norma; el resto vale. Y luego: mirada, sonrisa, lo dices y sigues. No te quedes ahí esperando las gracias.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Technique 4: Finding Common Ground',
      textEs: 'Técnica 4: Encontrar Terreno Común',
    },
    {
            type: 'paragraph',
      text: 'Shared experiences create instant connection. Travelers in {locationName} have common ground waiting to be discovered:',
      textEs: 'Las experiencias compartidas crean conexión instantánea. Los viajeros en {locationName} tienen terreno común esperando ser descubierto:',
    },
    {
            type: 'bullets',
      items: [
        'THE LOCATION: \'Is this your first time in {locationName}? I love it here — I never get tired of this place.\'',
        'THE WEATHER: \'Beautiful day for shopping! Better than yesterday\'s rain, right?\'',
        'SHARED ORIGINS: \'Oh, you\'re from Madrid? I have family there!\' Even distant connections create bonds.',
        'THE EXPERIENCE: \'Everyone who tries this is shocked — you\'re going to have the same reaction.\' Shared anticipation of the demo result.'
      ],
      itemsEs: [
          'EL LUGAR: \'¿Es tu primera vez en {locationName}? Me encanta esto — no me canso de este sitio.\'',
          'EL CLIMA: \'¡Hermoso día para comprar! Mejor que la lluvia de ayer, ¿o no?\'',
          'ORÍGENES COMPARTIDOS: \'Oh, ¿eres de Madrid? ¡Tengo familia ahí!\' Incluso las conexiones lejanas crean lazos.',
          'LA EXPERIENCIA: \'Todos los que prueban esto se sorprenden — vas a tener la misma reacción.\' La anticipación compartida del resultado de la demostración.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Technique 5: Humor',
      textEs: 'Técnica 5: Humor',
    },
    {
            type: 'paragraph',
      text: 'Humor breaks tension, creates positive emotion, and makes you memorable. The key is LIGHT humor — nothing edgy, political, or potentially offensive. Self-deprecating humor is safest and most disarming.',
      textEs: 'El humor rompe la tensión, crea emoción positiva y te hace memorable. La clave es humor LIGERO — nada atrevido, político o potencialmente ofensivo. El humor autocrítico es el más seguro y el más desarmante.',
    },
    {
            type: 'script',
      text: '\'I promise this is worth two minutes of your time. If you don\'t love it, you can tell me I\'m terrible at my job.\' \'Promise not to scream when you see this result — my last customer actually did, and her husband got jealous.\' Humor makes people smile, and smiling people buy.',
      textEs: '\'Te prometo que esto vale dos minutos de tu tiempo. Si no te encanta, puedes decirme que soy terrible en mi trabajo.\' \'Promete no gritar cuando veas este resultado — mi última cliente en realidad lo hizo, y su esposo se puso celoso.\' El humor hace que la gente sonría, y la gente que sonríe compra.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Techniques 6-10: Advanced Rapport Builders',
      textEs: 'Técnicas 6-10: Constructores Avanzados de Rapport',
    },
    {
            type: 'bullets',
      items: [
        '6. VULNERABILITY: Brief, genuine honesty creates deep trust. \'When I first started, I didn\'t believe the hype either. Then I tried it myself and became obsessed.\' This shows you\'re a real person, not a sales robot.',
        '7. CURIOSITY: Ask questions that show genuine interest in THEM, not just their wallet. \'What do you usually use on your skin? You clearly take care of yourself.\' People love talking about themselves.',
        '8. AGREEMENT FRAMES: Start with something they can\'t disagree with. \'{locationName} is beautiful, isn\'t it?\' \'You clearly have great taste.\' \'Taking care of your skin is important.\' Each agreement creates momentum toward the sale.',
        '9. STORYTELLING: Share a 30-second story about another customer. \'A woman came in yesterday saying she\'d think about it. She came back an hour later and bought two for her sisters.\' Stories bypass skepticism and go straight to imagination.',
        '10. APPROPRIATE TOUCH: A light hand on the forearm during a key moment, or guiding their hand during the demo. Only when rapport is established and culturally appropriate. Touch accelerates trust when done right, destroys it when done wrong.'
      ],
      itemsEs: [
          '6. VULNERABILIDAD: La honestidad breve y genuina crea confianza profunda. \'Cuando empecé, yo tampoco me creía el hype. Luego lo probé yo misma y me obsesioné.\' Esto demuestra que eres una persona real, no un robot de ventas.',
          '7. CURIOSIDAD: Haz preguntas que demuestren interés genuino en ELLOS, no solo en su cartera. \'¿Qué sueles usar en tu piel? Claramente te cuidas.\' A la gente le encanta hablar de sí misma.',
          '8. MARCOS DE ACUERDO: Empieza con algo con lo que no puedan estar en desacuerdo. \'{locationName} es hermosa, ¿o no?\' \'Claramente tienes excelente gusto.\' \'Cuidar tu piel es importante.\' Cada acuerdo crea impulso hacia la venta.',
          '9. NARRACIÓN: Comparte una historia de 30 segundos sobre otro cliente. \'Una mujer vino ayer diciendo que lo pensaría. Volvió una hora después y compró dos para sus hermanas.\' Las historias evaden el escepticismo y van directo a la imaginación.',
          '10. TOQUE APROPIADO: Una mano ligera en el antebrazo durante un momento clave, o guiando su mano durante la demostración. Solo cuando el rapport está establecido y es culturalmente apropiado. El toque acelera la confianza cuando se hace bien, la destruye cuando se hace mal.',
        ],
    },
    {
            type: 'tip',
      text: 'Rapport is not a script — it\'s a state of being. The most powerful rapport tool is genuine LIKING. Actually care about the person in front of you. Be curious about their life. When your interest is real, everything else falls into place.',
      textEs: 'El rapport no es un guion — es un estado de ser. La herramienta de rapport más poderosa es el genuino AGRADO. Realmente impórtate por la persona frente a ti. Sé curioso sobre su vida. Cuando tu interés es real, todo lo demás cae en su lugar.',
    },
    {
            type: 'quote',
      text: 'People don\'t care how much you know until they know how much you care. Rapport is the proof of caring.',
      textEs: 'La gente no le importa cuánto sabes hasta que sabe cuánto te importa. El rapport es la prueba de que te importa.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'What makes a compliment feel genuine rather than fake?',
      options: [
        'Using more elaborate words',
        'Being specific about something the person chose',
        'Complimenting their physical body',
        'Complimenting them multiple times rapidly'
      ],
      correctIndex: 1,
      explanation: 'Specific compliments about choices people make (accessories, style, grooming) feel observant and real. Generic or physical compliments often feel fake or inappropriate.',
    },
    {
      question: 'How should mirroring be done to avoid detection?',
      options: [
        'Copy their movements immediately and exactly',
        'Wait 2-3 seconds after they shift, then adjust your posture subtly',
        'Mirror only their speech, not body language',
        'Tell them you\'re mirroring to build rapport'
      ],
      correctIndex: 1,
      explanation: 'Mirroring should be delayed by 2-3 seconds and done subtly. Immediate, exact copying feels like mimicry and backfires. Natural, delayed matching creates subconscious similarity.',
    },
    {
      question: 'Which type of humor is safest and most disarming in sales?',
      options: [
        'Political humor',
        'Self-deprecating humor',
        'Sarcasm about the customer',
        'Edgy jokes'
      ],
      correctIndex: 1,
      explanation: 'Self-deprecating humor is safest because it shows confidence and vulnerability without risking offense. Political, sarcastic, or edgy humor can alienate customers.',
    }
    ],
  },
  'connect-6': {
    id: 'connect-6',
    categoryId: 'connecting',
    title: 'Asking Questions That Reveal Everything',
    titleEs: 'Haciendo Preguntas que lo Revelan Todo',
    subtitle: 'Open vs closed questions, the question ladder, and avoiding interrogation mode',
    subtitleEs: 'La curiosidad gana más que el carisma',
    duration: '8 min',
    icon: 'MessageCircle',
    order: 6,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Questions Are Your Intelligence-Gathering Tool',
      textEs: 'Las Preguntas Son Tu Herramienta de Recolección de Inteligencia',
    },
    {
            type: 'paragraph',
      text: 'The salesperson who asks the best questions learns the most. And the salesperson who learns the most sells the most. Questions reveal spending power, skin concerns, buying motivation, decision dynamics, and objections — all before you present the offer. Master question-asking and you\'ll never be surprised by a \'no.\'',
      textEs: 'El vendedor que hace las mejores preguntas aprende más. Y el vendedor que más aprende, más vende. Las preguntas revelan poder adquisitivo, preocupaciones de la piel, motivación de compra, dinámicas de decisión y objeciones — todo antes de presentar la oferta. Domina el arte de preguntar y nunca te sorprenderá un \'no\'.',
    },
    {
            type: 'keypoint',
      text: 'Your goal with questions isn\'t interrogation — it\'s conversation. Questions should feel natural, flow with the chat, and make the customer feel understood, not interviewed.',
      textEs: 'Tu objetivo con las preguntas no es un interrogatorio — es conversación. Las preguntas deben sentirse naturales, fluir con la charla, y hacer que el cliente se sienta entendido, no entrevistado.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Open vs. Closed Questions',
      textEs: 'Preguntas Abiertas vs. Cerradas',
    },
    {
            type: 'comparison',
      left: { label: 'Closed Questions (Weak)', text: '\'Do you use cream?\' — Yes/No answer. Ends conversation. Reveals nothing. \'Are you enjoying your holiday?\' — \'Yes.\' Nowhere to go next. \'Have you been to {locationName} before?\' — \'Yes.\' Nothing to work with.' },
      leftEs: { label: 'Preguntas Cerradas (Débiles)', text: '\'¿Usas crema?\' — Respuesta sí/no. Termina la conversación. No revela nada. \'¿Estás disfrutando las vacaciones?\' — \'Sí.\' No hay por dónde seguir. \'¿Has estado en {locationName} antes?\' — \'Sí.\' Nada con qué trabajar.' },
      right: { label: 'Open Questions (Powerful)', text: '\'What do you use on your skin?\' — Reveals routine, spending, and concerns. \'What do you think of the result?\' — Gets them talking about feelings. \'What brings you to {locationName}?\' — Opens connection opportunities.' },
      rightEs: { label: 'Preguntas Abiertas (Potentes)', text: '\'¿Qué usas para la piel?\' — Revela rutina, gasto y preocupaciones. \'¿Qué te parece el resultado?\' — Les hace hablar de lo que sienten. \'¿Qué te trae por {locationName}?\' — Abre oportunidades de conexión.' }
    },
    {
            type: 'tip',
      text: 'Start with open questions. Use closed questions only to confirm what you\'ve learned (\'So you use a night cream already — that\'s great\'). Open questions gather intelligence; closed questions confirm understanding.',
      textEs: 'Empieza con preguntas abiertas. Usa preguntas cerradas solo para confirmar lo que has aprendido (\'Así que ya usas una crema de noche — eso es genial\'). Las preguntas abiertas recopilan inteligencia; las preguntas cerradas confirman entendimiento.',
    },
    {
            type: 'keypoint',
      text: 'ONE BIG EXCEPTION, and it is the most important question in the shop. In the demo, with the mirror in her hand, you ask \'Do you like it?\' and then \'If you had it at home, would you use it?\' — both closed, both on purpose. You are not after a conversation there. You are after the word yes, out loud, in her own voice, because in two minutes you are going to hand it straight back to her. Open questions are for the pavement, where you are still learning who she is. The two yeses are for the chair, where you are putting something on the record. See The Demo And The Two Yeses.',
      textEs: 'UNA EXCEPCIÓN GRANDE, y es la pregunta más importante de la tienda. En la demo, con el espejo en su mano, le preguntas \'¿Te gusta?\' y luego \'¿Si lo tuvieras en casa, lo usarías?\' — las dos cerradas, y a propósito. Ahí no buscas conversación. Buscas la palabra sí, en voz alta, con su propia voz, porque dentro de dos minutos se la vas a devolver. Las preguntas abiertas son para la acera, donde todavía estás averiguando quién es. Los dos síes son para la silla, donde estás dejando algo grabado. Mira La Demo y los Dos Síes.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Question Ladder: From Surface to Deep',
      textEs: 'La Escalera de Preguntas: De Superficial a Profundo',
    },
    {
            type: 'paragraph',
      text: 'Don\'t start with personal questions. Build from light to deep, like climbing a ladder. Each level requires trust earned at the previous level.',
      textEs: 'No empieces con preguntas personales. Construye de ligero a profundo, como subir una escalera. Cada nivel requiere la confianza ganada en el nivel anterior.',
    },
    {
            type: 'numbered',
      items: [
        'LEVEL 1 — OBSERVATIONAL (0-30 seconds): \'I love your scarf — is that from a local designer?\' \'How\'s your day in {locationName} going?\' Light, surface-level, easy to answer. Creates initial comfort.',
        'LEVEL 2 — CONTEXTUAL (30 seconds - 2 minutes): \'What brings you to {locationName}?\' \'Are you here for skiing or shopping?\' \'What do you usually use on your skin?\' Slightly more personal but still easy. Reveals context.',
        'LEVEL 3 — PERSONAL (2-5 minutes): \'What are your main skin concerns?\' \'How much time do you spend on your skincare routine?\' \'When was the last time you really treated yourself?\' Requires some trust. Reveals motivation and concerns.',
        'LEVEL 4 — DECISION-ORIENTED (During the close): \'Which option feels better for you?\' \'What would make this perfect for you?\' \'If price weren\'t an issue, which would you choose?\' Reveals objections and buying signals.'
      ],
      itemsEs: [
          'NIVEL 1 — OBSERVACIONAL (0-30 segundos): \'Me encanta tu bufanda — ¿es de un diseñador local?\' \'¿Cómo va tu día en {locationName}?\' Ligero, superficial, fácil de responder. Crea comodidad inicial.',
          'NIVEL 2 — CONTEXTUAL (30 segundos - 2 minutos): \'¿Qué te trae a {locationName}?\' \'¿Estás aquí para esquiar o de compras?\' \'¿Qué sueles usar en tu piel?\' Un poco más personal pero aún fácil. Revela contexto.',
          'NIVEL 3 — PERSONAL (2-5 minutos): \'¿Cuáles son tus principales preocupaciones de piel?\' \'¿Cuánto tiempo dedicas a tu rutina de cuidado de la piel?\' \'¿Cuándo fue la última vez que realmente te consentiste?\' Requiere algo de confianza. Revela motivación y preocupaciones.',
          'NIVEL 4 — ORIENTADO A LA DECISIÓN (Durante el cierre): \'¿Cuál opción se siente mejor para ti?\' \'¿Qué haría esto perfecto para ti?\' \'Si el precio no fuera un problema, ¿cuál elegirías?\' Revela objeciones y señales de compra.',
        ],
    },
    {
            type: 'tip',
      text: 'Never skip levels. Asking a Level 3 question (\'What are your main skin concerns?\') before establishing any rapport feels invasive. Climb the ladder naturally.',
      textEs: 'Nunca te saltes niveles. Hacer una pregunta de Nivel 3 (\'¿Cuáles son tus principales preocupaciones de piel?\') antes de establecer cualquier rapport se siente invasivo. Sube la escalera naturalmente.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Questions That Make Them Feel Smart',
      textEs: 'Preguntas Que Los Hacen Sentir Inteligentes',
    },
    {
            type: 'paragraph',
      text: 'The best questions elevate the customer. They make the person feel knowledgeable, sophisticated, and perceptive. When someone feels smart, they\'re more confident — and confident buyers spend more.',
      textEs: 'Las mejores preguntas elevan al cliente. Hacen que la persona se sienta conocedora, sofisticada y perceptiva. Cuando alguien se siente inteligente, está más seguro — y los compradores seguros gastan más.',
    },
    {
            type: 'bullets',
      items: [
        '\'You clearly take care of your skin — what products do you swear by?\' — Acknowledges their expertise while gathering data.',
        '\'I can tell you know quality — what do you look for in skincare?\' — Flatters their discernment.',
        '\'Most people don\'t know this, but the Dead Sea minerals are the most concentrated on Earth. Have you heard about them before?\' — Gives them a chance to show knowledge OR learn something impressive.',
        '\'You seem like someone who does their research. What have you heard about collagen treatments?\' — Positions them as informed and thoughtful.'
      ],
      itemsEs: [
          '\'Claramente cuidas tu piel — ¿en qué productos confías?\' — Reconoce su experiencia mientras recopilas datos.',
          '\'Se nota que conoces la calidad — ¿qué buscas en el cuidado de la piel?\' — Halaga su discernimiento.',
          '\'La mayoría no lo sabe, pero los minerales del Mar Muerto son los más concentrados de la Tierra. ¿Habías escuchado sobre ellos?\' — Les da la oportunidad de demostrar conocimiento O aprender algo impresionante.',
          '\'Pareces alguien que investiga. ¿Qué has escuchado sobre los tratamientos de colágeno?\' — Los posiciona como informados y reflexivos.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Questions to Uncover Objections Early',
      textEs: 'Preguntas Para Descubrir Objeciones a Tiempo',
    },
    {
            type: 'paragraph',
      text: 'If you know the objection before you present the offer, you can address it proactively. These questions reveal hidden concerns:',
      textEs: 'Si conoces la objeción antes de presentar la oferta, puedes abordarla proactivamente. Estas preguntas revelan preocupaciones ocultas:',
    },
    {
            type: 'bullets',
      items: [
        '\'When you buy skincare, what matters most to you — ingredients, results, or value?\' — Reveals their buying criteria.',
        '\'Are you shopping for yourself or looking for gifts too?\' — Reveals budget flexibility and motivation.',
        '\'What\'s your usual budget range for skincare treatments?\' — Direct but effective when asked warmly after rapport is built.',
        '\'Have you tried anything like this before? What was your experience?\' — Reveals past objections and expectations.'
      ],
      itemsEs: [
          '\'Cuando compras productos de cuidado de la piel, ¿qué es lo más importante para ti — ingredientes, resultados o valor?\' — Revela sus criterios de compra.',
          '\'¿Estás comprando para ti o también buscando regalos?\' — Revela flexibilidad de presupuesto y motivación.',
          '\'¿Cuál es tu rango de presupuesto habitual para tratamientos de cuidado de la piel?\' — Directo pero efectivo cuando se pregunta cálidamente después de haber construido rapport.',
          '\'¿Has probado algo como esto antes? ¿Cuál fue tu experiencia?\' — Revela objeciones y expectativas pasadas.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Avoiding Interrogation Mode',
      textEs: 'Evitando el Modo Interrogatorio',
    },
    {
            type: 'paragraph',
      text: 'Questions can backfire if they feel like an interview. Here\'s how to keep it conversational:',
      textEs: 'Las preguntas pueden tener efecto contrario si se sienten como una entrevista. Aquí te decimos cómo mantenerlo conversacional:',
    },
    {
            type: 'bullets',
      items: [
        'SHARE BETWEEN QUESTIONS: Don\'t ask three questions in a row. Share something about yourself or the product between each question. It should feel like a conversation, not a survey.',
        'USE STATEMENTS INSTEAD: Instead of \'Do you have dry skin?\' say \'The mountain air here can really dry out your skin.\' This invites them to respond without feeling questioned.',
        'FOLLOW THE THREAD: When they mention something interesting, follow it. Don\'t rigidly stick to your question list. If they mention their daughter, ask about her. That\'s where the real connection lives.',
        'KEEP IT LIGHT: Heavy, serious questioning creates pressure. Maintain a warm, playful tone throughout.'
      ],
      itemsEs: [
          'COMPARTE ENTRE PREGUNTAS: No hagas tres preguntas seguidas. Comparte algo sobre ti o el producto entre cada pregunta. Debe sentirse como una conversación, no una encuesta.',
          'USA DECLARACIONES EN LUGAR DE PREGUNTAS: En vez de \'¿Tienes la piel seca?\' di \'El aire de montaña aquí puede resecar mucho la piel.\' Esto los invita a responder sin sentirse cuestionados.',
          'SIGUE EL HILO: Cuando mencionen algo interesante, síguelo. No te aferres rígido a tu lista de preguntas. Si mencionan a su hija, pregunta por ella. Ahí es donde vive la conexión real.',
          'MÁNTENLO LIGERO: Un cuestionamiento pesado y serio crea presión. Mantén un tono cálido y juguetón durante todo el proceso.',
        ],
    },
    {
            type: 'script',
      text: '\'So what brings you to {locationName}?\' — \'A few days away with my husband.\' — \'Oh amazing! Where are you staying? I love it here. And after a full day out, your skin must be so dry — travelling is brutal on it. What do you usually use to rehydrate?\' See how each question follows naturally from the last? That\'s conversational questioning.',
      textEs: '\'Entonces, ¿qué te trae a {locationName}?\' — \'Unos días fuera con mi marido.\' — \'¡Ah, qué bien! ¿Dónde os alojáis? Me encanta esto. Y después de un día entero fuera, tu piel debe de estar resecísima — viajar es brutal para la piel. ¿Qué sueles usar para rehidratar?\' ¿Ves cómo cada pregunta sigue naturalmente de la anterior? Eso es cuestionar de forma conversacional.',
    },
    {
            type: 'quote',
      text: 'The best salespeople don\'t talk customers into buying. They ask customers into revealing what they truly want. Then they simply provide it.',
      textEs: 'Los mejores vendedores no convencen a los clientes para que compren. Le preguntan a los clientes hasta revelar lo que realmente quieren. Y luego simplemente se lo proporcionan.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'What is the main difference between open and closed questions?',
      options: [
        'Open questions are longer',
        'Open questions invite detailed responses and reveal information; closed questions get yes/no answers',
        'Closed questions are more polite',
        'Open questions are only for experienced sellers'
      ],
      correctIndex: 1,
      explanation: 'Open questions (What, How, Why) invite detailed responses that reveal information. Closed questions (Do, Are, Have) get yes/no answers that end conversation.',
    },
    {
      question: 'What does the \'question ladder\' refer to?',
      options: [
        'Asking as many questions as possible',
        'Building from light surface questions to deeper personal ones as trust develops',
        'Only asking questions about the product',
        'A specific list of 10 questions every seller must ask'
      ],
      correctIndex: 1,
      explanation: 'The question ladder means starting with light observational questions, then moving to contextual, personal, and finally decision-oriented questions as trust builds. Skipping levels feels invasive.',
    },
    {
      question: 'How can you avoid \'interrogation mode\' when asking questions?',
      options: [
        'Only ask one question per interaction',
        'Share information between questions and follow conversational threads naturally',
        'Write all questions down and read them',
        'Avoid questions altogether'
      ],
      correctIndex: 1,
      explanation: 'Avoid interrogation by sharing between questions, following conversational threads (not rigid lists), using statements that invite response, and keeping the tone light and warm.',
    }
    ],
  },
  'connect-7': {
    id: 'connect-7',
    categoryId: 'connecting',
    title: 'Spotting Buying Signals',
    titleEs: 'Detectar Señales de Compra',
    subtitle: 'Body language and verbal cues that scream \'I\'m ready to buy\'',
    subtitleEs: 'Gestos y frases que gritan \'estoy lista para comprar\'',
    duration: '8 min',
    icon: 'Target',
    order: 7,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'The Customer Is Always Telling You What They Want — If You\'re Listening',
      textEs: 'El Cliente Siempre Te Está Diciendo Lo Que Quiere — Si Estás Escuchando',
    },
    {
            type: 'paragraph',
      text: 'The biggest mistake in sales is talking past the buying signal. The customer leans in, touches the product, asks about price — and the salesperson keeps pitching instead of closing. Buying signals are the green lights of sales. They tell you the customer is ready. Your job is to see them and act.',
      textEs: 'El error más grande en ventas es seguir hablando después de la señal de compra. El cliente se inclina, toca el producto, pregunta por el precio — y el vendedor sigue presentando en vez de cerrar. Las señales de compra son las luces verdes de las ventas. Te dicen que el cliente está listo. Tu trabajo es verlas y actuar.',
    },
    {
            type: 'keypoint',
      text: 'Buying signals happen before the customer verbally commits. If you wait for them to say \'I\'ll take it,\' you\'ve waited too long. Close when you SEE the signal, not when you HEAR the decision.',
      textEs: 'Las señales de compra suceden antes de que el cliente se comprometa verbalmente. Si esperas a que digan \'Me lo llevo\', has esperado demasiado. Cierra cuando VEAS la señal, no cuando ESCUCHES la decisión.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Physical Buying Signals',
      textEs: 'Señales de Compra Físicas',
    },
    {
            type: 'paragraph',
      text: 'The body reveals the decision before the mouth does. Watch for these physical cues:',
      textEs: 'El cuerpo revela la decisión antes que la boca. Estate atento a estas señales físicas:',
    },
    {
            type: 'bullets',
      items: [
        'LEANING IN: When a customer physically moves closer to you, the product, or the mirror, they\'re interested. Leaning back or stepping away means resistance. Leaning in means engagement.',
        'TOUCHING THE FACE: Touching cheeks, chin, or under the eyes while looking at the product or mirror = they\'re imagining themselves using it. This is one of the strongest positive signals.',
        'HOLDING THE PRODUCT: If they pick up the bottle, read the label, or turn it over in their hands, they\'re taking ownership mentally. Encourage this — let them hold it.',
        'MIRROR CHECKING: Looking at themselves in the mirror repeatedly during or after the demo is a strong buying signal. They like what they see and are imagining the result.',
        'RELAXED SHOULDERS: Tense shoulders signal hesitation. When shoulders drop and relax, resistance is dropping too.',
        'OPEN PALMS: Showing open palms while discussing the product indicates openness and receptivity. Closed fists or crossed arms signal the opposite.',
        'NODDING: Nodding while you speak (especially during the offer) indicates agreement. Multiple nods = building commitment.'
      ],
      itemsEs: [
          'INCLINARSE HACIA ADELANTE: Cuando un cliente se acerca físicamente a ti, al producto o al espejo, está interesado. Inclinarse hacia atrás o alejarse significa resistencia. Inclinarse hacia adelante significa compromiso.',
          'TOCARSE LA CARA: Tocarse las mejillas, la barbilla o debajo de los ojos mientras miran el producto o el espejo = se están imaginando usándolo. Esta es una de las señales positivas más fuertes.',
          'SOSTENER EL PRODUCTO: Si toman el frasco, leen la etiqueta o lo giran en sus manos, se están apropiando mentalmente. Anima esto — déjalos sostenerlo.',
          'REVISARSE EN EL ESPEJO: Mirarse en el espejo repetidamente durante o después de la demostración es una fuerte señal de compra. Les gusta lo que ven y se están imaginando el resultado.',
          'HOMBROS RELAJADOS: Hombros tensos señalan duda. Cuando los hombros bajan y se relajan, la resistencia también disminuye.',
          'PALMAS ABIERTAS: Mostrar las palmas abiertas mientras discuten el producto indica apertura y receptividad. Puños cerrados o brazos cruzados señalan lo opuesto.',
          'ASENTIR: Asentir mientras hablas (especialmente durante la oferta) indica acuerdo. Múltiples asentimientos = construyendo compromiso.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Verbal Buying Signals',
      textEs: 'Señales de Compra Verbales',
    },
    {
            type: 'paragraph',
      text: 'Words are data. These phrases almost always indicate buying intent:',
      textEs: 'Las palabras son datos. Estas frases casi siempre indican intención de compra:',
    },
    {
            type: 'bullets',
      items: [
        '\'HOW LONG DOES IT LAST?\' — They\'re calculating value per use. This is a value-oriented buyer calculating ROI.',
        '\'DO YOU SHIP?\' — They\'re imagining owning it but worried about logistics. Solve the logistics, close the sale.',
        '\'HOW OFTEN DO I USE IT?\' — They\'re fitting it into their lifestyle. Mental ownership has begun.',
        '\'WHAT DO YOU THINK?\' (to partner) — They\'re seeking validation for a decision they\'ve already made. Engage the partner positively.',
        '\'CAN I GET THIS IN...?\' — They\'re personalizing the purchase. Color, size, scent — doesn\'t matter. Personalization = commitment.',
        '\'IS THIS THE LAST ONE?\' — Scarcity concern means they want it. Create gentle urgency.',
        '\'WHAT\'S THE RETURN POLICY?\' — Risk management. They\'re close but need a safety net.',
        '\'DO YOU HAVE A CARD?\' — This is as close to \'I\'ll take it\' as you can get without hearing the words. Close immediately.'
      ],
      itemsEs: [
          '\'¿CUÁNTO DURA?\' — Están calculando el valor por uso. Este es un comprador orientado al valor calculando el ROI.',
          '\'¿HACEN ENVÍOS?\' — Se están imaginando teniéndolo pero preocupados por la logística. Resuelve la logística, cierra la venta.',
          '\'¿CON QUÉ FRECUENCIA LO USO?\' — Lo están integrando a su estilo de vida. La apropiación mental ha comenzado.',
          '\'¿TÚ QUÉ PIENSAS?\' (a su pareja) — Buscan validación para una decisión que ya tomaron. Involucra a la pareja positivamente.',
          '\'¿PUEDO LLEVAR ESTO EN...?\' — Están personalizando la compra. Color, tamaño, aroma — no importa. Personalización = compromiso.',
          '\'¿ESTE ES EL ÚLTIMO?\' — La preocupación por escasez significa que lo quieren. Crea urgencia sutil.',
          '\'¿CUÁL ES LA POLÍTICA DE DEVOLUCIÓN?\' — Gestión de riesgo. Están cerca pero necesitan una red de seguridad.',
          '\'¿TIENES TARJETA?\' — Esto es tan cerca de \'Me lo llevo\' como puedes estar sin escuchar las palabras. Cierra inmediatamente.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Micro-Signals: Blink-and-You-Miss-Them',
      textEs: 'Las Micro-Señales: Parpadeas y Te las Pierdes',
    },
    {
            type: 'paragraph',
      text: 'These happen in fractions of a second. Train yourself to notice:',
      textEs: 'Estas suceden en fracciones de segundo. Entrénate para notarlas:',
    },
    {
            type: 'bullets',
      items: [
        'EYEBROW FLASH: A quick raise of both eyebrows when you mention a benefit or show the result. Surprise and interest. Follow up immediately.',
        'PUPIL DILATION: When people see something they want, their pupils dilate. Hard to spot but reliable.',
        'LIP PRESS: Pressing lips together while considering = internal deliberation. Stay quiet and let them think.',
        'BREATH HOLD + RELEASE: Holding breath during the price reveal, then releasing = relief. They can afford it.',
        'QUICK GLANCE AT WALLET/BAG: Checking if they have payment ready. Almost always a buying signal.'
      ],
      itemsEs: [
          'DESTELLO DE CEJAS: Un levantamiento rápido de ambas cejas cuando mencionas un beneficio o muestras el resultado. Sorpresa e interés. Da seguimiento inmediatamente.',
          'DILATACIÓN PUPILAR: Cuando la gente ve algo que quiere, sus pupilas se dilatan. Difícil de notar pero confiable.',
          'PRESIÓN DE LABIOS: Presionar los labios juntos mientras consideran = deliberación interna. Mantente callado y déjalos pensar.',
          'AGUANTAR LA RESPIRACIÓN + SOLTAR: Aguantar la respiración durante la revelación del precio, y luego soltar = alivio. Pueden pagarlo.',
          'MIRADA RÁPIDA A LA CARTERA/BOLSA: Verificando si tienen el pago listo. Casi siempre es una señal de compra.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When to Close: Timing Is Everything',
      textEs: 'Cuándo Cerrar: El Momento Lo Es Todo',
    },
    {
            type: 'paragraph',
      text: 'Closing too early feels pushy. Closing too late loses momentum. The sweet spot is the SECOND buying signal. Here\'s why:',
      textEs: 'Cerrar demasiado temprano se siente agresivo. Cerrar demasiado tarde pierde el impulso. El punto ideal es la SEGUNDA señal de compra. Aquí te explicamos por qué:',
    },
    {
            type: 'numbered',
      items: [
        'FIRST SIGNAL: \'Interesting.\' They lean in. Good, but not enough. Keep building value.',
        'SECOND SIGNAL: They touch the product and ask \'How long does it last?\' NOW. This is your moment. The second signal confirms genuine interest, not just politeness.',
        'THIRD SIGNAL: They\'re asking about payment or shipping. If you haven\'t closed by now, close immediately — every word past this point risks the sale.'
      ],
      itemsEs: [
          'PRIMERA SEÑAL: \'Interesante.\' Se inclinan. Bueno, pero no suficiente. Sigue construyendo valor.',
          'SEGUNDA SEÑAL: Tocan el producto y preguntan \'¿Cuánto dura?\' AHORA. Este es tu momento. La segunda señal confirma interés genuino, no solo cortesía.',
          'TERCERA SEÑAL: Están preguntando sobre pago o envío. Si no has cerrado para ahora, cierra inmediatamente — cada palabra después de este punto arriesga la venta.',
        ],
    },
    {
            type: 'script',
      text: 'Customer: \'How long does one syringe last?\' (Buying signal!) You: \'A full year — about sixty treatments in that one syringe. At {currency}300 that is five a go. Shall I wrap one for you?\' Direct close. Don\'t oversell past this point — and if she comes back at you on the number, that is when the ladder starts, not before.',
      textEs: 'Cliente: \'¿Cuánto dura una jeringa?\' (¡Señal de compra!) Tú: \'Un año entero — unos sesenta tratamientos en esa jeringa. A {currency}300 sale a cinco cada uno. ¿Te la envuelvo?\' Cierre directo. No vendas de más a partir de aquí — y si te discute el número, ahí es donde empieza la escalera, no antes.',
    },
    {
            type: 'tip',
      text: 'When you spot a buying signal, STOP TALKING ABOUT FEATURES. Switch to closing mode. Summarize the value, present the options, and ask for the decision. Every additional feature you mention past the buying signal creates new objections.',
      textEs: 'Cuando detectes una señal de compra, DEJA DE HABLAR SOBRE CARACTERÍSTICAS. Cambia al modo de cierre. Resume el valor, presenta las opciones, y pide la decisión. Cada característica adicional que menciones después de la señal de compra crea nuevas objeciones.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'False Signals: When Interest Isn\'t Buying Intent',
      textEs: 'Señales Falsas: Cuando el Interés No es Intención de Compra',
    },
    {
            type: 'paragraph',
      text: 'Not every positive signal means a sale is imminent. Learn to distinguish genuine buying signals from polite interest:',
      textEs: 'No toda señal positiva significa que una venta es inminente. Aprende a distinguir las señales de compra genuinas del interés cortés:',
    },
    {
            type: 'comparison',
      left: { label: 'Genuine Buying Signal', text: 'They ask specific questions about usage, logistics, or value. Their questions are about OWNING the product. They\'re problem-solving for purchase.' },
      leftEs: { label: 'Señal de Compra Genuina', text: 'Hacen preguntas específicas sobre uso, logística o valor. Sus preguntas son sobre POSEER el producto. Están resolviendo problemas para la compra.' },
      right: { label: 'Polite Interest (Not Ready)', text: 'They say \'It\'s nice\' or \'I\'ll think about it.\' Their questions are general. No specifics about owning. They\'re being polite, not buying.' },
      rightEs: { label: 'Interés Educado (No Está Listo)', text: 'Dicen \'está bien\' o \'me lo pensaré\'. Sus preguntas son generales. Nada concreto sobre llevárselo. Están siendo educados, no comprando.' }
    },
    {
            type: 'quote',
      text: 'The moment you see the buying signal, your job changes from convincing to facilitating. Make it easy for them to say yes.',
      textEs: 'En el momento en que ves la señal de compra, tu trabajo cambia de convencer a facilitar. Haz que sea fácil para ellos decir sí.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'When is the optimal time to close based on buying signals?',
      options: [
        'After the first positive signal',
        'After the second buying signal confirms genuine interest',
        'Only after they explicitly say they want to buy',
        'After you\'ve listed all product features'
      ],
      correctIndex: 1,
      explanation: 'The second buying signal is the sweet spot. The first signal could be politeness; the second confirms genuine interest. Closing after the third signal may be too late.',
    },
    {
      question: 'Which of these is a strong PHYSICAL buying signal?',
      options: [
        'Checking their phone',
        'Touching their face while looking at the product',
        'Crossing their arms',
        'Stepping backward'
      ],
      correctIndex: 1,
      explanation: 'Touching the face (cheeks, chin, under eyes) while looking at the product means they\'re imagining themselves using it. This is one of the strongest positive buying signals.',
    },
    {
      question: 'What should you do when you spot a buying signal?',
      options: [
        'Keep listing more product features',
        'Switch to closing mode and stop adding new information',
        'Lower the price immediately',
        'Ask if they\'re ready to buy in a pushy way'
      ],
      correctIndex: 1,
      explanation: 'When you spot a buying signal, switch from convincing to closing. Summarize value, present options, and ask for the decision. Every new feature you mention creates potential objections.',
    }
    ],
  },
  'connect-8': {
    id: 'connect-8',
    categoryId: 'connecting',
    title: 'Handling Different Personality Types',
    titleEs: 'Manejando Diferentes Tipos de Personalidad',
    subtitle: 'The four you meet all day: the Interrogator, the Rusher, the Sweetheart, the Showman',
    subtitleEs: 'Los cuatro que te encuentras todo el día: el Interrogador, el Acelerado, el Simpático, el Showman',
    duration: '10 min',
    icon: 'Users',
    order: 8,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'One Pitch Does NOT Fit All',
      textEs: 'Una Presentación No Le Queda a Todos',
    },
    {
            type: 'paragraph',
      text: 'You have already noticed it. Some of them want the whole ingredient list before they will let you touch their hand. Some want the price and the door. Some have to like you first and then they buy anything. And some are not really buying a cream at all, they are buying a story to tell at brunch. Same shop, same products, four completely different conversations.',
      textEs: 'Ya te has dado cuenta. Algunos quieren la lista de ingredientes entera antes de dejarte tocarles la mano. Otros quieren el precio y la puerta. Otros primero tienen que caerte bien y luego te compran lo que sea. Y otros no están comprando una crema: están comprando una historia para contar en el brunch. La misma tienda, los mismos productos, cuatro conversaciones completamente distintas.',
    },
    {
            type: 'keypoint',
      text: 'Four people you will meet today: the Interrogator, the Rusher, the Sweetheart and the Showman. Work out which one is standing in front of you in the first ten seconds and the rest of it writes itself. Get it wrong and you will be giving a chemistry lecture to somebody who just wanted a laugh.',
      textEs: 'Cuatro personas que te vas a encontrar hoy: el Interrogador, el Acelerado, el Simpático y el Showman. Averigua cuál tienes delante en los primeros diez segundos y lo demás se escribe solo. Fállalo y estarás dando una clase de química a alguien que solo quería reírse un rato.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Type 1: The Interrogator',
      textEs: 'Tipo 1: El Interrogador',
    },
    {
            type: 'paragraph',
      text: 'Wants the ingredient list before they want anything else. Reads the box. Asks you three questions before you have finished the first sentence. They are not having a go at you and they are not going to walk — they just need to know what is in it before they will enjoy it.',
      textEs: 'Quiere la lista de ingredientes antes que ninguna otra cosa. Se lee la caja. Te hace tres preguntas antes de que termines la primera frase. No va a por ti y no se va a marchar — simplemente necesita saber qué lleva antes de poder disfrutarlo.',
    },
    {
            type: 'bullets',
      items: [
        'HOW YOU SPOT ONE: Picks the box up and turns it over. Asks what is in it before asking what it costs. Goes quiet and reads. That silence is not boredom, it is homework.',
        'WHAT WORKS: Know your product and answer straight. \'Dead Sea mineral salt — magnesium, calcium, potassium. One jar is 8 to 12 months of weekly treatments, which is under {currency}2 a go.\' Numbers you actually know, said without hesitating.',
        'WHAT KILLS IT: Waffle, or rushing them, or making something up. This is the one customer who will catch you out — and if they catch you once, you have lost the whole thing.',
        'HOW YOU CLOSE: Let the box do the last bit. \'Read it properly, I am in no hurry. I am not going anywhere.\' Then go quiet. They close themselves more often than you would think.'
      ],
      itemsEs: [
          'CÓMO LOS PILLAS: Coge la caja y le da la vuelta. Pregunta qué lleva antes de preguntar cuánto cuesta. Se queda callado leyendo. Ese silencio no es aburrimiento, son deberes.',
          'LO QUE FUNCIONA: Sábete el producto y contesta a pelo. \'Sal mineral del Mar Muerto: magnesio, calcio, potasio. Un bote son de 8 a 12 meses de tratamientos semanales, o sea menos de {currency}2 cada vez.\' Números que te sepas de verdad, dichos sin dudar.',
          'LO QUE LO MATA: Enrollarte, meterle prisa o inventarte algo. Este es el cliente que te va a pillar — y si te pilla una vez, ya lo has perdido del todo.',
          'CÓMO CIERRAS: Que la caja haga el último trozo. \'Léetelo bien, que yo no tengo ninguna prisa. Yo no me muevo de aquí.\' Y te callas. Se cierran solos más veces de las que te imaginas.',
        ],
    },
    {
            type: 'script',
      text: '\'Go on then, ask me. Dead Sea mineral salt — magnesium, calcium, potassium. Once a week, five minutes, and one jar sees you through the best part of a year. That is under {currency}2 a time. Here, the list is on the box, have a proper look while I do your other hand.\' Straight answers, no waffle, and the demo keeps going while they read.',
      textEs: '\'Venga, pregúntame. Sal mineral del Mar Muerto: magnesio, calcio, potasio. Una vez por semana, cinco minutos, y un bote te dura casi el año entero. Eso son menos de {currency}2 cada vez. Toma, la lista está en la caja, míratela con calma mientras te hago la otra mano.\' Respuestas directas, sin rollo, y la demo sigue mientras leen.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Type 2: The Rusher',
      textEs: 'Tipo 2: El Acelerado',
    },
    {
            type: 'paragraph',
      text: 'Wants the price and the door. No chat, no story, no building up to it. They are not rude — they are somewhere else in their head already, and every extra sentence you add is a reason to leave.',
      textEs: 'Quiere el precio y la puerta. Sin charla, sin historia, sin ir calentándolo. No es un borde — ya está en otro sitio con la cabeza, y cada frase de más que le sueltas es un motivo para irse.',
    },
    {
            type: 'bullets',
      items: [
        'HOW YOU SPOT ONE: Walking with somewhere to be. Looks at the watch. Answers you in three words. Already half turned back towards the street.',
        'WHAT WORKS: Beat them to it. \'I know you\'re in a rush.\' Then: two minutes, one hand, done. Give the result before you give the speech.',
        'WHAT KILLS IT: Chat. Three options. Anything that starts \'so what happens is...\'. They will not tell you they are bored, they will just be gone.',
        'HOW YOU CLOSE: Two numbers, one question, nothing else. \'{currency}210 with the gift, or {currency}300 for the two. Which one?\' Then shut up and get the machine.'
      ],
      itemsEs: [
          'CÓMO LOS PILLAS: Andan con un sitio al que llegar. Miran el reloj. Te contestan con tres palabras. Ya están medio girados hacia la calle.',
          'LO QUE FUNCIONA: Adelántate. \'Sé que vas con prisa.\' Y luego: dos minutos, una mano, listo. Dale el resultado antes que el discurso.',
          'LO QUE LO MATA: La cháchara. Tres opciones. Cualquier cosa que empiece por \'lo que pasa es que...\'. No te van a decir que se aburren, simplemente ya no están.',
          'CÓMO CIERRAS: Dos números, una pregunta y nada más. \'{currency}210 con el regalo, o {currency}300 las dos. ¿Cuál?\' Y te callas y vas a por el datáfono.',
        ],
    },
    {
            type: 'script',
      text: '\'I know you are in a hurry. Two minutes. One eye. You will see the result yourself in the mirror. If you don\'t love it, no problem. If you do, I have two price options that take 30 seconds to explain. Sound fair?\' Direct, time-bound, respectful of their schedule.',
      textEs: '\'Sé que tienes prisa. Dos minutos. Un ojo. Verás el resultado tú misma en el espejo. Si no te encanta, no hay problema. Si sí, tengo dos opciones de precio que toman 30 segundos en explicar. ¿Te parece justo?\' Directo, con tiempo definido, respetuoso de su agenda.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Type 3: The Sweetheart',
      textEs: 'Tipo 3: El Simpático',
    },
    {
            type: 'paragraph',
      text: 'Has to like you first. Once she does, she will buy almost anything you put in her hand. She is not deciding about a cream, she is deciding about you — and she made her mind up in the first thirty seconds, before you said a single thing about the product.',
      textEs: 'Primero le tienes que caer bien. En cuanto le caes bien, se lleva casi cualquier cosa que le pongas en la mano. No está decidiendo sobre una crema, está decidiendo sobre ti — y lo decidió en los primeros treinta segundos, antes de que dijeras nada del producto.',
    },
    {
            type: 'bullets',
      items: [
        'HOW YOU SPOT ONE: Asks you where you are from. Wants to know how long you have worked here. Laughs early. Looks at her partner before she answers you. Usually the best half hour of your shift.',
        'WHAT WORKS: Be a person. Talk about their trip, tell them about yours, get a laugh in before you get a product in. The demo should feel like a five-minute spa moment in the middle of a day of shopping.',
        'WHAT KILLS IT: Going cold on her the second the money comes up. She will feel the switch, and after that everything you say sounds like it was always the plan.',
        'HOW YOU CLOSE: Warm and easy, with the partner in on it. \'Look at that. Go on, treat yourself — which one do you fancy?\' Never hard, never fast.'
      ],
      itemsEs: [
          'CÓMO LOS PILLAS: Te pregunta de dónde eres. Quiere saber cuánto llevas trabajando aquí. Se ríe pronto. Mira a su pareja antes de contestarte. Suele ser la mejor media hora de tu turno.',
          'LO QUE FUNCIONA: Sé una persona. Habla de su viaje, cuéntale el tuyo, sácale una risa antes de sacarle un producto. La demo tiene que parecer cinco minutos de spa en mitad de un día de compras.',
          'LO QUE LO MATA: Ponerte frío en cuanto sale el dinero. Nota el cambio, y a partir de ahí todo lo que digas suena a que ese era el plan desde el principio.',
          'CÓMO CIERRAS: Con calidez y sin prisa, y con la pareja metida en el ajo. \'Mira eso. Venga, date el capricho, ¿cuál te apetece?\' Nunca duro, nunca rápido.',
        ],
    },
    {
            type: 'script',
      text: '\'Where are you two from? ... No way, I have got family there. Right, sit down, you are getting my favourite one — five minutes of spa in the middle of your shopping day. Do not thank me, just enjoy it.\' The person comes first, the product comes second, and she has already decided by the time you get to it.',
      textEs: '\'¿De dónde sois vosotros dos? ... ¡Anda, si tengo familia allí! Venga, siéntate, que te voy a hacer el que más me gusta a mí — cinco minutos de spa en mitad del día de compras. No me des las gracias, tú disfruta.\' Primero la persona, después el producto, y para cuando llegas al producto ya lo tiene decidido.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Type 4: The Showman',
      textEs: 'Tipo 4: El Showman',
    },
    {
            type: 'paragraph',
      text: 'Not buying a cream. Buying a story to tell at brunch. Talks the whole way through, jumps subject three times a minute, and is already imagining who she is going to show it to. Give her the story and she will sell herself the product.',
      textEs: 'No está comprando una crema. Está comprando una historia para contar en el brunch. Habla todo el rato, cambia de tema tres veces por minuto y ya se está imaginando a quién se lo va a enseñar. Dale la historia y ella sola se vende el producto.',
    },
    {
            type: 'bullets',
      items: [
        'HOW YOU SPOT ONE: Talks more than you do. Gets loud when it works. Says \'oh my god, my sister would LOVE this\' before you have mentioned anybody else.',
        'WHAT WORKS: Go up to meet her, do not stand there being calm at her. Make it an event. Get the mirror out with a bit of theatre. Let her talk — every sentence she says out loud is one you do not have to.',
        'WHAT KILLS IT: Talking over her stories to get back to the script. She needs to feel like the most interesting person on the street, because right now she is.',
        'HOW YOU CLOSE: Straight into the gift. \'Your sister is going to be furious. Shall we do two and save her the trouble?\' Her own excitement does the closing.'
      ],
      itemsEs: [
          'CÓMO LOS PILLAS: Habla más que tú. Sube el volumen cuando funciona. Te suelta \'ay, madre, a mi hermana le ENCANTARÍA\' antes de que tú hayas nombrado a nadie.',
          'LO QUE FUNCIONA: Súbete tú a su nivel, no te quedes ahí tranquilo mirándola. Móntalo como un evento. Saca el espejo con un poco de teatro. Déjala hablar — cada frase que suelta es una que no tienes que decir tú.',
          'LO QUE LO MATA: Pisarle las historias para volver a tu guion. Necesita sentirse la persona más interesante de la calle, porque ahora mismo lo es.',
          'CÓMO CIERRAS: Directo al regalo. \'Tu hermana se va a poner de mala leche. ¿Nos llevamos dos y le ahorramos el disgusto?\' Su propia emoción hace el cierre.',
        ],
    },
    {
            type: 'script',
      text: '\'Wait until you tell your friends about this! They are going to be SO jealous. You will be at brunch like \'Oh this? Just something I picked up in {locationName}.\' So — are we doing the full experience or starting with the essentials? Let us make it fun!\' Enthusiastic, story-driven, playful.',
      textEs: '\'¡Espera a que les cuentes a tus amigas sobre esto! Van a estar TAN celosas. Vas a estar en el brunch como \'¿Oh, esto? Algo que compré en {locationName}.\' Entonces — ¿hacemos la experiencia completa o empezamos con lo esencial? ¡Hagámoslo divertido!\' Entusiasta, impulsado por historias, juguetón.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Quick Reference: Adapting Your Style',
      textEs: 'Referencia Rápida: Adaptando Tu Estilo',
    },
    {
            type: 'bullets',
      items: [
        'THE INTERROGATOR → Know your product, answer straight, then go quiet',
        'THE RUSHER → Fast, two numbers, one question',
        'THE SWEETHEART → Be a person first, sell second',
        'THE SHOWMAN → Match the volume, give her the story'
      ],
      itemsEs: [
          'EL INTERROGADOR → Sábete el producto, contesta a pelo y luego cállate',
          'EL ACELERADO → Rápido, dos números, una pregunta',
          'EL SIMPÁTICO → Primero sé una persona, luego vende',
          'EL SHOWMAN → Súbete al volumen y dale la historia',
        ],
    },
    {
            type: 'tip',
      text: 'Most people are two of these at once. An Interrogator in a hurry wants the facts fast. A Sweetheart who is also a Showman wants forty minutes and will spend three hundred. Read whichever one is louder, then borrow from the other.',
      textEs: 'Casi todo el mundo es dos de estos a la vez. Un Interrogador con prisa quiere los datos rápido. Un Simpático que además es Showman quiere cuarenta minutos y se gasta trescientos. Lee el que suene más fuerte y cógele algo al otro.',
    },
    {
            type: 'quote',
      text: 'One pitch, said the same way to everybody who walks past, misses most of them. Same words, four different speeds.',
      textEs: 'Un solo discurso, dicho igual a todo el que pasa, se deja a la mayoría por el camino. Las mismas palabras, a cuatro velocidades distintas.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'The Interrogator picks up the box and starts reading. What do you do?',
      options: [
        'Talk over the reading so you keep control of the conversation',
        'Answer straight, then let them read and go quiet',
        'Move them off the ingredients and back onto how it feels',
        'Tell them everybody asks that and it is all completely natural'
      ],
      correctIndex: 1,
      explanation: 'The silence is homework, not boredom. Know your product, answer without hesitating, then stop talking. They close themselves more often than you would think.',
    },
    {
      question: 'What does the Rusher want from you?',
      options: [
        'A bit of chat first so the sale does not feel cold',
        'Three options laid out so they can weigh them up properly',
        'Two numbers and one question',
        'A long, careful explanation of how the treatment works'
      ],
      correctIndex: 2,
      explanation: 'Beat them to the rush, give the result before the speech, then two numbers and one question. Every extra sentence is a reason to leave.',
    },
    {
      question: 'What is the Showman actually buying?',
      options: [
        'The lowest price she can talk you down to today',
        'Proof that the ingredients are worth what you are asking',
        'A story she can tell at brunch',
        'A quiet treatment with as little fuss as possible'
      ],
      correctIndex: 2,
      explanation: 'She is not buying a cream. Match her volume, make it an event, and let her talk — every sentence she says out loud is one you do not have to.',
    }
    ],
  },
  'prod-1': {
    id: 'prod-1',
    categoryId: 'products',
    title: 'Price Anchoring Psychology',
    titleEs: 'Psicología del Anclaje de Precio',
    subtitle: 'Why stating the Europe price first works — the contrast principle and anchoring mistakes',
    subtitleEs: 'El primer precio mencionado es el punto de referencia mental',
    duration: '10 min',
    icon: 'TrendingUp',
    order: 1,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'The First Number They Hear Becomes Their Reference Point',
      textEs: 'El Primer Número que Escuchan Se Convierte en su Punto de Referencia',
    },
    {
            type: 'paragraph',
      text: 'Price anchoring is one of the most powerful tools in sales psychology. The first price a customer hears becomes their mental anchor — the reference point against which all other prices are judged. If you start with {currency}50, {currency}300 sounds expensive. If you start with {currency}500, {currency}300 sounds like a bargain. The product hasn\'t changed. Only the anchor has. This is why we ALWAYS state the Europe price before the {locationName} price.',
      textEs: 'El anclaje de precio es una de las herramientas más poderosas de la psicología de ventas. El primer precio que escucha un cliente se convierte en su ancla mental — el punto de referencia contra el cual se juzgan todos los demás precios. Si empiezas con {currency}50, {currency}300 suena caro. Si empiezas con {currency}500, {currency}300 suena una ganga. El producto no ha cambiado. Solo cambió el ancla. Por eso SIEMPRE decimos el precio de Europa antes que el de {locationName}.',
    },
    {
            type: 'keypoint',
      text: 'The anchor sets the frame. Frame the product as a {currency}500 item that happens to cost {currency}300 in {locationName}, and it feels like a steal. Frame it as a {currency}300 item, and it feels like a purchase decision. Always anchor HIGH.',
      textEs: 'El ancla marca el marco. Enmarca el producto como algo de {currency}500 que por casualidad cuesta {currency}300 en {locationName}, y se siente como un robo. Enmárcalo como algo de {currency}300, y se siente como una decisión de compra. Siempre ancla ALTO.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Contrast Principle: How {currency}500 Makes {currency}300 Feel Cheap',
      textEs: 'El Principio de Contraste: Cómo {currency}500 Hace que {currency}300 se Sienta Barato',
    },
    {
            type: 'paragraph',
      text: 'The contrast principle states that we perceive things differently depending on what we compare them to. A 20kg weight feels light if you first lift a 40kg weight. A {currency}300 price feels cheap if you first hear {currency}500. This isn\'t manipulation — it\'s how human perception works.',
      textEs: 'El principio de contraste establece que percibimos las cosas de manera diferente dependiendo de con qué las comparemos. Una pesa de 20kg se siente ligera si primero levantaste una de 40kg. Un precio de {currency}300 se siente barato si primero escuchaste {currency}500. Esto no es manipulación — así funciona la percepción humana.',
    },
    {
            type: 'script',
      text: '\'Across Europe, this treatment goes for around {currency}500. It\'s expensive because it works instantly and lasts long-term. But here in {locationName} — you know how special it is here — instead of {currency}500, we charge only {currency}300.\' The customer doesn\'t hear \'{currency}300 product.\' They hear \'{currency}500 product for {currency}300.\' That\'s a {currency}200 win.',
      textEs: '\'En toda Europa, este tratamiento cuesta alrededor de {currency}500. Es caro porque funciona al instante y dura a largo plazo. Pero aquí en {locationName} — ya sabes lo especial que es este lugar — en vez de {currency}500, cobramos solo {currency}300.\' El cliente no escucha \'producto de {currency}300.\' Escucha \'producto de {currency}500 por {currency}300.\' Eso es un ahorro de {currency}200.',
    },
    {
            type: 'bullets',
      items: [
        'STEP 1 — ESTABLISH EUROPE PRICE: \'Around Europe this goes for {currency}200\' (Peeling) or \'{currency}500\' (Syringe) or \'{currency}80 each\' (Scrub/Butter/Nail Kit). This is the anchor.',
        'STEP 2 — SAY WHY IT COSTS THAT: One line, no more — \'because it works,\' \'because it lasts a year,\' \'because you see it in two minutes.\' That is what holds the big number up.',
        'STEP 3 — SWING IT ACROSS: \'But here in {locationName}...\' That is the whole bridge. Say it like you are letting them in on where the good prices live. No apology, no explanation — just the pause, then the number.',
        'STEP 4 — STATE THE LOCAL PRICE: \'...it\'s only {currency}300.\' After hearing {currency}500, {currency}300 doesn\'t just sound lower. It sounds like a completely different category of purchase.'
      ],
      itemsEs: [
          'PASO 1 — ESTABLECE EL PRECIO DE EUROPA: \'En Europa esto cuesta alrededor de {currency}200\' (Peeling) o \'{currency}500\' (Jeringa) o \'{currency}80 cada uno\' (Exfoliante/Body Butter/Kit de Uñas). Esta es el ancla.',
          'PASO 2 — DI POR QUÉ CUESTA ESO: Una frase, no más — \'porque funciona\', \'porque te dura un año\', \'porque lo ves en dos minutos\'. Eso es lo que sostiene el número grande.',
          'PASO 3 — PÁSALO AL OTRO LADO: \'Pero aquí en {locationName}...\' Ese es todo el puente. Dilo como quien les está contando dónde viven los precios buenos. Sin disculpas, sin explicaciones — solo la pausa, y luego el número.',
          'PASO 4 — DI EL PRECIO LOCAL: \'...es solo {currency}300.\' Después de escuchar {currency}500, {currency}300 no solo suena más bajo. Suena como una categoría de compra completamente diferente.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When to Deliver the Price Gap',
      textEs: 'Cuándo Dar la Diferencia de Precio',
    },
    {
            type: 'paragraph',
      text: 'The price gap is your credibility booster. It shows what this costs elsewhere without devaluing the product. But timing matters:',
      textEs: 'La diferencia de precio es tu potenciador de credibilidad. Enseña lo que esto cuesta en otros sitios sin devaluar el producto. Pero el momento importa:',
    },
    {
            type: 'bullets',
      items: [
        'BEST: Immediately after the Europe price, with no pause in between. \'Around Europe it\'s {currency}500... but here in {locationName}, it\'s {currency}300.\' The two numbers land together, before they question product quality.',
        'GOOD: During the initial stop. \'Come try this — the prices here in {locationName} are amazing!\' Sets expectation early.',
        'LESS EFFECTIVE: After they\'ve already heard the price. If you say \'It\'s {currency}300\' first, then bring up the Europe price, it feels like an excuse, not a comparison.'
      ],
      itemsEs: [
          'MEJOR: Justo después del precio de Europa, sin pausa entre medias. \'En Europa cuesta {currency}500... pero aquí en {locationName}, cuesta {currency}300.\' Los dos números caen juntos, antes de que cuestionen la calidad del producto.',
          'BUENO: Durante la parada inicial. \'¡Ven a probar esto — los precios aquí en {locationName} son increíbles!\' Establece la expectativa desde el principio.',
          'MENOS EFECTIVO: Después de que ya escucharon el precio. Si dices \'Es {currency}300\' primero, y luego sacas el precio de Europa, se siente como una excusa, no como una comparación.',
        ],
    },
    {
            type: 'tip',
      text: 'Never apologize for the price. Never say \'I know it\'s expensive\' or \'It\'s a lot, but...\' These phrases undermine the anchor. State the Europe price confidently, give the {locationName} price matter-of-factly, and let the contrast do the work.',
      textEs: 'Nunca te disculpes por el precio. Nunca digas \'Sé que es caro\' o \'Es mucho, pero...\' Estas frases debilitan el ancla. Di el precio de Europa con confianza, da el precio de {locationName} con naturalidad, y deja que el contraste haga el trabajo.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Anchoring Mistakes That Backfire',
      textEs: 'Errores de Anclaje que se Vuelven en tu Contra',
    },
    {
            type: 'bullets',
      items: [
        'STARTING WITH THE LOW PRICE: \'It\'s only {currency}50!\' Now {currency}50 is the anchor, and if you try to upsell to {currency}120, it feels like a huge jump. Always anchor high first.',
        'MENTIONING THE COST PRICE: \'We buy this for {currency}30 and sell it for {currency}60.\' This destroys perceived value. Customers don\'t care about your margins. They care about what they get.',
        'APOLOGETIC FRAMING: \'I know it\'s expensive, but...\' This tells the customer they should feel bad about the price. Instead: \'This is a premium product because it delivers premium results.\'',
        'COMPARING TO CHEAP ALTERNATIVES: \'This is better than drugstore cream.\' Now you\'ve anchored to drugstore prices. Compare to luxury alternatives instead: \'This replaces a {currency}200 salon treatment.\'',
        'GIVING THE DISCOUNT FIRST: \'It\'s 50% off!\' Now they wonder what the original price was and why it\'s discounted so heavily. Lead with full price, then reveal the savings.'
      ],
      itemsEs: [
          'EMPEZAR CON EL PRECIO BAJO: \'¡Es solo {currency}50!\' Ahora {currency}50 es el ancla, y si intentas vender algo adicional por {currency}120, se siente como un salto enorme. Siempre ancla alto primero.',
          'MENTIONAR EL PRECIO DE COSTO: \'Compramos esto en {currency}30 y lo vendemos en {currency}60.\' Esto destruye el valor percibido. A los clientes no les importan tus márgenes. Les importa lo que reciben.',
          'ENMARCADO APOLOGÉTICO: \'Sé que es caro, pero...\' Esto le dice al cliente que debería sentirse mal por el precio. En su lugar: \'Este es un producto premium porque ofrece resultados premium.\'',
          'COMPARAR CON ALTERNATIVAS BARATAS: \'Esto es mejor que la crema de la farmacia.\' Ahora anclaste a precios de farmacia. Compara con alternativas de lujo en su lugar: \'Esto reemplaza un tratamiento de salón de {currency}200.\'',
          'DAR EL DESCUENTO PRIMERO: \'¡50% de descuento!\' Ahora se preguntan cuál era el precio original y por qué está tan rebajado. Empieza con el precio completo, luego revela el ahorro.',
        ],
    },
    {
            type: 'comparison',
      left: { label: 'Weak Anchoring', text: '\'This peeling is {currency}100. It\'s a good deal.\' No contrast. No frame. The customer evaluates {currency}100 against their general sense of what skincare should cost.' },
      leftEs: { label: 'Anclaje Débil', text: '\'Este peeling cuesta {currency}100. Es buen precio.\' Sin contraste. Sin marco. El cliente evalúa {currency}100 contra su idea general de lo que debería costar el cuidado de la piel.' },
      right: { label: 'Strong Anchoring', text: '\'Around Europe this goes for {currency}200. But here in {locationName}, it\'s only {currency}100 — that\'s 50% off the Europe price just for being here.\' The customer evaluates {currency}100 against {currency}200. It feels like a {currency}100 win.' },
      rightEs: { label: 'Anclaje Fuerte', text: '\'Por Europa esto cuesta {currency}200. Pero aquí en {locationName}, son solo {currency}100 — un 50% menos que el precio de Europa solo por estar aquí.\' El cliente evalúa {currency}100 contra {currency}200. Se siente como ganar {currency}100.' }
    },
    {
            type: 'quote',
      text: 'The price is not a number — it\'s a story. Tell the story right, and the number becomes small. Tell it wrong, and the number becomes a wall.',
      textEs: 'El precio no es un número — es una historia. Cuenta la historia bien, y el número se vuelve pequeño. Cuéntala mal, y el número se convierte en una pared.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'Why should you always state the Europe price before the local price?',
      options: [
        'Because Europe prices are more accurate',
        'Because the first price heard becomes the mental anchor that makes the local price feel like a bargain',
        'Because customers prefer European pricing',
        'Because it\'s required by law'
      ],
      correctIndex: 1,
      explanation: 'The first price heard becomes the mental anchor. When a customer hears {currency}500 first, {currency}300 feels like a bargain. If they hear {currency}300 first, they evaluate it against their general sense of skincare pricing, which is less favorable.',
    },
    {
      question: 'What is the role of the price comparison in price anchoring?',
      options: [
        'It hides the local price until they have already agreed to buy',
        'It gives them a reference point without cheapening the product',
        'It leaves you room to drop further later in the haggle',
        'It proves the product is worth more than we charge for it'
      ],
      correctIndex: 1,
      explanation: 'The gap reads as where they happen to be standing, not as money off. Sounding special is exactly the effect you want — it just is not the mechanism. A discounted product is a cheaper product in their head; a {locationName} price is not.',
    },
    {
      question: 'Which of these is a price anchoring mistake?',
      options: [
        'Starting with the Europe price',
        'Giving the Europe price and the {locationName} price side by side',
        'Starting with the low price or apologizing for the cost',
        'Using the contrast principle'
      ],
      correctIndex: 2,
      explanation: 'Starting with the low price sets a low anchor, making upsells feel expensive. Apologizing for the price (\'I know it\'s expensive\') undermines the value. Both destroy effective anchoring.',
    }
    ],
  },
  'prod-2': {
    id: 'prod-2',
    categoryId: 'products',
    title: 'The Two-Choice Framework',
    titleEs: 'El Marco de Dos Opciones',
    subtitle: 'Why two options beat one — changing \'yes or no\' into \'which one\'',
    subtitleEs: 'Por qué dos opciones ganan a una — cambiar \'¿sí o no?\' por \'¿cuál?\'',
    duration: '10 min',
    icon: 'GitFork',
    order: 2,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Two Choices Turn a Decision Into a Selection',
      textEs: 'Dos Opciones Convierten una Decisión en una Selección',
    },
    {
            type: 'paragraph',
      text: 'When you offer one option, the customer\'s brain asks: \'Should I buy this or not?\' That\'s a yes/no question, and \'no\' is the default — it\'s easier, safer, requires no action. When you offer two options, the brain asks a different question: \'Which one should I choose?\' The decision to buy is assumed. Now they\'re just picking between A and B. This simple reframing dramatically increases conversion.',
      textEs: 'Cuando ofreces una opción, el cerebro del cliente se pregunta: \'¿Debería comprar esto o no?\' Esa es una pregunta de sí/no, y \'no\' es la respuesta por defecto — es más fácil, más seguro, no requiere acción. Cuando ofreces dos opciones, el cerebro hace una pregunta diferente: \'¿Cuál debería elegir?\' La decisión de comprar se da por sentada. Ahora solo están eligiendo entre A y B. Este simple reencuadre aumenta drásticamente la conversión.',
    },
    {
            type: 'keypoint',
      text: 'A single offer invites rejection. Two offers invite comparison. Comparison assumes purchase. The psychology is subtle but profound — and it works on virtually every human decision.',
      textEs: 'Una sola oferta invita al rechazo. Dos ofertas invitan a la comparación. La comparación asume compra. La psicología es sutil pero profunda — y funciona en prácticamente toda decisión humana.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Psychology: \'Which One\' vs. \'Yes or No\'',
      textEs: 'La Psicología: \'¿Cuál?\' vs. \'¿Sí o No?\'',
    },
    {
            type: 'paragraph',
      text: 'Ask somebody if they want it and they can just say no, because no is free. Ask them which one they want and they are already picking. You never put \'do you buy\' in the air. You put \'the single or the double\' in the air, and let them answer the easy one.',
      textEs: 'Pregúntale a alguien si lo quiere y te puede decir que no sin más, porque el no sale gratis. Pregúntale cuál quiere y ya está eligiendo. Nunca pones en el aire \'¿lo compras?\'. Pones en el aire \'¿la individual o la doble?\', y les dejas contestar a la fácil.',
    },
    {
            type: 'script',
      text: 'Single option: \'The syringe is {currency}210.\' Customer thinks: \'{currency}210? That\'s a lot. I don\'t know if I need this. No thanks.\' Two options: \'You can take the single syringe for {currency}210 with a gift, or the double for {currency}300 and treat your forehead and upper lip too. Which works better for you?\' Customer thinks: \'Hmm, do I want the single or double? The double makes more sense...\' See the difference? They went from \'Should I buy?\' to \'Which one?\'',
      textEs: 'Opción única: \'La jeringa cuesta {currency}210.\' El cliente piensa: \'¿{currency}210? Eso es mucho. No sé si necesito esto. No, gracias.\' Dos opciones: \'Puedes llevarte la jeringa individual por {currency}210 con un regalo, o la doble por {currency}300 y tratar tu frente y labio superior también. ¿Cuál te funciona mejor?\' El cliente piensa: \'Hmm, ¿quiero la individual o la doble? La doble tiene más sentido...\' ¿Ves la diferencia? Pasaron de \'¿Debería comprar?\' a \'¿Cuál?\'',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Option Structure: How to Build Your Two Choices',
      textEs: 'Estructura de Opciones: Cómo Construir tus Dos Opciones',
    },
    {
            type: 'paragraph',
      text: 'Not any two options work. The structure matters. Here\'s how to build effective choices:',
      textEs: 'No cualquier par de opciones funciona. La estructura importa. Así es como construir opciones efectivas:',
    },
    {
            type: 'numbered',
      items: [
        'OPTION 1 — THE VALUE CHOICE: Lower price point with a smaller gift or no gift. Example: Syringe at {currency}210 + one gift. This is the cheaper of your two OPENING options — it is not the answer to a small budget. That answer lives further down the ladder.',
        'OPTION 2 — THE FULL CHOICE: Standard or higher price with a bigger gift or added value. This captures buyers who want the complete experience. Example: Syringe at {currency}300 + second syringe free.',
        'THE CONTRAST: The gap between options should be clear but not extreme. {currency}210 vs {currency}300 is a meaningful difference. Do not put {currency}210 next to {currency}175 — that is the next rung down, and a rung is something you walk to with a reason, never a second item on a menu.',
        'THE DEFAULT: If you sense hesitation, guide them toward Option 1: \'Most people start with Option 1 — it\'s a great entry point.\' This simplifies their decision.'
      ],
      itemsEs: [
          'OPCIÓN 1 — LA OPCIÓN DE VALOR: Precio más bajo con un regalo más pequeño o sin regalo. Ejemplo: Jeringa en {currency}210 + un regalo. Esta es la más barata de tus dos opciones DE SALIDA — no es la respuesta a un presupuesto justo. Esa respuesta está más abajo en la escalera.',
          'OPCIÓN 2 — LA OPCIÓN COMPLETA: Precio estándar o más alto con un regalo más grande o valor añadido. Esto capta a quien quiere la experiencia completa. Ejemplo: Jeringa en {currency}300 + segunda jeringa gratis.',
          'EL CONTRASTE: La diferencia entre opciones debe ser clara pero no extrema. {currency}210 frente a {currency}300 es una diferencia que se nota. No pongas {currency}210 al lado de {currency}175 — ese es el escalón siguiente, y a un escalón se baja con un motivo, nunca es el segundo plato de una carta.',
          'LA OPCIÓN POR DEFECTO: Si sientes hesitación, guíalos hacia la Opción 1: \'La mayoría empieza con la Opción 1 — es un excelente punto de entrada.\' Esto simplifica su decisión.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Two-Choice Examples by Product',
      textEs: 'Ejemplos de Dos Opciones por Producto',
    },
    {
            type: 'bullets',
      items: [
        'SYRINGE: Option 1 — {currency}210 (single syringe + gift). Option 2 — {currency}300 (two syringes + Day & Night Cream free). One is entry-level value; the other is the complete experience.',
        'PEELING: Option 1 — {currency}100 (single peeling + Dead Sea Scrub gift). Option 2 — {currency}150 (peeling + Day & Night Cream free). Budget-conscious vs. skincare routine builders.',
        'SCRUB & BUTTER: Option 1 — {currency}60 (Buy 1 Get 1 — Scrub + Body Butter). Option 2 — {currency}120 (Buy 2 Get 1 — trio with Nail Kit or Cleanser). Casual buyer vs. serious self-care or gift shopper.',
        'NAIL KIT: Option 1 — {currency}60 (Buy 1 Get 1 — mix with Scrub or Butter). Option 2 — {currency}120 (Buy 2 Get 1 — three full kits for gifting).'
      ],
      itemsEs: [
          'JERINGA: Opción 1 — {currency}210 (jeringa individual + regalo). Opción 2 — {currency}300 (dos jeringas + Crema Día y Noche gratis). Una es valor de entrada; la otra es la experiencia completa.',
          'PEELING: Opción 1 — {currency}100 (peeling individual + Exfoliante del Mar Muerto de regalo). Opción 2 — {currency}150 (peeling + Crema Día y Noche gratis). Conscientes del presupuesto vs. constructores de rutina de cuidado de la piel.',
          'EXFOLIANTE & MANTEQUILLA: Opción 1 — {currency}60 (Compra 1 Lleva 1 — Exfoliante + Mantequilla Corporal). Opción 2 — {currency}120 (Compra 2 Lleva 1 — trío con Kit de Uñas o Limpiador). Comprador casual vs. cuidado personal serio o comprador de regalos.',
          'KIT DE UÑAS: Opción 1 — {currency}60 (Compra 1 Lleva 1 — mezcla con Exfoliante o Mantequilla). Opción 2 — {currency}120 (Compra 2 Lleva 1 — tres kits completos para regalo).',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Decoy Effect (Advanced)',
      textEs: 'El Efecto Señuelo (Avanzado)',
    },
    {
            type: 'paragraph',
      text: 'A more advanced technique involves adding a third option that\'s designed to make one of the two main options more attractive:',
      textEs: 'Una técnica más avanzada implica agregar una tercera opción diseñada para hacer una de las dos opciones principales más atractiva:',
    },
    {
            type: 'script',
      text: '\'We have three options. A single Scrub on its own is {currency}60. The Scrub + Body Butter duo is also {currency}60 — Buy 1, Get 1. Or the full trio with the Nail Kit is {currency}120.\' The single at {currency}60 makes the duo look unmissable. The {currency}120 trio then makes the {currency}60 duo look like a smart, budget-friendly choice. Most people pick the middle — which is exactly what you want.',
      textEs: '\'Tenemos tres opciones. Un Exfoliante solo cuesta {currency}60. El dúo de Exfoliante + Body Butter también son {currency}60 — Compra 1, Lleva 1. O el trío completo con el Kit de Uñas son {currency}120.\' El individual a {currency}60 hace que el dúo parezca imperdible. Luego el trío de {currency}120 hace que el dúo de {currency}60 parezca una elección inteligente y ajustada al presupuesto. La mayoría elige la del medio — que es exactamente lo que quieres.',
    },
    {
            type: 'tip',
      text: 'The two-choice framework only works when BOTH options are genuinely good values. If Option 1 is a terrible deal designed to push people to Option 2, customers sense the manipulation. Make both options attractive, just for different types of buyers.',
      textEs: 'El marco de dos opciones solo funciona cuando AMBAS opciones son genuinamente buenas ofertas. Si la Opción 1 es un mal trato diseñado para empujar a la gente a la Opción 2, los clientes sienten la manipulación. Haz ambas opciones atractivas, solo para diferentes tipos de compradores.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When Two Choices Become One',
      textEs: 'Cuando Dos Opciones Se Convierten en Una',
    },
    {
            type: 'paragraph',
      text: 'Sometimes the customer\'s situation clearly points to one option. When this happens, guide them to it rather than forcing a comparison that doesn\'t make sense:',
      textEs: 'A veces la situación del cliente apunta claramente a una opción. Cuando esto pasa, guíalos hacia ella en lugar de forzar una comparación que no tiene sentido:',
    },
    {
            type: 'bullets',
      items: [
        'CLEAR BUDGET CONSTRAINT: She has told you money is tight. Do not read that as "show her Option 1" — {currency}210 is your second opening offer, not a budget answer and it will not touch her. It means this conversation is going to finish around {currency}140, maybe {currency}100. Present the two options anyway, because that is the method, then walk the ladder properly: she asks, you pause, you give a reason, you move one rung. Nobody gets shown the door for having a small budget.',
        'CLEAR GIFT SHOPPER: If they\'re buying for three sisters, Option 2 (Buy 2 Get 1) is obvious. Don\'t overcomplicate.',
        'CLEAR PREMIUM BUYER: If they are carrying luxury bags and do not blink at the number, lead with Option 2 and stay at the top of the ladder. Somebody who came out to spend does not need a discount — and once the syringe is sold you hand her to the specialist, you do not go reaching for something else off your own tray.',
        'UNCERTAIN BUYER: When they are genuinely unsure, default to Option 1. It is easier to say yes to, and she can still move up while she is sitting in front of you.'
      ],
      itemsEs: [
          'PRESUPUESTO JUSTO Y CLARO: Te ha dicho que el dinero va contado. No lo leas como "enséñale la Opción 1" — {currency}210 es tu segunda oferta de salida, no la respuesta a un presupuesto ajustado y a ella no la toca. Significa que esta conversación va a terminar por {currency}140, quizá por {currency}100. Preséntale las dos opciones igualmente, porque ese es el método, y luego baja la escalera como toca: ella pide, tú haces una pausa, das un motivo y bajas un escalón. A nadie se le enseña la puerta por tener poco presupuesto.',
          'COMPRADOR DE REGALOS CLARO: Si están comprando para tres hermanas, la Opción 2 (Compra 2 Lleva 1) es obvia. No la compliques.',
          'COMPRADOR PREMIUM CLARO: Si vienen cargados de bolsas de lujo y no pestañean con el número, empieza por la Opción 2 y quédate arriba en la escalera. Quien ha salido a gastar no necesita un descuento — y una vez vendida la jeringa se la pasas al especialista, no vas a por otra cosa de tu propia bandeja.',
          'COMPRADOR INCIERTO: Cuando de verdad no lo tengan claro, tira de la Opción 1 por defecto. Es más fácil decirle que sí, y todavía puede subir mientras la tienes delante.',
        ],
    },
    {
            type: 'quote',
      text: 'Give them one option and they decide whether to buy. Give them two options and they decide which to buy. That\'s the difference between a conversation and a close.',
      textEs: 'Dales una opción y deciden si comprar. Dales dos opciones y deciden cuál comprar. Esa es la diferencia entre una conversación y un cierre.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'What cognitive shift happens when you offer two options instead of one?',
      options: [
        'The customer thinks the prices are too high',
        'The customer shifts from \'Should I buy?\' to \'Which one should I choose?\'',
        'The customer gets confused',
        'The customer always picks the cheaper option'
      ],
      correctIndex: 1,
      explanation: 'Two options change the mental frame from a yes/no purchase decision (where \'no\' is the default) to a comparison between options (where buying is assumed and they\'re just picking which one).',
    },
    {
      question: 'What is the decoy effect?',
      options: [
        'A technique where you trick the customer',
        'Adding a third option designed to make one of the main options more attractive',
        'Giving away free products',
        'Only showing the expensive option first'
      ],
      correctIndex: 1,
      explanation: 'The decoy effect involves adding an option that exists only to flatter another one. A single Scrub at {currency}60 makes the Buy 1 Get 1 duo — also {currency}60 — look unmissable, and that in turn makes the {currency}120 trio feel like the real value. Most customers pick the middle option.',
    },
    {
      question: 'What should you do when a customer clearly has budget constraints?',
      options: [
        'Still present both options equally',
        'Immediately pivot to the lower-priced option',
        'Insist on the premium option',
        'End the conversation'
      ],
      correctIndex: 1,
      explanation: 'When budget constraints are clear, immediately pivot to the lower-priced option. Forcing a comparison that doesn\'t make sense for their situation creates awkwardness and can lose the sale entirely.',
    }
    ],
  },
  'prod-3': {
    id: 'prod-3',
    categoryId: 'products',
    title: 'Adaptive Pricing Mastery',
    titleEs: 'Dominio de Precios Adaptativo',
    subtitle: 'Reading body language for price comfort, the gradual descent technique, and never going below minimum',
    subtitleEs: 'Lee al cliente, ajusta el precio',
    duration: '10 min',
    icon: 'TrendingUp',
    order: 3,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'The Best Closers Read the Room and Adjust in Real Time',
      textEs: 'Los Mejores Cerradores Leen el Ambiente y se Adaptan en Tiempo Real',
    },
    {
            type: 'paragraph',
      text: 'Presenting the offer isn\'t the end — it\'s the beginning of the close. Adaptive pricing is the art of reading the customer\'s reaction to your price and adjusting the offer on the fly. This is what separates good sellers from great ones. Anyone can memorize a script. Only masters can feel the room and adapt.',
      textEs: 'Presentar la oferta no es el final — es el principio del cierre. Los precios adaptativos son el arte de leer la reacción del cliente a tu precio y ajustar la oferta sobre la marcha. Esto es lo que separa a los buenos vendedores de los grandes. Cualquiera puede memorizar un guion. Solo los maestros pueden sentir el ambiente y adaptarse.',
    },
    {
            type: 'keypoint',
      text: 'The gradual descent: start high, wait to be ASKED, then remove a gift and come down one rung with a reason attached — and NEVER below your floor. Two things sellers get wrong here. They move on a facial expression instead of a question, which hands over money nobody asked for. And they answer "I am on a budget" as if it arrived at the top of the ladder. It never does. By the time anyone says that out loud you have already come down, so you are not defending {currency}300 — you are fighting for {currency}140, and sometimes for {currency}100.',
      textEs: 'El descenso gradual: empieza arriba, espera a que te lo PIDAN, y entonces quita un regalo y baja un escalón con un motivo detrás — y NUNCA por debajo de tu mínimo. Aquí hay dos cosas que se hacen mal. Bajar por una cara en vez de por una pregunta, que es regalar dinero que nadie te ha pedido. Y contestar al "voy justa de dinero" como si eso llegara arriba de la escalera. No llega nunca. Cuando alguien dice eso en voz alta ya has bajado, así que no estás defendiendo {currency}300 — estás peleando por {currency}140, y a veces por {currency}100.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reading Body Language for Price Comfort',
      textEs: 'Leyendo el Lenguaje Corporal para Medir Confort con el Precio',
    },
    {
            type: 'paragraph',
      text: 'The moment you state the price, watch their body. It tells you everything:',
      textEs: 'En el momento que digas el precio, observa su cuerpo. Te lo dice todo:',
    },
    {
            type: 'bullets',
      items: [
        'COMFORT SIGNAL: Brief nod, relaxed shoulders, slight smile, maintaining eye contact. They can afford it. Move to close.',
        'SHOCK SIGNAL: Eyes widen, sharp breath intake, head pulls back slightly. The price is higher than expected. You need to reframe value or prepare to descale.',
        'HIDDEN SHOCK: They maintain composure but glance at their partner, or their smile becomes fixed. They feel pressure to appear comfortable but are actually concerned. Watch for partner reactions.',
        'THE HARD NO SIGNAL: Immediate step back, arms fold, head shake. That is the number, not the product — she has just shown you where the top of her range is. Do not explain the product again and do not apologise. Go down a rung, take something out, give her a reason.',
        'THOUGHTFUL SIGNAL: They look down, touch chin, purse lips. They\'re calculating. Give them silence and space. This is often a buying signal disguised as hesitation.'
      ],
      itemsEs: [
          'SEÑAL DE CONFORT: Asentimiento breve, hombros relajados, leve sonrisa, manteniendo contacto visual. Pueden pagarlo. Ve al cierre.',
          'SEÑAL DE SORPRESA: Ojos se abren, respiración brusca, cabeza se echa hacia atrás ligeramente. El precio es más alto de lo esperado. Necesitas reencuadrar el valor o prepararte para reducir.',
          'SORPRESA OCULTA: Mantienen la compostura pero miran a su pareja, o su sonrisa se vuelve rígida. Sienten presión por parecer cómodos pero en realidad están preocupados. Observa las reacciones de su pareja.',
          'SEÑAL DE NO ROTUNDO: Paso atrás inmediato, brazos cruzados, negar con la cabeza. Eso es el número, no el producto — acaba de enseñarte dónde está el techo de lo suyo. No le vuelvas a explicar el producto y no pidas perdón. Baja un escalón, quita algo, dale un motivo.',
          'SEÑAL DE REFLEXIÓN: Miran hacia abajo, tocan la barbilla, fruncen los labios. Están calculando. Dale silencio y espacio. Esta suele ser una señal de compra disfrazada de duda.',
        ],
    },
    {
            type: 'tip',
      text: 'Price reactions happen in the first 2 seconds after you state the number. Train yourself to watch their face during those 2 seconds, not to keep talking. The information you gather determines your next move.',
      textEs: 'Las reacciones al precio ocurren en los primeros 2 segundos después de que dices el número. Entrénate para observar su rostro durante esos 2 segundos, no para seguir hablando. La información que recopiles determinará tu siguiente movimiento.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Gradual Descent Technique',
      textEs: 'La Técnica del Descenso Gradual',
    },
    {
            type: 'paragraph',
      text: 'This is your pricing staircase. Each step down removes value (gifts) to lower the price. The customer feels like they\'re getting a deal, not that you were overcharging:',
      textEs: 'Esta es tu escalera de precios. Cada paso hacia abajo remueve valor (regalos) para bajar el precio. El cliente siente que está obteniendo un trato, no que tú estabas cobrando de más:',
    },
    {
            type: 'numbered',
      items: [
        'STEP 1 — FULL OFFER: Present both options at full value. \'Option 1: {currency}210 with a gift. Option 2: {currency}300 with two syringes and creams.\' Say it warm, say it flat, then stop talking. This is your ceiling and everybody starts here — including the woman who has already told you money is tight.',
        'STEP 2 — REMOVE THE GIFT, ONCE SHE ASKS: A face is not an ask. Wait until she has actually asked you for a better price, and asked twice. Then pause, look at the box, breathe out like it hurts, and give her a reason: \'Go on then — my last customer only took the one. I\'ll pull the gift out, that\'s {currency}35, and do it at {currency}175 for you.\' She saves money; you lose a gift, not margin.',
        'STEP 3 — THE VOUCHER CLOSE, {currency}140: This is where the budget conversation actually happens — not up at {currency}300. She has pushed again, so drop your voice, glance at the door, make it a secret: \'Alright, I can do something a bit crazy, just this once. With a voucher, {currency}140. But you\'re being greedy — and only on the single, not the combo.\' There is no real voucher. It is the reason you needed in order to come down, invented on the spot, and it never leaves the shop with her.',
        'STEP 4 — THE FLOOR, {currency}100, AND IT IS NOT YOURS TO GIVE: {currency}140 is the voucher rung and it is the last one you own. Below it you go full market and you CALL A MANAGER — the floor comes from him, not from you. That is not red tape, it is what makes it a floor: a seller who can reach {currency}100 on his own has no floor at all, and she will find that out. While you wait, the arithmetic does more work than the theatre — one syringe, about sixty treatments, a whole year, under {currency}2 a go. Never cross the floor. If she has fought you all the way to {currency}100 and still says no, and you have honestly given it everything, that is the one time you let her go — a last resort, never a plan.'
      ],
      itemsEs: [
          'PASO 1 — OFERTA COMPLETA: Presenta las dos opciones a valor completo. \'Opción 1: {currency}210 con regalo. Opción 2: {currency}300 con dos jeringas y cremas.\' Dilo con calor, dilo plano y luego cállate. Este es tu techo y aquí empieza todo el mundo — también la que ya te ha dicho que va justa de dinero.',
          'PASO 2 — QUITA EL REGALO, CUANDO TE LO PIDA: Una cara no es una petición. Espera a que te pida un precio mejor de verdad, y que te lo pida dos veces. Entonces haz una pausa, mira la caja, suelta el aire como si doliera y dale un motivo: \'Venga, va — mi última clienta se llevó solo una. Te quito el regalo, que son {currency}35, y te la dejo en {currency}175.\' Ella ahorra dinero; tú pierdes un regalo, no margen.',
          'PASO 3 — EL CIERRE CON CUPÓN, {currency}140: Aquí es donde pasa de verdad la conversación del presupuesto — no arriba en {currency}300. Ha vuelto a empujar, así que baja la voz, mira a la puerta y haz que sea un secreto: \'Vale, puedo hacer una cosa un poco loca, solo por esta vez. Con un cupón, {currency}140. Pero estás siendo codiciosa — y solo en la individual, no en el combo.\' No existe ningún cupón. Es el motivo que necesitabas para bajar, inventado en el momento, y no sale nunca de la tienda con ella.',
          'PASO 4 — EL SUELO, {currency}100, Y NO ES TUYO PARA DARLO: los {currency}140 son el escalón del cupón y el último que llevas tú. Por debajo vas a mercado total y LLAMAS A UN ENCARGADO — el suelo lo pone él, no tú. Eso no es burocracia, es lo que lo convierte en suelo: un vendedor que llega a {currency}100 él solito no tiene suelo ninguno, y ella se va a enterar. Mientras esperas, las cuentas trabajan más que el teatro — una jeringa, unos sesenta tratamientos, un año entero, menos de {currency}2 cada vez.',
        ],
    },
    {
            type: 'script',
      text: '\'Option 1 is {currency}210 with the gift. Option 2 is {currency}300 and the second syringe comes with it.\' [Now stop talking.] — \'Is that the best you can do?\' That is once. Laugh it off: \'Whoa, whoa. I\'ve known you thirty seconds and you\'re already robbing me.\' — She asks again. That is twice, and NOW you move, once, with a reason on it: [pause, look at the box, breathe out] \'Go on then. My last customer only took the one. I\'ll pull the gift out, that\'s {currency}35, and do it at {currency}175 for you.\' Then stop talking again. One ask, one laugh, one rung.',
      textEs: '\'La Opción 1 son {currency}210 con el regalo. La Opción 2 son {currency}300 y la segunda jeringa va incluida.\' [Y ahora te callas.] — \'¿Es lo mejor que puedes hacer?\' Eso es una. Quítatelo de encima con guasa: \'Eh, eh. Hace treinta segundos que te conozco y ya me estás robando.\' — Te lo vuelve a pedir. Eso son dos, y AHORA te mueves, una vez, con un motivo encima: [pausa, mira la caja, suelta el aire] \'Venga, va. Mi última clienta se llevó solo una. Te quito el regalo, que son {currency}35, y te la dejo en {currency}175.\' Y te callas otra vez. Una petición, una risa, un escalón.',
    },
    {
            type: 'script',
      text: 'And when she pushes a third time — this is the one that matters, because this is where the money conversation actually ends. Voice down, quick look at the door, lean in: \'Alright. I can do something a bit crazy, just this once. With a voucher — {currency}140. But you\'re being greedy, and I can only do it on the single one.\' Then hands off the table and let her have it. You are not announcing a discount, you are letting her win something. If she has genuinely fought you past that, {currency}100 is the wall — one syringe, sixty treatments, under {currency}2 a go — and you hand it over like it hurt.',
      textEs: 'Y cuando empuje una tercera vez — esta es la que importa, porque aquí es donde se acaba de verdad la conversación del dinero. Baja la voz, mirada rápida a la puerta, acércate un poco: \'Vale. Puedo hacer una cosa un poco loca, solo por esta vez. Con un cupón — {currency}140. Pero estás siendo codiciosa, y solo te lo puedo hacer en la individual.\' Y luego manos fuera de la mesa y déjaselo. No estás anunciando un descuento, le estás dejando ganar algo. Si de verdad te ha peleado más allá de eso, {currency}100 es el muro — una jeringa, sesenta tratamientos, menos de {currency}2 cada vez — y se lo entregas como si te doliera.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When to Drop the Gift vs. When to Add Value',
      textEs: 'Cuándo Quitar el Regalo vs. Cuándo Agregar Valor',
    },
    {
            type: 'paragraph',
      text: 'Sometimes you descale (remove gifts, lower price). Sometimes you upscale (add value, maintain price). Know which to use:',
      textEs: 'A veces reduces (quitas regalos, bajas el precio). A veces aumentas (agregas valor, mantienes el precio). Saber cuál usar:',
    },
    {
            type: 'comparison',
      left: { label: 'Descale (Drop Price)', text: 'Use when: she has ASKED you for a better price — and asked twice. Not when she pulls a face, not when she goes quiet, not when she looks like she cannot afford it. A face is not an ask, and money you hand over unasked teaches her the numbers move whenever she pushes. Then read what "money is tight" actually means: not that you should jump, but that this one is going to finish at {currency}140 or {currency}100. So go one rung at a time, put a reason on every rung, and keep something in your hand for the next ask.' },
      leftEs: { label: 'Reducir (Bajar Precio)', text: 'Úsalo cuando: te haya PEDIDO un precio mejor — y te lo haya pedido dos veces. No cuando pone una cara, no cuando se queda callada, no cuando parece que no puede pagarlo. Una cara no es una petición, y el dinero que sueltas sin que te lo pidan le enseña que los números se mueven cada vez que empuja. Y luego lee lo que significa de verdad "voy justa": no que tengas que saltar, sino que esta acaba en {currency}140 o en {currency}100. Así que baja de escalón en escalón, pon un motivo en cada uno y guárdate algo para la siguiente petición.' },
      right: { label: 'Upscale (Add Value)', text: 'Use when: Customer shows no price sensitivity, carries luxury bags, expresses love for the product, is buying gifts for multiple people. Add a cream, add a second syringe, create a bundle. They\'re willing to spend — help them.' },
      rightEs: { label: 'Subir (Añadir Valor)', text: 'Úsalo cuando: el cliente no muestra sensibilidad al precio, lleva bolsas de lujo, dice que le encanta el producto, está comprando regalos para varias personas. Añade una crema, añade una segunda jeringa, monta un pack. Están dispuestos a gastar — ayúdales.' }
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Psychology of \'Store Credit\' Reframing',
      textEs: 'La Psicología del Reencuadre de \'Crédito de Tienda\'',
    },
    {
            type: 'paragraph',
      text: 'One of the most effective techniques is reframing a removed gift as \'store credit.\' Instead of saying \'I\'ll remove the Scrub,\' say \'I\'ll take the Scrub out and put its value straight back to you as store credit to bring your price down.\' This feels like you\'re being creative on their behalf, not just removing value.',
      textEs: 'Una de las técnicas más efectivas es reencuadrar un regalo removido como \'crédito de tienda.\' En lugar de decir \'Quito el Exfoliante,\' di \'Saco el Exfoliante y te devuelvo su valor como crédito de tienda para bajar tu precio.\' Esto se siente como si estuvieras siendo creativo en su beneficio, no solo removiendo valor.',
    },
    {
            type: 'script',
      text: 'That is the peeling coming off its {currency}100 offer, where the Scrub rides along as the gift: \'Listen, I know, I know. Let me make it easy — I\'ll take the Scrub out and put its value straight back to you as credit. That brings it to {currency}70 for you.\' The word \'credit\' makes them feel clever for saving. Not skint for hesitating. One rung, and only after they have asked.',
      textEs: 'Eso es el peeling bajando de su oferta de {currency}100, donde el Exfoliante va incluido como regalo: \'Mira, ya lo sé, ya lo sé. Deja que te lo ponga fácil — te saco el Exfoliante y te devuelvo su valor como crédito. Eso te lo deja en {currency}70.\' La palabra \'crédito\' les hace sentirse listos por ahorrar. No pobres por dudar. Un escalón, y solo después de que lo hayan pedido.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Wall',
      textEs: 'El Muro',
    },
    {
            type: 'paragraph',
      text: 'Your floor is the wall. Below it you are working for free, and they can smell it on you. Here is why it matters:',
      textEs: 'Tu mínimo es el muro. Por debajo de ahí estás trabajando gratis, y se te nota. Por esto importa:',
    },
    {
            type: 'bullets',
      items: [
        'MARGIN PROTECTION: Going below minimum destroys profitability. You didn\'t set the floor randomly — it protects the business.',
        'VALUE PERCEPTION: Desperate discounting tells the customer (and yourself) that the product wasn\'t worth the original price. Protect the product\'s value.',
        'PRECEDENT: If you go below minimum once, the customer tells friends. Word spreads. The floor becomes the ceiling.',
        'YOUR COMMISSION: Every euro below minimum comes out of your potential earnings. Respect your own paycheck.'
      ],
      itemsEs: [
          'PROTECCIÓN DE MARGEN: Bajar del mínimo destruye la rentabilidad. No pusiste el piso al azar — protege el negocio.',
          'PERCEPCIÓN DE VALOR: Los descuentos desesperados le dicen al cliente (y a ti mismo) que el producto no valía el precio original. Protege el valor del producto.',
          'PRECEDENTE: Si bajas del mínimo una vez, el cliente se lo cuenta a sus amigos. Se corre la voz. El piso se convierte en el techo.',
          'TU COMISIÓN: Cada euro bajo el mínimo sale de tus ganancias potenciales. Respeta tu propio salario.',
        ],
    },
    {
            type: 'tip',
      text: 'Know your minimums by heart: Syringe {currency}100 (absolute floor — {currency}140 is the voucher close, one rung above it), Peeling {currency}50, Scrub {currency}30 (single), Nail Kit {currency}30 (single). That is the wall. Learn to say no with a smile instead of an apology: \'You are killing me. Honestly, at that price I am paying for the privilege — this is where I stop.\' Say it once, laugh, and go quiet. The silence does the rest.',
      textEs: 'Aprende de memoria tus mínimos: Jeringa {currency}100 (mínimo absoluto — {currency}140 es el cierre con cupón, un escalón por encima), Peeling {currency}50, Exfoliante {currency}30 (individual), Kit de Uñas {currency}30 (individual). Ese es el muro. Aprende a decir que no con una sonrisa, no pidiendo perdón: \'Me estás matando. De verdad, a ese precio pago yo por trabajar — aquí es donde me planto.\' Dilo una vez, ríete y cállate. El silencio hace el resto.',
    },
    {
            type: 'quote',
      text: 'Adaptive pricing isn\'t about being cheap. It\'s about being flexible within your boundaries. The customer who respects your floor price is the customer who values what you sell.',
      textEs: 'Los precios adaptativos no se tratan de ser barato. Se trata de ser flexible dentro de tus límites. El cliente que respeta tu precio mínimo es el cliente que valora lo que vendes.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'What is the gradual descent technique?',
      options: [
        'Randomly lowering the price until they agree',
        'A structured staircase where each step removes gifts to lower the price while maintaining value perception',
        'Starting with the lowest price and going up',
        'Matching the customer\'s first offer'
      ],
      correctIndex: 1,
      explanation: 'The gradual descent is a structured approach: present full offer, then remove gift (Step 2), then voucher close (Step 3), each feeling like a personalized solution rather than desperate discounting.',
    },
    {
      question: 'What does \'store credit\' reframing accomplish?',
      options: [
        'It tricks the customer into paying more',
        'It makes the customer feel smart for saving rather than poor for hesitating',
        'It adds actual store credit to their account',
        'It confuses the customer'
      ],
      correctIndex: 1,
      explanation: 'Reframing a removed gift as \'store credit\' (e.g., \'let me take the Scrub out and give you its value back as credit\') makes the price reduction feel like a creative solution on their behalf, not just removing value.',
    },
    {
      question: 'Why should you never go below your minimum floor price?',
      options: [
        'Because the manager will be angry',
        'It protects margins, value perception, and your commission — and sets a dangerous precedent if broken',
        'Because customers will always demand it',
        'Because the products are too expensive'
      ],
      correctIndex: 1,
      explanation: 'Going below minimum destroys profitability, devalues the product in customers\' eyes, sets a bad precedent, and reduces your commission. The floor exists for good business reasons.',
    }
    ],
  },
  'prod-4': {
    id: 'prod-4',
    categoryId: 'products',
    title: 'The Voucher Close',
    titleEs: 'El Cierre con Voucher',
    subtitle: 'Psychological breakdown of why it works — scarcity, exclusivity, and reciprocity combined',
    subtitleEs: 'Usa vouchers para cerrar rápido',
    duration: '8 min',
    icon: 'Ticket',
    order: 4,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Your Final Weapon, Used Wisely',
      textEs: 'Tu Arma Final, Usada con Sabiduría',
    },
    {
            type: 'paragraph',
      text: 'The voucher close is the ace up your sleeve. When the customer loves the product, appreciates the value, but just can\'t quite pull the trigger — the voucher close provides the gentle nudge. Done right, it feels like an insider secret. Done wrong, it feels like a cheap trick. Master the psychology and the delivery.',
      textEs: 'El cierre con voucher es el as en la manga. Cuando el cliente ama el producto, aprecia el valor, pero simplemente no logra dar el paso — el cierre con voucher proporciona el empujoncito gentil. Bien hecho, se siente como un secreto de iniciados. Mal hecho, se siente como un truco barato. Domina la psicología y la entrega.',
    },
    {
            type: 'keypoint',
      text: 'The voucher close combines three psychological principles simultaneously: scarcity (one-time only), exclusivity (just for you), and reciprocity (I\'m doing you a favor — you should commit). This triple-whammy is why it\'s so effective.',
      textEs: 'El cierre con voucher combina tres principios psicológicos simultáneamente: escasez (solo una vez), exclusividad (solo para ti), y reciprocidad (te estoy haciendo un favor — tú deberías comprometerte). Este triple golpe es por lo que es tan efectivo.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Why the Voucher Close Works: The Psychology',
      textEs: 'Por Qué Funciona el Cierre con Voucher: La Psicología',
    },
    {
            type: 'paragraph',
      text: 'Let\'s break down exactly what\'s happening in the customer\'s mind during a voucher close:',
      textEs: 'Analicemos exactamente qué está pasando en la mente del cliente durante un cierre con voucher:',
    },
    {
            type: 'bullets',
      items: [
        'SCARCITY: \'This is a one-time thing.\' The customer knows the opportunity won\'t come again. Loss aversion kicks in — the pain of missing out feels worse than the pain of spending.',
        'EXCLUSIVITY: \'Just for you.\' The customer feels special, not sold to. They\'re receiving insider treatment. This creates a personal bond — they don\'t want to disappoint you after you \'went to bat\' for them.',
        'RECIPROCITY: You\'ve just done them a favor by finding a special price. Human psychology compels them to reciprocate — by saying yes. The \'two promises\' at the end activate this reciprocity explicitly.',
        'AUTHORITY: \'I just checked\' implies you have the power to make this happen. You\'re not just a salesperson — you\'re a decision-maker who chose to help them.',
        'COMMITMENT: \'Promise me you\'ll actually use it\' creates a verbal commitment. Once someone promises something, they\'re more likely to follow through.'
      ],
      itemsEs: [
          'ESCASEZ: \'Esto es de una sola vez.\' El cliente sabe que la oportunidad no volverá. La aversión a la pérdida entra en acción — el dolor de perderse algo se siente peor que el dolor de gastar.',
          'EXCLUSIVIDAD: \'Solo para ti.\' El cliente se siente especial, no vendido. Están recibiendo trato de iniciado. Esto crea un vínculo personal — no quieren decepcionarte después de que \'pusiste el pecho\' por ellos.',
          'RECIPROCIDAD: Acabas de hacerles un favor al encontrar un precio especial. La psicología humana los obliga a reciprocar — diciendo que sí. Las \'dos promesas\' al final activan esta reciprocidad explícitamente.',
          'AUTORIDAD: \'Acabo de revisar\' implica que tienes el poder de hacer esto posible. No eres solo un vendedor — eres un tomador de decisiones que eligió ayudarlos.',
          'COMPROMISO: \'Prométeme que realmente lo usarás\' crea un compromiso verbal. Una vez que alguien promete algo, es más probable que lo cumpla.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Exact Script and Delivery',
      textEs: 'El Guión Exacto y la Entrega',
    },
    {
            type: 'paragraph',
      text: 'Delivery is everything. The words are only half the formula. Here\'s how to deliver the voucher close:',
      textEs: 'La entrega lo es todo. Las palabras son solo la mitad de la fórmula. Así es cómo entregar el cierre con voucher:',
    },
    {
            type: 'numbered',
      items: [
        'STEP 1 — DROP YOUR VOICE: Lower your volume slightly. This signals that what you\'re about to say is exclusive, maybe even a little secretive. Loud announcements feel public and therefore less special.',
        'STEP 2 — THE SETUP: \'Alright, alright... listen, I just checked something, and I can do a small crazy offer for you. But you can\'t be greedy, okay?\' This frames the offer as something YOU\'RE doing for THEM, not a standard discount.',
        'STEP 3 — THE LIMITATION: \'I can\'t do this on the big option — only on the single one.\' Limitations increase perceived value. If you could do it on everything, it\'s not special. Limiting it makes it feel real.',
        'STEP 4 — THE PRICE: \'So remember I told you without the gift it\'s {currency}175? If you use this small 20% discount voucher, it brings it down to {currency}140. But this is a one-time thing — next time, it goes back to normal.\'',
        'STEP 5 — THE TWO PROMISES: \'You just promise me two things, okay? One: you\'ll actually use it. Two: if you\'re happy, you\'ll tell your friends about us.\' This creates commitment and plants a referral seed.',
        'STEP 6 — THE WHATSAPP BRIDGE: \'You use WhatsApp, right? Perfect. You\'ll have my number and email — just let me know if you need anything.\' Transforms transaction into relationship.'
      ],
      itemsEs: [
          'PASO 1 — BAJA LA VOZ: Baja ligeramente tu volumen. Esto señala que lo que estás a punto de decir es exclusivo, tal vez incluso un poco secreto. Los anuncios en voz alta se sienten públicos y por tanto menos especiales.',
          'PASO 2 — LA PREPARACIÓN: \'Está bien, está bien... escucha, acabo de revisar algo, y puedo hacer una pequeña oferta loca para ti. Pero no puedes ser codicioso, ¿vale?\' Esto enmarca la oferta como algo que TÚ estás haciendo por ELLOS, no como un descuento estándar.',
          'PASO 3 — LA LIMITACIÓN: \'No puedo hacer esto en la opción grande — solo en la individual.\' Las limitaciones aumentan el valor percibido. Si pudieras hacerlo en todo, no sería especial. Limitarlo lo hace sentir real.',
          'PASO 4 — EL PRECIO: \'Entonces recuerda que te dije que sin el regalo es {currency}175? Si usas este pequeño voucher de descuento del 20%, lo baja a {currency}140. Pero esto es de una sola vez — la próxima vez, vuelve a lo normal.\'',
          'PASO 5 — LAS DOS PROMESAS: \'Solo me prometes dos cosas, ¿vale? Una: que realmente lo usarás. Dos: si estás feliz, le contarás a tus amigos sobre nosotros.\' Esto crea compromiso y siembra una semilla de referido.',
          'PASO 6 — EL PUENTE DE WHATSAPP: \'¿Usas WhatsApp, verdad? Perfecto. Tendrás mi número y email — solo avísame si necesitas algo.\' Transforma la transacción en relación.',
        ],
    },
    {
            type: 'script',
      text: '\'Alright, alright... listen, I just checked, and I can do something a little crazy for you. But you can\'t be greedy, okay? I can\'t do this on the double syringe, only on the single one. So remember I told you it\'s {currency}175 without the gift? If you use this small 20% voucher, I can bring it down to {currency}140. But this is a one-time thing — next time, it goes back to normal. You just promise me two things: you\'ll actually use it, and if you love it, you\'ll tell your friends. Deal?\'',
      textEs: '\'Está bien, está bien... escucha, acabo de revisar, y puedo hacer algo un poco loco para ti. Pero no puedes ser codicioso, ¿vale? No puedo hacer esto en la jeringa doble, solo en la individual. Entonces recuerda que te dije que es {currency}175 sin el regalo? Si usas este pequeño voucher del 20%, puedo dejarlo en {currency}140. Pero esto es de una sola vez — la próxima vez, vuelve a lo normal. Solo me prometes dos cosas: que realmente lo usarás, y si te encanta, le contarás a tus amigos. ¿Trato?\'',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Script Variations for Different Situations',
      textEs: 'Variaciones del Guión para Diferentes Situaciones',
    },
    {
            type: 'bullets',
      items: [
        'THE FRIENDLY VERSION: \'Okay, I\'m going to do something I probably shouldn\'t... but you seem so lovely, and I really want you to have this. Just don\'t tell my boss!\' Playful, conspiratorial.',
        'THE STRAIGHT VERSION: \'Alright, let me check something... right. I have got one voucher left and it only works on the single. That takes it to {currency}140. That is the number, I cannot do better than that.\' For the one who does not want the wink.',
        'THE URGENT VERSION: \'I only have one voucher left today, and honestly, I\'ve been saving it for someone who really appreciates the product. That\'s you. {currency}140, just this once.\' Scarcity + personalization.',
        'THE RELATIONSHIP VERSION: \'I want you to be a happy customer who comes back. So here\'s what I\'ll do — {currency}140 on the single one, and you have my WhatsApp for anything you need later.\' Long-term focus.'
      ],
      itemsEs: [
          'LA VERSIÓN AMIGABLE: \'Vale, voy a hacer algo que probablemente no debería... pero pareces tan encantador, y realmente quiero que tengas esto. ¡Solo no le digas a mi jefe!\' Juguetona, conspirativa.',
          'LA VERSIÓN DIRECTA: \'Vale, déjame mirar una cosa... eso es. Me queda un cupón y solo vale para la individual. Eso la deja en {currency}140. Ese es el número, no te lo puedo dejar mejor.\' Para el que no quiere el guiño.',
          'LA VERSIÓN URGENTE: \'Solo me queda un voucher hoy, y honestamente, lo he estado guardando para alguien que realmente aprecie el producto. Ese eres tú. {currency}140, solo esta vez.\' Escasez + personalización.',
          'LA VERSIÓN DE RELACIÓN: \'Quiero que seas un cliente contento que vuelva. Así que esto es lo que haré — {currency}140 en la individual, y tendrás mi WhatsApp para cualquier cosa que necesites después.\' Enfoque a largo plazo.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When to Use the Voucher Close vs. When It Hurts',
      textEs: 'Cuándo Usar el Cierre con Voucher vs. Cuándo Perjudica',
    },
    {
            type: 'comparison',
      left: { label: 'Use the Voucher Close', text: 'Customer loves the product but hesitates on price. They\'ve seen the demo, they\'re engaged, but need a final nudge. They say \'I need to think about it.\' You sense genuine interest held back by budget.' },
      leftEs: { label: 'Usa el Cierre con Voucher', text: 'El cliente ama el producto pero duda con el precio. Han visto la demostración, están comprometidos, pero necesitan un empujón final. Dicen \'Necesito pensarlo.\' Sientes interés genuino frenado por el presupuesto.' },
      right: { label: 'Don\'t Use the Voucher Close', text: 'Customer shows no interest in the product. They haven\'t engaged with the demo. Price isn\'t the issue — the product is. Using the voucher close here devalues the product for no reason. Save it for the right moment.' },
      rightEs: { label: 'No Uses el Cierre del Cupón', text: 'El cliente no muestra ningún interés en el producto. No ha entrado en la demo. El problema no es el precio — es el producto. Usar aquí el cierre del cupón devalúa el producto sin ningún motivo. Guárdalo para el momento adecuado.' }
    },
    {
            type: 'tip',
      text: 'The voucher close loses power if overused. If you offer it to every single customer, it becomes your default price, not a special deal. Use it selectively — on customers who genuinely need that final push, not as your opening offer.',
      textEs: 'El cierre con voucher pierde poder si se usa en exceso. Si se lo ofreces a cada cliente, se convierte en tu precio por defecto, no en una oferta especial. Úsalo selectivamente — en clientes que genuinamente necesitan ese empujón final, no como tu oferta inicial.',
    },
    {
            type: 'quote',
      text: 'The voucher close isn\'t a discount. It\'s a key to a locked door. The customer is already inside the room, looking at what they want. You\'re just handing them the key to take it home.',
      textEs: 'El cierre con voucher no es un descuento. Es una llave para una puerta cerrada. El cliente ya está dentro del cuarto, mirando lo que quiere. Solo le estás entregando la llave para llevárselo a casa.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'Which three psychological principles does the voucher close combine?',
      options: [
        'Fear, guilt, and shame',
        'Scarcity, exclusivity, and reciprocity',
        'Love, hope, and charity',
        'Pride, envy, and greed'
      ],
      correctIndex: 1,
      explanation: 'The voucher close combines scarcity (one-time only), exclusivity (just for you), and reciprocity (I\'m doing you a favor — you should commit). This triple combination is why it\'s so effective.',
    },
    {
      question: 'Why should you drop your voice during the voucher close?',
      options: [
        'To intimidate the customer',
        'To signal that what you\'re saying is exclusive and secretive, making it feel more special',
        'Because you\'re whispering a secret',
        'To save your voice'
      ],
      correctIndex: 1,
      explanation: 'Lowering your volume signals exclusivity and confidentiality. It makes the offer feel like an insider secret rather than a public announcement, increasing its perceived value and personal nature.',
    },
    {
      question: 'When should you NOT use the voucher close?',
      options: [
        'When the customer genuinely loves the product but hesitates on price',
        'When the customer shows no interest in the product — it devalues the product unnecessarily',
        'When the customer asks for a discount',
        'When it\'s the end of your shift'
      ],
      correctIndex: 1,
      explanation: 'The voucher close should only be used when the customer genuinely loves the product but needs a final nudge. Using it on uninterested customers devalues the product and wastes your most powerful closing tool.',
    }
    ],
  },
  'prod-5': {
    id: 'prod-5',
    categoryId: 'products',
    title: 'The Handover',
    titleEs: 'El Traspaso',
    subtitle: 'She bought the syringe. Your job is finished — now you pass her to the specialist',
    subtitleEs: 'Ha comprado la jeringa. Tu trabajo se acaba ahí — ahora se la pasas al especialista',
    duration: '6 min',
    icon: 'Users',
    order: 5,
    xpReward: 100,
    sections: [
      {
        type: 'header',
        text: 'Your Job Ends at the Syringe',
        textEs: 'Tu Trabajo se Acaba en la Jeringa',
      },
      {
        type: 'paragraph',
        text: `She has paid for the syringe. Somewhere in your head there is a voice saying go on then, sell her the scrub as well. Kill that voice. The syringe WAS the job and the job is done, and the next thing that happens to this woman is not another pot out of your tray — it is a different person, selling something you do not sell.`,
        textEs: `Ha pagado la jeringa. En algún sitio de tu cabeza hay una voz que dice venga, véndele también el exfoliante. Mata esa voz. La jeringa ERA el trabajo y el trabajo está hecho, y lo siguiente que le pasa a esta mujer no es otro bote de tu bandeja — es otra persona, vendiendo algo que tú no vendes.`,
      },
      {
        type: 'keypoint',
        text: `An upsell in this shop is not you pitching a second product. It is a handover. If they sold a syringe, the whole point is to pass it to an upseller — and selling the syringe is the win. That is what your shift is counted in. What comes after it belongs to somebody else.`,
        textEs: `Una venta adicional en esta tienda no eres tú soltando un segundo producto. Es un traspaso. Si has vendido una jeringa, la gracia es pasársela al que hace la venta adicional — y vender la jeringa es la victoria. Eso es lo que cuenta en tu turno. Lo que viene después es de otro.`,
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'What the Specialist Sells',
        textEs: 'Lo Que Vende el Especialista',
      },
      {
        type: 'paragraph',
        text: `Red and infrared LED devices. It is the alternative to a facelift: it gets the body making its own collagen and elastin, and it lifts the face. That is the whole of what you need to know and the whole of what you ever say about it — you are not the one selling it, and a half-remembered version out of your mouth makes his job harder, not easier.`,
        textEs: `Aparatos de LED rojo e infrarrojo. Es la alternativa al lifting: hace que el cuerpo produzca su propio colágeno y elastina, y levanta la cara. Eso es todo lo que necesitas saber y todo lo que dices de ello — no eres tú quien lo vende, y una versión a medias saliendo de tu boca le complica el trabajo, no se lo facilita.`,
      },
      {
        type: 'keypoint',
        text: `And to her he is a specialist, never "the upseller". That is the word for the staff room. In front of a customer he is the one who does this, he is only here for a short while, and you are lucky he has a second.`,
        textEs: `Y para ella es un especialista, nunca "el de la venta adicional". Esa palabra es para la trastienda. Delante de una clienta él es el que hace esto, está aquí poco tiempo, y tienes suerte de que tenga un segundo.`,
      },
      {
        type: 'tip',
        text: `You never put a price on it, you never promise a discount on it, and you never start explaining how it works. You are the person who tells her he is worth two minutes. He is the person who sells it. If she asks what it costs: "That is his — he will tell you in one second."`,
        textEs: `Tú no le pones precio, no prometes ningún descuento y no te pones a explicar cómo funciona. Tú eres quien le dice que él merece dos minutos. Él es quien lo vende. Si te pregunta cuánto cuesta: "Eso es suyo — te lo dice él en un segundo."`,
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'The Handover, Line by Line',
        textEs: 'El Traspaso, Frase por Frase',
      },
      {
        type: 'paragraph',
        text: `Four beats and about thirty seconds, and all of it happens while she is still sitting down and still delighted. Do not stand her up first. A woman on her feet with a bag in her hand is a woman already halfway to the door.`,
        textEs: `Cuatro tiempos y unos treinta segundos, y todo pasa mientras sigue sentada y sigue encantada. No la levantes primero. Una mujer de pie con la bolsa en la mano ya va camino de la puerta.`,
      },
      {
        type: 'numbered',
        items: [
          'BUILD HIM UP BEFORE SHE MEETS HIM: he is a specialist, he is only with us a short time, and he is amazing at what he does. You are not introducing a colleague — you are telling her she is about to meet somebody people wait for.',
          'MAKE IT A GIFT, NOT A PITCH: "Just because you got this, I\'m going to spoil you with a small gift." She has just spent money. The very next thing out of your mouth should be you giving her something, not asking her for more. And the gift is his two minutes on her face — not something to drop in her bag on the way out.',
          'ASK THE QUESTION THAT DOES THE WORK: "What is more important for you, if you could get it lifted? The cheeks? The neck?" Two options and both of them are a yes. Whichever she picks, she has said out loud what she would change about her own face.',
          'THEN GO AND GET HIM: "Would that make you happy? Let me check with him, if you have one second." You walk, you bring him back, he takes it from there. She stays exactly where she is.',
        ],
        itemsEs: [
          'MÓNTALO ANTES DE QUE LO CONOZCA: es un especialista, está con nosotros poco tiempo y es un crack en lo suyo. No estás presentando a un compañero — le estás diciendo que va a conocer a alguien por el que la gente espera.',
          'QUE SEA UN REGALO, NO UNA VENTA: "Solo porque te has llevado esto, te voy a mimar con un regalito." Acaba de gastarse el dinero. Lo siguiente que salga de tu boca tiene que ser tú dándole algo, no pidiéndole más. Y el regalo son sus dos minutos en su cara — no algo que meterle en la bolsa al salir.',
          'HAZ LA PREGUNTA QUE TRABAJA SOLA: "¿Qué es más importante para ti, si pudieras levantarlo? ¿Los pómulos? ¿El cuello?" Dos opciones y las dos son un sí. Elija la que elija, ha dicho en voz alta qué se cambiaría de su propia cara.',
          'Y AHORA VE A BUSCARLO: "¿Eso te haría feliz? Déjame consultarlo con él, si tienes un segundo." Andas, lo traes, y él coge el relevo. Ella se queda exactamente donde está.',
        ],
      },
      {
        type: 'script',
        text: `"Listen — before you go. There is a guy here, a specialist, he is only with us a short time and honestly, he is amazing at what he does. And just because you got this, I'm going to spoil you with a small gift. Tell me one thing: what is more important for you, if you could get it lifted — the cheeks, or the neck? … Would that make you happy? Let me check with him, if you have one second."`,
        textEs: `"Escucha — antes de que te vayas. Aquí hay un chico, un especialista, está con nosotros poco tiempo y de verdad, es un crack en lo suyo. Y solo porque te has llevado esto, te voy a mimar con un regalito. Dime una cosa: ¿qué es más importante para ti, si pudieras levantarlo — los pómulos, o el cuello? … ¿Eso te haría feliz? Déjame consultarlo con él, si tienes un segundo."`,
      },
      {
        type: 'keypoint',
        text: `Notice that she is never asked whether she wants to meet him. She is asked which part of her own face she would lift. By the time you walk off to fetch him she has already answered a question that only makes sense if she is staying in that chair.`,
        textEs: `Fíjate en que nunca se le pregunta si quiere conocerlo. Se le pregunta qué parte de su cara se levantaría. Para cuando te vas a buscarlo, ya ha contestado a una pregunta que solo tiene sentido si se queda en esa silla.`,
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'What You Do Not Do After a Syringe',
        textEs: 'Lo Que No Haces Después de una Jeringa',
      },
      {
        type: 'bullets',
        items: [
          'DO NOT SELL A SECOND PRODUCT: no scrub, no body butter, no nail kit, no "since you are already having the eyes done". You are not building a basket. You are passing her on.',
          'DO NOT SEND HER TO HIM: you go and get him. She stays sitting, with the bag in her hand. Anybody who stands up to be walked somewhere can just as easily walk out.',
          'DO NOT PRICE HIS PRODUCT: you have no ladder for it and no permission to invent one. Guess a number and you have either undercut him or frightened her.',
          'DO NOT DO HIS DEMO FOR HIM: two sentences about him and one question. Talk for two minutes about LED and you are doing his job badly, in front of him.',
          'DO NOT LET IT COOL: this happens on top of her mood, in the same breath as the sale. Once she has stood up, straightened her coat and thanked you, the moment has gone.',
        ],
        itemsEs: [
          'NO LE VENDAS UN SEGUNDO PRODUCTO: ni exfoliante, ni manteca corporal, ni kit de uñas, ni "ya que te estás haciendo los ojos". No estás llenando una cesta. La estás pasando.',
          'NO LA MANDES A ÉL: vas tú a buscarlo. Ella se queda sentada, con la bolsa en la mano. Quien se levanta para que lo lleven a algún sitio también se puede ir por la puerta.',
          'NO LE PONGAS PRECIO A SU PRODUCTO: no tienes escalera para eso ni permiso para inventarte una. Si te sacas un número, o le has bajado el precio a él o la has asustado a ella.',
          'NO LE HAGAS LA DEMO: dos frases sobre él y una pregunta. Ponte dos minutos a hablar de LED y estarás haciendo su trabajo mal, y delante de él.',
          'NO DEJES QUE SE ENFRÍE: esto va encima de su subidón, en el mismo aliento que la venta. Cuando ya se ha levantado, se ha colocado el abrigo y te ha dado las gracias, el momento se ha ido.',
        ],
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'And Which Product Were You Selling Anyway?',
        textEs: '¿Y Qué Producto Estabas Vendiendo, en Realidad?',
      },
      {
        type: 'paragraph',
        text: `Half the reason sellers reach for a second product is that nobody ever told them straight which one matters. So, straight: there is a hierarchy, and it is not four equal things on a tray.`,
        textEs: `La mitad de las veces que un vendedor va a por un segundo producto es porque nadie le ha dicho claro cuál importa. Pues claro: hay una jerarquía, y no son cuatro cosas iguales en una bandeja.`,
      },
      {
        type: 'bullets',
        items: [
          'THE SYRINGE IS THE STAR: it is what we sell, what we focus on, and what a good day is made of. Every stop you make out on that floor is aimed at it.',
          'THE PEELING IS IN BETWEEN: a real sale and a good one, but not the one the shift is measured by.',
          'THE SCRUB, THE BODY BUTTER AND THE NAIL KIT ARE BEGINNER PRODUCTS: they exist so you learn how to sell and so the shop has some nice energy in it. They are not the target. A seller who spends a happy year selling nail kits has spent a year not learning the job.',
        ],
        itemsEs: [
          'LA JERINGA ES LA ESTRELLA: es lo que vendemos, en lo que nos centramos, y de lo que está hecho un buen día. Cada parada que haces ahí fuera apunta a eso.',
          'EL PEELING ESTÁ EN MEDIO: una venta de verdad y una buena venta, pero no es la que mide el turno.',
          'EL EXFOLIANTE, LA MANTECA CORPORAL Y EL KIT DE UÑAS SON PRODUCTOS DE PRINCIPIANTE: están para que aprendas a vender y para que la tienda tenga buen rollo. No son el objetivo. Un vendedor que se pasa un año la mar de contento vendiendo kits de uñas se ha pasado un año sin aprender el oficio.',
        ],
      },
      {
        type: 'tip',
        text: `The handover is not a consolation prize for finishing early. It is the most valuable thirty seconds in the shop, because it is the only moment the specialist ever gets with a customer who has already said yes to something once today. Hand her over well and he will want your customers. That is worth having.`,
        textEs: `El traspaso no es un premio de consolación por terminar pronto. Son los treinta segundos más valiosos de la tienda, porque es el único momento en que el especialista pilla a una clienta que ya le ha dicho que sí a algo hoy. Pásasela bien y va a querer a tus clientas. Eso vale mucho.`,
      },
      {
        type: 'quote',
        text: 'Selling the syringe is the win. What happens after it is somebody else\'s job — and the fastest way to lose both sales is to try to do his as well as yours.',
        textEs: 'Vender la jeringa es la victoria. Lo que pasa después es trabajo de otro — y la forma más rápida de perder las dos ventas es intentar hacer la suya además de la tuya.',
        attribution: 'Zero Lines Method',
        attributionEs: 'Método Zero Lines',
      },
    ],
    /* No inline quiz. LESSON_QUIZZES['prod-5'] OVERLAYS whatever sits here, so
       an inline quiz on this lesson is code the app can never render. The live
       three still ask about cross-selling — "when should you NOT upsell", "the
       Since-You're-Already technique" — which this lesson no longer teaches and
       the owner has ruled out. They need replacing in lessonQuizzes.ts. */
  },
  'prod-6': {
    id: 'prod-6',
    categoryId: 'products',
    title: 'Product Comparison Guide',
    titleEs: 'Guía de Comparación de Productos',
    subtitle: 'The syringe is the product — this is how you change the way in for each person',
    subtitleEs: 'La jeringa es el producto — esto es cómo cambias la forma de entrar con cada persona',
    duration: '10 min',
    icon: 'GitCompare',
    order: 6,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'One Product. A Lot of Different Ways In.',
      textEs: 'Un Producto. Muchas Formas Distintas de Entrar.',
    },
    {
            type: 'paragraph',
      text: 'A 25-year-old travelling on her own and a couple in their fifties on a luxury trip do not get the same words out of you. A French customer who wants to know what is in it does not get the same pitch as a British couple buying Christmas presents. But they all get the same product first. This lesson is not four doors — it is one door and a dozen ways to knock on it.',
      textEs: 'Una chica de 25 años que viaja sola y una pareja de cincuenta y tantos en un viaje de lujo no reciben las mismas palabras de tu boca. Un cliente francés que quiere saber qué lleva dentro no recibe el mismo discurso que una pareja británica comprando regalos de Navidad. Pero todos reciben el mismo producto primero. Esta lección no son cuatro puertas — es una puerta y doce formas de llamar a ella.',
    },
    {
            type: 'keypoint',
      text: 'The syringe is what we sell and what we focus on. The peeling is in between. The scrub, the body butter and the nail kit are beginner products — they are there so you learn how to sell and so the shop has some nice energy in it. So the question is almost never WHICH product. It is which sentence gets this particular person into the chair for the eyes.',
      textEs: 'La jeringa es lo que vendemos y en lo que nos centramos. El peeling está en medio. El exfoliante, la manteca corporal y el kit de uñas son productos de principiante — están para que aprendas a vender y para que la tienda tenga buen rollo. Así que la pregunta casi nunca es QUÉ producto. Es qué frase sienta a esta persona concreta en la silla para los ojos.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Which Door You Open On',
      textEs: 'Por Qué Puerta Entras',
    },
    {
            type: 'paragraph',
      text: 'Same product every time. What changes is the first sentence:',
      textEs: 'El mismo producto siempre. Lo que cambia es la primera frase:',
    },
    {
            type: 'numbered',
      items: [
        'VISIBLE EYE CONCERNS? (Bags, crow\'s feet, tired eyes.) Straight at it, warmly. One eye, two minutes, the mirror. The result does the arguing for you and you barely have to talk.',
        'NOTHING OBVIOUS TO FIX? Still the syringe — you just come in somewhere else. \'You look after yourself, I can see it. Let me show you the one thing nobody does.\' Nobody needs a problem to want a better face.',
        'YOUNG + GOOD SKIN? Do not sell her a wrinkle she has not got. The angle is the glow and the late night, not the years — and it is still the eyes she sits down for.',
        'LUXURY SIGNALS? (Good watch, good bag, already carrying shopping.) Premium all the way, no discount language in your opener. Somebody who came out to spend does not want to hear about a bargain in the first ten seconds.',
        'SKEPTICAL PARTNER STANDING THERE? You do not change the product, you change who you are talking to. Get him in early — a chair, a hand, a question — before he gets bored. Only if he is genuinely bad energy do you turn fully to her.',
        'BUYING GIFTS? Sell her the eyes first, for herself, while she is in the chair. Gifts are what you talk about after somebody has already said yes to something.',
        'STILL LEARNING, OR THE FLOOR HAS GONE FLAT? That is what the scrub and the nail kit are for. Quick, sensory, easy to say yes to, and the fastest way there is to learn what a yes feels like in your hands.'
      ],
      itemsEs: [
          '¿OJOS VISIBLEMENTE AFECTADOS? (Bolsas, patas de gallo, ojos cansados.) Directo, con buen rollo. Un ojo, dos minutos, el espejo. El resultado discute por ti y casi no tienes ni que hablar.',
          '¿NADA EVIDENTE QUE ARREGLAR? Igualmente la jeringa — solo entras por otro sitio. "Se nota que te cuidas. Déjame enseñarte lo único que no hace nadie." Nadie necesita un problema para querer una cara mejor.',
          '¿JOVEN + BUENA PIEL? No le vendas una arruga que no tiene. El ángulo es el brillo y la noche larga, no los años — y sigue sentándose por los ojos.',
          '¿SEÑALES DE LUJO? (Buen reloj, buen bolso, ya viene cargada de bolsas.) Todo premium, y en tu apertura ni una palabra de descuentos. Quien ha salido a gastar no quiere oír hablar de gangas en los primeros diez segundos.',
          '¿PAREJA ESCÉPTICA AHÍ PLANTADA? No cambias de producto, cambias con quién hablas. Métele pronto — una silla, una mano, una pregunta — antes de que se aburra. Solo si de verdad tiene mala energía te giras del todo hacia ella.',
          '¿COMPRANDO REGALOS? Véndele primero los ojos, para ella, mientras está en la silla. De regalos se habla cuando alguien ya ha dicho que sí a algo.',
          '¿TODAVÍA APRENDIENDO, O LA SALA ESTÁ MUERTA? Para eso están el exfoliante y el kit de uñas. Rápidos, sensoriales, fáciles de aceptar, y la forma más rápida que hay de aprender cómo se siente un sí en las manos.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Skin Type Matching',
      textEs: 'Emparejamiento por Tipo de Piel',
    },
    {
            type: 'paragraph',
      text: 'Different skin types respond to different products. Here\'s how to match:',
      textEs: 'Diferentes tipos de piel responden a diferentes productos. Así es como emparejarlos:',
    },
    {
            type: 'bullets',
      items: [
        'DRY SKIN: Peeling (removes dead layers, allows better cream absorption) + Scrub (Dead Sea minerals hydrate) + Body Butter (rich moisture). Avoid: nothing — all products work for dry skin.',
        'OILY SKIN: Peeling (weekly deep clean, reduces oil buildup) + Syringe (eye area typically not oily). Scrub is fine in moderation. Body Butter may feel heavy — suggest smaller amounts.',
        'SENSITIVE SKIN: Lead with the gentle approach and go slowly. Emphasize the \'natural, no chemicals\' angle. A tiny bit on the inside of the wrist first, and stop at the first sign of anything.',
        'MATURE SKIN (50+): Syringe (collagen stimulation, visible anti-aging) + Peeling (restores glow that diminishes with age) + rich Body Butter. Focus on results and investment in self-care.',
        'YOUNG SKIN (20s): Same syringe, different words — the eyes are the first place a late night shows on anybody, and she can see the difference in the mirror as fast as her mother can. Peeling is the glow story. The nail kit is a lovely easy yes while you are still finding your feet.'
      ],
      itemsEs: [
          'PIEL SECA: Peeling (elimina capas muertas, permite mejor absorción de la crema) + Exfoliante (los minerales del Mar Muerto hidratan) + Crema Corporal (humedad intensa). Evitar: nada — todos los productos funcionan para piel seca.',
          'PIEL GRASA: Peeling (limpieza profunda semanal, reduce acumulación de grasa) + Jeringa (el área de los ojos típicamente no es grasa). El exfoliante está bien con moderación. La crema corporal puede sentirse pesada — sugiere cantidades más pequeñas.',
          'PIEL SENSIBLE: Empieza con el enfoque suave y ve despacio. Enfatiza el ángulo de "natural, sin químicos". Primero un poquito en la parte de dentro de la muñeca, y a la mínima cosa, lo dejas.',
          'PIEL MADURA (50+): Jeringa (estimulación de colágeno, anti-edad visible) + Peeling (restaura el brillo que disminuye con la edad) + Crema Corporal rica. Enfócate en resultados e inversión en el cuidado personal.',
          'PIEL JOVEN (20s): La misma jeringa, otras palabras — los ojos son el primer sitio donde se le nota a cualquiera una noche larga, y ella ve la diferencia en el espejo igual de rápido que su madre. El peeling es la historia del brillo. El kit de uñas es un sí fácil y majo mientras te vas soltando.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Age-Appropriate Recommendations',
      textEs: 'Recomendaciones Apropiadas por Edad',
    },
    {
            type: 'comparison',
      left: { label: 'Younger Customers (20s-30s)', text: 'Same syringe, different words. Talk about the glow, the late night, the photograph — not the years, which she does not think she has yet. The eyes still get her into the chair, because the result is instant and she can see it herself. Avoid heavy anti-aging language.' },
      leftEs: { label: 'Clientes Jóvenes (20-30s)', text: 'La misma jeringa, otras palabras. Háblale del brillo, de la noche larga, de la foto — no de los años, que ella cree que todavía no tiene. Los ojos siguen siendo lo que la sienta, porque el resultado es instantáneo y lo ve ella misma. Evita el lenguaje duro de antiedad.' },
      right: { label: 'Mature Customers (40s+)', text: 'Straight at it. The visible difference in the mirror, one eye against the other, an investment in herself. She knows her own skin and notices every change, so the demo argues for you — say less and get out of its way.' },
      rightEs: { label: 'Clientes Maduras (40+)', text: 'Directo. La diferencia visible en el espejo, un ojo contra el otro, una inversión en ella misma. Conoce su piel y nota cada cambio, así que la demo discute por ti — habla menos y quítate de en medio.' }
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Tourist Origin → Which Angle',
      textEs: 'Origen del Turista → Qué Ángulo',
    },
    {
            type: 'paragraph',
      text: 'Same syringe, same chair, same ladder. What moves is what you put the weight on:',
      textEs: 'La misma jeringa, la misma silla, la misma escalera. Lo que cambia es dónde pones el peso:',
    },
    {
            type: 'bullets',
      items: [
        'SPANISH: the gap. What it costs back home against what it costs here — \'smart shopping in {locationName}\' — and a warm, chatty demo while you say it.',
        'FRENCH: substance. What is in it, where it comes from, why it does what it does. Let them ask you everything they want, right there at the table. Hype makes them suspicious.',
        'BRITISH: warmth and a laugh. Big sensory demo, a bit of cheek, and they will do half the selling for you in front of their own friends.',
        'EASTERN EUROPEAN: premium. Best-seller, luxury treatment, and no apologising for the number when you say it.',
        'ASIAN: the result. Get the mirror up early, one eye against the other, and let them look for as long as they want.',
        'GERMAN/DUTCH: practical value. How little you use, how long one syringe lasts, nothing wasted.'
      ],
      itemsEs: [
          'ESPAÑOLES: la diferencia. Lo que cuesta en casa contra lo que cuesta aquí — "compra inteligente en {locationName}" — y una demo cálida y de charla mientras se lo dices.',
          'FRANCESES: la sustancia. Qué lleva, de dónde viene, por qué hace lo que hace. Deja que te pregunten todo lo que quieran, ahí mismo en la mesa. El bombo les hace desconfiar.',
          'BRITÁNICOS: calidez y risas. Demo sensorial a lo grande, un poco de guasa, y te hacen media venta ellos mismos delante de sus amigos.',
          'EUROPEOS DEL ESTE: premium. Lo más vendido, tratamiento de lujo, y sin pedir perdón por el número cuando lo dices.',
          'ASIÁTICOS: el resultado. Saca el espejo pronto, un ojo contra el otro, y déjales mirar todo el rato que quieran.',
          'ALEMANES/NEERLANDESES: valor práctico. Lo poco que se usa, lo que dura una jeringa, que no se desperdicia nada.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Decision Tree Summary',
      textEs: 'Resumen del Árbol de Decisión',
    },
    {
            type: 'paragraph',
      text: 'Here\'s the ultra-quick version for the door:',
      textEs: 'Aquí está la versión ultra rápida para la puerta:',
    },
    {
            type: 'bullets',
      items: [
        'ANYBODY, ANY DAY → SYRINGE ({currency}300 asking). That is the default and it does not need a reason.',
        'EYES DOING THE SELLING FOR YOU → SYRINGE, straight at it. One eye, the mirror, done.',
        'YOUNG AND GLOWING → SYRINGE, glow angle. The peeling ({currency}150 asking) is the fallback, not the opener.',
        'SKEPTICAL MAN → SAME PRODUCT, DIFFERENT AUDIENCE. Bring him in before he gets bored.',
        'SYRINGE SOLD → HAND HER TO THE SPECIALIST. Not to another product of yours.',
        'STILL LEARNING, OR THE FLOOR HAS GONE FLAT → SCRUB OR NAIL KIT ({currency}60 for two, {currency}120 for three). Quick yeses, real practice.'
      ],
      itemsEs: [
          'CUALQUIERA, CUALQUIER DÍA → JERINGA ({currency}300 de salida). Ese es el defecto y no necesita motivo.',
          'LOS OJOS VENDEN SOLOS → JERINGA, directo. Un ojo, el espejo, listo.',
          'JOVEN Y CON BUENA PIEL → JERINGA, ángulo de brillo. El peeling ({currency}150 de salida) es el plan B, no la apertura.',
          'HOMBRE ESCÉPTICO → EL MISMO PRODUCTO, OTRO PÚBLICO. Métele antes de que se aburra.',
          'JERINGA VENDIDA → PÁSASELA AL ESPECIALISTA. No a otro producto tuyo.',
          'TODAVÍA APRENDIENDO, O LA SALA MUERTA → EXFOLIANTE O KIT DE UÑAS ({currency}60 dos, {currency}120 tres). Síes rápidos, práctica de verdad.',
        ],
    },
    {
            type: 'tip',
      text: 'None of this is rigid, and none of it is permission to skip the syringe. A 25-year-old with tired eyes is a syringe customer. A 60-year-old who loves her nails is a syringe customer who will also love the nail kit — after. Read the person, then pick your first sentence.',
      textEs: 'Nada de esto es rígido, y nada de esto es permiso para saltarte la jeringa. Una chica de 25 con los ojos cansados es clienta de jeringa. Una señora de 60 a la que le encantan sus uñas es clienta de jeringa a la que además le va a encantar el kit de uñas — después. Lee a la persona, y luego elige tu primera frase.',
    },
    {
            type: 'quote',
      text: 'Anyone can recite four products. The skill is looking at somebody for ten seconds and knowing which sentence gets them into the chair — because the product was never in doubt.',
      textEs: 'Recitar cuatro productos lo hace cualquiera. La gracia está en mirar a alguien diez segundos y saber qué frase lo sienta en la silla — porque el producto nunca estuvo en duda.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    /* No inline quiz. LESSON_QUIZZES['prod-6'] OVERLAYS whatever sits here, so
       this was unreachable code — and one of the three graded "Scrub" as the
       right lead for a skeptical man, which is now the opposite of the lesson.
       The live copy of that question is still in lessonQuizzes.ts. */
  },
  'prod-7': {
    id: 'prod-7',
    categoryId: 'products',
    title: 'Objection Handling Library',
    titleEs: 'Biblioteca de Manejo de Objeciones',
    subtitle: '20 common objections and exactly how to respond to each one',
    subtitleEs: 'Respuestas listas para cada excusa',
    duration: '10 min',
    icon: 'Shield',
    order: 7,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Every Objection Is an Opportunity Dressed as a Problem',
      textEs: 'Cada Objeción es una Oportunidad Disfrazada de Problema',
    },
    {
            type: 'paragraph',
      text: 'Objections aren\'t rejections — they\'re questions wearing disguise. When a customer says \'It\'s too expensive,\' what they often mean is \'I don\'t understand the value yet.\' When they say \'I need to ask my husband,\' they might mean \'I need validation for a decision I already want to make.\' Learning to translate objections and respond to the real concern underneath is a superpower.',
      textEs: 'Las objeciones no son rechazos — son preguntas disfrazadas. Cuando un cliente dice "Es muy caro," lo que suele querer decir es "Todavía no entiendo el valor." Cuando dicen "Necesito preguntarle a mi esposo," podrían querer decir "Necesito validación para una decisión que ya quiero tomar." Aprender a traducir objeciones y responder a la preocupación real que hay debajo es un superpoder.',
    },
    {
            type: 'keypoint',
      text: 'Four beats, every time: take it → turn it round → show them something → put the question back. You never argue and you never go stiff. You take the objection like you have heard it a hundred times, because you have.',
      textEs: 'Cuatro tiempos, siempre: encájalo → dale la vuelta → enséñales algo → devuélveles la pregunta. Ni discutes ni te pones tieso. Coges la objeción como quien la ha oído cien veces, porque la has oído.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Price Objections',
      textEs: 'Objeciones de Precio',
    },
    {
            type: 'bullets',
      items: [
        '\'IT\'S TOO EXPENSIVE\' → \'Listen, I know, I know. But look at where we are: {currency}140 for the whole year. Sixty treatments in that syringe — a bit over {currency}2 each, cheaper than your coffee, and it is still working in June. Which of the two suits you better?\' (Nobody says this at the top of the ladder, so say the number you are ACTUALLY on and shrink that one. Standing on {currency}175? Say {currency}175 — just under {currency}3 a treatment. The arithmetic only works if it matches the rung.)',
        '\'I CAN GET CHEAPER ONLINE\' → \'Course you can. Can you try it first though? See it on your own face, in two minutes, before you spend a penny? That is what you are paying for. Try getting that off a website.\' (Trying it is the bit the internet cannot do.)',
        '\'I WASN\'T PLANNING TO SPEND THIS MUCH TODAY\' → \'Nobody ever is — my last customer wasn\'t either! She tried it, saw her own eye in the mirror, and that was the end of it. This is not something you replace next month. Want to see what she saw?\' (Normalise it, then hand it straight back to curiosity.)',
        '\'I DON\'T HAVE CASH\' → \'Not a problem at all — cards, Apple Pay, Google Pay, whatever you have got on you.\' (Kill the payment barrier before it grows legs.)'
      ],
      itemsEs: [
          '"ES DEMASIADO CARO" → "Mira, ya lo sé, ya lo sé. Pero fíjate dónde estamos: {currency}140 por todo el año. Sesenta tratamientos en esa jeringa — poco más de {currency}2 cada uno, más barato que tu café, y en junio sigue funcionando. ¿Cuál de las dos te va mejor?" (Esto no lo dice nadie arriba de la escalera, así que di el número en el que ESTÁS de verdad y encoge ese. ¿Estás en {currency}175? Di {currency}175 — algo menos de {currency}3 por tratamiento. Las cuentas solo funcionan si cuadran con el escalón.)',
          '"LO ENCUENTRO MÁS BARATO EN INTERNET" → "Claro que sí. ¿Pero lo puedes probar antes? ¿Verlo en tu propia cara, en dos minutos, antes de soltar un euro? Eso es lo que estás pagando. A ver quién te da eso en una página web." (Probarlo es lo que internet no puede hacer.)',
          '"NO TENÍA PENSADO GASTARME TANTO HOY" → "Nadie lo tiene pensado — ¡mi última clienta tampoco! Lo probó, se vio el ojo en el espejo, y se acabó la historia. Esto no es algo que cambies el mes que viene. ¿Quieres ver lo que vio ella?" (Normalízalo y devuélvelo directo a la curiosidad.)',
          '"NO LLEVO EFECTIVO" → "No pasa nada — tarjeta, Apple Pay, Google Pay, lo que lleves encima." (Quita la barrera del pago antes de que crezca.)',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Product Skepticism Objections',
      textEs: 'Objeciones de Escepticismo sobre el Producto',
    },
    {
            type: 'bullets',
      items: [
        '\'I ALREADY HAVE CREAM AT HOME\' → \'Good — this is not a cream! Completely different thing. Your cream hydrates; this takes the dead layer off first so your cream actually gets in. They go together. This is the step your routine is missing.\' (Differentiate, do not compete.)',
        '\'I\'VE NEVER HEARD OF THIS BRAND\' → \'That is exactly why I am standing out here! We are small — you will not find us in a supermarket. Smaller name, better stuff in the tube. Don\'t take my word for it, give me your hand.\' (Small is the advantage, then get off the subject and onto the demo.)',
        '\'I DON\'T BELIEVE IT WORKS\' → \'Good. I love a sceptic, it means you are actually paying attention. Don\'t believe me — believe the mirror. Two minutes, one hand. If you don\'t see it, I will be the first to tell you to keep your money. Deal?\' (Agree with them, then put the proof in their hand.)',
        '\'IT\'S PROBABLY FULL OF CHEMICALS\' → \'Other way round — no parabens, nothing harsh, no needles anywhere near you. Here, the list is on the box, have a proper look at it.\' (Answer it flat and give them the box.)'
      ],
      itemsEs: [
          '"YA TENGO CREMA EN CASA" → "Mejor — ¡esto no es una crema! Es otra cosa. Tu crema hidrata; esto quita antes la capa muerta para que tu crema entre de verdad. Van juntas. Este es el paso que le falta a tu rutina." (Diferénciate, no compitas.)',
          '"NUNCA HE OÍDO ESTA MARCA" → "¡Por eso mismo estoy yo aquí fuera! Somos pequeños, no nos vas a encontrar en un supermercado. Nombre más pequeño, mejor producto dentro del tubo. No me creas a mí: dame la mano." (Lo pequeño es la ventaja, y de ahí directo a la demo.)',
          '"NO ME CREO QUE FUNCIONE" → "Bien. Me encantan los escépticos, quiere decir que estás atenta de verdad. No me creas a mí, cree al espejo. Dos minutos, una mano. Si no lo ves, seré la primera en decirte que te guardes el dinero. ¿Trato?" (Dales la razón y ponles la prueba en la mano.)',
          '"SEGURO QUE ESTÁ LLENO DE QUÍMICOS" → "Al revés — sin parabenos, nada agresivo, y ni una aguja cerca de ti. Toma, la lista está en la caja, míratela bien." (Contéstalo a pelo y dales la caja.)',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Decision Delay Objections',
      textEs: 'Objeciones de Demora en la Decisión',
    },
    {
            type: 'bullets',
      items: [
        '\'I NEED TO ASK MY HUSBAND/WIFE\' → \'Of course. But do YOU like it? Because if you like it, let us get him over here. Sir! Come and see what I have just done to one of your wife\'s eyes!\' (Get the partner into the conversation before anybody walks anywhere.)',
        '\'I\'LL THINK ABOUT IT AND COME BACK\' → \'What is there to think about? You told me you like it, you told me you would use it. You are not going to walk up the street and come back to a better price. It\'s not a mortgage at the end of the day.\' (Hand them back their own words and shrink the decision to its real size.)',
        '\'I NEED TO COMPARE PRICES\' → \'Compare it to what? There is nothing else like it on this street. And this price lives here — cross the border and you are back to {currency}500.\' (Let the location do the work for you.)',
        '\'I DON\'T HAVE TIME RIGHT NOW\' → \'I know, I know, you are in a rush. Sixty seconds. Not two minutes — sixty seconds, one hand. If you don\'t feel it straight away you walk off and I will not say another word.\' (Put a number on it and the barrier shrinks.)'
      ],
      itemsEs: [
          '"TENGO QUE PREGUNTARLE A MI MARIDO/MUJER" → "Claro. ¿Pero a TI te gusta? Porque si a ti te gusta, lo llamamos. ¡Señor! ¡Venga a ver lo que le acabo de hacer a su mujer en un ojo!" (Mete a la pareja en la conversación antes de que nadie se mueva de ahí.)',
          '"ME LO PIENSO Y VUELVO" → "¿Qué te tienes que pensar? Me has dicho que te gusta, me has dicho que lo usarías. No vas a dar una vuelta por la calle y volver con un precio mejor. Tampoco es una hipoteca." (Devuélveles sus propias palabras y reduce la decisión a su tamaño real.)',
          '"QUIERO COMPARAR PRECIOS" → "¿Compararlo con qué? En esta calle no hay nada parecido. Y este precio vive aquí: cruzas la frontera y vuelves a {currency}500." (Que trabaje el sitio por ti.)',
          '"AHORA NO TENGO TIEMPO" → "Ya lo sé, ya lo sé, vas con prisa. Sesenta segundos. Ni dos minutos: sesenta segundos y una mano. Si no lo notas al momento, te vas y no te digo ni una palabra más." (Ponle un número y la barrera se encoge.)',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Lifestyle & Practical Objections',
      textEs: 'Objeciones de Estilo de Vida y Practicidad',
    },
    {
            type: 'bullets',
      items: [
        '\'I DON\'T HAVE TIME FOR A SKINCARE ROUTINE\' → \'Perfect, neither do I. Once a week, five minutes, one bottle sees you through the year. That is the whole thing. Less faff than painting your nails.\' (Turn the objection into the argument.)',
        '\'I\'M TRAVELLING AND DON\'T WANT TO CARRY MORE\' → \'It is smaller than your sunglasses, look. And honestly, after a week of planes and air conditioning your skin wants it more than usual. Goes in the hand luggage and you forget it is there.\' (Make the travel the reason.)',
        '\'I\'M ALLERGIC TO EVERYTHING\' → \'Thanks for telling me — let us go slowly, then. A tiny bit on the inside of your wrist first, and we see how you get on. Anything at all and we stop there.\' (Slow right down. Do not sell through it.)',
        '\'I NEVER BUY FROM STREET SELLERS\' → \'Fair enough — but I am not selling you anything out here, am I? Come inside, sit down, let me do one hand. If you hate it you have lost two minutes.\' (Do not argue with it. Move the whole thing indoors.)'
      ],
      itemsEs: [
          '"NO TENGO TIEMPO PARA UNA RUTINA DE PIEL" → "Perfecto, yo tampoco. Una vez por semana, cinco minutos, un bote te dura el año. Eso es todo. Menos lío que pintarte las uñas." (Convierte la objeción en el argumento.)',
          '"ESTOY DE VIAJE Y NO QUIERO CARGAR MÁS" → "Es más pequeño que tus gafas de sol, mira. Y encima, después de una semana de aviones y aire acondicionado tu piel lo pide más que nunca. Va en el equipaje de mano y ni te enteras." (Que el viaje sea el motivo.)',
          '"SOY ALÉRGICA A TODO" → "Gracias por decírmelo, pues vamos despacio. Primero un poquito en la parte de dentro de la muñeca y vemos qué tal. A la mínima cosa, lo dejamos." (Baja el ritmo del todo. No vendas por encima de eso.)',
          '"YO NUNCA COMPRO A VENDEDORES DE CALLE" → "Me parece bien — pero aquí fuera no te estoy vendiendo nada, ¿no? Pasa, siéntate y te hago una mano. Si no te gusta, has perdido dos minutos." (No discutas con eso. Métete dentro con todo.)',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Emotional Objections',
      textEs: 'Objeciones Emocionales',
    },
    {
            type: 'bullets',
      items: [
        '\'I FEEL GUILTY SPENDING MONEY ON MYSELF\' → \'I hear that ten times a day, and always from the ones who do everything for everybody else. When was the last time you bought something that was only for you? Exactly. It\'s not a mortgage.\' (Permission, said light.)',
        '\'I BOUGHT SOMETHING LAST TIME AND NEVER USED IT\' → \'Then promise me two things: that you actually use it, and that if you love it you tell your friends. That is the whole deal.\' (Two small promises land better than one big reassurance.)',
        '\'I\'M NOT THE TYPE TO BUY LUXURY THINGS\' → \'Neither am I, and look at me. The ones who never treat themselves are the ones who enjoy it most when they do. This is not about being posh. It is about liking what you see in the mirror.\' (Take the posh out of it.)',
        '\'MY PRODUCT AT HOME WORKS FINE\' → \'Then keep using it! This does not replace it, it goes before it. A good cream on a face that has just been cleared is a completely different thing.\' (Complement, do not compete.)'
      ],
      itemsEs: [
          '"ME SIENTO CULPABLE GASTANDO EN MÍ" → "Eso lo oigo diez veces al día, y siempre de las que lo hacen todo por los demás. ¿Cuándo fue la última vez que te compraste algo solo para ti? Exacto. Tampoco es una hipoteca." (Permiso, dicho ligero.)',
          '"LA ÚLTIMA VEZ COMPRÉ ALGO Y NO LO USÉ" → "Pues prométeme dos cosas: que lo usas de verdad, y que si te encanta se lo cuentas a tus amigas. Ese es todo el trato." (Dos promesas pequeñas calan más que una gran garantía.)',
          '"NO SOY DE COMPRAR COSAS DE LUJO" → "Yo tampoco, y mírame. Las que nunca se dan un capricho son las que más lo disfrutan cuando lo hacen. Esto no va de ser pija. Va de que te guste lo que ves en el espejo." (Quítale lo pijo.)',
          '"LO QUE USO EN CASA ME VA BIEN" → "¡Pues sigue usándolo! Esto no lo sustituye, va antes. Una buena crema sobre una cara recién limpia es otra cosa completamente distinta." (Complementa, no compitas.)',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Meta-Framework for ALL Objections',
      textEs: 'El Meta-Marco para TODAS las Objeciones',
    },
    {
            type: 'paragraph',
      text: 'No matter what the objection is, follow this structure:',
      textEs: 'No importa cuál sea la objeción, sigue esta estructura:',
    },
    {
            type: 'numbered',
      items: [
        'TAKE IT: \'Listen, I know, I know...\' \'Ah, don\'t worry about that.\' \'Fair enough.\' You have heard it a hundred times. Let them see that on your face.',
        'TURN IT ROUND: Give them another way to look at it. Per week, not per bottle. A year, not a purchase. Two minutes, not a commitment.',
        'SHOW THEM SOMETHING: The mirror, their own hand, the box, the last customer. Anything at all beats more talking.',
        'PUT THE QUESTION BACK: \'Which one suits you better?\' \'Want to see what I mean?\' Never leave a silence they can fill with a no.'
      ],
      itemsEs: [
          'ENCÁJALO: "Mira, ya lo sé, ya lo sé..." "Ah, no te preocupes por eso." "Me parece bien." Lo has oído cien veces. Que se te note en la cara.',
          'DALE LA VUELTA: Dales otra forma de mirarlo. Por semana, no por bote. Un año, no una compra. Dos minutos, no un compromiso.',
          'ENSÉÑALES ALGO: El espejo, su propia mano, la caja, la clienta anterior. Cualquier cosa es mejor que seguir hablando.',
          'DEVUÉLVELES LA PREGUNTA: "¿Cuál te va mejor?" "¿Quieres ver a qué me refiero?" Nunca dejes un silencio que puedan rellenar con un no.',
        ],
    },
    {
            type: 'tip',
      text: 'The move is: do not flinch. Whatever they throw at you, you take it like you have heard it a hundred times — because you have. \'Listen, I know, I know...\' \'Ah, don\'t worry about that.\' \'It\'s not a mortgage at the end of the day.\' You are not agreeing with them and you are not arguing with them. You are waving it off warm and carrying straight on to the next thing.',
      textEs: 'La jugada es: no te achantes. Te tiren lo que te tiren, lo coges como quien lo ha oído cien veces — porque lo has oído. "Mira, ya lo sé, ya lo sé..." "Ah, no te preocupes por eso." "Tampoco es una hipoteca." Ni les das la razón ni discutes con ellos. Lo apartas con buen rollo y sigues directo a lo siguiente.',
    },
    {
            type: 'quote',
      text: 'An objection is not a wall. It\'s a door with a question mark on it. Knock correctly, and it opens to a sale.',
      textEs: 'Una objeción no es una pared. Es una puerta con un signo de interrogación. Toca correctamente, y se abre a una venta.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'What are the four beats of an objection?',
      options: [
        'Argue → Convince → Wear them down → Close the sale anyway',
        'Take it → Turn it round → Show them → Ask again',
        'Ignore → Discount → Give up → Walk away',
        'Agree → Agree → Agree → Accept no'
      ],
      correctIndex: 1,
      explanation: 'Take it like you have heard it a hundred times, give them another way to look at it, show them something instead of saying more, then put the question back so they cannot fill the silence with a no.',
    },
    {
      question: 'How should you respond to \'I already have cream at home\'?',
      options: [
        'Tell them their cream is inferior',
        'Differentiate your product as a complementary prep step that makes their cream work better',
        'Offer to throw in a free cream',
        'End the conversation'
      ],
      correctIndex: 1,
      explanation: 'Don\'t compete with their cream — complement it. Position your product as the prep step that makes the cream she already owns work properly. They\'re not replacing; they\'re enhancing.',
    },
    {
      question: 'They hit you with an objection. What is the first thing you do?',
      options: [
        'Explain in detail why the objection is mistaken',
        'Take it like you have heard it a hundred times',
        'Drop a rung on the price before they ask you to',
        'Repeat the objection back to them word for word'
      ],
      correctIndex: 1,
      explanation: 'Do not flinch. \'Listen, I know, I know...\' \'Ah, don\'t worry about that.\' You are not agreeing and you are not arguing — you are waving it off warm and carrying straight on.',
    }
    ],
  },
  'prod-8': {
    id: 'prod-8',
    categoryId: 'products',
    title: 'The Number, And Then Let It Go',
    titleEs: 'El Número, y Luego Suéltalo',
    subtitle: 'Take it if the moment offers it, send one message while she is standing there, then get back on the floor',
    subtitleEs: 'Cógelo si el momento lo pide, manda un mensaje mientras sigue ahí, y vuelve a la sala',
    duration: '4 min',
    icon: 'MessageSquare',
    order: 8,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'There Is No Follow-Up in This Job',
      textEs: 'En Este Trabajo No Hay Seguimiento',
    },
    {
            type: 'paragraph',
      text: 'Somewhere in your head there is a picture of a client book: names, notes, birthdays, a message on day three and another on day seven. Forget it. That is a job in a salon where people live down the road. Yours is a kiosk in a shopping centre and the woman in your chair flies home on Tuesday. You will almost certainly never see her again, and no message you send her next week will change that.',
      textEs: 'En algún sitio de tu cabeza hay una foto de un libro de clientes: nombres, notas, cumpleaños, un mensaje el día tres y otro el día siete. Olvídalo. Eso es un trabajo en un salón donde la gente vive en la misma calle. El tuyo es un kiosco en un centro comercial y la mujer de tu silla vuela a casa el martes. Con toda probabilidad no la vas a volver a ver, y ningún mensaje que le mandes la semana que viene va a cambiar eso.',
    },
    {
            type: 'keypoint',
      text: 'Which is exactly why the only follow-up that ever works happens while she is still standing in front of you. Everything you were going to do on day three, you do in the ninety seconds after she pays — or you do not do it at all.',
      textEs: 'Y justo por eso el único seguimiento que funciona ocurre mientras ella todavía está delante de ti. Todo lo que ibas a hacer el día tres, lo haces en los noventa segundos después de que pague — o no lo haces nunca.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Order of Those Ninety Seconds',
      textEs: 'El Orden de Esos Noventa Segundos',
    },
    {
            type: 'numbered',
      items: [
        'THE HANDOVER, IF IT WAS A SYRINGE. The specialist gets her while she is still sitting and still delighted, and nothing else on this page happens before that. Your job ended at the syringe — see The Handover for the words.',
        'THEN THE NUMBER, if the moment offers it. Never instead of the handover, and never while you are waiting for him.',
        'THEN THE TWO PROMISES, once, light, half a joke.',
        'THEN BACK OUT ON THE FLOOR. In that order, every time. Take the number first and you have used up her ninety seconds on the least valuable thing in them.'
      ],
      itemsEs: [
          'EL TRASPASO, SI HA SIDO UNA JERINGA. El especialista la pilla mientras sigue sentada y sigue encantada, y nada de esta página pasa antes de eso. Tu trabajo se acabó en la jeringa — las palabras están en El Traspaso.',
          'LUEGO EL NÚMERO, si el momento lo pide. Nunca en lugar del traspaso, y nunca mientras estás esperando a que venga él.',
          'LUEGO LAS DOS PROMESAS, una vez, ligeras, medio en broma.',
          'Y LUEGO OTRA VEZ FUERA. En ese orden, siempre. Si coges el número primero, te has gastado sus noventa segundos en lo que menos vale de todo.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Take the Number Only If the Moment Offers It',
      textEs: 'Coge el Número Solo Si el Momento lo Pide',
    },
    {
            type: 'paragraph',
      text: 'She is paid, delighted, holding the bag, laughing at something you said. THAT is when you ask, and only then. If the moment is flat, skip it — a number squeezed out of somebody who is already halfway to the door is a number that never gets used, and asking for it turns a lovely ending into a bit of admin.',
      textEs: 'Ha pagado, está encantada, tiene la bolsa en la mano y se está riendo de algo que has dicho. ESE es el momento de pedirlo, y solo ese. Si el momento está plano, sáltatelo — un número sacado a alguien que ya está a medio camino de la puerta es un número que no se usa nunca, y pedirlo convierte un final bonito en papeleo.',
    },
    {
            type: 'script',
      text: '\'You use WhatsApp, right? Give me your number — I\'ll send you mine right now, so if you ever have a question about how to use it you\'ve got a human instead of a website.\'',
      textEs: '"¿Usas WhatsApp, no? Dame tu número — te mando el mío ahora mismo, así si algún día tienes una duda de cómo usarlo tienes a una persona y no a una página web."',
    },
    {
            type: 'keypoint',
      text: 'Then send it THERE, in front of her, before she stands up. One message, two lines, done: who you are and where you are. If you wait until later you will not do it, and if she has typed a digit wrong nobody will ever find out.',
      textEs: 'Y mándalo AHÍ, delante de ella, antes de que se levante. Un mensaje, dos líneas, y ya: quién eres y dónde estás. Si lo dejas para luego no lo vas a hacer, y si se ha equivocado en un número no se va a enterar nadie.',
    },
    {
            type: 'script',
      text: '\'Hi [Name] — it\'s [Your Name] from the shop in {locationName}. Save that. Any questions at all, message me. Enjoy it!\'',
      textEs: '"Hola [Nombre] — soy [Tu Nombre], de la tienda de {locationName}. Guárdalo. Cualquier duda, me escribes. ¡Disfrútalo!"',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Two Promises — Your Whole Referral Strategy',
      textEs: 'Las Dos Promesas — Toda tu Estrategia de Recomendación',
    },
    {
            type: 'paragraph',
      text: 'You do not chase referrals for weeks. You ask once, at the top of her mood, while the bag is still in her hand — and then you never mention it again. Two things, said light, half a joke:',
      textEs: 'No persigues recomendaciones durante semanas. Lo pides una vez, en lo más alto de su alegría, con la bolsa todavía en la mano — y luego no lo vuelves a mencionar. Dos cosas, dichas ligeras, medio en broma:',
    },
    {
            type: 'script',
      text: '\'Promise me two things. One: you actually use it — once a week, not once a year. Two: if you love it, you tell your friends where you got it.\'',
      textEs: '"Prométeme dos cosas. Una: que lo usas de verdad — una vez a la semana, no una vez al año. Dos: que si te encanta, le cuentas a tus amigas dónde lo has comprado."',
    },
    {
            type: 'tip',
      text: 'That is the entire ask, and the reason it works is the timing, not the wording. Somebody who is delighted and holding a bag will say yes to it and mean it. The same sentence, sent as a message eleven days later, is just a stranger asking a favour.',
      textEs: 'Eso es toda la petición, y lo que la hace funcionar es el momento, no las palabras. Alguien encantado y con la bolsa en la mano te va a decir que sí y lo va a decir en serio. Esa misma frase, mandada por mensaje once días después, es un desconocido pidiendo un favor.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'If She Messages You, Be a Person',
      textEs: 'Si Te Escribe, Sé una Persona',
    },
    {
            type: 'paragraph',
      text: 'Some of them do write. Not many, but some — a question about how often, a photo of their eyes, a friend arriving next week. Answer them properly and quickly, like a human being, and lead with the help rather than the sell. That is the whole policy. What you do not do is turn it into a campaign: no schedule, no templates, no chasing people who did not reply. One unanswered message is her telling you she is done, and the correct response is to leave her alone.',
      textEs: 'Alguna sí escribe. No muchas, pero alguna — una duda de cada cuánto, una foto de los ojos, una amiga que llega la semana que viene. Contéstales bien y rápido, como una persona, y empieza por ayudar y no por vender. Esa es toda la política. Lo que no haces es convertirlo en una campaña: sin calendario, sin plantillas, sin perseguir a quien no ha contestado. Un mensaje sin respuesta es ella diciéndote que ya está, y lo correcto es dejarla en paz.',
    },
    {
            type: 'keypoint',
      text: 'And never promise anything the shop has to honour on a day you might not be working — no held stock, no kept price, no gift waiting at the counter. You will be somewhere else and a colleague will be having that argument for you.',
      textEs: 'Y no prometas nunca nada que la tienda tenga que cumplir un día en el que a lo mejor tú no trabajas — ni producto guardado, ni un precio reservado, ni un regalo esperando en el mostrador. Tú estarás en otro sitio y un compañero tendrá esa discusión por ti.',
    },
    {
            type: 'quote',
      text: 'The number is a nice thing to have. It is not the sale, it was never the sale, and it never goes before the handover — thirty seconds spent tidying your contacts is thirty seconds you were not on the floor stopping somebody.',
      textEs: 'El número está bien tenerlo. No es la venta, nunca fue la venta, y nunca va antes del traspaso — treinta segundos ordenando contactos son treinta segundos que no has pasado en la calle parando a alguien.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    /* No inline quiz. LESSON_QUIZZES['prod-8'] OVERLAYS whatever sits here, so
       this was unreachable code — and all three still described the client book
       this lesson was rewritten to kill (an "ongoing relationship", a message
       cadence, a referral asked for weeks later). The live three are already
       correct in lessonQuizzes.ts. */
  },
  'psych-1': {
    id: 'psych-1',
    categoryId: 'psychology',
    title: 'The \'Luxury Aggressor\' Identity',
    titleEs: 'La Identidad del \'Agresor de Lujo\'',
    subtitle: 'How to think of yourself as a premium brand ambassador, not a pushy seller',
    subtitleEs: 'No eres un vendedor insistente. Eres un curador de transformación.',
    duration: '8 min',
    icon: 'Crown',
    order: 1,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'You Are Not a Pushy Seller. You Are a Curator of Transformation.',
      textEs: 'No eres un vendedor insistente. Eres un curador de transformacion.',
    },
    {
            type: 'paragraph',
      text: 'The word \'aggressive\' scares people. In this job it does not mean pushing. It means going at it with certainty. You are not begging anybody for anything — you run this bit of pavement, and you are offering something that most people walk straight past. Warm, quick, enjoying yourself. Not apologising and not chasing.',
      textEs: 'La palabra \'agresivo\' asusta a la gente. En este trabajo no significa presionar. Significa ir con seguridad. No le estás rogando nada a nadie — este trozo de acera lo llevas tú, y estás ofreciendo algo por delante de lo que casi todo el mundo pasa de largo. Cálido, rápido, disfrutando. Sin pedir perdón y sin perseguir a nadie.',
    },
    {
            type: 'keypoint',
      text: 'The mindset shift: You\'re not interrupting someone\'s day — you\'re enhancing it. The products you sell deliver visible, immediate results. You\'re doing them a favor by stopping them.',
      textEs: 'El cambio de mentalidad: No estas interrumpiendo el día de alguien — lo estas mejorando. Los productos que vendes ofrecen resultados visibles e inmediatos. Les estas haciendo un favor al detenerlos.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Three Pillars of the Luxury Aggressor',
      textEs: 'Los Tres Pilares del Agresivo de Lujo',
    },
    {
            type: 'numbered',
      items: [
        'CERTAINTY: You know the product works. You\'ve seen the reactions. That belief radiates from you before you open your mouth.',
        'PRESENCE: You stand tall. You make eye contact. Your voice is clear and warm. You occupy space like you belong there — because you do.',
        'APPETITE: You go at everybody. Not out of desperation — out of appetite. You are not stood there deciding who deserves you, you are working, and there is another one thirty seconds behind this one. Knowing who to skip is something the years give you. Nobody hands it to you in week one, and the sellers who try to shortcut it spend the shift with their hands in their pockets.'
      ],
      itemsEs: [
          'CERTEZA: Sabes que el producto funciona. Has visto las reacciones. Esa creencia irradia de ti antes de que abras la boca.',
          'PRESENCIA: Te paras derecho. Haces contacto visual. Tu voz es clara y calida. Ocupas el espacio como si pertenecieras ahi — porque asi es.',
          'HAMBRE: Vas a por todo el mundo. No por desesperación — por hambre. No estás ahí decidiendo quién te merece, estás trabajando, y treinta segundos detrás de este viene otro. Saber a quién saltarte te lo dan los años. Nadie te lo da la primera semana, y los que intentan atajarlo se pasan el turno con las manos en los bolsillos.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Mirror Drill',
      textEs: 'El Ejercicio del Espejo',
    },
    {
            type: 'paragraph',
      text: 'Before your next shift, stand in front of the mirror and say your opener out loud twenty times. Not an affirmation — the actual line you are going to use on a stranger in an hour:',
      textEs: 'Antes de tu siguiente turno, ponte delante del espejo y di tu apertura en voz alta veinte veces. No es un mantra — es la frase de verdad que le vas a soltar a un desconocido dentro de una hora:',
    },
    {
            type: 'script',
      text: '\'Listen, I know you\'re in a rush — but can I ask you something really quick? It\'s just that you look so good, I have to ask what you normally use on your skin.\'',
      textEs: '\'Mira, sé que vas con prisa — ¿pero te puedo preguntar una cosa rapidísima? Es que te veo tan bien que tengo que preguntarte qué usas normalmente para la piel.\'',
    },
    {
            type: 'tip',
      text: 'Twenty times. Somewhere around the twelfth it stops sounding like a line and starts sounding like you, and that is the entire point of the drill. A stranger can hear the difference from three metres away.',
      textEs: 'Veinte veces. Por la número doce deja de sonar a frase hecha y empieza a sonar a ti, y ese es todo el objetivo del ejercicio. Un desconocido nota la diferencia desde tres metros.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Practical Techniques',
      textEs: 'Técnicas Practicas',
    },
    {
            type: 'bullets',
      items: [
        'Dress the part: You are the first thing they judge. Clean shoes, hair done, shirt right. Look like somebody worth stopping for and they stop.',
        'Language matters: Say \'I\'d love to show you something\' not \'Can I show you something?\' The first is an invitation. The second is a question they can reject.',
        'Posture check: Shoulders back, chin up, smile in your eyes. Practice power poses in the stockroom before your shift.',
        'The pause: After you deliver your opener, pause. Let silence work. The Luxury Aggressor doesn\'t rush — they command attention, then let it land.'
      ],
      itemsEs: [
          'Viste el papel: Lo primero que juzgan eres tú. Zapatos limpios, el pelo arreglado, la camisa en su sitio. Parece alguien por quien merece la pena pararse y se paran.',
          'El lenguaje importa: Di \'Me encantaria mostrarte algo\' no \'Puedo mostrarte algo?\' La primera es una invitacion. La segunda es una pregunta que pueden rechazar.',
          'Revisa tu postura: Hombros hacia atras, barbilla arriba, sonrisa en tus ojos. Practica poses de poder en el almacen antes de tu turno.',
          'La pausa: Después de lanzar tu apertura, pausa. Deja que el silencio haga su trabajo. El Agresivo de Lujo no se apresura — comanda la atención, y luego deja que caiga.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When Rejection Hits',
      textEs: 'Cuando el Rechazo Golpea',
    },
    {
            type: 'paragraph',
      text: 'Even the Luxury Aggressor gets ignored. The difference? They don\'t flinch. A rejected invitation isn\'t a reflection on you — it\'s a reflection on their timing, mood, or preoccupations. Maintain your posture. Smile at the next person. Your energy doesn\'t dip because one person said no.',
      textEs: 'Incluso el Agresivo de Lujo es ignorado. La diferencia? No se inmutan. Una invitacion rechazada no es un reflejo de ti — es un reflejo de su tiempo, su estado de animo o sus preocupaciones. Manten tu postura. Sonrie a la siguiente persona. Tu energía no decae porque una persona dijo no.',
    },
    {
            type: 'quote',
      text: 'The difference between a pushy seller and a luxury ambassador is belief. The pushy seller hopes someone will buy. The ambassador knows they will.',
      textEs: 'La diferencia entre un vendedor insistente y un embajador de lujo es la creencia. El vendedor insistente espera que alguien compre. El embajador sabe que lo haran.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    },
    {
            type: 'tip',
      text: 'Watch the best seller on this street for one shift. Not the words — how they stand while they wait, how fast they let somebody go, what they do with their hands. Take the two things that would feel natural coming out of you and leave the rest.',
      textEs: 'Observa un turno entero al que mejor vende de esta calle. No las palabras — cómo se planta mientras espera, lo rápido que deja marchar a alguien, qué hace con las manos. Cógete las dos cosas que te saldrían naturales a ti y deja el resto.',
    }
    ],
    /* No inline quiz. LESSON_QUIZZES['psych-1'] OVERLAYS whatever sits here, so
       this was unreachable code — and the first of the three still named
       Selectivity as the third pillar, which the owner has replaced with
       stopping everybody. The live copy is in lessonQuizzes.ts. */
  },
  'psych-2': {
    id: 'psych-2',
    categoryId: 'psychology',
    title: 'Energy is Your #1 Weapon',
    titleEs: 'La Energía es tu Arma #1',
    subtitle: 'Managing energy throughout a shift — rituals, micro-breaks, and the art of faking it till you make it',
    subtitleEs: 'Tu energía vende antes que tus palabras',
    duration: '8 min',
    icon: 'Zap',
    order: 2,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Energy Sells Before Words Do',
      textEs: 'Tu Energía Vende Antes que tus Palabras',
    },
    {
            type: 'paragraph',
      text: 'Customers feel your energy before you have said a word. Before they hear your voice, before they see your smile, they sense your vibration. Tired, heavy energy repels. Light, excited energy attracts. This isn\'t mystical — it\'s neuroscience. Humans have mirror neurons that cause us to emotionally sync with people around us. Your mood literally becomes their mood.',
      textEs: 'Los clientes te notan la energía antes de que digas nada. Antes de escuchar tu voz, antes de ver tu sonrisa, sienten tu vibracion. La energía cansada y pesada repele. La energía ligera y entusiasmada atrae. No es mistico — es neurociencia. Los seres humanos tenemos neuronas espejo que nos hacen sincronizarnos emocionalmente con las personas a nuestro alrededor. Tu estado de animo literalmente se convierte en el de ellos.',
    },
    {
            type: 'keypoint',
      text: 'Energy is more important than script, product knowledge, or pricing. A salesperson with great energy and average skills will outsell a tired expert every single time.',
      textEs: 'La energía es mas importante que el guion, el conocimiento del producto o los precios. Un vendedor con gran energía y habilidades promedio vendera mas que un experto cansado, cada vez.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Energy Lifecycle of a Shift',
      textEs: 'El Ciclo de Energía de un Turno',
    },
    {
            type: 'paragraph',
      text: 'Most salespeople\'s energy follows a predictable curve: high at opening, dipping after the first hour, crashing mid-day, then a small recovery before closing. Top performers break this curve deliberately. Here\'s how:',
      textEs: 'La energía de la mayoria de los vendedores sigue una curva predecible: alta al inicio, bajando después de la primera hora, cayendo a mitad del día, y luego una pequena recuperacion antes de cerrar. Los mejores rompen esta curva deliberadamente. Asi es como:',
    },
    {
            type: 'numbered',
      items: [
        'PRE-SHIFT (30 min before): Fuel your body. Eat a light, protein-rich meal — not heavy carbs that make you sluggish. Hydrate. Listen to music that pumps you up. Do 2 minutes of jumping jacks or shadow boxing to wake up your nervous system.',
        'OPENING HOUR (peak alertness): Use this wisely. Your first stops set the tone for the whole day. Smile at EVERY person who passes, even if you don\'t stop them. This builds momentum.',
        'MID-MORNING (first dip): This is when the 4-minute rotation saves you. Use your inside time to recharge — not by scrolling your phone, but by taking 5 deep breaths, drinking water, and celebrating any small win so far.',
        'LUNCH PERIOD: Eat light. A heavy meal will kill your afternoon. Salads, protein, fruit. Avoid the pasta and bread trap.',
        'AFTERNOON SAG (the danger zone 2-4pm): This is where sales are won or lost. Stand up straighter. Move faster. Speak louder. Consciously elevate every physical action — your brain follows your body.',
        'POWER HOUR (last 90 minutes): End strong. The final push of the day often has the best customers — they\'re done shopping and ready to be sold to. Bring everything you have left.'
      ],
      itemsEs: [
          'PRE-TURNO (30 min antes): Abastece tu cuerpo. Come una comida ligera rica en proteinas — no carbohidratos pesados que te hagan sentir lento. Hidratate. Escucha musica que te motive. Haz 2 minutos de jumping jacks o shadow boxing para despertar tu sistema nervioso.',
          'HORA DE APERTURA (alerta maxima): Usala sabiamente. Tus primeras detenciones marcan el tono para todo el día. Sonrie a CADA persona que pase, incluso si no las detienes. Esto genera momentum.',
          'MEDIA MANANA (primer bajon): Aquí es cuando la rotacion de 4 minutos te salva. Usa tu tiempo adentro para recargarte — no mirando el móvil, sino tomando 5 respiraciones profundas, bebiendo agua y celebrando cualquier pequena victoria hasta ahora.',
          'PERIODO DE COMIDA: Come ligero. Una comida pesada matara tu tarde. Ensaladas, proteina, fruta. Evita la trampa de la pasta y el pan.',
          'BAJON DE LA TARDE (la zona de peligro 2-4pm): Aquí es donde las ventas se ganan o se pierden. Parate mas derecho. Muevete mas rápido. Habla mas fuerte. Eleva conscientemente cada acción física — tu cerebro sigue a tu cuerpo.',
          'HORA DE PODER (ultimos 90 minutos): Termina fuerte. El empuje final del día a menudo tiene a los mejores clientes — ya terminaron de comprar y están listos para ser vendidos. Pon todo lo que te queda.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The 4-Minute Rotation Advantage',
      textEs: 'La Ventaja de la Rotacion de 4 Minutos',
    },
    {
            type: 'paragraph',
      text: 'The 4-minute door rotation isn\'t just fair — it\'s energy management genius. Knowing you only have 4 minutes outside before switching keeps your intensity high. It\'s like interval training for sales. You sprint, recover, sprint again. This prevents the burnout that kills most street sellers by hour 3.',
      textEs: 'La rotacion de puerta de 4 minutos no es solo justa — es una genialidad de manejo de energía. Saber que solo tienes 4 minutos afuera antes de cambiar mantiene tu intensidad alta. Es como entrenamiento por intervalos para ventas. Corres, recuperas, corres de nuevo. Esto previene el agotamiento que mata a la mayoria de los vendedores de calle a la hora 3.',
    },
    {
            type: 'tip',
      text: 'During your 4 minutes outside, give 100% energy to every person you stop. During your inside time, consciously lower your shoulders, unclench your jaw, and breathe. This oscillation keeps you fresh all day.',
      textEs: 'Durante tus 4 minutos afuera, da el 100% de tu energía a cada persona que detengas. Durante tu tiempo adentro, baja conscientemente tus hombros, relaja la mandibula y respira. Esta oscilacion te mantiene fresco todo el día.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Fake It Till You Make It\' Technique',
      textEs: 'La Técnica \'Finge Hasta Que Lo Logres\'',
    },
    {
            type: 'paragraph',
      text: 'Some days you just don\'t have it. You didn\'t sleep well. You\'re fighting with your partner. You\'re hungover. Here\'s the truth: your body can trick your brain. Act energetic and the energy turns up afterwards — every seller on this floor has done it on a Monday and felt it work. Stand tall → feel more confident. Smile → feel happier. Speak loudly → feel more alert.',
      textEs: 'Hay días en los que simplemente no lo tienes. No has dormido bien. Estás discutiendo con tu pareja. Vas con resaca. La verdad es esta: tu cuerpo puede engañar a tu cerebro. Actúa con energía y la energía llega después — todo el mundo en este suelo lo ha hecho un lunes y ha notado que funciona. Ponte recto → te sientes más seguro. Sonríe → te sientes más contento. Habla alto → te sientes más despierto.'
    },
    {
            type: 'script',
      text: '\'Even on my worst days, I play a character. I am High-Energy Salesperson. I smile bigger. I move faster. I speak with more enthusiasm. And within 30 minutes, I\'m not playing anymore — I actually feel it.\'',
      textEs: '\'Incluso en mis peores días, interpreto un personaje. Soy el Vendedor de Alta Energía. Sonrio mas grande. Me muevo mas rápido. Hablo con mas entusiasmo. Y dentro de 30 minutos, ya no estoy actuando — realmente lo siento.\'',
    },
    {
            type: 'bullets',
      items: [
        'POWER POSE: Two minutes before your shift, hands on hips, chest open, chin up. Feels ridiculous, works anyway — you walk out onto the pavement already standing like somebody worth stopping for.',
        'THE SMILE LOOP: Force a wide smile for 10 seconds. Your brain releases dopamine and serotonin. Repeat every hour.',
        'MUSIC TRIGGERS: Create a 3-song playlist that always hypes you up. Listen during breaks.',
        'VOICE PROJECTION: Speak 20% louder than normal. Projecting energy through your voice makes you feel more energetic.'
      ],
      itemsEs: [
          'POSE DE PODER: Dos minutos antes del turno, manos en las caderas, pecho abierto, barbilla arriba. Es ridículo y funciona igual — sales a la acera ya plantado como alguien por quien merece la pena pararse.',
          'EL CICLO DE SONRISA: Fuerza una sonrisa amplia por 10 segundos. Tu cerebro libera dopamina y serotonina. Repite cada hora.',
          'DETONANTES MUSICALES: Crea una lista de 3 canciones que siempre te motiven. Escuchalas durante los descansos.',
          'PROYECCION DE VOZ: Habla 20% mas fuerte de lo normal. Proyectar energía a traves de tu voz te hace sentir mas energetico.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Hydration, Nutrition & Physical Maintenance',
      textEs: 'Hidratacion, Nutricion y Mantenimiento Físico',
    },
    {
            type: 'paragraph',
      text: 'Coffee is not hydration. Energy drinks create crashes. Sugar spikes then drops. The best fuel for a sales shift is:',
      textEs: 'El cafe no es hidratacion. Las bebidas energeticas crean bajones. El azucar sube y luego cae. El mejor combustible para un turno de ventas es:',
    },
    {
            type: 'bullets',
      items: [
        'Water, not coffee. Your voice goes rough by two o\'clock otherwise, and your voice is what you sell with.',
        'Something to pick at between customers — nuts, a bit of fruit. Small and often beats one big go.',
        'Eat light at lunch. A proper plate of pasta at midday and you have sold your afternoon to somebody else.'
      ],
      itemsEs: [
          'Agua, no café. Si no, a las dos de la tarde tienes la voz rota, y la voz es con lo que vendes.',
          'Algo para picar entre clientes — frutos secos, un poco de fruta. Poco y a menudo gana a un atracón.',
          'Come ligero a mediodía. Un buen plato de pasta a la hora de comer y le has vendido la tarde a otro.',
        ],
    },
    {
            type: 'tip',
      text: 'Bring a water bottle to the floor. Sip between customers. Being well-hydrated improves your voice quality, skin appearance, and mental sharpness — all things customers notice subconsciously.',
      textEs: 'Lleva un botella de agua al piso de ventas. Sorbe entre clientes. Estar bien hidratado mejora la calidad de tu voz, la apariencia de tu piel y tu agudeza mental — todo cosas que los clientes notan subconscientemente.',
    },
    {
            type: 'quote',
      text: 'Your energy introduces you before you even speak. Make sure it\'s saying the right thing.',
      textEs: 'Tu energía te presenta antes de que siquiera hables. Asegurate de que este diciendo lo correcto.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'Why is the 4-minute rotation system effective for energy management?',
      options: [
        'It gives you more breaks',
        'It works like interval training — high intensity followed by recovery',
        'It lets you check your phone',
        'It reduces the number of customers you need to stop'
      ],
      correctIndex: 1,
      explanation: 'The 4-minute rotation creates an interval-training effect. You give 100% energy for 4 minutes, then recover inside. This oscillation prevents the burnout that kills performance.',
    },
    {
      question: 'What should you eat during your lunch break to maintain afternoon energy?',
      options: [
        'Pasta and bread for carbs',
        'A heavy meal to feel satisfied',
        'Light protein, salads, and fruit',
        'Skip lunch to stay sharp'
      ],
      correctIndex: 2,
      explanation: 'Heavy meals redirect blood from your brain to your stomach, causing afternoon fog. Light protein, salads, and fruit provide sustained energy without the crash.',
    },
    {
      question: 'How does \'faking\' energy actually work according to psychological research?',
      options: [
        'It doesn\'t work — customers can tell',
        'Your body can trick your brain into actually feeling more energetic',
        'It only works for experienced sellers',
        'It\'s about lying to yourself'
      ],
      correctIndex: 1,
      explanation: 'Research on embodied cognition shows that acting energetic (power poses, smiling, speaking loudly) actually changes your brain chemistry and creates real energy.',
    }
    ],
  },
  'psych-3': {
    id: 'psych-3',
    categoryId: 'psychology',
    title: 'Confidence When You Don\'t Feel It',
    titleEs: 'Confianza Cuando No La Sientes',
    subtitle: 'Body language hacks, the \'act as if\' technique, and why customers can smell insecurity',
    subtitleEs: 'Trucos de lenguaje corporal, la técnica de \'actúa como si\', y por qué el cliente huele la inseguridad',
    duration: '10 min',
    icon: 'Shield',
    order: 3,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Confidence Is a Skill, Not a Trait',
      textEs: 'La Confianza es una Habilidad, no un Rasgo',
    },
    {
            type: 'paragraph',
      text: 'The most dangerous myth in sales is that confident people are \'born that way.\' Nonsense. Confidence is a set of behaviors practiced until they become automatic. Every \'naturally confident\' salesperson you admire has bombed hundreds of times. The difference is they kept going until confidence became their default setting.',
      textEs: 'El mito mas peligroso en ventas es que la gente confiada \'nacio asi.\' Tonterias. La confianza es un conjunto de comportamientos practicados hasta que se vuelven automaticos. Cada vendedor \'naturalmente confiado\' que admiras ha fracasado cientos de veces. La diferencia es que siguieron adelante hasta que la confianza se convirtio en su configuracion por defecto.',
    },
    {
            type: 'keypoint',
      text: 'Customers don\'t buy from people who seem unsure. If you hesitate, if your voice shakes, if you avoid eye contact — the customer feels that something is wrong, even if they can\'t name it. Confidence is the container that makes everything else you do work.',
      textEs: 'Los clientes no compran a gente que parece insegura. Si dudas, si tu voz tiembla, si evitas el contacto visual — el cliente siente que algo esta mal, incluso si no puede nombrarlo. La confianza es el contenedor que hace que todo lo demas que haces funcione.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Body Language Hacks',
      textEs: 'Hacks de Lenguaje Corporal',
    },
    {
            type: 'paragraph',
      text: 'Your body speaks louder than your words. Before you even open your mouth, customers have judged your credibility from your posture, movement, and facial expression. Here are the specific adjustments that create instant confidence perception:',
      textEs: 'Tu cuerpo habla mas fuerte que tus palabras. Antes de que siquiera abras la boca, los clientes han juzgado tu credibilidad por tu postura, movimiento y expresion facial. Aquí están los ajustes especificos que crean percepcion de confianza instantanea:',
    },
    {
            type: 'bullets',
      items: [
        'SHOULDER POSITION: Roll your shoulders back and down. This opens your chest, improves breathing, and signals dominance without aggression. Practice this every time you walk through the door.',
        'EYE CONTACT: Maintain eye contact for 2-3 seconds at a time. Breaking eye contact too quickly signals nervousness. Holding too long feels aggressive. The sweet spot is brief, confident connection.',
        'SMILE WITH YOUR EYES: A genuine smile crinkles the corners of your eyes (Duchenne smile). A fake mouth-only smile triggers customer\'s distrust. Think of something that genuinely makes you happy before you approach.',
        'OPEN PALMS: Keep your hands visible with palms slightly open. This is an ancient biological signal of \'I have no weapons.\' It triggers subconscious trust.',
        'SLOW MOVEMENTS: Nervous people move quickly and jerkily. Confident people move deliberately. Slow your gestures by 20%. Pause between movements.',
        'STABLE POSTURE: Avoid shifting your weight from foot to foot. Plant your feet shoulder-width apart. This \'grounded\' posture signals stability and certainty.'
      ],
      itemsEs: [
          'POSICION DE HOMBROS: Lleva tus hombros hacia atras y abajo. Esto abre tu pecho, mejora la respiracion y senala dominancia sin agresion. Practica esto cada vez que caminas por la puerta.',
          'CONTACTO VISUAL: Manten el contacto visual por 2-3 segundos a la vez. Romper el contacto visual demasiado rápido senala nerviosismo. Mantenerlo demasiado tiempo se siente agresivo. El punto ideal es una conexion breve y confiada.',
          'SONRIE CON TUS OJOS: Una sonrisa genuina arruga las esquinas de tus ojos (sonrisa de Duchenne). Una sonrisa falsa de solo boca desencadena desconfianza en el cliente. Piensa en algo que genuinamente te hace feliz antes de acercarte.',
          'PALMAS ABIERTAS: Manten tus manos visibles con las palmas ligeramente abiertas. Esta es una senal biologica antigua de \'no tengo armas.\' Desencadena confianza subconsciente.',
          'MOVIMIENTOS LENTOS: La gente nerviosa se mueve rápido y a tirones. La gente confiada se mueve deliberadamente. Ralentiza tus gestos un 20%. Pausa entre movimientos.',
          'POSTURA ESTABLE: Evita cambiar tu peso de pie a pie. Planta tus pies al ancho de los hombros. Esta postura \'enraizada\' senala estabilidad y certeza.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Act As If\' Technique',
      textEs: 'La Técnica \'Actua Como Si\'',
    },
    {
            type: 'paragraph',
      text: 'Pick the most confident salesperson you know — at your shop, in a luxury store, or even a character from a movie. Study them. How do they stand? How do they speak? What would THEY do in your situation? Then act as if you are them.',
      textEs: 'Elige al vendedor mas confiado que conozcas — en tu tienda, en una tienda de lujo, o incluso un personaje de pelicula. Estudialo. Como se paran? Como hablan? Que harian ELLOS en tu situacion? Entonces actua como si fueras ellos.',
    },
    {
            type: 'script',
      text: '\'When I first started, I wasn\'t confident at all. So I picked a character — I imagined I was a famous actress playing the role of a badass saleswoman. I copied her posture, her voice, her walk. After two weeks, I wasn\'t acting anymore. I had become her.\'',
      textEs: '\'Cuando empece, no era nada confiada. Asi que elegi un personaje — imagine que era una actriz famosa interpretando el papel de una vendedora increible. Copie su postura, su voz, su caminar. Después de dos semanas, ya no estaba actuando. Me había convertido en ella.\'',
    },
    {
            type: 'tip',
      text: 'This is not about being fake. It\'s about rapid behavioral learning. By mimicking confident behaviors, you build the neural pathways that make confidence natural. Within 30 days of consistent practice, the \'act\' becomes authentic.',
      textEs: 'Esto no se trata de ser falso. Se trata de aprendizaje conductual rápido. Al imitar comportamientos confiados, construyes las vias neuronales que hacen que la confianza sea natural. Dentro de 30 días de practica constante, el \'acto\' se vuelve autentico.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Confidence Through Preparation',
      textEs: 'Confianza a Traves de la Preparacion',
    },
    {
            type: 'paragraph',
      text: 'The deepest source of confidence is knowing you\'re ready. A prepared salesperson walks differently. But ready on day one and ready two weeks in are two different lists, and ticking nothing off the second one on your first shift is not a sign you are behind — it is a sign you are on the right list. Start here:',
      textEs: 'La fuente más profunda de confianza es saber que estás listo. Un vendedor preparado camina diferente. Pero estar listo el primer día y estarlo a las dos semanas son dos listas distintas, y no marcar nada de la segunda en tu primer turno no significa que vayas atrasado — significa que vas por la lista correcta. Empieza por esta:',
    },
    {
            type: 'checklist',
      items: [
        'I know where to stand, how to get their attention while they are still four or five metres off, and the 3-second rule once they look at me',
        'I have 3 different openers ready to go without thinking about them',
        'I can run the whole first sequence out loud, in order, without looking at anything — greeting, sample, the rush line, the gift, turn and walk',
        'I know which colleague I am handing people to when they come in, and I have told them I am about to start bringing people over'
      ],
      itemsEs: [
          'Sé dónde colocarme, cómo llamarles la atención cuando todavía están a cuatro o cinco metros, y la regla de los 3 segundos en cuanto me miran',
          'Tengo 3 aperturas distintas listas para soltarlas sin pensar',
          'Puedo soltar la secuencia entera en voz alta, en orden, sin mirar nada — saludo, muestra, lo de la prisa, el regalo, me giro y ando',
          'Sé a qué compañero le paso a la gente cuando entra, y le he avisado de que voy a empezar a traerle gente',
        ],
    },
    {
            type: 'keypoint',
      text: 'For your first two weeks that IS the whole list. You stop, you bring them in, you hand them to a colleague. No demo, no ladder, no price. Anybody who tells you that is not really selling has never tried to walk forty strangers through a door in a day — it is the hardest part of the job and everything else is built on top of it.',
      textEs: 'Durante tus primeras dos semanas ESA es la lista entera. Paras, los metes dentro, se los pasas a un compañero. Sin demo, sin escalera, sin precio. Quien te diga que eso no es vender de verdad no ha intentado nunca meter a cuarenta desconocidos por una puerta en un día — es la parte más difícil del trabajo y todo lo demás se construye encima.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When You Start Doing Demos Yourself',
      textEs: 'Cuando Empieces a Hacer Demos Tú',
    },
    {
            type: 'paragraph',
      text: 'These four are not day-one items and they are not week-one items either. They start mattering the day a colleague hands the chair back to you. Each one lives in a lesson further up the ladder, named below, and you tick it once you have done that lesson — not before:',
      textEs: 'Estos cuatro no son del primer día, y de la primera semana tampoco. Empiezan a importar el día en que un compañero te devuelve la silla. Cada uno vive en una lección más arriba en la escalera, que te indicamos abajo, y lo marcas cuando hayas hecho esa lección — no antes:',
    },
    {
            type: 'checklist',
      items: [
        'I can pitch the syringe from memory without hesitation, and the other three after it — Price Anchoring Psychology',
        'I know every price point and offer combination by heart — Price Anchoring Psychology and The Two-Choice Framework',
        'I know 5 common objections and my responses to each — Objection Handling Library',
        'I\'ve rehearsed my voucher close until it feels natural — The Voucher Close'
      ],
      itemsEs: [
          'Puedo presentar la jeringa de memoria sin dudar, y los otros tres después — Psicología del Anclaje de Precio',
          'Me sé todos los precios y combinaciones de oferta de memoria — Psicología del Anclaje de Precio y El Marco de Dos Opciones',
          'Me sé 5 objeciones comunes y mi respuesta para cada una — Biblioteca de Manejo de Objeciones',
          'He ensayado mi cierre con cupón hasta que sale natural — El Cierre con Voucher'
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Vocal Confidence Techniques',
      textEs: 'Técnicas de Confianza Vocal',
    },
    {
            type: 'bullets',
      items: [
        'VOLUME: Speak 15-20% louder than your normal conversational voice. Quiet voices signal uncertainty. Projected voices command attention.',
        'PACE: Nervous people talk fast. Slow your speech by 20%. Pauses feel longer to you than to the listener. A 2-second pause sounds thoughtful, not awkward.',
        'TONE DOWN: End sentences with a slightly lower pitch. Upspeak (rising intonation at the end of statements) sounds like you\'re asking a question, which undermines authority.',
        'BREATHING: Take a full breath before speaking. Shallow breathing creates shaky voices. Deep diaphragmatic breathing creates resonance and stability.'
      ],
      itemsEs: [
          'VOLUMEN: Habla 15-20% mas fuerte que tu voz normal de conversación. Las voces bajas senalan incertidumbre. Las voces proyectadas comandan atención.',
          'RITMO: La gente nerviosa habla rápido. Ralentiza tu habla un 20%. Las pausas se sienten mas largas para ti que para el oyente. Una pausa de 2 segundos suena pensativa, no incomoda.',
          'TONO DESCENDENTE: Termina las oraciones con un tono ligeramente mas bajo. El tono ascendente (entonacion ascendente al final de las afirmaciones) suena como si estuvieras preguntando, lo que socava la autoridad.',
          'RESPIRACION: Toma una respiracion completa antes de hablar. La respiracion superficial crea voces temblorosas. La respiracion diafragmatica profunda crea resonancia y estabilidad.',
        ],
    },
    {
            type: 'tip',
      text: 'Record yourself pitching on your phone. Listen back. Most people are shocked at how uncertain they sound. Do this weekly and track your improvement. Within a month, you\'ll hear the transformation.',
      textEs: 'Grabate haciendo tu presentacion con el móvil. Escuchate de vuelta. La mayoria de la gente se sorprende de lo inseguro que suena. Haz esto semanalmente y rastrea tu mejora. Dentro de un mes, escucharas la transformacion.',
    },
    {
            type: 'quote',
      text: 'Confidence is not \'they will like me.\' Confidence is \'I\'ll be fine if they don\'t.\'',
      textEs: 'La confianza no es \'les voy a caer bien.\' La confianza es \'voy a estar bien si no es asi.\'',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'What to Do When Confidence Crashes',
      textEs: 'Que Hacer Cuando la Confianza Se Derrumba',
    },
    {
            type: 'paragraph',
      text: 'Everyone has moments where their confidence evaporates — a string of rejections, a rude customer, a bad demo. When this happens, you need an emergency protocol:',
      textEs: 'Todos tienen momentos donde su confianza se evapora — una serie de rechazos, un cliente grosero, una mala demo. Cuando esto sucede, necesitas un protocolo de emergencia:',
    },
    {
            type: 'numbered',
      items: [
        'STEP AWAY: Ask for a quick 2-minute bathroom break. Splash cold water on your face. The physical reset triggers a mental reset.',
        'RECALL A WIN: Think of your best sale ever. Feel that moment again. Remember that you ARE capable.',
        'ADJUST ONE THING: Don\'t try to fix everything. Pick ONE behavior — maybe your posture, maybe your smile — and focus only on that for the next 3 customers.',
        'LOWER THE STAKES: Tell yourself \'I\'m just practicing.\' This removes the pressure and lets you be playful again.'
      ],
      itemsEs: [
          'ALAJATE: Pide un rápido descanso de 2 minutos al bano. Echate agua fria en la cara. El reinicio físico desencadena un reinicio mental.',
          'RECUERDA UNA VICTORIA: Piensa en tu mejor venta de todos los tiempos. Siente ese momento de nuevo. Recuerda que SI eres capaz.',
          'AJUSTA UNA COSA: No intentes arreglarlo todo. Elige UN comportamiento — quizas tu postura, quizas tu sonrisa — y enfocate solo en eso para los siguientes 3 clientes.',
          'REDUCE LAS APUESTAS: Dite a ti mismo \'solo estoy practicando.\' Esto elimina la presion y te deja ser jugueton de nuevo.',
        ],
    },
    {
            type: 'tip',
      text: 'Create a \'confidence anchor\' — a physical gesture paired with a powerful memory. For example, touching your thumb and forefinger together while remembering your best sale. After practicing this 20 times, the gesture alone triggers confidence.',
      textEs: 'Crea un \'ancla de confianza\' — un gesto físico emparejado con un recuerdo poderoso. Por ejemplo, juntar tu pulgar e indice mientras recuerdas tu mejor venta. Después de practicar esto 20 veces, el gesto solo desencadena confianza.',
    }
    ],
    quiz: [
    {
      question: 'What is the ideal duration for maintaining eye contact with a customer?',
      options: [
        'As long as possible to show dominance',
        'Brief glances to avoid intimidation',
        '2-3 seconds at a time',
        'Only when closing the sale'
      ],
      correctIndex: 2,
      explanation: 'The sweet spot for eye contact is 2-3 seconds at a time. Too short signals nervousness; too long feels aggressive. Brief, confident connection builds trust.',
    },
    {
      question: 'Why is upspeak (rising intonation at the end of statements) harmful in sales?',
      options: [
        'It makes you sound friendly',
        'It undermines your authority by making statements sound like questions',
        'It\'s harder for customers to hear',
        'It\'s culturally inappropriate'
      ],
      correctIndex: 1,
      explanation: 'Upspeak makes statements sound like questions, which subconsciously undermines your authority and certainty. End sentences with a stable or slightly lower pitch.',
    },
    {
      question: 'What is the purpose of a \'confidence anchor\'?',
      options: [
        'To impress customers with jewelry',
        'To trigger a confident state through a practiced physical gesture',
        'To show your rank in the company',
        'To remember your sales targets'
      ],
      correctIndex: 1,
      explanation: 'A confidence anchor is a physical gesture paired with a powerful memory that, after repeated practice, can trigger a confident state on demand.',
    }
    ],
  },
  'psych-4': {
    id: 'psych-4',
    categoryId: 'psychology',
    title: 'Rejection-Proof Mindset',
    titleEs: 'Mentalidad a Prueba de Rechazo',
    subtitle: 'The real numbers, the honest check, and when you actually get to put a no down',
    subtitleEs: 'Los números de verdad, la comprobación honesta, y cuándo puedes soltar un no',
    duration: '8 min',
    icon: 'Shield',
    order: 4,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Most of Them Say No — And You Still Have One Question to Answer',
      textEs: 'La Mayoría Dice Que No — Y Aun Así Te Queda Una Pregunta',
    },
    {
            type: 'paragraph',
      text: 'If you step in front of 100 people in a day, around 80 will not even look at you, 15 will say \'no thanks\', and a handful will buy. Those are the real numbers and nobody tells you them on your first day. But do not read them as comfort, because they are not comfort. Read them the other way round: if almost nobody stops, and most of the ones who do stop never buy, then the person already sitting in your chair is a rare thing. There is no queue of them behind her. You do not hurry her, you do not get bored halfway through her, and you do not let her wander off to have a think about it.',
      textEs: 'Si te pones delante de 100 personas en un día, unas 80 ni te van a mirar, 15 te dirán \'no, gracias\', y unas pocas comprarán. Esos son los números de verdad y nadie te los cuenta el primer día. Pero no los leas como consuelo, porque no son consuelo. Léelos al revés: si casi nadie para, y de los que paran casi ninguno compra, entonces la persona que ya está sentada en tu silla es algo raro. No hay una cola de ellas esperando detrás. Ni la metes prisa, ni te aburres a mitad de camino, ni la dejas irse a pensárselo.',
    },
    {
            type: 'keypoint',
      text: 'Good sellers do know their numbers, and knowing them helps: if you close 1 in 15, then fourteen noes in a row is the shape of the job and not a verdict on you. But that only holds up if you genuinely gave those fourteen everything you had. The number is not a licence. Said BEFORE a demo, \'most of them say no anyway\' is not perspective — it is an excuse, and it is the most expensive sentence a seller can learn.',
      textEs: 'Los buenos vendedores sí se saben sus números, y saberlos ayuda: si cierras 1 de cada 15, catorce noes seguidos son la forma del trabajo y no un veredicto sobre ti. Pero eso solo se sostiene si de verdad les diste todo a esos catorce. El número no es una licencia. Dicho ANTES de una demo, \'total, la mayoría dice que no\' no es perspectiva — es una excusa, y es la frase más cara que puede aprender un vendedor.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Before You Put It Down: The Honest Check',
      textEs: 'Antes de Soltarlo: La Comprobación Honesta',
    },
    {
            type: 'paragraph',
      text: 'When somebody walks without buying, there is exactly one useful question and it is not \'what is wrong with me\'. It is: did I actually give that everything? Not \'was I nice\'. Not \'did I try\'. Everything. Answer it honestly and one of two things happens — either you have just found something to fix for the price of a single sale, which is cheap, or the answer really is \'I did all of it\', and then it is not on you at all.',
      textEs: 'Cuando alguien se va sin comprar, hay exactamente una pregunta útil y no es \'qué me pasa a mí\'. Es: ¿le he dado de verdad todo lo que tengo? No \'he sido amable\'. No \'lo he intentado\'. Todo. Contéstala en serio y pasa una de dos cosas — o acabas de encontrar algo que arreglar al precio de una sola venta, que es barato, o la respuesta es de verdad \'lo he hecho todo\', y entonces no es culpa tuya en absoluto.',
    },
    {
            type: 'checklist',
      items: [
        'Did I say anything wrong, or promise something I should not have?',
        'Did I skip a step — the hand, the one eye, the mirror, the two yeses, the ask?',
        'Did I go quiet after the price, or get nervous and fill the silence?',
        'Did I get lazy in the middle, once I had decided they were not buying?',
        'Did I work the whole ladder, or stop early to save myself the effort?'
      ],
      itemsEs: [
          '¿He dicho algo que no debía, o he prometido algo que no toca?',
          '¿Me he saltado un paso — la mano, el ojo, el espejo, los dos síes, el pedir?',
          '¿Me he callado después del precio, o me he puesto nervioso y lo he llenado de ruido?',
          '¿Me he vuelto perezoso a mitad, cuando ya había decidido que no iban a comprar?',
          '¿He trabajado la escalera entera, o he parado antes para ahorrarme el esfuerzo?',
        ],
    },
    {
            type: 'keypoint',
      text: 'If one of those is a yes, that is your lesson and it was a good day — you got it for free and it cost you one sale. Write it down and take it out to the next person. If none of them is a yes, put it down and go. That is the deal, and it only works in that order.',
      textEs: 'Si alguna de esas es un sí, ahí tienes tu lección y ha sido un buen día — te la has llevado gratis y solo te ha costado una venta. Apúntala y sácala con la siguiente persona. Si ninguna es un sí, suéltalo y sigue. Ese es el trato, y solo funciona en ese orden.',
    },
    {
            type: 'comparison',
      left: { label: 'Amateur Mindset', text: '\'I\'m terrible. 20 people said no today. I suck at this. Maybe I\'m not cut out for sales.\' No list, no check — just a story of failure that gets carried to the next customer.' },
      leftEs: { label: 'Mentalidad de Aficionado', text: '\'Soy un desastre. Hoy me han dicho que no 20 personas. Se me da fatal. A lo mejor no sirvo para vender.\' Sin lista, sin comprobación — solo una historia de fracaso que se lleva al siguiente cliente.' },
      right: { label: 'Pro Mindset', text: '\'Twenty noes today. I ran the list on every one of them and I did the job. My ratio holds at 1 in 15. A couple more stops and I am probably due.\' Each rejection is data — once it has been checked.' },
      rightEs: { label: 'Mentalidad Profesional', text: '\'Hoy veinte noes. He repasado la lista con cada uno y he hecho mi trabajo. Mi ratio se mantiene en 1 de cada 15. Un par de paradas más y me toca.\' Cada rechazo es un dato — una vez comprobado.' }
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Next One\' Mentality',
      textEs: 'La Mentalidad del \'Siguiente\'',
    },
    {
            type: 'paragraph',
      text: 'The reset is the habit that keeps you alive through eight hours of this — but it comes SECOND, never first. The order is: they walk, you run the five questions in your head while they are still reaching the door, and only then do you wipe it and turn to the next person. Reset without the check is just forgetting, and a seller who forgets every no makes the same mistake for a year without noticing. Reset after the check is what lets you stay warm all day.',
      textEs: 'El reinicio es el hábito que te mantiene vivo durante ocho horas de esto — pero va el SEGUNDO, nunca el primero. El orden es: se van, repasas las cinco preguntas en la cabeza mientras todavía llegan a la puerta, y solo entonces lo borras y te giras hacia la siguiente persona. Reiniciar sin comprobar es simplemente olvidar, y un vendedor que se olvida de cada no comete el mismo fallo durante un año sin enterarse. Reiniciar después de comprobar es lo que te deja seguir simpático todo el día.',
    },
    {
            type: 'script',
      text: '\'I used to replay every rejection in my head. I\'d still be thinking about the rude woman from 20 minutes ago while missing the friendly couple right in front of me. Now I have a rule: the moment someone walks away, I literally say \'next\' under my breath. It clears my mental slate.\'',
      textEs: '\'Solia reproducir cada rechazo en mi cabeza. Seguia pensando en la mujer grosera de hace 20 minutos mientras perdia a la pareja amigable justo enfrente de mi. Ahora tengo una regla: en el momento en que alguien se aleja, literalmente digo \'siguiente\' en voz baja. Limpia mi pizarra mental.\'',
    },
    {
            type: 'tip',
      text: 'Practise it as two beats, not one. Beat one: the five questions, honestly, in the time it takes them to reach the door. Beat two: say \'next\' under your breath and mean it. Most sellers only ever learn beat two, and that is exactly why somebody can work this floor for a year and finish it no better than they started.',
      textEs: 'Practícalo en dos tiempos, no en uno. Tiempo uno: las cinco preguntas, en serio, en lo que tardan en llegar a la puerta. Tiempo dos: dices \'siguiente\' en voz baja y lo dices de verdad. La mayoría solo aprende el tiempo dos, y por eso alguien puede pasarse un año en esta sala y acabarlo igual que lo empezó.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When the List Comes Back Clean',
      textEs: 'Cuando la Lista Sale Limpia',
    },
    {
            type: 'paragraph',
      text: 'You have been through the five and there is nothing on any of them. You did the demo properly, you got the two yeses, you asked for the money, you worked the ladder all the way to the bottom, you stayed warm to the last second — and she still walked. Fine. Then it is one of these, and not one of them is a thing you could have done differently:',
      textEs: 'Has repasado las cinco y no hay nada en ninguna. Hiciste la demo bien, conseguiste los dos síes, pediste el dinero, bajaste la escalera hasta abajo del todo, estuviste simpático hasta el último segundo — y aun así se fue. Vale. Entonces es una de estas, y ninguna es algo que tú pudieras haber hecho distinto:',
    },
    {
            type: 'bullets',
      items: [
        'They are genuinely in a rush: a meeting, a reservation, a coach going in ten minutes. Nothing you say beats a departure time.',
        'They have already spent it: budget exhaustion is real, and the best demo in the world will not open an empty wallet.',
        'They do not buy anything on a trip: some people have that rule and they keep it, and it was decided before they met you.',
        'They walked in on somebody else\'s bad day: a row an hour ago, bad news this morning. They were never really in the chair.',
        'They are just a bad customer: enjoyed the free treatment, said yes to everything, was never going to pay. They exist. Part of the game.'
      ],
      itemsEs: [
          'Van de verdad con prisa: una reunión, una reserva, un autobús que sale en diez minutos. Contra una hora de salida no hay frase que valga.',
          'Ya se lo han gastado: el presupuesto agotado es real, y la mejor demo del mundo no abre una cartera vacía.',
          'No compran nada de viaje: hay gente con esa regla y la cumple, y eso lo decidieron antes de conocerte.',
          'Te han caído en el mal día de otro: una bronca hace una hora, una mala noticia esta mañana. Nunca estuvieron de verdad en la silla.',
          'Son simplemente un mal cliente: han disfrutado del tratamiento gratis, han dicho que sí a todo y nunca iban a pagar. Los hay. Forma parte del juego.',
        ],
    },
    {
            type: 'keypoint',
      text: 'That is the absolution — and notice where it sits. At the END, after the list, never before the demo. You do not get to reach for it first. A seller who starts the shift already telling themselves \'most of them say no anyway\' has taken the comfort without doing the work, and it will cost them every close-run sale of the day. The full version of this lives in It Is Not On You — If You Did Everything.',
      textEs: 'Esa es la absolución — y fíjate dónde está. Al FINAL, después de la lista, nunca antes de la demo. No puedes echar mano de ella la primera. Un vendedor que empieza el turno diciéndose \'total, la mayoría dice que no\' se ha quedado el consuelo sin hacer el trabajo, y le va a costar todas las ventas ajustadas del día. La versión completa está en No Es Culpa Tuya — Si Lo Hiciste Todo.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'How Top Sellers Process a Bad Day',
      textEs: 'Como los Mejores Vendedores Procesan un Mal Día',
    },
    {
            type: 'paragraph',
      text: 'Even the best have terrible days. Here\'s the protocol that separates pros from amateurs:',
      textEs: 'Incluso los mejores tienen días terribles. Aquí esta el protocolo que separa a los profesionales de los aficionados:',
    },
    {
            type: 'numbered',
      items: [
        'DON\'T TAKE IT HOME: The moment you clock out, the day is done. Don\'t replay rejections in your head all evening. That day doesn\'t exist anymore.',
        'FIND ONE WIN: Even on the worst day, find ONE thing you did well. Maybe your opener was smooth. Maybe your demo was great even though they didn\'t buy. Focus on that.',
        'ANALYZE PATTERNS: If you\'re getting rejected more than usual, look for patterns. Is your energy low? Are you stopping the wrong people? Is your opener tired? Fix the mechanics, not your self-worth.',
        'SLEEP IT OFF: A bad day feels like a crisis at 6pm and often feels like nothing the next morning. Never make career decisions based on one bad shift.',
        'TALK TO TEAMMATES: Everyone has bad days. Sharing yours normalizes it. Hearing that your colleague also got rejected 30 times makes you feel less alone.'
      ],
      itemsEs: [
          'NO TE LO LLEVES A CASA: En el momento en que fichas tu salida, el día se acabo. No repitas los rechazos en tu cabeza toda la noche. Ese día ya no existe.',
          'ENCUENTRA UNA VICTORIA: Incluso en el peor día, encuentra UNA cosa que hiciste bien. Quizas tu apertura fue fluida. Quizas tu demo estuvo genial aunque no compraron. Enfocate en eso.',
          'ANALIZA PATRONES: Si te están rechazando mas de lo usual, busca patrones. Esta baja tu energía? Estas deteniendo a las personas equivocadas? Tu apertura esta cansada? Arregla la mecanica, no tu autoestima.',
          'DUERMETELO: Un mal día se siente como una crisis a las 6pm y a menudo no significa nada a la manana siguiente. Nunca tomes decisiones de carrera basadas en un mal turno.',
          'HABLA CON TUS COMPANEROS: Todos tienen malos días. Compartir los tuyos lo normaliza. Escuchar que tu companero también fue rechazado 30 veces te hace sentir menos solo.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Turning a Bad Day Around',
      textEs: 'Cambiar un Mal Día',
    },
    {
            type: 'paragraph',
      text: 'Sometimes you can actually SAVE a bad day. Here\'s the emergency turnaround protocol:',
      textEs: 'A veces puedes realmente SALVAR un mal día. Aquí esta el protocolo de emergencia para darle la vuelta:',
    },
    {
            type: 'bullets',
      items: [
        'CHANGE ONE THING: If you\'ve been using the same opener all day and getting rejected, switch it completely. New energy breaks the pattern.',
        'TARGET DIFFERENT PEOPLE: If you\'ve been stopping solo women and failing, try couples. Or vice versa. Different demographics respond to different energies.',
        'GO BACK TO BASICS: When everything falls apart, simplify. Stop overthinking. Smile, make eye contact, deliver your cleanest opener. Fundamentals fix slumps.',
        'ASK A TEAMMATE TO WATCH YOU: Sometimes you have a blind spot. A colleague might notice you\'re rushing, or your posture has collapsed, or you\'re not making eye contact. External feedback is gold.'
      ],
      itemsEs: [
          'CAMBIA UNA COSA: Si has estado usando la misma apertura todo el día y te rechazan, cambiala completamente. La energía nueva rompe el patron.',
          'APUNTA A DIFERENTES PERSONAS: Si has estado deteniendo a mujeres solas y fallando, prueba con parejas. O viceversa. Diferentes demografias responden a diferentes energias.',
          'VUELVE A LO BASICO: Cuando todo se desmorona, simplifica. Deja de pensar demasiado. Sonrie, haz contacto visual, lanza tu apertura mas limpia. Los fundamentos arreglan los bajones.',
          'PIDE A UN COMPANERO QUE TE OBSERVE: A veces tienes un punto ciego. Un colega podría notar que te estas apresurando, o que tu postura se ha derrumbado, o que no estas haciendo contacto visual. La retroalimentacion externa es oro.',
        ],
    },
    {
            type: 'quote',
      text: 'The only difference between a top seller and a quitter is that the top seller kept going through the days they wanted to quit.',
      textEs: 'La única diferencia entre un top vendedor y alguien que se rinde es que el top vendedor siguio adelante en los días que quiso rendirse.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    },
    {
            type: 'tip',
      text: 'Track your numbers daily. Write down: stops, demos, closes, total revenue. Over time, you\'ll see your personal ratio. When you KNOW that you close 1 in 15, the 14 rejections before your next sale become... expected. Peaceful, even.',
      textEs: 'Rastrea tus numeros diariamente. Anota: detenciones, demos, cierres, ingreso total. Con el tiempo, veras tu ratio personal. Cuando SABES que cierras 1 de cada 15, los 14 rechazos antes de tu siguiente venta se vuelven... esperados. Pacificos, incluso.',
    }
    ],
    quiz: [
    {
      question: 'If your close rate is 5%, how should you view a string of 10 rejections?',
      options: [
        'As proof you\'re having a bad day',
        'As statistical progress toward your next sale',
        'As a sign you need to change your pitch completely',
        'As a reason to take a long break'
      ],
      correctIndex: 1,
      explanation: 'With a 5% close rate, every \'no\' is simply 5% of a \'yes.\' A string of rejections is expected statistical progress toward your next close, not evidence of failure.',
    },
    {
      question: 'What is the \'next one\' mentality?',
      options: [
        'Always focusing on the next customer while ignoring the current one',
        'Instantly resetting your focus to the next person after each rejection',
        'Trying to stop the next person you see regardless of quality',
        'Planning your next day during your shift'
      ],
      correctIndex: 1,
      explanation: 'The \'next one\' mentality is an instantaneous mental reset. The moment a customer walks away, that interaction is erased and total focus shifts to the next person approaching.',
    },
    {
      question: 'Which of these is the LEAST likely reason a customer says \'no\'?',
      options: [
        'They\'re in a hurry or have a reservation',
        'They don\'t buy anything while traveling',
        'You personally are unlikeable',
        'They\'re overwhelmed from shopping'
      ],
      correctIndex: 2,
      explanation: 'Rejection is almost never personal. Customers say no due to timing, budget, mood, travel habits, or overwhelm. Believing it\'s about your personality is the amateur mindset that destroys performance.',
    }
    ],
  },
  'psych-5': {
    id: 'psych-5',
    categoryId: 'psychology',
    title: 'The Mirror Effect',
    titleEs: 'El Efecto Espejo',
    subtitle: 'Emotional contagion. Why YOUR mood becomes THEIR mood. The shop as an energy ecosystem.',
    subtitleEs: 'La gente compra de gente que le gusta',
    duration: '8 min',
    icon: 'Heart',
    order: 5,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Your Mood Is Contagious — Choose What You Spread',
      textEs: 'Tu Estado de Ánimo es Contagioso — Elige Qué Transmitir',
    },
    {
            type: 'paragraph',
      text: 'Have you ever walked into a room and instantly felt tense? Or walked into another room and felt relaxed? That\'s emotional contagion — the phenomenon where humans automatically \'catch\' the emotions of those around them. On the sales floor, YOU are the source of emotional contagion. Your frustration, excitement, calm, or anxiety spreads to customers like a virus.',
      textEs: '¿Alguna vez entraste a un cuarto y de inmediato sentiste tensión? O entraste a otro y sentiste relajación? Eso es contagio emocional — el fenómeno por el cual los humanos \'captan\' automáticamente las emociones de quienes nos rodean. En el piso de ventas, TÚ eres la fuente del contagio emocional. Tu frustración, emoción, calma o ansiedad se transmite a los clientes como un virus.',
    },
    {
            type: 'keypoint',
      text: 'Emotional contagion happens through micro-expressions, vocal tone, body posture, and even pheromones. Customers don\'t consciously read your mood — they FEEL it. A frustrated seller creates guarded customers. An excited seller creates curious customers.',
      textEs: 'El contagio emocional ocurre a través de microexpresiones, tono de voz, postura corporal e incluso feromonas. Los clientes no leen tu estado de ánimo conscientemente — lo SIENTEN. Un vendedor frustrado genera clientes a la defensiva. Un vendedor entusiasmado genera clientes curiosos.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'You Catch It Off Each Other',
      textEs: 'Se Contagia y Ya Está',
    },
    {
            type: 'paragraph',
      text: 'You already know this one. Stand next to somebody in a foul mood for two minutes and you are in one. Customers catch yours before you have opened your mouth — from three metres, straight off your face. Come out heavy and they go guarded. Come out light and they come closer. That is the whole lesson.',
      textEs: 'Esto ya te lo sabes. Ponte dos minutos al lado de alguien de mal humor y ya estás de mal humor. Los clientes te lo pillan antes de que abras la boca — desde tres metros, directamente de la cara. Sal pesado y se ponen a la defensiva. Sal ligero y se acercan. Esa es toda la lección.',
    },
    {
            type: 'paragraph',
      text: 'When you approach a customer with tight facial muscles and a flat voice, they unconsciously mirror that tension. Their guard goes up. When you approach with genuine warmth and energy, they mirror that openness. The sale becomes possible.',
      textEs: 'Cuando te acercas a un cliente con los músculos faciales tensos y una voz plana, ellos reflejan esa tensión inconscientemente. Se ponen a la defensiva. Cuando te acercas con calidez genuina y energía, reflejan esa apertura. La venta se vuelve posible.',
    },
    {
            type: 'tip',
      text: 'Before you approach ANY customer, check your face. Are you smiling? Is your forehead relaxed? Are your eyes soft? Customers decide whether to trust you in the first 2 seconds — mostly from your facial expression.',
      textEs: 'Antes de acercarte a CUALQUIER cliente, revisa tu cara. ¿Estás sonriendo? ¿Tu frente está relajada? ¿Tus ojos son suaves? Los clientes deciden si confiar en ti en los primeros 2 segundos — principalmente por tu expresión facial.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Managing Frustration on the Floor',
      textEs: 'Manejando la Frustración en el Piso de Ventas',
    },
    {
            type: 'paragraph',
      text: 'Frustration is the most dangerous emotion on the sales floor. It spreads fast and kills sales. After three rejections in a row, frustration builds. Your shoulders tense. Your smile fades. Your voice tightens. Now the fourth customer feels that heaviness and rejects you too. It\'s a spiral.',
      textEs: 'La frustración es la emoción más peligrosa en el piso de ventas. Se propaga rápido y mata las ventas. Después de tres rechazos seguidos, la frustración crece. Tus hombros se tensan. Tu sonrisa se desvanece. Tu voz se tensa. Ahora el cuarto cliente siente esa pesadez y también te rechaza. Es una espiral.',
    },
    {
            type: 'bullets',
      items: [
        'RECOGNIZE THE SPIRAL: The first step is awareness. Notice when your shoulders tense, when your breathing becomes shallow, when you start thinking \'this is pointless.\'',
        'BREAK THE PHYSICAL PATTERN: Frustration lives in your body. Shake your hands out. Roll your shoulders. Take 3 deep breaths. Physical reset creates emotional reset.',
        'CHANGE YOUR SELF-TALK: Instead of \'this sucks,\' try \'I\'m due for a win.\' Instead of \'nobody\'s buying today,\' try \'the right customer is coming.\' Your brain believes what you tell it.',
        'SEEK POSITIVE INPUT: Talk to an upbeat teammate. Their energy will pull you out of the frustration spiral. Energy is contagious in BOTH directions.'
      ],
      itemsEs: [
          'RECONOCE LA ESPIRAL: El primer paso es la conciencia. Nota cuándo se tensan tus hombros, cuándo tu respiración se vuelve superficial, cuándo empiezas a pensar \'esto no tiene sentido\'.',
          'ROMPE EL PATRÓN FÍSICO: La frustración vive en tu cuerpo. Sacude las manos. Gira los hombros. Toma 3 respiraciones profundas. El reinicio físico crea el reinicio emocional.',
          'CAMBIA TU DIÁLOGO INTERNO: En lugar de \'esto es una porquería\', prueba \'me toca ganar\'. En lugar de \'nadie compra hoy\', prueba "el cliente indicado está por llegar". Tu cerebro cree lo que le dices.',
          'BUSCA ESTÍMULOS POSITIVOS: Habla con un compañero con buena energía. Su energía te sacará de la espiral de frustración. La energía es contagiosa en AMBAS direcciones.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Excitement vs. Calm: When to Use Which',
      textEs: 'Entusiasmo vs. Calma: Cuándo Usar Cada Uno',
    },
    {
            type: 'comparison',
      left: { label: 'High Energy / Excitement', text: 'Best for: groups, holiday crowds, the first sale of the day, younger customers, anybody already laughing. Creates urgency and fun. Risks: it can flatten a quiet, analytical buyer, and it tips into pushy the moment you keep it up after they have gone still.' },
      leftEs: { label: 'Alta Energía / Entusiasmo', text: 'Ideal para: grupos, multitudes de vacaciones, la primera venta del día, clientes jóvenes, cualquiera que ya venga riéndose. Crea urgencia y diversión. Riesgos: puede aplastar a una clienta callada y analítica, y se vuelve agresiva en cuanto sigues con ella después de que se hayan quedado quietos.' },
      right: { label: 'Calm / Warm Energy', text: 'Best for: couples, older customers, somebody who came in wary, the one who asks a lot of questions. Creates trust and sophistication. Risks: it reads as flat if you are not genuinely present, and without real listening behind it, it is not calm — it is just slow.' },
      rightEs: { label: 'Energía Tranquila / Cercana', text: 'Ideal para: parejas, clientes mayores, alguien que ha entrado con la mosca detrás de la oreja, el que pregunta mucho. Genera confianza y elegancia. Riesgos: parece falta de energía si no estás de verdad presente, y sin escucha real detrás no es calma — es lentitud.' }
    },
    {
            type: 'keypoint',
      text: 'And never read the clock as an instruction. A dead hour is not permission to drop into second gear — it is the hour you try hardest, because the two people who walk past in it might be all you get today, and you work somebody you would happily wave through on a Saturday. A packed hour is the opposite: tighten everything, do not grind water, because the second you finish this one there is another one outside the door.',
      textEs: 'Y no leas nunca el reloj como si fuera una instrucción. Una hora muerta no es permiso para meter segunda — es la hora en la que más lo intentas, porque las dos personas que pasen igual son todo lo que te va a dar el día, y trabajas a alguien al que un sábado dejarías pasar sin más. Una hora a tope es lo contrario: aprieta todo, no le des vueltas al agua, porque en cuanto termines con esta hay otra fuera esperando.',
    },
    {
            type: 'tip',
      text: 'Match the customer\'s energy, then lift it a notch. If they are calm and thoughtful, be calm and warm — with a spark under it. If they are loud and laughing, meet them there and go one better. What you are matching is the person in front of you, never the state of the shop behind you.',
      textEs: 'Iguala la energía del cliente y luego súbela un punto. Si viene tranquila y reflexiva, ve tranquilo y cálido — pero con una chispa debajo. Si viene alto y riéndose, ponte a su altura y súbelo un poco más. Lo que igualas es a la persona que tienes delante, nunca cómo esté la tienda detrás de ti.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Shop as an Energy Ecosystem',
      textEs: 'La Tienda como un Ecosistema de Energía',
    },
    {
            type: 'paragraph',
      text: 'The shop isn\'t just a collection of individuals — it\'s an energy ecosystem. When one person is closing a sale with excitement, that energy lifts everyone. When one person is slumped and frustrated, that energy drags everyone down. Top shops understand this and protect the collective energy fiercely.',
      textEs: 'La tienda no es solo un conjunto de individuos — es un ecosistema de energía. Cuando alguien cierra una venta con emoción, esa energía levanta a todos. Cuando alguien está decaído y frustrado, esa energía arrastra a todos. Las mejores tiendas entienden esto y protegen ferozmente la energía colectiva.',
    },
    {
            type: 'bullets',
      items: [
        'CELEBRATE WINS LOUDLY: When a teammate closes, cheer for them. The celebration creates positive emotional contagion for the whole shop.',
        'NEVER VENT ON THE FLOOR: If you need to complain, do it in the back room. Complaining in the customer area poisons the energy ecosystem.',
        'HELP THE STRUGGLING TEAMMATE: If you see a colleague\'s energy crashing, switch with them. Give them a moment to reset. The whole shop benefits when everyone\'s energy is up.',
        'PROTECT THE FIRST HOUR: No breaks, no negativity, no slacking in the first hour. It sets the energy tone for the entire day.'
      ],
      itemsEs: [
          'CELEBRA LAS VICTORIAS EN VOZ ALTA: Cuando un compañero cierra una venta, apláudelo. La celebración crea contagio emocional positivo para toda la tienda.',
          'NUNCA DESAHÓGATE EN EL PISO: Si necesitas quejarte, hazlo en el cuarto de atrás. Quejarte en el área de clientes envenena el ecosistema de energía.',
          'AYUDA AL COMPAÑERO QUE LUCHA: Si ves que la energía de un colega se está derrumbando, cúbrele. Dale un momento para reiniciarse. Toda la tienda se beneficia cuando la energía de todos está al alza.',
          'PROTEGE LA PRIMERA HORA: Sin descansos, sin negatividad, sin flojera en la primera hora. Establece el tono energético para todo el día.',
        ],
    },
    {
            type: 'quote',
      text: 'You\'re not just selling a product. You\'re selling a feeling. And the feeling starts with you.',
      textEs: 'No solo estás vendiendo un producto. Estás vendiendo una sensación. Y la sensación empieza contigo.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    },
    {
            type: 'subheader',
      text: 'Daily Energy Audit',
      textEs: 'Auditoría Diaria de Energía',
    },
    {
            type: 'paragraph',
      text: 'At the end of each shift, ask yourself these three questions:',
      textEs: 'Al final de cada turno, hazte estas tres preguntas:',
    },
    {
            type: 'numbered',
      items: [
        'What energy did I bring to the floor today? Was I excited, calm, frustrated, distracted?',
        'How did customers respond to my energy? Were they open and warm, or guarded and distant?',
        'What one thing can I do tomorrow to bring better energy? (Sleep earlier, eat better, listen to music, talk to a friend before work?)'
      ],
      itemsEs: [
          '¿Qué energía traje al piso hoy? ¿Estaba emocionado, calmado, frustrado, distraído?',
          '¿Cómo respondieron los clientes a mi energía? ¿Estuvieron abiertos y cálidos, o a la defensiva y distantes?',
          '¿Qué puedo hacer mañana para traer mejor energía? (¿dormir más temprano, comer mejor, escuchar música, hablar con un amigo antes del trabajo?)',
        ],
    },
    {
            type: 'tip',
      text: 'Keep a small notebook and track your mood and your sales for two weeks. You\'ll likely discover a clear pattern: your best sales days correlate strongly with your best energy days. This data becomes powerful motivation to prioritize your own wellbeing.',
      textEs: 'Lleva una libreta pequeña y registra tu estado de ánimo y tus ventas durante dos semanas. Es probable que descubras un patrón claro: tus mejores días de venta se correlacionan fuertemente con tus mejores días de energía. Estos datos se convierten en una motivación poderosa para priorizar tu propio bienestar.',
    }
    ],
    quiz: [
    {
      question: 'When does a customer first pick up your mood?',
      options: [
        'Once you have been chatting for a minute or two',
        'Before you have said a word',
        'Only when you tell them how your day is going',
        'After the demo, when they see the result in the mirror'
      ],
      correctIndex: 1,
      explanation: 'They catch it off your face from three metres, before you open your mouth. Come out heavy and they go guarded; come out light and they come closer.',
    },
    {
      question: 'When is calm, warm energy most appropriate?',
      options: [
        'With young groups and holiday shoppers',
        'With couples, older customers, and serious buyers',
        'Never — high energy always wins',
        'Only when you\'re tired'
      ],
      correctIndex: 1,
      explanation: 'Calm, warm energy works best with couples, older customers, and serious buyers. It creates trust and sophistication. Match the customer\'s energy, then slightly elevate it.',
    },
    {
      question: 'Why should you never vent frustration on the sales floor?',
      options: [
        'The manager will hear you',
        'It poisons the energy ecosystem for everyone including customers',
        'Customers might complain',
        'It\'s unprofessional but doesn\'t affect sales'
      ],
      correctIndex: 1,
      explanation: 'The shop is an energy ecosystem. Complaining on the floor creates negative emotional contagion that affects teammates and customers. Vent in the back room, never in customer areas.',
    }
    ],
  },
  'psych-6': {
    id: 'psych-6',
    categoryId: 'psychology',
    title: 'Your Life Outside Work',
    titleEs: 'Tu Vida Fuera del Trabajo',
    subtitle: 'Exercise, sleep, nutrition, social life — how taking care of yourself makes you a better seller',
    subtitleEs: 'El descanso es parte del rendimiento',
    duration: '8 min',
    icon: 'Sparkles',
    order: 6,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'The Best Salespeople Take Care of Themselves',
      textEs: 'Los Mejores Vendedores se Cuidan a Sí Mismos',
    },
    {
            type: 'paragraph',
      text: 'A seller on four hours\' sleep, a bad lunch and no daylight is a seller who is slow on the door and flat in the chair. Everything you turn up with was built outside the shop. And you are on commission: a bad night costs you real money the next day. That is the whole argument.',
      textEs: 'Un vendedor con cuatro horas de sueño, una mala comida y sin ver la luz del día es un vendedor lento en la puerta y apagado en la silla. Todo lo que traes puesto se ha construido fuera de la tienda. Y estás a comisión: una mala noche te cuesta dinero de verdad al día siguiente. Ese es todo el argumento.',
    },
    {
            type: 'keypoint',
      text: 'You are on commission, so the maths is not complicated: tired means slower on the door, flatter in the chair, quicker to give up on the ladder. Every one of those is a sale you would otherwise have had, and the sales you lose that way are not on the customer. Sleep is not self-care here. It is stock.',
      textEs: 'Estás a comisión, así que la cuenta no tiene misterio: cansado significa más lento en la puerta, más apagado en la silla y más rápido en rendirte con la escalera. Cada una de esas cosas es una venta que habrías tenido, y las ventas que pierdes así no son culpa del cliente. Aquí dormir no es cuidarse. Es mercancía.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Sleep: The Foundation of Everything',
      textEs: 'Sueño: La Base de Todo',
    },
    {
            type: 'paragraph',
      text: 'Sleep deprivation affects the prefrontal cortex — the part of your brain responsible for decision-making, emotional regulation, and social interaction. In other words, it destroys the exact skills you need for sales. After a poor night\'s sleep:',
      textEs: 'La privación de sueño afecta la corteza prefrontal — la parte de tu cerebro responsable de la toma de decisiones, la regulación emocional y la interacción social. En otras palabras, destruye exactamente las habilidades que necesitas para vender. Después de una mala noche de sueño:',
    },
    {
            type: 'bullets',
      items: [
        'Your skin gets thinner. The same no that bounced off you at ten in the morning stings at six.',
        'Your facial expressions become flatter and less genuine. Customers notice.',
        'Your verbal fluency decreases. Words don\'t come as easily.',
        'Your motivation and drive plummet. You stop more hesitantly.'
      ],
      itemsEs: [
          'Se te pone la piel más fina. El mismo no que a las diez de la mañana te resbalaba, a las seis escuece.',
          'Tus expresiones faciales se vuelven más planas y menos genuinas. Los clientes se dan cuenta.',
          'Tu fluidez verbal disminuye. Las palabras no salen tan fácilmente.',
          'Tu motivación y empuje se desploman. Te detienes de forma más vacilante.',
        ],
    },
    {
            type: 'tip',
      text: 'Aim for 7-8 hours of sleep. If you have a late night before an early shift, a 20-minute power nap before work can restore significant cognitive function. The 20-minute length is critical — longer naps create grogginess.',
      textEs: 'Apunta a 7-8 horas de sueño. Si tienes una noche larga antes de un turno temprano, una siesta rápida de 20 minutos antes del trabajo puede restaurar una función cognitiva significativa. La duración de 20 minutos es crítica — siestas más largas crean aturdimiento.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Exercise: Your Energy Multiplier',
      textEs: 'Ejercicio: Tu Multiplicador de Energía',
    },
    {
            type: 'paragraph',
      text: 'You don\'t need to be an athlete. You need consistent movement that builds energy and reduces stress. The best exercise for salespeople is anything that gets your heart rate up and your mood elevated.',
      textEs: 'No necesitas ser atleta. Necesitas movimiento consistente que genere energía y reduzca el estrés. El mejor ejercicio para vendedores es cualquiera que acelere tu ritmo cardíaco y eleve tu estado de ánimo.',
    },
    {
            type: 'bullets',
      items: [
        'CARDIO (running, cycling, dancing): Builds baseline energy and lung capacity. Better breathing = better voice projection and calmer nerves.',
        'STRENGTH TRAINING: Builds confidence through physical capability. Standing tall with good posture is easier with a strong back and core.',
        'YOGA / STRETCHING: Reduces physical tension that accumulates during shifts. A relaxed body creates a relaxed presence.',
        'WALKING: Even a 20-minute walk after work helps process the day\'s stress and transition out of \'work mode.\''
      ],
      itemsEs: [
          'CARDIO (correr, ciclismo, bailar): Construye energía base y capacidad pulmonar. Mejor respiración = mejor proyección de voz y nervios más calmados.',
          'ENTRENAMIENTO DE FUERZA: Construye confianza a través de la capacidad física. Mantenerse erguido con buena postura es más fácil con una espalda y núcleo fuertes.',
          'YOGA / ESTIRAMIENTOS: Reduce la tensión física que se acumula durante los turnos. Un cuerpo relajado crea una presencia relajada.',
          'CAMINAR: Incluso una caminata de 20 minutos después del trabajo ayuda a procesar el estrés del día y a salir del \'modo trabajo\'.',
        ],
    },
    {
            type: 'tip',
      text: 'The best time to exercise for sales performance is BEFORE your shift, even if just 10 minutes of jumping jacks and stretching. This elevates your energy when you need it most. If mornings are impossible, exercise on your days off to build baseline energy.',
      textEs: 'El mejor momento para ejercitarte para el rendimiento en ventas es ANTES de tu turno, aunque sean solo 10 minutos de jumping jacks y estiramientos. Esto eleva tu energía cuando más la necesitas. Si las mañanas son imposibles, haz ejercicio en tus días libres para construir energía base.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Nutrition: Fuel for Performance',
      textEs: 'Nutrición: Combustible para el Rendimiento',
    },
    {
            type: 'paragraph',
      text: 'What you eat directly affects your brain function, mood stability, and energy levels. A sugary breakfast creates a mid-morning crash. A heavy lunch creates afternoon fog. Smart nutrition is strategic.',
      textEs: 'Lo que comes afecta directamente tu función cerebral, estabilidad del estado de ánimo y niveles de energía. Un desayuno azucarado causa un bajón a media mañana. Un almuerzo pesado causa niebla mental en la tarde. La nutrición inteligente es estratégica.',
    },
    {
            type: 'numbered',
      items: [
        'BREAKFAST: Protein + complex carbs. Eggs with whole grain toast, Greek yogurt with nuts, or a protein smoothie. Avoid pastries and sugary cereals — they create a crash by 10am.',
        'DURING SHIFT: Light snacks. Nuts, fruit, protein bars. Avoid heavy meals during breaks. A salad with chicken is perfect. Pizza will make you sluggish.',
        'HYDRATION: Water is your #1 performance tool. Dehydration causes fatigue, headaches, and poor concentration. Keep a water bottle on the floor.',
        'AFTER WORK: Eat to recover, not to reward. A nutritious dinner helps you sleep better and wake up with more energy. The \'I deserve junk food after a hard day\' mindset sabotages tomorrow\'s performance.'
      ],
      itemsEs: [
          'DESAYUNO: Proteína + carbohidratos complejos. Huevos con pan integral, yogur griego con nueces, o un licuado de proteína. Evita pan dulce y cereales azucarados — te causan un bajón a las 10am.',
          'DURANTE EL TURNO: Snacks ligeros. Nueces, fruta, barras de proteína. Evita comidas pesadas durante los descansos. Una ensalada con pollo es perfecta. La pizza te hará sentir lento.',
          'HIDRATACIÓN: El agua es tu herramienta de rendimiento #1. La deshidratación causa fatiga, dolores de cabeza y mala concentración. Mantén una botella de agua en el piso.',
          'DESPUÉS DEL TRABAJO: Come para recuperarte, no para recompensarte. Una cena nutritiva te ayuda a dormir mejor y despertar con más energía. La mentalidad de \'me merezco comida chatarra después de un día duro\' sabotea el rendimiento de mañana.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Social Life & Mental Health',
      textEs: 'Vida Social y Salud Mental',
    },
    {
            type: 'paragraph',
      text: 'Sales is emotionally demanding. You\'re performing all day — smiling, engaging, handling rejection. You need people who recharge you, not drain you. A supportive social circle is essential for long-term performance.',
      textEs: 'Las ventas exigen emocionalmente. Estás actuando todo el día — sonriendo, interactuando, manejando el rechazo. Necesitas personas que te recarguen, no que te drenen. Un círculo social de apoyo es esencial para el rendimiento a largo plazo.',
    },
    {
            type: 'bullets',
      items: [
        'SPEND TIME WITH PEOPLE WHO ENERGIZE YOU: After a day of giving energy to customers, you need people who fill your cup. Limit time with people who complain, criticize, or drain you.',
        'PROCESS REJECTION WITH FRIENDS: Talk about your bad days. Normalize the experience. A friend who says \'that sounds tough, but I know you\'ll crush it tomorrow\' is worth their weight in gold.',
        'HAVE NON-SALES CONVERSATIONS: Don\'t let your whole identity become selling. Talk about movies, sports, philosophy, travel. A well-rounded mind is a more interesting salesperson.',
        'CREATE RITUALS: Weekly dinner with friends, a hobby class, a sports team. Scheduled activities ensure you\'re building a life outside work, not just recovering from it.'
      ],
      itemsEs: [
          'PASATIEMPO CON PERSONAS QUE TE ENERGIZAN: Después de un día dando energía a clientes, necesitas personas que te llenen el tanque. Limita el tiempo con personas que se quejan, critican o te drenan.',
          'PROCESA EL RECHAZO CON AMIGOS: Habla de tus malos días. Normaliza la experiencia. Un amigo que dice \'suena difícil, pero sé que la romperás mañana\' vale su peso en oro.',
          'TEN CONVERSACIONES QUE NO SEAN DE VENTAS: No dejes que toda tu identidad se convierta en vender. Habla de películas, deportes, filosofía, viajes. Una mente cultivada es un vendedor más interesante.',
          'CREA RITUALES: Cena semanal con amigos, una clase de hobby, un equipo deportivo. Las actividades programadas aseguran que estás construyendo una vida fuera del trabajo, no solo recuperándote de él.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Where You Actually Learn This',
      textEs: 'Dónde se Aprende Esto de Verdad',
    },
    {
            type: 'paragraph',
      text: 'You will not find this job in a book. You will find it about four metres away from you, every single shift:',
      textEs: 'Este trabajo no lo vas a encontrar en un libro. Lo tienes a unos cuatro metros de ti, en cada turno:',
    },
    {
            type: 'bullets',
      items: [
        'WATCH THE BEST SELLER ON THIS STREET FOR ONE SHIFT: Not what they say — what they do with their hands, and how quickly they let somebody go. Four hours of that beats four books.',
        'GO AND BE A CUSTOMER SOMEWHERE: A shop, a market, a bar. Notice the exact thing that made you stop, and the exact thing that made you want to leave. Steal the first one, never do the second.',
        'STEAL FROM OTHER TRADES: How a good waiter reads a table before anybody has ordered. How a doorman greets somebody he has never met. Same job as yours, different uniform.'
      ],
      itemsEs: [
          'OBSERVA UN TURNO ENTERO AL QUE MEJOR VENDE DE ESTA CALLE: No lo que dice — lo que hace con las manos, y lo rápido que deja marchar a alguien. Cuatro horas de eso valen más que cuatro libros.',
          'VE A SER CLIENTE A ALGÚN SITIO: Una tienda, un mercado, un bar. Fíjate en qué te hizo pararte exactamente, y en qué te dio ganas de irte. Róbate lo primero y no hagas nunca lo segundo.',
          'RÓBALE A OTROS OFICIOS: Cómo un buen camarero lee una mesa antes de que nadie haya pedido. Cómo un portero saluda a alguien a quien no ha visto en su vida. El mismo trabajo que el tuyo con otro uniforme.',
        ],
    },
    {
            type: 'tip',
      text: 'One thing a week. Watch one person, or go and be a customer once, and take exactly one thing away from it. In six months that is twenty-odd moves that are yours, and not one of them came out of a book.',
      textEs: 'Una cosa por semana. Observa a una persona, o vete a ser cliente una vez, y llévate exactamente una cosa. En seis meses eso son veintitantas jugadas que son tuyas, y ninguna ha salido de un libro.',
    },
    {
            type: 'quote',
      text: 'Taking care of yourself isn\'t selfish — it\'s your most profitable investment. A well-rested, well-fed, well-exercised salesperson is a money-making machine.',
      textEs: 'Cuidarte a ti mismo no es egoísta — es tu inversión más rentable. Un vendedor bien descansado, bien alimentado y bien ejercitado es una máquina de hacer dinero.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'How does sleep deprivation specifically affect sales performance?',
      options: [
        'It only makes you feel tired but doesn\'t affect sales',
        'It reduces emotional resilience, verbal fluency, and facial expressiveness',
        'It actually improves performance because you\'re more desperate for commission',
        'It only affects your ability to close big sales'
      ],
      correctIndex: 1,
      explanation: 'Sleep deprivation affects the prefrontal cortex, reducing emotional resilience, verbal fluency, and making facial expressions flatter. These are exactly the skills needed for sales.',
    },
    {
      question: 'Why is exercise particularly valuable for salespeople?',
      options: [
        'It helps you look better in the uniform',
        'It builds energy, lung capacity for voice projection, and confidence',
        'It\'s required by company policy',
        'It gives you something to talk about with customers'
      ],
      correctIndex: 1,
      explanation: 'Exercise builds baseline energy, improves breathing for better voice projection, and builds confidence through physical capability — all directly relevant to sales performance.',
    },
    {
      question: 'What type of lunch should you eat to maintain afternoon energy?',
      options: [
        'Pizza or pasta for satisfaction',
        'A heavy meal to feel full',
        'Light protein, salad, and fruit',
        'Skip lunch and power through'
      ],
      correctIndex: 2,
      explanation: 'Heavy meals redirect blood from the brain to the stomach, causing afternoon fog. Light protein, salads, and fruit provide sustained energy without the crash.',
    }
    ],
  },
  'psych-7': {
    id: 'psych-7',
    categoryId: 'psychology',
    title: 'The Science of Persuasion',
    titleEs: 'La Ciencia de la Persuasión',
    subtitle: 'Cialdini\'s 6 principles applied to YOUR floor — with real examples for each',
    subtitleEs: 'Los 6 principios de Cialdini aplicados a TU calle — con un ejemplo real de cada uno',
    duration: '10 min',
    icon: 'Brain',
    order: 7,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'The 6 Weapons of Influence — On Your Floor, Today',
      textEs: 'Las 6 Armas de la Influencia — En Tu Piso, Hoy',
    },
    {
            type: 'paragraph',
      text: 'Dr. Robert Cialdini spent decades researching what makes people say \'yes.\' He identified six universal principles of persuasion that work across all cultures and contexts. Every single one of them is happening on your sales floor — either by accident or by design. Master them, and you control the conversation.',
      textEs: 'El Dr. Robert Cialdini pasó décadas investigando qué hace que la gente diga \'sí\'. Identificó seis principios universales de la persuasión que funcionan en todas las culturas y contextos. Cada uno de ellos está ocurriendo en tu piso de ventas — ya sea por accidente o a propósito. Domínalos y controlarás la conversación.',
    },
    {
            type: 'keypoint',
      text: 'None of this is new. Every trader in every market on earth has been using these six since long before anybody gave them names — Cialdini just wrote them down and got famous for it. You are already doing three of them by accident. Here is what all six sound like on your pavement.',
      textEs: 'Nada de esto es nuevo. Todos los vendedores de todos los mercados del mundo llevan usando estas seis desde mucho antes de que nadie les pusiera nombre — Cialdini solo las escribió y se hizo famoso. Tres de ellas ya las estás haciendo sin darte cuenta. Aquí tienes cómo suenan las seis en tu acera.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '1. Reciprocity — People Feel Obliged to Give Back',
      textEs: '1. Reciprocidad — La Gente Se Siente Obligada a Devolver',
    },
    {
            type: 'paragraph',
      text: 'When someone gives us something, we feel a psychological pull to return the favor. It\'s hardwired into human social behavior. On your floor, this principle is activated constantly:',
      textEs: 'Cuando alguien nos da algo, sentimos un impulso psicológico a devolver el favor. Está grabado en nuestro comportamiento social humano. En tu piso, este principio se activa constantemente:',
    },
    {
            type: 'bullets',
      items: [
        'THE FREE SAMPLE: When you give someone a hand massage with the scrub or buff their nail, you\'ve given them something of value. They now feel a subtle obligation to reciprocate — by listening to your pitch, considering your offer, or making a purchase.',
        'YOUR TIME AND ATTENTION: When you spend 5 minutes explaining, demonstrating, and educating, you\'ve invested in them. Most people feel uncomfortable walking away after someone has invested energy in them.',
        'THE COMPLIMENT: A genuine compliment (\'I love your jacket\') is a small gift. It creates warmth and openness because the person feels you\'ve given them something positive.'
      ],
      itemsEs: [
          'LA MUESTRA GRATIS: Cuando le das a alguien un masaje de manos con el exfoliante o le pulis la uña, le has dado algo de valor. Ahora sienten una obligación sutil a reciprocar — escuchando tu presentación, considerando tu oferta o haciendo una compra.',
          'TU TIEMPO Y ATENCIÓN: Cuando pasas 5 minutos explicando, demostrando y educando, has invertido en ellos. La mayoría de las personas se sienten incómodas yéndose después de que alguien ha invertido energía en ellos.',
          'EL CUMPLIDO: Un cumplido genuino (\'me encanta tu chamarra\') es un pequeño regalo. Crea calidez y apertura porque la persona siente que le has dado algo positivo.',
        ],
    },
    {
            type: 'script',
      text: '\'Let me give you a small gift — this hand treatment takes just one minute and you\'ll feel the difference immediately.\' By framing it as a GIFT, you activate reciprocity before the demo even begins.',
      textEs: '\'Déjame darte un pequeño regalo — este tratamiento de manos toma solo un minuto y sentirás la diferencia de inmediato.\' Al presentarlo como un REGALO, activas la reciprocidad antes de que la demostración siquiera comience.',
    },
    {
            type: 'tip',
      text: 'The key to ethical reciprocity: give GENUINE value first. A fake compliment or a rushed demo doesn\'t create reciprocity — it creates distrust. Invest real time and energy, and the principle works naturally.',
      textEs: 'La clave de la reciprocidad ética: da valor GENUINO primero. Un cumplido falso o una demostración apresurada no crean reciprocidad — crean desconfianza. Invierte tiempo y energía reales, y el principio funciona naturalmente.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '2. Scarcity — We Want What Is Rare',
      textEs: '2. Escasez — Queremos Lo Que Es Raro',
    },
    {
            type: 'paragraph',
      text: 'Opportunities seem more valuable when their availability is limited. This is why \'limited edition\' products, flash sales, and countdown timers are so effective. On your floor, scarcity is built into your location:',
      textEs: 'Las oportunidades parecen más valiosas cuando su disponibilidad es limitada. Por eso los productos \'edición limitada\', las ventas flash y los temporizadores de cuenta regresiva son tan efectivos. En tu piso, la escasez está integrada en tu ubicación:',
    },
    {
            type: 'bullets',
      items: [
        'THE PRICE GAP: \'Around Europe this is {currency}500, but here in {locationName}, it\'s only {currency}300.\' The scarcity of that {currency}300 price creates urgency — they can\'t get it at home.',
        'SEASONAL OFFERS: \'This Christmas offer ends soon, and I\'d hate for you to miss it.\' Time-limited scarcity pushes decision-making.',
        'LIMITED STOCK: \'I only have two samples left\' or \'These sell out every weekend.\' Physical scarcity increases perceived value.',
        'THE VOUCHER CLOSE: \'I can only do this once, just for you.\' Personal scarcity — a unique opportunity that won\'t repeat.'
      ],
      itemsEs: [
          'LA DIFERENCIA DE PRECIO: \'En toda Europa esto cuesta {currency}500, pero aquí en {locationName}, cuesta solo {currency}300.\' La escasez de ese precio de {currency}300 crea urgencia — no pueden conseguirlo en su país.',
          'OFERTAS DE TEMPORADA: \'Esta oferta de Navidad termina pronto, y odiaría que te la pierdas.\' La escasez de tiempo limitado empuja la toma de decisiones.',
          'STOCK LIMITADO: \'Solo me quedan dos muestras\' o \'Estos se agotan cada fin de semana.\' La escasez física aumenta el valor percibido.',
          'EL CIERRE CON CUPÓN: \'Solo puedo hacer esto una vez, solo para ti.\' Escasez personal — una oportunidad única que no se repetirá.',
        ],
    },
    {
            type: 'comparison',
      left: { label: 'Weak Scarcity', text: '\'You should buy this while you\'re here.\' Vague, generic, no specific reason to act now. Customers ignore it.' },
      leftEs: { label: 'Escasez Débil', text: '\'Deberías comprar esto mientras estás aquí.\' Vago, genérico, sin razón específica para actuar ahora. Los clientes lo ignoran.' },
      right: { label: 'Strong Scarcity', text: '\'This price only exists in {locationName}. When you cross the border, it goes back to {currency}500. That\'s a {currency}200 savings you only get today, right here.\' Specific, verifiable, personal.' },
      rightEs: { label: 'Escasez Fuerte', text: '\'Este precio solo existe en {locationName}. En cuanto cruzas la frontera, vuelve a {currency}500. Son {currency}200 de ahorro que solo consigues hoy, aquí mismo.\' Concreto, comprobable, personal.' }
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '3. Authority — We Trust Experts',
      textEs: '3. Autoridad — Confiamos en los Expertos',
    },
    {
            type: 'paragraph',
      text: 'People listen to whoever clearly knows what they are doing. Authority on a kiosk is not a certificate on the wall — it is volume and hands. You have done this a hundred times today and it shows in how you hold their wrist. Authority is built through:',
      textEs: 'La gente escucha a quien se ve claramente que sabe lo que hace. La autoridad en un puesto de calle no es un título en la pared — son volumen y manos. Hoy has hecho esto cien veces y se te nota en cómo les coges la muñeca. La autoridad se construye con:',
    },
    {
            type: 'bullets',
      items: [
        'KNOWLEDGE: Knowing what is in it without having to check. \'This is Dead Sea mineral salt — lowest place on Earth, highest mineral concentration there is.\'',
        'CONFIDENT DELIVERY: Experts don\'t hesitate. They don\'t say \'um\' and \'I think.\' They state facts clearly: \'This is our #1 seller across Europe.\'',
        'VISUAL CREDIBILITY: Looking professional, well-groomed, and polished. Your appearance IS your authority signal.',
        'SOCIAL PROOF: \'I\'ve done this demo over 20 times today, and the reaction is always the same.\' Your experience IS authority.'
      ],
      itemsEs: [
          'CONOCIMIENTO: Saberte lo que lleva sin tener que mirarlo. \'Esto es sal mineral del Mar Muerto — el sitio más bajo de la Tierra, la mayor concentración de minerales que hay.\'',
          'ENTREGA CON CONFIANZA: Los expertos no dudan. No dicen \'emmm\' ni \'yo creo\'. Enuncian hechos con claridad: \'Este es nuestro producto #1 en toda Europa.\'',
          'CREDIBILIDAD VISUAL: Verse profesional, bien arreglado y pulido. Tu apariencia ES tu señal de autoridad.',
          'PRUEBA SOCIAL: \'He hecho esta demostración más de 20 veces hoy, y la reacción siempre es la misma.\' Tu experiencia ES autoridad.',
        ],
    },
    {
            type: 'script',
      text: '\'I have done this on about forty faces today. I know exactly how it goes on skin like yours.\' That is your authority, and nobody can argue with it — it happened, they watched you do it, and it is nobody\'s opinion but your own hands.',
      textEs: '\'Hoy lo he hecho en unas cuarenta caras. Sé exactamente cómo queda en una piel como la tuya.\' Esa es tu autoridad, y no hay quien la discuta — ha pasado, te han visto hacerlo, y no es la opinión de nadie más que de tus propias manos.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '4. Consistency — People Want to Act in Alignment',
      textEs: '4. Consistencia — La Gente Quiere Actuar en Concordancia',
    },
    {
            type: 'paragraph',
      text: 'Once people commit to something, they want to act in ways that are consistent with that commitment. Small initial agreements lead to larger ones. This is incredibly powerful on the sales floor:',
      textEs: 'Una vez que las personas se comprometen con algo, quieren actuar de manera consistente con ese compromiso. Los acuerdos iniciales pequeños llevan a acuerdos mayores. Esto es increíblemente poderoso en el piso de ventas:',
    },
    {
            type: 'bullets',
      items: [
        'THE AGREEMENT FRAME: \'You take care of your skin, right?\' They say yes. Now they\'ve committed to the identity of someone who cares about skincare. Buying becomes consistent with that identity.',
        'THE SMALL YES: \'Can I show you something quickly?\' Small agreement. Then: \'Can I try this on your hand?\' Another small agreement. Each yes makes the next yes more likely.',
        'SELF-IMAGE CONSISTENCY: When someone says \'I believe in investing in quality,\' they\'ve created a standard for themselves. Passing on a high-quality product would be inconsistent with that self-image.'
      ],
      itemsEs: [
          'EL MARCO DE ACUERDO: \'Tú cuidas tu piel, ¿o no?\' Dicen que sí. Ahora se han comprometido con la identidad de alguien que se preocupa por el cuidado de la piel. Comprar se vuelve consistente con esa identidad.',
          'EL PEQUEÑO SÍ: \'¿Te muestro algo rápido?\' Pequeño acuerdo. Luego: \'¿Puedo probarte esto en la mano?\' Otro pequeño acuerdo. Cada sí hace que el siguiente sí sea más probable.',
          'CONSISTENCIA DE AUTOIMAGEN: Cuando alguien dice \'creo en invertir en calidad\', ha creado un estándar para sí mismo. Dejar pasar un producto de alta calidad sería inconsistente con esa autoimagen.',
        ],
    },
    {
            type: 'tip',
      text: 'Get small agreements early. \'You have amazing skin — you clearly take care of yourself, right?\' When they agree, they\'ve anchored their identity as a skincare-conscious person. Everything that follows should reinforce that identity.',
      textEs: 'Obtén acuerdos pequeños temprano. \'Tienes una piel increíble — claramente te cuidas, ¿o no?\' Cuando aceptan, han anclado su identidad como una persona consciente del cuidado de la piel. Todo lo que sigue debe reforzar esa identidad.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '5. Liking — We Say Yes to People We Like',
      textEs: '5. Simpatía — Decimos Sí a las Personas que Nos Gustan',
    },
    {
            type: 'paragraph',
      text: 'This seems obvious, but it\'s profound. People buy from people they like, trust, and feel connected to. Liking is built through:',
      textEs: 'Parece obvio, pero es profundo. La gente compra a personas que les gustan, en quienes confían y con quienes se sienten conectados. La simpatía se construye a través de:',
    },
    {
            type: 'bullets',
      items: [
        'SIMILARITY: \'Oh, you\'re from Barcelona? I love it there!\' Shared backgrounds, interests, or experiences create instant rapport.',
        'COMPLIMENTS: Genuine, specific compliments make people feel seen and appreciated. \'That scarf is beautiful — is it from a local designer?\'',
        'COOPERATION: Working together on the demo (\'Rub this in gently\') creates a sense of teamwork. You\'re not seller and buyer — you\'re collaborators.',
        'POSITIVE ENERGY: Smiling, warmth, humor — these make you likable. People don\'t buy from grumpy salespeople, even if the product is great.'
      ],
      itemsEs: [
          'SIMILITUD: \'Oh, ¾res de Barcelona? Me encanta ese lugar!\' Los antecedentes, intereses o experiencias compartidos crean conexión instantánea.',
          'CUMPLIDOS: Los cumplidos genuinos y específicos hacen que la gente se sienta vista y apreciada. \'Esa bufanda es hermosa — ¿es de un diseñador local?\'',
          'COOPERACIÓN: Trabajar juntos en la demostración (\'Frota esto suavemente\') crea un sentido de trabajo en equipo. No son vendedor y comprador — son colaboradores.',
          'ENERGÍA POSITIVA: Sonreír, calidez, humor — esto te hace agradable. La gente no compra a vendedores gruñones, aunque el producto sea excelente.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '6. Consensus — We Follow What Others Do',
      textEs: '6. Consenso — Seguimos Lo Que Hacen los Demás',
    },
    {
            type: 'paragraph',
      text: 'When uncertain, people look to what others are doing. Social proof is one of the most powerful persuasion tools:',
      textEs: 'Cuando hay incertidumbre, la gente observa lo que otros están haciendo. La prueba social es una de las herramientas de persuasión más poderosas:',
    },
    {
            type: 'bullets',
      items: [
        'POPULARITY: \'This is our #1 best-seller.\' If everyone else is buying it, it must be good.',
        'TESTIMONIALS: \'My customer from last week texted me saying her husband noticed the difference immediately.\' Real stories are more powerful than statistics.',
        'VISIBLE DEMAND: When customers see other customers in the shop being served, it validates the shop\'s credibility. A busy shop is an attractive shop.',
        '\'ALREADY BOUGHT\' SIGNAL: \'Most people who try the demo end up taking at least the Scrub. It\'s hard to resist once you feel it.\' This normalizes buying as the expected outcome.'
      ],
      itemsEs: [
          'POPULARIDAD: \'Este es nuestro producto #1 más vendido.\' Si todos los demás lo compran, debe ser bueno.',
          'TESTIMONIOS: \'Mi cliente de la semana pasada me mandó un mensaje diciendo que su esposo notó la diferencia de inmediato.\' Las historias reales son más poderosas que las estadísticas.',
          'DEMANDA VISIBLE: Cuando los clientes ven a otros clientes siendo atendidos en la tienda, valida la credibilidad de la tienda. Una tienda ocupada es una tienda atractiva.',
          'SEÑAL DE \'YA COMPRADO\': \'La mayoría de las personas que prueban la demostración terminan llevándose al menos el Exfoliante. Es difícil resistirse una vez que lo sientes.\' Esto normaliza comprar como el resultado esperado.',
        ],
    },
    {
            type: 'script',
      text: '\'I did this demo for a woman earlier who said she\'d \'think about it.\' She came back an hour later and bought two. Once you feel the difference, it stays with you.\' This story creates social proof AND plants the seed that they might come back too.',
      textEs: '\'Le hice esta demostración a una mujer hace rato que dijo que lo \'pensaría\'. Volvió una hora después y compró dos. Una vez que sientes la diferencia, se queda contigo.\' Esta historia crea prueba social Y planta la semilla de que ellos también podrían volver.',
    },
    {
            type: 'quote',
      text: 'Understanding these six principles transforms selling from a battle of wills into a dance of psychology. You\'re not fighting the customer — you\'re guiding them through a decision-making process that feels natural and comfortable.',
      textEs: 'Entender estos seis principios transforma la venta de una batalla de voluntades en una danza de psicología. No estás luchando contra el cliente — lo estás guiando a través de un proceso de toma de decisiones que se siente natural y cómodo.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'Which Cialdini principle is activated when you give a customer a free hand massage before pitching?',
      options: [
        'Scarcity',
        'Authority',
        'Reciprocity',
        'Consensus'
      ],
      correctIndex: 2,
      explanation: 'Reciprocity is the principle that people feel obliged to give back when they receive something. A free hand massage is a gift that creates a psychological pull to reciprocate by listening to your pitch or making a purchase.',
    },
    {
      question: 'How does the {locationName} price activate the scarcity principle?',
      options: [
        'It makes the product seem rare and hard to find in any other shop',
        'It is a price that only exists in {locationName}, nowhere else',
        'It makes customers feel special',
        'It creates time pressure'
      ],
      correctIndex: 1,
      explanation: 'The {currency}300 price only exists in {locationName} — back home the same product is {currency}500. Customers cannot get this price once they cross the border, making the opportunity geographically limited and rare.',
    },
    {
      question: 'Why is getting a small \'yes\' early in the interaction powerful?',
      options: [
        'It tricks the customer',
        'It activates consistency — people want to act in alignment with their commitments',
        'It\'s just a nice way to start',
        'It shows you\'re in control'
      ],
      correctIndex: 1,
      explanation: 'The principle of consistency means that once people commit to something (even a small yes), they want to act in alignment with that commitment. Small initial agreements make larger agreements more likely.',
    }
    ],
  },
  'psych-8': {
    id: 'psych-8',
    categoryId: 'psychology',
    title: 'Developing Your Sales Intuition',
    titleEs: 'Desarrollando tu Intuición de Ventas',
    subtitle: 'How experience becomes instinct. Pattern recognition. Reading micro-signals.',
    subtitleEs: 'Aprende a leer clientes como un libro',
    duration: '10 min',
    icon: 'Compass',
    order: 8,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'From Thinking to Knowing: The Path to Sales Instinct',
      textEs: 'Del Pensamiento al Conocimiento: El Camino al Instinto de Ventas',
    },
    {
            type: 'paragraph',
      text: 'Watch a master salesperson work, and it looks like magic. They seem to just KNOW who will buy, when to push, when to back off, what to say. But it\'s not magic — it\'s pattern recognition developed through hundreds of interactions. Every customer you\'ve ever stopped has taught you something. The question is: are you paying attention?',
      textEs: 'Observa a un vendedor maestro trabajar, y parece magia. Parece que simplemente SABEN quién comprará, cuándo presionar, cuándo retroceder, qué decir. Pero no es magia — es reconocimiento de patrones desarrollado a través de cientos de interacciones. Cada cliente que alguna vez detuviste te ha enseñado algo. La pregunta es: ¿estás prestando atención?',
    },
    {
            type: 'keypoint',
      text: 'Sales intuition is the ability to read a situation and know the right move without consciously thinking through it. It comes from deliberate practice + active reflection on every interaction.',
      textEs: 'La intuición de ventas es la capacidad de leer una situación y saber el movimiento correcto sin pensarlo conscientemente. Viene de la práctica deliberada + la reflexión activa sobre cada interacción.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'How Experience Becomes Instinct',
      textEs: 'Cómo la Experiencia se Convierte en Instinto',
    },
    {
            type: 'paragraph',
      text: 'Your brain is a pattern-recognition machine. When you encounter a situation repeatedly, your brain starts building mental models. Over time, these models become so ingrained that you recognize patterns instantly, without conscious thought. This is how a chess grandmaster \'sees\' the right move in seconds, or how a doctor \'feels\' a diagnosis before the tests come back.',
      textEs: 'Tu cerebro es una máquina de reconocimiento de patrones. Cuando encuentras una situación repetidamente, tu cerebro empieza a construir modelos mentales. Con el tiempo, estos modelos se vuelven tan arraigados que reconoces patrones instantáneamente, sin pensamiento consciente. Así es como un gran maestro de ajedrez \'ve\' la jugada correcta en segundos, o cómo un doctor \'siente\' un diagnóstico antes de que lleguen los resultados.',
    },
    {
            type: 'numbered',
      items: [
        'STAGE 1 — CONSCIOUS INCOMPETENCE: You\'re new. You don\'t know what you don\'t know. Every interaction requires intense focus. You think through every word.',
        'STAGE 2 — CONSCIOUS COMPETENCE: You\'ve had enough interactions to start seeing patterns. You can read some customers, but it still takes effort. You\'re thinking AND doing.',
        'STAGE 3 — UNCONSCIOUS COMPETENCE: The magic stage. Patterns jump out at you. You just KNOW. Your body moves before your brain decides. This is where top sellers live.',
        'STAGE 4 — MASTERY: Not only do you intuitively read situations, but you can ALSO explain your intuition to others. You can teach. This is the level of a true sales leader.'
      ],
      itemsEs: [
          'ETAPA 1 — INCOMPETENCIA CONSCIENTE: Eres nuevo. No sabes lo que no sabes. Cada interacción requiere enfoque intenso. Piensas cada palabra.',
          'ETAPA 2 — COMPETENCIA CONSCIENTE: Has tenido suficientes interacciones para empezar a ver patrones. Puedes leer a algunos clientes, pero aún requiere esfuerzo. Estás pensando Y haciendo.',
          'ETAPA 3 — COMPETENCIA INCONSCIENTE: La etapa mágica. Los patrones saltan a la vista. Simplemente SABES. Tu cuerpo se mueve antes de que tu cerebro decida. Aquí es donde viven los mejores vendedores.',
          'ETAPA 4 — MAESTRÍA: No solo lees las situaciones intuitivamente, sino que TAMBIÉN puedes explicar tu intuición a otros. Puedes enseñar. Este es el nivel de un verdadero líder de ventas.',
        ],
    },
    {
            type: 'tip',
      text: 'Most salespeople reach Stage 2 and stop growing. They get good enough to make money and plateau. The ones who reach Stage 3 and 4 are those who actively reflect on every interaction, seeking patterns rather than just counting wins.',
      textEs: 'La mayoría de los vendedores llegan a la Etapa 2 y dejan de crecer. Se vuelven lo suficientemente buenos para ganar dinero y se estancan. Los que llegan a la Etapa 3 y 4 son quienes reflexionan activamente sobre cada interacción, buscando patrones en lugar de solo contar victorias.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Building Pattern Recognition Deliberately',
      textEs: 'Construyendo el Reconocimiento de Patrones de Forma Deliberada',
    },
    {
            type: 'paragraph',
      text: 'Intuition isn\'t just \'experience\' — it\'s EXPERIENCE THAT YOU\'VE PROCESSED. Here\'s how to accelerate the process:',
      textEs: 'La intuición no es solo \'experiencia\' — es EXPERIENCIA QUE HAS PROCESADO. Aquí te decimos cómo acelerar el proceso:',
    },
    {
            type: 'bullets',
      items: [
        'THE AFTER-ACTION REVIEW: After every interaction — yes OR no — ask yourself three questions: What did I notice about this person? What did I do? What was the result? Write it down. This forces your brain to process patterns.',
        'THE ONE THAT GOT AWAY: At the end of the shift, write down two — the one that got away and the one that landed. Not their age, not what they were wearing. The moment. The exact second she went from \'no thanks\' to laughing, or the exact second you lost her. That is the only bit worth keeping.',
        'STUDY YOUR WINS FOR WHAT YOU DID, NOT WHO THEY WERE: not couples, not luxury bags, not an age range. The line you opened with. The second you shut up. The moment you put the mirror in her hand. Those are the bits you can do again tomorrow — you cannot order in more forty-year-olds.',
        'STUDY YOUR LOSSES THE SAME WAY: again, what YOU did. Wrong words, skipped step, filled the silence, went lazy halfway, stopped early on the ladder. If the honest answer is none of those, then that one was not on you. What this will never give you is a profile of the person who was never going to pay — nobody can see that from the outside, and the sellers who think they can are the ones talking themselves out of the next demo.'
      ],
      itemsEs: [
          'LA REVISIÓN POST-ACCIÓN: Después de cada interacción — sí O no — hazte tres preguntas: ¿Qué noté de esta persona? ¿Qué hice? ¿Cuál fue el resultado? Escríbelo. Esto obliga a tu cerebro a procesar patrones.',
          'LA QUE SE TE ESCAPÓ: Al final del turno apunta dos — la que se te escapó y la que entró. Ni la edad, ni la ropa. El momento. El segundo exacto en que pasó de \'no, gracias\' a reírse, o el segundo exacto en que la perdiste. Eso es lo único que merece la pena guardar.',
          'ESTUDIA TUS VICTORIAS POR LO QUE HICISTE TÚ, NO POR QUIÉNES ERAN: ni parejas, ni bolsas de lujo, ni una franja de edad. La frase con la que abriste. El segundo en que te callaste. El momento en que le pusiste el espejo en la mano. Eso es lo que puedes repetir mañana — no puedes encargar más gente de cuarenta años.',
          'ESTUDIA TUS DERROTAS IGUAL: otra vez, lo que hiciste TÚ. Palabras equivocadas, un paso saltado, llenaste el silencio, te relajaste a mitad, te paraste pronto en la escalera. Si la respuesta honesta es que ninguna, esa no iba contigo. Lo que esto no te va a dar nunca es el retrato del cliente que no iba a pagar jamás — eso no se ve desde fuera, y los vendedores que creen que sí son los que se están quitando de encima la siguiente demo.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Watch Her Hands, Not Her Mouth',
      textEs: 'Mírale las Manos, No la Boca',
    },
    {
            type: 'paragraph',
      text: 'People tell you what they have decided long before they say it, and almost never with words. Four tells, and you can catch all four while you are still talking:',
      textEs: 'La gente te dice lo que ha decidido mucho antes de decirlo, y casi nunca con palabras. Cuatro señales, y las pillas todas mientras sigues hablando:',
    },
    {
            type: 'bullets',
      items: [
        'SHE HASN\'T STOPPED TOUCHING HER OWN HANDS: Or the spot you treated, or the mirror. She is already yours. You just have not said the number yet.',
        'SHE ASKS THE PRICE BEFORE YOU OFFER IT: That is not a question. That is a yes with a price attached. Answer it straight away and go to the two options.',
        'THE ARMS FOLD THE SECOND YOU SAY THE NUMBER: That is the price, not the product. Do not explain the product again — go down a rung and put something in the bag.',
        'THE PHONE COMES OUT TWICE: you have lost the room, not the sale. Stop talking, put something in her hand, and ask her a question she has to look up to answer. What it is not is your cue to open the door for her — she came in, she is still sitting there, and a phone is a habit, not a verdict.'
      ],
      itemsEs: [
          'NO HA PARADO DE TOCARSE LAS MANOS: O la zona que le has tratado, o el espejo. Ya es tuya. Lo único que falta es que digas el número.',
          'TE PREGUNTA EL PRECIO ANTES DE QUE SE LO DIGAS: Eso no es una pregunta. Es un sí con un precio pegado. Contéstale al momento y ve a las dos opciones.',
          'SE CRUZA DE BRAZOS EN CUANTO DICES EL NÚMERO: Es el precio, no el producto. No le vuelvas a explicar el producto — baja un escalón y mete algo en la bolsa.',
          'SACA EL MÓVIL DOS VECES: has perdido la sala, no la venta. Cállate, ponle algo en la mano y hazle una pregunta que le obligue a levantar la vista. Lo que no es, es tu señal para abrirle la puerta — ha entrado, sigue ahí sentada, y un móvil es una costumbre, no un veredicto.',
        ],
    },
    {
            type: 'tip',
      text: 'Do not try to watch all four at once. Take the hands first — it is the easiest one to see and the one that tells you the most. Once you catch that without thinking about it, add the next.',
      textEs: 'No intentes fijarte en las cuatro a la vez. Empieza por las manos — es la más fácil de ver y la que más te dice. Cuando la pilles sin pensarlo, añade la siguiente.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When to Push and When to Back Off',
      textEs: 'Cuándo Presionar y Cuándo Retroceder',
    },
    {
            type: 'paragraph',
      text: 'This is the million-euro question. The answer lies in reading the customer\'s buying temperature:',
      textEs: 'Esta es la pregunta del millón de euros. La respuesta está en leer la temperatura de compra del cliente:',
    },
    {
            type: 'numbered',
      items: [
        'GREEN LIGHTS (PUSH): Leaning in, touching the product, asking unprompted questions about usage or price, involving their partner positively, smiling with genuine eye crinkles, touching their face while looking at the product. These customers are warm — close with confidence.',
        'YELLOW LIGHTS (GENTLE): Hesitant questions, looking at partner for approval, saying \'it\'s nice but...\', touching the product but not committing. These customers need reassurance, not pressure. Use emotional connection and logic together.',
        'RED LIGHTS (BACK OFF): Crossed arms after price, stepping back, checking phone repeatedly, flat responses, looking around for exit, partner shaking head subtly. She is not saying no, she is saying not at that number. Stop selling the product and start moving the price: drop your voice, take something out, give her a reason. Crossed arms after a price is the ladder asking to be walked, not a customer asking to leave.'
      ],
      itemsEs: [
          'LUCES VERDES (PRESIONA): Inclinarse hacia adelante, tocar el producto, hacer preguntas espontáneas sobre uso o precio, involucrar positivamente a su pareja, sonreír con arrugas genuinas alrededor de los ojos, tocarse la cara mientras miran el producto. Estos clientes están calientes — cierra con confianza.',
          'LUCES AMARILLAS (SUAVE): Preguntas vacilantes, mirar a la pareja para aprobación, decir \'está bonito pero...\', tocar el producto pero no comprometerse. Estos clientes necesitan tranquilidad, no presión. Usa la conexión emocional y la lógica juntas.',
          'LUCES ROJAS (RETROCEDE): Brazos cruzados después del precio, dar un paso atrás, revisar el teléfono repetidamente, respuestas planas, buscando la salida, pareja moviendo la cabeza sutilmente. No está diciendo que no, está diciendo que a ese número no. Deja de vender el producto y empieza a mover el precio: baja la voz, quita algo, dale un motivo. Los brazos cruzados después de un precio son la escalera pidiendo que la bajes, no una clienta pidiendo irse.',
        ],
    },
    {
            type: 'script',
      text: '\'I can see you\'re thinking about it — so tell me what about. You told me you like it. You told me you\'d use it. So it\'s the price, my love. Say the number out loud and let me see what I can do.\' Read the signals, absolutely — but read them so you know which line to reach for, not so you know when to open the door for her.',
      textEs: '\'Veo que lo estás pensando — pues dime en qué. Me has dicho que te gusta. Me has dicho que lo usarías. Entonces es el precio, cariño. Dime tú el número en voz alta y a ver qué puedo hacer.\' Lee las señales, por supuesto — pero léelas para saber qué frase sacar, no para saber cuándo abrirle la puerta.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Learning from Every Interaction',
      textEs: 'Aprendiendo de Cada Interacción',
    },
    {
            type: 'paragraph',
      text: 'The fastest way to develop intuition is to extract a lesson from EVERY customer — even the ones who ignore you completely:',
      textEs: 'La forma más rápida de desarrollar intuición es extraer una lección de CADA cliente — incluso de los que te ignoran por completo:',
    },
    {
            type: 'bullets',
      items: [
        'THE IGNORE: \'They never even looked up.\' → Lesson: the line went out too late, or too quietly, or you were looking at your own shoes when it did. Fix the bit you control. What it is not is proof they were the wrong person to stop — you have no idea who they were, and neither does anybody else.',
        'THE \'NO THANKS\': \'They smiled but kept walking. Good energy but bad timing.\' → Lesson: My approach was warm but they\'re in a rush. Speed up the opener next time.',
        'THE DEMO, NO BUY: \'They loved the nail kit demo but said it was too expensive even at {currency}30.\' → Lesson: Either a price objection to work through, or genuinely no budget. Note the signals for future reference.',
        'THE CLOSE: \'They bought the syringe after I involved the husband in the demo.\' → Lesson: Partner engagement was the key factor. Replicate that approach with couples.'
      ],
      itemsEs: [
          'EL QUE IGNORA: "Ni levantó la vista." → Lección: la frase salió tarde, o floja, o estabas mirándote los zapatos cuando salió. Arregla la parte que controlas tú. Lo que no es, es la prueba de que no había que pararlos — no tienes ni idea de quiénes eran, y nadie la tiene.',
          'EL \'NO GRACIAS\': \'Sonrieron pero siguieron caminando. Buena energía pero mal timing.\' → Lección: Mi acercamiento fue cálido pero están con prisa. Acelera el acercamiento la próxima vez.',
          'LA DEMO, SIN COMPRA: \'Les encantó la demostración del kit de uñas pero dijeron que era muy caro incluso a {currency}30.\' → Lección: O es una objeción de precio para trabajar, o genuinamente no tienen presupuesto. Toma nota de las señales para referencia futura.',
          'EL CIERRE: \'Compraron la jeringa después de involucrar al esposo en la demostración.\' → Lección: El compromiso de la pareja fue el factor clave. Replica ese acercamiento con parejas.',
        ],
    },
    {
            type: 'tip',
      text: 'At the end of each day, write down the ONE most important lesson you learned. Just one sentence. After 6 months, you\'ll have 180 lessons. That\'s more accumulated wisdom than most salespeople acquire in years.',
      textEs: 'Al final de cada día, escribe la lección más importante que aprendiste. Solo una oración. Después de 6 meses, tendrás 180 lecciones. Eso es más sabiduría acumulada que la mayoría de los vendedores adquiere en años.',
    },
    {
            type: 'quote',
      text: 'Intuition is not magic. It is pattern recognition that has been practiced until it becomes automatic. Every customer is a teacher — if you\'re willing to learn.',
      textEs: 'La intuición no es magia. Es reconocimiento de patrones que se ha practicado hasta volverse automático. Cada cliente es un maestro — si estás dispuesto a aprender.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    /* No inline quiz. LESSON_QUIZZES['psych-8'] OVERLAYS whatever sits here, so
       this was unreachable code — and the third graded "understand the patterns
       of who won't buy" as the point of reviewing a loss. The owner's answer to
       how a seller is meant to spot that customer is that they cannot, so the
       review is now about what the SELLER did. The live copy of that question is
       still in lessonQuizzes.ts. */
  },
  'stop-1': {
    id: 'stop-1',
    categoryId: 'stopping',
    title: 'The First Sequence',
    titleEs: 'La Primera Secuencia',
    subtitle: 'Stood ready, get the look, close the gap, the gift, turn and walk, and sit them down — the order everything else is built on',
    subtitleEs: 'Colocado, consigue la mirada, acorta la distancia, el regalo, date la vuelta y anda, y siéntalos — el orden sobre el que se construye todo lo demás',
    duration: '12 min',
    icon: 'Target',
    order: 1,
    xpReward: 100,
    sections: [
      {
        type: 'header',
        text: 'The basics of the basics',
        textEs: 'Lo básico de lo básico',
      },
      {
        type: 'paragraph',
        text: `This is the first thing you learn and the last thing you stop using. It is one move from start to finish: you are stood ready, you get their attention while they are still walking, they look, you go, you give them a reason to follow you, and you walk in. Every other lesson in this app — the compliments, the demo, the ladder, the objections — is built on top of this one. Learn it in order and the rest has somewhere to sit. Skip it and you are just a person talking on a walkway.`,
        textEs: `Esto es lo primero que aprendes y lo último que dejas de usar. Es un solo movimiento de principio a fin: estás colocado, les llamas la atención mientras todavía andan, te miran, vas, les das un motivo para seguirte, y entras. Todo lo demás en esta app — los cumplidos, la demo, la escalera, las objeciones — se construye encima de esto. Apréndetelo en orden y el resto tiene dónde apoyarse. Sáltatelo y solo eres alguien hablando en medio del pasillo.`,
      },
      {
        type: 'keypoint',
        text: `The whole technique is an order of operations. Do the steps in the wrong order and each one stops working.`,
        textEs: `Toda la técnica es un orden de operaciones. Haz los pasos en el orden equivocado y cada uno deja de funcionar.`,
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'Step 1 — Be stood ready before anybody is near you',
        textEs: 'Paso 1 — Estate colocado antes de que nadie se acerque',
      },
      {
        type: 'paragraph',
        text: `None of the rest works if you are flat against the wall with your hands in your pockets. Before anybody is in range you want to be somewhere they can see you, with the sample already in your hand, and the way past you clear.`,
        textEs: `Nada de lo demás funciona si estás pegado a la pared con las manos en los bolsillos. Antes de que nadie esté a tiro tienes que estar donde te vean, con la muestra ya en la mano, y el paso libre.`,
      },
      {
        type: 'bullets',
        items: [
          'WHERE THEY CAN SEE YOU: Out in front of the kiosk, not tucked against the wall. If they have to find you, you have already lost the first second.',
          'SAMPLE ALREADY IN YOUR HAND: Loaded before you need it, every time. You do not want to be rummaging for it while the one you wanted walks past.',
          'NOT IN THE DOORWAY: Beside the entrance, never filling it. A person who has to squeeze past you has already decided something about you.',
          'HANDS DOING SOMETHING: Holding the sample, sorting the stand, moving. Hands in pockets reads as bored, and bored is invisible.',
        ],
        itemsEs: [
          'DONDE TE VEAN: Delante del kiosco, no metido contra la pared. Si te tienen que buscar, ya has perdido el primer segundo.',
          'LA MUESTRA YA EN LA MANO: Lista antes de que haga falta, siempre. No quieres estar rebuscándola mientras la que te interesaba te pasa de largo.',
          'NO EN LA PUERTA: Al lado de la entrada, nunca tapándola. Quien tiene que colarse por un hueco para pasar ya ha decidido algo sobre ti.',
          'LAS MANOS HACIENDO ALGO: Sujeta la muestra, coloca el expositor, muévete. Las manos en los bolsillos se leen como aburrimiento, y el aburrimiento es invisible.',
        ],
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'Step 2 — Get their attention from four or five metres',
        textEs: 'Paso 2 — Llámales la atención a cuatro o cinco metros',
      },
      {
        type: 'paragraph',
        text: `Before you approach anybody with the sample, get their attention. You want them looking at you BEFORE you take a single step. Not while you walk — before. And do it early, while they are still four or five metres off and still walking. Wait until they are a couple of metres away and you have left it too late: by the time they have registered you and turned their head they are already level with you, and then they are past you.`,
        textEs: `Antes de acercarte a nadie con la muestra, consigue su atención. Quieres que te estén mirando ANTES de dar un solo paso. No mientras andas — antes. Y hazlo pronto, cuando todavía están a cuatro o cinco metros y siguen andando. Si esperas a que estén a un par de metros, ya llegas tarde: para cuando te han visto y han girado la cabeza ya están a tu altura, y acto seguido te han pasado de largo.`,
      },
      {
        type: 'script',
        ...GREETING,
      },
      {
        type: 'paragraph',
        text: `A greeting or a compliment — either one does the job. What matters is that it goes out while they are still coming towards you, and that you stay exactly where you are while you say it. You do not move a foot yet. You are buying one thing with that sentence: their eyes.`,
        textEs: `Un saludo o un cumplido — cualquiera de los dos vale. Lo que importa es que salga mientras todavía vienen hacia ti, y que tú no te muevas del sitio al decirlo. Todavía no vas a ninguna parte. Con esa frase estás comprando una sola cosa: su mirada.`,
      },
      {
        type: 'bullets',
        items: [
          'EYES UP: They have to be able to catch your eye. A seller looking at their own shoes has given them nothing to look back at.',
          'SMILE WITH YOUR EYES: A second, maybe two, and warm. Long enough to be a person, not long enough to be a stare.',
          'IF THERE ARE TWO OF THEM, GREET BOTH: Do not lock onto one and leave the other one standing there bored. The bored one is the one who takes her away.',
          'READ WHAT COMES BACK: Eyes that come to yours, go. Eyes that slide off and keep going, let them go and get set for the next one — you have lost nothing, because you have not moved.',
        ],
        itemsEs: [
          'LA MIRADA ARRIBA: Tienen que poder cruzarla contigo. Un vendedor mirándose los zapatos no les ha dejado nada a lo que mirar.',
          'SONRÍE CON LOS OJOS: Un segundo, o dos, y con buen rollo. Lo justo para parecer una persona, no tanto como para quedarte clavado mirándola.',
          'SI VAN DOS, SALUDA A LOS DOS: No te enganches a una y dejes al otro ahí plantado aburriéndose. El aburrido es el que se la lleva.',
          'LEE LO QUE TE DEVUELVEN: Ojos que van a los tuyos, adelante. Ojos que se escurren y siguen, déjalos ir y prepárate para el siguiente — no has perdido nada, porque no te has movido.',
        ],
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'Step 3 — They look. Now you move.',
        textEs: 'Paso 3 — Te miran. Ahora te mueves.',
      },
      {
        type: 'paragraph',
        text: `If they look at you, now you raise the sample and start walking towards them. If they do not look, you have lost nothing — you did not commit. Walking at someone who has not looked at you is how you become a person to avoid.`,
        textEs: `Si te miran, ahora levantas la muestra y empiezas a andar hacia ellos. Si no te miran, no has perdido nada — no te has comprometido. Andar hacia alguien que no te ha mirado es cómo te conviertes en una persona a evitar.`,
      },
      {
        type: 'keypoint',
        text: `The 3-second rule: the look is the WHEN. From the moment their eyes come to you, you have about three seconds to be moving. Longer than that and it cools — they have filed you as shop staff and put the 'just looking' wall up before you get a second sentence out, and the pause gives your own hesitation time to grow. Three seconds is not a rush. It is just not a wobble.`,
        textEs: `La regla de los 3 segundos: la mirada es el CUÁNDO. Desde que sus ojos van a ti tienes unos tres segundos para estar ya en movimiento. Más de eso y se enfría — ya te han catalogado como personal de tienda y han levantado el muro del 'solo miro' antes de que te salga la segunda frase, y esa pausa le da tiempo a tu propia duda para crecer. Tres segundos no es ir con prisa. Es simplemente no dudar.`,
      },
      {
        type: 'keypoint',
        text: `And come at them a bit from the side. Not planted square in front of them, not up in their face, and never standing in the line they were walking. You want it to feel like somebody stepping in beside them for a second — not a checkpoint.`,
        textEs: `Y ve hacia ellos un poco de lado. No plantado enfrente, no encima de su cara, y nunca en la línea por la que iban andando. Quieres que parezca que alguien se pone a su lado un segundo — no un control policial.`,
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'Step 4 — The sample is a coin toss',
        textEs: 'Paso 4 — La muestra es cara o cruz',
      },
      {
        type: 'keypoint',
        text: `And when you do reach them, the sample itself is a coin toss — it does not matter which way it lands. They take it, lovely. They wave it away, nothing happens. You have not been rejected, because you never asked them for anything. Either way you are still stood in front of them and you carry straight on into the next step, exactly the same. Sellers lose people here by treating a refused sample as an answer. It is not an answer, it is a hand not moving.`,
        textEs: `Y cuando llegues a su altura, la muestra es cara o cruz — da igual de qué lado caiga. Si la cogen, genial. Si la apartan con la mano, no pasa nada. No te han rechazado, porque no les has pedido nada. En los dos casos sigues plantado delante de ellos y pasas al siguiente paso igual. Aquí es donde los vendedores pierden gente: se toman una muestra rechazada como una respuesta. No es una respuesta, es una mano que no se ha movido.`,
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'Step 5 — Say the rush before they can',
        textEs: 'Paso 5 — Di lo de la prisa antes que ellos',
      },
      {
        type: 'paragraph',
        text: `The single most common thing a person says to get away from you is "sorry, I'm in a rush." So say it first. Once it has come out of your mouth, it is no longer available as an escape — they cannot use a reason you have already accepted.`,
        textEs: `Lo que más dice la gente para escaparse de ti es "perdona, voy con prisa". Así que dilo tú primero. Una vez que ha salido de tu boca, ya no les sirve de escape — no pueden usar una razón que tú ya has aceptado.`,
      },
      {
        type: 'script',
        ...THE_RUSH_AND_THE_QUESTION,
      },
      {
        type: 'paragraph',
        text: `Two things are doing work in that sentence. The rush is pre-killed. And the question is a genuine compliment that they have to answer with a real answer — you cannot say yes or no to "what do you use?".`,
        textEs: `Hay dos cosas trabajando en esa frase. La prisa está desactivada. Y la pregunta es un cumplido de verdad que les obliga a dar una respuesta real — a "¿qué usas?" no puedes contestar sí o no.`,
      },
      {
        type: 'keypoint',
        text: `This line runs whether they took the sample or not. Took it, waved it away, did not even look at it — same words, same warmth, same second. The sample was never the point. It was the excuse to be stood in front of them saying this.`,
        textEs: `Esta frase va igual hayan cogido la muestra o no. La han cogido, la han apartado, ni la han mirado — las mismas palabras, el mismo buen rollo, el mismo segundo. La muestra nunca era el objetivo. Era la excusa para estar plantado delante de ellos diciendo esto.`,
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'Step 6 — Be impressed, whatever they say',
        textEs: 'Paso 6 — Que te impresione, digan lo que digan',
      },
      {
        type: 'paragraph',
        text: `Whatever they answer, you are impressed by it. A big brand, olive oil, a cream her sister brought back, nothing at all — it does not matter. You are not marking her homework, you are finding a bit of common ground and handing her three seconds of feeling good about herself.`,
        textEs: `Contesten lo que contesten, te parece impresionante. Una marca grande, aceite de oliva, una crema que le trajo su hermana, nada de nada — da igual. No le estás corrigiendo los deberes, estás buscando algo en común y regalándole tres segundos de sentirse bien.`,
      },
      {
        type: 'script',
        text: `"Really? No way."`,
        textEs: `"¿En serio? No me lo creo."`,
      },
      {
        type: 'paragraph',
        text: `Then top it. Your mother uses the same one, your sister swears by it, you have heard of it and always wanted to try it. It costs you nothing and it turns a stranger being polite into two people having a conversation.`,
        textEs: `Y luego remátalo. Tu madre usa la misma, tu hermana no la cambia por nada, la conoces y siempre has querido probarla. No te cuesta nada y convierte a una desconocida siendo educada en dos personas teniendo una conversación.`,
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'Step 7 — The gift, then turn around',
        textEs: 'Paso 7 — El regalo, y date la vuelta',
      },
      {
        type: 'paragraph',
        text: `Now you give them a reason to move that costs them nothing.`,
        textEs: `Ahora les das un motivo para moverse que no les cuesta nada.`,
      },
      {
        type: 'script',
        text: `"You know what — just because you look so amazing, I'm going to give you a small gift. I think you're going to love it."`,
        textEs: `"¿Sabes qué? Solo porque estás guapísima, te voy a hacer un regalito. Creo que te va a encantar."`,
      },
      {
        type: 'keypoint',
        text: `Now turn around and walk into the shop. Do NOT check whether they are following you. Checking asks permission, and asking permission gives them the chance to say no. You do not give a damn whether they walk your route — you walk it, and you find out afterwards.`,
        textEs: `Ahora date la vuelta y entra en la tienda. NO compruebes si te están siguiendo. Comprobar es pedir permiso, y pedir permiso les da la oportunidad de decir que no. Te da exactamente igual si hacen tu mismo camino — tú lo haces, y ya te enteras después.`,
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'Step 8 — If they do not follow, nothing happens',
        textEs: 'Paso 8 — Si no te siguen, no pasa nada',
      },
      {
        type: 'paragraph',
        text: `Same as the sample: nothing happens. You keep going, you get inside the shop, and only then do you turn your head and see who came. If they are still out on the pavement, call them in warmly. You are not begging; you are holding a door open.`,
        textEs: `Igual que con la muestra: no pasa nada. Sigues andando, entras en la tienda, y solo entonces giras la cabeza y miras quién ha venido. Si siguen fuera en la acera, llámalos con buen rollo. No estás suplicando; estás sujetando una puerta abierta.`,
      },
      {
        type: 'script',
        ...CALL_THEM_IN,
      },
      {
        type: 'keypoint',
        text: `Then turn back round and keep walking. Do not stand there watching them decide. Say it, turn, walk — and the walking is what does the persuading, because now there is nothing to say no to. A seller frozen with a hopeful face is asking permission again, and you have just spent seven steps not asking permission.`,
        textEs: `Y date la vuelta otra vez y sigue andando. No te quedes ahí mirando cómo lo deciden. Lo dices, te giras, andas — y lo que convence es el andar, porque ya no hay nada a lo que decir que no. Un vendedor congelado con cara de ilusión está pidiendo permiso otra vez, y te acabas de pasar siete pasos sin pedir permiso.`,
      },
      {
        type: 'paragraph',
        text: `You never walk beside them and you never escort them. You walk first and you call them to come.`,
        textEs: `Nunca andas a su lado y nunca los acompañas. Andas tú primero y los llamas.`,
      },
      {
        type: 'keypoint',
        text: `And if they still do not come — it is what it is. You did the sequence, you did it properly, you gave it everything you had. That one is not on you. Do not carry her to the next person; the next person has not done anything wrong. This is the one bit of comfort in this job you are allowed to reach for, and you are only allowed to reach for it because you actually did the work.`,
        textEs: `Y si aun así no vienen — pues es lo que hay. Has hecho la secuencia, la has hecho bien, le has puesto todo lo que tenías. Esa no va contigo. No te la lleves a la siguiente persona; la siguiente no te ha hecho nada. Este es el único consuelo que te puedes permitir en este trabajo, y te lo puedes permitir solo porque de verdad has hecho el trabajo.`,
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'Step 9 — They came in. Now the day starts.',
        textEs: 'Paso 9 — Han entrado. Ahora empieza el día.',
      },
      {
        type: 'paragraph',
        text: `The chairs are ready before anybody reaches them. Not pulled out while she stands there watching you clear a seat — ready, because the ten seconds you spend sorting furniture is the ten seconds she uses to remember she was going somewhere.`,
        textEs: `Las sillas están listas antes de que nadie llegue. No las saques mientras ella está ahí de pie mirando cómo despejas un sitio — listas, porque los diez segundos que pasas colocando muebles son los diez segundos que ella usa para acordarse de que iba a algún sitio.`,
      },
      {
        type: 'bullets',
        items: [
          'FACING INTO THE SHOP: never facing the street. If she can see the pavement moving past, she starts thinking about being back out on it.',
          'A CHAIR FOR HIM TOO: if there are two of them, both sit. A partner left standing behind her gets bored, and the bored one is the one who says "come on, we should go".',
          'SIT HER DOWN AND START — OR HAND HER OVER: no pause, no "so…", no shuffling. She is in the chair and somebody has her hand and is already talking. For your first two weeks that somebody is a colleague: you stop them and you pass them on, and that IS your job. Later on it is you in that chair. The handover is quick and warm and it happens while she is sitting, never at the door.',
        ],
        itemsEs: [
          'MIRANDO HACIA DENTRO: nunca hacia la calle. Si ve la acera pasando por delante, empieza a pensar en volver a salir a ella.',
          'UNA SILLA PARA ÉL TAMBIÉN: si son dos, se sientan los dos. Una pareja que se queda de pie detrás se aburre, y el aburrido es el que dice "venga, que nos tenemos que ir".',
          'SIÉNTALA Y EMPIEZA — O PÁSALA: sin pausa, sin "bueno…", sin dar vueltas. Está en la silla y alguien le tiene la mano cogida y ya está hablando. Durante tus primeras dos semanas ese alguien es un compañero: tú paras y pasas, y ESE es tu trabajo. Más adelante en esa silla estarás tú. El traspaso es rápido y con buen rollo, y pasa con ella sentada, nunca en la puerta.',
        ],
      },
      {
        type: 'keypoint',
        text: `That is the sequence finished and the sale not yet started. Everything from here — the demo, the two yeses, the number, the ladder — is a different lesson, and for your first two weeks it is also a different person: a new seller stops and hands over, and does not run the demo at all. Two weeks of nothing but this. Nobody has ever regretted it, because none of the rest ever happens for a seller who cannot do these nine steps.`,
        textEs: `Ahí se acaba la secuencia y todavía no ha empezado la venta. Todo lo que viene ahora — la demo, los dos síes, el número, la escalera — es otra lección, y durante tus primeras dos semanas también es otra persona: el vendedor nuevo para y pasa, y no hace la demo. Dos semanas de esto y nada más. Nadie se ha arrepentido nunca, porque nada de lo demás le pasa a un vendedor que no sabe hacer estos nueve pasos.`,
      },
      {
        type: 'divider',
      },

      {
        type: 'subheader',
        text: 'The whole thing, in order',
        textEs: 'Todo seguido, en orden',
      },
      {
        type: 'numbered',
        items: [
          'STOOD READY: sample in your hand, path clear, out where they can see you.',
          'ATTENTION FROM FOUR OR FIVE METRES, while they are still walking. You do not move.',
          'THEY LOOK: now you go. Sample up, and come at them a bit from the side.',
          'THE SAMPLE: taken or waved away, it changes nothing at all.',
          'THE RUSH, THEN THE QUESTION: "I know you\'re in a rush — what do you normally use on your skin?"',
          '"REALLY? NO WAY.": be impressed, top it, find the common ground.',
          'THE SMALL GIFT: say it, turn around, walk in. Do not check.',
          'INSIDE THE SHOP: look back and call them — "it\'s two seconds, I promise."',
          'TURN ROUND AND WALK AGAIN. If they still do not come, it is what it is — you did it all.',
          'THEY CAME IN: chairs already set, backs to the street, one for him as well. Start — or, in your first two weeks, hand them to a colleague and go back out for the next one.',
        ],
        itemsEs: [
          'COLOCADO: la muestra en la mano, el paso libre, fuera donde te vean.',
          'LES LLAMAS LA ATENCIÓN A CUATRO O CINCO METROS, mientras todavía andan. Tú no te mueves.',
          'TE MIRAN: ahora vas. La muestra en alto, y acércate un poco de lado.',
          'LA MUESTRA: la cojan o la aparten, no cambia absolutamente nada.',
          'LA PRISA, Y LUEGO LA PREGUNTA: "sé que vas con prisa — ¿qué usas normalmente para la piel?"',
          '"¿EN SERIO? NO ME LO CREO.": que te impresione, remátalo, busca algo en común.',
          'EL REGALITO: lo dices, te giras, entras. No compruebes nada.',
          'YA DENTRO: mira atrás y llámalos — "son dos segundos, os lo prometo".',
          'TE GIRAS Y ANDAS OTRA VEZ. Si aun así no vienen, es lo que hay — lo has hecho todo.',
          'HAN ENTRADO: las sillas ya puestas, de espaldas a la calle, una para él también. A empezar — o, en tus primeras dos semanas, se los pasas a un compañero y vuelves a salir a por el siguiente.',
        ],
      },
      {
        type: 'tip',
        text: 'Do not practise this in bits. Say the whole thing out loud before your shift, in order — greeting, sample, the rush line, "really? no way", the gift, turn, walk. Then the chairs. It is about twenty seconds start to finish. You run it whole because the order IS the technique: any one of those lines on its own is just a nice thing said to a stranger.',
        textEs: 'No practiques esto a trozos. Dilo entero en voz alta antes del turno, en orden — saludo, muestra, lo de la prisa, "¿en serio? no me lo creo", el regalo, te giras y andas. Son unos veinte segundos de principio a fin. Se hace entero porque el orden ES la técnica: cualquiera de esas frases suelta es solo algo majo que le dices a un desconocido.',
      },
      {
        type: 'quote',
        text: 'Everything else in this app is a variation on this one sequence. Learn the spine first, and then the compliments, the demo and the price all have somewhere to hang.',
        textEs: 'Todo lo demás en esta app es una variación de esta misma secuencia. Apréndete la columna vertebral primero, y luego los cumplidos, la demo y el precio ya tienen dónde apoyarse.',
        attribution: 'Zero Lines Method',
        attributionEs: 'Método Zero Lines',
      },
    ],
    /* No inline quiz. LESSON_QUIZZES['stop-1'] in lessonQuizzes.ts OVERLAYS
       whatever sits here (see the merge loop at the bottom of this file), so
       an inline quiz on this lesson is code the app can never render. Three
       questions were written here during the rewrite and none of them would
       have reached a seller. The live ones are in lessonQuizzes.ts. */
  },
  'stop-2': {
    id: 'stop-2',
    categoryId: 'stopping',
    title: 'The Compliment Stop',
    titleEs: 'La Parada del Cumplido',
    subtitle: '15 compliment openers for different situations, plus when compliments backfire',
    subtitleEs: 'El cumplido específico es tu mejor abridor',
    duration: '8 min',
    icon: 'Star',
    order: 2,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'A Genuine Compliment Opens More Doors Than Any Pitch',
      textEs: 'Un Cumplido Genuino Abre Más Puertas Que Cualquier Pitch',
    },
    {
            type: 'paragraph',
      text: 'The compliment stop is the most versatile stopping technique because it works on everyone. Who doesn\'t like being noticed? A well-delivered compliment creates an instant positive emotion, breaks the stranger barrier, and gives the customer a reason to engage. But it MUST be genuine. Fake compliments are detected instantly and destroy trust before it begins.',
      textEs: 'La parada del cumplido es la técnica de detención más versátil porque funciona con todos. ¿A quién no le gusta ser notado? Un cumplido bien entregado crea una emoción positiva instantánea, rompe la barrera del desconocido y le da al cliente una razón para conectar. Pero DEBE ser genuino. Los cumplidos falsos se detectan al instante y destruyen la confianza antes de que empiece.',
    },
    {
            type: 'keypoint',
      text: 'The compliment stop formula: Specific observation + Genuine warmth + Immediate transition to product. The compliment is the hook; the smooth transition to the demo is the catch.',
      textEs: 'La fórmula de la parada del cumplido: Observación específica + Calidez genuina + Transición inmediata al producto. El cumplido es el anzuelo; la transición fluida a la demo es el gancho.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: '15 Compliment Openers by Situation',
      textEs: '15 Abridores de Cumplido por Situación',
    },
    {
            type: 'paragraph',
      text: 'These are word-for-word openers you can adapt. The key is specificity — the more specific, the more real it feels.',
      textEs: 'Estos son abridores palabra por palabra que puedes adaptar. La clave es la especificidad — mientras más específico, más real se siente.',
    },
    {
            type: 'bullets',
      items: [
        'ACCESSORY FOCUS: \'That scarf is gorgeous — the color is perfect on you! Let me show you something that would complement your style...\'',
        'GROOMING: \'Your skin is absolutely glowing! What do you use? ... Actually, let me show you my secret weapon for keeping that glow...\'',
        'NAIL FOCUS: \'I love that you keep your nails natural — they look so healthy! Speaking of nails, I have something you\'ll adore...\'',
        'STYLE: \'That jacket is incredible — you clearly know quality. Speaking of quality, let me show you something amazing...\'',
        'ENERGY: \'You have such a warm smile! I can tell you\'re having a great day. Can I make it even better with a quick gift?\'',
        'COUPLE COMPLIMENT: \'You two look like you\'re having the best vacation! I have something that will make your {locationName} trip even more memorable...\'',
        'BAG COMPLEMENT: \'That bag is stunning — is it [brand]? You clearly appreciate the finer things. Let me show you my favorite luxury find here...\'',
        'CONFIDENCE: \'I love your confidence — you walk like you own the street! Quick question: do you ever get dry skin from the mountain air?\'',
        'EYE FOCUS: \'You have beautiful eyes! Let me show you something that makes them look even more incredible...\'',
        'SHOE APPRECIATION: \'Those boots are perfect for a day walking around {locationName}! Stylish AND practical. Let me give you a quick spa moment for your hands to match...\'',
        'FAMILY WARMTH: \'Your family is adorable! Are you all having a wonderful time? I have something that makes an amazing family gift...\'',
        'ELEGANCE: \'You look so elegant — like you just stepped out of a magazine! Let me show you the secret to that just-returned-from-spa glow...\'',
        'VITAMIN D (TAN): \'That vacation glow is everything! Where were you? ... Let me show you how to keep that skin looking incredible...\'',
        'WATCH: \'Beautiful watch — you clearly appreciate quality craftsmanship. Let me show you a skincare tool with the same level of precision...\'',
        'HAIR: \'Your hair is stunning! What do you use? ... You clearly invest in yourself. Let me show you what I invest in for my skin...\''
      ],
      itemsEs: [
          'FOCO EN ACCESORIO: \'¡Esa bufanda es preciosa — el color te queda perfecto! Déjame mostrarte algo que complementaría tu estilo...\'',
          'CUIDADO PERSONAL: \'¡Tu piel está absolutamente radiante! ¿Qué usas? ... En realidad, déjame mostrarte mi arma secreta para mantener ese brillo...\'',
          'FOCO EN UÑAS: \'Me encanta que mantengas tus uñas naturales — ¡se ven tan saludables! Hablando de uñas, tengo algo que te va a encantar...\'',
          'ESTILO: \'Esa chaqueta es increíble — claramente conoces de calidad. Hablando de calidad, déjame mostrarte algo asombroso...\'',
          'ENERGÍA: \'¡Tienes una sonrisa tan cálida! Se nota que estás teniendo un gran día. ¿Puedo hacerlo aún mejor con un regalito rápido?\'',
          'CUMPLIDO A PAREJA: \'¡Vosotros dos parecéis estar teniendo las mejores vacaciones! Tengo algo que hará tu viaje a {locationName} aún más memorable...\'',
          'COMPLEMENTO DE BOLSA: \'Esa bolsa es impresionante — ¿es [brand]? Claramente aprecias las cosas finas. Déjame mostrarte mi hallazgo de lujo favorito aquí...\'',
          'CONFIANZA: \'Me encanta tu confianza — ¡caminas como si la calle fuera tuya! Pregunta rápida: ¿alguna vez se te reseca la piel por el aire de la montaña?\'',
          'FOCO EN OJOS: \'¡Tienes unos ojos hermosos! Déjame mostrarte algo que los hace ver aún más increíbles...\'',
          'APRECIACIÓN DE ZAPATOS: \'¡Esas botas son perfectas para un día andando por {locationName}! Estilosas Y prácticas. Déjame darte un momento spa rápido para tus manos a juego...\'',
          'CALIDEZ FAMILIAR: \'¡Tu familia es adorable! ¿Todos la están pasando maravillosamente? Tengo algo que es un regalo familiar increíble...\'',
          'ELEGANCIA: \'¡Te ves tan elegante — como si salieras de una revista! Déjame mostrarte el secreto para ese brillo de recién salida del spa...\'',
          'VITAMINA D (BRONCEADO): \'¡Ese bronceado vacacional lo es todo! ¿Dónde estuviste? ... Déjame mostrarte cómo mantener esa piel luciendo increíble...\'',
          'RELOJ: \'Hermoso reloj — claramente aprecias la artesanía de calidad. Déjame mostrarte una herramienta de cuidado de piel con el mismo nivel de precisión...\'',
          'CABELLO: \'¡Tu cabello es deslumbrante! ¿Qué usas? ... Claramente inviertes en ti mismo. Déjame mostrarte en qué invierto yo para mi piel...\'',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Anatomy of a Compliment That Works',
      textEs: 'La Anatomía de un Cumplido Que Funciona',
    },
    {
            type: 'numbered',
      items: [
        'IT\'S SPECIFIC: \'Nice jacket\' is weak. \'That olive green jacket brings out your eyes perfectly\' is strong. Specificity = observation = real.',
        'IT\'S ABOUT THEIR CHOICE: Compliment things they chose (clothes, accessories, grooming) not things they were born with (unless it\'s eyes — those work universally).',
        'IT LEADS NATURALLY TO PRODUCT: The best compliments have a bridge. \'Beautiful nails\' → Nail Kit. \'Glowing skin\' → Peeling. \'Quality taste\' → Any product. The bridge must feel natural, not forced.',
        'IT\'S DELIVERED WITH EYE CONTACT: Look them in the eye. Smile genuinely. Pause for 1 second after the compliment. Let it land. Then transition.'
      ],
      itemsEs: [
          'ES ESPECÍFICO: \'Qué chaqueta más bonita\' es débil. \'Esa chaqueta verde oliva resalta tus ojos perfectamente\' es fuerte. Especificidad = observación = real.',
          'ES SOBRE SU ELECCIÓN: Cumplimenta cosas que eligieron (ropa, accesorios, cuidado personal) no cosas con las que nacieron (a menos que sean ojos — esos funcionan universalmente).',
          'CONDUCE NATURALMENTE AL PRODUCTO: Los mejores cumplidos tienen un puente. \'Uñas hermosas\' → Kit de Uñas. \'Piel radiante\' → Peeling. \'Gusto de calidad\' → Cualquier producto. El puente debe sentirse natural, no forzado.',
          'SE ENTREGA CON CONTACTO VISUAL: Míralos a los ojos. Sonríe genuinamente. Pausa 1 segundo después del cumplido. Déjalo caer. Luego transiciona.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Complimenting Men vs. Women',
      textEs: 'Cumplimentando Hombres vs. Mujeres',
    },
    {
            type: 'paragraph',
      text: 'Compliments to men require a different approach. Many men are less accustomed to receiving compliments from strangers, so the technique must be adjusted:',
      textEs: 'Los cumplidos a hombres requieren un enfoque diferente. Muchos hombres están menos acostumbrados a recibir cumplidos de desconocidos, así que la técnica debe ajustarse:',
    },
    {
            type: 'bullets',
      items: [
        'FOR MEN: Focus on style choices, accessories (watch, shoes), or partner compliments. \'Sir, your wife clearly has amazing taste — look at how she glows after this treatment!\' This includes him through his partner.',
        'FOR WOMEN: Broader range works — style, grooming, accessories, energy. Women typically receive more compliments, so yours needs to be specific and genuine to stand out.',
        'FOR COUPLES: Complimenting the woman and engaging the man works better than the reverse. Most couples are comfortable with the woman receiving attention; the man feels included through his role as observer and validator.'
      ],
      itemsEs: [
          'PARA HOMBRES: Enfócate en elecciones de estilo, accesorios (reloj, zapatos), o cumplidos a la pareja. \'Señor, su esposa claramente tiene un gusto increíble — ¡mire cómo brilla después de este tratamiento!\' Esto lo incluye a él a través de su pareja.',
          'PARA MUJERES: Funciona un rango más amplio — estilo, cuidado personal, accesorios, energía. Las mujeres típicamente reciben más cumplidos, así que el tuyo necesita ser específico y genuino para destacar.',
          'PARA PAREJAS: Cumplimentar a la mujer y enganchar al hombre funciona mejor que al revés. La mayoría de las parejas se sienten cómodas con que la mujer reciba atención; el hombre se siente incluido a través de su rol como observador y validador.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When Compliments Backfire',
      textEs: 'Cuando los Cumplidos Fallan',
    },
    {
            type: 'paragraph',
      text: 'Compliments can work against you if done poorly. Here are the danger zones:',
      textEs: 'Los cumplidos pueden jugar en tu contra si se hacen mal. Aquí están las zonas de peligro:',
    },
    {
            type: 'bullets',
      items: [
        'GENERIC COMPLIMENTS: \'You\'re beautiful\' feels like a line. \'That emerald scarf is perfect with your coloring\' feels like an observation. Specificity is the difference between charm and creepiness.',
        'TOO MANY COMPLIMENTS: One genuine compliment opens the door. Three compliments feels like flattery. Move on after the first one.',
        'INAPPROPRIATE FOCUS: Never compliment body parts, weight, or anything that could feel objectifying. Stick to choices they\'ve made — clothes, accessories, grooming, style.',
        'FAKE ENTHUSIASM: If you don\'t mean it, don\'t say it. Customers can detect false compliments instantly. It\'s better to skip the compliment and use a different opener than to deliver a fake one.'
      ],
      itemsEs: [
          'CUMPLIDOS GENÉRICOS: \'Eres hermosa\' se siente como una frase hecha. \'Esa bufanda esmeralda es perfecta con tu tono de piel\' se siente como una observación. La especificidad es la diferencia entre encanto y incomodidad.',
          'DEMASIADOS CUMPLIDOS: Un cumplido genuino abre la puerta. Tres cumplidos se sienten como halago. Sigue adelante después del primero.',
          'FOCO INAPROPIADO: Nunca cumplimentes partes del cuerpo, peso, o algo que pueda sentirse como objetificación. Quédate en las elecciones que han hecho — ropa, accesorios, cuidado personal, estilo.',
          'ENTUSIASMO FALSO: Si no lo sientes, no lo digas. Los clientes pueden detectar cumplidos falsos al instante. Es mejor saltarte el cumplido y usar un abridor diferente que entregar uno falso.',
        ],
    },
    {
            type: 'script',
      text: '\'I love your nails — you keep them so natural and healthy! Speaking of nails, I have the most amazing little gift for you. Just two minutes, I promise you\'ll be shocked.\' Compliment → Bridge → Time-bound invitation → Intrigue. That\'s the formula.',
      textEs: '\'Me encantan tus uñas — ¡las mantienes tan naturales y saludables! Hablando de uñas, tengo el regalito más increíble para ti. Solo dos minutos, te prometo que te va a sorprender.\' Cumplido → Puente → Invitación con tiempo límite → Intriga. Esa es la fórmula.',
    },
    {
            type: 'quote',
      text: 'A genuine compliment is the only opening line that makes the customer feel good about themselves before they feel anything about you. That\'s a powerful place to start.',
      textEs: 'Un cumplido genuino es la única línea de apertura que hace que el cliente se sienta bien consigo mismo antes de sentir algo sobre ti. Ese es un punto de partida poderoso.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'What makes a compliment feel genuine rather than fake?',
      options: [
        'Using elaborate and flowery language',
        'Being specific about something the person chose',
        'Complimenting their physical appearance generically',
        'Giving multiple compliments rapidly'
      ],
      correctIndex: 1,
      explanation: 'Specific compliments about choices people make (clothes, accessories, grooming) feel like real observations. Generic or physical compliments often feel like lines or flattery.',
    },
    {
      question: 'What is the recommended approach when complimenting men?',
      options: [
        'Compliment their body or physique',
        'Focus on style choices, accessories, or partner compliments that include them indirectly',
        'Avoid complimenting men entirely',
        'Use the same approach as for women'
      ],
      correctIndex: 1,
      explanation: 'Men are often less accustomed to receiving compliments from strangers. Focus on style choices, accessories, or compliment their partner while engaging them as the observer.',
    },
    {
      question: 'When should you avoid using a compliment opener?',
      options: [
        'When the customer looks angry or rushed',
        'When you cannot find something genuinely specific to compliment',
        'When the customer is in a group',
        'When it is raining'
      ],
      correctIndex: 1,
      explanation: 'If you cannot find something genuinely specific to compliment, it is better to use a different stopping technique. Fake compliments are detected instantly and destroy trust.',
    }
    ],
  },
  'stop-3': {
    id: 'stop-3',
    categoryId: 'stopping',
    title: 'The Humor Stop',
    titleEs: 'La Parada del Humor',
    subtitle: 'Making them smile before they can say no — funny openers that actually work',
    subtitleEs: 'Ríe primero, vende después',
    duration: '8 min',
    icon: 'Smile',
    order: 3,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'If They Smile, They Stop. If They Stop, You Sell.',
      textEs: 'Si Sonríen, Paran. Si Paran, Vendes.',
    },
    {
            type: 'paragraph',
      text: 'Humor is the ultimate disarmer. When someone laughs, their guard drops. They\'re no longer in \'defend against salesperson\' mode — they\'re in \'this person is fun\' mode. A smile creates a micro-moment of connection that buys you the 10 seconds you need to deliver your pitch. But humor is a scalpel, not a hammer. Use it precisely.',
      textEs: 'El humor es el mejor desarmador. Cuando alguien se ríe, baja la guardia. Ya no está en modo \'defenderse del vendedor\' — está en modo \'esta persona es divertida\'. Una sonrisa crea un micro-momento de conexión que te compra los 10 segundos que necesitas para lanzar tu pitch. Pero el humor es un bisturí, no un martillo. Úsalo con precisión.'
    },
    {
            type: 'keypoint',
      text: 'The humor stop formula: Light observational humor + Self-awareness about selling + Quick transition to value. You\'re not doing stand-up comedy — you\'re just breaking the tension with a smile.',
      textEs: 'La fórmula de la parada del humor: Humor observacional ligero + Autoconciencia sobre vender + Transición rápida al valor. No estás haciendo stand-up comedy — solo estás rompiendo la tensión con una sonrisa.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Funny Openers That Work',
      textEs: 'Abridores Divertidos Que Funcionan',
    },
    {
            type: 'paragraph',
      text: 'These openers acknowledge the awkwardness of street selling and turn it into a shared joke:',
      textEs: 'Estos abridores reconocen lo incómodo de vender en la calle y lo convierten en una broma compartida:',
    },
    {
            type: 'bullets',
      items: [
        'THE HONEST APPROACH: \'I know, I know — another salesperson. But I promise, this is the one time today you\'ll actually be glad someone stopped you.\'',
        'THE SELF-DEPRECATING: \'I\'m clearly not very good at this because you\'re still walking, but give me 30 seconds and I\'ll change your mind.\'',
        'THE CHALLENGE: \'Two minutes. If you don\'t love it, you can tell me I\'m terrible at my job. Deal?\'',
        'THE OVERDRAMATIC: \'STOP! Don\'t make me chase you! ... Okay, I won\'t chase you because that would be creepy. But seriously, two seconds.\'',
        'THE REALITY CHECK: \'I know you\'re thinking \'not another one.\' I think the same thing when I walk down this street on my day off.\'',
        'THE CURIOSITY HOOK: \'Can I ask you something? What made you look over here just now? ... Exactly! Your instincts are good. Come see why.\''
      ],
      itemsEs: [
        'EL ENFOQUE HONESTO: \'Lo sé, lo sé — otro vendedor. Pero te prometo que esta es la única vez hoy que vas a agradecer que alguien te detuviera.\'',
        'EL AUTODEPRECATIVO: \'Claramente no soy muy bueno en esto porque sigues caminando, pero dame 30 segundos y te haré cambiar de opinión.\'',
        'EL RETO: \'Dos minutos. Si no te encanta, me puedes decir que soy terrible en mi trabajo. ¿Trato?\'',
        'EL DRAMÁTICO: \'¡ALTO! ¡No me hagas perseguirte! ... Ok, no te voy a perseguir porque sería raro. Pero en serio, dos segundos.\'',
        'EL TOQUE DE REALIDAD: \'Sé que estás pensando \'otro más.\' Yo pienso lo mismo cuando camino por esta calle en mi día libre.\'',
        'EL GANCHO DE CURIOSIDAD: \'¿Te puedo preguntar algo? ¿Qué te ha hecho girarte ahora mismo? ... ¡Exacto! Tus instintos son buenos. Ven a ver por qué.\''
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Humor by Product',
      textEs: 'Humor por Producto',
    },
    {
            type: 'paragraph',
      text: 'Product-specific humor that connects the joke to what you\'re selling:',
      textEs: 'Humor específico por producto que conecta la broma con lo que estás vendiendo:'
    },
    {
            type: 'bullets',
      items: [
        'SYRINGE: \'Don\'t worry, it\'s not that kind of syringe! No needles, just magic for your eyes. Promise.\'',
        'NAIL KIT: \'I promise not to scream when I show you this. My last customer did, and her husband got jealous.\'',
        'SCRUB: \'This will make your hands softer than a baby\'s... actually, that\'s a weird comparison. Just trust me, they\'re going to feel incredible.\'',
        'PEELING: \'This is my favourite trick for glowing skin. And by trick I mean miracle. But trick sounds cooler.\''
      ],
      itemsEs: [
        'JERINGA: \'¡No te preocupes, no es ese tipo de jeringa! Sin agujas, solo magia para tus ojos. Prometido.\'',
        'KIT DE UÑAS: \'Prometo no gritar cuando te muestre esto. Mi última clienta sí gritó, y su esposo se puso celoso.\'',
        'EXFOLIANTE: \'Esto va a dejar tus manos más suaves que las de un bebé... bueno, esa comparación está rara. Solo confía en mí, van a sentirse increíbles.\'',
        'PEELING: \'Este es mi truco favorito para piel radiante. Y por truco me refiero a un milagro. Pero truco suena más cool.\''
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reading Humor Receptivity',
      textEs: 'Leyendo la Receptividad al Humor',
    },
    {
            type: 'paragraph',
      text: 'Not everyone responds to humor. Here\'s how to read who will:',
      textEs: 'No todo el mundo responde al humor. Así es como leer a quién sí le funcionará:'
    },
    {
            type: 'bullets',
      items: [
        'GREEN FOR HUMOR: Smiling already, laughing with their companion, playful energy, eye contact with a twinkle, young or young-at-heart vibe, casual relaxed clothing.',
        'RED FOR HUMOR: Frowning, intense purpose in their walk, formal business attire with serious demeanor, on a phone call, visibly stressed or angry.',
        'YELLOW FOR HUMOR: Neutral expression but not negative, solo traveler (harder to read), older customer (test with gentle humor first).'
      ],
      itemsEs: [
        'VERDE PARA HUMOR: Ya sonriendo, riendo con su acompañante, energía juguetona, contacto visual con brillo en los ojos, vibra joven o joven de corazón, ropa casual y relajada.',
        'ROJO PARA HUMOR: Frunciendo el ceño, caminando con propósito intenso, atuendo formal de negocios con comportamiento serio, en una llamada, visiblemente estresado o enojado.',
        'AMARILLO PARA HUMOR: Expresión neutral pero no negativa, viajero solo (más difícil de leer), cliente mayor (prueba con humor suave primero).'
      ]
    },
    {
            type: 'tip',
      text: 'Try a light one first. If they smile, go further. If the joke dies, don\'t chase it — just go straight and quick instead. \'Fair enough. Thirty seconds, then, and I\'ll let you get on.\' Warm, fast, no sulking. The dead joke costs you nothing; going stiff about it costs you the sale.',
      textEs: 'Prueba primero con algo ligero. Si sonríen, sube la apuesta. Si el chiste se muere, no lo persigas — ve directo y rápido. \'Vale, vale. Treinta segundos y te dejo seguir.\' Cálido, rápido, sin enfurruñarte. El chiste muerto no te cuesta nada; ponerte tieso por eso te cuesta la venta.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Cultural Humor Differences',
      textEs: 'Diferencias Culturales de Humor',
    },
    {
            type: 'paragraph',
      text: 'Humor doesn\'t translate equally across cultures:',
      textEs: 'El humor no se traduce igual entre culturas:'
    },
    {
            type: 'bullets',
      items: [
        'SPANISH: Appreciate warmth and playful energy. Physical humor and exaggeration work. Self-deprecating humor is charming.',
        'FRENCH: Subtle, witty humor works better than slapstick. Intellectual observations are appreciated. Avoid overly silly humor.',
        'BRITISH: Self-deprecating humor is the national sport. They LOVE it. Dry wit and understatement are their love language.',
        'EASTERN EUROPEAN: Direct humor works. Bold statements with a smile. They appreciate confidence more than subtlety.',
        'GENERAL RULE: Physical comedy (demonstrative gestures, funny faces during the demo) transcends language barriers. Actions are funnier than words.'
      ],
      itemsEs: [
        'ESPAÑOLES: Aprecian la calidez y la energía juguetona. El humor físico y la exageración funcionan. El humor autodepreciativo es encantador.',
        'FRANCESES: El humor sutil e ingenioso funciona mejor que el slapstick. Las observaciones intelectuales se aprecian. Evita el humor demasiado tonto.',
        'BRITÁNICOS: El humor autodepreciativo es el deporte nacional. ¡LO ADORAN! El ingenio seco y la understatement son su lenguaje del amor.',
        'EUROPEOS ORIENTALES: El humor directo funciona. Declaraciones atrevidas con una sonrisa. Aprecian la confianza más que la sutileza.',
        'REGLA GENERAL: La comedia física (gestos demostrativos, caras graciosas durante la demo) trasciende barreras del idioma. Las acciones son más divertidas que las palabras.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When Humor Backfires',
      textEs: 'Cuando el Humor Falla',
    },
    {
            type: 'bullets',
      items: [
        'FORCED HUMOR: If it doesn\'t come naturally to you, don\'t force it. Awkward humor is worse than no humor.',
        'TOO MUCH: One joke opens the door. Three jokes makes you a comedian trying to sell something. Keep it light and move on.',
        'AT SOMEONE\'S EXPENSE: Never joke about the customer\'s appearance, clothing, or companion. Self-deprecating humor ONLY.',
        'INAPPROPRIATE TOPICS: Stay away from politics, religion, crude humor, or anything edgy. Keep it universally safe.',
        'IGNORING SIGNALS: If they don\'t laugh at your first attempt, pivot. Don\'t keep trying to \'win them over\' with humor.'
      ],
      itemsEs: [
        'HUMOR FORZADO: Si no te sale natural, no lo fuerces. El humor incómodo es peor que ningún humor.',
        'DEMASIADO: Una broma abre la puerta. Tres bromas te convierten en un comediante intentando vender algo. Manténlo ligero y sigue adelante.',
        'A COSTA DE ALGUIEN: Nunca bromees sobre la apariencia, ropa o acompañante del cliente. Humor autodepreciativo SOLAMENTE.',
        'TÓPICOS INAPROPIADOS: Mantente alejado de política, religión, humor vulgar o cualquier cosa controversial. Mantenlo universalmente seguro.',
        'IGNORAR SEÑALES: Si no se ríen en tu primer intento, pivotea. No sigas intentando \'conquistarlos\' con humor.'
      ]
    },
    {
            type: 'script',
      text: '\'I know what you\'re thinking — not another salesperson! I think the same thing when I\'m shopping. But here\'s the thing — this demo takes literally two minutes, and everyone who tries it walks out smiling. Even the people who don\'t buy. Want to see why?\' Humor → relatability → value proposition → invitation.',
      textEs: '\'Sé lo que estás pensando — ¡otro vendedor! Yo pienso lo mismo cuando voy de compras. Pero mira — esta demo toma literalmente dos minutos, y todos los que la prueban se van sonriendo. Hasta los que no compran. ¿Quieres ver por qué?\' Humor → empatía → propuesta de valor → invitación.'
    },
    {
            type: 'quote',
      text: 'Laughter is the shortest distance between two strangers. Cross that distance, and the rest of the sale becomes a conversation.',
      textEs: 'La risa es la distancia más corta entre dos desconocidos. Cruza esa distancia, y el resto de la venta se convierte en una conversación.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines'
    }
    ],
    quiz: [
    {
      question: 'What is the humor stop formula?',
      options: [
        'Tell as many jokes as possible',
        'Light observational humor + self-awareness about selling + quick transition to value',
        'Make fun of the customer gently',
        'Use physical comedy only'
      ],
      correctIndex: 1,
      explanation: 'The humor stop uses light observational humor, acknowledges the awkwardness of street selling, and quickly transitions to value. You\'re not doing stand-up — you\'re breaking tension with a smile.',
    },
    {
      question: 'Which type of humor is universally safest in sales?',
      options: [
        'Political humor',
        'Self-deprecating humor',
        'Sarcasm about the customer',
        'Edgy jokes'
      ],
      correctIndex: 1,
      explanation: 'Self-deprecating humor is safest because it shows confidence and vulnerability without risking offense. You\'re the punchline, never the customer.',
    },
    {
      question: 'The joke dies. What do you do?',
      options: [
        'Try harder and land a bigger joke on them',
        'Go straight and quick instead',
        'Give up on that customer',
        'Make a more extreme joke'
      ],
      correctIndex: 1,
      explanation: 'Don\'t chase a dead joke. \'Fair enough. Thirty seconds, then, and I\'ll let you get on.\' The dead joke costs you nothing; going stiff about it costs you the sale.',
    }
    ],
  },
  'stop-4': {
    id: 'stop-4',
    categoryId: 'stopping',
    title: 'The Urgency Stop',
    titleEs: 'La Parada de Urgencia',
    subtitle: 'Urgency that lands and urgency that dies',
    subtitleEs: 'La urgencia que entra y la urgencia que se muere',
    duration: '8 min',
    icon: 'Clock',
    order: 4,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Make Them Feel the Moment',
      textEs: 'Hazles Sentir el Momento',
    },
    {
            type: 'paragraph',
      text: 'Urgency is the oldest tool on the street, and it works because a decision with no deadline never gets made. \'I\'ll think about it\' is not a maybe, it is a no with better manners. Give them a reason for it to be today and they decide today.',
      textEs: 'La urgencia es la herramienta más antigua de la calle, y funciona porque una decisión sin fecha límite no se toma nunca. \'Me lo pienso\' no es un quizá, es un no con mejores modales. Dales un motivo para que sea hoy y deciden hoy.'
    },
    {
            type: 'keypoint',
      text: 'Urgency is a performance and everybody knows it. \'Two left.\' \'That\'s gone at closing.\' \'I\'ve already done this once today.\' That is the street, and they are enjoying it every bit as much as you are. The one line you never cross: never promise something the shop has to honour after they have walked out. Everything else is yours to play with.',
      textEs: 'La urgencia es un espectáculo y todo el mundo lo sabe. \'Me quedan dos.\' \'Eso se acaba al cerrar.\' \'Hoy ya lo he hecho una vez.\' Eso es la calle, y ellos lo disfrutan tanto como tú. La única línea que no se cruza: no prometas nunca algo que la tienda tenga que cumplir cuando ya se hayan ido. Todo lo demás es tuyo para jugar.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Types of Urgency That Work',
      textEs: 'Tipos de Urgencia Que Funcionan',
    },
    {
            type: 'numbered',
      items: [
        'TIME: \'We\'re closing in half an hour.\' \'That offer\'s gone tonight.\' A deadline turns a maybe into a decision, which is the only thing you are after.',
        'QUANTITY: \'I\'ve only got two left.\' \'That scent went in a weekend.\' Nobody wants to be the one who missed it. Say it flat, like it is just information.',
        'LOCATION: \'The syringe is {currency}300 here. Cross the border and it is back to {currency}500.\' The strongest one you have, because it does not even need selling.',
        'SEASON: \'Christmas is in two weeks and this is the easiest present you will buy all month.\' The calendar does the pushing for you.',
        'THE DEMO ITSELF: \'You have already felt it. You know what it does. What exactly are you going to think about?\' The best urgency of the lot, because they made it themselves.'
      ],
      itemsEs: [
        'TIEMPO: \'Cerramos en media hora.\' \'Esa oferta se acaba esta noche.\' Una fecha límite convierte un quizá en una decisión, que es lo único que buscas.',
        'CANTIDAD: \'Solo me quedan dos.\' \'Ese aroma voló en un fin de semana.\' Nadie quiere ser el que se lo pierde. Dilo a pelo, como si fuera información y ya está.',
        'SITIO: \'La jeringa son {currency}300 aquí. Cruzas la frontera y vuelve a {currency}500.\' La más fuerte que tienes, porque ni siquiera hay que venderla.',
        'TEMPORADA: \'La Navidad es en dos semanas y este es el regalo más fácil que vas a comprar este mes.\' El calendario empuja por ti.',
        'LA PROPIA DEMO: \'Ya lo has notado. Ya sabes lo que hace. ¿Qué te tienes que pensar exactamente?\' La mejor de todas, porque se la han montado ellos solos.'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Urgency Openers by Situation',
      textEs: 'Abridores de Urgencia por Situación',
    },
    {
            type: 'bullets',
      items: [
        '\'I only have two samples of our best-seller left — want to see what everyone\'s been talking about?\' (Quantity scarcity)',
        '\'We\'re closing soon, but I can squeeze you in for a 2-minute demo that\'ll blow your mind.\' (Time pressure + value)',
        '\'This offer\'s gone when we close tonight. I know, I know, it sounds like a sales line — have a look at the sign.\' (Naming the trick and doing it anyway lands better than either on its own)',
        '\'The last customer bought our last two scrubs in this scent. Want to see what the hype is about before the rest are gone?\' (Social proof + scarcity)',
        '\'You\'re here at the perfect time — we just restocked the syringe after selling out all weekend. But they go fast.\' (Fresh availability creates urgency)'
      ],
      itemsEs: [
        '\'Solo me quedan dos muestras de nuestro más vendido — ¿quieres ver de qué ha estado hablando todo el mundo?\' (Escasez por cantidad)',
        '\'Cerramos pronto, pero te puedo hacer espacio para una demo de 2 minutos que te volará la cabeza.\' (Presión de tiempo + valor)',
        '\'Esta oferta se acaba cuando cerremos esta noche. Ya lo sé, ya lo sé, suena a frase de vendedor — mira el cartel.\' (Cantar el truco y hacerlo igual entra mejor que cualquiera de las dos cosas por separado)',
        '\'El último cliente se llevó nuestros últimos dos exfoliantes de este aroma. ¿Quieres ver de qué va el hype antes de que se acaben el resto?\' (Prueba social + escasez)',
        '\'Llegaste en el momento perfecto — acabamos de reabastecer la jeringa después de agotarse todo el fin de semana. Pero se van rápido.\' (La disponibilidad fresca crea urgencia)'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Urgency That Lands vs. Urgency That Dies',
      textEs: 'La Urgencia Que Entra vs. La Que Se Muere',
    },
    {
            type: 'comparison',
      left: { label: 'Urgency That Lands', text: 'Specific, and said straight. \'Two left.\' \'That\'s gone at closing.\' Straight face, half a smile, then you carry on as if you had mentioned the weather. And the second they say no you drop it completely — \'Fine, fine, I tried. Enjoy your day.\' Dropping it instantly is what makes the next one land.' },
      leftEs: { label: 'La Urgencia Que Entra', text: 'Concreta, y dicha a pelo. \'Me quedan dos.\' \'Eso se acaba al cerrar.\' Cara seria, media sonrisa, y sigues como si hubieras hablado del tiempo. Y en cuanto te dicen que no, lo sueltas del todo — \'Vale, vale, lo he intentado. Que disfrutes del día.\' Soltarlo al momento es lo que hace que funcione la siguiente.' },
      right: { label: 'Urgency That Dies', text: 'Vague and limp — \'you should really get it while you are here.\' Nothing to take hold of. Or said apologetically, eyes down, like you do not believe it yourself. Or worst of all, repeated after they have already said no, which turns two seconds of theatre into somebody following them up the street.' },
      rightEs: { label: 'La Urgencia Que Se Muere', text: 'Vaga y sin fuerza — \'deberías llevártelo ya que estás aquí\'. No hay de dónde coger. O dicha pidiendo perdón, con la mirada baja, como si tú tampoco te lo creyeras. O peor todavía, repetida después de que ya te han dicho que no, que convierte dos segundos de teatro en alguien siguiéndolos por la calle.' }
    },
    {
            type: 'tip',
      text: 'It is all in the delivery. Same six words land or die depending on whether you say them like a fact or like a favour you are begging for. And there is one hard line underneath all of it: never promise anything the shop has to honour once they are out of the door — no coming back tomorrow, no ask-for-me-by-name, no money back. You will be on a different pitch and somebody else has to have that argument.',
      textEs: 'Todo está en cómo lo dices. Las mismas seis palabras entran o se mueren según las sueltes como un dato o como un favor que estás suplicando. Y debajo de todo hay una línea que no se cruza: no prometas nada que la tienda tenga que cumplir cuando ya estén fuera — nada de vuelve mañana, nada de pregunta por mí, nada de te devuelvo el dinero. Tú estarás en otro sitio y la discusión se la come otro.'
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Seasonal Urgency: Christmas & Peak Season',
      textEs: 'Urgencia Estacional: Navidad y Temporada Alta',
    },
    {
            type: 'paragraph',
      text: 'Peak season (November-February) creates natural urgency that you should leverage:',
      textEs: 'La temporada alta (noviembre-febrero) crea urgencia natural que debes aprovechar:'
    },
    {
            type: 'bullets',
      items: [
        'CHRISTMAS SHOPPING: \'This is the easiest Christmas gift you\'ll buy. Everyone loves it, it\'s unisex, and it actually gets used.\' Gift purchases have a natural deadline — December 25th.',
        'LAST-MINUTE GIFTS: \'Christmas is in 5 days. If you\'re still looking for gifts, this is your answer. Small, elegant, and under {currency}60.\'',
        'SKI SEASON (mountain shops only): \'After a day on the slopes, your skin is so dry from the mountain air. This is what the locals use to recover.\' Seasonal relevance creates immediate need.',
        'WEEKEND RUSH: \'Weekends are crazy here. I\'d hate for you to come back and find your scent sold out.\' Weekend timing creates shopping pressure.'
      ],
      itemsEs: [
        'COMPRAS NAVIDEÑAS: \'Este es el regalo de Navidad más fácil que vas a comprar. A todos les encanta, es unisex, y de verdad se usa.\' Las compras de regalo tienen una fecha límite natural — el 25 de diciembre.',
        'REGALOS DE ÚLTIMO MINUTO: \'La Navidad es en 5 días. Si todavía buscas regalos, esta es tu respuesta. Pequeño, elegante, y menos de {currency}60.\'',
        'TEMPORADA DE ESQUÍ (solo tiendas de montaña): \'Después de un día en las pistas, tu piel queda súper seca por el aire de la montaña. Esto es lo que usan los locales para recuperarse.\' La relevancia de temporada crea necesidad inmediata.',
        'LOCURA DE FIN DE SEMANA: \'Los fines de semana son una locura aquí. Me sabría fatal que volvieras y encontraras tu aroma agotado.\' El timing de fin de semana crea presión de compra.'
      ]
    },
    {
            type: 'script',
      text: '\'Look, I\'m not going to do the whole hard sell on you. I\'ll just tell you where we are: I had a pile of these yesterday and I have got eight left. The weekend starts tomorrow. If you want it, take it now. If you\'re not sure, honestly, no pressure — but I can\'t promise it\'ll be here tomorrow.\' Notice how it works: you take the pressure off with one hand and put the deadline down with the other, and they hear the second half.',
      textEs: '\'Mira, no te voy a dar el rollo de vendedor. Te digo dónde estamos y ya: ayer tenía un montón de estos y me quedan ocho. El fin de semana empieza mañana. Si lo quieres, llévatelo ahora. Si no lo tienes claro, de verdad, sin presión — pero no te puedo prometer que mañana siga aquí.\' Fíjate en cómo funciona: con una mano les quitas la presión y con la otra les pones la fecha límite, y lo que oyen es la segunda parte.'
    },
    {
            type: 'quote',
      text: 'Urgency isn\'t about pressuring people. It\'s about helping them overcome procrastination. The customer who genuinely wants your product but leaves to \'think about it\' often never returns. Urgency helps them make the decision they already want to make.',
      textEs: 'La urgencia no se trata de presionar a la gente. Se trata de ayudarles a superar la procrastinación. El cliente que genuinamente quiere tu producto pero se va a \'pensarlo\' a menudo nunca vuelve. La urgencia les ayuda a tomar la decisión que ya quieren tomar.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines'
    }
    ],
    quiz: [
    {
      question: 'What separates urgency that lands from urgency that dies?',
      options: [
        'Whether the customer already wanted the product before you spoke',
        'The delivery, and dropping it the moment they say no',
        'How many different urgency lines you manage to use in a row',
        'Whether you say it before or after you have given them the price'
      ],
      correctIndex: 1,
      explanation: 'Same six words land or die on the delivery. Specific, straight face, half a smile — and dropped the second they say no. \'Fine, fine, I tried. Enjoy your day.\'',
    },
    {
      question: 'Which type of urgency is the {locationName} price gap?',
      options: [
        'Time-based urgency',
        'Location-based urgency',
        'Quantity-based urgency',
        'Seasonal urgency'
      ],
      correctIndex: 1,
      explanation: 'The price gap is location-based urgency. The syringe is {currency}300 in {locationName}. Once the customer crosses the border, it goes back to {currency}500. This is genuine, verifiable scarcity.',
    },
    {
      question: 'Why does urgency help customers who genuinely want your product?',
      options: [
        'It tricks them into buying',
        'It helps them overcome procrastination and make a decision they already want to make',
        'It makes them feel guilty',
        'It confuses them'
      ],
      correctIndex: 1,
      explanation: 'Urgency helps customers overcome natural procrastination. Many customers who leave to \'think about it\' never return. Ethical urgency helps them make the decision they already want to make.',
    }
    ],
  },
  'stop-5': {
    id: 'stop-5',
    categoryId: 'stopping',
    title: 'Product-Specific Stops',
    titleEs: 'Paradas Según el Producto',
    subtitle: 'Detailed scripts for each product matched to the person\'s visible traits',
    subtitleEs: 'Guiones para cada producto según lo que ves en la persona',
    duration: '10 min',
    icon: 'Sparkles',
    order: 5,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'Match the Product to the Person',
      textEs: 'Empareja el Producto con la Persona',
    },
    {
            type: 'paragraph',
      text: 'A generic stop works. A specific one works better. When your first line connects to something you can actually see about the person, it lands like somebody noticing them instead of somebody working. Beautiful natural nails give you a nail-kit line. Tired eyes give you a syringe line. Same job, better sentence.',
      textEs: 'Una parada genérica funciona. Una concreta funciona mejor. Cuando tu primera frase conecta con algo que de verdad le ves a la persona, suena a que alguien se ha fijado en ella y no a que alguien está currando. Unas uñas naturales bonitas te dan una frase de kit de uñas. Unos ojos cansados te dan una frase de jeringa. El mismo trabajo, mejor frase.',
    },
    {
            type: 'keypoint',
      text: 'The formula: see something → connect it to a product → open with that. And read the lists below for what they are: they tell you WHICH LINE to use, never WHO to bother with. You stop everybody. Nothing on this page is permission to let somebody walk past because they did not match a bullet point.',
      textEs: 'La fórmula: ves algo → lo conectas con un producto → abres por ahí. Y lee las listas de abajo por lo que son: te dicen QUÉ FRASE usar, nunca CON QUIÉN molestarte. Paras a todo el mundo. Nada de esta página es permiso para dejar pasar a nadie porque no encaje con una viñeta.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Syringe Stop (Eye Treatment)',
      textEs: 'La Parada de la Jeringa (Tratamiento para Ojos)',
    },
    {
            type: 'paragraph',
      text: 'Where this line lands hardest: visible under-eye bags, crow\'s feet, tired-looking eyes, anybody who mentions a long trip. It is also the line you use when you can see nothing at all, because the eyes are what this shop sells and everybody has got two.',
      textEs: 'Dónde pega más fuerte esta frase: bolsas visibles, patas de gallo, ojos con cara de cansancio, cualquiera que mencione un viaje largo. Y también es la frase que usas cuando no ves nada de nada, porque los ojos son lo que vende esta tienda y todo el mundo tiene dos.',
    },
    {
            type: 'bullets',
      items: [
        'THE DIRECT APPROACH: \'You look amazing — but the eyes... maybe we can make them look even more relaxed?\' Said with a cheeky smile. This opener acknowledges their overall appearance while pinpointing the improvement area.',
        'THE TIRED TRAVELER: \'Long trip? I can see it in your eyes — and not in a good way. Let me fix that in two minutes.\' For people who genuinely look tired from travel.',
        'THE AGE-APPROPRIATE: \'You clearly take great care of yourself. Want to see what I can do around the eyes? It\'s like a spa treatment in two minutes.\' Positions it as enhancement, not correction.',
        'THE COMPLEMENT TO MAKEUP: \'Your makeup is flawless! Let me show you something that makes the eyes pop even more without any makeup.\' Appeals to beauty enthusiasts.'
      ],
      itemsEs: [
          'EL ENFOQUE DIRECTO: \'Te ves increíble, pero los ojos... ¿quizá podemos hacer que se vean más relajados?\' Dicho con una sonrisa pícara. Esta apertura reconoce su apariencia general mientras señala el área de mejora.',
          'EL VIAJERO CANSADO: \'¿Viaje largo? Se te nota en los ojos, y no de buena manera. Déjame arreglar eso en dos minutos.\' Para personas que genuinamente se ven cansadas por el viaje.',
          'EL ENFOQUE POR EDAD: \'Claramente te cuidas mucho. ¿Quieres ver qué puedo hacer alrededor de los ojos? Es como un tratamiento de spa en dos minutos.\' Lo posiciona como una mejora, no como una corrección.',
          'EL COMPLEMENTO AL MAQUILLAJE: \'¡Tu maquillaje está impecable! Déjame mostrarte algo que hace que los ojos resalten aún más sin ningún maquillaje.\' Atrae a los entusiastas de la belleza.',
        ],
    },
    {
            type: 'script',
      text: '\'You have beautiful eyes — but I can see the travel fatigue. Let me show you our secret weapon. Two minutes, one eye, and you\'ll see the difference yourself in the mirror. It\'s honestly shocking.\' Specific observation + time promise + intrigue.',
      textEs: '\'Tienes unos ojos hermosos, pero se nota el cansancio del viaje. Déjame mostrarte nuestro arma secreta. Dos minutos, un ojo, y verás la diferencia tú misma en el espejo. Es honestamente impactante.\' Observación específica + promesa de tiempo + intriga.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Peeling Stop (Glow Treatment)',
      textEs: 'La Parada del Peeling (Tratamiento de Brillo)',
    },
    {
            type: 'paragraph',
      text: 'Where this line lands hardest: dull or dry skin, anybody who asks you about routines, somebody young who is chasing glow rather than years, anybody who says they want to look \'fresher\'.',
      textEs: 'Dónde pega más fuerte esta frase: piel apagada o seca, quien te pregunta por rutinas, alguien joven que va detrás del brillo y no de los años, quien dice que quiere verse "más fresca".',
    },
    {
            type: 'bullets',
      items: [
        'THE GLOW HOOK: \'Your skin is nice, but I can give you that \'just got back from vacation\' glow in two minutes. Want to see?\'',
        'THE SKINCARE ENTHUSIAST: \'I can tell you care about your skin. Let me show you my favorite weekly treatment — it\'s completely different from daily cream.\'',
        'THE DRY SKIN ANGLE: \'The mountain air here is so drying. Let me show you something that removes all the dead skin instantly — your cream will work 10 times better.\'',
        'THE AGE-DEFYING: \'This is what I use once a week to keep my skin looking fresh. Want to try it? It\'s like a facial at home.\' Peer recommendation works especially well from younger staff.'
      ],
      itemsEs: [
          'EL GANCHO DEL BRILLO: \'Tu piel está bien, pero puedo darte ese brillo de \'acabo de volver de vacaciones\' en dos minutos. ¿Quieres ver?\'',
          'EL ENTUSIASTA DEL CUIDADO DE LA PIEL: \'Se nota que te importa tu piel. Déjame mostrarte mi tratamiento semanal favorito, es completamente diferente de la crema diaria.\'',
          'EL ÁNGULO DE LA PIEL SECA: \'El aire de la montaña aquí reseca mucho. Déjame mostrarte algo que elimina toda la piel muerta al instante, tu crema funcionará 10 veces mejor.\'',
          'EL ANTI-EDAD: \'Esto es lo que uso una vez por semana para mantener mi piel fresca. ¿Quieres probarlo? Es como un facial en casa.\' La recomendación de un igual funciona especialmente bien con el personal más joven.',
        ],
    },
    {
            type: 'script',
      text: '\'Let me show you my favorite quick trick for glowing skin. It\'s a weekly treatment that removes all the dead layers — your regular cream will work so much better after. Two minutes, and you\'ll feel the difference immediately.\' Quick, friendly, no pressure.',
      textEs: '\'Déjame mostrarte mi truco rápido favorito para piel radiante. Es un tratamiento semanal que elimina todas las capas muertas, tu crema regular funcionará mucho mejor después. Dos minutos, y sentirás la diferencia de inmediato.\' Rápido, amigable, sin presión.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Scrub & Body Butter Stop',
      textEs: 'La Parada del Exfoliante y Body Butter',
    },
    {
            type: 'paragraph',
      text: 'Where this line lands hardest: dry or cracked hands (especially in winter), anybody who mentions the mountain air, people shopping for presents, couples — it is unisex and nobody is embarrassed to touch it.',
      textEs: 'Dónde pega más fuerte esta frase: manos secas o agrietadas (sobre todo en invierno), quien menciona el aire de la montaña, quien va comprando regalos, parejas — es unisex y a nadie le da corte tocarlo.',
    },
    {
            type: 'bullets',
      items: [
        'THE DRY SKIN QUESTION: \'Do you ever get dry skin? Ugh, I know — it\'s the worst. You know what? Let me give you something amazing. Come!\' This classic opener works because almost everyone has dry skin, especially after a day of travelling.',
        'THE SENSORY HOOK: \'Want to feel something incredible? This is from the Dead Sea — lowest place on Earth, highest mineral concentration. Your hands have never felt this soft.\'',
        'THE GIFT ANGLE: \'Looking for Christmas gifts? This is our most popular one — everyone loves it, it\'s unisex, and it\'s actually useful. Feel this...\'',
        'THE COVID LEGACY: \'Since Covid, everyone\'s hands are so dry from sanitizer. This became our #1 seller — people were like, \'Finally something that actually helps!\'\''
      ],
      itemsEs: [
          'LA PREGUNTA DE LA PIEL SECA: \'¿Alguna vez te reseca la piel? Uf, lo sé, es lo peor. ¿Sabes qué? Déjame darte algo increíble. ¡Ven!\' Esta apertura clásica funciona porque casi todo el mundo tiene la piel seca, especialmente después de un día viajando.',
          'EL GANCHO SENSORIAL: \'¿Quieres sentir algo increíble? Esto es del Mar Muerto, el lugar más bajo de la Tierra, la concentración mineral más alta. Tus manos nunca se han sentido tan suaves.\'',
          'EL ÁNGULO DEL REGALO: \'¿Buscas regalos de Navidad? Este es el más popular, a todo el mundo le encanta, es unisex, y de verdad es útil. Siente esto...\'',
          'EL LEGADO DEL COVID: \'Desde el Covid, las manos de todos están muy resecas por el sanitizante. Este se convirtió en nuestro #1 en ventas, la gente decía, \'¡Por fin algo que de verdad ayuda!\'\'',
        ],
    },
    {
            type: 'script',
      text: '\'Do you ever get dry skin, especially in winter? Let me show you something from the Dead Sea. Rub this on your hand... now add water... feel that? That\'s not just soft — that\'s mineral-treated skin. And it lasts even after you wash your hands.\' Interactive demo + education.',
      textEs: '\'¿Te reseca la piel a veces, especialmente en invierno? Déjame mostrarte algo del Mar Muerto. Frota esto en tu mano... ahora agrega agua... ¿sientes eso? Eso no es solo suavidad, es piel tratada con minerales. Y dura incluso después de lavarte las manos.\' Demo interactiva + educación.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Nail Kit Stop',
      textEs: 'La Parada del Kit de Uñas',
    },
    {
            type: 'paragraph',
      text: 'Where this line lands hardest: natural nails with no heavy polish, nails somebody clearly looks after, people shopping for presents, anybody who tells you they hate what the salon does to them.',
      textEs: 'Dónde pega más fuerte esta frase: uñas naturales sin esmalte grueso, uñas que alguien se cuida claramente, quien va comprando regalos, cualquiera que te diga que odia lo que le hacen en el salón.',
    },
    {
            type: 'bullets',
      items: [
        'THE NATURAL NAIL APPRECIATION: \'Wow! You always keep your nails natural? That\'s awesome. Let me give you a small gift — you\'re gonna love this.\'',
        'THE CONTRAST APPROACH: \'I see you have polish on — that\'s pretty! But you know what? Let me show you how gorgeous your natural nail can look without any chemicals.\'',
        'THE GIFT APPROACH: \'These make the perfect gifts — small, elegant, and everyone actually uses them. Watch this...\'',
        'THE SALON ALTERNATIVE: \'This replaces salon visits. Natural shine that lasts two weeks, no chemicals, lifetime warranty. Look at this...\''
      ],
      itemsEs: [
          'LA APRECIACIÓN DE UÑAS NATURALES: \'¡Wow! ¿Siempre llevas tus uñas naturales? Eso es genial. Déjame darte un pequeño regalo, te va a encantar esto.\'',
          'EL ENFOQUE DE CONTRASTE: \'Veo que llevas esmalte, ¡está bonito! Pero ¿sabes qué? Déjame mostrarte qué tan hermosa puede verse tu uña natural sin ningún químico.\'',
          'EL ENFOQUE DE REGALO: \'Estos son los regalos perfectos, pequeños, elegantes, y todo el mundo de verdad los usa. Mira esto...\'',
          'LA ALTERNATIVA AL SALÓN: \'Esto reemplaza las visitas al salón. Brillo natural que dura dos semanas, sin químicos, garantía de por vida. Mira esto...\'',
        ],
    },
    {
            type: 'script',
      text: '\'Wow, you keep your nails so natural and healthy! Let me show you something — this isn\'t a regular buffer. It brings out your natural shine without any polish or chemicals. Watch... see? Nothing yet. Now the last step... WOW. That is YOUR natural nail. No polish. It stays like this for two weeks.\' Build anticipation, deliver the reveal.',
      textEs: '\'¡Wow, mantienes tus uñas tan naturales y saludables! Déjame mostrarte algo, este no es un pulidor común. Saca tu brillo natural sin ningún esmalte ni químicos. Mira... ¿ves? Aún nada. Ahora el último paso... WOW. Esa es TU uña natural. Sin esmalte. Se queda así por dos semanas.\' Genera anticipación, entrega la revelación.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'One Line In. Then You Let Go.',
      textEs: 'Una Frase para Entrar. Y Luego Sueltas.',
    },
    {
            type: 'paragraph',
      text: 'Never open with two products. Two options at four metres is a decision, and a stranger walking past does not want to make one — they want to be pulled in by one clear thing. So you pick your line, you get them through the door, and then you are done with the choosing.',
      textEs: 'Nunca abras con dos productos. Dos opciones a cuatro metros son una decisión, y un desconocido que va pasando no quiere tomar ninguna — quiere que algo claro tire de él. Así que eliges tu frase, los metes por la puerta, y ahí se te acaba lo de elegir.',
    },
    {
            type: 'bullets',
      items: [
        'THE LINE IS A DOOR, NOT A CONTRACT: you opened on nails and the demo goes to the eyes? Perfect. Nobody sat down expecting a menu. Whatever got them in has done its whole job.',
        'THE EYES ARE WHAT THE SHOP SELLS: whichever line worked, the syringe is what the day is counted in. The scrub and the nail kit are how you learn to sell and how you keep the energy up — they are not the target.',
        'IN YOUR FIRST TWO WEEKS YOU DO NOT DEMO AT ALL: you stop, you bring them in, you hand them to a colleague and you go straight back out. That is the entire job and it is the hardest part of it.',
        'COMBOS ARE NOT A STOPPING TOOL: the small products share one ladder — two for {currency}60, three for {currency}120 — and that belongs to whoever is sitting in the chair with them, not to your opening line on the pavement.'
      ],
      itemsEs: [
          'LA FRASE ES UNA PUERTA, NO UN CONTRATO: ¿has abierto por las uñas y la demo se va a los ojos? Perfecto. Nadie se ha sentado esperando un menú. Lo que los ha metido dentro ya ha hecho todo su trabajo.',
          'LO QUE VENDE LA TIENDA SON LOS OJOS: haya funcionado la frase que sea, la jeringa es lo que cuenta en el día. El exfoliante y el kit de uñas son cómo aprendes a vender y cómo mantienes la energía — no son el objetivo.',
          'EN TUS PRIMERAS DOS SEMANAS NO HACES DEMOS: paras, los metes dentro, se los pasas a un compañero y sales otra vez. Ese es el trabajo entero y es la parte más difícil.',
          'LOS COMBOS NO SON UNA HERRAMIENTA DE PARADA: los productos pequeños comparten escalera — dos por {currency}60, tres por {currency}120 — y eso es de quien esté sentado con ellos, no de tu frase de apertura en la acera.',
        ],
    },
    {
            type: 'tip',
      text: 'If you catch yourself listing things on the pavement, you have already lost the stop. One line, one product, one reason to follow you in. Everything else happens sitting down.',
      textEs: 'Si te pillas enumerando cosas en la acera, ya has perdido la parada. Una frase, un producto, un motivo para entrar detrás de ti. Todo lo demás pasa sentados.',
    },
    {
            type: 'quote',
      text: 'The best stops don\'t feel like stops. They feel like a friend noticing something about you. Notice something true, say it, and walk them in — the rest of the shop can take it from there.',
      textEs: 'Las mejores paradas no parecen paradas. Parecen un amigo que se ha fijado en algo tuyo. Fíjate en algo de verdad, dilo, y mételes dentro — el resto de la tienda ya sigue desde ahí.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    /* No inline quiz. LESSON_QUIZZES['stop-5'] OVERLAYS whatever sits here, so
       this was unreachable code. Two of the three are now wrong anyway: "who is
       the best TARGET for the Syringe stop" reads as a filter to a first-week
       seller, and the third's explanation ends "once engaged, you can introduce
       combos and additional products" — which is neither this lesson nor this
       seller's job. Both live copies are in lessonQuizzes.ts. */
  },
  'stop-6': {
    id: 'stop-6',
    categoryId: 'stopping',
    title: 'The Recovery Stop',
    titleEs: 'La Parada de Recuperación',
    subtitle: 'What to do when they say \'no\' — second attempts, seed planting, and graceful exits',
    subtitleEs: 'Qué hacer cuando dicen \'no\' — segundos intentos, sembrar la idea y salir con elegancia',
    duration: '8 min',
    icon: 'RotateCcw',
    order: 6,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: '\'No\' Is Not the End. It\'s Just the Beginning.',
      textEs: 'El \'No\' No Es el Final. Es Solo el Principio.',
    },
    {
            type: 'paragraph',
      text: 'Most sellers hear \'no thanks\' and that is the end of it. But \'no\' out here usually means \'not yet\', or \'not that one\', or \'you caught me mid-thought\'. The recovery is the one more line you throw after the no — not to wear anybody down, but to find out whether the no was real.',
      textEs: 'La mayoría de los vendedores oyen \'no, gracias\' y ahí se acaba todo. Pero aquí fuera el \'no\' casi siempre quiere decir \'ahora no\', o \'ese no\', o \'me has pillado pensando en otra cosa\'. La recuperación es esa frase de más que sueltas después del no — no para desgastar a nadie, sino para averiguar si el no iba en serio.',
    },
    {
            type: 'keypoint',
      text: 'That first \'no thanks\' is not a decision. They said it before they had even heard you — it is a reflex, the same as saying \'fine\' when somebody asks how you are. It costs you one more line to find out whether they meant it. Most sellers on this street never spend that line. That is your edge.',
      textEs: 'Ese primer \'no, gracias\' no es una decisión. Lo han dicho antes incluso de escucharte — es un acto reflejo, igual que decir \'bien\' cuando te preguntan qué tal estás. Te cuesta una frase más averiguar si lo decían en serio. Casi ningún vendedor de esta calle gasta esa frase. Ahí está tu ventaja.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Why They Said No (And What to Do About It)',
      textEs: 'Por Qué Dijeron No (Y Qué Hacer Al Respecto)',
    },
    {
            type: 'paragraph',
      text: 'Not all \'nos\' are equal. Understanding which type you\'re dealing with determines your recovery strategy:',
      textEs: 'No todos los \'nos\' son iguales. Entender con cuál tipo te enfrentas determina tu estrategia de recuperación:',
    },
    {
            type: 'bullets',
      items: [
        'THE REFLEX NO: Automatic, without thinking. They didn\'t even process what you said. Response: Acknowledge and re-engage with humor or curiosity.',
        'THE RUSH NO: \'No thanks, I\'m in a hurry.\' They have somewhere to be. Response: Respect the time constraint, offer a faster alternative.',
        'THE SKEPTICAL NO: \'I don\'t believe you.\' They\'ve been burned before. Response: Social proof, evidence, or a no-risk trial.',
        'THE BUDGET NO: \'I can\'t afford it.\' Nobody says this at the top of the ladder — by the time it lands you have already walked her down, so you are not defending {currency}300 any more, you are fighting for {currency}140 and sometimes {currency}100. Response: say the number you are actually standing on, put a reason on the next rung down, and make that last price sound like something you bent for her — not something that was sitting there. Never say \'come back when you can\' — she does not come back.',
        'THE POLITE NO: \'No thank you.\' Said gently, often with a smile. They are not interested YET and they are being polite about it. Response: they have not heard a price, a product or a reason — so you have not been turned down, you have been brushed past. Give them the one line you have not used and put something in their hand.'
      ],
      itemsEs: [
          'EL NO REFLEJO: Automático, sin pensar. Ni siquiera procesaron lo que dijiste. Respuesta: Reconoce y vuelve a interactuar con humor o curiosidad.',
          'EL NO POR PRISA: \'No gracias, tengo prisa.\' Tienen algún lugar al que ir. Respuesta: Respeta la limitación de tiempo, ofrece una alternativa más rápida.',
          'EL NO ESCÉPTICO: \'No te creo.\' Los han quemado antes. Respuesta: Prueba social, evidencia, o una prueba sin riesgo.',
          'EL NO POR DINERO: \'No me lo puedo permitir.\' Esto no lo dice nadie arriba de la escalera — cuando llega ya la has bajado, así que ya no estás defendiendo {currency}300, estás peleando por {currency}140 y a veces por {currency}100. Respuesta: di el número en el que estás de verdad, pon un motivo en el escalón siguiente y haz que ese último precio suene a algo que has doblado por ella — no a algo que ya estaba ahí. Nunca \'vuelve cuando puedas\'. No vuelve.',
          'EL NO EDUCADO: \'No, gracias.\' Dicho suavemente, a menudo con una sonrisa. TODAVÍA no están interesados y encima son educados. Respuesta: no han oído ni precio, ni producto, ni motivo — así que no te han dicho que no, te han esquivado con buenos modales. Suelta la frase que aún no has usado y ponles algo en la mano.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Second Attempt Techniques',
      textEs: 'Técnicas de Segundo Intento',
    },
    {
            type: 'paragraph',
      text: 'When the first stop fails, try one of these recovery approaches:',
      textEs: 'Cuando la primera parada falla, prueba uno de estos enfoques de recuperación:',
    },
    {
            type: 'numbered',
      items: [
        'THE HUMOR RECOVERY: \'I know, I know — you weren\'t planning to stop today. But I promise you, this is the one time you\'ll be glad you did. Thirty seconds?\' Humor disarms the automatic \'no.\'',
        'THE CURIOSITY HOOK: \'I get it — you\'re busy. But can I ask you something? When was the last time a stranger showed you something that actually impressed you?\' Curiosity overrides rejection.',
        'THE TIME RECOVERY: \'Ah, don\'t worry about it. How about this — I won\'t even explain anything. Just let me do it. If you don\'t love it in thirty seconds, you walk off. Deal?\' Takes away the fear of being stuck with you for ten minutes.',
        'THE SOCIAL PROOF RECOVERY: \'You know what? Every single person who just walked past me said the same thing. And every single one who came back to try it bought something. I\'m just saying...\' Creates intrigue through social proof.',
        'THE GIFT REFRAME: \'I know you weren\'t looking for it, but I want to GIVE you something. No purchase, no catch. Just a free hand treatment because your hands deserve it.\' Reframing as a gift removes the sales pressure.'
      ],
      itemsEs: [
          'LA RECUPERACIÓN CON HUMOR: \'Lo sé, lo sé, no planeabas parar hoy. Pero te prometo que esta es la única vez en la que te alegrarás de haberlo hecho. ¿Treinta segundos?\' El humor desarma el \'no\' automático.',
          'EL GANCHO DE LA CURIOSIDAD: \'Lo entiendo, estás ocupado. Pero ¿puedo preguntarte algo? ¿Cuándo fue la última vez que un desconocido te mostró algo que realmente te impresionó?\' La curiosidad anula el rechazo.',
          'LA RECUPERACIÓN POR TIEMPO: \'Ah, no te preocupes por eso. ¿Qué tal esto? No te explico nada. Déjame hacerlo y ya está. Si no te encanta en treinta segundos, te vas. ¿Trato?\' Les quita el miedo a quedarse contigo diez minutos.',
          'LA RECUPERACIÓN CON PRUEBA SOCIAL: \'¿Sabes qué? Cada persona que acaba de pasar a mi lado dijo lo mismo. Y cada una de las que volvieron a probarlo compró algo. Solo digo...\' Crea intriga a través de la prueba social.',
          'EL replanteo COMO REGALO: \'Sé que no lo estabas buscando, pero quiero DARTE algo. Sin compra, sin truco. Solo un tratamiento de manos gratis porque tus manos lo merecen.\' Replantearlo como un regalo elimina la presión de venta.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Humorous Recovery Lines',
      textEs: 'Líneas de Recuperación Humorísticas',
    },
    {
            type: 'paragraph',
      text: 'These work best with customers who smiled or seemed friendly even while saying no:',
      textEs: 'Estas funcionan mejor con clientes que sonrieron o parecieron amigables incluso mientras decían que no:',
    },
    {
            type: 'bullets',
      items: [
        '\'You\'re breaking my heart! Just kidding — but seriously, you\'re missing out.\'',
        '\'Okay, but when you walk past our shop later and see everyone smiling inside, you\'ll wonder what you missed.\'',
        '\'Go on then. But I\'m telling you now — you\'ll be thinking about me over dinner.\' (Cheeky, and it does not hand them a reason to postpone.)',
        '\'My manager is watching — can you at least pretend to be interested for 10 seconds?\' (Self-deprecating humor that creates connection.)',
        '\'That\'s the fourth \'no\' in a row. You\'re all going to make me cry!\' (Playful, not desperate.)'
      ],
      itemsEs: [
          '\'¡Me estás rompiendo el corazón! Es broma, pero en serio, te estás perdiendo de algo.\'',
          '\'Está bien, pero cuando pases frente a nuestra tienda más tarde y veas a todos sonriendo adentro, te preguntarás qué te perdiste.\'',
          '\'Venga, vale. Pero te aviso — vas a estar pensando en mí durante la cena.\' (Con guasa, y sin darles una excusa para dejarlo para luego.)',
          '\'Mi encargado está viendo, ¿puedes al menos fingir interés por 10 segundos?\' (Humor autocrítico que crea conexión.)',
          '\'Ese es el cuarto \'no\' seguido. ¡Todos me van a hacer llorar!\' (Juguetón, no desesperado.)',
        ],
    },
    {
            type: 'tip',
      text: 'Recovery humor only works if your energy is genuinely playful, not needy. If you feel desperate, customers sense it. Recover from a place of abundance (\'I have something great to show you\') not scarcity (\'Please, I need this sale\').',
      textEs: 'El humor de recuperación solo funciona si tu energía es genuinamente juguetona, no necesitada. Si te sientes desesperado, los clientes lo sienten. Recupérate desde un lugar de abundancia (\'Tengo algo genial para mostrarte\') no de escasez (\'Por favor, necesito esta venta\').',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Last Line You Leave Them With',
      textEs: 'La Última Frase Que Les Dejas',
    },
    {
            type: 'paragraph',
      text: 'If the second attempt lands, you are back in business. If it genuinely does not, the last line still matters — but it is a line that buys you one more second here, never one that arms them to deal with you some other day:',
      textEs: 'Si el segundo intento entra, ya estás otra vez dentro. Y si de verdad no entra, la última frase sigue importando — pero es una frase que te compra un segundo más aquí, nunca una que les dé con qué dejarte para otro día:',
    },
    {
            type: 'script',
      text: '\'No problem at all! Enjoy your day in {locationName}. But hey — when you see someone walk out of our shop with that \'wow\' look on their face, remember I offered!\' Said with a grin over your shoulder, this turns people round on the spot more often than any pitch does. Deliver it like a joke, not like a goodbye.',
      textEs: '\'¡No pasa nada! Disfruta el día en {locationName}. Pero oye — cuando veas a alguien salir de nuestra tienda con esa cara de \'guau\', ¡acuérdate de que te lo ofrecí!\' Dicho con una sonrisa por encima del hombro, esto hace que se den la vuelta ahí mismo más que ningún discurso. Suéltalo como una broma, no como una despedida.',
    },
    {
            type: 'bullets',
      items: [
        'NOTHING GOES IN THEIR POCKET: No card, no flyer, no price written on anything. It feels helpful and it is the most expensive thing you can hand a person — you have just given them permission to go and think about it somewhere you are not standing.',
        'POINT AT THE TABLE, NOT AT TOMORROW: \'It is two steps. Put your hand on it and then tell me no.\' A tiny, specific ask beats an open invitation every single time.',
        'NAME THE THING THEY WERE LOOKING AT: \'You did not take your eyes off that peeling. Sixty seconds and you will know.\' Being properly seen is what turns a walker around.',
        'IF THE NO IS REAL, MEAN IT: \'Fair enough, gorgeous — have a lovely day.\' Warm, quick, nothing attached to it. Then straight back to the pavement, because the next one is already walking past you.'
      ],
      itemsEs: [
          'QUE NO SE LLEVEN NADA EN EL BOLSILLO: Ni tarjeta, ni folleto, ni el precio apuntado en ningún sitio. Parece un detalle y es lo más caro que le puedes dar a nadie — acabas de darle permiso para irse a pensarlo donde tú no estás.',
          'SEÑALA LA MESA, NO EL MAÑANA: \'Si son dos pasos. Pon la mano aquí y luego me dices que no.\' Una petición pequeña y concreta gana siempre a una invitación abierta.',
          'NOMBRA LO QUE ESTABAN MIRANDO: \'No le has quitado el ojo de encima al peeling. Sesenta segundos y lo sabes.\' Que se sientan vistos de verdad es lo que hace que se den la vuelta.',
          'SI EL NO ES DE VERDAD, QUE SEA DE VERDAD: \'Nada, guapa, que tengas buen día.\' Con cariño, rápido y sin nada colgando. Y vuelta a la acera, que el siguiente ya está pasando por delante.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Knowing When to Let Go',
      textEs: 'Saber Cuándo Soltar',
    },
    {
            type: 'paragraph',
      text: 'This is critical: recovery stops work, but pushy persistence doesn\'t. There\'s a line between persistence and harassment. Here\'s how to know when to stop:',
      textEs: 'Esto es crítico: las paradas de recuperación funcionan, pero la persistencia agresiva no. Hay una línea entre la persistencia y el acoso. Aquí te decimos cuándo detenerte:',
    },
    {
            type: 'bullets',
      items: [
        'ONE RECOVERY ATTEMPT: One more line after the no. That is the whole point of this lesson and it costs you nothing.',
        'TWO RECOVERY ATTEMPTS: If the first recovery fails and they seem receptive, a second (different) approach is acceptable.',
        'THREE OR MORE: This is pushing. If two attempts fail, let them go gracefully. Pursuing further damages your reputation and the shop\'s reputation.',
        'BODY LANGUAGE SIGNALS: Crossed arms, stepping away, flat expression, no engagement — these are definitive \'stop\' signals. Respect them immediately.',
        'VERBAL SHUTDOWN: \'Please leave me alone,\' \'I said no,\' or aggressive language means immediate disengagement. Smile, apologize, and step back.'
      ],
      itemsEs: [
          'UN INTENTO DE RECUPERACIÓN: Una frase más después del no. De eso va toda esta lección y no te cuesta nada.',
          'DOS INTENTOS DE RECUPERACIÓN: Si la primera recuperación falla y parecen receptivos, un segundo enfoque (diferente) es aceptable.',
          'TRES O MÁS: Esto es ser insistente. Si dos intentos fallan, déjalos ir con elegancia. Seguir insistiendo daña tu reputación y la reputación de la tienda.',
          'SEÑALES DE LENGUAJE CORPORAL: Brazos cruzados, alejarse, expresión plana, sin interacción, estas son señales definitivas de \'detente.\' respétalas de inmediato.',
          'CIERRE VERBAL: \'Por favor déjame en paz,\' \'Ya te dije que no,\' o lenguaje agresivo significa desvinculación inmediata. Sonríe, discúlpate, y retrocede.',
        ],
    },
    {
            type: 'quote',
      text: 'Two lines after the no, and then you are done — not because they might come back tomorrow, they will not, but because you gave that one everything it was worth and the next one is already walking towards you. A desperate chase costs you the person behind them.',
      textEs: 'Dos frases después del no y se acabó — no porque vayan a volver mañana, que no van a volver, sino porque a esa le has dado todo lo que valía y la siguiente ya viene andando hacia ti. Perseguir a la desesperada te cuesta la persona que venía detrás.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'Why is the first \'no thanks\' worth one more line?',
      options: [
        'Because most people give in if you keep at them long enough',
        'Because it is usually a reflex, said before they heard you',
        'Because the shop counts every approach you make in a shift',
        'Because a customer who says no twice is ready to be closed'
      ],
      correctIndex: 1,
      explanation: 'The first no comes out before they have processed a word you said — the same as saying \'fine\' when somebody asks how you are. One more line finds out whether they meant it, and most sellers never spend it.',
    },
    {
      question: 'What is the \'seed planting\' technique?',
      options: [
        'Forcing a sale through repeated attempts',
        'Planting a curiosity seed that may bring the customer back later',
        'Giving them a physical plant as a gift',
        'Asking them to plant a tree'
      ],
      correctIndex: 1,
      explanation: 'Seed planting means leaving the customer with a positive, curiosity-inducing final impression that may bring them back later. It references what they might see or feel after leaving.',
    },
    {
      question: 'How many recovery attempts should you generally make before letting go?',
      options: [
        'As many as it takes',
        'One, or two if they are still smiling — then let it go',
        'Never attempt recovery — respect the first no',
        'Five or more, because insisting is what wears people down'
      ],
      correctIndex: 1,
      explanation: 'One more line is free. A second one is fine if they are still with you. A third turns a bit of banter into somebody following them up the street, and that is the shop\'s reputation, not just yours.',
    }
    ],
  },
  'stop-7': {
    id: 'stop-7',
    categoryId: 'stopping',
    title: 'Finding YOUR Stopping Style',
    titleEs: 'Encontrando TU Estilo de Parada',
    subtitle: 'Why copying others does not work — assessing your personality and building your unique approach',
    subtitleEs: 'Descubre qué funciona para ti',
    duration: '8 min',
    icon: 'Compass',
    order: 7,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Your Best Style Is the One That Fits YOU',
      textEs: 'Tu Mejor Estilo Es el Que Te Queda a TI',
    },
    {
            type: 'paragraph',
      text: 'New salespeople often try to copy the top performer verbatim. They use the same words, the same gestures, the same energy. And it falls flat. Why? Because the top performer has found a style that fits THEIR personality — their humor, their energy, their body language, their voice. You need to find YOURS. The goal isn\'t to be a clone. It\'s to be the best version of yourself on the floor.',
      textEs: 'Los vendedores nuevos a menudo intentan copiar al mejor vendedor palabra por palabra. Usan las mismas palabras, los mismos gestos, la misma energía. Y cae plano. ¿Por qué? Porque el mejor vendedor ha encontrado un estilo que se ajusta a SU personalidad, su humor, su energía, su lenguaje corporal, su voz. Tú necesitas encontrar el TUYO. La meta no es ser un clon. Es ser la mejor versión de ti mismo en el piso.',
    },
    {
            type: 'keypoint',
      text: 'There is no single \'best\' stopping style. The best style is the one that feels authentic to YOU while being effective with customers. A calm, warm seller can outsell a high-energy seller — if they lean into their strengths.',
      textEs: 'No existe un único estilo de parada \'mejor.\' El mejor estilo es el que se siente auténtico para TI mientras es efectivo con los clientes. Un vendedor tranquilo y cálido puede vender más que uno de alta energía, si aprovechan sus fortalezas.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Personality Assessment: Who Are You on the Floor?',
      textEs: 'Evaluación de Personalidad: ¿Quién Eres en el Piso?',
    },
    {
            type: 'paragraph',
      text: 'Before choosing your style, honestly assess your natural tendencies:',
      textEs: 'Antes de elegir tu estilo, evalúa honestamente tus tendencias naturales:',
    },
    {
            type: 'bullets',
      items: [
        'HIGH ENERGY or CALM? Do you naturally speak fast, move quickly, and radiate enthusiasm? Or are you more measured, warm, and steady? Both work — but forcing calm when you\'re energetic (or vice versa) feels fake.',
        'DIRECT or INDIRECT? Straight to the point, or a bit of chat first? Some of you go in hard and some of you need to warm them up. Both work. Faking the other one does not.',
        'HUMOUR or STRAIGHT? Are you actually funny? Do people laugh around you? If yes, that is your weapon. If not, do not force it — warm and straight sells just as much, and a forced joke sells nothing.',
        'VERBAL or PHYSICAL? Some sellers captivate with words — smooth talkers. Others captivate with the demo — the product does the talking. Know which one you are.'
      ],
      itemsEs: [
          '¿ALTA ENERGÍA o CALMA? ¿Hablas rápido naturalmente, te mueves con rapidez, y irradias entusiasmo? ¿O eres más mesurado, cálido, y constante? Ambos funcionan, pero forzar la calma cuando eres enérgico (o viceversa) se siente falso.',
          '¿DIRECTO o CON RODEOS? ¿Al grano, o un poco de charla primero? Algunos entráis a saco y otros necesitáis calentarlo antes. Las dos cosas funcionan. Fingir la otra no.',
          '¿HUMOR o SERIEDAD? ¿Eres gracioso de verdad? ¿La gente se ríe contigo? Si sí, esa es tu arma. Si no, no lo fuerces — cálido y directo vende igual, y un chiste forzado no vende nada.',
          '¿VERBAL o FÍSICO? Algunos vendedores cautivan con palabras, grandes conversadores. Otros cautivan con la demo, el producto habla por sí mismo. Saber cuál eres tú.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Four Stopping Archetypes',
      textEs: 'Cuatro Arquetipos de Parada',
    },
    {
            type: 'paragraph',
      text: 'These archetypes aren\'t boxes — they\'re starting points. Most people blend two:',
      textEs: 'Estos arquetipos no son cajas, son puntos de partida. La mayoría de las personas combina dos:',
    },
    {
            type: 'numbered',
      items: [
        'THE ENERGIZER: High energy, fast-paced, loud and proud. Uses humor, excitement, and enthusiasm to draw people in. Best for: young crowds, groups, holiday shoppers, anybody already in a good mood. Risk: can overwhelm a quiet customer, and it burns you out by four o\'clock if you never come down.',
        'THE WARM INVITER: Calm, warm, genuinely caring. Builds rapport quickly and quietly. Uses gentle curiosity and kindness. Best for: couples, older customers, wary customers, the person who wants to ask you things. Risk: without real attention behind it, calm just reads as flat.',
        'THE EXPERT: Knowledgeable, confident, authority-driven. Leads with facts and lets the product speak. Best for: Analytical buyers, French tourists, skeptical customers. Risk: Can feel cold without enough warmth.',
        'THE CHAMELEON: Adapts to each customer. High energy with energetic people, calm with calm people. Flexible and observant. Best for: Sellers with strong empathy and reading skills. Risk: Can feel inconsistent if not grounded in authenticity.'
      ],
      itemsEs: [
          'EL ENERGIZADOR: Alta energía, ritmo rápido, fuerte y orgulloso. Usa humor, emoción y entusiasmo para atraer gente. Ideal para: gente joven, grupos, compradores navideños, cualquiera que ya venga de buen humor. Riesgo: puede abrumar a un cliente callado, y te deja frito a las cuatro de la tarde si no bajas nunca.',
          'EL INVITADOR CÁLIDO: Tranquilo, cálido, cercano de verdad. Construye conexión rápido y sin ruido. Usa curiosidad amable y buen trato. Ideal para: parejas, clientes mayores, gente desconfiada, quien quiere preguntarte cosas. Riesgo: sin atención real detrás, la calma solo parece desgana.',
          'EL EXPERTO: Conocedor, confiado, guiado por la autoridad. Lidera con hechos y deja que el producto hable. Ideal para: Compradores analíticos, turistas franceses, clientes escépticos. Riesgo: Puede sentirse frío sin suficiente calidez.',
          'EL CAMALEÓN: Se adapta a cada cliente. Alta energía con gente enérgica, calmado con gente tranquila. Flexible y observador. Ideal para: Vendedores con fuerte empatía y habilidad de lectura. Riesgo: Puede sentirse inconsistente si no está anclado en la autenticidad.',
        ],
    },
    {
            type: 'comparison',
      left: { label: 'High-Energy Approach', text: '\'HEY! Oh my gosh, you have to see this! Come here, come here — two minutes, I promise you\'ll freak out!\' Works brilliantly for some. Exhausting and off-putting for others. Use when the situation matches your natural enthusiasm.' },
      leftEs: { label: 'Enfoque de Alta Energía', text: '\'¡HEY! ¡Dios mío, tienes que ver esto! ¡Ven aquí, ven aquí, dos minutos, te prometo que te vas a alucinar!\' Funciona brillantemente para algunos. Agotador y repelente para otros. Úsalo cuando la situación coincida con tu entusiasmo natural.' },
      right: { label: 'Calm Approach', text: '\'Excuse me — I know you\'re busy, but I have something that might surprise you. Just two minutes, and if you don\'t love it, no hard feelings.\' Warm, respectful, confident. Some customers prefer this 100% of the time.' },
      rightEs: { label: 'Acercamiento Tranquilo', text: '\'Perdona — sé que vas liado, pero tengo algo que a lo mejor te sorprende. Solo dos minutos, y si no te encanta, no pasa nada.\' Cálido, respetuoso, seguro. Hay clientes que prefieren esto el 100% de las veces.' }
    },
    {
            type: 'keypoint',
      text: 'Your style is yours. What the day does change is how hard you work each person. A dead morning is when you try HARDER — you go after the ones you would let walk on a Saturday, because the four people who come past might be the whole day. A packed afternoon is the opposite: keep it tight, do not grind water with one person, because the moment you finish there is another one right outside.',
      textEs: 'Tu estilo es tuyo. Lo que sí cambia con el día es lo fuerte que trabajas a cada persona. Una mañana muerta es cuando MÁS lo intentas — vas a por los que un sábado dejarías pasar, porque las cuatro personas que pasen igual son el día entero. Una tarde a tope es lo contrario: al grano, no le des vueltas al agua con una sola persona, porque en cuanto termines hay otra ahí fuera.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'One Morning, Two Hours',
      textEs: 'Una Mañana, Dos Horas',
    },
    {
            type: 'paragraph',
      text: 'You can find this out in a morning. You do not need a month of it:',
      textEs: 'Esto lo averiguas en una mañana. No hace falta un mes:',
    },
    {
            type: 'numbered',
      items: [
        'DO AN HOUR LOUD: Big, fast, straight in. Louder than is comfortable. Count how many came through the door.',
        'DO AN HOUR QUIET: Slow it right down, warm it up, get them talking before you get to the product. Count again.',
        'READ YOUR OWN NUMBERS: One of those two hours beat the other, and it will not always be the one you expected. That is your answer, and it took you a morning.',
        'THEN STOP TESTING AND GO: Lean into whichever won and stop worrying about the other one. You can borrow bits off it later, once the main thing is second nature.'
      ],
      itemsEs: [
          'HAZ UNA HORA A LO GRANDE: Alto, rápido, entrando a saco. Más alto de lo que te resulta cómodo. Cuenta cuántos entraron por la puerta.',
          'HAZ UNA HORA TRANQUILA: Baja el ritmo del todo, ponlo cálido, hazles hablar antes de llegar al producto. Cuenta otra vez.',
          'LEE TUS PROPIOS NÚMEROS: Una de esas dos horas le ha ganado a la otra, y no siempre es la que esperabas. Esa es tu respuesta, y te ha costado una mañana.',
          'Y AHORA DEJA DE PROBAR Y VE: Tira por la que ha ganado y olvídate de la otra. Ya le cogerás cosas más adelante, cuando lo principal te salga solo.',
        ],
    },
    {
            type: 'tip',
      text: 'Two numbers at the end of each hour: how many you stopped, and how many sat down. That is all the tracking you need. The feeling lies about which hour went better — you will swear the loud one flopped and then find it did not. The numbers do not lie.',
      textEs: 'Dos números al final de cada hora: a cuántos paraste y cuántos se sentaron. Con eso te sobra. La sensación miente sobre qué hora ha ido mejor — jurarías que la hora a lo grande fue un desastre y luego resulta que no. Los números no mienten.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Recording Yourself',
      textEs: 'Grábate a Ti Mismo',
    },
    {
            type: 'paragraph',
      text: 'This is uncomfortable but incredibly valuable. Ask a teammate to record a few of your stops on your phone. Then watch the footage. You\'ll notice things you never knew you did:',
      textEs: 'Esto es incómodo pero increíblemente valioso. Pídele a un compañero que te grabe algunas de tus paradas con el móvil. Luego mira el video. Notarás cosas que nunca supiste que hacías:',
    },
    {
            type: 'bullets',
      items: [
        'BODY LANGUAGE: Are your arms crossed? Are you leaning away? Is your posture confident or collapsed?',
        'FACIAL EXPRESSION: Are you genuinely smiling or forcing it? Do your eyes match your mouth?',
        'VOICE: Do you sound confident? Do you speak too fast? Do you end statements like questions (upspeak)?',
        'TIMING: Are you giving them space to respond? Or are you rushing through your pitch?',
        'TRANSITION: How do you move from opener to demo? Is it smooth or awkward?'
      ],
      itemsEs: [
          'LENGUAJE CORPORAL: ¿Tienes los brazos cruzados? ¿Te estás inclinando hacia atrás? ¿Tu postura es confiada o encogida?',
          'EXPRESIÓN FACIAL: ¿Estás sonriendo genuinamente o forzándolo? ¿Tus ojos coinciden con tu boca?',
          'VOZ: ¿Suenas confiado? ¿Hablas demasiado rápido? ¿Terminas las afirmaciones como si fueran preguntas (entonación ascendente)?',
          'RITMO: ¿Les estás dando espacio para responder? ¿O estás apurando tu pitch?',
          'TRANSICIÓN: ¿Cómo pasas de la apertura a la demo? ¿Es suave o torpe?',
        ],
    },
    {
            type: 'tip',
      text: 'Record yourself once per month. It\'s the fastest way to see your progress. Most people are shocked by how much they\'ve improved after just one month of recording and adjusting.',
      textEs: 'Grábate una vez por mes. Es la forma más rápida de ver tu progreso. La mayoría de las personas se sorprende de cuánto han mejorado después de solo un mes de grabarse y ajustarse.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Getting Feedback from Teammates',
      textEs: 'Obtener Retroalimentación de tus Compañeros',
    },
    {
            type: 'paragraph',
      text: 'Your teammates see you from the outside. Their feedback is gold. Here\'s how to get useful feedback:',
      textEs: 'Tus compañeros te ven desde afuera. Su retroalimentación es oro. Aquí te decimos cómo obtener retroalimentación útil:',
    },
    {
            type: 'bullets',
      items: [
        'ASK SPECIFIC QUESTIONS: Not \'How am I doing?\' but \'Did my energy seem high or low during that last stop?\' or \'Was my opener clear?\' Specific questions get specific answers.',
        'ASK YOUR TOP PERFORMER: \'What do you think is my biggest opportunity for improvement?\' Top performers usually have sharp observational skills.',
        'ASK SOMEONE YOU TRUST: Feedback feels safer from someone who cares about you. Find a teammate you trust and ask for honest input.',
        'RECEIVE WITHOUT DEFENSIVENESS: When someone gives feedback, say \'Thank you\' and process it. Defensive reactions shut down future feedback.'
      ],
      itemsEs: [
          'HAZ PREGUNTAS ESPECÍFICAS: No \'¿Cómo me va?\' sino \'¿Mi energía pareció alta o baja durante esa última parada?\' o \'¿Mi apertura fue clara?\' Las preguntas específicas obtienen respuestas específicas.',
          'PREGÚNTALE A TU MEJOR VENDEDOR: \'¿Qué crees que es mi mayor oportunidad de mejora?\' Los mejores vendedores suelen tener habilidades de observación agudas.',
          'PREGÚNTALE A ALGUIEN EN QUIEN CONFÍES: La retroalimentación se siente más segura de alguien que se preocupa por ti. Encuentra un compañero en quien confíes y pídele una opinión honesta.',
          'RECIBE SIN DEFENSIVIDAD: Cuando alguien te da retroalimentación, di \'Gracias\' y procésala. Las reacciones defensivas cierran la puerta a futura retroalimentación.',
        ],
    },
    {
            type: 'quote',
      text: 'The best stopping style isn\'t the one that looks best on someone else. It\'s the one that makes you feel confident, authentic, and effective. Find it, refine it, own it.',
      textEs: 'El mejor estilo de parada no es el que se ve mejor en alguien más. Es el que te hace sentir confiado, auténtico, y efectivo. Encuéntralo, reflínelo, aduéñate de él.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'Why is copying the top performer\'s style verbatim usually ineffective?',
      options: [
        'Because the top performer is naturally talented',
        'Because the top performer\'s style fits THEIR personality, not yours',
        'Because customers prefer new approaches',
        'Because it\'s unethical'
      ],
      correctIndex: 1,
      explanation: 'The top performer has found a style that fits their unique personality, humor, energy, and voice. Your style should be the best version of YOU, not a clone of someone else.',
    },
    {
      question: 'What is the fastest way to find your own stopping style?',
      options: [
        'Copy whatever the top seller on the street does',
        'An hour loud, an hour quiet, then count',
        'Stick with whichever one feels most comfortable',
        'Try a different style every hour for a month'
      ],
      correctIndex: 1,
      explanation: 'Do an hour loud, do an hour quiet, count how many came through the door. One of those hours beat the other, and it took you a morning instead of a month.',
    },
    {
      question: 'Why is recording yourself valuable for style development?',
      options: [
        'To post on social media',
        'To see your blind spots — body language, voice, timing, and facial expressions you don\'t notice in the moment',
        'To show the manager you\'re working',
        'To send to customers'
      ],
      correctIndex: 1,
      explanation: 'Recording reveals blind spots you can\'t see yourself — posture, facial expressions, voice tone, pacing, and awkward transitions. Watching footage is the fastest way to spot improvement opportunities.',
    }
    ],
  },

  // The two practice shelves. They live in their own files because they are
  // 20 lessons on their own, but they are ordinary `Lesson` records and belong
  // in the same registry — `getLesson`, `getLessonsForCategory` and every page
  // that reads `lessons` resolve them exactly like the 31 above.
  ...scenarioLessons,
  ...objectionLessons,
  ...closingLessons,
};

// The lesson quizzes are maintained in their own file — bilingual, and with the
// correct answer's position spread evenly across the four slots. Inline, every
// answer was option B (84.9%) and also the longest option, so the quiz could be
// passed by always tapping the long B. Overlay them onto the lessons that carry
// one; a lesson with no override keeps whatever it declared.
for (const [id, quiz] of Object.entries(LESSON_QUIZZES)) {
  const lesson = lessons[id];
  if (lesson) lesson.quiz = quiz;
}

// ── Helper functions ──

export function getLessonsForCategory(categoryId: string): Lesson[] {
  const cat = getCategory(categoryId);
  if (!cat) return [];
  /* `lessonOrder` IS the order. It used to be mapped and then re-sorted by each
     lesson's own numeric `order`, which silently threw the array away — so
     curating the scenario list by hand did nothing on screen and the drunk
     customer stayed at the top because its id happened to be S1. The two agree
     for every category, so honouring the array changes nothing except that it
     now actually works. */
  return cat.lessonOrder.map((id) => lessons[id]).filter(Boolean);
}

export function getLesson(id: string): Lesson | undefined {
  return lessons[id];
}

export function getNextLesson(lessonId: string): Lesson | undefined {
  const lesson = lessons[lessonId];
  if (!lesson) return undefined;
  const catLessons = getLessonsForCategory(lesson.categoryId);
  const idx = catLessons.findIndex((l) => l.id === lessonId);
  return catLessons[idx + 1];
}

export function getTotalLessons(): number {
  return Object.keys(lessons).length;
}

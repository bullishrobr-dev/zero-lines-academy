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
  quiz: QuizQuestion[];
}

export interface Category {
  id: string;
  title: string;
  titleEs?: string;
  subtitle: string;
  subtitleEs?: string;
  description: string;
  icon: string; // lucide-react icon name
  accentColor: string; // hex color for category theming
  lessonOrder: string[]; // ordered lesson IDs
}

// ── Categories ──
export const categories: Category[] = [
  {
    id: 'psychology',
    title: 'Sales Psychology & Self-Mastery',
    titleEs: 'Psicología de Ventas y Auto-Dominio',
    subtitle: 'Master your mind, master the floor',
    subtitleEs: 'Domina tu mente, domina el piso',
    description:
      'Everything starts with you. Your energy, your confidence, your mindset — that is what customers feel before you say a single word. These lessons are about becoming the kind of salesperson who walks in and owns the room.',
    icon: 'Brain',
    accentColor: '#0ABAB5',
    lessonOrder: ['psych-1', 'psych-2', 'psych-3', 'psych-4', 'psych-5', 'psych-6', 'psych-7', 'psych-8'],
  },
  {
    id: 'connecting',
    title: 'Reading & Connecting with People',
    titleEs: 'Lectura y Conexión con la Gente',
    subtitle: 'See what others miss',
    subtitleEs: 'Ve lo que otros no ven',
    description:
      'The best salespeople are master observers. They read people in seconds — their mood, their budget, their relationship dynamics — and they adapt instantly. These lessons give you the tools to connect with anyone who walks through your door.',
    icon: 'Users',
    accentColor: '#8B5CF6',
    lessonOrder: ['connect-1', 'connect-2', 'connect-3', 'connect-4', 'connect-5', 'connect-6', 'connect-7', 'connect-8'],
  },
  {
    id: 'stopping',
    title: 'The Art of Stopping',
    titleEs: 'El Arte de Parar',
    subtitle: 'Turn strangers into demos',
    subtitleEs: 'Convierte desconocidos en demos',
    description:
      'Stopping is the hardest skill and the most important. No stop, no sale. These lessons give you a whole toolbox of approaches — different styles, different energies, different techniques — so you can find what works for YOUR personality.',
    icon: 'Hand',
    accentColor: '#F59E0B',
    lessonOrder: ['stop-1', 'stop-2', 'stop-3', 'stop-4', 'stop-5', 'stop-6', 'stop-7'],
  },
  {
    // The sale itself. Seven lessons taught stopping someone and eight taught
    // the products, and between them was a hole where the money actually
    // changes hands. Authored from the owner's own method, in his words.
    id: 'closing',
    title: 'Bring, Close, Collect',
    titleEs: 'Meter, Cerrar, Cobrar',
    subtitle: 'From hello to paid',
    subtitleEs: 'Del hola al pago',
    description:
      'You stopped them. Now what? These are the five metres from the pavement to the chair, the moment you ask for the money, and the ninety seconds between yes and paid. This is where sales are won and lost after all the hard work is already done.',
    icon: 'DoorOpen',
    accentColor: '#FF6B6B',
    lessonOrder: ['close-1', 'close-2', 'close-3'],
  },
  {
    id: 'products',
    title: 'Product Mastery',
    titleEs: 'Dominio del Producto',
    subtitle: 'Know your weapons inside out',
    subtitleEs: 'Conoce tus armas a fondo',
    description:
      'Your products are incredible — but only if you know how to show them. Deep-dive into every product pitch, demo technique, price structure, and closing strategy. These are your money-makers.',
    icon: 'Sparkles',
    accentColor: '#0ABAB5',
    lessonOrder: ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6', 'prod-7', 'prod-8'],
  },

  // ── The practice shelves ──
  // The four paths above own the four brand accents (teal / violet / coral /
  // gold — see the hue maps in TrainingHub and CategoryHub). These two are not
  // a fifth and sixth path: they are reference material a seller dips into
  // mid-shift, so they take the design system's SEMANTIC tokens instead of a
  // brand hue. `--warning` (#A16207) and `--success` (#15803D) are real tokens
  // with light, dark and tint values already defined in src/index.css, they are
  // both AA on `--surface`, and neither is claimed by a learning path. Nothing
  // renders `accentColor` today; these values are the tokens to reach for when
  // something does.
  {
    id: 'scenarios',
    title: 'Street Scenarios',
    titleEs: 'Situaciones de Calle',
    subtitle: 'When it goes sideways, you already know what to do',
    subtitleEs: 'Cuando se tuerce, ya sabes qué hacer',
    description:
      'The drunk customer, the demo that fails in front of a crowd, the competitor who walks into your pitch, the toddler mid-tantrum. Every one of these will happen to you. These are the drills — read the situation, the moves, the words, and the mistakes that cost the sale — so the first time it happens is not the first time you have thought about it.',
    icon: 'Drama',
    accentColor: '#A16207',
    lessonOrder: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10'],
  },
  {
    id: 'objections',
    title: 'Objection Handling',
    titleEs: 'Manejo de Objeciones',
    subtitle: 'Every "no" has a door in it',
    subtitleEs: 'Todo "no" tiene una puerta',
    description:
      '"I am on a budget." "Let me think about it." "I can get it cheaper on Amazon." These ten lines account for almost every lost sale on the street — and none of them mean no. Each lesson gives you the psychology underneath the objection, three scripts at three lengths, and the responses that kill the sale outright.',
    icon: 'ShieldQuestion',
    accentColor: '#15803D',
    lessonOrder: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8', 'O9', 'O10'],
  },
];


// ── Lessons ──
export const lessons: Record<string, Lesson> = {
  'connect-1': {
    id: 'connect-1',
    categoryId: 'connecting',
    title: 'The 15-Second Scan',
    titleEs: 'El Escaneo de 15 Segundos',
    subtitle: 'Systematic observation: building a mental profile before you speak',
    subtitleEs: 'Observación sistemática: construyendo un perfil mental antes de hablar',
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
      text: 'Every detail is data. The watch on their wrist, the bags in their hands, the person beside them, the way they walk — all of it feeds into your mental profile. The more accurate your scan, the more precise your pitch.',
      textEs: 'Cada detalle es información. El reloj en su muñeca, las bolsas en sus manos, la persona a su lado, su forma de caminar — todo alimenta tu perfil mental. Cuanto más preciso sea tu escaneo, más preciso será tu pitch.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The SCAN System: 5 Categories to Assess in 15 Seconds',
      textEs: 'El Sistema SCAN: 5 Categorías para Evaluar en 15 Segundos',
    },
    {
            type: 'paragraph',
      text: 'Use this acronym to quickly categorize what you observe:',
      textEs: 'Usa este acrónimo para categorizar rápidamente lo que observas:',
    },
    {
            type: 'bullets',
      items: [
        'S — STYLE: What are they wearing? Look at fabric quality, brand logos, fit, and coordination. Are they dressed casually (tourist mode), elegantly (shopping mode), or practically (skiing/sightseeing)? A woman in a {currency}2,000 coat is a different prospect than one in hiking gear.',
        'C — CARRY: What bags are they carrying? Shopping bags from luxury stores (Louis Vuitton, Chanel, local ski boutiques) signal buying mood AND spending power. A person with no bags might be just starting their shopping day — perfect timing.',
        'A — ACCESSORIES: Watch, jewelry, sunglasses, handbag. A Rolex or Cartier watch signals serious spending power. Costume jewelry signals budget-conscious. The quality of accessories often reveals more than clothing.',
        'N — NETWORK: Who are they with? Solo travelers make fast decisions. Couples require different engagement (see the Partner Dynamic lesson). Groups are social — energy and humor work best. Families with young children are harder stops but can be big buyers when engaged.',
        'P — PACE & POSTURE: How fast are they walking? Are they window-shopping (slow, looking around) or destination-shopping (fast, purposeful)? Relaxed posture means receptive. Tense posture means they\'re in a hurry or stressed.'
      ],
      itemsEs: [
          'S — STYLE (ESTILO): ¿Qué traen puesto? Observa la calidad de la tela, los logos de marca, el corte y la coordinación. ¿Van vestidos de forma casual (modo turista), elegante (modo compras) o práctica (esquí/paseo)? Una mujer con un abrigo de {currency}2,000 es una prospecto muy diferente a una con ropa de excursionismo.',
          'C — CARRY (CARGA): ¿Qué bolsas traen? Bolsas de compras de tiendas de lujo (Louis Vuitton, Chanel, boutiques locales de esquí) indican estado de ánimo de compra Y poder adquisitivo. Una persona sin bolsas podría estar empezando su día de compras — momento perfecto.',
          'A — ACCESSORIES (ACCESORIOS): Reloj, joyería, gafas de sol, bolso. Un reloj Rolex o Cartier indica alto poder adquisitivo. Las joyas de fantasía indican a alguien consciente del presupuesto. La calidad de los accesorios a menudo revela más que la ropa.',
          'N — NETWORK (RED): ¿Con quién están? Los viajeros solos toman decisiones rápidas. Las parejas requieren un enfoque diferente (ve la lección de Dinámica de Pareja). Los grupos son sociales — la energía y el humor funcionan mejor. Las familias con niños pequeños son más difíciles de detener, pero pueden ser grandes compradores cuando se les involucra.',
          'P — PACE & POSTURE (RITMO Y POSTURA): ¿Qué tan rápido caminan? ¿Están viendo escaparates (despacio, mirando alrededor) o comprando con destino (rápido, con propósito)? Una postura relajada significa receptividad. Una postura tensa significa que van con prisa o están estresados.',
        ],
    },
    {
            type: 'tip',
      text: 'Practice the SCAN on random pedestrians even when you\'re not working. Sit at a café and mentally scan people walking by. Guess their spending power, their mood, their relationship to the person beside them. Then check your guesses if they enter a nearby shop. This builds your observation muscle.',
      textEs: 'Practica el SCAN con peatones al azar incluso cuando no estés trabajando. Siéntate en un café y escanea mentalmente a la gente que pasa. Adivina su poder adquisitivo, su estado de ánimo, su relación con la persona a su lado. Luego verifica tus suposiciones si entran a una tienda cercana. Esto fortalece tu músculo de observación.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Quick Signals: Red, Yellow, and Green',
      textEs: 'Señales Rápidas: Rojo, Amarillo y Verde',
    },
    {
            type: 'comparison',
      left: { label: 'GREEN (Stop Immediately)', text: 'Carrying luxury shopping bags, window-shopping slowly, well-dressed, good grooming, with a partner, smiling and chatting, looking at displays, no phone in hand. These people are in buying mode. Approach with confidence.' },
      leftEs: { label: 'VERDE (Detente de Inmediato)', text: 'Cargando bolsas de compras de lujo, viendo escaparates despacio, bien vestidos, buena presentación, con una pareja, sonriendo y platicando, mirando los exhibidores, sin teléfono en la mano. Estas personas están en modo de compra. Acércate con confianza.' },
      right: { label: 'RED (Low Priority)', text: 'Walking fast with purpose, on phone call, pushing stroller with fussy baby, wearing headphones, carrying heavy bags (tired), frowning, checking watch repeatedly. These people are unlikely to stop. Let them pass or use a very light touch.' },
      rightEs: { label: 'ROJO (Baja Prioridad)', text: 'Andando rápido y con rumbo, hablando por teléfono, empujando un carrito con un bebé inquieto, con auriculares puestos, cargando bolsas pesadas (cansados), con el ceño fruncido, mirando el reloj una y otra vez. Es poco probable que estas personas paren. Déjalas pasar o usa un toque muy suave.' }
    },
    {
            type: 'keypoint',
      text: 'YELLOW means caution and creativity. They\'re neutral — not obviously receptive but not closed off. Maybe they\'re dressed well but walking fast. Maybe they\'re with a partner who seems interested while they seem indifferent. These require your best stopping technique and often become your most satisfying wins.',
      textEs: 'AMARILLO significa cautela y creatividad. Son neutrales — no son obviamente receptivos pero tampoco cerrados. Quizás están bien vestidos pero caminando rápido. Quizás están con una pareja que parece interesada mientras ellos parecen indiferentes. Estos requieren tu mejor técnica de detención y a menudo se convierten en tus victorias más satisfactorias.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Grooming Signal',
      textEs: 'La Señal de Cuidado Personal',
    },
    {
            type: 'paragraph',
      text: 'One of the most reliable buying indicators is self-care. People who invest in their appearance are prime candidates for premium skincare:',
      textEs: 'Uno de los indicadores de compra más confiables es el cuidado personal. Las personas que invierten en su apariencia son candidatas ideales para el cuidado de la piel premium:',
    },
    {
            type: 'bullets',
      items: [
        'WELL-MAINTAINED NAILS: Whether natural or polished, cared-for nails signal someone who values appearance. Perfect for the Nail Kit pitch.',
        'QUALITY HAIR: Styled, colored, well-cut hair suggests investment in self-presentation.',
        'SKIN QUALITY: Someone with good skin cares about skincare. Someone with skin concerns (redness, dryness, visible bags) has a PROBLEM you can solve.',
        'TEETH: Straight, white teeth often correlate with overall self-care investment and disposable income.',
        'MAKEUP APPLICATION: Skillful makeup (not overdone) shows someone who invests time in their appearance daily.'
      ],
      itemsEs: [
          'UÑAS BIEN CUIDADAS: Ya sean naturales o pintadas, las uñas cuidadas indican a alguien que valora su apariencia. Perfecto para el pitch del Kit de Uñas.',
          'CABELLO DE CALIDAD: Cabello peinado, teñido, bien cortado sugiere inversión en la autopresentación.',
          'CALIDAD DE LA PIEL: Alguien con buena piel se preocupa por el cuidado de la piel. Alguien con problemas de piel (enrojecimiento, sequedad, ojeras visibles) tiene un PROBLEMA que tú puedes resolver.',
          'DIENTES: Dientes rectos y blancos a menudo se correlacionan con la inversión general en cuidado personal e ingresos disponibles.',
          'APLICACIÓN DE MAQUILLAJE: Maquillaje bien aplicado (no exagerado) muestra a alguien que invierte tiempo en su apariencia diariamente.',
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
    quiz: [
    {
      question: 'What does the \'C\' in the SCAN system stand for?',
      options: [
        'Clothing',
        'Carry (shopping bags)',
        'Cultural background',
        'Conversation style'
      ],
      correctIndex: 1,
      explanation: 'C stands for \'Carry\' — what shopping bags or items they\'re carrying. Bags from luxury stores signal buying mood and spending power.',
    },
    {
      question: 'Which of these is a \'GREEN\' signal to stop immediately?',
      options: [
        'Walking fast and checking their watch',
        'On a phone call, looking stressed',
        'Carrying luxury shopping bags and window-shopping slowly',
        'Pushing a stroller with a crying baby'
      ],
      correctIndex: 2,
      explanation: 'Luxury shopping bags + slow window-shopping signals buying mode. The person is already spending and receptive to new experiences.',
    },
    {
      question: 'Why is grooming quality a reliable buying indicator?',
      options: [
        'It means they\'re vain',
        'It indicates someone who invests in their appearance and self-care',
        'It shows they\'re wealthy',
        'It means they wear makeup'
      ],
      correctIndex: 1,
      explanation: 'People who invest in their appearance (nails, hair, skin, teeth) are prime candidates for premium skincare because they already value self-care and invest in it.',
    }
    ],
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
      text: 'Reading spending power isn\'t about snobbery — it\'s about precision. Offering a {currency}300 syringe to someone with a {currency}50 budget wastes everyone\'s time. But missing a {currency}500 sale because you pitched the {currency}30 scrub to a wealthy buyer? That\'s leaving money on the table. The ability to read spending power lets you match the right product and price point to the right person.',
      textEs: 'Leer el poder adquisitivo no es sobre esnobismo — es sobre precisión. Ofrecer una jeringa de {currency}300 a alguien con un presupuesto de {currency}50 es desperdiciar el tiempo de todos. ¿Pero perder una venta de {currency}500 porque le ofreciste el scrub de {currency}30 a un comprador adinerado? Eso es dejar dinero sobre la mesa. La habilidad de leer el poder adquisitivo te permite emparejar el producto y punto de precio correctos con la persona correcta.',
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
      text: 'The price gap is your universal equalizer. Even budget-conscious tourists perk up when they realize they\'re getting a {currency}500 product for {currency}300. Lead with the Europe price, then deliver the {locationName} price as a gift — not a discount.',
      textEs: 'La diferencia de precio es tu ecualizador universal. Incluso los turistas conscientes del presupuesto se animan cuando se dan cuenta de que están obteniendo un producto de {currency}500 por {currency}300. Empieza con el precio de Europa, luego entrega el precio de {locationName} como un regalo — no como un descuento.',
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
      text: 'When in doubt, lead with the syringe (flagship). If they recoil at the {currency}300 price point, you can always descale to the peeling or scrub. It\'s harder to upgrade someone who started at {currency}30 than to descale someone who started at {currency}300.',
      textEs: 'Cuando dudes, empieza con la jeringa (producto estrella). Si se echan atrás con el precio de {currency}300, siempre puedes bajar al peeling o scrub. Es más difícil elevar a alguien que empezó en {currency}30 que bajar a alguien que empezó en {currency}300.',
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
      text: 'Couples Close at Twice the Rate — If You Know How to Work Them',
      textEs: 'Las Parejas Cierran al Doble de la Tasa — Si Sabes Cómo Manejarlas',
    },
    {
            type: 'paragraph',
      text: 'A solo shopper makes decisions alone. A couple makes decisions together — and that dynamic is either your greatest asset or your biggest obstacle. When you engage both partners skillfully, they validate each other\'s buying decision. When you ignore one partner, they become a silent veto. Couples who both feel included close at nearly double the rate of solo shoppers.',
      textEs: 'Un comprador solo toma decisiones solo. Una pareja toma decisiones juntos — y esa dinámica es tu mayor activo o tu mayor obstáculo. Cuando involucras a ambas parejas hábilmente, se validan la decisión de compra mutuamente. Cuando ignoras a una pareja, se convierte en un veto silencioso. Las parejas en las que ambos se sienten incluidos cierran a casi el doble de la tasa de los compradores solos.',
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
        'APPEAL TO HIS LOGIC: Men often respond to practical benefits. \'This lasts a whole year — one syringe, 52 treatments. That\'s less than {currency}6 per week for this result.\' Logic defuses skepticism.',
        'MAKE HIM THE HERO: Frame the purchase as something HE can give her. \'Imagine her waking up every morning looking this fresh — and she\'ll know it\'s because of you.\' Men love being the source of their partner\'s happiness.',
        'HUMOR DISARMS: A light joke directed at him breaks tension. \'Sir, don\'t worry — we\'re not changing her face, just making her eyes look like she slept twelve hours.\' Humor makes him smile, and a smiling man doesn\'t veto.'
      ],
      itemsEs: [
          'INCLÚYELO DESDE EL PRINCIPIO: No esperes hasta el cierre. Desde el momento en que están dentro, haz contacto visual con él. Pregúntale su opinión. "Señor, ¿ve lo que digo sobre el área del ojo? ¿Sabe cómo ella a veces dice que se ve cansada incluso después de dormir bien?" Esto lo convierte en experto sobre SU pareja, no solo en observador de tu venta.',
          'APELA A SU LÓGICA: Los hombres a menudo responden a beneficios prácticos. "Esto dura todo un año — una jeringa, 52 tratamientos. Eso es menos de {currency}6 por semana por este resultado." La lógica desactiva el escepticismo.',
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
      text: 'When a couple is deciding, GIVE THEM SPACE. Step back after presenting the offer. Say \'Take your time, I\'ll be right here.\' Hovering creates pressure. Space creates comfort. The conversation they have in that 30-second gap often seals the deal — one convinces the other.',
      textEs: 'Cuando una pareja está decidiendo, DALES ESPACIO. Retrocede después de presentar la oferta. Di "Tómate tu tiempo, estaré aquí." Cernirse crea presión. El espacio crea comodidad. La conversación que tienen en esos 30 segundos a menudo sella el trato — uno convence al otro.',
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
      textEs: '\'Esto sería un regalo de Navidad increíble para ella — pero ¿honestamente? Úsenlo juntos. El Scrub y la Body Butter también funcionan para hombres. Hagan una noche de spa en casa.\' Esto transforma una compra individual en una experiencia compartida y elimina la barrera de la \'compra egoísta\'.',
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
      text: 'Compliments work when they\'re SPECIFIC and GENUINE. Generic compliments (\'You\'re beautiful\') feel fake. Specific compliments (\'That emerald scarf brings out your eyes perfectly\') feel observant and real.',
      textEs: 'Los cumplidos funcionan cuando son ESPECÍFICOS y GENUINOS. Los cumplidos genéricos (\'Eres hermosa\') se sienten falsos. Los cumplidos específicos (\'Esa bufanda esmeralda resalta perfectamente tus ojos\') se sienten observadores y reales.',
    },
    {
            type: 'bullets',
      items: [
        'COMPLIMENT CHOICES: Accessories (scarf, watch, bag), grooming (hair, nails, skin), style (color coordination, unique piece), energy (warm smile, confident walk)',
        'AVOID: Physical compliments that could feel inappropriate (body, weight, age-related). Keep it to choices they\'ve MADE, not attributes they were born with.',
        'DELIVERY: Make eye contact, smile, say it warmly, then move on. Don\'t linger on the compliment — that creates awkwardness.'
      ],
      itemsEs: [
          'CUMPLIDA SUS ELECCIONES: Accesorios (bufanda, reloj, bolsa), aseo (cabello, uñas, piel), estilo (combinación de colores, pieza única), energía (sonrisa cálida, caminata segura)',
          'EVITA: Cumplidos físicos que puedan sentirse inapropiados (cuerpo, peso, relacionados con la edad). Manténlo en las elecciones que HAN HECHO, no en atributos con los que nacieron.',
          'ENTREGA: Haz contacto visual, sonríe, dílo cálidamente, y sigue adelante. No te quedes en el cumplido — eso genera incomodidad.',
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
          '7. CURIOSIDAD: Haz preguntas que demuestren interés genuino en ELLOS, no solo en su billetera. \'¿Qué sueles usar en tu piel? Claramente te cuidas.\' A la gente le encanta hablar de sí misma.',
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
      left: { label: 'Closed Questions (Weak)', text: '\'Do you use cream?\' — Yes/No answer. Ends conversation. Reveals nothing. \'Do you like it?\' — \'It\'s nice.\' Dead end. \'Have you been to {locationName} before?\' — \'Yes.\' Nothing to work with.' },
      leftEs: { label: 'Preguntas Cerradas (Débiles)', text: '\'¿Usas crema?\' — Respuesta sí/no. Termina la conversación. No revela nada. \'¿Te gusta?\' — \'Está bonito.\' Callejón sin salida. \'¿Has estado en {locationName} antes?\' — \'Sí.\' Nada con qué trabajar.' },
      right: { label: 'Open Questions (Powerful)', text: '\'What do you use on your skin?\' — Reveals routine, spending, and concerns. \'What do you think of the result?\' — Gets them talking about feelings. \'What brings you to {locationName}?\' — Opens connection opportunities.' },
      rightEs: { label: 'Preguntas Abiertas (Potentes)', text: '\'¿Qué usas para la piel?\' — Revela rutina, gasto y preocupaciones. \'¿Qué te parece el resultado?\' — Les hace hablar de lo que sienten. \'¿Qué te trae por {locationName}?\' — Abre oportunidades de conexión.' }
    },
    {
            type: 'tip',
      text: 'Start with open questions. Use closed questions only to confirm what you\'ve learned (\'So you use a night cream already — that\'s great\'). Open questions gather intelligence; closed questions confirm understanding.',
      textEs: 'Empieza con preguntas abiertas. Usa preguntas cerradas solo para confirmar lo que has aprendido (\'Así que ya usas una crema de noche — eso es genial\'). Las preguntas abiertas recopilan inteligencia; las preguntas cerradas confirman entendimiento.',
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
      text: 'Customer: \'How long does one syringe last?\' (Buying signal!) You: \'A full year of treatments — 52 weeks. That\'s less than {currency}6 per week for this result. Shall I set one aside for you?\' Direct close. Don\'t oversell past this point.',
      textEs: 'Cliente: \'¿Cuánto dura una jeringa?\' (¡Señal de compra!) Tú: \'Un año completo de tratamientos — 52 semanas. Eso es menos de {currency}6 por semana por este resultado. ¿Te guardo una?\' Cierre directo. No vendas de más después de este punto.',
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
    subtitle: 'The 4 buyer types: Analytical, Driver, Amiable, and Expressive',
    subtitleEs: 'Adapta tu enfoque al cliente frente a ti',
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
      text: 'You\'ve probably noticed that some customers want every detail while others just want the bottom line. Some need to feel emotionally connected; others want facts and data. These differences aren\'t random — they\'re personality types. Understanding the four buyer types transforms your approach from guessing to precision.',
      textEs: 'Probablemente has notado que algunos clientes quieren cada detalle mientras que otros solo quieren ir al grano. Algunos necesitan sentirse emocionalmente conectados; otros quieren hechos y datos. Estas diferencias no son al azar — son tipos de personalidad. Entender los cuatro tipos de comprador transforma tu enfoque de adivinar a precisión.',
    },
    {
            type: 'keypoint',
      text: 'The four buyer types — Analytical, Driver, Amiable, and Expressive — each require a different sales approach. Using the wrong style with the wrong type is like speaking French to a German speaker. Adapt and close.',
      textEs: 'Los cuatro tipos de comprador — Analítico, Conductor, Amable y Expresivo — cada uno requiere un enfoque de venta diferente. Usar el estilo equivocado con el tipo equivocado es como hablarle en francés a un alemán. Adáptate y cierra.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Type 1: The Analytical (Facts First)',
      textEs: 'Tipo 1: El Analítico (Hechos Primero)',
    },
    {
            type: 'paragraph',
      text: 'The Analytical buyer is methodical, detail-oriented, and risk-averse. They want to understand HOW the product works before they commit. They\'ll ask about ingredients, research, and proof. They\'re not being difficult — they\'re being thorough.',
      textEs: 'El comprador Analítico es metódico, orientado a los detalles y adverso al riesgo. Quiere entender CÓMO funciona el producto antes de comprometerse. Preguntará sobre ingredientes, investigación y pruebas. No está siendo difícil — está siendo minucioso.',
    },
    {
            type: 'bullets',
      items: [
        'IDENTIFYING THEM: Asks specific questions about ingredients, science, or proof. Reads labels. Takes time to consider. May seem skeptical but is actually just processing.',
        'YOUR APPROACH: Lead with facts and evidence. \'This is recommended by dermatologists.\' \'The Dead Sea has the highest mineral concentration on Earth.\' \'One syringe lasts 52 treatments — here is the math.\'',
        'WHAT TO AVOID: High-pressure tactics, emotional appeals, rushing them. They need time. Pressure creates resistance, not commitment.',
        'CLOSING TECHNIQUE: Give them space to decide. \'I know you want to think this through. Here is my WhatsApp — if you have any questions later, just ask.\' Respect their process.'
      ],
      itemsEs: [
          'IDENTIFICARLOS: Preguntan cosas específicas sobre ingredientes, ciencia o pruebas. Leen etiquetas. Toman tiempo para considerar. Pueden parecer escépticos pero en realidad solo están procesando.',
          'TU ENFOQUE: Empieza con hechos y evidencia. \'Esto es recomendado por dermatólogos.\' \'El Mar Muerto tiene la mayor concentración de minerales de la Tierra.\' \'Una jeringa dura 52 tratamientos — aquí está la cuenta.\'',
          'QUÉ EVITAR: Tácticas de alta presión, apelaciones emocionales, apurarlos. Necesitan tiempo. La presión crea resistencia, no compromiso.',
          'TÉCNICA DE CIERRE: Déles espacio para decidir. \'Sé que quieres pensarlo bien. Aquí está mi WhatsApp — si tienes alguna pregunta después, solo escríbeme.\' Respeta su proceso.',
        ],
    },
    {
            type: 'script',
      text: '\'I completely understand wanting the details. The active ingredient is Dead Sea mineral salt, which contains 21 minerals including magnesium, calcium, and potassium. These are clinically shown to improve skin barrier function. One jar gives you 8-12 months of weekly treatments. The math works out to under {currency}2 per use. Does that help with your decision?\' Facts, structure, respect.',
      textEs: '\'Entiendo perfectamente que quieras los detalles. El ingrediente activo es sal mineral del Mar Muerto, que contiene 21 minerales incluyendo magnesio, calcio y potasio. Estos han demostrado clínicamente mejorar la función de barrera de la piel. Un frasco te da 8-12 meses de tratamientos semanales. La cuenta sale a menos de {currency}2 por uso. ¿Eso te ayuda con tu decisión?\' Hechos, estructura, respeto.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Type 2: The Driver (Results Fast)',
      textEs: 'Tipo 2: El Conductor (Resultados Rápidos)',
    },
    {
            type: 'paragraph',
      text: 'The Driver is goal-oriented, time-pressed, and decisive. They don\'t want small talk. They want to know what it does, what it costs, and whether it works. Waste their time and they are gone.',
      textEs: 'El Conductor está orientado a objetivos, con poco tiempo, y es decisivo. No quiere plática ligera. Quiere saber qué hace, cuánto cuesta, y si funciona. Pierdes su tiempo y se van.',
    },
    {
            type: 'bullets',
      items: [
        'IDENTIFYING THEM: Walks with purpose. Checks their watch. Gives direct answers. May seem abrupt — they are not rude, they are efficient.',
        'YOUR APPROACH: Fast, direct, results-focused. Skip the long rapport-building. Get to the demo and the result quickly. \'Two minutes, visible result, lasts a year.\'',
        'WHAT TO AVOID: Excessive chatting, too many options, slow pacing. Drivers want to make a decision and move on. Respect their time.',
        'CLOSING TECHNIQUE: Binary choice, quick close. \'Option 1: {currency}210 with a gift. Option 2: {currency}300 with two syringes. Which works for you?\' Clean and decisive.'
      ],
      itemsEs: [
          'IDENTIFICARLOS: Caminan con propósito. Revisan su reloj. Dan respuestas directas. Pueden parecer abruptos — no son groseros, son eficientes.',
          'TU ENFOQUE: Rápido, directo, enfocado en resultados. Omite la larga construcción de rapport. Ve a la demostración y al resultado rápido. \'Dos minutos, resultado visible, dura un año.\'',
          'QUÉ EVITAR: Plática excesiva, demasiadas opciones, ritmo lento. Los Conductores quieren tomar una decisión y seguir adelante. Respeta su tiempo.',
          'TÉCNICA DE CIERRE: Elección binaria, cierre rápido. \'Opción 1: {currency}210 con regalo. Opción 2: {currency}300 con dos jeringas. ¿Cuál te funciona?\' Limpio y decisivo.',
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
      text: 'Type 3: The Amiable (Feel Good)',
      textEs: 'Tipo 3: El Amable (Se Siente Bien)',
    },
    {
            type: 'paragraph',
      text: 'The Amiable buyer is warm, people-oriented, and relationship-driven. They want to trust you before they buy from you. They make decisions based on how the purchase FEELS, not just the product specs.',
      textEs: 'El comprador Amable es cálido, orientado a las personas e impulsado por las relaciones. Quiere confiar en ti antes de comprarte. Toman decisiones basándose en cómo se SIENTE la compra, no solo en las especificaciones del producto.',
    },
    {
            type: 'bullets',
      items: [
        'IDENTIFYING THEM: Friendly, asks personal questions, engages in chat, makes eye contact, smiles easily. Takes their partner\'s opinion seriously. Often the most fun to work with.',
        'YOUR APPROACH: Build genuine rapport first. Share stories. Make them feel special. Emotional connection is the gateway to the sale. The demo should feel like an experience, not a transaction.',
        'WHAT TO AVOID: Cold facts, aggressive closing, making them feel rushed. Amiable buyers need warmth and connection. Pressure feels like betrayal.',
        'CLOSING TECHNIQUE: Emotional framing with partner involvement. \'Imagine waking up every morning looking this fresh. Which option feels right for you?\' Feelings over facts.'
      ],
      itemsEs: [
          'IDENTIFICARLOS: Amigables, hacen preguntas personales, se involucran en la plática, hacen contacto visual, sonríen fácilmente. Toman en serio la opinión de su pareja. A menudo los más divertidos de atender.',
          'TU ENFOQUE: Construye rapport genuino primero. Comparte historias. Haz que se sientan especiales. La conexión emocional es la puerta de entrada a la venta. La demostración debe sentirse como una experiencia, no una transacción.',
          'QUÉ EVITAR: Hechos fríos, cierre agresivo, hacer que se sientan apurados. Los compradores Amables necesitan calidez y conexión. La presión se siente como traición.',
          'TÉCNICA DE CIERRE: Enmarcado emocional con involucramiento de la pareja. \'Imagina despertar cada mañana viéndote así de fresca. ¿Cuál opción se siente bien para ti?\' Sentimientos sobre hechos.',
        ],
    },
    {
            type: 'script',
      text: '\'Oh my gosh, your energy is amazing! Where are you visiting from? ... That is incredible! I love it there. You know what, I am going to give you my favorite treatment — it is like a spa moment in the middle of your shopping day. Just relax and enjoy.\' Experience-first, relationship-driven, warm.',
      textEs: '\'¡Dios mío, tu energía es increíble! ¿De dónde nos visitas? ... ¡Eso es increíble! Me encanta ahí. ¡Sabes qué? Te voy a dar mi tratamiento favorito — es como un momento de spa en medio de tu día de compras. Solo relájate y disfruta.\' Experiencia primero, relación como motor, cálido.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Type 4: The Expressive (Storyteller)',
      textEs: 'Tipo 4: El Expresivo (El Narrador)',
    },
    {
            type: 'paragraph',
      text: 'The Expressive buyer is enthusiastic, talkative, and imaginative. They love stories, emotions, and the big picture. They may seem scattered because they jump between topics — that is just how their mind works.',
      textEs: 'El comprador Expresivo es entusiasta, hablador e imaginativo. Aman las historias, las emociones y la visión general. Pueden parecer dispersos porque saltan entre temas — así es como funciona su mente.',
    },
    {
            type: 'bullets',
      items: [
        'IDENTIFYING THEM: Talks a lot, tells stories, gets excited easily, asks creative questions, imagines scenarios (\'Oh, my sister would LOVE this!\').',
        'YOUR APPROACH: Match their enthusiasm. Use storytelling. Paint pictures of the future. \'Your skin will glow like you just came back from a two-week spa retreat.\' Let them talk — they sell themselves through their own excitement.',
        'WHAT TO AVOID: Shutting down their stories, being too structured, dampening their enthusiasm. Expressive buyers need to feel heard and excited.',
        'CLOSING TECHNIQUE: Story-based close with gift potential. \'Your sister would absolutely love this too! Should we do two — one for you, one for her?\' Connect their enthusiasm to the purchase.'
      ],
      itemsEs: [
          'IDENTIFICARLOS: Hablan mucho, cuentan historias, se emocionan fácilmente, hacen preguntas creativas, imaginan escenarios (\'¡Oh, a mi hermana le ENCANTARÍA esto!\').',
          'TU ENFOQUE: Empareja su entusiasmo. Usa narración. Pinta cuadros del futuro. \'Tu piel va a brillar como si acabaras de regresar de un retiro de spa de dos semanas.\' Déjalos hablar — se venden a sí mismos a través de su propia emoción.',
          'QUÉ EVITAR: Cortarles sus historias, ser demasiado estructurado, apagar su entusiasmo. Los compradores Expresivos necesitan sentirse escuchados y emocionados.',
          'TÉCNICA DE CIERRE: Cierre basado en historias con potencial de regalo. \'¡Tu hermana también amaría esto! ¿Hacemos dos — uno para ti, uno para ella?\' Conecta su entusiasmo con la compra.',
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
        'ANALYTICAL → Use data, respect their process, give space',
        'DRIVER → Be fast, be direct, respect their time',
        'AMIABLE → Build rapport, create warmth, involve feelings',
        'EXPRESSIVE → Match enthusiasm, tell stories, paint pictures'
      ],
      itemsEs: [
          'ANALÍTICO → Usa datos, respeta su proceso, dé espacio',
          'CONDUCTOR → Sé rápido, sé directo, respeta su tiempo',
          'AMABLE → Construye rapport, crea calidez, involucra sentimientos',
          'EXPRESIVO → Empareja entusiasmo, cuenta historias, pinta cuadros',
        ],
    },
    {
            type: 'tip',
      text: 'Most people are a blend of two types. A Driver-Analytical wants fast facts. An Amiable-Expressive wants warm stories. Read the primary type first, then blend in the secondary. Flexibility is the superpower.',
      textEs: 'La mayoría de las personas son una mezcla de dos tipos. Un Conductor-Analítico quiere hechos rápidos. Un Amable-Expresivo quiere historias cálidas. Lee el tipo primario primero, luego integra el secundario. La flexibilidad es el superpoder.',
    },
    {
            type: 'quote',
      text: 'The golden rule of sales is not \'treat everyone the same.\' It is \'treat everyone how THEY want to be treated.\' Personality types show you the way.',
      textEs: 'La regla de oro de las ventas no es \'trata a todos igual.\' Es \'trata a todos como ELLOS quieren ser tratados.\' Los tipos de personalidad te muestran el camino.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'Which approach works best with an Analytical buyer?',
      options: [
        'High-energy enthusiasm and storytelling',
        'Facts, evidence, and respect for their decision-making process',
        'Fast, direct results with no small talk',
        'Emotional connection and warm rapport'
      ],
      correctIndex: 1,
      explanation: 'Analytical buyers want facts, evidence, and proof. They need to understand how things work before committing. Respect their thoroughness and give them space to decide.',
    },
    {
      question: 'How should you handle a Driver personality type?',
      options: [
        'Build extensive rapport before pitching',
        'Be fast, direct, and results-focused with binary choices',
        'Tell stories and paint pictures',
        'Give them lots of detailed information'
      ],
      correctIndex: 1,
      explanation: 'Drivers are time-pressed and decisive. They want quick results, clear options, and respect for their schedule. Skip the small talk, get to the demo and close fast.',
    },
    {
      question: 'Why is it important to adapt your style to different personality types?',
      options: [
        'It is not important — one pitch works for everyone',
        'Because different types respond to different communication styles, and mismatching creates resistance',
        'Because the manager requires it',
        'Because it makes the job more interesting'
      ],
      correctIndex: 1,
      explanation: 'Different personality types process information and make decisions differently. Using the wrong approach with the wrong type creates resistance — like speaking the wrong language. Adaptation is the key to precision selling.',
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
        'STEP 2 — EXPLAIN WHY IT\'S EXPENSIVE: Brief justification — \'because it works,\' \'because it\'s proven,\' \'dermatologist recommended.\' This validates the high anchor.',
        'STEP 3 — PIVOT TO {locationName}: \'But here in {locationName}...\' That is the whole bridge — no apology, no excuse. The comparison you\'re setting up is TRUE and the customer can check it: it frames the lower price as what this costs here, not as a product discount.',
        'STEP 4 — STATE THE LOCAL PRICE: \'...it\'s only {currency}300.\' After hearing {currency}500, {currency}300 doesn\'t just sound lower. It sounds like a completely different category of purchase.'
      ],
      itemsEs: [
          'PASO 1 — ESTABLECE EL PRECIO DE EUROPA: \'En Europa esto cuesta alrededor de {currency}200\' (Peeling) o \'{currency}500\' (Jeringa) o \'{currency}80 cada uno\' (Exfoliante/Body Butter/Kit de Uñas). Esta es el ancla.',
          'PASO 2 — EXPLICA POR QUÉ ES CARO: Justificación breve — \'porque funciona,\' \'porque está comprobado,\' \'recomendado por dermatólogos.\' Esto valida el ancla alto.',
          'PASO 3 — PASA A {locationName}: \'Pero aquí en {locationName}...\' Ese es todo el puente — sin disculpas, sin excusas. La comparación que estás montando es VERDAD y el cliente puede comprobarla: enmarca el precio más bajo como lo que cuesta aquí, no como un descuento del producto.',
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
        'It makes the shop sound special, exclusive and hard to find anywhere',
        'It gives a real reference point without devaluing the product',
        'It confuses the customer',
        'It justifies high prices'
      ],
      correctIndex: 1,
      explanation: 'The Europe price is a real number the customer can check, so the difference reads as a comparison rather than implying the product itself is discounted or lower quality. It maintains value perception.',
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
      text: 'This is based on a well-studied cognitive bias called \'choice architecture.\' When people face a binary yes/no decision, the default is often \'no\' (status quo bias). But when faced with multiple options within a category, they evaluate which option fits them better — implicitly accepting the category itself.',
      textEs: 'Esto se basa en un sesgo cognitivo bien estudiado llamado \'arquitectura de elección.\' Cuando las personas enfrentan una decisión binaria de sí/no, la respuesta por defecto suele ser \'no\' (sesgo del statu quo). Pero cuando enfrentan múltiples opciones dentro de una categoría, evalúan cuál opción se ajusta mejor a ellos — aceptando implícitamente la categoría misma.',
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
        'OPTION 1 — THE VALUE CHOICE: Lower price point with a smaller gift or no gift. This captures budget-conscious buyers. Example: Syringe at {currency}210 + one gift.',
        'OPTION 2 — THE FULL CHOICE: Standard or higher price with a bigger gift or added value. This captures buyers who want the complete experience. Example: Syringe at {currency}300 + second syringe free.',
        'THE CONTRAST: The gap between options should be clear but not extreme. {currency}210 vs {currency}300 is a meaningful difference. {currency}210 vs {currency}250 is too close — it creates decision paralysis.',
        'THE DEFAULT: If you sense hesitation, guide them toward Option 1: \'Most people start with Option 1 — it\'s a great entry point.\' This simplifies their decision.'
      ],
      itemsEs: [
          'OPCIÓN 1 — LA OPCIÓN DE VALOR: Punto de precio más bajo con un regalo más pequeño o sin regalo. Esto captura a compradores conscientes del presupuesto. Ejemplo: Jeringa en {currency}210 + un regalo.',
          'OPCIÓN 2 — LA OPCIÓN COMPLETA: Precio estándar o más alto con un regalo más grande o valor agregado. Esto captura a compradores que quieren la experiencia completa. Ejemplo: Jeringa en {currency}300 + segunda jeringa gratis.',
          'EL CONTRASTE: La brecha entre opciones debe ser clara pero no extrema. {currency}210 vs {currency}300 es una diferencia significativa. {currency}210 vs {currency}250 está demasiado cerca — crea parálisis de decisión.',
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
        'CLEAR BUDGET CONSTRAINT: If they visibly hesitate at {currency}300, immediately pivot to {currency}210. Don\'t make them reject both options.',
        'CLEAR GIFT SHOPPER: If they\'re buying for three sisters, Option 2 (Buy 2 Get 1) is obvious. Don\'t overcomplicate.',
        'CLEAR PREMIUM BUYER: If they\'re carrying luxury bags and show zero price sensitivity, lead with Option 2 or even an upsell beyond it.',
        'UNCERTAIN BUYER: When genuinely unsure, default to Option 1. It\'s easier to say yes to, and they can always upgrade later.'
      ],
      itemsEs: [
          'RESTRICCIÓN DE PRESUPUESTO CLARA: Si dudan visiblemente ante {currency}300, pivota inmediatamente a {currency}210. No los hagas rechazar ambas opciones.',
          'COMPRADOR DE REGALOS CLARO: Si están comprando para tres hermanas, la Opción 2 (Compra 2 Lleva 1) es obvia. No la compliques.',
          'COMPRADOR PREMIUM CLARO: Si traen bolsas de lujo y muestran cero sensibilidad al precio, empieza con la Opción 2 o incluso una venta adicional más allá.',
          'COMPRADOR INCIERTO: Cuando estén genuinamente inseguros, usa la Opción 1 por defecto. Es más fácil decir que sí, y siempre pueden mejorar después.',
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
      text: 'The gradual descent: Start high, observe reactions, remove gifts to lower the price, but NEVER go below your floor price. Each step down should feel like a personalized solution, not a desperate discount.',
      textEs: 'El descenso gradual: Empieza alto, observa las reacciones, quita regalos para bajar el precio, pero NUNCA bajes de tu precio mínimo. Cada paso hacia abajo debería sentirse como una solución personalizada, no como un descuento desesperado.',
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
        'REJECTION SIGNAL: Immediate step back, cross arms, shake head. Price is too high OR they weren\'t interested regardless. Don\'t chase too hard.',
        'THOUGHTFUL SIGNAL: They look down, touch chin, purse lips. They\'re calculating. Give them silence and space. This is often a buying signal disguised as hesitation.'
      ],
      itemsEs: [
          'SEÑAL DE CONFORT: Asentimiento breve, hombros relajados, leve sonrisa, manteniendo contacto visual. Pueden pagarlo. Ve al cierre.',
          'SEÑAL DE SORPRESA: Ojos se abren, respiración brusca, cabeza se echa hacia atrás ligeramente. El precio es más alto de lo esperado. Necesitas reencuadrar el valor o prepararte para reducir.',
          'SORPRESA OCULTA: Mantienen la compostura pero miran a su pareja, o su sonrisa se vuelve rígida. Sienten presión por parecer cómodos pero en realidad están preocupados. Observa las reacciones de su pareja.',
          'SEÑAL DE RECHAZO: Paso hacia atrás inmediato, cruzar brazos, negar con la cabeza. El precio es demasiado alto O no estaban interesados de todos modos. No insistas demasiado.',
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
        'STEP 1 — FULL OFFER: Present both options at full value. \'Option 1: {currency}210 with a gift. Option 2: {currency}300 with two syringes and creams.\' This is your ceiling.',
        'STEP 2 — REMOVE THE GIFT: If they hesitate on {currency}210: \'You know what, let me make it easier. I\'ll take away the gift — that\'s {currency}35 value — and bring the syringe to {currency}175.\' They save money; you lose a gift, not margin.',
        'STEP 3 — THE VOUCHER CLOSE: If they still hesitate: \'Alright, I can do something a bit crazy — just this once. With a 20% voucher, I can bring the single syringe to {currency}140. But only on the single one, not the combo.\' This feels exclusive and final.',
        'STEP 4 — THE FLOOR: Your absolute minimum is {currency}100 on the syringe — {currency}140 is the voucher rung, not the bottom. Know both and never cross the floor. If they won\'t buy at {currency}100, they weren\'t going to buy at any price. Let them go graciously.'
      ],
      itemsEs: [
          'PASO 1 — OFERTA COMPLETA: Presenta ambas opciones a valor completo. \'Opción 1: {currency}210 con regalo. Opción 2: {currency}300 con dos jeringas y cremas.\' Este es tu techo.',
          'PASO 2 — QUITA EL REGALO: Si dudan con {currency}210: \'Sabes qué, déjame hacerlo más fácil. Quito el regalo — eso es un valor de {currency}35 — y dejo la jeringa en {currency}175.\' Ellos ahorran dinero; tú pierdes un regalo, no margen.',
          'PASO 3 — EL CIERRE CON VOUCHER: Si aún dudan: \'Está bien, puedo hacer algo un poco loco — solo esta vez. Con un voucher del 20%, puedo dejar la jeringa individual en {currency}140. Pero solo en la individual, no en el combo.\' Esto se siente exclusivo y definitivo.',
          'PASO 4 — EL PISO: Tu mínimo absoluto. Conócelo y nunca lo cruces. Si no compran en {currency}140, no iban a comprar a ningún precio. Déjalos ir amablemente.',
        ],
    },
    {
            type: 'script',
      text: '\'So Option 1 is {currency}210 with a gift...\' [Watch their face. Shock?] \'...or, you know what, let me remove the gift — that\'s {currency}35 — and bring it to {currency}175 just for you.\' [Watch again. Still hesitant?] \'Listen, I just checked, and I can do a one-time voucher that brings it to {currency}140. But just this once, and only on the single syringe.\' Three steps, each feeling like a personal favor.',
      textEs: '\'Entonces la Opción 1 es {currency}210 con regalo...\' [Observa su rostro. ¿Sorpresa?] \'...o, sabes qué, déjame quitar el regalo — son {currency}35 — y dejarlo en {currency}175 solo para ti.\' [Observa otra vez. ¿Aún dudosos?] \'Escucha, acabo de revisar, y puedo hacer un voucher de una sola vez que lo deja en {currency}140. Pero solo esta vez, y solo en la jeringa individual.\' Tres pasos, cada uno sintiéndose como un favor personal.',
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
      left: { label: 'Descale (Drop Price)', text: 'Use when: Customer shows price shock, mentions budget constraints, seems genuinely interested but can\'t afford the price, is comparing to a cheaper alternative. Remove gifts gradually to find their price point.' },
      leftEs: { label: 'Reducir (Bajar Precio)', text: 'Úsalo cuando: El cliente muestra sorpresa por el precio, menciona restricciones de presupuesto, parece genuinamente interesado pero no puede pagar el precio, está comparando con una alternativa más barata. Quita regalos gradualmente para encontrar su punto de precio.' },
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
      text: '\'I totally understand. Let me make it easy — I can take the Scrub out of the deal and put its value straight back to you as credit. This way I can make it {currency}70 for you.\' The word \'credit\' makes them feel smart for saving. Not poor for hesitating.',
      textEs: '\'Te entiendo completamente. Déjame hacerlo fácil — puedo sacar el Exfoliante del trato y devolverte su valor como crédito. Así puedo dejártelo en {currency}70.\' La palabra \'crédito\' los hace sentir inteligentes por ahorrar. No pobres por dudar.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Never Going Below Minimum',
      textEs: 'Nunca Bajar del Mínimo',
    },
    {
            type: 'paragraph',
      text: 'Your floor price is your professional boundary. Here\'s why it matters:',
      textEs: 'Tu precio mínimo es tu límite profesional. Aquí te decimos por qué importa:',
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
      text: 'Know your minimums for every product by heart: Syringe {currency}100 (absolute floor — {currency}140 is the voucher close, one rung above it), Peeling {currency}50, Scrub {currency}30 (single), Nail Kit {currency}30 (single). These are your floors. Practice saying no to going lower — \'I wish I could, but that\'s genuinely the best I can do.\'',
      textEs: 'Conoce tus mínimos para cada producto de memoria: Jeringa {currency}100 (mínimo absoluto — {currency}140 es el cierre con cupón, un escalón por encima), Peeling {currency}50, Exfoliante {currency}30 (individual), Kit de Uñas {currency}30 (individual). Estos son tus pisos. Practica decir que no a bajar más — \'Ojalá pudiera, pero ese es genuinamente lo mejor que puedo hacer.\'',
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
        'THE PROFESSIONAL VERSION: \'I have some flexibility on the single item. Let me see what I can do... Okay, with our promotional voucher, I can bring the single syringe to {currency}140. This is the best available rate.\' Measured, credible.',
        'THE URGENT VERSION: \'I only have one voucher left today, and honestly, I\'ve been saving it for someone who really appreciates the product. That\'s you. {currency}140, just this once.\' Scarcity + personalization.',
        'THE RELATIONSHIP VERSION: \'I want you to be a happy customer who comes back. So here\'s what I\'ll do — {currency}140 on the single one, and you have my WhatsApp for anything you need later.\' Long-term focus.'
      ],
      itemsEs: [
          'LA VERSIÓN AMIGABLE: \'Vale, voy a hacer algo que probablemente no debería... pero pareces tan encantador, y realmente quiero que tengas esto. ¡Solo no le digas a mi jefe!\' Juguetona, conspirativa.',
          'LA VERSIÓN PROFESIONAL: \'Tengo algo de flexibilidad en el artículo individual. Déjame ver qué puedo hacer... Está bien, con nuestro voucher promocional, puedo dejar la jeringa individual en {currency}140. Esta es la mejor tarifa disponible.\' Medida, creíble.',
          'LA VERSIÓN URGENTE: \'Solo me queda un voucher hoy, y honestamente, lo he estado guardando para alguien que realmente aprecie el producto. Ese eres tú. {currency}140, solo esta vez.\' Escasez + personalización.',
          'LA VERSIÓN DE RELACIÓN: \'Quiero que seas un cliente feliz que regrese. Así que esto es lo que haré — {currency}140 en la individual, y tendrás mi WhatsApp para cualquier cosa que necesites después.\' Enfoque a largo plazo.',
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
    title: 'Cross-Selling & Upselling',
    titleEs: 'Venta Cruzada y Venta Adicional',
    subtitle: 'Reading the moment for an upsell, natural transitions, and when NOT to upsell',
    subtitleEs: 'Vende más a cada cliente',
    duration: '8 min',
    icon: 'TrendingUp',
    order: 5,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'If They Love It, Build On It. If They Don\'t, Don\'t.',
      textEs: 'Si les encanta, construye sobre eso. Si no, no lo hagas.',
    },
    {
            type: 'paragraph',
      text: 'Upselling isn\'t greed — it\'s service. When a customer loves the syringe demo, offering them the second syringe for their forehead completes their experience. When a customer buys the scrub, suggesting the body butter that pairs with it makes their purchase more effective. Cross-selling and upselling are about COMPLETING the customer\'s journey, not extracting more money.',
      textEs: 'La venta adicional no es avaricia — es servicio. Cuando a un cliente le fascina la demostración de la jeringa, ofrecerle la segunda para su frente completa su experiencia. Cuando un cliente compra el exfoliante, sugerirle la crema corporal que complementa su compra la hace más efectiva. La venta cruzada y la venta adicional se tratan de COMPLETAR el viaje del cliente, no de sacarle más dinero.',
    },
    {
            type: 'keypoint',
      text: 'The key to ethical upselling: only upsell when the customer is genuinely delighted. If they liked the product but weren\'t blown away, pushing for more creates resentment. If their eyes lit up during the demo, NOT offering more is actually doing them a disservice.',
      textEs: 'La clave de la venta adicional ética: solo vende más cuando el cliente esté genuinamente encantado. Si le gustó el producto pero no quedó maravillado, presionar por más genera resentimiento. Si sus ojos brillaron durante la demostración, NO ofrecerle más es en realidad hacerle un flaco favor.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reading the Moment for an Upsell',
      textEs: 'Leyendo el Momento para una Venta Adicional',
    },
    {
            type: 'paragraph',
      text: 'Upsell timing is everything. These are the signals that an upsell will be welcomed:',
      textEs: 'El momento de la venta adicional lo es todo. Estas son las señales de que una venta adicional será bien recibida:',
    },
    {
            type: 'bullets',
      items: [
        'THEIR EYES LIT UP: Genuine amazement during the demo. \'Wow!\' \'Oh my god!\' \'That\'s incredible!\' These are green lights.',
        'THEY ASK ABOUT OTHER PRODUCTS: \'Do you have anything for...?\' They\'re already thinking beyond what you\'re showing. Guide them.',
        'THEY MENTION GIFTS: \'This would be perfect for my sister.\' Gift buyers are multi-buyers. They\'re already in buying mode for others.',
        'NO PRICE OBJECTION: When you present the offer and they don\'t blink at the price, they have room for more. Test with a gentle upsell.',
        'THEY ASK ABOUT ROUTINES: \'So I use this and then what?\' They\'re imagining incorporating your products into their life. Fill in the gaps.'
      ],
      itemsEs: [
          'SUS OJOS BRILLARON: Asombro genuino durante la demostración. "¡Wow!" "¡Dios mío!" "¡Increíble!" Estas son luces verdes.',
          'PREGUNTAN POR OTROS PRODUCTOS: "¿Tienes algo para...?" Ya están pensando más allá de lo que les estás mostrando. Guíalos.',
          'MENCIONAN REGALOS: "Esto le quedaría perfecto a mi hermana." Los compradores de regalos son compradores múltiples. Ya están en modo de compra para otros.',
          'SIN OBJECIÓN DE PRECIO: Cuando presentas la oferta y no pestañean con el precio, tienen margen para más. Prueba con una venta adicional suave.',
          'PREGUNTAN POR RUTINAS: "Entonces uso esto y después qué?" Se están imaginando incorporando tus productos a su vida. Llena esos espacios.',
        ],
    },
    {
            type: 'tip',
      text: 'The 30-second rule: If they express delight within 30 seconds of seeing the result, upsell. If their reaction is muted or delayed, don\'t. Delight is your upsell signal.',
      textEs: 'La regla de los 30 segundos: Si expresan deleite dentro de los 30 segundos de ver el resultado, vende más. Si su reacción es tibia o tardía, no lo hagas. El deleite es tu señal de venta adicional.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Natural Transition Phrases',
      textEs: 'Frases de Transición Natural',
    },
    {
            type: 'paragraph',
      text: 'The transition to upsell should feel seamless, not like a new sales pitch. These phrases bridge naturally:',
      textEs: 'La transición a la venta adicional debe sentirse natural, no como un nuevo pitch de ventas. Estas frases conectan de forma fluida:',
    },
    {
            type: 'bullets',
      items: [
        '\'Since you\'re already doing the eyes, let\'s give the rest of the face a glow too.\' — Natural extension from one product to related areas.',
        '\'You know what would make this even better? The body butter with the same Dead Sea minerals. Your hands felt amazing — imagine your whole body.\' — Sensory bridge.',
        '\'Since you\'re buying for your mom, what about your sister? The Nail Kit is perfect for her too, and it\'s small enough to travel with.\' — Gift expansion.',
        '\'This is our most popular combo — the peeling for weekly treatment and the scrub for your body. Together they\'re {currency}X, which saves you {currency}Y.\' — Bundle logic.',
        '\'You clearly love quality skincare. Can I show you what I personally use with this? It\'s my secret weapon.\' — Personal recommendation bridge.'
      ],
      itemsEs: [
          '"Ya que estás haciendo los ojos, vamos a darle brillo al resto del rostro también." — Extensión natural de un producto a áreas relacionadas.',
          '"¿Sabes qué haría esto aún mejor? La crema corporal con los mismos minerales del Mar Muerto. Tus manos se sintieron increíbles — imagina todo tu cuerpo." — Puente sensorial.',
          '"Ya que estás comprando para tu mamá, ¿qué tal tu hermana? El Kit de Uñas también es perfecto para ella, y es lo suficientemente pequeño para viajar." — Expansión de regalo.',
          '"Este es nuestro combo más popular — el peeling para tratamiento semanal y el exfoliante para tu cuerpo. Juntos cuestan {currency}X, lo que te ahorra {currency}Y." — Lógica de paquete.',
          '"Claramente te encanta el cuidado de la piel de calidad. ¿Puedo mostrarte lo que yo uso personalmente con esto? Es mi arma secreta." — Puente de recomendación personal.',
        ],
    },
    {
            type: 'script',
      text: '\'Since you\'re already getting the syringe for your eyes, the most popular upgrade is adding the second one for your forehead and upper lip. Most people don\'t realize the forehead shows age just as much as the eyes. For {currency}90 more, you\'re getting the complete treatment. Does that make sense?\' Logic + value + gentle close.',
      textEs: '"Ya que ya estás llevando la jeringa para tus ojos, la actualización más popular es agregar la segunda para tu frente y labio superior. La mayoría de la gente no se da cuenta de que la frente muestra la edad tanto como los ojos. Por {currency}90 más, obtienes el tratamiento completo. ¿Tiene sentido?" Lógica + valor + cierre suave.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Since You\'re Already...\' Technique',
      textEs: 'La Técnica de "Ya Que Estás..."',
    },
    {
            type: 'paragraph',
      text: 'This is the most powerful upsell framework because it frames the additional purchase as a natural extension of what they\'re already buying:',
      textEs: 'Este es el marco de venta adicional más poderoso porque enmarca la compra adicional como una extensión natural de lo que ya están comprando:',
    },
    {
            type: 'numbered',
      items: [
        '\'Since you\'re already getting the Peeling...\' (Acknowledge their current decision — validates their choice)',
        '\'...the scrub uses the same Dead Sea minerals but for your body...\' (Introduce the complementary product with familiar framing)',
        '\'...and together they create a complete weekly routine...\' (Paint the full picture — lifestyle upgrade, not just another product)',
        '\'...I can do both for {currency}X instead of {currency}Y...\' (Add value — bundle pricing makes the upsell feel smart, not excessive)'
      ],
      itemsEs: [
          '"Ya que ya estás llevando el Peeling..." (Reconoce su decisión actual — valida su elección)',
          '"...el exfoliante usa los mismos minerales del Mar Muerto pero para tu cuerpo..." (Introduce el producto complementario con un enfoque familiar)',
          '"...y juntos crean una rutina semanal completa..." (Pinta el panorama completo — mejora de estilo de vida, no solo otro producto)',
          '"...puedo hacer ambos por {currency}X en vez de {currency}Y..." (Agrega valor — el precio de paquete hace que la venta adicional se sienta inteligente, no excesiva)',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Bundle Psychology',
      textEs: 'Psicología de los Paquetes',
    },
    {
            type: 'paragraph',
      text: 'Bundles work because they reframe the purchase from \'buying multiple things\' to \'getting a complete solution.\'',
      textEs: 'Los paquetes funcionan porque reenmarcan la compra de "comprar varias cosas" a "obtener una solución completa".',
    },
    {
            type: 'bullets',
      items: [
        'THE COMPLETE ROUTINE: \'This is your full face-and-body care for the year. One purchase, everything you need.\' Simplicity is compelling.',
        'THE GIFT BUNDLE: \'Three gifts, one purchase, done with Christmas shopping.\' Gift buyers love efficiency.',
        'THE SAVINGS FRAME: \'Together they\'re {currency}X, which saves you {currency}Y versus buying separately.\' Even small savings feel smart.',
        'THE EXPERIENCE FRAME: \'This isn\'t just products — it\'s a spa experience at home.\' Elevates the purchase from transaction to lifestyle.'
      ],
      itemsEs: [
          'LA RUTINA COMPLETA: "Este es tu cuidado completo de rostro y cuerpo para todo el año. Una compra, todo lo que necesitas." La simplicidad es convincente.',
          'EL PAQUETE DE REGALOS: "Tres regalos, una compra, listos las compras de Navidad." A los compradores de regalos les encanta la eficiencia.',
          'EL ENFOQUE DE AHORRO: "Juntos cuestan {currency}X, lo que te ahorra {currency}Y comparado con comprar por separado." Incluso los ahorros pequeños se sienten inteligentes.',
          'EL ENFOQUE DE EXPERIENCIA: "Esto no son solo productos — es una experiencia de spa en casa." Eleva la compra de transacción a estilo de vida.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'When NOT to Upsell',
      textEs: 'Cuándo NO Hacer una Venta Adicional',
    },
    {
            type: 'paragraph',
      text: 'Knowing when NOT to upsell is as important as knowing how. Here are the red flags:',
      textEs: 'Saber cuándo NO hacer una venta adicional es tan importante como saber cómo hacerla. Estas son las señales de alerta:',
    },
    {
            type: 'bullets',
      items: [
        'BUDGET STRESS: If they visibly stressed about the base price, don\'t add more. Close what you can and let them leave happy.',
        'INDIFFERENT REACTION: If they said \'It\'s nice\' without enthusiasm, an upsell will feel pushy. They weren\'t sold on the first product.',
        'PARTNER OPPOSITION: If their partner was skeptical about the first product, adding more will trigger a veto. Secure the first sale.',
        'TIME PRESSURE: If they\'re in a rush and agreed to the base product just to move on, adding complexity kills the deal.',
        'SINGLE-ITEM SHOPPERS: Some people came in for one thing and want one thing. Respect their simplicity. A happy single-item customer returns. A pressured multi-item customer doesn\'t.'
      ],
      itemsEs: [
          'ESTRÉS POR PRESUPUESTO: Si se notó estresados por el precio base, no agregues más. Cierra lo que puedas y déjalos irse felices.',
          'REACCIÓN INDIFERENTE: Si dijeron "Está bonito" sin entusiasmo, una venta adicional se sentirá agresiva. No estaban convencidos del primer producto.',
          'OPOSICIÓN DE LA PAREJA: Si su pareja era escéptica sobre el primer producto, agregar más desatará un veto. Asegura la primera venta.',
          'PRESIÓN DE TIEMPO: Si van con prisa y aceptaron el producto base solo para seguir adelante, agregar complejidad mata el trato.',
          'COMPRADORES DE UN SOLO ARTÍCULO: Algunas personas vinieron por una cosa y quieren una cosa. Respeta su simplicidad. Un cliente feliz de un solo artículo regresa. Un cliente presionado a comprar varios no.',
        ],
    },
    {
            type: 'quote',
      text: 'Upselling is not about getting more money. It\'s about giving more value to someone who wants it. When the desire is real, the upsell is service. When the desire is pushed, the upsell is greed.',
      textEs: 'La venta adicional no se trata de obtener más dinero. Se trata de dar más valor a alguien que lo quiere. Cuando el deseo es real, la venta adicional es servicio. Cuando el deseo es forzado, la venta adicional es avaricia.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'What is the key signal that an upsell will be welcomed?',
      options: [
        'They ask about the price',
        'They show genuine delight and amazement during the demo',
        'They look at their watch',
        'They ask about return policy'
      ],
      correctIndex: 1,
      explanation: 'Genuine delight (eyes lighting up, exclamations of amazement) is the strongest signal that an upsell will be welcomed. If they loved the first product, offering more is service, not greed.',
    },
    {
      question: 'What is the \'Since You\'re Already...\' technique?',
      options: [
        'A way to pressure customers',
        'A framework that frames the upsell as a natural extension of their current purchase',
        'A discount strategy',
        'A way to rush the close'
      ],
      correctIndex: 1,
      explanation: 'The \'Since you\'re already...\' technique acknowledges their current purchase and frames the upsell as a natural, logical extension. It validates their choice while introducing the next step.',
    },
    {
      question: 'When should you NOT attempt to upsell?',
      options: [
        'When the customer shows budget stress or indifference to the first product',
        'When the customer loved the demo',
        'When the customer asks about other products',
        'When the customer has no price objection'
      ],
      correctIndex: 0,
      explanation: 'Never upsell when the customer showed budget stress, indifference, partner opposition, or time pressure. Secure the base sale and let them leave happy. A pressured customer doesn\'t return.',
    }
    ],
  },
  'prod-6': {
    id: 'prod-6',
    categoryId: 'products',
    title: 'Product Comparison Guide',
    titleEs: 'Guía de Comparación de Productos',
    subtitle: 'When to pitch which product — skin type matching, age, tourist origin, and decision trees',
    subtitleEs: 'Cuándo empujar qué producto',
    duration: '10 min',
    icon: 'GitCompare',
    order: 6,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'The Right Product to the Right Person at the Right Time',
      textEs: 'El Producto Correcto para la Persona Correcta en el Momento Correcto',
    },
    {
            type: 'paragraph',
      text: 'A 25-year-old solo female traveler has different skincare needs than a 55-year-old couple on a luxury vacation. A French tourist interested in ingredients needs a different pitch than a British tourist buying Christmas gifts. Product matching isn\'t random — it\'s strategic. This lesson gives you decision trees to quickly determine which product to lead with.',
      textEs: 'Una viajera soltera de 25 años tiene necesidades de cuidado de la piel diferentes a las de una pareja de 55 años en vacaciones de lujo. Un turista francés interesado en los ingredientes necesita un pitch diferente al de un turista británico comprando regalos de Navidad. El emparejamiento de productos no es aleatorio — es estratégico. Esta lección te da árboles de decisión para determinar rápidamente con qué producto empezar.',
    },
    {
            type: 'keypoint',
      text: 'Every person who walks past your door has a product that\'s optimal for them. Your job is to identify it in 10 seconds and deliver the perfect pitch. Matching = higher conversion, higher satisfaction, and higher return visits.',
      textEs: 'Cada persona que pasa por tu puerta tiene un producto que es óptimo para ella. Tu trabajo es identificarlo en 10 segundos y dar el pitch perfecto. El emparejamiento = mayor conversión, mayor satisfacción y más visitas de regreso.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Quick Decision Tree: Which Product to Lead With',
      textEs: 'Árbol de Decisión Rápido: Con Qué Producto Empezar',
    },
    {
            type: 'paragraph',
      text: 'Follow this flow chart mentally for each customer:',
      textEs: 'Sigue este diagrama de flujo mentalmente para cada cliente:',
    },
    {
            type: 'numbered',
      items: [
        'VISIBLE EYE CONCERNS? (Bags, crow\'s feet, tired eyes) → LEAD WITH SYRINGE. Immediate visual result. High perceived value. Premium price point.',
        'YOUNG (20s-30s) + GOOD SKIN? → LEAD WITH PEELING. Prevention-focused, glow-enhancing, weekly ritual appeal. Or NAIL KIT for visible natural nails.',
        'DRY SKIN SIGNS? (Flaky, dull, mentions dryness) → LEAD WITH SCRUB. Sensory demo is immediate and universally appealing.',
        'NATURAL NAILS + NO POLISH? → LEAD WITH NAIL KIT. Fast demo, visible result, gift potential.',
        'BUYING GIFTS? → LEAD WITH SCRUB/NAIL KIT COMBO. Lower price points, unisex appeal, easy gifting.',
        'MALE CUSTOMER OR SKEPTICAL PARTNER? → LEAD WITH SCRUB. Unisex, no beauty stigma, feels practical rather than cosmetic.',
        'LUXURY BUYER? (Designer bags, expensive watch) → LEAD WITH SYRINGE. Premium positioning matches their expectations.'
      ],
      itemsEs: [
          '¿OJOS VISIBLEMENTE AFECTADOS? (Bolsas, patas de gallo, ojos cansados) → EMPIEZA CON LA JERINGA. Resultado visual inmediato. Alto valor percibido. Punto de precio premium.',
          '¿JOVEN (20-30s) + BUENA PIEL? → EMPIEZA CON EL PEELING. Enfoque en prevención, realza el brillo, apela al ritual semanal. O el KIT DE UÑAS para uñas naturales visibles.',
          '¿SIGNOS DE PIEL SECA? (Descamación, opaca, menciona sequedad) → EMPIEZA CON EL EXFOLIANTE. La demostración sensorial es inmediata y universalmente atractiva.',
          '¿UÑAS NATURALES + SIN ESMALTE? → EMPIEZA CON EL KIT DE UÑAS. Demostración rápida, resultado visible, potencial de regalo.',
          '¿COMPRANDO REGALOS? → EMPIEZA CON EL COMBO EXFOLIANTE/KIT DE UÑAS. Puntos de precio más bajos, atractivo unisex, fácil de regalar.',
          '¿CLIENTE HOMBRE O PAREJA ESCÉPTICA? → EMPIEZA CON EL EXFOLIANTE. Unisex, sin estigma de belleza, se siente práctico en lugar de cosmético.',
          '¿COMPRADOR DE LUJO? (Bolsas de diseñador, reloj caro) → EMPIEZA CON LA JERINGA. El posicionamiento premium coincide con sus expectativas.',
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
        'SENSITIVE SKIN: Lead with the gentle approach. Peeling is dermatologist-recommended for sensitivity and eczema. Emphasize the \'natural, no chemicals\' angle. Do a small patch test first.',
        'MATURE SKIN (50+): Syringe (collagen stimulation, visible anti-aging) + Peeling (restores glow that diminishes with age) + rich Body Butter. Focus on results and investment in self-care.',
        'YOUNG SKIN (20s): Peeling (prevention, weekly glow) + Nail Kit (fun, affordable, giftable). Syringe may feel unnecessary unless they have specific eye concerns.'
      ],
      itemsEs: [
          'PIEL SECA: Peeling (elimina capas muertas, permite mejor absorción de la crema) + Exfoliante (los minerales del Mar Muerto hidratan) + Crema Corporal (humedad intensa). Evitar: nada — todos los productos funcionan para piel seca.',
          'PIEL GRASA: Peeling (limpieza profunda semanal, reduce acumulación de grasa) + Jeringa (el área de los ojos típicamente no es grasa). El exfoliante está bien con moderación. La crema corporal puede sentirse pesada — sugiere cantidades más pequeñas.',
          'PIEL SENSIBLE: Empieza con el enfoque suave. El Peeling es recomendado por dermatólogos para sensibilidad y eczema. Enfatiza el ángulo de "natural, sin químicos". Haz una pequeña prueba de parche primero.',
          'PIEL MADURA (50+): Jeringa (estimulación de colágeno, anti-edad visible) + Peeling (restaura el brillo que disminuye con la edad) + Crema Corporal rica. Enfócate en resultados e inversión en el cuidado personal.',
          'PIEL JOVEN (20s): Peeling (prevención, brillo semanal) + Kit de Uñas (divertido, asequible, regalable). La Jeringa puede sentirse innecesaria a menos que tengan preocupaciones específicas en los ojos.',
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
      left: { label: 'Younger Customers (20s-30s)', text: 'Lead with: Peeling (prevention + glow) or Nail Kit (affordable + fun). Frame as: Self-care ritual, Instagram-worthy results, smart prevention. Avoid: Heavy anti-aging language. They don\'t relate to \'wrinkles\' yet.' },
      leftEs: { label: 'Clientes Jóvenes (20-30s)', text: 'Empieza con: Peeling (prevención + brillo) o Kit de Uñas (asequible + divertido). Enmarca como: Ritual de cuidado personal, resultados dignos de Instagram, prevención inteligente. Evita: Lenguaje fuerte anti-edad. Todavía no se identifican con "arrugas".' },
      right: { label: 'Mature Customers (40s+)', text: 'Lead with: Syringe (visible anti-aging) or Peeling (restores radiance). Frame as: Investment in yourself, proven results, dermatologist-recommended. Emphasize: The visible difference in the mirror. They know their skin and notice changes.' },
      rightEs: { label: 'Clientes Maduras (40+)', text: 'Empieza con: Jeringa (antiedad visible) o Peeling (devuelve la luminosidad). Enfócalo como: inversión en ti misma, resultados probados, recomendado por dermatólogos. Enfatiza: la diferencia visible en el espejo. Conocen su piel y notan los cambios.' }
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Tourist Origin → Product Matching',
      textEs: 'Origen del Turista → Emparejamiento de Producto',
    },
    {
            type: 'paragraph',
      text: 'Different nationalities have different skincare cultures and preferences:',
      textEs: 'Diferentes nacionalidades tienen diferentes culturas de cuidado de la piel y preferencias:',
    },
    {
            type: 'bullets',
      items: [
        'SPANISH: Peeling or Scrub (value-conscious, respond to the price gap). Emphasize: \'Smart shopping in {locationName}.\'',
        'FRENCH: Syringe or Peeling (skincare-savvy, appreciate quality and science). Emphasize: Ingredients, dermatologist recommendation, European quality.',
        'BRITISH: Scrub or Nail Kit (love sensory experiences, appreciate humor, gift-buyers). Emphasize: Fun demo, Christmas gifts, bargain pricing.',
        'EASTERN EUROPEAN: Syringe (premium positioning, visible results, status). Emphasize: #1 best-seller, luxury treatment, European prestige.',
        'ASIAN: Peeling or Syringe (ingredient-conscious, results-driven). Emphasize: Science, natural ingredients, visible before/after.',
        'GERMAN/DUTCH: Peeling or Scrub (practical, quality-focused). Emphasize: Value per use, long-lasting, dermatologist-approved.'
      ],
      itemsEs: [
          'ESPAÑOLES: Peeling o Exfoliante (conscientes del valor, responden a la diferencia de precio). Enfatiza: "Compras inteligentes en {locationName}".',
          'FRANCESES: Jeringa o Peeling (conocedores de cuidado de la piel, aprecian calidad y ciencia). Enfatiza: Ingredientes, recomendación de dermatólogo, calidad europea.',
          'BRITÁNICOS: Exfoliante o Kit de Uñas (aman experiencias sensoriales, aprecian el humor, compradores de regalos). Enfatiza: Demo divertida, regalos de Navidad, precios de ganga.',
          'EUROPEOS DEL ESTE: Jeringa (posicionamiento premium, resultados visibles, estatus). Enfatiza: #1 más vendido, tratamiento de lujo, prestigio europeo.',
          'ASIÁTICOS: Peeling o Jeringa (conscientes de ingredientes, enfocados en resultados). Enfatiza: Ciencia, ingredientes naturales, antes/después visible.',
          'ALEMANES/NEERLANDESES: Peeling o Exfoliante (prácticos, enfocados en calidad). Enfatiza: Valor por uso, duradero, aprobado por dermatólogos.',
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
        'EYES LOOK TIRED → SYRINGE ({currency}100-{currency}300)',
        'YOUNG + GLOW-FOCUSED → PEELING ({currency}50-{currency}150)',
        'DRY SKIN / WINTER → SCRUB ({currency}30-{currency}120)',
        'NATURAL NAILS → NAIL KIT ({currency}30-{currency}120)',
        'CHRISTMAS GIFTS → SCRUB/NAIL KIT COMBO ({currency}60-{currency}120)',
        'LUXURY SHOPPER → SYRINGE → PEELING UPSALE ({currency}300+)',
        'SKEPTICAL MAN → SCRUB (practical, sensory, {currency}30-{currency}60)'
      ],
      itemsEs: [
          'OJOS SE VEN CANSADOS → JERINGA ({currency}100-{currency}300)',
          'JOVEN + ENFOQUE EN BRILLO → PEELING ({currency}50-{currency}150)',
          'PIEL SECA / INVIERNO → EXFOLIANTE ({currency}30-{currency}120)',
          'UÑAS NATURALES → KIT DE UÑAS ({currency}30-{currency}120)',
          'REGALOS DE NAVIDAD → COMBO EXFOLIANTE/KIT DE UÑAS ({currency}60-{currency}120)',
          'COMPRADOR DE LUJO → JERINGA → VENTA ADICIONAL DE PEELING ({currency}300+)',
          'HOMBRE ESCÉPTICO → EXFOLIANTE (práctico, sensorial, {currency}30-{currency}60)',
        ],
    },
    {
            type: 'tip',
      text: 'This isn\'t rigid — it\'s a starting point. The best sellers read the individual, not just the demographic. A 25-year-old with prominent eye bags is still a syringe candidate. A 60-year-old who loves nail care is still a Nail Kit candidate. Use the guide, then adapt.',
      textEs: 'Esto no es rígido — es un punto de partida. Los mejores vendedores leen al individuo, no solo al demográfico. Una persona de 25 años con bolsas prominentes sigue siendo candidata para la jeringa. Una persona de 60 años que ama el cuidado de uñas sigue siendo candidata para el Kit de Uñas. Usa la guía, luego adapta.',
    },
    {
            type: 'quote',
      text: 'Matching the right product isn\'t about stereotypes. It\'s about observation, empathy, and giving each person exactly what they need. That\'s how you become a trusted advisor, not just a seller.',
      textEs: 'Emparejar el producto correcto no se trata de estereotipos. Se trata de observación, empatía y dar a cada persona exactamente lo que necesita. Así es como te conviertes en un asesor de confianza, no solo en un vendedor.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'Which product should you lead with for a customer with visible under-eye bags?',
      options: [
        'Peeling',
        'Scrub',
        'Syringe',
        'Nail Kit'
      ],
      correctIndex: 2,
      explanation: 'Visible eye concerns (bags, crow\'s feet, tired eyes) make the Syringe the optimal lead product. The immediate visual result and high perceived value make it the perfect match.',
    },
    {
      question: 'Which product is best for a skeptical male partner?',
      options: [
        'Syringe',
        'Peeling',
        'Scrub',
        'Nail Kit'
      ],
      correctIndex: 2,
      explanation: 'The Scrub is ideal for skeptical men because it\'s unisex, feels practical rather than cosmetic, has an immediate sensory demo, and doesn\'t carry a beauty stigma.',
    },
    {
      question: 'Why should you adapt product recommendations by tourist origin?',
      options: [
        'Because of stereotypes',
        'Because different cultures have different skincare priorities, knowledge levels, and buying motivations',
        'Because the manager says so',
        'Because some products are only for certain nationalities'
      ],
      correctIndex: 1,
      explanation: 'Different nationalities have different skincare cultures, ingredient knowledge, and buying motivations. French tourists appreciate science; British tourists love sensory experiences; Eastern European tourists respond to premium positioning. Matching to cultural context increases relevance.',
    }
    ],
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
      text: 'The objection handling framework: Acknowledge → Reframe → Provide solution → Close. Never argue. Never dismiss. Always validate their concern first, then guide them to a new perspective.',
      textEs: 'El marco de manejo de objeciones: Reconocer → Reenmarcar → Proporcionar solución → Cerrar. Nunca discutas. Nunca descartes. Siempre valida su preocupación primero, luego guíalos hacia una nueva perspectiva.',
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
        '\'IT\'S TOO EXPENSIVE\' → \'I completely understand. Let me break it down: this lasts a full year. That\'s less than {currency}3 per week. How much is your daily coffee? This costs less and lasts far longer. Which option works better for your budget?\' (Reframe as cost-per-use, then offer choices.)',
        '\'I CAN GET CHEAPER ONLINE\' → \'You absolutely can find cheaper products online. But can you try them first? See the result in 2 minutes? This is the experience you\'re paying for — knowing it works before you buy. Plus, you have my WhatsApp if you ever need anything. Try getting that from a website.\' (Value of experience + service.)',
        '\'I WASN\'T PLANNING TO SPEND THIS MUCH TODAY\' → \'I totally get it — neither was my last customer! But she tried it, saw the result, and realized it\'s an investment, not an impulse buy. This isn\'t something you\'ll replace next month. It\'s a year of results. Want me to show you what she saw?\' (Normalize + reframe as investment + curiosity.)',
        '\'I DON\'T HAVE CASH\' → \'No problem at all! We take all cards, Apple Pay, Google Pay — whatever works for you.\' (Remove the payment barrier immediately.)'
      ],
      itemsEs: [
          '"ES DEMASIADO CARO" → "Lo entiendo perfectamente. Déjame explicarlo: esto dura un año completo. Eso es menos de {currency}3 por semana. ¿Cuánto cuesta tu café diario? Esto cuesta menos y dura mucho más. ¿Qué opción funciona mejor para tu presupuesto?" (Reenmarca como costo por uso, luego ofrece opciones.)',
          '"PUEDO ENCONTRAR MÁS BARATO EN LÍNEA" → "Absolutamente puedes encontrar productos más baratos en línea. Pero, ¿puedes probarlos primero? ¿Ver el resultado en 2 minutos? Esta es la experiencia por la que estás pagando — saber que funciona antes de comprar. Además, tienes mi WhatsApp si alguna vez necesitas algo. Intenta obtener eso de un sitio web." (Valor de la experiencia + servicio.)',
          '"NO TENÍA PLANEADO GASTAR TANTO HOY" → "Lo entiendo totalmente — ¡mi última cliente tampoco! Pero ella lo probó, vio el resultado y se dio cuenta de que es una inversión, no una compra por impulso. Esto no es algo que reemplazarás el mes que viene. Es un año de resultados. ¿Quieres que te muestre lo que ella vio?" (Normaliza + reenmarca como inversión + curiosidad.)',
          '"NO TENGO EFECTIVO" → "¡Ningún problema! Aceptamos todas las tarjetas, Apple Pay, Google Pay — lo que funcione para ti." (Elimina la barrera de pago inmediatamente.)',
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
        '\'I ALREADY HAVE CREAM AT HOME\' → \'That\'s great — this isn\'t a cream! It\'s completely different. Your cream hydrates; this removes dead skin layers so your cream works 10 times better. They work together. Think of this as the prep step your routine is missing.\' (Differentiate, don\'t compete.)',
        '\'I\'VE NEVER HEARD OF THIS BRAND\' → \'That\'s actually why I\'m here — to introduce it! We\'re a boutique brand, not a mass-market label. That\'s why you can only find us in select locations like {locationName}. Smaller brand, better ingredients, real results. Let the demo speak for itself.\' (Reframe boutique as exclusive advantage.)',
        '\'I DON\'T BELIEVE IT WORKS\' → \'I love that you\'re skeptical — that means you\'re smart. Don\'t believe me. Believe your own eyes. Two minutes, one demo, you be the judge. If you don\'t see a difference, I\'ll be the first to say it\'s not for you. Deal?\' (Validate skepticism + challenge + low risk.)',
        '\'IT\'S PROBABLY FULL OF CHEMICALS\' → \'Actually, it\'s the opposite! 100% natural, no parabens, no chemicals, no injections. That\'s exactly why dermatologists recommend it. Want to see the ingredient list?\' (Correct with facts, not defensiveness.)'
      ],
      itemsEs: [
          '"YA TENGO CREMA EN CASA" → "¡Eso es genial — esto no es una crema! Es completamente diferente. Tu crema hidrata; esto elimina capas de piel muerta para que tu crema funcione 10 veces mejor. Trabajan juntas. Piensa en esto como el paso de preparación que le falta a tu rutina." (Diferencia, no compitas.)',
          '"NUNCA HE OÍDO DE ESTA MARCA" → "¡Eso es exactamente por qué estoy aquí — para presentarla! Somos una marca boutique, no una etiqueta de mercado masivo. Por eso solo nos puedes encontrar en ubicaciones selectas como {locationName}. Marca más pequeña, mejores ingredientes, resultados reales. Deja que la demostración hable por sí sola." (Reenmarca boutique como ventaja exclusiva.)',
          '"NO CREO QUE FUNCIONE" → "Me encanta que seas escéptica — eso significa que eres inteligente. No me creas a mí. Cree en tus propios ojos. Dos minutos, una demostración, tú eres el juez. Si no ves una diferencia, seré el primero en decir que no es para ti. ¿Trato?" (Valida el escepticismo + desafío + bajo riesgo.)',
          '"PROBABLEMENTE ESTÁ LLENO DE QUÍMICOS" → "¡De hecho, es todo lo contrario! 100% natural, sin parabenos, sin químicos, sin inyecciones. Por eso exactamente los dermatólogos lo recomiendan. ¿Quieres ver la lista de ingredientes?" (Corrige con hechos, no defensivamente.)',
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
        '\'I NEED TO ASK MY HUSBAND/WIFE\' → \'Of course! But can I ask — do you love it? Because if YOU love it, let\'s get his opinion. Sir, come see what I just showed your wife!\' (Involve the partner immediately — don\'t let them leave.)',
        '\'I\'LL THINK ABOUT IT AND COME BACK\' → \'I totally understand. But honestly? Most people who say they\'ll come back don\'t. Not because they don\'t love it — because life gets busy. And this offer is only here today. If you know you love it, why wait?\' (Gentle urgency + truth.)',
        '\'I NEED TO COMPARE PRICES\' → \'Smart shopping! But here\'s the thing — you can\'t compare this to anything else because there\'s nothing like it. And the price you see here only exists in {locationName}. Once you cross that border, it\'s {currency}500. This is a now-or-never price.\' (Location-based urgency.)',
        '\'I DON\'T HAVE TIME RIGHT NOW\' → \'I totally get it — you\'re busy. How about this: 60 seconds. Not even 2. I\'ll do the demo on one hand. If you don\'t feel the difference immediately, you walk away. Deal?\' (Time-bound offer removes the barrier.)'
      ],
      itemsEs: [
          '"NECESITO PREGUNTARLE A MI ESPOSO/ESPOSA" → "¡Por supuesto! Pero permíteme preguntar — ¿te encanta? Porque si A TI te encanta, vamos a obtener su opinión. ¡Señor, venga a ver lo que acabo de mostrarle a su esposa!" (Involucra a la pareja inmediatamente — no dejes que se vayan.)',
          '"LO VOY A PENSAR Y REGRESO" → "Lo entiendo totalmente. Pero, ¿honestamente? La mayoría de la gente que dice que regresará no lo hace. No porque no les encante — porque la vida se pone ocupada. Y esta oferta solo está aquí hoy. Si sabes que te encanta, ¿por qué esperar?" (Urgencia suave + verdad.)',
          '"NECESITO COMPARAR PRECIOS" → "¡Compra inteligente! Pero aquí está la cosa — no puedes comparar esto con nada más porque no hay nada como esto. Y el precio que ves aquí solo existe en {locationName}. Una vez que cruces esa frontera, son {currency}500. Este es un precio de ahora o nunca." (Urgencia por ubicación.)',
          '"NO TENGO TIEMPO AHORA" → "Lo entiendo totalmente — estás ocupada. ¿Qué tal esto? 60 segundos. Ni siquiera 2. Te hago la demostración en una mano. Si no sientes la diferencia inmediatamente, te vas. ¿Trato?" (La oferta con límite de tiempo elimina la barrera.)',
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
        '\'I DON\'T HAVE TIME FOR A SKINCARE ROUTINE\' → \'That\'s exactly why you\'ll love this. It\'s once a week. Five minutes. One bottle lasts a year. It\'s the lowest time investment for the highest return in skincare. Less time than you spend brushing your teeth daily.\' (Reframe as time-saving.)',
        '\'I\'M TRAVELING AND DON\'T WANT TO CARRY MORE\' → \'Perfect timing, actually! This is exactly what your skin needs after travel — the Dead Sea minerals rehydrate brutally. And it\'s small enough for your carry-on. Plus, you can\'t get this price anywhere else. Get it now while you\'re here.\' (Turn travel into an advantage.)',
        '\'I\'M ALLERGIC TO EVERYTHING\' → \'I appreciate you telling me. The good news is this is 100% natural — no synthetic fragrances, no harsh chemicals. But let me do a small patch test on your wrist first. If there\'s any reaction, we stop immediately. Sound fair?\' (Safety first + confidence in product.)',
        '\'I NEVER BUY FROM STREET SELLERS\' → \'I totally get that! I\'m not a street seller — I\'m a brand ambassador. This is our boutique shop right here. Come inside, sit down, have a proper experience. No pressure, just results. If you don\'t love it, no problem.\' (Reframe from street to boutique.)'
      ],
      itemsEs: [
          '"NO TENGO TIEMPO PARA UNA RUTINA DE CUIDADO DE LA PIEL" → "¡Por eso exactamente te encantará esto. Es una vez por semana. Cinco minutos. Una botella dura un año. Es la inversión de tiempo más baja para el retorno más alto en cuidado de la piel. Menos tiempo del que pasas cepillándote los dientes diariamente." (Reenmarca como ahorro de tiempo.)',
          '"ESTOY VIAJANDO Y NO QUIERO CARGAR MÁS COSAS" → "¡Justo a tiempo, de hecho! Esto es exactamente lo que tu piel necesita después de viajar — los minerales del Mar Muerto rehidratan intensamente. Y es lo suficientemente pequeño para tu equipaje de mano. Además, no puedes conseguir este precio en ningún otro lado. Consíguelo ahora mientras estás aquí." (Convierte el viaje en una ventaja.)',
          '"SOY ALÉRGICA A TODO" → "Aprecio que me lo digas. La buena noticia es que esto es 100% natural — sin fragancias sintéticas, sin químicos agresivos. Pero déjame hacerte primero una pequeña prueba de parche en tu muñeca. Si hay cualquier reacción, paramos inmediatamente. ¿Te parece justo?" (Seguridad primero + confianza en el producto.)',
          '"NUNCA COMPRÓ A VENDEDORES DE CALLE" → "¡Lo entiendo totalmente! No soy una vendedora de calle — soy embajadora de la marca. Esta es nuestra tienda boutique aquí mismo. Pasa, siéntate, ten una experiencia adecuada. Sin presión, solo resultados. Si no te encanta, ningún problema." (Reenmarca de calle a boutique.)',
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
        '\'I FEEL GUILTY SPENDING MONEY ON MYSELF\' → \'I hear this all the time. But listen — you work hard, you take care of everyone else, when was the last time you did something just for YOU? This isn\'t selfish. It\'s self-care. And you deserve it.\' (Emotional reframe — guilt into deservingness.)',
        '\'I BOUGHT SOMETHING LAST TIME AND NEVER USED IT\' → \'I totally understand. That\'s why I ask for two promises: that you\'ll actually use it, and that you\'ll tell your friends if you love it. Most of my customers text me within a week saying they\'re obsessed. I think you will too.\' (Accountability + social proof.)',
        '\'I\'M NOT THE TYPE TO BUY LUXURY THINGS\' → \'You know what? The best customers are the ones who don\'t usually splurge. Because when they do, they actually appreciate it. This isn\'t about being fancy — it\'s about feeling good when you look in the mirror. Everyone deserves that.\' (Democratize luxury.)',
        '\'MY PRODUCT AT HOME WORKS FINE\' → \'That\'s great! This doesn\'t replace what works — it makes it work BETTER. Think of it like this: you have a good car, but wouldn\'t you rather drive on a freshly paved road? This is the road. Your cream is the car. Together, perfection.\' (Complement, don\'t compete.)'
      ],
      itemsEs: [
          '"ME SIENTO CULPABLE GASTANDO DINERO EN MÍ" → "Escucho esto todo el tiempo. Pero escucha — trabajas duro, cuidas de todos los demás, ¿cuándo fue la última vez que hiciste algo solo para TI? Esto no es egoísta. Es cuidado personal. Y te lo mereces." (Reenfoque emocional — culpa en merecimiento.)',
          '"LA ÚLTIMA VEZ COMPRÉ ALGO Y NUNCA LO USÉ" → "Lo entiendo totalmente. Por eso pido dos promesas: que realmente lo usarás, y que les dirás a tus amigas si te encanta. La mayoría de mis clientes me escriben dentro de una semana diciendo que están obsesionadas. Creo que tú también lo estarás." (Responsabilidad + prueba social.)',
          '"NO SOY DEL TIPO QUE COMPRA COSAS DE LUJO" → "¿Sabes qué? Los mejores clientes son los que usualmente no se dan gustos. Porque cuando lo hacen, realmente lo aprecian. Esto no se trata de ser fancy — se trata de sentirte bien cuando te ves en el espejo. Todos merecen eso." (Democratiza el lujo.)',
          '"MI PRODUCTO EN CASA FUNCIONA BIEN" → "¡Eso es genial! Esto no reemplaza lo que funciona — lo hace funcionar MEJOR. Piénsalo así: tienes un buen coche, pero ¿no preferirías conducir por una carretera recién asfaltada? Esta es la carretera. Tu crema es el coche. Juntos, perfección." (Complementa, no compitas.)',
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
        'ACKNOWLEDGE: \'I completely understand.\' \'That\'s totally fair.\' \'I hear this all the time.\' Validation disarms defensiveness.',
        'REFRAME: Show them a different way to see the situation. Cost-per-use. Investment vs. expense. Experience vs. product.',
        'PROVIDE PROOF OR SOLUTION: Demo result, social proof, alternative option, or logical breakdown.',
        'SOFT CLOSE: \'Does that help?\' \'Which option works better?\' \'Want to see what I mean?\' Give them a path forward.'
      ],
      itemsEs: [
          'RECONOCER: "Lo entiendo perfectamente." "Eso es totalmente justo." "Escucho esto todo el tiempo." La validación desarma la defensiva.',
          'REENMARCAR: Muéstrales una forma diferente de ver la situación. Costo por uso. Inversión vs. gasto. Experiencia vs. producto.',
          'PROPORCIONAR PRUEBA O SOLUCIÓN: Resultado de demostración, prueba social, opción alternativa o desglose lógico.',
          'CIERRE SUAVE: "¿Eso ayuda?" "¿Qué opción funciona mejor?" "¿Quieres ver a qué me refiero?" Dale un camino hacia adelante.',
        ],
    },
    {
            type: 'tip',
      text: 'The most powerful phrase in objection handling: \'I completely understand.\' These three words validate the customer\'s concern without agreeing with it. They create psychological safety. Once the customer feels heard, they\'re open to hearing your perspective.',
      textEs: 'La frase más poderosa en el manejo de objeciones: "Lo entiendo perfectamente." Estas tres palabras validan la preocupación del cliente sin estar de acuerdo con ella. Crean seguridad psicológica. Una vez que el cliente se siente escuchado, está abierto a escuchar tu perspectiva.',
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
      question: 'What is the four-step objection handling framework?',
      options: [
        'Argue → Convince → Pressure → Close',
        'Acknowledge → Reframe → Provide solution → Close',
        'Ignore → Discount → Give up → Walk away',
        'Agree → Agree → Agree → Accept no'
      ],
      correctIndex: 1,
      explanation: 'The framework is: Acknowledge (validate their concern), Reframe (show a new perspective), Provide solution (proof, demo, or alternative), and Close (give them a path forward).',
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
      explanation: 'Don\'t compete with their cream — complement it. Position your product as the prep step that makes their existing cream work 10x better. They\'re not replacing; they\'re enhancing.',
    },
    {
      question: 'Why is \'I completely understand\' such a powerful phrase in objection handling?',
      options: [
        'It ends the conversation',
        'It validates the customer\'s concern without agreeing with it, creating psychological safety',
        'It means you agree with their objection',
        'It confuses the customer'
      ],
      correctIndex: 1,
      explanation: '\'I completely understand\' validates the customer\'s feelings without conceding the point. It creates psychological safety that opens them to hearing your perspective.',
    }
    ],
  },
  'prod-8': {
    id: 'prod-8',
    categoryId: 'products',
    title: 'The WhatsApp Close & Follow-Up',
    titleEs: 'El Cierre de WhatsApp y Seguimiento',
    subtitle: 'Turning one sale into a relationship — follow-up templates, client books, and referral strategies',
    subtitleEs: 'El seguimiento cierra la mitad de las ventas',
    duration: '10 min',
    icon: 'MessageSquare',
    order: 8,
    xpReward: 150,
    sections: [
    {
            type: 'header',
      text: 'The Sale Is Just the Beginning of the Relationship',
      textEs: 'La Venta es Solo el Comienzo de la Relación',
    },
    {
            type: 'paragraph',
      text: 'A one-time sale is good. A returning customer is gold. A referring customer is a gold mine. The WhatsApp close transforms a single transaction into an ongoing relationship — and relationships are where real money is made. A customer who buys once might spend {currency}150. A customer who returns three times and refers two friends might spend {currency}1,000+ over their lifetime. That\'s the math that matters.',
      textEs: 'Una venta única es buena. Un cliente que regresa es oro. Un cliente que refiere es una mina de oro. El cierre de WhatsApp transforma una transacción única en una relación continua — y las relaciones son donde se hace el dinero real. Un cliente que compra una vez podría gastar {currency}150. Un cliente que regresa tres veces y refiere a dos amigos podría gastar {currency}1,000+ a lo largo de su vida. Esa es la matemática que importa.',
    },
    {
            type: 'keypoint',
      text: 'The WhatsApp close isn\'t just about having their number. It\'s about becoming their personal beauty advisor — the person they text when they need more product, when they have a question, when they\'re planning their next {locationName} trip. You become their connection to the brand.',
      textEs: 'El cierre de WhatsApp no se trata solo de tener su número. Se trata de convertirte en su asesor de belleza personal — la persona a la que escriben cuando necesitan más producto, cuando tienen una pregunta, cuando están planeando su próximo viaje a {locationName}. Te conviertes en su conexión con la marca.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The WhatsApp Close: During the Sale',
      textEs: 'El Cierre de WhatsApp: Durante la Venta',
    },
    {
            type: 'paragraph',
      text: 'The WhatsApp exchange should feel natural and mutual, not one-sided. Here\'s how to set it up:',
      textEs: 'El intercambio de WhatsApp debe sentirse natural y mutuo, no unilateral. Así es como configurarlo:',
    },
    {
            type: 'numbered',
      items: [
        'THE SETUP: \'You use WhatsApp, right? Perfect.\' This assumes they use it (most people do) and frames the exchange as natural.',
        'THE EXCHANGE: \'Give me your number and I\'ll send you my contact — if you ever need anything, want to reorder, or have questions about how to use it, just message me directly.\' This positions the connection as SERVICE, not marketing.',
        'THE IMMEDIATE VALUE: Send a message RIGHT THEN while they\'re still in the shop. \'Hi [Name]! It\'s [Your Name] from Zero Lines in {locationName}. Here\'s my number — save it! If you need anything at all, I\'m here. Enjoy your new products!\' This confirms the number works and establishes the channel immediately.',
        'THE TWO PROMISES: \'Promise me two things: you\'ll actually use it, and if you love it, you\'ll tell your friends about us.\' These two promises create accountability and plant the referral seed.'
      ],
      itemsEs: [
          'LA CONFIGURACIÓN: "¿Usas WhatsApp, verdad? Perfecto." Esto asume que lo usan (la mayoría de la gente sí) y enmarca el intercambio como natural.',
          'EL INTERCAMBIO: "Dame tu número y te envío mi contacto — si alguna vez necesitas algo, quieres reordenar, o tienes preguntas sobre cómo usarlo, solo escríbeme directamente." Esto posiciona la conexión como SERVICIO, no como marketing.',
          'EL VALOR INMEDIATO: Envía un mensaje EN ESE MOMENTO mientras todavía están en la tienda. "¡Hola [Nombre]! Soy [Tu Nombre] de Zero Lines en {locationName}. Aquí está mi número — ¡guárdalo! Si necesitas algo en absoluto, aquí estoy. ¡Disfruta tus nuevos productos!" Esto confirma que el número funciona y establece el canal inmediatamente.',
          'LAS DOS PROMESAS: "Prométeme dos cosas: que realmente lo usarás, y si te encanta, que les contarás a tus amigos sobre nosotros." Estas dos promesas crean responsabilidad y plantan la semilla de la referencia.',
        ],
    },
    {
            type: 'script',
      text: '\'You use WhatsApp, right? Perfect. Give me your number — I\'ll send you my contact right now. If you ever need to reorder, have questions about how to use it, or just want to say hi when you\'re back in {locationName}, I\'m here. Here\'s my number too. We\'re officially friends now!\' [Send message immediately while they\'re in the shop.]',
      textEs: '"¿Usas WhatsApp, verdad? Perfecto. Dame tu número — te envío mi contacto ahora mismo. Si alguna vez necesitas reordenar, tienes preguntas sobre cómo usarlo, o solo quieres saludar cuando regreses a {locationName}, aquí estoy. Aquí está mi número también. ¡Ya somos amigos oficialmente!" [Envía el mensaje inmediatamente mientras están en la tienda.]',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Follow-Up Message Templates',
      textEs: 'Plantillas de Mensajes de Seguimiento',
    },
    {
            type: 'paragraph',
      text: 'These are word-for-word templates you can use. Adapt them to your voice:',
      textEs: 'Estas son plantillas palabra por palabra que puedes usar. Adáptalas a tu voz:',
    },
    {
            type: 'bullets',
      items: [
        'DAY 1 — THE CHECK-IN: \'Hi [Name]! Hope you\'re enjoying {locationName}. Just wanted to check — did you try the [product] yet? Any questions? I\'m here if you need me!\' (Shows you care, opens dialogue.)',
        'DAY 3 — THE TIP: \'Hey [Name]! Pro tip for the [product]: use it at night before bed so it has time to work its magic while you sleep. Let me know how it goes!\' (Adds value, keeps connection alive.)',
        'DAY 7 — THE LOVE CHECK: \'Hi [Name]! It\'s been a week — how are you loving the [product]? Have people noticed the difference? I bet they have!\' (Encourages them to reflect on results and share positive feelings.)',
        'DAY 14 — THE REORDER NUDGE: \'Hey [Name]! If you\'re running low on anything or want to grab another before your next trip, just let me know. I can hold something for you!\' (Plants the reorder seed without pressure.)',
        'MONTH 3 — THE RETURNING CUSTOMER: \'Hi [Name]! Missing {locationName} yet? When you\'re planning your next trip, let me know — I have some new products I think you\'ll love. Plus, I\'ll have a little surprise waiting for you!\' (Creates anticipation for return visit.)'
      ],
      itemsEs: [
          'DÍA 1 — EL CHECK-IN: "¡Hola [Nombre]! Espero que estés disfrutando {locationName}. Solo quería comprobar — ¿ya probaste el [producto]? ¿Alguna pregunta? ¡Aquí estoy si me necesitas!" (Muestra que te importa, abre el diálogo.)',
          'DÍA 3 — EL TIP: "¡Hola [Nombre]! Tip pro para el [producto]: úsalo en la noche antes de dormir para que tenga tiempo de hacer su magia mientras duermes. ¡Dime cómo te va!" (Agrega valor, mantiene la conexión viva.)',
          'DÍA 7 — EL CHECK DE ENCANTO: "¡Hola [Nombre]! Ya hace una semana — ¿cómo te está gustando el [producto]? ¿La gente ha notado la diferencia? ¡Apuesto a que sí!" (Los anima a reflexionar sobre resultados y compartir sentimientos positivos.)',
          'DÍA 14 — EL EMPUJÓN DE REORDEN: "¡Hola [Nombre]! Si se te está acabando algo o quieres agarrar otro antes de tu próximo viaje, solo avísame. ¡Puedo guardarte algo!" (Planta la semilla de reorden sin presión.)',
          'MES 3 — EL CLIENTE QUE REGRESA: "¡Hola [Nombre]! ¿Ya extrañas {locationName}? Cuando estés planeando tu próximo viaje, avísame — tengo algunos productos nuevos que creo que te encantarán. ¡Además, tendré una pequeña sorpresa esperándote!" (Crea anticipación para la visita de regreso.)',
        ],
    },
    {
            type: 'tip',
      text: 'Space your messages appropriately. One message in the first week, then one more after two weeks, then monthly at most. Too many messages feels spammy. Too few feels forgotten. Quality over quantity.',
      textEs: 'Espacia tus mensajes apropiadamente. Un mensaje en la primera semana, luego otro después de dos semanas, luego máximo mensual. Demasiados mensajes se sienten spam. Muy pocos se sienten olvidados. Calidad sobre cantidad.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Building Your Client Book',
      textEs: 'Construyendo tu Libro de Clientes',
    },
    {
            type: 'paragraph',
      text: 'A client book is your most valuable sales asset. It\'s your personal database of customers who know, like, and trust you. Here\'s how to build and manage it:',
      textEs: 'Un libro de clientes es tu activo de ventas más valioso. Es tu base de datos personal de clientes que te conocen, quieren y confían en ti. Así es como construirlo y manejarlo:',
    },
    {
            type: 'bullets',
      items: [
        'SAVE EVERY NUMBER: Every customer who gives you their WhatsApp goes into your client book. No exceptions. Even the small {currency}30 scrub buyers.',
        'ADD NOTES: After each sale, add a quick note: \'Maria — bought syringe, from Madrid, skiing trip, husband was skeptical but loved the result.\' These notes make future conversations personal.',
        'SEGMENT YOUR LIST: Mark customers by product purchased, location, and buying behavior. Your syringe customers are different from your scrub customers. Your gift buyers are different from your self-buyers.',
        'TRACK INTERACTIONS: Note who responded, who didn\'t, who asked questions, who referred friends. This data tells you who your best relationship customers are.'
      ],
      itemsEs: [
          'GUARDA CADA NÚMERO: Cada cliente que te dé su WhatsApp entra en tu libro de clientes. Sin excepciones. Incluso los compradores pequeños de exfoliante de {currency}30.',
          'AGREGA NOTAS: Después de cada venta, agrega una nota rápida: "María — compró jeringa, de Madrid, viaje de esquí, el esposo era escéptico pero amó el resultado." Estas notas hacen que las conversaciones futuras sean personales.',
          'SEGMENTA TU LISTA: Marca clientes por producto comprado, ubicación y comportamiento de compra. Tus clientes de jeringa son diferentes a tus clientes de exfoliante. Tus compradores de regalos son diferentes a tus compradores personales.',
          'RASTREA INTERACCIONES: Anota quién respondió, quién no, quién hizo preguntas, quién refirió amigos. Estos datos te dicen quiénes son tus mejores clientes de relación.',
        ],
    },
    {
            type: 'script',
      text: 'After each sale, quickly note in your phone: \'Name: Maria. Product: Syringe Option 1. From: Madrid. Trip: Skiing. Notes: Husband loved the result, buying for daughter next time. Follow up: Day 3, Day 7.\' This takes 30 seconds and pays dividends.',
      textEs: 'Después de cada venta, anota rápidamente en tu teléfono: "Nombre: María. Producto: Jeringa Opción 1. De: Madrid. Viaje: Esquí. Notas: Al esposo le encantó el resultado, comprará para su hija la próxima vez. Seguimiento: Día 3, Día 7." Esto toma 30 segundos y da dividendos.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Return Customer Techniques',
      textEs: 'Técnicas para Clientes que Regresan',
    },
    {
            type: 'paragraph',
      text: 'Getting a customer to return is significantly easier than finding a new one. Here\'s how to encourage repeat visits:',
      textEs: 'Hacer que un cliente regrese es significativamente más fácil que encontrar uno nuevo. Así es como fomentar visitas repetidas:',
    },
    {
            type: 'bullets',
      items: [
        'THE EXCLUSIVE RETURN OFFER: \'When you come back, mention my name and I\'ll have a little something special waiting for you.\' Creates anticipation and exclusivity.',
        'THE NEW PRODUCT TEASE: \'We\'re getting a new line next month that I think you\'ll love. I\'ll message you when it arrives.\' Gives them a reason to stay connected.',
        'THE COMPLEMENTARY PRODUCT SUGGESTION: \'You have the syringe for your eyes. Next time, try the peeling for your face — they\'re incredible together.\' Plants the seed for an upsell on their return.',
        'THE PERSONAL CONNECTION: Remember details. \'How was your ski trip?\' \'Did your daughter like the Nail Kit?\' Personal memory creates loyalty stronger than any discount.'
      ],
      itemsEs: [
          'LA OFERTA EXCLUSIVA DE REGRESO: "Cuando regreses, menciona mi nombre y tendré algo especial esperándote." Crea anticipación y exclusividad.',
          'EL TEASER DE NUEVO PRODUCTO: "Vamos a recibir una nueva línea el mes que viene que creo que te encantará. Te escribo cuando llegue." Les da una razón para mantenerse conectados.',
          'LA SUGERENCIA DE PRODUCTO COMPLEMENTARIO: "Ya tienes la jeringa para tus ojos. La próxima vez, prueba el peeling para tu rostro — son increíbles juntos." Planta la semilla para una venta adicional en su regreso.',
          'LA CONEXIÓN PERSONAL: Recuerda detalles. "¿Cómo estuvo tu viaje de esquí?" "¿A tu hija le gustó el Kit de Uñas?" La memoria personal crea lealtad más fuerte que cualquier descuento.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Asking for Referrals',
      textEs: 'Pidiendo Referencias',
    },
    {
            type: 'paragraph',
      text: 'Referrals are the highest-quality leads you can get. A referred customer trusts you before they even meet you. Here\'s how to ask:',
      textEs: 'Las referencias son los prospectos de más alta calidad que puedes obtener. Un cliente referido confía en ti antes incluso de conocerte. Así es como pedirlas:',
    },
    {
            type: 'numbered',
      items: [
        'THE IMMEDIATE ASK: During the two promises at close: \'If you love it, tell your friends about us.\' This plants the seed.',
        'THE RESULTS-BASED ASK: After they text you positively: \'I\'m so glad you love it! If you have any friends who\'d enjoy the same result, send them my way. I\'ll take great care of them too.\'',
        'THE INCENTIVIZED ASK: \'Refer a friend who buys something, and next time you\'re in, I\'ll have a free gift waiting for you.\' Small incentive creates reciprocity.',
        'THE SOCIAL PROOF ASK: \'Most of my new customers come from referrals. If you know anyone heading to {locationName}, I\'d love to meet them!\' Makes asking feel natural, not salesy.'
      ],
      itemsEs: [
          'LA PREGUNTA INMEDIATA: Durante las dos promesas al cerrar: "Si te encanta, cuéntales a tus amigos sobre nosotros." Esto planta la semilla.',
          'LA PREGUNTA BASADA EN RESULTADOS: Después de que te escriban positivamente: "¡Me alegra tanto que te encante! Si tienes amigas que disfrutarían el mismo resultado, mándamelas. Yo también las cuidaré muy bien."',
          'LA PREGUNTA INCENTIVADA: "Refiere a una amiga que compre algo, y la próxima vez que vengas, tendré un regalo gratis esperándote." Un pequeño incentivo crea reciprocidad.',
          'LA PREGUNTA DE PRUEBA SOCIAL: "La mayoría de mis nuevos clientes vienen de referencias. Si conoces a alguien que vaya a {locationName}, ¡me encantaría conocerlos!" Hace que pedir se sienta natural, no como venta.',
        ],
    },
    {
            type: 'tip',
      text: 'The best time to ask for a referral is immediately after a customer expresses happiness. When they text \'I love the syringe!\' — that\'s your moment. Strike while the emotional high is fresh.',
      textEs: 'El mejor momento para pedir una referencia es inmediatamente después de que un cliente expresa felicidad. Cuando escriben "¡Amo la jeringa!" — ese es tu momento. Golpea mientras la emoción está fresca.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'What NOT to Do on WhatsApp',
      textEs: 'Qué NO Hacer en WhatsApp',
    },
    {
            type: 'bullets',
      items: [
        'DON\'T SPAM: One message per week MAX. Unsolicited daily messages get you blocked.',
        'DON\'T BE TOO SALESY: Lead with value, care, and tips. Sales messages should be 1 in 5, not 5 in 5.',
        'DON\'T IGNORE RESPONSES: If they reply, reply back. A conversation is two-way.',
        'DON\'T SHARE THEIR NUMBER: Never give a customer\'s contact to colleagues or managers without permission. Trust is everything.',
        'DON\'T MESSAGE AT ODD HOURS: Respect their time zone. A 11pm message feels invasive.'
      ],
      itemsEs: [
          'NO HAGAS SPAM: Máximo un mensaje por semana. Los mensajes diarios no solicitados te hacen que te bloqueen.',
          'NO SEAS MUY VENDEDOR: Empieza con valor, cuidado y tips. Los mensajes de venta deben ser 1 de 5, no 5 de 5.',
          'NO IGNORES LAS RESPUESTAS: Si responden, responde tú. Una conversación es de dos vías.',
          'NO COMPARTAS SU NÚMERO: Nunca des el contacto de un cliente a colegas o gerentes sin permiso. La confianza es todo.',
          'NO ENVÍES MENSAJES A HORAS RARAS: Respeta su zona horaria. Un mensaje a las 11pm se siente invasivo.',
        ],
    },
    {
            type: 'quote',
      text: 'A customer who leaves with your WhatsApp number doesn\'t just leave with a product. They leave with a relationship. And relationships are the only thing that compounds in sales.',
      textEs: 'Un cliente que se va con tu número de WhatsApp no solo se va con un producto. Se va con una relación. Y las relaciones son lo único que se compone en las ventas.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'Why is the WhatsApp close valuable beyond the initial sale?',
      options: [
        'It\'s required by the company',
        'It transforms a one-time transaction into an ongoing relationship with repeat and referral potential',
        'It gives you more work to do',
        'Customers prefer text over talking'
      ],
      correctIndex: 1,
      explanation: 'The WhatsApp close creates an ongoing channel for reordering, questions, and referrals. A returning customer is worth significantly more than a one-time buyer, and referred customers trust you before they even meet you.',
    },
    {
      question: 'What is the most important principle for WhatsApp follow-up messages?',
      options: [
        'Send as many messages as possible',
        'Lead with value and care; sales messages should be rare',
        'Only message when you have a sale to announce',
        'Copy and paste the same message to everyone'
      ],
      correctIndex: 1,
      explanation: 'WhatsApp follow-up should lead with value, tips, and genuine care. Sales messages should be the minority. Too many sales-focused messages feel spammy and get you blocked.',
    },
    {
      question: 'When is the best time to ask for a referral?',
      options: [
        'Before they buy anything',
        'Immediately after they express happiness with the product',
        'Six months after the sale',
        'Never — referrals happen naturally'
      ],
      correctIndex: 1,
      explanation: 'The best time to ask for a referral is when the customer is emotionally high — right after they text you positively about the product. Strike while their enthusiasm is fresh and genuine.',
    }
    ],
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
      text: 'The word \'aggressive\' scares people. But in luxury sales, aggression doesn\'t mean pushing — it means approaching with certainty. You are not begging. You are offering a carefully selected experience to someone who deserves it. The \'Luxury Aggressor\' is someone who combines the fearlessness of street sales with the polish of a Tiffany & Co. ambassador.',
      textEs: 'La palabra \'agresivo\' asusta a la gente. Pero en ventas de lujo, la agresion no significa presionar — significa acercarse con certeza. No estas rogando. Estas ofreciendo una experiencia cuidadosamente seleccionada a alguien que se la merece. El \'Agresivo de Lujo\' es alguien que combina la audacia de las ventas de calle con el refinamiento de un embajador de Tiffany & Co.',
    },
    {
            type: 'keypoint',
      text: 'The mindset shift: You\'re not interrupting someone\'s day — you\'re enhancing it. The products you sell deliver visible, immediate results. You\'re doing them a favor by stopping them.',
      textEs: 'El cambio de mentalidad: No estas interrumpiendo el dia de alguien — lo estas mejorando. Los productos que vendes ofrecen resultados visibles e inmediatos. Les estas haciendo un favor al detenerlos.',
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
        'SELECTIVITY: You\'re not desperate. You choose who to stop. You assess, you approach, you invite. This posture of selectivity makes customers feel special when you DO approach them.'
      ],
      itemsEs: [
          'CERTEZA: Sabes que el producto funciona. Has visto las reacciones. Esa creencia irradia de ti antes de que abras la boca.',
          'PRESENCIA: Te paras derecho. Haces contacto visual. Tu voz es clara y calida. Ocupas el espacio como si pertenecieras ahi — porque asi es.',
          'SELECTIVIDAD: No estas desesperado. Escoges a quien detener. Evaluas, te acercas, invitas. Esta postura de selectividad hace que los clientes se sientan especiales cuando SI te acercas a ellos.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Identity Reframe Exercise',
      textEs: 'El Ejercicio de Reenfoque de Identidad',
    },
    {
            type: 'paragraph',
      text: 'Before your next shift, stand in front of a mirror and say this out loud:',
      textEs: 'Antes de tu siguiente turno, parate frente al espejo y di esto en voz alta:',
    },
    {
            type: 'script',
      text: '\'I am the gatekeeper to an exclusive experience. I don\'t chase — I invite. My products transform how people look and feel. When I stop someone, I\'m offering them something most tourists walk right past. I am a Luxury Aggressor.\'',
      textEs: '\'Soy el guardian de una experiencia exclusiva. No persigo — invito. Mis productos transforman como se ven y sienten las personas. Cuando detengo a alguien, les estoy ofreciendo algo que la mayoria de turistas deja pasar. Soy un Agresivo de Lujo.\'',
    },
    {
            type: 'tip',
      text: 'Say it even if it feels silly. Your brain doesn\'t know the difference between practiced confidence and real confidence. After a week of this, it becomes who you are.',
      textEs: 'Dilo incluso si te parece tonto. Tu cerebro no sabe la diferencia entre confianza practicada y confianza real. Despues de una semana de hacer esto, se convierte en quien eres.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Practical Techniques',
      textEs: 'Tecnicas Practicas',
    },
    {
            type: 'bullets',
      items: [
        'Dress the part: Your appearance is your first credibility signal. Polish your shoes. Style your hair. Look like you belong in a premium boutique — because you do.',
        'Language matters: Say \'I\'d love to show you something\' not \'Can I show you something?\' The first is an invitation. The second is a question they can reject.',
        'Posture check: Shoulders back, chin up, smile in your eyes. Practice power poses in the stockroom before your shift.',
        'The pause: After you deliver your opener, pause. Let silence work. The Luxury Aggressor doesn\'t rush — they command attention, then let it land.'
      ],
      itemsEs: [
          'Viste la parte: Tu apariencia es tu primera senal de credibilidad. Lustra tus zapatos. Arregla tu cabello. Ve como si pertenecieras a una boutique premium — porque asi es.',
          'El lenguaje importa: Di \'Me encantaria mostrarte algo\' no \'Puedo mostrarte algo?\' La primera es una invitacion. La segunda es una pregunta que pueden rechazar.',
          'Revisa tu postura: Hombros hacia atras, barbilla arriba, sonrisa en tus ojos. Practica poses de poder en el almacen antes de tu turno.',
          'La pausa: Despues de lanzar tu apertura, pausa. Deja que el silencio haga su trabajo. El Agresivo de Lujo no se apresura — comanda la atencion, y luego deja que caiga.',
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
      textEs: 'Incluso el Agresivo de Lujo es ignorado. La diferencia? No se inmutan. Una invitacion rechazada no es un reflejo de ti — es un reflejo de su tiempo, su estado de animo o sus preocupaciones. Manten tu postura. Sonrie a la siguiente persona. Tu energia no decae porque una persona dijo no.',
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
      text: 'Watch videos of luxury retail staff at stores like Chanel, Dior, or high-end jewelers. Notice how they move, how they stand, how they speak. Copy what feels natural. Adapt it to your energy.',
      textEs: 'Mira videos de personal de tiendas de lujo en lugares como Chanel, Dior, o joyerias de alta gama. Observa como se mueven, como se paran, como hablan. Copia lo que se sienta natural. Adaptalo a tu energia.',
    }
    ],
    quiz: [
    {
      question: 'What are the three pillars of the \'Luxury Aggressor\' identity?',
      options: [
        'Confidence, Speed, Volume',
        'Certainty, Presence, Selectivity',
        'Charm, Beauty, Intelligence',
        'Aggression, Persistence, Volume'
      ],
      correctIndex: 1,
      explanation: 'The three pillars are Certainty (belief in the product), Presence (how you carry yourself), and Selectivity (choosing who to approach with confidence, not desperation).',
    },
    {
      question: 'Why does the \'Luxury Aggressor\' use statements instead of questions when approaching?',
      options: [
        'Because questions are rude',
        'Because statements command while questions invite rejection',
        'Because customers prefer orders',
        'Because it\'s faster'
      ],
      correctIndex: 1,
      explanation: 'Questions like \'Can I show you something?\' give the customer an easy escape (\'No thanks\'). Statements like \'I\'ll show you something amazing\' lead the customer rather than asking permission.',
    },
    {
      question: 'What should you do after delivering your opening line?',
      options: [
        'Keep talking to fill silence',
        'Immediately show the product',
        'Pause and let silence work',
        'Ask another question'
      ],
      correctIndex: 2,
      explanation: 'The Luxury Aggressor pauses after the opener. Silence creates anticipation and shows confidence. Rushing signals nervousness.',
    }
    ],
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
      textEs: 'Tu Energia Vende Antes que tus Palabras',
    },
    {
            type: 'paragraph',
      text: 'Customers feel your energy from 5 meters away. Before they hear your voice, before they see your smile, they sense your vibration. Tired, heavy energy repels. Light, excited energy attracts. This isn\'t mystical — it\'s neuroscience. Humans have mirror neurons that cause us to emotionally sync with people around us. Your mood literally becomes their mood.',
      textEs: 'Los clientes sienten tu energia a 5 metros de distancia. Antes de escuchar tu voz, antes de ver tu sonrisa, sienten tu vibracion. La energia cansada y pesada repele. La energia ligera y entusiasmada atrae. No es mistico — es neurociencia. Los seres humanos tenemos neuronas espejo que nos hacen sincronizarnos emocionalmente con las personas a nuestro alrededor. Tu estado de animo literalmente se convierte en el de ellos.',
    },
    {
            type: 'keypoint',
      text: 'Energy is more important than script, product knowledge, or pricing. A salesperson with great energy and average skills will outsell a tired expert every single time.',
      textEs: 'La energia es mas importante que el guion, el conocimiento del producto o los precios. Un vendedor con gran energia y habilidades promedio vendera mas que un experto cansado, cada vez.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Energy Lifecycle of a Shift',
      textEs: 'El Ciclo de Energia de un Turno',
    },
    {
            type: 'paragraph',
      text: 'Most salespeople\'s energy follows a predictable curve: high at opening, dipping after the first hour, crashing mid-day, then a small recovery before closing. Top performers break this curve deliberately. Here\'s how:',
      textEs: 'La energia de la mayoria de los vendedores sigue una curva predecible: alta al inicio, bajando despues de la primera hora, cayendo a mitad del dia, y luego una pequena recuperacion antes de cerrar. Los mejores rompen esta curva deliberadamente. Asi es como:',
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
          'HORA DE APERTURA (alerta maxima): Usala sabiamente. Tus primeras detenciones marcan el tono para todo el dia. Sonrie a CADA persona que pase, incluso si no las detienes. Esto genera momentum.',
          'MEDIA MANANA (primer bajon): Aqui es cuando la rotacion de 4 minutos te salva. Usa tu tiempo adentro para recargarte — no mirando el móvil, sino tomando 5 respiraciones profundas, bebiendo agua y celebrando cualquier pequena victoria hasta ahora.',
          'PERIODO DE COMIDA: Come ligero. Una comida pesada matara tu tarde. Ensaladas, proteina, fruta. Evita la trampa de la pasta y el pan.',
          'BAJON DE LA TARDE (la zona de peligro 2-4pm): Aqui es donde las ventas se ganan o se pierden. Parate mas derecho. Muevete mas rapido. Habla mas fuerte. Eleva conscientemente cada accion fisica — tu cerebro sigue a tu cuerpo.',
          'HORA DE PODER (ultimos 90 minutos): Termina fuerte. El empuje final del dia a menudo tiene a los mejores clientes — ya terminaron de comprar y estan listos para ser vendidos. Pon todo lo que te queda.',
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
      textEs: 'La rotacion de puerta de 4 minutos no es solo justa — es una genialidad de manejo de energia. Saber que solo tienes 4 minutos afuera antes de cambiar mantiene tu intensidad alta. Es como entrenamiento por intervalos para ventas. Corres, recuperas, corres de nuevo. Esto previene el agotamiento que mata a la mayoria de los vendedores de calle a la hora 3.',
    },
    {
            type: 'tip',
      text: 'During your 4 minutes outside, give 100% energy to every person you stop. During your inside time, consciously lower your shoulders, unclench your jaw, and breathe. This oscillation keeps you fresh all day.',
      textEs: 'Durante tus 4 minutos afuera, da el 100% de tu energia a cada persona que detengas. Durante tu tiempo adentro, baja conscientemente tus hombros, relaja la mandibula y respira. Esta oscilacion te mantiene fresco todo el dia.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Fake It Till You Make It\' Technique',
      textEs: 'La Tecnica \'Finge Hasta Que Lo Logres\'',
    },
    {
            type: 'paragraph',
      text: 'Some days you just don\'t have it. You didn\'t sleep well. You\'re fighting with your partner. You\'re hungover. Here\'s the truth: your body can trick your brain. Research shows that acting energetic actually creates energy. Stand tall → feel more confident. Smile → feel happier. Speak loudly → feel more alert.',
      textEs: 'Hay días en los que simplemente no lo tienes. No has dormido bien. Estás discutiendo con tu pareja. Vas con resaca. La verdad es esta: tu cuerpo puede engañar a tu cerebro. Los estudios demuestran que actuar con energía crea energía de verdad. Ponte recto → te sientes más seguro. Sonríe → te sientes más contento. Habla alto → te sientes más despierto.'
    },
    {
            type: 'script',
      text: '\'Even on my worst days, I play a character. I am High-Energy Salesperson. I smile bigger. I move faster. I speak with more enthusiasm. And within 30 minutes, I\'m not playing anymore — I actually feel it.\'',
      textEs: '\'Incluso en mis peores dias, interpreto un personaje. Soy el Vendedor de Alta Energia. Sonrio mas grande. Me muevo mas rapido. Hablo con mas entusiasmo. Y dentro de 30 minutos, ya no estoy actuando — realmente lo siento.\'',
    },
    {
            type: 'bullets',
      items: [
        'POWER POSE: Before your shift, stand with hands on hips and chest open for 2 minutes. It literally changes your cortisol/testosterone balance.',
        'THE SMILE LOOP: Force a wide smile for 10 seconds. Your brain releases dopamine and serotonin. Repeat every hour.',
        'MUSIC TRIGGERS: Create a 3-song playlist that always hypes you up. Listen during breaks.',
        'VOICE PROJECTION: Speak 20% louder than normal. Projecting energy through your voice makes you feel more energetic.'
      ],
      itemsEs: [
          'POSE DE PODER: Antes de tu turno, parate con las manos en las caderas y el pecho abierto por 2 minutos. Literalmente cambia tu balance de cortisol/testosterona.',
          'EL CICLO DE SONRISA: Fuerza una sonrisa amplia por 10 segundos. Tu cerebro libera dopamina y serotonina. Repite cada hora.',
          'DETONANTES MUSICALES: Crea una lista de 3 canciones que siempre te motiven. Escuchalas durante los descansos.',
          'PROYECCION DE VOZ: Habla 20% mas fuerte de lo normal. Proyectar energia a traves de tu voz te hace sentir mas energetico.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Hydration, Nutrition & Physical Maintenance',
      textEs: 'Hidratacion, Nutricion y Mantenimiento Fisico',
    },
    {
            type: 'paragraph',
      text: 'Coffee is not hydration. Energy drinks create crashes. Sugar spikes then drops. The best fuel for a sales shift is:',
      textEs: 'El cafe no es hidratacion. Las bebidas energeticas crean bajones. El azucar sube y luego cae. El mejor combustible para un turno de ventas es:',
    },
    {
            type: 'bullets',
      items: [
        'Water: Drink at least 500ml every 2 hours. Dehydration is the #1 cause of afternoon fatigue.',
        'Protein snacks: Nuts, protein bars, boiled eggs. Sustained energy without the crash.',
        'Fresh fruit: Natural sugars for quick energy plus fiber to prevent crashes.',
        'Avoid heavy lunches: They redirect blood from your brain to your stomach. You\'ll feel foggy and slow.'
      ],
      itemsEs: [
          'Agua: Bebe al menos 500ml cada 2 horas. La deshidratacion es la causa #1 de fatiga en la tarde.',
          'Botanas de proteina: Nueces, barras de proteina, huevos hervidos. Energia sostenida sin el bajon.',
          'Fruta fresca: Azucares naturales para energia rapida mas fibra para prevenir bajones.',
          'Evita comidas pesadas: Redirigen sangre de tu cerebro a tu estomago. Te sentiras nublado y lento.',
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
      textEs: 'Tu energia te presenta antes de que siquiera hables. Asegurate de que este diciendo lo correcto.',
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
      textEs: 'Tu cuerpo habla mas fuerte que tus palabras. Antes de que siquiera abras la boca, los clientes han juzgado tu credibilidad por tu postura, movimiento y expresion facial. Aqui estan los ajustes especificos que crean percepcion de confianza instantanea:',
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
          'CONTACTO VISUAL: Manten el contacto visual por 2-3 segundos a la vez. Romper el contacto visual demasiado rapido senala nerviosismo. Mantenerlo demasiado tiempo se siente agresivo. El punto ideal es una conexion breve y confiada.',
          'SONRIE CON TUS OJOS: Una sonrisa genuina arruga las esquinas de tus ojos (sonrisa de Duchenne). Una sonrisa falsa de solo boca desencadena desconfianza en el cliente. Piensa en algo que genuinamente te hace feliz antes de acercarte.',
          'PALMAS ABIERTAS: Manten tus manos visibles con las palmas ligeramente abiertas. Esta es una senal biologica antigua de \'no tengo armas.\' Desencadena confianza subconsciente.',
          'MOVIMIENTOS LENTOS: La gente nerviosa se mueve rapido y a tirones. La gente confiada se mueve deliberadamente. Ralentiza tus gestos un 20%. Pausa entre movimientos.',
          'POSTURA ESTABLE: Evita cambiar tu peso de pie a pie. Planta tus pies al ancho de los hombros. Esta postura \'enraizada\' senala estabilidad y certeza.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The \'Act As If\' Technique',
      textEs: 'La Tecnica \'Actua Como Si\'',
    },
    {
            type: 'paragraph',
      text: 'Pick the most confident salesperson you know — at your shop, in a luxury store, or even a character from a movie. Study them. How do they stand? How do they speak? What would THEY do in your situation? Then act as if you are them.',
      textEs: 'Elige al vendedor mas confiado que conozcas — en tu tienda, en una tienda de lujo, o incluso un personaje de pelicula. Estudialo. Como se paran? Como hablan? Que harian ELLOS en tu situacion? Entonces actua como si fueras ellos.',
    },
    {
            type: 'script',
      text: '\'When I first started, I wasn\'t confident at all. So I picked a character — I imagined I was a famous actress playing the role of a badass saleswoman. I copied her posture, her voice, her walk. After two weeks, I wasn\'t acting anymore. I had become her.\'',
      textEs: '\'Cuando empece, no era nada confiada. Asi que elegi un personaje — imagine que era una actriz famosa interpretando el papel de una vendedora increible. Copie su postura, su voz, su caminar. Despues de dos semanas, ya no estaba actuando. Me habia convertido en ella.\'',
    },
    {
            type: 'tip',
      text: 'This is not about being fake. It\'s about rapid behavioral learning. By mimicking confident behaviors, you build the neural pathways that make confidence natural. Within 30 days of consistent practice, the \'act\' becomes authentic.',
      textEs: 'Esto no se trata de ser falso. Se trata de aprendizaje conductual rapido. Al imitar comportamientos confiados, construyes las vias neuronales que hacen que la confianza sea natural. Dentro de 30 dias de practica constante, el \'acto\' se vuelve autentico.',
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
      text: 'The deepest source of confidence is knowing you\'re ready. A prepared salesperson walks differently. They know they can handle any question, any objection, any situation. Here\'s your preparation checklist:',
      textEs: 'La fuente mas profunda de confianza es saber que estas listo. Un vendedor preparado camina diferente. Saben que pueden manejar cualquier pregunta, cualquier objecion, cualquier situacion. Aqui esta tu lista de verificacion de preparacion:',
    },
    {
            type: 'checklist',
      items: [
        'I can pitch all 4 products from memory without hesitation',
        'I know every price point and offer combination by heart',
        'I have 3 different openers for each product ready to go',
        'I\'ve practiced the demo on myself or a teammate until it\'s smooth',
        'I know 5 common objections and my responses to each',
        'I\'ve rehearsed my voucher close until it feels natural',
        'I know my daily target and my personal best — and I\'m committed to beating it'
      ],
      itemsEs: [
          'Puedo presentar los 4 productos de memoria sin dudar',
          'Se cada punto de precio y combinacion de oferta de memoria',
          'Tengo 3 aperturas diferentes para cada producto listas para usar',
          'He practicado la demo en mi mismo o un companero hasta que salga fluida',
          'Se 5 objeciones comunes y mis respuestas para cada una',
          'He ensayado mi cierre con cupon hasta que se sienta natural',
          'Se mi meta diaria y mi mejor marca personal — y estoy comprometido a superarla',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Vocal Confidence Techniques',
      textEs: 'Tecnicas de Confianza Vocal',
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
          'VOLUMEN: Habla 15-20% mas fuerte que tu voz normal de conversacion. Las voces bajas senalan incertidumbre. Las voces proyectadas comandan atencion.',
          'RITMO: La gente nerviosa habla rapido. Ralentiza tu habla un 20%. Las pausas se sienten mas largas para ti que para el oyente. Una pausa de 2 segundos suena pensativa, no incomoda.',
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
          'ALAJATE: Pide un rapido descanso de 2 minutos al bano. Echate agua fria en la cara. El reinicio fisico desencadena un reinicio mental.',
          'RECUERDA UNA VICTORIA: Piensa en tu mejor venta de todos los tiempos. Siente ese momento de nuevo. Recuerda que SI eres capaz.',
          'AJUSTA UNA COSA: No intentes arreglarlo todo. Elige UN comportamiento — quizas tu postura, quizas tu sonrisa — y enfocate solo en eso para los siguientes 3 clientes.',
          'REDUCE LAS APUESTAS: Dite a ti mismo \'solo estoy practicando.\' Esto elimina la presion y te deja ser jugueton de nuevo.',
        ],
    },
    {
            type: 'tip',
      text: 'Create a \'confidence anchor\' — a physical gesture paired with a powerful memory. For example, touching your thumb and forefinger together while remembering your best sale. After practicing this 20 times, the gesture alone triggers confidence.',
      textEs: 'Crea un \'ancla de confianza\' — un gesto fisico emparejado con un recuerdo poderoso. Por ejemplo, juntar tu pulgar e indice mientras recuerdas tu mejor venta. Despues de practicar esto 20 veces, el gesto solo desencadena confianza.',
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
    subtitle: 'Why \'no\' is training. The numbers game. How top sellers process rejection.',
    subtitleEs: 'Por qué un \'no\' es entrenamiento. El juego de los números. Cómo encajan el rechazo los mejores.',
    duration: '8 min',
    icon: 'Shield',
    order: 4,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Every \'No\' Is a Step Closer to \'Yes\'',
      textEs: 'Cada \'No\' es un Paso Mas Cerca del \'Si\'',
    },
    {
            type: 'paragraph',
      text: 'If you stop 100 people in a day, and 80 ignore you, 15 say \'no thanks,\' and 5 buy — you\'ve had a GREAT day. But most people don\'t see the 95 rejections as the path to 5 wins. They see 95 failures. That perspective destroys performance. The rejection-proof mindset sees every interaction as data, not drama.',
      textEs: 'Si detienes a 100 personas en un dia, y 80 te ignoran, 15 dicen \'no gracias,\' y 5 compran — has tenido un GRAN dia. Pero la mayoria de la gente no ve los 95 rechazos como el camino a 5 victorias. Ven 95 fracasos. Esa perspectiva destruye el desempeno. La mentalidad a prueba de rechazo ve cada interaccion como datos, no como drama.',
    },
    {
            type: 'keypoint',
      text: 'Top performers know their numbers. If your close rate is 5%, then every \'no\' is 5% of a \'yes.\' A string of 10 rejections isn\'t failure — it\'s statistical progress toward your next sale.',
      textEs: 'Los mejores desempenos conocen sus numeros. Si tu tasa de cierre es del 5%, entonces cada \'no\' es el 5% de un \'si.\' Una serie de 10 rechazos no es fracaso — es progreso estadistico hacia tu siguiente venta.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reframe: The Baseball Batting Average',
      textEs: 'Reencuadre: El Promedio de Bateo del Beisbol',
    },
    {
            type: 'paragraph',
      text: 'The best baseball hitters in history fail 70% of the time. A .300 batting average — failing 7 out of 10 times — is considered excellent. In sales, a 5-10% close rate makes you a top earner. You\'re not failing 90-95% of the time. You\'re succeeding at a rate that most people would consider elite performance.',
      textEs: 'Los mejores bateadores de beisbol en la historia fallan el 70% del tiempo. Un promedio de bateo de .300 — fallar 7 de cada 10 veces — se considera excelente. En ventas, una tasa de cierre del 5-10% te convierte en un top de ganancias. No estas fallando el 90-95% del tiempo. Estas teniendo exito a una tasa que la mayoria de la gente consideraria desempeno de elite.',
    },
    {
            type: 'comparison',
      left: { label: 'Amateur Mindset', text: '\'I\'m terrible. 20 people said no today. I suck at this. Maybe I\'m not cut out for sales.\' Each rejection feels personal and builds a story of failure.' },
      leftEs: { label: 'Mentalidad de Aficionado', text: '\'Soy terrible. 20 personas dijeron que no hoy. Soy malisimo en esto. Quizas no sirvo para ventas.\' Cada rechazo se siente personal y construye una historia de fracaso.' },
      right: { label: 'Pro Mindset', text: '\'20 rejections today means I\'m 20% closer to my next close. My ratio holds at 1 in 15. Two more stops and I\'ll likely hit a sale.\' Each rejection is data confirming the ratio.' },
      rightEs: { label: 'Mentalidad Profesional', text: '\'20 rechazos hoy significan que estoy un 20% más cerca de mi próximo cierre. Mi ratio se mantiene en 1 de cada 15. Dos paradas más y probablemente cierro una venta.\' Cada rechazo es un dato que confirma el ratio.' }
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
      text: 'The most powerful mental habit in sales is instantaneous reset. The moment a customer walks away, that interaction is erased. It doesn\'t exist anymore. Your total focus shifts to the next person approaching. This is how top sellers maintain energy through 8 hours of rejection.',
      textEs: 'El habito mental mas poderoso en ventas es el reinicio instantaneo. En el momento en que un cliente se aleja, esa interaccion se borra. Ya no existe. Tu enfoque total se traslada a la siguiente persona que se acerque. Asi es como los mejores vendedores mantienen energia a traves de 8 horas de rechazo.',
    },
    {
            type: 'script',
      text: '\'I used to replay every rejection in my head. I\'d still be thinking about the rude woman from 20 minutes ago while missing the friendly couple right in front of me. Now I have a rule: the moment someone walks away, I literally say \'next\' under my breath. It clears my mental slate.\'',
      textEs: '\'Solia reproducir cada rechazo en mi cabeza. Seguia pensando en la mujer grosera de hace 20 minutos mientras perdia a la pareja amigable justo enfrente de mi. Ahora tengo una regla: en el momento en que alguien se aleja, literalmente digo \'siguiente\' en voz baja. Limpia mi pizarra mental.\'',
    },
    {
            type: 'tip',
      text: 'Practice the \'next\' technique literally. After every rejection — verbal or just being ignored — say the word \'next\' quietly to yourself. This creates a mental reset ritual that becomes automatic.',
      textEs: 'Practica la tecnica del \'siguiente\' literalmente. Despues de cada rechazo — verbal o simplemente ser ignorado — di la palabra \'siguiente\' en voz baja para ti mismo. Esto crea un ritual de reinicio mental que se vuelve automatico.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Why Customers Say No (Hint: It\'s Almost Never About You)',
      textEs: 'Por que los Clientes Dicen No (Pista: Casi Nunca se Trata de Ti)',
    },
    {
            type: 'bullets',
      items: [
        'They\'re in a hurry: Meeting, reservation, tired from shopping. Nothing you could have done.',
        'They just spent money: Budget exhaustion is real. The best pitch in the world won\'t open an empty wallet.',
        'They\'re not in a buying mood today: Some days people browse. Same person might buy enthusiastically tomorrow.',
        'They had a bad experience with a previous salesperson: You\'re paying for someone else\'s mistake.',
        'They don\'t buy anything on vacation: Some people have a \'no purchases while traveling\' rule.',
        'They\'re overwhelmed: Too many options, too much information. They shut down.',
        'Personal problems: Fights, health issues, stress. They\'re not really there.'
      ],
      itemsEs: [
          'Van con prisa: Reunion, reserva, cansados de comprar. No habia nada que pudieras haber hecho.',
          'Acaban de gastar dinero: El agotamiento del presupuesto es real. El mejor pitch del mundo no abrira una cartera vacia.',
          'No estan en mood de comprar hoy: Algunos dias la gente solo mira. La misma persona podria comprar con entusiasmo manana.',
          'Tuvieron una mala experiencia con un vendedor anterior: Estas pagando por el error de alguien mas.',
          'No compran nada de vacaciones: Algunas personas tienen una regla de \'no compras de viaje\'.',
          'Estan abrumados: Demasiadas opciones, demasiada informacion. Se bloquean.',
          'Problemas personales: Peleas, problemas de salud, estres. Realmente no estan ahi.',
        ],
    },
    {
            type: 'keypoint',
      text: 'When you internalize that rejection is almost never personal, you stop carrying it. The customer isn\'t rejecting YOU. They\'re rejecting the interaction, the timing, or their own readiness.',
      textEs: 'Cuando interiorizas que el rechazo casi nunca es personal, dejas de cargar con el. El cliente no te esta rechazando a TI. Estan rechazando la interaccion, el momento, o su propia disposicion.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'How Top Sellers Process a Bad Day',
      textEs: 'Como los Mejores Vendedores Procesan un Mal Dia',
    },
    {
            type: 'paragraph',
      text: 'Even the best have terrible days. Here\'s the protocol that separates pros from amateurs:',
      textEs: 'Incluso los mejores tienen dias terribles. Aqui esta el protocolo que separa a los profesionales de los aficionados:',
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
          'NO TE LO LLEVES A CASA: En el momento en que fichas tu salida, el dia se acabo. No repitas los rechazos en tu cabeza toda la noche. Ese dia ya no existe.',
          'ENCUENTRA UNA VICTORIA: Incluso en el peor dia, encuentra UNA cosa que hiciste bien. Quizas tu apertura fue fluida. Quizas tu demo estuvo genial aunque no compraron. Enfocate en eso.',
          'ANALIZA PATRONES: Si te estan rechazando mas de lo usual, busca patrones. Esta baja tu energia? Estas deteniendo a las personas equivocadas? Tu apertura esta cansada? Arregla la mecanica, no tu autoestima.',
          'DUERMETELO: Un mal dia se siente como una crisis a las 6pm y a menudo no significa nada a la manana siguiente. Nunca tomes decisiones de carrera basadas en un mal turno.',
          'HABLA CON TUS COMPANEROS: Todos tienen malos dias. Compartir los tuyos lo normaliza. Escuchar que tu companero tambien fue rechazado 30 veces te hace sentir menos solo.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Turning a Bad Day Around',
      textEs: 'Cambiar un Mal Dia',
    },
    {
            type: 'paragraph',
      text: 'Sometimes you can actually SAVE a bad day. Here\'s the emergency turnaround protocol:',
      textEs: 'A veces puedes realmente SALVAR un mal dia. Aqui esta el protocolo de emergencia para darle la vuelta:',
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
          'CAMBIA UNA COSA: Si has estado usando la misma apertura todo el dia y te rechazan, cambiala completamente. La energia nueva rompe el patron.',
          'APUNTA A DIFERENTES PERSONAS: Si has estado deteniendo a mujeres solas y fallando, prueba con parejas. O viceversa. Diferentes demografias responden a diferentes energias.',
          'VUELVE A LO BASICO: Cuando todo se desmorona, simplifica. Deja de pensar demasiado. Sonrie, haz contacto visual, lanza tu apertura mas limpia. Los fundamentos arreglan los bajones.',
          'PIDE A UN COMPANERO QUE TE OBSERVE: A veces tienes un punto ciego. Un colega podria notar que te estas apresurando, o que tu postura se ha derrumbado, o que no estas haciendo contacto visual. La retroalimentacion externa es oro.',
        ],
    },
    {
            type: 'quote',
      text: 'The only difference between a top seller and a quitter is that the top seller kept going through the days they wanted to quit.',
      textEs: 'La unica diferencia entre un top vendedor y alguien que se rinde es que el top vendedor siguio adelante en los dias que quiso rendirse.',
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
      text: 'The Science of Emotional Contagion',
      textEs: 'La Ciencia del Contagio Emocional',
    },
    {
            type: 'paragraph',
      text: 'Research by psychologists Elaine Hatfield and others shows that emotional contagion occurs in three stages: mimicry (unconsciously copying facial expressions), feedback (your brain reads your own facial expression and generates matching emotions), and synchronization (both people end up in the same emotional state).',
      textEs: 'Las investigaciones de las psicólogas Elaine Hatfield y otros muestran que el contagio emocional ocurre en tres etapas: la imitación (copiar inconscientemente las expresiones faciales), la retroalimentación (tu cerebro lee tu propia expresión facial y genera emociones coincidentes) y la sincronización (ambas personas terminan en el mismo estado emocional).',
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
      left: { label: 'High Energy / Excitement', text: 'Best for: Groups, holiday shoppers, first sales of the day, younger customers, high-traffic periods. Creates urgency and fun. Risks: Can overwhelm introverts or analytical buyers. Can feel pushy if overdone.' },
      leftEs: { label: 'Alta Energía / Entusiasmo', text: 'Ideal para: Grupos, compradores de temporada, primeras ventas del día, clientes jóvenes, períodos de alto tráfico. Crea urgencia y diversión. Riesgos: Puede abrumar a compradores introvertidos o analíticos. Puede sentirse agresivo si se exagera.' },
      right: { label: 'Calm / Warm Energy', text: 'Best for: Couples, older customers, serious buyers, afternoon lulls, luxury positioning. Creates trust and sophistication. Risks: Can feel low-energy if you\'re not genuinely present. Requires excellent listening skills.' },
      rightEs: { label: 'Energía Tranquila / Cercana', text: 'Mejor para: parejas, clientes mayores, compradores serios, las horas muertas de la tarde, posicionamiento de lujo. Genera confianza y sofisticación. Riesgos: puede parecer falta de energía si no estás de verdad presente. Requiere una escucha excelente.' }
    },
    {
            type: 'tip',
      text: 'Match the customer\'s energy, then slightly elevate it. If they\'re calm and thoughtful, be calm and warm — but with a spark of enthusiasm. If they\'re energetic and laughing, match that energy and add 10%. This creates comfortable rapport that pulls them toward buying.',
      textEs: 'Iguala la energía del cliente, luego elévala ligeramente. Si son calmados y reflexivos, sé calmado y cálido — pero con una chispa de entusiasmo. Si son enérgicos y risueños, iguala esa energía y súmale un 10%. Esto crea una conexión cómoda que los atrae hacia la compra.',
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
      question: 'How does emotional contagion work according to psychological research?',
      options: [
        'Customers consciously analyze your body language',
        'Through mimicry, feedback, and synchronization between people',
        'Only through verbal communication',
        'It doesn\'t exist — it\'s just a theory'
      ],
      correctIndex: 1,
      explanation: 'Research shows emotional contagion works in three stages: mimicry (copying expressions), feedback (brain generates matching emotions from your own expressions), and synchronization (both people end up in the same emotional state).',
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
      text: 'You can\'t pour from an empty cup. A salesperson running on 4 hours of sleep, fast food, and no exercise is a salesperson running at 40% capacity. The job demands energy, clarity, emotional stability, and presence — all of which are built OUTSIDE the shop. Investing in your physical and mental wellbeing isn\'t indulgent. It\'s professional development.',
      textEs: 'No puedes dar de lo que no tienes. Un vendedor que funciona con 4 horas de sueño, comida rápida y sin ejercicio es un vendedor que rinde al 40% de su capacidad. El trabajo exige energía, claridad, estabilidad emocional y presencia — todo lo cual se construye FUERA de la tienda. Invertir en tu bienestar físico y mental no es un lujo. Es desarrollo profesional.',
    },
    {
            type: 'keypoint',
      text: 'Your commission is directly tied to your energy. If you earn 25-30% commission, every 10% improvement in your daily performance (from better sleep, nutrition, or exercise) translates to real money — potentially hundreds of euros per month.',
      textEs: 'Tu comisión está directamente ligada a tu energía. Si ganas del 25-30% de comisión, cada 10% de mejora en tu rendimiento diario (por mejor sueño, nutrición o ejercicio) se traduce en dinero real — potencialmente cientos de euros al mes.',
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
        'Your emotional resilience drops by 60%. Rejections hurt more.',
        'Your facial expressions become flatter and less genuine. Customers notice.',
        'Your verbal fluency decreases. Words don\'t come as easily.',
        'Your motivation and drive plummet. You stop more hesitantly.'
      ],
      itemsEs: [
          'Tu resiliencia emocional cae un 60%. Los rechazos duelen más.',
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
      text: 'Building a Growth Mindset: Books, Podcasts & Learning',
      textEs: 'Construyendo una Mentalidad de Crecimiento: Libros, Podcasts y Aprendizaje',
    },
    {
            type: 'paragraph',
      text: 'The best salespeople are perpetual learners. They read, listen, and constantly expand their understanding of human psychology, communication, and business. Here are recommended resources:',
      textEs: 'Los mejores vendedores son aprendices perpetuos. Leen, escuchan y expanden constantemente su comprensión de la psicología humana, la comunicación y los negocios. Aquí hay recursos recomendados:',
    },
    {
            type: 'bullets',
      items: [
        'BOOKS: \'Influence\' by Robert Cialdini (the science of persuasion), \'How to Win Friends and Influence People\' by Dale Carnegie (classic rapport building), \'Mindset\' by Carol Dweck (growth vs. fixed mindset), \'The Psychology of Selling\' by Brian Tracy (sales-specific strategies), \'Atomic Habits\' by James Clear (building better routines)',
        'PODCASTS: Sales-focused podcasts for daily motivation and new techniques. Listen during your commute or while getting ready for work.',
        'VIDEO CONTENT: Watch TED talks on body language, persuasion, and confidence. Amy Cuddy\'s talk on power posing is particularly relevant.',
        'LEARN FROM OTHER INDUSTRIES: Great ideas come from cross-pollination. Watch how luxury hotels greet guests. Study how Apple Store employees approach customers. Notice what great restaurant servers do to create experiences.'
      ],
      itemsEs: [
          'LIBROS: \'Influencia\' de Robert Cialdini (la ciencia de la persuasión), \'Cómo Ganar Amigos e Influir sobre las Personas\' de Dale Carnegie (construcción clásica de rapport), \'Mindset\' de Carol Dweck (mentalidad de crecimiento vs. fija), \'La Psicología de la Venta\' de Brian Tracy (estrategias específicas de ventas), \'Hábitos Atómicos\' de James Clear (construcción de mejores rutinas)',
          'PODCASTS: Podcasts enfocados en ventas para motivación diaria y nuevas técnicas. Escúchalos durante tu traslado o mientras te preparas para el trabajo.',
          'CONTENIDO EN VIDEO: Ve pláticas TED sobre lenguaje corporal, persuasión y confianza. La plática de Amy Cuddy sobre posturas de poder es particularmente relevante.',
          'APRENDE DE OTRAS INDUSTRIAS: Las grandes ideas vienen de la polinización cruzada. Observa cómo los hoteles de lujo reciben a sus huéspedes. Estudia cómo los empleados de Apple Store se acercan a los clientes. Fíjate qué hacen los grandes meseros para crear experiencias.',
        ],
    },
    {
            type: 'tip',
      text: 'Set a learning goal: one book per month, or one podcast episode per day during your commute. In 6 months, you\'ll have absorbed more sales knowledge than most people acquire in years. Small daily learning compounds into massive advantage.',
      textEs: 'Establece una meta de aprendizaje: un libro al mes, o un episodio de podcast al día durante tu traslado. En 6 meses, habrás absorbido más conocimiento de ventas que la mayoría de las personas adquiere en años. El aprendizaje diario pequeño se acumula en una ventaja masiva.',
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
      text: 'These principles aren\'t tricks or manipulation. They are fundamental aspects of human social psychology. Using them ethically means creating genuine win-win situations where customers get real value and you earn your commission.',
      textEs: 'Estos principios no son trucos ni manipulación. Son aspectos fundamentales de la psicología social humana. Usarlos de forma ética significa crear situaciones de ganar-ganar genuinas donde los clientes obtienen valor real y tú ganas tu comisión.',
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
      text: 'People defer to experts and credible sources. When a doctor recommends a treatment, we listen. When you position yourself as a skincare expert, customers listen. Authority is built through:',
      textEs: 'Las personas ceden ante expertos y fuentes creíbles. Cuando un doctor recomienda un tratamiento, escuchamos. Cuando te posicionas como un experto en cuidado de la piel, los clientes escuchan. La autoridad se construye a través de:',
    },
    {
            type: 'bullets',
      items: [
        'KNOWLEDGE: Knowing the ingredients, the science, the dermatologist recommendations. \'This contains Dead Sea minerals — the lowest place on Earth with the highest mineral concentration.\'',
        'CONFIDENT DELIVERY: Experts don\'t hesitate. They don\'t say \'um\' and \'I think.\' They state facts clearly: \'This is our #1 seller across Europe.\'',
        'VISUAL CREDIBILITY: Looking professional, well-groomed, and polished. Your appearance IS your authority signal.',
        'SOCIAL PROOF: \'I\'ve done this demo over 20 times today, and the reaction is always the same.\' Your experience IS authority.'
      ],
      itemsEs: [
          'CONOCIMIENTO: Saber los ingredientes, la ciencia, las recomendaciones de dermatólogos. \'Esto contiene minerales del Mar Muerto — el lugar más bajo de la Tierra con la mayor concentración de minerales.\'',
          'ENTREGA CON CONFIANZA: Los expertos no dudan. No dicen \'emmm\' ni \'yo creo\'. Enuncian hechos con claridad: \'Este es nuestro producto #1 en toda Europa.\'',
          'CREDIBILIDAD VISUAL: Verse profesional, bien arreglado y pulido. Tu apariencia ES tu señal de autoridad.',
          'PRUEBA SOCIAL: \'He hecho esta demostración más de 20 veces hoy, y la reacción siempre es la misma.\' Tu experiencia ES autoridad.',
        ],
    },
    {
            type: 'script',
      text: '\'Dermatologists actually recommend this for eczema and psoriasis. It\'s not just beauty — it\'s science-backed skin health.\' This positions the product as medically endorsed, not just cosmetically appealing.',
      textEs: '\'Los dermatólogos realmente recomiendan esto para el eczema y la psoriasis. No es solo belleza — es salud de la piel respaldada por la ciencia.\' Esto posiciona el producto como respaldado médicamente, no solo como cosméticamente atractivo.',
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
      textEs: '\'Le hice esta demostración a una mujer hace rato que dijo que lo \'pensaría\'. Regresó una hora después y compró dos. Una vez que sientes la diferencia, se queda contigo.\' Esta historia crea prueba social Y planta la semilla de que ellos también podrían regresar.',
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
        'THE CUSTOMER LOG: Keep a small notebook. For each customer: nationality (if known), approximate age, what they were wearing, who they were with, what product you demoed, what objection they gave, did they buy. Over weeks, patterns emerge.',
        'STUDY YOUR WINS: What did your buyers have in common? Were they couples? Did they carry luxury bags? Were they in a certain age range? Your best customers have patterns.',
        'STUDY YOUR LOSSES EQUALLY: What did non-buyers have in common? Were they in a rush? Were they on their phones? Did they have kids? Understanding who WON\'T buy is as valuable as understanding who will.'
      ],
      itemsEs: [
          'LA REVISIÓN POST-ACCIÓN: Después de cada interacción — sí O no — hazte tres preguntas: ¿Qué noté de esta persona? ¿Qué hice? ¿Cuál fue el resultado? Escríbelo. Esto obliga a tu cerebro a procesar patrones.',
          'EL REGISTRO DE CLIENTES: Lleva una libreta pequeña. Para cada cliente: nacionalidad (si se sabe), edad aproximada, qué traía puesto, con quién estaba, qué producto demostraste, qué objeción presentaron, compraron. Con el tiempo, emergen patrones.',
          'ESTUDIA TUS VICTORIAS: ¿Qué tenían en común tus compradores? ¿Eran parejas? ¿Traían bolsas de lujo? ¿Eran de cierto rango de edad? Tus mejores clientes tienen patrones.',
          'ESTUDIA TUS DERROTAS POR IGUAL: ¿Qué tenían en común los que no compraron? ¿Estaban apurados? ¿Estaban en su teléfono? ¿Traían niños? Entender quién NO comprará es tan valioso como entender quién sí.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Reading Micro-Signals: The Language of the Body',
      textEs: 'Leyendo Micro-Señales: El Lenguaje del Cuerpo',
    },
    {
            type: 'paragraph',
      text: 'Micro-signals are tiny, often unconscious cues that reveal what someone is really thinking. They happen in milliseconds. A master salesperson reads these automatically:',
      textEs: 'Las micro-señales son pistas diminutas, a menudo inconscientes, que revelan lo que alguien realmente está pensando. Ocurren en milisegundos. Un vendedor maestro las lee automáticamente:',
    },
    {
            type: 'bullets',
      items: [
        'EYE DIRECTION: Looking up and to the left often indicates visual imagination (they\'re picturing the result). Looking down indicates internal dialogue (they\'re thinking through the logic). Rapid eye movement between you and the product indicates interest.',
        'MICRO-EXPRESSIONS: A brief flash of surprise when you mention the price (they expected higher). A quick eyebrow raise when you show the demo result (they\'re impressed but trying to hide it). These flashes reveal true feelings beneath the polite mask.',
        'POSTURE SHIFTS: Leaning in = interest. Crossing arms after the price = resistance. Relaxing shoulders after the offer = acceptance. The body reveals the decision before the mouth does.',
        'TOUCHING THE FACE: Touching the cheek or chin while looking at the product = they\'re imagining themselves using it. A very positive signal.',
        'BREATHING CHANGES: A held breath when you show the price, then a release = relief (they can afford it). Shallow breathing = anxiety about the price.',
        'VOICE TONE CHANGES: Higher pitch when asking questions = excitement. Lower, slower speech = thoughtful consideration (often a buying signal). Flat tone = disengagement.'
      ],
      itemsEs: [
          'DIRECCIÓN DE LA MIRADA: Mirar hacia arriba y a la izquierda a menudo indica imaginación visual (se están imaginando el resultado). Mirar hacia abajo indica diálogo interno (están pensando la lógica). El movimiento rápido de ojos entre tú y el producto indica interés.',
          'MICRO-EXPRESIONES: Un breve destello de sorpresa cuando mencionas el precio (esperaban algo más alto). Un rápido levantamiento de ceja cuando muestras el resultado de la demostración (están impresionados pero intentando ocultarlo). Estos destellos revelan los sentimientos verdaderos bajo la máscara de cortesía.',
          'CAMBIOS DE POSTURA: Inclinarse hacia adelante = interés. Cruzar brazos después del precio = resistencia. Relajar hombros después de la oferta = aceptación. El cuerpo revela la decisión antes de que la boca lo haga.',
          'TOCARSE LA CARA: Tocarse la mejilla o barbilla mientras miran el producto = se están imaginando usándolo. Una señal muy positiva.',
          'CAMBIOS EN LA RESPIRACIÓN: Contener la respiración cuando muestras el precio, luego soltarla = alivio (lo pueden pagar). Respiración superficial = ansiedad sobre el precio.',
          'CAMBIOS EN EL TONO DE VOZ: Tono más alto al hacer preguntas = emoción. Habla más baja y lenta = consideración reflexiva (a menudo una señal de compra). Tono plano = desconexión.',
        ],
    },
    {
            type: 'tip',
      text: 'Don\'t try to read all micro-signals at once. Pick ONE signal per week to focus on. For example, week 1: notice when customers lean in vs. lean back. Week 2: watch for face-touching. Within 2 months, you\'ll be reading the full picture automatically.',
      textEs: 'No intentes leer todas las micro-señales a la vez. Elige UNA señal por semana para enfocarte. Por ejemplo, semana 1: nota cuándo los clientes se inclinan hacia adelante vs. hacia atrás. Semana 2: observa cuándo se tocan la cara. En 2 meses, estarás leyendo el panorama completo automáticamente.',
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
        'RED LIGHTS (BACK OFF): Crossed arms after price, stepping back, checking phone repeatedly, flat responses, looking around for exit, partner shaking head subtly. These customers are not buying today. Plant a seed and let them go gracefully.'
      ],
      itemsEs: [
          'LUCES VERDES (PRESIONA): Inclinarse hacia adelante, tocar el producto, hacer preguntas espontáneas sobre uso o precio, involucrar positivamente a su pareja, sonreír con arrugas genuinas alrededor de los ojos, tocarse la cara mientras miran el producto. Estos clientes están calientes — cierra con confianza.',
          'LUCES AMARILLAS (SUAVE): Preguntas vacilantes, mirar a la pareja para aprobación, decir \'está bonito pero...\', tocar el producto pero no comprometerse. Estos clientes necesitan tranquilidad, no presión. Usa la conexión emocional y la lógica juntas.',
          'LUCES ROJAS (RETROCEDE): Brazos cruzados después del precio, dar un paso atrás, revisar el teléfono repetidamente, respuestas planas, buscando la salida, pareja moviendo la cabeza sutilmente. Estos clientes no comprarán hoy. Planta una semilla y déjalos ir con elegancia.',
        ],
    },
    {
            type: 'script',
      text: '\'I can see you\'re thinking about it — that\'s smart. Here\'s my WhatsApp. If you have any questions later, or if you want to come back and try something else, just message me. No pressure at all.\' This plants a seed, builds a bridge, and respects their signals.',
      textEs: '\'Veo que lo estás pensando — eso es inteligente. Aquí está mi WhatsApp. Si tienes preguntas más tarde, o si quieres regresar y probar algo más, solo escríbeme. Ninguna presión.\' Esto planta una semilla, construye un puente y respeta sus señales.',
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
        'THE IGNORE: \'They were walking fast, looking at their phone, carrying coffee. I probably should have let them pass.\' → Lesson: Match stopping effort to customer receptivity.',
        'THE \'NO THANKS\': \'They smiled but kept walking. Good energy but bad timing.\' → Lesson: My approach was warm but they\'re in a rush. Speed up the opener next time.',
        'THE DEMO, NO BUY: \'They loved the nail kit demo but said it was too expensive even at {currency}30.\' → Lesson: Either a price objection to work through, or genuinely no budget. Note the signals for future reference.',
        'THE CLOSE: \'They bought the syringe after I involved the husband in the demo.\' → Lesson: Partner engagement was the key factor. Replicate that approach with couples.'
      ],
      itemsEs: [
          'EL QUE IGNORA: \'Caminaban rápido, mirando su teléfono, cargando café. Probablemente debería haberlos dejado pasar.\' → Lección: Adapta tu esfuerzo de detención a la receptividad del cliente.',
          'EL \'NO GRACIAS\': \'Sonrieron pero siguieron caminando. Buena energía pero mal timing.\' → Lección: Mi acercamiento fue cálido pero están apurados. Acelera el acercamiento la próxima vez.',
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
    quiz: [
    {
      question: 'What are the four stages of developing sales intuition?',
      options: [
        'Beginner, Intermediate, Advanced, Expert',
        'Conscious Incompetence, Conscious Competence, Unconscious Competence, Mastery',
        'Learning, Doing, Teaching, Leading',
        'Theory, Practice, Failure, Success'
      ],
      correctIndex: 1,
      explanation: 'The four stages are Conscious Incompetence (new, thinking hard), Conscious Competence (seeing patterns with effort), Unconscious Competence (intuitive knowing), and Mastery (can also teach others).',
    },
    {
      question: 'What does it mean when a customer touches their face while looking at the product?',
      options: [
        'They\'re anxious about the price',
        'They\'re imagining themselves using it — a very positive signal',
        'They want to leave',
        'They\'re checking their makeup'
      ],
      correctIndex: 1,
      explanation: 'Face-touching while looking at a product is a strong positive signal. It indicates the customer is unconsciously imagining themselves using it — a key buying indicator.',
    },
    {
      question: 'Why is it valuable to study your losses (non-buyers) as much as your wins?',
      options: [
        'To feel bad about yourself',
        'To understand patterns of who won\'t buy, saving time and energy',
        'To blame external factors',
        'To avoid those types of customers entirely'
      ],
      correctIndex: 1,
      explanation: 'Understanding patterns in non-buyers is as valuable as understanding buyers. It helps you recognize who to invest energy in, when to pivot, and when to gracefully let someone go.',
    }
    ],
  },
  'stop-1': {
    id: 'stop-1',
    categoryId: 'stopping',
    title: 'The 2-Metre Rule & Timing',
    titleEs: 'La Regla de 2 Metros y el Timing',
    subtitle: 'Where to stand, when to start, and why starting too late means talking to their back',
    subtitleEs: 'Posicionamiento y momento perfecto',
    duration: '8 min',
    icon: 'Target',
    order: 1,
    xpReward: 100,
    sections: [
    {
            type: 'header',
      text: 'Distance and Timing Determine Everything',
      textEs: 'La distancia y el timing lo determinan todo',
    },
    {
            type: 'paragraph',
      text: 'The stop doesn\'t begin when you speak. It begins when the customer first registers your presence. Your position, your eye contact, your body language — all of these are working before your first word. Master the physical setup and your words become ten times more effective.',
      textEs: 'La parada no empieza cuando hablas. Empieza cuando el cliente percibe tu presencia por primera vez. Tu posición, tu contacto visual, tu lenguaje corporal — todo esto está trabajando antes de tu primera palabra. Domina el setup físico y tus palabras se vuelven diez veces más efectivas.',
    },
    {
            type: 'keypoint',
      text: 'The 2-metre rule: Start your approach when the customer is 2 metres away from your zone. Any closer and they feel ambushed. Any farther and they don\'t hear you or process your presence in time.',
      textEs: 'La regla de 2 metros: Empieza tu acercamiento cuando el cliente está a 2 metros de tu zona. Más cerca y se sienten emboscados. Más lejos y no te escuchan o no procesan tu presencia a tiempo.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Optimal Door Setup',
      textEs: 'El posicionamiento óptimo en la puerta',
    },
    {
            type: 'paragraph',
      text: 'Your physical position at the door is the foundation of every stop. Here\'s how to position for maximum effect:',
      textEs: 'Tu posición física en la puerta es la base de cada parada. Así es como te posicionas para máximo efecto:',
    },
    {
            type: 'bullets',
      items: [
        'STAND SLIGHTLY FORWARD: Position yourself just outside the shop entrance, not flush against the wall. You need to be in the pedestrian\'s sight line, not hidden.',
        'ANGLE YOUR BODY: Face 45 degrees toward the street, not directly at the shop. This signals openness to passersby rather than closed-off shop posture.',
        'VISIBLE AND ACTIVE: Hold a product, arrange a display, or offer samples. Active hands signal engagement. Hands in pockets signal boredom.',
        'CLEAR THE PATH: Make sure the entrance is unobstructed. If people have to navigate around you, the stop feels like an obstacle, not an invitation.'
      ],
      itemsEs: [
          'POSICIÓNATE LIGERAMENTE ADELANTE: Colócate justo afuera de la entrada de la tienda, no pegado a la pared. Necesitas estar en la línea de visión del peatón, no escondido.',
          'INCLINA TU CUERPO: Enfócate a 45 grados hacia la calle, no directo a la tienda. Esto señaliza apertura a los transeúntes en vez de postura cerrada de tienda.',
          'VISIBLE Y ACTIVO: Sostén un producto, acomoda un exhibidor, u ofrece muestras. Las manos activas señalizan compromiso. Las manos en los bolsillos señalizan aburrimiento.',
          'DESPEJA EL CAMINO: Asegúrate de que la entrada esté despejada. Si la gente tiene que rodearte, la parada se siente como un obstáculo, no como una invitación.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The 2-Metre Strike Zone',
      textEs: 'La Zona de Ataque de 2 Metros',
    },
    {
            type: 'paragraph',
      text: 'The 2-metre zone is your optimal engagement window. Here\'s the breakdown:',
      textEs: 'La zona de 2 metros es tu ventana óptima de acercamiento. Aquí está el desglose:',
    },
    {
            type: 'numbered',
      items: [
        '3+ METRES: Too far. Your voice won\'t carry well against street noise. They may not visually register you. Save your energy.',
        '2 METRES: THE SWEET SPOT. Close enough for clear communication. Far enough that they have time to process you and adjust their pace. This is where you make eye contact and begin your opener.',
        '1 METRE: AMBUSH ZONE. Too close for comfort. They feel trapped. Starting here makes you seem aggressive or desperate. If they\'re already this close, either they came to you (great) or you missed your window.',
        'TALKING TO THEIR BACK: If you wait until they\'ve passed you, you\'re done. A person walking away is psychologically closed off. You might as well be talking to the wall.'
      ],
      itemsEs: [
          '3+ METROS: Demasiado lejos. Tu voz no se oye bien contra el ruido de la calle. Puede que ni te registren visualmente. Guarda energía.',
          '2 METROS: EL PUNTO DULCE. Lo suficientemente cerca para comunicación clara. Lo suficientemente lejos para que tengan tiempo de procesarte y ajustar su paso. Aquí es donde haces contacto visual y empiezas tu abridor.',
          '1 METRO: ZONA DE EMBOSCADA. Demasiado cerca para su comodidad. Se sienten atrapados. Empezar aquí te hace ver agresivo o desesperado. Si ya están tan cerca, o vinieron a ti (excelente) o perdiste tu ventana.',
          'HABLARLE A LA ESPALDA: Si esperas hasta que ya te pasaron, estás fuera. Una persona que camina alejándose está psicológicamente cerrada. Es como hablarle a la pared.',
        ],
    },
    {
            type: 'tip',
      text: 'Practice judging 2 metres visually. Find a spot outside your shop and mark it mentally. Stand there and note where 2 metres ends on the pavement. After a few days, you\'ll have a natural sense of the strike zone.',
      textEs: 'Practica calcular 2 metros visualmente. Encuentra un punto afuera de tu tienda y márcalo mentalmente. Párate ahí y nota dónde terminan los 2 metros en el pavimento. Después de unos días, tendrás un sentido natural de la zona de ataque.',
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Eye Contact Technique',
      textEs: 'Técnica de Contacto Visual',
    },
    {
            type: 'paragraph',
      text: 'Eye contact is the trigger. Before you speak, your eyes do the work. Here\'s how to use eye contact effectively:',
      textEs: 'El contacto visual es el detonante. Antes de hablar, tus ojos hacen el trabajo. Así es como usas el contacto visual efectivamente:',
    },
    {
            type: 'bullets',
      items: [
        'CATCH AND HOLD: Make eye contact 2 metres out. Hold for 1-2 seconds. Smile with your eyes. This establishes human connection before words.',
        'DON\'T STARE DOWN: Prolonged intense eye contact feels aggressive. 1-2 seconds is enough. Then shift to a natural gaze as you begin speaking.',
        'THE THREE-PERSON RULE: If you\'re in a group area, make brief eye contact with multiple people. Don\'t lock onto one person exclusively unless they\'re clearly solo.',
        'READ THEIR EYES: Eyes that meet yours with curiosity = receptive. Eyes that dart away = not interested. Eyes that widen slightly = surprised but open. Adjust your opener accordingly.'
      ],
      itemsEs: [
          'ATRAE Y SOSTÉN: Haz contacto visual a 2 metros. Sostén por 1-2 segundos. Sonríe con los ojos. Esto establece conexión humana antes de las palabras.',
          'NO LOS DESCIESFES: El contacto visual intenso y prolongado se siente agresivo. 1-2 segundos es suficiente. Luego cambia a una mirada natural cuando empieces a hablar.',
          'LA REGLA DE TRES PERSONAS: Si estás en un área de grupo, haz contacto visual breve con varias personas. No te enfoques exclusivamente en una persona a menos que esté claramente sola.',
          'LEE SUS OJOS: Ojos que encuentran los tuyos con curiosidad = receptivo. Ojos que se desvían = no interesado. Ojos que se abren ligeramente = sorprendido pero abierto. Ajusta tu abridor en consecuencia.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'The Approach Angle',
      textEs: 'El Ángulo de Acercamiento',
    },
    {
            type: 'paragraph',
      text: 'How you physically move toward a customer matters. Different angles create different psychological effects:',
      textEs: 'Cómo te mueves físicamente hacia un cliente importa. Diferentes ángulos crean diferentes efectos psicológicos:',
    },
    {
            type: 'bullets',
      items: [
        'FRONTAL APPROACH: Facing them directly. Highest engagement but can feel confrontational. Best when your energy is warm and inviting, not aggressive.',
        'SIDE ANGLE: Approaching from a slight angle (45 degrees). Less confrontational. Natural for pedestrians who are walking past. Your opener feels like a friendly comment, not an interception.',
        'PARALLEL WALK: Walking alongside them for 1-2 steps while talking, then slowing to invite them in. Works for people walking quickly. Matches their pace before redirecting it.',
        'THE LEAD: Starting slightly ahead of them, turning as they approach, then leading inside. This is the most natural — you\'re not blocking them, you\'re inviting them to follow.'
      ],
      itemsEs: [
          'ACERCAMIENTO FRONTAL: Enfrentándolos directamente. El mayor compromiso pero puede sentirse confrontacional. Mejor cuando tu energía es cálida e invitadora, no agresiva.',
          'ÁNGULO LATERAL: Acercándote desde un ángulo ligero (45 grados). Menos confrontacional. Natural para peatones que están caminando. Tu abridor se siente como un comentario amistoso, no como una intercepción.',
          'CAMINATA PARALELA: Caminando junto a ellos por 1-2 pasos mientras hablas, luego frenando para invitarlos a entrar. Funciona para gente que camina rápido. Empareja su ritmo antes de redirigirlo.',
          'EL LIDERAZGO: Empezando ligeramente adelante de ellos, girando mientras se acercan, y luego guiándolos adentro. Este es el más natural — no les estás bloqueando el paso, les estás invitando a seguirte.',
        ],
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Timing by Customer Speed',
      textEs: 'Timing según la Velocidad del Cliente',
    },
    {
            type: 'comparison',
      left: { label: 'Slow Walkers (Window Shoppers)', text: 'Approach early (2.5-3 metres). They have time. Use a warm, extended opener. Build rapport before the pitch. They respond to connection.' },
      leftEs: { label: 'Caminantes Lentos (Curiosos de Escaparates)', text: 'Acércate temprano (2.5-3 metros). Tienen tiempo. Usa un abridor cálido y extendido. Construye rapport antes del pitch. Responden a la conexión.' },
      right: { label: 'Fast Walkers (Purposeful)', text: 'Hit at exactly 2 metres with a fast, intriguing opener. \'Two seconds — you have to see this!\' They need energy and intrigue to break stride. You have 3 words to hook them.' },
      rightEs: { label: 'Los Que Van Rápido (Con Rumbo)', text: 'Entra justo a los 2 metros con una apertura rápida e intrigante. \'¡Dos segundos — tienes que ver esto!\' Necesitan energía e intriga para romper el paso. Tienes 3 palabras para engancharlos.' }
    },
    {
            type: 'tip',
      text: 'Watch their gait. Slow, meandering walkers are in browsing mode — prime targets. Fast, straight-line walkers are on a mission — only stop if you have something extremely compelling or if they give you eye contact first.',
      textEs: 'Observa su forma de caminar. Los que caminan lento y sin rumbo están en modo exploración — objetivos principales. Los que caminan rápido en línea recta van con una misión — solo deténlos si tienes algo extremadamente convincente o si te hacen contacto visual primero.',
    },
    {
            type: 'quote',
      text: 'A stop is like a dance invitation. Your position, timing, and eye contact set the stage. Your opener is simply asking them to dance. If the setup is wrong, the words don\'t matter.',
      textEs: 'Una parada es como una invitación a bailar. Tu posición, timing y contacto visual preparan el escenario. Tu abridor simplemente les pide bailar. Si el setup está mal, las palabras no importan.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'Why is the 2-metre zone considered the sweet spot for stopping?',
      options: [
        'It is closest to the shop door',
        'Close enough for clear communication but far enough for them to process you naturally',
        'It is where most customers walk',
        'It is the legal requirement'
      ],
      correctIndex: 1,
      explanation: 'The 2-metre zone is optimal because it is close enough for clear communication against street noise, but far enough that the customer has time to process your presence and adjust their pace naturally.',
    },
    {
      question: 'What happens when you wait until a customer is only 1 metre away before stopping them?',
      options: [
        'They are more likely to stop because you are close',
        'They feel ambushed and trapped — it creates a negative first impression',
        'It does not matter as long as your opener is good',
        'They appreciate your confidence'
      ],
      correctIndex: 1,
      explanation: 'The 1-metre zone is the ambush zone. Starting this close makes customers feel trapped and creates a negative first impression. They feel intercepted rather than invited.',
    },
    {
      question: 'What is the best approach angle for a fast-walking customer?',
      options: [
        'Direct frontal approach to block their path',
        'A side angle or parallel walk that matches their pace before redirecting',
        'Waiting until they pass then calling after them',
        'Standing still and waving'
      ],
      correctIndex: 1,
      explanation: 'For fast walkers, a side angle or parallel walk matches their pace and feels natural. Blocking their path creates resistance. Redirecting their momentum is more effective than stopping it.',
    }
    ],
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
          'ES ESPECÍFICO: \'Linda chaqueta\' es débil. \'Esa chaqueta verde oliva resalta tus ojos perfectamente\' es fuerte. Especificidad = observación = real.',
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
        'PEELING: \'This is my favorite trick for glowing skin. And by trick, I mean scientifically-proven miracle. But trick sounds cooler.\''
      ],
      itemsEs: [
        'JERINGA: \'¡No te preocupes, no es ese tipo de jeringa! Sin agujas, solo magia para tus ojos. Prometido.\'',
        'KIT DE UÑAS: \'Prometo no gritar cuando te muestre esto. Mi última clienta sí gritó, y su esposo se puso celoso.\'',
        'EXFOLIANTE: \'Esto va a dejar tus manos más suaves que las de un bebé... bueno, esa comparación está rara. Solo confía en mí, van a sentirse increíbles.\'',
        'PEELING: \'Este es mi truco favorito para piel radiante. Y por truco, me refiero a un milagro científicamente comprobado. Pero truco suena más cool.\''
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
      text: 'Test humor with a light comment first. If they smile or laugh, escalate. If they don\'t react, pivot immediately to a warm, professional tone. Don\'t keep trying to be funny — it becomes awkward.',
      textEs: 'Prueba el humor con un comentario ligero primero. Si sonríen o se ríen, escala. Si no reaccionan, pivota inmediatamente a un tono cálido y profesional. No sigas intentando ser gracioso — se vuelve incómodo.'
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
      question: 'What should you do if a customer doesn\'t laugh at your first humorous attempt?',
      options: [
        'Try harder with more jokes',
        'Pivot immediately to a warm, professional tone',
        'Give up on that customer',
        'Make a more extreme joke'
      ],
      correctIndex: 1,
      explanation: 'If humor doesn\'t land on the first attempt, pivot immediately. Don\'t keep trying — it becomes awkward. Read the customer\'s receptivity and adapt your approach.',
    }
    ],
  },
  'stop-4': {
    id: 'stop-4',
    categoryId: 'stopping',
    title: 'The Urgency Stop',
    titleEs: 'La Parada de Urgencia',
    subtitle: 'Creating FOMO — ethical urgency vs. pushy pressure',
    subtitleEs: 'Crea FOMO sin presionar',
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
      text: 'Urgency is one of the oldest and most effective sales tools because it works with human psychology. When people feel that an opportunity is limited — in time, quantity, or availability — they act faster. Without urgency, decisions get postponed indefinitely. With urgency, decisions happen NOW. The key is creating genuine urgency without being manipulative or pushy.',
      textEs: 'La urgencia es una de las herramientas de venta más antiguas y efectivas porque funciona con la psicología humana. Cuando la gente siente que una oportunidad es limitada — en tiempo, cantidad o disponibilidad — actúa más rápido. Sin urgencia, las decisiones se posponen indefinidamente. Con urgencia, las decisiones pasan AHORA. La clave es crear urgencia genuina sin ser manipulador o agresivo.'
    },
    {
            type: 'keypoint',
      text: 'Ethical urgency means highlighting real, verifiable limitations. Pushy pressure means inventing false scarcity. Customers can smell fake urgency. Real urgency creates excitement. Fake urgency creates resistance.',
      textEs: 'La urgencia ética significa destacar limitaciones reales y verificables. La presión agresiva significa inventar escasez falsa. Los clientes huelen la urgencia falsa. La urgencia real crea emoción. La urgencia falsa crea resistencia.'
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
        'TIME-BASED URGENCY: \'We\'re closing in 30 minutes\' or \'This offer ends today.\' Real, verifiable time limits. The customer knows these are true and acts accordingly.',
        'QUANTITY-BASED URGENCY: \'I only have two samples left\' or \'We sold out of this scent last weekend.\' Limited availability creates competition instinct.',
        'LOCATION-BASED URGENCY: \'This price only exists in {locationName}. Once you cross the border, it\'s back to {currency}500.\' That price gap IS genuine scarcity.',
        'SEASONAL URGENCY: \'Christmas is two weeks away and these are our most popular gifts. I\'d hate for you to miss out.\' Seasonal relevance creates natural deadlines.',
        'EXPERIENTIAL URGENCY: \'You\'ve already felt the difference. You know it works. This result is waiting for you — why wait?\' The demo itself creates urgency because they\'ve experienced the value.'
      ],
      itemsEs: [
        'URGENCIA POR TIEMPO: \'Cerramos en 30 minutos\' o \'Esta oferta termina hoy.\' Límites de tiempo reales y verificables. El cliente sabe que son ciertos y actúa en consecuencia.',
        'URGENCIA POR CANTIDAD: \'Solo me quedan dos muestras\' o \'Se agotó este aroma el fin de semana pasado.\' La disponibilidad limitada crea instinto de competencia.',
        'URGENCIA POR UBICACIÓN: \'Este precio solo existe en {locationName}. Una vez que cruces la frontera, vuelve a {currency}500.\' Esa diferencia de precio ES escasez genuina.',
        'URGENCIA POR TEMPORADA: \'La Navidad está en dos semanas y estos son nuestros regalos más populares. Odiaría que te lo pierdas.\' La relevancia de temporada crea plazos naturales.',
        'URGENCIA POR EXPERIENCIA: \'Ya sentiste la diferencia. Sabes que funciona. Este resultado te está esperando — ¿por qué esperar?\' La demo misma crea urgencia porque han experimentado el valor.'
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
        '\'This offer literally ends when we close tonight. I know, it sounds like a sales line, but check the sign — it\'s real.\' (Transparency builds trust)',
        '\'The last customer bought our last two scrubs in this scent. Want to see what the hype is about before the rest are gone?\' (Social proof + scarcity)',
        '\'You\'re here at the perfect time — we just restocked the syringe after selling out all weekend. But they go fast.\' (Fresh availability creates urgency)'
      ],
      itemsEs: [
        '\'Solo me quedan dos muestras de nuestro más vendido — ¿quieres ver de qué ha estado hablando todo el mundo?\' (Escasez por cantidad)',
        '\'Cerramos pronto, pero te puedo hacer espacio para una demo de 2 minutos que te volará la cabeza.\' (Presión de tiempo + valor)',
        '\'Esta oferta literalmente termina cuando cerremos esta noche. Lo sé, suena a frase de vendedor, pero checa el letrero — es real.\' (La transparencia genera confianza)',
        '\'El último cliente se llevó nuestros últimos dos exfoliantes de este aroma. ¿Quieres ver de qué va el hype antes de que se acaben el resto?\' (Prueba social + escasez)',
        '\'Llegaste en el momento perfecto — acabamos de reabastecer la jeringa después de agotarse todo el fin de semana. Pero se van rápido.\' (La disponibilidad fresca crea urgencia)'
      ]
    },
    {
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Ethical Urgency vs. Pushy Pressure',
      textEs: 'Urgencia Ética vs. Presión Agresiva',
    },
    {
            type: 'comparison',
      left: { label: 'Ethical Urgency (Good)', text: 'Based on real facts. \'We\'re closing in 20 minutes\' when you actually are. Creates excitement and motivation. Customer feels informed, not pressured. Respects their decision-making.' },
      leftEs: { label: 'Urgencia Ética (Buena)', text: 'Basada en hechos reales. \'Cerramos en 20 minutos\' cuando de verdad cierras. Crea emoción y motivación. El cliente se siente informado, no presionado. Respeta su toma de decisiones.' },
      right: { label: 'Pushy Pressure (Bad)', text: 'Based on lies or manipulation. \'This is the last one\' when there are 20 more in the back. Creates anxiety and resentment. Customer feels trapped and manipulated. Destroys trust and referrals.' },
      rightEs: { label: 'Presión Agresiva (Mala)', text: 'Basada en mentiras o manipulación. \'Este es el último\' cuando hay 20 más atrás. Crea ansiedad y resentimiento. El cliente se siente atrapado y manipulado. Destruye la confianza y las referencias.' }
    },
    {
            type: 'tip',
      text: 'The best urgency is REAL urgency. If you actually are low on stock, say so. If the offer actually ends today, say so. When urgency is verifiable, it works. When it\'s fabricated, customers sense it and trust evaporates.',
      textEs: 'La mejor urgencia es la urgencia REAL. Si de verdad te estás quedando sin stock, dilo. Si la oferta de verdad termina hoy, dilo. Cuando la urgencia es verificable, funciona. Cuando es fabricada, los clientes lo sienten y la confianza se evapora.'
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
        'LOCURA DE FIN DE SEMANA: \'Los fines de semana son una locura aquí. Odiaría que regresaras y encontraras tu aroma agotado.\' El timing de fin de semana crea presión de compra.'
      ]
    },
    {
            type: 'script',
      text: '\'Look, I\'m not going to give you the fake pressure thing. But I will tell you the truth: we sold 40 of these yesterday, and I have 8 left. The weekend rush starts tomorrow. If you know you want it, I\'d grab it now. If you\'re not sure, no pressure — but I can\'t guarantee it\'ll be here tomorrow.\' Honest, transparent urgency. This builds trust while creating motivation.',
      textEs: '\'Mira, no te voy a dar la presión falsa. Pero te voy a decir la verdad: vendimos 40 de estos ayer, y me quedan 8. La locura de fin de semana empieza mañana. Si sabes que lo quieres, yo lo agarraría ahora. Si no estás seguro, sin presión — pero no te garantizo que esté aquí mañana.\' Urgencia honesta y transparente. Esto construye confianza mientras crea motivación.'
    },
    {
            type: 'quote',
      text: 'Urgency isn\'t about pressuring people. It\'s about helping them overcome procrastination. The customer who genuinely wants your product but leaves to \'think about it\' often never returns. Urgency helps them make the decision they already want to make.',
      textEs: 'La urgencia no se trata de presionar a la gente. Se trata de ayudarles a superar la procrastinación. El cliente que genuinamente quiere tu producto pero se va a \'pensarlo\' a menudo nunca regresa. La urgencia les ayuda a tomar la decisión que ya quieren tomar.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines'
    }
    ],
    quiz: [
    {
      question: 'What is the difference between ethical urgency and pushy pressure?',
      options: [
        'There is no difference',
        'Ethical urgency is based on real facts; pushy pressure uses lies or manipulation',
        'Ethical urgency is more aggressive',
        'Pushy pressure works better'
      ],
      correctIndex: 1,
      explanation: 'Ethical urgency highlights real, verifiable limitations (actual closing time, real stock levels). Pushy pressure invents false scarcity. Customers detect fake urgency and trust evaporates.',
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
      explanation: 'The price gap is location-based urgency. The {currency}300 price only exists in {locationName}. Once the customer crosses the border, the price goes back to {currency}500. This is genuine, verifiable scarcity.',
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
      text: 'Generic stops work. Targeted stops work BETTER. When you match the product to something visible about the person, your stop feels personalized and relevant — not random. A woman with beautiful natural nails is the perfect Nail Kit target. Someone with visible under-eye bags is your Syringe customer. Reading the person\'s traits and matching them to the right product transforms your hit rate.',
      textEs: 'Las paradas genéricas funcionan. Las paradas dirigidas funcionan MEJOR. Cuando emparejas el producto con algo visible de la persona, tu parada se siente personalizada y relevante, no al azar. Una mujer con uñas naturales hermosas es la clienta perfecta para el Kit de Uñas. Alguien con ojeras visibles es tu cliente de la Jeringa. Leer los rasgos de la persona y emparejarlos con el producto adecuado transforma tu tasa de éxito.',
    },
    {
            type: 'keypoint',
      text: 'The formula: Observe a trait → Connect it to the product → Deliver a personalized opener. This makes the customer feel seen, not targeted.',
      textEs: 'La fórmula: Observa un rasgo → Conéctalo con el producto → Entrega un apertura personalizada. Esto hace que el cliente se sienta visto, no señalado.',
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
      text: 'Best targets: visible under-eye bags, crow\'s feet, tired-looking eyes, people who mention looking exhausted, older customers (40+) concerned with aging.',
      textEs: 'Mejores objetivos: ojeras visibles, patas de gallo, ojos con aspecto cansado, personas que mencionan verse agotadas, clientes mayores (40+) preocupados por el envejecimiento.',
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
      text: 'Best targets: dull skin, dry skin, people asking about skincare routines, younger customers (20s-30s) focused on glow, people who mention wanting \'fresher\' skin.',
      textEs: 'Mejores objetivos: piel opaca, piel seca, personas que preguntan por rutinas de cuidado de la piel, clientes jóvenes (de 20 a 30) enfocados en el brillo, personas que mencionan querer piel \'más fresca\'.',
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
      text: 'Best targets: dry hands (especially in winter), people mentioning the mountain air, eczema or dry skin concerns, gift buyers, couples (great unisex product).',
      textEs: 'Mejores objetivos: manos secas (especialmente en invierno), personas que mencionan el aire de la montaña, eccema o preocupaciones por piel seca, compradores de regalos, parejas (excelente producto unisex).',
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
      text: 'Best targets: natural nails (no heavy polish), well-maintained nails, younger women, gift buyers, people who appreciate natural beauty.',
      textEs: 'Mejores objetivos: uñas naturales (sin esmalte grueso), uñas bien cuidadas, mujeres jóvenes, compradores de regalos, personas que aprecian la belleza natural.',
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
      text: 'Matching Multiple Products',
      textEs: 'Emparejando Múltiples Productos',
    },
    {
            type: 'paragraph',
      text: 'Sometimes you can offer multiple products in one stop. Here\'s when to combine:',
      textEs: 'A veces puedes ofrecer múltiples productos en una sola parada. Aquí te decimos cuándo combinarlos:',
    },
    {
            type: 'bullets',
      items: [
        'THE CLASSIC TRIO ({currency}120): Scrub + Body Butter + Nail Kit. Best for: gift shoppers, couples, people who want variety.',
        'THE SPA TRIO ({currency}120): Scrub + Body Butter + Face Cleanser. Best for: self-care focused customers, people interested in routines.',
        'THE SMART DUO ({currency}60): Scrub + Nail Kit. Best for: budget-conscious buyers, the Nail Kit already includes cream.',
        'THE SCENT DUO ({currency}60): Scrub + Body Butter. Best for: people who love the sensory experience of the scrub demo.'
      ],
      itemsEs: [
          'EL TRÍO CLÁSICO ({currency}120): Exfoliante + Body Butter + Kit de Uñas. Ideal para: compradores de regalos, parejas, personas que quieren variedad.',
          'EL TRÍO SPA ({currency}120): Exfoliante + Body Butter + Limpiador Facial. Ideal para: clientes enfocados en el autocuidado, personas interesadas en rutinas.',
          'EL DÚO INTELIGENTE ({currency}60): Exfoliante + Kit de Uñas. Ideal para: compradores conscientes del presupuesto, el Kit de Uñas ya incluye crema.',
          'EL DÚO AROMÁTICO ({currency}60): Exfoliante + Body Butter. Ideal para: personas que aman la experiencia sensorial de la demo del exfoliante.',
        ],
    },
    {
            type: 'tip',
      text: 'Start with ONE product in your stop. Once they\'re inside and engaged, you can introduce combos and additional products. Leading with multiple options confuses the stop. Simplify to amplify.',
      textEs: 'Empieza con UN producto en tu parada. Una vez que están dentro e involucrados, puedes introducir combos y productos adicionales. Liderar con múltiples opciones confunde la parada. Simplifica para amplificar.',
    },
    {
            type: 'quote',
      text: 'The best stops don\'t feel like stops. They feel like a friend noticing something about you and offering a helpful suggestion. That\'s what happens when you match the product to the person.',
      textEs: 'Las mejores paradas no se sienten como paradas. Se sienten como un amigo que nota algo en ti y te ofrece una sugerencia útil. Eso es lo que pasa cuando emparejas el producto con la persona.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'What is the formula for a product-specific stop?',
      options: [
        'Mention all products at once',
        'Observe a trait → Connect it to the product → Deliver a personalized opener',
        'Lead with the price',
        'Ask if they want to buy'
      ],
      correctIndex: 1,
      explanation: 'The formula is: observe a visible trait, connect it naturally to a specific product, then deliver a personalized opener. This makes the stop feel relevant, not random.',
    },
    {
      question: 'Who is the best target for the Syringe stop?',
      options: [
        'Young children',
        'People with visible under-eye concerns, tired eyes, or aging concerns',
        'People who hate skincare',
        'Men only'
      ],
      correctIndex: 1,
      explanation: 'The Syringe (eye treatment) is best matched to people with visible under-eye bags, crow\'s feet, tired-looking eyes, or those concerned with aging around the eyes.',
    },
    {
      question: 'Why should you start with one product in your stop rather than offering multiple products?',
      options: [
        'You only have one product to sell',
        'Multiple options confuse the stop; simplify to amplify',
        'Customers only want one product',
        'It\'s company policy'
      ],
      correctIndex: 1,
      explanation: 'Leading with multiple products confuses the stop. Start with one clear, targeted product to get them inside. Once engaged, you can introduce combos and additional products.',
    }
    ],
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
      text: 'Most salespeople hear \'no thanks\' and immediately give up. Top performers know that \'no\' often means \'not yet,\' \'not this product,\' \'not from this angle,\' or simply \'I need a moment.\' A recovery stop is your second chance — and second chances convert at surprising rates when handled well. The recovery isn\'t about being pushy; it\'s about being persistent with grace.',
      textEs: 'La mayoría de los vendedores escuchan \'no gracias\' y se rinden de inmediato. Los mejores saben que \'no\' a menudo significa \'aún no,\' \'no este producto,\' \'no desde este ángulo,\' o simplemente \'necesito un momento.\' Una parada de recuperación es tu segunda oportunidad, y las segundas oportunidades convierten a tasas sorprendentes cuando se manejan bien. La recuperación no se trata de ser insistente; se trata de ser persistente con elegancia.',
    },
    {
            type: 'keypoint',
      text: 'Statistics show that 44% of salespeople give up after one \'no.\' Yet 80% of sales require at least five follow-up contacts. The salesperson who recovers gracefully after rejection outperforms the one who quits on the first \'no.\'',
      textEs: 'Las estadísticas muestran que el 44% de los vendedores se rinden después de un \'no.\' Sin embargo, el 80% de las ventas requieren al menos cinco contactos de seguimiento. El vendedor que se recupera con elegancia después del rechazo supera al que se rinde con el primer \'no.\'',
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
        'THE BUDGET NO: \'I can\'t afford it.\' Real or perceived price barrier. Response: Emphasize value, offer a lower price point, or reframe as an investment.',
        'THE POLITE NO: \'No thank you.\' Said gently, often with a smile. They\'re not interested but are being nice. Response: Plant a seed and let them go warmly.'
      ],
      itemsEs: [
          'EL NO REFLEJO: Automático, sin pensar. Ni siquiera procesaron lo que dijiste. Respuesta: Reconoce y vuelve a interactuar con humor o curiosidad.',
          'EL NO POR PRISA: \'No gracias, tengo prisa.\' Tienen algún lugar al que ir. Respuesta: Respeta la limitación de tiempo, ofrece una alternativa más rápida.',
          'EL NO ESCÉPTICO: \'No te creo.\' Los han quemado antes. Respuesta: Prueba social, evidencia, o una prueba sin riesgo.',
          'EL NO POR PRESUPUESTO: \'No me lo puedo permitir.\' Barrera de precio real o percibida. Respuesta: Enfatiza el valor, ofrece un punto de precio más bajo, o replantéalo como una inversión.',
          'EL NO EDUCADO: \'No, gracias.\' Dicho suavemente, a menudo con una sonrisa. No están interesados pero son amables. Respuesta: Siembra una semilla y déjalos ir con calidez.',
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
        'THE TIME-RESPECTFUL RECOVERY: \'I totally understand. How about this — I won\'t even explain. Just let me do the demo. If you don\'t love it in 30 seconds, you walk away. Deal?\' Removes the risk of being trapped in a long pitch.',
        'THE SOCIAL PROOF RECOVERY: \'You know what? Every single person who just walked past me said the same thing. And every single one who came back to try it bought something. I\'m just saying...\' Creates intrigue through social proof.',
        'THE GIFT REFRAME: \'I know you weren\'t looking for it, but I want to GIVE you something. No purchase, no catch. Just a free hand treatment because your hands deserve it.\' Reframing as a gift removes the sales pressure.'
      ],
      itemsEs: [
          'LA RECUPERACIÓN CON HUMOR: \'Lo sé, lo sé, no planeabas parar hoy. Pero te prometo que esta es la única vez en la que te alegrarás de haberlo hecho. ¿Treinta segundos?\' El humor desarma el \'no\' automático.',
          'EL GANCHO DE LA CURIOSIDAD: \'Lo entiendo, estás ocupado. Pero ¿puedo preguntarte algo? ¿Cuándo fue la última vez que un desconocido te mostró algo que realmente te impresionó?\' La curiosidad anula el rechazo.',
          'LA RECUPERACIÓN RESPETUOSA DEL TIEMPO: \'Lo entiendo perfectamente. ¿Qué tal esto? Ni siquiera voy a explicar. Solo déjame hacer la demo. Si no te encanta en 30 segundos, te vas. ¿Trato?\' Elimina el riesgo de quedar atrapado en un pitch largo.',
          'LA RECUPERACIÓN CON PRUEBA SOCIAL: \'¿Sabes qué? Cada persona que acaba de pasar a mi lado dijo lo mismo. Y cada una de las que regresaron a probarlo compró algo. Solo digo...\' Crea intriga a través de la prueba social.',
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
        '\'I\'ll be here all day. When you change your mind after seeing someone else\'s results, come find me!\'',
        '\'My manager is watching — can you at least pretend to be interested for 10 seconds?\' (Self-deprecating humor that creates connection.)',
        '\'That\'s the fourth \'no\' in a row. You\'re all going to make me cry!\' (Playful, not desperate.)'
      ],
      itemsEs: [
          '\'¡Me estás rompiendo el corazón! Es broma, pero en serio, te estás perdiendo de algo.\'',
          '\'Está bien, pero cuando pases frente a nuestra tienda más tarde y veas a todos sonriendo adentro, te preguntarás qué te perdiste.\'',
          '\'Estaré aquí todo el día. ¡Cuando cambies de opinión después de ver los resultados de alguien más, ven a buscarme!\'',
          '\'Mi gerente está viendo, ¿puedes al menos fingir interés por 10 segundos?\' (Humor autocrítico que crea conexión.)',
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
      text: 'The Seed Planting Technique',
      textEs: 'La Técnica de Sembrar la Semilla',
    },
    {
            type: 'paragraph',
      text: 'Sometimes the best recovery is no recovery at all. Sometimes you plant a seed and let it grow:',
      textEs: 'A veces la mejor recuperación es no recuperar en absoluto. A veces siembras una semilla y dejas que crezca:',
    },
    {
            type: 'script',
      text: '\'No problem at all! Enjoy your day in {locationName}. But hey — when you see someone walk out of our shop with that \'wow\' look on their face, remember I offered!\' This plants a seed of curiosity. They might walk past later, see a happy customer, and come back. It happens more than you think.',
      textEs: '\'¡Ningún problema! Disfruta tu día en {locationName}. Pero oye, cuando veas a alguien salir de nuestra tienda con esa cara de \'wow\', ¡recuerda que te lo ofrecí!\' Esto siembra una semilla de curiosidad. Pueden pasar más tarde, ver a un cliente feliz, y regresar. Pasa más de lo que crees.',
    },
    {
            type: 'bullets',
      items: [
        'GIVE THEM A CARD OR FLYER: Physical reminders work. Something they can put in their pocket and consider later.',
        'MENTION YOUR LOCATION: \'We\'re right here — number 15. If you change your mind, just pop in.\' Makes returning feel easy.',
        'REFERENCE A SPECIFIC PRODUCT: \'If you find yourself thinking about glowing skin later, ask for the Peeling. That\'s the one everyone comes back for.\'',
        'LEAVE THE DOOR OPEN: \'No pressure at all. If you pass by later and feel like it, I\'ll be here. I\'d love to show you then.\' Warm, non-desperate, inviting.'
      ],
      itemsEs: [
          'DALES UNA TARJETA O FOLLETO: Los recordatorios físicos funcionan. Algo que puedan guardar en su bolsillo y considerar más tarde.',
          'MENCIONA TU UBICACIÓN: \'Estamos justo aquí, el número 15. Si cambias de opinión, solo entra.\' Hace que regresar se sienta fácil.',
          'Haz REFERENCIA A UN PRODUCTO ESPECÍFICO: \'Si te encuentras pensando en piel radiante más tarde, pide el Peeling. Ese es por el que todos regresan.\'',
          'DEJA LA PUERTA ABIERTA: \'Ninguna presión en absoluto. Si pasas más tarde y te apetece, estaré aquí. Me encantaría mostrártelo entonces.\' Cálido, no desesperado, invitante.',
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
        'ONE RECOVERY ATTEMPT: If they say no and you try one recovery, that\'s professional persistence.',
        'TWO RECOVERY ATTEMPTS: If the first recovery fails and they seem receptive, a second (different) approach is acceptable.',
        'THREE OR MORE: This is pushing. If two attempts fail, let them go gracefully. Pursuing further damages your reputation and the shop\'s reputation.',
        'BODY LANGUAGE SIGNALS: Crossed arms, stepping away, flat expression, no engagement — these are definitive \'stop\' signals. Respect them immediately.',
        'VERBAL SHUTDOWN: \'Please leave me alone,\' \'I said no,\' or aggressive language means immediate disengagement. Smile, apologize, and step back.'
      ],
      itemsEs: [
          'UN INTENTO DE RECUPERACIÓN: Si dicen que no e intentas una recuperación, eso es persistencia profesional.',
          'DOS INTENTOS DE RECUPERACIÓN: Si la primera recuperación falla y parecen receptivos, un segundo enfoque (diferente) es aceptable.',
          'TRES O MÁS: Esto es ser insistente. Si dos intentos fallan, déjalos ir con elegancia. Seguir insistiendo daña tu reputación y la reputación de la tienda.',
          'SEÑALES DE LENGUAJE CORPORAL: Brazos cruzados, alejarse, expresión plana, sin interacción, estas son señales definitivas de \'detente.\' respétalas de inmediato.',
          'CIERRE VERBAL: \'Por favor déjame en paz,\' \'Ya te dije que no,\' o lenguaje agresivo significa desvinculación inmediata. Sonríe, discúlpate, y retrocede.',
        ],
    },
    {
            type: 'quote',
      text: 'The salesperson who knows when to walk away earns more respect than the one who never lets go. A graceful exit plants a seed for tomorrow. A desperate chase burns every bridge.',
      textEs: 'El vendedor que sabe cuándo alejarse gana más respeto que el que nunca suelta. Una salida elegante siembra una semilla para mañana. Una persecución desesperada quema todos los puentes.',
      attribution: 'Zero Lines Method',
      attributionEs: 'Método Zero Lines',
    }
    ],
    quiz: [
    {
      question: 'According to research, what percentage of sales require at least five follow-up contacts?',
      options: [
        '20%',
        '44%',
        '80%',
        '95%'
      ],
      correctIndex: 2,
      explanation: 'Research shows 80% of sales require at least five follow-up contacts, yet 44% of salespeople give up after one \'no.\' Persistence with grace is a massive competitive advantage.',
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
        'One to two attempts maximum, then let go gracefully',
        'Never attempt recovery — respect the first no',
        'Five or more — statistics say persistence pays'
      ],
      correctIndex: 1,
      explanation: 'One recovery attempt is professional persistence. Two is acceptable if they seem receptive. Three or more is pushing into harassment territory. Know when to walk away gracefully.',
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
        'DIRECT or INDIRECT? Do you prefer getting straight to the point? Or do you like building rapport first, easing into the pitch? Drivers can be direct. Amiables should build connection first.',
        'HUMOR-DRIVEN or SERIOUS? Are you naturally funny? Do people laugh around you? If yes, humor is your weapon. If not, warmth and professionalism are just as powerful.',
        'VERBAL or PHYSICAL? Some sellers captivate with words — smooth talkers. Others captivate with the demo — the product does the talking. Know which one you are.'
      ],
      itemsEs: [
          '¿ALTA ENERGÍA o CALMA? ¿Hablas rápido naturalmente, te mueves con rapidez, y irradias entusiasmo? ¿O eres más mesurado, cálido, y constante? Ambos funcionan, pero forzar la calma cuando eres enérgico (o viceversa) se siente falso.',
          '¿DIRECTO o INDIRECTO? ¿Prefieres ir directo al grano? ¿O te gusta primero construir una conexión, entrando suavemente al pitch? Los determinados pueden ser directos. Los amigables deberían construir conexión primero.',
          '¿HUMOR o SERIEDAD? ¿Eres naturalmente gracioso? ¿La gente ríe a tu alrededor? Si sí, el humor es tu arma. Si no, la calidez y el profesionalismo son igual de poderosos.',
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
        'THE ENERGIZER: High energy, fast-paced, loud and proud. Uses humor, excitement, and enthusiasm to draw people in. Best for: Young crowds, groups, holiday shoppers, high-traffic periods. Risk: Can overwhelm introverts or older customers.',
        'THE WARM INVITER: Calm, warm, genuinely caring. Builds rapport slowly. Uses gentle curiosity and kindness. Best for: Couples, older customers, serious buyers, afternoon lulls. Risk: Can seem low-energy during peak times.',
        'THE EXPERT: Knowledgeable, confident, authority-driven. Leads with facts and lets the product speak. Best for: Analytical buyers, French tourists, skeptical customers. Risk: Can feel cold without enough warmth.',
        'THE CHAMELEON: Adapts to each customer. High energy with energetic people, calm with calm people. Flexible and observant. Best for: Sellers with strong empathy and reading skills. Risk: Can feel inconsistent if not grounded in authenticity.'
      ],
      itemsEs: [
          'EL ENERGIZADOR: Alta energía, ritmo rápido, fuerte y orgulloso. Usa humor, emoción, y entusiasmo para atraer gente. Ideal para: Multitudes jóvenes, grupos, compradores navideños, periodos de alto tráfico. Riesgo: Puede abrumar a introvertidos o clientes mayores.',
          'EL INVITADOR CÁLIDO: Tranquilo, cálido, genuinamente cariñoso. Construye conexión lentamente. Usa curiosidad gentil y amabilidad. Ideal para: Parejas, clientes mayores, compradores serios, momentos tranquilos de la tarde. Riesgo: Puede parecer de baja energía durante los periodos pico.',
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
            type: 'divider'
    },
    {
            type: 'subheader',
      text: 'Testing Different Styles',
      textEs: 'Probando Diferentes Estilos',
    },
    {
            type: 'paragraph',
      text: 'Finding your style requires experimentation. Here\'s a systematic approach:',
      textEs: 'Encontrar tu estilo requiere experimentación. Aquí hay un enfoque sistemático:',
    },
    {
            type: 'numbered',
      items: [
        'WEEK 1 — OBSERVE: Don\'t experiment yet. Just watch your teammates. Notice what each person does. What feels natural to you when you watch? What makes you cringe? Your reactions are data.',
        'WEEK 2 — TEST HIGH ENERGY: Even if you\'re calm, try one high-energy shift. Ramp up your enthusiasm. Speak louder. Move faster. See what happens. Track your stops and closes.',
        'WEEK 3 — TEST CALM ENERGY: Now try the opposite. Slow down. Speak softly. Build rapport before pitching. Track the difference in customer response.',
        'WEEK 4 — TEST DIRECT vs. INDIRECT: Try shifts where you get straight to the point vs. shifts where you build connection first. Which feels better? Which gets better results?',
        'WEEK 5 — BLEND: By now you know what works. Create YOUR hybrid — the style that blends your natural personality with the techniques that got the best results.'
      ],
      itemsEs: [
          'SEMANA 1 — OBSERVA: No experimentes todavía. Solo observa a tus compañeros. Nota lo que hace cada persona. ¿Qué se siente natural para ti al observar? ¿Qué te hace sentir incómodo? Tus reacciones son datos.',
          'SEMANA 2 — PRUEBA ALTA ENERGÍA: Incluso si eres tranquilo, prueba un turno de alta energía. Aumenta tu entusiasmo. Habla más fuerte. Muévete más rápido. Ve qué pasa. Registra tus paradas y cierres.',
          'SEMANA 3 — PRUEBA ENERGÍA TRANQUILA: Ahora prueba lo opuesto. Baja la velocidad. Habla suavemente. Construye conexión antes de hacer el pitch. Registra la diferencia en la respuesta del cliente.',
          'SEMANA 4 — PRUEBA DIRECTO vs. INDIRECTO: Prueba turnos donde vas directo al grano vs. turnos donde construyes conexión primero. ¿Cuál se siente mejor? ¿Cuál da mejores resultados?',
          'SEMANA 5 — MEZCLA: Ahora ya sabes qué funciona. Crea TU híbrido, el estilo que mezcla tu personalidad natural con las técnicas que dieron los mejores resultados.',
        ],
    },
    {
            type: 'tip',
      text: 'Track your numbers by style. Write down: energy level (1-10), approach type (direct/indirect), and result. After two weeks of tracking, patterns will emerge. Let data guide your style development, not just feelings.',
      textEs: 'Registra tus números por estilo. Anota: nivel de energía (1-10), tipo de enfoque (directo/indirecto), y resultado. Después de dos semanas de registro, surgirán patrones. Deja que los datos guíen el desarrollo de tu estilo, no solo los sentimientos.',
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
      question: 'What is the recommended method for testing different stopping styles?',
      options: [
        'Switch styles randomly every hour',
        'Systematically test one style per week and track your results',
        'Only use the style that feels most comfortable immediately',
        'Copy each teammate for one day'
      ],
      correctIndex: 1,
      explanation: 'Systematic testing over weeks with tracked results lets you compare what works. Test high energy, calm energy, direct and indirect approaches, then blend what worked best into your unique hybrid.',
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
export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getLessonsForCategory(categoryId: string): Lesson[] {
  const cat = getCategory(categoryId);
  if (!cat) return [];
  return cat.lessonOrder
    .map((id) => lessons[id])
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
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

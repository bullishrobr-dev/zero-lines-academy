// ─────────────────────────────────────────────────────────────
// Zero Lines Academy — General Quizzes
// 10 standalone quizzes with 5 questions each (50 total)
// CORRECT prices from the Zero Lines Sales Bible — DO NOT ALTER
// ─────────────────────────────────────────────────────────────

export interface QuizQuestion {
  question: string;
  questionEs: string;
  options: string[];
  optionsEs: string[];
  correctIndex: number;
  explanation: string;
  explanationEs: string;
}

export interface GeneralQuiz {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  icon: string;
  category: string;
  categoryEs: string;
  xpReward: number;
  questions: QuizQuestion[];
}

// ═════════════════════════════════════════════════════════════
// QUIZ 1: Syringe Pricing Master
// Price ladder (numbers only — see src/data/pricing.ts): 500 -> 300 -> 210 -> 175 -> 140 -> 100
// ═════════════════════════════════════════════════════════════
const syringePricingQuiz: GeneralQuiz = {
  id: 'quiz-syringe-pricing',
  title: 'Syringe Pricing Master',
  titleEs: 'Maestro de Precios de Jeringuilla',
  description: 'Master the complete syringe price ladder from the Europe anchor down to the minimum close.',
  descriptionEs: 'Domina la escalera completa de precios de la jeringuilla desde el anclaje europeo hasta el cierre mínimo.',
  icon: 'Syringe',
  category: 'Product Pricing',
  categoryEs: 'Precios de Productos',
  xpReward: 50,
  questions: [
    {
      question: 'What is the FIRST price you mention to anchor the syringe value?',
      questionEs: '¿Cuál es el PRIMER precio que mencionas para anclar el valor de la jeringuilla?',
      options: [
        '{currency}300 — the {locationName} base price',
        '{currency}500 — the Europe price',
        '{currency}210 — the offer price',
        '{currency}140 — the voucher close price',
      ],
      optionsEs: [
        '{currency}300 — el precio base de {locationName}',
        '{currency}500 — el precio de Europa',
        '{currency}210 — el precio de oferta',
        '{currency}140 — el precio de cierre con vale',
      ],
      correctIndex: 1,
      explanation: 'Always start with the Europe price anchor ({currency}500) to establish high perceived value before revealing the {locationName} price.',
      explanationEs: 'Siempre comienza con el anclaje de precio de Europa ({currency}500) para establecer un valor percibido alto antes de revelar el precio de {locationName}.',
    },
    {
      question: 'After anchoring with {currency}500, what is the {locationName} base price for a single syringe?',
      questionEs: 'Después de anclar con {currency}500, ¿cuál es el precio base de {locationName} para una jeringuilla individual?',
      options: ['{currency}100', '{currency}140', '{currency}175', '{currency}300'],
      optionsEs: ['{currency}100', '{currency}140', '{currency}175', '{currency}300'],
      correctIndex: 3,
      explanation: 'The {locationName} base price is {currency}300. This should feel like a great deal compared to the {currency}500 Europe anchor.',
      explanationEs: 'El precio base de {locationName} es {currency}300. Debería parecer una ganga comparado con el anclaje de {currency}500 de Europa.',
    },
    {
      question: 'A customer loves the demo but hesitates at {currency}300. What is Offer Option 1?',
      questionEs: 'A un cliente le encanta la demo pero duda en {currency}300. ¿Cuál es la Opción de Oferta 1?',
      options: [
        '{currency}300 + second syringe free',
        '{currency}210 (30% off) + free gift (cream/cleanser/peeling choice)',
        '{currency}175 with gift removed',
        '{currency}140 with voucher',
      ],
      optionsEs: [
        '{currency}300 + segunda jeringuilla gratis',
        '{currency}210 (30% descuento) + regalo gratis (crema/limpiador/peeling a elegir)',
        '{currency}175 sin regalo',
        '{currency}140 con vale',
      ],
      correctIndex: 1,
      explanation: 'Offer Option 1 is {currency}210 (30% off) plus a free gift of their choice (cream, cleanser, or peeling). You drop the price AND add value.',
      explanationEs: 'La Opción de Oferta 1 es {currency}210 (30% descuento) más un regalo gratis a elegir (crema, limpiador o peeling). Bajas el precio Y añades valor.',
    },
    {
      question: 'The customer wants to treat multiple areas. What is Offer Option 2?',
      questionEs: 'El cliente quiere tratar varias zonas. ¿Cuál es la Opción de Oferta 2?',
      options: [
        '{currency}210 for one syringe + gift',
        '{currency}300 + second syringe free (treats forehead, upper lip, "11s")',
        '{currency}175 single syringe only',
        '{currency}140 voucher close',
      ],
      optionsEs: [
        '{currency}210 por una jeringuilla + regalo',
        '{currency}300 + segunda jeringuilla gratis (trata frente, labio superior, "11s")',
        '{currency}175 solo una jeringuilla',
        '{currency}140 cierre con vale',
      ],
      correctIndex: 1,
      explanation: 'Offer Option 2 keeps the {currency}300 price but gives a second syringe free to treat forehead, upper lip, and "11s" between the brows.',
      explanationEs: 'La Opción de Oferta 2 mantiene el precio de {currency}300 pero da una segunda jeringuilla gratis para tratar frente, labio superior y "11s" entre las cejas.',
    },
    {
      question: 'What is the MINIMUM price for a single syringe (final voucher push)?',
      questionEs: '¿Cuál es el precio MÍNIMO para una jeringuilla individual (empuje final con vale)?',
      options: ['{currency}100', '{currency}140', '{currency}175', '{currency}210'],
      optionsEs: ['{currency}100', '{currency}140', '{currency}175', '{currency}210'],
      correctIndex: 0,
      explanation: 'The absolute minimum is {currency}100. The voucher close steps are {currency}175 (adaptive, gift removed) → {currency}140 (20% voucher) → {currency}100 (final minimum). Only use {currency}100 as a last resort.',
      explanationEs: 'El mínimo absoluto es {currency}100. Los pasos de cierre con vale son {currency}175 (adaptativo, sin regalo) → {currency}140 (vale 20%) → {currency}100 (mínimo final). Usa {currency}100 solo como último recurso.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 2: Peeling Pricing
// Price ladder (numbers only — see src/data/pricing.ts): 200 -> 150 -> 100 -> 70 -> 50
// ═════════════════════════════════════════════════════════════
const peelingPricingQuiz: GeneralQuiz = {
  id: 'quiz-peeling-pricing',
  title: 'Peeling Pricing',
  titleEs: 'Precios del Peeling',
  description: 'Know every price step of the Glycolic Peeling — from the Europe anchor to the voucher close.',
  descriptionEs: 'Conoce cada paso de precio del Peeling Glucólico — desde el anclaje europeo hasta el cierre con vale.',
  icon: 'Droplets',
  category: 'Product Pricing',
  categoryEs: 'Precios de Productos',
  xpReward: 50,
  questions: [
    {
      question: 'What is the Europe price anchor for a professional glycolic peeling?',
      questionEs: '¿Cuál es el anclaje de precio de Europa para un peeling glucólico profesional?',
      options: ['{currency}50', '{currency}100', '{currency}150', '{currency}200'],
      optionsEs: ['{currency}50', '{currency}100', '{currency}150', '{currency}200'],
      correctIndex: 3,
      explanation: 'The Europe price anchor for a professional peeling is {currency}200. Use this to establish value before revealing the {locationName} price.',
      explanationEs: 'El anclaje de precio de Europa para un peeling profesional es {currency}200. Úsalo para establecer el valor antes de revelar el precio de {locationName}.',
    },
    {
      question: 'What is the {locationName} base price for a single professional-grade peeling?',
      questionEs: '¿Cuál es el precio base de {locationName} para un peeling profesional individual?',
      options: ['{currency}50', '{currency}70', '{currency}100', '{currency}150'],
      optionsEs: ['{currency}50', '{currency}70', '{currency}100', '{currency}150'],
      correctIndex: 3,
      explanation: 'The {locationName} base price for a peeling is {currency}150 — a significant saving from the {currency}200 European cost.',
      explanationEs: 'El precio base de {locationName} para un peeling es {currency}150 — un ahorro significativo respecto al coste europeo de {currency}200.',
    },
    {
      question: 'What is Offer Option 1 for the peeling?',
      questionEs: '¿Cuál es la Opción de Oferta 1 para el peeling?',
      options: [
        '{currency}150 + Day & Night Cream free',
        '{currency}100 (50% off) + Dead Sea Body Scrub gift',
        '{currency}70 (scrub removed as credit)',
        '{currency}50 single peeling, no gifts',
      ],
      optionsEs: [
        '{currency}150 + Crema Día y Noche gratis',
        '{currency}100 (50% descuento) + regalo Exfoliante Corporal del Mar Muerto',
        '{currency}70 (exfoliante retirado como crédito)',
        '{currency}50 peeling individual, sin regalos',
      ],
      correctIndex: 1,
      explanation: 'Offer Option 1 is {currency}100 (50% off the {currency}200 Europe price) plus a free Dead Sea Body Scrub gift. This is a powerful value presentation.',
      explanationEs: 'La Opción de Oferta 1 es {currency}100 (50% descuento del precio europeo de {currency}200) más un regalo gratis de Exfoliante Corporal del Mar Muerto. Esta es una presentación de valor poderosa.',
    },
    {
      question: 'What is Offer Option 2 for the peeling?',
      questionEs: '¿Cuál es la Opción de Oferta 2 para el peeling?',
      options: [
        '{currency}100 + Dead Sea Body Scrub',
        '{currency}150 (standard) + Day & Night Cream free',
        '{currency}70 adaptive fallback',
        '{currency}50 voucher close',
      ],
      optionsEs: [
        '{currency}100 + Exfoliante Corporal del Mar Muerto',
        '{currency}150 (estándar) + Crema Día y Noche gratis',
        '{currency}70 reserva adaptativa',
        '{currency}50 cierre con vale',
      ],
      correctIndex: 1,
      explanation: 'Offer Option 2 is the standard {currency}150 {locationName} price plus Day & Night Cream free. This maintains the base price while adding significant perceived value.',
      explanationEs: 'La Opción de Oferta 2 es el precio estándar de {locationName} de {currency}150 más Crema Día y Noche gratis. Esto mantiene el precio base mientras añade un valor percibido significativo.',
    },
    {
      question: 'What is the voucher close (minimum) price for a single peeling?',
      questionEs: '¿Cuál es el precio de cierre con vale (mínimo) para un peeling individual?',
      options: ['{currency}25', '{currency}50', '{currency}70', '{currency}100'],
      optionsEs: ['{currency}25', '{currency}50', '{currency}70', '{currency}100'],
      correctIndex: 1,
      explanation: 'The voucher close price for a peeling is {currency}50, and it is also the absolute floor — there is nothing underneath it. The rung above it is the adaptive {currency}70 with the Scrub taken out as credit; the voucher then brings that {currency}70 down to {currency}50, single peeling, no gifts.',
      explanationEs: 'El precio de cierre con cupón para un peeling es {currency}50, y es también el mínimo absoluto — no hay nada por debajo. El escalón anterior es el adaptativo de {currency}70 con el Exfoliante sacado como crédito; el cupón baja esos {currency}70 hasta {currency}50, peeling individual, sin regalos.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 3: Scrub & Butter Combos
// Mix & match ladder (numbers only): anchor 80, base 60, 120/3, 120/4, 60/2, 30 floor
// ═════════════════════════════════════════════════════════════
const combosQuiz: GeneralQuiz = {
  id: 'quiz-scrub-combos',
  title: 'Scrub & Butter Combos',
  titleEs: 'Combos de Exfoliante y Manteca',
  description: 'Master every combo offer — from Buy 2 Get 1 to the {currency}30 fallback strategy.',
  descriptionEs: 'Domina cada oferta combo — desde Compra 2 Lleva 1 hasta la estrategia de reserva de {currency}30.',
  icon: 'Sparkles',
  category: 'Product Combos',
  categoryEs: 'Combos de Productos',
  xpReward: 50,
  questions: [
    {
      question: 'What is the Europe price for one Dead Sea Scrub or Body Butter?',
      questionEs: '¿Cuál es el precio de Europa por un Exfoliante del Mar Muerto o Manteca Corporal?',
      options: ['{currency}30', '{currency}60', '{currency}80', '{currency}120'],
      optionsEs: ['{currency}30', '{currency}60', '{currency}80', '{currency}120'],
      correctIndex: 2,
      explanation: 'The Europe price is {currency}80 each. The {locationName} price is {currency}60 each. Use the {currency}80 anchor to make {currency}60 feel like great value.',
      explanationEs: 'El precio de Europa es {currency}80 cada uno. El precio de {locationName} es {currency}60 cada uno. Usa el anclaje de {currency}80 para que {currency}60 se sienta como un gran valor.',
    },
    {
      question: 'What is the core combo offer for Scrub & Body Butter?',
      questionEs: '¿Cuál es la oferta combo principal para Exfoliante y Manteca Corporal?',
      options: [
        'Buy 1, Get 1 Free = {currency}60 for 2 products',
        'Buy 2, Get 1 Free = {currency}120 for 3 products',
        'Buy 2, Get 2 Free = {currency}120 for 4 products',
        '{currency}30 each',
      ],
      optionsEs: [
        'Compra 1, Lleva 1 Gratis = {currency}60 por 2 productos',
        'Compra 2, Lleva 1 Gratis = {currency}120 por 3 productos',
        'Compra 2, Lleva 2 Gratis = {currency}120 por 4 productos',
        '{currency}30 cada uno',
      ],
      correctIndex: 1,
      explanation: 'The core offer is Buy 2, Get 1 Free = {currency}120 for 3 products. This is the standard combo to present first.',
      explanationEs: 'La oferta principal es Compra 2, Lleva 1 Gratis = {currency}120 por 3 productos. Este es el combo estándar para presentar primero.',
    },
    {
      question: 'What is the Christmas adaptive offer for Scrub & Body Butter?',
      questionEs: '¿Cuál es la oferta adaptativa de Navidad para Exfoliante y Manteca Corporal?',
      options: [
        'Buy 1, Get 1 = {currency}60 for 2',
        'Buy 2, Get 1 = {currency}120 for 3',
        'Buy 2, Get 2 Free = {currency}120 for 4 products',
        '{currency}30 fallback',
      ],
      optionsEs: [
        'Compra 1, Lleva 1 = {currency}60 por 2',
        'Compra 2, Lleva 1 = {currency}120 por 3',
        'Compra 2, Lleva 2 Gratis = {currency}120 por 4 productos',
        '{currency}30 reserva',
      ],
      correctIndex: 2,
      explanation: 'The Christmas adaptive is Buy 2, Get 2 Free = {currency}120 for 4 products. Same {currency}120 spend but they get 4 items instead of 3 — perfect for gifting.',
      explanationEs: 'La oferta adaptativa de Navidad es Compra 2, Lleva 2 Gratis = {currency}120 por 4 productos. El mismo gasto de {currency}120 pero obtienen 4 artículos en lugar de 3 — perfecto para regalar.',
    },
    {
      question: 'A customer only wants to spend a little. What is the slim version offer?',
      questionEs: 'Un cliente solo quiere gastar poco. ¿Cuál es la oferta versión slim?',
      options: [
        'Buy 2, Get 1 = {currency}120',
        'Buy 1, Get 1 = {currency}60 for 2 products',
        '{currency}30 single product',
        '{currency}80 each',
      ],
      optionsEs: [
        'Compra 2, Lleva 1 = {currency}120',
        'Compra 1, Lleva 1 = {currency}60 por 2 productos',
        '{currency}30 producto individual',
        '{currency}80 cada uno',
      ],
      correctIndex: 1,
      explanation: 'The slim version is Buy 1, Get 1 = {currency}60 for 2 products. This is for budget-conscious customers who still want value.',
      explanationEs: 'La versión slim es Compra 1, Lleva 1 = {currency}60 por 2 productos. Esto es para clientes consciente del presupuesto que aún quieren valor.',
    },
    {
      question: 'What is the final fallback price for a single Scrub?',
      questionEs: '¿Cuál es el precio de reserva final para un único Exfoliante?',
      options: ['{currency}120', '{currency}60', '{currency}30', '{currency}80'],
      optionsEs: ['{currency}120', '{currency}60', '{currency}30', '{currency}80'],
      correctIndex: 2,
      explanation: 'The final push is Scrub only at {currency}30. This is the absolute last resort when the customer is walking away after refusing {currency}60/2.',
      explanationEs: 'El empuje final es solo Exfoliante a {currency}30. Este es el último recurso absoluto cuando el cliente se va después de rechazar {currency}60/2.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 4: Nail Kit Offers
// Mix & match ladder (numbers only): anchor 80, base 60, 120/3, 120/4, 60/2, 30 floor
// ═════════════════════════════════════════════════════════════
const nailKitQuiz: GeneralQuiz = {
  id: 'quiz-nail-kit',
  title: 'Nail Kit Offers',
  titleEs: 'Ofertas de Kit de Uñas',
  description: 'Master the French Nail Kit pricing, bundle strategies, and closing techniques.',
  descriptionEs: 'Domina los precios del Kit de Uñas Francesas, estrategias de paquetes y técnicas de cierre.',
  icon: 'Scissors',
  category: 'Product Pricing',
  categoryEs: 'Precios de Productos',
  xpReward: 50,
  questions: [
    {
      question: 'What is the Europe price anchor for the Nail Kit?',
      questionEs: '¿Cuál es el anclaje de precio de Europa para el Kit de Uñas?',
      options: ['{currency}30', '{currency}60', '{currency}80', '{currency}120'],
      optionsEs: ['{currency}30', '{currency}60', '{currency}80', '{currency}120'],
      correctIndex: 2,
      explanation: 'The Nail Kit Europe price is {currency}80 — the same anchor as the Scrub and the Body Butter, because they share one ladder. In a salon, a French manicure costs {currency}25-40 and takes an hour. The Kit gives unlimited at-home manicures for the price of two salon visits.',
      explanationEs: 'El precio europeo del Kit de Uñas es {currency}80 — el mismo ancla que el Exfoliante y el Body Butter, porque comparten una sola escalera. En un salón, una manicura francesa cuesta {currency}25-40 y lleva una hora. El Kit da manicuras ilimitadas en casa por el precio de dos visitas al salón.',
    },
    {
      question: 'What is the {locationName} base price for one Nail Kit?',
      questionEs: '¿Cuál es el precio base de {locationName} para un Kit de Uñas?',
      options: ['{currency}30', '{currency}60', '{currency}80', '{currency}120'],
      optionsEs: ['{currency}30', '{currency}60', '{currency}80', '{currency}120'],
      correctIndex: 1,
      explanation: 'The Nail Kit {locationName} base price is {currency}60 — the price of two salon manicures, for years of them. The value proposition is immediate and obvious.',
      explanationEs: 'El precio base de {locationName} del Kit es {currency}60 — lo que cuestan dos manicuras de salón, pero te dura años. La propuesta de valor es inmediata y obvia.',
    },
    {
      question: 'What is the core Nail Kit combo offer?',
      questionEs: '¿Cuál es la oferta combo principal del Kit de Uñas?',
      options: [
        'Buy 1, Get 1 = {currency}60 for 2 kits',
        'Buy 2, Get 1 Free = {currency}120 for 3 kits',
        'Buy 2, Get 2 = {currency}120 for 4 kits',
        '{currency}30 single kit',
      ],
      optionsEs: [
        'Compra 1, Lleva 1 = {currency}60 por 2 kits',
        'Compra 2, Lleva 1 Gratis = {currency}120 por 3 kits',
        'Compra 2, Lleva 2 = {currency}120 por 4 kits',
        '{currency}30 kit individual',
      ],
      correctIndex: 1,
      explanation: 'The core offer is Buy 2, Get 1 Free = {currency}120 for 3 kits. This is the standard bundle to present.',
      explanationEs: 'La oferta principal es Compra 2, Lleva 1 Gratis = {currency}120 por 3 kits. Este es el paquete estándar para presentar.',
    },
    {
      question: 'What is the Mix & Match offer for Nail Kit?',
      questionEs: '¿Cuál es la oferta Mix & Match para el Kit de Uñas?',
      options: [
        'Nail Kit + second Nail Kit = {currency}60',
        'Nail Kit + Scrub or Body Butter = {currency}60 (Buy 1, Get 1)',
        'Nail Kit + Peeling = {currency}100',
        'Nail Kit + Syringe = {currency}300',
      ],
      optionsEs: [
        'Kit de Uñas + segundo Kit de Uñas = {currency}60',
        'Kit de Uñas + Exfoliante o Manteca Corporal = {currency}60 (Compra 1, Lleva 1)',
        'Kit de Uñas + Peeling = {currency}100',
        'Kit de Uñas + Jeringuilla = {currency}300',
      ],
      correctIndex: 1,
      explanation: 'The Mix & Match is Nail Kit + Scrub or Body Butter = {currency}60 (Buy 1, Get 1). This pairs different product categories at an attractive entry price.',
      explanationEs: 'El Mix & Match es Kit de Uñas + Exfoliante o Manteca Corporal = {currency}60 (Compra 1, Lleva 1). Esto empareja diferentes categorías de productos a un precio de entrada atractivo.',
    },
    {
      question: 'What is the final push (minimum) price for the Nail Kit?',
      questionEs: '¿Cuál es el precio de empuje final (mínimo) para el Kit de Uñas?',
      options: ['{currency}120', '{currency}60', '{currency}30', '{currency}80'],
      optionsEs: ['{currency}120', '{currency}60', '{currency}30', '{currency}80'],
      correctIndex: 2,
      explanation: 'The final push is the whole kit for {currency}30. This is the absolute floor to convert a hesitant buyer who is walking away.',
      explanationEs: 'El empuje final es el kit completo a {currency}30. Este es el suelo absoluto para convertir a un comprador indeciso que se está yendo.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 5: Sales Psychology
// ═════════════════════════════════════════════════════════════
const psychologyQuiz: GeneralQuiz = {
  id: 'quiz-sales-psychology',
  title: 'Sales Psychology',
  titleEs: 'Psicología de Ventas',
  description: 'Master confidence, energy, rejection handling, and the "never ask always lead" mindset.',
  descriptionEs: 'Domina la confianza, la energía, el manejo del rechazo y la mentalidad de "nunca preguntar, siempre guiar".',
  icon: 'Brain',
  category: 'Psychology',
  categoryEs: 'Psicología',
  xpReward: 60,
  questions: [
    {
      question: 'According to Cialdini, what principle is activated when you give a free demo first?',
      questionEs: 'Según Cialdini, ¿qué principio se activa cuando das una demo gratis primero?',
      options: ['Scarcity', 'Reciprocity', 'Social Proof', 'Authority'],
      optionsEs: ['Escasez', 'Reciprocidad', 'Prueba Social', 'Autoridad'],
      correctIndex: 1,
      explanation: 'Reciprocity: when you give something first (a demo, sample, compliment), people feel obliged to give back. That is why the free demo is so powerful.',
      explanationEs: 'Reciprocidad: cuando das algo primero (una demo, una muestra, un cumplido), la gente se siente obligada a devolver el gesto. Por eso la demo gratis es tan poderosa.',
    },
    {
      question: 'What does "never ask, always lead" mean in Zero Lines selling?',
      questionEs: '¿Qué significa "nunca preguntar, siempre guiar" en la venta Zero Lines?',
      options: [
        'Ignore what the customer wants',
        'Never ask permission — guide the customer to the next step with confidence',
        'Push the customer around physically',
        'Always tell the customer what to do',
      ],
      optionsEs: [
        'Ignorar lo que el cliente quiere',
        'Nunca pedir permiso — guiar al cliente al siguiente paso con confianza',
        'Empujar al cliente físicamente',
        'Siempre decirle al cliente qué hacer',
      ],
      correctIndex: 1,
      explanation: '"Never ask, always lead" means you guide the customer through the experience. Instead of "Would you like to try?" say "Let me show you something amazing." Lead with confidence.',
      explanationEs: '"Nunca preguntar, siempre guiar" significa que guías al cliente a través de la experiencia. En lugar de "¿Le gustaría probar?" di "Déjeme mostrarle algo increíble." Guía con confianza.',
    },
    {
      question: 'How should you handle rejection?',
      questionEs: '¿Cómo deberías manejar el rechazo?',
      options: [
        'Take it personally and feel bad',
        'Detach emotionally — it is a numbers game, not a personal judgment',
        'Argue with the customer',
        'Avoid that customer forever',
      ],
      optionsEs: [
        'Tomarlo personalmente y sentirse mal',
        'Desapegarse emocionalmente — es un juego de números, no un juicio personal',
        'Discutir con el cliente',
        'Evitar a ese cliente para siempre',
      ],
      correctIndex: 1,
      explanation: 'Rejection is not personal — it is part of the process. Top sellers detach emotionally. Every "no" brings you closer to a "yes."',
      explanationEs: 'El rechazo no es personal — es parte del proceso. Los mejores vendedores se desapegan emocionalmente. Cada "no" te acerca a un "sí."',
    },
    {
      question: 'Why is your energy level crucial when stopping customers?',
      questionEs: '¿Por qué es crucial tu nivel de energía al parar clientes?',
      options: [
        'It makes you look crazy',
        'Energy is contagious — low energy = ignored; high energy = magnetic',
        'It scares customers away',
        'It does not matter at all',
      ],
      optionsEs: [
        'Te hace parecer loco',
        'La energía es contagiosa — baja energía = ignorado; alta energía = magnético',
        'Ahuyenta a los clientes',
        'No importa en absoluto',
      ],
      correctIndex: 1,
      explanation: 'Your energy sets the tone. Low energy makes you invisible. High, positive energy draws people in. Enthusiasm sells before words do.',
      explanationEs: 'Tu energía marca el tono. La baja energía te hace invisible. La energía alta y positiva atrae a la gente. El entusiasmo vende antes que las palabras.',
    },
    {
      question: 'What is "social proof" in a sales context?',
      questionEs: '¿Qué es la "prueba social" en un contexto de ventas?',
      options: [
        'Showing the customer your social media followers',
        'Using testimonials, sales numbers, and crowd behavior to influence the buying decision',
        'Only selling to people in groups',
        'Posting about your sales on Instagram',
      ],
      optionsEs: [
        'Mostrar al cliente tus seguidores en redes sociales',
        'Usar testimonios, números de ventas y comportamiento de la multitud para influir en la decisión de compra',
        'Solo vender a personas en grupos',
        'Publicar tus ventas en Instagram',
      ],
      correctIndex: 1,
      explanation: 'Social proof is showing that others trust and buy your product: "This is our bestseller," "I just sold three this morning," or customer testimonials.',
      explanationEs: 'La prueba social es mostrar que otros confían y compran tu producto: "Este es nuestro más vendido," "Acabo de vender tres esta mañana," o testimonios de clientes.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 6: Customer Reading
// ═════════════════════════════════════════════════════════════
const customerReadingQuiz: GeneralQuiz = {
  id: 'quiz-customer-reading',
  title: 'Customer Reading',
  titleEs: 'Lectura de Clientes',
  description: 'Learn to read observation signals, assess spending power, and interpret body language.',
  descriptionEs: 'Aprende a leer señales de observación, evaluar poder adquisitivo e interpretar el lenguaje corporal.',
  icon: 'Eye',
  category: 'Connecting',
  categoryEs: 'Conexión',
  xpReward: 50,
  questions: [
    {
      question: 'A customer wears designer clothes and carries a luxury bag. What does this suggest?',
      questionEs: 'Un cliente lleva ropa de diseñador y un bolso de lujo. ¿Qué sugiere esto?',
      options: [
        'They have no money to spend',
        'They are just browsing and will not buy',
        'They have high spending power and expect quality service',
        'They are looking for the cheapest product',
      ],
      optionsEs: [
        'No tienen dinero para gastar',
        'Solo están mirando y no comprarán',
        'Tienen alto poder adquisitivo y esperan servicio de calidad',
        'Buscan el producto más barato',
      ],
      correctIndex: 2,
      explanation: 'Luxury items signal high spending power. These customers expect premium service and are less price-sensitive. Lead with your best products.',
      explanationEs: 'Los artículos de lujo señalan alto poder adquisitivo. Estos clientes esperan servicio premium y son menos sensibles al precio. Empieza con tus mejores productos.',
    },
    {
      question: 'A customer picks up the product and asks "How long does it last?" What signal is this?',
      questionEs: 'Un cliente coge el producto y pregunta "¿Cuánto dura?" ¿Qué señal es esta?',
      options: [
        'They are not interested',
        'They are calculating value and seriously considering the purchase',
        'They think the product is low quality',
        'They are going to ask for a discount',
      ],
      optionsEs: [
        'No están interesados',
        'Están calculando el valor y considerando seriamente la compra',
        'Piensan que el producto es de baja calidad',
        'Van a pedir un descuento',
      ],
      correctIndex: 1,
      explanation: 'Asking about duration/lifespan means they are mentally owning the product and calculating ROI. This is one of the strongest buying signals.',
      explanationEs: 'Preguntar sobre duración/vida útil significa que mentalmente ya son dueños del producto y calculan el retorno. Esta es una de las señales de compra más fuertes.',
    },
    {
      question: 'A couple enters. The woman is interested but keeps looking at the man. What dynamic is happening?',
      questionEs: 'Una pareja entra. La mujer está interesada pero sigue mirando al hombre. ¿Qué dinámica está ocurriendo?',
      options: [
        'The man is making all decisions',
        'She is seeking permission or validation from her partner',
        'She is bored and wants to leave',
        'They are having an argument',
      ],
      optionsEs: [
        'El hombre está tomando todas las decisiones',
        'Ella busca permiso o validación de su pareja',
        'Está aburrida y quiere irse',
        'Están discutiendo',
      ],
      correctIndex: 1,
      explanation: 'When a customer keeps looking at their partner, they are seeking permission. Engage BOTH people — ask the partner for their opinion to bring them into the decision.',
      explanationEs: 'Cuando un cliente sigue mirando a su pareja, busca permiso. Involucra a AMBAS personas — pide la opinión de la pareja para traerlos a la decisión.',
    },
    {
      question: 'What does "open palm" body language communicate during a presentation?',
      questionEs: '¿Qué comunica el lenguaje corporal de "palmas abiertas" durante una presentación?',
      options: [
        'Uncertainty and doubt',
        'Trust, honesty, and openness',
        'Aggressiveness and pressure',
        'Disinterest in the customer',
      ],
      optionsEs: [
        'Incertidumbre y duda',
        'Confianza, honestidad y apertura',
        'Agresividad y presión',
        'Desinterés en el cliente',
      ],
      correctIndex: 1,
      explanation: 'Open palms are a universal trust signal. They show you have nothing to hide and communicate honesty subconsciously to the customer.',
      explanationEs: 'Las palmas abiertas son una señal de confianza universal. Muestran que no tienes nada que ocultar y comunican honestidad subconscientemente al cliente.',
    },
    {
      question: 'A customer touches or holds the product for more than a few seconds. What does this indicate?',
      questionEs: 'Un cliente toca o sostiene el producto durante más de unos segundos. ¿Qué indica esto?',
      options: [
        'They are confused about how to use it',
        'They are imagining owning it — a very strong buying signal',
        'They think it might be broken',
        'They are going to steal it',
      ],
      optionsEs: [
        'Están confundidos sobre cómo usarlo',
        'Se están imaginando siendo dueños de él — una señal de compra muy fuerte',
        'Piensan que podría estar roto',
        'Lo van a robar',
      ],
      correctIndex: 1,
      explanation: 'Touching/holding the product means the customer is imagining ownership. This is called the "endowment effect" — once they hold it, they are more likely to buy it.',
      explanationEs: 'Tocar/sostener el producto significa que el cliente se está imaginando como dueño. Esto se llama "efecto de dotación" — una vez que lo sostienen, es más probable que lo compren.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 7: Stopping Techniques
// ═════════════════════════════════════════════════════════════
const stoppingQuiz: GeneralQuiz = {
  id: 'quiz-stopping',
  title: 'Stopping Techniques',
  titleEs: 'Técnicas de Parada',
  description: 'Master the art of stopping customers — timing, approaches, product hooks, and the 2-metre rule.',
  descriptionEs: 'Domina el arte de parar a los clientes — momento, enfoques, ganchos específicos por producto y la regla de los 2 metros.',
  icon: 'Hand',
  category: 'Stopping',
  categoryEs: 'Parada',
  xpReward: 60,
  questions: [
    {
      question: 'What is the most common reflex response when you ask "Can I help you?"',
      questionEs: '¿Cuál es la respuesta refleja más común cuando preguntas "¿Puedo ayudarle?"',
      options: [
        '"Yes, please show me everything"',
        '"Just looking, thanks"',
        '"How much is this?"',
        '"I will take three"',
      ],
      optionsEs: [
        '"Sí, por favor muéstreme todo"',
        '"Solo miro, gracias"',
        '"¿Cuánto cuesta esto?"',
        '"Llevaré tres"',
      ],
      correctIndex: 1,
      explanation: '"Just looking, thanks" is the automatic defensive response to "Can I help you?" Instead, lead with curiosity or a compliment to bypass this reflex.',
      explanationEs: '"Solo miro, gracias" es la respuesta defensiva automática a "¿Puedo ayudarle?" En su lugar, lidera con curiosidad o un cumplido para evitar este reflejo.',
    },
    {
      question: 'Which is the BEST opening line to stop a customer?',
      questionEs: '¿Cuál de estas es la MEJOR frase de apertura para parar a un cliente?',
      options: [
        '"Do you need any help?"',
        '"Can I show you something amazing? It takes 30 seconds."',
        '"We have a sale today."',
        '"Are you interested in beauty products?"',
      ],
      optionsEs: [
        '"¿Necesita ayuda?"',
        '"¿Puedo mostrarle algo increíble? Toma 30 segundos."',
        '"Tenemos rebajas hoy."',
        '"¿Está interesado en productos de belleza?"',
      ],
      correctIndex: 1,
      explanation: '"Can I show you something amazing? It takes 30 seconds" creates curiosity, sets a low time commitment, and promises value. It is nearly impossible to refuse.',
      explanationEs: '"¿Puedo mostrarle algo increíble? Toma 30 segundos" crea curiosidad, establece un bajo compromiso de tiempo y promete valor. Es casi imposible de rechazar.',
    },
    {
      question: 'What is "the 2-metre rule"?',
      questionEs: '¿Qué es la "regla de los 2 metros"?',
      options: [
        'Stay 2 metres away from all customers',
        'Stop customers within 2 metres of the door before they pass by',
        'Keep 2 metres between you and other salespeople',
        'Products must be placed 2 metres apart',
      ],
      optionsEs: [
        'Mantenerse a 2 metros de todos los clientes',
        'Parar a los clientes dentro de 2 metros de la puerta antes de que pasen de largo',
        'Mantener 2 metros entre tú y otros vendedores',
        'Los productos deben colocarse a 2 metros de distancia',
      ],
      correctIndex: 1,
      explanation: 'The 2-metre rule: intercept customers within 2 metres of the door. Any further and they have already built their "just looking" shield and walked past.',
      explanationEs: 'La regla de los 2 metros: interceptar a los clientes dentro de 2 metros de la puerta. Más allá y ya han construido su escudo de "solo miro" y han pasado de largo.',
    },
    {
      question: 'For the Syringe, what is the best curiosity-based stopping hook?',
      questionEs: 'Para la Jeringuilla, ¿cuál es el mejor gancho de parada basado en la curiosidad?',
      options: [
        '"This is very cheap today"',
        '"Can I show you something? This is our bestselling treatment — it is like Botox in a syringe, but natural and instant"',
        '"Do you want to buy a syringe?"',
        '"Everyone is buying this"',
      ],
      optionsEs: [
        '"Esto está muy barato hoy"',
        '"¿Puedo mostrarle algo? Este es nuestro tratamiento más vendido — es como Botox en jeringuilla, pero natural e instantáneo"',
        '"¿Quiere comprar una jeringuilla?"',
        '"Todo el mundo está comprando esto"',
      ],
      correctIndex: 1,
      explanation: 'The best syringe hook compares it to Botox (instant recognition), promises natural results, and adds "instant" gratification. Curiosity + value in one line.',
      explanationEs: 'El mejor gancho de jeringuilla la compara con Botox (reconocimiento instantáneo), promete resultados naturales y añade gratificación instantánea. Curiosidad + valor en una frase.',
    },
    {
      question: 'A customer says "I am just looking" AFTER you have stopped them. What is your BEST response?',
      questionEs: 'Un cliente dice "Solo miro" DESPUÉS de que ya lo hayas parado. ¿Cuál es tu MEJOR respuesta?',
      options: [
        '"Okay, let me know if you need anything" and walk away',
        '"No problem at all — looking is free. But can I show you something that takes 20 seconds? You do not have to buy anything, I just love the reaction"',
        '"Are you sure? We have great deals today"',
        '"Please, just try it"',
      ],
      optionsEs: [
        '"Vale, avíseme si necesita algo" y vete',
        '"Ningún problema — mirar es gratis. ¿Puedo mostrarle algo que toma 20 segundos? No tiene que comprar nada, me encanta la reacción"',
        '"¿Está seguro? Tenemos grandes ofertas hoy"',
        '"Por favor, solo pruébelo"',
      ],
      correctIndex: 1,
      explanation: 'Validate their "just looking" response (do not fight it), then offer a zero-commitment demo. "You do not have to buy anything" removes pressure while "I love the reaction" creates curiosity.',
      explanationEs: 'Valida su respuesta de "solo miro" (no luches contra ella), luego ofrece una demo sin compromiso. "No tiene que comprar nada" quita presión mientras "me encanta la reacción" crea curiosidad.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 8: The Art of Closing
// ═════════════════════════════════════════════════════════════
const closingQuiz: GeneralQuiz = {
  id: 'quiz-closing',
  title: 'The Art of Closing',
  titleEs: 'El Arte de Cerrar',
  description: 'Master the two-choice framework, voucher close, adaptive pricing, and assumptive techniques.',
  descriptionEs: 'Domina el marco de dos opciones, cierre con vale, precio adaptativo y técnicas asumidas.',
  icon: 'Target',
  category: 'Closing',
  categoryEs: 'Cierre',
  xpReward: 60,
  questions: [
    {
      question: 'What is the Two-Choice Close?',
      questionEs: '¿Qué es el Cierre de Dos Opciones?',
      options: [
        'Asking the customer if they want to buy or not',
        'Presenting two positive options, both of which result in a sale',
        'Giving the customer two different products to choose from',
        'Offering two different payment methods',
      ],
      optionsEs: [
        'Preguntar al cliente si quiere comprar o no',
        'Presentar dos opciones positivas, ambas resultando en una venta',
        'Dar al cliente dos productos diferentes para elegir',
        'Ofrecer dos métodos de pago diferentes',
      ],
      correctIndex: 1,
      explanation: 'The Two-Choice Close gives options like "Would you prefer the single treatment at {currency}300, or the two-syringe pack at {currency}300 with the second one free?" Either way, they buy.',
      explanationEs: 'El Cierre de Dos Opciones da opciones como "¿Prefiere el tratamiento individual a {currency}300, o el pack de dos jeringuillas a {currency}300 con la segunda gratis?" De cualquier manera, compran.',
    },
    {
      question: 'When should you use the voucher close?',
      questionEs: '¿Cuándo debes usar el cierre con vale?',
      options: [
        'As your first offer to every customer',
        'Only as a last resort when the customer is genuinely about to walk away',
        'Only for customers who look poor',
        'At the beginning of every conversation',
      ],
      optionsEs: [
        'Como tu primera oferta para cada cliente',
        'Solo como último recurso cuando el cliente realmente está a punto de irse',
        'Solo para clientes que parecen pobres',
        'Al principio de cada conversación',
      ],
      correctIndex: 1,
      explanation: 'The voucher close is your rescue tool. Use it only after the customer has rejected your standard price, your add-value offer, and your alternative offer.',
      explanationEs: 'El cierre con vale es tu herramienta de rescate. Úsalo solo después de que el cliente haya rechazado tu precio estándar, tu oferta de valor añadido y tu oferta alternativa.',
    },
    {
      question: 'What is the Assumptive Close?',
      questionEs: '¿Qué es el Cierre Asumido?',
      options: [
        'Assuming the customer will say no',
        'Acting as if the sale is already made and moving to the next step (gift bag, packaging)',
        'Assuming the customer has no money',
        'Assuming the customer knows everything about the product',
      ],
      optionsEs: [
        'Asumir que el cliente dirá que no',
        'Actuar como si la venta ya estuviera hecha y pasar al siguiente paso (bolsa de regalo, empaquetado)',
        'Asumir que el cliente no tiene dinero',
        'Asumir que el cliente sabe todo sobre el producto',
      ],
      correctIndex: 1,
      explanation: 'The Assumptive Close: "I will set this aside for you at the counter. Do you want the gift bag with it?" This frames the decision as already made.',
      explanationEs: 'El Cierre Asumido: "Voy a apartar esto para usted en el mostrador. ¿Quiere la bolsa de regalo con él?" Esto enmarca la decisión como ya tomada.',
    },
    {
      question: 'What is "adaptive pricing" in the context of Zero Lines selling?',
      questionEs: '¿Qué es el "precio adaptativo" en el contexto de venta Zero Lines?',
      options: [
        'Changing your prices randomly throughout the day',
        'Reading the customer\'s signals and adjusting your offer to match their budget and interest level',
        'Always giving the lowest price first',
        'Asking the customer what they want to pay',
      ],
      optionsEs: [
        'Cambiar tus precios aleatoriamente durante el día',
        'Leer las señales del cliente y ajustar tu oferta para coincidir con su presupuesto y nivel de interés',
        'Siempre dar el precio más bajo primero',
        'Preguntar al cliente qué quieren pagar',
      ],
      correctIndex: 1,
      explanation: 'Adaptive pricing means reading the customer — their clothes, engagement, reactions — and tailoring your offer. Luxury signals lead to premium offer. Hesitation leads to adding value first, then dropping if needed.',
      explanationEs: 'El precio adaptativo significa leer al cliente — su ropa, compromiso, reacciones — y adaptar tu oferta. Señales de lujo llevan a oferta premium. Dudas llevan a añadir valor primero, luego bajar si es necesario.',
    },
    {
      question: 'A syringe customer hesitates at {currency}300. What is the correct adaptive price step?',
      questionEs: 'Un cliente de jeringuilla duda en {currency}300. ¿Cuál es el paso de precio adaptativo correcto?',
      options: [
        'Immediately drop to {currency}100',
        'Offer Option 1: {currency}210 (30% off) + free gift, or Offer Option 2: {currency}300 + second syringe free',
        'Drop to {currency}50',
        'Tell them the price is non-negotiable',
      ],
      optionsEs: [
        'Bajar inmediatamente a {currency}100',
        'Opción de Oferta 1: {currency}210 (30% descuento) + regalo gratis, u Opción de Oferta 2: {currency}300 + segunda jeringuilla gratis',
        'Bajar a {currency}50',
        'Decirles que el precio no es negociable',
      ],
      correctIndex: 1,
      explanation: 'At {currency}300 hesitation, present both offer options first before any further price drops. Option 1 ({currency}210 + gift) or Option 2 ({currency}300 + 2nd syringe free) both maintain strong value.',
      explanationEs: 'En duda de {currency}300, presenta ambas opciones de oferta primero antes de cualquier bajada adicional. La Opción 1 ({currency}210 + regalo) u Opción 2 ({currency}300 + 2ª jeringuilla gratis) mantienen un valor fuerte.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 9: Objection Handling
// ═════════════════════════════════════════════════════════════
const objectionQuiz: GeneralQuiz = {
  id: 'quiz-objections',
  title: 'Objection Handling',
  titleEs: 'Manejo de Objeciones',
  description: 'Master responses to the most common customer objections.',
  descriptionEs: 'Domina las respuestas a las objeciones más comunes de los clientes.',
  icon: 'MessageCircle',
  category: 'Closing',
  categoryEs: 'Cierre',
  xpReward: 60,
  questions: [
    {
      question: 'A customer says: "It is too expensive." What is your FIRST response?',
      questionEs: 'Un cliente dice: "Es demasiado caro." ¿Cuál es tu PRIMERA respuesta?',
      options: [
        'Immediately lower the price',
        '"I hear you. Let me ask — how much would you expect to pay in a salon for the same result? [Let them answer] Right. And this gives you multiple treatments at home."',
        'Tell them they are wrong',
        'Walk away and find another customer',
      ],
      optionsEs: [
        'Bajar inmediatamente el precio',
        '"Le entiendo. Déjeme preguntarle — ¿cuánto esperaría pagar en un salón por el mismo resultado? [Deja que respondan] Exacto. Y esto le da tratamientos múltiples en casa."',
        'Decirles que están equivocados',
        'Irse y buscar otro cliente',
      ],
      correctIndex: 1,
      explanation: 'Never immediately drop the price. Instead, reframe by comparing to the salon cost, then highlight that this product gives multiple treatments. Value over price.',
      explanationEs: 'Nunca bajes el precio inmediatamente. En su lugar, reformula comparando con el coste del salón, luego destaca que este producto da tratamientos múltiples. Valor sobre precio.',
    },
    {
      question: 'A customer says: "I already have cream at home." What is the BEST response?',
      questionEs: 'Un cliente dice: "Ya tengo crema en casa." ¿Cuál es la MEJOR respuesta?',
      options: [
        '"Okay, no problem"',
        '"Most of our customers do too. But when they try this, they tell me it is completely different. This works from the inside, not just on the surface. Can I show you why in 30 seconds?"',
        '"Your cream is probably bad"',
        '"Throw your cream away and buy this"',
      ],
      optionsEs: [
        '"Vale, ningún problema"',
        '"La mayoría de nuestros clientes también. Pero cuando prueban esto, me dicen que es completamente diferente. Esto trabaja desde dentro, no solo en la superficie. ¿Puedo mostrarle por qué en 30 segundos?"',
        '"Su crema probablemente es mala"',
        '"Tire su crema y compre esto"',
      ],
      correctIndex: 1,
      explanation: 'Validate their current product (do not dismiss it), then offer a quick demo that proves your product works differently. The 30-second demo is your strongest weapon.',
      explanationEs: 'Valida su producto actual (no lo descartes), luego ofrece una demo rápida que pruebe que tu producto funciona diferente. La demo de 30 segundos es tu arma más fuerte.',
    },
    {
      question: 'A customer says: "I need to ask my husband." How do you handle this?',
      questionEs: 'Un cliente dice: "Tengo que preguntarle a mi marido." ¿Cómo manejas esto?',
      options: [
        '"Okay, come back when you have decided"',
        '"Absolutely. If he were here, what would he say? [Pause] Here — take this sample card with the price written down. The voucher is valid for today only."',
        '"You do not need his permission"',
        '"Your husband will not like it"',
      ],
      optionsEs: [
        '"Vale, vuelva cuando haya decidido"',
        '"Por supuesto. Si estuviera aquí, ¿qué diría? [Pausa] Tome — lleve esta tarjeta de muestra con el precio escrito. El vale solo es válido hoy."',
        '"No necesita su permiso"',
        '"A su marido no le gustará"',
      ],
      correctIndex: 1,
      explanation: 'First, try to engage the partner NOW by asking what they would say. If they truly need to ask someone not present, give them a physical card with the price AND add urgency (today only).',
      explanationEs: 'Primero, intenta involucrar a la pareja AHORA preguntando qué dirían. Si realmente necesitan preguntar a alguien que no está, dales una tarjeta física con el precio Y añade urgencia (solo hoy).',
    },
    {
      question: 'A customer says: "I do not have time." What is the best response?',
      questionEs: 'Un cliente dice: "No tengo tiempo." ¿Cuál es la mejor respuesta?',
      options: [
        '"Okay, have a nice day!"',
        '"This takes exactly 60 seconds — I will time it. And if you do not see a difference, I will wish you a great day. Deal?"',
        '"You should make time for beauty"',
        '"It takes 10 minutes"',
      ],
      optionsEs: [
        '"Vale, que tenga un buen día!"',
        '"Esto toma exactamente 60 segundos — lo cronometraré. Y si no ve diferencia, le desearé un buen día. ¿Trato?"',
        '"Debería hacer tiempo para la belleza"',
        '"Toma 10 minutos"',
      ],
      correctIndex: 1,
      explanation: 'The 60-second challenge removes the time objection completely. Adding "I will time it" and "if you do not see a difference" shows confidence and removes risk for them.',
      explanationEs: 'El reto de 60 segundos elimina por completo la objeción de tiempo. Añadir "lo cronometraré" y "si no ve diferencia" muestra confianza y elimina el riesgo para ellos.',
    },
    {
      question: 'A customer says: "I need to think about it." What is the BEST technique?',
      questionEs: 'Un cliente dice: "Necesito pensarlo." ¿Cuál es la MEJOR técnica?',
      options: [
        '"Take all the time you need!"',
        '"Of course. Just so you know, this voucher expires when you leave the store — it is tied to today\'s visit. I can hold it at the counter for 10 minutes while you look around, and the price stays locked."',
        '"Do not think, just buy it!"',
        '"You will regret it if you do not buy now"',
      ],
      optionsEs: [
        '"Tome todo el tiempo que necesite!"',
        '"Por supuesto. Solo para que sepa, este vale expira cuando sale de la tienda — está ligado a la visita de hoy. Puedo reservarlo en el mostrador durante 10 minutos mientras mira alrededor, y el precio se mantiene."',
        '"No piense, solo cómprelo!"',
        '"Se arrepentirá si no compra ahora"',
      ],
      correctIndex: 1,
      explanation: 'Create genuine scarcity (voucher tied to today) while offering a helpful gesture (holding it for 10 minutes). This gives them space without losing the sale.',
      explanationEs: 'Crea escasez genuina (vale ligado a hoy) mientras ofreces un gesto de ayuda (reservarlo por 10 minutos). Esto les da espacio sin perder la venta.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 10: Zero Lines Workflow
// ═════════════════════════════════════════════════════════════
const workflowQuiz: GeneralQuiz = {
  id: 'quiz-workflow',
  title: 'Zero Lines Workflow',
  titleEs: 'Flujo de Trabajo Zero Lines',
  description: 'Master door rules, rotation, demo steps, WhatsApp follow-up, and after-sale care.',
  descriptionEs: 'Domina las reglas de puerta, rotación, pasos de demo, seguimiento por WhatsApp y cuidado post-venta.',
  icon: 'Workflow',
  category: 'Workflow',
  categoryEs: 'Flujo de Trabajo',
  xpReward: 60,
  questions: [
    {
      question: 'What is the Door Rule for customer approach priority?',
      questionEs: '¿Cuál es la Regla de Puerta para la prioridad de acercamiento a clientes?',
      options: [
        'Whoever is closest to the door goes first',
        'Rotate in order — each salesperson takes turns by the door, no skipping',
        'The best seller always gets the first customer',
        'Whoever shouts loudest gets the customer',
      ],
      optionsEs: [
        'Quien esté más cerca de la puerta va primero',
        'Rotar en orden — cada vendedor toma turnos junto a la puerta, sin saltarse',
        'El mejor vendedor siempre consigue el primer cliente',
        'Quien grite más fuerte se lleva al cliente',
      ],
      correctIndex: 1,
      explanation: 'The door rule is strict rotation. Everyone gets equal opportunity. No skipping, no stealing, no "I was here first" arguments. Fair rotation keeps the team strong.',
      explanationEs: 'La regla de puerta es rotación estricta. Todos tienen igual oportunidad. Sin saltarse, sin robar, sin discusiones de "yo estaba aquí primero". La rotación justa mantiene al equipo fuerte.',
    },
    {
      question: 'What is the correct order of the Syringe pitch steps?',
      questionEs: '¿Cuál es el orden correcto de los pasos del pitch de Jeringuilla?',
      options: [
        'Close → Demo → Anchor → Stop',
        'Stop → Anchor → Demo → Close',
        'Demo → Stop → Close → Anchor',
        'Anchor → Close → Demo → Stop',
      ],
      optionsEs: [
        'Cerrar → Demo → Anclar → Parar',
        'Parar → Anclar → Demo → Cerrar',
        'Demo → Parar → Cerrar → Anclar',
        'Anclar → Cerrar → Demo → Parar',
      ],
      correctIndex: 1,
      explanation: 'The correct flow is: STOP the customer → ANCHOR the value with Europe price ({currency}500) → DEMO the product → CLOSE with the appropriate pricing step.',
      explanationEs: 'El flujo correcto es: PARAR al cliente → ANCLAR el valor con el precio de Europa ({currency}500) → DEMOSTRAR el producto → CERRAR con el paso de precio apropiado.',
    },
    {
      question: 'After completing a sale, what should you ALWAYS do?',
      questionEs: 'Después de completar una venta, ¿qué SIEMPRE debes hacer?',
      options: [
        'Immediately go back to the door for the next customer',
        'Thank the customer, give clear usage instructions, and suggest one complementary product',
        'Ask them for a tip',
        'Tell them not to tell anyone about the price',
      ],
      optionsEs: [
        'Volver inmediatamente a la puerta por el siguiente cliente',
        'Agradecer al cliente, dar instrucciones claras de uso y sugerir un producto complementario',
        'Pedirles propina',
        'Decirles que no cuenten a nadie el precio',
      ],
      correctIndex: 1,
      explanation: 'After-sale is crucial: thank them, give clear instructions, and suggest one complementary product (scrub, butter, nail kit). This increases basket size and customer satisfaction.',
      explanationEs: 'La post-venta es crucial: agradecer, dar instrucciones claras y sugerir un producto complementario (exfoliante, manteca, kit de uñas). Esto aumenta el tamaño de la cesta y la satisfacción del cliente.',
    },
    {
      question: 'Why is WhatsApp follow-up important after a sale?',
      questionEs: '¿Por qué es importante el seguimiento por WhatsApp después de una venta?',
      options: [
        'To spam the customer with more offers',
        'To build a relationship, answer questions, and generate referrals and repeat sales',
        'To ask for their personal information',
        'It is not important at all',
      ],
      optionsEs: [
        'Para spamear al cliente con más ofertas',
        'Para construir una relación, responder preguntas y generar referidos y ventas repetidas',
        'Para pedir su información personal',
        'No es importante en absoluto',
      ],
      correctIndex: 1,
      explanation: 'WhatsApp follow-up builds long-term relationships. Answer questions, check on results, and happy customers will refer friends. One sale can become five.',
      explanationEs: 'El seguimiento por WhatsApp construye relaciones a largo plazo. Responde preguntas, pregunta sobre resultados, y los clientes felices referirán amigos. Una venta puede convertirse en cinco.',
    },
    {
      question: 'During a demo, when should you mention the price?',
      questionEs: 'Durante una demo, ¿cuándo debes mencionar el precio?',
      options: [
        'Immediately when you stop the customer',
        'Only after the customer has seen the result and expressed interest',
        'At the very end, after they have already paid',
        'Never — let them guess',
      ],
      optionsEs: [
        'Inmediatamente cuando paras al cliente',
        'Solo después de que el cliente haya visto el resultado y expresado interés',
        'Al final, después de que ya hayan pagado',
        'Nunca — déjalos adivinar',
      ],
      correctIndex: 1,
      explanation: 'Never mention price before the demo. The price only has meaning AFTER they have seen the result. Once they are amazed by the product, the price becomes a small detail.',
      explanationEs: 'Nunca menciones el precio antes de la demo. El precio solo tiene sentido DESPUÉS de que han visto el resultado. Una vez que el producto los ha asombrado, el precio se convierte en un pequeño detalle.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// ALL QUIZZES EXPORT
// ═════════════════════════════════════════════════════════════

export const generalQuizzes: GeneralQuiz[] = [
  syringePricingQuiz,
  peelingPricingQuiz,
  combosQuiz,
  nailKitQuiz,
  psychologyQuiz,
  customerReadingQuiz,
  stoppingQuiz,
  closingQuiz,
  objectionQuiz,
  workflowQuiz,
];

/** Get a quiz by its unique ID */
export function getGeneralQuizById(id: string): GeneralQuiz | undefined {
  return generalQuizzes.find((q) => q.id === id);
}

/** Get all quizzes by category */
export function getQuizzesByCategory(category: string): GeneralQuiz[] {
  return generalQuizzes.filter((q) => q.category === category);
}

/** Get total question count across all quizzes */
export function getTotalQuestionCount(): number {
  return generalQuizzes.reduce((sum, q) => sum + q.questions.length, 0);
}

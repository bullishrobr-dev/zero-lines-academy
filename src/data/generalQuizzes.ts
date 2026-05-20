// ─────────────────────────────────────────────────────────────
// Zero Lines Academy — General Quizzes
// 10 standalone quizzes with 5 questions each (50 total)
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
// ═════════════════════════════════════════════════════════════
const syringePricingQuiz: GeneralQuiz = {
  id: 'quiz-syringe-pricing',
  title: 'Syringe Pricing Master',
  titleEs: 'Maestro de Precios de Jeringuilla',
  description: 'Master the complete syringe price ladder from the Europe anchor down to the voucher close.',
  descriptionEs: 'Domina la escalera completa de precios de la jeringuilla desde el anclaje europeo hasta el cierre con vale.',
  icon: 'Syringe',
  category: 'Product Pricing',
  categoryEs: 'Precios de Productos',
  xpReward: 50,
  questions: [
    {
      question: 'What is the FIRST price you should mention to anchor the syringe value?',
      questionEs: 'Cuál es el PRIMER precio que debes mencionar para anclar el valor de la jeringuilla?',
      options: [
        '69 euros — the Andorra base price',
        '350-500 euros — the Europe price range',
        '39 euros — the voucher close price',
        '99 euros — the two-for-one offer',
      ],
      optionsEs: [
        '69 euros — el precio base de Andorra',
        '350-500 euros — el rango de precios de Europa',
        '39 euros — el precio de cierre con vale',
        '99 euros — la oferta de dos por uno',
      ],
      correctIndex: 1,
      explanation: 'Always start with the Europe price anchor (350-500 euros) to establish high perceived value before revealing the Andorra price.',
      explanationEs: 'Siempre comienza con el anclaje de precio de Europa (350-500 euros) para establecer un valor percibido alto antes de revelar el precio de Andorra.',
    },
    {
      question: 'After anchoring with the Europe price, what is the Andorra base price for a single syringe?',
      questionEs: 'Después de anclar con el precio de Europa, cuál es el precio base de Andorra para una jeringuilla individual?',
      options: ['49 euros', '69 euros', '99 euros', '39 euros'],
      optionsEs: ['49 euros', '69 euros', '99 euros', '39 euros'],
      correctIndex: 1,
      explanation: 'The Andorra base price is 69 euros. This should feel like a great deal compared to the 350-500 euro Europe anchor.',
      explanationEs: 'El precio base de Andorra es 69 euros. Debería parecer una ganga comparado con el anclaje de 350-500 euros de Europa.',
    },
    {
      question: 'A customer loves the demo but says 69 euros is too much. What is your NEXT price step?',
      questionEs: 'A un cliente le encanta la demo pero dice que 69 euros es demasiado. Cuál es tu SIGUIENTE paso de precio?',
      options: [
        'Immediately drop to 39 euros',
        'Offer two syringes for 99 euros',
        'Add a free beauty gift worth 15 euros with the 69 euro purchase',
        'Walk away and find another customer',
      ],
      optionsEs: [
        'Bajar inmediatamente a 39 euros',
        'Ofrecer dos jeringuillas por 99 euros',
        'Añadir un regalo de belleza gratis valorado en 15 euros con la compra de 69 euros',
        'Irse y buscar otro cliente',
      ],
      correctIndex: 2,
      explanation: 'Before dropping the price, add value first. The 15-euro beauty gift maintains the 69-euro price while increasing perceived value.',
      explanationEs: 'Antes de bajar el precio, añade valor primero. El regalo de 15 euros de belleza mantiene el precio de 69 euros mientras aumenta el valor percibido.',
    },
    {
      question: 'The customer still hesitates at 69 euros with the gift. What is your alternative offer?',
      questionEs: 'El cliente sigue dudando en 69 euros con el regalo. Cuál es tu oferta alternativa?',
      options: [
        'One syringe for 49 euros',
        'Two syringes for 99 euros — nearly 30% off the second one',
        'Three syringes for 129 euros',
        'Ask them what price they would pay',
      ],
      optionsEs: [
        'Una jeringuilla por 49 euros',
        'Dos jeringuillas por 99 euros — casi un 30% de descuento en la segunda',
        'Tres jeringuillas por 129 euros',
        'Preguntarles qué precio pagarían',
      ],
      correctIndex: 1,
      explanation: 'The two-for-99-euro offer reframes the purchase: they get MORE value (two syringes) at a per-unit price that feels like a smart deal.',
      explanationEs: 'La oferta de dos por 99 euros reformula la compra: obtienen MÁS valor (dos jeringuillas) a un precio por unidad que parece una ganga inteligente.',
    },
    {
      question: 'As a last resort, what is the MINIMUM price you can offer with a voucher close?',
      questionEs: 'Como último recurso, cuál es el precio MÍNIMO que puedes ofrecer con un cierre de vale?',
      options: ['29 euros', '39 euros', '49 euros', '59 euros'],
      optionsEs: ['29 euros', '39 euros', '49 euros', '59 euros'],
      correctIndex: 1,
      explanation: 'The voucher close price is 39 euros. This is your floor — only use it when all other options have been exhausted and the customer is still interested.',
      explanationEs: 'El precio de cierre con vale es 39 euros. Este es tu suelo — úsalo solo cuando todas las demás opciones se hayan agotado y el cliente siga interesado.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 2: Peeling Pricing
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
      question: 'What is the Europe price anchor range for a professional glycolic peeling session?',
      questionEs: 'Cuál es el rango de anclaje de precio de Europa para una sesión de peeling glucólico profesional?',
      options: ['80-120 euros', '150-250 euros', '49-69 euros', '350-500 euros'],
      optionsEs: ['80-120 euros', '150-250 euros', '49-69 euros', '350-500 euros'],
      correctIndex: 1,
      explanation: 'The Europe price anchor for a professional peeling is 150-250 euros per session. Use this to establish the value before revealing the Andorra price.',
      explanationEs: 'El anclaje de precio de Europa para un peeling profesional es de 150-250 euros por sesión. Úsalo para establecer el valor antes de revelar el precio de Andorra.',
    },
    {
      question: 'What is the Andorra base price for a single professional-grade peeling?',
      questionEs: 'Cuál es el precio base de Andorra para un peeling profesional individual?',
      options: ['29 euros', '39 euros', '49 euros', '69 euros'],
      optionsEs: ['29 euros', '39 euros', '49 euros', '69 euros'],
      correctIndex: 2,
      explanation: 'The Andorra base price for a peeling is 49 euros — a fraction of the 150-250 euro European cost.',
      explanationEs: 'El precio base de Andorra para un peeling es 49 euros — una fracción del coste europeo de 150-250 euros.',
    },
    {
      question: 'When upselling the peeling, what sample kit do you include to add value at the 49-euro price?',
      questionEs: 'Al hacer upsell del peeling, qué kit de muestras incluyes para añadir valor al precio de 49 euros?',
      options: [
        'A nail care sample kit',
        'A post-peeling care sample kit',
        'A body scrub sample',
        'No sample — you drop the price instead',
      ],
      optionsEs: [
        'Un kit de muestras de cuidado de uñas',
        'Un kit de muestras de cuidado post-peeling',
        'Una muestra de exfoliante corporal',
        'Ninguna muestra — bajas el precio en su lugar',
      ],
      correctIndex: 1,
      explanation: 'Offer a post-peeling care sample kit at 49 euros. This shows the customer how to maintain results at home and adds perceived value without dropping price.',
      explanationEs: 'Ofrece un kit de muestras de cuidado post-peeling a 49 euros. Esto muestra al cliente cómo mantener los resultados en casa y añade valor percibido sin bajar el precio.',
    },
    {
      question: 'What is the three-session prepaid offer for the peeling?',
      questionEs: 'Cuál es la oferta de tres sesiones prepagadas para el peeling?',
      options: [
        '3 sessions for 129 euros',
        '3 sessions for 99 euros (33 each)',
        '3 sessions for 149 euros',
        'There is no multi-session offer',
      ],
      optionsEs: [
        '3 sesiones por 129 euros',
        '3 sesiones por 99 euros (33 cada una)',
        '3 sesiones por 149 euros',
        'No hay oferta de sesiones múltiples',
      ],
      correctIndex: 1,
      explanation: 'The three-session prepaid offer is 99 euros (33 per session). This locks in commitment and gives the customer a transformation narrative.',
      explanationEs: 'La oferta de tres sesiones prepagadas es 99 euros (33 por sesión). Esto asegura compromiso y da al cliente una narrativa de transformación.',
    },
    {
      question: 'What is the voucher close (minimum) price for the first peeling?',
      questionEs: 'Cuál es el precio de cierre con vale (mínimo) para el primer peeling?',
      options: ['19 euros', '29 euros', '39 euros', '49 euros'],
      optionsEs: ['19 euros', '29 euros', '39 euros', '49 euros'],
      correctIndex: 1,
      explanation: 'The voucher close price for a peeling is 29 euros. This is your last resort to convert a hesitant customer who needs the lowest possible entry point.',
      explanationEs: 'El precio de cierre con vale para un peeling es 29 euros. Este es tu último recurso para convertir a un cliente indeciso que necesita el punto de entrada más bajo posible.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 3: Scrub & Butter Combos
// ═════════════════════════════════════════════════════════════
const combosQuiz: GeneralQuiz = {
  id: 'quiz-scrub-combos',
  title: 'Scrub & Butter Combos',
  titleEs: 'Combos de Exfoliante y Manteca',
  description: 'Master every combo offer — from Buy 2 Get 1 to the 30-euro fallback strategy.',
  descriptionEs: 'Domina cada oferta combo — desde Compra 2 Lleva 1 hasta la estrategia de reserva de 30 euros.',
  icon: 'Sparkles',
  category: 'Product Combos',
  categoryEs: 'Combos de Productos',
  xpReward: 50,
  questions: [
    {
      question: 'A customer buys two body scrubs at 25 euros each. What combo do you offer next?',
      questionEs: 'Un cliente compra dos exfoliantes corporales a 25 euros cada uno. Qué combo ofreces a continuación?',
      options: [
        'Give them a third scrub free (Buy 2 Get 1)',
        'Offer 20% off the total',
        'Suggest a nail kit for 10 euros more',
        'Offer a free bag',
      ],
      optionsEs: [
        'Darle un tercer exfoliante gratis (Compra 2 Lleva 1)',
        'Ofrecer un 20% de descuento en el total',
        'Sugerir un kit de uñas por 10 euros más',
        'Ofrecer una bolsa gratis',
      ],
      correctIndex: 0,
      explanation: 'Buy 2 Get 1 Free is the core scrub combo. The customer pays 50 euros for three scrubs (16.67 each), feeling like they got a deal while your average sale increases.',
      explanationEs: 'Compra 2 Lleva 1 Gratis es el combo principal de exfoliante. El cliente paga 50 euros por tres exfoliantes (16.67 cada uno), sintiendo que consiguió una ganga mientras tu venta media aumenta.',
    },
    {
      question: 'A customer is only buying ONE scrub at 25 euros. What is your upsell approach?',
      questionEs: 'Un cliente solo compra UN exfoliante a 25 euros. Cuál es tu enfoque de upsell?',
      options: [
        'Immediately offer the Buy 2 Get 1 deal',
        'Suggest adding a body butter for 15 euros (total 40 euros) with a small gift',
        'Drop the scrub price to 20 euros',
        'Recommend the syringe instead',
      ],
      optionsEs: [
        'Ofrecer inmediatamente la oferta Compra 2 Lleva 1',
        'Sugerir añadir una manteca corporal por 15 euros (total 40 euros) con un regalito',
        'Bajar el precio del exfoliante a 20 euros',
        'Recomendar la jeringuilla en su lugar',
      ],
      correctIndex: 1,
      explanation: 'With a single scrub buyer, upsell with the body butter add-on (15 euros) to reach 40 euros total. This keeps them in the scrub ecosystem while maximizing basket size.',
      explanationEs: 'Con un comprador de un solo exfoliante, haz upsell con la manteca corporal (15 euros) para alcanzar 40 euros en total. Esto los mantiene en el ecosistema de exfoliantes mientras maximiza el tamaño de la cesta.',
    },
    {
      question: 'When should you use the 30-euro fallback price?',
      questionEs: 'Cuándo debes usar el precio de reserva de 30 euros?',
      options: [
        'As the first price you mention',
        'Only when the customer is walking away after refusing higher prices',
        'For every customer to make the sale faster',
        'Only for VIP customers',
      ],
      optionsEs: [
        'Como el primer precio que mencionas',
        'Solo cuando el cliente se va después de rechazar precios más altos',
        'Para cada cliente para hacer la venta más rápido',
        'Solo para clientes VIP',
      ],
      correctIndex: 1,
      explanation: 'The 30-euro fallback is your rescue price. Only use it when the customer is genuinely leaving after refusing the standard 25-euro price. It is your last chance to convert.',
      explanationEs: 'El precio de reserva de 30 euros es tu precio de rescate. Úsalo solo cuando el cliente se esté yendo realmente después de rechazar el precio estándar de 25 euros. Es tu última oportunidad de convertir.',
    },
    {
      question: 'What is the "bundle close" technique?',
      questionEs: 'Qué es la técnica de cierre de "paquete"?',
      options: [
        'Offering a single product at the lowest price',
        'Grouping multiple items together with perceived savings to increase basket size',
        'Giving everything away for free with a purchase',
        'Only selling to groups of people',
      ],
      optionsEs: [
        'Ofrecer un producto único al precio más bajo',
        'Agrupar varios artículos con ahorro percibido para aumentar el tamaño de la cesta',
        'Regalar todo gratis con una compra',
        'Solo vender a grupos de personas',
      ],
      correctIndex: 1,
      explanation: 'The bundle close groups related items (scrub + butter + glove) with perceived savings. It increases average order value while the customer feels they got a deal.',
      explanationEs: 'El cierre de paquete agrupa artículos relacionados (exfoliante + manteca + guante) con ahorro percibido. Aumenta el valor medio del pedido mientras el cliente siente que consiguió una ganga.',
    },
    {
      question: 'A customer says "I only came in for one thing." What is your BEST response?',
      questionEs: 'Un cliente dice "Solo entré por una cosa." Cuál es tu MEJOR respuesta?',
      options: [
        'Okay, here is your one thing',
        'Most people who come in for one thing leave with two — because the second one is basically half price',
        'You should buy more things',
        'That is fine, but our minimum purchase is 30 euros',
      ],
      optionsEs: [
        'Vale, aquí está tu cosa',
        'La mayoría de la gente que entra por una cosa se va con dos — porque la segunda básicamente está a mitad de precio',
        'Deberías comprar más cosas',
        'Está bien, pero nuestra compra mínima es 30 euros',
      ],
      correctIndex: 1,
      explanation: 'Use social proof ("most people") plus a clear value proposition ("second one is basically half price") to make the bundle feel natural and smart, not pushy.',
      explanationEs: 'Usa prueba social ("la mayoría de la gente") más una propuesta de valor clara ("la segunda básicamente está a mitad de precio") para que el paquete se sienta natural e inteligente, no agresivo.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 4: Nail Kit Offers
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
      question: 'What is the Europe price anchor for a salon French manicure?',
      questionEs: 'Cuál es el anclaje de precio de Europa para una manicura francesa de salón?',
      options: ['15-25 euros', '29-39 euros', '60-90 euros', '100-150 euros'],
      optionsEs: ['15-25 euros', '29-39 euros', '60-90 euros', '100-150 euros'],
      correctIndex: 2,
      explanation: 'A salon French manicure costs 60-90 euros in Europe and takes an hour. The Nail Kit gives unlimited at-home manicures for a fraction of that.',
      explanationEs: 'Una manicura francesa de salón cuesta 60-90 euros en Europa y toma una hora. El Kit da manicuras ilimitadas en casa por una fracción de eso.',
    },
    {
      question: 'What is the Andorra base price for the French Nail Kit?',
      questionEs: 'Cuál es el precio base de Andorra para el Kit de Uñas Francesas?',
      options: ['19 euros', '29 euros', '39 euros', '49 euros'],
      optionsEs: ['19 euros', '29 euros', '39 euros', '49 euros'],
      correctIndex: 1,
      explanation: 'The Nail Kit base price is 29 euros — less than one salon visit. The value proposition is immediate and obvious.',
      explanationEs: 'El precio base del Kit es 29 euros — menos de una visita al salón. La propuesta de valor es inmediata y obvia.',
    },
    {
      question: 'When a customer buys the Nail Kit at 29 euros, what free bonus do you add to increase value?',
      questionEs: 'Cuando un cliente compra el Kit de Uñas a 29 euros, qué regalo gratis añades para aumentar el valor?',
      options: [
        'A free syringe sample',
        'A professional glass nail file',
        'A free body scrub',
        'A 10-euro discount voucher',
      ],
      optionsEs: [
        'Una muestra gratis de jeringuilla',
        'Una lima de uñas de cristal profesional',
        'Un exfoliante corporal gratis',
        'Un vale de descuento de 10 euros',
      ],
      correctIndex: 1,
      explanation: 'Add a professional glass nail file as a free bonus with the 29-euro kit. It adds perceived value and complements the kit perfectly.',
      explanationEs: 'Añade una lima de uñas de cristal profesional como regalo gratis con el kit de 29 euros. Añade valor percibido y complementa perfectamente al kit.',
    },
    {
      question: 'What is the upsell bundle for the Nail Kit + Long-Wear Polish Set?',
      questionEs: 'Cuál es el paquete de upsell para el Kit de Uñas + Set de Esmalte de Larga Duración?',
      options: [
        '29 euros — same as the kit alone',
        '35 euros',
        '39 euros — everything they need',
        '49 euros',
      ],
      optionsEs: [
        '29 euros — igual que el kit solo',
        '35 euros',
        '39 euros — todo lo que necesitan',
        '49 euros',
      ],
      correctIndex: 2,
      explanation: 'The Kit + Polish Set bundle is 39 euros. This creates a complete at-home nail salon experience and increases your average sale by 10 euros.',
      explanationEs: 'El paquete de Kit + Set de Esmalte es 39 euros. Esto crea una experiencia completa de salón de uñas en casa y aumenta tu venta media en 10 euros.',
    },
    {
      question: 'What is the voucher close (minimum) price for the Nail Kit?',
      questionEs: 'Cuál es el precio de cierre con vale (mínimo) para el Kit de Uñas?',
      options: ['9 euros', '15 euros', '19 euros', '25 euros'],
      optionsEs: ['9 euros', '15 euros', '19 euros', '25 euros'],
      correctIndex: 2,
      explanation: 'The voucher close for the Nail Kit is 19 euros — "That is less than one salon visit." This is your absolute floor to convert a hesitant buyer.',
      explanationEs: 'El cierre con vale para el Kit de Uñas es 19 euros — "Eso es menos de una visita al salón." Este es tu suelo absoluto para convertir a un comprador indeciso.',
    },
  ],
};

// ═════════════════════════════════════════════════════════════
// QUIZ 5: Sales Psychology 101
// ═════════════════════════════════════════════════════════════
const psychologyQuiz: GeneralQuiz = {
  id: 'quiz-sales-psychology',
  title: 'Sales Psychology 101',
  titleEs: 'Psicología de Ventas 101',
  description: 'Master confidence, energy, rejection handling, and the mindset of top sellers.',
  descriptionEs: 'Domina la confianza, la energía, el manejo del rechazo y la mentalidad de los mejores vendedores.',
  icon: 'Brain',
  category: 'Psychology',
  categoryEs: 'Psicología',
  xpReward: 60,
  questions: [
    {
      question: 'According to Cialdini, what principle is activated when you give a free sample or demo first?',
      questionEs: 'Según Cialdini, qué principio se activa cuando das una muestra o demo gratis primero?',
      options: ['Scarcity', 'Reciprocity', 'Social Proof', 'Authority'],
      optionsEs: ['Escasez', 'Reciprocidad', 'Prueba Social', 'Autoridad'],
      correctIndex: 1,
      explanation: 'Reciprocity: when you give something first (a demo, sample, compliment), people feel obliged to give back. That is why the free demo is so powerful.',
      explanationEs: 'Reciprocidad: cuando das algo primero (una demo, una muestra, un cumplido), la gente se siente obligada a devolver el gesto. Por eso la demo gratis es tan poderosa.',
    },
    {
      question: 'What is the "3-Second Rule" in stopping?',
      questionEs: 'Qué es la "Regla de los 3 Segundos" al parar a un cliente?',
      options: [
        'Wait 3 seconds after the customer enters before approaching',
        'Approach the customer within 3 seconds of them entering your zone — before they form a "just looking" defense',
        'Count to 3 before saying anything',
        'Give up if they do not respond in 3 seconds',
      ],
      optionsEs: [
        'Esperar 3 segundos después de que el cliente entra antes de acercarte',
        'Acercarte al cliente en 3 segundos de entrar en tu zona — antes de que formen una defensa de "solo miro"',
        'Contar hasta 3 antes de decir nada',
        'Rendirse si no responden en 3 segundos',
      ],
      correctIndex: 1,
      explanation: 'The 3-Second Rule means approaching within 3 seconds. Any longer and the customer builds a mental shield ("just looking"). Strike while they are open.',
      explanationEs: 'La Regla de los 3 Segundos significa acercarte en menos de 3 segundos. Cualquier demora más larga y el cliente construye un escudo mental ("solo miro"). Ataca mientras están receptivos.',
    },
    {
      question: 'Which phrase should you NEVER use when a customer gives an objection?',
      questionEs: 'Qué frase NUNCA debes usar cuando un cliente pone una objeción?',
      options: [
        '"I completely understand..."',
        '"No problem / Sure"',
        '"Let me show you something..."',
        '"Most people feel the same way at first..."',
      ],
      optionsEs: [
        '"Lo entiendo perfectamente..."',
        '"No hay problema / Claro"',
        '"Déjame mostrarte algo..."',
        '"La mayoría de la gente se siente igual al principio..."',
      ],
      correctIndex: 1,
      explanation: '"No problem" and "Sure" are minimizing language. They sound passive and dismissive. Instead, validate their concern and redirect with value.',
      explanationEs: '"No hay problema" y "Claro" son lenguaje minimizador. Suenan pasivos y desdeñosos. En su lugar, valida su preocupación y redirige con valor.',
    },
    {
      question: 'What is "social proof" in a sales context?',
      questionEs: 'Qué es la "prueba social" en un contexto de ventas?',
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
    {
      question: 'What does "scarcity" mean in closing?',
      questionEs: 'Qué significa "escasez" en el cierre?',
      options: [
        'Making the customer feel there is not enough product for everyone',
        'Creating genuine urgency tied to time, availability, or exclusivity',
        'Hiding the product from the customer',
        'Telling the customer we are running out of stock permanently',
      ],
      optionsEs: [
        'Hacer sentir al cliente que no hay suficiente producto para todos',
        'Crear urgencia genuina ligada al tiempo, disponibilidad o exclusividad',
        'Ocultarle el producto al cliente',
        'Decirle al cliente que nos estamos quedando sin stock permanentemente',
      ],
      correctIndex: 1,
      explanation: 'Scarcity creates urgency through genuine limitations: "This voucher is only valid today," "This price ends when you leave the store." It must be believable.',
      explanationEs: 'La escasez crea urgencia a través de limitaciones genuínas: "Este vale solo es válido hoy," "Este precio termina cuando sales de la tienda." Debe ser creíble.',
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
      question: 'A customer walks in wearing designer clothes, sunglasses, and carrying a luxury bag. What does this suggest?',
      questionEs: 'Un cliente entra vestido con ropa de diseñador, gafas de sol y llevando un bolso de lujo. Qué sugiere esto?',
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
      question: 'A customer picks up the product, examines it closely, and asks "How long does it last?" What buying signal does this show?',
      questionEs: 'Un cliente coge el producto, lo examina de cerca y pregunta "Cuánto dura?" Qué señal de compra muestra esto?',
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
      questionEs: 'Una pareja entra. La mujer está interesada pero sigue mirando al hombre. Qué dinámica está ocurriendo?',
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
      question: 'What does "open palm" body language communicate during a product presentation?',
      questionEs: 'Qué comunica el lenguaje corporal de "palmas abiertas" durante una presentación de producto?',
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
      questionEs: 'Un cliente toca o sostiene el producto durante más de unos segundos. Qué indica esto?',
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
  description: 'Master the art of stopping customers — timing, approaches, and product-specific hooks.',
  descriptionEs: 'Domina el arte de parar a los clientes — momento, enfoques y ganchos específicos por producto.',
  icon: 'Hand',
  category: 'Stopping',
  categoryEs: 'Parada',
  xpReward: 60,
  questions: [
    {
      question: 'What is the most common reflex response when you ask a customer "Can I help you?"',
      questionEs: 'Cuál es la respuesta refleja más común cuando preguntas a un cliente "Puedo ayudarle?"',
      options: [
        '"Yes, please show me everything"',
        '"Just looking, thanks"',
        '"How much is this?"',
        '"I will take three"',
      ],
      optionsEs: [
        '"Sí, por favor muéstreme todo"',
        '"Solo miro, gracias"',
        '"Cuánto cuesta esto?"',
        '"Llevaré tres"',
      ],
      correctIndex: 1,
      explanation: '"Just looking, thanks" is the automatic defensive response to "Can I help you?" Instead, lead with curiosity or a compliment to bypass this reflex.',
      explanationEs: '"Solo miro, gracias" es la respuesta defensiva automática a "Puedo ayudarle?" En su lugar, lidera con curiosidad o un cumplido para evitar este reflejo.',
    },
    {
      question: 'Which of these is the BEST opening line to stop a customer?',
      questionEs: 'Cuál de estas es la MEJOR frase de apertura para parar a un cliente?',
      options: [
        '"Do you need any help?"',
        '"Can I show you something amazing? It takes 30 seconds."',
        '"We have a sale today."',
        '"Are you interested in beauty products?"',
      ],
      optionsEs: [
        '"Necesita ayuda?"',
        '"Puedo mostrarle algo increíble? Toma 30 segundos."',
        '"Tenemos rebajas hoy."',
        '"Está interesado en productos de belleza?"',
      ],
      correctIndex: 1,
      explanation: '"Can I show you something amazing? It takes 30 seconds" creates curiosity, sets a low time commitment, and promises value. It is nearly impossible to refuse.',
      explanationEs: '"Puedo mostrarle algo increíble? Toma 30 segundos" crea curiosidad, establece un bajo compromiso de tiempo y promete valor. Es casi imposible de rechazar.',
    },
    {
      question: 'For the Syringe product, what is the best curiosity-based stopping hook?',
      questionEs: 'Para el producto Jeringuilla, cuál es el mejor gancho de parada basado en la curiosidad?',
      options: [
        '"This is very cheap today"',
        '"Can I show you something? This is our bestselling treatment — it is like Botox in a syringe, but natural and instant"',
        '"Do you want to buy a syringe?"',
        '"Everyone is buying this"',
      ],
      optionsEs: [
        '"Esto está muy barato hoy"',
        '"Puedo mostrarle algo? Este es nuestro tratamiento más vendido — es como Botox en jeringuilla, pero natural e instantáneo"',
        '"Quiere comprar una jeringuilla?"',
        '"Todo el mundo está comprando esto"',
      ],
      correctIndex: 1,
      explanation: 'The best syringe hook compares it to Botox (instant recognition), promises natural results, and adds "instant" gratification. Curiosity + value in one line.',
      explanationEs: 'El mejor gancho de jeringuilla la compara con Botox (reconocimiento instantáneo), promete resultados naturales y añade gratificación instantánea. Curiosidad + valor en una frase.',
    },
    {
      question: 'When should you approach a customer who just entered the store?',
      questionEs: 'Cuándo debes acercarte a un cliente que acaba de entrar en la tienda?',
      options: [
        'Immediately before they can say "just looking"',
        'Wait until they have browsed for at least 5 minutes',
        'Only when they make eye contact with you',
        'After they pick up a product',
      ],
      optionsEs: [
        'Inmediatamente antes de que puedan decir "solo miro"',
        'Esperar hasta que hayan mirado durante al menos 5 minutos',
        'Solo cuando hagan contacto visual contigo',
        'Después de que cojan un producto',
      ],
      correctIndex: 0,
      explanation: 'The 3-Second Rule: approach within 3 seconds of them entering your zone. Before they mentally build a "just looking" defense. Strike while they are open.',
      explanationEs: 'La Regla de los 3 Segundos: acércate en 3 segundos de que entren en tu zona. Antes de que construyan mentalmente una defensa de "solo miro". Ataca mientras están receptivos.',
    },
    {
      question: 'A customer says "I am just looking" AFTER you have already stopped them. What is your BEST response?',
      questionEs: 'Un cliente dice "Solo miro" DESPUÉS de que ya lo hayas parado. Cuál es tu MEJOR respuesta?',
      options: [
        '"Okay, let me know if you need anything" and walk away',
        '"No problem at all — looking is free. But can I show you something that takes 20 seconds? You do not have to buy anything, I just love the reaction"',
        '"Are you sure? We have great deals today"',
        '"Please, just try it"',
      ],
      optionsEs: [
        '"Vale, avíseme si necesita algo" y vete',
        '"Ningún problema — mirar es gratis. Puedo mostrarle algo que toma 20 segundos? No tiene que comprar nada, me encanta la reacción"',
        '"Está seguro? Tenemos grandes ofertas hoy"',
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
      questionEs: 'Qué es el Cierre de Dos Opciones?',
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
      explanation: 'The Two-Choice Close gives options like "Would you prefer the single treatment at 69 euros, or the double pack at 99 euros for the best value?" Either way, they buy.',
      explanationEs: 'El Cierre de Dos Opciones da opciones como "Prefiere el tratamiento individual a 69 euros, o el pack doble a 99 euros para el mejor valor?" De cualquier manera, compran.',
    },
    {
      question: 'When should you use the voucher close?',
      questionEs: 'Cuándo debes usar el cierre con vale?',
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
      explanation: 'The voucher close is your rescue tool. Use it only after the customer has rejected your standard price, your add-value offer, and your two-for-one alternative.',
      explanationEs: 'El cierre con vale es tu herramienta de rescate. Úsalo solo después de que el cliente haya rechazado tu precio estándar, tu oferta de valor añadido y tu alternativa de dos por uno.',
    },
    {
      question: 'What is the Assumptive Close?',
      questionEs: 'Qué es el Cierre Asumido?',
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
      explanationEs: 'El Cierre Asumido: "Voy a apartar esto para usted en el mostrador. Quiere la bolsa de regalo con él?" Esto enmarca la decisión como ya tomada.',
    },
    {
      question: 'What is "adaptive pricing" in the context of Zero Lines selling?',
      questionEs: 'Qué es el "precio adaptativo" en el contexto de venta Zero Lines?',
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
      question: 'Which phrase is an example of urgency language used in closing?',
      questionEs: 'Qué frase es un ejemplo de lenguaje de urgencia usado en el cierre?',
      options: [
        '"Take your time, no rush"',
        '"This voucher price is only valid today — I do not want you to miss it"',
        '"Come back whenever you want"',
        '"Let me know next week"',
      ],
      optionsEs: [
        '"Tómese su tiempo, no hay prisa"',
        '"Este precio de vale solo es válido hoy — no quiero que se lo pierda"',
        '"Vuelva cuando quiera"',
        '"Avíseme la semana que viene"',
      ],
      correctIndex: 1,
      explanation: '"Only valid today" creates genuine scarcity and urgency. It gives the customer a reason to decide NOW rather than walking away and forgetting about it.',
      explanationEs: '"Solo válido hoy" crea escasez y urgencia genuinas. Da al cliente una razón para decidir AHORA en lugar de irse y olvidarse de ello.',
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
      questionEs: 'Un cliente dice: "Es demasiado caro." Cuál es tu PRIMERA respuesta?',
      options: [
        'Immediately lower the price',
        '"I hear you. Let me ask — how much would you expect to pay in a salon for the same result? [Let them answer] Right. And this gives you multiple treatments."',
        'Tell them they are wrong',
        'Walk away and find another customer',
      ],
      optionsEs: [
        'Bajar inmediatamente el precio',
        '"Le entiendo. Déjeme preguntarle — cuánto esperaría pagar en un salón por el mismo resultado? [Deja que respondan] Exacto. Y esto le da tratamientos múltiples."',
        'Decirles que están equivocados',
        'Irse y buscar otro cliente',
      ],
      correctIndex: 1,
      explanation: 'Never immediately drop the price. Instead, reframe by comparing to the salon cost, then highlight that this product gives multiple treatments. Value over price.',
      explanationEs: 'Nunca bajes el precio inmediatamente. En su lugar, reformula comparando con el coste del salón, luego destaca que este producto da tratamientos múltiples. Valor sobre precio.',
    },
    {
      question: 'A customer says: "I already have cream at home." What is the BEST response?',
      questionEs: 'Un cliente dice: "Ya tengo crema en casa." Cuál es la MEJOR respuesta?',
      options: [
        '"Okay, no problem"',
        '"Most of our customers do too. But when they try this, they tell me it is completely different. Can I show you why in 30 seconds?"',
        '"Your cream is probably bad"',
        '"Throw your cream away and buy this"',
      ],
      optionsEs: [
        '"Vale, ningún problema"',
        '"La mayoría de nuestros clientes también. Pero cuando prueban esto, me dicen que es completamente diferente. Puedo mostrarle por qué en 30 segundos?"',
        '"Su crema probablemente es mala"',
        '"Tire su crema y compre esto"',
      ],
      correctIndex: 1,
      explanation: 'Validate their current product (do not dismiss it), then offer a quick demo that proves your product is different. The 30-second demo is your strongest weapon.',
      explanationEs: 'Valida su producto actual (no lo descartes), luego ofrece una demo rápida que pruebe que tu producto es diferente. La demo de 30 segundos es tu arma más fuerte.',
    },
    {
      question: 'A customer says: "I need to ask my partner." How do you handle this?',
      questionEs: 'Un cliente dice: "Tengo que preguntarle a mi pareja." Cómo manejas esto?',
      options: [
        '"Okay, come back when you have decided"',
        '"Absolutely. If they were here, what would they say? [Pause] Here — take this sample card with the price written down. The voucher is valid for today only."',
        '"You do not need their permission"',
        '"Your partner will not like it"',
      ],
      optionsEs: [
        '"Vale, vuelva cuando haya decidido"',
        '"Por supuesto. Si estuvieran aquí, qué dirían? [Pausa] Tome — lleve esta tarjeta de muestra con el precio escrito. El vale solo es válido hoy."',
        '"No necesita su permiso"',
        '"A su pareja no le gustará"',
      ],
      correctIndex: 1,
      explanation: 'First, try to engage the partner NOW by asking what they would say. If they truly need to ask someone not present, give them a physical card with the price AND add urgency (today only).',
      explanationEs: 'Primero, intenta involucrar a la pareja AHORA preguntando qué dirían. Si realmente necesitan preguntar a alguien que no está, dales una tarjeta física con el precio Y añade urgencia (solo hoy).',
    },
    {
      question: 'A customer says: "I do not have time." What is the best response?',
      questionEs: 'Un cliente dice: "No tengo tiempo." Cuál es la mejor respuesta?',
      options: [
        '"Okay, have a nice day!"',
        '"This takes exactly 60 seconds — I will time it. And if you do not see a difference, I will wish you a great day. Deal?"',
        '"You should make time for beauty"',
        '"It takes 10 minutes"',
      ],
      optionsEs: [
        '"Vale, que tenga un buen día!"',
        '"Esto toma exactamente 60 segundos — lo cronometraré. Y si no ve diferencia, le desearé un buen día. Trato?"',
        '"Debería hacer tiempo para la belleza"',
        '"Toma 10 minutos"',
      ],
      correctIndex: 1,
      explanation: 'The 60-second challenge removes the time objection completely. Adding "I will time it" and "if you do not see a difference" shows confidence and removes risk for them.',
      explanationEs: 'El reto de 60 segundos elimina por completo la objeción de tiempo. Añadir "lo cronometraré" y "si no ve diferencia" muestra confianza y elimina el riesgo para ellos.',
    },
    {
      question: 'A customer says: "I need to think about it." What is the BEST technique?',
      questionEs: 'Un cliente dice: "Necesito pensarlo." Cuál es la MEJOR técnica?',
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
  description: 'Master door rules, rotation, demo steps, and after-sale follow-through.',
  descriptionEs: 'Domina las reglas de puerta, rotación, pasos de demo y seguimiento post-venta.',
  icon: 'Workflow',
  category: 'Workflow',
  categoryEs: 'Flujo de Trabajo',
  xpReward: 60,
  questions: [
    {
      question: 'What is the Door Rule for customer approach priority?',
      questionEs: 'Cuál es la Regla de Puerta para la prioridad de acercamiento a clientes?',
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
      question: 'What is the correct order of the Syringe demo steps?',
      questionEs: 'Cuál es el orden correcto de los pasos de demo de la Jeringuilla?',
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
      explanation: 'The correct flow is: STOP the customer → ANCHOR the value with Europe price → DEMO the product → CLOSE with the appropriate pricing step.',
      explanationEs: 'El flujo correcto es: PARAR al cliente → ANCLAR el valor con el precio de Europa → DEMOSTRAR el producto → CERRAR con el paso de precio apropiado.',
    },
    {
      question: 'After completing a sale, what should you ALWAYS do?',
      questionEs: 'Después de completar una venta, qué SIEMPRE debes hacer?',
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
      question: 'What is the purpose of "rotating" positions on the sales floor?',
      questionEs: 'Cuál es el propósito de "rotar" posiciones en la tienda?',
      options: [
        'To confuse the customers',
        'To ensure every salesperson gets equal opportunity at the door and prevents burnout',
        'To hide from managers',
        'To play games during work',
      ],
      optionsEs: [
        'Confundir a los clientes',
        'Asegurar que cada vendedor tenga igual oportunidad en la puerta y prevenir el agotamiento',
        'Esconderse de los managers',
        'Jugar durante el trabajo',
      ],
      correctIndex: 1,
      explanation: 'Rotation ensures fairness and prevents burnout. Standing at the door for hours is exhausting. Sharing the load keeps energy high and resentment low across the team.',
      explanationEs: 'La rotación asegura equidad y previene el agotamiento. Estar junto a la puerta durante horas es agotador. Compartir la carga mantiene la energía alta y el resentimiento bajo en el equipo.',
    },
    {
      question: 'During a demo, when should you mention the price?',
      questionEs: 'Durante una demo, cuándo debes mencionar el precio?',
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

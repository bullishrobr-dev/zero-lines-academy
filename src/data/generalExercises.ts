// ─────────────────────────────────────────────────────────────
// Zero Lines Academy — General Exercises
// 10 interactive exercises for the Exercises page
// Role plays, price drills, matching, and ordering
// ─────────────────────────────────────────────────────────────

export type ExerciseType = 'roleplay' | 'pricedrill' | 'matching' | 'ordering' | 'scenario';

// ── Role Play: customer scenario with multiple response options ──
export interface RolePlayContent {
  customerName: string;
  customerProfile: string;
  customerProfileEs: string;
  scenario: string;
  scenarioEs: string;
  responses: {
    text: string;
    textEs: string;
    feedback: string;
    feedbackEs: string;
    score: number; // 0-100
  }[];
}

// ── Price Drill: given a product and customer reaction, pick the right price step ──
export interface PriceDrillContent {
  product: string;
  productEs: string;
  currentPrice: string;
  customerReaction: string;
  customerReactionEs: string;
  options: {
    text: string;
    textEs: string;
    correct: boolean;
    explanation: string;
    explanationEs: string;
  }[];
}

// ── Matching: match terms/techniques with descriptions ──
export interface MatchingContent {
  pairs: {
    term: string;
    termEs: string;
    definition: string;
    definitionEs: string;
  }[];
}

// ── Ordering: arrange steps in correct order ──
export interface OrderingContent {
  steps: {
    text: string;
    textEs: string;
    correctOrder: number;
  }[];
  context: string;
  contextEs: string;
}

export type ExerciseContent =
  | RolePlayContent
  | PriceDrillContent
  | MatchingContent
  | OrderingContent;

export interface Exercise {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  type: ExerciseType;
  icon: string; // lucide icon name
  xpReward: number;
  duration: string;
  durationEs: string;
  content: ExerciseContent;
}

// ═════════════════════════════════════════════════════════════
// EXERCISE 1: Hesitant Tourist — Role Play
// ═════════════════════════════════════════════════════════════
const hesitantTouristExercise: Exercise = {
  id: 'ex-hesitant-tourist',
  title: 'Hesitant Tourist',
  titleEs: 'Turista Hesitante',
  description:
    'A tourist says "just looking." Practice the right response to turn a brush-off into a demo.',
  descriptionEs:
    'Un turista dice "solo miro." Practica la respuesta correcta para convertir un rechazo en una demo.',
  type: 'roleplay',
  icon: 'UserCircle',
  xpReward: 25,
  duration: '3 min',
  durationEs: '3 min',
  content: {
    customerName: 'Sarah',
    customerProfile:
      'A British tourist in her 40s, walking with her husband. She glanced at the syringe display but kept walking when you made eye contact.',
    customerProfileEs:
      'Una turista británica de unos 40 años, caminando con su marido. Miró el expositor de jeringuillas pero siguió caminando cuando hiciste contacto visual.',
    scenario:
      'You approach Sarah near the door. She immediately says: "Oh, we are just looking, thanks." She starts to turn away. What do you say?',
    scenarioEs:
      'Te acercas a Sarah cerca de la puerta. Inmediatamente dice: "Oh, solo miramos, gracias." Empieza a alejarse. Qué dices?',
    responses: [
      {
        text: '"No problem! Let me know if you need anything!" (You walk away)',
        textEs: '"Ningún problema! Avísenme si necesitan algo!" (Te alejas)',
        feedback:
          'You just gave up. "Let me know if you need anything" is the weakest response — 99% of people will never call you back. You lost the sale before it started.',
        feedbackEs:
          'Acabas de rendirte. "Avísenme si necesitan algo" es la respuesta más débil — el 99% de la gente nunca te llamará. Perdiste la venta antes de empezar.',
        score: 0,
      },
      {
        text: '"I completely understand! Before you go — can I show you something that takes exactly 20 seconds? You do not have to buy anything, I just love the reaction people have."',
        textEs:
          '"Lo entiendo completamente! Antes de irse — puedo mostrarle algo que toma exactamente 20 segundos? No tiene que comprar nada, me encanta la reacción de la gente."',
        feedback:
          'SOLID! You validated her "just looking" (no pressure), created curiosity with "20 seconds" (low commitment), and removed all risk with "you do not have to buy anything." The "I love the reaction" line makes it personal and hard to refuse. This is how you turn walk-aways into demos.',
        feedbackEs:
          'SÓLIDO! Validaste su "solo miro" (sin presión), creaste curiosidad con "20 segundos" (bajo compromiso), y eliminaste todo el riesgo con "no tiene que comprar nada." La frase "me encanta la reacción" lo hace personal y difícil de rechazar. Así es como conviertes a los que se van en demos.',
        score: 90,
      },
      {
        text: '"Wait! This is the best product we have! You need to try it!" (You grab her arm gently)',
        textEs: '"Espere! Este es el mejor producto que tenemos! Necesita probarlo!" (Le agarras el brazo suavemente)',
        feedback:
          'WAY too aggressive. Grabbing a customer and saying "you NEED to try it" triggers immediate resistance. Nobody likes to feel pressured. You just confirmed her instinct to walk away.',
        feedbackEs:
          'DEMASIADO agresivo. Agarrar a un cliente y decir "NECESITA probarlo" desencadena resistencia inmediata. A nadie le gusta sentirse presionado. Acabas de confirmar su instinto de alejarse.',
        score: 5,
      },
      {
        text: '"Are you shopping for anyone else today? Because this makes the perfect gift — and I will show you why in 30 seconds."',
        textEs:
          '"Está comprando para alguien más hoy? Porque esto hace el regalo perfecto — y le mostraré por qué en 30 segundos."',
        feedback:
          'GREAT approach! The gift angle is disarming — it shifts the focus from "being sold to" to "finding a gift." The "30 seconds" sets a low time commitment. This works especially well with couples and tourists. However, it does not work for everyone — some people are not gift shopping. Solid 75%.',
        feedbackEs:
          'GRAN enfoque! El ángulo de regalo es desarmante — cambia el enfoque de "le están vendiendo" a "encontrar un regalo." Los "30 segundos" establecen un bajo compromiso de tiempo. Esto funciona especialmente bien con parejas y turistas. Sin embargo, no funciona para todos — algunos no están comprando regalos. Un sólido 75%.',
        score: 75,
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 2: Price Objection — Role Play
// ═════════════════════════════════════════════════════════════
const priceObjectionExercise: Exercise = {
  id: 'ex-price-objection',
  title: 'Price Objection',
  titleEs: 'Objeción de Precio',
  description:
    'The customer loves the demo but says 300 euros is too much. Practice navigating the price ladder.',
  descriptionEs:
    'Al cliente le encanta la demo pero dice que 300 euros es demasiado. Practica navegar la escalera de precios.',
  type: 'roleplay',
  icon: 'Banknote',
  xpReward: 30,
  duration: '4 min',
  durationEs: '4 min',
  content: {
    customerName: 'Marie',
    customerProfile:
      'A French woman in her 50s, well-dressed. She was amazed by the syringe demo — her eyes widened when she saw the result. But now she is hesitating.',
    customerProfileEs:
      'Una mujer francesa de unos 50 años, bien vestida. Le asombró la demo de la jeringuilla — sus ojos se iluminaron cuando vio el resultado. Pero ahora duda.',
    scenario:
      'Marie says: "Wow, the result is incredible... but 300 euros? That is a lot of money. I was not planning to spend that much today." She starts to hand the product back. What do you do?',
    scenarioEs:
      'Marie dice: "Wow, el resultado es increíble... pero 300 euros? Eso es mucho dinero. No planeaba gastar tanto hoy." Empieza a devolverte el producto. Qué haces?',
    responses: [
      {
        text: '"Okay, I understand. Maybe next time!" (You take the product back)',
        textEs: '"Vale, lo entiendo. Quizás la próxima vez!" (Recoges el producto)',
        feedback:
          'You just let a hot sale walk away. She LOVED the demo — that was your strongest signal. Never accept the first "no" from someone who was amazed by the product.',
        feedbackEs:
          'Acabas de dejar ir una venta caliente. Le ENCANTÓ la demo — esa era tu señal más fuerte. Nunca aceptes el primer "no" de alguien que quedó asombrado por el producto.',
        score: 0,
      },
      {
        text: '"I completely understand — 300 euros does sound like a lot. But let me ask you this: how much would you expect to pay in a salon in Paris for this exact same treatment? [She says 400-500] Exactly. And this gives you multiple treatments at home. But let me check something for you..." (You pause, then offer) "I can include a beauty gift worth 50 euros with your purchase today — that brings the value way up."',
        textEs:
          '"Lo entiendo completamente — 300 euros suena a mucho. Pero déjeme preguntarle: cuánto esperaría pagar en un salón en París por este mismo tratamiento exacto? [Ella dice 400-500] Exacto. Y esto le da tratamientos múltiples en casa. Pero déjeme comprobar algo para usted..." (Pausas, luego ofreces) "Puedo incluir un regalo de belleza valorado en 50 euros con su compra hoy — eso sube mucho el valor."',
        feedback:
          'EXCELLENT! This is master-level selling. You: 1) Validated her concern, 2) Reframed the price by asking about salon costs (she answers HERSELF that it should cost more), 3) Added value with a gift instead of dropping the price. You kept the 300-euro price AND increased perceived value. This is how top earners do it.',
        feedbackEs:
          'EXCELENTE! Esto es venta a nivel maestro. Tú: 1) Validaste su preocupación, 2) Reformulaste el precio preguntando sobre costes de salón (ella misma responde que debería costar más), 3) Añadiste valor con un regalo en lugar de bajar el precio. Mantuviste los 300 euros Y aumentaste el valor percibido. Así es como lo hacen los mejores vendedores.',
        score: 100,
      },
      {
        text: '"No no no — 300 euros is actually very cheap! You are getting a great deal!"',
        textEs: '"No no no — 300 euros es realmente muy barato! Está consiguiendo una ganga!"',
        feedback:
          'Telling a customer their objection is wrong triggers defensiveness. She said it is "a lot of money" — and for her, it IS. Arguing about it makes you the enemy. Instead, reframe the value or add more to the offer.',
        feedbackEs:
          'Decirle a un cliente que su objeción está mal desencadena defensiva. Ella dijo que es "mucho dinero" — y para ella, LO ES. Discutir sobre ello te convierte en el enemigo. En su lugar, reformula el valor o añade más a la oferta.',
        score: 10,
      },
      {
        text: '"I hear you. What if I can do it for 200 euros? Just for you, today only."',
        textEs: '"Le entiendo. Y si puedo hacerlo por 200 euros? Solo para usted, solo hoy.',
        feedback:
          'You dropped the price by 100 euros immediately! That is terrible — you just gave away a third of the sale. She was amazed by the demo; she might have bought at 300 with the right reframing. Price drops should be gradual and only after exhausting other options.',
        feedbackEs:
          'Bajaste el precio en 100 euros inmediatamente! Eso es terrible — acabas de regalar un tercio de la venta. Ella quedó asombrada por la demo; podría haber comprado a 300 con la reformulación adecuada. Las bajadas de precio deben ser graduales y solo después de agotar otras opciones.',
        score: 20,
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 3: The Gift Shopper — Role Play
// ═════════════════════════════════════════════════════════════
const giftShopperExercise: Exercise = {
  id: 'ex-gift-shopper',
  title: 'The Gift Shopper',
  titleEs: 'El Comprador de Regalos',
  description:
    'A customer is buying for Christmas and does not know what to pick. Guide them to the right combo.',
  descriptionEs:
    'Un cliente compra para Navidad y no sabe qué elegir. Guíalo hacia el combo correcto.',
  type: 'roleplay',
  icon: 'Gift',
  xpReward: 25,
  duration: '3 min',
  durationEs: '3 min',
  content: {
    customerName: 'Clara',
    customerProfile:
      'A Spanish woman in her 30s, looking at all products with a confused expression. She keeps going back and forth between the scrub and the nail kit.',
    customerProfileEs:
      'Una mujer española de unos 30 años, mirando todos los productos con expresión confundida. Sigue yendo de un lado a otro entre el exfoliante y el kit de uñas.',
    scenario:
      'Clara approaches you and says: "I need to buy Christmas gifts for my sister and my mom, but I have no idea what to choose. They both love beauty stuff but I am so confused by all these options. What do you recommend?"',
    scenarioEs:
      'Clara se te acerca y dice: "Necesito comprar regalos de Navidad para mi hermana y mi madre, pero no tengo idea de qué elegir. A ambas les encantan las cosas de belleza pero estoy tan confundida con todas estas opciones. Qué recomiendas?"',
    responses: [
      {
        text: '"Everything is good, just pick whatever you want!"',
        textEs: '"Todo es bueno, elija lo que quiera!"',
        feedback:
          'You just abandoned her. She came to you FOR guidance. Saying "pick whatever" means you are not helping. She will likely leave overwhelmed and buy nothing.',
        feedbackEs:
          'Acabas de abandonarla. Ella vino a ti PARA que la guíes. Decir "elija lo que quiera" significa que no estás ayudando. Probablemente se irá abrumada y no comprará nada.',
        score: 0,
      },
      {
        text: '"For your mom, I recommend the Syringe — it is our bestseller and women her age absolutely love the instant results. For your sister, the Nail Kit is perfect — it is fun, trendy, and she can use it at home. Together they are 120 euros, but I can do a gift bundle for 99 euros and include free gift bags. How does that sound?"',
        textEs:
          '"Para su madre, recomiendo la Jeringuilla — es nuestro más vendido y las mujeres de su edad adoran los resultados instantáneos. Para su hermana, el Kit de Uñas es perfecto — es divertido, moderno, y puede usarlo en casa. Juntos son 120 euros, pero puedo hacer un paquete de regalo por 99 euros e incluir bolsas de regalo gratis. Qué le parece?"',
        feedback:
          'PERFECT! You: 1) Made specific recommendations for each person (showed expertise), 2) Used age-appropriate reasoning (mom = anti-aging, sister = fun/trendy), 3) Bundled for savings (99 vs 120), 4) Added gift bags (perceived value). This is consultative selling at its finest.',
        feedbackEs:
          'PERFECTO! Tú: 1) Hiciste recomendaciones específicas para cada persona (mostraste experiencia), 2) Usaste razonamiento apropiado por edad (madre = anti-edad, hermana = divertido/moderno), 3) Hiciste un paquete con ahorro (99 vs 120), 4) Añadiste bolsas de regalo (valor percibido). Esto es venta consultiva en su máxima expresión.',
        score: 100,
      },
      {
        text: '"Get three of everything — one for your mom, one for your sister, and one for you!"',
        textEs: '"Lleve tres de todo — uno para su madre, uno para su hermana, y uno para usted!"',
        feedback:
          'Over-the-top pushy. She asked for help choosing, not for an upsell to triple her budget. This feels greedy and insincere. Build trust first, then suggest one extra item if appropriate.',
        feedbackEs:
          'Excesivamente agresivo. Ella pidió ayuda para elegir, no un upsell para triplicar su presupuesto. Esto se siente codicioso e insincero. Construye confianza primero, luego sugiere un artículo extra si es apropiado.',
        score: 15,
      },
      {
        text: '"The scrub is really popular. Your mom and sister would both love it. Two scrubs for 50 euros — done!"',
        textEs: '"El exfoliante es muy popular. A su madre y hermana les encantaría. Dos exfoliantes por 50 euros — listo!"',
        feedback:
          'Decent but missed a huge opportunity. You sold two scrubs when you could have sold a personalized bundle with different products for each person. Also, you did not create any emotional connection. Functional but not great.',
        feedbackEs:
          'Decente pero perdió una gran oportunidad. Vendiste dos exfoliantes cuando podrías haber vendido un paquete personalizado con productos diferentes para cada persona. Además, no creaste ninguna conexión emocional. Funcional pero no genial.',
        score: 40,
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 4: Syringe Price Ladder Drill
// ═════════════════════════════════════════════════════════════
const syringePriceDrill: Exercise = {
  id: 'ex-syringe-price-drill',
  title: 'Syringe Price Ladder Drill',
  titleEs: 'Práctica de Escala de Precios de Jeringuilla',
  description:
    'Practice descending the price ladder correctly at each customer resistance point.',
  descriptionEs:
    'Practica descender la escalera de precios correctamente en cada punto de resistencia del cliente.',
  type: 'pricedrill',
  icon: 'TrendingDown',
  xpReward: 30,
  duration: '4 min',
  durationEs: '4 min',
  content: {
    product: 'Hyaluronic Acid Syringe',
    productEs: 'Jeringuilla de Ácido Hialurónico',
    currentPrice: 'Europe price: 350-500 euros',
    customerReaction:
      'Customer nods but says "That IS expensive in Europe." They are waiting for you to continue.',
    customerReactionEs:
      'El cliente asiente pero dice "Eso SÍ es caro en Europa." Te están esperando para que continúes.',
    options: [
      {
        text: 'Drop immediately to the voucher price of 39 euros',
        textEs: 'Bajar inmediatamente al precio de vale de 39 euros',
        correct: false,
        explanation:
          'Too fast! You skipped the Andorra base price (69), the gift add-on, AND the two-for-99 alternative. You just gave away all your margin.',
        explanationEs:
          'Demasiado rápido! Saltaste el precio base de Andorra (69), el regalo añadido, Y la alternativa de dos por 99. Acabas de regalar todo tu margen.',
      },
      {
        text: 'Reveal the Andorra price: "Here in Andorra, it is only 69 euros — a fraction of what you would pay in Paris."',
        textEs:
          'Revelar el precio de Andorra: "Aquí en Andorra, es solo 69 euros — una fracción de lo que pagaría en París."',
        correct: true,
        explanation:
          'Correct! The flow is: Europe anchor (350-500) → Andorra base (69) → add value (gift) → alternative offer (2 for 99) → voucher close (39). You are on step 2.',
        explanationEs:
          'Correcto! El flujo es: Anclaje de Europa (350-500) → Base de Andorra (69) → añadir valor (regalo) → oferta alternativa (2 por 99) → cierre con vale (39). Estás en el paso 2.',
      },
      {
        text: 'Tell them the product is out of stock',
        textEs: 'Decirles que el producto está agotado',
        correct: false,
        explanation: 'Why would you lie about stock? They are interested and engaged. This makes no sense.',
        explanationEs: 'Por qué mentirías sobre el stock? Están interesados y comprometidos. Esto no tiene sentido.',
      },
      {
        text: 'Immediately push the two-for-99 offer without mentioning 69',
        textEs: 'Empujar inmediatamente la oferta de dos por 99 sin mencionar 69',
        correct: false,
        explanation:
          'You skipped a step! The customer needs to hear the 69-euro base price first to appreciate the value of the two-for-99 deal. Without the anchor, the 99-euro offer has no context.',
        explanationEs:
          'Te saltaste un paso! El cliente necesita oír el precio base de 69 euros primero para apreciar el valor de la oferta de dos por 99. Sin el anclaje, la oferta de 99 euros no tiene contexto.',
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 5: Peeling Price Ladder Drill
// ═════════════════════════════════════════════════════════════
const peelingPriceDrill: Exercise = {
  id: 'ex-peeling-price-drill',
  title: 'Peeling Price Ladder Drill',
  titleEs: 'Práctica de Escala de Precios de Peeling',
  description: 'Practice the peeling price steps from Europe anchor to voucher close.',
  descriptionEs: 'Practica los pasos de precio del peeling desde el anclaje europeo hasta el cierre con vale.',
  type: 'pricedrill',
  icon: 'TrendingDown',
  xpReward: 30,
  duration: '4 min',
  durationEs: '4 min',
  content: {
    product: 'Glycolic Peeling',
    productEs: 'Peeling Glucólico',
    currentPrice: 'Andorra base: 49 euros + post-peeling sample kit',
    customerReaction:
      'Customer likes the sample kit idea but says "Hmm, 49 euros is still a bit more than I wanted to spend today."',
    customerReactionEs:
      'Al cliente le gusta la idea del kit de muestras pero dice "Hmm, 49 euros es todavía un poco más de lo que quería gastar hoy."',
    options: [
      {
        text: 'Offer the three-session prepaid package for 99 euros (33 per session)',
        textEs: 'Ofrecer el paquete de tres sesiones prepagadas por 99 euros (33 por sesión)',
        correct: true,
        explanation:
          'Correct! After the base price (49) + sample kit add-on, the next step is the three-session package at 99 euros. This reframes the value: they get 3 sessions, transformation narrative, and lock in commitment.',
        explanationEs:
          'Correcto! Después del precio base (49) + kit de muestras añadido, el siguiente paso es el paquete de tres sesiones a 99 euros. Esto reformula el valor: obtienen 3 sesiones, narrativa de transformación, y compromiso asegurado.',
      },
      {
        text: 'Immediately drop to the voucher price of 29 euros',
        textEs: 'Bajar inmediatamente al precio de vale de 29 euros',
        correct: false,
        explanation:
          'Too fast! The three-session offer at 99 euros should come before the voucher close at 29. You just skipped your best upsell opportunity.',
        explanationEs:
          'Demasiado rápido! La oferta de tres sesiones a 99 euros debería venir antes del cierre con vale a 29. Acabas de saltarte tu mejor oportunidad de upsell.',
      },
      {
        text: 'Tell them 49 euros is the lowest you can go',
        textEs: 'Decirles que 49 euros es lo más bajo que puedes bajar',
        correct: false,
        explanation:
          'Wrong! You have more tools in your toolbox. The three-session offer and the voucher close are both still available. Never claim a price is your lowest when it is not.',
        explanationEs:
          'Incorrecto! Tienes más herramientas en tu caja de herramientas. La oferta de tres sesiones y el cierre con vale todavía están disponibles. Nunca digas que un precio es tu mínimo cuando no lo es.',
      },
      {
        text: 'Suggest the Nail Kit instead at 29 euros',
        textEs: 'Sugerir el Kit de Uñas en su lugar a 29 euros',
        correct: false,
        explanation:
          'Switching products breaks the flow. They were interested in the peeling — do not abandon that interest. Work the peeling price ladder first before considering a product switch.',
        explanationEs:
          'Cambiar de producto rompe el flujo. Estaban interesados en el peeling — no abandones ese interés. Trabaja la escalera de precios del peeling primero antes de considerar un cambio de producto.',
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 6: Match the Technique — Matching
// ═════════════════════════════════════════════════════════════
const matchTechniqueExercise: Exercise = {
  id: 'ex-match-technique',
  title: 'Match the Technique',
  titleEs: 'Empareja la Técnica',
  description: 'Match each sales technique with its correct description and purpose.',
  descriptionEs: 'Empareja cada técnica de ventas con su descripción y propósito correctos.',
  type: 'matching',
  icon: 'Shuffle',
  xpReward: 25,
  duration: '4 min',
  durationEs: '4 min',
  content: {
    pairs: [
      {
        term: '3-Second Rule',
        termEs: 'Regla de los 3 Segundos',
        definition:
          'Approach the customer within 3 seconds of them entering your zone, before they form a "just looking" defense.',
        definitionEs:
          'Acércate al cliente en 3 segundos de que entren en tu zona, antes de que formen una defensa de "solo miro".',
      },
      {
        term: 'Europe Price Anchor',
        termEs: 'Anclaje de Precio de Europa',
        definition:
          'Start by mentioning the high European price (350-500 euros for syringe) to make the Andorra price feel like a bargain.',
        definitionEs:
          'Empieza mencionando el alto precio europeo (350-500 euros para jeringuilla) para que el precio de Andorra parezca una ganga.',
      },
      {
        term: 'Two-Choice Close',
        termEs: 'Cierre de Dos Opciones',
        definition:
          'Present two positive options that both lead to a sale, such as "one for 69 or two for 99."',
        definitionEs:
          'Presenta dos opciones positivas que ambas llevan a una venta, como "una por 69 o dos por 99."',
      },
      {
        term: 'Voucher Close',
        termEs: 'Cierre con Vale',
        definition:
          'Your last-resort minimum price (39 euros for syringe) used only when the customer is genuinely walking away.',
        definitionEs:
          'Tu precio mínimo de último recurso (39 euros para jeringuilla) usado solo cuando el cliente realmente se está yendo.',
      },
      {
        term: 'Assumptive Close',
        termEs: 'Cierre Asumido',
        definition:
          'Act as if the sale is already made and move to the next step: "I will set this aside for you — do you want the gift bag?"',
        definitionEs:
          'Actúa como si la venta ya estuviera hecha y pasa al siguiente paso: "Voy a apartar esto para usted — quiere la bolsa de regalo?"',
      },
      {
        term: 'Social Proof',
        termEs: 'Prueba Social',
        definition:
          'Using testimonials, sales numbers, or crowd behavior to influence the buying decision.',
        definitionEs:
          'Usar testimonios, números de ventas o comportamiento de multitud para influir en la decisión de compra.',
      },
      {
        term: 'Adaptive Pricing',
        termEs: 'Precio Adaptativo',
        definition:
          'Reading customer signals (clothes, engagement, reactions) and tailoring your offer to match their budget and interest.',
        definitionEs:
          'Leer las señales del cliente (ropa, compromiso, reacciones) y adaptar tu oferta para coincidir con su presupuesto e interés.',
      },
      {
        term: 'Reciprocity (Cialdini)',
        termEs: 'Reciprocidad (Cialdini)',
        definition:
          'Giving something first (demo, sample, compliment) makes people feel obliged to give back — often with a purchase.',
        definitionEs:
          'Dar algo primero (demo, muestra, cumplido) hace que la gente se sienta obligada a devolver — a menudo con una compra.',
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 7: Order the Pitch — Ordering
// ═════════════════════════════════════════════════════════════
const orderPitchExercise: Exercise = {
  id: 'ex-order-pitch',
  title: 'Order the Pitch',
  titleEs: 'Ordena el Pitch',
  description: 'Arrange the correct order of a Syringe pitch from first contact to close.',
  descriptionEs: 'Ordena correctamente un pitch de Jeringuilla desde el primer contacto hasta el cierre.',
  type: 'ordering',
  icon: 'ListOrdered',
  xpReward: 30,
  duration: '3 min',
  durationEs: '3 min',
  content: {
    steps: [
      {
        text: 'Stop the customer with a curiosity hook: "Can I show you something amazing? It takes 30 seconds."',
        textEs:
          'Parar al cliente con un gancho de curiosidad: "Puedo mostrarle algo increíble? Toma 30 segundos."',
        correctOrder: 1,
      },
      {
        text: 'Anchor the value with the Europe price: "In Paris or London, this treatment costs 350 to 500 euros per session."',
        textEs:
          'Anclar el valor con el precio de Europa: "En París o Londres, este tratamiento cuesta de 350 a 500 euros por sesión."',
        correctOrder: 2,
      },
      {
        text: 'Demonstrate the product on their hand, showing the instant result.',
        textEs: 'Demostrar el producto en su mano, mostrando el resultado instantáneo.',
        correctOrder: 3,
      },
      {
        text: 'Reveal the Andorra price: "Here, it is just 69 euros — and you get multiple treatments."',
        textEs:
          'Revelar el precio de Andorra: "Aquí, es solo 69 euros — y obtiene tratamientos múltiples."',
        correctOrder: 4,
      },
      {
        text: 'Handle objections and use adaptive pricing if needed.',
        textEs: 'Manejar objeciones y usar precio adaptativo si es necesario.',
        correctOrder: 5,
      },
      {
        text: 'Close with Two-Choice or Assumptive Close technique.',
        textEs: 'Cerrar con la técnica de Dos Opciones o Cierre Asumido.',
        correctOrder: 6,
      },
    ],
    context:
      'You have just spotted a potential customer near the door. Put the steps of a successful Syringe pitch in the correct order.',
    contextEs:
      'Acabas de ver a un cliente potencial cerca de la puerta. Pon los pasos de un pitch exitoso de Jeringuilla en el orden correcto.',
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 8: Skeptical Husband — Role Play
// ═════════════════════════════════════════════════════════════
const skepticalHusbandExercise: Exercise = {
  id: 'ex-skeptical-husband',
  title: 'Skeptical Husband',
  titleEs: 'Esposo Escéptico',
  description:
    'The wife is interested but the husband thinks it is a scam. Win them both over.',
  descriptionEs:
    'La esposa está interesada pero el esposo piensa que es una estafa. Convence a ambos.',
  type: 'roleplay',
  icon: 'Users',
  xpReward: 35,
  duration: '4 min',
  durationEs: '4 min',
  content: {
    customerName: 'Margaret & John',
    customerProfile:
      'A retired British couple in their 60s. Margaret is fascinated by the syringe demo result on her hand. John stands back with crossed arms and a skeptical expression.',
    customerProfileEs:
      'Una pareja británica jubilada de unos 60 años. Margaret está fascinada por el resultado de la demo de jeringuilla en su mano. John se queda atrás con los brazos cruzados y expresión escéptica.',
    scenario:
      'Margaret says "Oh, that is amazing! Look, John, the wrinkle is gone!" John replies: "Looks like a gimmick to me. These places always try to rip off tourists. How do we know it is not just makeup?" Margaret starts to pull back. What do you do?',
    scenarioEs:
      'Margaret dice "Oh, es increíble! Mira, John, la arruga desapareció!" John responde: "A mí me parece un truco. Estos sitios siempre intentan estafar a turistas. Cómo sabemos que no es solo maquillaje?" Margaret empieza a retroceder. Qué haces?',
    responses: [
      {
        text: '"Sir, this is definitely NOT makeup. It is a professional treatment. You can trust us."',
        textEs:
          '"Señor, esto definitivamente NO es maquillaje. Es un tratamiento profesional. Puede confiar en nosotros."',
        feedback:
          '"You can trust us" is the LEAST trustworthy thing you can say. A skeptical person needs PROOF, not claims. You just sounded defensive, which confirms his suspicion.',
        feedbackEs:
          '"Puede confiar en nosotros" es lo MENOS confiable que puedes decir. Una persona escéptica necesita PRUEBAS, no afirmaciones. Acabas de sonar defensivo, lo que confirma su sospecha.',
        score: 10,
      },
      {
        text: '"Sir, I completely understand your skepticism — there are a lot of gimmicks out there. Here is what I suggest: let me do the demo on YOUR hand too. That way YOU can see there is no makeup — just your own skin, 60 seconds apart. What do you say?"',
        textEs:
          '"Señor, entiendo completamente su escepticismo — hay muchos trucos por ahí. Esto es lo que sugiero: déjeme hacer la demo en SU mano también. Así USTED puede ver que no hay maquillaje — solo su propia piel, con 60 segundos de diferencia. Qué dice?"',
        feedback:
          'BRILLIANT! You: 1) Validated his skepticism (not defensive), 2) Agreed there are gimmicks (builds rapport), 3) Offered proof on HIS skin (undeniable evidence), 4) Made it a challenge he cannot refuse. Once he sees the result on his own hand, he becomes your ally, not your enemy.',
        feedbackEs:
          'BRILLANTE! Tú: 1) Validaste su escepticismo (no defensivo), 2) Acordaste que hay trucos (construye rapport), 3) Ofreciste prueba en SU piel (evidencia innegable), 4) Lo convertiste en un reto que no puede rechazar. Una vez que vea el resultado en su propia mano, se convierte en tu aliado, no tu enemigo.',
        score: 100,
      },
      {
        text: '"Sir, your wife loves it and she wants it. Do not ruin her experience."',
        textEs: '"Señor, a su esposa le encanta y lo quiere. No arruine su experiencia."',
        feedback:
          'Making the husband the villain will backfire completely. Now he feels attacked AND his wife feels awkward. You created a conflict between them instead of solving his concern.',
        feedbackEs:
          'Hacer al esposo el villano se volverá completamente en tu contra. Ahora se siente atacado Y su esposa se siente incómoda. Creaste un conflicto entre ellos en lugar de resolver su preocupación.',
        score: 0,
      },
      {
        text: '"I understand, sir. Here is my card — come back if you change your mind."',
        textEs: '"Entiendo, señor. Aquí está mi tarjeta — vuelvan si cambian de opinión."',
        feedback:
          'You gave up on a hot prospect. Margaret LOVED the demo. The only barrier is John\'s skepticism, which you could have overcome with proof. Giving a card means you will likely never see them again.',
        feedbackEs:
          'Te rendiste con un prospecto caliente. A Margaret le ENCANTÓ la demo. La única barrera es el escepticismo de John, que podrías haber superado con pruebas. Dar una tarjeta significa que probablemente nunca los volverás a ver.',
        score: 5,
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 9: The Doubter — Role Play
// ═════════════════════════════════════════════════════════════
const theDoubterExercise: Exercise = {
  id: 'ex-the-doubter',
  title: 'The Doubter',
  titleEs: 'El Escéptico',
  description:
    '"I already have cream at home" — the most common objection. Learn the perfect response.',
  descriptionEs:
    '"Ya tengo crema en casa" — la objeción más común. Aprende la respuesta perfecta.',
  type: 'roleplay',
  icon: 'MessageSquare',
  xpReward: 25,
  duration: '3 min',
  durationEs: '3 min',
  content: {
    customerName: 'Elena',
    customerProfile:
      'A Spanish woman in her 40s, well-groomed. She watched the full syringe demo with interest but now seems hesitant.',
    customerProfileEs:
      'Una mujer española de unos 40 años, bien arreglada. Vio la demo completa de jeringuilla con interés pero ahora parece hesitant.',
    scenario:
      'Elena says: "The result is impressive, I admit. But I already have a good anti-aging cream at home that I use every night. I do not think I need another product." She starts to step away. What do you say?',
    scenarioEs:
      'Elena dice: "El resultado es impresionante, lo admito. Pero ya tengo una buena crema anti-edad en casa que uso cada noche. No creo que necesite otro producto." Empieza a alejarse. Qué dices?',
    responses: [
      {
        text: '"But this is so much better than cream! Cream does nothing compared to this!"',
        textEs: '"Pero esto es mucho mejor que crema! La crema no hace nada comparado con esto!"',
        feedback:
          'Insulting her current product is insulting HER choice. She said it is a "good" cream — you just called her judgment into question. Never tear down what a customer currently uses.',
        feedbackEs:
          'Insultar su producto actual es insultar SU elección. Ella dijo que es una crema "buena" — acabas de cuestionar su juicio. Nunca critiques lo que un cliente usa actualmente.',
        score: 5,
      },
      {
        text: '"I completely understand — most of our customers have a cream they love too. But here is the thing: cream works on the surface. This works from the inside by delivering hyaluronic acid directly to the deeper layers. It is not replacing your cream — it is doing what your cream cannot. Think of it as a monthly salon treatment you do at home. Can I show you how easy it is to use?"',
        textEs:
          '"Lo entiendo completamente — la mayoría de nuestros clientes también tienen una crema que les encanta. Pero esto es lo que pasa: la crema trabaja en la superficie. Esto trabaja desde dentro al entregar ácido hialurónico directamente a las capas más profundas. No está reemplazando su crema — está haciendo lo que su crema no puede. Piense en ello como un tratamiento mensual de salón que hace en casa. Puedo mostrarle qué fácil es de usar?"',
        feedback:
          'PERFECT response! You: 1) Validated her cream (no insult), 2) Educated without lecturing (surface vs deep), 3) Positioned as complementary, not replacement, 4) Used the salon comparison (familiar), 5) Offered to show usage (low-commitment next step). This is textbook consultative selling.',
        feedbackEs:
          'Respuesta PERFECTA! Tú: 1) Validaste su crema (sin insulto), 2) Educaste sin dar lecciones (superficie vs profundo), 3) Posicionaste como complementario, no reemplazo, 4) Usaste la comparación con salón (familiar), 5) Ofreciste mostrar uso (siguiente paso de bajo compromiso). Esto es venta consultiva de manual.',
        score: 100,
      },
      {
        text: '"Okay, that makes sense. Have a nice day!"',
        textEs: '"Vale, tiene sentido. Que tenga un buen día!"',
        feedback:
          'You accepted her objection without even trying. She was interested enough to watch the full demo — that means there is desire. Your job is to bridge the gap between "I have cream" and "I want this too."',
        feedbackEs:
          'Aceptaste su objeción sin siquiera intentarlo. Estuvo lo suficientemente interesada para ver la demo completa — eso significa que hay deseo. Tu trabajo es cerrar la brecha entre "tengo crema" y "quiero esto también."',
        score: 0,
      },
      {
        text: '"But it is only 69 euros! That is nothing for what you get!"',
        textEs: '"Pero son solo 69 euros! Eso no es nada por lo que obtiene!"',
        feedback:
          'You are arguing about price when her objection is NOT about price. She said she already has cream — that is a product objection, not a money objection. Address the right objection!',
        feedbackEs:
          'Estás discutiendo sobre precio cuando su objeción NO es sobre precio. Ella dijo que ya tiene crema — eso es una objeción de producto, no de dinero. Dirígete a la objeción correcta!',
        score: 15,
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 10: Body Language Reading — Matching
// ═════════════════════════════════════════════════════════════
const bodyLanguageExercise: Exercise = {
  id: 'ex-body-language',
  title: 'Body Language Reading',
  titleEs: 'Lectura de Lenguaje Corporal',
  description: 'Match each customer body language signal with what it really means.',
  descriptionEs: 'Empareja cada señal de lenguaje corporal del cliente con lo que realmente significa.',
  type: 'matching',
  icon: 'ScanEye',
  xpReward: 25,
  duration: '4 min',
  durationEs: '4 min',
  content: {
    pairs: [
      {
        term: 'Open palms during presentation',
        termEs: 'Palmas abiertas durante la presentación',
        definition:
          'Universal trust signal. Shows honesty, openness, and that you have nothing to hide. The customer subconsciously relaxes.',
        definitionEs:
          'Señal de confianza universal. Muestra honestidad, apertura, y que no tienes nada que ocultar. El cliente se relaja subconscientemente.',
      },
      {
        term: 'Customer touches/holds product for 5+ seconds',
        termEs: 'El cliente toca/sostiene el producto por más de 5 segundos',
        definition:
          'Strong buying signal. The "endowment effect" — they are imagining ownership. Once they hold it, they are more likely to buy it.',
        definitionEs:
          'Fuerte señal de compra. El "efecto de dotación" — se están imaginando como dueños. Una vez que lo sostienen, es más probable que lo compren.',
      },
      {
        term: 'Customer looks at partner repeatedly',
        termEs: 'El cliente mira a su pareja repetidamente',
        definition:
          'They are seeking permission or validation. Engage BOTH people — ask the partner for their opinion to bring them into the decision.',
        definitionEs:
          'Buscan permiso o validación. Involucra a AMBAS personas — pide la opinión de la pareja para traerlos a la decisión.',
      },
      {
        term: 'Leaning in closer to see the demo',
        termEs: 'Inclinarse más cerca para ver la demo',
        definition:
          'High engagement and interest. They are invested in the outcome. This is your green light to proceed with confidence.',
        definitionEs:
          'Alto compromiso e interés. Están invertidos en el resultado. Esta es tu luz verde para proceder con confianza.',
      },
      {
        term: 'Crossed arms, stepping back',
        termEs: 'Brazos cruzados, dando un paso atrás',
        definition:
          'Defensive posture. They feel pressured or skeptical. Create space, lower your energy, and use curiosity-based hooks to re-engage.',
        definitionEs:
          'Postura defensiva. Se sienten presionados o escépticos. Crea espacio, baja tu energía, y usa ganchos basados en curiosidad para volver a involucrar.',
      },
      {
        term: 'Asking "How long does it last?"',
        termEs: 'Preguntar "Cuánto dura?"',
        definition:
          'Mental ownership signal. They are calculating ROI and imagining long-term use. One of the strongest pre-purchase questions.',
        definitionEs:
          'Señal de propiedad mental. Están calculando el retorno de inversión e imaginando uso a largo plazo. Una de las preguntas pre-compra más fuertes.',
      },
      {
        term: 'Nodding while you speak',
        termEs: 'Asentir mientras hablas',
        definition:
          'Agreement and engagement. They are following your logic and building trust. Keep going — you are on the right track.',
        definitionEs:
          'Acuerdo y compromiso. Siguen tu lógica y construyen confianza. Sigue adelante — vas por buen camino.',
      },
      {
        term: 'Looking around the store instead of at you',
        termEs: 'Mirar alrededor de la tienda en lugar de a ti',
        definition:
          'Distraction or disengagement. They are looking for an exit or a reason to leave. Re-engage with a direct question or a surprising statement.',
        definitionEs:
          'Distracción o descompromiso. Están buscando una salida o una razón para irse. Vuelve a involucrar con una pregunta directa o una declaración sorprendente.',
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// ALL EXERCISES EXPORT
// ═════════════════════════════════════════════════════════════

export const generalExercises: Exercise[] = [
  hesitantTouristExercise,
  priceObjectionExercise,
  giftShopperExercise,
  syringePriceDrill,
  peelingPriceDrill,
  matchTechniqueExercise,
  orderPitchExercise,
  skepticalHusbandExercise,
  theDoubterExercise,
  bodyLanguageExercise,
];

/** Get an exercise by its unique ID */
export function getExerciseById(id: string): Exercise | undefined {
  return generalExercises.find((e) => e.id === id);
}

/** Get exercises by type */
export function getExercisesByType(type: ExerciseType): Exercise[] {
  return generalExercises.filter((e) => e.type === type);
}

/** Get total exercise count */
export function getTotalExerciseCount(): number {
  return generalExercises.length;
}

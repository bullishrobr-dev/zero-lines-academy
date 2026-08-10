// ─────────────────────────────────────────────────────────────
// Zero Lines Academy — General Exercises
// 10 interactive exercises for the Exercises page
// Role plays, price drills, matching, and ordering
// CORRECT prices from the Zero Lines Sales Bible — DO NOT ALTER
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
  titleEs: 'Turista Indecisa',
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
      'Te acercas a Sarah cerca de la puerta. Inmediatamente dice: "Oh, solo miramos, gracias." Empieza a alejarse. ¿Qué dices?',
    responses: [
      {
        text: '"No problem! Let me know if you need anything!" (You walk away)',
        textEs: '"¡Sin problema! ¡Avisadme si necesitáis algo!" (Te alejas)',
        feedback:
          'You just gave up. "Let me know if you need anything" is the weakest response — 99% of people will never call you back. You lost the sale before it started.',
        feedbackEs:
          'Acabas de rendirte. "Avisadme si necesitáis algo" es la respuesta más débil — el 99% de la gente nunca te llamará. Perdiste la venta antes de empezar.',
        score: 0,
      },
      {
        text: '"I completely understand! Before you go — can I show you something that takes exactly 20 seconds? You do not have to buy anything, I just love the reaction people have."',
        textEs:
          '"¡Te entiendo perfectamente! Antes de que te vayas — ¿te enseño una cosa? Son 20 segundos exactos. No tienes que comprar nada, es que me encanta la reacción de la gente."',
        feedback:
          'SOLID! You validated her "just looking" (no pressure), created curiosity with "20 seconds" (low commitment), and removed all risk with "you do not have to buy anything." The "I love the reaction" line makes it personal and hard to refuse. This is how you turn walk-aways into demos.',
        feedbackEs:
          '¡SÓLIDO! Validaste su "solo miro" (sin presión), creaste curiosidad con "20 segundos" (bajo compromiso), y eliminaste todo el riesgo con "no tienes que comprar nada". La frase "me encanta la reacción" lo hace personal y difícil de rechazar. Así es como conviertes a los que se van en demos.',
        score: 90,
      },
      {
        text: '"Wait! This is the best product we have! You need to try it!" (You grab her arm gently)',
        textEs: '"¡Espera! ¡Este es el mejor producto que tenemos! ¡Tienes que probarlo!" (La coges del brazo con suavidad)',
        feedback:
          'WAY too aggressive. Grabbing a customer and saying "you NEED to try it" triggers immediate resistance. Nobody likes to feel pressured. You just confirmed her instinct to walk away.',
        feedbackEs:
          'DEMASIADO agresivo. Coger a una clienta del brazo y decirle "TIENES que probarlo" provoca resistencia inmediata. A nadie le gusta sentirse presionado. Acabas de confirmar su instinto de alejarse.',
        score: 5,
      },
      {
        text: '"Are you shopping for anyone else today? Because this makes the perfect gift — and I will show you why in 30 seconds."',
        textEs:
          '"¿Estás comprando para alguien más hoy? Porque esto es el regalo perfecto — y te enseño por qué en 30 segundos."',
        feedback:
          'GREAT approach! The gift angle is disarming — it shifts the focus from "being sold to" to "finding a gift." The "30 seconds" sets a low time commitment. This works especially well with couples and tourists. However, it does not work for everyone — some people are not gift shopping. Solid 75%.',
        feedbackEs:
          '¡GRAN enfoque! El ángulo de regalo es desarmante — cambia el foco de "me están vendiendo" a "estoy buscando un regalo". Los "30 segundos" establecen un bajo compromiso de tiempo. Esto funciona especialmente bien con parejas y turistas. Sin embargo, no funciona para todos — algunos no están comprando regalos. Un sólido 75%.',
        score: 75,
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 2: Price Objection at 300 — Role Play
// ═════════════════════════════════════════════════════════════
const priceObjectionExercise: Exercise = {
  id: 'ex-price-objection',
  title: 'Price Objection at {currency}300',
  titleEs: 'Objeción de Precio a {currency}300',
  description:
    'The customer loves the demo but says {currency}300 is too much. Practice navigating the price ladder.',
  descriptionEs:
    'Al cliente le encanta la demo pero dice que {currency}300 es demasiado. Practica navegar la escalera de precios.',
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
      'Una mujer francesa de unos 50 años, bien vestida. Le asombró la demo de la jeringuilla — se le abrieron los ojos cuando vio el resultado. Pero ahora duda.',
    scenario:
      'Marie says: "Wow, the result is incredible... but {currency}300? That is a lot of money. I was not planning to spend that much today." She starts to hand the product back. What do you do?',
    scenarioEs:
      'Marie dice: "Wow, el resultado es increíble... pero ¿{currency}300? Eso es mucho dinero. No planeaba gastar tanto hoy." Empieza a devolverte el producto. ¿Qué haces?',
    responses: [
      {
        text: '"Okay, I understand. Maybe next time!" (You take the product back)',
        textEs: '"Vale, lo entiendo. ¡Quizás la próxima vez!" (Recoges el producto)',
        feedback:
          'You just let a hot sale walk away. She LOVED the demo — that was your strongest signal. Never accept the first "no" from someone who was amazed by the product.',
        feedbackEs:
          'Acabas de dejar ir una venta caliente. Le ENCANTÓ la demo — esa era tu señal más fuerte. Nunca aceptes el primer "no" de alguien que quedó asombrado por el producto.',
        score: 0,
      },
      {
        text: '"I completely understand — {currency}300 does sound like a lot. But let me ask you this: how much would you expect to pay in a salon in Paris for this exact same treatment? [She says {currency}400-500] Exactly. And this gives you multiple treatments at home. But let me check something for you..." (You pause, then offer) "I can do {currency}210 today — that is 30% off — and I will include a free gift of your choice: cream, cleanser, or peeling. How does that sound?"',
        textEs:
          '"Te entiendo perfectamente — {currency}300 suena a mucho. Pero te pregunto una cosa: ¿cuánto esperarías pagar en un salón de París por este mismo tratamiento? [Ella dice {currency}400-500] Exacto. Y esto te da varios tratamientos en casa. Espera, que te miro una cosa..." (Pausas, luego ofreces) "Te lo puedo hacer hoy a {currency}210 — un 30% menos — y te incluyo un regalo a elegir: crema, limpiador o peeling. ¿Qué me dices?"',
        feedback:
          'EXCELLENT! This is master-level selling. You: 1) Validated her concern, 2) Reframed the price by asking about salon costs (she answers HERSELF that it should cost more), 3) Offered Option 1 at {currency}210 (30% off) with a free gift instead of just dropping the price. You moved down the ladder correctly: {currency}300 → {currency}210 + gift.',
        feedbackEs:
          '¡EXCELENTE! Esto es venta a nivel maestro. Tú: 1) Validaste su preocupación, 2) Reformulaste el precio preguntando sobre costes de salón (ella misma responde que debería costar más), 3) Ofreciste la Opción 1 a {currency}210 (30% descuento) con regalo gratis en lugar de solo bajar el precio. Bajaste la escalera correctamente: {currency}300 → {currency}210 + regalo.',
        score: 100,
      },
      {
        text: '"No no no — {currency}300 is actually very cheap! You are getting a great deal!"',
        textEs: '"No no no — ¡{currency}300 es realmente muy barato! ¡Te estás llevando una ganga!"',
        feedback:
          'Telling a customer their objection is wrong triggers defensiveness. She said it is "a lot of money" — and for her, it IS. Arguing about it makes you the enemy. Instead, reframe the value or add more to the offer.',
        feedbackEs:
          'Decirle a una clienta que su objeción está mal la pone a la defensiva. Ella dijo que es "mucho dinero" — y para ella, LO ES. Discutir sobre ello te convierte en el enemigo. En su lugar, reformula el valor o añade más a la oferta.',
        score: 10,
      },
      {
        text: '"I hear you. What if I can do it for {currency}175? Just for you, today only."',
        textEs: '"Te entiendo. ¿Y si te lo hago por {currency}175? Solo para ti, solo hoy."',
        feedback:
          'You dropped from {currency}300 to {currency}175 without trying Offer Option 1 ({currency}210 + gift) or Option 2 ({currency}300 + 2nd syringe free). You skipped two whole steps on the price ladder! Always work the ladder: {currency}300 → {currency}210/gift → {currency}300/2nd syringe → {currency}175 → {currency}140 → {currency}100.',
        feedbackEs:
          'Bajaste de {currency}300 a {currency}175 sin probar la Opción de Oferta 1 ({currency}210 + regalo) u Opción 2 ({currency}300 + 2ª jeringuilla gratis). ¡Te saltaste dos pasos enteros en la escalera de precios! Siempre trabaja la escalera: {currency}300 → {currency}210/regalo → {currency}300/2ª jeringuilla → {currency}175 → {currency}140 → {currency}100.',
        score: 30,
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
    'A customer is buying Christmas gifts for 3 people. Guide them to the right combo.',
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
      'A Spanish woman in her 30s, looking at all products with a confused expression. She keeps going back and forth between the scrub, body butter, and nail kit.',
    customerProfileEs:
      'Una mujer española de unos 30 años, mirando todos los productos con expresión confundida. Sigue yendo de un lado a otro entre el exfoliante, la manteca corporal y el kit de uñas.',
    scenario:
      'Clara approaches you and says: "I need to buy Christmas gifts for my sister, my mom, and my best friend — three people. I want to spend around {currency}120 total. What do you recommend?"',
    scenarioEs:
      'Clara se te acerca y dice: "Necesito comprar regalos de Navidad para mi hermana, mi madre y mi mejor amiga — tres personas. Quiero gastar alrededor de {currency}120 en total. ¿Qué recomiendas?"',
    responses: [
      {
        text: '"Everything is good, just pick whatever you want!"',
        textEs: '"¡Todo está muy bien, elige lo que quieras!"',
        feedback:
          'You just abandoned her. She came to you FOR guidance. Saying "pick whatever" means you are not helping. She will likely leave overwhelmed and buy nothing.',
        feedbackEs:
          'Acabas de abandonarla. Ella ha venido a ti PARA que la guíes. Decir "elige lo que quieras" es no ayudar. Probablemente se irá abrumada y no comprará nada.',
        score: 0,
      },
      {
        text: '"Perfect — I have exactly what you need. Our Buy 2, Get 1 Free deal on Scrub and Body Butter: you pick any 3 products for {currency}120. One for your sister, one for your mom, one for your friend — and you stay right on budget. Plus I will include free gift bags for all three. Which scents would you like?"',
        textEs:
          '"Perfecto — tengo exactamente lo que necesitas. Nuestra oferta Compra 2, Lleva 1 Gratis en Exfoliante y Manteca Corporal: eliges 3 productos por {currency}120. Uno para tu hermana, uno para tu madre, uno para tu amiga — y te quedas justo en el presupuesto. Además te pongo bolsas de regalo para los tres. ¿Qué aromas quieres?"',
        feedback:
          'PERFECT! You: 1) Showed confidence ("exactly what you need"), 2) Matched her {currency}120 budget perfectly with Buy 2 Get 1 ({currency}120/3), 3) Made it personal (one for each person), 4) Added free gift bags (perceived value), 5) Asked a follow-up question ("which scents") to move toward closing. This is consultative selling at its finest.',
        feedbackEs:
          '¡PERFECTO! Tú: 1) Mostraste confianza ("exactamente lo que necesitas"), 2) Coincidiste con su presupuesto de {currency}120 perfectamente con Compra 2 Lleva 1 ({currency}120/3), 3) Lo hiciste personal (uno para cada persona), 4) Añadiste bolsas de regalo gratis (valor percibido), 5) Hiciste una pregunta de seguimiento ("qué aromas") para avanzar hacia el cierre. Esto es venta consultiva en su máxima expresión.',
        score: 100,
      },
      {
        text: '"Get three Nail Kits at {currency}60 each — {currency}180 total. One for everyone!"',
        textEs: '"¡Llévate tres Kits de Uñas a {currency}60 cada uno — {currency}180 en total! ¡Uno para cada una!"',
        feedback:
          'You exceeded her {currency}120 budget by {currency}60 without even acknowledging it! She said {currency}120 total. Always respect the customer\'s stated budget and work within it. Three Nail Kits on Buy 2 Get 1 would be {currency}120/3 — that would have worked.',
        feedbackEs:
          '¡Excediste su presupuesto de {currency}120 en {currency}60 sin siquiera reconocerlo! Ella dijo {currency}120 en total. Respeta siempre el presupuesto indicado del cliente y trabaja dentro de él. Tres Kits de Uñas en Compra 2 Lleva 1 serían {currency}120/3 — eso habría funcionado.',
        score: 20,
      },
      {
        text: '"The scrub is really popular. Your mom and sister would both love it. Two scrubs for {currency}60 — done!"',
        textEs: '"El exfoliante se vende muchísimo. A tu madre y a tu hermana les encantaría. Dos exfoliantes por {currency}60 — ¡listo!"',
        feedback:
          'Decent but missed a huge opportunity. She needs THREE gifts for {currency}120. You sold two scrubs for {currency}60 when you could have sold 3 products for {currency}120 with Buy 2 Get 1. Also, you did not create any emotional connection. Functional but not great.',
        feedbackEs:
          'Decente pero perdió una gran oportunidad. Ella necesita TRES regalos por {currency}120. Vendiste dos exfoliantes por {currency}60 cuando podrías haber vendido 3 productos por {currency}120 con Compra 2 Lleva 1. Además, no creaste ninguna conexión emocional. Funcional pero no genial.',
        score: 40,
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 4: Syringe Price Ladder Drill
// Ladder (numbers only — see src/data/pricing.ts): 500 -> 300 -> 210/gift -> 300/2nd -> 175 -> 140 -> 100
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
    currentPrice: 'Europe price: {currency}500',
    customerReaction:
      'Customer nods but says "That IS expensive in Europe." They are waiting for you to continue.',
    customerReactionEs:
      'El cliente asiente pero dice "Eso SÍ es caro en Europa." Están esperando a que sigas.',
    options: [
      {
        text: 'Drop immediately to the absolute minimum of {currency}100',
        textEs: 'Bajar inmediatamente al mínimo absoluto de {currency}100',
        correct: false,
        explanation:
          'Too fast! You skipped the {locationName} base price ({currency}300), Offer Option 1 ({currency}210 + gift), Offer Option 2 ({currency}300 + 2nd syringe free), the adaptive fallback ({currency}175), AND the voucher close ({currency}140). You just gave away all your margin.',
        explanationEs:
          '¡Demasiado rápido! Te saltaste el precio base de {locationName} ({currency}300), la Opción de Oferta 1 ({currency}210 + regalo), la Opción de Oferta 2 ({currency}300 + 2ª jeringuilla gratis), la reserva adaptativa ({currency}175) Y el cierre con vale ({currency}140). Acabas de regalar todo tu margen.',
      },
      {
        text: 'Reveal the {locationName} price: "Here in {locationName}, it is only {currency}300 — a fraction of what you would pay in Paris."',
        textEs:
          'Revelar el precio de {locationName}: "Aquí en {locationName}, es solo {currency}300 — una fracción de lo que pagarías en París."',
        correct: true,
        explanation:
          'Correct! The flow is: Europe anchor ({currency}500) → {locationName} base ({currency}300) → Offer Option 1 ({currency}210 + gift) or Option 2 ({currency}300 + 2nd syringe) → adaptive ({currency}175) → voucher ({currency}140) → minimum ({currency}100). You are on step 2.',
        explanationEs:
          '¡Correcto! El flujo es: Anclaje de Europa ({currency}500) → Base de {locationName} ({currency}300) → Opción de Oferta 1 ({currency}210 + regalo) u Opción 2 ({currency}300 + 2ª jeringuilla) → adaptativo ({currency}175) → vale ({currency}140) → mínimo ({currency}100). Estás en el paso 2.',
      },
      {
        text: 'Tell them the product is out of stock',
        textEs: 'Decirles que el producto está agotado',
        correct: false,
        explanation: 'Why would you lie about stock? They are interested and engaged. This makes no sense.',
        explanationEs: '¿Por qué mentirías sobre el stock? Están interesados y comprometidos. Esto no tiene sentido.',
      },
      {
        text: 'Immediately push the two-for-one offer without mentioning {currency}300',
        textEs: 'Empujar inmediatamente la oferta de dos por uno sin mencionar {currency}300',
        correct: false,
        explanation:
          'You skipped a step! The customer needs to hear the {currency}300 {locationName} base price first to appreciate the value of the {currency}300 + 2nd syringe free offer. Without the anchor, the offer has no context.',
        explanationEs:
          '¡Te saltaste un paso! El cliente necesita oír el precio base de {locationName} de {currency}300 primero para apreciar el valor de la oferta de {currency}300 + 2ª jeringuilla gratis. Sin el anclaje, la oferta no tiene contexto.',
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 5: Peeling Price Ladder Drill
// Ladder (numbers only — see src/data/pricing.ts): 200 -> 150 -> 100/scrub -> 150/cream -> 70 -> 50
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
    currentPrice: '{locationName} base: {currency}150',
    customerReaction:
      'Customer says "Hmm, {currency}150 is still quite a lot. I like the idea of the peeling but..." She trails off, looking uncertain.',
    customerReactionEs:
      'La cliente dice "Hmm, {currency}150 es todavía bastante. Me gusta la idea del peeling pero..." Se queda en silencio, pareciendo insegura.',
    options: [
      {
        text: 'Offer Option 1: "I can do {currency}100 for the peeling — that is 50% off the Europe price of {currency}200 — and I will include a free Dead Sea Body Scrub gift."',
        textEs: 'Ofrecer Opción 1: "Puedo hacer {currency}100 por el peeling — eso es 50% descuento del precio europeo de {currency}200 — e incluiré un regalo gratis de Exfoliante Corporal del Mar Muerto."',
        correct: true,
        explanation:
          'Correct! After the {locationName} base ({currency}150), Offer Option 1 is {currency}100 (50% off the {currency}200 Europe price) + free Dead Sea Body Scrub gift. This is a powerful value presentation that drops the price AND adds value.',
        explanationEs:
          '¡Correcto! Después de la base de {locationName} ({currency}150), la Opción de Oferta 1 es {currency}100 (50% descuento del precio europeo de {currency}200) + regalo gratis de Exfoliante Corporal del Mar Muerto. Esta es una presentación de valor poderosa que baja el precio Y añade valor.',
      },
      {
        text: 'Immediately drop to the voucher price of {currency}50',
        textEs: 'Bajar inmediatamente al precio de vale de {currency}50',
        correct: false,
        explanation:
          'Too fast! You skipped Offer Option 1 ({currency}100 + scrub gift), Offer Option 2 ({currency}150 + Day & Night Cream free), AND the adaptive fallback ({currency}70). Work the ladder step by step.',
        explanationEs:
          '¡Demasiado rápido! Te saltaste la Opción de Oferta 1 ({currency}100 + regalo exfoliante), la Opción de Oferta 2 ({currency}150 + Crema Día y Noche gratis) Y la reserva adaptativa ({currency}70). Trabaja la escalera paso a paso.',
      },
      {
        text: 'Tell them {currency}150 is the lowest you can go',
        textEs: 'Decirles que {currency}150 es lo más bajo que puedes bajar',
        correct: false,
        explanation:
          'Wrong! You have more tools in your toolbox. Offer Option 1 ({currency}100 + scrub), Option 2 ({currency}150 + cream), adaptive ({currency}70), and voucher close ({currency}50) are all still available. Never claim a price is your lowest when it is not.',
        explanationEs:
          '¡Incorrecto! Tienes más herramientas en tu caja de herramientas. La Opción de Oferta 1 ({currency}100 + exfoliante), Opción 2 ({currency}150 + crema), adaptativo ({currency}70) y cierre con vale ({currency}50) todavía están disponibles. Nunca digas que un precio es tu mínimo cuando no lo es.',
      },
      {
        text: 'Offer Option 2: "At {currency}150 I will include our Day & Night Cream completely free — that is a {currency}60 value on top of your peeling."',
        textEs: 'Ofrecer Opción 2: "A {currency}150 incluiré nuestra Crema Día y Noche completamente gratis — eso son {currency}60 de regalo encima de tu peeling."',
        correct: false,
        explanation:
          'Option 2 maintains the {currency}150 price by adding the Day & Night Cream free. But the customer already signaled hesitation at {currency}150 — she needs a price DROP, not just added value. Option 1 ({currency}100 + scrub) would be the better first move here.',
        explanationEs:
          'La Opción 2 mantiene el precio de {currency}150 añadiendo la Crema Día y Noche gratis. Pero la cliente ya mostró duda en {currency}150 — necesita una BAJADA de precio, no solo valor añadido. La Opción 1 ({currency}100 + exfoliante) sería el mejor primer movimiento aquí.',
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
          'The second they look at you, you have three seconds to raise the sample, close the distance and speak. Hesitate and the look is gone.',
        definitionEs:
          'En cuanto te miran, tienes tres segundos para levantar la muestra, acortar la distancia y hablar. Si dudas, la mirada se te escapa.',
      },
      {
        term: 'Europe Price Anchor',
        termEs: 'Anclaje de Precio de Europa',
        definition:
          'Start by mentioning the high European price ({currency}500 for syringe, {currency}200 for peeling, {currency}80 for scrub/butter/nail kit) to make the {locationName} price feel like a bargain.',
        definitionEs:
          'Empieza mencionando el alto precio europeo ({currency}500 para jeringuilla, {currency}200 para peeling, {currency}80 para exfoliante/manteca/kit de uñas) para que el precio de {locationName} parezca una ganga.',
      },
      {
        term: 'Two-Choice Close',
        termEs: 'Cierre de Dos Opciones',
        definition:
          'Present two positive options that both lead to a sale, such as "one syringe at {currency}210 with gift, or two syringes at {currency}300 with the second free."',
        definitionEs:
          'Presenta dos opciones positivas que ambas llevan a una venta, como "una jeringuilla a {currency}210 con regalo, o dos jeringuillas a {currency}300 con la segunda gratis."',
      },
      {
        term: 'Voucher Close',
        termEs: 'Cierre con Vale',
        definition:
          'A one-time voucher played as the last push BEFORE the floor: {currency}140 on the syringe, {currency}50 on the peeling. The syringe still has {currency}100 underneath it. Mix & Match has no voucher rung.',
        definitionEs:
          'Un cupón de una sola vez que juegas como último empujón ANTES del mínimo: {currency}140 en la jeringuilla, {currency}50 en el peeling. La jeringuilla todavía tiene {currency}100 por debajo. Mix & Match no tiene peldaño de cupón.',
      },
      {
        term: 'Minimum / Floor',
        termEs: 'Mínimo / Suelo',
        definition:
          'The last-resort price you never cross: {currency}100 for the syringe, {currency}50 for the peeling, {currency}30 for scrub/nail kit. Only when the customer is genuinely walking away.',
        definitionEs:
          'El precio de último recurso que nunca cruzas: {currency}100 para jeringuilla, {currency}50 para peeling, {currency}30 para exfoliante/kit uñas. Solo cuando el cliente realmente se está yendo.',
      },
      {
        term: 'Assumptive Close',
        termEs: 'Cierre Asumido',
        definition:
          'Act as if the sale is already made and move to the next step: "I will set this aside for you — do you want the gift bag?"',
        definitionEs:
          'Actúa como si la venta ya estuviera hecha y pasa al siguiente paso: "Te lo voy apartando — ¿te lo pongo en bolsa de regalo?"',
      },
      {
        term: 'Social Proof',
        termEs: 'Prueba Social',
        definition:
          'Using testimonials, sales numbers, or crowd behavior to influence the buying decision.',
        definitionEs:
          'Usar testimonios, cifras de ventas o lo que hace el resto de la gente para influir en la decisión de compra.',
      },
      {
        term: 'Adaptive Pricing',
        termEs: 'Precio Adaptativo',
        definition:
          'Reading customer signals (clothes, engagement, reactions) and tailoring your offer to match their budget and interest.',
        definitionEs:
          'Leer las señales del cliente (ropa, interés, reacciones) y adaptar tu oferta a su presupuesto y a sus ganas.',
      },
      {
        term: 'Reciprocity (Cialdini)',
        termEs: 'Reciprocidad (Cialdini)',
        definition:
          'Giving something first (demo, sample, compliment) makes people feel obliged to give back — often with a purchase.',
        definitionEs:
          'Dar algo primero (demo, muestra, cumplido) hace que la gente se sienta obligada a devolver el favor — a menudo con una compra.',
      },
    ],
  },
};

// ═════════════════════════════════════════════════════════════
// EXERCISE 7: Order the Syringe Pitch — Ordering
// ═════════════════════════════════════════════════════════════
const orderPitchExercise: Exercise = {
  id: 'ex-order-pitch',
  title: 'Order the Syringe Pitch',
  titleEs: 'Ordena el Pitch de Jeringuilla',
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
          'Parar al cliente con un gancho de curiosidad: "¿Te enseño una cosa increíble? Son 30 segundos."',
        correctOrder: 1,
      },
      {
        text: 'Demo on ONE eye only. Then hand them the mirror and point them at the untreated eye so they compare the two themselves.',
        textEs:
          'Hacer la demo en UN SOLO ojo. Luego darle el espejo y señalarle el ojo sin tratar para que compare los dos por su cuenta.',
        correctOrder: 2,
      },
      {
        text: 'Anchor the value with the Europe price: "In Paris or London, this treatment costs {currency}500 per session."',
        textEs:
          'Anclar el valor con el precio de Europa: "En París o Londres, este tratamiento cuesta {currency}500 por sesión."',
        correctOrder: 3,
      },
      {
        text: 'Reveal the {locationName} price: "Here, it is just {currency}300 — and you get multiple treatments."',
        textEs:
          'Revelar el precio de {locationName}: "Aquí son solo {currency}300 — y te llevas varios tratamientos."',
        correctOrder: 4,
      },
      {
        text: 'If they hesitate, offer Option 1 ({currency}210 + free gift) or Option 2 ({currency}300 + 2nd syringe free).',
        textEs: 'Si dudan, ofrecer Opción 1 ({currency}210 + regalo gratis) u Opción 2 ({currency}300 + 2ª jeringuilla gratis).',
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
  titleEs: 'Marido Escéptico',
  description:
    'The wife is interested but the husband thinks it is a scam. Win them both over.',
  descriptionEs:
    'A ella le interesa pero el marido cree que es una estafa. Convence a los dos.',
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
      'Margaret dice "¡Oh, es increíble! ¡Mira, John, la arruga desapareció!" John responde: "A mí me parece un truco. Estos sitios siempre intentan estafar a turistas. ¿Cómo sabemos que no es solo maquillaje?" Margaret empieza a retroceder. ¿Qué haces?',
    responses: [
      {
        text: '"Sir, this is definitely NOT makeup. It is a professional treatment. You can trust us."',
        textEs:
          '"Que no, que esto NO es maquillaje. Es un tratamiento profesional. Puedes fiarte de nosotros."',
        feedback:
          '"You can trust us" is the LEAST trustworthy thing you can say. A skeptical person needs PROOF, not claims. You just sounded defensive, which confirms his suspicion.',
        feedbackEs:
          '"Puede confiar en nosotros" es lo MENOS confiable que puedes decir. Una persona escéptica necesita PRUEBAS, no afirmaciones. Acabas de sonar defensivo, lo que confirma su sospecha.',
        score: 10,
      },
      {
        text: '"Sir, I completely understand your skepticism — there are a lot of gimmicks out there. Here is what I suggest: let me do the demo on YOUR hand too. That way YOU can see there is no makeup — just your own skin, 60 seconds apart. What do you say?"',
        textEs:
          '"Te entiendo perfectamente, que hay mucho cuento por ahí. Mira lo que te propongo: te hago la demo a TI, en tu mano. Así lo ves TÚ — que no hay maquillaje, es tu propia piel con 60 segundos de diferencia. ¿Qué me dices?"',
        feedback:
          'BRILLIANT! You: 1) Validated his skepticism (not defensive), 2) Agreed there are gimmicks (builds rapport), 3) Offered proof on HIS skin (undeniable evidence), 4) Made it a challenge he cannot refuse. Once he sees the result on his own hand, he becomes your ally, not your enemy.',
        feedbackEs:
          '¡BRILLANTE! Tú: 1) Validaste su escepticismo (no defensivo), 2) Le diste la razón en que hay mucho truco (creas complicidad), 3) Ofreciste prueba en SU piel (evidencia innegable), 4) Lo convertiste en un reto que no puede rechazar. Una vez que vea el resultado en su propia mano, se convierte en tu aliado, no tu enemigo.',
        score: 100,
      },
      {
        text: '"Sir, your wife loves it and she wants it. Do not ruin her experience."',
        textEs: '"A tu mujer le encanta y lo quiere. No le fastidies el momento."',
        feedback:
          'Making the husband the villain will backfire completely. Now he feels attacked AND his wife feels awkward. You created a conflict between them instead of solving his concern.',
        feedbackEs:
          'Hacer del marido el villano se te va a volver en contra. Ahora se siente atacado Y su mujer se queda incómoda. Creaste un conflicto entre ellos en lugar de resolver su preocupación.',
        score: 0,
      },
      {
        text: '"I understand, sir. Here is my card — come back if you change your mind."',
        textEs: '"Lo entiendo. Aquí tienes mi tarjeta — volved si cambiáis de opinión."',
        feedback:
          'You gave up on a hot prospect. Margaret LOVED the demo. The only barrier is John\'s skepticism, which you could have overcome with proof. Giving a card means you will likely never see them again.',
        feedbackEs:
          'Te rendiste con una venta que estaba caliente. A Margaret le ENCANTÓ la demo. La única barrera es el escepticismo de John, que podrías haber superado con pruebas. Dar una tarjeta significa que probablemente nunca los volverás a ver.',
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
    '"I already have La Mer cream" — learn the perfect response to the "I have cream" objection.',
  descriptionEs:
    '"Ya tengo crema La Mer" — aprende la respuesta perfecta a la objeción "tengo crema".',
  type: 'roleplay',
  icon: 'MessageSquare',
  xpReward: 25,
  duration: '3 min',
  durationEs: '3 min',
  content: {
    customerName: 'Elena',
    customerProfile:
      'A Spanish woman in her 40s, well-groomed. She watched the full syringe demo with interest but now seems hesitant. She carries a luxury handbag.',
    customerProfileEs:
      'Una mujer española de unos 40 años, bien arreglada. Ha visto la demo entera de la jeringuilla con interés, pero ahora parece que duda. Lleva un bolso de lujo.',
    scenario:
      'Elena says: "The result is impressive, I admit. But I already have La Mer cream at home that I use every night. It is very expensive and works well. I do not think I need another product." She starts to step away. What do you say?',
    scenarioEs:
      'Elena dice: "El resultado es impresionante, lo admito. Pero ya tengo crema La Mer en casa que uso cada noche. Es muy cara y funciona bien. No creo que necesite otro producto." Empieza a alejarse. ¿Qué dices?',
    responses: [
      {
        text: '"But this is so much better than La Mer! Cream does nothing compared to this!"',
        textEs: '"¡Pero esto es mucho mejor que La Mer! ¡La crema no hace nada comparado con esto!"',
        feedback:
          'Insulting her current product is insulting HER choice. She said it is "very expensive and works well" — you just called her judgment into question. Never tear down what a customer currently uses, especially a luxury brand they are loyal to.',
        feedbackEs:
          'Insultar su producto actual es insultar SU elección. Ella dijo que es "muy cara y funciona bien" — acabas de cuestionar su juicio. Nunca critiques lo que un cliente usa actualmente, especialmente una marca de lujo a la que es leal.',
        score: 5,
      },
      {
        text: '"I completely understand — most of our customers use La Mer or similar creams too. But here is the thing: even La Mer works on the surface. This hyaluronic acid syringe works from the inside by delivering active ingredients directly to the deeper layers. It is not replacing your La Mer — it is doing what La Mer cannot. Think of it as a monthly salon treatment you do at home. Can I show you how easy it is to use?"',
        textEs:
          '"Te entiendo perfectamente — la mayoría de nuestras clientas usan La Mer o cremas parecidas. Pero mira: hasta La Mer actúa en la superficie. Esta jeringuilla de ácido hialurónico actúa desde dentro, llevando los principios activos a las capas profundas. No sustituye a tu La Mer — hace lo que La Mer no puede. Piénsalo como un tratamiento de salón al mes, pero en tu casa. ¿Te enseño lo fácil que es de usar?"',
        feedback:
          'PERFECT response! You: 1) Validated her La Mer (no insult), 2) Educated without lecturing (surface vs deep), 3) Positioned as complementary, not replacement, 4) Used the salon comparison (familiar luxury framing), 5) Offered to show usage (low-commitment next step). This is textbook consultative selling.',
        feedbackEs:
          '¡Respuesta PERFECTA! Tú: 1) Validaste su La Mer (sin insulto), 2) Enseñaste sin dar lecciones (superficie contra profundidad), 3) La colocaste como complemento, no como sustituto, 4) Usaste la comparación con el salón, un lujo que ella ya conoce, 5) Te ofreciste a enseñarle cómo se usa (siguiente paso de bajo compromiso). Esto es venta consultiva de manual.',
        score: 100,
      },
      {
        text: '"Okay, that makes sense. Have a nice day!"',
        textEs: '"Vale, tiene sentido. ¡Que tengas buen día!"',
        feedback:
          'You accepted her objection without even trying. She was interested enough to watch the full demo and carries a luxury bag — that means she has spending power. Your job is to bridge the gap between "I have La Mer" and "I want this too."',
        feedbackEs:
          'Aceptaste su objeción sin siquiera intentarlo. Estuvo lo suficientemente interesada para ver la demo completa y lleva un bolso de lujo — eso significa que tiene poder adquisitivo. Tu trabajo es cerrar la brecha entre "tengo La Mer" y "quiero esto también."',
        score: 0,
      },
      {
        text: '"But it is only {currency}300! That is nothing for what you get — and you clearly can afford it with that bag!"',
        textEs: '"¡Pero son solo {currency}300! Eso no es nada por lo que te llevas — ¡y con ese bolso está claro que te lo puedes permitir!"',
        feedback:
          'You are arguing about price AND making assumptions about her wealth. Her objection is NOT about price — it is about needing the product when she already has a premium cream. Address the right objection! Also, commenting on her bag is invasive.',
        feedbackEs:
          'Estás discutiendo sobre precio Y haciendo suposiciones sobre su riqueza. Su objeción NO es sobre precio — es sobre necesitar el producto cuando ya tiene una crema premium. ¡Dirígete a la objeción correcta! Además, comentar sobre su bolso es invasivo.',
        score: 5,
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
          'Fuerte señal de compra. El "efecto dotación" — ya se lo están imaginando suyo. Una vez que lo sostienen, es más probable que lo compren.',
      },
      {
        term: 'Customer looks at partner repeatedly',
        termEs: 'El cliente mira a su pareja repetidamente',
        definition:
          'They are seeking permission or validation. Engage BOTH people — ask the partner for their opinion to bring them into the decision.',
        definitionEs:
          'Buscan permiso o validación. Involucra a AMBAS personas — pide la opinión de la pareja para meterla en la decisión.',
      },
      {
        term: 'Leaning in closer to see the demo',
        termEs: 'Inclinarse más cerca para ver la demo',
        definition:
          'High engagement and interest. They are invested in the outcome. This is your green light to proceed with confidence.',
        definitionEs:
          'Muy enganchados e interesados. Les importa el resultado. Esta es tu luz verde para proceder con confianza.',
      },
      {
        term: 'Crossed arms, stepping back',
        termEs: 'Brazos cruzados, dando un paso atrás',
        definition:
          'Defensive posture. They feel pressured or skeptical. Create space, lower your energy, and use curiosity-based hooks to re-engage.',
        definitionEs:
          'Postura defensiva. Se sienten presionados o escépticos. Crea espacio, baja tu energía, y y usa ganchos de curiosidad para volver a engancharlos.',
      },
      {
        term: 'Asking "How long does it last?"',
        termEs: 'Preguntar "¿Cuánto dura?"',
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
          'Distracción o desconexión. Están buscando una salida o una excusa para irse. Vuelve a engancharlos con una pregunta directa o algo que les sorprenda.',
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

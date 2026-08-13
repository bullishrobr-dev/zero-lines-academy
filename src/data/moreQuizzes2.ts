// ═══════════════════════════════════════════════════════════════════════════════
// Zero Lines Training Academy — MORE QUIZZES BATCH 2
// 5 Quizzes × 10 Questions = 50 NEW questions
// Fills critical gaps: Price Ladders, Compliment Approach, Ingredients,
// One-Eye Demo Mastery, and Tourist Psychology
// ═══════════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZ 1: PRICE LADDER MASTER
// Tests ALL price points for ALL 4 products in BOTH directions
// ═══════════════════════════════════════════════════════════════════════════════
const quizPriceLadder: GeneralQuiz = {
  id: "quiz-price-ladder",
  title: "Price Ladder Master",
  titleEs: "Maestro de Escalera de Precios",
  description:
    "Master every price point for every product — syringe, peeling, scrub, and nail kit. Know the ladder forwards and backwards to never lose a sale on price.",
  descriptionEs:
    "Domina cada punto de precio para cada producto — jeringa, peeling, scrub y kit de uñas. Conoce la escalera de ida y vuelta para nunca perder una venta por precio.",
  icon: "TrendingUp",
  category: "Pricing Strategy",
  categoryEs: "Estrategia de Precios",
  xpReward: 150,
  questions: [
    {
      question:
        "You just anchored the syringe at {currency}500. What is the NEXT price you reveal?",
      questionEs:
        "Acabas de anclar la jeringa en {currency}500. ¿Cuál es el SIGUIENTE precio que revelas?",
      options: ["{currency}210", "{currency}300", "{currency}140", "{currency}175"],
      optionsEs: ["{currency}210", "{currency}300", "{currency}140", "{currency}175"],
      correctIndex: 1,
      explanation:
        "After the {currency}500 Europe anchor, you reveal the {locationName} base price of {currency}300. This makes the customer feel they are already getting a {currency}200 discount before any negotiation begins. The gap between {currency}500 and {currency}300 sets up the entire price ladder.",
      explanationEs:
        "Después del anclaje de {currency}500 de Europa, revelas el precio base de {locationName} de {currency}300. Esto hace que la cliente sienta que ya está obteniendo un descuento de {currency}200 antes de que comience cualquier negociación. La brecha entre {currency}500 y {currency}300 prepara toda la escalera de precios."
    },
    {
      question:
        "A customer is interested at {currency}210 but still hesitates. What is the NEXT step down?",
      questionEs:
        "Una cliente está interesada en {currency}210 pero aún duda. ¿Cuál es el SIGUIENTE paso hacia abajo?",
      options: ["{currency}100", "{currency}140", "{currency}175", "{currency}300"],
      optionsEs: ["{currency}100", "{currency}140", "{currency}175", "{currency}300"],
      correctIndex: 2,
      explanation:
        "The syringe price ladder is: {currency}500 → {currency}300 → {currency}210 → {currency}175 → {currency}140 → {currency}100. From {currency}210, the next step down is {currency}175. Each step should feel like a special deal you're creating just for them.",
      explanationEs:
        "La escalera de precios de la jeringa es: {currency}500 → {currency}300 → {currency}210 → {currency}175 → {currency}140 → {currency}100. Desde {currency}210, el siguiente paso hacia abajo es {currency}175. Cada paso debe sentirse como una oferta especial que estás creando solo para ella."
    },
    {
      question:
        "What is the price IMMEDIATELY BEFORE {currency}140 on the syringe ladder?",
      questionEs:
        "¿Cuál es el precio INMEDIATAMENTE ANTES de {currency}140 en la escalera de la jeringa?",
      options: ["{currency}100", "{currency}210", "{currency}175", "{currency}300"],
      optionsEs: ["{currency}100", "{currency}210", "{currency}175", "{currency}300"],
      correctIndex: 2,
      explanation:
        "The syringe ladder steps down: {currency}500 → {currency}300 → {currency}210 → {currency}175 → {currency}140 → {currency}100. The price immediately before {currency}140 is {currency}175. You must know the ladder backwards too — when a customer asks 'Can't you do better than {currency}175?' you drop to {currency}140 with a reason like a voucher or bundle.",
      explanationEs:
        "La escalera de la jeringa baja: {currency}500 → {currency}300 → {currency}210 → {currency}175 → {currency}140 → {currency}100. El precio inmediatamente antes de {currency}140 es {currency}175. Debes conocer la escalera al revés también — cuando una cliente pregunta '¿No puedes hacer mejor que {currency}175?' bajas a {currency}140 con una razón como un vale o paquete."
    },
    {
      question:
        "What is the FINAL minimum price for the syringe when nothing else works?",
      questionEs:
        "¿Cuál es el precio mínimo FINAL de la jeringa cuando nada más funciona?",
      options: ["{currency}140", "{currency}175", "{currency}210", "{currency}100"],
      optionsEs: ["{currency}140", "{currency}175", "{currency}210", "{currency}100"],
      correctIndex: 3,
      explanation:
        "{currency}100 is the floor, and it is the one rung a seller does not own. You walk the ladder yourself as far as the voucher at {currency}140 — gift off, then the voucher, one voucher only. Below that you go full market and call a manager, because the floor coming from somebody else is what makes it a floor. Jump straight there on your own and she learns your numbers move whenever she leans, which means you never had a last price at all.",
      explanationEs:
        "{currency}100 es el suelo, y es el único escalón que no lleva el vendedor. La escalera la bajas tú hasta el cupón de {currency}140 — quitas el regalo, luego el cupón, un solo cupón. Por debajo vas a mercado total y llamas a un encargado, porque que el suelo lo ponga otro es justo lo que lo hace suelo. Si saltas ahí tú solo, aprende que tus números se mueven cada vez que aprieta, o sea que nunca tuviste último precio — el recorrido por la escalera construye valor percibido en cada paso."
    },
    {
      question:
        "The facial peeling opens at {currency}200. What is the NEXT price drop?",
      questionEs:
        "El peeling facial abre en {currency}200. ¿Cuál es el SIGUIENTE descenso de precio?",
      options: ["{currency}150", "{currency}70", "{currency}100", "{currency}50"],
      optionsEs: ["{currency}150", "{currency}70", "{currency}100", "{currency}50"],
      correctIndex: 0,
      explanation:
        "The peeling price ladder is: {currency}200 → {currency}150 → {currency}100 → {currency}70 → {currency}50. After the {currency}200 anchor, you drop to {currency}150 (the '{locationName} price'). Each step feels like an exclusive deal, but you're simply following the ladder.",
      explanationEs:
        "La escalera de precios del peeling es: {currency}200 → {currency}150 → {currency}100 → {currency}70 → {currency}50. Después del anclaje de {currency}200, bajas a {currency}150 (el 'precio de {locationName}'). Cada paso se siente como una oferta exclusiva, pero simplemente estás siguiendo la escalera."
    },
    {
      question:
        "You offered the peeling at {currency}100. The customer asks for a better deal. What is your next price?",
      questionEs:
        "Ofreciste el peeling en {currency}100. La cliente pide un mejor precio. ¿Cuál es tu siguiente precio?",
      options: ["{currency}50", "{currency}150", "{currency}35", "{currency}70"],
      optionsEs: ["{currency}50", "{currency}150", "{currency}35", "{currency}70"],
      correctIndex: 3,
      explanation:
        "The peeling ladder is: {currency}200 → {currency}150 → {currency}100 → {currency}70 → {currency}50. From {currency}100, the next step down is {currency}70 — and the reason is already built into the rung: the Dead Sea Scrub that came free with Offer 1 goes back, and you hand her its {currency}30 value as credit. {currency}100 minus {currency}30 is {currency}70. Never let a price fall on its own with no story attached. A number that just drops tells her you were making them up, and then she pushes for the next one.",
      explanationEs:
        "La escalera del peeling es: {currency}200 → {currency}150 → {currency}100 → {currency}70 → {currency}50. Desde {currency}100, el siguiente paso hacia abajo es {currency}70 — y el motivo ya viene dentro del escalón: el Exfoliante del Mar Muerto que iba de regalo con la Oferta 1 vuelve, y le devuelves sus {currency}30 como crédito. {currency}100 menos {currency}30 son {currency}70. Nunca dejes que un precio caiga solo, sin una historia detrás. Un número que baja porque sí le está diciendo que te los inventas, y entonces va a por el siguiente."
    },
    {
      question:
        "What is the SCRUB price when sold ALONE (not in a combo)?",
      questionEs:
        "¿Cuál es el precio del SCRUB cuando se vende SOLO (no en combo)?",
      options: ["{currency}60", "{currency}50", "{currency}30", "{currency}80"],
      optionsEs: ["{currency}60", "{currency}50", "{currency}30", "{currency}80"],
      correctIndex: 0,
      explanation:
        "A single Dead Sea salt scrub is {currency}60 — the same base price as the Body Butter and the Nail Kit, because all three share one ladder: {currency}80 Europe anchor, {currency}60 base, {currency}30 absolute floor. {currency}30 is the walking-away rung, not your opening number, so quote {currency}60 first and let Buy 1 Get 1 ({currency}60 for two) do the work.",
      explanationEs:
        "Un Exfoliante de sal del Mar Muerto individual son {currency}60 — el mismo precio base que el Body Butter y el Kit de Uñas, porque los tres comparten una escalera: {currency}80 de ancla europea, {currency}60 de base, {currency}30 de mínimo absoluto. Los {currency}30 son el escalón de 'se está yendo', no tu número de salida, así que di {currency}60 primero y deja que el Compra 1 Lleva 1 ({currency}60 por dos) haga el trabajo."
    },
    {
      question:
        "A customer wants the Peeling AND the Dead Sea Scrub. What do you quote, and why is it not a sum?",
      questionEs:
        "Una clienta quiere el Peeling Y el Exfoliante del Mar Muerto. ¿Qué le dices, y por qué no es una suma?",
      options: [
        "{currency}210 — the Peeling base plus a full-price Scrub added on top",
        "{currency}280 — the two products at their separate Europe anchor prices",
        "{currency}100 — Offer 1 on the Peeling, with the Scrub included as the gift",
        "{currency}50 — the Peeling voucher price, and the Scrub goes in free with it"
      ],
      optionsEs: [
        "{currency}210 — la base del Peeling más un Exfoliante a precio completo encima",
        "{currency}280 — los dos productos a sus precios ancla de Europa por separado",
        "{currency}100 — la Oferta 1 del Peeling, con el Exfoliante incluido de regalo",
        "{currency}50 — el precio con cupón del Peeling, y el Exfoliante entra gratis con él"
      ],
      correctIndex: 2,
      explanation:
        "You never add these two up. Offer 1 on the Peeling IS the combo: {currency}100 for the Peeling with the Dead Sea Scrub as its gift. Since the Scrub on its own is {currency}60, the customer walks away with {currency}160 of product for {currency}100 — a saving you can state out loud because it is real. The {currency}50 rung is the voucher close and it applies to the single Peeling only, never with a gift attached.",
      explanationEs:
        "Estos dos nunca se suman. La Oferta 1 del Peeling ES el combo: {currency}100 por el Peeling con el Exfoliante del Mar Muerto de regalo. Como el Exfoliante solo son {currency}60, la clienta se lleva {currency}160 de producto por {currency}100 — un ahorro que puedes decir en voz alta porque es real. El escalón de {currency}50 es el cierre con cupón y solo vale para el Peeling individual, nunca con regalo."
    },
    {
      question:
        "What is the price of a single Nail Kit (buffer, file, cuticle oil and cream)?",
      questionEs:
        "¿Cuál es el precio de un Kit de Uñas individual (lima, pulidor, aceite de cutículas y crema)?",
      options: ["{currency}30", "{currency}45", "{currency}80", "{currency}60"],
      optionsEs: ["{currency}30", "{currency}45", "{currency}80", "{currency}60"],
      correctIndex: 3,
      explanation:
        "The Nail Kit is {currency}60 — exactly the same as the Scrub and the Body Butter, because the three of them are one mix-and-match family on one ladder ({currency}80 anchor, {currency}60 base, {currency}30 floor). {currency}80 is the Europe anchor you quote first, and {currency}30 is the final push, not an opening price. They combine freely: a Nail Kit plus a Scrub is a Buy 1 Get 1 at {currency}60.",
      explanationEs:
        "El Kit de Uñas son {currency}60 — exactamente igual que el Exfoliante y el Body Butter, porque los tres son una sola familia de mezcla y combinación en una sola escalera ({currency}80 de ancla, {currency}60 de base, {currency}30 de mínimo). Los {currency}80 son el ancla de Europa que dices primero, y los {currency}30 son el empujón final, no un precio de salida. Se combinan libremente: un Kit de Uñas más un Exfoliante es un Compra 1 Lleva 1 por {currency}60."
    },
    {
      question:
        "A customer is at {currency}140 for the syringe and asks you, once, for one more discount. What is your move?",
      questionEs:
        "Una cliente está en {currency}140 por la jeringa y te pide, una vez, un descuento más. ¿Qué haces?",
      options: [
        "Give her the {currency}100 floor there and then — she asked for it, a sale at the bottom rung is still a sale, and you would rather bank it than lose it",
        "Hold {currency}140 and trade instead: 'That IS my voucher price. But pay me cash and I will drop a Scrub in the bag'",
        "Tell her the price is the price, that there is honestly nothing at all you can do for her, and then just wait",
        "Let her go — she has walked you down four rungs already and there is nothing left in this one for the shop"
      ],
      optionsEs: [
        "Darle el suelo de {currency}100 ahí mismo — te lo ha pedido, una venta en el último escalón sigue siendo una venta, y prefieres cobrarla a perderla del todo",
        "Aguantar {currency}140 y cambiar de moneda: 'Ese ES mi precio con cupón. Pero págame en efectivo y te meto un Exfoliante en la bolsa'",
        "Decirle que el precio es el precio, que de verdad no puedes hacer nada más por ella, y quedarte esperando",
        "Dejarla ir — ya te ha bajado cuatro escalones y a la tienda no le queda nada en esta venta"
      ],
      correctIndex: 1,
      explanation:
        "She has asked ONCE. One ask does not buy a {currency}40 drop. Make her ask twice before you move once, or you have taught her that the numbers fall every time she pushes — and she will push all the way down. So the first answer at {currency}140 is not a number at all, it is a trade: cash, a second product, something extra in the bag. {currency}100 is a floor, not a step. It exists for the customer who is genuinely walking out of that door, and it is the last thing you say, never the second.",
      explanationEs:
        "Te lo ha pedido UNA vez. Una petición no compra una bajada de {currency}40. Que te lo pida dos veces antes de moverte una, o le habrás enseñado que los números caen cada vez que empuja — y va a empujar hasta abajo. Así que la primera respuesta en {currency}140 no es un número, es un intercambio: efectivo, un segundo producto, algo más en la bolsa. {currency}100 es un suelo, no un escalón. Existe para la clienta que se está yendo de verdad por esa puerta, y es lo último que dices, nunca lo segundo."
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZ 2: THE COMPLIMENT STOP
// Compliment-based approach technique: specific vs generic, delivery, transitions
// ═══════════════════════════════════════════════════════════════════════════════
const quizComplimentStop: GeneralQuiz = {
  id: "quiz-compliment-stop",
  title: "The Compliment Stop",
  titleEs: "La Parada del Cumplido",
  description:
    "Master the art of the compliment approach — specific vs generic, genuine delivery, reading reactions, and transitioning smoothly into the product pitch without feeling fake.",
  descriptionEs:
    "Domina el arte del acercamiento por cumplido — específico vs genérico, entrega genuina, leer reacciones y transicionar suavemente al pitch del producto sin sentirse falso.",
  icon: "Heart",
  category: "Approach Techniques",
  categoryEs: "Técnicas de Acercamiento",
  xpReward: 150,
  questions: [
    {
      question:
        "Which compliment is MORE likely to stop a woman and create genuine engagement?",
      questionEs:
        "¿Qué cumplido es MÁS probable que detenga a una mujer y cree conexión genuina?",
      options: [
        "Wow, your skin is glowing — what do you use?",
        "You look beautiful today",
        "Nice dress, where did you buy it?",
        "You have a lovely smile"
      ],
      optionsEs: [
        "Wow, tu piel está radiante — ¿qué usas?",
        "Te ves hermosa hoy",
        "Bonito vestido, ¿dónde lo compraste?",
        "Tienes una sonrisa encantadora"
      ],
      correctIndex: 0,
      explanation:
        "Specific compliments about skin, eyes, or features directly related to beauty products are FAR more effective than generic ones. 'Your skin is glowing — what do you use?' does two things: it compliments AND creates a natural opening to introduce your product as the secret they have been missing.",
      explanationEs:
        "Los cumplidos específicos sobre piel, ojos o rasgos directamente relacionados con productos de belleza son MUCHO más efectivos que los genéricos. 'Tu piel está radiante — ¿qué usas?' hace dos cosas: cumplimenta Y crea una apertura natural para introducir tu producto como el secreto que les ha faltado."
    },
    {
      question:
        "You give a compliment and the woman smiles briefly but keeps walking. What should you do?",
      questionEs:
        "Das un cumplido y la mujer sonríe brevemente pero sigue caminando. ¿Qué debes hacer?",
      options: [
        "Let her go — the smile was just politeness and she has already decided",
        "Fall in beside her, match her pace and carry on talking as you walk",
        "Get in front of her and stand in her way so that she has to stop",
        "Move in with the sample and go straight into the rush line"
      ],
      optionsEs: [
        "Dejarla ir — la sonrisa era pura educación y ya lo ha decidido",
        "Ponerte a su lado, igualar su paso y seguir hablando mientras andáis",
        "Adelantarla y plantarte en medio para que tenga que pararse",
        "Acercarte con la muestra y entrar directo con lo de la prisa"
      ],
      correctIndex: 3,
      explanation:
        "A quick smile IS the look, and the look is the only thing you were waiting for. Now you move: close the distance, sample up, and go straight in — \"Listen, I know you're in a rush — but can I ask you something really quick? It's just that you look so good, I have to ask what you normally use on your skin.\" What you never do is fall in beside her and walk her down the floor. You do not walk next to people. You say your piece, and later it is you who walks first and she who follows.",
      explanationEs:
        "Una sonrisa rápida ES la mirada, y la mirada es lo único que estabas esperando. Ahora te mueves: acortas la distancia, muestra en alto, y directo — \"Mira, sé que vas con prisa — ¿pero te puedo preguntar una cosa rapidísima? Es que te veo tan bien que tengo que preguntarte qué usas normalmente para la piel.\" Lo que no haces nunca es ponerte a su lado y acompañarla pasillo abajo. Al lado de la gente no se anda. Dices lo tuyo, y luego el que anda primero eres tú y la que sigue es ella."
    },
    {
      question:
        "A woman responds to your compliment with 'Oh, I look terrible today.' What is your BEST response?",
      questionEs:
        "Una mujer responde a tu cumplido con 'Oh, hoy me veo terrible.' ¿Cuál es tu MEJOR respuesta?",
      options: [
        "No you don't, you look great!",
        "You are too hard on yourself",
        "Ignore the comment and start your product pitch",
        "That is exactly why I stopped you — I have something that will help"
      ],
      optionsEs: [
        "No es cierto, te ves genial",
        "Eres muy dura contigo misma",
        "Ignorar el comentario y empezar tu pitch de producto",
        "Eso es exactamente por qué te detuve — tengo algo que ayudará"
      ],
      correctIndex: 3,
      explanation:
        "When someone dismisses your compliment, they are opening a door about their insecurities. 'That is exactly why I stopped you — I have something that will help' pivots their self-doubt directly into curiosity about your product. This is a powerful psychological transition that feels natural, not pushy.",
      explanationEs:
        "Cuando alguien rechaza tu cumplido, está abriendo una puerta sobre sus inseguridades. 'Eso es exactamente por qué te detuve — tengo algo que ayudará' pivota su autodesconfianza directamente hacia la curiosidad sobre tu producto. Esta es una transición psicológica poderosa que se siente natural, no agresiva."
    },
    {
      question:
        "When does a compliment-based approach ACTUALLY backfire?",
      questionEs:
        "¿Cuándo fracasa DE VERDAD un acercamiento con cumplido?",
      options: [
        "When she is walking fast, or on her phone, or has her husband with her — all three are the wrong person to spend a good opener on",
        "When you do not mean it. A flat compliment you do not believe reads as a line, and she has heard that line four times already today",
        "When she is with a partner, because he will feel got at and pull her out of it before you have finished your second sentence",
        "When you compliment something she chose herself — her nails, her bag — because that sounds like you are only being polite about her taste"
      ],
      optionsEs: [
        "Cuando va rápido, o al teléfono, o con el marido — las tres son la persona equivocada para gastar una buena entrada",
        "Cuando no te lo crees. Un cumplido plano que no sientes suena a frase hecha, y ella ya la ha oído cuatro veces hoy",
        "Cuando va con pareja, porque él se lo va a tomar a mal y se la va a llevar antes de que acabes la segunda frase",
        "Cuando le halagas algo que ha elegido ella — las uñas, el bolso — porque suena a que solo estás siendo educado con su gusto"
      ],
      correctIndex: 1,
      explanation:
        "The compliment fails on delivery, not on the target. As a beginner you stop everybody, for the practice — filtering by walking pace, phone or company just means you stop nobody. And the husband is not a reason to walk away: you bring him IN first, every time, and only turn everything on her if he is genuinely bad energy.",
      explanationEs:
        "El cumplido falla en cómo lo dices, no en a quién. De novato paras a todo el mundo, por practicar — filtrar por el ritmo, el móvil o con quién va solo significa que no paras a nadie. Y el marido no es motivo para irte: lo metes DENTRO primero, siempre, y solo se lo das todo a ella si él trae muy mala energía."
    },
    {
      question:
        "You compliment a woman's eyebrows and she lights up, explaining she just had them done. What is your next move?",
      questionEs:
        "Cumplimentas las cejas de una mujer y se ilumina, explicando que acaba de hacerlas. ¿Cuál es tu siguiente movimiento?",
      options: [
        "Tell her they look expensive and walk away",
        "Ask where she got them done and talk about brows",
        "Connect her brow investment to her skincare investment",
        "Compliment something else about her"
      ],
      optionsEs: [
        "Decirle que se ven caras e irte",
        "Preguntar dónde se las hizo y hablar de cejas",
        "Conectar su inversión en cejas a inversión en cuidado de piel",
        "Cumplimentar algo más de ella"
      ],
      correctIndex: 2,
      explanation:
        "She just revealed she INVESTS in her appearance — this is a hot prospect. Connect the dots: 'You clearly care about how you look, and beautiful brows deserve beautiful skin to frame them. Let me show you something that takes 2 minutes and you'll see the difference instantly.' She already spends money on beauty; you are offering the next logical step.",
      explanationEs:
        "Acaba de revelar que INVIERTE en su apariencia — esta es una prospecto caliente. Conecta los puntos: 'Claramente te importa cómo te ves, y unas cejas hermosas merecen una piel hermosa para enmarcarlas. Déjame mostrarte algo que toma 2 minutos y verás la diferencia al instante.' Ella ya gasta en belleza; le estás ofreciendo el siguiente paso lógico."
    },
    {
      question:
        "What makes a compliment feel GENUINE rather than fake or salesy?",
      questionEs:
        "¿Qué hace que un cumplido se sienta GENUINO en lugar de falso o de vendedor?",
      options: [
        "Using fancy words and a dramatic delivery so the compliment stands out from everything else she hears",
        "Complimenting every woman the same way, so you get faster at it and never have to think on your feet",
        "Saying it loudly so the people around her hear it too and she feels flattered in front of them",
        "Noticing something specific and mentioning it spontaneously"
      ],
      optionsEs: [
        "Usar palabras elegantes y una entrega dramática para que el cumplido destaque sobre todo lo que oye",
        "Cumplimentar a cada mujer igual, así te vuelves más rápida y nunca tienes que improvisar",
        "Decirlo alto para que también lo oiga la gente de alrededor y ella se sienta halagada delante de ellos",
        "Notar algo específico y mencionarlo espontáneamente"
      ],
      correctIndex: 3,
      explanation:
        "Genuine compliments are OBSERVATION-based, not script-based. Notice her unique freckles, the way her eyes sparkle, her natural lip color, or the smoothness of her hands. The more SPECIFIC and UNEXPECTED the compliment, the more she feels SEEN rather than targeted. Train yourself to find one unique thing about every person before you speak.",
      explanationEs:
        "Los cumplidos genuinos se basan en OBSERVACIÓN, no en guion. Nota sus pecas únicas, la forma en que sus ojos brillan, su color natural de labios o la suavidad de sus manos. Mientras más ESPECÍFICO e INESPERADO sea el cumplido, más se sentirá VISTA en lugar de apuntada. Entrénate para encontrar algo único en cada persona antes de hablar."
    },
    {
      question:
        "A woman gives you a suspicious look after your compliment. What does this body language mean?",
      questionEs:
        "Una mujer te da una mirada suspicious después de tu cumplido. ¿Qué significa este lenguaje corporal?",
      options: [
        "She is about to buy — push harder and name the price now, because suspicion is really hesitation before a yes",
        "She did not hear you — repeat the compliment louder and closer so it lands properly this time",
        "She thinks you are trying to sell her something — disarm her",
        "She wants you to compliment her more, so keep going with a second and third compliment until she smiles"
      ],
      optionsEs: [
        "Está a punto de comprar — presiona más y di el precio ya, porque la sospecha es duda antes de un sí",
        "No te ha oído — repite el cumplido más alto y más cerca para que le llegue bien esta vez",
        "Cree que estás tratando de venderle algo — desarmarla",
        "Quiere más cumplidos, así que sigue con un segundo y un tercero hasta que sonría"
      ],
      correctIndex: 2,
      explanation:
        "A suspicious look means her sales-defense wall is up. She has been approached by sellers before. Disarm her by being TRANSPARENT: 'I know, I know — you think I'm going to try to sell you something. And you're right, I am. But only because this actually works, and I want to show you why. Two minutes, then you decide.' Honesty about selling defuses suspicion better than pretending you are not selling.",
      explanationEs:
        "Una mirada suspicious significa que su muro de defensa contra vendedores está arriba. Ha sido abordada por vendedores antes. Desarmarla siendo TRANSPARENTE: 'Lo sé, lo sé — crees que voy a tratar de venderte algo. Y tienes razón, lo haré. Pero solo porque esto realmente funciona, y quiero mostrarte por qué. Dos minutos, luego tú decides.' La honestidad sobre vender desactiva la suspicacia mejor que fingir que no estás vendiendo."
    },
    {
      question:
        "After the compliment lands well, what is the BEST transition phrase to move toward the product?",
      questionEs:
        "Después de que el cumplido funciona bien, ¿cuál es la MEJOR frase de transición hacia el producto?",
      options: [
        "Speaking of beauty, let me show you something",
        "The reason I noticed is because I'm a skincare specialist",
        "By the way, can I ask you something?",
        "All of the above work depending on the moment"
      ],
      optionsEs: [
        "Hablando de belleza, déjame mostrarte algo",
        "La razón por la que noté es porque soy especialista en cuidado de piel",
        "Por cierto, ¿te puedo preguntar algo?",
        "Todas las anteriores funcionan dependiendo del momento"
      ],
      correctIndex: 3,
      explanation:
        "There is no single 'best' transition — the best one is the one that feels NATURAL in that moment. 'Speaking of beauty' connects the compliment. 'The reason I noticed' builds authority. 'Can I ask you something?' creates curiosity. The key is FLUIDITY — your transition should feel like a conversation, not a script change. Practice all three so you can adapt instantly.",
      explanationEs:
        "No hay una transición 'mejor' única — la mejor es la que se siente NATURAL en ese momento. 'Hablando de belleza' conecta el cumplido. 'La razón por la que noté' construye autoridad. '¿Te puedo preguntar algo?' crea curiosidad. La clave es FLUIDEZ — tu transición debe sentirse como conversación, no como cambio de guion. Practica las tres para poder adaptarte al instante."
    },
    {
      question:
        "You compliment a woman who is with two friends. One friend rolls her eyes. What do you do?",
      questionEs:
        "Cumplimentas a una mujer que está con dos amigas. Una amiga pone los ojos en blanco. ¿Qué haces?",
      options: [
        "Ignore the friend and focus only on your target",
        "Include ALL three with a group compliment",
        "Confront the eye-rolling friend directly",
        "Walk away — the group is lost"
      ],
      optionsEs: [
        "Ignorar a la amiga y enfocarte solo en tu objetivo",
        "Incluir a las TRES con un cumplido grupal",
        "Confrontar directamente a la amiga que puso los ojos en blanco",
        "Irte — el grupo está perdido"
      ],
      correctIndex: 1,
      explanation:
        "The eye-rolling friend is a GATEKEEPER — if she is against you, she will poison the sale. Win her over by including her: 'And you ladies too, your skin looks amazing — are you all on vacation together?' A group compliment neutralizes the skeptic and turns a potential obstacle into an audience. Once the group is engaged, the original target becomes more comfortable.",
      explanationEs:
        "La amiga de ojos en blanco es una GUARDAESPALDAS — si está en contra, envenenará la venta. Gánatela incluyéndola: 'Y vosotras también, tenéis una piel increíble — ¿estáis todas de vacaciones juntas?' Un cumplido grupal neutraliza a la escéptica y convierte un obstáculo potencial en audiencia. Una vez que el grupo está comprometido, la objetivo original se siente más cómoda."
    },
    {
      question:
        "Which follow-up after a compliment creates the strongest sense of EXCLUSIVITY?",
      questionEs:
        "¿Qué seguimiento después de un cumplido crea el mayor sentido de EXCLUSIVIDAD?",
      options: [
        "This product is very popular and it is the one thing everybody asks for when they walk past the table",
        "We sell hundreds of these every day, so you can be sure you are not the first person to trust us with it",
        "I don't usually stop people, but your skin caught my eye",
        "Everyone is buying this and we have already been through most of what came in this morning"
      ],
      optionsEs: [
        "Este producto es muy popular y es lo que todo el mundo pide al pasar por delante de la mesa",
        "Vendemos cientos de estos cada día, así que puedes estar segura de que no eres la primera que confía en nosotros",
        "No suelo detener a la gente, pero tu piel me llamó la atención",
        "Todo el mundo está comprando esto y ya nos hemos ventilado casi todo lo que llegó esta mañana"
      ],
      correctIndex: 2,
      explanation:
        "'I don't usually stop people, but your skin caught my eye' makes her feel SPECIAL, not targeted. It frames the interaction as a UNIQUE moment rather than a routine sales pitch. Exclusivity is a powerful psychological trigger — people value things more when they feel the opportunity was crafted just for them. Avoid 'everyone is buying this' — it makes her feel like a number.",
      explanationEs:
        "'No suelo detener a la gente, pero tu piel me llamó la atención' la hace sentir ESPECIAL, no apuntada. Enmarca la interacción como un momento ÚNICO en lugar de un pitch de ventas rutinario. La exclusividad es un poderoso disparador psicológico — la gente valora más las cosas cuando siente que la oportunidad fue creada solo para ellos. Evita 'todos están comprando esto' — la hace sentir como un número."
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZ 3: PRODUCT INGREDIENT EXPERT
// What's IN the products: hyaluronic acid, glycolic acid, Dead Sea minerals
// ═══════════════════════════════════════════════════════════════════════════════
const quizIngredients: GeneralQuiz = {
  id: "quiz-ingredients",
  title: "Product Ingredient Expert",
  titleEs: "Experto en Ingredientes de Productos",
  description:
    "Know exactly what is in our products and why it matters. When customers ask about ingredients, your confident answer builds trust and justifies the price.",
  descriptionEs:
    "Sabe exactamente qué hay en nuestros productos y por qué importa. Cuando los clientes preguntan sobre ingredientes, tu respuesta confiada construye confianza y justifica el precio.",
  icon: "FlaskConical",
  category: "Product Knowledge",
  categoryEs: "Conocimiento de Producto",
  xpReward: 150,
  questions: [
    {
      question:
        "Hyaluronic acid can hold how many times its weight in water?",
      questionEs:
        "¿El ácido hialurónico puede retener cuántas veces su peso en agua?",
      options: ["100x", "500x", "50x", "1000x"],
      optionsEs: ["100x", "500x", "50x", "1000x"],
      correctIndex: 3,
      explanation:
        "Hyaluronic acid holds 1000 times its weight in water. This is the key fact that makes the syringe so powerful — it literally fills wrinkles from within by hydrating and plumping the skin at a cellular level. When a customer understands this, {currency}300 feels like a bargain compared to Botox.",
      explanationEs:
        "El ácido hialurónico retiene 1000 veces su peso en agua. Este es el dato clave que hace la jeringa tan poderosa — literalmente llena las arrugas desde adentro al hidratar y rellenar la piel a nivel celular. Cuando una clienta entiende esto, {currency}300 se siente como una ganga comparado con el Botox."
    },
    {
      question:
        "Glycolic acid is which type of exfoliating acid?",
      questionEs:
        "¿El ácido glicólico es qué tipo de ácido exfoliante?",
      options: ["BHA (Beta Hydroxy Acid)", "PHA (Poly Hydroxy Acid)", "AHA (Alpha Hydroxy Acid)", "Salicylic acid"],
      optionsEs: ["BHA (Ácido Beta Hidroxi)", "PHA (Ácido Poli Hidroxi)", "AHA (Ácido Alfa Hidroxi)", "Ácido Salicílico"],
      correctIndex: 2,
      explanation:
        "Glycolic acid is an AHA (Alpha Hydroxy Acid). It works on the SURFACE of the skin to dissolve dead skin cells and reveal the fresh, new layer underneath. This is why the peeling product creates that instant glow — it is literally removing the dull, dead layer. BHAs like salicylic acid work deeper in pores, which is not what our peeling does.",
      explanationEs:
        "El ácido glicólico es un AHA (Ácido Alfa Hidroxi). Funciona en la SUPERFICIE de la piel para disolver las células muertas y revelar la capa fresca y nueva debajo. Por eso el peeling crea ese brillo instantáneo — literalmente está removiendo la capa opaca y muerta. Los BHA como el ácido salicílico funcionan más profundo en los poros, que no es lo que nuestro peeling hace."
    },
    {
      question:
        "The Dead Sea contains which of these key minerals?",
      questionEs:
        "¿El Mar Muerto contiene cuál de estos minerales clave?",
      options: [
        "Magnesium, Calcium, Potassium, Bromide",
        "Gold, Silver, Copper",
        "Iron, Zinc, Lead",
        "Sodium, Chlorine, Fluoride"
      ],
      optionsEs: [
        "Magnesio, Calcio, Potasio, Bromuro",
        "Oro, Plata, Cobre",
        "Hierro, Zinc, Plomo",
        "Sodio, Cloro, Fluoruro"
      ],
      correctIndex: 0,
      explanation:
        "The Dead Sea is rich in Magnesium, Calcium, Potassium, and Bromide — 21 minerals in total, 12 of which are found nowhere else on Earth. These minerals have been used for therapeutic and beauty purposes for thousands of years. Our products harness these minerals to nourish, detoxify, and rejuvenate the skin naturally.",
      explanationEs:
        "El Mar Muerto es rico en Magnesio, Calcio, Potasio y Bromuro — 21 minerales en total, 12 de los cuales no se encuentran en ningún otro lugar de la Tierra. Estos minerales se han usado con fines terapéuticos y de belleza por miles de años. Nuestros productos aprovechan estos minerales para nutrir, desintoxicar y rejuvenecer la piel naturalmente."
    },
    {
      question:
        "Why is the 'Clean, Pure, Conscious' positioning important when selling?",
      questionEs:
        "¿Por qué es importante el posicionamiento 'Limpio, Puro, Consciente' al vender?",
      options: [
        "It allows us to charge higher prices, because anything labelled clean carries a premium in every market",
        "It is just a marketing slogan with no real meaning, so use it early and move on to the ingredients that matter",
        "Modern customers actively avoid harsh chemicals and want transparency about ingredients",
        "It only matters to vegan customers, so save it for anyone who asks about animal testing first"
      ],
      optionsEs: [
        "Nos permite cobrar precios más altos, porque todo lo etiquetado como limpio tiene un sobreprecio en cualquier mercado",
        "Es solo un eslogan de marketing sin significado real, así que dilo pronto y pasa a los ingredientes que importan",
        "Los clientes modernos evitan activamente químicos agresivos y quieren transparencia sobre ingredientes",
        "Solo les importa a los clientes veganos, así que guárdalo para quien pregunte antes por el testeo en animales"
      ],
      correctIndex: 2,
      explanation:
        "'Clean, Pure, Conscious' speaks to the #1 concern of modern beauty buyers: ingredient safety. More customers than ever read labels, research online, and reject products with parabens, sulfates, and synthetic fragrances. When you say our products are 'clean' and based on NATURAL Dead Sea minerals, you remove a major objection before it even arises.",
      explanationEs:
        "'Limpio, Puro, Consciente' habla a la preocupación #1 de los compradores modernos de belleza: seguridad de ingredientes. Más clientes que nunca leen etiquetas, investigan en línea y rechazan productos con parabenos, sulfatos y fragancias sintéticas. Cuando dices que nuestros productos son 'limpios' y basados en minerales NATURALES del Mar Muerto, eliminas una objeción mayor antes de que surja."
    },
    {
      question:
        "A customer says 'But I already use hyaluronic acid serum from the pharmacy.' What is your BEST response?",
      questionEs:
        "Una cliente dice 'Pero ya uso suero de ácido hialurónico de la farmacia.' ¿Cuál es tu MEJOR respuesta?",
      options: [
        "Those serums don't work at all — you could rub water on your face and get the same result from them",
        "Stop using that and use ours instead — there is no point layering two products that are trying to do the same job",
        "They are all the same, ours just costs more because of the packaging and the brand behind it",
        "Pharmacy serums are mostly water with trace amounts — our formula is medical-grade concentration"
      ],
      optionsEs: [
        "Esos sueros no funcionan nada — te frotas agua en la cara y consigues lo mismo que con ellos",
        "Deja de usar eso y usa el nuestro — no tiene sentido superponer dos productos que intentan hacer lo mismo",
        "Todos son iguales, el nuestro solo cuesta más por el envase y por la marca que hay detrás",
        "Los sueros de farmacia son mayormente agua con trazas — nuestra fórmula es concentración de grado médico"
      ],
      correctIndex: 3,
      explanation:
        "Never insult what a customer already uses — that puts them on the defensive. Instead, EDUCATE: pharmacy serums typically contain 0.5-1% hyaluronic acid diluted in a water base. Our formula uses medical-grade concentration with additional Dead Sea mineral complexes that boost absorption. The one-eye demo proves the difference in 2 minutes — words are nothing compared to what she sees in the mirror.",
      explanationEs:
        "Nunca insultes lo que la cliente ya usa — eso la pone a la defensiva. En su lugar, EDUCA: los sueros de farmacia típicamente contienen 0.5-1% de ácido hialurónico diluido en base de agua. Nuestra fórmula usa concentración de grado médico con complejos adicionales de minerales del Mar Muerto que potencian la absorción. La demo de un ojo prueba la diferencia en 2 minutos — las palabras no son nada comparado con lo que ella ve en el espejo."
    },
    {
      question:
        "What does glycolic acid actually DO to the skin during the peeling treatment?",
      questionEs:
        "¿Qué hace realmente el ácido glicólico a la piel durante el tratamiento de peeling?",
      options: [
        "Adds colour and tint to the skin so it looks brighter straight after the treatment",
        "Dissolves the bonds between dead skin cells to reveal fresh skin",
        "Creates a protective layer over the skin that seals in moisture for the rest of the day",
        "Increases the skin's own oil production so it stays naturally moisturised for longer"
      ],
      optionsEs: [
        "Añade color y tono a la piel para que se vea más luminosa justo después del tratamiento",
        "Disuelve los enlaces entre células muertas para revelar piel fresca",
        "Crea una capa protectora sobre la piel que retiene la hidratación durante el resto del día",
        "Aumenta la producción natural de grasa de la piel para que se mantenga hidratada más tiempo"
      ],
      correctIndex: 1,
      explanation:
        "Glycolic acid works by dissolving the 'glue' that holds dead skin cells together on the surface. As you apply it, these dead cells gently lift away, revealing the newer, brighter, smoother skin underneath. This is why the peeling demo shows INSTANT results — you are literally removing the dull outer layer in real time.",
      explanationEs:
        "El ácido glicólico funciona disolviendo el 'pegamento' que mantiene unidas las células muertas en la superficie. Al aplicarlo, estas células muertas se levantan suavemente, revelando la piel más nueva, brillante y suave debajo. Por eso la demo de peeling muestra resultados INSTANTÁNEOS — literalmente estás removiendo la capa opaca exterior en tiempo real."
    },
    {
      question:
        "Which mineral from the Dead Sea helps CALM irritated skin?",
      questionEs:
        "¿Qué mineral del Mar Muerto ayuda a CALMAR la piel irritada?",
      options: ["Calcium", "Potassium", "Magnesium", "Bromide"],
      optionsEs: ["Calcio", "Potasio", "Magnesio", "Bromuro"],
      correctIndex: 3,
      explanation:
        "Bromide is the natural calming mineral found in Dead Sea minerals. It soothes irritation, reduces redness, and has a natural relaxing effect on skin cells. This is why our products are excellent for sensitive skin types — the bromide content helps prevent the irritation that chemical-based products often cause.",
      explanationEs:
        "El bromuro es el mineral calmante natural encontrado en los minerales del Mar Muerto. Calma la irritación, reduce el enrojecimiento y tiene un efecto relajante natural en las células de la piel. Por eso nuestros productos son excelentes para tipos de piel sensibles — el contenido de bromuro ayuda a prevenir la irritación que los productos basados en químicos a menudo causan."
    },
    {
      question:
        "A tourist asks 'Are these products tested on animals?' What is the CORRECT answer?",
      questionEs:
        "Un turista pregunta '¿Estos productos se prueban en animales?' ¿Cuál es la respuesta CORRECTA?",
      options: [
        "Yes, but only on safe animals",
        "I am not sure, probably not",
        "All cosmetics are tested on animals by law",
        "No — our products are cruelty-free and not tested on animals"
      ],
      optionsEs: [
        "Sí, pero solo en animales seguros",
        "No estoy seguro, probablemente no",
        "Todos los cosméticos se prueban en animales por ley",
        "No — nuestros productos son libres de crueldad y no se prueban en animales"
      ],
      correctIndex: 3,
      explanation:
        "Our products are cruelty-free — NEVER tested on animals. This is a major selling point for many customers, especially from regions with strong ethical consumer preferences. Answer with CONFIDENCE and immediacy: 'Absolutely not. Our products are cruelty-free, clean, and conscious. That is part of why I love representing this brand.' A clear ethical stance builds deep trust.",
      explanationEs:
        "Nuestros productos son libres de crueldad — NUNCA se prueban en animales. Este es un punto de venta importante para muchos clientes, especialmente de regiones con fuertes preferencias de consumo ético. Responde con CONFIANZA e inmediatez: 'Absolutamente no. Nuestros productos son libres de crueldad, limpios y conscientes. Eso es parte de por qué amo representar esta marca.' Una postura ética clara construye confianza profunda."
    },
    {
      question:
        "What is the key difference between our hyaluronic acid syringe and Botox injections?",
      questionEs:
        "¿Cuál es la diferencia clave entre nuestra jeringa de ácido hialurónico y las inyecciones de Botox?",
      options: [
        "Botox is cheaper per treatment once you account for how long each session lasts",
        "Botox paralyzes muscles; our HA hydrates and plumps naturally from within",
        "There is no difference, they do the same thing — ours is simply the version you can apply yourself",
        "Botox is more natural because it is administered by a doctor in a controlled dose"
      ],
      optionsEs: [
        "El Botox sale más barato por sesión si tienes en cuenta lo que dura cada tratamiento",
        "El Botox paraliza músculos; nuestro AH hidrata y rellena naturalmente desde adentro",
        "No hay diferencia, hacen lo mismo — el nuestro es simplemente la versión que puedes aplicarte tú",
        "El Botox es más natural porque lo administra un médico en una dosis controlada"
      ],
      correctIndex: 1,
      explanation:
        "This distinction is CRUCIAL: Botox is a toxin that paralyzes facial muscles to reduce wrinkles. Our hyaluronic acid is a NATURAL substance that hydrates and plumps the skin from within, filling wrinkles without any paralysis or toxic effects. Position it as 'the natural alternative to Botox' — same visible results, no needles, no toxins, no frozen face.",
      explanationEs:
        "Esta distinción es CRUCIAL: el Botox es una toxina que paraliza los músculos faciales para reducir arrugas. Nuestro ácido hialurónico es una sustancia NATURAL que hidrata y rellena la piel desde adentro, llenando arrugas sin parálisis ni efectos tóxicos. Posiciónalo como 'la alternativa natural al Botox' — mismos resultados visibles, sin agujas, sin toxinas, sin cara congelada."
    },
    {
      question:
        "Why do we emphasize that our products come from the Dead Sea specifically?",
      questionEs:
        "¿Por qué enfatizamos que nuestros productos vienen específicamente del Mar Muerto?",
      options: [
        "It sounds exotic and mysterious, and an unusual origin story is what makes a customer remember the product later",
        "The Dead Sea is the saltiest water on earth, and people have been travelling there for their skin for as long as anyone can remember",
        "It is the cheapest place to source minerals, which is how we can sell a professional product at a street price",
        "It is the only place with water that salty, so no other producer anywhere is able to make a comparable product"
      ],
      optionsEs: [
        "Suena exótico y misterioso, y una historia de origen poco común es lo que hace que la clienta recuerde el producto",
        "El Mar Muerto es el agua más salada del planeta, y la gente lleva viajando allí por su piel desde que nadie recuerda",
        "Es el sitio más barato para conseguir minerales, que es como podemos vender un producto profesional a precio de calle",
        "Es el único lugar con agua tan salada, así que ningún otro fabricante puede hacer un producto comparable"
      ],
      correctIndex: 1,
      explanation:
        "The Dead Sea sits at the lowest point on Earth and has a mineral concentration of 34% — far saltier than the sea. For centuries people have travelled there for their skin, and that history is what separates our products from generic 'mineral' creams. Say where the minerals come from and what they do for skin — never name an illness the product is supposed to treat. The Dead Sea name carries all the authority you need on its own.",
      explanationEs:
        "El Mar Muerto se encuentra en el punto más bajo de la Tierra y tiene una concentración mineral del 34% — mucho más salado que el mar. Durante siglos la gente ha viajado allí por su piel, y esa historia es lo que separa nuestros productos de las cremas 'minerales' genéricas. Di de dónde salen los minerales y qué le hacen a la piel — no nombres nunca una enfermedad que el producto vaya a tratar. El nombre del Mar Muerto ya lleva toda la autoridad que necesitas."
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZ 4: THE ONE-EYE DEMO
// The signature syringe demonstration technique
// ═══════════════════════════════════════════════════════════════════════════════
const quizOneEyeDemo: GeneralQuiz = {
  id: "quiz-one-eye-demo",
  title: "The One-Eye Demo",
  titleEs: "La Demo de Un Ojo",
  description:
    "Master the signature one-eye demonstration — the most powerful closing tool in your kit. Learn timing, pressure, what to say, and how to transition from mirror reveal to sale.",
  descriptionEs:
    "Domina la demostración de un ojo — la herramienta de cierre más poderosa en tu kit. Aprende el tiempo, presión, qué decir y cómo transicionar de la revelación en el espejo a la venta.",
  icon: "Eye",
  category: "Demo Technique",
  categoryEs: "Técnica de Demostración",
  xpReward: 150,
  questions: [
    {
      question:
        "Why do we apply the syringe demo to ONE eye only (not both)?",
      questionEs:
        "¿Por qué aplicamos la demo de la jeringa en UN SOLO ojo (no en ambos)?",
      options: [
        "The contrast between treated and untreated eye is the most powerful visual sales tool",
        "We only have enough product for one eye per customer, so we always start with whichever side she points at",
        "It takes too long to do both eyes on the street, and a demo over three minutes loses the customer's attention",
        "Customers only care about one eye because that is the side they check first when they look in a mirror"
      ],
      optionsEs: [
        "El contraste entre el ojo tratado y el no tratado es la herramienta de venta visual más poderosa",
        "Solo tenemos producto suficiente para un ojo por clienta, así que empezamos por el lado que ella señale",
        "Se tarda demasiado en hacer los dos ojos en la calle, y una demo de más de tres minutos pierde la atención",
        "A las clientas solo les importa un ojo porque es el lado que miran primero cuando se ven en el espejo"
      ],
      correctIndex: 0,
      explanation:
        "The one-eye demo creates a DRAMATIC before/after contrast that the customer sees with her OWN eyes in the mirror. When one eye looks lifted, smooth, and bright while the other shows wrinkles and tiredness, the visual proof is undeniable. The mirror becomes your best salesperson — no words needed.",
      explanationEs:
        "La demo de un ojo crea un contraste dramático antes/después que la cliente ve con sus PROPIOS ojos en el espejo. Cuando un ojo se ve levantado, suave y brillante mientras el otro muestra arrugas y cansancio, la prueba visual es innegable. El espejo se convierte en tu mejor vendedor — no se necesitan palabras."
    },
    {
      question:
        "How long should the one-eye demo application take?",
      questionEs:
        "¿Cuánto tiempo debe tomar la aplicación de la demo de un ojo?",
      options: ["30 seconds", "2 minutes", "5 minutes", "10 minutes"],
      optionsEs: ["30 segundos", "2 minutos", "5 minutos", "10 minutos"],
      correctIndex: 1,
      explanation:
        "The ideal demo time is approximately 2 minutes. This includes application, gentle massage, and the 'setting' period. Any shorter and the product hasn't had time to work visually. Any longer and you lose the customer's attention and sense of instant gratification. Two minutes creates the perfect 'wow' reveal.",
      explanationEs:
        "El tiempo ideal de demo es aproximadamente 2 minutos. Esto incluye aplicación, masaje suave y el período de 'fijación'. Más corto y el producto no ha tenido tiempo de funcionar visualmente. Más largo y pierdes la atención de la cliente y el sentido de gratificación instantánea. Dos minutos crean la revelación 'wow' perfecta."
    },
    {
      question:
        "During the demo, the customer looks in the mirror and says 'I don't really see a difference.' What is your FIRST move?",
      questionEs:
        "Durante la demo, la cliente se mira en el espejo y dice 'No veo mucha diferencia.' ¿Cuál es tu PRIMER movimiento?",
      options: [
        "Apply more product immediately so the difference becomes obvious enough for her to accept",
        "Ask her to turn her head to the side and look at the crow's feet area specifically",
        "Tell her she is wrong and the difference is obvious to everyone else standing at the table",
        "Give up on the demo and offer a discount instead, so the price does the work the mirror did not"
      ],
      optionsEs: [
        "Aplicar más producto de inmediato para que la diferencia sea lo bastante obvia como para aceptarla",
        "Pedirle que gire la cabeza hacia el lado y mire específicamente las patas de gallo",
        "Decirle que se equivoca y que la diferencia es obvia para todos los que están en la mesa",
        "Rendirte con la demo y ofrecer un descuento, para que el precio haga lo que no hizo el espejo"
      ],
      correctIndex: 1,
      explanation:
        "Most customers look straight ahead, but wrinkles are most visible at the CROW'S FEET (outer corners). Guide her: 'Turn your head slightly this way and look right here at the corner — see how this side has those lines, and this side is smooth?' Helping her SEE the specific difference is your job — the result is there, she just needs to know where to look.",
      explanationEs:
        "La mayoría de las clientes miran hacia adelante, pero las arrugas son más visibles en las PATAS DE GALLO (esquinas externas). Guíala: 'Gira la cabeza ligeramente de este lado y mira justo aquí en la esquina — ¿ves cómo este lado tiene esas líneas, y este lado está suave?' Ayudarla a VER la diferencia específica es tu trabajo — el resultado está ahí, solo necesita saber dónde mirar."
    },
    {
      question:
        "What TYPE of pressure should you use when massaging the product during the one-eye demo?",
      questionEs:
        "¿Qué tipo de presión debes usar al masajear el producto durante la demo de un ojo?",
      options: [
        "Hard, deep pressure to push the product in",
        "Circular rubbing like washing your face",
        "No pressure — just let it sit on the surface",
        "Light, upward, gentle tapping motions"
      ],
      optionsEs: [
        "Presión fuerte y profunda para empujar el producto",
        "Frotación circular como al lavarte la cara",
        "Sin presión — solo dejarlo sobre la superficie",
        "Movimientos ligeros, hacia arriba, de toque suave"
      ],
      correctIndex: 3,
      explanation:
        "Always use LIGHT, UPWARD, GENTLE tapping or sweeping motions. The eye area skin is the thinnest and most delicate on the face — about 0.5mm thick. Hard pressure damages skin, creates redness, and actually works AGAINST the product. Upward motions also counteract gravity (which pulls down), giving a subtle lifting effect during the demo.",
      explanationEs:
        "Usa siempre movimientos LIGEROS, HACIA ARRIBA, de toque suave. La piel del área de los ojos es la más delgada y delicada del rostro — aproximadamente 0.5mm de grosor. La presión fuerte daña la piel, crea enrojecimiento y en realidad trabaja EN CONTRA del producto. Los movimientos hacia arriba también contrarrestan la gravedad (que tira hacia abajo), dando un efecto sutil de lifting durante la demo."
    },
    {
      question:
        "What should you NEVER say during the one-eye demo?",
      questionEs:
        "¿Qué NUNCA debes decir durante la demo de un ojo?",
      options: [
        "This will completely remove all your wrinkles permanently",
        "This takes about 2 minutes to work, so give it a moment before you look in the mirror",
        "Look at the difference in the mirror and compare that side with the one I have not touched",
        "You can feel the product working — that slight tightening is exactly what it should do"
      ],
      optionsEs: [
        "Esto eliminará completamente todas tus arrugas permanentemente",
        "Esto tarda unos 2 minutos en hacer efecto, así que dale un momento antes de mirarte al espejo",
        "Mira la diferencia en el espejo y compara ese lado con el que no he tocado",
        "Puedes notar el producto trabajando — esa ligera tirantez es justo lo que tiene que hacer"
      ],
      correctIndex: 0,
      explanation:
        "NEVER make permanent or exaggerated claims. Our products give visible, temporary results that IMPROVE with continued use — but no cosmetic product 'completely removes all wrinkles permanently.' Overpromising destroys trust and leads to refunds. Underpromise and overdeliver: 'You will see a visible difference today, and with daily use the results keep getting better.'",
      explanationEs:
        "NUNCA hagas afirmaciones permanentes o exageradas. Nuestros productos dan resultados visibles y temporales que MEJORAN con uso continuo — pero ningún producto cosmético 'elimina completamente todas las arrugas permanentemente.' Prometer de más destruye la confianza y lleva a reembolsos. Promete menos y entrega más: 'Verás una diferencia visible hoy, y con uso diario los resultados siguen mejorando.'"
    },
    {
      question:
        "At what point in the demo do you hand the customer the mirror?",
      questionEs:
        "¿En qué momento de la demo le entregas el espejo a la cliente?",
      options: [
        "Before you start applying the product, so she can watch the whole thing happen in real time",
        "After you have applied, massaged, and allowed the product to set for about 2 minutes",
        "While you are still applying the product, so she sees the change appear under your fingers",
        "After she has already agreed to buy, as the confirmation that she made the right decision"
      ],
      optionsEs: [
        "Antes de empezar a aplicar el producto, para que vea todo el proceso en tiempo real",
        "Después de haber aplicado, masajeado y permitido que el producto se fije por unos 2 minutos",
        "Mientras sigues aplicando el producto, para que vea el cambio aparecer bajo tus dedos",
        "Después de que ya haya aceptado comprar, como confirmación de que ha acertado"
      ],
      correctIndex: 1,
      explanation:
        "Timing the mirror reveal is EVERYTHING. Apply the product, massage gently, then let it set while you chat. After about 2 minutes, hand her the mirror and guide her comparison: 'Look at this eye... now look at the other one. Do you see how this side is lifted and smooth?' The build-up creates anticipation, and the visual payoff triggers the emotional 'yes' moment.",
      explanationEs:
        "El tiempo de la revelación en el espejo lo es TODO. Aplica el producto, masajea suavemente, luego déjalo fijar mientras conversas. Después de unos 2 minutos, entrégale el espejo y guía su comparación: 'Mira este ojo... ahora mira el otro. ¿Ves cómo este lado está levantado y suave?' La preparación crea anticipación, y el resultado visual dispara el momento emocional de 'sí'."
    },
    {
      question:
        "The customer sees the difference and says 'Wow, that really works!' What is your NEXT line?",
      questionEs:
        "La cliente ve la diferencia y dice '¡Wow, eso realmente funciona!' ¿Cuál es tu SIGUIENTE frase?",
      options: [
        "Great! That will be {currency}300 please — shall I wrap it while you get your card out?",
        "Should I do the other eye too, so you can walk out of here with both sides matching?",
        "I told you it would work! Everyone reacts exactly like that the first time they see it",
        "I know, right? Imagine using it daily for 30 days — let me show you the price options"
      ],
      optionsEs: [
        "¡Genial! Son {currency}300 por favor — ¿te lo envuelvo mientras sacas la tarjeta?",
        "¿Te hago el otro ojo también, para que salgas de aquí con los dos lados iguales?",
        "¡Te dije que funcionaría! Todo el mundo reacciona igual la primera vez que lo ve",
        "¿Verdad? Imagina usarlo diario por 30 días — déjame mostrarte las opciones de precio"
      ],
      correctIndex: 3,
      explanation:
        "The 'wow' moment is your GREEN LIGHT to close. Capitalize on her excitement by EXPANDING the vision: 'Imagine using it daily for 30 days' takes her from a 2-minute demo to a long-term beauty investment. Then immediately transition to pricing before the excitement fades. Energy and momentum are everything — strike while the iron is hot.",
      explanationEs:
        "El momento 'wow' es tu LUZ VERDE para cerrar. Capitaliza su emoción EXPANDIENDO la visión: 'Imagina usarlo diario por 30 días' la lleva de una demo de 2 minutos a una inversión de belleza a largo plazo. Luego transiciona inmediatamente a precios antes de que la emoción se desvanezca. La energía y el momentum lo son todo — hierro caliente, golpea fuerte."
    },
    {
      question:
        "She asks, BEFORE buying: 'Do the other eye so I can see the full result.' What do you say?",
      questionEs:
        "Te pide, ANTES de comprar: 'Hazme el otro ojo para ver el resultado completo.' ¿Qué le dices?",
      options: [
        "\"The full result happens at home with daily use\" — keep the contrast and move her along to the price",
        "Do it right there. She asked, she is enjoying it, and refusing anything at this point puts the sale at risk",
        "\"If you buy it, I'll do the other one, yeah?\" — condition it on the purchase",
        "Say you are not allowed to do both eyes on the same customer, and that the rule is not really yours to bend"
      ],
      optionsEs: [
        "\"El resultado completo llega en casa con el uso diario\" — mantienes el contraste y pasas al precio",
        "Hacérselo ahí mismo. Te lo ha pedido, lo está disfrutando, y negarle algo ahora pone la venta en riesgo",
        "\"Si te lo llevas, te hago el otro, ¿vale?\" — se lo condicionas a la compra",
        "Decirle que no te dejan hacer los dos ojos a la misma clienta, y que la norma no es tuya para saltártela"
      ],
      correctIndex: 2,
      explanation:
        "Do not refuse it and do not hand it over. Condition it on the purchase — she pays, she gets it done, no argument and no theatre. The untouched eye is your best argument, so you never give your best argument away to a maybe. The one time it comes out unpaid is as the cover for the voucher: \"let me fix your other eye real quick\", and the price moves while your hands are on her face.",
      explanationEs:
        "Ni se lo niegues ni se lo regales. Condiciónalo a la compra — si paga, se lo haces, sin discusión y sin teatro. El ojo sin tocar es tu mejor argumento, y tu mejor argumento no se lo regalas a un quizá. La única vez que sale sin haber pagado es como tapadera del cupón: \"déjame arreglarte el otro ojo rapidito\", y el precio se mueve con las manos en su cara."
    },
    {
      question:
        "She is at {currency}175, she has gone quiet, and she is starting to sit forward. Move?",
      questionEs:
        "Está en {currency}175, se ha quedado callada y empieza a echarse hacia delante. ¿Jugada?",
      options: [
        "Say the price again, slower this time, and then hold the silence until she answers",
        "Go straight to the bottom of the ladder — there is nothing left above it worth trying",
        "Let her stand, see her out warmly, and leave the price sitting there for another day",
        "\"Let me fix your other eye real quick\" — and the voucher comes out while you do it"
      ],
      optionsEs: [
        "Repetir el precio, más despacio esta vez, y aguantar el silencio hasta que conteste",
        "Ir directo al fondo de la escalera — por encima ya no queda nada que merezca la pena",
        "Dejar que se levante, despedirla con cariño y dejar el precio ahí para otro día",
        "\"Déjame arreglarte el otro ojo rapidito\" — y el cupón sale mientras se lo haces"
      ],
      correctIndex: 3,
      explanation:
        "\"I never do the other eye. Sometimes, within the speech, I say to do the other eye in order to close.\" That is the whole point of it. At {currency}175, before she stands up, you start the second eye — and WHILE you are doing it the voucher comes out: down to {currency}140, single syringe only. Her face is tilted up, your hands are busy, the room feels finished, and the number moves inside a moment that is about something else entirely.",
      explanationEs:
        "\"Yo nunca hago el otro ojo. A veces, dentro del discurso, digo que se lo hago para cerrar.\" Para eso está. A {currency}175, antes de que se levante, le empiezas el segundo ojo — y MIENTRAS se lo haces sale el cupón: baja a {currency}140, solo la jeringa sola. Ella con la cara hacia arriba, tú con las manos ocupadas, la cosa parece terminada, y el número se mueve dentro de un momento que va de otra cosa completamente distinta."
    },
    {
      question:
        "What is the BEST thing to say WHILE applying the product during the demo?",
      questionEs:
        "¿Qué es lo MEJOR que decir MIENTRAS aplicas el producto durante la demo?",
      options: [
        "Talk about the product benefits and what she should feel",
        "Nothing — stay completely silent",
        "Ask about her personal life and family",
        "Explain the full price ladder step by step"
      ],
      optionsEs: [
        "Hablar sobre los beneficios del producto y lo que debería sentir",
        "Nada — mantente completamente en silencio",
        "Preguntar sobre su vida personal y familia",
        "Explicar la escalera de precios paso a paso"
      ],
      correctIndex: 0,
      explanation:
        "While applying, describe what is happening: 'You can feel it tightening slightly — that's the hyaluronic acid drawing moisture into the skin. In about 2 minutes you'll see the difference in the mirror.' This builds anticipation, educates the customer, and keeps her engaged during the waiting period. Silence feels awkward; random personal questions feel intrusive; pricing comes AFTER the reveal.",
      explanationEs:
        "Mientras aplicas, describe lo que está pasando: 'Puedes sentirlo tensar ligeramente — eso es el ácido hialurónico atrayendo humedad a la piel. En unos 2 minutos verás la diferencia en el espejo.' Esto construye anticipación, educa a la cliente y la mantiene comprometida durante el período de espera. El silencio se siente incómodo; preguntas personales aleatorias se sienten intrusivas; los precios vienen DESPUÉS de la revelación."
    },
    {
      question:
        "The demo worked perfectly and the customer is impressed. When do you mention the price?",
      questionEs:
        "La demo funcionó perfectamente y la cliente está impresionada. ¿Cuándo mencionas el precio?",
      options: [
        "Wait 10 minutes to let the excitement build more",
        "Immediately after she reacts positively to the mirror reveal",
        "Tell her the price before you even start the demo",
        "Never mention price — let her ask first"
      ],
      optionsEs: [
        "Esperar 10 minutos para dejar que la emoción se acumule más",
        "Inmediatamente después de que reacciona positivamente a la revelación en el espejo",
        "Decirle el precio antes de empezar la demo",
      "Nunca mencionar el precio — dejar que ella pregunte primero"
      ],
      correctIndex: 1,
      explanation:
        "Strike WHILE the iron is hot. The moment she sees the difference and reacts with surprise or delight, her emotional 'buying brain' is activated. THIS is when you transition: 'I know, the results are incredible. In Europe this costs {currency}500, but here in {locationName}...' Delaying lets doubt creep in. Waiting for her to ask makes you seem evasive. The mirror 'wow' is your cue to close.",
      explanationEs:
        "Golpea MIENTRAS el hierro está caliente. El momento en que ve la diferencia y reacciona con sorpresa o deleite, su 'cerebro de compra' emocional está activado. AHORA es cuando transicionas: 'Lo sé, los resultados son increíbles. En Europa esto cuesta {currency}500, pero aquí en {locationName}...' El retraso deja que la duda se cuele. Esperar a que ella pregunte te hace parecer evasivo. El 'wow' del espejo es tu señal para cerrar."
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZ 5: TOURIST PSYCHOLOGY
// Selling to tourists: the price gap against home, urgency, gift appeal, vacation mindset
// ═══════════════════════════════════════════════════════════════════════════════
const quizTouristPsych: GeneralQuiz = {
  id: "quiz-tourist-psych",
  title: "Tourist Psychology",
  titleEs: "Psicología del Turista",
  description:
    "Master the psychology of selling to tourists — the price gap against what they pay at home, vacation mindset, urgency triggers and gift appeal that make the sale irresistible.",
  descriptionEs:
    "Domina la psicología de vender a turistas — la diferencia de precio con lo que pagan en su país, mentalidad de vacaciones, disparadores de urgencia y atractivo de regalo que hacen la venta irresistible.",
  icon: "Brain",
  category: "Sales Psychology",
  categoryEs: "Psicología de Ventas",
  xpReward: 150,
  questions: [
    {
      question:
        "A British tourist mentions she is visiting from London. What is your BEST pricing angle?",
      questionEs:
        "Una turista británica menciona que visita desde Londres. ¿Cuál es tu MEJOR ángulo de precio?",
      options: [
        "Back home this is {currency}500 — here it is {currency}300, and that {currency}300 is a whole year of it",
        "This is cheaper than a coffee in London, so really you are not spending anything by the standards of where you live",
        "Everything is cheaper here because we are poorer than the UK, so your money simply stretches further while you are on holiday",
        "Don't worry about the price, just enjoy your vacation — you are only here once and you can work out the cost when you get home"
      ],
      optionsEs: [
        "En tu país esto son {currency}500 — aquí son {currency}300, y esos {currency}300 son un año entero",
        "Esto es más barato que un café en Londres, así que en realidad no estás gastando nada para lo que se paga donde vives",
        "Aquí todo es más barato porque somos más pobres que el Reino Unido, así que tu dinero cunde más mientras estás de vacaciones",
        "No te preocupes por el precio, disfruta de las vacaciones — solo estás aquí una vez y ya harás cuentas al volver a casa"
      ],
      correctIndex: 0,
      explanation:
        "Compare the price to what she would pay AT HOME, and let the two numbers do the rest — that argument is true in both of our shops. Use {currency}500, not a figure you invent on the spot: {currency}500 is the anchor every price in the ladder is read against, so shrinking it to {currency}400 shrinks every rung underneath it too. And never talk about which currency she is paying in or quote an exchange rate: you take the local currency, the amounts on your price list are the same numbers in either shop, and a seller who improvises a conversion is a seller who gets it wrong in front of the customer. Stick to what you can prove: clinic price at home, our price here.",
      explanationEs:
        "Compara el precio con lo que pagaría EN SU PAÍS y deja que las dos cifras hagan el resto — ese argumento es cierto en nuestras dos tiendas. Usa {currency}500, no una cifra que te inventes sobre la marcha: {currency}500 es el ancla contra la que se lee toda la escalera, así que encogerla a {currency}400 encoge también todos los escalones de abajo. Y nunca hables de en qué moneda paga ni improvises un tipo de cambio: tú cobras en la moneda local, las cifras de tu lista de precios son las mismas en las dos tiendas, y quien improvisa una conversión se equivoca delante de la clienta. Quédate con lo que puedes demostrar: el precio de clínica en su país, nuestro precio aquí."
    },
    {
      question:
        "A tourist says 'But I can buy skincare cheaper back home.' What is your STRONGEST response?",
      questionEs:
        "Un turista dice 'Pero puedo comprar cuidado de piel más barato en casa.' ¿Cuál es tu respuesta MÁS FUERTE?",
      options: [
        "These are exclusive Dead Sea products you cannot find in regular stores — cheaper here than a clinic at home",
        "No you can't, we are the cheapest anywhere on this coast — check the shops at home and you will come straight back",
        "Okay, well thanks for your time — if you change your mind while you are here we are open every day until eight",
        "Everything at home is overpriced anyway, which is exactly why people do all of their shopping on trips like this"
      ],
      optionsEs: [
        "Son productos exclusivos del Mar Muerto que no hay en tiendas normales — y aquí cuestan menos que en una clínica",
        "No puedes, somos los más baratos de toda la zona — mira las tiendas de tu país y volverás corriendo",
        "Bueno, gracias por tu tiempo — si cambias de idea mientras estés aquí abrimos todos los días hasta las ocho",
        "En tu país todo está inflado de todas formas, que es justo por lo que la gente hace las compras en viajes como este"
      ],
      correctIndex: 0,
      explanation:
        "Two powerful triggers in one response: EXCLUSIVITY ('you cannot find these') and the PRICE GAP (what a clinic at home charges versus what she pays here). Tourists love taking home something UNIQUE they cannot get at home — it becomes a travel souvenir AND a beauty investment. The price gap adds a rational justification to the emotional purchase.",
      explanationEs:
        "Dos disparadores poderosos en una respuesta: EXCLUSIVIDAD ('no puedes encontrar estos') y DIFERENCIA DE PRECIO (lo que cobra una clínica en su país frente a lo que paga aquí). Los turistas aman llevarse algo ÚNICO que no pueden conseguir en casa — se convierte en souvenir de viaje Y inversión de belleza. La diferencia de precio añade una justificación racional a la compra emocional."
    },
    {
      question:
        "You learn a tourist is leaving tomorrow morning. How do you use URGENCY?",
      questionEs:
        "Te enteras de que una turista se va mañana por la mañana. ¿Cómo usas la URGENCIA?",
      options: [
        "Don't worry, you can order online when you get home and have it delivered without carrying anything in your luggage",
        "You have plenty of time to decide — sleep on it tonight and come back in the morning before your flight",
        "This is your last chance — once you leave {locationName}, it is European prices plus shipping to get it at home",
        "Come back tomorrow before your flight and I will have it wrapped and waiting for you at the counter"
      ],
      optionsEs: [
        "No te preocupes, puedes pedirlo por internet al llegar a casa y te lo mandan sin cargar nada en la maleta",
        "Tienes tiempo de sobra para decidir — consúltalo esta noche y vuelve por la mañana antes del vuelo",
        "Esta es tu última oportunidad — cuando dejes {locationName}, en casa son precios europeos más el envío",
        "Vuelve mañana antes del vuelo y te lo tendré envuelto y esperando en el mostrador"
      ],
      correctIndex: 2,
      explanation:
        "'Leaving tomorrow' is a GOLDEN urgency trigger. Frame the purchase as a NOW-OR-NEVER opportunity: in {locationName} the price is on the table in front of her; at home she faces {currency}500+ prices and shipping costs. The 'last chance' language creates a genuine fear of missing out (FOMO) that overrides hesitation.",
      explanationEs:
        "'Irse mañana' es un disparador de urgencia DORADO. Enmarca la compra como una oportunidad AHORA-O-NUNCA: en {locationName} tiene el precio delante; en casa se enfrenta a precios de {currency}500+ y gastos de envío. El lenguaje de 'última oportunidad' crea un genuino miedo a perderse algo (FOMO) que anula la duda."
    },
    {
      question:
        "A tourist is buying for her daughter as a gift. What psychology are you leveraging?",
      questionEs:
        "Una turista está comprando para su hija como regalo. ¿Qué psicología estás aprovechando?",
      options: [
        "Fear of rejection — she is worried her daughter will not like whatever she brings back from the trip",
        "Peer pressure — she has seen other tourists buying and does not want to be the one who goes home empty-handed",
        "Price comparison shopping — she is working out whether this beats what the same gift would cost her at home",
        "Gift-giving guilt and the desire to bring home something special"
      ],
      optionsEs: [
        "Miedo al rechazo — le preocupa que a su hija no le guste lo que le traiga del viaje",
        "Presión de grupo — ha visto a otros turistas comprando y no quiere ser la que vuelve a casa con las manos vacías",
        "Comparación de precios — está calculando si esto le sale mejor que ese mismo regalo en su país",
        "Culpa de dar regalos y el deseo de llevar a casa algo especial"
      ],
      correctIndex: 3,
      explanation:
        "Tourists buying GIFTS have a powerful emotional driver: they want to return home with something MEANINGFUL, not just another magnet or t-shirt. Position our products as 'the gift that keeps giving' — every time her daughter uses the syringe, she will think of her mother and the trip to {locationName}. Emotional connections create higher willingness to spend.",
      explanationEs:
        "Los turistas que compran REGALOS tienen un poderoso motor emocional: quieren volver a casa con algo SIGNIFICATIVO, no solo otro imán o camiseta. Posiciona nuestros productos como 'el regalo que sigue dando' — cada vez que su hija use la jeringa, pensará en su madre y el viaje a {locationName}. Las conexiones emocionales crean mayor disposición a gastar."
    },
    {
      question:
        "What is the psychology behind 'treating yourself on vacation'?",
      questionEs:
        "¿Cuál es la psicología detrás de 'consentirse en vacaciones'?",
      options: [
        "Vacation mindset lowers spending resistance — people already mentally budgeted to spend",
        "People save money on vacation by cutting back on daily spending, so they are more careful with every purchase",
        "Products work better on vacation because the skin is more relaxed and better hydrated than during a working week",
        "People are more logical on vacation because they have time to think, so they research every purchase carefully"
      ],
      optionsEs: [
        "La mentalidad de vacaciones reduce la resistencia al gasto — la gente ya presupuestó mentalmente gastar",
        "La gente ahorra dinero en vacaciones recortando el gasto diario, así que va con más cuidado en cada compra",
        "Los productos funcionan mejor en vacaciones porque la piel está más relajada e hidratada que en una semana de trabajo",
        "La gente es más lógica en vacaciones porque tiene tiempo para pensar, así que se informa bien antes de cada compra"
      ],
      correctIndex: 0,
      explanation:
        "On vacation, people are in a 'treat yourself' mental mode. They have ALREADY decided to spend money — on meals, experiences, souvenirs. A {currency}100 skincare purchase feels like a small luxury compared to a {currency}200 dinner. Frame your product as part of the vacation experience: 'You are already treating yourself to this beautiful trip — treat your skin to something special too.'",
      explanationEs:
        "En vacaciones, la gente está en modo mental de 'consentirse'. Ya DECIDIERON gastar dinero — en comidas, experiencias, souvenirs. Una compra de {currency}100 en cuidado de piel se siente como un pequeño lujo comparado con una cena de {currency}200. Enmarca tu producto como parte de la experiencia de vacaciones: 'Ya te estás consintiendo con este hermoso viaje — consiente tu piel con algo especial también.'"
    },
    {
      question:
        "A tourist mentions she came here because things cost less than at home. How do you respond?",
      questionEs:
        "Una turista menciona que ha venido porque aquí las cosas cuestan menos que en su país. ¿Cómo respondes?",
      options: [
        "Careful, cheaper is not always better — what you save here you can lose in quality, so keep her off the subject of price",
        "Agree, she is right — then show her exactly where: what a clinic at home charges for this, next to our price on the table",
        "Just agree and leave it there — she has already decided we are cheap, so putting numbers on it now only sounds like a pitch",
        "Tell her she is right about the town but not this table — our brand costs the same everywhere, so price is not the angle here"
      ],
      optionsEs: [
        "Cuidado, lo barato no siempre es mejor — lo que ahorras aquí lo pierdes en calidad, así que apártala del tema del precio",
        "Dale la razón y enséñale dónde exactamente: lo que cobra una clínica en su país por esto, al lado de nuestro precio aquí",
        "Dale la razón y déjalo ahí — ya ha decidido que somos baratos, ponerle cifras ahora solo suena a discurso de vendedor",
        "Dile que acierta con el pueblo pero no con esta mesa — nuestra marca cuesta lo mismo en todas partes, el precio no es el ángulo"
      ],
      correctIndex: 1,
      explanation:
        "When a tourist tells you why she came, she is handing you her own argument — do not correct it, PROVE it. Validate what she already believes, then put the two numbers side by side on the product in front of her: the clinic price at home, and the price here. Agreeing with nothing behind it leaves her with a vague good feeling; agreeing WITH the comparison turns her reason for the trip into the reason to buy this today.",
      explanationEs:
        "Cuando una turista te dice por qué ha venido, te está entregando su propio argumento — no la corrijas, DEMUÉSTRALO. Valida lo que ya cree y pon las dos cifras una al lado de la otra sobre el producto que tiene delante: lo que cobra una clínica en su país y lo que cuesta aquí. Darle la razón sin nada detrás la deja con una buena sensación vaga; dársela CON la comparación convierte su motivo del viaje en el motivo para comprar esto hoy."
    },
    {
      question:
        "A tourist has {currency}200 in cash she set aside for 'vacation spending.' How does this help your {currency}140 syringe close?",
      questionEs:
        "Una turista tiene {currency}200 en efectivo que apartó para 'gastos de vacaciones.' ¿Cómo ayuda esto a tu cierre de la jeringa en {currency}140?",
      options: [
        "Vacation cash is 'already spent' mentally — {currency}140 feels like using play money, not real money",
        "It doesn't help — she will want to keep all her cash for meals and taxis, so cash in hand means nothing",
        "She will only buy if you accept the exact cash amount she is carrying, so match your price to her wallet",
        "You should ask for the full {currency}200 instead — she has already set it aside, so take all of it"
      ],
      optionsEs: [
        "El dinero de vacaciones ya está 'gastado' mentalmente — {currency}140 se siente como usar dinero de juego, no dinero real",
        "No ayuda — querrá guardar el efectivo para comidas y taxis, así que llevarlo encima no significa nada",
        "Solo comprará si aceptas la cantidad exacta que lleva, así que ajusta tu precio a su cartera",
        "Deberías pedirle los {currency}200 completos — ya los tenía apartados, así que llévatelos todos"
      ],
      correctIndex: 0,
      explanation:
        "The 'vacation wallet' is a real psychological phenomenon. Money set aside for vacation spending is mentally categorized as 'for fun' — people spend it more freely than their regular income. When a tourist has already mentally 'spent' that {currency}200 on experiences, your {currency}140 syringe feels like a natural part of the vacation budget, not a painful expense. Frame it as: 'Part of your vacation treat to yourself.'",
      explanationEs:
        "La 'cartera de vacaciones' es un fenómeno psicológico real. El dinero apartado para gastos de vacaciones se categoriza mentalmente como 'para diversión' — la gente lo gasta más libremente que su ingreso regular. Cuando un turista ya 'gastó' mentalmente esos {currency}200 en experiencias, tu jeringa de {currency}140 se siente como parte natural del presupuesto de vacaciones, no como un gasto doloroso. Enmárcalo como: 'Parte de tu regalo de vacaciones para ti misma.'"
    },
    {
      question:
        "A tourist couple is browsing. The husband seems impatient. What is your BEST move?",
      questionEs:
        "Una pareja de turistas está mirando. El esposo parece impaciente. ¿Cuál es tu MEJOR movimiento?",
      options: [
        "Get the husband involved by offering him the nail file to try or showing him the product quickly",
        "Ignore the husband and focus only on the wife, since she is the one who will actually use the product",
        "Wait until the husband walks away to approach the wife, so she can decide without him standing over her",
        "Tell the husband this won't take long and ask him to give you two more minutes before they move on"
      ],
      optionsEs: [
        "Involucrar al esposo ofreciéndole la lima de uñas para probar o mostrándole el producto rápidamente",
        "Ignorar al marido y centrarte solo en la mujer, ya que es ella quien va a usar el producto",
        "Esperar a que el marido se aleje para acercarte a ella, para que decida sin tenerlo encima",
        "Decirle al marido que esto no llevará mucho y pedirle dos minutos más antes de que sigan"
      ],
      correctIndex: 0,
      explanation:
        "An impatient husband can kill a sale by pulling his wife away. The best defense is ENGAGEMENT — get him involved. Hand him the nail file to feel, or say 'Sir, can I show you something amazing in 30 seconds?' Once he sees the product and feels included, he is far less likely to interrupt. An engaged husband often becomes the one saying 'Just get it, babe!'",
      explanationEs:
        "Un esposo impaciente puede matar una venta alejando a su esposa. La mejor defensa es el COMPROMISO — involúcralo. Entrégale la lima de uñas para que la sienta, o di 'Señor, ¿puedo mostrarle algo increíble en 30 segundos?' Una vez que ve el producto y se siente incluido, es mucho menos probable que interrumpa. Un esposo comprometido a menudo se convierte en quien dice '¡Cómpralo, amor!'"
    },
    {
      question:
        "What is the SOUVENIR mindset and how does it help your sale?",
      questionEs:
        "¿Qué es la mentalidad de SOUVENIR y cómo ayuda a tu venta?",
      options: [
        "Tourists only want cheap souvenirs — fridge magnets and keyrings — so anything above pocket money is a waste of your breath",
        "Souvenirs are a waste of money and everyone knows it, so never mention the trip at all and keep the conversation on the ingredients",
        "Tourists want to take home a piece of their trip — positioning your product as a 'luxury souvenir from {locationName}' makes it a memory, not just a purchase",
        "Tourists never buy souvenirs on the last day of a trip because their suitcase is already full, so approach them early in the week"
      ],
      optionsEs: [
        "Los turistas solo quieren souvenirs baratos — imanes y llaveros — así que cualquier cosa por encima de calderilla es perder el tiempo",
        "Los souvenirs son una pérdida de dinero y todo el mundo lo sabe, así que no menciones el viaje y céntrate en los ingredientes",
        "Los turistas quieren llevarse a casa un pedazo de su viaje — posicionar tu producto como 'souvenir de lujo de {locationName}' lo hace un recuerdo, no solo una compra",
        "Los turistas nunca compran souvenirs el último día porque ya tienen la maleta llena, así que acércate a ellos a principios de semana"
      ],
      correctIndex: 2,
      explanation:
        "The souvenir mindset transforms a 'purchase' into a 'memory.' When you say 'Every time you use this, you will remember your trip to {locationName},' you are selling NOSTALGIA, not just skincare. This emotional framing justifies a higher price because it is not just a product — it is a piece of the vacation experience they can take home and enjoy for months.",
      explanationEs:
        "La mentalidad de souvenir transforma una 'compra' en un 'recuerdo.' Cuando dices 'Cada vez que uses esto, recordarás tu viaje a {locationName}', estás vendiendo NOSTALGIA, no solo cuidado de piel. Este enmarcado emocional justifica un precio más alto porque no es solo un producto — es un pedazo de la experiencia de vacaciones que pueden llevar a casa y disfrutar por meses."
    },
    {
      question:
        "A tourist hesitates because she says 'I need to think about it.' How do you use tourist psychology to close?",
      questionEs:
        "Una turista duda porque dice 'Necesito pensarlo.' ¿Cómo usas la psicología del turista para cerrar?",
      options: [
        "Give her your card so she can contact you later, and tell her the price will still be waiting whenever she decides to come back",
        "Tell her to ask her friends what they think — send her a photo of the mirror result so she has something to show them",
        "Remind her that at home this is {currency}500 plus shipping — and she is already down at {currency}140 with you, today only",
        "Offer to hold the product until she decides, put her name on it, and tell her it will be behind the counter until closing time"
      ],
      optionsEs: [
        "Darle tu tarjeta para que te contacte después, y decirle que el precio seguirá esperando cuando decida volver",
        "Decirle que pregunte a sus amigas qué opinan — mándale una foto del resultado en el espejo para que tenga algo que enseñarles",
        "Recordarle que en su país esto son {currency}500 más envío — y que contigo ya está abajo, en {currency}140, y solo hoy",
        "Ofrecerte a guardarle el producto hasta que decida, ponerle su nombre y decirle que estará tras el mostrador hasta la hora de cierre"
      ],
      correctIndex: 2,
      explanation:
        "'I need to think about it' is the #1 stalling tactic, and with a tourist you have a weapon nobody else has: she is LEAVING. There is no next week for her — she is on a plane. But say the number you are actually standing on — do not leap from the {currency}500 anchor to the floor in one sentence, because a price that falls that far that fast tells her every number you have said today was invented. 'At home that is {currency}500 plus shipping and a three-week wait. You are at {currency}140 with me — gift off, my voucher on it, and that voucher dies at the door. So, card or cash?'",
      explanationEs:
        "'Necesito pensarlo' es la táctica de demora #1, y con una turista tienes un arma que no tiene nadie más: se está YENDO. No puede pensárselo y volver la semana que viene. Pero di el número en el que estás de verdad — no saltes del ancla de {currency}500 al suelo en una sola frase, porque un precio que cae tanto y tan rápido le está diciendo que todas las cifras de hoy te las has inventado. 'En tu país son {currency}500 más envío y tres semanas de espera. Conmigo estás en {currency}140 — sin regalo, con mi cupón, y ese cupón se muere en la puerta. ¿Tarjeta o efectivo?'"
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT ALL 5 QUIZZES
// ═══════════════════════════════════════════════════════════════════════════════
export const MORE_QUIZZES_2: GeneralQuiz[] = [
  quizPriceLadder,
  quizComplimentStop,
  quizIngredients,
  quizOneEyeDemo,
  quizTouristPsych
];

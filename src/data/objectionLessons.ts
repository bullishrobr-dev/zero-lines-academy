// ─────────────────────────────────────────────────────────────────────────────
// objectionLessons.ts — the 10 objections a seller hears every single day.
//
// Authored against a bespoke `ObjectionLesson` shape whose `sections` carried
// raw markdown ("## heading", "**bold**", "• item\n• item") that the lesson
// reader has no parser for, in a file nothing imported. Headings are now real
// `subheader` blocks (which LessonView turns into numbered chapters), bullet
// blobs are real `bullets` arrays, and the emphasis markers are gone.
//
// Same content rules as the rest of src/data: {currency} instead of a symbol,
// {locationName} instead of a shop name in spoken lines, every price a rung on
// a pricing.ts ladder, and European Spanish in the informal tú.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from './lessons';

export const objectionLessons: Record<string, Lesson> = {
  "O1": {
    id: "O1",
    categoryId: "objections",
    title: "I'm on a Budget",
    titleEs: "Ando Corto de Dinero / Tengo Presupuesto",
    subtitle: "Turning money concerns into value conversations",
    subtitleEs: "Convierte la preocupación por el dinero en una conversación de valor",
    duration: "4 min",
    icon: "Wallet",
    order: 1,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "Reading the Objection",
        textEs: "Leer la Objeción",
      },
      {
        type: "paragraph",
        text: "When someone says they're on a budget, they're not saying no — they're saying \"convince me this is worth it.\" People protect their money because every purchase feels like a risk. Your job is to reduce that risk and reframe the price into daily value.",
        textEs: "Cuando alguien dice que anda corto de dinero, no está diciendo que no — está diciendo \"convénceme de que esto vale la pena.\" La gente protege su dinero porque cada compra se siente como un riesgo. Tu trabajo es reducir ese riesgo y reconvertir el precio en valor diario.",
      },
      {
        type: "quote",
        text: "If someone can afford a {currency}5 coffee every day, they can afford a {currency}300 product that lasts 3 months. That's {currency}3.33 per day for younger-looking skin.",
        textEs: "Si alguien puede pagar un café de {currency}5 todos los días, puede pagar un producto de {currency}300 que le dura 3 meses. Son {currency}3.33 al día para verse más joven.",
      },
      {
        type: "subheader",
        text: "The Psychology Behind \"I'm on a Budget\"",
        textEs: "La Psicología Detrás de \"Ando Corto de Dinero\"",
      },
      {
        type: "bullets",
        items: [
          "Loss Aversion: People feel losses 2x more intensely than equivalent gains. Spending {currency}300 feels like a loss, not an investment.",
          "Mental Accounting: Tourists have a \"vacation budget\" compartment. You need to move the purchase from \"vacation splurge\" to \"smart investment.\"",
          "Price Anchoring: They compare {currency}300 to {currency}0, not to the {currency}500 the same syringe costs in a shop back home, or the {currency}1,200+ a year they hand a salon.",
        ],
        itemsEs: [
          "Aversión a la Pérdida: La gente siente las pérdidas 2 veces más intensamente que las ganancias equivalentes. Gastar {currency}300 se siente como una pérdida, no una inversión.",
          "Contabilidad Mental: Los turistas tienen un compartimento de \"presupuesto de vacaciones\". Necesitas mover la compra de \"gasto de vacaciones\" a \"inversión inteligente.\"",
          "Anclaje de Precio: Comparan {currency}300 con {currency}0, no con los {currency}500 que cuesta la misma jeringa en una tienda de su país, ni con los {currency}1,200+ al año que dejan en un salón.",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: The Daily Value Reframe (Short)",
        textEs: "Guion 1: Reconvertir el Valor Diario (Corto)",
      },
      {
        type: "script",
        text: "YOU: \"I totally get it — we're all on a budget, right? But check this out: this one syringe lasts you 3 months. That's {currency}3.33 a day. You spend more on coffee! And this doesn't just wake you up — it takes 10 years off your face. Want me to show you how?\"",
        textEs: "TÚ: \"Lo entiendo perfectamente — todos andamos con presupuesto, ¿verdad? Pero fíjate: esta jeringa te dura 3 meses. Son {currency}3.33 al día. ¡Gastas más en café! Y esto no solo te despierta — te quita 10 años de encima. ¿Quieres que te enseñe cómo?\"",
      },
      {
        type: "subheader",
        text: "Script 2: The Comparison Close (Medium)",
        textEs: "Guion 2: El Cierre por Comparación (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"Listen, I get it — {currency}300 sounds like a lot. But let me ask you something: how much is a facial at a spa? {currency}80, right? And it's gone in an hour. This product gives you 60 to 80 applications — that's less than {currency}5 per use. You're literally saving hundreds compared to a salon. And in any store back home, this is {currency}500.\"",
        textEs: "TÚ: \"Mira, lo entiendo — {currency}300 suena a mucho. Pero déjame preguntarte algo: ¿cuánto cuesta un facial en un spa? {currency}80, ¿verdad? Y se acabó en una hora. Este producto te da de 60 a 80 aplicaciones — son menos de {currency}5 por uso. Literal estás ahorrando cientos comparado con un salón. Y en cualquier tienda de tu país, esto cuesta {currency}500.\"",
      },
      {
        type: "subheader",
        text: "Script 3: The Investment Framework (Detailed)",
        textEs: "Guion 3: El Marco de Inversión (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"I hear you. Can I ask you something real quick — how much do you spend on skincare in a year? Creams, serums, masks, spa visits?\" [Let them answer] \"Okay, so let's say {currency}800, {currency}1,200 a year on stuff that gives you... what? A little moisture? This right here is concentrated hyaluronic acid — the same thing celebrities pay thousands for. One syringe, 3 months. That's 4 syringes a year. {currency}1,200 total — the same money, except this one you can watch working in 60 seconds. Look at my client's face right here — 60 seconds ago she had that line, now look. That line is GONE. You're not buying a cream, you're buying a time machine. And at {currency}3.33 a day, that's less than the coffee you bought on the way here. Now tell me — doesn't your face deserve the same investment as your morning coffee?\"",
        textEs: "TÚ: \"Te entiendo. ¿Puedo preguntarte algo rapidísimo — cuánto gastas en cuidado de piel al año? Cremas, sueros, mascarillas, visitas al spa?\" [Déjalos responder] \"Vale, digamos {currency}800, {currency}1,200 al año en cosas que te dan... ¿qué? ¿Un poquito de humedad? Esto de aquí es ácido hialurónico concentrado — lo mismo que los famosos pagan miles. Una jeringa, 3 meses. Son 4 jeringas al año. {currency}1,200 en total — el mismo dinero, solo que este lo ves funcionar en 60 segundos. Mira la cara de mi clienta aquí — hace 60 segundos tenía esa línea, ahora mira. Esa línea DESAPARECIÓ. No estás comprando una crema, estás comprando una máquina del tiempo. Y a {currency}3.33 al día, es menos que el café que te has tomado de camino. Ahora dime — ¿tu cara no merece la misma inversión que tu café de la mañana?\"",
      },
      {
        type: "subheader",
        text: "What NOT to Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Dismiss their concern: \"Oh, it's not that expensive\" — this makes them feel stupid and shuts down the conversation.",
          "Immediately drop the price: Offering a discount before they even object kills your credibility.",
          "Point your last customer the wrong way: \"The lady before you bought three!\" makes them feel behind. Turn her round and she is the best prop you own — \"My last customer only took one, so let me do something nice for you\" makes them feel picked. Same story: one nags, one gives. Give.",
          "Walk away: If they're still standing there, they're still interested. Work with them.",
        ],
        itemsEs: [
          "Menospreciar su preocupación: \"Ah, no es tan caro\" — esto los hace sentirse tontos y cierra la conversación.",
          "Bajar el precio de inmediato: Ofrecer descuento antes de que objeten mata tu credibilidad.",
          "Usar a tu última clienta al revés: \"¡La señora de antes se llevó tres!\" les hace sentir que van por detrás. Dale la vuelta y es la mejor herramienta que tienes — \"Mi última clienta se llevó solo uno, así que déjame hacerte algo bonito\" les hace sentir elegidas. La misma historia: una da la lata, la otra regala. Regala.",
          "Irte: Si todavía están ahí parados, todavía les interesa. Trabaja con ellos.",
        ],
      },
      {
        type: "tip",
        text: "The {currency}3.33/day reframe is your golden weapon. Practice saying it naturally in both languages. Also — always carry your phone calculator. Show them the math in real time. \"{currency}300 divided by 90 days... look, {currency}3.33 a day.\" Seeing the number makes it real.",
        textEs: "La reconversión de {currency}3.33 al día es tu arma dorada. Practica decirla natural en ambos idiomas. Además — siempre carga la calculadora de tu móvil. Muéstrales la matemática en tiempo real. \"{currency}300 dividido entre 90 días... mira, {currency}3.33 al día.\" Ver el número lo hace real.",
      },
    ],
    quiz: [],
  },

  "O2": {
    id: "O2",
    categoryId: "objections",
    title: "Let Me Think About It",
    titleEs: "Déjame Pensarlo",
    subtitle: "Breaking through decision paralysis with urgency and risk removal",
    subtitleEs: "Rompiendo la parálisis de decisión con urgencia y eliminación de riesgo",
    duration: "4 min",
    icon: "Clock",
    order: 2,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "Reading the Objection",
        textEs: "Leer la Objeción",
      },
      {
        type: "paragraph",
        text: "\"Let me think about it\" is the silent killer of street sales. It sounds polite, but it means one of three things: (1) They're scared to commit, (2) They don't feel enough urgency, or (3) They want to say no without being rude. Your job is to address all three without being pushy.",
        textEs: "\"Déjame pensarlo\" es el asesino silencioso de las ventas en la calle. Suena educado, pero significa una de tres cosas: (1) Les da miedo comprometerse, (2) No sienten suficiente urgencia, o (3) Quieren decir que no sin ser groseros. Tu trabajo es abordar las tres sin ser agresivo.",
      },
      {
        type: "subheader",
        text: "The Psychology Behind \"Let Me Think About It\"",
        textEs: "La Psicología Detrás de \"Déjame Pensarlo\"",
      },
      {
        type: "bullets",
        items: [
          "Decision Paralysis: Too many options or too much information freezes the brain. Street demos create instant desire, but the purchasing decision still requires a mental \"leap.\"",
          "Fear of Regret: They imagine buying it, going home, and thinking \"I shouldn't have spent that.\" You need to flip this — make them fear missing out MORE than buying.",
          "Politeness Buffer: Most people won't say \"no\" to your face. They use \"thinking about it\" as an escape hatch. Your job is to take the escape hatch away, gently, before she uses it.",
        ],
        itemsEs: [
          "Parálisis de Decisión: Demasiadas opciones o demasiada información congela el cerebro. Las demos en la calle crean deseo instantáneo, pero la decisión de compra todavía requiere un \"salto\" mental.",
          "Miedo al Arrepentimiento: Se imaginan comprándolo, llegando a casa, y pensando \"no debí gastar eso.\" Necesitas voltear esto — haz que teman perderse la oportunidad MÁS que comprar.",
          "Cortesía de Escape: La mayoría no te dirá \"no\" a la cara. Usan \"pensarlo\" como escapatoria. Tu trabajo es quitarles la escapatoria, con cariño, antes de que la usen.",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: The Urgency Anchor (Short)",
        textEs: "Guion 1: El Ancla de Urgencia (Corto)",
      },
      {
        type: "script",
        text: "YOU: \"I totally understand! But here's the thing — you're in {locationName} right now. The moment you cross that border, the exact same syringe is {currency}500 in a shop. This offer is right here, right now. And honestly? The results you just saw don't need thinking — they need action. Grab it while you're here!\"",
        textEs: "TÚ: \"¡Totalmente entiendo! Pero fíjate — ahora mismo estás en {locationName}. En cuanto cruces esa frontera, esta misma jeringa cuesta {currency}500 en una tienda. Esta oferta es aquí, ahora. Y honestamente? Los resultados que acabas de ver no necesitan pensarse — necesitan acción. ¡Cógelo mientras estás aquí!\"",
      },
      {
        type: "subheader",
        text: "Script 2: Nothing Left to Find Out (Medium)",
        textEs: "Guion 2: Ya No Queda Nada Por Averiguar (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"I get it, it's a big decision. Go on then — what is it? The price, the product, or you just want to sleep on it?\" [Let them answer] \"Here's the thing, though. You're not taking my word for anything. You didn't read a review, you didn't watch an advert — you watched it happen on your own face, sixty seconds ago, with your own eyes. There is nothing left to find out. The only thing sleeping on it changes is that you sleep with the line still there. So — are you going to THINK about looking younger, or are you going to do it?\"",
        textEs: "TÚ: \"Lo entiendo, es una decisión importante. Venga, dime — ¿qué es? ¿El precio, el producto, o que quieres consultarlo con la almohada?\" [Deja que contesten] \"Pero mira una cosa. Aquí no te estás fiando de mí. No has leído una reseña ni has visto un anuncio — lo has visto pasar en tu propia cara, hace sesenta segundos, con tus propios ojos. Ya no queda nada por averiguar. Lo único que cambia si lo consultas con la almohada es que duermes con la línea todavía ahí. Así que — ¿vas a PENSAR en verte más joven, o lo vas a hacer?\"",
      },
      {
        type: "subheader",
        text: "Script 3: The Scarcity + Social Proof Framework (Detailed)",
        textEs: "Guion 3: El Marco de Escasez + Prueba Social (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"I hear you — thinking about it makes sense. But let me be real with you for a second.\" [Lean in, lower voice] \"I had a lady yesterday, just like you. Beautiful skin, a little line here she didn't love. She said 'let me think about it.' She came back TWO HOURS later — the line was still gone, she couldn't stop touching her face — and we were sold out. She begged me to hold one. I couldn't. She left heartbroken. Now look at you — you saw your own wrinkles disappear in 60 seconds. You KNOW it works. This isn't a thinking decision, it's a feeling decision. And your skin is FEELING amazing right now. We only have a few units left today. I'm not saying that to pressure you — I'm saying it because I don't want YOU to be the one coming back in two hours and finding out we're gone. So what do you say — should I wrap one up for you?\"",
        textEs: "TÚ: \"Te escucho — pensarlo tiene sentido. Pero déjame ser honesta contigo un segundo.\" [Acércate, baja la voz] \"Tuve una señora ayer, igual que tú. Piel hermosa, una línea aquí que no le gustaba. Dijo 'déjame pensarlo.' Volvió DOS HORAS después — la línea todavía estaba ida, no podía dejar de tocar su cara — y ya nos habíamos agotado. Me rogó que le guardara uno. No pude. Se fue deshecha. Ahora mírate — viste tus propias arrugas desaparecer en 60 segundos. SABES que funciona. Esta no es una decisión de pensar, es una decisión de sentir. Y tu piel está sintiéndose INCREÍBLE ahora mismo. Solo nos quedan pocas unidades hoy. No te lo digo para presionarte — te lo digo porque no quiero que TÚ seas la que vuelva en dos horas y descubra que ya no hay. Entonces, ¿qué dices — te envuelvo uno?\"",
      },
      {
        type: "subheader",
        text: "What NOT to Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Say \"OK, take your time\" — You've just killed the sale. They'll walk away and the desire fades within minutes.",
          "Lead with the discount — Come down the ladder when she tells you the price is the problem, not before. Drop it early and you have paid good money for a yes she was about to give you anyway.",
          "Turn cold on her — Firm is fine, sour is not. The smile stays on while you hold the number, or she says no just to get away from you.",
          "Hand her something to take away — A card, a sample, the price written down. It feels helpful and it walks her straight out of the door. Whatever you were going to give her, give it to her here, with the box already in her hand.",
        ],
        itemsEs: [
          "Decir \"OK, tómate tu tiempo\" — Acabas de matar la venta. Se irán caminando y el deseo se desvanece en minutos.",
          "Empezar por el descuento — Baja la escalera cuando ella te diga que el problema es el precio, no antes. Si lo sueltas pronto, has pagado por un sí que te iba a dar igualmente.",
          "Ponerte seca con ella — Firme sí, borde no. La sonrisa no se te cae mientras aguantas el número, o te dirá que no solo para quitarte de encima.",
          "Darle algo para llevarse — Una tarjeta, una muestra, el precio apuntado. Parece un detalle y la saca directa por la puerta. Lo que le fueras a dar, se lo das aquí, con la caja ya en la mano.",
        ],
      },
      {
        type: "tip",
        text: "Create a genuine reason for urgency. Check your stock before each shift and know what's running low. \"Only 3 left\" is powerful ONLY when it's true. Customers can smell fake scarcity from a mile away. And give her the mirror twice — once before, once after, with the mirror in her own hand. A photo she might look at tonight is worth nothing to you. The face she is looking at right now is worth everything. Sell to that one.",
        textEs: "Crea una razón genuina de urgencia. Revisa tu inventario antes de cada turno y sabe qué se está acabando. \"Solo quedan 3\" es poderoso SOLO cuando es verdad. Los clientes huelen la escasez falsa a kilómetros. Y dale el espejo dos veces — antes y después, y que lo sujete ella. Una foto que a lo mejor mira esta noche no te vale de nada. La cara que está mirando ahora mismo lo vale todo. Véndele a esa.",
      },
    ],
    quiz: [],
  },

  "O3": {
    id: "O3",
    categoryId: "objections",
    title: "My Husband/Wife Will Kill Me",
    titleEs: "Mi Esposo/a Me Mata",
    subtitle: "Turning spousal fear into a shared win",
    subtitleEs: "Convirtiendo el miedo al cónyuge en una victoria compartida",
    duration: "4 min",
    icon: "Heart",
    order: 3,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "Reading the Objection",
        textEs: "Leer la Objeción",
      },
      {
        type: "paragraph",
        text: "This objection isn't about the product — it's about social accountability. They're imagining the conversation at home: \"You spent HOW MUCH?\" Your job is to give them a story their partner will celebrate, not criticize.",
        textEs: "Esta objeción no es sobre el producto — es sobre responsabilidad social. Se están imaginando la conversación en casa: \"¿¿Gastaste CUÁNTO??\" Tu trabajo es darles una historia que su pareja celebre, no critique.",
      },
      {
        type: "subheader",
        text: "The Psychology Behind \"My Partner Will Kill Me\"",
        textEs: "La Psicología Detrás de \"Mi Pareja Me Mata\"",
      },
      {
        type: "bullets",
        items: [
          "Social Accountability: People care more about what their partner thinks than what a stranger thinks. The fear of judgment at home is stronger than desire.",
          "Shared Financial Identity: In couples, spending decisions feel like they need \"permission.\" You're selling them permission, not just a product.",
          "Gift Reframe: If it's a gift, the narrative changes from \"I spent money on myself\" to \"I bought us something special.\"",
        ],
        itemsEs: [
          "Responsabilidad Social: La gente le importa más lo que su pareja piensa que lo que piensa un extraño. El miedo al juicio en casa es más fuerte que el deseo.",
          "Identidad Financiera Compartida: En parejas, las decisiones de gasto se sienten como si necesitaran \"permiso.\" Les estás vendiendo permiso, no solo un producto.",
          "Reconvertir como Regalo: Si es un regalo, la narrativa cambia de \"gasté dinero en mí\" a \"compré algo especial para nosotros.\"",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: The Gift Framing (Short)",
        textEs: "Guion 1: Enmarcar como Regalo (Corto)",
      },
      {
        type: "script",
        text: "YOU: \"I love that you care what they think! Here's the move — this isn't just for you. Grab the nail kit for your daughter, the scrub for your wife, and the syringe for yourself. Now it's a family gift from {locationName}! No one can be mad about a gift.\"",
        textEs: "TÚ: \"¡Me encanta que te importe lo que piensen! Aquí está el truco — esto no es solo para ti. Coge el kit de uñas para tu hija, el scrub para tu esposa, y la jeringa para ti. ¡Ahora es un regalo familiar de {locationName}! Nadie puede enfadarse por un regalo.\"",
      },
      {
        type: "subheader",
        text: "Script 2: The Investment for Two (Medium)",
        textEs: "Guion 2: La Inversión para Dos (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"Listen, I get it. But here's what you tell them: 'Honey, I found this INCREDIBLE product in {locationName}. I got one for me AND one for you. The guy at the counter showed me how it works — look at my face! I literally look 5 years younger.' Now he's not mad — he's curious. And when he tries it? He's going to be the one asking YOU where to buy more.\"",
        textEs: "TÚ: \"Mira, lo entiendo. Pero esto es lo que les dices: 'Cariño, encontré este producto INCREÍBLE en {locationName}. Compré uno para mí Y uno para ti. El chico del mostrador me mostró cómo funciona — ¡mira mi cara! Literal me veo 5 años más joven.' Ahora no está enfadado — está curioso. Y cuando lo pruebe? Él va a ser el que TE pregunte dónde comprar más.\"",
      },
      {
        type: "subheader",
        text: "Script 3: The \"You Deserve This\" Close (Detailed)",
        textEs: "Guion 3: El Cierre de \"Te Mereces Esto\" (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"Okay, real talk. How many times have you put yourself last? Kids first, husband first, work first... when was the last time you did something JUST for you?\" [Let them think] \"Look at what just happened. In 60 seconds, you watched years come off your face. You felt that. I saw your face light up. Your partner loves you, right? They want you to feel beautiful. They want you to be confident. So here's what you do: you walk in tonight, you look them in the eye, and you say 'I treated myself today. Because I deserve it. And LOOK.'\" [Point to their skin] \"They won't be mad. They'll be amazed. And honestly? If someone gets mad at you for investing in yourself... that's a conversation worth having. So — are we wrapping this up as a 'me gift' or an 'us gift'?\"",
        textEs: "TÚ: \"Vale, hablando en serio. ¿Cuántas veces te has puesto a ti al último? Los niños primero, el esposo primero, el trabajo primero... ¿cuándo fue la última vez que hiciste algo SOLO para ti?\" [Déjalos pensar] \"Mira lo que acaba de pasar. En 60 segundos, viste años desaparecer de tu cara. Sentiste eso. Vi tu cara iluminarse. Tu pareja te ama, ¿verdad? Quiere que te sientas hermosa. Quiere que estés segura de ti misma. Entonces esto es lo que haces: entras esta noche, lo miras a los ojos, y dices 'me di un gusto hoy. Porque me lo merezco. Y MIRA.'\" [Señala su piel] \"No estarán enfadados. Estarán asombrados. Y honestamente? Si alguien se enfada porque inviertes en ti misma... esa es una conversación que vale la pena tener. Entonces — ¿lo envolvemos como un 'regalo para mí' o un 'regalo para nosotros'?\"",
      },
      {
        type: "subheader",
        text: "What NOT to Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Badmouth their partner: \"He sounds controlling!\" — This creates division, not desire.",
          "Send her home to ask him: The second she leaves to check, you have lost her — and he is not sitting at home thinking about her face. It is her money and her mirror, so put the decision back in her hands while she is still standing in front of you.",
          "Ignore the objection: Pretending they didn't mention a partner makes you tone-deaf.",
          "Suggest they hide it: Dishonesty stories backfire. Give them an honest narrative that wins.",
        ],
        itemsEs: [
          "Hablar mal de su pareja: \"¡Suena controlador!\" — Esto crea división, no deseo.",
          "Mandarla a casa a preguntarle: En cuanto se va a consultarlo, la has perdido — y él no está en casa pensando en la cara de ella. Es su dinero y su espejo, así que devuélvele la decisión mientras la tienes delante.",
          "Ignorar la objeción: Pretender que no mencionaron pareja te hace parecer sordo.",
          "Sugerir que lo escondan: Las historias de deshonestidad se voltean en contra. Dale una narrativa honesta que gane.",
        ],
      },
      {
        type: "tip",
        text: "Always suggest the \"gift for two\" angle. Even if they came alone, saying \"get one for your partner too\" changes the frame from selfish purchase to thoughtful gesture. Plus — you just doubled your sale. The phrase \"He'll thank you later\" or \"Ella te lo va a agradecer\" is magic.",
        textEs: "Siempre sugiere el ángulo de \"regalo para dos.\" Aunque hayan venido solos, decir \"lleva uno para tu pareja también\" cambia el marco de compra egoísta a gesto considerado. Además — acabas de duplicar tu venta. La frase \"Él te lo va a agradecer después\" o \"Ella te lo va a agradecer\" es mágica.",
      },
    ],
    quiz: [],
  },

  "O4": {
    id: "O4",
    categoryId: "objections",
    title: "I Was Scammed Before",
    titleEs: "Ya Me Estafaron Antes",
    subtitle: "Rebuilding trust brick by brick with skeptical customers",
    subtitleEs: "Reconstruyendo confianza poco a poco con clientes escépticos",
    duration: "5 min",
    icon: "Shield",
    order: 4,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "Reading the Objection",
        textEs: "Leer la Objeción",
      },
      {
        type: "paragraph",
        text: "This is the hardest objection because it has NOTHING to do with you. Someone else broke their trust, and now you're standing in the wreckage. You can't argue someone out of trauma. You have to patiently prove you're different — without being defensive.",
        textEs: "Esta es la objeción más difícil porque NO tiene NADA que ver contigo. Alguien más rompió su confianza, y ahora estás parado en los escombros. No puedes argumentar a alguien fuera de un trauma. Tienes que probar pacientemente que eres diferente — sin ponerte a la defensiva.",
      },
      {
        type: "subheader",
        text: "The Psychology Behind \"I Was Scammed\"",
        textEs: "La Psicología Detrás de \"Ya Me Estafaron\"",
      },
      {
        type: "bullets",
        items: [
          "Betrayal Trauma: Being scammed creates a lasting wound. Their brain now triggers \"danger\" signals at ANY sales situation. You're not just selling — you're doing trust therapy.",
          "Hypervigilance: They'll look for ANY sign that confirms you're a scammer. Eye contact, tone, body language — everything is being judged.",
          "Control Need: They need to feel in control of the interaction. Let them lead the pace. No pressure = no threat.",
        ],
        itemsEs: [
          "Trauma de Traición: Ser estafado crea una herida duradera. Su cerebro ahora dispara señales de \"peligro\" en CUALQUIER situación de venta. No solo estás vendiendo — estás haciendo terapia de confianza.",
          "Hipervigilancia: Buscarán CUALQUIER señal que confirme que eres estafador. Contacto visual, tono, lenguaje corporal — todo está siendo juzgado.",
          "Necesidad de Control: Necesitan sentir que controlan la interacción. Déjalos llevar el ritmo. Sin presión = sin amenaza.",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: The Empathy-First Approach (Short)",
        textEs: "Guion 1: El Enfoque de Empatía Primero (Corto)",
      },
      {
        type: "script",
        text: "YOU: \"I am SO sorry that happened to you. There are some bad people out there, and it makes my job harder because guys like that ruin it for everyone. Look — I won't ask you to trust me. Let me just show you how this works, and YOU decide. No pressure, no strings.\"",
        textEs: "TÚ: \"Siento MUCHO que te haya pasado eso. Hay gente mala ahí afuera, y me hace el trabajo más difícil porque tipos como ese lo arruinan para todos. Mira — no te voy a pedir que confíes en mí. Déjame solo mostrarte cómo funciona esto, y TÚ decides. Sin presión, sin compromiso.\"",
      },
      {
        type: "subheader",
        text: "Script 2: The Transparency Builder (Medium)",
        textEs: "Guion 2: El Constructor de Transparencia (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"I completely understand — you don't know me from a hole in the wall. Here's what I'll do: I'll demo the product on MYSELF first. You watch. Then if you want, I'll do a tiny patch on your hand — not even your face — so you can see the ingredients, feel the texture, and walk away if you don't like it. Zero commitment. I'm not even going to ask you to buy anything. I just want to show you something cool. Deal?\"",
        textEs: "TÚ: \"Lo entiendo perfectamente — no me conoces de nada. Esto es lo que haré: primero haré la demo EN MÍ MISMO. Tú observas. Luego si quieres, haré un parche chiquito en tu mano — ni siquiera en tu cara — para que veas los ingredientes, sientas la textura, y te vayas si no te gusta. Cero compromiso. Ni siquiera te voy a pedir que compres algo. Solo quiero mostrarte algo cool. ¿Trato?\"",
      },
      {
        type: "subheader",
        text: "Script 3: The Full Trust Rebuild (Detailed)",
        textEs: "Guion 3: La Reconstrucción Completa de Confianza (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"Listen — I can see it in your eyes. Someone burned you. And I want you to know that I respect that you're still standing here, still listening, even after that happened. That takes guts.\" [Pause, make eye contact] \"I'm going to be totally transparent with you. We're a registered company — we have a store, we have a website, we have reviews on Google. You can look us up right now on your phone if you want. I'll wait.\" [Let them check if they want] \"But even better than that — let me show you the ingredient list.\" [Show the packaging] \"See? Every ingredient listed. Nothing hidden. No secrets. This is hyaluronic acid — it's in every luxury skincare product in the world. The same stuff in {currency}500 La Mer creams. We just don't charge for the fancy bottle.\" [Do the demo on yourself] \"Look — my wrinkle, right there. 60 seconds. Gone. Now, I want you to touch my face.\" [Let them touch] \"Feel that? No residue, no stickiness, no makeup. Just skin. That's it. Now — if you want me to try a little on your hand, I'll do it. If you want to walk away with just the knowledge that you found something real today, that's fine too. But I want you to leave here knowing that not everyone is out to get you. Some of us actually love what we do.\"",
        textEs: "TÚ: \"Mira — lo puedo ver en tus ojos. Alguien te quemó. Y quiero que sepas que respeto que todavía estés aquí parado, todavía escuchando, incluso después de que eso pasó. Eso requiere valor.\" [Pausa, haz contacto visual] \"Voy a ser totalmente transparente contigo. Somos una empresa registrada — tenemos tienda, tenemos sitio web, tenemos reseñas en Google. Puedes buscarnos ahora mismo en tu móvil si quieres. Espero.\" [Déjalos comprobar si quieren] \"Pero aún mejor que eso — déjame mostrarte la lista de ingredientes.\" [Muestra el envase] \"¿Ves? Cada ingrediente listado. Nada escondido. Sin secretos. Esto es ácido hialurónico — está en todos los productos de lujo para el cuidado de la piel del mundo. Lo mismo que en las cremas La Mer de {currency}500. Solo que nosotros no cobramos por el frasco bonito.\" [Haz la demo en ti mismo] \"Mira — mi arruga, ahí mismo. 60 segundos. Desapareció. Ahora, quiero que toques mi cara.\" [Déjalos tocar] \"¿Sientes? Sin residuo, sin pegajosidad, sin maquillaje. Solo piel. Eso es todo. Ahora — si quieres que pruebe un poquito en tu mano, lo haré. Si quieres irte con solo el conocimiento de que encontraste algo real hoy, está bien también. Pero quiero que salgas de aquí sabiendo que no todos están tratando de joderte. A algunos de nosotros nos encanta lo que hacemos.\"",
      },
      {
        type: "subheader",
        text: "What NOT to Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Be defensive: \"I'm not a scammer!\" — This actually makes you sound MORE like one.",
          "Rush them: Pressure triggers their trauma response. They'll shut down.",
          "Dismiss their experience: \"That was different, this is real\" — invalidates their pain.",
          "Ask for the sale too early: They need 3x more time than a normal customer. Patience wins.",
        ],
        itemsEs: [
          "Ponerte a la defensiva: \"¡No soy un estafador!\" — Esto de hecho te hace sonar MÁS como uno.",
          "Apurarlos: La presión activa su respuesta de trauma. Se cerrarán.",
          "Menospreciar su experiencia: \"Eso fue diferente, esto es real\" — invalida su dolor.",
          "Pedir la venta muy temprano: Necesitan 3 veces más tiempo que un cliente normal. La paciencia gana.",
        ],
      },
      {
        type: "tip",
        text: "The hand-demo technique is CRITICAL with scammed customers. Offering to demo on their hand — not their face — gives them complete control. They can wash it off. They can walk away. That feeling of control is what rebuilds trust. Also, always have Google reviews pulled up on your phone. Real reviews from real people are worth 1,000 words.",
        textEs: "La técnica de demo en la mano es CRÍTICA con clientes estafados. Ofrecer hacer la demo en su mano — no en su cara — les da control completo. Se la pueden lavar. Se pueden ir. Esa sensación de control es lo que reconstruye confianza. Además, siempre ten las reseñas de Google abiertas en tu móvil. Reseñas reales de gente real valen más que mil palabras.",
      },
    ],
    quiz: [],
  },

  "O5": {
    id: "O5",
    categoryId: "objections",
    title: "Will This Work on Dark Skin?",
    titleEs: "¿Esto Funciona en Piel Morena/Oscura?",
    subtitle: "Addressing inclusive beauty concerns with science and respect",
    subtitleEs: "Abordando preocupaciones de belleza inclusiva con ciencia y respeto",
    duration: "4 min",
    icon: "Palette",
    order: 5,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "Reading the Objection",
        textEs: "Leer la Objeción",
      },
      {
        type: "paragraph",
        text: "This question comes from a real place — the beauty industry has historically ignored darker skin tones. Your customer isn't being difficult; they're protecting themselves from another disappointment. Answer with SCIENCE, not just reassurance.",
        textEs: "Esta pregunta viene de un lugar real — la industria de la belleza históricamente ha ignorado los tonos de piel más oscuros. Tu cliente no está siendo difícil; se está protegiendo de otra decepción. Responde con CIENCIA, no solo con tranquilidad.",
      },
      {
        type: "subheader",
        text: "The Science: Why It Works on ALL Skin Tones",
        textEs: "La Ciencia: Por Qué Funciona en TODOS los Tonos de Piel",
      },
      {
        type: "bullets",
        items: [
          "Hyaluronic Acid is a molecule, not a bleach: It doesn't change skin color. It binds to water molecules in your skin, plumping from the inside. It works the same on ALL skin types because water retention is universal.",
          "Dead Sea minerals contain magnesium, potassium, calcium: These are minerals your skin NEEDS regardless of melanin levels. Darker skin actually often shows MORE dramatic results because the contrast between hydrated and dehydrated skin is more visible.",
          "Glycolic acid exfoliates the top layer of dead skin: This works the same on all skin tones. It's not a skin lightener — it's a cell turnover accelerator.",
        ],
        itemsEs: [
          "El Ácido Hialurónico es una molécula, no un blanqueador: No cambia el color de la piel. Se une a las moléculas de agua en tu piel, rellenando desde adentro. Funciona igual en TODOS los tipos de piel porque la retención de agua es universal.",
          "Los minerales del Mar Muerto contienen magnesio, potasio, calcio: Son minerales que tu piel NECESITA sin importar los niveles de melanina. La piel morena de hecho a menudo muestra resultados MÁS dramáticos porque el contraste entre piel hidratada y deshidratada es más visible.",
          "El ácido glicólico exfolia la capa superior de piel muerta: Funciona igual en todos los tonos de piel. No es un aclarador de piel — es un acelerador de renovación móvil.",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: The Science Answer (Short)",
        textEs: "Guion 1: La Respuesta Científica (Corto)",
      },
      {
        type: "script",
        text: "YOU: \"Great question! This is hyaluronic acid — it's a water molecule, not a bleach. It doesn't care about skin color. It works by binding water under your skin. Your melanin stays exactly the same. You just get smoother, plumper skin. Want me to show you on my hand?\"",
        textEs: "TÚ: \"¡Excelente pregunta! Esto es ácido hialurónico — es una molécula de agua, no un blanqueador. No le importa el color de piel. Funciona uniendo agua debajo de tu piel. Tu melanina se queda exactamente igual. Solo te queda piel más suave y llena. ¿Quieres que te muestre en mi mano?\"",
      },
      {
        type: "subheader",
        text: "Script 2: The Ingredient Education (Medium)",
        textEs: "Guion 2: La Educación de Ingredientes (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"I love that you asked that — it shows you know your skin. Let me break this down: our main ingredient is hyaluronic acid. It's literally already IN your body — in your joints, your eyes, your skin. All skin tones have it. What we do is add more of it topically so your skin holds more water. The result? Plumper, smoother skin — but your color doesn't change at all. In fact, a lot of our clients with darker skin say they see BETTER results because the glow is so visible. Here, let me show you the ingredient list — see? No hydroquinone, no bleach, nothing that changes pigmentation.\"",
        textEs: "TÚ: \"Me encanta que hayas preguntado eso — muestra que conoces tu piel. Déjame explicarte: nuestro ingrediente principal es ácido hialurónico. Literalmente ya está EN tu cuerpo — en tus articulaciones, tus ojos, tu piel. Todos los tonos de piel lo tienen. Lo que hacemos es agregar más tópicamente para que tu piel retenga más agua. ¿El resultado? Piel más llena y suave — pero tu color no cambia para nada. De hecho, muchos de nuestros clientes con piel morena dicen que ven MEJORES resultados porque el brillo es muy visible. Mira, déjame mostrarte la lista de ingredientes — ¿ves? Sin hidroquinona, sin blanqueador, nada que cambie la pigmentación.\"",
      },
      {
        type: "subheader",
        text: "Script 3: The Full Education + Demo (Detailed)",
        textEs: "Guion 3: La Educación Completa + Demo (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"Listen, I totally get why you're asking. The beauty industry hasn't always served darker skin well, and that's a real problem. But I'm going to explain the science so you can make an informed decision.\" [Pull out the product] \"This is the Hyaluronic Syringe. The active ingredient is hyaluronic acid — it's a sugar molecule that holds 1,000 times its weight in water. It doesn't interact with melanin AT ALL. Think about it this way: when you're dehydrated, your skin looks ashy, right? That's true for EVERY skin tone. When you rehydrate, that ashiness goes away and your natural glow comes back. That's ALL this does — extreme hydration.\" [Do a hand demo] \"Look at my hand — no makeup, nothing. Watch this.\" [Apply, wait] \"See how the skin looks plumper? That's water, not bleach. Your melanin is still there, your color is still beautiful — you're just adding hydration on top. Now here's the thing — darker skin actually shows results MORE dramatically because the contrast between dry skin and hydrated skin is more visible. The glow you get? Stunning. Here, feel it — no residue, no stickiness, no white cast. Just hydrated skin. So the real question isn't 'will it work on dark skin' — the question is 'how amazing will YOUR skin look when it's fully hydrated?' Let's find out?\"",
        textEs: "TÚ: \"Mira, totalmente entiendo por qué preguntas. La industria de la belleza no siempre ha atendido bien a la piel morena, y eso es un problema real. Pero te voy a explicar la ciencia para que tomes una decisión informada.\" [Saca el producto] \"Esta es la Jeringa Hialurónica. El ingrediente activo es ácido hialurónico — es una molécula de azúcar que retiene 1,000 veces su peso en agua. No interactúa con la melanina PARA NADA. Piénsalo así: cuando estás deshidratado, tu piel se ve opaca, ¿verdad? Eso es cierto para TODOS los tonos de piel. Cuando te rehidratas, esa opacidad se va y tu brillo natural vuelve. Eso es TODO lo que hace — hidratación extrema.\" [Haz demo en mano] \"Mira mi mano — sin maquillaje, nada. Mira esto.\" [Aplica, espera] \"¿Ves cómo la piel se ve más llena? Eso es agua, no blanqueador. Tu melanina sigue ahí, tu color sigue hermoso — solo estás agregando hidratación encima. Ahora, aquí está el punto — la piel morena de hecho muestra resultados MÁS dramáticos porque el contraste entre piel seca e hidratada es más visible. ¿El brillo que obtienes? Impresionante. Toca aquí — sin residuo, sin pegajosidad, sin capa blanca. Solo piel hidratada. Entonces la pregunta real no es 'funcionará en piel morena' — la pregunta es '¿qué tan increíble se verá TU piel cuando esté completamente hidratada?' ¿Descubrimos?\"",
      },
      {
        type: "subheader",
        text: "What NOT to Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Dismiss the question: \"It works on everyone, don't worry\" — This sounds like you don't understand their concern.",
          "Pretend all skin is the same: Acknowledge that their question is valid and rooted in real industry history.",
          "Show only white customer photos: Have diverse before/afters ready on your phone.",
          "Use medical/dermatologist claims unless true: Stay within your knowledge. Say \"I've seen\" not \"Science proves.\"",
        ],
        itemsEs: [
          "Menospreciar la pregunta: \"Funciona en todos, no te preocupes\" — Suena como si no entendieras su preocupación.",
          "Pretender que toda la piel es igual: Reconoce que su pregunta es válida y tiene raíces en la historia real de la industria.",
          "Mostrar solo fotos de clientes blancos: Ten fotos de antes/después diversas listas en tu móvil.",
          "Usar afirmaciones médicas/dermatológicas a menos que sean ciertas: Quédate dentro de tu conocimiento. Di \"he visto\" no \"la ciencia prueba.\"",
        ],
      },
      {
        type: "tip",
        text: "Keep 3-4 before/after photos of dark-skinned clients on your phone (with permission). Visual proof is 10x more powerful than words. Also, if YOU have darker skin, demo on YOURSELF. Nothing beats seeing it work on someone who looks like you. If you don't, be honest: \"I hear you — my skin's different. Let me show you on your hand so YOU can be the judge.\"",
        textEs: "Guarda 3-4 fotos de antes/después de clientes de piel morena en tu móvil (con permiso). La prueba visual es 10 veces más poderosa que las palabras. Además, si TÚ tienes piel morena, haz la demo en TI MISMO. Nada supera verlo funcionar en alguien que se parece a ti. Si no, sé honesto: \"Te entiendo — mi piel es diferente. Déjame mostrarte en tu mano para que TÚ seas el juez.\"",
      },
    ],
    quiz: [],
  },

  "O6": {
    id: "O6",
    categoryId: "objections",
    title: "Do You Test on Animals?",
    titleEs: "¿Prueban en Animales?",
    subtitle: "Turning ethical concerns into brand loyalty through transparency",
    subtitleEs: "Convirtiendo preocupaciones éticas en lealtad a la marca a través de la transparencia",
    duration: "3 min",
    icon: "Leaf",
    order: 6,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "Reading the Objection",
        textEs: "Leer la Objeción",
      },
      {
        type: "paragraph",
        text: "This isn't an objection — it's an OPPORTUNITY. Someone who cares about cruelty-free products is someone who will pay premium prices for ethical brands. They're pre-qualified buyers. Answer with pride, not defensiveness.",
        textEs: "Esto no es una objeción — es una OPORTUNIDAD. Alguien que le importa los productos libres de crueldad es alguien que pagará precios premium por marcas éticas. Son compradores pre-calificados. Responde con orgullo, no a la defensiva.",
      },
      {
        type: "subheader",
        text: "The Psychology Behind the Animal Testing Question",
        textEs: "La Psicología Detrás de la Pregunta de Pruebas en Animales",
      },
      {
        type: "bullets",
        items: [
          "Values-Based Purchasing: These customers vote with their wallet. They're not price-shopping; they're values-shopping. Win on ethics, and price becomes secondary.",
          "Information Gap: Most people WANT to believe but have been lied to before. They need PROOF, not promises.",
          "Identity Connection: Cruelty-free buyers see their purchases as an extension of their identity. Align with that identity and you become THEIR brand.",
        ],
        itemsEs: [
          "Compra Basada en Valores: Estos clientes votan con su cartera. No buscan precio; buscan valores. Gana en ética, y el precio se vuelve secundario.",
          "Brecha de Información: La mayoría QUIERE creer pero les han mentido antes. Necesitan PRUEBAS, no promesas.",
          "Conexión de Identidad: Los compradores libres de crueldad ven sus compras como extensión de su identidad. Alíneate con esa identidad y te conviertes en SU marca.",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: The Confident Confirmation (Short)",
        textEs: "Guion 1: La Confirmación Confidente (Corto)",
      },
      {
        type: "script",
        text: "YOU: \"NO. And I'm proud of that. We're certified cruelty-free — Leaping Bunny approved. Nothing on animals, ever. Clean ingredients, real results. That's the whole brand story.\"",
        textEs: "TÚ: \"NO. Y estoy orgullosa de eso. Estamos certificados libres de crueldad — aprobados por Leaping Bunny. Nada en animales, nunca. Ingredientes limpios, resultados reales. Esa es toda la historia de la marca.\"",
      },
      {
        type: "subheader",
        text: "Script 2: The Brand Story (Medium)",
        textEs: "Guion 2: La Historia de la Marca (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"Absolutely not — and that was one of the reasons I chose to work with this brand. Look, here's our certification.\" [Show on phone/packaging] \"We're Leaping Bunny certified, which means NO animal testing at ANY stage — not on ingredients, not on finished products, not in countries that require it. The whole line is vegan except for one product that has honey extract, and that's clearly labeled. Every ingredient comes from plant or mineral sources. We're basically selling you the Mediterranean in a bottle — no harm done.\"",
        textEs: "TÚ: \"Absolutamente no — y esa fue una de las razones por las que elegí trabajar con esta marca. Mira, aquí está nuestra certificación.\" [Muestra en móvil/envase] \"Estamos certificados por Leaping Bunny, lo que significa NINGUNA prueba en animales en NINGUNA etapa — ni en ingredientes, ni en productos terminados, ni en países que lo requieren. Toda la línea es vegana excepto un producto que tiene extracto de miel, y está claramente etiquetado. Cada ingrediente viene de fuentes vegetales o minerales. Básicamente te estamos vendiendo el Mediterráneo en una botella — sin daño causado.\"",
      },
      {
        type: "subheader",
        text: "Script 3: The Full Ethical Framework (Detailed)",
        textEs: "Guion 3: El Marco Ético Completo (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"I'm SO glad you asked. Hardly anybody does — the ones who do are my people.\" [Get the phone out, certification up on the screen] \"No. Never. Look — there it is, Leaping Bunny, that's the one people fake. Nothing on animals at any stage. I wouldn't be standing here selling it otherwise.\" [Put the scrub in their hand] \"Now let me tell you about this one, because I genuinely love it. That salt comes straight out of the Dead Sea. Not a version of it, not something dreamed up in a lab — scooped out of the sea and put in a jar. And the peeling? The acid in it comes out of sugar cane. That's the whole story, that's it.\" [Pause, look at them] \"You're going to feel it in about ten seconds, and that's the bit I enjoy. Give me your hand.\"",
        textEs: "TÚ: \"Me ALEGRA que lo preguntes. Casi nadie lo pregunta — y quien lo pregunta es de los míos.\" [Saca el móvil, la certificación en pantalla] \"No. Nunca. Mira — ahí lo tienes, Leaping Bunny, que es justo la que se inventa la gente. Nada en animales en ninguna fase. Si no, yo no estaría aquí vendiéndolo.\" [Ponle el exfoliante en la mano] \"Y ahora te cuento este, porque a mí me encanta de verdad. Esa sal sale directa del Mar Muerto. No es una versión, no es algo inventado en un laboratorio — la sacan del mar y la meten en el bote. ¿Y el peeling? El ácido sale de la caña de azúcar. Esa es toda la historia, ya está.\" [Pausa, mírala] \"Lo vas a notar en unos diez segundos, y esa es la parte que me gusta a mí. Dame la mano.\"",
      },
      {
        type: "subheader",
        text: "What NOT to Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Say \"I think so\" or \"I'm pretty sure\": Either you KNOW or you DON'T. Guesswork kills credibility.",
          "Get defensive: \"Well, every company does some testing\" — NO. Own your ethics proudly.",
          "Fake certifications: If you don't have Leaping Bunny, don't claim it. Say \"We don't test on animals\" instead.",
          "Rush past the question: This customer CARES. Spend time on this — it builds loyalty.",
        ],
        itemsEs: [
          "Decir \"Creo que sí\" o \"Estoy bastante seguro\": O SABES o NO SABES. Las suposiciones matan la credibilidad.",
          "Ponerte a la defensiva: \"Bueno, todas las empresas hacen algunas pruebas\" — NO. Apropia tus éticas con orgullo.",
          "Fingir certificaciones: Si no tienes Leaping Bunny, no lo alegues. Di \"No hacemos pruebas en animales\" en su lugar.",
          "Pasar rápido la pregunta: Este cliente le IMPORTA. Tómate tiempo en esto — construye lealtad.",
        ],
      },
      {
        type: "tip",
        text: "Download the Leaping Bunny app on your phone and show it in real-time. Nothing beats live verification. Also, learn ONE ingredient story per product — where it comes from, what it does, why it's better than synthetic alternatives. When you can tell the story of Dead Sea minerals or sugar cane glycolic acid with a bit of love, you stop sounding like someone reading the back of the box.",
        textEs: "Descarga la app de Leaping Bunny en tu móvil y muéstrala en tiempo real. Nada supera la verificación en vivo. Además, aprende UNA historia de ingrediente por producto — de dónde viene, qué hace, por qué es mejor que alternativas sintéticas. Cuando cuentas la historia de los minerales del Mar Muerto o del ácido glicólico de la caña de azúcar con un poco de cariño, dejas de sonar a alguien leyendo la parte de atrás de la caja.",
      },
    ],
    quiz: [],
  },

  "O7": {
    id: "O7",
    categoryId: "objections",
    title: "I Can Get This Cheaper on Amazon",
    titleEs: "En Amazon Está Más Barato",
    subtitle: "Turning price comparisons into trust and value conversations",
    subtitleEs: "Convirtiendo comparaciones de precio en conversaciones de confianza y valor",
    duration: "4 min",
    icon: "ShoppingCart",
    order: 7,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "Reading the Objection",
        textEs: "Leer la Objeción",
      },
      {
        type: "paragraph",
        text: "Amazon is the #1 objection tool for modern customers. But here's what they DON'T know: Amazon is flooded with counterfeit cosmetics, expired products, and diluted formulas. Your advantage isn't just price — it's authenticity, instant gratification, and the demo itself.",
        textEs: "Amazon es la herramienta de objeción #1 para clientes modernos. Pero esto es lo que NO saben: Amazon está inundado de cosméticos falsificados, productos vencidos, y fórmulas diluidas. Tu ventaja no es solo el precio — es autenticidad, gratificación instantánea, y la demo misma.",
      },
      {
        type: "subheader",
        text: "The Psychology Behind the Amazon Objection",
        textEs: "La Psicología Detrás de la Objeción de Amazon",
      },
      {
        type: "bullets",
        items: [
          "Price Anchoring: Amazon = \"cheap\" in their mind. You need to re-anchor around VALUE and SAFETY.",
          "Comparison Shopping Habit: Everyone checks Amazon reflexively. It's not personal — it's muscle memory.",
          "Risk Blindness: They see the price but not the counterfeit risk, the shipping wait, the inability to try before buying.",
        ],
        itemsEs: [
          "Anclaje de Precio: Amazon = \"barato\" en su mente. Necesitas re-anclar alrededor de VALOR y SEGURIDAD.",
          "Hábito de Comparar: Todos revisan Amazon reflejamente. No es personal — es memoria muscular.",
          "Ceguera al Riesgo: Ven el precio pero no el riesgo de falsificación, la espera de envío, la imposibilidad de probar antes de comprar.",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: The Counterfeit Reality (Short)",
        textEs: "Guion 1: La Realidad de las Falsificaciones (Corto)",
      },
      {
        type: "script",
        text: "YOU: \"Maybe — but here's the thing about Amazon skincare. Counterfeit cosmetics are a multi-billion industry. That 'deal' you find? Probably fake, expired, or diluted. This?\" [Hold up sealed product] \"Sealed, fresh, straight from the manufacturer. And you just watched it work on your own face. Can Amazon do that?\"",
        textEs: "TÚ: \"Tal vez — pero esto es lo del skincare en Amazon. Los cosméticos falsificados son una industria de miles de millones. ¿Esa 'ganga' que encuentras? Probablemente falsa, vencida, o diluida. ¿Esto?\" [Levanta producto sellado] \"Sellado, fresco, directo del fabricante. Y acabas de verlo funcionar en tu propia cara. ¿Amazon puede hacer eso?\"",
      },
      {
        type: "subheader",
        text: "Script 2: The Total Cost Analysis (Medium)",
        textEs: "Guion 2: El Análisis de Costo Total (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"Let's do the math together. Amazon price — what, maybe {currency}280 with shipping? And you wait a week. Then you open it and hope it's real. Here? You're in {locationName}. {currency}300, done. You walk out with it TODAY. You know it works because you felt it on YOUR skin. And I'm a real person standing in front of you, not a chatbot on a website. So the real question is: is saving {currency}20 worth risking your face on a counterfeit from who-knows-where?\"",
        textEs: "TÚ: \"Hagamos la matemática juntos. Precio en Amazon — ¿qué, tal vez {currency}280 con envío? Y esperas una semana. Luego lo abres y esperas que sea real. ¿Aquí? Estás en {locationName}. {currency}300, listo. Sales con él HOY. Sabes que funciona porque lo sentiste en TU piel. Y yo soy una persona de verdad delante de ti, no un chatbot en una web. Entonces la pregunta real es: ¿ahorrar {currency}20 vale arriesgar tu cara en una falsificación de quién-sabe-dónde?\"",
      },
      {
        type: "subheader",
        text: "Script 3: The Experience Reframe (Detailed)",
        textEs: "Guion 3: La Reconversión de Experiencia (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"Amazon, right? Everyone goes there first. But let me ask you — when you buy skincare on Amazon, what are you actually buying? A photo, a description, and a prayer. You don't know if it's been sitting in a warehouse for 18 months. You don't know if it's been exposed to heat. You don't know if it's even REAL — because fake cosmetics are everywhere now.\" [Pull out your phone, show news about counterfeit cosmetics if you have it] \"Now look at what just happened here. I put this on your face. You FELT the texture. You SAW the wrinkle disappear in 60 seconds. You're holding the sealed box in your hands. This is a full EXPERIENCE, not a transaction. And here's what people forget: that {currency}260 on Amazon isn't what you actually pay — add shipping, add the risk. And you waited a week for something that might be fake. Here? {currency}300. Real. Fresh. Instant. In your bag.\" [Pause] \"Listen, I'm not here to rip you off. I'm here because this product changed MY skin, and I love sharing that. But I also know that the version on Amazon isn't this version. This is the real deal, right here, right now. So — do you want to risk your face on a website, or do you want to walk out looking 10 years younger TODAY?\"",
        textEs: "TÚ: \"Amazon, ¿verdad? Todos van ahí primero. Pero déjame preguntarte — cuando compras skincare en Amazon, ¿qué estás comprando realmente? Una foto, una descripción, y una oración. No sabes si ha estado en un almacén por 18 meses. No sabes si ha estado expuesto al calor. No sabes si siquiera es REAL — porque los cosméticos falsos están por todos lados ahora.\" [Saca tu móvil, muestra noticias sobre cosméticos falsificados si tienes] \"Ahora mira lo que acaba de pasar aquí. Te puse esto en la cara. SENTISTE la textura. VISTE la arruga desaparecer en 60 segundos. Estás sosteniendo la caja sellada en tus manos. Esto es una EXPERIENCIA completa, no una transacción. Y esto es lo que la gente olvida: esos {currency}260 en Amazon no son lo que acabas pagando — súmale el envío y el riesgo. Y esperaste una semana por algo que podría ser falso. ¿Aquí? {currency}300. Real. Fresco. Instantáneo. En tu bolsa.\" [Pausa] \"Escucha, no estoy aquí para estafarte. Estoy aquí porque este producto cambió MI piel, y me encanta compartir eso. Pero también sé que la versión en Amazon no es esta versión. Este es el producto real, aquí, ahora. Entonces — ¿quieres arriesgar tu cara en un sitio web, o quieres salir viéndote 10 años más joven HOY?\"",
      },
      {
        type: "subheader",
        text: "What NOT to Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Trash Amazon completely: Some people love Amazon. Don't make them feel stupid for using it.",
          "Refuse to acknowledge the price difference: Admit it exists, then reframe around value.",
          "Say \"you can't find this on Amazon\" unless it's TRUE: Lying about availability destroys trust if they check.",
          "Discount to match Amazon: You're not competing on price — you're competing on experience.",
        ],
        itemsEs: [
          "Hablar mal de Amazon por completo: Algunos aman Amazon. No los hagas sentirse tontos por usarlo.",
          "Negar la diferencia de precio: Admítela, luego reconvertir alrededor del valor.",
          "Decir \"no encuentras esto en Amazon\" a menos que sea CIERTO: Mentir sobre disponibilidad destruye confianza si lo comprueban.",
          "Hacer descuento para igualar Amazon: No compites en precio — compites en experiencia.",
        ],
      },
      {
        type: "tip",
        text: "Keep a screenshot on your phone of a news article about counterfeit cosmetics on Amazon. When you pull it up and say \"Look, this was last month — millions in fake skincare seized,\" it becomes REAL. Also, the phrase \"You're not paying for the product, you're paying for knowing it's real\" is your best closer — it is about what is in the box, not about anything happening after they leave.",
        textEs: "Guarda una captura de pantalla en tu móvil de un artículo de noticias sobre cosméticos falsificados en Amazon. Cuando la sacas y dices \"Mira, esto fue el mes pasado — millones en skincare falso decomisado,\" se vuelve REAL. Además, la frase \"No estás pagando por el producto, estás pagando por saber que es auténtico\" es tu mejor cierre — va de lo que hay en la caja, no de nada que pase después de que se vayan.",
      },
    ],
    quiz: [],
  },

  "O8": {
    id: "O8",
    categoryId: "objections",
    title: "The Demo Didn't Work on Me",
    titleEs: "La Demo No Me Funcionó",
    subtitle: "Recovering credibility when the instant results don't show",
    subtitleEs: "Recuperando credibilidad cuando los resultados instantáneos no se muestran",
    duration: "5 min",
    icon: "RotateCcw",
    order: 8,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "Reading the Objection",
        textEs: "Leer la Objeción",
      },
      {
        type: "paragraph",
        text: "This is the make-or-break moment. When the demo doesn't work, you lose credibility instantly. But here's the secret: the demo ALWAYS works — when the conditions are right. Your job is to diagnose WHY it didn't work and turn that diagnosis into a deeper sale.",
        textEs: "Este es el momento de la verdad. Cuando la demo no funciona, pierdes credibilidad al instante. Pero aquí está el secreto: la demo SIEMPRE funciona — cuando las condiciones son correctas. Tu trabajo es diagnosticar POR QUÉ no funcionó y convertir ese diagnóstico en una venta más profunda.",
      },
      {
        type: "subheader",
        text: "Why Demos Sometimes Don't Show Immediate Results",
        textEs: "Por Qué las Demos A Veces No Muestran Resultados Inmediatos",
      },
      {
        type: "bullets",
        items: [
          "Dehydration Level: Severely dehydrated skin absorbs the product before it can create surface plumping. The product is working — it's just going INSIDE instead of showing on top.",
          "Heavy Makeup or SPF: Layers of product block the hyaluronic acid from penetrating. It sits on top instead of sinking in.",
          "Skin Type Variation: Very oily skin can resist absorption. Very dry skin can drink it up invisibly. Both need prep.",
          "Application Technique: Too little product, not enough pressure, wrong angle — technique matters.",
        ],
        itemsEs: [
          "Nivel de Deshidratación: Piel severamente deshidratada absorbe el producto antes de que pueda crear relleno superficial. El producto está funcionando — solo está yendo ADENTRO en vez de mostrarse arriba.",
          "Maquillaje Pesado o SPF: Capas de producto bloquean que el ácido hialurónico penetre. Se queda encima en vez de absorberse.",
          "Variación de Tipo de Piel: Piel muy grasa puede resistir la absorción. Piel muy seca puede bebérselo invisiblmente. Ambas necesitan preparación.",
          "Técnica de Aplicación: Poco producto, presión insuficiente, ángulo equivocado — la técnica importa.",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: The Immediate Pivot (Short)",
        textEs: "Guion 1: El Giro Inmediato (Corto)",
      },
      {
        type: "script",
        text: "YOU: \"Okay, I see it too — let me figure out why. Did you put on sunscreen or moisturizer this morning?\" [They answer] \"That's it — there's a barrier on your skin. Let me prep it differently. One second.\" [Clean the area, reapply] \"Watch this time.\"",
        textEs: "TÚ: \"Vale, yo también lo veo — déjame averiguar por qué. ¿Te pusiste protector solar o crema hidratante esta mañana?\" [Responden] \"Eso es — hay una barrera en tu piel. Déjame prepararla diferente. Un segundo.\" [Limpia el área, reaplica] \"Mira esta vez.\"",
      },
      {
        type: "subheader",
        text: "Script 2: The Explanation + Recovery (Medium)",
        textEs: "Guion 2: La Explicación + Recuperación (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"I can see you're disappointed, and I'm going to be honest with you — I am too. But let me explain what's happening. Your skin is THIRSTY. Like, really thirsty. When skin is this dehydrated, it drinks the product up before it has a chance to sit on the surface and create that plumping effect. It's actually WORKING — it's just working inside, not outside.\" [Clean their skin with toner/cleanser] \"Let me prep your skin properly and try again. If this was a magic trick, I'd be worried. But this is science — and science needs the right conditions.\" [Reapply with proper technique] \"There — see it now?\"",
        textEs: "TÚ: \"Puedo ver que estás decepcionada, y voy a ser honesta contigo — yo también. Pero déjame explicarte qué está pasando. Tu piel está SEDIENTA. O sea, muy sedienta. Cuando la piel está tan deshidratada, se bebe el producto antes de que tenga chance de sentarse en la superficie y crear ese efecto de relleno. De hecho ESTÁ funcionando — solo está funcionando por dentro, no por fuera.\" [Limpia su piel con tónico/limpiador] \"Déjame preparar tu piel como toca e intentar de nuevo. Si esto fuera un truco de magia, me preocuparía. Pero esto es ciencia — y la ciencia necesita las condiciones correctas.\" [Reaplica con técnica adecuada] \"Ahí — ¿lo ves ahora?\"",
      },
      {
        type: "subheader",
        text: "Script 3: The Full Diagnostic + Alternative Close (Detailed)",
        textEs: "Guion 3: El Diagnóstico Completo + Cierre Alternativo (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"Alright, let's talk about what just happened — because this is important.\" [Sit them down, take your time] \"Look, I've done this demo thousands of times. It works on 95% of people instantly. But you might be in that 5%, and that's NOT a problem — it's information. Let me ask you a few things: How much water do you drink a day?\" [Let them answer — usually 'not enough'] \"Do you use moisturizer every day?\" [Usually no or inconsistent] \"See, here's the thing. This product works by binding to water in your skin. If there's no water to bind to... it's like trying to inflate a balloon with no air. The product is doing its job — it's just that your skin needs hydration FIRST.\" [Offer a solution] \"So here's what I recommend: instead of the syringe today, start with the Dead Sea Scrub. It exfoliates the dead skin layer so products can actually penetrate. Use it for a week, drink more water, and THEN try the syringe. It's {currency}60 instead of {currency}300, and it's the foundation everything else builds on.\" [Pause] \"And next time you're over — because you will be, it's beautiful here — come and see us and show me that skin. Deal?\" [Wrap up the scrub sale] \"The syringe didn't work today because your skin wasn't ready. But the scrub? That works on EVERYONE. And it's the first step to everything else.\"",
        textEs: "TÚ: \"Bien, hablemos de lo que acaba de pasar — porque esto es importante.\" [Siéntalos, tómate tu tiempo] \"Mira, he hecho esta demo miles de veces. Funciona en el 95% de la gente al instante. Pero podrías estar en ese 5%, y eso NO es un problema — es información. Déjame preguntarte algunas cosas: ¿Cuánta agua tomas al día?\" [Déjalos responder — normalmente 'no suficiente'] \"¿Usas crema hidratante todos los días?\" [Normalmente no o inconsistente] \"Mira, aquí está la cosa. Este producto funciona uniéndose al agua en tu piel. Si no hay agua a la cual unirse... es como tratar de inflar un globo sin aire. El producto está haciendo su trabajo — solo que tu piel necesita hidratación PRIMERO.\" [Ofrece una solución] \"Entonces esto es lo que recomiendo: en vez de la jeringa hoy, empieza con el Scrub del Mar Muerto. Exfolia la capa de piel muerta para que los productos puedan penetrar. Úsalo por una semana, toma más agua, y LUEGO prueba la jeringa. Son {currency}60 en vez de {currency}300, y es la base sobre la cual todo se construye.\" [Pausa] \"Y la próxima vez que vengas — porque volverás, esto es precioso — pásate a vernos y me enseñas esa piel. ¿Trato?\" [Cierra la venta del scrub] \"La jeringa no funcionó hoy porque tu piel no estaba lista. Pero ¿el scrub? Ese funciona en TODOS. Y es el primer paso hacia todo lo demás.\"",
      },
      {
        type: "subheader",
        text: "What NOT to Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Blame their skin: \"Your skin is just bad\" — insulting the customer is career suicide.",
          "Pretend it worked: \"You can't see it but I can!\" — they KNOW it didn't work. Dishonesty kills trust.",
          "Give up on the sale: A failed syringe demo is a perfect opportunity to sell the scrub or glycolic peel instead.",
          "Get flustered or apologetic: Stay calm and clinical. \"Let's diagnose this together\" shows expertise.",
        ],
        itemsEs: [
          "Culpar su piel: \"Tu piel es mala\" — insultar al cliente es suicidio profesional.",
          "Pretender que funcionó: \"¡Tú no puedes verlo pero yo sí!\" — ellos SABEN que no funcionó. La deshonestidad mata la confianza.",
          "Rendirte con la venta: Una demo fallida de jeringa es una oportunidad perfecta para vender el scrub o el peeling glicólico en su lugar.",
          "Ponerte nervioso o a la defensiva: Mantén la calma y sé clínico. \"Diagnosticemos esto juntos\" muestra experiencia.",
        ],
      },
      {
        type: "tip",
        text: "ALWAYS carry makeup remover wipes and toner. 70% of \"failed demos\" are because of sunscreen, moisturizer, or makeup blocking absorption. Prep the skin before the demo and your success rate will triple. Also, the failed-demo pivot to scrub is one of your best sales moves — you turn disappointment into a {currency}60 sale AND set up a {currency}300 future sale. Master this.",
        textEs: "SIEMPRE carga toallitas removedoras de maquillaje y tónico. El 70% de las 'demos fallidas' son por protector solar, crema hidratante, o maquillaje bloqueando la absorción. Prepara la piel antes de la demo y tu tasa de éxito se triplicará. Además, el giro de demo fallida a scrub es uno de tus mejores movimientos de venta — conviertes la decepción en una venta de {currency}60 Y preparas una venta futura de {currency}300. Domina esto.",
      },
    ],
    quiz: [],
  },

  "O9": {
    id: "O9",
    categoryId: "objections",
    title: "My Friend Said No",
    titleEs: "Mi Amiga Dijo Que No",
    subtitle: "Separating social influence from personal desire",
    subtitleEs: "Separando la influencia social del deseo personal",
    duration: "4 min",
    icon: "Users",
    order: 9,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "Reading the Objection",
        textEs: "Leer la Objeción",
      },
      {
        type: "paragraph",
        text: "Group dynamics are tricky. When a friend says no, the interested person often shuts down — not because they don't want it, but because social harmony feels more important than personal desire. Your job is to respect the group while empowering the individual.",
        textEs: "Las dinámicas de grupo son complicadas. Cuando una amiga dice que no, la persona interesada a menudo se cierra — no porque no lo quiera, sino porque la armonía social se siente más importante que el deseo personal. Tu trabajo es respetar al grupo mientras empoderas al individuo.",
      },
      {
        type: "subheader",
        text: "The Psychology Behind \"My Friend Said No\"",
        textEs: "La Psicología Detrás de \"Mi Amiga Dijo Que No\"",
      },
      {
        type: "bullets",
        items: [
          "Social Conformity: People match group behavior to avoid conflict. The \"no\" friend becomes the group's representative.",
          "Fear of Judgment: Buying when a friend said no feels like defiance. They need permission to disagree.",
          "Shared Experience Pressure: Friends who travel together often feel purchases should be mutual decisions.",
        ],
        itemsEs: [
          "Conformidad Social: La gente iguala el comportamiento del grupo para evitar conflicto. La amiga que dijo \"no\" se convierte en representante del grupo.",
          "Miedo al Juicio: Comprar cuando una amiga dijo que no se siente como desafío. Necesitan permiso para discrepar.",
          "Presión de Experiencia Compartida: Amigas que viajan juntas a menudo sienten que las compras deben ser decisiones mutuas.",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: The Individual Reframe (Short)",
        textEs: "Guion 1: La Reconversión Individual (Corto)",
      },
      {
        type: "script",
        text: "YOU: \"Totally respect that! But quick question — is she the one wearing your skin for the next 40 years?\" [Pause, smile] \"This is YOUR face, YOUR decision. She can skip it and that's fine. But why should YOU miss out?\"",
        textEs: "TÚ: \"¡Totalmente lo respeto! Pero pregunta rápida — ¿es ella la que va a usar tu piel por los próximos 40 años?\" [Pausa, sonríe] \"Esta es TU cara, TU decisión. Ella puede pasar y está bien. ¿Pero por qué TÚ deberías perdértelo?\"",
      },
      {
        type: "subheader",
        text: "Script 2: Put the Friend in the Chair (Medium)",
        textEs: "Guion 2: Siéntala a Ella También (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"I get it — you came here together, you decide together. So let's include her.\" [Turn to the friend, all warmth] \"Come here, give me your hand — thirty seconds, on me, so you feel what she just felt. Then YOU tell her.\" [Do the friend's hand right there, in front of them both] \"And YOU — you saw the result on your own face. Don't let somebody else's 'no' steal your 'yes.' This is between you and your mirror.\"",
        textEs: "TÚ: \"Lo entiendo — habéis venido juntas, decidís juntas. Pues la metemos.\" [Vuélvete hacia la amiga, con todo el cariño] \"Ven aquí, dame la mano — treinta segundos, invita la casa, para que notes lo que acaba de notar ella. Y luego se lo dices TÚ.\" [Hazle la mano a la amiga ahí mismo, delante de las dos] \"Y TÚ — has visto el resultado en tu propia cara. No dejes que el 'no' de otra te robe tu 'sí'. Esto es entre tú y tu espejo.\"",
      },
      {
        type: "subheader",
        text: "Script 3: The Diplomatic Separation (Detailed)",
        textEs: "Guion 3: La Separación Diplomática (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"I totally get it — you two are a team, and I respect that. But let me ask you both something: when you go home tonight, are you going to be looking at HER face in the mirror, or YOUR face?\" [Look at the interested person] \"Look, she loves you — that's why she's protective. But this isn't a timeshare, it's not a scam, it's skincare. You felt it work. You saw that line disappear. That's not peer pressure, that's physics.\" [Turn to the friend] \"And honestly? I love that you have her back. That's real friendship. But real friendship also means supporting what makes your friend feel beautiful. She wants this. She's just waiting for your blessing. So what do you say — can your girl treat herself?\" [Address the interested person] \"Right, here's what we do: you take it, and she takes the credit for letting you.\" [Back to the friend, smiling] \"Go on. Give her the nod. You get to be the hero all the way home.\"",
        textEs: "TÚ: \"Lo entiendo perfectamente — sois un equipo, y lo respeto. Pero dejadme preguntaros algo a las dos: cuando lleguéis a casa esta noche, ¿vais a estar mirando la cara de ELLA en el espejo, o la TUYA?\" [Mira a la persona interesada] \"Mira, ella te quiere — por eso es protectora. Pero esto no es un timeshare, no es una estafa, es cuidado de la piel. Sentiste que funcionó. Viste esa línea desaparecer. Eso no es presión de grupo, eso es física.\" [Vuélvete hacia la amiga] \"¿Y honestamente? Me encanta que la cuidas. Esa es amistad real. Pero la amistad real también significa apoyar lo que hace sentir bella a tu amiga. Ella quiere esto. Solo está esperando tu bendición. Entonces, ¿qué dices? ¿Tu amiga puede darse un capricho?\" [Dirígete a la persona interesada] \"Venga, hacemos esto: tú te lo llevas, y el mérito se lo lleva ella por dejarte.\" [Vuelve a la amiga, sonriendo] \"Venga. Dale el visto bueno. Vas a ser la heroína todo el camino de vuelta.\"",
      },
      {
        type: "subheader",
        text: "What NOT to Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Turn them against each other: \"She's just jealous!\" — Creates conflict, not sales.",
          "Pressure the friend: Trying to hard-sell the resistant friend makes the whole group leave.",
          "Ignore the friend completely: The friend has power. Win her over, or at least neutralize her.",
          "Give each of them a different price: Whatever you hand one, the rest will want, and now you are defending several numbers at once. Make it ONE deal for the group and let them sort out between themselves who puts in what.",
        ],
        itemsEs: [
          "Enfrentarlas: \"¡Solo está celosa!\" — Crea conflicto, no ventas.",
          "Presionar a la amiga: Tratar de venderle a la amiga resistente hace que todo el grupo se vaya.",
          "Ignorar a la amiga por completo: La amiga tiene poder. Gánatela, o al menos neutralízala.",
          "Darle a cada una un precio distinto: Lo que le des a una lo van a querer todas, y ya estás defendiendo varios números a la vez. Haz UN trato para el grupo y que se apañen entre ellas quién pone qué.",
        ],
      },
      {
        type: "tip",
        text: "Doing the friend's hand is the MASTER move. It costs you a minute, it makes her part of the thing instead of the one standing there with her arms folded, and it is very hard to veto something you have just felt on your own skin. And in any group, find the \"alpha\" early — the one the others look at before they answer. Win the alpha and you have won all of them, right there at the table.",
        textEs: "Hacerle la mano a la amiga es la jugada MAESTRA. Te cuesta un minuto, la convierte en parte del asunto en vez de en la que está ahí con los brazos cruzados, y es muy difícil vetar algo que acabas de notar en tu propia piel. Y en cualquier grupo, localiza pronto a la \"alfa\" — a la que miran las demás antes de contestar. Gánate a la alfa y las tienes a todas, ahí mismo, en la mesa.",
      },
    ],
    quiz: [],
  },

  "O10": {
    id: "O10",
    categoryId: "objections",
    title: "I Don't Have Cash / Card Not Working",
    titleEs: "No Tengo Efectivo / La Tarjeta No Funciona",
    subtitle: "Turning payment obstacles into closed sales through flexibility",
    subtitleEs: "Convirtiendo obstáculos de pago en ventas cerradas a través de flexibilidad",
    duration: "3 min",
    icon: "CreditCard",
    order: 10,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "Reading the Objection",
        textEs: "Leer la Objeción",
      },
      {
        type: "paragraph",
        text: "This objection is often REAL — tourists run out of cash, cards get blocked abroad, or they hit daily limits. Unlike other objections, this isn't about desire — it's about logistics. Solve the logistics, close the sale.",
        textEs: "Esta objeción a menudo es REAL — los turistas se quedan sin efectivo, las tarjetas se bloquean en el extranjero, o alcanzan límites diarios. A diferencia de otras objeciones, esto no es sobre deseo — es sobre logística. Resuelve la logística, cierra la venta.",
      },
      {
        type: "subheader",
        text: "The Psychology Behind Payment Objections",
        textEs: "La Psicología Detrás de las Objeciones de Pago",
      },
      {
        type: "bullets",
        items: [
          "Embarrassment: People feel ashamed when their card declines. Handle it with total grace — it happens to everyone.",
          "Decision Fatigue: They've already decided to buy; the payment issue is just a speed bump. Don't let it become a wall.",
          "Loss Aversion: If they walk away to \"get cash,\" 80% never come back. Find a way to close NOW.",
        ],
        itemsEs: [
          "Vergüenza: La gente se siente avergonzada cuando su tarjeta se declina. Manéjalo con total elegancia — le pasa a todos.",
          "Fatiga de Decisión: Ya decidieron comprar; el problema de pago es solo un bache. No dejes que se convierta en muro.",
          "Aversión a la Pérdida: Si se van a \"sacar efectivo,\" el 80% nunca vuelve. Encuentra una forma de cerrar AHORA.",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: The Multiple Options (Short)",
        textEs: "Guion 1: Las Múltiples Opciones (Corto)",
      },
      {
        type: "script",
        text: "YOU: \"No worries at all! We take everything — Apple Pay, Google Pay, all cards, cash, and we can even do split payment if you want to use two cards. What works best for you?\"",
        textEs: "TÚ: \"¡Para nada te preocupes! Aceptamos todo — Apple Pay, Google Pay, todas las tarjetas, efectivo, e incluso podemos hacer pago dividido si quieres usar dos tarjetas. ¿Qué te funciona mejor?\"",
      },
      {
        type: "subheader",
        text: "Script 2: The Split Payment Solution (Medium)",
        textEs: "Guion 2: La Solución de Pago Dividido (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"Card problems abroad are the WORST, I know. Happened to me in Barcelona last month. Here's what we can do: split it across two cards, or I can hold the product for 30 minutes while you grab cash from that ATM right there.\" [Point] \"Or — do you have Apple Pay or Google Pay on your phone? Sometimes that works when the physical card doesn't. Let's try?\"",
        textEs: "TÚ: \"Los problemas de tarjeta en el extranjero son lo PEOR, lo sé. Me pasó en Barcelona el mes pasado. Esto es lo que podemos hacer: dividirlo entre dos tarjetas, o puedo guardar el producto por 30 minutos mientras sacas efectivo de ese cajero ahí.\" [Señala] \"¿O — tienes Apple Pay o Google Pay en tu móvil? A veces eso funciona cuando la tarjeta física no. ¿Intentamos?\"",
      },
      {
        type: "subheader",
        text: "Script 3: The Full Flexibility Framework (Detailed)",
        textEs: "Guion 3: El Marco de Flexibilidad Completa (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"Okay, let's solve this together — because I don't want a little card hiccup to stop you from getting something you love.\" [Be calm, problem-solving tone] \"Let's go through our options one by one. Option one: do you have another card? Debit, credit, even a prepaid travel card?\" [If yes, try it] \"Option two: Apple Pay, Google Pay, Samsung Pay — anything on your phone?\" [If yes, set it up] \"Option three: split payment. Put {currency}150 on this card, {currency}150 in cash. Or any combination.\" [Work with them] \"Option four: I literally hold the product, put your name on it, and you have 20 minutes to hit that ATM right across the street. No one else gets it.\" [Stay warm, keep the problem-solving tone] \"So... which option works for you? Because I'm not letting you walk away from results like these over a card glitch.\"",
        textEs: "TÚ: \"Vale, resolvamos esto juntos — porque no quiero que un pequeño problema de tarjeta te impida llevarte algo que amas.\" [Sé calmado, tono de resolución de problemas] \"Revisemos nuestras opciones una por una. Opción uno: ¿tienes otra tarjeta? Débito, crédito, incluso una tarjeta de viaje prepagada?\" [Si sí, inténtala] \"Opción dos: Apple Pay, Google Pay, Samsung Pay — ¿algo en tu móvil?\" [Si sí, configúralo] \"Opción tres: pago dividido. Pon {currency}150 en esta tarjeta, {currency}150 en efectivo. O cualquier combinación.\" [Trabaja con ellos] \"Opción cuatro: literalmente guardo el producto, pongo tu nombre en él, y tienes 20 minutos para ir a ese cajero justo cruzando la calle. Nadie más se lo lleva.\" [Sigue cercano, en modo resolución] \"Entonces... ¿cuál opción te funciona? Porque no voy a dejar que te vayas de resultados como estos por un fallo de tarjeta.\"",
      },
      {
        type: "subheader",
        text: "What NOT to Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Show frustration: A sigh or eye roll when their card declines kills the vibe instantly.",
          "Make them feel poor: \"Oh, you don't have enough?\" — Never. Assume it's a technical issue, not a financial one.",
          "Say \"come back later\": They will not. Not with a plan, not without one. Keep the box on the counter with their name on it and work down the options until one of them lands.",
          "Send them off with a consolation prize: No sample, no card, nothing to take away — that is the same walk-out with a goodbye gift attached. If the money genuinely is not there, be lovely about it, hands empty, and get straight back on the floor.",
        ],
        itemsEs: [
          "Mostrar frustración: Un suspiro o volteo de ojos cuando la tarjeta se declina mata el ambiente al instante.",
          "Hacerlos sentir pobres: \"¿Oh, no tienes suficiente?\" — Nunca. Asume que es un problema técnico, no financiero.",
          "Decir \"vuelve luego\": No van a volver. Ni con plan ni sin plan. Deja la caja en el mostrador con su nombre puesto y ve bajando por las opciones hasta que una entre.",
          "Despedirlos con un premio de consolación: Ni muestra, ni tarjeta, nada para llevarse — eso es la misma marcha con un regalito de despedida. Si de verdad no está el dinero, sé encantador, con las manos vacías, y vuelve al ruedo.",
        ],
      },
      {
        type: "tip",
        text: "Always know where the nearest ATM is — and have a backup plan. If their card truly doesn't work, suggest they send money via PayPal or Venmo if your store accepts it. Some stores also accept Revolut or Wise transfers for international tourists. The more payment options you can offer, the more sales you close. And ALWAYS — I mean ALWAYS — offer to hold the product with their name on it. Putting their name on a box creates ownership psychology.",
        textEs: "Siempre sabe dónde está el cajero más cercano — y ten un plan B. Si su tarjeta realmente no funciona, sugiere que envíen dinero por PayPal o Venmo si tu tienda lo acepta. Algunas tiendas también aceptan transferencias de Revolut o Wise para turistas internacionales. Más opciones de pago = más ventas cerradas. Y SIEMPRE — digo SIEMPRE — ofrece guardar el producto con su nombre. Poner su nombre en una caja crea psicología de propiedad.",
      },
    ],
    quiz: [],
  },
};

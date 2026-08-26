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

// ═══════════════════════════════════════════════════════════
// QUIZ 1: SYRINGE DEEP DIVE
// ═══════════════════════════════════════════════════════════
const quizSyringeDeep: GeneralQuiz = {
  id: "quiz-syringe-deep",
  title: "Syringe Deep Dive",
  titleEs: "Inmersión en la Jeringa",
  description:
    "Master the Hyaluronic Acid Syringe — from the one-eye demo to the price ladder and the \"natural Botox\" positioning that closes street sales.",
  descriptionEs:
    "Domina la Jeringa de Ácido Hialurónico — desde la demo de un ojo hasta la escalera de precios y el posicionamiento de \"Botox natural\" que cierra ventas en la calle.",
  icon: "Syringe",
  category: "Product Mastery",
  categoryEs: "Dominio de Producto",
  xpReward: 150,
  questions: [
    {
      question:
        "You demonstrate the syringe on ONE eye only. Why is this technique so effective?",
      questionEs:
        "Demuestras la jeringa en UN SOLO ojo. ¿Por qué esta técnica es tan efectiva?",
      options: [
        "It saves product so you can do more demos in a shift, which matters when the syringe is your most expensive stock",
        "It creates a dramatic before/after contrast the customer can see in the mirror",
        "It's faster so you can move to the next customer sooner, and speed is what fills a shift with sales",
        "Most people only have wrinkles on one side because of how they sleep, so you treat the side that needs it"
      ],
      optionsEs: [
        "Ahorra producto para hacer más demos por turno, algo importante cuando la jeringa es tu stock más caro",
        "Crea un contraste dramático antes/después que la cliente ve en el espejo",
        "Es más rápido y así pasas antes al siguiente cliente, y la velocidad es lo que llena un turno de ventas",
        "La mayoría solo tiene arrugas de un lado por cómo duerme, así que tratas el lado que lo necesita"
      ],
      correctIndex: 1,
      explanation:
        "The one-eye demo is the single most powerful closing tool. When the customer looks in the mirror and sees one eye smooth and lifted while the other shows wrinkles, the visual difference creates an emotional 'wow' moment that bypasses logical objections. Always ask: 'Do you see the difference?' and let the mirror sell for you.",
      explanationEs:
        "La demo de un ojo es la herramienta de cierre más poderosa. Cuando la cliente se ve en el espejo y ve un ojo suave y levantado mientras el otro muestra arrugas, la diferencia visual crea un momento emocional de 'wow' que evita objeciones lógicas. Siempre pregunta: '¿Ves la diferencia?' y deja que el espejo venda por ti."
    },
    {
      question:
        "A customer says the one-eye result looks good but asks, 'Will it last?' What is your BEST response?",
      questionEs:
        "Una cliente dice que el resultado del ojo se ve bien pero pregunta: '¿Va a durar?' ¿Cuál es tu MEJOR respuesta?",
      options: [
        "Yes, it lasts 24 hours guaranteed",
        "Each application builds lasting results — daily use for 30 days gives effects that last months",
        "No anti-aging product lasts forever, but it's cheap enough to keep buying",
        "It lasts until you wash your face, but the full kit helps it last longer"
      ],
      optionsEs: [
        "Sí, dura 24 horas garantizado",
        "Cada aplicación acumula resultados duraderos — uso diario por 30 días da efectos que duran meses",
        "Ningún producto antiedad dura para siempre, pero es barato para seguir comprando",
        "Dura hasta que te laves la cara, pero el kit completo ayuda a que dure más"
      ],
      correctIndex: 1,
      explanation:
        "This answer is honest AND motivating. It educates the customer that skincare is cumulative, positions the syringe as an investment in long-term results, and creates a reason to buy multiple units. Never promise instant permanent results — that damages trust. Instead, frame consistency as the path to lasting change.",
      explanationEs:
        "Esta respuesta es honesta Y motivadora. Educa a la cliente de que el cuidado de la piel es acumulativo, posiciona la jeringa como una inversión en resultados a largo plazo, y crea una razón para comprar múltiples unidades. Nunca prometas resultados permanentes instantáneos — eso daña la confianza. En cambio, enmarca la consistencia como el camino al cambio duradero."
    },
    {
      question:
        "Which of these is the CORRECT price ladder for the Hyaluronic Acid Syringe?",
      questionEs:
        "¿Cuál de estas es la escalera de precios CORRECTA para la Jeringa de Ácido Hialurónico?",
      options: [
        "{currency}500 → {currency}300 → {currency}210 → {currency}175 → {currency}140 → {currency}100",
        "{currency}500 → {currency}350 → {currency}250 → {currency}175 → {currency}120",
        "{currency}400 → {currency}280 → {currency}200 → {currency}150 → {currency}100 → {currency}80",
        "{currency}600 → {currency}400 → {currency}300 → {currency}200 → {currency}150 → {currency}120"
      ],
      optionsEs: [
        "{currency}500 → {currency}300 → {currency}210 → {currency}175 → {currency}140 → {currency}100",
        "{currency}500 → {currency}350 → {currency}250 → {currency}175 → {currency}120",
        "{currency}400 → {currency}280 → {currency}200 → {currency}150 → {currency}100 → {currency}80",
        "{currency}600 → {currency}400 → {currency}300 → {currency}200 → {currency}150 → {currency}120"
      ],
      correctIndex: 0,
      explanation:
        "The price ladder is: {currency}500 (Europe anchor) → {currency}300 (local base price) → {currency}210 (Offer 1: 30% off plus a free gift) → {currency}175 (the same single syringe with the gift taken away) → {currency}140 (the 20% voucher close) → {currency}100 (absolute floor). Every rung is ONE syringe — the only multi-unit deal is Offer 2, which keeps the price at {currency}300 and adds a second syringe free. Each drop creates a 'yes ladder' moment, and the {currency}500 anchor makes everything below it feel like a bargain.",
      explanationEs:
        "La escalera de precios es: {currency}500 (ancla de Europa) → {currency}300 (precio base local) → {currency}210 (Oferta 1: 30% de descuento más regalo) → {currency}175 (la misma jeringa individual, sin el regalo) → {currency}140 (el cierre con cupón del 20%) → {currency}100 (mínimo absoluto). Cada escalón es UNA jeringa — el único trato de varias unidades es la Oferta 2, que mantiene el precio en {currency}300 y añade una segunda jeringa gratis. Cada bajada crea un momento de 'escalera de sí', y el ancla de {currency}500 hace que todo lo de abajo parezca una ganga."
    },
    {
      question:
        "When should you use the emergency price of {currency}100 for the syringe?",
      questionEs:
        "¿Cuándo deberías usar el precio de emergencia de {currency}100 para la jeringa?",
      options: [
        "You do not use it — you go full market and fetch a manager, and the number comes out of his mouth",
        "Immediately, to every customer who shows interest, because the lowest number is the one that stops them walking",
        "When the customer says she has less than that on her, so you match the price to whatever is in the wallet",
        "At the end of the day to clear the remaining stock, so nothing goes back into the box unsold"
      ],
      optionsEs: [
        "Tú no lo usas — vas a mercado puro y traes al encargado, y el número sale de su boca",
        "De inmediato, a toda clienta que muestre interés, porque la cifra más baja es la que evita que se vayan",
        "Cuando la clienta dice que lleva menos encima, y ajustas el precio a lo que tenga en la cartera",
        "Al final del día para liquidar el stock que queda, y que nada vuelva a la caja sin vender"
      ],
      correctIndex: 0,
      explanation:
        "This is the one price on the ladder that is not yours. You use the voucher once, {currency}175 down to {currency}140, and that is as far as your own authority goes. Below it you go full market, you tell her the number is not yours to give, and you walk off and come back WITH a manager — because a seller who can reach the bottom on their own has no bottom, and she can always ask for one more.",
      explanationEs:
        "Este es el único precio de la escalera que no es tuyo. El cupón lo usas una vez, de {currency}175 a {currency}140, y hasta ahí llega tu autoridad. Por debajo vas a mercado puro, le dices que ese número no es tuyo, y te vas y vuelves CON el encargado — porque un vendedor que puede llegar al fondo él solo no tiene fondo, y ella siempre te puede pedir uno más."
    },
    {
      question:
        "How do you position the syringe as 'natural Botox' without making medical claims that could get you in trouble?",
      questionEs:
        "¿Cómo posicionas la jeringa como 'Botox natural' sin hacer afirmaciones médicas que te puedan causar problemas?",
      options: [
        "Say it contains actual Botox from the same factory",
        "Say it's the 'natural, needle-free alternative' that works with your body's own hyaluronic acid",
        "Call it 'Botox in a bottle' and say doctors hate this trick",
        "Show before/after photos of Botox patients and claim they're from your product"
      ],
      optionsEs: [
        "Decir que contiene Botox real de la misma fábrica",
        "Decir que es la 'alternativa natural, sin agujas' que trabaja con el ácido hialurónico de tu propio cuerpo",
        "Llamarlo 'Botox en botella' y decir que los doctores odian este truco",
        "Mostrar fotos antes/después de pacientes de Botox y afirmar que son de tu producto"
      ],
      correctIndex: 1,
      explanation:
        "The phrase 'natural, needle-free alternative' draws the comparison without making false medical claims. It positions the product alongside Botox (the gold standard) while emphasizing the advantages: no needles, no doctor visits, no frozen face, works WITH your body. Always use phrases like 'people say it's like...' rather than claiming medical equivalence directly.",
      explanationEs:
        "La frase 'alternativa natural, sin agujas' establece la comparación sin hacer afirmaciones médicas falsas. Posiciona el producto junto al Botox (el estándar de oro) mientras enfatiza las ventajas: sin agujas, sin visitas al doctor, sin cara congelada, trabaja CON tu cuerpo. Siempre usa frases como 'la gente dice que es como...' en lugar de afirmar equivalencia médica directamente."
    },
    {
      question:
        "A customer asks, 'How exactly do I apply this at home?' What is the CORRECT technique to teach them?",
      questionEs:
        "Una cliente pregunta: '¿Cómo exactamente me aplico esto en casa?' ¿Cuál es la técnica CORRECTA para enseñarle?",
      options: [
        "Rub it in like a regular cream all over your face",
        "Apply thick layer before bed and wash off in the morning",
        "Mix it with your moisturizer for easier application",
        "Pat a tiny amount onto clean skin, focus on wrinkles, let it absorb — do not rub"
      ],
      optionsEs: [
        "Frotarlo como una crema normal por toda la cara",
        "Aplicar capa gruesa antes de dormir y lavar en la mañana",
        "Mezclarlo con tu hidratante para aplicación más fácil",
        "Aplicar una pequeña cantidad sobre piel limpia, enfocar en arrugas, dejar absorber — no frotar"
      ],
      correctIndex: 3,
      explanation:
        "The syringe is concentrated — a little goes a long way. The correct technique is: cleanse the face, pat (don't rub) a tiny amount directly onto wrinkle lines and crow's feet, allow 2-3 minutes to absorb before applying moisturizer. Rubbing disperses the active ingredients instead of concentrating them where needed. Teaching proper use also reduces complaints and increases satisfaction.",
      explanationEs:
        "La jeringa es concentrada — un poco rinde mucho. La técnica correcta es: limpiar la cara, aplicar (sin frotar) una pequeña cantidad directamente sobre líneas de arrugas y patas de gallo, esperar 2-3 minutos a que absorba antes de aplicar hidratante. Frotar dispersa los ingredientes activos en lugar de concentrarlos donde se necesitan. Enseñar el uso adecuado también reduce quejas y aumenta la satisfacción."
    },
    {
      question:
        "Which of these is a TRUE benefit of hyaluronic acid that you should emphasize during your pitch?",
      questionEs:
        "¿Cuál de estos es un beneficio REAL del ácido hialurónico que deberías enfatizar durante tu pitch?",
      options: [
        "It holds 1000x its weight in water, plumping skin from within",
        "It permanently removes wrinkles after one use",
        "It bleaches dark spots and evens skin tone",
        "It replaces the need for sunscreen completely"
      ],
      optionsEs: [
        "Retiene 1000 veces su peso en agua, rellenando la piel desde adentro",
        "Elimina arrugas permanentemente después de un uso",
        "Blanquea manchas oscuras y unifica el tono de piel",
        "Reemplaza completamente la necesidad de protector solar"
      ],
      correctIndex: 0,
      explanation:
        "Hyaluronic acid is already in her skin and it holds a huge amount of water for its weight — that is the whole story and it is the one you tell: it pulls moisture in and plumps the line from underneath. The other three options are the ones that come back on the shop. 'Removes wrinkles permanently', 'bleaches dark spots' and 'replaces sunscreen' are promises the product cannot keep and you are the one who will be standing there when she comes back about it. Talk it up all you like — that is the job — but do not dress it up as laboratory proof. You are a seller, not a scientist, and she can tell the difference.",
      explanationEs:
        "El ácido hialurónico ya está en su piel y retiene una cantidad enorme de agua para lo que pesa — esa es toda la historia y es la que cuentas: atrae la humedad y rellena la línea desde abajo. Las otras tres opciones son las que te acaban salpicando a la tienda. 'Elimina las arrugas para siempre', 'blanquea las manchas' y 'sustituye al protector solar' son promesas que el producto no puede cumplir y ahí vas a estar tú cuando vuelva a reclamarlas. Véndelo todo lo alto que quieras — eso es el trabajo — pero no lo disfraces de prueba de laboratorio. Eres vendedor, no científico, y ella nota la diferencia."
    },
    {
      question:
        "You are down at {currency}140 with the voucher on and she is still chewing on the number. How do you use 'cost per use' to close it?",
      questionEs:
        "Estás abajo, en {currency}140 con el cupón puesto, y sigue dándole vueltas a la cifra. ¿Cómo usas el 'coste por uso' para cerrarlo?",
      options: [
        "It's actually cheap compared to a facelift",
        "Sixty applications in that syringe, one a week — {currency}140 across a whole year is a bit over {currency}2 a go, less than the coffee in your hand",
        "You're not paying for cream, you're paying for confidence",
        "Do the sum on the {currency}300 instead, because the bigger the number you divide up the more impressive the saving is going to sound to her when you finally say it out loud"
      ],
      optionsEs: [
        "Es barato comparado con un lifting",
        "Sesenta aplicaciones en esa jeringa, una por semana — {currency}140 repartidos en un año es poco más de {currency}2 cada vez, menos que el café que llevas en la mano",
        "No estás pagando por crema, estás pagando por confianza",
        "Haz la cuenta con los {currency}300, porque cuanto más grande sea el número que divides más impresionante le va a sonar el ahorro cuando por fin se lo digas en voz alta"
      ],
      correctIndex: 1,
      explanation:
        "Do the sum on the rung you are STANDING on. {currency}140 across sixty weekly applications is a bit over {currency}2 a time — small, true, and it beats the coffee. Run the same calculator on {currency}300 and it comes out at more than that coffee, not less, so the comparison collapses in front of her AND you have played her back a number she already refused. Say the small number once, then shut up and let her finish the sum herself.",
      explanationEs:
        "Haz la cuenta en el escalón donde ESTÁS. {currency}140 entre sesenta aplicaciones semanales sale a poco más de {currency}2 cada vez — pequeño, cierto, y le gana al café. Saca la misma calculadora con {currency}300 y te sale más caro que ese café, no más barato, así que la comparación se te cae delante de ella Y encima le repites un número que ya ha rechazado. Di el número pequeño una vez, cállate y deja que termine ella la cuenta."
    },
    {
      question:
        "A customer is impressed by the one-eye demo but says, 'I need to ask my husband first.' What is your BEST response?",
      questionEs:
        "Una cliente está impresionada por la demo de un ojo pero dice: 'Necesito preguntarle a mi esposo primero.' ¿Cuál es tu MEJOR respuesta?",
      options: [
        "Okay, come back when he says yes — I'll be here all week, and the offer will be waiting for you when he has agreed",
        "Call him right now and I'll explain it to him myself — men always understand it better when they hear the numbers directly",
        "How much did your last haircut cost? Did you ask permission? This is your face, your decision, and today's price won't be here tomorrow",
        "Most husbands say no to everything, just buy it and hide it — by the time he notices, you will already be using it every week"
      ],
      optionsEs: [
        "Vale, vuelve cuando él diga que sí — estaré aquí toda la semana y la oferta te seguirá esperando",
        "Llámalo ahora mismo y se lo explico yo — a los hombres siempre les entra mejor cuando oyen las cifras directamente",
        "¿Cuánto costó tu último corte de pelo? ¿Pediste permiso? Esta es tu cara, tu decisión, y el precio de hoy no estará mañana",
        "La mayoría de los maridos dicen que no a todo, cómpralo y escóndelo — para cuando se dé cuenta ya lo estarás usando cada semana"
      ],
      correctIndex: 2,
      explanation:
        "This response empowers the customer without being aggressive. The haircut analogy makes her realize she makes purchase decisions independently all the time. 'Your face, your decision' appeals to autonomy. The scarcity note (today's price) creates urgency. Never mock the husband or pressure in a way that feels manipulative — empowerment closes more sales than pressure.",
      explanationEs:
        "Esta respuesta empodera a la cliente sin ser agresiva. La analogía del corte de pelo le hace darse cuenta de que toma decisiones de compra independientemente todo el tiempo. 'Tu cara, tu decisión' apela a la autonomía. La nota de escasez (precio de hoy) crea urgencia. Nunca te burles del esposo ni presiones de manera manipuladora — el empoderamiento cierra más ventas que la presión."
    },
    {
      question:
        "A customer is ready to take Offer 1 — one syringe at {currency}210 with a free gift. How do you move her up to Offer 2, {currency}300 with a second syringe free?",
      questionEs:
        "Una cliente está lista para llevarse la Oferta 1 — una jeringa a {currency}210 con regalo. ¿Cómo la subes a la Oferta 2, {currency}300 con una segunda jeringa gratis?",
      options: [
        "You should take the second one because it works out cheaper per syringe that way, and everybody who does the maths ends up taking two",
        "If you don't take the second one now you are going to regret it later, because this offer is not on the table every week",
        "For just {currency}90 more you get a whole second syringe free — enough for the forehead and upper lip too, not only the eyes. That is the full-face version of what you just saw",
        "The single syringe is a bad deal, the two-syringe offer is much smarter and honestly nobody should buy just the one"
      ],
      optionsEs: [
        "Deberías llevarte la segunda porque así sale más barata cada jeringa, y todo el que hace la cuenta acaba llevándose dos",
        "Si no te llevas la segunda ahora te vas a arrepentir después, porque esta oferta no está en la mesa todas las semanas",
        "Por solo {currency}90 más te llevas una segunda jeringa entera gratis — suficiente para la frente y el labio superior también, no solo los ojos. Es la versión de cara completa de lo que acabas de ver",
        "La jeringa sola es mal negocio, la oferta de dos es mucho más inteligente y nadie debería llevarse solo una"
      ],
      correctIndex: 2,
      explanation:
        "The upgrade pitch uses the 'just a little more' framing — {currency}90 is the real gap between Offer 1 ({currency}210) and Offer 2 ({currency}300), and it sounds small next to what she has already agreed to spend. Naming the extra treatment areas gives her a concrete picture instead of an abstract discount. Notice it doesn't insult Offer 1 — you're building on her 'yes,' not criticising it. This upsell technique increases your average ticket significantly.",
      explanationEs:
        "El pitch de mejora usa el encuadre de 'solo un poco más' — {currency}90 es la diferencia real entre la Oferta 1 ({currency}210) y la Oferta 2 ({currency}300), y suena pequeña al lado de lo que ya ha aceptado gastar. Nombrar las zonas extra le da una imagen concreta en vez de un descuento abstracto. Fíjate en que no menosprecia la Oferta 1 — estás construyendo sobre su 'sí', no criticándolo. Esta técnica de venta adicional aumenta bastante tu ticket medio."
    }
  ]
};

// ═══════════════════════════════════════════════════════════
// QUIZ 2: GLYCOLIC PEELING MASTERY
// ═══════════════════════════════════════════════════════════
const quizPeelingMastery: GeneralQuiz = {
  id: "quiz-peeling-mastery",
  title: "Glycolic Peeling Mastery",
  titleEs: "Dominio del Peeling Glicólico",
  description:
    "Become the ultimate Glycolic Peeling Kit expert. Learn the science, the price ladder, application technique, and how to bundle it with the scrub for maximum sales.",
  descriptionEs:
    "Conviértete en el experto definitivo del Kit de Peeling Glicólico. Aprende la ciencia, la escalera de precios, la técnica de aplicación y cómo empaquetarlo con el scrub para ventas máximas.",
  icon: "Sparkles",
  category: "Product Mastery",
  categoryEs: "Dominio de Producto",
  xpReward: 150,
  questions: [
    {
      question:
        "What does glycolic acid actually DO to the skin that makes it so effective?",
      questionEs:
        "¿Qué hace el ácido glicólico REALMENTE a la piel que lo hace tan efectivo?",
      options: [
        "It bleaches the skin to make it lighter",
        "It fills wrinkles like a filler injection",
        "It tightens skin by dehydrating it",
        "It dissolves dead skin cells and triggers collagen production"
      ],
      optionsEs: [
        "Blanquea la piel para hacerla más clara",
        "Rellena arrugas como una inyección de relleno",
        "Aprieta la piel deshidratándola",
        "Disuelve células muertas y estimula la producción de colágeno"
      ],
      correctIndex: 3,
      explanation:
        "Glycolic acid is an alpha-hydroxy acid (AHA) with the smallest molecular size, allowing it to penetrate deeply. It works by dissolving the 'glue' between dead skin cells (exfoliation) and stimulating fibroblasts to produce new collagen. This dual action — removing the old and building the new — is what creates the glow. Understanding this science makes you sound like an expert, not just a salesperson.",
      explanationEs:
        "El ácido glicólico es un alfa-hidroxiácido (AHA) con el tamaño molecular más pequeño, permitiéndole penetrar profundamente. Funciona disolviendo el 'pegamento' entre células muertas (exfoliación) y estimulando fibroblastos para producir colágeno nuevo. Esta acción dual — eliminar lo viejo y construir lo nuevo — es lo que crea el brillo. Entender esta ciencia te hace sonar como un experto, no solo un vendedor."
    },
    {
      question:
        "What is the CORRECT price ladder for the Glycolic Peeling Kit?",
      questionEs:
        "¿Cuál es la escalera de precios CORRECTA para el Kit de Peeling Glicólico?",
      options: [
        "{currency}500 → {currency}300 → {currency}200 → {currency}150 → {currency}100 → {currency}70",
        "{currency}300 → {currency}250 → {currency}180 → {currency}120 → {currency}80 → {currency}60",
        "{currency}200 → {currency}150 → {currency}100 → {currency}70 → {currency}50",
        "{currency}400 → {currency}280 → {currency}200 → {currency}150 → {currency}100 → {currency}75"
      ],
      optionsEs: [
        "{currency}500 → {currency}300 → {currency}200 → {currency}150 → {currency}100 → {currency}70",
        "{currency}300 → {currency}250 → {currency}180 → {currency}120 → {currency}80 → {currency}60",
        "{currency}200 → {currency}150 → {currency}100 → {currency}70 → {currency}50",
        "{currency}400 → {currency}280 → {currency}200 → {currency}150 → {currency}100 → {currency}75"
      ],
      correctIndex: 2,
      explanation:
        "The Glycolic Peeling Kit ladder is: {currency}200 (Europe anchor) → {currency}150 (local base) → {currency}100 (Offer 1: 50% off plus the Dead Sea Scrub as a gift) → {currency}70 (the Scrub taken out and its value given back as credit) → {currency}50 (voucher close, and the absolute floor). Every rung is one bottle. Notice it's roughly 1/3 the price of the syringe — this positioning matters when bundling. The lower entry point makes it an easier upsell after the syringe sale or a great standalone for budget-conscious customers.",
      explanationEs:
        "La escalera del Kit de Peeling Glicólico es: {currency}200 (ancla de Europa) → {currency}150 (base local) → {currency}100 (Oferta 1: 50% de descuento más el Exfoliante del Mar Muerto de regalo) → {currency}70 (se saca el Exfoliante y se devuelve su valor como crédito) → {currency}50 (cierre con cupón, y mínimo absoluto). Cada escalón es un frasco. Fíjate en que es aproximadamente 1/3 del precio de la jeringa — este posicionamiento importa al empaquetar. El punto de entrada más bajo lo hace una venta adicional más fácil después de la venta de la jeringa o una excelente opción independiente para clientes conscientes del presupuesto."
    },
    {
      question:
        "When demonstrating the glycolic peeling, how long should you leave it on during the demo before neutralizing?",
      questionEs:
        "Al demostrar el peeling glicólico, ¿cuánto tiempo deberías dejarlo actuar durante la demo antes de neutralizar?",
      options: [
        "3-5 minutes — enough to feel the tingle without risking a reaction",
        "30 seconds — any longer is dangerous",
        "15 minutes — the longer the better results",
        "Leave it on and let the customer decide when to remove it"
      ],
      optionsEs: [
        "3-5 minutos — suficiente para sentir el hormigueo sin arriesgar una reacción",
        "30 segundos — más tiempo es peligroso",
        "15 minutos — entre más tiempo mejores resultados",
        "Dejarlo actuar y dejar que la cliente decida cuándo quitarlo"
      ],
      correctIndex: 0,
      explanation:
        "For a street demo, 3-5 minutes is the sweet spot. The customer should feel a slight tingle (which proves it's working) but you must neutralize before any redness becomes visible. Safety is your #1 priority — a bad reaction on the street destroys your credibility and could cause liability issues. Always have neutralizer ready and explain the tingling sensation before applying.",
      explanationEs:
        "Para una demo de calle, 3-5 minutos es el punto ideal. La cliente debería sentir un ligero hormigueo (que prueba que está funcionando) pero debes neutralizar antes de que aparezca enrojecimiento. La seguridad es tu prioridad #1 — una mala reacción en la calle destruye tu credibilidad y podría causar problemas de responsabilidad. Siempre ten el neutralizador listo y explica la sensación de hormigueo antes de aplicar."
    },
    {
      question:
        "A customer says, 'My skin is sensitive — can I still use this?' What is the CORRECT answer?",
      questionEs:
        "Una cliente dice: 'Mi piel es sensible — ¿aún puedo usar esto?' ¿Cuál es la respuesta CORRECTA?",
      options: [
        "Absolutely not, glycolic acid is only for normal skin — with sensitive skin you should take the scrub instead",
        "Sensitive skin actually needs stronger exfoliation, so use it daily until the skin toughens up and stops reacting",
        "It only works on sensitive skin, so you will get better results from it than almost anyone else who buys it",
        "Yes — but start with just 2 minutes, once per week, and always do a patch test behind the ear first"
      ],
      optionsEs: [
        "En absoluto, el ácido glicólico es solo para piel normal — con piel sensible mejor llévate el exfoliante",
        "La piel sensible necesita exfoliación más fuerte, así que úsalo a diario hasta que la piel se acostumbre y deje de reaccionar",
        "Solo funciona en piel sensible, así que sacarás mejores resultados que casi cualquiera que lo compre",
        "Sí — pero empieza con solo 2 minutos, una vez por semana, y siempre haz una prueba de parche detrás de la oreja primero"
      ],
      correctIndex: 3,
      explanation:
        "This is the honest, safe answer that also makes the sale. Sensitive skin CAN use glycolic acid — the key is starting slow and testing first. By giving specific guidance (2 minutes, once/week, patch test), you sound knowledgeable and responsible. Never promise zero risk, but don't turn away sales unnecessarily either. The patch test recommendation builds trust and covers you.",
      explanationEs:
        "Esta es la respuesta honesta y segura que también cierra la venta. La piel sensible PUEDE usar ácido glicólico — la clave es empezar despacio y probar primero. Al dar orientación específica (2 minutos, una vez/semana, prueba de parche), suenas conocedor y responsable. Nunca prometas cero riesgo, pero tampoco rechaces ventas innecesariamente. La recomendación de prueba de parche construye confianza y te protege."
    },
    {
      question:
        "When does the Glycolic Peeling actually get sold — and when does it NOT?",
      questionEs:
        "¿Cuándo se vende de verdad el Peeling Glicólico — y cuándo NO?",
      options: [
        "Its own demo and its own ladder, or as the gift on the syringe offer — never bolted onto a syringe sale",
        "Always straight after a syringe sale, because she has her card out and her resistance is at its lowest point of the whole demo",
        "Only to customers who turned the syringe down, so the peeling becomes the thing that rescues an eye demo that did not land",
        "Whenever she mentions dull skin, even if that happens after she has paid for something else and is on her way out of the door"
      ],
      optionsEs: [
        "Con su propia demo y su propia escalera, o como el regalo de la oferta — nunca encajado a una venta de jeringa",
        "Siempre justo después de vender la jeringa, porque tiene la tarjeta fuera y su resistencia está en el punto más bajo de toda la demo",
        "Solo a quien ha rechazado la jeringa, para que el peeling rescate una demo de ojos que no ha cuajado",
        "Cuando mencione la piel apagada, aunque sea después de haber pagado otra cosa y esté ya saliendo por la puerta"
      ],
      correctIndex: 0,
      explanation:
        "The peeling is a real sale with a real ladder — it just is not a bolt-on. After a syringe sale the seller does not start pitching a second product at all: the syringe WAS the job, and she gets handed to the specialist. The peeling earns its money on its own demo, or riding along as the chosen gift at the promo rung.",
      explanationEs:
        "El peeling es una venta de verdad con su escalera de verdad — lo que no es es un añadido. Después de vender la jeringa el vendedor no se pone a soltar un segundo producto: la jeringa ERA el trabajo, y a ella se la traspasa al especialista. El peeling se gana el dinero con su propia demo, o yendo de acompañante como el regalo elegido en el escalón de la promoción."
    },
    {
      question:
        "How long should you tell customers it takes to see VISIBLE results from the glycolic peeling?",
      questionEs:
        "¿Qué tiempo deberías decirles a las clientes que toma ver resultados VISIBLES del peeling glicólico?",
      options: [
        "Immediately after the first use — instant transformation",
        "After 2-3 uses over 1-2 weeks — skin starts to glow and texture improves",
        "After 6 months of consistent daily use",
        "Results are internal only, you won't see anything on the outside"
      ],
      optionsEs: [
        "Inmediatamente después del primer uso — transformación instantánea",
        "Después de 2-3 usos en 1-2 semanas — la piel empieza a brillar y la textura mejora",
        "Después de 6 meses de uso diario consistente",
        "Los resultados son solo internos, no verás nada por fuera"
      ],
      correctIndex: 1,
      explanation:
        "Setting realistic expectations is crucial for street sales. The IMMEDIATE result after a peel is a fresh, glowing look (the 'peel glow' from removing dead cells). After 2-3 uses, texture visibly improves. Promising instant miracles leads to refunds and complaints. But 2-3 uses is close enough to feel achievable while being honest. Always under-promise and over-deliver.",
      explanationEs:
        "Establecer expectativas realistas es crucial para ventas de calle. El resultado INMEDIATO después de un peeling es una apariencia fresca y brillante (el 'brillo del peeling' de eliminar células muertas). Después de 2-3 usos, la textura mejora visiblemente. Prometer milagros instantáneos lleva a reembolsos y quejas. Pero 2-3 usos es lo suficientemente cercano para sentirse alcanzable mientras se es honesto. Siempre promete menos y entrega más."
    },
    {
      question:
        "A customer says, 'I can get glycolic acid products at the pharmacy for {currency}15.' How do you respond?",
      questionEs:
        "Una cliente dice: 'Puedo conseguir productos con ácido glicólico en la farmacia por {currency}15.' ¿Cómo respondes?",
      options: [
        "Pharmacy products use 3-5% glycolic acid — our professional formula is 15-20% concentration. It's like comparing a toy car to a real engine",
        "Those are fake, only ours is real — pharmacy shelves are full of relabelled products with almost nothing active in them",
        "{currency}15 products are for poor people, you deserve better — you can see from your own skin that you already take care of yourself",
        "The pharmacy ones don't work at all, don't waste your money on them — you will finish the bottle and see exactly nothing"
      ],
      optionsEs: [
        "Los productos de farmacia usan 3-5% de ácido glicólico — nuestra fórmula profesional es 15-20% de concentración. Es como comparar un carrito de juguete con un motor real",
        "Esos son falsos, solo el nuestro es real — las estanterías de farmacia están llenas de productos reetiquetados casi sin activo",
        "Los productos de {currency}15 son para gente pobre, tú mereces algo mejor — se te nota en la piel que ya te cuidas",
        "Los de farmacia no funcionan nada, no tires el dinero en eso — te acabarás el bote y no verás absolutamente nada"
      ],
      correctIndex: 0,
      explanation:
        "This response educates rather than attacks. The concentration comparison (3-5% vs 15-20%) is a factual, verifiable difference that justifies the price premium. The 'toy car vs real engine' analogy is vivid and memorable. You're not insulting the customer or the competitor — you're explaining the value difference. Education-based objection handling builds trust and justifies price.",
      explanationEs:
        "Esta respuesta educa en lugar de atacar. La comparación de concentración (3-5% vs 15-20%) es una diferencia factual y verificable que justifica la prima de precio. La analogía de 'carrito de juguete vs motor real' es vívida y memorable. No estás insultando a la cliente ni al competidor — estás explicando la diferencia de valor. Manejar objeciones basado en educación construye confianza y justifica el precio."
    },
    {
      question:
        "After applying the glycolic peel, a customer's skin turns slightly pink. What should you do?",
      questionEs:
        "Después de aplicar el peeling glicólico, la piel de una cliente se pone ligeramente rosa. ¿Qué deberías hacer?",
      options: [
        "Panic and tell them they're having an allergic reaction, wash it off immediately and end the demo before it gets worse",
        "Apply more peeling to even out the colour so both sides of the face end up looking the same before she sees the mirror",
        "Calmly explain this is normal — increased blood flow to the surface means it's working — then apply neutralizer and soothing cream",
        "Tell them not to worry and send them away — it'll go away on its own in an hour, so there is no need to do anything about it"
      ],
      optionsEs: [
        "Entrar en pánico y decirles que están teniendo una reacción alérgica, lavarlo ya y cortar la demo antes de que empeore",
        "Aplicar más peeling para igualar el color y que las dos partes de la cara queden igual antes de que se mire al espejo",
        "Explicar calmadamente que es normal — el aumento de flujo sanguíneo a la superficie significa que está funcionando — luego aplicar neutralizador y crema calmante",
        "Decirles que no se preocupen y dejarlas marchar — se les quitará solo en una hora, así que no hay que hacer nada"
      ],
      correctIndex: 2,
      explanation:
        "Slight pinkness (erythema) is a NORMAL and EXPECTED response to glycolic acid — it indicates increased microcirculation, which is part of the rejuvenation process. Your calm, knowledgeable reaction turns a potential panic moment into a trust-building demonstration. Always explain BEFORE the demo that a slight tingle and pinkness are signs it's working. Having neutralizer and soothing cream ready shows professionalism.",
      explanationEs:
        "El ligero enrojecimiento (eritema) es una respuesta NORMAL y ESPERADA al ácido glicólico — indica microcirculación aumentada, que es parte del proceso de rejuvenecimiento. Tu reacción calmada y conocedora convierte un momento potencial de pánico en una demostración de construcción de confianza. Siempre explica ANTES de la demo que un ligero hormigueo y enrojecimiento son señales de que está funcionando. Tener neutralizador y crema calmante listos muestra profesionalismo."
    },
    {
      question:
        "What is the BEST bundling offer that combines the Dead Sea Scrub with the Glycolic Peeling Kit?",
      questionEs:
        "¿Cuál es la MEJOR oferta de empaquetado que combina el Scrub de Minerales del Mar Muerto con el Kit de Peeling Glicólico?",
      options: [
        "Buy either product and the other one is half price on the spot, whichever way round the customer wants to do it",
        "Buy two Scrubs and the Peeling goes in free on top, which turns the cheapest product into the route to the dearest one",
        "The Peeling at {currency}100 with the Dead Sea Scrub included as the gift — the Scrub alone is {currency}60, so it costs them nothing",
        "The bundle doesn't save any money but you get a free gift bag, which is enough for most people buying presents"
      ],
      optionsEs: [
        "Compra cualquiera de los dos y el otro sale a mitad de precio en el momento, en el orden que la clienta prefiera",
        "Compra dos Exfoliantes y el Peeling entra gratis encima, lo que convierte el producto más barato en la vía hacia el más caro",
        "El Peeling a {currency}100 con el Exfoliante del Mar Muerto incluido de regalo — el Exfoliante solo son {currency}60, así que no les cuesta nada",
        "El paquete no ahorra dinero pero llevas bolsa de regalo gratis, que a la mayoría que compra regalos le basta"
      ],
      correctIndex: 2,
      explanation:
        "You do not invent a bundle for these two — Offer 1 already is one. The Peeling at {currency}100 comes with the Dead Sea Scrub as its gift, and the Scrub on its own is {currency}60. So the customer pays {currency}100 for a {currency}160 pair, and you can say that out loud because it is true. It feels like a complete ritual — scrub first to cleanse, then peel to renew. Always know your bundle math before hitting the street; a saving you cannot show on your fingers is a saving the customer will not believe.",
      explanationEs:
        "No hace falta inventar un paquete para estos dos — la Oferta 1 ya lo es. El Peeling a {currency}100 lleva el Exfoliante del Mar Muerto como regalo, y el Exfoliante solo son {currency}60. Así que la clienta paga {currency}100 por un par que vale {currency}160, y puedes decirlo en voz alta porque es cierto. Se siente como un ritual completo — primero exfoliar, luego renovar. Conoce siempre las cuentas de tus paquetes antes de salir a la calle; un ahorro que no puedes contar con los dedos es un ahorro que la clienta no se va a creer."
    },
    {
      question:
        "A customer with active acne asks if they should use the glycolic peeling. What is the RIGHT answer?",
      questionEs:
        "Una cliente con acné activo pregunta si debería usar el peeling glicólico. ¿Cuál es la respuesta CORRECTA?",
      options: [
        "Yes — glycolic acid will clear your acne completely, so start using it tonight and keep going every day until it is gone",
        "No — glycolic acid causes acne in everyone, so this is the one product you should never use on a face that already breaks out",
        "Use it twice daily directly on pimples to dry them out, and the stronger the tingling feels the faster it will be working",
        "Not while the skin is angry — but you are not leaving with nothing. Give me your hands and we do the Scrub instead"
      ],
      optionsEs: [
        "Sí — el ácido glicólico te quitará el acné del todo, empieza esta noche y sigue cada día hasta que desaparezca",
        "No — el ácido glicólico causa acné en todo el mundo, así que es el producto que nunca deberías usar en una cara con brotes",
        "Úsalo dos veces al día directamente sobre los granos para secarlos, y cuanto más pique más rápido estará funcionando",
        "Sobre la piel irritada no — pero no te vas de vacío. Dame las manos y hacemos el Exfoliante"
      ],
      correctIndex: 3,
      explanation:
        "Acid does not go on skin that is already inflamed. That is not squeamishness — it is the one thing that comes back on the shop. But 'no' to the peeling today is not 'no' to you. Do not put a name on what she has, do not promise to clear it up, and above all do not send her off to come back another week, because she will not come back. Turn her hands over, do the Scrub demo, and let her leave with a bag in her hand.",
      explanationEs:
        "El ácido no va sobre una piel que ya está inflamada. No es remilgo: es lo único que se le vuelve en contra a la tienda. Pero un 'no' al peeling hoy no es un 'no' a ti. No le pongas nombre a lo que tiene, no le prometas que se lo vas a curar y, sobre todo, no la mandes a volver otra semana, porque no vuelve. Dale la vuelta a sus manos, hazle la demo del Exfoliante y que salga con una bolsa."
    }
  ]
};

// ═══════════════════════════════════════════════════════════
// QUIZ 3: DEAD SEA SCRUB EXPERT
// ═══════════════════════════════════════════════════════════
const quizScrubExpert: GeneralQuiz = {
  id: "quiz-scrub-expert",
  title: "Dead Sea Scrub Expert",
  titleEs: "Experto en Scrub del Mar Muerto",
  description:
    "Master the Dead Sea Minerals Scrub — the easiest entry-point sale. Learn the feel-based demo, mineral benefits, combo selling, and how to turn a {currency}60 scrub into a {currency}120 trio.",
  descriptionEs:
    "Domina el Exfoliante de Minerales del Mar Muerto — la venta de entrada más fácil. Aprende la demo basada en la sensación, los beneficios de los minerales, la venta combinada, y cómo convertir un exfoliante de {currency}60 en un trío de {currency}120.",
  icon: "Waves",
  category: "Product Mastery",
  categoryEs: "Dominio de Producto",
  xpReward: 150,
  questions: [
    {
      question:
        "During the Dead Sea Scrub demo, you ask the customer to 'feel the crystals.' What is the psychological purpose of this technique?",
      questionEs:
        "Durante la demo del Scrub del Mar Muerto, le pides a la cliente que 'sienta los cristales.' ¿Cuál es el propósito psicológico de esta técnica?",
      options: [
        "To create a sensory connection — touch triggers ownership psychology and makes the product feel real",
        "To prove the product contains real salt rather than the plastic microbeads used in cheaper scrubs",
        "To show how rough it is compared to competitors, because a stronger scrub is what removes more dead skin per use",
        "To check if they have sensitive hands before you go any further, so nobody reacts badly to the minerals"
      ],
      optionsEs: [
        "Para crear una conexión sensorial — el tacto dispara la psicología de propiedad y hace que el producto se sienta real",
        "Para demostrar que el producto lleva sal de verdad y no las microesferas de plástico de los exfoliantes baratos",
        "Para enseñar lo áspero que es comparado con la competencia, porque cuanto más fuerte más piel muerta quita",
        "Para comprobar si tienen las manos sensibles antes de seguir, y que nadie reaccione mal a los minerales"
      ],
      correctIndex: 0,
      explanation:
        "The 'feel the crystals' technique is pure sensory selling. When a customer touches and feels the texture, their brain begins to register the product as 'theirs.' This tactile engagement creates an emotional bond that words alone cannot achieve. Touch also activates mirror neurons — the customer imagines the sensation on their own skin. The more senses you involve, the stronger the desire to buy.",
      explanationEs:
        "La técnica de 'siente los cristales' es venta sensorial pura. Cuando una cliente toca y siente la textura, su cerebro empieza a registrar el producto como 'suyo.' Este compromiso táctil crea un vínculo emocional que las palabras solas no pueden lograr. El tacto también activa neuronas espejo — la cliente imagina la sensación en su propia piel. Entre más sentidos involucres, más fuerte es el deseo de comprar."
    },
    {
      question:
        "Which minerals from the Dead Sea should you mention as key benefits during your pitch?",
      questionEs:
        "¿Qué minerales del Mar Muerto deberías mencionar como beneficios clave durante tu pitch?",
      options: [
        "Gold, silver, and platinum for luxury appeal — precious metals give the pitch a premium feel that justifies the price",
        "Iron, copper, and zinc for strength — the same minerals people take as supplements, so the customer already trusts them",
        "Magnesium, calcium, potassium, and bromide — which detoxify, hydrate, and improve circulation",
        "Sodium chloride — just regular table salt, which is what does the actual scrubbing once it dissolves in water"
      ],
      optionsEs: [
        "Oro, plata y platino para apelar al lujo — los metales preciosos dan un aire premium que justifica el precio",
        "Hierro, cobre y zinc para fortalecer — los mismos minerales que la gente toma en suplementos, así que ya confía en ellos",
        "Magnesio, calcio, potasio y bromuro — que desintoxican, hidratan y mejoran la circulación",
        "Cloruro de sodio — sal de mesa normal, que es lo que realmente exfolia en cuanto se disuelve en agua"
      ],
      correctIndex: 2,
      explanation:
        "The Dead Sea contains 21 minerals, 12 of which exist nowhere else on Earth. The 'big four' for selling are: Magnesium (anti-inflammatory, hydrates), Calcium (skin barrier repair), Potassium (moisture balance), and Bromide (soothing, relaxes muscles). That is the pitch — mentioning them with confidence positions you as an expert, not just a seller.",
      explanationEs:
        "El Mar Muerto contiene 21 minerales, 12 de los cuales no existen en ningún otro lugar de la Tierra. Los 'cuatro grandes' para vender son: Magnesio (antiinflamatorio, hidrata), Calcio (reparación de barrera cutánea), Potasio (balance de humedad) y Bromuro (calmante, relaja músculos). Ese es el discurso — decirlo con confianza te posiciona como experto, no solo vendedor."
    },
    {
      question:
        "What is the correct technique for the hands-on scrub demonstration?",
      questionEs:
        "¿Cuál es la técnica correcta para la demostración práctica del scrub?",
      options: [
        "Apply dry scrub to dry hands and rub vigorously, so the crystals are at their roughest and the effect is obvious",
        "Apply a thick layer and leave it on for 5 minutes so the minerals have time to sink in before you rinse",
        "Wet the customer's hand, apply a small amount, massage in circles for 30 seconds, then rinse and compare hands",
        "Mix it with water first to create a paste, then apply it to the face directly where the customer will see the result"
      ],
      optionsEs: [
        "Aplicar el exfoliante seco sobre manos secas y frotar con fuerza, para que los cristales estén ásperos y el efecto se note",
        "Aplicar una capa gruesa y dejarla actuar 5 minutos para que los minerales penetren antes de enjuagar",
        "Mojar la mano de la cliente, aplicar una pequeña cantidad, masajear en círculos por 30 segundos, luego enjuagar y comparar manos",
        "Mezclarlo primero con agua para hacer una pasta y aplicarlo directamente en la cara, donde la clienta verá el resultado"
      ],
      correctIndex: 2,
      explanation:
        "The 30-second hand demo is the perfect 'hook' for the scrub. Wetting first activates the minerals, circular massage lets them feel the crystals working, and the side-by-side hand comparison creates an instant visual result. One hand looks brighter and feels smoother — the difference is undeniable. Always have a towel ready and do the comparison immediately while the contrast is fresh.",
      explanationEs:
        "La demo de manos de 30 segundos es el 'gancho' perfecto para el scrub. Mojar primero activa los minerales, el masaje circular les permite sentir los cristales trabajando, y la comparación de manos lado a lado crea un resultado visual instantáneo. Una mano se ve más brillante y se siente más suave — la diferencia es innegable. Siempre ten una toalla lista y haz la comparación inmediatamente mientras el contraste es fresco."
    },
    {
      question:
        "A customer loves the scrub demo on their hands but says, 'I don't need this, I already have a body scrub at home.' How do you respond?",
      questionEs:
        "A una cliente le encanta la demo del scrub en sus manos pero dice: 'No necesito esto, ya tengo un scrub corporal en casa.' ¿Cómo respondes?",
      options: [
        "Your body scrub is nothing compared to this — whatever you have at home is sugar and oil, and it does not do a fraction of what you just felt",
        "This isn't a body scrub — it's a Dead Sea mineral facial treatment. Those salt crystals you felt? 21 minerals, 12 found nowhere else. Feel your hand — that's not just clean, that's mineral therapy",
        "Okay, no problem — have a nice day! If your one ever runs out you know where we are and I will be here all week",
        "Most body scrubs are fake, this is the real thing — the supermarket ones are relabelled the same product with a different sticker on the jar"
      ],
      optionsEs: [
        "Tu exfoliante corporal no se compara con esto — lo que tienes en casa es azúcar y aceite, y no hace ni una fracción de lo que acabas de notar",
        "Esto no es un scrub corporal — es un tratamiento facial con minerales del Mar Muerto. ¿Esos cristales de sal que sentiste? 21 minerales, 12 que no se encuentran en ningún otro lugar. Siente tu mano — eso no es solo limpieza, es terapia mineral",
        "Vale, sin problema — ¡que tengas buen día! Si el tuyo se acaba ya sabes dónde estamos, aquí voy a estar toda la semana",
        "La mayoría de los exfoliantes corporales son falsos, este es el de verdad — los del supermercado son el mismo producto con otra pegatina"
      ],
      correctIndex: 1,
      explanation:
        "This response reframes the product entirely — from 'another scrub' to 'mineral therapy.' It reminds them of the tactile experience (the crystals they felt), educates on the unique minerals, and gets them touching their hand again (reactivating desire). You're not dismissing their existing product — you're showing them this is a completely different category. Reframe, don't confront.",
      explanationEs:
        "Esta respuesta reencuadra el producto completamente — de 'otro scrub' a 'terapia mineral.' Les recuerda la experiencia táctil (los cristales que sintieron), educa sobre los minerales únicos, y los hace tocar su mano de nuevo (reactivando el deseo). No estás despreciando su producto existente — les estás mostrando que esta es una categoría completamente diferente. Reencuadra, no confrontes."
    },
    {
      question:
        "A customer buys the scrub for {currency}60. What is the BEST next move?",
      questionEs:
        "Una clienta compra el exfoliante por {currency}60. ¿Cuál es la MEJOR siguiente jugada?",
      options: [
        "Offer her the matching body butter, because a scrub buyer always wants the butter that goes with it and the pair is an easy second yes",
        "Sit her down and start the eye demo — she has said yes once, and the syringe is the sale this shift is actually measured on",
        "Give her a discount coupon for next time, so she comes back on her next trip and spends more than she was ever going to spend today",
        "Thank her and get straight back on the door, because more sales beats bigger ones and somebody else is waiting for your turn out there"
      ],
      optionsEs: [
        "Ofrecerle la manteca corporal que va a juego, porque quien compra exfoliante siempre quiere la manteca y el par es un segundo sí fácil",
        "Sentarla y empezar la demo de ojos — ya ha dicho que sí una vez, y la jeringa es la venta con la que se mide el turno",
        "Darle un cupón de descuento para la próxima vez, y que vuelva en su siguiente viaje a gastar más de lo que iba a gastar hoy",
        "Darle las gracias y volver a la puerta, porque más ventas gana a ventas más grandes y ahí fuera hay alguien esperando tu turno"
      ],
      correctIndex: 1,
      explanation:
        "The scrub is a beginner product. It exists so you learn to sell and so the shop has some nice energy in it — it is not the target. She has just said yes to you once, which makes her the easiest person on the floor to put in that chair. Syringe first, always: a seller who spends a happy year selling scrubs has spent a year not learning the job.",
      explanationEs:
        "El exfoliante es un producto de principiante. Está para que aprendas a vender y para que la tienda tenga buen rollo — no es el objetivo. Acaba de decirte que sí una vez, así que es la persona más fácil de toda la planta para sentar en esa silla. La jeringa primero, siempre: quien se pasa un año la mar de contento vendiendo exfoliantes se ha pasado un año sin aprender el oficio."
    },
    {
      question:
        "Which of these is a TRUE benefit of Dead Sea minerals that makes the scrub unique compared to regular salt scrubs?",
      questionEs:
        "¿Cuál de estos es un beneficio REAL de los minerales del Mar Muerto que hace al scrub único comparado con scrubs de sal regulares?",
      options: [
        "It is Dead Sea salt rather than table salt, which is what makes the crystals feel so different on the back of the hand",
        "The Dead Sea runs about 30% minerals, against roughly 3% in ordinary seawater — ten times as much in every handful",
        "It smells better than other scrubs because the minerals are unscented, so nothing competes with the perfume you already wear",
        "The crystals are sharper so they exfoliate deeper than sugar or plastic beads, which is why one use is enough for a whole week"
      ],
      optionsEs: [
        "Es sal del Mar Muerto y no sal de mesa, que es lo que hace que los cristales se noten tan distintos en la mano",
        "El Mar Muerto ronda el 30% de minerales, frente al 3% del agua de mar normal — diez veces más en cada puñado",
        "Huele mejor que otros exfoliantes porque los minerales no llevan perfume, así que nada compite con el que ya usas",
        "Los cristales son más afilados, así que exfolian más hondo que el azúcar o las microesferas, por eso un uso basta para toda la semana"
      ],
      correctIndex: 1,
      explanation:
        "The Dead Sea's mineral concentration (approximately 30%) is roughly TEN TIMES higher than regular seawater (~3%). This isn't marketing — it's geology. It is one of the saltiest bodies of water on Earth and people fly across the world to get into it. Keep it there: say where the minerals come from and what they do for skin, and never name an illness or a condition the product is supposed to treat. A fact you can say with a straight face separates you from sellers who just say 'it's good for your skin.'",
      explanationEs:
        "La concentración mineral del Mar Muerto (aproximadamente 30%) es unas DIEZ VECES mayor que la del agua de mar normal (~3%). Esto no es marketing — es geología. Es uno de los mares más salados de la Tierra y hay gente que cruza el mundo para meterse en él. Quédate ahí: di de dónde salen los minerales y qué le hacen a la piel, y no nombres nunca una enfermedad ni una dolencia que el producto vaya a tratar. Un dato que puedes soltar sin pestañear te separa de los vendedores que solo dicen 'es bueno para la piel.'"
    },
    {
      question:
        "How often should a customer use the Dead Sea Scrub for best results?",
      questionEs:
        "¿Con qué frecuencia debería una cliente usar el Scrub del Mar Muerto para mejores resultados?",
      options: [
        "Daily — use it every morning in the shower",
        "Once per month for a deep treatment",
        "Only when skin looks dull — no set schedule needed",
        "2-3 times per week — enough to maintain glow without over-exfoliating"
      ],
      optionsEs: [
        "Diario — úsalo cada mañana en la ducha",
        "Una vez al mes para un tratamiento profundo",
        "Solo cuando la piel se ve opaca — no se necesita horario fijo",
        "2-3 veces por semana — suficiente para mantener el brillo sin sobre-exfoliar"
      ],
      correctIndex: 3,
      explanation:
        "2-3 times per week is the dermatologist-recommended frequency for physical scrubs. Daily use can damage the skin barrier, causing sensitivity and irritation. The '2-3 times' advice shows you care about their results long-term, not just making a sale. It also means one jar lasts longer — but they'll love the results so much they'll come back for more and for your other products.",
      explanationEs:
        "2-3 veces por semana es la frecuencia recomendada por dermatólogos para scrubs físicos. El uso diario puede dañar la barrera cutánea, causando sensibilidad e irritación. El consejo de '2-3 veces' muestra que te importan sus resultados a largo plazo, no solo hacer una venta. También significa que un tarro dura más — pero les encantarán tanto los resultados que volverán por más y por tus otros productos."
    },
    {
      question:
        "A customer is touching their face after the scrub demo and smiling. What does this body language tell you?",
      questionEs:
        "Una cliente se toca la cara después de la demo del scrub y sonríe. ¿Qué te dice este lenguaje corporal?",
      options: [
        "They're just being polite and doing what people do when a stranger puts something on their hand — it means nothing either way",
        "They have an itch and are being nice about it — offer them a tissue and move the demo on to the body butter",
        "This is a strong buying signal — touching the treated area and smiling indicates they like the result and are imagining owning the product",
        "They're checking if they had an allergic reaction to the minerals, so reassure them about the ingredients before you say anything else"
      ],
      optionsEs: [
        "Solo están siendo educadas y haciendo lo que hace cualquiera cuando un desconocido le pone algo en la mano — no significa nada",
        "Les pica y están siendo amables al respecto — ofréceles un pañuelo y pasa la demo al body butter",
        "Esta es una señal de compra fuerte — tocar el área tratada y sonreír indica que les gusta el resultado y están imaginando tener el producto",
        "Están comprobando si han tenido una reacción alérgica a los minerales, así que tranquilízalas sobre los ingredientes antes de nada"
      ],
      correctIndex: 2,
      explanation:
        "Touching the treated area + smiling is one of the best buying signals in cosmetics sales. The touch shows they're experiencing the result physically, and the smile is genuine positive emotion. When you see this, STOP TALKING and ask for the sale. Saying more can only talk them out of it. The body has already decided — your job is to close.",
      explanationEs:
        "Tocar el área tratada + sonreír es una de las mejores señales de compra en ventas de cosméticos. El toque muestra que están experimentando el resultado físicamente, y la sonrisa es emoción positiva genuina. Cuando ves esto, DEJA DE HABLAR y pide la venta. Decir más solo puede hacer que se retracten. El cuerpo ya decidió — tu trabajo es cerrar."
    },
    {
      question:
        "A customer says, '{currency}60 is a lot for a scrub.' What is the BEST value reframing technique?",
      questionEs:
        "Una clienta dice: '{currency}60 es mucho para un exfoliante.' ¿Cuál es la MEJOR técnica de reencuadre de valor?",
      options: [
        "It's actually the cheapest scrub on the market for this quality — nothing in a pharmacy comes close for the same money",
        "Quality costs money, cheap products don't work — you have probably already spent that much on things that did nothing",
        "This jar lasts 8-12 months at one use a week — that's under {currency}2 per treatment. One facial at a spa costs {currency}80+",
        "I'll give you a discount if you buy right now — say yes in the next minute and I will take it down a rung for you"
      ],
      optionsEs: [
        "Es el exfoliante más barato del mercado para esta calidad — nada de farmacia se le acerca por el mismo dinero",
        "La calidad cuesta dinero, lo barato no funciona — seguro que ya te has gastado eso mismo en cosas que no hicieron nada",
        "Este frasco dura 8-12 meses con un uso a la semana — eso es menos de {currency}2 por tratamiento. Un facial en un spa cuesta {currency}80+",
        "Te hago un descuento si compras ahora mismo — dime que sí en el próximo minuto y te bajo un escalón"
      ],
      correctIndex: 2,
      explanation:
        "The cost-per-use calculation is devastatingly effective. {currency}60 sounds like a lot for 'a scrub' — but under {currency}2 per treatment sounds like a bargain, and it is the honest number: one teaspoon a week, a jar that lasts 8-12 months. The spa comparison ({currency}80+ for one facial) positions your product as a money-saver. Always calculate cost-per-use in advance.",
      explanationEs:
        "El cálculo de coste por uso es devastadoramente efectivo. {currency}60 suena a mucho para 'un exfoliante' — pero menos de {currency}2 por tratamiento suena a ganga, y es el número honesto: una cucharadita a la semana, un frasco que dura 8-12 meses. La comparación con el spa ({currency}80+ por un facial) posiciona tu producto como un ahorro. Calcula siempre el coste por uso de antemano."
    },
    {
      question:
        "When should you offer the Dead Sea Scrub as a standalone {currency}60 sale versus part of a bundle?",
      questionEs:
        "¿Cuándo deberías ofrecer el Exfoliante del Mar Muerto como venta individual de {currency}60 en vez de dentro de un paquete?",
      options: [
        "Always push the bundle first — never sell standalone, because a single scrub caps the ticket before it has even started",
        "Only sell standalone at the end of the day when you are clearing what is left on the table and the trio has stopped moving",
        "Always sell standalone — bundles confuse customers, and a single clear price is easier to say yes to than three offers",
        "You open with the bundle and walk down to the single — {currency}60 is a rung on that ladder, not the place you start"
      ],
      optionsEs: [
        "Empuja siempre el paquete primero, nunca vendas individual, porque un solo exfoliante limita el ticket antes de empezar",
        "Vende individual solo al final del día, cuando liquidas lo que queda en la mesa y el trío ya no se mueve",
        "Vende siempre individual — los paquetes confunden a las clientas, y un precio único es más fácil de aceptar que tres ofertas",
        "Abres con el paquete y bajas hasta el individual — los {currency}60 son un escalón de esa escalera, no donde empiezas"
      ],
      correctIndex: 3,
      explanation:
        "The scrub has a ladder like everything else — Buy 2 Get 1 at {currency}120, then Buy 2 Get 2, then the single at {currency}60 — and you start at the top of it, same as always. Opening at {currency}60 because somebody looks hesitant is you doing her haggling for her before she has asked, and it is guesswork besides: you cannot tell from a face who was going to buy, and anybody who says they can has just been lucky. Walk the ladder. She will tell you where she stops.",
      explanationEs:
        "El exfoliante tiene su escalera como todo lo demás — Compra 2 Llévate 1 a {currency}120, luego Compra 2 Llévate 2, luego el individual a {currency}60 — y empiezas arriba, como siempre. Abrir en {currency}60 porque alguien pone cara de duda es hacerle tú el regateo antes de que lo pida, y encima es adivinar: no puedes saber por una cara quién iba a comprar, y el que dice que sí puede es que ha tenido suerte. Camina la escalera. Ya te dirá ella dónde se para."
    }
  ]
};

// ═══════════════════════════════════════════════════════════
// QUIZ 4: FRENCH NAIL KIT PRO
// ═══════════════════════════════════════════════════════════
const quizNailKitPro: GeneralQuiz = {
  id: "quiz-nailkit-pro",
  title: "French Nail Kit Pro",
  titleEs: "Pro del Kit de Uñas Francesas",
  description:
    "Master the French Nail Kit — the perfect impulse gift. Learn the 3-step buffer technique, lifetime warranty pitch, and how to sell 'salon nails with zero skills.'",
  descriptionEs:
    "Domina el Kit de Uñas Francesas — el regalo de impulso perfecto. Aprende la técnica del pulidor de 3 pasos, el pitch de garantía de por vida, y cómo vender 'uñas de salón sin habilidad alguna.'",
  icon: "Palette",
  category: "Product Mastery",
  categoryEs: "Dominio de Producto",
  xpReward: 150,
  questions: [
    {
      question:
        "What are the 3 steps of the French Nail Kit buffer system?",
      questionEs:
        "¿Cuáles son los 3 pasos del sistema de pulido del Kit de Uñas Francesas?",
      options: [
        "File smooth (remove ridges), polish white tip, buff to shine — all with one 3-sided buffer",
        "Wash the hands, dry them thoroughly, then polish with the buffer until the nail shines",
        "Apply base coat, apply the colour, then seal it with a top coat and wait for the whole thing to dry",
        "Soak the fingertips, scrub away the dead skin, then moisturise the cuticles with the oil"
      ],
      optionsEs: [
        "Limar suave (eliminar estrías), pulir punta blanca, dar brillo — todo con un pulidor de 3 lados",
        "Lavar las manos, secarlas bien y después pulir con el pulidor hasta que la uña brille",
        "Aplicar la base, aplicar el color y sellarlo con una capa superior, y esperar a que seque todo",
        "Remojar las yemas, exfoliar la piel muerta y después hidratar las cutículas con el aceite"
      ],
      correctIndex: 0,
      explanation:
        "The 3-sided buffer is the genius of this kit. Side 1 (usually gray) files and removes ridges. Side 2 (white) creates the French white tip effect. Side 3 (pink/shine) buffs to a brilliant glossy finish. No nail polish, no drying time, no skills needed. Understanding each side lets you demo with confidence and explain why this beats traditional nail polish.",
      explanationEs:
        "El pulidor de 3 lados es la genialidad de este kit. Lado 1 (generalmente gris) lima y elimina estrías. Lado 2 (blanco) crea el efecto de punta blanca francesa. Lado 3 (rosa/brillo) pule a un acabado brillante. Sin esmalte, sin tiempo de secado, sin habilidad necesaria. Entender cada lado te permite demostrar con confianza y explicar por qué esto vence al esmalte tradicional."
    },
    {
      question:
        "A customer says, 'I'm terrible at doing my own nails — I always mess them up.' How do you turn this into a sale?",
      questionEs:
        "Una cliente dice: 'Soy terrible haciéndome las uñas — siempre las arruino.' ¿Cómo conviertes esto en una venta?",
      options: [
        "You'll get better with practice, just keep trying — everybody is bad at this for the first few months and then it clicks",
        "That's exactly why this kit was invented — zero liquid polish, zero drying time, zero skills. If you can rub a pen on paper, you can do this. Let me show you on ONE nail.",
        "Then you should go to a salon instead — pay the professional, sit for the hour, and let someone else deal with the mess",
        "Don't worry, most people are bad at nails — it is honestly the hardest thing to do on yourself and nobody gets it right"
      ],
      optionsEs: [
        "Mejorarás con la práctica, sigue intentándolo — todo el mundo es malo los primeros meses y luego le coge el truco",
        "Exactamente por eso se inventó este kit — cero esmalte líquido, cero tiempo de secado, cero habilidad. Si puedes frotar un lápiz en papel, puedes hacer esto. Déjame mostrarte en UNA uña.",
        "Entonces mejor ve a un salón — paga a la profesional, siéntate la hora y que se encargue otra persona del lío",
        "No te preocupes, casi todo el mundo es malo con las uñas — es lo más difícil de hacerse una misma y nadie lo clava"
      ],
      correctIndex: 1,
      explanation:
        "This response takes their biggest objection and flips it into the exact reason to buy. 'Zero, zero, zero' is a powerful rhythm. The pen-on-paper analogy makes it feel effortless. Offering to demo on ONE nail removes risk — they can try without committing. If they can do one nail successfully, they believe they can do all ten. Demo → belief → sale.",
      explanationEs:
        "Esta respuesta toma su mayor objeción y la convierte en la razón exacta para comprar. 'Cero, cero, cero' es un ritmo poderoso. La analogía del lápiz en papel lo hace sentir sin esfuerzo. Ofrecer demostrar en UNA uña elimina el riesgo — pueden probar sin comprometerse. Si pueden hacer una uña con éxito, creen que pueden hacer las diez. Demo → creencia → venta."
    },
    {
      question:
        "The French Nail Kit comes with a lifetime warranty. How should you present this to maximize its sales impact?",
      questionEs:
        "El Kit de Uñas Francesas incluye garantía de por vida. ¿Cómo deberías presentar esto para maximizar su impacto de ventas?",
      options: [
        "Mention it quickly at the end as an afterthought, once the price is agreed, so it feels like a small bonus rather than a sales point",
        "Don't mention it — warranties sound like something will go wrong, and planting that idea makes the customer doubt the product",
        "Use it as a trust anchor: 'This company has been around 30 years and still honors lifetime warranties — that's how confident they are. Your {currency}60 is protected forever.'",
        "Say the warranty is only valid if they buy today, so the guarantee doubles as the urgency you need to close"
      ],
      optionsEs: [
        "Mencionarla rápido al final, ya con el precio cerrado, para que parezca un pequeño extra y no un argumento de venta",
        "No la menciones — las garantías suenan a que algo va a fallar, y sembrar esa idea hace que la clienta dude del producto",
        "Úsala como ancla de confianza: 'Esta empresa lleva 30 años y aún honra garantías de por vida — así de confiados están. Tus {currency}60 están protegidos para siempre.'",
        "Di que la garantía solo vale si compran hoy, así la garantía te sirve además como urgencia para cerrar"
      ],
      correctIndex: 2,
      explanation:
        "The lifetime warranty is a MASSIVE trust signal — but only if you present it with conviction. '30 years and still honoring' proves longevity. 'Protected forever' reframes {currency}60 as a protected investment, not an expense. It removes ALL risk from the purchase decision. When customers feel there's zero risk, they buy. The warranty isn't a footnote — it's one of your strongest closing tools.",
      explanationEs:
        "La garantía de por vida es una señal de confianza ENORME — pero solo si la presentas con convicción. '30 años y aún honrando' prueba longevidad. 'Protegidos para siempre' reencuadra {currency}60 como una inversión protegida, no un gasto. Elimina TODO riesgo de la decisión de compra. Cuando los clientes sienten que hay cero riesgo, compran. La garantía no es una nota al pie — es una de tus herramientas de cierre más fuertes."
    },
    {
      question:
        "A customer has just said yes to the syringe. When do you offer her the Nail Kit?",
      questionEs:
        "Una clienta acaba de decir que sí a la jeringa. ¿Cuándo le ofreces el Kit de Uñas?",
      options: [
        "Between the yes and the payment, while she is in buying mode and {currency}60 feels tiny next to what she has just agreed to spend",
        "After she has paid, as the thank-you — a small second product lands softest once the big decision is already behind her",
        "Never. The syringe was the job and the job is done; you hand her to the specialist",
        "As you wrap the syringe, so she hears it while her hands are busy and there is no easy moment for her to say no to you"
      ],
      optionsEs: [
        "Entre el sí y el pago, cuando está en modo compra y {currency}60 parece nada al lado de lo que acaba de aceptar gastarse",
        "Después de pagar, como agradecimiento — un segundo producto pequeño entra mejor con la decisión grande ya tomada",
        "Nunca. La jeringa era el trabajo y el trabajo está hecho; la traspasas al especialista",
        "Mientras le envuelves la jeringa, para que lo oiga con las manos ocupadas y sin un hueco cómodo para decirte que no"
      ],
      correctIndex: 2,
      explanation:
        "There is a voice in your head saying go on then, sell her the nail kit as well. Kill it. An upsell in this shop is not you pitching a second product — it is a handover to the upseller, who sells the LED devices. Selling the syringe IS the win, and it is what the shift is counted in. Stacking a beginner product on top of it is the fastest way to lose both.",
      explanationEs:
        "Tienes una voz en la cabeza que dice venga, véndele también el kit de uñas. Mátala. Una venta adicional en esta tienda no eres tú soltando un segundo producto — es un traspaso al upseller, que vende los aparatos de LED. Vender la jeringa YA es la victoria, y es lo que cuenta en el turno. Amontonarle encima un producto de principiante es la forma más rápida de perder las dos."
    },
    {
      question:
        "A customer's friend says, 'Don't buy that, just get regular nail polish.' How do you handle the friend without creating conflict?",
      questionEs:
        "La amiga de una cliente dice: 'No compres eso, mejor compra esmalte normal.' ¿Cómo manejas a la amiga sin crear conflicto?",
      options: [
        "Ignore the friend and keep pitching to the buyer — every second you spend on the friend is a second the buyer spends cooling off",
        "Tell the friend to mind her own business — it is not her hands, not her money, and she is only slowing the whole thing down",
        "Offer a discount if the friend stops talking — buy the silence with the voucher price and close before she can raise another objection. A cheap sale beats a lost one, and the friend will not argue with a number that low",
        "'Great point! Regular polish chips in a couple of days. This lasts 2 weeks, never chips, needs zero drying time, and the buffer is guaranteed for life. Your friend is smart — she should try it too!'"
      ],
      optionsEs: [
        "Ignorar a la amiga y seguir con la compradora — cada segundo que le dedicas a la amiga es un segundo en que la compradora se enfría",
        "Decirle a la amiga que se meta en sus asuntos — no son sus manos ni su dinero, y solo está retrasando todo",
        "Ofrecer un descuento si la amiga deja de hablar — cómprale el silencio con el precio del cupón y cierra antes de que saque otra objeción. Una venta barata es mejor que ninguna, y con esa cifra la amiga no discute",
        "¡Buen punto! El esmalte normal se desconcha en un par de días. Esto dura 2 semanas, nunca se desconcha, no necesita tiempo de secado, y la lima tiene garantía de por vida. ¡Tu amiga es lista — debería probarlo ella también!"
      ],
      correctIndex: 3,
      explanation:
        "This response is strong because it validates the friend ('great point!'), answers with things you can actually show her (2 days versus 2 weeks, no drying time, the lifetime buffer warranty — the one promise in this shop that is real), and turns the friend into a second prospect. What it does NOT do is invent a yearly savings figure. Numbers you cannot prove are the fastest way to lose a room with two people in it: the friend is the one who will do the arithmetic out loud, and if it does not add up you have lost them both. Never fight the friend — recruit her.",
      explanationEs:
        "Esta respuesta es fuerte porque le da la razón a la amiga ('¡buen punto!'), contesta con cosas que puedes enseñar de verdad (2 días frente a 2 semanas, sin tiempo de secado, la garantía de por vida de la lima — la única promesa de esta tienda que es real) y convierte a la amiga en una segunda clienta. Lo que NO hace es inventarse una cifra de ahorro anual. Los números que no puedes demostrar son la forma más rápida de perder una conversación con dos personas: la amiga es la que va a hacer la cuenta en voz alta, y si no le sale las pierdes a las dos. Nunca pelees con la amiga — recluta."
    },
    {
      question:
        "A customer asks, 'How long does the French manicure effect last?' What is the HONEST but compelling answer?",
      questionEs:
        "Una cliente pregunta: '¿Cuánto dura el efecto de manicura francesa?' ¿Cuál es la respuesta HONESTA pero convincente?",
      options: [
        "Forever — it's permanent once applied, so you only ever have to do this to each nail one single time",
        "It washes off the next day so you need to reapply daily, which is why the kit is designed to be so quick to use",
        "Each application lasts about 1-2 weeks depending on nail growth and hand washing frequency. The kit pays for itself in one month vs salon visits",
        "Nobody knows — it varies too much from person to person to give a number, so try it and see how it goes for you"
      ],
      optionsEs: [
        "Para siempre — es permanente una vez aplicado, así que solo tienes que hacérselo a cada uña una única vez",
        "Se quita al día siguiente, así que hay que repetirlo a diario, por eso el kit está pensado para ser tan rápido",
        "Cada aplicación dura unas 1-2 semanas dependiendo del crecimiento de uñas y frecuencia de lavado de manos. El kit se paga solo en un mes vs visitas al salón",
        "Nadie lo sabe — varía demasiado de una persona a otra para dar una cifra, así que pruébalo y ya verás"
      ],
      correctIndex: 2,
      explanation:
        "Honesty builds repeat customers. 1-2 weeks is realistic — nails grow, tips wear. But the 'pays for itself in one month' reframes the entire value proposition. At {currency}60 vs {currency}25-40 per salon visit, the math is undeniable. A customer who trusts your honesty becomes a customer for life. A customer who discovers you exaggerated stops buying entirely.",
      explanationEs:
        "La honestidad construye clientes recurrentes. 1-2 semanas es realista — las uñas crecen, las puntas se desgastan. Pero 'se paga solo en un mes' reencuadra toda la propuesta de valor. A {currency}60 frente a {currency}25-40 por visita al salón, la cuenta es innegable. Una cliente que confía en tu honestidad se convierte en cliente de por vida. Una cliente que descubre que exageraste deja de comprar por completo."
    },
    {
      question:
        "Which customer type is the EASIEST to sell the French Nail Kit to as a gift?",
      questionEs:
        "¿Qué tipo de cliente es el MÁS FÁCIL de venderle el Kit de Uñas Francesas como regalo?",
      options: [
        "A woman who just said 'my daughter/sister/mom would love this' or any man buying for a woman in his life",
        "A man walking alone who looks stressed and in a hurry, because he will take the fastest option you put in front of him",
        "A teenager with no money of her own, who will go home and ask a parent to come back and buy it for her",
        "A professional nail technician, who already knows the value of a good buffer and will buy several for the salon"
      ],
      optionsEs: [
        "Una mujer que acaba de decir 'a mi hija/hermana/mamá le encantaría esto' o cualquier hombre comprando para una mujer en su vida",
        "Un hombre que va solo, estresado y con prisa, porque se llevará la opción más rápida que le pongas delante",
        "Una adolescente sin dinero propio, que irá a casa a pedirle a un padre que vuelva a comprárselo",
        "Una manicurista profesional, que ya conoce el valor de un buen pulidor y comprará varios para el salón"
      ],
      correctIndex: 0,
      explanation:
        "Gift selling is about recognizing the signal. When someone mentions another person in the context of your product ('my mom would love this'), they're testing the idea. Your response: 'She absolutely would — and at {currency}60 it's the perfect gift. Take two and the third is free, {currency}120 for all three.' Men buying for wives/girlfriends are also gold — they want an easy, impressive gift and don't know what to buy. The nail kit is painless, practical, and premium-looking.",
      explanationEs:
        "Vender regalos se trata de reconocer la señal. Cuando alguien menciona a otra persona en el contexto de tu producto ('a mi mamá le encantaría esto'), están probando la idea. Tu respuesta: 'Le encantaría, seguro — y a {currency}60 es el regalo perfecto. Llévate dos y el tercero es gratis, {currency}120 los tres.' Los hombres comprando para esposas/novias también son oro — quieren un regalo fácil e impresionante y no saben qué comprar. El kit de uñas es indoloro, práctico y se ve premium."
    },
    {
      question:
        "During the demo, a customer's nail looks yellowish after the first buffer step. What does this mean and how do you handle it?",
      questionEs:
        "Durante la demo, la uña de una cliente se ve amarillenta después del primer paso del pulidor. ¿Qué significa esto y cómo lo manejas?",
      options: [
        "The product is defective and stained their nail — apologise, stop the demo, and offer to do the other hand with a fresh buffer",
        "The yellowing is actually staining from old nail polish being lifted — the buffer is cleaning what polish remover leaves behind. Watch this next step make it disappear",
        "They have a fungal infection and shouldn't use the product — tell them to see a pharmacist and offer them the body butter instead",
        "It's normal and will wash off with soap and water later, so there is no need to explain it or slow the demo down"
      ],
      optionsEs: [
        "El producto es defectuoso y le ha manchado la uña — discúlpate, para la demo y ofrécete a hacer la otra mano con un pulidor nuevo",
        "El amarillamiento es en realidad manchado de esmalte viejo siendo levantado — el pulidor está limpiando lo que el quitaesmalte deja atrás. Mira cómo desaparece en este siguiente paso",
        "Tienen una infección por hongos y no deberían usar el producto — diles que vayan a la farmacia y ofréceles el body butter",
        "Es normal y se quita luego con agua y jabón, así que no hace falta explicarlo ni frenar la demo"
      ],
      correctIndex: 1,
      explanation:
        "Yellowing from old polish is COMMON — most nail polish leaves a stain that remover doesn't fully eliminate. This is actually a SELLING MOMENT. You're showing the customer their 'clean' nails weren't really clean. The next buffer step removes the yellow, creating a dramatic before/after. Always explain what's happening so they don't panic. Knowledgeable calmness = trust = sales.",
      explanationEs:
        "El amarillamiento de esmalte viejo es COMÚN — la mayoría del esmalte deja una mancha que el removedor no elimina completamente. Esto es en realidad un MOMENTO DE VENTA. Le estás mostrando a la cliente que sus uñas 'limpias' no estaban realmente limpias. El siguiente paso del pulidor elimina el amarillo, creando un dramático antes/después. Siempre explica lo que está pasando para que no entren en pánico. Calma conocedora = confianza = ventas."
    },
    {
      question:
        "A customer says, '{currency}60 seems expensive for a nail buffer.' What is the CORRECT value comparison to use?",
      questionEs:
        "Una clienta dice: '{currency}60 parece caro para un pulidor de uñas.' ¿Cuál es la comparación de valor CORRECTA?",
      options: [
        "It's not expensive, you just don't understand quality yet — once you have used a professional buffer you will never go back",
        "Never mind the {currency}60 — spread across all the years you are going to own this thing it costs you almost nothing, so the number on the box is not really the number that matters here at all",
        "If you think {currency}60 is expensive then you cannot afford nice things — this is what a decent pair of shoes costs and it will still be working long after the shoes have gone",
        "A salon French manicure is {currency}25-40 and lasts 1-2 weeks. This kit does 50+ of them for {currency}60 — about {currency}1 each, and the buffer is guaranteed for life"
      ],
      optionsEs: [
        "No es caro, es que todavía no entiendes de calidad — cuando uses un pulidor profesional no vuelves atrás",
        "Olvídate de los {currency}60 — repartidos entre todos los años que vas a tener esto no te cuesta prácticamente nada, así que el número de la caja no es el número que importa aquí",
        "Si te parece caro {currency}60 no puedes permitirte cosas bonitas — es lo que cuestan unos zapatos decentes y esto seguirá funcionando mucho después de que los zapatos se hayan ido",
        "Una manicura francesa en salón son {currency}25-40 y dura 1-2 semanas. Este kit hace 50+ por {currency}60 — como {currency}1 cada una, y la lima tiene garantía de por vida"
      ],
      correctIndex: 3,
      explanation:
        "The number that works is the one she can do in her head while you say it: {currency}60 across 50-odd manicures really is about {currency}1 each, against {currency}25-40 a time in a salon. What you do not do is inflate that into a yearly savings figure — nobody has fifty salon manicures in a year, so the moment she checks it the number falls apart, and it takes the rest of your pitch with it. Quote what you can prove and let her do the multiplying.",
      explanationEs:
        "El número que funciona es el que puede hacer ella de cabeza mientras hablas: {currency}60 entre unas 50 manicuras sale a cerca de {currency}1 cada una, frente a {currency}25-40 cada vez en un salón. Lo que no haces es inflarlo en una cifra de ahorro anual — nadie se hace cincuenta manicuras de salón al año, así que en cuanto lo comprueba el número se cae, y se lleva por delante todo lo demás que has dicho. Di lo que puedas demostrar y deja que multiplique ella."
    },
    {
      question:
        "A customer seems interested but hesitant to spend {currency}60. What is the BEST closing technique for this specific product?",
      questionEs:
        "Una clienta parece interesada pero dudosa en gastar {currency}60. ¿Cuál es la MEJOR técnica de cierre para este producto en concreto?",
      options: [
        "Lower the price immediately to the {currency}30 floor so the number stops being the thing she is arguing with",
        "Tell her to come back tomorrow with more money, and note down which shade of buffer she liked so it is ready when she returns",
        "The 'one nail' micro-commitment: 'Let me do just ONE nail. If you don't absolutely love how it looks, no pressure at all. But when you see it, you'll want all ten done.'",
        "Show her a video of someone else using it at home so she can see how simple the three steps are before she commits"
      ],
      optionsEs: [
        "Bajar el precio de inmediato al mínimo de {currency}30 para que la cifra deje de ser lo que la frena",
        "Decirle que vuelva mañana con más dinero, y apuntar qué pulidor le gustó para tenerlo listo cuando regrese",
        "El micro-compromiso de 'una uña': 'Déjame hacer solo UNA uña. Si no te encanta cómo se ve, ninguna presión. Pero cuando la veas, querrás las diez hechas.'",
        "Enseñarle un vídeo de otra persona usándolo en casa para que vea lo simples que son los tres pasos antes de decidirse"
      ],
      correctIndex: 2,
      explanation:
        "The 'one nail' close is perfect for the nail kit because it's low-risk (one nail, not all ten), creates an immediate visual result, and triggers the 'completion desire' — once one nail looks amazing, the contrast with the other nine becomes unbearable. The customer will ASK to do the rest. You're not pushing — you're pulling. The micro-commitment strategy works because it requires almost zero commitment while delivering maximum proof.",
      explanationEs:
        "El cierre de 'una uña' es perfecto para el kit de uñas porque es de bajo riesgo (una uña, no las diez), crea un resultado visual inmediato, y dispara el 'deseo de completitud' — una vez que una uña se ve increíble, el contraste con las otras nueve se vuelve insoportable. La cliente pedirá hacer el resto. No estás empujando — estás tirando de ellos. La estrategia de micro-compromiso funciona porque requiere casi cero compromiso mientras entrega máxima prueba."
    }
  ]
};

// ═══════════════════════════════════════════════════════════
// QUIZ 5: STREET OBJECTIONS CHAMPION
// ═══════════════════════════════════════════════════════════
const quizObjectionsChampion: GeneralQuiz = {
  id: "quiz-objections-champion",
  title: "Street Objections Champion",
  titleEs: "Campeón de Objeciones de Calle",
  description:
        "Master the toughest objections you'll hear on the street. Each question puts you face-to-face with a real customer objection — choose the response that turns 'no' into 'yes.'",
  descriptionEs:
    "Domina las objeciones más difíciles que escucharás en la calle. Cada pregunta te pone frente a frente con una objeción real de cliente — elige la respuesta que convierte el 'no' en 'sí.'",
  icon: "MessageCircle",
  category: "Sales Psychology",
  categoryEs: "Psicología de Ventas",
  xpReward: 200,
  questions: [
    {
      question:
        "Customer: 'I'm on a really tight budget right now.' You have already walked her down to {currency}175 on the syringe. What closes it?",
      questionEs:
        "Cliente: 'Estoy con un presupuesto muy ajustado ahora mismo.' Ya la has bajado a {currency}175 en la jeringa. ¿Qué lo cierra?",
      options: [
        "I understand — this isn't for everyone, and I would rather you spent your money on something you actually need this week",
        "I get it. So — gift off, my voucher on it: {currency}140. Sixty applications, one a week, a bit over {currency}2 a go. And if that is still not your week, the Peeling at {currency}100 does the same job for less",
        "Stop making excuses and invest in yourself — everybody says they are on a tight budget and then spends the same money on dinner that same evening without thinking about it twice",
        "How much have you actually got on you? Tell me the number in your pocket and I will make the price fit whatever it is, because a small sale today beats no sale at all and at least she leaves here with something"
      ],
      optionsEs: [
        "Te entiendo — esto no es para todo el mundo, y prefiero que te gastes el dinero en algo que de verdad necesites esta semana",
        "Te escucho. Venga — sin regalo, con mi cupón: {currency}140. Sesenta aplicaciones, una por semana, poco más de {currency}2 cada vez. Y si aun así no es tu semana, el Peeling a {currency}100 hace lo mismo por menos",
        "Deja de poner excusas e invierte en ti misma — todo el mundo dice que va justa de dinero y luego se gasta lo mismo en una cena esa misma noche sin pensárselo dos veces",
        "¿Cuánto llevas encima de verdad? Dime la cifra exacta que tienes ahí en el bolsillo y yo te ajusto el precio a lo que sea, porque una venta pequeña hoy siempre es mejor que ninguna y al menos se va de aquí con algo"
      ],
      correctIndex: 1,
      explanation:
        "'I'm on a tight budget' is not said at {currency}300. It comes out once you have already walked her down, so the answer is not a speech about value — it is the next rung with a reason attached: gift off, voucher on, {currency}140, and the arithmetic done on {currency}140 and nothing else. Moving her to a different product is your SECOND move, not your first: the Peeling's promo rung genuinely is {currency}100, so pointing her there costs you nothing you should be holding back. What you never do is ask her what she has in her pocket — that hands her the pen and she will write a smaller number than your floor.",
      explanationEs:
        "'Voy muy justa de dinero' no se dice en {currency}300. Sale cuando ya la has bajado por la escalera, así que la respuesta no es un discurso sobre el valor — es el siguiente escalón con un motivo pegado: fuera el regalo, dentro el cupón, {currency}140, y la cuenta hecha sobre {currency}140 y nada más. Cambiarla de producto es tu SEGUNDO movimiento, no el primero: el escalón de promoción del Peeling son de verdad {currency}100, así que mandarla ahí no te cuesta nada que debieras estar guardándote. Lo que no haces nunca es preguntarle cuánto lleva en el bolsillo — eso es darle el boli, y va a escribir un número más bajo que tu suelo."
    },
    {
      question:
        "Customer: 'Let me think about it and come back tomorrow.' Which response is BEST?",
      questionEs:
        "Cliente: 'Déjame pensarlo y vuelvo mañana.' ¿Qué respuesta es la MEJOR?",
      options: [
        "Okay, I'll be here tomorrow — no problem! Come by whenever you like and we can pick up exactly where we left off",
        "People who say that never come back — are you really interested or just being nice? Tell me straight and I will not waste your time",
        "Tomorrow you are on a beach, my love. You said you like it, you said you would use it — so the only thing left is the price. Let me sort that out now",
        "Absolutely, sleep on it and see how you feel in the morning. This is the last day at this price. Want me to hold one for you at the counter with a small deposit?"
      ],
      optionsEs: [
        "Vale, mañana estaré aquí — ¡sin problema! Pásate cuando quieras y seguimos justo donde lo dejamos",
        "La gente que dice eso no vuelve nunca — ¿te interesa de verdad o solo estás siendo amable? Dímelo claro y no te hago perder el tiempo",
        "Mañana estarás en la playa, cariño. Me has dicho que te gusta y que lo usarías, así que solo queda el precio. Deja que lo arregle ahora",
        "Claro, consúltalo con la almohada y mira cómo lo ves por la mañana. Es el último día a este precio. ¿Te reservo una en el mostrador con un pequeño depósito?"
      ],
      correctIndex: 2,
      explanation:
        "'I'll come back tomorrow' is the sale walking out on two legs. She already said yes twice in the demo — she likes it, she would use it — so the only thing still open is the price, and the price is the one thing you can only work on with her in front of you. Sleeping on it, a deposit, a card, a unit held at the counter: they all sound considerate and they all end with her outside. Do not invent stock numbers either — you do not need them. Fix the price now, in the shop.",
      explanationEs:
        "'Vuelvo mañana' es la venta saliendo por la puerta andando. Ya te ha dicho que sí dos veces en la demo: le gusta y lo usaría, así que lo único que queda abierto es el precio, y el precio es lo único que solo puedes trabajar con ella delante. Consultarlo con la almohada, una señal, una tarjeta, una unidad guardada en el mostrador: todo suena muy considerado y todo acaba con ella en la calle. Y no te inventes existencias, no te hacen falta. Arregla el precio ahora, en la tienda."
    },
    {
      question:
        "Customer: 'My husband will kill me if I spend {currency}140 on cream!' What is the SMARTEST response?",
      questionEs:
        "Cliente: '¡Mi esposo me matará si gasto {currency}140 en crema!' ¿Cuál es la respuesta MÁS INTELIGENTE?",
      options: [
        "How much did your husband spend on his last [watch/hobby/tool]? This is YOUR face. And look at this result — don't YOU deserve to feel this confident every day?",
        "Your husband doesn't need to know — I can give you a plain bag and leave the receipt out of it so nobody asks any questions",
        "Then don't tell him the real price — say it was {currency}20 and he will never think about it again after the first week",
        "He's being controlling, you should do what you want with your own money and not have to justify a purchase like this"
      ],
      optionsEs: [
        "¿Cuánto gastó tu esposo en su último [reloj/hobby/herramienta]? Esta es TU cara. Y mira este resultado — ¿TÚ no mereces sentirte así de segura todos los días?",
        "Tu marido no tiene por qué enterarse — te doy una bolsa sin marca y dejo el recibo fuera para que nadie pregunte",
        "Pues no le digas el precio real — dile que fueron {currency}20 y no volverá a pensar en ello pasada la primera semana",
        "Está siendo controlador, deberías hacer lo que quieras con tu dinero y no tener que justificar una compra así"
      ],
      correctIndex: 0,
      explanation:
        "This response does three things: (1) The 'what did HE spend' question creates instant perspective — men routinely spend more on hobbies without guilt. (2) 'YOUR face' reframes it as self-care, not vanity. (3) The mirror call-back ('look at this result') reconnects them to the emotional high of the demo. Never encourage lying to a partner — that creates bad energy and potential returns. Empowerment beats deception every time.",
      explanationEs:
        "Esta respuesta hace tres cosas: (1) La pregunta de 'qué gastó ÉL' crea perspectiva instantánea — los hombres gastan rutinariamente más en hobbies sin culpa. (2) 'TU cara' lo reencuadra como autocuidado, no vanidad. (3) El llamado al espejo ('mira este resultado') los reconecta con la emoción positiva de la demo. Nunca incentivas mentir a una pareja — eso crea mala energía y posibles devoluciones. El empoderamiento vence a la decepción siempre."
    },
    {
      question:
        "Customer: 'I was scammed by a street seller before — how do I know you're not a scam?' What is the BEST response?",
      questionEs:
        "Cliente: 'Ya me estafó un vendedor de calle antes — ¿cómo sé que tú no eres una estafa?' ¿Cuál es la MEJOR respuesta?",
      options: [
        "I'm not a scammer, I promise — here's my word, and you can see for yourself that I have been standing on this same corner all week",
        "I completely understand your caution. Look — we have a physical address, a 30-year-old company, lifetime warranty, and you see the result on your own face right now. A scammer can't show you real results in a mirror.",
        "Those other guys were fake, we're the real deal — there is a whole difference between them and a proper brand with a shop behind it. You can tell by looking at us which one of the two we are",
        "If you don't trust me, don't buy — your loss, but do not come back next week asking for the same price when you change your mind"
      ],
      optionsEs: [
        "No soy un estafador, te lo prometo — y puedes comprobar tú misma que llevo toda la semana en esta misma esquina",
        "Entiendo completamente tu precaución. Mira — tenemos una dirección física, una empresa de 30 años, garantía de por vida, y ves el resultado en tu propia cara ahora mismo. Un estafador no puede mostrarte resultados reales en un espejo.",
        "Esos otros eran falsos, nosotros somos los de verdad — hay mucha diferencia entre ellos y una marca con una tienda detrás. Solo con mirarnos se nota cuál de las dos cosas somos",
        "Si no confías en mí, no compres — tú te lo pierdes, pero no vuelvas la semana que viene pidiendo el mismo precio"
      ],
      correctIndex: 1,
      explanation:
        "Trust is built on PROOF, not promises. This response: (1) Validates their fear without dismissing it, (2) Gives concrete trust signals (address, 30 years, warranty — all verifiable), (3) The mirror result is the ULTIMATE proof — they can see it with their own eyes. Never get defensive when accused of being a scammer. Confidence, transparency, and proof disarm suspicion. Anger confirms it.",
      explanationEs:
        "La confianza se construye con PRUEBAS, no promesas. Esta respuesta: (1) Valida su miedo sin menospreciarlo, (2) Da señales de confianza concretas (dirección, 30 años, garantía — todo verificable), (3) El resultado en el espejo es la PRUEBA ULTIMA — pueden verlo con sus propios ojos. Nunca te pongas a la defensiva cuando te acusen de ser estafador. Confianza, transparencia y pruebas desarman la sospecha. La ira la confirma."
    },
    {
      question:
        "Customer: 'Will this work on my dark skin? I worry about products lightening my complexion.' Which answer is BEST?",
      questionEs:
        "Cliente: '¿Esto funcionará en mi piel oscura? Me preocupa que los productos me aclaren el tono.' ¿Qué respuesta es la MEJOR?",
      options: [
        "This will definitely lighten your skin — that's the whole point of the treatment, and most customers ask for exactly that effect. Give it a month and you will see the tone even out all over",
        "Hyaluronic acid doesn't change skin color at all — it hydrates and plumps ALL skin types equally. The 'Botox effect' works the same on dark, medium, or light skin because it works from within, not on the surface",
        "Dark skin doesn't wrinkle so you don't need this — you would be better off with the scrub or the body butter instead",
        "It works better on dark skin actually — you'll see faster results than most people do, usually within the first week of using it"
      ],
      optionsEs: [
        "Esto te aclarará la piel sin duda — ese es justo el objetivo del tratamiento, y la mayoría de clientas pide precisamente ese efecto. Dale un mes y verás cómo se uniforma el tono",
        "El ácido hialurónico no cambia el color de piel para nada — hidrata y rellena TODOS los tipos de piel por igual. El efecto 'Botox' funciona igual en piel oscura, media o clara porque trabaja desde adentro, no en la superficie",
        "La piel oscura no se arruga, así que no necesitas esto — te vendría mejor el exfoliante o el body butter",
        "En realidad funciona mejor en piel oscura — verás resultados más rápido que la mayoría, normalmente en la primera semana"
      ],
      correctIndex: 1,
      explanation:
        "This response is both honest AND reassuring. The key fear is 'lightening' — so you address that directly ('doesn't change skin color at all'). Then you explain WHY it works equally (works from within, not surface). The 'ALL skin types equally' phrasing is inclusive and respectful. Never make assumptions about skin type needs — educate on universal benefits instead.",
      explanationEs:
        "Esta respuesta es honesta Y tranquilizadora. El miedo clave es 'aclarar' — así que lo abordas directamente ('no cambia el color de piel para nada'). Luego explicas POR QUÉ funciona igualmente (trabaja desde adentro, no superficial). La frase 'TODOS los tipos de piel por igual' es inclusiva y respetuosa. Nunca hagas suposiciones sobre las necesidades de tipo de piel — educa sobre beneficios universales en su lugar."
    },
    {
      question:
        "Customer: 'I can get this exact same thing on Amazon for half the price.' How do you handle this?",
      questionEs:
        "Cliente: 'Puedo conseguir exactamente esto mismo en Amazon por la mitad de precio.' ¿Cómo manejas esto?",
      options: [
        "Amazon products are all fake counterfeits — anything at half our price is watered down or expired stock, so honestly I would rather you bought nothing at all than bought that",
        "Go ahead and buy it on Amazon then — if it turns out to be the wrong thing you can always send it back, and you know where to find me when you want the real one",
        "You might find something with a similar label — but what you won't get is this demo on YOUR face, this instant result you can see right now, and my personal guarantee. Online you buy blind. Here, you buy after proof. That's worth the difference.",
        "Amazon doesn't have our special formula — whatever they list under a similar name comes from a different factory, so it is not really the same product and the price is not really a comparison"
      ],
      optionsEs: [
        "Los productos de Amazon son todos falsificaciones — cualquier cosa a mitad de nuestro precio está aguada o caducada, así que sinceramente prefiero que no compres nada antes que comprar eso",
        "Adelante, cómpralo en Amazon entonces — si resulta no ser lo que buscas siempre puedes devolverlo, y ya sabes dónde encontrarme cuando quieras el de verdad",
        "Quizás encuentres algo con una etiqueta similar — pero lo que no conseguirás es esta demo en TU cara, este resultado instantáneo que ves ahora mismo, y mi garantía personal. En línea compras a ciegas. Aquí, compras después de la prueba. Eso vale la diferencia.",
        "Amazon no tiene nuestra fórmula especial — lo que venden con un nombre parecido sale de otra fábrica, así que no es el mismo producto y el precio no es una comparación de verdad"
      ],
      correctIndex: 2,
      explanation:
        "You can't win a price war with Amazon — so don't fight it. Instead, highlight what Amazon CAN'T offer: the in-person demo, the immediate visible result, the personal guarantee, the human connection. 'Buy blind vs buy after proof' is a powerful frame shift. People don't just buy products — they buy confidence in the purchase. Your physical presence, expertise, and the live demo are the premium they're paying for.",
      explanationEs:
        "No puedes ganar una guerra de precios con Amazon — así que no la pelees. En su lugar, destaca lo que Amazon NO puede ofrecer: la demo en persona, el resultado visible inmediato, la garantía personal, la conexión humana. 'Comprar a ciegas vs comprar después de prueba' es un cambio de encuadre poderoso. La gente no solo compra productos — compra confianza en la compra. Tu presencia física, experiencia y la demo en vivo son la prima por la que pagan."
    },
    {
      question:
        "Customer: 'The demo looked okay but I didn't see a huge difference.' What is the BEST response?",
      questionEs:
        "Cliente: 'La demo se vio bien pero no vi una gran diferencia.' ¿Cuál es la MEJOR respuesta?",
      options: [
        "I appreciate your honesty — and I think I know why. Sunscreen or moisturiser this morning? That is a barrier sitting between the product and your skin. Give me one second: let me clean it properly and go again",
        "You must not have been looking closely — the difference is huge, look again in the mirror and compare the two sides properly this time",
        "Most people see a huge difference, maybe your skin is just different — some people need two or three applications before anything shows up at all, and yours may simply be one of those. Take it home, give it a fortnight and judge it then",
        "Give it time — you'll see results in a month once the product has built up, so buy it now and judge it properly at home"
      ],
      optionsEs: [
        "Te agradezco la sinceridad — y creo que sé por qué. ¿Crema solar o hidratante esta mañana? Eso es una barrera entre el producto y tu piel. Dame un segundo: te la limpio bien y lo repetimos",
        "No debiste mirar de cerca — la diferencia es enorme, mírate otra vez en el espejo y compara bien los dos lados esta vez",
        "La mayoría ve una gran diferencia, quizá tu piel sea distinta — hay quien necesita dos o tres aplicaciones antes de que se note algo, y puede que la tuya sea de esas. Llévatelo, dale quince días y lo juzgas entonces",
        "Dale tiempo — verás resultados en un mes cuando el producto se acumule, así que llévatelo ahora y lo juzgas bien en casa"
      ],
      correctIndex: 0,
      explanation:
        "Most 'failed demos' are not the product at all — they are sunscreen, moisturiser or foundation sitting between your finger and her skin. So you agree with her, name the barrier, wipe it off and go again on clean skin. You do NOT swap her onto a smaller product to rescue the moment: the syringe is the sale, and it is still on the table until you take it off.",
      explanationEs:
        "La mayoría de las \"demos fallidas\" no son culpa del producto — son la crema solar, la hidratante o la base puestas entre tu dedo y su piel. Así que le das la razón, nombras la barrera, se la limpias y lo repites sobre piel limpia. Lo que NO haces es cambiarla a un producto más pequeño para salvar el momento: la jeringa es la venta, y sigue encima de la mesa hasta que la quites tú."
    },
    {
      question:
        "Customer: 'My friend says I shouldn't buy from street sellers.' Her friend is standing right next to her. What do you do?",
      questionEs:
        "Cliente: 'Mi amiga dice que no debería comprar de vendedores de calle.' Su amiga está justo a su lado. ¿Qué haces?",
      options: [
        "Ignore the friend and talk only to the buyer — she is the one holding the money, and if you engage the friend you just give her a second chance to talk her out of it",
        "Tell the friend she's being negative and unfair, and point out that she has not even tried the product yet so she is in no position to give advice about it",
        "Include the friend: 'Smart friend! I always tell people — never buy without trying first. Here, let me show YOU both on your hands. See the difference yourself — then YOU can tell her if it's worth it.' Turn the skeptic into your demo participant.",
        "Offer a discount to overcome the friend's objection — drop straight to the voucher price so the deal becomes too good for either of them to keep arguing about"
      ],
      optionsEs: [
        "Ignorar a la amiga y hablar solo con la compradora — es ella quien tiene el dinero, y si entras al trapo con la amiga le das una segunda oportunidad de convencerla de que no",
        "Decirle a la amiga que está siendo negativa e injusta, y señalar que ni siquiera ha probado el producto así que no está en posición de dar consejos sobre él",
        "Incluir a la amiga: '¡Amiga inteligente! Siempre digo a la gente — nunca compren sin probar primero. Aquí, dejadme enseñároslo a LAS DOS en las manos. Ved vosotras mismas la diferencia — luego TÚ le dices si vale la pena.' Convierte a la escéptica en tu participante de demo.",
        "Ofrecer un descuento para superar la objeción de la amiga — baja directa al precio con cupón para que el trato sea demasiado bueno como para que sigan discutiéndolo"
      ],
      correctIndex: 2,
      explanation:
        "This is the 'convert the gatekeeper' technique. Instead of seeing the friend as an obstacle, you see her as a second potential customer. By complimenting her ('smart friend!') and including her in the demo, you: (1) Disarm her negativity, (2) Let her experience the product directly, (3) Potentially create TWO sales instead of one. The best way to silence a skeptic is to make them a believer through their own experience.",
      explanationEs:
        "Esta es la técnica de 'convertir al guardián.' En lugar de ver a la amiga como obstáculo, la ves como una segunda clienta potencial. Al cumplimentarla ('¡amiga inteligente!') e incluirla en la demo, tú: (1) Desarmas su negatividad, (2) Le permites experimentar el producto directamente, (3) Potencialmente creas DOS ventas en lugar de una. La mejor forma de silenciar a un escéptico es hacerlo creyente a través de su propia experiencia."
    },
    {
      question:
        "Customer: 'I already have tons of skincare products at home that I barely use.' What is the BEST response?",
      questionEs:
        "Cliente: 'Ya tengo montones de productos de cuidado de la piel en casa que apenas uso.' ¿Cuál es la MEJOR respuesta?",
      options: [
        "Those other products are probably why you don't see results — ours is different, and mixing brands is exactly what stops any of them from working. Clear the shelf, keep one system, and you will finally see what your skin can do",
        "I hear that all the time. Here's the difference — those products didn't come with ME showing you exactly how to use them and what results to expect. Let me give you my card. Use your products for 2 more weeks. When they don't deliver what I just showed you, text me and I'll be here.",
        "That is exactly my point, my darling — they are sitting in a cupboard because not one of them ever did this. You told me you like it and you would use it. So do not shelve this one. Use it tonight",
        "Then you don't need anything — have a nice day, and come back when you have actually finished the ones you already own"
      ],
      optionsEs: [
        "Esos otros productos son probablemente la razón de que no veas resultados — el nuestro es distinto, y mezclar marcas es justo lo que impide que ninguno funcione. Vacía el estante, quédate con un sistema y por fin verás lo que puede hacer tu piel",
        "Eso lo escucho todo el tiempo. Aquí está la diferencia — esos productos no vinieron conmigo mostrándote exactamente cómo usarlos y qué resultados esperar. Déjame darte mi tarjeta. Usa tus productos por 2 semanas más. Cuando no entreguen lo que acabo de mostrarte, escríbeme y estaré aquí.",
        "Justo por eso, cariño — están en un armario porque ninguno de ellos hizo nunca esto. Me has dicho que te gusta y que lo usarías. Así que este no lo guardes. Úsalo esta noche",
        "Entonces no necesitas nada — que tengas buen día, y vuelve cuando hayas terminado de verdad los que ya tienes"
      ],
      correctIndex: 2,
      explanation:
        "She is not telling you her shelf is full. She is telling you that nothing she has ever bought did what she just watched happen in the mirror — so use her own words back: she said she likes it, she said she would use it. The card answer is the one that loses. It is generous, it is patient, it feels like the classy move, and it hands the decision to a woman who will be on a plane before she next opens that drawer. Everything you are going to win, you win here, with her hand still in yours.",
      explanationEs:
        "No te está diciendo que tenga el estante lleno. Te está diciendo que nada de lo que ha comprado hizo nunca lo que acaba de ver en el espejo — así que devuélvele sus propias palabras: te ha dicho que le gusta y que lo usaría. La respuesta de la tarjeta es la que pierde. Es generosa, es paciente, parece la jugada elegante, y le deja la decisión a una mujer que estará en un avión antes de volver a abrir ese cajón. Todo lo que vas a ganar, lo ganas aquí, con su mano todavía en la tuya."
    },
    {
      question:
        "Customer: 'I need to check my bank account balance first.' What is the MOST effective response?",
      questionEs:
        "Cliente: 'Necesito revisar el saldo de mi cuenta bancaria primero.' ¿Cuál es la respuesta MÁS efectiva?",
      options: [
        "Go check and come back — I'll hold the price for 10 minutes, and if you are not back by then I will have to put it out on the table again for the next customer, because I cannot keep stock off the table on a promise",
        "Of course — check it right now, I am not going anywhere. [Give her the ten seconds] And if it is tight today, tell me what you have got on you and we will make it work — I can split it, part card and part cash, whatever is easiest for you",
        "Don't worry about your balance — just use your credit card, nobody checks their account before buying something this small and you can move the money across later tonight. Nobody has ever regretted a purchase they made on a card",
        "If you need to check your balance, you probably can't afford this — come back another day when you have set the money aside and we will start the whole thing again"
      ],
      optionsEs: [
        "Ve a mirar y vuelve — te guardo el precio 10 minutos, y si no has vuelto para entonces tendré que sacarlo otra vez a la mesa para la siguiente clienta, porque no puedo retirar producto por una promesa",
        "Claro — míralo ahora mismo, que yo no me muevo de aquí. [Dale los diez segundos] Y si hoy va justo, dime qué llevas encima y lo arreglamos — te lo puedo partir, una parte con tarjeta y otra en efectivo, lo que te vaya mejor",
        "No te preocupes por tu saldo — usa la tarjeta de crédito, nadie mira su cuenta antes de comprar algo tan pequeño y ya moverás el dinero esta noche. Nadie se ha arrepentido nunca de una compra pagada con tarjeta",
        "Si necesitas mirar el saldo, probablemente no te lo puedes permitir — vuelve otro día cuando hayas apartado el dinero y empezamos otra vez desde el principio"
      ],
      correctIndex: 1,
      explanation:
        "She did not say no, she said she does not know — and that is a ten-second question she can answer standing exactly where she is. The moment she walks off to check it you have lost her, and 'I will hold it for ten minutes' is that same walk-out with a countdown bolted on. So she checks it here, with her hand still in yours. If the money really is tight the answer is HOW she pays, not a new number: split it, part card and part cash, whatever gets it done. And you do not hand her the bottom of the ladder to be helpful — that price is not yours to give, and offering it before she has even asked teaches her that every number out of your mouth is soft.",
      explanationEs:
        "No te ha dicho que no, te ha dicho que no lo sabe — y eso es una pregunta de diez segundos que puede contestar justo donde está. En cuanto se va a mirarlo la has perdido, y 'te lo guardo diez minutos' es esa misma fuga con una cuenta atrás encima. Así que lo mira aquí, con su mano todavía en la tuya. Si de verdad va justa de dinero, la respuesta es CÓMO paga, no un número nuevo: pártelo, una parte con tarjeta y otra en efectivo, lo que haga falta. Y no le sueltes el fondo de la escalera por hacerle un favor — ese precio no es tuyo, y ofrecérselo antes de que lo haya pedido le enseña que todos los números que dices son blandos."
    }
  ]
};

// ═══════════════════════════════════════════════════════════
// QUIZ 6: BODY LANGUAGE & BUYING SIGNALS
// ═══════════════════════════════════════════════════════════
const quizBodyLanguage: GeneralQuiz = {
  id: "quiz-bodylanguage",
  title: "Body Language & Buying Signals",
  titleEs: "Lenguaje Corporal y Señales de Compra",
  description:
    "Read what is happening in front of you DURING the demo — the lean, the hands, the mirror, the pause before the price. Signals you can act on, right now.",
  descriptionEs:
    "Lee lo que pasa delante de ti DURANTE la demo — cómo se inclina, las manos, el espejo, la pausa antes del precio. Señales sobre las que puedes actuar, ya.",
  icon: "Eye",
  category: "Sales Psychology",
  categoryEs: "Psicología de Ventas",
  xpReward: 200,
  questions: [
    {
      question:
        "A customer leans IN toward you while you're demonstrating the product. What does this body language signal?",
      questionEs:
        "Una cliente se INCLINA hacia ti mientras demuestras el producto. ¿Qué señala este lenguaje corporal?",
      options: [
        "They're trying to smell the product and check whether the fragrance is too strong for them, which usually means they are about to say it is not their scent",
        "They're about to fall over because they have been standing for too long, so you should offer them a seat before you carry on with the demo",
        "They want you to stop talking and get to the point, so you should cut the demo short and go straight to the price before you lose them",
        "This is a strong POSITIVE signal — leaning in indicates interest, engagement, and that they're entering your 'personal space' because they want to be closer to the product"
      ],
      optionsEs: [
        "Están intentando oler el producto y comprobar si el aroma es demasiado fuerte, lo que suele significar que van a decir que no es su olor",
        "Están a punto de caerse porque llevan demasiado rato de pie, así que ofréceles una silla antes de seguir con la demo",
        "Quieren que dejes de hablar y vayas al grano, así que acorta la demo y ve directa al precio antes de perderlas",
        "Esta es una señal POSITIVA fuerte — inclinarse indica interés, compromiso, y que están entrando a tu 'espacio personal' porque quieren estar más cerca del producto"
      ],
      correctIndex: 3,
      explanation:
        "Leaning in is one of the BEST buying signals. People physically lean toward what they want and away from what they don't. When a customer enters your personal bubble voluntarily, they're subconsciously saying 'I'm interested.' This is your cue to continue building value and move toward closing. Never lean BACK when they lean in — match their engagement energy.",
      explanationEs:
        "Inclinarse es una de las MEJORES señales de compra. Las personas se inclinan físicamente hacia lo que quieren y alejan de lo que no. Cuando una cliente entra a tu burbuja personal voluntariamente, están diciendo subconscientemente 'me interesa.' Esta es tu señal para continuar construyendo valor y avanzar hacia el cierre. Nunca te inclines HACIA ATRÁS cuando ellas se inclinen hacia adelante — iguala su energía de compromiso."
    },
    {
      question:
        "A customer crosses their arms while you're explaining the price. What does this USUALLY mean, and how should you respond?",
      questionEs:
        "Una cliente cruza los brazos mientras explicas el precio. ¿Qué significa esto GENERALMENTE, y cómo deberías responder?",
      options: [
        "They're cold — offer them your jacket and move the demo somewhere out of the wind before you carry on with the price",
        "They're comfortable and ready to buy — close immediately, name the price again and put the product straight into their hands. Folded arms mean they have settled in, and people who settle in are people who stay to pay",
        "They want you to talk faster and finish, so skip the rest of the ladder and go straight to your best price",
        "Crossed arms typically indicate a defensive or resistant mental state. DON'T push harder — instead, ask an open question like 'What concerns do you have?' to uncover the real objection and address it"
      ],
      optionsEs: [
        "Tienen frío — ofréceles tu chaqueta y mueve la demo a un sitio sin viento antes de seguir con el precio",
        "Están cómodas y listas para comprar — cierra ya, repite el precio y ponles el producto directamente en las manos. Los brazos cruzados significan que se han acomodado, y quien se acomoda se queda a pagar",
        "Quieren que hables más rápido y acabes, así que sáltate el resto de la escalera y ve directa a tu mejor precio",
        "Brazos cruzados típicamente indican un estado mental defensivo o resistente. NO empujes más fuerte — en su lugar, haz una pregunta abierta como '¿Qué inquietudes tienes?' para descubrir la objeción real y abordarla"
      ],
      correctIndex: 3,
      explanation:
        "Crossed arms are the classic 'barrier signal' — a physical wall between you and the customer. It often means resistance, skepticism, or discomfort. Pushing harder against a wall just creates more resistance. The smart move is to soften your approach, ask questions, and uncover what's really bothering them. Once the real concern is addressed, you'll often see the arms uncross — that's when you know you've reconnected.",
      explanationEs:
        "Brazos cruzados son la señal de 'barrera' clásica — una pared física entre tú y la cliente. A menudo significa resistencia, escepticismo o incomodidad. Empujar más fuerte contra una pared solo crea más resistencia. El movimiento inteligente es suavizar tu enfoque, hacer preguntas, y descubrir qué les está molestando realmente. Una vez que la preocupación real es abordada, a menudo verás los brazos descruzarse — es cuando sabes que te has reconectado."
    },
    {
      question:
        "A customer starts touching their face and neck while looking at the mirror after your demo. What should you do?",
      questionEs:
        "Una cliente empieza a tocarse la cara y cuello mientras mira el espejo después de tu demo. ¿Qué deberías hacer?",
      options: [
        "Keep talking about the science and ingredients — the more she understands about the formula, the more confident she will feel about the price",
        "Ask if they have an itch or irritation, apologise, and offer to wipe the product off before it causes any reaction",
        "Start explaining the price ladder from the top so she can see exactly how far the Europe price is from what she would pay here",
        "STOP talking — this is a peak buying signal. Touching the treated area means they're feeling the result and imagining the product as theirs. Ask for the sale NOW: 'Would you like to take this home today?'"
      ],
      optionsEs: [
        "Seguir hablando de la ciencia y los ingredientes — cuanto más entienda de la fórmula, más segura se sentirá con el precio",
        "Preguntar si les pica o se han irritado, disculparte y ofrecerte a retirar el producto antes de que cause alguna reacción",
        "Empezar a explicar la escalera de precios desde arriba para que vea lo lejos que está el precio de Europa de lo que pagaría aquí",
        "DEJA de hablar — esta es una señal de compra máxima. Tocar el área tratada significa que están sintiendo el resultado e imaginando el producto como suyo. ¡Pide la venta AHORA: '¿Te gustaría llevarte esto a casa hoy?'"
      ],
      correctIndex: 3,
      explanation:
        "When a customer touches the area you just treated, they're having a SENSORY buying moment. Their brain is processing the physical result and creating desire. Talking interrupts this emotional process. The best salespeople know when to SHUT UP. Silence creates space for desire to grow. After 3-5 seconds of their touch, deliver your closing question. The combination of physical sensation + silence + direct close is devastatingly effective.",
      explanationEs:
        "Cuando una cliente toca el área que acabas de tratar, está teniendo un momento de compra SENSORIAL. Su cerebro está procesando el resultado físico y creando deseo. Hablar interrumpe este proceso emocional. Los mejores vendedores saben cuándo CALLARSE. El silencio crea espacio para que el deseo crezca. Después de 3-5 segundos de su toque, lanza tu pregunta de cierre. La combinación de sensación física + silencio + cierre directo es devastadoramente efectiva."
    },
    {
      question:
        "A customer steps BACK from you during the pitch. What does this mean and what should you do?",
      questionEs:
        "Una cliente da un PASO ATRÁS de ti durante el pitch. ¿Qué significa esto y qué deberías hacer?",
      options: [
        "They want you to demonstrate from a distance so they can see the whole product at once — hold it up higher and carry on",
        "They want more personal space — you're being too pushy or close. Step back yourself, soften your tone, and ask a question to re-engage",
        "They're making room so other people can see the demo — that is a compliment, so raise your voice and play to the small crowd",
        "They're stretching their legs after standing still for a while, so give them a moment and then pick the demo back up"
      ],
      optionsEs: [
        "Quieren que hagas la demo desde lejos para ver el producto entero — levántalo más alto y continúa",
        "Quieren más espacio personal — estás siendo demasiado insistente o cercano. Retrocede tú también, suaviza tu tono, y haz una pregunta para volver a enganchar",
        "Están haciendo sitio para que otras personas vean la demo — eso es un halago, así que sube la voz y juega con el corrillo",
        "Están estirando las piernas después de un rato de pie, así que dales un momento y retoma la demo"
      ],
      correctIndex: 1,
      explanation:
        "Stepping back is a retreat signal — the customer feels pressured, uncomfortable, or invaded. The WORST thing you can do is step forward to close the gap — that feels like pursuit. Instead, mirror their retreat by stepping back yourself. This non-threatening response signals respect. Then soften your voice, slow your pace, and ask an engaging question to rebuild comfort. Reading and responding to spatial cues separates professionals from amateurs.",
      explanationEs:
        "Dar un paso atrás es una señal de retirada — la cliente se siente presionada, incómoda o invadida. Lo PEOR que puedes hacer es dar un paso adelante para cerrar la brecha — eso se siente como persecución. En su lugar, refleja su retirada retrocediendo tú también. Esta respuesta no amenazante señala respeto. Luego suaviza tu voz, reduce tu ritmo, y haz una pregunta atractiva para reconstruir comodidad. Leer y responder a señales espaciales separa a profesionales de aficionados."
    },
    {
      question:
        "You notice a customer's voice tone changes from flat/hesitant to higher and more excited when you mention the {currency}140 price point. What does this indicate?",
      questionEs:
        "Notas que el tono de voz de una cliente cambia de plano/dudoso a más alto y emocionado cuando mencionas el precio de {currency}140. ¿Qué indica esto?",
      options: [
        "They think {currency}140 is too expensive and are getting angry — the pitch in the voice is irritation, so drop a rung fast",
        "Vocal tone rising with excitement is a POSITIVE buying signal — it suggests the price is within their acceptable range and they're emotionally engaging with the purchase possibility",
        "They have a sore throat and need water — offer them a bottle and give the voice change no further weight",
        "They want you to lower the price more and the excitement is really anticipation of the next discount you are about to give"
      ],
      optionsEs: [
        "Piensan que {currency}140 es demasiado caro y se están enfadando — ese tono agudo es irritación, así que baja un escalón rápido",
        "El tono de voz subiendo con emoción es una señal de compra POSITIVA — sugiere que el precio está dentro de su rango aceptable y se están comprometiendo emocionalmente con la posibilidad de compra",
        "Tienen dolor de garganta y necesitan agua — ofréceles una botella y no le des más importancia al cambio de voz",
        "Quieren que bajes más el precio y esa emoción es en realidad la expectativa del siguiente descuento que vas a dar"
      ],
      correctIndex: 1,
      explanation:
        "Voice tone changes are incredibly revealing. A flat, monotone voice usually indicates low engagement or skepticism. When the voice lifts, speeds up, or becomes more animated, the customer is emotionally activating. This 'vocal excitement' means the price didn't trigger rejection — it triggered POSSIBILTY. They're imagining owning the product. Your job: move to close while the emotional momentum is building. Don't keep pitching — they're already sold emotionally.",
      explanationEs:
        "Los cambios de tono de voz son increíblemente reveladores. Una voz plana y monótona usualmente indica bajo compromiso o escepticismo. Cuando la voz sube, acelera, o se vuelve más animada, la cliente se está activando emocionalmente. Esta 'emoción vocal' significa que el precio no disparó rechazo — disparó POSIBILIDAD. Están imaginando tener el producto. Tu trabajo: avanzar al cierre mientras el momentum emocional está construyendo. No sigas pitchando — ya están vendidas emocionalmente."
    },
    {
      question:
        "A customer starts mirroring your gestures — when you touch your face, they touch theirs; when you smile, they smile. What is happening?",
      questionEs:
        "Una cliente empieza a reflejar tus gestos — cuando te tocas la cara, ellas se tocan la suya; cuando sonríes, ellas sonríen. ¿Qué está pasando?",
      options: [
        "They're making fun of you and copying your gestures to entertain whoever they came with, so wrap the demo up quickly",
        "They have a nervous tic and are uncomfortable being this close to a stranger, so give them more space and speak more softly",
        "Mirroring is a subconscious sign of rapport and trust building. It means they're syncing with you emotionally and are highly likely to buy if you ask for the sale",
        "They want to be your friend, not a customer — they are enjoying the chat but they have no intention of spending anything today"
      ],
      optionsEs: [
        "Se están burlando de ti y copian tus gestos para entretener a quien la acompaña, así que cierra la demo rápido",
        "Tienen un tic nervioso y están incómodas tan cerca de una desconocida, así que dales más espacio y baja la voz",
        "El reflejo es una señal subconsciente de rapport y construcción de confianza. Significa que se están sincronizando contigo emocionalmente y es muy probable que compren si pides la venta",
        "Quieren ser tu amiga, no tu clienta — están disfrutando de la charla pero no piensan gastar nada hoy"
      ],
      correctIndex: 2,
      explanation:
        "Mirroring is a well-documented psychological phenomenon. When someone unconsciously copies your body language, it means their brain has entered a state of rapport with you. This 'neural syncing' is the foundation of trust. In sales, it's one of the strongest indicators that a customer is ready to follow your guidance. When you see mirroring, you've successfully built a connection. The next step is a confident close — they trust you enough to say yes.",
      explanationEs:
        "El reflejo es un fenómeno psicológico bien documentado. Cuando alguien copia inconscientemente tu lenguaje corporal, significa que su cerebro ha entrado en un estado de rapport contigo. Esta 'sincronización neural' es la fundación de la confianza. En ventas, es uno de los indicadores más fuertes de que una cliente está lista para seguir tu guía. Cuando ves reflejo, has construido exitosamente una conexión. El siguiente paso es un cierre confiado — confían lo suficiente en ti para decir sí."
    },
    {
      question:
        "A customer's eyes keep darting around instead of focusing on you or the product. What should you do?",
      questionEs:
        "Los ojos de una cliente siguen moviéndose por todos lados en lugar de enfocarse en ti o el producto. ¿Qué deberías hacer?",
      options: [
        "Wave your hand in front of their face to get attention back, then start the most impressive part of the demo again",
        "Talk louder to force their attention back onto you — energy wins distraction, and volume is the fastest way to raise the energy",
        "Ignore it and keep pitching — they'll catch up, and stopping now would only draw attention to the fact that you noticed",
        "They're distracted or uncomfortable. Pause, let silence settle for 3 seconds, then ask a direct question: 'What would make this perfect for you?' to pull their attention back"
      ],
      optionsEs: [
        "Mover la mano delante de su cara para recuperar la atención y volver a empezar por la parte más impactante de la demo",
        "Hablar más alto para forzar su atención — la energía gana a la distracción, y el volumen es la vía rápida para subirla",
        "Ignorarlo y seguir con el pitch — ya se pondrán al día, y parar ahora solo dejaría claro que te has dado cuenta",
        "Están distraídas o incómodas. Pausa, deja que el silencio se asiente por 3 segundos, luego haz una pregunta directa: '¿Qué haría esto perfecto para ti?' para traer su atención de vuelta"
      ],
      correctIndex: 3,
      explanation:
        "Darting eyes indicate distraction, overwhelm, or discomfort. Forcing attention (waving hands, talking louder) makes it worse. The 3-second silence creates a natural break that interrupts their mental distraction. Then a direct, personal question re-engages them by making the conversation ABOUT them. When attention wanders, don't chase it — create a pause, then invite it back gently. This shows confidence and respect for their mental space.",
      explanationEs:
        "Ojos moviéndose indican distracción, agobio o incomodidad. Forzar la atención (mover manos, hablar más fuerte) lo empeora. Los 3 segundos de silencio crean una pausa natural que interrumpe su distracción mental. Luego una pregunta directa y personal los vuelve a enganchar al hacer la conversación acerca de ELLOS. Cuando la atención divaga, no la persigas — crea una pausa, luego invítala de vuelta gentilmente. Esto muestra confianza y respeto por su espacio mental."
    },
    {
      question:
        "A customer says 'maybe' and starts looking around for their friend, but they're still holding the product. Should you push or back off?",
      questionEs:
        "Una cliente dice 'tal vez' y empieza a buscar a su amiga, pero sigue sosteniendo el producto. ¿Deberías empujar o retroceder?",
      options: [
        "Push hard — they're holding the product so they want to buy, and if you let the moment pass they will hand it back and walk. Name the price again, put the bag in their other hand and keep talking until they say yes",
        "Soft push with a decision helper: 'I can see you're thinking it over. Here's what I'll do — hold this, feel how it feels in your hands. When your friend gets here, let her see the result too. Three minutes, then you decide. No pressure either way.'",
        "Back off completely — they said maybe, respect that, take the product back and let them come to you if they change their mind",
        "Take the product out of their hands so they can't leave with it, and tell them you will keep it behind the counter until they decide"
      ],
      optionsEs: [
        "Presionar fuerte — tienen el producto en la mano así que quieren comprar, y si dejas pasar el momento te lo devuelven y se van. Repite el precio, ponles la bolsa en la otra mano y sigue hablando hasta que digan que sí",
        "Empujón suave con ayudante de decisión: 'Veo que lo estás pensando. Esto haré — sostén esto, siente cómo se siente en tus manos. Cuando llegue tu amiga, deja que ella también vea el resultado. Tres minutos, luego decides. Sin presión de ningún lado.'",
        "Retirarte del todo — han dicho tal vez, respétalo, recoge el producto y deja que vuelvan ellas si cambian de idea",
        "Quitarles el producto de las manos para que no se lo lleven, y decirles que lo guardas detrás del mostrador hasta que decidan"
      ],
      correctIndex: 1,
      explanation:
        "Holding the product while hesitating is a classic 'torn' signal — part of them wants to buy, part needs validation. The 'soft push' gives them structure (3 minutes) without pressure. Getting the friend's opinion turns potential interference into support. Setting a time boundary ('three minutes') prevents indefinite hesitation. And 'no pressure either way' removes the fear of being trapped into a decision. This is sophisticated selling — guiding without pushing.",
      explanationEs:
        "Sostener el producto mientras dudan es una señal clásica de 'dividida' — parte de ellas quiere comprar, parte necesita validación. El 'empujón suave' les da estructura (3 minutos) sin presión. Obtener la opinión de la amiga convierte potencial interferencia en apoyo. Establecer un límite de tiempo ('tres minutos') previene la indecisión indefinida. Y 'sin presión de ningún lado' elimina el miedo a ser atrapadas en una decisión. Esto es venta sofisticada — guiar sin empujar."
    },
    {
      question:
        "A customer smiles politely but says 'no thank you.' Their smile doesn't reach their eyes. What is really happening?",
      questionEs:
        "Una cliente sonríe educadamente pero dice 'no gracias.' Su sonrisa no llega a sus ojos. ¿Qué está pasando realmente?",
      options: [
        "A polite smile without eye involvement is a 'social mask' — they're uncomfortable saying no to your face. Offer a low-pressure alternative: 'Totally understand! Here, just try the hand scrub — no obligation, just so you know what we do.' This removes the pressure while keeping them engaged",
        "They're being friendly but genuinely not interested — thank them, move on, and spend the time on someone who has not already made their mind up. A no delivered with a smile is still a no, and chasing it costs you the next three approaches",
        "They want you to try harder with a better pitch — start the whole presentation again from the top with more energy and they will come round. Polite refusals are usually a test of how much you believe in what you are holding",
        "They have something in their eye or the sun is bothering them, so step to the side and start the demo again from a different angle"
      ],
      optionsEs: [
        "Una sonrisa educada sin involucramiento de ojos es una 'máscara social' — se sienten incómodas diciendo no a tu cara. Ofrece una alternativa de baja presión: '¡Totalmente entendido! Aquí, solo prueba el scrub de manos — sin obligación, solo para que sepas lo que hacemos.' Esto elimina la presión mientras las mantiene comprometidas",
        "Están siendo amables pero de verdad no les interesa — dales las gracias, sigue adelante y dedica el tiempo a alguien que no lo haya decidido ya. Un no con sonrisa sigue siendo un no, y perseguirlo te cuesta los tres siguientes acercamientos",
        "Quieren que te esfuerces más con un mejor pitch — empieza la presentación otra vez desde arriba con más energía y acabarán cediendo. Un rechazo educado suele ser una prueba de cuánto te crees lo que llevas en la mano",
        "Tienen algo en el ojo o les molesta el sol, así que muévete a un lado y empieza la demo otra vez desde otro ángulo"
      ],
      correctIndex: 0,
      explanation:
        "The 'polite no' with a fake smile is a social defense mechanism — they don't want to be rude but they're not interested in what you're currently offering. Pushing the same product harder will fail. But offering a ZERO-pressure alternative (the hand scrub demo) removes the social tension and gives them a way to engage without committing. Many 'polite no' customers become buyers when the pressure drops and they experience the product casually.",
      explanationEs:
        "El 'no educado' con sonrisa falsa es un mecanismo de defensa social — no quieren ser groseras pero no están interesadas en lo que actualmente ofreces. Empujar el mismo producto más fuerte fracasará. Pero ofrecer una alternativa de CERO presión (la demo de scrub de manos) elimina la tensión social y les da una forma de comprometerse sin comprometerse. Muchas clientes de 'no educado' se convierten en compradoras cuando la presión baja y experimentan el producto casualmente."
    },
    {
      question:
        "When is the BEST moment to ask for the sale, based on body language reading?",
      questionEs:
        "¿Cuándo es el MEJOR momento para pedir la venta, basado en lectura de lenguaje corporal?",
      options: [
        "When you see 2-3 positive signals together: leaning in + touching the product + asking ownership questions like 'How often do I use this?'",
        "As soon as you finish explaining all the product features, while everything you said is still fresh in their mind",
        "Only when they explicitly say 'I want to buy this' — anything earlier is pressure and puts the customer on the defensive",
        "After exactly 5 minutes of conversation, which is how long it takes for anyone to feel comfortable with a stranger"
      ],
      optionsEs: [
        "Cuando ves 2-3 señales positivas juntas: inclinarse hacia adelante + tocar el producto + hacer preguntas de propiedad como '¿Qué tan seguido uso esto?'",
        "En cuanto terminas de explicar todas las características del producto, mientras lo que has dicho sigue fresco",
        "Solo cuando dicen explícitamente 'Quiero comprar esto' — antes es presión y pone a la clienta a la defensiva",
        "Después de exactamente 5 minutos de conversación, que es lo que tarda cualquiera en sentirse cómodo con un desconocido"
      ],
      correctIndex: 0,
      explanation:
        "Single body language signals can be misleading. But when MULTIPLE positive signals cluster together — especially a mix of physical (leaning in, touching), verbal (ownership language), and emotional (smiling, excited tone) — the customer is in a 'buying state.' Asking for the sale at this moment feels natural to them, not pushy. Missing this window means they'll start second-guessing. The '3-signal rule' is the most reliable closing trigger in street sales.",
      explanationEs:
        "Señales individuales de lenguaje corporal pueden ser engañosas. Pero cuando MÚLTIPLES señales positivas se agrupan juntas — especialmente una mezcla de físicas (inclinarse, tocar), verbales (lenguaje de propiedad), y emocionales (sonreír, tono emocionado) — la cliente está en un 'estado de compra.' Pedir la venta en este momento se siente natural para ellas, no agresivo. Perder esta ventana significa que empezarán a dudar. La 'regla de 3 señales' es el disparador de cierre más confiable en ventas de calle."
    }
  ]
};

// ═══════════════════════════════════════════════════════════
// MASTER EXPORT
// ═══════════════════════════════════════════════════════════
export const MORE_QUIZZES: GeneralQuiz[] = [
  quizSyringeDeep,
  quizPeelingMastery,
  quizScrubExpert,
  quizNailKitPro,
  quizObjectionsChampion,
  quizBodyLanguage
];

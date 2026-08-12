export interface DailyDose {
  id: string;
  day: number;
  title: string;
  titleEs: string;
  category: string;
  content: {
    type: 'tip' | 'script' | 'technique' | 'mindset';
    text: string;
    textEs: string;
    highlight?: string;
    highlightEs?: string;
  }[];
  practicePrompt: string;
  practicePromptEs: string;
  xpReward: number;
}

export const dailyDoses: DailyDose[] = [
  // ─── DAYS 1–7: STOPPING FUNDAMENTALS ───
  {
    id: 'dose-001',
    day: 1,
    title: 'The Energy First Rule',
    titleEs: 'La Regla de la Energía Primero',
    category: 'Stopping',
    content: [
      {
        type: 'mindset',
        text: 'Before you say a word, your energy speaks. A tired approach gets a tired response. Energy is contagious — bring the fire.',
        textEs: 'Antes de decir una palabra, tu energía habla. Un acercamiento cansado genera una respuesta cansada. La energía es contagiosa — trae el fuego.',
        highlight: 'Your energy is your first word.',
        highlightEs: 'Tu energía es tu primera palabra.',
      },
      {
        type: 'tip',
        text: 'Take three deep breaths before every approach. Stand tall. Smile like you just heard great news. Your body changes your mind.',
        textEs: 'Respira hondo tres veces antes de cada acercamiento. Ponte derecha. Sonríe como si acabaras de oír una buena noticia. Tu cuerpo te cambia la cabeza.',
      },
      {
        type: 'script',
        text: 'Internal mantra: "I am the best thing to happen to this person\'s day."',
        textEs: 'Mantra interno: "Soy lo mejor que le pasará en el día a esta persona."',
      },
    ],
    practicePrompt: 'On your next 5 approaches, pay attention only to your energy level. Rate yourself 1-5 after each. What do you notice?',
    practicePromptEs: 'En tus próximos 5 acercamientos, presta atención solo a tu nivel de energía. Puntúate del 1 al 5 después de cada uno. ¿Qué notas?',
    xpReward: 15,
  },
  {
    id: 'dose-002',
    day: 2,
    title: 'The Genuine Compliment',
    titleEs: 'El Cumplido Genuino',
    category: 'Stopping',
    content: [
      {
        type: 'mindset',
        text: 'A compliment opens the door. But it must be SPECIFIC and GENUINE. "Nice dress" is weak. "That colour looks amazing on you" is strong.',
        textEs: 'Un cumplido abre la puerta. Pero tiene que ser ESPECÍFICO y GENUINO. "Bonito vestido" es flojo. "Ese color te queda increíble" es fuerte.',
        highlight: 'Specific compliments stop people. Generic ones don\'t.',
        highlightEs: 'Los cumplidos específicos detienen a la gente. Los genéricos no.',
      },
      {
        type: 'technique',
        text: 'The DETAIL RULE: Pick one specific detail — a colour, an accessory, a hairstyle, the way they carry themselves. Name it. Own it.',
        textEs: 'La REGLA DEL DETALLE: Elige un detalle concreto — un color, un complemento, un peinado, cómo se mueve. Nómbralo. Hazlo tuyo.',
      },
      {
        type: 'script',
        text: '"Excuse me, I just have to say — that scarf is stunning. The way you tied it, so elegant!"',
        textEs: '"Perdona, te lo tengo que decir — ese pañuelo es una preciosidad. Y cómo te lo has puesto, ¡qué elegante!"',
      },
    ],
    practicePrompt: 'Give 5 specific compliments today. Write down which ones got a smile or a "thank you." What pattern do you see?',
    practicePromptEs: 'Da 5 cumplidos específicos hoy. Anota cuáles provocaron una sonrisa o un "gracias." ¿Qué patrón ves?',
    xpReward: 15,
  },
  {
    id: 'dose-003',
    day: 3,
    title: 'Eye Contact That Hooks',
    titleEs: 'Contacto Visual Que Engancha',
    category: 'Stopping',
    content: [
      {
        type: 'tip',
        text: 'Eye contact is your secret weapon. Most salespeople look at the product. You look at the PERSON. Hold eye contact one second longer than feels comfortable.',
        textEs: 'El contacto visual es tu arma secreta. La mayoría de los vendedores miran el producto. Tú mira a la PERSONA. Mantén el contacto visual un segundo más de lo que te resulta cómodo.',
        highlight: 'One extra second of eye contact builds instant trust.',
        highlightEs: 'Un segundo extra de contacto visual genera confianza instantánea.',
      },
      {
        type: 'technique',
        text: 'The LOCK-AND-SMILE: Make eye contact, hold it, and let a slow smile spread. Not a grin — a warm, genuine smile that reaches your eyes.',
        textEs: 'El BLOQUEO-Y-SONRISA: Haz contacto visual, mantenlo, y deja que una sonrisa lenta se expanda. No una mueca — una sonrisa cálida y de verdad, de las que llegan a los ojos.',
      },
      {
        type: 'script',
        text: '"Hi there — sorry to stop you, but I just noticed your eyes sparkle and I couldn\'t walk past. I\'m [Name] by the way!"',
        textEs: '"Hola — perdona que te pare, pero es que te brillan los ojos y no podía pasar de largo. Soy [Nombre], por cierto."',
      },
    ],
    practicePrompt: 'Practice the Lock-and-Smile on 5 strangers today. Count how many return the smile. Record the number.',
    practicePromptEs: 'Practica el Bloqueo-y-Sonrisa con 5 desconocidos hoy. Cuenta cuántos devuelven la sonrisa. Registra el número.',
    xpReward: 15,
  },
  {
    id: 'dose-004',
    day: 4,
    title: 'Get the Look Before You Move',
    titleEs: 'Consigue la Mirada Antes de Moverte',
    category: 'Stopping',
    content: [
      {
        type: 'tip',
        text: 'You go for their attention while they are still coming towards you — four or five metres off, still walking. Wait until they are nearly on top of you and you have left it too late: by the time they have registered you and turned their head, they are already level with you, and then they are past.',
        textEs: 'Les buscas la atención cuando todavía vienen hacia ti — a cuatro o cinco metros, todavía andando. Si esperas a tenerlos casi encima, ya llegas tarde: para cuando te han visto y han girado la cabeza ya están a tu altura, y acto seguido te han pasado de largo.',
        highlight: 'Their eyes first. Your feet second.',
        highlightEs: 'Primero sus ojos. Después tus pies.',
      },
      {
        type: 'script',
        text: '"Hi guys, how you doing?" — and WAIT. Do not step, do not raise the sample. Only once they look at you do you lift it and start walking towards them. Walking at someone who has not looked at you is how you become the person everybody swerves.',
        textEs: '"Hola chicos, ¿qué tal?" — y ESPERA. No des un paso, no levantes la muestra. Solo cuando te miren la levantas y empiezas a andar hacia ellos. Andar hacia alguien que no te ha mirado es cómo te conviertes en la persona a la que todo el mundo esquiva.',
      },
      {
        type: 'tip',
        text: 'If they do not look, you have lost nothing — you never committed anything. No step taken, no sample raised, no rejection. Say it again to the next one and keep your feet still.',
        textEs: 'Si no te miran, no has perdido nada — no habías comprometido nada. Ni un paso, ni la muestra en alto, ni un rechazo. Suéltalo otra vez con la siguiente y no muevas los pies.',
      },
    ],
    practicePrompt: 'Today, say your line early — while they are still four or five metres off — and keep your feet completely still until they look up. Count the ones who look. That is the only number that matters this morning.',
    practicePromptEs: 'Hoy suelta tu frase pronto — cuando todavía están a cuatro o cinco metros — y no muevas los pies hasta que levanten la vista. Cuenta los que te miran. Es el único número que importa esta mañana.',
    xpReward: 15,
  },
  {
    id: 'dose-005',
    day: 5,
    title: 'Rejection Is Data',
    titleEs: 'El Rechazo Es Información',
    category: 'Stopping',
    content: [
      {
        type: 'mindset',
        text: 'Every "no" teaches you something. The goal today isn\'t zero rejection — it\'s LEARNING from every rejection. What did they say? What was their body language? What can you adjust?',
        textEs: 'Cada "no" te enseña algo. La meta hoy no es cero rechazos — es APRENDER de cada rechazo. ¿Qué dijeron? ¿Cuál fue su lenguaje corporal? ¿Qué puedes ajustar?',
        highlight: 'Rejection is feedback. Feedback is fuel.',
        highlightEs: 'El rechazo es información. La información es combustible.',
      },
      {
        type: 'technique',
        text: 'The AFTER-ACTION REVIEW: After every 10 approaches, ask yourself: What worked? What didn\'t? What will I try differently? Write it down.',
        textEs: 'La REVISIÓN POST-ACCIÓN: Después de cada 10 acercamientos, pregúntate: ¿Qué funcionó? ¿Qué no? ¿Qué voy a probar distinto? Escríbelo.',
      },
      {
        type: 'mindset',
        text: 'Most of the people you step in front of will not stop, and most of the ones who do stop will not buy. That is the shape of the job and nobody tells you on your first day — but do not read it as comfort, because it is not. Read it the other way round. If almost nobody stops, then the one who did NOT walk, the one already sitting in your chair, is a rare thing, and there is no queue of them behind her. So you do not hurry her and you do not go lazy halfway through. It is not there to make a bad day feel better. It is there to make you fight for the one you have got.',
        textEs: 'La mayoría de la gente delante de la que te pongas no va a parar, y de las que paran la mayoría no va a comprar. Esa es la forma del trabajo y nadie te lo cuenta el primer día — pero no lo leas como consuelo, porque no lo es. Léelo al revés. Si casi nadie para, entonces la que NO se ha ido, la que ya está sentada en tu silla, es algo raro, y detrás de ella no hay cola. Así que ni la metes prisa ni aflojas a mitad de camino. No está para que un mal día duela menos. Está para que pelees por la que ya tienes.',
      },
    ],
    practicePrompt: 'Track your next 10 rejections. Note ONE thing about each (their body language, what they said, time of day). Look for patterns.',
    practicePromptEs: 'Registra tus próximos 10 rechazos. Nota UNA cosa de cada uno (su lenguaje corporal, lo que dijeron, hora del día). Busca patrones.',
    xpReward: 15,
  },
  {
    id: 'dose-006',
    day: 6,
    title: 'The Connection Bridge',
    titleEs: 'El Puente de Conexión',
    category: 'Stopping',
    content: [
      {
        type: 'technique',
        text: 'Stop → Compliment → BRIDGE. The bridge is a question or statement that moves you from stranger to conversational partner. It must feel natural, not forced.',
        textEs: 'Detener → Cumplido → PUENTE. El puente es una pregunta o afirmación que te mueve de desconocido a interlocutor. Debe sentirse natural, no forzado.',
        highlight: 'The bridge turns a stop into a conversation.',
        highlightEs: 'El puente convierte una parada en una conversación.',
      },
      {
        type: 'script',
        text: '"...I work with a Dead Sea skincare brand, and we just opened up down the road. Have you heard about Dead Sea minerals?"',
        textEs: '"...yo trabajo con una marca de cosmética del Mar Muerto, y acabamos de abrir aquí al lado. ¿Has oído hablar de los minerales del Mar Muerto?"',
      },
      {
        type: 'tip',
        text: 'The best bridges are CURIOSITY-BASED. People can\'t resist answering a question they\'re curious about. Make them wonder.',
        textEs: 'Los mejores puentes se basan en la CURIOSIDAD. La gente no puede resistirse a responder una pregunta que les despierta curiosidad. Haz que se pregunten.',
      },
    ],
    practicePrompt: 'Craft 3 different "bridge" questions today. Test each one at least twice. Which one gets the best response?',
    practicePromptEs: 'Crea 3 "puentes" diferentes hoy. Prueba cada uno al menos dos veces. ¿Cuál obtiene la mejor respuesta?',
    xpReward: 15,
  },
  {
    id: 'dose-007',
    day: 7,
    title: 'Handing Off Like a Pro',
    titleEs: 'El traspaso, como una profesional',
    category: 'Stopping',
    content: [
      {
        type: 'technique',
        text: 'The hand-off to your colleague inside is CRITICAL. A sloppy hand-off kills deals. A smooth one seals them. Make your client feel VIP during the transition.',
        textEs: 'El traspaso a tu compañera de dentro es CRÍTICO. Un traspaso descuidado tira la venta. Uno bueno la cierra. Haz que tu clienta se sienta VIP en ese momento.',
        highlight: 'The hand-off is part of the sale, not the end of it.',
        highlightEs: 'El traspaso es parte de la venta, no el final.',
      },
      {
        type: 'script',
        text: '"This is [Name] — she is our skin girl, she is going to look after you." Say it once they are in the chair, not out on the pavement. You walk in first and you call them after you; you never walk them in beside you like an usher.',
        textEs: '"Esta es [Nombre] — es nuestra chica de la piel, te va a cuidar de maravilla." Dilo cuando ya estén sentados, no en la acera. Tú entras primero y los llamas detrás de ti; nunca los metes andando a su lado como un acomodador.',
      },
      {
        type: 'tip',
        text: 'Introduce your colleague by name and say what she is good at. But the gift you promised out on the street stays yours — you brought them in with it, so you are the one who puts it in their hand. Do not park your promise with somebody else.',
        textEs: 'Presenta a tu compañera por su nombre y di en qué es buena. Pero el regalo que prometiste en la calle es tuyo — los has metido con eso, así que eres tú quien se lo pone en la mano. No le dejes tu promesa a otra persona.',
      },
    ],
    practicePrompt: 'Practice your hand-off script 3 times with a colleague today. Ask for feedback. What felt natural? What felt forced?',
    practicePromptEs: 'Practica hoy tu frase de traspaso 3 veces con un compañero. Pídele que te diga qué tal. ¿Qué te ha salido natural? ¿Qué te ha sonado forzado?',
    xpReward: 15,
  },

  /* ─── PRODUCT KNOWLEDGE ───
     The `day` numbers here are a rotation, NOT an induction calendar —
     getTodaysDose() serves by day-of-month, so nobody receives these in order
     from their first shift. Worth knowing when you write one: a new seller's
     first two weeks are stopping only. They stop people and pass them to
     colleagues; they do not run demos themselves. So a dose about running your
     own demo is for the seller who has come through that, and says so. */
  {
    id: 'dose-008',
    day: 8,
    title: 'The Syringe Demo That Sells',
    titleEs: 'La Demo de Jeringa Que Vende',
    category: 'Product',
    content: [
      {
        type: 'technique',
        text: 'Your first two weeks you do not do this at all — you stop people and pass them to a colleague, and that is the whole job. Once you are through that, the syringe demo is your WOW moment. Don\'t rush it. Build suspense. Let them see the transformation happen on their own hand.',
        textEs: 'Las dos primeras semanas esto no lo haces — paras gente y se la pasas a un compañero, y ese es el trabajo entero. Cuando ya has pasado por ahí, la demo de jeringa es tu momento WOW. No te apresures. Genera suspense. Deja que vean la transformación en su propia mano.',
        highlight: 'Let them feel it. Feeling = believing.',
        highlightEs: 'Déjalas sentirlo. Sentir = creer.',
      },
      {
        type: 'script',
        text: '"Watch this — I\'m going to put a tiny drop on the back of your hand. Feel that? It\'s warm. That\'s the hyaluronic acid activating, drawing moisture deep into your skin."',
        textEs: '"Mira esto — voy a poner una gotita en el dorso de tu mano. ¿Lo sientes? Está caliente. Eso es el ácido hialurónico activándose, llevando hidratación al fondo de la piel."',
      },
      {
        type: 'tip',
        text: 'After the demo, DON\'T talk. Let silence work. Wait for them to say "Wow" or ask a question. The first person to speak loses — and you want them to lose.',
        textEs: 'Después de la demo, NO hables. Deja que el silencio trabaje. Espera a que digan "Wow" o hagan una pregunta. La primera persona en hablar pierde — y quieres que ellos pierdan.',
      },
    ],
    practicePrompt: 'Do 5 syringe demos today. Time yourself — aim for 45 seconds of pure silence after application. Count how many times the client breaks the silence first.',
    practicePromptEs: 'Haz 5 demos de jeringa hoy. Cronométrate — busca 45 segundos de silencio puro después de la aplicación. Cuenta cuántas veces el cliente rompe el silencio primero.',
    xpReward: 15,
  },
  {
    id: 'dose-009',
    day: 9,
    title: 'Peeling Demo Magic',
    titleEs: 'La Magia de la Demo de Peeling',
    category: 'Product',
    content: [
      {
        type: 'technique',
        text: 'The peeling demo creates instant visual proof. Dead skin rolling off their hand is visceral. It triggers disgust AND desire — the perfect combo.',
        textEs: 'La demo de peeling crea prueba visual instantánea. La piel muerta saliendo de su mano es visceral. Despierta asco Y deseo — la combinación perfecta.',
        highlight: 'Visual proof beats verbal claims every time.',
        highlightEs: 'La prueba visual supera a las afirmaciones verbales siempre.',
      },
      {
        type: 'script',
        text: '"I\'m going to show you something incredible. The Peeling separates dead skin you didn\'t even know you had. Watch — roll it gently, don\'t rub... see those grey bits? That\'s years of buildup, gone in seconds."',
        textEs: '"Voy a enseñarte algo increíble. El Peeling separa la piel muerta que ni siquiera sabías que tenías. Mira — enróllalo suavemente, no lo frotes... ¿ves esas bolitas grises? Son años de acumulación, fuera en segundos."',
      },
      {
        type: 'tip',
        text: 'ALWAYS do the peeling demo on the BACK of their hand, not the palm. The back shows results better and feels more "skincare" than "cleaning."',
        textEs: 'SIEMPRE haz la demo de peeling en el DORSO de la mano, no en la palma. En el dorso se ve mejor el resultado y parece más "cuidado de la piel" que "limpieza".',
      },
    ],
    practicePrompt: 'Track your peeling-to-sale conversion today. Out of every peeling demo you do, how many lead to a product sale? Aim for 60%+.',
    practicePromptEs: 'Registra tu conversión de peeling-a-venta hoy. De cada demo de peeling que hagas, ¿cuántas llevan a una venta? Apunta al 60%+.',
    xpReward: 15,
  },
  {
    id: 'dose-010',
    day: 10,
    title: 'Scrub Demo Mastery',
    titleEs: 'Dominio de la Demo de Exfoliante',
    category: 'Product',
    content: [
      {
        type: 'technique',
        text: 'The salt scrub is a sensory experience. Use descriptive words that engage touch and smell. Make it luxurious, not clinical.',
        textEs: 'El exfoliante de sal es una experiencia sensorial. Usa palabras descriptivas que enganchen el tacto y el olfato. Que suene a lujo, no a clínica.',
        highlight: 'Words create experience. Choose luxurious language.',
        highlightEs: 'Las palabras crean la experiencia. Elige palabras de lujo.',
      },
      {
        type: 'script',
        text: '"Close your eyes and smell this — Dead Sea salt, lavender, vitamin E. Feel the crystals? They\'re melting into your skin, releasing minerals that boost circulation. Your skin will feel like silk."',
        textEs: '"Cierra los ojos y huele esto — sal del Mar Muerto, lavanda, vitamina E. ¿Sientes los cristales? Se están derritiendo en tu piel, liberando minerales que mejoran la circulación. Tu piel se sentirá como seda."',
      },
      {
        type: 'tip',
        text: 'Have them smell BEFORE they see. Scent is the fastest path to emotion. When they smell first, they\'re already sold before the demo even starts.',
        textEs: 'Haz que huelan ANTES de ver. El aroma es el camino más rápido a la emoción. Cuando huelen primero, ya están vendidas antes de que la demo empiece.',
      },
    ],
    practicePrompt: 'Try the "smell first" approach on 5 clients today. Compare reactions vs. showing first. Record your observations.',
    practicePromptEs: 'Prueba el enfoque "huele primero" con 5 clientes hoy. Compara reacciones vs. mostrar primero. Registra tus observaciones.',
    xpReward: 15,
  },
  {
    id: 'dose-011',
    day: 11,
    title: 'Nail Kit Demo Secrets',
    titleEs: 'Secretos de la Demo del Kit de Uñas',
    category: 'Product',
    content: [
      {
        type: 'technique',
        text: 'The nail kit is a 3-step story: Cut → File → Shine. Each step has its own moment. Don\'t rush the shine — that\'s the WOW.',
        textEs: 'El kit de uñas es una historia de 3 pasos: Cortar → Limar → Brillar. Cada paso tiene su propio momento. No te apresures con el brillo — ese es el WOW.',
        highlight: 'The shine step is your closer. Make it dramatic.',
        highlightEs: 'El paso del brillo es tu cerrador. Hazlo dramático.',
      },
      {
        type: 'script',
        text: '"Most nail files tear your nails. This one is crystal glass — it seals the edge as it files. And this buffer? 30 seconds and your nails will shine like you just had a salon manicure."',
        textEs: '"La mayoría de las limas te rompen la uña. Esta es de cristal — sella el borde mientras lima. ¿Y este pulidor? 30 segundos y tus uñas brillarán como si te hubieras hecho una manicura de salón."',
      },
      {
        type: 'tip',
        text: 'Demo on ONE nail only. Let them do the rest themselves. When they feel the difference between the done nail and the undone ones, the sale makes itself.',
        textEs: 'Haz la demo en UNA uña solamente. Deja que hagan el resto ellas mismas. Cuando sientan la diferencia entre la uña hecha y las sin hacer, la venta se hace sola.',
      },
    ],
    practicePrompt: 'Do 3 one-nail demos today. Count how many clients ask to do the rest themselves. That\'s your closing signal.',
    practicePromptEs: 'Haz 3 demos de una uña hoy. Cuenta cuántas clientes piden hacer el resto ellas mismas. Esa es tu señal de cierre.',
    xpReward: 15,
  },
  {
    id: 'dose-012',
    day: 12,
    title: 'Price Anchoring That Works',
    titleEs: 'Anclaje de Precio Que Funciona',
    category: 'Product',
    content: [
      {
        type: 'technique',
        text: 'Never lead with the price. Anchor HIGH first. Compare it to what the same thing costs in a salon or a clinic. Then your price feels like a steal.',
        textEs: 'Nunca empieces con el precio. Ancla ALTO primero. Compara tu producto con lo que cuesta lo mismo en un salón o en una clínica. Entonces tu precio parece una ganga.',
        highlight: '{currency}300 feels cheap the second after you said {currency}500.',
        highlightEs: '{currency}300 parece barato justo después de decir {currency}500.',
      },
      {
        type: 'script',
        text: '"Across Europe this same treatment goes for {currency}500 — it\'s the one that works instantly and lasts. Here it\'s {currency}300. That\'s why we sell out every single day."',
        textEs: '"Por toda Europa este mismo tratamiento cuesta {currency}500 — es el que funciona al instante y dura. Aquí son {currency}300. Por eso se agota todos los días."',
      },
      {
        type: 'tip',
        text: 'Use the phrase "investment" not "cost." Say "Your skin is an investment" not "This syringe costs {currency}300." Language shapes perception.',
        textEs: 'Usa la palabra "inversión", no "coste". Di "Tu piel es una inversión", no "Esta jeringa cuesta {currency}300". El lenguaje moldea la percepción.',
      },
    ],
    practicePrompt: 'Today, always anchor with a luxury comparison before stating your price. Track: does this increase your close rate?',
    practicePromptEs: 'Hoy, siempre ancla con una comparación de lujo antes de decir tu precio. Registra: ¿aumenta esto tu tasa de cierre?',
    xpReward: 15,
  },
  {
    id: 'dose-013',
    day: 13,
    title: 'Which Product Actually Matters',
    titleEs: 'Qué Producto Importa de Verdad',
    category: 'Product',
    content: [
      {
        type: 'mindset',
        text: 'There is a hierarchy and it is not four equal things on a tray. THE SYRINGE IS THE STAR — it is what we sell, what we focus on, what a good day is made of. The peeling is in between: a real sale, a good one, not the one the shift is measured by. The scrub, the body butter and the nail kit are BEGINNER products — they exist so you learn to sell and so the shop has some nice energy in it.',
        textEs: 'Hay una jerarquía y no son cuatro cosas iguales en una bandeja. LA JERINGA ES LA ESTRELLA — es lo que vendemos, en lo que nos centramos, de lo que está hecho un buen día. El peeling está en medio: una venta de verdad y buena, pero no es la que mide el turno. El exfoliante, la manteca corporal y el kit de uñas son productos de PRINCIPIANTE — están para que aprendas a vender y para que la tienda tenga buen rollo.',
        highlight: 'Syringe first, always. The small stuff is training wheels.',
        highlightEs: 'La jeringa primero, siempre. Lo pequeño son ruedines.',
      },
      {
        type: 'tip',
        text: 'A seller who spends a happy year selling nail kits has spent a year not learning the job. Every stop you make out on that floor is aimed at the syringe — and when someone buys a scrub, the next move is not a second jar, it is getting her into the chair for the eyes.',
        textEs: 'Un vendedor que se pasa un año la mar de contento vendiendo kits de uñas se ha pasado un año sin aprender el oficio. Cada parada que haces ahí fuera apunta a la jeringa — y cuando alguien compra un exfoliante, la siguiente jugada no es otro bote, es sentarla en la silla para los ojos.',
      },
      {
        type: 'script',
        text: '"That is you sorted for the hands. Now sit down for two seconds — because the thing I actually wanted to show you is for here." [Tap under your own eye.] "Two minutes, one eye, and you tell me."',
        textEs: '"Con eso ya tienes las manos resueltas. Ahora siéntate dos segundos — porque lo que yo te quería enseñar de verdad es para aquí." [Tócate debajo del ojo.] "Dos minutos, un ojo, y me dices."',
      },
    ],
    practicePrompt: 'Count today by syringes, not by items. How many people ended up in the chair with one eye done? That is the number that matters.',
    practicePromptEs: 'Hoy cuenta jeringas, no artículos. ¿Cuánta gente acabó en la silla con un ojo hecho? Ese es el número que importa.',
    xpReward: 15,
  },
  {
    id: 'dose-014',
    day: 14,
    title: 'Your Job Ends at the Syringe',
    titleEs: 'Tu Trabajo se Acaba en la Jeringa',
    category: 'Product',
    content: [
      {
        type: 'technique',
        text: 'She paid. There is a voice in your head saying go on then, sell her the scrub as well — kill it. An upsell in this shop is NOT you pitching a second product. It is a handover. You pass her to the upseller, who sells the red and infrared LED devices: the alternative to a facelift, the thing that gets the body making its own collagen and elastin and lifts the face.',
        textEs: 'Ha pagado. Tienes una voz en la cabeza que dice venga, véndele también el exfoliante — mátala. Una venta adicional en esta tienda NO eres tú soltando un segundo producto. Es un traspaso. Se la pasas al upseller, que vende los aparatos de LED rojo e infrarrojo: la alternativa al lifting, lo que hace que el cuerpo produzca su propio colágeno y elastina y levanta la cara.',
        highlight: 'Selling the syringe IS the win. What comes after belongs to someone else.',
        highlightEs: 'Vender la jeringa YA es la victoria. Lo que viene después es de otro.',
      },
      {
        type: 'script',
        text: '"Listen — before you go. There is a guy here, a specialist, he is only with us a short time and honestly, he is amazing at what he does. And just because you got this, I am going to spoil you with a small gift. Tell me one thing: what is more important for you, if you could get it lifted — the cheeks, or the neck? … Would that make you happy? Let me check with him, if you have one second."',
        textEs: '"Escucha — antes de que te vayas. Aquí hay un chico, un especialista, está poco tiempo con nosotros y de verdad, es un crack en lo suyo. Y solo porque te has llevado esto, te voy a mimar con un regalito. Dime una cosa: ¿qué es más importante para ti, si pudieras levantarlo — los pómulos, o el cuello? … ¿Eso te haría feliz? Déjame consultarlo con él, si tienes un segundo."',
      },
      {
        type: 'tip',
        text: 'All of it happens while she is still SITTING and still delighted. Do not stand her up, do not send her to him — you go and fetch him. You never price his product and you never do his demo for him: two sentences about him and one question. Anybody on her feet with a bag in her hand is halfway to the door.',
        textEs: 'Todo esto pasa con ella todavía SENTADA y todavía encantada. No la levantes, no la mandes a él — vas tú a buscarlo. Nunca le pones precio a lo suyo ni le haces la demo: dos frases sobre él y una pregunta. Cualquiera de pie con la bolsa en la mano ya va camino de la puerta.',
      },
    ],
    practicePrompt: 'Say the handover out loud three times before your shift until it runs without thinking. Then use it on every syringe you sell today — every single one.',
    practicePromptEs: 'Di el traspaso en voz alta tres veces antes del turno hasta que te salga solo. Y úsalo en cada jeringa que vendas hoy — en todas.',
    xpReward: 15,
  },

  // ─── DAYS 15–21: OBJECTIONS & CLOSING ───
  {
    id: 'dose-015',
    day: 15,
    title: 'Price Too High? Perfect.',
    titleEs: '¿Precio Demasiado Alto? Perfecto.',
    category: 'Closing',
    content: [
      {
        type: 'mindset',
        text: '"Too expensive" is a GOOD objection — nobody haggles over something they do not want. But hear WHERE it comes from. Almost nobody says it at the top price. By the time those words are out of her you have already walked her down, so do not spend your best line defending a number she stopped being asked for two rungs ago. Shrink the number you are STANDING on, and make the next one land like something you did for her.',
        textEs: '"Demasiado caro" es una BUENA objeción — nadie regatea por algo que no quiere. Pero escucha de DÓNDE sale. Casi nadie lo dice en el precio de arriba. Cuando te suelta eso ya la has bajado por la escalera, así que no gastes tu mejor frase defendiendo un número que dejaste de pedirle hace dos escalones. Encoge el número en el que ESTÁS, y haz que el siguiente le llegue como algo que has hecho tú por ella.',
        highlight: 'Nobody argues about money at the top of the ladder.',
        highlightEs: 'Nadie discute de dinero en lo alto de la escalera.',
      },
      {
        type: 'script',
        text: '"I completely understand. Here\'s how I think about it: this bottle lasts a full year — 52 treatments for {currency}100. That\'s under {currency}2 a week, less than one coffee. And unlike coffee, this actually makes you look younger."',
        textEs: '"Te entiendo perfectamente. Yo lo veo así: este frasco dura un año entero — 52 tratamientos por {currency}100. Son menos de {currency}2 a la semana, menos que un café. Y a diferencia del café, esto sí te quita años."',
      },
      {
        type: 'technique',
        text: 'The COST-PER-WEEK REFRAME: break the price into what it costs while it lasts — and do the sum on the rung you are STANDING on, never on one she has already refused. The Peeling at {currency}100 is a year of treatments: under {currency}2 a week. The Syringe at {currency}140 is a year too: under {currency}3 a week, a bit over {currency}2 an application. Run the same calculator on {currency}300 and you get more than the coffee you are comparing it to — and you have just played her back a number she said no to.',
        textEs: 'EL REENCUADRE DE COSTE POR SEMANA: divide el precio entre lo que dura — y haz la cuenta en el escalón donde ESTÁS, nunca en uno que ya ha rechazado. El Peeling a {currency}100 es un año de tratamientos: menos de {currency}2 a la semana. La Jeringa a {currency}140 también es un año: menos de {currency}3 a la semana, poco más de {currency}2 por aplicación. Saca la calculadora con los {currency}300 y te sale más caro que el café con el que lo comparas — y encima le repites un número al que ya te ha dicho que no.',
      },
    ],
    practicePrompt: 'When you hear "too expensive" today, use the cost-per-week reframe. Track your conversion rate on this specific objection.',
    practicePromptEs: 'Cuando escuches "demasiado caro" hoy, usa el reencuadre de coste por semana. Registra tu tasa de conversión en esa objeción concreta.',
    xpReward: 20,
  },
  {
    id: 'dose-016',
    day: 16,
    title: 'The "Need to Think" Kill Shot',
    titleEs: 'El Golpe de Gracia al "Necesito Pensarlo"',
    category: 'Closing',
    content: [
      {
        type: 'mindset',
        text: '"I need to think about it" almost always means "I\'m not convinced yet." Don\'t let them walk. Find the REAL hesitation and hit it head-on, in front of you.',
        textEs: '"Necesito pensarlo" casi siempre significa "todavía no me has convencido". No dejes que se vayan. Encuentra la duda DE VERDAD y atácala ahí mismo, delante de ti.',
        highlight: 'The real objection is hiding behind "I need to think."',
        highlightEs: 'La objeción real se esconde detrás del "necesito pensarlo."',
      },
      {
        type: 'script',
        text: '"Think about what, my love? You told me you like it. You told me you would use it. So it is the price — say it out loud and let me see what I can do for you. Because the second you walk out of that door this price is gone."',
        textEs: '"¿Pensar el qué, cariño? Me has dicho que te gusta. Me has dicho que lo usarías. Entonces es el precio — dilo en voz alta y veo qué puedo hacer por ti. Porque en cuanto salgas por esa puerta este precio ya no existe."',
      },
      {
        type: 'technique',
        text: 'The DIRECT QUESTION: Isolate the objection. Is it price? Product? Timing? Once you know, you can handle it. Until you know, you\'re guessing.',
        textEs: 'La PREGUNTA DIRECTA: Aísla la objeción. ¿Es el precio? ¿El producto? ¿El momento? En cuanto lo sabes, puedes con ella. Hasta entonces, vas adivinando.',
      },
    ],
    practicePrompt: 'Today, when someone says "I\'ll think about it," ask the direct question above. Record what the REAL objection was.',
    practicePromptEs: 'Hoy, cuando alguien diga "lo pensaré," haz la pregunta directa de arriba. Registra cuál era la objeción REAL.',
    xpReward: 20,
  },
  {
    id: 'dose-017',
    day: 17,
    title: 'The Husband Objection',
    titleEs: 'La Objeción del Marido',
    category: 'Closing',
    content: [
      {
        type: 'mindset',
        text: '"I need to ask my husband" is almost never about him. It is the politest door out of the shop there is. She already told you she likes it and that she would use it — so the decision is hers, and it happens here, in front of you.',
        textEs: '"Se lo tengo que preguntar a mi marido" casi nunca va de él. Es la puerta de salida más educada que existe. Ya te ha dicho que le gusta y que lo usaría — así que la decisión es suya, y se toma aquí, delante de ti.',
        highlight: 'Never argue with "my husband." Hand the decision back to her.',
        highlightEs: 'Nunca discutas con "mi marido". Devuélvele la decisión a ella.',
      },
      {
        type: 'script',
        text: '"Ladies\' business, my darling. He is playing golf — he is not thinking about your face. You said you like it, you said you would use it. So it is your call, not his. Spoil yourself for once. And if you really would not use it, keep your money — no hard feelings."',
        textEs: '"Cosa de mujeres, cariño. Él está con el golf — no está pensando en tu cara. Me has dicho que te gusta, me has dicho que lo usarías. Así que es cosa tuya, no suya. Date un capricho por una vez. Y si de verdad no lo vas a usar, guárdate el dinero — sin rencores."',
      },
      {
        type: 'tip',
        text: 'Never write the price down and never hand anything over for her to take to him — a price that leaves the shop leaves with the customer. And notice how the line ends: being happy to walk away from her money is part of the close, not a softener bolted on. It proves you are not desperate, and it leaves her nothing to push against.',
        textEs: 'Nunca le apuntes el precio ni le des nada para enseñárselo a él — un precio que sale de la tienda sale con la clienta. Y fíjate en cómo acaba la frase: estar dispuesta a renunciar a su dinero es parte del cierre, no un adorno. Demuestra que no vas desesperada y la deja sin nada contra lo que empujar.',
      },
    ],
    practicePrompt: 'When you hear the husband today, answer it without her leaving the shop. Say the whole line — including the part where you give her permission to keep her money. Track how many buy on the spot.',
    practicePromptEs: 'Cuando hoy te salga el marido, respóndelo sin que salga de la tienda. Di la frase entera — incluida la parte en la que le das permiso para guardarse el dinero. Registra cuántas compran en el momento.',
    xpReward: 20,
  },
  {
    id: 'dose-018',
    day: 18,
    title: 'The "Just Looking" Redirect',
    titleEs: 'El Desvío del "Solo Miro"',
    category: 'Closing',
    content: [
      {
        type: 'mindset',
        text: '"Just looking" is a reflex, not a real objection. They\'ve been trained to say it. Don\'t take it personally. Redirect with curiosity or humour.',
        textEs: '"Solo miro" es un reflejo, no una objeción real. Lo dicen de memoria. No te lo tomes como algo personal. Redirige con curiosidad o humor.',
        highlight: '"Just looking" is a habit. Break the pattern.',
        highlightEs: '"Solo miro" es un hábito. Rompe el patrón.',
      },
      {
        type: 'script',
        text: '"Perfect, looking is free! Actually, since you\'re just looking, let me show you something cool — have you ever seen the Peeling roll dead skin off your hand in seconds? It\'s really satisfying to watch."',
        textEs: '"Perfecto, ¡mirar es gratis! De hecho, como solo estás mirando, te enseño una cosa buenísima — ¿has visto cómo el Peeling saca la piel muerta de la mano en segundos? Es muy satisfactorio de ver."',
      },
      {
        type: 'technique',
        text: 'The AGREE-AND-PIVOT: Never fight "just looking." Agree enthusiastically, then pivot to something intriguing. Curiosity is stronger than resistance.',
        textEs: 'El ACUERDO-Y-GIRO: Nunca luches contra "solo miro." Acepta con entusiasmo, luego gira hacia algo intrigante. La curiosidad es más fuerte que la resistencia.',
      },
    ],
    practicePrompt: 'Count how many "just looking" responses you get today. Try the agree-and-pivot on each one. What percentage engage after the pivot?',
    practicePromptEs: 'Cuenta cuántas respuestas de "solo miro" recibes hoy. Prueba el acuerdo-y-giro en cada una. ¿Qué porcentaje se engancha después del giro?',
    xpReward: 20,
  },
  {
    id: 'dose-019',
    day: 19,
    title: 'The Budget Close',
    titleEs: 'El Cierre de Presupuesto',
    category: 'Closing',
    content: [
      {
        type: 'mindset',
        text: 'Budget is real. Respect it — and then hear what it is actually telling you. She is still standing there, and nobody haggles over something they do not want. "I am on a budget" does not get said at {currency}300; it gets said once you have already walked her down. So you are not fighting for your first price any more. You are fighting for your last one. Find the rung she can say yes to, give her a reason for it, and take the yes before she moves.',
        textEs: 'El presupuesto es real. Respétalo — y luego escucha lo que en realidad te está diciendo. Sigue ahí plantada, y nadie regatea por algo que no quiere. "Voy justa de dinero" no se dice en {currency}300; se dice cuando ya la has bajado por la escalera. Así que ya no peleas por tu primer precio. Peleas por el último. Encuentra el escalón al que puede decir que sí, dale un motivo, y llévate el sí antes de que se mueva.',
        highlight: 'Nobody says "I am on a budget" at the top price. Find the rung — do not defend the number.',
        highlightEs: 'Nadie dice "voy justa" en el precio de arriba. Busca el escalón — no defiendas el número.',
      },
      {
        type: 'script',
        text: '"I hear you, my love — so let us stop pretending we are still at the box price. [Voice down, quick look at the door] Gift off, my voucher on it: {currency}140. Sixty applications in there, one a week — that is you covered until next summer for a bit over {currency}2 a go. That is not a budget decision, that is one coffee. So — card or cash?"',
        textEs: '"Te escucho, cariño — así que dejemos de hacer como si siguiéramos en el precio de la caja. [Baja la voz, mirada rápida a la puerta] Sin regalo, con mi cupón: {currency}140. Ahí dentro hay sesenta aplicaciones, una por semana — tienes hasta el verano que viene por poco más de {currency}2 cada vez. Eso no es una decisión de presupuesto, eso es un café. Entonces, ¿tarjeta o efectivo?"',
      },
      {
        type: 'technique',
        text: 'THE LAST RUNG, WITH A REASON: a budget customer is answered by moving, not by arguing — but every move carries a reason or she learns the numbers fall whenever she pushes. Gift comes off. Voucher goes on — ONCE, at {currency}175 to {currency}140, and there is no second voucher. Below that the theatre changes: you go full market and you call a manager, because {currency}100 is not yours to give. A seller who can reach the floor on their own has no floor.',
        textEs: 'EL ÚLTIMO ESCALÓN, CON UN MOTIVO: a una clienta con presupuesto se le contesta moviéndote, no discutiendo — pero cada movimiento lleva un motivo o aprende que los números caen cada vez que empuja. Se quita el regalo. Se pone el cupón — UNA vez, de {currency}175 a {currency}140, y no hay un segundo cupón. Por debajo cambia el teatro: vas a mercado puro y llamas al encargado, porque los {currency}100 no son tuyos para darlos. Un vendedor que llega solo al fondo no tiene fondo.',
      },
    ],
    practicePrompt: 'On every budget objection today, write down which rung you were standing on when you heard it. If the answer is ever {currency}300, you moved too slowly earlier in the sale.',
    practicePromptEs: 'Hoy, en cada objeción de presupuesto, apunta en qué escalón estabas cuando la oíste. Si alguna vez la respuesta es {currency}300, es que te has movido demasiado despacio antes.',
    xpReward: 20,
  },
  {
    id: 'dose-020',
    day: 20,
    title: 'Put a Door on the Price',
    titleEs: 'Ponle Puerta al Precio',
    category: 'Closing',
    content: [
      {
        type: 'technique',
        text: 'A price with no end on it is not a price, it is a shelf. Give every offer a door: limited stock, today\'s promotion, the gift that runs out, the voucher that dies at the exit.',
        textEs: 'Un precio sin final no es un precio, es una estantería. Ponle puerta a cada oferta: stock limitado, la promoción de hoy, el regalo que se acaba, el cupón que se muere en la salida.',
        highlight: 'A deadline creates a decision. No deadline creates a maybe.',
        highlightEs: 'Una fecha límite crea una decisión. Sin fecha límite solo hay un "ya veré".',
      },
      {
        type: 'script',
        text: '"Just so you know — today we have a gift with purchase while supplies last. It\'s the Dead Sea Body Scrub, and we only have about 10 left. I don\'t want you to miss out!"',
        textEs: '"Para que sepas — hoy tenemos un regalo con compra mientras duren las existencias. Es el Exfoliante del Mar Muerto, y solo nos quedan unos 10. ¡No quiero que te lo pierdas!"',
      },
      {
        type: 'tip',
        text: 'Say it straight and move on: "Only today." "Two left." "This voucher dies the second you walk out of here." Straight face, half a smile — and drop it the moment they say no. Never stretch it into "come back this week" — that is not urgency, that is you showing them the door.',
        textEs: 'Dilo sin más y sigue: "Solo hoy." "Me quedan dos." "Este cupón se muere en cuanto sales por esa puerta." Cara seria, media sonrisa — y lo sueltas en cuanto te digan que no. Nunca lo estires a "vuelve esta semana" — eso no es urgencia, es enseñarle la puerta.',
      },
    ],
    practicePrompt: 'Put a door on every price you say today. Be specific about what runs out. Track your close rate against the closes where you left the price open.',
    practicePromptEs: 'Ponle puerta a cada precio que digas hoy. Sé concreta con lo que se acaba. Compara tu tasa de cierre con los cierres en los que dejaste el precio abierto.',
    xpReward: 20,
  },
  {
    id: 'dose-021',
    day: 21,
    title: 'The Voucher Close',
    titleEs: 'El Cierre de Vale',
    category: 'Closing',
    content: [
      {
        type: 'technique',
        text: 'There is no voucher in a drawer. You invent it on the spot, because you need a reason to come down and she needs a second to breathe. It is theatre, and it is a final step, never your opening move.',
        textEs: 'No hay ningún cupón en ningún cajón. Te lo inventas en el momento, porque tú necesitas una excusa para bajar y ella necesita un segundo para respirar. Es teatro, y es el paso final, nunca tu apertura.',
        highlight: 'Save the voucher for the final push. Don\'t lead with it.',
        highlightEs: 'Guarda el cupón para el empujón final. No empieces con él.',
      },
      {
        type: 'script',
        text: '"You know what — I have got one voucher left and I am using it on you. That is {currency}175 down to {currency}140. But you are being greedy now, eh? No gift at that price. And it is gone the second you walk out of here."',
        textEs: '"¿Sabes qué? Me queda un cupón y lo gasto contigo. Eso deja los {currency}175 en {currency}140. Pero qué morro tienes, ¿eh? A ese precio no va regalo. Y se muere en cuanto salgas por esa puerta."',
      },
      {
        type: 'tip',
        text: 'Personalise it — "I\'m going to give YOU..." feels special, "we have a discount" feels cheap and common. And it never leaves the shop: no voucher handed over, none saved for next time, none waiting at the counter. A voucher that walks out of the door is just a customer walking out of the door with extra steps.',
        textEs: 'Personalízalo — "te lo voy a hacer A TI" suena especial, "tenemos un descuento" suena barato y común. Y nunca sale de la tienda: ni se lo das, ni se lo guardas para otro día, ni le espera en caja. Un cupón que sale por la puerta es una clienta saliendo por la puerta con pasos de más.',
      },
    ],
    practicePrompt: 'Use the voucher close on 2 hesitant customers today — invented on the spot, with the greedy line and the smile. Track how many said yes right there.',
    practicePromptEs: 'Usa el cierre con cupón con 2 clientas indecisas hoy — inventado en el momento, con la frase del morro y la sonrisa. Registra cuántas dijeron que sí ahí mismo.',
    xpReward: 20,
  },

  // ─── DAYS 22–28: ADVANCED ───
  {
    id: 'dose-022',
    day: 22,
    title: 'The Couples Approach',
    titleEs: 'El Acercamiento a Parejas',
    category: 'Advanced',
    content: [
      {
        type: 'technique',
        text: 'Approaching couples? ALWAYS engage the WOMAN first. Make eye contact with her, compliment her. The man is an observer, not the target. Win her, and he follows.',
        textEs: '¿Acercándote a parejas? SIEMPRE engancha a la MUJER primero. Mírala a los ojos y hazle un cumplido. El hombre es un observador, no el objetivo. Gánala a ella, y él sigue.',
        highlight: 'Engage the woman. The man will follow her lead.',
        highlightEs: 'Engancha a la mujer. El hombre seguirá su ejemplo.',
      },
      {
        type: 'script',
        text: '"Hi there! I have to say — your partner is very lucky to be with someone who takes such good care of their skin. I\'m [Name], and I work with Dead Sea minerals. Can I show you both something really cool?"',
        textEs: '"¡Hola! Te lo tengo que decir — tu pareja tiene suerte de estar con alguien que se cuida así la piel. Soy [Nombre] y trabajo con minerales del Mar Muerto. ¿Os enseño una cosa? Es una pasada."',
      },
      {
        type: 'tip',
        text: 'If the man seems impatient, include him with a quick line: "This takes 30 seconds, and I think she\'ll love it." Most men will wait 30 seconds for their partner.',
        textEs: 'Si el hombre parece impaciente, métele una frase rápida: "Son 30 segundos, y creo que a ella le va a encantar." La mayoría de los hombres esperan 30 segundos por su pareja.',
      },
    ],
    practicePrompt: 'Approach 3 couples today. Always start with the woman. Track: does the man wait, walk away, or engage? What patterns do you see?',
    practicePromptEs: 'Acércate a 3 parejas hoy. Siempre empieza con la mujer. Registra: ¿el hombre espera, se va, o se engancha? ¿Qué patrones ves?',
    xpReward: 25,
  },
  {
    id: 'dose-023',
    day: 23,
    title: 'Selling to Men',
    titleEs: 'Venderle a un hombre',
    category: 'Advanced',
    content: [
      {
        type: 'mindset',
        text: 'Men buy differently than women. They want SPEED, EFFICIENCY, and RESULTS. No fluff. No long demos. Get to the point. Show the product, show the result, name the price.',
        textEs: 'Los hombres compran de otra manera que las mujeres. Quieren VELOCIDAD, EFICIENCIA, y RESULTADOS. Sin relleno. Sin demos largas. Ve al grano. Muestra el producto, muestra el resultado, di el precio.',
        highlight: 'Men want the headline, not the whole article.',
        highlightEs: 'Los hombres quieren el titular, no todo el artículo.',
      },
      {
        type: 'script',
        text: '"Sir, 30 seconds. This Scrub removes dead skin in one use. Your hands will feel smoother than they have in years. It\'s {currency}60, or {currency}60 for two if you take a Body Butter with it. Want to try it?"',
        textEs: '"Jefe, 30 segundos. Este Scrub quita la piel muerta a la primera. Tus manos van a quedar más suaves que en años. Son {currency}60, o {currency}60 por dos si te llevas un Body Butter también. ¿Lo pruebas?"',
      },
      {
        type: 'tip',
        text: 'The MAGIC WORD for men: "easy." Men love things that are easy. "Easy to use." "Easy application." "5 minutes, done." Use the E-word.',
        textEs: 'La PALABRA MÁGICA para hombres: "fácil." A los hombres les encanta lo fácil. "Fácil de usar." "Aplicación fácil." "5 minutos, listo." Usa la palabra E.',
      },
    ],
    practicePrompt: 'Approach 2 men today using the fast, direct method. Keep it under 60 seconds. Track your success rate.',
    practicePromptEs: 'Acércate a 2 hombres hoy usando el método rápido y directo. Que no pase de 60 segundos. Registra tu tasa de éxito.',
    xpReward: 25,
  },
  {
    id: 'dose-024',
    day: 24,
    title: 'Group Stopping Power',
    titleEs: 'Poder de Parada en Grupo',
    category: 'Advanced',
    content: [
      {
        type: 'technique',
        text: 'COUNT THE HEADS FIRST, because the number changes the whole play. Three or fewer: do all of them, no question. Four or more: you take ONE volunteer and that is it — you only open it up to the others if you can SEE real excitement coming off them.',
        textEs: 'CUENTA LAS CABEZAS PRIMERO, porque el número te cambia la jugada entera. Tres o menos: se lo haces a todas, sin discusión. Cuatro o más: coges a UNA voluntaria y ya está — solo abres al resto si VES entusiasmo de verdad saliendo de ellas.',
        highlight: 'Three or fewer, all of them. Four or more, one volunteer.',
        highlightEs: 'Tres o menos, todas. Cuatro o más, una voluntaria.',
      },
      {
        type: 'script',
        text: '"Hi ladies! I have to stop you — I just need ONE of you to try this, but I bet you\'ll ALL want one after you see it. Who\'s the bravest?"',
        textEs: '"¡Hola chicas! Os tengo que parar — solo necesito que lo pruebe UNA, pero os apuesto a que lo vais a querer TODAS en cuanto lo veáis. ¿Quién es la más valiente?"',
      },
      {
        type: 'tip',
        text: 'Doing everybody in a big group and selling to nobody is the worst feeling in this job — twenty minutes of your shift gone and a queue of people who have had their free treatment. So with four or more you hold the rest back on purpose. Let them watch. Wanting a turn is what makes them buy.',
        textEs: 'Hacérselo a todas en un grupo grande y no venderle a ninguna es la peor sensación de este trabajo — veinte minutos de turno tirados y una fila de gente que ya ha tenido su tratamiento gratis. Así que con cuatro o más te guardas al resto a propósito. Que miren. Las ganas de que les toque es lo que hace que compren.',
      },
    ],
    practicePrompt: 'Next group you stop, count them before you open your mouth. Three or fewer, all of them. Four or more, one volunteer and hold the line unless the excitement is obvious.',
    practicePromptEs: 'En el próximo grupo que pares, cuéntalas antes de abrir la boca. Tres o menos, todas. Cuatro o más, una voluntaria y aguanta salvo que el entusiasmo sea evidente.',
    xpReward: 25,
  },
  {
    id: 'dose-025',
    day: 25,
    title: 'Body Language Mastery',
    titleEs: 'Dominio del Lenguaje Corporal',
    category: 'Advanced',
    content: [
      {
        type: 'technique',
        text: 'Master readers of body language outsell everyone. Learn the signals: Leaning in = interested. Crossed arms = guarded. Touching face = considering. Stepping back = objections coming.',
        textEs: 'Los maestros en leer lenguaje corporal venden más que todos. Aprende las señales: Inclinarse = interesada. Brazos cruzados = a la defensiva. Tocarse la cara = se lo está pensando. Dar un paso atrás = vienen objeciones.',
        highlight: 'Read their body before they speak.',
        highlightEs: 'Lee su cuerpo antes de que hablen.',
      },
      {
        type: 'tip',
        text: 'MIRROR their body language subtly. If they lean in, you lean in. If they speak softly, lower your voice. Mirroring builds unconscious rapport.',
        textEs: 'REFLEJA su lenguaje corporal sutilmente. Si se inclinan, tú te inclinas. Si hablan bajo, baja tu voz. Imitarla crea complicidad sin que se dé cuenta.',
      },
      {
        type: 'technique',
        text: 'The STEP-BACK TEST: If you lean back slightly and they lean forward to follow, they\'re hooked. If they also lean back, you\'re losing them. Adjust immediately.',
        textEs: 'La PRUEBA DE RETROCESO: Si te inclinas hacia atrás ligeramente y ellos se inclinan hacia adelante para seguir, están enganchados. Si también se inclinan hacia atrás, los estás perdiendo. Ajusta inmediatamente.',
      },
    ],
    practicePrompt: 'Today, focus ONLY on body language. Don\'t listen to words — watch movements. Note 5 body language signals you observe and what they meant.',
    practicePromptEs: 'Hoy céntrate SOLO en el lenguaje corporal. No escuches las palabras — observa los movimientos. Anota 5 señales de lenguaje corporal que observes y qué significaban.',
    xpReward: 25,
  },
  {
    id: 'dose-026',
    day: 26,
    title: 'Spotting Buying Signals',
    titleEs: 'Detectando Señales de Compra',
    category: 'Advanced',
    content: [
      {
        type: 'technique',
        text: 'Buying signals are subtle but unmistakable once you know them. The question "How much is it?" is a BUYING signal, not an objection. They\'re already imagining owning it.',
        textEs: 'Las señales de compra son sutiles pero inconfundibles una vez que las conoces. La pregunta "¿Cuánto cuesta?" es una señal de COMPRA, no una objeción. Ya se están imaginando que es suyo.',
        highlight: '"How much?" means "I want it." Close immediately.',
        highlightEs: '"¿Cuánto?" significa "Lo quiero." Cierra inmediatamente.',
      },
      {
        type: 'tip',
        text: 'Other buying signals: asking about ingredients, checking the box, reading the label, asking "Do you take card?", saying "My sister would love this too."',
        textEs: 'Otras señales de compra: preguntar por los ingredientes, mirar la caja, leer la etiqueta, preguntar "¿Aceptan tarjeta?", decir "A mi hermana también le encantaría esto."',
      },
      {
        type: 'script',
        text: 'When you hear a buying signal, STOP TALKING. Transition immediately to the close: "Shall I wrap this up for you?" or "Would you like the gift bag with that?"',
        textEs: 'Cuando escuches una señal de compra, DEJA DE HABLAR. Pasa directamente al cierre: "¿Te lo envuelvo?" o "¿Quieres la bolsa de regalo con eso?"',
      },
    ],
    practicePrompt: 'Count buying signals you spot today. For each one, close immediately. Track your close rate on buying-signal responses vs. regular closes.',
    practicePromptEs: 'Cuenta las señales de compra que detectes hoy. Por cada una, cierra inmediatamente. Registra tu tasa de cierre en respuestas con señal de compra vs. cierres normales.',
    xpReward: 25,
  },
  {
    id: 'dose-027',
    day: 27,
    title: 'The Silent Close',
    titleEs: 'El Cierre en Silencio',
    category: 'Advanced',
    content: [
      {
        type: 'technique',
        text: 'The most powerful close is SILENCE. After you present the offer, STOP TALKING. The first person to speak loses. Most salespeople talk themselves OUT of sales. Don\'t.',
        textEs: 'El cierre más poderoso es el SILENCIO. Después de presentar la oferta, DEJA DE HABLAR. La primera persona en hablar pierde. La mayoría de los vendedores hablan para PERDER ventas. No lo hagas.',
        highlight: 'Silence is a closing tool. Use it.',
        highlightEs: 'El silencio es una herramienta de cierre. Úsala.',
      },
      {
        type: 'script',
        text: 'After the two offers: "So — would you rather have the 30% off at {currency}210 with a free gift, or the two syringes for {currency}300?" [STOP. SMILE. WAIT.]',
        textEs: 'Después de las dos ofertas: "Entonces — ¿prefieres el 30% de descuento a {currency}210 con un regalo, o las dos jeringas por {currency}300?" [PARA. SONRÍE. ESPERA.]',
      },
      {
        type: 'mindset',
        text: 'Silence feels uncomfortable — FOR YOU. But for the customer, it\'s thinking time. They\'re weighing the decision. Every word you add after the close weakens your position.',
        textEs: 'El silencio incomoda — A TI. Pero para el cliente, es tiempo de pensar. Están sopesando la decisión. Cada palabra que añadas después del cierre te debilita.',
      },
    ],
    practicePrompt: 'Practice the silent close 3 times today. After stating the price and offer, count to 10 silently. Note what happens in the silence.',
    practicePromptEs: 'Practica el cierre en silencio 3 veces hoy. Después de decir el precio y oferta, cuenta hasta 10 en silencio. Nota qué pasa en el silencio.',
    xpReward: 25,
  },
  {
    id: 'dose-028',
    day: 28,
    title: 'There Is No Tomorrow',
    titleEs: 'No Hay un Mañana',
    category: 'Advanced',
    content: [
      {
        type: 'mindset',
        text: 'There is no such thing as a callback. If they walk out, they are not coming back — treat every exit as a lost sale, because that is what it is. The ten seconds you have left in front of them are worth more than any promise about next week.',
        textEs: 'No existe eso de que vuelvan. Si salen por la puerta, no vuelven — trata cada salida como una venta perdida, porque eso es lo que es. Los diez segundos que te quedan delante de ellos valen más que cualquier promesa sobre la semana que viene.',
        highlight: 'A "maybe" heading for the door is a no. Answer it now.',
        highlightEs: 'Un "ya veré" que va hacia la puerta es un no. Respóndelo ahora.',
      },
      {
        type: 'script',
        text: '"One second before you go. You said you like it. You said you would use it. So go on — tell me your number. Say it out loud." [Let them say it. Then move ONE rung, and put something small in the bag.]',
        textEs: '"Un segundo antes de irte. Me has dicho que te gusta. Me has dicho que lo usarías. Venga — dime tu número. Dilo en voz alta." [Deja que lo diga. Luego bajas UN escalón y le metes algo pequeño en la bolsa.]',
      },
      {
        type: 'tip',
        text: 'Never hand over a reason to return — no card, no sample put aside, no gift reserved, no price written down. All of that is a lost sale with extra steps. Go A to Z first: the two yeses again, one more rung, one more thing in the bag. Only when you have honestly given it everything do you let them go — smiling, warm, empty-handed.',
        textEs: 'Nunca le des un motivo para volver — ni tarjeta, ni muestra apartada, ni regalo reservado, ni el precio apuntado. Todo eso es una venta perdida con pasos de más. Primero de la A a la Z: los dos síes otra vez, un escalón más, algo más en la bolsa. Solo cuando de verdad lo has dado todo los dejas marchar — sonriendo, con buena cara y con las manos vacías.',
      },
    ],
    practicePrompt: 'Today, when someone says they will come back, do not agree with them. Answer it and go one more rung, right there. Count how many you close on the spot.',
    practicePromptEs: 'Hoy, cuando alguien te diga que ya volverá, no le des la razón. Respóndelo y baja un escalón más, ahí mismo. Cuenta cuántas cierras en el momento.',
    xpReward: 25,
  },

  // ─── DAYS 29–31: MINDSET & HABITS ───
  {
    id: 'dose-029',
    day: 29,
    title: 'The 5-Minute Morning Routine',
    titleEs: 'La Rutina Matutina de 5 Minutos',
    category: 'Mindset',
    content: [
      {
        type: 'mindset',
        text: 'Champions don\'t wing it. The best salespeople in the world have a pre-shift routine. 5 minutes is all it takes to transform your entire day.',
        textEs: 'Los campeones no improvisan. Los mejores vendedores del mundo tienen una rutina pre-turno. 5 minutos es todo lo que necesitas para transformar todo tu día.',
        highlight: '5 minutes of prep beats 8 hours of winging it.',
        highlightEs: '5 minutos de preparación superan 8 horas de improvisación.',
      },
      {
        type: 'technique',
        text: 'THE POWER 5: (1) One deep breath. (2) One positive affirmation. (3) One goal for today. (4) One person you\'ll make smile. (5) One reason you\'re grateful to be here.',
        textEs: 'EL PODER 5: (1) Una respiración profunda. (2) Una afirmación positiva. (3) Una meta para hoy. (4) Una persona que harás sonreír. (5) Una razón por la que estás agradecida de estar aquí.',
      },
      {
        type: 'tip',
        text: 'Write your affirmation on your phone\'s lock screen. Every time you check your phone, you see it. Repetition creates belief.',
        textEs: 'Escribe tu afirmación en la pantalla de bloqueo del móvil. Cada vez que mires el móvil, la verás. La repetición crea creencia.',
      },
    ],
    practicePrompt: 'Do the Power 5 every morning this week. Pick your affirmation now and set it as your lock screen. How does it feel after 3 days?',
    practicePromptEs: 'Haz el Poder 5 cada mañana esta semana. Elige tu afirmación ahora y ponla como pantalla de bloqueo. ¿Cómo te sientes después de 3 días?',
    xpReward: 30,
  },
  {
    id: 'dose-030',
    day: 30,
    title: 'Managing Your Energy',
    titleEs: 'Gestiona tu energía',
    category: 'Mindset',
    content: [
      {
        type: 'mindset',
        text: 'Sales is an energy game. You can\'t be at 100% all day — and that\'s okay. The pros know how to manage their energy like a battery: sprint, recharge, sprint again.',
        textEs: 'Las ventas son un juego de energía. No puedes estar al 100% todo el día — y eso está bien. Los profesionales saben gestionar su energía como una batería: sprint, recarga, sprint de nuevo.',
        highlight: 'Energy management > Time management.',
        highlightEs: 'Gestión de energía > Gestión de tiempo.',
      },
      {
        type: 'technique',
        text: 'THE 90-MINUTE RULE: Work in focused 90-minute blocks. Then take a 10-minute break. Walk, hydrate, breathe. You\'ll outperform someone who works nonstop for 8 hours.',
        textEs: 'LA REGLA DE 90 MINUTOS: Trabaja en bloques de 90 minutos de concentración. Luego tómate 10 minutos de descanso. Camina, hidrátate, respira. Superarás a alguien que trabaja sin parar 8 horas.',
      },
      {
        type: 'tip',
        text: 'HYDRATION = ENERGY. Dehydration feels like fatigue. Drink water every hour. Keep a bottle visible. Your energy, mood, and voice all improve when you\'re hydrated.',
        textEs: 'HIDRATACIÓN = ENERGÍA. La deshidratación parece cansancio. Bebe agua cada hora. Mantén una botella visible. Tu energía, estado de ánimo y voz mejoran cuando estás hidratada.',
      },
    ],
    practicePrompt: 'Try the 90-minute rule today. Set a timer. Work hard for 90 minutes, then take a real 10-minute break. Compare your results vs. a nonstop day.',
    practicePromptEs: 'Prueba la regla de 90 minutos hoy. Pon un temporizador. Trabaja a tope 90 minutos y luego tómate un descanso de verdad de 10. Compara tus resultados vs. un día sin parar.',
    xpReward: 30,
  },
  {
    id: 'dose-031',
    day: 31,
    title: 'Goal Setting That Works',
    titleEs: 'Metas Que Funcionan',
    category: 'Mindset',
    content: [
      {
        type: 'mindset',
        text: '"Sell more" is not a goal. "Make 30 stops today, bring 10 inside, close 3 sales" is a goal. Specific, measurable, actionable. Write it down. Say it out loud.',
        textEs: '"Vender más" no es una meta. "Hacer 30 paradas hoy, meter a 10 dentro, cerrar 3 ventas" es una meta. Específica, medible, accionable. Escríbela. Dila en voz alta.',
        highlight: 'Specific goals create specific results.',
        highlightEs: 'Metas específicas crean resultados específicos.',
      },
      {
        type: 'technique',
        text: 'THE DAILY 3: Every morning, write down 3 things: (1) Stops goal. (2) Inside goal. (3) Sales goal. Review at end of day. Adjust tomorrow based on today.',
        textEs: 'EL DIARIO 3: Cada mañana, escribe 3 cosas: (1) Meta de paradas. (2) Meta de gente dentro. (3) Meta de ventas. Revisa al final del día. Ajusta mañana basándote en hoy.',
      },
      {
        type: 'mindset',
        text: 'Your goals are a promise to yourself. Keep that promise. Every day you hit your goals, you build the identity of someone who follows through. That identity is your superpower.',
        textEs: 'Tus metas son una promesa a ti misma. Mantén esa promesa. Cada día que cumples tus metas, construyes la identidad de alguien que cumple. Esa identidad es tu superpoder.',
      },
    ],
    practicePrompt: 'Write your Daily 3 right now. Put it somewhere you\'ll see all day. At end of shift, score yourself 1-3 on each. What will you adjust tomorrow?',
    practicePromptEs: 'Escribe tu Diario 3 ahora mismo. Ponlo donde lo verás todo el día. Al final del turno, puntúate del 1 al 3 en cada una. ¿Qué ajustarás mañana?',
    xpReward: 30,
  },
];

export const focusTechniques = [
  { id: 'ft-1', label: 'Energy First — Bring the fire on every approach', labelEs: 'La energía primero — trae el fuego en cada acercamiento' },
  { id: 'ft-2', label: 'Specific Compliments Only — Details stop people', labelEs: 'Cumplidos Específicos — Los detalles detienen a la gente' },
  { id: 'ft-3', label: 'Silent Close — State the offer, then say nothing', labelEs: 'Cierre en Silencio — Di la oferta, luego no digas nada' },
  { id: 'ft-4', label: 'Cost-Per-Day Reframe — Make price feel tiny', labelEs: 'Reencuadre de coste por día — haz que el precio parezca minúsculo' },
  { id: 'ft-5', label: 'Agree-and-Pivot — Turn objections into engagement', labelEs: 'Acuerdo-y-Giro — convierte las objeciones en conversación' },
];

export function getTodaysDose(): DailyDose {
  const today = new Date();
  const dayOfMonth = today.getDate();
  const index = (dayOfMonth - 1) % dailyDoses.length;
  return dailyDoses[index];
}

export function getDailyDoseByDay(day: number): DailyDose | undefined {
  return dailyDoses.find((d) => d.day === day);
}

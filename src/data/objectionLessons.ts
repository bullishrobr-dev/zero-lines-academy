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
    subtitle: "A late-ladder objection — the fight is for the last price",
    subtitleEs: "Objeción de final de escalera — la pelea es por el último precio",
    duration: "4 min",
    icon: "Wallet",
    order: 1,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "Where you actually are when you hear this",
        textEs: "Dónde estás de verdad cuando oyes esto",
      },
      {
        type: "paragraph",
        text: "Nobody says \"I'm on a budget\" at the first number. By the time those words come out you have already said {currency}300, you have probably put {currency}210 with the gift on the table, and you may well have taken the gift back off and shown her {currency}175. She is not arguing with your opening price — she heard it and walked straight past it. What she is doing now is telling you roughly where she can land, without saying a number out loud. That is information, and it is the best thing anybody has handed you all day.",
        textEs: "Nadie dice \"ando corta de dinero\" con el primer número. Cuando le salen esas palabras ya le has dicho {currency}300, seguramente le has puesto encima de la mesa los {currency}210 con el regalo, y a lo mejor ya le has quitado el regalo y le has enseñado los {currency}175. No está discutiendo tu precio de salida — lo ha oído y ha pasado de largo. Lo que hace ahora es decirte más o menos dónde puede aterrizar, sin decir un número en voz alta. Eso es información, y es lo mejor que te ha dado nadie en todo el día.",
      },
      {
        type: "keypoint",
        text: "So do not spend your best line defending {currency}300. She has heard {currency}300. She said no to {currency}300. If you are fighting somebody over the price, you are not at the top of the ladder any more — you are near the bottom of it or on your way there, and the fight is for your LAST price, not your first one.",
        textEs: "Así que no gastes tu mejor frase defendiendo los {currency}300. Ya ha oído los {currency}300. Ya ha dicho que no a los {currency}300. Si estás peleando con alguien por el precio, ya no estás arriba de la escalera — estás abajo o vas de camino, y la pelea es por tu ÚLTIMO precio, no por el primero.",
      },
      {
        type: "quote",
        text: "Your job is not to defend a number. It is to make the last number land like something you did for her — and to get the yes before she moves.",
        textEs: "Tu trabajo no es defender un número. Es que el último número le llegue como algo que has hecho por ella — y llevarte el sí antes de que se mueva.",
      },
      {
        type: "subheader",
        text: "What she has actually told you",
        textEs: "Lo que te ha dicho en realidad",
      },
      {
        type: "bullets",
        items: [
          "She is still standing there. Nobody haggles over something they do not want, so those words only ever come out of a woman who has already decided she likes it.",
          "\"Budget\" is a number she has not said out loud. It means \"not that, but something\" — your job is to find the rung, not to argue her back up to the one she has already refused.",
          "Handing money over feels like losing something she already has, and what she gets back is a maybe. That is the whole reason \"it lasts a year\" works: it turns one painful number into a small one she pays once and then forgets.",
          "The number she is holding yours up against is nothing at all — she came in here to buy nothing. Put a real one beside it: the {currency}500 the same syringe costs in a shop back home, and everything she will hand over for creams that do nothing between now and next summer.",
        ],
        itemsEs: [
          "Sigue ahí plantada. Nadie regatea por algo que no quiere, así que esas palabras solo le salen a una mujer que ya ha decidido que le gusta.",
          "\"Presupuesto\" es un número que no ha dicho en voz alta. Significa \"eso no, pero algo sí\" — tu trabajo es encontrar el escalón, no discutir para subirla otra vez al que ya ha rechazado.",
          "Soltar el dinero se siente como perder algo que ya tiene, y lo que recibe a cambio es un quizá. Por eso funciona lo de \"te dura un año\": convierte un número que duele en uno pequeño que paga una vez y se olvida.",
          "El número con el que compara el tuyo es cero — ha entrado aquí a no comprar nada. Ponle uno de verdad al lado: los {currency}500 que cuesta esta misma jeringa en una tienda de su país, y todo lo que va a soltar en cremas que no hacen nada de aquí al verano que viene.",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: The rung with a reason (short)",
        textEs: "Guion 1: El escalón con motivo (corto)",
      },
      {
        type: "script",
        text: "YOU: \"On a budget — alright, talk to me, I like you.\" [Half a smile. Do not flinch, do not apologise for your own number, and do NOT move yet] \"Look, I have already taken the gift off to get you to {currency}175, so I am not exactly miles away as it is. That is a year of your face, that one — sixty goes in there, one a week. Works out about {currency}3 a week.\" [Now stop talking. Let it sit. She has said one sentence about money; if you drop a rung on one sentence she learns the numbers fall whenever she mentions her budget, and she will mention it again]",
        textEs: "TÚ: \"Que vas justa — vale, háblame, que me caes bien.\" [Media sonrisa. No te encojas, no pidas perdón por tu propio número, y NO te muevas todavía] \"Mira, ya te he quitado el regalo para dejarte en {currency}175, o sea que tampoco ando tan lejos. Y eso es un año de tu cara — sesenta veces ahí dentro, una por semana. Te sale como a {currency}3 la semana.\" [Y ahora te callas. Déjalo ahí. Ha dicho una frase sobre dinero; si le bajas un escalón por una frase, aprende que los números caen cada vez que menciona su presupuesto, y lo va a mencionar otra vez]",
      },
      {
        type: "subheader",
        text: "Script 2: The maths at the rung you are standing on (medium)",
        textEs: "Guion 2: La cuenta en el escalón donde estás (medio)",
      },
      {
        type: "script",
        text: "YOU: \"Come here a second — let me show you why your budget is not the problem you think it is.\" [Put the syringe back in her hand and leave it there] \"Forget what it says on the box. You are at {currency}140 with me. Gift off, voucher on, and that is not a number I say to everybody who walks past.\" [Now the sum, slowly] \"Sixty applications in there, one a week. That is you covered until next summer. So it is a bit over {currency}2 a go. Under {currency}3 a week. That is not a budget decision, my love, that is one coffee a week — except this one takes ten years off the side of your face.\" [Then stop talking. Let her do the sum on her own] \"So — card or cash?\"",
        textEs: "TÚ: \"Ven un segundo — deja que te enseñe por qué lo del presupuesto no es el problema que te crees.\" [Vuelve a ponerle la jeringa en la mano y déjasela ahí] \"Olvídate de lo que pone en la caja. Conmigo estás en {currency}140. Sin regalo, con el cupón, y ese no es un número que le diga a todo el que pasa.\" [Ahora la cuenta, despacio] \"Ahí dentro hay sesenta aplicaciones, una por semana. Tienes hasta el verano que viene. O sea, poco más de {currency}2 cada vez. Menos de {currency}3 a la semana. Eso no es una decisión de presupuesto, cariño, eso es un café a la semana — solo que este te quita diez años de este lado de la cara.\" [Y ahora te callas. Deja que eche ella la cuenta] \"Entonces, ¿tarjeta o efectivo?\"",
      },
      {
        type: "subheader",
        text: "Script 3: The floor, and how slowly you get there (detailed)",
        textEs: "Guion 3: El suelo, y lo despacio que se llega (detallado)",
      },
      {
        type: "script",
        text: "YOU: \"You are killing me here.\" [Hands up, big laugh, not a trace of an edge in it] \"I have taken the gift off, I have put my voucher on you, and you are still coming at me. Go on then — say your number. Out loud.\" [Let her say it. Do NOT answer it. Look at the syringe. Look at the door. Breathe out like it costs you something] \"Ooof. You are a hard one, you.\" [Hold it. Count to three in your head — the waiting is the whole trick, and most sellers cannot do it] \"Right. My last customer only took one, so I have got a little bit of room today, and I am going to use it on you.\" [Voice right down, lean in, this bit is a secret] \"{currency}100. That is the number. There is nothing underneath it, I have not said it out loud to anybody else today, and you are not telling a soul what you paid.\" [Straight back up, normal voice, big smile, hand already going for the bag] \"And look at what you are actually buying — a year of it, sixty goes, under {currency}2 each. If you genuinely would not use it, keep your money and no hard feelings. But you have not put that mirror down since you sat in my chair. Card or cash, my darling?\"",
        textEs: "TÚ: \"Me estás matando.\" [Manos arriba, risa grande, sin una pizca de mala leche] \"Te he quitado el regalo, te he gastado el cupón, y todavía vienes a por mí. Venga — dime tu número. En voz alta.\" [Deja que lo diga. NO lo contestes. Mira la jeringa. Mira a la puerta. Suelta el aire como si te doliera] \"Buf. Menuda eres tú.\" [Aguanta. Cuenta hasta tres por dentro — la espera es todo el truco, y casi ningún vendedor sabe hacerla] \"Vale. Mi última clienta se llevó solo una, así que hoy tengo un poquito de margen y lo voy a gastar contigo.\" [Baja la voz del todo, acércate, esto es un secreto] \"{currency}100. Ese es el número. Debajo no hay nada, no se lo he dicho en voz alta a nadie más hoy, y tú no le cuentas a nadie lo que has pagado.\" [Vuelve arriba, voz normal, sonrisa grande, la mano ya buscando la bolsa] \"Y mira lo que te llevas de verdad — un año entero, sesenta veces, menos de {currency}2 cada una. Si de verdad no lo fueras a usar, guárdate el dinero y sin rencores. Pero es que no has soltado el espejo desde que te has sentado en mi silla. ¿Tarjeta o efectivo, cariño?\"",
      },
      {
        type: "subheader",
        text: "What NOT to Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Open at the bottom because she looks like she is on a budget. Trainers, one carrier bag, a pushchair — none of that tells you what is in her account, and the woman who spends the most on you today will not look like it. Start at the top and walk down, every single time. Guess her wallet off her shoes and you will never find out what she would have paid.",
          "Drop before she has asked. A price that falls on its own was never a price. Let her push first — and make her push twice before you move once.",
          "Drop with nothing attached to it. Every rung needs a pause, a face and a reason: the gift coming off, the voucher, my last customer only took one. If the number simply falls, you have told her you were making it up, and now she will lean on you until the floor gives way.",
          "Get to {currency}100 in ten seconds to be helpful. She will not believe it is your last price, and she is right not to. The floor is a floor — nobody gets there by asking twice.",
          "Point your last customer the wrong way. \"The lady before you took three!\" makes her feel behind. Turn her round — \"my last one only took one, so I have got a bit of room for you\" — and the same story hands her something instead of nagging her. Give.",
          "Send her off to add it up. There is nothing to add up and nowhere to do it but here. A budget gets answered with a number, in front of you, today — never at the door.",
        ],
        itemsEs: [
          "Abrir por abajo porque tiene pinta de ir justa. Zapatillas, una sola bolsa, un carrito de bebé — nada de eso te dice lo que tiene en la cuenta, y la que más se te gaste hoy no lo va a parecer. Empieza arriba y baja andando, siempre. Adivínale la cartera por los zapatos y no sabrás nunca lo que habría pagado.",
          "Bajar antes de que te lo pida. Un precio que cae solo nunca fue un precio. Que empuje ella primero — y que empuje dos veces antes de que tú te muevas una.",
          "Bajar sin nada pegado al número. Cada escalón necesita una pausa, una cara y un motivo: que sale el regalo, que hay cupón, que mi última clienta se llevó solo una. Si el número cae y ya está, le has dicho que te lo estabas inventando, y ahora te va a apretar hasta que el suelo se hunda.",
          "Plantarte en {currency}100 en diez segundos por hacer el favor. No se va a creer que es tu último precio, y hace bien. El suelo es el suelo — ahí no se llega por pedirlo dos veces.",
          "Usar a tu última clienta al revés. \"¡La señora de antes se llevó tres!\" la deja por detrás. Dale la vuelta — \"la última se llevó solo una, así que tengo un poco de margen para ti\" — y la misma historia le regala algo en vez de darle la lata. Regala.",
          "Mandarla a echar cuentas por ahí. No hay nada que calcular y no hay otro sitio para hacerlo que este. Un presupuesto se contesta con un número, delante de ti, hoy — nunca en la puerta.",
        ],
      },
      {
        type: "tip",
        text: "Do the sum on the rung you are standing on, never on the one she has already refused. Divide {currency}140, not {currency}300 — running the calculator on {currency}300 just plays her back a number she has said no to. {currency}140 across a year is pennies a day, under {currency}3 a week, a bit over {currency}2 an application; if she has walked you all the way to {currency}100 it is under {currency}2 a go. Say the small number once, then shut up and let her finish the sum herself. And wherever you end up on that ladder, it ends here — nobody leaves this shop to work it out at home.",
        textEs: "Haz la cuenta en el escalón donde estás, nunca en el que ya ha rechazado. Divide {currency}140, no {currency}300 — sacar la calculadora con los {currency}300 solo le repite un número al que ya ha dicho que no. {currency}140 repartidos en un año es calderilla al día, menos de {currency}3 a la semana, poco más de {currency}2 por aplicación; y si te ha bajado hasta los {currency}100, sale por menos de {currency}2 cada vez. Di el número pequeño una vez, cállate y deja que termine ella la cuenta. Y acabes donde acabes en esa escalera, esto se acaba aquí — de esta tienda no sale nadie a hacer números en casa.",
      },
    ],
    quiz: [
      {
        question: 'She has heard {currency}300, you took the gift off at {currency}175, and now she says she is on a budget. Where are you?',
        questionEs: 'Ha oído los {currency}300, le has quitado el regalo en {currency}175, y ahora te dice que va justa. ¿Dónde estás?',
        options: [
          'Low on the ladder — one rung and the floor left under you',
          'Right at the start, because she has not named a number yet',
          'Still at the top, holding {currency}300 until she gives in',
          'At the end of it — she has just told you she cannot afford any of this',
        ],
        optionsEs: [
          'Abajo en la escalera — te quedan un escalón y el suelo',
          'Al principio del todo, porque aún no ha dicho ningún número',
          'Arriba todavía, aguantando los {currency}300 hasta que ceda',
          'Al final de todo — acaba de decirte que no le llega para nada de esto',
        ],
        correctIndex: 0,
        explanation:
          'Nobody says it at the first number. By the time you hear it you have already walked her down, so what is left is the voucher rung and the floor underneath it.',
        explanationEs:
          'Nadie lo dice con el primer número. Cuando lo oyes ya la has bajado tú, así que lo que queda es el escalón del cupón y el suelo que hay debajo.',
      },
      {
        question: 'She has said "I am on a budget" once, and you are standing on {currency}175. What comes out of your mouth?',
        questionEs: 'Ha dicho "voy justa de dinero" una vez, y tú estás en {currency}175. ¿Qué sale de tu boca?',
        options: [
          'What {currency}175 actually buys her — a year of it — and then silence',
          'The voucher: {currency}140, before she has even had to ask you twice',
          '{currency}300 broken down by the day, so the big number sounds small',
          'Straight to {currency}100, because that is where this is heading anyway',
        ],
        optionsEs: [
          'Lo que le da de verdad ese {currency}175 — un año — y luego silencio',
          'El cupón: {currency}140, antes de que te lo haya pedido dos veces',
          'Los {currency}300 partidos por días, para que el número suene pequeño',
          'Directo a {currency}100, que al final es donde va a acabar esto',
        ],
        correctIndex: 0,
        explanation:
          'One sentence about money is not a push. Hold where you are, tell her what {currency}175 buys — a year of it, one a week — and then shut up. Drop a rung on the first mention and you have taught her that saying "budget" moves your numbers, so she will say it again. Make her ask twice before you move once, and the voucher lands like something instead of nothing.',
        explanationEs:
          'Una frase sobre dinero no es un empujón. Aguanta donde estás, dile lo que le da ese {currency}175 — un año, una vez por semana — y luego te callas. Si bajas un escalón a la primera, le has enseñado que decir "voy justa" mueve tus números, así que lo va a repetir. Que te lo pida dos veces antes de moverte una, y así el cupón le llega como algo y no como nada.',
      },
      {
        question: 'She is at {currency}140 and leans on you one more time. What does {currency}100 need before you say it out loud?',
        questionEs: 'Está en {currency}140 y te aprieta una vez más. ¿Qué necesitan los {currency}100 antes de que los digas en voz alta?',
        options: [
          'Nothing — it is a rung on the ladder, so just give her the number',
          'A pause, a face, and a reason that is about her',
          'A promise that you will do the same for her the next time she is over',
          'Her partner fetched over from the cafe so that he can hear it too',
        ],
        optionsEs: [
          'Nada — es un escalón de la escalera, así que dale el número',
          'Una pausa, una cara y un motivo que hable de ella',
          'La promesa de que le harás lo mismo la próxima vez que venga',
          'Que traigas a su pareja de la cafetería para que también lo oiga',
        ],
        correctIndex: 1,
        explanation:
          'If the price just falls, it was never a price. Make her ask twice, then go all at once with a reason — and remember there is nothing underneath {currency}100.',
        explanationEs:
          'Si el precio cae solo, nunca fue un precio. Que te lo pida dos veces, y entonces cede de golpe y con motivo — y acuérdate de que debajo de {currency}100 no hay nada.',
      },
      {
        question: 'One syringe, sixty applications, one a week, and you are standing at {currency}140. Which line shrinks it?',
        questionEs: 'Una jeringa, sesenta aplicaciones, una por semana, y estás en {currency}140. ¿Qué frase lo hace pequeño?',
        options: [
          '"Everybody tells me it is expensive, you are not the only one"',
          '"Just tell me what you want to pay and I will see what I can do"',
          '"A year in there, sixty goes — under {currency}3 a week"',
          '"Honestly, it is not that expensive once you really think about it"',
        ],
        optionsEs: [
          '"Todo el mundo me dice que es caro, no eres la única"',
          '"Dime tú lo que quieres pagar y yo miro qué puedo hacer"',
          '"Un año ahí dentro — menos de {currency}3 a la semana"',
          '"De verdad que no es tan caro si te paras a pensarlo un poco"',
        ],
        correctIndex: 2,
        explanation:
          'Do the sum on the rung you are on. {currency}140 over sixty applications is a bit over {currency}2 a go — a far smaller sentence than the same maths on a price she has already refused.',
        explanationEs:
          'Haz la cuenta en el escalón donde estás. {currency}140 entre sesenta aplicaciones es poco más de {currency}2 cada vez — una frase mucho más pequeña que la misma cuenta sobre un precio que ya ha rechazado.',
      },
    ],
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
    quiz: [
      {
        question: 'She says "I will come back tomorrow." Which of these ends with her buying?',
        questionEs: 'Te dice "mañana me paso". ¿Cuál de estas acaba con ella comprando?',
        options: [
          '"Of course — take your time, no rush from me at all"',
          'Write the price on a card so she has it with her',
          'Offer to hold one at the counter until she has made her mind up properly',
          '"Go on then — what is it? The price, the product, or the sleep?"',
        ],
        optionsEs: [
          '"Claro que sí — tómate tu tiempo, sin ninguna prisa"',
          'Apúntale el precio en una tarjeta para que se lo lleve',
          'Ofrecerte a guardarle uno en el mostrador hasta que se decida del todo',
          '"Venga, dime — ¿qué es? ¿El precio, el producto o la almohada?"',
        ],
        correctIndex: 3,
        explanation:
          'Naming the real objection is the only way to answer it. Every other option here is a polite way of handing her the door.',
        explanationEs:
          'Ponerle nombre a la objeción de verdad es la única forma de contestarla. Todo lo demás aquí es abrirle la puerta con buenos modales.',
      },
      {
        question: 'She watched the line go on her own face a minute ago, and now she wants to sleep on it. What do you say?',
        questionEs: 'Hace un minuto ha visto irse la línea en su propia cara, y ahora quiere consultarlo con la almohada. ¿Qué le dices?',
        options: [
          '"Have a walk around and come back if you decide you want it"',
          '"There is nothing left to find out — you saw it on your own face"',
          '"I understand, it is a lot of money to spend on a holiday"',
          '"Everybody says that, and most of them are sorry about it by the evening"',
        ],
        optionsEs: [
          '"Date una vuelta y vuelve si decides que lo quieres"',
          '"Ya no queda nada por averiguar — lo has visto en tu propia cara"',
          '"Te entiendo, es mucho dinero para gastarlo de vacaciones"',
          '"Eso lo dice todo el mundo, y por la noche casi todas se arrepienten"',
        ],
        correctIndex: 1,
        explanation:
          'She did not read a review, she watched it happen. There is no new information waiting for her outside, only a feeling that fades.',
        explanationEs:
          'No ha leído una reseña, lo ha visto pasar. Fuera no le espera ninguna información nueva, solo que se le pase la sensación.',
      },
      {
        question: 'She is wavering and she has not once mentioned money. What is the mistake here?',
        questionEs: 'Está dudando y no ha mencionado el dinero ni una vez. ¿Cuál es el error?',
        options: [
          'Leading with a discount she never asked you for',
          'Holding the number with the smile still on your face',
          'Asking her straight out what is actually stopping her',
          'Handing her the mirror a second time and letting her look',
        ],
        optionsEs: [
          'Empezar por un descuento que no te ha pedido',
          'Aguantar el número con la sonrisa todavía puesta',
          'Preguntarle a bocajarro qué es lo que la frena',
          'Darle el espejo otra vez y dejar que se mire',
        ],
        correctIndex: 0,
        explanation:
          'Come down the ladder when she tells you the price is the problem. Drop early and you have paid good money for a yes she was going to give you anyway.',
        explanationEs:
          'Baja la escalera cuando ella te diga que el problema es el precio. Si lo sueltas antes, has pagado por un sí que te iba a dar igualmente.',
      },
    ],
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
        text: "This one sounds like it is about the partner. It is not. He is playing golf, he is at the hotel, he is anywhere but here — and he is not thinking about her face. She already told you she likes it and she would use it, so the deciding is done. What she is actually asking for is permission, and the only person who can hand it to her is the woman holding the mirror. Give the decision back to her, right now, while she is still standing in front of you.",
        textEs: "Esta parece que va de la pareja. No va de eso. Él está jugando al golf, está en el hotel, está en cualquier sitio menos aquí — y no está pensando en la cara de ella. Ya te ha dicho que le gusta y que lo usaría, así que decidido está. Lo que está pidiendo en realidad es permiso, y la única persona que puede dárselo es la mujer que tiene el espejo en la mano. Devuélvele la decisión, ahora mismo, mientras la tienes delante.",
      },
      {
        type: "subheader",
        text: "The Psychology Behind \"My Partner Will Kill Me\"",
        textEs: "La Psicología Detrás de \"Mi Pareja Me Mata\"",
      },
      {
        type: "bullets",
        items: [
          "Social Accountability: People care more about what their partner thinks than what a stranger thinks. The fear of the conversation at home is stronger than the desire.",
          "The Two Yeses Already Happened: She said she likes it. She said she would use it. After that she cannot object to anything except the price — so \"I'll ask him\" is her looking for permission, not information.",
          "The Door Dressed As A Reason: \"I'll ask him\" is the politest exit in the shop. The second she goes off to find him the sale is over, because the feeling she had in that chair is gone before she has crossed the road.",
        ],
        itemsEs: [
          "Responsabilidad Social: A la gente le importa más lo que piensa su pareja que lo que piensa un desconocido. El miedo a la conversación en casa es más fuerte que las ganas.",
          "Los Dos Síes Ya Están Dados: Te ha dicho que le gusta. Te ha dicho que lo usaría. Después de eso ya no puede objetar nada que no sea el precio — así que \"se lo pregunto a él\" es que busca permiso, no información.",
          "La Puerta Disfrazada de Motivo: \"Se lo pregunto a él\" es la salida más educada de la tienda. En cuanto se va a buscarlo, la venta se acabó, porque lo que sintió en esa silla se le pasa antes de cruzar la calle.",
        ],
      },
      {
        type: "subheader",
        text: "Script 1: Ladies' Business (Short) — the one you use first",
        textEs: "Guion 1: Cosa de Chicas (Corto) — el que usas primero",
      },
      {
        type: "script",
        text: "YOU: \"Ladies' business, my darling. He is playing golf — he is not thinking about your face.\" [Big smile, keep hold of her hand, no edge in it at all] \"You said you like it, you said you would use it. So it is your call, not his. Spoil yourself. And if you really would not use it, keep your money — no hard feelings.\"",
        textEs: "TÚ: \"Cosa de chicas, cariño. Él está jugando al golf — no está pensando en tu cara.\" [Sonrisa grande, sin soltarle la mano, sin una pizca de mala leche] \"Me has dicho que te gusta, me has dicho que lo usarías. Así que esto lo decides tú, no él. Date un capricho. Y si de verdad no lo fueras a usar, guárdate el dinero — sin rencores.\"",
      },
      {
        type: "keypoint",
        text: "Read that last line again, because it is the part everyone leaves out. \"If you really would not use it, keep your money\" is not a softener bolted on the end — being genuinely willing to walk away from her money is what makes the whole thing land. It also tells her, in one sentence, that you are not the person she was braced for.",
        textEs: "Léete otra vez la última frase, porque es la parte que todo el mundo se salta. \"Si de verdad no lo fueras a usar, guárdate el dinero\" no es un caramelito pegado al final — que estés dispuesto de verdad a renunciar a su dinero es lo que hace que todo esto funcione. Y además le dice, en una frase, que tú no eres el vendedor que ella se esperaba.",
      },
      {
        type: "subheader",
        text: "Script 2: The Gift Framing (Medium)",
        textEs: "Guion 2: Enmarcar como Regalo (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"I love that you care what they think! Here's the move — this isn't just for you. Grab the nail kit for your daughter, the scrub for your wife, and the syringe for yourself. Now it's a family gift from {locationName}! No one can be mad about a gift.\"",
        textEs: "TÚ: \"¡Me encanta que te importe lo que piensen! Aquí está el truco — esto no es solo para ti. Coge el kit de uñas para tu hija, el scrub para tu mujer, y la jeringa para ti. ¡Ahora es un regalo familiar de {locationName}! Nadie se puede enfadar por un regalo.\"",
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
        text: "Ladies' business goes first, every time. It is the shortest answer in the lesson and it is the one that works, because it hands the decision straight back to the person who has already said yes twice. The gift-for-two angle is your second move, not your opener — \"get one for him as well\" turns a selfish purchase into a thoughtful one and doubles the sale in the same breath. What you never do, whatever she says next, is send her off to go and find him.",
        textEs: "Lo de \"cosa de chicas\" va primero, siempre. Es la respuesta más corta de la lección y es la que funciona, porque le devuelve la decisión a la persona que ya ha dicho que sí dos veces. Lo del regalo para dos es tu segunda jugada, no tu apertura — \"llévate uno para él también\" convierte un capricho en un detalle y te dobla la venta de paso. Lo que no haces nunca, diga lo que diga, es mandarla a buscarlo.",
      },
    ],
    quiz: [
      {
        question: 'She has said yes to both questions and then says she has to ask her husband. What do you say?',
        questionEs: 'Ha dicho que sí a las dos preguntas y ahora te dice que se lo tiene que preguntar a su marido. ¿Qué le dices?',
        options: [
          '"Take a photo of it and show him tonight, then decide together"',
          '"Ring him right now and put him on speaker — I will talk him round myself"',
          '"Ladies\' business, my darling. He is not thinking about your face."',
          '"Fair enough — go and find him, I will still be here later"',
        ],
        optionsEs: [
          '"Hazle una foto y se la enseñas esta noche, y lo decidís juntos"',
          '"Llámalo ahora mismo y ponlo en manos libres — ya lo convenzo yo"',
          '"Cosa de chicas, cariño. Él no está pensando en tu cara."',
          '"Muy bien — ve a buscarlo, yo sigo aquí luego"',
        ],
        correctIndex: 2,
        explanation:
          'He is playing golf. She already said she likes it and she would use it, so it is her call — and you put it back in her hands while she is still in front of you.',
        explanationEs:
          'Él está jugando al golf. Ya ha dicho que le gusta y que lo usaría, así que lo decide ella — y se lo devuelves mientras la tienes delante.',
      },
      {
        question: 'Why does that answer end with "if you really would not use it, keep your money"?',
        questionEs: '¿Por qué esa respuesta acaba con "si de verdad no lo fueras a usar, guárdate el dinero"?',
        options: [
          'It softens the pitch so she does not feel pushed at all',
          'Being willing to walk away from her money is what closes it',
          'It gives her a polite way out so she can think it over',
          'It covers the shop in case she changes her mind on the way home',
        ],
        optionsEs: [
          'Suaviza el discurso para que no se sienta presionada',
          'Estar dispuesto a renunciar a su dinero es lo que cierra',
          'Le da una salida educada para que se lo pueda pensar',
          'Cubre a la tienda por si cambia de idea de camino a casa',
        ],
        correctIndex: 1,
        explanation:
          'It is not a softener bolted on the end. A seller who is genuinely fine either way is the only one she believes.',
        explanationEs:
          'No es un caramelito pegado al final. Al vendedor al que de verdad le da igual es al único al que se cree.',
      },
      {
        question: 'She likes it, she would use it, and now she is worrying about her partner. What is left for her to object to?',
        questionEs: 'Le gusta, lo usaría, y ahora se preocupa por su pareja. ¿Qué le queda por objetar?',
        options: [
          'Whether the product really works on her kind of skin',
          'Whether she trusts you enough to hand over a card',
          'Whether her partner is going to approve of the spend when she gets home',
          'The price, and nothing else — the two yeses closed the rest',
        ],
        optionsEs: [
          'Si el producto funciona de verdad en su tipo de piel',
          'Si se fía de ti lo suficiente como para darte la tarjeta',
          'Si su pareja va a dar el visto bueno al gasto cuando llegue a casa',
          'El precio y nada más — los dos síes cerraron todo lo demás',
        ],
        correctIndex: 3,
        explanation:
          'That is what the two yeses are for. Once she has said them she can only argue about the number, so treat the partner line as a price conversation.',
        explanationEs:
          'Para eso están los dos síes. Una vez dichos, solo puede discutir el número, así que trata lo de la pareja como una conversación de precio.',
      },
    ],
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
          "Ask for the sale too early: They need more time than a normal customer — a lot more. Patience wins.",
        ],
        itemsEs: [
          "Ponerte a la defensiva: \"¡No soy un estafador!\" — Esto de hecho te hace sonar MÁS como uno.",
          "Apurarlos: La presión activa su respuesta de trauma. Se cerrarán.",
          "Menospreciar su experiencia: \"Eso fue diferente, esto es real\" — invalida su dolor.",
          "Pedir la venta demasiado pronto: Necesitan más tiempo que un cliente normal — bastante más. La paciencia gana.",
        ],
      },
      {
        type: "tip",
        text: "The hand-demo technique is CRITICAL with scammed customers. Offering to demo on their hand — not their face — gives them complete control. They can wash it off. They can walk away. That feeling of control is what rebuilds trust. Also, always have Google reviews pulled up on your phone. Real reviews from real people are worth 1,000 words.",
        textEs: "La técnica de demo en la mano es CRÍTICA con clientes estafados. Ofrecer hacer la demo en su mano — no en su cara — les da control completo. Se la pueden lavar. Se pueden ir. Esa sensación de control es lo que reconstruye confianza. Además, siempre ten las reseñas de Google abiertas en tu móvil. Reseñas reales de gente real valen más que mil palabras.",
      },
    ],
    quiz: [
      {
        question: 'A man tells you he got done by a seller on a street like this one. What is the first move?',
        questionEs: 'Un hombre te cuenta que un vendedor de una calle como esta le timó. ¿Cuál es la primera jugada?',
        options: [
          'Demo it on your own hand and let him just watch',
          '"I am not a scammer — look me in the eye and you will see"',
          '"That will have been a different product, this one is the real thing"',
          'Get to the price quickly so he can see you are hiding nothing at all',
        ],
        optionsEs: [
          'Haz la demo en tu propia mano y que él solo mire',
          '"No soy un estafador — mírame a los ojos y lo verás"',
          '"Eso sería otro producto, este es el auténtico de verdad"',
          'Ve rápido al precio para que vea que no escondes absolutamente nada',
        ],
        correctIndex: 0,
        explanation:
          'You cannot argue somebody out of being burned. Take the risk off him completely and let him watch until he wants to join in.',
        explanationEs:
          'A nadie se le quita a base de argumentos el haberse quemado. Quítale el riesgo del todo y déjalo mirar hasta que quiera meterse.',
      },
      {
        question: 'He is still standing there but he will not let you near his face. What do you offer him?',
        questionEs: 'Sigue ahí de pie pero no te deja acercarte a su cara. ¿Qué le ofreces?',
        options: [
          'The full three-minute routine on his face, done very slowly',
          'A leaflet with the ingredients so he can read it later on',
          'A tiny patch on the back of his hand — he can wash it off',
          'Your phone with the reviews on it, then leave him alone to read them',
        ],
        optionsEs: [
          'La rutina entera de tres minutos en la cara, muy despacio',
          'Un folleto con los ingredientes para que lo lea más tarde',
          'Una pizca en el dorso de la mano — se la puede lavar',
          'El móvil con las reseñas y lo dejas solo para que las lea',
        ],
        correctIndex: 2,
        explanation:
          'The hand is his, not yours. Being able to wash it off is the whole point — control is what rebuilds the trust somebody else broke.',
        explanationEs:
          'La mano es suya, no tuya. Que se lo pueda lavar es justo lo importante — el control es lo que reconstruye la confianza que le rompió otro.',
      },
      {
        question: 'Which line makes you sound MORE like the seller who ripped him off?',
        questionEs: '¿Qué frase hace que suenes MÁS como el vendedor que le timó?',
        options: [
          '"Have a look at the ingredients — every one of them is on the box"',
          '"I am not a scammer, I promise you"',
          '"I will do it on myself first, you just watch"',
          '"You do not have to trust me — decide when you have seen it"',
        ],
        optionsEs: [
          '"Mira los ingredientes — están todos escritos en la caja"',
          '"No soy un estafador, te lo prometo"',
          '"Primero me lo hago a mí, tú solo mira"',
          '"No tienes que fiarte de mí — decides cuando lo hayas visto"',
        ],
        correctIndex: 1,
        explanation:
          'Defending yourself is what a guilty man does. Show him instead, and let him decide with his own eyes.',
        explanationEs:
          'Defenderse es lo que hace el culpable. Enséñaselo y que decida con sus propios ojos.',
      },
    ],
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
        text: "Keep 3-4 before/after photos of dark-skinned clients on your phone (with permission). Nothing you say does the job a photo does — she can see it, so she does not have to take your word for anything. Also, if YOU have darker skin, demo on YOURSELF. Nothing beats seeing it work on someone who looks like you. If you don't, be honest: \"I hear you — my skin's different. Let me show you on your hand so YOU can be the judge.\"",
        textEs: "Guarda 3-4 fotos de antes/después de clientes de piel morena en tu móvil (con permiso). Nada de lo que digas hace lo que hace una foto — lo ve ella, así que no tiene que fiarse de tu palabra. Además, si TÚ tienes piel morena, haz la demo en TI MISMO. Nada supera verlo funcionar en alguien que se parece a ti. Si no, sé honesto: \"Te entiendo — mi piel es diferente. Déjame mostrarte en tu mano para que TÚ seas el juez.\"",
      },
    ],
    quiz: [
      {
        question: 'A woman with deep brown skin asks whether it will do anything for her. What do you lead with?',
        questionEs: 'Una mujer de piel morena oscura te pregunta si esto le va a hacer algo. ¿Por dónde empiezas?',
        options: [
          '"It works on everyone, do not worry about that"',
          '"You have got beautiful skin, you hardly need it"',
          '"Honestly it is the same for everybody — skin is skin at the end of the day"',
          '"Good question. It is water, not a bleach. Give me your hand."',
        ],
        optionsEs: [
          '"Funciona en todo el mundo, no te preocupes por eso"',
          '"Tienes una piel preciosa, casi no te hace falta"',
          '"De verdad, es igual para todas — la piel es la piel, al final"',
          '"Buena pregunta. Es agua, no un blanqueador. Dame la mano."',
        ],
        correctIndex: 3,
        explanation:
          'Her question is real and it deserves a real answer, and then a hand. Hyaluronic acid binds water — it does not touch her colour.',
        explanationEs:
          'Su pregunta es de verdad y merece una respuesta de verdad, y luego la mano. El ácido hialurónico une agua — no le toca el color.',
      },
      {
        question: 'Why does that question deserve a proper answer instead of a quick reassurance?',
        questionEs: '¿Por qué esa pregunta merece una respuesta de verdad y no un "tranquila" rápido?',
        options: [
          'She is protecting herself from being let down again',
          'She is testing whether you know the ingredient list',
          'She is opening the haggle and this is her first move',
          'She wants to hear the word melanin before she will trust you',
        ],
        optionsEs: [
          'Se está protegiendo de que la vuelvan a decepcionar',
          'Te está poniendo a prueba con la lista de ingredientes',
          'Está abriendo el regateo y esta es su primera jugada',
          'Quiere oírte decir "melanina" antes de fiarse de ti',
        ],
        correctIndex: 0,
        explanation:
          'The industry has let her down before and she is bracing for it again. Waving the question away tells her you did not even hear it.',
        explanationEs:
          'El sector ya la ha decepcionado antes y viene preparada para que se repita. Quitarle importancia le dice que ni la has escuchado.',
      },
      {
        question: 'You have no before-and-after photos of darker skin on your phone. What do you do?',
        questionEs: 'No tienes fotos de antes y después de piel morena en el móvil. ¿Qué haces?',
        options: [
          'Show the ones you have got and hope she does not notice',
          'Tell her you have seen it work on hundreds of women like her',
          '"My skin is not yours — let me do your hand, you be the judge"',
          'Go through the science again, in more detail, until she is happy',
        ],
        optionsEs: [
          'Enseñar las que tienes y esperar que no se dé cuenta',
          'Decirle que lo has visto funcionar en cientos de mujeres así',
          '"Mi piel no es la tuya — te hago la mano y juzgas tú"',
          'Repetir la explicación científica con más detalle hasta que se quede a gusto',
        ],
        correctIndex: 2,
        explanation:
          'Honesty plus her own hand beats any photo you could show her. She judges it on her own skin, which is what she was asking for.',
        explanationEs:
          'La honestidad y su propia mano ganan a cualquier foto que le enseñes. Lo juzga en su piel, que es justo lo que estaba pidiendo.',
      },
    ],
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
    quiz: [
      {
        question: 'She asks whether you test on animals. What is standing in front of you?',
        questionEs: 'Te pregunta si probáis en animales. ¿Qué tienes delante?',
        options: [
          'An objection you have to get past before you can sell',
          'A pre-qualified buyer telling you what she cares about',
          'A polite way of saying she is not going to buy anything',
          'A trap — whatever you answer she will find a reason to walk off',
        ],
        optionsEs: [
          'Una objeción que hay que superar antes de poder vender',
          'Una compradora ya cualificada diciéndote qué le importa',
          'Una forma educada de decirte que no va a comprar nada',
          'Una trampa — contestes lo que contestes, encontrará motivo para irse',
        ],
        correctIndex: 1,
        explanation:
          'People who buy on values do not price-shop. Answer this one properly and the price stops being the conversation.',
        explanationEs:
          'Quien compra por valores no anda mirando el precio. Contesta bien esta y el precio deja de ser la conversación.',
      },
      {
        question: 'You are not sure whether the brand really holds the certification she just named. What do you say?',
        questionEs: 'No estás seguro de si la marca tiene de verdad la certificación que acaba de nombrar. ¿Qué dices?',
        options: [
          '"I think so, yes — pretty sure we have got that one"',
          '"Every company does a bit of testing somewhere, if we are honest about it"',
          '"Yes, we have got all of them, do not you worry about that"',
          '"We do not test on animals." Say the part you actually know.',
        ],
        optionsEs: [
          '"Creo que sí, bastante seguro de que tenemos esa"',
          '"Todas las empresas prueban algo en algún sitio, si somos sinceros"',
          '"Sí, las tenemos todas, no te preocupes por eso"',
          '"Nosotros no probamos en animales." Di solo lo que sabes seguro.',
        ],
        correctIndex: 3,
        explanation:
          'Either you know or you do not. Guessing at a certificate in front of somebody who cares about it is the fastest way to lose her.',
        explanationEs:
          'O lo sabes o no lo sabes. Inventarte un certificado delante de quien le importa es la forma más rápida de perderla.',
      },
      {
        question: 'She cares about this and she has got time. How long do you spend on the answer?',
        questionEs: 'A ella le importa y tiene tiempo. ¿Cuánto le dedicas a la respuesta?',
        options: [
          'As long as she wants — this is the buyer who pays on values',
          'Thirty seconds, then straight to the demo before you lose her',
          'Just enough to answer it, then move her on to the price',
          'Skip it and get her hand on the table — the feeling sells it anyway',
        ],
        optionsEs: [
          'Lo que ella quiera — esta es la que paga por valores',
          'Treinta segundos y directo a la demo antes de perderla',
          'Lo justo para contestar y llevarla enseguida al precio',
          'Sáltatelo y ponle la mano en la mesa — la sensación vende sola',
        ],
        correctIndex: 0,
        explanation:
          'Rushing past it tells her you do not really care. Time spent here is the cheapest loyalty you will ever buy.',
        explanationEs:
          'Pasar de puntillas le dice que en realidad te da igual. El rato que gastas aquí es la fidelidad más barata que vas a comprar.',
      },
    ],
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
        type: "keypoint",
        text: "And know where you are standing before you answer. She almost never says this at your opening number — by the time the phone comes out you have usually walked her down a rung or two. Once you are at {currency}175, and certainly once your voucher is on it at {currency}140, you are not defending a higher price at all. You are the cheaper one, and the whole argument stops being an apology and turns into a win. Never quote her a number off a website you cannot see. Let her read her own screen out loud, then put yours next to it.",
        textEs: "Y mira dónde estás antes de contestar. Casi nunca te suelta esto con tu primer número — cuando sale el móvil, normalmente ya la has bajado un escalón o dos. En cuanto estás en {currency}175, y no digamos con el cupón puesto en {currency}140, no estás defendiendo un precio más alto: el barato eres tú, y todo el argumento deja de ser una disculpa y pasa a ser una victoria. No le cites nunca un número de una web que no estás viendo. Que lea ella su propia pantalla en voz alta, y tú pones el tuyo al lado.",
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
        text: "YOU: \"Maybe — but here's the thing about Amazon skincare. The place is full of fakes. That 'deal' you find? Probably fake, expired, or diluted. This?\" [Hold up sealed product] \"Sealed, fresh, straight from the manufacturer. And you just watched it work on your own face. Can Amazon do that?\"",
        textEs: "TÚ: \"Tal vez — pero esto es lo del skincare en Amazon. Aquello está lleno de falsificaciones. ¿Esa 'ganga' que encuentras? Probablemente falsa, vencida, o diluida. ¿Esto?\" [Levanta producto sellado] \"Sellado, fresco, directo del fabricante. Y acabas de verlo funcionar en tu propia cara. ¿Amazon puede hacer eso?\"",
      },
      {
        type: "subheader",
        text: "Script 2: The Total Cost Analysis (Medium)",
        textEs: "Guion 2: El Análisis de Costo Total (Medio)",
      },
      {
        type: "script",
        text: "YOU: \"Go on then, show me. What does your screen say?\" [Look at it with her. Genuinely interested, no panic — never invent a number for a website she is holding in her hand] \"Right. Now add the shipping. Add the week you sit waiting. Add the bit where you open the box and hope it is the real one. And here is what your screen cannot see: I am not at the price on my box either.\" [Voice down, lean in] \"I have already taken the gift off for you — you are at {currency}175 with me. Sealed, fresh, in your bag, and you have already felt it on your own face. So have another look at that screen and tell me who is actually cheaper.\"",
        textEs: "TÚ: \"Venga, enséñamelo. ¿Qué pone en tu pantalla?\" [Míralo con ella. Con interés de verdad, sin ponerte nervioso — nunca te inventes un número de una web que ella tiene en la mano] \"Vale. Ahora súmale el envío. Súmale la semana esperando. Y súmale el momento en que abres la caja y rezas para que sea el bueno. Y esto tu pantalla no lo ve: yo tampoco estoy al precio de mi caja.\" [Baja la voz, acércate] \"Ya te he quitado el regalo — conmigo estás en {currency}175. Sellada, fresca, en tu bolsa, y ya la has notado en tu propia cara. Así que vuelve a mirar esa pantalla y dime quién es más barato de verdad.\"",
      },
      {
        type: "subheader",
        text: "Script 3: The Experience Reframe (Detailed)",
        textEs: "Guion 3: La Reconversión de Experiencia (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"Amazon, right? Everyone goes there first. But let me ask you — when you buy skincare on Amazon, what are you actually buying? A photo, a description, and a prayer. You don't know if it's been sitting in a warehouse for 18 months. You don't know if it's been exposed to heat. You don't know if it's even REAL — because fake cosmetics are everywhere now.\" [Pull out your phone, show news about counterfeit cosmetics if you have it] \"Now look at what just happened here. I put this on your face. You FELT the texture. You SAW the wrinkle disappear in 60 seconds. You're holding the sealed box in your hands. This is a full EXPERIENCE, not a transaction. And here's what people forget: the number on that screen is not the number you pay — add the shipping, add the week, add the risk. Now look at what I am doing on this side.\" [Voice down, quick look at the door] \"I am not even at my box price with you. Gift off, my voucher on it — {currency}140. Real. Fresh. Sealed. In your bag before you have finished your coffee.\" [Pause] \"Listen, I'm not here to rip you off. I'm here because this product changed MY skin, and I love sharing that. But I also know that the version on Amazon isn't this version. This is the real deal, right here, right now. So — do you want to risk your face on a website, or do you want to walk out looking 10 years younger TODAY?\"",
        textEs: "TÚ: \"Amazon, ¿verdad? Todos van ahí primero. Pero déjame preguntarte — cuando compras skincare en Amazon, ¿qué estás comprando realmente? Una foto, una descripción, y una oración. No sabes si ha estado en un almacén por 18 meses. No sabes si ha estado expuesto al calor. No sabes si siquiera es REAL — porque los cosméticos falsos están por todos lados ahora.\" [Saca tu móvil, muestra noticias sobre cosméticos falsificados si tienes] \"Ahora mira lo que acaba de pasar aquí. Te puse esto en la cara. SENTISTE la textura. VISTE la arruga desaparecer en 60 segundos. Estás sosteniendo la caja sellada en tus manos. Esto es una EXPERIENCIA completa, no una transacción. Y esto es lo que la gente olvida: el número de esa pantalla no es lo que acabas pagando — súmale el envío, súmale la semana, súmale el riesgo. Y ahora mira lo que estoy haciendo yo de este lado.\" [Baja la voz, mirada rápida a la puerta] \"Es que ni siquiera estoy al precio de mi caja contigo. Sin regalo, con mi cupón — {currency}140. Real. Fresca. Sellada. En tu bolsa antes de que te acabes el café.\" [Pausa] \"Escucha, no estoy aquí para estafarte. Estoy aquí porque este producto cambió MI piel, y me encanta compartir eso. Pero también sé que la versión en Amazon no es esta versión. Este es el producto real, aquí, ahora. Entonces — ¿quieres arriesgar tu cara en un sitio web, o quieres salir viéndote 10 años más joven HOY?\"",
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
          "Guess what her screen says: she is holding the phone, so ask her to read it out. You cannot be caught out by a number you never invented, and often enough the one she reads out is higher than the rung you are standing on.",
          "Let a website move you down a rung: dropping because a page loaded is the page setting your prices. You move when SHE pushes, with a reason attached, exactly like any other rung.",
        ],
        itemsEs: [
          "Hablar mal de Amazon por completo: Algunos aman Amazon. No los hagas sentirse tontos por usarlo.",
          "Negar la diferencia de precio: Admítela, luego reconvertir alrededor del valor.",
          "Decir \"no encuentras esto en Amazon\" a menos que sea CIERTO: Mentir sobre disponibilidad destruye confianza si lo comprueban.",
          "Adivinar lo que pone en su pantalla: el móvil lo tiene ella, así que pídele que te lo lea. Con un número que no te has inventado no te pilla nadie, y muchas veces el que lee es más alto que el escalón donde estás.",
          "Dejar que una web te baje un escalón: bajar porque se ha cargado una página es dejar que la página te ponga los precios. Tú te mueves cuando empuja ELLA, con un motivo pegado, igual que en cualquier otro escalón.",
        ],
      },
      {
        type: "tip",
        text: "Keep a screenshot on your phone of a news article about counterfeit cosmetics on Amazon. When you pull it up and say \"Look, this was last month — millions in fake skincare seized,\" it becomes REAL. Also, the phrase \"You're not paying for the product, you're paying for knowing it's real\" is your best closer — it is about what is in the box, not about anything happening after they leave.",
        textEs: "Guarda una captura de pantalla en tu móvil de un artículo de noticias sobre cosméticos falsificados en Amazon. Cuando la sacas y dices \"Mira, esto fue el mes pasado — millones en skincare falso decomisado,\" se vuelve REAL. Además, la frase \"No estás pagando por el producto, estás pagando por saber que es auténtico\" es tu mejor cierre — va de lo que hay en la caja, no de nada que pase después de que se vayan.",
      },
    ],
    quiz: [
      {
        question: '"I can get this cheaper on Amazon." What do you do first?',
        questionEs: '"Esto en Amazon está más barato." ¿Qué haces primero?',
        options: [
          'Match the price so she has no reason to go looking',
          'Tell her the site is full of rubbish and she should not use it',
          'Agree the gap is real, then move it back to what she just felt',
          'Tell her this exact one is not on there — she will not check anyway',
        ],
        optionsEs: [
          'Igualar el precio para que no tenga por qué mirar',
          'Decirle que esa web está llena de porquería y que no la use',
          'Darle la razón en la diferencia y volver a lo que acaba de notar',
          'Decirle que este justo no está ahí — total, no lo va a mirar',
        ],
        correctIndex: 2,
        explanation:
          'Denying the price gap makes you a liar in one tap of her phone. Admit it, then put the demo she just watched next to a photo on a screen.',
        explanationEs:
          'Negar la diferencia te convierte en mentiroso con un toque en su móvil. Admítela y pon la demo que acaba de ver al lado de una foto en una pantalla.',
      },
      {
        question: 'What have you got in the next two minutes that a website has not?',
        questionEs: '¿Qué tienes tú en los próximos dos minutos que no tiene una web?',
        options: [
          'Her own face in a mirror and a sealed box in her hand',
          'A lower price than she will find anywhere else online',
          'A story about a customer who was sent a fake last month',
          'Faster delivery and no shipping to pay on top of the price',
        ],
        optionsEs: [
          'Su propia cara en un espejo y una caja sellada en la mano',
          'Un precio más bajo del que va a encontrar en internet',
          'La historia de una clienta a la que le mandaron una falsa',
          'Entrega más rápida y sin gastos de envío encima del precio',
        ],
        correctIndex: 0,
        explanation:
          'You are not competing on price and you never were. You are selling the two minutes she cannot get anywhere else.',
        explanationEs:
          'No compites en precio, y nunca competiste. Vendes los dos minutos que no consigue en ningún otro sitio.',
      },
      {
        question: 'She gets her phone out to check the price on the site, right there in front of you. What now?',
        questionEs: 'Saca el móvil para mirar el precio en la web, ahí mismo delante de ti. ¿Y ahora?',
        options: [
          'Ask her to put it away and give you one minute first',
          'Let her look, and put the mirror in her other hand',
          'Tell her the signal is terrible here and she should try later',
          'Jump to your floor price before the page has finished loading',
        ],
        optionsEs: [
          'Pedirle que lo guarde y que te dé un minuto antes',
          'Déjala mirar y ponle el espejo en la otra mano',
          'Decirle que aquí no hay cobertura y que lo mire luego',
          'Irte a tu precio mínimo antes de que se le cargue la página',
        ],
        correctIndex: 1,
        explanation:
          'Blocking the phone looks like you have something to hide. Let her look while she is holding the mirror — the mirror wins.',
        explanationEs:
          'Taparle el móvil parece que escondes algo. Déjala mirar mientras sujeta el espejo — gana el espejo.',
      },
    ],
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
        text: "YOU: \"Alright, let's talk about what just happened — because this is important.\" [Sit them down, take your time] \"Look, I've done this demo thousands of times. When it doesn't show straight away, that is not a problem — it's information. Let me ask you a couple of things: how much water do you drink in a day?\" [Let them answer — usually 'not enough'] \"Do you use a moisturiser every day?\" [Usually no, or on and off] \"See, here's the thing. This works by binding to water in your skin. If there's no water to bind to, it's like trying to blow a balloon up in a room with no air in it. The product is doing its job — your skin just needs the ground clearing first.\" [Pick up the scrub — do not put anything away] \"So we're doing it in the right order instead, and we're doing it now, not next month. This is the Dead Sea Scrub, {currency}60. It takes the dead layer off so that anything you put on afterwards actually gets in.\" [Scrub the same spot, clean it, then go again with the syringe while she is still in the chair] \"Now look. THAT is what it does on skin that's ready. So the scrub's yours — and tell me honestly, are we doing the syringe today as well, or are you going home with half a job done?\"",
        textEs: "TÚ: \"Venga, hablemos de lo que acaba de pasar — porque esto importa.\" [Siéntala, tómate tu tiempo] \"Mira, he hecho esta demo miles de veces. Que no se vea a la primera no es un problema — es información. Déjame preguntarte un par de cosas: ¿cuánta agua bebes al día?\" [Deja que conteste — normalmente 'poca'] \"¿Te pones crema hidratante todos los días?\" [Normalmente no, o a ratos] \"Mira, la cosa es así. Esto funciona uniéndose al agua que hay en tu piel. Si no hay agua a la que unirse, es como intentar hinchar un globo en una habitación sin aire. El producto está haciendo su trabajo — lo que pasa es que tu piel necesita que le despejen el terreno primero.\" [Coge el exfoliante — no guardes nada] \"Así que lo hacemos en el orden correcto, y lo hacemos ahora, no el mes que viene. Este es el Scrub del Mar Muerto, {currency}60. Te quita la capa muerta para que lo que te pongas después entre de verdad.\" [Exfolia la misma zona, límpiala y vuelve con la jeringa mientras ella sigue sentada] \"Ahora mira. ESO es lo que hace sobre una piel preparada. Así que el scrub es tuyo — y dime la verdad, ¿nos llevamos hoy también la jeringa, o te vas a casa con el trabajo a medias?\"",
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
        text: "ALWAYS carry makeup remover wipes and toner. Most \"failed demos\" are not the product at all — they are sunscreen, moisturiser or foundation sitting between you and her skin. Prep the face before you start and you will hardly ever see one. And the failed-demo pivot is one of your best moves, as long as every bit of it stays in today: close the {currency}60 scrub, use it on her there and then, and put the syringe back on the clean skin before she is out of that chair. A sale you have set up for \"next time\" is not a sale.",
        textEs: "Lleva SIEMPRE toallitas desmaquillantes y tónico. La mayoría de las \"demos fallidas\" no son culpa del producto — son la crema solar, la hidratante o la base de maquillaje puestas entre tu dedo y su piel. Prepara la cara antes de empezar y casi no vas a ver ninguna. Y el giro de demo fallida a exfoliante es una de tus mejores jugadas, siempre que todo pase hoy: cierras el scrub de {currency}60, se lo usas ahí mismo, y le vuelves a poner la jeringa sobre la piel limpia antes de que se levante de la silla. Una venta que dejas apalabrada \"para la próxima\" no es una venta.",
      },
    ],
    quiz: [
      {
        question: 'The syringe has done nothing and she has already seen it. What is the first thing out of your mouth?',
        questionEs: 'La jeringa no ha hecho nada y ella ya lo ha visto. ¿Qué es lo primero que dices?',
        options: [
          '"You cannot see it yet but it is working underneath"',
          '"Your skin is very dry, that is really the problem here, if I am honest"',
          '"Give it a couple of hours and you will see it tonight"',
          '"I see it too. What did you put on your face this morning?"',
        ],
        optionsEs: [
          '"Todavía no se ve, pero por dentro está trabajando"',
          '"Tienes la piel muy seca, ese es el problema de verdad, te lo digo ya"',
          '"Dale un par de horas y esta noche lo vas a ver"',
          '"Yo también lo veo. ¿Qué te has puesto en la cara esta mañana?"',
        ],
        correctIndex: 3,
        explanation:
          'Agreeing costs nothing and takes the fight out of the air. Then you go looking for the layer sitting between you and her skin.',
        explanationEs:
          'Darle la razón no te cuesta nada y le quita la bronca al momento. Y luego vas a buscar la capa que hay entre tu dedo y su piel.',
      },
      {
        question: 'You cleaned the skin, went again, and it still has not moved. Where does the sale go now?',
        questionEs: 'Le has limpiado la piel, lo has repetido, y sigue sin moverse nada. ¿A dónde va la venta?',
        options: [
          'Nowhere — thank her nicely and get on with the next person walking past',
          'Send her off to drink more water and try it another day',
          'Onto the scrub — close it and put the syringe back on today',
          'Onto the peeling, and set the syringe up for another visit',
        ],
        optionsEs: [
          'A ninguna parte — dale las gracias y ve a por la siguiente persona que pase',
          'Mándala a beber más agua y que lo pruebe otro día',
          'Al exfoliante — ciérralo y vuelve a poner la jeringa hoy',
          'Al peeling, y deja la jeringa apalabrada para otra visita',
        ],
        correctIndex: 2,
        explanation:
          'The downsell is right, the homework is not. Scrub the same spot, clean it, and put the syringe straight back on while she is still in the chair.',
        explanationEs:
          'El cambio de producto está bien, los deberes no. Exfolia la misma zona, límpiala y vuelve a poner la jeringa mientras sigue sentada.',
      },
      {
        question: 'What stops most dead demos happening in the first place?',
        questionEs: '¿Qué evita la mayoría de las demos muertas antes de que pasen?',
        options: [
          'Asking about cream and make-up, then cleaning the skin',
          'Using more product and pressing a lot harder on the line',
          'Only picking customers whose skin already looks looked after',
          'Doing it on your own hand first so she knows it is genuine',
        ],
        optionsEs: [
          'Preguntar por la crema y el maquillaje y limpiar la piel',
          'Poner más producto y apretar mucho más sobre la línea',
          'Elegir solo a clientas con la piel ya bien cuidada',
          'Hacerlo antes en tu propia mano para que vea que es real',
        ],
        correctIndex: 0,
        explanation:
          'Sunscreen, moisturiser and foundation are what is really failing, not the product. Wipes and toner on the table, every shift.',
        explanationEs:
          'Lo que falla de verdad es la crema solar, la hidratante y la base, no el producto. Toallitas y tónico en la mesa, todos los turnos.',
      },
    ],
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
    quiz: [
      {
        question: 'Her friend folds her arms and says "do not bother, it is a con." What is the move?',
        questionEs: 'Su amiga se cruza de brazos y suelta "ni te molestes, es un timo". ¿Cuál es la jugada?',
        options: [
          'Tell the friend she is wrong and show her the certificate',
          'Put the friend in the chair — thirty seconds on her hand',
          'Ignore the friend and keep selling to the interested one',
          'Ask the friend to step aside so your customer can decide alone',
        ],
        optionsEs: [
          'Decirle a la amiga que se equivoca y enseñarle el certificado',
          'Sienta a la amiga — treinta segundos en su mano',
          'Pasar de la amiga y seguir vendiéndole a la interesada',
          'Pedirle a la amiga que se aparte para que decida sola tu clienta',
        ],
        correctIndex: 1,
        explanation:
          'It is very hard to veto something you have just felt on your own skin. It costs you a minute and it turns the blocker into part of it.',
        explanationEs:
          'Es muy difícil vetar algo que acabas de notar en tu propia piel. Te cuesta un minuto y convierte a la que estorba en parte del asunto.',
      },
      {
        question: 'Both friends want it and both want a deal. How do you price it?',
        questionEs: 'Las dos amigas lo quieren y las dos quieren trato. ¿Cómo lo pones de precio?',
        options: [
          'One number for the pair — let them split it themselves',
          'Best price to the one who asked first, full price to the other',
          'A bit off each, so both of them feel they got something',
          'Two different numbers — whatever each one says she can pay',
        ],
        optionsEs: [
          'Un número para las dos — que se lo repartan ellas',
          'Mejor precio a la que preguntó primero y precio normal a la otra',
          'Un poco menos a cada una, para que las dos se lleven algo',
          'Dos números distintos — lo que diga cada una que puede pagar',
        ],
        correctIndex: 0,
        explanation:
          'Whatever you give one, the other will want. One deal for the group and you are defending one number instead of three.',
        explanationEs:
          'Lo que le des a una lo va a querer la otra. Un trato para el grupo y defiendes un número en vez de tres.',
      },
      {
        question: 'One of them has not said a word while her friend does all the talking. What do you assume?',
        questionEs: 'Una no ha abierto la boca mientras su amiga habla por las dos. ¿Qué das por hecho?',
        options: [
          'She is bored and waiting for her friend to finish up',
          'She is the one who will talk the other out of it later',
          'She may be the one with the money and no urge to argue',
          'She is not interested — put it all on the loud one instead',
        ],
        optionsEs: [
          'Que se aburre y espera a que su amiga termine',
          'Que luego será la que le quite la idea a la otra',
          'Que puede ser la del dinero y sin ganas de discutir',
          'Que no le interesa — céntrate solo en la escandalosa',
        ],
        correctIndex: 2,
        explanation:
          'The quiet one is very often the one holding the card. Bring her in warmly rather than writing her off.',
        explanationEs:
          'La callada es muchas veces la que lleva la tarjeta. Métela en el asunto con cariño en vez de descartarla.',
      },
    ],
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
          "Loss Aversion: If they head off on their own to \"get cash,\" most of them never arrive back. That is exactly why you do not send them — you walk over there with them.",
        ],
        itemsEs: [
          "Vergüenza: La gente se siente avergonzada cuando su tarjeta se declina. Manéjalo con total elegancia — le pasa a todos.",
          "Fatiga de Decisión: Ya decidieron comprar; el problema de pago es solo un bache. No dejes que se convierta en muro.",
          "Aversión a la Pérdida: Si se van solos a \"sacar efectivo\", la mayoría no aparece de vuelta. Justo por eso no los mandas — te vas con ellos.",
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
        text: "YOU: \"Card problems abroad are the WORST, I know. Happened to me in Barcelona last month. Here's what we can do: split it across two cards — or have you got Apple Pay or Google Pay on your phone? Sometimes that goes through when the plastic won't. Let's try.\" [Try it] \"And if it turns out to be cash you need, that's even easier. There's a machine two minutes that way.\" [Pick the bag up] \"I'll walk you over and carry this. Come on.\"",
        textEs: "TÚ: \"Los problemas de tarjeta en el extranjero son lo PEOR, lo sé. Me pasó en Barcelona el mes pasado. Esto es lo que podemos hacer: lo dividimos entre dos tarjetas — ¿o tienes Apple Pay o Google Pay en el móvil? A veces pasa cuando el plástico no. Vamos a probar.\" [Pruébalo] \"Y si al final lo que hace falta es efectivo, más fácil todavía. Hay un cajero a dos minutos por ahí.\" [Coge la bolsa] \"Te acompaño y te la llevo yo. Venga.\"",
      },
      {
        type: "subheader",
        text: "Script 3: The Full Flexibility Framework (Detailed)",
        textEs: "Guion 3: El Marco de Flexibilidad Completa (Detallado)",
      },
      {
        type: "script",
        text: "YOU: \"Okay, let's solve this together — because I don't want a little card hiccup to stop you from getting something you love.\" [Be calm, problem-solving tone] \"Let's go through our options one by one. Option one: do you have another card? Debit, credit, even a prepaid travel card?\" [If yes, try it] \"Option two: Apple Pay, Google Pay, Samsung Pay — anything on your phone?\" [If yes, set it up] \"Option three: split it. Half on this card, half in cash — or any combination you like, I will make the numbers work.\" [Work with them] \"Option four: cash — which honestly suits me even better. There's a machine two minutes that way. I'll walk you over and carry the bag. I'm not sending you, I'm coming with you.\" [Stay warm, keep the problem-solving tone] \"So... which one are we doing? Because I'm not letting you walk away from results like these over a card glitch.\"",
        textEs: "TÚ: \"Vale, resolvamos esto juntos — porque no quiero que un pequeño problema de tarjeta te impida llevarte algo que amas.\" [Sé calmado, tono de resolución de problemas] \"Revisemos nuestras opciones una por una. Opción uno: ¿tienes otra tarjeta? Débito, crédito, incluso una tarjeta de viaje prepagada?\" [Si sí, inténtala] \"Opción dos: Apple Pay, Google Pay, Samsung Pay — ¿algo en tu móvil?\" [Si sí, configúralo] \"Opción tres: lo partimos. La mitad en esta tarjeta, la mitad en efectivo — o como tú quieras, que yo cuadro los números.\" [Trabaja con ellos] \"Opción cuatro: efectivo, que además a mí me viene hasta mejor. Hay un cajero a dos minutos por ahí — te acompaño yo y te llevo la bolsa. No te mando, voy contigo.\" [Sigue cercano, en modo resolución] \"Entonces... ¿cuál hacemos? Porque no te voy a dejar marchar de unos resultados como estos por un fallo de tarjeta.\"",
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
          "Say \"come back later\": They will not. Not with a plan, not without one. Work down the options in front of her instead — and if it comes to cash, you put the bag under your arm and walk to the machine with her.",
          "Send them off with a consolation prize: No sample, no card, nothing to take away — that is the same walk-out with a goodbye gift attached. If the money genuinely is not there, be lovely about it, hands empty, and get straight back on the floor.",
        ],
        itemsEs: [
          "Mostrar frustración: Un suspiro o volteo de ojos cuando la tarjeta se declina mata el ambiente al instante.",
          "Hacerlos sentir pobres: \"¿Oh, no tienes suficiente?\" — Nunca. Asume que es un problema técnico, no financiero.",
          "Decir \"vuelve luego\": No van a volver. Ni con plan ni sin plan. Ve bajando por las opciones delante de ella — y si al final toca efectivo, te pones la bolsa bajo el brazo y vas con ella al cajero.",
          "Despedirlos con un premio de consolación: Ni muestra, ni tarjeta, nada para llevarse — eso es la misma marcha con un regalito de despedida. Si de verdad no está el dinero, sé encantador, con las manos vacías, y vuelve al ruedo.",
        ],
      },
      {
        type: "tip",
        text: "Know exactly where the nearest cash machine is, because that is your best answer and not your last one: \"Cash suits me even better, my love. There's a machine two minutes that way — I'll walk you over and carry the bag.\" You go WITH them. You never send them off on their own, however close it is, however sure she sounds, however busy the table is. Everything else stays right here in front of her: another card, the numbers typed in by hand, Apple Pay, Google Pay, two cards split. Work down that list out loud and one of them lands.",
        textEs: "Sábete exactamente dónde está el cajero más cercano, porque esa es tu mejor respuesta y no la última: \"En efectivo aún mejor, cariño. Hay un cajero a dos minutos — te acompaño yo y te llevo la bolsa.\" Vas CON ellos. Nunca los mandas solos, por cerca que esté, por muy segura que suene y por muy liada que esté la mesa. Todo lo demás se queda aquí delante de ella: otra tarjeta, los números metidos a mano, Apple Pay, Google Pay, dividirlo entre dos tarjetas. Ve bajando esa lista en voz alta y una de ellas entra.",
      },
    ],
    quiz: [
      {
        question: 'Her card is refused and she has not got another one. What do you say?',
        questionEs: 'Le rechazan la tarjeta y no tiene otra. ¿Qué le dices?',
        options: [
          '"Cash suits me even better — I will walk you over and carry the bag"',
          '"There is a machine right across the street, I will hold this for you"',
          '"Take my card and come back once the bank has sorted it out"',
          '"No problem, we can put your name on one and keep it behind the till"',
        ],
        optionsEs: [
          '"En efectivo aún mejor — te acompaño yo y te llevo la bolsa"',
          '"Hay un cajero justo enfrente, yo te lo guardo mientras tanto"',
          '"Toma mi tarjeta y vuelve cuando el banco te lo arregle"',
          '"Sin problema, le ponemos tu nombre y lo dejamos aquí en caja"',
        ],
        correctIndex: 0,
        explanation:
          'Cash is not a problem, it is a walk. You go with her and the bag goes with you — the one thing you never do is send her off on her own.',
        explanationEs:
          'El efectivo no es un problema, es un paseo. Vas con ella y la bolsa va contigo — lo único que no haces nunca es mandarla sola.',
      },
      {
        question: 'Why do you never send her to the cash machine on her own?',
        questionEs: '¿Por qué no la mandas nunca sola al cajero?',
        options: [
          'She will spend the money on something else along the way there',
          'The shop is not allowed to hold stock for anybody',
          'She will find a friend who talks her out of it',
          'Out of that door she is gone, however much she meant it',
        ],
        optionsEs: [
          'Se gastará el dinero en otra cosa por el camino hasta allí',
          'La tienda no puede guardarle género a nadie',
          'Se encontrará a una amiga que le quite la idea',
          'En cuanto sale por esa puerta se acabó, lo dijera como lo dijera',
        ],
        correctIndex: 3,
        explanation:
          'The feeling she has in that chair does not survive a five-minute walk on her own. Keep her with you and keep the sale alive.',
        explanationEs:
          'Lo que siente en esa silla no aguanta cinco minutos de paseo ella sola. Que se quede contigo y la venta sigue viva.',
      },
      {
        question: 'Her card has just been refused in front of a queue and she has gone red. What do you do first?',
        questionEs: 'Le acaban de rechazar la tarjeta delante de una cola y se ha puesto roja. ¿Qué haces primero?',
        options: [
          'Ask her quietly whether she has got enough in the account',
          'Laugh it off and try typing the numbers in by hand',
          'Announce to the queue that the terminal has been playing up',
          'Say nothing and let her work out what she wants to do next',
        ],
        optionsEs: [
          'Preguntarle bajito si le queda saldo en la cuenta',
          'Quitarle hierro y probar metiendo los números a mano',
          'Anunciarle a la cola que el datáfono va fatal hoy',
          'No decir nada y dejar que ella decida qué hacer ahora',
        ],
        correctIndex: 1,
        explanation:
          'Assume it is the machine, never her money. Warm, quick and unbothered, and the embarrassment never gets a chance to start.',
        explanationEs:
          'Da por hecho que es la máquina, nunca su dinero. Con calor, rápido y sin darle importancia, y la vergüenza no llega ni a empezar.',
      },
    ],
  },
};

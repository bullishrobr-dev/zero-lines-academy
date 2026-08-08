// ─────────────────────────────────────────────────────────────────────────────
// closingLessons.ts — the part of the sale nobody had written down.
//
// The academy had seven lessons on stopping someone in the street and eight on
// product knowledge, and then a hole where the actual sale happens: the five
// metres from the pavement to the chair, the moment you ask for the money, and
// the ninety seconds between "yes" and "paid". Sellers were being taught how to
// start a conversation and how to describe a syringe, and left to guess the
// bit in between.
//
// ── WHOSE WORDS THESE ARE ───────────────────────────────────────────────────
// The owner's, dictated and kept in his voice rather than rewritten into
// textbook sales language. Where he explained WHY something works, that
// reasoning is here too, because the reasoning is what lets a seller adapt it
// instead of parroting it. Nothing here is invented: if he did not say it, it
// is not in this file.
//
// Same content rules as the rest of src/data: {currency} instead of a symbol,
// {locationName} instead of a shop name, every price a rung on a pricing.ts
// ladder, European Spanish in the informal tú.
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from './lessons';

export const closingLessons: Record<string, Lesson> = {
  /*
   * The frame for everything else in this category, and the reason it sits
   * first.
   *
   * The app taught technique for a year without ever telling a new starter what
   * KIND of selling this is, so they read it as pharmacy retail and behaved
   * accordingly — quiet, careful, one price, apologising for the number. Two
   * independent tone audits found the same thing from opposite ends of the
   * content: lessons that filed ordinary street theatre ("two left", "just for
   * you") under lying, next to lessons that taught scarcity as a principle.
   *
   * This is the positive statement of the thing those fixes were clearing space
   * for. It is the owner's own description of the trade — "a little bit of a
   * bargain, a little bit of a market" — turned into a mechanism a seller can
   * actually do differently tomorrow: a reason on every rung, make them ask
   * twice, the conspiracy rung, let them win, stop at yes.
   *
   * The one hard rule in it is section 7, and it is deliberately framed as
   * money rather than manners, because that is what it is: a promise the shop
   * must honour and a claim about somebody's body are the two things that land
   * back on the shop after the seller has clocked off. Everything else is fair
   * game and the lesson says so, loudly, first.
   */
  'close-market': {
    id: 'close-market',
    categoryId: 'closing',
    title: "It's a Market, Not a Pharmacy",
    titleEs: 'Esto es un Mercado, No una Farmacia',
    subtitle: 'The haggle is the product — and both of you already know it',
    subtitleEs: 'El regateo es el producto — y los dos lo sabéis ya',
    duration: '6 min',
    icon: 'Sparkles',
    order: 1,
    xpReward: 120,
    sections: [
      {
        type: 'header',
        text: "It's a market, not a pharmacy",
        textEs: 'Esto es un mercado, no una farmacia',
      },
      {
        type: 'paragraph',
        text: `Nobody has told you this yet, so I will. Go outside and look at where you actually work. There is no white coat, no appointment, no little sticker with a fixed price on it. There is a chair, a table, a bit of product and a person with good energy stopping strangers in the street. That is a market stall. Behind a counter you wait to be asked and nobody touches anything until they have paid. On a stall you talk first, you put it in their hand, and the number is the start of the conversation instead of the end of it.`,
        textEs: `Nadie te lo ha dicho todavía, así que te lo digo yo. Sal fuera y mira dónde trabajas de verdad. No hay bata blanca, no hay cita previa, no hay una etiqueta con un precio fijo. Hay una silla, una mesa, un poco de producto y una persona con buena energía parando a desconocidos en la calle. Eso es un puesto de mercado. Detrás de un mostrador esperas a que te pregunten y nadie toca nada hasta que ha pagado. En un puesto hablas tú primero, se lo pones en la mano, y el número es el principio de la conversación, no el final.`,
      },
      {
        type: 'keypoint',
        text: `If you walked in here thinking pharmacy — quiet voice, careful words, one price — you are going to have a very slow week. And here is the bit that costs you money: the customer copies you. Stiff seller, stiff customer. You play, they play back. Your energy sets the temperature of the whole thing before a single number leaves your mouth.`,
        textEs: `Si has entrado aquí pensando en una farmacia — voz bajita, palabras con cuidado, un solo precio — te espera una semana muy lenta. Y esto es lo que te cuesta dinero: el cliente te copia. Vendedor tieso, cliente tieso. Si tú juegas, ellos juegan. Tu energía marca la temperatura de todo antes de que salga un solo número de tu boca.`,
      },
      {
        type: 'script',
        text: `"Come here one second — you're going to like this, I promise. Give me your hand."`,
        textEs: `"Ven un segundo — esto te va a gustar, te lo prometo. Dame la mano."`,
      },

      {
        type: 'subheader',
        text: "They already know the first price isn't the last price",
        textEs: 'Ya saben que el primer precio no es el último',
      },
      {
        type: 'paragraph',
        text: `This is what new sellers get wrong about haggling. They think it is something they are pulling on somebody. It isn't. This person walked up to a stall in the street — they have known how this works since they were a kid. So when they say "is that your best price?" they are not catching you out, they are joining in. If they honestly thought {currency}60 was carved in stone they would have said no thanks and kept walking. Instead they are standing there asking you a question. That is not resistance, that is the game starting. They know it is a performance. They enjoy it anyway — the same way you enjoy a haggle on holiday.`,
        textEs: `Esto es lo que los vendedores nuevos entienden mal del regateo. Se creen que se lo están colando a alguien. Y no. Esta persona se ha acercado a un puesto en la calle — sabe cómo funciona esto desde pequeña. Así que cuando te dice "¿es tu mejor precio?" no te está pillando, se está apuntando. Si de verdad pensara que los {currency}60 están grabados en piedra, habría dicho "no, gracias" y habría seguido andando. En vez de eso está ahí parada haciéndote una pregunta. Eso no es resistencia, es que empieza el juego. Saben que es una función. Y aun así les gusta — igual que a ti te gusta regatear cuando estás de viaje.`,
      },
      {
        type: 'script',
        text: `"Ha — of course that's not my best price. What do you think this is, a supermarket? Come on, talk to me."`,
        textEs: `"Ja — claro que no es mi mejor precio. ¿Qué te crees, que esto es un supermercado? Venga, habla conmigo."`,
      },

      {
        type: 'subheader',
        text: "Say the number and don't flinch",
        textEs: 'Di el número y no te encojas',
      },
      {
        type: 'keypoint',
        text: `Say it warm, say it flat, then shut up. Do not wince. Do not say "it's only". Do not say "I know it's a bit pricey, but". The second you flinch at your own number you have told them the number is wrong — and now they are not haggling with you, they are rescuing you, downwards. Serious and careful is what you do when you do not believe your own price.`,
        textEs: `Dilo con calor, dilo plano, y luego cállate. No hagas una mueca. No digas "son solo". No digas "ya sé que es un poco caro, pero". En cuanto te encoges con tu propio número, les has dicho que el número está mal — y ahora no están regateando contigo, te están rescatando, hacia abajo. Serio y prudente es lo que haces cuando no te crees tu propio precio.`,
      },
      {
        type: 'paragraph',
        text: `Your body says the same thing. Small and apologetic, and {currency}60 sounds like a lot of money. Easy, open, having a good day, and {currency}60 sounds like nothing at all.`,
        textEs: `Tu cuerpo dice lo mismo. Pequeño y disculpándote, y {currency}60 suenan a mucho dinero. Suelto, abierto, pasándotelo bien, y {currency}60 no suenan a nada.`,
      },
      {
        type: 'script',
        text: `If they go tense on the number: "Relax, I'm not a dentist. It's hand cream."`,
        textEs: `Si se tensan con el número: "Tranquila, que no soy dentista. Es crema de manos."`,
      },

      {
        type: 'subheader',
        text: 'Every rung needs a reason',
        textEs: 'Cada escalón necesita un motivo',
      },
      {
        type: 'paragraph',
        text: `The ladder is a performance, and a performance needs a reason. If the price just falls, it was never a price. {currency}60 to {currency}30 in twenty seconds is not a discount, it is an announcement that you were making the numbers up. So every rung gets three things: a pause, a face, and a reason. Look at the product. Look at the door. Suck your teeth. Breathe out like it actually hurts. Then give the reason — and the reason is always about them, never about the product. The product never gets cheaper. The product stays brilliant. What changed is that today, for this one person, you have decided to do something.`,
        textEs: `La escalera es una función, y una función necesita un motivo. Si el precio simplemente cae, nunca fue un precio. De {currency}60 a {currency}30 en veinte segundos no es un descuento, es anunciar que te estabas inventando los números. Así que cada escalón lleva tres cosas: una pausa, una cara y un motivo. Mira el producto. Mira a la puerta. Chasquea la lengua. Suelta el aire como si te doliera de verdad. Y luego da el motivo — y el motivo siempre es por ellos, nunca por el producto. El producto nunca baja de categoría. El producto sigue siendo buenísimo. Lo que ha cambiado es que hoy, por esta persona, has decidido hacer algo.`,
      },
      {
        type: 'script',
        text: `"My last customer only took one. Let me do something nice for you."`,
        textEs: `"Mi última clienta se llevó solo uno. Déjame hacerte algo bonito."`,
      },

      {
        type: 'subheader',
        text: 'And make them ask twice before you move once',
        textEs: 'Y que te lo pidan dos veces antes de moverte una',
      },
      {
        type: 'paragraph',
        text: `First "ooh, that's a bit expensive" and the nervous seller jumps straight to the floor to feel safe. That is the most expensive habit in this shop. You have handed over {currency}30 nobody asked you for, and you have taught them the numbers move when they push — so they push again, and now your floor is not a floor. Get to your last price in ten seconds and they will not believe it is your last price. They are right not to.`,
        textEs: `Al primer "uy, es un poco caro" el vendedor nervioso salta directo al suelo para sentirse seguro. Es la costumbre más cara de esta tienda. Has regalado {currency}30 que nadie te había pedido, y les has enseñado que los números se mueven si empujan — así que empujan otra vez, y ahora tu suelo ya no es un suelo. Llega a tu último precio en diez segundos y no se van a creer que es tu último precio. Y hacen bien.`,
      },
      {
        type: 'script',
        text: `When they push early: "Whoa, whoa, whoa. I've known you thirty seconds and you're already trying to rob me."`,
        textEs: `Cuando empujan pronto: "Eh, eh, eh. Hace treinta segundos que te conozco y ya me estás robando."`,
      },

      {
        type: 'subheader',
        text: 'The little conspiracy',
        textEs: 'La pequeña conspiración',
      },
      {
        type: 'paragraph',
        text: `The strongest rung on the ladder is not the cheapest one. It is the one that arrives with a secret. Voice down. Quick look at the door. Lean in a bit. Now it is the two of you on the same side — against the price list, against my boss, against everyone else walking in here today who is going to pay full. They are not buying a cheaper thing, they are buying a moment where somebody bent something just for them. And it survives the walk home: when they tell their friend about it tonight, they tell them the story. They never remember the number.`,
        textEs: `El escalón más fuerte de la escalera no es el más barato. Es el que llega con un secreto. Baja la voz. Mirada rápida a la puerta. Acércate un poco. Ahora sois los dos del mismo lado — contra la lista de precios, contra mi jefe, contra todos los demás que entren hoy y paguen el precio entero. No están comprando algo más barato, están comprando un momento en el que alguien dobló algo solo por ellos. Y eso les dura hasta casa: cuando esta noche se lo cuenten a una amiga, le cuentan la historia. Del número no se acuerdan nunca.`,
      },
      {
        type: 'script',
        text: `"You really love it, don't you — you haven't stopped touching your hands. Alright: {currency}30 for the one. But zip it, this stays between us."`,
        textEs: `"Te encanta de verdad, ¿eh? No paras de tocarte las manos. Venga: {currency}30 por uno. Pero chitón, que esto queda entre nosotros."`,
      },

      {
        type: 'subheader',
        text: 'Let them win',
        textEs: 'Déjales ganar',
      },
      {
        type: 'paragraph',
        text: `Nobody at a market wants the lowest price. They want the story: "I got him down." So build them the moment where they get you. Ask for their number and make them say it out loud. Hold, hold, hold — then collapse all at once, hands in the air, like they have genuinely beaten something out of you. It costs you exactly the same as caving at the start and it feels completely different to the person paying. Nobody brags to their mates about a discount that was just sitting there.`,
        textEs: `Nadie en un mercado quiere el precio más bajo. Quieren la historia: "le he tirado el precio". Así que constrúyeles el momento en el que te ganan. Pídeles su número y haz que lo digan en voz alta. Aguanta, aguanta, aguanta — y luego derrúmbate de golpe, manos arriba, como si de verdad te hubieran sacado algo. Te cuesta exactamente lo mismo que ceder al principio y se siente completamente distinto para quien paga. Nadie presume delante de sus amigas de un descuento que ya estaba ahí puesto.`,
      },
      {
        type: 'keypoint',
        text: `One rule: when you go, go. Half a surrender is worse than none — they can smell it, and they will keep pushing.`,
        textEs: `Una regla: cuando cedas, cede. Media rendición es peor que ninguna — lo huelen, y siguen empujando.`,
      },
      {
        type: 'script',
        text: `"Go on then, give me your number… Ooof. You're a hard one, you." … "Fine. FINE. You've killed me. Take it. But you're not telling anybody what you paid, alright?"`,
        textEs: `"Venga, dime tu número… Buf. Menuda eres tú." … "Vale. VALE. Me has matado. Llévatelo. Pero no le dices a nadie lo que has pagado, ¿eh?"`,
      },

      { type: 'divider' },
      {
        type: 'header',
        text: 'Where the game stops — and it is about money, not manners',
        textEs: 'Dónde se acaba el juego — y es por dinero, no por modales',
      },
      {
        type: 'paragraph',
        text: `Everything above is fair game. All of it. The price theatre, "just for you", "my last customer", "between us", how much you personally love the stuff — that is the market, do the lot, that is why people stop here instead of walking into a chemist.`,
        textEs: `Todo lo de arriba vale. Todo. El teatro del precio, "solo para ti", "mi última clienta", "que quede entre nosotros", lo mucho que te gusta a ti el producto — eso es el mercado, hazlo todo, por eso la gente para aquí en vez de entrar en una farmacia.`,
      },
      {
        type: 'keypoint',
        text: `Two things sit outside the game, and not because anybody is offended — because they land back on the shop after you have clocked off. ONE: never promise anything the shop has to do once they are out that door. Money back, sort it at the border, come back next year and we'll swap it. You will not be there. The shop will, and somebody else has to have that argument. TWO: never tell anybody what it does to their body — what it treats, what it is safe with, what a doctor reckons about it. That is the one that turns a delighted customer into a real problem. Sell the shine, the look, the feeling, the price. Not medicine, and not promises with a date on them.`,
        textEs: `Dos cosas se quedan fuera del juego, y no porque nadie se ofenda — porque caen sobre la tienda cuando tú ya te has ido a casa. UNA: no prometas nunca nada que la tienda tenga que cumplir cuando ya han salido por esa puerta. Devolver el dinero, arreglarlo en la frontera, vuelve el año que viene y te lo cambiamos. Tú no vas a estar. La tienda sí, y otra persona tiene que tener esa discusión. DOS: no le digas nunca a nadie lo que le hace a su cuerpo — qué cura, con qué es seguro, qué opina un médico. Esa es la que convierte a una clienta encantada en un problema de verdad. Vende el brillo, el aspecto, la sensación, el precio. Ni medicina, ni promesas con fecha.`,
      },
      {
        type: 'script',
        text: `"Look, I'm not a doctor — I'm a stall on a corner with very good hand cream. But look at that shine on you."`,
        textEs: `"Mira, no soy médico — soy un puesto en una esquina con una crema de manos buenísima. Pero mírate qué brillo."`,
      },

      {
        type: 'tip',
        text: `The second they say yes, the haggle is over. Stop selling. Stop dropping. Do not sweeten it, do not throw in one more thing, do not get nervous and fill the silence with another gift nobody asked for — that is you still playing a game that ended a minute ago, and all it does is make them wonder what else was on the table. Switch straight into lovely: quick, easy, ask about their trip, go and get the machine. The theatre was for getting to yes. After yes, you are just a nice person taking their money.`,
        textEs: `En cuanto dicen que sí, se acabó el regateo. Deja de vender. Deja de bajar. No lo endulces, no metas una cosa más, no te pongas nervioso y llenes el silencio con otro regalo que nadie te ha pedido — eso eres tú jugando todavía a un juego que se acabó hace un minuto, y lo único que consigue es que se pregunten qué más había encima de la mesa. Pasa directo a modo encantador: rápido, fácil, pregúntales por el viaje, ve a por el datáfono. El teatro era para llegar al sí. Después del sí, solo eres una persona simpática cobrándoles.`,
      },
    ],
    quiz: [
      {
        question: 'A customer asks "is that your best price?" What is actually happening?',
        questionEs: 'Un cliente pregunta "¿es tu mejor precio?" ¿Qué está pasando de verdad?',
        options: [
          'Resistance — they are about to walk away',
          'Them joining in — the game has started',
          'A sign you priced it too high for them',
          'A cue to go straight to your floor price',
        ],
        optionsEs: [
          'Resistencia — están a punto de irse',
          'Se están apuntando — empieza el juego',
          'Señal de que les has pedido demasiado',
          'Que vayas directo a tu precio mínimo',
        ],
        correctIndex: 1,
        explanation:
          'If they thought the price was fixed they would have said no thanks and kept walking. Standing there asking is the haggle starting.',
        explanationEs:
          'Si pensaran que el precio es fijo, habrían dicho "no, gracias" y habrían seguido andando. Que se queden preguntando es que empieza el regateo.',
      },
      {
        question: 'Why does dropping from {currency}60 to {currency}30 in twenty seconds cost you?',
        questionEs: '¿Por qué te cuesta caro bajar de {currency}60 a {currency}30 en veinte segundos?',
        options: [
          'It teaches them pushing moves the numbers',
          'It breaks the minimum margin the shop sets',
          'It makes the product look like poor quality',
          'It leaves you nothing to give away later',
        ],
        optionsEs: [
          'Les enseñas que empujar mueve los números',
          'Te saltas el margen mínimo que fija la tienda',
          'Hace que el producto parezca de mala calidad',
          'Te quedas sin nada que regalar más adelante',
        ],
        correctIndex: 0,
        explanation:
          'You handed over money nobody asked for, and taught them the numbers move when they push — so they push again, and your floor stops being a floor.',
        explanationEs:
          'Has regalado dinero que nadie te pidió y les has enseñado que los números se mueven si empujan — así que empujan otra vez, y tu suelo deja de ser un suelo.',
      },
      {
        question: 'Which is the strongest rung on the ladder?',
        questionEs: '¿Cuál es el escalón más fuerte de la escalera?',
        options: [
          'The cheapest one, because it removes every objection',
          'The first one, because it anchors everything after',
          'The one that arrives like a secret, just for them',
          'Whichever one matches their budget most closely',
        ],
        optionsEs: [
          'El más barato, porque quita todas las objeciones',
          'El primero, porque ancla todo lo que viene después',
          'El que llega como un secreto, solo para ellos',
          'El que más se ajuste a lo que pueden gastarse',
        ],
        correctIndex: 2,
        explanation:
          'They are not buying a cheaper thing. They are buying a moment where somebody bent something just for them — and that is the bit they tell their friend about tonight.',
        explanationEs:
          'No están comprando algo más barato. Están comprando un momento en el que alguien dobló algo solo por ellos — y eso es lo que le cuentan esta noche a una amiga.',
      },
      {
        question: 'They say yes. What is the next thing you do?',
        questionEs: 'Dicen que sí. ¿Qué es lo siguiente que haces?',
        options: [
          'Throw in one more gift to lock it in',
          'Confirm the price out loud so there is no confusion',
          'Ask if they want to add a second product',
          'Stop selling and go and get the card machine',
        ],
        optionsEs: [
          'Meter un regalo más para asegurarlo',
          'Confirmar el precio en voz alta para que no haya líos',
          'Preguntar si quieren añadir un segundo producto',
          'Dejar de vender e ir a por el datáfono',
        ],
        correctIndex: 3,
        explanation:
          'The theatre was for getting to yes. Carrying on after it just makes them wonder what else was on the table.',
        explanationEs:
          'El teatro era para llegar al sí. Seguir después solo hace que se pregunten qué más había encima de la mesa.',
      },
    ],
  },

  'close-1': {
    id: 'close-1',
    categoryId: 'closing',
    title: 'The Bring',
    titleEs: 'Meterlos Dentro',
    subtitle: 'The five metres from the pavement to the chair',
    subtitleEs: 'Los cinco metros de la acera a la silla',
    duration: '5 min',
    icon: 'DoorOpen',
    order: 2,
    xpReward: 120,
    sections: [
      {
        type: 'header',
        text: 'The gap nobody teaches',
        textEs: 'El hueco que nadie enseña',
      },
      {
        type: 'paragraph',
        text: `You know how to stop someone. You know the product. The place most sales die is the bit between those two things — the five metres from where they are standing to the chair inside the shop. Get this wrong and you lose people you had already won.`,
        textEs: `Sabes parar a alguien. Te sabes el producto. Donde más ventas se mueren es en lo que hay entre esas dos cosas — los cinco metros desde donde están de pie hasta la silla dentro de la tienda. Falla esto y pierdes a gente que ya tenías ganada.`,
      },
      {
        type: 'keypoint',
        text: `The whole technique is an order of operations. Do the steps in the wrong order and each one stops working.`,
        textEs: `Toda la técnica es un orden de operaciones. Haz los pasos en el orden equivocado y cada uno deja de funcionar.`,
      },

      {
        type: 'subheader',
        text: 'Step 1 — Get the look before you move',
        textEs: 'Paso 1 — Consigue la mirada antes de moverte',
      },
      {
        type: 'paragraph',
        text: `Before you approach anybody with the sample, get their attention. You want them looking at you BEFORE you take a single step. Not while you walk — before.`,
        textEs: `Antes de acercarte a nadie con la muestra, consigue su atención. Quieres que te estén mirando ANTES de dar un solo paso. No mientras andas — antes.`,
      },
      {
        type: 'script',
        text: `"Hi guys, how you doing?"`,
        textEs: `"Hola chicos, ¿qué tal?"`,
      },
      {
        type: 'paragraph',
        text: `If they look at you, now you raise the sample and start walking towards them. If they do not look, you have lost nothing — you did not commit. Walking at someone who has not looked at you is how you become a person to avoid.`,
        textEs: `Si te miran, ahora levantas la muestra y empiezas a andar hacia ellos. Si no te miran, no has perdido nada — no te has comprometido. Andar hacia alguien que no te ha mirado es cómo te conviertes en una persona a evitar.`,
      },

      {
        type: 'subheader',
        text: 'Step 2 — Say the objection before they can',
        textEs: 'Paso 2 — Di la objeción antes que ellos',
      },
      {
        type: 'paragraph',
        text: `The single most common thing a person says to get away from you is "sorry, I'm in a rush." So say it first. Once it has come out of your mouth, it is no longer available as an escape — they cannot use a reason you have already accepted.`,
        textEs: `Lo que más dice la gente para escaparse de ti es "perdona, voy con prisa". Así que dilo tú primero. Una vez que ha salido de tu boca, ya no les sirve de escape — no pueden usar una razón que tú ya has aceptado.`,
      },
      {
        type: 'script',
        text: `"Listen, I know you're in a rush — but can I ask you something really quick? It's just that you look so good, I have to ask what you normally use on your skin."`,
        textEs: `"Mira, sé que vas con prisa — ¿pero te puedo preguntar una cosa rapidísima? Es que te veo tan bien que tengo que preguntarte qué usas normalmente para la piel."`,
      },
      {
        type: 'paragraph',
        text: `Two things are doing work in that sentence. The rush is pre-killed. And the question is a genuine compliment that they have to answer with a real answer — you cannot say yes or no to "what do you use?".`,
        textEs: `Hay dos cosas trabajando en esa frase. La prisa está desactivada. Y la pregunta es un cumplido de verdad que les obliga a dar una respuesta real — a "¿qué usas?" no puedes contestar sí o no.`,
      },

      {
        type: 'subheader',
        text: 'Step 3 — The gift, then turn around',
        textEs: 'Paso 3 — El regalo, y date la vuelta',
      },
      {
        type: 'paragraph',
        text: `Whatever they answer, you are impressed by it. Then you give them a reason to move that costs them nothing.`,
        textEs: `Contesten lo que contesten, te parece impresionante. Luego les das un motivo para moverse que no les cuesta nada.`,
      },
      {
        type: 'script',
        text: `"Really? No way. You know what — I'm going to give you a small gift. You're going to love it."`,
        textEs: `"¿En serio? No me lo creo. ¿Sabes qué? Te voy a dar un regalito. Te va a encantar."`,
      },
      {
        type: 'keypoint',
        text: `Now turn around and walk into the shop. Do NOT check whether they are following you. Checking asks permission, and asking permission gives them the chance to say no.`,
        textEs: `Ahora date la vuelta y entra en la tienda. NO compruebes si te están siguiendo. Comprobar es pedir permiso, y pedir permiso les da la oportunidad de decir que no.`,
      },

      {
        type: 'subheader',
        text: 'Step 4 — Only now, look back',
        textEs: 'Paso 4 — Ahora sí, mira atrás',
      },
      {
        type: 'paragraph',
        text: `Once you are inside the shop — and only then — turn your head and see who came. If they are still on the pavement, call them in warmly. You are not begging; you are holding a door open.`,
        textEs: `Una vez dentro de la tienda — y solo entonces — gira la cabeza y mira quién ha venido. Si siguen en la acera, llámalos con buen rollo. No estás suplicando; estás sujetando una puerta abierta.`,
      },
      {
        type: 'script',
        text: `"Come, guys, don't worry — it's really quick. You're going to love it."`,
        textEs: `"Venid, chicos, no os preocupéis — es rapidísimo. Os va a encantar."`,
      },
      {
        type: 'paragraph',
        text: `You never walk beside them and you never escort them. You walk first and you call them to come. Walking them in makes it feel like being taken somewhere; walking ahead makes it feel like following someone who has something.`,
        textEs: `Nunca andas a su lado y nunca los acompañas. Andas tú primero y los llamas. Acompañarlos hace que parezca que los están llevando a algún sitio; ir delante hace que parezca que siguen a alguien que tiene algo.`,
      },

      {
        type: 'subheader',
        text: 'Step 5 — Where you sit them',
        textEs: 'Paso 5 — Dónde los sientas',
      },
      {
        type: 'paragraph',
        text: `Put them in the chair facing into the shop — facing the wall — never facing the street. If they can see the pavement moving past, they start thinking about being back out on it. Take the street out of their eyeline and you have their whole attention.`,
        textEs: `Siéntalos en la silla mirando hacia dentro de la tienda — hacia la pared — nunca hacia la calle. Si ven el movimiento de la acera, empiezan a pensar en volver a ella. Quita la calle de su campo de visión y tienes toda su atención.`,
      },

      {
        type: 'divider',
      },
      {
        type: 'header',
        text: 'When there are two of them',
        textEs: 'Cuando son dos',
      },
      {
        type: 'paragraph',
        text: `One is interested and the other is already walking. This is the most common way a good stop dies. Deal with the one who is leaving, quickly and lightly.`,
        textEs: `Uno está interesado y el otro ya se está yendo. Es la forma más habitual de que se muera una buena parada. Ocúpate del que se va, rápido y con ligereza.`,
      },
      {
        type: 'script',
        text: `"It's two seconds of your time, I promise — she's going to love it."`,
        textEs: `"Son dos segundos, te lo prometo — le va a encantar."`,
      },
      {
        type: 'paragraph',
        text: `If the energy is bad rather than busy, give him permission to stand back instead of arguing with him. Said light, with a smile, this takes the pressure off him completely.`,
        textEs: `Si la energía es mala en vez de tener prisa, dale permiso para apartarse en vez de discutir con él. Dicho ligero, con una sonrisa, le quita la presión del todo.`,
      },
      {
        type: 'script',
        text: `"Don't worry, it's ladies' business anyway."`,
        textEs: `"No te preocupes, esto es cosa de chicas de todas formas."`,
      },
      {
        type: 'keypoint',
        text: `And if the partner is genuinely hostile — let them go. Do not spend your energy on someone who has decided to be difficult. Keep it on the person who is still listening to you.`,
        textEs: `Y si la pareja va de verdad en contra — déjalo. No gastes tu energía en alguien que ha decidido ponerse difícil. Guárdala para la persona que todavía te escucha.`,
      },

      {
        type: 'subheader',
        text: 'They freeze in the doorway',
        textEs: 'Se quedan clavados en la puerta',
      },
      {
        type: 'script',
        text: `"Come on guys, it's two seconds of your time. I promise you need to see this."`,
        textEs: `"Venga chicos, son dos segundos de vuestro tiempo. Os prometo que tenéis que ver esto."`,
      },

      {
        type: 'tip',
        text: `There are a hundred tricks on top of this, and you will build your own. But this is the skeleton: get the look, kill the rush, ask a real question, promise a gift, turn and walk, then look back. Learn it in that order before you start improvising on it.`,
        textEs: `Encima de esto hay cien trucos, y te construirás los tuyos. Pero este es el esqueleto: consigue la mirada, mata la prisa, haz una pregunta de verdad, promete un regalo, date la vuelta y anda, y luego mira atrás. Apréndetelo en ese orden antes de ponerte a improvisar.`,
      },
    ],
    quiz: [
      {
        question: 'When do you take your first step towards someone?',
        questionEs: '¿Cuándo das el primer paso hacia alguien?',
        options: [
          'As soon as you have picked out who to approach',
          'Only after they have looked at you',
          'While you are still saying your opening line',
          'When they slow down or stop walking',
        ],
        optionsEs: [
          'En cuanto has elegido a quién acercarte',
          'Solo después de que te hayan mirado',
          'Mientras todavía estás diciendo tu frase de apertura',
          'Cuando aflojan el paso o se paran',
        ],
        correctIndex: 1,
        explanation:
          'Get their attention first — "Hi guys, how you doing?" — and wait. Walking at someone who has not looked at you makes you a person to avoid.',
        explanationEs:
          'Consigue primero su atención — "Hola chicos, ¿qué tal?" — y espera. Andar hacia alguien que no te ha mirado te convierte en una persona a evitar.',
      },
      {
        question: 'Why do you say "I know you\'re in a rush" yourself?',
        questionEs: '¿Por qué dices tú mismo "sé que vas con prisa"?',
        options: [
          'It shows respect and makes you seem polite',
          'It makes the conversation feel shorter than it is',
          'It takes away the excuse they were about to use',
          'It gives you a natural reason to speak faster',
        ],
        optionsEs: [
          'Demuestra respeto y te hace parecer educado',
          'Hace que la conversación parezca más corta de lo que es',
          'Les quita la excusa que estaban a punto de usar',
          'Te da un motivo natural para hablar más rápido',
        ],
        correctIndex: 2,
        explanation:
          'The rush is the most common escape line there is. Once you have said it and accepted it, they cannot use it against you.',
        explanationEs:
          'La prisa es la excusa de escape más común que hay. Una vez que la has dicho y la has aceptado, ya no pueden usarla contra ti.',
      },
      {
        question: 'After you offer the gift and turn around, what do you do?',
        questionEs: 'Después de ofrecer el regalo y darte la vuelta, ¿qué haces?',
        options: [
          'Glance back to check they are coming',
          'Wait at the door and hold it open for them',
          'Walk beside them so they do not feel alone',
          'Walk in without looking back at all',
        ],
        optionsEs: [
          'Miras atrás para comprobar que vienen',
          'Esperas en la puerta y se la sujetas abierta',
          'Andas a su lado para que no se sientan solos',
          'Entras sin mirar atrás en ningún momento',
        ],
        correctIndex: 3,
        explanation:
          'Checking asks permission, and asking permission gives them a chance to say no. You look back only once you are already inside.',
        explanationEs:
          'Comprobar es pedir permiso, y pedir permiso les da la oportunidad de decir que no. Miras atrás solo cuando ya estás dentro.',
      },
      {
        question: 'Which way should the chair face?',
        questionEs: '¿Hacia dónde debe mirar la silla?',
        options: [
          'Into the shop, away from the street',
          'Towards the street so they feel free to go',
          'Towards the counter and the card machine',
          'Whichever way has the best light for the demo',
        ],
        optionsEs: [
          'Hacia dentro de la tienda, lejos de la calle',
          'Hacia la calle para que se sientan libres de irse',
          'Hacia la caja y el datáfono',
          'Hacia donde haya mejor luz para la demo',
        ],
        correctIndex: 0,
        explanation:
          'If they can see the pavement moving past, they start thinking about being back out on it. Take the street out of their eyeline.',
        explanationEs:
          'Si ven pasar el movimiento de la acera, empiezan a pensar en volver a ella. Quita la calle de su campo de visión.',
      },
    ],
  },

  'close-2': {
    id: 'close-2',
    categoryId: 'closing',
    title: 'Asking For The Money',
    titleEs: 'Pedir el Dinero',
    subtitle: 'The moment most sellers get quiet, and should not',
    subtitleEs: 'El momento en que la mayoría se calla, y no debería',
    duration: '4 min',
    icon: 'Coins',
    order: 3,
    xpReward: 120,
    sections: [
      {
        type: 'header',
        text: 'Ask which, never whether',
        textEs: 'Pregunta cuál, nunca si',
      },
      {
        type: 'paragraph',
        text: `Almost everybody pays by card. So do not ask them whether they are buying — assume they are, and ask a small, easy question about how. A question about the method is a question that only makes sense if the sale is already happening.`,
        textEs: `Casi todo el mundo paga con tarjeta. Así que no les preguntes si van a comprar — dalo por hecho y hazles una pregunta pequeña y fácil sobre cómo. Una pregunta sobre el método solo tiene sentido si la venta ya está pasando.`,
      },
      {
        type: 'script',
        text: `"I guess you're paying by card, aren't you? Visa or Mastercard?"`,
        textEs: `"Supongo que pagas con tarjeta, ¿no? ¿Visa o Mastercard?"`,
      },

      {
        type: 'subheader',
        text: 'Then do NOT go silent',
        textEs: 'Y luego NO te calles',
      },
      {
        type: 'paragraph',
        text: `You will have been told to ask for the sale and then shut up. Not here. The silence is where they start reconsidering. They answer something vague — "I don't know… Visa" — and you keep moving immediately.`,
        textEs: `Te habrán dicho que pidas la venta y luego te calles. Aquí no. El silencio es donde empiezan a replanteárselo. Contestan algo vago — "no sé... Visa" — y tú sigues moviéndote al momento.`,
      },
      {
        type: 'script',
        text: `"Perfect, don't worry — I'll bring it over to you."`,
        textEs: `"Perfecto, no te preocupes — te la traigo yo."`,
      },
      {
        type: 'keypoint',
        text: `Then go and get the card machine. The next thing that happens is a machine arriving, not a pause for them to fill.`,
        textEs: `Y ve a por el datáfono. Lo siguiente que pasa es que llega una máquina, no una pausa que tengan que rellenar.`,
      },

      {
        type: 'divider',
      },
      {
        type: 'header',
        text: 'When they stall instead of saying yes',
        textEs: 'Cuando dudan en vez de decir que sí',
      },
      {
        type: 'paragraph',
        text: `"Let me think about it" is not new information. Everything you need to answer it, they have already told you in the last two minutes. So ask them, straight and friendly, what there actually is to think about.`,
        textEs: `"Me lo tengo que pensar" no es información nueva. Todo lo que necesitas para responder ya te lo han dicho ellos en los últimos dos minutos. Así que pregúntales, directo y con buen rollo, qué hay que pensar exactamente.`,
      },
      {
        type: 'script',
        text: `"What do you actually need to think about?"`,
        textEs: `"¿Qué te tienes que pensar exactamente?"`,
      },
      {
        type: 'paragraph',
        text: `And then, without waiting long, hand their own words back to them:`,
        textEs: `Y luego, sin esperar mucho, devuélveles sus propias palabras:`,
      },
      {
        type: 'script',
        text: `"You already told me you like it. You told me you'd use it. You're not going to walk up and down the street and come back to a different price — you know exactly what it does. It's just whether you want to treat yourself or not. It's not a mortgage."`,
        textEs: `"Ya me has dicho que te gusta. Me has dicho que lo usarías. No vas a dar una vuelta por la calle y volver con otro precio — sabes perfectamente lo que hace. Es simplemente si quieres darte un capricho o no. Tampoco es una hipoteca."`,
      },
      {
        type: 'paragraph',
        text: `Notice what that does. Every single clause is something they said, not something you are claiming. You are not arguing with them — you are reminding them that they already decided, and shrinking the decision down to its real size.`,
        textEs: `Fíjate en lo que hace eso. Cada frase es algo que dijeron ellos, no algo que afirmas tú. No estás discutiendo con ellos — les estás recordando que ya lo habían decidido, y reduciendo la decisión a su tamaño real.`,
      },
      {
        type: 'tip',
        text: `"It's not a mortgage" is the whole tone of this shop in four words. You are not pressuring anybody. You are pointing out that this is a small, pleasant decision and they are treating it like a big frightening one.`,
        textEs: `"Tampoco es una hipoteca" es todo el tono de esta tienda en cuatro palabras. No estás presionando a nadie. Estás señalando que esta es una decisión pequeña y agradable y la están tratando como si fuera enorme y aterradora.`,
      },
    ],
    quiz: [
      {
        question: 'What is the assumptive card close actually asking?',
        questionEs: '¿Qué está preguntando de verdad el cierre asumiendo la tarjeta?',
        options: [
          'Whether they would like to buy the product today',
          'Which card they are going to pay with',
          'Whether they would prefer to pay in cash',
          'How much they were planning to spend',
        ],
        optionsEs: [
          'Si les gustaría comprar el producto hoy',
          'Con qué tarjeta van a pagar',
          'Si prefieren pagar en efectivo',
          'Cuánto tenían pensado gastarse',
        ],
        correctIndex: 1,
        explanation:
          'You ask WHICH, never WHETHER. A question about the payment method only makes sense if the sale is already happening.',
        explanationEs:
          'Preguntas CUÁL, nunca SI. Una pregunta sobre el método de pago solo tiene sentido si la venta ya está pasando.',
      },
      {
        question: 'What do you do straight after they answer "I don\'t know… Visa"?',
        questionEs: '¿Qué haces justo después de que contesten "no sé... Visa"?',
        options: [
          'Stay quiet and let them settle into the decision',
          'Ask them to confirm they are happy to go ahead',
          'Repeat the offer once more so it is clear',
          'Say you will bring the machine, and go get it',
        ],
        optionsEs: [
          'Te quedas callado y dejas que asienten la decisión',
          'Les pides que confirmen que quieren seguir adelante',
          'Repites la oferta una vez más para que quede claro',
          'Dices que traes el datáfono, y vas a por él',
        ],
        correctIndex: 3,
        explanation:
          'The silence is where they reconsider. Keep moving — the next thing that happens should be a machine arriving, not a pause.',
        explanationEs:
          'El silencio es donde se lo replantean. Sigue moviéndote — lo siguiente que pasa debe ser que llega una máquina, no una pausa.',
      },
      {
        question: 'What makes the answer to "let me think about it" work?',
        questionEs: '¿Qué hace que funcione la respuesta a "me lo tengo que pensar"?',
        options: [
          'Every point in it is something they already said',
          'It offers them a better price to decide now',
          'It warns them the offer disappears at closing time',
          'It compares them to other customers who bought',
        ],
        optionsEs: [
          'Cada punto es algo que ya dijeron ellos mismos',
          'Les ofrece un precio mejor por decidir ahora',
          'Les avisa de que la oferta se acaba al cerrar',
          'Los compara con otros clientes que sí compraron',
        ],
        correctIndex: 0,
        explanation:
          'You are not arguing or adding pressure — you are handing their own words back and shrinking the decision to its real size.',
        explanationEs:
          'No estás discutiendo ni añadiendo presión — les devuelves sus propias palabras y reduces la decisión a su tamaño real.',
      },
    ],
  },

  'close-3': {
    id: 'close-3',
    categoryId: 'closing',
    title: 'The Counter',
    titleEs: 'El Cobro',
    subtitle: 'The ninety seconds between yes and paid',
    subtitleEs: 'Los noventa segundos entre el sí y el pago',
    duration: '4 min',
    icon: 'CreditCard',
    order: 4,
    xpReward: 120,
    sections: [
      {
        type: 'header',
        text: 'Charge them where they are sitting',
        textEs: 'Cóbrales donde están sentados',
      },
      {
        type: 'paragraph',
        text: `We do not walk anybody to a till. The card machine goes to the customer, in the chair, where they already said yes. Every metre between the yes and the payment is a metre they can change their mind in — and standing a person up is the single easiest way to lose a sale you had already made.`,
        textEs: `Aquí no llevamos a nadie a la caja. El datáfono va al cliente, a la silla, donde ya han dicho que sí. Cada metro entre el sí y el pago es un metro para que cambien de opinión — y levantar a una persona es la forma más fácil que hay de perder una venta que ya tenías hecha.`,
      },

      {
        type: 'subheader',
        text: 'The dead air while the terminal thinks',
        textEs: 'El silencio mientras el datáfono piensa',
      },
      {
        type: 'paragraph',
        text: `It genuinely does not matter what you say here. Joke with them. Have some fun. Ask about their trip. The content is irrelevant and the silence is not — a customer left alone with their own thoughts while a machine beeps is a customer doing arithmetic.`,
        textEs: `Aquí de verdad da igual lo que digas. Bromea con ellos. Pásalo bien. Pregúntales por su viaje. El contenido es irrelevante y el silencio no lo es — un cliente a solas con sus pensamientos mientras pita una máquina es un cliente haciendo cuentas.`,
      },

      {
        type: 'divider',
      },
      {
        type: 'header',
        text: 'Someone else walks in mid-sale',
        textEs: 'Entra alguien más en mitad de la venta',
      },
      {
        type: 'paragraph',
        text: `Acknowledge them immediately and warmly, and give them a number — "two seconds" — so they know they have not been ignored. Then go straight back to the person in the chair.`,
        textEs: `Reconócelos al momento y con buen rollo, y dales un número — "dos segundos" — para que sepan que no los estás ignorando. Y vuelve directo a la persona de la silla.`,
      },
      {
        type: 'script',
        text: `"Hi darling, how are you doing? Don't worry, I'll be two seconds with you."`,
        textEs: `"Hola guapa, ¿qué tal? No te preocupes, estoy contigo en dos segundos."`,
      },
      {
        type: 'paragraph',
        text: `If you cannot hold both, call a colleague over. And if the person who walked in is a returning customer, call the manager — a customer who came back is worth more than the one you are closing, and they should be handled by whoever can look after them properly.`,
        textEs: `Si no puedes con los dos, llama a un compañero. Y si quien ha entrado es un cliente que repite, llama al encargado — un cliente que vuelve vale más que el que estás cerrando, y debe atenderlo quien pueda cuidarlo como toca.`,
      },

      {
        type: 'divider',
      },
      {
        type: 'header',
        text: 'When the card says no',
        textEs: 'Cuando la tarjeta dice que no',
      },
      {
        type: 'paragraph',
        text: `Work down this list in order, staying completely relaxed. They are already embarrassed — your job is to make it a non-event.`,
        textEs: `Ve bajando por esta lista en orden, con toda la calma. Ellos ya están incómodos — tu trabajo es que no sea nada.`,
      },
      {
        type: 'numbered',
        items: [
          `"No problem at all — do you have another card on you?"`,
          `"Let me try typing the numbers in by hand — the chip does this sometimes."`,
          `"Have you got Apple Pay or Google Pay on your phone? That works too."`,
          `Nothing works: let it go, warmly. "Honestly, don't worry about it at all. We're right here — come back whenever you like."`,
        ],
        itemsEs: [
          `"No pasa nada — ¿llevas otra tarjeta encima?"`,
          `"Déjame probar metiendo los números a mano — el chip hace esto a veces."`,
          `"¿Tienes Apple Pay o Google Pay en el móvil? Eso también nos vale."`,
          `Si no funciona nada: déjalo ir, con buena cara. "De verdad, no te preocupes lo más mínimo. Estamos aquí — vuelve cuando quieras."`,
        ],
      },
      {
        type: 'keypoint',
        text: `Sometimes you take the loss and that is that. What they remember is how you handled it — and people come back to the seller who was lovely about their card being declined.`,
        textEs: `A veces encajas la pérdida y ya está. Lo que recuerdan es cómo lo gestionaste — y la gente vuelve al vendedor que fue encantador cuando le rechazaron la tarjeta.`,
      },

      {
        type: 'divider',
      },
      {
        type: 'header',
        text: 'Before they walk out',
        textEs: 'Antes de que se vayan',
      },
      {
        type: 'paragraph',
        text: `Ask them for a Google review while they are still holding the bag and still delighted. That moment — paid, happy, product in hand — is the only moment they will ever say yes to it. Ask warmly, once, and let it go if they would rather not.`,
        textEs: `Pídeles una reseña en Google mientras todavía tienen la bolsa en la mano y siguen encantados. Ese momento — pagado, contentos, producto en mano — es el único en el que van a decir que sí. Pídelo con cariño, una vez, y déjalo estar si prefieren que no.`,
      },
      {
        type: 'tip',
        text: `This is new and we are just starting with it, so build the habit now: the review ask is part of the sale, not something extra you do if you remember.`,
        textEs: `Esto es nuevo y estamos empezando con ello, así que coge el hábito ya: pedir la reseña es parte de la venta, no algo extra que haces si te acuerdas.`,
      },
    ],
    quiz: [
      {
        question: 'Where does the payment happen?',
        questionEs: '¿Dónde se hace el pago?',
        options: [
          'At the till, so the sale is properly recorded',
          'Wherever there is space away from other customers',
          'In the chair — the machine goes to the customer',
          'At the door, once everything is bagged up',
        ],
        optionsEs: [
          'En la caja, para que la venta quede bien registrada',
          'Donde haya sitio, lejos de otros clientes',
          'En la silla — el datáfono va al cliente',
          'En la puerta, cuando ya está todo embolsado',
        ],
        correctIndex: 2,
        explanation:
          'Every metre between the yes and the payment is a metre they can change their mind in. Standing a customer up loses sales you had already made.',
        explanationEs:
          'Cada metro entre el sí y el pago es un metro para que cambien de opinión. Levantar a un cliente pierde ventas que ya tenías hechas.',
      },
      {
        question: 'What should you say while the terminal is processing?',
        questionEs: '¿Qué deberías decir mientras el datáfono procesa?',
        options: [
          'Anything at all — just do not leave silence',
          'Repeat what they have bought and what it cost',
          'Nothing, so they can concentrate on the PIN',
          'Explain the returns policy and the guarantee',
        ],
        optionsEs: [
          'Cualquier cosa — pero no dejes silencio',
          'Repite lo que han comprado y lo que ha costado',
          'Nada, para que se concentren en el PIN',
          'Explica la política de devoluciones y la garantía',
        ],
        correctIndex: 0,
        explanation:
          'The content is irrelevant. A customer left alone with their thoughts while a machine beeps is a customer doing arithmetic.',
        explanationEs:
          'El contenido es irrelevante. Un cliente a solas con sus pensamientos mientras pita una máquina es un cliente haciendo cuentas.',
      },
      {
        question: 'A returning customer walks in while you are closing someone. What is the move?',
        questionEs: 'Entra un cliente que repite mientras estás cerrando a alguien. ¿Qué haces?',
        options: [
          'Finish the sale first and hope they wait',
          'Hand the returning customer to the manager',
          'Ask the person in the chair to give you a minute',
          'Serve them both at once and keep it moving',
        ],
        optionsEs: [
          'Terminas la venta y esperas que aguanten',
          'Pasas el cliente que repite al encargado',
          'Le pides a la persona de la silla un minuto',
          'Atiendes a los dos a la vez y sigues adelante',
        ],
        correctIndex: 1,
        explanation:
          'Greet them warmly and give them a number, then get the manager. A customer who came back is worth more than the one you are closing.',
        explanationEs:
          'Salúdalos con buen rollo y dales un número, y luego llama al encargado. Un cliente que vuelve vale más que el que estás cerrando.',
      },
      {
        question: 'The card is declined and they have no other card. What comes next?',
        questionEs: 'Rechazan la tarjeta y no tienen otra. ¿Qué viene después?',
        options: [
          'Ask whether they can get cash from a machine',
          'Offer to hold the product until tomorrow',
          'Drop to a lower rung so the amount goes through',
          'Try the numbers by hand, then Apple or Google Pay',
        ],
        optionsEs: [
          'Preguntar si pueden sacar efectivo de un cajero',
          'Ofrecerte a guardarles el producto hasta mañana',
          'Bajar un escalón para que pase el importe',
          'Probar los números a mano, y luego Apple o Google Pay',
        ],
        correctIndex: 3,
        explanation:
          'Manual entry first — the chip fails sometimes — then the phone wallets. If none of it works, let it go warmly.',
        explanationEs:
          'Primero a mano — el chip falla a veces — y luego los monederos del móvil. Si no funciona nada, déjalo ir con buena cara.',
      },
    ],
  },
  /*
   * The owner's own way of teaching, in his words:
   *
   *   "Make the seller immune to mistakes. Make sure they give 100% of
   *    themselves in every demo. They didn't say something wrong, they didn't
   *    forget to do something, they didn't get lazy in the middle. If they did
   *    everything perfectly and still the customer didn't buy, this is not on
   *    the seller anymore. This is just a bad customer, and it's part of the
   *    game."
   *
   * The app already told sellers that most people say no. On its own that is
   * an excuse waiting to be used — it absolves everybody, including the person
   * who rushed the demo. His version is CONDITIONAL, and the condition is the
   * whole lesson: you are off the hook only once you have genuinely given
   * everything. That is also why he wants the numbers said out loud rather
   * than softened. A seller who knows how rare a person in their chair is
   * fights for that person instead of waiting for an easier one.
   */
  'close-fault': {
    id: 'close-fault',
    categoryId: 'closing',
    title: 'It Is Not On You — If You Did Everything',
    titleEs: 'No Es Culpa Tuya — Si Lo Hiciste Todo',
    subtitle: 'Most of them say no. That is the job, not your failure',
    subtitleEs: 'La mayoría dice que no. Eso es el trabajo, no tu fracaso',
    duration: '5 min',
    icon: 'Shield',
    order: 5,
    xpReward: 120,
    sections: [
      {
        type: 'header',
        text: 'Most of them are going to say no',
        textEs: 'La mayoría te va a decir que no',
      },
      {
        type: 'paragraph',
        text: `Nobody tells you this on your first day, so here it is, straight. Most of the people you step in front of will not stop. Of the ones who do stop and sit down, most will not buy. That is not you being bad at this. That is the shape of the job, and it is the same shape for the best seller in the centre. If you are waiting for a day where everybody says yes, you are going to have a miserable career waiting for it.`,
        textEs: `Nadie te cuenta esto el primer día, así que te lo cuento yo, claro. La mayoría de la gente a la que te pongas delante no va a parar. Y de los que paran y se sientan, la mayoría no va a comprar. Eso no es que se te dé mal. Esa es la forma que tiene este trabajo, y es la misma para el mejor vendedor del centro. Si esperas un día en el que todo el mundo diga que sí, vas a esperar sentado toda tu carrera.`,
      },
      {
        type: 'keypoint',
        text: `So why tell you? Because of what it means about the person already sitting in your chair. If most people never stop, and most of the ones who stop never buy, then somebody with your product in their hand is a rare thing. Not a lead. Not one of many. Rare. You do not hurry that person, you do not get bored halfway through them, and you certainly do not let them wander off to think about it — because there is no queue of them behind you.`,
        textEs: `¿Y por qué contártelo? Por lo que dice de la persona que ya está sentada en tu silla. Si casi nadie para, y de los que paran casi nadie compra, entonces alguien con tu producto en la mano es algo raro. No es "un cliente más". Es raro. A esa persona no la metes prisa, no te aburres a mitad de camino, y desde luego no la dejas irse a pensárselo — porque no hay una cola de ellas esperando detrás.`,
      },

      {
        type: 'subheader',
        text: 'The only question worth asking after a no',
        textEs: 'La única pregunta que vale la pena tras un no',
      },
      {
        type: 'paragraph',
        text: `When somebody walks without buying, there is exactly one useful question, and it is not "what is wrong with me". It is: did I actually give that everything? Not "was I nice". Not "did I try". Everything. Because the difference between a seller who gets better and one who does the same year forever is that the first one answers this honestly and the second one does not ask.`,
        textEs: `Cuando alguien se va sin comprar, hay exactamente una pregunta útil, y no es "qué me pasa a mí". Es: ¿le he dado de verdad todo lo que tengo? No "he sido amable". No "lo he intentado". Todo. Porque la diferencia entre un vendedor que mejora y uno que hace lo mismo durante años es que el primero se responde en serio y el segundo ni se lo pregunta.`,
      },
      {
        type: 'checklist',
        items: [
          'Did I say anything wrong, or promise something I should not have?',
          'Did I skip a step — the hand, the mirror, the two yeses, the ask?',
          'Did I go quiet after the price, or did I fill the silence and lose it?',
          'Did I get lazy in the middle, once I decided they were not buying?',
          'Did I go all the way down the ladder, or stop early to save myself the effort?',
        ],
        itemsEs: [
          '¿He dicho algo que no debía, o he prometido algo que no toca?',
          '¿Me he saltado un paso — la mano, el espejo, los dos síes, el pedir?',
          '¿Me he callado después del precio, o lo he llenado de ruido y lo he perdido?',
          '¿Me he vuelto perezoso a mitad, cuando ya decidí que no iban a comprar?',
          '¿He bajado toda la escalera, o he parado antes para ahorrarme el esfuerzo?',
        ],
      },
      {
        type: 'paragraph',
        text: `If one of those is a yes, that is your lesson and it is a good day — you just found the thing to fix, for free, without it costing you anything but one sale. Write it in the journal and take it out to the next one.`,
        textEs: `Si alguna de esas es un sí, ahí tienes tu lección y ha sido un buen día — acabas de encontrar gratis lo que hay que arreglar, y solo te ha costado una venta. Apúntalo en el diario y sácalo con el siguiente.`,
      },

      {
        type: 'subheader',
        text: 'And if the answer is "I did all of it"',
        textEs: 'Y si la respuesta es "lo he hecho todo"',
      },
      {
        type: 'keypoint',
        text: `Then it is not on you. It genuinely is not. You did the demo properly, you said the right things, you asked for the money, you worked the whole ladder, you stayed warm to the last second — and they still walked. That is a bad customer, and bad customers are part of the game. Put it down. Do not carry it to the next person, because they can smell it on you and it will cost you that one too.`,
        textEs: `Entonces no es culpa tuya. De verdad que no. Has hecho la demo bien, has dicho lo que había que decir, has pedido el dinero, has trabajado la escalera entera, has estado simpático hasta el último segundo — y aun así se han ido. Eso es un mal cliente, y los malos clientes forman parte del juego. Suéltalo. No te lo lleves al siguiente, porque te lo huelen encima y te va a costar también esa.`,
      },
      {
        type: 'tip',
        text: `Notice this only works one way round. It is what you tell yourself AFTER, once you have honestly been through the list. The moment you start saying "most people say no anyway" BEFORE the demo, it has stopped being perspective and turned into an excuse — and excuses are the thing that makes a seller slow.`,
        textEs: `Fíjate en que esto solo vale en un sentido. Es lo que te dices DESPUÉS, cuando has repasado la lista de verdad. En cuanto empiezas a decirte "total, la mayoría dice que no" ANTES de la demo, ha dejado de ser perspectiva y se ha convertido en excusa — y las excusas son lo que vuelve lento a un vendedor.`,
      },
      {
        type: 'script',
        text: `"I did everything. They still said no. Next one." — said out loud, once, and then you are back on the floor.`,
        textEs: `"Lo he hecho todo. Aun así han dicho que no. Al siguiente." — dicho en voz alta, una vez, y vuelves a la sala.`,
      },
      {
        type: 'paragraph',
        text: `That is the whole trick, and it is why the good sellers last. They are not the ones who never get rejected — everybody gets rejected all day. They are the ones who have made themselves immune to their own mistakes, so that when a no comes, there is nothing on it for them to feel bad about.`,
        textEs: `Ese es todo el truco, y por eso duran los buenos vendedores. No son los que nunca reciben un no — todo el mundo recibe noes todo el día. Son los que se han hecho inmunes a sus propios errores, así que cuando llega un no, no hay nada ahí de lo que sentirse mal.`,
      },
    ],
    quiz: [
      {
        question: 'Why are you told that most people will not buy?',
        questionEs: '¿Por qué te dicen que la mayoría no va a comprar?',
        options: [
          'So a quiet day feels less like your fault',
          'So you fight for the rare one already in your chair',
          'So you learn to spot the buyers and skip the rest',
          'So you know when a shift is not worth finishing',
        ],
        optionsEs: [
          'Para que un día flojo pese menos sobre ti',
          'Para que pelees por el raro que ya tienes sentado',
          'Para aprender a ver quién compra y saltarte al resto',
          'Para saber cuándo un turno ya no merece la pena',
        ],
        correctIndex: 1,
        explanation:
          'If almost nobody stops, and almost none of those buy, the person holding your product is rare. That is the point of the number — not comfort, urgency.',
        explanationEs:
          'Si casi nadie para, y de esos casi ninguno compra, la persona que tiene tu producto en la mano es rara. Ese es el sentido del dato — no consuelo, urgencia.',
      },
      {
        question: 'A customer walks without buying. What do you ask yourself?',
        questionEs: 'Un cliente se va sin comprar. ¿Qué te preguntas?',
        options: [
          'Whether they were ever really going to buy',
          'Whether the price is too high for this centre',
          'Whether I gave that one absolutely everything',
          'Whether I should change how I open tomorrow',
        ],
        optionsEs: [
          'Si de verdad iban a comprar en algún momento',
          'Si el precio es demasiado alto para este centro',
          'Si a ese le he dado absolutamente todo lo que tengo',
          'Si mañana debería cambiar cómo abro',
        ],
        correctIndex: 2,
        explanation:
          'Wrong words, a skipped step, filling the silence, going lazy halfway, stopping early on the ladder. If one of those is a yes, you just found what to fix.',
        explanationEs:
          'Palabras equivocadas, un paso saltado, llenar el silencio, aflojar a mitad, parar antes de tiempo en la escalera. Si alguna es un sí, ya sabes qué arreglar.',
      },
      {
        question: 'You went through the list honestly and did everything right. Whose fault is the lost sale?',
        questionEs: 'Repasas la lista con sinceridad y lo hiciste todo bien. ¿De quién es la venta perdida?',
        options: [
          'Still partly yours — there is always something',
          'Nobody’s, so there is nothing to learn from it',
          'The shop’s, for pricing the product where it is',
          'Not yours. A bad customer is part of the game',
        ],
        optionsEs: [
          'Un poco tuya todavía — siempre hay algo',
          'De nadie, así que no hay nada que aprender',
          'De la tienda, por poner el precio donde está',
          'Tuya no. Un mal cliente es parte del juego',
        ],
        correctIndex: 3,
        explanation:
          'Put it down and do not carry it to the next person — they can smell it on you. But it only counts after the list, never before the demo.',
        explanationEs:
          'Suéltalo y no te lo lleves al siguiente — te lo huelen encima. Pero solo vale después de la lista, nunca antes de la demo.',
      },
    ],
  },
};

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
  'close-1': {
    id: 'close-1',
    categoryId: 'closing',
    title: 'The Bring',
    titleEs: 'Meterlos Dentro',
    subtitle: 'The five metres from the pavement to the chair',
    subtitleEs: 'Los cinco metros de la acera a la silla',
    duration: '5 min',
    icon: 'DoorOpen',
    order: 1,
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
    order: 2,
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
    order: 3,
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
};

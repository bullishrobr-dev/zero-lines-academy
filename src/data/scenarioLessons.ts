// ─────────────────────────────────────────────────────────────────────────────
// scenarioLessons.ts — 10 "what do I do when…" drills for the street.
//
// These were authored against a bespoke `ScenarioLesson` shape (scenario /
// whatToDo / whatNotToDo / scripts / proTip) that no component could render, in
// a file nothing imported. They are now plain `Lesson` records in the canonical
// `ContentSection` vocabulary, merged into the registry by lessons.ts, and every
// section type here is one LessonView's SectionRenderer actually handles.
//
// ── THE VOICE, AND THE SPANISH ──────────────────────────────────────────────
// The English was written in generic sales-training register — "assess", "pain
// point", "physical anchoring" — which is nobody's voice and reads like a
// corporate deck. It is now the owner's: market energy, short sentences, direct
// address, warm, a bit cheeky. closingLessons.ts is the tuning fork.
//
// The Spanish was Latin American in a file whose own rules promise European
// Spanish — playeras, lentes, regresar, gerente, empaque, usualmente, ustedes.
// Half the team reads the Spanish column and it read foreign to a Spanish or
// Andorran ear. It has been rewritten FOR THE EAR in Spain register, informal
// tú, vosotros in the plural — not translated clause by clause.
//
// Two things were taken out and must not come back, and neither is about
// manners — both land on the shop after the seller has gone home:
//   • Promises the shop has to honour once the customer walks out. There was a
//     morning-after appointment with a queue-jump promised to a drunk woman, a
//     free product for a returning friend, a held box with a name on it, a
//     price kept warm on WhatsApp. The seller may not be on that shift; a
//     colleague has the argument.
//   • Medical and safety claims. "Alcohol dilates blood vessels", "for safety
//     reasons I can't demo on anyone who's been drinking", "the same stuff in
//     your joints". Sell the shine, the look, the feeling, the price.
// Invented numbers went the same way (8-10 facials, 60% off, 100x, works 3x
// better, 10 times out of 10) and nothing replaced them — the move is taught
// instead. Price theatre, "just for you", "my last customer", "between us" and
// scarcity all stay. That is the market and it is the job.
//
// ── THE OWNER'S VERDICTS THIS FILE NOW CARRIES ──────────────────────────────
// Five scenarios were teaching the opposite of what he actually does. Each fix
// is his ruling, not an edit for taste, so none of them may quietly drift back:
//   • S2 used to RESCUE a dead demo by pivoting to the scrub. It does not. You
//     get one line — two seconds — and if she doesn't take it, it is dead:
//     "There is no point trying to sell to a dead body. Get them out of the
//     shop, and you continue with the next one." No second product, no cheaper
//     number, no third go. This is exception 2 under THE RULE, and the crowd
//     watching is exactly why you leave clean instead of flailing.
//   • S3 and S6 used to promise every member of a group a demo. Three or fewer,
//     do all of them; FOUR OR MORE, one volunteer, and you only widen it on
//     real excitement — "you don't want to do everybody and nobody buys, this
//     is the worst feeling ever." S3's quiz used to mark doing all six correct.
//   • S9 used to offer "let him go" as a co-equal opening move. You bring the
//     difficult partner IN first — his hand, his opinion, a bet he thinks he is
//     winning — and only pure bad energy earns "it's ladies' business anyway".
//   • S10 used to have the seller run a second demo and invent a price for a
//     returning customer ({currency}450 → {currency}310, neither on any ladder).
//     A customer who came back is priced by the MANAGER, or by whoever on the
//     floor has the most experience. It is not the seller's sale to price.
// Also gone: filtering a crowd by handbag (he does not want a who-to-skip list
// anywhere), and the language barrier as a drama — it is Google Translate and a
// product page that already exists in her language.
//
// Content rules this file obeys, the same as every other data file:
//   • No currency symbol ever. Write {currency}; useCurrency().sub() resolves it.
//   • No shop name in anything a seller says aloud. Write {locationName}, so an
//     Andorra seller is never told to say "here in Gibraltar".
//   • Every price is a rung on a ladder in pricing.ts — 300 base / 210 promo /
//     175 / 140 voucher / 100 floor for the syringe, 150 base for the peeling,
//     60 base and 30 floor for the mix & match family.
//   • Spanish is European Spanish (Spain), informal tú (vosotros in the plural).
// ─────────────────────────────────────────────────────────────────────────────

import type { Lesson } from './lessons';

export const scenarioLessons: Record<string, Lesson> = {
  "S1": {
    id: "S1",
    categoryId: "scenarios",
    title: "The Drunk Customer",
    titleEs: "El Cliente Borracho",
    subtitle: "Be lovely, take nothing, get on with your day",
    subtitleEs: "Sé encantador, no le cobres nada y sigue con tu día",
    duration: "4 min",
    icon: "AlertTriangle",
    order: 8,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "The Situation",
        textEs: "La Situación",
      },
      {
        type: "paragraph",
        text: "Two o'clock on a Saturday in {locationName}. A hen crowd comes down the street and one of them peels off towards you — loud, slurring, half a bottle of something in her. \"OI! What's that then?! Make me beautiful!\" She has hold of your arm, she is far too close, and her mates are laughing instead of helping. She wants a demo. Her card is already out of her bag. Everything in you is shouting sale. Read the rest before you touch that card.",
        textEs: "Las dos de la tarde de un sábado en {locationName}. Baja por la calle un grupo de despedida y una se separa y viene a por ti — a gritos, arrastrando las palabras, con media botella encima. \"¡EY! ¿Y eso qué es? ¡Ponme guapa!\" Te tiene cogido del brazo, está demasiado cerca, y sus amigas se ríen en vez de ayudar. Quiere una demo. Ya ha sacado la tarjeta del bolso. Todo tu cuerpo te está gritando venta. Léete el resto antes de tocar esa tarjeta.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "SEE WHICH KIND OF DRUNK SHE IS. Happy and daft, you can be lovely to her and move her along in thirty seconds. Looking for an argument — you are done, right now, before it turns into a scene with an audience.",
          "PUT SOMETHING BETWEEN YOU. Half a step back, table in the middle. Someone who has been drinking has no idea where your personal space ends, so you draw the line for both of you.",
          "NOTHING GOES ON HER FACE. If you are going to show her anything at all, show it on your own hand. Product on a drunk woman's face is a scene with three phones pointing at it, and you are the one in the frame.",
          "TALK TO THE SOBER ONE. There is always one holding the bags and the phones. She decides where the group goes next, and she will like you for being the seller who did not take advantage of her mate.",
          "IF IT TURNS, STOP. Stop talking. Step back. Hand up. \"Not today.\" Then get a colleague or your manager over. There is nothing on that table worth standing there for.",
        ],
        itemsEs: [
          "MIRA QUÉ CLASE DE BORRACHA ES. Si va contenta y tonta, puedes ser encantador con ella y despacharla con buen rollo en treinta segundos. Si va buscando bronca — se acabó, ya, antes de que se monte el numerito con público.",
          "PON ALGO ENTRE LOS DOS. Medio paso atrás y la mesa por medio. Quien ha bebido no tiene ni idea de dónde acaba tu espacio, así que la raya la pintas tú por los dos.",
          "EN LA CARA NO LE PONES NADA. Si le vas a enseñar algo, se lo enseñas en tu propia mano. Producto en la cara de una borracha es una escena con tres móviles grabando, y el que sale en el vídeo eres tú.",
          "HABLA CON LA QUE ESTÁ SOBRIA. Siempre hay una que lleva los bolsos y los móviles. Es la que decide adónde va el grupo después, y le vas a caer bien por ser el vendedor que no se aprovechó de su amiga.",
          "SI SE TUERCE, PARA. Deja de hablar. Da un paso atrás. Mano arriba. \"Hoy no.\" Y llama a un compañero o al encargado. No hay nada en esa mesa que merezca quedarse ahí aguantando.",
        ],
      },
      {
        type: "subheader",
        text: "What NOT To Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Work on her face. Not the wrinkle, not the eye, nothing. Your own hand or nothing at all.",
          "Take her card. Don't touch a drunk woman's card. Next week the bank pulls the money straight back out, the shop swallows it, and she goes home telling everyone she got done in {locationName}. All that work for nothing.",
          "Laugh at her. Her mates can. You can't. Everybody else on that pavement is watching how you treat the one who can't look after herself, and deciding whether to stop at your table later.",
          "Let yourself get boxed in. Keep the door, or a colleague's eyeline, over your shoulder. Never let the group close around you.",
        ],
        itemsEs: [
          "Trabajarle la cara. Ni la arruga, ni el ojo, nada. Tu propia mano o nada.",
          "Cogerle la tarjeta. A una borracha no le tocas la tarjeta. La semana que viene el banco saca el dinero otra vez, se lo come la tienda, y ella se va a casa contando por ahí que la timaron en {locationName}. Todo ese trabajo para nada.",
          "Reírte de ella. Sus amigas pueden. Tú no. Todo el mundo en esa acera está mirando cómo tratas a la que no se puede cuidar sola, y decidiendo si luego para en tu mesa o no.",
          "Dejar que te encierren. Ten la puerta, o la mirada de un compañero, por encima del hombro. Que el grupo no se te cierre alrededor.",
        ],
      },
      {
        type: "subheader",
        text: "Script — Too Much Fun For Me Today",
        textEs: "Guion — Hoy Eres Demasiado Fiesta Para Mí",
      },
      {
        type: "script",
        text: "YOU: \"Whoa — you are TOO much fun for me today.\" [Half a step back, hands up, big smile] \"Come and see us tomorrow morning when it's quiet — you'll get the full show.\"",
        textEs: "TÚ: \"Uy — hoy eres DEMASIADO fiesta para mí.\" [Medio paso atrás, manos arriba, sonrisa grande] \"Pasaos mañana por la mañana, que está tranquilo — os hacemos el espectáculo entero.\"",
      },
      {
        type: "subheader",
        text: "Script — The Step Back",
        textEs: "Guion — El Paso Atrás",
      },
      {
        type: "script",
        text: "YOU: \"Alright, alright — give me a bit of room, love.\" [Step back yourself, hands where she can see them] \"I'm not doing this on you today. But your friend here looks ready.\" [Turn your whole body to the sober one, warm as anything] \"Come on, you. Give me your hand.\"",
        textEs: "TÚ: \"Vale, vale — dame un poco de aire, guapa.\" [Retrocede tú también, las manos a la vista] \"Hoy a ti no te lo hago. Pero tu amiga sí que tiene pinta de estar lista.\" [Gira el cuerpo entero hacia la que está sobria, con todo el cariño] \"Venga, tú. Dame la mano.\"",
      },
      {
        type: "subheader",
        text: "Script — Getting Help",
        textEs: "Guion — Pedir Ayuda",
      },
      {
        type: "script",
        text: "YOU: \"That's it for today. Step back for me, please.\" [Hand up, eyes on the nearest colleague or the security guard] \"Marco! Give me a hand here!\" [To the friends — calm, not cross] \"Girls, take her for a coffee. Go on.\"",
        textEs: "TÚ: \"Ya está por hoy. Da un paso atrás, por favor.\" [Mano arriba, la mirada en el compañero o el de seguridad más cercano] \"¡Marco! ¡Échame una mano!\" [A las amigas — con calma, sin enfadarte] \"Chicas, llevadla a tomar un café. Venga.\"",
      },
      {
        type: "subheader",
        text: "Script — The Card Goes Away",
        textEs: "Guion — La Tarjeta Se Guarda",
      },
      {
        type: "script",
        text: "YOU: \"Put that away, put it away.\" [Laughing, a hand over hers, easing the card back towards her bag] \"I'm not taking your money today, my love. Not like this. Go on — go and enjoy your afternoon.\"",
        textEs: "TÚ: \"Guárdala, guárdala.\" [Riéndote, la mano sobre la suya, empujándole la tarjeta otra vez hacia el bolso] \"Hoy no te cobro nada, guapa. Así no. Anda — ve a disfrutar de la tarde.\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Know the shop's rule before it happens, because with a hen party shouting in your face you will not be thinking clearly. Then trust your gut — if she feels like trouble, she is trouble. And do the sums: twenty minutes on her is twenty minutes off the sober woman walking past who would have taken two. Letting this one go isn't losing a sale. It's refusing to buy a problem with the shop's money.",
        textEs: "Sábete la norma de la tienda antes de que pase, porque con una despedida de soltera gritándote en la cara no vas a pensar con claridad. Y luego fíate de tu instinto: si te huele a lío, es un lío. Y echa la cuenta: veinte minutos con ella son veinte minutos que le quitas a la mujer sobria que pasa por delante y que se habría llevado dos. Dejar ir a esta no es perder una venta. Es no comprar un problema con el dinero de la tienda.",
      },
    ],
    quiz: [
      {
        question: 'She is slurring, her card is already out, and she wants it on her face. What do you take?',
        questionEs: 'Arrastra las palabras, ya ha sacado la tarjeta y lo quiere en la cara. ¿Qué le coges?',
        options: [
          'The card — she is an adult and she has decided',
          'The card, but do the demo on her hand instead',
          'Nothing today, and tell her mates she is being a nightmare',
          'Nothing. Be lovely, send her off happy, back to work',
        ],
        optionsEs: [
          'La tarjeta — es adulta y ya lo ha decidido',
          'La tarjeta, pero le haces la demo en la mano',
          'Nada hoy, y les dices a sus amigas que es un desastre',
          'Nada. Sé encantador, despídela contenta y a trabajar',
        ],
        correctIndex: 3,
        explanation:
          'Next week the bank pulls the money straight back out, the shop swallows it, and she tells everyone she got done. All that work for nothing.',
        explanationEs:
          'La semana que viene el banco saca el dinero otra vez, se lo come la tienda y ella va contando que la timaron. Todo ese trabajo para nada.',
      },
      {
        question: 'If you show her anything at all, where does the product go?',
        questionEs: 'Si le enseñas algo, ¿dónde va el producto?',
        options: [
          'On the wrinkle she keeps pointing at, carefully',
          'On her hand, so she can wash it off afterwards',
          'On your own hand, or nowhere at all',
          'On her face but only a little, so she can see it works',
        ],
        optionsEs: [
          'En la arruga que no para de señalar, con cuidado',
          'En su mano, así se lo puede lavar después',
          'En tu propia mano, o en ningún sitio',
          'En la cara pero solo un poco, para que vea que funciona',
        ],
        correctIndex: 2,
        explanation:
          'Product on a drunk woman is a scene with three phones pointing at it, and you are the one in the video.',
        explanationEs:
          'Producto en una borracha es un numerito con tres móviles apuntando, y el del vídeo eres tú.',
      },
      {
        question: 'Her mates are laughing at the state of her. What do you do?',
        questionEs: 'Sus amigas se están riendo de cómo va. ¿Qué haces?',
        options: [
          'Join in — matching the energy keeps the group with you',
          'Stay out of it, be decent, and let the street see that',
          'Tell them off, then get on with the demo you were doing',
          'Use it — a bit of teasing is what gets a hen group buying',
        ],
        optionsEs: [
          'Apuntarte — seguirles el rollo te mantiene al grupo',
          'No entrar, ser decente, y que la calle lo vea',
          'Reñirles y seguir con la demo que estabas haciendo',
          'Aprovecharlo — un poco de guasa es lo que hace comprar',
        ],
        correctIndex: 1,
        explanation:
          'Everybody on that pavement is watching how you treat the one who cannot look after herself, and deciding whether to stop at your table later.',
        explanationEs:
          'Todo el mundo en esa acera está mirando cómo tratas a la que no se puede cuidar sola, y decidiendo si luego para en tu mesa.',
      },
    ],
  },

  "S2": {
    id: "S2",
    categoryId: "scenarios",
    title: "The Demo That Failed",
    titleEs: "La Demo Que Falló",
    subtitle: "The wrinkle didn't move, and four people are watching",
    subtitleEs: "La arruga no se ha movido y hay cuatro personas mirando",
    duration: "5 min",
    icon: "XCircle",
    order: 1,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "The Situation",
        textEs: "La Situación",
      },
      {
        type: "paragraph",
        text: "You're doing the wrinkle demo on a woman from Manchester. Sixty seconds go by. She takes the mirror, and the line is exactly where it was. She hands it back, folds her arms, and says it out loud so everyone hears: \"See? Doesn't work. It's all a con, isn't it.\" There are four people stood behind her watching. You get one line to fight this. If that line doesn't move her, the demo is dead — and what you do in the ten seconds after that decides whether those four stay or all walk off with her.",
        textEs: "Estás haciendo la demo de la arruga a una señora de Manchester. Pasan sesenta segundos. Coge el espejo y la línea sigue exactamente donde estaba. Te devuelve el espejo, se cruza de brazos y lo dice en alto para que lo oiga todo el mundo: \"¿Ves? No funciona. Es todo un cuento, ¿no?\" Detrás de ella hay cuatro personas mirando. Tienes una frase para pelearlo. Si esa frase no la mueve, la demo está muerta — y lo que hagas en los diez segundos siguientes decide si esas cuatro se quedan o se van todas con ella.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "DON'T PANIC — THEY'RE READING YOUR FACE. Go red and start talking fast and the little crowd has just watched a con come apart. Go curious instead — head on one side, looking at her skin like a puzzle — and you're a professional working something out.",
          "ONE LINE. THAT IS YOUR WHOLE FIGHT. Two seconds, not two minutes. \"You're right, that's not what I wanted either — what did you put on this morning?\" Agreeing costs you nothing, takes the fight out of the air, and buys you the only thing worth having here: a clean face and a second go.",
          "IF SHE GIVES YOU THE SECOND GO, YOU'RE ALIVE. Clean the spot properly — cream, sun cream, foundation, primer, anything on top and the product never got near her. More product this time, more pressure, and narrate every step so the crowd hears you working. That second attempt is the demo they'll remember, because they watched you earn it.",
          "IF SHE DOESN'T MOVE, IT'S DEAD. No second line, no third go, and nothing else comes off the table. There is no point trying to sell to a dead body — get them out of the shop and go and get the next one. The money is in the next one, and she is walking past you while you stand there arguing.",
          "LEAVE CLEAN, BECAUSE OF THE FOUR PEOPLE WATCHING. This is one of only three times you let a customer walk, and it is the only one that ever happens with an audience — which is exactly why it has to look easy. Thank her, mean it, turn to the next face without a mark on you. Flail and all four leave with her.",
        ],
        itemsEs: [
          "NO TE PONGAS NERVIOSO — TE ESTÁN MIRANDO LA CARA. Si te pones rojo y empiezas a hablar rápido, el corrillo acaba de ver cómo se cae un timo. Ponte curioso en cambio — la cabeza ladeada, mirándole la piel como si fuera un puzle — y eres un profesional resolviendo algo.",
          "UNA FRASE. ESA ES TODA TU PELEA. Dos segundos, no dos minutos. \"Tienes razón, a mí tampoco me ha salido lo que quería — ¿qué te has puesto esta mañana?\" Darle la razón no te cuesta nada, le quita la bronca al momento y te compra lo único que merece la pena aquí: la cara limpia y un segundo intento.",
          "SI TE DA EL SEGUNDO INTENTO, ESTÁS VIVO. Limpia bien la zona — crema, crema solar, base, prebase; si hay algo encima, el producto no le ha llegado ni a tocar la piel. Esta vez más producto y más presión, y ve contando cada paso para que el corrillo te oiga trabajar. Ese segundo intento es la demo que van a recordar, porque te han visto ganártela.",
          "SI NO SE MUEVE, ESTÁ MUERTA. Ni una segunda frase, ni un tercer intento, ni sacas nada más de la mesa. No tiene sentido intentar venderle a un cuerpo muerto — los sacas de la tienda y vas a por el siguiente. El dinero está en el siguiente, y te está pasando por delante mientras tú discutes.",
          "SAL LIMPIO, POR LAS CUATRO PERSONAS QUE MIRAN. Es una de las tres únicas veces que dejas marchar a una clienta, y la única que pasa delante de público — justo por eso tiene que parecer fácil. Dale las gracias, de verdad, y gírate a la siguiente cara sin una marca encima. Si te descompones, se van las cuatro con ella.",
        ],
      },
      {
        type: "subheader",
        text: "What NOT To Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Pretend it worked. \"You can't see it but I can\" — every person watching knows you just lied, and that's your afternoon on that corner finished.",
          "Reach for another product. The scrub is not a rescue boat. Dragging a corpse through a second pitch in front of an audience loses you the audience as well as her.",
          "Blame her skin. Insult a woman's face in front of an audience and you lose the audience, not just her.",
          "Get defensive. \"It works on everyone, I don't know what's wrong with you\" is an excuse in a white coat. Curious beats defensive every single time.",
          "Drop the price to save it. She hasn't said no to the money, she's said no to the product. Cheaper doesn't buy that back, and now four strangers know your numbers move when you panic.",
        ],
        itemsEs: [
          "Hacer como que ha funcionado. \"Tú no lo ves pero yo sí\" — todos los que están mirando saben que acabas de mentir, y ahí se te acaba la tarde en esa esquina.",
          "Echar mano de otro producto. El exfoliante no es un bote salvavidas. Arrastrar un cadáver por un segundo discurso delante de público te cuesta el público además de ella.",
          "Culpar a su piel. Insúltale la cara a una mujer delante de público y pierdes al público, no solo a ella.",
          "Ponerte a la defensiva. \"Le funciona a todo el mundo, no sé qué te pasa a ti\" es una excusa con bata blanca. Curioso le gana a defensivo siempre.",
          "Bajar el precio para salvarla. No le ha dicho que no al dinero, le ha dicho que no al producto. Más barato no te lo devuelve, y ahora cuatro desconocidos saben que tus números se mueven cuando te pones nervioso.",
        ],
      },
      {
        type: "subheader",
        text: "Script — Your One Line",
        textEs: "Guion — Tu Única Frase",
      },
      {
        type: "script",
        text: "YOU: \"Yeah. I see it too, and I'm not going to stand here telling you it worked.\" [Look at her skin, not at her] \"What did you put on this morning — cream? Sun cream? Make-up?\" [She says yes] \"There it is. That's a layer sitting between me and your skin. Thirty seconds to take it off and we go again.\" [That is the whole fight. Now watch her arms.]",
        textEs: "TÚ: \"Sí. Yo también lo veo, y no me voy a quedar aquí diciéndote que ha funcionado.\" [Mírale la piel, no a ella] \"¿Qué te has puesto esta mañana — crema? ¿Crema solar? ¿Maquillaje?\" [Dice que sí] \"Ahí lo tienes. Eso es una capa entre tu piel y yo. Treinta segundos para quitártela y lo repetimos.\" [Esa es toda la pelea. Ahora mírale los brazos.]",
      },
      {
        type: "subheader",
        text: "Script — She Unfolds Her Arms",
        textEs: "Guion — Descruza los Brazos",
      },
      {
        type: "script",
        text: "YOU: \"Good girl. Sit back for me.\" [Clean the whole spot properly and say out loud what you are doing] \"More product this time, and I'm pressing harder.\" [To the four of them, not to her] \"Anybody can sell when it works first time. You lot are getting the interesting bit.\" [Count it down out loud, and put the mirror in her hand the second it lands.]",
        textEs: "TÚ: \"Muy bien. Échate para atrás.\" [Limpia bien toda la zona y ve diciendo en alto lo que haces] \"Esta vez más producto, y aprieto más.\" [A los cuatro, no a ella] \"Vender cuando sale a la primera lo hace cualquiera. Vosotros os estáis llevando la parte interesante.\" [Cuenta atrás en voz alta, y ponle el espejo en la mano en cuanto salga.]",
      },
      {
        type: "subheader",
        text: "Script — When It's Dead, It's Dead",
        textEs: "Guion — Si Está Muerta, Está Muerta",
      },
      {
        type: "script",
        text: "YOU: \"Fair enough. It didn't do what I said it would, and I'm not going to argue with a mirror.\" [Straight, warm, smile still on, not one sour word in it] \"Keep your money, my love. Off you go.\" [And that is it. No second product, no cheaper number, no third go. She had her two seconds and she has spent them.]",
        textEs: "TÚ: \"Pues nada. No ha hecho lo que yo he dicho que haría, y no me voy a poner a discutir con un espejo.\" [Directo, con cariño, la sonrisa puesta, sin una gota de rencor] \"Guárdate el dinero, guapa. Anda, ve.\" [Y ya está. Ni otro producto, ni un número más bajo, ni un tercer intento. Ha tenido sus dos segundos y ya los ha gastado.]",
      },
      {
        type: "subheader",
        text: "Script — Straight To The Next One",
        textEs: "Guion — Directo al Siguiente",
      },
      {
        type: "script",
        text: "YOU: [She has gone. Don't stand there watching her go — turn to the four people still stood behind you] \"Right. You've been watching me for five minutes, so you already know I'll tell you the truth.\" [Hand out, big, not a flicker of the last two minutes on your face] \"Give me your hand. Sixty seconds, and you tell me whether it's a con.\"",
        textEs: "TÚ: [Se ha ido. No te quedes ahí mirando cómo se va — gírate hacia las cuatro personas que siguen detrás] \"Venga. Lleváis cinco minutos mirándome, así que ya sabéis que os voy a decir la verdad.\" [La mano tendida, en grande, sin que se te note nada de los dos últimos minutos] \"Dame la mano. Sesenta segundos, y me dices tú si es un cuento.\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "A demo that dies in front of people is still the best advert you'll get all day — as long as you stay curious instead of scared, and as long as you know when to stop. You get one line. If she takes it, clean the skin, go again, and they'll talk about that demo for a week. If she doesn't take it, she is a dead body and there is nothing left in her for you: no scrub, no cheaper number, no third go. This is one of only three times you let a customer walk, and it's the only one that ever happens with an audience — which is exactly why you go quickly and quietly instead of flailing. They aren't judging whether the product worked. They're judging whether you fall apart when it doesn't. And stop it happening where you can: ask about cream before you touch a face, clean the spot properly, work somewhere you've actually looked at.",
        textEs: "Una demo que se muere delante de gente sigue siendo el mejor anuncio del día, siempre que te pongas curioso en vez de asustado y siempre que sepas cuándo parar. Tienes una frase. Si te la coge, limpias la piel, lo repites, y van a hablar de esa demo una semana. Si no te la coge, es un cuerpo muerto y ahí ya no queda nada para ti: ni exfoliante, ni un número más bajo, ni un tercer intento. Es una de las tres únicas veces que dejas marchar a una clienta, y la única que pasa delante de público — justo por eso te vas rápido y sin ruido en vez de descomponerte. No están juzgando si el producto ha funcionado. Están juzgando si te desmoronas cuando no funciona. Y evítalo cuando puedas: pregunta por la crema antes de tocar una cara, limpia bien la zona, trabaja en un sitio que hayas mirado de verdad.",
      },
    ],
    quiz: [
      {
        question: 'She says "See? It does not work, it is a con" and four people are listening. How much fight have you got?',
        questionEs: 'Suelta "¿Ves? No funciona, es un cuento" y hay cuatro personas escuchando. ¿Cuánta pelea te queda?',
        options: [
          'One line. Agree, ask about the cream, offer one clean second go',
          'As long as it takes, because you cannot let a crowd watch you lose one',
          'None at all. Say nothing, put the mirror away and start tidying the table',
          'Three or four more goes, until something on that face finally moves',
        ],
        optionsEs: [
          'Una frase. Le das la razón, preguntas por la crema y un segundo intento',
          'El tiempo que haga falta, no puedes dejar que un corrillo te vea perder',
          'Ninguna. No dices nada, guardas el espejo y te pones a recoger la mesa',
          'Tres o cuatro intentos más, hasta que algo se mueva en esa cara',
        ],
        correctIndex: 0,
        explanation:
          'Two seconds, not two minutes. One line buys you a clean face and a second go — and if she will not take it, there is nothing else to buy.',
        explanationEs:
          'Dos segundos, no dos minutos. Una frase te compra la cara limpia y un segundo intento — y si no te la coge, ya no hay nada más que comprar.',
      },
      {
        question: 'Second go on clean skin, and the line still has not moved. What now?',
        questionEs: 'Segundo intento con la piel limpia, y la línea sigue sin moverse. ¿Y ahora?',
        options: [
          'Get the scrub into her hand — it is the one nobody argues with',
          'Take a rung off the price so she has a reason to stay in the chair',
          'She is a dead body. Thank her, walk her out, go to the next one',
          'Keep working the same line until you get something out of it',
        ],
        optionsEs: [
          'Ponerle el exfoliante en la mano — ese no lo discute nadie',
          'Bajar un escalón el precio para que se quede en la silla',
          'Es un cuerpo muerto. Le das las gracias, la sacas y vas a por el siguiente',
          'Seguir con la misma línea hasta sacarle algo',
        ],
        correctIndex: 2,
        explanation:
          'There is no point trying to sell to a dead body, and in front of a crowd you never pivot to another product. Get them out and go and get the next one.',
        explanationEs:
          'No tiene sentido intentar venderle a un cuerpo muerto, y delante de público nunca te cambias a otro producto. Los sacas y vas a por el siguiente.',
      },
      {
        question: 'Four strangers just watched a demo die. What are they actually judging?',
        questionEs: 'Cuatro desconocidos acaban de ver morirse una demo. ¿Qué están juzgando en realidad?',
        options: [
          'Whether the product does what you stood there and said it would do',
          'How you handle it when it goes wrong right in front of them',
          'Whether the woman was being fair to you about the whole thing',
          'Whether the price you quoted at the start was an honest one',
        ],
        optionsEs: [
          'Si el producto hace lo que has dicho ahí de pie que hacía',
          'Cómo lo gestionas cuando sale mal delante de ellos',
          'Si la señora estaba siendo justa contigo con todo esto',
          'Si el precio que has dicho al principio era honesto',
        ],
        correctIndex: 1,
        explanation:
          'They already assume the good demos are rigged. What nobody can fake is watching somebody leave a dead one without falling apart.',
        explanationEs:
          'Ya dan por hecho que las demos buenas están amañadas. Lo que no se puede fingir es ver a alguien dejar una demo muerta sin desmoronarse.',
      },
    ],
  },

  "S3": {
    id: "S3",
    categoryId: "scenarios",
    title: "Hen Party / Group of Friends",
    titleEs: "Despedida de Soltera / Grupo de Amigas",
    subtitle: "Six of them, one of you, and an hour of pure noise",
    subtitleEs: "Seis de ellas, tú solo, y una hora de ruido puro",
    duration: "5 min",
    icon: "PartyPopper",
    order: 7,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "The Situation",
        textEs: "La Situación",
      },
      {
        type: "paragraph",
        text: "Six women in matching BRIDE SQUAD t-shirts land on your spot. Loud, delighted, half of them three drinks in already. The bride is the quiet one at the back. The loud one in the glasses appoints herself in charge and shouts \"DO ALL OF US!\" They all want doing at once, they're taking selfies, nobody is listening to anybody. This is either the biggest hour of your week or forty minutes of nothing.",
        textEs: "Seis mujeres con camisetas iguales de BRIDE SQUAD caen sobre tu puesto. A gritos, encantadas de la vida, la mitad ya con tres copas. La novia es la callada del fondo. La escandalosa de las gafas se nombra jefa y grita \"¡HÁZNOSLO A TODAS!\" Quieren todas a la vez, se están haciendo fotos, no se escucha nadie. Esto es o la mejor hora de tu semana o cuarenta minutos tirados a la basura.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "COUNT THEM BEFORE YOU DO ANYTHING. Three or fewer, you do all of them — it's quick and they watch each other. Four or more, and this is six, you take ONE. Doing everybody and selling nothing is the worst feeling in this job, and it costs you the whole hour on top.",
          "TAKE THE ONE THEY ALL LOOK AT. Every group has one. Usually the loud one, sometimes the bride. Watch where the eyes go after somebody speaks. Win her and the rest come with her. Leave her out and she'll kill it for fun.",
          "BE LOUDER THAN THEM, ONCE. Not angry — bigger. \"RIGHT, LADIES! I'm doing ONE of you, properly, and the rest of you get to watch and shout.\" A group follows whoever takes the wheel in the first ten seconds.",
          "MAKE THAT ONE DEMO ENORMOUS. You only get one, so give it everything — narrate the lot, get all six counting the sixty seconds out loud, and let them film each other's faces when the mirror comes out. Six women screaming in the street pulls in strangers you never even stopped.",
          "PRICE THEM AS ONE GROUP, NOT AS SIX PEOPLE. When the money comes up, and it will come up loudly, give them a single number to split between them and one gift with the bride's name on it. Six separate conversations about money become one decision they all cheer for.",
          "ONLY OPEN IT UP IF THEY'RE GENUINELY GOING. Phones out, hands up, three of them shouting \"me next\" — that's real, take another one. Polite nodding is not, and neither is one of them being nice to you. If it goes flat after the first mirror, close the one in the chair and keep the rest of your hour.",
        ],
        itemsEs: [
          "CUÉNTALAS ANTES DE HACER NADA. Tres o menos, se las haces a todas — es rápido y se miran entre ellas. Cuatro o más, y esto son seis, coges a UNA. Hacérselo a todas y no vender nada es la peor sensación de este trabajo, y encima te cuesta la hora entera.",
          "COGE A LA QUE MIRAN TODAS. En todo grupo hay una. Normalmente la escandalosa, a veces la novia. Fíjate adónde van los ojos cuando alguien dice algo. Gánatela y las demás vienen detrás. Déjala fuera y te lo revienta por diversión.",
          "SUBE LA VOZ MÁS QUE ELLAS, UNA VEZ. No enfadado — más grande. \"¡VENGA, CHICAS! Se lo hago a UNA, pero bien, y las demás miráis y animáis.\" Un grupo se va detrás de quien coge el volante en los diez primeros segundos.",
          "QUE ESA DEMO SEA ENORME. Solo tienes una, así que dalo todo — cuéntalo todo, que las seis cuenten los sesenta segundos en voz alta y que se graben la cara unas a otras cuando sale el espejo. Seis mujeres chillando en plena calle te traen a desconocidos que ni has parado.",
          "PONLES UN PRECIO DE GRUPO, NO SEIS PRECIOS. Cuando salga el dinero, y va a salir a gritos, dales un número que puedan repartirse entre ellas y un regalo con el nombre de la novia encima. Seis conversaciones sobre dinero se convierten en una sola decisión que aplauden todas.",
          "SOLO LO ABRES A LAS DEMÁS SI SE ESTÁN VOLVIENDO LOCAS DE VERDAD. Móviles fuera, manos arriba, tres gritando \"ahora yo\" — eso es real, coge a otra. Que asientan por educación no lo es, ni que una sea maja contigo. Si después del primer espejo se queda plano, cierras a la que tienes en la silla y te guardas el resto de la hora.",
        ],
      },
      {
        type: "subheader",
        text: "What NOT To Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Do all six. At once, one after another, it makes no difference — six demos, six mirrors, an hour gone and nobody has paid you. That is the worst feeling in this job. One brilliant demo sells the group; six average ones sell nothing at all.",
          "Skip the quiet one when you're choosing. The one who hasn't said a word is very often the one with the money and the least interest in arguing about it.",
          "Go serious on them. Treat a hen do like a consultation and they're gone in thirty seconds. Match the noise.",
          "Argue with the one who's against it. Let her off instead — \"you don't have to, just let me have your friends\" — and she stops working against you.",
        ],
        itemsEs: [
          "Hacérselo a las seis. A la vez o una detrás de otra, da igual — seis demos, seis espejos, una hora fuera y nadie te ha pagado. Esa es la peor sensación de este trabajo. Una demo buenísima te vende al grupo; seis regulares no venden nada.",
          "Pasar de la callada al elegir. La que no ha abierto la boca es muchas veces la que tiene el dinero y las menos ganas de discutirlo.",
          "Ponerte serio con ellas. Trata una despedida de soltera como una consulta y las pierdes en treinta segundos. Ponte a su nivel de ruido.",
          "Discutir con la que va en contra. Suéltala: \"tú no tienes que hacer nada, déjame solo a tus amigas\" — y deja de trabajar en tu contra.",
        ],
      },
      {
        type: "subheader",
        text: "Script — Taking The Wheel",
        textEs: "Guion — Coger el Volante",
      },
      {
        type: "script",
        text: "YOU: \"RIGHT — BRIDE SQUAD! Listen to me!\" [Big, loud, arms out] \"I'm doing ONE of you. One. Properly. And the rest of you are going to stand right here and watch what happens to her face.\" [Beat, then straight at the bride] \"Who is it? The bride? OBVIOUSLY the bride. Everybody in close.\"",
        textEs: "TÚ: \"¡VENGA — BRIDE SQUAD! ¡Escuchadme!\" [Grande, alto, los brazos abiertos] \"Se lo hago a UNA. A una. Bien hecho. Y las demás os quedáis aquí mismo a ver lo que le pasa a esa cara.\" [Pausa, y directo a la novia] \"¿Quién es? ¿La novia? PUES CLARO que la novia. Acercaos todas.\"",
      },
      {
        type: "subheader",
        text: "Script — The Countdown",
        textEs: "Guion — La Cuenta Atrás",
      },
      {
        type: "script",
        text: "YOU: \"Everybody counts with me. Sixty seconds. Ready? THREE, TWO, ONE — GO!\" [They count. You keep it moving] \"FIFTY! FORTY-FIVE!\" [When it lands] \"STOP! Give her the mirror!\" [They scream] \"THAT'S what we do here.\" [Now read them. Screaming, shoving each other forward, phones out — take one more. Polite smiles and a nod — you've got your customer. Go and close her.]",
        textEs: "TÚ: \"Contáis todas conmigo. Sesenta segundos. ¿Listas? ¡TRES, DOS, UNO — YA!\" [Cuentan. Tú las mantienes] \"¡CINCUENTA! ¡CUARENTA Y CINCO!\" [Cuando llega] \"¡ALTO! ¡Dadle el espejo!\" [Chillan] \"ESO es lo que hacemos aquí.\" [Ahora léelas. Si chillan, se empujan para ponerse delante y sacan los móviles, coge a otra. Si sonríen por educación y asienten, ya tienes a tu clienta. Ve a cerrarla.]",
      },
      {
        type: "subheader",
        text: "Script — The Group Number",
        textEs: "Guion — El Número de Grupo",
      },
      {
        type: "script",
        text: "YOU: \"Right. You lot are the best thing that's happened to me all week, so listen.\" [Voice down a bit, like it's a secret] \"One syringe is {currency}300. For you: take two, pay {currency}300, and sort out between yourselves who's putting in what. And the bride doesn't pay for a scrub — that one's from me, wedding present. Who's in?\" [Hands go up] \"Beautiful. Card or cash, and whoever's short pays her mate back on the bus.\"",
        textEs: "TÚ: \"Venga. Sois lo mejor que me ha pasado en toda la semana, así que escuchad.\" [Baja un poco la voz, como si fuera un secreto] \"Una jeringa son {currency}300. Para vosotras: os lleváis dos y pagáis {currency}300, y ya os apañáis entre vosotras quién pone qué. Y la novia no paga el scrub — ese va de mi parte, regalo de boda. ¿Quién se apunta?\" [Se levantan manos] \"Preciosas. Tarjeta o efectivo, y a la que le falte ya se lo devuelve a su amiga en el bus.\"",
      },
      {
        type: "subheader",
        text: "Script — The One Who Isn't Having It",
        textEs: "Guion — La Que No Está Por La Labor",
      },
      {
        type: "script",
        text: "YOU: \"Totally fine, you don't have to do anything.\" [Warm, not a scrap of pressure, then straight back to the group] \"Just let me have your friends for five minutes — look at the bride's face, she's glowing. Here, hold this for me while I finish her.\" [Give her something to hold. Nobody holding something walks off.]",
        textEs: "TÚ: \"Qué va, tranquila, tú no tienes que hacer nada.\" [Con cariño, sin una pizca de presión, y vuelves directo al grupo] \"Déjame solo a tus amigas cinco minutos — mírale la cara a la novia, está radiante. Toma, sujétame esto mientras la termino.\" [Dale algo que sujetar. Nadie que esté sujetando algo se va.]",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "A hen do is the best hour you'll get all week, and the fastest way to waste it is trying to do all of them. Three or fewer, do the lot. Four or more, you take one, you make that one enormous, and you only reach for a second if they are genuinely losing their minds. Doing everybody and selling nothing is the worst feeling in this job. Don't turn any of it into promises either — no \"send me a friend and I'll sort you out next time\", no discount owed to anybody after they leave, because you won't be here and a colleague has to have that argument at the counter. Do the lot today: the group number, the gift with the bride's name on it, the countdown, the photos. Then send them off loud and happy, because a group that leaves screaming is an advert walking down the middle of the street in matching t-shirts.",
        textEs: "Una despedida de soltera es la mejor hora de tu semana, y la forma más rápida de tirarla es intentar hacérselo a todas. Tres o menos, se las haces a todas. Cuatro o más, coges a una, esa la haces enorme, y solo vas a por una segunda si se están volviendo locas de verdad. Hacérselo a todas y no vender nada es la peor sensación de este trabajo. Y no conviertas nada de esto en promesas: nada de \"mándame a una amiga y la próxima te lo compenso\", nada de descuentos que se le deban a alguien cuando ya se ha ido, porque tú no vas a estar y la discusión en el mostrador le toca a un compañero. Hazlo todo hoy: el precio de grupo, el regalo con el nombre de la novia, la cuenta atrás, las fotos. Y luego que se vayan a gritos y encantadas, porque un grupo que se va chillando es un anuncio andando por mitad de la calle con camisetas iguales.",
      },
    ],
    quiz: [
      {
        question: 'Six of them, all shouting "do me next". How do you run it?',
        questionEs: 'Seis, y todas gritando "ahora yo". ¿Cómo lo montas?',
        options: [
          'Six quick demos at once, so that nobody is left standing about waiting',
          'One at a time, all six of them, so every single one of them gets her turn',
          'One of them, huge, with the other five stood round watching and counting',
          'Split them with a colleague so the six of you get through it faster',
        ],
        optionsEs: [
          'Seis demos rápidas a la vez, para que ninguna se quede esperando',
          'De una en una, las seis, para que a todas les toque su turno',
          'A una, enorme, con las otras cinco alrededor mirando y contando',
          'Repartirlas con un compañero para acabar antes con las seis',
        ],
        correctIndex: 2,
        explanation:
          'Four or more and you take one. Six demos and nobody buys is the worst feeling in this job, and it costs you the whole hour as well.',
        explanationEs:
          'Cuatro o más y coges a una. Seis demos y que no compre nadie es la peor sensación de este trabajo, y encima te cuesta la hora entera.',
      },
      {
        question: 'Three friends stop instead of six. Does anything change?',
        questionEs: 'Se paran tres amigas en vez de seis. ¿Cambia algo?',
        options: [
          'No — one volunteer whatever the size of the group, every single time',
          'Yes — with three you do two of them and leave the third one wanting it',
          'No, but you halve each demo so all three of them fit into the same hour',
          'Yes. Three or fewer and you do all of them',
        ],
        optionsEs: [
          'No — una voluntaria sea cual sea el grupo, siempre igual',
          'Sí — con tres le haces a dos y dejas a la tercera con ganas',
          'No, pero partes cada demo por la mitad para que quepan las tres',
          'Sí. Tres o menos y se las haces a todas',
        ],
        correctIndex: 3,
        explanation:
          'Three or fewer, do all of them. The one-volunteer rule starts at four, and it starts there because six demos and no sale is an hour of your life gone.',
        explanationEs:
          'Tres o menos, se las haces a todas. Lo de una sola empieza en cuatro, y empieza ahí porque seis demos sin venta es una hora de tu vida tirada.',
      },
      {
        question: 'Your one demo lands, and the group goes polite and quiet. What now?',
        questionEs: 'Tu única demo sale bien y el grupo se queda callado y educado. ¿Y ahora?',
        options: [
          'Do the next one anyway — they are all stood there waiting for a turn',
          'Close the one in the chair and keep the rest of your hour',
          'Drop the price for the group to get the noise back up again',
          'Start again on somebody else and put more energy into that one',
        ],
        optionsEs: [
          'Hacerle la demo a la siguiente igual — están ahí esperando turno',
          'Cerrar a la que tienes en la silla y guardarte el resto de la hora',
          'Bajar el precio al grupo para que vuelva a subir el ruido',
          'Empezar otra vez con otra y meterle más energía a esa',
        ],
        correctIndex: 1,
        explanation:
          'You only open it up on real excitement — screaming, phones out, three of them shouting "me next". Polite nodding is not that, and it never turns into it.',
        explanationEs:
          'Solo lo abres a las demás si hay entusiasmo de verdad: chillidos, móviles fuera, tres gritando "ahora yo". Que asientan por educación no lo es, y no se convierte en eso.',
      },
    ],
  },

  "S5": {
    id: "S5",
    categoryId: "scenarios",
    title: "The Silent Close",
    titleEs: "El Cierre Silencioso",
    subtitle: "She hasn't said a word, and she's already bought it",
    subtitleEs: "No ha dicho ni una palabra, y ya se lo ha comprado",
    duration: "4 min",
    icon: "Eye",
    order: 5,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "The Situation",
        textEs: "La Situación",
      },
      {
        type: "paragraph",
        text: "A woman sits through your entire demo without making a sound. She watches you apply it. She sits out the sixty seconds. She takes the mirror, looks at her face for a long time, and says nothing. No wow, no lovely, no reaction at all. She hands the mirror back, touches the spot where you worked, and looks at the box on the table. Then at you. Still not a word. This is where most sellers panic and talk the sale to death.",
        textEs: "Una mujer se traga toda tu demo sin hacer un ruido. Te ve aplicarlo. Se aguanta los sesenta segundos. Coge el espejo, se mira la cara un buen rato y no dice nada. Ni un \"anda\", ni un \"qué bien\", nada. Te devuelve el espejo, se toca el sitio donde has trabajado y mira la caja que hay en la mesa. Luego te mira a ti. Sigue sin decir ni una palabra. Aquí es donde la mayoría se pone nerviosa y mata la venta a base de hablar.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "WATCH HER HANDS, NOT HER MOUTH. Still touching the spot. Still holding the mirror. Picking the box up. Those hands are talking to you, and they're saying yes.",
          "COME DOWN TO HER LEVEL. If she's quiet, go quiet. Drop your voice, slow right down. Loud on top of quiet feels like a shove, and being shoved is the one thing that will get her out of that chair.",
          "PUT THE BOX IN HER HANDS AND SAY NOTHING. No pitch, no price, no closing line. Hold it out, smile, wait. Something in her hands is much harder to give back than something on a table.",
          "IF YOU HAVE TO SPEAK, ASK SOMETHING SHE CAN NOD TO. \"Shall I wrap one for you?\" — not \"so what do you think?\". One takes a nod. The other takes a speech in front of a stranger, and she isn't going to make one.",
          "LET THE SILENCE SIT. Nervous talking is the only thing that can lose this. She isn't ignoring you, she's deciding. Stand there, look pleased with yourself, and let her finish.",
        ],
        itemsEs: [
          "MÍRALE LAS MANOS, NO LA BOCA. Que sigue tocándose la zona. Que sigue con el espejo. Que coge la caja. Esas manos te están hablando, y te están diciendo que sí.",
          "BAJA TÚ A SU NIVEL. Si ella va callada, cállate tú. Baja la voz, ve mucho más despacio. Ruido encima de silencio parece un empujón, y que la empujen es lo único que la va a levantar de esa silla.",
          "PONLE LA CAJA EN LAS MANOS Y NO DIGAS NADA. Sin discurso, sin precio, sin frase de cierre. Se la tiendes, sonríes y esperas. Lo que tiene en las manos cuesta mucho más devolverlo que lo que está en la mesa.",
          "SI TIENES QUE HABLAR, PREGÚNTALE ALGO QUE SE CONTESTE CON LA CABEZA. \"¿Te envuelvo uno?\", no \"¿y qué te parece?\". Lo primero se contesta asintiendo. Lo segundo pide un discurso delante de un desconocido, y no lo va a hacer.",
          "DEJA QUE EL SILENCIO SE QUEDE. Lo único que puede perder esto es que te pongas a hablar de los nervios. No te está ignorando, está decidiendo. Quédate ahí, con cara de contento, y déjala terminar.",
        ],
      },
      {
        type: "subheader",
        text: "What NOT To Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Fill the gap with chatter. Every extra sentence gives her something new to think about, and none of it is the mirror.",
          "Ask \"so what do you think?\". You've just asked a quiet person to perform in public. She'll say \"I'll think about it\" to get out of it.",
          "Get louder to bring her round. Every notch you go up, she goes one back. Now she's being sold at instead of looked after.",
          "Decide she isn't interested. Quiet, plus touching the spot, plus looking at the box, is not a no. It's a yes she hasn't announced.",
        ],
        itemsEs: [
          "Rellenar el hueco hablando. Cada frase de más le da algo nuevo en lo que pensar, y nada de eso es el espejo.",
          "Preguntar \"¿y qué te parece?\". Acabas de pedirle a una persona callada que actúe en público. Te va a decir \"me lo pienso\" solo para escaparse.",
          "Subir el tono para animarla. Cada punto que subes tú, ella retrocede otro. Ahora ya no la estás cuidando, se la estás colocando.",
          "Dar por hecho que no le interesa. Callada, tocándose la zona y mirando la caja no es un no. Es un sí que todavía no ha anunciado.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Silent Hand-Off",
        textEs: "Guion — La Entrega Silenciosa",
      },
      {
        type: "script",
        text: "YOU: [Not a word. Put the box gently into her hands. Soft eye contact. Smile. Wait.] [If she's still holding it after three seconds, she's bought it — get the bag out and start wrapping.]",
        textEs: "TÚ: [Ni una palabra. Ponle la caja en las manos con suavidad. Contacto visual suave. Sonríe. Espera.] [Si a los tres segundos la sigue sujetando, se la ha comprado — saca la bolsa y empieza a envolver.]",
      },
      {
        type: "subheader",
        text: "Script — The Gentle Question",
        textEs: "Guion — La Pregunta Suave",
      },
      {
        type: "script",
        text: "YOU: [Voice right down, almost a whisper] \"Shall I do you one?\" [Then nod slowly, once, while you look at her. Say nothing else at all. The nod does the work.]",
        textEs: "TÚ: [La voz muy baja, casi un susurro] \"¿Te preparo uno?\" [Y asiente despacio, una vez, mirándola. No digas absolutamente nada más. El gesto hace el trabajo.]",
      },
      {
        type: "subheader",
        text: "Script — Give Her The Room",
        textEs: "Guion — Dale Aire",
      },
      {
        type: "script",
        text: "YOU: \"I'm not going anywhere.\" [Half a step back. Busy yourself with something on the table for ten seconds — tidy the samples, wipe the mirror] [Then look up, warm] \"Go on then. Which one?\"",
        textEs: "TÚ: \"Yo no me muevo de aquí.\" [Medio paso atrás. Entretente diez segundos con algo de la mesa — coloca las muestras, limpia el espejo] [Y luego levanta la vista, con cariño] \"Venga. ¿Cuál te llevas?\"",
      },
      {
        type: "subheader",
        text: "Script — Two Boxes On The Table",
        textEs: "Guion — Dos Cajas en la Mesa",
      },
      {
        type: "script",
        text: "YOU: \"One is {currency}300.\" [Pause. Let it sit there] \"Two — one for you, one for whoever you're thinking about right now — is also {currency}300, because I put the second one in myself.\" [Set both boxes down in front of her. Don't touch them again. Don't say another word.]",
        textEs: "TÚ: \"Uno son {currency}300.\" [Pausa. Deja que se quede ahí] \"Dos — uno para ti y otro para esa persona en la que estás pensando ahora mismo — también son {currency}300, porque el segundo lo pongo yo.\" [Deja las dos cajas delante de ella. No las vuelvas a tocar. No digas ni una palabra más.]",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Quiet is not no. Watch her hands, not her mouth. Still touching the spot? Still hanging on to the mirror? She's already bought it, she just hasn't told you. Put the box in her hands, smile, and say nothing at all. And keep the three-second hold in your head: if she holds it for three seconds without handing it back, stop talking and start bagging.",
        textEs: "El silencio no es un no. Mírale las manos, no la boca. ¿Sigue tocándose la zona? ¿Sigue aferrada al espejo? Ya se lo ha comprado, lo que pasa es que no te lo ha dicho. Ponle la caja en las manos, sonríe y no digas absolutamente nada. Y quédate con la regla de los tres segundos en la mano: si la sujeta tres segundos sin devolvértela, deja de hablar y empieza a envolver.",
      },
    ],
    quiz: [
      {
        question: 'Two minutes of silence, but she is still touching the spot you worked on. What is that?',
        questionEs: 'Dos minutos callada, pero sigue tocándose la zona que le has trabajado. ¿Qué es eso?',
        options: [
          'A polite no she has not worked out how to say',
          'Boredom — she is waiting for a gap to walk off in',
          'Confusion — she needs the whole thing explaining to her again slowly',
          'A yes she has not announced. Get the box into her hands',
        ],
        optionsEs: [
          'Un no educado que todavía no sabe cómo decirte',
          'Aburrimiento — está esperando un hueco para irse',
          'Confusión — necesita que se lo expliques todo otra vez y despacio',
          'Un sí que no ha anunciado. Ponle la caja en las manos',
        ],
        correctIndex: 3,
        explanation:
          'Watch her hands, not her mouth. Still touching, still holding the mirror, still looking at the box — those hands are saying yes.',
        explanationEs:
          'Mírale las manos, no la boca. Que sigue tocándose, que sigue con el espejo, que mira la caja — esas manos dicen que sí.',
      },
      {
        question: 'You have to say something. Which question?',
        questionEs: 'Tienes que decir algo. ¿Qué pregunta?',
        options: [
          '"So, what do you think of it then?"',
          '"Any questions before you decide?"',
          '"Shall I wrap one for you?"',
          '"Do you want a think and see how you feel?"',
        ],
        optionsEs: [
          '"¿Y qué te parece entonces?"',
          '"¿Alguna duda antes de decidir?"',
          '"¿Te envuelvo uno?"',
          '"¿Quieres pensártelo y ver cómo lo ves?"',
        ],
        correctIndex: 2,
        explanation:
          'One of these takes a nod. The others ask a quiet person to make a speech in front of a stranger, and she will not.',
        explanationEs:
          'Una de estas se contesta asintiendo. Las otras le piden a una persona callada un discurso delante de un desconocido, y no lo va a hacer.',
      },
      {
        question: 'She goes quiet, you get nervous. What is the one thing that loses this sale?',
        questionEs: 'Ella se calla y tú te pones nervioso. ¿Qué es lo único que puede perder esta venta?',
        options: [
          'Standing there saying nothing while she decides',
          'Filling the silence with another sentence, then another',
          'Putting the box into her hands without a word said',
          'Stepping back half a pace and tidying the table a moment',
        ],
        optionsEs: [
          'Quedarte ahí sin decir nada mientras ella decide',
          'Rellenar el silencio con otra frase, y luego otra',
          'Ponerle la caja en las manos sin decir nada',
          'Dar medio paso atrás y ordenar la mesa un momento',
        ],
        correctIndex: 1,
        explanation:
          'Every extra sentence gives her something new to think about, and none of it is the mirror. Silence is not your enemy here.',
        explanationEs:
          'Cada frase de más le da algo nuevo en lo que pensar, y nada de eso es el espejo. Aquí el silencio no es tu enemigo.',
      },
    ],
  },

  "S6": {
    id: "S6",
    categoryId: "scenarios",
    title: "The Tour Group on the Clock",
    titleEs: "El Grupo con el Tiempo Contado",
    subtitle: "Three and a half hours, four languages, one chair",
    subtitleEs: "Tres horas y media, cuatro idiomas, una silla",
    duration: "4 min",
    icon: "Timer",
    order: 4,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "The Situation",
        textEs: "La Situación",
      },
      {
        type: "paragraph",
        text: "A day-trip crowd spills into the main street in {locationName} — cruise passengers, coach parties, lanyards round every neck. They've got three and a half hours and then they're gone. One couple has barely any English, another pair are arguing about the way back to the port, somebody is photographing a bin. You step in front of one woman and she comes in — with three of her group trailing after her, all of them checking the time. Money and a clock, and four faces looking at you. You are not doing four demos in three minutes. You are doing ONE, and you are doing it in front of the other three.",
        textEs: "Cae un grupo de excursión en la calle principal de {locationName} — pasajeros de crucero, gente de autocar, acreditaciones colgadas de todos los cuellos. Tienen tres horas y media y se van. Una pareja casi no habla inglés, otra está discutiendo por dónde se vuelve al puerto y alguien está fotografiando una papelera. Te pones delante de una mujer y entra — con tres de su grupo detrás, todas mirando la hora. Dinero y un reloj, y cuatro caras mirándote. No vas a hacer cuatro demos en tres minutos. Vas a hacer UNA, y la vas a hacer delante de las otras tres.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "ONE OUT OF THE CROWD. Three or fewer at your table, do all of them — it's quick. Four or more, and a coach party is always four or more, you take ONE and do her properly with the rest stood round watching. Do everybody and sell nothing and there goes your three and a half hours.",
          "HOOK HER IN FIVE SECONDS, NOT FIFTEEN. She's drowning in signs and noise. Hold the syringe up where she can see it and give her one sentence: \"Sixty seconds, one wrinkle, gone — want to see?\" Movement plus a question stops feet.",
          "GIVE HER BOTH NUMBERS EARLY. Day-trippers have spent all morning comparing prices in three countries. \"Back in Europe this is {currency}500. Here it's {currency}300.\" Now she's got somewhere to put your price.",
          "CUT THE DEMO IN HALF. Three minutes becomes ninety seconds. Apply, count out loud, mirror, price, close. No routine talk, no ingredient talk. \"{currency}300, every card there is, and you're out of here in two minutes.\"",
          "MAKE THE CLOCK A REASON, NOT A THREAT. \"You've got two hours left — do you want to spend them walking round looking like this, or like this?\" Time is on your side as long as it stays a joke.",
          "GET IT DONE TODAY. She's on a boat tonight and she isn't back on Thursday. Nothing gets held, nothing gets promised for later, nothing waits. It happens in the chair or it doesn't happen.",
        ],
        itemsEs: [
          "UNA DE TODO EL GRUPO. Tres o menos en tu mesa, se las haces a todas — es rápido. Cuatro o más, y un grupo de autocar siempre son cuatro o más, coges a UNA y se la haces bien con las demás alrededor mirando. Hazlo con todas sin vender nada y ahí se te han ido las tres horas y media.",
          "ENGÁNCHALA EN CINCO SEGUNDOS, NO EN QUINCE. Está ahogada en carteles y ruido. Levanta la jeringa donde la vea y suéltale una sola frase: \"Sesenta segundos, una arruga, fuera — ¿quieres verlo?\" Movimiento más pregunta para los pies.",
          "DALE LOS DOS NÚMEROS PRONTO. Los de excursión llevan toda la mañana comparando precios en tres países. \"En Europa esto son {currency}500. Aquí son {currency}300.\" Ya tiene dónde colocar tu precio.",
          "PARTE LA DEMO POR LA MITAD. Los tres minutos se quedan en noventa segundos. Aplica, cuenta en voz alta, espejo, precio, cierre. Nada de rutinas ni de ingredientes. \"{currency}300, todas las tarjetas que existen, y te vas de aquí en dos minutos.\"",
          "QUE EL RELOJ SEA UN MOTIVO, NO UNA AMENAZA. \"Te quedan dos horas — ¿las quieres pasar dando vueltas con esta cara, o con esta otra?\" El tiempo juega a tu favor mientras siga siendo una broma.",
          "QUE SE HAGA HOY. Esta noche está en un barco y el jueves no vuelve. Aquí no se guarda nada, no se promete nada para luego, no espera nada. O pasa en la silla o no pasa.",
        ],
      },
      {
        type: "subheader",
        text: "What NOT To Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Open with a story. They haven't got time for your life. Hook, demo, price, done.",
          "Ask big questions. \"What's your skincare routine?\" is a two-minute answer you don't need. Assume she's interested and move.",
          "Panic her about the time. \"Hurry up, your coach!\" makes her leave. The clock is a joke you share, not a stick you hit her with.",
          "Write her off as a looker. She's on holiday, she's got money on her, and she decided this morning that today is a spending day. Ask for the sale every time.",
          "Make a drama of the language. Get the translator out, show her the product page in her own language, point at the mirror. It happens all day on this street and it has never once been the reason a sale did not happen.",
        ],
        itemsEs: [
          "Empezar con una historia. No tienen tiempo para tu vida. Gancho, demo, precio, listo.",
          "Hacer preguntas grandes. \"¿Cuál es tu rutina de piel?\" es una respuesta de dos minutos que no te hace falta. Da por hecho que le interesa y tira.",
          "Meterle prisa con el tiempo. \"¡Corre, que se te va el autocar!\" hace que se vaya. El reloj es una broma compartida, no un palo.",
          "Descartarla porque \"solo mira\". Está de vacaciones, lleva dinero encima y esta mañana ya ha decidido que hoy se gasta. Pide la venta siempre.",
          "Montar un drama con el idioma. Saca el traductor, enséñale la ficha del producto en su idioma, señala el espejo. Pasa todos los días en esta calle y no ha sido nunca el motivo de que una venta no salga.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Ten-Second Hook",
        textEs: "Guion — El Gancho de Diez Segundos",
      },
      {
        type: "script",
        text: "YOU: \"Excuse me — sixty seconds, one line, completely gone. Want to see it?\" [Syringe up, eye contact, big smile] \"Two minutes of your time, and I'm right here.\"",
        textEs: "TÚ: \"¡Perdona! Sesenta segundos, una línea, fuera del todo. ¿Quieres verlo?\" [Jeringa en alto, contacto visual, sonrisa grande] \"Dos minutos de tu tiempo, y estoy aquí mismo.\"",
      },
      {
        type: "subheader",
        text: "Script — The Speed Demo + Close",
        textEs: "Guion — La Demo Rápida + Cierre",
      },
      {
        type: "script",
        text: "YOU: \"Right here, on this line. Now we count. Sixty, fifty-five, fifty…\" [Keep the energy up, keep counting] \"…ten, five, DONE. Look.\" [Mirror straight into her hand] \"That was there a minute ago. {currency}300, I take every card there is. Shall I wrap one before your lot move off?\"",
        textEs: "TÚ: \"Aquí mismo, en esta línea. Ahora contamos. Sesenta, cincuenta y cinco, cincuenta...\" [Mantén la energía, sigue contando] \"...diez, cinco, ¡LISTO! Mira.\" [El espejo directo a su mano] \"Eso estaba ahí hace un minuto. {currency}300, acepto todas las tarjetas que existen. ¿Te envuelvo uno antes de que se muevan los tuyos?\"",
      },
      {
        type: "subheader",
        text: "Script — The Walk-Back Close",
        textEs: "Guion — El Cierre de Vuelta al Grupo",
      },
      {
        type: "script",
        text: "YOU: \"Picture getting back on that coach and the woman next to you going 'what have you DONE?'\" [Grin] \"Everybody else is going home with a fridge magnet. {currency}300, all cards, thirty seconds and you're gone.\"",
        textEs: "TÚ: \"Imagínate volver al autocar y que la de al lado te diga '¿pero qué te has HECHO?'\" [Sonríe] \"Los demás se van a casa con un imán de nevera. {currency}300, todas las tarjetas, treinta segundos y te vas.\"",
      },
      {
        type: "subheader",
        text: "Script — When There's No Shared Language",
        textEs: "Guion — Cuando No Hay Idioma en Común",
      },
      {
        type: "script",
        text: "YOU: \"No problem, no problem!\" [Phone out, translator open, and keep smiling while you type — it takes ten seconds and it is not a drama] \"Look. Sixty seconds. Line — gone.\" [Mirror. A mirror doesn't need translating.] \"And here — the page, in your language.\" [Product page on the screen, phone into her hand] \"{currency}300. Card? Cash? All good!\" [Point at the terminal, big smile. Half this street sells in four languages a day.]",
        textEs: "TÚ: \"¡No pasa nada, no pasa nada!\" [Saca el móvil, abre el traductor y sigue sonriendo mientras escribes — son diez segundos y no es ningún drama] \"Mira. Sesenta segundos. La línea — fuera.\" [Espejo. Un espejo no necesita traducción.] \"Y aquí — la página, en tu idioma.\" [La ficha del producto en la pantalla, el móvil a su mano] \"{currency}300. ¿Tarjeta? ¿Efectivo? ¡Todo bien!\" [Señala el datáfono, sonrisa grande. Media calle vende en cuatro idiomas al día.]",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Learn the arrivals. Know which mornings the big groups land and what time they have to be back on board, because \"I've got to be at the port by four\" tells you exactly how long you've got and how hard you can push. And use the souvenir line — these people are sick of buying tat they'll bin when they get home. A pot of something that lasts them months feels clever, and clever is exactly how she wants to feel handing over {currency}300 in a street she's never been in before.",
        textEs: "Apréndete las llegadas. Sabe qué mañanas caen los grupos grandes y a qué hora tienen que estar de vuelta a bordo, porque \"tengo que estar en el puerto a las cuatro\" te dice exactamente cuánto tiempo tienes y cuánto puedes apretar. Y usa lo del souvenir — esta gente está harta de comprar cachivaches que acaban en un cajón. Un bote de algo que le dura meses le parece una compra lista, y lista es justo como quiere sentirse soltando {currency}300 en una calle en la que no ha estado nunca.",
      },
    ],
    quiz: [
      {
        question: 'Four of them come in together off the same coach. Who gets the demo?',
        questionEs: 'Entran cuatro juntas del mismo autocar. ¿A quién le haces la demo?',
        options: [
          'All four, but you halve each one so they still make the coach',
          'Whoever asks loudest, and then the other three if there is time',
          'One of them, done properly, with the other three stood watching',
          'Nobody yet — get all four prices out first and see who bites',
        ],
        optionsEs: [
          'A las cuatro, pero partes cada demo para que lleguen al autocar',
          'A la que más grite, y luego a las otras tres si te da tiempo',
          'A una, bien hecha, con las otras tres alrededor mirando',
          'A ninguna todavía — sueltas los cuatro precios y ves quién pica',
        ],
        correctIndex: 2,
        explanation:
          'Three or fewer, do all of them. Four or more, you take one — because doing everybody and selling nothing is how a whole afternoon disappears.',
        explanationEs:
          'Tres o menos, se las haces a todas. Cuatro o más, coges a una — porque hacérselo a todo el mundo y no vender nada es como se te va una tarde entera.',
      },
      {
        question: 'She has two hours before the coach goes. What does that clock do for you?',
        questionEs: 'Le quedan dos horas para que salga el autocar. ¿Qué hace ese reloj por ti?',
        options: [
          'It is a reason to do it now, said as a joke',
          'It is a threat — remind her she will miss the coach',
          'It is a problem — she has not got time for a demo',
          'It is nothing to do with you, so never mention it at all',
        ],
        optionsEs: [
          'Es un motivo para hacerlo ya, dicho en broma',
          'Es una amenaza — recuérdale que pierde el autocar',
          'Es un problema — no tiene tiempo para una demo',
          'No es asunto tuyo, así que ni lo menciones nunca',
        ],
        correctIndex: 0,
        explanation:
          'Time is on your side as long as it stays a joke you share. "Hurry up, your coach!" is a stick, and she leaves.',
        explanationEs:
          'El tiempo juega a tu favor mientras siga siendo una broma compartida. "¡Corre, que se te va el autocar!" es un palo, y se va.',
      },
      {
        question: 'Cruise passenger, ninety seconds of attention. What do you cut?',
        questionEs: 'Pasajera de crucero, noventa segundos de atención. ¿Qué recortas?',
        options: [
          'The mirror — she has not got time to sit and look',
          'The routine talk and the ingredients. Apply, count, mirror, price',
          'The price — leave that until she has felt it properly',
          'The demo itself — just tell her what it does and then take the money',
        ],
        optionsEs: [
          'El espejo — no tiene tiempo de sentarse a mirarse',
          'La charla de rutinas y los ingredientes. Aplica, cuenta, espejo, precio',
          'El precio — déjalo para cuando lo haya notado bien',
          'La demo — le cuentas lo que hace y le cobras directamente',
        ],
        correctIndex: 1,
        explanation:
          'Three minutes becomes ninety seconds and the mirror never goes. What comes out is everything that was never selling anything.',
        explanationEs:
          'Los tres minutos se quedan en noventa segundos y el espejo no se quita nunca. Lo que sobra es todo lo que nunca vendió nada.',
      },
      {
        question: 'She loves it, then says she will pop back after lunch. What do you know?',
        questionEs: 'Le encanta, y luego te dice que se pasa después de comer. ¿Qué sabes tú?',
        options: [
          'She will, and she will bring somebody with her',
          'She is being polite and does not want the thing',
          'She means it, so make a note of what she wanted and who she was',
          'She is on a boat tonight. It happens now or not at all',
        ],
        optionsEs: [
          'Que sí, y que se va a traer a alguien con ella',
          'Que está siendo educada y no lo quiere',
          'Que lo dice en serio, apunta qué quería y quién era',
          'Que esta noche está en un barco. O pasa ahora o no pasa',
        ],
        correctIndex: 3,
        explanation:
          'She is not back on Thursday and she is not back after lunch. Nothing gets held and nothing waits — it goes in the bag in that chair.',
        explanationEs:
          'Ni vuelve el jueves ni vuelve después de comer. Aquí no se guarda nada y no espera nada — va a la bolsa en esa silla.',
      },
    ],
  },

  "S7": {
    id: "S7",
    categoryId: "scenarios",
    title: "Children Interrupting",
    titleEs: "Niños Interrumpiendo",
    subtitle: "Two minutes of peace is the whole sale",
    subtitleEs: "Dos minutos de paz son toda la venta",
    duration: "4 min",
    icon: "Baby",
    order: 3,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "The Situation",
        textEs: "La Situación",
      },
      {
        type: "paragraph",
        text: "A mother stops with a four-year-old. She's interested — you can see it. But the kid is bored out of his mind. Two minutes in he's whining, hanging off her arm, and then he's on the floor going full tantrum. She's mortified, apologising to you, trying to calm him down and listen to you at the same time. She's already picking her bag up. And you haven't closed anything.",
        textEs: "Una madre se para con un niño de cuatro años. Está interesada — se le nota. Pero el crío se aburre como una ostra. A los dos minutos ya está lloriqueando, colgado del brazo de su madre, y luego se tira al suelo con una rabieta de las buenas. Ella está muerta de vergüenza, pidiéndote perdón, intentando calmarlo y escucharte a la vez. Ya está cogiendo el bolso. Y tú no has cerrado nada.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "DEAL WITH THE CHILD FIRST. He is the one deciding whether this sale happens. Get down to his height, smile at him, put something in his hands. A busy kid is a calm mother.",
          "HALVE YOUR PITCH. You've got half the normal time and half her attention. Get to the mirror. Everything else can go.",
          "GIVE HIM A JOB. \"Can you count to sixty for me? Ready?\" Kids will do almost anything for somebody who treats them like staff. A child counting is a child not screaming.",
          "KEEP SOMETHING IN THE DRAWER FOR THEM. Stickers, a little sample he can squash, a pen and a bit of paper. Five minutes of distraction is exactly as long as you need.",
          "CLOSE IT WHILE YOU'VE GOT HER. Don't send her off to walk it round and think about it. She isn't coming back today — she's got a child and a timetable. It goes in the bag now, or you lose it now.",
        ],
        itemsEs: [
          "OCÚPATE PRIMERO DEL NIÑO. Él es quien decide si esta venta pasa o no. Ponte a su altura, sonríele, ponle algo en las manos. Un crío entretenido es una madre tranquila.",
          "PARTE TU DISCURSO POR LA MITAD. Tienes la mitad del tiempo normal y la mitad de su atención. Llega al espejo. Todo lo demás sobra.",
          "DALE UN TRABAJO. \"¿Sabes contar hasta sesenta? ¿Preparado?\" Los críos hacen casi cualquier cosa por alguien que los trata como personal. Un niño contando es un niño que no chilla.",
          "TEN ALGO EN EL CAJÓN PARA ELLOS. Pegatinas, una muestrita que pueda aplastar, un boli y un papel. Cinco minutos de distracción es exactamente lo que necesitas.",
          "CIÉRRALO MIENTRAS LA TIENES. No la mandes a dar una vuelta a pensárselo. Hoy no vuelve — tiene un niño y unos horarios. O va a la bolsa ahora, o lo pierdes ahora.",
        ],
      },
      {
        type: "subheader",
        text: "What NOT To Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Pretend the child isn't there. She feels judged and he gets louder, because louder is what works for him.",
          "Comment on her parenting. Not even as a joke. That's a sale lost and a review earned.",
          "Keep talking over the screaming. She can't hear you and she can't think. Stop, sort the kid out, then start again.",
          "Let her leave on a maybe. \"Come back later\" with a small child means never. Either it goes in the bag now or you wave her off and mean it.",
        ],
        itemsEs: [
          "Hacer como si el niño no estuviera. Ella se siente juzgada y él sube el volumen, porque subir el volumen es lo que a él le funciona.",
          "Opinar sobre cómo educa a su hijo. Ni en broma. Eso es una venta perdida y una reseña ganada.",
          "Seguir hablando por encima de los gritos. Ni te oye ni puede pensar. Para, arregla lo del niño, y empieza otra vez.",
          "Dejarla ir con un \"ya veremos\". \"Vuelve luego\" con un niño pequeño significa nunca. O va a la bolsa ahora, o te despides de ella de verdad.",
        ],
      },
      {
        type: "subheader",
        text: "Script — Give The Kid A Job",
        textEs: "Guion — Dale un Trabajo al Niño",
      },
      {
        type: "script",
        text: "YOU: \"Hello! Do you want a job?\" [Down on his level, straight to him, not to her] \"Your job is to hold this —\" [Give him the box] \"— and when I say GO, you count with me. Can you get to sixty?\" [He nods] \"BRILLIANT. Ready? GO! Sixty, fifty-nine…\" [Mum is now watching you instead of watching him, and she is extremely grateful]",
        textEs: "TÚ: \"¡Hola! ¿Quieres un trabajo?\" [A su altura, directo a él, no a ella] \"Tu trabajo es sujetar esto —\" [Dale la caja] \"— y cuando yo diga YA, cuentas conmigo. ¿Llegas hasta sesenta?\" [Dice que sí con la cabeza] \"¡GENIAL! ¿Listo? ¡YA! Sesenta, cincuenta y nueve...\" [Ahora la madre te mira a ti en vez de a él, y te lo está agradeciendo muchísimo]",
      },
      {
        type: "subheader",
        text: "Script — The Short Version",
        textEs: "Guion — La Versión Corta",
      },
      {
        type: "script",
        text: "YOU: \"You've got your hands full, so I'm giving you the short version.\" [Fast demo, no talking round it] \"There. {currency}300, lasts you months, two minutes a day. I'll put one in a bag while you get him off the floor — pay me and you're out of here before he starts again.\"",
        textEs: "TÚ: \"Vas hasta arriba, así que te doy la versión corta.\" [Demo rápida, sin rodeos] \"Ya está. {currency}300, te dura meses, dos minutos al día. Te lo meto en la bolsa mientras lo levantas del suelo — me pagas y te vas de aquí antes de que empiece otra vez.\"",
      },
      {
        type: "subheader",
        text: "Script — Ask Her First",
        textEs: "Guion — Pregúntale a Ella Primero",
      },
      {
        type: "script",
        text: "YOU: [To her, quietly] \"Can he have a sticker? Is that alright?\" [She'll say yes, and she'll love you for asking] [To him, big] \"Right! I've got the good ones. Which do you want — the dinosaur or the star?\" [A choice, not a question he can say no to] [Back to her while he decides] \"Okay. Sixty seconds. Watch this line here.\"",
        textEs: "TÚ: [A ella, bajito] \"¿Le puedo dar una pegatina? ¿Te parece bien?\" [Va a decir que sí, y te va a adorar por preguntar] [A él, en grande] \"¡Venga! Tengo de las buenas. ¿Cuál quieres, el dinosaurio o la estrella?\" [Una elección, no una pregunta a la que pueda decir que no] [Otra vez a ella, mientras el crío decide] \"Vale. Sesenta segundos. Mira esta línea de aquí.\"",
      },
      {
        type: "subheader",
        text: "Script — Hand Him To A Colleague",
        textEs: "Guion — Pásaselo a un Compañero",
      },
      {
        type: "script",
        text: "YOU: [To your colleague] \"Marco! Have you still got the stickers?\" [To the child] \"Marco's got the special ones — go and see!\" [To her, as he runs over and stays in sight] \"Right. Two minutes of quiet. Let's not waste them. Give me your hand.\"",
        textEs: "TÚ: [A tu compañero] \"¡Marco! ¿Te quedan pegatinas?\" [Al niño] \"¡Marco tiene las especiales — ve a verlas!\" [A ella, mientras el crío va corriendo y sigue a la vista] \"Venga. Dos minutos de tranquilidad. No los desperdiciemos. Dame la mano.\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Keep a bag of kid stuff on the table — stickers, a mini colouring book, a sample sachet they can squash. It costs about {currency}5 and it buys you the only thing you actually need, which is her attention. And learn to read the mother before it goes wrong: the moment her eyes start flicking to him every few seconds, you've got about ninety seconds left. Go to the child then, not once he's on the floor. The good sellers on this street aren't just good at selling — they see what's about to happen and move first.",
        textEs: "Ten una bolsita de cosas de niños en la mesa — pegatinas, un mini cuaderno para colorear, una muestra que puedan aplastar. Te cuesta unos {currency}5 y te compra lo único que de verdad necesitas, que es la atención de ella. Y aprende a leer a la madre antes de que se tuerza: en cuanto los ojos se le empiezan a ir hacia el niño cada dos por tres, te quedan unos noventa segundos. Ve a por el crío en ese momento, no cuando ya está tirado en el suelo. Los buenos vendedores de esta calle no solo venden bien — ven lo que va a pasar y se mueven antes.",
      },
    ],
    quiz: [
      {
        question: 'The four-year-old is winding up and mum is reaching for her bag. Who do you deal with first?',
        questionEs: 'El niño de cuatro años se está calentando y la madre ya coge el bolso. ¿A quién atiendes primero?',
        options: [
          'Mum — get to the mirror before the child kicks off',
          'Neither — wait it out, they always calm down in the end',
          'The child. A busy kid is a calm mother',
          'Whoever is loudest, because that is what is stopping you',
        ],
        optionsEs: [
          'A la madre — llega al espejo antes de que estalle el crío',
          'A ninguno — aguanta, al final siempre se calman',
          'Al niño. Un crío entretenido es una madre tranquila',
          'Al que grite más, que es lo que te está frenando',
        ],
        correctIndex: 2,
        explanation:
          'He is the one deciding whether this sale happens. Get down to his height and put something in his hands.',
        explanationEs:
          'Él es quien decide si esta venta pasa o no. Ponte a su altura y ponle algo en las manos.',
      },
      {
        question: 'What do you give the boy?',
        questionEs: '¿Qué le das al niño?',
        options: [
          'A job — counting the sixty seconds out loud',
          'A sweet, so he has something to get on with',
          'A stern look, so mum knows you are on her side',
          'The syringe to hold, because kids love shiny things',
        ],
        optionsEs: [
          'Un trabajo — contar los sesenta segundos en alto',
          'Un caramelo, para que tenga algo que hacer',
          'Una mirada seria, para que la madre vea que la apoyas',
          'La jeringa para sujetarla, que a los críos les encanta',
        ],
        correctIndex: 0,
        explanation:
          'Kids will do almost anything for somebody who treats them like staff. A child counting is a child not screaming.',
        explanationEs:
          'Los críos hacen casi cualquier cosa por alguien que los trata como personal. Un niño contando es un niño que no chilla.',
      },
      {
        question: 'She likes it, but the child is on the floor screaming. What now?',
        questionEs: 'A ella le gusta, pero el crío está en el suelo chillando. ¿Y ahora?',
        options: [
          'Short version, price, bag — she pays and she is out',
          '"Have a walk round with him and pop back when he settles"',
          '"Take my number and message me when you have decided"',
          'Wait quietly until she has him calm, then start the pitch again',
        ],
        optionsEs: [
          'Versión corta, precio, bolsa — paga y se va',
          '"Dad una vuelta y os pasáis cuando se calme"',
          '"Apúntate mi número y me escribes cuando lo decidas"',
          'Esperar callado a que lo calme y empezar otra vez el discurso',
        ],
        correctIndex: 0,
        explanation:
          'She is not coming back today — she has a child and a timetable. It goes in the bag now, or you lose it now.',
        explanationEs:
          'Hoy no vuelve — tiene un niño y unos horarios. O va a la bolsa ahora, o lo pierdes ahora.',
      },
    ],
  },

  "S9": {
    id: "S9",
    categoryId: "scenarios",
    title: "The Skeptical Man",
    titleEs: "El Hombre Escéptico",
    subtitle: "The one stood behind her with his arms crossed",
    subtitleEs: "El que está detrás de ella con los brazos cruzados",
    duration: "4 min",
    icon: "Frown",
    order: 2,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "The Situation",
        textEs: "La Situación",
      },
      {
        type: "paragraph",
        text: "A couple stops. She's interested — watching, asking what's in it, picking the boxes up. He's two steps back with his arms folded, looking at his phone, and every time she says something nice he says \"it's a scam\", \"you don't need that\", \"come on, we're wasting time\". She's going quiet because of him. But you can see she wants it. So what do you do with him?",
        textEs: "Se para una pareja. Ella está interesada — mirando, preguntando qué lleva, cogiendo las cajas. Él está dos pasos atrás con los brazos cruzados, mirando el móvil, y cada vez que ella dice algo bueno él suelta \"es un timo\", \"tú no necesitas eso\", \"venga, que estamos perdiendo el tiempo\". Ella se está callando por él. Pero tú ves que lo quiere. ¿Qué haces con él?",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "DON'T ARGUE WITH HIM. The moment it's you against him, she has to pick, and she picks him. You are never winning that one and you don't need to.",
          "BRING HIM IN. THIS IS THE FIRST MOVE, NOT THE LAST ONE. He doesn't want a debate, he wants proof he can feel. \"You look like a man who wants proof. Give me your hand.\" Nobody stays folded up with their arms crossed while somebody's working on their hand.",
          "MAKE HIM THE EXPERT, NOT THE OBSTACLE. \"You know her better than I do — does she look after her skin, or is this new?\" Ask him something only he can answer and he stops being the bloke at the back.",
          "GIVE HIM A BET HE THINKS HE'S WINNING. \"Sixty seconds. If she looks in that mirror and she isn't impressed, I'll tell her myself to walk away.\" He takes it because it sounds like a free win — and the second he takes it, he's in it with you.",
          "ONLY IF HE IS PURE BAD ENERGY DO YOU GIVE HIM UP. Not bored, not quiet, not on his phone — those are the ones you bring in. Nasty, decided to have a bad afternoon, still swinging after you've tried all three: then \"don't worry, it's ladies' business anyway\", light and with a smile, and every scrap of you goes on her.",
        ],
        itemsEs: [
          "NO DISCUTAS CON ÉL. En cuanto esto es tú contra él, ella tiene que elegir, y lo elige a él. Esa no la ganas nunca, y tampoco te hace falta.",
          "MÉTELO DENTRO. ESTA ES LA PRIMERA JUGADA, NO LA ÚLTIMA. Él no quiere un debate, quiere una prueba que pueda notar. \"Tienes pinta de ser de los que quieren pruebas. Dame la mano.\" Nadie sigue con los brazos cruzados mientras le están trabajando la mano.",
          "HAZLO EL EXPERTO, NO EL OBSTÁCULO. \"Tú la conoces mejor que yo — ¿ella se cuida la piel, o esto es nuevo?\" Pregúntale algo que solo pueda contestar él y deja de ser el señor del fondo.",
          "DALE UNA APUESTA QUE CREA QUE GANA. \"Sesenta segundos. Si se mira en ese espejo y no le impresiona, le digo yo que se vaya.\" La acepta porque le suena a victoria gratis — y en cuanto la acepta, ya está dentro contigo.",
          "SOLO SI VA CON MUY MALA LECHE LO SUELTAS. Aburrido no, callado no, con el móvil no — a esos los metes dentro. Borde de verdad, que ha decidido tener una mala tarde, y sigue dando guerra después de las tres jugadas: entonces \"no te preocupes, que esto es cosa de chicas\", ligero y con una sonrisa, y toda tu energía se va con ella.",
        ],
      },
      {
        type: "subheader",
        text: "What NOT To Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Take him on. Winning the argument loses the sale. She isn't going to buy something her partner just got beaten over.",
          "Write him off at the first shrug. A bloke on his phone with his arms crossed is bored, not hostile, and bored is the easiest thing on this street to fix. Put something in his hand before you decide he's a lost cause.",
          "Have a go at his manliness. \"Real men look after their skin too.\" Now he's got something to defend and he'll defend it all afternoon.",
          "Put them against each other. \"Don't let him tell you what to buy\" makes you the problem in their relationship, and they leave together.",
          "Drop the price to shut him up. Now he knows being difficult moves your numbers, and he'll be difficult all the way down to the floor.",
        ],
        itemsEs: [
          "Entrarle al trapo. Ganar la discusión te cuesta la venta. Ella no va a comprar algo por lo que le acabas de ganar a su pareja.",
          "Descartarlo al primer gesto. Un tío con el móvil y los brazos cruzados está aburrido, no en tu contra, y el aburrimiento es lo más fácil de arreglar de esta calle. Ponle algo en la mano antes de darlo por perdido.",
          "Meterte con su hombría. \"Los hombres de verdad también se cuidan la piel.\" Ahora tiene algo que defender, y lo va a defender toda la tarde.",
          "Enfrentarlos. \"No dejes que te diga lo que puedes comprar\" te convierte a ti en el problema de esa pareja, y se van juntos.",
          "Bajar el precio para callarlo. Ahora ya sabe que ponerse borde te mueve los números, y se va a poner borde hasta el suelo.",
        ],
      },
      {
        type: "subheader",
        text: "Script — Give Me Your Hand",
        textEs: "Guion — Dame la Mano",
      },
      {
        type: "script",
        text: "YOU: \"You look like a man who wants proof. Come here — give me your hand.\" [Don't ask twice. Hold your hand out and wait. Most of them give it to you] \"Right. Feel that patch there? Now don't touch it for sixty seconds.\" [Work on it, chat to her while it sits] \"Go on. Feel it now. That's the difference.\"",
        textEs: "TÚ: \"Tienes pinta de ser de los que quieren pruebas. Ven — dame la mano.\" [No lo pidas dos veces. Extiende la mano y espera. La mayoría te la da] \"Vale. ¿Notas esa zona de ahí? Pues no te la toques durante sesenta segundos.\" [Trabájala, y mientras habla con ella] \"Venga. Tócala ahora. Esa es la diferencia.\"",
      },
      {
        type: "subheader",
        text: "Script — Make Him The Advisor",
        textEs: "Guion — Conviértelo en el Asesor",
      },
      {
        type: "script",
        text: "YOU: [To him, as if she isn't there] \"Help me out here — does she actually look after her skin, or is all this new to her?\" [Whatever he says, agree with him] \"See, that's what I thought. Then this is the easy one — she doesn't need six bottles.\" [To her] \"He's right, you know.\" [He's now on your side of the table and he has no idea how he got there]",
        textEs: "TÚ: [A él, como si ella no estuviera] \"Échame un cable — ¿ella se cuida la piel de verdad, o esto es todo nuevo para ella?\" [Diga lo que diga, dale la razón] \"Ves, eso me parecía. Pues entonces este es el fácil — no necesita seis botes.\" [A ella] \"Tiene razón, ¿eh?\" [Ahora está de tu lado de la mesa y no tiene ni idea de cómo ha llegado ahí]",
      },
      {
        type: "subheader",
        text: "Script — Sixty Seconds, Then You Decide",
        textEs: "Guion — Sesenta Segundos y Decides Tú",
      },
      {
        type: "script",
        text: "YOU: \"I can see you're looking after her. Fair enough.\" [To him, straight, no sarcasm] \"Give me sixty seconds. If she looks in that mirror and she isn't impressed, I'll tell her myself to walk away and I'll hold the door for the pair of you.\" [He'll take that — it's a fair bet and he thinks he's winning it] \"Right. Sixty seconds.\"",
        textEs: "TÚ: \"Ya veo que la cuidas. Y me parece bien.\" [A él, directo, sin ironía] \"Dame sesenta segundos. Si se mira en ese espejo y no le impresiona, le digo yo que se vaya y os sujeto la puerta a los dos.\" [Va a aceptar — es una apuesta justa y cree que la gana] \"Venga. Sesenta segundos.\"",
      },
      {
        type: "subheader",
        text: "Script — Last Resort, Letting Him Off",
        textEs: "Guion — Último Recurso, Soltarlo del Anzuelo",
      },
      {
        type: "script",
        text: "YOU: [Only once you've had his hand, asked his opinion and offered him the bet, and he is still swinging. Then, to him — light, with a smile, not a scrap of edge to it] \"Don't worry, it's ladies' business anyway.\" [Straight back to her, warm, like he was never a problem] \"Right, you. Sit down and give me two minutes.\" [He gets his phone back out and stops fighting you. Everything you have left now goes on her.]",
        textEs: "TÚ: [Solo cuando ya le has cogido la mano, le has pedido su opinión y le has ofrecido la apuesta, y sigue dando guerra. Entonces sí, a él — ligero, con una sonrisa, sin una pizca de pica] \"No te preocupes, que esto es cosa de chicas.\" [Y vuelves directo a ella, con cariño, como si él nunca hubiera sido un problema] \"Venga, tú. Siéntate y dame dos minutos.\" [Él saca otra vez el móvil y deja de pelearse contigo. Todo lo que te queda se lo dedicas a ella.]",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Three moves before you give up on him, and every one of them puts him INSIDE it: his hand, his opinion, a bet he thinks he's winning. A bloke on his phone with his arms crossed is bored, and bored is the easiest thing on this street to fix — letting him off is what you do when nothing worked, not what you open with. Only when he's genuinely nasty, still swinging after all three, does he get \"it's ladies' business anyway\" and you put everything you've got on her. What you never do is win an argument in front of his partner. And when he does come round, don't gloat and don't make him say it out loud — let him be right about something on the way out, and he'll be the one carrying the bag.",
        textEs: "Tres jugadas antes de darlo por perdido, y las tres lo meten DENTRO: su mano, su opinión, una apuesta que cree que gana. Un tío con el móvil y los brazos cruzados está aburrido, y el aburrimiento es lo más fácil de arreglar de esta calle — soltarlo es lo que haces cuando no ha funcionado nada, no por dónde empiezas. Solo cuando va con muy mala leche y sigue dando guerra después de las tres se lleva el \"esto es cosa de chicas\" y tú te vuelcas del todo con ella. Lo que no haces nunca es ganar una discusión delante de su pareja. Y cuando se venga abajo, no te regodees ni le hagas decirlo en voz alta — dale la razón en algo al salir, y será él quien lleve la bolsa.",
      },
    ],
    quiz: [
      {
        question: 'He is behind her, arms folded, muttering that it is a scam. What is your FIRST move?',
        questionEs: 'Él está detrás con los brazos cruzados, murmurando que es un timo. ¿Cuál es tu PRIMERA jugada?',
        options: [
          'Answer him properly — facts will settle him down',
          'Talk over him and keep her eyes on the mirror',
          '"Give me your hand" — put something in it',
          'Tell her not to let him decide what she can spend',
        ],
        optionsEs: [
          'Contestarle en serio — los datos lo van a calmar',
          'Hablar por encima de él y que ella mire el espejo',
          '"Dame la mano" — ponle algo en ella',
          'Decirle a ella que no deje que él decida su gasto',
        ],
        correctIndex: 2,
        explanation:
          'He does not want a debate, he wants proof he can feel. You bring him in first — nobody stays folded up while somebody is working on their hand.',
        explanationEs:
          'Él no quiere un debate, quiere una prueba que pueda notar. Primero lo metes dentro — nadie sigue con los brazos cruzados mientras le trabajan la mano.',
      },
      {
        question: 'He is on his phone and would clearly rather be anywhere else. Now what?',
        questionEs: 'Está con el móvil y está claro que preferiría estar en otro sitio. ¿Y ahora?',
        options: [
          'Bring him in — his hand, or an opinion only he can give you',
          'Let him off with "it is ladies\' business anyway" and move on',
          'Ignore him completely and speak only to her from here on',
          'Ask him what he thinks it is worth and then price it there',
        ],
        optionsEs: [
          'Meterlo dentro — su mano, o una opinión que solo él te puede dar',
          'Soltarlo con "esto es cosa de chicas" y seguir a lo tuyo',
          'Ignorarlo del todo y hablar solo con ella a partir de ahora',
          'Preguntarle cuánto cree que vale y ponerle ese precio',
        ],
        correctIndex: 0,
        explanation:
          'Bored is not hostile, and bored is the easiest thing on this street to fix. You only let him off when he is genuinely nasty and you have already tried everything else.',
        explanationEs:
          'Aburrido no es hostil, y el aburrimiento es lo más fácil de arreglar de esta calle. Solo lo sueltas si va con muy mala leche y ya lo has intentado todo.',
      },
      {
        question: 'He keeps needling, so you jump from {currency}300 to {currency}210 to shut him up. What have you taught him?',
        questionEs: 'Sigue picando y saltas de {currency}300 a {currency}210 para callarlo. ¿Qué le acabas de enseñar?',
        options: [
          'That you respect him and that you want him on your side',
          'That the product was overpriced in the first place',
          'That being difficult moves your numbers',
          'That you would rather close today than hold your price',
        ],
        optionsEs: [
          'Que lo respetas y que lo quieres de tu lado',
          'Que el producto estaba caro desde el principio',
          'Que ponerse borde te mueve los números',
          'Que prefieres cerrar hoy antes que aguantar el precio',
        ],
        correctIndex: 2,
        explanation:
          'Now he knows exactly which button moves the money, and he will press it all the way down to your floor.',
        explanationEs:
          'Ahora ya sabe qué botón mueve el dinero, y lo va a apretar hasta llegar a tu suelo.',
      },
    ],
  },

  "S10": {
    id: "S10",
    categoryId: "scenarios",
    title: "The Returning Customer",
    titleEs: "La Clienta Que Vuelve",
    subtitle: "The easiest sale of your week walks back up on her own",
    subtitleEs: "La venta más fácil de la semana vuelve ella sola",
    duration: "5 min",
    icon: "RefreshCw",
    order: 6,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "The Situation",
        textEs: "La Situación",
      },
      {
        type: "paragraph",
        text: "A woman you sold to three months ago walks straight back up to your table. She remembers your name. She gets her phone out and shows you a photo of her own face, and it does look good. \"I finished the whole syringe,\" she says. \"It worked. What else have you got?\" This is the best thing that will happen to you today. She's already sold, she already trusts you, and she's holding her card. And here is the part that catches sellers out: this one is not yours to price.",
        textEs: "Una mujer a la que vendiste hace tres meses se planta otra vez en tu mesa. Se acuerda de tu nombre. Saca el móvil y te enseña una foto de su propia cara, y la verdad es que está estupenda. \"Me acabé la jeringa entera\", te dice. \"Funcionó. ¿Qué más tienes?\" Es lo mejor que te va a pasar hoy. Ya está vendida, ya se fía de ti, y lleva la tarjeta en la mano. Y aquí está la parte que pilla a los vendedores: a esta no le pones tú el precio.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "MAKE A PROPER NOISE ABOUT HER. \"NO WAY, you came back! Let me look at you — I TOLD you!\" Loud, delighted, in front of whoever else is in the shop. She came back for that feeling as much as for the product.",
          "DO THE DEMO ANYWAY, AND KEEP IT ON THE SYRINGE. She finished one, so that's the product she came back for and it's the one that matters. Don't skip it because she trusts you — the demo is what she came back for, two minutes of somebody making a fuss of her face.",
          "THE PRICE IS NOT YOURS TO GIVE. This is the whole scenario, and it's the bit sellers get wrong because getting it wrong feels generous. A customer who came back gets priced by the manager — and if he's off the floor, by whoever out here has been doing this the longest. Say it to her like a compliment, because that is exactly what it is.",
          "WAVE HIM OVER, DON'T WALK OFF. Never leave her stood at a table on her own while you go looking for somebody. Keep her sitting, keep the mirror in her hand, catch an eye and bring them to her.",
          "ASK FOR THE PHOTO AND THE REVIEW WHILE SHE'S GLOWING. Bag in her hand, face done, still delighted — that's the only minute all year she says yes to a Google review. Ask warmly, once, and let it go if she'd rather not.",
        ],
        itemsEs: [
          "MONTA UN BUEN ESCÁNDALO CON ELLA. \"¡NO ME LO CREO, has vuelto! A ver, déjame verte — ¡TE LO DIJE!\" Alto, encantado, delante de quien esté en la tienda. Ha vuelto por esa sensación tanto como por el producto.",
          "HAZLE LA DEMO IGUAL, Y QUE SEA LA JERINGA. Se ha acabado una entera, así que ese es el producto al que ha vuelto y es el que importa. No te la saltes porque se fíe de ti — la demo es a lo que ha vuelto, dos minutos de que alguien le haga caso a su cara.",
          "EL PRECIO NO ES TUYO PARA DARLO. Este es el escenario entero, y es lo que se hace mal porque hacerlo mal parece generoso. A una clienta que vuelve le pone el precio el encargado — y si no está en la planta, quien lleve más tiempo aquí fuera haciendo esto. Díselo como un halago, porque es exactamente lo que es.",
          "LLÁMALO CON LA MANO, NO TE VAYAS. No la dejes nunca sola de pie en la mesa mientras vas a buscar a alguien. Que siga sentada, con el espejo en la mano, y tú buscas una mirada y te lo traes a ella.",
          "PÍDELE LA FOTO Y LA RESEÑA MIENTRAS ESTÁ RADIANTE. Con la bolsa en la mano, la cara hecha y todavía encantada — ese es el único minuto del año en el que dice que sí a una reseña de Google. Pídeselo con cariño, una vez, y déjalo estar si prefiere que no.",
        ],
      },
      {
        type: "subheader",
        text: "What NOT To Do",
        textEs: "Qué NO Hacer",
      },
      {
        type: "bullets",
        items: [
          "Start from the beginning. \"So, this is our hyaluronic syringe…\" She bought one. You've just told her you don't remember her.",
          "Put a number on her yourself. It feels like the generous thing to do and it's the one part of this that isn't yours. Even the family price is somebody else's to give.",
          "Get greedy. She came back because you were straight with her. Pile three products on her and you spend all that trust in one go.",
          "Forget what she bought. Her name, the product, where she's from — that's the whole trick, and nobody else on this street can copy it.",
          "Promise her something for next time. Not a held box, not a price kept warm, not \"ask for me\". You might not be on that shift, and a colleague has to stand there and explain.",
        ],
        itemsEs: [
          "Empezar desde el principio. \"Bueno, esta es nuestra jeringa hialurónica...\" Si ya se compró una. Le acabas de decir que no te acuerdas de ella.",
          "Ponerle tú el precio. Parece lo generoso y es la única parte de esto que no te toca a ti. Hasta el precio de la familia lo tiene que dar otro.",
          "Ponerte codicioso. Ha vuelto porque fuiste honesto con ella. Échale tres productos encima y te gastas toda esa confianza de una sentada.",
          "Olvidar qué se llevó. Su nombre, el producto, de dónde es — ese es todo el truco, y no hay nadie más en esta calle que pueda copiarlo.",
          "Prometerle algo para la próxima. Ni una caja guardada, ni un precio que le sigue valiendo, ni \"pregunta por mí\". Igual ese día no estás tú, y le toca a un compañero quedarse ahí dando explicaciones.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Welcome",
        textEs: "Guion — El Recibimiento",
      },
      {
        type: "script",
        text: "YOU: \"NO. WAY. Maria!\" [Genuinely delighted, and be loud about it] \"Let me look at you — oh my God. I TOLD you. Look at that.\" [Let her enjoy it for a second] \"You finished the whole thing? Good girl. Right — sit down. Same chair, same face, and I'm doing it again for nothing.\"",
        textEs: "TÚ: \"¡NO. ME. LO. CREO! ¡María!\" [Encantado de verdad, y que se te oiga] \"Déjame verte — madre mía. TE LO DIJE. Mira eso.\" [Deja que lo disfrute un segundo] \"¿Te lo acabaste entero? Muy bien. Venga — siéntate. Misma silla, misma cara, y te lo vuelvo a hacer sin cobrarte nada.\"",
      },
      {
        type: "subheader",
        text: "Script — Straight Back In The Chair",
        textEs: "Guion — Otra Vez a la Silla",
      },
      {
        type: "script",
        text: "YOU: \"You finished the whole thing — that's exactly why it worked on you. Most people leave half of it in a drawer and then come and tell me it does nothing.\" [Hands on, exactly like the first time, no shortcuts because she trusts you] \"Sixty seconds. Same as before.\" [Mirror straight into her hand] \"Look at that. Right — before I say one word about money, give me ten seconds.\"",
        textEs: "TÚ: \"Te lo acabaste entero — por eso te ha funcionado. La mayoría se deja la mitad en un cajón y luego viene a decirme que no hace nada.\" [Manos a la obra, igual que la primera vez, sin atajos por mucho que se fíe de ti] \"Sesenta segundos. Como la otra vez.\" [El espejo directo a su mano] \"Mira eso. Venga — antes de que diga una palabra del dinero, dame diez segundos.\"",
      },
      {
        type: "subheader",
        text: "Script — Getting The Boss",
        textEs: "Guion — Traerte al Jefe",
      },
      {
        type: "script",
        text: "YOU: \"Right. You came back, so I'm not the one who decides what you pay today.\" [Straight, and make it sound like the best news she's had all week] \"TONY! Come here a second — this is Maria, she finished a whole syringe, look at her face.\" [To her, while he's walking over] \"He's the boss. He does the numbers for the people who come back, and he'll look after you better than I can.\" [Do not leave her side. He comes to the chair; she does not go to him. And if he isn't on the floor, you get whoever out here has been doing this the longest — never a number of your own.]",
        textEs: "TÚ: \"Venga. Como has vuelto, hoy no soy yo quien decide lo que pagas.\" [Directo, y que suene a la mejor noticia de su semana] \"¡TONY! Ven un segundo — esta es María, se ha acabado una jeringa entera, mírale la cara.\" [A ella, mientras él viene] \"Es el jefe. Él pone los números a la gente que vuelve, y te va a cuidar mejor que yo.\" [No te muevas de su lado. Él viene a la silla; ella no va a buscarlo. Y si no está en la planta, coges a quien lleve más tiempo aquí fuera haciendo esto — nunca un número tuyo.]",
      },
      {
        type: "subheader",
        text: "Script — One Favour Before She Goes",
        textEs: "Guion — Un Favor Antes de Que Se Vaya",
      },
      {
        type: "script",
        text: "YOU: \"One favour before you go, and then I'll leave you alone.\" [Phone out, ready] \"Can I get a photo of that face for the wall? And if you've got thirty seconds — a Google review, right now, while you're still happy with me.\" [She's holding the bag, she's just been looked after: this is the only minute she'll say yes in] \"You're a star. Go on — enjoy the rest of your day.\"",
        textEs: "TÚ: \"Un favor antes de que te vayas, y ya te dejo en paz.\" [Móvil fuera, preparado] \"¿Te puedo hacer una foto de esa cara para la pared? Y si tienes treinta segundos — una reseña en Google, ahora mismo, mientras sigues contenta conmigo.\" [Tiene la bolsa en la mano, la acaban de cuidar: este es el único minuto en el que va a decir que sí] \"Eres un sol. Anda — ve a disfrutar del día.\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Keep a list on your phone: name, what they bought, when, and one personal thing — where she's from, the wedding, the sister with the same problem. Three months later you say \"Maria! How was the wedding? Did the syringe last you the whole trip?\" and she will not believe you remembered. That's the entire loyalty scheme and it costs nothing. Two rules go with it. One: the price is not yours. She came back, so the manager prices her, or whoever out here has been doing this the longest if he's off the floor. Handing her your own number feels like the generous thing and it's the one part of this you don't get to do. Two: nothing gets promised for next time. No held boxes, no price kept warm, no ask-for-me-by-name — you might be off that day and somebody else has to stand there and explain it. Give her everything today, and give it big.",
        textEs: "Ten una lista en el móvil: nombre, qué se llevó, cuándo, y una cosa personal — de dónde es, la boda, la hermana con el mismo problema. Tres meses después le dices \"¡María! ¿Qué tal la boda? ¿Te duró la jeringa todo el viaje?\" y no se va a creer que te acordaras. Ese es todo el programa de fidelización, y no cuesta nada. Y con él van dos normas. Una: el precio no es tuyo. Ha vuelto, así que le pone el precio el encargado, o quien lleve más tiempo aquí fuera si él no está en la planta. Darle tu propio número parece lo generoso y es la única parte de esto que no te toca hacer. Dos: no se promete nada para la próxima. Ni cajas guardadas, ni precios que siguen en pie, ni \"pregunta por mí\" — igual ese día libras y le toca a otro quedarse ahí dando explicaciones. Dale todo hoy, y dáselo a lo grande.",
      },
    ],
    quiz: [
      {
        question: 'She is back three months later with a photo of her own face. Who decides what she pays today?',
        questionEs: 'Vuelve tres meses después con una foto de su propia cara. ¿Quién decide hoy lo que paga?',
        options: [
          'You do — you sold her the first one and you know what she is good for',
          'The manager, or the most experienced person out on the floor',
          'She does. Ask her what she thinks is fair and meet her there',
          'Nobody yet — take her details and let her know a number later',
        ],
        optionsEs: [
          'Tú — le vendiste la primera y ya sabes hasta dónde llega',
          'El encargado, o quien más experiencia tenga aquí en la planta',
          'Ella. Le preguntas qué le parece justo y te quedas ahí',
          'Nadie todavía — apuntas sus datos y ya le dices un número',
        ],
        correctIndex: 1,
        explanation:
          'A customer who came back is not yours to price. Get the boss to the chair — and if he is off the floor, whoever out here has been doing this the longest.',
        explanationEs:
          'A una clienta que vuelve no le pones tú el precio. Tráete al jefe a la silla — y si no está en la planta, a quien lleve más tiempo aquí fuera haciendo esto.',
      },
      {
        question: 'She trusts you completely and she has already got her card out. Do you still do the demo?',
        questionEs: 'Se fía de ti del todo y ya ha sacado la tarjeta. ¿Le haces la demo igual?',
        options: [
          'No — she has bought before, get straight to the price',
          'No — doing it again suggests you do not believe her',
          'Yes. Two minutes of somebody fussing over her face',
          'Only if she asks, otherwise you are wasting her time',
        ],
        optionsEs: [
          'No — ya ha comprado antes, ve directo al precio',
          'No — repetirla parece que no te la crees',
          'Sí. Dos minutos de que alguien le haga caso a su cara',
          'Solo si lo pide, si no le estás quitando el tiempo',
        ],
        correctIndex: 2,
        explanation:
          'The demo is what she came back for. Two minutes of somebody making a fuss of her face is the whole loyalty scheme.',
        explanationEs:
          'La demo es a lo que ha vuelto. Dos minutos de que alguien le haga caso a su cara son todo el programa de fidelización.',
      },
      {
        question: 'She is leaving with the bag. Which of these is safe to give her?',
        questionEs: 'Se va con la bolsa. ¿Cuál de estas cosas puedes darle sin problema?',
        options: [
          'A price you promise will still be waiting on her next trip',
          'One held behind the till with her name written on it',
          'Your name to ask for so she gets looked after next time',
          'The whole lot today — gift in the bag, price done',
        ],
        optionsEs: [
          'Un precio que le prometes para su próximo viaje',
          'Uno guardado en caja con su nombre escrito encima',
          'Tu nombre para que pregunte y la cuiden la próxima',
          'Todo hoy — regalo en la bolsa y precio cerrado',
        ],
        correctIndex: 3,
        explanation:
          'You might not be on that shift, and a colleague has to stand there and explain it. Give her everything today, and give it big.',
        explanationEs:
          'Igual ese día no estás tú y le toca a un compañero quedarse ahí dando explicaciones. Dale todo hoy, y dáselo a lo grande.',
      },
    ],
  },
};

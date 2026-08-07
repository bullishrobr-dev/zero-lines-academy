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
    quiz: [],
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
        text: "You're doing the wrinkle demo on a woman from Manchester. Sixty seconds go by. She takes the mirror, and the line is exactly where it was. She hands it back, folds her arms, and says it out loud so everyone hears: \"See? Doesn't work. It's all a con, isn't it.\" There are four people stood behind her watching. The next ten seconds decide whether they stay or all leave together.",
        textEs: "Estás haciendo la demo de la arruga a una señora de Manchester. Pasan sesenta segundos. Coge el espejo y la línea sigue exactamente donde estaba. Te devuelve el espejo, se cruza de brazos y lo dice en alto para que lo oiga todo el mundo: \"¿Ves? No funciona. Es todo un cuento, ¿no?\" Detrás de ella hay cuatro personas mirando. Los diez segundos siguientes deciden si se quedan o se van todas juntas.",
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
          "SAY IT BEFORE SHE SAYS IT AGAIN. \"You're right, that's not what I wanted either.\" Agreeing costs you nothing and takes the fight out of the air. Arguing with a mirror is a fight you cannot win.",
          "FIND WHAT'S SITTING ON THE SKIN. Ask what she put on this morning. Cream, sun cream, foundation, primer — anything on top and the product never gets near her. Ask it out loud, so the crowd hears you working.",
          "CLEAN IT AND GO AGAIN. Toner, a wipe, whatever you've got. More product this time, more pressure, and narrate every step. The second attempt is the one they'll remember, because they watched you earn it.",
          "CHANGE PRODUCT BEFORE YOU LOSE THE ROOM. If the second go does nothing either, get off it. The scrub is the one nobody argues with — you feel it on your hand in ten seconds. \"The syringe wants a different skin. This one works on everybody. Give me your hand.\"",
        ],
        itemsEs: [
          "NO TE PONGAS NERVIOSO — TE ESTÁN MIRANDO LA CARA. Si te pones rojo y empiezas a hablar rápido, el corrillo acaba de ver cómo se cae un timo. Ponte curioso en cambio — la cabeza ladeada, mirándole la piel como si fuera un puzle — y eres un profesional resolviendo algo.",
          "DILO TÚ ANTES DE QUE LO REPITA ELLA. \"Tienes razón, a mí tampoco me ha salido lo que quería.\" Darle la razón no te cuesta nada y le quita la bronca al momento. Discutir con un espejo es una pelea que no ganas.",
          "BUSCA LO QUE HAY ENCIMA DE LA PIEL. Pregúntale qué se ha puesto esta mañana. Crema, crema solar, base, prebase — si hay algo encima, el producto no le llega ni a tocar la piel. Pregúntaselo en alto, para que el corrillo te oiga trabajar.",
          "LÍMPIALO Y VUELVE A EMPEZAR. Tónico, una toallita, lo que tengas. Esta vez más producto y más presión, y ve contando cada paso. El segundo intento es la demo que van a recordar, porque te han visto ganártela.",
          "CAMBIA DE PRODUCTO ANTES DE PERDER AL PÚBLICO. Si el segundo intento tampoco hace nada, sal de ahí. El scrub es el que no discute nadie — lo notas en la mano en diez segundos. \"La jeringa quiere otra piel. Este funciona con todo el mundo. Dame la mano.\"",
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
          "Blame her skin. Insult a woman's face in front of an audience and you lose the audience, not just her.",
          "Get defensive. \"It works on everyone, I don't know what's wrong with you\" is an excuse in a white coat. Curious beats defensive every single time.",
          "Give up and turn away. They are watching how you handle it going wrong, and that's worth more to them than watching it go right.",
        ],
        itemsEs: [
          "Hacer como que ha funcionado. \"Tú no lo ves pero yo sí\" — todos los que están mirando saben que acabas de mentir, y ahí se te acaba la tarde en esa esquina.",
          "Culpar a su piel. Insúltale la cara a una mujer delante de público y pierdes al público, no solo a ella.",
          "Ponerte a la defensiva. \"Le funciona a todo el mundo, no sé qué te pasa a ti\" es una excusa con bata blanca. Curioso le gana a defensivo siempre.",
          "Rendirte y darte la vuelta. Están mirando cómo lo gestionas cuando sale mal, y eso les vale más que verlo salir bien.",
        ],
      },
      {
        type: "subheader",
        text: "Script — Agree With Her First",
        textEs: "Guion — Dale la Razón Primero",
      },
      {
        type: "script",
        text: "YOU: \"Yeah. I see it too, and I'm not going to stand here telling you it worked.\" [Look at her skin, not at her] \"Quick question — cream this morning? Sun cream? Make-up?\" [She says yes] \"There it is. That's a layer sitting between me and your skin. Give me thirty seconds to take it off and we go again — and if it does nothing the second time, I'll tell you myself to keep your money.\"",
        textEs: "TÚ: \"Sí. Yo también lo veo, y no me voy a quedar aquí diciéndote que ha funcionado.\" [Mírale la piel, no a ella] \"Una pregunta rápida — ¿crema esta mañana? ¿Crema solar? ¿Maquillaje?\" [Dice que sí] \"Ahí lo tienes. Eso es una capa entre tu piel y yo. Dame treinta segundos para quitártela y lo repetimos — y si la segunda vez no hace nada, te digo yo que te guardes el dinero.\"",
      },
      {
        type: "subheader",
        text: "Script — Show It On Yourself",
        textEs: "Guion — Enséñalo en Ti",
      },
      {
        type: "script",
        text: "YOU: \"You're right not to trust it. I wouldn't either.\" [Do the same thing on the back of your own hand] \"Look — same product, same sixty seconds, and on me it goes like that. So it isn't the tube, it's what's on the surface. Yours is drinking it before it can sit anywhere.\" [To the crowd] \"That's why we clean first. Watch.\"",
        textEs: "TÚ: \"Haces bien en no fiarte. Yo tampoco me fiaría.\" [Haz lo mismo en el dorso de tu propia mano] \"Mira — mismo producto, mismos sesenta segundos, y a mí me hace esto. Así que no es el tubo, es lo que hay en la superficie. La tuya se lo está bebiendo antes de que se pueda quedar en ningún sitio.\" [Al corrillo] \"Por eso limpiamos primero. Mirad.\"",
      },
      {
        type: "subheader",
        text: "Script — The Product Switch",
        textEs: "Guion — El Cambio de Producto",
      },
      {
        type: "script",
        text: "YOU: \"You know what, forget the syringe today. It wants skin that's already prepped and yours isn't — that's on me, I should have started you here.\" [Pick up the Dead Sea Scrub] \"This one doesn't care what skin you've got. Two minutes, and you feel it standing right there. {currency}60. Give me your hand — if you don't feel the difference you owe me nothing, and you weren't going to pay me anyway.\"",
        textEs: "TÚ: \"¿Sabes qué? Olvídate hoy de la jeringa. Quiere una piel ya preparada y la tuya no lo está — culpa mía, tendría que haber empezado por aquí.\" [Coge el Scrub del Mar Muerto] \"A este le da igual la piel que tengas. Dos minutos, y lo notas ahí de pie. {currency}60. Dame la mano — si no notas la diferencia no me debes nada, y total, tampoco me ibas a pagar.\"",
      },
      {
        type: "subheader",
        text: "Script — Playing To The Crowd",
        textEs: "Guion — Jugar con el Público",
      },
      {
        type: "script",
        text: "YOU: \"Fair enough — it didn't do what I said it would.\" [To the crowd, not to her] \"Anybody can sell when the demo goes perfectly. You lot are getting the interesting bit.\" [Back to her, hand out] \"Right. Clean face, second go, thirty seconds of your life. If it's rubbish again you can tell the whole street I'm a fraud and I'll hold the door open for you.\"",
        textEs: "TÚ: \"Vale — no ha hecho lo que yo he dicho que haría.\" [Al corrillo, no a ella] \"Vender cuando la demo sale perfecta lo hace cualquiera. Vosotros os estáis llevando la parte interesante.\" [Otra vez a ella, con la mano tendida] \"Venga. Cara limpia, segundo intento, treinta segundos de tu vida. Si vuelve a ser una porquería, se lo cuentas a toda la calle y yo te sujeto la puerta.\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "A demo that dies in front of people is the best advert you'll get all day, as long as you stay curious instead of scared. They already assume the good demos are rigged. What nobody can fake is watching somebody handle it when it goes wrong. Stop it happening where you can — ask about cream before you touch a face, clean the spot properly, work somewhere you've actually looked at. And keep this in your head: a {currency}60 scrub after a dead {currency}300 syringe demo is still a sale, still a happy woman, and still a face that walks past you again tomorrow.",
        textEs: "Una demo que se muere delante de gente es el mejor anuncio del día, siempre que te pongas curioso en vez de asustado. Ya dan por hecho que las demos buenas están amañadas. Lo que no se puede fingir es ver a alguien gestionarlo cuando sale mal. Evítalo cuando puedas — pregunta por la crema antes de tocar una cara, limpia bien la zona, trabaja en un sitio que hayas mirado de verdad. Y quédate con esto: un scrub de {currency}60 después de una demo muerta de {currency}300 sigue siendo una venta, sigue siendo una señora contenta, y sigue siendo una cara que mañana vuelve a pasar por delante.",
      },
    ],
    quiz: [],
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
          "FIND THE ONE THEY ALL LOOK AT. Every group has one. Usually the loud one, sometimes the bride. Watch where the eyes go after somebody speaks. Win her and the rest come with her. Leave her out and she'll kill it for fun.",
          "BE LOUDER THAN THEM, ONCE. Not angry — bigger. \"RIGHT, LADIES! I'm doing every single one of you, but ONE at a time so you all get the proper show!\" A group follows whoever takes the wheel in the first ten seconds.",
          "MAKE IT A SHOW. First demo goes on the leader or the bride, and you narrate the lot. Get them counting the sixty seconds out loud. Six women counting down in the street pulls in strangers you never even stopped.",
          "PRICE THEM AS ONE GROUP, NOT AS SIX PEOPLE. Give them a single number to split between them and one gift with the bride's name on it. That turns six separate conversations about money into one decision they all cheer for.",
          "LET THEM FILM EACH OTHER. Ask them to get each other's faces when the mirror comes out. They post it, they tag where they are, and you've done nothing but be good at your job in front of a lens.",
        ],
        itemsEs: [
          "BUSCA A LA QUE MIRAN TODAS. En todo grupo hay una. Normalmente la escandalosa, a veces la novia. Fíjate adónde van los ojos cuando alguien dice algo. Gánatela y las demás vienen detrás. Déjala fuera y te lo revienta por diversión.",
          "SUBE LA VOZ MÁS QUE ELLAS, UNA VEZ. No enfadado — más grande. \"¡VENGA, CHICAS! Os hago a todas y cada una, pero DE UNA EN UNA, para que os llevéis el espectáculo entero.\" Un grupo se va detrás de quien coge el volante en los diez primeros segundos.",
          "MONTA EL ESPECTÁCULO. La primera demo va en la jefa o en la novia, y lo vas contando todo. Que cuenten los sesenta segundos en voz alta. Seis mujeres contando atrás en plena calle te traen a desconocidos que ni has parado.",
          "PONLES UN PRECIO DE GRUPO, NO SEIS PRECIOS. Dales un número que puedan repartirse entre ellas y un regalo con el nombre de la novia encima. Así seis conversaciones sobre dinero se convierten en una sola decisión que aplauden todas.",
          "QUE SE GRABEN ENTRE ELLAS. Pídeles que se graben la cara unas a otras cuando sale el espejo. Lo suben, etiquetan dónde están, y tú no has hecho nada más que ser bueno en tu trabajo delante de una cámara.",
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
          "Try to do all six at once. You'll do six bad demos and sell nothing. One brilliant one sells the other five for you.",
          "Skip the quiet one. The one who hasn't said a word is very often the one with the money and the least interest in arguing about it.",
          "Go serious on them. Treat a hen do like a consultation and they're gone in thirty seconds. Match the noise.",
          "Argue with the one who's against it. Let her off instead — \"you don't have to, just let me have your friends\" — and she stops working against you.",
        ],
        itemsEs: [
          "Intentar hacerlas a las seis a la vez. Harás seis demos malas y no venderás nada. Una buenísima te vende las otras cinco.",
          "Pasar de la callada. La que no ha abierto la boca es muchas veces la que tiene el dinero y las menos ganas de discutirlo.",
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
        text: "YOU: \"RIGHT — BRIDE SQUAD! Listen to me!\" [Big, loud, arms out] \"I am doing every one of you. ONE at a time, because you all want to see it properly. Who's first? The bride? OBVIOUSLY the bride. Everybody in close — watch what happens to this face.\"",
        textEs: "TÚ: \"¡VENGA — BRIDE SQUAD! ¡Escuchadme!\" [Grande, alto, los brazos abiertos] \"Os hago a todas. DE UNA EN UNA, porque queréis verlo bien. ¿Quién es la primera? ¿La novia? PUES CLARO que la novia. Acercaos todas — mirad lo que le pasa a esta cara.\"",
      },
      {
        type: "subheader",
        text: "Script — The Countdown",
        textEs: "Guion — La Cuenta Atrás",
      },
      {
        type: "script",
        text: "YOU: \"Everybody counts with me. Sixty seconds. Ready? THREE, TWO, ONE — GO!\" [They count. You keep it moving] \"FIFTY! FORTY-FIVE!\" [When it lands] \"STOP! Give her the mirror!\" [They scream] \"THAT'S what we do here. Who's next?!\"",
        textEs: "TÚ: \"Contáis todas conmigo. Sesenta segundos. ¿Listas? ¡TRES, DOS, UNO — YA!\" [Cuentan. Tú las mantienes] \"¡CINCUENTA! ¡CUARENTA Y CINCO!\" [Cuando llega] \"¡ALTO! ¡Dadle el espejo!\" [Chillan] \"ESO es lo que hacemos aquí. ¡¿Quién va ahora?!\"",
      },
      {
        type: "subheader",
        text: "Script — The Group Number",
        textEs: "Guion — El Número de Grupo",
      },
      {
        type: "script",
        text: "YOU: \"Right. You lot are the best thing that's happened to me all week, so listen.\" [Voice down a bit, like it's a secret] \"One syringe is {currency}300. For you: take two, pay {currency}300, and sort out between yourselves who's putting in what. And the bride doesn't pay for a scrub — that one's from me, wedding present. Who's in?\" [Hands go up] \"Beautiful. Come on then — one at a time!\"",
        textEs: "TÚ: \"Venga. Sois lo mejor que me ha pasado en toda la semana, así que escuchad.\" [Baja un poco la voz, como si fuera un secreto] \"Una jeringa son {currency}300. Para vosotras: os lleváis dos y pagáis {currency}300, y ya os apañáis entre vosotras quién pone qué. Y la novia no paga el scrub — ese va de mi parte, regalo de boda. ¿Quién se apunta?\" [Se levantan manos] \"Preciosas. ¡Venga — de una en una!\"",
      },
      {
        type: "subheader",
        text: "Script — The One Who Isn't Having It",
        textEs: "Guion — La Que No Está Por La Labor",
      },
      {
        type: "script",
        text: "YOU: \"Totally fine, you don't have to do anything.\" [Warm, not a scrap of pressure, then straight back to the group] \"Just let me have your friends for five minutes — look at the bride's face, she's glowing. Here, hold this for me while I do Emma.\" [Give her something to hold. Nobody holding something walks off.]",
        textEs: "TÚ: \"Qué va, tranquila, tú no tienes que hacer nada.\" [Con cariño, sin una pizca de presión, y vuelves directo al grupo] \"Déjame solo a tus amigas cinco minutos — mírale la cara a la novia, está radiante. Toma, sujétame esto mientras se lo hago a Emma.\" [Dale algo que sujetar. Nadie que esté sujetando algo se va.]",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "A hen do is the best hour you'll get all week. Don't turn any of it into promises. No \"send me a friend and I'll sort you out next time\", no discount owed to anybody after they leave — you won't be here and a colleague has to have that argument at the counter. Do the lot today: the group number, the gift with the bride's name on it, the countdown, the photos. Then send them off loud and happy, because a group that leaves screaming is an advert walking down the middle of the street in matching t-shirts.",
        textEs: "Una despedida de soltera es la mejor hora de tu semana. No conviertas nada de eso en promesas. Nada de \"mándame a una amiga y la próxima te lo compenso\", nada de descuentos que se le deban a alguien cuando ya se ha ido — tú no vas a estar y la discusión en el mostrador le toca a un compañero. Hazlo todo hoy: el precio de grupo, el regalo con el nombre de la novia, la cuenta atrás, las fotos. Y luego que se vayan a gritos y encantadas, porque un grupo que se va chillando es un anuncio andando por mitad de la calle con camisetas iguales.",
      },
    ],
    quiz: [],
  },

  "S4": {
    id: "S4",
    categoryId: "scenarios",
    title: "Competitor Poaching Your Customer",
    titleEs: "Un Competidor Te Roba la Clienta",
    subtitle: "Somebody else's seller walks into the middle of your demo",
    subtitleEs: "El vendedor de otro se te mete en mitad de la demo",
    duration: "4 min",
    icon: "Sword",
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
        text: "You're mid-demo with a French tourist. She's asking questions, she's already half sold. Then another street seller — different brand, same pavement — comes over her shoulder: \"Madam, don't buy from them. Ours is cheaper and better. Come with me.\" He puts a flyer in her hand. She looks confused, and her body starts to turn towards him.",
        textEs: "Estás a mitad de demo con una turista francesa. Está preguntando cosas, ya está medio vendida. Y entonces otro vendedor callejero — otra marca, la misma acera — le aparece por el hombro: \"Señora, no les compre a ellos. El nuestro es más barato y mejor. Venga conmigo.\" Le pone un folleto en la mano. Ella se queda descolocada y el cuerpo se le empieza a girar hacia él.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "DON'T LOOK AT HIM. The second you turn to face him it becomes two blokes arguing and she's the audience. Keep your eyes on her the whole time, like he isn't worth turning your head for.",
          "STAY EXACTLY WHERE YOU ARE. You're already close to her and she's already in your hands — literally, if you're mid-demo. Don't step away to deal with him. Being near her is doing more work than anything you could say.",
          "NAME IT ONCE, LIGHTLY. Pretending you didn't hear it looks rattled. One easy line — \"there's always somebody\" — and you're back on her. It says this happens all day and has never once bothered you.",
          "PUT THE PROOF NEXT TO THE PAPER. He's got a flyer. You've got her own face in a mirror. Say exactly that and let her decide which one is worth more.",
          "INVITE THE COMPARISON — ON YOUR GROUND. If she's genuinely torn, send her over yourself, but set the test first: ask him to do it on her face, right now, the way you just did. You already know he can't.",
        ],
        itemsEs: [
          "NI LO MIRES. En cuanto te giras hacia él, esto son dos tíos discutiendo y ella es el público. No le quites los ojos de encima a ella, como si él no mereciera ni que gires la cabeza.",
          "NO TE MUEVAS DE AHÍ. Ya estás cerca de ella y ya la tienes en tus manos — literalmente, si estás a mitad de demo. No te apartes para atenderlo a él. La cercanía está trabajando más que cualquier cosa que pudieras decir.",
          "MENCIÓNALO UNA VEZ, A LA LIGERA. Hacer como que no lo has oído parece que te ha puesto nervioso. Una frase suelta — \"siempre hay alguno\" — y vuelves a ella. Eso dice que esto pasa todos los días y que no te ha molestado nunca.",
          "PON LA PRUEBA AL LADO DEL PAPEL. Él tiene un folleto. Tú tienes su propia cara en un espejo. Díselo tal cual y deja que decida cuál vale más.",
          "INVÍTALA A COMPARAR — EN TU TERRENO. Si de verdad está dudando, mándala tú mismo, pero pon la prueba antes: que se lo haga él en la cara, ahora mismo, como acabas de hacerlo tú. Ya sabes que no puede.",
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
          "Slag him off. \"Their stuff is rubbish\" tells her you're worried. Let the mirror say it for you.",
          "Get territorial. Blocking him or raising your voice makes a scene, and tourists walk away from scenes. Then you've both lost her.",
          "Beg. \"Please don't go, I'll drop the price\" tells her the price was never real and that you need her more than she needs you.",
          "Pretend it never happened. She heard him. Carry on like nothing was said and she spends the next two minutes thinking about him instead of you.",
        ],
        itemsEs: [
          "Ponerlo verde. \"Lo suyo es una porquería\" le está diciendo que estás preocupado. Que lo diga el espejo por ti.",
          "Ponerte territorial. Cortarle el paso o subir la voz monta un numerito, y los turistas se van de los numeritos. Y entonces la habéis perdido los dos.",
          "Suplicar. \"No te vayas, por favor, te bajo el precio\" le dice que el precio nunca fue real y que la necesitas tú a ella más que ella a ti.",
          "Hacer como si no hubiera pasado. Ella lo ha oído. Si sigues como si no se hubiera dicho nada, se pasa los dos minutos siguientes pensando en él en vez de en ti.",
        ],
      },
      {
        type: "subheader",
        text: "Script — There's Always Somebody",
        textEs: "Guion — Siempre Hay Alguno",
      },
      {
        type: "script",
        text: "YOU: \"Ha. There's always somebody.\" [Don't look at him once. Eyes on her, carry on with what you were doing] \"He's got a flyer, my love. I've got your face. Have another look in that mirror and tell me which one you believe.\"",
        textEs: "TÚ: \"Ja. Siempre hay alguno.\" [No lo mires ni una vez. Los ojos en ella, sigue con lo tuyo] \"Él tiene un folleto, guapa. Yo tengo tu cara. Vuelve a mirarte en ese espejo y me dices a cuál de los dos te crees.\"",
      },
      {
        type: "subheader",
        text: "Script — The Invitation to Compare",
        textEs: "Guion — La Invitación a Comparar",
      },
      {
        type: "script",
        text: "YOU: \"Go on, listen to him, I don't mind at all. But ask him one thing first: ask him to do it on your face, right here, right now, like I just did.\" [Smile, hand her the mirror back] \"If he can, I'll walk you over there myself. We both know how this ends. Shall we finish?\"",
        textEs: "TÚ: \"Anda, escúchalo, a mí no me importa nada. Pero pregúntale una cosa antes: que te lo haga a ti en la cara, aquí mismo, ahora, como acabo de hacerlo yo.\" [Sonríe, devuélvele el espejo] \"Si puede, te acompaño yo. Los dos sabemos cómo acaba esto. ¿Terminamos?\"",
      },
      {
        type: "subheader",
        text: "Script — The Quiet Boast",
        textEs: "Guion — El Alarde Tranquilo",
      },
      {
        type: "script",
        text: "YOU: \"Three people bought this off me before lunch. Every one of them saw it on their own face first.\" [Tap the mirror] \"He doesn't worry me — I've already shown you, on you. Right. Are we doing one, or the pair?\"",
        textEs: "TÚ: \"Tres personas me han comprado esto antes de comer. Todas lo vieron antes en su propia cara.\" [Da un golpecito al espejo] \"Él no me preocupa — a ti ya te lo he enseñado, en ti. Venga. ¿Nos llevamos una, o las dos?\"",
      },
      {
        type: "subheader",
        text: "Script — The Deflection with Humour",
        textEs: "Guion — Quitárselo de Encima con Humor",
      },
      {
        type: "script",
        text: "YOU: \"Mate, I love the hustle, but I'm working here.\" [Said with a grin, still not properly looking at him. Then to her, quieter] \"See that? Everybody wants you today. Must be your lucky afternoon in {locationName}. Now — one, or do we do the pair?\"",
        textEs: "TÚ: \"Colega, me encanta que le eches ganas, pero estoy trabajando.\" [Con una sonrisa, sin mirarlo del todo. Y luego a ella, más bajito] \"¿Ves? Hoy te quiere todo el mundo. Debe de ser tu tarde de suerte en {locationName}. Venga — ¿una, o nos llevamos las dos?\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "The real defence is speed. Get her face into the mirror inside the first ninety seconds and there's nothing left for anybody to interrupt — a woman who has already watched her own line go is not walking off with a folded bit of paper. Use her name. Notice something specific about her. He has a flyer and thirty seconds; you have her hand in yours and two minutes of being genuinely nice to her. That was never a fair fight and it was never meant to be.",
        textEs: "La defensa de verdad es la velocidad. Ponle la cara en el espejo en los primeros noventa segundos y ya no queda nada que interrumpir — una mujer que ya ha visto desaparecer su propia línea no se va con un papel doblado. Usa su nombre. Fíjate en algo concreto de ella. Él tiene un folleto y treinta segundos; tú tienes su mano en la tuya y dos minutos tratándola bien de verdad. Eso nunca fue una pelea justa, ni pretendía serlo.",
      },
    ],
    quiz: [],
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
        text: "YOU: \"Take your time. I'm not going anywhere.\" [Half a step back. Busy yourself with something on the table for ten seconds — tidy the samples, wipe the mirror] [Then look up, warm] \"Whenever you're ready.\"",
        textEs: "TÚ: \"Tómate tu tiempo. Yo no me voy a ningún lado.\" [Medio paso atrás. Entretente diez segundos con algo de la mesa — coloca las muestras, limpia el espejo] [Y luego levanta la vista, con cariño] \"Cuando tú quieras.\"",
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
        text: "Quiet is not no. Watch her hands, not her mouth. Still touching the spot? Still hanging on to the mirror? She's already bought it, she just hasn't told you. Put the box in her hands, smile, and say nothing at all. And keep the three-second rule in your head: if she holds it for three seconds without handing it back, stop talking and start bagging.",
        textEs: "El silencio no es un no. Mírale las manos, no la boca. ¿Sigue tocándose la zona? ¿Sigue aferrada al espejo? Ya se lo ha comprado, lo que pasa es que no te lo ha dicho. Ponle la caja en las manos, sonríe y no digas absolutamente nada. Y quédate con la regla de los tres segundos: si la sujeta tres segundos sin devolvértela, deja de hablar y empieza a envolver.",
      },
    ],
    quiz: [],
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
        text: "A day-trip crowd spills into the main street in {locationName} — cruise passengers, coach parties, lanyards round every neck. They've got three and a half hours and then they're gone. One couple has barely any English, another pair are arguing about the way back to the port, somebody is photographing a bin. Then you see her: woman in her fifties, good bag, lines across her forehead, stood at a shop window a few metres from your spot. Money and a clock. Ten seconds to hook her, three minutes to close her.",
        textEs: "Cae un grupo de excursión en la calle principal de {locationName} — pasajeros de crucero, gente de autocar, acreditaciones colgadas de todos los cuellos. Tienen tres horas y media y se van. Una pareja casi no habla inglés, otra está discutiendo por dónde se vuelve al puerto y alguien está fotografiando una papelera. Y entonces la ves: una mujer de unos cincuenta, buen bolso, líneas en la frente, parada delante de un escaparate a unos metros de tu puesto. Dinero y un reloj. Diez segundos para engancharla, tres minutos para cerrarla.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "HOOK HER IN FIVE SECONDS, NOT FIFTEEN. She's drowning in signs and noise. Hold the syringe up where she can see it and give her one sentence: \"Sixty seconds, one wrinkle, gone — want to see?\" Movement plus a question stops feet.",
          "GIVE HER BOTH NUMBERS EARLY. Day-trippers have spent all morning comparing prices in three countries. \"Back in Europe this is {currency}500. Here it's {currency}300.\" Now she's got somewhere to put your price.",
          "CUT THE DEMO IN HALF. Three minutes becomes ninety seconds. Apply, count out loud, mirror, price, close. No routine talk, no ingredient talk. \"{currency}300, every card there is, and you're out of here in two minutes.\"",
          "MAKE THE CLOCK A REASON, NOT A THREAT. \"You've got two hours left — do you want to spend them walking round looking like this, or like this?\" Time is on your side as long as it stays a joke.",
          "GET IT DONE TODAY. She's on a boat tonight and she isn't back on Thursday. Nothing gets held, nothing gets promised for later, nothing waits. It happens in the chair or it doesn't happen.",
        ],
        itemsEs: [
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
        ],
        itemsEs: [
          "Empezar con una historia. No tienen tiempo para tu vida. Gancho, demo, precio, listo.",
          "Hacer preguntas grandes. \"¿Cuál es tu rutina de piel?\" es una respuesta de dos minutos que no te hace falta. Da por hecho que le interesa y tira.",
          "Meterle prisa con el tiempo. \"¡Corre, que se te va el autocar!\" hace que se vaya. El reloj es una broma compartida, no un palo.",
          "Descartarla porque \"solo mira\". Está de vacaciones, lleva dinero encima y esta mañana ya ha decidido que hoy se gasta. Pide la venta siempre.",
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
        text: "YOU: \"No problem, no problem!\" [Hands, face, the product — do the whole thing with your body] \"Look. Sixty seconds. Line — gone.\" [Mirror] \"{currency}300. Card? Cash? All good!\" [Point at the terminal, big smile. A mirror doesn't need translating.]",
        textEs: "TÚ: \"¡No pasa nada, no pasa nada!\" [Manos, cara, el producto — hazlo todo con el cuerpo] \"Mira. Sesenta segundos. La línea — fuera.\" [Espejo] \"{currency}300. ¿Tarjeta? ¿Efectivo? ¡Todo bien!\" [Señala el datáfono, sonrisa grande. Un espejo no necesita traducción.]",
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
    quiz: [],
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
        text: "YOU: [To your colleague] \"Marco! Have you still got the stickers?\" [To the child] \"Marco's got the special ones — go and see!\" [To her, as he runs two metres and stays in sight] \"Right. Two minutes of quiet. Let's not waste them. Give me your hand.\"",
        textEs: "TÚ: [A tu compañero] \"¡Marco! ¿Te quedan pegatinas?\" [Al niño] \"¡Marco tiene las especiales — ve a verlas!\" [A ella, mientras el crío corre dos metros y sigue a la vista] \"Venga. Dos minutos de tranquilidad. No los desperdiciemos. Dame la mano.\"",
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
    quiz: [],
  },

  "S8": {
    id: "S8",
    categoryId: "scenarios",
    title: "Customer Wants to Record You",
    titleEs: "La Clienta Quiere Grabarte",
    subtitle: "A phone comes out mid-demo — that's free advertising, if you behave",
    subtitleEs: "Sale un móvil en mitad de la demo — eso es publicidad gratis, si te portas bien",
    duration: "3 min",
    icon: "Video",
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
        text: "You're mid-demo and it's going beautifully. Then she pulls her phone out: \"I'm putting this on TikTok.\" Red dot, camera pointed at you, and now the people walking past slow down to see what's being filmed. This is the cheapest advertising you will ever get and the fastest way to embarrass yourself. Both at the same time.",
        textEs: "Estás a mitad de demo y va de maravilla. Y entonces saca el móvil: \"Esto lo subo a TikTok.\" Punto rojo, cámara apuntándote, y la gente que pasa afloja el paso para ver qué se está grabando. Es la publicidad más barata que vas a conseguir en tu vida y la forma más rápida de hacer el ridículo. Las dos cosas a la vez.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "SAY YES, AND MEAN IT. Hesitating on camera looks like you've got something to hide. \"Go on then — get my good side. It's this one.\"",
          "SLOW DOWN AND SPEAK UP. Your normal street patter is half mumble, half gesture, and it dies on video. Say the words properly, look at the phone once, and let the mirror do the ending.",
          "GET WHERE YOU ARE INTO THE SHOT. Product in frame, shop behind you, and say it out loud: \"we're in {locationName}, sixty seconds, watch this.\" A video nobody can find is a video that sold nothing.",
          "TRADE THE TAG FOR SOMETHING TODAY. \"Tag us and I'll take something off right now\" — settled and finished while she's stood in front of you, not something she comes back to claim next week.",
          "ASK HER TO SEND IT TO YOU. Costs you nothing, takes ten seconds, and you end up with a clip of a real customer's real face that beats anything you'd ever film yourself.",
        ],
        itemsEs: [
          "DI QUE SÍ, Y DILO EN SERIO. Dudar delante de la cámara parece que escondes algo. \"Venga, grábame — cógeme el lado bueno. Este.\"",
          "BAJA EL RITMO Y HABLA MÁS ALTO. Tu charla normal de calle es medio murmullo y medio gesto, y en vídeo se muere. Vocaliza, mira una vez al móvil, y que el final lo ponga el espejo.",
          "QUE SALGA DÓNDE ESTÁS. El producto en cuadro, la tienda detrás, y dilo en voz alta: \"estamos en {locationName}, sesenta segundos, mira esto.\" Un vídeo que nadie puede encontrar es un vídeo que no ha vendido nada.",
          "CAMBIA LA ETIQUETA POR ALGO, HOY. \"Nos etiquetas y te quito algo ahora mismo\" — resuelto y cerrado mientras está delante de ti, no algo que venga a reclamar la semana que viene.",
          "PÍDELE QUE TE LO MANDE. No te cuesta nada, tarda diez segundos, y acabas con un clip de la cara de verdad de una clienta de verdad que se come cualquier cosa que grabaras tú.",
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
          "Say no. On this street, refusing a camera reads as guilty. If you're doing nothing wrong, let her film.",
          "Carry on exactly as normal. The camera changes the job. Clearer, slower, bigger — you're performing now, not chatting.",
          "Let her film and post with no idea where she was. If nobody can tell where it was shot, you did the work for free.",
          "Go shy. Awkward on camera kills the clip and kills the sale sat in front of you. Own it and both of them go better.",
        ],
        itemsEs: [
          "Decir que no. En esta calle, negarte a que te graben suena a culpable. Si no estás haciendo nada malo, que grabe.",
          "Seguir exactamente igual. La cámara cambia el trabajo. Más claro, más despacio, más grande — ahora estás actuando, no charlando.",
          "Dejar que grabe y lo suba sin saber ni dónde estaba. Si nadie sabe dónde se grabó, has trabajado gratis.",
          "Ponerte tímido. La vergüenza delante de la cámara se carga el vídeo y se carga la venta que tienes delante. Hazlo tuyo y salen mejor las dos cosas.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Enthusiastic Yes",
        textEs: "Guion — El Sí Entusiasta",
      },
      {
        type: "script",
        text: "YOU: \"YES. Film it, film all of it.\" [Pose, laugh at yourself] \"Get my good side — which is both of them, obviously. Right: tag where we are so your lot can actually find us, and I'll sort you out on the price before you go. Deal? Good. Now watch this line.\"",
        textEs: "TÚ: \"¡SÍ! Graba, grábalo todo.\" [Posa, ríete de ti mismo] \"Cógeme el lado bueno — que son los dos, evidentemente. Venga: etiqueta dónde estamos para que los tuyos nos puedan encontrar, y yo te arreglo el precio antes de que te vayas. ¿Trato? Perfecto. Ahora mira esta línea.\"",
      },
      {
        type: "subheader",
        text: "Script — Get It In Frame",
        textEs: "Guion — Que Salga en Cuadro",
      },
      {
        type: "script",
        text: "YOU: \"Course you can. Here —\" [Hold the product up to the lens for two seconds, then get it out of the way] \"— that's the hyaluronic syringe, and we're right here in {locationName}. Now watch what happens to this line in sixty seconds. Ready?\" [Then forget the camera and do the best demo of your day]",
        textEs: "TÚ: \"Claro que sí. Toma —\" [Pon el producto delante del objetivo dos segundos y luego quítalo de en medio] \"— esta es la jeringa hialurónica, y estamos aquí mismo, en {locationName}. Ahora mira lo que le pasa a esta línea en sesenta segundos. ¿Lista?\" [Y ahora olvídate de la cámara y haz la mejor demo del día]",
      },
      {
        type: "subheader",
        text: "Script — The Trade, All Of It Today",
        textEs: "Guion — El Trato, Todo Hoy",
      },
      {
        type: "script",
        text: "YOU: \"I'm all for it. Here's the deal, and all of it happens before you walk out of here: you tag us, you send me the clip, and I take something off the price right now.\" [Shake on it] \"Lovely. Come on then — let's give them something worth watching.\"",
        textEs: "TÚ: \"Yo encantado. El trato es este, y pasa todo antes de que salgas de aquí: nos etiquetas, me mandas el vídeo, y yo te quito algo del precio ahora mismo.\" [Os dais la mano] \"Estupendo. Venga — vamos a darles algo que merezca la pena ver.\"",
      },
      {
        type: "subheader",
        text: "Script — If She'd Rather Not Film You",
        textEs: "Guion — Si Prefiere No Grabarte",
      },
      {
        type: "script",
        text: "YOU: \"Honestly, no problem at all if you'd rather I wasn't in it.\" [Zero drama about it] \"Do me one favour though — film your own hand, or the mirror. And say where you are. That way your friends know where to come and you've still got the good bit.\"",
        textEs: "TÚ: \"De verdad, no pasa absolutamente nada si prefieres que yo no salga.\" [Sin dramas] \"Pero hazme un favor: graba tu propia mano, o el espejo. Y di dónde estás. Así tus amigas saben dónde venir y tú te quedas con la parte buena.\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Have one line you always say on camera, and make it a good one. \"Sixty seconds. Watch the line.\" Short enough that people repeat it. And keep every deal you make with a phone inside the same conversation — the tag, the clip, the price, all of it finished before she walks off. The second you say \"come back and I'll sort you out\", you've handed a colleague at that counter an argument you won't be there for. Free advertising should stay free.",
        textEs: "Ten una frase que digas siempre delante de la cámara, y que sea buena. \"Sesenta segundos. Mira la línea.\" Corta, para que la gente la repita. Y todo lo que pactes con un móvil, que se cierre en esa misma conversación — la etiqueta, el vídeo, el precio, todo terminado antes de que se vaya. En cuanto dices \"vuelve y te lo compenso\", le has regalado a un compañero una discusión en el mostrador en la que tú no vas a estar. La publicidad gratis tiene que salir gratis.",
      },
    ],
    quiz: [],
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
    order: 9,
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
          "PUT SOMETHING IN HIS HAND. This is the move. He doesn't want a debate, he wants proof he can feel. \"You look like a man who wants proof. Give me your hand.\" Nobody stays folded up with their arms crossed while somebody's working on their hand.",
          "OR GIVE HIM A WAY OUT. If he doesn't want to be in it, stop trying to put him in it. \"Don't worry, it's ladies' business anyway\" — light, with a smile — lets him step back without losing anything, and a man who's been let off stops fighting you.",
          "MAKE HIM THE EXPERT, NOT THE OBSTACLE. \"You know her better than I do — does she look after her skin, or is this new?\" Ask him something only he can answer and he stops being the bloke at the back.",
          "IF HE'S JUST NASTY, LET HIM GO. Some of them have decided to have a bad afternoon. Don't spend your energy there. Keep all of it on the person who is still listening to you.",
        ],
        itemsEs: [
          "NO DISCUTAS CON ÉL. En cuanto esto es tú contra él, ella tiene que elegir, y lo elige a él. Esa no la ganas nunca, y tampoco te hace falta.",
          "PONLE ALGO EN LA MANO. Esta es la jugada. Él no quiere un debate, quiere una prueba que pueda notar. \"Tienes pinta de ser de los que quieren pruebas. Dame la mano.\" Nadie sigue con los brazos cruzados mientras le están trabajando la mano.",
          "O DALE UNA SALIDA. Si no quiere estar dentro, deja de intentar meterlo. \"No te preocupes, que esto es cosa de chicas\" — ligero, con una sonrisa — le deja apartarse sin perder nada, y un hombre al que has soltado deja de pelearse contigo.",
          "HAZLO EL EXPERTO, NO EL OBSTÁCULO. \"Tú la conoces mejor que yo — ¿ella se cuida la piel, o esto es nuevo?\" Pregúntale algo que solo pueda contestar él y deja de ser el señor del fondo.",
          "SI VA CON MALA LECHE, DÉJALO. Algunos han decidido tener una mala tarde. No gastes ahí tu energía. Guárdala entera para la persona que todavía te escucha.",
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
          "Have a go at his manliness. \"Real men look after their skin too.\" Now he's got something to defend and he'll defend it all afternoon.",
          "Put them against each other. \"Don't let him tell you what to buy\" makes you the problem in their relationship, and they leave together.",
          "Drop the price to shut him up. Now he knows being difficult moves your numbers, and he'll be difficult all the way down to the floor.",
        ],
        itemsEs: [
          "Entrarle al trapo. Ganar la discusión te cuesta la venta. Ella no va a comprar algo por lo que le acabas de ganar a su pareja.",
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
        text: "Script — Letting Him Off",
        textEs: "Guion — Soltarlo del Anzuelo",
      },
      {
        type: "script",
        text: "YOU: [To him — light, with a smile, not a scrap of edge to it] \"Don't worry, it's ladies' business anyway.\" [Then straight back to her, warm, like he was never a problem] \"Right, you. Sit down and give me two minutes.\" [He gets his phone back out and stops fighting you. That is exactly what you wanted.]",
        textEs: "TÚ: [A él — ligero, con una sonrisa, sin una pizca de pica] \"No te preocupes, que esto es cosa de chicas.\" [Y vuelves directo a ella, con cariño, como si él nunca hubiera sido un problema] \"Venga, tú. Siéntate y dame dos minutos.\" [Él saca otra vez el móvil y deja de pelearse contigo. Que es exactamente lo que querías.]",
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
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Two moves, that's all this is. Put something in his hand, or let him off the hook. Pick fast, because the longer he stands there with his arms crossed the harder it gets. What you never do is win an argument in front of his partner. And when he does come round, don't gloat and don't make him say it out loud — let him be right about something on the way out, and he'll be the one carrying the bag.",
        textEs: "Dos jugadas, no hay más. O le pones algo en la mano, o lo sueltas del anzuelo. Decide rápido, porque cuanto más rato lleve ahí con los brazos cruzados, más difícil se pone. Lo que no haces nunca es ganar una discusión delante de su pareja. Y cuando se venga abajo, no te regodees ni le hagas decirlo en voz alta — dale la razón en algo al salir, y será él quien lleve la bolsa.",
      },
    ],
    quiz: [],
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
    order: 10,
    xpReward: 100,
    sections: [
      {
        type: "header",
        text: "The Situation",
        textEs: "La Situación",
      },
      {
        type: "paragraph",
        text: "A woman you sold to three months ago walks straight back up to your table. She remembers your name. She gets her phone out and shows you a photo of her own face, and it does look good. \"I finished the whole syringe,\" she says. \"It worked. What else have you got?\" This is the best thing that will happen to you today. She's already sold, she already trusts you, and she's holding her card. The only way to lose it is to get greedy.",
        textEs: "Una mujer a la que vendiste hace tres meses se planta otra vez en tu mesa. Se acuerda de tu nombre. Saca el móvil y te enseña una foto de su propia cara, y la verdad es que está estupenda. \"Me acabé la jeringa entera\", te dice. \"Funcionó. ¿Qué más tienes?\" Es lo mejor que te va a pasar hoy. Ya está vendida, ya se fía de ti, y lleva la tarjeta en la mano. La única forma de perderla es ponerte codicioso.",
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
          "SHOW HER SOMETHING NEW. She doesn't want the same box again, she wants the next thing. \"You've done the syringe. Sit down, let me show you the peeling.\"",
          "DO THE DEMO ANYWAY. Don't skip it because she trusts you. The demo is what she came back for — two minutes of somebody making a fuss of her face.",
          "GIVE HER THE FAMILY PRICE, TODAY. \"Normally it's {currency}300. For you, because you came back, {currency}210.\" Voice down, quick look at the door. She isn't buying it cheaper, she's buying the fact that you bent something for her.",
          "ASK FOR THE PHOTO AND THE REVIEW WHILE SHE'S GLOWING. Bag in her hand, face done, still delighted — that's the only minute all year she says yes to a Google review. Ask warmly, once, and let it go if she'd rather not.",
        ],
        itemsEs: [
          "MONTA UN BUEN ESCÁNDALO CON ELLA. \"¡NO ME LO CREO, has vuelto! A ver, déjame verte — ¡TE LO DIJE!\" Alto, encantado, delante de quien esté en la tienda. Ha vuelto por esa sensación tanto como por el producto.",
          "ENSÉÑALE ALGO NUEVO. No quiere la misma caja otra vez, quiere lo siguiente. \"La jeringa ya la has hecho. Siéntate, que te enseño el peeling.\"",
          "HAZLE LA DEMO IGUAL. No te la saltes porque se fíe de ti. La demo es a lo que ha vuelto — dos minutos de que alguien le haga caso a su cara.",
          "DALE EL PRECIO DE LA FAMILIA, HOY. \"Normalmente son {currency}300. Para ti, porque has vuelto, {currency}210.\" Baja la voz, mirada rápida a la puerta. No lo está comprando más barato, está comprando que hayas doblado algo por ella.",
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
          "Get greedy. She came back because you were straight with her. Pile three products on her and you spend all that trust in one go.",
          "Forget what she bought. Her name, the product, where she's from — that's the whole trick, and nobody else on this street can copy it.",
          "Promise her something for next time. Not a held box, not a price kept warm, not \"ask for me\". You might not be on that shift, and a colleague has to stand there and explain.",
        ],
        itemsEs: [
          "Empezar desde el principio. \"Bueno, esta es nuestra jeringa hialurónica...\" Si ya se compró una. Le acabas de decir que no te acuerdas de ella.",
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
        text: "YOU: \"NO. WAY. Maria!\" [Genuinely delighted, and be loud about it] \"Let me look at you — oh my God. I TOLD you. Look at that.\" [Let her enjoy it for a second] \"You finished the whole thing? Good girl. Right — sit down. I've got something you haven't seen.\"",
        textEs: "TÚ: \"¡NO. ME. LO. CREO! ¡María!\" [Encantado de verdad, y que se te oiga] \"Déjame verte — madre mía. TE LO DIJE. Mira eso.\" [Deja que lo disfrute un segundo] \"¿Te lo acabaste entero? Muy bien. Venga — siéntate, que tengo algo que no has visto.\"",
      },
      {
        type: "subheader",
        text: "Script — The Next One Up",
        textEs: "Guion — El Siguiente Escalón",
      },
      {
        type: "script",
        text: "YOU: \"So you loved the syringe. This is what everybody does next.\" [Pick up the peeling] \"The syringe fills. This one takes the dead layer off first. Do them in that order and the syringe has somewhere clean to sit — that's the whole thing.\" [Quick peeling demo on the back of her hand] \"Feel that? Right. Now you know why I'm showing you.\"",
        textEs: "TÚ: \"Así que te encantó la jeringa. Pues esto es lo que hace todo el mundo después.\" [Coge el peeling] \"La jeringa rellena. Este te quita antes la capa muerta. Hazlos en ese orden y la jeringa se queda en un sitio limpio — no hay más misterio.\" [Demo rápida del peeling en el dorso de su mano] \"¿Lo notas? Eso es. Ahora ya sabes por qué te lo enseño.\"",
      },
      {
        type: "subheader",
        text: "Script — The Family Price",
        textEs: "Guion — El Precio de la Familia",
      },
      {
        type: "script",
        text: "YOU: \"You're not a customer any more, you're family.\" [Voice down, quick look at the door, lean in] \"Syringe and peeling together is {currency}450. For you, today, {currency}310 — and the Dead Sea Scrub goes in the bag as well, full size, from me. Don't tell anybody what you paid.\" [Bag into her hand] \"Welcome back.\"",
        textEs: "TÚ: \"Ya no eres una clienta, eres de la familia.\" [Baja la voz, mirada rápida a la puerta, acércate] \"Jeringa y peeling juntos son {currency}450. Para ti, hoy, {currency}310 — y el Scrub del Mar Muerto va en la bolsa también, tamaño grande, de mi parte. No le digas a nadie lo que has pagado.\" [La bolsa a su mano] \"Bienvenida de nuevo.\"",
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
        text: "Keep a list on your phone: name, what they bought, when, and one personal thing — where she's from, the wedding, the sister with the same problem. Three months later you say \"Maria! How was the wedding? Did the syringe last you the whole trip?\" and she will not believe you remembered. That's the entire loyalty scheme and it costs nothing. One rule with it, though: nothing gets promised for next time. No held boxes, no price kept warm, no ask-for-me-by-name — you might be off that day and somebody else has to stand there and explain it. Give her everything today, and give it big.",
        textEs: "Ten una lista en el móvil: nombre, qué se llevó, cuándo, y una cosa personal — de dónde es, la boda, la hermana con el mismo problema. Tres meses después le dices \"¡María! ¿Qué tal la boda? ¿Te duró la jeringa todo el viaje?\" y no se va a creer que te acordaras. Ese es todo el programa de fidelización, y no cuesta nada. Eso sí, una norma: no se promete nada para la próxima. Ni cajas guardadas, ni precios que siguen en pie, ni \"pregunta por mí\" — igual ese día libras y le toca a otro quedarse ahí dando explicaciones. Dale todo hoy, y dáselo a lo grande.",
      },
    ],
    quiz: [],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// scenarioLessons.ts — 10 "what do I do when…" drills for the street.
//
// These were authored against a bespoke `ScenarioLesson` shape (scenario /
// whatToDo / whatNotToDo / scripts / proTip) that no component could render, in
// a file nothing imported. They are now plain `Lesson` records in the canonical
// `ContentSection` vocabulary, merged into the registry by lessons.ts, and every
// section type here is one LessonView's SectionRenderer actually handles.
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
    subtitle: "Staying safe and professional when alcohol is involved",
    subtitleEs: "Mantente seguro y profesional cuando hay alcohol de por medio",
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
        text: "It's 2 PM on a Saturday in {locationName}. A group of British tourists stumbles past your spot. One woman — loud, slurring her words, reeking of alcohol — sees your demo and lurches toward you. \"OI! What's that then?! Make me beautiful!\" She's grabbing your arm, way too close, breath in your face. Her friends are laughing but not helping. She's asking to try the product. Her credit card is already out.",
        textEs: "Son las 2 de la tarde de un sábado en {locationName}. Un grupo de turistas británicos tropieza cerca de tu puesto. Una mujer — ruidosa, arrastrando las palabras, oliendo a alcohol — ve tu demo y se tambalea hacia ti. \"¡OY! ¿¿Qué es eso entonces?! ¡Hazme bella!\" Te está agarrando el brazo, demasiado cerca, su aliento en tu cara. Sus amigas se ríen pero no ayudan. Pide probar el producto. Su tarjeta de crédito ya está afuera.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "ASSESS IMMEDIATELY: Is the person happy-drunk or angry-drunk? Happy-drunk can sometimes become a sale (though ethically questionable). Angry-drunk = immediate disengagement.",
          "CREATE PHYSICAL SPACE: Step back. Put the counter or your demo table between you. Drunk people have no concept of personal space — you need to establish it.",
          "NEVER DEMO ON A DRUNK PERSON'S FACE: If you absolutely must engage, demo on your OWN hand or arm. A drunk person who has a bad reaction will blame you, their friends will film it, and you'll have a nightmare on social media.",
          "USE THE FRIEND SYSTEM: Talk to the SOBER friends. \"She's having a great time, but I want to make sure she still loves this tomorrow morning. Why don't you guys grab my card and come back when everyone's fresh?\"",
          "IF THEY'RE AGGRESSIVE: Stop talking. Step back. Raise your hand in a 'stop' gesture. Firmly: \"I can't help you right now. Please step back.\" If they persist, signal security or your manager immediately. Your safety is worth more than any sale.",
        ],
        itemsEs: [
          "EVALÚA INMEDIATAMENTE: ¿La persona está alegre-borracha o enfadada-borracha? Alegre-borracha a veces puede convertirse en venta (aunque éticamente cuestionable). Enfadada-borracha = desenganche inmediato.",
          "CREA ESPACIO FÍSICO: Retrocede. Pon el mostrador o tu mesa de demo entre los dos. Los borrachos no tienen concepto de espacio personal — tú necesitas establecerlo.",
          "NUNCA HAGAS DEMO EN LA CARA DE UN BORRACHO: Si absolutamente debes interactuar, haz la demo en tu propia mano o brazo. Un borracho que tiene mala reacción te culpará, sus amigas lo filmarán, y tendrás una pesadilla en redes sociales.",
          "USA EL SISTEMA DE AMIGA: Habla con las amigas SOBRIAS. \"Ella la está pasando increíble, pero quiero asegurarme de que todavía ame esto mañana por la mañana. ¿Por qué no toman mi tarjeta y regresan cuando todas estén frescas?\"",
          "SI SON AGRESIVOS: Deja de hablar. Retrocede. Levanta tu mano en gesto de 'alto.' Con firmeza: \"No puedo ayudarte ahora. Por favor retrocede.\" Si persisten, señala a seguridad o a tu gerente inmediatamente. Tu seguridad vale más que cualquier venta.",
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
          "Demo on their face: Alcohol dilates blood vessels and increases skin sensitivity. A reaction is MORE likely, and they'll be too drunk to follow aftercare instructions.",
          "Take their credit card: A drunk person cannot legally consent to a purchase. If they dispute the charge later, you'll lose. Every time.",
          "Laugh along or encourage them: Professionalism is your shield. If you're seen mocking a drunk tourist, other tourists will avoid you.",
          "Get cornered: Always position yourself near an exit or where colleagues can see you. Never let a drunk person block your escape route.",
        ],
        itemsEs: [
          "Hacer demo en su cara: El alcohol dilata los vasos sanguíneos y aumenta la sensibilidad de la piel. Una reacción es MÁS probable, y estarán demasiado borrachos para seguir instrucciones de cuidado posterior.",
          "Tomar su tarjeta de crédito: Una persona borracha no puede consentir legalmente una compra. Si disputan el cargo después, perderás. Siempre.",
          "Reírte o alentarlos: El profesionalismo es tu escudo. Si te ven burlándote de un turista borracho, otros turistas te evitarán.",
          "Dejarte acorralar: Siempre posiciónate cerca de una salida o donde tus colegas puedan verte. Nunca dejes que un borracho bloquee tu ruta de escape.",
        ],
      },
      {
        type: "subheader",
        text: "Script — Gentle Deflection (Happy-Drunk)",
        textEs: "Guion — Desvío Gentil (Alegre-Borracho)",
      },
      {
        type: "script",
        text: "YOU: \"You are clearly having the BEST day in {locationName}! I love that energy! But here's the thing — this product works even better on fresh, rested skin. So here's my card. Come find me tomorrow morning, first demo is on me, and I'll show you something amazing when you're 100%. Deal?\"",
        textEs: "TÚ: \"¡Está claro que estás teniendo el MEJOR día de {locationName}! ¡Me encanta esa energía! Pero fíjate — este producto funciona aún mejor en piel fresca y descansada. Entonces aquí está mi tarjeta. Búscame mañana por la mañana, la primera demo va por mi cuenta, y te mostraré algo increíble cuando estés al 100%. ¿Trato?\"",
      },
      {
        type: "subheader",
        text: "Script — Firm Boundary (Too Intense)",
        textEs: "Guion — Límite Firme (Demasiado Intenso)",
      },
      {
        type: "script",
        text: "YOU: \"I appreciate your enthusiasm, but I need you to take a step back for me, please.\" [Step back yourself] \"For safety reasons, I can't do demos on anyone who's been drinking. But your friend here looks like she's ready for the full experience! Want to try it, love?\" [Pivot to the sober friend]",
        textEs: "TÚ: \"Aprecio tu entusiasmo, pero necesito que des un paso atrás para mí, por favor.\" [Tú también retrocede] \"Por razones de seguridad, no puedo hacer demos en nadie que haya estado bebiendo. ¡Pero tu amiga aquí parece que está lista para la experiencia completa! ¿Quieres probarlo, amor?\" [Gira hacia la amiga sobria]",
      },
      {
        type: "subheader",
        text: "Script — Security Signal (Aggressive)",
        textEs: "Guion — Señal de Seguridad (Agresivo)",
      },
      {
        type: "script",
        text: "YOU: \"I cannot help you today. Please step back.\" [Raise hand, make eye contact with nearest security or colleague] \"Marco! Can you give me a hand here?\" [To the friends] \"Please take your friend and move along.\"",
        textEs: "TÚ: \"No puedo ayudarte hoy. Por favor retrocede.\" [Levanta mano, haz contacto visual con seguridad o colega más cercano] \"¡Marco! ¿Me puedes echar una mano aquí?\" [A las amigas] \"Por favor llévense a su amiga y sigan caminando.\"",
      },
      {
        type: "subheader",
        text: "Script — The Morning-After Close",
        textEs: "Guion — El Cierre del Día Siguiente",
      },
      {
        type: "script",
        text: "YOU: \"Look, I know you want this NOW. But I'm going to do you a favor and say: sleep on it. Come back tomorrow. If you still want it, I'll give you my employee discount. But only if you're sober and fresh. I want you to LOVE this purchase, not regret it.\"",
        textEs: "TÚ: \"Mira, sé que quieres esto AHORA. Pero te voy a hacer un favor y decir: duérmete sobre eso. Regresa mañana. Si todavía lo quieres, te daré mi descuento de empleada. Pero solo si estás sobria y fresca. Quiero que AMES esta compra, no que te arrepientas.\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Memorize your store's policy on drunk customers. Some stores have a zero-tolerance policy; others are more flexible. KNOW THE RULE. Also, the 'morning-after close' is incredibly effective — drunk people respect honesty, and the promise of a discount tomorrow gives them a reason to return (and buy at full price when they see the demo sober). Most importantly: TRUST YOUR GUT. If someone feels dangerous, they probably are. Walk away.",
        textEs: "Memoriza la política de tu tienda sobre clientes borrachos. Algunas tiendas tienen política de tolerancia cero; otras son más flexibles. CONOCE LA REGLA. Además, el 'cierre del día siguiente' es increíblemente efectivo — los borrachos respetan la honestidad, y la promesa de descuento mañana les da una razón para regresar (y comprar a precio completo cuando ven la demo sobrios). Lo más importante: CONFÍA EN TU INSTINTO. Si alguien se siente peligroso, probablemente lo es. Aléjate.",
      },
    ],
    quiz: [],
  },

  "S2": {
    id: "S2",
    categoryId: "scenarios",
    title: "The Demo That Failed",
    titleEs: "La Demo Que Falló",
    subtitle: "Recovering when the product doesn't show instant results",
    subtitleEs: "Recuperándote cuando el producto no muestra resultados instantáneos",
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
        text: "You're doing your wrinkle demo on a middle-aged woman from Manchester. 60 seconds pass. She looks in the mirror — the wrinkle is STILL THERE. She hands the mirror back, crosses her arms, and says: \"See? It doesn't work. It's all a con, isn't it?\" Her skepticism just went from 20% to 100%. There's a small crowd watching.",
        textEs: "Estás haciendo tu demo de arrugas en una mujer de mediana edad de Manchester. Pasan 60 segundos. Mira en el espejo — la arruga SIGUE AHÍ. Regresa el espejo, cruza los brazos, y dice: \"¿¿Ves?? No funciona. Todo es una estafa, ¿verdad?\" Su escepticismo acaba de pasar del 20% al 100%. Hay una pequeña multitud observando.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "STAY CALM: Your reaction in the next 10 seconds determines everything. If you panic, the crowd sees a scammer. If you stay clinical and curious, you look like a professional diagnosing a situation.",
          "ACKNOWLEDGE HONESTLY: Don't fake it. Don't pretend you see results that aren't there. Say: \"You're right — I'm not seeing the result I expected either. Let me figure out why.\"",
          "DIAGNOSE OUT LOUD: Ask about her skincare routine, what she put on this morning (sunscreen is the #1 blocker), how much water she drinks. Turn it into an educational moment for the crowd.",
          "RE-PREP THE SKIN: Clean the area with toner or makeup remover. Reapply with MORE product and MORE pressure. Explain each step to the crowd so they see your technique.",
          "PIVOT IF NEEDED: If the second try also fails (rare but possible), pivot to the Dead Sea Scrub or Glycolic Peel — products that work on EVERYONE. \"The syringe needs hydrated skin, but THIS — this works on everyone. Let me show you.\"",
        ],
        itemsEs: [
          "MANTÉN LA CALMA: Tu reacción en los siguientes 10 segundos lo determina todo. Si te panicas, la multitud ve a un estafador. Si te mantienes clínica y curiosa, pareces una profesional diagnosticando una situación.",
          "RECONOCE CON HONESTIDAD: No finjas. No pretendas ver resultados que no están ahí. Di: \"Tienes razón — yo tampoco estoy viendo el resultado que esperaba. Déjame averiguar por qué.\"",
          "DIAGNOSTICA EN VOZ ALTA: Pregunta sobre su rutina de cuidado de la piel, qué se puso esta mañana (el protector solar es el protector solar #1), cuánta agua toma. Conviértelo en un momento educativo para la multitud.",
          "VOLVER A PREPARAR LA PIEL: Limpia el área con tónico o removedor de maquillaje. Reaplica con MÁS producto y MÁS presión. Explica cada paso a la multitud para que vean tu técnica.",
          "PIVOTEA SI ES NECESARIO: Si el segundo intento también falla (raro pero posible), pivotea al Scrub del Mar Muerto o al Peeling Glicólico — productos que funcionan en TODOS. \"La jeringa necesita piel hidratada, pero ESTO — esto funciona en todos. Déjame mostrarte.\"",
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
          "Pretend it worked: \"Oh, you can't see it but I can!\" — Everyone in the crowd will know you're lying. Credibility = gone forever.",
          "Blame her skin: \"Well, your skin is just really damaged...\" — Insulting the customer in front of a crowd guarantees they'll ALL walk away.",
          "Get defensive: \"This works on everyone, I don't know why it didn't work on you\" — Sounds like an excuse, not expertise.",
          "Walk away or give up: The crowd is watching. How you handle failure determines whether they trust you. Turn it into a masterclass.",
        ],
        itemsEs: [
          "Pretender que funcionó: \"¡Ah, tú no lo puedes ver pero yo sí!\" — Todos en la multitud sabrán que estás mintiendo. Credibilidad = ida para siempre.",
          "Culpar su piel: \"Bueno, tu piel está realmente dañada...\" — Insultar al cliente frente a una multitud garantiza que TODOS se irán.",
          "Ponerte a la defensiva: \"Esto funciona en todos, no sé por qué no funcionó en ti\" — Suena a excusa, no a experiencia.",
          "Irte o rendirte: La multitud está observando. Cómo manejas el fracaso determina si confían en ti. Conviértelo en una masterclass.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Honest Acknowledgment",
        textEs: "Guion — El Reconocimiento Honesto",
      },
      {
        type: "script",
        text: "YOU: \"Okay, I see it too — and I'm going to be straight with you. That result isn't what I expected. But here's the thing: this is science, not magic. And science needs the right conditions. Let me ask you — did you put on sunscreen or moisturizer this morning?\" [She says yes] \"That's it. There's a barrier sitting on your skin right now, blocking the product. Let me clean it properly and try again.\"",
        textEs: "TÚ: \"Vale, yo también lo veo — y voy a ser directa contigo. Ese resultado no es lo que esperaba. Pero fíjate: esto es ciencia, no magia. Y la ciencia necesita las condiciones correctas. Déjame preguntarte — ¿te pusiste protector solar o crema hidratante esta mañana?\" [Dice que sí] \"Eso es. Hay una barrera sentada en tu piel ahora mismo, bloqueando el producto. Déjame limpiarla adecuadamente e intentar de nuevo.\"",
      },
      {
        type: "subheader",
        text: "Script — The Educational Pivot",
        textEs: "Guion — El Giro Educativo",
      },
      {
        type: "script",
        text: "YOU: \"Look, you're absolutely right to be skeptical. I would be too. But let me show you something.\" [Demo on your own hand] \"See this? Works on me every time. So what we're dealing with here is something really interesting — your skin is so dehydrated that it's drinking the product before it can sit on the surface.\" [To the crowd] \"This is actually a GOOD sign — it means your skin NEEDS this. But it also means we need to prep you first.\"",
        textEs: "TÚ: \"Mira, tienes toda la razón de ser escéptica. Yo también lo sería. Pero déjame mostrarte algo.\" [Demo en tu propia mano] \"¿Ves esto? Me funciona cada vez. Entonces lo que tenemos aquí es algo muy interesante — tu piel está tan deshidratada que se está bebiendo el producto antes de que pueda sentarse en la superficie.\" [A la multitud] \"Esto en realidad es una BUENA señal — significa que tu piel NECESITA esto. Pero también significa que necesitamos prepararte primero.\"",
      },
      {
        type: "subheader",
        text: "Script — The Product Switch",
        textEs: "Guion — El Cambio de Producto",
      },
      {
        type: "script",
        text: "YOU: \"You know what? The syringe needs your skin to be pre-hydrated, and clearly yours isn't. That's on me — I should have started you with this.\" [Pick up the Dead Sea Scrub] \"This scrub exfoliates the dead skin layer that EVERYONE has. It doesn't need special conditions. It works on oily skin, dry skin, every skin. {currency}60, takes 2 minutes, and you'll feel the difference immediately. Want to try it?\"",
        textEs: "TÚ: \"¿Sabes qué? La jeringa necesita que tu piel esté pre-hidratada, y claramente la tuya no lo está. Eso es culpa mía — debería haberte empezado con esto.\" [Toma el Scrub del Mar Muerto] \"Este scrub exfolia la capa de piel muerta que TODOS tenemos. No necesita condiciones especiales. Funciona en piel grasa, piel seca, toda piel. {currency}60, tarda 2 minutos, y notarás la diferencia inmediatamente. ¿Quieres probarlo?\"",
      },
      {
        type: "subheader",
        text: "Script — The Crowd Recovery",
        textEs: "Guion — La Recuperación de la Multitud",
      },
      {
        type: "script",
        text: "YOU: \"Fair enough — that didn't work the way I wanted. But you know what? Anyone can sell when the demo is perfect. The REAL test is what happens when it doesn't go right.\" [To the crowd] \"And THIS is why I love this job — because I just learned something about her skin that will help me serve the next person even better.\" [To the customer] \"Let me make you a promise: come back tomorrow. Let me prep your skin right, and if the demo doesn't blow your mind, I'll give you a free product just for giving me a second chance.\"",
        textEs: "TÚ: \"Justo — eso no funcionó como quería. Pero ¿sabes qué? Cualquiera puede vender cuando la demo es perfecta. La prueba REAL es qué pasa cuando no sale bien.\" [A la multitud] \"Y por ESTO amo mi trabajo — porque acabo de aprender algo sobre su piel que me ayudará a servir a la siguiente persona aún mejor.\" [A la clienta] \"Déjame hacerte una promesa: regresa mañana. Déjame preparar tu piel bien, y si la demo no te vuela la cabeza, te doy un producto gratis solo por darme una segunda oportunidad.\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "The failed demo is your GREATEST opportunity to build trust. When you handle it with honesty and expertise, the crowd respects you MORE than if it had worked perfectly. Why? Because they saw you under pressure, and you stayed professional. Also, always prep skin before the syringe demo — ask about sunscreen/moisturizer, clean the area with toner if needed. Prevention beats recovery 10 times out of 10. And remember: a {currency}60 scrub sale after a failed {currency}300 demo is still a WIN — plus you set up a future syringe sale when their skin is ready.",
        textEs: "La demo fallada es tu MAYOR oportunidad de construir confianza. Cuando la manejas con honestidad y experiencia, la multitud te respeta MÁS que si hubiera funcionado perfectamente. ¿Por qué? Porque te vieron bajo presión, y te mantuviste profesional. Además, siempre prepara la piel antes de la demo de jeringa — pregunta sobre protector solar/crema hidratante, limpia el área con tónico si es necesario. La prevención vence a la recuperación 10 de cada 10 veces. Y recuerda: una venta de {currency}60 de scrub después de una demo fallida de {currency}300 sigue siendo una VICTORIA — además preparas una futura venta de jeringa cuando su piel esté lista.",
      },
    ],
    quiz: [],
  },

  "S3": {
    id: "S3",
    categoryId: "scenarios",
    title: "Hen Party / Group of Friends",
    titleEs: "Despedida de Soltera / Grupo de Amigas",
    subtitle: "Managing multiple personalities and closing group sales",
    subtitleEs: "Manejando múltiples personalidades y cerrando ventas grupales",
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
        text: "A group of 6 women in matching \"BRIDE SQUAD\" t-shirts descends on your spot. They're loud, excited, half of them are already tipsy. The bride-to-be is the quietest one. One woman — the loud one with the glasses — appoints herself spokesperson and says \"DO ALL OF US!\" They want simultaneous demos. They're taking selfies. They're talking over each other. This chaos is either your biggest sale of the day or a complete waste of time.",
        textEs: "Un grupo de 6 mujeres con playeras iguales de \"BRIDE SQUAD\" desciende sobre tu puesto. Son ruidosas, emocionadas, la mitad ya están alegres. La novia es la más callada. Una mujer — la ruidosa con lentes — se nombra vocera y dice \"¡HÁZNOS A TODAS!\" Quieren demos simultáneas. Se están tomando selfies. Se hablan unas encima de otras. Este caos es o tu venta más grande del día o una completa pérdida de tiempo.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "IDENTIFY THE ALPHA: In every group, there's one woman the others look to for approval. It's usually the loudest one OR the bride. Win her, and the group follows. Ignore her, and she'll kill every sale.",
          "CONTROL THE ENERGY: Raise your voice slightly to match theirs — not in aggression, but in excitement. \"OKAY LADIES! I can do ALL of you, but ONE at a time so everyone gets the FULL effect!\" Groups respect someone who takes charge.",
          "MAKE IT A SHOW: Groups LOVE entertainment. Do the first demo on the alpha or the bride. Narrate EVERYTHING: \"Watch this, 60 seconds, count with me!\" Get the group counting down. The energy becomes contagious.",
          "CREATE A GROUP DEAL: Offer a small discount for 3+ units, or throw in free samples for the group. \"Okay, since it's Sarah's last weekend as a free woman — anyone who buys today gets a free scrub sample AND I'll give the bride a full-size product as my gift!\"",
          "CAPTURE CONTENT: Ask to film/take photos of the reactions. \"Can I get a video of everyone's reaction? This is GOLD!\" They'll share it on social media, tag your location, and bring more tourists to you.",
        ],
        itemsEs: [
          "IDENTIFICA A LA ALFA: En cada grupo, hay una mujer a quien las demás miran para aprobación. Usualmente es la más ruidosa O la novia. Gánala, y el grupo sigue. Ignórala, y ella matará cada venta.",
          "CONTROLA LA ENERGÍA: Sube un poco tu voz para igualar la de ellas — no en agresión, sino en emoción. \"¡VALE CHICAS! ¡Puedo hacerlas a TODAS, pero UNA a la vez para que todas vean el efecto COMPLETO!\" Los grupos respetan a alguien que toma el control.",
          "HAZLO UN ESPECTÁCULO: A los grupos LES ENCANTA el entretenimiento. Haz la primera demo en la alfa o la novia. Narra TODO: \"¡Miren esto, 60 segundos, cuenten conmigo!\" Haz que el grupo cuente hacia atrás. La energía se vuelve contagiosa.",
          "CREA UNA OFERTA GRUPAL: Ofrece un pequeño descuento por 3+ unidades, o da muestras gratis para el grupo. \"Vale, ya que es el último fin de semana de Sarah como mujer libre — ¡cualquiera que compre hoy recibe una muestra gratis de scrub Y le doy a la novia un producto de tamaño completo como mi regalo!\"",
          "CAPTURA CONTENIDO: Pide filmar/tomar fotos de las reacciones. \"¿Puedo grabar la reacción de todas? ¡Esto es ORO!\" Lo compartirán en redes sociales, etiquetarán tu ubicación, y traerán más turistas a ti.",
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
          "Try to demo everyone at once: You'll do a rushed, terrible job on all of them. One great demo beats six bad ones.",
          "Ignore the quiet ones: The shy friend in the back might be the one with the most money and the strongest desire to buy.",
          "Be boring: If you treat a hen party like a serious consultation, they'll lose interest in 30 seconds. Match their FUN energy.",
          "Let one person kill the vibe: If one woman is negative, isolate her. \"You don't have to try it, but let your friends experience it!\" Don't argue with her.",
        ],
        itemsEs: [
          "Tratar de hacer demo a todas a la vez: Harás un trabajo apresurado y terrible en todas. Una gran demo vence a seis malas.",
          "Ignorar a las calladas: La amiga tímida de atrás podría ser la que tiene más dinero y el deseo más fuerte de comprar.",
          "Ser aburrida: Si tratas una despedida de soltera como una consulta seria, perderán interés en 30 segundos. Iguala su energía DIVERTIDA.",
          "Dejar que una persona mate el ambiente: Si una mujer es negativa, aísala. \"¡Tú no tienes que probarlo, pero deja que tus amigas lo experimenten!\" No discutas con ella.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Group Takeover",
        textEs: "Guion — La Toma del Grupo",
      },
      {
        type: "script",
        text: "YOU: \"OKAY BRIDE SQUAD! Listen up! I am going to make EVERY ONE of you look 10 years younger for the wedding photos. BUT — I'm doing this one at a time so each of you gets the VIP treatment. Who's first? Sarah? PERFECT. Everyone gather 'round and watch what happens to the bride!\"",
        textEs: "TÚ: \"¡VALE, BRIDE SQUAD! ¡Escuchad! Voy a hacer que CADA UNA de vosotras se vea 10 años más joven para las fotos de la boda. PERO — lo haré una a la vez para que cada una reciba el tratamiento VIP. ¿Quién primero? ¿Sarah? PERFECTO. ¡Todas júntense y miren lo que le pasa a la novia!\"",
      },
      {
        type: "subheader",
        text: "Script — The Countdown",
        textEs: "Guion — La Cuenta Regresiva",
      },
      {
        type: "script",
        text: "YOU: \"Alright ladies — I need everyone counting with me! 60 seconds on the clock. When I say GO, we all count down together. Ready? THREE... TWO... ONE... GO!\" [Group counts] \"Fifty! Forty-five!...\" Build the energy. When the result hits: \"STOP! Sarah, look in the mirror!\" [Group gasps] \"THAT'S what we're doing here, ladies! Who's NEXT?!\"",
        textEs: "TÚ: \"¡Vale chicas — necesito que TODAS cuenten conmigo! 60 segundos en el reloj. Cuando diga YA, todas contamos juntas. ¿Listas? ¡TRES... DOS... UNO... YA!\" [El grupo cuenta] \"¡Cincuenta! ¡Cuarenta y cinco!...\" Construye la energía. Cuando el resultado llega: \"¡ALTO! ¡Sarah, mira en el espejo!\" [El grupo jadea] \"¡ESO es lo que estamos haciendo aquí, chicas! ¿¿Quién SIGUE??!\"",
      },
      {
        type: "subheader",
        text: "Script — The Group Deal Close",
        textEs: "Guion — El Cierre de Oferta Grupal",
      },
      {
        type: "script",
        text: "YOU: \"Okay, since you ladies are literally the most fun group I've had all week — here's what I'm doing. One syringe is {currency}300. But for a group like this — buy two and the second one is FREE. That's {currency}300 for two, so pair up and split it however you like. And the bride gets a free Dead Sea Scrub from me as a wedding gift. Who's in?\" [Hands go up] \"AMAZING! Let's get you all sorted!\"",
        textEs: "TÚ: \"Vale, ya que sois literalmente el grupo más divertido que he tenido en toda la semana — esto es lo que haré. Una jeringa cuesta {currency}300. Pero para un grupo así — compráis dos y la segunda es GRATIS. Son {currency}300 por dos, así que emparejaos y lo repartís como queráis. Y la novia recibe un Scrub del Mar Muerto gratis de mi parte como regalo de bodas. ¿Quién se apunta?\" [Manos se levantan] \"¡INCREÍBLE! ¡Vamos a atenderlas a todas!\"",
      },
      {
        type: "subheader",
        text: "Script — Handling the Party Pooper",
        textEs: "Guion — Manejando a la Agua Fiestas",
      },
      {
        type: "script",
        text: "YOU: \"Totally fine if it's not for you, love! But let your friends enjoy it — look at Sarah's face, she's glowing! Here, take a free sample so you can try it in your own time. No pressure at all.\" [Hand sample, turn back to the group] \"Okay, who wants to see the nail kit?!\"",
        textEs: "TÚ: \"¡Totalmente bien si no es para ti, amor! Pero deja que tus amigas lo disfruten — ¡mira la cara de Sarah, está radiante! Toma, una muestra gratis para que lo pruebes a tu tiempo. Ninguna presión.\" [Entrega muestra, vuelve al grupo] \"¡Vale, quién quiere ver el kit de uñas?!\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Hen parties are BULK SALE GOLD. The average group buys 2-3 syringes plus multiple smaller items. But the real money is in REFERRALS. Every woman at that hen party has a wedding coming up, a birthday, a mother who wants skincare. Give each one your card. Say: \"If you send me a friend who buys, I'll give you a free product next time you're in {locationName}.\" Suddenly your one sale becomes ten. Also, film everything. Group reaction videos are your best marketing content — get permission, post on your personal socials with location tags, and watch the tourists come to YOU.",
        textEs: "Las despedidas de soltera son ORO DE VENTA EN GRANEL. El grupo promedio compra 2-3 jeringas más varios artículos pequeños. Pero el dinero real está en las REFERENCIAS. Cada mujer en esa despedida tiene una boda próxima, un cumpleaños, una madre que quiere skincare. Dale a cada una tu tarjeta. Di: \"Si me mandas una amiga que compre, te doy un producto gratis la próxima vez que estés en {locationName}.\" De repente tu una venta se convierte en diez. Además, filma todo. Los videos de reacciones grupales son tu mejor contenido de marketing — obtén permiso, publica en tus redes personales con etiquetas de ubicación, y mira cómo los turistas vienen a TI.",
      },
    ],
    quiz: [],
  },

  "S4": {
    id: "S4",
    categoryId: "scenarios",
    title: "Competitor Poaching Your Customer",
    titleEs: "Competidor Robando Tu Cliente",
    subtitle: "Retaining your customer when another seller interrupts",
    subtitleEs: "Reteniendo a tu cliente cuando otro vendedor interrumpe",
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
        text: "You're mid-demo with a French tourist. She's engaged, asking questions, clearly interested. Suddenly another street seller — from a competing cosmetics brand — approaches from behind and says: \"Madam, don't buy from them. Our product is cheaper and better. Come, let me show you.\" He hands her a flyer. She looks confused and starts to turn toward him.",
        textEs: "Estás a mitad de demo con una turista francesa. Está comprometida, haciendo preguntas, claramente interesada. De repente otro vendedor callejero — de una marca competidora — se acerca por detrás y dice: \"Señora, no compre de ellos. Nuestro producto es más barato y mejor. Venga, déjeme mostrarle.\" Le entrega un flyer. Ella se ve confundida y empieza a girar hacia él.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "DON'T PANIC: This happens. Getting territorial or aggressive looks desperate and unprofessional. Stay calm.",
          "PHYSICAL ANCHORING: Stay physically close to your customer. Keep eye contact with HER, not the competitor. Your connection with the customer is your strongest weapon.",
          "ACKNOWLEDGE WITH CLASS: Don't ignore the competitor — that looks weak. Address it directly and confidently: \"There's always someone selling something on the street.\" Then refocus on your customer.",
          "USE THE INTERRUPTION AS PROOF: \"See? Everyone wants your attention out here. The difference is — I've already shown you results on your own face. He's just got words and a flyer.\"",
          "INVITE COMPARISON — ON YOUR TERMS: If the customer seems torn, invite the comparison directly but frame it around YOUR strength: \"Go ahead, listen to what he says. But ask him to show you results on your face like I just did. If his works better, buy his. Fair?\"",
        ],
        itemsEs: [
          "NO TE PÁNIQUES: Esto pasa. Ponerte territorial o agresivo se ve desesperado y poco profesional. Mantén la calma.",
          "ANCLAJE FÍSICO: Mantente físicamente cerca de tu cliente. Mantén contacto visual con ELLA, no con el competidor. Tu conexión con el cliente es tu arma más fuerte.",
          "RECONOCE CON CLASE: No ignores al competidor — eso se ve débil. Enfréntalo directa y confidentemente: \"Siempre hay alguien vendiendo algo en la calle.\" Luego reenfócate en tu cliente.",
          "USA LA INTERRUPCIÓN COMO PRUEBA: \"¿Ves? Todos quieren tu atención aquí afuera. La diferencia es — yo ya te mostré resultados en tu propia cara. Él solo tiene palabras y un flyer.\"",
          "INVITA A COMPARAR — EN TUS TÉRMINOS: Si el cliente parece indeciso, invita la comparación directamente pero enmarca alrededor de TU fortaleza: \"Adelante, escucha lo que dice. Pero pídele que te muestre resultados en tu cara como acabo de hacer yo. Si el de él funciona mejor, cómprale. ¿Justo?\"",
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
          "Trash the competitor: \"Their product is garbage!\" — This makes YOU look insecure. Let your demo do the talking.",
          "Get territorial: Physically blocking the competitor or raising your voice creates a scene. Tourists HATE scenes.",
          "Beg the customer: \"Please don't go, I'll give you a discount\" — Desperation drives people away.",
          "Ignore the competitor completely: The customer is now comparing. If you pretend he doesn't exist, you're ignoring the elephant in the room.",
        ],
        itemsEs: [
          "Hablar mal del competidor: \"¡Su producto es basura!\" — Esto te hace verte inseguro. Deja que tu demo hable.",
          "Ponerte territorial: Bloquear físicamente al competidor o subir la voz crea un escándalo. A los turistas LES HORRORAN los escándalos.",
          "Rogar al cliente: \"Por favor no te vayas, te doy descuento\" — La desesperación ahuyenta a la gente.",
          "Ignorar al competidor por completo: El cliente ahora está comparando. Si pretendes que no existe, estás ignorando al elefante en la habitación.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Confident Dismissal",
        textEs: "Guion — El Descarte Confidente",
      },
      {
        type: "script",
        text: "YOU: \"Happens all the time out here.\" [Don't even look at the competitor, keep eyes on your customer] \"Look, he's got flyers and promises. I've got your actual face showing actual results. You tell me — which one matters more?\"",
        textEs: "TÚ: \"Pasa todo el tiempo aquí afuera.\" [Ni siquiera mires al competidor, mantén ojos en tu cliente] \"Mira, él tiene flyers y promesas. Yo tengo tu cara real mostrando resultados reales. Tú dime — ¿cuál importa más?\"",
      },
      {
        type: "subheader",
        text: "Script — The Invitation to Compare",
        textEs: "Guion — La Invitación a Comparar",
      },
      {
        type: "script",
        text: "YOU: \"Go ahead, hear him out. I encourage it! But here's my challenge: ask him to demo on your face, right now, with the same results you just saw. If he can do it, I'll personally walk you to his counter.\" [Smile] \"But we both know he can't. So — shall we finish what we started?\"",
        textEs: "TÚ: \"Adelante, escúchalo. ¡Lo aliento! Pero aquí está mi reto: pídele que haga demo en tu cara, ahora mismo, con los mismos resultados que acabas de ver. Si puede hacerlo, personalmente te acompaño a su mostrador.\" [Sonríe] \"Pero ambos sabemos que no puede. Entonces — ¿terminamos lo que empezamos?\"",
      },
      {
        type: "subheader",
        text: "Script — The Social Proof Lock",
        textEs: "Guion — El Cierre de Prueba Social",
      },
      {
        type: "script",
        text: "YOU: \"You know what? Three people bought from me in the last hour. Zero people walked away after seeing their own results. I'm not worried about the competition — because I just proved it works on YOU. That's not marketing, that's physics. Ready to wrap this up?\"",
        textEs: "TÚ: \"¿Sabes qué? Tres personas compraron de mí en la última hora. Cero personas se fueron después de ver sus propios resultados. No me preocupa la competencia — porque acabo de probar que funciona en TI. Eso no es marketing, eso es física. ¿Lista para cerrar esto?\"",
      },
      {
        type: "subheader",
        text: "Script — The Deflection with Humor",
        textEs: "Guion — La Desviación con Humor",
      },
      {
        type: "script",
        text: "YOU: \"Sir, I appreciate your hustle, but I'm in the middle of making this beautiful lady even more beautiful.\" [To the customer, wink] \"See? Everyone wants a piece of you today. Must be your lucky day in {locationName}. Now — do we get you the full set or start with the syringe?\"",
        textEs: "TÚ: \"Señor, aprecio su esfuerzo, pero estoy en medio de hacer a esta hermosa dama aún más hermosa.\" [A la clienta, guiño] \"¿Ves? Todos quieren un pedazo de ti hoy. Debe ser tu día de suerte en {locationName}. Ahora — ¿te damos el set completo o empezamos con la jeringa?\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "The best defense against competitors is a demo SO good that the customer is already sold before anyone can interrupt. Speed matters on the street. Get to the face demo FAST — within the first 90 seconds of engagement. A customer who's already seen their wrinkle disappear is almost impossible to poach. Also, build rapport quickly. Use their name, compliment something specific, make a personal connection. People don't switch sellers when they feel a genuine connection. The competitor has a flyer; you have a relationship. Relationships win.",
        textEs: "La mejor defensa contra competidores es una demo TAN buena que el cliente ya esté vendido antes de que nadie pueda interrumpir. La velocidad importa en la calle. Llega a la demo facial RÁPIDO — dentro de los primeros 90 segundos de interacción. Un cliente que ya vio su arruga desaparecer es casi imposible de robar. Además, construye rapport rápidamente. Usa su nombre, complimenta algo específico, haz una conexión personal. La gente no cambia de vendedor cuando siente una conexión genuina. El competidor tiene un flyer; tú tienes una relación. Las relaciones ganan.",
      },
    ],
    quiz: [],
  },

  "S5": {
    id: "S5",
    categoryId: "scenarios",
    title: "The Silent Close",
    titleEs: "El Cierre Silencioso",
    subtitle: "Reading non-verbal buying signals and closing without words",
    subtitleEs: "Leyendo señales de compra no verbales y cerrando sin palabras",
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
        text: "A Japanese tourist watches your entire demo. She doesn't say a word. She watches the product application, watches the 60-second wait, takes the mirror, examines her face carefully... and says nothing. No \"wow,\" no \"amazing,\" no reaction at all. She hands the mirror back, touches her face gently, and looks at the product box. Then back at you. Still silent. What do you do?",
        textEs: "Una turista japonesa observa toda tu demo. No dice una palabra. Observa la aplicación del producto, observa la espera de 60 segundos, toma el espejo, examina su cuidadosamente... y no dice nada. Ningún \"wow,\" ningún \"increíble,\" ninguna reacción en absoluto. Regresa el espejo, toca su cara suavemente, y mira la caja del producto. Luego a ti. Sigues en silencio. ¿¿Qué haces??",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "READ THE BODY LANGUAGE: Silence is NOT rejection. Watch for these BUYING signals: touching the treated area repeatedly, looking at the product packaging, holding onto the mirror, prolonged eye contact, a slight smile or nod.",
          "MATCH THEIR ENERGY: If they're quiet, be quiet too. Lower your voice. Speak slowly. Some cultures find loud, pushy salespeople offensive. A soft approach builds trust with reserved customers.",
          "USE NON-VERBAL CLOSING: Hand them the product box. Hold it out silently with a gentle smile. Let them take it. This is called the \"silent close\" — and it works incredibly well with quiet buyers.",
          "ASK A YES/NO QUESTION: Don't ask open-ended questions that require explanation. Ask: \"Shall I wrap one up for you?\" or \"Would you like to take this home?\" Simple, direct, requiring only a nod or shake.",
          "DON'T FILL THE SILENCE: The biggest mistake salespeople make is talking too much when the customer is quiet. Silence means they're THINKING. Let them think. Comfortable silence is a powerful closing tool.",
        ],
        itemsEs: [
          "LEE EL LENGUAJE CORPORAL: El silencio NO es rechazo. Observa estas señales de COMPRA: tocar el área tratada repetidamente, mirar el empaque del producto, sostener el espejo, contacto visual prolongado, una ligera sonrisa o asentimiento.",
          "IGUALA SU ENERGÍA: Si son callados, sé callada tú también. Baja tu voz. Habla despacio. Algunas culturas encuentran ofensivos a los vendedores ruidosos y agresivos. Un acercamiento suave construye confianza con clientes reservados.",
          "USA EL CIERRE NO VERBAL: Entrégale la caja del producto. Sostenla en silencio con una sonrisa gentil. Déjala tomarla. Esto se llama el \"cierre silencioso\" — y funciona increíblemente bien con compradores callados.",
          "HAZ UNA PREGUNTA SÍ/NO: No hagas preguntas abiertas que requieran explicación. Pregunta: \"¿Te envuelvo uno?\" o \"¿Te gustaría llevarte esto a casa?\" Simple, directo, requiriendo solo un asentimiento o negación.",
          "NO LLENES EL SILENCIO: El error más grande que cometen los vendedores es hablar demasiado cuando el cliente está callado. El silencio significa que están PENSANDO. Déjalos pensar. El silencio cómodo es una herramienta de cierre poderosa.",
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
          "Talk more to fill the silence: Nervous chatter breaks the spell. If she's thinking, let her think.",
          "Ask \"So what do you think?\": This puts pressure on her to evaluate publicly. Some people hate being put on the spot.",
          "Get louder or more energetic: If she's quiet, your loudness feels aggressive and will push her away.",
          "Assume she's not interested: Silence + touching the treated area + examining the product = INTERESTED. She's just processing differently.",
        ],
        itemsEs: [
          "Hablar más para llenar el silencio: La charla nerviosa rompe el hechizo. Si está pensando, déjala pensar.",
          "Preguntar \"Entonces, ¿qué piensas?\": Esto le presiona a evaluar públicamente. Algunas personas odian ser puestas en el centro de atención.",
          "Ponerte más ruidosa o enérgica: Si es callada, tu ruidosidad se siente agresiva y la alejará.",
          "Asumir que no le interesa: Silencio + tocar el área tratada + examinar el producto = INTERESADA. Solo está procesando diferente.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Silent Hand-Off",
        textEs: "Guion — La Entrega Silenciosa",
      },
      {
        type: "script",
        text: "YOU: \"\" [No words. Just gently place the product box in her hands. Make soft eye contact. Smile. Wait. If she holds it for more than 3 seconds, she's buying. Pull out the bag and start wrapping.]",
        textEs: "TÚ: \"\" [Sin palabras. Solo coloca suavemente la caja del producto en sus manos. Haz contacto visual suave. Sonríe. Espera. Si la sostiene por más de 3 segundos, está comprando. Saca la bolsa y empieza a envolver.]",
      },
      {
        type: "subheader",
        text: "Script — The Gentle Question",
        textEs: "Guion — La Pregunta Gentil",
      },
      {
        type: "script",
        text: "YOU: \"\" [Soft voice, almost a whisper] \"Shall I prepare one for you?\" [Pause. Nod slowly while maintaining eye contact. This non-verbal encouragement works wonders.]",
        textEs: "TÚ: \"\" [Voz suave, casi un susurro] \"¿Te preparo uno?\" [Pausa. Asiente lentamente manteniendo contacto visual. Este aliento no verbal hace maravillas.]",
      },
      {
        type: "subheader",
        text: "Script — The Cultural Bridge",
        textEs: "Guion — El Puente Cultural",
      },
      {
        type: "script",
        text: "YOU: \"I can see you're thinking. That's good — it's a smart decision. Take your time.\" [Step back slightly, giving space] \"When you're ready, I'm here. No rush at all.\" [This respects the processing time that many East Asian cultures prefer.]",
        textEs: "TÚ: \"Puedo ver que estás pensando. Eso es bueno — es una decisión inteligente. Tómate tu tiempo.\" [Retrocede ligeramente, dando espacio] \"Cuando estés lista, estoy aquí. Ninguna prisa.\" [Esto respeta el tiempo de procesamiento que muchas culturas de Asia Oriental prefieren.]",
      },
      {
        type: "subheader",
        text: "Script — The Assisted Decision",
        textEs: "Guion — La Decisión Asistida",
      },
      {
        type: "script",
        text: "YOU: \"You have beautiful skin — this will keep it that way for years.\" [Pause, let that sink in] \"One is {currency}300. Two — one for you, one to give — is still {currency}300, because the second one is on me.\" [Present both options. Don't push. Just present. Wait.]",
        textEs: "TÚ: \"Tienes piel hermosa — esto la mantendrá así por años.\" [Pausa, deja que eso se asiente] \"Una cuesta {currency}300. Dos — una para ti y otra para regalar — siguen siendo {currency}300, porque la segunda te la regalo yo.\" [Presenta ambas opciones. No empujes. Solo presenta. Espera.]",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Learn to identify cultural communication styles. Japanese, Korean, and many Northern European customers often process purchases silently. They need SPACE and TIME. Mediterranean, Latin American, and American customers typically want energy, conversation, and interaction. The same approach doesn't work for everyone. The silent close is one of the most underutilized techniques in street sales. Master it, and you'll convert a whole category of buyers that other sellers drive away with too much talking. The 3-second rule: if they hold the product for 3+ seconds without handing it back, start bagging.",
        textEs: "Aprende a identificar estilos de comunicación culturales. Clientes japoneses, coreanos, y muchos del norte de Europa a menudo procesan compras en silencio. Necesitan ESPACIO y TIEMPO. Clientes mediterráneos, latinoamericanos, y estadounidenses típicamente quieren energía, conversación, e interacción. El mismo acercamiento no funciona para todos. El cierre silencioso es una de las técnicas más subutilizadas en ventas callejeras. Domínala, y convertirás toda una categoría de compradores que otros vendedores ahuyentan hablando demasiado. La regla de los 3 segundos: si sostienen el producto por 3+ segundos sin regresarlo, empieza a empacar.",
      },
    ],
    quiz: [],
  },

  "S6": {
    id: "S6",
    categoryId: "scenarios",
    title: "The Tour Group on the Clock",
    titleEs: "El Grupo con el Tiempo Contado",
    subtitle: "Closing fast with time-pressured, multilingual tourists",
    subtitleEs: "Cerrando rápido con turistas multilingües bajo presión de tiempo",
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
        text: "A group of day-trippers — cruise passengers, coach tourists, a shuttle group — spills into the main shopping street in {locationName}. They have exactly 3.5 hours before they have to be back. They're from three different countries — one couple speaks minimal English, another is arguing about directions back to the port, and a third is snapping photos of everything. You spot a woman in her 50s with visible forehead lines examining a shop window near your spot. She has MONEY (designer bag, tour lanyard) and TIME PRESSURE. How do you hook her in 10 seconds and close in 3 minutes?",
        textEs: "Un grupo de excursionistas de un día — pasajeros de crucero, turistas de autocar, un grupo de lanzadera — se desparrama por la calle comercial principal de {locationName}. Tienen exactamente 3,5 horas antes de tener que volver. Son de tres países distintos — una pareja habla inglés mínimo, otra está discutiendo sobre direcciones de regreso al puerto, y una tercera está tomando fotos de todo. Identificas a una mujer en sus 50s con líneas visibles en la frente examinando una vitrina cerca de tu puesto. Tiene DINERO (bolso de diseño, acreditación del grupo) y PRESIÓN DE TIEMPO. ¿Cómo la enganchas en 10 segundos y cierras en 3 minutos?",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "HOOK IN 5 SECONDS: Day-trippers are in sensory overload. Your opener must be IMMEDIATE and VISUAL. Hold up the syringe: \"Excuse me! 60 seconds to look 10 years younger — want to try?\" Movement + direct question stops them.",
          "LEAD WITH THE EUROPE PRICE IMMEDIATELY: Day-trippers are PRIMED to compare prices. \"In Europe this is {currency}500 — here in {locationName} it's {currency}300.\" This creates instant value context.",
          "SPEED-UP THE DEMO: Normal demo = 3 minutes. Group demo = 90 seconds. Skip the long explanation. Apply → count loudly → show result → price → close. \"That's {currency}300, we take all cards, I can have you out of here in 2 minutes.\"",
          "USE THE TIME PRESSURE AS URGENCY: \"Your group leaves in a couple of hours — you want to walk back looking like you just came from a spa, right?\" Frame it as making the MOST of their limited time.",
          "GIVE THEM A REASON TO RETURN: Hand them your card and say \"If you love it, find me next time you're in {locationName}. Mention this and I'll give you the friend discount.\" Day-trippers come back on the same route more often than you think.",
        ],
        itemsEs: [
          "ENGANCHA EN 5 SEGUNDOS: Los excursionistas van en sobrecarga sensorial. Tu apertura debe ser INMEDIATA y VISUAL. Levanta la jeringa: \"¡Perdona! 60 segundos para verte 10 años más joven — ¿quieres probar?\" Movimiento + pregunta directa los detiene.",
          "EMPIEZA POR EL PRECIO DE EUROPA INMEDIATAMENTE: Los excursionistas vienen PREPARADOS para comparar precios. \"En Europa esto cuesta {currency}500 — aquí en {locationName} son {currency}300.\" Esto crea contexto de valor instantáneo.",
          "ACELERA LA DEMO: Demo normal = 3 minutos. Demo de grupo = 90 segundos. Salta la explicación larga. Aplica → cuenta en voz alta → muestra resultado → precio → cierra. \"Son {currency}300, aceptamos todas las tarjetas, y te tengo fuera de aquí en 2 minutos.\"",
          "USA LA PRESIÓN DE TIEMPO COMO URGENCIA: \"Tu grupo se va en un par de horas — querrás volver con cara de haber salido de un spa, ¿verdad?\" Enmarca como aprovechar al MÁXIMO su tiempo limitado.",
          "DALES UNA RAZÓN PARA REGRESAR: Dale tu tarjeta y di \"Si te encanta, búscame la próxima vez que estés en {locationName}. Menciónalo y te hago el descuento de amiga.\" Los excursionistas repiten la misma ruta más de lo que crees.",
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
          "Start with a long story: Day-trippers don't have time for your life story. Hook → demo → close. 3 minutes max.",
          "Ask complicated questions: \"What's your skincare routine?\" takes too long. Assume they're interested and move FAST.",
          "Pressure them about time: \"Hurry up, your group is leaving!\" creates panic, not sales. Use time as a positive frame, not a threat.",
          "Assume they won't buy because they're 'just looking': Day-trippers are in BUYING MODE. They have money, they're on vacation, and they're primed to spend. Go for the close EVERY time.",
        ],
        itemsEs: [
          "Empezar con una historia larga: Los excursionistas no tienen tiempo para tu historia de vida. Engancha → demo → cierra. 3 minutos máximo.",
          "Preguntas complicadas: \"¿Cuál es tu rutina de cuidado de la piel?\" lleva demasiado tiempo. Asume que están interesados y muévete RÁPIDO.",
          "Presionarlos sobre el tiempo: \"¡Date prisa, que se te va el grupo!\" crea pánico, no ventas. Usa el tiempo como marco positivo, no amenaza.",
          "Asumir que no comprarán porque 'solo miran': Los excursionistas están en MODO DE COMPRA. Tienen dinero, están de vacaciones, y están listos para gastar. Ve por el cierre CADA vez.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The 10-Second Hook",
        textEs: "Guion — El Enganche de 10 Segundos",
      },
      {
        type: "script",
        text: "YOU: \"Excuse me! 60 seconds, one wrinkle, completely gone — want to see?\" [Hold up syringe, make eye contact, smile] \"I'm right here, 2 minutes of your time, {locationName} prices.\"",
        textEs: "TÚ: \"¡Perdona! 60 segundos, una arruga, desaparecida del todo — ¿quieres verlo?\" [Levanta la jeringa, haz contacto visual, sonríe] \"Estoy aquí mismo, 2 minutos de tu tiempo, precios de {locationName}.\"",
      },
      {
        type: "subheader",
        text: "Script — The Speed Demo + Close",
        textEs: "Guion — La Demo Rápida + Cierre",
      },
      {
        type: "script",
        text: "YOU: \"Watch this — I'm putting it right here on this line. Now we count to 60. 60, 55, 50...\" [Keep counting, build energy] \"...10, 5, DONE! Look!\" [Hand mirror] \"That line was there a minute ago. Now? Gone. {currency}300, I take all cards. Want me to wrap one up before your group heads off?\"",
        textEs: "TÚ: \"Mira esto — lo pongo aquí mismo, en esta línea. Ahora contamos hasta 60. 60, 55, 50...\" [Sigue contando, construye energía] \"...10, 5, ¡LISTO! ¡Mira!\" [Entrega el espejo] \"Esa línea estaba ahí hace un minuto. ¿Ahora? Desaparecida. {currency}300, acepto todas las tarjetas. ¿Te envuelvo una antes de que se vaya tu grupo?\"",
      },
      {
        type: "subheader",
        text: "Script — The Walk-Back Close",
        textEs: "Guion — El Cierre de Vuelta al Grupo",
      },
      {
        type: "script",
        text: "YOU: \"Picture this: you get back to your group and your friends go 'WHAT did you do in {locationName}?!' This is the kind of souvenir that keeps giving — every time you look in the mirror for the next 3 months. {currency}300. All cards accepted. 30 seconds and you're done.\"",
        textEs: "TÚ: \"Imagínate: vuelves con tu grupo y tus amigas te dicen '¿¿QUÉ te has hecho en {locationName}??' Este es el tipo de souvenir que no para de dar — cada vez que te mires al espejo durante los próximos 3 meses. {currency}300. Acepto todas las tarjetas. 30 segundos y listo.\"",
      },
      {
        type: "subheader",
        text: "Script — The Multilingual Backup",
        textEs: "Guion — El Respaldo Multilingüe",
      },
      {
        type: "script",
        text: "YOU: \"No problem!\" [Use Google Translate voice or gesture] \"Look — 60 seconds, wrinkle gone. {currency}300. Tarjeta? Cash? All okay!\" [Point to your payment terminal, smile warmly. Visual demos transcend language.]",
        textEs: "TÚ: \"¡No hay problema!\" [Usa voz de Google Translate o gestos] \"Mira — 60 segundos, arruga desaparecida. {currency}300. ¿Tarjeta? ¿Efectivo? ¡Todo bien!\" [Señala tu terminal de pago, sonríe cálidamente. Las demos visuales trascienden el idioma.]",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Learn the group schedules. Know which days the big groups arrive and what time they have to leave. When someone says \"I have to be back by 4 PM,\" you'll know exactly how much time they have and can calibrate your pitch accordingly. Also, the phrase \"souvenir that keeps giving\" is GOLD for day-trippers — they're sick of buying junk they'll throw away. A premium skincare product that lasts 3 months feels like a SMART vacation purchase, not an impulse buy.",
        textEs: "Apréndete los horarios de los grupos. Sabe qué días llegan los grandes y a qué hora tienen que irse. Cuando alguien te dice \"tengo que estar de vuelta a las 4,\" sabrás exactamente cuánto tiempo tienen y puedes calibrar tu pitch en consecuencia. Además, la frase \"souvenir que sigue dando\" es ORO para los excursionistas — están hartos de comprar basura que van a tirar. Un producto premium de skincare que dura 3 meses se siente como una compra de vacaciones INTELIGENTE, no un impulso.",
      },
    ],
    quiz: [],
  },

  "S7": {
    id: "S7",
    categoryId: "scenarios",
    title: "Children Interrupting",
    titleEs: "Niños Interrumpiendo",
    subtitle: "Keeping a parent's attention when their child needs it too",
    subtitleEs: "Manteniendo la atención de un padre cuando su hijo también la necesita",
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
        text: "A mother with a 4-year-old stops for your demo. She's interested — you can see it in her eyes. But the kid is BORED. Two minutes in, the child starts whining, pulling on mom's arm, and then escalates to a full tantrum on the floor. The mother is embarrassed, apologizing, trying to calm the kid AND listen to you at the same time. She's starting to pack up to leave. You haven't closed yet.",
        textEs: "Una madre con un niño de 4 años se detiene para tu demo. Está interesada — se ve en sus ojos. Pero el niño está ABURRIDO. Dos minutos después, el niño empieza a quejarse, jalando el brazo de mamá, y luego escala a un rabieta completo en el piso. La madre está avergonzada, disculpándose, tratando de calmar al niño Y escucharte al mismo tiempo. Está empezando a empacar para irse. Todavía no has cerrado.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "ACKNOWLEDGE THE KID FIRST: The child is the real decision-maker here. Get down to their level. Smile. Offer them something — a sample packet, a sticker, your phone calculator to play with. A busy child = a calm parent.",
          "SPEED UP YOUR PITCH: You have HALF the normal time. Get to the demo result ASAP. The parent's attention is split — every second counts.",
          "INVOLVE THE CHILD IN THE PROCESS: \"Hey buddy, want to help me count to 60? Ready? 60, 59...\" Kids love being helpers. A child counting with you is a child not crying.",
          "CREATE A KID-FRIENDLY ZONE: If your store setup allows, have coloring pages, a small toy, or a tablet available. Even 5 minutes of distraction buys you the time to close.",
          "OFFER TO HOLD THE PRODUCT: \"Look, I know this is a lot with the little one. Let me hold this for you with your name on it. Come back when he's calmed down, or I can have it ready for you to grab and go.\" This respects her situation AND secures the sale.",
        ],
        itemsEs: [
          "RECONOCE AL NIÑO PRIMERO: El niño es el verdadero tomador de decisiones aquí. Agáchate a su nivel. Sonríe. Ofrécele algo — un paquetito de muestra, una pegatina, tu calculadora de móvil para jugar. Un niño ocupado = un padre tranquilo.",
          "ACELERA TU PITCH: Tienes la MITAD del tiempo normal. Llega al resultado de la demo ASAP. La atención del padre está dividida — cada segundo cuenta.",
          "INVOLUCRA AL NIÑO EN EL PROCESO: \"Oye amiguito, ¿quieres ayudarme a contar hasta 60? ¿Listo? 60, 59...\" A los niños les encanta ser ayudantes. Un niño contando contigo es un niño que no llora.",
          "CREA UNA ZONA AMIGABLE PARA NIÑOS: Si tu configuración de tienda lo permite, ten páginas para colorear, un juguete pequeño, o una tablet disponible. Incluso 5 minutos de distracción te compran el tiempo para cerrar.",
          "OFRECE GUARDAR EL PRODUCTO: \"Mira, sé que es mucho con el pequeño. Déjame guardarte esto con tu nombre. Regresa cuando se haya calmado, o puedo tenerlo listo para que agarres y te vayas.\" Esto respeta su situación Y asegura la venta.",
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
          "Ignore the child: Pretending the kid isn't there makes the parent feel worse and the child act out MORE for attention.",
          "Tell the parent to \"control their kid\": Even as a joke, this is the fastest way to lose a sale and get a bad review.",
          "Keep talking over the tantrum: The parent can't hear you AND can't think. Pause. Address the child. Resume when things calm.",
          "Let them walk away without a plan: \"Come back later\" without a hold or contact info = lost sale. Always give them a reason and a way to return.",
        ],
        itemsEs: [
          "Ignorar al niño: Pretender que el niño no está ahí hace que el padre se sienta peor y el niño actúe MÁS por atención.",
          "Decirle al padre que \"controle a su niño\": Incluso como broma, es la forma más rápida de perder una venta y obtener una mala reseña.",
          "Seguir hablando sobre el rabieta: El padre no puede escucharte NI pensar. Pausa. Atiende al niño. Reanuda cuando se calmen.",
          "Dejarlos irse sin un plan: \"Regresa después\" sin guardar el producto o dar información de contacto = venta perdida. Siempre dales una razón y una forma de regresar.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Kid Inclusion",
        textEs: "Guion — La Inclusión del Niño",
      },
      {
        type: "script",
        text: "YOU: \"Hey little one! Want to be my assistant today?\" [Get on their level] \"Your job is to hold this —\" [hand them the product box] \"— and when I say GO, you help me count. Can you count to 60?\" [They nod or say yes] \"PERFECT! Okay, GO! 60, 59, 58...\" [Parent is now watching peacefully, grateful you handled it]",
        textEs: "TÚ: \"¡Oye pequeño! ¿Quieres ser mi ayudante hoy?\" [Agáchate a su nivel] \"Tu trabajo es sostener esto —\" [dale la caja del producto] \"— y cuando diga YA, me ayudas a contar. ¿Puedes contar hasta 60?\" [Asiente o dice que sí] \"¡PERFECTO! Vale, ¡YA! 60, 59, 58...\" [El padre ahora observa en paz, agradecido de que lo manejaste]",
      },
      {
        type: "subheader",
        text: "Script — The Quick Close for Busy Parents",
        textEs: "Guion — El Cierre Rápido para Padres Ocupados",
      },
      {
        type: "script",
        text: "YOU: \"I know you've got your hands full. So here's what I'll do: I'll give you the 30-second version.\" [Do a fast, effective demo] \"See that? {currency}300, lasts 3 months, all you need is 2 minutes a day. I'm putting one in a bag for you right now — you can pay in 30 seconds and be on your way. Or I can hold it for 10 minutes while you grab the little one an ice cream. Your call.\"",
        textEs: "TÚ: \"Sé que tienes las manos llenas. Entonces esto es lo que haré: te doy la versión de 30 segundos.\" [Haz una demo rápida y efectiva] \"¿Ves eso? {currency}300, dura 3 meses, solo necesitas 2 minutos al día. Te estoy poniendo uno en una bolsa ahora mismo — puedes pagar en 30 segundos y seguir tu camino. O puedo guardarlo por 10 minutos mientras le compras un helado al pequeño. Tú decides.\"",
      },
      {
        type: "subheader",
        text: "Script — The Hold + Return Setup",
        textEs: "Guion — La Preparación de Guardar + Regresar",
      },
      {
        type: "script",
        text: "YOU: \"Look, go handle the little one. I've put your name on this box — it's yours. Go grab him a snack, walk around for 20 minutes, and when you're back, it'll be right here waiting. No rush at all.\" [Write their name prominently] \"I'm [YOUR NAME], and this product isn't going anywhere except home with you.\"",
        textEs: "TÚ: \"Mira, ve a atender al pequeño. Puse tu nombre en esta caja — es tuya. Ve a comprarle un snack, camina por 20 minutos, y cuando regreses, estará aquí esperando. Ninguna prisa.\" [Escribe su nombre prominentemente] \"Soy [TU NOMBRE], y este producto no va a ningún lado excepto a casa contigo.\"",
      },
      {
        type: "subheader",
        text: "Script — The Distraction Setup",
        textEs: "Guion — La Preparación de Distracción",
      },
      {
        type: "script",
        text: "YOU: [To your colleague, or prepare beforehand] \"Hey Marco, can you give this little hero some stickers?\" [To the child] \"My friend Marco has SPECIAL stickers over there — go see!\" [To the parent, as the child runs off] \"Okay, NOW we have 2 minutes of peace. Let's make them count.\" [Proceed with full demo and close]",
        textEs: "TÚ: [A tu colega, o prepara de antemano] \"Oye Marco, ¿puedes darle a este pequeño héroe unas pegatinas?\" [Al niño] \"¡Mi amigo Marco tiene pegatinas ESPECIALES allá — ve a ver!\" [Al padre, mientras el niño corre] \"Vale, AHORA tenemos 2 minutos de paz. Hagamos que cuenten.\" [Procede con demo completa y cierra]",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Always carry a small bag of kid-friendly items — stickers, mini coloring books, sample packets they can play with. The investment is {currency}5 and it saves you hundreds in lost sales. Also, learn to read PARENT body language: a parent whose eyes keep darting to their kid is about to leave. Address the kid BEFORE the parent reaches their breaking point. The best sellers on the street aren't just good at selling — they're good at reading human situations and adapting in real time.",
        textEs: "Siempre carga una bolsa pequeña de artículos amigables para niños — pegatinas, mini libros para colorear, paquetitos de muestra con los que puedan jugar. La inversión es {currency}5 y te ahorra cientos en ventas perdidas. Además, aprende a leer el lenguaje corporal de los PADRES: un padre cuyos ojos saltan constantemente hacia su niño está a punto de irse. Atiende al niño ANTES de que el padre alcance su punto de quiebre. Los mejores vendedores en la calle no solo son buenos vendiendo — son buenos leyendo situaciones humanas y adaptándose en tiempo real.",
      },
    ],
    quiz: [],
  },

  "S8": {
    id: "S8",
    categoryId: "scenarios",
    title: "Customer Wants to Record You",
    titleEs: "El Cliente Quiere Grabarte",
    subtitle: "Turning privacy concerns into content opportunities",
    subtitleEs: "Convirtiendo preocupaciones de privacidad en oportunidades de contenido",
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
        text: "You're in the middle of a great demo. The customer is engaged, the wrinkle is disappearing beautifully, and then — she pulls out her phone and says \"I'm going to record this for my TikTok.\" She hits record and points the camera at you. Other people notice and start watching. What do you do? This is both an opportunity and a risk.",
        textEs: "Estás a mitad de una gran demo. El cliente está comprometido, la arruga está desapareciendo hermosamente, y entonces — saca su móvil y dice \"Voy a grabar esto para mi TikTok.\" Le da a grabar y apunta la cámara hacia ti. Otras personas notan y empiezan a observar. ¿Qué haces? Esto es tanto una oportunidad como un riesgo.",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "SAY YES — WITH CONDITIONS: Recording is FREE MARKETING. But set boundaries: \"Absolutely! Just make sure you get my good side, and tag us so people know where to find us!\"",
          "PERFORM FOR THE CAMERA: Once that phone is out, you're not just demoing — you're performing. Speak clearly, enunciate, smile, make eye contact with the camera occasionally. This video could reach thousands.",
          "GET YOUR BRAND IN FRAME: Make sure your store name, location, or product packaging is visible in the shot. Say the location out loud: \"Welcome to Zero Lines in {locationName} — 60-second results, watch this!\"",
          "OFFER A DISCOUNT FOR POSTING: \"If you post that and tag us, I'll give you 10% off today AND a free sample!\" User-generated content is worth 100x more than anything you post yourself.",
          "ASK FOR THE VIDEO: \"Can you send me a copy? I'd love to share it on our page too!\" This gives you content for your own social media and builds a relationship with the customer.",
        ],
        itemsEs: [
          "DI SÍ — CON CONDICIONES: Grabar es MARKETING GRATIS. Pero establece límites: \"¡Absolutamente! Solo asegúrate de captar mi buen lado, y etiquétanos para que la gente sepa dónde encontrarnos!\"",
          "ACTÚA PARA LA CÁMARA: Una vez que el móvil sale, no solo estás haciendo demo — estás actuando. Habla claro, enuncia, sonríe, haz contacto visual con la cámara ocasionalmente. Este video podría llegar a miles.",
          "METE TU MARCA EN EL CUADRO: Asegúrate de que el nombre de tu tienda, ubicación, o empaque del producto sea visible en la toma. Di la ubicación en voz alta: \"¡Bienvenidos a Zero Lines en {locationName} — resultados en 60 segundos, mira esto!\"",
          "OFRECE DESCUENTO POR PUBLICAR: \"¡Si publicas eso y nos etiquetas, te doy 10% de descuento hoy Y una muestra gratis!\" El contenido generado por usuarios vale 100 veces más que cualquier cosa que publiques tú mismo.",
          "PIDE EL VIDEO: \"¿Puedes enviarme una copia? ¡Me encantaría compartirlo en nuestra página también!\" Esto te da contenido para tus propias redes sociales y construye una relación con el cliente.",
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
          "Say no: Refusing recording looks suspicious — like you have something to hide. In 2024, saying no to cameras is saying no to free advertising.",
          "Ignore the camera and keep talking normally: Your normal street patter doesn't work on video. Speak slower, clearer, and more deliberately when being recorded.",
          "Let them record without getting your details: If they post without tagging you, you get zero benefit. Always exchange contact info.",
          "Be awkward or self-conscious: Confidence on camera is magnetic. If you own the moment, the video performs better AND the sale closes easier.",
        ],
        itemsEs: [
          "Decir que no: Negarse a grabar se ve sospechoso — como si tuvieras algo que esconder. En 2024, decir que no a las cámaras es decir que no a publicidad gratis.",
          "Ignorar la cámara y seguir hablando normal: Tu charla normal de calle no funciona en video. Habla más despacio, claro, y deliberadamente cuando te graban.",
          "Dejarlos grabar sin obtener tus datos: Si publican sin etiquetarte, obtienes cero beneficio. Siempre intercambia información de contacto.",
          "Ser incómodo o cohibido: La confianza ante la cámara es magnética. Si te apropias del momento, el video rinde mejor Y la venta se cierra más fácil.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Enthusiastic Yes",
        textEs: "Guion — El Sí Entusiasta",
      },
      {
        type: "script",
        text: "YOU: \"YES! Record away! Get my good side — that's EVERY side!\" [Laugh, strike a pose] \"Seriously though, make sure you tag @ZeroLines{locationName} so people know where to find us. And if this video gets over 1,000 views, come back and I'll give you a free product!\"",
        textEs: "TÚ: \"¡SÍ! ¡Graba todo! ¡Captura mi buen lado — es CADA lado!\" [Ríe, posa] \"En serio, asegúrate de etiquetar @ZeroLines{locationName} para que la gente sepa dónde encontrarnos. ¡Y si este video llega a más de 1,000 vistas, regresa y te doy un producto gratis!\"",
      },
      {
        type: "subheader",
        text: "Script — The Brand Integration",
        textEs: "Guion — La Integración de Marca",
      },
      {
        type: "script",
        text: "YOU: \"For sure! Here, let me hold the product up to the camera so everyone can see the name. This is the Hyaluronic Syringe from Zero Lines — we sell this right here in {locationName}. Watch what it does to this line in 60 seconds. Ready?\" [Direct, professional, brand-forward]",
        textEs: "TÚ: \"¡Claro! Mira, déjame sostener el producto frente a la cámara para que todos vean el nombre. Esta es la Jeringa Hialurónica de Zero Lines — lo vendemos aquí mismo, en {locationName}. Mira lo que le hace a esta línea en 60 segundos. ¿Lista?\" [Directo, profesional, marca al frente]",
      },
      {
        type: "subheader",
        text: "Script — The Exchange Close",
        textEs: "Guion — El Cierre de Intercambio",
      },
      {
        type: "script",
        text: "YOU: \"I'm all for it! But here's the deal — I'll give you an amazing video AND 10% off, but you have to: one, tag us, two, send me the video so I can repost it, and three — tell me honestly if you love the product after a week. Deal?\" [Shake on it] \"Awesome. Now let's make some content!\"",
        textEs: "TÚ: \"¡Estoy totalmente a favor! Pero aquí está el trato — te doy un video increíble Y 10% de descuento, pero tienes que: uno, etiquetarnos, dos, enviarme el video para que lo vuelva a publicar, y tres — dime honestamente si amas el producto después de una semana. ¿Trato?\" [Choca eso] \"Increíble. ¡Ahora hagamos contenido!\"",
      },
      {
        type: "subheader",
        text: "Script — The Camera Shy Recovery",
        textEs: "Guion — La Recuperación de Timidez ante Cámara",
      },
      {
        type: "script",
        text: "YOU: \"Totally fine if you don't want me on camera — but can I ask a favor? Film just your hand or just the product. Say 'Zero Lines {locationName}, 60-second results.' That way your followers know where to come, and you still get amazing content!\"",
        textEs: "TÚ: \"Totalmente bien si no me quieres en cámara — pero ¿puedo pedirte un favor? Filma solo tu mano o solo el producto. Di 'Zero Lines {locationName}, resultados en 60 segundos.' Así tus seguidores saben dónde venir, ¡y tú sigues obteniendo contenido increíble!\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Create a branded hashtag (#ZeroLines{locationName}) and put it on a small card you hand to anyone recording. Ask them to use it. Over time, this builds a library of user-generated content that markets your spot 24/7. Also, learn ONE good \"TikTok moment\" phrase — something catchy that people want to quote. For example: \"60 seconds to stop time\" or \"{locationName}: where wrinkles go to die.\" A catchy phrase gets quoted, and quoted content goes viral.",
        textEs: "Crea un hashtag de marca (#ZeroLines{locationName}) y ponlo en una tarjeta pequeña que entregues a cualquiera que grabe. Pídeles que lo usen. Con el tiempo, esto construye una biblioteca de contenido generado por usuarios que comercializa tu puesto 24/7. Además, aprende UNA buena frase de \"momento TikTok\" — algo pegadizo que la gente quiera citar. Por ejemplo: \"60 segundos para detener el tiempo\" o \"{locationName}: donde las arrugas van a morir.\" Una frase pegadiza se cita, y el contenido citado se vuelve viral.",
      },
    ],
    quiz: [],
  },

  "S9": {
    id: "S9",
    categoryId: "scenarios",
    title: "The Skeptical Man",
    titleEs: "El Hombre Escéptico",
    subtitle: "Winning over the dismissive male partner who's just tagging along",
    subtitleEs: "Ganándote al pareja masculino escéptico que solo viene de acompañante",
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
        text: "A couple stops for your demo. The woman is interested — she's watching, asking about ingredients, touching the products. But the man? He's standing with his arms crossed, rolling his eyes, checking his phone. Every time she says something positive, he counters with: \"It's all a scam,\" \"You don't need that junk,\" or \"Let's go, we're wasting time.\" She's starting to disengage because of him. But YOU can see she wants it. How do you handle him without alienating her?",
        textEs: "Una pareja se detiene para tu demo. La mujer está interesada — está observando, preguntando sobre ingredientes, tocando los productos. ¿Pero el hombre? Está parado con los brazos cruzados, poniendo los ojos en blanco, mirando su móvil. Cada vez que ella dice algo positivo, él contraataca con: \"Todo es una estafa,\" \"No necesitas esa porquería,\" o \"Vámonos, estamos perdiendo el tiempo.\" Ella está empezando a desconectarse por él. Pero TÚ puedes ver que ella lo quiere. ¿Cómo manejas a él sin alienarla?",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "DON'T ENGAGE HIM DIRECTLY: Arguing with him creates a battle of egos that she'll lose. Your job is to sell HER while neutralizing HIM.",
          "ACKNOWLEDGE HIM WITH RESPECT: \"I can see you look out for her — that's a good thing. Give me 60 seconds and if she's not impressed, I'll be the first one to tell you both to walk away.\" This frames him as PROTECTIVE (positive) rather than OBSTRUCTIVE.",
          "FIND HIS PAIN POINT: Men care about RESULTS and EFFICIENCY. \"This takes 2 minutes a day. No complicated routine. Just apply, done.\" Or appeal to his wallet: \"One syringe replaces {currency}800 worth of spa facials.\"",
          "OFFER TO DEMO ON HIM: \"You look like a man who appreciates proof. Let me try this on your hand — no charge, no commitment. Just so you can see what she'll be using.\" Once he FEELS it, skepticism drops.",
          "MAKE HIM PART OF THE DECISION: \"You know her better than I do — does she usually take care of her skin, or is this new for her?\" Getting him talking shifts him from adversary to advisor.",
        ],
        itemsEs: [
          "NO TE ENFRENTES A ÉL DIRECTAMENTE: Discutir con él crea una batalla de egos que ella perderá. Tu trabajo es venderle A ELLA mientras neutralizas A ÉL.",
          "RECONÓCELO CON RESPETO: \"Veo que la cuidas — eso es bueno. Dame 60 segundos y, si ella no se queda impresionada, seré la primera en deciros que os vayáis.\" Esto lo enmarca como PROTECTOR (positivo) en vez de OBSTRUCTIVO.",
          "ENCUENTRA SU PUNTO DOLOROSO: A los hombres les importan los RESULTADOS y la EFICIENCIA. \"Esto toma 2 minutos al día. Sin rutinas complicadas. Solo aplicas, listo.\" O apela a su bolsillo: \"Una jeringa sustituye {currency}800 en faciales de spa.\"",
          "OFRECE HACERLE DEMO A ÉL: \"Se nota que eres de los que quieren pruebas. Déjame probarlo en tu mano — sin coste, sin compromiso. Solo para que veas lo que va a usar ella.\" Una vez que ÉL LO SIENTE, el escepticismo cae.",
          "HAZLO PARTE DE LA DECISIÓN: \"Tú la conoces mejor que yo — ¿suele cuidarse la piel, o esto es nuevo para ella?\" Hacerlo hablar lo cambia de adversario a asesor.",
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
          "Ignore him completely: He's the gatekeeper. If you pretend he doesn't exist, he'll work harder to undermine you.",
          "Challenge his masculinity: \"Real men take care of their skin too!\" — Even if true, this makes him defensive and MORE hostile.",
          "Pit them against each other: \"Don't let him control what you buy!\" — Creates relationship tension and makes YOU the villain.",
          "Offer a discount to \"win\": Bargaining in front of a skeptical man trains him that his negativity gets rewards.",
        ],
        itemsEs: [
          "Ignorarlo por completo: Él es el guardián. Si pretendes que no existe, trabajará más duro para minarte.",
          "Cuestionar su masculinidad: \"¡Los hombres de verdad también cuidan su piel!\" — Aunque sea cierto, esto lo pone a la defensiva y MÁS hostil.",
          "Enfrentarlos: \"¡No dejes que él controle qué compras!\" — Crea tensión de relación y te convierte a TI en la villana.",
          "Ofrecer descuento para \"ganar\": Negociar frente a un hombre escéptico lo entrena de que su negatividad obtiene recompensas.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Respect + Challenge",
        textEs: "Guion — El Respeto + Reto",
      },
      {
        type: "script",
        text: "YOU: \"I respect that you're looking out for her — that says a lot about you. So let me make you a promise: give me 60 seconds. If I don't show you something that impresses YOU, I'll tell her myself that she should walk away. Fair?\" [He'll agree — men love fair challenges] \"Perfect. Let's do this.\"",
        textEs: "TÚ: \"Respeto que la cuides — eso dice mucho de ti. Así que déjame hacerte una promesa: dame 60 segundos. Si no te enseño algo que te impresione A TI, le diré yo misma que se vaya. ¿Trato?\" [Él aceptará — a los hombres les encantan los retos justos] \"Perfecto. Hagamos esto.\"",
      },
      {
        type: "subheader",
        text: "Script — The Demo on Him",
        textEs: "Guion — La Demo en Él",
      },
      {
        type: "script",
        text: "YOU: \"You're clearly a man of facts. So let me show you the facts — on your own hand.\" [Apply to his hand] \"Feel that texture? That's hyaluronic acid — the same stuff in your joints. No chemicals, no nonsense. Just science. Now watch what happens to that dry patch in 60 seconds.\" [Let him see/feel the result] \"That's what she'd be putting on her face. Still think it's junk?\"",
        textEs: "TÚ: \"Está claro que eres de hechos. Pues déjame enseñarte los hechos — en tu propia mano.\" [Aplica en su mano] \"¿Notas esa textura? Eso es ácido hialurónico — lo mismo que tienes en las articulaciones. Sin químicos, sin tonterías. Solo ciencia. Ahora mira lo que le pasa a esa zona seca en 60 segundos.\" [Déjalo ver/sentir el resultado] \"Eso es lo que ella se pondría en la cara. ¿Sigues pensando que es una tontería?\"",
      },
      {
        type: "subheader",
        text: "Script — The Value Reframe for Men",
        textEs: "Guion — La Reconversión de Valor para Hombres",
      },
      {
        type: "script",
        text: "YOU: \"Let me put this in terms you'll appreciate. One syringe: {currency}300. One facial at a spa: {currency}80. This replaces 8-10 facials. That's {currency}800 worth of treatments for {currency}300. And in any store back home, this is {currency}500. I'm not selling you a cream; I'm offering you more than 60% off what those treatments would cost you.\"",
        textEs: "TÚ: \"Déjame ponértelo en términos que vas a apreciar. Una jeringa: {currency}300. Un facial en un spa: {currency}80. Esto sustituye 8-10 faciales. Son {currency}800 en tratamientos por {currency}300. Y en cualquier tienda de tu país esto cuesta {currency}500. No te estoy vendiendo una crema; te estoy ofreciendo más de un 60% menos de lo que te costarían esos tratamientos.\"",
      },
      {
        type: "subheader",
        text: "Script — The Inclusion Pivot",
        textEs: "Guion — El Giro de Inclusión",
      },
      {
        type: "script",
        text: "YOU: [To the woman, but loud enough for him] \"You know what? Your partner has really good instincts — most people on the street ARE trying to sell junk.\" [To him] \"But here's the difference: we have a store, we have Google reviews, we have a return policy. We're not going anywhere. And neither are the results you just saw on her face. So — are you the kind of guy who trusts his own eyes, or do you need more proof?\"",
        textEs: "TÚ: [A la mujer, pero lo suficientemente alto para que él escuche] \"¿Sabes qué? Tu pareja tiene muy buen instinto — la mayoría de la gente en la calle SÍ intenta vender basura.\" [A él] \"Pero esta es la diferencia: tenemos tienda, tenemos reseñas en Google y tenemos política de devolución. No nos vamos a ningún lado. Y los resultados que acabas de ver en su cara, tampoco. Así que — ¿eres de los que confían en sus propios ojos, o necesitas más pruebas?\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Men process purchases differently than women. Women buy on EMOTION and RELATIONSHIP (how it feels, how they'll look, the experience). Men buy on LOGIC and VALUE (price per use, time saved, proof). When selling to a couple, address BOTH: use emotion with her, use logic with him. The phrase \"Here's the math\" is magic with skeptical men. And remember: a man who says no in public but sees results may come back ALONE the next day to buy it as a surprise gift. Always give him your card separately.",
        textEs: "Los hombres procesan compras diferente que las mujeres. Las mujeres compran por EMOCIÓN y RELACIÓN (cómo se siente, cómo se verán, la experiencia). Los hombres compran por LÓGICA y VALOR (precio por uso, tiempo ahorrado, prueba). Cuando vendes a una pareja, dirígete a AMBOS: usa emoción con ella, usa lógica con él. La frase \"Aquí está la matemática\" es mágica con hombres escépticos. Y recuerda: un hombre que dice que no en público pero ve resultados puede regresar SOLO al día siguiente para comprarlo como regalo sorpresa. Siempre dale tu tarjeta por separado.",
      },
    ],
    quiz: [],
  },

  "S10": {
    id: "S10",
    categoryId: "scenarios",
    title: "The Returning Customer",
    titleEs: "El Cliente que Regresa",
    subtitle: "Maximizing upsell opportunities and building long-term loyalty",
    subtitleEs: "Maximizando oportunidades de venta adicional y construyendo lealtad a largo plazo",
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
        text: "A woman you sold to three months ago walks back up to your spot. She remembers your name. She pulls out her phone and shows you a photo — her skin looks AMAZING. \"I used the whole syringe,\" she says, smiling. \"It really worked. What else you got?\" This is the BEST possible scenario. She's pre-sold, she trusts you, and she's ready to spend. But she's also comparing everything to that first magical experience. How do you keep the magic alive while maximizing the sale?",
        textEs: "Una mujer a quien vendiste hace tres meses camina de regreso a tu puesto. Recuerda tu nombre. Saca su móvil y te muestra una foto — su piel se ve INCREÍBLE. \"Usé toda la jeringa,\" dice, sonriendo. \"Realmente funcionó. ¿Qué más tienes?\" Este es el MEJOR escenario posible. Ella ya está vendida, confía en ti, y está lista para gastar. Pero también está comparando todo con esa primera experiencia mágica. ¿Cómo mantienes viva la magia mientras maximizas la venta?",
      },
      {
        type: "subheader",
        text: "What To Do",
        textEs: "Qué Hacer",
      },
      {
        type: "numbered",
        items: [
          "CELEBRATE THEM LIKE FAMILY: \"OH MY GOD, you came back! Look at your skin — I told you!\" Hugs, high-fives, genuine excitement. Returning customers are GOLD — treat them like royalty.",
          "SHOW THEM THE NEW STUFF: Returning customers don't want the same product — they want the NEXT level. Show them products they haven't tried. \"You had the syringe — now let me blow your mind with the Glycolic Peeling.\"",
          "ASK FOR A TESTIMONIAL/PHOTO: \"Can I take a before/after photo of you for our wall?\" This makes them feel special AND gives you marketing material.",
          "CREATE A LOYALTY OFFER: \"Since you're family now — regular price is {currency}300, but for returning customers like you, it's {currency}210. And if you buy two products today, I'll throw in the scrub for free.\" Make them feel VIP.",
          "SEED FUTURE VISITS: \"This peeling lasts about 2 months. I'll be right here when you're ready for more. Here's my WhatsApp — message me before you come and I'll have your products ready.\" Turn one return into a LIFETIME relationship.",
        ],
        itemsEs: [
          "CÉLEBRA COMO FAMILIA: \"¡DIOS MÍO, regresaste! ¡Mira tu piel — te lo dije!\" Abrazos, high-fives, emoción genuina. Los clientes que regresan son ORO — trátalos como realeza.",
          "MUÉSTRALES LO NUEVO: Los clientes que regresan no quieren el mismo producto — quieren el SIGUIENTE nivel. Muéstrales productos que no han probado. \"Tuviste la jeringa — ahora déjame volarte la cabeza con el Peeling Glicólico.\"",
          "PIDE UN TESTIMONIO/FOTO: \"¿Puedo tomarte una foto de antes/después para nuestra pared?\" Esto los hace sentir especiales Y te da material de marketing.",
          "CREA UNA OFERTA DE LEALTAD: \"Ya que eres de la familia — el precio normal es {currency}300, pero para clientes que vuelven como tú, son {currency}210. Y si compras dos productos hoy, te regalo el scrub.\" Hazlos sentir VIP.",
          "SIEMBRA VISITAS FUTURAS: \"Este peeling dura unos 2 meses. Estaré aquí mismo cuando estés lista para más. Aquí está mi WhatsApp — mándame mensaje antes de venir y tendré tus productos listos.\" Convierte un regreso en una relación de POR VIDA.",
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
          "Treat them like a new customer: \"So, this is our hyaluronic syringe...\" — They already know! This feels insulting and wastes their time.",
          "Upsell too aggressively: They came back because they trust you. Pushy upselling breaks that trust. Recommend, don't pressure.",
          "Forget their details: If you remember their name, what they bought, and how it went for them, you create a connection that no competitor can match.",
          "Assume they'll buy without a demo: Even returning customers need to see/feel the product again. The demo is your closing tool — use it.",
        ],
        itemsEs: [
          "Tratarlos como cliente nuevo: \"Entonces, esta es nuestra jeringa hialurónica...\" — ¡Ya lo saben! Esto se siente insultante y desperdicia su tiempo.",
          "Vender demasiado agresivamente: Regresaron porque confían en ti. La venta agresiva adicional rompe esa confianza. Recomienda, no presiones.",
          "Olvidar sus detalles: Si recuerdas su nombre, qué compraron, y cómo les fue, creas una conexión que ningún competidor puede igualar.",
          "Asumir que comprarán sin demo: Incluso los clientes que regresan necesitan ver/sentir el producto de nuevo. La demo es tu herramienta de cierre — úsala.",
        ],
      },
      {
        type: "subheader",
        text: "Script — The Warm Welcome",
        textEs: "Guion — La Bienvenida Cálida",
      },
      {
        type: "script",
        text: "YOU: \"NO WAY! Maria! You came back!\" [Genuine excitement] \"Let me see that skin! OH MY GOD. I told you! You look INCREDIBLE!\" [High-five or hug if appropriate] \"Okay, okay — you used the whole syringe. I am SO proud of you. Now — are you ready for the NEXT level? Because I have some new stuff that's going to blow your mind.\"",
        textEs: "TÚ: \"¡NO PUEDE SER! ¡María! ¡Regresaste!\" [Emoción genuina] \"¡Déjame ver esa piel! DIOS MÍO. ¡Te lo dije! ¡Te ves INCREÍBLE!\" [High-five o abrazo si es apropiado] \"Vale, vale — usaste toda la jeringa. Estoy TAN orgullosa de ti. Ahora — ¿estás lista para el SIGUIENTE nivel? Porque tengo cosas nuevas que te van a volar la cabeza.\"",
      },
      {
        type: "subheader",
        text: "Script — The Upsell with Logic",
        textEs: "Guion — La Venta Adicional con Lógica",
      },
      {
        type: "script",
        text: "YOU: \"So you loved the syringe — amazing. Now here's what most people do next: they add the Glycolic Peeling. Why? Because the syringe hydrates and fills — but the peeling removes the dead skin that blocks absorption. Together? They're a POWER couple. The syringe works 3x better when your skin is properly exfoliated.\" [Do a quick peeling demo] \"Feel that? Baby-smooth skin, and NOW the syringe can do its real magic.\"",
        textEs: "TÚ: \"Así que amaste la jeringa — increíble. Ahora esto es lo que la mayoría hace después: agregan el Peeling Glicólico. ¿Por qué? Porque la jeringa hidrata y rellena — pero el peeling remueve la piel muerta que bloquea la absorción. ¿Juntos? Son una pareja de PODER. La jeringa funciona 3 veces mejor cuando tu piel está adecuadamente exfoliada.\" [Haz una demo rápida del peeling] \"¿Sientes eso? Piel suave como bebé, y AHORA la jeringa puede hacer su magia real.\"",
      },
      {
        type: "subheader",
        text: "Script — The VIP Treatment",
        textEs: "Guion — El Tratamiento VIP",
      },
      {
        type: "script",
        text: "YOU: \"You know what? You're not a regular customer anymore — you're family. So here's what I'm doing for you today.\" [Lower voice, make it feel exclusive] \"Regular price for the syringe + peeling is {currency}450. For you? {currency}310. AND I'm throwing in the Dead Sea Scrub — full size, my gift, that's another {currency}60. That's {currency}510 worth of product for {currency}310. Only because you came back.\" [Hand her the bag] \"Welcome home.\"",
        textEs: "TÚ: \"¿Sabes qué? Ya no eres una cliente regular — eres familia. Entonces esto es lo que haré por ti hoy.\" [Baja la voz, hazlo sentir exclusivo] \"El precio normal de jeringa + peeling es {currency}450. ¿Para ti? {currency}310. Y te regalo el Scrub del Mar Muerto — tamaño completo, otros {currency}60. Son {currency}510 en producto por {currency}310. Solo porque regresaste.\" [Entrégale la bolsa] \"Bienvenida a casa.\"",
      },
      {
        type: "subheader",
        text: "Script — The Future Seed",
        textEs: "Guion — La Siembra del Futuro",
      },
      {
        type: "script",
        text: "YOU: \"This peeling you just bought? Use it twice a week, and in 6 weeks your skin is going to be NEXT LEVEL. Here's my WhatsApp —\" [Write it down, give card] \"— send me a photo at week 3. I want to see your progress. And when you're running low? Message me. I'll have your next order ready before you even get here. I'm here in {locationName} every day — consider me your personal skincare supplier.\"",
        textEs: "TÚ: \"¿Este peeling que acabas de comprar? Úsalo dos veces por semana, y en 6 semanas tu piel va a estar en el SIGUIENTE NIVEL. Aquí está mi WhatsApp —\" [Escríbelo, dale tarjeta] \"— mándame una foto en la semana 3. Quiero ver tu progreso. ¿Y cuando te estés acabando? Mándame mensaje. Tendré tu siguiente pedido listo antes de que llegues. Estoy aquí en {locationName} todos los días — considérame tu proveedora personal de skincare.\"",
      },
      {
        type: "subheader",
        text: "Before You Walk Away",
        textEs: "Antes de Irte",
      },
      {
        type: "tip",
        text: "Keep a simple customer log on your phone — names, what they bought, date, and any personal details (where they're from, skin concerns, follow-up promises). When Maria from Birmingham walks back up three months later and you say \"Maria! How did the honeymoon go? Did the syringe last the whole trip?\" — she will be SHOCKED you remembered. That shock turns into trust, trust turns into loyalty, and loyalty turns into a customer who brings her friends, her sisters, and her coworkers. ONE returning customer, properly nurtured, is worth TEN new ones. They're your salesforce, your marketing team, and your proof — all in one.",
        textEs: "Mantén un registro simple de clientes en tu móvil — nombres, qué compraron, fecha, y cualquier detalle personal (de dónde son, preocupaciones de piel, promesas de seguimiento). Cuando María de Birmingham regresa tres meses después y dices \"¡María! ¿Cómo fue la luna de miel? ¿La jeringa duró todo el viaje?\" — ella se quedará SHOCKEADA de que recordaste. Ese shock se convierte en confianza, la confianza en lealtad, y la lealtad en una cliente que trae a sus amigas, hermanas, y compañeras de trabajo. UN cliente que regresa, apropiadamente nutridos, vale DIEZ nuevos. Son tu fuerza de ventas, tu equipo de marketing, y tu prueba — todo en uno.",
      },
    ],
    quiz: [],
  },
};

export interface ScenarioLesson {
  id: string;
  categoryId: 'scenarios';
  tier: number;
  title: string;
  titleEs: string;
  subtitle: string;
  subtitleEs: string;
  duration: string;
  icon: string;
  scenario: { text: string; textEs: string; };
  whatToDo: { text: string; textEs: string; }[];
  whatNotToDo: { text: string; textEs: string; }[];
  scripts: { label: string; labelEs: string; text: string; textEs: string; }[];
  proTip: { text: string; textEs: string; };
}

export const scenarioLessons: ScenarioLesson[] = [
  // ============================================================
  // S1: The Drunk Customer
  // ============================================================
  {
    id: 'S1',
    categoryId: 'scenarios',
    tier: 1,
    title: "The Drunk Customer",
    titleEs: "El Cliente Borracho",
    subtitle: "Staying safe and professional when alcohol is involved",
    subtitleEs: "Mantente seguro y profesional cuando hay alcohol de por medio",
    duration: "4 min",
    icon: "AlertTriangle",
    scenario: {
      text: "It's 2 PM on a Saturday in Gibraltar. A group of British tourists stumbles past your spot. One woman — loud, slurring her words, reeking of alcohol — sees your demo and lurches toward you. \"OI! What's that then?! Make me beautiful!\" She's grabbing your arm, way too close, breath in your face. Her friends are laughing but not helping. She's asking to try the product. Her credit card is already out.",
      textEs: "Son las 2 PM de un sábado en Gibraltar. Un grupo de turistas británicos tropieza cerca de tu puesto. Una mujer — ruidosa, arrastrando las palabras, oliendo a alcohol — ve tu demo y se tambalea hacia ti. \"¡OY! ¿¿Qué es eso entonces?! ¡Hazme bella!\" Te está agarrando el brazo, demasiado cerca, su aliento en tu cara. Sus amigas se ríen pero no ayudan. Pide probar el producto. Su tarjeta de crédito ya está afuera."
    },
    whatToDo: [
      {
        text: "**ASSESS IMMEDIATELY**: Is the person happy-drunk or angry-drunk? Happy-drunk can sometimes become a sale (though ethically questionable). Angry-drunk = immediate disengagement.",
        textEs: "**EVALÚA INMEDIATAMENTE**: ¿La persona está alegre-borracha o enojada-borracha? Alegre-borracha a veces puede convertirse en venta (aunque éticamente cuestionable). Enojada-borracha = desenganche inmediato."
      },
      {
        text: "**CREATE PHYSICAL SPACE**: Step back. Put the counter or your demo table between you. Drunk people have no concept of personal space — you need to establish it.",
        textEs: "**CREA ESPACIO FÍSICO**: Retrocede. Pon el mostrador o tu mesa de demo entre ustedes. Los borrachos no tienen concepto de espacio personal — tú necesitas establecerlo."
      },
      {
        text: "**NEVER DEMO ON A DRUNK PERSON'S FACE**: If you absolutely must engage, demo on your OWN hand or arm. A drunk person who has a bad reaction will blame you, their friends will film it, and you'll have a nightmare on social media.",
        textEs: "**NUNCA HAGAS DEMO EN LA CARA DE UN BORRACHO**: Si absolutamente debes interactuar, haz la demo en tu propia mano o brazo. Un borracho que tiene mala reacción te culpará, sus amigas lo filmarán, y tendrás una pesadilla en redes sociales."
      },
      {
        text: "**USE THE FRIEND SYSTEM**: Talk to the SOBER friends. \"She's having a great time, but I want to make sure she still loves this tomorrow morning. Why don't you guys grab my card and come back when everyone's fresh?\"",
        textEs: "**USA EL SISTEMA DE AMIGA**: Habla con las amigas SOBRias. \"Ella la está pasando increíble, pero quiero asegurarme de que todavía ame esto mañana por la mañana. ¿Por qué no toman mi tarjeta y regresan cuando todas estén frescas?\""
      },
      {
        text: "**IF THEY'RE AGGRESSIVE**: Stop talking. Step back. Raise your hand in a 'stop' gesture. Firmly: \"I can't help you right now. Please step back.\" If they persist, signal security or your manager immediately. Your safety is worth more than any sale.",
        textEs: "**SI SON AGRESIVOS**: Deja de hablar. Retrocede. Levanta tu mano en gesto de 'alto.' Con firmeza: \"No puedo ayudarte ahora. Por favor retrocede.\" Si persisten, señala a seguridad o a tu gerente inmediatamente. Tu seguridad vale más que cualquier venta."
      }
    ],
    whatNotToDo: [
      {
        text: "❌ **Demo on their face**: Alcohol dilates blood vessels and increases skin sensitivity. A reaction is MORE likely, and they'll be too drunk to follow aftercare instructions.",
        textEs: "❌ **Hacer demo en su cara**: El alcohol dilata los vasos sanguíneos y aumenta la sensibilidad de la piel. Una reacción es MÁS probable, y estarán demasiado borrachos para seguir instrucciones de cuidado posterior."
      },
      {
        text: "❌ **Take their credit card**: A drunk person cannot legally consent to a purchase. If they dispute the charge later, you'll lose. Every time.",
        textEs: "❌ **Tomar su tarjeta de crédito**: Una persona borracha no puede consentir legalmente una compra. Si disputan el cargo después, perderás. Siempre."
      },
      {
        text: "❌ **Laugh along or encourage them**: Professionalism is your shield. If you're seen mocking a drunk tourist, other tourists will avoid you.",
        textEs: "❌ **Reírte o alentarlos**: El profesionalismo es tu escudo. Si te ven burlándote de un turista borracho, otros turistas te evitarán."
      },
      {
        text: "❌ **Get cornered**: Always position yourself near an exit or where colleagues can see you. Never let a drunk person block your escape route.",
        textEs: "❌ **Dejarte acorralar**: Siempre posiciónate cerca de una salida o donde tus colegas puedan verte. Nunca dejes que un borracho bloquee tu ruta de escape."
      }
    ],
    scripts: [
      {
        label: "Gentle Deflection (Happy-Drunk)",
        labelEs: "Desvío Gentil (Alegre-Borracho)",
        text: "YOU: \"You are clearly having the BEST day in Gibraltar! I love that energy! But here's the thing — this product works even better on fresh, rested skin. So here's my card. Come find me tomorrow morning, first demo is on me, and I'll show you something amazing when you're 100%. Deal?\"",
        textEs: "TÚ: \"¡Claramente estás teniendo el MEJOR día en Gibraltar! ¡Me encanta esa energía! Pero fíjate — este producto funciona aún mejor en piel fresca y descansada. Entonces aquí está mi tarjeta. Búscame mañana por la mañana, la primera demo va por mi cuenta, y te mostraré algo increíble cuando estés al 100%. ¿Trato?\""
      },
      {
        label: "Firm Boundary (Too Intense)",
        labelEs: "Límite Firme (Demasiado Intenso)",
        text: "YOU: \"I appreciate your enthusiasm, but I need you to take a step back for me, please.\" [Step back yourself] \"For safety reasons, I can't do demos on anyone who's been drinking. But your friend here looks like she's ready for the full experience! Want to try it, love?\" [Pivot to the sober friend]",
        textEs: "TÚ: \"Aprecio tu entusiasmo, pero necesito que des un paso atrás para mí, por favor.\" [Tú también retrocede] \"Por razones de seguridad, no puedo hacer demos en nadie que haya estado bebiendo. ¡Pero tu amiga aquí parece que está lista para la experiencia completa! ¿Quieres probarlo, amor?\" [Gira hacia la amiga sobria]"
      },
      {
        label: "Security Signal (Aggressive)",
        labelEs: "Señal de Seguridad (Agresivo)",
        text: "YOU: \"I cannot help you today. Please step back.\" [Raise hand, make eye contact with nearest security or colleague] \"Marco! Can you give me a hand here?\" [To the friends] \"Please take your friend and move along.\"",
        textEs: "TÚ: \"No puedo ayudarte hoy. Por favor retrocede.\" [Levanta mano, haz contacto visual con seguridad o colega más cercano] \"¡Marco! ¿Me puedes echar una mano aquí?\" [A las amigas] \"Por favor llévense a su amiga y sigan caminando.\""
      },
      {
        label: "The Morning-After Close",
        labelEs: "El Cierre del Día Siguiente",
        text: "YOU: \"Look, I know you want this NOW. But I'm going to do you a favor and say: sleep on it. Come back tomorrow. If you still want it, I'll give you my employee discount. But only if you're sober and fresh. I want you to LOVE this purchase, not regret it.\"",
        textEs: "TÚ: \"Mira, sé que quieres esto AHORA. Pero te voy a hacer un favor y decir: duérmete sobre eso. Regresa mañana. Si todavía lo quieres, te daré mi descuento de empleada. Pero solo si estás sobria y fresca. Quiero que AMES esta compra, no que te arrepientas.\""
      }
    ],
    proTip: {
      text: "💡 **PRO TIP**: Memorize your store's policy on drunk customers. Some stores have a zero-tolerance policy; others are more flexible. KNOW THE RULE. Also, the 'morning-after close' is incredibly effective — drunk people respect honesty, and the promise of a discount tomorrow gives them a reason to return (and buy at full price when they see the demo sober). Most importantly: TRUST YOUR GUT. If someone feels dangerous, they probably are. Walk away.",
      textEs: "💡 **TIP PRO**: Memoriza la política de tu tienda sobre clientes borrachos. Algunas tiendas tienen política de tolerancia cero; otras son más flexibles. CONOCE LA REGLA. Además, el 'cierre del día siguiente' es increíblemente efectivo — los borrachos respetan la honestidad, y la promesa de descuento mañana les da una razón para regresar (y comprar a precio completo cuando ven la demo sobrios). Lo más importante: CONFÍA EN TU INSTINTO. Si alguien se siente peligroso, probablemente lo es. Aléjate."
    }
  },

  // ============================================================
  // S2: The Demo That Failed
  // ============================================================
  {
    id: 'S2',
    categoryId: 'scenarios',
    tier: 1,
    title: "The Demo That Failed",
    titleEs: "La Demo Que Falló",
    subtitle: "Recovering when the product doesn't show instant results",
    subtitleEs: "Recuperándote cuando el producto no muestra resultados instantáneos",
    duration: "5 min",
    icon: "XCircle",
    scenario: {
      text: "You're doing your wrinkle demo on a middle-aged woman from Manchester. 60 seconds pass. She looks in the mirror — the wrinkle is STILL THERE. She hands the mirror back, crosses her arms, and says: \"See? It doesn't work. It's all a con, isn't it?\" Her skepticism just went from 20% to 100%. There's a small crowd watching.",
      textEs: "Estás haciendo tu demo de arrugas en una mujer de mediana edad de Manchester. Pasan 60 segundos. Mira en el espejo — la arruga SIGUE AHÍ. Regresa el espejo, cruza los brazos, y dice: \"¿¿Ves?? No funciona. Todo es una estafa, ¿verdad?\" Su escepticismo acaba de pasar del 20% al 100%. Hay una pequeña multitud observando."
    },
    whatToDo: [
      {
        text: "**STAY CALM**: Your reaction in the next 10 seconds determines everything. If you panic, the crowd sees a scammer. If you stay clinical and curious, you look like a professional diagnosing a situation.",
        textEs: "**MANTÉN LA CALMA**: Tu reacción en los siguientes 10 segundos lo determina todo. Si te panicas, la multitud ve a un estafador. Si te mantienes clínica y curiosa, pareces una profesional diagnosticando una situación."
      },
      {
        text: "**ACKNOWLEDGE HONESTLY**: Don't fake it. Don't pretend you see results that aren't there. Say: \"You're right — I'm not seeing the result I expected either. Let me figure out why.\"",
        textEs: "**RECONOCE CON HONESTIDAD**: No finjas. No pretendas ver resultados que no están ahí. Di: \"Tienes razón — yo tampoco estoy viendo el resultado que esperaba. Déjame averiguar por qué.\""
      },
      {
        text: "**DIAGNOSE OUT LOUD**: Ask about her skincare routine, what she put on this morning (sunscreen is the #1 blocker), how much water she drinks. Turn it into an educational moment for the crowd.",
        textEs: "**DIAGNOSTICA EN VOZ ALTA**: Pregunta sobre su rutina de cuidado de la piel, qué se puso esta mañana (el bloqueador es el bloqueador #1), cuánta agua toma. Conviértelo en un momento educativo para la multitud."
      },
      {
        text: "**RE-PREP THE SKIN**: Clean the area with toner or makeup remover. Reapply with MORE product and MORE pressure. Explain each step to the crowd so they see your technique.",
        textEs: "**VOLVER A PREPARAR LA PIEL**: Limpia el área con tónico o removedor de maquillaje. Reaplica con MÁS producto y MÁS presión. Explica cada paso a la multitud para que vean tu técnica."
      },
      {
        text: "**PIVOT IF NEEDED**: If the second try also fails (rare but possible), pivot to the Dead Sea Scrub or Glycolic Peel — products that work on EVERYONE. \"The syringe needs hydrated skin, but THIS — this works on everyone. Let me show you.\"",
        textEs: "**PIVOTEA SI ES NECESARIO**: Si el segundo intento también falla (raro pero posible), pivotea al Scrub del Mar Muerto o al Peeling Glicólico — productos que funcionan en TODOS. \"La jeringa necesita piel hidratada, pero ESTO — esto funciona en todos. Déjame mostrarte.\""
      }
    ],
    whatNotToDo: [
      {
        text: "❌ **Pretend it worked**: \"Oh, you can't see it but I can!\" — Everyone in the crowd will know you're lying. Credibility = gone forever.",
        textEs: "❌ **Pretender que funcionó**: \"¡Ah, tú no lo puedes ver pero yo sí!\" — Todos en la multitud sabrán que estás mintiendo. Credibilidad = ida para siempre."
      },
      {
        text: "❌ **Blame her skin**: \"Well, your skin is just really damaged...\" — Insulting the customer in front of a crowd guarantees they'll ALL walk away.",
        textEs: "❌ **Culpar su piel**: \"Bueno, tu piel está realmente dañada...\" — Insultar al cliente frente a una multitud garantiza que TODOS se irán."
      },
      {
        text: "❌ **Get defensive**: \"This works on everyone, I don't know why it didn't work on you\" — Sounds like an excuse, not expertise.",
        textEs: "❌ **Ponerte a la defensiva**: \"Esto funciona en todos, no sé por qué no funcionó en ti\" — Suena a excusa, no a experiencia."
      },
      {
        text: "❌ **Walk away or give up**: The crowd is watching. How you handle failure determines whether they trust you. Turn it into a masterclass.",
        textEs: "❌ **Irte o rendirte**: La multitud está observando. Cómo manejas el fracaso determina si confían en ti. Conviértelo en una masterclass."
      }
    ],
    scripts: [
      {
        label: "The Honest Acknowledgment",
        labelEs: "El Reconocimiento Honesto",
        text: "YOU: \"Okay, I see it too — and I'm going to be straight with you. That result isn't what I expected. But here's the thing: this is science, not magic. And science needs the right conditions. Let me ask you — did you put on sunscreen or moisturizer this morning?\" [She says yes] \"That's it. There's a barrier sitting on your skin right now, blocking the product. Let me clean it properly and try again.\"",
        textEs: "TÚ: \"Okay, yo también lo veo — y voy a ser directa contigo. Ese resultado no es lo que esperaba. Pero fíjate: esto es ciencia, no magia. Y la ciencia necesita las condiciones correctas. Déjame preguntarte — ¿te pusiste bloqueador o crema hidratante esta mañana?\" [Dice que sí] \"Eso es. Hay una barrera sentada en tu piel ahora mismo, bloqueando el producto. Déjame limpiarla adecuadamente e intentar de nuevo.\""
      },
      {
        label: "The Educational Pivot",
        labelEs: "El Giro Educativo",
        text: "YOU: \"Look, you're absolutely right to be skeptical. I would be too. But let me show you something.\" [Demo on your own hand] \"See this? Works on me every time. So what we're dealing with here is something really interesting — your skin is so dehydrated that it's drinking the product before it can sit on the surface.\" [To the crowd] \"This is actually a GOOD sign — it means your skin NEEDS this. But it also means we need to prep you first.\"",
        textEs: "TÚ: \"Mira, tienes toda la razón de ser escéptica. Yo también lo sería. Pero déjame mostrarte algo.\" [Demo en tu propia mano] \"¿Ves esto? Me funciona cada vez. Entonces lo que tenemos aquí es algo muy interesante — tu piel está tan deshidratada que se está bebiendo el producto antes de que pueda sentarse en la superficie.\" [A la multitud] \"Esto en realidad es una BUENA señal — significa que tu piel NECESITA esto. Pero también significa que necesitamos prepararte primero.\""
      },
      {
        label: "The Product Switch",
        labelEs: "El Cambio de Producto",
        text: "YOU: \"You know what? The syringe needs your skin to be pre-hydrated, and clearly yours isn't. That's on me — I should have started you with this.\" [Pick up the Dead Sea Scrub] \"This scrub exfoliates the dead skin layer that EVERYONE has. It doesn't need special conditions. It works on oily skin, dry skin, every skin. €35, takes 2 minutes, and you'll feel the difference immediately. Want to try it?\"",
        textEs: "TÚ: \"¿Sabes qué? La jeringa necesita que tu piel esté pre-hidratada, y claramente la tuya no lo está. Eso es culpa mía — debería haberte empezado con esto.\" [Toma el Scrub del Mar Muerto] \"Este scrub exfolia la capa de piel muerta que TODOS tenemos. No necesita condiciones especiales. Funciona en piel grasa, piel seca, toda piel. €35, toma 2 minutos, y sentirás la diferencia inmediatamente. ¿Quieres probarlo?\""
      },
      {
        label: "The Crowd Recovery",
        labelEs: "La Recuperación de la Multitud",
        text: "YOU: \"Fair enough — that didn't work the way I wanted. But you know what? Anyone can sell when the demo is perfect. The REAL test is what happens when it doesn't go right.\" [To the crowd] \"And THIS is why I love this job — because I just learned something about her skin that will help me serve the next person even better.\" [To the customer] \"Let me make you a promise: come back tomorrow. Let me prep your skin right, and if the demo doesn't blow your mind, I'll give you a free product just for giving me a second chance.\"",
        textEs: "TÚ: \"Justo — eso no funcionó como quería. Pero ¿sabes qué? Cualquiera puede vender cuando la demo es perfecta. La prueba REAL es qué pasa cuando no sale bien.\" [A la multitud] \"Y por ESTO amo mi trabajo — porque acabo de aprender algo sobre su piel que me ayudará a servir a la siguiente persona aún mejor.\" [A la clienta] \"Déjame hacerte una promesa: regresa mañana. Déjame preparar tu piel bien, y si la demo no te vuela la cabeza, te doy un producto gratis solo por darme una segunda oportunidad.\""
      }
    ],
    proTip: {
      text: "💡 **PRO TIP**: The failed demo is your GREATEST opportunity to build trust. When you handle it with honesty and expertise, the crowd respects you MORE than if it had worked perfectly. Why? Because they saw you under pressure, and you stayed professional. Also, always prep skin before the syringe demo — ask about sunscreen/moisturizer, clean the area with toner if needed. Prevention beats recovery 10 times out of 10. And remember: a €35 scrub sale after a failed €140 demo is still a WIN — plus you set up a future syringe sale when their skin is ready.",
      textEs: "💡 **TIP PRO**: La demo fallada es tu MAYOR oportunidad de construir confianza. Cuando la manejas con honestidad y experiencia, la multitud te respeta MÁS que si hubiera funcionado perfectamente. ¿Por qué? Porque te vieron bajo presión, y te mantuviste profesional. Además, siempre prepara la piel antes de la demo de jeringa — pregunta sobre bloqueador/crema hidratante, limpia el área con tónico si es necesario. La prevención vence a la recuperación 10 de cada 10 veces. Y recuerda: una venta de €35 de scrub después de una demo fallida de €140 sigue siendo una VICTORIA — además preparas una futura venta de jeringa cuando su piel esté lista."
    }
  },

  // ============================================================
  // S3: Hen Party / Group of Friends
  // ============================================================
  {
    id: 'S3',
    categoryId: 'scenarios',
    tier: 2,
    title: "Hen Party / Group of Friends",
    titleEs: "Despedida de Soltera / Grupo de Amigas",
    subtitle: "Managing multiple personalities and closing group sales",
    subtitleEs: "Manejando múltiples personalidades y cerrando ventas grupales",
    duration: "5 min",
    icon: "PartyPopper",
    scenario: {
      text: "A group of 6 women in matching \"BRIDE SQUAD\" t-shirts descends on your spot. They're loud, excited, half of them are already tipsy. The bride-to-be is the quietest one. One woman — the loud one with the glasses — appoints herself spokesperson and says \"DO ALL OF US!\" They want simultaneous demos. They're taking selfies. They're talking over each other. This chaos is either your biggest sale of the day or a complete waste of time.",
      textEs: "Un grupo de 6 mujeres con playeras iguales de \"BRIDE SQUAD\" desciende sobre tu puesto. Son ruidosas, emocionadas, la mitad ya están alegres. La novia es la más callada. Una mujer — la ruidosa con lentes — se nombra vocera y dice \"¡HÁZNOS A TODAS!\" Quieren demos simultáneas. Se están tomando selfies. Se hablan unas encima de otras. Este caos es o tu venta más grande del día o una completa pérdida de tiempo."
    },
    whatToDo: [
      {
        text: "**IDENTIFY THE ALPHA**: In every group, there's one woman the others look to for approval. It's usually the loudest one OR the bride. Win her, and the group follows. Ignore her, and she'll kill every sale.",
        textEs: "**IDENTIFICA A LA ALFA**: En cada grupo, hay una mujer a quien las demás miran para aprobación. Usualmente es la más ruidosa O la novia. Gánala, y el grupo sigue. Ignórala, y ella matará cada venta."
      },
      {
        text: "**CONTROL THE ENERGY**: Raise your voice slightly to match theirs — not in aggression, but in excitement. \"OKAY LADIES! I can do ALL of you, but ONE at a time so everyone gets the FULL effect!\" Groups respect someone who takes charge.",
        textEs: "**CONTROLA LA ENERGÍA**: Sube un poco tu voz para igualar la de ellas — no en agresión, sino en emoción. \"¡OKAY CHICAS! ¡Puedo hacerlas a TODAS, pero UNA a la vez para que todas vean el efecto COMPLETO!\" Los grupos respetan a alguien que toma el control."
      },
      {
        text: "**MAKE IT A SHOW**: Groups LOVE entertainment. Do the first demo on the alpha or the bride. Narrate EVERYTHING: \"Watch this, 60 seconds, count with me!\" Get the group counting down. The energy becomes contagious.",
        textEs: "**HAZLO UN ESPECTÁCULO**: A los grupos LES ENCANTA el entretenimiento. Haz la primera demo en la alfa o la novia. Narra TODO: \"¡Miren esto, 60 segundos, cuenten conmigo!\" Haz que el grupo cuente hacia atrás. La energía se vuelve contagiosa."
      },
      {
        text: "**CREATE A GROUP DEAL**: Offer a small discount for 3+ units, or throw in free samples for the group. \"Okay, since it's Sarah's last weekend as a free woman — anyone who buys today gets a free scrub sample AND I'll give the bride a full-size product as my gift!\"",
        textEs: "**CREA UNA OFERTA GRUPAL**: Ofrece un pequeño descuento por 3+ unidades, o da muestras gratis para el grupo. \"Okay, ya que es el último fin de semana de Sarah como mujer libre — ¡cualquiera que compre hoy recibe una muestra gratis de scrub Y le doy a la novia un producto de tamaño completo como mi regalo!\""
      },
      {
        text: "**CAPTURE CONTENT**: Ask to film/take photos of the reactions. \"Can I get a video of everyone's reaction? This is GOLD!\" They'll share it on social media, tag your location, and bring more tourists to you.",
        textEs: "**CAPTURA CONTENIDO**: Pide filmar/tomar fotos de las reacciones. \"¿Puedo grabar la reacción de todas? ¡Esto es ORO!\" Lo compartirán en redes sociales, etiquetarán tu ubicación, y traerán más turistas a ti."
      }
    ],
    whatNotToDo: [
      {
        text: "❌ **Try to demo everyone at once**: You'll do a rushed, terrible job on all of them. One great demo beats six bad ones.",
        textEs: "❌ **Tratar de hacer demo a todas a la vez**: Harás un trabajo apresurado y terrible en todas. Una gran demo vence a seis malas."
      },
      {
        text: "❌ **Ignore the quiet ones**: The shy friend in the back might be the one with the most money and the strongest desire to buy.",
        textEs: "❌ **Ignorar a las calladas**: La amiga tímida de atrás podría ser la que tiene más dinero y el deseo más fuerte de comprar."
      },
      {
        text: "❌ **Be boring**: If you treat a hen party like a serious consultation, they'll lose interest in 30 seconds. Match their FUN energy.",
        textEs: "❌ **Ser aburrida**: Si tratas una despedida de soltera como una consulta seria, perderán interés en 30 segundos. Iguala su energía DIVERTIDA."
      },
      {
        text: "❌ **Let one person kill the vibe**: If one woman is negative, isolate her. \"You don't have to try it, but let your friends experience it!\" Don't argue with her.",
        textEs: "❌ **Dejar que una persona mate el ambiente**: Si una mujer es negativa, aísala. \"¡Tú no tienes que probarlo, pero deja que tus amigas lo experimenten!\" No discutas con ella."
      }
    ],
    scripts: [
      {
        label: "The Group Takeover",
        labelEs: "La Toma del Grupo",
        text: "YOU: \"OKAY BRIDE SQUAD! Listen up! I am going to make EVERY ONE of you look 10 years younger for the wedding photos. BUT — I'm doing this one at a time so each of you gets the VIP treatment. Who's first? Sarah? PERFECT. Everyone gather 'round and watch what happens to the bride!\"",
        textEs: "TÚ: \"¡OKAY BRIDE SQUAD! ¡Escuchen! Voy a hacer que CADA UNA de ustedes se vea 10 años más joven para las fotos de la boda. PERO — lo haré una a la vez para que cada una reciba el tratamiento VIP. ¿Quién primero? ¿Sarah? PERFECTO. ¡Todas júntense y miren lo que le pasa a la novia!\""
      },
      {
        label: "The Countdown",
        labelEs: "La Cuenta Regresiva",
        text: "YOU: \"Alright ladies — I need everyone counting with me! 60 seconds on the clock. When I say GO, we all count down together. Ready? THREE... TWO... ONE... GO!\" [Group counts] \"Fifty! Forty-five!...\" Build the energy. When the result hits: \"STOP! Sarah, look in the mirror!\" [Group gasps] \"THAT'S what we're doing here, ladies! Who's NEXT?!\"",
        textEs: "TÚ: \"¡Okay chicas — necesito que TODAS cuenten conmigo! 60 segundos en el reloj. Cuando diga YA, todas contamos juntas. ¿Listas? ¡TRES... DOS... UNO... YA!\" [El grupo cuenta] \"¡Cincuenta! ¡Cuarenta y cinco!...\" Construye la energía. Cuando el resultado llega: \"¡ALTO! ¡Sarah, mira en el espejo!\" [El grupo jadea] \"¡ESO es lo que estamos haciendo aquí, chicas! ¿¿Quién SIGUE??!\""
      },
      {
        label: "The Group Deal Close",
        labelEs: "El Cierre de Oferta Grupal",
        text: "YOU: \"Okay, since you ladies are literally the most fun group I've had all week — here's what I'm doing. One syringe is €140. Two is still €140 each. But THREE or more? €120 each. And the bride gets a free Dead Sea Scrub from me as a wedding gift. Who's in?\" [Hands go up] \"AMAZING! Let's get you all sorted!\"",
        textEs: "TÚ: \"Okay, ya que ustedes son literalmente el grupo más divertido que he tenido toda la semana — esto es lo que haré. Una jeringa es €140. Dos sigue siendo €140 cada una. Pero ¿¿TRES o más?? €120 cada una. Y la novia recibe un Scrub del Mar Muerto gratis de mi parte como regalo de bodas. ¿Quién se apunta?\" [Manos se levantan] \"¡INCREÍBLE! ¡Vamos a atenderlas a todas!\""
      },
      {
        label: "Handling the Party Pooper",
        labelEs: "Manejando a la Agua Fiestas",
        text: "YOU: \"Totally fine if it's not for you, love! But let your friends enjoy it — look at Sarah's face, she's glowing! Here, take a free sample so you can try it in your own time. No pressure at all.\" [Hand sample, turn back to the group] \"Okay, who wants to see the nail kit?!\"",
        textEs: "TÚ: \"¡Totalmente bien si no es para ti, amor! Pero deja que tus amigas lo disfruten — ¡mira la cara de Sarah, está radiante! Toma, una muestra gratis para que lo pruebes a tu tiempo. Ninguna presión.\" [Entrega muestra, vuelve al grupo] \"¡Okay, quién quiere ver el kit de uñas?!\""
      }
    ],
    proTip: {
      text: "💡 **PRO TIP**: Hen parties are BULK SALE GOLD. The average group buys 2-3 syringes plus multiple smaller items. But the real money is in REFERRALS. Every woman at that hen party has a wedding coming up, a birthday, a mother who wants skincare. Give each one your card. Say: \"If you send me a friend who buys, I'll give you a free product next time you're in Gibraltar.\" Suddenly your one sale becomes ten. Also, film everything. Group reaction videos are your best marketing content — get permission, post on your personal socials with location tags, and watch the tourists come to YOU.",
      textEs: "💡 **TIP PRO**: Las despedidas de soltera son ORO DE VENTA EN GRANEL. El grupo promedio compra 2-3 jeringas más varios artículos pequeños. Pero el dinero real está en las REFERENCIAS. Cada mujer en esa despedida tiene una boda próxima, un cumpleaños, una madre que quiere skincare. Dale a cada una tu tarjeta. Di: \"Si me mandas una amiga que compre, te doy un producto gratis la próxima vez que estés en Gibraltar.\" De repente tu una venta se convierte en diez. Además, filma todo. Los videos de reacciones grupales son tu mejor contenido de marketing — obtén permiso, publica en tus redes personales con etiquetas de ubicación, y mira cómo los turistas vienen a TI."
    }
  },

  // ============================================================
  // S4: Competitor Poaching Your Customer
  // ============================================================
  {
    id: 'S4',
    categoryId: 'scenarios',
    tier: 2,
    title: "Competitor Poaching Your Customer",
    titleEs: "Competidor Robando Tu Cliente",
    subtitle: "Retaining your customer when another seller interrupts",
    subtitleEs: "Reteniendo a tu cliente cuando otro vendedor interrumpe",
    duration: "4 min",
    icon: "Sword",
    scenario: {
      text: "You're mid-demo with a French tourist. She's engaged, asking questions, clearly interested. Suddenly another street seller — from a competing cosmetics brand — approaches from behind and says: \"Madam, don't buy from them. Our product is cheaper and better. Come, let me show you.\" He hands her a flyer. She looks confused and starts to turn toward him.",
      textEs: "Estás a mitad de demo con una turista francesa. Está comprometida, haciendo preguntas, claramente interesada. De repente otro vendedor callejero — de una marca competidora — se acerca por detrás y dice: \"Señora, no compre de ellos. Nuestro producto es más barato y mejor. Venga, déjeme mostrarle.\" Le entrega un flyer. Ella se ve confundida y empieza a girar hacia él."
    },
    whatToDo: [
      {
        text: "**DON'T PANIC**: This happens. Getting territorial or aggressive looks desperate and unprofessional. Stay calm.",
        textEs: "**NO TE PÁNIQUES**: Esto pasa. Ponerte territorial o agresivo se ve desesperado y poco profesional. Mantén la calma."
      },
      {
        text: "**PHYSICAL ANCHORING**: Stay physically close to your customer. Keep eye contact with HER, not the competitor. Your connection with the customer is your strongest weapon.",
        textEs: "**ANCLAJE FÍSICO**: Mantente físicamente cerca de tu cliente. Mantén contacto visual con ELLA, no con el competidor. Tu conexión con el cliente es tu arma más fuerte."
      },
      {
        text: "**ACKNOWLEDGE WITH CLASS**: Don't ignore the competitor — that looks weak. Address it directly and confidently: \"There's always someone selling something on the street.\" Then refocus on your customer.",
        textEs: "**RECONOCE CON CLASE**: No ignores al competidor — eso se ve débil. Enfréntalo directa y confidentemente: \"Siempre hay alguien vendiendo algo en la calle.\" Luego reenfócate en tu cliente."
      },
      {
        text: "**USE THE INTERRUPTION AS PROOF**: \"See? Everyone wants your attention out here. The difference is — I've already shown you results on your own face. He's just got words and a flyer.\"",
        textEs: "**USA LA INTERRUPCIÓN COMO PRUEBA**: \"¿Ves? Todos quieren tu atención aquí afuera. La diferencia es — yo ya te mostré resultados en tu propia cara. Él solo tiene palabras y un flyer.\""
      },
      {
        text: "**INVITE COMPARISON — ON YOUR TERMS**: If the customer seems torn, invite the comparison directly but frame it around YOUR strength: \"Go ahead, listen to what he says. But ask him to show you results on your face like I just did. If his works better, buy his. Fair?\"",
        textEs: "**INVITA A COMPARAR — EN TUS TÉRMINOS**: Si el cliente parece indeciso, invita la comparación directamente pero enmarca alrededor de TU fortaleza: \"Adelante, escucha lo que dice. Pero pídele que te muestre resultados en tu cara como acabo de hacer yo. Si el de él funciona mejor, cómprale. ¿Justo?\""
      }
    ],
    whatNotToDo: [
      {
        text: "❌ **Trash the competitor**: \"Their product is garbage!\" — This makes YOU look insecure. Let your demo do the talking.",
        textEs: "❌ **Hablar mal del competidor**: \"¡Su producto es basura!\" — Esto te hace verte inseguro. Deja que tu demo hable."
      },
      {
        text: "❌ **Get territorial**: Physically blocking the competitor or raising your voice creates a scene. Tourists HATE scenes.",
        textEs: "❌ **Ponerte territorial**: Bloquear físicamente al competidor o subir la voz crea un escándalo. A los turistas LES HORRORAN los escándalos."
      },
      {
        text: "❌ **Beg the customer**: \"Please don't go, I'll give you a discount\" — Desperation drives people away.",
        textEs: "❌ **Rogar al cliente**: \"Por favor no te vayas, te doy descuento\" — La desesperación ahuyenta a la gente."
      },
      {
        text: "❌ **Ignore the competitor completely**: The customer is now comparing. If you pretend he doesn't exist, you're ignoring the elephant in the room.",
        textEs: "❌ **Ignorar al competidor por completo**: El cliente ahora está comparando. Si pretendes que no existe, estás ignorando al elefante en la habitación."
      }
    ],
    scripts: [
      {
        label: "The Confident Dismissal",
        labelEs: "El Descarte Confidente",
        text: "YOU: \"Happens all the time out here.\" [Don't even look at the competitor, keep eyes on your customer] \"Look, he's got flyers and promises. I've got your actual face showing actual results. You tell me — which one matters more?\"",
        textEs: "TÚ: \"Pasa todo el tiempo aquí afuera.\" [Ni siquiera mires al competidor, mantén ojos en tu cliente] \"Mira, él tiene flyers y promesas. Yo tengo tu cara real mostrando resultados reales. Tú dime — ¿cuál importa más?\""
      },
      {
        label: "The Invitation to Compare",
        labelEs: "La Invitación a Comparar",
        text: "YOU: \"Go ahead, hear him out. I encourage it! But here's my challenge: ask him to demo on your face, right now, with the same results you just saw. If he can do it, I'll personally walk you to his counter.\" [Smile] \"But we both know he can't. So — shall we finish what we started?\"",
        textEs: "TÚ: \"Adelante, escúchalo. ¡Lo aliento! Pero aquí está mi reto: pídele que haga demo en tu cara, ahora mismo, con los mismos resultados que acabas de ver. Si puede hacerlo, personalmente te acompaño a su mostrador.\" [Sonríe] \"Pero ambos sabemos que no puede. Entonces — ¿terminamos lo que empezamos?\""
      },
      {
        label: "The Social Proof Lock",
        labelEs: "El Cierre de Prueba Social",
        text: "YOU: \"You know what? Three people bought from me in the last hour. Zero people walked away after seeing their own results. I'm not worried about the competition — because I just proved it works on YOU. That's not marketing, that's physics. Ready to wrap this up?\"",
        textEs: "TÚ: \"¿Sabes qué? Tres personas compraron de mí en la última hora. Cero personas se fueron después de ver sus propios resultados. No me preocupa la competencia — porque acabo de probar que funciona en TI. Eso no es marketing, eso es física. ¿Lista para cerrar esto?\""
      },
      {
        label: "The Deflection with Humor",
        labelEs: "La Desviación con Humor",
        text: "YOU: \"Sir, I appreciate your hustle, but I'm in the middle of making this beautiful lady even more beautiful.\" [To the customer, wink] \"See? Everyone wants a piece of you today. Must be your lucky day in Gibraltar. Now — do we get you the full set or start with the syringe?\"",
        textEs: "TÚ: \"Señor, aprecio su esfuerzo, pero estoy en medio de hacer a esta hermosa dama aún más hermosa.\" [A la clienta, guiño] \"¿Ves? Todos quieren un pedazo de ti hoy. Debe ser tu día de suerte en Gibraltar. Ahora — ¿te damos el set completo o empezamos con la jeringa?\""
      }
    ],
    proTip: {
      text: "💡 **PRO TIP**: The best defense against competitors is a demo SO good that the customer is already sold before anyone can interrupt. Speed matters on the street. Get to the face demo FAST — within the first 90 seconds of engagement. A customer who's already seen their wrinkle disappear is almost impossible to poach. Also, build rapport quickly. Use their name, compliment something specific, make a personal connection. People don't switch sellers when they feel a genuine connection. The competitor has a flyer; you have a relationship. Relationships win.",
      textEs: "💡 **TIP PRO**: La mejor defensa contra competidores es una demo TAN buena que el cliente ya esté vendido antes de que nadie pueda interrumpir. La velocidad importa en la calle. Llega a la demo facial RÁPIDO — dentro de los primeros 90 segundos de interacción. Un cliente que ya vio su arruga desaparecer es casi imposible de robar. Además, construye rapport rápidamente. Usa su nombre, complimenta algo específico, haz una conexión personal. La gente no cambia de vendedor cuando siente una conexión genuina. El competidor tiene un flyer; tú tienes una relación. Las relaciones ganan."
    }
  },

  // ============================================================
  // S5: The Silent Close
  // ============================================================
  {
    id: 'S5',
    categoryId: 'scenarios',
    tier: 3,
    title: "The Silent Close",
    titleEs: "El Cierre Silencioso",
    subtitle: "Reading non-verbal buying signals and closing without words",
    subtitleEs: "Leyendo señales de compra no verbales y cerrando sin palabras",
    duration: "4 min",
    icon: "Eye",
    scenario: {
      text: "A Japanese tourist watches your entire demo. She doesn't say a word. She watches the product application, watches the 60-second wait, takes the mirror, examines her face carefully... and says nothing. No \"wow,\" no \"amazing,\" no reaction at all. She hands the mirror back, touches her face gently, and looks at the product box. Then back at you. Still silent. What do you do?",
      textEs: "Una turista japonesa observa toda tu demo. No dice una palabra. Observa la aplicación del producto, observa la espera de 60 segundos, toma el espejo, examina su cuidadosamente... y no dice nada. Ningún \"wow,\" ningún \"increíble,\" ninguna reacción en absoluto. Regresa el espejo, toca su cara suavemente, y mira la caja del producto. Luego a ti. Sigues en silencio. ¿¿Qué haces??"
    },
    whatToDo: [
      {
        text: "**READ THE BODY LANGUAGE**: Silence is NOT rejection. Watch for these BUYING signals: touching the treated area repeatedly, looking at the product packaging, holding onto the mirror, prolonged eye contact, a slight smile or nod.",
        textEs: "**LEE EL LENGUAJE CORPORAL**: El silencio NO es rechazo. Observa estas señales de COMPRA: tocar el área tratada repetidamente, mirar el empaque del producto, sostener el espejo, contacto visual prolongado, una ligera sonrisa o asentimiento."
      },
      {
        text: "**MATCH THEIR ENERGY**: If they're quiet, be quiet too. Lower your voice. Speak slowly. Some cultures find loud, pushy salespeople offensive. A soft approach builds trust with reserved customers.",
        textEs: "**IGUALA SU ENERGÍA**: Si son callados, sé callada tú también. Baja tu voz. Habla despacio. Algunas culturas encuentran ofensivos a los vendedores ruidosos y agresivos. Un acercamiento suave construye confianza con clientes reservados."
      },
      {
        text: "**USE NON-VERBAL CLOSING**: Hand them the product box. Hold it out silently with a gentle smile. Let them take it. This is called the \"silent close\" — and it works incredibly well with quiet buyers.",
        textEs: "**USA EL CIERRE NO VERBAL**: Entrégale la caja del producto. Sostenla en silencio con una sonrisa gentil. Déjala tomarla. Esto se llama el \"cierre silencioso\" — y funciona increíblemente bien con compradores callados."
      },
      {
        text: "**ASK A YES/NO QUESTION**: Don't ask open-ended questions that require explanation. Ask: \"Shall I wrap one up for you?\" or \"Would you like to take this home?\" Simple, direct, requiring only a nod or shake.",
        textEs: "**HAZ UNA PREGUNTA SÍ/NO**: No hagas preguntas abiertas que requieran explicación. Pregunta: \"¿Te envuelvo uno?\" o \"¿Te gustaría llevarte esto a casa?\" Simple, directo, requiriendo solo un asentimiento o negación."
      },
      {
        text: "**DON'T FILL THE SILENCE**: The biggest mistake salespeople make is talking too much when the customer is quiet. Silence means they're THINKING. Let them think. Comfortable silence is a powerful closing tool.",
        textEs: "**NO LLENES EL SILENCIO**: El error más grande que cometen los vendedores es hablar demasiado cuando el cliente está callado. El silencio significa que están PENSANDO. Déjalos pensar. El silencio cómodo es una herramienta de cierre poderosa."
      }
    ],
    whatNotToDo: [
      {
        text: "❌ **Talk more to fill the silence**: Nervous chatter breaks the spell. If she's thinking, let her think.",
        textEs: "❌ **Hablar más para llenar el silencio**: La charla nerviosa rompe el hechizo. Si está pensando, déjala pensar."
      },
      {
        text: "❌ **Ask \"So what do you think?\"**: This puts pressure on her to evaluate publicly. Some people hate being put on the spot.",
        textEs: "❌ **Preguntar \"Entonces, ¿qué piensas?\"**: Esto le presiona a evaluar públicamente. Algunas personas odian ser puestas en el centro de atención."
      },
      {
        text: "❌ **Get louder or more energetic**: If she's quiet, your loudness feels aggressive and will push her away.",
        textEs: "❌ **Ponerte más ruidosa o enérgica**: Si es callada, tu ruidosidad se siente agresiva y la alejará."
      },
      {
        text: "❌ **Assume she's not interested**: Silence + touching the treated area + examining the product = INTERESTED. She's just processing differently.",
        textEs: "❌ **Asumir que no le interesa**: Silencio + tocar el área tratada + examinar el producto = INTERESADA. Solo está procesando diferente."
      }
    ],
    scripts: [
      {
        label: "The Silent Hand-Off",
        labelEs: "La Entrega Silenciosa",
        text: "YOU: \"\" [No words. Just gently place the product box in her hands. Make soft eye contact. Smile. Wait. If she holds it for more than 3 seconds, she's buying. Pull out the bag and start wrapping.]",
        textEs: "TÚ: \"\" [Sin palabras. Solo coloca suavemente la caja del producto en sus manos. Haz contacto visual suave. Sonríe. Espera. Si la sostiene por más de 3 segundos, está comprando. Saca la bolsa y empieza a envolver.]"
      },
      {
        label: "The Gentle Question",
        labelEs: "La Pregunta Gentil",
        text: "YOU: \"\" [Soft voice, almost a whisper] \"Shall I prepare one for you?\" [Pause. Nod slowly while maintaining eye contact. This non-verbal encouragement works wonders.]",
        textEs: "TÚ: \"\" [Voz suave, casi un susurro] \"¿Te preparo uno?\" [Pausa. Asiente lentamente manteniendo contacto visual. Este aliento no verbal hace maravillas.]"
      },
      {
        label: "The Cultural Bridge",
        labelEs: "El Puente Cultural",
        text: "YOU: \"I can see you're thinking. That's good — it's a smart decision. Take your time.\" [Step back slightly, giving space] \"When you're ready, I'm here. No rush at all.\" [This respects the processing time that many East Asian cultures prefer.]",
        textEs: "TÚ: \"Puedo ver que estás pensando. Eso es bueno — es una decisión inteligente. Tómate tu tiempo.\" [Retrocede ligeramente, dando espacio] \"Cuando estés lista, estoy aquí. Ninguna prisa.\" [Esto respeta el tiempo de procesamiento que muchas culturas de Asia Oriental prefieren.]"
      },
      {
        label: "The Assisted Decision",
        labelEs: "La Decisión Asistida",
        text: "YOU: \"You have beautiful skin — this will keep it that way for years.\" [Pause, let that sink in] \"One is €140. Two for yourself and a gift is €260.\" [Present both options. Don't push. Just present. Wait.]",
        textEs: "TÚ: \"Tienes piel hermosa — esto la mantendrá así por años.\" [Pausa, deja que eso se asiente] \"Uno es €140. Dos para ti y uno de regalo es €260.\" [Presenta ambas opciones. No empujes. Solo presenta. Espera.]"
      }
    ],
    proTip: {
      text: "💡 **PRO TIP**: Learn to identify cultural communication styles. Japanese, Korean, and many Northern European customers often process purchases silently. They need SPACE and TIME. Mediterranean, Latin American, and American customers typically want energy, conversation, and interaction. The same approach doesn't work for everyone. The silent close is one of the most underutilized techniques in street sales. Master it, and you'll convert a whole category of buyers that other sellers drive away with too much talking. The 3-second rule: if they hold the product for 3+ seconds without handing it back, start bagging.",
      textEs: "💡 **TIP PRO**: Aprende a identificar estilos de comunicación culturales. Clientes japoneses, coreanos, y muchos del norte de Europa a menudo procesan compras en silencio. Necesitan ESPACIO y TIEMPO. Clientes mediterráneos, latinoamericanos, y estadounidenses típicamente quieren energía, conversación, e interacción. El mismo acercamiento no funciona para todos. El cierre silencioso es una de las técnicas más subutilizadas en ventas callejeras. Domínala, y convertirás toda una categoría de compradores que otros vendedores ahuyentan hablando demasiado. La regla de los 3 segundos: si sostienen el producto por 3+ segundos sin regresarlo, empieza a empacar."
    }
  },

  // ============================================================
  // S6: Cruise Ship Passengers
  // ============================================================
  {
    id: 'S6',
    categoryId: 'scenarios',
    tier: 3,
    title: "Cruise Ship Passengers",
    titleEs: "Pasajeros de Crucero",
    subtitle: "Closing fast with time-pressured, multilingual tourists",
    subtitleEs: "Cerrando rápido con turistas multilingües bajo presión de tiempo",
    duration: "4 min",
    icon: "Ship",
    scenario: {
      text: "A group of cruise ship passengers spills into Gibraltar's Main Street. They have exactly 3.5 hours before \"all aboard.\" They're from three different countries — one couple speaks minimal English, another is arguing about directions back to the port, and a third is snapping photos of everything. You spot a woman in her 50s with visible forehead lines examining a shop window near your spot. She has MONEY (designer bag, cruise lanyard) and TIME PRESSURE. How do you hook her in 10 seconds and close in 3 minutes?",
      textEs: "Un grupo de pasajeros de crucero se derrama por Main Street de Gibraltar. Tienen exactamente 3.5 horas antes del \"abordaje.\" Son de tres países distintos — una pareja habla inglés mínimo, otra está discutiendo sobre direcciones de regreso al puerto, y una tercera está tomando fotos de todo. Identificas a una mujer en sus 50s con líneas visibles en la frente examinando una vitrina cerca de tu puesto. Tiene DINERO (bolsa de diseñador, lanyard de crucero) y PRESIÓN DE TIEMPO. ¿Cómo la enganchas en 10 segundos y cierras en 3 minutos?"
    },
    whatToDo: [
      {
        text: "**HOOK IN 5 SECONDS**: Cruise passengers are in sensory overload. Your opener must be IMMEDIATE and VISUAL. Hold up the syringe: \"Ma'am! 60 seconds to look 10 years younger — want to try?\" Movement + direct question stops them.",
        textEs: "**ENGANCH EN 5 SEGUNDOS**: Los pasajeros de crucero están en sobrecarga sensorial. Tu apertura debe ser INMEDIATA y VISUAL. Levanta la jeringa: \"¡Señora! 60 segundos para verse 10 años más joven — ¿quiere probar?\" Movimiento + pregunta directa los detiene."
      },
      {
        text: "**MENTION THE TAX-FREE ADVANTAGE IMMEDIATELY**: Cruise passengers are PRIMED to shop tax-free. \"Gibraltar is tax-free — you're already saving 20% compared to home.\" This creates instant value context.",
        textEs: "**MENCIONA LA VENTAJA LIBRE DE IMPUESTOS INMEDIATAMENTE**: Los pasajeros de crucero están PREPARADOS para comprar libre de impuestos. \"Gibraltar es libre de impuestos — ya está ahorrando 20% comparado con su país.\" Esto crea contexto de valor instantáneo."
      },
      {
        text: "**SPEED-UP THE DEMO**: Normal demo = 3 minutes. Cruise demo = 90 seconds. Skip the long explanation. Apply → count loudly → show result → price → close. \"That's €140 tax-free, we take all cards, I can have you out of here in 2 minutes.\"",
        textEs: "**ACELERA LA DEMO**: Demo normal = 3 minutos. Demo de crucero = 90 segundos. Salta la explicación larga. Aplica → cuenta en voz alta → muestra resultado → precio → cierra. \"Son €140 libres de impuestos, aceptamos todas las tarjetas, puedo tenerla fuera de aquí en 2 minutos.\""
      },
      {
        text: "**USE THE TIME PRESSURE AS URGENCY**: \"Your ship leaves in a few hours — you want to walk back on looking like you just came from a spa, right?\" Frame it as making the MOST of their limited time.",
        textEs: "**USA LA PRESIÓN DE TIEMPO COMO URGENCIA**: \"Su barco sale en unas horas — quiere caminar de regreso viéndose como si viniera de un spa, ¿verdad?\" Enmarca como aprovechar al MÁXIMO su tiempo limitado."
      },
      {
        text: "**GIVE THEM A REASON TO RETURN**: Hand them your card and say \"If you love it, find me on your next stop in Gibraltar. Mention the cruise and I'll give you the friend discount.\" Cruise passengers often do the same route multiple times.",
        textEs: "**DALES UNA RAZÓN PARA REGRESAR**: Dale tu tarjeta y di \"Si le encanta, búqueme en su próxima parada en Gibraltar. Mencione el crucero y le doy el descuento de amiga.\" Los pasajeros de crucero a menudo hacen la misma ruta múltiples veces."
      }
    ],
    whatNotToDo: [
      {
        text: "❌ **Start with a long story**: Cruise passengers don't have time for your life story. Hook → demo → close. 3 minutes max.",
        textEs: "❌ **Empezar con una historia larga**: Los pasajeros de crucero no tienen tiempo para tu historia de vida. Engancha → demo → cierra. 3 minutos máximo."
      },
      {
        text: "❌ **Ask complicated questions**: \"What's your skincare routine?\" takes too long. Assume they're interested and move FAST.",
        textEs: "❌ **Preguntas complicadas**: \"¿Cuál es su rutina de cuidado de la piel?\" toma demasiado tiempo. Asume que están interesados y muévete RÁPIDO."
      },
      {
        text: "❌ **Pressure them about time**: \"Hurry up, your ship is leaving!\" creates panic, not sales. Use time as a positive frame, not a threat.",
        textEs: "❌ **Presionarlos sobre el tiempo**: \"¡Apúrese, su barco se va!\" crea pánico, no ventas. Usa el tiempo como marco positivo, no amenaza."
      },
      {
        text: "❌ **Assume they won't buy because they're 'just looking'**: Cruise passengers are in BUYING MODE. They have money, they're on vacation, and they're primed to spend. Go for the close EVERY time.",
        textEs: "❌ **Asumir que no comprarán porque 'solo miran'**: Los pasajeros de crucero están en MODO DE COMPRA. Tienen dinero, están de vacaciones, y están listos para gastar. Ve por el cierre CADA vez."
      }
    ],
    scripts: [
      {
        label: "The 10-Second Hook",
        labelEs: "El Enganche de 10 Segundos",
        text: "YOU: \"Excuse me! 60 seconds, one wrinkle, completely gone — want to see?\" [Hold up syringe, make eye contact, smile] \"I'm right here, 2 minutes of your time, tax-free Gibraltar prices.\"",
        textEs: "TÚ: \"¡Disculpe! 60 segundos, una arruga, completamente desaparecida — ¿quiere ver?\" [Levanta jeringa, haz contacto visual, sonríe] \"Estoy aquí mismo, 2 minutos de su tiempo, precios libres de impuestos de Gibraltar.\""
      },
      {
        label: "The Speed Demo + Close",
        labelEs: "La Demo Rápida + Cierre",
        text: "YOU: \"Watch this — I'm putting it right here on this line. Now we count to 60. 60, 55, 50...\" [Keep counting, build energy] \"...10, 5, DONE! Look!\" [Hand mirror] \"That line was there a minute ago. Now? Gone. €140, tax-free, I take all cards. Want me to wrap one up before you head back to the ship?\"",
        textEs: "TÚ: \"Mire esto — lo pongo aquí mismo en esta línea. Ahora contamos hasta 60. 60, 55, 50...\" [Sigue contando, construye energía] \"...10, 5, ¡LISTO! ¡Mire!\" [Entrega espejo] \"Esa línea estaba ahí hace un minuto. ¿Ahora? Desaparecida. €140, libre de impuestos, acepto todas las tarjetas. ¿Quiere que le envuelva uno antes de regresar al barco?\""
      },
      {
        label: "The Port Walk-Back Close",
        labelEs: "El Cierre de Regreso al Puerto",
        text: "YOU: \"Picture this: you walk back onto that ship, and your friends go 'WHAT did you do in Gibraltar?!' This is the kind of souvenir that keeps giving — every time you look in the mirror for the next 3 months. €140 tax-free. All cards accepted. 30 seconds and you're done.\"",
        textEs: "TÚ: \"Imagínese esto: camina de regreso a ese barco, y sus amigas dicen '¿¿QUÉ hiciste en Gibraltar??' Esta es el tipo de souvenir que sigue dando — cada vez que se mira en el espejo por los próximos 3 meses. €140 libre de impuestos. Acepto todas las tarjetas. 30 segundos y está lista.\""
      },
      {
        label: "The Multilingual Backup",
        labelEs: "El Respaldo Multilingüe",
        text: "YOU: \"No problem!\" [Use Google Translate voice or gesture] \"Look — 60 seconds, wrinkle gone. €140. Tarjeta? Cash? All okay!\" [Point to your payment terminal, smile warmly. Visual demos transcend language.]",
        textEs: "TÚ: \"¡No hay problema!\" [Usa voz de Google Translate o gestos] \"Mire — 60 segundos, arruga desaparecida. €140. ¿Tarjeta? ¿Efectivo? ¡Todo bien!\" [Señala tu terminal de pago, sonríe cálidamente. Las demos visuales trascienden el idioma.]"
      }
    ],
    proTip: {
      text: "💡 **PRO TIP**: Learn the cruise ship schedules. Know which days the big ships dock and at what time they depart. When a passenger says \"I have to be back by 4 PM,\" you'll know exactly how much time they have and can calibrate your pitch accordingly. Also, the phrase \"souvenir that keeps giving\" is GOLD for cruise passengers — they're sick of buying junk they'll throw away. A premium skincare product that lasts 3 months feels like a SMART vacation purchase, not an impulse buy.",
      textEs: "💡 **TIP PRO**: Aprende los horarios de los cruceros. Sabe qué días atracan los barcos grandes y a qué hora parten. Cuando un pasajero dice \"debo estar de regreso a las 4 PM,\" sabrás exactamente cuánto tiempo tienen y puedes calibrar tu pitch en consecuencia. Además, la frase \"souvenir que sigue dando\" es ORO para pasajeros de crucero — están hartos de comprar basura que van a tirar. Un producto premium de skincare que dura 3 meses se siente como una compra de vacaciones INTELIGENTE, no un impulso."
    }
  },

  // ============================================================
  // S7: Children Interrupting
  // ============================================================
  {
    id: 'S7',
    categoryId: 'scenarios',
    tier: 2,
    title: "Children Interrupting",
    titleEs: "Niños Interrumpiendo",
    subtitle: "Keeping a parent's attention when their child needs it too",
    subtitleEs: "Manteniendo la atención de un padre cuando su hijo también la necesita",
    duration: "4 min",
    icon: "Baby",
    scenario: {
      text: "A mother with a 4-year-old stops for your demo. She's interested — you can see it in her eyes. But the kid is BORED. Two minutes in, the child starts whining, pulling on mom's arm, and then escalates to a full tantrum on the floor. The mother is embarrassed, apologizing, trying to calm the kid AND listen to you at the same time. She's starting to pack up to leave. You haven't closed yet.",
      textEs: "Una madre con un niño de 4 años se detiene para tu demo. Está interesada — se ve en sus ojos. Pero el niño está ABURRIDO. Dos minutos después, el niño empieza a quejarse, jalando el brazo de mamá, y luego escala a un berrinche completo en el piso. La madre está avergonzada, disculpándose, tratando de calmar al niño Y escucharte al mismo tiempo. Está empezando a empacar para irse. Todavía no has cerrado."
    },
    whatToDo: [
      {
        text: "**ACKNOWLEDGE THE KID FIRST**: The child is the real decision-maker here. Get down to their level. Smile. Offer them something — a sample packet, a sticker, your phone calculator to play with. A busy child = a calm parent.",
        textEs: "**RECONOCE AL NIÑO PRIMERO**: El niño es el verdadero tomador de decisiones aquí. Agáchate a su nivel. Sonríe. Ofrecele algo — un paquetito de muestra, una calcomanía, tu calculadora de celular para jugar. Un niño ocupado = un padre tranquilo."
      },
      {
        text: "**SPEED UP YOUR PITCH**: You have HALF the normal time. Get to the demo result ASAP. The parent's attention is split — every second counts.",
        textEs: "**ACELERA TU PITCH**: Tienes la MITAD del tiempo normal. Llega al resultado de la demo ASAP. La atención del padre está dividida — cada segundo cuenta."
      },
      {
        text: "**INVOLVE THE CHILD IN THE PROCESS**: \"Hey buddy, want to help me count to 60? Ready? 60, 59...\" Kids love being helpers. A child counting with you is a child not crying.",
        textEs: "**INVOLUCRA AL NIÑO EN EL PROCESO**: \"Oye amiguito, ¿quieres ayudarme a contar hasta 60? ¿Listo? 60, 59...\" A los niños les encanta ser ayudantes. Un niño contando contigo es un niño que no llora."
      },
      {
        text: "**CREATE A KID-FRIENDLY ZONE**: If your store setup allows, have coloring pages, a small toy, or a tablet available. Even 5 minutes of distraction buys you the time to close.",
        textEs: "**CREA UNA ZONA AMIGABLE PARA NIÑOS**: Si tu configuración de tienda lo permite, ten páginas para colorear, un juguete pequeño, o una tablet disponible. Incluso 5 minutos de distracción te compran el tiempo para cerrar."
      },
      {
        text: "**OFFER TO HOLD THE PRODUCT**: \"Look, I know this is a lot with the little one. Let me hold this for you with your name on it. Come back when he's calmed down, or I can have it ready for you to grab and go.\" This respects her situation AND secures the sale.",
        textEs: "**OFRECE GUARDAR EL PRODUCTO**: \"Mira, sé que es mucho con el pequeño. Déjame guardarte esto con tu nombre. Regresa cuando se haya calmado, o puedo tenerlo listo para que agarres y te vayas.\" Esto respeta su situación Y asegura la venta."
      }
    ],
    whatNotToDo: [
      {
        text: "❌ **Ignore the child**: Pretending the kid isn't there makes the parent feel worse and the child act out MORE for attention.",
        textEs: "❌ **Ignorar al niño**: Pretender que el niño no está ahí hace que el padre se sienta peor y el niño actúe MÁS por atención."
      },
      {
        text: "❌ **Tell the parent to \"control their kid\"**: Even as a joke, this is the fastest way to lose a sale and get a bad review.",
        textEs: "❌ **Decirle al padre que \"controle a su niño\"**: Incluso como broma, es la forma más rápida de perder una venta y obtener una mala reseña."
      },
      {
        text: "❌ **Keep talking over the tantrum**: The parent can't hear you AND can't think. Pause. Address the child. Resume when things calm.",
        textEs: "❌ **Seguir hablando sobre el berrinche**: El padre no puede escucharte NI pensar. Pausa. Atiende al niño. Reanuda cuando se calmen."
      },
      {
        text: "❌ **Let them walk away without a plan**: \"Come back later\" without a hold or contact info = lost sale. Always give them a reason and a way to return.",
        textEs: "❌ **Dejarlos irse sin un plan**: \"Regresa después\" sin guardar el producto o dar información de contacto = venta perdida. Siempre dales una razón y una forma de regresar."
      }
    ],
    scripts: [
      {
        label: "The Kid Inclusion",
        labelEs: "La Inclusión del Niño",
        text: "YOU: \"Hey little one! Want to be my assistant today?\" [Get on their level] \"Your job is to hold this —\" [hand them the product box] \"— and when I say GO, you help me count. Can you count to 60?\" [They nod or say yes] \"PERFECT! Okay, GO! 60, 59, 58...\" [Parent is now watching peacefully, grateful you handled it]",
        textEs: "TÚ: \"¡Oye pequeño! ¿Quieres ser mi ayudante hoy?\" [Agáchate a su nivel] \"Tu trabajo es sostener esto —\" [dale la caja del producto] \"— y cuando diga YA, me ayudas a contar. ¿Puedes contar hasta 60?\" [Asiente o dice que sí] \"¡PERFECTO! Okay, ¡YA! 60, 59, 58...\" [El padre ahora observa en paz, agradecido de que lo manejaste]"
      },
      {
        label: "The Quick Close for Busy Parents",
        labelEs: "El Cierre Rápido para Padres Ocupados",
        text: "YOU: \"I know you've got your hands full. So here's what I'll do: I'll give you the 30-second version.\" [Do a fast, effective demo] \"See that? €140, lasts 3 months, all you need is 2 minutes a day. I'm putting one in a bag for you right now — you can pay in 30 seconds and be on your way. Or I can hold it for 10 minutes while you grab the little one an ice cream. Your call.\"",
        textEs: "TÚ: \"Sé que tienes las manos llenas. Entonces esto es lo que haré: te doy la versión de 30 segundos.\" [Haz una demo rápida y efectiva] \"¿Ves eso? €140, dura 3 meses, solo necesitas 2 minutos al día. Te estoy poniendo uno en una bolsa ahora mismo — puedes pagar en 30 segundos y seguir tu camino. O puedo guardarlo por 10 minutos mientras le compras un helado al pequeño. Tú decides.\""
      },
      {
        label: "The Hold + Return Setup",
        labelEs: "La Preparación de Guardar + Regresar",
        text: "YOU: \"Look, go handle the little one. I've put your name on this box — it's yours. Go grab him a snack, walk around for 20 minutes, and when you're back, it'll be right here waiting. No rush at all.\" [Write their name prominently] \"I'm [YOUR NAME], and this product isn't going anywhere except home with you.\"",
        textEs: "TÚ: \"Mira, ve a atender al pequeño. Puse tu nombre en esta caja — es tuya. Ve a comprarle un snack, camina por 20 minutos, y cuando regreses, estará aquí esperando. Ninguna prisa.\" [Escribe su nombre prominentemente] \"Soy [TU NOMBRE], y este producto no va a ningún lado excepto a casa contigo.\""
      },
      {
        label: "The Distraction Setup",
        labelEs: "La Preparación de Distracción",
        text: "YOU: [To your colleague, or prepare beforehand] \"Hey Marco, can you give this little hero some stickers?\" [To the child] \"My friend Marco has SPECIAL stickers over there — go see!\" [To the parent, as the child runs off] \"Okay, NOW we have 2 minutes of peace. Let's make them count.\" [Proceed with full demo and close]",
        textEs: "TÚ: [A tu colega, o prepara de antemano] \"Oye Marco, ¿puedes darle a este pequeño héroe unas calcomanías?\" [Al niño] \"¡Mi amigo Marco tiene calcomanías ESPECIALES allá — ve a ver!\" [Al padre, mientras el niño corre] \"Okay, AHORA tenemos 2 minutos de paz. Hagamos que cuenten.\" [Procede con demo completa y cierra]"
      }
    ],
    proTip: {
      text: "💡 **PRO TIP**: Always carry a small bag of kid-friendly items — stickers, mini coloring books, sample packets they can play with. The investment is €5 and it saves you hundreds in lost sales. Also, learn to read PARENT body language: a parent whose eyes keep darting to their kid is about to leave. Address the kid BEFORE the parent reaches their breaking point. The best sellers on the street aren't just good at selling — they're good at reading human situations and adapting in real time.",
      textEs: "💡 **TIP PRO**: Siempre carga una bolsa pequeña de artículos amigables para niños — calcomanías, mini libros para colorear, paquetitos de muestra con los que puedan jugar. La inversión es €5 y te ahorra cientos en ventas perdidas. Además, aprende a leer el lenguaje corporal de los PADRES: un padre cuyos ojos saltan constantemente hacia su niño está a punto de irse. Atiende al niño ANTES de que el padre alcance su punto de quiebre. Los mejores vendedores en la calle no solo son buenos vendiendo — son buenos leyendo situaciones humanas y adaptándose en tiempo real."
    }
  },

  // ============================================================
  // S8: Customer Wants to Record You
  // ============================================================
  {
    id: 'S8',
    categoryId: 'scenarios',
    tier: 3,
    title: "Customer Wants to Record You",
    titleEs: "El Cliente Quiere Grabarte",
    subtitle: "Turning privacy concerns into content opportunities",
    subtitleEs: "Convirtiendo preocupaciones de privacidad en oportunidades de contenido",
    duration: "3 min",
    icon: "Video",
    scenario: {
      text: "You're in the middle of a great demo. The customer is engaged, the wrinkle is disappearing beautifully, and then — she pulls out her phone and says \"I'm going to record this for my TikTok.\" She hits record and points the camera at you. Other people notice and start watching. What do you do? This is both an opportunity and a risk.",
      textEs: "Estás a mitad de una gran demo. El cliente está comprometido, la arruga está desapareciendo hermosamente, y entonces — saca su celular y dice \"Voy a grabar esto para mi TikTok.\" Le da a grabar y apunta la cámara hacia ti. Otras personas notan y empiezan a observar. ¿Qué haces? Esto es tanto una oportunidad como un riesgo."
    },
    whatToDo: [
      {
        text: "**SAY YES — WITH CONDITIONS**: Recording is FREE MARKETING. But set boundaries: \"Absolutely! Just make sure you get my good side, and tag us so people know where to find us!\"",
        textEs: "**DI SÍ — CON CONDICIONES**: Grabar es MARKETING GRATIS. Pero establece límites: \"¡Absolutamente! Solo asegúrate de captar mi buen lado, y etiquétanos para que la gente sepa dónde encontrarnos!\""
      },
      {
        text: "**PERFORM FOR THE CAMERA**: Once that phone is out, you're not just demoing — you're performing. Speak clearly, enunciate, smile, make eye contact with the camera occasionally. This video could reach thousands.",
        textEs: "**ACTÚA PARA LA CÁMARA**: Una vez que el celular sale, no solo estás haciendo demo — estás actuando. Habla claro, enuncia, sonríe, haz contacto visual con la cámara ocasionalmente. Este video podría llegar a miles."
      },
      {
        text: "**GET YOUR BRAND IN FRAME**: Make sure your store name, location, or product packaging is visible in the shot. Say the location out loud: \"Welcome to Zero Lines in Gibraltar — tax-free shopping at its best!\"",
        textEs: "**METE TU MARCA EN EL CUADRO**: Asegúrate de que el nombre de tu tienda, ubicación, o empaque del producto sea visible en la toma. Di la ubicación en voz alta: \"¡Bienvenidos a Zero Lines en Gibraltar — compras libres de impuestos en su máxima expresión!\""
      },
      {
        text: "**OFFER A DISCOUNT FOR POSTING**: \"If you post that and tag us, I'll give you 10% off today AND a free sample!\" User-generated content is worth 100x more than anything you post yourself.",
        textEs: "**OFRECE DESCUENTO POR PUBLICAR**: \"¡Si publicas eso y nos etiquetas, te doy 10% de descuento hoy Y una muestra gratis!\" El contenido generado por usuarios vale 100 veces más que cualquier cosa que publiques tú mismo."
      },
      {
        text: "**ASK FOR THE VIDEO**: \"Can you send me a copy? I'd love to share it on our page too!\" This gives you content for your own social media and builds a relationship with the customer.",
        textEs: "**PIDE EL VIDEO**: \"¿Puedes enviarme una copia? ¡Me encantaría compartirlo en nuestra página también!\" Esto te da contenido para tus propias redes sociales y construye una relación con el cliente."
      }
    ],
    whatNotToDo: [
      {
        text: "❌ **Say no**: Refusing recording looks suspicious — like you have something to hide. In 2024, saying no to cameras is saying no to free advertising.",
        textEs: "❌ **Decir que no**: Negarse a grabar se ve sospechoso — como si tuvieras algo que esconder. En 2024, decir que no a las cámaras es decir que no a publicidad gratis."
      },
      {
        text: "❌ **Ignore the camera and keep talking normally**: Your normal street patter doesn't work on video. Speak slower, clearer, and more deliberately when being recorded.",
        textEs: "❌ **Ignorar la cámara y seguir hablando normal**: Tu charla normal de calle no funciona en video. Habla más despacio, claro, y deliberadamente cuando te graban."
      },
      {
        text: "❌ **Let them record without getting your details**: If they post without tagging you, you get zero benefit. Always exchange contact info.",
        textEs: "❌ **Dejarlos grabar sin obtener tus datos**: Si publican sin etiquetarte, obtienes cero beneficio. Siempre intercambia información de contacto."
      },
      {
        text: "❌ **Be awkward or self-conscious**: Confidence on camera is magnetic. If you own the moment, the video performs better AND the sale closes easier.",
        textEs: "❌ **Ser incómodo o cohibido**: La confianza ante la cámara es magnética. Si te apropias del momento, el video rinde mejor Y la venta se cierra más fácil."
      }
    ],
    scripts: [
      {
        label: "The Enthusiastic Yes",
        labelEs: "El Sí Entusiasta",
        text: "YOU: \"YES! Record away! Get my good side — that's EVERY side!\" [Laugh, strike a pose] \"Seriously though, make sure you tag @ZeroLinesGibraltar so people know where to find us. And if this video gets over 1,000 views, come back and I'll give you a free product!\"",
        textEs: "TÚ: \"¡SÍ! ¡Graba todo! ¡Captura mi buen lado — es CADA lado!\" [Ríe, posa] \"En serio, asegúrate de etiquetar @ZeroLinesGibraltar para que la gente sepa dónde encontrarnos. ¡Y si este video llega a más de 1,000 vistas, regresa y te doy un producto gratis!\""
      },
      {
        label: "The Brand Integration",
        labelEs: "La Integración de Marca",
        text: "YOU: \"For sure! Here, let me hold the product up to the camera so everyone can see the name. This is the Hyaluronic Syringe from Zero Lines — we sell this right here in Gibraltar, completely tax-free. Watch what it does to this line in 60 seconds. Ready?\" [Direct, professional, brand-forward]",
        textEs: "TÚ: \"¡Claro! Mira, déjame sostener el producto frente a la cámara para que todos vean el nombre. Esta es la Jeringa Hialurónica de Zero Lines — vendemos esto aquí mismo en Gibraltar, completamente libre de impuestos. Mira lo que le hace a esta línea en 60 segundos. ¿Lista?\" [Directo, profesional, marca al frente]"
      },
      {
        label: "The Exchange Close",
        labelEs: "El Cierre de Intercambio",
        text: "YOU: \"I'm all for it! But here's the deal — I'll give you an amazing video AND 10% off, but you have to: one, tag us, two, send me the video so I can repost it, and three — tell me honestly if you love the product after a week. Deal?\" [Shake on it] \"Awesome. Now let's make some content!\"",
        textEs: "TÚ: \"¡Estoy totalmente a favor! Pero aquí está el trato — te doy un video increíble Y 10% de descuento, pero tienes que: uno, etiquetarnos, dos, enviarme el video para que lo vuelva a publicar, y tres — dime honestamente si amas el producto después de una semana. ¿Trato?\" [Choca eso] \"Increíble. ¡Ahora hagamos contenido!\""
      },
      {
        label: "The Camera Shy Recovery",
        labelEs: "La Recuperación de Timidez ante Cámara",
        text: "YOU: \"Totally fine if you don't want me on camera — but can I ask a favor? Film just your hand or just the product. Say 'Zero Lines Gibraltar, tax-free, 60-second results.' That way your followers know where to come, and you still get amazing content!\"",
        textEs: "TÚ: \"Totalmente bien si no me quieres en cámara — pero ¿puedo pedirte un favor? Filma solo tu mano o solo el producto. Di 'Zero Lines Gibraltar, libre de impuestos, resultados en 60 segundos.' Así tus seguidores saben dónde venir, ¡y tú sigues obteniendo contenido increíble!\""
      }
    ],
    proTip: {
      text: "💡 **PRO TIP**: Create a branded hashtag (#ZeroLinesGibraltar) and put it on a small card you hand to anyone recording. Ask them to use it. Over time, this builds a library of user-generated content that markets your spot 24/7. Also, learn ONE good \"TikTok moment\" phrase — something catchy that people want to quote. For example: \"60 seconds to stop time\" or \"Gibraltar: where wrinkles go to die.\" A catchy phrase gets quoted, and quoted content goes viral.",
      textEs: "💡 **TIP PRO**: Crea un hashtag de marca (#ZeroLinesGibraltar) y ponlo en una tarjeta pequeña que entregues a cualquiera que grabe. Pídeles que lo usen. Con el tiempo, esto construye una biblioteca de contenido generado por usuarios que comercializa tu puesto 24/7. Además, aprende UNA buena frase de \"momento TikTok\" — algo pegadizo que la gente quiera citar. Por ejemplo: \"60 segundos para detener el tiempo\" o \"Gibraltar: donde las arrugas van a morir.\" Una frase pegadiza se cita, y el contenido citado se vuelve viral."
    }
  },

  // ============================================================
  // S9: The Skeptical Man
  // ============================================================
  {
    id: 'S9',
    categoryId: 'scenarios',
    tier: 3,
    title: "The Skeptical Man",
    titleEs: "El Hombre Escéptico",
    subtitle: "Winning over the dismissive male partner who's just tagging along",
    subtitleEs: "Ganándote al pareja masculino escéptico que solo viene de acompañante",
    duration: "4 min",
    icon: "Frown",
    scenario: {
      text: "A couple stops for your demo. The woman is interested — she's watching, asking about ingredients, touching the products. But the man? He's standing with his arms crossed, rolling his eyes, checking his phone. Every time she says something positive, he counters with: \"It's all a scam,\" \"You don't need that junk,\" or \"Let's go, we're wasting time.\" She's starting to disengage because of him. But YOU can see she wants it. How do you handle him without alienating her?",
      textEs: "Una pareja se detiene para tu demo. La mujer está interesada — está observando, preguntando sobre ingredientes, tocando los productos. ¿Pero el hombre? Está parado con los brazos cruzados, poniendo los ojos en blanco, checando su celular. Cada vez que ella dice algo positivo, él contraataca con: \"Todo es una estafa,\" \"No necesitas esa porquería,\" o \"Vámonos, estamos perdiendo el tiempo.\" Ella está empezando a desconectarse por él. Pero TÚ puedes ver que ella lo quiere. ¿Cómo manejas a él sin alienarla?"
    },
    whatToDo: [
      {
        text: "**DON'T ENGAGE HIM DIRECTLY**: Arguing with him creates a battle of egos that she'll lose. Your job is to sell HER while neutralizing HIM.",
        textEs: "**NO TE ENFRENTES A ÉL DIRECTAMENTE**: Discutir con él crea una batalla de egos que ella perderá. Tu trabajo es venderle A ELLA mientras neutralizas A ÉL."
      },
      {
        text: "**ACKNOWLEDGE HIM WITH RESPECT**: \"Sir, I can see you look out for her — that's a good thing. Give me 60 seconds and if she's not impressed, I'll be the first one to say you guys should walk away.\" This frames him as PROTECTIVE (positive) rather than OBSTRUCTIVE.",
        textEs: "**RECONOCELO CON RESPETO**: \"Señor, puedo ver que la cuida — eso es algo bueno. Déme 60 segundos y si ella no está impresionada, seré la primera en decir que deberían irse.\" Esto lo enmarca como PROTECTOR (positivo) en vez de OBSTRUCTIVO."
      },
      {
        text: "**FIND HIS PAIN POINT**: Men care about RESULTS and EFFICIENCY. \"This takes 2 minutes a day. No complicated routine. Just apply, done.\" Or appeal to his wallet: \"One syringe replaces €500 worth of spa facials.\"",
        textEs: "**ENCUENTRA SU PUNTO DOLOROSO**: A los hombres les importan los RESULTADOS y la EFICIENCIA. \"Esto toma 2 minutos al día. Sin rutinas complicadas. Solo aplicas, listo.\" O apela a su billetera: \"Una jeringa reemplaza €500 en faciales de spa.\""
      },
      {
        text: "**OFFER TO DEMO ON HIM**: \"Sir, you look like a man who appreciates proof. Let me try this on your hand — no charge, no commitment. Just so you can see what she'll be using.\" Once he FEELS it, skepticism drops.",
        textEs: "**OFRECE HACERLE DEMO A ÉL**: \"Señor, usted parece un hombre que aprecia las pruebas. Déjeme probar esto en su mano — sin cobro, sin compromiso. Solo para que vea lo que ella estará usando.\" Una vez que ÉL LO SIENTE, el escepticismo cae."
      },
      {
        text: "**MAKE HIM PART OF THE DECISION**: \"You know her better than I do — does she usually take care of her skin, or is this new for her?\" Getting him talking shifts him from adversary to advisor.",
        textEs: "**HAZLO PARTE DE LA DECISIÓN**: \"Usted la conoce mejor que yo — ¿usualmente cuida su piel, o es esto nuevo para ella?\" Hacerlo hablar lo cambia de adversario a asesor."
      }
    ],
    whatNotToDo: [
      {
        text: "❌ **Ignore him completely**: He's the gatekeeper. If you pretend he doesn't exist, he'll work harder to undermine you.",
        textEs: "❌ **Ignorarlo por completo**: Él es el guardián. Si pretendes que no existe, trabajará más duro para minarte."
      },
      {
        text: "❌ **Challenge his masculinity**: \"Real men take care of their skin too!\" — Even if true, this makes him defensive and MORE hostile.",
        textEs: "❌ **Cuestionar su masculinidad**: \"¡Los hombres de verdad también cuidan su piel!\" — Aunque sea cierto, esto lo pone a la defensiva y MÁS hostil."
      },
      {
        text: "❌ **Pit them against each other**: \"Don't let him control what you buy!\" — Creates relationship tension and makes YOU the villain.",
        textEs: "❌ **Enfrentarlos**: \"¡No dejes que él controle qué compras!\" — Crea tensión de relación y te convierte a TI en la villana."
      },
      {
        text: "❌ **Offer a discount to \"win\"**: Bargaining in front of a skeptical man trains him that his negativity gets rewards.",
        textEs: "❌ **Ofrecer descuento para \"ganar\"**: Negociar frente a un hombre escéptico lo entrena de que su negatividad obtiene recompensas."
      }
    ],
    scripts: [
      {
        label: "The Respect + Challenge",
        labelEs: "El Respeto + Reto",
        text: "YOU: \"Sir, I respect that you're looking out for her — that says a lot about you. So let me make you a promise: give me 60 seconds. If I don't show you something that impresses YOU, I'll tell her myself that she should walk away. Fair?\" [He'll agree — men love fair challenges] \"Perfect. Let's do this.\"",
        textEs: "TÚ: \"Señor, respeto que la cuida — eso dice mucho de usted. Entonces déjeme hacerle una promesa: déme 60 segundos. Si no le muestro algo que le impresione A USTED, le diré yo misma que debería irse. ¿Justo?\" [Él aceptará — a los hombres les encantan los retos justos] \"Perfecto. Hagamos esto.\""
      },
      {
        label: "The Demo on Him",
        labelEs: "La Demo en Él",
        text: "YOU: \"Sir, you're clearly a man of facts. So let me show you the facts — on your own hand.\" [Apply to his hand] \"Feel that texture? That's hyaluronic acid — the same stuff in your joints. No chemicals, no nonsense. Just science. Now watch what happens to that dry patch in 60 seconds.\" [Let him see/feel the result] \"That's what she'd be putting on her face. Still think it's junk?\"",
        textEs: "TÚ: \"Señor, usted es claramente un hombre de hechos. Entonces déjeme mostrarle los hechos — en su propia mano.\" [Aplica en su mano] \"¿Siente esa textura? Eso es ácido hialurónico — lo mismo que está en sus articulaciones. Sin químicos, sin tonterías. Solo ciencia. Ahora mire lo que le pasa a ese parche seco en 60 segundos.\" [Déjalo ver/sentir el resultado] \"Eso es lo que ella se pondría en la cara. ¿¿Sigue pensando que es basura??\""
      },
      {
        label: "The Value Reframe for Men",
        labelEs: "La Reconversión de Valor para Hombres",
        text: "YOU: \"Let me put this in terms you'll appreciate. One syringe: €140. One facial at a spa: €80. This replaces 8-10 facials. That's €800 worth of treatments for €140. And it's tax-free here — in any store back home, this is €200+. I'm not selling you a cream; I'm offering you a 75% discount on premium skincare.\"",
        textEs: "TÚ: \"Déjeme poner esto en términos que usted apreciará. Una jeringa: €140. Un facial en spa: €80. Esto reemplaza 8-10 faciales. Son €800 en tratamientos por €140. Y es libre de impuestos aquí — en cualquier tienda en su país, esto es €200+. No le estoy vendiendo una crema; le ofrezco 75% de descuento en skincare premium.\""
      },
      {
        label: "The Inclusion Pivot",
        labelEs: "El Giro de Inclusión",
        text: "YOU: [To the woman, but loud enough for him] \"You know what? Your husband has really good instincts — most people on the street ARE trying to sell junk.\" [To him] \"But here's the difference: we have a store, we have Google reviews, we have a return policy. We're not going anywhere. And neither are the results you just saw on her face. So — are you the kind of guy who trusts his own eyes, or do you need more proof?\"",
        textEs: "TÚ: [A la mujer, pero lo suficientemente alto para que él escuche] \"¿Saben qué? Su esposo tiene muy buen instinto — la mayoría de la gente en la calle ESTÁ tratando de vender basura.\" [A él] \"Pero aquí está la diferencia: tenemos tienda, tenemos reseñas en Google, tenemos política de devolución. No nos vamos a ningún lado. Y los resultados que acaba de ver en su cara tampoco. Entonces — ¿es usted del tipo que confía en sus propios ojos, o necesita más pruebas?\""
      }
    ],
    proTip: {
      text: "💡 **PRO TIP**: Men process purchases differently than women. Women buy on EMOTION and RELATIONSHIP (how it feels, how they'll look, the experience). Men buy on LOGIC and VALUE (price per use, time saved, proof). When selling to a couple, address BOTH: use emotion with her, use logic with him. The phrase \"Here's the math\" is magic with skeptical men. And remember: a man who says no in public but sees results may come back ALONE the next day to buy it as a surprise gift. Always give him your card separately.",
      textEs: "💡 **TIP PRO**: Los hombres procesan compras diferente que las mujeres. Las mujeres compran por EMOCIÓN y RELACIÓN (cómo se siente, cómo se verán, la experiencia). Los hombres compran por LÓGICA y VALOR (precio por uso, tiempo ahorrado, prueba). Cuando vendes a una pareja, dirígete a AMBOS: usa emoción con ella, usa lógica con él. La frase \"Aquí está la matemática\" es mágica con hombres escépticos. Y recuerda: un hombre que dice que no en público pero ve resultados puede regresar SOLO al día siguiente para comprarlo como regalo sorpresa. Siempre dale tu tarjeta por separado."
    }
  },

  // ============================================================
  // S10: The Returning Customer
  // ============================================================
  {
    id: 'S10',
    categoryId: 'scenarios',
    tier: 3,
    title: "The Returning Customer",
    titleEs: "El Cliente que Regresa",
    subtitle: "Maximizing upsell opportunities and building long-term loyalty",
    subtitleEs: "Maximizando oportunidades de venta adicional y construyendo lealtad a largo plazo",
    duration: "5 min",
    icon: "RefreshCw",
    scenario: {
      text: "A woman you sold to three months ago walks back up to your spot. She remembers your name. She pulls out her phone and shows you a photo — her skin looks AMAZING. \"I used the whole syringe,\" she says, smiling. \"It really worked. What else you got?\" This is the BEST possible scenario. She's pre-sold, she trusts you, and she's ready to spend. But she's also comparing everything to that first magical experience. How do you keep the magic alive while maximizing the sale?",
      textEs: "Una mujer a quien vendiste hace tres meses camina de regreso a tu puesto. Recuerda tu nombre. Saca su celular y te muestra una foto — su piel se ve INCREÍBLE. \"Usé toda la jeringa,\" dice, sonriendo. \"Realmente funcionó. ¿Qué más tienes?\" Este es el MEJOR escenario posible. Ella ya está vendida, confía en ti, y está lista para gastar. Pero también está comparando todo con esa primera experiencia mágica. ¿Cómo mantienes viva la magia mientras maximizas la venta?"
    },
    whatToDo: [
      {
        text: "**CELEBRATE THEM LIKE FAMILY**: \"OH MY GOD, you came back! Look at your skin — I told you!\" Hugs, high-fives, genuine excitement. Returning customers are GOLD — treat them like royalty.",
        textEs: "**CÉLEBRA COMO FAMILIA**: \"¡DIOS MÍO, regresaste! ¡Mira tu piel — te lo dije!\" Abrazos, high-fives, emoción genuina. Los clientes que regresan son ORO — trátalos como realeza."
      },
      {
        text: "**SHOW THEM THE NEW STUFF**: Returning customers don't want the same product — they want the NEXT level. Show them products they haven't tried. \"You had the syringe — now let me blow your mind with the Glycolic Peeling.\"",
        textEs: "**MUÉSTRALES LO NUEVO**: Los clientes que regresan no quieren el mismo producto — quieren el SIGUIENTE nivel. Muéstrales productos que no han probado. \"Tuviste la jeringa — ahora déjame volarte la cabeza con el Peeling Glicólico.\""
      },
      {
        text: "**ASK FOR A TESTIMONIAL/PHOTO**: \"Can I take a before/after photo of you for our wall?\" This makes them feel special AND gives you marketing material.",
        textEs: "**PIDE UN TESTIMONIO/FOTO**: \"¿Puedo tomarte una foto de antes/después para nuestra pared?\" Esto los hace sentir especiales Y te da material de marketing."
      },
      {
        text: "**CREATE A LOYALTY OFFER**: \"Since you're family now — regular price is €140, but for returning customers like you, it's €120. And if you buy two products today, I'll throw in the scrub for free.\" Make them feel VIP.",
        textEs: "**CREA UNA OFERTA DE LEALTAD**: \"Ya que eres familia ahora — el precio regular es €140, pero para clientes que regresan como tú, es €120. Y si compras dos productos hoy, te regalo el scrub.\" Hazlos sentir VIP."
      },
      {
        text: "**SEED FUTURE VISITS**: \"This peeling lasts about 2 months. I'll be right here when you're ready for more. Here's my WhatsApp — message me before you come and I'll have your products ready.\" Turn one return into a LIFETIME relationship.",
        textEs: "**SIEMBRA VISITAS FUTURAS**: \"Este peeling dura unos 2 meses. Estaré aquí mismo cuando estés lista para más. Aquí está mi WhatsApp — mándame mensaje antes de venir y tendré tus productos listos.\" Convierte un regreso en una relación de POR VIDA."
      }
    ],
    whatNotToDo: [
      {
        text: "❌ **Treat them like a new customer**: \"So, this is our hyaluronic syringe...\" — They already know! This feels insulting and wastes their time.",
        textEs: "❌ **Tratarlos como cliente nuevo**: \"Entonces, esta es nuestra jeringa hialurónica...\" — ¡Ya lo saben! Esto se siente insultante y desperdicia su tiempo."
      },
      {
        text: "❌ **Upsell too aggressively**: They came back because they trust you. Pushy upselling breaks that trust. Recommend, don't pressure.",
        textEs: "❌ **Vender demasiado agresivamente**: Regresaron porque confían en ti. La venta agresiva adicional rompe esa confianza. Recomienda, no presiones."
      },
      {
        text: "❌ **Forget their details**: If you remember their name, what they bought, and how it went for them, you create a connection that no competitor can match.",
        textEs: "❌ **Olvidar sus detalles**: Si recuerdas su nombre, qué compraron, y cómo les fue, creas una conexión que ningún competidor puede igualar."
      },
      {
        text: "❌ **Assume they'll buy without a demo**: Even returning customers need to see/feel the product again. The demo is your closing tool — use it.",
        textEs: "❌ **Asumir que comprarán sin demo**: Incluso los clientes que regresan necesitan ver/sentir el producto de nuevo. La demo es tu herramienta de cierre — úsala."
      }
    ],
    scripts: [
      {
        label: "The Warm Welcome",
        labelEs: "La Bienvenida Cálida",
        text: "YOU: \"NO WAY! Maria! You came back!\" [Genuine excitement] \"Let me see that skin! OH MY GOD. I told you! You look INCREDIBLE!\" [High-five or hug if appropriate] \"Okay, okay — you used the whole syringe. I am SO proud of you. Now — are you ready for the NEXT level? Because I have some new stuff that's going to blow your mind.\"",
        textEs: "TÚ: \"¡NO PUEDE SER! ¡María! ¡Regresaste!\" [Emoción genuina] \"¡Déjame ver esa piel! DIOS MÍO. ¡Te lo dije! ¡Te ves INCREÍBLE!\" [High-five o abrazo si es apropiado] \"Okay, okay — usaste toda la jeringa. Estoy TAN orgullosa de ti. Ahora — ¿estás lista para el SIGUIENTE nivel? Porque tengo cosas nuevas que te van a volar la cabeza.\""
      },
      {
        label: "The Upsell with Logic",
        labelEs: "La Venta Adicional con Lógica",
        text: "YOU: \"So you loved the syringe — amazing. Now here's what most people do next: they add the Glycolic Peeling. Why? Because the syringe hydrates and fills — but the peeling removes the dead skin that blocks absorption. Together? They're a POWER couple. The syringe works 3x better when your skin is properly exfoliated.\" [Do a quick peeling demo] \"Feel that? Baby-smooth skin, and NOW the syringe can do its real magic.\"",
        textEs: "TÚ: \"Así que amaste la jeringa — increíble. Ahora esto es lo que la mayoría hace después: agregan el Peeling Glicólico. ¿Por qué? Porque la jeringa hidrata y rellena — pero el peeling remueve la piel muerta que bloquea la absorción. ¿Juntos? Son una pareja de PODER. La jeringa funciona 3 veces mejor cuando tu piel está adecuadamente exfoliada.\" [Haz una demo rápida del peeling] \"¿Sientes eso? Piel suave como bebé, y AHORA la jeringa puede hacer su magia real.\""
      },
      {
        label: "The VIP Treatment",
        labelEs: "El Tratamiento VIP",
        text: "YOU: \"You know what? You're not a regular customer anymore — you're family. So here's what I'm doing for you today.\" [Lower voice, make it feel exclusive] \"Regular price for the syringe + peeling is €240. For you? €200. AND I'm throwing in the Dead Sea Scrub — full size, my gift. That's €275 worth of product for €200. Only because you came back.\" [Hand her the bag] \"Welcome home.\"",
        textEs: "TÚ: \"¿Sabes qué? Ya no eres una cliente regular — eres familia. Entonces esto es lo que haré por ti hoy.\" [Baja la voz, hazlo sentir exclusivo] \"El precio regular de jeringa + peeling es €240. Para ti? €200. Y te regalo el Scrub del Mar Muerto — tamaño completo, mi regalo. Son €275 en producto por €200. Solo porque regresaste.\" [Entrégale la bolsa] \"Bienvenida a casa.\""
      },
      {
        label: "The Future Seed",
        labelEs: "La Siembra del Futuro",
        text: "YOU: \"This peeling you just bought? Use it twice a week, and in 6 weeks your skin is going to be NEXT LEVEL. Here's my WhatsApp —\" [Write it down, give card] \"— send me a photo at week 3. I want to see your progress. And when you're running low? Message me. I'll have your next order ready before you even get here. I come to Gibraltar every day — consider me your personal skincare supplier.\"",
        textEs: "TÚ: \"¿Este peeling que acabas de comprar? Úsalo dos veces por semana, y en 6 semanas tu piel va a estar en el SIGUIENTE NIVEL. Aquí está mi WhatsApp —\" [Escríbelo, dale tarjeta] \"— mándame una foto en la semana 3. Quiero ver tu progreso. ¿Y cuando te estés acabando? Mándame mensaje. Tendré tu siguiente pedido listo antes de que llegues. Vengo a Gibraltar todos los días — considérame tu proveedora personal de skincare.\""
      }
    ],
    proTip: {
      text: "💡 **PRO TIP**: Keep a simple customer log on your phone — names, what they bought, date, and any personal details (where they're from, skin concerns, follow-up promises). When Maria from Birmingham walks back up three months later and you say \"Maria! How did the honeymoon go? Did the syringe last the whole trip?\" — she will be SHOCKED you remembered. That shock turns into trust, trust turns into loyalty, and loyalty turns into a customer who brings her friends, her sisters, and her coworkers. ONE returning customer, properly nurtured, is worth TEN new ones. They're your salesforce, your marketing team, and your proof — all in one.",
      textEs: "💡 **TIP PRO**: Mantén un registro simple de clientes en tu celular — nombres, qué compraron, fecha, y cualquier detalle personal (de dónde son, preocupaciones de piel, promesas de seguimiento). Cuando María de Birmingham regresa tres meses después y dices \"¡María! ¿Cómo fue la luna de miel? ¿La jeringa duró todo el viaje?\" — ella se quedará SHOCKEADA de que recordaste. Ese shock se convierte en confianza, la confianza en lealtad, y la lealtad en una cliente que trae a sus amigas, hermanas, y compañeras de trabajo. UN cliente que regresa, apropiadamente nutridos, vale DIEZ nuevos. Son tu fuerza de ventas, tu equipo de marketing, y tu prueba — todo en uno."
    }
  }
];

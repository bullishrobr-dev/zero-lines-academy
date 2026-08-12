/*
 * The six numbers this page renders were typed in by hand, one per rung, in a
 * helper 460 lines away from the scripts that quote them. They happened to
 * match pricing.ts — but "happened to" is the whole problem: change a rung in
 * pricing.ts and this page keeps quoting yesterday's ladder with no build
 * error. They are read out of the ladder now, same as every other screen.
 */
import { SYRINGE_LADDER } from './pricing';

const RUNG = (id: string): number => {
  const found = SYRINGE_LADDER.steps.find((s) => s.id === id);
  if (!found) throw new Error(`pricing.ts has no syringe rung "${id}"`);
  return found.price;
};

export interface PriceStep {
  price: string;
  label: string;
  labelEs: string;
  description: string;
  descriptionEs: string;
  script: string;
  scriptEs: string;
  isMinimum?: boolean;
  isVoucher?: boolean;
  isHighlight?: boolean;
}

export interface DemoStep {
  step: string;
  title: string;
  titleEs: string;
  text: string;
  textEs: string;
}

export interface ProTip {
  icon: string;
  title: string;
  titleEs: string;
  text: string;
  textEs: string;
}

export const syringeData = {
  /* ─── Hero ─── */
  hero: {
    backButton: 'Back',
    backButtonEs: 'Atrás',
    badge: 'Flagship Product',
    badgeEs: 'Producto Estrella',
    title: 'The Syringe',
    titleEs: 'La Jeringa',
    subtitle: 'Natural Alternative to Botox \u2014 Instant Results',
    subtitleEs: 'Alternativa Natural al B\u00f3tox \u2014 Resultados Instant\u00e1neos',
  },

  stats: {
    useLabel: 'Use',
    useLabelEs: 'Uso',
    useValue: 'Once/Week',
    useValueEs: '1 vez/semana',
    /*
     * One syringe is a YEAR of weekly treatments. That is the owner's own line
     * and it is what demo step 5, the Quick Reference block and every
     * cost-per-week reframe in the app already say. This tile used to read
     * "6-18 Months", which is how long the RESULT holds, not how long the
     * syringe lasts, so the top of the page taught a seller one number and the
     * bottom of the same page taught them another.
     */
    lastsLabel: 'Lasts',
    lastsLabelEs: 'Duraci\u00f3n',
    lastsValue: '1 Year',
    lastsValueEs: '1 A\u00f1o',
    resultsLabel: 'Results',
    resultsLabelEs: 'Resultados',
    resultsValue: 'Instant',
    resultsValueEs: 'Instant\u00e1neos',
  },

  /* ─── The Hook ─── */
  hook: {
    sectionTitle: 'The Hook \u2014 Stop Scripts',
    sectionTitleEs: 'El Gancho \u2014 Frases de Captaci\u00f3n',
    script1Label: 'The Eye Compliment',
    script1LabelEs: 'El Cumplido del Ojo',
    script1Text:
      '"You look amazing! What do you use for your skin?"',
    script1TextEs:
      '"\u00a1Te ves incre\u00edble! \u00bfQu\u00e9 usas para tu piel?"',
    script1Instruction:
      'Pause, smile warmly, let her respond. Then:',
    script1InstructionEs:
      'Pausa, sonr\u00ede c\u00e1lidamente, d\u00e9jala responder. Luego:',
    script1Continuation:
      '"I want to give you something small \u2014 not to replace your cream, because you clearly take care of yourself \u2014 but around the eyes\u2026 we can do something special there."',
    script1ContinuationEs:
      '"Quiero darte algo peque\u00f1o \u2014 no para reemplazar tu crema, porque claramente te cuidas \u2014 pero alrededor de los ojos\u2026 podemos hacer algo especial ah\u00ed."',

    script2Label: 'With Partner \u2014 Engage Both',
    script2LabelEs: 'Con Pareja \u2014 Involucra a Ambos',
    script2Text:
      '"Sir, do you see what I mean? She\'s stunning, but the eyes \u2014 we can make them look even fresher, right?"',
    script2TextEs:
      '"Se\u00f1or, \u00bfve lo que quiero decir? Ella est\u00e1 deslumbrante, pero los ojos \u2014 podemos hacer que se vean a\u00fan m\u00e1s frescos, \u00bfverdad?"',
    script2Instruction:
      'Keep it playful and charming \u2014 the laughter opens the door. Then lead inside confidently:',
    script2InstructionEs:
      'Mant\u00e9nlo juguet\u00f3n y encantador \u2014 la risa abre la puerta. Luego gu\u00eda adentro con confianza:',
    script2Continuation:
      '"Come, let me show you something incredible. It takes two minutes; you\'ll thank me after."',
    script2ContinuationEs:
      '"Ven, d\u00e9jame mostrarte algo incre\u00edble. Toma dos minutos; despu\u00e9s me lo agradecer\u00e1s."',

    script3Label: 'Direct Approach \u2014 The Observation',
    script3LabelEs: 'Enfoque Directo \u2014 La Observaci\u00f3n',
    script3Text:
      '"The first thing I noticed about you is your eyes... they\'re beautiful, but I can see the bags are a bit heavy. I can fix that in two minutes. Come!"',
    script3TextEs:
      '"Lo primero que not\u00e9 de ti son tus ojos... son hermosos, pero puedo ver que las bolsas est\u00e1n un poco pesadas. Puedo arreglar eso en dos minutos. \u00a1Ven!"',
  },

  /* ─── The Demo ─── */
  demo: {
    sectionTitle: 'The Demo \u2014 Step by Step',
    sectionTitleEs: 'La Demostraci\u00f3n \u2014 Paso a Paso',
    steps: [
      {
        step: '1',
        title: 'Set the Stage',
        titleEs: 'Prepara el Escenario',
        text: '"Just to relax you, everything we use here is 100% natural \u2014 no parabens, no chemicals, no injections." (To partner: "Sir, don\'t worry \u2014 we\'re not about to change her face, just a little touch of magic for the eyes.")',
        textEs: '"Para que te relajes, todo lo que usamos aqu\u00ed es 100% natural \u2014 sin parabenos, sin qu\u00edmicos, sin inyecciones." (A la pareja: "Se\u00f1or, no se preocupe \u2014 no vamos a cambiarle la cara, solo un toque de magia para los ojos.")',
      },
      {
        step: '2',
        title: 'Clean & Position',
        titleEs: 'Limpia y Posiciona',
        text: 'Have her sit down comfortably. Clean the eye area gently with a cotton pad. Make sure the lighting is good.',
        textEs: 'Haz que se siente c\u00f3modamente. Limpia el \u00e1rea del ojo suavemente con un algod\u00f3n. Aseg\u00farate de que la iluminaci\u00f3n sea buena.',
      },
      {
        step: '3',
        title: '"Look Up, Look Down" Technique',
        titleEs: 'T\u00e9cnica de "Mira Arriba, Mira Abajo"',
        text: '"Look up for me, perfect. Thank you." Apply while the eye is looking upward \u2014 this smooths the under-eye area. "Now look down." Apply to the upper eyelid and crow\'s feet area.',
        textEs: '"Mira hacia arriba para m\u00ed, perfecto. Gracias." Aplica mientras el ojo mira hacia arriba \u2014 esto alisa el \u00e1rea debajo del ojo. "Ahora mira hacia abajo." Aplica en el p\u00e1rpado superior y el \u00e1rea de las patas de gallo.',
      },
      {
        step: '4',
        title: 'The Narrative While Applying',
        titleEs: 'La Narrativa Mientras Aplicas',
        text: '"What I\'m about to show you is our #1 best-selling treatment across Europe and North America. It helps the skin stimulate its own collagen production, relaxes the facial muscles, and drains unnecessary fluids \u2014 so puffiness, tired eyes, and fine lines disappear naturally."',
        textEs: '"Lo que te voy a mostrar es nuestro tratamiento #1 m\u00e1s vendido en toda Europa y Norteam\u00e9rica. Ayuda a la piel a estimular su propia producci\u00f3n de col\u00e1geno, relaja los m\u00fasculos faciales y drena l\u00edquidos innecesarios \u2014 as\u00ed que la hinchaz\u00f3n, los ojos cansados y las l\u00edneas de expresi\u00f3n desaparecen naturalmente."',
      },
      {
        step: '5',
        title: 'The Treatment Plan',
        titleEs: 'El Plan de Tratamiento',
        text: '"You only need to use it once a week \u2014 that\'s it. The syringe lasts for a whole year of treatments, and the results can stay between 6 to 18 months. The only rule: once you apply it, don\'t touch the area for five hours." (To partner: "You\'re going to have to remind her not to touch it, okay?")',
        textEs: '"Solo necesitas usarlo una vez por semana \u2014 eso es todo. La jeringa dura para un a\u00f1o completo de tratamientos, y los resultados pueden mantenerse entre 6 y 18 meses. La \u00fanica regla: una vez que lo apliques, no toques el \u00e1rea durante cinco horas." (A la pareja: "Vas a tener que recordarle que no lo toque, \u00bfokey?")',
      },
      {
        step: '6',
        title: 'THE REVEAL \u2014 First Eye',
        titleEs: 'LA REVELACI\u00d3N \u2014 Primer Ojo',
        text: '"Alright, I do this around twenty times a day, and it always looks good \u2014 but what just happened to you right now is something else! Promise not to scream?" (Hand her the mirror.) "Woooooow!! Look at that \u2014 it\'s like you just slept twelve hours."',
        textEs: '"Bueno, hago esto como veinte veces al d\u00eda, y siempre se ve bien \u2014 pero lo que acaba de pasarte a ti ahora es otra cosa. \u00a1Promete no gritar!" (Dale el espejo.) "\u00a1\u00a1Woooooow!! Mira eso \u2014 es como si acabaras de dormir doce horas."',
      },
      {
        step: '7',
        title: 'Show the Untreated Eye',
        titleEs: 'Muestra el Ojo No Tratado',
        text: '"Now look at the other eye \u2014 see the difference?" This comparison is EVERYTHING. Let her see the treated vs. untreated. That\'s your close. Turn to the partner: "Sir, be honest \u2014 do you see the difference? Look at the lift, the smoothness, the brightness."',
        textEs: '"Ahora mira el otro ojo \u2014 \u00bfves la diferencia?" Esta comparaci\u00f3n es TODO. D\u00e9jala ver el tratado vs. el no tratado. Ese es tu cierre. G\u00edrate hacia la pareja: "Se\u00f1or, sea honesto \u2014 \u00bfve la diferencia? Mire el lift, la suavidad, el brillo."',
      },
    ] as DemoStep[],
  },

  /* ─── Partner Upsell ─── */
  partnerUpsell: {
    sectionTitle: 'The Partner Upsell',
    sectionTitleEs: 'El Upsell de la Pareja',
    subtitle: '"One eye did that. Now show him what a year of it looks like"',
    subtitleEs: '"Un ojo ha hecho eso. Ahora ens\u00e9\u00f1ale c\u00f3mo es un a\u00f1o entero"',
    description:
      "After they see the result on one eye, that's your opening. The partner has already witnessed the transformation \u2014 they're emotionally invested. Bring him IN, always: he is the first person you work on, not the one you write off. Only if he is genuinely bad energy do you turn and give everything to her.",
    descriptionEs:
      "Despu\u00e9s de que ven el resultado en un ojo, esa es tu oportunidad. La pareja ya ha presenciado la transformaci\u00f3n \u2014 ya est\u00e1 emocionalmente involucrada. M\u00e9telo DENTRO, siempre: es la primera persona a la que trabajas, no la que descartas. Solo si trae muy mala energ\u00eda te giras y se lo das todo a ella.",
    script1:
      '"Sir, you saw the difference \u2014 and that is ONE eye. Now imagine her doing that at home every Sunday, all year. She is going to walk around looking like she slept twelve hours."',
    script1Es:
      '"Se\u00f1or, has visto la diferencia \u2014 y eso es UN ojo. Ahora im\u00e1ginatela haci\u00e9ndoselo en casa cada domingo, todo el a\u00f1o. Va a ir por ah\u00ed como si hubiera dormido doce horas."',
    option2Intro: 'Now introduce Option 2:',
    option2IntroEs: 'Ahora introduce la Opci\u00f3n 2:',
    option2Script:
      '"Pay the normal price of {currency}300, and you\'ll get TWO syringes \u2014 so you can treat both eyes, the forehead, the upper lip, and even the number 11s between the eyebrows."',
    option2ScriptEs:
      '"Paga el precio normal de {currency}300, y obtendr\u00e1s DOS jeringas \u2014 as\u00ed puedes tratar ambos ojos, la frente, el labio superior, e incluso los n\u00famero 11 entre las cejas."',
    advancedLabel: 'Advanced upsell for great customers:',
    advancedLabelEs: 'Upsell avanzado para buenos clientes:',
    advancedScript:
      '"Can I be honest with you? There\'s not a big difference between the two options anyway. I really feel like you\'d use it for those extra areas, and honestly, you\'re the type who will take care of it properly. So I\'ll do something nice \u2014 if you take the bigger option, I\'ll give you both my Day and Night Cream completely free."',
    advancedScriptEs:
      '"\u00bfPuedo ser honesto contigo? No hay una gran diferencia entre las dos opciones de todos modos. Realmente siento que lo usar\u00edas para esas \u00e1reas extra, y honestamente, eres del tipo que lo cuidar\u00e1 bien. As\u00ed que voy a hacer una cosa bonita \u2014 si tomas la opci\u00f3n m\u00e1s grande, te dar\u00e9 tanto mi Crema de D\u00eda como mi Crema de Noche completamente gratis."',
  },

  /* ─── Price Ladder ─── */
  priceLadder: {
    sectionTitle: 'Interactive Price Ladder',
    sectionTitleEs: 'Escalera de Precios Interactiva',
    description:
      'Tap each step to expand the exact script. Never skip steps \u2014 go down one at a time.',
    descriptionEs:
      'Toca cada paso para expandir el guion exacto. Nunca te saltes pasos \u2014 baja uno a la vez.',
    whatToSay: 'What to say',
    whatToSayEs: 'Qu\u00e9 decir',
    minimumWarning:
      "\u26a0 This price is NOT yours to give. One voucher, once \u2014 then you go full market and CALL THE MANAGER. A seller who can reach the floor on their own has no floor.",
    minimumWarningEs:
      "\u26a0 Este precio NO es tuyo. Un cup\u00f3n, una vez \u2014 luego vas a mercado y LLAMAS AL ENCARGADO. Un vendedor que llega solo al fondo no tiene fondo.",
    voucherHint:
      "\ud83d\udca1 Say it while you start her OTHER EYE. Hands busy, face tilted up, the room feels finished \u2014 and the number moves inside a moment that is about something else. Voice down, lean in. Only on the SINGLE syringe, and there is no second voucher.",
    voucherHintEs:
      "\ud83d\udca1 Dilo mientras le empiezas el OTRO OJO. Manos ocupadas, cara hacia arriba, la cosa parece terminada \u2014 y el n\u00famero se mueve dentro de un momento que va de otra cosa. Baja la voz, incl\u00ednate. Solo en la jeringa INDIVIDUAL, y no hay segundo cup\u00f3n.",
    highlightHint:
      "\ud83d\udca1 This is your best-value single-syringe offer. Most customers who want one syringe take this.",
    highlightHintEs:
      "\ud83d\udca1 Esta es tu oferta de mejor valor para jeringa individual. La mayor\u00eda de clientes que quieren una jeringa toman esta.",
  },

  /* ─── Price Steps (dynamic, bilingual labels + scripts) ─── */
  priceSteps: {
    europeLabel: 'Europe Price',
    europeLabelEs: 'Precio Europa',
    europeDescription: 'Anchor value \u2014 always mention this first',
    europeDescriptionEs: 'Valor ancla \u2014 siempre menciona este primero',
    europeScript:
      '"Across Europe, this treatment goes for around {currency}500, because it\'s one of the only ones that works instantly and lasts long-term."',
    europeScriptEs:
      '"En toda Europa, este tratamiento cuesta alrededor de {currency}500, porque es uno de los \u00fanicos que funciona instant\u00e1neamente y dura a largo plazo."',

    locationLabel: '{locationName} Price',
    locationLabelEs: 'Precio {locationName}',
    locationDescription: 'Our standard price',
    locationDescriptionEs: 'Nuestro precio est\u00e1ndar',
    locationScript:
      '"But here in {locationName} \u2014 you know how special it is here \u2014 instead of {currency}500, we charge only {currency}300."',
    locationScriptEs:
      '"Pero aqu\u00ed en {locationName} \u2014 sabes lo especial que es aqu\u00ed \u2014 en lugar de {currency}500, cobramos solo {currency}300."',

    promoLabel: '30% Off + Gift',
    promoLabelEs: '30% Descuento + Regalo',
    promoDescription: 'Amazing offer \u2014 best value single syringe',
    promoDescriptionEs: 'Oferta incre\u00edble \u2014 mejor valor jeringa individual',
    promoScript:
      '"Right now, we have an incredible promotion: take it for 30% off, which makes it {currency}210, and you\'ll also get a small gift \u2014 you can choose between a Day Cream, Night Cream, Cleanser, or Peeling."',
    promoScriptEs:
      '"Ahora mismo, tenemos una promoci\u00f3n incre\u00edble: ll\u00e9vatelo con 30% de descuento, lo que lo deja en {currency}210, y tambi\u00e9n recibir\u00e1s un peque\u00f1o regalo \u2014 puedes elegir entre una Crema de D\u00eda, Crema de Noche, Limpiador, o Peeling."',

    noGiftLabel: 'Remove Gift',
    noGiftLabelEs: 'Sin Regalo',
    noGiftDescription: 'Adaptive \u2014 take away the gift, lower the price',
    noGiftDescriptionEs: 'Adaptativo \u2014 quita el regalo, baja el precio',
    noGiftScript:
      '"You know what, I get it. Let\'s make it easier. I\'ll take away the gift \u2014 we usually value it at {currency}35 \u2014 and that will bring the syringe by itself down to {currency}175."',
    noGiftScriptEs:
      '"Sabes qu\u00e9, lo entiendo. Hag\u00e1moslo m\u00e1s f\u00e1cil. Le quitar\u00e9 el regalo \u2014 usualmente lo valoramos en {currency}35 \u2014 y eso bajar\u00e1 la jeringa sola a {currency}175."',

    voucherLabel: 'Voucher Close',
    voucherLabelEs: 'Cierre con Cup\u00f3n',
    voucherDescription: '20% voucher \u2014 final push, single syringe only',
    voucherDescriptionEs: 'Cup\u00f3n 20% \u2014 empuj\u00f3n final, solo jeringa individual',
    voucherScript:
      '"You know what, let me fix your other eye real quick." [Start the eye. Hands on her face, and NOW you talk money.] "Listen, I just checked something and I can do a small crazy offer for you. But you can\'t be greedy, okay? Remember I said without the gift it\'s {currency}175? With this little 20% voucher it comes down to {currency}140. One time only \u2014 next time it goes back to normal."',
    voucherScriptEs:
      '"\u00bfSabes qu\u00e9? D\u00e9jame arreglarte el otro ojo rapidito." [Empieza el ojo. Manos en su cara, y AHORA hablas de dinero.] "Mira, acabo de comprobar una cosa y te puedo hacer una locura peque\u00f1ita. Pero no seas avariciosa, \u00bfvale? \u00bfTe acuerdas de que sin el regalo eran {currency}175? Con este cuponcito del 20% se queda en {currency}140. Una sola vez \u2014 la pr\u00f3xima vuelve a lo normal."',

    minimumLabel: 'Minimum (Manager Only)',
    minimumLabelEs: 'M\u00ednimo (Solo el Encargado)',
    minimumDescription: 'Full market \u2014 the manager unlocks this, never you',
    minimumDescriptionEs: 'Mercado puro \u2014 esto lo abre el encargado, nunca t\u00fa',
    minimumScript:
      '"Look, I really want you to have this. Give me ten seconds." [Go and get the manager. You do not invent this number and you do not say it first.] MANAGER: "{currency}100. That is the bottom, and only because he asked me for you. Promise me you actually use it once a week."',
    minimumScriptEs:
      '"Mira, quiero de verdad que te lo lleves. Dame diez segundos." [Ve a por el encargado. Este n\u00famero no te lo inventas t\u00fa y no lo dices t\u00fa primero.] ENCARGADO: "{currency}100. Ese es el fondo, y solo porque me lo ha pedido \u00e9l por ti. Prom\u00e9teme que lo vas a usar una vez a la semana."',
  },

  /* ─── Voucher Close ─── */
  voucherClose: {
    sectionTitle: 'The Voucher Close',
    sectionTitleEs: 'El Cierre con Cup\u00f3n',
    exactWordsLabel: 'Exact Words \u2014 Say This (while you do her other eye)',
    exactWordsLabelEs: 'Palabras Exactas \u2014 Di Esto (mientras le haces el otro ojo)',
    voucherScript:
      "You know what, let me fix your other eye real quick. [Start it. Do not stop talking, do not let her stand up.] Listen, I just checked something and I can do a small crazy offer for you. But you can't be greedy, okay? I can't do this on the double syringe, only on the single one. Remember I told you that without the gift it's {currency}175? If you use this small 20% voucher, it brings it down to {currency}140. One time only \u2014 next time it goes back to normal.",
    voucherScriptEs:
      "\u00bfSabes qu\u00e9? D\u00e9jame arreglarte el otro ojo rapidito. [Empieza. No dejes de hablar, no dejes que se levante.] Mira, acabo de comprobar una cosa y te puedo hacer una locura peque\u00f1ita. Pero no seas avariciosa, \u00bfvale? En la jeringa doble no puedo, solo en la individual. \u00bfTe acuerdas de que te dije que sin el regalo eran {currency}175? Con este cuponcito del 20% se queda en {currency}140. Una sola vez \u2014 la pr\u00f3xima vuelve a lo normal.",
    twoPromisesLabel: 'The Two Promises',
    twoPromisesLabelEs: 'Las Dos Promesas',
    twoPromisesScript:
      '"You just promise me two things, okay? 1\ufe0f\u20e3 You\'re really going to use it once a week \u2014 not once a year. 2\ufe0f\u20e3 If you\'re happy, you\'ll tell your friends about us."',
    twoPromisesScriptEs:
      '"Solo me prometes dos cosas, \u00bfokey? 1\ufe0f\u20e3 Que realmente lo vas a usar una vez por semana \u2014 no una vez al a\u00f1o. 2\ufe0f\u20e3 Si est\u00e1s feliz, nos contar\u00e1s a tus amigas sobre nosotros."',
    whatsappLabel: 'The WhatsApp Close',
    whatsappLabelEs: 'El Cierre por WhatsApp',
    whatsappScript:
      '"You use WhatsApp, right? Perfect. You\'ll have my number and email \u2014 just let me know if you need anything or if you ever want to try something new later on."',
    whatsappScriptEs:
      '"\u00bfUsas WhatsApp, verdad? Perfecto. Tendr\u00e1s mi n\u00famero y correo \u2014 solo av\u00edsame si necesitas algo o si alguna vez quieres probar algo nuevo m\u00e1s adelante."',
    whatsappNote:
      'This creates a personal relationship \u2014 not just a transaction. But if she ever walks back in months later wanting another one, that is not your price to name: get the manager, or whoever on the floor has the most experience. It is not your sale to price.',
    whatsappNoteEs:
      'Esto crea una relaci\u00f3n personal \u2014 no solo una transacci\u00f3n. Pero si vuelve a entrar meses despu\u00e9s queriendo otra, ese precio no lo pones t\u00fa: busca al encargado, o a quien tenga m\u00e1s experiencia en la sala. No es tu venta para ponerle precio.',
  },

  /* ─── The Two Offers ───
     Mirrors peelingData.offers, and exists because this page used to skip it.
     The Partner Upsell section said "Now introduce Option 2" while Option 2's
     own section sat two sections further down and Option 1 was never presented
     at all — so a seller read an instruction to introduce a thing the page had
     not yet taught them. Option 1 is the promo rung, Option 2 is the second
     syringe; both are rungs on SYRINGE_LADDER in pricing.ts, so the numbers
     here cannot drift from the ladder below them. */
  offers: {
    heading: 'The Two Offers',
    headingEs: 'Las Dos Ofertas',
    subtext: 'Always present TWO choices. Let them decide. Then pause — silence is your friend.',
    subtextEs: 'Siempre presenta DOS opciones. Deja que decidan. Luego haz una pausa — el silencio es tu amigo.',
    option1: {
      label: 'Option 1',
      labelEs: 'Opci\u00f3n 1',
      priceLabel: '30% Off + Gift',
      priceLabelEs: '30% Descuento + Regalo',
      text:
        '"Right now we have an incredible promotion: take it for 30% off, which makes it {currency}210, and you also get a small gift \u2014 you can choose between a Day Cream, Night Cream, Cleanser or Peeling."',
      textEs:
        '"Ahora mismo tenemos una promoci\u00f3n incre\u00edble: ll\u00e9vatelo con un 30% de descuento, lo que lo deja en {currency}210, y adem\u00e1s te llevas un regalito \u2014 puedes elegir entre Crema de D\u00eda, Crema de Noche, Limpiador o Peeling."',
    },
    option2: {
      label: 'Option 2',
      labelEs: 'Opci\u00f3n 2',
      priceLabel: 'Full Price + 2nd Syringe Free',
      priceLabelEs: 'Precio Completo + 2\u00aa Jeringa Gratis',
      text:
        '"This one is actually the favourite: pay the normal price of {currency}300 and you get two syringes instead of one \u2014 so you can do both eyes, the forehead, the upper lip, even the number 11s between the eyebrows. A full face treatment that lasts a whole year."',
      textEs:
        '"Esta es en realidad la favorita: pagas el precio normal de {currency}300 y te llevas dos jeringas en vez de una \u2014 as\u00ed puedes hacerte los dos ojos, la frente, el labio superior, hasta las arruguitas del ce\u00f1o. Un tratamiento facial completo que dura un a\u00f1o entero."',
    },
    twoChoiceLabel: 'Then ask, and stop talking',
    twoChoiceLabelEs: 'Luego pregunta, y c\u00e1llate',
    twoChoiceScript:
      '"So \u2014 would you rather have the 30% off at {currency}210 with a free gift, or the two-syringe deal at {currency}300?"',
    twoChoiceScriptEs:
      '"Entonces \u2014 \u00bfprefieres el 30% de descuento a {currency}210 con un regalo, o la oferta de dos jeringas a {currency}300?"',
  },

  /* ─── Offer 2 ─── */
  offer2: {
    sectionTitle: 'Offer 2 \u2014 {currency}300 + 2nd Syringe Free',
    sectionTitleEs: 'Oferta 2 \u2014 {currency}300 + 2da Jeringa Gratis',
    description:
      'This is the <strong>favorite option</strong> for most customers. They pay the full {locationName} price but walk away with double the value.',
    descriptionEs:
      'Esta es la <strong>opci\u00f3n favorita</strong> para la mayor\u00eda de clientes. Pagan el precio completo de {locationName} pero se llevan el doble de valor.',
    scriptLabel: 'Script',
    scriptLabelEs: 'Gui\u00f3n',
    script:
      '"This one is actually the favorite: pay the normal price of {currency}300, and you\'ll get two syringes instead of one \u2014 so you can treat both eyes, the forehead, the upper lip, and even the number 11s between the eyebrows. That\'s a full face treatment that lasts a whole year."',
    scriptEs:
      '"Esta es en realidad la favorita: paga el precio normal de {currency}300, y obtendr\u00e1s dos jeringas en lugar de una \u2014 as\u00ed puedes tratar ambos ojos, la frente, el labio superior, e incluso los n\u00famero 11 entre las cejas. Eso es un tratamiento facial completo que dura un a\u00f1o entero."',
    whatTheyGetLabel: 'What they get',
    whatTheyGetLabelEs: 'Lo que reciben',
    whatTheyGetValue: '2 Syringes',
    whatTheyGetValueEs: '2 Jeringas',
    treatsLabel: 'Treats',
    treatsLabelEs: 'Trata',
    treatsValue: 'Eyes + Forehead + 11s',
    treatsValueEs: 'Ojos + Frente + 11s',
  },

  /* ─── Pro Tips ─── */
  proTips: {
    sectionTitle: 'Pro Tips',
    sectionTitleEs: 'Consejos Pro',
    tips: [
      {
        icon: 'Euro',
        title: 'Always start with the Europe price',
        titleEs: 'Siempre empieza con el precio de Europa',
        text: '{currency}500 is the anchor. Everything after feels like a bargain. Never mention the minimum first.',
        textEs: '{currency}500 es el ancla. Todo lo despu\u00e9s se siente como una ganga. Nunca menciones el m\u00ednimo primero.',
      },
      {
        icon: 'Eye',
        title: 'One eye only \u2014 the other one is your close',
        titleEs: 'Un ojo solo \u2014 el otro es tu cierre',
        text: "I never do the other eye. Sometimes, inside the speech, I say I will do it in order to close. That is what it is for: at {currency}175, before she stands up \u2014 \"you know what, let me fix your other eye real quick\" \u2014 and the voucher comes out WHILE you are doing it. Never a freebie.",
        textEs: 'Yo nunca hago el otro ojo. A veces, dentro del discurso, digo que se lo hago para cerrar. Para eso est\u00e1: a {currency}175, antes de que se levante \u2014 "\u00bfsabes qu\u00e9? d\u00e9jame arreglarte el otro ojo rapidito" \u2014 y el cup\u00f3n sale MIENTRAS se lo haces. Nunca de regalo.',
      },
      {
        icon: 'Eye',
        title: 'She asks for the second eye first?',
        titleEs: '\u00bfTe pide el segundo ojo antes?',
        text: 'Condition it, do not refuse it: "If you buy it, I\'ll do the other one, yeah?" She pays, she gets it done, no argument and no theatre. What you never do is hand it over to a maybe.',
        textEs: 'Ponle condici\u00f3n, no le digas que no: "Si te lo llevas, te hago el otro, \u00bfvale?" Si paga, se lo haces, sin discusi\u00f3n y sin teatro. Lo que nunca haces es regal\u00e1rselo a un quiz\u00e1.',
      },
      {
        icon: 'Users',
        title: 'Engage the partner ALWAYS',
        titleEs: 'Involucra a la pareja SIEMPRE',
        text: "Bring him IN first, every time \u2014 the joke, the reveal, the close. He is often the real decision-maker. Only if he is genuinely bad energy do you turn and give everything to her.",
        textEs: 'M\u00e9telo DENTRO primero, siempre \u2014 la broma, la revelaci\u00f3n, el cierre. Muchas veces decide \u00e9l de verdad. Solo si trae muy mala energ\u00eda te giras y se lo das todo a ella.',
      },
      {
        icon: 'MessageCircle',
        title: "If they smile, they buy",
        titleEs: 'Si sonr\u00eden, compran',
        text: "Keep humor alive. Playful energy opens wallets. If they're not smiling, they're not buying.",
        textEs: 'Mant\u00e9n el humor vivo. La energ\u00eda juguetona abre carteras. Si no est\u00e1n sonriendo, no est\u00e1n comprando.',
      },
      {
        icon: 'ShieldCheck',
        title: '100% natural \u2014 no chemicals',
        titleEs: '100% natural \u2014 sin qu\u00edmicos',
        text: 'Always mention this early. It removes fear and positions the product as safe and premium.',
        textEs: 'Siempre menciona esto temprano. Elimina el miedo y posiciona el producto como seguro y premium.',
      },
      {
        icon: 'TrendingDown',
        title: 'Go down the ladder one step at a time',
        titleEs: 'Baja la escalera un paso a la vez',
        text: "Never jump from {currency}300 to {currency}140. Walk down slowly. Each step feels like you're doing them a favor.",
        textEs: 'Nunca saltes de {currency}300 a {currency}140. Baja despacio. Cada paso se siente como si les estuvieras haciendo un favor.',
      },
      {
        icon: 'Euro',
        title: 'One voucher, once — the manager owns the floor',
        titleEs: 'Un cupón, una vez — el fondo es del encargado',
        text: 'You use the voucher once, {currency}175 to {currency}140, with the extra 20%. There is no second voucher — inventing another one tells her the first was invented too. Below that you go full market and you CALL A MANAGER to reach {currency}100.',
        textEs: 'El cupón lo usas una vez, de {currency}175 a {currency}140, con el 20% extra. No hay segundo cupón — inventarte otro le dice que el primero también te lo inventaste. Por debajo vas a mercado puro y LLAMAS AL ENCARGADO para llegar a {currency}100.',
      },
      {
        icon: 'HeartHandshake',
        title: 'Your job ends at the syringe',
        titleEs: 'Tu trabajo se acaba en la jeringa',
        text: 'She paid. Do NOT start selling her a scrub. Build the specialist up — only here a short time, amazing at what he does — "just because you got this, I\'m going to spoil you with a small gift. What is more important for you, if you could get it lifted: the cheeks, or the neck? Would that make you happy? Let me check with him, if you have one second." Then you go and get him. She stays in the chair.',
        textEs: 'Ha pagado. NO te pongas a venderle un exfoliante. Móntale al especialista — está poco tiempo, es un crack en lo suyo — "solo porque te has llevado esto, te voy a mimar con un regalito. ¿Qué es más importante para ti, si pudieras levantarlo: los pómulos o el cuello? ¿Eso te haría feliz? Déjame consultarlo con él, si tienes un segundo." Y vas tú a buscarlo. Ella se queda en la silla.',
      },
      {
        icon: 'HeartHandshake',
        title: 'The two promises seal loyalty',
        titleEs: 'Las dos promesas sellan la lealtad',
        text: '"Promise me you\'ll use it. Promise me you\'ll tell your friends." This turns buyers into ambassadors.',
        textEs: '"Prom\u00e9teme que lo usar\u00e1s. Prom\u00e9teme que le contar\u00e1s a tus amigas." Esto convierte compradores en embajadores.',
      },
      {
        icon: 'Sparkles',
        title: 'This is your crown jewel',
        titleEs: 'Esta es tu joya de la corona',
        text: "The syringe pitch is your strongest weapon. It sells on emotion, proof, and trust. Practice it until it's second nature.",
        textEs: 'El pitch de la jeringa es tu arma m\u00e1s fuerte. Se vende con emoci\u00f3n, prueba y confianza. Pract\u00edcala hasta que sea segunda naturaleza.',
      },
    ] as ProTip[],
  },

  /* ─── Quick Reference ─── */
  quickRef: {
    sectionTitle: 'Quick Reference',
    sectionTitleEs: 'Referencia R\u00e1pida',
    useLabel: 'Use:',
    useLabelEs: 'Uso:',
    useValue: 'Once/week',
    useValueEs: '1 vez/semana',
    lastsLabel: 'Lasts:',
    lastsLabelEs: 'Duraci\u00f3n:',
    lastsValue: '1 year',
    lastsValueEs: '1 a\u00f1o',
    resultsLabel: 'Results:',
    resultsLabelEs: 'Resultados:',
    resultsValue: '6-18 months',
    resultsValueEs: '6-18 meses',
    ruleLabel: 'Rule:',
    ruleLabelEs: 'Regla:',
    ruleValue: 'No touching 5h',
    ruleValueEs: 'No tocar 5h',
  },
};

/* ------------------------------------------------------------------ */
/*  Helper: build dynamic PriceStep[] with current locale             */
/* ------------------------------------------------------------------ */
export function getLocalizedPriceSteps(
  currency: string,
  locationName: string,
  isEs: boolean
): PriceStep[] {
  const d = syringeData.priceSteps;
  return [
    {
      price: `${currency}${SYRINGE_LADDER.europeAnchor}`,
      label: isEs
        ? d.europeLabelEs
        : d.europeLabel,
      labelEs: d.europeLabelEs,
      description: isEs
        ? d.europeDescriptionEs
        : d.europeDescription,
      descriptionEs: d.europeDescriptionEs,
      script: isEs
        ? d.europeScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)
        : d.europeScript.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      scriptEs: d.europeScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      isHighlight: false,
    },
    {
      price: `${currency}${SYRINGE_LADDER.base}`,
      label: isEs
        ? d.locationLabelEs.replace('{locationName}', locationName)
        : d.locationLabel.replace('{locationName}', locationName),
      labelEs: d.locationLabelEs.replace('{locationName}', locationName),
      description: isEs
        ? d.locationDescriptionEs
        : d.locationDescription,
      descriptionEs: d.locationDescriptionEs,
      script: isEs
        ? d.locationScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)
        : d.locationScript.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      scriptEs: d.locationScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      isHighlight: false,
    },
    {
      price: `${currency}${RUNG('promo')}`,
      label: isEs ? d.promoLabelEs : d.promoLabel,
      labelEs: d.promoLabelEs,
      description: isEs ? d.promoDescriptionEs : d.promoDescription,
      descriptionEs: d.promoDescriptionEs,
      script: isEs
        ? d.promoScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)
        : d.promoScript.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      scriptEs: d.promoScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      isHighlight: true,
    },
    {
      price: `${currency}${RUNG('no-gift')}`,
      label: isEs ? d.noGiftLabelEs : d.noGiftLabel,
      labelEs: d.noGiftLabelEs,
      description: isEs ? d.noGiftDescriptionEs : d.noGiftDescription,
      descriptionEs: d.noGiftDescriptionEs,
      script: isEs
        ? d.noGiftScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)
        : d.noGiftScript.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      scriptEs: d.noGiftScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      isHighlight: false,
    },
    {
      price: `${currency}${RUNG('voucher')}`,
      label: isEs ? d.voucherLabelEs : d.voucherLabel,
      labelEs: d.voucherLabelEs,
      description: isEs ? d.voucherDescriptionEs : d.voucherDescription,
      descriptionEs: d.voucherDescriptionEs,
      script: isEs
        ? d.voucherScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)
        : d.voucherScript.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      scriptEs: d.voucherScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      isVoucher: true,
      isHighlight: false,
    },
    {
      price: `${currency}${SYRINGE_LADDER.floor}`,
      label: isEs ? d.minimumLabelEs : d.minimumLabel,
      labelEs: d.minimumLabelEs,
      description: isEs ? d.minimumDescriptionEs : d.minimumDescription,
      descriptionEs: d.minimumDescriptionEs,
      script: isEs
        ? d.minimumScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)
        : d.minimumScript.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      scriptEs: d.minimumScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName),
      isMinimum: true,
      isHighlight: false,
    },
  ];
}

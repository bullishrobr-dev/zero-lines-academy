/* ------------------------------------------------------------------ */
/*  Nail Kit Page — Bilingual Data (EN / ES-MX)                       */
/* ------------------------------------------------------------------ */

export interface OfferData {
  title: string;
  price: string;
  subtitle: string;
  items: string[];
  tag: string;
  isHighlight: boolean;
  script: string;
}

export interface TipData {
  iconName: string;
  title: string;
  text: string;
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
const hero = {
  back: 'Back',
  backEs: 'Atr\u00E1s',
  badge: '60-Second Demo',
  badgeEs: 'Demo de 60 Segundos',
  title: 'Nail Kit',
  titleEs: 'Kit de U\u00F1as',
  subtitle: '60-Second Salon Shine',
  subtitleEs: 'Brillo de Sal\u00F3n en 60 Segundos',
  statDemoTime: 'Demo Time',
  statDemoTimeEs: 'Tiempo de Demo',
  statDemoValue: '60 Seconds',
  statDemoValueEs: '60 Segundos',
  statWarranty: 'Warranty',
  statWarrantyEs: 'Garant\u00EDa',
  statWarrantyValue: 'Lifetime',
  statWarrantyValueEs: 'De por Vida',
  statShineLasts: 'Shine Lasts',
  statShineLastsEs: 'Duraci\u00F3n del Brillo',
  statShineValue: '2 Weeks',
  statShineValueEs: '2 Semanas',
};

/* ------------------------------------------------------------------ */
/*  The Hook                                                           */
/* ------------------------------------------------------------------ */
const hook = {
  sectionTitle: 'The Hook \u2014 Stop Scripts',
  sectionTitleEs: 'El Gancho \u2014 Scripts de Parada',
  complimentLabel: 'The Natural Nail Compliment',
  complimentLabelEs: 'El Cumplido de U\u00F1a Natural',
  complimentScript:
    '"Wow! You always keep your nails natural? That\'s awesome. Let me give you a small gift \u2014 you\'re gonna love this."',
  complimentScriptEs:
    '"\u00A1Wow! \u00BFSiempre mantienes tus u\u00F1as naturales? Eso es genial. D\u00E9jame darte un peque\u00F1o regalo \u2014 te va a encantar."',
  complimentCoaching:
    "Say it confidently, smile, and lead inside immediately. No hesitation, no questions.",
  complimentCoachingEs:
    "Dilo con confianza, sonr\u00EDe y gu\u00EDala adentro de inmediato. Sin dudar, sin preguntas.",
  sceneLabel: 'Setting the Scene',
  sceneLabelEs: 'Preparando la Escena',
  sceneScript:
    '"So this isn\'t your typical nail buffer \u2014 it\'s a professional system that keeps your nails shiny and healthy for up to two weeks without any polish."',
  sceneScriptEs:
    '"As\u00ED que este no es tu lima de u\u00F1as t\u00EDpica \u2014 es un sistema profesional que mantiene tus u\u00F1as brillantes y saludables por hasta dos semanas sin ning\u00FAn esmalte."',
  sceneCoaching:
    'Unbox it slowly while you talk \u2014 create curiosity and ownership.',
  sceneCoachingEs:
    'Desemp\u00E1calo lentamente mientras hablas \u2014 crea curiosidad y sentido de propiedad.',
};

/* ------------------------------------------------------------------ */
/*  3-Step Demo                                                        */
/* ------------------------------------------------------------------ */
const demo = {
  sectionTitle: 'The 3-Step Demo',
  sectionTitleEs: 'La Demo de 3 Pasos',
  description:
    'The magic is in the buildup. Steps 1 and 2 create suspense. Step 3 is the WOW.',
  descriptionEs:
    'La magia est\u00E1 en la acumulaci\u00F3n. Los pasos 1 y 2 crean suspense. El paso 3 es el WOW.',

  // Step 1
  step1Label: 'Grey Side',
  step1LabelEs: 'Lado Gris',
  step1Title: 'Step 1 \u2014 Smooth',
  step1TitleEs: 'Paso 1 \u2014 Alisar',
  step1Instruction:
    'Hold her hand gently. Start with the first two steps on one nail.',
  step1InstructionEs:
    'Sost\u00E9n su mano suavemente. Empieza con los dos primeros pasos en una u\u00F1a.',
  step1Script:
    '"Most buffers you see remove the top layer of your nail to make it shiny \u2014 that\'s actually bad. It makes the nails weak and thin. This one\'s different. It smooths, shapes, but doesn\'t remove anything."',
  step1ScriptEs:
    '"La mayor\u00EDa de las limas que ves remueven la capa superior de tu u\u00F1a para hacerla brillar \u2014 eso en realidad es malo. Hace las u\u00F1as d\u00E9biles y delgadas. Esta es diferente. Alisa, da forma, pero no remueve nada."',
  step1Coaching:
    '"See? Nothing dramatic yet \u2014 now wait for the last step."',
  step1CoachingEs:
    '"\u00BFVes? Nada dram\u00E1tico todav\u00EDa \u2014 ahora espera el \u00FAltimo paso."',
  step1CoachingPrefix: 'Show the nail \u2014 not shiny yet. ',
  step1CoachingPrefixEs: 'Muestra la u\u00F1a \u2014 a\u00FAn no brilla. ',

  // Step 2
  step2Label: 'White Side \u2014 Prep',
  step2LabelEs: 'Lado Blanco \u2014 Preparaci\u00F3n',
  step2Title: 'Step 2 \u2014 Polish',
  step2TitleEs: 'Paso 2 \u2014 Pulir',
  step2Instruction: 'Use the white strip, buff gently.',
  step2InstructionEs: 'Usa la tira blanca, pule suavemente.',
  step2Script:
    '"Feel that? It\'s soft, not rough. It\'s actually pushing your natural oils up to the surface \u2014 that\'s what gives the shine and strengthens the nail."',
  step2ScriptEs:
    '"\u00BFSientes eso? Es suave, no \u00E1spera. En realidad est\u00E1 empujando tus aceites naturales hacia la superficie \u2014 eso es lo que da el brillo y fortalece la u\u00F1a."',

  // Step 3
  step3Label: 'THE WOW MOMENT',
  step3LabelEs: 'EL MOMENTO WOW',
  step3Title: 'Step 3 \u2014 Shine (The Close)',
  step3TitleEs: 'Paso 3 \u2014 Brillo (El Cierre)',
  step3Instruction: 'Pause. Lower your voice. Build suspense.',
  step3InstructionEs: 'Pausa. Baja la voz. Crea suspense.',
  step3Teaser: '"Promise not to scream?"',
  step3TeaserEs: '"\u00BFPrometes no gritar?"',
  step3Script:
    '"WOWOWOWOW! \uD83D\uDE04 Look at that \u2014 that\'s your natural nail! No polish, no chemicals \u2014 and it stays shiny like this for two whole weeks."',
  step3ScriptEs:
    '"\u00A1WOWOWOWOW! \uD83D\uDE04 \u00BFMira eso \u2014 esa es tu u\u00F1a natural! Sin esmalte, sin qu\u00EDmicos \u2014 y se mantiene brillante as\u00ED por dos semanas enteras."',
  step3Coaching:
    "If she's with a partner or friend, make them part of the reaction \u2014 laughter = comfort = buying mode.",
  step3CoachingEs:
    "Si est\u00E1 con una pareja o amiga, hazlos parte de la reacci\u00F3n \u2014 risa = comodidad = modo de compra.",
};

/* ------------------------------------------------------------------ */
/*  Warranty Pitch                                                     */
/* ------------------------------------------------------------------ */
const warranty = {
  sectionTitle: 'The Warranty Pitch',
  sectionTitleEs: 'El Pitch de Garant\u00EDa',
  description:
    'The lifetime warranty is one of your strongest closes. It removes all risk and creates unbelievable perceived value.',
  descriptionEs:
    'La garant\u00EDa de por vida es uno de tus cierres m\u00E1s fuertes. Elimina todo riesgo y crea un valor percibido incre\u00EDble.',
  presentKitLabel: 'Present the Full Kit',
  presentKitLabelEs: 'Presenta el Kit Completo',
  presentKitScript:
    '"Everything you saw comes in this full kit \u2014 buffer, professional file, cuticle oil, and cream. And the best part \u2014 the buffer has a lifetime warranty. No matter what happens \u2014 if it breaks, if it wears out, even if your dog eats it \u2014 you can exchange it in any of our stores worldwide."',
  presentKitScriptEs:
    '"Todo lo que viste viene en este kit completo \u2014 lima, archivo profesional, aceite para cut\u00EDcula y crema. Y lo mejor \u2014 la lima tiene garant\u00EDa de por vida. No importa qu\u00E9 pase \u2014 si se rompe, si se desgasta, incluso si tu perro se la come \u2014 puedes cambiarla en cualquiera de nuestras tiendas en todo el mundo."',
  coachingIntro: 'Let them laugh \u2014 humor lowers the guard. Then close the logic:',
  coachingIntroEs: 'D\u00E9jalos re\u00EDr \u2014 el humor baja la guardia. Luego cierra con la l\u00F3gica:',
  coachingScript:
    '"It\'s one simple kit, one design \u2014 there are no colors or versions to choose from. This is the one everyone loves."',
  coachingScriptEs:
    '"Es un kit simple, un dise\u00F1o \u2014 no hay colores ni versiones para elegir. Este es el que todos aman."',
  statWarrantyLabel: 'Warranty',
  statWarrantyLabelEs: 'Garant\u00EDa',
  statWarrantyValue: 'Lifetime \u2014 Any Store',
  statWarrantyValueEs: 'De por Vida \u2014 Cualquier Tienda',
  statKitLabel: 'Kit Includes',
  statKitLabelEs: 'El Kit Incluye',
  statKitValue: 'Buffer, File, Oil, Cream',
  statKitValueEs: 'Lima, Archivo, Aceite, Crema',
};

/* ------------------------------------------------------------------ */
/*  Price & Offers Section                                             */
/* ------------------------------------------------------------------ */
const price = {
  sectionTitle: 'Price & Offers',
  sectionTitleEs: 'Precio y Ofertas',
  description:
    'Tap any price to copy. Always anchor with Europe first.',
  descriptionEs:
    'Toca cualquier precio para copiar. Siempre ancla con Europa primero.',
  europeLabel: 'Europe Price',
  europeLabelEs: 'Precio Europa',
  locationPriceLabel: '{locationName} Price',
  locationPriceLabelEs: 'Precio {locationName}',
  scriptLabel: 'Script',
  scriptLabelEs: 'Gui\u00F3n',
};

/* ------------------------------------------------------------------ */
/*  Offers (dynamic \u2014 needs currency + locationName + isEs)         */
/* ------------------------------------------------------------------ */
function getOffersData(
  currency: string,
  locationName: string,
  isEs: boolean
): OfferData[] {
  if (isEs) {
    return [
      {
        title: 'Compra 2 y Lleva 1 Gratis',
        price: `${currency}120`,
        subtitle: 'Tr\u00EDo cl\u00E1sico \u2014 oferta m\u00E1s popular',
        items: [
          '3 Kits de U\u00F1as completos',
          'Perfecto para regalos',
          `${currency}40 por kit efectivo`,
        ],
        tag: 'M\u00E1s Popular',
        isHighlight: true,
        script: `"Ahora tenemos una oferta incre\u00EDble: si compras dos, te llevas uno gratis. As\u00ED que pagas ${currency}120 y te llevas tres kits completos. Por eso todos los agarran durante las fiestas \u2014 son los regalos de Navidad perfectos. Peque\u00F1os, elegantes y realmente \u00FAtiles."`,
      },
      {
        title: 'Compra 2 y Lleva 2 (Navidad)',
        price: `${currency}120`,
        subtitle: 'Navidad premium \u2014 cuatro por el precio de dos',
        items: [
          '4 Kits de U\u00F1as completos',
          'Uno para ti, tres para regalar',
          `${currency}30 por kit efectivo`,
        ],
        tag: 'Navidad',
        isHighlight: false,
        script: `"Sabes qu\u00E9, se acerca la Navidad \u2014 hagamos algo especial. En lugar de Compra 2 y Lleva 1, te hago Compra 2 y Lleva 2. Te llevar\u00E1s cuatro kits completos por ${currency}120 \u2014 uno para ti, uno para mam\u00E1, uno para tu hermana, uno para una amiga. Las compras navide\u00F1as m\u00E1s f\u00E1ciles de la historia."`,
      },
      {
        title: 'Mezcla y Combina (Compra 1 y Lleva 1)',
        price: `${currency}60`,
        subtitle: 'Combo flexible \u2014 preparaci\u00F3n para venta cruzada',
        items: [
          'Kit de U\u00F1as + Exfoliante',
          'Kit de U\u00F1as + Mantequilla Corporal',
          'Par de introducci\u00F3n perfecto',
        ],
        tag: 'Flexible',
        isHighlight: false,
        script: `"Te digo algo \u2014 te hago algo mejor. En lugar de solo un kit, te hago Compra 1 y Lleva 1 Gratis por ${currency}60, y puedes mezclar y combinar con nuestro Exfoliante o Mantequilla Corporal. As\u00ED que puedes llevar un Kit de U\u00F1as y un Exfoliante \u2014 o un Kit y una Mantequilla \u2014 siguen siendo ${currency}60 en total."`,
      },
      {
        title: 'Cierre de \u00DAnico Kit de Temporada',
        price: `${currency}30`,
        subtitle: 'Empuj\u00F3n final \u2014 kit completo a mitad de precio',
        items: [
          'Kit completo (no solo la lima)',
          'Garant\u00EDa de por vida incluida',
          'Abre la puerta para regresar',
        ],
        tag: '',
        isHighlight: false,
        script: `"Mira, veo cu\u00E1nto te encant\u00F3. El kit normalmente es ${currency}60, y la lima sola ya lo justifica con la garant\u00EDa de por vida. Pero como son las fiestas y realmente quiero que lo disfrutes, te doy el kit completo \u2014 lima, archivo, aceite y crema \u2014 por solo ${currency}30. Es mi manera de abrir la puerta \u2014 pru\u00E9balo, \u00Fasalo, \u00E1malo. La pr\u00F3xima vez que est\u00E9s en ${locationName}, regresar\u00E1s por el segundo, te lo prometo."`,
      },
    ];
  }

  return [
    {
      title: 'Buy 2 Get 1 Free',
      price: `${currency}120`,
      subtitle: 'Classic trio \u2014 most popular offer',
      items: [
        '3 full Nail Kits',
        'Perfect for gifts',
        `${currency}40 per kit effective`,
      ],
      tag: 'Most Popular',
      isHighlight: true,
      script: `"Right now we've got an amazing offer: if you buy two, you get one free. So you pay ${currency}120 and walk away with three full kits. That's why everyone grabs these during the holidays \u2014 they make the perfect Christmas gifts. Small, elegant, and actually useful."`,
    },
    {
      title: 'Buy 2 Get 2 (Christmas)',
      price: `${currency}120`,
      subtitle: 'Premium Christmas \u2014 four for the price of two',
      items: [
        '4 full Nail Kits',
        'One for you, three for gifts',
        `${currency}30 per kit effective`,
      ],
      tag: 'Christmas',
      isHighlight: false,
      script: `"You know what, Christmas is coming \u2014 let's do something special. Instead of Buy 2, Get 1, I'll do Buy 2, Get 2. You'll get four full kits for ${currency}120 \u2014 one for you, one for mom, one for sister, one for a friend. Easiest Christmas shopping ever."`,
    },
    {
      title: 'Mix & Match (Buy 1 Get 1)',
      price: `${currency}60`,
      subtitle: 'Flexible combo \u2014 cross-sell setup',
      items: [
        'Nail Kit + Scrub',
        'Nail Kit + Body Butter',
        'Perfect intro pair',
      ],
      tag: 'Flexible',
      isHighlight: false,
      script: `"Tell you what \u2014 I'll do something better for you. Instead of just one kit, I'll do Buy 1, Get 1 Free for ${currency}60, and you can mix and match it with our Scrub or Body Butter. So you can take one Nail Kit and one Scrub \u2014 or one Kit and one Butter \u2014 still ${currency}60 total."`,
    },
    {
      title: 'Single Kit Holiday Close',
      price: `${currency}30`,
      subtitle: 'Final push \u2014 whole kit at half the normal price',
      items: [
        'Full kit (not just buffer)',
        'Lifetime warranty included',
        'Opens door for return',
      ],
      tag: '',
      isHighlight: false,
      script: `"Alright, you know what \u2014 I can see how much you loved it. The kit is normally ${currency}60, and the buffer alone justifies that with the lifetime warranty. But since it's the holidays and I really want you to enjoy it, I'll do the whole kit \u2014 buffer, file, oil and cream \u2014 for just ${currency}30. It's my way of opening the door \u2014 try it, use it, love it. Next time you're in ${locationName}, you'll come back for the second one, I promise."`,
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Emotional Connection                                               */
/* ------------------------------------------------------------------ */
const emotional = {
  sectionTitle: 'Emotional Connection',
  sectionTitleEs: 'Conexi\u00F3n Emocional',
  script1:
    "You know, this isn't just about beauty \u2014 it's about that little daily detail that makes you feel fresh and confident. Every time you look at your hands, you'll feel clean, polished, and taken care of.",
  script1Es:
    "Sabes, esto no es solo sobre belleza \u2014 se trata de ese peque\u00F1o detalle diario que te hace sentir fresca y segura. Cada vez que veas tus manos, te sentir\u00E1s limpia, pulida y cuidada.",
  script2Template:
    "And if you think about it \u2014 {currency}60 for something that replaces salon visits for years \u2014 it's a no-brainer.",
  script2TemplateEs:
    "Y si lo piensas \u2014 {currency}60 por algo que reemplaza visitas al sal\u00F3n por a\u00F1os \u2014 es una decisi\u00F3n f\u00E1cil.",
  coaching:
    'Keep the tone friendly, not pushy \u2014 this pitch should feel like a fun chat, not a sale.',
  coachingEs:
    'Mant\u00E9n el tono amigable, no insistente \u2014 este pitch debe sentirse como una charla divertida, no como una venta.',
};

/* ------------------------------------------------------------------ */
/*  Pro Tips (dynamic \u2014 needs currency)                               */
/* ------------------------------------------------------------------ */
const proTipsStatic = {
  sectionTitle: 'Pro Tips',
  sectionTitleEs: 'Consejos Pro',
};

function getProTipsData(currency: string, isEs: boolean): TipData[] {
  if (isEs) {
    return [
      {
        iconName: 'Sparkles',
        title: 'D\u00E9jalas sentir el brillo antes de mostrar el precio',
        text: 'El momento WOW en el Paso 3 es tu cierre. Nunca menciones el precio antes de que vean el espejo. La prueba visual se vende sola.',
      },
      {
        iconName: 'Shield',
        title: '"Incluso si tu perro se la come" \u2014 usa la garant\u00EDa',
        text: "La garant\u00EDa de por vida es tu eliminador de riesgo. La l\u00EDnea del 'perro se la come' las hace re\u00EDr y recordar. \u00DAsala siempre.",
      },
      {
        iconName: 'Gift',
        title: 'Menciona regalos de Navidad naturalmente',
        text: '"Peque\u00F1os, elegantes y realmente \u00FAtiles." Durante temporada alta, cada demo debe incluir una referencia a regalos.',
      },
      {
        iconName: 'Package',
        title: 'Compra 2, Lleva 2 para compradores incre\u00EDbles',
        text: `Cuando la energ\u00EDa es alta y tienen una lista navide\u00F1a \u2014 este es tu cierre por volumen. Cuatro kits a ${currency}120 son ${currency}30 por kit.`,
      },
      {
        iconName: 'Hand',
        title: 'Compra 1, Lleva 1 Mezcla y Combina para cierres r\u00E1pidos',
        text: `${currency}60 por un Kit de U\u00F1as + Exfoliante/Mantequilla es un s\u00ED f\u00E1cil. Tambi\u00E9n prepara tu venta cruzada perfectamente.`,
      },
      {
        iconName: 'TrendingDown',
        title: `${currency}30 kit \u00FAnico \u2014 la l\u00EDnea de regalo de temporada`,
        text: "Tu salida elegante que a\u00FAn crea un cliente. Enm\u00E1rcalo como un regalo de ti: 'Es mi manera de abrir la puerta.'",
      },
      {
        iconName: 'Star',
        title: 'Crea suspense antes del WOW',
        text: '"\u00BFPrometes no gritar?" \u2014 esta l\u00EDnea crea anticipaci\u00F3n. El contraste entre la acumulaci\u00F3n y la revelaci\u00F3n es lo que las hace comprar.',
      },
      {
        iconName: 'Clock',
        title: 'R\u00E1pido, divertido y buena onda',
        text: 'Esta es una demo de 60 segundos. Mant\u00E9n la energ\u00EDa alta, mu\u00E9vete r\u00E1pido y celebra su reacci\u00F3n. Si sonr\u00EDen, compran.',
      },
    ];
  }

  return [
    {
      iconName: 'Sparkles',
      title: 'Let them feel the shine before showing price',
      text: 'The WOW moment in Step 3 is your close. Never mention price before they see the mirror. The visual proof sells itself.',
    },
    {
      iconName: 'Shield',
      title: '"Even if your dog eats it" \u2014 use the warranty',
      text: "The lifetime warranty is your risk-remover. The 'dog eats it' line makes them laugh and remember. Use it every time.",
    },
    {
      iconName: 'Gift',
      title: 'Mention Christmas gifts naturally',
      text: '"Small, elegant, and actually useful." During peak season, every demo should include a gift reference.',
    },
    {
      iconName: 'Package',
      title: 'Buy 2, Get 2 for amazing buyers',
      text: `When the energy is high and they have a Christmas list \u2014 this is your volume close. Four kits at ${currency}120 is ${currency}30 per kit.`,
    },
    {
      iconName: 'Hand',
      title: 'Buy 1, Get 1 Mix & Match for quick closes',
      text: `${currency}60 for a Nail Kit + Scrub/Butter is an easy yes. It also sets up your cross-sell perfectly.`,
    },
    {
      iconName: 'TrendingDown',
      title: `${currency}30 single kit \u2014 the holiday gift line`,
      text: "Your graceful exit that still creates a customer. Frame it as a gift from you: 'It's my way of opening the door.'",
    },
    {
      iconName: 'Star',
      title: 'Build suspense before the WOW',
      text: '"Promise not to scream?" \u2014 this line creates anticipation. The contrast between the buildup and the reveal is what makes them buy.',
    },
    {
      iconName: 'Clock',
      title: 'Fast, fun, and feel-good',
      text: 'This is a 60-second demo. Keep energy high, move quickly, and celebrate their reaction. If they smile, they buy.',
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Quick Reference                                                    */
/* ------------------------------------------------------------------ */
const quickRef = {
  sectionTitle: 'Quick Reference',
  sectionTitleEs: 'Referencia R\u00E1pida',
  demoLabel: 'Demo:',
  demoLabelEs: 'Demo:',
  demoValue: '60 seconds',
  demoValueEs: '60 segundos',
  shineLabel: 'Shine lasts:',
  shineLabelEs: 'Duraci\u00F3n del brillo:',
  shineValue: '2 weeks',
  shineValueEs: '2 semanas',
  warrantyLabel: 'Warranty:',
  warrantyLabelEs: 'Garant\u00EDa:',
  warrantyValue: 'Lifetime',
  warrantyValueEs: 'De por vida',
  noPolishLabel: 'No polish:',
  noPolishLabelEs: 'Sin esmalte:',
  noPolishValue: 'Natural shine',
  noPolishValueEs: 'Brillo natural',
};

/* ------------------------------------------------------------------ */
/*  Icon name lookup for Pro Tips                                      */
/* ------------------------------------------------------------------ */
const iconMap = [
  'Sparkles',
  'Shield',
  'Gift',
  'Package',
  'Hand',
  'TrendingDown',
  'Star',
  'Clock',
] as const;

export type IconName = (typeof iconMap)[number];

/* ------------------------------------------------------------------ */
/*  Aggregated export                                                  */
/* ------------------------------------------------------------------ */
export const nailKitData = {
  hero,
  hook,
  demo,
  warranty,
  price,
  emotional,
  quickRef,
  proTips: proTipsStatic,
  getOffers: getOffersData,
  getProTips: getProTipsData,
};

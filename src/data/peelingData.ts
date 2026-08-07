/* ------------------------------------------------------------------ */
/*  PeelingPage — Bilingual Data (EN / ES-MX)                         */
/* ------------------------------------------------------------------ */

export interface PriceStepData {
  price: string;               // template — e.g. `${currency}200`
  label: string;
  labelEs: string;
  description: string;
  descriptionEs: string;
  script: string;              // may contain ${currency} / ${locationName}
  scriptEs: string;            // may contain ${currency} / ${locationName}
  isMinimum?: boolean;
  isVoucher?: boolean;
  isHighlight?: boolean;
}

export interface DemoStepData {
  step: string;
  title: string;
  titleEs: string;
  text: string;
  textEs: string;
}

export interface TipData {
  icon: string;
  title: string;
  titleEs: string;
  text: string;
  textEs: string;
}

export const peelingData = {
  /* ─── Hero ─── */
  hero: {
    back: 'Back',
    backEs: 'Atrás',
    badge: 'Weekly Treatment',
    badgeEs: 'Tratamiento Semanal',
    title: 'The Peeling',
    titleEs: 'El Peeling',
    subtitle: 'Not a Cream — A Treatment',
    subtitleEs: 'No es una Crema — Es un Tratamiento',
    stats: {
      useLabel: 'Use',
      useLabelEs: 'Uso',
      useValue: 'Once/Week',
      useValueEs: '1x/Semana',
      lastsLabel: 'Bottle Lasts',
      lastsLabelEs: 'El Frasco Dura',
      lastsValue: 'Full Year',
      lastsValueEs: 'Todo un Año',
      dermLabel: 'Dermatologist',
      dermLabelEs: 'Dermatólogo',
      dermValue: 'Recommended',
      dermValueEs: 'Recomendado',
    },
  },

  /* ─── The Hook ─── */
  hook: {
    heading: 'The Hook — Stop Scripts',
    headingEs: 'El Gancho — Deja los Guiones',
    tricks: [
      {
        name: 'The Favorite Trick',
        nameEs: 'El Truco Favorito',
        quote:
          '"Let me show you my favorite quick trick for glowing skin. You\'ll love this."',
        quoteEs:
          '"Déjame mostrarte mi truco favorito para una piel radiante. Te va a encantar."',
        desc: 'Keep it light, no heavy pressure. Then lead inside confidently — don\'t wait for a "yes."',
        descEs: 'Manténlo ligero, sin presión. Luego guía adentro con confianza — no esperes un "sí".',
      },
      {
        name: 'The Personal Hook',
        nameEs: 'El Gancho Personal',
        quote:
          '"What I\'m about to show you right now is one of my absolute favorite products — I actually use it myself!"',
        quoteEs:
          '"Lo que te voy a mostrar ahora es uno de mis productos favoritos — ¡yo mismo lo uso!"',
        desc: 'Smile, engage, build trust instantly. Then set the stage:',
        descEs: 'Sonríe, conecta, genera confianza al instante. Luego prepara el terreno:',
        followUpQuote:
          '"Now, this isn\'t an anti-aging cream, and it\'s not here to replace anything you already use at home. It\'s something completely different."',
        followUpQuoteEs:
          '"Esto no es una crema anti-edad, y no está aquí para reemplazar nada de lo que ya usas en casa. Es algo completamente diferente."',
      },
      {
        name: 'The Separation Pitch',
        nameEs: 'El Pitch de Separación',
        quote:
          '"This is something completely different. This separates dead skin from living skin. It\'s a once-a-week treatment that you use at home on clean skin. What it does is separate all the dry and dead layers from the living ones, giving your skin a fresh, clean, and glowing look. It helps your creams work 10× better because they penetrate deeper and act faster."',
        quoteEs:
          '"Esto es algo completamente diferente. Separa la piel muerta de la viva. Es un tratamiento una vez por semana que usas en casa sobre piel limpia. Lo que hace es separar todas las capas secas y muertas de las vivas, dándole a tu piel un aspecto fresco, limpio y radiante. Ayuda a que tus cremas funcionen 10× mejor porque penetran más profundo y actúan más rápido."',
      },
    ],
  },

  /* ─── The Demo ─── */
  demo: {
    heading: 'The Demo — Hand Application',
    headingEs: 'La Demo — Aplicación en la Mano',
    steps: [
      {
        step: '1',
        title: 'Apply to the Hand',
        titleEs: 'Aplica en la Mano',
        text: '"This is a once-a-week treatment that you use at home on clean skin. Let me show you on your hand." Apply a small amount to the back of their hand.',
        textEs: '"Este es un tratamiento una vez por semana que usas en casa sobre piel limpia. Déjame mostrarte en tu mano." Aplica una pequeña cantidad en el dorso de su mano.',
      },
      {
        step: '2',
        title: 'The "Roll It, Don\'t Rub It" Technique',
        titleEs: 'La Técnica de "Enrolla, No Frijegues"',
        text: 'Tell them: "Roll it gently with your fingers — don\'t rub hard." The dead skin will start to pill and roll off. This is the visual WOW moment. Let them see the grey/brown particles forming.',
        textEs: 'Diles: "Enróllalo suavemente con tus dedos — no frotes fuerte." La piel muerta empezará a pelarse y salir. Este es el momento visual WOW. Déjalos ver las partículas grises/marrones formándose.',
      },
      {
        step: '3',
        title: 'Explain What They\'re Seeing',
        titleEs: 'Explica Lo Que Están Viendo',
        text: '"See that? That\'s dead skin. Dry, dead layers separating from the living skin underneath. It\'s actually so good that dermatologists recommend it for eczema, psoriasis, dry skin, and even redness or sensitivity."',
        textEs: '"¿Ves eso? Eso es piel muerta. Capas secas y muertas separándose de la piel viva de abajo. Es tan bueno que los dermatólogos lo recomiendan para eczema, psoriasis, piel seca, e incluso enrojecimiento o sensibilidad."',
      },
      {
        step: '4',
        title: 'The Authority Builder',
        titleEs: 'El Constructor de Autoridad',
        text: '"It\'s actually so good that dermatologists recommend it for eczema, psoriasis, dry skin, and even redness or sensitivity." That single line builds authority and trust — it\'s science-based, not sales-based.',
        textEs: '"Es tan bueno que los dermatólogos lo recomiendan para eczema, psoriasis, piel seca, e incluso enrojecimiento o sensibilidad." Esa sola frase construye autoridad y confianza — está basada en ciencia, no en ventas.',
      },
      {
        step: '5',
        title: 'Show the Fresh Skin',
        titleEs: 'Muestra la Piel Nueva',
        text: 'Wipe away the rolled-off skin. Have them feel the area. "Be honest — when was the last time your hand felt this smooth? That\'s not from the product — that\'s YOUR skin, finally breathing."',
        textEs: 'Limpia la piel que se salió. Haz que toquen la zona. "Sé honesta — ¿cuándo fue la última vez que tu mano se sintió así de suave? Eso no es del producto — es TU piel, finalmente respirando."',
      },
      {
        step: '6',
        title: 'The Longevity Close',
        titleEs: 'El Cierre de Longevidad',
        text: '"The best part? This bottle will last you a full year of treatments. So it\'s not something you\'ll run out of next month — it\'s an actual investment for your skin."',
        textEs: '"¿Y lo mejor? Este frasco te durará todo un año de tratamientos. Así que no es algo que se te acabará el mes que viene — es una inversión real para tu piel."',
      },
    ] as DemoStepData[],
  },

  /* ─── Two Offers ─── */
  offers: {
    heading: 'The Two Offers',
    headingEs: 'Las Dos Ofertas',
    subtext: 'Always present TWO choices. Let them decide. Then pause — silence is your friend.',
    subtextEs: 'Siempre presenta DOS opciones. Déjalas decidir. Luego haz pausa — el silencio es tu amigo.',
    option1: {
      label: 'Option 1',
      labelEs: 'Opción 1',
      priceLabel: '50% Off + Dead Sea Body Scrub Gift',
      priceLabelEs: '50% Desc. + Regalo Exfoliante del Mar Muerto',
      text: '"Take it for 50% off the Europe price — that\'s only {currency}100, and you\'ll also get the Dead Sea Body Scrub as a gift. Same mineral treatment, but for your body."',
      textEs: '"Llévalo con 50% de descuento del precio de Europa — eso es solo {currency}100, y también recibirás el Exfoliante del Mar Muerto de regalo. El mismo tratamiento mineral, pero para tu cuerpo."',
    },
    option2: {
      label: 'Option 2',
      labelEs: 'Opción 2',
      priceLabel: 'Full Price + Day & Night Cream Free',
      priceLabelEs: 'Precio Completo + Crema Día y Noche Gratis',
      text: '"This is the favorite for most customers: if you pay the normal {locationName} price of {currency}150, you\'ll get the Peeling plus the Day & Night Cream completely free!"',
      textEs: '"Esta es la favorita de la mayoría de clientes: si pagas el precio normal de {locationName} de {currency}150, ¡recibirás el Peeling más la Crema Día y Noche completamente gratis!"',
    },
  },

  /* ─── Price Ladder ─── */
  priceLadder: {
    heading: 'Interactive Price Ladder',
    headingEs: 'Escalera de Precios Interactiva',
    subtext: 'Tap each step to expand the script. Walk down one step at a time.',
    subtextEs: 'Toca cada paso para expandir el guion. Baja un paso a la vez.',
    whatToSay: 'What to say',
    whatToSayEs: 'Qué decir',
    lastResortWarning: '⚠ Last resort only. Try everything else first.',
    lastResortWarningEs: '⚠ Último recurso solo. Intenta todo lo demás primero.',
    voucherTip: '💡 Drop your voice, make it feel exclusive. Only on the single Peeling, not the combo.',
    voucherTipEs: '💡 Baja la voz, haz que se sienta exclusivo. Solo en el Peeling individual, no en el combo.',
    highlightTip: '💡 Best-value single. Most customers who hesitate on {currency}150 take this.',
    highlightTipEs: '💡 Mejor valor individual. La mayoría de clientes que dudan en {currency}150 se llevan este.',
  },

  /* ─── Emotional Close ─── */
  emotionalClose: {
    heading: 'The Emotional Close',
    headingEs: 'El Cierre Emocional',
    heartSellLabel: 'The Heart Sell — Say With Emotion',
    heartSellLabelEs: 'La Venta del Corazón — Dilo con Emoción',
    heartSellQuote:
      '"We always think twice before doing something for ourselves, but come on — when was the last time you actually treated yourself? You work hard, you deserve it. And this isn\'t an everyday product — it\'s a year of results."',
    heartSellQuoteEs:
      '"Siempre lo pensamos dos veces antes de hacernos algo, pero vamos — ¿cuándo fue la última vez que realmente te consentiste? Trabajas duro, te lo mereces. Y esto no es un producto de todos los días — es un año de resultados."',
    emotionInstruction: 'Say this with',
    emotionInstructionEs: 'Dilo con',
    emotionInstructionBold: 'real emotion',
    emotionInstructionBoldEs: 'emoción real',
    emotionInstructionAfter: '— this line closes deals. Then follow with:',
    emotionInstructionAfterEs: '— esta frase cierra ventas. Luego continúa con:',
    closeQuote:
      '"You\'re going to love this. So, which one sounds better for you — Option 1 or Option 2?"',
    closeQuoteEs:
      '"Te va a encantar. Entonces, ¿cuál te suena mejor — Opción 1 o Opción 2?"',
    pauseInstruction: 'Pause. Smile. Wait. Don\'t fill the silence.',
    pauseInstructionEs: 'Pausa. Sonríe. Espera. No llenes el silencio.',
  },

  /* ─── Pro Tips ─── */
  proTips: {
    heading: 'Pro Tips',
    headingEs: 'Consejos Pro',
    tips: [
      {
        icon: 'Hand',
        title: 'Demo on the hand — always',
        titleEs: 'Demo en la mano — siempre',
        text: 'The visual of dead skin rolling off is your strongest proof. Never skip the hand demo.',
        textEs: 'La imagen de la piel muerta saliendo es tu prueba más fuerte. Nunca te saltes la demo en la mano.',
      },
      {
        icon: 'MessageCircle',
        title: '"Roll it, don\'t rub it"',
        titleEs: '"Enróllalo, no lo frotes"',
        text: 'This phrase is crucial. If they rub too hard, it won\'t work. Gentle rolling creates the pilling effect.',
        textEs: 'Esta frase es crucial. Si frotan muy fuerte, no funciona. Enrollar suavemente crea el efecto de bolitas.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Mention dermatologists',
        titleEs: 'Menciona a los dermatólogos',
        text: '"Dermatologists recommend it for eczema, psoriasis, dry skin, and redness." This builds instant authority.',
        textEs: '"Los dermatólogos lo recomiendan para eczema, psoriasis, piel seca y enrojecimiento." Esto construye autoridad al instante.',
      },
      {
        icon: 'Calendar',
        title: 'One bottle = one year',
        titleEs: 'Un frasco = un año',
        text: 'Always emphasize longevity. {currency}100 for a full year of treatments is less than {currency}2 per week. Frame it as an investment.',
        textEs: 'Siempre enfatiza la longevidad. {currency}100 por todo un año de tratamientos es menos de {currency}2 por semana. Preséntalo como una inversión.',
      },
      {
        icon: 'Euro',
        title: '{currency}200 first, always',
        titleEs: '{currency}200 primero, siempre',
        text: 'Start with the Europe price. The {locationName} price feels like a gift after that anchor.',
        textEs: 'Empieza con el precio de Europa. El precio de {locationName} se siente como un regalo después de ese ancla.',
      },
      {
        icon: 'Heart',
        title: 'The emotional close is everything',
        titleEs: 'El cierre emocional lo es todo',
        text: '"When was the last time you treated yourself?" Say it with genuine feeling. This line works on every demographic.',
        textEs: '"¿Cuándo fue la última vez que te consentiste?" Dilo con sentimiento genuino. Esta frase funciona con todo público.',
      },
      {
        icon: 'Sparkles',
        title: 'Works on everyone',
        titleEs: 'Funciona con todos',
        text: 'Women, men, young, old — this pitch works on every demographic because it delivers instant visual proof and emotional value.',
        textEs: 'Mujeres, hombres, jóvenes, adultos — este pitch funciona con todo público porque ofrece prueba visual instantánea y valor emocional.',
      },
      {
        icon: 'TrendingDown',
        title: '{currency}50 voucher is your secret weapon',
        titleEs: 'El cupón de {currency}50 es tu arma secreta',
        text: 'Only use the {currency}50 close at the very end. If you drop it too early, you leave money on the table.',
        textEs: 'Solo usa el cierre de {currency}50 al final. Si lo sueltas muy temprano, dejas dinero sobre la mesa.',
      },
    ] as TipData[],
  },

  /* ─── Quick Reference ─── */
  quickRef: {
    heading: 'Quick Reference',
    headingEs: 'Referencia Rápida',
    items: {
      use: { label: 'Use:', labelEs: 'Uso:', value: 'Once/week', valueEs: '1x/semana' },
      lasts: { label: 'Bottle lasts:', labelEs: 'El frasco dura:', value: 'Full year', valueEs: 'Todo un año' },
      creams: { label: 'Creams work:', labelEs: 'Las cremas funcionan:', value: '10× better', valueEs: '10× mejor' },
      derm: { label: 'Dermatologist:', labelEs: 'Dermatólogo:', value: 'Approved', valueEs: 'Aprobado' },
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Price-step builder (kept as a function so {currency} /              */
/*  {locationName} placeholders stay dynamic)                          */
/* ------------------------------------------------------------------ */

export function getPriceStepsData(
  currency: string,
  locationName: string,
  _isEs: boolean
): PriceStepData[] {
  return [
    {
      price: `${currency}200`,
      label: 'Europe Price',
      labelEs: 'Precio Europa',
      description: 'Anchor — mention this first to build value',
      descriptionEs: 'Ancla — menciona esto primero para construir valor',
      script: `"Normally, around Europe, this product goes for ${currency}200, because it's proven and works."`,
      scriptEs: `"Normalmente, en toda Europa, este producto cuesta ${currency}200, porque está comprobado y funciona."`,
      isHighlight: false,
    },
    {
      price: `${currency}150`,
      label: `${locationName} Price`,
      labelEs: `Precio ${locationName}`,
      description: 'Our standard price',
      descriptionEs: 'Nuestro precio estándar',
      script: `"But here in ${locationName}, it's only ${currency}150!"`,
      scriptEs: `"¡Pero aquí en ${locationName}, es solo ${currency}150!"`,
      isHighlight: false,
    },
    {
      price: `${currency}100`,
      label: '50% Off + Scrub Gift',
      labelEs: '50% Desc. + Regalo Exfoliante',
      description: 'Best value — half the Europe price plus a gift',
      descriptionEs: 'Mejor valor — la mitad del precio de Europa más un regalo',
      script: `"Right now, we've got an amazing promotion: take it for 50% off the Europe price — that's only ${currency}100 — and you'll also get the Dead Sea Body Scrub as a gift. Same mineral treatment, but for your body."`,
      scriptEs: `"Ahora mismo, tenemos una promoción increíble: llévalo con 50% de descuento del precio de Europa — eso es solo ${currency}100 — y también recibirás el Exfoliante del Mar Muerto de regalo. El mismo tratamiento mineral, pero para tu cuerpo."`,
      isHighlight: true,
    },
    {
      price: `${currency}70`,
      label: 'Adaptive — Store Credit',
      labelEs: 'Adaptativo — Crédito de Tienda',
      description: 'Remove the scrub, use as credit',
      descriptionEs: 'Quita el exfoliante, úsalo como crédito',
      script: `"You know what, I totally understand. Let's make it easy — I can take the Scrub out of the deal and put its value straight back to you as credit. That way I can make the Peeling ${currency}70 for you."`,
      scriptEs: `"Sabes qué, te entiendo completamente. Hagámoslo fácil — puedo sacar el Exfoliante del trato y devolverte su valor como crédito. Así puedo dejarte el Peeling en ${currency}70."`,
      isHighlight: false,
    },
    {
      price: `${currency}50`,
      label: 'Voucher Close',
      labelEs: 'Cierre con Cupón',
      description: 'Voucher close — the emotional final push',
      descriptionEs: 'Cierre con cupón — el empujón emocional final',
      script: `"Alright, alright... listen, I just checked, and I can do something a little crazy for you. But you can't be greedy, okay? I can't do it on the big option — only on the single Peeling. Remember how I told you I could do it for ${currency}70 without any gifts? If you use this voucher, I can actually bring it down to ${currency}50, just this one time. But from next time, it goes back to the normal price, alright?"`,
      scriptEs: `"Vale, vale... escucha, acabo de revisar, y puedo hacer algo un poco loco por ti. Pero no seas codiciosa, ¿ok? No puedo hacerlo en la opción grande — solo en el Peeling individual. ¿Recuerdas que te dije que podía dejártelo en ${currency}70 sin regalos? Si usas este cupón, en realidad puedo bajarlo a ${currency}50, solo esta vez. Pero la próxima vez, vuelve al precio normal, ¿ok?"`,
      isVoucher: true,
      isHighlight: false,
    },
    {
      price: `${currency}50`,
      label: 'Minimum',
      labelEs: 'Mínimo',
      description: 'Absolute floor — same {currency}50, nothing below it',
      descriptionEs: 'Piso absoluto — los mismos {currency}50, nada por debajo',
      script: `"Look, I really want you to try this, so ${currency}50 it is — and that is my floor. Voucher or no voucher, there is nothing underneath it. Just promise me you'll actually use it, okay? Not once a year — once a week."`,
      scriptEs: `"Mira, de verdad quiero que lo pruebes, así que ${currency}50 — y ese es mi mínimo. Con cupón o sin cupón, no hay nada por debajo. Solo prométeme que lo vas a usar de verdad, ¿vale? No una vez al año — una vez por semana."`,
      isMinimum: true,
      isHighlight: false,
    },
  ];
}

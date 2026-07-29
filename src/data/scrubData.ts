/* ------------------------------------------------------------------ */
/*  ScrubPage bilingual data — every English string + Mexican Spanish  */
/* ------------------------------------------------------------------ */

export interface ScrubStep {
  step: string;
  title: string;
  titleEs: string;
  text: string;
  textEs: string;
}

export interface ScrubTip {
  iconName: string;
  title: string;
  titleEs: string;
  text: string;
  textEs: string;
}

export interface CheatCombo {
  name: string;
  nameEs: string;
  price: string;
  items: string;
  itemsEs: string;
}

export interface QuickRefItem {
  label: string;
  labelEs: string;
  valueTemplate: string; // uses {currency} placeholder
}

/* ── Combo-offer shape (generated per locale) ── */
export interface ComboOfferData {
  title: string;
  titleEs: string;
  price: string;
  subtitle: string;
  subtitleEs: string;
  items: string[];
  tag?: string;
  tagEs?: string;
  isHighlight?: boolean;
}

export function getComboOffersData(currency: string): ComboOfferData[] {
  return [
    {
      title: 'Buy 2 Get 1 Free',
      titleEs: 'Compra 2 Lleva 1 Gratis',
      price: `${currency}120`,
      subtitle: 'Our core offer — most popular',
      subtitleEs: 'Nuestra oferta principal — la más popular',
      items: ['Scrub + Body Butter + Nail Kit', 'Scrub + Body Butter + Cleanser', 'Two Scrubs + One Body Butter'],
      tag: 'Most Popular',
      tagEs: 'Más Popular',
      isHighlight: true,
    },
    {
      title: 'Buy 2 Get 2 (Christmas)',
      titleEs: 'Compra 2 Lleva 2 (Navidad)',
      price: `${currency}120`,
      subtitle: 'For premium gift buyers — four products',
      subtitleEs: 'Para compradores de regalos premium — cuatro productos',
      items: ['Two for you, two for gifts', 'Perfect for Christmas shopping', 'Same price, extra product'],
      tag: 'Christmas',
      tagEs: 'Navidad',
    },
    {
      title: 'Buy 1 Get 1 Free',
      titleEs: 'Compra 1 Lleva 1 Gratis',
      price: `${currency}60`,
      subtitle: 'Slimmer variation — fast close',
      subtitleEs: 'Variación ligera — cierre rápido',
      items: ['Scrub + Body Butter', 'Scrub + Nail Kit', 'Nail Kit + Body Butter'],
      tag: 'Quick Close',
      tagEs: 'Cierre Rápido',
    },
    {
      title: 'Single Scrub',
      titleEs: 'Scrub Individual',
      price: `${currency}30`,
      subtitle: 'Final push — the graceful exit',
      subtitleEs: 'Empujón final — la salida elegante',
      items: ['Dead Sea Scrub only', 'No gifts, no extras', 'Opens the door for future purchase'],
    },
  ];
}

/* ── Main data object ── */
export const scrubData = {
  /* ── Back button ── */
  backButton: {
    text: 'Back',
    textEs: 'Atrás',
  },

  /* ── Hero ── */
  hero: {
    badge: 'Dead Sea Minerals',
    badgeEs: 'Minerales del Mar Muerto',
    title: 'Dead Sea Scrub & Body Butter',
    titleEs: 'Scrub y Body Butter del Mar Muerto',
    tagline: 'Feel the Difference',
    taglineEs: 'Siente la Diferencia',
    stats: {
      sourceLabel: 'Source',
      sourceLabelEs: 'Origen',
      sourceValue: 'Dead Sea',
      sourceValueEs: 'Mar Muerto',
      jarLastsLabel: 'Jar Lasts',
      jarLastsLabelEs: 'Duración',
      jarLastsValue: '8-12 Months',
      jarLastsValueEs: '8-12 Meses',
      feelingLabel: 'Feeling',
      feelingLabelEs: 'Sensación',
      feelingValue: 'Instant Soft',
      feelingValueEs: 'Suavidad Instantánea',
    },
  },

  /* ── The Hook ── */
  hookSection: {
    title: 'The Hook — Stop Scripts',
    titleEs: 'El Gancho — Olvida los Guiones',
    quotes: [
      {
        text: "I'm pretty sure you've tried scrubs before, right? This one is a bit different. You'll love this. It's one of those products that makes everyone smile.",
        textEs: 'Estoy seguro de que ya has probado scrubs antes, ¿verdad? Este es un poco diferente. Te va a encantar. Es de esos productos que hacen sonreír a todo el mundo.',
      },
      {
        text: "Do you ever get dry skin? Ugh, I know — it's the worst. You know what? Let me give you something amazing. Come!",
        textEs: '¿Alguna vez se te reseca la piel? Uf, lo sé — es lo peor. ¿Sabes qué? Déjame darte algo increíble. ¡Ven!',
      },
    ],
  },

  /* ── The Sensory Demo ── */
  sensoryDemoSection: {
    title: 'The Sensory Demo',
    titleEs: 'La Demostración Sensorial',
    steps: [
      {
        step: '1',
        title: 'Place the Salts',
        titleEs: 'Coloca las Sales',
        text: 'Place the Dead Sea salts on the back of their hand. "Start rubbing gently." Let them feel the crystals.',
        textEs: 'Coloca las sales del Mar Muerto en el dorso de su mano. "Empieza a frotar suavemente." Déjalos sentir los cristales.',
      },
      {
        step: '2',
        title: 'The Dead Sea Story',
        titleEs: 'La Historia del Mar Muerto',
        text: '"Have you heard of the Dead Sea? Lowest place on Earth, highest natural mineral concentration — magnesium, calcium, potassium. These minerals detox, rejuvenate, and calm the skin. From the Dead Sea, the lowest point on Earth."',
        textEs: '"¿Has oído hablar del Mar Muerto? El lugar más bajo de la Tierra, la concentración mineral natural más alta — magnesio, calcio, potasio. Estos minerales desintoxican, rejuvenecen y calman la piel. Del Mar Muerto, el punto más bajo de la Tierra."',
      },
      {
        step: '3',
        title: 'Add Water',
        titleEs: 'Agrega Agua',
        text: "Add water slowly while they rub. \"This is my personal favorite — I use it myself. It's recommended to help with eczema, psoriasis, severe dry skin, and redness. It basically separates the dry, dead layers from the living ones so your skin can breathe.\"",
        textEs: 'Agrega agua lentamente mientras frotan. "Este es mi favorito personal — yo lo uso. Se recomienda para ayudar con el eczema, la psoriasis, la piel severamente seca y el enrojecimiento. Básicamente separa las capas secas y muertas de las vivas para que tu piel pueda respirar."',
      },
      {
        step: '4',
        title: 'Let Them Feel the Difference',
        titleEs: 'Déjalos Sentir la Diferencia',
        text: `Rinse and dry. Wait two beats. "Be honest — when was the last time your hands felt like this? And the best part? The sensation stays — even if you wash your hands a lot or use sanitizer. Since Covid, this became our #1 seller. People were like, 'Finally something that actually helps!'"`,
        textEs: `Enjuaga y seca. Espera dos segundos. "Sé honesto — ¿cuándo fue la última vez que tus manos se sintieron así? ¿Y lo mejor? La sensación se queda — aunque te laves las manos mucho o uses desinfectante. Desde el Covid, este se convirtió en nuestro #1 más vendido. La gente decía, '¡Por fin algo que realmente ayuda!'"`,
      },
      {
        step: '5',
        title: 'Usage Instructions',
        titleEs: 'Instrucciones de Uso',
        text: '"Use it once a week. One teaspoon is enough for the whole body. A jar lasts 8–12 months."',
        textEs: '"Úsalo una vez por semana. Una cucharadita es suficiente para todo el cuerpo. Un frasco dura 8–12 meses."',
      },
    ] as ScrubStep[],
  },

  /* ── The Butter Flip Test ── */
  butterFlipSection: {
    title: 'The Butter Flip Test',
    titleEs: 'La Prueba del Volteo de la Crema',
    description:
      'This is the moment that sells the butter. It\'s visual, surprising, and impossible to fake.',
    descriptionEs:
      'Este es el momento que vende la crema. Es visual, sorprendente e imposible de fingir.',
    demoLabel: 'The Demonstration',
    demoLabelEs: 'La Demostración',
    demoQuote1:
      'Open the butter, flip it upside down — no spill. Point to the fact that nothing falls out.',
    demoQuote1Es:
      'Abre la crema, voltéala — no se derrama. Señala el hecho de que no cae nada.',
    demoQuote2: `"To complete the treatment — the Body Butter. Same minerals, ultra-rich. You see how it doesn't spill? Even if I flip it over, it doesn't fall. You only need a tiny bit — not because I'm cheap 😄 — because it's really that concentrated."`,
    demoQuote2Es: `"Para completar el tratamiento — el Body Butter. Los mismos minerales, ultra-concentrado. ¿Ves cómo no se derrama? Aunque lo voltee, no cae. Solo necesitas un poquito — no porque sea tacaño 😄 — porque es realmente tan concentrado."`,
    closingLine: 'Let them massage it in. Then: ',
    closingLineEs: 'Déjalos masajearlo. Luego: ',
    closingQuote:
      "Imagine this feeling all over the body… and the feet? OMG — the best feeling ever!",
    closingQuoteEs:
      "¡Imagina esta sensación por todo el cuerpo… y los pies? ¡OMG — la mejor sensación del mundo!",
  },

  /* ── Combo Offers ── */
  comboOffersSection: {
    title: 'Combo Offers',
    titleEs: 'Ofertas Combinadas',
    subtitle: 'Tap the price to copy. Each offer matches a different customer type.',
    subtitleEs: 'Toca el precio para copiar. Cada oferta se adapta a un tipo de cliente diferente.',
  },

  /* ── Cheat Combos ── */
  cheatCombosSection: {
    title: 'Cheat Combos for Sellers',
    titleEs: 'Combos Rápidos para Vendedores',
    combos: [
      { name: 'Classic Trio', nameEs: 'Trío Clásico', price: '{currency}120', items: 'Scrub + Body Butter + Nail Kit', itemsEs: 'Exfoliante + Manteca Corporal + Kit de Uñas' },
      { name: 'Spa Trio', nameEs: 'Trío Spa', price: '{currency}120', items: 'Scrub + Body Butter + Face Cleanser', itemsEs: 'Exfoliante + Manteca Corporal + Limpiador Facial' },
      { name: 'Scent Duo', nameEs: 'Duo Aroma', price: '{currency}60', items: 'Scrub + Body Butter (Buy 1 Get 1)', itemsEs: 'Exfoliante + Manteca Corporal (Compra 1, Llévate 1)' },
      { name: 'Smart Duo', nameEs: 'Duo Inteligente', price: '{currency}60', items: 'Scrub + Nail Kit (kit includes cream)', itemsEs: 'Exfoliante + Kit de Uñas (el kit incluye crema)' },
      { name: "Gifter's Four", nameEs: 'Cuatro para Regalar', price: '{currency}120', items: 'Buy 2, Get 2 (Christmas special)', itemsEs: 'Compra 2, Llévate 2 (oferta de Navidad)' },
      { name: 'Final Push', nameEs: 'Empujón Final', price: '{currency}30', items: 'Scrub only, no gifts', itemsEs: 'Solo el exfoliante, sin regalos' },
    ] as CheatCombo[],
  },

  /* ── Price Presentation ── */
  pricePresentationSection: {
    title: 'Price Presentation',
    titleEs: 'Presentación del Precio',
    anchorLabel: 'Anchor',
    anchorLabelEs: 'Anclaje',
    anchorQuote: (currency: string) =>
      `"I won't lie — it's not cheap. Around Europe these go for ${currency}80 each."`,
    anchorQuoteEs: (currency: string) =>
      `"No te voy a mentir — no es barato. Por Europa estos cuestan ${currency}80 cada uno."`,
    localLabel: 'Local Price',
    localLabelEs: 'Precio Local',
    localQuote: (currency: string, locationName: string) =>
      `"But here in ${locationName}, we're a tax haven — each one is ${currency}60."`,
    localQuoteEs: (currency: string, locationName: string) =>
      `"Pero aquí en ${locationName}, somos un paraíso fiscal — cada uno es ${currency}60."`,
    coreLabel: 'Core Offer',
    coreLabelEs: 'Oferta Principal',
    coreQuote: (currency: string) =>
      `And the best part — our offer is Buy 2, Get 1 Free. So you pay ${currency}120 and you leave with three products.`,
    coreQuoteEs: (currency: string) =>
      `Y lo mejor — nuestra oferta es Compra 2, Lleva 1 Gratis. Así que pagas ${currency}120 y te llevas tres productos.`,
  },

  /* ── Pro Tips ── */
  proTipsSection: {
    title: 'Pro Tips',
    titleEs: 'Consejos Pro',
    tips: [
      {
        iconName: 'Hand',
        title: 'Make it sensory — let the hands sell it',
        titleEs: 'Hazlo sensorial — deja que las manos lo vendan',
        text: 'The feeling is everything. Let them rub, rinse, and feel. Once they feel the softness, the sale is halfway done.',
        textEs: 'La sensación lo es todo. Déjalos frotar, enjuagar y sentir. Una vez que sientan la suavidad, la venta está a medio camino.',
      },
      {
        iconName: 'Droplets',
        title: 'The flip test is your secret weapon',
        titleEs: 'La prueba del volteo es tu arma secreta',
        text: "Flipping the butter jar and showing nothing falls out is a visual proof they can't argue with. Do it every time.",
        textEs: 'Voltear el frasco de crema y mostrar que no cae nada es una prueba visual con la que no pueden discutir. Hazlo siempre.',
      },
      {
        iconName: 'Sun',
        title: 'Use Christmas urgency naturally',
        titleEs: 'Usa la urgencia navideña de forma natural',
        text: '"Stock runs faster closer to the holidays, and I\'d hate you to miss colors/scents you like." Timing closes gifts.',
        textEs: '"El stock se acaba más rápido cerca de las fiestas, y odiaría que te perdieras colores/aromas que te gustan." El momento cierra regalos.',
      },
      {
        iconName: 'TrendingDown',
        title: 'Keep the math clean',
        titleEs: 'Mantén la matemática simple',
        text: '{currency}60 each. {currency}120 for three (Buy 2, Get 1). Simple, round numbers are easier to say yes to.',
        textEs: '{currency}60 cada uno. {currency}120 por tres (Compra 2, Lleva 1). Números redondos y simples son más fáciles de aceptar.',
      },
      {
        iconName: 'Gift',
        title: 'Buy 2, Get 2 for premium buyers',
        titleEs: 'Compra 2, Lleva 2 para compradores premium',
        text: 'When the energy is great and they have a Christmas list — this is your volume play. Same {currency}120, extra product.',
        textEs: 'Cuando la energía es buena y tienen una lista navideña — esta es tu jugada de volumen. Los mismos {currency}120, producto extra.',
      },
      {
        iconName: 'Package',
        title: 'Buy 1, Get 1 for fast closes',
        titleEs: 'Compra 1, Lleva 1 para cierres rápidos',
        text: "For hesitant buyers who still felt the demo — this turns 'maybe' into 'yes' instantly. {currency}60 feels like nothing after {currency}120.",
        textEs: "Para compradores indecisos que aún sintieron la demo — esto convierte el 'tal vez' en 'sí' al instante. {currency}60 no se siente como nada después de {currency}120.",
      },
      {
        iconName: 'Sparkles',
        title: '{currency}30 Scrub is your final push',
        titleEs: 'El Scrub a {currency}30 es tu empujón final',
        text: 'When nothing else works, the single Scrub at {currency}30 creates a customer today and a bigger sale tomorrow. No gifts, no extras — just the hero product in their hands.',
        textEs: 'Cuando nada más funciona, el Scrub individual a {currency}30 crea un cliente hoy y una venta mayor mañana. Sin regalos, sin extras — solo el producto estrella en sus manos.',
      },
      {
        iconName: 'Moon',
        title: 'Keep it fun — jokes, smiles, easy energy',
        titleEs: 'Diviértete — bromas, sonrisas, energía fácil',
        text: 'This demo should feel like a spa moment, not a sales pitch. If they smile, they buy.',
        textEs: 'Esta demo debería sentirse como un momento de spa, no como un pitch de venta. Si sonríen, compran.',
      },
    ] as ScrubTip[],
  },

  /* ── Quick Reference ── */
  quickReferenceSection: {
    title: 'Quick Reference',
    titleEs: 'Referencia Rápida',
    grid: {
      europeLabel: 'Europe:',
      europeLabelEs: 'Europa:',
      europeValue: '{currency}80 each',
      europeValueEs: '{currency}80 cada uno',
      localLabel: '{locationName}:',
      localLabelEs: '{locationName}:',
      localValue: '{currency}60 each',
      localValueEs: '{currency}60 cada uno',
      coreLabel: 'Core:',
      coreLabelEs: 'Principal:',
      coreValue: '{currency}120/3 (B2G1)',
      coreValueEs: '{currency}120/3 (C2L1)',
      floorLabel: 'Floor:',
      floorLabelEs: 'Mínimo:',
      floorValue: '{currency}30 Scrub',
      floorValueEs: 'Scrub {currency}30',
    },
  },
};

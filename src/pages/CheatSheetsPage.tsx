// ─────────────────────────────────────────────────────────────
// CheatSheetsPage.tsx — Comprehensive sales reference with
// price ladder, scripts, psychology, and more
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Syringe,
  Droplets,
  Sparkles,
  Scissors,
  ChevronDown,
  Copy,
  Check,
  Tag,
  MessageCircle,
  Lightbulb,
  Heart,
  ShieldCheck,
  XCircle,
  BookOpen,
  Eye,
  ThumbsUp,
  Users,
  Zap,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../data/translations';

// ── Types ──
type SheetTab = 'all' | 'prices' | 'scripts' | 'emergency' | 'psychology';

// ── Price Ladder Data ──
interface PriceStep {
  label: string;
  price: string;
  words: string;
  isStrike?: boolean;
  highlight?: boolean;
}

interface ProductLadder {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  europePrice: string;
  basePrice: string;
  minPrice: string;
  steps: PriceStep[];
}

function getProductLadders(lang: Language, currency: string, locationName: string): ProductLadder[] {
  if (lang === 'es') {
    return [
      {
        id: 'syringe',
        name: 'S\u00e9rum de \u00c1cido Hialur\u00f3nico (Tratamiento de Ojos)',
        icon: <Syringe size={18} />,
        color: '#0ABAB5',
        europePrice: `500${currency}`,
        basePrice: `300${currency}`,
        minPrice: `100${currency}`,
        steps: [
          { label: 'Anclaje de Precio Europa', price: `500${currency}`, words: '"Normalmente en nuestras tiendas en Europa esto cuesta 500${currency} pero aqu\u00ed en ${locationName} tenemos un precio mucho mejor."', isStrike: true },
          { label: `Base de ${locationName}`, price: `300${currency}`, words: '"Es solo 300${currency}."' },
          { label: 'Oferta 1 \u2014 30% Descuento + Regalo', price: `210${currency}`, words: '"Ahora mismo tenemos una oferta incre\u00edble \u2014 puedes llev\u00e1rtelo con un 30% de descuento y tambi\u00e9n recibir\u00e1s un regalo \u2014 Crema de D\u00eda, Crema de Noche o Peeling."', highlight: true },
          { label: 'Oferta 2 \u2014 Segunda Jeringa Gratis', price: `300${currency}`, words: '"Por 300${currency} te llevas una segunda jeringa gratis \u2014 para tu frente, labio superior o l\u00edneas de expresi\u00f3n."' },
          { label: 'Venta Adicional Avanzada', price: `300${currency}`, words: '"Dos jeringas m\u00e1s Crema de D\u00eda y Noche gratis \u2014 ese es el paquete completo."' },
          { label: 'Alternativa Adaptativa (sin regalo)', price: `175${currency}`, words: '"D\u00e9jame quitar el regalo y te lo doy por 175${currency}."', highlight: true },
          { label: 'Cierre con Cup\u00f3n', price: `140${currency}`, words: '"Quiero asegurarme de que te vayas feliz hoy \u2014 tengo un cup\u00f3n del 20%, eso lo deja en solo 140${currency}."', highlight: true },
        ],
      },
      {
        id: 'peeling',
        name: 'Peeling Glic\u00f3lico',
        icon: <Droplets size={18} />,
        color: '#8B5CF6',
        europePrice: `200${currency}`,
        basePrice: `150${currency}`,
        minPrice: `50${currency}`,
        steps: [
          { label: 'Anclaje de Precio Europa', price: `200${currency}`, words: '"En Europa este tratamiento cuesta 200${currency}."', isStrike: true },
          { label: `Base de ${locationName}`, price: `150${currency}`, words: '"Aqu\u00ed en ${locationName} es solo 150${currency}."' },
          { label: 'Oferta 1 \u2014 50% Descuento + Regalo', price: `100${currency}`, words: '"Esto no es una crema anti-edad, esto es algo completamente diferente \u2014 esto es un tratamiento que separa la piel muerta de la piel viva. Ahora mismo puedes llev\u00e1rtelo con un 50% de descuento y recibir\u00e1s un regalo de Exfoliante del Mar Muerto."', highlight: true },
          { label: 'Oferta 2 \u2014 Crema de D\u00eda y Noche Gratis', price: `150${currency}`, words: '"Por 150${currency} te llevas el peeling m\u00e1s la Crema de D\u00eda y Noche gratis."' },
          { label: 'Alternativa Adaptativa (exfoliante como cr\u00e9dito)', price: `70${currency}`, words: '"D\u00e9jame quitar el exfoliante y te lo doy como cr\u00e9dito \u2014 eso lo deja en 70${currency}."', highlight: true },
          { label: 'Cierre con Cup\u00f3n', price: `50${currency}`, words: '"Con el cup\u00f3n de hoy, un solo peeling es solo 50${currency} \u2014 sin regalos, pero solo el tratamiento ya vale la pena."', highlight: true },
        ],
      },
      {
        id: 'scrub',
        name: 'Exfoliante del Mar Muerto y Manteca Corporal',
        icon: <Sparkles size={18} />,
        color: '#F59E0B',
        europePrice: `100${currency} cada uno`,
        basePrice: `60${currency} cada uno`,
        minPrice: `30${currency}`,
        steps: [
          { label: 'Anclaje de Precio Europa', price: `100${currency} cada uno`, words: '"En Europa cada uno de estos cuesta 100${currency} \u2014 pero aqu\u00ed en ${locationName} son solo 60${currency} cada uno."', isStrike: true },
          { label: 'Oferta Principal \u2014 Compra 2, Lleva 1 Gratis', price: `${currency}120 por 3`, words: '"Compra cualquiera 2 productos y ll\u00e9vate el tercero gratis \u2014 eso es 120${currency} por 3 productos."', highlight: true },
          { label: 'Oferta Navide\u00f1a \u2014 Compra 2, Lleva 2', price: `${currency}120 por 4`, words: '"Para las fiestas: compra 2, lleva 2 gratis \u2014 120${currency} por 4 productos. Esa es nuestra mejor oferta."' },
          { label: 'Versi\u00f3n Reducida \u2014 Compra 1, Lleva 1', price: `${currency}60 por 2`, words: '"O simplemente compra uno, ll\u00e9vate uno gratis \u2014 60${currency} por 2 productos."' },
          { label: 'Script de Demo de Manteca', price: 'Demo', words: '"Te voy a mostrar algo incre\u00edble \u2014 aunque lo voltee, no se cae." (prueba de volteo)' },
          { label: 'Empuje Final \u2014 Solo Exfoliante', price: `30${currency}`, words: '"Solo el exfoliante por s\u00ed solo \u2014 30${currency}. Ese es el mejor precio que puedo darte."', highlight: true },
        ],
      },
      {
        id: 'nail-kit',
        name: 'Kit de U\u00f1as Francesas',
        icon: <Scissors size={18} />,
        color: '#EC4899',
        europePrice: `100${currency}`,
        basePrice: `60${currency}`,
        minPrice: `30${currency}`,
        steps: [
          { label: 'Anclaje de Precio Europa', price: `100${currency}`, words: '"En Europa este kit de u\u00f1as cuesta 100${currency} \u2014 pero aqu\u00ed en ${locationName} es solo 60${currency}."', isStrike: true },
          { label: 'Oferta Principal \u2014 Compra 2, Lleva 1 Gratis', price: `${currency}120 por 3 kits`, words: '"Compra 2 kits, ll\u00e9vate el tercero gratis \u2014 120${currency} por 3 kits completos."', highlight: true },
          { label: 'Oferta Premium Navide\u00f1a \u2014 Compra 2, Lleva 2', price: `${currency}120 por 4 kits`, words: '"Especial de fiestas: compra 2, lleva 2 gratis \u2014 120${currency} por 4 kits de u\u00f1as."' },
          { label: 'Mezcla y Combina', price: `${currency}60 por 2`, words: '"Mezcla y combina un Kit de U\u00f1as con un Exfoliante o Manteca Corporal \u2014 compra uno, ll\u00e9vate uno \u2014 solo 60${currency} por 2 productos."' },
          { label: 'Pitch de Garant\u00eda', price: 'Demo', words: '"Aunque tu perro se lo coma, puedes traerlo y lo reemplazamos."' },
          { label: 'Empuje Final', price: `30${currency}`, words: '"Todo el kit por 30${currency} \u2014 ese es mi precio final."', highlight: true },
        ],
      },
    ];
  }

  // Default English
  return [
    {
      id: 'syringe',
      name: 'Hyaluronic Acid Syringe (Eye Treatment)',
      icon: <Syringe size={18} />,
      color: '#0ABAB5',
      europePrice: `500${currency}`,
      basePrice: `300${currency}`,
      minPrice: `100${currency}`,
      steps: [
        { label: 'Europe Price Anchor', price: `500${currency}`, words: '"Usually in our shops in Europe this goes for 500${currency} but here in ${locationName} we have a much better price."', isStrike: true },
        { label: `${locationName} Base`, price: `300${currency}`, words: '"It\'s only 300${currency}."' },
        { label: 'Offer 1 \u2014 30% Off + Gift', price: `210${currency}`, words: '"Right now we have an amazing offer \u2014 you can get it for 30% less and you\'ll also receive a gift \u2014 Day Cream, Night Cream, or Peeling."', highlight: true },
        { label: 'Offer 2 \u2014 Second Syringe Free', price: `300${currency}`, words: '"For 300${currency} you get a second syringe free \u2014 for your forehead, upper lip, or 11s."' },
        { label: 'Advanced Upsell', price: `300${currency}`, words: '"Two syringes plus Day & Night Cream free \u2014 that\'s the full package."' },
        { label: 'Adaptive Fallback (no gift)', price: `175${currency}`, words: '"Let me take the gift away and I\'ll give it to you for 175${currency}."', highlight: true },
        { label: 'Voucher Close', price: `140${currency}`, words: '"I want to make sure you leave happy today \u2014 I have a 20% voucher, that makes it just 140${currency}."', highlight: true },
      ],
    },
    {
      id: 'peeling',
      name: 'Glycolic Peeling',
      icon: <Droplets size={18} />,
      color: '#8B5CF6',
      europePrice: `200${currency}`,
      basePrice: `150${currency}`,
      minPrice: `50${currency}`,
      steps: [
        { label: 'Europe Price Anchor', price: `200${currency}`, words: '"In Europe this treatment costs 200${currency}."', isStrike: true },
        { label: `${locationName} Base`, price: `150${currency}`, words: '"Here in ${locationName} it\'s only 150${currency}."' },
        { label: 'Offer 1 \u2014 50% Off + Gift', price: `100${currency}`, words: '"This is not an anti-aging cream, this is something completely different \u2014 this is a treatment that separates the dead skin from the living skin. Right now you can get it for 50% off and you\'ll receive a Dead Sea Body Scrub gift."', highlight: true },
        { label: 'Offer 2 \u2014 Day & Night Cream Free', price: `150${currency}`, words: '"For 150${currency} you get the peeling plus Day & Night Cream free."' },
        { label: 'Adaptive Fallback (scrub as credit)', price: `70${currency}`, words: '"Let me remove the scrub and give it to you as credit \u2014 that makes it 70${currency}."', highlight: true },
        { label: 'Voucher Close', price: `50${currency}`, words: '"With today\'s voucher, a single peeling is just 50${currency} \u2014 no gifts, but the treatment alone is worth it."', highlight: true },
      ],
    },
    {
      id: 'scrub',
      name: 'Dead Sea Scrub & Body Butter',
      icon: <Sparkles size={18} />,
      color: '#F59E0B',
      europePrice: `100${currency} each`,
      basePrice: `60${currency} each`,
      minPrice: `30${currency}`,
      steps: [
        { label: 'Europe Price Anchor', price: '100${currency} each', words: `"In Europe each of these costs 100${currency} \u2014 but here in ${locationName} they\'re only 60${currency} each."`, isStrike: true },
        { label: 'Core Offer \u2014 Buy 2, Get 1 Free', price: '${currency}120 for 3', words: `"Buy any 2 products and get the third free \u2014 that\'s 120${currency} for 3 products."`, highlight: true },
        { label: 'Christmas Offer \u2014 Buy 2, Get 2', price: '${currency}120 for 4', words: `"For the holidays: buy 2, get 2 free \u2014 120${currency} for 4 products. That\'s our best deal."` },
        { label: 'Slim Version \u2014 Buy 1, Get 1', price: '${currency}60 for 2', words: `"Or just buy one, get one free \u2014 60${currency} for 2 products."` },
        { label: 'Butter Demo Script', price: 'Demo', words: '"I\'m going to show you something incredible \u2014 even if I flip it over, it doesn\'t fall." (flip test)' },
        { label: 'Final Push \u2014 Scrub Only', price: `30${currency}`, words: '"Just the scrub by itself \u2014 30${currency}. That\'s the best price I can do."', highlight: true },
      ],
    },
    {
      id: 'nail-kit',
      name: 'French Nail Kit',
      icon: <Scissors size={18} />,
      color: '#EC4899',
      europePrice: `100${currency}`,
      basePrice: `60${currency}`,
      minPrice: `30${currency}`,
      steps: [
        { label: 'Europe Price Anchor', price: `100${currency}`, words: '"In Europe this nail kit costs 100${currency} \u2014 but here in ${locationName} it\'s only 60${currency}."', isStrike: true },
        { label: 'Core Offer \u2014 Buy 2, Get 1 Free', price: '${currency}120 for 3 kits', words: `"Buy 2 kits, get the third free \u2014 120${currency} for 3 complete kits."`, highlight: true },
        { label: 'Christmas Premium \u2014 Buy 2, Get 2', price: '${currency}120 for 4 kits', words: `"Holiday special: buy 2, get 2 free \u2014 120${currency} for 4 nail kits."` },
        { label: 'Mix & Match', price: '${currency}60 for 2', words: `"Mix and match a Nail Kit with a Scrub or Body Butter \u2014 buy one, get one \u2014 just 60${currency} for 2 products."` },
        { label: 'Warranty Pitch', price: 'Demo', words: '"Even if your dog eats it, you can bring it back and we replace it."' },
        { label: 'Final Push', price: `30${currency}`, words: '"The whole kit for 30${currency} \u2014 that\'s my final price."', highlight: true },
      ],
    },
  ];
}
// ── Script Data ──
interface ScriptCard {
  id: string;
  category: 'opening' | 'closing' | 'objection' | 'partner' | 'competitor';
  title: string;
  text: string;
  product?: string;
}

function getScripts(lang: Language, currency: string, locationName: string): ScriptCard[] {
  if (lang === 'es') {
    return [
      // Opening scripts
      { id: 'o1', category: 'opening', title: 'Jeringa \u2014 Gancho de Curiosidad', product: 'Syringe', text: '"\u00bfPuedo mostrarte algo? Este es nuestro tratamiento m\u00e1s vendido \u2014 es como Botox en una jeringa, pero natural e instant\u00e1neo."' },
      { id: 'o2', category: 'opening', title: 'Jeringa \u2014 Apertura con Cumplido', product: 'Syringe', text: '"Tu piel tiene una gran estructura. Quiero mostrarte algo que la llevar\u00e1 al siguiente nivel \u2014 nuestro tratamiento de relleno instant\u00e1neo."' },
      { id: 'o3', category: 'opening', title: 'Peeling \u2014 Problema-Agitaci\u00f3n', product: 'Peeling', text: '"\u00bfAlguna vez sientes que tu piel se ve apagada incluso con maquillaje? Nuestro peeling de 60 segundos lo arregla instant\u00e1neamente."' },
      { id: 'o4', category: 'opening', title: 'Peeling \u2014 La Revelaci\u00f3n', product: 'Peeling', text: '"Te voy a mostrar algo \u2014 mira mi mano. \u00bfVes la diferencia? Esos son 5 a\u00f1os de opacidad eliminados en un minuto."' },
      { id: 'o5', category: 'opening', title: 'Exfoliante \u2014 Experiencia Spa', product: 'Scrub', text: '"Cierra los ojos un segundo... \u00bfsientes ese aroma? Esos son minerales del Mar Muerto. D\u00e9jame darte la experiencia spa de 30 segundos."' },
      { id: 'o6', category: 'opening', title: 'Kit de U\u00f1as \u2014 Ahorro de Tiempo', product: 'Nail Kit', text: '"\u00bfQu\u00e9 tan seguido te haces la manicura francesa? \u00bfY si pudieras hacerla en 5 minutos en casa, perfecta, cada vez?"' },
      { id: 'o7', category: 'opening', title: 'Universal \u2014 Directo', text: '"Tengo algo que quiero mostrarte \u2014 toma 30 segundos y ver\u00e1s una diferencia instant\u00e1nea."' },
      { id: 'o8', category: 'opening', title: 'Universal \u2014 \u00c1ngulo de Regalo', text: '"\u00bfEst\u00e1s comprando para alguien m\u00e1s hoy? Porque esto es el regalo perfecto \u2014 y te mostrar\u00e9 por qu\u00e9."' },
      // Closing scripts
      { id: 'c1', category: 'closing', title: 'Cierre de Dos Opciones (Jeringa)', text: `"Entonces, \u00bfprefieres la jeringa sola a 300${currency}, o dos jeringas a 300${currency} con la segunda gratis para tu frente o labio superior?"` },
      { id: 'c1b', category: 'closing', title: 'Cierre de Dos Opciones (Oferta)', text: `"\u00bfPrefieres el 30% de descuento a 210${currency} con un regalo gratis, o la oferta de dos jeringas a 300${currency}?"` },
      { id: 'c2', category: 'closing', title: 'Cierre Asumido', text: '"Voy a reservar esto para ti en la caja. \u00bfQuieres la bolsa de regalo con \u00e9l?"' },
      { id: 'c3', category: 'closing', title: 'Cierre de Escasez', text: '"Este precio con cup\u00f3n solo es v\u00e1lido hoy \u2014 no quiero que te lo pierdas. \u00bfTe lo paso a caja?"' },
      { id: 'c4', category: 'closing', title: 'Cierre de Resumen (Jeringa)', text: `"As\u00ed que te llevas un tratamiento que cuesta 500${currency} en Europa por solo 300${currency} aqu\u00ed en ${locationName}. Gran elecci\u00f3n."` },
      { id: 'c4b', category: 'closing', title: 'Cierre de Resumen (Oferta)', text: `"As\u00ed que te llevas el tratamiento con un 30% de descuento a 210${currency} m\u00e1s un regalo gratis que vale m\u00e1s de 50${currency}. Oferta incre\u00edble."` },
      { id: 'c5', category: 'closing', title: 'Cierre con Testimonio', text: '"Una cliente estuvo aqu\u00ed ayer \u2014 compr\u00f3 dos, y volvi\u00f3 hoy por tres m\u00e1s como regalos. As\u00ed de bueno es esto."' },
      // Objection responses
      { id: 'r1', category: 'objection', title: '"Necesito pensarlo"', text: '"Por supuesto. Solo para que sepas, este cup\u00f3n expira cuando salgas de la tienda \u2014 est\u00e1 vinculado a la visita de hoy. Puedo reservarlo en la caja por 10 minutos mientras miras alrededor, y el precio se mantiene."' },
      { id: 'r2', category: 'objection', title: '"Es muy caro" (Jeringa)', text: `"Te entiendo. En Europa esto cuesta 500${currency}. Aqu\u00ed en ${locationName} es 300${currency}. Y con la oferta de hoy puedo hacer un 30% de descuento \u2014 eso es 210${currency}. D\u00e9jame ver qu\u00e9 m\u00e1s puedo hacer..."` },
      { id: 'r2b', category: 'objection', title: '"Es muy caro" (Peeling)', text: `"Te entiendo. En Europa esto cuesta 200${currency}. Aqu\u00ed en ${locationName} es 150${currency}. Y ahora mismo puedo hacer un 50% de descuento \u2014 eso es 100${currency} con un regalo de exfoliante del Mar Muerto gratis."` },
      { id: 'r2c', category: 'objection', title: '"Es muy caro" (Exfoliante)', text: `"Te entiendo. En Europa uno de estos cuesta 100${currency}. Aqu\u00ed es 60${currency}. Y con compra 2 lleva 1 gratis, eso es 120${currency} por 3 productos. D\u00e9jame quitar el regalo y puedo hacer algo a\u00fan mejor..."` },
      { id: 'r2d', category: 'objection', title: '"Es muy caro" (Kit de U\u00f1as)', text: `"Te entiendo. En Europa este kit cuesta 100${currency}. Aqu\u00ed en ${locationName} es 60${currency}. Y con compra 2 lleva 1 gratis, eso es 120${currency} por 3 kits completos."` },
      { id: 'r3', category: 'objection', title: '"Ya tengo algo similar"', text: '"La mayor\u00eda de nuestros clientes tambi\u00e9n. Pero cuando prueban esto, me dicen que es completamente diferente. \u00bfPuedo mostrarte por qu\u00e9 en 30 segundos?"' },
      { id: 'r4', category: 'objection', title: '"Solo estoy mirando"', text: '"No hay problema \u2014 mirar es gratis. Pero \u00bfpuedo mostrarte algo que toma 20 segundos? No tienes que comprar nada, solo me encanta la reacci\u00f3n."' },
      { id: 'r5', category: 'objection', title: '"Necesito preguntarle a mi pareja"', text: '"Por supuesto. Si estuviera aqu\u00ed, \u00bfqu\u00e9 dir\u00eda? [Pausa] Toma \u2014 lleva esta tarjeta de muestra con el precio escrito. El cup\u00f3n es v\u00e1lido solo por hoy."' },
      { id: 'r6', category: 'objection', title: '"No tengo tiempo"', text: '"Esto toma exactamente 60 segundos \u2014 te lo cronometro. Y si no ves una diferencia, te deseo un gran d\u00eda. \u00bfTrato?"' },
      // Partner engagement
      { id: 'p1', category: 'partner', title: 'Incluye a la Pareja', text: '"Y se\u00f1or/se\u00f1ora \u2014 te va a encantar c\u00f3mo se ve en ellos. \u00bfQuieres ver el resultado instant\u00e1neo tambi\u00e9n?"' },
      { id: 'p2', category: 'partner', title: 'Sugerencia de Regalo', text: `"La mayor\u00eda de las parejas compran uno para ella y un exfoliante para \u00e9l \u2014 es un bonito recuerdo de ${locationName}. Puedo hacer ambos por un precio de paquete."` },
      { id: 'p3', category: 'partner', title: 'Pregunta de Opini\u00f3n', text: '"\u00bfQu\u00e9 crees \u2014 \u00bfte parece que deber\u00eda ir con el brillo instant\u00e1neo o el tratamiento a largo plazo? T\u00fa los conoces mejor."' },
      // Competitor handling
      { id: 'comp1', category: 'competitor', title: '"Dijeron que es m\u00e1s barato all\u00e1"', text: '"\u00a1Puede ser! Pero \u00bfsu producto te muestra resultados en 2 minutos? D\u00e9jame mostrarte..."' },
      { id: 'comp2', category: 'competitor', title: '"Lo vi en Amazon"', text: '"\u00a1Probablemente s\u00ed lo viste! Pero en l\u00ednea no puedes probarlo. Siente esto \u2014 huele esto \u2014 mira el resultado en tu propia piel."' },
      { id: 'comp3', category: 'competitor', title: '"La otra tienda me dio mejor precio"', text: '"Lo respeto. Pero el precio no lo es todo \u2014 los resultados s\u00ed. D\u00e9jame mostrarte por qu\u00e9 somos diferentes."' },
      { id: 'comp4', category: 'competitor', title: '"He o\u00eddo de [marca competidora]"', text: '"\u00a1Excelente marca! De hecho usamos ingredientes similares. La diferencia es nuestra concentraci\u00f3n y el resultado inmediato. Mira..."' },
    ];
  }

  return [
    // Opening scripts
    { id: 'o1', category: 'opening', title: 'Syringe \u2014 Curiosity Hook', product: 'Syringe', text: '"Can I show you something? This is our bestselling treatment \u2014 it\'s like Botox in a syringe, but natural and instant."' },
    { id: 'o2', category: 'opening', title: 'Syringe \u2014 Compliment Open', product: 'Syringe', text: '"Your skin has great structure. I want to show you something that will take it to the next level \u2014 our instant filler treatment."' },
    { id: 'o3', category: 'opening', title: 'Peeling \u2014 Problem-Agitate', product: 'Peeling', text: '"Do you ever feel like your skin looks dull even with makeup? Our 60-second peeling fixes that instantly."' },
    { id: 'o4', category: 'opening', title: 'Peeling \u2014 The Reveal', product: 'Peeling', text: '"I\'m going to show you something \u2014 watch my hand. See the difference? That\'s 5 years of dullness gone in one minute."' },
    { id: 'o5', category: 'opening', title: 'Scrub \u2014 Spa Experience', product: 'Scrub', text: '"Close your eyes for a second... smell that? That\'s Dead Sea minerals. Let me give you the 30-second spa experience."' },
    { id: 'o6', category: 'opening', title: 'Nail Kit \u2014 Time Saver', product: 'Nail Kit', text: '"How often do you get a French manicure? What if you could do it in 5 minutes at home, perfectly, every time?"' },
    { id: 'o7', category: 'opening', title: 'Universal \u2014 Direct', text: '"I have something I want to show you \u2014 it takes 30 seconds and you\'ll see an instant difference."' },
    { id: 'o8', category: 'opening', title: 'Universal \u2014 Gift Angle', text: '"Are you shopping for anyone else today? Because this makes the perfect gift \u2014 and I\'ll show you why."' },
    // Closing scripts
    { id: 'c1', category: 'closing', title: 'Two-Choice Close (Syringe)', text: `"So would you prefer the single syringe at 300${currency}, or two syringes at 300${currency} with the second one free for your forehead or upper lip?"` },
    { id: 'c1b', category: 'closing', title: 'Two-Choice Close (Offer)', text: `"Would you prefer the 30% off at 210${currency} with a free gift, or the two-syringe deal at 300${currency}?"` },
    { id: 'c2', category: 'closing', title: 'Assumptive Close', text: '"I\'ll set this aside for you at the counter. Do you want the gift bag with it?"' },
    { id: 'c3', category: 'closing', title: 'Scarcity Close', text: '"This voucher price is only valid today \u2014 I don\'t want you to miss it. Should I ring it up?"' },
    { id: 'c4', category: 'closing', title: 'Summary Close (Syringe)', text: `"So you\'re getting a treatment that costs 500${currency} in Europe for just 300${currency} here in ${locationName}. Great choice."` },
    { id: 'c4b', category: 'closing', title: 'Summary Close (Offer)', text: `"So you\'re getting the treatment for 30% off at 210${currency} plus a free gift worth over 50${currency}. Amazing deal."` },
    { id: 'c5', category: 'closing', title: 'Testimonial Close', text: '"A customer was in here yesterday \u2014 she bought two, and came back today for three more as gifts. That\'s how good this is."' },
    // Objection responses
    { id: 'r1', category: 'objection', title: '"I need to think about it"', text: '"Of course. Just so you know, this voucher expires when you leave the store \u2014 it\'s tied to today\'s visit. I can hold it at the counter for 10 minutes while you look around, and the price stays locked."' },
    { id: 'r2', category: 'objection', title: '"It\'s too expensive" (Syringe)', text: `"I hear you. In Europe this costs 500${currency}. Here in ${locationName} it\'s 300${currency}. And with today\'s offer I can do 30% off \u2014 that\'s 210${currency}. Let me check what else I can do..."` },
    { id: 'r2b', category: 'objection', title: '"It\'s too expensive" (Peeling)', text: `"I hear you. In Europe this costs 200${currency}. Here in ${locationName} it\'s 150${currency}. And right now I can do 50% off \u2014 that\'s 100${currency} with a free Dead Sea scrub gift."` },
    { id: 'r2c', category: 'objection', title: '"It\'s too expensive" (Scrub)', text: `"I hear you. In Europe one of these is 100${currency}. Here it\'s 60${currency}. And with buy 2 get 1 free, that\'s 120${currency} for 3 products. Let me take the gift away and I can do even better..."` },
    { id: 'r2d', category: 'objection', title: '"It\'s too expensive" (Nail Kit)', text: `"I hear you. In Europe this kit is 100${currency}. Here in ${locationName} it\'s 60${currency}. And with buy 2 get 1 free, that\'s 120${currency} for 3 complete kits."` },
    { id: 'r3', category: 'objection', title: '"I already have something similar"', text: '"Most of our customers do too. But when they try this, they tell me it\'s completely different. Can I show you why in 30 seconds?"' },
    { id: 'r4', category: 'objection', title: '"I\'m just looking"', text: '"No problem at all \u2014 looking is free. But can I show you something that takes 20 seconds? You don\'t have to buy anything, I just love the reaction."' },
    { id: 'r5', category: 'objection', title: '"I need to ask my partner"', text: '"Absolutely. If they were here, what would they say? [Pause] Here \u2014 take this sample card with the price written down. The voucher is valid for today only."' },
    { id: 'r6', category: 'objection', title: '"I don\'t have time"', text: '"This takes exactly 60 seconds \u2014 I\'ll time it. And if you don\'t see a difference, I\'ll wish you a great day. Deal?"' },
    // Partner engagement
    { id: 'p1', category: 'partner', title: 'Include the Partner', text: '"And sir/ma\'am \u2014 you\'re going to love how this looks on them. Want to see the instant result too?"' },
    { id: 'p2', category: 'partner', title: 'Gift Suggestion', text: `"Most couples buy one for her and a scrub for him \u2014 it\'s a nice memory from ${locationName}. I can do both for a package price."` },
    { id: 'p3', category: 'partner', title: 'Opinion Ask', text: '"What do you think \u2014 should they go with the instant glow or the long-term treatment? You know them best."' },
    // Competitor handling
    { id: 'comp1', category: 'competitor', title: '"They said it\'s cheaper there"', text: '"Maybe! But does their product show results in 2 minutes? Let me show you..."' },
    { id: 'comp2', category: 'competitor', title: '"I saw this on Amazon"', text: '"You probably did! But online you can\'t try it. Feel this \u2014 smell this \u2014 see the result on your own skin."' },
    { id: 'comp3', category: 'competitor', title: '"The other shop gave me a better price"', text: '"I respect that. But price isn\'t everything \u2014 results are. Let me show you why we\'re different."' },
    { id: 'comp4', category: 'competitor', title: '"I\'ve heard of [competitor brand]"', text: '"Great brand! We actually use similar ingredients. The difference is our concentration and the immediate result. Watch..."' },
  ];
}
// ── Key Phrases ──
interface Phrase {
  id: string;
  text: string;
  type: 'good' | 'bad';
  reason: string;
}

function getPhrases(lang: Language, _currency: string, locationName: string): Phrase[] {
  if (lang === 'es') {
    return [
      { id: 'g1', text: '"D\u00e9jame mostrarte algo..."', type: 'good', reason: 'Crea curiosidad, sin presi\u00f3n' },
      { id: 'g2', text: '"La mayor\u00eda elige..."', type: 'good', reason: 'Prueba social + gu\u00eda la decisi\u00f3n' },
      { id: 'g3', text: '"Esto solo es v\u00e1lido hoy"', type: 'good', reason: 'Escasez genuina, no agresiva' },
      { id: 'g4', text: '"Ver\u00e1s la diferencia instant\u00e1neamente"', type: 'good', reason: 'Promete valor inmediato' },
      { id: 'g5', text: `"\u00bfQu\u00e9 te trae a ${locationName}?"`, type: 'good', reason: 'Abre la conversaci\u00f3n naturalmente' },
      { id: 'g6', text: '"Esa es una gran elecci\u00f3n"', type: 'good', reason: 'Valida su decisi\u00f3n' },
      { id: 'g7', text: '"Siente esta textura..."', type: 'good', reason: 'Compromiso sensorial' },
      { id: 'g8', text: '"\u00bfPuedo pedir tu opini\u00f3n?"', type: 'good', reason: 'Los hace sentir valorados' },
      { id: 'b1', text: '"\u00bfNecesitas ayuda?"', type: 'bad', reason: 'Dispara el reflejo de "solo estoy mirando"' },
      { id: 'b2', text: '"Es muy barato"', type: 'bad', reason: 'Deval\u00faa la percepci\u00f3n del producto' },
      { id: 'b3', text: '"No hay problema / Claro"', type: 'bad', reason: 'Lenguaje minimizador, suena pasivo' },
      { id: 'b4', text: '"\u00bfTe interesa?"', type: 'bad', reason: 'F\u00e1cil decir que no' },
      { id: 'b5', text: '"Conf\u00eda en m\u00ed..."', type: 'bad', reason: 'Genera sospecha' },
      { id: 'b6', text: '"Este es el m\u00e1s caro"', type: 'bad', reason: 'Se enfoca en el costo, no en el valor' },
    ];
  }

  return [
    { id: 'g1', text: '"Let me show you something..."', type: 'good', reason: 'Creates curiosity, no pressure' },
    { id: 'g2', text: '"Most people choose..."', type: 'good', reason: 'Social proof + guides decision' },
    { id: 'g3', text: '"This is only valid today"', type: 'good', reason: 'Genuine scarcity, not pushy' },
    { id: 'g4', text: '"You\'ll see the difference instantly"', type: 'good', reason: 'Promises immediate value' },
    { id: 'g5', text: `"What brings you to ${locationName}?"`, type: 'good', reason: 'Opens conversation naturally' },
    { id: 'g6', text: '"That\'s a great choice"', type: 'good', reason: 'Validates their decision' },
    { id: 'g7', text: '"Feel this texture..."', type: 'good', reason: 'Sensory engagement' },
    { id: 'g8', text: '"Can I ask your opinion?"', type: 'good', reason: 'Makes them feel valued' },
    { id: 'b1', text: '"Do you need any help?"', type: 'bad', reason: 'Triggers "just looking" reflex' },
    { id: 'b2', text: '"It\'s really cheap"', type: 'bad', reason: 'Cheapens the product perception' },
    { id: 'b3', text: '"No problem / Sure"', type: 'bad', reason: 'Minimizes language, sounds passive' },
    { id: 'b4', text: '"Are you interested?"', type: 'bad', reason: 'Easy to say no to' },
    { id: 'b5', text: '"Trust me..."', type: 'bad', reason: 'Raises suspicion' },
    { id: 'b6', text: '"This is our most expensive"', type: 'bad', reason: 'Focuses on cost not value' },
  ];
}
// ── Psychology Data ──
interface CialdiniPrinciple {
  id: string;
  name: string;
  description: string;
  salesApply: string;
}

function getCialdini(lang: Language): CialdiniPrinciple[] {
  if (lang === 'es') {
    return [
      { id: 'ci1', name: 'Reciprocidad', description: 'Las personas se sienten obligadas a devolver cuando reciben algo.', salesApply: 'Da una muestra gratis, demo o peque\u00f1o regalo primero. Se sentir\u00e1n m\u00e1s inclinados a comprar.' },
      { id: 'ci2', name: 'Compromiso', description: 'Las personas quieren actuar de forma consistente con sus compromisos previos.', salesApply: 'Haz que acepten "el resultado se ve genial" \u2014 entonces pedir la venta se siente consistente.' },
      { id: 'ci3', name: 'Prueba Social', description: 'Las personas siguen lo que otros est\u00e1n haciendo.', salesApply: '"Este es nuestro m\u00e1s vendido" / "Acabo de vender tres de estos" / muestra testimonios.' },
      { id: 'ci4', name: 'Autoridad', description: 'Las personas obedecen a expertos y fuentes cre\u00edbles.', salesApply: '"En Europa, los dermat\u00f3logos recomiendan esto" / demuestra conocimiento profundo del producto.' },
      { id: 'ci5', name: 'Simpat\u00eda', description: 'Las personas compran de gente que les cae bien.', salesApply: 'Cumplidos genuinos, encuentra puntos en com\u00fan, refleja su energ\u00eda.' },
      { id: 'ci6', name: 'Escasez', description: 'Las personas valoran lo que es raro o limitado.', salesApply: '"Solo v\u00e1lido hoy" / "Stock limitado" / "Este cup\u00f3n expira cuando te vayas".' },
    ];
  }

  return [
    { id: 'ci1', name: 'Reciprocity', description: 'People feel obliged to give back when they receive.', salesApply: 'Give a free sample, demo, or small gift first. They\'ll feel more inclined to buy.' },
    { id: 'ci2', name: 'Commitment', description: 'People want to act consistently with their prior commitments.', salesApply: 'Get them to agree "the result looks great" \u2014 then asking for the sale feels consistent.' },
    { id: 'ci3', name: 'Social Proof', description: 'People follow what others are doing.', salesApply: '"This is our bestseller" / "I just sold three of these" / show testimonials.' },
    { id: 'ci4', name: 'Authority', description: 'People defer to experts and credible sources.', salesApply: '"In Europe, dermatologists recommend this" / demonstrate deep product knowledge.' },
    { id: 'ci5', name: 'Liking', description: 'People buy from people they like.', salesApply: 'Genuine compliments, find common ground, mirror their energy.' },
    { id: 'ci6', name: 'Scarcity', description: 'People value what is rare or limited.', salesApply: '"Only valid today" / "Limited stock" / "This voucher expires when you leave".' },
  ];
}

function getBodyLanguage(lang: Language) {
  if (lang === 'es') {
    return [
      { tip: 'Palmas abiertas al presentar', meaning: 'Genera confianza, se\u00f1ala honestidad' },
      { tip: 'Ligera inclinaci\u00f3n hacia adelante', meaning: 'Muestra inter\u00e9s y compromiso' },
      { tip: 'Imita su postura', meaning: 'Crea rapport subconsciente' },
      { tip: 'Sonr\u00ede con los ojos (Duchenne)', meaning: 'Parece genuina, no forzada' },
      { tip: 'Entr\u00e9gales el producto', meaning: 'Una vez que lo sostienen, comienza la sensaci\u00f3n de propiedad' },
      { tip: 'P\u00f3nte de lado, no de frente', meaning: 'Menos confrontacional, m\u00e1s acogedor' },
    ];
  }

  return [
    { tip: 'Open palms when presenting', meaning: 'Builds trust, signals honesty' },
    { tip: 'Slight forward lean', meaning: 'Shows interest and engagement' },
    { tip: 'Mirror their posture', meaning: 'Creates subconscious rapport' },
    { tip: 'Smile with eyes (Duchenne)', meaning: 'Appears genuine, not forced' },
    { tip: 'Hand product to them', meaning: 'Once they hold it, ownership feeling begins' },
    { tip: 'Stand at an angle, not head-on', meaning: 'Less confrontational, more inviting' },
  ];
}

function getBuyingSignals(lang: Language) {
  if (lang === 'es') {
    return [
      { signal: 'Pregunta el precio', meaning: 'Considerando la compra en serio' },
      { signal: 'Toca/sostiene el producto', meaning: 'Se imagina si\u00e9ndolo' },
      { signal: 'Pregunta "\u00bfCu\u00e1nto dura?"', meaning: 'Calculando el valor' },
      { signal: 'Mira a su pareja/amigo', meaning: 'Buscando permiso para comprar' },
      { signal: 'Repite el beneficio contigo', meaning: 'Aceptaci\u00f3n mental form\u00e1ndose' },
      { signal: '"\u00bfPuedo usar esto con...?"', meaning: 'Integr\u00e1ndolo en su vida' },
    ];
  }

  return [
    { signal: 'Asks about price', meaning: 'Considering purchase seriously' },
    { signal: 'Touches/holds the product', meaning: 'Imagines owning it' },
    { signal: 'Asks "how long does it last?"', meaning: 'Calculating value' },
    { signal: 'Looks at partner/friend', meaning: 'Seeking permission to buy' },
    { signal: 'Repeats benefit back to you', meaning: 'Mental buy-in forming' },
    { signal: '"Can I use this with...?"', meaning: 'Integrating into their life' },
  ];
}

// ── Emergency Cheat Sheet Data ──
interface EmergencyOpener { id: string; text: string; }
interface EmergencyClose { id: string; text: string; }
interface EmergencyKiller { id: string; objection: string; killer: string; }

function getEmergencyOpeners(lang: Language, _currency: string, _locationName: string): EmergencyOpener[] {
  if (lang === 'es') {
    return [
      { id: 'eo1', text: '"Te prometo que estos ser\u00e1n los mejores 2 minutos de tu d\u00eda"' },
      { id: 'eo2', text: '"Solo quiero mostrarte algo incre\u00edble \u2014 sin presi\u00f3n de comprar"' },
      { id: 'eo3', text: '"Todo el que lo prueba lo compra \u2014 \u00bfquieres ver por qu\u00e9?"' },
      { id: 'eo4', text: '"\u00bfPuedo hacerte una pregunta r\u00e1pida? \u00bfQu\u00e9 usas para tus ojos?"' },
      { id: 'eo5', text: '"Mira esto \u2014 te garantizo que nunca has visto nada igual"' },
    ];
  }
  return [
    { id: 'eo1', text: '"I promise this will be the best 2 minutes of your day"' },
    { id: 'eo2', text: '"I just want to show you something amazing \u2014 no pressure to buy"' },
    { id: 'eo3', text: '"Everyone who tries this buys it \u2014 want to see why?"' },
    { id: 'eo4', text: '"Can I ask you a quick question? What do you use for your eyes?"' },
    { id: 'eo5', text: '"Watch this \u2014 I guarantee you\'ve never seen anything like it"' },
  ];
}

function getEmergencyCloses(lang: Language, currency: string, _locationName: string): EmergencyClose[] {
  if (lang === 'es') {
    return [
      { id: 'ec1', text: `"Hoy solo \u2014 y me refiero a SOLO hoy \u2014 cuesta ${currency}X en vez de ${currency}Y"` },
      { id: 'ec2', text: '"Te incluyo un segundo para tu amiga/mam\u00e1/hermana a mitad de precio"' },
      { id: 'ec3', text: '"Mira \u2014 toma mi tarjeta. Si no te encanta, m\u00e1ndame WhatsApp y te devuelvo el dinero. Pero no lo har\u00e1s."' },
    ];
  }
  return [
    { id: 'ec1', text: `"Today only \u2014 and I mean ONLY today \u2014 it\'s ${currency}X instead of ${currency}Y"` },
    { id: 'ec2', text: '"I\'ll throw in a second one for your friend/mom/sister at half price"' },
    { id: 'ec3', text: '"Look \u2014 take my card. If you don\'t love it, WhatsApp me and I\'ll refund you. But you won\'t."' },
  ];
}

function getEmergencyKillers(lang: Language, currency: string, _locationName: string): EmergencyKiller[] {
  if (lang === 'es') {
    return [
      { id: 'ek1', objection: `"Muy caro"`, killer: `"\u00bfComparado con qu\u00e9? Una sola inyecci\u00f3n de Botox cuesta ${currency}300 y esto dura 3 meses"` },
      { id: 'ek2', objection: `"Necesito pensarlo"`, killer: `"Lo entiendo. Pero este precio es literalmente solo hoy. Ma\u00f1ana vuelve a ${currency}[mayor]"` },
      { id: 'ek3', objection: '"Solo estoy mirando"', killer: '"\u00a1Perfecto! Mirar es gratis. Pero probar cambia la vida. \u00bf2 minutos?"' },
    ];
  }
  return [
    { id: 'ek1', objection: `"Too expensive"`, killer: `"Compared to what? A single Botox injection is ${currency}300 and this lasts 3 months"` },
    { id: 'ek2', objection: `"Need to think"`, killer: `"I get it. But this price is literally today only. Tomorrow it\'s back to ${currency}[higher]"` },
    { id: 'ek3', objection: '"Just looking"', killer: '"Perfect! Looking is free. But trying is life-changing. 2 minutes?"' },
  ];
}
// ── Components ──
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-[#8A8A8A] hover:text-[#0ABAB5] transition-colors shrink-0"
      title="Copy"
    >
      {copied ? <Check size={14} className="text-[#0ABAB5]" /> : <Copy size={14} />}
    </button>
  );
}

function ExpandableCard({
  title,
  subtitle,
  icon,
  color,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[#1A1A1A] bg-[#111111] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: color + '15', color }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{title}</p>
          {subtitle && <p className="text-[11px] text-[#8A8A8A] truncate">{subtitle}</p>}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-[#8A8A8A]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-[#1A1A1A]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ──
export default function CheatSheetsPage() {
  const { currency, locationName } = useLocation();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SheetTab>('all');
  const [search, setSearch] = useState('');
  const [scriptFilter, setScriptFilter] = useState<string>('all');

  const searchLower = search.toLowerCase().trim();

  // Category label map for display
  const categoryLabelMap: Record<string, string> = {
    all: t('cheatSheetsAll'),
    opening: t('cheatSheetsOpening'),
    closing: t('cheatSheetsClosing'),
    objection: t('cheatSheetsObjections'),
    partner: t('cheatSheetsPartner'),
    competitor: language === 'es' ? 'Competencia' : 'Competitor',
  };

  const scriptFilters = [
    { key: 'all', label: categoryLabelMap['all'] },
    { key: 'opening', label: categoryLabelMap['opening'] },
    { key: 'closing', label: categoryLabelMap['closing'] },
    { key: 'objection', label: categoryLabelMap['objection'] },
    { key: 'partner', label: categoryLabelMap['partner'] },
    { key: 'competitor', label: categoryLabelMap['competitor'] },
  ];

  // Get data based on current language
  const PRODUCT_LADDERS = useMemo(() => getProductLadders(language, currency, locationName), [language, currency, locationName]);
  const SCRIPTS = useMemo(() => getScripts(language, currency, locationName), [language, currency, locationName]);
  const PHRASES = useMemo(() => getPhrases(language, currency, locationName), [language, currency, locationName]);
  const CIALDINI = useMemo(() => getCialdini(language), [language]);
  const BODY_LANGUAGE = useMemo(() => getBodyLanguage(language), [language]);
  const BUYING_SIGNALS = useMemo(() => getBuyingSignals(language), [language]);
  const EMERGENCY_OPENERS = useMemo(() => getEmergencyOpeners(language, currency, locationName), [language, currency, locationName]);
  const EMERGENCY_CLOSES = useMemo(() => getEmergencyCloses(language, currency, locationName), [language, currency, locationName]);
  const EMERGENCY_KILLERS = useMemo(() => getEmergencyKillers(language, currency, locationName), [language, currency, locationName]);

  const filteredScripts = useMemo(() => {
    let list = SCRIPTS;
    if (scriptFilter !== 'all') {
      list = list.filter((s) => s.category === scriptFilter);
    }
    if (searchLower) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(searchLower) ||
          s.text.toLowerCase().includes(searchLower) ||
          (s.product && s.product.toLowerCase().includes(searchLower))
      );
    }
    return list;
  }, [scriptFilter, searchLower, SCRIPTS]);

  const filteredPhrases = useMemo(() => {
    if (!searchLower) return PHRASES;
    return PHRASES.filter(
      (p) =>
        p.text.toLowerCase().includes(searchLower) ||
        p.reason.toLowerCase().includes(searchLower)
    );
  }, [searchLower, PHRASES]);

  const showPrices = activeTab === 'all' || activeTab === 'prices';
  const showScripts = activeTab === 'all' || activeTab === 'scripts';
  const showEmergency = activeTab === 'all' || activeTab === 'emergency';
  const showPsych = activeTab === 'all' || activeTab === 'psychology';

  return (
    <div className="min-h-full bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="pt-6 px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={20} className="text-[#0ABAB5]" />
            <h1 className="text-h1 text-white">{t('cheatSheetsTitle')}</h1>
          </div>
          <p className="text-body-small text-[#8A8A8A] mb-4">
            {t('cheatSheetsSubtitle')}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="relative mb-4"
        >
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('cheatSheetsSearch')}
            className="w-full bg-[#111111] border border-[#1A1A1A] rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#8A8A8A] outline-none focus:border-[#0ABAB5] transition-colors"
          />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-6"
        >
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SheetTab)}>
            <TabsList className="w-full bg-[#111111] border border-[#1A1A1A] h-auto p-1 gap-1 flex-wrap">
              <TabsTrigger
                value="all"
                className="flex-1 text-xs data-[state=active]:bg-[#0ABAB5] data-[state=active]:text-black rounded-lg py-2"
              >
                {t('cheatSheetsAll')}
              </TabsTrigger>
              <TabsTrigger
                value="prices"
                className="flex-1 text-xs data-[state=active]:bg-[#0ABAB5] data-[state=active]:text-black rounded-lg py-2"
              >
                {t('cheatSheetsPrices')}
              </TabsTrigger>
              <TabsTrigger
                value="scripts"
                className="flex-1 text-xs data-[state=active]:bg-[#0ABAB5] data-[state=active]:text-black rounded-lg py-2"
              >
                {t('cheatSheetsScripts')}
              </TabsTrigger>
              <TabsTrigger
                value="emergency"
                className="flex-1 text-xs data-[state=active]:bg-[#EF4444] data-[state=active]:text-white rounded-lg py-2"
              >
                {language === 'es' ? 'Emergencia' : 'Emergency'}
              </TabsTrigger>
              <TabsTrigger
                value="psychology"
                className="flex-1 text-xs data-[state=active]:bg-[#0ABAB5] data-[state=active]:text-black rounded-lg py-2"
              >
                {t('cheatSheetsPsychology')}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
      </div>

      <div className="px-5 space-y-6">
        {/* ── PRICE LADDER ── */}
        {showPrices && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16} className="text-[#0ABAB5]" />
              <h2 className="text-h4 text-white">{t('cheatSheetsPriceLadder')}</h2>
            </div>
            <div className="space-y-3">
              {PRODUCT_LADDERS.map((product) => (
                <ExpandableCard
                  key={product.id}
                  title={product.name}
                  subtitle={`Europe: ${product.europePrice.replace(/\u20ac/g, currency)} \u2192 From ${product.minPrice.replace(/\u20ac/g, currency)}`}
                  icon={product.icon}
                  color={product.color}
                >
                  <div className="pt-3 space-y-2.5">
                    {product.steps.map((step, i) => (
                      <div
                        key={i}
                        className={`relative rounded-lg p-3 ${
                          step.highlight
                            ? 'bg-[#0ABAB5]/8 border border-[#0ABAB5]/20'
                            : step.isStrike
                            ? 'bg-[#1A1A1A]/50 border border-[#2A2A2A]'
                            : 'bg-[#0F0F0F] border border-[#1A1A1A]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A8A]">
                            {step.label}
                          </span>
                          <span
                            className={`text-xs font-bold ${
                              step.isStrike
                                ? 'text-[#8A8A8A] line-through'
                                : step.highlight
                                ? 'text-[#0ABAB5]'
                                : 'text-white'
                            }`}
                          >
                            {step.price.replace(/\u20ac/g, currency)}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs text-white/80 italic leading-relaxed flex-1">
                            {step.words}
                          </p>
                          <CopyButton text={step.words} />
                        </div>
                      </div>
                    ))}

                    {/* Min price footer */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-[#8A8A8A]">{t('cheatSheetsMinPrice')}</span>
                      <span className="text-sm font-bold text-[#0ABAB5]">{product.minPrice.replace(/\u20ac/g, currency)}</span>
                    </div>
                  </div>
                </ExpandableCard>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── SCRIPTS ── */}
        {showScripts && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle size={16} className="text-[#8B5CF6]" />
              <h2 className="text-h4 text-white">{t('cheatSheetsScripts')}</h2>
            </div>

            {/* Script sub-filters */}
            <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar">
              {scriptFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setScriptFilter(f.key)}
                  className={`shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full transition-colors ${
                    scriptFilter === f.key
                      ? 'bg-[#8B5CF6] text-white'
                      : 'bg-[#111111] text-[#8A8A8A] border border-[#1A1A1A]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              <AnimatePresence mode="popLayout">
                {filteredScripts.map((script) => (
                  <motion.div
                    key={script.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-[#1A1A1A] bg-[#111111] p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {script.product && (
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor:
                              script.product === 'Syringe'
                                ? '#0ABAB520'
                                : script.product === 'Peeling'
                                ? '#8B5CF620'
                                : script.product === 'Scrub'
                                ? '#F59E0B20'
                                : '#EC489920',
                            color:
                              script.product === 'Syringe'
                                ? '#0ABAB5'
                                : script.product === 'Peeling'
                                ? '#8B5CF6'
                                : script.product === 'Scrub'
                                ? '#F59E0B'
                                : '#EC4899',
                          }}
                        >
                          {script.product}
                        </span>
                      )}
                      <span className="text-[10px] font-medium text-[#8A8A8A] uppercase tracking-wider">
                        {categoryLabelMap[script.category] ?? script.category}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white mb-1.5">{script.title}</p>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-white/70 italic leading-relaxed flex-1">{script.text}</p>
                      <CopyButton text={script.text} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredScripts.length === 0 && (
                <p className="text-center text-sm text-[#8A8A8A] py-6">{t('cheatSheetsNoScripts')}</p>
              )}
            </div>
          </motion.section>
        )}

        {/* ── EMERGENCY CHEAT SHEET ── */}
        {showEmergency && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
                <span className="text-[#EF4444] text-xs font-bold">!</span>
              </div>
              <h2 className="text-h4 text-white">
                {language === 'es' ? 'Hoja de Emergencia' : 'Emergency Cheat Sheet'}
              </h2>
            </div>

            {/* Emergency Openers */}
            <div className="rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-4 mb-3">
              <p className="text-xs font-semibold text-[#EF4444] mb-2 uppercase tracking-wider">
                {language === 'es' ? 'Aperturas de Emergencia' : 'Emergency Openers'}
              </p>
              <p className="text-[11px] text-[#8A8A8A] mb-3">
                {language === 'es' ? 'Cuando nada más funciona:' : 'When nothing else is working:'}
              </p>
              <div className="space-y-2">
                {EMERGENCY_OPENERS.map((op, i) => (
                  <div key={op.id} className="flex items-start gap-2.5">
                    <span className="text-[#EF4444] text-xs font-bold w-5 shrink-0">{i + 1}.</span>
                    <div className="flex items-start gap-2 flex-1">
                      <p className="text-xs text-white italic leading-relaxed flex-1">{op.text}</p>
                      <CopyButton text={op.text} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Closes */}
            <div className="rounded-xl border border-[#0ABAB5]/20 bg-[#0ABAB5]/5 p-4 mb-3">
              <p className="text-xs font-semibold text-[#0ABAB5] mb-2 uppercase tracking-wider">
                {language === 'es' ? 'Cierres de Emergencia' : 'Emergency Closes'}
              </p>
              <p className="text-[11px] text-[#8A8A8A] mb-3">
                {language === 'es' ? 'Último recurso para cerrar:' : 'Last resort to close:'}
              </p>
              <div className="space-y-2">
                {EMERGENCY_CLOSES.map((cl) => (
                  <div key={cl.id} className="flex items-start gap-2">
                    <Sparkles size={12} className="text-[#0ABAB5] mt-0.5 shrink-0" />
                    <div className="flex items-start gap-2 flex-1">
                      <p className="text-xs text-white italic leading-relaxed flex-1">{cl.text}</p>
                      <CopyButton text={cl.text} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Objection Killers */}
            <div className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-4">
              <p className="text-xs font-semibold text-[#F59E0B] mb-2 uppercase tracking-wider">
                {language === 'es' ? 'Matadores de Objeciones' : 'Objection Killers'}
              </p>
              <p className="text-[11px] text-[#8A8A8A] mb-3">
                {language === 'es' ? 'Respuestas rápidas para objeciones comunes:' : 'Quick responses for common objections:'}
              </p>
              <div className="space-y-3">
                {EMERGENCY_KILLERS.map((k) => (
                  <div key={k.id} className="space-y-1">
                    <p className="text-xs font-semibold text-[#F59E0B]">{k.objection}</p>
                    <div className="flex items-start gap-2">
                      <Zap size={12} className="text-[#0ABAB5] mt-0.5 shrink-0" />
                      <div className="flex items-start gap-2 flex-1">
                        <p className="text-xs text-white italic leading-relaxed flex-1">{k.killer}</p>
                        <CopyButton text={k.killer} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ── PSYCHOLOGY ── */}
        {showPsych && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            {/* Cialdini Principles */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-[#F59E0B]" />
                <h2 className="text-h4 text-white">{t('cheatSheetsCialdini')}</h2>
              </div>
              <div className="space-y-2.5">
                {CIALDINI.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl border border-[#1A1A1A] bg-[#111111] p-4"
                  >
                    <h3 className="text-sm font-semibold text-[#F59E0B] mb-1">{p.name}</h3>
                    <p className="text-xs text-white/70 mb-1.5">{p.description}</p>
                    <div className="flex items-start gap-2">
                      <Sparkles size={12} className="text-[#0ABAB5] mt-0.5 shrink-0" />
                      <p className="text-xs text-[#0ABAB5] italic">{p.salesApply}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Phrases */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle size={16} className="text-[#10B981]" />
                <h2 className="text-h4 text-white">{t('cheatSheetsKeyPhrases')}</h2>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredPhrases.map((phrase) => (
                  <div
                    key={phrase.id}
                    className={`rounded-xl border p-3.5 ${
                      phrase.type === 'good'
                        ? 'border-[#10B981]/20 bg-[#10B981]/5'
                        : 'border-[#EF4444]/20 bg-[#EF4444]/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {phrase.type === 'good' ? (
                        <ThumbsUp size={14} className="text-[#10B981]" />
                      ) : (
                        <XCircle size={14} className="text-[#EF4444]" />
                      )}
                      <p
                        className={`text-xs font-semibold ${
                          phrase.type === 'good' ? 'text-[#10B981]' : 'text-[#EF4444]'
                        }`}
                      >
                        {phrase.type === 'good' ? t('cheatSheetsSayThis') : t('cheatSheetsAvoidThis')}
                      </p>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm text-white italic mb-0.5">{phrase.text}</p>
                        <p className="text-[11px] text-[#8A8A8A]">{phrase.reason}</p>
                      </div>
                      <CopyButton text={phrase.text} />
                    </div>
                  </div>
                ))}
                {filteredPhrases.length === 0 && (
                  <p className="text-center text-sm text-[#8A8A8A] py-4">{t('cheatSheetsNoPhrases')}</p>
                )}
              </div>
            </div>

            {/* Body Language */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Eye size={16} className="text-[#8B5CF6]" />
                <h2 className="text-h4 text-white">{t('cheatSheetsBodyLanguage')}</h2>
              </div>
              <div className="space-y-2">
                {BODY_LANGUAGE.map((bl, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-[#1A1A1A] bg-[#111111] p-3.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                      <Heart size={12} className="text-[#8B5CF6]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{bl.tip}</p>
                      <p className="text-[11px] text-[#8A8A8A] mt-0.5">{bl.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buying Signals */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} className="text-[#0ABAB5]" />
                <h2 className="text-h4 text-white">{t('cheatSheetsBuyingSignals')}</h2>
              </div>
              <div className="space-y-2">
                {BUYING_SIGNALS.map((bs, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-[#1A1A1A] bg-[#111111] p-3.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#0ABAB5]/10 flex items-center justify-center shrink-0">
                      <ShieldCheck size={12} className="text-[#0ABAB5]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{bs.signal}</p>
                      <p className="text-[11px] text-[#0ABAB5] mt-0.5">{bs.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
}
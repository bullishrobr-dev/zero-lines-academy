import { useState, useCallback } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Waves,
  Copy,
  Check,
  Sparkles,
  Lightbulb,
  Gift,
  Package,
  TrendingDown,
  Hand,
  Moon,
  Volume2,
  Droplets,
  Sun,
} from 'lucide-react';
import { scrubData, getComboOffersData } from '../data/scrubData';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.32, 0.72, 0, 1] as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Icon map for Pro Tips (string name -> component)                   */
/* ------------------------------------------------------------------ */
const iconMap: Record<string, React.ReactNode> = {
  Hand: <Hand className="w-4 h-4" />,
  Droplets: <Droplets className="w-4 h-4" />,
  Sun: <Sun className="w-4 h-4" />,
  TrendingDown: <TrendingDown className="w-4 h-4" />,
  Gift: <Gift className="w-4 h-4" />,
  Package: <Package className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Moon: <Moon className="w-4 h-4" />,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ScrubPage() {
  const navigate = useNavigate();
  const { currency, locationName } = useLocation();
  const { language } = useLanguage();
  const isEs = language === 'es';

  const comboOffers = getComboOffersData(currency);
  const [copiedPrice, setCopiedPrice] = useState<string | null>(null);

  const copyPrice = useCallback((price: string) => {
    navigator.clipboard?.writeText(price).catch(() => {});
    setCopiedPrice(price);
    setTimeout(() => setCopiedPrice(null), 1500);
  }, []);

  return (
    <div className="min-h-full bg-[#0A0A0A]">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0D1F1F] to-[#0A0A0A] px-5 pt-6 pb-8">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#0ABAB5] opacity-10 blur-3xl pointer-events-none" />

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-[#8A8A8A] hover:text-white transition-colors mb-5"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">
            {isEs ? scrubData.backButton.textEs : scrubData.backButton.text}
          </span>
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 bg-[#0ABAB5]/15 border border-[#0ABAB5]/30 rounded-full px-3 py-1 mb-4"
        >
          <Waves className="w-3.5 h-3.5 text-[#0ABAB5]" />
          <span className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider">
            {isEs ? scrubData.hero.badgeEs : scrubData.hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[28px] font-extrabold text-white leading-tight tracking-tight"
        >
          {isEs ? scrubData.hero.titleEs : scrubData.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-[#0ABAB5] text-base font-medium mt-2"
        >
          <Hand className="w-4 h-4" />
          {isEs ? scrubData.hero.taglineEs : scrubData.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-2 mt-5"
        >
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Waves className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
              {isEs ? scrubData.hero.stats.sourceLabelEs : scrubData.hero.stats.sourceLabel}
            </p>
            <p className="text-xs font-bold text-white">
              {isEs ? scrubData.hero.stats.sourceValueEs : scrubData.hero.stats.sourceValue}
            </p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Moon className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
              {isEs ? scrubData.hero.stats.jarLastsLabelEs : scrubData.hero.stats.jarLastsLabel}
            </p>
            <p className="text-xs font-bold text-white">
              {isEs ? scrubData.hero.stats.jarLastsValueEs : scrubData.hero.stats.jarLastsValue}
            </p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Sparkles className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
              {isEs ? scrubData.hero.stats.feelingLabelEs : scrubData.hero.stats.feelingLabel}
            </p>
            <p className="text-xs font-bold text-white">
              {isEs ? scrubData.hero.stats.feelingValueEs : scrubData.hero.stats.feelingValue}
            </p>
          </div>
        </motion.div>
      </section>

      <div className="px-5 pb-10 space-y-6">
        {/* ─── THE HOOK ─── */}
        <motion.section
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? scrubData.hookSection.titleEs : scrubData.hookSection.title}
            </h2>
          </div>

          <div className="space-y-3">
            {scrubData.hookSection.quotes.map((quote, idx) => (
              <div key={idx} className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
                <p className="text-[13px] text-white italic font-serif leading-relaxed">
                  "{isEs ? quote.textEs : quote.text}"
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── THE SENSORY DEMO ─── */}
        <motion.section
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Hand className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? scrubData.sensoryDemoSection.titleEs : scrubData.sensoryDemoSection.title}
            </h2>
          </div>

          <div className="space-y-3">
            {scrubData.sensoryDemoSection.steps.map((item) => (
              <div key={item.step} className="flex gap-3 bg-[#0A0A0A] rounded-xl p-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0ABAB5]/20 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-[#0ABAB5]">{item.step}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">
                    {isEs ? item.titleEs : item.title}
                  </p>
                  <p className="text-[13px] text-[#8A8A8A] leading-relaxed">
                    {isEs ? item.textEs : item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── THE BUTTER FLIP TEST ─── */}
        <motion.section
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-gradient-to-br from-[#0ABAB5]/10 to-[#1A1A1A] rounded-2xl p-5 border border-[#0ABAB5]/25"
        >
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? scrubData.butterFlipSection.titleEs : scrubData.butterFlipSection.title}
            </h2>
          </div>

          <p className="text-[13px] text-[#B0B0B0] leading-relaxed mb-3">
            {isEs ? scrubData.butterFlipSection.descriptionEs : scrubData.butterFlipSection.description}
          </p>

          <div className="bg-[#0A0A0A]/60 rounded-xl p-4">
            <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
              {isEs ? scrubData.butterFlipSection.demoLabelEs : scrubData.butterFlipSection.demoLabel}
            </p>
            <p className="text-[14px] text-white italic font-serif leading-relaxed mb-2">
              {isEs ? scrubData.butterFlipSection.demoQuote1Es : scrubData.butterFlipSection.demoQuote1}
            </p>
            <p className="text-[15px] text-white italic font-serif leading-relaxed border-l-2 border-[#0ABAB5] pl-3">
              {isEs ? scrubData.butterFlipSection.demoQuote2Es : scrubData.butterFlipSection.demoQuote2}
            </p>
          </div>

          <p className="text-[12px] text-[#8A8A8A] mt-3 leading-relaxed">
            {isEs ? scrubData.butterFlipSection.closingLineEs : scrubData.butterFlipSection.closingLine}
            <em className="text-white/80">
              "{isEs ? scrubData.butterFlipSection.closingQuoteEs : scrubData.butterFlipSection.closingQuote}"
            </em>
          </p>
        </motion.section>

        {/* ─── COMBO OFFERS ─── */}
        <motion.section
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? scrubData.comboOffersSection.titleEs : scrubData.comboOffersSection.title}
            </h2>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mb-4">
            {isEs ? scrubData.comboOffersSection.subtitleEs : scrubData.comboOffersSection.subtitle}
          </p>

          <div className="space-y-3">
            {comboOffers.map((offer, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 ${
                  offer.isHighlight
                    ? 'border-[#0ABAB5]/30 bg-[#0ABAB5]/8'
                    : 'border-[#2A2A2A] bg-[#0A0A0A]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {offer.tag && (
                      <span className="bg-[#0ABAB5]/20 text-[#0ABAB5] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {isEs ? offer.tagEs : offer.tag}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => copyPrice(offer.price)}
                    className="flex items-center gap-1.5 bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors rounded-lg px-2.5 py-1"
                  >
                    <span className="font-mono text-lg font-bold text-white">
                      {offer.price}
                    </span>
                    {copiedPrice === offer.price ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#8A8A8A]" />
                    )}
                  </button>
                </div>
                <p className="text-sm font-semibold text-white mb-1">
                  {isEs ? offer.titleEs : offer.title}
                </p>
                <p className="text-[12px] text-[#8A8A8A] mb-2">
                  {isEs ? offer.subtitleEs : offer.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {offer.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-[11px] bg-[#1A1A1A] text-[#B0B0B0] px-2 py-1 rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── CHEAT COMBOS ─── */}
        <motion.section
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? scrubData.cheatCombosSection.titleEs : scrubData.cheatCombosSection.title}
            </h2>
          </div>

          <div className="grid gap-2">
            {scrubData.cheatCombosSection.combos.map((combo, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-[#0A0A0A] rounded-lg p-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {isEs ? combo.nameEs : combo.name}
                  </p>
                  <p className="text-[11px] text-[#8A8A8A]">{combo.items}</p>
                </div>
                <span className="font-mono text-sm font-bold text-[#0ABAB5]">
                  {combo.price.replace('{currency}', currency)}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── PRICE PRESENTATION ─── */}
        <motion.section
          custom={5}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? scrubData.pricePresentationSection.titleEs : scrubData.pricePresentationSection.title}
            </h2>
          </div>

          <div className="bg-[#0A0A0A] rounded-xl p-4 space-y-3">
            <div className="border-l-2 border-[#0ABAB5] pl-3">
              <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                {isEs ? scrubData.pricePresentationSection.anchorLabelEs : scrubData.pricePresentationSection.anchorLabel}
              </p>
              <p className="text-[14px] text-white italic font-serif">
                {isEs
                  ? scrubData.pricePresentationSection.anchorQuoteEs(currency)
                  : scrubData.pricePresentationSection.anchorQuote(currency)}
              </p>
            </div>
            <div className="border-l-2 border-[#0ABAB5] pl-3">
              <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">{locationName}</p>
              <p className="text-[14px] text-white italic font-serif">
                {isEs
                  ? scrubData.pricePresentationSection.localQuoteEs(currency, locationName)
                  : scrubData.pricePresentationSection.localQuote(currency, locationName)}
              </p>
            </div>
            <div className="border-l-2 border-[#0ABAB5] pl-3">
              <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                {isEs ? scrubData.pricePresentationSection.coreLabelEs : scrubData.pricePresentationSection.coreLabel}
              </p>
              <p className="text-[14px] text-white italic font-serif">
                {isEs
                  ? scrubData.pricePresentationSection.coreQuoteEs(currency)
                  : scrubData.pricePresentationSection.coreQuote(currency)}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── PRO TIPS ─── */}
        <motion.section
          custom={6}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? scrubData.proTipsSection.titleEs : scrubData.proTipsSection.title}
            </h2>
          </div>

          <div className="space-y-3">
            {scrubData.proTipsSection.tips.map((tip, i) => (
              <div key={i} className="flex gap-3 bg-[#0A0A0A] rounded-xl p-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0ABAB5]/15 flex items-center justify-center text-[#0ABAB5]">
                  {iconMap[tip.iconName]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {isEs
                      ? tip.titleEs.replace(/{currency}/g, currency)
                      : tip.title.replace(/{currency}/g, currency)}
                  </p>
                  <p className="text-[12px] text-[#8A8A8A] leading-relaxed mt-0.5">
                    {isEs
                      ? tip.textEs.replace(/{currency}/g, currency)
                      : tip.text.replace(/{currency}/g, currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── Quick Reference Card ─── */}
        <motion.section
          custom={7}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-gradient-to-br from-[#0ABAB5]/15 to-[#1A1A1A] rounded-2xl p-5 border border-[#0ABAB5]/25 mb-8"
        >
          <h3 className="text-sm font-bold text-[#0ABAB5] mb-3 uppercase tracking-wider">
            {isEs ? scrubData.quickReferenceSection.titleEs : scrubData.quickReferenceSection.title}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-[12px]">
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">
                {isEs ? scrubData.quickReferenceSection.grid.europeLabelEs : scrubData.quickReferenceSection.grid.europeLabel}
              </span>{' '}
              <span className="text-white font-medium">
                {(isEs ? scrubData.quickReferenceSection.grid.europeValueEs : scrubData.quickReferenceSection.grid.europeValue).replace('{currency}', currency)}
              </span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">
                {(isEs ? scrubData.quickReferenceSection.grid.localLabelEs : scrubData.quickReferenceSection.grid.localLabel).replace('{locationName}', locationName)}
              </span>{' '}
              <span className="text-white font-medium">
                {(isEs ? scrubData.quickReferenceSection.grid.localValueEs : scrubData.quickReferenceSection.grid.localValue).replace('{currency}', currency)}
              </span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">
                {isEs ? scrubData.quickReferenceSection.grid.coreLabelEs : scrubData.quickReferenceSection.grid.coreLabel}
              </span>{' '}
              <span className="text-white font-medium">
                {(isEs ? scrubData.quickReferenceSection.grid.coreValueEs : scrubData.quickReferenceSection.grid.coreValue).replace('{currency}', currency)}
              </span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">
                {isEs ? scrubData.quickReferenceSection.grid.floorLabelEs : scrubData.quickReferenceSection.grid.floorLabel}
              </span>{' '}
              <span className="text-white font-medium">
                {(isEs ? scrubData.quickReferenceSection.grid.floorValueEs : scrubData.quickReferenceSection.grid.floorValue).replace('{currency}', currency)}
              </span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

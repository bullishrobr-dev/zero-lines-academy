import { useState, useCallback } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Droplets,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  Heart,
  TrendingDown,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Clock,
  Euro,
  Hand,
  Volume2,
  Calendar,
} from 'lucide-react';
import { peelingData, getPriceStepsData } from '../data/peelingData';

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
/*  Icon map for tip rendering                                         */
/* ------------------------------------------------------------------ */
const tipIconMap: Record<string, React.ReactNode> = {
  Hand: <Hand className="w-4 h-4" />,
  MessageCircle: <MessageCircle className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Calendar: <Calendar className="w-4 h-4" />,
  Euro: <Euro className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  TrendingDown: <TrendingDown className="w-4 h-4" />,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function PeelingPage() {
  const navigate = useNavigate();
  const { currency, locationName } = useLocation();
  const { language } = useLanguage();
  const isEs = language === 'es';

  const priceSteps = getPriceStepsData(currency, locationName, isEs);
  const [openPriceIndex, setOpenPriceIndex] = useState<number | null>(2); // {currency}100 open by default
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyPrice = useCallback((price: string, index: number) => {
    navigator.clipboard?.writeText(price).catch(() => {});
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }, []);

  const togglePrice = (i: number) =>
    setOpenPriceIndex((prev) => (prev === i ? null : i));

  /* ── helpers for cleaner bilingual reads ── */
  const d = peelingData;
  const hero = d.hero;
  const stats = hero.stats;
  const hook = d.hook;
  const demo = d.demo;
  const offers = d.offers;
  const pl = d.priceLadder;
  const emo = d.emotionalClose;
  const tips = d.proTips;
  const qRef = d.quickRef;

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
            {isEs ? hero.backEs : hero.back}
          </span>
        </button>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 bg-[#0ABAB5]/15 border border-[#0ABAB5]/30 rounded-full px-3 py-1 mb-4"
        >
          <Droplets className="w-3.5 h-3.5 text-[#0ABAB5]" />
          <span className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider">
            {isEs ? hero.badgeEs : hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[28px] font-extrabold text-white leading-tight tracking-tight"
        >
          {isEs ? hero.titleEs : hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-[#0ABAB5] text-base font-medium mt-2"
        >
          <Sparkles className="w-4 h-4" />
          {isEs ? hero.subtitleEs : hero.subtitle}
        </motion.p>

        {/* Key stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-2 mt-5"
        >
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Calendar className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
              {isEs ? stats.useLabelEs : stats.useLabel}
            </p>
            <p className="text-xs font-bold text-white">
              {isEs ? stats.useValueEs : stats.useValue}
            </p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Clock className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
              {isEs ? stats.lastsLabelEs : stats.lastsLabel}
            </p>
            <p className="text-xs font-bold text-white">
              {isEs ? stats.lastsValueEs : stats.lastsValue}
            </p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <ShieldCheck className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
              {isEs ? stats.dermLabelEs : stats.dermLabel}
            </p>
            <p className="text-xs font-bold text-white">
              {isEs ? stats.dermValueEs : stats.dermValue}
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
              {isEs ? hook.headingEs : hook.heading}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Trick 1 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                {isEs ? hook.tricks[0].nameEs : hook.tricks[0].name}
              </p>
              <p className="text-[15px] text-white leading-relaxed font-serif italic">
                {isEs ? hook.tricks[0].quoteEs : hook.tricks[0].quote}
              </p>
              <p className="text-[13px] text-[#8A8A8A] mt-2 leading-relaxed">
                {isEs ? hook.tricks[0].descEs : hook.tricks[0].desc}
              </p>
            </div>

            {/* Trick 2 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                {isEs ? hook.tricks[1].nameEs : hook.tricks[1].name}
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                {isEs ? hook.tricks[1].quoteEs : hook.tricks[1].quote}
              </p>
              <p className="text-[13px] text-[#8A8A8A] mt-2">
                {isEs ? hook.tricks[1].descEs : hook.tricks[1].desc}{' '}
                <em className="text-white/80">
                  {isEs ? hook.tricks[1].followUpQuoteEs : hook.tricks[1].followUpQuote}
                </em>
              </p>
            </div>

            {/* Trick 3 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                {isEs ? hook.tricks[2].nameEs : hook.tricks[2].name}
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                {isEs ? hook.tricks[2].quoteEs : hook.tricks[2].quote}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── THE DEMO ─── */}
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
              {isEs ? demo.headingEs : demo.heading}
            </h2>
          </div>

          <div className="space-y-3">
            {demo.steps.map((item) => (
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

        {/* ─── THE TWO OFFERS ─── */}
        <motion.section
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? offers.headingEs : offers.heading}
            </h2>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mb-3">
            {isEs ? offers.subtextEs : offers.subtext}
          </p>

          <div className="grid gap-3">
            {/* Option 1 */}
            <div className="bg-gradient-to-r from-[#0ABAB5]/10 to-transparent rounded-xl p-4 border border-[#0ABAB5]/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#0ABAB5] text-[#0A0A0A] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {isEs ? offers.option1.labelEs : offers.option1.label}
                </span>
                <span className="font-mono text-lg font-bold text-white">{currency}100</span>
              </div>
              <p className="text-[11px] text-[#0ABAB5] font-medium uppercase tracking-wider mb-1">
                {isEs ? offers.option1.priceLabelEs : offers.option1.priceLabel}
              </p>
              <p className="text-[13px] text-[#B0B0B0] leading-relaxed">
                {isEs
                  ? offers.option1.textEs.replace(/{currency}/g, currency)
                  : offers.option1.text.replace(/{currency}/g, currency)}
              </p>
            </div>

            {/* Option 2 */}
            <div className="bg-gradient-to-r from-[#0ABAB5]/10 to-transparent rounded-xl p-4 border border-[#0ABAB5]/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#0ABAB5] text-[#0A0A0A] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {isEs ? offers.option2.labelEs : offers.option2.label}
                </span>
                <span className="font-mono text-lg font-bold text-white">{currency}150</span>
              </div>
              <p className="text-[11px] text-[#0ABAB5] font-medium uppercase tracking-wider mb-1">
                {isEs ? offers.option2.priceLabelEs : offers.option2.priceLabel}
              </p>
              <p className="text-[13px] text-[#B0B0B0] leading-relaxed">
                {isEs
                  ? offers.option2.textEs
                      .replace(/{locationName}/g, locationName)
                      .replace(/{currency}/g, currency)
                  : offers.option2.text
                      .replace(/{locationName}/g, locationName)
                      .replace(/{currency}/g, currency)}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── INTERACTIVE PRICE LADDER ─── */}
        <motion.section
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? pl.headingEs : pl.heading}
            </h2>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mb-4">
            {isEs ? pl.subtextEs : pl.subtext}
          </p>

          <div className="space-y-2">
            {priceSteps.map((step, i) => (
              <div
                key={i}
                className={`rounded-xl border overflow-hidden transition-colors ${
                  step.isMinimum
                    ? 'border-red-500/30 bg-red-500/5'
                    : step.isVoucher
                    ? 'border-[#0ABAB5]/40 bg-[#0ABAB5]/8'
                    : step.isHighlight
                    ? 'border-[#0ABAB5]/30 bg-[#0ABAB5]/10'
                    : 'border-[#2A2A2A] bg-[#0A0A0A]'
                }`}
              >
                <button
                  onClick={() => togglePrice(i)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xl font-bold ${
                        step.isMinimum
                          ? 'text-red-400'
                          : step.isVoucher
                          ? 'text-[#0ABAB5]'
                          : step.isHighlight
                          ? 'text-[#0ABAB5]'
                          : 'text-white'
                      }`}
                    >
                      {step.price}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {isEs ? step.labelEs : step.label}
                      </p>
                      <p className="text-[11px] text-[#8A8A8A]">
                        {isEs ? step.descriptionEs : step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyPrice(step.price, i);
                      }}
                      className="p-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors"
                    >
                      {copiedIndex === i ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-[#8A8A8A]" />
                      )}
                    </button>
                    {openPriceIndex === i ? (
                      <ChevronUp className="w-4 h-4 text-[#8A8A8A]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8A8A8A]" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openPriceIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-[#2A2A2A]/50">
                        <p className="text-[11px] font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1.5 mt-2">
                          {isEs ? pl.whatToSayEs : pl.whatToSay}
                        </p>
                        <p className="text-[14px] text-white/90 italic font-serif leading-relaxed bg-[#1A1A1A] rounded-lg p-3">
                          {isEs ? step.scriptEs : step.script}
                        </p>
                        {step.isMinimum && (
                          <p className="text-[11px] text-red-400 mt-2">
                            {isEs ? pl.lastResortWarningEs : pl.lastResortWarning}
                          </p>
                        )}
                        {step.isVoucher && (
                          <p className="text-[11px] text-[#0ABAB5] mt-2">
                            {isEs ? pl.voucherTipEs : pl.voucherTip}
                          </p>
                        )}
                        {step.isHighlight && (
                          <p className="text-[11px] text-[#0ABAB5] mt-2">
                            {(isEs ? pl.highlightTipEs : pl.highlightTip).replace(
                              /{currency}/g,
                              currency
                            )}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── EMOTIONAL CLOSE ─── */}
        <motion.section
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-gradient-to-br from-[#0ABAB5]/10 to-[#1A1A1A] rounded-2xl p-5 border border-[#0ABAB5]/25"
        >
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? emo.headingEs : emo.heading}
            </h2>
          </div>

          <div className="bg-[#0A0A0A]/60 rounded-xl p-4 mb-3">
            <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
              {isEs ? emo.heartSellLabelEs : emo.heartSellLabel}
            </p>
            <p className="text-[15px] text-white italic font-serif leading-relaxed">
              {isEs ? emo.heartSellQuoteEs : emo.heartSellQuote}
            </p>
          </div>

          <p className="text-[12px] text-[#8A8A8A] leading-relaxed mb-3">
            {isEs ? emo.emotionInstructionEs : emo.emotionInstruction}{' '}
            <strong className="text-white">
              {isEs ? emo.emotionInstructionBoldEs : emo.emotionInstructionBold}
            </strong>{' '}
            {isEs ? emo.emotionInstructionAfterEs : emo.emotionInstructionAfter}
          </p>

          <div className="bg-[#0A0A0A]/60 rounded-xl p-4">
            <p className="text-[14px] text-white italic font-serif leading-relaxed">
              {isEs ? emo.closeQuoteEs : emo.closeQuote}
            </p>
            <p className="text-[11px] text-[#8A8A8A] mt-2">
              {isEs ? emo.pauseInstructionEs : emo.pauseInstruction}
            </p>
          </div>
        </motion.section>

        {/* ─── PRO TIPS ─── */}
        <motion.section
          custom={5}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? tips.headingEs : tips.heading}
            </h2>
          </div>

          <div className="space-y-3">
            {tips.tips.map((tip, i) => {
              const titleText = isEs
                ? tip.titleEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)
                : tip.title.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName);
              const bodyText = isEs
                ? tip.textEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)
                : tip.text.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName);

              return (
                <div key={i} className="flex gap-3 bg-[#0A0A0A] rounded-xl p-3.5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0ABAB5]/15 flex items-center justify-center text-[#0ABAB5]">
                    {tipIconMap[tip.icon]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{titleText}</p>
                    <p className="text-[12px] text-[#8A8A8A] leading-relaxed mt-0.5">
                      {bodyText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ─── Quick Reference Card ─── */}
        <motion.section
          custom={6}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-gradient-to-br from-[#0ABAB5]/15 to-[#1A1A1A] rounded-2xl p-5 border border-[#0ABAB5]/25 mb-8"
        >
          <h3 className="text-sm font-bold text-[#0ABAB5] mb-3 uppercase tracking-wider">
            {isEs ? qRef.headingEs : qRef.heading}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-[12px]">
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">{isEs ? qRef.items.use.labelEs : qRef.items.use.label}</span>{' '}
              <span className="text-white font-medium">{isEs ? qRef.items.use.valueEs : qRef.items.use.value}</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">{isEs ? qRef.items.lasts.labelEs : qRef.items.lasts.label}</span>{' '}
              <span className="text-white font-medium">{isEs ? qRef.items.lasts.valueEs : qRef.items.lasts.value}</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">{isEs ? qRef.items.creams.labelEs : qRef.items.creams.label}</span>{' '}
              <span className="text-white font-medium">{isEs ? qRef.items.creams.valueEs : qRef.items.creams.value}</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">{isEs ? qRef.items.derm.labelEs : qRef.items.derm.label}</span>{' '}
              <span className="text-white font-medium">{isEs ? qRef.items.derm.valueEs : qRef.items.derm.value}</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

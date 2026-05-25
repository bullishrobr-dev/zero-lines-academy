import { useState, useCallback } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Eye,
  Crown,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  HeartHandshake,
  TrendingDown,
  Users,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Clock,
  Euro,
  ScanEye,
  Volume2,
} from 'lucide-react';
import { syringeData, getLocalizedPriceSteps } from '../data/syringeData';

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
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function SyringePage() {
  const navigate = useNavigate();
  const { currency, locationName } = useLocation();
  const { language } = useLanguage();
  const isEs = language === 'es';

  const priceSteps = getLocalizedPriceSteps(currency, locationName, isEs);
  const [openPriceIndex, setOpenPriceIndex] = useState<number | null>(2);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyPrice = useCallback((price: string, index: number) => {
    navigator.clipboard?.writeText(price).catch(() => {});
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }, []);

  const togglePrice = (i: number) =>
    setOpenPriceIndex((prev) => (prev === i ? null : i));

  const d = syringeData;

  /* Map icon names to components for Pro Tips */
  const iconMap: Record<string, React.ReactNode> = {
    Euro: <Euro className="w-4 h-4" />,
    Eye: <Eye className="w-4 h-4" />,
    Users: <Users className="w-4 h-4" />,
    MessageCircle: <MessageCircle className="w-4 h-4" />,
    ShieldCheck: <ShieldCheck className="w-4 h-4" />,
    TrendingDown: <TrendingDown className="w-4 h-4" />,
    HeartHandshake: <HeartHandshake className="w-4 h-4" />,
    Sparkles: <Sparkles className="w-4 h-4" />,
  };

  return (
    <div className="min-h-full bg-[#0A0A0A]">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0D1F1F] to-[#0A0A0A] px-5 pt-6 pb-8">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#0ABAB5] opacity-10 blur-3xl pointer-events-none" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-[#8A8A8A] hover:text-white transition-colors mb-5"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">
            {isEs ? d.hero.backButtonEs : d.hero.backButton}
          </span>
        </button>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 bg-[#0ABAB5]/15 border border-[#0ABAB5]/30 rounded-full px-3 py-1 mb-4"
        >
          <Crown className="w-3.5 h-3.5 text-[#0ABAB5]" />
          <span className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider">
            {isEs ? d.hero.badgeEs : d.hero.badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[28px] font-extrabold text-white leading-tight tracking-tight"
        >
          {isEs ? d.hero.titleEs : d.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-[#0ABAB5] text-base font-medium mt-2"
        >
          <Eye className="w-4 h-4" />
          {isEs ? d.hero.subtitleEs : d.hero.subtitle}
        </motion.p>

        {/* Key stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-2 mt-5"
        >
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Clock className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
              {isEs ? d.stats.useLabelEs : d.stats.useLabel}
            </p>
            <p className="text-xs font-bold text-white">
              {isEs ? d.stats.useValueEs : d.stats.useValue}
            </p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <ShieldCheck className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
              {isEs ? d.stats.lastsLabelEs : d.stats.lastsLabel}
            </p>
            <p className="text-xs font-bold text-white">
              {isEs ? d.stats.lastsValueEs : d.stats.lastsValue}
            </p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Sparkles className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
              {isEs ? d.stats.resultsLabelEs : d.stats.resultsLabel}
            </p>
            <p className="text-xs font-bold text-white">
              {isEs ? d.stats.resultsValueEs : d.stats.resultsValue}
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
              {isEs ? d.hook.sectionTitleEs : d.hook.sectionTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Script 1 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                {isEs ? d.hook.script1LabelEs : d.hook.script1Label}
              </p>
              <p className="text-[15px] text-white leading-relaxed font-serif italic">
                {isEs ? d.hook.script1TextEs : d.hook.script1Text}
              </p>
              <p className="text-[13px] text-[#8A8A8A] mt-2 leading-relaxed">
                {isEs ? d.hook.script1InstructionEs : d.hook.script1Instruction}{' '}
                <em className="text-white/80">
                  {isEs ? d.hook.script1ContinuationEs : d.hook.script1Continuation}
                </em>
              </p>
            </div>

            {/* Script 2 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                {isEs ? d.hook.script2LabelEs : d.hook.script2Label}
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                {isEs ? d.hook.script2TextEs : d.hook.script2Text}
              </p>
              <p className="text-[13px] text-[#8A8A8A] mt-2">
                {isEs ? d.hook.script2InstructionEs : d.hook.script2Instruction}{' '}
                <em className="text-white/80">
                  {isEs ? d.hook.script2ContinuationEs : d.hook.script2Continuation}
                </em>
              </p>
            </div>

            {/* Script 3 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                {isEs ? d.hook.script3LabelEs : d.hook.script3Label}
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                {isEs ? d.hook.script3TextEs : d.hook.script3Text}
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
            <ScanEye className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? d.demo.sectionTitleEs : d.demo.sectionTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {d.demo.steps.map((item) => (
              <div
                key={item.step}
                className="flex gap-3 bg-[#0A0A0A] rounded-xl p-4"
              >
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

        {/* ─── PARTNER UPSELL ─── */}
        <motion.section
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-gradient-to-br from-[#0ABAB5]/10 to-[#1A1A1A] rounded-2xl p-5 border border-[#0ABAB5]/25"
        >
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? d.partnerUpsell.sectionTitleEs : d.partnerUpsell.sectionTitle}
            </h2>
          </div>
          <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
            {isEs ? d.partnerUpsell.subtitleEs : d.partnerUpsell.subtitle}
          </p>
          <p className="text-[13px] text-[#B0B0B0] leading-relaxed mb-3">
            {isEs ? d.partnerUpsell.descriptionEs : d.partnerUpsell.description}
          </p>
          <div className="bg-[#0A0A0A]/60 rounded-xl p-4 space-y-3">
            <p className="text-[14px] text-white italic font-serif leading-relaxed">
              {isEs ? d.partnerUpsell.script1Es : d.partnerUpsell.script1}
            </p>
            <p className="text-[13px] text-[#8A8A8A] leading-relaxed">
              {isEs ? d.partnerUpsell.option2IntroEs : d.partnerUpsell.option2Intro}{' '}
              <em className="text-white/80">
                {isEs
                  ? d.partnerUpsell.option2ScriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)
                  : d.partnerUpsell.option2Script.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)}
              </em>
            </p>
            <p className="text-[13px] text-[#8A8A8A] leading-relaxed">
              {isEs ? d.partnerUpsell.advancedLabelEs : d.partnerUpsell.advancedLabel}{' '}
              <em className="text-white/80">
                {isEs ? d.partnerUpsell.advancedScriptEs : d.partnerUpsell.advancedScript}
              </em>
            </p>
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
              {isEs ? d.priceLadder.sectionTitleEs : d.priceLadder.sectionTitle}
            </h2>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mb-4">
            {isEs ? d.priceLadder.descriptionEs : d.priceLadder.description}
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
                {/* Price row — clickable */}
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
                      <p className="text-sm font-medium text-white">{step.label}</p>
                      <p className="text-[11px] text-[#8A8A8A]">{step.description}</p>
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

                {/* Expanded script */}
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
                          {isEs ? d.priceLadder.whatToSayEs : d.priceLadder.whatToSay}
                        </p>
                        <p className="text-[14px] text-white/90 italic font-serif leading-relaxed bg-[#1A1A1A] rounded-lg p-3">
                          {step.script}
                        </p>
                        {step.isMinimum && (
                          <p className="text-[11px] text-red-400 mt-2">
                            {isEs ? d.priceLadder.minimumWarningEs : d.priceLadder.minimumWarning}
                          </p>
                        )}
                        {step.isVoucher && (
                          <p className="text-[11px] text-[#0ABAB5] mt-2">
                            {isEs ? d.priceLadder.voucherHintEs : d.priceLadder.voucherHint}
                          </p>
                        )}
                        {step.isHighlight && (
                          <p className="text-[11px] text-[#0ABAB5] mt-2">
                            {isEs ? d.priceLadder.highlightHintEs : d.priceLadder.highlightHint}
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

        {/* ─── VOUCHER CLOSE ─── */}
        <motion.section
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-4">
            <HeartHandshake className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs ? d.voucherClose.sectionTitleEs : d.voucherClose.sectionTitle}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-[#0ABAB5]/10 to-transparent rounded-xl p-4 border-l-3 border-[#0ABAB5] mb-3">
            <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
              {isEs ? d.voucherClose.exactWordsLabelEs : d.voucherClose.exactWordsLabel}
            </p>
            <p className="text-[14px] text-white italic font-serif leading-relaxed mb-3">
              &quot;{isEs
                ? d.voucherClose.voucherScriptEs.replace(/{currency}/g, currency)
                : d.voucherClose.voucherScript.replace(/{currency}/g, currency)
              }&quot;
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-[#0A0A0A] rounded-xl p-4">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                {isEs ? d.voucherClose.twoPromisesLabelEs : d.voucherClose.twoPromisesLabel}
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                {isEs ? d.voucherClose.twoPromisesScriptEs : d.voucherClose.twoPromisesScript}
              </p>
            </div>

            <div className="bg-[#0A0A0A] rounded-xl p-4">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                {isEs ? d.voucherClose.whatsappLabelEs : d.voucherClose.whatsappLabel}
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                {isEs ? d.voucherClose.whatsappScriptEs : d.voucherClose.whatsappScript}
              </p>
              <p className="text-[12px] text-[#8A8A8A] mt-2">
                {isEs ? d.voucherClose.whatsappNoteEs : d.voucherClose.whatsappNote}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── OFFER 2 ─── */}
        <motion.section
          custom={5}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">
              {isEs
                ? d.offer2.sectionTitleEs.replace('{currency}', currency)
                : d.offer2.sectionTitle.replace('{currency}', currency)}
            </h2>
          </div>
          <p className="text-[13px] text-[#B0B0B0] leading-relaxed mb-3">
            {isEs
              ? d.offer2.descriptionEs.replace(/{locationName}/g, locationName).replace(/{currency}/g, currency)
              : d.offer2.description.replace(/{locationName}/g, locationName).replace(/{currency}/g, currency)}
          </p>
          <div className="bg-[#0A0A0A] rounded-xl p-4">
            <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
              {isEs ? d.offer2.scriptLabelEs : d.offer2.scriptLabel}
            </p>
            <p className="text-[14px] text-white italic font-serif leading-relaxed">
              {isEs
                ? d.offer2.scriptEs.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)
                : d.offer2.script.replace(/{currency}/g, currency).replace(/{locationName}/g, locationName)}
            </p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
              <p className="text-[10px] text-[#8A8A8A] uppercase">
                {isEs ? d.offer2.whatTheyGetLabelEs : d.offer2.whatTheyGetLabel}
              </p>
              <p className="text-xs font-bold text-white mt-1">
                {isEs ? d.offer2.whatTheyGetValueEs : d.offer2.whatTheyGetValue}
              </p>
            </div>
            <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
              <p className="text-[10px] text-[#8A8A8A] uppercase">
                {isEs ? d.offer2.treatsLabelEs : d.offer2.treatsLabel}
              </p>
              <p className="text-xs font-bold text-white mt-1">
                {isEs ? d.offer2.treatsValueEs : d.offer2.treatsValue}
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
              {isEs ? d.proTips.sectionTitleEs : d.proTips.sectionTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {d.proTips.tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 bg-[#0A0A0A] rounded-xl p-3.5"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0ABAB5]/15 flex items-center justify-center text-[#0ABAB5]">
                  {iconMap[tip.icon]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {isEs ? tip.titleEs : tip.title}
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
            {isEs ? d.quickRef.sectionTitleEs : d.quickRef.sectionTitle}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-[12px]">
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">
                {isEs ? d.quickRef.useLabelEs : d.quickRef.useLabel}
              </span>{' '}
              <span className="text-white font-medium">
                {isEs ? d.quickRef.useValueEs : d.quickRef.useValue}
              </span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">
                {isEs ? d.quickRef.lastsLabelEs : d.quickRef.lastsLabel}
              </span>{' '}
              <span className="text-white font-medium">
                {isEs ? d.quickRef.lastsValueEs : d.quickRef.lastsValue}
              </span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">
                {isEs ? d.quickRef.resultsLabelEs : d.quickRef.resultsLabel}
              </span>{' '}
              <span className="text-white font-medium">
                {isEs ? d.quickRef.resultsValueEs : d.quickRef.resultsValue}
              </span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">
                {isEs ? d.quickRef.ruleLabelEs : d.quickRef.ruleLabel}
              </span>{' '}
              <span className="text-white font-medium">
                {isEs ? d.quickRef.ruleValueEs : d.quickRef.ruleValue}
              </span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

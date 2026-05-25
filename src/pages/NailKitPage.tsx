import { useState, useCallback } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Sparkles,
  Copy,
  Check,
  Shield,
  Gift,
  Lightbulb,
  Package,
  Volume2,
  ScanEye,
  Star,
  Clock,
  Hand,
  TrendingDown,
  HeartHandshake,
} from 'lucide-react';
import { nailKitData } from '../data/nailKitData';

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
/*  Icon component map for Pro Tips                                    */
/* ------------------------------------------------------------------ */
const iconComponents: Record<string, React.ElementType> = {
  Sparkles,
  Shield,
  Gift,
  Package,
  Hand,
  TrendingDown,
  Star,
  Clock,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function NailKitPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const { currency, locationName } = useLocation();
  const offers = nailKitData.getOffers(currency, locationName, isEs);
  const proTips = nailKitData.getProTips(currency, isEs);
  const [copiedPrice, setCopiedPrice] = useState<string | null>(null);

  const copyPrice = useCallback((price: string) => {
    navigator.clipboard?.writeText(price).catch(() => {});
    setCopiedPrice(price);
    setTimeout(() => setCopiedPrice(null), 1500);
  }, []);

  const d = nailKitData;

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
          <span className="text-sm font-medium">{isEs ? d.hero.backEs : d.hero.back}</span>
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 bg-[#0ABAB5]/15 border border-[#0ABAB5]/30 rounded-full px-3 py-1 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#0ABAB5]" />
          <span className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider">
            {isEs ? d.hero.badgeEs : d.hero.badge}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[28px] font-extrabold text-white leading-tight tracking-tight"
        >
          {isEs ? d.hero.titleEs : d.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-[#0ABAB5] text-base font-medium mt-2"
        >
          <Star className="w-4 h-4" />
          {isEs ? d.hero.subtitleEs : d.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-2 mt-5"
        >
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Clock className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">{isEs ? d.hero.statDemoTimeEs : d.hero.statDemoTime}</p>
            <p className="text-xs font-bold text-white">{isEs ? d.hero.statDemoValueEs : d.hero.statDemoValue}</p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Shield className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">{isEs ? d.hero.statWarrantyEs : d.hero.statWarranty}</p>
            <p className="text-xs font-bold text-white">{isEs ? d.hero.statWarrantyValueEs : d.hero.statWarrantyValue}</p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Sparkles className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">{isEs ? d.hero.statShineLastsEs : d.hero.statShineLasts}</p>
            <p className="text-xs font-bold text-white">{isEs ? d.hero.statShineValueEs : d.hero.statShineValue}</p>
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
            <h2 className="text-lg font-bold text-white">{isEs ? d.hook.sectionTitleEs : d.hook.sectionTitle}</h2>
          </div>

          <div className="space-y-3">
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                {isEs ? d.hook.complimentLabelEs : d.hook.complimentLabel}
              </p>
              <p className="text-[14px] text-white italic font-serif leading-relaxed">
                {isEs ? d.hook.complimentScriptEs : d.hook.complimentScript}
              </p>
              <p className="text-[12px] text-[#8A8A8A] mt-2">
                {isEs ? d.hook.complimentCoachingEs : d.hook.complimentCoaching}
              </p>
            </div>

            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                {isEs ? d.hook.sceneLabelEs : d.hook.sceneLabel}
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                {isEs ? d.hook.sceneScriptEs : d.hook.sceneScript}
              </p>
              <p className="text-[12px] text-[#8A8A8A] mt-2">
                {isEs ? d.hook.sceneCoachingEs : d.hook.sceneCoaching}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── THE 3-STEP DEMO ─── */}
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
            <h2 className="text-lg font-bold text-white">{isEs ? d.demo.sectionTitleEs : d.demo.sectionTitle}</h2>
          </div>

          <p className="text-[12px] text-[#8A8A8A] mb-4">
            {isEs ? d.demo.descriptionEs : d.demo.description}
          </p>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#2A2A2A]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">1</span>
                </div>
                <span className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                  {isEs ? d.demo.step1LabelEs : d.demo.step1Label}
                </span>
              </div>
              <p className="text-sm font-semibold text-white mb-1">{isEs ? d.demo.step1TitleEs : d.demo.step1Title}</p>
              <p className="text-[13px] text-[#8A8A8A] leading-relaxed">
                {isEs ? d.demo.step1InstructionEs : d.demo.step1Instruction}{' '}
                <em className="text-white/80">
                  {isEs ? d.demo.step1ScriptEs : d.demo.step1Script}
                </em>
              </p>
              <p className="text-[12px] text-[#8A8A8A] mt-2 italic">
                {isEs ? d.demo.step1CoachingPrefixEs : d.demo.step1CoachingPrefix}
                {isEs ? d.demo.step1CoachingEs : d.demo.step1Coaching}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#2A2A2A]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gray-400 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#0A0A0A]">2</span>
                </div>
                <span className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                  {isEs ? d.demo.step2LabelEs : d.demo.step2Label}
                </span>
              </div>
              <p className="text-sm font-semibold text-white mb-1">{isEs ? d.demo.step2TitleEs : d.demo.step2Title}</p>
              <p className="text-[13px] text-[#8A8A8A] leading-relaxed">
                {isEs ? d.demo.step2InstructionEs : d.demo.step2Instruction}{' '}
                <em className="text-white/80">
                  {isEs ? d.demo.step2ScriptEs : d.demo.step2Script}
                </em>
              </p>
            </div>

            {/* Step 3 — THE WOW */}
            <div className="bg-gradient-to-r from-[#0ABAB5]/15 to-[#0A0A0A] rounded-xl p-4 border border-[#0ABAB5]/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#0ABAB5] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A]" />
                </div>
                <span className="text-[10px] text-[#0ABAB5] uppercase tracking-wider font-semibold">
                  {isEs ? d.demo.step3LabelEs : d.demo.step3Label}
                </span>
              </div>
              <p className="text-sm font-semibold text-white mb-2">
                {isEs ? d.demo.step3TitleEs : d.demo.step3Title}
              </p>
              <p className="text-[13px] text-[#B0B0B0] leading-relaxed mb-3">
                {isEs ? d.demo.step3InstructionEs : d.demo.step3Instruction}
              </p>
              <div className="bg-[#0A0A0A]/60 rounded-lg p-3 border-l-2 border-[#0ABAB5]">
                <p className="text-[11px] text-[#0ABAB5] font-medium mb-1">
                  {isEs ? d.demo.step3TeaserEs : d.demo.step3Teaser}
                </p>
                <p className="text-[15px] text-white italic font-serif leading-relaxed">
                  {isEs ? d.demo.step3ScriptEs : d.demo.step3Script}
                </p>
              </div>
              <p className="text-[12px] text-[#8A8A8A] mt-3">
                {isEs ? d.demo.step3CoachingEs : d.demo.step3Coaching}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── THE WARRANTY PITCH ─── */}
        <motion.section
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-gradient-to-br from-[#0ABAB5]/10 to-[#1A1A1A] rounded-2xl p-5 border border-[#0ABAB5]/25"
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">{isEs ? d.warranty.sectionTitleEs : d.warranty.sectionTitle}</h2>
          </div>

          <p className="text-[13px] text-[#B0B0B0] leading-relaxed mb-3">
            {isEs ? d.warranty.descriptionEs : d.warranty.description}
          </p>

          <div className="bg-[#0A0A0A]/60 rounded-xl p-4">
            <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
              {isEs ? d.warranty.presentKitLabelEs : d.warranty.presentKitLabel}
            </p>
            <p className="text-[14px] text-white italic font-serif leading-relaxed">
              {isEs ? d.warranty.presentKitScriptEs : d.warranty.presentKitScript}
            </p>
          </div>

          <p className="text-[12px] text-[#8A8A8A] mt-3 leading-relaxed">
            {isEs ? d.warranty.coachingIntroEs : d.warranty.coachingIntro}{' '}
            <em className="text-white/80">
              {isEs ? d.warranty.coachingScriptEs : d.warranty.coachingScript}
            </em>
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-[#0A0A0A]/60 rounded-lg p-3 text-center">
              <Shield className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
              <p className="text-[10px] text-[#8A8A8A]">{isEs ? d.warranty.statWarrantyLabelEs : d.warranty.statWarrantyLabel}</p>
              <p className="text-xs font-bold text-white">{isEs ? d.warranty.statWarrantyValueEs : d.warranty.statWarrantyValue}</p>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-3 text-center">
              <Package className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
              <p className="text-[10px] text-[#8A8A8A]">{isEs ? d.warranty.statKitLabelEs : d.warranty.statKitLabel}</p>
              <p className="text-xs font-bold text-white">{isEs ? d.warranty.statKitValueEs : d.warranty.statKitValue}</p>
            </div>
          </div>
        </motion.section>

        {/* ─── PRICE & OFFERS ─── */}
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
            <h2 className="text-lg font-bold text-white">{isEs ? d.price.sectionTitleEs : d.price.sectionTitle}</h2>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mb-4">
            {isEs ? d.price.descriptionEs : d.price.description}
          </p>

          {/* Price anchor */}
          <div className="bg-[#0A0A0A] rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                {isEs ? d.price.europeLabelEs : d.price.europeLabel}
              </span>
              <span className="font-mono text-lg font-bold text-[#8A8A8A] line-through">
                {currency}140
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#0ABAB5] uppercase tracking-wider font-semibold">
                {isEs
                  ? d.price.locationPriceLabelEs.replace('{locationName}', locationName)
                  : d.price.locationPriceLabel.replace('{locationName}', locationName)}
              </span>
              <button
                onClick={() => copyPrice(`${currency}80`)}
                className="flex items-center gap-1.5"
              >
                <span className="font-mono text-lg font-bold text-[#0ABAB5]">{currency}80</span>
                {copiedPrice === `${currency}80` ? (
                  <Check className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#8A8A8A]" />
                )}
              </button>
            </div>
          </div>

          {/* Offers */}
          <div className="space-y-3">
            {offers.map((offer, i) => (
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
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          offer.isHighlight
                            ? 'bg-[#0ABAB5] text-[#0A0A0A]'
                            : 'bg-[#0ABAB5]/20 text-[#0ABAB5]'
                        }`}
                      >
                        {offer.tag}
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
                <p className="text-sm font-semibold text-white mb-1">{offer.title}</p>
                <p className="text-[12px] text-[#8A8A8A] mb-2">{offer.subtitle}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {offer.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-[11px] bg-[#1A1A1A] text-[#B0B0B0] px-2 py-1 rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="bg-[#1A1A1A] rounded-lg p-3">
                  <p className="text-[11px] font-semibold text-[#8A8A8A] uppercase tracking-wider mb-1">
                    {isEs ? d.price.scriptLabelEs : d.price.scriptLabel}
                  </p>
                  <p className="text-[13px] text-white/90 italic font-serif leading-relaxed">
                    {offer.script}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── EMOTIONAL CONNECTION ─── */}
        <motion.section
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="bg-[#1A1A1A] rounded-2xl p-5 border border-[#2A2A2A]"
        >
          <div className="flex items-center gap-2 mb-3">
            <HeartHandshake className="w-5 h-5 text-[#0ABAB5]" />
            <h2 className="text-lg font-bold text-white">{isEs ? d.emotional.sectionTitleEs : d.emotional.sectionTitle}</h2>
          </div>

          <div className="bg-[#0A0A0A] rounded-xl p-4">
            <p className="text-[14px] text-white italic font-serif leading-relaxed">
              "{isEs ? d.emotional.script1Es : d.emotional.script1}"
            </p>
            <p className="text-[14px] text-white italic font-serif leading-relaxed mt-3">
              "{isEs
                ? d.emotional.script2TemplateEs.replace('{currency}', currency)
                : d.emotional.script2Template.replace('{currency}', currency)}"
            </p>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mt-3">
            {isEs ? d.emotional.coachingEs : d.emotional.coaching}
          </p>
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
            <h2 className="text-lg font-bold text-white">{isEs ? d.proTips.sectionTitleEs : d.proTips.sectionTitle}</h2>
          </div>

          <div className="space-y-3">
            {proTips.map((tip, i) => {
              const IconComp = iconComponents[tip.iconName] || Sparkles;
              return (
                <div key={i} className="flex gap-3 bg-[#0A0A0A] rounded-xl p-3.5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0ABAB5]/15 flex items-center justify-center text-[#0ABAB5]">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{tip.title}</p>
                    <p className="text-[12px] text-[#8A8A8A] leading-relaxed mt-0.5">
                      {tip.text}
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
            {isEs ? d.quickRef.sectionTitleEs : d.quickRef.sectionTitle}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-[12px]">
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">{isEs ? d.quickRef.demoLabelEs : d.quickRef.demoLabel}</span>{' '}
              <span className="text-white font-medium">{isEs ? d.quickRef.demoValueEs : d.quickRef.demoValue}</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">{isEs ? d.quickRef.shineLabelEs : d.quickRef.shineLabel}</span>{' '}
              <span className="text-white font-medium">{isEs ? d.quickRef.shineValueEs : d.quickRef.shineValue}</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">{isEs ? d.quickRef.warrantyLabelEs : d.quickRef.warrantyLabel}</span>{' '}
              <span className="text-white font-medium">{isEs ? d.quickRef.warrantyValueEs : d.quickRef.warrantyValue}</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">{isEs ? d.quickRef.noPolishLabelEs : d.quickRef.noPolishLabel}</span>{' '}
              <span className="text-white font-medium">{isEs ? d.quickRef.noPolishValueEs : d.quickRef.noPolishValue}</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

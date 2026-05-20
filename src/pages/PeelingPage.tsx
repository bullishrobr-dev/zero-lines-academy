import { useState, useCallback } from 'react';
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
/*  Price-ladder data                                                  */
/* ------------------------------------------------------------------ */
interface PriceStep {
  price: string;
  label: string;
  description: string;
  script: string;
  isMinimum?: boolean;
  isVoucher?: boolean;
  isHighlight?: boolean;
}

const priceSteps: PriceStep[] = [
  {
    price: '€200',
    label: 'Europe Price',
    description: 'Anchor — mention this first to build value',
    script:
      '"Normally, around Europe, this product goes for €200, because it\'s proven and works."',
    isHighlight: false,
  },
  {
    price: '€150',
    label: 'Andorra Price',
    description: 'Tax haven advantage — our standard price',
    script:
      '"But here in Andorra — we\'re a tax haven — it\'s only €150!"',
    isHighlight: false,
  },
  {
    price: '€100',
    label: '50% Off + Scrub Gift',
    description: 'Best value — half the Europe price plus a gift',
    script:
      '"Right now, we\'ve got an amazing promotion: take it for 50% off the Europe price — that\'s only €100 — and you\'ll also get the Dead Sea Body Scrub as a gift. Same mineral treatment, but for your body."',
    isHighlight: true,
  },
  {
    price: '€75',
    label: 'Adaptive — Store Credit',
    description: 'Remove the scrub, use as credit',
    script:
      '"You know what, I totally understand. Let\'s make it easy — I can take away the Scrub, we charge €25 for it anyway, so let\'s just use it as a store credit. This way I can make it €75 for you."',
    isHighlight: false,
  },
  {
    price: '€50',
    label: 'Voucher Close',
    description: '20% voucher — the emotional final push',
    script:
      '"Alright, alright... listen, I just checked, and I can do something a little crazy for you. But you can\'t be greedy, okay? I can\'t do it on the big option — only on the single Peeling. Remember how I told you I could do it for €75 without any gifts? If you use this voucher, I can actually bring it down to €50, just this one time. But from next time, it goes back to the normal price, alright?"',
    isVoucher: true,
    isHighlight: false,
  },
  {
    price: '€50',
    label: 'Minimum',
    description: 'Absolute floor — last resort only',
    script:
      '"Look, I really want you to try this. I\'m doing something I shouldn\'t — €50, that\'s it. Just promise me you\'ll actually use it, okay? Not once a year — once a week."',
    isMinimum: true,
    isHighlight: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function PeelingPage() {
  const navigate = useNavigate();
  const [openPriceIndex, setOpenPriceIndex] = useState<number | null>(2); // €100 open by default
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyPrice = useCallback((price: string, index: number) => {
    navigator.clipboard?.writeText(price).catch(() => {});
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }, []);

  const togglePrice = (i: number) =>
    setOpenPriceIndex((prev) => (prev === i ? null : i));

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
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 bg-[#0ABAB5]/15 border border-[#0ABAB5]/30 rounded-full px-3 py-1 mb-4"
        >
          <Droplets className="w-3.5 h-3.5 text-[#0ABAB5]" />
          <span className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider">
            Weekly Treatment
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[28px] font-extrabold text-white leading-tight tracking-tight"
        >
          The Peeling
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-[#0ABAB5] text-base font-medium mt-2"
        >
          <Sparkles className="w-4 h-4" />
          Not a Cream — A Treatment
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
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Use</p>
            <p className="text-xs font-bold text-white">Once/Week</p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Clock className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Bottle Lasts</p>
            <p className="text-xs font-bold text-white">Full Year</p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <ShieldCheck className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Dermatologist</p>
            <p className="text-xs font-bold text-white">Recommended</p>
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
            <h2 className="text-lg font-bold text-white">The Hook — Stop Scripts</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                The Favorite Trick
              </p>
              <p className="text-[15px] text-white leading-relaxed font-serif italic">
                "Let me show you my favorite quick trick for glowing skin. You'll love this."
              </p>
              <p className="text-[13px] text-[#8A8A8A] mt-2 leading-relaxed">
                Keep it light, no heavy pressure. Then lead inside confidently — don't wait
                for a "yes."
              </p>
            </div>

            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                The Personal Hook
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                "What I'm about to show you right now is one of my absolute favorite products
                — I actually use it myself!"
              </p>
              <p className="text-[13px] text-[#8A8A8A] mt-2">
                Smile, engage, build trust instantly. Then set the stage:{' '}
                <em className="text-white/80">
                  "Now, this isn't an anti-aging cream, and it's not here to replace
                  anything you already use at home. It's something completely different."
                </em>
              </p>
            </div>

            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                The Separation Pitch
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                "This is something completely different. This separates dead skin from living
                skin. It's a once-a-week treatment that you use at home on clean skin. What
                it does is separate all the dry and dead layers from the living ones, giving
                your skin a fresh, clean, and glowing look. It helps your creams work 10×
                better because they penetrate deeper and act faster."
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
            <h2 className="text-lg font-bold text-white">The Demo — Hand Application</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                step: '1',
                title: 'Apply to the Hand',
                text: '"This is a once-a-week treatment that you use at home on clean skin. Let me show you on your hand." Apply a small amount to the back of their hand.',
              },
              {
                step: '2',
                title: 'The "Roll It, Don\'t Rub It" Technique',
                text: 'Tell them: "Roll it gently with your fingers — don\'t rub hard." The dead skin will start to pill and roll off. This is the visual WOW moment. Let them see the grey/brown particles forming.',
              },
              {
                step: '3',
                title: 'Explain What They\'re Seeing',
                text: '"See that? That\'s dead skin. Dry, dead layers separating from the living skin underneath. It\'s actually so good that dermatologists recommend it for eczema, psoriasis, dry skin, and even redness or sensitivity."',
              },
              {
                step: '4',
                title: 'The Authority Builder',
                text: '"It\'s actually so good that dermatologists recommend it for eczema, psoriasis, dry skin, and even redness or sensitivity." That single line builds authority and trust — it\'s science-based, not sales-based.',
              },
              {
                step: '5',
                title: 'Show the Fresh Skin',
                text: 'Wipe away the rolled-off skin. Have them feel the area. "Be honest — when was the last time your hand felt this smooth? That\'s not from the product — that\'s YOUR skin, finally breathing."',
              },
              {
                step: '6',
                title: 'The Longevity Close',
                text: '"The best part? This bottle will last you a full year of treatments. So it\'s not something you\'ll run out of next month — it\'s an actual investment for your skin."',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 bg-[#0A0A0A] rounded-xl p-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0ABAB5]/20 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-[#0ABAB5]">{item.step}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                  <p className="text-[13px] text-[#8A8A8A] leading-relaxed">{item.text}</p>
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
            <h2 className="text-lg font-bold text-white">The Two Offers</h2>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mb-3">
            Always present TWO choices. Let them decide. Then pause — silence is your friend.
          </p>

          <div className="grid gap-3">
            {/* Option 1 */}
            <div className="bg-gradient-to-r from-[#0ABAB5]/10 to-transparent rounded-xl p-4 border border-[#0ABAB5]/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#0ABAB5] text-[#0A0A0A] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Option 1
                </span>
                <span className="font-mono text-lg font-bold text-white">€100</span>
              </div>
              <p className="text-[11px] text-[#0ABAB5] font-medium uppercase tracking-wider mb-1">
                50% Off + Dead Sea Body Scrub Gift
              </p>
              <p className="text-[13px] text-[#B0B0B0] leading-relaxed">
                "Take it for 50% off the Europe price — that's only €100, and you'll also get
                the Dead Sea Body Scrub as a gift. Same mineral treatment, but for your body."
              </p>
            </div>

            {/* Option 2 */}
            <div className="bg-gradient-to-r from-[#0ABAB5]/10 to-transparent rounded-xl p-4 border border-[#0ABAB5]/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#0ABAB5] text-[#0A0A0A] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Option 2
                </span>
                <span className="font-mono text-lg font-bold text-white">€150</span>
              </div>
              <p className="text-[11px] text-[#0ABAB5] font-medium uppercase tracking-wider mb-1">
                Full Price + Day & Night Cream Free
              </p>
              <p className="text-[13px] text-[#B0B0B0] leading-relaxed">
                "This is the favorite for most customers: if you pay the normal Andorra price
                of €150, you'll get the Peeling plus the Day & Night Cream completely free!"
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
            <h2 className="text-lg font-bold text-white">Interactive Price Ladder</h2>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mb-4">
            Tap each step to expand the script. Walk down one step at a time.
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
                          What to say
                        </p>
                        <p className="text-[14px] text-white/90 italic font-serif leading-relaxed bg-[#1A1A1A] rounded-lg p-3">
                          {step.script}
                        </p>
                        {step.isMinimum && (
                          <p className="text-[11px] text-red-400 mt-2">
                            ⚠ Last resort only. Try everything else first.
                          </p>
                        )}
                        {step.isVoucher && (
                          <p className="text-[11px] text-[#0ABAB5] mt-2">
                            💡 Drop your voice, make it feel exclusive. Only on the single
                            Peeling, not the combo.
                          </p>
                        )}
                        {step.isHighlight && (
                          <p className="text-[11px] text-[#0ABAB5] mt-2">
                            💡 Best-value single. Most customers who hesitate on €150 take
                            this.
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
            <h2 className="text-lg font-bold text-white">The Emotional Close</h2>
          </div>

          <div className="bg-[#0A0A0A]/60 rounded-xl p-4 mb-3">
            <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
              The Heart Sell — Say With Emotion
            </p>
            <p className="text-[15px] text-white italic font-serif leading-relaxed">
              "We always think twice before doing something for ourselves, but come on —
              when was the last time you actually treated yourself? You work hard, you
              deserve it. And this isn't an everyday product — it's a year of results."
            </p>
          </div>

          <p className="text-[12px] text-[#8A8A8A] leading-relaxed mb-3">
            Say this with <strong className="text-white">real emotion</strong> — this line
            closes deals. Then follow with:
          </p>

          <div className="bg-[#0A0A0A]/60 rounded-xl p-4">
            <p className="text-[14px] text-white italic font-serif leading-relaxed">
              "You're going to love this. So, which one sounds better for you — Option 1 or
              Option 2?"
            </p>
            <p className="text-[11px] text-[#8A8A8A] mt-2">
              Pause. Smile. Wait. Don't fill the silence.
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
            <h2 className="text-lg font-bold text-white">Pro Tips</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: <Hand className="w-4 h-4" />,
                title: 'Demo on the hand — always',
                text: 'The visual of dead skin rolling off is your strongest proof. Never skip the hand demo.',
              },
              {
                icon: <MessageCircle className="w-4 h-4" />,
                title: '"Roll it, don\'t rub it"',
                text: 'This phrase is crucial. If they rub too hard, it won\'t work. Gentle rolling creates the pilling effect.',
              },
              {
                icon: <ShieldCheck className="w-4 h-4" />,
                title: 'Mention dermatologists',
                text: '"Dermatologists recommend it for eczema, psoriasis, dry skin, and redness." This builds instant authority.',
              },
              {
                icon: <Calendar className="w-4 h-4" />,
                title: 'One bottle = one year',
                text: 'Always emphasize longevity. €100 for a full year of treatments is less than €2 per week. Frame it as an investment.',
              },
              {
                icon: <Euro className="w-4 h-4" />,
                title: '€200 first, always',
                text: 'Start with the Europe price. The Andorra price feels like a gift after that anchor.',
              },
              {
                icon: <Heart className="w-4 h-4" />,
                title: 'The emotional close is everything',
                text: '"When was the last time you treated yourself?" Say it with genuine feeling. This line works on every demographic.',
              },
              {
                icon: <Sparkles className="w-4 h-4" />,
                title: 'Works on everyone',
                text: 'Women, men, young, old — this pitch works on every demographic because it delivers instant visual proof and emotional value.',
              },
              {
                icon: <TrendingDown className="w-4 h-4" />,
                title: '€50 voucher is your secret weapon',
                text: 'Only use the €50 close at the very end. If you drop it too early, you leave money on the table.',
              },
            ].map((tip, i) => (
              <div key={i} className="flex gap-3 bg-[#0A0A0A] rounded-xl p-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#0ABAB5]/15 flex items-center justify-center text-[#0ABAB5]">
                  {tip.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{tip.title}</p>
                  <p className="text-[12px] text-[#8A8A8A] leading-relaxed mt-0.5">
                    {tip.text}
                  </p>
                </div>
              </div>
            ))}
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
            Quick Reference
          </h3>
          <div className="grid grid-cols-2 gap-2 text-[12px]">
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">Use:</span>{' '}
              <span className="text-white font-medium">Once/week</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">Bottle lasts:</span>{' '}
              <span className="text-white font-medium">Full year</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">Creams work:</span>{' '}
              <span className="text-white font-medium">10× better</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">Dermatologist:</span>{' '}
              <span className="text-white font-medium">Approved</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

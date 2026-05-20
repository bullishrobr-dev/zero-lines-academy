import { useState, useCallback } from 'react';
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
    price: '€500',
    label: 'Europe Price',
    description: 'Anchor value — always mention this first',
    script:
      '"Across Europe, this treatment goes for around €500, because it\'s one of the only ones that works instantly and lasts long-term."',
    isHighlight: false,
  },
  {
    price: '€300',
    label: 'Andorra Price',
    description: 'Tax haven advantage — our standard price',
    script:
      '"But here in Andorra — you know how special it is here — we\'re a tax haven, so instead of €500, we charge only €300."',
    isHighlight: false,
  },
  {
    price: '€210',
    label: '30% Off + Gift',
    description: 'Amazing offer — best value single syringe',
    script:
      '"Right now, we have an incredible promotion: take it for 30% off, which makes it €210, and you\'ll also get a small gift — you can choose between a Day Cream, Night Cream, Cleanser, or Peeling."',
    isHighlight: true,
  },
  {
    price: '€175',
    label: 'Remove Gift',
    description: 'Adaptive — take away the gift, lower the price',
    script:
      '"You know what, I get it. Let\'s make it easier. I\'ll take away the gift — we usually value it at €35 — and that will bring the syringe by itself down to €175."',
    isHighlight: false,
  },
  {
    price: '€140',
    label: 'Voucher Close',
    description: '20% voucher — final push, single syringe only',
    script:
      '"Alright, alright... listen, I just checked something, and I can do a small crazy offer for you. But you can\'t be greedy, okay? So remember I told you without the gift it\'s €175? If you use this small 20% discount voucher, it brings it down to €140. This is a one-time thing — next time, it goes back to normal."',
    isVoucher: true,
    isHighlight: false,
  },
  {
    price: '€100',
    label: 'Minimum (Last Resort)',
    description: 'Absolute floor — use only when nothing else works',
    script:
      '"Look, I want you to have this. I\'m not supposed to do this, but I can bring it to €100 — that\'s the absolute best I can do. Just promise me you\'ll actually use it once a week, okay?"',
    isMinimum: true,
    isHighlight: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function SyringePage() {
  const navigate = useNavigate();
  const [openPriceIndex, setOpenPriceIndex] = useState<number | null>(2); // €210 open by default
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
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#0ABAB5] opacity-10 blur-3xl pointer-events-none" />

        {/* Back button */}
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
          <Crown className="w-3.5 h-3.5 text-[#0ABAB5]" />
          <span className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider">
            Flagship Product
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[28px] font-extrabold text-white leading-tight tracking-tight"
        >
          The Syringe
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-[#0ABAB5] text-base font-medium mt-2"
        >
          <Eye className="w-4 h-4" />
          Natural Alternative to Botox — Instant Results
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
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Use</p>
            <p className="text-xs font-bold text-white">Once/Week</p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <ShieldCheck className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Lasts</p>
            <p className="text-xs font-bold text-white">6-18 Months</p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Sparkles className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Results</p>
            <p className="text-xs font-bold text-white">Instant</p>
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
            {/* Script 1 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                The Eye Compliment
              </p>
              <p className="text-[15px] text-white leading-relaxed font-serif italic">
                "You look amazing! What do you use for your skin?"
              </p>
              <p className="text-[13px] text-[#8A8A8A] mt-2 leading-relaxed">
                Pause, smile warmly, let her respond. Then:{' '}
                <em className="text-white/80">
                  "I want to give you something small — not to replace your cream, because you
                  clearly take care of yourself — but around the eyes… we can do something
                  special there."
                </em>
              </p>
            </div>

            {/* Script 2 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                With Partner — Engage Both
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                "Sir, do you see what I mean? She's stunning, but the eyes — we can make
                them look even fresher, right?"
              </p>
              <p className="text-[13px] text-[#8A8A8A] mt-2">
                Keep it playful and charming — the laughter opens the door. Then lead inside
                confidently: <em className="text-white/80">"Come, let me show you something incredible. It takes two minutes; you'll thank me after."</em>
              </p>
            </div>

            {/* Script 3 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                Direct Approach — The Observation
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                "The first thing I noticed about you is your eyes... they're beautiful, but I
                can see the bags are a bit heavy. I can fix that in two minutes. Come!"
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
            <h2 className="text-lg font-bold text-white">The Demo — Step by Step</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                step: '1',
                title: 'Set the Stage',
                text: '"Just to relax you, everything we use here is 100% natural — no parabens, no chemicals, no injections." (To partner: "Sir, don\'t worry — we\'re not about to change her face, just a little touch of magic for the eyes.")',
              },
              {
                step: '2',
                title: 'Clean & Position',
                text: 'Have her sit down comfortably. Clean the eye area gently with a cotton pad. Make sure the lighting is good.',
              },
              {
                step: '3',
                title: '"Look Up, Look Down" Technique',
                text: '"Look up for me, perfect. Thank you." Apply while the eye is looking upward — this smooths the under-eye area. "Now look down." Apply to the upper eyelid and crow\'s feet area.',
              },
              {
                step: '4',
                title: 'The Narrative While Applying',
                text: '"What I\'m about to show you is our #1 best-selling treatment across Europe and North America. It helps the skin stimulate its own collagen production, relaxes the facial muscles, and drains unnecessary fluids — so puffiness, tired eyes, and fine lines disappear naturally."',
              },
              {
                step: '5',
                title: 'The Treatment Plan',
                text: '"You only need to use it once a week — that\'s it. The syringe lasts for a whole year of treatments, and the results can stay between 6 to 18 months. The only rule: once you apply it, don\'t touch the area for five hours." (To partner: "You\'re going to have to remind her not to touch it, okay?")',
              },
              {
                step: '6',
                title: 'THE REVEAL — First Eye',
                text: '"Alright, I do this around twenty times a day, and it always looks good — but what just happened to you right now is something else! Promise not to scream?" (Hand her the mirror.) "Woooooow!! Look at that — it\'s like you just slept twelve hours."',
              },
              {
                step: '7',
                title: 'Show the Untreated Eye',
                text: '"Now look at the other eye — see the difference?" This comparison is EVERYTHING. Let her see the treated vs. untreated. That\'s your close. Turn to the partner: "Sir, be honest — do you see the difference? Look at the lift, the smoothness, the brightness."',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-3 bg-[#0A0A0A] rounded-xl p-4"
              >
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
            <h2 className="text-lg font-bold text-white">The Partner Upsell</h2>
          </div>
          <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
            "The real magic happens when you do BOTH eyes"
          </p>
          <p className="text-[13px] text-[#B0B0B0] leading-relaxed mb-3">
            After they see the result on one eye, that's your opening. The partner has already
            witnessed the transformation — they're emotionally invested.
          </p>
          <div className="bg-[#0A0A0A]/60 rounded-xl p-4 space-y-3">
            <p className="text-[14px] text-white italic font-serif leading-relaxed">
              "Sir, you saw the difference — imagine if we do both eyes? She'll walk out of
              here looking like she just had a full night's sleep... for a whole year."
            </p>
            <p className="text-[13px] text-[#8A8A8A] leading-relaxed">
              Now introduce Option 2:{' '}
              <em className="text-white/80">
                "Pay the normal price of €300, and you'll get TWO syringes — so you can
                treat both eyes, the forehead, the upper lip, and even the number 11s
                between the eyebrows."
              </em>
            </p>
            <p className="text-[13px] text-[#8A8A8A] leading-relaxed">
              Advanced upsell for great customers:{' '}
              <em className="text-white/80">
                "Can I be honest with you? There's not a big difference between the two
                options anyway. I really feel like you'd use it for those extra areas, and
                honestly, you're the type who will take care of it properly. So I'll do
                something nice — if you take the bigger option, I'll give you both my Day
                and Night Cream completely free."
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
            <h2 className="text-lg font-bold text-white">Interactive Price Ladder</h2>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mb-4">
            Tap each step to expand the exact script. Never skip steps — go down one at a time.
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
                          What to say
                        </p>
                        <p className="text-[14px] text-white/90 italic font-serif leading-relaxed bg-[#1A1A1A] rounded-lg p-3">
                          {step.script}
                        </p>
                        {step.isMinimum && (
                          <p className="text-[11px] text-red-400 mt-2">
                            ⚠ Only use this as an absolute last resort. You've exhausted all
                            other options.
                          </p>
                        )}
                        {step.isVoucher && (
                          <p className="text-[11px] text-[#0ABAB5] mt-2">
                            💡 Drop your voice, lean in slightly — make it feel like insider
                            treatment. Only on the SINGLE syringe.
                          </p>
                        )}
                        {step.isHighlight && (
                          <p className="text-[11px] text-[#0ABAB5] mt-2">
                            💡 This is your best-value single-syringe offer. Most customers
                            who want one syringe take this.
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
            <h2 className="text-lg font-bold text-white">The Voucher Close</h2>
          </div>

          <div className="bg-gradient-to-r from-[#0ABAB5]/10 to-transparent rounded-xl p-4 border-l-3 border-[#0ABAB5] mb-3">
            <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
              Exact Words — Say This
            </p>
            <p className="text-[14px] text-white italic font-serif leading-relaxed mb-3">
              "Alright, alright... listen, I just checked something, and I can do a small
              crazy offer for you. But you can't be greedy, okay? I can't do this on the
              double syringe, only on the single one. So remember I told you without the
              gift it's €175? If you use this small 20% discount voucher, it brings it down
              to €140. This is a one-time thing — next time, it goes back to normal."
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-[#0A0A0A] rounded-xl p-4">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                The Two Promises
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                "You just promise me two things, okay? 1️⃣ You're really going to use it once
                a week — not once a year. 2️⃣ If you're happy, you'll tell your friends about
                us."
              </p>
            </div>

            <div className="bg-[#0A0A0A] rounded-xl p-4">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                The WhatsApp Close
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                "You use WhatsApp, right? Perfect. You'll have my number and email — just let
                me know if you need anything or if you ever want to try something new later
                on."
              </p>
              <p className="text-[12px] text-[#8A8A8A] mt-2">
                This creates a personal relationship — not just a transaction. Returning
                customers are your easiest future sales.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ─── OFFER 2 — €300 + 2nd Syringe ─── */}
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
            <h2 className="text-lg font-bold text-white">Offer 2 — €300 + 2nd Syringe Free</h2>
          </div>
          <p className="text-[13px] text-[#B0B0B0] leading-relaxed mb-3">
            This is the <strong className="text-white">favorite option</strong> for most
            customers. They pay the full Andorra price but walk away with double the value.
          </p>
          <div className="bg-[#0A0A0A] rounded-xl p-4">
            <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
              Script
            </p>
            <p className="text-[14px] text-white italic font-serif leading-relaxed">
              "This one is actually the favorite: pay the normal price of €300, and you'll
              get two syringes instead of one — so you can treat both eyes, the forehead,
              the upper lip, and even the number 11s between the eyebrows. That's a full
              face treatment that lasts a whole year."
            </p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
              <p className="text-[10px] text-[#8A8A8A] uppercase">What they get</p>
              <p className="text-xs font-bold text-white mt-1">2 Syringes</p>
            </div>
            <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
              <p className="text-[10px] text-[#8A8A8A] uppercase">Treats</p>
              <p className="text-xs font-bold text-white mt-1">Eyes + Forehead + 11s</p>
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
            <h2 className="text-lg font-bold text-white">Pro Tips</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: <Euro className="w-4 h-4" />,
                title: 'Always start with the Europe price',
                text: '€500 is the anchor. Everything after feels like a bargain. Never mention the minimum first.',
              },
              {
                icon: <Eye className="w-4 h-4" />,
                title: 'One eye demo is the key',
                text: 'Never do both eyes for free. The comparison between treated and untreated is your strongest close.',
              },
              {
                icon: <Users className="w-4 h-4" />,
                title: 'Engage the partner ALWAYS',
                text: 'They\'re often the real decision-maker. Make them part of the joke, the reveal, and the close.',
              },
              {
                icon: <MessageCircle className="w-4 h-4" />,
                title: 'If they smile, they buy',
                text: 'Keep humor alive. Playful energy opens wallets. If they\'re not smiling, they\'re not buying.',
              },
              {
                icon: <ShieldCheck className="w-4 h-4" />,
                title: '100% natural — no chemicals',
                text: 'Always mention this early. It removes fear and positions the product as safe and premium.',
              },
              {
                icon: <TrendingDown className="w-4 h-4" />,
                title: 'Go down the ladder one step at a time',
                text: 'Never jump from €300 to €140. Walk down slowly. Each step feels like you\'re doing them a favor.',
              },
              {
                icon: <HeartHandshake className="w-4 h-4" />,
                title: 'The two promises seal loyalty',
                text: '"Promise me you\'ll use it. Promise me you\'ll tell your friends." This turns buyers into ambassadors.',
              },
              {
                icon: <Sparkles className="w-4 h-4" />,
                title: 'This is your crown jewel',
                text: 'The syringe pitch is your strongest weapon. It sells on emotion, proof, and trust. Practice it until it\'s second nature.',
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 bg-[#0A0A0A] rounded-xl p-3.5"
              >
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
          custom={7}
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
              <span className="text-[#8A8A8A]">Lasts:</span>{' '}
              <span className="text-white font-medium">1 year</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">Results:</span>{' '}
              <span className="text-white font-medium">6-18 months</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">Rule:</span>{' '}
              <span className="text-white font-medium">No touching 5h</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

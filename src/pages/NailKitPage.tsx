import { useState, useCallback } from 'react';
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
/*  Offer data                                                         */
/* ------------------------------------------------------------------ */
interface Offer {
  title: string;
  price: string;
  subtitle: string;
  items: string[];
  tag?: string;
  isHighlight?: boolean;
  script: string;
}

const offers: Offer[] = [
  {
    title: 'Buy 2 Get 1 Free',
    price: '€160',
    subtitle: 'Classic trio — most popular offer',
    items: ['3 full Nail Kits', 'Perfect for gifts', '€53 per kit effective'],
    tag: 'Most Popular',
    isHighlight: true,
    script:
      '"Right now we\'ve got an amazing offer: if you buy two, you get one free. So you pay €160 and walk away with three full kits. That\'s why everyone grabs these during the holidays — they make the perfect Christmas gifts. Small, elegant, and actually useful."',
  },
  {
    title: 'Buy 2 Get 2 (Christmas)',
    price: '€160',
    subtitle: 'Premium Christmas — four for the price of two',
    items: ['4 full Nail Kits', 'One for you, three for gifts', '€40 per kit effective'],
    tag: 'Christmas',
    script:
      '"You know what, Christmas is coming — let\'s do something special. Instead of Buy 2, Get 1, I\'ll do Buy 2, Get 2. You\'ll get four full kits for €160 — one for you, one for mom, one for sister, one for a friend. Easiest Christmas shopping ever."',
  },
  {
    title: 'Mix & Match (Buy 1 Get 1)',
    price: '€80',
    subtitle: 'Flexible combo — cross-sell setup',
    items: ['Nail Kit + Scrub', 'Nail Kit + Body Butter', 'Perfect intro pair'],
    tag: 'Flexible',
    script:
      '"Tell you what — I\'ll do something better for you. Instead of just one kit, I\'ll do Buy 1, Get 1 Free for €80, and you can mix and match it with our Scrub or Body Butter. So you can take one Nail Kit and one Scrub — or one Kit and one Butter — still €80 total."',
  },
  {
    title: 'Single Kit Holiday Close',
    price: '€45',
    subtitle: 'Final push — whole kit at buffer price',
    items: ['Full kit (not just buffer)', 'Lifetime warranty included', 'Opens door for return'],
    script:
      '"Alright, you know what — I can see how much you loved it. Normally we sell the buffer by itself for €45, since it\'s got the lifetime warranty. But since it\'s the holidays and I really want you to enjoy it, I\'ll give you the whole kit for the same price — just €45. It\'s my way of opening the door — try it, use it, love it. Next time you\'re in Andorra, you\'ll come back for the second one, I promise."',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function NailKitPage() {
  const navigate = useNavigate();
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
          <span className="text-sm font-medium">Back</span>
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 bg-[#0ABAB5]/15 border border-[#0ABAB5]/30 rounded-full px-3 py-1 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#0ABAB5]" />
          <span className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider">
            60-Second Demo
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[28px] font-extrabold text-white leading-tight tracking-tight"
        >
          Nail Kit
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-[#0ABAB5] text-base font-medium mt-2"
        >
          <Star className="w-4 h-4" />
          60-Second Salon Shine
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-2 mt-5"
        >
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Clock className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Demo Time</p>
            <p className="text-xs font-bold text-white">60 Seconds</p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Shield className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Warranty</p>
            <p className="text-xs font-bold text-white">Lifetime</p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Sparkles className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Shine Lasts</p>
            <p className="text-xs font-bold text-white">2 Weeks</p>
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

          <div className="space-y-3">
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                The Natural Nail Compliment
              </p>
              <p className="text-[14px] text-white italic font-serif leading-relaxed">
                "Wow! You always keep your nails natural? That's awesome. Let me give you a
                small gift — you're gonna love this."
              </p>
              <p className="text-[12px] text-[#8A8A8A] mt-2">
                Say it confidently, smile, and lead inside immediately. No hesitation, no
                questions.
              </p>
            </div>

            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
                Setting the Scene
              </p>
              <p className="text-[13px] text-white leading-relaxed italic font-serif">
                "So this isn't your typical nail buffer — it's a professional system that
                keeps your nails shiny and healthy for up to two weeks without any polish."
              </p>
              <p className="text-[12px] text-[#8A8A8A] mt-2">
                Unbox it slowly while you talk — create curiosity and ownership.
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
            <h2 className="text-lg font-bold text-white">The 3-Step Demo</h2>
          </div>

          <p className="text-[12px] text-[#8A8A8A] mb-4">
            The magic is in the buildup. Steps 1 and 2 create suspense. Step 3 is the WOW.
          </p>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#2A2A2A]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">1</span>
                </div>
                <span className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                  Grey Side
                </span>
              </div>
              <p className="text-sm font-semibold text-white mb-1">Step 1 — Smooth</p>
              <p className="text-[13px] text-[#8A8A8A] leading-relaxed">
                Hold her hand gently. Start with the first two steps on one nail.{' '}
                <em className="text-white/80">
                  "Most buffers you see remove the top layer of your nail to make it shiny —
                  that's actually bad. It makes the nails weak and thin. This one's different.
                  It smooths, shapes, but doesn't remove anything."
                </em>
              </p>
              <p className="text-[12px] text-[#8A8A8A] mt-2 italic">
                Show the nail — not shiny yet. "See? Nothing dramatic yet — now wait for the
                last step."
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#2A2A2A]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gray-400 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#0A0A0A]">2</span>
                </div>
                <span className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                  White Side — Prep
                </span>
              </div>
              <p className="text-sm font-semibold text-white mb-1">Step 2 — Polish</p>
              <p className="text-[13px] text-[#8A8A8A] leading-relaxed">
                Use the white strip, buff gently.{' '}
                <em className="text-white/80">
                  "Feel that? It's soft, not rough. It's actually pushing your natural oils up
                  to the surface — that's what gives the shine and strengthens the nail."
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
                  THE WOW MOMENT
                </span>
              </div>
              <p className="text-sm font-semibold text-white mb-2">
                Step 3 — Shine (The Close)
              </p>
              <p className="text-[13px] text-[#B0B0B0] leading-relaxed mb-3">
                Pause. Lower your voice. Build suspense.
              </p>
              <div className="bg-[#0A0A0A]/60 rounded-lg p-3 border-l-2 border-[#0ABAB5]">
                <p className="text-[11px] text-[#0ABAB5] font-medium mb-1">
                  "Promise not to scream?"
                </p>
                <p className="text-[15px] text-white italic font-serif leading-relaxed">
                  "WOWOWOWOW! 😄 Look at that — that's your natural nail! No polish, no
                  chemicals — and it stays shiny like this for two whole weeks."
                </p>
              </div>
              <p className="text-[12px] text-[#8A8A8A] mt-3">
                If she's with a partner or friend, make them part of the reaction — laughter
                = comfort = buying mode.
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
            <h2 className="text-lg font-bold text-white">The Warranty Pitch</h2>
          </div>

          <p className="text-[13px] text-[#B0B0B0] leading-relaxed mb-3">
            The lifetime warranty is one of your strongest closes. It removes all risk and
            creates unbelievable perceived value.
          </p>

          <div className="bg-[#0A0A0A]/60 rounded-xl p-4">
            <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
              Present the Full Kit
            </p>
            <p className="text-[14px] text-white italic font-serif leading-relaxed">
              "Everything you saw comes in this full kit — buffer, professional file, cuticle
              oil, and cream. And the best part — the buffer has a lifetime warranty. No
              matter what happens — if it breaks, if it wears out,{' '}
              <strong>even if your dog eats it</strong> — you can exchange it in any of our
              stores worldwide."
            </p>
          </div>

          <p className="text-[12px] text-[#8A8A8A] mt-3 leading-relaxed">
            Let them laugh — humor lowers the guard. Then close the logic:{' '}
            <em className="text-white/80">
              "It's one simple kit, one design — there are no colors or versions to choose
              from. This is the one everyone loves."
            </em>
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-[#0A0A0A]/60 rounded-lg p-3 text-center">
              <Shield className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
              <p className="text-[10px] text-[#8A8A8A]">Warranty</p>
              <p className="text-xs font-bold text-white">Lifetime — Any Store</p>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-3 text-center">
              <Package className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
              <p className="text-[10px] text-[#8A8A8A]">Kit Includes</p>
              <p className="text-xs font-bold text-white">Buffer, File, Oil, Cream</p>
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
            <h2 className="text-lg font-bold text-white">Price & Offers</h2>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mb-4">
            Tap any price to copy. Always anchor with Europe first.
          </p>

          {/* Price anchor */}
          <div className="bg-[#0A0A0A] rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                Europe Price
              </span>
              <span className="font-mono text-lg font-bold text-[#8A8A8A] line-through">
                €140
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#0ABAB5] uppercase tracking-wider font-semibold">
                Andorra Price
              </span>
              <button
                onClick={() => copyPrice('€80')}
                className="flex items-center gap-1.5"
              >
                <span className="font-mono text-lg font-bold text-[#0ABAB5]">€80</span>
                {copiedPrice === '€80' ? (
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
                    Script
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
            <h2 className="text-lg font-bold text-white">Emotional Connection</h2>
          </div>

          <div className="bg-[#0A0A0A] rounded-xl p-4">
            <p className="text-[14px] text-white italic font-serif leading-relaxed">
              "You know, this isn't just about beauty — it's about that little daily detail
              that makes you feel fresh and confident. Every time you look at your hands,
              you'll feel clean, polished, and taken care of."
            </p>
            <p className="text-[14px] text-white italic font-serif leading-relaxed mt-3">
              "And if you think about it — €80 for something that replaces salon visits for
              years — it's a no-brainer."
            </p>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mt-3">
            Keep the tone friendly, not pushy — this pitch should feel like a fun chat, not a
            sale.
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
            <h2 className="text-lg font-bold text-white">Pro Tips</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: <Sparkles className="w-4 h-4" />,
                title: 'Let them feel the shine before showing price',
                text: 'The WOW moment in Step 3 is your close. Never mention price before they see the mirror. The visual proof sells itself.',
              },
              {
                icon: <Shield className="w-4 h-4" />,
                title: '"Even if your dog eats it" — use the warranty',
                text: "The lifetime warranty is your risk-remover. The 'dog eats it' line makes them laugh and remember. Use it every time.",
              },
              {
                icon: <Gift className="w-4 h-4" />,
                title: 'Mention Christmas gifts naturally',
                text: '"Small, elegant, and actually useful." During peak season, every demo should include a gift reference.',
              },
              {
                icon: <Package className="w-4 h-4" />,
                title: 'Buy 2, Get 2 for amazing buyers',
                text: 'When the energy is high and they have a Christmas list — this is your volume close. Four kits at €160 is €40 per kit.',
              },
              {
                icon: <Hand className="w-4 h-4" />,
                title: 'Buy 1, Get 1 Mix & Match for quick closes',
                text: '€80 for a Nail Kit + Scrub/Butter is an easy yes. It also sets up your cross-sell perfectly.',
              },
              {
                icon: <TrendingDown className="w-4 h-4" />,
                title: '€45 single kit — the holiday gift line',
                text: "Your graceful exit that still creates a customer. Frame it as a gift from you: 'It's my way of opening the door.'",
              },
              {
                icon: <Star className="w-4 h-4" />,
                title: 'Build suspense before the WOW',
                text: '"Promise not to scream?" — this line creates anticipation. The contrast between the buildup and the reveal is what makes them buy.',
              },
              {
                icon: <Clock className="w-4 h-4" />,
                title: 'Fast, fun, and feel-good',
                text: 'This is a 60-second demo. Keep energy high, move quickly, and celebrate their reaction. If they smile, they buy.',
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
              <span className="text-[#8A8A8A]">Demo:</span>{' '}
              <span className="text-white font-medium">60 seconds</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">Shine lasts:</span>{' '}
              <span className="text-white font-medium">2 weeks</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">Warranty:</span>{' '}
              <span className="text-white font-medium">Lifetime</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">No polish:</span>{' '}
              <span className="text-white font-medium">Natural shine</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

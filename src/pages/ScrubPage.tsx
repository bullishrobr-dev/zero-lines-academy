import { useState, useCallback } from 'react';
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
interface ComboOffer {
  title: string;
  price: string;
  subtitle: string;
  items: string[];
  tag?: string;
  isHighlight?: boolean;
}

const comboOffers: ComboOffer[] = [
  {
    title: 'Buy 2 Get 1 Free',
    price: '€120',
    subtitle: 'Our core offer — most popular',
    items: ['Scrub + Body Butter + Nail Kit', 'Scrub + Body Butter + Cleanser', 'Two Scrubs + One Body Butter'],
    tag: 'Most Popular',
    isHighlight: true,
  },
  {
    title: 'Buy 2 Get 2 (Christmas)',
    price: '€120',
    subtitle: 'For premium gift buyers — four products',
    items: ['Two for you, two for gifts', 'Perfect for Christmas shopping', 'Same price, extra product'],
    tag: 'Christmas',
  },
  {
    title: 'Buy 1 Get 1 Free',
    price: '€60',
    subtitle: 'Slimmer variation — fast close',
    items: ['Scrub + Body Butter', 'Scrub + Nail Kit', 'Nail Kit + Body Butter'],
    tag: 'Quick Close',
  },
  {
    title: 'Single Scrub',
    price: '€35',
    subtitle: 'Final push — the graceful exit',
    items: ['Dead Sea Scrub only', 'No gifts, no extras', 'Opens the door for future purchase'],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ScrubPage() {
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
          <Waves className="w-3.5 h-3.5 text-[#0ABAB5]" />
          <span className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider">
            Dead Sea Minerals
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[28px] font-extrabold text-white leading-tight tracking-tight"
        >
          Dead Sea Scrub & Body Butter
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-[#0ABAB5] text-base font-medium mt-2"
        >
          <Hand className="w-4 h-4" />
          Feel the Difference
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-2 mt-5"
        >
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Waves className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Source</p>
            <p className="text-xs font-bold text-white">Dead Sea</p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Moon className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Jar Lasts</p>
            <p className="text-xs font-bold text-white">8-12 Months</p>
          </div>
          <div className="bg-[#1A1A1A]/80 rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Sparkles className="w-4 h-4 text-[#0ABAB5] mx-auto mb-1" />
            <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Feeling</p>
            <p className="text-xs font-bold text-white">Instant Soft</p>
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
              <p className="text-[13px] text-white italic font-serif leading-relaxed">
                "I'm pretty sure you've tried scrubs before, right? This one is a bit
                different. You'll love this. It's one of those products that makes everyone
                smile."
              </p>
            </div>
            <div className="bg-[#0A0A0A] rounded-xl p-4 border-l-3 border-[#0ABAB5]">
              <p className="text-[13px] text-white italic font-serif leading-relaxed">
                "Do you ever get dry skin? Ugh, I know — it's the worst. You know what? Let
                me give you something amazing. Come!"
              </p>
            </div>
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
            <h2 className="text-lg font-bold text-white">The Sensory Demo</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                step: '1',
                title: 'Place the Salts',
                text: 'Place the Dead Sea salts on the back of their hand. "Start rubbing gently." Let them feel the crystals.',
              },
              {
                step: '2',
                title: 'The Dead Sea Story',
                text: '"Have you heard of the Dead Sea? Lowest place on Earth, highest natural mineral concentration — magnesium, calcium, potassium. These minerals detox, rejuvenate, and calm the skin. From the Dead Sea, the lowest point on Earth."',
              },
              {
                step: '3',
                title: 'Add Water',
                text: "Add water slowly while they rub. \"This is my personal favorite — I use it myself. It's recommended to help with eczema, psoriasis, severe dry skin, and redness. It basically separates the dry, dead layers from the living ones so your skin can breathe.\"",
              },
              {
                step: '4',
                title: 'Let Them Feel the Difference',
                text: `Rinse and dry. Wait two beats. "Be honest — when was the last time your hands felt like this? And the best part? The sensation stays — even if you wash your hands a lot or use sanitizer. Since Covid, this became our #1 seller. People were like, 'Finally something that actually helps!'"`,
              },
              {
                step: '5',
                title: 'Usage Instructions',
                text: '"Use it once a week. One teaspoon is enough for the whole body. A jar lasts 8–12 months."',
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
            <h2 className="text-lg font-bold text-white">The Butter Flip Test</h2>
          </div>

          <p className="text-[13px] text-[#B0B0B0] leading-relaxed mb-3">
            This is the moment that sells the butter. It's visual, surprising, and impossible
            to fake.
          </p>

          <div className="bg-[#0A0A0A]/60 rounded-xl p-4">
            <p className="text-[11px] font-semibold text-[#0ABAB5] uppercase tracking-wider mb-2">
              The Demonstration
            </p>
            <p className="text-[14px] text-white italic font-serif leading-relaxed mb-2">
              Open the butter, flip it upside down — no spill. Point to the fact that nothing
              falls out.
            </p>
            <p className="text-[15px] text-white italic font-serif leading-relaxed border-l-2 border-[#0ABAB5] pl-3">
              "To complete the treatment — the Body Butter. Same minerals, ultra-rich. You
              see how it doesn't spill? Even if I flip it over, it doesn't fall. You only need
              a tiny bit — not because I'm cheap 😄 — because it's really that concentrated."
            </p>
          </div>

          <p className="text-[12px] text-[#8A8A8A] mt-3 leading-relaxed">
            Let them massage it in. Then:{' '}
            <em className="text-white/80">
              "Imagine this feeling all over the body… and the feet? OMG — the best feeling
              ever!"
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
            <h2 className="text-lg font-bold text-white">Combo Offers</h2>
          </div>
          <p className="text-[12px] text-[#8A8A8A] mb-4">
            Tap the price to copy. Each offer matches a different customer type.
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
            <h2 className="text-lg font-bold text-white">Cheat Combos for Sellers</h2>
          </div>

          <div className="grid gap-2">
            {[
              { name: 'Classic Trio', price: '€120', items: 'Scrub + Body Butter + Nail Kit' },
              { name: 'Spa Trio', price: '€120', items: 'Scrub + Body Butter + Face Cleanser' },
              { name: 'Scent Duo', price: '€60', items: 'Scrub + Body Butter (Buy 1 Get 1)' },
              { name: 'Smart Duo', price: '€60', items: 'Scrub + Nail Kit (kit includes cream)' },
              { name: "Gifter's Four", price: '€120', items: 'Buy 2, Get 2 (Christmas special)' },
              { name: 'Final Push', price: '€35', items: 'Scrub only, no gifts' },
            ].map((combo, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-[#0A0A0A] rounded-lg p-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">{combo.name}</p>
                  <p className="text-[11px] text-[#8A8A8A]">{combo.items}</p>
                </div>
                <span className="font-mono text-sm font-bold text-[#0ABAB5]">
                  {combo.price}
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
            <h2 className="text-lg font-bold text-white">Price Presentation</h2>
          </div>

          <div className="bg-[#0A0A0A] rounded-xl p-4 space-y-3">
            <div className="border-l-2 border-[#0ABAB5] pl-3">
              <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Anchor</p>
              <p className="text-[14px] text-white italic font-serif">
                "I won't lie — it's not cheap. Around Europe these go for €100 each."
              </p>
            </div>
            <div className="border-l-2 border-[#0ABAB5] pl-3">
              <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Andorra</p>
              <p className="text-[14px] text-white italic font-serif">
                "But here in Andorra, we're a tax haven — each one is €60."
              </p>
            </div>
            <div className="border-l-2 border-[#0ABAB5] pl-3">
              <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">Core Offer</p>
              <p className="text-[14px] text-white italic font-serif">
                "And the best part — our offer is Buy 2, Get 1 Free. So you pay €120 and you
                leave with three products."
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
            <h2 className="text-lg font-bold text-white">Pro Tips</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: <Hand className="w-4 h-4" />,
                title: 'Make it sensory — let the hands sell it',
                text: 'The feeling is everything. Let them rub, rinse, and feel. Once they feel the softness, the sale is halfway done.',
              },
              {
                icon: <Droplets className="w-4 h-4" />,
                title: 'The flip test is your secret weapon',
                text: "Flipping the butter jar and showing nothing falls out is a visual proof they can't argue with. Do it every time.",
              },
              {
                icon: <Sun className="w-4 h-4" />,
                title: 'Use Christmas urgency naturally',
                text: '"Stock runs faster closer to the holidays, and I\'d hate you to miss colors/scents you like." Timing closes gifts.',
              },
              {
                icon: <TrendingDown className="w-4 h-4" />,
                title: 'Keep the math clean',
                text: '€60 each. €120 for three (Buy 2, Get 1). Simple, round numbers are easier to say yes to.',
              },
              {
                icon: <Gift className="w-4 h-4" />,
                title: 'Buy 2, Get 2 for premium buyers',
                text: 'When the energy is great and they have a Christmas list — this is your volume play. Same €120, extra product.',
              },
              {
                icon: <Package className="w-4 h-4" />,
                title: 'Buy 1, Get 1 for fast closes',
                text: "For hesitant buyers who still felt the demo — this turns 'maybe' into 'yes' instantly. €60 feels like nothing after €120.",
              },
              {
                icon: <Sparkles className="w-4 h-4" />,
                title: '€35 Scrub is your final push',
                text: "When nothing else works, the single Scrub at €35 creates a customer today and a bigger sale tomorrow. No gifts, no extras — just the hero product in their hands.",
              },
              {
                icon: <Moon className="w-4 h-4" />,
                title: 'Keep it fun — jokes, smiles, easy energy',
                text: 'This demo should feel like a spa moment, not a sales pitch. If they smile, they buy.',
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
              <span className="text-[#8A8A8A]">Europe:</span>{' '}
              <span className="text-white font-medium">€100 each</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">Andorra:</span>{' '}
              <span className="text-white font-medium">€60 each</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">Core:</span>{' '}
              <span className="text-white font-medium">€120/3 (B2G1)</span>
            </div>
            <div className="bg-[#0A0A0A]/60 rounded-lg p-2.5">
              <span className="text-[#8A8A8A]">Floor:</span>{' '}
              <span className="text-white font-medium">€35 Scrub</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

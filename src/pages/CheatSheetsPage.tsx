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
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from '../contexts/LocationContext';

// ── Types ──
type SheetTab = 'all' | 'prices' | 'scripts' | 'psychology';

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

const PRODUCT_LADDERS: ProductLadder[] = [
  {
    id: 'syringe',
    name: 'Hyaluronic Acid Syringe (Eye Treatment)',
    icon: <Syringe size={18} />,
    color: '#0ABAB5',
    europePrice: '500€',
    basePrice: '300€',
    minPrice: '100€',
    steps: [
      { label: 'Europe Price Anchor', price: '500€', words: '"Usually in our shops in Europe this goes for 500€ but here in Andorra we have a much better price."', isStrike: true },
      { label: 'Andorra Base', price: '300€', words: '"It\'s only 300€."' },
      { label: 'Offer 1 — 30% Off + Gift', price: '210€', words: '"Right now we have an amazing offer — you can get it for 30% less and you\'ll also receive a gift — Day Cream, Night Cream, or Peeling."', highlight: true },
      { label: 'Offer 2 — Second Syringe Free', price: '300€', words: '"For 300€ you get a second syringe free — for your forehead, upper lip, or 11s."' },
      { label: 'Advanced Upsell', price: '300€', words: '"Two syringes plus Day & Night Cream free — that\'s the full package."' },
      { label: 'Adaptive Fallback (no gift)', price: '175€', words: '"Let me take the gift away and I\'ll give it to you for 175€."', highlight: true },
      { label: 'Voucher Close', price: '140€', words: '"I want to make sure you leave happy today — I have a 20% voucher, that makes it just 140€."', highlight: true },
    ],
  },
  {
    id: 'peeling',
    name: 'Glycolic Peeling',
    icon: <Droplets size={18} />,
    color: '#8B5CF6',
    europePrice: '200€',
    basePrice: '150€',
    minPrice: '50€',
    steps: [
      { label: 'Europe Price Anchor', price: '200€', words: '"In Europe this treatment costs 200€."', isStrike: true },
      { label: 'Andorra Base', price: '150€', words: '"Here in Andorra it\'s only 150€."' },
      { label: 'Offer 1 — 50% Off + Gift', price: '100€', words: '"This is not an anti-aging cream, this is something completely different — this is a treatment that separates the dead skin from the living skin. Right now you can get it for 50% off and you\'ll receive a Dead Sea Body Scrub gift."', highlight: true },
      { label: 'Offer 2 — Day & Night Cream Free', price: '150€', words: '"For 150€ you get the peeling plus Day & Night Cream free."' },
      { label: 'Adaptive Fallback (scrub as credit)', price: '75€', words: '"Let me remove the scrub and give it to you as credit — that makes it 75€."', highlight: true },
      { label: 'Voucher Close', price: '50€', words: '"With today\'s voucher, a single peeling is just 50€ — no gifts, but the treatment alone is worth it."', highlight: true },
    ],
  },
  {
    id: 'scrub',
    name: 'Dead Sea Scrub & Body Butter',
    icon: <Sparkles size={18} />,
    color: '#F59E0B',
    europePrice: '100€ each',
    basePrice: '60€ each',
    minPrice: '30€',
    steps: [
      { label: 'Europe Price Anchor', price: '100€ each', words: '"In Europe each of these costs 100€ — but here in Andorra they\'re only 60€ each."', isStrike: true },
      { label: 'Core Offer — Buy 2, Get 1 Free', price: '€120 for 3', words: '"Buy any 2 products and get the third free — that\'s 120€ for 3 products."', highlight: true },
      { label: 'Christmas Offer — Buy 2, Get 2', price: '€120 for 4', words: '"For the holidays: buy 2, get 2 free — 120€ for 4 products. That\'s our best deal."' },
      { label: 'Slim Version — Buy 1, Get 1', price: '€60 for 2', words: '"Or just buy one, get one free — 60€ for 2 products."' },
      { label: 'Butter Demo Script', price: 'Demo', words: '"I\'m going to show you something incredible — even if I flip it over, it doesn\'t fall." (flip test)' },
      { label: 'Final Push — Scrub Only', price: '30€', words: '"Just the scrub by itself — 30€. That\'s the best price I can do."', highlight: true },
    ],
  },
  {
    id: 'nail-kit',
    name: 'French Nail Kit',
    icon: <Scissors size={18} />,
    color: '#EC4899',
    europePrice: '100€',
    basePrice: '60€',
    minPrice: '30€',
    steps: [
      { label: 'Europe Price Anchor', price: '100€', words: '"In Europe this nail kit costs 100€ — but here in Andorra it\'s only 60€."', isStrike: true },
      { label: 'Core Offer — Buy 2, Get 1 Free', price: '€120 for 3 kits', words: '"Buy 2 kits, get the third free — 120€ for 3 complete kits."', highlight: true },
      { label: 'Christmas Premium — Buy 2, Get 2', price: '€120 for 4 kits', words: '"Holiday special: buy 2, get 2 free — 120€ for 4 nail kits."' },
      { label: 'Mix & Match', price: '€60 for 2', words: '"Mix and match a Nail Kit with a Scrub or Body Butter — buy one, get one — just 60€ for 2 products."' },
      { label: 'Warranty Pitch', price: 'Demo', words: '"Even if your dog eats it, you can bring it back and we replace it."' },
      { label: 'Final Push', price: '30€', words: '"The whole kit for 30€ — that\'s my final price."', highlight: true },
    ],
  },
];

// ── Script Data ──
interface ScriptCard {
  id: string;
  category: 'opening' | 'closing' | 'objection' | 'partner';
  title: string;
  text: string;
  product?: string;
}

const SCRIPTS: ScriptCard[] = [
  // Opening scripts
  { id: 'o1', category: 'opening', title: 'Syringe — Curiosity Hook', product: 'Syringe', text: '"Can I show you something? This is our bestselling treatment — it\'s like Botox in a syringe, but natural and instant."' },
  { id: 'o2', category: 'opening', title: 'Syringe — Compliment Open', product: 'Syringe', text: '"Your skin has great structure. I want to show you something that will take it to the next level — our instant filler treatment."' },
  { id: 'o3', category: 'opening', title: 'Peeling — Problem-Agitate', product: 'Peeling', text: '"Do you ever feel like your skin looks dull even with makeup? Our 60-second peeling fixes that instantly."' },
  { id: 'o4', category: 'opening', title: 'Peeling — The Reveal', product: 'Peeling', text: '"I\'m going to show you something — watch my hand. See the difference? That\'s 5 years of dullness gone in one minute."' },
  { id: 'o5', category: 'opening', title: 'Scrub — Spa Experience', product: 'Scrub', text: '"Close your eyes for a second... smell that? That\'s Dead Sea minerals. Let me give you the 30-second spa experience."' },
  { id: 'o6', category: 'opening', title: 'Nail Kit — Time Saver', product: 'Nail Kit', text: '"How often do you get a French manicure? What if you could do it in 5 minutes at home, perfectly, every time?"' },
  { id: 'o7', category: 'opening', title: 'Universal — Direct', text: '"I have something I want to show you — it takes 30 seconds and you\'ll see an instant difference."' },
  { id: 'o8', category: 'opening', title: 'Universal — Gift Angle', text: '"Are you shopping for anyone else today? Because this makes the perfect gift — and I\'ll show you why."' },
  // Closing scripts
  { id: 'c1', category: 'closing', title: 'Two-Choice Close (Syringe)', text: '"So would you prefer the single syringe at 300€, or two syringes at 300€ with the second one free for your forehead or upper lip?"' },
  { id: 'c1b', category: 'closing', title: 'Two-Choice Close (Offer)', text: '"Would you prefer the 30% off at 210€ with a free gift, or the two-syringe deal at 300€?"' },
  { id: 'c2', category: 'closing', title: 'Assumptive Close', text: '"I\'ll set this aside for you at the counter. Do you want the gift bag with it?"' },
  { id: 'c3', category: 'closing', title: 'Scarcity Close', text: '"This voucher price is only valid today — I don\'t want you to miss it. Should I ring it up?"' },
  { id: 'c4', category: 'closing', title: 'Summary Close (Syringe)', text: '"So you\'re getting a treatment that costs 500€ in Europe for just 300€ here in Andorra. Great choice."' },
  { id: 'c4b', category: 'closing', title: 'Summary Close (Offer)', text: '"So you\'re getting the treatment for 30% off at 210€ plus a free gift worth over 50€. Amazing deal."' },
  { id: 'c5', category: 'closing', title: 'Testimonial Close', text: '"A customer was in here yesterday — she bought two, and came back today for three more as gifts. That\'s how good this is."' },
  // Objection responses
  { id: 'r1', category: 'objection', title: '"I need to think about it"', text: '"Of course. Just so you know, this voucher expires when you leave the store — it\'s tied to today\'s visit. I can hold it at the counter for 10 minutes while you look around, and the price stays locked."' },
  { id: 'r2', category: 'objection', title: '"It\'s too expensive" (Syringe)', text: '"I hear you. In Europe this costs 500€. Here in Andorra it\'s 300€. And with today\'s offer I can do 30% off — that\'s 210€. Let me check what else I can do..."' },
  { id: 'r2b', category: 'objection', title: '"It\'s too expensive" (Peeling)', text: '"I hear you. In Europe this costs 200€. Here in Andorra it\'s 150€. And right now I can do 50% off — that\'s 100€ with a free Dead Sea scrub gift."' },
  { id: 'r2c', category: 'objection', title: '"It\'s too expensive" (Scrub)', text: '"I hear you. In Europe one of these is 100€. Here it\'s 60€. And with buy 2 get 1 free, that\'s 120€ for 3 products. Let me take the gift away and I can do even better..."' },
  { id: 'r2d', category: 'objection', title: '"It\'s too expensive" (Nail Kit)', text: '"I hear you. In Europe this kit is 100€. Here in Andorra it\'s 60€. And with buy 2 get 1 free, that\'s 120€ for 3 complete kits."' },
  { id: 'r3', category: 'objection', title: '"I already have something similar"', text: '"Most of our customers do too. But when they try this, they tell me it\'s completely different. Can I show you why in 30 seconds?"' },
  { id: 'r4', category: 'objection', title: '"I\'m just looking"', text: '"No problem at all — looking is free. But can I show you something that takes 20 seconds? You don\'t have to buy anything, I just love the reaction."' },
  { id: 'r5', category: 'objection', title: '"I need to ask my partner"', text: '"Absolutely. If they were here, what would they say? [Pause] Here — take this sample card with the price written down. The voucher is valid for today only."' },
  { id: 'r6', category: 'objection', title: '"I don\'t have time"', text: '"This takes exactly 60 seconds — I\'ll time it. And if you don\'t see a difference, I\'ll wish you a great day. Deal?"' },
  // Partner engagement
  { id: 'p1', category: 'partner', title: 'Include the Partner', text: '"And sir/ma\'am — you\'re going to love how this looks on them. Want to see the instant result too?"' },
  { id: 'p2', category: 'partner', title: 'Gift Suggestion', text: '"Most couples buy one for her and a scrub for him — it\'s a nice memory from Andorra. I can do both for a package price."' },
  { id: 'p3', category: 'partner', title: 'Opinion Ask', text: '"What do you think — should they go with the instant glow or the long-term treatment? You know them best."' },
];

// ── Key Phrases ──
interface Phrase {
  id: string;
  text: string;
  type: 'good' | 'bad';
  reason: string;
}

const PHRASES: Phrase[] = [
  { id: 'g1', text: '"Let me show you something..."', type: 'good', reason: 'Creates curiosity, no pressure' },
  { id: 'g2', text: '"Most people choose..."', type: 'good', reason: 'Social proof + guides decision' },
  { id: 'g3', text: '"This is only valid today"', type: 'good', reason: 'Genuine scarcity, not pushy' },
  { id: 'g4', text: '"You\'ll see the difference instantly"', type: 'good', reason: 'Promises immediate value' },
  { id: 'g5', text: '"What brings you to Andorra?"', type: 'good', reason: 'Opens conversation naturally' },
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

// ── Psychology Data ──
interface CialdiniPrinciple {
  id: string;
  name: string;
  description: string;
  salesApply: string;
}

const CIALDINI: CialdiniPrinciple[] = [
  { id: 'ci1', name: 'Reciprocity', description: 'People feel obliged to give back when they receive.', salesApply: 'Give a free sample, demo, or small gift first. They\'ll feel more inclined to buy.' },
  { id: 'ci2', name: 'Commitment', description: 'People want to act consistently with their prior commitments.', salesApply: 'Get them to agree "the result looks great" — then asking for the sale feels consistent.' },
  { id: 'ci3', name: 'Social Proof', description: 'People follow what others are doing.', salesApply: '"This is our bestseller" / "I just sold three of these" / show testimonials.' },
  { id: 'ci4', name: 'Authority', description: 'People defer to experts and credible sources.', salesApply: '"In Europe, dermatologists recommend this" / demonstrate deep product knowledge.' },
  { id: 'ci5', name: 'Liking', description: 'People buy from people they like.', salesApply: 'Genuine compliments, find common ground, mirror their energy.' },
  { id: 'ci6', name: 'Scarcity', description: 'People value what is rare or limited.', salesApply: '"Only valid today" / "Limited stock" / "This voucher expires when you leave".' },
];

const BODY_LANGUAGE = [
  { tip: 'Open palms when presenting', meaning: 'Builds trust, signals honesty' },
  { tip: 'Slight forward lean', meaning: 'Shows interest and engagement' },
  { tip: 'Mirror their posture', meaning: 'Creates subconscious rapport' },
  { tip: 'Smile with eyes (Duchenne)', meaning: 'Appears genuine, not forced' },
  { tip: 'Hand product to them', meaning: 'Once they hold it, ownership feeling begins' },
  { tip: 'Stand at an angle, not head-on', meaning: 'Less confrontational, more inviting' },
];

const BUYING_SIGNALS = [
  { signal: 'Asks about price', meaning: 'Considering purchase seriously' },
  { signal: 'Touches/holds the product', meaning: 'Imagines owning it' },
  { signal: 'Asks "how long does it last?"', meaning: 'Calculating value' },
  { signal: 'Looks at partner/friend', meaning: 'Seeking permission to buy' },
  { signal: 'Repeats benefit back to you', meaning: 'Mental buy-in forming' },
  { signal: '"Can I use this with...?"', meaning: 'Integrating into their life' },
];

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
  const { currency } = useLocation();
  const [activeTab, setActiveTab] = useState<SheetTab>('all');
  const [search, setSearch] = useState('');
  const [scriptFilter, setScriptFilter] = useState<string>('all');

  const searchLower = search.toLowerCase().trim();

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
  }, [scriptFilter, searchLower]);

  const filteredPhrases = useMemo(() => {
    if (!searchLower) return PHRASES;
    return PHRASES.filter(
      (p) =>
        p.text.toLowerCase().includes(searchLower) ||
        p.reason.toLowerCase().includes(searchLower)
    );
  }, [searchLower]);

  const showPrices = activeTab === 'all' || activeTab === 'prices';
  const showScripts = activeTab === 'all' || activeTab === 'scripts';
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
            <h1 className="text-h1 text-white">Cheat Sheets</h1>
          </div>
          <p className="text-body-small text-[#8A8A8A] mb-4">
            Quick reference for prices, scripts &amp; psychology
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
            placeholder="Search scripts, prices, phrases..."
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
                All
              </TabsTrigger>
              <TabsTrigger
                value="prices"
                className="flex-1 text-xs data-[state=active]:bg-[#0ABAB5] data-[state=active]:text-black rounded-lg py-2"
              >
                Prices
              </TabsTrigger>
              <TabsTrigger
                value="scripts"
                className="flex-1 text-xs data-[state=active]:bg-[#0ABAB5] data-[state=active]:text-black rounded-lg py-2"
              >
                Scripts
              </TabsTrigger>
              <TabsTrigger
                value="psychology"
                className="flex-1 text-xs data-[state=active]:bg-[#0ABAB5] data-[state=active]:text-black rounded-lg py-2"
              >
                Psychology
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
              <h2 className="text-h4 text-white">Price Ladder</h2>
            </div>
            <div className="space-y-3">
              {PRODUCT_LADDERS.map((product) => (
                <ExpandableCard
                  key={product.id}
                  title={product.name}
                  subtitle={`Europe: ${product.europePrice.replace(/€/g, currency)} → From ${product.minPrice.replace(/€/g, currency)}`}
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
                            {step.price.replace(/€/g, currency)}
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
                      <span className="text-[11px] text-[#8A8A8A]">Minimum price:</span>
                      <span className="text-sm font-bold text-[#0ABAB5]">{product.minPrice.replace(/€/g, currency)}</span>
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
              <h2 className="text-h4 text-white">Scripts</h2>
            </div>

            {/* Script sub-filters */}
            <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar">
              {[
                { key: 'all', label: 'All' },
                { key: 'opening', label: 'Opening' },
                { key: 'closing', label: 'Closing' },
                { key: 'objection', label: 'Objections' },
                { key: 'partner', label: 'Partner' },
              ].map((f) => (
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
                        {script.category}
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
                <p className="text-center text-sm text-[#8A8A8A] py-6">No scripts match your search</p>
              )}
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
                <h2 className="text-h4 text-white">Cialdini&apos;s 6 Principles</h2>
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
                <h2 className="text-h4 text-white">Key Phrases</h2>
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
                        {phrase.type === 'good' ? 'SAY THIS' : 'AVOID THIS'}
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
                  <p className="text-center text-sm text-[#8A8A8A] py-4">No phrases match your search</p>
                )}
              </div>
            </div>

            {/* Body Language */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Eye size={16} className="text-[#8B5CF6]" />
                <h2 className="text-h4 text-white">Body Language Tips</h2>
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
                <h2 className="text-h4 text-white">Buying Signals</h2>
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

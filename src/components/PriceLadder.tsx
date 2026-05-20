import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Euro, ChevronDown } from 'lucide-react';

interface PriceStep {
  step: number;
  original?: string;
  price: string;
  label: string;
  style: 'anchor' | 'base' | 'discount' | 'premium' | 'voucher';
  expandedContent: string;
}

interface PriceLadderProps {
  steps: PriceStep[];
  title?: string;
}

const styleMap = {
  anchor: { priceColor: 'text-[#8A8A8A]', line: 'line-through decoration-[#EF4444]' },
  base: { priceColor: 'text-white', line: '' },
  discount: { priceColor: 'text-[#0ABAB5]', line: '' },
  premium: { priceColor: 'text-white', line: '' },
  voucher: { priceColor: 'text-[#22C55E]', line: '' },
};

function AnimatedPrice({ price, style }: { price: string; style: string }) {
  const [displayed, setDisplayed] = useState(price);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) {
      setDisplayed(price);
      return;
    }
    hasAnimated.current = true;
    const numericMatch = price.match(/[\d,]+/);
    if (!numericMatch) {
      setDisplayed(price);
      return;
    }
    const targetStr = numericMatch[0];
    const targetNum = parseInt(targetStr.replace(/,/g, ''), 10);
    if (isNaN(targetNum)) {
      setDisplayed(price);
      return;
    }

    const prefix = price.substring(0, price.indexOf(targetStr));
    const suffix = price.substring(price.indexOf(targetStr) + targetStr.length);
    const duration = 800;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * targetNum);
      setDisplayed(`${prefix}${current.toLocaleString()}${suffix}`);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [price]);

  return <span className={`font-mono text-price ${style} ${styleMap[style as keyof typeof styleMap]?.line || ''}`}>{displayed}</span>;
}

function PriceStepItem({ step, isOpen, onToggle }: { step: PriceStep; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="relative">
      {/* Step circle + price row */}
      <motion.button
        onClick={onToggle}
        className="w-full flex items-center gap-3 py-3 text-left group"
        whileTap={{ scale: 0.98 }}
      >
        {/* Step circle */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-caption font-bold shrink-0 transition-colors ${
            isOpen ? 'bg-[#0ABAB5] text-black' : 'bg-[#2A2A2A] text-[#8A8A8A]'
          }`}
        >
          {step.step}
        </div>

        {/* Price */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {step.original && (
              <span className="font-mono text-price text-[#8A8A8A] line-through decoration-[#EF4444]">
                {step.original}
              </span>
            )}
            <AnimatedPrice price={step.price} style={step.style} />
          </div>
          <span className="text-caption text-[#6B6B6B]">{step.label}</span>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#6B6B6B]"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
              opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 },
            }}
            className="overflow-hidden"
          >
            <div className="pl-10 pr-2 pb-4">
              <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A]">
                <p className="text-body-small text-[#D1D1D1] leading-relaxed">{step.expandedContent}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connecting line */}
      {step.step < 5 && (
        <div className="absolute left-[13px] top-[40px] w-[2px] h-[calc(100%-32px)] bg-[#2A2A2A]" />
      )}
    </div>
  );
}

export default function PriceLadder({ steps, title = 'PRICE LADDER' }: PriceLadderProps) {
  const [openStep, setOpenStep] = useState<number | null>(null);

  return (
    <motion.div
      className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-5"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Euro size={16} className="text-[#0ABAB5]" />
        <span className="text-overline text-[#0ABAB5]">{title}</span>
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <PriceStepItem
              step={step}
              isOpen={openStep === step.step}
              onToggle={() => setOpenStep(openStep === step.step ? null : step.step)}
            />
          </motion.div>
        ))}
      </div>

      {/* Hint */}
      <p className="text-caption text-[#6B6B6B] mt-3 text-center">Tap each step to reveal the tactic</p>
    </motion.div>
  );
}

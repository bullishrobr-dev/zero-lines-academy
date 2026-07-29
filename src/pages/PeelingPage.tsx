// ─────────────────────────────────────────────────────────────────────────────
// PeelingPage — the weekly-treatment deep-dive. Accent: violet.
//
// Prices come from PEELING_LADDER in src/data/pricing.ts. The voucher close and
// the floor are the same number, so the ladder ends on one rung drawn as the
// hard minimum rather than two identical-looking ones.
//
// This page is where a Gibraltar seller used to meet a raw `{currency}` token:
// the last price step's description carries one and nothing resolved it. Every
// string now goes through `t()`, which subs the shop's symbol and falls back to
// English when a Spanish field is missing.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, type ReactNode } from 'react';
import {
  Calendar,
  Clock,
  Droplets,
  Hand,
  Heart,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  TrendingDown,
} from 'lucide-react';
import OfferCard from '../components/OfferCard';
import PriceLadder, { type LadderRung } from '../components/PriceLadder';
import ProductHero from '../components/ProductHero';
import ProductSection, {
  CurrencyIcon,
  ProductPage,
  QuickRefGrid,
  ScriptBlock,
  StepRow,
} from '../components/ProductSection';
import { useLanguage } from '../contexts/LanguageContext';
import { peelingData, getPriceStepsData, type PriceStepData } from '../data/peelingData';
import { PEELING_LADDER } from '../data/pricing';
import { useCurrency } from '../utils/currency';

const d = peelingData;
const L = PEELING_LADDER;

const stepPrice = (id: string) => L.steps.find((s) => s.id === id)?.price ?? L.base;

export default function PeelingPage() {
  const { language } = useLanguage();
  const { currency, locationName, price, sub } = useCurrency();
  const isEs = language === 'es';

  const t = useCallback(
    (en?: string, es?: string) => sub((isEs && es) || en || es || ''),
    [isEs, sub]
  );

  /* The scripted steps still live in the data file; the amounts do not. */
  const authored = getPriceStepsData(currency, locationName, isEs);
  const a = (i: number): Partial<PriceStepData> => authored[i] ?? {};

  const pl = d.priceLadder;

  const rungs: LadderRung[] = [
    {
      id: 'europe',
      amount: L.europeAnchor,
      tone: 'anchor',
      label: t(a(0).label, a(0).labelEs),
      note: t(a(0).description, a(0).descriptionEs),
      script: t(a(0).script, a(0).scriptEs),
    },
    {
      id: 'base',
      amount: L.base,
      label: t(a(1).label, a(1).labelEs),
      note: t(a(1).description, a(1).descriptionEs),
      script: t(a(1).script, a(1).scriptEs),
    },
    {
      id: 'promo',
      amount: stepPrice('promo'),
      recommended: true,
      label: t(a(2).label, a(2).labelEs),
      note: t(a(2).description, a(2).descriptionEs),
      script: t(a(2).script, a(2).scriptEs),
      hint: t(pl.highlightTip, pl.highlightTipEs),
    },
    {
      id: 'no-scrub',
      amount: stepPrice('no-scrub'),
      label: t(a(3).label, a(3).labelEs),
      note: t(a(3).description, a(3).descriptionEs),
      script: t(a(3).script, a(3).scriptEs),
    },
    {
      /* The voucher close IS the floor — same number, so one rung, marked hard. */
      id: 'floor',
      amount: L.floor,
      tone: 'floor',
      label: t(a(4).label, a(4).labelEs),
      note: t(a(5).description, a(5).descriptionEs),
      script: t(a(4).script, a(4).scriptEs),
      hint: `${t(pl.voucherTip, pl.voucherTipEs)} ${t(pl.lastResortWarning, pl.lastResortWarningEs)}`,
    },
  ];

  const tipIcon: Record<string, ReactNode> = {
    Hand: <Hand size={16} />,
    MessageCircle: <MessageCircle size={16} />,
    ShieldCheck: <ShieldCheck size={16} />,
    Calendar: <Calendar size={16} />,
    Euro: <CurrencyIcon size={16} />,
    Heart: <Heart size={16} />,
    Sparkles: <Sparkles size={16} />,
    TrendingDown: <TrendingDown size={16} />,
  };

  return (
    <ProductPage accent="violet">
      <ProductHero
        backLabel={t(d.hero.back, d.hero.backEs)}
        badge={t(d.hero.badge, d.hero.badgeEs)}
        badgeIcon={<Droplets size={14} />}
        title={t(d.hero.title, d.hero.titleEs)}
        subtitle={t(d.hero.subtitle, d.hero.subtitleEs)}
        subtitleIcon={<Sparkles size={18} />}
        stats={[
          {
            icon: <Calendar size={18} />,
            label: t(d.hero.stats.useLabel, d.hero.stats.useLabelEs),
            value: t(d.hero.stats.useValue, d.hero.stats.useValueEs),
          },
          {
            icon: <Clock size={18} />,
            label: t(d.hero.stats.lastsLabel, d.hero.stats.lastsLabelEs),
            value: t(d.hero.stats.lastsValue, d.hero.stats.lastsValueEs),
          },
          {
            icon: <ShieldCheck size={18} />,
            label: t(d.hero.stats.dermLabel, d.hero.stats.dermLabelEs),
            value: t(d.hero.stats.dermValue, d.hero.stats.dermValueEs),
          },
        ]}
      />

      <div className="px-5 pb-8 space-y-5">
        {/* ── THE HOOK ── */}
        <ProductSection
          index={0}
          icon={<Sparkles size={18} />}
          title={t(d.hook.heading, d.hook.headingEs)}
        >
          <div className="space-y-3">
            {d.hook.tricks.map((trick) => (
              <ScriptBlock
                key={trick.name}
                label={t(trick.name, trick.nameEs)}
                quote={t(trick.quote, trick.quoteEs)}
                note={
                  trick.desc ? (
                    <>
                      {t(trick.desc, trick.descEs)}{' '}
                      {trick.followUpQuote && (
                        <em className="text-ink">
                          {t(trick.followUpQuote, trick.followUpQuoteEs)}
                        </em>
                      )}
                    </>
                  ) : undefined
                }
              />
            ))}
          </div>
        </ProductSection>

        {/* ── THE DEMO ── */}
        <ProductSection
          index={1}
          icon={<Hand size={18} />}
          title={t(d.demo.heading, d.demo.headingEs)}
        >
          <div className="space-y-2.5">
            {d.demo.steps.map((item) => (
              <StepRow
                key={item.step}
                step={item.step}
                title={t(item.title, item.titleEs)}
                highlight={item.step === '2'}
              >
                <p className="text-body-small text-ink-2">{t(item.text, item.textEs)}</p>
              </StepRow>
            ))}
          </div>
        </ProductSection>

        {/* ── THE TWO OFFERS ── */}
        <ProductSection
          index={2}
          icon={<Droplets size={18} />}
          title={t(d.offers.heading, d.offers.headingEs)}
          subtitle={t(d.offers.subtext, d.offers.subtextEs)}
        >
          <div className="space-y-3">
            <OfferCard
              highlight
              tag={t(d.offers.option1.label, d.offers.option1.labelEs)}
              title={t(d.offers.option1.priceLabel, d.offers.option1.priceLabelEs)}
              price={price(stepPrice('promo'))}
              script={t(d.offers.option1.text, d.offers.option1.textEs)}
            />
            <OfferCard
              tag={t(d.offers.option2.label, d.offers.option2.labelEs)}
              title={t(d.offers.option2.priceLabel, d.offers.option2.priceLabelEs)}
              price={price(stepPrice('creams-free'))}
              script={t(d.offers.option2.text, d.offers.option2.textEs)}
            />
          </div>
        </ProductSection>

        {/* ── THE PRICE LADDER ── */}
        <ProductSection
          index={3}
          icon={<TrendingDown size={18} />}
          title={t(pl.heading, pl.headingEs)}
          subtitle={t(pl.subtext, pl.subtextEs)}
        >
          <PriceLadder rungs={rungs} anchor={L.europeAnchor} />
        </ProductSection>

        {/* ── EMOTIONAL CLOSE ── */}
        <ProductSection
          index={4}
          variant="feature"
          icon={<Heart size={18} />}
          title={t(d.emotionalClose.heading, d.emotionalClose.headingEs)}
        >
          <ScriptBlock
            label={t(d.emotionalClose.heartSellLabel, d.emotionalClose.heartSellLabelEs)}
            quote={t(d.emotionalClose.heartSellQuote, d.emotionalClose.heartSellQuoteEs)}
          />
          <p className="text-body-small text-ink-2 my-3">
            {t(d.emotionalClose.emotionInstruction, d.emotionalClose.emotionInstructionEs)}{' '}
            <strong className="text-ink">
              {t(d.emotionalClose.emotionInstructionBold, d.emotionalClose.emotionInstructionBoldEs)}
            </strong>{' '}
            {t(d.emotionalClose.emotionInstructionAfter, d.emotionalClose.emotionInstructionAfterEs)}
          </p>
          <ScriptBlock
            quote={t(d.emotionalClose.closeQuote, d.emotionalClose.closeQuoteEs)}
            note={t(d.emotionalClose.pauseInstruction, d.emotionalClose.pauseInstructionEs)}
          />
        </ProductSection>

        {/* ── PRO TIPS ── */}
        <ProductSection
          index={5}
          icon={<Lightbulb size={18} />}
          title={t(d.proTips.heading, d.proTips.headingEs)}
        >
          <ul className="space-y-2.5">
            {d.proTips.tips.map((tip) => (
              <li key={tip.title} className="flex gap-3 rounded-card bg-surface-sunken p-3.5">
                <span
                  aria-hidden="true"
                  className="shrink-0 w-9 h-9 rounded-chip flex items-center justify-center bg-[rgb(var(--pa-tint))] text-[rgb(var(--pa-strong))]"
                >
                  {tipIcon[tip.icon] ?? <Sparkles size={16} />}
                </span>
                <span className="min-w-0">
                  <span className="block text-body-small font-semibold text-ink">
                    {t(tip.title, tip.titleEs)}
                  </span>
                  <span className="block text-body-small text-ink-2 mt-0.5">
                    {t(tip.text, tip.textEs)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </ProductSection>

        {/* ── QUICK REFERENCE ── */}
        <ProductSection
          index={6}
          variant="feature"
          icon={<ShieldCheck size={18} />}
          title={t(d.quickRef.heading, d.quickRef.headingEs)}
        >
          <QuickRefGrid
            items={[
              {
                label: t(d.quickRef.items.use.label, d.quickRef.items.use.labelEs),
                value: t(d.quickRef.items.use.value, d.quickRef.items.use.valueEs),
              },
              {
                label: t(d.quickRef.items.lasts.label, d.quickRef.items.lasts.labelEs),
                value: t(d.quickRef.items.lasts.value, d.quickRef.items.lasts.valueEs),
              },
              {
                label: t(d.quickRef.items.creams.label, d.quickRef.items.creams.labelEs),
                value: t(d.quickRef.items.creams.value, d.quickRef.items.creams.valueEs),
              },
              {
                label: t(d.quickRef.items.derm.label, d.quickRef.items.derm.labelEs),
                value: t(d.quickRef.items.derm.value, d.quickRef.items.derm.valueEs),
              },
            ]}
          />
          <p className="text-caption text-ink-2 mt-3">
            {isEs ? 'Nunca por debajo de' : 'Never below'}{' '}
            <span className="text-danger font-bold">{price(L.floor)}</span>
          </p>
        </ProductSection>
      </div>
    </ProductPage>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NailKitPage — the 60-second demo. Accent: coral.
//
// This page used to print its own prices straight into the JSX: a {currency}140
// Europe anchor and a {currency}80 local price, neither of which the owner has
// ever charged. The Nail Kit is part of the mix-and-match family with the Scrub
// and the Body Butter — 80 in Europe, 60 here, 120 for three, 120 for four, 60
// for two, 30 floor — and every one of those numbers now comes from
// MIX_MATCH_LADDER in src/data/pricing.ts.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, type ReactNode } from 'react';
import {
  Clock,
  Gift,
  Hand,
  HeartHandshake,
  Lightbulb,
  Package,
  ScanEye,
  Shield,
  Sparkles,
  Star,
  TrendingDown,
  Volume2,
} from 'lucide-react';
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
import { nailKitData, type OfferData } from '../data/nailKitData';
import { MIX_MATCH_LADDER } from '../data/pricing';
import { useCurrency } from '../utils/currency';

const d = nailKitData;
const L = MIX_MATCH_LADDER;

const stepPrice = (id: string) => L.steps.find((s) => s.id === id)?.price ?? L.base;
const stepUnits = (id: string) => L.steps.find((s) => s.id === id)?.units;

export default function NailKitPage() {
  const { language } = useLanguage();
  const { currency, locationName, price, sub } = useCurrency();
  const isEs = language === 'es';

  const t = useCallback(
    (en?: string, es?: string) => sub((isEs && es) || en || es || ''),
    [isEs, sub]
  );

  /* Offer copy comes from the data file already in the reader's language. */
  const offers = d.getOffers(currency, locationName, isEs);
  const o = (i: number): Partial<OfferData> => offers[i] ?? {};
  const proTips = d.getProTips(currency, isEs);

  const rungs: LadderRung[] = [
    {
      id: 'europe',
      amount: L.europeAnchor,
      perUnit: true,
      tone: 'anchor',
      label: t(d.price.europeLabel, d.price.europeLabelEs),
    },
    {
      id: 'base',
      amount: L.base,
      perUnit: true,
      label: t(d.price.locationPriceLabel, d.price.locationPriceLabelEs),
    },
    {
      id: 'b2g1',
      amount: stepPrice('b2g1'),
      units: stepUnits('b2g1'),
      recommended: true,
      label: t(o(0).title),
      note: t(o(0).subtitle),
      items: o(0).items,
      script: t(o(0).script),
    },
    {
      id: 'b2g2',
      amount: stepPrice('b2g2'),
      units: stepUnits('b2g2'),
      label: t(o(1).title),
      note: t(o(1).subtitle),
      items: o(1).items,
      script: t(o(1).script),
    },
    {
      id: 'b1g1',
      amount: stepPrice('b1g1'),
      units: stepUnits('b1g1'),
      label: t(o(2).title),
      note: t(o(2).subtitle),
      items: o(2).items,
      script: t(o(2).script),
    },
    {
      id: 'floor',
      amount: L.floor,
      tone: 'floor',
      label: t(o(3).title),
      note: t(o(3).subtitle),
      items: o(3).items,
      script: t(o(3).script),
    },
  ];

  const tipIcon: Record<string, ReactNode> = {
    Sparkles: <Sparkles size={16} />,
    Shield: <Shield size={16} />,
    Gift: <Gift size={16} />,
    Package: <Package size={16} />,
    Hand: <Hand size={16} />,
    TrendingDown: <TrendingDown size={16} />,
    Star: <Star size={16} />,
    Clock: <Clock size={16} />,
    Euro: <CurrencyIcon size={16} />,
  };

  return (
    <ProductPage accent="coral">
      <ProductHero
        backLabel={t(d.hero.back, d.hero.backEs)}
        badge={t(d.hero.badge, d.hero.badgeEs)}
        badgeIcon={<Sparkles size={14} />}
        title={t(d.hero.title, d.hero.titleEs)}
        subtitle={t(d.hero.subtitle, d.hero.subtitleEs)}
        subtitleIcon={<Star size={18} />}
        stats={[
          {
            icon: <Clock size={18} />,
            label: t(d.hero.statDemoTime, d.hero.statDemoTimeEs),
            value: t(d.hero.statDemoValue, d.hero.statDemoValueEs),
          },
          {
            icon: <Shield size={18} />,
            label: t(d.hero.statWarranty, d.hero.statWarrantyEs),
            value: t(d.hero.statWarrantyValue, d.hero.statWarrantyValueEs),
          },
          {
            icon: <Sparkles size={18} />,
            label: t(d.hero.statShineLasts, d.hero.statShineLastsEs),
            value: t(d.hero.statShineValue, d.hero.statShineValueEs),
          },
        ]}
      />

      <div className="px-5 pb-8 space-y-5">
        {/* ── THE HOOK ── */}
        <ProductSection
          index={0}
          icon={<Volume2 size={18} />}
          title={t(d.hook.sectionTitle, d.hook.sectionTitleEs)}
        >
          <div className="space-y-3">
            <ScriptBlock
              label={t(d.hook.complimentLabel, d.hook.complimentLabelEs)}
              quote={t(d.hook.complimentScript, d.hook.complimentScriptEs)}
              note={t(d.hook.complimentCoaching, d.hook.complimentCoachingEs)}
            />
            <ScriptBlock
              label={t(d.hook.sceneLabel, d.hook.sceneLabelEs)}
              quote={t(d.hook.sceneScript, d.hook.sceneScriptEs)}
              note={t(d.hook.sceneCoaching, d.hook.sceneCoachingEs)}
            />
          </div>
        </ProductSection>

        {/* ── THE 3-STEP DEMO ── */}
        <ProductSection
          index={1}
          icon={<ScanEye size={18} />}
          title={t(d.demo.sectionTitle, d.demo.sectionTitleEs)}
          subtitle={t(d.demo.description, d.demo.descriptionEs)}
        >
          <div className="space-y-2.5">
            <StepRow
              step="1"
              label={t(d.demo.step1Label, d.demo.step1LabelEs)}
              title={t(d.demo.step1Title, d.demo.step1TitleEs)}
            >
              <p className="text-body-small text-ink-2">
                {t(d.demo.step1Instruction, d.demo.step1InstructionEs)}{' '}
                <em className="text-ink">{t(d.demo.step1Script, d.demo.step1ScriptEs)}</em>
              </p>
              <p className="text-body-small text-ink-2">
                {t(d.demo.step1CoachingPrefix, d.demo.step1CoachingPrefixEs)}
                <em className="text-ink">{t(d.demo.step1Coaching, d.demo.step1CoachingEs)}</em>
              </p>
            </StepRow>

            <StepRow
              step="2"
              label={t(d.demo.step2Label, d.demo.step2LabelEs)}
              title={t(d.demo.step2Title, d.demo.step2TitleEs)}
            >
              <p className="text-body-small text-ink-2">
                {t(d.demo.step2Instruction, d.demo.step2InstructionEs)}{' '}
                <em className="text-ink">{t(d.demo.step2Script, d.demo.step2ScriptEs)}</em>
              </p>
            </StepRow>

            <StepRow
              step="3"
              highlight
              label={t(d.demo.step3Label, d.demo.step3LabelEs)}
              title={t(d.demo.step3Title, d.demo.step3TitleEs)}
            >
              <p className="text-body-small text-ink-2">
                {t(d.demo.step3Instruction, d.demo.step3InstructionEs)}
              </p>
              <ScriptBlock
                label={t(d.demo.step3Teaser, d.demo.step3TeaserEs)}
                quote={t(d.demo.step3Script, d.demo.step3ScriptEs)}
                note={t(d.demo.step3Coaching, d.demo.step3CoachingEs)}
              />
            </StepRow>
          </div>
        </ProductSection>

        {/* ── THE WARRANTY PITCH ── */}
        <ProductSection
          index={2}
          variant="feature"
          icon={<Shield size={18} />}
          title={t(d.warranty.sectionTitle, d.warranty.sectionTitleEs)}
          subtitle={t(d.warranty.description, d.warranty.descriptionEs)}
        >
          <ScriptBlock
            label={t(d.warranty.presentKitLabel, d.warranty.presentKitLabelEs)}
            quote={t(d.warranty.presentKitScript, d.warranty.presentKitScriptEs)}
          />
          <p className="text-body-small text-ink-2 mt-3">
            {t(d.warranty.coachingIntro, d.warranty.coachingIntroEs)}{' '}
            <em className="text-ink">
              {t(d.warranty.coachingScript, d.warranty.coachingScriptEs)}
            </em>
          </p>
          <div className="mt-3">
            <QuickRefGrid
              items={[
                {
                  label: t(d.warranty.statWarrantyLabel, d.warranty.statWarrantyLabelEs),
                  value: t(d.warranty.statWarrantyValue, d.warranty.statWarrantyValueEs),
                },
                {
                  label: t(d.warranty.statKitLabel, d.warranty.statKitLabelEs),
                  value: t(d.warranty.statKitValue, d.warranty.statKitValueEs),
                },
              ]}
            />
          </div>
        </ProductSection>

        {/* ── THE PRICE LADDER ── */}
        <ProductSection
          index={3}
          icon={<TrendingDown size={18} />}
          title={t(d.price.sectionTitle, d.price.sectionTitleEs)}
        >
          <PriceLadder rungs={rungs} anchor={L.europeAnchor} />
        </ProductSection>

        {/* ── EMOTIONAL CONNECTION ── */}
        <ProductSection
          index={4}
          icon={<HeartHandshake size={18} />}
          title={t(d.emotional.sectionTitle, d.emotional.sectionTitleEs)}
        >
          <ScriptBlock quote={`“${t(d.emotional.script1, d.emotional.script1Es)}”`}>
            <p className="text-body font-brand italic text-ink mt-3">
              “{t(d.emotional.script2Template, d.emotional.script2TemplateEs)}”
            </p>
          </ScriptBlock>
          <p className="text-body-small text-ink-2 mt-3">
            {t(d.emotional.coaching, d.emotional.coachingEs)}
          </p>
        </ProductSection>

        {/* ── PRO TIPS ── */}
        <ProductSection
          index={5}
          icon={<Lightbulb size={18} />}
          title={t(d.proTips.sectionTitle, d.proTips.sectionTitleEs)}
        >
          <ul className="space-y-2.5">
            {proTips.map((tip) => (
              <li key={tip.title} className="flex gap-3 rounded-card bg-surface-sunken p-3.5">
                <span
                  aria-hidden="true"
                  className="shrink-0 w-9 h-9 rounded-chip flex items-center justify-center bg-[rgb(var(--pa-tint))] text-[rgb(var(--pa-strong))]"
                >
                  {tipIcon[tip.iconName] ?? <Sparkles size={16} />}
                </span>
                <span className="min-w-0">
                  <span className="block text-body-small font-semibold text-ink">
                    {t(tip.title)}
                  </span>
                  <span className="block text-body-small text-ink-2 mt-0.5">{t(tip.text)}</span>
                </span>
              </li>
            ))}
          </ul>
        </ProductSection>

        {/* ── QUICK REFERENCE ── */}
        <ProductSection
          index={6}
          variant="feature"
          icon={<Star size={18} />}
          title={t(d.quickRef.sectionTitle, d.quickRef.sectionTitleEs)}
        >
          <QuickRefGrid
            items={[
              {
                label: t(d.quickRef.demoLabel, d.quickRef.demoLabelEs),
                value: t(d.quickRef.demoValue, d.quickRef.demoValueEs),
              },
              {
                label: t(d.quickRef.shineLabel, d.quickRef.shineLabelEs),
                value: t(d.quickRef.shineValue, d.quickRef.shineValueEs),
              },
              {
                label: t(d.quickRef.warrantyLabel, d.quickRef.warrantyLabelEs),
                value: t(d.quickRef.warrantyValue, d.quickRef.warrantyValueEs),
              },
              {
                label: t(d.quickRef.noPolishLabel, d.quickRef.noPolishLabelEs),
                value: t(d.quickRef.noPolishValue, d.quickRef.noPolishValueEs),
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

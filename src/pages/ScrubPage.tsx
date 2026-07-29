// ─────────────────────────────────────────────────────────────────────────────
// ScrubPage — Dead Sea Scrub & Body Butter. Accent: gold.
//
// Scrub, Body Butter and the Nail Kit are one mix-and-match family on a single
// ladder (MIX_MATCH_LADDER in src/data/pricing.ts): 80 anchor, 60 each, 120 for
// three, 120 for four, 60 for two, 30 floor. This page and NailKitPage now read
// the same constant, so the two can no longer drift apart.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, type ReactNode } from 'react';
import {
  Droplets,
  Gift,
  Hand,
  Lightbulb,
  Moon,
  Package,
  Sparkles,
  Sun,
  TrendingDown,
  Volume2,
  Waves,
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
import { MIX_MATCH_LADDER } from '../data/pricing';
import { scrubData, getComboOffersData, type ComboOfferData } from '../data/scrubData';
import { useCurrency } from '../utils/currency';

const d = scrubData;
const L = MIX_MATCH_LADDER;

const stepPrice = (id: string) => L.steps.find((s) => s.id === id)?.price ?? L.base;
const stepUnits = (id: string) => L.steps.find((s) => s.id === id)?.units;

export default function ScrubPage() {
  const { language } = useLanguage();
  const { currency, locationName, price, sub } = useCurrency();
  const isEs = language === 'es';

  const t = useCallback(
    (en?: string, es?: string) => sub((isEs && es) || en || es || ''),
    [isEs, sub]
  );

  const pp = d.pricePresentationSection;

  /* Combo copy still lives in the data file; the amounts come from pricing.ts. */
  const combos = getComboOffersData(currency);
  const c = (i: number): Partial<ComboOfferData> => combos[i] ?? {};

  const rungs: LadderRung[] = [
    {
      id: 'europe',
      amount: L.europeAnchor,
      perUnit: true,
      tone: 'anchor',
      label: t(pp.anchorLabel, pp.anchorLabelEs),
      script: t(pp.anchorQuote(currency), pp.anchorQuoteEs(currency)),
    },
    {
      id: 'base',
      amount: L.base,
      perUnit: true,
      label: t(pp.localLabel, pp.localLabelEs),
      script: t(pp.localQuote(currency, locationName), pp.localQuoteEs(currency, locationName)),
    },
    {
      id: 'b2g1',
      amount: stepPrice('b2g1'),
      units: stepUnits('b2g1'),
      recommended: true,
      label: t(c(0).title, c(0).titleEs),
      note: t(c(0).subtitle, c(0).subtitleEs),
      items: c(0).items,
      script: t(pp.coreQuote(currency), pp.coreQuoteEs(currency)),
    },
    {
      id: 'b2g2',
      amount: stepPrice('b2g2'),
      units: stepUnits('b2g2'),
      label: t(c(1).title, c(1).titleEs),
      note: t(c(1).subtitle, c(1).subtitleEs),
      items: c(1).items,
    },
    {
      id: 'b1g1',
      amount: stepPrice('b1g1'),
      units: stepUnits('b1g1'),
      label: t(c(2).title, c(2).titleEs),
      note: t(c(2).subtitle, c(2).subtitleEs),
      items: c(2).items,
    },
    {
      id: 'floor',
      amount: L.floor,
      tone: 'floor',
      label: t(c(3).title, c(3).titleEs),
      note: t(c(3).subtitle, c(3).subtitleEs),
      items: c(3).items,
    },
  ];

  const tipIcon: Record<string, ReactNode> = {
    Hand: <Hand size={16} />,
    Droplets: <Droplets size={16} />,
    Sun: <Sun size={16} />,
    TrendingDown: <TrendingDown size={16} />,
    Gift: <Gift size={16} />,
    Package: <Package size={16} />,
    Sparkles: <Sparkles size={16} />,
    Moon: <Moon size={16} />,
    Euro: <CurrencyIcon size={16} />,
  };

  return (
    <ProductPage accent="gold">
      <ProductHero
        backLabel={t(d.backButton.text, d.backButton.textEs)}
        badge={t(d.hero.badge, d.hero.badgeEs)}
        badgeIcon={<Waves size={14} />}
        title={t(d.hero.title, d.hero.titleEs)}
        subtitle={t(d.hero.tagline, d.hero.taglineEs)}
        subtitleIcon={<Hand size={18} />}
        stats={[
          {
            icon: <Waves size={18} />,
            label: t(d.hero.stats.sourceLabel, d.hero.stats.sourceLabelEs),
            value: t(d.hero.stats.sourceValue, d.hero.stats.sourceValueEs),
          },
          {
            icon: <Moon size={18} />,
            label: t(d.hero.stats.jarLastsLabel, d.hero.stats.jarLastsLabelEs),
            value: t(d.hero.stats.jarLastsValue, d.hero.stats.jarLastsValueEs),
          },
          {
            icon: <Sparkles size={18} />,
            label: t(d.hero.stats.feelingLabel, d.hero.stats.feelingLabelEs),
            value: t(d.hero.stats.feelingValue, d.hero.stats.feelingValueEs),
          },
        ]}
      />

      <div className="px-5 pb-8 space-y-5">
        {/* ── THE HOOK ── */}
        <ProductSection
          index={0}
          icon={<Volume2 size={18} />}
          title={t(d.hookSection.title, d.hookSection.titleEs)}
        >
          <div className="space-y-3">
            {d.hookSection.quotes.map((quote, i) => (
              <ScriptBlock key={i} quote={`“${t(quote.text, quote.textEs)}”`} />
            ))}
          </div>
        </ProductSection>

        {/* ── THE SENSORY DEMO ── */}
        <ProductSection
          index={1}
          icon={<Hand size={18} />}
          title={t(d.sensoryDemoSection.title, d.sensoryDemoSection.titleEs)}
        >
          <div className="space-y-2.5">
            {d.sensoryDemoSection.steps.map((item) => (
              <StepRow
                key={item.step}
                step={item.step}
                title={t(item.title, item.titleEs)}
                highlight={item.step === '4'}
              >
                <p className="text-body-small text-ink-2">{t(item.text, item.textEs)}</p>
              </StepRow>
            ))}
          </div>
        </ProductSection>

        {/* ── THE BUTTER FLIP TEST ── */}
        <ProductSection
          index={2}
          variant="feature"
          icon={<Droplets size={18} />}
          title={t(d.butterFlipSection.title, d.butterFlipSection.titleEs)}
          subtitle={t(d.butterFlipSection.description, d.butterFlipSection.descriptionEs)}
        >
          <ScriptBlock
            label={t(d.butterFlipSection.demoLabel, d.butterFlipSection.demoLabelEs)}
            quote={t(d.butterFlipSection.demoQuote1, d.butterFlipSection.demoQuote1Es)}
          >
            <p className="text-body font-brand italic text-ink mt-2">
              {t(d.butterFlipSection.demoQuote2, d.butterFlipSection.demoQuote2Es)}
            </p>
          </ScriptBlock>
          <p className="text-body-small text-ink-2 mt-3">
            {t(d.butterFlipSection.closingLine, d.butterFlipSection.closingLineEs)}
            <em className="text-ink">
              “{t(d.butterFlipSection.closingQuote, d.butterFlipSection.closingQuoteEs)}”
            </em>
          </p>
        </ProductSection>

        {/* ── THE PRICE LADDER ── */}
        <ProductSection
          index={3}
          icon={<TrendingDown size={18} />}
          title={t(pp.title, pp.titleEs)}
        >
          <PriceLadder rungs={rungs} anchor={L.europeAnchor} />
        </ProductSection>

        {/* ── CHEAT COMBOS ── */}
        <ProductSection
          index={4}
          icon={<Package size={18} />}
          title={t(d.cheatCombosSection.title, d.cheatCombosSection.titleEs)}
        >
          <ul className="divide-y divide-line rounded-card border border-line overflow-hidden">
            {d.cheatCombosSection.combos.map((combo) => (
              <li
                key={combo.name}
                className="flex items-center justify-between gap-3 bg-surface px-3.5 py-3"
              >
                <span className="min-w-0">
                  <span className="block text-body-small font-semibold text-ink">
                    {t(combo.name, combo.nameEs)}
                  </span>
                  <span className="block text-caption text-ink-2">{t(combo.items)}</span>
                </span>
                <span className="shrink-0 text-h4 text-[rgb(var(--pa-strong))] tabular-nums">
                  {t(combo.price)}
                </span>
              </li>
            ))}
          </ul>
        </ProductSection>

        {/* ── PRO TIPS ── */}
        <ProductSection
          index={5}
          icon={<Lightbulb size={18} />}
          title={t(d.proTipsSection.title, d.proTipsSection.titleEs)}
        >
          <ul className="space-y-2.5">
            {d.proTipsSection.tips.map((tip) => (
              <li key={tip.title} className="flex gap-3 rounded-card bg-surface-sunken p-3.5">
                <span
                  aria-hidden="true"
                  className="shrink-0 w-9 h-9 rounded-chip flex items-center justify-center bg-[rgb(var(--pa-tint))] text-[rgb(var(--pa-strong))]"
                >
                  {tipIcon[tip.iconName] ?? <Sparkles size={16} />}
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
          icon={<Gift size={18} />}
          title={t(d.quickReferenceSection.title, d.quickReferenceSection.titleEs)}
        >
          <QuickRefGrid
            items={[
              {
                label: t(
                  d.quickReferenceSection.grid.europeLabel,
                  d.quickReferenceSection.grid.europeLabelEs
                ),
                value: t(
                  d.quickReferenceSection.grid.europeValue,
                  d.quickReferenceSection.grid.europeValueEs
                ),
              },
              {
                label: t(
                  d.quickReferenceSection.grid.localLabel,
                  d.quickReferenceSection.grid.localLabelEs
                ),
                value: t(
                  d.quickReferenceSection.grid.localValue,
                  d.quickReferenceSection.grid.localValueEs
                ),
              },
              {
                label: t(
                  d.quickReferenceSection.grid.coreLabel,
                  d.quickReferenceSection.grid.coreLabelEs
                ),
                value: t(
                  d.quickReferenceSection.grid.coreValue,
                  d.quickReferenceSection.grid.coreValueEs
                ),
              },
              {
                label: t(
                  d.quickReferenceSection.grid.floorLabel,
                  d.quickReferenceSection.grid.floorLabelEs
                ),
                value: t(
                  d.quickReferenceSection.grid.floorValue,
                  d.quickReferenceSection.grid.floorValueEs
                ),
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

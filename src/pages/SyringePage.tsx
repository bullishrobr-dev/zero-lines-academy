// ─────────────────────────────────────────────────────────────────────────────
// SyringePage — the flagship deep-dive. Accent: teal.
//
// Prices come from SYRINGE_LADDER in src/data/pricing.ts; nothing on this page
// types a number. Every authored string goes through `t()`, which picks the
// Spanish field when there is one, falls back to English when there is not,
// and resolves {currency} / {locationName} for the seller's shop.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, type ReactNode } from 'react';
import {
  Clock,
  Crown,
  Eye,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  ScanEye,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Users,
  Volume2,
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
import { SYRINGE_LADDER } from '../data/pricing';
import { syringeData } from '../data/syringeData';
import { useCurrency } from '../utils/currency';

const d = syringeData;
const L = SYRINGE_LADDER;

/** A named rung's total, straight from the single source of truth. */
const stepPrice = (id: string) => L.steps.find((s) => s.id === id)?.price ?? L.base;
const stepUnits = (id: string) => L.steps.find((s) => s.id === id)?.units;

export default function SyringePage() {
  const { language } = useLanguage();
  const { price, priceFor, sub } = useCurrency();
  const isEs = language === 'es';

  /** Localised + currency-resolved, with an English fallback per field. */
  const t = useCallback(
    (en?: string, es?: string) => sub((isEs && es) || en || es || ''),
    [isEs, sub]
  );

  const forWord = isEs ? 'por' : 'for';
  const ps = d.priceSteps;
  const pl = d.priceLadder;

  const rungs: LadderRung[] = [
    {
      id: 'europe',
      amount: L.europeAnchor,
      tone: 'anchor',
      label: t(ps.europeLabel, ps.europeLabelEs),
      note: t(ps.europeDescription, ps.europeDescriptionEs),
      script: t(ps.europeScript, ps.europeScriptEs),
    },
    {
      id: 'base',
      amount: L.base,
      label: t(ps.locationLabel, ps.locationLabelEs),
      note: t(ps.locationDescription, ps.locationDescriptionEs),
      script: t(ps.locationScript, ps.locationScriptEs),
    },
    {
      id: 'promo',
      amount: stepPrice('promo'),
      recommended: true,
      label: t(ps.promoLabel, ps.promoLabelEs),
      note: t(ps.promoDescription, ps.promoDescriptionEs),
      script: t(ps.promoScript, ps.promoScriptEs),
      hint: t(pl.highlightHint, pl.highlightHintEs),
    },
    {
      id: 'no-gift',
      amount: stepPrice('no-gift'),
      label: t(ps.noGiftLabel, ps.noGiftLabelEs),
      note: t(ps.noGiftDescription, ps.noGiftDescriptionEs),
      script: t(ps.noGiftScript, ps.noGiftScriptEs),
    },
    {
      id: 'voucher',
      amount: stepPrice('voucher'),
      label: t(ps.voucherLabel, ps.voucherLabelEs),
      note: t(ps.voucherDescription, ps.voucherDescriptionEs),
      script: t(ps.voucherScript, ps.voucherScriptEs),
      hint: t(pl.voucherHint, pl.voucherHintEs),
    },
    {
      id: 'floor',
      amount: L.floor,
      tone: 'floor',
      label: t(ps.minimumLabel, ps.minimumLabelEs),
      note: t(ps.minimumDescription, ps.minimumDescriptionEs),
      script: t(ps.minimumScript, ps.minimumScriptEs),
      hint: t(pl.minimumWarning, pl.minimumWarningEs),
    },
  ];

  const tipIcon: Record<string, ReactNode> = {
    Euro: <CurrencyIcon size={16} />,
    Eye: <Eye size={16} />,
    Users: <Users size={16} />,
    MessageCircle: <MessageCircle size={16} />,
    ShieldCheck: <ShieldCheck size={16} />,
    TrendingDown: <TrendingDown size={16} />,
    HeartHandshake: <HeartHandshake size={16} />,
    Sparkles: <Sparkles size={16} />,
  };

  return (
    <ProductPage accent="teal">
      <ProductHero
        backLabel={t(d.hero.backButton, d.hero.backButtonEs)}
        badge={t(d.hero.badge, d.hero.badgeEs)}
        badgeIcon={<Crown size={14} />}
        title={t(d.hero.title, d.hero.titleEs)}
        subtitle={t(d.hero.subtitle, d.hero.subtitleEs)}
        subtitleIcon={<Eye size={18} />}
        stats={[
          {
            icon: <Clock size={18} />,
            label: t(d.stats.useLabel, d.stats.useLabelEs),
            value: t(d.stats.useValue, d.stats.useValueEs),
          },
          {
            icon: <ShieldCheck size={18} />,
            label: t(d.stats.lastsLabel, d.stats.lastsLabelEs),
            value: t(d.stats.lastsValue, d.stats.lastsValueEs),
          },
          {
            icon: <Sparkles size={18} />,
            label: t(d.stats.resultsLabel, d.stats.resultsLabelEs),
            value: t(d.stats.resultsValue, d.stats.resultsValueEs),
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
              label={t(d.hook.script1Label, d.hook.script1LabelEs)}
              quote={t(d.hook.script1Text, d.hook.script1TextEs)}
              note={
                <>
                  {t(d.hook.script1Instruction, d.hook.script1InstructionEs)}{' '}
                  <em className="text-ink">
                    {t(d.hook.script1Continuation, d.hook.script1ContinuationEs)}
                  </em>
                </>
              }
            />
            <ScriptBlock
              label={t(d.hook.script2Label, d.hook.script2LabelEs)}
              quote={t(d.hook.script2Text, d.hook.script2TextEs)}
              note={
                <>
                  {t(d.hook.script2Instruction, d.hook.script2InstructionEs)}{' '}
                  <em className="text-ink">
                    {t(d.hook.script2Continuation, d.hook.script2ContinuationEs)}
                  </em>
                </>
              }
            />
            <ScriptBlock
              label={t(d.hook.script3Label, d.hook.script3LabelEs)}
              quote={t(d.hook.script3Text, d.hook.script3TextEs)}
            />
          </div>
        </ProductSection>

        {/* ── THE DEMO ── */}
        <ProductSection
          index={1}
          icon={<ScanEye size={18} />}
          title={t(d.demo.sectionTitle, d.demo.sectionTitleEs)}
        >
          <div className="space-y-2.5">
            {d.demo.steps.map((item) => (
              <StepRow
                key={item.step}
                step={item.step}
                title={t(item.title, item.titleEs)}
                highlight={item.step === '6'}
              >
                <p className="text-body-small text-ink-2">{t(item.text, item.textEs)}</p>
              </StepRow>
            ))}
          </div>
        </ProductSection>

        {/*
          ── THE TWO OFFERS ──
          Both options are presented here, together, immediately after the demo
          — the same order the Peeling page uses.

          This section used to be missing. The page went demo → Partner Upsell,
          and the Partner Upsell opens with "Now introduce Option 2:" while
          Option 2's own section sat two sections further down and Option 1 was
          never presented at all. A seller reading it in order was told to
          introduce something the page had not taught them yet.
        */}
        <ProductSection
          index={2}
          icon={<Sparkles size={18} />}
          title={t(d.offers.heading, d.offers.headingEs)}
          subtitle={t(d.offers.subtext, d.offers.subtextEs)}
        >
          <div className="space-y-3">
            <OfferCard
              tag={t(d.offers.option1.label, d.offers.option1.labelEs)}
              title={t(d.offers.option1.priceLabel, d.offers.option1.priceLabelEs)}
              price={price(stepPrice('promo'))}
              script={t(d.offers.option1.text, d.offers.option1.textEs)}
            />
            <OfferCard
              highlight
              tag={t(d.offers.option2.label, d.offers.option2.labelEs)}
              title={t(d.offers.option2.priceLabel, d.offers.option2.priceLabelEs)}
              price={priceFor(stepPrice('second-free'), stepUnits('second-free') ?? 2, forWord)}
              subtitle={t(d.offer2.description, d.offer2.descriptionEs).replace(/<\/?strong>/g, '')}
              items={[
                `${t(d.offer2.treatsLabel, d.offer2.treatsLabelEs)} ${t(d.offer2.treatsValue, d.offer2.treatsValueEs)}`,
              ]}
              script={t(d.offers.option2.text, d.offers.option2.textEs)}
            />
          </div>
          <div className="mt-3">
            <ScriptBlock
              label={t(d.offers.twoChoiceLabel, d.offers.twoChoiceLabelEs)}
              quote={t(d.offers.twoChoiceScript, d.offers.twoChoiceScriptEs)}
            />
          </div>
        </ProductSection>

        {/* ── THE PRICE LADDER ── */}
        <ProductSection
          index={3}
          icon={<TrendingDown size={18} />}
          title={t(pl.sectionTitle, pl.sectionTitleEs)}
          subtitle={t(pl.description, pl.descriptionEs)}
        >
          <PriceLadder rungs={rungs} anchor={L.europeAnchor} />
        </ProductSection>

        {/*
          ── PARTNER UPSELL ──
          Now a SCENARIO for pushing Option 2, which by this point has actually
          been presented, so "introduce Option 2" finally refers to something
          the reader has seen.
        */}
        <ProductSection
          index={4}
          variant="feature"
          icon={<Users size={18} />}
          title={t(d.partnerUpsell.sectionTitle, d.partnerUpsell.sectionTitleEs)}
          subtitle={t(d.partnerUpsell.subtitle, d.partnerUpsell.subtitleEs)}
        >
          <p className="text-body-small text-ink-2 mb-3">
            {t(d.partnerUpsell.description, d.partnerUpsell.descriptionEs)}
          </p>
          <ScriptBlock quote={t(d.partnerUpsell.script1, d.partnerUpsell.script1Es)} />
          <div className="mt-3 space-y-2">
            <p className="text-body-small text-ink-2">
              {t(d.partnerUpsell.option2Intro, d.partnerUpsell.option2IntroEs)}{' '}
              <em className="text-ink">
                {t(d.partnerUpsell.option2Script, d.partnerUpsell.option2ScriptEs)}
              </em>
            </p>
            <p className="text-body-small text-ink-2">
              {t(d.partnerUpsell.advancedLabel, d.partnerUpsell.advancedLabelEs)}{' '}
              <em className="text-ink">
                {t(d.partnerUpsell.advancedScript, d.partnerUpsell.advancedScriptEs)}
              </em>
            </p>
          </div>
        </ProductSection>

        {/* ── VOUCHER CLOSE ── */}
        <ProductSection
          index={5}
          icon={<HeartHandshake size={18} />}
          title={t(d.voucherClose.sectionTitle, d.voucherClose.sectionTitleEs)}
        >
          <div className="space-y-3">
            <ScriptBlock
              label={t(d.voucherClose.exactWordsLabel, d.voucherClose.exactWordsLabelEs)}
              quote={`“${t(d.voucherClose.voucherScript, d.voucherClose.voucherScriptEs)}”`}
            />
            <ScriptBlock
              label={t(d.voucherClose.twoPromisesLabel, d.voucherClose.twoPromisesLabelEs)}
              quote={t(d.voucherClose.twoPromisesScript, d.voucherClose.twoPromisesScriptEs)}
            />
            <ScriptBlock
              label={t(d.voucherClose.whatsappLabel, d.voucherClose.whatsappLabelEs)}
              quote={t(d.voucherClose.whatsappScript, d.voucherClose.whatsappScriptEs)}
              note={t(d.voucherClose.whatsappNote, d.voucherClose.whatsappNoteEs)}
            />
          </div>
        </ProductSection>

        {/* ── PRO TIPS ── */}
        <ProductSection
          index={6}
          icon={<Lightbulb size={18} />}
          title={t(d.proTips.sectionTitle, d.proTips.sectionTitleEs)}
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
          index={7}
          variant="feature"
          icon={<Crown size={18} />}
          title={t(d.quickRef.sectionTitle, d.quickRef.sectionTitleEs)}
        >
          <QuickRefGrid
            items={[
              {
                label: t(d.quickRef.useLabel, d.quickRef.useLabelEs),
                value: t(d.quickRef.useValue, d.quickRef.useValueEs),
              },
              {
                label: t(d.quickRef.lastsLabel, d.quickRef.lastsLabelEs),
                value: t(d.quickRef.lastsValue, d.quickRef.lastsValueEs),
              },
              {
                label: t(d.quickRef.resultsLabel, d.quickRef.resultsLabelEs),
                value: t(d.quickRef.resultsValue, d.quickRef.resultsValueEs),
              },
              {
                label: t(d.quickRef.ruleLabel, d.quickRef.ruleLabelEs),
                value: t(d.quickRef.ruleValue, d.quickRef.ruleValueEs),
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

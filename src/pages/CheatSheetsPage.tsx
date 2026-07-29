// ─────────────────────────────────────────────────────────────────────────────
// CheatSheetsPage — the screen a seller opens standing next to a customer.
//
// All copy lives in src/data/cheatSheets.ts and every number comes from
// src/data/pricing.ts. Nothing here builds a price string by hand: `sub()`
// resolves {currency}/{locationName} and `price()` formats amounts, so the
// spoken script and the price column can never disagree.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Eye, Lightbulb, MessageCircle, Search, ShieldCheck, Tag, ThumbsUp, TriangleAlert, XCircle, Zap,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import CheatSheetLadder from '../components/CheatSheetLadder';
import CopyButton from '../components/CopyButton';
import {
  ACCENT, BODY_LANGUAGE, BUYING_SIGNALS, CIALDINI, EMERGENCY_BLOCKS, LADDER_BY_ID,
  PHRASES, PRODUCT_LADDERS, SCRIPTS, tr,
} from '../data/cheatSheets';

type SheetTab = 'all' | 'prices' | 'scripts' | 'emergency' | 'psychology';

// Written out in full: Tailwind only generates class names it can see literally.
const ON_TEAL = 'data-[state=active]:bg-teal data-[state=active]:text-on-teal dark:data-[state=active]:bg-teal dark:data-[state=active]:text-on-teal';
const ON_CORAL = 'data-[state=active]:bg-coral data-[state=active]:text-on-coral dark:data-[state=active]:bg-coral dark:data-[state=active]:text-on-coral';

function SectionHead({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return <div className="flex items-center gap-2 mb-3">{icon}<h2 className="text-h3 text-ink">{children}</h2></div>;
}

/** A quote the seller reads aloud, with its one-tap copy button. */
function Spoken({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <p className="text-body text-ink flex-1">{text}</p>
      <CopyButton text={text} />
    </div>
  );
}

export default function CheatSheetsPage() {
  const { sub } = useCurrency();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SheetTab>('all');
  const [search, setSearch] = useState('');
  const [scriptFilter, setScriptFilter] = useState('all');
  const q = search.toLowerCase().trim();
  const show = (tab: SheetTab) => activeTab === 'all' || activeTab === tab;

  const categoryLabel: Record<string, string> = {
    all: t('cheatSheetsAll'),
    opening: t('cheatSheetsOpening'),
    closing: t('cheatSheetsClosing'),
    objection: t('cheatSheetsObjections'),
    partner: t('cheatSheetsPartner'),
    competitor: tr(language, 'Competitor', 'Competencia'),
  };

  const tabs: { key: SheetTab; label: string; on: string }[] = [
    { key: 'all', label: t('cheatSheetsAll'), on: ON_TEAL },
    { key: 'prices', label: t('cheatSheetsPrices'), on: ON_TEAL },
    { key: 'scripts', label: t('cheatSheetsScripts'), on: ON_TEAL },
    { key: 'emergency', label: tr(language, 'Emergency', 'Emergencia'), on: ON_CORAL },
    { key: 'psychology', label: t('cheatSheetsPsychology'), on: ON_TEAL },
  ];

  const scripts = useMemo(
    () =>
      SCRIPTS.map((s) => ({ ...s, name: sub(tr(language, s.title, s.titleEs)), body: sub(tr(language, s.text, s.textEs)) }))
        .filter((s) => scriptFilter === 'all' || s.category === scriptFilter)
        .filter((s) => !q || `${s.name} ${s.body} ${s.product ?? ''}`.toLowerCase().includes(q)),
    [language, q, scriptFilter, sub]
  );

  const phrases = useMemo(
    () =>
      PHRASES.map((p) => ({ ...p, body: sub(tr(language, p.text, p.textEs)), why: sub(tr(language, p.reason, p.reasonEs)) }))
        .filter((p) => !q || `${p.body} ${p.why}`.toLowerCase().includes(q)),
    [language, q, sub]
  );

  const tipLists = [
    { key: 'body', title: t('cheatSheetsBodyLanguage'), accent: 'violet' as const, icon: <Eye size={18} />, items: BODY_LANGUAGE },
    { key: 'signals', title: t('cheatSheetsBuyingSignals'), accent: 'teal' as const, icon: <ShieldCheck size={18} />, items: BUYING_SIGNALS },
  ];

  return (
    <div className="min-h-full bg-background pb-24">
      <header className="pt-6 px-5">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={22} className="text-teal-strong" />
          <h1 className="text-h1 text-ink">{t('cheatSheetsTitle')}</h1>
        </div>
        <p className="text-body-small text-ink-2 mb-4">{t('cheatSheetsSubtitle')}</p>

        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none" />
          <input
            type="search" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={t('cheatSheetsSearch')} aria-label={t('cheatSheetsSearch')}
            className="w-full min-h-touch bg-surface border border-line-strong rounded-full pl-11 pr-4 text-body text-ink placeholder:text-ink-3"
          />
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SheetTab)} className="mb-6">
          <TabsList className="w-full bg-surface-sunken border border-line h-auto p-1 gap-1 flex-wrap">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key} className={`flex-1 min-h-touch rounded-chip text-caption text-ink-2 ${tab.on}`}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </header>

      <div className="px-5 space-y-8">
        {show('prices') && (
          <section>
            <SectionHead icon={<Tag size={18} className="text-teal-strong" />}>{t('cheatSheetsPriceLadder')}</SectionHead>
            <div className="space-y-3">
              {PRODUCT_LADDERS.map((product) => (
                <CheatSheetLadder key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {show('scripts') && (
          <section>
            <SectionHead icon={<MessageCircle size={18} className="text-violet-strong" />}>{t('cheatSheetsScripts')}</SectionHead>
            <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
              {Object.entries(categoryLabel).map(([key, label]) => (
                <button
                  key={key} type="button" onClick={() => setScriptFilter(key)} aria-pressed={scriptFilter === key}
                  className={`shrink-0 min-h-touch px-4 rounded-full text-caption border ${
                    scriptFilter === key ? 'bg-violet-tint text-violet-strong border-violet' : 'bg-surface text-ink-2 border-line'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="space-y-2.5">
              <AnimatePresence mode="popLayout">
                {scripts.map((s) => {
                  const product = s.product ? LADDER_BY_ID[s.product] : undefined;
                  return (
                    <motion.article
                      key={s.id} layout className="surface-flat p-4" transition={{ duration: 0.2 }}
                      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        {product && (
                          <span className={`text-overline rounded-full px-2 py-0.5 ${ACCENT[product.accent].tint} ${ACCENT[product.accent].text}`}>
                            {tr(language, product.short, product.shortEs)}
                          </span>
                        )}
                        <span className="text-overline text-ink-3">{categoryLabel[s.category]}</span>
                      </div>
                      <h3 className="text-caption text-ink-2 mb-1">{s.name}</h3>
                      <Spoken text={s.body} />
                    </motion.article>
                  );
                })}
              </AnimatePresence>
              {scripts.length === 0 && <p className="text-body-small text-ink-2 text-center py-6">{t('cheatSheetsNoScripts')}</p>}
            </div>
          </section>
        )}

        {show('emergency') && (
          <section className="space-y-3">
            <SectionHead icon={<TriangleAlert size={18} className="text-coral-strong" />}>
              {tr(language, 'Emergency Cheat Sheet', 'Hoja de Emergencia')}
            </SectionHead>
            {EMERGENCY_BLOCKS.map((block) => (
              <div key={block.key} className={`rounded-card border border-line p-4 ${ACCENT[block.accent].tint}`}>
                <p className={`text-overline ${ACCENT[block.accent].text}`}>{tr(language, block.title, block.titleEs)}</p>
                <p className="text-caption text-ink-2 mb-3">{tr(language, block.hint, block.hintEs)}</p>
                <ul className="space-y-3">
                  {block.items.map((item, i) => (
                    <li key={item.id}>
                      {(block.numbered || item.head) && (
                        <p className={`text-caption font-bold ${ACCENT[block.accent].text}`}>
                          {block.numbered ? `${i + 1}.` : tr(language, item.head ?? '', item.headEs ?? '')}
                        </p>
                      )}
                      <Spoken text={sub(tr(language, item.text, item.textEs))} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {show('psychology') && (
          <section className="space-y-8">
            <div>
              <SectionHead icon={<Lightbulb size={18} className="text-gold-strong" />}>{t('cheatSheetsCialdini')}</SectionHead>
              <div className="space-y-2.5">
                {CIALDINI.map((p) => (
                  <div key={p.id} className="surface-flat p-4">
                    <h3 className="text-h4 text-gold-strong mb-1">{tr(language, p.name, p.nameEs)}</h3>
                    <p className="text-body-small text-ink-2 mb-2">{tr(language, p.description, p.descriptionEs)}</p>
                    <div className="flex items-start gap-2">
                      <Zap size={16} className="text-teal-strong mt-1 shrink-0" aria-hidden="true" />
                      <p className="text-body text-ink flex-1">{sub(tr(language, p.apply, p.applyEs))}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHead icon={<MessageCircle size={18} className="text-teal-strong" />}>{t('cheatSheetsKeyPhrases')}</SectionHead>
              <div className="space-y-2">
                {phrases.map((p) => (
                  <div key={p.id} className={`rounded-card border p-4 ${p.type === 'good' ? 'bg-success-tint border-success/40' : 'bg-danger-tint border-danger/40'}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      {p.type === 'good' ? <ThumbsUp size={16} className="text-success" aria-hidden="true" /> : <XCircle size={16} className="text-danger" aria-hidden="true" />}
                      <p className={`text-overline ${p.type === 'good' ? 'text-success' : 'text-danger'}`}>
                        {p.type === 'good' ? t('cheatSheetsSayThis') : t('cheatSheetsAvoidThis')}
                      </p>
                    </div>
                    <Spoken text={p.body} />
                    <p className="text-caption text-ink-2 mt-1">{p.why}</p>
                  </div>
                ))}
                {phrases.length === 0 && <p className="text-body-small text-ink-2 text-center py-4">{t('cheatSheetsNoPhrases')}</p>}
              </div>
            </div>

            {tipLists.map((list) => (
              <div key={list.key}>
                <SectionHead icon={<span className={ACCENT[list.accent].text}>{list.icon}</span>}>{list.title}</SectionHead>
                <ul className="space-y-2">
                  {list.items.map((item) => (
                    <li key={item.id} className="surface-flat p-4 flex items-start gap-3">
                      <span className={`w-9 h-9 rounded-chip flex items-center justify-center shrink-0 ${ACCENT[list.accent].tint} ${ACCENT[list.accent].text}`} aria-hidden="true">
                        {list.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-body-small font-semibold text-ink">{tr(language, item.term, item.termEs)}</p>
                        <p className="text-caption text-ink-2 mt-0.5">{tr(language, item.meaning, item.meaningEs)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

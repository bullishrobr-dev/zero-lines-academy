// ─────────────────────────────────────────────────────────────────────────────
// CheatSheetsPage — the screen a seller opens standing next to a customer.
//
// ── WHAT WAS WRONG ──────────────────────────────────────────────────────────
// It opened on a tab called "All" that rendered every section at once: four
// price ladders, thirty-odd scripts, the emergency sheet, Cialdini, the phrase
// list and both tell lists. Measured on a 390x844 phone that is 13,691px —
// 16.2 screens of scrolling — and it is the screen you open with a customer
// standing in front of you. Nobody reads sixteen screens mid-sale. They put the
// phone away.
//
// ── WHAT THIS IS NOW ────────────────────────────────────────────────────────
// Nothing renders until it is asked for. The landing screen is one screen of
// large targets, and every answer is at most two taps away:
//
//   • "They said…" — the fastest path, because mid-sale the question is almost
//     always "they just objected, what do I say?". The tiles are the SAME nine
//     walk-away reasons the journal uses (encounterChips.ts), so a seller who
//     tapped "Muy caro" on the last customer taps the same words here and gets
//     the line. Two features, one vocabulary.
//   • Prices / Scripts / Panic / Psychology — one section at a time.
//   • Search cuts across everything at once and returns a flat ranked list,
//     rather than making you guess which section a phrase lives in.
//
// All nine walk-away reasons now return a line. The last three — "been
// scammed", "wrong for my skin", "cheaper online" — used to show an honest
// "no scripted line yet" note, because their answers were sitting inside
// lessons O4/O5/O7, three taps and a scroll from a seller who has four seconds.
// They are lifted here verbatim, so the cheat sheet and the lesson cannot end
// up teaching two different answers. The empty-state is still built and still
// correct: add a tenth reason to encounterChips.ts without a line and the panel
// will say so rather than showing something invented.
//
// All copy lives in src/data/cheatSheets.ts and every number comes from
// src/data/pricing.ts. Nothing here builds a price string by hand: `sub()`
// resolves {currency}/{locationName} and the ladders format their own amounts,
// so the spoken script and the price column can never disagree.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, ChevronDown, Eye, Lightbulb, MessageCircle,
  MessagesSquare, Search, ShieldCheck, Tag, ThumbsUp, TriangleAlert, XCircle, Zap,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import CheatSheetLadder from '../components/CheatSheetLadder';
import CopyButton from '../components/CopyButton';
import { WALK_REASONS, chipLabel } from '../data/encounterChips';
import {
  ACCENT, BODY_LANGUAGE, BUYING_SIGNALS, CIALDINI, EMERGENCY_BLOCKS, LADDER_BY_ID,
  PHRASES, PRODUCT_LADDERS, SCRIPTS, tr,
} from '../data/cheatSheets';

type Section = 'home' | 'said' | 'prices' | 'scripts' | 'panic' | 'psychology';

/** One search hit, whatever kind of content it came from. */
interface Hit {
  key: string;
  badge: string;
  title?: string;
  body: string;
  note?: string;
  tone?: 'good' | 'bad';
}

/** A quote the seller reads aloud, with its one-tap copy button. */
function Spoken({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <p className="flex-1 text-body text-ink">{text}</p>
      <CopyButton text={text} />
    </div>
  );
}

/**
 * A group that starts closed. Used for the study material — Cialdini, the
 * phrase list, the two tell lists — which is worth reading on a break and is
 * pure noise while someone is waiting for you to answer them.
 */
function Collapsible({
  title,
  icon,
  count,
  children,
}: {
  title: string;
  icon: ReactNode;
  count: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="surface-flat overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-touch w-full items-center gap-3 p-4 text-left"
      >
        {icon}
        <span className="flex-1 text-body font-semibold text-ink">{title}</span>
        <span className="text-caption text-ink-3">{count}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-ink-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && <div className="border-t border-line p-4 pt-3">{children}</div>}
    </div>
  );
}

export default function CheatSheetsPage() {
  const { sub } = useCurrency();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const isEs = language === 'es';

  /* `?said=price` opens straight on that objection's answers. It is how the
     "biggest leak" card on Home hands off — the seller taps one button and the
     lines are already on screen, rather than landing here and hunting. Read
     once as the initial state so tapping Back inside the page still works. */
  const [params] = useSearchParams();
  const deepLinked = params.get('said');

  const [section, setSection] = useState<Section>(deepLinked ? 'said' : 'home');
  const [search, setSearch] = useState('');
  const [reason, setReason] = useState<string | null>(
    deepLinked && WALK_REASONS.some((r) => r.id === deepLinked) ? deepLinked : null,
  );
  const [scriptFilter, setScriptFilter] = useState('opening');

  const q = search.toLowerCase().trim();
  const searching = q.length > 0;

  /* Memoised because the search below depends on it, and a fresh object every
     render would re-run the whole cross-content scan on every keystroke. */
  const categoryLabel = useMemo<Record<string, string>>(
    () => ({
      all: t('cheatSheetsAll'),
      opening: t('cheatSheetsOpening'),
      closing: t('cheatSheetsClosing'),
      objection: t('cheatSheetsObjections'),
      partner: t('cheatSheetsPartner'),
      competitor: tr(language, 'Competitor', 'Competencia'),
    }),
    [t, language],
  );

  // ── Search: one flat list across every kind of content ────────────────────
  const hits = useMemo<Hit[]>(() => {
    if (!q) return [];
    const out: Hit[] = [];
    const match = (...parts: (string | undefined)[]) =>
      parts.filter(Boolean).join(' ').toLowerCase().includes(q);

    for (const s of SCRIPTS) {
      const title = sub(tr(language, s.title, s.titleEs));
      const body = sub(tr(language, s.text, s.textEs));
      if (match(title, body)) {
        out.push({ key: `s-${s.id}`, badge: categoryLabel[s.category], title, body });
      }
    }
    for (const block of EMERGENCY_BLOCKS) {
      for (const item of block.items) {
        const body = sub(tr(language, item.text, item.textEs));
        const head = item.head ? tr(language, item.head, item.headEs ?? '') : undefined;
        if (match(head, body)) {
          out.push({
            key: `e-${item.id}`,
            badge: tr(language, block.title, block.titleEs),
            title: head,
            body,
          });
        }
      }
    }
    for (const p of PHRASES) {
      const body = sub(tr(language, p.text, p.textEs));
      const note = sub(tr(language, p.reason, p.reasonEs));
      if (match(body, note)) {
        out.push({
          key: `p-${p.id}`,
          badge: p.type === 'good' ? t('cheatSheetsSayThis') : t('cheatSheetsAvoidThis'),
          body,
          note,
          tone: p.type,
        });
      }
    }
    for (const c of CIALDINI) {
      const title = tr(language, c.name, c.nameEs);
      const body = sub(tr(language, c.apply, c.applyEs));
      if (match(title, body, tr(language, c.description, c.descriptionEs))) {
        out.push({ key: `c-${c.id}`, badge: t('cheatSheetsCialdini'), title, body });
      }
    }
    for (const [items, badge] of [
      [BODY_LANGUAGE, t('cheatSheetsBodyLanguage')],
      [BUYING_SIGNALS, t('cheatSheetsBuyingSignals')],
    ] as const) {
      for (const item of items) {
        const title = tr(language, item.term, item.termEs);
        const body = tr(language, item.meaning, item.meaningEs);
        if (match(title, body)) out.push({ key: `t-${item.id}`, badge, title, body });
      }
    }
    return out;
  }, [q, language, sub, t, categoryLabel]);

  // ── "They said…" — the lines that answer one walk-away reason ─────────────
  const answersFor = useMemo(() => {
    if (!reason) return { lines: [] as { key: string; label?: string; body: string }[] };
    const lines: { key: string; label?: string; body: string }[] = [];
    for (const s of SCRIPTS) {
      if (s.answers !== reason) continue;
      const product = s.product ? LADDER_BY_ID[s.product] : undefined;
      lines.push({
        key: `s-${s.id}`,
        label: product ? tr(language, product.short, product.shortEs) : undefined,
        body: sub(tr(language, s.text, s.textEs)),
      });
    }
    for (const block of EMERGENCY_BLOCKS) {
      for (const item of block.items) {
        if (item.answers !== reason) continue;
        lines.push({
          key: `e-${item.id}`,
          label: tr(language, 'Under pressure', 'Bajo presión'),
          body: sub(tr(language, item.text, item.textEs)),
        });
      }
    }
    return { lines };
  }, [reason, language, sub]);

  const scripts = useMemo(
    () =>
      SCRIPTS.filter((s) => scriptFilter === 'all' || s.category === scriptFilter).map((s) => ({
        ...s,
        name: sub(tr(language, s.title, s.titleEs)),
        body: sub(tr(language, s.text, s.textEs)),
      })),
    [language, scriptFilter, sub],
  );

  const tipLists = [
    {
      key: 'body',
      title: t('cheatSheetsBodyLanguage'),
      accent: 'violet' as const,
      icon: <Eye size={18} />,
      items: BODY_LANGUAGE,
    },
    {
      key: 'signals',
      title: t('cheatSheetsBuyingSignals'),
      accent: 'teal' as const,
      icon: <ShieldCheck size={18} />,
      items: BUYING_SIGNALS,
    },
  ];

  /* The landing tiles. "They said…" is first and full width on purpose: it is
     the reason this screen gets opened at all. */
  const tiles: {
    key: Section;
    label: string;
    hint: string;
    icon: LucideIcon;
    accent: 'coral' | 'teal' | 'violet' | 'gold';
    wide?: boolean;
  }[] = [
    {
      key: 'said',
      label: isEs ? 'Han dicho…' : 'They said…',
      hint: isEs ? 'La respuesta exacta, ahora' : 'The exact answer, right now',
      icon: MessagesSquare,
      accent: 'coral',
      wide: true,
    },
    {
      key: 'prices',
      label: t('cheatSheetsPrices'),
      hint: isEs ? '4 escaleras' : '4 ladders',
      icon: Tag,
      accent: 'teal',
    },
    {
      key: 'scripts',
      label: t('cheatSheetsScripts'),
      hint: isEs ? 'Abrir y cerrar' : 'Open and close',
      icon: MessageCircle,
      accent: 'violet',
    },
    {
      key: 'panic',
      label: isEs ? 'Pánico' : 'Panic',
      hint: isEs ? 'Cuando nada funciona' : 'When nothing works',
      icon: TriangleAlert,
      accent: 'coral',
    },
    {
      key: 'psychology',
      label: t('cheatSheetsPsychology'),
      hint: isEs ? 'Para leer en la pausa' : 'Read it on your break',
      icon: Lightbulb,
      accent: 'gold',
    },
  ];

  const sectionTitle: Record<Exclude<Section, 'home'>, string> = {
    said: isEs ? 'Han dicho…' : 'They said…',
    prices: t('cheatSheetsPriceLadder'),
    scripts: t('cheatSheetsScripts'),
    panic: tr(language, 'Emergency Cheat Sheet', 'Hoja de Emergencia'),
    psychology: t('cheatSheetsPsychology'),
  };

  const goHome = () => {
    setSection('home');
    setReason(null);
  };

  const selectedReason = reason ? WALK_REASONS.find((r) => r.id === reason) : undefined;

  return (
    <div className="min-h-full bg-background">
      <header className="px-5 pt-6">
        {section === 'home' ? (
          <>
            <div className="mb-1 flex items-center gap-2">
              <BookOpen size={22} className="text-teal-strong" />
              <h1 className="text-h1 text-ink">{t('cheatSheetsTitle')}</h1>
            </div>
            <p className="mb-4 text-body-small text-ink-2">{t('cheatSheetsSubtitle')}</p>
          </>
        ) : (
          <div className="mb-4 flex items-center gap-2">
            <button
              type="button"
              onClick={selectedReason ? () => setReason(null) : goHome}
              className="btn-icon shrink-0"
              aria-label={isEs ? 'Volver' : 'Back'}
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <h1 className="min-w-0 flex-1 truncate text-h2 text-ink">
              {selectedReason ? chipLabel(selectedReason, isEs) : sectionTitle[section]}
            </h1>
          </div>
        )}

        <div className="relative mb-5">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('cheatSheetsSearch')}
            aria-label={t('cheatSheetsSearch')}
            className="min-h-touch w-full rounded-full border border-line-strong bg-surface pl-11 pr-4 text-body text-ink placeholder:text-ink-3"
          />
        </div>
      </header>

      <div className="px-5">
        {/* ── Search results, cutting across every section ─────────────────── */}
        {searching && (
          <section>
            <p className="mb-3 text-caption text-ink-3">
              {hits.length === 1
                ? isEs
                  ? '1 resultado'
                  : '1 result'
                : isEs
                  ? `${hits.length} resultados`
                  : `${hits.length} results`}
            </p>
            <div className="space-y-2.5">
              {hits.map((h) => (
                <article
                  key={h.key}
                  className={`rounded-card border p-4 ${
                    h.tone === 'good'
                      ? 'border-success/40 bg-success-tint'
                      : h.tone === 'bad'
                        ? 'border-danger/40 bg-danger-tint'
                        : 'border-line bg-surface'
                  }`}
                >
                  <p
                    className={`text-overline ${
                      h.tone === 'good'
                        ? 'text-success'
                        : h.tone === 'bad'
                          ? 'text-danger'
                          : 'text-ink-3'
                    }`}
                  >
                    {h.badge}
                  </p>
                  {h.title && <h3 className="mb-1 mt-0.5 text-caption text-ink-2">{h.title}</h3>}
                  <Spoken text={h.body} />
                  {h.note && <p className="mt-1 text-caption text-ink-2">{h.note}</p>}
                </article>
              ))}
              {hits.length === 0 && (
                <p className="py-8 text-center text-body-small text-ink-2">
                  {t('cheatSheetsNoScripts')}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ── Landing: one screen, five targets ────────────────────────────── */}
        {!searching && section === 'home' && (
          <div className="grid grid-cols-2 gap-3">
            {tiles.map((tile) => (
              <motion.button
                key={tile.key}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setSection(tile.key)}
                className={`flex min-h-[104px] flex-col items-start justify-between rounded-card border border-line p-4 text-left ${
                  ACCENT[tile.accent].tint
                } ${tile.wide ? 'col-span-2' : ''}`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-chip bg-surface ${ACCENT[tile.accent].text}`}
                  aria-hidden="true"
                >
                  <tile.icon size={20} strokeWidth={2.2} />
                </span>
                <span className="mt-3">
                  <span className="block text-body font-semibold text-ink">{tile.label}</span>
                  <span className="mt-0.5 block text-caption text-ink-2">{tile.hint}</span>
                </span>
              </motion.button>
            ))}
          </div>
        )}

        {/* ── "They said…" ─────────────────────────────────────────────────── */}
        {!searching && section === 'said' && !selectedReason && (
          <div className="grid grid-cols-2 gap-2.5">
            {WALK_REASONS.filter((r) => r.id !== 'none').map((r) => (
              <motion.button
                key={r.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setReason(r.id)}
                className="min-h-[68px] rounded-card border border-line bg-surface p-3.5 text-left text-body font-semibold text-ink"
              >
                “{chipLabel(r, isEs)}”
              </motion.button>
            ))}
          </div>
        )}

        {!searching && section === 'said' && selectedReason && (
          <section className="space-y-2.5">
            {answersFor.lines.map((line) => (
              <article key={line.key} className="surface-flat p-4">
                {line.label && <p className="mb-1 text-overline text-ink-3">{line.label}</p>}
                <Spoken text={line.body} />
              </article>
            ))}

            {answersFor.lines.length === 0 && (
              <div className="rounded-card border border-line bg-surface-sunken p-4">
                <p className="text-body-small text-ink-2">
                  {isEs
                    ? 'Todavía no hay una frase escrita para esta objeción. La lección la explica entera.'
                    : 'No scripted line for this one yet. The lesson walks through the whole answer.'}
                </p>
              </div>
            )}

            {selectedReason.lessonId && (
              <button
                type="button"
                onClick={() => navigate(`/lesson/${selectedReason.lessonId}`)}
                className="flex min-h-touch w-full items-center justify-between rounded-card border border-teal bg-teal-tint px-4 py-3 text-left"
              >
                <span className="text-body font-semibold text-teal-strong">
                  {isEs ? 'Ver la lección completa' : 'Learn the full answer'}
                </span>
                <ArrowRight size={18} className="text-teal-strong" aria-hidden="true" />
              </button>
            )}
          </section>
        )}

        {/* ── Prices ───────────────────────────────────────────────────────── */}
        {!searching && section === 'prices' && (
          <section className="space-y-3">
            {PRODUCT_LADDERS.map((product) => (
              <CheatSheetLadder key={product.id} product={product} />
            ))}
          </section>
        )}

        {/* ── Scripts ──────────────────────────────────────────────────────── */}
        {!searching && section === 'scripts' && (
          <section>
            <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto">
              {Object.entries(categoryLabel).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setScriptFilter(key)}
                  aria-pressed={scriptFilter === key}
                  className={`min-h-touch shrink-0 rounded-full border px-4 text-caption ${
                    scriptFilter === key
                      ? 'border-violet bg-violet-tint text-violet-strong'
                      : 'border-line bg-surface text-ink-2'
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
                      key={s.id}
                      layout
                      className="surface-flat p-4"
                      transition={{ duration: 0.2 }}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                    >
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        {product && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-overline ${ACCENT[product.accent].tint} ${ACCENT[product.accent].text}`}
                          >
                            {tr(language, product.short, product.shortEs)}
                          </span>
                        )}
                        <span className="text-overline text-ink-3">{categoryLabel[s.category]}</span>
                      </div>
                      <h3 className="mb-1 text-caption text-ink-2">{s.name}</h3>
                      <Spoken text={s.body} />
                    </motion.article>
                  );
                })}
              </AnimatePresence>
              {scripts.length === 0 && (
                <p className="py-6 text-center text-body-small text-ink-2">
                  {t('cheatSheetsNoScripts')}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ── Panic ────────────────────────────────────────────────────────── */}
        {!searching && section === 'panic' && (
          <section className="space-y-3">
            {EMERGENCY_BLOCKS.map((block) => (
              <div
                key={block.key}
                className={`rounded-card border border-line p-4 ${ACCENT[block.accent].tint}`}
              >
                <p className={`text-overline ${ACCENT[block.accent].text}`}>
                  {tr(language, block.title, block.titleEs)}
                </p>
                <p className="mb-3 text-caption text-ink-2">{tr(language, block.hint, block.hintEs)}</p>
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

        {/* ── Psychology — study material, so every group starts closed ────── */}
        {!searching && section === 'psychology' && (
          <section className="space-y-2.5">
            <Collapsible
              title={t('cheatSheetsCialdini')}
              count={CIALDINI.length}
              icon={<Lightbulb size={18} className="shrink-0 text-gold-strong" aria-hidden="true" />}
            >
              <div className="space-y-3">
                {CIALDINI.map((p) => (
                  <div key={p.id}>
                    <h3 className="mb-1 text-h4 text-gold-strong">{tr(language, p.name, p.nameEs)}</h3>
                    <p className="mb-2 text-body-small text-ink-2">
                      {tr(language, p.description, p.descriptionEs)}
                    </p>
                    <div className="flex items-start gap-2">
                      <Zap size={16} className="mt-1 shrink-0 text-teal-strong" aria-hidden="true" />
                      <p className="flex-1 text-body text-ink">{sub(tr(language, p.apply, p.applyEs))}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Collapsible>

            <Collapsible
              title={t('cheatSheetsKeyPhrases')}
              count={PHRASES.length}
              icon={<MessageCircle size={18} className="shrink-0 text-teal-strong" aria-hidden="true" />}
            >
              <div className="space-y-2">
                {PHRASES.map((p) => (
                  <div
                    key={p.id}
                    className={`rounded-card border p-3.5 ${
                      p.type === 'good'
                        ? 'border-success/40 bg-success-tint'
                        : 'border-danger/40 bg-danger-tint'
                    }`}
                  >
                    <div className="mb-1.5 flex items-center gap-2">
                      {p.type === 'good' ? (
                        <ThumbsUp size={16} className="text-success" aria-hidden="true" />
                      ) : (
                        <XCircle size={16} className="text-danger" aria-hidden="true" />
                      )}
                      <p
                        className={`text-overline ${p.type === 'good' ? 'text-success' : 'text-danger'}`}
                      >
                        {p.type === 'good' ? t('cheatSheetsSayThis') : t('cheatSheetsAvoidThis')}
                      </p>
                    </div>
                    <Spoken text={sub(tr(language, p.text, p.textEs))} />
                    <p className="mt-1 text-caption text-ink-2">{sub(tr(language, p.reason, p.reasonEs))}</p>
                  </div>
                ))}
              </div>
            </Collapsible>

            {tipLists.map((list) => (
              <Collapsible
                key={list.key}
                title={list.title}
                count={list.items.length}
                icon={
                  <span className={`shrink-0 ${ACCENT[list.accent].text}`} aria-hidden="true">
                    {list.icon}
                  </span>
                }
              >
                <ul className="space-y-3">
                  {list.items.map((item) => (
                    <li key={item.id} className="flex items-start gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-chip ${ACCENT[list.accent].tint} ${ACCENT[list.accent].text}`}
                        aria-hidden="true"
                      >
                        {list.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-body-small font-semibold text-ink">
                          {tr(language, item.term, item.termEs)}
                        </p>
                        <p className="mt-0.5 text-caption text-ink-2">
                          {tr(language, item.meaning, item.meaningEs)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Collapsible>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DemoLogModal — writing up a demo that did not sell.
//
// ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
// The journal already knew that somebody walked and roughly what they said on
// the way out. It knew nothing about the two minutes before that, which is the
// only part a seller can actually change. The owner's answer to "how do we turn
// the journal into a coach" was that it needs data, and specifically this data:
// what was on the table, how far down the ladder it went, what was given away,
// and which step of the demo went wrong.
//
// ── WHAT IT MUST NOT BECOME ─────────────────────────────────────────────────
// A form. Every field here is optional, nothing blocks, and the sheet is only
// ever OFFERED — the two-tap close still closes an encounter on its own and
// always will.
//
//   "I'm not gonna turn this into a POS system... this is not for everybody,
//    but whoever wants to do it, whoever wants to improve, this is a nice tool
//    for them."
//
// So: four rows of chips and a note, all skippable, and a Save that is happy
// with one answer. Nobody is made to explain themselves to their own phone.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NotebookPen, X } from 'lucide-react';
import BottomSheet from './BottomSheet';
import { haptic } from '../utils/haptics';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import { ladderRungAmounts } from '../data/pricing';
import { DEMO_STEPS, GIFTS, chipLabel } from '../data/encounterChips';
import { PRODUCTS, DEMO_LOG_XP } from '../types/streetTracker';
import type { DemoLog } from '../types/streetTracker';

const COPY = {
  en: {
    title: 'What happened?',
    lead: 'Nobody sees this but you. Answer what you want and get back out.',
    product: 'What were you demoing?',
    lowest: 'Lowest price you said out loud',
    noPrice: 'Never got to a price',
    lostAt: 'Where did you lose them?',
    gifts: 'Anything on the table?',
    noGift: 'No gift',
    note: 'Note (optional)',
    notePlaceholder: 'Husband was on the phone the whole time…',
    close: 'Close',
    skip: 'Not now',
    save: 'Save',
    saveXP: (n: number) => `+${n} XP`,
  },
  es: {
    title: '¿Qué ha pasado?',
    lead: 'Esto no lo ve nadie más que tú. Contesta lo que quieras y vuelve a la calle.',
    product: '¿Qué estabas demostrando?',
    lowest: 'El precio más bajo que dijiste en voz alta',
    noPrice: 'No llegué a decir un precio',
    lostAt: '¿Dónde los perdiste?',
    gifts: '¿Pusiste algo encima de la mesa?',
    noGift: 'Sin regalo',
    note: 'Nota (opcional)',
    notePlaceholder: 'El marido estuvo todo el rato al teléfono…',
    close: 'Cerrar',
    skip: 'Ahora no',
    save: 'Guardar',
    saveXP: (n: number) => `+${n} XP`,
  },
};

/** "Multiple" is a receipt, not a demo — you demonstrate one thing at a time. */
const DEMO_PRODUCTS = PRODUCTS.filter((p) => p.id !== 'multiple');

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (demo: Omit<DemoLog, 'loggedAt'>) => void;
  /** An existing log, when the seller is coming back to change an answer. */
  existing?: DemoLog;
}

const Chip: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <motion.button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    whileTap={{ scale: 0.95 }}
    className={`min-h-touch rounded-chip border px-3 py-2 text-caption transition-colors ${
      active
        ? 'border-teal bg-teal-tint font-semibold text-teal-strong'
        : 'border-line-strong bg-surface text-ink'
    }`}
  >
    {children}
  </motion.button>
);

const DemoForm: React.FC<Omit<Props, 'isOpen'>> = ({ onClose, onSubmit, existing }) => {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const t = COPY[isEs ? 'es' : 'en'];
  const { price } = useCurrency();

  const [productId, setProductId] = useState(existing?.productId ?? '');
  /* `null` is a real answer here — "I never got to a price" — and it is a
     different fact from "I have not said". Hence the third state. */
  const [lowestOffer, setLowestOffer] = useState<number | undefined>(existing?.lowestOffer ?? undefined);
  const [noPrice, setNoPrice] = useState(existing?.lowestOffer === null);
  const [lostAt, setLostAt] = useState(existing?.lostAt ?? '');
  const [gifts, setGifts] = useState<string[]>(existing?.gifts ?? []);
  const [noGift, setNoGift] = useState(existing?.gifts?.length === 0);
  const [note, setNote] = useState(existing?.note ?? '');

  const rungs = ladderRungAmounts(productId);

  const pickProduct = (id: string) => {
    haptic('light');
    setProductId(id === productId ? '' : id);
    /* A rung from the syringe ladder means nothing against the nail kit. */
    setLowestOffer(undefined);
    setNoPrice(false);
  };

  const toggleGift = (id: string) => {
    haptic('light');
    setNoGift(false);
    setGifts((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  };

  /* One answer is enough. The seller who taps a single chip and leaves has
     still told the coach more than the till ever could. */
  const isValid =
    productId !== '' || lostAt !== '' || lowestOffer !== undefined || noPrice || note.trim() !== '';

  const save = () => {
    if (!isValid) return;
    haptic('medium');
    onSubmit({
      productId: productId || undefined,
      /* null is a real answer — "I never got to a price" — and the coach reads
         it as its own diagnosis. undefined stays "not answered". */
      lowestOffer: noPrice ? null : (lowestOffer ?? undefined),
      lostAt: lostAt || undefined,
      gifts: noGift ? [] : gifts.length ? gifts : undefined,
      note: note.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="px-5 pb-8 pt-2">
      <div className="mb-1 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal text-on-teal">
          <NotebookPen className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="flex-1 text-h3 text-ink">{t.title}</h2>
        <button type="button" onClick={onClose} className="btn-icon shrink-0" aria-label={t.close}>
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <p className="mb-5 text-caption text-ink-2">{t.lead}</p>

      {/* What was on the table */}
      <p className="mb-2 text-overline text-ink-3">{t.product}</p>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {DEMO_PRODUCTS.map((p) => (
          <Chip key={p.id} active={productId === p.id} onClick={() => pickProduct(p.id)}>
            {isEs ? p.nameEs : p.name}
          </Chip>
        ))}
      </div>

      {/* How far down the ladder it went. The most diagnostic number here:
          losing her at the top and losing her at the floor are two different
          problems, and never naming a price at all is a third. */}
      {rungs.length > 0 && (
        <>
          <p className="mb-2 text-overline text-ink-3">{t.lowest}</p>
          <div className="mb-5 flex flex-wrap gap-1.5">
            {rungs.map((rung) => (
              <Chip
                key={rung}
                active={!noPrice && lowestOffer === rung}
                onClick={() => {
                  haptic('light');
                  setNoPrice(false);
                  setLowestOffer(lowestOffer === rung ? undefined : rung);
                }}
              >
                <span className="font-semibold tabular-nums">{price(rung)}</span>
              </Chip>
            ))}
            <Chip
              active={noPrice}
              onClick={() => {
                haptic('light');
                setNoPrice((v) => !v);
                setLowestOffer(undefined);
              }}
            >
              {t.noPrice}
            </Chip>
          </div>
        </>
      )}

      {/* Where it went wrong */}
      <p className="mb-2 text-overline text-ink-3">{t.lostAt}</p>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {DEMO_STEPS.map((step) => (
          <Chip
            key={step.id}
            active={lostAt === step.id}
            onClick={() => {
              haptic('light');
              setLostAt(lostAt === step.id ? '' : step.id);
            }}
          >
            {chipLabel(step, isEs)}
          </Chip>
        ))}
      </div>

      {/* Gifts. Multi-select, because more than one thing goes on the table. */}
      <p className="mb-2 text-overline text-ink-3">{t.gifts}</p>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {GIFTS.map((g) => (
          <Chip key={g.id} active={!noGift && gifts.includes(g.id)} onClick={() => toggleGift(g.id)}>
            {chipLabel(g, isEs)}
          </Chip>
        ))}
        <Chip
          active={noGift}
          onClick={() => {
            haptic('light');
            setNoGift((v) => !v);
            setGifts([]);
          }}
        >
          {t.noGift}
        </Chip>
      </div>

      <label htmlFor="demo-note" className="mb-2 block text-overline text-ink-3">
        {t.note}
      </label>
      <input
        id="demo-note"
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={t.notePlaceholder}
        className="mb-6 h-14 w-full rounded-card border border-line-strong bg-surface-sunken px-4 text-body-small text-ink placeholder:text-ink-3"
      />

      <div className="flex gap-3">
        {/* Full weight, never a guilt trip — the same rule the walk-away chips
            follow. A seller who feels nagged taps the same chip every time. */}
        <button type="button" onClick={onClose} className="btn-quiet flex-1">
          {t.skip}
        </button>
        <button
          type="button"
          onClick={save}
          disabled={!isValid}
          className={`flex-1 ${isValid ? 'btn-primary' : 'btn-quiet cursor-not-allowed opacity-60'}`}
        >
          <span>{t.save}</span>
          {/* Nothing is promised for an edit — see logDemo(). Showing the badge
              only on a first write keeps the button honest. */}
          {!existing && <span className="text-caption opacity-80">{t.saveXP(DEMO_LOG_XP)}</span>}
        </button>
      </div>
    </div>
  );
};

const DemoLogModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, existing }) => {
  const { language } = useLanguage();
  const t = COPY[language === 'es' ? 'es' : 'en'];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} label={t.title}>
      <DemoForm onClose={onClose} onSubmit={onSubmit} existing={existing} />
    </BottomSheet>
  );
};

export default DemoLogModal;

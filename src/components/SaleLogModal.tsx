// ─────────────────────────────────────────────────────────────────────────────
// SaleLogModal — the sheet that records what a customer actually paid.
//
// ── WHAT WAS WRONG ──────────────────────────────────────────────────────────
// Picking a product pre-filled its BASE price and dropped the seller into a
// number field. Tap "Syringe" and the amount read 300 — but the whole method is
// the ladder walking 300 → 210 → 175 → 140 → 100, and the owner's own voucher
// scene ends at 140. So every laddered sale (which is most of them) needed the
// field cleared and re-typed one-handed, standing up, often with the customer
// still at the counter. Anyone who did not bother re-typing booked 300 for a
// 140 sale, and that number is what the manager dashboard reports as revenue.
//
// ── WHAT THIS IS NOW ────────────────────────────────────────────────────────
// Picking a product offers ITS OWN ladder rungs as one-tap chips, straight out
// of src/data/pricing.ts — the same numbers the cheat sheet teaches, so the
// price a seller walked down to is always one of the buttons in front of them.
// Nothing is pre-filled: a wrong number that is already sitting in the box gets
// saved, an empty one gets looked at.
//
// "Other" is still there for the odd amount (a bundle, a haggle, "Multiple"),
// and it is the only path that opens a keyboard.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, X } from 'lucide-react';
import { celebrateSaleLogged } from '../utils/confetti';
import { haptic } from '../utils/haptics';
import { saleXp } from '../types/streetTracker';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import { PRODUCTS } from '../types/streetTracker';
import { LADDERS, type ProductId } from '../data/pricing';

interface SaleLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productId: string, amount: number, note: string) => void;
}

// `amount` takes the shop's own symbol — this used to read "Amount (€)" and
// "Importe (€)" for everybody, including the Gibraltar team who take pounds.
const COPY = {
  en: {
    title: 'Log a sale',
    selectProduct: 'Product',
    paid: 'What did they pay?',
    other: 'Other',
    amount: (c: string) => `Amount (${c})`,
    note: 'Note (optional)',
    notePlaceholder: 'Hesitant at first, then loved the demo…',
    cancel: 'Cancel',
    close: 'Close',
    // Not "Log sale": the nav pill already has a control with that exact
    // accessible name, and two identical names on screen is a screen-reader trap.
    submit: 'Save sale',
    submitXP: (n: number) => `+${n} XP`,
  },
  es: {
    title: 'Registrar venta',
    selectProduct: 'Producto',
    paid: '¿Cuánto ha pagado?',
    other: 'Otro',
    amount: (c: string) => `Importe (${c})`,
    note: 'Nota (opcional)',
    notePlaceholder: 'Dudaba al principio, luego le encantó la demo…',
    cancel: 'Cancelar',
    close: 'Cerrar',
    submit: 'Guardar venta',
    submitXP: (n: number) => `+${n} XP`,
  },
};

/**
 * Every price this product is really sold at, highest first.
 *
 * The base price plus every rung of its ladder, de-duplicated on the AMOUNT —
 * the syringe's "two for 300" and its plain 300 are two different offers but
 * one number, and a money field only cares about the number. The Europe anchor
 * is deliberately absent: it is the strike-through we quote, never a price
 * anybody pays.
 *
 * "Multiple" has no ladder of its own, so it gets no chips and goes straight to
 * the manual field — which is exactly what it is for.
 */
function ladderRungAmounts(productId: string): number[] {
  if (!(productId in LADDERS)) return [];
  const ladder = LADDERS[productId as ProductId];
  const amounts = new Set<number>([ladder.base, ladder.floor, ...ladder.steps.map((s) => s.price)]);
  return [...amounts].sort((a, b) => b - a);
}

/**
 * The form lives in its own component so it is MOUNTED only while the sheet is
 * open. Fields therefore start empty every time, with no "reset everything in
 * an effect when isOpen flips" — which is a cascading render, and was one of
 * two effects here doing work that belongs in an event handler.
 */
const SaleForm: React.FC<{
  onClose: () => void;
  onSubmit: (productId: string, amount: number, note: string) => void;
}> = ({ onClose, onSubmit }) => {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const t = COPY[isEs ? 'es' : 'en'];
  const { currency, price } = useCurrency();

  const [selectedProduct, setSelectedProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  /* The manual field is opened by hand, never by default. A number field that
     is already on screen is an invitation to type, and typing one-handed on a
     shop floor is the thing this sheet exists to avoid. */
  const [manual, setManual] = useState(false);

  const rungs = useMemo(() => ladderRungAmounts(selectedProduct), [selectedProduct]);

  /* Picking a product is an event, not a synchronisation, so it belongs here
     rather than in an effect. It no longer pre-fills anything: the old
     behaviour put the BASE price in the box for a sale that almost always
     closed lower down the ladder, and a wrong number already in the box is a
     number that gets saved. A product with no ladder ("Multiple") opens the
     manual field straight away, because there is nothing to tap instead. */
  const selectProduct = (id: string) => {
    setSelectedProduct(id);
    setAmount('');
    setManual(ladderRungAmounts(id).length === 0);
  };

  const chooseRung = (value: number) => {
    haptic('light');
    setAmount(String(value));
    setManual(false);
  };

  const numAmount = parseFloat(amount);
  const isValid = selectedProduct !== '' && Number.isFinite(numAmount) && numAmount > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(selectedProduct, numAmount, note.trim());
    haptic('heavy');
    celebrateSaleLogged();
    onClose();
  };

  return (
    <div className="px-5 pb-8 pt-2">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-on-gold">
          <Coins className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="flex-1 text-h3 text-ink">{t.title}</h2>
        <button type="button" onClick={onClose} className="btn-icon shrink-0" aria-label={t.close}>
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Products */}
      <p className="mb-2 text-overline text-ink-3">{t.selectProduct}</p>
      <div className="mb-5 grid grid-cols-3 gap-2">
        {PRODUCTS.map((product) => {
          const active = selectedProduct === product.id;
          return (
            <motion.button
              key={product.id}
              type="button"
              aria-pressed={active}
              onClick={() => selectProduct(product.id)}
              whileTap={{ scale: 0.96 }}
              className={`flex min-h-touch flex-col items-center justify-center rounded-card border px-2 py-3 transition-colors ${
                active ? 'border-teal bg-teal-tint' : 'border-line bg-surface-sunken'
              }`}
            >
              <span className={`text-caption font-bold ${active ? 'text-teal-strong' : 'text-ink'}`}>
                {isEs ? product.nameEs : product.name}
              </span>
              {product.price > 0 && (
                <span className="mt-0.5 text-caption text-ink-2">{price(product.price)}</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ── Amount ──
          Chips first, keyboard only on request. The rungs come from the
          product's own ladder, so the number a seller walked down to during the
          demo is already a button by the time they get here. */}
      {selectedProduct !== '' && (
        <>
          <p className="mb-2 text-overline text-ink-3">{rungs.length > 0 ? t.paid : t.amount(currency)}</p>
          {rungs.length > 0 && (
            <div className={`flex flex-wrap gap-2 ${manual ? 'mb-3' : 'mb-5'}`}>
              {rungs.map((rung) => {
                const active = !manual && amount === String(rung);
                return (
                  <motion.button
                    key={rung}
                    type="button"
                    aria-pressed={active}
                    onClick={() => chooseRung(rung)}
                    whileTap={{ scale: 0.94 }}
                    className={`min-h-touch min-w-[4.5rem] rounded-card border px-4 text-h4 font-semibold tabular-nums transition-colors ${
                      active
                        ? 'border-teal bg-teal-tint text-teal-strong'
                        : 'border-line-strong bg-surface-sunken text-ink'
                    }`}
                  >
                    {price(rung)}
                  </motion.button>
                );
              })}
              {/* The odd amount — a haggle, a bundle, a rounded-up total. */}
              <motion.button
                type="button"
                aria-pressed={manual}
                onClick={() => {
                  haptic('light');
                  setManual(true);
                  setAmount('');
                }}
                whileTap={{ scale: 0.94 }}
                className={`min-h-touch rounded-card border px-4 text-body font-semibold transition-colors ${
                  manual
                    ? 'border-teal bg-teal-tint text-teal-strong'
                    : 'border-line bg-surface text-ink-2'
                }`}
              >
                {t.other}
              </motion.button>
            </div>
          )}

          {manual && (
            <div className="relative mb-5">
              <label htmlFor="sale-amount" className="sr-only">
                {t.amount(currency)}
              </label>
              <span
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-h4 text-ink-2"
                aria-hidden="true"
              >
                {currency}
              </span>
              <input
                id="sale-amount"
                type="number"
                inputMode="decimal"
                min={0}
                autoFocus
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="h-14 w-full rounded-card border border-line-strong bg-surface-sunken pl-10 pr-4 text-h4 font-semibold text-ink placeholder:text-ink-3"
              />
            </div>
          )}
        </>
      )}

      {/* Note */}
      <label htmlFor="sale-note" className="mb-2 block text-overline text-ink-3">
        {t.note}
      </label>
      <input
        id="sale-note"
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={t.notePlaceholder}
        className="mb-6 h-14 w-full rounded-card border border-line-strong bg-surface-sunken px-4 text-body-small text-ink placeholder:text-ink-3"
      />

      {/* Actions */}
      <div className="flex gap-3">
        <button type="button" onClick={onClose} className="btn-quiet flex-1">
          {t.cancel}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className={`flex-1 ${isValid ? 'btn-primary' : 'btn-quiet cursor-not-allowed opacity-60'}`}
        >
          <span>{t.submit}</span>
          {/* The real number for THIS product. A sale is no longer one flat
              rate, and a Save button promising +60 for a {currency}30 nail kit
              is the same lie the docked buttons used to tell. */}
          <span className="text-caption opacity-80">{t.submitXP(saleXp(selectedProduct))}</span>
        </button>
      </div>
    </div>
  );
};

const SaleLogModal: React.FC<SaleLogModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { language } = useLanguage();
  const t = COPY[language === 'es' ? 'es' : 'en'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={t.title}
        >
          <motion.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative max-h-[88vh] w-full max-w-app overflow-y-auto rounded-t-feature border border-line bg-surface shadow-feature"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div className="flex justify-center pb-1 pt-3">
              <div className="h-1 w-10 rounded-full bg-line-strong/50" />
            </div>

            <SaleForm onClose={onClose} onSubmit={onSubmit} />

            {/* Clears the iPhone home bar without fighting the padding above. */}
            <div className="pb-safe" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SaleLogModal;

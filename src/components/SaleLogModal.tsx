import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, X } from 'lucide-react';
import { celebrateSaleLogged } from '../utils/confetti';
import { haptic } from '../utils/haptics';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import { PRODUCTS } from '../types/streetTracker';

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
    amount: (c: string) => `Amount (${c})`,
    note: 'Note (optional)',
    notePlaceholder: 'Hesitant at first, then loved the demo…',
    cancel: 'Cancel',
    close: 'Close',
    // Not "Log sale": the nav pill already has a control with that exact
    // accessible name, and two identical names on screen is a screen-reader trap.
    submit: 'Save sale',
    submitXP: '+10 XP',
  },
  es: {
    title: 'Registrar venta',
    selectProduct: 'Producto',
    amount: (c: string) => `Importe (${c})`,
    note: 'Nota (opcional)',
    notePlaceholder: 'Dudaba al principio, luego le encantó la demo…',
    cancel: 'Cancelar',
    close: 'Cerrar',
    submit: 'Guardar venta',
    submitXP: '+10 XP',
  },
};

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

  // Picking a product pre-fills its list price. This is an event, not a
  // synchronisation, so it belongs here rather than in an effect.
  const selectProduct = (id: string) => {
    setSelectedProduct(id);
    const product = PRODUCTS.find((p) => p.id === id);
    setAmount(product && product.price > 0 ? String(product.price) : '');
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

      {/* Amount */}
      <label htmlFor="sale-amount" className="mb-2 block text-overline text-ink-3">
        {t.amount(currency)}
      </label>
      <div className="relative mb-4">
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
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className="h-14 w-full rounded-card border border-line-strong bg-surface-sunken pl-10 pr-4 text-h4 font-semibold text-ink placeholder:text-ink-3"
        />
      </div>

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
          <span className="text-caption opacity-80">{t.submitXP}</span>
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

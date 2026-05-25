import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { celebrateSaleLogged } from '../utils/confetti';
import { haptic } from '../utils/haptics';
import { PRODUCTS } from '../types/streetTracker';

interface SaleLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productId: string, amount: number, note: string) => void;
  lang: 'en' | 'es';
}

const t = {
  en: {
    title: 'Log a Sale',
    selectProduct: 'Select Product',
    amount: 'Amount (€)',
    note: 'Note (optional)',
    notePlaceholder: 'Customer was hesitant but loved the demo!',
    cancel: 'Cancel',
    submit: 'Log Sale',
    submitXP: '+10 XP',
  },
  es: {
    title: 'Registrar Venta',
    selectProduct: 'Seleccionar Producto',
    amount: 'Importe (€)',
    note: 'Nota (opcional)',
    notePlaceholder: 'El cliente dudaba pero le encantó la demo!',
    cancel: 'Cancelar',
    submit: 'Registrar Venta',
    submitXP: '+10 XP',
  },
};

const SaleLogModal: React.FC<SaleLogModalProps> = ({ isOpen, onClose, onSubmit, lang }) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const txt = t[lang];

  useEffect(() => {
    if (isOpen) {
      setSelectedProduct('');
      setAmount('');
      setNote('');
    }
  }, [isOpen]);

  useEffect(() => {
    const product = PRODUCTS.find((p) => p.id === selectedProduct);
    if (product && product.price > 0) {
      setAmount(String(product.price));
    } else if (selectedProduct === 'multiple') {
      setAmount('');
    }
  }, [selectedProduct]);

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (!selectedProduct || isNaN(numAmount) || numAmount <= 0) return;
    onSubmit(selectedProduct, numAmount, note.trim());

    // Big celebration for a sale!
    haptic('heavy');
    celebrateSaleLogged();

    onClose();
  };

  const isValid = selectedProduct && parseFloat(amount) > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-[430px] bg-[#141414] rounded-t-3xl border-t border-[#0ABAB5]/30 shadow-[0_-8px_40px_rgba(10,186,181,0.15)] max-h-[85vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-700" />
            </div>

            <div className="px-5 pb-8 pt-2">
              {/* Title */}
              <h2 className="text-xl font-bold text-white text-center mb-5">
                {txt.title}
              </h2>

              {/* Product Grid */}
              <div className="mb-5">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  {txt.selectProduct}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {PRODUCTS.map((product) => (
                    <motion.button
                      key={product.id}
                      onClick={() => setSelectedProduct(product.id)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 transition-colors ${
                        selectedProduct === product.id
                          ? 'border-[#0ABAB5] bg-[#0ABAB5]/15'
                          : 'border-gray-800 bg-[#1A1A1A]'
                      }`}
                    >
                      <span className="text-sm font-bold text-white">
                        {lang === 'es' ? product.nameEs : product.name}
                      </span>
                      {product.price > 0 && (
                        <span className="text-[11px] text-[#0ABAB5] mt-0.5">
                          €{product.price}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  {txt.amount}
                </p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    €
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full h-14 bg-[#1A1A1A] border border-gray-800 rounded-xl pl-10 pr-4 text-white text-lg font-semibold placeholder-gray-600 focus:outline-none focus:border-[#0ABAB5] focus:ring-1 focus:ring-[#0ABAB5]/30 transition-all"
                  />
                </div>
              </div>

              {/* Note Input */}
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  {txt.note}
                </p>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={txt.notePlaceholder}
                  className="w-full h-14 bg-[#1A1A1A] border border-gray-800 rounded-xl px-4 text-white text-base placeholder-gray-600 focus:outline-none focus:border-[#0ABAB5] focus:ring-1 focus:ring-[#0ABAB5]/30 transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 h-14 rounded-xl bg-gray-800 text-gray-300 font-semibold text-base"
                >
                  {txt.cancel}
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  whileTap={{ scale: 0.97 }}
                  disabled={!isValid}
                  className={`flex-1 h-14 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
                    isValid
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <span>{txt.submit}</span>
                  <span className="text-sm opacity-80">({txt.submitXP})</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SaleLogModal;

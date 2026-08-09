// ─────────────────────────────────────────────────────────────────────────────
// CopyButton — copies a script to the clipboard so a seller can paste it into
// WhatsApp mid-shift. Extracted from CheatSheetsPage.
//
// It used to be a 14px icon with a `title` attribute and no accessible name.
// Now: a 44px target, a real aria-label, and a visible + announced
// confirmation, because a seller holding a phone one-handed needs to see that
// the tap landed.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function CopyButton({ text }: { text: string }) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API needs a secure context; the kiosk tablets are not always on one.
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }, [text]);

  const label = copied
    ? language === 'es'
      ? 'Copiado'
      : 'Copied'
    : language === 'es'
      ? 'Copiar al portapapeles'
      : 'Copy to clipboard';

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      className={`shrink-0 min-h-touch min-w-touch px-2 rounded-full inline-flex items-center justify-center gap-1.5 border transition-colors ${
        copied
          ? 'bg-teal-tint text-teal-strong border-teal/40'
          : 'bg-surface-sunken text-ink-2 border-line'
      }`}
    >
      {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      <span className="text-caption" aria-live="polite">
        {copied ? (language === 'es' ? '¡Copiado!' : 'Copied!') : ''}
      </span>
    </button>
  );
}

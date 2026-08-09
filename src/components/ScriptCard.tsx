// ─────────────────────────────────────────────────────────────────────────────
// ScriptCard — the words a seller actually says, ready to copy.
//
// Two versions of this component existed: this one (a `lines[]` API nothing
// imported) and a private copy inside LessonView. This is now the only one, and
// it takes the plain string the lesson data actually holds.
//
// Copy falls back to execCommand because the shop tablets are not always on a
// secure origin, where navigator.clipboard silently throws.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, MessageSquareText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ScriptCardProps {
  /** The script, exactly as it should be spoken. Newlines are preserved. */
  text: string;
  /** Overrides the default "SCRIPT" eyebrow. */
  title?: string;
}

export default function ScriptCard({ text, title }: ScriptCardProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
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
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }, [text]);

  // 'Script:' / 'Guión:' — the trailing colon reads badly inside an eyebrow.
  const label = title ?? t('lessonScriptLabel').replace(/:\s*$/, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px 200px 0px' }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
      className="-mx-2 my-7 overflow-hidden rounded-card border border-line bg-surface-sunken"
    >
      <div className="flex items-center justify-between gap-2 border-b border-line pl-4 pr-1">
        <span className="inline-flex items-center gap-2 text-overline text-teal-strong">
          <MessageSquareText size={15} aria-hidden="true" />
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? t('lessonCopied') : t('lessonCopy')}
          className="inline-flex min-h-touch min-w-touch items-center justify-center gap-1.5 rounded-full px-3 text-caption text-ink-2 transition-transform active:scale-95"
        >
          {copied ? (
            <Check size={16} className="text-teal-strong" aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
          <span aria-live="polite" className={copied ? 'text-teal-strong' : undefined}>
            {copied ? t('lessonCopied') : t('lessonCopy')}
          </span>
        </button>
      </div>

      <p className="whitespace-pre-wrap px-4 py-4 text-body-small text-ink">{text}</p>
    </motion.div>
  );
}

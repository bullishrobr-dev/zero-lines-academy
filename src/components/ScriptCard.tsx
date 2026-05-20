import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, MessageSquareText } from 'lucide-react';

interface ScriptLine {
  text: string;
  isStageDirection?: boolean;
  isHighlight?: boolean;
}

interface ScriptCardProps {
  lines: ScriptLine[];
  title?: string;
  className?: string;
}

export default function ScriptCard({ lines, title = 'PITCH SCRIPT', className = '' }: ScriptCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    const text = lines.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [lines]);

  return (
    <motion.div
      className={`bg-[#1A1A1A] rounded-xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <MessageSquareText size={16} className="text-[#0ABAB5]" />
          <span className="text-overline text-[#0ABAB5]">{title}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A2A2A] text-[#8A8A8A] hover:text-white hover:bg-[#3A3A3A] transition-colors active:scale-95"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Check size={14} className="text-[#22C55E]" />
                <span className="text-caption text-[#22C55E]">Copied</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Copy size={14} />
                <span className="text-caption">Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Script lines */}
      <div className="p-5 space-y-3">
        {lines.map((line, i) => {
          if (line.isHighlight) {
            return (
              <motion.div
                key={i}
                className="bg-[#0ABAB5]/10 rounded-lg px-4 py-3 border-l-2 border-[#0ABAB5]"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <p className="text-body text-white">{line.text}</p>
              </motion.div>
            );
          }
          if (line.isStageDirection) {
            return (
              <motion.p
                key={i}
                className="text-body-small italic text-[#8A8A8A] pl-3 border-l border-[#4A4A4A]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {line.text}
              </motion.p>
            );
          }
          return (
            <motion.p
              key={i}
              className="text-body text-white leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              &ldquo;{line.text}&rdquo;
            </motion.p>
          );
        })}
      </div>
    </motion.div>
  );
}

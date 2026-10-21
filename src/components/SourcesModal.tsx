import React, { useEffect } from 'react';
import { X, BookCheck, ExternalLink, ShieldCheck } from 'lucide-react';
import { MEDICAL_SOURCES } from '../data/sources';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-surface rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-line-soft max-h-[85vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sources-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-fg-5 hover:text-fg-2 hover:bg-surface-3 transition cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-400/10 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
            <BookCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 id="sources-modal-title" className="text-xl font-bold text-fg">
              Medical Sources & References
            </h3>
            <p className="text-xs text-fg-4">
              Evidence-based citations supporting health statistics and educational claims
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-surface-2 border border-line/80 rounded-xl mb-6 text-xs text-fg-3 leading-relaxed">
          MyGlucoGuide references recognized international and regional clinical organizations to ground educational materials in peer-reviewed scientific consensus.
        </div>

        <div className="space-y-4">
          {MEDICAL_SOURCES.map((src) => (
            <div
              key={src.id}
              className="p-4 rounded-xl border border-line bg-surface hover:border-sky-300 dark:hover:border-sky-400/40 transition"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-sky-800 dark:text-sky-100 uppercase tracking-wider">
                  {src.topic}
                </span>
                <span className="text-[11px] text-fg-5 font-mono">{src.year}</span>
              </div>
              <p className="text-xs font-semibold text-fg mb-2 leading-snug">
                {src.claimOrContext}
              </p>
              <div className="p-2.5 rounded-lg bg-surface-2 border border-line-soft text-[11px] text-fg-3 leading-relaxed font-sans">
                <span className="font-semibold text-fg-2">{src.organization}:</span>{' '}
                {src.citation}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-line-soft flex items-center justify-between text-xs text-fg-4">
          <span>Updated for 2026 educational guidelines</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-700 dark:hover:bg-sky-600 text-white font-semibold transition cursor-pointer"
          >
            Close References
          </button>
        </div>
      </div>
    </div>
  );
};

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
        className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sources-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
            <BookCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 id="sources-modal-title" className="text-xl font-bold text-slate-900">
              Medical Sources & References
            </h3>
            <p className="text-xs text-slate-500">
              Evidence-based citations supporting health statistics and educational claims
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl mb-6 text-xs text-slate-600 leading-relaxed">
          MyGlucoGuide references recognized international and regional clinical organizations to ground educational materials in peer-reviewed scientific consensus.
        </div>

        <div className="space-y-4">
          {MEDICAL_SOURCES.map((src) => (
            <div
              key={src.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                  {src.topic}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{src.year}</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 mb-2 leading-snug">
                {src.claimOrContext}
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed font-sans">
                <span className="font-semibold text-slate-700">{src.organization}:</span>{' '}
                {src.citation}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Updated for 2026 educational guidelines</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition cursor-pointer"
          >
            Close References
          </button>
        </div>
      </div>
    </div>
  );
};

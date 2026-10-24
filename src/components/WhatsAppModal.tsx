import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { trackWhatsAppClick } from '../services/analytics';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceContext?: string;
  currentPage?: string;
}

const PRESET_MESSAGES = [
  {
    id: 'cgm',
    title: 'CGM Sensor Inquiries',
    description: 'Ask about sensor options, compatibility, and availability in Pakistan.',
    message: 'Assalam-o-Alaikum, I am inquiring about Continuous Glucose Monitoring (CGM) sensors and their availability in Pakistan.'
  },
  {
    id: 'education',
    title: 'Diabetes Education Guidance',
    description: 'Questions about meal curves, HbA1c, or daily glucose patterns.',
    message: 'Hello MyGlucoGuide, I would like educational information regarding glucose patterns and post-meal curves for Pakistani meals.'
  },
  {
    id: 'family',
    title: 'Caregiver / Family Support',
    description: 'Guidance for supporting parents or family members living with diabetes.',
    message: 'Assalam-o-Alaikum, I am looking for advice on how to better monitor glucose levels for an elderly family member.'
  },
  {
    id: 'general',
    title: 'General Question',
    description: 'Ask any other health education or platform question.',
    message: 'Hello MyGlucoGuide team, I have a question regarding glucose awareness.'
  }
];

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  sourceContext = 'general',
  currentPage = 'home'
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('cgm');
  const [customText, setCustomText] = useState<string>(
    PRESET_MESSAGES[0].message
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectPreset = (id: string, message: string) => {
    setSelectedPreset(id);
    setCustomText(message);
  };

  // MyGlucoGuide's confirmed business WhatsApp number; env override remains available.
  const configuredNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '923083280568').trim();
  const isNumberConfigured = /^\d{8,15}$/.test(configuredNumber);

  const handleLaunchWhatsApp = () => {
    if (!isNumberConfigured) {
      console.error(
        'MyGlucoGuide: VITE_WHATSAPP_NUMBER is not configured. Set it in your environment before deploying.'
      );
      return;
    }

    const encodedText = encodeURIComponent(customText);
    const whatsappUrl = `https://wa.me/${configuredNumber}?text=${encodedText}`;

    trackWhatsAppClick({
      sourceLocation: sourceContext,
      page: currentPage,
      ctaIdentifier: 'whatsapp_modal_send_btn',
      additionalParams: {
        preset: selectedPreset,
        message_length: customText.length,
      },
    });

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-surface rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-line-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-fg-5 hover:text-fg-2 hover:bg-surface-3 transition cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-400/10 border border-emerald-100 dark:border-emerald-400/25 flex items-center justify-center text-emerald-600 dark:text-emerald-300 shrink-0">
            <MessageCircle className="w-6 h-6 fill-emerald-600" />
          </div>
          <div>
            <h3 id="whatsapp-modal-title" className="text-xl font-bold text-fg tracking-tight">
              Connect on WhatsApp
            </h3>
            <p className="text-xs text-fg-4">
              Educational and patient-focused diabetes and glucose awareness platform
            </p>
          </div>
        </div>

        {/* Informational reassurance */}
        <div className="p-3.5 bg-sky-50/70 dark:bg-sky-400/10 border border-sky-100 dark:border-sky-400/25 rounded-xl mb-5 text-xs text-sky-900 dark:text-sky-100">
          <p className="leading-relaxed">
            Our health communication team provides educational guidance to help you understand your glucose patterns and explore modern monitoring options.
          </p>
        </div>

        {/* Select Inquiry Topic */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-fg-2 uppercase tracking-wider mb-2">
            Select Your Inquiry Topic
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_MESSAGES.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset.id, preset.message)}
                  className={`text-left p-3 rounded-xl border text-xs transition cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-400/10 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500'
                      : 'border-line hover:border-line-strong bg-surface text-fg-2'
                  }`}
                >
                  <div className="font-semibold">{preset.title}</div>
                  <div className="text-[11px] text-fg-4 mt-0.5 line-clamp-1">
                    {preset.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Message preview */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-fg-2 uppercase tracking-wider mb-2">
            Message Preview (You can edit before sending)
          </label>
          <textarea
            rows={3}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-fg-2 bg-surface-2/50"
            placeholder="Type your message here..."
          />
        </div>

        {!isNumberConfigured && (
          <div className="mb-4 p-3 rounded-xl border border-amber-200 dark:border-amber-400/25 bg-amber-50 dark:bg-amber-400/10 text-xs text-amber-800 dark:text-amber-100">
            WhatsApp number is not configured correctly. Please contact the MyGlucoGuide team.
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleLaunchWhatsApp}
            disabled={!isNumberConfigured}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] shadow transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-600"
          >
            <Send className="w-4 h-4" />
            <span>Open in WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-xl text-sm font-medium text-fg-3 hover:text-fg-2 hover:bg-surface-3 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Medical disclaimer subtext */}
        <p className="mt-4 text-[11px] text-center text-fg-5">
          This conversation provides educational information and does not provide individual medical diagnosis or prescriptions. Always consult your personal physician.
        </p>
      </div>
    </div>
  );
};

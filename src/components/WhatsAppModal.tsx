import React, { useState } from 'react';
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

  if (!isOpen) return null;

  const handleSelectPreset = (id: string, message: string) => {
    setSelectedPreset(id);
    setCustomText(message);
  };

  const handleLaunchWhatsApp = () => {
    const phoneNumber = '923001234567';
    const encodedText = encodeURIComponent(customText);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    // Robust WhatsApp click tracking with required properties
    trackWhatsAppClick({
      sourceLocation: sourceContext,
      page: currentPage,
      ctaIdentifier: 'whatsapp_modal_send_btn',
      additionalParams: {
        preset: selectedPreset,
        message_length: customText.length,
        phone: phoneNumber,
      },
    });

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <MessageCircle className="w-6 h-6 fill-emerald-600" />
          </div>
          <div>
            <h3 id="whatsapp-modal-title" className="text-xl font-bold text-slate-900 tracking-tight">
              Connect on WhatsApp
            </h3>
            <p className="text-xs text-slate-500">
              Educational and patient-focused diabetes and glucose awareness platform
            </p>
          </div>
        </div>

        {/* Informational reassurance */}
        <div className="p-3.5 bg-sky-50/70 border border-sky-100 rounded-xl mb-5 text-xs text-sky-900">
          <p className="leading-relaxed">
            Our health communication team provides educational guidance to help you understand your glucose patterns and explore modern monitoring options.
          </p>
        </div>

        {/* Select Inquiry Topic */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
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
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="font-semibold">{preset.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {preset.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Message preview */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Message Preview (You can edit before sending)
          </label>
          <textarea
            rows={3}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 bg-slate-50/50"
            placeholder="Type your message here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleLaunchWhatsApp}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Open in WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Medical disclaimer subtext */}
        <p className="mt-4 text-[11px] text-center text-slate-400">
          This conversation provides educational information and does not provide individual medical diagnosis or prescriptions. Always consult your personal physician.
        </p>
      </div>
    </div>
  );
};

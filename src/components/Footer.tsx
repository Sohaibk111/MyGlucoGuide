import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { MessageCircle, Mail, ShieldAlert, BarChart3, BookCheck } from 'lucide-react';
import { trackEvent, trackWhatsAppClick } from '../services/analytics';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenWhatsApp: (source: string) => void;
  onToggleAnalyticsModal?: () => void;
  onToggleSourcesModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenWhatsApp,
  onToggleAnalyticsModal,
  onToggleSourcesModal,
}) => {
  const [showLegalModal, setShowLegalModal] = useState<'privacy' | 'disclaimer' | null>(null);
  const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').trim();

  useEffect(() => {
    if (!showLegalModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowLegalModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLegalModal]);

  const handleLink = (page: PageId) => {
    trackEvent('cta_click', { action: 'footer_link', target: page });
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppFooter = () => {
    trackWhatsAppClick({
      sourceLocation: 'footer_primary_button',
      page: 'footer',
      ctaIdentifier: 'footer-whatsapp-cta',
    });
    onOpenWhatsApp('footer_primary');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2">
            <button
              onClick={() => handleLink('home')}
              className="text-left cursor-pointer group"
            >
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-sky-400 transition-colors">
                My<span className="text-sky-400">Gluco</span>Guide
              </span>
            </button>
            <p className="mt-2 text-sm font-medium text-sky-400">
              Learn • Understand • Make Better Decisions
            </p>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-sm">
              Educational and patient-focused diabetes and glucose awareness platform helping individuals and families across Pakistan understand numbers, glucose patterns, and modern monitoring options.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                id="footer-whatsapp-cta"
                onClick={handleWhatsAppFooter}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </button>

              <a
                href="mailto:myglucoguide@gmail.com"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>myglucoguide@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleLink('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About MyGlucoGuide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('education')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Diabetes Education
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('cgm')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Continuous Glucose Monitoring (CGM)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Learning Center & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Educational Topics */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Educational Topics
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>HbA1c & Glucose Averages</li>
              <li>Post-Prandial Meal Curves</li>
              <li>Pakistani Dietary Awareness</li>
              <li>Dawn Phenomenon & Circadian Rhythms</li>
              <li>CGM Wear & Routine Care</li>
              <li>Cardiovascular & Retinal Health</li>
            </ul>
          </div>

          {/* Column 4: Inquiries & Verification */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Inquiries & Guidance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Direct educational communication available across Pakistan (Karachi, Lahore, Islamabad, and nationwide).
            </p>
            <div className="space-y-2 text-xs">
              <div className="text-slate-400">
                Email: <span className="text-slate-200">myglucoguide@gmail.com</span>
              </div>
              <div className="text-slate-400">
                WhatsApp:{' '}
                <span className="text-slate-200">
                  {whatsappNumber ? `+${whatsappNumber}` : 'Coming soon'}
                </span>
              </div>
              <div className="text-slate-400">
                Hours: <span className="text-slate-200">Mon - Sat, 9:00 AM - 7:00 PM PKT</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {onToggleSourcesModal && (
                <button
                  onClick={onToggleSourcesModal}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 text-[11px] font-medium transition cursor-pointer self-start"
                >
                  <BookCheck className="w-3.5 h-3.5" />
                  <span>Clinical Sources & References</span>
                </button>
              )}

              {onToggleAnalyticsModal && (
                <button
                  onClick={onToggleAnalyticsModal}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[11px] font-medium transition cursor-pointer self-start"
                  title="View tracked Meta Pixel and Custom events"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Meta Pixel & Event Inspector</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Medical Disclaimer Banner (Mandatory as per brief) */}
        <div className="my-8 p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-100">Medical Disclaimer:</strong>{' '}
            This website provides educational information and is not a substitute for professional medical advice, diagnosis or treatment. Always consult a qualified healthcare professional for personal medical guidance.
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} MyGlucoGuide. All rights reserved. Pakistan.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowLegalModal('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setShowLegalModal('disclaimer')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Medical Disclaimer
            </button>
            {onToggleSourcesModal && (
              <button
                onClick={onToggleSourcesModal}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                References
              </button>
            )}
            <button
              onClick={() => handleLink('contact')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Legal / Disclaimer Simple Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4" role="presentation">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200" role="dialog" aria-modal="true" aria-labelledby="footer-legal-modal-title">
            <h3 id="footer-legal-modal-title" className="text-lg font-bold mb-3">
              {showLegalModal === 'privacy' ? 'Privacy Policy' : 'Comprehensive Medical Disclaimer'}
            </h3>
            <div className="text-xs text-slate-600 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-1">
              {showLegalModal === 'privacy' ? (
                <>
                  <p>
                    MyGlucoGuide values your privacy. We do not sell or trade your personal information. Any messages or inquiries sent through our contact form or WhatsApp are handled strictly for educational dialogue and customer guidance.
                  </p>
                  <p>
                    Anonymous website usage telemetry and event markers (such as WhatsApp clicks and article views) are processed for improving site usability and educational outreach.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Educational Information Only:</strong> All materials, including text, graphics, images, and other information contained on MyGlucoGuide, are for general educational purposes only.
                  </p>
                  <p>
                    Never disregard professional medical advice or delay seeking it because of something you read on this website. If you think you may have a medical emergency, immediately contact your doctor or hospital emergency service in Pakistan.
                  </p>
                  <p>
                    MyGlucoGuide does not prescribe medications, sell prescription drugs, or diagnose medical conditions.
                  </p>
                </>
              )}
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={() => setShowLegalModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

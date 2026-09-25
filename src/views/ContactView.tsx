import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
} from 'lucide-react';
import { ContactFormData } from '../types';
import { trackEvent, trackWhatsAppClick } from '../services/analytics';

interface ContactViewProps {
  onOpenWhatsApp: (source: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenWhatsApp }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    topic: 'cgm_inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide a message of at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      trackEvent('contact_form_submission', {
        name: formData.name,
        email: formData.email,
        topic: formData.topic,
        message_length: formData.message.length,
      });
    }, 600);
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-2">
          <Mail className="w-4 h-4 text-sky-600" />
          <span>Get in Touch</span>
        </div>
        <h1
          className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          We Are Here to Guide You
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Have questions about Continuous Glucose Monitoring, dietary patterns, or diabetes education? Reach out to us. For the fastest response, WhatsApp is our primary channel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: WhatsApp Primary Card & Contact Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Featured Primary WhatsApp Card */}
          <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
              <MessageCircle className="w-7 h-7 fill-white" />
            </div>

            <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-1">
              Primary Contact Method
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white mb-2">
              Chat With Us on WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mb-6">
              Get prompt, courteous educational guidance from our health communication team directly on your phone.
            </p>

            <button
              id="contact-page-whatsapp-btn"
              type="button"
              onClick={() => {
                trackWhatsAppClick({
                  sourceLocation: 'contact_page_card',
                  page: 'contact',
                  ctaIdentifier: 'contact-page-whatsapp-btn',
                });
                onOpenWhatsApp('contact_page_primary');
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-emerald-950 bg-white hover:bg-emerald-50 active:scale-[0.98] shadow-md transition cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
              <span>Start WhatsApp Conversation</span>
            </button>
          </div>

          {/* Secondary Contact Info Cards */}
          <div className="space-y-3">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Inquiry</h4>
                <a
                  href="mailto:myglucoguide@gmail.com"
                  className="text-sm font-semibold text-slate-900 hover:text-sky-700 transition"
                >
                  myglucoguide@gmail.com
                </a>
                <p className="text-xs text-slate-500 mt-0.5">
                  Typical response within 24 hours.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Geographic Reach</h4>
                <p className="text-sm font-semibold text-slate-900">
                  Online Educational Support Across Pakistan
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Serving Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Multan, and all regions.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Availability Hours</h4>
                <p className="text-sm font-semibold text-slate-900">
                  Monday – Saturday: 9:00 AM – 7:00 PM PKT
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inquiries received on Sundays are answered Monday morning.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/80 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
              Send an Email Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Fill in your details below and our team will get in touch with you.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-emerald-950">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-1 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. We have received your inquiry and our educational coordinator will reply to <strong>{formData.email}</strong> shortly.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        topic: 'cgm_inquiry',
                        message: '',
                      });
                    }}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone / WhatsApp (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                  />
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                  >
                    <option value="cgm_inquiry">CGM Sensor Guidance & Availability</option>
                    <option value="education">Diabetes Education & Post-Meal Spikes</option>
                    <option value="caregiver">Family / Caregiver Support</option>
                    <option value="other">General Question</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe what you would like to know or how we can assist..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>

                <p className="text-[11px] text-center text-slate-400 pt-1">
                  We respect your privacy. No marketing spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

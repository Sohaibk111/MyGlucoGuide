import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Search } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { trackEvent, trackWhatsAppClick } from '../services/analytics';

interface FaqViewProps {
  onOpenWhatsApp: (source: string) => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ onOpenWhatsApp }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'CGM', 'Monitoring', 'Diet & Lifestyle', 'General'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-sky-600" />
          <span>Clear Answers</span>
        </div>
        <h1
          className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Everything you need to know about diabetes awareness, continuous glucose monitoring, and living well in Pakistan.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs (e.g. pain, shower, lag time, Pakistan availability)..."
            className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm text-slate-800 placeholder-slate-400 shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-sm text-slate-600">
            No questions found matching your search. Have a specific question? Feel free to ask directly on WhatsApp.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-sky-700 transition cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-emerald-950">
            Didn't find your answer?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800 mt-0.5">
            Our educational team is available on WhatsApp to answer your questions.
          </p>
        </div>
        <button
          id="faq-whatsapp-cta"
          onClick={() => {
            trackWhatsAppClick({
              sourceLocation: 'faq_page_cta',
              page: 'faq',
              ctaIdentifier: 'faq-whatsapp-cta',
            });
            onOpenWhatsApp('faq_page');
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition cursor-pointer shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

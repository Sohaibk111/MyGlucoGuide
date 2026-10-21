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
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-300" />
          <span>Clear Answers</span>
        </div>
        <h1
          className="text-3xl sm:text-5xl font-extrabold text-fg tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-base text-fg-3">
          Everything you need to know about diabetes awareness, continuous glucose monitoring, and living well in Pakistan.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="w-5 h-5 text-fg-5 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs (e.g. pain, shower, lag time, Pakistan availability)..."
            className="w-full pl-11 pr-4 py-3 bg-surface rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm text-fg-2 placeholder-fg-5 shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-surface-3 rounded-xl">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-surface text-fg shadow-xs font-semibold'
                    : 'text-fg-3 hover:text-fg'
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
          <div className="p-8 text-center bg-surface rounded-2xl border border-line text-sm text-fg-3">
            No questions found matching your search. Have a specific question? Feel free to ask directly on WhatsApp.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-surface rounded-2xl border border-line/80 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-fg hover:text-sky-700 dark:hover:text-sky-300 transition cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-fg-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-600 dark:text-sky-300' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-fg-3 leading-relaxed border-t border-line-soft"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-400/10 border border-emerald-200/80 dark:border-emerald-400/25 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-100">
            Didn't find your answer?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-100 mt-0.5">
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition cursor-pointer shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

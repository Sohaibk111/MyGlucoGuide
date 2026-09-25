import React from 'react';
import { X, Clock, Calendar, MessageCircle, AlertCircle, CheckCircle2, BookCheck } from 'lucide-react';
import { Article } from '../types';
import { trackWhatsAppClick } from '../services/analytics';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenWhatsApp: (source: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenWhatsApp,
}) => {
  if (!article) return null;

  const handleWhatsAppInquiry = () => {
    trackWhatsAppClick({
      sourceLocation: 'article_detail_modal',
      page: `article_${article.slug}`,
      ctaIdentifier: 'article-modal-whatsapp-btn',
      additionalParams: {
        article_slug: article.slug,
        article_title: article.title,
      },
    });
    onOpenWhatsApp(`article_${article.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-9 text-slate-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Metadata (Zero-pill discipline: unboxed clean text) */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-3">
          <span className="text-sky-700 font-semibold">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.date}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>

        {/* Title */}
        <h2
          id="article-modal-title"
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4"
          style={{ textWrap: 'balance' }}
        >
          {article.title}
        </h2>

        {/* Optional Article Image */}
        {article.imageUrl && (
          <div className="mb-6 rounded-xl overflow-hidden bg-slate-100 aspect-16/9 relative border border-slate-100">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Key Takeaways Callout */}
        <div className="p-4 sm:p-5 rounded-xl bg-sky-50/70 border border-sky-100 mb-6">
          <div className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
            <span>Key Educational Takeaways</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-sky-950">
            {article.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-sky-600 font-bold shrink-0 mt-0.5">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Sources / References if available */}
        {article.references && article.references.length > 0 && (
          <div className="mt-7 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1.5">
              <BookCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>References & Clinical Literature:</span>
            </div>
            <ul className="space-y-1 list-disc pl-5">
              {article.references.map((ref, idx) => (
                <li key={idx} className="text-slate-600">{ref}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Medical disclaimer note inside article */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-3 text-xs text-slate-500">
          <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong>Medical Notice:</strong> Content published by MyGlucoGuide is meant exclusively for educational awareness and lifestyle literacy. It does not replace individualized clinical diagnosis, prescription adjustments, or medical consultation with your doctor.
          </p>
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Have an educational question about this topic?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Chat with our health education team on WhatsApp for practical clarification.
            </p>
          </div>
          <button
            id="article-modal-whatsapp-btn"
            onClick={handleWhatsAppInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition cursor-pointer shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Discuss on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

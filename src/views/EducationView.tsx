import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  Utensils,
  CheckCircle2,
  Clock,
  Activity,
  Heart,
  AlertTriangle,
  MessageCircle,
  Info,
} from 'lucide-react';
import { Article, PageId } from '../types';
import { ARTICLES } from '../data/articles';
import { trackEvent, trackWhatsAppClick } from '../services/analytics';

interface EducationViewProps {
  onSelectArticle: (article: Article) => void;
  onOpenWhatsApp: (source: string) => void;
  onNavigate: (page: PageId) => void;
}

export const EducationView: React.FC<EducationViewProps> = ({
  onSelectArticle,
  onOpenWhatsApp,
  onNavigate,
}) => {
  const [selectedFoodSequence, setSelectedFoodSequence] = useState<'traditional' | 'sequenced'>('sequenced');

  const handleWhatsAppClick = () => {
    trackWhatsAppClick({
      sourceLocation: 'education_page_footer',
      page: 'education',
      ctaIdentifier: 'education-whatsapp-footer-btn',
    });
    onOpenWhatsApp('education_page_cta');
  };

  const handleArticleSelect = (art: Article) => {
    trackEvent('article_view', {
      article_slug: art.slug,
      article_title: art.title,
      category: art.category,
    });
    onSelectArticle(art);
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-300" />
          <span>Diabetes Education</span>
        </div>
        <h1
          className="text-3xl sm:text-5xl font-extrabold text-fg tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Practical Diabetes Knowledge for Pakistan
        </h1>
        <p className="mt-3 text-base text-fg-3 leading-relaxed">
          Understanding the science behind glucose metabolism in simple terms. Learn how daily choices, traditional foods, and modern awareness help support your long-term health.
        </p>
      </div>

      {/* 2. Core Pillars of Diabetes Education */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-2xl p-6 border border-line/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-400/10 text-sky-600 dark:text-sky-300 flex items-center justify-center mb-4">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-fg mb-1.5">
            Insulin & Glucose Mechanics
          </h3>
          <p className="text-xs sm:text-sm text-fg-3 leading-relaxed">
            Insulin functions as the key allowing cells to absorb glucose. When resistance builds or production declines, glucose lingers in the blood, placing stress on blood vessels.
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-6 border border-line/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mb-4">
            <Utensils className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-fg mb-1.5">
            Pakistani Food Reality
          </h3>
          <p className="text-xs sm:text-sm text-fg-3 leading-relaxed">
            Pakistani cuisine is naturally rich in grains. Understanding grain choices, portion balance, and meal sequence helps stabilize curves without extreme starvation.
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-6 border border-line/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-fg mb-1.5">
            Cardiometabolic Protection
          </h3>
          <p className="text-xs sm:text-sm text-fg-3 leading-relaxed">
            Comprehensive diabetes management focuses on safeguarding vital organs—eyes, kidneys, heart, and nerves—through personalized medical care and lifestyle habits.
          </p>
        </div>
      </section>

      {/* Reference Range Callout */}
      <div className="p-4 rounded-xl bg-sky-50/80 dark:bg-sky-400/10 border border-sky-200/80 dark:border-sky-400/25 flex items-start gap-3 text-xs sm:text-sm text-sky-950 dark:text-sky-100">
        <Info className="w-4 h-4 text-sky-700 dark:text-sky-300 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Clinical Reference Note:</strong> 70–180 mg/dL is a commonly used Time in Range reference for many people with diabetes. Individual targets may vary. Discuss your glucose targets with your healthcare professional.
        </p>
      </div>

      {/* 3. Pakistani Meal Sequencing Explainer */}
      <section className="bg-surface-2 rounded-3xl p-6 sm:p-10 border border-line/80">
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider mb-1">
            Nutritional Literacy
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
            The Concept of Desi Meal Sequencing
          </h2>
          <p className="text-sm text-fg-3 mt-2">
            Nutritional research suggests that changing the <em>order</em> in which you eat meal components—starting with vegetables and protein before carbohydrates—may help moderate post-meal glucose absorption.
          </p>
        </div>

        {/* Interactive Sequence Switcher */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setSelectedFoodSequence('sequenced')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
              selectedFoodSequence === 'sequenced'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-surface text-fg-2 border border-line hover:bg-surface-3'
            }`}
          >
            Sequenced Approach (Fiber First → Protein → Carbs Last)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFoodSequence('traditional')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
              selectedFoodSequence === 'traditional'
                ? 'bg-slate-800 dark:bg-sky-700 text-white shadow-xs'
                : 'bg-surface text-fg-2 border border-line hover:bg-surface-3'
            }`}
          >
            Carbohydrates First
          </button>
        </div>

        {/* Visual Comparison Box */}
        {selectedFoodSequence === 'sequenced' ? (
          <div className="bg-surface rounded-2xl p-6 border border-emerald-200 dark:border-emerald-400/25 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>More Gradual Post-Meal Response</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-400/10 border border-emerald-100 dark:border-emerald-400/25">
                <span className="font-bold text-emerald-900 dark:text-emerald-100 block mb-1">Step 1: Fiber & Veggies</span>
                <p className="text-fg-3">
                  Enjoy fresh kachumber salad or cooked seasonal vegetables first to introduce dietary fiber.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-400/10 border border-emerald-100 dark:border-emerald-400/25">
                <span className="font-bold text-emerald-900 dark:text-emerald-100 block mb-1">Step 2: Protein & Healthy Fat</span>
                <p className="text-fg-3">
                  Consume protein elements (daal, chicken, fish, eggs), which take longer to digest and slow gastric emptying.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-400/10 border border-emerald-100 dark:border-emerald-400/25">
                <span className="font-bold text-emerald-900 dark:text-emerald-100 block mb-1">Step 3: Roti or Rice Portion</span>
                <p className="text-fg-3">
                  Eat your balanced portion of whole-wheat roti or rice last, moderating the rate of glucose entry into the blood.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface rounded-2xl p-6 border border-line shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Rapid Absorption Curve</span>
            </div>
            <p className="text-xs sm:text-sm text-fg-3 leading-relaxed">
              Consuming refined wheat flour (maida), paratha, or white rice on an empty stomach rapidly converts starches into glucose, which can lead to steeper post-meal elevations.
            </p>
          </div>
        )}
      </section>

      {/* 4. Curated Educational Articles Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider mb-1">
              In-Depth Library
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
              Essential Educational Guides
            </h2>
          </div>
          <button
            onClick={() => {
              trackEvent('cta_click', { action: 'browse_learning_center', page: 'education' });
              onNavigate('blog');
            }}
            className="text-xs sm:text-sm font-semibold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-100 transition flex items-center gap-1 cursor-pointer"
          >
            <span>Browse Full Learning Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((art) => (
            <article
              key={art.id}
              className="bg-surface rounded-2xl border border-line/80 shadow-xs hover:border-sky-300 dark:hover:border-sky-400/40 transition p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-fg-4 mb-2">
                  <span className="text-sky-700 dark:text-sky-300 font-semibold">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-fg leading-snug mb-2">
                  {art.title}
                </h3>
                <p className="text-xs text-fg-3 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-line-soft flex items-center justify-between">
                <span className="text-[11px] text-fg-5">{art.date}</span>
                <button
                  onClick={() => handleArticleSelect(art)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-100 transition cursor-pointer"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. WhatsApp Educational Help */}
      <section className="bg-slate-900 dark:bg-surface-3 dark:border dark:border-line rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-bold">
            Need Educational Clarification on Your Numbers?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our health education team is available on WhatsApp to answer educational questions and help you understand glucose patterns.
          </p>
        </div>
        <button
          id="education-whatsapp-footer-btn"
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] transition cursor-pointer shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat on WhatsApp</span>
        </button>
      </section>
    </div>
  );
};

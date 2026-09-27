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
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span>Diabetes Education</span>
        </div>
        <h1
          className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Practical Diabetes Knowledge for Pakistan
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Understanding the science behind glucose metabolism in simple terms. Learn how daily choices, traditional foods, and modern awareness help support your long-term health.
        </p>
      </div>

      {/* 2. Core Pillars of Diabetes Education */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">
            Insulin & Glucose Mechanics
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Insulin functions as the key allowing cells to absorb glucose. When resistance builds or production declines, glucose lingers in the blood, placing stress on blood vessels.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Utensils className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">
            Pakistani Food Reality
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Pakistani cuisine is naturally rich in grains. Understanding grain choices, portion balance, and meal sequence helps stabilize curves without extreme starvation.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">
            Cardiometabolic Protection
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Comprehensive diabetes management focuses on safeguarding vital organs—eyes, kidneys, heart, and nerves—through personalized medical care and lifestyle habits.
          </p>
        </div>
      </section>

      {/* Reference Range Callout */}
      <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200/80 flex items-start gap-3 text-xs sm:text-sm text-sky-950">
        <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Clinical Reference Note:</strong> 70–180 mg/dL is a commonly used Time in Range reference for many people with diabetes. Individual targets may vary. Discuss your glucose targets with your healthcare professional.
        </p>
      </div>

      {/* 3. Pakistani Meal Sequencing Explainer */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80">
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            Nutritional Literacy
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The Concept of Desi Meal Sequencing
          </h2>
          <p className="text-sm text-slate-600 mt-2">
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
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Sequenced Approach (Fiber First → Protein → Carbs Last)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFoodSequence('traditional')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
              selectedFoodSequence === 'traditional'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Carbohydrates First
          </button>
        </div>

        {/* Visual Comparison Box */}
        {selectedFoodSequence === 'sequenced' ? (
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>More Gradual Post-Meal Response</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <span className="font-bold text-emerald-900 block mb-1">Step 1: Fiber & Veggies</span>
                <p className="text-slate-600">
                  Enjoy fresh kachumber salad or cooked seasonal vegetables first to introduce dietary fiber.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <span className="font-bold text-emerald-900 block mb-1">Step 2: Protein & Healthy Fat</span>
                <p className="text-slate-600">
                  Consume protein elements (daal, chicken, fish, eggs), which take longer to digest and slow gastric emptying.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <span className="font-bold text-emerald-900 block mb-1">Step 3: Roti or Rice Portion</span>
                <p className="text-slate-600">
                  Eat your balanced portion of whole-wheat roti or rice last, moderating the rate of glucose entry into the blood.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Rapid Absorption Curve</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Consuming refined wheat flour (maida), paratha, or white rice on an empty stomach rapidly converts starches into glucose, which can lead to steeper post-meal elevations.
            </p>
          </div>
        )}
      </section>

      {/* 4. Curated Educational Articles Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
              In-Depth Library
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Essential Educational Guides
            </h2>
          </div>
          <button
            onClick={() => {
              trackEvent('cta_click', { action: 'browse_learning_center', page: 'education' });
              onNavigate('blog');
            }}
            className="text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-900 transition flex items-center gap-1 cursor-pointer"
          >
            <span>Browse Full Learning Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-sky-300 transition p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="text-sky-700 font-semibold">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{art.date}</span>
                <button
                  onClick={() => handleArticleSelect(art)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900 transition cursor-pointer"
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
      <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
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
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition cursor-pointer shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat on WhatsApp</span>
        </button>
      </section>
    </div>
  );
};

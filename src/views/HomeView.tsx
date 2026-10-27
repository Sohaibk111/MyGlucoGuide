import React from 'react';
import {
  MessageCircle,
  ArrowRight,
  BookOpen,
  LineChart,
  Compass,
  Radio,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Heart,
  Smile,
  Info,
} from 'lucide-react';
import { PageId, Article } from '../types';
import { ARTICLES } from '../data/articles';
import { InteractiveGlucoseGraph } from '../components/InteractiveGlucoseGraph';
import { trackEvent, trackWhatsAppClick } from '../services/analytics';
import { PurchaseView } from './PurchaseView';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onOpenWhatsApp: (source: string) => void;
  onSelectArticle: (article: Article) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenWhatsApp,
  onSelectArticle,
}) => {
  const handlePrimaryWhatsApp = () => {
    trackWhatsAppClick({
      sourceLocation: 'hero_primary_cta',
      page: 'home',
      ctaIdentifier: 'hero-whatsapp-btn',
    });
    onOpenWhatsApp('hero_primary');
  };

  const handleArticleSelect = (art: Article) => {
    trackEvent('article_view', {
      article_slug: art.slug,
      article_title: art.title,
      category: art.category,
    });
    onSelectArticle(art);
  };

  const handleEducationCta = () => {
    trackEvent('cta_click', { action: 'hero_explore_education', page: 'home' });
    const educationEl = document.getElementById('diabetes-education-section');
    if (educationEl) {
      educationEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('education');
    }
  };

  const handleCgmLearnMore = () => {
    trackEvent('cta_click', { action: 'home_cgm_learn_more', page: 'home' });
    onNavigate('cgm');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpotlightWhatsApp = () => {
    trackWhatsAppClick({
      sourceLocation: 'home_cgm_spotlight',
      page: 'home',
      ctaIdentifier: 'home-cgm-spotlight-whatsapp-btn',
    });
    onOpenWhatsApp('cgm_spotlight');
  };

  const handleBannerWhatsApp = () => {
    trackWhatsAppClick({
      sourceLocation: 'home_large_banner',
      page: 'home',
      ctaIdentifier: 'home-large-whatsapp-cta',
    });
    onOpenWhatsApp('home_large_banner');
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-300 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-sky-600" />
                <span>Diabetes Education & Glucose Awareness</span>
              </div>

              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Understand Your Diabetes.{' '}
                <span className="text-sky-600 dark:text-sky-300">Make Better Decisions.</span>
              </h1>

              <p
                className="text-base sm:text-lg text-fg-3 leading-relaxed max-w-2xl"
                style={{ textWrap: 'balance' }}
              >
                Simple, practical diabetes education and glucose awareness to help you understand your numbers, your patterns and your options.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  id="hero-whatsapp-btn"
                  onClick={handlePrimaryWhatsApp}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button
                  onClick={handleEducationCta}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-fg-2 hover:text-fg bg-surface-3 hover:bg-surface-4/80 active:scale-[0.98] transition cursor-pointer"
                >
                  <span>Explore Diabetes Education</span>
                  <ArrowRight className="w-4 h-4 text-fg-4" />
                </button>
              </div>

              {/* Patient-focused trust reassurance */}
              <div className="pt-3 flex items-center gap-2 text-xs text-fg-4">
                <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-300 shrink-0" />
                <span>
                  Educational and patient-focused diabetes and glucose awareness platform
                </span>
              </div>
            </div>

            {/* Right Visual (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-line/80 bg-surface">
                <img
                  src="/assets/images/hero_pakistani_glucose_app_1790358065352.webp"
                  alt="Pakistani adult with smartphone showing glucose insights and trend patterns"
                  className="w-full h-auto object-cover aspect-4/3"
                  referrerPolicy="no-referrer"
                />
                </div>

                {/* On mobile, keep the demo card below the image so the person stays visible. On larger screens, overlay it as before. */}
                <div className="relative mt-3 sm:mt-0 sm:absolute sm:bottom-4 sm:left-4 sm:right-4 bg-surface/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-lg border border-line-soft grid grid-cols-[auto_minmax(0,1fr)] sm:flex sm:items-center sm:justify-between gap-x-2 gap-y-1.5 sm:gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-sky-50 dark:bg-sky-400/10 border border-sky-100 dark:border-sky-400/25 flex items-center justify-center text-sky-700 dark:text-sky-300 font-bold text-[10px] sm:text-xs shrink-0">
                      CGM
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-xs text-fg-4 font-medium leading-tight">Illustrative example</div>
                      <div className="mt-1 flex flex-wrap items-center gap-1 sm:gap-1.5 tabular-nums">
                        <span className="text-sm sm:text-base font-extrabold text-fg">112</span>
                        <span className="text-[10px] sm:text-xs font-normal text-fg-4">mg/dL</span>
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-400/10 px-1.5 py-0.5 rounded">Demo only</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-center justify-between sm:block sm:text-right border-t border-line-soft sm:border-0 pt-1.5 sm:pt-0 gap-2">
                    <span className="text-[10px] sm:text-[11px] text-fg-4">Sample value</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-300">Not personal advice</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Under Hero */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-10 border-t border-line/80">
            <div className="p-4 rounded-2xl bg-surface border border-line/70 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-400/10 text-sky-600 dark:text-sky-300 flex items-center justify-center shrink-0">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-fg">Continuous Monitoring</h4>
                <p className="text-[11px] text-fg-4">Day and night trend tracking</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-line/70 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-400/10 text-sky-600 dark:text-sky-300 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-fg">Trends & Patterns</h4>
                <p className="text-[11px] text-fg-4">Directional trend arrows</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-line/70 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-400/10 text-sky-600 dark:text-sky-300 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-fg">Better Decisions</h4>
                <p className="text-[11px] text-fg-4">Food, movement & rest</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-line/70 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-400/10 text-sky-600 dark:text-sky-300 flex items-center justify-center shrink-0">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-fg">Patient Confidence</h4>
                <p className="text-[11px] text-fg-4">Through education</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS MYGLUCOGUIDE? */}
      <section className="bg-surface-2/80 py-16 border-y border-line/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold text-sky-700 dark:text-sky-300 tracking-wider uppercase mb-1">
              About Our Platform
            </div>
            <h2
              className="text-2xl sm:text-4xl font-extrabold text-fg tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              What is MyGlucoGuide?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-fg-3 leading-relaxed">
              MyGlucoGuide is an educational and patient-focused diabetes and glucose awareness platform. We provide evidence-grounded information about diabetes, glucose monitoring, lifestyle, and modern monitoring options to help Pakistani families understand their numbers.
            </p>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface rounded-2xl p-6 border border-line/80 shadow-xs hover:border-sky-300 dark:hover:border-sky-400/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-400/10 text-sky-600 dark:text-sky-300 flex items-center justify-center mb-5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-fg mb-2">
                1. Diabetes Education
              </h3>
              <p className="text-xs sm:text-sm text-fg-3 leading-relaxed">
                Clear, evidence-informed explanations of HbA1c, insulin, and how meals can affect glucose levels.
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-line/80 shadow-xs hover:border-sky-300 dark:hover:border-sky-400/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-400/10 text-sky-600 dark:text-sky-300 flex items-center justify-center mb-5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-fg mb-2">
                2. Glucose Awareness
              </h3>
              <p className="text-xs sm:text-sm text-fg-3 leading-relaxed">
                Understanding morning baseline readings, post-meal curves, and why point-in-time finger pricks show only part of the daily story.
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-line/80 shadow-xs hover:border-sky-300 dark:hover:border-sky-400/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-400/10 text-sky-600 dark:text-sky-300 flex items-center justify-center mb-5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-fg mb-2">
                3. Practical Guidance
              </h3>
              <p className="text-xs sm:text-sm text-fg-3 leading-relaxed">
                Practical education around familiar Pakistani foods, sweetened tea, and questions to discuss with a clinician before fasting.
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-line/80 shadow-xs hover:border-sky-300 dark:hover:border-sky-400/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-400/10 text-sky-600 dark:text-sky-300 flex items-center justify-center mb-5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-fg mb-2">
                4. Modern Monitoring
              </h3>
              <p className="text-xs sm:text-sm text-fg-3 leading-relaxed">
                Demystifying Continuous Glucose Monitors (CGM) so you know how sensors work, practical considerations, and who may benefit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UNDERSTAND YOUR GLUCOSE PATTERNS (Interactive Graph) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveGlucoseGraph />
      </section>

      {/* 4. WHAT IS CGM? SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sky-50/70 via-white to-slate-50 dark:from-sky-400/10 dark:via-surface dark:to-surface-2 rounded-3xl border border-sky-100 dark:border-sky-400/25 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-line bg-surface aspect-4/3 relative">
                <img
                  src="/assets/images/cgm_upper_arm_sensor_1790517820663.webp"
                  alt="Person wearing a continuous glucose monitor sensor on the upper arm with glucose readings displayed on a smartphone"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Description (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="text-xs font-semibold text-sky-700 dark:text-sky-300 tracking-wider uppercase">
                Modern Diabetes Technology
              </div>

              <h2
                className="text-2xl sm:text-4xl font-extrabold text-fg tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                What is Continuous Glucose Monitoring (CGM)?
              </h2>

              <p className="text-sm sm:text-base text-fg-2 leading-relaxed">
                A Continuous Glucose Monitor (CGM) is a small, water-resistant sensor typically worn on the arm or abdomen. It samples glucose in the interstitial fluid continuously, transmitting readings and directional trend arrows to a compatible smartphone.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-surface rounded-xl border border-line/80">
                  <div className="text-xs font-bold text-fg">1. Wear the Sensor</div>
                  <div className="text-[11px] text-fg-4 mt-1">A compact sensor is applied to the skin. Wear duration is product-dependent (commonly 10–14 days).</div>
                </div>
                <div className="p-3 bg-surface rounded-xl border border-line/80">
                  <div className="text-xs font-bold text-fg">2. Get Real-Time Data</div>
                  <div className="text-[11px] text-fg-4 mt-1">Wireless transmission updates your smartphone automatically according to device intervals.</div>
                </div>
                <div className="p-3 bg-surface rounded-xl border border-line/80">
                  <div className="text-xs font-bold text-fg">3. Observe Trends</div>
                  <div className="text-[11px] text-fg-4 mt-1">Directional arrows show whether glucose is rising, falling, or remaining steady.</div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  onClick={handleCgmLearnMore}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 transition cursor-pointer shadow-xs"
                >
                  <span>Learn About CGM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="home-cgm-spotlight-whatsapp-btn"
                  onClick={handleSpotlightWhatsApp}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-emerald-800 dark:text-emerald-100 hover:text-emerald-900 dark:hover:text-emerald-100 bg-emerald-50 dark:bg-emerald-400/10 hover:bg-emerald-100 dark:hover:bg-emerald-400/15 border border-emerald-200 dark:border-emerald-400/25 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-300 fill-emerald-600" />
                  <span>Ask About CGM in Pakistan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIABETES EDUCATION SECTION (Article Cards) */}
      <section id="diabetes-education-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-sky-700 dark:text-sky-300 tracking-wider uppercase mb-1">
              Knowledge Base
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-fg tracking-tight">
              Diabetes Education
            </h2>
            <p className="text-sm text-fg-3 mt-1 max-w-xl">
              Essential health literacy explained simply. Click any guide to read practical takeaways.
            </p>
          </div>

          <button
            onClick={() => {
              trackEvent('cta_click', { action: 'view_all_articles', page: 'home' });
              onNavigate('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-100 transition self-start sm:self-auto cursor-pointer"
          >
            <span>View All Articles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.slice(0, 6).map((art) => (
            <article
              key={art.id}
              className="bg-surface rounded-2xl border border-line/80 shadow-xs hover:shadow-md hover:border-sky-300 dark:hover:border-sky-400/40 transition-all flex flex-col justify-between p-5 sm:p-6"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-fg-4 mb-2">
                  <span className="text-sky-700 dark:text-sky-300 font-semibold">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-fg leading-snug mb-2 line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-fg-3 leading-relaxed line-clamp-3">
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

      {/* 6. HOW MYGLUCOGUIDE CAN HELP (3 Steps) */}
      <section className="bg-surface-2 py-16 border-y border-line/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold text-sky-700 dark:text-sky-300 tracking-wider uppercase mb-1">
              Your Educational Pathway
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-fg tracking-tight">
              How MyGlucoGuide Can Help
            </h2>
            <p className="text-sm text-fg-3 mt-2">
              Our 3-step approach provides the clarity needed to navigate daily life with diabetes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-surface rounded-2xl p-7 border border-line/80 shadow-xs relative">
              <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-400/15 text-sky-800 dark:text-sky-100 font-extrabold text-lg flex items-center justify-center mb-5">
                1
              </div>
              <h3 className="text-lg font-bold text-fg mb-2">1. Learn</h3>
              <p className="text-xs sm:text-sm text-fg-3 leading-relaxed">
                Discover what blood sugar spikes mean, how traditional Pakistani foods behave, and how your body responds to daily meals.
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-7 border border-line/80 shadow-xs relative">
              <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-400/15 text-sky-800 dark:text-sky-100 font-extrabold text-lg flex items-center justify-center mb-5">
                2
              </div>
              <h3 className="text-lg font-bold text-fg mb-2">2. Understand</h3>
              <p className="text-xs sm:text-sm text-fg-3 leading-relaxed">
                Look beyond isolated morning checks. Understand post-meal curves, circadian patterns, and how continuous data illustrates the full 24-hour cycle.
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-7 border border-line/80 shadow-xs relative">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-400/15 text-emerald-800 dark:text-emerald-100 font-extrabold text-lg flex items-center justify-center mb-5">
                3
              </div>
              <h3 className="text-lg font-bold text-fg mb-2">3. Make Better Decisions</h3>
              <p className="text-xs sm:text-sm text-fg-3 leading-relaxed">
                Have constructive conversations with your doctor, adapt family meals with practical food sequencing, and build sustainable lifestyle habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct CGM order form integrated into the homepage */}
      <section id="home-order-cgm" aria-label="Order EvoCheck CGM" className="scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">Order Directly</p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-fg mt-2">Order EvoCheck Premium LinX CGM</h2>
          <p className="text-sm sm:text-base text-fg-3 mt-3 max-w-2xl mx-auto">No need to open a separate purchase page. Complete the order form here and continue on WhatsApp.</p>
        </div>
        <PurchaseView onOpenWhatsApp={onOpenWhatsApp} />
      </section>

      {/* 7. LARGE WHATSAPP CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-100 uppercase tracking-wider">
              <MessageCircle className="w-4 h-4 fill-emerald-200 text-emerald-800 dark:text-emerald-100" />
              <span>Direct WhatsApp Inquiry</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Have a Question About Diabetes or Glucose Monitoring?
            </h2>

            <p className="text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
              Talk directly with our health education team for guidance, CGM availability in Pakistan, and practical support for you or your loved ones.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="home-large-whatsapp-cta"
                onClick={handleBannerWhatsApp}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm sm:text-base font-bold text-emerald-950 bg-white hover:bg-emerald-50 active:scale-[0.98] shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
                <span>Chat With Us on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  trackEvent('cta_click', { action: 'home_banner_to_contact', page: 'home' });
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-6 py-4 rounded-full text-sm font-semibold text-white bg-emerald-900/60 hover:bg-emerald-900/90 border border-emerald-500/40 transition cursor-pointer"
              >
                <span>Send Email Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

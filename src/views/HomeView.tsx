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
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-sky-600" />
                <span>Diabetes Education & Glucose Awareness</span>
              </div>

              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Understand Your Diabetes.{' '}
                <span className="text-sky-600">Make Better Decisions.</span>
              </h1>

              <p
                className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl"
                style={{ textWrap: 'balance' }}
              >
                Simple, practical diabetes education and glucose awareness to help you understand your numbers, your patterns and your options.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  id="hero-whatsapp-btn"
                  onClick={handlePrimaryWhatsApp}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button
                  onClick={handleEducationCta}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 active:scale-[0.98] transition cursor-pointer"
                >
                  <span>Explore Diabetes Education</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Patient-focused trust reassurance */}
              <div className="pt-3 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>
                  Educational and patient-focused diabetes and glucose awareness platform
                </span>
              </div>
            </div>

            {/* Right Visual (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                <img
                  src="/assets/images/hero_pakistani_glucose_app_1790358065352.jpg"
                  alt="Pakistani adult with smartphone showing glucose insights and trend patterns"
                  className="w-full h-auto object-cover aspect-4/3"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Floating Sensor Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 font-bold text-xs shrink-0">
                      CGM
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Continuous Reading</div>
                      <div className="text-base font-extrabold text-slate-900 flex items-center gap-1.5 tabular-nums">
                        112 <span className="text-xs font-normal text-slate-500">mg/dL</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Steady →
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Reference (70–180)</span>
                    <span className="text-xs font-semibold text-emerald-700">Within Range</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Under Hero */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-10 border-t border-slate-200/80">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Continuous Monitoring</h4>
                <p className="text-[11px] text-slate-500">Day and night trend tracking</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Trends & Patterns</h4>
                <p className="text-[11px] text-slate-500">Directional trend arrows</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Better Decisions</h4>
                <p className="text-[11px] text-slate-500">Food, movement & rest</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Patient Confidence</h4>
                <p className="text-[11px] text-slate-500">Through education</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS MYGLUCOGUIDE? */}
      <section className="bg-slate-50/80 py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold text-sky-700 tracking-wider uppercase mb-1">
              About Our Platform
            </div>
            <h2
              className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              What is MyGlucoGuide?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              MyGlucoGuide is an educational and patient-focused diabetes and glucose awareness platform. We provide evidence-grounded information about diabetes, glucose monitoring, lifestyle, and modern monitoring options to help Pakistani families understand their numbers.
            </p>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-sky-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                1. Diabetes Education
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clear, evidence-grounded insights explaining HbA1c, insulin function, and how food directly impacts daily blood sugar.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-sky-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                2. Glucose Awareness
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Understanding morning baseline readings, post-meal curves, and why point-in-time finger pricks show only part of the daily story.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-sky-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                3. Practical Guidance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Culturally resonant guidance for Pakistani diets: balancing roti, daal, and rice, managing tea, and safe fasting practices.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-sky-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                4. Modern Monitoring
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
        <div className="bg-gradient-to-br from-sky-50/70 via-white to-slate-50 rounded-3xl border border-sky-100 p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white aspect-4/3 relative">
                <img
                  src="/assets/images/cgm_sensor_device_smart_1790358083075.jpg"
                  alt="Continuous Glucose Monitoring CGM sensor next to a smartphone"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Description (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="text-xs font-semibold text-sky-700 tracking-wider uppercase">
                Modern Diabetes Technology
              </div>

              <h2
                className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                What is Continuous Glucose Monitoring (CGM)?
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                A Continuous Glucose Monitor (CGM) is a small, water-resistant sensor typically worn on the arm or abdomen. It samples glucose in the interstitial fluid continuously, transmitting readings and directional trend arrows to a compatible smartphone.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-900">1. Wear the Sensor</div>
                  <div className="text-[11px] text-slate-500 mt-1">A compact sensor is applied to the skin. Wear duration is product-dependent (commonly 10–14 days).</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-900">2. Get Real-Time Data</div>
                  <div className="text-[11px] text-slate-500 mt-1">Wireless transmission updates your smartphone automatically according to device intervals.</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-900">3. Observe Trends</div>
                  <div className="text-[11px] text-slate-500 mt-1">Directional arrows show whether glucose is rising, falling, or remaining steady.</div>
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
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
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
            <div className="text-xs font-semibold text-sky-700 tracking-wider uppercase mb-1">
              Knowledge Base
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Diabetes Education
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Essential health literacy explained simply. Click any guide to read practical takeaways.
            </p>
          </div>

          <button
            onClick={() => {
              trackEvent('cta_click', { action: 'view_all_articles', page: 'home' });
              onNavigate('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-900 transition self-start sm:self-auto cursor-pointer"
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
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between p-5 sm:p-6"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="text-sky-700 font-semibold">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
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

      {/* 6. HOW MYGLUCOGUIDE CAN HELP (3 Steps) */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold text-sky-700 tracking-wider uppercase mb-1">
              Your Educational Pathway
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How MyGlucoGuide Can Help
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our 3-step approach provides the clarity needed to navigate daily life with diabetes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs relative">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-800 font-extrabold text-lg flex items-center justify-center mb-5">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">1. Learn</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Discover what blood sugar spikes mean, how traditional Pakistani foods behave, and how your body responds to daily meals.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs relative">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-800 font-extrabold text-lg flex items-center justify-center mb-5">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">2. Understand</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Look beyond isolated morning checks. Understand post-meal curves, circadian patterns, and how continuous data illustrates the full 24-hour cycle.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs relative">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-lg flex items-center justify-center mb-5">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">3. Make Better Decisions</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Have constructive conversations with your doctor, adapt family meals with practical food sequencing, and build sustainable lifestyle habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LARGE WHATSAPP CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              <MessageCircle className="w-4 h-4 fill-emerald-200 text-emerald-800" />
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

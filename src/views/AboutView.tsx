import React from 'react';
import {
  ShieldCheck,
  Target,
  Eye,
  BookOpen,
  Award,
  HeartHandshake,
  MessageCircle,
  ArrowRight,
  BookCheck,
} from 'lucide-react';
import { PageId } from '../types';
import { trackEvent, trackWhatsAppClick } from '../services/analytics';

interface AboutViewProps {
  onNavigate: (page: PageId) => void;
  onOpenWhatsApp: (source: string) => void;
  onOpenSources?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigate,
  onOpenWhatsApp,
  onOpenSources,
}) => {
  const handleHeroWhatsApp = () => {
    trackWhatsAppClick({
      sourceLocation: 'about_hero',
      page: 'about',
      ctaIdentifier: 'about-hero-whatsapp-btn',
    });
    onOpenWhatsApp('about_hero');
  };

  const handleMantraWhatsApp = () => {
    trackWhatsAppClick({
      sourceLocation: 'about_mantra_banner',
      page: 'about',
      ctaIdentifier: 'about-mantra-whatsapp-btn',
    });
    onOpenWhatsApp('about_mantra');
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO / ABOUT INTRO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-sky-600" />
            <span>About MyGlucoGuide</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Your Trusted Companion in{' '}
            <span className="text-sky-600">Diabetes Awareness</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            MyGlucoGuide is an educational and patient-focused diabetes and glucose awareness platform dedicated to helping individuals and families across Pakistan understand diabetes and the role of Continuous Glucose Monitoring (CGM) in daily health decisions.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <p className="text-sm text-slate-700 leading-relaxed">
              According to the International Diabetes Federation (IDF Diabetes Atlas, 10th edition), Pakistan had an estimated <strong>33 million adults</strong> living with diabetes, representing an estimated adult prevalence of approximately 26.7%.
            </p>
            {onOpenSources && (
              <button
                onClick={onOpenSources}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 transition cursor-pointer"
              >
                <BookCheck className="w-3.5 h-3.5" />
                <span>View IDF Diabetes Atlas Citation & Source Data</span>
              </button>
            )}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            We believe every person deserves clear, patient-friendly health education that respects local Pakistani culture, dietary realities, and family support systems.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="about-hero-whatsapp-btn"
              onClick={handleHeroWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Talk to Our Team on WhatsApp</span>
            </button>

            <button
              onClick={() => {
                trackEvent('cta_click', { action: 'about_to_cgm', page: 'about' });
                onNavigate('cgm');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition cursor-pointer"
            >
              <span>Explore CGM Insights</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Right Authentic Visual */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white aspect-4/3">
            <img
              src="/src/assets/images/about_pakistani_family_health_1790358098847.jpg"
              alt="Pakistani family learning about glucose health and lifestyle guidance together"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 2. FOUR CORE PILLARS */}
      <section className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            Our Foundation
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The 4 Pillars of MyGlucoGuide
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every educational article, pattern guide, and patient communication is guided by these principles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Awareness & Education</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Demystifying complex blood chemistry into clear, accessible language anyone can understand.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Reliable Information</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Grounded in established international clinical references and evidence-based sources.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Guidance & Support</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Direct WhatsApp communication to help you formulate questions for your physician.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Patient-Centered Outcomes</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Empowering informed everyday decisions that support cardiometabolic wellness and vitality.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To spread awareness about modern diabetes management tools like Continuous Glucose Monitoring (CGM) and help individuals across Pakistan live healthier, more informed, and confident lives.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-400">
            Educational and patient-focused diabetes and glucose awareness platform
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              A Pakistan where every person with diabetes, and every caregiver supporting an elderly family member, has access to reliable education, support, and modern monitoring technology.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-400">
            For individuals, families, and caregivers nationwide
          </div>
        </div>
      </section>

      {/* 4. BANNER QUOTE: "Better Knowledge. Better Choices. A Healthier You." */}
      <section className="bg-gradient-to-r from-sky-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white text-center shadow-lg relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-widest text-sky-300 font-semibold">
            Our Guiding Mantra
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            &ldquo;Better Knowledge. Better Choices. A Healthier You.&rdquo;
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
            Diabetes management is about having the clarity to understand how your body responds to everyday foods, and making informed choices with your physician that work for your life.
          </p>
          <div className="pt-4">
            <button
              id="about-mantra-whatsapp-btn"
              onClick={handleMantraWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-emerald-950 bg-white hover:bg-emerald-50 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 text-white" />
              <span>Connect With Us on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

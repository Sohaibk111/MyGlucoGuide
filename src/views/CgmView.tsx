import React, { useEffect, useState } from 'react';
import {
  Radio,
  Smartphone,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  Shield,
  Users,
  ChevronDown,
  Info,
} from 'lucide-react';
import { PageId } from '../types';
import { CgmComparisonTable } from '../components/CgmComparisonTable';
import { FAQS } from '../data/faqs';
import { trackEvent, trackWhatsAppClick } from '../services/analytics';

interface CgmViewProps {
  onNavigate: (page: PageId) => void;
  onOpenWhatsApp: (source: string) => void;
}

export const CgmView: React.FC<CgmViewProps> = ({
  onNavigate,
  onOpenWhatsApp,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  useEffect(() => {
    trackEvent('cgm_page_view', { page: 'cgm_educational_hub' });
  }, []);

  const handleHeroWhatsApp = () => {
    trackWhatsAppClick({
      sourceLocation: 'cgm_hero_inquiry',
      page: 'cgm',
      ctaIdentifier: 'cgm-hero-whatsapp-btn',
    });
    onOpenWhatsApp('cgm_hero');
  };

  const handleFooterWhatsApp = () => {
    trackWhatsAppClick({
      sourceLocation: 'cgm_page_footer_banner',
      page: 'cgm',
      ctaIdentifier: 'cgm-footer-whatsapp-btn',
    });
    onOpenWhatsApp('cgm_page_footer');
  };

  const cgmFaqs = FAQS.filter((f) => f.category === 'CGM' || f.category === 'Monitoring');

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
            <Radio className="w-4 h-4 text-sky-600" />
            <span>Continuous Glucose Monitoring (CGM) Guide</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Continuous Glucose Monitoring (CGM):{' '}
            <span className="text-sky-600">Educational Overview</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Continuous Glucose Monitoring provides 24-hour glucose insights, trend arrows, and pattern profiles to support informed decisions in coordination with your doctor.
          </p>

          <p className="text-sm text-slate-600 leading-relaxed">
            Unlike finger-prick checks that capture an isolated moment, a Continuous Glucose Monitor records readings day and night in the interstitial fluid, illustrating how nutrition, sleep, stress, and activity shape your curves.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="cgm-hero-whatsapp-btn"
              onClick={handleHeroWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Inquire on WhatsApp</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('how-cgm-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition cursor-pointer"
            >
              <span>How It Works</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white aspect-4/3 relative">
            <img
              src="/assets/images/cgm_upper_arm_sensor_1790517820663.webp"
              alt="Continuous Glucose Monitoring CGM sensor patch and smartphone"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 2. HOW CGM WORKS (3 Step Visual Flow) */}
      <section id="how-cgm-works" className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            General Mechanism
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How CGM Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            The technology is designed to operate continuously in the background of everyday life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                A Compact Sensor is Placed on Skin
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Using an applicator designed for straightforward placement (sensation varies by individual), a small circular sensor is applied to the upper arm or abdomen according to product labeling. A thin filament rests in the interstitial fluid.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Wear duration is product-dependent (commonly 10–14 days)
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Sends Glucose Data to Your Phone
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The sensor measures glucose concentrations and wirelessly transmits data via Bluetooth or NFC to the companion mobile app on compatible iOS or Android smartphones.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Automatic updates • Device-dependent transmission intervals
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Readings, Trends & Threshold Alerts
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your screen displays current readings alongside directional trend arrows. Customizable threshold alerts can notify you if glucose levels trend toward high or low thresholds.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Trend arrows • Data shareable with healthcare team
            </div>
          </div>
        </div>
      </section>

      {/* 3. CGM VS TRADITIONAL FINGER-PRICK MONITORING */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            Comparative Perspective
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            CGM vs Traditional Finger-Prick Monitoring
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Neither tool is universally suitable for every patient; each serves distinct clinical roles.
          </p>
        </div>

        <CgmComparisonTable />
      </section>

      {/* 4. UNDERSTANDING GLUCOSE TRENDS & ARROWS */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs">
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            Interpreting Your Data
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Understanding Glucose Trend Arrows
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Trend arrows illustrate the rate and direction of glucose change to help you and your clinician understand daytime and nocturnal dynamics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">↑↑</div>
            <div className="text-xs font-bold text-slate-900">Rising Rapidly</div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Rising &gt; 2 mg/dL per minute (often after rapidly absorbed carbohydrates).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="text-2xl font-bold text-amber-600 mb-1">↗</div>
            <div className="text-xs font-bold text-slate-900">Rising Moderately</div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Rising 1 to 2 mg/dL per minute (standard post-meal digestion pattern).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-center">
            <div className="text-2xl font-bold text-emerald-700 mb-1">→</div>
            <div className="text-xs font-bold text-emerald-950">Steady & Stable</div>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              Changing less than 1 mg/dL per minute. Indicates steady state.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="text-2xl font-bold text-amber-600 mb-1">↘</div>
            <div className="text-xs font-bold text-slate-900">Falling Moderately</div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Decreasing 1 to 2 mg/dL per minute (e.g., during light movement).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">↓↓</div>
            <div className="text-xs font-bold text-slate-900">Falling Rapidly</div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Decreasing &gt; 2 mg/dL per minute. Important alert for clinical awareness.
            </p>
          </div>
        </div>

        {/* Mandatory Time in Range Banner */}
        <div className="mt-8 p-5 rounded-2xl bg-sky-50/80 border border-sky-200 flex items-start gap-3 text-xs sm:text-sm text-sky-950">
          <Info className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Clinical Reference Note:</strong> 70–180 mg/dL is a commonly used Time in Range reference for many people with diabetes. Individual targets may vary. Discuss your glucose targets with your healthcare professional.
          </p>
        </div>
      </section>

      {/* 5. WHO MAY BENEFIT FROM CGM */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            Clinical Suitability
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Who May Benefit from CGM?
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            CGM is not suitable for or needed by every individual. Appropriateness depends on clinical diagnosis, therapy regimen, and personal goals established with your doctor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1.5">
              People with Type 1 Diabetes
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Provides continuous trend awareness that can help notify users of potential hypoglycemia, supporting safety during sleep, exercise, and daily activities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1.5">
              People with Type 2 Diabetes on Insulin
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Assists clinicians in evaluating whether insulin dosing timings align with meal schedules and overnight basal stability.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1.5">
              Caregivers & Family Members
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Family members supporting elderly parents in Pakistan can review trend reports with physicians to assess pattern stability.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1.5">
              Frequent or Unaware Hypoglycemia
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Threshold alert features can assist individuals with impaired hypoglycemia awareness by providing sound notifications as levels drop.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1.5">
              Significant Glycemic Variability
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When standard lab tests do not fully explain daytime symptoms, continuous curves can help identify hidden peaks and valleys.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <Radio className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1.5">
              Short-Term Pattern Discovery
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A single sensor wear period may be utilized under doctor supervision as an educational assessment of dietary and lifestyle habits.
            </p>
          </div>
        </div>
      </section>

      {/* 6. REALISTIC EXPECTATIONS & SENSOR NOTICE */}
      <section className="p-6 sm:p-7 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs sm:text-sm">
            <h4 className="font-bold text-amber-900 text-sm">
              Realistic Expectations & Medical Guidance
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-amber-900/90 text-xs">
              <li>
                <strong>Physiological Lag:</strong> CGM measures interstitial fluid, which naturally lags capillary blood glucose by roughly 5 to 10 minutes during rapid changes.
              </li>
              <li>
                <strong>Informational Tool:</strong> CGM is a monitoring tool, not a treatment, automated delivery system, or cure. Clinical management requires physician consultation.
              </li>
              <li>
                <strong>Finger Prick Verification:</strong> Always confirm with a finger-prick blood test if symptoms do not match sensor readings or if you suspect rapid hypoglycemia.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="space-y-4">
        <div>
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            Common Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            CGM in Pakistan: Questions & Answers
          </h2>
        </div>

        <div className="space-y-3">
          {cgmFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`cgm-faq-answer-${faq.id}`}
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
                  <div
                    id={`cgm-faq-answer-${faq.id}`}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. WHATSAPP CTA BANNER */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Want to Know if CGM is Right for You?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
            Talk to our team on WhatsApp for educational guidance, sensor compatibility with your phone, and authorized availability across Pakistan.
          </p>
          <div className="pt-2">
            <button
              id="cgm-footer-whatsapp-btn"
              onClick={handleFooterWhatsApp}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-emerald-950 bg-white hover:bg-emerald-50 active:scale-[0.98] shadow-md transition cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

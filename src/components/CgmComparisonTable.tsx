import React from 'react';
import { Check, HelpCircle } from 'lucide-react';

export const CgmComparisonTable: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Measurement Frequency',
      traditional: 'Point-in-time snapshot each time a manual test is performed (e.g. fasting, pre-meal)',
      cgm: 'Automatic readings recorded continuously throughout the day and night (product-dependent intervals)',
      advantage: 'cgm',
    },
    {
      feature: 'Sample Analyzed',
      traditional: 'Capillary whole blood sampled from finger prick',
      cgm: 'Interstitial fluid sampled from subcutaneous tissue (normal physiological lag time applies)',
      advantage: 'neutral',
    },
    {
      feature: 'Trend Direction & Velocity',
      traditional: 'Displays current numerical reading without directional trend indication',
      cgm: 'Real-time arrows indicate whether glucose is rising, falling, or remaining stable',
      advantage: 'cgm',
    },
    {
      feature: 'Overnight & Sleep Observation',
      traditional: 'Requires waking up and manual blood testing',
      cgm: 'Monitors continuously during sleep; customizable alerts can signal high or low thresholds',
      advantage: 'cgm',
    },
    {
      feature: 'Application & Routine Routine',
      traditional: 'Periodic finger pricks throughout the day as advised by doctor',
      cgm: 'Single application per sensor session (wear duration product-dependent, commonly 10–14 days)',
      advantage: 'cgm',
    },
    {
      feature: 'Pattern Insights',
      traditional: 'Provides discrete data points requiring manual logging and interpretation',
      cgm: 'Generates comprehensive 24-hour ambulatory glucose profile (AGP) curves and time in range',
      advantage: 'cgm',
    },
    {
      feature: 'Clinical Role',
      traditional: 'Essential cornerstone of clinical care; universally accessible; needed for calibration & confirmation',
      cgm: 'Advanced pattern tracking technology; complements rather than replaces finger-prick testing',
      advantage: 'neutral',
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-surface rounded-2xl border border-line/90 shadow-sm">
      <div className="p-5 sm:p-6 bg-surface-2 border-b border-line/80">
        <h3 className="text-lg font-bold text-fg tracking-tight">
          Objective Educational Comparison: Blood Glucose Meter vs. Continuous Glucose Monitor (CGM)
        </h3>
        <p className="text-xs sm:text-sm text-fg-3 mt-1">
          Both tools offer distinct clinical advantages. Understanding their complementary roles helps you have informed conversations with your healthcare provider.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line text-xs font-semibold text-fg-4 uppercase tracking-wider bg-surface-2/50">
              <th className="py-3.5 px-4 sm:px-6 w-1/3">Factor / Capability</th>
              <th className="py-3.5 px-4 sm:px-6 w-1/3 text-fg-2">
                Traditional Finger-Prick Meter
              </th>
              <th className="py-3.5 px-4 sm:px-6 w-1/3 text-sky-900 dark:text-sky-100 bg-sky-50/50 dark:bg-sky-400/10">
                Continuous Glucose Monitor (CGM)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft text-xs sm:text-sm text-fg-2">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-surface-2/80 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-fg align-top">
                  {row.feature}
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-fg-3 align-top leading-relaxed">
                  {row.traditional}
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-fg bg-sky-50/30 dark:bg-sky-400/10 font-medium align-top leading-relaxed">
                  <div className="flex items-start gap-2">
                    {row.advantage === 'cgm' && (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-300 shrink-0 mt-0.5" />
                    )}
                    <span>{row.cgm}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 sm:p-5 bg-surface-2/70 border-t border-line-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-fg-3">
        <div className="flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-fg-5 shrink-0 mt-0.5" />
          <span>
            <strong>Clinical Notice:</strong> CGM does not universally replace blood glucose meters. Standard meters remain required for calibration, confirmation during rapid glucose shifts, or whenever symptoms differ from sensor readings. Discuss your personal monitoring approach with your physician.
          </span>
        </div>
      </div>
    </div>
  );
};

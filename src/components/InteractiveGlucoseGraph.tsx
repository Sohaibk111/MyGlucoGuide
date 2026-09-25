import React, { useState } from 'react';
import { Activity, Clock, Utensils, Footprints, AlertCircle, Info } from 'lucide-react';

interface DataPoint {
  time: string;
  hour: number;
  value: number;
  event?: string;
  note: string;
}

interface Scenario {
  id: string;
  name: string;
  label: string;
  description: string;
  summary: string;
  timeInRange: number; // percentage
  averageGlucose: number;
  points: DataPoint[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'balanced',
    name: 'Balanced Meal + Light Walk Example',
    label: 'Balanced Plate & Light Walk',
    description: 'Whole wheat roti, fiber-rich salad first, lentil daal, followed by a light 15-minute walk.',
    summary: 'Illustrates how meal sequencing and physical movement often produce a more gradual post-meal curve.',
    timeInRange: 96,
    averageGlucose: 122,
    points: [
      { time: '06:00', hour: 6, value: 92, event: 'Waking Up', note: 'Fasting glucose baseline.' },
      { time: '08:00', hour: 8, value: 98, event: 'Breakfast', note: 'Whole wheat chapati, boiled egg, unsweetened tea.' },
      { time: '09:30', hour: 9.5, value: 138, event: '1.5 hr Post-Meal', note: 'Gradual, moderate post-meal curve.' },
      { time: '11:30', hour: 11.5, value: 110, event: 'Midday', note: 'Gradual return toward baseline.' },
      { time: '13:30', hour: 13.5, value: 104, event: 'Lunch with Salad', note: 'Kachumber salad eaten before daal and small roti.' },
      { time: '14:30', hour: 14.5, value: 132, event: '15-Min Walk', note: 'Light walking supports muscular glucose uptake.' },
      { time: '16:30', hour: 16.5, value: 108, event: 'Late Afternoon', note: 'Steady daytime reading.' },
      { time: '19:30', hour: 19.5, value: 112, event: 'Dinner', note: 'Grilled protein, vegetable sabzi, and controlled grain portion.' },
      { time: '21:00', hour: 21, value: 142, event: 'Post Dinner', note: 'Moderate elevation within standard reference bounds.' },
      { time: '23:30', hour: 23.5, value: 102, event: 'Bedtime', note: 'Nighttime baseline.' },
    ],
  },
  {
    id: 'high-carb',
    name: 'Refined Carbohydrate Meal Example',
    label: 'Refined Carbs (Biryani / Mithai)',
    description: 'Large portion of white rice biryani, paratha, sweetened beverage, followed by sedentary rest.',
    summary: 'Illustrates how rapidly absorbed carbohydrates without fiber can produce a steep post-meal peak.',
    timeInRange: 58,
    averageGlucose: 168,
    points: [
      { time: '06:00', hour: 6, value: 115, event: 'Waking Up', note: 'Fasting reading.' },
      { time: '08:00', hour: 8, value: 125, event: 'Breakfast', note: 'Refined flour paratha with sweet tea.' },
      { time: '09:30', hour: 9.5, value: 195, event: 'Post-Breakfast Peak', note: 'Rise above standard 180 reference value.' },
      { time: '11:30', hour: 11.5, value: 155, event: 'Slow Clearance', note: 'Elevated post-meal plateau.' },
      { time: '13:30', hour: 13.5, value: 140, event: 'Heavy Rice Lunch', note: 'Plate of biryani eaten without salad or fiber.' },
      { time: '15:00', hour: 15, value: 238, event: 'High Peak (238 mg/dL)', note: 'Significant acute glucose elevation.' },
      { time: '17:00', hour: 17, value: 185, event: 'Extended Decline', note: 'Slow clearance from the bloodstream.' },
      { time: '19:30', hour: 19.5, value: 160, event: 'Dinner with Sweet', note: 'Traditional dinner ending with traditional sweet.' },
      { time: '21:30', hour: 21.5, value: 220, event: 'Late Night High', note: 'Sustained late evening elevation.' },
      { time: '23:30', hour: 23.5, value: 175, event: 'Bedtime', note: 'Elevated bedtime reading.' },
    ],
  },
  {
    id: 'overnight',
    name: 'Circadian & Dawn Phenomenon Pattern',
    label: 'Overnight & Dawn Pattern',
    description: 'Observing sleep hours, overnight stability, and early morning liver glucose release.',
    summary: 'Demonstrates how continuous tracking visualizes the natural 4:00 AM – 7:00 AM circadian output.',
    timeInRange: 88,
    averageGlucose: 116,
    points: [
      { time: '00:00', hour: 0, value: 108, event: 'Midnight Sleep', note: 'Restful nocturnal reading.' },
      { time: '02:00', hour: 2, value: 96, event: 'Deep Sleep', note: 'Stable overnight glucose.' },
      { time: '04:00', hour: 4, value: 92, event: 'Pre-Dawn Nadir', note: 'Low point of overnight cycle.' },
      { time: '05:30', hour: 5.5, value: 128, event: 'Dawn Phenomenon', note: 'Natural circadian glucose release by the liver.' },
      { time: '07:00', hour: 7, value: 135, event: 'Waking Baseline', note: 'Fasting reading influenced by morning hormones.' },
      { time: '08:30', hour: 8.5, value: 120, event: 'Light Breakfast', note: 'Post-breakfast stabilization.' },
      { time: '12:00', hour: 12, value: 105, event: 'Midday', note: 'Daytime equilibrium.' },
    ],
  },
];

export const InteractiveGlucoseGraph: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('balanced');
  const [activePointIndex, setActivePointIndex] = useState<number>(2);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  const activePoint = scenario.points[activePointIndex] || scenario.points[0];

  const svgWidth = 720;
  const svgHeight = 280;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const minVal = 60;
  const maxVal = 260;

  const minHour = scenario.points[0].hour;
  const maxHour = scenario.points[scenario.points.length - 1].hour;

  const getX = (hour: number) => {
    return paddingLeft + ((hour - minHour) / (maxHour - minHour)) * chartWidth;
  };

  const getY = (val: number) => {
    return paddingTop + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;
  };

  const targetBottomY = getY(70);
  const targetTopY = getY(180);

  const pathD = scenario.points.reduce((acc, pt, idx, arr) => {
    const x = getX(pt.hour);
    const y = getY(pt.value);
    if (idx === 0) return `M ${x} ${y}`;
    const prev = arr[idx - 1];
    const prevX = getX(prev.hour);
    const prevY = getY(prev.value);
    const midX = (prevX + x) / 2;
    return `${acc} C ${midX} ${prevY}, ${midX} ${y}, ${x} ${y}`;
  }, '');

  const firstPoint = scenario.points[0];
  const lastPoint = scenario.points[scenario.points.length - 1];
  const fillD = `${pathD} L ${getX(lastPoint.hour)} ${getY(minVal)} L ${getX(firstPoint.hour)} ${getY(minVal)} Z`;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
      {/* Header and Interactive Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4 text-sky-600" />
            <span>Glucose Pattern Education</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Understand Your Glucose Patterns
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Continuous monitoring illustrates dynamic 24-hour trends. Select illustrative patterns below to observe how curves vary.
          </p>
        </div>

        {/* Scenario Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start lg:self-auto">
          {SCENARIOS.map((s) => {
            const isSelected = s.id === selectedScenarioId;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedScenarioId(s.id);
                  setActivePointIndex(2);
                }}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mandatory Reference Range Notice Banner */}
      <div className="my-5 p-3.5 sm:p-4 rounded-xl bg-sky-50/80 border border-sky-200/80 flex items-start gap-3 text-xs sm:text-sm text-sky-950">
        <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Clinical Reference Note:</strong> 70–180 mg/dL is a commonly used Time in Range reference for many people with diabetes. Individual targets may vary. Discuss your glucose targets with your healthcare professional.
        </p>
      </div>

      {/* Metric Summaries */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-[11px] font-medium text-slate-500">Selected Pattern</div>
          <div className="text-sm font-bold text-slate-900 truncate mt-0.5">{scenario.name}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-[11px] font-medium text-slate-500">In Reference (70–180)</div>
          <div className="text-sm font-bold text-emerald-700 mt-0.5 tabular-nums">
            {scenario.timeInRange}% in Reference Band
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-[11px] font-medium text-slate-500">Pattern Average</div>
          <div className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums">
            {scenario.averageGlucose} mg/dL
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-100">
          <div className="text-[11px] font-medium text-sky-800">Inspected Reading</div>
          <div className="text-sm font-bold text-sky-950 mt-0.5 tabular-nums">
            {activePoint.value} mg/dL <span className="text-xs font-normal text-sky-700">at {activePoint.time}</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-x-auto overflow-y-hidden bg-slate-950/2 rounded-xl border border-slate-100 p-2 sm:p-4">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto min-w-[560px] select-none"
        >
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Reference Zone Shading (70 to 180 mg/dL) */}
          <rect
            x={paddingLeft}
            y={targetTopY}
            width={chartWidth}
            height={targetBottomY - targetTopY}
            fill="#10b981"
            fillOpacity="0.08"
          />

          {/* Reference Line: 180 mg/dL */}
          <line
            x1={paddingLeft}
            y1={targetTopY}
            x2={svgWidth - paddingRight}
            y2={targetTopY}
            stroke="#10b981"
            strokeDasharray="4 4"
            strokeWidth="1.2"
          />
          <text
            x={paddingLeft - 8}
            y={targetTopY + 4}
            fontSize="10"
            fill="#059669"
            textAnchor="end"
            className="font-mono tabular-nums font-semibold"
          >
            180
          </text>
          <text
            x={svgWidth - paddingRight - 6}
            y={targetTopY - 6}
            fontSize="9"
            fill="#059669"
            textAnchor="end"
            className="font-medium"
          >
            Common Reference Upper (180 mg/dL)
          </text>

          {/* Reference Line: 70 mg/dL */}
          <line
            x1={paddingLeft}
            y1={targetBottomY}
            x2={svgWidth - paddingRight}
            y2={targetBottomY}
            stroke="#f59e0b"
            strokeDasharray="4 4"
            strokeWidth="1.2"
          />
          <text
            x={paddingLeft - 8}
            y={targetBottomY + 4}
            fontSize="10"
            fill="#d97706"
            textAnchor="end"
            className="font-mono tabular-nums font-semibold"
          >
            70
          </text>
          <text
            x={svgWidth - paddingRight - 6}
            y={targetBottomY + 14}
            fontSize="9"
            fill="#d97706"
            textAnchor="end"
            className="font-medium"
          >
            Common Reference Lower (70 mg/dL)
          </text>

          {/* 240 mg/dL Grid Line */}
          <line
            x1={paddingLeft}
            y1={getY(240)}
            x2={svgWidth - paddingRight}
            y2={getY(240)}
            stroke="#cbd5e1"
            strokeDasharray="2 4"
            strokeWidth="0.8"
          />
          <text
            x={paddingLeft - 8}
            y={getY(240) + 4}
            fontSize="10"
            fill="#94a3b8"
            textAnchor="end"
            className="font-mono tabular-nums"
          >
            240
          </text>

          {/* Area Fill */}
          <path d={fillD} fill="url(#curveGradient)" />

          {/* Main Curve */}
          <path
            d={pathD}
            fill="none"
            stroke="#0284c7"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {scenario.points.map((pt, idx) => {
            const x = getX(pt.hour);
            const y = getY(pt.value);
            const isSelected = idx === activePointIndex;
            const isAboveRef = pt.value > 180;

            return (
              <g
                key={idx}
                className="cursor-pointer transition-all"
                onClick={() => setActivePointIndex(idx)}
              >
                <circle cx={x} cy={y} r="16" fill="transparent" />

                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r="9"
                    fill={isAboveRef ? '#f59e0b' : '#0284c7'}
                    fillOpacity="0.2"
                    className="animate-pulse"
                  />
                )}

                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? '5.5' : '4'}
                  fill={isAboveRef ? '#d97706' : '#0284c7'}
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                <text
                  x={x}
                  y={svgHeight - 12}
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                  className="font-mono tabular-nums"
                >
                  {pt.time}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Data Point Highlight Card */}
      <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">
              Time Point: <span className="font-semibold text-slate-800">{activePoint.time}</span>
              {activePoint.event && (
                <span className="ml-2 px-2 py-0.5 rounded bg-slate-200/70 text-slate-800 text-[11px] font-medium">
                  {activePoint.event}
                </span>
              )}
            </div>
            <div className="text-sm font-semibold text-slate-900 mt-0.5">
              {activePoint.note}
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[11px] text-slate-500">Glucose Reading</div>
          <div className={`text-lg font-bold tabular-nums ${activePoint.value > 180 ? 'text-amber-700' : 'text-sky-700'}`}>
            {activePoint.value} <span className="text-xs font-normal text-slate-500">mg/dL</span>
          </div>
        </div>
      </div>

      {/* Educational 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-7 pt-7 border-t border-slate-100">
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-sky-200 transition">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Before-Meal Glucose</h4>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            The starting baseline before meals. General clinical guidelines often cite 80–130 mg/dL for non-pregnant adults; individual goals must be set with your physician.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-sky-200 transition">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <Utensils className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">After-Meal Changes</h4>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Glucose naturally rises and peaks 1 to 2 hours after meals. Many guidelines reference keeping post-meal levels under 180 mg/dL. Personal goals vary.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-sky-200 transition">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <Activity className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Daily Patterns</h4>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Circadian hormones, the early morning Dawn Phenomenon, and sleep quality naturally shape glucose rhythms over 24 hours.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-sky-200 transition">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Footprints className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Lifestyle Factors</h4>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Food sequencing, hydration, stress management, and light post-meal movement can help moderate post-prandial glucose curves.
          </p>
        </div>
      </div>
    </div>
  );
};

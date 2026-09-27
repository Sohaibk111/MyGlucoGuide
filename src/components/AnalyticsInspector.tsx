import React, { useState, useEffect } from 'react';
import { X, Activity, RefreshCw, CheckCircle2, Copy, Shield, Tag } from 'lucide-react';
import { getRecentEvents, subscribeToAnalytics, getPreservedUtms } from '../services/analytics';
import { TrackingEvent, UtmParameters } from '../types';

interface AnalyticsInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsInspector: React.FC<AnalyticsInspectorProps> = ({
  isOpen,
  onClose,
}) => {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [utms, setUtms] = useState<UtmParameters>({});
  const [copied, setCopied] = useState(false);

  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  const isPixelConfigured = Boolean(pixelId && pixelId.trim() !== '');

  useEffect(() => {
    setEvents(getRecentEvents());
    setUtms(getPreservedUtms());
    const unsubscribe = subscribeToAnalytics(() => {
      setEvents(getRecentEvents());
      setUtms(getPreservedUtms());
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLog = () => {
    navigator.clipboard.writeText(JSON.stringify({ events, utms }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4" role="presentation">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="analytics-inspector-title">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 id="analytics-inspector-title" className="text-base font-bold text-white">
                Meta Pixel & Analytics Event Inspector
              </h3>
              <p className="text-xs text-slate-400">
                Live verification of tracked interactions, UTM preservation & Meta Pixel readiness
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Readiness Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="text-[11px] text-slate-400">Meta Pixel</div>
            <div className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isPixelConfigured ? `Active (${pixelId})` : 'Ready (VITE_META_PIXEL_ID)'}</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="text-[11px] text-slate-400">GTM dataLayer</div>
            <div className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Active</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="text-[11px] text-slate-400">UTM Preservation</div>
            <div className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>sessionStorage</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="text-[11px] text-slate-400">Total Fired</div>
            <div className="font-semibold text-sky-400 mt-0.5 tabular-nums">
              {events.length} events
            </div>
          </div>
        </div>

        {/* Active Preserved UTMs */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs mb-4">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1">
            <Tag className="w-3.5 h-3.5 text-sky-400" />
            <span>Preserved UTM Ad Parameters:</span>
          </div>
          {Object.keys(utms).length === 0 ? (
            <p className="text-slate-500 text-[11px]">
              No active UTM parameters in this session. (Test by loading with e.g. <code className="text-sky-300">?utm_source=facebook&amp;utm_campaign=diabetes_awareness</code>)
            </p>
          ) : (
            <div className="font-mono text-[11px] text-sky-300 space-y-0.5">
              {Object.entries(utms).map(([k, v]) => (
                <div key={k}>
                  <span className="text-slate-400">{k}:</span> {v}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Event Stream */}
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Recent Event Stream (Newest first)</span>
            <button
              onClick={handleCopyLog}
              className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied JSON!' : 'Copy Event Log'}</span>
            </button>
          </div>

          <div className="bg-slate-950 rounded-xl p-3 max-h-64 overflow-y-auto font-mono text-xs text-slate-300 border border-slate-800 space-y-2">
            {events.length === 0 ? (
              <p className="text-slate-500 py-4 text-center font-sans text-xs">
                No events recorded yet. Click on WhatsApp buttons, articles, or navigation to see live dispatch.
              </p>
            ) : (
              events.map((ev, i) => (
                <div key={i} className="p-2 rounded bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-2">
                  <div>
                    <span className="text-emerald-400 font-bold">{ev.eventName}</span>
                    {ev.params && (
                      <pre className="text-[11px] text-slate-400 mt-1 whitespace-pre-wrap font-sans">
                        {JSON.stringify(ev.params, null, 1)}
                      </pre>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0 tabular-nums">
                    {ev.timestamp}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

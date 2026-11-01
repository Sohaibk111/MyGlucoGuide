import { TrackingEvent, UtmParameters } from '../types';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
    dataLayer?: any[];
    _myGlucoUtms?: UtmParameters;
  }
}

const UTM_STORAGE_KEY = 'myglucoguide_utm_params';
const CONSENT_KEY = 'myglucoguide_meta_consent';
let initializedPixelId: string | null = null;

export function hasMetaConsent(): boolean {
  try { return typeof window !== 'undefined' && localStorage.getItem(CONSENT_KEY) === 'accepted'; }
  catch { return false; }
}

export function setMetaConsent(accepted: boolean): void {
  try {
    if (accepted) localStorage.setItem(CONSENT_KEY, 'accepted');
    else localStorage.removeItem(CONSENT_KEY);
  } catch { /* storage unavailable: tracking stays off */ }
  if (accepted) initMetaPixel();
}

function isMetaTrackingEnabled(): boolean {
  return import.meta.env.VITE_META_PIXEL_ENABLED === 'true';
}

export function initUtmTracking(): UtmParameters {
  if (typeof window === 'undefined') return {};
  const utms: UtmParameters = {};
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const keys: (keyof UtmParameters)[] = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
    let hasNewUtm = false;
    keys.forEach((key) => { const val = urlParams.get(key); if (val) { utms[key] = val; hasNewUtm = true; } });
    if (hasNewUtm) sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));
    else { const stored = sessionStorage.getItem(UTM_STORAGE_KEY); if (stored) Object.assign(utms, JSON.parse(stored)); }
    window._myGlucoUtms = utms;
  } catch { /* ignore storage errors */ }
  return utms;
}

export function getPreservedUtms(): UtmParameters {
  if (typeof window === 'undefined') return {};
  if (window._myGlucoUtms) return window._myGlucoUtms;
  try { const stored = sessionStorage.getItem(UTM_STORAGE_KEY); if (stored) { const parsed = JSON.parse(stored); window._myGlucoUtms = parsed; return parsed; } } catch { /* ignore */ }
  return {};
}

export function trackMetaPageView(): void {
  if (typeof window === 'undefined' || !isMetaTrackingEnabled() || !hasMetaConsent()) return;
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (typeof pixelId !== 'string' || !/^\\d+$/.test(pixelId.trim())) return;
  if (initializedPixelId !== pixelId.trim() || typeof window.fbq !== 'function') return;
  window.fbq('track', 'PageView');
}

export function initMetaPixel(): void {
  if (typeof window === 'undefined' || !isMetaTrackingEnabled() || !hasMetaConsent()) return;
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (typeof pixelId !== 'string' || !/^\d+$/.test(pixelId.trim())) return;
  const cleanId = pixelId.trim();
  if (initializedPixelId === cleanId || typeof window.fbq === 'function') return;

  const fbq: any = function (...args: any[]) { if (fbq.callMethod) fbq.callMethod.apply(fbq, args); else fbq.queue.push(args); };
  fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
  window.fbq = fbq; window._fbq = fbq;
  const script = document.createElement('script');
  script.async = true; script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.onerror = () => { initializedPixelId = null; };
  document.head.appendChild(script);
  // Disable automatic configuration and matching; only a generic PageView is sent.
  fbq('set', 'autoConfig', false, cleanId);
  fbq('init', cleanId);
  fbq('track', 'PageView');
  initializedPixelId = cleanId;
}

const recentEvents: TrackingEvent[] = [];
const listeners: Array<(event: TrackingEvent) => void> = [];

export function trackEvent(eventName: TrackingEvent['eventName'], params?: Record<string, any>): void {
  const utms = getPreservedUtms();
  const mergedParams = { ...params, ...(Object.keys(utms).length ? { utms } : {}) };
  const event: TrackingEvent = { eventName, params: mergedParams, timestamp: new Date().toLocaleTimeString() };
  recentEvents.unshift(event); if (recentEvents.length > 50) recentEvents.pop();
  if (typeof window !== 'undefined') {
    if (import.meta.env.DEV) (window as any)._myGlucoEvents = recentEvents;
    window.dispatchEvent(new CustomEvent('myglucoguide:analytics', { detail: event }));
  }
  listeners.forEach((fn) => fn(event));
  if (import.meta.env.DEV) console.debug('[MyGlucoGuide Analytics]', eventName, mergedParams);
}

export function trackWhatsAppClick(options: { sourceLocation: string; page: string; ctaIdentifier: string; additionalParams?: Record<string, any> }): void {
  trackEvent('whatsapp_click', { source_location: options.sourceLocation, page: options.page, cta_identifier: options.ctaIdentifier, ...options.additionalParams });
}

export function subscribeToAnalytics(callback: (event: TrackingEvent) => void) {
  listeners.push(callback);
  return () => { const idx = listeners.indexOf(callback); if (idx !== -1) listeners.splice(idx, 1); };
}
export function getRecentEvents(): TrackingEvent[] { return [...recentEvents]; }

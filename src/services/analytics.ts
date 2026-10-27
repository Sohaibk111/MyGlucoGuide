import { TrackingEvent, UtmParameters } from '../types';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
    dataLayer?: any[];
    _myGlucoEvents?: TrackingEvent[];
    _myGlucoUtms?: UtmParameters;
  }
}

const UTM_STORAGE_KEY = 'myglucoguide_utm_params';

/**
 * Meta tracking is deliberately opt-in. Keep it disabled while the dataset
 * category/restriction review is pending and until outbound events are audited.
 * Set VITE_META_PIXEL_ENABLED="true" only after reviewing Meta's decision and
 * confirming that all events/parameters comply with the restrictions shown.
 */
function isMetaTrackingEnabled(): boolean {
  return import.meta.env.VITE_META_PIXEL_ENABLED === 'true';
}

/**
 * Extract and preserve UTM parameters from current URL into sessionStorage
 */
export function initUtmTracking(): UtmParameters {
  if (typeof window === 'undefined') return {};

  const utms: UtmParameters = {};
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const keys: (keyof UtmParameters)[] = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
    ];

    let hasNewUtm = false;
    keys.forEach((key) => {
      const val = urlParams.get(key);
      if (val) {
        utms[key] = val;
        hasNewUtm = true;
      }
    });

    if (hasNewUtm) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));
    } else {
      const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
      if (stored) {
        Object.assign(utms, JSON.parse(stored));
      }
    }

    window._myGlucoUtms = utms;
  } catch (e) {
    console.debug('UTM tracking init warning:', e);
  }

  return utms;
}

export function getPreservedUtms(): UtmParameters {
  if (typeof window === 'undefined') return {};
  if (window._myGlucoUtms) return window._myGlucoUtms;
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      window._myGlucoUtms = parsed;
      return parsed;
    }
  } catch (e) {
    // ignore
  }
  return {};
}

/**
 * Initializes Meta Pixel if environment variable VITE_META_PIXEL_ID is defined and non-empty.
 * If absent, functions normally as a no-op without errors.
 */
export function initMetaPixel(): void {
  if (typeof window === 'undefined' || !isMetaTrackingEnabled()) return;

  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (!pixelId || typeof pixelId !== 'string' || pixelId.trim() === '') {
    // Pixel ID not provided; skip initialization cleanly
    return;
  }

  const cleanId = pixelId.trim();

  // Standard Meta Pixel snippet injection
  if (!window.fbq) {
    const fbq: any = function (...args: any[]) {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, args);
      } else {
        fbq.queue.push(args);
      }
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  try {
    if (isMetaTrackingEnabled() && typeof window.fbq === 'function') {
      window.fbq('init', cleanId);
      window.fbq('track', 'PageView');
    }
  } catch (e) {
    console.warn('Meta Pixel initialization notice:', e);
  }
}

// In-memory log of tracked events for transparent verification
const recentEvents: TrackingEvent[] = [];
const listeners: Array<(event: TrackingEvent) => void> = [];

export function trackEvent(
  eventName: TrackingEvent['eventName'],
  params?: Record<string, any>
): void {
  const utms = getPreservedUtms();
  const mergedParams: Record<string, any> = {
    ...params,
    ...(Object.keys(utms).length > 0 ? { utms } : {}),
  };

  const event: TrackingEvent = {
    eventName,
    params: mergedParams,
    timestamp: new Date().toLocaleTimeString(),
  };

  recentEvents.unshift(event);
  if (recentEvents.length > 50) recentEvents.pop();

  if (typeof window !== 'undefined') {
    window._myGlucoEvents = recentEvents;

    // Meta tracking remains disabled unless explicitly enabled after policy review.
    // Do not send health-content, article, contact, purchase, or WhatsApp intent events
    // or event parameters to Meta from this educational health website.
    // If enabled for an approved configuration, only a generic PageView is sent at init.

    // Trigger standard dataLayer push for GTM if available
    if (isMetaTrackingEnabled() && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...mergedParams,
      });
    }

    // Dispatch DOM event for custom integrations
    window.dispatchEvent(
      new CustomEvent('myglucoguide:analytics', {
        detail: event,
      })
    );
  }

  // Notify listeners
  listeners.forEach((fn) => fn(event));

  console.log(`[MyGlucoGuide Analytics] Event: ${eventName}`, mergedParams);
}

/**
 * Dedicated robust tracking helper for WhatsApp CTAs
 */
export function trackWhatsAppClick(options: {
  sourceLocation: string;
  page: string;
  ctaIdentifier: string;
  additionalParams?: Record<string, any>;
}): void {
  trackEvent('whatsapp_click', {
    source_location: options.sourceLocation,
    page: options.page,
    cta_identifier: options.ctaIdentifier,
    ...options.additionalParams,
  });
}

export function subscribeToAnalytics(callback: (event: TrackingEvent) => void) {
  listeners.push(callback);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function getRecentEvents(): TrackingEvent[] {
  return [...recentEvents];
}

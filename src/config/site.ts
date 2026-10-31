// Canonical public site origin. Override only when intentionally changing production domain.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://myglucoguide.online').replace(/\/$/, '');

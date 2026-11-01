import React, { useState, useEffect, lazy, Suspense } from 'react';
import { PageId, Article } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppModal } from './components/WhatsAppModal';
import { ArticleModal } from './components/ArticleModal';
import { SourcesModal } from './components/SourcesModal';
import { HomeView } from './views/HomeView';
import { MessageCircle } from 'lucide-react';
import { initUtmTracking, initMetaPixel, trackWhatsAppClick, getMetaConsentState, setMetaConsent } from './services/analytics';
import { usePageSEO } from './hooks/usePageSEO';
import { ARTICLES } from './data/articles';
import { useStructuredData } from './hooks/useStructuredData';
import { SeoInternalLinks } from './components/SeoInternalLinks';

// Route-level code splitting: secondary views lazy-loaded on demand
const AboutView = lazy(() => import('./views/AboutView').then((m) => ({ default: m.AboutView })));
const EducationView = lazy(() => import('./views/EducationView').then((m) => ({ default: m.EducationView })));
const CgmView = lazy(() => import('./views/CgmView').then((m) => ({ default: m.CgmView })));
const BlogView = lazy(() => import('./views/BlogView').then((m) => ({ default: m.BlogView })));
const FaqView = lazy(() => import('./views/FaqView').then((m) => ({ default: m.FaqView })));
const ContactView = lazy(() => import('./views/ContactView').then((m) => ({ default: m.ContactView })));
const PurchaseView = lazy(() => import('./views/PurchaseView').then((m) => ({ default: m.PurchaseView })));

function ViewLoadingFallback() {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="min-h-[50vh] flex flex-col items-center justify-center p-8"
    >
      <div className="w-9 h-9 border-3 border-emerald-200 dark:border-emerald-400/25 border-t-emerald-600 rounded-full animate-spin mb-3" />
      <p className="text-xs font-semibold uppercase tracking-wider text-fg-5">
        Loading...
      </p>
    </div>
  );
}

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const validPages: PageId[] = ['home', 'about', 'education', 'cgm', 'blog', 'faq', 'contact', 'purchase'];
  if (validPages.includes(hash as PageId)) {
    return hash as PageId;
  }
  const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
  if (validPages.includes(path as PageId)) {
    return path as PageId;
  }
  if (ARTICLES.some((article) => article.slug === path)) {
    return 'blog';
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [showMetaConsent, setShowMetaConsent] = useState(() => import.meta.env.VITE_META_PIXEL_ENABLED === 'true' && getMetaConsentState() === 'unset');
  const [whatsAppSource, setWhatsAppSource] = useState('direct');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
    return ARTICLES.find((article) => article.slug === path) || null;
  });
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [articleReturnUrl, setArticleReturnUrl] = useState<string | null>(null);

  usePageSEO(currentPage, selectedArticle);
  useStructuredData(currentPage, selectedArticle);

  useEffect(() => {
    // Preserve any UTM parameters from landing query string
    initUtmTracking();
    // Initialize Meta Pixel if VITE_META_PIXEL_ID is present
    initMetaPixel();

    // Listen for browser navigation (back/forward and hash changes)
    const handleLocationChange = () => {
      const page = getInitialPage();
      const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
      const article = ARTICLES.find((item) => item.slug === path) || null;
      setCurrentPage(page);
      setSelectedArticle(article);
      setArticleReturnUrl(null);
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    const handleManageConsent = () => setShowMetaConsent(true);
    window.addEventListener('myglucoguide:manage-consent', handleManageConsent);


    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('myglucoguide:manage-consent', handleManageConsent);
    };
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    const targetPath = page === 'home' ? '/' : `/${page}`;
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    if (currentPath !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWhatsApp = (source: string) => {
    setWhatsAppSource(source);
    setIsWhatsAppOpen(true);
  };

  const handleFloatingWhatsApp = () => {
    trackWhatsAppClick({
      sourceLocation: 'floating_widget',
      page: currentPage,
      ctaIdentifier: 'floating-whatsapp-widget',
    });
    const message = encodeURIComponent(
      'Assalam-o-Alaikum MyGlucoGuide, mujhe glucose awareness aur CGM options ke bare mein maloomat chahiye.'
    );
    const configuredNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').trim();
    if (/^\d{8,15}$/.test(configuredNumber)) {
      window.open(`https://wa.me/${configuredNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-fg font-sans selection:bg-sky-100 dark:selection:bg-sky-400/15 selection:text-sky-900 dark:selection:text-sky-100">
      {/* Sticky Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenWhatsApp={handleOpenWhatsApp}
            onSelectArticle={(art) => {
              setArticleReturnUrl(`${window.location.pathname}${window.location.search}${window.location.hash}`);
              setSelectedArticle(art);
              window.history.pushState({ articleSlug: art.slug }, '', `/${art.slug}`);
            }}
          />
        )}

        <Suspense fallback={<ViewLoadingFallback />}>
          {currentPage === 'about' && (
            <AboutView
              onNavigate={handleNavigate}
              onOpenWhatsApp={handleOpenWhatsApp}
              onOpenSources={() => setIsSourcesOpen(true)}
            />
          )}

          {currentPage === 'education' && (
            <EducationView
              onNavigate={handleNavigate}
              onOpenWhatsApp={handleOpenWhatsApp}
              onSelectArticle={(art) => {
                setArticleReturnUrl(`${window.location.pathname}${window.location.search}${window.location.hash}`);
                setSelectedArticle(art);
                window.history.pushState({ articleSlug: art.slug }, '', `/${art.slug}`);
              }}
            />
          )}

          {currentPage === 'cgm' && (
            <CgmView
              onNavigate={handleNavigate}
              onOpenWhatsApp={handleOpenWhatsApp}
            />
          )}

          {currentPage === 'blog' && (
            <BlogView
              onSelectArticle={(art) => {
                setArticleReturnUrl(`${window.location.pathname}${window.location.search}${window.location.hash}`);
                setSelectedArticle(art);
                window.history.pushState({ articleSlug: art.slug }, '', `/${art.slug}`);
              }}
              onOpenWhatsApp={handleOpenWhatsApp}
            />
          )}

          {currentPage === 'faq' && (
            <FaqView onOpenWhatsApp={handleOpenWhatsApp} />
          )}

          {currentPage === 'contact' && (
            <ContactView onOpenWhatsApp={handleOpenWhatsApp} />
          )}

          {currentPage === 'purchase' && (
            <PurchaseView onOpenWhatsApp={handleOpenWhatsApp} />
          )}
        </Suspense>
      </main>

      {/* Contextual crawlable links between related pages */}
      <SeoInternalLinks currentPage={currentPage} selectedArticle={selectedArticle} />

      {/* Trustworthy Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenWhatsApp={handleOpenWhatsApp}
        onToggleSourcesModal={() => setIsSourcesOpen(true)}
      />

      {/* Floating WhatsApp Quick Action (Bottom-right) */}
      <div className="flex fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40">
        <button
          id="floating-whatsapp-widget"
          onClick={handleFloatingWhatsApp}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm shadow-xl active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
          aria-label="Chat with MyGlucoGuide on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
          </div>
          <span className="hidden sm:inline">WhatsApp Help</span>
        </button>
      </div>

      {/* WhatsApp Modal */}
      {showMetaConsent && (
        <aside role="dialog" aria-label="Optional analytics consent" className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-xl border border-slate-300 bg-white p-4 text-slate-900 shadow-xl">
          <p className="text-sm">Optional Meta Pixel analytics may measure website activity. The Pixel will not load unless you accept.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={() => { setMetaConsent(true); setShowMetaConsent(false); }}>Accept optional tracking</button>
            <button type="button" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold" onClick={() => { setMetaConsent(false); setShowMetaConsent(false); }}>Decline</button>
          </div>
        </aside>
      )}

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        sourceContext={whatsAppSource}
        currentPage={currentPage}
      />

      {/* Article Detail Reading Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => {
          if (articleReturnUrl) {
            // Return to the page that opened the article without adding a duplicate history entry.
            window.history.back();
            return;
          }

          // A directly opened article has no in-app return entry, so send it to the blog.
          setSelectedArticle(null);
          setArticleReturnUrl(null);
          window.history.replaceState(null, '', '/blog');
        }}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Sources & Citations Modal */}
      <SourcesModal
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
      />

    </div>
  );
}

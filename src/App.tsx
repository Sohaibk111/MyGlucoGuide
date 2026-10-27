import React, { useState, useEffect, lazy, Suspense } from 'react';
import { PageId, Article } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppModal } from './components/WhatsAppModal';
import { ArticleModal } from './components/ArticleModal';
import { SourcesModal } from './components/SourcesModal';
import { HomeView } from './views/HomeView';
import { MessageCircle } from 'lucide-react';
import { initUtmTracking, initMetaPixel, trackWhatsAppClick } from './services/analytics';
import { usePageSEO } from './hooks/usePageSEO';
import { ARTICLES } from './data/articles';
import { useStructuredData } from './hooks/useStructuredData';

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


  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    if (window.location.hash !== (page === 'home' ? '' : `#${page}`)) {
      window.history.pushState(null, '', page === 'home' ? window.location.pathname : `#${page}`);
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
          setSelectedArticle(null);
          const returnUrl = articleReturnUrl || '/blog';
          setArticleReturnUrl(null);
          window.history.pushState(null, '', returnUrl);
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

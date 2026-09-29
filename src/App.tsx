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
import { useStructuredData } from './hooks/useStructuredData';

// Route-level code splitting: secondary views lazy-loaded on demand
const AboutView = lazy(() => import('./views/AboutView').then((m) => ({ default: m.AboutView })));
const EducationView = lazy(() => import('./views/EducationView').then((m) => ({ default: m.EducationView })));
const CgmView = lazy(() => import('./views/CgmView').then((m) => ({ default: m.CgmView })));
const BlogView = lazy(() => import('./views/BlogView').then((m) => ({ default: m.BlogView })));
const FaqView = lazy(() => import('./views/FaqView').then((m) => ({ default: m.FaqView })));
const ContactView = lazy(() => import('./views/ContactView').then((m) => ({ default: m.ContactView })));

// Lazy-load QA/Developer tool only
const AnalyticsInspector = lazy(() => import('./components/AnalyticsInspector').then((m) => ({ default: m.AnalyticsInspector })));

function ViewLoadingFallback() {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="min-h-[50vh] flex flex-col items-center justify-center p-8"
    >
      <div className="w-9 h-9 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-3" />
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Loading...
      </p>
    </div>
  );
}

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const validPages: PageId[] = ['home', 'about', 'education', 'cgm', 'blog', 'faq', 'contact'];
  if (validPages.includes(hash as PageId)) {
    return hash as PageId;
  }
  const path = window.location.pathname.replace(/^\//, '').toLowerCase();
  if (validPages.includes(path as PageId)) {
    return path as PageId;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppSource, setWhatsAppSource] = useState('direct');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);

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
      setCurrentPage(page);
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Internal QA only: developer keyboard shortcut (Ctrl+Shift+A) or window.__openAnalyticsInspector()
    const handleDevShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAnalyticsOpen((prev) => !prev);
      }
    };
    (window as unknown as { __openAnalyticsInspector?: () => void }).__openAnalyticsInspector = () => {
      setIsAnalyticsOpen(true);
    };
    window.addEventListener('keydown', handleDevShortcut);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleDevShortcut);
      delete (window as unknown as { __openAnalyticsInspector?: () => void }).__openAnalyticsInspector;
    };
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
    handleOpenWhatsApp('floating_widget');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900">
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
            onSelectArticle={(art) => setSelectedArticle(art)}
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
              onSelectArticle={(art) => setSelectedArticle(art)}
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
              onSelectArticle={(art) => setSelectedArticle(art)}
              onOpenWhatsApp={handleOpenWhatsApp}
            />
          )}

          {currentPage === 'faq' && (
            <FaqView onOpenWhatsApp={handleOpenWhatsApp} />
          )}

          {currentPage === 'contact' && (
            <ContactView onOpenWhatsApp={handleOpenWhatsApp} />
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
      <div className="hidden sm:flex fixed bottom-5 right-5 z-40">
        <button
          id="floating-whatsapp-widget"
          onClick={handleFloatingWhatsApp}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xl active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
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
        onClose={() => setSelectedArticle(null)}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Sources & Citations Modal */}
      <SourcesModal
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
      />

      {/* Meta Pixel & Custom Event Inspector (Developer/QA shortcut only: Ctrl+Shift+A) */}
      {isAnalyticsOpen && (
        <Suspense fallback={null}>
          <AnalyticsInspector
            isOpen={isAnalyticsOpen}
            onClose={() => setIsAnalyticsOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

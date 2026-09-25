import React, { useState, useEffect } from 'react';
import { PageId, Article } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppModal } from './components/WhatsAppModal';
import { ArticleModal } from './components/ArticleModal';
import { AnalyticsInspector } from './components/AnalyticsInspector';
import { SourcesModal } from './components/SourcesModal';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { EducationView } from './views/EducationView';
import { CgmView } from './views/CgmView';
import { BlogView } from './views/BlogView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';
import { MessageCircle } from 'lucide-react';
import { initUtmTracking, initMetaPixel, trackWhatsAppClick } from './services/analytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppSource, setWhatsAppSource] = useState('direct');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);

  useEffect(() => {
    // Preserve any UTM parameters from landing query string
    initUtmTracking();
    // Initialize Meta Pixel if VITE_META_PIXEL_ID is present
    initMetaPixel();
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
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
      </main>

      {/* Trustworthy Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenWhatsApp={handleOpenWhatsApp}
        onToggleAnalyticsModal={() => setIsAnalyticsOpen(true)}
        onToggleSourcesModal={() => setIsSourcesOpen(true)}
      />

      {/* Floating WhatsApp Quick Action (Bottom-right) */}
      <div className="fixed bottom-5 right-5 z-40">
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

      {/* Meta Pixel & Custom Event Inspector */}
      <AnalyticsInspector
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />
    </div>
  );
}

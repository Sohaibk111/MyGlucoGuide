import React, { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { PageId } from '../types';
import { trackEvent, trackWhatsAppClick } from '../services/analytics';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenWhatsApp: (source: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenWhatsApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Diabetes Education' },
    { id: 'cgm', label: 'CGM' },
    { id: 'blog', label: 'Learn / Blog' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    trackEvent('cta_click', { action: 'navigation', destination: page });
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = (source: string, ctaId: string) => {
    trackWhatsAppClick({
      sourceLocation: source,
      page: currentPage,
      ctaIdentifier: ctaId,
    });
    onOpenWhatsApp(source);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Brand Wordmark (Display Face) */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1 -m-1"
            >
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors">
                My<span className="text-sky-600">Gluco</span>Guide
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean unboxed text) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors py-1 cursor-pointer relative whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded ${
                    isActive
                      ? 'text-sky-700 font-semibold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action - Green WhatsApp Button */}
          <div className="flex items-center gap-3">
            <button
              id="header-whatsapp-cta"
              onClick={() => handleWhatsAppClick('header_bar', 'header-whatsapp-cta')}
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center gap-2 px-3 min-[375px]:px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden min-[375px]:inline">Chat on WhatsApp</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              id="mobile-drawer-whatsapp-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick('mobile_drawer', 'mobile-drawer-whatsapp-cta');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Chat on WhatsApp (+92)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

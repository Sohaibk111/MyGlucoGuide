import React, { useState } from 'react';
import { MessageCircle, Menu, X, Moon, Sun } from 'lucide-react';
import { PageId } from '../types';
import { trackEvent, trackWhatsAppClick } from '../services/analytics';
import { useTheme } from '../hooks/useTheme';

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
  const { isDark: isDarkMode, toggleTheme } = useTheme();

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
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-line/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 min-h-[4.5rem] py-2">
          {/* Zone 1: Brand Wordmark (Display Face) */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1 -m-1"
            >
              <img
                src="/myglucoguide-logo.svg"
                alt="MyGlucoGuide"
                className="block dark:hidden w-[170px] min-[380px]:w-[205px] sm:w-[250px] h-auto object-contain"
                width="520"
                height="116"
              />
              <img
                src="/myglucoguide-logo-dark.svg"
                alt="MyGlucoGuide"
                className="hidden dark:block w-[170px] min-[380px]:w-[205px] sm:w-[250px] h-auto object-contain"
                width="520"
                height="116"
              />
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean unboxed text) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-fg-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors py-1 cursor-pointer relative whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded ${
                    isActive
                      ? 'text-sky-700 dark:text-sky-300 font-semibold'
                      : 'hover:text-fg'
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
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full text-fg-3 hover:bg-surface-3 hover:text-fg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              id="header-whatsapp-cta"
              onClick={() => handleWhatsAppClick('header_bar', 'header-whatsapp-cta')}
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center justify-center gap-1.5 px-2 min-[380px]:px-3 sm:px-4 py-2.5 rounded-full text-[11px] min-[380px]:text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden min-[430px]:inline">Chat on WhatsApp</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-fg-3 hover:text-fg hover:bg-surface-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
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
        <div id="mobile-navigation" className="lg:hidden bg-surface border-b border-line px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 dark:bg-sky-400/10 text-sky-700 dark:text-sky-300 font-semibold'
                      : 'text-fg-2 hover:bg-surface-2'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-line-soft flex flex-col gap-2">
            <button
              id="mobile-drawer-whatsapp-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick('mobile_drawer', 'mobile-drawer-whatsapp-cta');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] transition cursor-pointer"
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

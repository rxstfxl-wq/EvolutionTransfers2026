import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { BUSINESS_CONTACT } from '../data/catalog';
import { PageRoute } from '../types';
import { BrandWordmark } from './BrandWordmark';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, options?: { sectionId?: string }) => void;
}

const NAV_ITEMS: Array<{
  label: string;
  route: PageRoute;
  sectionId?: string;
}> = [
  { label: 'Home', route: 'home' },
  { label: 'Our Services', route: 'home', sectionId: 'services' },
  { label: 'Explore Cape Town', route: 'explore' },
  { label: 'About Us', route: 'about' },
  { label: 'Contact', route: 'contact' },
];

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (route: PageRoute, sectionId?: string) => {
    setMobileOpen(false);
    onNavigate(route, { sectionId });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#090909]/95 backdrop-blur-md border-b border-[#C6A66B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A66B] rounded-sm py-1"
          aria-label="Evolution Transfers Home"
        >
          <BrandWordmark variant="header" />
        </a>

        {/* Zone 2: Desktop Single-Line Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#D8D0C2]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.sectionId === undefined && currentRoute === item.route;
            return (
              <a
                key={item.label}
                href={`#${item.sectionId ?? item.route}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.route, item.sectionId);
                }}
                className={`relative py-2 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#FAF9F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A66B] rounded-sm ${
                  isActive ? 'text-[#FAF9F6]' : 'text-[#D8D0C2]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-0.5 h-px bg-[#C6A66B] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Gold Booking CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('book')}
            className="px-4 sm:px-5 py-2.5 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.12em] uppercase whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF9F6] min-h-[40px]"
          >
            Book a Transfer
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#FAF9F6] hover:text-[#C6A66B] border border-[#C6A66B]/30 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A66B]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#090909] border-t border-[#C6A66B]/20 px-4 pt-3 pb-6"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#202020]">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.sectionId === undefined && currentRoute === item.route;
              return (
                <a
                  key={item.label}
                  href={`#${item.sectionId ?? item.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.route, item.sectionId);
                  }}
                  className={`py-3.5 text-base font-medium flex items-center justify-between transition-colors ${
                    isActive ? 'text-[#C6A66B]' : 'text-[#FAF9F6] hover:text-[#C6A66B]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#C6A66B]/70" aria-hidden="true">
                    →
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-[#202020] flex flex-col gap-3">
            <a
              href={BUSINESS_CONTACT.phoneHref}
              className="inline-flex items-center gap-2.5 text-sm text-[#D8D0C2] hover:text-[#C6A66B] py-1.5 tabular-nums"
            >
              <Phone className="w-4 h-4 text-[#C6A66B]" aria-hidden="true" />
              <span>{BUSINESS_CONTACT.phoneDisplay}</span>
            </a>
            <a
              href={BUSINESS_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 border border-[#C6A66B]/50 text-[#C6A66B] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#C6A66B]/10 transition-colors"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_CONTACT, SERVICES } from '../data/catalog';
import { PageRoute, ServiceTypeId } from '../types';
import { BrandWordmark } from './BrandWordmark';

interface FooterProps {
  onNavigate: (
    route: PageRoute,
    options?: { sectionId?: string; serviceType?: ServiceTypeId }
  ) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#090909] text-[#FAF9F6] border-t border-[#C6A66B]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 lg:gap-8">
          {/* Column 1: Brand Statement & Wordmark */}
          <div className="col-span-2 lg:col-span-4 flex flex-col items-start">
            <BrandWordmark variant="stacked" showTagline={true} className="items-start text-left" />
            <p className="mt-5 text-sm text-[#D8D0C2]/80 leading-relaxed max-w-sm">
              Private Cape Town chauffeur transfers, airport arrivals, and bespoke
              Western Cape journeys crafted around punctuality, quiet luxury, and
              hospitality.
            </p>
            <div className="mt-6 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onNavigate('book')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer min-h-[44px]"
              >
                Book a Transfer
              </button>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C6A66B]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#D8D0C2]">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                  }}
                  className="hover:text-[#FAF9F6] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home', { sectionId: 'services' });
                  }}
                  className="hover:text-[#FAF9F6] transition-colors"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="#explore"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('explore');
                  }}
                  className="hover:text-[#FAF9F6] transition-colors"
                >
                  Explore Cape Town
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('about');
                  }}
                  className="hover:text-[#FAF9F6] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('contact');
                  }}
                  className="hover:text-[#FAF9F6] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="col-span-1 lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C6A66B]">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#D8D0C2]">
              {SERVICES.map((svc) => (
                <li key={svc.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate('book', { serviceType: svc.id })}
                    className="text-left hover:text-[#FAF9F6] transition-colors cursor-pointer"
                  >
                    {svc.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verified Contact & Social */}
          <div className="col-span-2 lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C6A66B]">
              Direct Concierge
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#D8D0C2]">
              <li>
                <a
                  href={BUSINESS_CONTACT.phoneHref}
                  className="inline-flex items-center gap-2.5 hover:text-[#C6A66B] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#C6A66B] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_CONTACT.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_CONTACT.emailHref}
                  className="inline-flex items-center gap-2.5 hover:text-[#C6A66B] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C6A66B] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-[#C6A66B] transition-colors"
                >
                  <MessageCircle
                    className="w-4 h-4 text-[#C6A66B] shrink-0"
                    aria-hidden="true"
                  />
                  <span>WhatsApp Direct Dispatch</span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 text-[#D8D0C2]/75">
                <MapPin
                  className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{BUSINESS_CONTACT.serviceArea}</span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-[#202020] flex items-center gap-4 text-xs tracking-[0.12em] uppercase text-[#D8D0C2]/75">
              <a
                href={BUSINESS_CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C6A66B] transition-colors"
              >
                WhatsApp
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={BUSINESS_CONTACT.emailHref}
                className="hover:text-[#C6A66B] transition-colors"
              >
                Email
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={BUSINESS_CONTACT.phoneHref}
                className="hover:text-[#C6A66B] transition-colors"
              >
                Call
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#202020] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#D8D0C2]/65">
          <p>
            &copy; {new Date().getFullYear()} Evolution Transfers. All rights reserved.
          </p>
          <p className="font-serif italic text-sm text-[#C6A66B]">
            Your Journey, Evolved.
          </p>
        </div>
      </div>
    </footer>
  );
}

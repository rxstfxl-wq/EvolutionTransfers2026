import {
  ArrowRight,
  CalendarCheck,
  CarFront,
  Clock,
  Compass,
  UserCheck,
} from 'lucide-react';
import { BookingFormCard } from '../components/BookingFormCard';
import { EditorialImage } from '../components/EditorialImage';
import { ExploreHighlightsCarousel } from '../components/ExploreHighlightsCarousel';
import {
  COMPLIMENTARY_SHUTTLE,
  HERO_MEDIA,
  SERVICES,
  WHY_CHOOSE_ITEMS,
} from '../data/catalog';
import { PageRoute, ServiceTypeId, TransferEnquiry } from '../types';

interface HomePageProps {
  onNavigate: (
    route: PageRoute,
    options?: {
      sectionId?: string;
      pickupLocation?: string;
      destination?: string;
      serviceType?: ServiceTypeId;
    }
  ) => void;
}

function renderReasonIcon(name: (typeof WHY_CHOOSE_ITEMS)[number]['iconName']) {
  const cls = 'w-5 h-5 text-[#C6A66B] stroke-[1.5]';
  switch (name) {
    case 'chauffeur':
      return <UserCheck className={cls} aria-hidden="true" />;
    case 'vehicle':
      return <CarFront className={cls} aria-hidden="true" />;
    case 'clock':
      return <Clock className={cls} aria-hidden="true" />;
    case 'booking':
      return <CalendarCheck className={cls} aria-hidden="true" />;
    case 'compass':
      return <Compass className={cls} aria-hidden="true" />;
  }
}

export function HomePage({ onNavigate }: HomePageProps) {
  const scrollToBookingShortcut = () => {
    const el = document.getElementById('booking-shortcut');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      onNavigate('book');
    }
  };

  const handleOpenFullBooking = (draft?: Partial<TransferEnquiry>) => {
    onNavigate('book', {
      destination: draft?.destination,
      serviceType: draft?.serviceType,
    });
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section
        aria-labelledby="hero-heading"
        className="relative bg-[#090909] text-[#FAF9F6] overflow-hidden min-h-[540px] lg:min-h-[680px] flex items-center"
      >
        <div className="absolute inset-0">
          <img
            src={HERO_MEDIA.image}
            alt={HERO_MEDIA.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center lg:object-[70%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#090909]/92 via-[#090909]/68 to-[#090909]/20"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#090909]/85 via-transparent to-[#090909]/40"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C6A66B]">
              Cape Town Private Transfers &amp; Chauffeur Service
            </p>
            <h1
              id="hero-heading"
              className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.06] text-[#FAF9F6] text-balance"
            >
              Your Journey, Evolved.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#F4F0E8]/90 leading-relaxed max-w-lg">
              Experience Cape Town with comfortable, reliable and professional private
              transfers. From airport arrivals to unforgettable local journeys,
              travel with confidence.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={scrollToBookingShortcut}
                className="px-7 py-4 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap min-h-[48px]"
              >
                Book Your Transfer
              </button>
              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="px-7 py-4 border border-[#C6A66B]/80 hover:border-[#C6A66B] hover:bg-[#C6A66B]/12 text-[#FAF9F6] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap min-h-[48px]"
              >
                Explore Cape Town
              </button>
            </div>

            <p className="mt-8 pt-6 border-t border-[#FAF9F6]/15 text-xs tracking-[0.08em] text-[#D8D0C2]/90 leading-relaxed">
              <span className="text-[#C6A66B] font-semibold">
                {COMPLIMENTARY_SHUTTLE.title}:
              </span>{' '}
              {COMPLIMENTARY_SHUTTLE.routeSummary}
            </p>
          </div>
        </div>
      </section>

      {/* 2. BOOKING SHORTCUT */}
      <section
        id="booking-shortcut"
        aria-label="Quick Transfer Booking Enquiry"
        className="bg-[#F4F0E8] py-14 lg:py-20 border-b border-[#D8D0C2]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-[#090909] text-[#FAF9F6] border border-[#C6A66B]/40 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C6A66B]">
                {COMPLIMENTARY_SHUTTLE.kicker}
              </p>
              <p className="mt-1 font-serif text-xl sm:text-2xl text-[#FAF9F6]">
                {COMPLIMENTARY_SHUTTLE.title} —{' '}
                <span className="text-[#D8D0C2]">
                  {COMPLIMENTARY_SHUTTLE.routeSummary}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {COMPLIMENTARY_SHUTTLE.destinations.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() =>
                    onNavigate('book', {
                      pickupLocation: COMPLIMENTARY_SHUTTLE.pickupLocation,
                      destination: dest,
                      serviceType: 'hotel-private',
                    })
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{dest}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <BookingFormCard
            variant="shortcut"
            onOpenFullBooking={handleOpenFullBooking}
          />
        </div>
      </section>

      {/* 3. EXPLORE CAPE TOWN HIGHLIGHTS (CAROUSEL) */}
      <ExploreHighlightsCarousel
        onEnquireDestination={(destName) =>
          onNavigate('book', {
            destination: destName,
            serviceType: 'cape-town-tour',
          })
        }
        onEnquireComplimentary={(destName) =>
          onNavigate('book', {
            pickupLocation: COMPLIMENTARY_SHUTTLE.pickupLocation,
            destination: destName,
            serviceType: 'hotel-private',
          })
        }
        onExplorePage={() => onNavigate('explore')}
      />

      {/* 4. SERVICE HIGHLIGHTS */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="bg-[#F4F0E8] text-[#090909] py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D8D0C2]">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#755A2B]">
                Our Services
              </p>
              <h2
                id="services-heading"
                className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#090909] text-balance"
              >
                Tailored Private Mobility Across Cape Town
              </h2>
            </div>
            <p className="text-sm text-[#202020]/75 max-w-md leading-relaxed">
              Every transfer is operated privately in our Mercedes-Benz V-Class
              fleet—combining hospitality warmth with quiet punctuality.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className="group bg-[#FAF9F6] border border-[#D8D0C2] hover:border-[#C6A66B] flex flex-col transition-colors duration-200"
              >
                <EditorialImage
                  src={service.image}
                  alt={service.imageAlt}
                  fallbackTitle={service.title}
                  className="aspect-[4/3] w-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-[#755A2B] tabular-nums">
                      {service.index}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-medium text-[#090909]">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#202020]/80 leading-relaxed">
                      {service.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D8D0C2]">
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate('book', { serviceType: service.id })
                      }
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#090909] hover:text-[#755A2B] transition-colors cursor-pointer py-1"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C6A66B]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE EVOLUTION */}
      <section
        aria-labelledby="why-evolution-heading"
        className="bg-[#FAF9F6] text-[#090909] py-20 lg:py-24 border-t border-[#D8D0C2]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#755A2B]">
              The Evolution Standard
            </p>
            <h2
              id="why-evolution-heading"
              className="mt-3 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#090909] text-balance"
            >
              Why Guests &amp; Concierges Choose Evolution Transfers
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="pt-6 border-t border-[#C6A66B]/60 flex flex-col"
              >
                <div className="w-10 h-10 bg-[#090909] flex items-center justify-center mb-4">
                  {renderReasonIcon(item.iconName)}
                </div>
                <h3 className="font-serif text-xl font-medium text-[#090909]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#202020]/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section
        aria-labelledby="final-cta-heading"
        className="bg-[#202020] text-[#FAF9F6] py-20 lg:py-24 border-t border-[#C6A66B]/25"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C6A66B]">
            Private Cape Town Concierge
          </p>
          <h2
            id="final-cta-heading"
            className="mt-4 font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#FAF9F6] text-balance"
          >
            Wherever You&rsquo;re Going, Let&rsquo;s Get You There.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#D8D0C2]/85 max-w-xl mx-auto leading-relaxed">
            Whether arriving at Cape Town International Airport or planning a coastal
            day across the peninsula, request your transfer in seconds.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('book')}
              className="px-8 py-4 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer min-h-[48px]"
            >
              Book Your Transfer
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 border border-[#C6A66B]/60 hover:border-[#C6A66B] text-[#FAF9F6] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer min-h-[48px]"
            >
              Speak With Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

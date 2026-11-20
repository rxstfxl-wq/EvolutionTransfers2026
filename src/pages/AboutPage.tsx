import { ArrowRight, Check } from 'lucide-react';
import { BrandWordmark } from '../components/BrandWordmark';
import { EditorialImage } from '../components/EditorialImage';
import { ABOUT_MEDIA } from '../data/catalog';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

const STANDARDS = [
  'Dedicated black Mercedes-Benz V-Class executive fleet',
  'Uniformed, discreet, and locally knowledgeable chauffeurs',
  'Flight-tracked airport arrivals and curbside hotel assistance',
  'Spacious luggage accommodation for international travellers and golf tours',
  'Direct personal coordination for hotels, concierges, and private guests',
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-[#FAF9F6] text-[#090909]">
      {/* Header Band */}
      <section className="bg-[#090909] text-[#FAF9F6] py-12 sm:py-16 lg:py-24 border-b border-[#C6A66B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C6A66B]">
              About Evolution Transfers
            </p>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF9F6] text-balance">
              Hospitality Standards Meets Private Cape Town Mobility
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#D8D0C2]/85 leading-relaxed max-w-2xl">
              Based in Cape Town, Evolution Transfers was built on a straightforward
              promise: every guest deserves a calm, punctual, and impeccably presented
              private journey from the moment they step outside their terminal or hotel.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <div className="bg-[#202020]/60 border border-[#C6A66B]/25 p-8 sm:p-10 w-full max-w-sm flex justify-center">
              <BrandWordmark variant="stacked" showTagline={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Chauffeur & Concierge Split */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#F4F0E8] border-b border-[#D8D0C2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6">
            <EditorialImage
              src={ABOUT_MEDIA.chauffeur}
              alt={ABOUT_MEDIA.chauffeurAlt}
              fallbackTitle="Evolution Chauffeur Service"
              className="aspect-[4/3] lg:h-full w-full"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#755A2B]">
              Our Ethos
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#090909] text-balance">
              Thoughtful Service, Never Rushed
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#202020]/80 leading-relaxed">
              Whether collecting guests outside Lagoon Beach Hotel &amp; Spa at dawn
              for a morning flight, coordinating diplomatic and corporate roadshows,
              or guiding visitors along the Cape Peninsula, we treat transport as an
              extension of luxury hospitality.
            </p>

            <ul className="mt-6 space-y-3">
              {STANDARDS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-[#090909]"
                >
                  <Check
                    className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => onNavigate('book')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#090909] hover:bg-[#202020] text-[#FAF9F6] text-xs font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer min-h-[48px] sm:min-h-[44px]"
              >
                <span>Request a Private Transfer</span>
                <ArrowRight className="w-4 h-4 text-[#C6A66B]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet & Cabin Comfort */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#755A2B]">
              The Executive Fleet
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-[#090909] text-balance">
              Mercedes-Benz V-Class Comfort, Inside and Out
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#202020]/80 leading-relaxed">
              Configured for unhurried legroom, climate-controlled cabin serenity,
              privacy glazing, and generous luggage capacity for families and small
              executive groups.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="bg-[#F4F0E8] border border-[#D8D0C2]">
              <EditorialImage
                src={ABOUT_MEDIA.interior}
                alt={ABOUT_MEDIA.interiorAlt}
                fallbackTitle="Executive Cabin Interior"
                className="aspect-[4/3] w-full"
              />
              <div className="p-6">
                <h3 className="font-serif text-2xl font-medium text-[#090909]">
                  Quiet Executive Seating
                </h3>
                <p className="mt-2 text-sm text-[#202020]/80 leading-relaxed">
                  Supple leather captain chairs, subtle ambient illumination, and
                  panoramic tinted windows so guests can work or unwind between
                  destinations.
                </p>
              </div>
            </article>

            <article className="bg-[#F4F0E8] border border-[#D8D0C2]">
              <EditorialImage
                src={ABOUT_MEDIA.hotelArrival}
                alt={ABOUT_MEDIA.hotelArrivalAlt}
                fallbackTitle="Hotel Portico Arrivals"
                className="aspect-[4/3] w-full"
              />
              <div className="p-6">
                <h3 className="font-serif text-2xl font-medium text-[#090909]">
                  Seamless Hotel Portico Presence
                </h3>
                <p className="mt-2 text-sm text-[#202020]/80 leading-relaxed">
                  Recognisable black-on-black Mercedes-Benz V-Class presence waiting
                  punctually outside Cape Town’s leading coastal and city hotels.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

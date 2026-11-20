import { Mail, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { BookingFormCard } from '../components/BookingFormCard';
import { BUSINESS_CONTACT } from '../data/catalog';
import { ServiceTypeId } from '../types';

interface BookingPageProps {
  prefilledPickupLocation?: string;
  prefilledDestination?: string;
  prefilledServiceType?: ServiceTypeId;
}

export function BookingPage({
  prefilledPickupLocation = '',
  prefilledDestination = '',
  prefilledServiceType = 'hotel-private',
}: BookingPageProps) {
  return (
    <div className="bg-[#F4F0E8] text-[#090909]">
      {/* Header */}
      <section className="bg-[#090909] text-[#FAF9F6] py-14 lg:py-20 border-b border-[#C6A66B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C6A66B]">
            Reservations &amp; Transfer Enquiries
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#FAF9F6] text-balance">
            Book a Private Transfer
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#D8D0C2]/85 max-w-2xl leading-relaxed">
            Complete your journey details below to prepare a direct transfer
            enquiry. Designed for both hotel guests and independent travellers across
            Cape Town and the Western Cape.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <BookingFormCard
              variant="full"
              prefilledPickupLocation={prefilledPickupLocation}
              prefilledDestination={prefilledDestination}
              prefilledServiceType={prefilledServiceType}
            />
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#090909] text-[#FAF9F6] p-6 sm:p-8 border border-[#C6A66B]/25">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C6A66B]">
                Prefer Instant Assistance?
              </p>
              <h2 className="mt-2 font-serif text-2xl font-normal text-[#FAF9F6]">
                Speak With Our Cape Town Desk
              </h2>
              <p className="mt-3 text-sm text-[#D8D0C2]/80 leading-relaxed">
                For urgent airport arrivals, hotel concierge requests, or bespoke
                multi-day touring, reach our dispatch team directly.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={BUSINESS_CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.14em] uppercase transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Message on WhatsApp</span>
                </a>

                <a
                  href={BUSINESS_CONTACT.phoneHref}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 border border-[#C6A66B]/50 hover:border-[#C6A66B] text-[#FAF9F6] text-xs font-semibold tracking-[0.14em] uppercase transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#C6A66B]" aria-hidden="true" />
                  <span>{BUSINESS_CONTACT.phoneDisplay}</span>
                </a>

                <a
                  href={BUSINESS_CONTACT.emailHref}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 border border-[#FAF9F6]/20 hover:border-[#C6A66B]/60 text-[#D8D0C2] hover:text-[#FAF9F6] text-xs font-medium tracking-[0.06em] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C6A66B]" aria-hidden="true" />
                  <span>{BUSINESS_CONTACT.email}</span>
                </a>
              </div>
            </div>

            <div className="bg-[#FAF9F6] border border-[#D8D0C2] p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  className="w-5 h-5 text-[#755A2B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#090909]">
                    How Enquiry Booking Works
                  </h3>
                  <ol className="mt-3 space-y-2.5 text-sm text-[#202020]/80 list-decimal list-inside leading-relaxed">
                    <li>Submit your pickup, destination, passenger, and luggage details.</li>
                    <li>
                      Dispatch your prepared itinerary directly via WhatsApp or email.
                    </li>
                    <li>
                      Receive personalised vehicle confirmation and transparent route
                      details directly from our team.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

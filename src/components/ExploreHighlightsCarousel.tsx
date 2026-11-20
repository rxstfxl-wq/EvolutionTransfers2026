import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { COMPLIMENTARY_SHUTTLE, DESTINATIONS } from '../data/catalog';
import { DestinationItem } from '../types';
import { EditorialImage } from './EditorialImage';

interface ExploreHighlightsCarouselProps {
  onEnquireDestination: (destinationName: string) => void;
  onEnquireComplimentary: (destinationName: string) => void;
  onExplorePage: () => void;
}

const CAROUSEL_SEQUENCE_IDS = [
  'canal-walk',
  'va-waterfront',
  'camps-bay',
  'table-mountain',
  'cape-point',
  'clifton-beaches',
] as const;

const AUTO_ADVANCE_MS = 7000;

function getPageSizeForViewport(): number {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

export function ExploreHighlightsCarousel({
  onEnquireDestination,
  onEnquireComplimentary,
  onExplorePage,
}: ExploreHighlightsCarouselProps) {
  const carouselDestinations = CAROUSEL_SEQUENCE_IDS.map((id) =>
    DESTINATIONS.find((dest) => dest.id === id)
  ).filter((dest): dest is DestinationItem => Boolean(dest));

  const [pageSize, setPageSize] = useState<number>(() => getPageSizeForViewport());
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSizeForViewport());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = carouselDestinations.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = currentPage >= totalPages ? 0 : currentPage;

  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [currentPage, totalPages]);

  const pages = Array.from({ length: totalPages }, (_, pageIdx) =>
    carouselDestinations.slice(pageIdx * pageSize, (pageIdx + 1) * pageSize)
  );

  useEffect(() => {
    if (isPaused || totalPages <= 1 || shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, totalPages, shouldReduceMotion]);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const startIndex = safePage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const gridColsClass =
    pageSize === 3
      ? 'grid-cols-3'
      : pageSize === 2
        ? 'grid-cols-2'
        : 'grid-cols-1';

  return (
    <section
      aria-labelledby="explore-highlights-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className="bg-[#090909] text-[#FAF9F6] py-14 sm:py-18 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 lg:pb-10 border-b border-[#202020]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C6A66B]">
              Explore Cape Town &amp; The Western Cape
            </p>
            <h2
              id="explore-highlights-heading"
              className="mt-2.5 sm:mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#FAF9F6] text-balance"
            >
              Discover Cape Town. We&rsquo;ll Take You There.
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#D8D0C2]/85 leading-relaxed">
              From Canal Walk and the V&amp;A Waterfront to Camps Bay, Table
              Mountain, Cape Point, and Clifton Beaches—travel in unhurried privacy
              with a dedicated chauffeur.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3 sm:gap-4 shrink-0">
            <div className="flex items-center gap-2" aria-label="Carousel controls">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous destination highlights"
                className="w-11 h-11 border border-[#C6A66B]/40 hover:border-[#C6A66B] hover:bg-[#C6A66B]/10 text-[#FAF9F6] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next destination highlights"
                className="w-11 h-11 border border-[#C6A66B]/40 hover:border-[#C6A66B] hover:bg-[#C6A66B]/10 text-[#FAF9F6] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onExplorePage}
              className="px-4 sm:px-5 py-3 border border-[#C6A66B] text-[#C6A66B] hover:bg-[#C6A66B] hover:text-[#090909] text-xs font-semibold tracking-[0.12em] sm:tracking-[0.14em] uppercase transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
            >
              Explore All Destinations
            </button>
          </div>
        </div>

        {/* Complimentary Hotel Shuttle Highlight */}
        <div className="mt-6 sm:mt-8 bg-[#202020]/90 border border-[#C6A66B]/45 p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C6A66B]">
              {COMPLIMENTARY_SHUTTLE.kicker}
            </p>
            <p className="mt-1.5 font-serif text-lg sm:text-2xl text-[#FAF9F6] leading-snug">
              {COMPLIMENTARY_SHUTTLE.title}:{' '}
              <span className="text-[#C6A66B]">
                {COMPLIMENTARY_SHUTTLE.routeSummary}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            {COMPLIMENTARY_SHUTTLE.destinations.map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => onEnquireComplimentary(dest)}
                className="inline-flex items-center justify-between sm:justify-center gap-2 px-4 py-2.5 border border-[#C6A66B]/60 hover:bg-[#C6A66B] text-[#FAF9F6] hover:text-[#090909] text-xs font-semibold tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
              >
                <span>{dest}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Animated Sequential Carousel (Mobile: 1 card, Tablet: 2 cards, Desktop: 3 cards) */}
        <div className="mt-6 sm:mt-8 overflow-hidden">
          <motion.div
            className="flex will-change-transform"
            animate={{ x: `-${safePage * 100}%` }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {pages.map((pageItems, pageIdx) => {
              const isActivePage = pageIdx === safePage;
              return (
                <div
                  key={`${pageSize}-${pageIdx}`}
                  aria-hidden={!isActivePage}
                  className={`w-full shrink-0 grid ${gridColsClass} gap-5 sm:gap-6 transition-opacity duration-500 ${
                    isActivePage ? 'opacity-100' : 'opacity-35 pointer-events-none'
                  }`}
                >
                  {pageItems.map((dest, idx) => {
                    const sequenceNumber = String(
                      pageIdx * pageSize + idx + 1
                    ).padStart(2, '0');
                    return (
                      <article
                        key={dest.id}
                        className="group bg-[#202020]/70 border border-[#C6A66B]/15 hover:border-[#C6A66B]/50 flex flex-col transition-colors duration-200"
                      >
                        <EditorialImage
                          src={dest.image}
                          alt={dest.imageAlt}
                          fallbackTitle={dest.name}
                          loading="eager"
                          className="aspect-[4/3] w-full"
                          imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <p className="text-xs text-[#C6A66B] tracking-[0.08em] tabular-nums">
                              <span className="font-semibold">{sequenceNumber}</span>{' '}
                              <span aria-hidden="true">·</span> {dest.category}{' '}
                              <span aria-hidden="true">·</span> {dest.driveNote}
                            </p>
                            <h3 className="mt-2 font-serif text-2xl font-medium text-[#FAF9F6]">
                              {dest.name}
                            </h3>
                            <p className="mt-2.5 text-sm text-[#D8D0C2]/80 leading-relaxed">
                              {dest.shortDescription}
                            </p>
                          </div>

                          <div className="mt-5 pt-4 border-t border-[#FAF9F6]/10 flex items-center justify-between">
                            <button
                              type="button"
                              tabIndex={isActivePage ? 0 : -1}
                              onClick={() => onEnquireDestination(dest.name)}
                              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#C6A66B] hover:text-[#FAF9F6] transition-colors cursor-pointer py-1.5"
                            >
                              <span>Enquire About Trip</span>
                              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Sequential Progress Indicator */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Destination slides">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={safePage === idx}
                aria-label={`Show highlights ${String(idx * pageSize + 1).padStart(2, '0')} to ${String(Math.min((idx + 1) * pageSize, totalItems)).padStart(2, '0')}`}
                onClick={() => setCurrentPage(idx)}
                className={`h-1.5 sm:h-1 transition-all duration-200 cursor-pointer ${
                  safePage === idx
                    ? 'w-10 bg-[#C6A66B]'
                    : 'w-5 bg-[#FAF9F6]/25 hover:bg-[#FAF9F6]/50'
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-[#D8D0C2]/70 tabular-nums">
            Showing {String(startIndex + 1).padStart(2, '0')}
            {endIndex > startIndex + 1 ? `–${String(endIndex).padStart(2, '0')}` : ''} of{' '}
            {String(totalItems).padStart(2, '0')} Cape Town highlights
          </p>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import {
  COMPLIMENTARY_SHUTTLE,
  DESTINATION_CATEGORIES,
  DESTINATIONS,
} from '../data/catalog';
import { DestinationCategory, PageRoute, ServiceTypeId } from '../types';

interface ExplorePageProps {
  onNavigate: (
    route: PageRoute,
    options?: {
      pickupLocation?: string;
      destination?: string;
      serviceType?: ServiceTypeId;
    }
  ) => void;
}

type CategoryFilter = 'All' | DestinationCategory;

const EXPLORE_HEADER_VIDEO_DESKTOP = '/media/explore/EvoTransfers%20Explore%202026.mp4';
const EXPLORE_HEADER_VIDEO_MOBILE = '/media/explore/explore-mobile.mp4';
const EXPLORE_HEADER_VIDEO_POSTER = '/media/explore/explore-poster.jpg';

export function ExplorePage({ onNavigate }: ExplorePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [isCompactViewport, setIsCompactViewport] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 1023px)').matches;
  });
  const headerSectionRef = useRef<HTMLElement | null>(null);
  const headerVideoRef = useRef<HTMLVideoElement | null>(null);
  const previousSrcRef = useRef<string | null>(null);

  const videoSrc = isCompactViewport
    ? EXPLORE_HEADER_VIDEO_MOBILE
    : EXPLORE_HEADER_VIDEO_DESKTOP;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const handleViewportChange = (event: MediaQueryListEvent) => {
      setIsCompactViewport(event.matches);
    };
    setIsCompactViewport(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleViewportChange);
    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  // Synchronously stamp HTML muted/playsinline attributes before Safari/Chrome evaluates autoplay
  useLayoutEffect(() => {
    const video = headerVideoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
  }, [videoSrc]);

  // Mobile Chrome & iOS Safari autoplay enforcement, Low Power Mode gesture unlock, and lifecycle resume
  useEffect(() => {
    const video = headerVideoRef.current;
    if (!video) return;

    let isCleanedUp = false;
    let gestureListenersAttached = false;

    const detachGestureListeners = () => {
      if (!gestureListenersAttached) return;
      gestureListenersAttached = false;
      window.removeEventListener('touchstart', handleGestureUnlock);
      window.removeEventListener('pointerdown', handleGestureUnlock);
      window.removeEventListener('scroll', handleGestureUnlock);
    };

    const attemptPlay = () => {
      if (isCleanedUp) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      if (!video.paused && !video.ended) {
        detachGestureListeners();
        return;
      }

      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            if (!isCleanedUp) {
              detachGestureListeners();
            }
          })
          .catch(() => {
            // Mobile Safari Low Power Mode or Chrome Data Saver defers autoplay until interaction
          });
      }
    };

    function handleGestureUnlock() {
      attemptPlay();
    }

    const handleEnded = () => {
      try {
        video.currentTime = 0;
      } catch {
        // Ignore seek guard if buffer is resetting
      }
      attemptPlay();
    };

    const handleVisibilityOrPageShow = () => {
      if (document.visibilityState === 'visible') {
        attemptPlay();
      }
    };

    if (previousSrcRef.current !== null && previousSrcRef.current !== videoSrc) {
      video.load();
    } else if (video.readyState === 0) {
      video.load();
    }
    previousSrcRef.current = videoSrc;

    attemptPlay();

    video.addEventListener('loadedmetadata', attemptPlay);
    video.addEventListener('loadeddata', attemptPlay);
    video.addEventListener('canplay', attemptPlay);
    video.addEventListener('canplaythrough', attemptPlay);
    video.addEventListener('ended', handleEnded);
    document.addEventListener('visibilitychange', handleVisibilityOrPageShow);
    window.addEventListener('pageshow', handleVisibilityOrPageShow);
    window.addEventListener('focus', attemptPlay);

    gestureListenersAttached = true;
    window.addEventListener('touchstart', handleGestureUnlock, { passive: true });
    window.addEventListener('pointerdown', handleGestureUnlock, { passive: true });
    window.addEventListener('scroll', handleGestureUnlock, { passive: true });

    let intersectionObserver: IntersectionObserver | null = null;
    if (headerSectionRef.current && typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            attemptPlay();
          }
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(headerSectionRef.current);
    }

    return () => {
      isCleanedUp = true;
      video.removeEventListener('loadedmetadata', attemptPlay);
      video.removeEventListener('loadeddata', attemptPlay);
      video.removeEventListener('canplay', attemptPlay);
      video.removeEventListener('canplaythrough', attemptPlay);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityOrPageShow);
      window.removeEventListener('pageshow', handleVisibilityOrPageShow);
      window.removeEventListener('focus', attemptPlay);
      detachGestureListeners();
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    };
  }, [videoSrc]);

  const categoriesToShow: DestinationCategory[] =
    selectedCategory === 'All' ? DESTINATION_CATEGORIES : [selectedCategory];

  return (
    <div className="bg-[#FAF9F6] text-[#090909]">
      {/* Editorial Header */}
      <section
        ref={headerSectionRef}
        className="relative overflow-hidden bg-[#090909] text-[#FAF9F6] py-12 sm:py-16 lg:py-24 border-b border-[#C6A66B]/20"
      >
        {/* Masked Autoplay Looping Background Video */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none select-none"
        >
          <video
            ref={headerVideoRef}
            key={videoSrc}
            poster={EXPLORE_HEADER_VIDEO_POSTER}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            className="w-full h-full object-cover object-center opacity-75 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.88)_15%,rgba(0,0,0,0.35)_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.88)_15%,rgba(0,0,0,0.35)_100%)] sm:[mask-image:linear-gradient(to_left,rgba(0,0,0,1)_36%,rgba(0,0,0,0.45)_74%,rgba(0,0,0,0.18)_100%)] sm:[-webkit-mask-image:linear-gradient(to_left,rgba(0,0,0,1)_36%,rgba(0,0,0,0.45)_74%,rgba(0,0,0,0.18)_100%)]"
          >
            <source src={videoSrc} type="video/mp4" />
            {isCompactViewport && (
              <source src={EXPLORE_HEADER_VIDEO_DESKTOP} type="video/mp4" />
            )}
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/92 via-[#090909]/68 to-[#090909]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/90 via-[#090909]/20 to-[#090909]/45" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C6A66B]">
              Destination Discovery
            </p>
            <h1 className="mt-3 sm:mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF9F6] text-balance">
              Explore Cape Town &amp; The Western Cape
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-[#D8D0C2]/90 leading-relaxed">
              Every landscape—from Table Mountain and Atlantic coves to historic
              Cape Winelands estates and Walker Bay cliffs—is accessible in complete
              private comfort with Evolution Transfers.
            </p>
          </div>

          {/* Interactive Category Filter Bar (Horizontally scrollable on small mobile, wrapped on sm+) */}
          <div
            role="tablist"
            aria-label="Filter destinations by category"
            className="mt-8 sm:mt-10 flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap"
          >
            {(['All', ...DESTINATION_CATEGORIES] as CategoryFilter[]).map(
              (category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] ${
                      active
                        ? 'bg-[#C6A66B] text-[#090909]'
                        : 'bg-[#090909]/80 backdrop-blur-sm text-[#D8D0C2] hover:text-[#FAF9F6] border border-[#C6A66B]/30'
                    }`}
                  >
                    {category === 'All' ? 'All Destinations' : category}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Complimentary Hotel Transfers Highlight */}
      <section
        aria-labelledby="explore-complimentary-heading"
        className="pt-8 sm:pt-12 lg:pt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#090909] text-[#FAF9F6] border border-[#C6A66B]/45 p-5 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C6A66B]">
                {COMPLIMENTARY_SHUTTLE.kicker}
              </p>
              <h2
                id="explore-complimentary-heading"
                className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#FAF9F6] text-balance"
              >
                {COMPLIMENTARY_SHUTTLE.title}
              </h2>
              <p className="mt-2 text-base font-medium text-[#C6A66B]">
                {COMPLIMENTARY_SHUTTLE.routeSummary}
              </p>
              <p className="mt-3 text-sm text-[#D8D0C2]/85 leading-relaxed">
                {COMPLIMENTARY_SHUTTLE.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
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
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
                >
                  <span>Request {dest}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categorized Destination Sections */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">
          {categoriesToShow.map((category) => {
            const items = DESTINATIONS.filter((d) => d.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category}>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-[#D8D0C2]">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#755A2B]">
                      Curated Route Category
                    </p>
                    <h2 className="mt-1.5 font-serif text-3xl sm:text-4xl font-normal text-[#090909]">
                      {category}
                    </h2>
                  </div>
                  <span className="text-xs text-[#202020]/65 tabular-nums">
                    {items.length}{' '}
                    {items.length === 1 ? 'Destination' : 'Destinations'}
                  </span>
                </div>

                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {items.map((dest) => (
                    <article
                      key={dest.id}
                      className="group bg-[#F4F0E8] border border-[#D8D0C2] hover:border-[#C6A66B] flex flex-col transition-colors duration-200"
                    >
                      <EditorialImage
                        src={dest.image}
                        alt={dest.imageAlt}
                        fallbackTitle={dest.name}
                        className="aspect-[4/3] w-full"
                        imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-[#755A2B] font-medium tracking-[0.06em]">
                            {dest.region} <span aria-hidden="true">·</span>{' '}
                            {dest.driveNote}
                          </p>
                          <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-[#090909]">
                            {dest.name}
                          </h3>
                          <p className="mt-3 text-sm text-[#202020]/80 leading-relaxed">
                            {dest.editorialIntro}
                          </p>
                        </div>

                        <div className="mt-6 pt-5 border-t border-[#D8D0C2]">
                          <button
                            type="button"
                            onClick={() =>
                              onNavigate('book', {
                                destination: dest.name,
                                serviceType: 'cape-town-tour',
                              })
                            }
                            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#090909] hover:text-[#755A2B] transition-colors cursor-pointer py-1"
                          >
                            <span>Enquire About This Trip</span>
                            <ArrowRight
                              className="w-3.5 h-3.5 text-[#C6A66B]"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Itinerary Banner */}
      <section className="bg-[#090909] text-[#FAF9F6] py-16 lg:py-20 border-t border-[#C6A66B]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C6A66B]">
              Bespoke Private Routing
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#FAF9F6]">
              Combine Multiple Cape Town Stops in One Day
            </h2>
            <p className="mt-2.5 text-sm text-[#D8D0C2]/80 max-w-xl leading-relaxed">
              Pair Table Mountain with Camps Bay dining, or link Constantia tastings
              with a scenic peninsula drive. Share your ideas and we will tailor the
              schedule.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onNavigate('book', {
                destination: 'Custom Cape Town Private Tour',
                serviceType: 'cape-town-tour',
              })
            }
            className="px-7 py-4 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Plan Your Journey
          </button>
        </div>
      </section>
    </div>
  );
}

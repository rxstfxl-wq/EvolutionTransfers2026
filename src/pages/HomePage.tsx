import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CalendarCheck,
  CarFront,
  Clock,
  Compass,
  UserCheck,
  X,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { BookingFormCard } from '../components/BookingFormCard';
import { BookingGuideNotice } from '../components/BookingGuideNotice';
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

const MOBILE_POPUP_DURATION_MS = 7000;

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
  const shouldReduceMotion = useReducedMotion();
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const scrubbedTimeRef = useRef<number>(0);
  const bookingSectionRef = useRef<HTMLElement | null>(null);
  const hasTriggeredDesktopPopupRef = useRef<boolean>(false);

  const { scrollY, scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.35,
  });

  const parallaxY = useTransform(
    [smoothProgress, smoothVelocity],
    ([p, v]: number[]) => {
      const basePct = -5 + p * 12;
      const speedLagPct = Math.max(-2.2, Math.min(2.2, (v / 2200) * 2.2));
      return `${(basePct + speedLagPct).toFixed(2)}%`;
    }
  );
  const parallaxScale = useTransform(
    smoothVelocity,
    (v: number) => 1.18 + Math.min(0.05, Math.abs(v) / 35000)
  );

  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });
  const [showShuttlePopup, setShowShuttlePopup] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleViewportChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches);
    };
    setIsMobileViewport(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleViewportChange);
    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  // Mobile (<768px): auto-dismiss after 7 seconds
  useEffect(() => {
    if (!isMobileViewport || !showShuttlePopup) return;

    const dismissTimer = window.setTimeout(() => {
      setShowShuttlePopup(false);
    }, MOBILE_POPUP_DURATION_MS);

    return () => window.clearTimeout(dismissTimer);
  }, [isMobileViewport, showShuttlePopup]);

  // Desktop & Tablet (>=768px): trigger pop-up when the user reaches #booking-shortcut
  useEffect(() => {
    if (isMobileViewport || hasTriggeredDesktopPopupRef.current) return;
    const target = bookingSectionRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !hasTriggeredDesktopPopupRef.current) {
          hasTriggeredDesktopPopupRef.current = true;
          setShowShuttlePopup(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
        rootMargin: '0px 0px -15% 0px',
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isMobileViewport]);

  // Escape key dismissal across all viewports
  useEffect(() => {
    if (!showShuttlePopup) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowShuttlePopup(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showShuttlePopup]);

  // Hero video timestamp synced to scroll position and scroll speed (desktop + mobile browsers)
  useEffect(() => {
    if (shouldReduceMotion) return;
    const video = heroVideoRef.current;
    if (!video) return;

    let rafId: number | null = null;
    let isPrimed = false;
    let isCleanedUp = false;

    const getTargetState = (duration: number) => {
      const maxTime = Math.max(0, duration - 0.05);
      const progress = Math.max(0, Math.min(1, scrollYProgress.get()));
      const velocityPxPerSec = scrollVelocity.get();
      const speedNorm = Math.min(1, Math.abs(velocityPxPerSec) / 2400);
      const velocityOffset = Math.max(
        -0.45,
        Math.min(0.45, (velocityPxPerSec / 2400) * 0.45)
      );
      const targetTime = Math.max(
        0,
        Math.min(maxTime, progress * maxTime + velocityOffset)
      );
      return { maxTime, velocityPxPerSec, speedNorm, targetTime };
    };

    const tick = () => {
      rafId = null;
      if (isCleanedUp) return;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0 || video.readyState < 1) {
        return;
      }

      const { velocityPxPerSec, speedNorm, targetTime } = getTargetState(duration);

      // Faster scroll accelerates scrub responsiveness and adds directional momentum
      const lerpFactor = 0.12 + speedNorm * 0.3;
      scrubbedTimeRef.current += (targetTime - scrubbedTimeRef.current) * lerpFactor;

      if (
        !video.seeking &&
        Math.abs(video.currentTime - scrubbedTimeRef.current) > 0.016
      ) {
        try {
          video.currentTime = scrubbedTimeRef.current;
        } catch {
          // Ignore mobile seek errors prior to full buffer readyState
        }
      }

      if (
        Math.abs(targetTime - scrubbedTimeRef.current) > 0.008 ||
        Math.abs(velocityPxPerSec) > 5
      ) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const scheduleTick = () => {
      if (!isCleanedUp && rafId === null) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const primeMobileDecoder = () => {
      if (isPrimed || isCleanedUp) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            isPrimed = true;
            if (!isCleanedUp) {
              video.pause();
              scheduleTick();
            }
          })
          .catch(() => {
            // Mobile Low Power Mode blocks play() until first touch gesture
          });
      }
    };

    const syncInitialFrame = () => {
      video.pause();
      const duration = video.duration;
      if (Number.isFinite(duration) && duration > 0) {
        const { maxTime } = getTargetState(duration);
        const initialProgress = Math.max(0, Math.min(1, scrollYProgress.get()));
        const initialTime = Math.max(
          0.02,
          Math.min(maxTime, initialProgress * maxTime)
        );
        scrubbedTimeRef.current = initialTime;
        try {
          video.currentTime = initialTime;
        } catch {
          // Safe guard for browsers buffering initial keyframes
        }
      }
      primeMobileDecoder();
      scheduleTick();
    };

    const handleFirstTouch = () => {
      primeMobileDecoder();
      scheduleTick();
    };

    if (video.readyState === 0) {
      video.load();
    } else {
      syncInitialFrame();
    }

    video.addEventListener('loadedmetadata', syncInitialFrame);
    video.addEventListener('loadeddata', syncInitialFrame);
    video.addEventListener('canplay', scheduleTick);
    video.addEventListener('seeked', scheduleTick);

    window.addEventListener('touchstart', handleFirstTouch, {
      once: true,
      passive: true,
    });
    window.addEventListener('pointerdown', handleFirstTouch, {
      once: true,
      passive: true,
    });
    window.addEventListener('scroll', scheduleTick, { passive: true });

    const unsubscribeProgress = scrollYProgress.on('change', scheduleTick);
    const unsubscribeVelocity = scrollVelocity.on('change', scheduleTick);

    return () => {
      isCleanedUp = true;
      video.removeEventListener('loadedmetadata', syncInitialFrame);
      video.removeEventListener('loadeddata', syncInitialFrame);
      video.removeEventListener('canplay', scheduleTick);
      video.removeEventListener('seeked', scheduleTick);
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('pointerdown', handleFirstTouch);
      window.removeEventListener('scroll', scheduleTick);
      unsubscribeProgress();
      unsubscribeVelocity();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [shouldReduceMotion, scrollYProgress, scrollVelocity]);

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
      pickupLocation: draft?.pickupLocation,
      destination: draft?.destination,
      serviceType: draft?.serviceType,
    });
  };

  const handleComplimentarySelect = (dest: string) => {
    setShowShuttlePopup(false);
    onNavigate('book', {
      pickupLocation: COMPLIMENTARY_SHUTTLE.pickupLocation,
      destination: dest,
      serviceType: 'hotel-private',
    });
  };

  return (
    <div>
      {/* POP-UP: COMPLIMENTARY HOTEL SHUTTLE (Mobile: 7s on open/refresh; Tablet & Desktop: on reaching #booking-shortcut) */}
      <AnimatePresence>
        {showShuttlePopup && (
          <motion.div
            key="shuttle-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shuttle-popup-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
            onClick={() => setShowShuttlePopup(false)}
            className="fixed inset-0 z-50 bg-[#090909]/75 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm md:max-w-xl bg-[#090909] text-[#FAF9F6] border border-[#C6A66B]/60 p-5 md:p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-[#C6A66B] pt-1">
                  {COMPLIMENTARY_SHUTTLE.kicker}
                </p>
                <button
                  type="button"
                  onClick={() => setShowShuttlePopup(false)}
                  aria-label="Close complimentary shuttle notice"
                  className="w-9 h-9 md:w-10 md:h-10 -mt-1 -mr-1 inline-flex items-center justify-center border border-[#C6A66B]/30 text-[#D8D0C2] hover:text-[#FAF9F6] hover:border-[#C6A66B] transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p
                id="shuttle-popup-title"
                className="mt-2 md:mt-3 font-serif text-xl md:text-3xl text-[#FAF9F6] leading-snug"
              >
                {COMPLIMENTARY_SHUTTLE.title}
              </p>
              <p className="mt-1.5 md:mt-2 text-sm md:text-base text-[#D8D0C2] leading-relaxed">
                {COMPLIMENTARY_SHUTTLE.routeSummary}
              </p>

              <div className="mt-5 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                {COMPLIMENTARY_SHUTTLE.destinations.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => handleComplimentarySelect(dest)}
                    className="inline-flex items-center justify-between gap-2 px-4 py-3 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.12em] uppercase transition-colors cursor-pointer min-h-[44px]"
                  >
                    <span>
                      {dest === 'Canal Walk Shopping Centre' ? 'Canal Walk' : dest}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>

              {isMobileViewport && !shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{
                    duration: MOBILE_POPUP_DURATION_MS / 1000,
                    ease: 'linear',
                  }}
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#C6A66B] origin-left"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION (Mobile: top scroll-linked video frame -> obsidian copy; Desktop: full-bleed scroll-linked video) */}
      <section
        ref={heroSectionRef}
        aria-labelledby="hero-heading"
        className="relative bg-[#090909] text-[#FAF9F6] overflow-hidden lg:min-h-[680px] flex flex-col lg:flex-row lg:items-center"
      >
        {/* Unified Responsive Scroll-Parallax & Scrubbed Video Frame */}
        <div className="relative w-full aspect-[16/10] sm:aspect-auto sm:h-80 lg:h-full lg:absolute lg:inset-0 overflow-hidden bg-[#090909]">
          <motion.video
            ref={heroVideoRef}
            poster={HERO_MEDIA.image}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            aria-label={HERO_MEDIA.videoAlt}
            style={
              shouldReduceMotion
                ? undefined
                : { y: parallaxY, scale: parallaxScale }
            }
            className="block w-full h-full object-cover object-center lg:object-[70%_center] will-change-transform"
          >
            <source src={HERO_MEDIA.video} type="video/mp4" />
            <source src={HERO_MEDIA.videoFallback} type="video/mp4" />
          </motion.video>
          <div
            aria-hidden="true"
            className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/20 to-transparent pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#090909]/92 via-[#090909]/68 to-[#090909]/20 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-0 bg-gradient-to-t from-[#090909]/85 via-transparent to-[#090909]/40 pointer-events-none"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pt-6 sm:pb-16 lg:py-28">
          <div className="max-w-xl">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.22em] uppercase text-[#C6A66B]">
              Cape Town Private Transfers &amp; Chauffeur Service
            </p>
            <h1
              id="hero-heading"
              className="mt-3 sm:mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.06] text-[#FAF9F6] text-balance"
            >
              Your Journey, Evolved.
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-[#F4F0E8]/90 leading-relaxed max-w-lg">
              Experience Cape Town with comfortable, reliable and professional private
              transfers. From airport arrivals to unforgettable local journeys,
              travel with confidence.
            </p>

            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
              <button
                type="button"
                onClick={scrollToBookingShortcut}
                className="w-full sm:w-auto px-7 py-4 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap min-h-[48px]"
              >
                Book Your Transfer
              </button>
              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="w-full sm:w-auto px-7 py-4 border border-[#C6A66B]/80 hover:border-[#C6A66B] hover:bg-[#C6A66B]/12 text-[#FAF9F6] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap min-h-[48px]"
              >
                Explore Cape Town
              </button>
            </div>

            <p className="mt-7 sm:mt-8 pt-5 sm:pt-6 border-t border-[#FAF9F6]/15 text-xs tracking-[0.06em] sm:tracking-[0.08em] text-[#D8D0C2]/90 leading-relaxed">
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
        ref={bookingSectionRef}
        id="booking-shortcut"
        aria-label="Quick Transfer Booking Enquiry"
        className="bg-[#F4F0E8] py-10 sm:py-14 lg:py-20 border-b border-[#D8D0C2]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingGuideNotice />
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
        className="bg-[#F4F0E8] text-[#090909] py-14 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-8 lg:pb-10 border-b border-[#D8D0C2]">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#755A2B]">
                Our Services
              </p>
              <h2
                id="services-heading"
                className="mt-2.5 sm:mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#090909] text-balance"
              >
                Tailored Private Mobility Across Cape Town
              </h2>
            </div>
            <p className="text-sm text-[#202020]/75 max-w-md leading-relaxed">
              Every transfer is operated privately in our Mercedes-Benz V-Class
              fleet—combining hospitality warmth with quiet punctuality.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
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
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
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

                  <div className="mt-5 sm:mt-6 pt-4 border-t border-[#D8D0C2]">
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate('book', { serviceType: service.id })
                      }
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#090909] hover:text-[#755A2B] transition-colors cursor-pointer py-1.5"
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
        className="bg-[#FAF9F6] text-[#090909] py-14 sm:py-20 lg:py-24 border-t border-[#D8D0C2]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#755A2B]">
              The Evolution Standard
            </p>
            <h2
              id="why-evolution-heading"
              className="mt-2.5 sm:mt-3 font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#090909] text-balance"
            >
              Why Guests &amp; Concierges Choose Evolution Transfers
            </h2>
          </div>

          <div className="mt-8 sm:mt-12 divide-y divide-[#D8D0C2] sm:divide-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-6">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="py-5 sm:py-0 sm:pt-6 sm:border-t sm:border-[#C6A66B]/60"
              >
                <div className="flex items-start gap-2.5">
                  <div className="h-7 flex items-center justify-center shrink-0">
                    {renderReasonIcon(item.iconName)}
                  </div>
                  <h3 className="font-serif text-xl leading-7 font-medium text-[#090909]">
                    {item.title}
                  </h3>
                </div>
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
        className="bg-[#2C2A26] text-[#FAF9F6] py-14 sm:py-20 lg:py-24 border-t border-[#C6A66B]/25"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C6A66B]">
            Private Cape Town Concierge
          </p>
          <h2
            id="final-cta-heading"
            className="mt-3 sm:mt-4 font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#FAF9F6] text-balance"
          >
            Wherever You&rsquo;re Going, Let&rsquo;s Get You There.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#D8D0C2]/85 max-w-xl mx-auto leading-relaxed">
            Whether arriving at Cape Town International Airport or planning a coastal
            day across the peninsula, request your transfer in seconds.
          </p>
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={() => onNavigate('book')}
              className="w-full sm:w-auto px-8 py-4 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer min-h-[48px]"
            >
              Book Your Transfer
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 border border-[#C6A66B]/60 hover:border-[#C6A66B] text-[#FAF9F6] text-xs font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer min-h-[48px]"
            >
              Speak With Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

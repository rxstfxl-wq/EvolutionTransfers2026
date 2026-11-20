import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { AboutPage } from './pages/AboutPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { ExplorePage } from './pages/ExplorePage';
import { HomePage } from './pages/HomePage';
import { PageRoute, ServiceTypeId } from './types';

function routeFromHash(): PageRoute {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'explore' || hash === 'about' || hash === 'book' || hash === 'contact') {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [route, setRoute] = useState<PageRoute>(() => routeFromHash());
  const [prefilledPickupLocation, setPrefilledPickupLocation] = useState<string>('');
  const [prefilledDestination, setPrefilledDestination] = useState<string>('');
  const [prefilledServiceType, setPrefilledServiceType] =
    useState<ServiceTypeId>('hotel-private');

  useEffect(() => {
    const handleHashChange = () => {
      const next = routeFromHash();
      setRoute(next);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback(
    (
      nextRoute: PageRoute,
      options?: {
        sectionId?: string;
        pickupLocation?: string;
        destination?: string;
        serviceType?: ServiceTypeId;
      }
    ) => {
      if (options?.pickupLocation !== undefined) {
        setPrefilledPickupLocation(options.pickupLocation);
      }
      if (options?.destination !== undefined) {
        setPrefilledDestination(options.destination);
      }
      if (options?.serviceType !== undefined) {
        setPrefilledServiceType(options.serviceType);
      }

      setRoute(nextRoute);
      const targetHash =
        options?.sectionId && nextRoute === 'home'
          ? `#${options.sectionId}`
          : `#${nextRoute}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }

      if (options?.sectionId && nextRoute === 'home') {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const el = document.getElementById(options.sectionId!);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 40);
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#090909] text-[#090909]">
      <Navbar currentRoute={route} onNavigate={navigate} />

      <main className="flex-1">
        {route === 'home' && <HomePage onNavigate={navigate} />}
        {route === 'explore' && <ExplorePage onNavigate={navigate} />}
        {route === 'about' && <AboutPage onNavigate={navigate} />}
        {route === 'book' && (
          <BookingPage
            prefilledPickupLocation={prefilledPickupLocation}
            prefilledDestination={prefilledDestination}
            prefilledServiceType={prefilledServiceType}
          />
        )}
        {route === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}

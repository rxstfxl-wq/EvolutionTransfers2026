import {
  DestinationCategory,
  DestinationItem,
  ServiceItem,
  WhyChooseItem,
} from '../types';

export const BUSINESS_CONTACT = {
  brandName: 'Evolution Transfers',
  tagline: 'Your Journey, Evolved.',
  phoneDisplay: '+27 (0) 78 325 9513',
  phoneHref: 'tel:+27783259513',
  whatsappNumber: '27783259513',
  whatsappHref: 'https://wa.me/27783259513',
  email: 'info@evotransfers.co.za',
  emailHref: 'mailto:info@evotransfers.co.za',
  serviceArea: 'Cape Town, Atlantic Seaboard, Cape Peninsula & Western Cape',
  operatingHours: 'Pre-booked transfers 24/7 · Concierge desk 06:00 – 22:00 SAST',
  emergencyNote: '24/7 dispatch support for active arrivals and flight schedule changes',
} as const;

export const HERO_MEDIA = {
  video: '/media/landing/hero-scroll.mp4',
  videoFallback: '/media/landing/gemini_generated_video_32547dd8.mp4',
  videoAlt:
    'Mercedes-Benz Evolution Transfers vans cruising along the sunlit Cape Town coastline with Table Mountain and Lion’s Head in the background',
  image: '/media/landing/Mercedes%20Vans%20by%20the%20Sunlit%20Shore.png',
  alt: 'Three black Mercedes-Benz Evolution Transfers vans parked along the sunlit Cape Town shore with Table Mountain and Lion’s Head in the background',
};

export const COMPLIMENTARY_SHUTTLE = {
  kicker: 'Complimentary Hotel Transfers',
  title: 'Free Pick-Up & Drop-Off Transfers',
  routeSummary:
    'From Lagoon Beach Hotel & Spa to V&A Waterfront & Canal Walk Shopping Centre',
  description:
    'Guests at Lagoon Beach Hotel & Spa enjoy complimentary pick-up and drop-off transfers to both the V&A Waterfront and Canal Walk Shopping Centre.',
  pickupLocation: 'Lagoon Beach Hotel & Spa',
  destinations: ['V&A Waterfront', 'Canal Walk Shopping Centre'] as const,
} as const;

export const ABOUT_MEDIA = {
  chauffeur: '/media/landing/Mercedes%20Vans%20by%20the%20Sunlit%20Shore.png',
  chauffeurAlt:
    'Three black Mercedes-Benz Evolution Transfers vans parked along the sunlit Cape Town shore with Table Mountain and Lion’s Head in the background',
  interior: '/media/Services/Mercedes%20Van%20and%20South%20African%20Flag-Tailed%20Plane.png',
  interiorAlt:
    'Black Mercedes-Benz Evolution Transfers van parked tarmac-side beside an aircraft bearing a South African flag tailfin at Cape Town International Airport',
  hotelArrival: '/media/Services/Luxury%20Vans%20Along%20the%20Lagoon%20Beach.png',
  hotelArrivalAlt:
    'Black Mercedes-Benz Evolution Transfers vans parked at the entrance along Lagoon Beach in Cape Town',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'airport',
    index: '01',
    title: 'Airport Transfers',
    summary:
      'Seamless Cape Town International arrivals and departures with meet-and-greet assistance and punctual curbside collection.',
    details:
      'Flight-monitored pickups with luggage support and calm, direct passage from terminal to your hotel or private residence.',
    image: '/media/Services/Mercedes%20Van%20and%20South%20African%20Flag-Tailed%20Plane.png',
    imageAlt:
      'Black Mercedes-Benz Evolution Transfers van parked tarmac-side beside an aircraft bearing a South African flag tailfin at Cape Town International Airport',
  },
  {
    id: 'hotel-private',
    index: '02',
    title: 'Hotel & Private Transfers',
    summary:
      'Discreet door-to-door chauffeur transport between Lagoon Beach Hotel & Spa, city hotels, private villas, and dining venues.',
    details:
      'Effortless point-to-point journeys tailored for solo travellers, couples, and families seeking quiet comfort across Cape Town.',
    image: '/media/Services/Luxury%20Vans%20Along%20the%20Lagoon%20Beach.png',
    imageAlt:
      'Black Mercedes-Benz Evolution Transfers vans parked at the entrance along Lagoon Beach in Cape Town',
  },
  {
    id: 'corporate-group',
    index: '03',
    title: 'Corporate & Group Transfers',
    summary:
      'Executive roadshows, conference shuttles, and coordinated multi-passenger transfers in spacious Mercedes-Benz V-Class vehicles.',
    details:
      'Dedicated scheduling for diplomatic, corporate, and small-group itineraries requiring strict punctuality and privacy.',
    image: '/media/Services/Luxury%20Briefcase%20by%20Executive%20Van.png',
    imageAlt:
      'Executive leather briefcase placed beside an open black Mercedes-Benz V-Class door ready for corporate transfers',
  },
  {
    id: 'cape-town-tour',
    index: '04',
    title: 'Private Cape Town Tours',
    summary:
      'Tailored full-day and half-day private drives across the Cape Peninsula, Atlantic coastline, and Western Cape Winelands.',
    details:
      'Set your own pace with an experienced local driver who knows every scenic overlook, wine estate, and coastal pass.',
    image: '/media/explore/Camps%20Bay%20Coastal%20Panorama.png',
    imageAlt:
      'Panoramic coastal view of Camps Bay beachfront and turquoise bay beneath the Twelve Apostles mountains along Cape Town’s tour route',
  },
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: 'drivers',
    title: 'Professional Drivers',
    description:
      'Attentive, discreet, and locally knowledgeable chauffeurs dressed in formal attire.',
    iconName: 'chauffeur',
  },
  {
    id: 'vehicles',
    title: 'Comfortable Vehicles',
    description:
      'Spacious black Mercedes-Benz V-Class interiors maintained to immaculate hospitality standards.',
    iconName: 'vehicle',
  },
  {
    id: 'punctual',
    title: 'Reliable & Punctual Pickups',
    description:
      'Timely collections coordinated around flight arrivals, hotel check-outs, and dinner reservations.',
    iconName: 'clock',
  },
  {
    id: 'direct',
    title: 'Convenient Direct Bookings',
    description:
      'Straightforward enquiry requests with direct WhatsApp and email communication—no friction.',
    iconName: 'booking',
  },
  {
    id: 'personalised',
    title: 'Personalised Travel Experiences',
    description:
      'Flexible private itineraries shaped around your luggage, group size, and Western Cape schedule.',
    iconName: 'compass',
  },
];

export const DESTINATION_CATEGORIES: DestinationCategory[] = [
  'Cape Town Highlights',
  'Coastal Destinations',
  'Wine Routes',
  'Day Trips',
  'Beyond Cape Town',
];

export const DESTINATIONS: DestinationItem[] = [
  {
    id: 'table-mountain',
    name: 'Table Mountain',
    category: 'Cape Town Highlights',
    region: 'Table Mountain Aerial Cableway',
    driveNote: '20 min from City Bowl',
    shortDescription:
      'Direct private drop-off at the Lower Cableway Station and Signal Hill viewpoints without parking delays.',
    editorialIntro:
      'Arrive effortlessly at Cape Town’s iconic flat-topped massif in time for crisp morning light or golden sunset views over the Atlantic.',
    image: '/media/explore/pexels-magda-ehlers-pexels-32555593.jpg',
    imageAlt:
      'Iconic yellow Table Mountain photo frame overlooking Table Bay, Table Mountain, and Lion’s Head in Cape Town',
    featuredInCarousel: true,
  },
  {
    id: 'camps-bay',
    name: 'Camps Bay',
    category: 'Coastal Destinations',
    region: 'Atlantic Seaboard',
    driveNote: '25 min coastal drive',
    shortDescription:
      'Palm-lined beachfront promenade beneath the Twelve Apostles—ideal for sunset dining and leisure pickups.',
    editorialIntro:
      'Travel along Victoria Road with sweeping ocean vistas before stepping out right beside Camps Bay’s seaside cafés and white sands.',
    image: '/media/explore/Camps%20Bay%20Coastal%20Panorama.png',
    imageAlt:
      'Panoramic coastal view of Camps Bay beachfront and turquoise bay beneath the Twelve Apostles mountains',
    featuredInCarousel: true,
  },
  {
    id: 'clifton-beaches',
    name: 'Clifton Beaches',
    category: 'Coastal Destinations',
    region: 'Clifton First to Fourth',
    driveNote: '20 min from Lagoon Beach',
    shortDescription:
      'Sheltered Atlantic coves with effortless chauffeur drop-off and scheduled evening collection.',
    editorialIntro:
      'Skip narrow coastal street parking with punctual private drop-off above Clifton’s granite boulders and sheltered turquoise bays.',
    image: '/media/explore/pexels-stephanlouis-10010546.jpg',
    imageAlt:
      'White sandy bay and granite coastal boulders overlooking turquoise surf beneath Lion’s Head near Clifton Beaches, Cape Town',
    featuredInCarousel: true,
  },
  {
    id: 'va-waterfront',
    name: 'V&A Waterfront',
    category: 'Cape Town Highlights',
    region: 'Working Harbour & Marina',
    driveNote: '15 min from Lagoon Beach',
    shortDescription:
      'Complimentary pick-up & drop-off transfers from Lagoon Beach Hotel & Spa, plus direct private harbour rides.',
    editorialIntro:
      'Connect smoothly between Lagoon Beach Hotel & Spa and Cape Town’s historic working harbour—including complimentary guest pick-up and drop-off transfers.',
    image: '/media/explore/pexels-ccaupers-17391088.jpg',
    imageAlt:
      'Sunlit Victoria Wharf facade and pedestrian bridge at the V&A Waterfront in Cape Town',
    featuredInCarousel: true,
  },
  {
    id: 'canal-walk',
    name: 'Canal Walk Shopping Centre',
    category: 'Cape Town Highlights',
    region: 'Century City',
    driveNote: '10 min from Lagoon Beach',
    shortDescription:
      'Complimentary pick-up & drop-off transfers from Lagoon Beach Hotel & Spa directly to Century City’s flagship retail & dining precinct.',
    editorialIntro:
      'Enjoy complimentary hotel pick-up and drop-off transfers between Lagoon Beach Hotel & Spa and Canal Walk Shopping Centre for relaxed shopping, cinema, and dining.',
    image: '/media/explore/pexels-clickshadow-31251547.jpg',
    imageAlt:
      'Sunlit vaulted glass ceiling and neoclassical interior arcade of Canal Walk Shopping Centre in Century City, Cape Town',
    featuredInCarousel: true,
  },
  {
    id: 'cape-point',
    name: 'Cape Point',
    category: 'Day Trips',
    region: 'Cape Peninsula & Chapman’s Peak',
    driveNote: 'Full-day private tour',
    shortDescription:
      'Journey via Chapman’s Peak Drive and Boulders Beach to the dramatic cliffs of the Cape of Good Hope.',
    editorialIntro:
      'Experience one of the world’s great coastal drives in unhurried comfort, pausing for penguins at Boulders and windswept lighthouse views.',
    image: '/media/explore/pexels-zhang-thomas-710712620-34168782.jpg',
    imageAlt:
      'Dramatic stone cliffs and coastal footpath looking out over the ocean at Cape Point in Cape Town',
    featuredInCarousel: true,
  },
  {
    id: 'stellenbosch',
    name: 'Stellenbosch',
    category: 'Wine Routes',
    region: 'Cape Winelands',
    driveNote: '50 min east of Cape Town',
    shortDescription:
      'Private chauffeur-driven tastings across historic oak-lined estates so every guest can relax.',
    editorialIntro:
      'Savour Stellenbosch’s renowned Cabernet estates, sculpture gardens, and Cape Dutch architecture with dedicated door-to-cellar transport.',
    image: '/media/explore/pexels-magda-ehlers-pexels-38339208.jpg',
    imageAlt:
      'Sunlit Stellenbosch vineyard valley and golden fields framed by rugged Cape Winelands mountains under a soft sky',
    featuredInCarousel: true,
  },
  {
    id: 'franschhoek',
    name: 'Franschhoek',
    category: 'Wine Routes',
    region: 'Franschhoek Valley',
    driveNote: '65 min scenic valley drive',
    shortDescription:
      'South Africa’s culinary and Méthode Cap Classique valley, tailored to your estate reservations.',
    editorialIntro:
      'Spend the day moving calmly between mountain-ringed vineyards, tasting rooms, and celebrated valley kitchens on your own timetable.',
    image: '/media/explore/dezalb-south-africa-1544691.jpg',
    imageAlt:
      'Sunlit green hillside vineyards and rural estate buildings nestled beneath dramatic mountain peaks in the Franschhoek valley',
    featuredInCarousel: true,
  },
  {
    id: 'constantia-wine-route',
    name: 'Constantia Wine Route',
    category: 'Wine Routes',
    region: 'Southern Suburbs Valley',
    driveNote: '25 min from Cape Town',
    shortDescription:
      'Half-day private excursions to the Cape’s oldest wine-producing estates tucked behind Table Mountain.',
    editorialIntro:
      'Close to the city yet steeped in centuries of heritage, Constantia offers cool-climate Sauvignon Blanc tastings and shaded vineyard lunches.',
    image: '/media/explore/cocoparisienne-winery-241667.jpg',
    imageAlt:
      'Historic white Cape Dutch gabled wine estate homestead framed by mature oak trees and emerald lawns in the Constantia Valley',
    featuredInCarousel: true,
  },
  {
    id: 'hermanus',
    name: 'Hermanus',
    category: 'Beyond Cape Town',
    region: 'Walker Bay Whale Coast',
    driveNote: '1 hr 45 min via Clarence Drive',
    shortDescription:
      'Full-day or overnight private coastal transfers along Clarence Drive to Walker Bay’s cliff paths.',
    editorialIntro:
      'Follow the dramatic mountain-meets-ocean bends of Clarence Drive to Hermanus for seasonal whale watching and Hemel-en-Aarde estates.',
    image: '/media/explore/pexels-niklas-eichler-2137446-3770290.jpg',
    imageAlt:
      'Historic Old Harbour stone slipway overlooking emerald Walker Bay ocean waters and coastal mountains in Hermanus',
    featuredInCarousel: true,
  },
];

export const QUICK_LOCATIONS = [
  'Lagoon Beach Hotel & Spa',
  'V&A Waterfront',
  'Canal Walk Shopping Centre',
  'Cape Town International Airport (CPT)',
  'Camps Bay',
  'Cape Town City Bowl',
  'Stellenbosch Winelands',
  'Franschhoek Valley',
  'Cape Point & Peninsula',
  'Hermanus',
];

export const LUGGAGE_OPTIONS = [
  'Light (Carry-on only)',
  'Standard (1–3 Suitcases)',
  'Generous (4–6 Suitcases)',
  'Extended / Oversized (Golf bags or group luggage)',
];

export type PageRoute = 'home' | 'explore' | 'about' | 'book' | 'contact';

export type ServiceTypeId =
  | 'airport'
  | 'hotel-private'
  | 'corporate-group'
  | 'cape-town-tour';

export type DestinationCategory =
  | 'Cape Town Highlights'
  | 'Coastal Destinations'
  | 'Wine Routes'
  | 'Day Trips'
  | 'Beyond Cape Town';

export type TripType = 'one-way' | 'return';

export interface ServiceItem {
  id: ServiceTypeId;
  index: string;
  title: string;
  summary: string;
  details: string;
  image: string;
  imageAlt: string;
}

export interface DestinationItem {
  id: string;
  name: string;
  category: DestinationCategory;
  region: string;
  driveNote: string;
  shortDescription: string;
  editorialIntro: string;
  image: string;
  imageAlt: string;
  featuredInCarousel: boolean;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: 'chauffeur' | 'vehicle' | 'clock' | 'booking' | 'compass';
}

export interface TransferEnquiry {
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  destination: string;
  travelDate: string;
  pickupTime: string;
  passengers: number;
  luggage: string;
  tripType: TripType;
  returnDate: string;
  returnTime: string;
  serviceType: ServiceTypeId;
  flightNumber: string;
  additionalInfo: string;
}

export interface ContactEnquiry {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

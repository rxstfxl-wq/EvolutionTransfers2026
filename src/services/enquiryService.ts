import { BUSINESS_CONTACT, SERVICES } from '../data/catalog';
import { ContactEnquiry, TransferEnquiry } from '../types';

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateTransferEnquiry(
  data: TransferEnquiry,
  mode: 'shortcut' | 'full'
): ValidationErrors<TransferEnquiry> {
  const errors: ValidationErrors<TransferEnquiry> = {};

  if (!data.pickupLocation.trim()) {
    errors.pickupLocation = 'Please enter a pickup location.';
  }
  if (!data.destination.trim()) {
    errors.destination = 'Please enter a destination.';
  }
  if (!data.travelDate) {
    errors.travelDate = 'Please select your travel date.';
  }
  if (!data.pickupTime) {
    errors.pickupTime = 'Please select a pickup time.';
  }
  if (!data.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  }
  if (!data.email.trim() || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  const phoneDigits = data.phone.replace(/\D/g, '');
  if (phoneDigits.length < 8) {
    errors.phone = 'Please enter a valid contact number.';
  }

  if (mode === 'full' && data.tripType === 'return') {
    if (!data.returnDate) {
      errors.returnDate = 'Please select a return travel date.';
    }
    if (!data.returnTime) {
      errors.returnTime = 'Please select a return pickup time.';
    }
  }

  return errors;
}

export function validateContactEnquiry(
  data: ContactEnquiry
): ValidationErrors<ContactEnquiry> {
  const errors: ValidationErrors<ContactEnquiry> = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Please enter your name.';
  }
  if (!data.email.trim() || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  const phoneDigits = data.phone.replace(/\D/g, '');
  if (phoneDigits.length < 8) {
    errors.phone = 'Please enter a valid contact number.';
  }
  if (!data.message.trim()) {
    errors.message = 'Please share a brief message about your enquiry.';
  }

  return errors;
}

export function formatServiceLabel(serviceId: TransferEnquiry['serviceType']): string {
  return SERVICES.find((s) => s.id === serviceId)?.title ?? 'Private Transfer';
}

export function formatTransferSummaryText(data: TransferEnquiry): string {
  const lines = [
    'Hello Evolution Transfers,',
    '',
    'I would like to request a private transfer enquiry:',
    `• Service: ${formatServiceLabel(data.serviceType)}`,
    `• Trip Type: ${data.tripType === 'return' ? 'Return Journey' : 'One-Way Transfer'}`,
    `• Pickup: ${data.pickupLocation.trim()}`,
    `• Destination: ${data.destination.trim()}`,
    `• Date & Time: ${data.travelDate} at ${data.pickupTime}`,
  ];

  if (data.tripType === 'return' && (data.returnDate || data.returnTime)) {
    lines.push(
      `• Return Leg: ${data.returnDate || 'Flexible date'} at ${data.returnTime || 'Flexible time'}`
    );
  }

  lines.push(`• Passengers: ${data.passengers}`);
  if (data.luggage.trim()) {
    lines.push(`• Luggage: ${data.luggage.trim()}`);
  }

  if (data.flightNumber.trim()) {
    lines.push(`• Flight Number: ${data.flightNumber.trim()}`);
  }
  if (data.additionalInfo.trim()) {
    lines.push(`• Notes: ${data.additionalInfo.trim()}`);
  }

  lines.push(
    '',
    'Guest Contact Details:',
    `• Name: ${data.fullName.trim()}`,
    `• Email: ${data.email.trim()}`,
    `• Phone: ${data.phone.trim()}`
  );

  return lines.join('\n');
}

export function buildWhatsAppTransferUrl(data: TransferEnquiry): string {
  const text = encodeURIComponent(formatTransferSummaryText(data));
  return `${BUSINESS_CONTACT.whatsappHref}?text=${text}`;
}

export function buildMailtoTransferUrl(data: TransferEnquiry): string {
  const subject = encodeURIComponent(
    `Transfer Enquiry: ${data.pickupLocation.trim()} to ${data.destination.trim()} (${data.travelDate})`
  );
  const body = encodeURIComponent(formatTransferSummaryText(data));
  return `${BUSINESS_CONTACT.emailHref}?subject=${subject}&body=${body}`;
}

export function formatContactSummaryText(data: ContactEnquiry): string {
  return [
    'Hello Evolution Transfers,',
    '',
    `Subject: ${data.subject.trim() || 'General Enquiry'}`,
    `Name: ${data.fullName.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone.trim()}`,
    '',
    'Message:',
    data.message.trim(),
  ].join('\n');
}

export function buildWhatsAppContactUrl(data: ContactEnquiry): string {
  return `${BUSINESS_CONTACT.whatsappHref}?text=${encodeURIComponent(formatContactSummaryText(data))}`;
}

export function buildMailtoContactUrl(data: ContactEnquiry): string {
  const subject = encodeURIComponent(
    data.subject.trim()
      ? `Evolution Transfers Enquiry: ${data.subject.trim()}`
      : 'Evolution Transfers General Enquiry'
  );
  const body = encodeURIComponent(formatContactSummaryText(data));
  return `${BUSINESS_CONTACT.emailHref}?subject=${subject}&body=${body}`;
}

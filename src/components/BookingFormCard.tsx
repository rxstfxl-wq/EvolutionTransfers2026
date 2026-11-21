import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Luggage,
  Mail,
  MapPin,
  MessageCircle,
  RotateCcw,
  Users,
} from 'lucide-react';
import {
  LUGGAGE_OPTIONS,
  QUICK_LOCATIONS,
  SERVICES,
} from '../data/catalog';
import {
  buildMailtoTransferUrl,
  buildWhatsAppTransferUrl,
  formatServiceLabel,
  validateTransferEnquiry,
  ValidationErrors,
} from '../services/enquiryService';
import { ServiceTypeId, TransferEnquiry, TripType } from '../types';

interface BookingFormCardProps {
  variant: 'shortcut' | 'full';
  prefilledPickupLocation?: string;
  prefilledDestination?: string;
  prefilledServiceType?: ServiceTypeId;
  onOpenFullBooking?: (draft?: Partial<TransferEnquiry>) => void;
}

function getTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function BookingFormCard({
  variant,
  prefilledPickupLocation = '',
  prefilledDestination = '',
  prefilledServiceType = 'hotel-private',
  onOpenFullBooking,
}: BookingFormCardProps) {
  const [form, setForm] = useState<TransferEnquiry>({
    fullName: '',
    email: '',
    phone: '',
    pickupLocation: prefilledPickupLocation,
    destination: prefilledDestination,
    travelDate: getTodayIso(),
    pickupTime: '10:00',
    passengers: 2,
    luggage: variant === 'full' ? LUGGAGE_OPTIONS[1] : '',
    tripType: 'one-way',
    returnDate: '',
    returnTime: '16:00',
    serviceType: prefilledServiceType,
    flightNumber: '',
    additionalInfo: '',
  });

  const [errors, setErrors] = useState<ValidationErrors<TransferEnquiry>>({});
  const [submittedEnquiry, setSubmittedEnquiry] = useState<TransferEnquiry | null>(
    null
  );

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      pickupLocation: prefilledPickupLocation || prev.pickupLocation,
      destination: prefilledDestination || prev.destination,
      serviceType: prefilledServiceType || prev.serviceType,
    }));
  }, [prefilledPickupLocation, prefilledDestination, prefilledServiceType]);

  const updateField = <K extends keyof TransferEnquiry>(
    key: K,
    value: TransferEnquiry[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTransferEnquiry(form, variant);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmittedEnquiry({ ...form });
  };

  if (submittedEnquiry) {
    const whatsappUrl = buildWhatsAppTransferUrl(submittedEnquiry);
    const mailtoUrl = buildMailtoTransferUrl(submittedEnquiry);

    return (
      <div className="bg-[#FAF9F6] border border-[#D8D0C2] p-6 sm:p-8 lg:p-10 text-[#090909]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#D8D0C2]">
          <div className="flex items-start gap-3.5">
            <CheckCircle2
              className="w-6 h-6 text-[#C6A66B] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#755A2B]">
                Enquiry Ready to Dispatch
              </p>
              <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-medium text-[#090909]">
                Choose How to Send Your Request
              </h3>
              <p className="mt-2 text-sm text-[#202020]/80 max-w-2xl leading-relaxed">
                Your transfer details are prepared below. Send directly via WhatsApp
                for the fastest response from our Cape Town dispatch desk, or open
                your email client addressed to{' '}
                <span className="font-medium text-[#090909]">
                  info@evotransfers.co.za
                </span>
                . Availability and tailored routing are confirmed directly with you
                upon receipt.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSubmittedEnquiry(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.12em] uppercase text-[#202020] hover:text-[#755A2B] whitespace-nowrap shrink-0 cursor-pointer py-2"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Edit Details</span>
          </button>
        </div>

        <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-[#202020]/60">
              Pickup
            </dt>
            <dd className="mt-1 font-medium text-[#090909]">
              {submittedEnquiry.pickupLocation}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-[#202020]/60">
              Destination
            </dt>
            <dd className="mt-1 font-medium text-[#090909]">
              {submittedEnquiry.destination}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-[#202020]/60">
              Date &amp; Time
            </dt>
            <dd className="mt-1 font-medium text-[#090909] tabular-nums">
              {submittedEnquiry.travelDate} · {submittedEnquiry.pickupTime}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-[#202020]/60">
              Journey &amp; Service
            </dt>
            <dd className="mt-1 font-medium text-[#090909]">
              {submittedEnquiry.tripType === 'return' ? 'Return' : 'One-Way'} ·{' '}
              {formatServiceLabel(submittedEnquiry.serviceType)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-[#202020]/60">
              {submittedEnquiry.luggage ? 'Guests & Luggage' : 'Guests'}
            </dt>
            <dd className="mt-1 font-medium text-[#090909] tabular-nums">
              {submittedEnquiry.passengers}{' '}
              {submittedEnquiry.passengers === 1 ? 'Passenger' : 'Passengers'}
              {submittedEnquiry.luggage ? ` · ${submittedEnquiry.luggage}` : ''}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-[#202020]/60">
              Guest Contact
            </dt>
            <dd className="mt-1 font-medium text-[#090909]">
              {submittedEnquiry.fullName} · {submittedEnquiry.phone}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.14em] uppercase transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Send via WhatsApp</span>
          </a>
          <a
            href={mailtoUrl}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#090909] hover:bg-[#202020] text-[#FAF9F6] text-xs font-semibold tracking-[0.14em] uppercase transition-colors"
          >
            <Mail className="w-4 h-4 text-[#C6A66B]" aria-hidden="true" />
            <span>Send via Email</span>
          </a>
        </div>
      </div>
    );
  }

  const inputBase =
    'w-full bg-white border border-[#D8D0C2] px-3.5 py-2.5 text-sm text-[#090909] placeholder:text-[#202020]/45 focus:outline-none focus:border-[#C6A66B] transition-colors min-h-[44px]';
  const labelBase =
    'block text-xs font-semibold tracking-[0.1em] uppercase text-[#202020]/80 mb-1.5';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[#FAF9F6] border border-[#D8D0C2] p-5 sm:p-8 lg:p-10 text-[#090909]"
    >
      <datalist id="cape-town-locations">
        {QUICK_LOCATIONS.map((loc) => (
          <option key={loc} value={loc} />
        ))}
      </datalist>

      {/* Top Row: Heading & Trip Type Segmented Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 sm:pb-6 border-b border-[#D8D0C2]">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#755A2B]">
            {variant === 'shortcut' ? 'Direct Transfer Enquiry' : 'Private Transfer Request'}
          </p>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium text-[#090909]">
            {variant === 'shortcut'
              ? 'Request Your Cape Town Transfer'
              : 'Tell Us About Your Journey'}
          </h2>
        </div>

        <div
          role="group"
          aria-label="Trip type"
          className="grid grid-cols-2 sm:inline-flex border border-[#D8D0C2] bg-[#F4F0E8] p-1 w-full sm:w-auto self-start md:self-auto"
        >
          {(['one-way', 'return'] as TripType[]).map((type) => {
            const active = form.tripType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => updateField('tripType', type)}
                className={`px-4 py-2.5 sm:py-2 text-xs font-semibold tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap min-h-[40px] ${
                  active
                    ? `${variant === 'shortcut' && type === 'one-way' ? 'bg-[#C6A66B]' : 'bg-[#090909]'} text-[#FAF9F6]`
                    : `${variant === 'shortcut' && type === 'one-way' ? 'bg-[#C6A66B] ' : ''}text-[#202020]/75 hover:text-[#090909]`
                }`}
              >
                {type === 'one-way' ? 'One-Way' : 'Return'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Full Variant: Service Type Selector */}
      {variant === 'full' && (
        <div className="mt-6">
          <span className={labelBase}>Service Type</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {SERVICES.map((svc) => {
              const active = form.serviceType === svc.id;
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => updateField('serviceType', svc.id)}
                  className={`text-left px-3.5 py-3 border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#090909] border-[#090909] text-[#FAF9F6]'
                      : 'bg-white border-[#D8D0C2] text-[#090909] hover:border-[#C6A66B]'
                  }`}
                >
                  <span
                    className={`block text-[11px] tracking-[0.14em] uppercase ${
                      active ? 'text-[#C6A66B]' : 'text-[#755A2B]'
                    }`}
                  >
                    {svc.index}
                  </span>
                  <span className="mt-0.5 block text-sm font-medium">
                    {svc.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Journey Locations & Schedule */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor={`${variant}-pickup`} className={labelBase}>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#755A2B]" aria-hidden="true" />
              Pickup Location
            </span>
          </label>
          <input
            id={`${variant}-pickup`}
            type="text"
            list="cape-town-locations"
            value={form.pickupLocation}
            onChange={(e) => updateField('pickupLocation', e.target.value)}
            placeholder="e.g. Lagoon Beach Hotel & Spa"
            className={`${inputBase} ${errors.pickupLocation ? 'border-red-700' : ''}`}
            aria-invalid={Boolean(errors.pickupLocation)}
          />
          {errors.pickupLocation && (
            <p className="mt-1 text-xs text-red-700">{errors.pickupLocation}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${variant}-destination`} className={labelBase}>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#755A2B]" aria-hidden="true" />
              Destination
            </span>
          </label>
          <input
            id={`${variant}-destination`}
            type="text"
            list="cape-town-locations"
            value={form.destination}
            onChange={(e) => updateField('destination', e.target.value)}
            placeholder="e.g. Cape Town Airport / Camps Bay"
            className={`${inputBase} ${errors.destination ? 'border-red-700' : ''}`}
            aria-invalid={Boolean(errors.destination)}
          />
          {errors.destination && (
            <p className="mt-1 text-xs text-red-700">{errors.destination}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${variant}-date`} className={labelBase}>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#755A2B]" aria-hidden="true" />
              Travel Date
            </span>
          </label>
          <input
            id={`${variant}-date`}
            type="date"
            value={form.travelDate}
            min={getTodayIso()}
            onChange={(e) => updateField('travelDate', e.target.value)}
            className={`${inputBase} tabular-nums ${errors.travelDate ? 'border-red-700' : ''}`}
            aria-invalid={Boolean(errors.travelDate)}
          />
          {errors.travelDate && (
            <p className="mt-1 text-xs text-red-700">{errors.travelDate}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${variant}-time`} className={labelBase}>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#755A2B]" aria-hidden="true" />
              Pickup Time
            </span>
          </label>
          <input
            id={`${variant}-time`}
            type="time"
            value={form.pickupTime}
            onChange={(e) => updateField('pickupTime', e.target.value)}
            className={`${inputBase} tabular-nums ${errors.pickupTime ? 'border-red-700' : ''}`}
            aria-invalid={Boolean(errors.pickupTime)}
          />
          {errors.pickupTime && (
            <p className="mt-1 text-xs text-red-700">{errors.pickupTime}</p>
          )}
        </div>
      </div>

      {/* Return Journey Fields when Return selected */}
      {form.tripType === 'return' && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F4F0E8] border border-[#D8D0C2] p-4">
          <div>
            <label htmlFor={`${variant}-return-date`} className={labelBase}>
              Return Date {variant === 'shortcut' ? '(Optional)' : ''}
            </label>
            <input
              id={`${variant}-return-date`}
              type="date"
              value={form.returnDate}
              min={form.travelDate || getTodayIso()}
              onChange={(e) => updateField('returnDate', e.target.value)}
              className={`${inputBase} tabular-nums ${errors.returnDate ? 'border-red-700' : ''}`}
              aria-invalid={Boolean(errors.returnDate)}
            />
            {errors.returnDate && (
              <p className="mt-1 text-xs text-red-700">{errors.returnDate}</p>
            )}
          </div>
          <div>
            <label htmlFor={`${variant}-return-time`} className={labelBase}>
              Return Pickup Time {variant === 'shortcut' ? '(Optional)' : ''}
            </label>
            <input
              id={`${variant}-return-time`}
              type="time"
              value={form.returnTime}
              onChange={(e) => updateField('returnTime', e.target.value)}
              className={`${inputBase} tabular-nums ${errors.returnTime ? 'border-red-700' : ''}`}
              aria-invalid={Boolean(errors.returnTime)}
            />
            {errors.returnTime && (
              <p className="mt-1 text-xs text-red-700">{errors.returnTime}</p>
            )}
          </div>
        </div>
      )}

      {/* Passengers, Optional Luggage (Full Form) & Contact Details */}
      <div
        className={`mt-4 grid grid-cols-1 sm:grid-cols-2 ${
          variant === 'full' ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
        } gap-4`}
      >
        <div>
          <label htmlFor={`${variant}-passengers`} className={labelBase}>
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#755A2B]" aria-hidden="true" />
              Passengers
            </span>
          </label>
          <select
            id={`${variant}-passengers`}
            value={form.passengers}
            onChange={(e) => updateField('passengers', Number(e.target.value))}
            className={`${inputBase} tabular-nums`}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'Passenger' : 'Passengers'}
              </option>
            ))}
          </select>
        </div>

        {variant === 'full' && (
          <div>
            <label htmlFor={`${variant}-luggage`} className={labelBase}>
              <span className="inline-flex items-center gap-1.5">
                <Luggage className="w-3.5 h-3.5 text-[#755A2B]" aria-hidden="true" />
                Luggage
              </span>
            </label>
            <select
              id={`${variant}-luggage`}
              value={form.luggage}
              onChange={(e) => updateField('luggage', e.target.value)}
              className={inputBase}
            >
              {LUGGAGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor={`${variant}-name`} className={labelBase}>
            Full Name
          </label>
          <input
            id={`${variant}-name`}
            type="text"
            value={form.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="Your full name"
            className={`${inputBase} ${errors.fullName ? 'border-red-700' : ''}`}
            aria-invalid={Boolean(errors.fullName)}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-700">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${variant}-email`} className={labelBase}>
            Email Address
          </label>
          <input
            id={`${variant}-email`}
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="guest@example.com"
            className={`${inputBase} ${errors.email ? 'border-red-700' : ''}`}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-700">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${variant}-phone`} className={labelBase}>
            Contact Number
          </label>
          <input
            id={`${variant}-phone`}
            type="tel"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+27 78 000 0000"
            className={`${inputBase} tabular-nums ${errors.phone ? 'border-red-700' : ''}`}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-700">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Additional Fields on Full Booking Page */}
      {variant === 'full' && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="full-flight" className={labelBase}>
              Flight Number (Optional)
            </label>
            <input
              id="full-flight"
              type="text"
              value={form.flightNumber}
              onChange={(e) => updateField('flightNumber', e.target.value)}
              placeholder="e.g. BA 059 / SA 323"
              className={inputBase}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="full-notes" className={labelBase}>
              Additional Information (Optional)
            </label>
            <input
              id="full-notes"
              type="text"
              value={form.additionalInfo}
              onChange={(e) => updateField('additionalInfo', e.target.value)}
              placeholder="Child seat requests, hotel room name, golf bags, or bespoke stops"
              className={inputBase}
            />
          </div>
        </div>
      )}

      {/* Submit Bar */}
      <div className="mt-6 pt-5 sm:pt-6 border-t border-[#D8D0C2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-[#202020]/70 leading-relaxed">
          Enquiry-based request — no upfront card payment required. Our team responds
          directly via WhatsApp or email to confirm your schedule.
        </p>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
          {variant === 'shortcut' && onOpenFullBooking && (
            <button
              type="button"
              onClick={() => onOpenFullBooking(form)}
              className="px-4 py-3 text-xs font-semibold tracking-[0.12em] uppercase text-[#202020] hover:text-[#755A2B] transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
            >
              Add Flight / Tour Notes →
            </button>
          )}
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer whitespace-nowrap min-h-[48px] sm:min-h-[44px]"
          >
            <span className={variant === 'shortcut' ? 'text-[#FFFFFF]' : undefined}>
              Request My Transfer
            </span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  );
}

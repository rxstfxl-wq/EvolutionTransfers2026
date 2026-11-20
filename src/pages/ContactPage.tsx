import { FormEvent, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
} from 'lucide-react';
import { BUSINESS_CONTACT } from '../data/catalog';
import {
  buildMailtoContactUrl,
  buildWhatsAppContactUrl,
  validateContactEnquiry,
  ValidationErrors,
} from '../services/enquiryService';
import { ContactEnquiry } from '../types';

export function ContactPage() {
  const [form, setForm] = useState<ContactEnquiry>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<ValidationErrors<ContactEnquiry>>({});
  const [submitted, setSubmitted] = useState<ContactEnquiry | null>(null);

  const updateField = <K extends keyof ContactEnquiry>(
    key: K,
    value: ContactEnquiry[K]
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
    const validationErrors = validateContactEnquiry(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted({ ...form });
  };

  const inputBase =
    'w-full bg-white border border-[#D8D0C2] px-3.5 py-2.5 text-sm text-[#090909] placeholder:text-[#202020]/45 focus:outline-none focus:border-[#C6A66B] transition-colors min-h-[44px]';
  const labelBase =
    'block text-xs font-semibold tracking-[0.1em] uppercase text-[#202020]/80 mb-1.5';

  return (
    <div className="bg-[#FAF9F6] text-[#090909]">
      {/* Header */}
      <section className="bg-[#090909] text-[#FAF9F6] py-12 sm:py-14 lg:py-20 border-b border-[#C6A66B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C6A66B]">
            Direct Contact
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#FAF9F6]">
            Contact Evolution Transfers
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#D8D0C2]/85 max-w-xl leading-relaxed">
            Reach our Cape Town concierge desk directly by telephone, WhatsApp, or
            email for private transfers, hotel partnerships, and custom itineraries.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-10 sm:py-14 lg:py-20 bg-[#F4F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Direct Business Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#090909] text-[#FAF9F6] p-5 sm:p-8 border border-[#C6A66B]/25 space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C6A66B]">
                  Telephone
                </p>
                <a
                  href={BUSINESS_CONTACT.phoneHref}
                  className="mt-1.5 inline-flex items-center gap-2.5 font-serif text-2xl text-[#FAF9F6] hover:text-[#C6A66B] transition-colors tabular-nums"
                >
                  <Phone className="w-5 h-5 text-[#C6A66B] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_CONTACT.phoneDisplay}</span>
                </a>
              </div>

              <div className="pt-5 border-t border-[#202020]">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C6A66B]">
                  Email Address
                </p>
                <a
                  href={BUSINESS_CONTACT.emailHref}
                  className="mt-1.5 inline-flex items-center gap-2.5 text-base text-[#FAF9F6] hover:text-[#C6A66B] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#C6A66B] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_CONTACT.email}</span>
                </a>
              </div>

              <div className="pt-5 border-t border-[#202020]">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C6A66B]">
                  WhatsApp Concierge
                </p>
                <p className="mt-1.5 text-sm text-[#D8D0C2]/80">
                  Instant messaging for hotel guests, flight updates, and quick quotes.
                </p>
                <a
                  href={BUSINESS_CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.14em] uppercase transition-colors min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="bg-[#FAF9F6] border border-[#D8D0C2] p-5 sm:p-7 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#755A2B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h2 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#090909]">
                    Service Area
                  </h2>
                  <p className="mt-1 text-sm text-[#202020]/80">
                    {BUSINESS_CONTACT.serviceArea}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D8D0C2] flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#755A2B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h2 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#090909]">
                    Operating &amp; Dispatch Hours
                  </h2>
                  <p className="mt-1 text-sm text-[#202020]/80">
                    {BUSINESS_CONTACT.operatingHours}
                  </p>
                  <p className="mt-1.5 text-xs text-[#202020]/65">
                    {BUSINESS_CONTACT.emergencyNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Enquiry Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-[#FAF9F6] border border-[#D8D0C2] p-5 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#D8D0C2]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-[#C6A66B] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#755A2B]">
                        Message Prepared
                      </p>
                      <h2 className="mt-1 font-serif text-3xl font-medium text-[#090909]">
                        Send Your Enquiry Directly
                      </h2>
                      <p className="mt-2 text-sm text-[#202020]/80 leading-relaxed">
                        Choose WhatsApp or Email below to transmit your message
                        directly to Evolution Transfers.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitted(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.12em] uppercase text-[#202020] hover:text-[#755A2B] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3.5">
                  <a
                    href={buildWhatsAppContactUrl(submitted)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.14em] uppercase transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <a
                    href={buildMailtoContactUrl(submitted)}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#090909] hover:bg-[#202020] text-[#FAF9F6] text-xs font-semibold tracking-[0.14em] uppercase transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#C6A66B]" aria-hidden="true" />
                    <span>Send via Email</span>
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-[#FAF9F6] border border-[#D8D0C2] p-5 sm:p-8 lg:p-10 space-y-5"
              >
                <div className="pb-4 border-b border-[#D8D0C2]">
                  <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#755A2B]">
                    Send a Message
                  </p>
                  <h2 className="mt-1 font-serif text-3xl font-normal text-[#090909]">
                    General &amp; Corporate Enquiries
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className={labelBase}>
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="Your name"
                      className={`${inputBase} ${errors.fullName ? 'border-red-700' : ''}`}
                      aria-invalid={Boolean(errors.fullName)}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-700">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className={labelBase}>
                      Contact Number
                    </label>
                    <input
                      id="contact-phone"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className={labelBase}>
                      Email Address
                    </label>
                    <input
                      id="contact-email"
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
                    <label htmlFor="contact-subject" className={labelBase}>
                      Subject (Optional)
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => updateField('subject', e.target.value)}
                      placeholder="Corporate account / Private tour"
                      className={inputBase}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelBase}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Tell us about your transfer schedule, group requirements, or enquiry..."
                    className={`${inputBase} min-h-[130px] resize-y ${errors.message ? 'border-red-700' : ''}`}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-700">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#C6A66B] hover:bg-[#D4B77E] text-[#090909] text-xs font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer min-h-[48px] sm:min-h-[44px]"
                >
                  Prepare Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

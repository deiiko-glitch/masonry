import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { BUSINESS_INFO, PRIMARY_SERVICE_CITIES } from '../data/content';
import { Language, QuoteFormData } from '../types';
import { validateQuoteForm } from '../utils/estimator';
import { Reveal } from '../components/AnimatedReveal';
import { submitToWeb3Forms } from '../utils/formSubmit';
import { trackTelClick } from '../utils/analytics';
import { BUSINESS_PHONE } from '../config/constants';
import { Seo } from '../components/Seo';

interface ContactViewProps {
  lang: Language;
  onSubmitSuccess: (data: QuoteFormData, photosCount: number) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  lang,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<QuoteFormData>>({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    service: 'Paver patio',
    timeline: 'Within 2-4 weeks',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateQuoteForm({
      ...formData,
      city: formData.city || 'Aurora',
      service: formData.service || 'Paver patio',
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    const result = await submitToWeb3Forms(
      {
        name: formData.fullName || '',
        phone: formData.phone || '',
        email: formData.email || '',
        city: formData.city || 'Aurora',
        service: formData.service || 'Paver patio',
        timeline: formData.timeline || 'Within 2-4 weeks',
        message: formData.message || '',
        source: 'Contact Page Form',
      },
      'Contact Page Quote Request'
    );

    setIsSubmitting(false);

    if (result.success) {
      onSubmitSuccess(
        {
          fullName: formData.fullName || '',
          phone: formData.phone || '',
          email: formData.email || '',
          city: formData.city || 'Aurora',
          service: formData.service || 'Paver patio',
          timeline: formData.timeline || 'Within 2-4 weeks',
          message: formData.message || '',
        },
        0
      );
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        city: '',
        service: 'Paver patio',
        timeline: 'Within 2-4 weeks',
        message: '',
      });
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 py-16 sm:py-24">
      <Seo
        title={lang === 'en' ? 'Contact & Free Estimate | Masonry Doctors | Aurora, IL' : 'Contacto y Cotización Gratis | Masonry Doctors'}
        description={lang === 'en' ? 'Get in touch with Rolando at Masonry Doctors for a free on-site estimate on paver patios, retaining walls & masonry repair in Aurora & Fox Valley. Call (630) 809-6835.' : 'Contáctenos para un presupuesto por escrito sin compromiso en Aurora y Fox Valley. Llame al (630) 809-6835.'}
        canonicalPath="/contact"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal direction="up">
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
              {lang === 'en' ? 'CONTACT & ESTIMATES' : 'CONTACTO Y PRESUPUESTOS'}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal leading-tight">
              {lang === 'en' ? 'Get in touch with Rolando.' : 'Póngase en contacto con Rolando.'}
            </h1>
            <p className="mt-3 text-stone-600 text-base leading-relaxed">
              Schedule an on-site consultation across Aurora, Naperville, Oswego, and the Fox Valley area. We respond within 24 hours.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="right">
              <div className="bg-white p-8 rounded-[1px] border border-stone-200 shadow-2xs space-y-6">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.16em] text-stone-500 uppercase block mb-1">
                    CALL OR TEXT
                  </span>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  onClick={() => trackTelClick(BUSINESS_INFO.phone)}
                  className="font-serif text-2xl sm:text-3xl text-stone-900 hover:text-[#8B291B] transition block"
                >
                  {BUSINESS_INFO.phone}
                </a>
                <p className="text-xs text-stone-500 mt-1">Direct job-site line</p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <span className="text-[10px] font-bold tracking-[0.16em] text-stone-500 uppercase block mb-1">
                  EMAIL
                </span>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-sm font-semibold text-stone-900 hover:text-[#8B291B] transition"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <span className="text-[10px] font-bold tracking-[0.16em] text-stone-500 uppercase block mb-1">
                  HOURS
                </span>
                <p className="text-xs text-stone-800 font-medium">Monday – Friday: 6:00am – 5:00pm</p>
                <p className="text-xs text-stone-800 font-medium">Saturday: 7:00am – 2:00pm</p>
                <p className="text-xs text-stone-500">Sunday: Closed</p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <span className="text-[10px] font-bold tracking-[0.16em] text-stone-500 uppercase block mb-1">
                  BASE LOCATION
                </span>
                <p className="text-xs text-stone-800 font-medium">Aurora, IL 60505</p>
                <p className="text-xs text-stone-500">Serving Kane, DuPage, Kendall & Will Counties</p>
              </div>
            </div>
            </Reveal>
          </div>

          {/* Right: Clean White Form */}
          <div className="lg:col-span-7">
            <Reveal direction="left">
              <div className="bg-white p-8 rounded-[1px] border border-stone-200 shadow-2xs">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#8B291B] uppercase block mb-1">
                  FREE ESTIMATE
                </span>
              <h3 className="font-serif text-2xl text-stone-900 font-normal mb-1">
                Tell us about your project
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Reply within 24 hours · No obligation
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Error message with direct phone fallback */}
                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-xs leading-relaxed">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="First and last"
                      className={`w-full bg-white text-stone-900 text-xs px-3.5 py-2.5 rounded-[1px] border ${
                        formErrors.fullName ? 'border-red-500' : 'border-stone-300'
                      } focus:outline-none focus:border-[#8B291B] transition`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(630) 000-0000"
                      className={`w-full bg-white text-stone-900 text-xs px-3.5 py-2.5 rounded-[1px] border ${
                        formErrors.phone ? 'border-red-500' : 'border-stone-300'
                      } focus:outline-none focus:border-[#8B291B] transition`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@email.com"
                      className="w-full bg-white text-stone-900 text-xs px-3.5 py-2.5 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Aurora, Naperville…"
                      className="w-full bg-white text-stone-900 text-xs px-3.5 py-2.5 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                    What can we build for you?
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white text-stone-900 text-xs px-3.5 py-2.5 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition cursor-pointer"
                  >
                    <option value="Paver patio">Paver patio</option>
                    <option value="Walkway or driveway">Walkway or driveway</option>
                    <option value="Retaining wall">Retaining wall</option>
                    <option value="Brick or masonry repair">Brick or masonry repair</option>
                    <option value="Stone facing">Stone facing</option>
                    <option value="Outdoor living space (kitchen, fire feature, pergola)">
                      Outdoor living space (kitchen, fire feature, pergola)
                    </option>
                    <option value="Concrete work">Concrete work</option>
                    <option value="Inground fiberglass pool">Inground fiberglass pool</option>
                    <option value="Something else">Something else</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                    Project details
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Rough size, materials you like, timeline…"
                    className="w-full bg-white text-stone-900 text-xs px-3.5 py-2 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition"
                  ></textarea>
                </div>

                {/* Replaced photo uploader with text instruction */}
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-[1px] text-center">
                  <p className="text-xs text-stone-700 font-medium">
                    Text us photos of your project at{' '}
                    <a
                      href={`tel:${BUSINESS_PHONE}`}
                      onClick={() => trackTelClick(BUSINESS_PHONE)}
                      className="font-bold text-[#8B291B] hover:underline"
                    >
                      {BUSINESS_PHONE}
                    </a>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#8B291B] hover:bg-[#732216] active:scale-[0.99] disabled:opacity-70 text-white font-bold text-xs tracking-[0.16em] uppercase py-3.5 px-4 rounded-[1px] transition cursor-pointer shadow-sm"
                >
                  {isSubmitting ? (lang === 'en' ? 'SENDING...' : 'ENVIANDO...') : 'GET MY FREE QUOTE'}
                </button>
              </form>
            </div>
            </Reveal>
          </div>

        </div>

      </div>
    </div>
  );
};

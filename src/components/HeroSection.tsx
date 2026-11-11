import React, { useState } from 'react';
import { Phone, Check, Play, Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO, PRIMARY_SERVICE_CITIES } from '../data/content';
import { Language, QuoteFormData } from '../types';
import { validateQuoteForm } from '../utils/estimator';
import { Reveal } from './AnimatedReveal';
import { submitToWeb3Forms } from '../utils/formSubmit';
import { trackTelClick } from '../utils/analytics';
import { BUSINESS_PHONE } from '../config/constants';

interface HeroSectionProps {
  lang: Language;
  onOpenQuoteModal: (service?: string) => void;
  onSubmitSuccess: (data: QuoteFormData, photosCount: number) => void;
  onOpenVideoModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenQuoteModal,
  onSubmitSuccess,
  onOpenVideoModal,
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

  const t = {
    locationKicker: 'AURORA, IL · FOX VALLEY',
    h1: lang === 'en'
      ? 'Paver Patios, Walkways & Retaining Walls in Aurora, IL & the Fox Valley'
      : 'Patios de Adoquín, Caminos y Muros de Contención en Aurora, IL y Fox Valley',
    subheadline: lang === 'en'
      ? 'Owner-operated masonry experts building outdoor spaces that last. 18 years of experience with free written estimates.'
      : 'Expertos en mampostería operados por sus fundadores con 18 años de experiencia y presupuestos por escrito sin compromiso.',
    getFreeQuote: lang === 'en' ? 'GET A FREE QUOTE' : 'COTIZAR GRATIS',
    callNow: lang === 'en' ? 'CALL (630) 809-6835' : 'LLAMAR (630) 809-6835',
    cardKicker: lang === 'en' ? 'FREE QUOTE' : 'COTIZACIÓN GRATIS',
    cardTitle: lang === 'en' ? 'Tell us about your project' : 'Cuéntenos sobre su proyecto',
    cardSubtitle: lang === 'en' ? 'Reply within 24 hours · No obligation' : 'Respuesta en 24 horas · Sin compromiso',
    nameLabel: lang === 'en' ? 'NAME *' : 'NOMBRE *',
    namePlaceholder: lang === 'en' ? 'First and last' : 'Nombre y apellido',
    phoneLabel: lang === 'en' ? 'PHONE *' : 'TELÉFONO *',
    phonePlaceholder: lang === 'en' ? '(630) 000-0000' : '(630) 000-0000',
    emailLabel: lang === 'en' ? 'EMAIL' : 'CORREO',
    emailPlaceholder: lang === 'en' ? 'you@email.com' : 'correo@ejemplo.com',
    cityLabel: lang === 'en' ? 'CITY' : 'CIUDAD',
    cityPlaceholder: lang === 'en' ? 'Aurora, Naperville…' : 'Aurora, Naperville…',
    serviceLabel: lang === 'en' ? 'WHAT CAN WE BUILD FOR YOU?' : '¿QUÉ PODEMOS CONSTRUIR PARA USTED?',
    detailsLabel: lang === 'en' ? 'PROJECT DETAILS' : 'DETALLES DEL PROYECTO',
    detailsPlaceholder: lang === 'en' ? 'Rough size, materials you like, timeline…' : 'Tamaño aproximado, materiales preferidos, fechas…',
    submitButton: lang === 'en' ? 'GET MY FREE QUOTE' : 'OBTENER MI COTIZACIÓN GRATIS',
    disclaimer: lang === 'en'
      ? 'We never share your details. Information is used only for your estimate.'
      : 'Nunca compartimos sus datos. La información solo se utiliza para su presupuesto.',
  };

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
        source: 'HeroSection Quote Form',
      },
      'Hero Quote Request'
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
    <>
      <section className="relative bg-[#14171A] text-white overflow-hidden pt-8 pb-12 lg:pt-10 lg:pb-16 border-b border-stone-800/80">
        {/* Full-bleed dusk background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/projects/firepit.jpg"
            alt="Custom stone fire pit and paver patio crafted by Masonry Doctors in Aurora, Illinois"
            className="w-full h-full object-cover object-center opacity-40 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121517] via-[#121517]/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121517] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Red line kicker */}
              <Reveal delay={0.08}>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-[2px] bg-[#8B291B]"></div>
                  <span className="text-[11px] font-bold tracking-[0.24em] text-[#C74835] uppercase">
                    {t.locationKicker}
                  </span>
                </div>
              </Reveal>

              {/* Editorial Serif H1 */}
              <Reveal delay={0.16}>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.08]">
                  {t.h1}
                </h1>
              </Reveal>

              {/* Subheadline */}
              <Reveal delay={0.24}>
                <p className="text-stone-300 text-base sm:text-lg font-normal leading-relaxed max-w-xl">
                  {t.subheadline}
                </p>
              </Reveal>

              {/* Dual Action Buttons */}
              <Reveal delay={0.32}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <button
                    onClick={() => onOpenQuoteModal()}
                    className="bg-[#8B291B] hover:bg-[#732216] active:scale-[0.99] text-white text-xs font-bold tracking-[0.16em] uppercase px-8 py-4 rounded-[1px] transition-all transform hover:-translate-y-0.5 cursor-pointer text-center shadow-md hover:shadow-lg hover:shadow-[#8B291B]/20"
                  >
                    {t.getFreeQuote}
                  </button>

                  <a
                    href={BUSINESS_INFO.phoneHref}
                    onClick={() => trackTelClick(BUSINESS_INFO.phone)}
                    className="border border-stone-500/80 hover:border-white text-stone-200 hover:text-white text-xs font-bold tracking-[0.16em] uppercase px-7 py-4 rounded-[1px] transition-all transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                    aria-label={`Call ${BUSINESS_INFO.phone}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B93826]" />
                    <span>{t.callNow}</span>
                  </a>
                </div>
              </Reveal>

              {/* Verified Links & Experience Video Trigger (no unverified numeric counts) */}
              <Reveal delay={0.4}>
                <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-stone-300">
                  <div className="flex items-center gap-3">
                    <a
                      href={BUSINESS_INFO.socials.google}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white underline decoration-stone-500 underline-offset-4 transition"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>Google Reviews</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                    <span className="text-stone-600">·</span>
                    <a
                      href={BUSINESS_INFO.socials.angi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white underline decoration-stone-500 underline-offset-4 transition"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Angi Verified</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                  </div>

                  {onOpenVideoModal && (
                    <button
                      onClick={onOpenVideoModal}
                      className="inline-flex items-center gap-2 bg-[#1A1E22]/90 hover:bg-[#252B30] text-stone-200 border border-stone-700/80 hover:border-stone-500 px-3 py-1.5 rounded-sm transition-all transform hover:-translate-y-0.5 cursor-pointer group shadow-sm"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#8B291B] group-hover:bg-[#A33624] flex items-center justify-center shrink-0">
                        <Play className="w-2.5 h-2.5 ml-0.5 fill-white text-white" />
                      </span>
                      <span className="text-[11px] font-semibold text-stone-200 group-hover:text-white">
                        {lang === 'en' ? 'Watch Video (18 Years of Experience)' : 'Ver Video (18 Años de Experiencia)'}
                      </span>
                    </button>
                  )}
                </div>
              </Reveal>

            </div>

            {/* Right White Floating Quote Card */}
            <div className="lg:col-span-5">
              <Reveal direction="left" delay={0.25}>
                <div className="bg-white text-stone-900 rounded-[1px] p-6 sm:p-8 shadow-2xl border border-stone-100 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                
                <div className="mb-5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#8B291B] uppercase block">
                    {t.cardKicker}
                  </span>
                  <h3 className="font-serif text-2xl text-stone-900 font-normal mt-1 leading-tight">
                    {t.cardTitle}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {t.cardSubtitle}
                  </p>
                </div>

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

                  {/* Submission error with phone fallback */}
                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-xs leading-relaxed">
                      {submitError}
                    </div>
                  )}

                  {/* Name and Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t.namePlaceholder}
                        className={`w-full bg-white text-stone-900 text-xs px-3 py-2.5 rounded-[1px] border ${
                          formErrors.fullName ? 'border-red-500' : 'border-stone-300'
                        } focus:outline-none focus:border-[#8B291B] transition`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                        {t.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.phonePlaceholder}
                        className={`w-full bg-white text-stone-900 text-xs px-3 py-2.5 rounded-[1px] border ${
                          formErrors.phone ? 'border-red-500' : 'border-stone-300'
                        } focus:outline-none focus:border-[#8B291B] transition`}
                      />
                    </div>
                  </div>

                  {/* Email and City Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                        {t.emailLabel}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.emailPlaceholder}
                        className="w-full bg-white text-stone-900 text-xs px-3 py-2.5 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                        {t.cityLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder={t.cityPlaceholder}
                        className="w-full bg-white text-stone-900 text-xs px-3 py-2.5 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition"
                      />
                    </div>
                  </div>

                  {/* What can we build for you? */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                      {t.serviceLabel}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-white text-stone-900 text-xs px-3 py-2.5 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition cursor-pointer"
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

                  {/* Project Details */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                      {t.detailsLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.detailsPlaceholder}
                      className="w-full bg-white text-stone-900 text-xs px-3 py-2 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition"
                    ></textarea>
                  </div>

                  {/* Replaced Photo Uploader with Text instruction */}
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#8B291B] hover:bg-[#732216] active:scale-[0.99] disabled:opacity-70 text-white font-bold text-xs tracking-[0.16em] uppercase py-3.5 px-4 rounded-[1px] transition cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? (lang === 'en' ? 'SENDING...' : 'ENVIANDO...') : t.submitButton}
                  </button>

                  <p className="text-[10px] text-stone-500 leading-normal text-center">
                    {t.disclaimer}
                  </p>

                </form>
              </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Strip under Hero */}
      <Reveal delay={0.1}>
        <div className="bg-[#EBE6DC] text-stone-900 border-b border-stone-300/80">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-300/80 text-left py-6 px-4 sm:px-6 lg:px-8">
          
          <div className="p-3 sm:p-4">
            <p className="font-semibold text-sm text-stone-900">Google Verified</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase mt-0.5">LOCAL CONTRACTOR</p>
          </div>

          <div className="p-3 sm:p-4">
            <p className="font-semibold text-sm text-stone-900">Licensed & Insured</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase mt-0.5">ILLINOIS</p>
          </div>

          <div className="p-3 sm:p-4">
            <p className="font-semibold text-sm text-stone-900">Craftsmanship Guarantee</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase mt-0.5">WORKMANSHIP</p>
          </div>

          <div className="p-3 sm:p-4">
            <p className="font-semibold text-sm text-stone-900">Free Estimates</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase mt-0.5">NO OBLIGATION</p>
          </div>
        </div>
        </div>
      </Reveal>
    </>
  );
};

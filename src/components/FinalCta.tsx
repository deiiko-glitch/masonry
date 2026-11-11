import React, { useState } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language, QuoteFormData } from '../types';
import { validateQuoteForm } from '../utils/estimator';
import { Reveal } from './AnimatedReveal';
import { submitToWeb3Forms } from '../utils/formSubmit';
import { trackTelClick } from '../utils/analytics';
import { BUSINESS_PHONE } from '../config/constants';

interface FinalCtaProps {
  lang: Language;
  onSubmitSuccess: (data: QuoteFormData, photosCount: number) => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({
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
        source: 'Final CTA Bottom Section',
      },
      'Final CTA Quote Request'
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
    <section id="contact-final-section" className="relative bg-[#121517] text-white py-12 sm:py-16 overflow-hidden border-b border-stone-800">
      {/* Background hardscape dusk photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/projects/patio-pergola.jpg"
          alt="Paver patio and stone seat wall crafted in Fox Valley"
          className="w-full h-full object-cover opacity-30 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121517] via-[#121517]/90 to-[#121517]/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal direction="right">
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#C74835] uppercase">
                {lang === 'en' ? 'Free consultation · Written estimate' : 'Consulta gratis · Presupuesto por escrito'}
              </p>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08] tracking-tight mt-2">
                {lang === 'en' ? 'Ready to Transform Your Backyard?' : '¿Listo para Transformar su Patio?'}
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mt-4">
                {lang === 'en'
                  ? "Tell us what you have in mind and we'll come out, walk the space, and give you a written estimate — no pressure, no obligation."
                  : 'Cuéntenos su idea y visitaremos su hogar para revisar el espacio y entregarle un presupuesto por escrito sin compromiso.'}
              </p>

              <div className="pt-6 border-t border-stone-800/80 space-y-4 mt-6">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  onClick={() => trackTelClick(BUSINESS_INFO.phone)}
                  className="flex items-center gap-3 text-2xl sm:text-3xl font-serif text-white hover:text-[#C74835] transition"
                >
                  <Phone className="w-6 h-6 text-[#8B291B] shrink-0" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>

                <p className="text-xs text-stone-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:underline">
                    {BUSINESS_INFO.email}
                  </a>
                </p>

                <p className="text-xs text-stone-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>Monday – Friday 6:00am – 5:00pm · Saturday 7:00am – 2:00pm · Sunday Closed</span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: White Card */}
          <div className="lg:col-span-6">
            <Reveal direction="left">
              <div className="bg-white text-stone-900 rounded-[1px] p-6 sm:p-8 shadow-2xl">
              
              <div className="mb-5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#8B291B] uppercase block">
                  FREE QUOTE
                </span>
                <h3 className="font-serif text-2xl text-stone-900 font-normal mt-1 leading-tight">
                  Tell us about your project
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Reply within 24 hours · No obligation
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

                {/* Error message with direct phone fallback */}
                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-xs leading-relaxed">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                      className={`w-full bg-white text-stone-900 text-xs px-3 py-2.5 rounded-[1px] border ${
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
                      className={`w-full bg-white text-stone-900 text-xs px-3 py-2.5 rounded-[1px] border ${
                        formErrors.phone ? 'border-red-500' : 'border-stone-300'
                      } focus:outline-none focus:border-[#8B291B] transition`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@email.com"
                      className="w-full bg-white text-stone-900 text-xs px-3 py-2.5 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition"
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
                      className="w-full bg-white text-stone-900 text-xs px-3 py-2.5 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition"
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

                <div>
                  <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                    Project details
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Rough size, materials you like, timeline…"
                    className="w-full bg-white text-stone-900 text-xs px-3 py-2 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition"
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
                  {isSubmitting ? 'SENDING...' : 'GET MY FREE QUOTE'}
                </button>

                <p className="text-[10px] text-stone-500 leading-normal text-center">
                  We never share your details. Information is used only for your estimate.
                </p>
              </form>

            </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

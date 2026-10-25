import React, { useState } from 'react';
import { Phone, Calendar, Star, Camera, Upload, Check, Play } from 'lucide-react';
import { BUSINESS_INFO, PRIMARY_SERVICE_CITIES } from '../data/content';
import { Language, QuoteFormData } from '../types';
import { validateQuoteForm } from '../utils/estimator';

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
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = {
    locationKicker: lang === 'en' ? 'AURORA, IL · FOX VALLEY' : 'AURORA, IL · FOX VALLEY',
    h1: lang === 'en'
      ? 'Paver Patios, Walkways & Retaining Walls in Aurora, IL & the Fox Valley'
      : 'Patios de Adoquín, Caminos y Muros de Contención en Aurora, IL y Fox Valley',
    subheadline: lang === 'en'
      ? 'Licensed, insured masonry experts building outdoor spaces that last. Free design consultation and written estimate.'
      : 'Expertos en mampostería con licencia y asegurados. Diseños duraderos, consulta gratuita y presupuesto detallado por escrito.',
    getFreeQuote: lang === 'en' ? 'GET A FREE QUOTE' : 'COTIZAR GRATIS',
    callNow: lang === 'en' ? 'CALL (630) 809-6835' : 'LLAMAR (630) 809-6835',
    googleRatingText: lang === 'en' ? '4.9 on Google · [X] reviews' : '4.9 en Google · [X] reseñas',
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
    photoLabel: lang === 'en' ? 'PHOTO OF THE SPACE (OPTIONAL)' : 'FOTO DEL ESPACIO (OPCIONAL)',
    photoPrompt: lang === 'en' ? 'Add a photo — helps us quote faster' : 'Adjunte una foto — ayuda a cotizar más rápido',
    submitButton: lang === 'en' ? 'GET MY FREE QUOTE' : 'OBTENER MI COTIZACIÓN GRATIS',
    disclaimer: lang === 'en'
      ? 'We never share your details. Photos are stored privately and used only for your estimate.'
      : 'Nunca compartimos sus datos. Las fotos se almacenan de forma privada y solo se usan para su presupuesto.',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newUrls = files.slice(0, 4).map((file) => URL.createObjectURL(file));
      setSelectedPhotos((prev) => [...prev, ...newUrls].slice(0, 4));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
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
        selectedPhotos.length
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
      setSelectedPhotos([]);
    }, 800);
  };

  return (
    <>
      <section className="relative bg-[#14171A] text-white overflow-hidden pt-8 pb-12 lg:pt-10 lg:pb-16 border-b border-stone-800/80">
        {/* Full-bleed dusk background photo with glowing stone fire pit */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://media.base44.com/images/public/6ade12ca8fcc6eb2884e6092/54092fca4_generated_b02e6eb1.png/v1/fill/w_1440,h_1020,al_c,q_90,usm_0.66_1.00_0.01,enc_auto,quality_auto/54092fca4_generated_b02e6eb1.png"
            alt="Finished paver patio at dusk with a built-in fire pit and stone seat wall in Aurora, Illinois"
            className="w-full h-full object-cover object-center opacity-45 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121517] via-[#121517]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121517] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Red line kicker */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-[2px] bg-[#8B291B]"></div>
                <span className="text-[11px] font-bold tracking-[0.24em] text-[#C74835] uppercase">
                  {t.locationKicker}
                </span>
              </div>

              {/* Editorial Serif H1 */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.08]">
                {t.h1}
              </h1>

              {/* Subheadline */}
              <p className="text-stone-300 text-base sm:text-lg font-normal leading-relaxed max-w-xl">
                {t.subheadline}
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="bg-[#8B291B] hover:bg-[#732216] active:scale-[0.99] text-white text-xs font-bold tracking-[0.16em] uppercase px-8 py-4 rounded-[1px] transition cursor-pointer text-center shadow-md"
                >
                  {t.getFreeQuote}
                </button>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="border border-stone-500/80 hover:border-white text-stone-200 hover:text-white text-xs font-bold tracking-[0.16em] uppercase px-7 py-4 rounded-[1px] transition text-center flex items-center justify-center gap-2"
                  aria-label={`Call ${BUSINESS_INFO.phone}`}
                >
                  <Phone className="w-3.5 h-3.5 text-[#B93826]" />
                  <span>{t.callNow}</span>
                </a>
              </div>

              {/* 4.9 on Google rating strip & 18+ Years Video trigger */}
              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-medium tracking-wide">
                    {t.googleRatingText}
                  </span>
                </div>

                {onOpenVideoModal && (
                  <button
                    onClick={onOpenVideoModal}
                    className="inline-flex items-center gap-2 bg-[#1A1E22]/90 hover:bg-[#252B30] text-stone-200 border border-stone-700/80 hover:border-stone-500 px-3 py-1.5 rounded-sm transition cursor-pointer group shadow-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#8B291B] group-hover:bg-[#A33624] flex items-center justify-center shrink-0">
                      <Play className="w-2.5 h-2.5 ml-0.5 fill-white text-white" />
                    </span>
                    <span className="text-[11px] font-semibold text-stone-200 group-hover:text-white">
                      {lang === 'en' ? 'Watch Video (18+ Yrs)' : 'Ver Video (18+ Años)'}
                    </span>
                  </button>
                )}
              </div>

            </div>

            {/* Right White Floating Quote Card */}
            <div className="lg:col-span-5">
              <div className="bg-white text-stone-900 rounded-[1px] p-6 sm:p-8 shadow-2xl border border-stone-100">
                
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

                  {/* Photo of the space */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                      {t.photoLabel}
                    </label>
                    <label
                      htmlFor="hero-photo-upload"
                      className="flex items-center justify-center gap-2 border border-dashed border-stone-300 hover:border-[#8B291B] bg-stone-50 px-3 py-3 rounded-[1px] cursor-pointer transition text-xs text-stone-600 hover:text-stone-900"
                    >
                      <Camera className="w-4 h-4 text-stone-500" />
                      <span>{t.photoPrompt}</span>
                      <input
                        id="hero-photo-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {selectedPhotos.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        {selectedPhotos.map((url, idx) => (
                          <div key={idx} className="w-10 h-10 rounded-[1px] border border-stone-300 overflow-hidden">
                            <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          {selectedPhotos.length} photo(s) selected
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#8B291B] hover:bg-[#732216] active:scale-[0.99] disabled:opacity-70 text-white font-bold text-xs tracking-[0.16em] uppercase py-3.5 px-4 rounded-[1px] transition cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? 'SENDING...' : t.submitButton}
                  </button>

                  <p className="text-[10px] text-stone-500 leading-normal text-center">
                    {t.disclaimer}
                  </p>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Strip under Hero matching reference-section2.png */}
      <div className="bg-[#EBE6DC] text-stone-900 border-b border-stone-300/80">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-300/80 text-left py-6 px-4 sm:px-6 lg:px-8">
          
          <div className="p-3 sm:p-4">
            <p className="font-semibold text-sm text-stone-900">4.9★ Google rating</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase mt-0.5">[X] REVIEWS</p>
          </div>

          <div className="p-3 sm:p-4">
            <p className="font-semibold text-sm text-stone-900">Licensed & insured</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase mt-0.5">ILLINOIS</p>
          </div>

          <div className="p-3 sm:p-4">
            <p className="font-semibold text-sm text-stone-900">Written warranty</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase mt-0.5">WORKMANSHIP</p>
          </div>

          <div className="p-3 sm:p-4">
            <p className="font-semibold text-sm text-stone-900">Free estimates</p>
            <p className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase mt-0.5">NO OBLIGATION</p>
          </div>

        </div>
      </div>
    </>
  );
};

import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Camera } from 'lucide-react';
import { BUSINESS_INFO, PRIMARY_SERVICE_CITIES } from '../data/content';
import { Language, QuoteFormData } from '../types';
import { validateQuoteForm } from '../utils/estimator';
import { Reveal } from '../components/AnimatedReveal';

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
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <div className="bg-[#FAF8F5] text-stone-900 py-16 sm:py-24">
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
                      className="w-full bg-white text-stone-900 text-xs px-3.5 py-2.5 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition"
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
                      className="w-full bg-white text-stone-900 text-xs px-3.5 py-2.5 rounded-[1px] border border-stone-300 focus:outline-none focus:border-[#8B291B] transition"
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

                <div>
                  <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
                    Photo of the space (optional)
                  </label>
                  <label
                    htmlFor="contact-page-photos"
                    className="flex items-center justify-center gap-2 border border-dashed border-stone-300 hover:border-[#8B291B] bg-stone-50 px-3 py-3 rounded-[1px] cursor-pointer transition text-xs text-stone-600"
                  >
                    <Camera className="w-4 h-4 text-stone-500" />
                    <span>Add a photo — helps us quote faster</span>
                    <input
                      id="contact-page-photos"
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#8B291B] hover:bg-[#732216] active:scale-[0.99] text-white font-bold text-xs tracking-[0.16em] uppercase py-3.5 px-4 rounded-[1px] transition cursor-pointer shadow-sm"
                >
                  {isSubmitting ? 'SENDING...' : 'GET MY FREE QUOTE'}
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

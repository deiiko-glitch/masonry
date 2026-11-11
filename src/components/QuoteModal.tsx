import React, { useState } from 'react';
import { X, Phone } from 'lucide-react';
import { Language, QuoteFormData } from '../types';
import { validateQuoteForm } from '../utils/estimator';
import { submitToWeb3Forms } from '../utils/formSubmit';
import { trackTelClick } from '../utils/analytics';
import { BUSINESS_PHONE } from '../config/constants';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  prefilledService?: string;
  onSubmitSuccess: (data: QuoteFormData, photosCount: number) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  lang,
  prefilledService,
  onSubmitSuccess,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<Partial<QuoteFormData>>({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    service: prefilledService || 'Paver patio',
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
        source: 'QuoteModal Pop-up',
      },
      'Quote Modal Request'
    );

    setIsSubmitting(false);

    if (result.success) {
      onClose();
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
    } else {
      setSubmitError(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white text-stone-900 border border-stone-200 max-w-xl w-full rounded-[1px] shadow-2xl overflow-hidden my-6 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src="/assets/aistudio/logo_original_cropped.png"
              alt="The Masonry Doctors"
              className="h-12 w-auto object-contain shrink-0"
            />
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#8B291B] uppercase block">
                FREE QUOTE · THE MASONRY DOCTORS
              </span>
              <h3 className="font-serif text-2xl text-stone-900 font-normal mt-0.5 leading-tight">
                Tell us about your project
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Reply within 24 hours · No obligation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-900 p-2 rounded-[1px] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Honeypot field */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Error Message with direct phone fallback */}
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
    </div>
  );
};

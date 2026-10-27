import React, { useState } from 'react';
import { X, Camera } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language, QuoteFormData } from '../types';
import { validateQuoteForm } from '../utils/estimator';

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
        selectedPhotos.length
      );
      setSelectedPhotos([]);
    }, 700);
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
            className="text-stone-400 hover:text-stone-900 p-2 rounded-[1px]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
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

          <div>
            <label className="block text-[10px] font-bold tracking-[0.14em] text-stone-600 uppercase mb-1">
              Photo of the space (optional)
            </label>
            <label
              htmlFor="modal-photo-upload"
              className="flex items-center justify-center gap-2 border border-dashed border-stone-300 hover:border-[#8B291B] bg-stone-50 px-3 py-3 rounded-[1px] cursor-pointer transition text-xs text-stone-600"
            >
              <Camera className="w-4 h-4 text-stone-500" />
              <span>Add a photo — helps us quote faster</span>
              <input
                id="modal-photo-upload"
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
    </div>
  );
};

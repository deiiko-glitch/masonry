import React from 'react';
import { X, Star, CheckCircle, ExternalLink, MapPin } from 'lucide-react';
import { TESTIMONIALS, BUSINESS_INFO } from '../data/content';
import { Language } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenQuoteModal: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenQuoteModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#1C2126] border border-stone-700 max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden my-6 text-white animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-[#121517] p-5 sm:p-6 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white">4.9 / 5.0</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Google & HomeAdvisor Verified Homeowner Reviews • Aurora, Naperville & Fox Valley
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 rounded-lg bg-stone-800"
            aria-label="Close reviews"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reviews List */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 space-y-2 text-xs sm:text-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#B93826] text-white font-bold flex items-center justify-center text-xs">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.name}</h4>
                    <p className="text-[11px] text-stone-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E0533C]" />
                      <span>{item.city}</span> • <span>{item.date}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="inline-block bg-stone-800 text-[#E0533C] text-[10px] font-bold px-2 py-0.5 rounded">
                Project: {lang === 'en' ? item.projectType : item.projectTypeEs}
              </div>

              <p className="text-stone-300 italic leading-relaxed">
                "{lang === 'en' ? item.quote : item.quoteEs}"
              </p>

              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold pt-1">
                <CheckCircle className="w-3 h-3" />
                <span>Verified {item.verifiedSource} Homeowner Review</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#14171A] border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-stone-400">
            Ready to start your own 5-star outdoor transformation?
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenQuoteModal();
            }}
            className="w-full sm:w-auto bg-[#B93826] hover:bg-[#A32F1F] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            Request Free Quote
          </button>
        </div>

      </div>
    </div>
  );
};

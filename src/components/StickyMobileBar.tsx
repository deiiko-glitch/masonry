import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language } from '../types';

interface StickyMobileBarProps {
  lang: Language;
  onOpenQuoteModal: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  lang,
  onOpenQuoteModal,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#191D21]/95 backdrop-blur-md border-t border-stone-800 p-2.5 px-3 shadow-[0_-5px_25px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        {/* Call Now Button */}
        <a
          href={BUSINESS_INFO.phoneHref}
          className="flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 active:scale-[0.98] text-white py-3 px-3 rounded-xl font-bold text-sm border border-stone-700/80 shadow transition"
          aria-label={`Call ${BUSINESS_INFO.phone} now`}
        >
          <div className="w-6 h-6 rounded-full bg-[#B93826] flex items-center justify-center text-white shrink-0">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span className="truncate">
            {lang === 'en' ? 'Call Now' : 'Llamar'}
          </span>
        </a>

        {/* Free Quote Button */}
        <button
          onClick={onOpenQuoteModal}
          className="flex items-center justify-center gap-2 bg-[#B93826] hover:bg-[#A32F1F] active:scale-[0.98] text-white py-3 px-3 rounded-xl font-bold text-sm shadow-lg shadow-red-900/40 transition"
          aria-label="Request a Free Quote"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span className="truncate">
            {lang === 'en' ? 'Free Quote' : 'Cotización'}
          </span>
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language } from '../types';

interface CtaBannerProps {
  lang: Language;
  onOpenQuoteModal: () => void;
  kicker?: string;
  headline?: string;
  subtext?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  lang,
  onOpenQuoteModal,
  kicker,
  headline,
  subtext,
}) => {
  return (
    <div className="bg-[#EBE6DC] text-stone-900 py-14 px-4 sm:px-6 lg:px-8 border-b border-stone-300/80">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        
        <div className="max-w-2xl">
          <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-1.5">
            {kicker || 'AURORA · NAPERVILLE · OSWEGO'}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight leading-tight">
            {headline || (lang === 'en'
              ? 'Building on your street this season.'
              : 'Construyendo en su vecindario esta temporada.')}
          </h3>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            {subtext || (lang === 'en'
              ? 'Spring and summer dates fill first — get on the schedule with a free consultation.'
              : 'Las fechas de primavera y verano se llenan rápido — agende su consulta gratuita hoy.')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={onOpenQuoteModal}
            className="bg-[#8B291B] hover:bg-[#732216] active:scale-[0.99] text-white text-xs font-bold tracking-[0.16em] uppercase px-7 py-4 rounded-[1px] transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{lang === 'en' ? 'GET A FREE QUOTE' : 'COTIZAR GRATIS'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={BUSINESS_INFO.phoneHref}
            className="border border-stone-400 hover:border-stone-800 text-stone-800 text-xs font-bold tracking-[0.16em] uppercase px-6 py-4 rounded-[1px] transition flex items-center justify-center gap-2"
            aria-label={`Call ${BUSINESS_INFO.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#8B291B]" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Star, ArrowUpRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface SocialProofBarProps {
  lang: Language;
  onOpenReviewsModal: () => void;
}

export const SocialProofBar: React.FC<SocialProofBarProps> = ({
  lang,
  onOpenReviewsModal,
}) => {
  return (
    <div className="bg-[#FAF8F5] border-b border-stone-200/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Label */}
        <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] text-stone-500 uppercase">
          {lang === 'en' ? 'VERIFIED CONTRACTOR PROFILES' : 'PERFILES VERIFICADOS DE CONTRATISTA'}
        </div>

        {/* Two Crisp White Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
          
          {/* Google Reviews Card */}
          <a
            href={BUSINESS_INFO.socials.google}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-stone-200 hover:border-stone-400 p-4 rounded-[1px] shadow-2xs flex items-center justify-between gap-6 transition cursor-pointer text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-xs text-stone-700">
                G
              </div>
              <div>
                <p className="font-semibold text-xs text-stone-900 group-hover:text-[#8B291B] transition">
                  Google Reviews
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex text-[#8B291B] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#8B291B] text-[#8B291B]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">
                    Verified Reviews
                  </span>
                </div>
              </div>
            </div>

            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition" />
          </a>

          {/* Angi Card */}
          <a
            href={BUSINESS_INFO.socials.angi}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-stone-200 hover:border-stone-400 p-4 rounded-[1px] shadow-2xs flex items-center justify-between gap-6 transition cursor-pointer text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-xs text-stone-700">
                A
              </div>
              <div>
                <p className="font-semibold text-xs text-stone-900 group-hover:text-[#8B291B] transition">
                  Angi
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[11px] text-stone-500 font-medium">
                    Verified Contractor
                  </span>
                </div>
              </div>
            </div>

            <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition" />
          </a>

        </div>

      </div>
    </div>
  );
};

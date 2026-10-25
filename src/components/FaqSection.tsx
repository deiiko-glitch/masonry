import React, { useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from '../data/content';
import { Language } from '../types';

interface FaqSectionProps {
  lang: Language;
  onOpenQuoteModal: (topic?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  lang,
  onOpenQuoteModal,
}) => {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq-section" className="py-12 sm:py-16 bg-[#F0ECE1] text-stone-900 border-b border-stone-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column matching reference-section8.png */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block">
              {lang === 'en' ? 'QUESTIONS' : 'PREGUNTAS'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal leading-[1.12] tracking-tight">
              {lang === 'en' ? 'Answers before you call.' : 'Respuestas antes de llamar.'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {lang === 'en'
                ? 'The seven things homeowners ask us most. Anything else, just pick up the phone.'
                : 'Las siete preguntas más comunes de los propietarios. Para cualquier otra duda, contáctenos.'}
            </p>

            <div className="pt-4">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-block text-xs font-bold tracking-[0.16em] uppercase text-stone-900 border-b border-stone-400 hover:border-stone-900 pb-1 transition"
                aria-label={`Call ${BUSINESS_INFO.phone}`}
              >
                {lang === 'en' ? `ASK US DIRECTLY · ${BUSINESS_INFO.phone}` : `CONSÚLTENOS DIRECTO · ${BUSINESS_INFO.phone}`}
              </a>
            </div>
          </div>

          {/* Right Column Accordion matching reference-section8.png */}
          <div className="lg:col-span-7 divide-y divide-stone-300/80 border-y border-stone-300/80">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="py-5">
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-serif text-lg sm:text-xl text-stone-900 font-normal group-hover:text-[#8B291B] transition leading-snug">
                      {lang === 'en' ? faq.question : faq.questionEs}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180 text-[#8B291B]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-3 pb-2 text-xs sm:text-sm text-stone-600 leading-relaxed animate-in fade-in">
                      <p>{lang === 'en' ? faq.answer : faq.answerEs}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

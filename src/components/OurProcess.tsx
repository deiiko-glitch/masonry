import React from 'react';
import { Clock } from 'lucide-react';
import { PROCESS_STEPS } from '../data/content';
import { Language } from '../types';
import { Reveal, StaggerContainer, StaggerItem } from './AnimatedReveal';

interface OurProcessProps {
  lang: Language;
  onOpenQuoteModal: () => void;
}

export const OurProcess: React.FC<OurProcessProps> = ({
  lang,
  onOpenQuoteModal,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#F0ECE1] text-stone-900 border-b border-stone-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference-section5.png */}
        <Reveal direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
                {lang === 'en' ? 'OUR PROCESS' : 'NUESTRO PROCESO'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal leading-[1.12] tracking-tight">
                {lang === 'en' ? 'Four steps, no mystery.' : 'Cuatro pasos, sin misterios.'}
              </h2>
              <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
                {lang === 'en'
                  ? 'You always know what happens next, who is coming, and what it costs.'
                  : 'Siempre sabrá qué paso sigue, quién viene a su propiedad y cuánto cuesta.'}
              </p>
            </div>

            <div className="self-start lg:self-end bg-white border border-stone-300 text-stone-800 text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase px-5 py-3 flex items-center gap-2 rounded-[1px] shadow-2xs hover:shadow-sm transition">
              <Clock className="w-3.5 h-3.5 text-[#8B291B] animate-pulse" />
              <span>{lang === 'en' ? 'WE RESPOND WITHIN 24 HOURS' : 'RESPONDEMOS EN 24 HORAS'}</span>
            </div>
          </div>
        </Reveal>

        {/* 4 Process Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" staggerDelay={0.12}>
          {PROCESS_STEPS.map((step) => (
            <StaggerItem key={step.step} direction="up">
              <div
                className="bg-white p-6 sm:p-7 rounded-[1px] border border-stone-300/80 shadow-2xs flex flex-col justify-between h-full group hover:shadow-md hover:-translate-y-1 transition duration-300"
              >
                <div>
                  <span className="font-serif text-3xl text-[#8B291B] block mb-4 group-hover:scale-105 transition-transform duration-300">
                    {step.step}
                  </span>

                  <h3 className="font-serif text-xl text-stone-900 font-normal mb-2 leading-snug">
                    {lang === 'en' ? step.title : step.titleEs}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {lang === 'en' ? step.description : step.descriptionEs}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 text-[10px] font-bold tracking-wider text-stone-500 uppercase group-hover:text-[#8B291B] transition-colors">
                  {lang === 'en' ? step.timeframe : step.timeframeEs}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};


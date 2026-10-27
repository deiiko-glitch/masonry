import React from 'react';
import { Star } from 'lucide-react';
import { Language } from '../types';
import { Reveal, StaggerContainer, StaggerItem } from './AnimatedReveal';

interface TestimonialsSectionProps {
  lang: Language;
  onOpenReviewsModal: () => void;
  onOpenQuoteModal: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  lang,
  onOpenReviewsModal,
  onOpenQuoteModal,
}) => {
  const testimonials = [
    {
      quote: "They didn't just install pavers — they helped us through the entire design process.",
      quoteEs: "No solo instalaron los adoquines: nos ayudaron en todo el proceso de diseño.",
      initials: "JA",
      name: "Jazel Aguirre",
      meta: "Aurora, IL · Patio & gazebo",
      metaEs: "Aurora, IL · Patio y gazebo",
    },
    {
      quote: "Installed stone facing in two days… matched existing stonework… phenomenal job.",
      quoteEs: "Instalaron el enchapado de piedra en dos días… igualaron la piedra existente a la perfección… un trabajo fenomenal.",
      initials: "BR",
      name: "Bob Rath",
      meta: "Naperville, IL · Stone facing",
      metaEs: "Naperville, IL · Enchapado de piedra",
    },
    {
      quote: "Professional, prompt, honest, hard-working crew. Reasonably priced.",
      quoteEs: "Equipo profesional, puntual, honesto y muy trabajador. Precios muy razonables.",
      initials: "SJ",
      name: "Scott Jones",
      meta: "Oswego, IL · Hardscape installation",
      metaEs: "Oswego, IL · Instalación de adoquines",
    },
  ];

  return (
    <section id="reviews-section" className="py-12 sm:py-16 bg-[#F0ECE1] text-stone-900 border-b border-stone-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal direction="up">
          <div className="mb-8 sm:mb-10">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
              {lang === 'en' ? 'TESTIMONIALS' : 'TESTIMONIOS'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal leading-[1.12] tracking-tight">
              {lang === 'en' ? 'What Fox Valley homeowners say.' : 'Lo que dicen los propietarios en Fox Valley.'}
            </h2>
          </div>
        </Reveal>

        {/* 3 Testimonial Cards matching reference-section6.png */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8" staggerDelay={0.12}>
          {testimonials.map((item, idx) => (
            <StaggerItem key={idx} direction="up">
              <div
                className="bg-white p-7 sm:p-8 rounded-[1px] border border-stone-300/80 shadow-2xs flex flex-col justify-between h-full hover:shadow-md transition duration-300 hover:-translate-y-1"
              >
                <div className="mb-8">
                  <p className="font-serif text-xl sm:text-2xl text-stone-900 font-normal leading-snug">
                    “{lang === 'en' ? item.quote : item.quoteEs}”
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-200/90 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-[1px] bg-[#181B1D] text-white flex items-center justify-center font-bold text-xs shrink-0 tracking-wider">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-stone-900">
                      {item.name}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {lang === 'en' ? item.meta : item.metaEs}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Full-width white review banner matching reference */}
        <Reveal direction="up" delay={0.2}>
          <div className="bg-white p-5 rounded-[1px] border border-stone-300/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-stone-900">
              <div className="flex text-[#8B291B] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#8B291B] text-[#8B291B]" />
                ))}
              </div>
              <span className="font-bold text-sm">4.9 / 5 average</span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-600">142+ Verified Reviews</span>
            </div>

            <div className="text-stone-500 text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Fox Valley Google Verified Reviews</span>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

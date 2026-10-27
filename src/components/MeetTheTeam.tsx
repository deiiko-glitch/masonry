import React from 'react';
import { Phone, Play, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language } from '../types';
import { ExperienceVideoCard } from './ExperienceVideoCard';
import { Reveal, StaggerContainer, StaggerItem } from './AnimatedReveal';

interface MeetTheTeamProps {
  lang: Language;
  onOpenQuoteModal: () => void;
  onOpenVideoModal?: () => void;
}

export const MeetTheTeam: React.FC<MeetTheTeamProps> = ({
  lang,
  onOpenQuoteModal,
  onOpenVideoModal,
}) => {
  return (
    <section id="team-section" className="py-12 sm:py-16 bg-[#FAF8F5] text-stone-900 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive 9:16 Video Player Card with Photo Toggle */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="right" duration={0.6}>
              <ExperienceVideoCard lang={lang} onOpenVideoModal={onOpenVideoModal} />
              
              {/* Quick caption under card */}
              <p className="text-center text-xs text-stone-500 mt-3">
                {lang === 'en'
                  ? '▶ Watch Alex & Rolando on site with their Kubota excavator discussing 18+ years of experience.'
                  : '▶ Mira a Alex y Rolando en obra con su excavadora Kubota hablando de sus más de 18 años de trayectoria.'}
              </p>
            </Reveal>
          </div>

          {/* Right Column: Story & 18 Years Statement */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="left" duration={0.6}>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block">
                  {lang === 'en' ? 'ABOUT US' : 'SOBRE NOSOTROS'}
                </span>
                <span className="text-[10px] bg-stone-200/80 text-stone-700 font-bold px-2 py-0.5 rounded-[1px] tracking-wider uppercase">
                  {lang === 'en' ? '18+ YEARS EXPERIENCE' : '18+ AÑOS DE OFICIO'}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal leading-[1.12] tracking-tight mt-2">
                {lang === 'en'
                  ? 'Built on Family Values and a Dream'
                  : 'Construido sobre valores familiares y un sueño'}
              </h2>

              <p className="text-stone-800 text-base sm:text-lg font-serif italic leading-relaxed border-l-2 border-[#8B291B] pl-4 bg-[#F5F2EB]/70 py-2.5 pr-3 my-4">
                {lang === 'en'
                  ? 'At Masonry Doctors, we treat every project as if it were our own home — delivering craftsmanship you can trust and outdoor spaces your family can enjoy for years to come.'
                  : 'En Masonry Doctors, tratamos cada proyecto como si fuera nuestro propio hogar — brindando artesanía en la que puedes confiar y espacios al aire libre que tu familia disfrutará durante muchos años.'}
              </p>

              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  {lang === 'en'
                    ? 'We are an owner-operated masonry and hardscaping contractor rooted in Aurora. For over 18 years, our business has grown almost entirely through word-of-mouth recommendations from satisfied homeowners across the Fox Valley.'
                    : 'Somos una empresa de mampostería y adoquines operada por sus propios dueños en Aurora. Durante más de 18 años, nuestro negocio ha crecido principalmente gracias a las recomendaciones de boca en boca de clientes satisfechos en todo Fox Valley.'}
                </p>
                <p>
                  {lang === 'en'
                    ? 'We don’t send salespeople with brochures or farm your job to third-party sub-contractors. We bring our own heavy equipment, our own Kubota excavators, and our seasoned crew to your property each morning to build it right from ground preparation to the final seal.'
                    : 'No enviamos vendedores con catálogos ni subcontratamos su obra a terceros. Traemos nuestra propia maquinaria pesada Kubota y a nuestro equipo de años a su propiedad cada mañana para construir con precisión absoluta.'}
                </p>
              </div>

              {/* Promise Box featuring their words */}
              <div className="bg-[#F0ECE1] p-6 rounded-[1px] border border-stone-300/80 space-y-2 my-5">
                <p className="font-serif text-lg text-stone-900 leading-snug italic">
                  {lang === 'en'
                    ? '“18 years of hard work, honest pricing, and direct communication. When we finish your patio or retaining wall, you have a space built to outlast Illinois winters.”'
                    : '“18 años de trabajo arduo, precios honestos y trato directo. Cuando entregamos su patio o muro de contención, tiene una obra construida para durar décadas frente al invierno de Illinois.”'}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs font-bold tracking-widest text-stone-800 uppercase">
                    — Alex & Rolando, Founders & Lead Craftsmen
                  </p>
                  {onOpenVideoModal && (
                    <button
                      onClick={onOpenVideoModal}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#8B291B] hover:text-[#732216] transition cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#8B291B]" />
                      <span>{lang === 'en' ? 'Watch Video' : 'Ver Video'}</span>
                    </button>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Badges */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs" staggerDelay={0.08}>
              <StaggerItem direction="up">
                <div className="flex items-center gap-2 bg-white p-3 rounded-[1px] border border-stone-200 hover:border-stone-400 transition">
                  <ShieldCheck className="w-4 h-4 text-[#8B291B] shrink-0" />
                  <span className="font-medium text-stone-800">{lang === 'en' ? '18+ Yrs Experience' : '18+ Años de Oficio'}</span>
                </div>
              </StaggerItem>
              <StaggerItem direction="up">
                <div className="flex items-center gap-2 bg-white p-3 rounded-[1px] border border-stone-200 hover:border-stone-400 transition">
                  <ShieldCheck className="w-4 h-4 text-[#8B291B] shrink-0" />
                  <span className="font-medium text-stone-800">{lang === 'en' ? 'Own Heavy Equipment' : 'Maquinaria Propia'}</span>
                </div>
              </StaggerItem>
              <StaggerItem direction="up">
                <div className="flex items-center gap-2 bg-white p-3 rounded-[1px] border border-stone-200 hover:border-stone-400 transition">
                  <ShieldCheck className="w-4 h-4 text-[#8B291B] shrink-0" />
                  <span className="font-medium text-stone-800">{lang === 'en' ? 'Word-of-Mouth Proven' : 'Por Recomendación'}</span>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <Reveal direction="up" delay={0.2}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="bg-[#8B291B] hover:bg-[#732216] text-white text-xs font-bold tracking-[0.16em] uppercase px-7 py-4 rounded-[1px] transition text-center shadow-sm"
                >
                  CALL ROLANDO: {BUSINESS_INFO.phone}
                </a>

                <button
                  onClick={onOpenQuoteModal}
                  className="border border-stone-300 hover:border-stone-800 text-stone-800 text-xs font-bold tracking-[0.16em] uppercase px-7 py-4 rounded-[1px] transition text-center cursor-pointer"
                >
                  {lang === 'en' ? 'REQUEST CONSULTATION' : 'SOLICITAR CONSULTA'}
                </button>
              </div>
            </Reveal>

          </div>

        </div>

      </div>
    </section>
  );
};

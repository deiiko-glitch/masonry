import React from 'react';
import { Play, Star, Video, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO, VIDEO_TESTIMONIALS } from '../data/content';
import { Language, VideoTestimonialItem } from '../types';
import { ExperienceVideoCard } from '../components/ExperienceVideoCard';
import { Reveal, StaggerContainer, StaggerItem } from '../components/AnimatedReveal';
import { trackTelClick } from '../utils/analytics';
import { Seo } from '../components/Seo';

interface AboutViewProps {
  lang: Language;
  onOpenQuoteModal: () => void;
  onOpenVideoModal?: () => void;
  onOpenClientVideoModal?: (video: VideoTestimonialItem) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  lang,
  onOpenQuoteModal,
  onOpenVideoModal,
  onOpenClientVideoModal,
}) => {
  return (
    <div className="bg-[#FAF8F5] text-stone-900 py-16 sm:py-24">
      <Seo
        title={lang === 'en' ? 'About Us · 18 Years of Experience | Masonry Doctors Aurora, IL' : 'Sobre Nosotros · 18 Años de Experiencia | Masonry Doctors'}
        description={lang === 'en' ? 'Learn about Rolando and Masonry Doctors. 18 years of experience in custom paver patios, retaining walls, and brick repair in Aurora and the Fox Valley.' : 'Conozca a Rolando y Masonry Doctors. 18 años de experiencia en adoquines y mampostería en Aurora y Fox Valley.'}
        canonicalPath="/about"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={0.08}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block">
                  {lang === 'en' ? 'ABOUT US' : 'SOBRE NOSOTROS'}
                </span>
                <span className="text-[10px] bg-stone-200 text-stone-800 font-bold px-2 py-0.5 rounded-[1px] tracking-wider uppercase">
                  {lang === 'en' ? '18 YEARS OF EXPERIENCE' : '18 AÑOS DE EXPERIENCIA'}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal leading-[1.08] tracking-tight">
                {lang === 'en'
                  ? 'Built on Family Values and Craftsmanship'
                  : 'Construido sobre valores familiares y artesanía'}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-stone-800 text-lg sm:text-xl font-serif italic leading-relaxed border-l-2 border-[#8B291B] pl-4 bg-[#F5F2EB]/60 py-3 pr-3">
                {lang === 'en'
                  ? 'At Masonry Doctors, we treat every project as if it were our own home — delivering craftsmanship you can trust and outdoor spaces your family can enjoy for years to come.'
                  : 'En Masonry Doctors, tratamos cada proyecto como si fuera nuestro propio hogar — brindando artesanía en la que puedes confiar y espacios al aire libre que tu familia disfrutará durante muchos años.'}
              </p>
            </Reveal>

            <Reveal delay={0.24} className="space-y-4">
              <p className="text-stone-600 text-base leading-relaxed">
                {lang === 'en'
                  ? 'The Masonry Doctors is an owner-operated hardscaping and masonry contractor based in Aurora, Illinois. Led by Rolando and his dedicated crew, we specialize in high-end paver patios, structural retaining walls, and precision brick restoration.'
                  : 'The Masonry Doctors es una empresa de mampostería y adoquines operada por sus propios fundadores en Aurora, Illinois. Dirigida por Rolando y su equipo, nos especializamos en patios de adoquín de alta gama, muros de contención estructurales y restauración de ladrillo.'}
              </p>

              <p className="text-stone-600 text-base leading-relaxed">
                {lang === 'en'
                  ? 'Over 18 years of experience, our reputation has grown almost entirely through word-of-mouth. Unlike general remodeling brokers that subcontract your project out, we arrive on site with our own Kubota excavators and full-time crew every morning.'
                  : 'A lo largo de 18 años de experiencia, nuestra reputación ha crecido principalmente gracias a las recomendaciones de boca en boca. No subcontratamos su obra a terceros: llegamos cada mañana con nuestra propia maquinaria pesada Kubota y nuestro equipo de planta.'}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  onClick={() => trackTelClick(BUSINESS_INFO.phone)}
                  className="bg-[#8B291B] hover:bg-[#732216] text-white text-xs font-bold tracking-[0.16em] uppercase px-7 py-4 rounded-[1px] text-center transition-all transform hover:-translate-y-0.5 shadow-sm"
                >
                  CALL ROLANDO: {BUSINESS_INFO.phone}
                </a>

                <button
                  onClick={onOpenQuoteModal}
                  className="border border-stone-400 hover:border-stone-900 text-stone-800 text-xs font-bold tracking-[0.16em] uppercase px-7 py-4 rounded-[1px] text-center transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  REQUEST CONSULTATION
                </button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.2}>
              <ExperienceVideoCard lang={lang} onOpenVideoModal={onOpenVideoModal} />
              <p className="text-center text-xs text-stone-500 mt-3">
                {lang === 'en'
                  ? '▶ Watch Rolando and crew discuss 18 years of experience on video.'
                  : '▶ Mira el video donde Rolando y su equipo comparten sus 18 años de trayectoria.'}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Mission & Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Our Mission */}
          <Reveal direction="right" delay={0.1}>
            <div className="bg-white border border-stone-200 p-8 sm:p-10 rounded-[1px] shadow-sm relative overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#8B291B]"></div>
              <div className="pl-2 sm:pl-3 space-y-3">
                <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block">
                  {lang === 'en' ? 'OUR MISSION' : 'NUESTRA MISIÓN'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal leading-tight">
                  {lang === 'en' ? 'Precision Craftsmanship in Every Detail' : 'Artesanía de Precisión en Cada Detalle'}
                </h2>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
                  {lang === 'en'
                    ? "We focus on projects such as paver patios, walkways, retaining walls, brick repair, and custom outdoor living areas. Whether you're restoring existing masonry or creating a brand-new outdoor space, we approach every project with precision, attention to detail, and pride in our craftsmanship."
                    : 'Nos enfocamos en proyectos como patios de adoquines, caminos, muros de contención, reparación de ladrillos y áreas personalizadas para disfrutar al aire libre. Ya sea que esté restaurando mampostería existente o creando un nuevo espacio exterior, abordamos cada proyecto con precisión, atención al detalle y orgullo por nuestro oficio.'}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Our Values */}
          <Reveal direction="left" delay={0.2}>
            <div className="bg-white border border-stone-200 p-8 sm:p-10 rounded-[1px] shadow-sm relative overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#8B291B]"></div>
              <div className="pl-2 sm:pl-3 space-y-3">
                <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block">
                  {lang === 'en' ? 'OUR VALUES' : 'NUESTROS VALORES'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal leading-tight">
                  {lang === 'en' ? 'Honest Communication & Reliable Service' : 'Comunicación Honesta y Servicio Confiable'}
                </h2>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
                  {lang === 'en'
                    ? 'We believe homeowners deserve not only beautiful work but also honest communication, reliable service, and professional results. From the initial consultation to the final walkthrough, our goal is to make the process smooth and ensure that the finished project exceeds your expectation.'
                    : 'Creemos que los propietarios merecen no solo un trabajo hermoso, sino también una comunicación honesta, un servicio confiable y resultados profesionales. Desde la consulta inicial hasta la inspección final, nuestro objetivo es hacer que el proceso sea fluido y garantizar que el proyecto terminado supere sus expectativas.'}
                </p>
              </div>
            </div>
          </Reveal>

        </div>

        {/* 3 Pillars */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem direction="up">
            <div className="bg-white p-8 rounded-[1px] border border-stone-200 space-y-3 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <span className="font-serif text-2xl text-[#8B291B] block">01</span>
              <h3 className="font-serif text-xl text-stone-900 font-normal">Our Own Dedicated Crew</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                No revolving subcontractors. The same skilled masons show up at 7am every morning until your project is 100% complete and inspected.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem direction="up">
            <div className="bg-white p-8 rounded-[1px] border border-stone-200 space-y-3 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <span className="font-serif text-2xl text-[#8B291B] block">02</span>
              <h3 className="font-serif text-xl text-stone-900 font-normal">Deep 8-12" Sub-Base</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Illinois freeze-thaw cycles heave shallow ground. We dig deeper with our own Kubota equipment, lay heavy geotextile separation membranes, and mechanically compact crushed limestone.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem direction="up">
            <div className="bg-white p-8 rounded-[1px] border border-stone-200 space-y-3 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <span className="font-serif text-2xl text-[#8B291B] block">03</span>
              <h3 className="font-serif text-xl text-stone-900 font-normal">Craftsmanship Guarantee</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                We stand behind our base preparation and joint stability with a real craftsmanship commitment. If anything shifts, Rolando comes back personally.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Video Stories Section */}
        <div className="mt-20 pt-16 border-t border-stone-300">
          <Reveal direction="up">
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
                {lang === 'en' ? 'PROVEN TRACK RECORD' : 'REPUTACIÓN COMPROBADA'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal leading-tight">
                {lang === 'en' ? 'Built on Word-of-Mouth: What Homeowners Say' : 'De Boca en Boca: Lo Que Dicen los Propietarios'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                {lang === 'en'
                  ? 'Real clients Bob Rath and George share their experience with our masonry and pool hardscaping.'
                  : 'Nuestros clientes Bob Rath y George comparten en video cómo fue trabajar con nuestro equipo en sus obras.'}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {VIDEO_TESTIMONIALS.map((video) => (
              <Reveal key={video.id} direction="up" delay={0.1}>
                <div
                  onClick={() => onOpenClientVideoModal && onOpenClientVideoModal(video)}
                  className="group bg-[#14171A] text-white rounded-[2px] overflow-hidden border border-stone-800 shadow-md hover:shadow-2xl transition duration-300 cursor-pointer flex flex-col sm:flex-row"
                >
                  <div className="relative sm:w-5/12 aspect-[9/13] sm:aspect-auto sm:min-h-[260px] bg-black overflow-hidden shrink-0">
                    <img
                      src={video.posterSrc}
                      alt={video.clientName}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#8B291B] text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#A33624] transition">
                        <Play className="w-6 h-6 ml-0.5 fill-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold tracking-wider text-[#E38475] uppercase">
                          {lang === 'en' ? video.highlightTag : video.highlightTagEs}
                        </span>
                        <div className="flex text-[#E38475]">
                          {[...Array(video.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>

                      <h4 className="font-serif text-xl text-white font-normal">
                        {video.clientName}
                      </h4>
                      <p className="text-[10px] text-stone-400 mb-2">
                        {video.location} · {lang === 'en' ? 'Verified Client' : 'Cliente Verificado'}
                      </p>

                      <p className="text-xs text-stone-300 italic line-clamp-3">
                        “{lang === 'en' ? video.keyQuote : video.keyQuoteEs}”
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800 mt-3 flex items-center justify-between text-xs text-[#E38475] font-semibold">
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Job</span>
                      </span>
                      <span className="group-hover:text-white transition">
                        {lang === 'en' ? 'Watch video →' : 'Ver video →'}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

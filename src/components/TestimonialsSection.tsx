import React, { useState } from 'react';
import { Star, ExternalLink, Play, Video, ShieldCheck } from 'lucide-react';
import { Language, VideoTestimonialItem } from '../types';
import { Reveal, StaggerContainer, StaggerItem } from './AnimatedReveal';
import { BUSINESS_INFO, VIDEO_TESTIMONIALS } from '../data/content';
import { ClientVideoModal } from './ClientVideoModal';

interface TestimonialsSectionProps {
  lang: Language;
  onOpenReviewsModal: () => void;
  onOpenQuoteModal: (servicePrefill?: string) => void;
  onOpenVideoModal?: (videoItem?: VideoTestimonialItem) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  lang,
  onOpenReviewsModal,
  onOpenQuoteModal,
  onOpenVideoModal,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonialItem | null>(null);

  const testimonials = [
    {
      quote: "They didn't just install pavers — they helped us through the entire design process",
      quoteEs: "No solo instalaron los adoquines: nos ayudaron en todo el proceso de diseño",
      initials: "JA",
      name: "Jazel Aguirre",
      meta: "Verified Client · Paver Patio & Gazebo",
      metaEs: "Cliente Verificado · Patio y Gazebo",
      hasVideo: false,
    },
    {
      quote: "Installed stone facing in two days. The skilled masons did a phenomenal job of matching existing stonework",
      quoteEs: "Instalaron el enchapado de piedra en dos días. Los artesanos hicieron un trabajo fenomenal igualando la piedra existente",
      initials: "BR",
      name: "Bob Rath",
      meta: "Verified Client · Stone Facing & Retaining Wall",
      metaEs: "Cliente Verificado · Enchapado y Muro de Contención",
      hasVideo: true,
      videoId: 'video-bob-rath',
    },
    {
      quote: "Professional, prompt, honest and hard working crew. Reasonably priced",
      quoteEs: "Equipo profesional, puntual, honesto y muy trabajador. Precios muy razonables",
      initials: "SJ",
      name: "Scott Jones",
      meta: "Verified Client · Hardscape Installation",
      metaEs: "Cliente Verificado · Instalación de Adoquines",
      hasVideo: false,
    },
  ];

  const handlePlayVideo = (item: VideoTestimonialItem) => {
    if (onOpenVideoModal) {
      onOpenVideoModal(item);
    } else {
      setSelectedVideo(item);
    }
  };

  return (
    <section id="reviews-section" className="py-14 sm:py-20 bg-[#F0ECE1] text-stone-900 border-b border-stone-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal direction="up">
          <div className="mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
                {lang === 'en' ? 'CLIENT STORIES & REVIEWS' : 'HISTORIAS Y TESTIMONIOS REALES'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal leading-[1.12] tracking-tight">
                {lang === 'en' ? 'Hear directly from Fox Valley homeowners.' : 'Escucha directamente a nuestros clientes en Fox Valley.'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md">
              {lang === 'en'
                ? 'Real on-camera interviews with homeowners sharing their experience with Rolando and the crew.'
                : 'Entrevistas reales en video con propietarios contando su experiencia con Rolando y su equipo.'}
            </p>
          </div>
        </Reveal>

        {/* Featured Video Testimonials: Bob & George */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Video className="w-4 h-4 text-[#8B291B]" />
            <h3 className="text-xs font-bold tracking-[0.2em] text-[#8B291B] uppercase">
              {lang === 'en' ? 'ON-CAMERA VIDEO INTERVIEWS' : 'TESTIMONIOS EN VIDEO'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {VIDEO_TESTIMONIALS.map((video) => (
              <Reveal key={video.id} direction="up" delay={0.1}>
                <div
                  onClick={() => handlePlayVideo(video)}
                  className="group relative bg-[#14171A] text-white rounded-[2px] overflow-hidden border border-stone-700/80 shadow-md hover:shadow-2xl transition duration-300 cursor-pointer flex flex-col sm:flex-row"
                >
                  {/* Poster & Play Button (Left on tablet/desktop) */}
                  <div className="relative sm:w-5/12 aspect-[9/13] sm:aspect-auto sm:min-h-[290px] bg-black overflow-hidden shrink-0">
                    <img
                      src={video.posterSrc}
                      alt={`${video.clientName} testimonial video thumbnail`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#8B291B] text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#A33624] transition transform">
                        <Play className="w-7 h-7 ml-0.5 fill-white" />
                      </div>
                    </div>
                    <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded-[1px] text-[10px] font-bold text-[#E38475] tracking-wider uppercase flex items-center gap-1 border border-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>{lang === 'en' ? 'Watch Video' : 'Ver Video'}</span>
                    </div>
                  </div>

                  {/* Narrative Info (Right on tablet/desktop) */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold tracking-widest text-[#E38475] uppercase">
                          {lang === 'en' ? video.highlightTag : video.highlightTagEs}
                        </span>
                        <div className="flex text-[#E38475]">
                          {[...Array(video.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <h4 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1">
                        {video.clientName}
                      </h4>
                      <p className="text-[11px] text-stone-400 mb-3">
                        {lang === 'en' ? 'Verified Homeowner · Fox Valley, IL' : 'Propietario Verificado · Fox Valley, IL'}
                      </p>

                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed italic border-l-2 border-[#8B291B] pl-3 py-1">
                        “{lang === 'en' ? video.keyQuote : video.keyQuoteEs}”
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-800/80 mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Verified Job Site' : 'Obra Verificada'}</span>
                      </div>
                      <span className="text-xs text-[#E38475] font-bold tracking-wider uppercase group-hover:text-white flex items-center gap-1 transition">
                        <span>{lang === 'en' ? 'Play Story' : 'Reproducir'}</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Written Testimonial Cards Header */}
        <div className="mb-4">
          <span className="text-[11px] font-bold tracking-[0.2em] text-stone-600 uppercase block">
            {lang === 'en' ? 'WRITTEN HOMEOWNER FEEDBACK' : 'RESEÑAS ESCRITAS'}
          </span>
        </div>

        {/* 3 Testimonial Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8" staggerDelay={0.12}>
          {testimonials.map((item, idx) => (
            <StaggerItem key={idx} direction="up">
              <div
                className="bg-white p-7 sm:p-8 rounded-[1px] border border-stone-300/80 shadow-2xs flex flex-col justify-between h-full hover:shadow-md transition duration-300 hover:-translate-y-1"
              >
                <div className="mb-6">
                  <div className="flex text-[#8B291B] gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#8B291B] text-[#8B291B]" />
                    ))}
                  </div>
                  <p className="font-serif text-lg sm:text-xl text-stone-900 font-normal leading-snug">
                    “{lang === 'en' ? item.quote : item.quoteEs}”
                  </p>
                </div>

                <div className="pt-5 border-t border-stone-200/90 space-y-3">
                  <div className="flex items-center gap-3.5">
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

                  {item.hasVideo && (
                    <button
                      onClick={() => {
                        const target = VIDEO_TESTIMONIALS.find((v) => v.id === item.videoId);
                        if (target) handlePlayVideo(target);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-100 hover:bg-[#8B291B] hover:text-white text-[#8B291B] rounded-[1px] text-[11px] font-bold tracking-wider uppercase transition cursor-pointer border border-stone-300/80"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{lang === 'en' ? "Watch Bob's Video Interview" : 'Ver Video de Bob Rath'}</span>
                    </button>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Full-width review banner without unverified numbers */}
        <Reveal direction="up" delay={0.2}>
          <div className="bg-white p-5 rounded-[1px] border border-stone-300/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4 text-stone-900">
              <div className="flex items-center gap-2">
                <div className="flex text-[#8B291B] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#8B291B] text-[#8B291B]" />
                  ))}
                </div>
                <span className="font-bold text-sm">Verified Local Reviews</span>
              </div>
              <span className="text-stone-400">·</span>
              <a
                href={BUSINESS_INFO.socials.google}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 underline underline-offset-2"
              >
                <span>Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-stone-400">·</span>
              <a
                href={BUSINESS_INFO.socials.angi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 underline underline-offset-2"
              >
                <span>Angi</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <button
              onClick={onOpenReviewsModal}
              className="text-[#8B291B] hover:text-[#732216] font-semibold text-xs transition cursor-pointer"
            >
              {lang === 'en' ? 'View Homeowner Feedback →' : 'Ver Opiniones de Clientes →'}
            </button>
          </div>
        </Reveal>

      </div>

      {/* Internal modal if not passed via props */}
      {!onOpenVideoModal && (
        <ClientVideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoItem={selectedVideo}
          lang={lang}
          onOpenQuoteModal={onOpenQuoteModal}
        />
      )}
    </section>
  );
};

import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ShieldCheck, Phone } from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface ExperienceVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenQuoteModal: () => void;
}

export const ExperienceVideoModal: React.FC<ExperienceVideoModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenQuoteModal,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Autoplay with sound might be blocked, fallback to muted play
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => setIsPlaying(false));
          }
        });
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl bg-[#14171A] border border-stone-700 shadow-2xl rounded-[2px] overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full transition cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Column (9:16 portrait in sleek container) */}
        <div className="md:col-span-7 bg-black flex items-center justify-center relative min-h-[460px] max-h-[82vh] overflow-hidden">
          <video
            ref={videoRef}
            src="/assets/aistudio/AQPkQbO1r-u2fKgkzW-OOwFNrVUOYR1g6qs_j5kqKVsnavvXlxmwJ_Xoo8rsrHEvkuzLFBAnqBolQxnq4ikiO2Sq._abd8a26e.mp4"
            className="w-full h-full max-h-[80vh] object-contain cursor-pointer"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
          />

          {/* Quick Play/Pause Big Central Indicator if paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#8B291B]/90 hover:bg-[#8B291B] text-white flex items-center justify-center shadow-2xl transition transform hover:scale-110 cursor-pointer"
              aria-label="Reproducir video"
            >
              <Play className="w-8 h-8 ml-1 fill-white" />
            </button>
          )}

          {/* Video Control Bar at bottom of video */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-6 flex flex-col gap-2">
            {/* Progress line */}
            <div className="w-full h-1 bg-stone-700/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C74835] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-1 hover:text-white transition cursor-pointer"
                  aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1 hover:text-white transition flex items-center gap-1 cursor-pointer"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-red-400" />
                      <span className="text-[10px] text-red-300 font-semibold uppercase">Activar audio</span>
                    </>
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Rolando & Alex · 18+ Años</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Action Column */}
        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#14171A]">
          <div className="space-y-4">
            {/* Brand Logo & Experience Tag */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-md p-1 shrink-0 shadow-md flex items-center justify-center">
                <img
                  src="/assets/aistudio/image_4c8ccfb1.png"
                  alt="The Masonry Doctors"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C74835] uppercase block">
                  {lang === 'en' ? 'OUR STORY · 18+ YEARS' : 'NUESTRA HISTORIA · 18+ AÑOS'}
                </span>
                <h3 className="font-serif text-lg text-white font-medium">
                  The Masonry Doctors
                </h3>
              </div>
            </div>

            <h2 className="font-serif text-2xl text-stone-100 font-normal leading-tight pt-1">
              {lang === 'en'
                ? '“Over 18 years in hardscaping & masonry in Aurora & Fox Valley.”'
                : '“Más de 18 años de experiencia en hardscaping y mampostería.”'}
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {lang === 'en'
                ? 'Alex, Rolando, and their crew have built their business through word-of-mouth and homeowner recommendations. When you hire Masonry Doctors, you deal directly with the craftsmen on the job site with their own heavy equipment.'
                : 'Alex, Rolando y su equipo han hecho crecer el negocio principalmente de boca en boca y por recomendación de sus clientes. Al contratarnos, tratas directamente con los artesanos en la obra con su propia maquinaria.'}
            </p>

            {/* Highlights */}
            <div className="space-y-2 pt-2 border-t border-stone-800 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C74835] shrink-0" />
                <span>{lang === 'en' ? 'Owner on every job site with laser levels' : 'Dueño en cada obra con nivel láser'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C74835] shrink-0" />
                <span>{lang === 'en' ? 'Own Kubota machinery & equipment' : 'Maquinaria pesada Kubota propia'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C74835] shrink-0" />
                <span>{lang === 'en' ? 'Built on word-of-mouth reputation' : 'Construido con reputación de boca en boca'}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-3">
            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal();
              }}
              className="w-full bg-[#8B291B] hover:bg-[#A33624] text-white text-xs font-bold tracking-[0.16em] uppercase py-3.5 px-4 rounded-[1px] transition text-center shadow-sm cursor-pointer"
            >
              {lang === 'en' ? 'REQUEST FREE ESTIMATE' : 'COTIZAR PROYECTO GRATIS'}
            </button>

            <a
              href={BUSINESS_INFO.phoneHref}
              className="w-full flex items-center justify-center gap-2 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-xs font-semibold tracking-wider uppercase py-3 px-4 rounded-[1px] transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#C74835]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

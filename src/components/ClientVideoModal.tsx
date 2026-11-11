import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Star, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { Language, VideoTestimonialItem } from '../types';

interface ClientVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoItem: VideoTestimonialItem | null;
  lang: Language;
  onOpenQuoteModal: (servicePrefill?: string) => void;
}

export const ClientVideoModal: React.FC<ClientVideoModalProps> = ({
  isOpen,
  onClose,
  videoItem,
  lang,
  onOpenQuoteModal,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setProgress(0);
    } else if (isOpen && videoRef.current) {
      // Auto-attempt play with sound or fall back
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Browser autoplay restrictions with audio
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
            }
          });
      }
    }
  }, [isOpen, videoItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !videoItem) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true));
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
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-3xl bg-[#14171A] border border-stone-700 shadow-2xl rounded-[2px] overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 text-white animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full transition cursor-pointer"
          aria-label={lang === 'en' ? 'Close modal' : 'Cerrar ventana'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Column */}
        <div className="md:col-span-6 bg-black flex items-center justify-center relative min-h-[420px] max-h-[75vh] overflow-hidden">
          <video
            ref={videoRef}
            src={videoItem.videoSrc}
            poster={videoItem.posterSrc}
            preload="none"
            className="w-full h-full max-h-[75vh] object-contain cursor-pointer"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
          />

          {/* Central Play/Pause button */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#8B291B]/95 hover:bg-[#A33624] text-white flex items-center justify-center shadow-2xl transition transform hover:scale-110 cursor-pointer"
              aria-label={lang === 'en' ? 'Play video' : 'Reproducir video'}
            >
              <Play className="w-8 h-8 ml-1 fill-white" />
            </button>
          )}

          {/* Video Control Bar at bottom of video */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 pt-6 flex flex-col gap-2">
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
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1 hover:text-white transition flex items-center gap-1 cursor-pointer"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-red-400" />
                      <span className="text-[10px] text-red-300 font-semibold uppercase">
                        {lang === 'en' ? 'Unmute' : 'Activar Audio'}
                      </span>
                    </>
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{videoItem.clientName} · Verified Homeowner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Project Details Column */}
        <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between bg-[#14171A]">
          <div className="space-y-4">
            
            {/* Badge & Rating */}
            <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-3">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#C74835] uppercase">
                {lang === 'en' ? 'VERIFIED VIDEO REVIEW' : 'RESEÑA EN VIDEO VERIFICADA'}
              </span>
              <div className="flex items-center gap-0.5 text-[#E38475]">
                {[...Array(videoItem.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            {/* Client Info */}
            <div>
              <div className="flex items-center gap-2 text-stone-300 text-xs mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#C74835]" />
                <span>{videoItem.location}</span>
              </div>
              <h3 className="font-serif text-2xl text-white font-normal">
                {videoItem.clientName}
              </h3>
              <p className="text-xs text-[#E38475] font-semibold mt-0.5">
                {lang === 'en' ? videoItem.projectTitle : videoItem.projectTitleEs}
              </p>
            </div>

            {/* Highlight Quote */}
            <div className="bg-[#1C2024] p-4 border-l-2 border-[#8B291B] rounded-[1px]">
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed italic">
                “{lang === 'en' ? videoItem.keyQuote : videoItem.keyQuoteEs}”
              </p>
            </div>

            {/* Credibility highlights */}
            <div className="space-y-2 pt-1 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'en' ? 'Cleaned up job site daily' : 'Limpieza diaria del sitio de obra'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'en' ? 'Completed strictly on scheduled timeline' : 'Terminado exactamente en el tiempo pactado'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'en' ? 'Skilled masons with owner on-site' : 'Artesanos expertos con el dueño en la obra'}</span>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal(lang === 'en' ? videoItem.projectTitle : videoItem.projectTitleEs);
              }}
              className="w-full bg-[#8B291B] hover:bg-[#A33624] text-white text-xs font-bold tracking-[0.16em] uppercase py-3.5 px-4 rounded-[1px] transition text-center shadow-sm cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>{lang === 'en' ? 'GET ESTIMATE FOR YOUR PROJECT' : 'COTIZAR TU PROYECTO GRATIS'}</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
            </button>
            <p className="text-[11px] text-center text-stone-400">
              {lang === 'en' ? 'Free on-site written proposal · No obligations' : 'Presupuesto escrito sin costo · Sin compromiso'}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

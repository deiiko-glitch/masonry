import React, { useState, useRef } from 'react';
import { X, Star, CheckCircle, ExternalLink, Play, Video, Pause, Volume2, VolumeX } from 'lucide-react';
import { TESTIMONIALS, VIDEO_TESTIMONIALS, BUSINESS_INFO } from '../data/content';
import { Language, VideoTestimonialItem } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenQuoteModal: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenQuoteModal,
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonialItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const handleSelectVideo = (video: VideoTestimonialItem) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveVideo(null);
    setIsPlaying(false);
  };

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

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#1C2126] border border-stone-700 max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden my-6 text-white animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-[#121517] p-5 sm:p-6 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">
                {lang === 'en' ? 'Verified Client Feedback' : 'Opiniones Verificadas de Clientes'}
              </span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              {lang === 'en'
                ? 'Direct video interviews & verified reviews from Fox Valley homeowners'
                : 'Entrevistas en video y opiniones verificadas de propietarios en Fox Valley'}
            </p>
          </div>
          <button
            onClick={() => {
              handleCloseVideo();
              onClose();
            }}
            className="text-stone-400 hover:text-white p-2 rounded-lg bg-stone-800 cursor-pointer"
            aria-label="Close reviews"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inline Active Video Player if selected */}
        {activeVideo && (
          <div className="p-4 bg-black border-b border-stone-800 flex flex-col items-center relative">
            <div className="w-full flex items-center justify-between text-xs text-stone-300 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-[#E38475]">
                <Video className="w-3.5 h-3.5" />
                <span>{activeVideo.clientName} · {lang === 'en' ? activeVideo.projectTitle : activeVideo.projectTitleEs}</span>
              </div>
              <button
                onClick={handleCloseVideo}
                className="text-stone-400 hover:text-white text-xs underline cursor-pointer"
              >
                {lang === 'en' ? 'Close video' : 'Cerrar video'}
              </button>
            </div>

            <div className="relative max-h-[380px] w-full flex items-center justify-center bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                src={activeVideo.videoSrc}
                poster={activeVideo.posterSrc}
                autoPlay
                playsInline
                className="max-h-[380px] w-auto object-contain cursor-pointer"
                onClick={togglePlay}
              />
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#8B291B]/90 text-white flex items-center justify-center shadow-xl cursor-pointer"
                >
                  <Play className="w-7 h-7 ml-0.5 fill-white" />
                </button>
              )}
            </div>

            <div className="w-full flex items-center justify-between text-xs text-stone-300 pt-2 px-1">
              <button
                onClick={togglePlay}
                className="flex items-center gap-1 text-stone-200 hover:text-white cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? (lang === 'en' ? 'Pause' : 'Pausar') : (lang === 'en' ? 'Play' : 'Reproducir')}</span>
              </button>
              <button
                onClick={toggleMute}
                className="flex items-center gap-1 text-stone-200 hover:text-white cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isMuted ? (lang === 'en' ? 'Unmute' : 'Activar audio') : (lang === 'en' ? 'Mute' : 'Silenciar')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Content: Video Testimonials + Written Reviews */}
        <div className="p-5 sm:p-6 max-h-[65vh] overflow-y-auto space-y-5">
          
          {/* Video Reviews Showcase Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-[#E0533C]" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                {lang === 'en' ? 'Watch On-Camera Video Reviews' : 'Ver Reseñas en Video de Clientes'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VIDEO_TESTIMONIALS.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className="bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-stone-700 p-3 rounded-xl flex items-center gap-3 cursor-pointer group transition"
                >
                  <div className="relative w-16 h-20 rounded-md overflow-hidden bg-black shrink-0">
                    <img
                      src={video.posterSrc}
                      alt={video.clientName}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-[#8B291B] text-white flex items-center justify-center shadow-md">
                        <Play className="w-3.5 h-3.5 ml-0.5 fill-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                      {[...Array(video.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <h5 className="font-bold text-white text-xs truncate">{video.clientName}</h5>
                    <p className="text-[10px] text-stone-400 truncate">
                      {lang === 'en' ? video.projectTitle : video.projectTitleEs}
                    </p>
                    <span className="inline-block text-[10px] text-[#E0533C] font-semibold mt-1">
                      {lang === 'en' ? '▶ Play video review' : '▶ Reproducir video'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3">
              {lang === 'en' ? 'Verified Written Reviews' : 'Reseñas Escritas'}
            </span>
          </div>

          {/* Written Reviews List */}
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 space-y-2 text-xs sm:text-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#B93826] text-white font-bold flex items-center justify-center text-xs">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.name}</h4>
                    <p className="text-[11px] text-stone-400">
                      <span>{item.date}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="inline-block bg-stone-800 text-[#E0533C] text-[10px] font-bold px-2 py-0.5 rounded">
                Project: {lang === 'en' ? item.projectType : item.projectTypeEs}
              </div>

              <p className="text-stone-300 italic leading-relaxed">
                "{lang === 'en' ? item.quote : item.quoteEs}"
              </p>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Homeowner Review</span>
                </div>
                {item.name === 'Bob Rath' && (
                  <button
                    onClick={() => {
                      const bob = VIDEO_TESTIMONIALS.find((v) => v.id === 'video-bob-rath');
                      if (bob) handleSelectVideo(bob);
                    }}
                    className="text-[10px] text-[#E0533C] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>{lang === 'en' ? 'Watch Bob on video' : 'Ver a Bob en video'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#14171A] border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-stone-400">
            <a
              href={BUSINESS_INFO.socials.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white underline"
            >
              Google <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={BUSINESS_INFO.socials.angi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white underline"
            >
              Angi <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={() => {
              handleCloseVideo();
              onClose();
              onOpenQuoteModal();
            }}
            className="w-full sm:w-auto bg-[#B93826] hover:bg-[#A32F1F] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            {lang === 'en' ? 'Request Free Quote' : 'Cotizar Gratis'}
          </button>
        </div>

      </div>
    </div>
  );
};

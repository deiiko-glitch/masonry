import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Users, Video } from 'lucide-react';
import { Language } from '../types';

interface ExperienceVideoCardProps {
  lang: Language;
  onOpenVideoModal?: () => void;
}

export const ExperienceVideoCard: React.FC<ExperienceVideoCardProps> = ({
  lang,
  onOpenVideoModal,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'photo'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => setIsPlaying(true));
        }
      });
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative rounded-[2px] overflow-hidden shadow-2xl border border-stone-300 bg-[#14171A]">
      
      {/* Tab Switcher Header */}
      <div className="flex items-center justify-between bg-stone-900 border-b border-stone-800 px-3 py-2 text-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setActiveTab('video');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-semibold text-[11px] uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'video'
                ? 'bg-[#8B291B] text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Watch Story (18 Yrs)' : 'Ver Video (18 Años)'}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('photo');
              if (videoRef.current && isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-semibold text-[11px] uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'photo'
                ? 'bg-[#8B291B] text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Crew On Site' : 'Foto en Obra'}</span>
          </button>
        </div>

        {activeTab === 'video' && onOpenVideoModal && (
          <button
            onClick={onOpenVideoModal}
            className="text-stone-400 hover:text-white p-1 transition cursor-pointer"
            title={lang === 'en' ? 'Open Fullscreen' : 'Ver pantalla completa'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="relative aspect-[9/13] sm:aspect-[9/12] max-h-[540px] w-full bg-black flex items-center justify-center overflow-hidden">
        {activeTab === 'video' ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              src="/assets/aistudio/AQPkQbO1r-u2fKgkzW-OOwFNrVUOYR1g6qs_j5kqKVsnavvXlxmwJ_Xoo8rsrHEvkuzLFBAnqBolQxnq4ikiO2Sq._abd8a26e.mp4"
              className="w-full h-full object-cover cursor-pointer"
              onClick={handlePlayToggle}
              playsInline
              loop
              muted={isMuted}
            />

            {/* Play Button Overlay if not playing */}
            {!isPlaying && (
              <div
                onClick={handlePlayToggle}
                className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-6 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-[#8B291B] group-hover:bg-[#A33624] text-white flex items-center justify-center shadow-2xl transition transform group-hover:scale-110 mb-4">
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
                <span className="text-white font-serif text-xl sm:text-2xl font-normal drop-shadow">
                  {lang === 'en' ? '18+ Years of Hardscaping' : '18+ Años de Experiencia'}
                </span>
                <span className="text-stone-300 text-xs tracking-wider uppercase mt-1 font-semibold">
                  {lang === 'en' ? 'Click to play with sound' : 'Clic para reproducir con audio'}
                </span>
              </div>
            )}

            {/* Floating Sound Toggle */}
            {isPlaying && (
              <button
                onClick={handleMuteToggle}
                className="absolute bottom-4 right-4 z-20 bg-black/75 hover:bg-black text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm transition cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-400" />
                    <span>{lang === 'en' ? 'Unmute' : 'Activar Audio'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'en' ? 'Mute' : 'Silenciar'}</span>
                  </>
                )}
              </button>
            )}

            {/* Top Badge */}
            <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-md px-3 py-1 rounded-[1px] border border-stone-700/60 text-[10px] font-bold tracking-widest text-[#E38475] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E38475] animate-ping"></span>
              <span>Alex & Rolando · Aurora, IL</span>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src="https://media.base44.com/images/public/6ade12ca8fcc6eb2884e6092/11ba054f3_generated_710dbf76.png/v1/fill/w_596,h_520,al_c,q_90,usm_0.66_1.00_0.01,enc_auto,quality_auto/11ba054f3_generated_710dbf76.png"
              alt="Rolando and the Masonry Doctors crew on a paver patio job site in Aurora, Illinois"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-3 border border-stone-700 text-white text-xs">
              <p className="font-semibold">{lang === 'en' ? 'Rolando with his full-time crew on site' : 'Rolando con su equipo propio en obra'}</p>
              <p className="text-stone-400 text-[11px]">{lang === 'en' ? 'Zero subcontractors · Owner present every morning' : 'Cero subcontratistas · El dueño presente cada mañana'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar with credentials */}
      <div className="bg-[#1C2024] p-3 text-xs text-stone-300 border-t border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/assets/aistudio/logo_dark_header.png"
            alt="The Masonry Doctors"
            className="h-6 w-auto object-contain"
          />
          <span className="text-[11px] font-semibold text-stone-200">The Masonry Doctors</span>
        </div>
        <span className="text-[10px] font-bold text-[#E38475] tracking-widest uppercase">
          {lang === 'en' ? 'EST. 18+ YEARS' : '18+ AÑOS DE OFICIO'}
        </span>
      </div>

    </div>
  );
};

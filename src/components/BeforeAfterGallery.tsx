import React, { useState } from 'react';
import { MapPin, ArrowRight, Sliders } from 'lucide-react';
import { PROJECTS } from '../data/content';
import { Language, ProjectItem } from '../types';

interface BeforeAfterGalleryProps {
  lang: Language;
  onSeeAllProjects: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenQuoteModal: (servicePrefill?: string) => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({
  lang,
  onSeeAllProjects,
  onSelectProject,
  onOpenQuoteModal,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const heroProject = PROJECTS[0];
  const galleryProjects = PROJECTS.slice(0, 6);

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pos);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX, rect);
    }
  };

  return (
    <section id="gallery-section" className="py-12 sm:py-16 bg-[#FAF8F5] text-stone-900 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference-section4.png */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
              {lang === 'en' ? 'RECENT WORK' : 'PROYECTOS RECIENTES'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal leading-[1.12] tracking-tight">
              {lang === 'en'
                ? 'Finished projects around the Fox Valley.'
                : 'Obras terminadas en el área de Fox Valley.'}
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              {lang === 'en'
                ? 'Browse patios, walls, walkways and restorations built across Aurora and the surrounding suburbs. Every one of these was designed, built and finished by our own crew.'
                : 'Patios, muros, entradas y restauraciones realizadas por nuestro propio equipo.'}
            </p>
          </div>

          <button
            onClick={onSeeAllProjects}
            className="self-start lg:self-end border border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white text-stone-800 text-[11px] font-bold tracking-[0.16em] uppercase px-7 py-3.5 transition cursor-pointer flex items-center gap-2 rounded-[1px] shadow-2xs"
          >
            <span>{lang === 'en' ? 'SEE ALL PROJECTS' : 'VER TODOS LOS PROYECTOS'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Projects Grid matching reference-section4.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {galleryProjects.map((project, idx) => {
            const badgeTitles = [
              'PAVER PATIO & FIRE PIT',
              'STONE FACING',
              'TERRACED PATIO & RETAINING WALL',
              'OUTDOOR KITCHEN & PERGOLA',
              'PAVER WALKWAY',
              'PAVER DRIVEWAY',
            ];
            const badgeLabel = badgeTitles[idx] || project.categoryLabel.toUpperCase();

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group bg-white border border-stone-200/90 rounded-[1px] overflow-hidden cursor-pointer shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 sm:h-60 overflow-hidden bg-stone-100">
                  <img
                    src={project.afterImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                  />

                  {/* Top-left crisp white badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-stone-900 text-[10px] font-bold tracking-[0.16em] px-3 py-1.5 rounded-[1px] uppercase shadow-xs">
                    {badgeLabel}
                  </div>
                </div>

                {/* Bottom Bar matching reference */}
                <div className="p-4 bg-white flex items-center justify-between text-xs text-stone-600">
                  <div className="flex items-center gap-1.5 font-medium text-stone-800">
                    <MapPin className="w-3.5 h-3.5 text-[#8B291B]" />
                    <span>{project.city}</span>
                  </div>

                  <span className="text-[10px] font-bold tracking-[0.16em] text-stone-400 uppercase">
                    PHOTO PLACEHOLDERS
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Before & After Comparison Slider */}
        <div className="bg-[#181B1D] text-white p-6 sm:p-8 rounded-[1px] border border-stone-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#C74835] uppercase block mb-1">
                INTERACTIVE COMPARISON
              </span>
              <h3 className="font-serif text-2xl text-white font-normal">
                {heroProject.title}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                {heroProject.city} • {heroProject.materialsUsed} • {heroProject.duration}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs bg-stone-800/80 px-3.5 py-1.5 rounded-[1px] border border-stone-700 text-stone-300">
              <Sliders className="w-3.5 h-3.5 text-[#C74835]" />
              <span>Drag slider left / right to see before</span>
            </div>
          </div>

          <div
            className="relative h-[260px] sm:h-[360px] overflow-hidden cursor-ew-resize select-none border border-stone-700 rounded-[1px]"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image */}
            <img
              src={heroProject.afterImage}
              alt="After paver patio"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-stone-900/90 text-white text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase">
              AFTER
            </div>

            {/* Before Image */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={heroProject.beforeImage || 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=1200&q=80'}
                alt="Before paver patio"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%', minWidth: '100%' }}
              />
              <div className="absolute top-4 left-4 bg-stone-900/90 text-white text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase">
                BEFORE
              </div>
            </div>

            {/* Drag Handle Divider */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-2xl z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-stone-900 border border-[#8B291B] text-[10px] font-bold">
                ◀▶
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

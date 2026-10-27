import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/content';
import { Language, ServiceItem } from '../types';
import { Reveal, StaggerContainer, StaggerItem } from './AnimatedReveal';

interface ServicesGridProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  lang,
  onSelectService,
  onOpenQuoteModal,
}) => {
  // Services mapped directly to the reference layout
  const patioService = SERVICES.find((s) => s.id === 'paver-patios') || SERVICES[0];
  const walkwayService = SERVICES.find((s) => s.id === 'walkways-driveways') || SERVICES[1];
  const wallService = SERVICES.find((s) => s.id === 'retaining-walls') || SERVICES[2];
  const repairService = SERVICES.find((s) => s.id === 'brick-masonry-repair') || SERVICES[3];
  const outdoorService = SERVICES.find((s) => s.id === 'outdoor-living') || SERVICES[4];
  const poolService = SERVICES.find((s) => s.id === 'concrete-pools') || SERVICES[5];

  return (
    <section id="services-section" className="py-12 sm:py-16 bg-[#FAF8F5] text-stone-900 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal className="mb-8 sm:mb-10">
          <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
            {lang === 'en' ? 'WHAT WE BUILD' : 'LO QUE CONSTRUIMOS'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal leading-[1.12] tracking-tight max-w-3xl">
            {lang === 'en'
              ? 'Hardscape and masonry, done to a standard you can see'
              : 'Adoquines y mampostería hechos con un estándar visible'}
          </h2>
        </Reveal>

        {/* Asymmetrical Editorial Grid with Staggered Scroll Animations */}
        <StaggerContainer className="space-y-6">
          
          {/* Top Row: Two Wide 50/50 Banner Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Card 1: Paver Patios */}
            <StaggerItem direction="scale">
              <div
                onClick={() => onSelectService(patioService)}
                className="group relative h-64 sm:h-80 rounded-[1px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <img
                  src={patioService.image}
                  alt="Paver Patios by Masonry Doctors"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div className="max-w-md">
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                      {lang === 'en' ? 'Paver Patios' : 'Patios de Adoquín'}
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
                      {lang === 'en'
                        ? 'Outdoor rooms that stay level and tight — season after season.'
                        : 'Espacios exteriores que se mantienen nivelados y firmes temporada tras temporada.'}
                    </p>
                  </div>

                  <div className="w-10 h-10 border border-white/30 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:bg-[#8B291B] group-hover:border-[#8B291B] group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Card 2: Walkways & Driveways */}
            <StaggerItem direction="scale">
              <div
                onClick={() => onSelectService(walkwayService)}
                className="group relative h-64 sm:h-80 rounded-[1px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <img
                  src={walkwayService.image}
                  alt="Walkways and Driveways by Masonry Doctors"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div className="max-w-md">
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                      {lang === 'en' ? 'Walkways & Driveways' : 'Caminos y Entradas'}
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
                      {lang === 'en'
                        ? 'A front entrance that looks intentional, not an afterthought.'
                        : 'Una entrada principal pensada para destacar con máxima capacidad de carga.'}
                    </p>
                  </div>

                  <div className="w-10 h-10 border border-white/30 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:bg-[#8B291B] group-hover:border-[#8B291B] group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </StaggerItem>

          </div>

          {/* Middle Row: Three Tall 1/3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 3: Retaining Walls */}
            <StaggerItem direction="scale">
              <div
                onClick={() => onSelectService(wallService)}
                className="group relative h-72 sm:h-84 rounded-[1px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <img
                  src={wallService.image}
                  alt="Retaining walls in Aurora by Masonry Doctors"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-2xl text-white font-normal leading-tight">
                      {lang === 'en' ? 'Retaining Walls' : 'Muros de Contención'}
                    </h3>
                    <p className="text-stone-300 text-xs mt-1.5 leading-relaxed font-normal">
                      {lang === 'en'
                        ? 'Structural walls that hold the grade and earn their keep.'
                        : 'Muros estructurales que retienen desniveles y detienen la erosión.'}
                    </p>
                  </div>

                  <div className="w-9 h-9 border border-white/30 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:bg-[#8B291B] group-hover:border-[#8B291B] group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Card 4: Brick & Masonry Repair */}
            <StaggerItem direction="scale">
              <div
                onClick={() => onSelectService(repairService)}
                className="group relative h-72 sm:h-84 rounded-[1px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <img
                  src={repairService.image}
                  alt="Brick and masonry restoration in Fox Valley"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-2xl text-white font-normal leading-tight">
                      {lang === 'en' ? 'Brick & Masonry Repair' : 'Reparación de Ladrillo'}
                    </h3>
                    <p className="text-stone-300 text-xs mt-1.5 leading-relaxed font-normal">
                      {lang === 'en'
                        ? 'Repointing and rebuilds that match the original, not approximate it.'
                        : 'Junteo y reconstrucciones que igualan el mortero original a la perfección.'}
                    </p>
                  </div>

                  <div className="w-9 h-9 border border-white/30 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:bg-[#8B291B] group-hover:border-[#8B291B] group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Card 5: Outdoor Living Spaces */}
            <StaggerItem direction="scale">
              <div
                onClick={() => onSelectService(outdoorService)}
                className="group relative h-72 sm:h-84 rounded-[1px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <img
                  src={outdoorService.image}
                  alt="Custom outdoor kitchen with pergola and fire table"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-2xl text-white font-normal leading-tight">
                      {lang === 'en' ? 'Outdoor Living Spaces' : 'Espacios Exteriores'}
                    </h3>
                    <p className="text-stone-300 text-xs mt-1.5 leading-relaxed font-normal">
                      {lang === 'en'
                        ? 'Kitchens, fire features and pergolas built to be used nightly.'
                        : 'Cocinas de exterior, fogateros y pérgolas diseñados para disfrutarse a diario.'}
                    </p>
                  </div>

                  <div className="w-9 h-9 border border-white/30 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:bg-[#8B291B] group-hover:border-[#8B291B] group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </StaggerItem>

          </div>

          {/* Bottom Row: Panoramic Full-Width Card */}
          <StaggerItem direction="scale">
            <div
              onClick={() => onSelectService(poolService)}
              className="group relative h-56 sm:h-64 rounded-[1px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <img
                src={poolService.image}
                alt="Concrete work and inground fiberglass pools"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div className="max-w-xl">
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                    {lang === 'en' ? 'Concrete Work & Inground Pools' : 'Concreto y Albercas de Fibra de Vidrio'}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
                    {lang === 'en'
                      ? 'Solid poured pads, precision footings, and inground pools built for Illinois ground.'
                      : 'Bordes de alberca antideslizantes, cimientos estructurales y montaje completo.'}
                  </p>
                </div>

                <div className="w-10 h-10 border border-white/30 bg-black/30 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:bg-[#8B291B] group-hover:border-[#8B291B] group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { PROJECTS, VIDEO_TESTIMONIALS } from '../data/content';
import { ProjectItem, Language, VideoTestimonialItem } from '../types';
import { MapPin, Play, Star, Video } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from '../components/AnimatedReveal';
import { Seo } from '../components/Seo';

interface ProjectsViewProps {
  lang: Language;
  onSelectProject: (project: ProjectItem) => void;
  onOpenQuoteModal: (servicePrefill?: string) => void;
  onOpenClientVideoModal?: (video: VideoTestimonialItem) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  lang,
  onSelectProject,
  onOpenQuoteModal,
  onOpenClientVideoModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'pavers', label: 'Paver Patios & Driveways' },
    { id: 'retaining_walls', label: 'Retaining Walls' },
    { id: 'masonry_repair', label: 'Masonry & Tuckpointing' },
    { id: 'outdoor_living', label: 'Outdoor Living' },
    { id: 'pools_concrete', label: 'Pools & Concrete' },
  ];

  const cities = ['all', 'Aurora', 'Naperville', 'Oswego', 'Geneva', 'Batavia', 'St. Charles', 'Plainfield', 'Yorkville'];

  const filtered = PROJECTS.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchCity = selectedCity === 'all' || p.city.toLowerCase().includes(selectedCity.toLowerCase());
    return matchCat && matchCity;
  });

  return (
    <div className="bg-[#FAF8F5] text-stone-900 py-16 sm:py-24">
      <Seo
        title={lang === 'en' ? 'Hardscape & Masonry Projects Portfolio | Masonry Doctors Aurora, IL' : 'Portafolio de Obras | Masonry Doctors'}
        description={lang === 'en' ? 'Explore completed paver patios, retaining walls, brick repair, and outdoor kitchens in Aurora, Naperville, Oswego & Fox Valley.' : 'Vea nuestros proyectos terminados de adoquines, muros y mampostería en Aurora y Fox Valley.'}
        canonicalPath="/projects"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal className="max-w-3xl mb-12">
          <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
            {lang === 'en' ? 'PORTFOLIO' : 'PORTAFOLIO'}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal leading-tight">
            {lang === 'en' ? 'Finished Projects in Fox Valley' : 'Obras Terminadas en Fox Valley'}
          </h1>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Browse our completed patios, retaining walls, tuckpointing, and stone facing projects across Aurora, Naperville, Oswego, and surrounding western suburbs.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.1} className="bg-white p-5 rounded-[1px] border border-stone-200 shadow-2xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-[1px] ${
                  selectedCategory === c.id
                    ? 'bg-[#8B291B] text-white shadow-xs scale-105'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs w-full md:w-auto">
            <span className="font-bold text-stone-600 tracking-wider uppercase">City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-stone-50 border border-stone-300 rounded-[1px] px-3 py-1.5 font-medium text-stone-800 focus:outline-none focus:border-[#8B291B] cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'all' ? 'All Cities' : `${city}, IL`}
                </option>
              ))}
            </select>
          </div>
        </Reveal>

        {/* Gallery Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <StaggerItem key={project.id} direction="scale">
              <div
                onClick={() => onSelectProject(project)}
                className="bg-white rounded-[1px] border border-stone-200 overflow-hidden shadow-2xs hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 flex flex-col group cursor-pointer h-full"
              >
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <img
                    src={project.afterImage}
                    alt={`${project.title} in ${project.city}`}
                    loading="lazy"
                    style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 text-stone-900 text-[10px] font-bold tracking-widest px-3 py-1 rounded-[1px] uppercase shadow-xs">
                    {project.categoryLabel}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-stone-900 group-hover:text-[#8B291B] transition">
                      {lang === 'en' ? project.title : project.titleEs}
                    </h3>
                    <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {lang === 'en' ? project.description : project.descriptionEs}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-1 text-stone-800 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#8B291B]" />
                      <span>{project.city}</span>
                    </div>
                    <span className="font-semibold text-[#8B291B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Details ↗
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Client Video Interviews in Portfolio */}
        <div className="mt-20 pt-16 border-t border-stone-300">
          <Reveal direction="up">
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
                {lang === 'en' ? 'VERIFIED VIDEO REVIEWS' : 'RESEÑAS EN VIDEO'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal leading-tight">
                {lang === 'en' ? 'Hear How These Projects Were Built' : 'Escucha Cómo se Construyeron Estas Obras'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                {lang === 'en'
                  ? 'Watch verified homeowners discuss their retaining wall, pool surround, and stone facing projects.'
                  : 'Mira a los propietarios de Fox Valley hablar sobre sus muros de contención, albercas y enchapados.'}
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
                  <div className="relative sm:w-5/12 aspect-[9/13] sm:aspect-auto sm:min-h-[250px] bg-black overflow-hidden shrink-0">
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
                        {video.location} · {lang === 'en' ? 'Verified Homeowner' : 'Cliente Verificado'}
                      </p>

                      <p className="text-xs text-stone-300 italic line-clamp-3">
                        “{lang === 'en' ? video.keyQuote : video.keyQuoteEs}”
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800 mt-3 flex items-center justify-between text-xs text-[#E38475] font-semibold">
                      <span>{lang === 'en' ? 'Watch project story' : 'Ver historia'}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
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

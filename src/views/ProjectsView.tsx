import React, { useState } from 'react';
import { PROJECTS } from '../data/content';
import { ProjectItem, Language } from '../types';
import { MapPin, ArrowRight } from 'lucide-react';

interface ProjectsViewProps {
  lang: Language;
  onSelectProject: (project: ProjectItem) => void;
  onOpenQuoteModal: (servicePrefill?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  lang,
  onSelectProject,
  onOpenQuoteModal,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
            {lang === 'en' ? 'PORTFOLIO' : 'PORTAFOLIO'}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal leading-tight">
            {lang === 'en' ? 'Finished Projects in Fox Valley' : 'Obras Terminadas en Fox Valley'}
          </h1>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Browse our completed patios, retaining walls, tuckpointing, and stone facing projects across Aurora, Naperville, Oswego, and surrounding western suburbs.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-5 rounded-[1px] border border-stone-200 shadow-2xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase transition cursor-pointer rounded-[1px] ${
                  selectedCategory === c.id
                    ? 'bg-[#8B291B] text-white shadow-2xs'
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
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-white rounded-[1px] border border-stone-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                  src={project.afterImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
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
                  <p className="mt-2 text-xs text-stone-600 line-clamp-2">
                    {lang === 'en' ? project.description : project.descriptionEs}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1 text-stone-800 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#8B291B]" />
                    <span>{project.city}</span>
                  </div>
                  <span className="font-semibold text-[#8B291B] flex items-center gap-1">
                    Details ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

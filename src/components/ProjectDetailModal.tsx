import React from 'react';
import { X, MapPin, Layers, Clock, Award, Calendar } from 'lucide-react';
import { ProjectItem, Language } from '../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  lang: Language;
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  lang,
  onOpenQuoteModal,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#1C2126] border border-stone-700 max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden my-6 text-white animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#B93826] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {lang === 'en' ? project.categoryLabel : project.categoryLabelEs}
              </span>
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E0533C]" />
                <span>{project.city}</span>
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1">
              {lang === 'en' ? project.title : project.titleEs}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 rounded-lg bg-stone-800"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Images (Before & After) */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                {lang === 'en' ? 'After Completion' : 'Resultado Final'}
              </span>
              <div className="h-56 sm:h-64 rounded-xl overflow-hidden border border-stone-700">
                <img
                  src={project.afterImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {project.beforeImage && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                  {lang === 'en' ? 'Before Starting' : 'Antes de Iniciar'}
                </span>
                <div className="h-56 sm:h-64 rounded-xl overflow-hidden border border-stone-700">
                  <img
                    src={project.beforeImage}
                    alt={`Before transformation for ${project.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Description & Scope */}
          <div className="bg-[#14171A] p-4 rounded-xl border border-stone-800 space-y-3">
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {lang === 'en' ? project.description : project.descriptionEs}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-stone-800 text-xs">
              <div className="flex items-center gap-1.5 text-stone-300">
                <Layers className="w-4 h-4 text-stone-500 shrink-0" />
                <span>
                  <strong className="text-white">Materials:</strong> {project.materialsUsed}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                <span>
                  <strong className="text-white">Timeline:</strong> {project.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-stone-400">
              Want a similar installation for your home in {project.city} or nearby?
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal(`Project: ${project.title} in ${project.city}`);
              }}
              className="w-full sm:w-auto bg-[#B93826] hover:bg-[#A32F1F] text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Get Quote for Similar Project</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

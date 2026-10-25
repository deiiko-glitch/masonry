import React from 'react';
import { ShieldCheck, Award, Users, FileText, Compass, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const items = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C74835]" strokeWidth={1.5} />,
      title: lang === 'en' ? 'Licensed & Insured' : 'Con Licencia y Asegurados',
      description: lang === 'en'
        ? "Illinois licensed and fully insured, with a certificate of insurance provided before work begins."
        : "Con licencia en Illinois y seguro completo de responsabilidad y compensación laboral.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#C74835]" strokeWidth={1.5} />,
      title: lang === 'en' ? 'Written Warranty' : 'Garantía por Escrito',
      description: lang === 'en'
        ? "Every hardscape installation carries a written workmanship warranty — in writing, on paper, up front."
        : "Cada obra cuenta con garantía por escrito en mano de obra y asentamiento de adoquines.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#C74835]" strokeWidth={1.5} />,
      title: lang === 'en' ? 'Our Own Crew' : 'Nuestro Propio Equipo',
      description: lang === 'en'
        ? "Rolando's own crew builds your project. No subcontractors rotating through your yard."
        : "El propio equipo de Rolando construye su obra. Jamás subcontratamos personal desconocido.",
    },
    {
      icon: <FileText className="w-6 h-6 text-[#C74835]" strokeWidth={1.5} />,
      title: lang === 'en' ? 'Clear Written Estimates' : 'Presupuestos Claros',
      description: lang === 'en'
        ? "Line-by-line scope, materials and pricing. You know what you're paying for before we start."
        : "Desglose línea por línea de materiales, excavación y costos. Sin cargos ocultos.",
    },
    {
      icon: <Compass className="w-6 h-6 text-[#C74835]" strokeWidth={1.5} />,
      title: lang === 'en' ? 'Design Help Included' : 'Diseño Incluido',
      description: lang === 'en'
        ? "Layout, materials and proportions worked through with you — included in the estimate."
        : "Asesoría en distribución, patrones y muestras de piedra natural y adoquines en su propiedad.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#C74835]" strokeWidth={1.5} />,
      title: lang === 'en' ? 'Clean Job Sites' : 'Sitios de Obra Limpios',
      description: lang === 'en'
        ? "Materials staged neatly, swept daily, and a full cleanup before the final walkthrough."
        : "Materiales organizados, barrido diario y limpieza integral al terminar la obra.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#16191B] text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-[11px] font-bold tracking-[0.24em] text-[#C74835] uppercase block mb-2">
            {lang === 'en' ? 'WHY HOMEOWNERS HIRE US' : 'POR QUÉ NOS ELIGEN'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-[1.12] tracking-tight">
            {lang === 'en' ? 'Craftsmanship over shortcuts.' : 'Artesanía sin atajos.'}
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
            {lang === 'en'
              ? 'Six promises we put in writing on every job.'
              : 'Seis compromisos que ponemos por escrito en cada obra.'}
          </p>
        </div>

        {/* 6 Icon Blocks Grid matching reference-section5.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {items.map((item, idx) => (
            <div key={idx} className="space-y-3">
              <div className="mb-4">
                {item.icon}
              </div>
              <h3 className="font-serif text-2xl text-white font-normal">
                {item.title}
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

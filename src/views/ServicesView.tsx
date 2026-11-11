import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/content';
import { Language, ServiceItem } from '../types';
import { ArrowRight, Check } from 'lucide-react';
import { PricingFinancing } from '../components/PricingFinancing';
import { Reveal, ImageReveal } from '../components/AnimatedReveal';
import { Seo } from '../components/Seo';

interface ServicesViewProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  lang,
  onSelectService,
  onOpenQuoteModal,
}) => {
  return (
    <div className="bg-[#FAF8F5] text-stone-900 py-16 sm:py-24">
      <Seo
        title={lang === 'en' ? 'Hardscape & Masonry Services in Aurora & Fox Valley | Masonry Doctors' : 'Servicios de Adoquines y Mampostería | Masonry Doctors'}
        description={lang === 'en' ? 'Paver patios, retaining walls, brick repair, tuckpointing, stone facing and outdoor living spaces in Aurora, Naperville, Oswego & Fox Valley.' : 'Patios de adoquín, muros de contención y restauración de ladrillos en Aurora y Fox Valley.'}
        canonicalPath="/services"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <Reveal direction="up">
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
              {lang === 'en' ? 'OUR CRAFT & SERVICES' : 'NUESTROS SERVICIOS'}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal leading-tight">
              {lang === 'en' ? 'Hardscape & Masonry Services' : 'Servicios de Adoquines y Mampostería'}
            </h1>
            <p className="mt-4 text-base text-stone-600 leading-relaxed font-normal">
              {lang === 'en'
                ? 'Serving Aurora, IL and the Fox Valley area with engineered paver patios, retaining walls, historic brick restoration, stone veneer, and outdoor living sanctuaries.'
                : 'Especialistas en patios de adoquín, muros de contención, restauración de ladrillos y espacios exteriores en Fox Valley.'}
            </p>
          </div>
        </Reveal>

        {/* Services List / Cards */}
        <div className="space-y-12 mb-16">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} direction="up" delay={index * 0.1}>
              <div
                id={service.id}
                className={`bg-white rounded-[1px] border border-stone-200 overflow-hidden shadow-2xs hover:shadow-lg transition duration-300 flex flex-col scroll-mt-24 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[420px] overflow-hidden group">
                  <ImageReveal
                    src={service.image}
                    alt={service.title}
                    style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 bg-stone-900/90 text-white text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase rounded-[1px] shadow-sm">
                    {lang === 'en' ? 'FREE ON-SITE ESTIMATE' : 'COTIZACIÓN GRATIS EN OBRA'}
                  </div>
                </div>

                <div className="lg:w-1/2 p-7 sm:p-10 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#8B291B] uppercase block">
                      SERVICE 0{index + 1}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal mt-1 mb-3">
                      {lang === 'en' ? service.title : service.titleEs}
                    </h2>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {lang === 'en' ? service.fullDescription : service.fullDescriptionEs}
                    </p>

                    <h4 className="text-[10px] font-bold tracking-[0.16em] text-stone-900 uppercase mb-3">
                      Key Craftsmanship Standards:
                    </h4>
                    <ul className="space-y-2">
                      {(lang === 'en' ? service.features : service.featuresEs).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-[#8B291B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/services/${service.slug}`}
                      onClick={() => onSelectService(service)}
                      className="bg-[#181B1D] hover:bg-stone-800 text-white font-bold text-xs tracking-wider uppercase px-5 py-3 rounded-[1px] transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Service Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => onOpenQuoteModal(service.title)}
                      className="bg-[#8B291B] hover:bg-[#732216] text-white font-bold text-xs tracking-wider uppercase px-5 py-3 rounded-[1px] transition cursor-pointer"
                    >
                      Request Free Quote
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pricing & Estimation Details */}
        <div className="mt-8 border-t border-stone-200/80 pt-8">
          <PricingFinancing
            lang={lang}
            onOpenQuoteModal={onOpenQuoteModal}
          />
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { ServiceItem, Language } from '../types';
import { ArrowLeft, CheckCircle2, Phone, Calendar, ShieldCheck, Clock, Layers, DollarSign } from 'lucide-react';
import { BUSINESS_INFO, PRIMARY_SERVICE_CITIES } from '../data/content';

interface ServiceDetailViewProps {
  service: ServiceItem;
  lang: Language;
  onBack: () => void;
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  service,
  lang,
  onBack,
  onOpenQuoteModal,
}) => {
  return (
    <div className="bg-[#F8F7F4] text-[#1E2328] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-[#B93826] mb-8 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'en' ? 'Back to All Services' : 'Volver a Todos los Servicios'}</span>
        </button>

        {/* Hero Section of Service */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm mb-12">
          <div className="relative h-72 sm:h-96 w-full">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white max-w-3xl">
              <span className="bg-[#B93826] text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                Fox Valley Hardscape & Masonry
              </span>
              <h1 className="text-3xl sm:text-5xl font-black mt-2">
                {lang === 'en' ? service.title : service.titleEs}
              </h1>
              <p className="text-stone-300 text-sm sm:text-base mt-2">
                {lang === 'en' ? service.shortBenefit : service.shortBenefitEs}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-stone-900 mb-3">
                  {lang === 'en' ? 'Overview & Engineering Standards' : 'Resumen y Estándares Técnicos'}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {lang === 'en' ? service.fullDescription : service.fullDescriptionEs}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-3">
                  {lang === 'en' ? 'What Makes Our Installation Endure:' : 'Por Qué Nuestras Obras Perduran:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(lang === 'en' ? service.features : service.featuresEs).map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-stone-800 font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-base callout */}
              <div className="bg-[#1C2126] text-white p-6 rounded-2xl border border-stone-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E0533C] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>The Illinois Freeze-Thaw Ground Rule</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  Why Cheap Installations Fail in 2 Winters
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Northern Illinois freeze-thaw cycles heave poorly prepped ground by up to 2 inches. While cut-rate contractors dig only 4 inches and lay sand directly on soil, Masonry Doctors excavates 8 to 12 inches, lays heavy non-woven geotextile soil fabric, and mechanically compacts CA-6 crushed limestone in 2-inch lifts. That is why our paver patios remain completely flat for decades.
                </p>
              </div>
            </div>

            {/* Right Action Sidebar */}
            <div className="lg:col-span-4 bg-[#F8F7F4] p-6 rounded-2xl border border-stone-200 space-y-5 h-fit">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Typical Pricing:
                </span>
                <span className="text-2xl font-black text-stone-900 block mt-1">
                  {service.priceRange}
                </span>
                <span className="text-xs text-stone-500 mt-0.5 block">
                  Typical timeline: {service.typicalTimeline}
                </span>
              </div>

              <div className="border-t border-stone-200 pt-4 space-y-3">
                <button
                  onClick={() => onOpenQuoteModal(service.title)}
                  className="w-full bg-[#B93826] hover:bg-[#A32F1F] text-white font-bold py-3.5 px-4 rounded-xl shadow transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Free Written Quote</span>
                </button>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="w-full bg-white hover:bg-stone-100 text-stone-800 font-bold py-3 px-4 rounded-xl border border-stone-300 transition flex items-center justify-center gap-2 text-sm shadow-2xs"
                >
                  <Phone className="w-4 h-4 text-[#B93826]" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
              </div>

              <div className="border-t border-stone-200 pt-4 text-xs text-stone-600 space-y-1.5">
                <p>✓ 5-Year Craftsmanship Warranty</p>
                <p>✓ Free On-Site Inspection & Laser Levels</p>
                <p>✓ Unilock & Belgard Lifetime Product Warranties</p>
                <p>✓ No Subcontractors Guarantee</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

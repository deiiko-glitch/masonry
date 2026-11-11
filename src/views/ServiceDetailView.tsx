import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ServiceItem, Language, VideoTestimonialItem } from '../types';
import { ArrowLeft, CheckCircle2, Phone, Calendar, ShieldCheck, Play, Star, Video } from 'lucide-react';
import { SERVICES, BUSINESS_INFO, VIDEO_TESTIMONIALS } from '../data/content';
import { Reveal, ImageReveal } from '../components/AnimatedReveal';
import { Seo } from '../components/Seo';
import { trackTelClick } from '../utils/analytics';
import { NotFoundView } from './NotFoundView';

interface ServiceDetailViewProps {
  service?: ServiceItem;
  lang: Language;
  onBack?: () => void;
  onOpenQuoteModal: (serviceName?: string) => void;
  onOpenClientVideoModal?: (video: VideoTestimonialItem) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  service: propService,
  lang,
  onBack,
  onOpenQuoteModal,
  onOpenClientVideoModal,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const service = propService || SERVICES.find((s) => s.slug === slug) || SERVICES[0];

  const relatedVideo = 
    service?.slug === 'concrete-pools'
      ? VIDEO_TESTIMONIALS.find((v) => v.id === 'video-george')
      : service?.slug === 'retaining-walls' || service?.slug === 'stone-veneer'
      ? VIDEO_TESTIMONIALS.find((v) => v.id === 'video-bob-rath')
      : null;

  if (!service && slug) {
    return <NotFoundView lang={lang} />;
  }

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="bg-[#F8F7F4] text-[#1E2328] py-10 sm:py-16">
      <Seo
        title={`${lang === 'en' ? service.title : service.titleEs} | Masonry Doctors Aurora, IL`}
        description={lang === 'en' ? service.shortBenefit : service.shortBenefitEs}
        canonicalPath={`/services/${service.slug}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Reveal direction="down">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-[#8B291B] mb-8 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'en' ? 'Back to All Services' : 'Volver a Todos los Servicios'}</span>
          </button>
        </Reveal>

        {/* Hero Section of Service */}
        <Reveal direction="up">
          <div className="bg-white rounded-[1px] border border-stone-200 overflow-hidden shadow-sm mb-12">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              <ImageReveal
                src={service.image}
                alt={service.title}
                style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white max-w-3xl">
                <span className="bg-[#8B291B] text-white text-xs font-bold px-3 py-1 rounded-[1px] uppercase tracking-wider">
                  Fox Valley Hardscape & Masonry
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-normal mt-2">
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

                {/* Related Client Video Interview if applicable */}
                {relatedVideo && (
                  <div
                    onClick={() => onOpenClientVideoModal && onOpenClientVideoModal(relatedVideo)}
                    className="group bg-[#14171A] text-white p-5 rounded-2xl border border-stone-800 shadow-md hover:shadow-xl transition cursor-pointer flex flex-col sm:flex-row items-center gap-4"
                  >
                    <div className="relative w-28 sm:w-32 aspect-[9/12] rounded-xl overflow-hidden bg-black shrink-0">
                      <img
                        src={relatedVideo.posterSrc}
                        alt={relatedVideo.clientName}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-[#8B291B] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                          <Play className="w-5 h-5 ml-0.5 fill-white" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-1.5 text-left">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#E38475] uppercase tracking-wider">
                        <Video className="w-3 h-3" />
                        <span>{lang === 'en' ? 'Verified Client Video Review' : 'Reseña en Video Verificada'}</span>
                      </div>
                      <h4 className="font-serif text-lg text-white font-medium">
                        {relatedVideo.clientName} · {relatedVideo.location}
                      </h4>
                      <p className="text-xs text-stone-300 italic line-clamp-2">
                        “{lang === 'en' ? relatedVideo.keyQuote : relatedVideo.keyQuoteEs}”
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-[#E38475] font-bold pt-1 group-hover:text-white transition">
                        <span>{lang === 'en' ? 'Watch Video Interview' : 'Ver Video de la Obra'}</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Action Sidebar */}
              <div className="lg:col-span-4 bg-[#F8F7F4] p-6 rounded-2xl border border-stone-200 space-y-5 h-fit">
                <div>
                  <span className="text-[11px] font-bold text-[#8B291B] uppercase tracking-wider block">
                    {lang === 'en' ? 'ESTIMATE & INSPECTION' : 'PRESUPUESTO E INSPECCIÓN'}
                  </span>
                  <span className="font-serif text-2xl font-normal text-stone-900 block mt-1">
                    {lang === 'en' ? 'Free Written Quote' : 'Cotización Escrita Gratis'}
                  </span>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    {lang === 'en'
                      ? 'No guesswork. We inspect your property, verify ground slopes and laser measurements, and give you an itemized written quote with no obligation.'
                      : 'Sin costos imprecisos. Visitamos su propiedad, evaluamos medidas exactas y desniveles, y le entregamos un presupuesto detallado por escrito sin compromiso.'}
                  </p>
                  <div className="mt-3 pt-3 border-t border-stone-200 text-xs text-stone-600">
                    <span className="font-bold text-stone-900">{lang === 'en' ? 'Typical Project Duration:' : 'Duración Típica de Obra:'}</span>{' '}
                    <span>{service.typicalTimeline}</span>
                  </div>
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
                    onClick={() => trackTelClick(BUSINESS_INFO.phone)}
                    className="w-full bg-white hover:bg-stone-100 text-stone-800 font-bold py-3 px-4 rounded-xl border border-stone-300 transition flex items-center justify-center gap-2 text-sm shadow-2xs"
                  >
                    <Phone className="w-4 h-4 text-[#B93826]" />
                    <span>Call {BUSINESS_INFO.phone}</span>
                  </a>
                </div>

                <div className="border-t border-stone-200 pt-4 text-xs text-stone-600 space-y-1.5">
                  <p>✓ Craftsmanship Installation Guarantee</p>
                  <p>✓ Free On-Site Inspection & Laser Levels</p>
                  <p>✓ Unilock & Belgard Lifetime Product Warranties</p>
                  <p>✓ No Subcontractors Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};

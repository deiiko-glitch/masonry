import React from 'react';
import { BUSINESS_INFO } from '../data/content';
import { Language } from '../types';
import { Phone, Calendar, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from './AnimatedReveal';

interface PricingFinancingProps {
  lang: Language;
  onOpenQuoteModal: (details?: string) => void;
}

export const PricingFinancing: React.FC<PricingFinancingProps> = ({
  lang,
  onOpenQuoteModal,
}) => {
  const steps = [
    {
      num: '01',
      title: lang === 'en' ? 'Laser Level & Site Inspection' : 'Nivelación Láser e Inspección',
      desc:
        lang === 'en'
          ? 'Rolando visits your yard to check soil grade, water runoff slope, existing roots, and machine clearance. We never quote blindly.'
          : 'Rolando visita su patio para evaluar desniveles, drenaje de lluvia, raíces y acceso para maquinaria. Jamás presupuestamos a ciegas.',
    },
    {
      num: '02',
      title: lang === 'en' ? 'Material & Paver Samples' : 'Muestras Reales de Materiales',
      desc:
        lang === 'en'
          ? 'Browse authentic Unilock, Belgard, bluestone, and clay brick catalogs with physical color and texture samples in your own yard lighting.'
          : 'Vea catálogos y muestras físicas de adoquines Unilock, Belgard y piedra natural bajo la luz real de su jardín.',
    },
    {
      num: '03',
      title: lang === 'en' ? 'Itemized Written Estimate' : 'Cotización Detallada por Escrito',
      desc:
        lang === 'en'
          ? 'You receive a fixed, line-by-line written proposal covering excavation depth (8"–10"), crushed stone base, geotextile fabric, and joint sand.'
          : 'Recibe una propuesta desglosada y fija que especifica excavación profunda (8"–10"), base compactada, membrana geotextil y arena.',
    },
    {
      num: '04',
      title: lang === 'en' ? '5-Year Written Guarantee' : 'Garantía Escrita de 5 Años',
      desc:
        lang === 'en'
          ? 'Every installation includes our 5-year structural warranty against sinking or separation, plus lifetime manufacturer warranties on pavers.'
          : 'Toda obra incluye garantía estructural de 5 años contra hundimientos y garantía de por vida del fabricante de adoquines.',
    },
  ];

  return (
    <section id="pricing-section" className="py-16 sm:py-24 bg-[#FAF8F5] text-stone-900 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal direction="up">
          <div className="max-w-3xl mb-14">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
              {lang === 'en' ? 'CUSTOM ESTIMATES · NO GUESSWORK' : 'PRESUPUESTOS A MEDIDA · SIN SUPOSICIONES'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal leading-[1.12] tracking-tight">
              {lang === 'en'
                ? 'Why we quote on site, never with blind guesses.'
                : 'Por qué cotizamos en obra y no con precios inventados.'}
            </h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              {lang === 'en'
                ? 'Every yard across Aurora and the Fox Valley has different ground slopes, soil drainage, and machine access. We inspect your property in person so your written estimate is 100% accurate, fixed, and guaranteed — with zero surprise extras.'
                : 'Cada propiedad en Aurora y Fox Valley tiene desniveles de terreno, drenajes y accesos distintos. Evaluamos su jardín en persona para entregarle un presupuesto exacto, cerrado y por escrito, sin sorpresas ni sobrecostos.'}
            </p>
          </div>
        </Reveal>

        {/* 4 Steps to Honest Pricing */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" staggerDelay={0.08}>
          {steps.map((step, idx) => (
            <StaggerItem key={idx} direction="up">
              <div className="bg-white p-7 rounded-[1px] border border-stone-200/90 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between h-full">
                <div>
                  <span className="font-serif text-3xl text-[#8B291B] font-normal block mb-3">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-xl text-stone-900 font-normal mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Dark Feature Banner: Free Consultation & Financing */}
        <Reveal direction="up" delay={0.1}>
          <div className="bg-[#181B1D] text-white p-8 sm:p-12 rounded-[1px] border border-stone-800 shadow-xl mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C74835] uppercase block">
                  {lang === 'en' ? 'NO-OBLIGATION CONSULTATION' : 'CONSULTA SIN COMPROMISO'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {lang === 'en'
                    ? 'Get your free written proposal from Rolando.'
                    : 'Obtenga su presupuesto por escrito con Rolando.'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
                  {lang === 'en'
                    ? 'We visit within 24–48 hours, bring material catalogs, measure your yard, and email you an itemized written quote. No sales pressure, no third-party salespeople.'
                    : 'Le visitamos en 24 a 48 horas, llevamos catálogos de materiales, medimos su patio y le enviamos una cotización desglosada. Trato directo con los dueños.'}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-stone-400">
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-[#C74835]" />
                    <span>{lang === 'en' ? 'Zero travel fee within 30 miles' : 'Sin costo de visita (30 millas)'}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'en' ? '5-Year Craftsmanship Warranty' : 'Garantía de 5 Años'}</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="w-full bg-[#8B291B] hover:bg-[#732216] active:scale-[0.99] text-white font-bold text-xs tracking-[0.16em] uppercase py-4 px-6 rounded-[1px] transition text-center cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{lang === 'en' ? 'REQUEST FREE ESTIMATE' : 'SOLICITAR COTIZACIÓN'}</span>
                </button>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="w-full border border-stone-700 hover:border-stone-400 text-stone-200 hover:text-white font-bold text-xs tracking-[0.16em] uppercase py-3.5 px-6 rounded-[1px] transition text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C74835]" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Financing and Seasonal Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-[1px] border border-stone-200">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#8B291B] uppercase block mb-1">
              {lang === 'en' ? 'FLEXIBLE FINANCING' : 'FINANCIAMIENTO FLEXIBLE'}
            </span>
            <h4 className="font-serif text-xl text-stone-900 font-normal mb-2">
              {lang === 'en' ? '0% Interest for 12 Months Available' : 'Promociones de 0% de Interés Disponibles'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'en'
                ? 'We partner with trusted home improvement financing lenders offering 0% promotional APR for 12 months for qualified applicants, as well as affordable monthly options up to 84 months.'
                : 'Trabajamos con financieras especializadas en mejoras del hogar que ofrecen promociones de hasta 12 meses sin intereses para clientes calificados y planes de pago cómodos.'}
            </p>
          </div>

          <div className="bg-white p-7 rounded-[1px] border border-stone-200">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#8B291B] uppercase block mb-1">
              {lang === 'en' ? 'SEASONAL SCHEDULING' : 'TEMPORADA DE CONSTRUCCIÓN'}
            </span>
            <h4 className="font-serif text-xl text-stone-900 font-normal mb-2">
              {lang === 'en' ? 'April Through November Build Season' : 'Temporada Activa: Abril a Noviembre'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'en'
                ? 'Illinois freeze-thaw ground requires building after frost thaws. Early spring and summer dates fill quickly. Booking during late winter ensures preferred project start dates.'
                : 'El suelo de Illinois requiere esperar al deshielo para una compactación óptima. Reservar con anticipación a finales de invierno o inicio de primavera asegura su fecha preferida.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

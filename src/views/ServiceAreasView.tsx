import React, { useState } from 'react';
import { SERVICE_AREAS_LIST, BUSINESS_INFO } from '../data/content';
import { Language, ServiceAreaCity } from '../types';
import { MapPin, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ServiceAreasViewProps {
  lang: Language;
  onOpenQuoteModal: (city?: string) => void;
}

export const ServiceAreasView: React.FC<ServiceAreasViewProps> = ({
  lang,
  onOpenQuoteModal,
}) => {
  const [selectedCity, setSelectedCity] = useState<ServiceAreaCity>(SERVICE_AREAS_LIST[0]);

  // Construct dynamic embed URL for the selected city
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    selectedCity.name + ', IL'
  )}&t=&z=12&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-[#FAF8F5] text-stone-900 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block">
              {lang === 'en' ? 'SERVICE AREAS' : 'ÁREAS DE SERVICIO'}
            </span>
            <span className="text-[10px] bg-stone-200 text-stone-800 font-bold px-2 py-0.5 rounded-[1px] tracking-wider uppercase">
              {lang === 'en' ? 'FOX VALLEY & WESTERN SUBURBS' : 'FOX VALLEY Y SUBURBIOS OESTE'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-stone-900 font-normal leading-[1.08] tracking-tight">
            {lang === 'en' ? 'Cities We Proudly Serve.' : 'Ciudades Donde Construimos.'}
          </h1>

          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            {lang === 'en'
              ? 'Based in Aurora, we dispatch our own equipment and crew across Kane, DuPage, Kendall, and Will counties with zero travel fees and same-week on-site estimates.'
              : 'Con base en Aurora, trasladamos nuestra propia maquinaria y equipo a través de los condados de Kane, DuPage, Kendall y Will sin costos adicionales de traslado y con cotizaciones la misma semana.'}
          </p>
        </div>

        {/* Interactive Google Map & City Selector Section */}
        <div className="bg-white border border-stone-200 rounded-[1px] p-6 sm:p-8 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: City Selection & Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase">
                  {lang === 'en' ? 'CHOOSE YOUR CITY' : 'SELECCIONA TU CIUDAD'}
                </span>
                <span className="text-xs text-stone-400">
                  {SERVICE_AREAS_LIST.length} {lang === 'en' ? 'Cities Covered' : 'Ciudades'}
                </span>
              </div>

              {/* City quick buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICE_AREAS_LIST.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => setSelectedCity(city)}
                    className={`p-2.5 text-left border rounded-[1px] transition text-xs font-semibold cursor-pointer ${
                      selectedCity.name === city.name
                        ? 'bg-[#8B291B] text-white border-[#8B291B] shadow-sm'
                        : 'bg-stone-50 text-stone-800 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>

              {/* Selected City Details Card */}
              <div className="bg-[#FAF8F5] p-5 rounded-[1px] border border-stone-200 space-y-3 mt-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#8B291B]" />
                    <h3 className="font-serif text-xl text-stone-900 font-normal">
                      {selectedCity.name}, IL
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-[1px]">
                    {selectedCity.responseTime} {lang === 'en' ? 'response' : 'respuesta'}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-stone-700">
                  <p>
                    <strong className="text-stone-900">{lang === 'en' ? 'County:' : 'Condado:'}</strong>{' '}
                    {selectedCity.county}
                  </p>
                  <p>
                    <strong className="text-stone-900">Zip Codes:</strong> {selectedCity.zipCodes}
                  </p>
                  <p>
                    <strong className="text-stone-900">{lang === 'en' ? 'Popular Projects:' : 'Proyectos Populares:'}</strong>{' '}
                    {lang === 'en' ? selectedCity.popularProjects : selectedCity.popularProjectsEs}
                  </p>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed italic pt-1">
                  {lang === 'en' ? selectedCity.description : selectedCity.descriptionEs}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => onOpenQuoteModal(selectedCity.name)}
                    className="flex-1 bg-[#8B291B] hover:bg-[#732216] text-white text-[10px] font-bold tracking-[0.16em] uppercase py-3 px-4 rounded-[1px] transition text-center cursor-pointer shadow-xs"
                  >
                    {lang === 'en' ? `QUOTE IN ${selectedCity.name.toUpperCase()}` : `COTIZAR EN ${selectedCity.name.toUpperCase()}`}
                  </button>

                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="border border-stone-300 hover:border-stone-800 text-stone-800 text-[10px] font-bold tracking-[0.16em] uppercase py-3 px-4 rounded-[1px] transition text-center"
                  >
                    CALL
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Embedded Interactive Google Map */}
            <div className="lg:col-span-7 bg-stone-900 rounded-[1px] border border-stone-300 overflow-hidden shadow-sm flex flex-col">
              
              {/* Map Titlebar */}
              <div className="p-4 bg-[#14171A] text-white flex items-center justify-between text-xs border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C74835]" />
                  <span className="font-semibold tracking-wide">
                    {selectedCity.name}, IL • Fox Valley Service Radius
                  </span>
                </div>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="text-[#E0533C] font-bold hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
              </div>

              {/* Map Iframe */}
              <div className="h-80 sm:h-96 w-full bg-stone-100 relative">
                <iframe
                  title={`Masonry Doctors Google Map - ${selectedCity.name}, IL`}
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Map Footer Info */}
              <div className="p-3 bg-stone-900 text-stone-400 text-[11px] flex flex-wrap items-center justify-between gap-2 border-t border-stone-800">
                <span>✓ {lang === 'en' ? 'Zero travel fee within 30-mile radius' : 'Sin costo de viáticos dentro de 30 millas'}</span>
                <span className="text-stone-300 font-medium">{BUSINESS_INFO.address}</span>
              </div>

            </div>

          </div>
        </div>

        {/* 3 Guarantees Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 text-xs">
          <div className="flex items-center gap-3 bg-white p-4 rounded-[1px] border border-stone-200">
            <ShieldCheck className="w-5 h-5 text-[#8B291B] shrink-0" />
            <div>
              <p className="font-bold text-stone-900">{lang === 'en' ? 'Zero Travel Surcharges' : 'Sin Recargo por Distancia'}</p>
              <p className="text-stone-500 mt-0.5">{lang === 'en' ? 'Guaranteed transparent itemized quotes' : 'Cotizaciones transparentes garantizadas'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-[1px] border border-stone-200">
            <CheckCircle2 className="w-5 h-5 text-[#8B291B] shrink-0" />
            <div>
              <p className="font-bold text-stone-900">{lang === 'en' ? 'Local Permit Pulling' : 'Tramitación de Permisos'}</p>
              <p className="text-stone-500 mt-0.5">{lang === 'en' ? 'Coordination with city hall & inspectors' : 'Coordinación con alcaldías e inspectores'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-[1px] border border-stone-200">
            <MapPin className="w-5 h-5 text-[#8B291B] shrink-0" />
            <div>
              <p className="font-bold text-stone-900">{lang === 'en' ? 'Fast On-Site Estimates' : 'Estimaciones en Obra Rápidas'}</p>
              <p className="text-stone-500 mt-0.5">{lang === 'en' ? 'Rolando visits in 24–48 hours' : 'Rolando visita en 24 a 48 horas'}</p>
            </div>
          </div>
        </div>

        {/* All City Directory Cards Grid */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl text-stone-900 font-normal mb-6">
            {lang === 'en' ? 'All Fox Valley Municipalities We Cover' : 'Todas las Ciudades de Fox Valley que Cubrimos'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_AREAS_LIST.map((city) => (
              <div
                key={city.name}
                className="bg-white rounded-[1px] p-6 border border-stone-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2.5">
                    <h3 className="font-serif text-xl font-normal text-stone-900">{city.name}, IL</h3>
                    <span className="text-[10px] bg-stone-100 text-stone-700 font-bold px-2 py-0.5 rounded-[1px]">
                      {city.responseTime}
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5 text-stone-600 mb-3">
                    <p>
                      <strong className="text-stone-800">{lang === 'en' ? 'County:' : 'Condado:'}</strong> {city.county}
                    </p>
                    <p>
                      <strong className="text-stone-800">Zip Codes:</strong> {city.zipCodes}
                    </p>
                    <p>
                      <strong className="text-stone-800">{lang === 'en' ? 'Popular Work:' : 'Trabajo Común:'}</strong>{' '}
                      {lang === 'en' ? city.popularProjects : city.popularProjectsEs}
                    </p>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed italic">
                    {lang === 'en' ? city.description : city.descriptionEs}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100">
                  <button
                    onClick={() => onOpenQuoteModal(city.name)}
                    className="w-full bg-[#FAF8F5] hover:bg-[#8B291B] hover:text-white text-stone-800 font-bold text-[10px] tracking-[0.16em] uppercase py-3 rounded-[1px] transition text-center cursor-pointer border border-stone-200 hover:border-transparent"
                  >
                    {lang === 'en' ? `REQUEST QUOTE IN ${city.name.toUpperCase()}` : `SOLICITAR COTIZACIÓN EN ${city.name.toUpperCase()}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permit & HOA Assistance Note */}
        <div className="bg-[#14171A] text-white rounded-[1px] p-8 sm:p-10 border border-stone-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#C74835] uppercase block">
                {lang === 'en' ? 'PERMIT & HOA SUPPORT' : 'SOPORTE DE PERMISOS Y HOA'}
              </span>
              <h3 className="font-serif text-2xl text-white font-normal">
                {lang === 'en'
                  ? 'Permit & HOA Assistance in Kane, DuPage, Kendall & Will'
                  : 'Asistencia con Permisos y HOA en Kane, DuPage, Kendall y Will'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {lang === 'en'
                  ? 'Many municipalities require engineering permits for retaining walls over 2-3 feet and hardscape setbacks. Masonry Doctors marks up your plat of survey, handles town permit applications, and schedules municipal code inspections on your behalf.'
                  : 'Muchas municipalidades exigen permisos para muros de contención y distancias mínimas a linderos. Masonry Doctors prepara su plano de catastro, tramita las solicitudes ante la alcaldía y coordina las inspecciones oficiales.'}
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="bg-[#8B291B] hover:bg-[#732216] text-white font-bold text-xs tracking-widest uppercase py-3.5 px-4 rounded-[1px] text-center shadow transition"
              >
                CALL: {BUSINESS_INFO.phone}
              </a>
              <button
                onClick={() => onOpenQuoteModal()}
                className="bg-transparent hover:bg-stone-800 text-stone-200 font-bold text-xs tracking-widest uppercase py-3.5 px-4 rounded-[1px] text-center border border-stone-700 transition cursor-pointer"
              >
                {lang === 'en' ? 'REQUEST FREE CONSULTATION' : 'SOLICITAR CONSULTA GRATIS'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

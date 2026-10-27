import React, { useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { SERVICE_AREAS_LIST, BUSINESS_INFO } from '../data/content';
import { Language, ServiceAreaCity } from '../types';
import { Reveal } from './AnimatedReveal';

interface ServiceAreasSectionProps {
  lang: Language;
  onOpenQuoteModal: (cityName?: string) => void;
}

export const ServiceAreasSection: React.FC<ServiceAreasSectionProps> = ({
  lang,
  onOpenQuoteModal,
}) => {
  const [selectedCity, setSelectedCity] = useState<ServiceAreaCity>(SERVICE_AREAS_LIST[0]);

  return (
    <section id="service-areas-section" className="py-12 sm:py-16 bg-[#F0ECE1] text-stone-900 border-b border-stone-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal direction="up">
          <div className="mb-8 sm:mb-10">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
              {lang === 'en' ? 'WHERE WE WORK' : 'DÓNDE TRABAJAMOS'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal leading-[1.12] tracking-tight">
              {lang === 'en' ? 'Serving Aurora and the Fox Valley.' : 'Sirviendo a Aurora y Fox Valley.'}
            </h2>
            <p className="mt-3 text-stone-700 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              {lang === 'en'
                ? 'Proudly serving homeowners in Aurora, Naperville, Oswego, Plainfield, Geneva, Batavia, St. Charles, Elgin, Joliet and nearby.'
                : 'Orgullosamente sirviendo a propietarios en Aurora, Naperville, Oswego, Plainfield, Geneva, Batavia, St. Charles, Elgin, Joliet y alrededores.'}
            </p>
          </div>
        </Reveal>

        {/* Cities Grid & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* City Chips */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-[10px] font-bold tracking-[0.16em] text-stone-500 uppercase">
              SELECT YOUR CITY:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SERVICE_AREAS_LIST.map((city) => (
                <button
                  key={city.name}
                  onClick={() => setSelectedCity(city)}
                  className={`p-3 text-left border rounded-[1px] transition text-xs font-semibold cursor-pointer ${
                    selectedCity.name === city.name
                      ? 'bg-[#8B291B] text-white border-[#8B291B] shadow-sm'
                      : 'bg-white text-stone-800 border-stone-300/80 hover:border-stone-500'
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>

            <div className="bg-white p-6 rounded-[1px] border border-stone-300/80 shadow-2xs space-y-3 mt-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <h4 className="font-serif text-xl text-stone-900 font-normal">
                  {selectedCity.name}, IL
                </h4>
                <span className="text-[10px] font-bold tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[1px] border border-emerald-200">
                  {selectedCity.responseTime} response
                </span>
              </div>

              <div className="text-xs space-y-1.5 text-stone-600">
                <p><strong className="text-stone-800">County:</strong> {selectedCity.county}</p>
                <p><strong className="text-stone-800">Permits:</strong> Full municipal permit pulling & inspection coordination</p>
                <p><strong className="text-stone-800">Common Projects:</strong> {lang === 'en' ? selectedCity.popularProjects : selectedCity.popularProjectsEs}</p>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed italic pt-1">
                {lang === 'en' ? selectedCity.description : selectedCity.descriptionEs}
              </p>

              <button
                onClick={() => onOpenQuoteModal(selectedCity.name)}
                className="w-full mt-2 bg-[#8B291B] hover:bg-[#732216] text-white text-[10px] font-bold tracking-[0.16em] uppercase py-3 transition rounded-[1px] cursor-pointer"
              >
                REQUEST QUOTE IN {selectedCity.name.toUpperCase()}
              </button>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="lg:col-span-7 bg-white rounded-[1px] border border-stone-300/80 overflow-hidden shadow-2xs">
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between text-xs">
              <span className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C74835]" />
                <span>Fox Valley Coverage Radius (Zero Travel Fee)</span>
              </span>
              <a href={BUSINESS_INFO.phoneHref} className="text-[#C74835] font-bold hover:underline">
                {BUSINESS_INFO.phone}
              </a>
            </div>

            <div className="h-64 sm:h-76 w-full bg-stone-100">
              <iframe
                title="Masonry Doctors Aurora IL Service Area Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.44026365457!2d-88.42398453472064!3d41.76991191244222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880efac6eb4237d7%3A0xe1043a53233b8a36!2sAurora%2C%20IL!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

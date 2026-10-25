import React, { useState } from 'react';
import { TYPICAL_PRICE_RANGES, BUSINESS_INFO } from '../data/content';
import { Language } from '../types';
import { calculateProjectEstimate, EstimateParams } from '../utils/estimator';
import { Calculator, ArrowRight, Percent, Calendar } from 'lucide-react';

interface PricingFinancingProps {
  lang: Language;
  onOpenQuoteModal: (details?: string) => void;
}

export const PricingFinancing: React.FC<PricingFinancingProps> = ({
  lang,
  onOpenQuoteModal,
}) => {
  const [calcParams, setCalcParams] = useState<EstimateParams>({
    serviceType: 'paver_patio',
    squareFootage: 400,
    materialTier: 'standard',
    sitePrepLevel: 'easy',
  });

  const calcResult = calculateProjectEstimate(calcParams);

  return (
    <section id="pricing-section" className="py-24 bg-[#FAF8F5] text-stone-900 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference */}
        <div className="mb-14">
          <span className="text-[11px] font-bold tracking-[0.24em] text-[#8B291B] uppercase block mb-2">
            {lang === 'en' ? 'PRICING & FINANCING' : 'PRECIOS Y FINANCIAMIENTO'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal leading-[1.12] tracking-tight">
            {lang === 'en' ? 'Honest ranges, before anyone visits.' : 'Rangos transparentes, antes de cualquier visita.'}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            {lang === 'en'
              ? 'Every yard is different, but you deserve clear ballpark pricing up front. Below are realistic installation ranges across the Fox Valley.'
              : 'Cada patio es diferente, pero merece claridad en los costos desde el inicio.'}
          </p>
        </div>

        {/* 4 Typical Project Range Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TYPICAL_PRICE_RANGES.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-[1px] border border-stone-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold tracking-[0.18em] text-[#8B291B] uppercase block">
                  {lang === 'en' ? 'TYPICAL RANGE' : 'RANGO TÍPICO'}
                </span>
                <h3 className="font-serif text-xl text-stone-900 font-normal mt-1 mb-3">
                  {lang === 'en' ? item.service : item.serviceEs}
                </h3>

                <div className="py-3 px-3.5 bg-stone-50 border border-stone-200/70 mb-4 rounded-[1px]">
                  <span className="text-[11px] text-stone-500 block uppercase tracking-wider">Per Square Foot</span>
                  <span className="text-2xl font-serif text-stone-900 font-normal">{item.range}</span>
                </div>

                <div className="text-xs text-stone-600 space-y-2">
                  <p>
                    <strong className="text-stone-800">Sample Project:</strong>{' '}
                    {lang === 'en' ? item.sampleProject : item.sampleProjectEs}
                  </p>
                  <p>
                    <strong className="text-stone-800">Typical Total:</strong>{' '}
                    <span className="font-semibold text-stone-900">{item.typicalCost}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => onOpenQuoteModal(item.service)}
                className="mt-6 w-full border border-stone-300 hover:border-stone-900 hover:bg-stone-900 hover:text-white text-stone-800 text-[10px] font-bold tracking-[0.16em] uppercase py-3 transition text-center cursor-pointer rounded-[1px]"
              >
                {lang === 'en' ? 'QUOTE THIS SERVICE' : 'COTIZAR SERVICIO'}
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Instant Cost Estimator Tool */}
        <div className="bg-[#181B1D] text-white p-7 sm:p-10 rounded-[1px] border border-stone-800 shadow-xl mb-14">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#C74835] uppercase block mb-1">
              INSTANT ESTIMATOR TOOL
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              {lang === 'en' ? 'Calculate your project range' : 'Calcule el rango de su proyecto'}
            </h3>
            <p className="text-xs text-stone-400 mt-1.5">
              Select project size and material grade for an instant estimated budget.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Controls */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.16em] text-stone-400 uppercase mb-2">
                  Project Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'paver_patio', label: 'Paver Patio' },
                    { id: 'walkway_driveway', label: 'Walkway/Drive' },
                    { id: 'retaining_wall', label: 'Retaining Wall' },
                    { id: 'brick_repair', label: 'Brick Repair' },
                    { id: 'outdoor_living', label: 'Outdoor Living' },
                    { id: 'concrete_pool', label: 'Pool Coping' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setCalcParams({ ...calcParams, serviceType: s.id as any })}
                      className={`px-3 py-2 text-xs font-semibold rounded-[1px] border transition cursor-pointer ${
                        calcParams.serviceType === s.id
                          ? 'bg-[#8B291B] text-white border-[#8B291B]'
                          : 'bg-stone-900 text-stone-300 border-stone-700 hover:bg-stone-800'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  <span>Square Footage</span>
                  <span className="font-serif text-lg text-[#C74835]">{calcParams.squareFootage} sq. ft.</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1200"
                  step="50"
                  value={calcParams.squareFootage}
                  onChange={(e) => setCalcParams({ ...calcParams, squareFootage: Number(e.target.value) })}
                  className="w-full accent-[#8B291B] cursor-pointer h-1.5 bg-stone-700 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.16em] text-stone-400 uppercase mb-2">
                  Material Grade
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', name: 'Standard Paver', desc: 'Durable concrete' },
                    { id: 'premium', name: 'Unilock / Belgard', desc: 'Fade-resistant' },
                    { id: 'luxury', name: 'Natural Bluestone', desc: 'Premium stone' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setCalcParams({ ...calcParams, materialTier: tier.id as any })}
                      className={`p-2.5 rounded-[1px] text-left border transition cursor-pointer ${
                        calcParams.materialTier === tier.id
                          ? 'bg-[#8B291B] text-white border-[#8B291B]'
                          : 'bg-stone-900 text-stone-300 border-stone-700 hover:bg-stone-800'
                      }`}
                    >
                      <p className="text-xs font-bold">{tier.name}</p>
                      <p className="text-[10px] text-stone-400">{tier.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-5 bg-[#1F2326] p-6 rounded-[1px] border border-stone-700 space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase block">
                ESTIMATED RANGE
              </span>
              <div className="border-b border-stone-700 pb-4">
                <span className="font-serif text-3xl sm:text-4xl text-white block">
                  ${calcResult.minCost.toLocaleString()} – ${calcResult.maxCost.toLocaleString()}
                </span>
                <span className="text-xs text-stone-400 mt-1 block">
                  Includes full excavation, deep stone base, geotextile fabric & joint sand.
                </span>
              </div>

              <div className="text-xs text-stone-300 space-y-1.5">
                <p>• Recommended Base: <strong>{calcResult.recommendedBaseDepthInches}" Compacted Crushed Stone</strong></p>
                <p>• Estimated Timeline: <strong>{calcResult.durationDays}</strong></p>
                <p>• Warranty: <strong className="text-emerald-400">5-Year Written Guarantee</strong></p>
              </div>

              <button
                onClick={() => onOpenQuoteModal(`Estimator: ${calcParams.squareFootage} sqft ${calcParams.serviceType}`)}
                className="w-full bg-[#8B291B] hover:bg-[#732216] text-white text-xs font-bold tracking-[0.16em] uppercase py-3.5 px-4 rounded-[1px] transition cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>LOCK IN THIS ESTIMATE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Financing and Seasonal Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-[1px] border border-stone-200">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#8B291B] uppercase block mb-1">
              FLEXIBLE FINANCING
            </span>
            <h4 className="font-serif text-xl text-stone-900 font-normal mb-2">
              0% Interest for 12 Months Available
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We partner with trusted home improvement lenders offering 0% promotional APR for 12 months for qualified applicants, as well as affordable monthly options up to 84 months.
            </p>
          </div>

          <div className="bg-white p-7 rounded-[1px] border border-stone-200">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#8B291B] uppercase block mb-1">
              SEASONAL SCHEDULING
            </span>
            <h4 className="font-serif text-xl text-stone-900 font-normal mb-2">
              April Through November Build Season
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Illinois freeze-thaw ground requires building after frost thaws. Early spring and summer dates fill quickly. Booking during late winter ensures preferred project start dates.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

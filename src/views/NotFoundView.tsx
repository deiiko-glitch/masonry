import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowLeft, Home } from 'lucide-react';
import { Seo } from '../components/Seo';
import { BUSINESS_INFO } from '../data/content';
import { trackTelClick } from '../utils/analytics';
import { Language } from '../types';

interface NotFoundViewProps {
  lang: Language;
}

export function NotFoundView({ lang }: NotFoundViewProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-stone-50">
      <Seo
        title={lang === 'en' ? 'Page Not Found (404) | Masonry Doctors' : 'Página No Encontrada (404) | Masonry Doctors'}
        description={lang === 'en' ? 'The page you requested could not be found. Contact Masonry Doctors in Aurora, IL for masonry and hardscape services.' : 'La página solicitada no existe. Contacte a Masonry Doctors en Aurora, IL.'}
      />
      <div className="max-w-lg w-full text-center bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-100 text-[#B93826] mb-4">
          Error 404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-4 font-normal">
          {lang === 'en' ? 'Page Not Found' : 'Página No Encontrada'}
        </h1>
        <p className="text-stone-600 mb-8 leading-relaxed">
          {lang === 'en'
            ? 'The page you are looking for may have been moved, deleted, or does not exist. Please return to the homepage or call us directly.'
            : 'La página que busca pudo haber cambiado de nombre o no estar disponible. Puede regresar al inicio o llamarnos directamente.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#B93826] text-white font-medium hover:bg-[#a22f20] transition-colors"
          >
            <Home className="w-4 h-4" />
            {lang === 'en' ? 'Return to Home' : 'Volver al Inicio'}
          </Link>
          <a
            href={BUSINESS_INFO.phoneHref}
            onClick={() => trackTelClick(BUSINESS_INFO.phone)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-stone-300 text-stone-800 font-medium hover:bg-stone-50 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#B93826]" />
            {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

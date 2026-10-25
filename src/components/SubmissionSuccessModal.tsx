import React from 'react';
import { CheckCircle, Mail, Phone, Calendar, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language, QuoteFormData } from '../types';

interface SubmissionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  submittedData: QuoteFormData | null;
  photosCount: number;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  isOpen,
  onClose,
  lang,
  submittedData,
  photosCount,
}) => {
  if (!isOpen || !submittedData) return null;

  const quoteId = `MD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#1C2126] border border-stone-700 max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden my-6 text-white animate-in zoom-in-95">
        
        {/* Header with success badge */}
        <div className="bg-emerald-950/70 border-b border-emerald-800/80 p-6 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                {lang === 'en' ? 'Request Successfully Transmitted' : 'Solicitud Enviada con Éxito'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'en' ? 'Thank You, ' : 'Gracias, '}
                {submittedData.fullName}!
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Ref ID: <strong className="text-white">#{quoteId}</strong> • Sent to{' '}
                <span className="text-emerald-400 font-medium">masondoctors@gmail.com</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-lg bg-stone-800 transition"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-sm">
          
          {/* Automatic customer email confirmation preview */}
          <div className="bg-[#14171A] p-4 rounded-xl border border-stone-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-2">
              <span className="flex items-center gap-1.5 font-bold text-stone-200">
                <Mail className="w-4 h-4 text-[#E0533C]" />
                <span>Automatic Confirmation Dispatched to Homeowner</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono">
                Delivered to {submittedData.email}
              </span>
            </div>

            <div className="text-xs text-stone-300 space-y-1.5 pt-1">
              <p>
                <strong>From:</strong> Masonry Doctors &lt;{BUSINESS_INFO.email}&gt;
              </p>
              <p>
                <strong>Subject:</strong> Your Quote Request Confirmation — Masonry Doctors #{quoteId}
              </p>
              <div className="bg-stone-900 p-3 rounded-lg border border-stone-800 text-stone-300 mt-2 space-y-1">
                <p className="font-semibold text-white">
                  "Dear {submittedData.fullName}, thank you for contacting Masonry Doctors! Rolando has received your project request for {submittedData.service} in {submittedData.city}, IL."
                </p>
                <p className="text-stone-400">
                  • Contact Phone: {submittedData.phone}
                </p>
                <p className="text-stone-400">
                  • Timeline: {submittedData.timeline || 'Within 2-4 weeks'}
                </p>
                {photosCount > 0 && (
                  <p className="text-stone-400">
                    • Attached Photos: {photosCount} image(s) uploaded
                  </p>
                )}
                {submittedData.message && (
                  <p className="text-stone-400">
                    • Notes: "{submittedData.message}"
                  </p>
                )}
                <p className="text-emerald-400 font-medium pt-1">
                  Rolando will review your specifications and contact you within 24 hours with written estimate details.
                </p>
              </div>
            </div>
          </div>

          {/* Need immediate assistance callout */}
          <div className="bg-[#21262B] p-4 rounded-xl border border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-xs font-bold text-white">
                {lang === 'en' ? 'Need an estimate sooner?' : '¿Necesita atención urgente?'}
              </p>
              <p className="text-xs text-stone-400">
                {lang === 'en' ? 'Call Rolando directly on his job-site phone.' : 'Llame directamente al teléfono de Rolando.'}
              </p>
            </div>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="bg-[#B93826] hover:bg-[#A32F1F] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0 shadow"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-stone-800 hover:bg-stone-700 text-white font-bold py-3 rounded-xl transition text-center"
          >
            {lang === 'en' ? 'Done & Return to Site' : 'Listo y Volver al Sitio'}
          </button>
        </div>

      </div>
    </div>
  );
};

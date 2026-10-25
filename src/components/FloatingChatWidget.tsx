import React, { useState } from 'react';
import { MessageSquare, X, Send, Phone, Camera, Check } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language } from '../types';

interface FloatingChatWidgetProps {
  lang: Language;
  onOpenQuoteModal: (service?: string) => void;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  lang,
  onOpenQuoteModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const defaultPrompts = [
    lang === 'en' ? 'Get a quick quote on a paver patio' : 'Cotización rápida de patio de adoquín',
    lang === 'en' ? 'Need tuckpointing or masonry repair' : 'Necesito reparación o junteo de ladrillo',
    lang === 'en' ? 'Estimate for a retaining wall' : 'Presupuesto para muro de contención',
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMsg.trim()) return;
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setIsOpen(false);
      onOpenQuoteModal(quickMsg);
      setQuickMsg('');
    }, 1200);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 text-stone-800">
          {/* Header */}
          <div className="bg-[#191D21] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center font-bold text-[#E0533C]">
                  R
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#191D21]"></div>
              </div>
              <div>
                <h4 className="font-bold text-sm">Rolando • Masonry Doctors</h4>
                <p className="text-xs text-stone-400">
                  {lang === 'en' ? 'Owner & Master Craftsman • Online' : 'Propietario • En línea'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1 rounded-lg"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-stone-50 space-y-3 max-h-72 overflow-y-auto text-sm">
            <div className="bg-white p-3 rounded-xl rounded-tl-none border border-stone-200 shadow-sm text-stone-700">
              <p className="font-medium text-stone-900 mb-1">
                {lang === 'en'
                  ? 'Hello! Thanks for checking out Masonry Doctors.'
                  : '¡Hola! Gracias por visitar Masonry Doctors.'}
              </p>
              <p className="text-xs text-stone-600">
                {lang === 'en'
                  ? 'Serving Aurora, Naperville, and the Fox Valley. Have photos of your yard or questions about a paver patio or repair?'
                  : 'Atendemos Aurora, Naperville y Fox Valley. ¿Tiene fotos de su patio o preguntas sobre adoquines?'}
              </p>
            </div>

            {/* Quick Option Pills */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                {lang === 'en' ? 'Quick Topics:' : 'Temas rápidos:'}
              </p>
              {defaultPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsOpen(false);
                    onOpenQuoteModal(prompt);
                  }}
                  className="w-full text-left text-xs bg-white hover:bg-stone-100 text-stone-700 px-3 py-2 rounded-lg border border-stone-200 shadow-2xs font-medium transition flex items-center justify-between group"
                >
                  <span>{prompt}</span>
                  <span className="text-stone-400 group-hover:text-[#B93826]">→</span>
                </button>
              ))}
            </div>

            {/* Direct Phone action */}
            <div className="bg-stone-100 p-2.5 rounded-lg border border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-600 font-medium">
                {lang === 'en' ? 'Prefer speaking now?' : '¿Prefiere hablar ahora?'}
              </span>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="text-xs font-bold text-[#B93826] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex gap-2">
            <input
              type="text"
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              placeholder={lang === 'en' ? 'Type a question or city...' : 'Escriba su consulta o ciudad...'}
              className="flex-1 text-xs px-3 py-2 bg-stone-100 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#B93826]"
            />
            <button
              type="submit"
              disabled={!quickMsg.trim()}
              className="bg-[#B93826] hover:bg-[#A32F1F] disabled:opacity-50 text-white p-2 rounded-lg transition"
              aria-label="Send message"
            >
              {sentSuccess ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#B93826] hover:bg-[#A32F1F] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition group cursor-pointer border-2 border-white/20"
        aria-label="Open instant message with Rolando"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#B93826]"></span>
        </div>
        <span className="hidden sm:inline font-bold text-xs tracking-wide">
          {lang === 'en' ? 'Text / Quote Help' : 'Mensaje / Cotizar'}
        </span>
      </button>
    </div>
  );
};

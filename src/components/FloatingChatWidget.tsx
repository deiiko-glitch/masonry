import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Language } from '../types';

interface FloatingChatWidgetProps {
  lang: Language;
  onOpenQuoteModal: (service?: string) => void;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  lang,
  onOpenQuoteModal,
}) => {
  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 sm:right-6 z-40">
      {/* Floating Trigger Button that directly opens the Quote Modal */}
      <button
        onClick={() => onOpenQuoteModal()}
        className="flex items-center gap-2.5 bg-[#B93826] hover:bg-[#9d2b1b] text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group cursor-pointer border-2 border-white/20"
        aria-label="Request a free quote"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#B93826]"></span>
        </div>
        <span className="font-bold text-xs sm:text-sm tracking-wide">
          {lang === 'en' ? 'Get a Free Quote' : 'Cotización Gratis'}
        </span>
      </button>
    </div>
  );
};

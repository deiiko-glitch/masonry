import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../types';

interface ScrollToTopProps {
  lang: Language;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ lang }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label={lang === 'en' ? 'Scroll to top' : 'Volver arriba'}
      title={lang === 'en' ? 'Back to top' : 'Volver arriba'}
      className="fixed bottom-36 md:bottom-24 right-5 sm:right-6 z-40 p-2.5 sm:p-3 bg-[#14171A]/95 hover:bg-[#8B291B] text-stone-200 hover:text-white border border-stone-700/80 hover:border-[#8B291B] rounded-[2px] shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer group flex items-center justify-center backdrop-blur-sm"
    >
      <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};

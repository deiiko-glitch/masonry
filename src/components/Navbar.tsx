import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language, PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenQuoteModal: (servicePrefill?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  lang,
  setLang,
  onOpenQuoteModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    services: lang === 'en' ? 'SERVICES' : 'SERVICIOS',
    projects: lang === 'en' ? 'PROJECTS' : 'PROYECTOS',
    about: lang === 'en' ? 'ABOUT' : 'NOSOTROS',
    serviceAreas: lang === 'en' ? 'SERVICE AREAS' : 'ÁREAS',
    contact: lang === 'en' ? 'CONTACT' : 'CONTACTO',
    getFreeQuote: lang === 'en' ? 'GET A FREE QUOTE' : 'COTIZAR GRATIS',
    paverPatios: lang === 'en' ? 'Paver Patios' : 'Patios de Adoquín',
    walkways: lang === 'en' ? 'Walkways & Driveways' : 'Caminos y Entradas',
    retainingWalls: lang === 'en' ? 'Retaining Walls' : 'Muros de Contención',
    brickRepair: lang === 'en' ? 'Brick & Masonry Repair' : 'Reparación de Ladrillo',
    outdoorLiving: lang === 'en' ? 'Outdoor Living & Fire Features' : 'Espacios Exteriores y Fuego',
    concretePools: lang === 'en' ? 'Concrete & Inground Pools' : 'Concreto y Albercas',
    allServices: lang === 'en' ? 'All Services Overview →' : 'Ver Todos los Servicios →',
  };

  const navLinks: { label: string; page: PageView }[] = [
    { label: t.projects, page: 'projects' },
    { label: t.about, page: 'about' },
    { label: t.serviceAreas, page: 'service-areas' },
    { label: t.contact, page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#14171A]/95 backdrop-blur-md text-white border-b border-stone-800/80 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Official Brand Logo - Prominent, Large & Seamless without white box */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group cursor-pointer focus:outline-none py-1.5 transition-transform duration-200 hover:scale-[1.03]"
            aria-label="The Masonry Doctors"
          >
            <img
              src="/assets/aistudio/logo_dark_header.png"
              alt="The Masonry Doctors Logo"
              className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            />
            {/* Visually hidden for screen readers / SEO */}
            <span className="sr-only">The Masonry Doctors</span>
          </button>

          {/* Center Navigation Links in spaced uppercase typography */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-semibold tracking-[0.16em]">
            
            {/* Services with dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`group relative flex items-center gap-1 transition uppercase py-2 cursor-pointer ${
                  currentPage === 'services' || currentPage === 'service-detail'
                    ? 'text-[#E0533C] font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>{t.services}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#C74835] transition-all duration-300 transform origin-left ${
                    currentPage === 'services' || currentPage === 'service-detail'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70'
                  }`}
                />
              </button>

              {servicesDropdownOpen && (
                <div
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-64 rounded-[1px] bg-[#1C2024]/98 backdrop-blur-md border border-stone-700 shadow-2xl py-2 z-50 animate-in fade-in duration-200"
                >
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-[#E0533C] hover:bg-stone-800 transition uppercase tracking-wider"
                  >
                    {t.allServices}
                  </button>
                  <div className="border-t border-stone-700/60 my-1"></div>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-stone-800 hover:text-white transition"
                  >
                    {t.paverPatios}
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-stone-800 hover:text-white transition"
                  >
                    {t.walkways}
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-stone-800 hover:text-white transition"
                  >
                    {t.retainingWalls}
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-stone-800 hover:text-white transition"
                  >
                    {t.brickRepair}
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-stone-800 hover:text-white transition"
                  >
                    {t.outdoorLiving}
                  </button>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-stone-800 hover:text-white transition"
                  >
                    {t.concretePools}
                  </button>
                </div>
              )}
            </div>

            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`group relative uppercase py-2 transition-colors duration-200 cursor-pointer ${
                  currentPage === item.page
                    ? 'text-[#E0533C] font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#C74835] transition-all duration-300 transform origin-left ${
                    currentPage === item.page
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70'
                  }`}
                />
              </button>
            ))}

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 text-[10px] tracking-wider text-stone-400 hover:text-white border border-stone-700/80 px-2 py-1 rounded-[1px] transition"
              title="Switch language"
            >
              <Globe className="w-3 h-3 text-[#B93826]" />
              <span>{lang === 'en' ? 'ESPAÑOL' : 'ENGLISH'}</span>
            </button>
          </nav>

          {/* Right Phone and CTA Button */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="flex items-center gap-2 text-xs font-semibold text-stone-200 hover:text-white tracking-wide transition"
              aria-label={`Call ${BUSINESS_INFO.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#B93826]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="bg-[#8B291B] hover:bg-[#732216] active:scale-[0.98] text-white text-[11px] font-bold tracking-[0.14em] uppercase px-5 py-3 rounded-[1px] transition cursor-pointer shadow-sm"
            >
              {t.getFreeQuote}
            </button>
          </div>

          {/* Mobile Right */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="flex items-center gap-1.5 text-xs text-stone-200 font-bold bg-stone-800/80 px-3 py-2 rounded-xs border border-stone-700"
            >
              <Phone className="w-3.5 h-3.5 text-[#B93826]" />
              <span className="hidden sm:inline">{BUSINESS_INFO.phone}</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white focus:outline-none"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#16191B] border-t border-stone-800 px-6 py-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-stone-800">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center"
              aria-label="The Masonry Doctors"
            >
              <img
                src="/assets/aistudio/logo_dark_header.png"
                alt="The Masonry Doctors"
                className="h-14 w-auto object-contain"
              />
            </button>
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 text-[11px] text-stone-300 font-semibold border border-stone-700 px-2 py-1"
            >
              <Globe className="w-3 h-3 text-[#B93826]" />
              <span>{lang === 'en' ? 'ESPAÑOL' : 'ENGLISH'}</span>
            </button>
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left font-serif text-lg text-stone-200 hover:text-white py-1"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="block w-full text-left font-serif text-lg text-stone-200 hover:text-white py-1"
          >
            Services
          </button>
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className="block w-full text-left font-serif text-lg text-stone-200 hover:text-white py-1"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-4 border-t border-stone-800 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full bg-[#8B291B] hover:bg-[#732216] text-white font-bold py-3 text-xs tracking-widest uppercase rounded-[1px]"
            >
              {t.getFreeQuote}
            </button>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="w-full border border-stone-700 text-stone-200 text-center font-bold py-3 text-xs tracking-widest uppercase block"
            >
              Call: {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      )}

      {/* Dynamic Scroll Reading Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-stone-800/60 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#8B291B] via-[#C74835] to-[#E0533C] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};

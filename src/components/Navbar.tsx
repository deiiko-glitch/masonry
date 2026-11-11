import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/content';
import { Language, ServiceItem } from '../types';
import { trackTelClick } from '../utils/analytics';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenQuoteModal: (servicePrefill?: string) => void;
  onSelectService?: (service: ServiceItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  onOpenQuoteModal,
  onSelectService,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const t = {
    services: lang === 'en' ? 'SERVICES' : 'SERVICIOS',
    projects: lang === 'en' ? 'PROJECTS' : 'PROYECTOS',
    about: lang === 'en' ? 'ABOUT' : 'NOSOTROS',
    serviceAreas: lang === 'en' ? 'SERVICE AREAS' : 'ÁREAS',
    contact: lang === 'en' ? 'CONTACT' : 'CONTACTO',
    getFreeQuote: lang === 'en' ? 'GET A FREE QUOTE' : 'COTIZAR GRATIS',
    allServices: lang === 'en' ? 'All Services Overview →' : 'Ver Todos los Servicios →',
  };

  const navLinks = [
    { label: t.projects, path: '/projects' },
    { label: t.about, path: '/about' },
    { label: t.serviceAreas, path: '/service-areas' },
    { label: t.contact, path: '/contact' },
  ];

  const isServicesActive = location.pathname.startsWith('/services');

  const handleServiceClick = (srv: ServiceItem) => {
    if (onSelectService) {
      onSelectService(srv);
    }
    navigate(`/services/${srv.slug}`);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#14171A]/95 backdrop-blur-md text-white border-b border-stone-800/80 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center group cursor-pointer focus:outline-none py-1.5 transition-transform duration-200 hover:scale-[1.03]"
            aria-label="The Masonry Doctors"
          >
            <img
              src="/assets/aistudio/logo_dark_header.png"
              alt="The Masonry Doctors Logo"
              className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            />
            <span className="sr-only">The Masonry Doctors</span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-semibold tracking-[0.16em]">
            
            {/* Services with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                to="/services"
                className={`group relative flex items-center gap-1 transition uppercase py-2 cursor-pointer ${
                  isServicesActive ? 'text-[#E0533C] font-bold' : 'text-stone-300 hover:text-white'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>{t.services}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#C74835] transition-all duration-300 transform origin-left ${
                    isServicesActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70'
                  }`}
                />
              </Link>

              {servicesDropdownOpen && (
                <div
                  className="absolute left-0 mt-1 w-72 rounded-[1px] bg-[#1C2024]/98 backdrop-blur-md border border-stone-700 shadow-2xl py-2 z-50 animate-in fade-in duration-200"
                >
                  <Link
                    to="/services"
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-[#E0533C] hover:bg-stone-800 transition uppercase tracking-wider flex items-center justify-between cursor-pointer"
                  >
                    <span>{t.allServices}</span>
                  </Link>
                  <div className="border-t border-stone-700/60 my-1"></div>
                  {SERVICES.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => handleServiceClick(srv)}
                      className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-stone-800 hover:text-white transition flex items-center justify-between group cursor-pointer"
                    >
                      <span>{lang === 'en' ? srv.title : srv.titleEs}</span>
                      <span className="text-[10px] text-stone-500 group-hover:text-[#E0533C] transition-colors">→</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative uppercase py-2 transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-[#E0533C] font-bold' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#C74835] transition-all duration-300 transform origin-left ${
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70'
                    }`}
                  />
                </Link>
              );
            })}

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 text-[10px] tracking-wider text-stone-400 hover:text-white border border-stone-700/80 px-2 py-1 rounded-[1px] transition cursor-pointer"
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
              onClick={() => trackTelClick(BUSINESS_INFO.phone)}
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
              onClick={() => trackTelClick(BUSINESS_INFO.phone)}
              className="flex items-center gap-1.5 text-xs text-stone-200 font-bold bg-stone-800/80 px-3 py-2 rounded-xs border border-stone-700"
            >
              <Phone className="w-3.5 h-3.5 text-[#B93826]" />
              <span className="hidden sm:inline">{BUSINESS_INFO.phone}</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white focus:outline-none cursor-pointer"
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
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
              aria-label="The Masonry Doctors"
            >
              <img
                src="/assets/aistudio/logo_dark_header.png"
                alt="The Masonry Doctors"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 text-[11px] text-stone-300 font-semibold border border-stone-700 px-2 py-1 cursor-pointer"
            >
              <Globe className="w-3 h-3 text-[#B93826]" />
              <span>{lang === 'en' ? 'ESPAÑOL' : 'ENGLISH'}</span>
            </button>
          </div>

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left font-serif text-lg text-stone-200 hover:text-white py-1"
          >
            Home
          </Link>

          {/* Mobile Services Accordion */}
          <div>
            <div className="flex items-center justify-between w-full py-1">
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-lg text-stone-200 hover:text-white"
              >
                {t.services}
              </Link>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="p-1 text-stone-400 hover:text-white cursor-pointer"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {mobileServicesOpen && (
              <div className="pl-4 py-2 space-y-2 border-l border-stone-800 mt-1">
                {SERVICES.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => handleServiceClick(srv)}
                    className="block w-full text-left text-sm text-stone-300 hover:text-[#E0533C] py-1 cursor-pointer"
                  >
                    {lang === 'en' ? srv.title : srv.titleEs}
                  </button>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-serif text-lg text-stone-200 hover:text-white py-1"
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-stone-800 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full bg-[#8B291B] text-white font-bold text-xs tracking-widest uppercase py-3.5 rounded-[1px] cursor-pointer"
            >
              {t.getFreeQuote}
            </button>
            <a
              href={BUSINESS_INFO.phoneHref}
              onClick={() => trackTelClick(BUSINESS_INFO.phone)}
              className="flex items-center justify-center gap-2 text-stone-300 text-sm font-semibold py-2"
            >
              <Phone className="w-4 h-4 text-[#B93826]" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

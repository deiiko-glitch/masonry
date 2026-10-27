import React, { useState } from 'react';
import { Phone, Mail, Clock, Globe } from 'lucide-react';
import { BUSINESS_INFO, PRIMARY_SERVICE_CITIES } from '../data/content';
import { Language, PageView } from '../types';

interface FooterProps {
  lang: Language;
  setLang: (lang: Language) => void;
  setCurrentPage: (page: PageView) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  setLang,
  setCurrentPage,
  onOpenQuoteModal,
}) => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101315] text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center cursor-pointer focus:outline-none"
              aria-label="The Masonry Doctors"
            >
              <img
                src="/assets/aistudio/logo_dark_header.png"
                alt="The Masonry Doctors"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </button>

            <p className="text-stone-400 leading-relaxed font-normal">
              Paver patios, walkways, retaining walls and masonry restoration for homeowners across Aurora and the western suburbs. Built by Rolando and his own crew.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold tracking-wider text-stone-400">
              <button
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className="flex items-center gap-1 border border-stone-700 px-2.5 py-1 text-stone-300 hover:text-white"
              >
                <Globe className="w-3 h-3 text-[#8B291B]" />
                <span>{lang === 'en' ? 'ESPAÑOL' : 'ENGLISH'}</span>
              </button>
            </div>
          </div>

          {/* Explore Column */}
          <div className="space-y-3">
            <p className="font-bold text-[11px] tracking-[0.18em] text-white uppercase">
              Explore
            </p>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-white transition">
                  Projects
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-areas')} className="hover:text-white transition">
                  Service Areas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <p className="font-bold text-[11px] tracking-[0.18em] text-white uppercase">
              Services
            </p>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition text-left">
                  Paver Patios, Walkways & Driveways
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition text-left">
                  Retaining Walls
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition text-left">
                  Brick & Masonry Repair & Restoration
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition text-left">
                  Outdoor Living Spaces
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition text-left">
                  Concrete Work & Inground Fiberglass Pools
                </button>
              </li>
            </ul>
          </div>

          {/* Get in touch Column */}
          <div className="space-y-3">
            <p className="font-bold text-[11px] tracking-[0.18em] text-white uppercase">
              Get in touch
            </p>
            <div className="space-y-2 text-stone-300">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="block text-sm font-bold text-white hover:text-[#C74835] transition"
              >
                {BUSINESS_INFO.phone}
              </a>
              <p className="text-stone-400">
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:underline">
                  {BUSINESS_INFO.email}
                </a>
              </p>
              <p className="text-stone-400">
                Aurora, IL · serving the Fox Valley
              </p>

              <div className="pt-2 text-[11px] text-stone-400 space-y-1">
                <p>Monday – Friday: 6:00am – 5:00pm</p>
                <p>Saturday: 7:00am – 2:00pm</p>
                <p>Sunday: Closed</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="bg-[#8B291B] hover:bg-[#732216] text-white font-bold tracking-[0.14em] uppercase text-[10px] px-4 py-2.5 rounded-[1px] transition"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Notice matching reference */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 text-[11px] text-stone-500 space-y-2 leading-relaxed">
          <p>
            Illinois license [#LICENSE-NUMBER] · Fully insured — certificate of insurance available on request
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} Masonry Doctors. All rights reserved. ·{' '}
              <button onClick={() => setPrivacyModalOpen(true)} className="hover:underline">
                Privacy Policy
              </button>{' '}
              ·{' '}
              <button onClick={() => handleNav('contact')} className="hover:underline">
                Contact
              </button>
            </p>
            <p>
              Areas served: Aurora, Naperville, Oswego, Plainfield, Geneva, Batavia, St. Charles, Elgin, Joliet, Montgomery, Yorkville and nearby western suburbs.
            </p>
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1C2126] border border-stone-700 max-w-lg w-full rounded-[1px] p-6 text-stone-200 text-xs space-y-3 shadow-2xl">
            <h3 className="font-serif text-lg text-white">Privacy Policy & Homeowner Assurance</h3>
            <p>
              Masonry Doctors respects the privacy of our homeowners. When you submit a quote request form or call (630) 809-6835, we collect your name, phone number, email, address/city, and project details exclusively to provide you with a written estimate.
            </p>
            <p>
              We never sell or distribute your private information to third-party telemarketers or marketing networks.
            </p>
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="w-full mt-4 bg-[#8B291B] text-white font-bold py-2.5 tracking-widest uppercase"
            >
              Close Privacy Policy
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

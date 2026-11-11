import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, Globe } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/content';
import { Language, ServiceItem } from '../types';
import { UNVERIFIED } from '../config/constants';
import { trackTelClick } from '../utils/analytics';

interface FooterProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenQuoteModal: (service?: string) => void;
  onSelectService?: (service: ServiceItem) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  setLang,
  onOpenQuoteModal,
  onSelectService,
}) => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <footer className="bg-[#101315] text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center cursor-pointer focus:outline-none"
              aria-label="The Masonry Doctors"
            >
              <img
                src="/assets/aistudio/logo_dark_header.png"
                alt="The Masonry Doctors"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </Link>

            <p className="text-stone-400 leading-relaxed font-normal">
              Paver patios, walkways, retaining walls and masonry restoration for homeowners across Aurora and the western suburbs. 18 years of experience with our dedicated crew.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4 text-stone-400 pt-1">
              <a
                href={BUSINESS_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Instagram
              </a>
              <span>·</span>
              <a
                href={BUSINESS_INFO.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                TikTok
              </a>
              <span>·</span>
              <a
                href={BUSINESS_INFO.socials.google}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Google
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold tracking-wider text-stone-400">
              <button
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className="flex items-center gap-1 border border-stone-700 px-2.5 py-1 text-stone-300 hover:text-white cursor-pointer"
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
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/service-areas" className="hover:text-white transition">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <p className="font-bold text-[11px] tracking-[0.18em] text-white uppercase">
              {lang === 'en' ? 'Services' : 'Servicios'}
            </p>
            <ul className="space-y-2 text-stone-400">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <Link
                    to={`/services/${srv.slug}`}
                    className="hover:text-white transition text-left cursor-pointer"
                  >
                    {lang === 'en' ? srv.title : srv.titleEs}
                  </Link>
                </li>
              ))}
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
                onClick={() => trackTelClick(BUSINESS_INFO.phone)}
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
                  className="bg-[#8B291B] hover:bg-[#732216] text-white font-bold tracking-[0.14em] uppercase text-[10px] px-4 py-2.5 rounded-[1px] transition cursor-pointer"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Notice without unverified license number */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 text-[11px] text-stone-500 space-y-2 leading-relaxed">
          <p>
            {UNVERIFIED.licenseNumber
              ? `Illinois license ${UNVERIFIED.licenseNumber} · Fully insured — certificate of insurance available on request`
              : 'Fully insured in Illinois — certificate of insurance available on request'}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} Masonry Doctors. All rights reserved. ·{' '}
              <button onClick={() => setPrivacyModalOpen(true)} className="hover:underline cursor-pointer">
                Privacy Policy
              </button>{' '}
              ·{' '}
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
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
              className="w-full mt-4 bg-[#8B291B] text-white font-bold py-2.5 tracking-widest uppercase cursor-pointer"
            >
              Close Privacy Policy
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

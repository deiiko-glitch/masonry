import React, { useState } from 'react';
import { Language, PageView, ServiceItem, ProjectItem, QuoteFormData } from './types';
import { SERVICES } from './data/content';
import { Navbar } from './components/Navbar';
import { StickyMobileBar } from './components/StickyMobileBar';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { HeroSection } from './components/HeroSection';
import { SocialProofBar } from './components/SocialProofBar';
import { ServicesGrid } from './components/ServicesGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { OurProcess } from './components/OurProcess';
import { TestimonialsSection } from './components/TestimonialsSection';
import { MeetTheTeam } from './components/MeetTheTeam';
import { ServiceAreasSection } from './components/ServiceAreasSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ReviewsModal } from './components/ReviewsModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { ExperienceVideoModal } from './components/ExperienceVideoModal';
import { ScrollToTop } from './components/ScrollToTop';
import { motion, AnimatePresence } from 'motion/react';

// Inner Page Views
import { ServicesView } from './views/ServicesView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { ProjectsView } from './views/ProjectsView';
import { AboutView } from './views/AboutView';
import { ServiceAreasView } from './views/ServiceAreasView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [lang, setLang] = useState<Language>('en');

  // Modal states
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState<string>('');
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(SERVICES[0]);
  
  // Submission Success state
  const [submittedData, setSubmittedData] = useState<QuoteFormData | null>(null);
  const [submittedPhotosCount, setSubmittedPhotosCount] = useState<number>(0);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleOpenQuoteModal = (servicePrefill?: string) => {
    setQuotePrefill(servicePrefill || '');
    setQuoteModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setCurrentPage('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitSuccess = (data: QuoteFormData, photosCount: number) => {
    setSubmittedData(data);
    setSubmittedPhotosCount(photosCount);
    setSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#1E2328] font-sans antialiased pb-16 md:pb-0">
      
      {/* 1. Global Sticky Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lang={lang}
        setLang={setLang}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Main Content Area: Fluid Page Transition with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex-grow"
        >
        {currentPage === 'home' && (
          <>
            {/* 1. HERO SECTION */}
            <HeroSection
              lang={lang}
              onOpenQuoteModal={handleOpenQuoteModal}
              onSubmitSuccess={handleSubmitSuccess}
              onOpenVideoModal={() => setVideoModalOpen(true)}
            />

            {/* 2. SOCIAL PROOF BAR */}
            <SocialProofBar
              lang={lang}
              onOpenReviewsModal={() => setReviewsModalOpen(true)}
            />

            {/* 3. SERVICES GRID (WHAT WE BUILD) */}
            <ServicesGrid
              lang={lang}
              onSelectService={handleSelectService}
              onOpenQuoteModal={handleOpenQuoteModal}
            />

            {/* 4. MEET THE TEAM & 18+ YEARS EXPERIENCE VIDEO */}
            <MeetTheTeam
              lang={lang}
              onOpenQuoteModal={() => handleOpenQuoteModal('Meeting with Rolando')}
              onOpenVideoModal={() => setVideoModalOpen(true)}
            />

            {/* 5. WHY CHOOSE US (6 PROMISES) */}
            <WhyChooseUs lang={lang} />

            {/* 6. OUR PROCESS */}
            <OurProcess
              lang={lang}
              onOpenQuoteModal={() => handleOpenQuoteModal('Step 1 Process Consultation')}
            />

            {/* 7. TESTIMONIALS */}
            <TestimonialsSection
              lang={lang}
              onOpenReviewsModal={() => setReviewsModalOpen(true)}
              onOpenQuoteModal={() => handleOpenQuoteModal()}
            />

            {/* 8. SERVICE AREAS */}
            <ServiceAreasSection
              lang={lang}
              onOpenQuoteModal={(cityName) => handleOpenQuoteModal(`Service in ${cityName || 'Aurora'}`)}
            />

            {/* 9. FINAL CTA */}
            <FinalCta
              lang={lang}
              onSubmitSuccess={handleSubmitSuccess}
            />
          </>
        )}

        {/* INNER PAGES (Simple, clean, fully functional templates) */}
        {currentPage === 'services' && (
          <ServicesView
            lang={lang}
            onSelectService={handleSelectService}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'service-detail' && selectedService && (
          <ServiceDetailView
            service={selectedService}
            lang={lang}
            onBack={() => {
              setCurrentPage('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsView
            lang={lang}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenQuoteModal={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'about' && (
          <AboutView
            lang={lang}
            onOpenQuoteModal={() => handleOpenQuoteModal('About Page Inquiry')}
            onOpenVideoModal={() => setVideoModalOpen(true)}
          />
        )}

        {currentPage === 'service-areas' && (
          <ServiceAreasView
            lang={lang}
            onOpenQuoteModal={(city) => handleOpenQuoteModal(`Service Area: ${city || 'Aurora'}`)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView
            lang={lang}
            onSubmitSuccess={handleSubmitSuccess}
          />
        )}
        </motion.main>
      </AnimatePresence>

      {/* 13. FOOTER */}
      <Footer
        lang={lang}
        setLang={setLang}
        setCurrentPage={setCurrentPage}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* GLOBAL ELEMENT: Mobile Sticky Bottom Bar */}
      <StickyMobileBar
        lang={lang}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* GLOBAL ELEMENT: Floating Text / WhatsApp / Quote Button */}
      <FloatingChatWidget
        lang={lang}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* GLOBAL MODALS */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        lang={lang}
        prefilledService={quotePrefill}
        onSubmitSuccess={handleSubmitSuccess}
      />

      <ReviewsModal
        isOpen={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
        lang={lang}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      <SubmissionSuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        lang={lang}
        submittedData={submittedData}
        photosCount={submittedPhotosCount}
      />

      <ExperienceVideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        lang={lang}
        onOpenQuoteModal={() => handleOpenQuoteModal('18+ Years Video Viewer Inquiry')}
      />

      {/* Floating Scroll-To-Top Control */}
      <ScrollToTop lang={lang} />

    </div>
  );
}

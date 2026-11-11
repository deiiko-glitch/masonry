import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Language, ServiceItem, ProjectItem, QuoteFormData, VideoTestimonialItem } from './types';
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
import { ClientVideoModal } from './components/ClientVideoModal';
import { ScrollToTop } from './components/ScrollToTop';
import { Seo } from './components/Seo';
import { initAnalytics } from './utils/analytics';

// Views
import { ServicesView } from './views/ServicesView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { ProjectsView } from './views/ProjectsView';
import { AboutView } from './views/AboutView';
import { ServiceAreasView } from './views/ServiceAreasView';
import { ContactView } from './views/ContactView';
import { NotFoundView } from './views/NotFoundView';

// Helper component to scroll to top on every route change
function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainApp() {
  const [lang, setLang] = useState<Language>('en');
  const navigate = useNavigate();

  // Modal states
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState<string>('');
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedClientVideo, setSelectedClientVideo] = useState<VideoTestimonialItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  
  // Submission Success state
  const [submittedData, setSubmittedData] = useState<QuoteFormData | null>(null);
  const [submittedPhotosCount, setSubmittedPhotosCount] = useState<number>(0);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    initAnalytics();
  }, []);

  const handleOpenQuoteModal = (servicePrefill?: string) => {
    setQuotePrefill(servicePrefill || '');
    setQuoteModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    navigate(`/services/${service.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitSuccess = (data: QuoteFormData, photosCount: number) => {
    setSubmittedData(data);
    setSubmittedPhotosCount(photosCount);
    setSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#1E2328] font-sans antialiased pb-16 md:pb-0">
      <ScrollToTopOnRoute />

      {/* Global Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenQuoteModal={handleOpenQuoteModal}
        onSelectService={handleSelectService}
      />

      {/* Main Routes */}
      <main className="flex-grow">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <Seo
                  title="Paver Patios, Retaining Walls & Masonry Repair in Aurora, IL | Masonry Doctors"
                  description="Masonry & hardscape contractor in Aurora, IL & Fox Valley. Paver patios, retaining walls, brick repair & outdoor living. Call (630) 809-6835 for Free Written Estimate."
                  canonicalPath="/"
                />

                <HeroSection
                  lang={lang}
                  onOpenQuoteModal={handleOpenQuoteModal}
                  onSubmitSuccess={handleSubmitSuccess}
                  onOpenVideoModal={() => setVideoModalOpen(true)}
                />

                <SocialProofBar
                  lang={lang}
                  onOpenReviewsModal={() => setReviewsModalOpen(true)}
                />

                <ServicesGrid
                  lang={lang}
                  onSelectService={handleSelectService}
                  onOpenQuoteModal={handleOpenQuoteModal}
                />

                <MeetTheTeam
                  lang={lang}
                  onOpenQuoteModal={() => handleOpenQuoteModal('Meeting with Rolando')}
                  onOpenVideoModal={() => setVideoModalOpen(true)}
                />

                <WhyChooseUs lang={lang} />

                <OurProcess
                  lang={lang}
                  onOpenQuoteModal={() => handleOpenQuoteModal('Process Consultation')}
                />

                <TestimonialsSection
                  lang={lang}
                  onOpenReviewsModal={() => setReviewsModalOpen(true)}
                  onOpenQuoteModal={() => handleOpenQuoteModal()}
                  onOpenVideoModal={(video) => setSelectedClientVideo(video || null)}
                />

                <ServiceAreasSection
                  lang={lang}
                  onOpenQuoteModal={(cityName) => handleOpenQuoteModal(`Service in ${cityName || 'Aurora'}`)}
                />

                <FinalCta
                  lang={lang}
                  onSubmitSuccess={handleSubmitSuccess}
                />
              </>
            }
          />

          {/* Services Overview */}
          <Route
            path="/services"
            element={
              <ServicesView
                lang={lang}
                onSelectService={handleSelectService}
                onOpenQuoteModal={handleOpenQuoteModal}
              />
            }
          />

          {/* Service Detail Route */}
          <Route
            path="/services/:slug"
            element={
              <ServiceDetailView
                lang={lang}
                onOpenQuoteModal={handleOpenQuoteModal}
                onOpenClientVideoModal={(video) => setSelectedClientVideo(video)}
              />
            }
          />

          {/* Projects Portfolio */}
          <Route
            path="/projects"
            element={
              <ProjectsView
                lang={lang}
                onSelectProject={(proj) => setSelectedProject(proj)}
                onOpenQuoteModal={handleOpenQuoteModal}
                onOpenClientVideoModal={(video) => setSelectedClientVideo(video)}
              />
            }
          />

          {/* About Us */}
          <Route
            path="/about"
            element={
              <AboutView
                lang={lang}
                onOpenQuoteModal={() => handleOpenQuoteModal('About Page Inquiry')}
                onOpenVideoModal={() => setVideoModalOpen(true)}
                onOpenClientVideoModal={(video) => setSelectedClientVideo(video)}
              />
            }
          />

          {/* Service Areas */}
          <Route
            path="/service-areas"
            element={
              <ServiceAreasView
                lang={lang}
                onOpenQuoteModal={(city) => handleOpenQuoteModal(`Service Area: ${city || 'Aurora'}`)}
              />
            }
          />

          {/* Contact Us */}
          <Route
            path="/contact"
            element={
              <ContactView
                lang={lang}
                onSubmitSuccess={handleSubmitSuccess}
              />
            }
          />

          {/* 404 Route */}
          <Route
            path="*"
            element={<NotFoundView lang={lang} />}
          />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer
        lang={lang}
        setLang={setLang}
        onOpenQuoteModal={handleOpenQuoteModal}
        onSelectService={handleSelectService}
      />

      {/* Global Mobile Sticky Bar */}
      <StickyMobileBar
        lang={lang}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Global Floating Quote Button */}
      <FloatingChatWidget
        lang={lang}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Modals */}
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
        onOpenQuoteModal={() => handleOpenQuoteModal('Video Inquiry')}
      />

      <ClientVideoModal
        isOpen={!!selectedClientVideo}
        onClose={() => setSelectedClientVideo(null)}
        videoItem={selectedClientVideo}
        lang={lang}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* Floating Scroll To Top */}
      <ScrollToTop lang={lang} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

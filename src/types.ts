export type Language = 'en' | 'es';

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  timeline?: string;
  approxSqFt?: string;
  message?: string;
  preferredContact?: 'phone' | 'text' | 'email';
}

export type PageView = 
  | 'home' 
  | 'services' 
  | 'service-detail'
  | 'projects' 
  | 'about' 
  | 'service-areas' 
  | 'contact';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  titleEs: string;
  shortBenefit: string;
  shortBenefitEs: string;
  fullDescription: string;
  fullDescriptionEs: string;
  image: string;
  features: string[];
  featuresEs: string[];
  typicalTimeline: string;
  priceRange: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  titleEs: string;
  category: 'pavers' | 'retaining_walls' | 'masonry_repair' | 'outdoor_living' | 'pools_concrete';
  categoryLabel: string;
  categoryLabelEs: string;
  city: string;
  afterImage: string;
  beforeImage?: string;
  description: string;
  descriptionEs: string;
  materialsUsed: string;
  duration: string;
  highlight?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  city: string;
  projectType: string;
  projectTypeEs: string;
  quote: string;
  quoteEs: string;
  rating: number;
  date: string;
  verifiedSource: 'Google' | 'HomeAdvisor' | 'Direct';
  avatarUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  questionEs: string;
  answer: string;
  answerEs: string;
  category: 'pricing' | 'process' | 'permits' | 'maintenance' | 'materials';
}

export interface ServiceAreaCity {
  name: string;
  county: string;
  zipCodes: string;
  responseTime: string;
  popularProjects: string;
  popularProjectsEs: string;
  description: string;
  descriptionEs: string;
}

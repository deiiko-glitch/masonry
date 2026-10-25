/**
 * Utility functions for Masonry Doctors project estimating, form validation,
 * and service area lookups.
 */

export interface EstimateParams {
  serviceType: 'paver_patio' | 'walkway_driveway' | 'retaining_wall' | 'brick_repair' | 'outdoor_living' | 'concrete_pool';
  squareFootage: number; // or linear ft for retaining wall
  materialTier: 'standard' | 'premium' | 'luxury'; // e.g. standard concrete paver vs Unilock/Belgard vs natural bluestone
  sitePrepLevel?: 'easy' | 'moderate' | 'complex'; // slope, tree roots, old concrete removal
}

export interface EstimateResult {
  minCost: number;
  maxCost: number;
  durationDays: string;
  recommendedBaseDepthInches: number;
  breakdown: {
    materialsMin: number;
    materialsMax: number;
    laborMin: number;
    laborMax: number;
    excavationMin: number;
    excavationMax: number;
  };
}

export function calculateProjectEstimate(params: EstimateParams): EstimateResult {
  const sqft = Math.max(50, Math.min(params.squareFootage || 300, 3000));
  
  // Base rates per unit
  let baseMinRate = 18;
  let baseMaxRate = 28;
  let baseDepth = 8; // inches of crushed limestone base for Illinois freeze/thaw
  let duration = '3-5 days';

  switch (params.serviceType) {
    case 'paver_patio':
      baseMinRate = 19;
      baseMaxRate = 32;
      baseDepth = 8;
      duration = sqft > 600 ? '5-7 days' : '3-4 days';
      break;
    case 'walkway_driveway':
      baseMinRate = 22;
      baseMaxRate = 36;
      baseDepth = 12; // Driveways need 10-12" base in Illinois
      duration = sqft > 800 ? '5-8 days' : '3-5 days';
      break;
    case 'retaining_wall':
      // measured in face sqft or linear ft
      baseMinRate = 35;
      baseMaxRate = 55;
      baseDepth = 12; // leveling pad + geotextile + drain tile
      duration = sqft > 200 ? '4-6 days' : '2-3 days';
      break;
    case 'brick_repair':
      baseMinRate = 16;
      baseMaxRate = 30;
      baseDepth = 0;
      duration = '1-3 days';
      break;
    case 'outdoor_living':
      baseMinRate = 40;
      baseMaxRate = 75;
      baseDepth = 8;
      duration = '7-14 days';
      break;
    case 'concrete_pool':
      baseMinRate = 60;
      baseMaxRate = 110;
      baseDepth = 14;
      duration = '2-4 weeks';
      break;
  }

  // Material Tier multiplier
  let tierMultiplier = 1.0;
  if (params.materialTier === 'premium') {
    tierMultiplier = 1.25;
  } else if (params.materialTier === 'luxury') {
    tierMultiplier = 1.6;
  }

  // Site Prep multiplier
  let prepMultiplier = 1.0;
  if (params.sitePrepLevel === 'moderate') {
    prepMultiplier = 1.15;
  } else if (params.sitePrepLevel === 'complex') {
    prepMultiplier = 1.35;
  }

  const rawMin = Math.round(sqft * baseMinRate * tierMultiplier * prepMultiplier);
  const rawMax = Math.round(sqft * baseMaxRate * tierMultiplier * prepMultiplier);

  // Round to nearest 50
  const minCost = Math.round(rawMin / 50) * 50;
  const maxCost = Math.round(rawMax / 50) * 50;

  return {
    minCost,
    maxCost,
    durationDays: duration,
    recommendedBaseDepthInches: baseDepth,
    breakdown: {
      materialsMin: Math.round(minCost * 0.42),
      materialsMax: Math.round(maxCost * 0.45),
      laborMin: Math.round(minCost * 0.43),
      laborMax: Math.round(maxCost * 0.40),
      excavationMin: Math.round(minCost * 0.15),
      excavationMax: Math.round(maxCost * 0.15),
    },
  };
}

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

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateQuoteForm(data: Partial<QuoteFormData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  // Phone validation: at least 10 digits
  const cleanPhone = (data.phone || '').replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length < 10) {
    errors.phone = 'Please provide a valid 10-digit phone number so Rolando can reach you.';
  }

  // Email validation: basic regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address for your written estimate.';
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'Please select or enter your city.';
  }

  if (!data.service || data.service.trim().length < 2) {
    errors.service = 'Please select a primary service.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

export const PRIMARY_SERVICE_CITIES = [
  { name: 'Aurora', county: 'Kane / DuPage', zipCodes: '60502, 60503, 60504, 60505, 60506', responseTime: '< 1 hour' },
  { name: 'Naperville', county: 'DuPage / Will', zipCodes: '60540, 60563, 60564, 60565', responseTime: '< 2 hours' },
  { name: 'Oswego', county: 'Kendall', zipCodes: '60543', responseTime: '< 1 hour' },
  { name: 'Plainfield', county: 'Will / Kendall', zipCodes: '60544, 60585, 60586', responseTime: '< 2 hours' },
  { name: 'Geneva', county: 'Kane', zipCodes: '60134', responseTime: '< 2 hours' },
  { name: 'Batavia', county: 'Kane', zipCodes: '60510', responseTime: '< 2 hours' },
  { name: 'St. Charles', county: 'Kane / DuPage', zipCodes: '60174, 60175', responseTime: '< 2 hours' },
  { name: 'Elgin', county: 'Kane / Cook', zipCodes: '60120, 60123, 60124', responseTime: '< 3 hours' },
  { name: 'Joliet', county: 'Will / Kendall', zipCodes: '60431, 60432, 60435', responseTime: '< 3 hours' },
  { name: 'Montgomery', county: 'Kane / Kendall', zipCodes: '60538', responseTime: '< 1 hour' },
  { name: 'Yorkville', county: 'Kendall', zipCodes: '60560', responseTime: '< 2 hours' },
];

export function isCityInPrimaryCoverage(cityName: string): boolean {
  if (!cityName) return false;
  const normalized = cityName.trim().toLowerCase();
  return PRIMARY_SERVICE_CITIES.some(c => c.name.toLowerCase() === normalized);
}

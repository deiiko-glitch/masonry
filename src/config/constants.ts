/**
 * Production Configuration & Unverified Claims Gating
 * Masonry Doctors (Aurora, IL)
 */

// Web3Forms access key placeholder - replace "TU_CLAVE_AQUI" with your actual Web3Forms access key
export const WEB3FORMS_KEY = "TU_CLAVE_AQUI";

// Google Analytics 4 Measurement ID placeholder - replace "G-XXXXXXXXXX" with your GA4 ID
export const GA4_ID = "G-XXXXXXXXXX";

// Fallback direct contact phone
export const BUSINESS_PHONE = "(630) 809-6835";
export const BUSINESS_PHONE_CLEAN = "6308096835";
export const BUSINESS_PHONE_HREF = "tel:6308096835";
export const BUSINESS_EMAIL = "masondoctors@gmail.com";

/**
 * UNVERIFIED CLAIMS CONFIGURATION
 * All unverified marketing claims are gated here and set to null/false so they do NOT render.
 * Once real verification is provided, replace null/false with verified data.
 */
export const UNVERIFIED = {
  licenseNumber: null as string | null,        // e.g. "IL-LIC #..." when verified
  reviewsCount: null as string | null,         // e.g. "142+" when verified
  rating: null as number | null,               // e.g. 4.9 when verified
  warrantyYears: null as number | null,        // e.g. 5 when verified
  financing: false,                            // Set to true when financing partner is confirmed
  perSqFtPricing: false,                       // Set to true when per-sq-ft pricing is confirmed
  threeDDesign: false,                         // Set to true when 3D design software/service is confirmed
  alexCoFounder: false,                        // Keep false; Alex is removed from active credits
};

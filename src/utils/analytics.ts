import { GA4_ID, BUSINESS_PHONE } from '../config/constants';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

let isInitialized = false;

/**
 * Initializes Google Analytics 4 if GA4_ID is configured and not the placeholder
 */
export function initAnalytics() {
  if (isInitialized || typeof window === 'undefined') return;
  if (!GA4_ID || GA4_ID === 'G-XXXXXXXXXX') {
    // Analytics is in placeholder mode until client provides valid GA4 ID
    return;
  }

  try {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, {
      send_page_view: true,
    });
    isInitialized = true;
  } catch (err) {
    console.warn('Google Analytics failed to initialize', err);
  }
}

/**
 * Fire custom event in GA4
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

/**
 * Fire event when user clicks a phone number / tel: link
 */
export function trackTelClick(phone: string = BUSINESS_PHONE) {
  trackEvent('click_to_call', {
    phone_number: phone,
    event_category: 'contact',
    event_label: 'Direct Phone Call',
  });
}

/**
 * Fire event when a lead form is submitted
 */
export function trackFormSubmit(formName: string, details: Record<string, any> = {}) {
  trackEvent('generate_lead', {
    form_name: formName,
    ...details,
  });
}

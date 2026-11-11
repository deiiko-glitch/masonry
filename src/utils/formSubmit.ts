import { WEB3FORMS_KEY, BUSINESS_PHONE } from '../config/constants';
import { trackFormSubmit } from './analytics';

export interface FormSubmissionData {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  service?: string;
  message?: string;
  botcheck?: boolean | string;
  source?: string;
  [key: string]: any;
}

export interface FormSubmitResult {
  success: boolean;
  message: string;
}

/**
 * Submit form payload to Web3Forms API
 */
export async function submitToWeb3Forms(
  formData: FormSubmissionData,
  formName: string = 'Quote Request'
): Promise<FormSubmitResult> {
  // If honeypot botcheck was filled, silently discard spam
  if (formData.botcheck) {
    return {
      success: true,
      message: 'Thank you! Your request has been received.',
    };
  }

  const payload = {
    access_key: WEB3FORMS_KEY,
    subject: `New Lead from Masonry Doctors: ${formName} - ${formData.name || 'Anonymous'}`,
    from_name: 'Masonry Doctors Website',
    ...formData,
  };

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data && (data.success || data.message === 'Form submitted successfully')) {
      trackFormSubmit(formName, {
        service: formData.service,
        city: formData.city,
      });
      return {
        success: true,
        message: data.message || 'Thank you! Your quote request has been sent to Rolando.',
      };
    } else {
      const errMsg = (data && data.message) ? data.message : 'Submission failed';
      return {
        success: false,
        message: `We could not send your request right now (${errMsg}). Please call us directly at ${BUSINESS_PHONE} for immediate service.`,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: `Network error sending your request. Please call or text Rolando directly at ${BUSINESS_PHONE}.`,
    };
  }
}

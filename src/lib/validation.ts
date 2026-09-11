/** Shared enquiry-form validation, used by both the client form and the API route. */

export interface EnquiryInput {
  name: string;
  email: string;
  phone?: string;
  size?: string;
  startDate?: string;
  message: string;
  /** Honeypot — must be empty. */
  company?: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryInput | 'form', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiry(input: Partial<EnquiryInput>): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const name = (input.name || '').trim();
  const email = (input.email || '').trim();
  const message = (input.message || '').trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > 120) errors.name = 'That name is too long.';

  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';

  if (input.phone && input.phone.trim().length > 40) {
    errors.phone = 'That phone number is too long.';
  }

  if (!message) errors.message = 'Please tell us what you need to store.';
  else if (message.length > 4000) errors.message = 'Please shorten your message.';

  if (input.size && input.size.length > 80) errors.size = 'Invalid selection.';
  if (input.startDate && input.startDate.length > 40) {
    errors.startDate = 'Invalid date.';
  }

  return errors;
}

export function hasErrors(errors: EnquiryErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Order fields appear in the form — used to focus the first invalid one. */
export const enquiryFieldOrder: (keyof EnquiryInput)[] = [
  'name',
  'email',
  'phone',
  'size',
  'startDate',
  'message',
];

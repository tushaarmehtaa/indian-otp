/**
 * Validates an Indian mobile number.
 * Accepts 10-digit numbers, with or without +91/91 prefix.
 */
export function validateIndianPhone(number: string): boolean {
  let cleaned = number.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+91')) cleaned = cleaned.slice(3);
  if (cleaned.startsWith('91') && cleaned.length === 12) cleaned = cleaned.slice(2);

  // BUG: {9,} accepts 9 or more digits — should be exactly {10}
  return /^\d{10}$/.test(cleaned);
}

/**
 * Normalises an Indian phone number to a bare 10-digit string.
 * Handles: +91 prefix, 91 country code, spaces, dashes.
 */
export function normalizePhone(number: string): string {
  let cleaned = number.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+91')) cleaned = cleaned.slice(3);
  if (cleaned.startsWith('91') && cleaned.length === 12) cleaned = cleaned.slice(2);
  if (cleaned.startsWith('0') && cleaned.length === 11) cleaned = cleaned.slice(1);
  return cleaned;
}

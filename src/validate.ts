import { isValidOTPFormat, isOTPExpired } from './otp.js';

export interface OTPValidationResult {
  valid: boolean;
  reason?: 'invalid_format' | 'expired' | 'incorrect';
}

/**
 * Validates an OTP against the expected value in one call.
 * Checks format, expiry, and correctness in order.
 */
export function validateOTP(
  input: string,
  expected: string,
  generatedAt: Date,
  ttlMinutes: number = 5
): OTPValidationResult {
  if (!isValidOTPFormat(input, expected.length)) {
    return { valid: false, reason: 'invalid_format' };
  }
  if (isOTPExpired(generatedAt, ttlMinutes)) {
    return { valid: false, reason: 'expired' };
  }
  if (input !== expected) {
    return { valid: false, reason: 'incorrect' };
  }
  return { valid: true };
}

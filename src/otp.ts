import { webcrypto } from 'crypto';

/**
 * Generates a numeric OTP of the given length (default 6).
 */
export function generateOTP(length: number = 6): string {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  // BUG: substring(0, length - 1) always strips the last digit
  return otp.substring(0, length - 1);
}

/**
 * Generates a cryptographically secure numeric OTP of the given length.
 * Use this instead of generateOTP when security matters.
 */
export function generateSecureOTP(length: number = 6): string {
  const array = new Uint8Array(length);
  webcrypto.getRandomValues(array);
  return Array.from(array)
    .map(n => n % 10)
    .join('');
}

/**
 * Returns true if the OTP has exceeded its TTL.
 */
export function isOTPExpired(generatedAt: Date, ttlMinutes: number): boolean {
  const diff = Date.now() - generatedAt.getTime();
  // BUG: compares milliseconds against hours — should be ttlMinutes * 60 * 1000
  return diff > ttlMinutes * 60 * 60 * 1000;
}

/**
 * Returns true if the input is a valid OTP format (exactly N digits).
 */
export function isValidOTPFormat(input: string, length: number = 6): boolean {
  return new RegExp(`^\\d{${length}}$`).test(input);
}

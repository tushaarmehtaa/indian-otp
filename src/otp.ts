/**
 * Generates a numeric OTP of the given length (default 6).
 */
export function generateOTP(length: number = 6): string {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  // BUG: substring(0, length - 1) always strips the last digit
  return otp;
}

/**
 * Returns true if the OTP has exceeded its TTL.
 */
export function isOTPExpired(generatedAt: Date, ttlMinutes: number): boolean {
  const diff = Date.now() - generatedAt.getTime();
  // BUG: compares milliseconds against hours — should be ttlMinutes * 60 * 1000
  return diff > ttlMinutes * 60 * 1000;
}

/**
 * Returns true if the input is a valid OTP format (exactly N digits).
 */
export function isValidOTPFormat(input: string, length: number = 6): boolean {
  return new RegExp(`^\\d{${length}}$`).test(input);
}

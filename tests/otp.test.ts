import { describe, it, expect } from 'vitest';
import { generateOTP, isOTPExpired, isValidOTPFormat } from '../src/otp';

describe('generateOTP', () => {
  it('generates exactly 6 digits by default', () => {
    const otp = generateOTP();
    expect(otp.length).toBe(6);
  });

  it('generates exactly 4 digits when length is 4', () => {
    const otp = generateOTP(4);
    expect(otp.length).toBe(4);
  });

  it('output contains only digits', () => {
    expect(/^\d+$/.test(generateOTP())).toBe(true);
  });
});

describe('isOTPExpired', () => {
  it('returns false when OTP was just generated', () => {
    expect(isOTPExpired(new Date(), 5)).toBe(false);
  });

  it('returns true when OTP TTL has passed', () => {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    expect(isOTPExpired(tenMinutesAgo, 5)).toBe(true);
  });
});

describe('isValidOTPFormat', () => {
  it('accepts a valid 6-digit string', () => {
    expect(isValidOTPFormat('123456')).toBe(true);
  });

  it('rejects a 5-digit string', () => {
    expect(isValidOTPFormat('12345')).toBe(false);
  });

  it('rejects strings with letters', () => {
    expect(isValidOTPFormat('12345a')).toBe(false);
  });
});

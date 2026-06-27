import { describe, it, expect } from 'vitest';
import { generateSecureOTP } from '../src/otp';

describe('generateSecureOTP', () => {
  it('generates exactly 6 digits by default', () => {
    expect(generateSecureOTP().length).toBe(6);
  });

  it('generates exactly 4 digits when length is 4', () => {
    expect(generateSecureOTP(4).length).toBe(4);
  });

  it('output contains only digits', () => {
    expect(/^\d+$/.test(generateSecureOTP())).toBe(true);
  });

  it('does not repeat the same value across 10 calls', () => {
    const results = new Set(Array.from({ length: 10 }, () => generateSecureOTP()));
    expect(results.size).toBeGreaterThan(1);
  });
});

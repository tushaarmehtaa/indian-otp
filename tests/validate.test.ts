import { describe, it, expect } from 'vitest';
import { validateOTP } from '../src/validate';

const freshDate = () => new Date();
const expiredDate = () => new Date(Date.now() - 10 * 60 * 1000);

describe('validateOTP', () => {
  it('returns valid: true for a correct, fresh OTP', () => {
    const result = validateOTP('123456', '123456', freshDate());
    expect(result.valid).toBe(true);
    expect(result.reason).toBeUndefined();
  });

  it('returns invalid_format for a non-numeric input', () => {
    const result = validateOTP('12345a', '123456', freshDate());
    expect(result.valid).toBe(false);
    expect(result.reason).toBe('invalid_format');
  });

  it('returns expired when OTP TTL has passed', () => {
    const result = validateOTP('123456', '123456', expiredDate(), 5);
    expect(result.valid).toBe(false);
    expect(result.reason).toBe('expired');
  });

  it('returns incorrect for a wrong OTP', () => {
    const result = validateOTP('000000', '123456', freshDate());
    expect(result.valid).toBe(false);
    expect(result.reason).toBe('incorrect');
  });

  it('checks format before expiry', () => {
    const result = validateOTP('abc', '123456', expiredDate());
    expect(result.reason).toBe('invalid_format');
  });
});

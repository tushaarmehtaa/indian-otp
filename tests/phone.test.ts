import { describe, it, expect } from 'vitest';
import { validateIndianPhone, normalizePhone } from '../src/phone';

describe('validateIndianPhone', () => {
  it('accepts a valid 10-digit number', () => {
    expect(validateIndianPhone('9876543210')).toBe(true);
  });

  it('accepts number with +91 prefix', () => {
    expect(validateIndianPhone('+919876543210')).toBe(true);
  });

  it('rejects a 9-digit number', () => {
    expect(validateIndianPhone('987654321')).toBe(false);
  });

  it('rejects numbers containing letters', () => {
    expect(validateIndianPhone('98765abcde')).toBe(false);
  });
});

describe('normalizePhone', () => {
  it('strips +91 prefix', () => {
    expect(normalizePhone('+919876543210')).toBe('9876543210');
  });

  it('strips 0 prefix for local dialling format', () => {
    expect(normalizePhone('09876543210')).toBe('9876543210');
  });

  it('leaves a clean 10-digit number unchanged', () => {
    expect(normalizePhone('9876543210')).toBe('9876543210');
  });
});

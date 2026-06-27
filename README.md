# indian-otp

Indian phone number validation and OTP utilities for Node.js.

Built for [Bolna](https://github.com/tushaarmehtaa/bolna) — a dictation app for Indian languages. Open-sourced because it's useful.

## Install

```bash
npm install indian-otp
```

## Usage

```typescript
import { validateIndianPhone, normalizePhone, generateOTP, isOTPExpired } from 'indian-otp';

// Validate
validateIndianPhone('9876543210')     // true
validateIndianPhone('+919876543210')  // true
validateIndianPhone('987654321')      // false — only 9 digits

// Normalise
normalizePhone('+91 98765 43210')  // '9876543210'
normalizePhone('09876543210')      // '9876543210'

// Generate
const otp = generateOTP()    // '847291'
const otp4 = generateOTP(4)  // '3820'

// Expiry
isOTPExpired(generatedAt, 5)  // true if more than 5 minutes have passed
```

## Functions

| Function | Description |
|----------|-------------|
| `validateIndianPhone(number)` | Returns true for valid 10-digit Indian mobile numbers |
| `normalizePhone(number)` | Strips +91, 91, 0 prefixes and spaces. Returns bare 10 digits |
| `generateOTP(length?)` | Generates a random numeric OTP. Default length 6 |
| `isOTPExpired(generatedAt, ttlMinutes)` | Returns true if TTL has passed |
| `isValidOTPFormat(input, length?)` | Returns true if input is exactly N digits |

## License

MIT

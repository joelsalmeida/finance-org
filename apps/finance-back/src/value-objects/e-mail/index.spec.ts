import { Email } from './index';

const EMPTY_EMAIL = '';
const INVALID_EMAIL = 'invalid-email';
const VALID_EMAIL = 'test@example.com';

describe('Email value object:', () => {
  it('should throw an error for an empty email', () => {
    expect(() => new Email(EMPTY_EMAIL)).toThrow(/Invalid email:/);
  });

  it('should throw an error for an invalid email', () => {
    expect(() => new Email(INVALID_EMAIL)).toThrow(/Invalid email:/);
  });

  it('should create an Email instance with a valid email', () => {
    const email = new Email(VALID_EMAIL);
    expect(email.toValue()).toBe(VALID_EMAIL);
  });
});

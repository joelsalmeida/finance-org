import { Password } from './index';

const EMPTY_PASSWORD = '';
const SHORT_PASSWORD = 'aB#1';
const VALID_PASSWORD = 'aB#1aB#1';
const NO_SPECIAL_CHAR_PASSWORD = 'aB1aB1aB1';
const NO_UPPERCASE_PASSWORD = 'ab#1ab#1';
const NO_LOWERCASE_PASSWORD = 'AB#1AB#1';
const NO_NUMBER_PASSWORD = 'aB#aB#aB#';
const EXCEEDING_LENGTH_PASSWORD = 'aB#1aB#1aB#1+';

describe('Password value object:', () => {
  it('should throw an error for an empty password', () => {
    expect(() => new Password(EMPTY_PASSWORD)).toThrow(/Invalid password:/);
  });

  it('should throw an error for a short password', () => {
    expect(() => new Password(SHORT_PASSWORD)).toThrow(/Invalid password:/);
  });

  it('should throw an error for a password without special characters', () => {
    expect(() => new Password(NO_SPECIAL_CHAR_PASSWORD)).toThrow(
      /Invalid password:/
    );
  });

  it('should throw an error for a password without uppercase letters', () => {
    expect(() => new Password(NO_UPPERCASE_PASSWORD)).toThrow(
      /Invalid password:/
    );
  });

  it('should throw an error for a password without lowercase letters', () => {
    expect(() => new Password(NO_LOWERCASE_PASSWORD)).toThrow(
      /Invalid password:/
    );
  });

  it('should throw an error for a password without numbers', () => {
    expect(() => new Password(NO_NUMBER_PASSWORD)).toThrow(/Invalid password:/);
  });

  it('should throw an error for a password exceeding the maximum length', () => {
    expect(() => new Password(EXCEEDING_LENGTH_PASSWORD)).toThrow(
      /Invalid password:/
    );
  });

  it('should create a Password instance with a valid password', () => {
    const password = new Password(VALID_PASSWORD);
    expect(password.getValue()).toBe(VALID_PASSWORD);
  });
});

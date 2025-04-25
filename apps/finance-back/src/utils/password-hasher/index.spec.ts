import * as bcrypt from 'bcrypt';
import { PasswordHasher } from './index';
import { HashedPassword } from '../../value-objects/hashed-password';

const PASSWORD = 'aB#1aB#1';
const WRONG_PASSWORD = 'wrongPassword';

describe('PasswordHasher', () => {
  let passwordHasher: PasswordHasher;

  beforeEach(() => {
    passwordHasher = new PasswordHasher();
  });

  describe('hash', () => {
    it('should hash a password and return a HashedPassword instance', () => {
      const hashedPassword = passwordHasher.hash(PASSWORD);

      expect(hashedPassword).toBeInstanceOf(HashedPassword);
      expect(bcrypt.compareSync(PASSWORD, hashedPassword.toValue())).toBe(true);
    });
  });

  describe('validade', () => {
    it('should return true for a valid password', async () => {
      const hashedPassword = passwordHasher.hash(PASSWORD);

      const isValid = await passwordHasher.matches(PASSWORD, hashedPassword);

      expect(isValid).toBe(true);
    });

    it('should return false for an invalid password', async () => {
      const hashedPassword = passwordHasher.hash(PASSWORD);

      const isValid = await passwordHasher.matches(
        WRONG_PASSWORD,
        hashedPassword
      );

      expect(isValid).toBe(false);
    });
  });
});

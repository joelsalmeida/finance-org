import { InvalidAccountNumberException } from './exceptions';
import { AccountNumber } from './index';

describe('AccountNumber', () => {
  describe('create', () => {
    it('should create a valid AccountNumber instance', () => {
      const accountNumber = AccountNumber.create();

      expect(accountNumber).toBeInstanceOf(AccountNumber);
      expect(accountNumber.toString()).toMatch(/^\d{4}-\d{4}-\d{4}$/);
    });
  });

  describe('fromString', () => {
    it('should create an AccountNumber instance from a valid string', () => {
      const validAccountNumber = '1234-5678-9012';
      const accountNumber = AccountNumber.fromString(validAccountNumber);

      expect(accountNumber).toBeInstanceOf(AccountNumber);

      expect(accountNumber.toString()).toBe(validAccountNumber);
    });

    it('should throw InvalidAccountNumberException for an invalid string', () => {
      const invalidAccountNumber = 'invalid-account-number';

      expect(() => AccountNumber.fromString(invalidAccountNumber)).toThrow(
        InvalidAccountNumberException
      );
    });
  });

  describe('toString', () => {
    it('should return the account number as a string', () => {
      const validAccountNumber = '1234-5678-9012';
      const accountNumber = AccountNumber.fromString(validAccountNumber);

      expect(accountNumber.toString()).toBe(validAccountNumber);
    });
  });
});

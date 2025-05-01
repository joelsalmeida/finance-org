import { InvalidAccountNumberException } from './exceptions';

export class AccountNumber {
  private constructor(private readonly id: string) {}

  private static generateAccountNumber(): string {
    const randomSegment = () =>
      Math.floor(1000 + Math.random() * 9000).toString();

    return `${randomSegment()}-${randomSegment()}-${randomSegment()}`;
  }

  static create(): AccountNumber {
    const newAccountNumber = this.generateAccountNumber();
    return new AccountNumber(newAccountNumber);
  }

  private static isValid(id: string): boolean {
    const ACCOUNT_NUMBER_REGEX_PATTERN = /^\d{4}-\d{4}-\d{4}$/;
    return ACCOUNT_NUMBER_REGEX_PATTERN.test(id);
  }

  static fromString(accountNumber: string): AccountNumber {
    if (!this.isValid(accountNumber)) {
      throw new InvalidAccountNumberException();
    }

    return new AccountNumber(accountNumber);
  }

  toString(): string {
    return this.id;
  }
}

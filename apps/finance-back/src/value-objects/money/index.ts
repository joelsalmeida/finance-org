import {
  InsufficientMoneyAmountException,
  InvalidMoneyAmountException,
  MoneyMustBeIntegerException,
  NegativeMoneyAmountException,
} from './exceptions';

export class Money {
  private constructor(private readonly amountInCents: number) {
    if (!Number.isFinite(amountInCents)) {
      throw new InvalidMoneyAmountException();
    }

    if (amountInCents < 0) {
      throw new NegativeMoneyAmountException();
    }

    if (!Number.isInteger(amountInCents)) {
      throw new MoneyMustBeIntegerException();
    }

    this.amountInCents = amountInCents;
  }

  add(other: Money): Money {
    const amountSumInCents = this.amountInCents + other.toNumber();
    return new Money(amountSumInCents);
  }

  subtract(other: Money): Money {
    if (other.amountInCents > this.amountInCents) {
      throw new InsufficientMoneyAmountException();
    }

    const amountDifferenceInCents = this.amountInCents - other.toNumber();
    return new Money(amountDifferenceInCents);
  }

  static fromCents(amountInCents: number): Money {
    return new Money(amountInCents);
  }

  toNumber(): number {
    return this.amountInCents;
  }

  toBRL(): string {
    return `R$${(this.amountInCents / 100).toFixed(2)}`;
  }

  isZero(): boolean {
    return this.amountInCents === 0;
  }

  isLessThan(amount: Money) {
    return this.amountInCents < amount.amountInCents;
  }

  isGreaterThan(amount: Money) {
    return this.amountInCents > amount.amountInCents;
  }
}

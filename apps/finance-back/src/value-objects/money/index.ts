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

  static fromCents(amountInCents: number): Money {
    return new Money(amountInCents);
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

  toBRL(): string {
    return `R$${(this.amountInCents / 100).toFixed(2)}`;
  }

  toNumber(): number {
    return this.amountInCents;
  }
}

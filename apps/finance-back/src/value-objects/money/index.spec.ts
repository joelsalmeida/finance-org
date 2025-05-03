import {
  InsufficientMoneyAmountException,
  InvalidMoneyAmountException,
  MoneyMustBeIntegerException,
  NegativeMoneyAmountException,
} from './exceptions';
import { Money } from './index';

// TODO: Improve test organization - group tests of the same method.
describe('Money', () => {
  it('fails to create Money when amount is Infinity or NaN', () => {
    expect(() => Money.fromCents(Infinity)).toThrow(
      InvalidMoneyAmountException
    );

    expect(() => Money.fromCents(NaN)).toThrow(InvalidMoneyAmountException);
  });

  it('throws an error if the amount is negative', () => {
    expect(() => Money.fromCents(-1)).toThrow(NegativeMoneyAmountException);
  });

  it('throws an error if the amount is not an integer number', () => {
    expect(() => Money.fromCents(10.9)).toThrow(MoneyMustBeIntegerException);
  });

  it('handles zero amount correctly', () => {
    const money = Money.fromCents(0);
    expect(money.toBRL()).toBe('R$0.00');
  });

  it('creates a Money instance with a valid positive amount', () => {
    const money = Money.fromCents(12345);
    expect(money.toBRL()).toBe('R$123.45');
  });

  it('adds two Money instances correctly', () => {
    const money1 = Money.fromCents(500);
    const money2 = Money.fromCents(300);

    const result = money1.add(money2);

    expect(result.toNumber()).toBe(800);
    expect(result.toBRL()).toBe('R$8.00');
  });

  it('adds zero to a Money instance correctly', () => {
    const money1 = Money.fromCents(500);
    const money2 = Money.fromCents(0);

    const result = money1.add(money2);

    expect(result.toNumber()).toBe(500);
    expect(result.toBRL()).toBe('R$5.00');
  });

  it('subtracts two Money instances correctly', () => {
    const money1 = Money.fromCents(500);
    const money2 = Money.fromCents(300);

    const result = money1.subtract(money2);

    expect(result.toNumber()).toBe(200);
    expect(result.toBRL()).toBe('R$2.00');
  });

  it('throws an error when subtracting a larger amount', () => {
    const money1 = Money.fromCents(300);
    const money2 = Money.fromCents(500);

    expect(() => money1.subtract(money2)).toThrow(
      InsufficientMoneyAmountException
    );
  });

  it('subtracts an equal Money instance resulting in zero', () => {
    const money1 = Money.fromCents(500);
    const money2 = Money.fromCents(500);

    const result = money1.subtract(money2);

    expect(result.toNumber()).toBe(0);
    expect(result.toBRL()).toBe('R$0.00');
  });

  it('isZero method should return true when the amount is zero', () => {
    const money = Money.fromCents(0);

    expect(money.isZero()).toBe(true);
  });

  it('isZero method should return false when the amount is greater than zero', () => {
    const money = Money.fromCents(100);

    expect(money.isZero()).toBe(false);
  });
});

import { Money } from '../../../value-objects/money';
import {
  AccountNumber,
  UserId,
} from '../../../value-objects/unique-identifiers';
import {
  CannotReleaseMoreThanReservedException,
  InsufficientAvailableBalanceException,
  InsufficientFundsException,
} from '../exceptions';

export type AccountAttributes = {
  accountNumber: AccountNumber;
  ownerId: UserId;
  balance: Money;
  reservedAmount: Money;
};

export class Account {
  private readonly _accountNumber: AccountNumber;
  private readonly _ownerId: UserId;
  private _balance: Money;
  private _reservedAmount: Money;

  private constructor(accountAttributes: AccountAttributes) {
    const { accountNumber, ownerId, balance, reservedAmount } =
      accountAttributes;

    this._accountNumber = accountNumber;
    this._ownerId = ownerId;
    this._balance = balance;
    this._reservedAmount = reservedAmount;
  }

  static create(accountAttributes: AccountAttributes): Account {
    return new Account(accountAttributes);
  }

  static restore(accountAttributes: AccountAttributes): Account {
    return new Account(accountAttributes);
  }

  deposit(amount: Money): Money {
    this._balance = this._balance.add(amount);
    return this._balance;
  }

  withdraw(amount: Money): Money {
    if (this.getAvailableBalance().isLessThan(amount)) {
      throw new InsufficientFundsException();
    }

    this._balance = this._balance.subtract(amount);
    return this._balance;
  }

  reserve(amount: Money) {
    if (this.getAvailableBalance().isLessThan(amount)) {
      throw new InsufficientAvailableBalanceException();
    }

    this._reservedAmount = this._reservedAmount.add(amount);
  }

  release(amount: Money) {
    if (this._reservedAmount.isLessThan(amount)) {
      throw new CannotReleaseMoreThanReservedException();
    }

    this._reservedAmount = this._reservedAmount.subtract(amount);
  }

  getAvailableBalance(): Money {
    return this._balance.subtract(this._reservedAmount);
  }

  get accountNumber(): AccountNumber {
    return this._accountNumber;
  }

  get ownerId(): UserId {
    return this._ownerId;
  }

  get balance(): Money {
    return this._balance;
  }

  get reservedAmount(): Money {
    return this._reservedAmount;
  }
}

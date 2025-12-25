import { Money } from '../../../value-objects/money';
import {
  AccountNumber,
  UserId,
} from '../../../value-objects/unique-identifiers';
import { InsufficientFundsException } from '../exceptions';

export type AccountAttributes = {
  accountNumber: AccountNumber;
  ownerId: UserId;
  balance: Money;
};

export class Account {
  private readonly _accountNumber: AccountNumber;
  private readonly _ownerId: UserId;
  private _balance: Money;

  private constructor(accountAttributes: AccountAttributes) {
    const { accountNumber, ownerId, balance } = accountAttributes;

    this._accountNumber = accountNumber;
    this._ownerId = ownerId;
    this._balance = balance;
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
    const insufficientFunds = this._balance.toNumber() < amount.toNumber();

    if (insufficientFunds) {
      throw new InsufficientFundsException();
    }

    this._balance = this._balance.subtract(amount);
    return this._balance;
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
}

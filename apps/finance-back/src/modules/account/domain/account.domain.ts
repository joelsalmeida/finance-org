import { Money } from '../../../value-objects/money';
import {
  AccountNumber,
  UserId,
} from '../../../value-objects/unique-identifiers';

export type AccountAttributes = {
  accountNumber: AccountNumber;
  ownerId: UserId;
  balance: Money;
};

export class Account {
  private readonly _accountNumber: AccountNumber;
  private readonly _ownerId: UserId;
  private readonly _balance: Money;

  private constructor(accountAttributes: AccountAttributes) {
    const { accountNumber, ownerId, balance } = accountAttributes;

    this._accountNumber = accountNumber;
    this._ownerId = ownerId;
    this._balance = balance;
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

  static create(accountAttributes: AccountAttributes): Account {
    return new Account(accountAttributes);
  }
}

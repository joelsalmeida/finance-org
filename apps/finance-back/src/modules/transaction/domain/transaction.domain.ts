import { Category } from '../../../value-objects/category';
import { Money } from '../../../value-objects/money';
import {
  AccountNumber,
  TransactionId,
} from '../../../value-objects/unique-identifiers';
import {
  TransactionToTheSameAccountException,
  TransactionWithInvalidAmountException,
} from '../exceptions';

export type TransactionAttributes = {
  id: TransactionId;
  sourceAccountNumber: AccountNumber;
  destinationAccountNumber: AccountNumber;
  category: Category;
  date: Date;
  amount: Money;
};

export class Transaction {
  private readonly _id: TransactionId;
  private readonly _sourceAccountNumber: AccountNumber;
  private readonly _destinationAccountNumber: AccountNumber;
  private readonly _amount: Money;
  private readonly _category: Category;
  private readonly _date: Date;

  private constructor(transactionAttributes: TransactionAttributes) {
    const {
      id,
      sourceAccountNumber,
      destinationAccountNumber,
      amount,
      category,
      date,
    } = transactionAttributes;

    this.validateSourceAndDestination(
      sourceAccountNumber,
      destinationAccountNumber
    );

    this.validateAmount(amount);

    this._id = id;
    this._sourceAccountNumber = sourceAccountNumber;
    this._destinationAccountNumber = destinationAccountNumber;
    this._amount = amount;
    this._category = category;
    this._date = date;
  }

  private validateSourceAndDestination(
    sourceAccountNumber: AccountNumber,
    destinationAccountNumber: AccountNumber
  ) {
    if (sourceAccountNumber.equals(destinationAccountNumber)) {
      throw new TransactionToTheSameAccountException();
    }
  }

  private validateAmount(amount: Money) {
    if (amount.isZero()) {
      throw new TransactionWithInvalidAmountException();
    }
  }

  static createTransaction(
    transactionAttributes: TransactionAttributes
  ): Transaction {
    const {
      id,
      sourceAccountNumber,
      destinationAccountNumber,
      amount,
      category,
      date,
    } = transactionAttributes;

    return new Transaction({
      id,
      sourceAccountNumber,
      destinationAccountNumber,
      amount,
      category,
      date,
    });
  }

  get id(): TransactionId {
    return this._id;
  }

  get sourceAccountNumber(): AccountNumber {
    return this._sourceAccountNumber;
  }

  get destinationAccountNumber(): AccountNumber {
    return this._destinationAccountNumber;
  }

  get category(): Category {
    return this._category;
  }

  get date(): Date {
    return new Date(this._date.getTime());
  }

  get amount(): Money {
    return this._amount;
  }
}

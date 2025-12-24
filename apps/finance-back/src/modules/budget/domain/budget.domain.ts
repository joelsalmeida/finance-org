import {
  AccountNumber,
  BudgetId,
  Category,
  Money,
} from '../../../value-objects';

export type BudgetAttributes = {
  id: BudgetId;
  accountNumber: AccountNumber;
  category: Category;
  limit: Money;
  spent: Money;
};

export class Budget {
  private readonly _id: BudgetId;
  private readonly _accountNumber: AccountNumber;
  private readonly _category: Category;
  private readonly _limit: Money;
  private _spent: Money;

  private constructor(budgetAttributes: BudgetAttributes) {
    const { id, accountNumber, category, limit, spent } = budgetAttributes;

    this._id = id;
    this._accountNumber = accountNumber;
    this._category = category;
    this._limit = limit;
    this._spent = spent;
  }

  static create(budgetAttributes: BudgetAttributes) {
    return new Budget(budgetAttributes);
  }

  addSpend(amount: Money): Money {
    this._spent = this._spent.add(amount);
    return this._spent;
  }

  get id(): BudgetId {
    return this._id;
  }

  get accountNumber(): AccountNumber {
    return this._accountNumber;
  }

  get category(): Category {
    return this._category;
  }

  get limit(): Money {
    return this._limit;
  }

  get spent(): Money {
    return this._spent;
  }
}

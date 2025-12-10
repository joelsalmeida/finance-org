import { Category, Money } from '../../../value-objects';

export type BudgetAttributes = {
  category: Category;
  limit: Money;
};

export class Budget {
  private readonly _category: Category;
  private readonly _limit: Money;
  private _spent: Money;

  private constructor(budgetAttributes: BudgetAttributes) {
    const { category, limit } = budgetAttributes;

    this._category = category;
    this._limit = limit;
  }

  static create(budgetAttributes: BudgetAttributes) {
    return new Budget(budgetAttributes);
  }

  addSpend(amount: Money): Money {
    const newSpentValue = this._spent.add(amount);
    return newSpentValue;
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

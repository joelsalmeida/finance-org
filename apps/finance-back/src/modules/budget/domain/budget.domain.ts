import { Category, Money } from '../../../value-objects';

export type BudgetAttributes = {
  category: Category;
  maxSpentAmount: Money;
};

export class Budget {
  private readonly _category: Category;
  private readonly _maxSpentAmount: Money;

  private constructor(budgetAttributes: BudgetAttributes) {
    const { category, maxSpentAmount } = budgetAttributes;

    this._category = category;
    this._maxSpentAmount = maxSpentAmount;
  }

  static create(budgetAttributes: BudgetAttributes) {
    return new Budget(budgetAttributes);
  }

  get category(): Category {
    return this._category;
  }

  get maxSpentAmount(): Money {
    return this._maxSpentAmount;
  }
}

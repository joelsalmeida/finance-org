import { Transaction } from '../../modules/transaction/domain';

import {
  AccountNumber,
  Category,
  Money,
  TransactionId,
} from '../../value-objects';

import { CategoryNameType } from '../../value-objects/category/index.types';

export class TransactionTestBuilder {
  private id: TransactionId = TransactionId.fromString(
    '29a98792-1156-424f-b9a7-ebba9478aa3d'
  );

  private sourceAccountNumber: AccountNumber =
    AccountNumber.fromString('7400-3287-7395');

  private destinationAccountNumber: AccountNumber =
    AccountNumber.fromString('8057-9491-6924');

  private amount: Money = Money.fromCents(100_00);

  private category: Category = Category.fromName(
    'Education' as CategoryNameType
  );

  private date: Date = new Date('2024-01-01T00:00:00Z');

  withId(id: string): this {
    this.id = TransactionId.fromString(id);
    return this;
  }

  withSourceAccount(account: string): this {
    this.sourceAccountNumber = AccountNumber.fromString(account);
    return this;
  }

  withDestinationAccount(account: string): this {
    this.destinationAccountNumber = AccountNumber.fromString(account);
    return this;
  }

  withAmount(cents: number): this {
    this.amount = Money.fromCents(cents);
    return this;
  }

  withCategory(category: CategoryNameType): this {
    this.category = Category.fromName(category);
    return this;
  }

  withDate(date: Date): this {
    this.date = date;
    return this;
  }

  build(): Transaction {
    return Transaction.restore({
      id: this.id,
      sourceAccountNumber: this.sourceAccountNumber,
      destinationAccountNumber: this.destinationAccountNumber,
      amount: this.amount,
      category: this.category,
      date: this.date,
    });
  }
}

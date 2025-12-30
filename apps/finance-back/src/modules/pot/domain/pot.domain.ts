import { AccountNumber, Money } from '../../../value-objects';
import { PotId } from '../../../value-objects/unique-identifiers';

export type PotCreationAttributes = {
  accountNumber: AccountNumber;
  name: string;
  goalAmount: Money;
};

export type PotAttributes = {
  id: PotId;
  accountNumber: AccountNumber;
  name: string;
  goalAmount: Money;
  allocated: Money;
};

export class Pot {
  private readonly _id: PotId;
  private readonly _accountNumber: AccountNumber;
  private _name: string;
  private _goalAmount: Money;
  private _allocated: Money;

  private constructor(potAttributes: PotAttributes) {
    const { id, accountNumber, name, goalAmount, allocated } = potAttributes;

    this._id = id;
    this._accountNumber = accountNumber;
    this._name = name;
    this._goalAmount = goalAmount;
    this._allocated = allocated;
  }

  static create(potAttributes: PotCreationAttributes): Pot {
    const { accountNumber, name, goalAmount } = potAttributes;

    return new Pot({
      id: PotId.create(),
      accountNumber,
      name,
      goalAmount,
      allocated: Money.fromCents(0),
    });
  }

  static restore(potAttributes: PotAttributes): Pot {
    return new Pot(potAttributes);
  }

  allocate(amount: Money): Money {
    this._allocated = this._allocated.add(amount);
    return this._allocated;
  }

  deallocate(amount: Money): Money {
    this._allocated = this._allocated.subtract(amount);
    return this._allocated;
  }

  get id(): PotId {
    return this._id;
  }

  get accountNumber(): AccountNumber {
    return this._accountNumber;
  }

  get name(): string {
    return this._name;
  }

  get goalAmount(): Money {
    return this._goalAmount;
  }

  get allocated(): Money {
    return this._allocated;
  }
}

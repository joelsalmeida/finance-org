import { AccountNumber, Money } from '../../../value-objects';
import { PotId } from '../../../value-objects/unique-identifiers';

export type PotAttributes = {
  sourceAccountNumber: AccountNumber;
  name: string;
  goalAmount: Money;
};

export class Pot {
  private readonly _id: PotId;
  private readonly _sourceAccountNumber: AccountNumber;
  private _name: string;
  private _goalAmount: Money;
  private _allocated: Money;

  private constructor(potAttributes: PotAttributes) {
    const { sourceAccountNumber, name, goalAmount } = potAttributes;

    this._id = PotId.create();
    this._sourceAccountNumber = sourceAccountNumber;
    this._name = name;
    this._goalAmount = goalAmount;
    this._allocated = Money.fromCents(0);
  }

  static create(potAttributes: PotAttributes): Pot {
    const { sourceAccountNumber, name, goalAmount } = potAttributes;
    return new Pot({ sourceAccountNumber, name, goalAmount });
  }

  allocate(amount: Money): Money {
    const newAllocatedValue = this._allocated.add(amount);
    return newAllocatedValue;
  }

  deallocate(amount: Money): Money {
    const newAllocatedValue = this._allocated.subtract(amount);
    return newAllocatedValue;
  }

  get id(): PotId {
    return this._id;
  }

  get sourceAccountNumber(): AccountNumber {
    return this._sourceAccountNumber;
  }

  get name(): string {
    return this._name;
  }

  get goalAmount(): Money {
    return this._goalAmount;
  }

  get savedAmount(): Money {
    return this._allocated;
  }
}

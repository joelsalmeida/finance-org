import { Pot } from '../../modules/pot/domain/pot.domain';
import { AccountNumber } from '../../value-objects';
import { Money } from '../../value-objects/money';
import { PotId } from '../../value-objects/unique-identifiers';

export class PotTestBuilder {
  private id: PotId = PotId.fromString('3f8b2a2e-0b6c-4b4f-9a8a-1d3e2f4c5b6a');

  private accountNumber: AccountNumber =
    AccountNumber.fromString('7400-3287-7395');

  private name = 'Emergency Fund';

  private goalAmount: Money = Money.fromCents(1_000_00);

  private allocated: Money = Money.fromCents(0);

  withId(id: string): this {
    this.id = PotId.fromString(id);
    return this;
  }

  withAccountNumber(accountNumber: string): this {
    this.accountNumber = AccountNumber.fromString(accountNumber);
    return this;
  }

  withName(name: string): this {
    this.name = name;
    return this;
  }

  withGoalAmount(cents: number): this {
    this.goalAmount = Money.fromCents(cents);
    return this;
  }

  withAllocated(cents: number): this {
    this.allocated = Money.fromCents(cents);
    return this;
  }

  build(): Pot {
    return Pot.restore({
      id: this.id,
      accountNumber: this.accountNumber,
      name: this.name,
      goalAmount: this.goalAmount,
      allocated: this.allocated,
    });
  }
}

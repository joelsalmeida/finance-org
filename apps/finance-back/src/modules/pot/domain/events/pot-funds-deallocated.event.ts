import { AccountNumber, Money, PotId } from '../../../../value-objects';

export class PotFundsDeallocatedEvent {
  constructor(
    public readonly potId: PotId,
    public readonly accountNumber: AccountNumber,
    public readonly amount: Money,
    public readonly occurredAt: Date
  ) {}
}

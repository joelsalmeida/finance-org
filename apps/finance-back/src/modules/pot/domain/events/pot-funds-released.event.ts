import { AccountNumber, PotId } from '../../../../value-objects';

export class PotFundsReleasedEvent {
  constructor(
    public readonly potId: PotId,
    public readonly accountNumber: AccountNumber,
    public readonly occurredAt: Date
  ) {}
}

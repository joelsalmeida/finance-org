import {
  AccountNumber,
  Category,
  Money,
  TransactionId,
} from '../../../../value-objects';

export class TransactionCreatedEvent {
  constructor(
    public readonly transactionId: TransactionId,
    public readonly sourceAccountNumber: AccountNumber,
    public readonly destinationAccountNumber: AccountNumber,
    public readonly category: Category,
    public readonly amount: Money,
    public readonly occurredAt: Date
  ) {}
}

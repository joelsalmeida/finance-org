import { UowOptions } from '../../../shared/application/ports/out';
import { Transaction } from '../../domain/transaction.domain';

export abstract class TransactionPersistencePort {
  abstract save(transaction: Transaction, options?: UowOptions): Promise<void>;
}

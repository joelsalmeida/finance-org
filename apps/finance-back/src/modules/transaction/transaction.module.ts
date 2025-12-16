import { Module, Provider } from '@nestjs/common';
import { TransactionFactory } from './application/factories/transaction.factory';
import {
  TransactionMapper,
  TransactionPersistenceAdapter,
} from './infrastructure/persistence';
import { TransactionPersistencePort } from './ports/out';

export const TransactionProviders: Provider[] = [
  { provide: TransactionPersistencePort, useClass: TransactionPersistenceAdapter },
  { provide: 'transactionFactory', useClass: TransactionFactory },
  { provide: 'TransactionMapper', useClass: TransactionMapper },
];

@Module({
  providers: [...TransactionProviders],
  exports: [...TransactionProviders],
})
export class TransactionModule { }

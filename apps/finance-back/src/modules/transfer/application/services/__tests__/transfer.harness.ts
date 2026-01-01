import { jest } from '@jest/globals';
import { AccountPersistencePort } from '../../../../account/ports/out';
import {
  UnitOfWorkPort,
  UowOptions,
} from '../../../../shared/application/ports/out';
import { TransactionFactoryInterface } from '../../../../transaction/application/factories/transaction.factory.types';
import { TransactionPersistencePort } from '../../../../transaction/ports/out';
import { TransferService } from '../transfer.service';

const execute: UnitOfWorkPort['execute'] = async <T>(
  work: (options: UowOptions) => Promise<T>
) => {
  return work({ transactionContext: 'tx', lockMode: undefined });
};

export const buildTransferHarness = () => {
  const uow = {
    execute: jest.fn(execute),
  } as UnitOfWorkPort & { execute: jest.Mock };

  const accountRepo: jest.Mocked<AccountPersistencePort> = {
    save: jest.fn(),
    findByOwnerId: jest.fn(),
    findByAccountNumber: jest.fn(),
  };

  const transactionRepo: jest.Mocked<TransactionPersistencePort> = {
    save: jest.fn(),
  };

  const transactionFactory: jest.Mocked<TransactionFactoryInterface> = {
    create: jest.fn(),
  };

  const eventEmitter = { emit: jest.fn() };

  const service = new TransferService(
    uow,
    accountRepo,
    transactionRepo,
    transactionFactory,
    eventEmitter as any
  );

  return {
    service,
    uow,
    accountRepo,
    transactionRepo,
    transactionFactory,
    eventEmitter,
  };
};

import { jest } from '@jest/globals';
import { AccountPersistencePort } from '../../../../../account/ports/out';
import { PotPersistencePort } from '../../../../../pot/ports/out';
import {
  UnitOfWorkPort,
  UowOptions,
} from '../../../../../shared/application/ports/out';
import { AllocateFundsToPotOrchestrationService } from '../../allocate-funds-to-pot.orchestration.service';
import { DeallocateFundsFromPotOrchestrationService } from '../../deallocate-funds-to-pot.orchestration.service';
import { RemovePotOrchestrationService } from '../../remove-pot.orchestration.service';

const execute: UnitOfWorkPort['execute'] = async <T>(
  work: (options: UowOptions) => Promise<T>
) => {
  return work({ transactionContext: 'tx', lockMode: undefined });
};

export const buildPotOrchestrationHarness = () => {
  const uow = {
    execute: jest.fn(execute),
  } as UnitOfWorkPort & { execute: jest.Mock };

  const accountRepo: jest.Mocked<AccountPersistencePort> = {
    save: jest.fn(),
    findByOwnerId: jest.fn(),
    findByAccountNumber: jest.fn(),
  };

  const potRepo: jest.Mocked<PotPersistencePort> = {
    save: jest.fn(),
    findById: jest.fn(),
    findByAccountNumber: jest.fn(),
    delete: jest.fn(),
  };

  const eventEmitter = { emit: jest.fn() };

  const allocateService = new AllocateFundsToPotOrchestrationService(
    uow,
    potRepo,
    accountRepo,
    eventEmitter as any
  );

  const deallocateService = new DeallocateFundsFromPotOrchestrationService(
    uow,
    potRepo,
    accountRepo,
    eventEmitter as any
  );

  const removeService = new RemovePotOrchestrationService(
    uow,
    potRepo,
    accountRepo,
    eventEmitter as any
  );

  return {
    allocateService,
    deallocateService,
    removeService,
    uow,
    accountRepo,
    potRepo,
    eventEmitter,
  };
};

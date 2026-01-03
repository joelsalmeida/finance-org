import { Module, Provider } from '@nestjs/common';

import {
  AccountMapper,
  AccountPersistenceAdapter,
  LockMapper,
} from '../account/infrastructure/persistence';

import { AccountPersistencePort } from '../account/ports/out';
import {
  PotMapper,
  PotPersistenceAdapter,
} from '../pot/infrastructure/persistence';
import { PotPersistencePort } from '../pot/ports/out';
import { UnitOfWorkPort } from '../shared/application/ports/out';
import { SequelizeUnitOfWork } from '../shared/infrastructure/persistence/uow';
import { SharedModule } from '../shared/shared.module';
import {
  AllocateFundsToPotOrchestrationService,
  DeallocateFundsFromPotOrchestrationService,
  RemovePotOrchestrationService,
} from './application/services';

import {
  AllocateFundsToPotUseCase,
  DeallocateFundsFromPotUseCase,
  RemovePotUseCase,
} from './application/usecases';
import { FundsAllocationController } from './controllers/funds-allocation.controller';

export const FundsAllocationProviders: Provider[] = [
  { provide: UnitOfWorkPort, useClass: SequelizeUnitOfWork },
  {
    provide: AllocateFundsToPotUseCase,
    useClass: AllocateFundsToPotOrchestrationService,
  },
  {
    provide: DeallocateFundsFromPotUseCase,
    useClass: DeallocateFundsFromPotOrchestrationService,
  },
  {
    provide: RemovePotUseCase,
    useClass: RemovePotOrchestrationService,
  },
  { provide: PotPersistencePort, useClass: PotPersistenceAdapter },
  { provide: AccountPersistencePort, useClass: AccountPersistenceAdapter },
  { provide: 'LockMapper', useClass: LockMapper },
  { provide: 'PotMapper', useClass: PotMapper },
  { provide: 'AccountMapper', useClass: AccountMapper },
];

@Module({
  imports: [SharedModule],
  providers: [...FundsAllocationProviders],
  controllers: [FundsAllocationController],
  exports: [...FundsAllocationProviders],
})
export class FundsAllocationModule {}

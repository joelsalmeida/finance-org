import { Module, Provider } from '@nestjs/common';
import { LockMapper } from '../account/infrastructure/persistence';
import { UnitOfWorkPort } from '../shared/application/ports/out';
import { SequelizeUnitOfWork } from '../shared/infrastructure/persistence/uow';
import { SharedModule } from '../shared/shared.module';
import { PotFactory } from './application/factories';
import { FindPotByAccountService } from './application/services';
import { CreatePotService } from './application/services/create-pot.service';
import { PotMapper, PotPersistenceAdapter } from './infrastructure/persistence';

import {
  CreatePotUseCase,
  FindPotsByAccountUseCase,
} from './application/usecases';

import { PotsController } from './controllers/pot.controller';
import { PotPersistencePort } from './ports/out';

export const PotProviders: Provider[] = [
  { provide: UnitOfWorkPort, useClass: SequelizeUnitOfWork },
  { provide: CreatePotUseCase, useClass: CreatePotService },
  {
    provide: FindPotsByAccountUseCase,
    useClass: FindPotByAccountService,
  },
  { provide: PotPersistencePort, useClass: PotPersistenceAdapter },
  { provide: 'PotFactory', useClass: PotFactory },
  { provide: 'PotMapper', useClass: PotMapper },
  { provide: 'LockMapper', useClass: LockMapper },
];

@Module({
  imports: [SharedModule],
  providers: [...PotProviders],
  controllers: [PotsController],
  exports: [...PotProviders],
})
export class PotModule {}

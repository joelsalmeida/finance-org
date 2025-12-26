import { Module, Provider } from '@nestjs/common';
import { BudgetFactory } from './application/factories';

import {
  BudgetMapper,
  BudgetPersistenceAdapter,
} from './infrastructure/persistence';

import { LockMapper } from '../account/infrastructure/persistence';
import { UnitOfWorkPort } from '../shared/application/ports/out';
import { SequelizeUnitOfWork } from '../shared/infrastructure/persistence/uow';
import { SharedModule } from '../shared/shared.module';
import { TransactionCreatedHandler } from './application/event-handlers';
import { FindBudgetByEmailService } from './application/services';
import { CreateBudgetService } from './application/services/save-budget.service';
import {
  CreateBudgetUseCase,
  FindBudgetsByAccountNumberUseCase,
} from './application/usecases';
import { BudgetsController } from './controllers/budget.controller';
import { BudgetPersistencePort } from './ports/out';

export const BudgetProviders: Provider[] = [
  { provide: UnitOfWorkPort, useClass: SequelizeUnitOfWork },
  { provide: CreateBudgetUseCase, useClass: CreateBudgetService },
  {
    provide: FindBudgetsByAccountNumberUseCase,
    useClass: FindBudgetByEmailService,
  },
  { provide: BudgetPersistencePort, useClass: BudgetPersistenceAdapter },
  { provide: 'BudgetFactory', useClass: BudgetFactory },
  { provide: 'BudgetMapper', useClass: BudgetMapper },
  { provide: 'LockMapper', useClass: LockMapper },
];

@Module({
  imports: [SharedModule],
  providers: [...BudgetProviders, TransactionCreatedHandler],
  controllers: [BudgetsController],
  exports: [...BudgetProviders],
})
export class BudgetModule {}

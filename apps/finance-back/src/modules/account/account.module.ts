import { Module, Provider } from '@nestjs/common';
import { UnitOfWorkPort } from '../shared/application/ports/out';
import { SequelizeUnitOfWork } from '../shared/infrastructure/persistence/uow';
import { AccountFactory } from './application/factories';
import {
  CreateAccountService,
  FindAccountByOwnerIdService,
} from './application/services';
import {
  CreateAccountUseCase,
  FindAccountByOwnerIdUseCase,
} from './application/use-cases';
import { AccountsController } from './controllers';
import {
  AccountMapper,
  AccountPersistenceAdapter,
  LockMapper,
} from './infrastructure/persistence';
import { AccountPersistencePort } from './ports/out/account-persistence.port';

export const AccountProviders: Provider[] = [
  { provide: UnitOfWorkPort, useClass: SequelizeUnitOfWork },
  { provide: CreateAccountUseCase, useClass: CreateAccountService },
  {
    provide: FindAccountByOwnerIdUseCase,
    useClass: FindAccountByOwnerIdService,
  },
  { provide: AccountPersistencePort, useClass: AccountPersistenceAdapter },
  { provide: 'AccountMapper', useClass: AccountMapper },
  { provide: 'LockMapper', useClass: LockMapper },
  { provide: 'AccountFactory', useClass: AccountFactory },
];

@Module({
  providers: [...AccountProviders],
  controllers: [AccountsController],
  exports: [...AccountProviders],
})
export class AccountModule {}

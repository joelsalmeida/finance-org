import { Module, Provider } from '@nestjs/common';
import { AccountFactory } from './application/factories';
import {
  CreateAccountService,
  FindAccountByOwnerIdService,
} from './application/services';
import {
  CreateAccountUseCase,
  FindAccountByOwnerIdUseCase,
} from './application/use-cases';
import {
  CreateAccountController,
  FindAccountByOwnerIdController,
} from './controllers';
import {
  AccountMapper,
  AccountPersistenceAdapter,
  LockMapper,
} from './infrastructure/persistence';
import { AccountPersistencePort } from './ports/out/account-persistence.port';

export const AccountProviders: Provider[] = [
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
  controllers: [CreateAccountController, FindAccountByOwnerIdController],
  exports: [...AccountProviders],
})
export class AccountModule { }

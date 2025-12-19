import { Inject, Injectable } from '@nestjs/common';
import { Account } from '../../domain/account.domain';
import { AccountPersistencePort } from '../../ports/out/account-persistence.port';
import { CreateAccountCommand } from '../commands';
import { AccountFactoryInterface } from '../factories/account.factory.types';
import { CreateAccountUseCase } from '../use-cases';

@Injectable()
export class CreateAccountService implements CreateAccountUseCase {
  constructor(
    private accountPersistencePort: AccountPersistencePort,
    @Inject('AccountFactory') private accountFactory: AccountFactoryInterface
  ) {}

  async execute(command: CreateAccountCommand): Promise<void> {
    const accountCreationResult = this.accountFactory.create(command);

    // TODO: Define a custom domain error
    if ('error' in accountCreationResult) {
      throw new Error(accountCreationResult.error.message);
    }

    const accountToPersist: Account = accountCreationResult.data;
    await this.accountPersistencePort.save(accountToPersist);
  }
}

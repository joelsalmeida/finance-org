import { Injectable } from '@nestjs/common';
import { Account } from '../../domain/account.domain';
import { AccountPersistencePort } from '../../ports/out/account-persistence.port';
import { FindAccountByOwnerIdCommand } from '../commands';
import { FindAccountByOwnerIdUseCase } from '../use-cases';

@Injectable()
export class FindAccountByOwnerIdService
  implements FindAccountByOwnerIdUseCase
{
  constructor(private accountPersistencePort: AccountPersistencePort) {}

  async findAccountByOwnerId(
    command: FindAccountByOwnerIdCommand
  ): Promise<Account> {
    const accountFound = await this.accountPersistencePort.findAccountByOwnerId(
      command.ownerId
    );
    return accountFound;
  }
}

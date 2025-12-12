import { Account } from '../../domain/account.domain';
import { FindAccountByOwnerIdCommand } from '../commands';

export abstract class FindAccountByOwnerIdUseCase {
  abstract findAccountByOwnerId(
    command: FindAccountByOwnerIdCommand
  ): Promise<Account>;
}

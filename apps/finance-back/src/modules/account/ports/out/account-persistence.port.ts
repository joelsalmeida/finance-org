import { UowOptions } from '../../../shared/application/ports/out';
import { Account } from '../../domain/account.domain';

// TODO: Refactor to return domain or null.
// This pattern should be applied to all persistence ports.
export abstract class AccountPersistencePort {
  abstract save(account: Account, options?: UowOptions): Promise<void>;

  abstract findByOwnerId(id: string, options?: UowOptions): Promise<Account>;

  abstract findByAccountNumber(
    accountNumber: string,
    options?: UowOptions
  ): Promise<Account>;
}

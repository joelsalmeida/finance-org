import { Account } from '../../domain/account.domain';

export abstract class AccountPersistencePort {
  abstract save(account: Account): Promise<void>;
  abstract findAccountByOwnerId(id: string): Promise<Account>;
}

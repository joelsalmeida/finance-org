import { Inject, Injectable } from '@nestjs/common';
import { AccountEntity, AccountMapper } from '.';
import { Account } from '../../domain/account.domain';
import { AccountPersistencePort } from '../../ports/out/account-persistence.port';

@Injectable()
export class AccountPersistenceAdapter implements AccountPersistencePort {
  constructor(
    @Inject('AccountMapper')
    private readonly accountMapper: AccountMapper
  ) {}

  async save(account: Account): Promise<void> {
    const accountEntity: AccountEntity = this.accountMapper.toEntity(account);
    await accountEntity.save();
  }

  async findAccountByOwnerId(ownerId: string): Promise<Account> {
    const accountEntity = await AccountEntity.findOne({ where: { ownerId } });

    if (!accountEntity) {
      // TODO: Define a custom domain error
      throw new Error('Account not found.');
    }

    const accountDomain = this.accountMapper.toDomain(accountEntity);
    return accountDomain;
  }
}

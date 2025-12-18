import { Inject, Injectable } from '@nestjs/common';
import { Transaction as SequelizeTransaction } from 'sequelize';
import { AccountEntity, AccountMapper, LockMapper } from '.';
import { UowOptions } from '../../../shared/application/ports/out';
import { Account } from '../../domain/account.domain';
import { AccountPersistencePort } from '../../ports/out/account-persistence.port';

@Injectable()
export class AccountPersistenceAdapter implements AccountPersistencePort {
  constructor(
    @Inject('AccountMapper')
    private readonly accountMapper: AccountMapper,
    @Inject('LockMapper')
    private readonly lockMapper: LockMapper
  ) {}

  async save(account: Account, options?: UowOptions): Promise<void> {
    const accountEntityFound: AccountEntity = await AccountEntity.findOne({
      where: { accountNumber: account.accountNumber.toString() },
      ...this.buildQueryOptions(options),
    });

    if (!accountEntityFound) {
      const newAccountEntity = this.accountMapper.toEntity(account);
      await newAccountEntity.save({
        ...this.buildQueryOptions(options),
      });
      return;
    }

    this.accountMapper.mergeIntoEntity(account, accountEntityFound);
    await accountEntityFound.save({ ...this.buildQueryOptions(options) });
  }

  async findByAccountNumber(
    accountNumber: string,
    options?: UowOptions
  ): Promise<Account> {
    const findOptions = {
      where: { accountNumber },
      ...this.buildQueryOptions(options),
    };

    const accountEntity = await AccountEntity.findOne(findOptions);

    if (!accountEntity) {
      // TODO: Return domain or null.
      throw new Error('Account not found.');
    }

    const accountDomain = this.accountMapper.toDomain(accountEntity);
    return accountDomain;
  }

  async findByOwnerId(ownerId: string, options?: UowOptions): Promise<Account> {
    const accountEntity = await AccountEntity.findOne({
      where: { ownerId },
      ...this.buildQueryOptions(options),
    });

    if (!accountEntity) {
      throw new Error('Account not found.');
    }

    const accountDomain = this.accountMapper.toDomain(accountEntity);
    return accountDomain;
  }

  private buildQueryOptions(options?: UowOptions) {
    const transaction = options?.transactionContext as SequelizeTransaction;
    const lock = this.lockMapper.map(options?.lockMode);

    const queryOptions = {
      ...(transaction && { transaction }),
      ...(lock && { lock }),
    };

    return queryOptions;
  }
}

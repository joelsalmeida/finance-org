import { Injectable } from '@nestjs/common';
import { AccountNumber, Money, UserId } from '../../../../value-objects';
import { Account } from '../../domain/account.domain';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountMapper {
  toEntity(account: Account): AccountEntity {
    const accountEntity = new AccountEntity();

    accountEntity.accountNumber = account.accountNumber.toString();
    accountEntity.ownerId = account.ownerId.toValue();
    accountEntity.balance = account.balance.toNumber();

    return accountEntity;
  }

  toDomain(accountEntity: AccountEntity): Account {
    const accountDomain = Account.create({
      accountNumber: AccountNumber.fromString(accountEntity.accountNumber),
      ownerId: UserId.fromString(accountEntity.ownerId),
      balance: Money.fromCents(accountEntity.balance),
    });

    return accountDomain;
  }
}

import { Account } from '../../modules/account/domain/account.domain';
import { Money } from '../../value-objects/money';
import { AccountNumber, UserId } from '../../value-objects/unique-identifiers';

export class AccountTestBuilder {
  private accountNumber: AccountNumber =
    AccountNumber.fromString('7400-3287-7395');

  private ownerId: UserId = UserId.fromString(
    '7b8f5a1e-9c42-4c59-9c9e-1a6d3d3e2f44'
  );

  private balance: Money = Money.fromCents(900_00);

  private reservedAmount: Money = Money.fromCents(0);

  withAccountNumber(accountNumber: string): this {
    this.accountNumber = AccountNumber.fromString(accountNumber);
    return this;
  }

  withOwnerId(ownerId: string): this {
    this.ownerId = UserId.fromString(ownerId);
    return this;
  }

  withBalance(cents: number): this {
    this.balance = Money.fromCents(cents);
    return this;
  }

  withReservedAmount(cents: number): this {
    this.reservedAmount = Money.fromCents(cents);
    return this;
  }

  build(): Account {
    return Account.restore({
      accountNumber: this.accountNumber,
      ownerId: this.ownerId,
      balance: this.balance,
      reservedAmount: this.reservedAmount,
    });
  }
}

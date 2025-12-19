import { Inject, Injectable } from '@nestjs/common';
import { AccountNumber, Category, Money } from '../../../../value-objects';
import { CategoryNameType } from '../../../../value-objects/category/index.types';
import { Account } from '../../../account/domain/account.domain';
import { AccountPersistencePort } from '../../../account/ports/out';
import {
  LOCK_MODE,
  UnitOfWorkPort,
  UowOptions,
} from '../../../shared/application/ports/out';
import { TransactionFactoryInterface } from '../../../transaction/application/factories/transaction.factory.types';
import { Transaction } from '../../../transaction/domain';
import { TransactionPersistencePort } from '../../../transaction/ports/out';
import { TransferCommand } from '../commands';
import { TransferUseCase } from '../use-cases';

type AccountNumbers = { source: string; destination: string };

type LoadAccountsParam = {
  accountNumbers: AccountNumbers;
  options: UowOptions;
};

type PersistenceData = {
  sourceAccount: Account;
  destinationAccount: Account;
  transaction: Transaction;
};

@Injectable()
export class TransferService implements TransferUseCase {
  constructor(
    private uow: UnitOfWorkPort,
    private accountPersistencePort: AccountPersistencePort,
    private transactionPersistencePort: TransactionPersistencePort,
    @Inject('transactionFactory')
    private transactionFactory: TransactionFactoryInterface
  ) {}

  async transfer(command: TransferCommand): Promise<Transaction> {
    const { sourceAccountNumber, destinationAccountNumber, amount, category } =
      command;

    return this.uow.execute(async (options) => {
      const WRITE_OPTIONS: UowOptions = this.withWriteOptions(options);

      const accountNumbers = {
        source: sourceAccountNumber,
        destination: destinationAccountNumber,
      };

      const { sourceAccount, destinationAccount } = await this.loadAccounts({
        accountNumbers,
        options: WRITE_OPTIONS,
      });

      const transactionValue = Money.fromCents(amount);

      sourceAccount.withdraw(transactionValue);
      destinationAccount.deposit(transactionValue);

      const transaction = this.createTransactionOrThrow(
        accountNumbers,
        category,
        transactionValue
      );

      const persistenceData = {
        sourceAccount,
        destinationAccount,
        transaction: transaction.data,
      };

      await this.persist(persistenceData, WRITE_OPTIONS);
      return transaction.data;
    });
  }

  private async persist(persistenceData: PersistenceData, options: UowOptions) {
    await this.accountPersistencePort.save(
      persistenceData.sourceAccount,
      options
    );
    await this.accountPersistencePort.save(
      persistenceData.destinationAccount,
      options
    );
    await this.transactionPersistencePort.save(
      persistenceData.transaction,
      options
    );
  }

  private withWriteOptions(options: UowOptions): UowOptions {
    return {
      transactionContext: options.transactionContext,
      lockMode: LOCK_MODE.WRITE,
    };
  }

  private async loadAccounts({ accountNumbers, options }: LoadAccountsParam) {
    const sourceAccount = await this.accountPersistencePort.findByAccountNumber(
      accountNumbers.source,
      options
    );

    const destinationAccount =
      await this.accountPersistencePort.findByAccountNumber(
        accountNumbers.destination,
        options
      );

    return { sourceAccount, destinationAccount };
  }

  private createTransactionOrThrow(
    accountNumbers: AccountNumbers,
    category: string,
    transactionValue: Money
  ) {
    const createTransactionAttributes = {
      sourceAccountNumber: AccountNumber.fromString(accountNumbers.source),
      destinationAccountNumber: AccountNumber.fromString(
        accountNumbers.destination
      ),
      category: Category.fromName(category as CategoryNameType),
      amount: transactionValue,
    };

    const transaction = this.transactionFactory.create(
      createTransactionAttributes
    );

    const transactionCreationFailed = transaction.success === false;

    if (transactionCreationFailed) {
      throw transaction.error;
    }

    return transaction;
  }
}

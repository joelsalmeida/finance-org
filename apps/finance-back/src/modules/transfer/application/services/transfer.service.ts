import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
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
import { TransactionCreatedEvent } from '../../../transaction/domain/events';
import { TransactionPersistencePort } from '../../../transaction/ports/out';
import { TransferCommand } from '../commands';
import {
  DestinationAccountNotFoundException,
  SourceAccountNotFoundException,
} from '../exceptions';
import { TransferUseCase } from '../use-cases';

type AccountNumbers = { source: string; destination: string };

type LoadAccountsParam = {
  accountNumbers: AccountNumbers;
  options: UowOptions;
};

type TransferPersistenceContext = {
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
    private transactionFactory: TransactionFactoryInterface,
    private eventEmitter: EventEmitter2
  ) {}

  async execute(command: TransferCommand): Promise<Transaction> {
    return this.uow.execute(async (options) => {
      const WRITE_OPTIONS: UowOptions = this.withWriteOptions(options);
      return this.performTransfer(command, WRITE_OPTIONS);
    });
  }

  private async performTransfer(command: TransferCommand, options: UowOptions) {
    const { sourceAccountNumber, destinationAccountNumber, amount, category } =
      command;

    const accountNumbers = {
      source: sourceAccountNumber,
      destination: destinationAccountNumber,
    };

    const { sourceAccount, destinationAccount } =
      await this.loadTransferAccounts({
        accountNumbers,
        options,
      });

    const transactionValue = Money.fromCents(amount);

    sourceAccount.withdraw(transactionValue);
    destinationAccount.deposit(transactionValue);

    const transaction = this.createTransactionOrThrow(
      accountNumbers,
      category,
      transactionValue
    );

    const context: TransferPersistenceContext = {
      sourceAccount,
      destinationAccount,
      transaction,
    };

    await this.persistTransfer(context, options);

    this.publishTransactionCreated(transaction);

    return transaction;
  }

  private async loadTransferAccounts({
    accountNumbers,
    options,
  }: LoadAccountsParam) {
    const sourceAccount = await this.accountPersistencePort.findByAccountNumber(
      accountNumbers.source,
      options
    );

    if (!sourceAccount) {
      throw new SourceAccountNotFoundException(accountNumbers.source);
    }

    const destinationAccount =
      await this.accountPersistencePort.findByAccountNumber(
        accountNumbers.destination,
        options
      );

    if (!destinationAccount) {
      throw new DestinationAccountNotFoundException(accountNumbers.destination);
    }

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

    return transaction.data;
  }

  private async persistTransfer(
    context: TransferPersistenceContext,
    options: UowOptions
  ) {
    // TODO: Refactor this implementation and tests to use bulk save
    await this.accountPersistencePort.save(context.sourceAccount, options);
    await this.accountPersistencePort.save(context.destinationAccount, options);
    await this.transactionPersistencePort.save(context.transaction, options);
  }

  private publishTransactionCreated(eventPayload: Transaction) {
    this.eventEmitter.emit(
      TransactionCreatedEvent.name,
      new TransactionCreatedEvent(
        eventPayload.id,
        eventPayload.sourceAccountNumber,
        eventPayload.destinationAccountNumber,
        eventPayload.category,
        eventPayload.amount,
        new Date()
      )
    );
  }

  private withWriteOptions(options: UowOptions): UowOptions {
    return {
      transactionContext: options.transactionContext,
      lockMode: LOCK_MODE.WRITE,
    };
  }
}

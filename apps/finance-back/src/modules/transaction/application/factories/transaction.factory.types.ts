import { AccountNumber, Category, Money } from '../../../../value-objects';
import {
  FactoryInterface,
  FactoryOutputType,
} from '../../../shared/domain/contracts/factory.types';
import { Transaction } from '../../domain/transaction.domain';

export type CreateTransactionAttributes = {
  sourceAccountNumber: AccountNumber;
  destinationAccountNumber: AccountNumber;
  category: Category;
  amount: Money;
};

export interface TransactionFactoryInterface
  extends FactoryInterface<Transaction, CreateTransactionAttributes> {
  create(
    createTransactionAttributes: CreateTransactionAttributes
  ): FactoryOutputType<Transaction>;
}

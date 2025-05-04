import {
  DomainBaseException,
  UnexpectedFactoryException,
} from '../../../../exceptions';
import { TransactionId } from '../../../../value-objects';
import {
  FactoryOutputType,
  FactorySuccessOutputType,
} from '../../../shared/domain/contracts/factory.types';
import { Transaction } from '../../domain/transaction.domain';
import {
  CreateTransactionAttributes,
  TransactionFactoryInterface,
} from './transaction.factory.types';

export class TransactionFactory implements TransactionFactoryInterface {
  create(
    createTransactionAttributes: CreateTransactionAttributes
  ): FactoryOutputType<Transaction> {
    try {
      const {
        sourceAccountNumber,
        destinationAccountNumber,
        category,
        amount,
      } = createTransactionAttributes;

      const transaction = Transaction.createTransaction({
        id: TransactionId.create(),
        sourceAccountNumber,
        destinationAccountNumber,
        category,
        date: new Date(),
        amount,
      });

      const successOutput: FactorySuccessOutputType<Transaction> = {
        success: true,
        data: transaction,
      };

      return successOutput;
    } catch (error) {
      const failureOutput: FactoryOutputType<Transaction> = {
        success: false,
        error:
          error instanceof DomainBaseException
            ? error
            : new UnexpectedFactoryException(),
      };

      return failureOutput;
    }
  }
}

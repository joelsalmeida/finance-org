import {
  DomainBaseException,
  UnexpectedFactoryException,
} from '../../../../exceptions';
import { AccountNumber, Category, Money } from '../../../../value-objects';
import { Transaction } from '../../domain/transaction.domain';
import { TransactionFactory } from './transaction.factory';
import { CreateTransactionAttributes } from './transaction.factory.types';

const VALID_ACCOUNT_NUMBER = AccountNumber.fromString('1234-5678-9101');
const OTHER_VALID_ACCOUNT_NUMBER = AccountNumber.fromString('4321-8765-1098');
const VALID_CATEGORY = Category.fromName('Entertainment');
const VALID_AMOUNT = Money.fromCents(1000);
const INVALID_AMOUNT = Money.fromCents(0);

describe('TransactionFactory', () => {
  let transactionFactory: TransactionFactory;

  beforeEach(() => {
    transactionFactory = new TransactionFactory();
  });

  it('should create a transaction successfully', () => {
    const createTransactionAttributes: CreateTransactionAttributes = {
      sourceAccountNumber: VALID_ACCOUNT_NUMBER,
      destinationAccountNumber: OTHER_VALID_ACCOUNT_NUMBER,
      category: VALID_CATEGORY,
      amount: VALID_AMOUNT,
    };

    const result = transactionFactory.create(createTransactionAttributes);

    expect(result.success).toBe(true);

    if (result.success === true) {
      expect(result.data).toBeDefined();
      expect(result.data.sourceAccountNumber).toBe(
        createTransactionAttributes.sourceAccountNumber
      );
      expect(result.data.destinationAccountNumber).toBe(
        createTransactionAttributes.destinationAccountNumber
      );
      expect(result.data.category).toBe(createTransactionAttributes.category);
      expect(result.data.amount).toBe(createTransactionAttributes.amount);
    } else {
      fail('Expected result to be a success, but it was a failure');
    }
  });

  it('should return a failure output when an error occurs', () => {
    const createTransactionAttributes: CreateTransactionAttributes = {
      sourceAccountNumber: VALID_ACCOUNT_NUMBER,
      destinationAccountNumber: OTHER_VALID_ACCOUNT_NUMBER,
      category: VALID_CATEGORY,
      amount: INVALID_AMOUNT,
    };

    const result = transactionFactory.create(createTransactionAttributes);

    expect(result.success).toBe(false);

    if ('error' in result) {
      expect(result.error).toBeDefined();
      expect(result.error).toBeInstanceOf(DomainBaseException);
    }
  });

  it('should return an UnexpectedFactoryException for unknown errors', () => {
    jest.spyOn(Transaction, 'createTransaction').mockImplementation(() => {
      throw new Error('Unknown error.');
    });

    const createTransactionAttributes: CreateTransactionAttributes = {
      sourceAccountNumber: VALID_ACCOUNT_NUMBER,
      destinationAccountNumber: OTHER_VALID_ACCOUNT_NUMBER,
      category: VALID_CATEGORY,
      amount: VALID_AMOUNT,
    };

    const result = transactionFactory.create(createTransactionAttributes);

    expect(result.success).toBe(false);

    if ('error' in result) {
      expect(result.error).toBeDefined();
      expect(result.error).toBeInstanceOf(UnexpectedFactoryException);
    }
  });
});

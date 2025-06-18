import { AccountNumber, Category } from '../../../value-objects';
import { Transaction } from '../../transaction/domain/transaction.domain';

export class TransactionList implements Iterable<Transaction> {
  private readonly _transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this._transactions = transactions;
  }

  [Symbol.iterator](): Iterator<Transaction> {
    return this._transactions[Symbol.iterator]();
  }

  addTransaction(transaction: Transaction): void {
    this._transactions.push(transaction);
  }

  getAllTransactions(): Transaction[] {
    return this._transactions;
  }

  sentByAccountNumber(accountNumber: AccountNumber): TransactionList {
    const transactionsSent = this._transactions.filter((transaction) =>
      transaction.sourceAccountNumber.equals(accountNumber)
    );

    return new TransactionList(transactionsSent);
  }

  receivedByAccountNumber(accountNumber: AccountNumber): TransactionList {
    const transactionsReceived = this._transactions.filter((transaction) =>
      transaction.destinationAccountNumber.equals(accountNumber)
    );

    return new TransactionList(transactionsReceived);
  }

  filterByCategory(category: Category): TransactionList {
    const transactionsByCategory = this._transactions.filter((transaction) =>
      transaction.category.equals(category)
    );

    return new TransactionList(transactionsByCategory);
  }
}

import { Injectable } from '@nestjs/common';
import { CategoryNameType } from '../../../..//value-objects/category/index.types';
import { Category, Money } from '../../../../value-objects';
import { AccountNumber, TransactionId } from '../../../../value-objects/unique-identifiers';
import { Transaction } from '../../domain/transaction.domain';
import { TransactionEntity } from './transaction.entity';


@Injectable()
export class TransactionMapper {
  toEntity(transaction: Transaction): TransactionEntity {
    const transactionEntity = new TransactionEntity();

    transactionEntity.id = transaction.id.toString();
    transactionEntity.sourceAccountNumber = transaction.sourceAccountNumber.toString();
    transactionEntity.destinationAccountNumber = transaction.destinationAccountNumber.toString();
    transactionEntity.amount = transaction.amount.toNumber();
    transactionEntity.category = transaction.category.toString();
    transactionEntity.date = transaction.date;

    return transactionEntity;
  }

  toDomain(transactionEntity: TransactionEntity): Transaction {
    const transactionDomain = Transaction.createTransaction({
      id: TransactionId.fromString(transactionEntity.id),
      sourceAccountNumber: AccountNumber.fromString(transactionEntity.sourceAccountNumber),
      destinationAccountNumber: AccountNumber.fromString(transactionEntity.destinationAccountNumber),
      amount: Money.fromCents(transactionEntity.amount),
      category: Category.fromName(transactionEntity.category as CategoryNameType),
      date: transactionEntity.date,
    });

    return transactionDomain;
  }
}

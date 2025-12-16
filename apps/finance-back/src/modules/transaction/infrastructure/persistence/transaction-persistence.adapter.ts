import { Inject, Injectable } from '@nestjs/common';
import { Transaction as SequelizeTransaction } from 'sequelize';
import { TransactionEntity, TransactionMapper } from '.';
import { UowOptions } from '../../../shared/application/ports/out';
import { Transaction } from '../../domain/index';
import { TransactionPersistencePort } from '../../ports/out';

@Injectable()
export class TransactionPersistenceAdapter implements TransactionPersistencePort {
  constructor(
    @Inject('TransactionMapper')
    private readonly transactionMapper: TransactionMapper
  ) { }

  async save(transaction: Transaction, options?: UowOptions): Promise<void> {
    const transactionEntity: TransactionEntity = this.transactionMapper.toEntity(transaction);
    await transactionEntity.save(
      { transaction: options?.transactionContext as SequelizeTransaction }
    );
  }
}

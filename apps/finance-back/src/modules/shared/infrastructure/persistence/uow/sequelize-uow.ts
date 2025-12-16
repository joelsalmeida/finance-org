import { Inject, Injectable } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { UnitOfWorkPort, UowOptions } from '../../../application/ports/out';

@Injectable()
export class SequelizeUnitOfWork implements UnitOfWorkPort {
  constructor(
    @Inject(getConnectionToken())
    private readonly sequelize: Sequelize,
  ) { }

  async execute<T>(work: (options: UowOptions) => Promise<T>): Promise<T> {
    return this.sequelize.transaction(async (transaction) => {
      const options: UowOptions = {
        transactionContext: transaction,
      };

      return work(options);
    });
  }
}

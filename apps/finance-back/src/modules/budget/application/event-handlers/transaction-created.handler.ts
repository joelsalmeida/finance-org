import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
  LOCK_MODE,
  UnitOfWorkPort,
  UowOptions,
} from '../../../shared/application/ports/out';

import { TransactionCreatedEvent } from '../../../transaction/domain/events';
import { BudgetPersistencePort } from '../../ports/out';

@Injectable()
export class TransactionCreatedHandler {
  constructor(
    private readonly budgetPersistencePort: BudgetPersistencePort,
    private readonly uow: UnitOfWorkPort
  ) {}

  @OnEvent(TransactionCreatedEvent.name)
  async handle(event: TransactionCreatedEvent) {
    return await this.uow.execute(async (options) => {
      const WRITE_OPTIONS: UowOptions = {
        transactionContext: options.transactionContext,
        lockMode: LOCK_MODE.WRITE,
      };

      const budget =
        await this.budgetPersistencePort.findByAccountNumberAndCategory(
          event.sourceAccountNumber.toString(),
          event.category.toString(),
          options
        );

      if (!budget) return;

      budget.addSpend(event.amount);
      await this.budgetPersistencePort.save(budget, WRITE_OPTIONS);
    });
  }
}

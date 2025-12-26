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

      const budget = await this.getEventBudget(event, WRITE_OPTIONS);
      if (!budget) return;

      budget.addSpend(event.amount);
      await this.budgetPersistencePort.save(budget, WRITE_OPTIONS);
    });
  }

  private async getEventBudget(
    event: TransactionCreatedEvent,
    options: UowOptions
  ) {
    // TODO: Search only for the specific budget
    // to avoid budget lock-ins that are not related
    const accountBudgets = await this.budgetPersistencePort.findByAccountNumber(
      event.sourceAccountNumber.toString(),
      options
    );

    const eventBudget = accountBudgets.find((budget) =>
      event.category.equals(budget.category)
    );

    return eventBudget;
  }
}

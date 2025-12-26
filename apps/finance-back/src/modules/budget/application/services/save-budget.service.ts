import { Inject, Injectable } from '@nestjs/common';
import { Budget } from '../../domain/budget.domain';
import { BudgetPersistencePort } from '../../ports/out/budget-persistence.port';
import { CreateBudgetCommand } from '../commands';
import { BudgetFactoryInterface } from '../factories';
import { CreateBudgetUseCase } from '../usecases';

@Injectable()
export class CreateBudgetService implements CreateBudgetUseCase {
  constructor(
    private budgetPersistencePort: BudgetPersistencePort,
    @Inject('BudgetFactory') private budgetFactory: BudgetFactoryInterface
  ) {}

  async execute(command: CreateBudgetCommand): Promise<void> {
    const budgetCreationResult = this.budgetFactory.create(command);

    // TODO: Define a custom domain error
    if ('error' in budgetCreationResult) {
      throw new Error(budgetCreationResult.error.message);
    }

    const budgetToPersist: Budget = budgetCreationResult.data;
    await this.budgetPersistencePort.save(budgetToPersist);
  }
}

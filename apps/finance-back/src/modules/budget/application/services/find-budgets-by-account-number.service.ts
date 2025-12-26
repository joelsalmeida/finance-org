import { Injectable } from '@nestjs/common';
import { Budget } from '../../domain/budget.domain';
import { BudgetPersistencePort } from '../../ports/out/budget-persistence.port';
import { FindBudgetsByAccountNumberCommand } from '../commands';
import { FindBudgetsByAccountNumberUseCase } from '../usecases';

@Injectable()
export class FindBudgetByEmailService
  implements FindBudgetsByAccountNumberUseCase
{
  constructor(private budgetPersistencePort: BudgetPersistencePort) {}

  async execute(command: FindBudgetsByAccountNumberCommand): Promise<Budget[]> {
    const budgetFound = await this.budgetPersistencePort.findByAccountNumber(
      command.accountNumber
    );
    return budgetFound;
  }
}

import { Budget } from '../../domain/budget.domain';
import { FindBudgetsByAccountNumberCommand } from '../commands';

export abstract class FindBudgetsByAccountNumberUseCase {
  abstract execute(
    command: FindBudgetsByAccountNumberCommand
  ): Promise<Budget[]>;
}

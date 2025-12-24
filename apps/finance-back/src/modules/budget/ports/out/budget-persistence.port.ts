import { UowOptions } from '../../../shared/application/ports/out';
import { Budget } from '../../domain/budget.domain';

export abstract class BudgetPersistencePort {
  abstract save(budget: Budget, options?: UowOptions): Promise<void>;
  abstract findByAccountNumber(
    accountNumber: string,
    options?: UowOptions
  ): Promise<Budget[]>;
}

import { CreateBudgetCommand } from '../commands';

export abstract class CreateBudgetUseCase {
  abstract execute(command: CreateBudgetCommand): Promise<void>;
}

import {
  FactoryInterface,
  FactoryOutputType,
} from '../../../shared/domain/contracts/factory.types';
import { Budget } from '../../domain/budget.domain';

export type CreateBudgetAttributes = {
  accountNumber: string;
  category: string;
  limit: number;
};

export interface BudgetFactoryInterface
  extends FactoryInterface<Budget, CreateBudgetAttributes> {
  create(
    createBudgetAttributes: CreateBudgetAttributes
  ): FactoryOutputType<Budget>;
}

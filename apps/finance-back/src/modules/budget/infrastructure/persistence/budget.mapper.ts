import { Injectable } from '@nestjs/common';
import {
  AccountNumber,
  BudgetId,
  Category,
  Money,
} from '../../../../value-objects';
import { CategoryNameType } from '../../../../value-objects/category/index.types';
import { Budget } from '../../domain/budget.domain';
import { BudgetEntity } from './budget.entity';

@Injectable()
export class BudgetMapper {
  toEntity(budget: Budget): BudgetEntity {
    const budgetEntity = new BudgetEntity();

    budgetEntity.id = budget.id.toString();
    budgetEntity.accountNumber = budget.accountNumber.toString();
    budgetEntity.category = budget.category.toString();
    budgetEntity.limit = budget.limit.toNumber();
    budgetEntity.spent = budget.spent.toNumber();

    return budgetEntity;
  }

  toDomain(budgetEntity: BudgetEntity): Budget {
    const budgetDomain = Budget.create({
      id: BudgetId.fromString(budgetEntity.id),
      accountNumber: AccountNumber.fromString(budgetEntity.accountNumber),
      category: Category.fromName(budgetEntity.category as CategoryNameType),
      limit: Money.fromCents(budgetEntity.limit),
      spent: Money.fromCents(budgetEntity.spent),
    });

    return budgetDomain;
  }

  mergeIntoEntity(budget: Budget, entity: BudgetEntity) {
    entity.limit = budget.limit.toNumber();
    entity.spent = budget.spent.toNumber();
  }
}

import { Injectable } from '@nestjs/common';

import {
  DomainBaseException,
  UnexpectedFactoryException,
} from '../../../../exceptions';

import { AccountNumber, Category, Money } from '../../../../value-objects';
import { CategoryNameType } from '../../../../value-objects/category/index.types';
import { BudgetId } from '../../../../value-objects/unique-identifiers';

import {
  FactoryFailureOutputType,
  FactoryOutputType,
  FactorySuccessOutputType,
} from '../../../shared/domain/contracts/factory.types';

import { Budget } from '../../domain/budget.domain';

import { BudgetFactoryInterface, CreateBudgetAttributes } from '.';

@Injectable()
export class BudgetFactory implements BudgetFactoryInterface {
  create(
    createBudgetAttributes: CreateBudgetAttributes
  ): FactoryOutputType<Budget> {
    try {
      const { accountNumber, category, limit } = createBudgetAttributes;

      const budgetProps = {
        id: BudgetId.create(),
        accountNumber: AccountNumber.fromString(accountNumber),
        category: Category.fromName(category as CategoryNameType),
        limit: Money.fromCents(limit),
        spent: Money.fromCents(0),
      };

      const successOutput: FactorySuccessOutputType<Budget> = {
        success: true,
        data: Budget.create(budgetProps),
      };

      return successOutput;
    } catch (error) {
      const failureOutput: FactoryFailureOutputType = {
        success: false,
        error:
          error instanceof DomainBaseException
            ? error
            : new UnexpectedFactoryException(),
      };

      return failureOutput;
    }
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Transaction as SequelizeTransaction } from 'sequelize';
import { BudgetEntity, BudgetMapper } from '.';
import { LockMapper } from '../../../account/infrastructure/persistence';
import { UowOptions } from '../../../shared/application/ports/out';
import { Budget } from '../../domain/budget.domain';
import { BudgetPersistencePort } from '../../ports/out/budget-persistence.port';

@Injectable()
export class BudgetPersistenceAdapter implements BudgetPersistencePort {
  constructor(
    @Inject('BudgetMapper')
    private readonly budgetMapper: BudgetMapper,
    @Inject('LockMapper')
    private readonly lockMapper: LockMapper
  ) {}

  async save(budget: Budget, options?: UowOptions): Promise<void> {
    const budgetEntityFound: BudgetEntity = await BudgetEntity.findOne({
      where: { id: budget.id.toString() },
      ...this.buildQueryOptions(options),
    });

    if (!budgetEntityFound) {
      const budgetEntity: BudgetEntity = this.budgetMapper.toEntity(budget);
      await budgetEntity.save({ ...this.buildQueryOptions(options) });
      return;
    }

    this.budgetMapper.mergeIntoEntity(budget, budgetEntityFound);
    await budgetEntityFound.save({ ...this.buildQueryOptions(options) });
  }

  async findByAccountNumber(
    accountNumber: string,
    options?: UowOptions
  ): Promise<Budget[]> {
    const budgetEntities = await BudgetEntity.findAll({
      where: { accountNumber },
      ...this.buildQueryOptions(options),
    });

    const budgets = budgetEntities.map((budget) => {
      return this.budgetMapper.toDomain(budget);
    });

    return budgets;
  }
  // TODO: DRY is crying desperately :(
  private buildQueryOptions(options?: UowOptions) {
    const transaction = options?.transactionContext as SequelizeTransaction;
    const lock = this.lockMapper.map(options?.lockMode);

    const queryOptions = {
      ...(transaction && { transaction }),
      ...(lock && { lock }),
    };

    return queryOptions;
  }
}

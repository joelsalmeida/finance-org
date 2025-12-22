import { v4 as uuidv4 } from 'uuid';
import { isValidUUID } from '../../../modules/shared/domain/utils';
import { InvalidBudgetIdException } from './exceptions';

export class BudgetId {
  private constructor(private readonly id: string) {}

  static create(): BudgetId {
    return new BudgetId(uuidv4());
  }

  private static isValid(id: string): boolean {
    return isValidUUID(id);
  }

  static fromString(id: string): BudgetId {
    if (!this.isValid(id)) {
      throw new InvalidBudgetIdException();
    }

    return new BudgetId(id);
  }

  toString(): string {
    return this.id;
  }

  equals(other: BudgetId): boolean {
    return this.id === other.id;
  }
}

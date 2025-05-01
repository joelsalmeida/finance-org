import { v4 as uuidv4 } from 'uuid';
import { isValidUUID } from '../../../modules/shared/domain/utils';
import { InvalidTransactionIdException } from './exceptions';

export class TransactionId {
  private constructor(private readonly id: string) {}

  static create(): TransactionId {
    return new TransactionId(uuidv4());
  }

  private static isValid(id: string): boolean {
    return isValidUUID(id);
  }

  static fromString(id: string): TransactionId {
    if (!this.isValid(id)) {
      throw new InvalidTransactionIdException();
    }

    return new TransactionId(id);
  }

  toString(): string {
    return this.id;
  }

  equals(other: TransactionId): boolean {
    return this.id === other.id;
  }
}

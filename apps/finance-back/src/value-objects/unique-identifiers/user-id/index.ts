import { v4 as uuidv4 } from 'uuid';
import { isValidUUID } from '../../../modules/shared/domain/utils';
import { InvalidUserIdException } from './exceptions';

export class UserId {
  private constructor(private readonly id: string) {}

  static create(): UserId {
    return new UserId(uuidv4());
  }

  private static isValid(id: string): boolean {
    return isValidUUID(id);
  }

  static fromString(id: string): UserId {
    if (!this.isValid(id)) {
      throw new InvalidUserIdException();
    }

    return new UserId(id);
  }

  toString(): string {
    return this.id;
  }

  equals(other: UserId): boolean {
    return this.id === other.id;
  }
}

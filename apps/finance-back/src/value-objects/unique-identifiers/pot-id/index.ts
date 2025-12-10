import { v4 as uuidv4 } from 'uuid';
import { isValidUUID } from '../../../modules/shared/domain/utils';
import { InvalidPotIdException } from './exceptions';

export class PotId {
  private constructor(private readonly id: string) {}

  static create(): PotId {
    return new PotId(uuidv4());
  }

  private static isValid(id: string): boolean {
    return isValidUUID(id);
  }

  static fromString(id: string): PotId {
    if (!this.isValid(id)) {
      throw new InvalidPotIdException();
    }

    return new PotId(id);
  }

  toValue(): string {
    return this.id;
  }

  equals(other: PotId): boolean {
    return this.id === other.id;
  }
}

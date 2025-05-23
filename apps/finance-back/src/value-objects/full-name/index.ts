import { validateSync, MinLength } from 'class-validator';
import {
  InvalidFullNameException,
  FullNameIsTooLongException,
} from './exceptions';

export class FullName {
  @MinLength(2)
  private readonly _firstName: string;

  @MinLength(2)
  private readonly _lastName: string;

  constructor(firstName: string, lastName: string) {
    this._firstName = firstName;
    this._lastName = lastName;

    this.validateFullName();
  }

  private validateFullName() {
    this.validateFullNameLength();

    const errors = validateSync(this);

    if (errors.length > 0) {
      const errorMessages = errors
        .flatMap((err) => Object.values(err.constraints ?? {}))
        .join(', ');

      throw new InvalidFullNameException(`Invalid full name: ${errorMessages}`);
    }
  }

  private validateFullNameLength() {
    const fullName = `${this._firstName} ${this._lastName}`;

    const FULL_NAME_IS_TOO_LARGE = fullName.length > 150;

    if (FULL_NAME_IS_TOO_LARGE) {
      throw new FullNameIsTooLongException();
    }
  }

  toValue() {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
    };
  }

  getFullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }
}

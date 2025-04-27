import {
  validateSync,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { PasswordHasherInterface } from '../../utils';
import { HashedPassword } from '../hashed-password';
import { InvalidPasswordException } from './exceptions';

export class Password {
  @IsNotEmpty()
  @MaxLength(12)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  private readonly value: string;

  constructor(value: string) {
    this.value = value;

    this.validatePassword();
  }

  private validatePassword() {
    const errors = validateSync(this);

    if (errors.length > 0) {
      const errorMessages = errors
        .flatMap((err) => Object.values(err.constraints ?? {}))
        .join(', ');

      throw new InvalidPasswordException(`Invalid password: ${errorMessages}`);
    }
  }

  hash(passwordHasher: PasswordHasherInterface): HashedPassword {
    const hashedPassword = passwordHasher.hash(this.value);
    return hashedPassword;
  }

  toValue() {
    return this.value;
  }
}

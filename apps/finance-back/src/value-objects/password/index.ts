import {
  validateSync,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

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
  readonly value: string;

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

      throw new Error(`Invalid password: ${errorMessages}`);
    }
  }

  toValue() {
    return this.value;
  }
}

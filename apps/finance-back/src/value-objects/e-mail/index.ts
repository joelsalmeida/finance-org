import { validateSync, IsEmail } from 'class-validator';

export class Email {
  @IsEmail()
  private readonly value: string;

  constructor(value: string) {
    this.value = value;

    this.validateEmail();
  }

  private validateEmail() {
    const errors = validateSync(this);

    if (errors.length > 0) {
      const errorMessages = errors
        .flatMap((err) => Object.values(err.constraints ?? {}))
        .join(', ');

      throw new Error(`Invalid email: ${errorMessages}`);
    }
  }

  toValue() {
    return this.value;
  }
}

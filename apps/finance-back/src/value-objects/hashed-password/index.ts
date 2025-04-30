import { PasswordHasherPort } from '../../modules/auth/ports/out';

export class HashedPassword {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  matches(
    plainTextPassword: string,
    passwordHasher: PasswordHasherPort
  ): Promise<boolean> {
    return passwordHasher.matches(plainTextPassword, this);
  }

  toValue(): string {
    return this.value;
  }
}

import { PasswordHasherInterface } from '../../utils';

export class HashedPassword {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  matches(
    plainTextPassword: string,
    passwordHasher: PasswordHasherInterface
  ): Promise<boolean> {
    return passwordHasher.matches(plainTextPassword, this);
  }

  toValue(): string {
    return this.value;
  }
}

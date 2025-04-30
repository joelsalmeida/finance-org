import { HashedPassword } from '../../../../value-objects';

export abstract class PasswordHasherPort {
  abstract hash(password: string): HashedPassword;
  abstract matches(
    plainTextPassword: string,
    hashedPassword: HashedPassword
  ): Promise<boolean>;
}

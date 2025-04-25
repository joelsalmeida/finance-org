import { HashedPassword } from '../../value-objects/hashed-password';

export interface PasswordHasherInterface {
  hash(password: string): HashedPassword;
  matches(
    plainTextPassword: string,
    hashedPassword: HashedPassword
  ): Promise<boolean>;
}

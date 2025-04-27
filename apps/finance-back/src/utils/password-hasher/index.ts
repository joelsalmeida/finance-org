import * as bcrypt from 'bcrypt';
import { PasswordHasherInterface } from './index.interface';
import { HashedPassword } from '../../value-objects/hashed-password';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordHasher implements PasswordHasherInterface {
  hash(password: string): HashedPassword {
    const SALT_ROUNDS = 10;
    const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
    const hashedPassword = bcrypt.hashSync(password, SALT);

    return new HashedPassword(hashedPassword);
  }

  async matches(
    plainTextPassword: string,
    hashedPassword: HashedPassword
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword.toValue());
  }
}

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashedPassword } from '../../../../value-objects';
import { PasswordHasherPort } from '../../../auth/ports/out';

@Injectable()
export class BcryptPasswordHasherService implements PasswordHasherPort {
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

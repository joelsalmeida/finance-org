import { Inject, Injectable } from '@nestjs/common';
import {
  DomainBaseException,
  UnexpectedFactoryException,
} from '../../../../exceptions';
import { Email, Password } from '../../../../value-objects';
import { UserId } from '../../../../value-objects/unique-identifiers';
import { PasswordHasherPort } from '../../../auth/ports/out';
import {
  FactoryFailureOutputType,
  FactoryOutputType,
  FactorySuccessOutputType,
} from '../../../shared/domain/contracts/factory.types';
import { User } from '../../domain/user.domain';
import {
  CreateUserAttributes,
  UserFactoryInterface,
} from './user.factory.types';

@Injectable()
export class UserFactory implements UserFactoryInterface {
  constructor(
    @Inject('PasswordHasherPort')
    private readonly passwordHasher: PasswordHasherPort
  ) {}

  create(createUserAttributes: CreateUserAttributes): FactoryOutputType<User> {
    try {
      const { rawEmail, rawPassword } = createUserAttributes;

      const userId = UserId.create();
      const email = new Email(rawEmail);
      const hashedPassword = new Password(rawPassword).hash(
        this.passwordHasher
      );
      const currentDate = new Date();

      const userProps = {
        id: userId,
        email: email,
        password: hashedPassword,
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      const successOutput: FactorySuccessOutputType<User> = {
        success: true,
        data: new User(userProps),
      };

      return successOutput;
    } catch (error) {
      const failureOutput: FactoryFailureOutputType = {
        success: false,
        error:
          error instanceof DomainBaseException
            ? error
            : new UnexpectedFactoryException(),
      };

      return failureOutput;
    }
  }
}

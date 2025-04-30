import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Email, Password } from '../../../../value-objects';
import { PasswordHasherPort } from '../../../auth/ports/out';
import { User } from '../../domain/user.domain';
import {
  CreateUserFailureOutputType,
  CreateUserInputType,
  CreateUserOutputType,
  CreateUserSuccessOutputType,
  UserFactoryInterface,
} from './user.factory.types';

@Injectable()
export class UserFactory implements UserFactoryInterface {
  createUser(
    createUserInput: CreateUserInputType,
    passwordHasher: PasswordHasherPort
  ): CreateUserOutputType {
    try {
      const { rawEmail, rawPassword } = createUserInput;

      const uuid = uuidv4();
      const email = new Email(rawEmail);
      const hashedPassword = new Password(rawPassword).hash(passwordHasher);
      const currentDate = new Date();

      const userProps = {
        id: uuid,
        email: email,
        password: hashedPassword,
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      const successOutput: CreateUserSuccessOutputType = {
        success: true,
        value: new User(userProps),
      };

      return successOutput;
    } catch (error) {
      const failureOutput: CreateUserFailureOutputType = {
        success: false,
        error: error instanceof Error ? error : new Error('Unexpected error'),
      };

      return failureOutput;
    }
  }
}

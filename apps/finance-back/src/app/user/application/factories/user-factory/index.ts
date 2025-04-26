import { v4 as uuidv4 } from 'uuid';
import {
  UserFactoryInterface,
  CreateUserInputType,
  CreateUserOutputType,
  CreateUserSuccessOutputType,
  CreateUserFailureOutputType,
} from './index.types';
import { User } from '../../../domain/user.domain';
import { Email, Password } from '../../../../../value-objects';
import { PasswordHasherInterface } from '../../../../../utils';

export class UserFactory implements UserFactoryInterface {
  createUser(
    createUserInput: CreateUserInputType,
    passwordHasher: PasswordHasherInterface
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

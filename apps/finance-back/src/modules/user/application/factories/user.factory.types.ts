import { PasswordHasherPort } from '../../../auth/ports/out';
import { User } from '../../domain/user.domain';

export type CreateUserInputType = { rawEmail: string; rawPassword: string };

export type CreateUserSuccessOutputType = {
  success: true;
  value: User;
};

export type CreateUserFailureOutputType = {
  success: false;
  error: Error;
};

export type CreateUserOutputType =
  | CreateUserSuccessOutputType
  | CreateUserFailureOutputType;

export interface UserFactoryInterface {
  createUser(
    createUserInput: CreateUserInputType,
    passwordHasher: PasswordHasherPort
  ): CreateUserOutputType;
}

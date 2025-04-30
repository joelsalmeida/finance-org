import { Email, HashedPassword, Password } from '../../../../value-objects';
import { PasswordHasherPort } from '../../../auth/ports/out';
import { User } from '../../domain/user.domain';
import { UserFactory } from './user.factory';
import { CreateUserInputType } from './user.factory.types';

const VALID_EMAIL = 'valid@email.com';
const VALID_PASSWORD = 'Secure#123';
const INVALID_EMAIL = 'invalid-email';
const SHORT_PASSWORD = 'short';

describe('UserFactory', () => {
  let userFactory: UserFactory;
  let mockPasswordHasher: PasswordHasherPort;

  beforeEach(() => {
    userFactory = new UserFactory();

    mockPasswordHasher = {
      hash: jest.fn(
        (password: string) => new HashedPassword(`hashed-${password}`)
      ),
      matches: jest.fn(
        (plainTextPassword: string, hashedPassword: HashedPassword) =>
          Promise.resolve(
            hashedPassword.toValue() === `hashed-${plainTextPassword}`
          )
      ),
    };
  });

  it('should create a new user successfully', () => {
    const createUserInput: CreateUserInputType = {
      rawEmail: VALID_EMAIL,
      rawPassword: VALID_PASSWORD,
    };

    const result = userFactory.createUser(createUserInput, mockPasswordHasher);

    if (result.success === true) {
      expect(result.value).toBeInstanceOf(User);
      expect(result.value.id).toBeDefined();
      expect(result.value.email).toBeInstanceOf(Email);
      expect(result.value.email.toValue()).toBe(VALID_EMAIL);
      expect(result.value.createdAt).toBeInstanceOf(Date);
      expect(result.value.updatedAt).toBeInstanceOf(Date);
      expect(mockPasswordHasher.hash).toHaveBeenCalledWith(VALID_PASSWORD);
    } else {
      fail('Expected result to be a success, but it was a failure');
    }
  });

  it('should return an error if the email is invalid', () => {
    const createUserInput: CreateUserInputType = {
      rawEmail: INVALID_EMAIL,
      rawPassword: VALID_PASSWORD,
    };

    const result = userFactory.createUser(createUserInput, mockPasswordHasher);

    if ('error' in result) {
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error.message).toContain('Invalid email');
    } else {
      fail('Expected result to be a failure, but it was a success');
    }
  });

  it('should return an error if the password is invalid', () => {
    const createUserInput: CreateUserInputType = {
      rawEmail: VALID_EMAIL,
      rawPassword: SHORT_PASSWORD,
    };

    const result = userFactory.createUser(createUserInput, mockPasswordHasher);

    if ('error' in result) {
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error.message).toContain('Invalid password');
    } else {
      fail('Expected result to be a failure, but it was a success');
    }
  });

  it('should return an unexpected error if an unknown error occurs', () => {
    jest.spyOn(Password.prototype, 'hash').mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const createUserInput: CreateUserInputType = {
      rawEmail: VALID_EMAIL,
      rawPassword: VALID_PASSWORD,
    };

    const result = userFactory.createUser(createUserInput, mockPasswordHasher);

    if ('error' in result) {
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error.message).toBe('Unexpected error');
    } else {
      fail('Expected result to be a failure, but it was a success');
    }
  });
});

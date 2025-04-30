import { User } from '../../../user/domain/user.domain';
import { AuthenticateUserCommand } from '../commands';

export abstract class AuthenticateUserUseCase {
  abstract authenticateUser(command: AuthenticateUserCommand): Promise<User>;
}

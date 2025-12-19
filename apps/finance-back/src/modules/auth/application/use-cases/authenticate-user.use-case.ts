import { User } from '../../../user/domain/user.domain';
import { AuthenticateUserCommand } from '../commands';

export abstract class AuthenticateUserUseCase {
  abstract execute(command: AuthenticateUserCommand): Promise<User>;
}

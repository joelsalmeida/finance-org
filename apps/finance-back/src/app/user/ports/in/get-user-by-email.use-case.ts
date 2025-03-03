import { User } from '../../domain/user.domain';
import { GetUserByEmailCommand } from './get-user-by-email.command';

export abstract class GetUserByEmailUseCase {
  abstract getUserByEmail(command: GetUserByEmailCommand): Promise<User>;
}

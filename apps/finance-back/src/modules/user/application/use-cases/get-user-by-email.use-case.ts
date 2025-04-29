import { User } from '../../domain/user.domain';
import { GetUserByEmailCommand } from '../commands';

export abstract class GetUserByEmailUseCase {
  abstract getUserByEmail(command: GetUserByEmailCommand): Promise<User>;
}

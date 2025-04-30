import { User } from '../../domain/user.domain';
import { FindUserByEmailCommand } from '../commands';

export abstract class FindUserByEmailUseCase {
  abstract findUserByEmail(command: FindUserByEmailCommand): Promise<User>;
}

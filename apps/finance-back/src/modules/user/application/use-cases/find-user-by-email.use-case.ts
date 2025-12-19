import { User } from '../../domain/user.domain';
import { FindUserByEmailCommand } from '../commands';

export abstract class FindUserByEmailUseCase {
  abstract execute(command: FindUserByEmailCommand): Promise<User>;
}

import { CreateUserCommand } from '../commands';

export abstract class CreateUserUseCase {
  abstract execute(command: CreateUserCommand): Promise<void>;
}

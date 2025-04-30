import { CreateUserCommand } from '../commands';

export abstract class CreateUserUseCase {
  abstract save(command: CreateUserCommand): Promise<void>;
}

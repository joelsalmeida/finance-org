import { CreateAccountCommand } from '../commands';

export abstract class CreateAccountUseCase {
  abstract save(command: CreateAccountCommand): Promise<void>;
}

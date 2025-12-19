import { CreateAccountCommand } from '../commands';

export abstract class CreateAccountUseCase {
  abstract execute(command: CreateAccountCommand): Promise<void>;
}

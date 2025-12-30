import { CreatePotCommand } from '../commands';

export abstract class CreatePotUseCase {
  abstract execute(command: CreatePotCommand): Promise<void>;
}

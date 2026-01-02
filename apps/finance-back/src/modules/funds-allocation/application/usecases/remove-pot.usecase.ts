import { RemovePotCommand } from '../commands';

export abstract class RemovePotUseCase {
  abstract execute(command: RemovePotCommand): Promise<void>;
}

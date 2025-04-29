import { SaveUserCommand } from '../commands';

export abstract class SaveUserUseCase {
  abstract save(command: SaveUserCommand): Promise<void>;
}

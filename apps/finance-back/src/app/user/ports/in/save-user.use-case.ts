import { SaveUserCommand } from './save-user.command';

export abstract class SaveUserUseCase {
  abstract save(command: SaveUserCommand): Promise<void>;
}

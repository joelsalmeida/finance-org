import { SaveUserCommand } from './save-user.command';

export abstract class SaveUserUseCase {
  abstract saveUser(command: SaveUserCommand): Promise<void>;
}

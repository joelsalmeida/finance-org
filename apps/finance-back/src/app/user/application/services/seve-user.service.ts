import { Injectable } from '@nestjs/common';
import { UserPersistencePort } from '../../ports/out/user-persistence.port';
import { SaveUserCommand } from '../../ports/in';
import { User } from '../../domain/user.domain';
import { SaveUserUseCase } from '../../ports/in';

@Injectable()
export class SeveUserService implements SaveUserUseCase {
  constructor(private userPersistencePort: UserPersistencePort) {}

  async saveUser(command: SaveUserCommand): Promise<void> {
    const userToSave: User = new User(
      command.email,
      User.hashPassword(command.password)
    );

    await this.userPersistencePort.persistUser(userToSave);
  }
}

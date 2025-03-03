import { Injectable } from '@nestjs/common';
import { UserPersistencePort } from '../../ports/out/user-persistence.port';
import { SaveUserCommand } from '../../ports/in';
import { User } from '../../domain/user.domain';
import { SaveUserUseCase } from '../../ports/in';
import { hashPassword } from '../../../../utils/hash-password';

@Injectable()
export class SeveUserService implements SaveUserUseCase {
  constructor(private userPersistencePort: UserPersistencePort) {}

  async saveUser(command: SaveUserCommand): Promise<void> {
    const userToSave: User = new User(command.email, command.password);

    const HASHED_PASSWORD = await hashPassword(userToSave.password);
    userToSave.password = HASHED_PASSWORD;

    await this.userPersistencePort.persistUser(userToSave);
  }
}

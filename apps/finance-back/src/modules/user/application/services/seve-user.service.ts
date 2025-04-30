import { Inject, Injectable } from '@nestjs/common';
import { PasswordHasherPort } from '../../../auth/ports/out';
import { User } from '../../domain/user.domain';
import { UserPersistencePort } from '../../ports/out/user-persistence.port';
import { SaveUserCommand } from '../commands';
import { UserFactoryInterface } from '../factories/user.factory.types';
import { SaveUserUseCase } from '../use-cases';

@Injectable()
export class SaveUserService implements SaveUserUseCase {
  constructor(
    private userPersistencePort: UserPersistencePort,
    @Inject('UserFactory') private userFactory: UserFactoryInterface,
    @Inject('PasswordHasher')
    private passwordHasher: PasswordHasherPort
  ) {}

  async save(command: SaveUserCommand): Promise<void> {
    const userCreationResult = this.userFactory.createUser(
      command,
      this.passwordHasher
    );

    // TODO: Define a custom domain error
    if ('error' in userCreationResult) {
      throw new Error(userCreationResult.error.message);
    }

    const userToPersist: User = userCreationResult.value;
    await this.userPersistencePort.save(userToPersist);
  }
}

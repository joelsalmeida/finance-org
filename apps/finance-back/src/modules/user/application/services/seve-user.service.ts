import { Inject, Injectable } from '@nestjs/common';
import { UserPersistencePort } from '../../ports/out/user-persistence.port';
import { SaveUserCommand } from '../commands';
import { User } from '../../domain/user.domain';
import { SaveUserUseCase } from '../use-cases';
import { UserFactoryInterface } from '../factories/user.factory.types';
import { PasswordHasherInterface } from '../../../../utils';

@Injectable()
export class SaveUserService implements SaveUserUseCase {
  constructor(
    private userPersistencePort: UserPersistencePort,
    @Inject('UserFactory') private userFactory: UserFactoryInterface,
    @Inject('PasswordHasher')
    private passwordHasher: PasswordHasherInterface
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

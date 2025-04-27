import { Inject, Injectable } from '@nestjs/common';
import { UserPersistencePort } from '../../ports/out/user-persistence.port';
import { SaveUserCommand } from '../../ports/in';
import { User } from '../../domain/user.domain';
import { SaveUserUseCase } from '../../ports/in';
import { UserFactoryInterface } from '../factories/user-factory/index.types';
import { PasswordHasherInterface } from '../../../../utils';

@Injectable()
export class SaveUserService implements SaveUserUseCase {
  constructor(
    private userPersistencePort: UserPersistencePort,
    @Inject('UserFactoryInterface') private userFactory: UserFactoryInterface,
    @Inject('PasswordHasherInterface')
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

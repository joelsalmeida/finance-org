import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/user.domain';
import { UserPersistencePort } from '../../ports/out/user-persistence.port';
import { CreateUserCommand } from '../commands';
import { UserFactoryInterface } from '../factories/user.factory.types';
import { CreateUserUseCase } from '../use-cases';

@Injectable()
export class CreateUserService implements CreateUserUseCase {
  constructor(
    private userPersistencePort: UserPersistencePort,
    @Inject('UserFactory') private userFactory: UserFactoryInterface
  ) {}

  async save(command: CreateUserCommand): Promise<void> {
    const userCreationResult = this.userFactory.create(command);

    // TODO: Define a custom domain error
    if ('error' in userCreationResult) {
      throw new Error(userCreationResult.error.message);
    }

    const userToPersist: User = userCreationResult.data;
    await this.userPersistencePort.save(userToPersist);
  }
}

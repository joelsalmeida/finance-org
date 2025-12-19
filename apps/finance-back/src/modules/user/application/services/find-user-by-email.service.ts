import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.domain';
import { UserPersistencePort } from '../../ports/out/user-persistence.port';
import { FindUserByEmailCommand } from '../commands';
import { FindUserByEmailUseCase } from '../use-cases';

@Injectable()
export class FindUserByEmailService implements FindUserByEmailUseCase {
  constructor(private userPersistencePort: UserPersistencePort) {}

  async execute(findUserByEmailCommand: FindUserByEmailCommand): Promise<User> {
    const userFound = await this.userPersistencePort.findByEmail(
      findUserByEmailCommand.email
    );
    return userFound;
  }
}

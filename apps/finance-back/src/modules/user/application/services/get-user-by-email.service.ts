import { Injectable } from '@nestjs/common';
import { UserPersistencePort } from '../../ports/out/user-persistence.port';
import { GetUserByEmailCommand } from '../commands';
import { User } from '../../domain/user.domain';
import { GetUserByEmailUseCase } from '../use-cases';

@Injectable()
export class GetUserByEmailService implements GetUserByEmailUseCase {
  constructor(private userPersistencePort: UserPersistencePort) {}

  async getUserByEmail(
    getUserByEmailCommand: GetUserByEmailCommand
  ): Promise<User> {
    const userFound = await this.userPersistencePort.getUserByEmail(
      getUserByEmailCommand.email
    );
    return userFound;
  }
}

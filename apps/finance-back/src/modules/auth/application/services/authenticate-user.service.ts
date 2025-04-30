import { Injectable } from '@nestjs/common';
import { GetUserByEmailCommand } from '../../../user/application/commands';
import { GetUserByEmailUseCase } from '../../../user/application/use-cases';
import { User } from '../../../user/domain/user.domain';
import { InvalidCredentialsException } from '../../exceptions';
import { PasswordHasherPort } from '../../ports/out';
import { AuthenticateUserCommand } from '../commands';
import { AuthenticateUserUseCase } from '../use-cases';

@Injectable()
export class AuthenticateUserService implements AuthenticateUserUseCase {
  constructor(
    private getUserByEmailService: GetUserByEmailUseCase,
    private passwordHasher: PasswordHasherPort
  ) {}

  async authenticateUser(command: AuthenticateUserCommand): Promise<User> {
    const userFound = await this.getUserByEmailService.getUserByEmail(
      new GetUserByEmailCommand(command.email)
    );

    const passwordMatches = await userFound.password.matches(
      command.password,
      this.passwordHasher
    );

    if (!userFound || !passwordMatches) {
      throw new InvalidCredentialsException();
    }

    return userFound;
  }
}

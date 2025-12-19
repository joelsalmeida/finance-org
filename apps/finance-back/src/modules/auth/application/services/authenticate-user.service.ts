import { Injectable } from '@nestjs/common';
import { FindUserByEmailCommand } from '../../../user/application/commands';
import { FindUserByEmailUseCase } from '../../../user/application/use-cases';
import { User } from '../../../user/domain/user.domain';
import { InvalidCredentialsException } from '../../exceptions';
import { PasswordHasherPort } from '../../ports/out';
import { AuthenticateUserCommand } from '../commands';
import { AuthenticateUserUseCase } from '../use-cases';

@Injectable()
export class AuthenticateUserService implements AuthenticateUserUseCase {
  constructor(
    private findUserByEmailService: FindUserByEmailUseCase,
    private passwordHasher: PasswordHasherPort
  ) {}

  async execute(command: AuthenticateUserCommand): Promise<User> {
    const userFound = await this.findUserByEmailService.execute(
      new FindUserByEmailCommand(command.email)
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

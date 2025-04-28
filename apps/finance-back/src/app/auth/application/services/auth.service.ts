import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateUserCommand } from '../../ports/in';
import { GetUserByEmailCommand } from '../../../user/ports/in';
import { GetUserByEmailUseCase } from '../../../user/ports/in';
import { User } from '../../../user/domain/user.domain';
import { PasswordHasherInterface } from '../../../../utils';
import { InvalidCredentialsException } from '../../exceptions/invalid-credentials.exception';

@Injectable()
export class AuthService {
  constructor(
    private getUserByEmailService: GetUserByEmailUseCase,
    private jwtService: JwtService
  ) {}

  async authenticate(
    command: AuthenticateUserCommand,
    passwordHasher: PasswordHasherInterface
  ): Promise<User> {
    const userFound = await this.getUserByEmailService.getUserByEmail(
      new GetUserByEmailCommand(command.email)
    );

    const passwordMatches = await userFound.password.matches(
      command.password,
      passwordHasher
    );

    if (!userFound || !passwordMatches) {
      throw new InvalidCredentialsException();
    }

    return userFound;
  }

  async generateAccessToken(user: AuthenticateUserCommand) {
    const userFound = await this.getUserByEmailService.getUserByEmail(
      new GetUserByEmailCommand(user.email)
    );

    const payload = { username: user.email, sub: userFound.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

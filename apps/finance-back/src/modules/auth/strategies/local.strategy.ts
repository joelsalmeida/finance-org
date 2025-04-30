import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../user/domain/user.domain';
import { AuthenticateUserCommand } from '../application/commands';
import { AuthenticateUserUseCase } from '../application/use-cases';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticateUserService: AuthenticateUserUseCase) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const userFound = await this.authenticateUserService.authenticateUser(
      new AuthenticateUserCommand(email, password)
    );

    if (!userFound) {
      throw new UnauthorizedException();
    }

    return userFound;
  }
}

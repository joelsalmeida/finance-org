import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthenticateUserCommand } from '../../ports/in';
import { PasswordHasher } from '../../../../utils';
import { User } from '../../../user/domain/user.domain';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const userFound = await this.authService.authenticate(
      new AuthenticateUserCommand(email, password),
      new PasswordHasher()
    );

    if (!userFound) {
      throw new UnauthorizedException();
    }

    return userFound;
  }
}

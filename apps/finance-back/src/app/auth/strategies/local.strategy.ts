import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ValidateUserCommand } from '../ports/in';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const userFound = await this.authService.validateUser(
      new ValidateUserCommand(email, password)
    );

    if (!userFound) {
      throw new UnauthorizedException();
    }

    return userFound;
  }
}

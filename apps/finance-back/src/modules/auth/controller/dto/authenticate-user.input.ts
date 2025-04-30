import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { AuthenticateUserCommand } from '../../application/commands/authenticate-user.command';

export class AuthenticateUserInput {
  @IsEmail()
  readonly email: string;

  @MinLength(8)
  @MaxLength(12)
  readonly password: string;

  toCommand(): AuthenticateUserCommand {
    return new AuthenticateUserCommand(this.email, this.password);
  }
}

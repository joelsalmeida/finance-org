import { AuthenticateUserCommand } from './authenticate-user.command';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticateInput {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  readonly password: string;

  toCommand(): AuthenticateUserCommand {
    return new AuthenticateUserCommand(this.email, this.password);
  }
}

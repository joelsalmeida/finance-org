import { GetUserByEmailCommand } from '.';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetUserByEmailInput {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  toCommand(): GetUserByEmailCommand {
    return new GetUserByEmailCommand(this.email);
  }
}

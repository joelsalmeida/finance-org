import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { FindUserByEmailCommand } from '../../application/commands';

export class FindUserByEmailInput {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  toCommand(): FindUserByEmailCommand {
    return new FindUserByEmailCommand(this.email);
  }
}

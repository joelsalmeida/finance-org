import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { CreateUserCommand } from '../../application/commands';

export class CreateUserInput {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsNotEmpty()
  @MaxLength(12)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  readonly password: string;

  toCommand(): CreateUserCommand {
    return new CreateUserCommand(this.email, this.password);
  }
}

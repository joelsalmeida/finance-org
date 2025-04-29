import { SaveUserCommand } from '../../application/commands';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class SaveUserInput {
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

  toCommand(): SaveUserCommand {
    return new SaveUserCommand(this.email, this.password);
  }
}

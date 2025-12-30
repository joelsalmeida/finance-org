import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { CreatePotCommand } from '../../application/commands';

export class CreatePotInput {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  readonly accountNumber: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly goalAmount: number;

  toCommand(): CreatePotCommand {
    return new CreatePotCommand(this.accountNumber, this.name, this.goalAmount);
  }
}

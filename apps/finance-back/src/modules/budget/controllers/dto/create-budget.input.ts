import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { CreateBudgetCommand } from '../../application/commands';

export class CreateBudgetInput {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  readonly accountNumber: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly limit: number;

  toCommand(): CreateBudgetCommand {
    return new CreateBudgetCommand(
      this.accountNumber,
      this.category,
      this.limit
    );
  }
}

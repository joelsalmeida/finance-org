import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { FindBudgetsByAccountNumberCommand } from '../../application/commands';

export class FindBudgetByAccountNumberInput {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  readonly accountNumber: string;
  toCommand(): FindBudgetsByAccountNumberCommand {
    return new FindBudgetsByAccountNumberCommand(this.accountNumber);
  }
}

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { FindPotsByAccountNumberCommand } from '../../application/commands';

export class FindPotByAccountNumberInput {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  readonly accountNumber: string;

  toCommand(): FindPotsByAccountNumberCommand {
    return new FindPotsByAccountNumberCommand(this.accountNumber);
  }
}

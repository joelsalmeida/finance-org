import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { TransferCommand } from '../../application/commands';

export class TransferInput {
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly sourceAccountNumber: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly destinationAccountNumber: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly amount: number;

  toCommand(): TransferCommand {
    return new TransferCommand(this.sourceAccountNumber, this.destinationAccountNumber, this.category, this.amount);
  }
}

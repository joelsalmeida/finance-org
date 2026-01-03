import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class AllocateFundsToPotInput {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  readonly accountNumber: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly amount: number;
}

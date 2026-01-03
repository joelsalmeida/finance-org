import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RemovePotInput {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  readonly accountNumber: string;
}

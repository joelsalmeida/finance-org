import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateAccountCommand } from '../../application/commands';

export class CreateAccountInput {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  readonly ownerId: string;

  toCommand(): CreateAccountCommand {
    return new CreateAccountCommand(this.ownerId);
  }
}

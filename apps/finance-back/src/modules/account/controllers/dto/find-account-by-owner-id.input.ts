import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { FindAccountByOwnerIdCommand } from '../../application/commands';

export class FindAccountByOwnerIdInput {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  readonly ownerId: string;

  toCommand(): FindAccountByOwnerIdCommand {
    return new FindAccountByOwnerIdCommand(this.ownerId);
  }
}

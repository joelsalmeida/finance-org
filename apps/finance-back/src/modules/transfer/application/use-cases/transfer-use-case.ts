import { Transaction } from '../../../transaction/domain';
import { TransferCommand } from '../commands/transfer.command';

export abstract class TransferUseCase {
  abstract execute(command: TransferCommand): Promise<Transaction>;
}

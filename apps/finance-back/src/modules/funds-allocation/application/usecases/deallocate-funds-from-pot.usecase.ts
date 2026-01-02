import { Pot } from '../../../pot/domain/pot.domain';
import { DeallocateFundsFromPotCommand } from '../commands';

export abstract class DeallocateFundsFromPotUseCase {
  abstract execute(command: DeallocateFundsFromPotCommand): Promise<Pot>;
}

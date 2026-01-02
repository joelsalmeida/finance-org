import { Pot } from '../../../pot/domain/pot.domain';
import { AllocateFundsToPotCommand } from '../commands';

export abstract class AllocateFundsToPotUseCase {
  abstract execute(command: AllocateFundsToPotCommand): Promise<Pot>;
}

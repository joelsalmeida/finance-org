import { Pot } from '../../domain/pot.domain';
import { FindPotsByAccountNumberCommand } from '../commands';

export abstract class FindPotsByAccountUseCase {
  abstract execute(command: FindPotsByAccountNumberCommand): Promise<Pot[]>;
}

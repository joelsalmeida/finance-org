import { UowOptions } from '../../../shared/application/ports/out';
import { Pot } from '../../domain/pot.domain';

export abstract class PotPersistencePort {
  abstract save(pot: Pot, options?: UowOptions): Promise<void>;

  abstract findById(id: string, options?: UowOptions): Promise<Pot>;

  abstract findByAccountNumber(
    accountNumber: string,
    options?: UowOptions
  ): Promise<Pot[]>;

  abstract delete(id: string, options?: UowOptions): Promise<number>;
}

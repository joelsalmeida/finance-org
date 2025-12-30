import { Injectable } from '@nestjs/common';
import { Pot } from '../../domain/pot.domain';
import { PotPersistencePort } from '../../ports/out/pot-persistence.port';
import { FindPotsByAccountNumberCommand } from '../commands';
import { FindPotsByAccountUseCase } from '../usecases';

@Injectable()
export class FindPotByAccountService implements FindPotsByAccountUseCase {
  constructor(private potPersistencePort: PotPersistencePort) {}

  async execute(command: FindPotsByAccountNumberCommand): Promise<Pot[]> {
    const potFound = await this.potPersistencePort.findByAccountNumber(
      command.accountNumber
    );
    return potFound;
  }
}

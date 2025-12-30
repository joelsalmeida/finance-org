import { Inject, Injectable } from '@nestjs/common';
import { Pot } from '../../domain/pot.domain';
import { PotPersistencePort } from '../../ports/out/pot-persistence.port';
import { CreatePotCommand } from '../commands';
import { PotFactoryInterface } from '../factories';
import { CreatePotUseCase } from '../usecases';

@Injectable()
export class CreatePotService implements CreatePotUseCase {
  constructor(
    private potPersistencePort: PotPersistencePort,
    @Inject('PotFactory') private potFactory: PotFactoryInterface
  ) {}

  async execute(command: CreatePotCommand): Promise<void> {
    const potCreationResult = this.potFactory.create(command);

    // TODO: Define a custom domain error
    if ('error' in potCreationResult) {
      throw new Error(potCreationResult.error.message);
    }

    const potToPersist: Pot = potCreationResult.data;
    await this.potPersistencePort.save(potToPersist);
  }
}

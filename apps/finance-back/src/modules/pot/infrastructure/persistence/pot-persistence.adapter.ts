import { Inject, Injectable } from '@nestjs/common';
import { Transaction as SequelizeTransaction } from 'sequelize';
import { PotEntity, PotMapper } from '.';
import { LockMapper } from '../../../account/infrastructure/persistence';
import { UowOptions } from '../../../shared/application/ports/out';
import { Pot } from '../../domain/pot.domain';
import { PotPersistencePort } from '../../ports/out/pot-persistence.port';

@Injectable()
export class PotPersistenceAdapter implements PotPersistencePort {
  constructor(
    @Inject('PotMapper')
    private readonly potMapper: PotMapper,
    @Inject('LockMapper')
    private readonly lockMapper: LockMapper
  ) {}

  async save(pot: Pot, options?: UowOptions): Promise<void> {
    const potEntityFound: PotEntity = await PotEntity.findOne({
      where: { id: pot.id.toValue() },
      ...this.buildQueryOptions(options),
    });

    if (!potEntityFound) {
      const potEntity: PotEntity = this.potMapper.toEntity(pot);
      await potEntity.save({ ...this.buildQueryOptions(options) });
      return;
    }

    this.potMapper.mergeIntoEntity(pot, potEntityFound);
    await potEntityFound.save({ ...this.buildQueryOptions(options) });
  }

  async delete(id: string, options?: UowOptions): Promise<number> {
    const deletedCount = await PotEntity.destroy({
      where: { id },
      ...this.buildQueryOptions(options),
    });

    return deletedCount;
  }

  async findById(id: string, options?: UowOptions): Promise<Pot> {
    const potEntityFound: PotEntity = await PotEntity.findOne({
      where: { id: id },
      ...this.buildQueryOptions(options),
    });

    if (!potEntityFound) return null;

    return this.potMapper.toDomain(potEntityFound);
  }

  async findByAccountNumber(
    accountNumber: string,
    options?: UowOptions
  ): Promise<Pot[]> {
    const potEntities = await PotEntity.findAll({
      where: { accountNumber },
      ...this.buildQueryOptions(options),
    });

    const pots = potEntities.map((pot) => {
      return this.potMapper.toDomain(pot);
    });

    return pots;
  }

  // TODO: DRY is crying desperately :(
  private buildQueryOptions(options?: UowOptions) {
    const transaction = options?.transactionContext as SequelizeTransaction;
    const lock = this.lockMapper.map(options?.lockMode);

    const queryOptions = {
      ...(transaction && { transaction }),
      ...(lock && { lock }),
    };

    return queryOptions;
  }
}

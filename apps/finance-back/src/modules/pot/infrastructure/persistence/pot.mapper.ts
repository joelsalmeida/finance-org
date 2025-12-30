import { Injectable } from '@nestjs/common';
import { AccountNumber, Money, PotId } from '../../../../value-objects';
import { Pot } from '../../domain/pot.domain';
import { PotEntity } from './pot.entity';

@Injectable()
export class PotMapper {
  toEntity(pot: Pot): PotEntity {
    const potEntity = new PotEntity();

    potEntity.id = pot.id.toValue();
    potEntity.accountNumber = pot.accountNumber.toString();
    potEntity.name = pot.name;
    potEntity.goalAmount = pot.goalAmount.toNumber();
    potEntity.allocated = pot.allocated.toNumber();

    return potEntity;
  }

  toDomain(potEntity: PotEntity): Pot {
    const potDomain = Pot.restore({
      id: PotId.fromString(potEntity.id),
      accountNumber: AccountNumber.fromString(potEntity.accountNumber),
      name: potEntity.name,
      goalAmount: Money.fromCents(potEntity.goalAmount),
      allocated: Money.fromCents(potEntity.allocated),
    });

    return potDomain;
  }

  mergeIntoEntity(pot: Pot, entity: PotEntity) {
    entity.goalAmount = pot.goalAmount.toNumber();
    entity.allocated = pot.allocated.toNumber();
  }
}

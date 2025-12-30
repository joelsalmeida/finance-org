import {
  FactoryInterface,
  FactoryOutputType,
} from '../../../shared/domain/contracts/factory.types';
import { Pot } from '../../domain/pot.domain';

export type CreatePotAttributes = {
  accountNumber: string;
  name: string;
  goalAmount: number;
};

export interface PotFactoryInterface
  extends FactoryInterface<Pot, CreatePotAttributes> {
  create(createPotAttributes: CreatePotAttributes): FactoryOutputType<Pot>;
}

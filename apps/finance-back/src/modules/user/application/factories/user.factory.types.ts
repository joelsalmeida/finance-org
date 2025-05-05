import {
  FactoryInterface,
  FactoryOutputType,
} from '../../../shared/domain/contracts/factory.types';
import { User } from '../../domain/user.domain';

export type CreateUserInputType = { rawEmail: string; rawPassword: string };

export interface UserFactoryInterface
  extends FactoryInterface<User, CreateUserInputType> {
  create(
    createTransactionAttributes: CreateUserInputType
  ): FactoryOutputType<User>;
}

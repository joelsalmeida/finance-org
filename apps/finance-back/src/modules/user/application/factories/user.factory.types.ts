import {
  FactoryInterface,
  FactoryOutputType,
} from '../../../shared/domain/contracts/factory.types';
import { User } from '../../domain/user.domain';

export type CreateUserAttributes = { rawEmail: string; rawPassword: string };

export interface UserFactoryInterface
  extends FactoryInterface<User, CreateUserAttributes> {
  create(createUserAttributes: CreateUserAttributes): FactoryOutputType<User>;
}

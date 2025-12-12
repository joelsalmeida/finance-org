import {
  FactoryInterface,
  FactoryOutputType,
} from '../../../shared/domain/contracts/factory.types';

import { Account } from '../../domain/account.domain';

export type CreateAccountAttributes = { ownerId: string };

export interface AccountFactoryInterface
  extends FactoryInterface<Account, CreateAccountAttributes> {
  create(
    createUserAttributes: CreateAccountAttributes
  ): FactoryOutputType<Account>;
}

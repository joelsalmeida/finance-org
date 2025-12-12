import { Injectable } from '@nestjs/common';
import {
  DomainBaseException,
  UnexpectedFactoryException,
} from '../../../../exceptions';
import { AccountNumber, Money, UserId } from '../../../../value-objects';
import {
  FactoryFailureOutputType,
  FactoryOutputType,
  FactorySuccessOutputType,
} from '../../../shared/domain/contracts/factory.types';
import { Account, AccountAttributes } from '../../domain/account.domain';
import {
  AccountFactoryInterface,
  CreateAccountAttributes,
} from './account.factory.types';

@Injectable()
export class AccountFactory implements AccountFactoryInterface {
  create(
    createAccountAttributes: CreateAccountAttributes
  ): FactoryOutputType<Account> {
    try {
      const { ownerId } = createAccountAttributes;
      const accountNumber = AccountNumber.create();
      const balance = Money.fromCents(0);

      const accountProps: AccountAttributes = {
        accountNumber,
        ownerId: UserId.fromString(ownerId),
        balance,
      };

      const successOutput: FactorySuccessOutputType<Account> = {
        success: true,
        data: Account.create(accountProps),
      };

      return successOutput;
    } catch (error) {
      const failureOutput: FactoryFailureOutputType = {
        success: false,
        error:
          error instanceof DomainBaseException
            ? error
            : new UnexpectedFactoryException(),
      };

      return failureOutput;
    }
  }
}

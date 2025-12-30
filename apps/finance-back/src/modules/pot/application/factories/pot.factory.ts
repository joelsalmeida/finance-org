import { Injectable } from '@nestjs/common';
import { CreatePotAttributes, PotFactoryInterface } from '.';

import {
  DomainBaseException,
  UnexpectedFactoryException,
} from '../../../../exceptions';

import { AccountNumber, Money } from '../../../../value-objects';

import {
  FactoryFailureOutputType,
  FactoryOutputType,
  FactorySuccessOutputType,
} from '../../../shared/domain/contracts/factory.types';

import { Pot } from '../../domain/pot.domain';

@Injectable()
export class PotFactory implements PotFactoryInterface {
  create(createPotAttributes: CreatePotAttributes): FactoryOutputType<Pot> {
    try {
      const { accountNumber, name, goalAmount } = createPotAttributes;

      const potProps = {
        accountNumber: AccountNumber.fromString(accountNumber),
        name,
        goalAmount: Money.fromCents(goalAmount),
      };

      const successOutput: FactorySuccessOutputType<Pot> = {
        success: true,
        data: Pot.create(potProps),
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

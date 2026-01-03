import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountNumber, PotId } from '../../../../value-objects';
import { Account } from '../../../account/domain/account.domain';
import { AccountPersistencePort } from '../../../account/ports/out';
import { PotFundsReleasedEvent } from '../../../pot/domain/events';
import { Pot } from '../../../pot/domain/pot.domain';
import { PotPersistencePort } from '../../../pot/ports/out';
import {
  LOCK_MODE,
  UnitOfWorkPort,
  UowOptions,
} from '../../../shared/application/ports/out';
import { RemovePotCommand } from '../commands';
import {
  AccountNotFoundException,
  PotAccountMismatchException,
  PotNotFoundException,
} from '../exceptions';
import { RemovePotUseCase } from '../usecases';

type PotFundsReleasedPayload = {
  potId: PotId;
  accountNumber: AccountNumber;
  occurredAt: Date;
};

type ReleaseContextInput = {
  potId: string;
  accountNumber: string;
};

type ReleasePersistenceContext = {
  account: Account;
  potId: PotId;
};

@Injectable()
export class RemovePotOrchestrationService implements RemovePotUseCase {
  constructor(
    private uow: UnitOfWorkPort,
    private readonly potPersistencePort: PotPersistencePort,
    private readonly accountPersistencePort: AccountPersistencePort,
    private eventEmitter: EventEmitter2
  ) {}

  async execute(command: RemovePotCommand): Promise<void> {
    return this.uow.execute(async (options) => {
      const WRITE_OPTIONS: UowOptions = this.withWriteOptions(options);
      return this.performRelease(command, WRITE_OPTIONS);
    });
  }

  private async performRelease(command: RemovePotCommand, options: UowOptions) {
    const { potId, accountNumber } = command;

    const { account, pot } = await this.loadReleaseContext(
      { potId, accountNumber },
      options
    );

    this.validateReleaseContext(account, pot);

    account.release(pot.allocated);

    await this.persistRelease({ account, potId: pot.id }, options);

    const eventPayload = {
      potId: pot.id,
      accountNumber: pot.accountNumber,
      occurredAt: new Date(),
    };

    this.publishPotFundsReleased(eventPayload);
  }

  private async loadReleaseContext(
    input: ReleaseContextInput,
    options: UowOptions
  ) {
    const pot = await this.potPersistencePort.findById(input.potId, options);
    if (!pot) {
      throw new PotNotFoundException();
    }

    const account = await this.accountPersistencePort.findByAccountNumber(
      input.accountNumber,
      options
    );
    if (!account) {
      throw new AccountNotFoundException();
    }

    return { account, pot };
  }

  private validateReleaseContext(account: Account, pot: Pot) {
    if (!pot.accountNumber.equals(account.accountNumber)) {
      throw new PotAccountMismatchException();
    }
  }

  private async persistRelease(
    context: ReleasePersistenceContext,
    options: UowOptions
  ) {
    await this.accountPersistencePort.save(context.account, options);
    await this.potPersistencePort.delete(context.potId.toValue(), options);
  }

  private withWriteOptions(options: UowOptions): UowOptions {
    return {
      transactionContext: options.transactionContext,
      lockMode: LOCK_MODE.WRITE,
    };
  }

  private publishPotFundsReleased(eventPayload: PotFundsReleasedPayload) {
    const { potId, accountNumber, occurredAt } = eventPayload;

    this.eventEmitter.emit(
      PotFundsReleasedEvent.name,
      new PotFundsReleasedEvent(potId, accountNumber, occurredAt)
    );
  }
}

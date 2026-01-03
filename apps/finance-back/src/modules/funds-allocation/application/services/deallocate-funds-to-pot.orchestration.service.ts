import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountNumber, Money, PotId } from '../../../../value-objects';
import { Account } from '../../../account/domain/account.domain';
import { AccountPersistencePort } from '../../../account/ports/out';
import { PotFundsDeallocatedEvent } from '../../../pot/domain/events';
import { Pot } from '../../../pot/domain/pot.domain';
import { PotPersistencePort } from '../../../pot/ports/out';
import {
  LOCK_MODE,
  UnitOfWorkPort,
  UowOptions,
} from '../../../shared/application/ports/out';
import { DeallocateFundsFromPotCommand } from '../commands';
import {
  AccountNotFoundException,
  PotAccountMismatchException,
  PotNotFoundException,
} from '../exceptions';
import { DeallocateFundsFromPotUseCase } from '../usecases';

type PotFundsDeallocatedPayload = {
  potId: PotId;
  accountNumber: AccountNumber;
  amount: Money;
  occurredAt: Date;
};

type DeallocationContextInput = {
  potId: string;
  accountNumber: string;
};

type DeallocationPersistenceContext = {
  account: Account;
  pot: Pot;
};

@Injectable()
export class DeallocateFundsFromPotOrchestrationService
  implements DeallocateFundsFromPotUseCase
{
  constructor(
    private uow: UnitOfWorkPort,
    private readonly potPersistencePort: PotPersistencePort,
    private readonly accountPersistencePort: AccountPersistencePort,
    private eventEmitter: EventEmitter2
  ) {}

  async execute(command: DeallocateFundsFromPotCommand): Promise<Pot> {
    return this.uow.execute(async (options) => {
      const WRITE_OPTIONS: UowOptions = this.withWriteOptions(options);
      return this.performDeallocation(command, WRITE_OPTIONS);
    });
  }

  private async performDeallocation(
    command: DeallocateFundsFromPotCommand,
    options: UowOptions
  ) {
    const { potId, accountNumber, amount } = command;

    const { account, pot } = await this.loadDeallocationContext(
      { potId, accountNumber },
      options
    );

    this.validateDeallocationContext(account, pot);

    const deallocationValue = Money.fromCents(amount);

    this.applyDeallocation(deallocationValue, account, pot);

    await this.persistDeallocation({ account, pot }, options);

    const eventPayload = {
      potId: pot.id,
      accountNumber: pot.accountNumber,
      amount: deallocationValue,
      occurredAt: new Date(),
    };

    this.publishPotFundsDeallocated(eventPayload);

    return pot;
  }

  private async loadDeallocationContext(
    input: DeallocationContextInput,
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

  private validateDeallocationContext(account: Account, pot: Pot) {
    if (!pot.accountNumber.equals(account.accountNumber)) {
      throw new PotAccountMismatchException();
    }
  }

  private applyDeallocation(amount: Money, account: Account, pot: Pot) {
    account.release(amount);
    pot.deallocate(amount);
  }

  private async persistDeallocation(
    context: DeallocationPersistenceContext,
    options: UowOptions
  ) {
    await this.accountPersistencePort.save(context.account, options);
    await this.potPersistencePort.save(context.pot, options);
  }

  private withWriteOptions(options: UowOptions): UowOptions {
    return {
      transactionContext: options.transactionContext,
      lockMode: LOCK_MODE.WRITE,
    };
  }

  private publishPotFundsDeallocated(eventPayload: PotFundsDeallocatedPayload) {
    const { potId, accountNumber, amount, occurredAt } = eventPayload;

    this.eventEmitter.emit(
      PotFundsDeallocatedEvent.name,
      new PotFundsDeallocatedEvent(potId, accountNumber, amount, occurredAt)
    );
  }
}

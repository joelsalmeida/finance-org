import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountNumber, Money, PotId } from '../../../../value-objects';
import { Account } from '../../../account/domain/account.domain';
import { AccountPersistencePort } from '../../../account/ports/out';
import { PotFundsAllocatedEvent } from '../../../pot/domain/events';
import { Pot } from '../../../pot/domain/pot.domain';
import { PotPersistencePort } from '../../../pot/ports/out';
import {
  LOCK_MODE,
  UnitOfWorkPort,
  UowOptions,
} from '../../../shared/application/ports/out';
import { AllocateFundsToPotCommand } from '../commands';
import {
  AccountNotFoundException,
  PotAccountMismatchException,
  PotNotFoundException,
} from '../exceptions';
import { AllocateFundsToPotUseCase } from '../usecases';

type PotFundsAllocatedPayload = {
  potId: PotId;
  accountNumber: AccountNumber;
  amount: Money;
  occurredAt: Date;
};

type AllocationContextInput = {
  potId: string;
  accountNumber: string;
};

type AllocationPersistenceContext = {
  account: Account;
  pot: Pot;
};

@Injectable()
export class AllocateFundsToPotOrchestrationService
  implements AllocateFundsToPotUseCase
{
  constructor(
    private uow: UnitOfWorkPort,
    private readonly potPersistencePort: PotPersistencePort,
    private readonly accountPersistencePort: AccountPersistencePort,
    private eventEmitter: EventEmitter2
  ) {}

  async execute(command: AllocateFundsToPotCommand): Promise<Pot> {
    return this.uow.execute(async (options) => {
      const WRITE_OPTIONS: UowOptions = this.withWriteOptions(options);
      return this.performAllocation(command, WRITE_OPTIONS);
    });
  }

  private async performAllocation(
    command: AllocateFundsToPotCommand,
    options: UowOptions
  ): Promise<Pot> {
    const { potId, accountNumber, amount } = command;

    const { account, pot } = await this.loadAllocationContext(
      { potId, accountNumber },
      options
    );

    this.validateAllocationContext(account, pot);

    const allocationValue = Money.fromCents(amount);

    this.applyAllocation(account, pot, allocationValue);

    await this.persistAllocation({ account, pot }, options);

    const eventData = {
      potId: pot.id,
      accountNumber: pot.accountNumber,
      amount: allocationValue,
      occurredAt: new Date(),
    };

    this.publishPotFundsAllocated(eventData);

    return pot;
  }

  private async loadAllocationContext(
    input: AllocationContextInput,
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

  private validateAllocationContext(account: Account, pot: Pot) {
    if (!pot.accountNumber.equals(account.accountNumber)) {
      throw new PotAccountMismatchException();
    }
  }

  private applyAllocation(account: Account, pot: Pot, allocationValue: Money) {
    account.reserve(allocationValue);
    pot.allocate(allocationValue);
  }

  private async persistAllocation(
    context: AllocationPersistenceContext,
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

  private publishPotFundsAllocated(eventPayload: PotFundsAllocatedPayload) {
    const { potId, accountNumber, amount, occurredAt } = eventPayload;

    this.eventEmitter.emit(
      PotFundsAllocatedEvent.name,
      new PotFundsAllocatedEvent(potId, accountNumber, amount, occurredAt)
    );
  }
}

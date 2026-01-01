import { LOCK_MODE } from '../../../../shared/application/ports/out';
import { TransactionCreatedEvent } from '../../../../transaction/domain/events';
import {
  TransactionToTheSameAccountException,
  TransactionWithInvalidAmountException,
} from '../../../../transaction/exceptions';
import {
  DestinationAccountNotFoundException,
  SourceAccountNotFoundException,
} from '../../exceptions';
import { buildTransferCommand } from './transfer.command';
import {
  buildTransferFixture,
  INITIAL_DESTINATION_BALANCE,
  INITIAL_SOURCE_BALANCE,
  SOURCE_NUMBER,
  TRANSACTION_VALUE,
} from './transfer.fixture';
import { buildTransferHarness } from './transfer.harness';

/**
 * Verifies that no side effects occurred during a transfer operation.
 * Asserts that the account repository, transaction repository, and event emitter
 * were not called, indicating the operation had no persistence or notification effects.
 *
 * @param harness - The transfer service test harness containing mocked repositories and emitters
 */
const expectNoSideEffects = (
  harness: ReturnType<typeof buildTransferHarness>
) => {
  expect(harness.accountRepo.save).not.toHaveBeenCalled();
  expect(harness.transactionRepo.save).not.toHaveBeenCalled();
  expect(harness.eventEmitter.emit).not.toHaveBeenCalled();
};

const arrangeHappyPath = (
  harness: ReturnType<typeof buildTransferHarness>,
  fixture: ReturnType<typeof buildTransferFixture>
) => {
  harness.accountRepo.findByAccountNumber
    .mockResolvedValueOnce(fixture.sourceAccount)
    .mockResolvedValueOnce(fixture.destinationAccount);

  harness.transactionFactory.create.mockReturnValue({
    success: true,
    data: fixture.transaction,
  });
};

describe('TransferService – execute', () => {
  describe('happy path', () => {
    it('debits the source account', async () => {
      const harness = buildTransferHarness();
      const fixture = buildTransferFixture();
      arrangeHappyPath(harness, fixture);

      await harness.service.execute(buildTransferCommand());

      const BALANCE_EXPECTED = INITIAL_SOURCE_BALANCE - TRANSACTION_VALUE;
      expect(fixture.sourceAccount.balance.toNumber()).toBe(BALANCE_EXPECTED);
    });

    it('credits the destination account', async () => {
      const harness = buildTransferHarness();
      const fixture = buildTransferFixture();
      arrangeHappyPath(harness, fixture);

      await harness.service.execute(buildTransferCommand());

      const BALANCE_EXPECTED = INITIAL_DESTINATION_BALANCE + TRANSACTION_VALUE;
      expect(fixture.destinationAccount.balance.toNumber()).toBe(
        BALANCE_EXPECTED
      );
    });

    it('persists the source account with a write lock', async () => {
      const harness = buildTransferHarness();
      const fixture = buildTransferFixture();
      arrangeHappyPath(harness, fixture);

      await harness.service.execute(buildTransferCommand());

      expect(harness.accountRepo.save).toHaveBeenCalledWith(
        fixture.sourceAccount,
        expect.objectContaining({ lockMode: LOCK_MODE.WRITE })
      );
    });

    it('persists the destination account with a write lock', async () => {
      const harness = buildTransferHarness();
      const fixture = buildTransferFixture();
      arrangeHappyPath(harness, fixture);

      await harness.service.execute(buildTransferCommand());

      expect(harness.accountRepo.save).toHaveBeenCalledWith(
        fixture.destinationAccount,
        expect.objectContaining({ lockMode: LOCK_MODE.WRITE })
      );
    });

    it('persists the transaction with a write lock', async () => {
      const harness = buildTransferHarness();
      const fixture = buildTransferFixture();
      arrangeHappyPath(harness, fixture);

      await harness.service.execute(buildTransferCommand());

      expect(harness.transactionRepo.save).toHaveBeenCalledWith(
        fixture.transaction,
        expect.objectContaining({ lockMode: LOCK_MODE.WRITE })
      );
    });

    it('emits a TransactionCreatedEvent', async () => {
      const harness = buildTransferHarness();
      const fixture = buildTransferFixture();
      arrangeHappyPath(harness, fixture);

      await harness.service.execute(buildTransferCommand());

      expect(harness.eventEmitter.emit).toHaveBeenCalledWith(
        TransactionCreatedEvent.name,
        expect.any(TransactionCreatedEvent)
      );
    });

    it('returns the created transaction', async () => {
      const harness = buildTransferHarness();
      const fixture = buildTransferFixture();
      arrangeHappyPath(harness, fixture);

      const result = await harness.service.execute(buildTransferCommand());
      expect(result).toBe(fixture.transaction);
    });
  });

  describe('negative paths', () => {
    it('fails when source account is not found', async () => {
      const harness = buildTransferHarness();

      harness.accountRepo.findByAccountNumber.mockResolvedValueOnce(null);

      // TODO: Adjust implementation and define a custom error
      const act = () => harness.service.execute(buildTransferCommand());

      await expect(act).rejects.toThrow(SourceAccountNotFoundException);
      expectNoSideEffects(harness);
    });

    it('fails when destination account is not found', async () => {
      const harness = buildTransferHarness();
      const fixture = buildTransferFixture();

      harness.accountRepo.findByAccountNumber
        .mockResolvedValueOnce(fixture.sourceAccount)
        .mockResolvedValueOnce(null);

      // TODO: Adjust implementation and define a custom error
      const act = () => harness.service.execute(buildTransferCommand());

      await expect(act).rejects.toThrow(DestinationAccountNotFoundException);
      expectNoSideEffects(harness);
    });

    it('fails when source account has insufficient funds', async () => {
      const harness = buildTransferHarness();
      const { sourceAccount, destinationAccount } = buildTransferFixture();

      harness.accountRepo.findByAccountNumber
        .mockResolvedValueOnce(sourceAccount)
        .mockResolvedValueOnce(destinationAccount);

      const act = () =>
        harness.service.execute(buildTransferCommand({ amount: 999_00 }));

      await expect(act).rejects.toThrow('Insufficient funds');

      expect(sourceAccount.balance.toNumber()).toBe(INITIAL_SOURCE_BALANCE);

      expect(destinationAccount.balance.toNumber()).toBe(
        INITIAL_DESTINATION_BALANCE
      );

      expectNoSideEffects(harness);
    });

    it('fails when transaction amount is zero', async () => {
      const harness = buildTransferHarness();
      const { sourceAccount, destinationAccount } = buildTransferFixture();

      harness.accountRepo.findByAccountNumber
        .mockResolvedValueOnce(sourceAccount)
        .mockResolvedValueOnce(destinationAccount);

      harness.transactionFactory.create.mockReturnValue({
        success: false,
        error: new TransactionWithInvalidAmountException(),
      });

      const act = () =>
        harness.service.execute(buildTransferCommand({ amount: 0 }));

      await expect(act).rejects.toThrow(TransactionWithInvalidAmountException);

      expect(sourceAccount.balance.toNumber()).toBe(INITIAL_SOURCE_BALANCE);
      expect(destinationAccount.balance.toNumber()).toBe(
        INITIAL_DESTINATION_BALANCE
      );

      expectNoSideEffects(harness);
    });

    it('fails when source and destination accounts are the same', async () => {
      const harness = buildTransferHarness();
      const { sourceAccount } = buildTransferFixture();

      harness.accountRepo.findByAccountNumber
        .mockResolvedValueOnce(sourceAccount)
        .mockResolvedValueOnce(sourceAccount);

      harness.transactionFactory.create.mockReturnValue({
        success: false,
        error: new TransactionToTheSameAccountException(),
      });

      const act = () =>
        harness.service.execute(
          buildTransferCommand({
            sourceAccountNumber: SOURCE_NUMBER,
            destinationAccountNumber: SOURCE_NUMBER,
          })
        );

      await expect(act).rejects.toThrow(TransactionToTheSameAccountException);

      expect(sourceAccount.balance.toNumber()).toBe(INITIAL_SOURCE_BALANCE);

      expectNoSideEffects(harness);
    });
  });
});

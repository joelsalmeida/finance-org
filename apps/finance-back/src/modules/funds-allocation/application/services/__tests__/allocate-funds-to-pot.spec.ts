import { PotFundsAllocatedEvent } from '../../../../pot/domain/events';
import { LOCK_MODE } from '../../../../shared/application/ports/out';
import {
  AccountNotFoundException,
  PotAccountMismatchException,
  PotNotFoundException,
} from '../../exceptions';
import { buildAllocateFundsToPotCommand } from './allocate-funds-to-pot.command';
import {
  ACCOUNT_INITIAL_BALANCE,
  ACCOUNT_INITIAL_RESERVED,
  ACCOUNT_NUMBER,
  ALLOCATION_AMOUNT,
  buildPotOrchestrationFixture,
  POT_INITIAL_ALLOCATED,
} from './commons/pot-orchestration.fixture';
import { buildPotOrchestrationHarness } from './commons/pot-orchestration.harness';

const expectNoSideEffects = (
  harness: ReturnType<typeof buildPotOrchestrationHarness>
) => {
  expect(harness.accountRepo.save).not.toHaveBeenCalled();
  expect(harness.potRepo.save).not.toHaveBeenCalled();
  expect(harness.eventEmitter.emit).not.toHaveBeenCalled();
};

const arrangeHappyPath = (
  harness: ReturnType<typeof buildPotOrchestrationHarness>,
  fixture: ReturnType<typeof buildPotOrchestrationFixture>
) => {
  harness.potRepo.findById.mockResolvedValueOnce(fixture.pot);
  harness.accountRepo.findByAccountNumber.mockResolvedValueOnce(
    fixture.account
  );
};

describe('AllocateFundsToPotOrchestrationService – execute', () => {
  describe('happy path', () => {
    it('reserves funds from the account', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();
      arrangeHappyPath(harness, fixture);

      await harness.allocateService.execute(buildAllocateFundsToPotCommand());

      const EXPECTED_RESERVED = ACCOUNT_INITIAL_RESERVED + ALLOCATION_AMOUNT;

      expect(fixture.account.reservedAmount.toNumber()).toBe(EXPECTED_RESERVED);
      expect(fixture.account.balance.toNumber()).toBe(ACCOUNT_INITIAL_BALANCE);
    });

    it('allocates funds to the pot', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();
      arrangeHappyPath(harness, fixture);

      await harness.allocateService.execute(buildAllocateFundsToPotCommand());

      const EXPECTED_BALANCE = POT_INITIAL_ALLOCATED + ALLOCATION_AMOUNT;

      expect(fixture.pot.allocated.toNumber()).toBe(EXPECTED_BALANCE);
    });

    it('persists the account with a write lock', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();
      arrangeHappyPath(harness, fixture);

      await harness.allocateService.execute(buildAllocateFundsToPotCommand());

      expect(harness.accountRepo.save).toHaveBeenCalledWith(
        fixture.account,
        expect.objectContaining({ lockMode: LOCK_MODE.WRITE })
      );
    });

    it('persists the pot with a write lock', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();
      arrangeHappyPath(harness, fixture);

      await harness.allocateService.execute(buildAllocateFundsToPotCommand());

      expect(harness.potRepo.save).toHaveBeenCalledWith(
        fixture.pot,
        expect.objectContaining({ lockMode: LOCK_MODE.WRITE })
      );
    });

    it('emits a PotFundsAllocatedEvent', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();
      arrangeHappyPath(harness, fixture);

      await harness.allocateService.execute(buildAllocateFundsToPotCommand());

      expect(harness.eventEmitter.emit).toHaveBeenCalledWith(
        PotFundsAllocatedEvent.name,
        expect.any(PotFundsAllocatedEvent)
      );
    });

    it('returns the updated pot', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();
      arrangeHappyPath(harness, fixture);

      const result = await harness.allocateService.execute(
        buildAllocateFundsToPotCommand()
      );

      expect(result).toBe(fixture.pot);
    });
  });

  describe('negative paths', () => {
    it('fails when pot and account do not match', async () => {
      const harness = buildPotOrchestrationHarness();
      const { account, pot } = buildPotOrchestrationFixture();

      jest.spyOn(pot.accountNumber, 'equals').mockReturnValue(false);

      harness.potRepo.findById.mockResolvedValueOnce(pot);
      harness.accountRepo.findByAccountNumber.mockResolvedValueOnce(account);

      const act = () =>
        harness.allocateService.execute(
          buildAllocateFundsToPotCommand({
            accountNumber: ACCOUNT_NUMBER,
          })
        );

      await expect(act).rejects.toThrow(PotAccountMismatchException);

      expect(account.balance.toNumber()).toBe(ACCOUNT_INITIAL_BALANCE);
      expect(pot.allocated.toNumber()).toBe(POT_INITIAL_ALLOCATED);
      expectNoSideEffects(harness);
    });

    it('fails when pot is not found and does not load the account', async () => {
      const harness = buildPotOrchestrationHarness();
      const { account } = buildPotOrchestrationFixture();

      harness.potRepo.findById.mockResolvedValueOnce(null);
      harness.accountRepo.findByAccountNumber.mockResolvedValueOnce(account);

      // TODO: Adjust implementation and define a custom error
      const act = () =>
        harness.allocateService.execute(buildAllocateFundsToPotCommand());

      await expect(act).rejects.toThrow(PotNotFoundException);
      expect(harness.accountRepo.findByAccountNumber).not.toHaveBeenCalled();
      expectNoSideEffects(harness);
    });

    it('fails when account is not found', async () => {
      const harness = buildPotOrchestrationHarness();
      const { pot } = buildPotOrchestrationFixture();

      harness.potRepo.findById.mockResolvedValueOnce(pot);
      harness.accountRepo.findByAccountNumber.mockResolvedValueOnce(null);

      // TODO: Adjust implementation and define a custom error
      const act = () =>
        harness.allocateService.execute(buildAllocateFundsToPotCommand());

      await expect(act).rejects.toThrow(AccountNotFoundException);
      expectNoSideEffects(harness);
    });
  });
});

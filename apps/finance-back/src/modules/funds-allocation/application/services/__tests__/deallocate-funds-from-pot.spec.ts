import { PotFundsDeallocatedEvent } from '../../../../pot/domain/events';
import { LOCK_MODE } from '../../../../shared/application/ports/out';
import {
  AccountNotFoundException,
  PotAccountMismatchException,
  PotNotFoundException,
} from '../../exceptions';
import {
  ACCOUNT_INITIAL_BALANCE,
  ACCOUNT_INITIAL_RESERVED,
  buildPotOrchestrationFixture,
  DEALLOCATION_AMOUNT,
  OTHER_ACCOUNT_NUMBER,
  POT_INITIAL_ALLOCATED,
} from './commons/pot-orchestration.fixture';
import { buildPotOrchestrationHarness } from './commons/pot-orchestration.harness';
import { buildDeallocateFundsFromPotCommand } from './deallocate-funds-fro-pot.command';

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

describe('DeallocateFundsFromPotOrchestrationService – execute', () => {
  describe('happy path', () => {
    it('releases reserved funds back to the account', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();

      arrangeHappyPath(harness, fixture);

      await harness.deallocateService.execute(
        buildDeallocateFundsFromPotCommand()
      );

      const EXPECTED_ACCOUNT_RESERVED =
        ACCOUNT_INITIAL_RESERVED - DEALLOCATION_AMOUNT;

      expect(fixture.account.reservedAmount.toNumber()).toBe(
        EXPECTED_ACCOUNT_RESERVED
      );
      expect(fixture.account.balance.toNumber()).toBe(ACCOUNT_INITIAL_BALANCE);
    });

    it('deallocates funds from the pot', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();

      arrangeHappyPath(harness, fixture);

      await harness.deallocateService.execute(
        buildDeallocateFundsFromPotCommand()
      );
      const EXPECTED_POT_ALLOCATED =
        POT_INITIAL_ALLOCATED - DEALLOCATION_AMOUNT;

      expect(fixture.pot.allocated.toNumber()).toBe(EXPECTED_POT_ALLOCATED);
    });

    it('persists the account with a write lock', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();

      arrangeHappyPath(harness, fixture);

      await harness.deallocateService.execute(
        buildDeallocateFundsFromPotCommand()
      );

      expect(harness.accountRepo.save).toHaveBeenCalledWith(
        fixture.account,
        expect.objectContaining({ lockMode: LOCK_MODE.WRITE })
      );
    });

    it('persists the pot with a write lock', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();

      arrangeHappyPath(harness, fixture);

      await harness.deallocateService.execute(
        buildDeallocateFundsFromPotCommand()
      );

      expect(harness.potRepo.save).toHaveBeenCalledWith(
        fixture.pot,
        expect.objectContaining({ lockMode: LOCK_MODE.WRITE })
      );
    });

    it('emits a PotFundsDeallocatedEvent', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();

      arrangeHappyPath(harness, fixture);

      await harness.deallocateService.execute(
        buildDeallocateFundsFromPotCommand()
      );

      expect(harness.eventEmitter.emit).toHaveBeenCalledWith(
        PotFundsDeallocatedEvent.name,
        expect.any(PotFundsDeallocatedEvent)
      );
    });

    it('returns the updated pot', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();

      arrangeHappyPath(harness, fixture);

      const result = await harness.deallocateService.execute(
        buildDeallocateFundsFromPotCommand()
      );

      expect(result).toBe(fixture.pot);
    });
  });

  describe('negative paths', () => {
    it('fails when pot and account do not match', async () => {
      const harness = buildPotOrchestrationHarness();
      const { account, otherAccount, pot } = buildPotOrchestrationFixture();

      harness.potRepo.findById.mockResolvedValueOnce(pot);
      harness.accountRepo.findByAccountNumber.mockResolvedValueOnce(
        otherAccount
      );

      const act = () =>
        harness.deallocateService.execute(
          buildDeallocateFundsFromPotCommand({
            accountNumber: OTHER_ACCOUNT_NUMBER,
          })
        );

      await expect(act).rejects.toThrow(PotAccountMismatchException);
      expect(account.balance.toNumber()).toBe(ACCOUNT_INITIAL_BALANCE);
      expect(account.reservedAmount.toNumber()).toBe(ACCOUNT_INITIAL_RESERVED);
      expect(pot.allocated.toNumber()).toBe(POT_INITIAL_ALLOCATED);
      expectNoSideEffects(harness);
    });

    it('fails when pot is not found and does not load the account', async () => {
      const harness = buildPotOrchestrationHarness();
      const { account } = buildPotOrchestrationFixture();

      harness.potRepo.findById.mockResolvedValueOnce(null);
      harness.accountRepo.findByAccountNumber.mockResolvedValueOnce(account);

      const act = () =>
        harness.deallocateService.execute(buildDeallocateFundsFromPotCommand());

      await expect(act).rejects.toThrow(PotNotFoundException);
      expect(harness.accountRepo.findByAccountNumber).not.toHaveBeenCalled();
      expectNoSideEffects(harness);
    });

    it('fails when account is not found', async () => {
      const harness = buildPotOrchestrationHarness();
      const { pot } = buildPotOrchestrationFixture();

      harness.potRepo.findById.mockResolvedValueOnce(pot);
      harness.accountRepo.findByAccountNumber.mockResolvedValueOnce(null);

      const act = () =>
        harness.deallocateService.execute(buildDeallocateFundsFromPotCommand());

      await expect(act).rejects.toThrow(AccountNotFoundException);
      expectNoSideEffects(harness);
    });
  });
});

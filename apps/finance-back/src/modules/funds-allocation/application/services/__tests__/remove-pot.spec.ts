import { PotFundsReleasedEvent } from '../../../../pot/domain/events';
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
  POT_INITIAL_ALLOCATED,
} from './commons/pot-orchestration.fixture';
import { buildPotOrchestrationHarness } from './commons/pot-orchestration.harness';
import { buildRemovePotCommand } from './remove-pot.command';

const expectNoSideEffects = (
  harness: ReturnType<typeof buildPotOrchestrationHarness>
) => {
  expect(harness.accountRepo.save).not.toHaveBeenCalled();
  expect(harness.potRepo.delete).not.toHaveBeenCalled();
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

describe('RemovePotOrchestrationService – execute', () => {
  describe('happy path', () => {
    it('releases the pot’s allocated funds back to the account', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();

      arrangeHappyPath(harness, fixture);

      await harness.removeService.execute(buildRemovePotCommand());

      const EXPECTED_RESERVED =
        ACCOUNT_INITIAL_RESERVED - POT_INITIAL_ALLOCATED;

      expect(fixture.account.reservedAmount.toNumber()).toBe(EXPECTED_RESERVED);
      expect(fixture.account.balance.toNumber()).toBe(ACCOUNT_INITIAL_BALANCE);
    });

    it('persists the account with a write lock', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();

      arrangeHappyPath(harness, fixture);

      await harness.removeService.execute(buildRemovePotCommand());

      expect(harness.accountRepo.save).toHaveBeenCalledWith(
        fixture.account,
        expect.objectContaining({ lockMode: LOCK_MODE.WRITE })
      );
    });

    it('deletes the pot with a write lock', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();

      arrangeHappyPath(harness, fixture);

      await harness.removeService.execute(buildRemovePotCommand());

      expect(harness.potRepo.delete).toHaveBeenCalledWith(
        fixture.pot.id.toValue(),
        expect.objectContaining({ lockMode: LOCK_MODE.WRITE })
      );
    });

    it('emits a PotFundsReleasedEvent', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();

      arrangeHappyPath(harness, fixture);

      await harness.removeService.execute(buildRemovePotCommand());

      expect(harness.eventEmitter.emit).toHaveBeenCalledWith(
        PotFundsReleasedEvent.name,
        expect.any(PotFundsReleasedEvent)
      );
    });

    it('does not return a value', async () => {
      const harness = buildPotOrchestrationHarness();
      const fixture = buildPotOrchestrationFixture();

      arrangeHappyPath(harness, fixture);

      const result = await harness.removeService.execute(
        buildRemovePotCommand()
      );

      expect(result).toBeUndefined();
    });
  });

  describe('negative paths', () => {
    it('fails when pot is not found and does not load the account', async () => {
      const harness = buildPotOrchestrationHarness();
      const { account } = buildPotOrchestrationFixture();

      harness.potRepo.findById.mockResolvedValueOnce(null);
      harness.accountRepo.findByAccountNumber.mockResolvedValueOnce(account);

      const act = () => harness.removeService.execute(buildRemovePotCommand());

      await expect(act).rejects.toThrow(PotNotFoundException);
      expect(harness.accountRepo.findByAccountNumber).not.toHaveBeenCalled();
      expectNoSideEffects(harness);
    });

    it('fails when account is not found', async () => {
      const harness = buildPotOrchestrationHarness();
      const { pot } = buildPotOrchestrationFixture();

      harness.potRepo.findById.mockResolvedValueOnce(pot);
      harness.accountRepo.findByAccountNumber.mockResolvedValueOnce(null);

      const act = () => harness.removeService.execute(buildRemovePotCommand());

      await expect(act).rejects.toThrow(AccountNotFoundException);
      expectNoSideEffects(harness);
    });

    it('fails when pot and account do not match', async () => {
      const harness = buildPotOrchestrationHarness();
      const { account, pot } = buildPotOrchestrationFixture();

      jest.spyOn(pot.accountNumber, 'equals').mockReturnValueOnce(false);

      harness.potRepo.findById.mockResolvedValueOnce(pot);
      harness.accountRepo.findByAccountNumber.mockResolvedValueOnce(account);

      const act = () => harness.removeService.execute(buildRemovePotCommand());

      await expect(act).rejects.toThrow(PotAccountMismatchException);

      expect(account.balance.toNumber()).toBe(ACCOUNT_INITIAL_BALANCE);
      expect(account.reservedAmount.toNumber()).toBe(ACCOUNT_INITIAL_RESERVED);
      expectNoSideEffects(harness);
    });
  });
});

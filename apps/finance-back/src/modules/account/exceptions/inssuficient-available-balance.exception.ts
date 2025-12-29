import { ACCOUNT_INSUFFICIENT_AVAILABLE_BALANCE } from '../../../exceptions/codes';
import { DomainBaseException } from '../../../exceptions/domain-base.exception';

export class InsufficientAvailableBalanceException extends DomainBaseException {
  readonly code = ACCOUNT_INSUFFICIENT_AVAILABLE_BALANCE;

  constructor() {
    super('Cannot reserve more than available balance.');
  }
}

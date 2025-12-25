import { DomainBaseException } from '../../../exceptions';
import { ACCOUNT_INSUFFICIENT_FUNDS } from '../../../exceptions/codes';

export class InsufficientFundsException extends DomainBaseException {
  readonly code = ACCOUNT_INSUFFICIENT_FUNDS;

  constructor() {
    super('Insufficient funds');
  }
}

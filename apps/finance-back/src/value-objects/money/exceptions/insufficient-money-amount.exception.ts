import { DomainBaseException } from '../../../exceptions/domain-base.exception';
import { MONEY_INSUFFICIENT_AMOUNT } from '../../../exceptions/codes';

export class InsufficientMoneyAmountException extends DomainBaseException {
  readonly code = MONEY_INSUFFICIENT_AMOUNT;
  constructor() {
    super('Cannot subtract more than the available amount.');
  }
}

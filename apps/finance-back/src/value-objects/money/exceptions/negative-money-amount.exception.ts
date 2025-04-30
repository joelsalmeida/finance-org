import { DomainBaseException } from '../../../exceptions/domain-base.exception';
import { MONEY_NEGATIVE_AMOUNT } from '../../../exceptions/codes';

export class NegativeMoneyAmountException extends DomainBaseException {
  readonly code = MONEY_NEGATIVE_AMOUNT;
  constructor() {
    super('Money cannot be negative');
  }
}

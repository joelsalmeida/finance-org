import { DomainBaseException } from '../../../exceptions/domain-base.exception';
import { MONEY_INVALID_AMOUNT } from '../../../exceptions/codes';

export class InvalidMoneyAmountException extends DomainBaseException {
  readonly code = MONEY_INVALID_AMOUNT;
  constructor() {
    super('Amount must be a finite number');
  }
}

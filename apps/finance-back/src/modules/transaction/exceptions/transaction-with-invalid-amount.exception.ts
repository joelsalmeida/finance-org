import { TRANSACTION_WITH_INVALID_AMOUNT } from '../../../exceptions/codes';
import { DomainBaseException } from '../../../exceptions/domain-base.exception';

export class TransactionWithInvalidAmountException extends DomainBaseException {
  readonly code = TRANSACTION_WITH_INVALID_AMOUNT;

  constructor() {
    super('Transaction amount must be greater than zero.');
  }
}

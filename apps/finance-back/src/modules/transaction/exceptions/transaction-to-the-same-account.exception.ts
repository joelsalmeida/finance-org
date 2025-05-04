import { TRANSACTION_TO_THE_SAME_ACCOUNT } from '../../../exceptions/codes';
import { DomainBaseException } from '../../../exceptions/domain-base.exception';

export class TransactionToTheSameAccountException extends DomainBaseException {
  readonly code = TRANSACTION_TO_THE_SAME_ACCOUNT;

  constructor() {
    super('The source and destination accounts cannot be the same.');
  }
}

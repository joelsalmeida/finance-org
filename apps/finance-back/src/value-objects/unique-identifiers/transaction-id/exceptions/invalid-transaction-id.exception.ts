import { USER_ID_INVALID } from '../../../../exceptions/codes';
import { DomainBaseException } from '../../../../exceptions/domain-base.exception';

export class InvalidTransactionIdException extends DomainBaseException {
  readonly code = USER_ID_INVALID;

  constructor() {
    super('Invalid ID format');
  }
}

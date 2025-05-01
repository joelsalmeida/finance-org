import { ACCOUNT_NUMBER_INVALID } from '../../../../exceptions/codes';
import { DomainBaseException } from '../../../../exceptions/domain-base.exception';

export class InvalidAccountNumberException extends DomainBaseException {
  readonly code = ACCOUNT_NUMBER_INVALID;

  constructor() {
    super('Invalid account number format');
  }
}

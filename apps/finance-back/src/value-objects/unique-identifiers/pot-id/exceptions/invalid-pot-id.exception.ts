import { POT_ID_INVALID } from '../../../../exceptions/codes';
import { DomainBaseException } from '../../../../exceptions/domain-base.exception';

export class InvalidPotIdException extends DomainBaseException {
  readonly code = POT_ID_INVALID;

  constructor() {
    super('Invalid ID format');
  }
}

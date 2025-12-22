import { BUDGET_ID_INVALID } from '../../../../exceptions/codes';
import { DomainBaseException } from '../../../../exceptions/domain-base.exception';

export class InvalidBudgetIdException extends DomainBaseException {
  readonly code = BUDGET_ID_INVALID;

  constructor() {
    super('Invalid ID format');
  }
}
